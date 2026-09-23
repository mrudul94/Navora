import SectionHeading from "../common/SectionHeading";
import SourceLinks from "../common/SourceLinks";

/**
 * Side-by-side comparison as a real <table>, which answer engines lift as a
 * comparison. `columns` are the options compared; each row is one question
 * answered for every option.
 *
 * rows: [{ label, cells: [string per column] }]
 */
function DecisionTable({ kicker, heading, lead, columns, rows, note, sources, id }) {
  return (
    <section className="section section--tight" aria-labelledby={id}>
      <div className="container">
        <div className="reveal">
          <SectionHeading kicker={kicker} heading={heading} lead={lead} id={id} />
        </div>

        <div className="table-wrap reveal reveal--delay-1">
          <table className="table comparison-table decision-table">
            <caption className="visually-hidden">{heading}</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Question</span>
                </th>
                {columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((cell, index) => (
                    <td key={columns[index]}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {note && <p className="decision-table__note">{note}</p>}
        <SourceLinks sources={sources} />
      </div>
    </section>
  );
}

export default DecisionTable;
