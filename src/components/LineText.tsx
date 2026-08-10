"use client";
import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
  trigger?: boolean;
};

/** Staggered line-reveal. Each direct child (line) is wrapped in a mask + transl inner.
 * Reveals on `trigger` or on first intersection if `trigger` omitted.
 * Adapted from the reference site's animatedLines primitive. */
export function LineText({ children, className, delay = 0, fade = false, trigger }: Props) {
  const hostRef = useRef<HTMLSpanElement | null>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reveal = () => host.classList.add("line-in");
    if (trigger) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { reveal(); obs.disconnect(); } });
    }, { threshold: 0.4 });
    obs.observe(host);
    return () => obs.disconnect();
  }, [trigger]);

  useEffect(() => { if (trigger) hostRef.current?.classList.add("line-in"); }, [trigger]);

  return (
    <span
      ref={hostRef}
      className={cn("inline-block", className)}
      style={{ visibility: "visible" }}
    >
      <LinesMultiple delay={delay} fade={fade} hostRef={linesRef}>{children}</LinesMultiple>
    </span>
  );
}

// Helper: split children into multiple masked lines (we assume each child is one line.
// If a string is passed we keep it as a single line.)
function LinesMultiple({
  children, delay, fade, hostRef,
}: {
  children: ReactNode;
  delay: number;
  fade: boolean;
  hostRef: React.MutableRefObject<HTMLSpanElement[]>;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <>
      {items.map((c, i) => (
        <span key={i} className="line-mask block">
          <span
            ref={(el) => { if (el) hostRef.current[i] = el; }}
            className="line-inner"
            style={{ animationDelay: `${delay + i * 0.14}s`, animationName: fade ? "lineRevealFade" : undefined }}
          >
            {c}
          </span>
        </span>
      ))}
    </>
  );
}
