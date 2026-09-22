import { useState } from "react";
import imageManifest from "../../generated/image-manifest.json";

/**
 * Responsive image with a branded fallback.
 *
 * - Reserves space via aspect-ratio, so nothing shifts while loading (CLS).
 * - Builds a srcset from the variants `npm run images` generated, when they
 *   exist; otherwise serves the single file untouched.
 * - `priority` marks the hero: eager loading plus fetchpriority="high".
 * - If the file is missing or fails, renders a soft brand gradient with a
 *   spice-leaf line pattern and the item name — never a grey placeholder box.
 */

const RATIOS = {
  "16-9": "16 / 9",
  "3-2": "3 / 2",
  "4-3": "4 / 3",
  "1-1": "1 / 1",
  "4-5": "4 / 5",
  "21-9": "21 / 9",
};

/** Variants are keyed by the public path, e.g. "/images/hero-main.jpg". */
function buildSrcSet(src) {
  const entry = imageManifest?.[src];
  if (!entry?.widths?.length) return null;

  const base = src.replace(/\.[^.]+$/, "");
  return {
    webp: entry.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
    fallback: entry.widths.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
  };
}

function BrandFallback({ label }) {
  return (
    <div className="smart-image__fallback" role="img" aria-label={label || "Image coming soon"}>
      <svg
        className="smart-image__pattern"
        viewBox="0 0 240 160"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="si-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--green-50)" />
            <stop offset="100%" stopColor="var(--gold-soft)" />
          </linearGradient>
        </defs>
        <rect width="240" height="160" fill="url(#si-grad)" />
        <g
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        >
          {/* leaf */}
          <path d="M120 54c-16 0-29 13-29 29 0 16 13 29 29 29 0-16 0-42 0-58Z" />
          <path d="M120 54c16 0 29 13 29 29 0 16-13 29-29 29" />
          <path d="M120 58v46" />
          <path d="M120 72l12-8M120 84l14-9M120 96l12-8M120 72l-12-8M120 84l-14-9M120 96l-12-8" />
          {/* seeds */}
          <circle cx="52" cy="40" r="4" />
          <circle cx="196" cy="126" r="4" />
          <circle cx="188" cy="36" r="3" />
          <circle cx="56" cy="124" r="3" />
        </g>
      </svg>
      {label && <span className="smart-image__label">{label}</span>}
    </div>
  );
}

function SmartImage({
  src,
  alt = "",
  ratio = "4-3",
  sizes = "100vw",
  priority = false,
  fallbackLabel,
  className = "",
  illustrative = false,
}) {
  const [failed, setFailed] = useState(false);
  const missing = !src || failed;

  const style = { aspectRatio: RATIOS[ratio] || RATIOS["4-3"] };
  const srcSet = missing ? null : buildSrcSet(src);

  const frame = (
    <div className={`smart-image ${className}`.trim()} style={style}>
      {missing ? (
        <BrandFallback label={fallbackLabel || alt} />
      ) : (
        <img
          src={src}
          srcSet={srcSet?.fallback || undefined}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );

  // The content guidelines require any non-Navora photograph to be labelled.
  if (!illustrative || missing) return frame;

  return (
    <figure className="smart-image__figure">
      {frame}
      <figcaption className="smart-image__caption">Illustrative image</figcaption>
    </figure>
  );
}

export default SmartImage;
