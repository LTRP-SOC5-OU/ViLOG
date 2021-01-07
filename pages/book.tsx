import { useRouter } from "next/router";
import { BookSchema } from "$server/models/book";
import { useNextItemIndexAtom } from "$store/book";
import Book from "$templates/Book";
import Placeholder from "$templates/Placeholder";
import Unknown from "$templates/Unknown";
import { useBook } from "$utils/book";

export type Query = {
  bookId?: string;
};

export type ShowProps = { bookId: BookSchema["id"] };

function Show(props: ShowProps) {
  const book = useBook(props.bookId);
  const [index, nextItemIndex] = useNextItemIndexAtom();
  const handleTopicEnded = () => nextItemIndex();
  const handleItemClick = nextItemIndex;
  const router = useRouter();
  const handleBookEditClick = () => {
    router.push({ pathname: "/book/edit", query: props });
  };

  if (!book) return <Placeholder />;

  return (
    <Book
      book={book}
      index={index}
      onBookEditClick={handleBookEditClick}
      onTopicEnded={handleTopicEnded}
      onItemClick={handleItemClick}
    />
  );
}

function Router() {
  const router = useRouter();
  const query: Query = router.query;
  const bookId = Number(query.bookId);

  if (!Number.isFinite(bookId))
    return (
      <Unknown header="ブックがありません">
        ブックが見つかりませんでした
      </Unknown>
    );

  return <Show bookId={bookId} />;
}

export default Router;
