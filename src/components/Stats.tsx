import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import {
  STATS,
  CONTRIBUTIONS,
  CONTRIBUTION_TOTAL_STARS,
} from "../data/content";
import { FadeIn } from "./FadeIn";

interface Preview {
  title: string;
  facts: string;
  image: string;
}

type ActivePreview = {
  rect: DOMRect;
  preview: Preview;
  href?: string;
  key: string;
};

// Card is 256px wide and centered on the hovered cell; keep it inside the
// viewport when that cell sits near an edge (e.g. the right-most InsForge cell).
const CARD_WIDTH = 256;
const EDGE_PAD = 8;
function clampCardX(rect: DOMRect): number {
  const center = rect.left + rect.width / 2;
  return Math.min(
    Math.max(center - CARD_WIDTH / 2, EDGE_PAD),
    window.innerWidth - CARD_WIDTH - EDGE_PAD
  );
}

const CELL =
  "group relative flex bg-bg dark:bg-dark-bg transition-colors duration-150";

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

  // Every cell that carries a preview shares one hover handler; the cell
  // itself only has to say which preview it owns.
  const hoverProps = (key: string, preview?: Preview, href?: string) =>
    preview
      ? {
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
            setActive({
              rect: e.currentTarget.getBoundingClientRect(),
              preview,
              href,
              key,
            }),
          onMouseLeave: () => setActive(null),
          onFocus: (e: React.FocusEvent<HTMLElement>) =>
            setActive({
              rect: e.currentTarget.getBoundingClientRect(),
              preview,
              href,
              key,
            }),
          onBlur: () => setActive(null),
        }
      : {};

  return (
    <section id="stats" className="pt-4 pb-2 px-6" data-section="stats">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          {/* One ruled block. The personal numbers sit on top, the open-source
              work below its own label — two different kinds of claim, but the
              same card so the hero has a single object under it. */}
          <div className="overflow-hidden rounded-xl border border-border dark:border-dark-border">
            {/* ── Personal ── */}
            <div className="grid grid-cols-2 gap-px bg-border dark:bg-dark-border">
              {STATS.map((stat) => {
                const inner = (
                  <span className="flex w-full flex-col items-center justify-center gap-1 px-3 py-5 text-center">
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
                      {stat.href && (
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        />
                      )}
                    </span>
                  </span>
                );

                const props = hoverProps(stat.label, stat.preview, stat.href);

                return stat.href ? (
                  <a
                    key={stat.label}
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${CELL} hover:bg-hover-bg dark:hover:bg-dark-hover-bg focus-visible:z-10`}
                    aria-label={`${stat.value} ${stat.label} — verify`}
                    {...props}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={stat.label} className={CELL} {...props}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* ── Open source label row ── */}
            <div className="flex items-center justify-between gap-3 border-t border-border dark:border-dark-border bg-surface/60 dark:bg-dark-surface/60 px-4 py-2.5">
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted dark:text-dark-text-muted">
                Open source · merged contributor
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tabular-nums text-text-secondary dark:text-dark-text-secondary">
                <Star size={10} className="opacity-70" />
                {CONTRIBUTION_TOTAL_STARS} stars across {CONTRIBUTIONS.length}{" "}
                repos
              </span>
            </div>

            {/* ── Contributed repos ── */}
            <div className="grid grid-cols-2 gap-px border-t border-border dark:border-dark-border bg-border dark:bg-dark-border sm:grid-cols-4">
              {CONTRIBUTIONS.map((c) => (
                <a
                  key={c.repo}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CELL} items-center gap-3 px-3.5 py-4 hover:bg-hover-bg dark:hover:bg-dark-hover-bg focus-visible:z-10`}
                  aria-label={`${c.name} — ${c.stars} stars, ${c.note}`}
                  {...hoverProps(c.repo, c.preview, c.href)}
                >
                  <img
                    src={c.logo}
                    alt=""
                    aria-hidden
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 shrink-0 rounded-md object-cover ring-1 ring-border dark:ring-dark-border"
                  />
                  <span className="min-w-0 flex flex-col leading-tight">
                    <span className="flex items-center gap-1 font-display text-[13px] font-semibold tracking-tight text-text dark:text-dark-text">
                      <span className="truncate">{c.name}</span>
                      <ArrowUpRight
                        size={10}
                        className="shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-0.5 truncate text-[11px] tabular-nums text-text-secondary dark:text-dark-text-secondary">
                      {c.stars} ★ · {c.note}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Hover verification card — fixed-positioned so it can escape the
          card's overflow clip and float over the page. */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.key}
            className="pointer-events-none fixed z-50"
            style={{ left: clampCardX(active.rect), top: active.rect.top }}
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
                src={active.preview.image}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="aspect-[120/63] w-full object-cover"
              />
              <div className="p-3">
                <p className="text-[12px] font-semibold leading-snug text-text dark:text-dark-text">
                  {active.preview.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-text-secondary dark:text-dark-text-secondary">
                  {active.preview.facts}
                </p>
                {active.href && (
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
