export type BlogIcon = "shield" | "git" | "usb";

export interface BlogPostMeta {
  slug: string;
  title: string;
  category: string;
  icon: BlogIcon;
  excerpt: string;
  date: string;
  readingTime: string;
  /** Featured posts take the large tile in the bento grid. */
  featured?: boolean;
}

export const POSTS: BlogPostMeta[] = [
  {
    slug: "drm",
    title: "DRM Explained",
    category: "Security",
    icon: "shield",
    excerpt:
      "How streaming platforms keep premium content off your screen recorder — Clear Key vs. Widevine, Trusted Execution Environments, and why Chrome caps Netflix at 720p.",
    date: "Mar 2025",
    readingTime: "7 min read",
    featured: true,
  },
  {
    slug: "git-worktrees",
    title: "Git Worktrees Aren't Branches",
    category: "Git",
    icon: "git",
    excerpt:
      "You think you want a branch. What you actually want is a second working directory. A field guide to git worktrees — and how they let you run a farm of AI agents in parallel without a single merge conflict.",
    date: "Jun 2026",
    readingTime: "6 min read",
  },
  {
    slug: "llm-on-a-usb-stick",
    title: "Your LLM on a USB Stick",
    category: "Local AI",
    icon: "usb",
    excerpt:
      "Plug in, chat with a real model, unplug — and leave nothing behind. How quantization, portable runtimes, and a little plumbing put a private LLM in your pocket, no install required.",
    date: "May 2026",
    readingTime: "5 min read",
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
