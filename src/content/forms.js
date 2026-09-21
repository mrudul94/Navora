/**
 * Enquiry form field definitions.
 *
 * Both forms are rendered by the single EnquiryForm component. The pack flags
 * duplicated partnership forms as a defect, so the two configurations below are
 * the only difference between them.
 *
 * This file is the single source of truth for both ends of the submission:
 * the React form renders from it, and functions/api/enquiry.js imports it to
 * validate what arrives. Adding a field here wires it up on both sides.
 */

import { enquiryCategories } from "./contact";

const businessTypes = [
  "Importer or distributor",
  "Retailer or wholesaler",
  "Food service or ingredient buyer",
  "Farmer or producer",
  "Emerging food brand",
  "Private-label partner",
  "Other",
];

const productsOfInterest = [
  "Honey and honey products",
  "Navora Honey Shot",
  "Ginger",
  "Cardamom",
  "Millets and grains",
  "Rice",
  "Future fresh produce",
  "Not sure yet",
];

/** For Business — the full partnership enquiry. Source: Content Pack p. 7. */
export const businessEnquiryForm = {
  formName: "navora-business-enquiry",
  submitLabel: "Submit Business Enquiry",
  successHeading: "Thank you — your enquiry has been sent",
  successText:
    "We have received your details and will review your requirement. A member of the team will respond as soon as reasonably possible.",
  requiresConsent: true,
  fields: [
    { name: "fullName", label: "Full name", type: "text", required: true, autoComplete: "name" },
    { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
    { name: "workEmail", label: "Work email", type: "email", required: true, autoComplete: "email" },
    { name: "telephone", label: "Telephone", type: "tel", required: false, autoComplete: "tel" },
    { name: "countryOrMarket", label: "Country or market", type: "text", required: true, autoComplete: "country-name" },
    { name: "businessType", label: "Business type", type: "select", required: true, options: businessTypes },
    { name: "productOfInterest", label: "Product of interest", type: "select", required: false, options: productsOfInterest },
    { name: "requiredFormat", label: "Required format", type: "text", required: false, placeholder: "For example: whole, powder, retail pack" },
    { name: "estimatedQuantity", label: "Estimated quantity", type: "text", required: false, placeholder: "For example: 2 tonnes per quarter" },
    { name: "targetDate", label: "Target date", type: "date", required: false },
    { name: "message", label: "Message", type: "textarea", required: true, rows: 5 },
  ],
};

/** Contact — the shorter general enquiry. Source: Content Pack p. 9. */
export const contactEnquiryForm = {
  formName: "navora-contact-enquiry",
  submitLabel: "Send Enquiry",
  successHeading: "Thank you — your enquiry has been sent",
  successText:
    "We have received your message and will respond as soon as reasonably possible.",
  requiresConsent: false,
  fields: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    { name: "company", label: "Company", type: "text", required: false, autoComplete: "organization" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "telephone", label: "Telephone", type: "tel", required: false, autoComplete: "tel" },
    { name: "country", label: "Country", type: "text", required: false, autoComplete: "country-name" },
    { name: "enquiryType", label: "Enquiry type", type: "select", required: true, options: enquiryCategories },
    { name: "product", label: "Product", type: "text", required: false },
    { name: "message", label: "Message", type: "textarea", required: true, rows: 5 },
  ],
};

export const allForms = [businessEnquiryForm, contactEnquiryForm];
