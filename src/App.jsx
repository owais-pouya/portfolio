import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import TaskManager from "./components/TaskManager.jsx";
import { profile } from "./data/profile.js";

export default function App() {
  if (window.location.pathname === "/tasks") return <TaskManager />;
  return (
    <>
      <a href="#projects" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-30 focus:bg-white focus:p-3">Skip to projects</a>
      <Header name={profile.name} />
      <main>
        <Hero profile={profile} />
        <Projects />
        <Skills />
        <About profile={profile} />
        <Contact profile={profile} />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
      </footer>
    </>
  );
}
