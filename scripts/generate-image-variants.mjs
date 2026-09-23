/**
 * Generates responsive WebP variants for everything in public/images/.
 *
 *   npm run images
 *
 * The supplied photographs are 2000px wide and 500-900KB each — around 4.8MB
 * in total, which is slow on a phone or conference wifi. This writes smaller
 * variants beside each source and records them in a manifest that SmartImage
 * reads to build a srcset.
 *
 * Entirely optional: with no manifest, SmartImage serves the single original
 * and the site still works. Sources are never modified.
 */
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, basename, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public", "images");
const manifestPath = join(root, "src", "generated", "image-manifest.json");

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.log(
    "sharp is not installed — skipping variant generation.\n" +
      "  Install with `npm i -D sharp` to cut the image payload.\n" +
      "  The site works without it; images are served at full size."
  );
  // Never keep a manifest pointing at variants that were not generated — a
  // stale srcset makes browsers request 404s and show broken images.
  writeFileSync(manifestPath, "{}\n");
  process.exit(0);
}

const WIDTHS = [640, 960, 1400];
const SOURCES = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (
      SOURCES.has(extname(entry).toLowerCase()) &&
      !/-\d+\.webp$/.test(entry) &&
      entry !== "og-default.jpg"
    ) {
      out.push(full);
    }
  }
  return out;
}

const sources = walk(imagesDir);
const manifest = {};
let written = 0;
let savedKb = 0;

for (const file of sources) {
  // Windows returns backslashes; the key must match the URL used in src.
  const publicPath = "/" + relative(join(root, "public"), file).split(sep).join("/");
  const meta = await sharp(file).metadata();
  const usable = WIDTHS.filter((w) => w < (meta.width ?? 0));
  if (usable.length === 0) continue;

  const outBase = join(dirname(file), basename(file, extname(file)));

  for (const width of usable) {
    const out = `${outBase}-${width}.webp`;
    if (!existsSync(out)) {
      await sharp(file).resize({ width }).webp({ quality: 78 }).toFile(out);
      written++;
    }
    savedKb += Math.round(statSync(out).size / 1024);
  }

  const fullOut = `${outBase}-${meta.width}.webp`;
  if (!existsSync(fullOut)) {
    await sharp(file).webp({ quality: 78 }).toFile(fullOut);
    written++;
  }

  // Largest first is irrelevant to srcset, but keep it sorted for readability.
  manifest[publicPath] = {
    widths: [...usable, meta.width].sort((a, b) => a - b),
    width: meta.width,
    height: meta.height,
  };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  sources.length === 0
    ? "No images in public/images yet — manifest left empty."
    : `Processed ${sources.length} image(s), wrote ${written} new variant(s).\n` +
      `  Smallest set totals ~${savedKb} KB across all variants.`
);
