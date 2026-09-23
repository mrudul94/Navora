/**
 * Public paths of the PDFs generated at build time by scripts/catalogue.mjs.
 * Shared by the generator and the pages that link to them. The files exist
 * only in a production build (npm run build), not under `npm run dev`.
 */
export const CATALOGUE_PATH = "/downloads/navora-product-catalogue.pdf";

export const productSheetPath = (slug) => `/downloads/products/${slug}.pdf`;
