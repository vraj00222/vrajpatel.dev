import { SKILLS, EDUCATION, PUBLICATION } from "../data/content";
import { FadeIn } from "./FadeIn";
import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";

const SKILL_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "C++": "#00599C",
  SQL: "#E38C00",
  React: "#61DAFB",
  "Next.js": "#111111",
  "Node.js": "#339933",
  Django: "#44B78B",
  "Tailwind CSS": "#06B6D4",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Docker: "#2496ED",
  AWS: "#FF9900",
  Git: "#F05032",
};

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
              <motion.span
                key={skill}
                className="group relative isolate overflow-hidden px-3 py-1.5 text-[13px] font-medium rounded-md bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary transition-all duration-250 hover:border-(--skill-color)"
                style={{ "--skill-color": SKILL_COLORS[skill] ?? "#111111" } as CSSProperties}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-md bg-(--skill-color)/12 transition-transform duration-250 ease-out group-hover:scale-x-100" />
                <span className="pointer-events-none absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1 rounded-full bg-(--skill-color) opacity-0 transition-all duration-250 group-hover:translate-x-0 group-hover:opacity-100" />
                <span className="pr-2 transition-colors duration-250 group-hover:text-(--skill-color) dark:group-hover:text-(--skill-color)">
                  {skill}
                </span>
              </motion.span>
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
