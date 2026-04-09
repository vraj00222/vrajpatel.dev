import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

const links: { label: string; href: string; icon: IconComponent }[] = [
  { label: "Email", href: `mailto:${PERSONAL.email}`, icon: Mail },
  { label: "GitHub", href: PERSONAL.github, icon: GithubIcon },
  { label: "LinkedIn", href: PERSONAL.linkedin, icon: LinkedinIcon },
  { label: "X", href: PERSONAL.x, icon: XIcon },
  { label: "Devpost", href: PERSONAL.devpost, icon: ArrowUpRight },
  { label: "Shipyard", href: PERSONAL.shipyard, icon: ArrowUpRight },
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
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-md bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text hover:border-border-hover dark:hover:border-dark-border-hover transition-all duration-200"
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
