import { SKILLS, EDUCATION } from "../data/content";
import { FadeIn } from "./FadeIn";
import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();

  const skillsContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.025,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const skillItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.6 },
    },
  };

  return (
    <section id="about" className="py-16 px-6" data-section="about">
      <div className="mx-auto max-w-2xl space-y-16">

        {/* Skills */}
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-5">
            Skills
          </h2>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={skillsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SKILLS.map((skill) => {
              // Next.js / Vercel / Cursor brand white would disappear on light backgrounds.
              const isWhiteBrand = skill === "Next.js" || skill === "Vercel" || skill === "Vercel AI SDK" || skill === "Cursor";
              const skillColor = isWhiteBrand ? "#2d2d2d" : getTechColor(skill);
              const hoverTextColor = getReadableTextColor(skillColor);
              const logoColor = isWhiteBrand ? "#ffffff" : skillColor;

              return (
                <motion.span
                  key={skill}
                  variants={skillItem}
                  className="group relative isolate overflow-hidden px-3 py-1.5 text-[13px] font-medium rounded-md bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary transition-[border-color,box-shadow] duration-150 hover:border-(--skill-color) hover:shadow-[0_4px_14px_-6px_var(--skill-color)]"
                  style={{ "--skill-color": skillColor, "--skill-fg": hoverTextColor } as CSSProperties}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 580, damping: 32 }}
                >
                  <span className="pointer-events-none absolute inset-0 -z-10 -translate-x-[102%] transform-gpu bg-(--skill-color) transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />

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
          </motion.div>
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
      </div>
    </section>
  );
}
