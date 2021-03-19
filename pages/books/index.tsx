import { useRouter } from "next/router";
import type { UserSchema } from "$server/models/user";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import { useUserBooks } from "$utils/userBooks";
import Books from "$templates/Books";
import { pagesPath } from "$utils/$path";
import { TopicSchema } from "$server/models/topic";

const UserBooks = (
  props: { userId: UserSchema["id"] } & Omit<
    Parameters<typeof Books>[0],
    keyof ReturnType<typeof useUserBooks>
  >
) => <Books {...props} {...useUserBooks(props.userId)} />;

function Index() {
  const router = useRouter();
  const { session, isTopicEditable } = useSessionAtom();
  const userId = session?.user.id;
  const handlers = {
    onBookClick({ id }: Pick<BookSchema, "id">) {
      return router.push(pagesPath.book.$url({ query: { bookId: id } }));
    },
    onBookEditClick({ id }: Pick<BookSchema, "id">) {
      return router.push(
        pagesPath.book.edit.$url({ query: { context: "books", bookId: id } })
      );
    },
    onBookNewClick() {
      return router.push(
        pagesPath.book.new.$url({ query: { context: "books" } })
      );
    },
    onTopicEditClick({ id }: Pick<TopicSchema, "id">) {
      return router.push(
        pagesPath.books.topic.edit.$url({
          query: { topicId: id },
        })
      );
    },
    onSortChange: () => undefined,
    isTopicEditable,
  };

  if (userId == null) {
    return <Books books={[]} {...handlers} />;
  }

  return <UserBooks userId={userId} {...handlers} />;
}

export default Index;
