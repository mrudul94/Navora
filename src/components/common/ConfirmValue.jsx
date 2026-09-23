import { isPlaceholder, placeholderLabel } from "../../config/site";

/**
 * Renders a business fact from src/config/site.js.
 *
 * When the value is still an unconfirmed `TODO_CONFIRM_*` placeholder it is
 * shown as a conspicuous amber chip rather than as real data — so an
 * unfinished detail can never be mistaken for a genuine address, number or
 * partner name. Fill the value in src/config/site.js and the chip disappears.
 *
 * `as` controls how a confirmed value is linked: "email" and "tel" produce
 * mailto:/tel: links, anything else renders plain text.
 */
function ConfirmValue({ value, as = "text", className, fallback }) {
  if (isPlaceholder(value)) {
    if (fallback) {
      return (
        <span className={`confirm-placeholder ${className || ""}`.trim()} title="Awaiting confirmation from Navora">
          <span className="confirm-placeholder__value">{fallback}</span>
          <span className="badge badge--todo">To confirm</span>
        </span>
      );
    }
    return (
      <span className="badge badge--todo" title="Awaiting confirmation from Navora">
        To confirm: {placeholderLabel(value).toLowerCase()}
      </span>
    );
  }

  if (as === "email") {
    return (
      <a className={className} href={`mailto:${value}`}>
        {value}
      </a>
    );
  }

  if (as === "tel") {
    const dialNumber = value.replace(/\(0\)/g, "").replace(/[^+\d]/g, "");
    return (
      <a className={className} href={`tel:${dialNumber}`}>
        {value}
      </a>
    );
  }

  if (as === "instagram") {
    const handle = String(value).replace(/^@/, "");
    return (
      <a
        className={className}
        href={`https://instagram.com/${handle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {String(value).startsWith("@") ? value : `@${value}`}
      </a>
    );
  }

  return <span className={className}>{value}</span>;
}

export default ConfirmValue;
