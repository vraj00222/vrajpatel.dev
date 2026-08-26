import { Suspense, lazy, useState, type ComponentType } from "react";
import { Navbar } from "./components/Navbar";
import { AgentView } from "./components/AgentView";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Labs } from "./components/Labs";
import { Research } from "./components/Research";
import { Hackathons } from "./components/Hackathons";
import { GitHubActivity } from "./components/GitHubActivity";
import { Reading } from "./components/Reading";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { TetrisEasterEgg } from "./components/TetrisEasterEgg";

function Divider() {
  return <div className="section-divider mx-6" />;
}

// The blog is a separate destination from the portfolio: nobody landing on /
// needs three long-form articles in their bundle, and nobody reading an
// article needs the other two. Each is its own chunk, fetched on the route
// that actually renders it.
const BlogIndex = lazy(() =>
  import("./components/BlogIndex").then((m) => ({ default: m.BlogIndex }))
);

const BLOG_ARTICLES: Record<string, ComponentType> = {
  "/blog/drm": lazy(() =>
    import("./components/blog/DrmArticle").then((m) => ({ default: m.DrmArticle }))
  ),
  "/blog/git-worktrees": lazy(() =>
    import("./components/blog/GitWorktreeArticle").then((m) => ({
      default: m.GitWorktreeArticle,
    }))
  ),
  "/blog/llm-on-a-usb-stick": lazy(() =>
    import("./components/blog/PocketLlmArticle").then((m) => ({
      default: m.PocketLlmArticle,
    }))
  ),
};

// Blank rather than a spinner — the chunk lands in a few frames on any real
// connection, and a flashed spinner reads worse than a beat of the page bg.
const BlogFallback = <div className="min-h-screen bg-bg dark:bg-dark-bg" />;

export default function App() {
  const [agentMode, setAgentMode] = useState(false);

  if (typeof window !== "undefined") {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const Article = BLOG_ARTICLES[path];
    if (Article) {
      return <Suspense fallback={BlogFallback}><Article /></Suspense>;
    }
    // The blog index handles /blog and any unknown /blog/* slug.
    if (path === "/blog" || path.startsWith("/blog/")) {
      return <Suspense fallback={BlogFallback}><BlogIndex /></Suspense>;
    }
  }

  if (agentMode) return <AgentView onBack={() => setAgentMode(false)} />;

  return (
    <div className="min-h-screen">
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Navbar onAgentMode={() => setAgentMode(true)} />
      <main>
        <Hero />
        <Stats />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Research />
        <Divider />
        <GitHubActivity />
        <Divider />
        <Projects />
        <Divider />
        <Labs />
        <Divider />
        <Hackathons />
        <Divider />
        <Reading />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <TetrisEasterEgg />
    </div>
  );
}
