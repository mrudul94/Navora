import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import LegalLayout from "../components/common/LegalLayout";

import { pageSeo } from "../content/seo";
import { site, isSet, mailHref } from "../config/site";

const sections = [
  { id: "about", title: "About these terms" },
  { id: "using", title: "Using this website" },
  { id: "information", title: "Information on this website" },
  { id: "products", title: "Product information" },
  { id: "no-offer", title: "No offer or commitment" },
  { id: "enquiries", title: "Enquiries you send us" },
  { id: "ip", title: "Intellectual property" },
  { id: "links", title: "Links to other websites" },
  { id: "availability", title: "Availability" },
  { id: "liability", title: "Our liability" },
  { id: "changes", title: "Changes to these terms" },
  { id: "law", title: "Governing law" },
];

function WebsiteTerms() {
  return (
    <>
      <Seo {...pageSeo.websiteTerms} />

      <LegalLayout
        title="Website Terms"
        intro="The terms on which Navora Global Limited makes this website available to you."
        sections={sections}
      >
        <section id="about">
          <h2>About these terms</h2>
          <p>
            This website is operated by {site.companyName}, a company registered
            in {site.jurisdiction}
            {isSet(site.companyNumber) && <> (company number {site.companyNumber})</>}
            . By using this website you accept these terms. If you do not accept
            them, please do not use the site.
          </p>
        </section>

        <section id="using">
          <h2>Using this website</h2>
          <p>
            This website is provided for business information and enquiry
            purposes. You agree not to use it unlawfully, not to attempt to gain
            unauthorised access to it, and not to submit content that is
            unlawful, misleading or harmful, or that infringes the rights of
            others.
          </p>
        </section>

        <section id="information">
          <h2>Information on this website</h2>
          <p>
            We take care to keep the information on this website accurate and up
            to date. It is provided for general information and does not form
            part of any contract. Availability, specifications and commercial
            terms change, so please confirm any detail with us before relying on
            it.
          </p>
        </section>

        <section id="products">
          <h2>Product information</h2>
          <p>
            Products shown on this website fall into different categories.
            Products marked <strong>Navora Brand</strong> are developed and
            marketed by us. Products marked <strong>Supplier Product</strong> are
            sourced through our supplier relationships; we are not the
            manufacturer of those products. Products marked{" "}
            <strong>Coming Soon</strong> or <strong>Future Category</strong> are
            in development or planned, and are not currently available.
          </p>
          <p>
            Product specifications, formats, quantities, certifications,
            documentation and availability vary by supplier and by destination
            market, and are confirmed for each enquiry. Certification,
            farming-method and similar claims are published only where we hold
            current evidence relevant to the named product and supplier.
          </p>
          <p>
            Nothing on this website is medical, nutritional or health advice, and
            no product is offered for the prevention or treatment of any
            condition.
          </p>
        </section>

        <section id="no-offer">
          <h2>No offer or commitment</h2>
          <p>
            Nothing on this website is an offer to sell or supply. No enquiry,
            response, quotation, sample or discussion creates a binding supply
            commitment. A commitment arises only when the parties agree the
            relevant commercial terms in writing.
          </p>
        </section>

        <section id="enquiries">
          <h2>Enquiries you send us</h2>
          <p>
            When you send us an enquiry, you confirm that the information you
            give is accurate and that you are authorised to provide it. We handle
            personal information in accordance with our{" "}
            <Link to="/privacy-notice">Privacy Notice</Link>.
          </p>
        </section>

        <section id="ip">
          <h2>Intellectual property</h2>
          <p>
            The content of this website, including text, layout, graphics and the
            Navora name and branding, is owned by or licensed to us and is
            protected by intellectual property laws. You may view and print
            pages for your own business use. You may not reproduce, distribute or
            commercially exploit any part of this website without our permission.
          </p>
          <p>
            Any third-party names or marks referred to on this website remain the
            property of their respective owners.
          </p>
        </section>

        <section id="links">
          <h2>Links to other websites</h2>
          <p>
            Where we link to another website, we do so for information only. We
            are not responsible for the content of external websites and a link
            does not imply endorsement.
          </p>
        </section>

        <section id="availability">
          <h2>Availability</h2>
          <p>
            We aim to keep this website available, but we do not guarantee
            uninterrupted access. We may suspend, withdraw or change all or part
            of it without notice.
          </p>
        </section>

        <section id="liability">
          <h2>Our liability</h2>
          <p>
            Nothing in these terms excludes or limits our liability for death or
            personal injury caused by our negligence, for fraud or fraudulent
            misrepresentation, or for any other liability that cannot lawfully be
            excluded or limited.
          </p>
          <p>
            Subject to that, we exclude all implied conditions, warranties and
            representations relating to this website, and we are not liable for
            any loss of profit, loss of business, business interruption or loss
            of business opportunity arising from your use of, or inability to
            use, this website or from reliance on its content.
          </p>
        </section>

        <section id="changes">
          <h2>Changes to these terms</h2>
          <p>
            We may amend these terms from time to time. The date at the top of
            this page shows when they were last reviewed. Please check them each
            time you use the website.
          </p>
        </section>

        <section id="law">
          <h2>Governing law</h2>
          <p>
            These terms and any dispute or claim arising out of or in connection
            with them, their subject matter or formation, whether contractual or
            non-contractual, are governed by the laws of England and Wales. The
            courts of England and Wales have exclusive jurisdiction.
          </p>
          <p>
            If you have any questions about these terms, please get in touch
            through our <Link to="/contact">contact page</Link>
            {isSet(site.email) && (
              <> or at <a href={mailHref(site.email)}>{site.email}</a></>
            )}
            .
          </p>
        </section>
      </LegalLayout>
    </>
  );
}

export default WebsiteTerms;
