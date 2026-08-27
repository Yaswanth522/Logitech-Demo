import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-card__image">
        <img src={product.heroImage} alt={product.name} loading="lazy" />
      </div>
      <span className="product-card__category">{product.category}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__tagline">{product.tagline}</p>
      <span className="product-card__price">${product.price.toFixed(2)}</span>
    </Link>
  );
}
