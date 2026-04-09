import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const links: { label: string; href: string; icon: IconComponent; hoverColor: string }[] = [
  { label: "Email", href: `mailto:${PERSONAL.email}`, icon: Mail, hoverColor: "#EA4335" },
  { label: "GitHub", href: PERSONAL.github, icon: GithubIcon, hoverColor: "#e6edf3" },
  { label: "LinkedIn", href: PERSONAL.linkedin, icon: LinkedinIcon, hoverColor: "#0A66C2" },
  { label: "X", href: PERSONAL.x, icon: XIcon, hoverColor: "#e6edf3" },
  { label: "Devpost", href: PERSONAL.devpost, icon: ArrowUpRight, hoverColor: "#003E54" },
  { label: "Shipyard", href: PERSONAL.shipyard, icon: ArrowUpRight, hoverColor: "#06B6D4" },
  { label: "Resume", href: "/resume.pdf", icon: FileText, hoverColor: "#10b981" },
];

export function Contact() {
  return (
    <section id="contact" className="py-14 px-6" data-section="contact">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-2">
            Contact
          </h2>
          <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mb-6">
            Open to interesting problems, collaborations, and the right opportunity.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="flex flex-wrap gap-2">
            {links.map(({ label, href, icon: Icon, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group inline-flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-md bg-dark-surface border border-dark-border text-dark-text-secondary hover:text-dark-text hover:border-dark-border-hover transition-all duration-200"
                style={{ ["--brand" as string]: hoverColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = hoverColor;
                  e.currentTarget.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
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
    </section>
  );
}
