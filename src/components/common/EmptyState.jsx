import Icon from "./Icon";

/** Shown when a data source returns nothing usable. */
function EmptyState({ heading, text, children, icon = "emptyProducts" }) {
  return (
    <div className="empty-state">
      <Icon name={icon} />
      <h3>{heading}</h3>
      {text && <p className="lead">{text}</p>}
      {children}
    </div>
  );
}

export default EmptyState;
