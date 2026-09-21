import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import Img from "../components/common/Img";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { site } from "../config/site";
import {
  hero,
  partnership,
  productCategories,
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

      {/* --- Hero --- */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div>
            <span className="home-hero__label">{hero.label}</span>
            <h1>{hero.heading}</h1>
            <p className="home-hero__text">{hero.text}</p>
            <div className="btn-row">
              <Button to="/products" variant="primary" size="lg">
                {ctaLabels.exploreProducts}
              </Button>
              <Button to="/for-business" variant="secondary" size="lg">
                {ctaLabels.becomePartner}
              </Button>
            </div>
          </div>

          <Img
            src={hero.image}
            alt={hero.imageAlt}
            ratio="4-3"
            illustrative={hero.illustrative}
            loading="eager"
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
      </section>

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

          <div className="split__media">
            <Img
              src={whoWeAre.image}
              alt={whoWeAre.imageAlt}
              ratio="4-3"
              illustrative={whoWeAre.illustrative}
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* --- What we offer --- */}
      <section className="section section--alt reveal">
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

      {/* --- Product categories --- */}
      <section className="section reveal">
        <div className="container">
          <SectionHeading
            kicker={productCategories.kicker}
            heading={productCategories.heading}
            lead={productCategories.text}
            center
          />

          <div className="category-grid">
            {productCategories.labels.map((category) => (
              <article className="category-tile" key={category.name}>
                <Img
                  src={category.image}
                  alt={category.alt}
                  ratio="1-1"
                  sizes="(max-width: 700px) 50vw, 200px"
                />
                <h3 className="category-tile__name">{category.name}</h3>
              </article>
            ))}
          </div>

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Button to="/products" variant="primary">
              {ctaLabels.exploreProducts}
            </Button>
          </div>
        </div>
      </section>

      {/* --- Partnership --- */}
      <section className="section cta-band reveal">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{partnership.heading}</h2>
            <p>{partnership.text}</p>
          </div>

          <div className="btn-row">
            <Button to="/contact" variant="onDark" size="lg">
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
