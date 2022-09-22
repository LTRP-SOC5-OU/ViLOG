import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import getUnixTime from "date-fns/getUnixTime";
import type { TopicResourceProps } from "$server/validators/topicResourceProps";
import { topicResourcePropsSchema } from "$server/validators/topicResourceProps";
import {
  WOWZA_BASE_URL,
  WOWZA_SECURE_TOKEN,
  WOWZA_QUERY_PREFIX,
  WOWZA_EXPIRES_IN,
} from "$server/utils/env";
import { getWowzaQuery } from "$server/utils/wowza/token";
import { checkWowzaAccessToken } from "$server/utils/topicResourceToken";

export type Params = { "*": string };
export type Query = TopicResourceProps;

export const method = {
  get: {
    summary: "Wowza Streaming Engine にアクセスするためのエンドポイント",
    description: outdent`
      Wowza Streaming Engine のコンテンツのパスを与えると、
      そのコンテンツの playlist.m3u8 ファイルにリダイレクトします。
      サーバー管理者によって無効化されている場合 404 を返します。`,
    querystring: topicResourcePropsSchema,
    response: {
      302: {},
      403: {},
      404: {},
    },
  },
};

export const hooks = {
  get: { auth: [] },
};

export async function show({
  params,
  query,
  ip,
}: FastifyRequest<{ Params: Params; Querystring: Query }>) {
  const path = params["*"];

  if (disabled(path)) return { status: 404 };
  if (!checkWowzaAccessToken(query.accessToken, ip, path))
    return { status: 403 };

  const expires: Record<string, string> =
    WOWZA_EXPIRES_IN > 0
      ? {
          endtime: `${getUnixTime(new Date()) + WOWZA_EXPIRES_IN}`,
        }
      : {};
  const contentPath = new URL(path, WOWZA_BASE_URL).pathname.replace(/^\//, "");
  const url = new URL(
    `/${contentPath}/playlist.m3u8?${getWowzaQuery(
      contentPath,
      expires,
      WOWZA_QUERY_PREFIX,
      WOWZA_SECURE_TOKEN,
      "sha512" /* TODO: SHA-512 以外未サポート */
    )}`,
    WOWZA_BASE_URL
  ).href;

  return {
    status: 302,
    headers: { location: url },
  };
}

function disabled(path: string) {
  return path === "" || WOWZA_BASE_URL === "";
}
