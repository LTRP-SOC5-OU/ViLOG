import type { User } from "@prisma/client";
import type { TopicProps } from "$server/models/topic";
import topicInput from "./topicInput";
import resourceConnectOrCreateInput from "./resourceConnectOrCreateInput";

function createInput(userId: User["id"], topic: TopicProps) {
  return {
    ...topicInput(topic),
    authors: { create: { userId, roleId: 1 } },
  };
}

function topicCreateInput(authorId: User["id"], topic: TopicProps) {
  const input = {
    ...createInput(authorId, topic),
    resource: resourceConnectOrCreateInput(topic.resource),
  };

  return input;
}

export default topicCreateInput;
