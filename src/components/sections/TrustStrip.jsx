import Icon from "../common/Icon";

/**
 * Four facts under the hero. Every one is verifiable from the Content Pack —
 * no invented countries, volumes or delivery statistics.
 */
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
