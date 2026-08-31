import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductBySlug } from "../data/products";
import { markLogiReady } from "../utils/logiBridge";
import {
  BOT_ID,
  HOST,
  YM_LOADER_SRC,
  YM_WIDGET_CHANNEL,
  isLocalWidget,
} from "../utils/ymWidget";

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

  useEffect(() => {
    if (window.ChatWidget) {
      setScriptReady(true);
      return;
    }

    let cancelled = false;
    // Which build is loaded decides whether send/prewarm/on exist at all, so
    // say it out loud rather than leaving a missing API to look like a bug.
    console.info(`[Ask Logi] widget build: ${YM_WIDGET_CHANNEL} (${YM_LOADER_SRC})`);

    if (isLocalWidget) {
      import(/* @vite-ignore */ YM_LOADER_SRC)
        .then(() => {
          if (!cancelled) setScriptReady(true);
        })
        .catch((error) => {
          console.error(
            `[Ask Logi] Local widget loader failed (${YM_LOADER_SRC}). Is widget Vite running on that origin?`,
            error
          );
        });
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = YM_LOADER_SRC;
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
      // Search renders the assistant's reply in its own UI, so it needs the
      // reply events — off by default, and not the same thing as SDK mode.
      hostEvents: true,
      yellowMessenger: {
        botId: BOT_ID,
        host: HOST,
        payload: {
          source: "ask-logi-search",
          ...(user?.email ? { email: user.email } : {}),
          productName: productNameFor(pathname),
          visitedUrls: [...visitedUrls.current],
        },
      },
    });
    hasInitialized.current = true;
    // Re-announced after every re-init; the bridge registers its listeners once.
    markLogiReady();
  }, [scriptReady, user?.email, pathname]);

  return null;
}
