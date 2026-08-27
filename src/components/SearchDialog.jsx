import { useEffect, useRef, useState } from "react";
import "./SearchDialog.css";

const SUGGESTIONS = ["MX Master 3S", "MX Keys S", "Webcams", "Streaming light"];

const LOADING_MESSAGES = [
  "Searching logitech.com…",
  "Looking through products…",
  "Almost there…",
];

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | results
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const inputRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setStatus("idle");
      setLoadingText(LOADING_MESSAGES[0]);
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
      timers.current.push(focusTimer);
    }
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function runSearch(value) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setStatus("loading");
    setLoadingText(LOADING_MESSAGES[0]);

    const t1 = setTimeout(() => setLoadingText(LOADING_MESSAGES[1]), 500);
    const t2 = setTimeout(() => setLoadingText(LOADING_MESSAGES[2]), 1000);
    const t3 = setTimeout(() => setStatus("results"), 1500);
    timers.current.push(t1, t2, t3);
  }

  function handleSubmit(e) {
    e.preventDefault();
    runSearch(query);
  }

  function handleClose() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    onClose();
  }

  if (!open) return null;

  return (
    <div className="search-dialog__backdrop" onMouseDown={handleClose}>
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
            placeholder="Search products, support, and more"
            aria-label="Search"
          />
          <button type="button" className="search-dialog__close" onClick={handleClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </form>

        <div className="search-dialog__body">
          {status === "idle" && (
            <div className="search-dialog__suggestions">
              <span className="search-dialog__label">Popular searches</span>
              <div className="search-dialog__chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => runSearch(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="search-dialog__loading">
              <span className="search-dialog__spinner" />
              <p>{loadingText}</p>
            </div>
          )}

          {status === "results" && (
            <div className="search-dialog__results">
              <p className="search-dialog__results-heading">
                Results for &ldquo;{query}&rdquo;
              </p>
              <p className="search-dialog__disclaimer">
                This is a static demo — search doesn't run a real query here.
              </p>
              <ul className="search-dialog__result-list">
                <li>
                  <span className="search-dialog__result-icon">🖱️</span>
                  <div>
                    <strong>MX Master 3S</strong>
                    <p>Wireless Performance Mouse — $99.99</p>
                  </div>
                </li>
                <li>
                  <span className="search-dialog__result-icon">⌨️</span>
                  <div>
                    <strong>MX Keys S</strong>
                    <p>Wireless Illuminated Keyboard — $109.99</p>
                  </div>
                </li>
                <li>
                  <span className="search-dialog__result-icon">📷</span>
                  <div>
                    <strong>4K Pro Webcam (Brio)</strong>
                    <p>Premium Ultra HD Webcam — $129.99</p>
                  </div>
                </li>
              </ul>
            </div>
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
