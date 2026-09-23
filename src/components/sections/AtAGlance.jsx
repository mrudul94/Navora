import Icon from "../common/Icon";

/**
 * Summary band (Home, Products): a one-paragraph definition, two short
 * lists and the enquiry steps. Plain lists and an ordered list on purpose —
 * they are the structures answer engines extract most reliably.
 */
function AtAGlance({ kicker, heading, summary, columns, steps, id = "glance-heading" }) {
  return (
    <section className="section section--tight glance" aria-labelledby={id}>
      <div className="container">
        <div className="glance__panel reveal">
          <div className="glance__intro">
            <span className="kicker">{kicker}</span>
            <h2 id={id} className="glance__heading">
              {heading}
            </h2>
            <p className="glance__summary">{summary}</p>
          </div>

          <div className="glance__grid">
            {columns.map((column) => (
              <div className="glance__col" key={column.heading}>
                <h3 className="glance__col-heading">{column.heading}</h3>
                <ul className="glance__list">
                  {column.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="glance__col">
              <h3 className="glance__col-heading">{steps.heading}</h3>
              <ol className="glance__steps">
                {steps.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AtAGlance;
