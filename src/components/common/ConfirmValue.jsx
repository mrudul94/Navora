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
function ConfirmValue({ value, as = "text", className }) {
  if (isPlaceholder(value)) {
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
    return (
      <a className={className} href={`tel:${value.replace(/[^+\d]/g, "")}`}>
        {value}
      </a>
    );
  }

  return <span className={className}>{value}</span>;
}

export default ConfirmValue;
