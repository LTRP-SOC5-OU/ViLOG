import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { BookSchema } from "$server/models/book";
import type { TopicSchema } from "$server/models/topic";
import type { VideoTrackSchema } from "$server/models/videoTrack";
import type { TopicPropsWithUploadAndAuthors } from "$types/topicPropsWithAuthors";
import { useVideoTrackAtom } from "$store/videoTrack";
import { createTopic } from "./topic";
import { uploadVideoTrack } from "./videoTrack";
import { addTopicToBook, replaceTopicInBook } from "./book";
import useAuthorsHandler from "$utils/useAuthorsHandler";
import { updateTopicAuthors } from "./topicAuthors";

/** TopicNew コンポーネントのためのハンドラー生成 (要 TopicNew, ./index.tsx, ./edit.tsx) */
function useTopicNewHandlers(
  context: "books" | "topics" | undefined,
  book?: BookSchema,
  targetTopic?: TopicSchema
) {
  const router = useRouter();
  const { handleAuthorsUpdate, handleAuthorSubmit } = useAuthorsHandler();
  const bookEditQuery = useMemo(
    () => ({
      ...(book && { bookId: book.id }),
      ...(context && { context }),
    }),
    [context, book]
  );
  const back = useCallback(
    () => router.push({ pathname: "./", query: bookEditQuery }),
    [router, bookEditQuery]
  );
  const {
    videoTracksProps,
    addVideoTrack: handleSubtitleSubmit,
    deleteVideoTrack,
  } = useVideoTrackAtom();
  const handleSubtitleDelete = useCallback(
    ({ id }: VideoTrackSchema) => deleteVideoTrack(id),
    [deleteVideoTrack]
  );
  const [submitResult, setSubmitResult] = useState("");
  const handleSubmit = useCallback(
    async ({ authors, ...props }: TopicPropsWithUploadAndAuthors) => {
      try {
        const topic = await createTopic(props);
        await updateTopicAuthors({
          id: topic.id,
          authors: [
            ...topic.authors.map(({ id, roleName }) => ({ id, roleName })),
            ...authors,
          ],
        });
        await Promise.all(
          videoTracksProps.map((vt) => uploadVideoTrack(topic.resource.id, vt))
        );
        if (book) {
          if (targetTopic) await replaceTopicInBook(book, targetTopic, topic);
          else await addTopicToBook(book, topic);
        }
        await router.replace(
          {
            pathname: "./edit",
            query: { ...bookEditQuery, topicId: topic.id },
          },
          undefined,
          { shallow: true }
        );
        return back();
      } catch (e) {
        const response = e as Response;
        const status = response.status;
        const statusText = response.statusText;
        try {
          setSubmitResult((await response.json()).message);
        } catch (e) {
          setSubmitResult(`${status} ${statusText}`);
        }
        return undefined;
      }
    },
    [
      book,
      targetTopic,
      router,
      bookEditQuery,
      videoTracksProps,
      back,
      setSubmitResult,
    ]
  );
  const handlers = {
    submitResult: submitResult,
    onSubtitleSubmit: handleSubtitleSubmit,
    onSubtitleDelete: handleSubtitleDelete,
    onSubmit: handleSubmit,
    onCancel: back,
    onAuthorsUpdate: handleAuthorsUpdate,
    onAuthorSubmit: handleAuthorSubmit,
  };

  return handlers;
}

export default useTopicNewHandlers;
