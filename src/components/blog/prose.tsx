import type { ReactNode } from "react";

/** Monospace code block with horizontal scroll for long lines. */
export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-border dark:border-dark-border bg-bg/70 dark:bg-dark-bg/70 px-4 py-3.5 text-[13px] leading-6 text-text dark:text-dark-text">
      <code className="font-mono">{children}</code>
    </pre>
  );
}

/** Inline code token. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border dark:border-dark-border bg-hover-bg/70 dark:bg-dark-hover-bg/70 px-1.5 py-0.5 font-mono text-[13px] text-text dark:text-dark-text">
      {children}
    </code>
  );
}

/** Highlighted aside / takeaway box. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 rounded-lg border border-border dark:border-dark-border bg-hover-bg dark:bg-dark-hover-bg px-4 py-3 text-[14px] leading-7 text-text-secondary dark:text-dark-text-secondary">
      {children}
    </p>
  );
}
