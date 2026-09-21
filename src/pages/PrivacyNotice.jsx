import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import LegalLayout from "../components/common/LegalLayout";
import ConfirmValue from "../components/common/ConfirmValue";
import { pageSeo } from "../content/seo";
import { site } from "../config/site";

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect" },
  { id: "how-we-use", title: "How we use it" },
  { id: "lawful-basis", title: "Lawful basis" },
  { id: "who-we-share", title: "Who we share it with" },
  { id: "transfers", title: "International transfers" },
  { id: "retention", title: "How long we keep it" },
  { id: "your-rights", title: "Your rights" },
  { id: "cookies", title: "Cookies" },
  { id: "security", title: "Security" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes and contact" },
];

function PrivacyNotice() {
  return (
    <>
      <Seo {...pageSeo.privacyNotice} />

      <LegalLayout
        title="Privacy Notice"
        intro="How Navora Global Limited collects, uses and protects personal information submitted through this website."
        sections={sections}
      >
        <section id="who-we-are">
          <h2>Who we are</h2>
          <p>
            {site.legalName} is a company registered in {site.jurisdiction}. We
            are the controller of the personal information described in this
            notice.
          </p>
          <p>
            Registered office: <ConfirmValue value={site.registeredOffice} />
            <br />
            Company number: <ConfirmValue value={site.companyNumber} />
            <br />
            Contact for privacy matters:{" "}
            <ConfirmValue value={site.email} as="email" />
          </p>
        </section>

        <section id="what-we-collect">
          <h2>What we collect</h2>
          <p>
            This website is an information and enquiry site. We do not sell
            products online and we do not ask for payment details.
          </p>
          <p>
            When you submit an enquiry form, we collect only the information you
            choose to provide in that form. Depending on the form, that may
            include:
          </p>
          <ul>
            <li>your name;</li>
            <li>your company or organisation;</li>
            <li>your email address and telephone number;</li>
            <li>your country or market;</li>
            <li>your business type;</li>
            <li>
              details of your requirement, such as the product, format, estimated
              quantity and target date; and
            </li>
            <li>any other information you include in your message.</li>
          </ul>
          <p>
            Our hosting provider also processes limited technical information,
            such as your IP address, as part of delivering the website securely
            and protecting it from abuse. We do not store your IP address with
            your enquiry. We keep only the country it indicates, and a one-way
            coded value that lets us detect repeated automated submissions.
          </p>
          <p>
            We do not operate a newsletter, and we do not collect personal
            information for marketing purposes through this website.
          </p>
        </section>

        <section id="how-we-use">
          <h2>How we use it</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>respond to your enquiry;</li>
            <li>
              discuss products, specifications, availability and commercial terms
              with you;
            </li>
            <li>
              where relevant, discuss your requirement with our operating partner
              or a supplier so that we can answer it; and
            </li>
            <li>keep a record of our business correspondence with you.</li>
          </ul>
          <p>
            We do not use your information to make automated decisions that have
            a legal or similarly significant effect on you.
          </p>
        </section>

        <section id="lawful-basis">
          <h2>Lawful basis</h2>
          <p>
            Where you contact us about a possible business relationship, we rely
            on our legitimate interests in responding to enquiries and conducting
            our business, and on taking steps at your request before entering
            into a contract. Where we ask for your consent on a form, we rely on
            that consent, and you may withdraw it at any time.
          </p>
        </section>

        <section id="who-we-share">
          <h2>Who we share it with</h2>
          <p>
            We share personal information only where it is necessary. That may
            include:
          </p>
          <ul>
            <li>
              our operating partner in {site.keralaPartnerLocation}, and relevant
              suppliers, where this is needed to answer your enquiry;
            </li>
            <li>
              our service providers, who process information on our instructions:
              Cloudflare (website hosting, security and the database in which
              enquiries are stored) and Sanity (content management for product
              records);
            </li>
            <li>
              professional advisers, such as accountants or lawyers, where
              relevant; and
            </li>
            <li>
              authorities or other third parties where we are required to do so
              by law.
            </li>
          </ul>
          <p>We do not sell personal information.</p>
        </section>

        <section id="transfers">
          <h2>International transfers</h2>
          <p>
            Navora is a UK company working with partners and suppliers in India,
            so answering your enquiry may involve transferring your information
            outside the UK. Our service providers also operate globally:
            Cloudflare delivers this website from a worldwide network, and
            enquiry records are held in its Asia-Pacific region. Where
            information is transferred to a country without UK adequacy
            regulations, we take steps to ensure an appropriate safeguard is in
            place, such as the UK International Data Transfer Agreement or
            Addendum.
          </p>
        </section>

        <section id="retention">
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry correspondence for as long as needed to deal with
            your enquiry and to maintain a record of our business dealings.
            Where an enquiry does not lead to a business relationship, we aim to
            delete it once it is no longer needed. Where it does, we keep records
            for as long as the relationship continues and for a reasonable period
            afterwards to meet our legal and accounting obligations.
          </p>
        </section>

        <section id="your-rights">
          <h2>Your rights</h2>
          <p>
            Subject to conditions in data protection law, you have the right to:
          </p>
          <ul>
            <li>ask for a copy of the personal information we hold about you;</li>
            <li>ask us to correct information that is inaccurate or incomplete;</li>
            <li>ask us to delete information in certain circumstances;</li>
            <li>ask us to restrict how we use your information;</li>
            <li>object to our use of your information;</li>
            <li>ask us to transfer your information to another organisation; and</li>
            <li>withdraw consent where we rely on it.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <ConfirmValue value={site.email} as="email" />. You also have the
            right to complain to the Information Commissioner&apos;s Office, the
            UK supervisory authority, at{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            . We would ask that you raise any concern with us first so that we
            can try to resolve it.
          </p>
        </section>

        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            We place non-essential cookies and similar technologies only with
            your consent. Our <Link to="/cookie-notice">Cookie Notice</Link> sets
            out what is used and how to change your preferences at any time.
          </p>
        </section>

        <section id="security">
          <h2>Security</h2>
          <p>
            This website is served over HTTPS and enquiry submissions are sent
            over an encrypted connection. Enquiries are stored in a private
            database on our hosting account, and access is limited to those who
            need it in order to respond. No method of transmission or storage is
            completely secure, but we take reasonable steps to protect the
            information you give us.
          </p>
        </section>

        <section id="children">
          <h2>Children</h2>
          <p>
            This website is intended for businesses and is not directed at
            children. We do not knowingly collect personal information from
            children.
          </p>
        </section>

        <section id="changes">
          <h2>Changes and contact</h2>
          <p>
            We may update this notice from time to time. The date at the top of
            this page shows when it was last reviewed.
          </p>
          <p>
            If you have any questions about this notice or how we handle your
            information, contact us at{" "}
            <ConfirmValue value={site.email} as="email" /> or through our{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}

export default PrivacyNotice;
