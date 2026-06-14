import { motion } from "framer-motion";
import { ChevronRight, GitBranch } from "lucide-react";
import { ArticleShell } from "./ArticleShell";
import { cardFade, smoothScrollTo } from "./article-utils";
import { Callout, Code, CodeBlock } from "./prose";

const sections = [
  { id: "the-itch", title: "The Branch-Switch Tax" },
  { id: "what-it-is", title: "What A Worktree Actually Is" },
  { id: "commands", title: "The Four Commands You Need" },
  { id: "not-a-branch", title: "Why It Isn't 'Just A Branch'" },
  { id: "agent-farm", title: "A Farm Of Parallel Agents" },
  { id: "gotchas", title: "Gotchas" },
  { id: "conclusion", title: "Conclusion" },
];

export function GitWorktreeArticle() {
  return (
    <ArticleShell
      category="Git"
      icon={<GitBranch size={12} />}
      title="Git Worktrees Aren't Branches"
      subtitle="You think you want a branch. What you actually want is a second working directory — and git has had one built in this whole time."
      date="Jun 2026"
      readingTime="6 min read"
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

      <motion.section {...cardFade} id="the-itch" className="mt-10 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          The Branch-Switch Tax
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          You&apos;re deep in a feature. Half-finished edits everywhere, the dev
          server warm, your head full of context. Then a hotfix lands on{" "}
          <Code>main</Code> and you need to look at it <em>right now</em>. So you
          do the dance: <Code>git stash</Code>, <Code>git checkout main</Code>,
          wait for the toolchain to re-install and re-build because half the
          files just changed under it, poke at the bug, then{" "}
          <Code>git checkout feature</Code>, <Code>git stash pop</Code>, and
          spend five minutes rebuilding the mental model you just threw away.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          That whole ritual exists for one reason: a normal git clone has{" "}
          <strong>exactly one working directory</strong>. One set of files on
          disk that can only ever reflect one commit at a time. Branches are
          cheap, but <em>switching</em> between them is not — it churns your
          files, your build cache, and your attention.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="what-it-is" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          What A Worktree Actually Is
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          A worktree is a second (or third, or tenth) working directory attached
          to the <em>same</em> repository. One <Code>.git</Code> object store —
          all your commits, branches, and history — but multiple folders on disk,
          each checked out to a different branch or commit, all at once.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Think of the repository as a library and a worktree as a reading desk.
          You can pull the same books to several desks and read different
          chapters side by side. You are not copying the library each time — the
          objects are shared. Each desk just has its own open page.
        </p>
        <Callout>
          A clone gives you a repo with one working tree. <Code>git worktree</Code>{" "}
          lets that one repo project itself onto many directories
          simultaneously — no second clone, no duplicated history, no extra
          gigabytes.
        </Callout>
      </motion.section>

      <motion.section {...cardFade} id="commands" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          The Four Commands You Need
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          The entire surface area is small. Create a worktree for a new branch in
          a sibling folder:
        </p>
        <CodeBlock>{`# new branch "feature-x" checked out in ../feature-x
git worktree add -b feature-x ../feature-x

# or check out an existing branch into its own folder
git worktree add ../hotfix main`}</CodeBlock>
        <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          See what you have, then clean up when you&apos;re done:
        </p>
        <CodeBlock>{`git worktree list          # every directory + the commit it's on
git worktree remove ../hotfix
git worktree prune         # forget folders you deleted by hand`}</CodeBlock>
        <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          That&apos;s it. The hotfix scenario from the top becomes: open a new
          worktree, fix the bug, push, remove the worktree. Your feature
          directory was never touched — dev server still warm, edits still there,
          build cache intact.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="not-a-branch" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Why It Isn&apos;t &apos;Just A Branch&apos;
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          This is the part people trip on. A <strong>branch</strong> is just a
          movable pointer — a 40-byte ref that names a commit. A{" "}
          <strong>worktree</strong> is a physical checkout: real files on disk,
          its own <Code>HEAD</Code>, its own index, its own uncommitted changes.
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          <li>
            Branches answer <em>&quot;which commit is this line of work
            pointing at?&quot;</em> Worktrees answer{" "}
            <em>&quot;which files are materialized on disk, right now,
            here?&quot;</em>
          </li>
          <li>
            You can have a hundred branches and one working directory. Worktrees
            flip that — many directories, each anchored to a branch.
          </li>
          <li>
            The key rule that proves they&apos;re different: git won&apos;t let
            the <em>same</em> branch be checked out in two worktrees at once.
            The branch is a single pointer; two desks can&apos;t both be moving
            the same bookmark.
          </li>
        </ul>
        <Callout>
          Branches are bookkeeping. Worktrees are real estate. Conflating them is
          why &quot;I&apos;ll just make a branch&quot; never actually solves the
          context-switch problem.
        </Callout>
      </motion.section>

      <motion.section {...cardFade} id="agent-farm" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          A Farm Of Parallel Agents
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Worktrees stopped being a niche trick the moment I started running
          coding agents. If you point a single agent at a repo, it owns the
          working directory — a second agent editing the same files at the same
          time is a guaranteed collision.
        </p>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          So I built{" "}
          <a
            href="https://github.com/vraj00222/agent-farm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-text dark:hover:text-dark-text"
          >
            agent-farm
          </a>{" "}
          around exactly this idea. Hand it a list of tasks; it spins up one
          worktree per task and runs an autonomous agent inside each, in
          isolation:
        </p>
        <CodeBlock>{`for task in tasks:
    git worktree add -b "agent/$task" "../farm/$task"
    run_agent(cwd="../farm/$task", prompt=task)   # in parallel

# later: review each diff, cherry-pick the good ones into main`}</CodeBlock>
        <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Every agent gets its own files, its own branch, and its own freedom to
          rewrite whatever it wants. Nothing steps on anything else. When the
          dust settles you&apos;re left with a stack of independent diffs to
          review and merge at your own pace — full parallelism, zero conflicts,
          one shared object store underneath.
        </p>
      </motion.section>

      <motion.section {...cardFade} id="gotchas" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Gotchas
        </h2>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          <li>
            <strong>Same branch, twice — no.</strong> Git refuses to check out a
            branch that&apos;s already live in another worktree. Use a new branch
            or a detached commit instead.
          </li>
          <li>
            <strong>Untracked files don&apos;t come along.</strong> Worktrees
            share history, not your <Code>.env</Code>, <Code>node_modules</Code>,
            or build artifacts. Each directory installs and builds on its own.
          </li>
          <li>
            <strong>Don&apos;t just <Code>rm -rf</Code> the folder.</strong>{" "}
            Remove it with <Code>git worktree remove</Code> (or run{" "}
            <Code>prune</Code> afterward) so git&apos;s bookkeeping stays honest.
          </li>
          <li>
            <strong>Put them outside the repo.</strong> Nesting a worktree inside
            your main checkout confuses tooling. Siblings like{" "}
            <Code>../feature-x</Code> keep things tidy.
          </li>
        </ul>
      </motion.section>

      <motion.section {...cardFade} id="conclusion" className="mt-8 scroll-mt-20">
        <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
          Conclusion
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
          Next time you catch yourself reaching for <Code>git stash</Code> to go
          look at something else, stop — that&apos;s the worktree-shaped hole in
          your workflow talking. A branch tells git which commit a line of work
          points at. A worktree gives that work a desk of its own to live on.
          Once you internalize the difference, parallel work — whether it&apos;s
          you juggling two features or a farm of agents juggling ten — stops
          being a stash-and-pray dance and starts being just another set of
          folders.
        </p>
      </motion.section>
    </ArticleShell>
  );
}
