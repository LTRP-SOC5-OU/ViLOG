import type { Client } from "openid-client";
import prisma from "$server/utils/prisma";

type Score = {
  userId: string;
  scoreGiven?: number;
  scoreMaximum?: number;
  comment?: string;
  timestamp: string;
  activityProgress:
    | "Initialized"
    | "Started"
    | "InProgress"
    | "Submitted"
    | "Completed";
  gradingProgress:
    | "NotReady"
    | "Failed"
    | "Pending"
    | "PendingManual"
    | "FullyGraded";
};

const successCode = [200, 201, 202, 204];
const authFailureCode = [401];

async function grant(client: Client): Promise<string> {
  try {
    const tokens = await client.grant({
      grant_type: "client_credentials",
      scope: "https://purl.imsglobal.org/spec/lti-ags/scope/score",
    });
    return tokens.access_token ?? "";
  } catch {
    return "";
  }
}

/**
 * LTI-AGS 2.0 成績の反映
 * https://www.imsglobal.org/spec/lti-ags/v2p0/openapi/#/default/Scores.POST
 * @param client OpenID Connect Client
 * @param lineItemUrl Assignment and Grade Service claim に含まれる行項目コンテナにアクセスするための URL
 * @param score 成績
 * @param retry リトライを行うか否か (デフォルト: true 行う)
 */
export async function publishScore(
  client: Client,
  lineItemUrl: string,
  score: Score,
  retry = true
) {
  const clientId = client.metadata.client_id;

  let { accessToken } = await prisma.ltiConsumer.findUniqueOrThrow({
    where: { id: clientId },
  });

  if (!accessToken) {
    accessToken = await grant(client);

    if (!accessToken) {
      throw new Error(
        `Failed to grant access token: client ${client.metadata.client_id}`
      );
    }

    await prisma.ltiConsumer.update({
      where: { id: clientId },
      data: { accessToken },
    });
  }

  const url = new URL(lineItemUrl);
  url.pathname = `${url.pathname}/scores`;
  const res = await client.requestResource(url, accessToken, {
    method: "POST",
    headers: { "Content-Type": "application/vnd.ims.lis.v1.score+json" },
    body: JSON.stringify(score),
  });

  const statusCode = Number(res.statusCode);

  if (authFailureCode.includes(statusCode)) {
    await prisma.ltiConsumer.update({
      where: { id: clientId },
      data: { accessToken: "" },
    });

    if (retry) {
      await publishScore(client, lineItemUrl, score, false);
      return;
    }
  }

  if (!successCode.includes(statusCode)) {
    throw new Error(`${res.statusCode} ${res.statusMessage}`);
  }
}