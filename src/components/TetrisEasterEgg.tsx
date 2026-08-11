import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X } from "lucide-react";

export function TetrisEasterEgg() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play a Tetris easter egg"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-surface dark:bg-dark-surface border border-border dark:border-dark-border text-text dark:text-dark-text animate-glow-cycle hover:scale-110 transition-transform duration-200"
      >
        <Gamepad2 size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold text-text dark:text-dark-text">
                    Tetris, hand-written in WebAssembly
                  </p>
                  <p className="mt-1 text-[12.5px] text-text-muted dark:text-dark-text-muted leading-relaxed">
                    Vibe-coded on a Sunday — no C or Rust compiler, the whole
                    game loop is raw WAT. 2.3KB binary, sub-5ms frames, zero
                    garbage collection, and the entire thing loads in a
                    single HTTP request.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 rounded-md p-1 text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              <iframe
                src="/games/tetris/index.html"
                title="Tetris (WebAssembly)"
                className="w-full rounded-lg border border-border dark:border-dark-border"
                style={{ height: "70vh" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
