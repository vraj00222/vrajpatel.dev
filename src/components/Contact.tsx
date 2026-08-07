import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

type LinkItem = {
  label: string;
  href: string;
  icon: IconComponent;
  hoverColor: string; // dark mode hover
  hoverColorLight: string; // light mode hover
};

// Email is the primary action; everything below is a quiet secondary link.
const links: LinkItem[] = [
  { label: "GitHub", href: PERSONAL.github, icon: GithubIcon, hoverColor: "#e6edf3", hoverColorLight: "#000000" },
  { label: "LinkedIn", href: PERSONAL.linkedin, icon: LinkedinIcon, hoverColor: "#0A66C2", hoverColorLight: "#0A66C2" },
  { label: "X", href: PERSONAL.x, icon: XIcon, hoverColor: "#e6edf3", hoverColorLight: "#000000" },
  { label: "Devpost", href: PERSONAL.devpost, icon: ArrowUpRight, hoverColor: "#003E54", hoverColorLight: "#003E54" },
  { label: "Shipyard", href: PERSONAL.shipyard, icon: ArrowUpRight, hoverColor: "#06B6D4", hoverColorLight: "#06B6D4" },
  { label: "Resume", href: "/resume.pdf?v=2026-08-06", icon: FileText, hoverColor: "#10b981", hoverColorLight: "#10b981" },
];

export function Contact() {
  return (
    <section id="contact" className="py-16 px-6" data-section="contact">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-2">
            Contact
          </h2>
          <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mb-6">
            Open to interesting problems, collaborations, and the right opportunity.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold bg-text dark:bg-dark-text text-bg dark:text-dark-bg hover:opacity-90 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text dark:focus-visible:outline-dark-text"
          >
            <Mail size={16} />
            Email me
          </a>
          <p className="mt-2 text-[12px] text-text-muted dark:text-dark-text-muted">
            {PERSONAL.email}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6">
            {links.map(({ label, href, icon: Icon, hoverColor, hoverColorLight }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text hover:underline underline-offset-4 transition-colors duration-100"
                onMouseEnter={(e) => {
                  const isDark = document.documentElement.classList.contains("dark");
                  e.currentTarget.style.color = isDark ? hoverColor : hoverColorLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
