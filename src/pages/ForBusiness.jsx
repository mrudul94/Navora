import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import Checklist from "../components/common/Checklist";
import EnquiryForm from "../components/common/EnquiryForm";
import { pageSeo } from "../content/seo";
import { businessEnquiryForm } from "../content/forms";
import { hero, formSection, partnerTypes, whatToExpect } from "../content/forBusiness";

function ForBusiness() {
  return (
    <>
      <Seo {...pageSeo.forBusiness} />

      <PageHero
        heading={hero.heading}
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
