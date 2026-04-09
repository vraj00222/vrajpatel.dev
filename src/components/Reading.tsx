import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowUpRight, ChevronDown } from "lucide-react";
import { READING, TOTAL_PAPERS } from "../data/papers";
import { FadeIn } from "./FadeIn";

export function Reading() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggle = (label: string) =>
    setExpandedCategory((prev) => (prev === label ? null : label));

  return (
    <section id="reading" className="py-14 px-6" data-section="reading">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest">
              Reading
            </h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-text-muted dark:text-dark-text-muted">
              <BookOpen size={12} />
              {TOTAL_PAPERS} papers read
            </span>
          </div>
        </FadeIn>

        <div className="space-y-2">
          {READING.map((category, ci) => (
            <FadeIn key={category.label} delay={ci * 0.04}>
              <div className="rounded-lg border border-border dark:border-dark-border overflow-hidden">
                {/* Category header — clickable accordion */}
                <button
                  onClick={() => toggle(category.label)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-surface dark:bg-dark-surface hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-text dark:text-dark-text">
                      {category.label}
                    </span>
                    <span className="text-[11px] text-text-muted dark:text-dark-text-muted tabular-nums">
                      {category.papers.length}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedCategory === category.label ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={14}
                      className="text-text-muted dark:text-dark-text-muted"
                    />
                  </motion.div>
                </button>

                {/* Paper list */}
                <AnimatePresence initial={false}>
                  {expandedCategory === category.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border dark:border-dark-border">
                        {category.papers.map((paper, pi) => (
                          <a
                            key={pi}
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-3 px-4 py-3 hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-150 border-b border-border dark:border-dark-border last:border-b-0"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-medium text-text dark:text-dark-text leading-snug group-hover:underline underline-offset-2 decoration-border dark:decoration-dark-border">
                                {paper.title}
                              </p>
                              <p className="text-[11px] text-text-muted dark:text-dark-text-muted mt-1">
                                {paper.authors} &middot;{" "}
                                <span className="italic">{paper.venue}</span>{" "}
                                &middot; {paper.year}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={12}
                              className="shrink-0 mt-1 text-text-muted dark:text-dark-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
