import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveSearch } from "../data/search";
import { prewarmLogi } from "../utils/logiBridge";
import { useLogiAnswer } from "../utils/useLogiAnswer";
import LogiAnswer from "./LogiAnswer";
import "./SearchDialog.css";

/**
 * Chips are phrased as questions on purpose, and verified against the live
 * assistant. Two constraints, both learned the hard way:
 *
 *  - the query must hit an indexed document, or the answer is "I don't have
 *    that" — the knowledge base covers setup guides, not the whole catalog;
 *  - the phrasing must read as informational. A fault-shaped query ("my
 *    keyboard stopped connecting") correctly routes to the Troubleshoot agent,
 *    which opens with an identity check — a question, not an answer, and the
 *    wrong thing to show in a search result.
 */
const SUGGESTIONS = [
  "How do I set up my MX Master 3S?",
  "How do I pair a Logitech keyboard using Easy-Switch?",
  "How do I set up my Brio 4K webcam?",
  "What is MX Master 3S?",
];

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const answer = useLogiAnswer(asked, { enabled: open });
  const product = asked ? resolveSearch(asked).pack?.product : null;

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setAsked("");
    // Bring the conversation up while the customer is still typing.
    prewarmLogi();
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

  function ask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setAsked(trimmed);
  }

  function goTo(href) {
    onClose();
    navigate(href);
  }

  function handleSubmit(e) {
    e.preventDefault();
    ask(query);
  }

  if (!open) return null;

  return (
    <div className="search-dialog__backdrop" onMouseDown={onClose}>
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Ask Logi"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <form className="search-dialog__form" onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Logi — the same assistant as chat"
            aria-label="Ask Logi"
          />
          {query && (
            <button
              type="button"
              className="search-dialog__clear"
              onClick={() => {
                setQuery("");
                setAsked("");
              }}
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
          {!asked ? (
            <div className="search-dialog__suggestions">
              <span className="search-dialog__label">Try asking</span>
              <div className="search-dialog__chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <LogiAnswer
              compact
              query={asked}
              answer={answer}
              product={product}
              onGo={goTo}
              onContinue={onClose}
            />
          )}
        </div>
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
