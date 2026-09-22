import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import {
  accuracyStatement,
  approach,
  callToAction,
  hero,
  inspection,
} from "../content/responsibleSourcing";

function ResponsibleSourcing() {
  return (
    <>
      <Seo {...pageSeo.responsibleSourcing} />

      <PageHero
        heading={hero.heading}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      {/* --- Our approach --- */}
      <section className="section reveal">
        <div className="container">
          <SectionHeading
            kicker={approach.kicker}
            heading={approach.heading}
            center
          />
          <div className="grid grid--3">
            {approach.items.map((item) => (
              <FeatureCard key={item.heading} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Accuracy statement ---
          Verbatim from the content pack. This is what allows the page to
          discuss sourcing without making unevidenced claims. Do not soften. */}
      <section className="section section--alt reveal">
        <div className="container split">
          <div>
            <div className="callout">
              <p className="callout__title">{accuracyStatement.heading}</p>
              <p>{accuracyStatement.text}</p>
            </div>
          </div>

          <div className="split__media">
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
