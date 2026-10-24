import Section from "./Section.jsx";

export default function About({ profile }) {
  return (
    <Section id="about" eyebrow="Story" title="About me">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="space-y-5 text-lg md:col-span-3">
          {profile.bio.map((p) => <p key={p}>{p}</p>)}
        </div>
        <aside className="rounded-2xl border border-line bg-white/60 p-6 md:col-span-2">
          <h3 className="font-display text-2xl font-bold">Goals</h3>
          <p className="mt-3 text-muted">{profile.goals}</p>
        </aside>
      </div>
    </Section>
  );
}
