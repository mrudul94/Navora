import { ownershipLabels } from "../../content/products";

/** Ownership badge: Navora Brand / Supplier Product / Coming Soon / Future Category. */
function StatusBadge({ ownership }) {
  const label = ownershipLabels[ownership];
  if (!label) return null;

  return <span className={`badge badge--${ownership}`}>{label}</span>;
}

export default StatusBadge;
