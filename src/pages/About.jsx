import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SmartImage from "../components/common/SmartImage";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Checklist from "../components/common/Checklist";
import Stepper from "../components/common/Stepper";
import Icon from "../components/common/Icon";
import FoundersSection from "../components/sections/FoundersSection";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import {
  hero,
  howWeWork,
  missionVision,
  model,
  purpose,
  story,
  values,
} from "../content/about";

function About() {
  return (
    <>
      <Seo {...pageSeo.about} />

      <PageHero
        heading={hero.heading}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        illustrative={hero.illustrative}
      />

      {/* --- Our story --- */}
      <section className="section reveal">
        <div className="container split split--reverse">
          <div>
            <SectionHeading kicker={story.kicker} heading={story.heading} />
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="lead"
                style={{ marginBottom: "var(--sp-4)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="split__media">
            <SmartImage
              src={story.image}
              alt={story.imageAlt}
              ratio="4-3"
              illustrative={story.illustrative}
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* --- Mission and vision --- */}
      <section className="section section--white reveal">
        <div className="container">
          <div className="grid grid--2">
            {missionVision.map((item, index) => (
              <article className="pillar" key={item.heading}>
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

      {/* --- What makes our model different --- */}
      <section className="section reveal">
        <div className="container split">
          <div>
            <SectionHeading kicker={model.kicker} heading={model.heading} />
            <Checklist items={model.points} />
          </div>

          <div className="split__media">
            <SectionHeading kicker={purpose.kicker} heading={purpose.heading} />
            <p className="lead">{purpose.text}</p>
          </div>
        </div>
      </section>

      {/* --- Values --- */}
      <section className="section section--sage reveal">
        <div className="container">
          <SectionHeading kicker={values.kicker} heading={values.heading} />

          <dl className="deflist">
            {values.items.map((value) => (
              <div className="deflist__row" key={value.name}>
                <dt className="deflist__term">{value.name}</dt>
                <dd className="deflist__desc">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --- How we work --- */}
      <section className="section reveal">
        <div className="container">
          <SectionHeading kicker={howWeWork.kicker} heading={howWeWork.heading} />
          <Stepper steps={howWeWork.steps} />
        </div>
      </section>

      {/* --- Founders --- */}
      <FoundersSection id="founders" />

      {/* --- CTA --- */}
      <section className="section section--tight cta-band reveal">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>Ready to talk about your requirement?</h2>
            <p>
              Tell us what you buy, sell or produce and we will confirm what our
              supplier network can currently offer.
            </p>
          </div>
          <div className="btn-row">
            <Button to="/contact" variant="gold" size="lg">
              {ctaLabels.discussRequirements}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
