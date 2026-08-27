import { Link } from "react-router-dom";
import { routeFor } from "../data/routes";
import "./CategoryGrid.css";

export default function CategoryGrid({ heading, items, dark, compact, overlay }) {
  return (
    <section className={`category-grid ${dark ? "category-grid--dark" : ""}`}>
      <div className="container">
        {heading && <h2 className="grid-heading">{heading}</h2>}
        <div
          className={`category-grid__cards ${compact ? "category-grid__cards--compact" : ""} ${
            overlay ? "category-grid__cards--overlay" : ""
          }`}
        >
          {items.map((item) => (
            <Link key={item.label} to={routeFor(item.label)} className="category-grid__card">
              <div className="category-grid__media">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
