/**
 * Generates responsive WebP variants for everything in public/images/.
 *
 *   npm run images
 *
 * Optional. The site works without it — SmartImage falls back to the single
 * file. Run it after dropping in new photography to cut mobile payload.
 *
 * Writes <name>-<width>.webp beside each source and records what exists in
 * src/generated/image-manifest.json, which SmartImage reads to build srcset.
 * Sources are left untouched.
 */
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, extname, basename, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolveRoot();
const imagesDir = join(root, "public", "images");
const manifestPath = join(root, "src", "generated", "image-manifest.json");

function resolveRoot() {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.log(
    "sharp is not installed — skipping variant generation.\n" +
      "  Install it with `npm i -D sharp` if you want responsive srcset.\n" +
      "  The site works fine without it."
  );
  writeFileSync(manifestPath, "{}\n");
  process.exit(0);
}

const WIDTHS = [640, 960, 1400, 2000];
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SOURCE_EXT.has(extname(entry).toLowerCase()) && !/-\d+\.webp$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const sources = walk(imagesDir);
const manifest = {};
let written = 0;

for (const file of sources) {
  const publicPath = "/" + relative(join(root, "public"), file).split(/[\/]/).join("/");
  const meta = await sharp(file).metadata();
  const usable = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (usable.length === 0) continue;

  const outBase = join(dirname(file), basename(file, extname(file)));
  mkdirSync(dirname(outBase), { recursive: true });

  for (const width of usable) {
    const out = `${outBase}-${width}.webp`;
    if (existsSync(out)) continue;
    await sharp(file).resize({ width }).webp({ quality: 80 }).toFile(out);
    written++;
  }

  manifest[publicPath] = { widths: usable, width: meta.width, height: meta.height };
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  sources.length === 0
    ? "No source images in public/images yet — manifest left empty."
    : `Processed ${sources.length} image(s), wrote ${written} new variant(s).`
);
