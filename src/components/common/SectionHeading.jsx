/** Kicker + heading + optional lead. Used by every content section. */
function SectionHeading({ kicker, heading, lead, center = false, as: Tag = "h2", id }) {
  return (
    <div className={`section-heading ${center ? "section-heading--center" : ""}`.trim()}>
      {kicker && <span className="kicker">{kicker}</span>}
      <Tag id={id}>{heading}</Tag>
      {lead && <p className="section-heading__lead">{lead}</p>}
    </div>
  );
}

export default SectionHeading;
