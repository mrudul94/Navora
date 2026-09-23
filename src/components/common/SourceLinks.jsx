/**
 * Visible, dated citations placed directly under the claim they support.
 * `sources` are entries from src/content/sources.js.
 */
function SourceLinks({ sources, label = "Sources" }) {
  if (!sources?.length) return null;

  return (
    <p className="faq__sources">
      <span>{label}:</span>
      {sources.map((source) => (
        <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
          {source.label}
          {source.accessed && (
            <small className="source-date"> (accessed {source.accessed})</small>
          )}
        </a>
      ))}
    </p>
  );
}

export default SourceLinks;
