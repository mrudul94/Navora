/**
 * Single source of truth for Navora's business facts.
 *
 * Values beginning with `TODO_CONFIRM_` have not yet been supplied by the
 * client. They are rendered on the site as a visible amber placeholder chip
 * rather than silently shown as real data. See HANDOVER.md.
 */

export const TODO_PREFIX = "TODO_CONFIRM_";

export const site = {
  legalName: "Navora Global Limited",
  shortName: "Navora Global",
  wordmark: "NAVORA",
  wordmarkSub: "GLOBAL LIMITED",

  // --- Contact -------------------------------------------------------------
  email: "TODO_CONFIRM_PRIMARY_BUSINESS_EMAIL",
  telephone: "TODO_CONFIRM_BUSINESS_TELEPHONE",
  businessHours: "TODO_CONFIRM_BUSINESS_HOURS",

  // --- Registration --------------------------------------------------------
  companyNumber: "TODO_CONFIRM_COMPANY_NUMBER",
  jurisdiction: "England and Wales",
  registeredOffice: "TODO_CONFIRM_REGISTERED_OFFICE",

  // --- Operating partner ---------------------------------------------------
  // Do not publish the partner's name until they have confirmed permission.
  keralaPartner: "TODO_CONFIRM_PARTNER_COMPANY_NAME",
  keralaPartnerLocation: "Kerala, India",

  // --- Web -----------------------------------------------------------------
  domain: "TODO_CONFIRM_DOMAIN",
  origin: "https://www.navoraglobal.co.uk",

  // --- Legal ---------------------------------------------------------------
  legalLastReviewed: "21 September 2026",
  copyrightYear: 2026,
};

/** True when a value is still an unconfirmed placeholder. */
export function isPlaceholder(value) {
  return typeof value === "string" && value.startsWith(TODO_PREFIX);
}

/** Human-readable label for an unconfirmed value, e.g. "PRIMARY BUSINESS EMAIL". */
export function placeholderLabel(value) {
  if (!isPlaceholder(value)) return "";
  return value.slice(TODO_PREFIX.length).replace(/_/g, " ");
}

/** Returns the value, or `fallback` when it is still a placeholder. */
export function resolved(value, fallback = null) {
  return isPlaceholder(value) ? fallback : value;
}
