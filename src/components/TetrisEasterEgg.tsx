import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X } from "lucide-react";

const CONTROLS = [
  ["← →", "Move"],
  ["↓", "Soft drop"],
  ["↑ / Z / X", "Rotate"],
  ["Space", "Hard drop"],
  ["R", "Restart"],
];

// The embedded page renders at a fixed size; everything else in the dialog
// (heading, controls, the blurb, padding) costs roughly this much height.
const GAME_W = 506;
const GAME_H = 606;
const CHROME_H = 230;
const MODAL_W = 720;

/** Scale the board down so the whole dialog fits on screen without scrolling. */
function useGameScale(open: boolean) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!open) return;
    const compute = () =>
      setScale(
        Math.min(
          1,
          (window.innerHeight * 0.9 - CHROME_H) / GAME_H,
          (Math.min(MODAL_W, window.innerWidth - 32) - 40) / GAME_W
        )
      );
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [open]);

  return scale;
}

export function TetrisEasterEgg() {
  const [open, setOpen] = useState(false);
  const scale = useGameScale(open);

  return (
    <div className="flex justify-center pb-12 px-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Play a Tetris easter egg"
        className="flex items-center gap-2 rounded-lg px-5 h-11 text-[13px] font-semibold text-[#2b2b2b] animate-rainbow-sweep hover:scale-105 transition-transform duration-200"
      >
        <Gamepad2 size={16} />
        Easter egg — click me!
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
              style={{ maxWidth: MODAL_W }}
              className="max-h-[90vh] w-full overflow-y-auto rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5"
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
                <div
                  className="overflow-hidden rounded-lg border border-border dark:border-dark-border"
                  style={{ width: GAME_W * scale, height: GAME_H * scale }}
                >
                  <iframe
                    src="/games/tetris/index.html"
                    title="Tetris (WebAssembly)"
                    width={GAME_W}
                    height={GAME_H}
                    style={{
                      border: 0,
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                    }}
                  />
                </div>
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
    </div>
  );
}
