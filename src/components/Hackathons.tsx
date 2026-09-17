import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Trophy } from "lucide-react";
import { HACKATHONS, type Hackathon } from "../data/content";
import { FadeIn } from "./FadeIn";

const INITIAL_VISIBLE = 4;

function YCBadge() {
  return (
    <span
      aria-label="Y Combinator"
      className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-[#FF6600] text-[9px] font-bold leading-none text-white"
    >
      Y
    </span>
  );
}

function WonCard({ h }: { h: Hackathon }) {
  const subtitle = [h.result, h.project].filter(Boolean).join(" · ");

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 transition-colors duration-200 hover:border-border-hover dark:hover:border-dark-border-hover">
      <div className="relative flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={h.image}
            alt={h.alt}
            loading="lazy"
            className="relative h-14 w-14 rounded-xl object-cover ring-1 ring-border dark:ring-dark-border"
          />
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-hover-bg dark:bg-dark-hover-bg border border-border dark:border-dark-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
            <Trophy size={10} className="text-text-muted dark:text-dark-text-muted" />
            Won
          </span>
          <p className="mt-1.5 flex items-center gap-1.5 text-[15px] font-semibold text-text dark:text-dark-text leading-snug">
            {h.name}
            {h.yc && <YCBadge />}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-[12.5px] text-text-muted dark:text-dark-text-muted">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function AttendedCard({ h }: { h: Hackathon }) {
  const subtitle = h.project ? `Built ${h.project}` : "Participant";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 transition-colors duration-200 hover:border-border-hover dark:hover:border-dark-border-hover">
      <div className="flex items-center gap-4">
        <img
          src={h.image}
          alt={h.alt}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-border dark:ring-dark-border grayscale-[35%] transition-[filter] duration-300 group-hover:grayscale-0"
        />
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center rounded-full bg-hover-bg dark:bg-dark-hover-bg px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted">
            Attended
          </span>
          <p className="mt-1.5 flex items-center gap-1.5 text-[15px] font-semibold text-text dark:text-dark-text leading-snug">
            {h.name}
            {h.yc && <YCBadge />}
          </p>
          <p className="mt-0.5 text-[12.5px] text-text-muted dark:text-dark-text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hackathons() {
  // Only the first rows show; the rest sit behind the arrow.
  const [expanded, setExpanded] = useState(false);

  const total = HACKATHONS.length;
  // Won entries first so the highlighted cards lead the grid.
  const ordered = [...HACKATHONS].sort((a, b) => Number(b.won) - Number(a.won));

  const hasMore = ordered.length > INITIAL_VISIBLE;
  const visible = expanded ? ordered : ordered.slice(0, INITIAL_VISIBLE);

  return (
    <section id="hackathons" className="py-16 px-6" data-section="hackathons">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-text dark:text-dark-text">
              Hackathons
            </h2>
            <span className="text-[12px] text-text-muted dark:text-dark-text-muted tabular-nums">
              {total} hackathons
            </span>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {visible.map((h, i) => (
              <FadeIn key={h.name} delay={(i % INITIAL_VISIBLE) * 0.05}>
                {h.won ? <WonCard h={h} /> : <AttendedCard h={h} />}
              </FadeIn>
            ))}
          </div>

          {/* Fade hint that more hackathons are tucked below */}
          {hasMore && !expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg via-bg/75 to-transparent dark:from-dark-bg dark:via-dark-bg/75" />
          )}
        </div>

        {hasMore && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              aria-label={expanded ? "Show fewer hackathons" : "Show all hackathons"}
              className="rounded-md p-1.5 text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200"
            >
              <motion.span
                className="block"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
