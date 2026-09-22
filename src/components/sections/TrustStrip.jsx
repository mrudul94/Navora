import Icon from "../common/Icon";

/** Verifiable facts only — sits on the hero's lower edge. */
function TrustStrip({ items }) {
  return (
    <div className="trust-strip">
      <div className="container trust-strip__inner">
        {items.map((item) => (
          <div className="trust-strip__item" key={item.label}>
            <span className="trust-strip__icon">
              <Icon name={item.icon} />
            </span>
            <span className="trust-strip__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustStrip;
