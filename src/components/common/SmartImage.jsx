import { useState } from "react";
import imageManifest from "../../generated/image-manifest.json";

/**
 * Photography with the layout-shift and payload problems handled.
 *
 * - Reserves space via aspect-ratio, so nothing jumps while loading.
 * - Builds a srcset from the variants `npm run images` produced, when they
 *   exist. Without them it serves the single file, so the site works either
 *   way — the supplied photographs are 2000px and ~500-900KB each, which is
 *   heavy on a phone, and the variants cut that substantially.
 * - `priority` marks the hero: eager, high fetchpriority, no lazy flicker.
 * - `illustrative` adds the caption the Content Pack requires for any image
 *   that is not a genuine photograph of Navora's own operation.
 */

const RATIOS = {
  "21-9": "21 / 9",
  "16-9": "16 / 9",
  "3-2": "3 / 2",
  "4-3": "4 / 3",
  "1-1": "1 / 1",
  "4-5": "4 / 5",
};

function srcSetFor(src) {
  const entry = imageManifest?.[src];
  if (!entry?.widths?.length) return undefined;

  const base = src.replace(/\.[^.]+$/, "");
  return entry.widths
    .map((w) => (w === entry.width ? `${src} ${w}w` : `${base}-${w}.webp ${w}w`))
    .join(", ");
}

function SmartImage({
  src,
  alt = "",
  ratio = "4-3",
  sizes = "100vw",
  priority = false,
  illustrative = false,
  className = "",
}) {
  const [failed, setFailed] = useState(false);
  const missing = !src || failed;

  const frame = (
    <div
      className={`smart-image ${className}`.trim()}
      style={{ aspectRatio: RATIOS[ratio] || RATIOS["4-3"] }}
    >
      {missing ? (
        <span className="smart-image__empty" role="img" aria-label={alt} />
      ) : (
        <img
          src={src}
          srcSet={srcSetFor(src)}
          sizes={srcSetFor(src) ? sizes : undefined}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );

  if (!illustrative || missing) return frame;

  return (
    <figure className="smart-image__figure">
      {frame}
      <figcaption className="smart-image__caption">Illustrative image</figcaption>
    </figure>
  );
}

export default SmartImage;
