/**
 * Generates public/sitemap.xml from the route definitions, so the sitemap
 * cannot drift from the site. Runs automatically before every build.
 *
 * Product URLs come from the approved fallback list. Once the CMS is the source
 * of truth, extend fetchProductSlugs() to query Sanity.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

function extract(file, pattern) {
  const source = readFileSync(resolve(root, file), "utf8");
  const global = new RegExp(pattern.source, "g");
  return [...source.matchAll(global)].map((match) => match[1]);
}

const ORIGIN = extract("src/config/site.js", /origin:\s*"([^"]+)"/)[0];

import { existsSync } from "node:fs";
import { createClient } from "@sanity/client";

// Static routes, taken from the SEO map (entries with a real path).
const staticPaths = extract("src/content/seo.js", /path:\s*"([^"]+)"/);

// Product detail routes from Sanity CMS.
let projectId = process.env.VITE_SANITY_PROJECT_ID;
let dataset = process.env.VITE_SANITY_DATASET || "production";
if (!projectId && existsSync(resolve(root, ".env"))) {
  const envContent = readFileSync(resolve(root, ".env"), "utf8");
  const m = envContent.match(/VITE_SANITY_PROJECT_ID=([^\s]+)/);
  if (m) projectId = m[1];
}
if (!projectId) projectId = "ltt6egj4";

async function fetchProductSlugs() {
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: true,
    });
    const slugs = await client.fetch('*[_type == "product" && isPublished == true].slug.current');
    return Array.isArray(slugs) ? slugs.filter(Boolean) : [];
  } catch (error) {
    console.warn("Could not query Sanity for sitemap:", error.message);
    return [];
  }
}

const productSlugs = await fetchProductSlugs();

const urls = [
  ...staticPaths.map((path) => ({
    loc: `${ORIGIN}${path}`,
    priority: path === "/" ? "1.0" : "0.8",
  })),
  ...productSlugs.map((slug) => ({
    loc: `${ORIGIN}/products/${slug}`,
    priority: "0.6",
  })),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${url.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
