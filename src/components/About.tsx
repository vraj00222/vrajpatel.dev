import { SKILLS, EDUCATION, PUBLICATION } from "../data/content";
import { FadeIn } from "./FadeIn";
import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { getTechColor, getTechLogo } from "./TechIcon";

function getReadableTextColor(hex: string) {
  const cleaned = hex.replace("#", "");
  const value = cleaned.length === 3
    ? cleaned
        .split("")
        .map((c) => c + c)
        .join("")
    : cleaned;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.6 ? "#111111" : "#ffffff";
}

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
            {SKILLS.map((skill) => {
              // Next.js brand white would disappear on light backgrounds.
              const skillColor = skill === "Next.js" ? "#2d2d2d" : getTechColor(skill);
              const hoverTextColor = getReadableTextColor(skillColor);
              const logoColor = skill === "Next.js" ? "#ffffff" : skillColor;

              return (
                <motion.span
                  key={skill}
                  className="group relative isolate overflow-hidden px-3 py-1.5 text-[13px] font-medium rounded-md bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary transition-all duration-150 hover:border-(--skill-color)"
                  style={{ "--skill-color": skillColor, "--skill-fg": hoverTextColor } as CSSProperties}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 580, damping: 32 }}
                >
                  <span className="pointer-events-none absolute inset-0 -z-10 -translate-x-[102%] transform-gpu bg-(--skill-color) transition-transform duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />

                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-bg/90 dark:bg-dark-bg/85 opacity-0 -translate-x-1 scale-95 shadow-sm transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100">
                      {getTechLogo(skill, 13, logoColor)}
                    </span>
                    <span className="transition-colors duration-150 group-hover:text-(--skill-fg) dark:group-hover:text-(--skill-fg)">
                      {skill}
                    </span>
                  </span>
                </motion.span>
              );
            })}
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
