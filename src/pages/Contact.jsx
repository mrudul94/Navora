import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import EnquiryForm from "../components/common/EnquiryForm";
import ConfirmValue from "../components/common/ConfirmValue";
import Icon from "../components/common/Icon";
import Stepper from "../components/common/Stepper";
import QaSection from "../components/sections/QaSection";
import DecisionTable from "../components/sections/DecisionTable";
import FaqSection from "../components/sections/FaqSection";
import { faqPage } from "../lib/structuredData";
import { pageSeo } from "../content/seo";
import { contactEnquiryForm } from "../content/forms";
import { site } from "../config/site";
import { defaultWhatsappMessage, whatsappEnabled, whatsappUrl } from "../lib/whatsapp";
import {
  beforeYouContact,
  contactFaq,
  detailsSection,
  enquiryRoutes,
  enquiryCategories,
  formSection,
  hero,
  heroLabel,
  heroSummary,
  enquiryProcess,
  privacyText,
} from "../content/contact";

function Detail({ label, children }) {
  return (
    <div className="contact-detail">
      <span className="contact-detail__label">{label}</span>
      <span className="contact-detail__value">{children}</span>
    </div>
  );
}

function Contact() {
  return (
    <>
      <Seo {...pageSeo.contact} jsonLd={faqPage(contactFaq.items)} />

      <PageHero
        label={heroLabel}
        heading={hero.heading}
        summary={heroSummary}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      <section className="section">
        <div className="container contact-layout">
          {/* --- Details --- */}
          <aside className="contact-panel">
            <SectionHeading
              kicker={detailsSection.kicker}
              heading={detailsSection.heading}
              as="h2"
            />

            <Detail label="Email">
              <ConfirmValue value={site.email} as="email" />
            </Detail>

            <Detail label="Telephone">
              <ConfirmValue value={site.telephone} as="tel" />
            </Detail>

            {whatsappEnabled && (
              <Detail label="WhatsApp">
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us on WhatsApp
                </a>
              </Detail>
            )}

            <Detail label="Business hours">
              <ConfirmValue value={site.businessHours} />
            </Detail>

            <Detail label="UK registered office">
              <ConfirmValue value={site.registeredOffice} />
            </Detail>


            <div style={{ marginTop: "var(--sp-6)" }}>
              <h3
                className="contact-detail__label"
                style={{ marginBottom: "var(--sp-3)" }}
              >
                What we can help with
              </h3>
              <ul className="checklist">
                {enquiryCategories.map((category) => (
                  <li key={category}>
                    <Icon name="check" />
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* --- Form --- */}
          <div>
            <SectionHeading
              kicker={formSection.kicker}
              heading={formSection.heading}
              as="h2"
            />

            <EnquiryForm config={contactEnquiryForm} />

            <p className="field__hint" style={{ marginTop: "var(--sp-5)" }}>
              {privacyText.replace(
                " See our Privacy Notice for more information.",
                ""
              )}{" "}
              See our <Link to="/privacy-notice">Privacy Notice</Link> for more
              information.
            </p>
          </div>
        </div>
      </section>

      {/* --- Before you contact us: checklist and definition --- */}
      <QaSection {...beforeYouContact} id="contact-before-heading" warm />

      {/* --- Product or partnership enquiry --- */}
      <DecisionTable {...enquiryRoutes} id="contact-routes-heading" />

      {/* --- How an enquiry is handled --- */}
      <section className="section section--warm" aria-labelledby="contact-process-heading">
        <div className="container">
          <div className="reveal">
            <SectionHeading
              kicker={enquiryProcess.kicker}
              heading={enquiryProcess.heading}
              lead={enquiryProcess.lead}
              id="contact-process-heading"
            />
          </div>
          <div className="stepper-wrap reveal reveal--delay-1">
            <Stepper steps={enquiryProcess.steps} />
          </div>
          <p className="decision-table__note">
            Useful before you enquire: <Link to="/about">who Navora is</Link>,{" "}
            <Link to="/products">the current product range</Link>,{" "}
            <Link to="/for-business">wholesale, distribution and private label compared</Link>{" "}
            and <Link to="/responsible-sourcing">how Navora handles sourcing evidence</Link>.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <FaqSection {...contactFaq} id="contact-faq-heading" />
    </>
  );
}

export default Contact;
