import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  SEARCH_TABS,
  resolveSearch,
  shoppingProductsFor,
} from "../data/search";
import "./Search.css";

const LOADING_MS = 900;

export default function Search() {
  const [params] = useSearchParams();
  const rawQuery = params.get("q") || "";
  const { pack, fallback } = useMemo(() => resolveSearch(rawQuery), [rawQuery]);
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("all");
  const [showMore, setShowMore] = useState(false);
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
    setShowMore(false);
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
                showMore={showMore}
                onToggleMore={() => setShowMore((v) => !v)}
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

function AllResults({ pack, showMore, onToggleMore }) {
  return (
    <>
      <section className="ai-overview" aria-labelledby="ai-overview-heading">
        <header className="ai-overview__head">
          <span className="ai-overview__brand">
            <SparkleIcon />
            AI Overview
          </span>
          <span className="ai-overview__meta">From logitech.com and support</span>
        </header>

        <div className="ai-overview__grid">
          <div className="ai-overview__main">
            <ProductSnippet pack={pack} />
            <p className="ai-overview__lead">
              {renderHighlighted(pack.aiOverview.lead, pack.aiOverview.highlights)}
            </p>
            <ul className="ai-overview__features">
              {pack.aiOverview.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {showMore && <p className="ai-overview__more">{pack.aiOverview.more}</p>}
            <button type="button" className="ai-overview__toggle" onClick={onToggleMore}>
              {showMore ? "Show less" : "Show more"}
              <Chevron down={!showMore} />
            </button>
          </div>

          <aside className="ai-overview__sources" aria-label="Sources">
            {pack.sources.map((source) => (
              <Link key={source.title} to={source.href} className="source-card">
                <div className="source-card__text">
                  <span className="source-card__site">
                    <span className="source-card__favicon">{source.site[0]}</span>
                    {source.site}
                    <span className="source-card__kind">{source.kind}</span>
                  </span>
                  <strong>{source.title}</strong>
                  <p>{source.snippet}</p>
                </div>
                <img src={source.image} alt="" />
              </Link>
            ))}
          </aside>
        </div>
      </section>

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

function ProductSnippet({ pack }) {
  const { product, rating, reviewCount, merchant } = pack;
  return (
    <Link to={`/products/${product.slug}`} className="product-snippet">
      <img src={product.image} alt="" />
      <div>
        <strong>{product.name}</strong>
        <span className="product-snippet__price">${product.price.toFixed(2)}</span>
        <span className="product-snippet__merchant">{merchant}</span>
        <span className="product-snippet__rating">
          <Stars value={rating} />
          {rating} ({reviewCount.toLocaleString()} reviews)
        </span>
      </div>
    </Link>
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

function renderHighlighted(text, phrases) {
  if (!phrases?.length) return text;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, index) => {
    const hit = phrases.some((p) => p.toLowerCase() === part.toLowerCase());
    if (hit) {
      return (
        <span key={`${part}-${index}`} className="serp-highlight">
          {part}
        </span>
      );
    }
    return part;
  });
}

function Stars({ value }) {
  const filled = Math.round(value);
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? "is-on" : ""}>
          ★
        </span>
      ))}
    </span>
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

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"
        fill="#4285F4"
      />
      <path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14Z" fill="#34A853" />
    </svg>
  );
}

function Chevron({ down }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={down ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
