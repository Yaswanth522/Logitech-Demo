import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initialsFromName } from "../utils/name";
import { routeFor } from "../data/routes";
import { LOGO_URL } from "../data/brand";
import { products } from "../data/products";
import SearchDialog from "./SearchDialog";
import "./Header.css";

// Only the categories that map to one of our 5 real product pages —
// the mega-menu doesn't link anywhere we can't actually show a product.
const SHOP_CATEGORIES = [
  { label: "Mice", image: "/images/home/logitech-navigation-mice-mx-master-4.png" },
  { label: "Keyboards", image: "/images/home/logitech-navigation-keyboards-230-0.png" },
  { label: "Webcams", image: "/images/home/logitech-navigation-webcams-230-0.png" },
  { label: "Streaming", image: "/images/home/lighting-2.png" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <ul className="utility-bar__left">
            <li>
              <Link to="/">Logitech G</Link>
            </li>
            <li>
              <Link to="/">Business</Link>
            </li>
            <li>
              <Link to="/">Education</Link>
            </li>
            <li>
              <Link to="/">Outlet</Link>
            </li>
          </ul>
          <ul className="utility-bar__right">
            <li>
              <Link to="/">Support</Link>
            </li>
            <li>US, en</li>
          </ul>
        </div>
      </div>

      <div className="announcement-bar">
        Save up to $100 when you bundle MX Master 4*
      </div>

      <div className="site-header__bar container">
        <button
          className="site-header__burger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="site-header__logo" aria-label="Logitech home">
          <img src={LOGO_URL} alt="Logitech" />
        </Link>

        <nav className={`site-header__nav ${menuOpen ? "is-open" : ""}`}>
          <ul>
            <li className="has-mega">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>

              <div className="mega-menu mega-menu--single">
                <div className="mega-menu__col">
                  <h4>Shop by category</h4>
                  <div className="mega-menu__tiles">
                    {SHOP_CATEGORIES.map((c) => (
                      <Link key={c.label} to={routeFor(c.label)} className="mega-menu__tile">
                        <img src={c.image} alt="" loading="lazy" />
                        <span>{c.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mega-menu__col">
                  <h4>Our Products</h4>
                  <ul className="mega-menu__sublist mega-menu__sublist--single">
                    {products.map((product) => (
                      <li key={product.slug}>
                        <Link to={`/products/${product.slug}`}>{product.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Software
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Deals
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Planet
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <button className="search-pill" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
            <span>Search</span>
          </button>
          <button className="icon-btn" aria-label="Wishlist">
            <WishlistIcon />
          </button>

          {user ? (
            <div className="account-menu">
              <button className="account-menu__avatar" aria-label="Account menu">
                {initialsFromName(user.name)}
              </button>
              <div className="account-menu__dropdown">
                <span className="account-menu__greeting">Hi, {user.name}</span>
                <span className="account-menu__email">{user.email}</span>
                <button className="account-menu__logout" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Account">
              <AccountIcon />
            </Link>
          )}

          <button className="icon-btn" aria-label="Cart">
            <CartIcon />
          </button>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7.5-4.6-9.5-9C1 7.6 2.8 4.5 6 4.5c2 0 3.4 1.2 4 2.4.6-1.2 2-2.4 4-2.4 3.2 0 5 3.1 3.5 6.5-2 4.4-9.5 9-9.5 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h2l1.5 10.5A2 2 0 0 0 9.47 18H18a2 2 0 0 0 1.95-1.56L21.5 9H6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" />
    </svg>
  );
}
