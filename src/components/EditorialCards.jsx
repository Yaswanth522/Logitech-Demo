import { Link } from "react-router-dom";
import "./EditorialCards.css";

const CARDS = [
  {
    image: "/images/home/mobi-ecosystem-tile-3.jpg",
    heading: "Shop Mobi Fold & Save on your setup",
    body: "Maximize your productivity on the go. Build your ultimate set up and save up to $65 off when you bundle the Mobi Fold mouse with select products.",
    to: "/products/mx-anywhere-3s",
  },
  {
    image: "/images/home/signature-slim-solar-k980-keyboard.jpg",
    heading: "Bundle and Save",
    body: "$25 off Slim Solar+ Keyboard when you bundle with MX Master 4",
    to: "/products/mx-keys-s",
  },
  {
    image: "/images/home/woman-holding-spotlight-2-in-lilac.jpg",
    heading: "Present. Engage. Inspire.",
    body: "Haptic feedback, advanced digital highlighting effects, and customization give you the power to keep viewers engaged.",
    to: "/",
  },
  {
    image: "/images/home/wave-keys-and-lift-sand-combo.jpg",
    heading: "Transform Your Desk with Wave Keys + Lift",
    body: "Shop Wave Keys + Lift, designed for less pressure and improved wrist and forearm posture at the desk. Great fit for small to medium hands.",
    to: "/products/mx-keys-s",
  },
  {
    image: "/images/home/mx-ecosystem.jpg",
    heading: "Shop MX Master 4 & Save On Your Ultimate Setup",
    body: "Save up to $100 when you bundle the MX Master 4 with select workspace products.",
    to: "/products/mx-master-3s",
  },
];

export default function EditorialCards() {
  return (
    <section className="editorial-cards">
      <div className="editorial-cards__row">
        {CARDS.map((card) => (
          <article key={card.heading} className="editorial-card">
            <img src={card.image} alt="Card Image" loading="lazy" />
            <div className="editorial-card__body">
              <h3>{card.heading}</h3>
              <p>{card.body}</p>
              <Link to={card.to} className="editorial-card__cta">
                Shop Now
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
