/**
 * Navora mark: a bridge arc carrying a leaf — UK to India, sourcing.
 * Inline so it stays crisp and inherits the theme colours.
 */
function LogoMark({ size = 36, tone = "light", className = "" }) {
  const disc = tone === "dark" ? "rgba(255,255,255,0.07)" : "var(--green)";
  const arc = tone === "dark" ? "var(--orange-on-dark)" : "var(--gold)";
  const leafFront = tone === "dark" ? "#ffffff" : "var(--cream)";
  const leafBack = tone === "dark" ? "rgba(255,255,255,0.7)" : "var(--green-soft)";

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
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="31" r="2.6" fill={arc} />
      <circle cx="38" cy="31" r="2.6" fill={arc} />
      <path d="M24 13c-4.2 0-7.6 3.4-7.6 7.6 0 4.2 3.4 7.6 7.6 7.6 0-4.2 0-11 0-15.2Z" fill={leafFront} />
      <path d="M24 13c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6" fill={leafBack} />
    </svg>
  );
}

export default LogoMark;
