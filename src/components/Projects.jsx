import Section from "./Section.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Work" title="Course projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
