import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductBySlug } from "../data/products";

const SCRIPT_SRC = "https://cdn.yellowmessenger.com/plugin/widget-v3/prod/dist/loader.umd.js";
const BOT_ID = "x1787672212177";
const HOST = "https://r4.nexus.yellow.ai";

export default function ChatWidget() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [scriptReady, setScriptReady] = useState(!!window.ChatWidget);
  const hasInitialized = useRef(false);

  const productSlug = pathname.match(/^\/products\/([^/]+)/)?.[1];
  const productName = (productSlug && getProductBySlug(productSlug)?.name) || "--";

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

  // Re-init whenever the script becomes ready, the logged-in user's email
  // changes, or the viewed product changes.
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
          productName,
        },
      },
    });
    hasInitialized.current = true;
  }, [scriptReady, user?.email, productName]);

  return null;
}
