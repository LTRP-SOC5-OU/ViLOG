import type { Section, Topic } from "@prisma/client";
import type { TopicSchema } from "$server/models/topic";
import { topicSchema } from "$server/models/topic";

export type SectionProps = {
  name?: Section["name"];
  topics: Array<Pick<Topic, "id">>;
};

export const sectionPropsSchema = {
  type: "object",
  properties: {
    name: { type: "string", nullable: true },
    topics: {
      type: "array",
      items: { type: "object", properties: { id: topicSchema.properties.id } },
    },
  },
} as const;

export type SectionSchema = Pick<Section, "id" | "name"> & {
  topics: TopicSchema[];
};

export const sectionSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string", nullable: true },
    topics: {
      type: "array",
      items: topicSchema,
    },
  },
} as const;
