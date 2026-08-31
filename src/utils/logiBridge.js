/**
 * Ask Logi ↔ widget bridge.
 *
 * Search and chat are one conversation: the search modal sends on the live
 * thread with the panel hidden (`send`), renders the reply it gets back
 * (`on("bot-message")`), and "Continue in chat" just reveals the same
 * transcript (`open`) — nothing is re-asked.
 *
 * Everything here goes through the widget's public API. Do not reach into the
 * iframe or the loader's launcher DOM: those are private and break on any
 * widget release.
 */

const HOST_EVENTS = ["bot-message", "user-message", "uid"];

const subscribers = new Map();

/**
 * The turn in flight, so two surfaces asking the same thing share one answer.
 * The search modal and the results page can both be showing the same query;
 * re-sending it would put a duplicate question on the thread and make the two
 * disagree while one streams behind the other.
 */
let current = null;
let resolveReady;
const whenReady = new Promise((resolve) => {
  resolveReady = resolve;
});
let bridged = false;

function emit(event, payload) {
  if (event === "bot-message" && current && payload.isReply && payload.text) {
    current.text = payload.text;
    current.streaming = Boolean(payload.streaming);
  }
  const handlers = subscribers.get(event);
  if (!handlers) return;
  for (const handler of handlers) handler(payload);
}

/** The reply so far for `query`, or null if that is not the turn in flight. */
export function answerFor(query) {
  const trimmed = typeof query === "string" ? query.trim() : "";
  if (!trimmed || !current || current.query !== trimmed) return null;
  return { text: current.text, streaming: current.streaming };
}

/** Called by <ChatWidget /> once ChatWidget.init() has run. */
export function markLogiReady() {
  const widget = window.ChatWidget;
  if (!widget) return;
  // Loader subscriptions live on a singleton and survive destroy()/init(),
  // so they are registered once even though init can re-run (user changes).
  if (!bridged && typeof widget.on === "function") {
    bridged = true;
    for (const event of HOST_EVENTS) {
      widget.on(event, (payload) => emit(event, payload));
    }
  }
  resolveReady(widget);
}

/** Subscribe to a widget host event. Returns an unsubscribe function. */
export function onLogi(event, handler) {
  const handlers = subscribers.get(event) ?? new Set();
  handlers.add(handler);
  subscribers.set(event, handlers);
  return () => handlers.delete(handler);
}

/**
 * Bring the conversation up before the customer has typed anything, so the
 * first question is not stuck behind session init and the welcome message.
 */
export function prewarmLogi() {
  whenReady.then((widget) => widget.prewarm?.());
}

/** Ask on the live thread. The panel stays hidden; the reply arrives on "bot-message". */
export function askLogi(text) {
  const trimmed = typeof text === "string" ? text.trim() : "";
  if (!trimmed) return;
  // Already the turn in flight — the caller reads it back with answerFor().
  if (current?.query === trimmed) return;
  current = { query: trimmed, text: "", streaming: false };
  whenReady.then((widget) => widget.send?.(trimmed));
}

/** Reveal the floating widget on the conversation that search already started. */
export function openLogiChat() {
  document.body.classList.remove("logi-hide-ym-launcher");
  whenReady.then((widget) => widget.open?.());
}
