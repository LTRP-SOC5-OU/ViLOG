import yn from "yn";

const NEXT_PUBLIC_API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH ?? "";
const NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY =
  yn(process.env.NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY) ?? false;
const NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL = Number(
  process.env.NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL ?? 10
);
const NEXT_PUBLIC_VIDEO_MAX_HEIGHT =
  process.env.NEXT_PUBLIC_VIDEO_MAX_HEIGHT ?? "60vh";
const NEXT_PUBLIC_NO_EMBED = yn(process.env.NEXT_PUBLIC_NO_EMBED) ?? false;

const NEXT_PUBLIC_ACTIVITY_REWATCH_RATE_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_ACTIVITY_REWATCH_RATE_THRESHOLD ?? 0.1
);
const NEXT_PUBLIC_REWATCH_GRAPH_COUNT_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_REWATCH_GRAPH_COUNT_THRESHOLD ?? 20
);
const NEXT_PUBLIC_REWATCH_GRAPH_PLOT_SIZE = Number(
  process.env.NEXT_PUBLIC_REWATCH_GRAPH_PLOT_SIZE ?? 5.0
);
const NEXT_PUBLIC_ENABLE_TOPIC_VIEW_RECORD =
  yn(process.env.NEXT_PUBLIC_ENABLE_TOPIC_VIEW_RECORD) ?? true;

const NEXT_PUBLIC_ENABLE_TAG_AND_BOOKMARK =
  yn(process.env.NEXT_PUBLIC_ENABLE_TAG_AND_BOOKMARK) ?? true;

const NEXT_PUBLIC_NO_DEEP_LINK_UI =
  yn(process.env.NEXT_PUBLIC_NO_DEEP_LINK_UI) ?? false;

export {
  NEXT_PUBLIC_API_BASE_PATH,
  NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_ACTIVITY_SEND_INTERVAL,
  NEXT_PUBLIC_ACTIVITY_LTI_CONTEXT_ONLY,
  NEXT_PUBLIC_VIDEO_MAX_HEIGHT,
  NEXT_PUBLIC_NO_EMBED,
  NEXT_PUBLIC_ACTIVITY_REWATCH_RATE_THRESHOLD,
  NEXT_PUBLIC_REWATCH_GRAPH_COUNT_THRESHOLD,
  NEXT_PUBLIC_REWATCH_GRAPH_PLOT_SIZE,
  NEXT_PUBLIC_ENABLE_TOPIC_VIEW_RECORD,
  NEXT_PUBLIC_ENABLE_TAG_AND_BOOKMARK,
  NEXT_PUBLIC_NO_DEEP_LINK_UI,
};
