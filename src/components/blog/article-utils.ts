import type { MouseEvent } from "react";

export const cardFade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

/** Smooth, eased in-page scroll that respects reduced-motion. */
export function smoothScrollTo(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      section.scrollIntoView({ behavior: "auto", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      return;
    }

    const startY = window.scrollY || window.pageYOffset;
    const offsetTop = section.getBoundingClientRect().top + startY;
    const scrollOffset = Math.max(0, offsetTop - 80);
    const duration = 650;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const currentY = Math.round(
        startY + (scrollOffset - startY) * easeOutCubic(progress)
      );
      window.scrollTo(0, currentY);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        section.scrollIntoView({ behavior: "auto", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    };
    requestAnimationFrame(step);
  };
}
