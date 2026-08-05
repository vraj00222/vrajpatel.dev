import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LABS } from "../data/content";
import { FadeIn } from "./FadeIn";
import transformerCard from "../assets/transformer-card.png";

// Card art lives with the bundle; data stays plain strings.
const CARD_IMAGES: Record<string, string> = {
  "attention-is-all-you-need": transformerCard,
};

export function Labs() {
  return (
    <section id="labs" className="py-16 px-6" data-section="labs">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest">
              From Scratch
            </h2>
            <span className="text-[12px] text-text-muted dark:text-dark-text-muted tabular-nums">
              {String(LABS.length).padStart(2, "0")}
            </span>
          </div>
          <p className="max-w-2xl text-[14px] text-text-secondary dark:text-dark-text-secondary mb-6 leading-[1.6]">
            Core AI, rebuilt from the paper up — the architecture, the math, and
            minimal code. A growing series.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {LABS.map((lab, i) => (
            <FadeIn key={lab.id} delay={i * 0.05}>
              <motion.a
                href={lab.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${lab.title} — open interactive walkthrough`}
                className="group block overflow-hidden rounded-xl border border-border dark:border-dark-border hover:border-border-hover dark:hover:border-dark-border-hover transition-colors duration-200"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <div className="grid md:grid-cols-[5fr_6fr]">
                  <div className="relative overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={CARD_IMAGES[lab.id]}
                      alt={`${lab.title} — preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-left transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-semibold text-text dark:text-dark-text">
                        {lab.title}
                      </h3>
                      <span className="shrink-0 mt-0.5 flex items-center gap-2 text-[12px] text-text-muted dark:text-dark-text-muted tabular-nums">
                        {lab.year}
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                    <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mt-1.5 leading-[1.6]">
                      {lab.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lab.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-hover-bg dark:bg-dark-hover-bg px-1.5 py-0.5 text-[11px] font-medium text-text-secondary dark:text-dark-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
