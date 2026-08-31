/**
 * Ask the live assistant a question and stream its answer back.
 *
 * Shared by the search modal and the results page so both show the same
 * grounded reply from the same conversation. Nothing here is local content:
 * if the assistant has no answer, the caller shows that honestly rather than
 * falling back to written-in copy.
 */

import { useEffect, useState } from "react";
import { answerFor, askLogi, onLogi } from "./logiBridge";

/** Give up waiting and point the customer at chat instead. */
const ANSWER_TIMEOUT_MS = 25000;

const IDLE = { status: "idle", text: "", hasRichContent: false };

export function useLogiAnswer(query, { enabled = true } = {}) {
  const [state, setState] = useState(IDLE);

  const trimmed = typeof query === "string" ? query.trim() : "";

  useEffect(() => {
    if (!enabled || !trimmed) {
      setState(IDLE);
      return;
    }

    // If this query is already the turn in flight, adopt whatever has streamed
    // in so far instead of asking again.
    const existing = answerFor(trimmed);
    setState(
      existing?.text
        ? {
            status: existing.streaming ? "streaming" : "ready",
            text: existing.text,
            hasRichContent: false,
          }
        : { status: "loading", text: "", hasRichContent: false }
    );

    const off = onLogi("bot-message", (payload) => {
      // Bot messages that aren't answers to our question — the welcome that
      // opens every session — carry isReply: false.
      if (!payload.isReply || !payload.text) return;
      setState({
        status: payload.streaming ? "streaming" : "ready",
        text: payload.text,
        hasRichContent: Boolean(payload.hasRichContent),
      });
    });

    askLogi(trimmed);

    // Functional update so the timeout reads the live status without a ref.
    const timer = setTimeout(() => {
      setState((prev) =>
        prev.status === "loading"
          ? { status: "timeout", text: "", hasRichContent: false }
          : prev
      );
    }, ANSWER_TIMEOUT_MS);

    return () => {
      off();
      clearTimeout(timer);
    };
  }, [trimmed, enabled]);

  return state;
}
