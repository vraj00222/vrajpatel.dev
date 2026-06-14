import { motion } from "framer-motion";
import { ChevronRight, Usb } from "lucide-react";
import { ArticleShell } from "./ArticleShell";
import { cardFade, smoothScrollTo } from "./article-utils";
import { Callout, Code, CodeBlock } from "./prose";

const sections = [
  { id: "why-local", title: "Why Run A Model Locally" },
  { id: "portability", title: "The Portability Problem" },
  { id: "quantization", title: "How It Fits On A Stick" },
  { id: "the-build", title: "Plugging It Together" },
  { id: "tradeoffs", title: "The Honest Tradeoffs" },
  { id: "conclusion", title: "Conclusion" },
];

export function PocketLlmArticle() {
  return (
    <ArticleShell
      category="Local AI"
      icon={<Usb size={12} />}
      title="Your LLM on a USB Stick"
      subtitle="Plug in, chat with a real model, unplug — and leave nothing behind. The plumbing behind PocketLLM, and why a private model in your pocket is more practical than it sounds."
      date="May 2026"
      readingTime="5 min read"
    >
      <motion.section
        {...cardFade}
        className="mt-8 rounded-xl border border-border dark:border-dark-border bg-bg/70 dark:bg-dark-bg/70 p-5"
      >
        <h2 className="font-display text-[13px] font-semibold uppercase tracking-widest text-text dark:text-dark-text">
          Table Of Contents
        </h2>
        <ul className="mt-3 space-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={smoothScrollTo(s.id)}
                className="inline-flex items-center gap-2 text-[14px] text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors duration-200"
              >
                <ChevronRight size={13} className="opacity-70" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section {...cardFade} id="why-local" className="mt-10 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Why Run A Model Locally
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Most of the time, calling a hosted API is the right move — it&apos;s
          the smartest model, instantly, with zero setup. But &quot;send my text
          to someone else&apos;s GPU&quot; isn&apos;t always acceptable. Sometimes
          the data is sensitive. Sometimes there&apos;s no network at all.
          Sometimes you just don&apos;t want a usage meter ticking on every
          keystroke.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Local models fix all three: the prompt never leaves the machine,
          inference works on a plane or in an air-gapped lab, and the marginal
          cost of a token is zero. The catch has always been that &quot;the
          machine&quot; meant <em>one specific machine</em> you&apos;d set up by
          hand.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="portability" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          The Portability Problem
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          A working local-LLM setup is usually a pile of state welded to your
          home directory: a runtime you installed, weights cached somewhere under{" "}
          <Code>~/.cache</Code>, environment variables, a service running in the
          background. Move to a different computer and you start over. Worse, you
          leave a trail — installed packages, multi-gigabyte model files — on
          every box you touch.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          The question behind{" "}
          <a
            href="https://github.com/vraj00222/pocketllm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-text dark:hover:text-dark-text"
          >
            PocketLLM
          </a>{" "}
          was simple: what if the model and its runtime lived entirely on a USB
          stick? Plug it into any machine, chat, pull it out — and the host is
          exactly as you found it. Zero install, zero footprint.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="quantization" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          How It Fits On A Stick
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          A raw model ships its weights in 16-bit floats. A 7-billion-parameter
          model at that precision is ~14&nbsp;GB and effectively needs a GPU. The
          trick that makes a pocket model viable is <strong>quantization</strong>{" "}
          — storing each weight in 4 or 5 bits instead of 16.
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          <li>
            A 4-bit quant of that same 7B model lands around 4&nbsp;GB — small
            enough for a cheap USB drive, with room to spare.
          </li>
          <li>
            The <Code>GGUF</Code> format packages those quantized weights into a
            single self-contained file that a CPU-only runtime can{" "}
            <Code>mmap</Code> straight off the stick.
          </li>
          <li>
            Quality drops a little at 4-bit, but for a 3B–7B assistant the
            difference is hard to feel in everyday use — and it&apos;s the
            difference between &quot;runs anywhere&quot; and &quot;needs a
            workstation.&quot;
          </li>
        </ul>
        <Callout>
          Quantization is the whole ballgame. It turns a model from a
          GPU-tethered, double-digit-gigabyte download into a single portable
          file that runs on the laptop you already have.
        </Callout>
      </motion.section>

      <motion.section {...cardFade} id="the-build" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Plugging It Together
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Everything lives on the drive and points at <em>itself</em> rather than
          the host. The layout is just three things — a runtime binary, a model
          file, and a launcher that wires them together:
        </p>
        <CodeBlock>{`POCKETLLM/
├─ bin/        # CPU inference runtime (per-OS)
├─ models/     # one quantized .gguf file
└─ run         # launcher

# the launcher keeps all state on the stick:
export OLLAMA_MODELS="$STICK/models"
"$STICK/bin/runtime" serve &
"$STICK/bin/runtime" run ./models/model.gguf`}</CodeBlock>
        <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          The one rule that makes it &quot;leave nothing behind&quot;: every path
          resolves relative to the stick, never to the home directory. The model
          cache, the config, the logs — all of it sits on the drive. Unplug it
          and there&apos;s nothing left on the host to clean up.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="tradeoffs" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          The Honest Tradeoffs
        </h2>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          <li>
            <strong>Speed.</strong> CPU inference off a stick is measured in a
            handful of tokens per second, not the instant walls of text you get
            from a hosted frontier model. Fine for a chat, slow for a firehose.
          </li>
          <li>
            <strong>USB bandwidth.</strong> A cheap USB 2.0 drive will bottleneck
            the initial load. USB 3 (or copying the model into RAM on launch)
            makes a real difference.
          </li>
          <li>
            <strong>Capability ceiling.</strong> A 4-bit 7B model is a capable
            generalist, not GPT-class. You&apos;re trading raw intelligence for
            privacy, portability, and a meter that never runs.
          </li>
        </ul>
      </motion.section>

      <motion.section {...cardFade} id="conclusion" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Conclusion
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          A private model you can carry on a keychain isn&apos;t a gimmick — it
          falls naturally out of two boring facts: quantization shrank models to
          a few gigabytes, and portable runtimes can keep all of their state next
          to the weights. Put those together and the model stops belonging to a
          machine and starts belonging to <em>you</em>. Plug in, chat, unplug. No
          install, no account, no trace.
        </p>
      </motion.section>
    </ArticleShell>
  );
}
