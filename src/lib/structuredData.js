import { site, resolved } from "../config/site";
import { leadership } from "../content/about";
import { whatWeOffer } from "../content/home";

/**
 * schema.org JSON-LD builders.
 *
 * Search engines and AI answer engines use this to identify who Navora is,
 * where it is registered and what it deals in. Only facts already published
 * on the site go in here — the same content rules apply as for page copy.
 * Values still awaiting client confirmation are left out rather than published.
 */

const ORG_ID = `${site.origin}/#organization`;
const WEBSITE_ID = `${site.origin}/#website`;

export function organization() {
  const companyNumber = resolved(site.companyNumber);

  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.shortName,
    legalName: site.legalName,
    url: `${site.origin}/`,
    logo: {
      "@type": "ImageObject",
      url: `${site.origin}/logo.png`,
    },
    image: `${site.origin}/images/og-default.jpg`,
    description:
      "UK-registered food trading and market-access company connecting Indian farmers, producers and food brands with importers, distributors, retailers and business buyers in the UK and international markets.",
    email: site.email,
    telephone: site.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "29 Nightingale Road",
      addressLocality: "South Croydon",
      postalCode: "CR2 8PS",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.telephone,
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Indian food sourcing",
      "Food import and export between India and the UK",
      "Spices",
      "Ginger",
      "Cardamom",
      "Honey",
      "Millets",
      "Rice",
      "Private-label food products",
      "Food distribution and market entry",
    ],
    founder: leadership.founders.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
    makesOffer: whatWeOffer.cards.map((card) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: card.heading,
        description: card.text,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
      },
    })),
    ...(site.sameAs?.length ? { sameAs: site.sameAs } : {}),
    ...(companyNumber ? { identifier: companyNumber } : {}),
  };
}

/**
 * The page itself, tied to the website and to Navora as publisher. `type` is
 * a WebPage subtype where one fits (AboutPage, ContactPage, CollectionPage).
 */
export function webPage({ type = "WebPage", url, name, description, image, hasBreadcrumb }) {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.legalName,
    alternateName: site.shortName,
    url: `${site.origin}/`,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

/** `items` is [{ name, path }], starting with Home. `url` is the page it belongs to. */
export function breadcrumbList(items, url) {
  return {
    "@type": "BreadcrumbList",
    ...(url ? { "@id": `${url}#breadcrumb` } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.origin}${item.path}`,
    })),
  };
}

/** `items` is [{ question, answer }] and must match what is visible on the page. */
export function faqPage(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.short ? `${item.short} ${item.answer}` : item.answer,
      },
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

export const ids = { organization: ORG_ID, website: WEBSITE_ID };
