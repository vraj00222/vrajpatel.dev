import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { PROJECTS } from "../data/content";
import { FadeIn } from "./FadeIn";

export function Projects() {
  return (
    <section id="projects" className="py-14 px-6" data-section="projects">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-6">
            Projects
          </h2>
        </FadeIn>

        <div className="space-y-1">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.05}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 -mx-3 px-3 py-3.5 rounded-lg hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[15px] font-semibold text-text dark:text-dark-text">
                      {project.name}
                    </span>
                    {"award" in project && project.award && (
                      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 px-1.5 py-0.5 rounded">
                        {project.award}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mt-1.5 leading-[1.6]">
                    {project.description}
                  </p>
                  <p className="text-[12px] text-text-muted dark:text-dark-text-muted mt-2">
                    {project.tech.join(" · ")}
                  </p>
                </div>
                <div className="shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {"live" in project && project.live ? (
                    <ArrowUpRight size={15} className="text-text-muted dark:text-dark-text-muted" />
                  ) : (
                    <GithubIcon size={14} className="text-text-muted dark:text-dark-text-muted" />
                  )}
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
