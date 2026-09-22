/**
 * Navora mark: a bridge arc (UK to India) carrying a leaf.
 * Inline so it inherits colour and stays crisp at any size.
 * Replace public/images/brand/logo-mark.svg when the real mark exists.
 */
function LogoMark({ size = 34, className = "", tone = "light" }) {
  const arc = tone === "dark" ? "var(--gold)" : "var(--gold)";
  const disc = tone === "dark" ? "rgba(255,255,255,0.08)" : "var(--green)";
  const leafFront = tone === "dark" ? "#ffffff" : "var(--paper)";
  const leafBack = tone === "dark" ? "rgba(255,255,255,0.72)" : "var(--sage)";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="23" fill={disc} />
      <path
        d="M10 31c0-8.5 6.6-15 14-15s14 6.5 14 15"
        fill="none"
        stroke={arc}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="10" cy="31" r="2.8" fill={arc} />
      <circle cx="38" cy="31" r="2.8" fill={arc} />
      <path d="M24 13c-4.4 0-8 3.6-8 8 0 4.4 3.6 8 8 8 0-4.4 0-11.6 0-16Z" fill={leafFront} />
      <path d="M24 13c4.4 0 8 3.6 8 8 0 4.4-3.6 8-8 8" fill={leafBack} />
    </svg>
  );
}

export default LogoMark;
