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
  const iconName = iconFor(value.name);
  const tagLabel = value.code ? value.code.split("/")[1]?.trim() : value.name;

  return (
    <article className={`value-tile ${className}`.trim()}>
      <div className="value-tile__header">
        <div className="value-tile__icon-box">
          <Icon name={iconName} />
        </div>
        <span className="value-tile__code">
          <span className="value-tile__num">{num}</span>
          <span className="value-tile__sep">/</span>
          <span className="value-tile__tag">{tagLabel}</span>
        </span>
      </div>

      <h3 className="value-tile__title">{value.name}</h3>
      <p className="value-tile__text">{value.text}</p>

      <div className="value-tile__foot" aria-hidden="true">
        <span className="value-tile__bar" />
      </div>
    </article>
  );
}

export default ValueCard;
