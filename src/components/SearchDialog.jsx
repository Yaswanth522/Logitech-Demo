import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { answerQuery, openLogiChat } from "../utils/logiAnswer";
import "./SearchDialog.css";

const SUGGESTIONS = [
  "Keyboard not pairing",
  "What is MX Master 3S",
  "Webcam looks dark",
  "Mouse not charging",
];
const MIN_QUERY = 3;
const THINK_MS = 480;

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [resolvedQuery, setResolvedQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const result = useMemo(() => (resolvedQuery ? answerQuery(resolvedQuery) : null), [resolvedQuery]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setStatus("idle");
    setResolvedQuery("");
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY) {
      setStatus("idle");
      setResolvedQuery("");
      return;
    }

    setStatus("loading");
    const timer = setTimeout(() => {
      setResolvedQuery(trimmed);
      setStatus("ready");
    }, THINK_MS);
    return () => clearTimeout(timer);
  }, [query, open]);

  function goTo(href) {
    onClose();
    navigate(href);
  }

  function handleChat() {
    const handoff = (resolvedQuery || query).trim();
    onClose();
    openLogiChat(handoff);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (status === "ready" && result?.href) goTo(result.href);
  }

  if (!open) return null;

  return (
    <div className="search-dialog__backdrop" onMouseDown={onClose}>
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form className="search-dialog__form" onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Logi — products or a problem"
            aria-label="Search"
          />
          {query && (
            <button
              type="button"
              className="search-dialog__clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="button" className="search-dialog__close" onClick={onClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </form>

        <div className="search-dialog__body">
          {status === "idle" && (
            <div className="search-dialog__suggestions">
              <span className="search-dialog__label">Try asking</span>
              <div className="search-dialog__chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="search-dialog__loading">
              <span className="search-dialog__spinner" />
              <p>Looking that up…</p>
            </div>
          )}

          {status === "ready" && result && <LogiAnswer result={result} onGo={goTo} onChat={handleChat} />}
        </div>
      </div>
    </div>
  );
}

function LogiAnswer({ result, onGo, onChat }) {
  if (result.kind === "empty") {
    return (
      <div className="logi-answer">
        <p className="logi-answer__kicker">Ask Logi</p>
        <h2 className="logi-answer__title">{result.title}</h2>
        <p className="logi-answer__body">{result.body}</p>
      </div>
    );
  }

  const isHelp = result.kind === "help";

  return (
    <div className={`logi-answer ${isHelp ? "is-help" : "is-product"}`}>
      <p className="logi-answer__kicker">{isHelp ? "Help" : "Ask Logi"}</p>
      <h2 className="logi-answer__title">{result.title}</h2>
      <p className="logi-answer__body">{result.body}</p>

      {result.steps?.length > 0 && (
        <ol className="logi-answer__steps">
          {result.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}

      {result.product && (
        <button type="button" className="logi-answer__product" onClick={() => onGo(result.href)}>
          <img src={result.product.image} alt="" />
          <span>
            <strong>{result.product.name}</strong>
            <em>
              {isHelp
                ? result.product.tagline
                : `$${result.product.price.toFixed(2)} · ${result.rating} (${result.reviewCount} reviews)`}
            </em>
          </span>
        </button>
      )}

      <div className="logi-answer__actions">
        <button type="button" className="logi-answer__cta" onClick={() => onGo(result.href)}>
          {result.cta}
          <ArrowIcon />
        </button>
        {isHelp && (
          <button type="button" className="logi-answer__secondary" onClick={onChat}>
            Continue in chat
          </button>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
