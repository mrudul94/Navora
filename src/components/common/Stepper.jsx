/** Numbered process sequence (How we work, 01-05). */
function Stepper({ steps }) {
  return (
    <ol className="stepper">
      {steps.map((item) => (
        <li className="step" key={item.step}>
          <span className="step__number">{item.step}</span>
          <div>
            <h3 className="step__title">{item.heading}</h3>
            <p className="step__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Stepper;
