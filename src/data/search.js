import { getProductBySlug, products } from "./products";

const productOf = (slug) => {
  const p = getProductBySlug(slug);
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    image: p.heroImage,
    gallery: p.gallery,
    category: p.category,
    bullets: p.bullets,
    description: p.description,
  };
};

export const SEARCH_TABS = [
  { id: "all", label: "All" },
  { id: "shopping", label: "Shopping" },
  { id: "support", label: "Support" },
  { id: "videos", label: "Videos" },
];

export const searchPacks = [
  {
    id: "mx-master-3s",
    keywords: [
      "mx master 3s",
      "mx master",
      "master 3s",
      "what is mx master",
      "ergonomic mouse",
      "wireless mouse",
      "office mouse",
      "quiet click",
      "8k dpi",
      "mice",
      "mouse",
    ],
    product: productOf("mx-master-3s"),
    rating: 4.7,
    reviewCount: 613,
    merchant: "logitech.com",
    chips: ["Wireless", "Mice & Trackballs", "Ergonomic", "Quiet Clicks", "Under $100"],
    aiOverview: {
      lead: "The Logitech MX Master 3S is a high-end, ergonomic wireless mouse built for office productivity and creative work.",
      highlights: [
        "high-end, ergonomic wireless mouse",
        "8K DPI optical sensor",
        "Quiet Clicks",
        "MagSpeed electromagnetic scroll wheel",
      ],
      features: [
        "8K DPI Sensor — tracks on virtually any surface, including glass",
        "Quiet Clicks — 90% less click noise than MX Master 3",
        "MagSpeed scroll wheel — fast electromagnetic scrolling",
        "USB-C quick charge — 3 minutes for a full day of use",
        "Logi Flow — works across up to 3 computers",
      ],
      more: "It is designed for people who spend long hours at a desk — developers, designers, and knowledge workers — with a sculpted shape that supports the palm and a thumb rest for precision. Pair it with MX Keys S and Logi Options+ to move the cursor and clipboard between Mac and Windows machines. Battery life is typically measured in weeks, not days, and the mouse reconnects instantly when you switch devices with Easy-Switch.",
    },
    sources: [
      {
        site: "logitech.com",
        kind: "Product",
        title: "MX Master 3S — Wireless Performance Mouse",
        snippet:
          "The iconic mouse, masterfully improved. Quiet clicks, an 8K DPI sensor, and MagSpeed scrolling.",
        image: productOf("mx-master-3s").image,
        href: "/products/mx-master-3s",
      },
      {
        site: "support.logitech.com",
        kind: "Support",
        title: "Set up MX Master 3S on Windows or macOS",
        snippet:
          "Pair over Bluetooth or Logi Bolt, then customize buttons and Flow in Logi Options+.",
        image: productOf("mx-master-3s").gallery[2],
        href: "/products/mx-master-3s",
      },
      {
        site: "logitech.com/blog",
        kind: "Guide",
        title: "MX Master 3S vs MX Anywhere 3S: which mouse fits your desk?",
        snippet:
          "Full-size sculpted comfort versus a compact travel mouse — both share the 8K DPI sensor.",
        image: productOf("mx-anywhere-3s").image,
        href: "/products/mx-anywhere-3s",
      },
    ],
    videos: [
      {
        title: "Logitech MX Master 3S: Watch this Before Buying",
        duration: "8:42",
        image: productOf("mx-master-3s").gallery[1],
        href: "/products/mx-master-3s",
        source: "YouTube · Tech review",
      },
      {
        title: "Quiet Clicks and MagSpeed scrolling, up close",
        duration: "3:18",
        image: productOf("mx-master-3s").gallery[3],
        href: "/products/mx-master-3s",
        source: "Logitech",
      },
      {
        title: "Desk setup: MX Master 3S + MX Keys S",
        duration: "6:05",
        image: productOf("mx-keys-s").image,
        href: "/products/mx-keys-s",
        source: "Logitech",
      },
    ],
    webResults: [
      {
        urlLabel: "https://www.logitech.com › products › mice › mx-master-3s",
        title: "MX Master 3S Wireless Performance Mouse",
        snippet:
          "A wireless mouse with an 8K DPI sensor, Quiet Clicks, and MagSpeed electromagnetic scrolling — built for creators and anyone who lives on a computer.",
        href: "/products/mx-master-3s",
      },
      {
        urlLabel: "https://support.logitech.com › mx-master-3s",
        title: "MX Master 3S — Setup, pairing, and troubleshooting",
        snippet:
          "Download Logi Options+, pair via Bluetooth or Bolt receiver, and remap the gesture button, thumb wheel, and MagSpeed mode.",
        href: "/products/mx-master-3s",
      },
      {
        urlLabel: "https://www.logitech.com › products › mice › mx-anywhere-3s",
        title: "MX Anywhere 3S Compact Performance Mouse",
        snippet:
          "The same 8K DPI tracking and quiet MagSpeed scrolling in a travel-ready shape that fits in a bag.",
        href: "/products/mx-anywhere-3s",
      },
    ],
    support: [
      {
        title: "How to pair MX Master 3S with a new computer",
        snippet: "Hold Easy-Switch for 3 seconds until the LED blinks, then select the mouse in Bluetooth settings.",
        href: "/products/mx-master-3s",
      },
      {
        title: "Battery and USB-C charging",
        snippet: "A 3-minute charge covers a full workday. A full charge lasts up to 70 days, depending on use.",
        href: "/products/mx-master-3s",
      },
      {
        title: "Logi Flow: move cursor and files between computers",
        snippet: "Enable Flow in Options+ on each machine, then drag the pointer off the edge of the display to hop desktops.",
        href: "/products/mx-master-3s",
      },
    ],
  },
  {
    id: "mx-keys-s",
    keywords: ["mx keys s", "mx keys", "keyboard", "keyboards", "backlit keyboard", "wireless keyboard"],
    product: productOf("mx-keys-s"),
    rating: 4.6,
    reviewCount: 428,
    merchant: "logitech.com",
    chips: ["Wireless", "Keyboards", "Backlit", "Multi-device", "Under $120"],
    aiOverview: {
      lead: "MX Keys S is Logitech's wireless illuminated keyboard for people who type all day — smart backlighting, Perfect Stroke keys, and multi-device switching.",
      highlights: ["wireless illuminated keyboard", "smart backlighting", "Perfect Stroke keys", "multi-device switching"],
      features: [
        "Smart backlighting that responds to your hands and the room",
        "Spherically-dished Perfect Stroke keycaps for accuracy",
        "Pairs with up to 3 devices via Easy-Switch",
        "Up to 10 days of battery with backlight on",
        "Works with Windows, macOS, iOS, Linux, and Android",
      ],
      more: "Pair it with MX Master 3S for a matched desk. Logi Options+ lets you create app-specific shortcuts, and Logi Flow shares clipboard across computers. The low-profile keys are quieter than a typical mechanical board, which is why it shows up in offices and on video calls.",
    },
    sources: [
      {
        site: "logitech.com",
        kind: "Product",
        title: "MX Keys S — Wireless Illuminated Keyboard",
        snippet: "A quieter, smarter typing experience with Perfect Stroke keys and adaptive backlighting.",
        image: productOf("mx-keys-s").image,
        href: "/products/mx-keys-s",
      },
      {
        site: "support.logitech.com",
        kind: "Support",
        title: "MX Keys S setup and Easy-Switch",
        snippet: "Pair three devices and jump between them with the Easy-Switch keys above the number row.",
        image: productOf("mx-keys-s").gallery[1],
        href: "/products/mx-keys-s",
      },
      {
        site: "logitech.com",
        kind: "Bundle",
        title: "Pair MX Keys S with MX Master 3S",
        snippet: "The MX desk — keyboard, mouse, and Flow — is built to feel like one system.",
        image: productOf("mx-master-3s").image,
        href: "/products/mx-master-3s",
      },
    ],
    videos: [
      {
        title: "MX Keys S first look: smart backlight and Perfect Stroke",
        duration: "5:21",
        image: productOf("mx-keys-s").gallery[0],
        href: "/products/mx-keys-s",
        source: "Logitech",
      },
      {
        title: "Typing test: MX Keys S vs a mechanical board",
        duration: "7:04",
        image: productOf("mx-keys-s").gallery[2],
        href: "/products/mx-keys-s",
        source: "YouTube",
      },
    ],
    webResults: [
      {
        urlLabel: "https://www.logitech.com › products › keyboards › mx-keys-s",
        title: "MX Keys S Wireless Illuminated Keyboard",
        snippet:
          "Smart backlighting, Perfect Stroke keys, and multi-OS support in a low-profile wireless keyboard.",
        href: "/products/mx-keys-s",
      },
      {
        urlLabel: "https://support.logitech.com › mx-keys-s",
        title: "MX Keys S — pairing, backlight, and firmware",
        snippet: "Update firmware in Logi Options+ and customize the function row per application.",
        href: "/products/mx-keys-s",
      },
    ],
    support: [
      {
        title: "Turn smart backlighting on or off",
        snippet: "Open Logi Options+ → MX Keys S → Backlighting to set sensitivity, timeout, and brightness.",
        href: "/products/mx-keys-s",
      },
      {
        title: "Switch between paired computers",
        snippet: "Tap Easy-Switch keys 1–3. The LED confirms which channel is active.",
        href: "/products/mx-keys-s",
      },
    ],
  },
  {
    id: "mx-anywhere-3s",
    keywords: ["mx anywhere 3s", "mx anywhere", "travel mouse", "compact mouse", "portable mouse"],
    product: productOf("mx-anywhere-3s"),
    rating: 4.5,
    reviewCount: 291,
    merchant: "logitech.com",
    chips: ["Wireless", "Compact", "Travel", "8K DPI", "Under $80"],
    aiOverview: {
      lead: "MX Anywhere 3S is a compact performance mouse for people who work from more than one desk — 8K DPI tracking, quiet MagSpeed scrolling, and a shape that fits in a bag.",
      highlights: ["compact performance mouse", "8K DPI tracking", "quiet MagSpeed scrolling"],
      features: [
        "8K DPI sensor that tracks on glass",
        "MagSpeed scrolling, 90% quieter than the previous generation",
        "Travel-friendly footprint",
        "USB-C: 3 minutes for a full day",
        "Pairs with up to 3 devices",
      ],
      more: "Choose Anywhere 3S if you commute or hot-desk. Choose MX Master 3S if you want a full palm rest and more programmable controls at a single desk.",
    },
    sources: [
      {
        site: "logitech.com",
        kind: "Product",
        title: "MX Anywhere 3S Compact Performance Mouse",
        snippet: "Desktop tracking in a mouse that disappears into a laptop sleeve.",
        image: productOf("mx-anywhere-3s").image,
        href: "/products/mx-anywhere-3s",
      },
      {
        site: "logitech.com",
        kind: "Compare",
        title: "MX Master 3S — full-size alternative",
        snippet: "More buttons, a sculpted rest, and the same sensor family for all-day desk work.",
        image: productOf("mx-master-3s").image,
        href: "/products/mx-master-3s",
      },
    ],
    videos: [
      {
        title: "MX Anywhere 3S: the travel mouse that tracks on glass",
        duration: "4:11",
        image: productOf("mx-anywhere-3s").gallery[0],
        href: "/products/mx-anywhere-3s",
        source: "Logitech",
      },
    ],
    webResults: [
      {
        urlLabel: "https://www.logitech.com › products › mice › mx-anywhere-3s",
        title: "MX Anywhere 3S Compact Performance Mouse",
        snippet: "8K DPI, quiet MagSpeed, and USB-C charging in a compact wireless mouse.",
        href: "/products/mx-anywhere-3s",
      },
    ],
    support: [
      {
        title: "Does MX Anywhere 3S work on glass?",
        snippet: "Yes. The 8K DPI Darkfield sensor is specified to track on glass 4 mm and thicker.",
        href: "/products/mx-anywhere-3s",
      },
    ],
  },
  {
    id: "brio-4k",
    keywords: ["brio", "4k pro webcam", "webcam", "webcams", "4k webcam", "camera"],
    product: productOf("brio-4k"),
    rating: 4.4,
    reviewCount: 512,
    merchant: "logitech.com",
    chips: ["4K", "Webcams", "HDR", "Windows Hello", "Under $130"],
    aiOverview: {
      lead: "The 4K Pro Webcam (Brio) is Logitech's flagship Ultra HD camera for people who need to look sharp on calls and streams — 4K at 30 fps, HDR, and RightLight 3.",
      highlights: ["flagship Ultra HD camera", "4K at 30 fps", "HDR", "RightLight 3"],
      features: [
        "Ultra HD 4K at 30 fps, or 1080p at 60 fps",
        "HDR and RightLight 3 for mixed lighting",
        "5x digital zoom with autofocus",
        "Windows Hello facial sign-in",
        "Works with Zoom, Teams, Meet, and streaming apps",
      ],
      more: "Brio is the camera you put on a monitor arm or laptop when lighting is imperfect. Pair it with Litra Glow if you want broadcast-style fill light without a full studio.",
    },
    sources: [
      {
        site: "logitech.com",
        kind: "Product",
        title: "4K Pro Webcam (Brio)",
        snippet: "Premium Ultra HD video with HDR and RightLight, built for professionals and streamers.",
        image: productOf("brio-4k").image,
        href: "/products/brio-4k",
      },
      {
        site: "logitech.com",
        kind: "Lighting",
        title: "Litra Glow — pair with Brio for better light",
        snippet: "TrueSoft LED fill that clips to a monitor and runs over USB.",
        image: productOf("litra-glow").image,
        href: "/products/litra-glow",
      },
    ],
    videos: [
      {
        title: "Brio 4K Pro: how it looks in a real home office",
        duration: "9:02",
        image: productOf("brio-4k").gallery[0],
        href: "/products/brio-4k",
        source: "YouTube",
      },
    ],
    webResults: [
      {
        urlLabel: "https://www.logitech.com › products › webcams › 4k-pro",
        title: "4K Pro Webcam (Brio) — Premium Ultra HD Webcam",
        snippet: "4K, HDR, RightLight 3, and Windows Hello in Logitech's professional webcam.",
        href: "/products/brio-4k",
      },
    ],
    support: [
      {
        title: "Brio shows as a generic camera in Zoom",
        snippet: "Select “4K Pro Webcam” in the meeting app’s video settings and allow camera access in the OS.",
        href: "/products/brio-4k",
      },
    ],
  },
  {
    id: "litra-glow",
    keywords: ["litra glow", "litra", "streaming light", "streaming", "led light", "desk light"],
    product: productOf("litra-glow"),
    rating: 4.6,
    reviewCount: 187,
    merchant: "logitech.com",
    chips: ["Lighting", "Streaming", "USB-powered", "TrueSoft", "Under $60"],
    aiOverview: {
      lead: "Litra Glow is a compact USB LED streaming light with TrueSoft diffusion — built to make skin tones look natural on camera without a full lighting kit.",
      highlights: ["USB LED streaming light", "TrueSoft diffusion", "skin tones look natural"],
      features: [
        "TrueSoft technology for natural skin tones",
        "Adjustable brightness and color temperature",
        "Clips to a monitor or stands on a desk",
        "Powered over USB — no extra brick",
        "Made with recycled materials",
      ],
      more: "Use it with the 4K Pro Webcam when overhead lights make you look washed out. Controls live on the light and in Logitech’s desktop software.",
    },
    sources: [
      {
        site: "logitech.com",
        kind: "Product",
        title: "Litra Glow Premium LED Streaming Light",
        snippet: "Broadcast-style fill light in a USB-powered bar that clips to any monitor.",
        image: productOf("litra-glow").image,
        href: "/products/litra-glow",
      },
      {
        site: "logitech.com",
        kind: "Webcam",
        title: "4K Pro Webcam — the camera Litra Glow is built for",
        snippet: "Ultra HD video that actually benefits from decent light.",
        image: productOf("brio-4k").image,
        href: "/products/brio-4k",
      },
    ],
    videos: [
      {
        title: "Litra Glow vs a ring light: which looks better on a webcam?",
        duration: "6:33",
        image: productOf("litra-glow").gallery[1],
        href: "/products/litra-glow",
        source: "YouTube",
      },
    ],
    webResults: [
      {
        urlLabel: "https://www.logitech.com › products › lighting › litra-glow",
        title: "Litra Glow Premium LED Streaming Light",
        snippet: "TrueSoft LED lighting that clips to a monitor and runs over USB.",
        href: "/products/litra-glow",
      },
    ],
    support: [
      {
        title: "Litra Glow not turning on",
        snippet: "Use a powered USB-A or USB-C port. Low-power hubs often cannot drive the LEDs at full brightness.",
        href: "/products/litra-glow",
      },
    ],
  },
];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function resolveSearch(query, { allowFallback = true } = {}) {
  const q = normalize(query);
  if (!q) return { pack: null, query, fallback: false };

  let best = null;
  let bestScore = 0;

  for (const pack of searchPacks) {
    let score = 0;
    for (const keyword of pack.keywords) {
      const kw = normalize(keyword);
      if (q === kw) score += 100;
      else if (q.includes(kw)) score += 40 + kw.length;
      else if (kw.includes(q) && q.length > 3) score += 20;
      else {
        const tokens = q.split(" ").filter(Boolean);
        const hits = tokens.filter((t) => t.length > 2 && kw.includes(t)).length;
        score += hits * 8;
      }
    }
    if (score > bestScore) {
      best = pack;
      bestScore = score;
    }
  }

  if (bestScore === 0) {
    return {
      pack: allowFallback ? searchPacks[0] : null,
      query,
      fallback: Boolean(allowFallback),
    };
  }

  return { pack: best, query, fallback: false };
}

export function shoppingProductsFor(pack) {
  if (!pack) return products;
  const primary = products.find((p) => p.slug === pack.product.slug);
  const rest = products.filter((p) => p.slug !== pack.product.slug);
  return primary ? [primary, ...rest] : products;
}
