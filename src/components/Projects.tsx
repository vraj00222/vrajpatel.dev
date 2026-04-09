import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { TechIcon } from "./TechIcon";
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
      </div>
    </section>
  );
}
