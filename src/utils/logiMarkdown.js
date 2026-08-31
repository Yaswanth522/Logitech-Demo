/**
 * Rendering for the assistant's replies.
 *
 * Answers arrive as markdown — the assistant's own conversation guidelines ask
 * it for bold key terms, numbered steps and descriptive links — so the search
 * card has to render markdown, not drop the raw text into a <p>.
 *
 * `marked` is deliberately the same renderer the chat widget uses, so an answer
 * reads identically in search and in chat.
 */

import DOMPurify from "dompurify";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

/**
 * The assistant signs off with its own "Sources:" list. We render those as
 * designed cards below the answer, so the trailing block is stripped here —
 * otherwise every answer shows its citations twice.
 */
const TRAILING_SOURCES_RE = /\n\s*\**\s*sources?\s*:?\s*\**\s*:?\s*\n[\s\S]*$/i;

export function stripSourcesSection(markdown) {
  if (!markdown) return "";
  const stripped = markdown.replace(TRAILING_SOURCES_RE, "");
  // Only trust the strip if it left a real answer behind — a short or
  // oddly-shaped reply should never be gutted.
  return stripped.trim().length > 40 ? stripped.trim() : markdown;
}

/** Assistant markdown -> sanitized HTML. */
export function renderAnswer(markdown) {
  if (!markdown) return "";
  const html = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(html, { ADD_ATTR: ["target", "rel"] });
}

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
// The runtime emits citations as raw HTML anchors, not markdown, so both shapes
// have to be understood or the Sources row silently comes back empty.
const ANCHOR_RE = /<a\s[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>(.*?)<\/a>/gis;
const BARE_URL_RE = /(?<![("'=])\bhttps?:\/\/[^\s<>)"']+/g;

/**
 * Support article titles carry a boilerplate tail from the crawled <title>
 * ("… – Logitech Support + Download") that is noise on every single card.
 */
export function cleanTitle(title) {
  return (title || "")
    .replace(/\s*[–—-]\s*Logitech Support \+ Download\s*$/i, "")
    .replace(/\s*\|\s*Logitech\s*$/i, "")
    .trim();
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/**
 * Pull the sources the assistant cited out of its own answer.
 *
 * The widget's message envelope carries no citation field, so the links in the
 * answer text are the only signal we get about which indexed documents backed
 * it. Deduped by URL, first mention wins.
 */
export function extractSources(markdown) {
  if (!markdown) return [];
  const seen = new Map();

  for (const [, label, url] of markdown.matchAll(LINK_RE)) {
    if (!seen.has(url)) seen.set(url, { title: cleanTitle(label), url, site: hostOf(url) });
  }
  for (const [, url, label] of markdown.matchAll(ANCHOR_RE)) {
    const title = cleanTitle(label.replace(/<[^>]*>/g, ""));
    if (!seen.has(url)) seen.set(url, { title: title || hostOf(url), url, site: hostOf(url) });
  }
  for (const [url] of markdown.matchAll(BARE_URL_RE)) {
    const clean = url.replace(/[.,;]+$/, "");
    if (!seen.has(clean)) seen.set(clean, { title: hostOf(clean), url: clean, site: hostOf(clean) });
  }

  return [...seen.values()];
}
