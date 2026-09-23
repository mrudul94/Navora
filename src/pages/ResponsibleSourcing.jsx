import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import QaSection from "../components/sections/QaSection";
import ProofSection from "../components/sections/ProofSection";
import FaqSection from "../components/sections/FaqSection";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { proofFacts, proofIntro } from "../content/proof";
import { faqPage } from "../lib/structuredData";
import {
  accuracyStatement,
  approach,
  buyerChecklist,
  callToAction,
  considerations,
  hero,
  heroLabel,
  heroSummary,
  inspection,
  meaning,
  sourcingFaq,
} from "../content/responsibleSourcing";

function ResponsibleSourcing() {
  return (
    <>
      <Seo {...pageSeo.responsibleSourcing} jsonLd={faqPage(sourcingFaq.items)} />

      <PageHero
        label={heroLabel}
        heading={hero.heading}
        summary={heroSummary}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      {/* --- Definition and scope --- */}
      <QaSection {...meaning} id="sourcing-meaning-heading" />

      {/* --- Our approach --- */}
      <section className="section section--warm">
        <div className="container">
          <div className="reveal">
            <SectionHeading
              kicker={approach.kicker}
              heading={approach.heading}
              center
            />
          </div>
          <div className="grid grid--3">
            {approach.items.map((item, index) => (
              <FeatureCard
                key={item.heading}
                {...item}
                className={`reveal reveal--delay-${(index % 3) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Practical considerations --- */}
      <QaSection {...considerations} id="sourcing-considerations-heading" />

      {/* --- Accuracy statement ---
          Verbatim from the content pack. This is what allows the page to
          discuss sourcing without making unevidenced claims. Do not soften. */}
      <section className="section section--alt">
        <div className="container split">
          <div className="reveal">
            <div className="callout">
              <p className="callout__title">{accuracyStatement.heading}</p>
              <p>{accuracyStatement.text}</p>
            </div>
          </div>

          <div className="split__media reveal reveal--delay-2 reveal--scale">
            <SmartImage
              src={inspection.image}
              alt={inspection.imageAlt}
              ratio="4-3"
              illustrative={inspection.illustrative}
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* --- Buyer checklist --- */}
      <QaSection {...buyerChecklist} id="sourcing-checklist-heading" />

      {/* --- How Navora applies this today --- */}
      <ProofSection
        {...proofIntro}
        heading="How Navora applies this today"
        items={[
          proofFacts.documents,
          proofFacts.accuracy,
          proofFacts.labels,
          proofFacts.writtenTerms,
          proofFacts.partner,
          proofFacts.registered,
        ]}
        id="sourcing-proof-heading"
        warm
      />

      {/* --- FAQ --- */}
      <FaqSection {...sourcingFaq} id="sourcing-faq-heading" />

      {/* --- CTA --- */}
      <section className="section section--tight cta-band reveal">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{callToAction.heading}</h2>
            <p>{callToAction.text}</p>
          </div>
          <div className="btn-row">
            <Button to="/for-business" variant="onDark" size="lg">
              {ctaLabels.introduceBusiness}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResponsibleSourcing;
