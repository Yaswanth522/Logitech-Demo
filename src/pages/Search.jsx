import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  SEARCH_TABS,
  resolveSearch,
  shoppingProductsFor,
} from "../data/search";
import LogiAnswer from "../components/LogiAnswer";
import { useLogiAnswer } from "../utils/useLogiAnswer";
import "./Search.css";

const LOADING_MS = 900;

export default function Search() {
  const [params] = useSearchParams();
  const rawQuery = params.get("q") || "";
  const { pack, fallback } = useMemo(() => resolveSearch(rawQuery), [rawQuery]);
  // The overview at the top of the page is the live assistant answering, not
  // canned copy — the same reply chat would give, on the same conversation.
  const answer = useLogiAnswer(rawQuery);
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("all");
  const [activeChip, setActiveChip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = rawQuery
      ? `${rawQuery} — Logitech Search`
      : "Search — Logitech";
    return () => {
      document.title = "Logitech United States";
    };
  }, [rawQuery]);

  useEffect(() => {
    setStatus("loading");
    setTab("all");
    setActiveChip(null);
    const timer = setTimeout(() => setStatus("ready"), LOADING_MS);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  function onSubmit(event) {
    event.preventDefault();
    const next = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (!next) return;
    navigate(`/search?q=${encodeURIComponent(next)}`);
  }

  if (!rawQuery.trim()) {
    return (
      <div className="serp">
        <SearchBar query="" onSubmit={onSubmit} />
        <div className="serp__empty container">
          <p>Search products, support articles, and setup guides.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="serp">
      <SearchBar query={rawQuery} onSubmit={onSubmit} />

      <div className="serp__tabs" role="tablist">
        <div className="serp__tabs-inner">
          {SEARCH_TABS.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? "is-active" : ""}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {pack && (
        <div className="serp__chips">
          <div className="serp__chips-inner">
            {pack.chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className={activeChip === chip ? "is-active" : ""}
                onClick={() => setActiveChip((current) => (current === chip ? null : chip))}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="serp__body">
        {status === "loading" && <SerpSkeleton />}

        {status === "ready" && pack && (
          <>
            {fallback && (
              <p className="serp__fallback">
                Showing the closest match for “{rawQuery}”.
              </p>
            )}

            {tab === "all" && (
              <AllResults
                pack={pack}
                query={rawQuery}
                answer={answer}
                onGo={(href) => navigate(href)}
              />
            )}
            {tab === "shopping" && <ShoppingResults pack={pack} />}
            {tab === "support" && <SupportResults pack={pack} />}
            {tab === "videos" && <VideoResults pack={pack} large />}
          </>
        )}
      </div>
    </div>
  );
}

function SearchBar({ query, onSubmit }) {
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <form className="serp-bar" onSubmit={onSubmit}>
      <div className="serp-bar__field">
        <SearchIcon />
        <input
          name="q"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="serp-bar__clear"
            aria-label="Clear search"
            onClick={() => setValue("")}
          >
            ×
          </button>
        )}
        <button type="submit" className="serp-bar__go" aria-label="Search">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

function AllResults({ pack, query, answer, onGo }) {
  return (
    <>
      <div className="serp__overview">
        <LogiAnswer query={query} answer={answer} product={pack.product} onGo={onGo} />
      </div>

      {pack.videos.length > 0 && <VideoResults pack={pack} />}

      <section className="web-results" aria-label="Web results">
        {pack.webResults.map((result) => (
          <Link key={result.title} to={result.href} className="web-result">
            <span className="web-result__url">{result.urlLabel}</span>
            <h2>{result.title}</h2>
            <p>{result.snippet}</p>
          </Link>
        ))}
      </section>
    </>
  );
}

function ShoppingResults({ pack }) {
  const items = shoppingProductsFor(pack);
  return (
    <section className="shopping-grid" aria-label="Shopping results">
      {items.map((product) => (
        <Link key={product.slug} to={`/products/${product.slug}`} className="shop-card">
          <div className="shop-card__image">
            <img src={product.heroImage} alt="" />
          </div>
          <strong>{product.name}</strong>
          <span className="shop-card__tagline">{product.tagline}</span>
          <span className="shop-card__price">${product.price.toFixed(2)}</span>
          <span className="shop-card__merchant">logitech.com</span>
        </Link>
      ))}
    </section>
  );
}

function SupportResults({ pack }) {
  return (
    <section className="support-results" aria-label="Support results">
      {pack.support.map((item) => (
        <Link key={item.title} to={item.href} className="support-card">
          <span className="support-card__kicker">support.logitech.com</span>
          <h2>{item.title}</h2>
          <p>{item.snippet}</p>
        </Link>
      ))}
    </section>
  );
}

function VideoResults({ pack, large = false }) {
  return (
    <section className={`video-results ${large ? "is-large" : ""}`} aria-label="Videos">
      <div className="video-results__head">
        <h2>Videos</h2>
      </div>
      <div className="video-results__row">
        {pack.videos.map((video) => (
          <Link key={video.title} to={video.href} className="video-card">
            <div className="video-card__thumb">
              <img src={video.image} alt="" />
              <span className="video-card__play" aria-hidden="true">
                <PlayIcon />
              </span>
              <span className="video-card__time">{video.duration}</span>
            </div>
            <strong>{video.title}</strong>
            <span>{video.source}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SerpSkeleton() {
  return (
    <div className="serp-skeleton" aria-busy="true" aria-label="Loading results">
      <div className="serp-skeleton__block serp-skeleton__block--wide" />
      <div className="serp-skeleton__row">
        <div>
          <div className="serp-skeleton__block" />
          <div className="serp-skeleton__block" />
          <div className="serp-skeleton__block serp-skeleton__block--short" />
        </div>
        <div>
          <div className="serp-skeleton__card" />
          <div className="serp-skeleton__card" />
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M9 7.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}
