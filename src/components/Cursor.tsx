"use client"
import { useEffect, useRef, useState } from "react";
import { useCoarsePointer } from "@/lib/useMedia";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [variant, setVariant] = useState<"idle" | "hover" | "label">("idle");
  const [label, setLabel] = useState("");
  const coarse = useCoarsePointer();

  useEffect(() => {
    if (coarse) return;
    const dot = dotRef.current;
    if (!dot) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let cx = x, cy = y;
    let raf = 0;
    const pos = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", pos);
    raf = requestAnimationFrame(loop);

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[role='link'],[role='button'],[data-cursor]");
      if (interactive) {
        const l = interactive.getAttribute("data-cursor-label");
        if (l) { setVariant("label"); setLabel(l); } else { setVariant("hover"); setLabel(""); }
      } else { setVariant("idle"); setLabel(""); }
    };
    window.addEventListener("mouseover", over, { capture: true });

    return () => {
      window.removeEventListener("mousemove", pos);
      window.removeEventListener("mouseover", over, { capture: true } as EventListenerOptions);
      cancelAnimationFrame(raf);
    };
  }, [coarse]);

  if (coarse) return null;
  return (
    <div className="cursor" data-variant={variant} ref={dotRef}>
      {variant === "label" && <span className="text-[0.625rem] tracking-widest2 font-text text-ink flex items-center justify-center w-full h-full">{label}</span>}
    </div>
  );
}
