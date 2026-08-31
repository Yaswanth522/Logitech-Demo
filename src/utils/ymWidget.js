const configured = import.meta.env.VITE_YM_WIDGET_ORIGIN;
const LOCAL_ORIGIN = (
  configured === undefined && import.meta.env.DEV
    ? "http://localhost:5170"
    : configured || ""
).replace(/\/$/, "");

export const isLocalWidget = Boolean(LOCAL_ORIGIN);

export const YM_FRAME_ORIGIN = isLocalWidget
  ? LOCAL_ORIGIN
  : "https://cdn.yellowmessenger.com";

export const YM_LOADER_SRC = isLocalWidget
  ? `${LOCAL_ORIGIN}/src/loader/index.ts`
  : "https://cdn.yellowmessenger.com/plugin/widget-v3/prod/dist/loader.umd.js";

export const BOT_ID = "x1787672212177";
export const HOST = "https://r4.nexus.yellow.ai";
