import { site } from "../config/site";

/**
 * External sources cited on the site, shown as visible links next to the
 * claim they support. Every URL was opened and checked on the date in
 * `accessed`; re-check and update that date whenever a source is revisited.
 * Cite official publishers only (GOV.UK, the FSA, legislation.gov.uk,
 * Companies House, Indian government export bodies, the ICC).
 */
const ACCESSED = "24 September 2026";

const source = (label, href) => ({ label, href, accessed: ACCESSED });

export const sources = {
  companiesHouse: source(
    `Companies House: ${site.legalName} company record`,
    site.companiesHouseUrl
  ),
  importSteps: source(
    "GOV.UK: Import goods into the UK, step by step",
    "https://www.gov.uk/import-goods-into-uk"
  ),
  tradeTariff: source(
    "GOV.UK: Trade Tariff, commodity codes, duty and VAT",
    "https://www.gov.uk/trade-tariff"
  ),
  hrfnao: source(
    "Food Standards Agency: importing high-risk food of non-animal origin",
    "https://www.gov.uk/government/publications/importing-high-risk-food-and-feed-of-non-animal-origin-hrfnao-into-great-britain"
  ),
  labelling: source(
    "GOV.UK: Food labelling and packaging",
    "https://www.gov.uk/food-labelling-and-packaging"
  ),
  packagingLaw: source(
    "Food Standards Agency: packaging and labelling legal requirements",
    "https://www.gov.uk/government/publications/packaging-and-labelling"
  ),
  allergens: source(
    "Food Standards Agency: allergen guidance for food businesses",
    "https://www.gov.uk/government/publications/allergen-guidance-for-food-businesses"
  ),
  traceability: source(
    "legislation.gov.uk: Regulation (EC) No 178/2002, Article 18 (traceability)",
    "https://www.legislation.gov.uk/eur/2002/178/article/18"
  ),
  incoterms: source(
    "International Chamber of Commerce: Incoterms® rules",
    "https://iccwbo.org/business-solutions/incoterms-rules/"
  ),
  apeda: source("APEDA, Government of India", "https://apeda.gov.in/"),
  spicesBoard: source("Spices Board India", "https://www.indianspices.com/"),
};
