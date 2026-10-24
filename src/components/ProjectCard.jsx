import { useState } from "react";

export default function ProjectCard({ project }) {
  const [broken, setBroken] = useState(false);
  const external = project.live.startsWith("http");
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white/60 transition hover:-translate-y-1 hover:shadow-lg">
      {broken ? (
        <div className="grid aspect-[8/5] place-items-center bg-line text-sm text-muted">Screenshot unavailable</div>
      ) : (
        <img src={project.image} alt={project.alt} loading="lazy" width="960" height="600" onError={() => setBroken(true)} className="aspect-[8/5] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold">{project.title}</h3>
        <p className="mt-3 flex-1 text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium">{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex gap-5 text-sm font-semibold">
          <a href={project.live} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-accent-dark underline underline-offset-4">Live demo<span className="sr-only"> of {project.title}</span></a>
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Source code<span className="sr-only"> of {project.title}</span></a>
        </div>
      </div>
    </article>
  );
}
