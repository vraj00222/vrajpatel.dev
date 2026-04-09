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
          <span className="font-semibold text-dark-text tabular-nums">
            #{count.toLocaleString()}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-dark-border">
      <div className="mx-auto max-w-2xl flex items-center justify-between text-[12px] text-dark-text-muted">
        <span>&copy; {new Date().getFullYear()} Vraj Patel</span>
        <VisitorCounter />
      </div>
    </footer>
  );
}
