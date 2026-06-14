import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Research } from "./components/Research";
import { GitHubActivity } from "./components/GitHubActivity";
import { Reading } from "./components/Reading";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BlogPage } from "./components/BlogPage";
function Divider() {
  return <div className="section-divider mx-6" />;
}

export default function App() {
  if (typeof window !== "undefined" && window.location.pathname === "/blog") {
    return <BlogPage />;
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
        <Research />
        <Divider />
        <Reading />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
