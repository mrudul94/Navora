import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import FounderCard from "./FounderCard";
import { founders, foundersIntro } from "../../config/founders";

/**
 * Full founders section (About) and the compact preview (Home).
 * `compact` drops the biography and links through to the About page.
 */
function FoundersSection({ kicker = "The team", heading = "Meet the founders", compact = false, id }) {
  return (
    <section className={`section ${compact ? "" : "section--sage"} reveal`} id={id}>
      <div className="container">
        <SectionHeading
          kicker={kicker}
          heading={heading}
          lead={compact ? undefined : foundersIntro}
          center
        />

        <div className={`founders ${compact ? "founders--compact" : ""}`.trim()}>
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} compact={compact} />
          ))}
        </div>

        {compact && (
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn--secondary" to="/about#founders">
              More about Navora
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default FoundersSection;
