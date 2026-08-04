import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, MapPin } from "lucide-react";
import { PERSONAL } from "../data/content";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import heroPhoto from "../assets/vraj.jpg";

const ROTATING_ROLES = [
  "Teaching Associate",
  "Deep Learning Researcher",
  "Software Engineer",
  "Full-Stack Engineer",
  "Machine Learning Engineer",
];

// The one claim the page is built around. Split out of PERSONAL.bio, which
// ships as a single paragraph.
const THESIS = "I build full-stack systems, publish ML research, and teach algorithms.";
const CONTEXT_LINE = "Software engineer and CS grad student at Cal State Fullerton.";
const AVAILABILITY_LINE = "Currently looking for full-time roles starting May 2026.";

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

  // Single choreographed page-load sequence: identity → statement → copy → links.
  const sequence: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.08,
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
      },
    },
  };

  const step: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="hero" className="pt-28 pb-6 px-6" data-section="hero">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={sequence}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
        <motion.div variants={step} className="flex items-center gap-3.5">
          <motion.div
            className="relative shrink-0"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <img
              src={heroPhoto}
              alt="Vraj Patel"
              className="w-12 h-12 rounded-full object-cover"
              width={48}
              height={48}
              loading="eager"
            />
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-bg dark:ring-dark-bg" />
          </motion.div>
          <div className="min-w-0">
            <h1 className="font-display text-[17px] font-semibold text-text dark:text-dark-text tracking-tight">
              {PERSONAL.name}
            </h1>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-text-muted dark:text-dark-text-muted">
              <MapPin size={12} className="opacity-80 shrink-0" />
              {PERSONAL.location}
            </p>
          </div>
        </motion.div>

        <motion.div variants={step} className="mt-8">
          {/* Rotating roles, demoted to an eyebrow above the statement. */}
          <p className="text-[13px] text-text-muted dark:text-dark-text-muted">
            <span className="relative inline-flex h-[1.45em] overflow-hidden align-middle">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeRole}
                  className="inline-block whitespace-nowrap will-change-[transform,opacity,filter]"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { y: 16, opacity: 0, filter: "blur(3px)" }
                  }
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.62,
                          ease: [0.22, 1, 0.36, 1],
                          opacity: {
                            duration: 0.48,
                            ease: [0.33, 1, 0.68, 1],
                          },
                          filter: {
                            duration: 0.48,
                            ease: [0.33, 1, 0.68, 1],
                          },
                        },
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          y: -16,
                          opacity: 0,
                          filter: "blur(3px)",
                          transition: {
                            delay: 0.1,
                            duration: 0.5,
                            ease: [0.33, 1, 0.68, 1],
                            opacity: {
                              duration: 0.4,
                              ease: [0.33, 1, 0.68, 1],
                            },
                            filter: {
                              duration: 0.4,
                              ease: [0.33, 1, 0.68, 1],
                            },
                          },
                        }
                  }
                >
                  {activeRole}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          <p
            className="mt-2 font-display font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-text dark:text-dark-text"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            {THESIS}
          </p>
        </motion.div>

        <motion.div variants={step} className="mt-7 space-y-1.5">
          <p className="text-[15px] leading-[1.7] text-text-secondary dark:text-dark-text-secondary">
            {CONTEXT_LINE}
          </p>
          <p className="text-[15px] leading-[1.7] font-medium text-text-secondary dark:text-dark-text-secondary">
            {AVAILABILITY_LINE}
          </p>
        </motion.div>

        <motion.div variants={step} className="flex items-center gap-5 mt-7">
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
            href="/resume.pdf?v=2026-05-25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-text-muted dark:text-dark-text-muted transition-colors duration-100"
            whileHover={{ y: -1, color: "#10b981" }}
            transition={{ duration: 0.1 }}
          >
            <FileText size={14} />
            Resume
          </motion.a>
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
