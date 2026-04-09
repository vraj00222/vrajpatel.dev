import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EXPERIENCE } from "../data/content";
import { FadeIn } from "./FadeIn";
import { TechIcon } from "./TechIcon";

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (i: number) =>
    setExpanded((prev) => (prev === i ? null : i));

  return (
    <section id="experience" className="py-14 px-6" data-section="experience">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-dark-text uppercase tracking-widest mb-8">
            Work
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {EXPERIENCE.map((job, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-lg border border-dark-border overflow-hidden">
                {/* Header — always visible, clickable */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left px-4 py-4 bg-dark-surface hover:bg-dark-hover-bg transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-[15px] font-semibold text-dark-text">
                          {job.company}
                        </span>
                        {i === 0 && (
                          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Working
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-dark-text-muted mt-0.5">
                        {job.title}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-[13px] text-dark-text-secondary tabular-nums">
                          {job.period}
                        </p>
                        <p className="text-[12px] text-dark-text-muted mt-0.5">
                          {job.location}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          size={14}
                          className="text-dark-text-muted"
                        />
                      </motion.div>
                    </div>
                  </div>
                  {/* Mobile period/location */}
                  <div className="sm:hidden mt-1.5">
                    <p className="text-[12px] text-dark-text-muted">
                      {job.period} &middot; {job.location}
                    </p>
                  </div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-dark-border px-4 py-4 space-y-4">
                        {/* Tech stack */}
                        <div>
                          <p className="text-[13px] font-semibold text-dark-text mb-2.5">
                            Technologies & Tools
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {job.tech.map((t) => (
                              <TechIcon key={t} name={t} />
                            ))}
                          </div>
                        </div>

                        {/* What I've done */}
                        <div>
                          <p className="text-[13px] font-semibold text-dark-text mb-2">
                            What I've done
                          </p>
                          <ul className="space-y-2">
                            {job.bullets.map((bullet, bi) => (
                              <li
                                key={bi}
                                className="text-[13px] text-dark-text-secondary leading-[1.7] pl-3 relative before:content-['▪'] before:absolute before:left-0 before:text-dark-text-muted before:text-[10px] before:top-0.75"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
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
