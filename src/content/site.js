/**
 * Navigation, footer and shared calls to action.
 * Source: Navora Global Website Content Pack, 19 September 2026 (pp. 3, 9).
 */

export const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "For Business", path: "/for-business" },
  { label: "Responsible Sourcing", path: "/responsible-sourcing" },
  { label: "Contact", path: "/contact" },
];

/** The header CTA sits alongside the nav, so it is not repeated in navItems. */
export const headerCta = {
  label: "Discuss Your Requirements",
  path: "/contact",
};

export const footer = {
  description:
    "Navora Global Limited is a UK-registered food trading and market-access company connecting Indian farmers, producers and brands with international buyers.",
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Products", path: "/products" },
      ],
    },
    {
      heading: "Business",
      links: [
        { label: "For Business", path: "/for-business" },
        { label: "Responsible Sourcing", path: "/responsible-sourcing" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Notice", path: "/privacy-notice" },
        { label: "Cookie Notice", path: "/cookie-notice" },
        { label: "Website Terms", path: "/website-terms" },
      ],
    },
  ],
};

/** Button labels approved by the pack. Nothing outside this list is invented. */
export const ctaLabels = {
  exploreProducts: "Explore Products",
  discussRequirements: "Discuss Your Requirements",
  becomePartner: "Become a Business Partner",
  requestProductInfo: "Request Product Information",
  introduceBrand: "Introduce Your Brand",
  introduceBusiness: "Introduce Your Business",
  aboutNavora: "About Navora",
  submitBusinessEnquiry: "Submit Business Enquiry",
  sendEnquiry: "Send Enquiry",
};
