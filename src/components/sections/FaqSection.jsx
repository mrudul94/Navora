import SectionHeading from "../common/SectionHeading";
import SourceLinks from "../common/SourceLinks";

/**
 * Questions with their answers always visible, each answer directly after
 * its question heading. Answer engines extract exactly this pattern, and
 * Google gives full weight only to content that is shown. The page that
 * renders this should also publish the same items as FAQPage JSON-LD.
 */
function FaqSection({ kicker, heading, lead, items, id = "faq-heading" }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="container faq">
        <div className="faq__head reveal">
          <SectionHeading kicker={kicker} heading={heading} lead={lead} id={id} />
        </div>

        <div className="faq__list reveal reveal--delay-1">
          {items.map((item) => (
            <article className="faq__item" key={item.question}>
              <h3 className="faq__question">{item.question}</h3>
              {item.short && <p className="faq__short">{item.short}</p>}
              <p className="faq__answer">{item.answer}</p>
              <SourceLinks sources={item.sources} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
