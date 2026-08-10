"use client";
import { useState } from "react";
import { useLenisRef } from "@/lib/lenis";

const LINKS = [
  { label: "STORY", href: "#chapter-02" },
  { label: "RESEARCH", href: "#chapter-13" },
  { label: "COMMUNITY", href: "#chapter-17" },
  { label: "ABOUT", href: "#chapter-11" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const lenisRef = useLenisRef();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href) as HTMLElement | null;
    if (target && lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(target);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[70] mix-blend-difference">
      <a href="#chapter-01" onClick={(e) => handleScroll(e, "#chapter-01")} className="block p-4 text-micro text-white font-text" data-cursor-label="TOP">AUREVIA</a>
      <div className="hidden sm:flex gap-6 absolute top-4 right-6 text-micro text-white font-text">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => handleScroll(e, l.href)} className="hover:text-red transition-colors" data-cursor-label={l.label}>{l.label}</a>
        ))}
      </div>
      <button className="sm:hidden absolute top-4 right-4 text-micro text-white" onClick={() => setOpen(!open)}>MENU</button>
      {open && (
        <div className="sm:hidden fixed inset-0 bg-ink/95 flex flex-col items-center justify-center gap-8 text-display">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { setOpen(false); handleScroll(e, l.href); }} className="font-display text-white">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
