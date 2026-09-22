/**
 * Paper grain and the brass section divider.
 *
 * The grain is generated with an SVG filter rather than a bitmap, so it costs
 * no network request and scales to any viewport. It is what stops the flat
 * cream grounds reading as a template.
 */

import { useId } from "react";

export function Grain({ opacity = 0.4 }) {
  // useId keeps the filter id stable between server render and hydration.
  const id = `grain${useId().replace(/:/g, "")}`;

  return (
    <svg className="grain" style={{ opacity }} aria-hidden="true" focusable="false">
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

/** A cardamom pod, drawn once and reused as the divider glyph. */
export function CardamomGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--brass)"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3c-3.3 0-5.6 3.6-5.6 9S8.7 21 12 21s5.6-3.6 5.6-9S15.3 3 12 3Z" />
      <path d="M12 3v18" />
      <path d="M8.3 8.4c1 .7 2.3 1.1 3.7 1.1s2.7-.4 3.7-1.1" />
      <path d="M8.3 15.6c1-.7 2.3-1.1 3.7-1.1s2.7.4 3.7 1.1" />
    </svg>
  );
}

/** Thin brass rule with a cardamom pod centred. The site's only motif. */
export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider__rule" />
      <CardamomGlyph className="divider__glyph" />
      <span className="divider__rule" />
    </div>
  );
}

export default Grain;
