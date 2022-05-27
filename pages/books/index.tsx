import { useRouter } from "next/router";
import type { ContentSchema } from "$server/models/content";
import type { BookSchema } from "$server/models/book";
import { useSessionAtom } from "$store/session";
import BooksTemplate from "$templates/Books";
import Book from "$templates/Book";
import BookPreviewDialog from "$organisms/BookPreviewDialog";
import useBooks from "$utils/useBooks";
import useLinkedBook from "$utils/useLinkedBook";
import { pagesPath } from "$utils/$path";
import { updateLtiResourceLink } from "$utils/ltiResourceLink";
import getLtiResourceLink from "$utils/getLtiResourceLink";
import useDialogProps from "$utils/useDialogProps";
import { useBookAtom } from "$store/book";
import { useVideoAtom } from "$store/video";
import { useSearchAtom } from "$store/search";
import { revalidateContents } from "utils/useContents";

const Books = (
  props: Omit<
    Parameters<typeof BooksTemplate>[0],
    keyof ReturnType<typeof useBooks>
  >
) => <BooksTemplate {...props} {...useBooks()} />;

function Index() {
  const router = useRouter();
  const { session, isContentEditable } = useSessionAtom();
  const { linkedBook } = useLinkedBook();
  const {
    data: previewContent,
    dispatch,
    ...dialogProps
  } = useDialogProps<ContentSchema>();
  const { updateBook } = useBookAtom();
  const { updateVideo } = useVideoAtom();
  const { query } = useSearchAtom();
  const onContentPreviewClick = (content: ContentSchema) => {
    const book = content as BookSchema;
    updateBook(book);
    updateVideo(book.sections);
    dispatch(content);
  };
  const onContentEditClick = (book: Pick<ContentSchema, "id" | "authors">) => {
    const action = isContentEditable(book) ? "edit" : "generate";
    return router.push(
      pagesPath.book[action].$url({
        query: { context: "books", bookId: book.id },
      })
    );
  };
  const handleBookNewClick = () => {
    return router.push(
      pagesPath.book.new.$url({ query: { context: "books" } })
    );
  };
  const handleBooksImportClick = () => {
    return router.push(
      pagesPath.books.import.$url({ query: { context: "books" } })
    );
  };
  const onContentLinkClick = async (book: Pick<ContentSchema, "id">) => {
    const ltiResourceLink = getLtiResourceLink(session);
    if (ltiResourceLink == null) return;
    const bookId = book.id;
    await updateLtiResourceLink({ ...ltiResourceLink, bookId });
    await revalidateContents(query);
  };
  const handleLinkedBookClick = (book: Pick<BookSchema, "id">) =>
    router.push(pagesPath.book.$url({ query: { bookId: book.id } }));
  const handlers = {
    onContentPreviewClick,
    onContentEditClick,
    onBookNewClick: handleBookNewClick,
    onBooksImportClick: handleBooksImportClick,
    onContentLinkClick,
    onLinkedBookClick: handleLinkedBookClick,
  };

  return (
    <>
      <Books linkedBook={linkedBook} {...handlers} />
      {previewContent?.type === "book" && (
        <BookPreviewDialog {...dialogProps} book={previewContent}>
          {(props) => <Book {...props} />}
        </BookPreviewDialog>
      )}
    </>
  );
}

export default Index;
