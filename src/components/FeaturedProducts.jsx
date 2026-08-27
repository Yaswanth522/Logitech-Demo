import ProductCard from "./ProductCard";
import { products } from "../data/products";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  return (
    <section className="section featured-products">
      <div className="container">
        <h2 className="section-title">Shop Our Products</h2>
        <div className="featured-products__grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
