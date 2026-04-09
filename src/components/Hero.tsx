import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import heroPhoto from "../assets/vraj.jpg";

export function Hero() {
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
                Software Engineer &middot; {PERSONAL.location}
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
              { href: PERSONAL.github, icon: GithubIcon, label: "GitHub", hoverColor: "#e6edf3" },
              { href: PERSONAL.linkedin, icon: LinkedinIcon, label: "LinkedIn", hoverColor: "#0A66C2" },
              { href: PERSONAL.x, icon: XIcon, label: "X", hoverColor: "#e6edf3" },
            ].map(({ href, icon: Icon, label, hoverColor }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text-muted transition-colors duration-200"
                style={{ ["--hover-color" as string]: hoverColor }}
                aria-label={label}
                whileHover={{ y: -1, color: hoverColor }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <span className="w-px h-4 bg-dark-border" />
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-dark-text-muted transition-colors duration-200"
              whileHover={{ y: -1, color: "#10b981" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
