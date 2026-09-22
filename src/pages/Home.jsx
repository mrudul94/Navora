import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/cards/FeatureCard";
import TrustStrip from "../components/sections/TrustStrip";
import HoneyShotSpotlight from "../components/sections/HoneyShotSpotlight";
import HowItWorks from "../components/sections/HowItWorks";
import ImageBand from "../components/sections/ImageBand";
import FoundersSection from "../components/sections/FoundersSection";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { site, isSet, mailHref, telHref } from "../config/site";
import {
  foundersPreview,
  hero,
  honeyShot,
  howItWorks,
  imageBand,
  partnership,
  productCategories,
  trustStrip,
  whatWeOffer,
  whoWeAre,
} from "../content/home";

/** Organization JSON-LD, built only from details that are actually set. */
function organizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.companyName,
    url: site.origin,
    logo: `${site.origin}/images/brand/logo-mark.svg`,
    description: pageSeo.home.description,
    areaServed: "Worldwide",
  };

  const contact = {};
  if (isSet(site.email)) contact.email = site.email;
  if (isSet(site.phoneUK)) contact.telephone = site.phoneUK;
  if (Object.keys(contact).length > 0) {
    data.contactPoint = {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "English",
      ...contact,
    };
  }

  if (isSet(site.linkedin)) data.sameAs = [site.linkedin];

  return data;
}

function Home() {
  return (
    <>
      <Seo {...pageSeo.home} jsonLd={organizationJsonLd()} />

      {/* --- Hero --- */}
      <section className="home-hero">
        <div className="home-hero__media">
          <SmartImage
            src={hero.image}
            alt={hero.imageAlt}
            ratio="16-9"
            sizes="100vw"
            priority
            fallbackLabel=""
          />
        </div>
        <div className="home-hero__scrim" aria-hidden="true" />

        <div className="container home-hero__inner">
          <span className="home-hero__eyebrow">{hero.label}</span>
          <h1 className="home-hero__title">{hero.heading}</h1>
          <p className="home-hero__lead">{hero.lead}</p>
          <p className="home-hero__text">{hero.text}</p>

          <div className="btn-row">
            <Button to="/products" variant="gold" size="lg">
              {ctaLabels.exploreProducts}
            </Button>
            <Button to="/for-business" variant="onDarkOutline" size="lg">
              {ctaLabels.becomePartner}
            </Button>
          </div>
        </div>

        <TrustStrip items={trustStrip} />
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

          <div className="split__media framed">
            <SmartImage
              src={whoWeAre.image}
              alt={whoWeAre.imageAlt}
              ratio="4-3"
              sizes="(max-width: 860px) 100vw, 46vw"
              illustrative={whoWeAre.illustrative}
            />
          </div>
        </div>
      </section>

      {/* --- What we offer --- */}
      <section className="section section--white reveal">
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

      {/* --- Honey Shot --- */}
      <HoneyShotSpotlight data={honeyShot} />

      {/* --- How it works --- */}
      <HowItWorks {...howItWorks} />

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
              <Link
                className="category-tile"
                key={category.name}
                to={`/products?category=${category.slug}`}
              >
                <SmartImage
                  src={category.image}
                  alt={category.alt}
                  ratio="1-1"
                  sizes="(max-width: 700px) 45vw, 210px"
                  fallbackLabel={category.name}
                />
                <span className="category-tile__name">{category.name}</span>
              </Link>
            ))}
          </div>

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Button to="/products" variant="primary">
              {ctaLabels.exploreProducts}
            </Button>
          </div>
        </div>
      </section>

      {/* --- Image band --- */}
      <ImageBand {...imageBand} />

      {/* --- Founders --- */}
      <FoundersSection
        kicker={foundersPreview.kicker}
        heading={foundersPreview.heading}
        compact
      />

      {/* --- Final CTA --- */}
      <section className="section cta-band cta-band--pattern reveal">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{partnership.heading}</h2>
            <p>{partnership.text}</p>

            {(isSet(site.email) || isSet(site.phoneUK)) && (
              <p className="cta-band__contact">
                {isSet(site.email) && <a href={mailHref(site.email)}>{site.email}</a>}
                {isSet(site.email) && isSet(site.phoneUK) && <span aria-hidden="true"> · </span>}
                {isSet(site.phoneUK) && <a href={telHref(site.phoneUK)}>{site.phoneUK}</a>}
              </p>
            )}
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
