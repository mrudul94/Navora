/**
 * Build-time data handed to the prerenderer and the first client paint.
 *
 * scripts/prerender.mjs fetches products once, puts them on globalThis, and
 * inlines the same JSON into each page. Components seed their initial state
 * from here, so the prerendered HTML contains real content and the client
 * hydrates against identical markup.
 *
 * Returns null when nothing was prefetched, and callers fall back to fetching.
 */

const KEY = "__NAVORA_DATA__";

export function setPrefetchedData(data) {
  globalThis[KEY] = data;
}

export function getPrefetchedProducts() {
  const data = globalThis[KEY];
  return Array.isArray(data?.products) ? data.products : null;
}

export function getPrefetchedProduct(slug) {
  const products = getPrefetchedProducts();
  if (!products) return undefined; // undefined = nothing prefetched
  return products.find((product) => product.slug === slug) ?? null;
}
