import type { BookmarkSchema, BookmarkTagMenu } from "$server/models/bookmark";
import prisma from "$server/utils/prisma";
import type { User } from "@prisma/client";

type TopicIdParam = {
  topicId: BookmarkSchema["topicId"];
  tagIds?: BookmarkSchema["tagId"][];
};
type TagIdParam = {
  topicId?: BookmarkSchema["topicId"];
  tagIds: BookmarkSchema["tagId"][];
};

type FindBookmarksParams = {
  userId?: User["id"];
} & (TopicIdParam | TagIdParam);

const includeQuery = {
  include: {
    tag: true,
    topic: {
      select: {
        id: true,
        name: true,
        timeRequired: true,
        bookmarks: {
          select: {
            id: true,
            updatedAt: true,
            tag: true,
          },
        },
      },
    },
    ltiContext: true,
  },
};

async function findBookmarks({
  topicId,
  tagIds,
  userId,
}: FindBookmarksParams): Promise<{
  bookmark: BookmarkSchema[];
  bookmarkTagMenu: BookmarkTagMenu;
}> {
  if (topicId !== undefined) {
    const bookmark = await prisma.bookmark.findMany({
      where: {
        topicId: topicId,
        userId: userId,
      },
      ...includeQuery,
    });

    const bookmarkTagMenu = await prisma.tag.findMany();

    return {
      bookmark,
      bookmarkTagMenu,
    };
  } else if (tagIds !== undefined) {
    const bookmark = await prisma.bookmark.findMany({
      where: {
        OR: tagIds.map((tagId) => ({
          tagId: tagId,
        })),
        userId: userId,
      },
      ...includeQuery,
    });

    const bookmarkTagMenu = await prisma.tag.findMany();

    return {
      bookmark,
      bookmarkTagMenu,
    };
  }

  return {
    bookmark: [],
    bookmarkTagMenu: [],
  };
}

export default findBookmarks;
