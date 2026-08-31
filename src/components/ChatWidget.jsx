import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductBySlug } from "../data/products";

const SCRIPT_SRC = "https://cdn.yellowmessenger.com/plugin/widget-v3/prod/dist/loader.umd.js";
const BOT_ID = "x1787672212177";
const HOST = "https://r4.nexus.yellow.ai";

function productNameFor(pathname) {
  const slug = pathname.match(/^\/products\/([^/]+)/)?.[1];
  return (slug && getProductBySlug(slug)?.name) || "--";
}

export default function ChatWidget() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [scriptReady, setScriptReady] = useState(!!window.ChatWidget);
  const hasInitialized = useRef(false);
  const visitedUrls = useRef([]);

  // Load the widget's loader script exactly once
  useEffect(() => {
    if (window.ChatWidget) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, []);

  // Record every page the visitor lands on (since this SPA session started),
  // so payload.visitedUrls always reflects the full trail.
  useEffect(() => {
    if (visitedUrls.current[visitedUrls.current.length - 1] !== pathname) {
      visitedUrls.current.push(pathname);
    }
  }, [pathname]);

  // Re-init on every route/identity change so payload (email, productName,
  // visitedUrls) is always live and correct — the SDK has no lightweight way
  // to update payload without a full destroy()+init(), confirmed: calling
  // init() again without destroy() first is silently a no-op (no network or
  // postMessage activity), so this reload is unavoidable if payload must
  // stay accurate.
  useEffect(() => {
    if (!scriptReady || typeof window.ChatWidget === "undefined") return;

    if (hasInitialized.current && typeof window.ChatWidget.destroy === "function") {
      window.ChatWidget.destroy();
    }

    window.ChatWidget.init({
      yellowMessenger: {
        botId: BOT_ID,
        host: HOST,
        payload: {
          ...(user?.email ? { email: user.email } : {}),
          productName: productNameFor(pathname),
          visitedUrls: [...visitedUrls.current],
        },
      },
    });
    hasInitialized.current = true;
  }, [scriptReady, user?.email, pathname]);

  return null;
}
