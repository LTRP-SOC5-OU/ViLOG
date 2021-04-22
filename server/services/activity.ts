import { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import { LearnerSchema } from "$server/models/leaner";
import { CourseBookSchema } from "$server/models/courseBook";
import { BookActivitySchema } from "$server/models/bookActivity";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import findAllActivity from "$server/utils/activity/findAllActivity";

export const method = {
  get: {
    summary: "学習活動一覧",
    description: outdent`
      学習活動の一覧を取得します。
      現在のセッションの LTI Context に紐づくブックに含まれる表示可能なトピックの学習活動を得ます。
      教員または管理者でなければなりません。
      自身以外の作成した共有されていないブック・トピックの学習活動は含みません。`,
    response: {
      200: {
        description: "成功時",
        type: "object",
        properties: {
          learners: { type: "array", items: LearnerSchema },
          courseBooks: { type: "array", items: CourseBookSchema },
          bookActivities: { type: "array", items: BookActivitySchema },
        },
        required: ["learners", "courseBooks", "bookActivities"],
      },
    },
  },
} as const;

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function index({ session }: FastifyRequest) {
  const body = await findAllActivity(session);

  return { status: 200, body };
}
