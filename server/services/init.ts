import type { FastifyRequest } from "fastify";
import { FRONTEND_ORIGIN, FRONTEND_PATH } from "$server/utils/env";
import { upsertUser } from "$server/utils/user";
import {
  findLtiResourceLink,
  upsertLtiResourceLink,
} from "$server/utils/ltiResourceLink";

const frontendUrl = `${FRONTEND_ORIGIN}${FRONTEND_PATH}`;

/** 起動時の初期化プロセス */
async function init({ session }: FastifyRequest) {
  const ltiResourceLink = await findLtiResourceLink({
    consumerId: session.oauthClient.id,
    id: session.ltiResourceLinkRequest.id,
  });

  if (ltiResourceLink) {
    await upsertLtiResourceLink({
      ...ltiResourceLink,
      title: session.ltiResourceLinkRequest.title ?? ltiResourceLink.title,
      contextTitle: session.ltiContext.title ?? ltiResourceLink.contextTitle,
      contextLabel: session.ltiContext.label ?? ltiResourceLink.contextLabel,
    });
  }

  const user = await upsertUser({
    ltiConsumerId: session.oauthClient.id,
    ltiUserId: session.ltiUser.id,
    name: session.ltiUser.name ?? "",
    email:
      session.ltiUser.email && isTeacher(session.ltiRoles)
        ? session.ltiUser.email
        : "",
  });

  Object.assign(session, { ltiResourceLink, user });

  return {
    status: 302,
    headers: { location: frontendUrl },
  } as const;
}

function isTeacher(ltiRoles: string[]) {
  // http://www.imsglobal.org/specs/ltiv1p0/implementation-guide#toc-9
  for (const ltiRole of ltiRoles) {
    if (
      [
        "Instructor",
        "Administrator",
        "TeachingAssistant",
        "ContentDeveloper",
        "Mentor",
      ].includes(ltiRole)
    )
      return true;
  }
  return false;
}

/** OpenAPI Responses Object */
init.response = { 302: {} } as const;

/** 成功時のリダイレクト先のフロントエンドのURL */
init.frontendUrl = frontendUrl;

export default init;
