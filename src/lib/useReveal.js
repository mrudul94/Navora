import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fades sections in as they enter the viewport.
 *
 * The previous implementation queried a `.reveal` class that no component ever
 * applied, so nothing animated. This version runs after each navigation, marks
 * anything already on screen visible immediately (no blank first paint), and
 * observes the rest.
 *
 * Elements are made visible unconditionally when IntersectionObserver is
 * unavailable, so content can never be left invisible.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const query = ".reveal, .reveal-text, .reveal-paragraph";
    const elements = Array.from(document.querySelectorAll(query));
    if (elements.length === 0) return undefined;

    const show = (el) => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach(show);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.65 && rect.bottom > 0) {
        show(el);
      } else {
        observer.observe(el);
      }
    });

    let mutationObserver;
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        const unrevealed = Array.from(
          document.querySelectorAll(".reveal:not(.is-visible), .reveal-text:not(.is-visible), .reveal-paragraph:not(.is-visible)")
        );
        unrevealed.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.65 && rect.bottom > 0) {
            show(el);
          } else {
            observer.observe(el);
          }
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [pathname]);
}
