import { Trophy } from "lucide-react";
import { HACKATHONS, type Hackathon } from "../data/content";
import { FadeIn } from "./FadeIn";

function WonCard({ h }: { h: Hackathon }) {
  const subtitle = [h.result, h.project].filter(Boolean).join(" · ");

  return (
    <div className="group relative overflow-hidden rounded-xl border border-amber-400/25 dark:border-amber-400/20 bg-surface dark:bg-dark-surface p-4 shadow-[0_4px_20px_-14px_rgba(251,191,36,0.4)] transition-shadow duration-300 hover:shadow-[0_6px_24px_-12px_rgba(251,191,36,0.5)]">
      {/* soft warm wash in the corner — gentle "sunshine", not flashy */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-300/10 dark:bg-amber-400/10 blur-2xl"
      />

      <div className="relative flex items-center gap-4">
        <div className="relative shrink-0">
          {/* subtle halo behind the logo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-amber-400/15 blur-md"
          />
          <img
            src={h.image}
            alt={h.alt}
            loading="lazy"
            className="relative h-14 w-14 rounded-xl object-cover ring-1 ring-amber-400/30"
          />
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/12 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Trophy size={10} />
            Won
          </span>
          <p className="mt-1.5 text-[15px] font-semibold text-text dark:text-dark-text leading-snug">
            {h.name}
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
          <p className="mt-1.5 text-[15px] font-semibold text-text dark:text-dark-text leading-snug">
            {h.name}
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
  const wins = HACKATHONS.filter((h) => h.won).length;
  // Won entries first so the highlighted cards lead the grid.
  const ordered = [...HACKATHONS].sort((a, b) => Number(b.won) - Number(a.won));

  return (
    <section id="hackathons" className="py-16 px-6" data-section="hackathons">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-text dark:text-dark-text">
              Hackathons
            </h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-text-muted dark:text-dark-text-muted">
              <Trophy size={12} />
              {wins} wins
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ordered.map((h, i) => (
            <FadeIn key={h.name} delay={i * 0.05}>
              {h.won ? <WonCard h={h} /> : <AttendedCard h={h} />}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
