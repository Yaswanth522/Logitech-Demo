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
  const prevEmail = useRef(user?.email);
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

  // Record every page the visitor lands on (since this SPA session started)
  // without touching the widget — this is what lets us report the full
  // navigation trail without reloading the widget on every click.
  useEffect(() => {
    if (visitedUrls.current[visitedUrls.current.length - 1] !== pathname) {
      visitedUrls.current.push(pathname);
    }
  }, [pathname]);

  function initWidget() {
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
  }

  // Initialize exactly once, as soon as the script is ready.
  useEffect(() => {
    if (!scriptReady || typeof window.ChatWidget === "undefined" || hasInitialized.current) return;
    initWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  // Only re-init when the logged-in identity actually changes (login or
  // logout) — not on every route change, so moving around the site never
  // reloads the widget.
  useEffect(() => {
    if (!hasInitialized.current || prevEmail.current === user?.email) return;
    prevEmail.current = user?.email;
    if (typeof window.ChatWidget.destroy === "function") window.ChatWidget.destroy();
    initWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  return null;
}
