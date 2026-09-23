/**
 * Browser titles, search descriptions and breadcrumb names.
 *
 * Based on the Navora Global Website Content Pack, p. 9. Titles for Home,
 * Products and For Business are worded around the terms buyers search for
 * (Indian food sourcing, spices, honey, millets, rice, wholesale, private
 * label) without adding any claim the Content Pack does not make.
 *
 * Keep titles under ~60 characters and descriptions under ~160 so search
 * results do not truncate them. `name` is the page's breadcrumb label.
 */

export const defaultSeo = {
  title: "Navora Global Limited | Indian Food Products and Partnerships",
  description:
    "Navora connects Indian farmers, food producers and brands with importers, distributors and business buyers in the UK and international markets.",
  image: "/images/og-default.jpg",
};

export const pageSeo = {
  home: {
    title: "Indian Food Producers to UK & Global Markets | Navora Global",
    description:
      "UK-registered Navora Global connects Indian farmers, producers and brands with importers, distributors and business buyers. Spices, honey, millets and rice.",
    path: "/",
  },
  about: {
    title: "About Navora Global | UK and India Food Trade Connections",
    description:
      "Learn how UK-registered Navora Global works with a partner in Kerala to connect Indian food producers and brands with international markets.",
    path: "/about",
    name: "About",
    pageType: "AboutPage",
  },
  products: {
    title: "Indian Food Products for Business: Spices & Honey | Navora",
    description:
      "Source ginger, cardamom, honey, millets and rice from India, plus Navora Honey Shot. Request specifications, samples and commercial information.",
    path: "/products",
    name: "Products",
    pageType: "CollectionPage",
  },
  forBusiness: {
    title: "Wholesale, Distribution & Private Label from India | Navora",
    description:
      "For importers, distributors, retailers and food-service buyers: discuss sourcing, wholesale, private-label and market-entry opportunities with Navora Global.",
    path: "/for-business",
    name: "For Business",
  },
  responsibleSourcing: {
    title: "Responsible Food Sourcing | Navora Global",
    description:
      "Read how Navora is developing transparent supply relationships with Indian farmers, producers, suppliers and food brands.",
    path: "/responsible-sourcing",
    name: "Responsible Sourcing",
  },
  contact: {
    title: "Contact Navora Global | Product and Partnership Enquiries",
    description:
      "Contact Navora Global about food sourcing, distribution, supplier, brand and Navora product opportunities.",
    path: "/contact",
    name: "Contact",
    pageType: "ContactPage",
  },
  privacyNotice: {
    title: "Privacy Notice | Navora Global",
    description:
      "How Navora Global Limited collects, uses and protects personal information submitted through this website.",
    path: "/privacy-notice",
    name: "Privacy Notice",
  },
  cookieNotice: {
    title: "Cookie Notice | Navora Global",
    description:
      "What cookies and similar technologies this website uses, and how to manage your preferences.",
    path: "/cookie-notice",
    name: "Cookie Notice",
  },
  websiteTerms: {
    title: "Website Terms | Navora Global",
    description:
      "The terms on which Navora Global Limited makes this website available to visitors.",
    path: "/website-terms",
    name: "Website Terms",
  },
  notFound: {
    title: "Page Not Found | Navora Global",
    description: "The page you were looking for could not be found.",
    path: null,
  },
};
