export const PERSONAL = {
  name: "Vraj Patel",
  bio: "Software engineer and CS grad student at Cal State Fullerton. I build full-stack systems, publish ML research, and teach algorithms. Currently looking for full-time roles starting May 2026.",
  location: "San Francisco, CA",
  email: "vrajpatel00222@gmail.com",
  github: "https://github.com/vraj00222",
  githubUsername: "vraj00222",
  linkedin: "https://www.linkedin.com/in/vraj-patel-60275319b/",
  x: "https://x.com/vrjpatel_",
  devpost: "https://devpost.com/vrajpatel00222",
  shipyard: "https://shipyardhq.tech/profile/8fcf2965-ecce-401f-ae40-256f07a85be9",
  ieeeLink: "https://ieeexplore.ieee.org/document/10444327",
} as const;

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  tech: string[];
  bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Teaching Associate",
    company: "Cal State Fullerton",
    period: "Aug 2025 — Jun 2026",
    location: "Fullerton, CA",
    tech: ["Python", "C++", "Git", "Gradescope"],
    bullets: [
      "Teaching CPSC 335 — Algorithm Engineering to 100+ undergraduate students, covering greedy algorithms, dynamic programming, graph traversal, and NP-completeness",
      "Built automated grading scripts with Python and Gradescope API to batch-evaluate student submissions and provide structured feedback",
      "Designing homework sets and exam problems that reinforce algorithmic thinking and proof techniques",
      "Holding weekly office hours and review sessions to help students debug code and understand time complexity analysis",
    ],
  },
  {
    title: "Research Assistant",
    company: "Yuan-Ze University, Taiwan",
    period: "Jul 2023 — Feb 2024",
    location: "Taoyuan, Taiwan",
    tech: ["Python", "TensorFlow", "PyTorch", "Jupyter"],
    bullets: [
      "Designed and trained LSTM-Autoencoder models for ECG anomaly detection using the MIT-BIH Arrhythmia dataset with TensorFlow and Keras",
      "Preprocessed 100k+ heartbeat signals — filtering noise, normalizing waveforms, and segmenting R-R intervals for sequence modeling",
      "Co-authored IEEE paper presented at ICCE 2024 in Las Vegas, detailing the architecture and evaluation metrics",
      "Experimented with VAE and Transformer-based baselines, benchmarking F1 scores and reconstruction error thresholds across model variants",
    ],
  },
  {
    title: "Software Developer",
    company: "Lucent Innovation",
    period: "Feb 2023 — Jul 2023",
    location: "Ahmedabad, India",
    tech: ["Django", "PostgreSQL", "Docker", "Git", "GitHub Actions", "Postman", "JWT"],
    bullets: [
      "Built and maintained REST APIs for an internal project management platform using Django REST Framework with JWT-based authentication",
      "Designed PostgreSQL schemas for multi-tenant data isolation, wrote migrations, and optimized query plans with indexes and CTEs",
      "Set up CI/CD pipelines with GitHub Actions — automated linting, test suites, and Docker image builds on every push to main",
      "Integrated third-party APIs (Stripe, SendGrid) and wrote Postman test collections to validate endpoint contracts across environments",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "RKIT Software",
    period: "May 2022 — Jul 2022",
    location: "Rajkot, India",
    tech: ["C#", "ASP.NET", "SQL Server", "JavaScript", "Git"],
    bullets: [
      "Built enterprise CRUD modules for an internal ERP system using ASP.NET Core MVC with Entity Framework and SQL Server",
      "Wrote and optimized T-SQL stored procedures for reporting dashboards, improving query performance on large datasets",
      "Implemented client-side form validation and dynamic UI components with vanilla JavaScript and jQuery",
      "Participated in daily standups and code reviews, learning Git workflows, branching strategies, and pull request etiquette",
    ],
  },
];

export const PROJECTS = [
  {
    name: "MediHunt",
    description: "An agentic drug-discovery pipeline: name a disease and it finds the protein target, ranks it, folds the complex with Boltz-2 across replicate seeds, and only proposes a druggable site when the ensemble actually converges — otherwise it abstains and says so. Every refusal is written to disk as an accountability record, and a biosecurity gate screens each run before anything else executes.",
    tech: ["Python", "Paperclip", "Boltz-2", "Modal", "BenchFlow", "Claude Code"],
    github: "https://github.com/roknabadi/reAGENT-2026",
    hackathon: "re:AGENT 2026",
  },
  {
    name: "Hopper",
    description: "Every scanner tells you a package is vulnerable. Hopper walks the five hops from that package, through the dependencies nobody chose to install, to the customer contract it breaches and the hour you owe them notice by. Most advisories return no path at all — and that proof of absence is the product.",
    tech: ["TypeScript", "FalkorDB", "Claude API", "React", "Express"],
    github: "https://github.com/vraj00222/hopper",
    hackathon: "Memory Meets Motion 2026",
  },
  {
    name: "Claudware",
    description: "Describe any object in plain language and Claude designs it, makes it printable, shows it forming live in a 3D viewport you can orbit, inspects its own render to fix mistakes, then exports a print-ready file. An AI 3D-printing studio with five CAD engines behind one brain.",
    tech: ["TypeScript", "React", "Three.js", "Claude Code"],
    github: "https://github.com/vraj00222/Claudware",
    live: "https://claudewaresite.vercel.app/",
    hackathon: "CAL AI Hackathon 2026",
  },
  {
    name: "Yellow",
    description: "Version control for a running backend. When your app crashes in prod, Yellow freezes the exact database state in that millisecond, diffs it against healthy to name the root cause, then a Replicas AI agent opens a fix PR you approve from Telegram.",
    tech: ["TypeScript", "React", "InsForge", "OpenAI", "MCP"],
    github: "https://github.com/vraj00222/yellow-",
    live: "https://www.youtube.com/shorts/u8KBF_esBb4",
    hackathon: "Entrepreneur First Hackathon",
  },
  {
    name: "agent-farm",
    description: "A local dev tool that parallelizes Claude Code. Hand it a list of tasks and it spawns a Git worktree per task, runs an autonomous agent inside each, then surfaces the diffs for you to review and cherry-pick into main — zero conflicts, full parallelism.",
    tech: ["TypeScript", "Claude Code", "Git", "Node.js"],
    github: "https://github.com/vraj00222/agent-farm",
    live: "https://agent-farm-website.vercel.app/",
  },
  {
    name: "IntelMaxxing",
    description: "Palantir Gotham for careers. Five AI agents scrape HN hiring threads, fresh funding, YC batches, and Reddit chatter to surface companies about to hire before the posting lands — narrated as ElevenLabs voice briefings.",
    tech: ["Next.js", "TypeScript", "Gemma 4", "ElevenLabs", "GitHub API"],
    github: "https://github.com/vraj00222/intelmaxx",
    live: "https://intelmaxxing.tech",
    award: "Best Solo Hack — Citrus Hack 2026",
  },
  {
    name: "PocketLLM",
    description: "Your AI lives on a USB stick. Plug in, chat with a local model, unplug — zero install, zero footprint, nothing left behind. Fully offline inference for the privacy-conscious and the air-gapped.",
    tech: ["TypeScript", "Ollama", "Node.js"],
    github: "https://github.com/vraj00222/pocketllm",
    live: "https://pocketllm-site.vercel.app/",
  },
  {
    name: "GitConnect",
    description: "AI-powered platform that matches dev mentors with students by analyzing GitHub activity. Won $1,000 at HackDartmouth.",
    tech: ["React", "GitHub API", "Gemini AI", "Tailwind"],
    github: "https://github.com/vraj00222",
    live: "https://git-connect.co",
    award: "$1k Prize — HackDartmouth X",
  },
  {
    name: "RapidMVP",
    description: "An in-browser AI app builder in the spirit of Bolt and Lovable. Describe a product in plain English and it scaffolds, edits, and live-previews a working full-stack MVP — no local setup required.",
    tech: ["TypeScript", "React", "Vercel AI SDK", "Tailwind CSS"],
    github: "https://github.com/vraj00222/RapidMVP",
  },
  {
    name: "GreenLane",
    description: "Chrome extension for sustainability-scored shopping. On-device AI via Meta ExecuTorch, zero data transmission.",
    tech: ["TypeScript", "React", "Chrome API", "ExecuTorch"],
    github: "https://github.com/vraj00222",
    hackathon: "SF Hacks 2026",
  },
  {
    name: "repomap",
    description: "Turns any repository into a structured map of files, symbols, and dependencies — a compact, navigable view of a codebase that's as useful for onboarding humans as it is for feeding context to LLMs.",
    tech: ["TypeScript", "Node.js"],
    github: "https://github.com/vraj00222/repomap",
  },
  {
    name: "tui",
    description: "A UI component library for terminal-based AI agents. Composable boxes, spinners, and streaming panes that make it easy to build rich, legible CLI interfaces for agentic tools.",
    tech: ["TypeScript", "Ink", "Node.js"],
    github: "https://github.com/vraj00222/tui",
    live: "https://tui-ruby.vercel.app",
  },
  {
    name: "windowbundler",
    description: "A macOS window manager that saves and restores your window layouts as named workspace bundles. One keystroke snaps your entire setup — editors, terminals, browsers — back into place.",
    tech: ["TypeScript", "Electron", "Node.js"],
    github: "https://github.com/vraj00222/windowbundler",
  },
  {
    name: "404 Museum",
    description: "A museum of 404 pages — a curated, interactive gallery collecting the most creative 'page not found' screens on the web, because even dead ends deserve good design.",
    tech: ["JavaScript", "React"],
    github: "https://github.com/vraj00222/404-museum",
    live: "https://404-museum-five.vercel.app/",
  },
  {
    name: "Crew",
    description: "An agent swarm you watch instead of read. Say one sentence and five voice-native agents split an inbox-clearing, calendar-booking task between themselves, narrating in five different accents — when one hits a decision only you can make, it phones you, asks out loud, and the crew carries on from your answer.",
    tech: ["JavaScript", "Swift", "VoiceOS", "MCP", "Python"],
    github: "https://github.com/vraj00222/crew",
    hackathon: "Hack with VoiceOS",
  },
  {
    name: "Amortize",
    description: "A local proxy that makes AI agents cheaper to run. Point any client at it with one env var — no code changes — and it strips context the model doesn't need, replays verified prior work instead of re-running the model, and proves the savings with a per-step cost ledger: measured −28% tokens on a cold run and −97% on a replayed skill, same output.",
    tech: ["Python", "Snowflake", "Anthropic API", "uv"],
    github: "https://github.com/vraj00222/Amort",
    hackathon: "Beta Fund Hackathon",
  },
] as const;

export interface Hackathon {
  name: string;
  image: string;
  alt: string;
  /** Won hackathons get the sunshine glow treatment. */
  won: boolean;
  result?: string;
  project?: string;
}

export const HACKATHONS: Hackathon[] = [
  {
    name: "HackDartmouth X",
    image: "/hackathons/hackdartmouth.png",
    alt: "HackDartmouth pine-tree logo",
    won: true,
    result: "$1,000 prize",
    project: "GitConnect",
  },
  {
    name: "Citrus Hack 2026",
    image: "/hackathons/citrus-hack.png",
    alt: "Citrus Hack 2026 orange badge",
    won: true,
    result: "Best Solo Hack",
    project: "IntelMaxxing",
  },
  {
    name: "re:AGENT 2026",
    image: "/hackathons/reagent.png",
    alt: "re:AGENT end-to-end agentic science hackathon poster",
    won: false,
    project: "MediHunt",
  },
  {
    name: "MongoDB.local Build Fest: The Persistent Context Sprint",
    image: "/hackathons/mongodb-buildfest.png",
    alt: "MongoDB.local Build Fest, The Persistent Context Sprint Hackathon logo",
    won: false,
    project: "SCAR",
  },
  {
    name: "Hack with VoiceOS",
    image: "/hackathons/voiceos.png",
    alt: "Hack with VoiceOS hackathon flyer, backed by Y Combinator",
    won: false,
    project: "Crew",
  },
  {
    name: "Beta Fund: Agent & Token Economy Hackathon",
    image: "/hackathons/beta-fund.png",
    alt: "Beta Fund Agent & Token Economy Hackathon poster, sponsored by Snowflake",
    won: false,
    project: "Amortize",
  },
  {
    name: "Memory Meets Motion 2026",
    image: "/hackathons/memory-meets-motion.png",
    alt: "Memory Meets Motion Hackathon poster",
    won: false,
    project: "Hopper",
  },
  {
    name: "CAL AI Hackathon 2026",
    image: "/hackathons/ai-hackathon.png",
    alt: "CAL AI Hackathon 2026 logo",
    won: false,
    project: "Claudware",
  },
  {
    name: "InsForge Hackathon",
    image: "/hackathons/insforge.png",
    alt: "InsForge Hackathon poster",
    won: false,
    project: "Yellow",
  },
  {
    name: "SF Hacks 2026",
    image: "/hackathons/sf-hacks.png",
    alt: "SF Hacks logo",
    won: false,
    project: "GreenLane",
  },
];

export const PUBLICATION = {
  title: "ECG Anomaly Detection with LSTM-Autoencoder for Heartbeat Analysis",
  authors: "I. Farady, V. Patel, C.-C. Kuo, C.-Y. Lin",
  venue: "IEEE ICCE 2024, Las Vegas",
  doi: "10.1109/ICCE59016.2024.10444327",
  link: "https://ieeexplore.ieee.org/document/10444327",
  bibtex: `@INPROCEEDINGS{10444327,
  author={Farady, Iván and Patel, Vraj and Kuo, Chung-Chian and Lin, Chun-Yi},
  booktitle={2024 IEEE International Conference on Consumer Electronics (ICCE)},
  title={ECG Anomaly Detection with LSTM-Autoencoder for Heartbeat Analysis},
  year={2024},
  doi={10.1109/ICCE59016.2024.10444327}}`,
} as const;

export const EDUCATION = [
  {
    degree: "M.S. Computer Science",
    school: "California State University, Fullerton",
    period: "2024 — 2026",
    gpa: "3.75",
  },
  {
    degree: "B.Tech. Information & Communication Technology",
    school: "Marwadi University, India",
    period: "2019 — 2023",
    gpa: "3.7",
  },
] as const;

/**
 * Grouped so the row reads as an inventory instead of a wall of chips.
 * "Graph & Streaming" is the hackathon stack — the sponsor systems Hopper
 * was built on, kept together because they only make sense as a set.
 */
export const SKILL_GROUPS = [
  {
    label: "Languages",
    items: [
      "TypeScript", "Python", "JavaScript", "SQL",
      "C++", "C#", "Swift", "WebAssembly",
    ],
  },
  {
    label: "AI & Agents",
    items: [
      "Claude API", "OpenAI", "Gemini AI", "Gemma 4", "Novita AI",
      "Ollama", "ElevenLabs", "ExecuTorch", "Vercel AI SDK", "VoiceOS",
      "MCP", "RAG", "Graph RAG", "Multi-Agent Systems", "Guild.ai",
    ],
  },
  {
    label: "ML & Research",
    items: ["PyTorch", "TensorFlow", "NumPy", "Jupyter"],
  },
  {
    label: "Graph & Streaming",
    items: ["FalkorDB", "Cypher", "LaserData", "Apache Iggy", "RocketRide"],
  },
  {
    label: "Frameworks & Runtime",
    items: [
      "Next.js", "React", "Node.js", "Express", "Django", "FastAPI",
      "ASP.NET", "Electron", "Ink", "Three.js", "Vite", "Tailwind CSS",
    ],
  },
  {
    label: "Data & Infra",
    items: [
      "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite",
      "Snowflake", "InsForge", "AWS", "Docker", "GitHub Actions", "Vercel",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "uv", "npm", "Postman", "Claude Code", "Cursor"],
  },
] as const;

// Deep-dive builds: papers and core ideas implemented from scratch, each
// living on its own page. Card images resolve in Labs.tsx by id.
export const LABS = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    description:
      "The Transformer paper rebuilt end to end — the full architecture in the paper's own colors, every equation explained step by step, a live attention playground, and a complete NumPy implementation you can download and run.",
    href: "https://transformer-three-ebon.vercel.app",
    tags: ["Transformer", "NumPy", "Interactive", "Paper implementation"],
    year: "2026",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "Labs", href: "#labs" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Reading", href: "#reading" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;
