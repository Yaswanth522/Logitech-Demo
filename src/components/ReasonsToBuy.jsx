import { Link } from "react-router-dom";
import "./ReasonsToBuy.css";

const REASONS = [
  {
    image: "/images/home/klarna-icon-desktop.png",
    heading: "Buy now, pay later",
    body: "Pay at your own pace with Klarna payment plans. Get what you love, choose how you pay.",
  },
  {
    image: "/images/home/shipping-icon-desktop.png",
    heading: "Free shipping",
    body: "Enjoy free standard shipping on all orders over $29.",
  },
  {
    image: "/images/home/sheerid-icon-new.png",
    heading: "Students and Heroes get 20% Off",
    body: "Students and Heroes can benefit from a 20% discount on Logitech products. It couldn't be easier.",
    cta: "Get Verified",
  },
  {
    image: "/images/home/money-icon-desktop1.png",
    heading: "Money-back guarantee",
    body: "Shop risk-free with our easy returns and 30-day money back guarantee.",
  },
  {
    image: "/images/home/service-icon-desktop.png",
    heading: "24/7 customer service",
    body: "We're here for you whenever you need. Reach us via chat, phone, or email for your convenience.",
  },
  {
    image: "/images/home/offers-icon-desktop.png",
    heading: "Exclusive offers",
    body: "Unlock exclusive gifts when you purchase select products. Sign up for emails to stay up-to-date on offers.",
  },
];

export default function ReasonsToBuy() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Reasons to buy from Logitech.com</h2>
        <p className="reasons-intro">
          We're all about making your shopping experience seamless. Shop
          direct and enjoy perks like free shipping, multiple payment
          options, easy returns, and access to exclusive offers only on
          logitech.com.
        </p>
        <div className="reasons-grid">
          {REASONS.map((reason) => (
            <div key={reason.heading} className="reason">
              <img src={reason.image} alt={reason.heading} loading="lazy" />
              <h3>{reason.heading}</h3>
              <p>{reason.body}</p>
              {reason.cta && (
                <Link to="/" className="reason__cta">
                  {reason.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
