import { useRouter } from "next/router";
import BookImport from "$templates/BookImport";
import Placeholder from "$templates/Placeholder";
import BookNotFoundProblem from "$organisms/TopicNotFoundProblem";
import { useSessionAtom } from "$store/session";
import { updateBook, useBook } from "$utils/book";
import { useBooks } from "$utils/books";
import type { BookSchema } from "$server/models/book";
import type { SectionSchema } from "$server/models/book/section";
import type { TopicSchema } from "$server/models/topic";
import type { Query as BookEditQuery } from "../edit";
import { connectOrCreateTopic } from "$utils/topic";
import { pagesPath } from "$utils/$path";

export type Query = BookEditQuery;

function Import({ bookId, context }: Query) {
  const { isTopicEditable, isBookEditable } = useSessionAtom();
  const { book } = useBook(bookId);
  const booksWithInfiniteProps = useBooks(isBookEditable, isTopicEditable);
  const router = useRouter();
  const bookEditQuery = { bookId, ...(context && { context }) };
  const action = book && isBookEditable(book) ? "edit" : "generate";
  const back = () =>
    router.push(pagesPath.book[action].$url({ query: bookEditQuery }));
  async function handleSubmit({
    topics,
  }: {
    books: BookSchema[];
    sections: SectionSchema[];
    topics: TopicSchema[];
  }) {
    if (!book) return;

    const connectOrCreateTopics = topics.map(async (topic) => {
      return connectOrCreateTopic(topic, isTopicEditable).then(({ id }) => id);
    });
    const ids = await Promise.all(connectOrCreateTopics);
    await updateBook({
      ...book,
      sections: [...book.sections, ...ids.map((id) => ({ topics: [{ id }] }))],
    });

    return back();
  }
  function handleCancel() {
    return back();
  }
  function handleBookEditClick(book: Pick<BookSchema, "id" | "author">) {
    const action = isBookEditable(book) ? "edit" : "generate";
    return router.push(
      pagesPath.book[action].$url({
        // NOTE: ブック編集画面は元のブックインポート画面に戻る手段が無いのでマイブック画面に戻る
        query: { bookId: book.id, context: "books" },
      })
    );
  }
  function handleTopicEditClick(topic: Pick<TopicSchema, "id">) {
    return router.push(
      pagesPath.book.import.topic.edit.$url({
        query: { ...bookEditQuery, topicId: topic.id },
      })
    );
  }
  const handlers = {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onBookEditClick: handleBookEditClick,
    onTopicEditClick: handleTopicEditClick,
    isTopicEditable,
    isBookEditable,
  };

  if (!book) return <Placeholder />;

  return <BookImport {...booksWithInfiniteProps} {...handlers} />;
}

function Router() {
  const router = useRouter();
  const bookId = Number(router.query.bookId);
  const { context }: Pick<Query, "context"> = router.query;

  if (!Number.isFinite(bookId)) return <BookNotFoundProblem />;

  return <Import bookId={bookId} context={context} />;
}

export default Router;
