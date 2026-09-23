import { site } from "../config/site";

/** Digits only, as wa.me requires (no +, spaces or leading zeros). */
const number = (site.whatsapp || "").replace(/[^\d]/g, "");

export const whatsappEnabled = number.length > 0;

/** Returns a wa.me chat link, with an optional pre-filled message. */
export function whatsappUrl(message) {
  if (!whatsappEnabled) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export const defaultWhatsappMessage = "Hello Navora Global, I have an enquiry.";
