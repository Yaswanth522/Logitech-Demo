import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const icon = (hash) => `https://id.logi.com/${hash}.svg`;

const LOGO = icon("dccd9087eb658a5474eb27d1b43901a4");
const INFO_ICON = icon("c85985b1ba78361f503cb23610c803ea");

const PROVIDERS = [
  { name: "apple", icon: icon("59407fec24e306d5d42714a7f0e12513") },
  { name: "facebook", icon: icon("dd35f4cb39344170e77950243b16d033") },
  { name: "google", icon: icon("7a76bdec0e8f8b4b56e968a902f8549b") },
  { name: "amazon", icon: icon("53fb0a2aa555774dadbf8b52874ee8c0") },
  { name: "spotify", icon: icon("34e979233ce234bc5b7bb45cedd09dc4") },
  { name: "twitch", icon: icon("4bb948aaabf094b1a6f18ff72883b897") },
  { name: "wechat", icon: icon("940d0d01c80588475c27f814bf64a2c2") },
  { name: "microsoft", icon: icon("6fde54c9b424c05c0688a0646d91e798") },
];

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  if (user) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    login(email);
    navigate("/");
  }

  function handleProvider(name) {
    login(`demo.user@${name}.com`);
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={LOGO} alt="Logitech" className="login-logo" />
        <p className="login-subtitle">Log in with your Logi ID.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="field__toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>

          <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>

          <p className="captcha-notice">
            This site is protected by hCaptcha and its{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>{" "}
            apply.
          </p>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <a href="#" className="passkey-link" onClick={(e) => e.preventDefault()}>
          🔑 Use Passkey To Login
          <img src={INFO_ICON} alt="" width="14" height="14" />
        </a>
        <a href="#" className="lost-passkey-link" onClick={(e) => e.preventDefault()}>
          Lost passkey?
        </a>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <div className="provider-row">
          {PROVIDERS.map((p) => (
            <button
              key={p.name}
              type="button"
              className="provider-btn"
              aria-label={`Continue with ${p.name}`}
              onClick={() => handleProvider(p.name)}
            >
              <img src={p.icon} alt="" />
            </button>
          ))}
        </div>

        <a href="#" className="bottom-link" onClick={(e) => e.preventDefault()}>
          Create an Account
        </a>
        <a href="#" className="bottom-link" onClick={(e) => e.preventDefault()}>
          About Logi ID
        </a>
      </div>
    </div>
  );
}

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      {off && (
        <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="1.6" />
      )}
    </svg>
  );
}
