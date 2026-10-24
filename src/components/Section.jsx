export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl border-t border-line px-5 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mb-12 mt-2 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
      {children}
    </section>
  );
}
