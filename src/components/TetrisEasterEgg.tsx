import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X } from "lucide-react";

const CONTROLS = [
  ["← →", "Move"],
  ["↓", "Soft drop"],
  ["↑ / Z / X", "Rotate"],
  ["Space", "Hard drop"],
  ["R", "Restart"],
];

export function TetrisEasterEgg() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play a Tetris easter egg"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-lg px-4 h-12 text-white font-semibold [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] animate-rainbow-bonkers hover:scale-105 transition-transform duration-200"
      >
        <Gamepad2 size={18} />
        Easter egg
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
              className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <p className="text-[15px] font-semibold text-text dark:text-dark-text">
                  Tetris, hand-written in WebAssembly
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 rounded-md p-1 text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {CONTROLS.map(([key, action]) => (
                  <span
                    key={key}
                    className="text-[12px] text-text-muted dark:text-dark-text-muted"
                  >
                    <kbd className="rounded border border-border dark:border-dark-border bg-hover-bg dark:bg-dark-hover-bg px-1.5 py-0.5 text-[11px] font-mono text-text dark:text-dark-text">
                      {key}
                    </kbd>{" "}
                    {action}
                  </span>
                ))}
              </div>

              <div className="flex justify-center">
                <iframe
                  src="/games/tetris/index.html"
                  title="Tetris (WebAssembly)"
                  width={506}
                  height={606}
                  className="max-w-full rounded-lg border border-border dark:border-dark-border"
                />
              </div>

              <p className="mt-4 text-[12.5px] text-text-muted dark:text-dark-text-muted leading-relaxed">
                Vibe-coded on a Sunday — no C or Rust compiler, the whole
                game loop is raw WebAssembly Text Format, written by hand.
                Sub-5ms frames, zero garbage collection. The compiled game
                engine — grid, physics, scoring, all of it — is a 2.3KB
                WebAssembly binary, under 4KB, and the entire game just
                loaded in your browser in a single HTTP request.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
