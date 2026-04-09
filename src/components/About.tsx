import { SKILLS, EDUCATION, PUBLICATION } from "../data/content";
import { FadeIn } from "./FadeIn";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";

export function About() {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(PUBLICATION.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-14 px-6" data-section="about">
      <div className="mx-auto max-w-2xl space-y-16">

        {/* Skills */}
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-5">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-[13px] font-medium rounded-md bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary hover:border-border-hover dark:hover:border-dark-border-hover transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={0.06}>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-5">
            Education
          </h2>
          <div className="space-y-5">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[15px] text-text dark:text-dark-text font-medium">
                    {edu.degree}
                  </p>
                  <p className="text-[13px] text-text-muted dark:text-dark-text-muted mt-1">
                    {edu.school} &middot; {edu.gpa} GPA
                  </p>
                </div>
                <span className="text-[13px] text-text-muted dark:text-dark-text-muted shrink-0 tabular-nums">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Publication */}
        <FadeIn delay={0.1}>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-5">
            Research
          </h2>
          <div className="rounded-lg border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5">
            <p className="text-[15px] text-text dark:text-dark-text font-semibold leading-snug">
              {PUBLICATION.title}
            </p>
            <p className="text-[13px] text-text-muted dark:text-dark-text-muted mt-2">
              {PUBLICATION.authors}
            </p>
            <p className="text-[13px] text-text-muted dark:text-dark-text-muted mt-0.5">
              {PUBLICATION.venue}
            </p>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border dark:border-dark-border">
              <a
                href={PUBLICATION.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text dark:text-dark-text hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-200"
              >
                <ArrowUpRight size={13} />
                View on IEEE
              </a>
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text dark:text-dark-text hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Check size={13} /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5">
                      <Copy size={13} /> Cite BibTeX
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
