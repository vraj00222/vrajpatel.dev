import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";

const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore — private mode, etc. */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg/70 dark:bg-dark-bg/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border dark:border-dark-border">
      <nav className="mx-auto max-w-2xl flex items-center justify-between px-6 h-12">
        <a
          href="#hero"
          className="font-display text-sm font-semibold text-text dark:text-dark-text tracking-tight"
        >
          vraj.
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[13px] transition-colors duration-200 ${
                  active === link.href.replace("#", "")
                    ? "text-text dark:text-dark-text font-medium"
                    : "text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
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
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-border dark:border-dark-border bg-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl px-6 py-3 space-y-1 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="list-none">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[14px] text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
