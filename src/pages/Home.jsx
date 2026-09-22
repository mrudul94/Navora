import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import SectionHeading from "../components/common/SectionHeading";
import Icon from "../components/common/Icon";
import CategoryGallery from "../components/sections/CategoryGallery";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { site } from "../config/site";
import {
  capabilityIntro,
  capabilityMeta,
  hero,
  heroFacts,
  heroPanel,
  partnership,
  productCategories,
  values,
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
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="tag-pill hero__label">{hero.label}</span>

            <h1 className="hero__title">
              Connecting Indian <span className="accent">food producers</span> with
              global markets
            </h1>

            <p className="hero__text">{hero.text}</p>

            <div className="btn-row">
              <Button to="/products" variant="primary" size="lg">
                {ctaLabels.exploreProducts}
                <Icon name="arrowRight" />
              </Button>
              <Button to="/for-business" variant="secondary" size="lg">
                {ctaLabels.becomePartner}
              </Button>
            </div>

            <div className="hero__facts">
              {heroFacts.map((fact) => (
                <div key={fact.label}>
                  <span className="hero__fact-value">{fact.value}</span>
                  <span className="hero__fact-label">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__panel">
            <p className="hero__panel-caption">
              <Icon name="pin" />
              <span>{heroPanel.caption}</span>
            </p>

            <SmartImage
              src={heroPanel.image}
              alt={heroPanel.imageAlt}
              ratio="4-3"
              sizes="(max-width: 960px) 100vw, 44vw"
              priority
            />

            <div className="hero__panel-grid">
              {heroPanel.items.map((item) => (
                <div className="hero__panel-item" key={item.label}>
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Who we are + the five values --- */}
      <section className="section section--warm reveal">
        <div className="container value-layout">
          <div>
            <SectionHeading
              kicker={values.kicker}
              heading={whoWeAre.heading}
              lead={whoWeAre.text}
            />
            <Link className="btn btn--ghost" to="/about">
              {ctaLabels.aboutNavora}
              <Icon name="arrowRight" />
            </Link>
          </div>

          <div className="value-grid">
            {values.items.map((value) => (
              <article className="value-card" key={value.name}>
                <span className="value-card__icon">
                  <Icon name={value.icon} />
                </span>
                <h3 className="value-card__name">{value.name}</h3>
                <p className="value-card__text">{value.text}</p>
                <p className="value-card__code">
                  <span className="code">{value.code}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- What we offer --- */}
      <section className="section reveal">
        <div className="container">
          <div className="capability-head">
            <SectionHeading
              kicker="Commercial capabilities"
              heading={whatWeOffer.heading}
            />
            <p className="capability-head__note">{capabilityIntro}</p>
          </div>

          <div className="capability-grid">
            {whatWeOffer.cards.map((card, index) => (
              <article className="capability" key={card.heading}>
                <div className="capability__head">
                  <span className="capability__icon">
                    <Icon name={card.icon} />
                  </span>
                  <span className="code">{capabilityMeta[index]?.code}</span>
                </div>

                <h3 className="capability__name">{card.heading}</h3>
                <p className="capability__text">{card.text}</p>

                <p className="capability__foot">
                  <span className="code">{capabilityMeta[index]?.foot}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Product categories --- */}
      <section className="section section--warm reveal">
        <div className="container">
          <SectionHeading
            kicker="Origin portfolio"
            heading={productCategories.heading}
            lead={productCategories.text}
          />

          <CategoryGallery categories={productCategories.labels} />

          <div className="btn-row">
            <Button to="/products" variant="primary">
              {ctaLabels.exploreProducts}
              <Icon name="arrowRight" />
            </Button>
          </div>
        </div>
      </section>

      {/* --- Partnership --- */}
      <section className="section reveal">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__inner">
              <span className="tag-pill">Direct trade gateway</span>
              <h2>{partnership.heading}</h2>
              <p>{partnership.text}</p>

              <div className="btn-row">
                <Button to="/contact" variant="onDark" size="lg">
                  {ctaLabels.discussRequirements}
                </Button>
                <Button to="/for-business" variant="onDarkOutline" size="lg">
                  {ctaLabels.introduceBrand}
                </Button>
              </div>

              <div className="cta-band__notes">
                <span className="cta-band__note">
                  <Icon name="check" />
                  Importers, distributors and retailers
                </span>
                <span className="cta-band__note">
                  <Icon name="check" />
                  Food-service buyers
                </span>
                <span className="cta-band__note">
                  <Icon name="check" />
                  Producers and emerging brands
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
