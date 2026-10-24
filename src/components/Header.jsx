import { useState } from "react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header({ name }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="/#home" className="font-display text-xl font-bold">{name}<span className="text-accent">.</span></a>
        <button
          className="rounded border border-line px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <ul id="menu" className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-line bg-paper p-5 md:static md:flex md:w-auto md:flex-row md:gap-7 md:border-0 md:bg-transparent md:p-0`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted transition hover:text-accent md:py-0">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
