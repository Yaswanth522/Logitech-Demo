import { Link } from "react-router-dom";
import { routeFor } from "../data/routes";
import "./QuickLinks.css";

// Trimmed to just the categories that map to one of our 5 real product pages.
const LINKS = [
  { label: "Mice", image: "/images/home/quick-link-mice.png" },
  { label: "Keyboards", image: "/images/home/quick-link-keyboard.png" },
  { label: "Webcams", image: "/images/home/quick-link-webcams.png" },
  { label: "Streaming", image: "/images/home/lighting-2.png" },
];

export default function QuickLinks() {
  return (
    <div className="quick-links">
      <ul className="quick-links__row">
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link to={routeFor(link.label)} aria-label={`Shop ${link.label}`}>
              <img src={link.image} alt={link.label} loading="lazy" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
