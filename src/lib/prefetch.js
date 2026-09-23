/**
 * Build-time data shared between the prerenderer and the browser.
 *
 * scripts/prerender.mjs fetches the product list once, renders every route
 * with it, and inlines the same data into each page as window.__NAVORA_DATA__.
 * Components read it as their initial state, so the static HTML contains real
 * product content for search engines and the client hydrates against
 * identical markup. Pages still refetch in an effect to pick up CMS edits.
 */

let serverData = null;

/** Called by the prerenderer before rendering. */
export function setPrefetchedData(data) {
  serverData = data;
}

/** Returns prefetched data for `key`, or undefined when there is none. */
export function getPrefetched(key) {
  if (serverData) return serverData[key];
  if (typeof window !== "undefined" && window.__NAVORA_DATA__) {
    return window.__NAVORA_DATA__[key];
  }
  return undefined;
}

/** Looks up one product from the prefetched list. */
export function getPrefetchedProduct(slug) {
  const products = getPrefetched("products");
  if (!Array.isArray(products)) return undefined;
  return products.find((product) => product.slug === slug);
}
