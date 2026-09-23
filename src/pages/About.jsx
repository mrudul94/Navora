import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Checklist from "../components/common/Checklist";
import Stepper from "../components/common/Stepper";
import Icon from "../components/common/Icon";
import ValueCard from "../components/cards/ValueCard";
import FounderCard from "../components/cards/FounderCard";
import SourceLinks from "../components/common/SourceLinks";
import QaSection from "../components/sections/QaSection";
import ProofSection from "../components/sections/ProofSection";
import FaqSection from "../components/sections/FaqSection";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import { sources } from "../content/sources";
import { proofFacts, proofIntro } from "../content/proof";
import { faqPage } from "../lib/structuredData";
import {
  aboutFaq,
  fit,
  hero,
  heroLabel,
  heroSummary,
  howWeWork,
  inBrief,
  leadership,
  missionVision,
  model,
  purpose,
  story,
  values,
} from "../content/about";

function About() {
  return (
    <>
      <Seo {...pageSeo.about} jsonLd={faqPage(aboutFaq.items)} />

      <PageHero
        label={heroLabel}
        heading={hero.heading}
        summary={heroSummary}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      {/* --- In brief: conversational questions, answered first --- */}
      <QaSection {...inBrief} id="about-brief-heading" />

      {/* --- Our story --- */}
      <section className="section section--warm">
        <div className="container about-story-layout">
          <div className="about-story__content reveal">
            <SectionHeading kicker={story.kicker} heading={story.heading} />
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="about-story__para">
                {paragraph}
              </p>
            ))}
            <SourceLinks
              label="On India's food exports"
              sources={[sources.apeda, sources.spicesBoard]}
            />
          </div>

          <div className="about-story__media reveal reveal--delay-2 reveal--scale">
            <div className="about-image-card">
              <SmartImage
                src={story.image}
                alt={story.imageAlt}
                ratio="4-3"
                illustrative={story.illustrative}
                sizes="(max-width: 860px) 100vw, 45vw"
              />
              <div className="about-image-card__badge">
                <Icon name="source" />
                <span>Smallholder farming network &middot; India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission and vision --- */}
      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {missionVision.map((item, index) => (
              <article
                className={`pillar reveal reveal--delay-${index + 1}`}
                key={item.heading}
              >
                <span className="pillar__icon">
                  <Icon name={index === 0 ? "sourcing" : "market"} />
                </span>
                <h2 className="pillar__title">{item.heading}</h2>
                <p className="pillar__text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- What makes our model different & Purpose --- */}
      <section className="section section--warm">
        <div className="container split">
          <div className="reveal">
            <SectionHeading kicker={model.kicker} heading={model.heading} />
            <Checklist items={model.points} />
          </div>

          <div className="reveal reveal--delay-2">
            <div className="purpose-card">
              <span className="tag-pill">{purpose.kicker}</span>
              <h3 className="purpose-card__title">{purpose.heading}</h3>
              <p className="purpose-card__text">{purpose.text}</p>
              <div className="purpose-card__badge">
                <Icon name="verified" />
                <span>Transparent communication &middot; Realistic commitments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Values --- */}
      <section className="section">
        <div className="container">
          <div className="reveal">
            <SectionHeading kicker={values.kicker} heading={values.heading} />
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

      {/* --- How we work --- */}
      <section className="section section--warm">
        <div className="container">
          <div className="reveal">
            <SectionHeading kicker={howWeWork.kicker} heading={howWeWork.heading} />
          </div>
          <div className="stepper-wrap reveal reveal--delay-1">
            <Stepper steps={howWeWork.steps} />
          </div>
        </div>
      </section>

      {/* --- Decision support --- */}
      <QaSection {...fit} id="about-fit-heading" />

      {/* --- Leadership & Founders --- */}
      <section className="section" id="leadership">
        <div className="container">
          <div className="section-head--center reveal">
            <SectionHeading
              kicker={leadership.kicker}
              heading={leadership.heading}
              lead={leadership.lead}
            />
          </div>

          <div className="founders-grid">
            {leadership.founders.map((founder, index) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                className={`reveal reveal--delay-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Verifiable facts --- */}
      <ProofSection
        {...proofIntro}
        heading="Facts you can check about Navora"
        items={[
          proofFacts.registered,
          proofFacts.partner,
          proofFacts.accuracy,
          proofFacts.writtenTerms,
          proofFacts.labels,
          proofFacts.catalogue,
        ]}
        id="about-proof-heading"
        warm
      />

      {/* --- FAQ --- */}
      <FaqSection {...aboutFaq} id="about-faq-heading" />

      {/* --- CTA --- */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal reveal--scale">
            <div className="cta-band__inner">
              <span className="tag-pill">Get in touch</span>
              <h2>Ready to talk about your requirement?</h2>
              <p>
                Tell us what you buy, sell or produce and we will confirm what our
                supplier network can currently offer.
              </p>

              <div className="btn-row">
                <Button to="/contact" variant="onDark" size="lg">
                  {ctaLabels.discussRequirements}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
