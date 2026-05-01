import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon } from "lucide-react";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Conic gradient with alternating soft-warm bands creates a ray fan emanating
// from a point above the page (50%, -10%). The radial mask fades the rays out
// vertically so they look like they're falling from a source above.
const RAY_STOPS = `
  transparent 0deg,
  rgba(255, 230, 170, ALPHA) 3deg,
  transparent 7deg,
  transparent 16deg,
  rgba(255, 230, 170, ALPHA) 19deg,
  transparent 23deg,
  transparent 33deg,
  rgba(255, 230, 170, ALPHA) 37deg,
  transparent 41deg,
  transparent 50deg,
  rgba(255, 230, 170, ALPHA) 53deg,
  transparent 57deg,
  transparent 67deg,
  rgba(255, 230, 170, ALPHA) 70deg,
  transparent 74deg,
  transparent 84deg,
  rgba(255, 230, 170, ALPHA) 87deg,
  transparent 91deg,
  transparent 101deg,
  rgba(255, 230, 170, ALPHA) 104deg,
  transparent 108deg,
  transparent 117deg,
  rgba(255, 230, 170, ALPHA) 120deg,
  transparent 124deg
`;
const MASK = "radial-gradient(ellipse 90% 80% at 50% -10%, black 25%, transparent 80%)";
function rays(alpha: number) {
  return `conic-gradient(from 118deg at 50% -10%, ${RAY_STOPS.replace(/ALPHA/g, String(alpha))})`;
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
    <div className="relative min-h-screen overflow-hidden bg-bg dark:bg-dark-bg flex flex-col">
      {/* Background layers — pointer-events-none so they never block clicks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Soft haze base — gray on white / white on black */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background: `
              radial-gradient(60% 55% at 18% 28%, rgba(0,0,0,0.05), transparent 70%),
              radial-gradient(55% 45% at 82% 72%, rgba(0,0,0,0.04), transparent 70%),
              radial-gradient(75% 60% at 50% 60%, rgba(0,0,0,0.03), transparent 75%)
            `,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: `
              radial-gradient(60% 55% at 18% 28%, rgba(255,255,255,0.06), transparent 70%),
              radial-gradient(55% 45% at 82% 72%, rgba(255,255,255,0.05), transparent 70%),
              radial-gradient(75% 60% at 50% 60%, rgba(255,255,255,0.04), transparent 75%)
            `,
            filter: "blur(40px)",
          }}
        />

        {/* Sun rays from above — same warm tone in both themes, denser in dark */}
        <motion.div
          className="absolute inset-0 dark:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: rays(0.16),
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        />
        <motion.div
          className="absolute inset-0 hidden dark:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: rays(0.11),
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        />

        {/* Warm sun glow at the source — subtle in light, brighter in dark */}
        <div
          className="absolute inset-x-0 top-0 h-[40vh] dark:hidden"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(255,220,140,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[40vh] hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(255,220,140,0.12), transparent 70%)",
          }}
        />
      </div>

      <header className="relative z-10 mx-auto max-w-2xl w-full flex-none flex items-center justify-between px-6 h-12">
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

      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
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
