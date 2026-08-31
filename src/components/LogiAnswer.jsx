/**
 * The first result: the live assistant's grounded answer.
 *
 * Mounted both in the Ask Logi modal and at the top of the results page, so
 * search and chat always say the same thing. The body is the assistant's own
 * markdown; the product image comes from the catalog; the sources are the
 * indexed support documents it cited.
 */

import { openLogiChat } from "../utils/logiBridge";
import { cleanTitle, extractSources, renderAnswer, stripSourcesSection } from "../utils/logiMarkdown";
import { supportArticlesFor } from "../data/kbArticles";
import "./LogiAnswer.css";

export default function LogiAnswer({ query, answer, product, onGo, onContinue, compact = false }) {
  const { status, text } = answer;
  const isStreaming = status === "streaming" || status === "loading";
  const sources = extractSources(text);
  // The assistant lists its own citations at the end of the reply; they render
  // as cards below instead, so the tail comes off the body.
  const body = sources.length > 0 ? stripSourcesSection(text) : text;
  // Articles already cited shouldn't reappear under "more reading".
  const cited = new Set(sources.map((s) => s.url));
  const related = (product ? supportArticlesFor(product.slug) : []).filter(
    (a) => !cited.has(a.url)
  );

  function handleContinue() {
    if (onContinue) onContinue();
    openLogiChat();
  }

  return (
    <section className={`logi-answer${compact ? " is-compact" : ""}`} aria-label="Ask Logi answer">
      <header className="logi-answer__head">
        <span className="logi-answer__brand">
          <SparkleIcon />
          Ask Logi
        </span>
        {isStreaming ? (
          <span className="logi-answer__status">Answering…</span>
        ) : (
          <span className="logi-answer__status">From Logitech Support</span>
        )}
      </header>

      <div className="logi-answer__grid">
        <div className="logi-answer__main">
          {product && (
            <button type="button" className="logi-answer__product" onClick={() => onGo?.(`/products/${product.slug}`)}>
              <img src={product.image} alt="" loading="lazy" />
              <span className="logi-answer__product-copy">
                <strong>{product.name}</strong>
                <em>{product.tagline}</em>
                <span className="logi-answer__price">${product.price.toFixed(2)}</span>
              </span>
            </button>
          )}

          <AnswerBody status={status} text={body} query={query} />

          {sources.length > 0 && (
            <div className="logi-answer__sources">
              <span className="logi-answer__label">
                {sources.length === 1 ? "1 source" : `${sources.length} sources`}
              </span>
              <ol className="logi-answer__source-cards">
                {sources.map((s, i) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer noopener">
                      <span className="logi-answer__source-site">
                        <span className="logi-answer__source-num">{i + 1}</span>
                        {s.site}
                      </span>
                      <span className="logi-answer__source-title">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="logi-answer__actions">
            <button type="button" className="logi-answer__cta" onClick={handleContinue}>
              Continue in chat
            </button>
            {product && (
              <button
                type="button"
                className="logi-answer__secondary"
                onClick={() => onGo?.(`/products/${product.slug}`)}
              >
                View {product.name}
              </button>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <aside className="logi-answer__rail" aria-label="More support articles">
            <span className="logi-answer__label">More on {product.name}</span>
            <ul>
              {related.map((a) => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noreferrer noopener">
                    {cleanTitle(a.title)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
}

function AnswerBody({ status, text, query }) {
  if (status === "timeout") {
    return (
      <p className="logi-answer__empty">
        Logi is taking longer than usual to answer. Continue in chat to pick this up there.
      </p>
    );
  }

  if (!text) {
    return (
      <div className="logi-answer__skeleton" aria-live="polite" aria-label={`Asking Logi about ${query}`}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div
      className={`logi-answer__body${status === "streaming" ? " is-streaming" : ""}`}
      // Assistant markdown, sanitized in renderAnswer.
      dangerouslySetInnerHTML={{ __html: renderAnswer(text) }}
    />
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
    </svg>
  );
}

