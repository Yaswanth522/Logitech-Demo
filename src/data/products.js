const img = (path, w = 760, h = 760, mode = "c_pad") =>
  `https://resource.logitech.com/w_${w},h_${h},${mode},q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/${path}`;

export const products = [
  {
    slug: "mx-master-3s",
    category: "Mice",
    name: "MX Master 3S",
    tagline: "Wireless Performance Mouse",
    price: 99.99,
    colors: ["Graphite", "Pale Grey"],
    heroImage: img("mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-left-front-view-black-new-8.png"),
    gallery: [
      img("mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-left-front-view-black-new-8.png"),
      img("mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-left-profile-view-black-new-4.png"),
      img("mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-rear-view-black-new-7.png"),
      img("mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-bottom-view-black-new-5.png"),
    ],
    bullets: [
      "8K DPI optical sensor tracks on virtually any surface, even glass",
      "Quiet Clicks — 90% less click noise than MX Master 3",
      "Electromagnetic MagSpeed scroll wheel — fast and precise",
      "USB-C quick charging: 3 minutes for a full day's use",
      "Works across up to 3 devices with Logi Flow",
    ],
    description:
      "MX Master 3S is a wireless performance mouse with an 8K DPI sensor, quiet clicks, and electromagnetic scrolling — built for creators, coders, and everyone in between.",
  },
  {
    slug: "mx-keys-s",
    category: "Keyboards",
    name: "MX Keys S",
    tagline: "Wireless Illuminated Keyboard",
    price: 109.99,
    colors: ["Graphite", "Black", "Pale Grey"],
    heroImage: img("keyboards/mx-keys-s/migration-assets-for-delorean-2025/gallery/mx-keys-s-bty-view-black-us.png"),
    gallery: [
      img("keyboards/mx-keys-s/migration-assets-for-delorean-2025/gallery/mx-keys-s-bty-view-black-us.png"),
      img("keyboards/mx-keys-s/migration-assets-for-delorean-2025/gallery/mx-keys-s-top-view-black-us.png"),
      img("keyboards/mx-keys-s/migration-assets-for-delorean-2025/gallery/mx-keys-s-fob-view-black-us.png"),
      img("keyboards/mx-keys-s/migration-assets-for-delorean-2025/gallery/mx-keys-s-bottom-view-black.png"),
    ],
    bullets: [
      "Smart backlighting adapts to typing speed and ambient light",
      "Perfect Stroke keys with spherically-dished keycaps for accuracy",
      "Pairs with up to 3 devices, switch with Logi Easy-Switch",
      "Up to 10 days of battery life on a full charge (backlight on)",
      "Works seamlessly with Windows, macOS, iOS, Linux, and Android",
    ],
    description:
      "MX Keys S is a wireless illuminated keyboard with smart backlighting and perfect stroke keys, engineered for a fast, quiet, and precise typing experience.",
  },
  {
    slug: "mx-anywhere-3s",
    category: "Mice",
    name: "MX Anywhere 3S",
    tagline: "Compact Performance Mouse",
    price: 79.99,
    colors: ["Graphite", "Pale Grey", "Rose"],
    heroImage: img("mice/mx-anywhere-3s/product-gallery/black/mx-anywhere-3s-mouse-3qtr-front-black.png"),
    gallery: [
      img("mice/mx-anywhere-3s/product-gallery/black/mx-anywhere-3s-mouse-3qtr-front-black.png"),
      img("mice/mx-anywhere-3s/product-gallery/black/mx-anywhere-3s-mouse-side-left-black.png"),
      img("mice/mx-anywhere-3s/product-gallery/black/mx-anywhere-3s-mouse-top-view-black.png"),
      img("mice/mx-anywhere-3s/product-gallery/black/mx-anywhere-3s-mouse-bottom-view-black.png"),
    ],
    bullets: [
      "8K DPI sensor tracks on glass and other glossy surfaces",
      "MagSpeed scrolling — 90% quieter than the previous generation",
      "Compact, travel-friendly design that fits in any bag",
      "USB-C quick charge: 3 minutes for a full day of use",
      "Pairs with up to 3 devices via Bluetooth or Logi Bolt",
    ],
    description:
      "MX Anywhere 3S is a compact performance mouse for people on the go, with an 8K DPI sensor and quiet MagSpeed scrolling in a travel-friendly footprint.",
  },
  {
    slug: "brio-4k",
    category: "Webcams",
    name: "4K Pro Webcam (Brio)",
    tagline: "Premium Ultra HD Webcam",
    price: 129.99,
    colors: ["Graphite"],
    heroImage: img("webcams/4k-pro-webcam/gallery/4k-pro-gallery-1.png"),
    gallery: [
      img("webcams/4k-pro-webcam/gallery/4k-pro-gallery-1.png"),
      img("webcams/4k-pro-webcam/gallery/4k-pro-gallery-2.png"),
      img("webcams/4k-pro-webcam/gallery/4k-pro-gallery-3.png"),
      img("webcams/4k-pro-webcam/gallery/4k-pro-gallery-4.png"),
    ],
    bullets: [
      "Ultra HD 4K resolution at 30fps, or Full HD 1080p at 60fps",
      "HDR and RightLight 3 for clear video in any lighting",
      "5x digital zoom with autofocus keeps you sharp and centered",
      "Windows Hello support for secure facial-recognition sign-in",
      "Works with all major video conferencing apps out of the box",
    ],
    description:
      "The 4K Pro Webcam delivers premium Ultra HD video with HDR and RightLight technology, built for streamers and professionals who need to look their best on camera.",
  },
  {
    slug: "litra-glow",
    category: "Streaming",
    name: "Litra Glow",
    tagline: "Premium LED Streaming Light",
    price: 59.99,
    colors: ["Graphite"],
    heroImage: img("lighting/litra-glow/gallery/litra-glow-streaming-light-front-view-graphite.png"),
    gallery: [
      img("lighting/litra-glow/gallery/litra-glow-streaming-light-front-view-graphite.png"),
      img("lighting/litra-glow/gallery/litra-glow-streaming-light-3-4-front-view-graphite.png"),
      img("lighting/litra-glow/gallery/litra-glow-streaming-light-side-view-graphite.png"),
      img("lighting/litra-glow/gallery/litra-glow-streaming-light-back-view-graphite.png"),
    ],
    bullets: [
      "TrueSoft technology renders skin tones naturally, without harshness",
      "Adjustable brightness and color temperature via desktop app or on-device controls",
      "Compact and lightweight — clips to any monitor or sits on a desk",
      "Powered over USB, no separate power supply needed",
      "Built from recycled materials in fully recyclable packaging",
    ],
    description:
      "Litra Glow is a premium LED streaming light with TrueSoft technology, giving streamers and creators broadcast-quality lighting in a compact, USB-powered form factor.",
  },
];

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
