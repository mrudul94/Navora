import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import Checklist from "../components/common/Checklist";
import EnquiryForm from "../components/common/EnquiryForm";
import QaSection from "../components/sections/QaSection";
import DecisionTable from "../components/sections/DecisionTable";
import ProofSection from "../components/sections/ProofSection";
import FaqSection from "../components/sections/FaqSection";
import { pageSeo } from "../content/seo";
import { businessEnquiryForm } from "../content/forms";
import { proofFacts, proofIntro } from "../content/proof";
import { faqPage } from "../lib/structuredData";
import {
  businessFaq,
  definitions,
  formSection,
  hero,
  heroLabel,
  heroSummary,
  partnerTypes,
  routeComparison,
  suitability,
  whatToExpect,
} from "../content/forBusiness";

function ForBusiness() {
  return (
    <>
      <Seo {...pageSeo.forBusiness} jsonLd={faqPage(businessFaq.items)} />

      <PageHero
        label={heroLabel}
        heading={hero.heading}
        summary={heroSummary}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      {/* --- Who we work with --- */}
      <section className="section">
        <div className="container">
          <div className="reveal">
            <SectionHeading
              kicker={partnerTypes.kicker}
              heading={partnerTypes.heading}
              center
            />
          </div>
          <div className="grid grid--3">
            {partnerTypes.items.map((item, index) => (
              <FeatureCard
                key={item.name}
                icon={item.icon}
                heading={item.name}
                text={item.text}
                className={`reveal reveal--delay-${(index % 3) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Definitions --- */}
      <QaSection {...definitions} id="business-definitions-heading" warm />

      {/* --- Wholesale vs distribution vs private label --- */}
      <DecisionTable {...routeComparison} id="business-compare-heading" />

      {/* --- Suitability checklists --- */}
      <QaSection {...suitability} id="business-fit-heading" warm />

      {/* --- What to expect --- */}
      <section className="section section--alt reveal">
        <div className="container split">
          <div>
            <SectionHeading
              kicker={whatToExpect.kicker}
              heading={whatToExpect.heading}
            />
            <Checklist items={whatToExpect.points} />
          </div>

          <div className="split__media">
            <div className="callout">
              <p className="callout__title">No commitment until terms are agreed</p>
              <p>
                Nothing in an enquiry, quotation or sample exchange creates a
                supply commitment. A commitment arises only when the parties
                agree the relevant commercial terms in writing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Verifiable facts --- */}
      <ProofSection
        {...proofIntro}
        heading="What a business buyer can verify"
        items={[
          proofFacts.registered,
          proofFacts.partner,
          proofFacts.documents,
          proofFacts.labels,
          proofFacts.catalogue,
          proofFacts.writtenTerms,
        ]}
        id="business-proof-heading"
      />

      {/* --- FAQ --- */}
      <FaqSection {...businessFaq} id="business-faq-heading" />

      {/* --- Enquiry form --- */}
      <section className="section reveal" id="enquiry">
        <div className="container-narrow">
          <SectionHeading
            kicker={formSection.kicker}
            heading={formSection.heading}
            lead={formSection.text}
          />
          <EnquiryForm config={businessEnquiryForm} />
        </div>
      </section>
    </>
  );
}

export default ForBusiness;
