import { useState } from "react";
import { User, Copy, Check } from "lucide-react";
import { buildAgentMarkdown } from "../data/agentMarkdown";

const MARKDOWN = buildAgentMarkdown();

export function AgentView({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-md text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-all duration-200"
            aria-label="Back to site"
            title="Back to site"
          >
            <User size={15} />
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy markdown"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface px-5 py-5 text-[13px] leading-6 text-text dark:text-dark-text whitespace-pre-wrap font-mono">
          {MARKDOWN}
        </pre>
      </div>
    </div>
  );
}
