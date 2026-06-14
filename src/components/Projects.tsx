import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "./Icons";
import { TechIcon } from "./TechIcon";
import { PROJECTS } from "../data/content";
import { FadeIn } from "./FadeIn";

const INITIAL_VISIBLE = 3;
const CHUNK = 3;

export function Projects() {
  // Reveal projects in chunks instead of all at once.
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const total = PROJECTS.length;
  const hasMore = visibleCount < total;
  const isExpanded = visibleCount > INITIAL_VISIBLE;
  const visibleProjects = PROJECTS.slice(0, visibleCount);
  const remaining = total - visibleCount;

  const showMore = () =>
    setVisibleCount((c) => Math.min(c + CHUNK, total));
  const showLess = () => setVisibleCount(INITIAL_VISIBLE);

  return (
    <section id="projects" className="py-14 px-6" data-section="projects">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest">
              Projects
            </h2>
            <span className="text-[12px] text-text-muted dark:text-dark-text-muted tabular-nums">
              {visibleCount} / {total}
            </span>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="space-y-1">
            {visibleProjects.map((project, i) => (
              <FadeIn key={project.name} delay={(i % CHUNK) * 0.05}>
                <div className="group -mx-3 px-3 py-3.5 rounded-lg hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <a
                          href={"live" in project && project.live ? project.live : project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] font-semibold text-text dark:text-dark-text hover:underline underline-offset-2"
                        >
                          {project.name}
                        </a>
                        {"award" in project && project.award && (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded">
                            {project.award}
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mt-1.5 leading-[1.6]">
                        {project.description}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1.5 flex items-center gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text transition-colors duration-200"
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <GithubIcon size={14} />
                      </motion.a>
                      {"live" in project && project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} live site`}
                          className="text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text transition-colors duration-200"
                          whileHover={{ y: -1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <ArrowUpRight size={15} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Tech icons row */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tech.map((t) => (
                      <TechIcon key={t} name={t} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Fade hint that more projects are tucked below */}
          {hasMore && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg via-bg/75 to-transparent dark:from-dark-bg dark:via-dark-bg/75" />
          )}
        </div>

        {(hasMore || isExpanded) && (
          <div className="mt-4 flex justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={showMore}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors duration-200"
              >
                Load more
                <span className="text-text-muted dark:text-dark-text-muted">
                  ({Math.min(CHUNK, remaining)} of {remaining})
                </span>
                <ChevronDown size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={showLess}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors duration-200"
              >
                Show less
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
