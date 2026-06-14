import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  Moon,
  Shield,
  Sun,
  Usb,
} from "lucide-react";
import { AuroraBackground } from "./ui/aurora-background";
import { POSTS, type BlogIcon } from "../data/blog";

const ICONS: Record<BlogIcon, typeof Shield> = {
  shield: Shield,
  git: GitBranch,
  usb: Usb,
};

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function BlogIndex() {
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
      <header className="relative z-10 mx-auto max-w-3xl w-full flex-none flex items-center justify-between px-6 h-12">
        <a
          href="/"
          className="font-display text-sm font-semibold text-text dark:text-dark-text tracking-tight"
        >
          vraj.
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[13px] text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            Home
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

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-10 pb-16 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-text dark:text-dark-text">
            Writing
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
            Notes on the things I build and break — security internals,
            developer tooling, and local AI.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POSTS.map((post, i) => {
            const Icon = ICONS[post.icon];
            return (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + i * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -3 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 dark:border-dark-border/80 bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-border-hover dark:hover:border-dark-border-hover hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] ${
                  post.featured ? "sm:col-span-2 sm:p-8" : ""
                }`}
              >
                {/* Oversized watermark icon on the featured tile */}
                {post.featured && (
                  <Icon
                    className="pointer-events-none absolute -right-6 -top-6 text-text/[0.04] dark:text-dark-text/[0.05]"
                    size={150}
                    strokeWidth={1.25}
                    aria-hidden
                  />
                )}

                <div className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-border dark:border-dark-border bg-hover-bg/80 dark:bg-dark-hover-bg/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
                  <Icon size={12} />
                  {post.category}
                </div>

                <h2
                  className={`relative z-10 mt-4 font-display font-bold tracking-tight text-text dark:text-dark-text ${
                    post.featured ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  {post.title}
                </h2>

                <p className="relative z-10 mt-2 flex-1 text-[14px] leading-6 text-text-secondary dark:text-dark-text-secondary">
                  {post.excerpt}
                </p>

                <div className="relative z-10 mt-5 flex items-center justify-between text-[12px] text-text-muted dark:text-dark-text-muted">
                  <span>
                    {post.date} · {post.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-text-secondary dark:text-dark-text-secondary group-hover:text-text dark:group-hover:text-dark-text transition-colors duration-200">
                    Read
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </main>
    </AuroraBackground>
  );
}
