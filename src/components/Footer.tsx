import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((r) => r.json())
      .then((data) => {
        if (data.count !== null) setCount(data.count);
      })
      .catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      {count !== null && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-1.5"
        >
          <Eye size={11} className="opacity-60" />
          You're visitor{" "}
          <span className="font-semibold text-text dark:text-dark-text tabular-nums">
            #{count.toLocaleString()}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border/60 dark:border-dark-border/50">
      {/* Village illustration — full bleed, soft fade to page bg */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <div className="relative overflow-hidden rounded-xl border border-border/50 dark:border-dark-border/40 bg-surface/50 dark:bg-dark-surface/30">
          <img
            src="/logos/vill.webp"
            alt="Watercolor village by the water — footer illustration"
            className="w-full h-auto max-h-[180px] object-cover object-center opacity-[0.96] dark:opacity-95"
            loading="lazy"
            decoding="async"
          />
          {/* subtle bottom fade so it meets the copyright bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-bg dark:from-dark-bg to-transparent" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-8 text-[12px] text-text-muted dark:text-dark-text-muted">
        <span>&copy; {new Date().getFullYear()} Vraj Patel</span>
        <VisitorCounter />
      </div>
    </footer>
  );
}
