import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, MapPin } from "lucide-react";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import heroPhoto from "../assets/vraj.jpg";

const ROTATING_ROLES = [
  "Teaching Associate",
  "Deep Learning Researcher",
  "Software Engineer",
  "Full-Stack Engineer",
  "Machine Learning Engineer",
];

export function Hero() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || ROTATING_ROLES.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const activeRole = ROTATING_ROLES[activeRoleIndex];

  return (
    <section id="hero" className="pt-28 pb-6 px-6" data-section="hero">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="flex items-center gap-5 mb-8">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <img
                src={heroPhoto}
                alt="Vraj Patel"
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
                loading="eager"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-bg dark:ring-dark-bg" />
            </motion.div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-text dark:text-dark-text tracking-tight">
                {PERSONAL.name}
              </h1>
              <p className="text-sm text-text-muted dark:text-dark-text-muted mt-0.5">
                <span className="relative inline-flex h-[1.2em] overflow-hidden align-middle">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeRole}
                      className="inline-block whitespace-nowrap will-change-[transform,opacity,filter]"
                      initial={
                        shouldReduceMotion
                          ? false
                          : { y: 16, opacity: 0, filter: "blur(3px)" }
                      }
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { y: -16, opacity: 0, filter: "blur(3px)" }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.62,
                              ease: [0.22, 1, 0.36, 1],
                              opacity: {
                                duration: 0.46,
                                ease: [0.33, 1, 0.68, 1],
                              },
                              filter: {
                                duration: 0.46,
                                ease: [0.33, 1, 0.68, 1],
                              },
                            }
                      }
                    >
                      {activeRole}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-text-muted dark:text-dark-text-muted">
                <MapPin size={12} className="opacity-80" />
                {PERSONAL.location}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <p className="text-[15px] leading-[1.75] text-text-secondary dark:text-dark-text-secondary">
            {PERSONAL.bio}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="flex items-center gap-5 mt-6">
            {[
              { href: PERSONAL.github, icon: GithubIcon, label: "GitHub", hoverColor: "#000000", hoverColorDark: "#e6edf3" },
              { href: PERSONAL.linkedin, icon: LinkedinIcon, label: "LinkedIn", hoverColor: "#0A66C2", hoverColorDark: "#0A66C2" },
              { href: PERSONAL.x, icon: XIcon, label: "X", hoverColor: "#000000", hoverColorDark: "#e6edf3" },
            ].map(({ href, icon: Icon, label, hoverColor, hoverColorDark }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted dark:text-dark-text-muted transition-colors duration-100"
                aria-label={label}
                whileHover={{
                  y: -1,
                  color: document.documentElement.classList.contains("dark")
                    ? hoverColorDark
                    : hoverColor,
                }}
                transition={{ duration: 0.1 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <span className="w-px h-4 bg-border dark:bg-dark-border" />
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-text-muted dark:text-dark-text-muted transition-colors duration-100"
              whileHover={{ y: -1, color: "#10b981" }}
              transition={{ duration: 0.1 }}
            >
              <FileText size={14} />
              Resume
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
