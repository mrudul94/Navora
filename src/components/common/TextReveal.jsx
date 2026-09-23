import React from "react";

/**
 * Splits text or nested text elements into staggered animated words.
 * Preserves exact whitespace, semantic tags, and screen-reader accessibility.
 */
export function renderStaggeredWords(children, baseDelay = 0.06, step = 0.045) {
  if (!children) return null;

  if (typeof children === "string") {
    const words = children.split(/\s+/).filter(Boolean);
    return words.map((word, i) => {
      const delay = `${baseDelay + step * i}s`;
      return (
        <span className="word-mask word-wrap" key={i}>
          <span
            className="word-inner"
            style={{
              transitionDelay: delay,
              animationDelay: delay,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      );
    });
  }

  if (Array.isArray(children)) {
    let wordIndex = 0;
    return children.map((child, cIdx) => {
      if (typeof child === "string") {
        const words = child.split(/\s+/).filter(Boolean);
        return words.map((word) => {
          const delay = `${baseDelay + step * wordIndex++}s`;
          return (
            <span className="word-mask word-wrap" key={`w-${wordIndex}`}>
              <span
                className="word-inner"
                style={{
                  transitionDelay: delay,
                  animationDelay: delay,
                }}
              >
                {word}
              </span>
              {" "}
            </span>
          );
        });
      }
      if (React.isValidElement(child)) {
        if (typeof child.props?.children === "string") {
          const words = child.props.children.split(/\s+/).filter(Boolean);
          return words.map((word) => {
            const delay = `${baseDelay + step * wordIndex++}s`;
            return (
              <span className="word-mask word-wrap" key={`w-${wordIndex}`}>
                <span
                  className={`word-inner ${child.props.className || ""}`.trim()}
                  style={{
                    transitionDelay: delay,
                    animationDelay: delay,
                  }}
                >
                  {word}
                </span>
                {" "}
              </span>
            );
          });
        }
        return React.cloneElement(child, { key: `c-${cIdx}` });
      }
      return child;
    });
  }

  return children;
}

export default renderStaggeredWords;
