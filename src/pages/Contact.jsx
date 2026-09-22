import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import EnquiryForm from "../components/common/EnquiryForm";
import Icon from "../components/common/Icon";
import { pageSeo } from "../content/seo";
import { contactEnquiryForm } from "../content/forms";
import {
  site,
  isSet,
  mailHref,
  telHref,
  whatsappHref,
} from "../config/site";
import {
  detailsSection,
  enquiryCategories,
  formSection,
  hero,
  privacyText,
} from "../content/contact";

/** One contact method. Renders nothing when the detail is not yet supplied. */
function ContactCard({ icon, label, value, href, external = false }) {
  if (!isSet(value)) return null;

  return (
    <div className="contact-card">
      <span className="contact-card__icon">
        <Icon name={icon} />
      </span>
      <div>
        <span className="contact-card__label">{label}</span>
        {href ? (
          <a
            className="contact-card__value"
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {value}
          </a>
        ) : (
          <span className="contact-card__value">{value}</span>
        )}
      </div>
    </div>
  );
}

function Contact() {
  const [searchParams] = useSearchParams();

  // Deep links from the Honey Shot spotlight and product pages arrive with the
  // enquiry type and product already chosen.
  const requestedType = searchParams.get("type");
  const requestedProduct = searchParams.get("product");

  const initialValues = {};
  if (requestedType && enquiryCategories.includes(requestedType)) {
    initialValues.enquiryType = requestedType;
  }
  if (requestedProduct) {
    initialValues.product = requestedProduct;
  }

  const hasPartner =
    isSet(site.partnerCompany.name) || isSet(site.partnerCompany.address);

  return (
    <>
      <Seo {...pageSeo.contact} />

      <PageHero
        heading={hero.heading}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      <section className="section">
        <div className="container contact-layout">
          {/* --- Details --- */}
          <aside>
            <SectionHeading
              kicker={detailsSection.kicker}
              heading={detailsSection.heading}
              as="h2"
            />

            <div className="contact-cards">
              <ContactCard
                icon="mail"
                label="Email"
                value={site.email}
                href={mailHref(site.email)}
              />
              <ContactCard
                icon="phone"
                label="Telephone (UK)"
                value={site.phoneUK}
                href={telHref(site.phoneUK)}
              />
              <ContactCard
                icon="phone"
                label="Telephone (India)"
                value={site.phoneIndia}
                href={telHref(site.phoneIndia)}
              />
              <ContactCard
                icon="whatsapp"
                label="WhatsApp"
                value={site.whatsapp}
                href={whatsappHref(site.whatsapp)}
                external
              />
              <ContactCard
                icon="clock"
                label="Business hours"
                value={site.businessHours}
              />
              <ContactCard
                icon="company"
                label="UK registered office"
                value={site.registeredOffice}
              />
              {hasPartner && (
                <ContactCard
                  icon="pin"
                  label="Kerala operating partner"
                  value={
                    isSet(site.partnerCompany.name)
                      ? site.partnerCompany.name
                      : site.partnerCompany.address
                  }
                />
              )}
            </div>

            <div className="contact-scope">
              <h3 className="contact-scope__title">What we can help with</h3>
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
          <div className="contact-panel">
            <SectionHeading
              kicker={formSection.kicker}
              heading={formSection.heading}
              as="h2"
            />

            <EnquiryForm config={contactEnquiryForm} initialValues={initialValues} />

            <p className="field__hint" style={{ marginTop: "var(--sp-5)" }}>
              {privacyText.replace(" See our Privacy Notice for more information.", "")}{" "}
              See our <Link to="/privacy-notice">Privacy Notice</Link> for more
              information.
            </p>
          </div>
        </div>
      </section>

      {/* --- Two locations --- */}
      <section className="section section--sage section--tight reveal">
        <div className="container">
          <div className="locations">
            <div className="location">
              <span className="location__flag" aria-hidden="true">
                UK
              </span>
              <h3 className="location__title">United Kingdom</h3>
              <p className="location__text">
                Registered company, international business development and buyer
                communication.
              </p>
            </div>

            <div className="location__link" aria-hidden="true">
              <span className="location__dot" />
              <span className="location__line" />
              <span className="location__dot" />
            </div>

            <div className="location">
              <span className="location__flag" aria-hidden="true">
                IN
              </span>
              <h3 className="location__title">Kerala, India</h3>
              <p className="location__text">
                Operating partner with local relationships, supplier access and
                market knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
