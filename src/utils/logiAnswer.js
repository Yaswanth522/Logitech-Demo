import { resolveSearch, searchPacks } from "../data/search";

const SUPPORT_RE =
  /\b(issue|problem|facing|not working|doesn't work|doesnt work|broken|pair|pairing|connect|connection|bluetooth|battery|charg|setup|help|fix|error|won't|wont|can't|cant|trouble|troubleshoot|dead|unresponsive|keys? stuck|backlight)\b/i;

const PRODUCT_RE = /\b(what is|what's|whats|tell me about|explain|specs?|features?|review)\b/i;

const ISSUE_PATTERNS = [
  { id: "pairing", re: /\b(pair|pairing|connect|connection|bluetooth|easy-?switch|won't connect|wont connect|not connecting)\b/i },
  { id: "battery", re: /\b(battery|charg|usb-?c|power|dying|dead|drain)\b/i },
  { id: "scroll", re: /\b(scroll|magSpeed|wheel)\b/i },
  { id: "backlight", re: /\b(backlight|lighting|keys glow|illuminat)\b/i },
  { id: "video", re: /\b(dark|blurry|focus|zoom|camera|webcam|video|looks)\b/i },
  { id: "power", re: /\b(not turning on|won't turn|wont turn|no light|usb)\b/i },
];

const CATEGORY_FALLBACK = [
  { re: /\b(keyboard|keys|typing|type)\b/i, id: "mx-keys-s" },
  { re: /\b(webcam|camera|brio|video call)\b/i, id: "brio-4k" },
  { re: /\b(light|litra|ring light|desk light)\b/i, id: "litra-glow" },
  { re: /\b(travel|portable|anywhere|compact mouse)\b/i, id: "mx-anywhere-3s" },
  { re: /\b(mouse|mice|click|scroll)\b/i, id: "mx-master-3s" },
];

const PLAYBOOKS = {
  "mx-keys-s": {
    pairing: {
      title: "MX Keys S is not pairing",
      body: "Most keyboard issues are the Easy-Switch channel, Bluetooth, or a drained battery — not a broken board. Work through these in order.",
      steps: [
        "Confirm the keyboard is switched on (the switch is on the back).",
        "Hold the Easy-Switch key (1, 2, or 3) for 3 seconds until the LED blinks.",
        "On your computer, open Bluetooth settings and select MX Keys S.",
        "If it still fails, forget the device in Bluetooth, then pair again — or use the Logi Bolt receiver.",
      ],
    },
    battery: {
      title: "MX Keys S battery or charging",
      body: "A full charge lasts up to 10 days with backlight on. If it dies overnight, backlight timeout is usually the cause.",
      steps: [
        "Plug in USB-C. You should see a charging LED.",
        "In Logi Options+, lower backlight brightness and shorten the timeout.",
        "Leave it on the charger for 10 minutes, then try typing again.",
      ],
    },
    backlight: {
      title: "MX Keys S backlight",
      body: "Smart backlighting is controlled in Logi Options+. If keys stay dark, it is often a setting — not a hardware fault.",
      steps: [
        "Open Logi Options+ → MX Keys S → Backlighting.",
        "Turn smart lighting on and raise brightness.",
        "Wave a hand over the keys. If they still stay off, check battery and USB-C charge.",
      ],
    },
    general: {
      title: "MX Keys S troubleshooting",
      body: "You mentioned a problem with a Logitech keyboard. For MX Keys S, start with pairing and power — those fix most cases.",
      steps: [
        "Make sure the Easy-Switch channel matches the computer you are using.",
        "Hold Easy-Switch for 3 seconds to re-pair over Bluetooth.",
        "Charge over USB-C for a few minutes, then retry.",
        "Update firmware in Logi Options+ if keys still misbehave.",
      ],
    },
  },
  "mx-master-3s": {
    pairing: {
      title: "MX Master 3S is not connecting",
      body: "The mouse stores three devices. If the cursor is dead, it is often on the wrong Easy-Switch channel.",
      steps: [
        "Press the Easy-Switch button on the bottom until the LED for the right computer lights up.",
        "Hold Easy-Switch 3 seconds to enter pairing, then choose MX Master 3S in Bluetooth.",
        "Or plug in the Logi Bolt receiver and pair from Logi Options+.",
      ],
    },
    battery: {
      title: "MX Master 3S battery",
      body: "A 3-minute USB-C charge covers a workday. A full charge is typically weeks, not hours.",
      steps: [
        "Connect USB-C. Use the mouse while it charges if you need it immediately.",
        "If it still dies fast, update firmware in Logi Options+.",
      ],
    },
    scroll: {
      title: "MagSpeed scrolling feels off",
      body: "The wheel has a ratchet mode and a free-spin mode. Options+ controls the switchover speed.",
      steps: [
        "Flick the wheel hard once — it should go into MagSpeed free-spin.",
        "In Logi Options+, set SmartShift sensitivity so it matches how you scroll.",
      ],
    },
    general: {
      title: "MX Master 3S troubleshooting",
      body: "For this mouse, start with the Easy-Switch channel and a short USB-C charge before assuming hardware failure.",
      steps: [
        "Toggle Easy-Switch so it matches this computer.",
        "Charge for 3 minutes over USB-C.",
        "Re-pair Bluetooth, or use the Bolt receiver.",
      ],
    },
  },
  "mx-anywhere-3s": {
    pairing: {
      title: "MX Anywhere 3S is not pairing",
      body: "Same Easy-Switch model as the rest of MX. Re-pair one channel at a time.",
      steps: [
        "Hold Easy-Switch 3 seconds until the LED blinks.",
        "Select MX Anywhere 3S in Bluetooth or pair through Logi Options+ with Bolt.",
      ],
    },
    battery: {
      title: "MX Anywhere 3S charging",
      body: "USB-C quick charge: a few minutes is enough for a day on the road.",
      steps: ["Plug in USB-C and wait for the LED.", "Avoid unpowered travel hubs — they often do not charge."],
    },
    general: {
      title: "MX Anywhere 3S troubleshooting",
      body: "If tracking fails, confirm you are not on glass thinner than 4 mm. Then re-pair.",
      steps: [
        "Try a notebook, cloth, or desk — not a very thin glass table.",
        "Re-pair with Easy-Switch, then charge over USB-C.",
      ],
    },
  },
  "brio-4k": {
    video: {
      title: "Brio looks dark or soft",
      body: "Brio needs the meeting app to select the right camera, and it needs light. RightLight cannot invent brightness in a dark room.",
      steps: [
        "In Zoom, Teams, or Meet, set the camera to 4K Pro Webcam — not a generic FaceTime/laptop cam.",
        "Allow camera access in system settings.",
        "Add a Litra Glow or face a window. Harsh overhead light is the usual problem.",
      ],
    },
    general: {
      title: "4K Pro Webcam troubleshooting",
      body: "Most Brio issues are the wrong camera selected in the meeting app, or the OS blocking access.",
      steps: [
        "Quit the meeting app fully, then reopen it.",
        "Choose “4K Pro Webcam (Brio)” in video settings.",
        "Check macOS/Windows camera permissions for that app.",
      ],
    },
  },
  "litra-glow": {
    power: {
      title: "Litra Glow will not turn on",
      body: "This light draws more power than a keyboard. A laptop hub often cannot run it at full brightness.",
      steps: [
        "Plug it into a powered USB port on the computer, not a cheap hub.",
        "Press the power button on the light itself.",
        "If it flickers, try another cable.",
      ],
    },
    general: {
      title: "Litra Glow troubleshooting",
      body: "If the light is dim or off, it is almost always USB power, not the LEDs.",
      steps: [
        "Use a powered USB-A or USB-C port.",
        "Raise brightness with the on-device controls.",
      ],
    },
  },
};

function classifyIntent(query) {
  if (SUPPORT_RE.test(query)) return "support";
  if (PRODUCT_RE.test(query)) return "product";
  return "product";
}

function classifyIssue(query) {
  for (const item of ISSUE_PATTERNS) {
    if (item.re.test(query)) return item.id;
  }
  return "general";
}

function packById(id) {
  return searchPacks.find((pack) => pack.id === id) || null;
}

function matchPack(query) {
  const { pack } = resolveSearch(query, { allowFallback: false });
  if (pack) return pack;
  for (const item of CATEGORY_FALLBACK) {
    if (item.re.test(query)) return packById(item.id);
  }
  return null;
}

function playbookFor(pack, issue) {
  const set = PLAYBOOKS[pack.id] || {};
  return set[issue] || set.general || {
    title: `${pack.product.name} help`,
    body: pack.aiOverview.lead,
    steps: pack.support.map((item) => item.snippet),
  };
}

export function answerQuery(query) {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const intent = classifyIntent(trimmed);
  const issue = classifyIssue(trimmed);
  const pack = matchPack(trimmed);

  if (!pack) {
    return {
      kind: "empty",
      intent,
      title: "Nothing matched yet",
      body: "Try a product name, or describe the problem — for example “keyboard not pairing” or “webcam looks dark”.",
    };
  }

  if (intent === "support") {
    const help = playbookFor(pack, issue);
    return {
      kind: "help",
      intent,
      issue,
      product: pack.product,
      title: help.title,
      body: help.body,
      steps: help.steps,
      href: `/products/${pack.product.slug}`,
      cta: `View ${pack.product.name}`,
    };
  }

  return {
    kind: "product",
    intent,
    product: pack.product,
    title: pack.product.name,
    body: pack.aiOverview.lead,
    steps: pack.aiOverview.features.slice(0, 3),
    price: pack.product.price,
    rating: pack.rating,
    reviewCount: pack.reviewCount,
    href: `/products/${pack.product.slug}`,
    cta: `View ${pack.product.name}`,
  };
}

function isChatPanelOpen() {
  const iframe = document.getElementById("ym-widget-v3-frame");
  return Boolean(iframe && iframe.offsetWidth > 0 && getComputedStyle(iframe).display !== "none");
}

function submitViaFloatingLauncher(text) {
  if (!text) {
    document.querySelector('[aria-label="Open chat widget"]')?.click();
    return isChatPanelOpen();
  }

  const input = document.querySelector('[aria-label="Type your message"]');
  const sendBtn = document.querySelector('[aria-label="Send message"]');
  if (!input || !sendBtn) return false;

  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, text);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  if (sendBtn.disabled) return false;
  sendBtn.click();
  return isChatPanelOpen();
}

export function openLogiChat(message) {
  const text = typeof message === "string" ? message.trim() : "";

  function tryOpen() {
    if (typeof window.ChatWidget?.open === "function") {
      window.ChatWidget.open(text || undefined);
      if (isChatPanelOpen()) return true;
    }
    if (submitViaFloatingLauncher(text)) return true;
    const plugin = window.YellowMessengerPlugin;
    if (typeof plugin?.openBot === "function") {
      plugin.openBot();
      return true;
    }
    return false;
  }

  if (tryOpen()) return true;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (tryOpen() || attempts >= 20) window.clearInterval(timer);
  }, 150);
  return false;
}
