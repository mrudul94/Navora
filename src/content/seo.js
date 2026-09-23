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
  imageAlt:
    "Jute sacks of Indian spices, including green cardamom, dried red chillies, cinnamon and cloves",
  // Every local share card (og-default.jpg, og-*.jpg) is exported at this
  // size and type. Keep new cards the same so the declared size stays true.
  imageType: "image/jpeg",
  imageWidth: 1200,
  imageHeight: 630,
};

export const pageSeo = {
  home: {
    title: "Source Indian Food Products for UK & Global Markets | Navora",
    description:
      "UK-registered Navora Global connects Indian farmers, producers and brands with importers, distributors and business buyers. Spices, honey, millets and rice.",
    path: "/",
  },
  about: {
    title: "About Navora Global | UK-Registered Food Trade with India",
    description:
      "Learn how UK-registered Navora Global works with a partner in Kerala to connect Indian food producers and brands with international markets.",
    path: "/about",
    ogImage: "/images/og-about.jpg",
    ogImageAlt: "Two people discussing produce samples at a table in a spice sorting room",
    name: "About",
    pageType: "AboutPage",
  },
  products: {
    title: "Indian Spices, Honey, Millets & Rice for Business | Navora",
    description:
      "Source ginger, cardamom, honey, millets and rice from India, plus Navora Honey Shot. Request specifications, samples and commercial information.",
    path: "/products",
    ogImage: "/images/og-products.jpg",
    ogImageAlt:
      "Green cardamom, nutmeg and dried chillies in wooden bowls beside a brass mortar and pestle",
    name: "Products",
    pageType: "CollectionPage",
  },
  forBusiness: {
    title: "Wholesale, Distribution & Private Label from India | Navora",
    description:
      "For importers, distributors, retailers and food-service buyers: discuss sourcing, wholesale, private-label and market-entry opportunities with Navora Global.",
    path: "/for-business",
    ogImage: "/images/og-for-business.jpg",
    ogImageAlt: "Cartons and jute sacks of ginger and cardamom stacked on pallets for export",
    name: "For Business",
  },
  responsibleSourcing: {
    title: "Responsible Food Sourcing from India | Navora Global",
    description:
      "How Navora approaches responsible food sourcing from India: origin, traceability, documents and a buyer checklist of what to ask before you source.",
    path: "/responsible-sourcing",
    ogImage: "/images/og-responsible-sourcing.jpg",
    ogImageAlt: "Crops growing on a smallholder farm in India",
    name: "Responsible Sourcing",
  },
  contact: {
    title: "Contact Navora Global | Indian Food Sourcing Enquiries",
    description:
      "Send Navora your Indian food sourcing, wholesale, private-label or partnership enquiry and get a clear answer on what our supplier network can offer.",
    path: "/contact",
    ogImage: "/images/og-contact.jpg",
    ogImageAlt: "Office desk with a notebook, briefcase and a labelled jar of green cardamom",
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
