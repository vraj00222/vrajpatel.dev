import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon } from "lucide-react";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function BlogPage() {
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
    <div className="relative min-h-screen overflow-hidden bg-bg dark:bg-dark-bg">
      {/* Haze layers — gray clouds on white in light, white clouds on black in dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 dark:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            background: `
              radial-gradient(60% 55% at 18% 28%, rgba(0,0,0,0.06), transparent 70%),
              radial-gradient(55% 45% at 82% 72%, rgba(0,0,0,0.05), transparent 70%),
              radial-gradient(75% 60% at 50% 50%, rgba(0,0,0,0.035), transparent 75%)
            `,
            filter: "blur(40px)",
          }}
        />
        <motion.div
          className="absolute inset-0 hidden dark:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            background: `
              radial-gradient(60% 55% at 18% 28%, rgba(255,255,255,0.08), transparent 70%),
              radial-gradient(55% 45% at 82% 72%, rgba(255,255,255,0.06), transparent 70%),
              radial-gradient(75% 60% at 50% 50%, rgba(255,255,255,0.045), transparent 75%)
            `,
            filter: "blur(40px)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto max-w-2xl flex items-center justify-between px-6 h-12">
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
            Back
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

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-3rem)] px-6 -mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="font-display font-bold tracking-tight text-text dark:text-dark-text text-center text-5xl sm:text-7xl md:text-8xl"
        >
          Coming Soon
        </motion.h1>
      </main>
    </div>
  );
}
