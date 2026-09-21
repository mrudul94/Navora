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

// Static routes, taken from the SEO map (entries with a real path).
const staticPaths = extract("src/content/seo.js", /path:\s*"([^"]+)"/);

// Product detail routes.
const productSlugs = extract(
  "src/content/productsFallback.js",
  /slug:\s*"([^"]+)"/
);

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
