import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { AuroraBackground } from "../ui/aurora-background";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

interface ArticleShellProps {
  category: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  children: ReactNode;
}

/**
 * Shared chrome for a single blog article: aurora background, sticky-feel
 * header with a back-to-blog link and theme toggle, and the article card
 * with its category chip, title, subtitle and meta row. Body sections are
 * passed as children.
 */
export function ArticleShell({
  category,
  icon,
  title,
  subtitle,
  date,
  readingTime,
  children,
}: ArticleShellProps) {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AuroraBackground>
      <header className="relative z-10 mx-auto max-w-3xl w-full flex-none flex items-center justify-between gap-8 px-6 h-14">
        <a
          href="/"
          className="font-display text-sm font-semibold text-text dark:text-dark-text tracking-tight"
        >
          vraj.
        </a>
        <div className="flex items-center gap-2">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[13px] text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            All posts
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-all duration-200"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className="inline-flex"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-8 pb-16 sm:pt-12">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-2xl border border-border/80 dark:border-dark-border/80 bg-surface dark:bg-dark-surface p-6 sm:p-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border dark:border-dark-border bg-hover-bg/80 dark:bg-dark-hover-bg/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
            {icon}
            {category}
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-text dark:text-dark-text">
            {title}
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
            {subtitle}
          </p>

          <div className="mt-4 flex items-center gap-2 text-[12px] text-text-muted dark:text-dark-text-muted">
            <span>{date}</span>
            <span aria-hidden>·</span>
            <span>{readingTime}</span>
          </div>

          {children}
        </motion.article>
      </main>
    </AuroraBackground>
  );
}
