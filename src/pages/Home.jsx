import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import { Grain, Divider } from "../components/common/Texture";
import TrustStrip from "../components/sections/TrustStrip";
import HowWeWork from "../components/sections/HowWeWork";
import CategoryGallery from "../components/sections/CategoryGallery";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { site } from "../config/site";
import {
  hero,
  howWeWork,
  partnership,
  productCategories,
  trustStrip,
  whatWeOffer,
  whoWeAre,
} from "../content/home";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.origin,
  description: pageSeo.home.description,
  areaServed: "Worldwide",
  knowsAbout: [
    "Indian food sourcing",
    "Spices",
    "Honey products",
    "Millets and grains",
    "Rice",
  ],
};

function Home() {
  return (
    <>
      <Seo {...pageSeo.home} jsonLd={organizationJsonLd} />

      {/* --- Hero ------------------------------------------------------------
          The hero photograph is busy edge to edge, so the copy sits on a clean
          ground beside it rather than on top of it. The image bleeds off the
          right and overlaps the trust strip below. */}
      <section className="hero has-grain">
        <Grain opacity={0.35} />

        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="hero__label">{hero.label}</span>
            <h1 className="hero__title">{hero.heading}</h1>
            <p className="hero__text">{hero.text}</p>

            <div className="btn-row">
              <Button to="/products" variant="primary" size="lg">
                {ctaLabels.exploreProducts}
              </Button>
              <Button to="/for-business" variant="secondary" size="lg">
                {ctaLabels.becomePartner}
              </Button>
            </div>
          </div>

          <div className="hero__media">
            <SmartImage
              src={hero.image}
              alt={hero.imageAlt}
              ratio="4-3"
              sizes="(max-width: 960px) 100vw, 52vw"
              priority
              illustrative={hero.illustrative}
            />
          </div>
        </div>
      </section>

      <TrustStrip items={trustStrip} />

      {/* --- Who we are --- */}
      <section className="section reveal">
        <div className="container split">
          <div>
            <SectionHeading kicker={whoWeAre.kicker} heading={whoWeAre.heading} />
            <p className="lead">{whoWeAre.text}</p>
            <div className="btn-row">
              <Button to="/about" variant="secondary">
                {ctaLabels.aboutNavora}
              </Button>
            </div>
          </div>

          <div className="split__media framed">
            <SmartImage
              src={whoWeAre.image}
              alt={whoWeAre.imageAlt}
              ratio="4-3"
              sizes="(max-width: 860px) 100vw, 48vw"
              illustrative={whoWeAre.illustrative}
            />
          </div>
        </div>
      </section>

      <div className="container">
        <Divider />
      </div>

      {/* --- What we offer --- */}
      <section className="section section--surface reveal">
        <div className="container">
          <SectionHeading
            kicker={whatWeOffer.kicker}
            heading={whatWeOffer.heading}
            center
          />
          <div className="grid grid--4">
            {whatWeOffer.cards.map((card) => (
              <FeatureCard key={card.heading} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* --- How we work --- */}
      <HowWeWork {...howWeWork} />

      {/* --- Product categories --- */}
      <section className="section reveal">
        <div className="container">
          <SectionHeading
            kicker={productCategories.kicker}
            heading={productCategories.heading}
            lead={productCategories.text}
            center
          />

          <CategoryGallery categories={productCategories.labels} />

          <div className="btn-row btn-row--center">
            <Button to="/products" variant="primary">
              {ctaLabels.exploreProducts}
            </Button>
          </div>
        </div>
      </section>

      {/* --- Partnership --- */}
      <section className="section cta-band has-grain reveal">
        <Grain opacity={0.18} />
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{partnership.heading}</h2>
            <p>{partnership.text}</p>
          </div>

          <div className="btn-row">
            <Button to="/contact" variant="gold" size="lg">
              {ctaLabels.discussRequirements}
            </Button>
            <Button to="/for-business" variant="onDarkOutline" size="lg">
              {ctaLabels.introduceBrand}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
