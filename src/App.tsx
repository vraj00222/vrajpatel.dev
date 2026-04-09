import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { GitHubActivity } from "./components/GitHubActivity";
import { Reading } from "./components/Reading";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
function Divider() {
  return <div className="section-divider mx-6" />;
}

export default function App() {
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
        <Reading />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
