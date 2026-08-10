"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Ctx = { lenis: Lenis | null };
const LenisCtx = ({ current: { lenis: null } } as { current: Ctx });
export function useLenisRef() {
  return LenisCtx;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: !prefersReduced && !isCoarse,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });
    LenisCtx.current.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      LenisCtx.current.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
