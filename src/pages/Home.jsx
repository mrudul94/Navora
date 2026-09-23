import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import SectionHeading from "../components/common/SectionHeading";
import Icon from "../components/common/Icon";
import CategoryGallery from "../components/sections/CategoryGallery";
import ValueCard from "../components/cards/ValueCard";
import FaqSection from "../components/sections/FaqSection";
import AtAGlance from "../components/sections/AtAGlance";
import { renderStaggeredWords } from "../components/common/TextReveal";
import { pageSeo } from "../content/seo";
import { faq } from "../content/faq";
import { faqPage } from "../lib/structuredData";
import { ctaLabels } from "../content/site";
import {
  atAGlance,
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

function Home() {
  return (
    <>
      <Seo {...pageSeo.home} jsonLd={faqPage(faq.items)} />

      {/* --- Hero --- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="reveal-text is-visible">
            <span className="tag-pill hero__label hero__animate-label">{hero.label}</span>

            <h1 className="hero__title hero__animate-title reveal-heading is-visible">
              {renderStaggeredWords([
                "Connecting Indian ",
                <span className="accent" key="accent">food producers</span>,
                " with global markets",
              ])}
            </h1>

            <p className="hero__text hero__animate-text">{hero.text}</p>

            <div className="btn-row hero__animate-cta">
              <Button to="/products" variant="primary" size="lg">
                {ctaLabels.exploreProducts}
                <Icon name="arrowRight" />
              </Button>
              <Button to="/for-business" variant="secondary" size="lg">
                {ctaLabels.becomePartner}
              </Button>
            </div>

            <div className="hero__facts hero__animate-facts">
              {heroFacts.map((fact) => (
                <div key={fact.label}>
                  <span className="hero__fact-value">{fact.value}</span>
                  <span className="hero__fact-label">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__panel hero__animate-panel">
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

      {/* --- At a glance --- */}
      <AtAGlance {...atAGlance} />

      {/* --- Who we are (Narrative Bridge) --- */}
      <section className="section section--warm">
        <div className="container who-we-are-layout">
          <div className="who-we-are__content reveal">
            <SectionHeading
              kicker={whoWeAre.kicker}
              heading={whoWeAre.heading}
              lead={whoWeAre.text}
            />
            <div className="btn-row">
              <Link className="btn btn--ghost" to="/about">
                {ctaLabels.aboutNavora}
                <Icon name="arrowRight" />
              </Link>
            </div>
          </div>

          <div className="who-we-are__media reveal reveal--delay-2 reveal--scale">
            <SmartImage
              src={whoWeAre.image}
              alt={whoWeAre.imageAlt}
              ratio="4-3"
              illustrative={whoWeAre.illustrative}
            />
          </div>
        </div>
      </section>

      {/* --- Operating Principles (5 Core Values) --- */}
      <section className="section">
        <div className="container">
          <div className="section-head--center reveal">
            <SectionHeading
              kicker={values.kicker}
              heading={values.heading || "Our Sourcing & Trade Pillars"}
              lead={values.lead}
            />
          </div>

          <div className="values-grid">
            {values.items.map((value, index) => (
              <ValueCard
                value={value}
                index={index}
                key={value.name}
                className={`reveal reveal--delay-${(index % 5) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- What we offer --- */}
      <section className="section">
        <div className="container">
          <div className="capability-head reveal">
            <SectionHeading
              kicker="Commercial capabilities"
              heading={whatWeOffer.heading}
            />
            <p className="capability-head__note">{capabilityIntro}</p>
          </div>

          <div className="capability-grid">
            {whatWeOffer.cards.map((card, index) => (
              <article
                className={`capability reveal reveal--delay-${(index % 4) + 1}`}
                key={card.heading}
              >
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
      <section className="section section--warm">
        <div className="container">
          <div className="reveal">
            <SectionHeading
              kicker="Origin portfolio"
              heading={productCategories.heading}
              lead={productCategories.text}
            />
          </div>

          <CategoryGallery categories={productCategories.labels} />

          <div className="btn-row reveal reveal--delay-2">
            <Button to="/products" variant="primary">
              {ctaLabels.exploreProducts}
              <Icon name="arrowRight" />
            </Button>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <FaqSection
        kicker={faq.kicker}
        heading={faq.heading}
        lead={faq.lead}
        items={faq.items}
      />

      {/* --- Partnership --- */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal reveal--scale">
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
