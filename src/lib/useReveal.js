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
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (elements.length === 0) return undefined;

    const show = (el) => el.classList.add("is-visible");

    // matchMedia is missing in some embedded webviews, so treat its absence as
    // "no preference" rather than letting it throw and leave content hidden.
    const reducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);
}
