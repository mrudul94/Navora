import SectionHeading from "../common/SectionHeading";

/**
 * The Content Pack's 01-05 sequence, promoted from About to the home page.
 * It is the section a prospective buyer most needs: it answers "what actually
 * happens if I send an enquiry".
 */
function HowWeWork({ kicker, heading, steps }) {
  return (
    <section className="section section--jute reveal">
      <div className="container">
        <SectionHeading kicker={kicker} heading={heading} center />

        <ol className="steps">
          {steps.map((item) => (
            <li className="step-card" key={item.step}>
              <span className="step-card__number" aria-hidden="true">
                {item.step}
              </span>
              <h3 className="step-card__title">{item.heading}</h3>
              <p className="step-card__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowWeWork;
