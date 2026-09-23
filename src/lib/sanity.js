import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2025-01-01";

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

/**
 * Builds a delivery URL for a Sanity image.
 *
 * Always go through this rather than using `asset->url` directly: the raw asset
 * URL is the ORIGINAL upload, so a full-size camera file would be served to
 * every visitor untouched. This resizes on Sanity's CDN, negotiates WebP/AVIF
 * per browser, and respects the hotspot the editor set in the Studio.
 */
export function getImageUrl(source, options = {}) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (!builder) return "";

  const { width = 1600, quality = 80, height, fit = "max" } = options;

  let image = builder.image(source).width(width).quality(quality).fit(fit).auto("format");
  if (height) image = image.height(height);

  return image.url();
}

/** Product images are displayed at 42vw at most; 1600px covers 2x displays. */
const PRODUCT_IMAGE_WIDTH = 1600;

/** Adds CDN-sized image URLs to a product record. */
function withImageUrls(product) {
  if (!product) return product;

  return {
    ...product,
    imageUrl: getImageUrl(product.mainImage, { width: PRODUCT_IMAGE_WIDTH }),
    gallery: Array.isArray(product.gallery)
      ? product.gallery
          .filter((item) => item?.asset)
          .map((item) => ({
            ...item,
            url: getImageUrl(item, { width: PRODUCT_IMAGE_WIDTH }),
          }))
      : [],
  };
}

/** Matches the product schema in navora-cms/schemaTypes/product.js. */
const productFields = `
  _id,
  name,
  "slug": slug.current,
  ownership,
  category,
  subheading,
  shortDescription,
  description,
  origin,
  availableForms,
  gradesVarieties,
  packaging,
  minimumOrderQuantity,
  shelfLifeStorage,
  certifications[]{ name, scope, evidenceUrl },
  documentation,
  markets,
  mainImage,
  "imageAlt": mainImage.alt,
  "imageIsIllustrative": mainImage.isIllustrative,
  gallery[]{
    asset,
    hotspot,
    crop,
    alt,
    isIllustrative
  },
  displayOrder
`;

const LIST_QUERY = `*[_type == "product" && isPublished == true] | order(displayOrder asc, name asc) { ${productFields} }`;
const SINGLE_QUERY = `*[_type == "product" && isPublished == true && slug.current == $slug][0] { ${productFields} }`;

/**
 * The previous site could sit on "Loading products from Sanity CMS…"
 * indefinitely when the CMS was slow or unreachable — a defect raised before
 * handover. Every query is now bounded, and a timeout shows the "being
 * updated" empty state rather than leaving the visitor waiting.
 */
const QUERY_TIMEOUT_MS = Number(import.meta.env.VITE_CMS_TIMEOUT_MS) || 8000;

function withTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} timed out after ${QUERY_TIMEOUT_MS}ms`)),
        QUERY_TIMEOUT_MS
      )
    ),
  ]);
}

/**
 * Returns the products published in Sanity, and nothing else: the CMS is the
 * only source of products. An unconfigured, empty or unreachable CMS returns
 * an empty list, and the Products page shows its empty state.
 */
export async function getProducts() {
  if (!client) return [];

  try {
    const products = await withTimeout(client.fetch(LIST_QUERY), "Product list query");
    return Array.isArray(products) ? products.map(withImageUrls) : [];
  } catch (error) {
    console.error("Could not load products from the CMS", error);
    return [];
  }
}

/** Returns one published product by slug from Sanity, or null. */
export async function getProductBySlug(slug) {
  if (!slug || !client) return null;

  try {
    const product = await withTimeout(client.fetch(SINGLE_QUERY, { slug }), "Product query");
    return product ? withImageUrls(product) : null;
  } catch (error) {
    console.error("Could not load the product from the CMS", error);
    return null;
  }
}
