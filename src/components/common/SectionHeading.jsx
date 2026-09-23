import { renderStaggeredWords } from "./TextReveal";

/** Kicker + heading + optional lead with scroll-triggered text reveal. */
function SectionHeading({
  kicker,
  heading,
  lead,
  center = false,
  as: Tag = "h2",
  id,
  className = "",
  stagger = true,
}) {
  return (
    <div
      className={`section-heading reveal-text ${center ? "section-heading--center" : ""} ${className}`.trim()}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <Tag id={id} className="reveal-heading">
        {stagger ? renderStaggeredWords(heading) : heading}
      </Tag>
      {lead && <p className="section-heading__lead">{lead}</p>}
    </div>
  );
}

export default SectionHeading;
