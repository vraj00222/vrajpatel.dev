import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { STATS, type StatItem } from "../data/content";
import { FadeIn } from "./FadeIn";

type ActivePreview = {
  rect: DOMRect;
  stat: StatItem;
};

// Card is 256px wide and centered on the hovered cell; keep it inside the
// viewport when that cell sits near an edge (e.g. the right-most MLX cell).
const CARD_WIDTH = 256;
const EDGE_PAD = 8;
function clampCardX(rect: DOMRect): number {
  const center = rect.left + rect.width / 2;
  const left = Math.min(
    Math.max(center - CARD_WIDTH / 2, EDGE_PAD),
    window.innerWidth - CARD_WIDTH - EDGE_PAD
  );
  return left;
}

export function Stats() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ActivePreview | null>(null);

  // Stale rects look wrong if the page scrolls mid-hover; drop the card.
  useEffect(() => {
    const close = () => setActive(null);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, []);

  return (
    <section id="stats" className="pt-4 pb-2 px-6" data-section="stats">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          {/* Hairline grid — the strip reads as one ruled block instead of
              five floating cards. */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border dark:border-dark-border bg-border dark:bg-dark-border sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((stat) => {
              const isLink = Boolean(stat.href);
              const isInteractive = isLink || Boolean(stat.preview);

              const showPreview = (
                e: { currentTarget: HTMLElement },
                s: StatItem
              ) => {
                setActive({ rect: e.currentTarget.getBoundingClientRect(), stat: s });
              };

              const inner = (
                <>
                  <span className="flex flex-col items-center leading-tight">
                    <span className="font-display text-xl font-semibold tracking-tight text-text dark:text-dark-text sm:text-2xl">
                      {stat.value}
                    </span>
                    {stat.sub && (
                      <span className="mt-0.5 font-display text-[15px] font-medium tracking-tight text-text-muted dark:text-dark-text-muted sm:text-[17px]">
                        {stat.sub}
                      </span>
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-text-muted dark:text-dark-text-muted">
                    {stat.label}
                    {isLink && (
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    )}
                  </span>
                </>
              );

              const cellClass =
                "group relative flex flex-col items-center justify-center gap-1 bg-bg dark:bg-dark-bg px-3 py-5 text-center transition-colors duration-150";

              if (isLink) {
                return (
                  <a
                    key={stat.label}
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => showPreview(e, stat)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={(e) => showPreview(e, stat)}
                    onBlur={() => setActive(null)}
                    className={`${cellClass} hover:bg-hover-bg dark:hover:bg-dark-hover-bg focus-visible:z-10`}
                    aria-label={`${stat.value} ${stat.label} — verify`}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <div
                  key={stat.label}
                  className={cellClass}
                  {...(isInteractive
                    ? {
                        onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) =>
                          showPreview(e, stat),
                        onMouseLeave: () => setActive(null),
                      }
                    : {})}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>

      {/* Hover verification card — fixed-positioned so it can escape the
          hairline grid's overflow clip and float over the page. */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.stat.label}
            className="pointer-events-none fixed z-50"
            style={{
              left: clampCardX(active.rect),
              top: active.rect.top,
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 6, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-64 -translate-x-1/2 -translate-y-full overflow-hidden rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-left shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.65)]"
              style={{ marginTop: -10 }}
            >
              <img
                src={active.stat.preview!.image}
                alt=""
                aria-hidden
                className="aspect-[120/63] w-full object-cover"
              />
              <div className="p-3">
                <p className="text-[12px] font-semibold leading-snug text-text dark:text-dark-text">
                  {active.stat.preview!.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-text-secondary dark:text-dark-text-secondary">
                  {active.stat.preview!.facts}
                </p>
                {active.stat.href && (
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-text-muted dark:text-dark-text-muted">
                    Verify
                    <ArrowUpRight size={11} />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}