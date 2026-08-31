/**
 * Which widget build the demo loads.
 *
 *   local    the widget's own Vite dev server (HMR, unreleased code)
 *   staging  the alpha CDN build — where widget changes land before prod
 *   prod     the released CDN build
 *
 * Pick with VITE_YM_WIDGET_CHANNEL. `local` additionally needs
 * VITE_YM_WIDGET_ORIGIN (defaults to the widget dev server's port).
 *
 * Ask Logi needs ChatWidget.send/prewarm/on, which only exist from the
 * headless-send change onward — so `prod` will not work until that ships.
 */

const CHANNEL = (import.meta.env.VITE_YM_WIDGET_CHANNEL || "").trim();
const configuredOrigin = (import.meta.env.VITE_YM_WIDGET_ORIGIN || "")
  .trim()
  .replace(/\/$/, "");

// An explicit origin implies local; otherwise honour the channel, defaulting
// to staging in dev (that is where the widget work lands first) and prod in a
// production build.
const channel =
  CHANNEL || (configuredOrigin ? "local" : import.meta.env.DEV ? "staging" : "prod");

const LOCAL_ORIGIN = configuredOrigin || "http://localhost:5170";

const CDN = "https://cdn.yellowmessenger.com";
const CDN_DIST = {
  staging: `${CDN}/plugin/widget-v3/staging/dist`,
  prod: `${CDN}/plugin/widget-v3/prod/dist`,
};

export const isLocalWidget = channel === "local";

/** Origin the widget iframe is served from — used to target postMessage. */
export const YM_FRAME_ORIGIN = isLocalWidget ? LOCAL_ORIGIN : CDN;

export const YM_LOADER_SRC = isLocalWidget
  ? `${LOCAL_ORIGIN}/src/loader/index.ts`
  : `${CDN_DIST[channel] ?? CDN_DIST.prod}/loader.umd.js`;

/** Which build is actually in use — surfaced in the console on boot. */
export const YM_WIDGET_CHANNEL = channel;

export const BOT_ID = "x1787672212177";
export const HOST = "https://r4.nexus.yellow.ai";
