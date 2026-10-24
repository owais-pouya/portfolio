export default function Hero({ profile }) {
  return (
    <section id="home" className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-16 md:grid-cols-12 md:pt-28">
      <div className="rise md:col-span-9">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{profile.role}</p>
        <h1 className="font-display text-5xl font-bold leading-[1.02] sm:text-7xl md:text-8xl">
          Hi, I'm {profile.name}.<br />
          <span className="italic text-accent">I build for the web.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">{profile.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="rounded-full bg-ink px-7 py-3 font-medium text-paper transition hover:bg-accent">Explore projects</a>
          <a href="#contact" className="rounded-full border border-ink px-7 py-3 font-medium transition hover:border-accent hover:text-accent">Contact me</a>
        </div>
      </div>
      <div aria-hidden="true" className="hidden items-end justify-end md:col-span-3 md:flex">
        <div className="h-48 w-48 rounded-full bg-accent/90" />
        <div className="-ml-16 mb-10 h-28 w-28 rounded-full border-2 border-ink" />
      </div>
    </section>
  );
}
