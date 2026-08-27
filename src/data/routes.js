// Maps real Logitech category/product labels to the internal routes this
// clone actually has (home, login, and 5 product pages). Anything without a
// matching product page falls back to home rather than a dead link.
export const ROUTE_FOR = {
  mice: "/products/mx-master-3s",
  keyboards: "/products/mx-keys-s",
  webcams: "/products/brio-4k",
  lighting: "/products/litra-glow",
  streaming: "/products/litra-glow",
};

export function routeFor(label) {
  const key = label.toLowerCase().replace(/[^a-z]/g, "");
  for (const [k, v] of Object.entries(ROUTE_FOR)) {
    if (key.includes(k)) return v;
  }
  return "/";
}
