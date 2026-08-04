import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, BadgeCheck } from "lucide-react";
import { PUBLICATION } from "../data/content";
import { FadeIn } from "./FadeIn";

export function Research() {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(PUBLICATION.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-16 px-6" data-section="research">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-6">
            Research
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          {/* Blue accent (left rail + venue badge) marks this as peer-reviewed;
              amber is reserved for hackathon wins, emerald for "currently". */}
          <div className="rounded-lg border border-border dark:border-dark-border border-l-2 border-l-blue-600 dark:border-l-blue-400 bg-surface dark:bg-dark-surface p-5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                <BadgeCheck size={11} />
                {PUBLICATION.venue}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted">
                Peer-reviewed
              </span>
            </div>
            <h3 className="font-display text-[19px] text-text dark:text-dark-text font-semibold leading-snug tracking-tight mt-3">
              {PUBLICATION.title}
            </h3>
            <p className="text-[13px] text-text-muted dark:text-dark-text-muted mt-2">
              {PUBLICATION.authors}
            </p>
            <p className="font-mono text-[11px] text-text-muted dark:text-dark-text-muted mt-1">
              doi:{PUBLICATION.doi}
            </p>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border dark:border-dark-border">
              <a
                href={PUBLICATION.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text dark:text-dark-text hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-200"
              >
                <ArrowUpRight size={13} />
                View on IEEE
              </a>
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text dark:text-dark-text hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <Check size={13} /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5">
                      <Copy size={13} /> Cite BibTeX
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
