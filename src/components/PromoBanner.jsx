import { Link } from "react-router-dom";
import "./PromoBanner.css";

const DESKTOP_BG =
  "https://resource.logitech.com/w_1900,h_600,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/banners/background-banner/logi-back-to-campus-hpb-desktop.jpg";
const MOBILE_BG =
  "https://resource.logitech.com/w_840,ar_16:9,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/banners/background-banner/logi-back-to-campus-hpb-mobile.jpg";

export default function PromoBanner() {
  return (
    <section
      className="promo-banner"
      style={{ "--bg-desktop": `url(${DESKTOP_BG})`, "--bg-mobile": `url(${MOBILE_BG})` }}
    >
      <div className="container promo-banner__inner">
        <span className="banner-kicker">Ready for a new semester</span>
        <h2>BOGO 30% OFF</h2>
        <p>
          From morning lectures to late-night hangouts, shop handpicked gear
          that does it all. Buy one, get one 30% off.
        </p>
        <p className="promo-banner__terms">
          Limited time offer. <Link to="/">Terms apply.</Link>
        </p>
        <div className="promo-banner__actions">
          <Link to="/" className="btn btn-teal">
            Shop Our Picks
          </Link>
          <Link to="/" className="btn btn-secondary">
            Shop Sale Items
          </Link>
        </div>
      </div>
    </section>
  );
}
