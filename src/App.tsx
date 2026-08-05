import type { ReactNode } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
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
import { BlogIndex } from "./components/BlogIndex";
import { DrmArticle } from "./components/blog/DrmArticle";
import { GitWorktreeArticle } from "./components/blog/GitWorktreeArticle";
import { PocketLlmArticle } from "./components/blog/PocketLlmArticle";

function Divider() {
  return <div className="section-divider mx-6" />;
}

const BLOG_ARTICLES: Record<string, () => ReactNode> = {
  "/blog/drm": DrmArticle,
  "/blog/git-worktrees": GitWorktreeArticle,
  "/blog/llm-on-a-usb-stick": PocketLlmArticle,
};

export default function App() {
  if (typeof window !== "undefined") {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const Article = BLOG_ARTICLES[path];
    if (Article) return <Article />;
    // The blog index handles /blog and any unknown /blog/* slug.
    if (path === "/blog" || path.startsWith("/blog/")) return <BlogIndex />;
  }

  return (
    <div className="min-h-screen">
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <GitHubActivity />
        <Divider />
        <Projects />
        <Divider />
        <Labs />
        <Divider />
        <Research />
        <Divider />
        <Hackathons />
        <Divider />
        <Reading />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
