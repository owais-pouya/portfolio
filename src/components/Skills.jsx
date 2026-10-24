import Section from "./Section.jsx";
import { skills } from "../data/skills.js";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Toolbox" title="What I've learned">
      <div className="grid gap-10 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="mb-4 border-b-2 border-ink pb-2 font-display text-2xl font-bold">{g.group}</h3>
            <ul className="space-y-2 text-muted">
              {g.items.map((s) => (
                <li key={s} className="flex gap-3"><span aria-hidden="true" className="text-accent">&#9679;</span>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
