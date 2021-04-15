import { LtiLaunchBody } from "$server/validators/ltiLaunchBody";
import { LtiResourceLinkSchema } from "$server/models/ltiResourceLink";
import { UserSchema } from "$server/models/user";
import { LearnerSchema } from "$server/models/leaner";
import { CourseBookSchema } from "$server/models/courseBook";
import { BookActivitySchema } from "$server/models/bookActivity";
import prisma from "$server/utils/prisma";
import { bookIncludingActivityArg, toSchema } from "./bookWithActivity";

/** 受講者の取得 */
async function findAllLearners(
  instructor: Pick<UserSchema, "id">,
  {
    consumerId,
    contextId,
  }: Pick<LtiResourceLinkSchema, "consumerId" | "contextId">
) {
  const learners = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
    where: {
      activities: {
        some: {
          topic: {
            topicSection: {
              some: {
                section: {
                  book: {
                    AND: [
                      {
                        ltiResourceLinks: {
                          some: {
                            consumerId,
                            contextId,
                          },
                        },
                      },
                      {
                        // NOTE: 表示可能な範囲 … 共有されているか作成者が一致
                        OR: [{ shared: true }, { authorId: instructor.id }],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return learners;
}

/** LTI Context に紐づくブックに含まれる表示可能なトピックの学習活動の取得 */
async function findAllActivity({
  user,
  ltiLaunchBody,
}: {
  user: Pick<UserSchema, "id">;
  ltiLaunchBody: Pick<LtiLaunchBody, "oauth_consumer_key" | "context_id">;
}): Promise<{
  learners: Array<LearnerSchema>;
  courseBooks: Array<CourseBookSchema>;
  bookActivities: Array<BookActivitySchema>;
}> {
  const consumerId = ltiLaunchBody.oauth_consumer_key;
  const contextId = ltiLaunchBody.context_id;
  const learners = await findAllLearners(user, { consumerId, contextId });
  const ltiResourceLinks = await prisma.ltiResourceLink.findMany({
    where: { consumerId, contextId },
    orderBy: { title: "asc" },
    select: { bookId: true },
  });
  const books = await prisma.book.findMany({
    ...bookIncludingActivityArg,
    where: {
      ltiResourceLinks: { some: { consumerId, contextId } },
    },
  });
  const { courseBooks, bookActivities } = toSchema({
    user,
    ltiResourceLinks,
    books,
  });

  return { learners, courseBooks, bookActivities };
}

export default findAllActivity;
