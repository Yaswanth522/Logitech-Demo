import { Link } from "react-router-dom";
import "./HeroBanner.css";

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="banner-kicker">Alto Keys K98M</span>
          <h1>Satisfying Sound. Unmatched Feel.</h1>
          <div className="hero__price">
            <span className="hero__price-current">$101.99 - $109.99</span>
            <span className="hero__price-was">$119.99</span>
          </div>
          <Link
            to="/products/mx-keys-s"
            className="btn btn-primary"
            aria-label="Buy now Alto Keys K98M"
          >
            Buy now
          </Link>
        </div>
        <div className="hero__image">
          <picture>
            <source
              media="(min-width: 600px)"
              srcSet="https://resource.logitech.com/w_800,ar_1,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/homepage/banners/product-banner/hero-alto-keys-lilac-desktop--2.png"
            />
            <img src="/images/home/hero-alto-keys-lilac-mobile-v-2.png" alt="" />
          </picture>
        </div>
      </div>
    </section>
  );
}
