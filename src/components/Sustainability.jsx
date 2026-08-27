import { Link } from "react-router-dom";
import CategoryGrid from "./CategoryGrid";
import "./Sustainability.css";

const BLADE_CARDS = [
  { label: "Labels matters", image: "/images/home/logi-sustainability-blade-labels-matters.png" },
  { label: "Doing better matters", image: "/images/home/ogi-sustainability-blade-doing-better-matters.png" },
  { label: "Working together matters", image: "/images/home/logi-sustainability-blade-working-together-matters.png" },
];

export default function Sustainability() {
  return (
    <section className="sustainability">
      <div className="container sustainability__intro">
        <span className="eyebrow">Design for sustainability</span>
        <h2>Everything matters</h2>
        <p>
          When it comes to doing better for our planet, it's on us.
          <br />
          Every component. Every process. Every product.
        </p>
        <Link to="/" className="btn btn-secondary">
          Learn About Our Commitment
        </Link>
      </div>

      <CategoryGrid items={BLADE_CARDS} dark overlay />
    </section>
  );
}
