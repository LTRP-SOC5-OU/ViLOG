import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { topicSchema } from "$server/models/topic";
import type { PaginationProps } from "$server/validators/paginationProps";
import { paginationPropsSchema } from "$server/validators/paginationProps";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import findTopics from "$server/utils/topic/findTopics";

export type Query = PaginationProps;

export const method = {
  get: {
    summary: "トピック一覧 (非推奨)",
    deprecated: true,
    description: outdent`
      トピックの一覧を取得します。
      教員または管理者でなければなりません。`,
    querystring: paginationPropsSchema,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          topics: {
            type: "array",
            items: topicSchema,
          },
          page: paginationPropsSchema.properties?.page,
          perPage: paginationPropsSchema.properties?.per_page,
        },
      },
    },
  },
} as const;

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function index({
  query,
  ip,
}: FastifyRequest<{ Querystring: Query }>) {
  const page = query.page ?? 0;
  const perPage = query.per_page ?? 50;
  const topics = await findTopics(query.sort, page, perPage, ip);

  return {
    status: 200,
    body: { topics, page, perPage },
  };
}
