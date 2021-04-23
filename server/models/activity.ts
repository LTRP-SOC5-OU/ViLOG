import { FromSchema } from "json-schema-to-ts";
import {
  ActivityTimeRangeProps,
  activityTimeRangePropsSchema,
} from "./activityTimeRange";

export type ActivityProps = {
  timeRanges: ActivityTimeRangeProps[];
};

export const activityPropsSchema = {
  type: "object",
  properties: {
    timeRanges: {
      type: "array",
      items: activityTimeRangePropsSchema,
    },
  },
};

/** 学習活動 */
export const ActivitySchema = {
  type: "object",
  properties: {
    learner: {
      type: "object",
      properties: { id: { type: "integer" }, name: { type: "string" } },
      required: ["id", "name"],
    },
    topic: {
      type: "object",
      properties: { id: { type: "integer" }, name: { type: "string" } },
      required: ["id", "name"],
    },
    /** 合計学習時間 (ms) */
    totalTimeMs: { type: "integer" },
    /** 作成日時 */
    createdAt: { type: "string", format: "date-time" },
    /** 更新日時 */
    updatedAt: { type: "string", format: "date-time" },
  },
  required: [
    "learner",
    "topic",
    "completed",
    "totalTimeMs",
    "createdAt",
    "updatedAt",
  ],
} as const;

/** 学習活動 */
export type ActivitySchema = Pick<
  FromSchema<typeof ActivitySchema>,
  "learner" | "topic" | "totalTimeMs"
> & {
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
