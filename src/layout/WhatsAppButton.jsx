import { FaWhatsapp } from "react-icons/fa";
import { defaultWhatsappMessage, whatsappEnabled, whatsappUrl } from "../lib/whatsapp";

/**
 * Floating "Chat on WhatsApp" button, bottom-right on every page.
 *
 * The pre-filled message names the page the visitor was on (read at click
 * time, so it is always current), which tells the team which product or
 * page the chat is about. Hidden when site.whatsapp is empty.
 */
function WhatsAppButton() {
  if (!whatsappEnabled) return null;

  const withPageContext = (event) => {
    const title = document.title.split("|")[0].trim();
    event.currentTarget.href = whatsappUrl(
      `Hello Navora Global, I have an enquiry about: ${title} (${window.location.href})`
    );
  };

  return (
    <a
      className="whatsapp-fab"
      href={whatsappUrl(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Navora on WhatsApp (opens in a new tab)"
      onClick={withPageContext}
    >
      <FaWhatsapp aria-hidden="true" />
      <span className="whatsapp-fab__label">Chat on WhatsApp</span>
    </a>
  );
}

export default WhatsAppButton;
