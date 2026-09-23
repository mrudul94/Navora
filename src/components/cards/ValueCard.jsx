import Icon from "../common/Icon";

function iconFor(name) {
  switch (name) {
    case "Trust":
      return "trust";
    case "Quality":
      return "quality";
    case "Partnership":
      return "partnership";
    case "Access":
      return "access";
    case "Responsible growth":
      return "growth";
    default:
      return "verified";
  }
}

function ValueCard({ value, index = 0, className = "" }) {
  const num = String(index + 1).padStart(2, "0");
  const iconName = value.icon || iconFor(value.name);
  const tag = value.code?.split("/")[1]?.trim();
  // Only show the eyebrow tag when it adds something beyond the title.
  const showTag = tag && tag.toLowerCase() !== value.name.toLowerCase();

  return (
    <article className={`value-tile ${className}`.trim()}>
      <div className="value-tile__header">
        <div className="value-tile__icon-box">
          <Icon name={iconName} />
        </div>
        <span className="value-tile__num" aria-hidden="true">
          {num}
        </span>
      </div>

      {showTag && <p className="value-tile__tag">{tag}</p>}
      <h3 className="value-tile__title">{value.name}</h3>
      <p className="value-tile__text">{value.text}</p>

      <span className="value-tile__bar" aria-hidden="true" />
    </article>
  );
}

export default ValueCard;
