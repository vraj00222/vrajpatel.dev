export const PERSONAL = {
  name: "Vraj Patel",
  bio: "Software engineer and CS grad student at Cal State Fullerton. I build full-stack systems, publish ML research, and teach algorithms. Currently looking for full-time roles starting May 2026.",
  location: "Fullerton, CA",
  email: "vrajpatel00222@gmail.com",
  github: "https://github.com/vraj00222",
  githubUsername: "vraj00222",
  linkedin: "https://www.linkedin.com/in/vraj-patel-60275319b/",
  x: "https://x.com/vraj_sol",
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
    period: "Aug 2025 — Present",
    location: "Fullerton, CA",
    tech: ["Python", "Git", "Gradescope"],
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
    name: "GitConnect",
    description: "AI-powered platform that matches dev mentors with students by analyzing GitHub activity. Won $1,000 at HackDartmouth.",
    tech: ["React", "GitHub API", "Gemini AI", "Tailwind"],
    github: "https://github.com/vraj00222",
    live: "https://git-connect.co",
    award: "$1k Prize — HackDartmouth X",
  },
  {
    name: "GreenLane",
    description: "Chrome extension for sustainability-scored shopping. On-device AI via Meta ExecuTorch, zero data transmission.",
    tech: ["TypeScript", "React", "Chrome API", "ExecuTorch"],
    github: "https://github.com/vraj00222",
    award: "SFHACKS 2026",
  },
  {
    name: "Windowbundler",
    description: "macOS app that groups windows into workspaces with global hotkey switching. Built with Electron + Swift accessibility APIs.",
    tech: ["TypeScript", "Electron", "Swift", "React"],
    github: "https://github.com/vraj00222",
  },
  {
    name: "TUI",
    description: "npm library of terminal UI primitives for AI coding agents. Spinners, prompts, tables. 54 peak weekly downloads.",
    tech: ["TypeScript", "Node.js", "npm"],
    github: "https://github.com/vraj00222",
  },
] as const;

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

export const SKILLS = [
  "Python", "TypeScript", "JavaScript", "C++", "SQL",
  "React", "Next.js", "Node.js", "Django", "Tailwind CSS",
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Git",
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "Reading", href: "#reading" },
  { label: "Contact", href: "#contact" },
] as const;
