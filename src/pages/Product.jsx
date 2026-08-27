import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Product.css";

export default function Product() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [tab, setTab] = useState("overview");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container section">
        <h1>Product not found</h1>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="product-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img src={product.gallery[activeImage]} alt={product.name} />
            </div>
            <div className="product-gallery__thumbs">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  className={`product-gallery__thumb ${i === activeImage ? "is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-info__tagline">{product.tagline}</p>
            <div className="product-info__price">${product.price.toFixed(2)}</div>

            <div className="product-info__colors">
              <span className="product-info__label">
                Color: {product.colors[activeColor]}
              </span>
              <div className="product-info__swatches">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    className={`swatch ${i === activeColor ? "is-active" : ""}`}
                    style={{ background: swatchColor(color) }}
                    onClick={() => setActiveColor(i)}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            <ul className="product-info__bullets">
              {product.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <button
              className="btn btn-primary btn-block"
              onClick={() => setAdded(true)}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <p className="product-info__note">
              This is a static demo — checkout isn't implemented.
            </p>
          </div>
        </div>

        <div className="product-tabs">
          <div className="product-tabs__nav">
            <button
              className={tab === "overview" ? "is-active" : ""}
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            <button
              className={tab === "specs" ? "is-active" : ""}
              onClick={() => setTab("specs")}
            >
              Tech Specs
            </button>
          </div>
          <div className="product-tabs__content">
            {tab === "overview" ? (
              <p>{product.description}</p>
            ) : (
              <ul>
                {product.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className="section">
          <h2 className="section-title">You May Also Like</h2>
          <div className="product-grid product-grid--four">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function swatchColor(name) {
  const map = {
    Graphite: "#3a3a3a",
    Black: "#111111",
    "Pale Grey": "#d8d5cf",
    Rose: "#c98b8b",
  };
  return map[name] || "#999999";
}
