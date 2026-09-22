import SectionHeading from "../common/SectionHeading";

/** Four steps: horizontal with a connecting rule on desktop, stacked on mobile. */
function HowItWorks({ kicker, heading, steps }) {
  return (
    <section className="section section--sage reveal">
      <div className="container">
        <SectionHeading kicker={kicker} heading={heading} center />

        <ol className="how-steps">
          {steps.map((item) => (
            <li className="how-step" key={item.step}>
              <span className="how-step__marker" aria-hidden="true">
                {item.step}
              </span>
              <h3 className="how-step__title">{item.heading}</h3>
              <p className="how-step__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
