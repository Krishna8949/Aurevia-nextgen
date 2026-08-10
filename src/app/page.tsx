"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY, TOTAL_RUNWAY } from "@/lib/story";
import { chapterStart, chapterDur, chapterLabel } from "@/lib/timeline";
import { StoryStage } from "@/components/StoryStage";
import { ChapterVisual, ChapterText, ChapterBackdrop } from "@/chapters/content";
import { wireChapter } from "@/chapters/wire";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const builtRef = useRef(false);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    if (!runway || !stage || builtRef.current) return;
    builtRef.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One master timeline, scrubbed across the entire runway
    const master = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: reduce ? false : 0.6,
        pin: stage,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Wire every chapter into the master at its computed offset
    for (const ch of STORY) {
      wireChapter(master, ch.n);
    }

    // Safety refresh once fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(t);
      master.scrollTrigger?.kill();
      master.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      builtRef.current = false;
    };
  }, []);

  // Collect all layer content for all 30 chapters into the persistent stage
  const allBackdrops = STORY.map((c) => (
    <div key={`bg-${c.n}`}>{ChapterBackdrop(c.n)}</div>
  ));
  const allVisuals = STORY.map((c) => (
    <div key={`vis-${c.n}`} data-ch-visual={c.n} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {ChapterVisual(c.n)}
    </div>
  ));
  const allTexts = STORY.map((c) => (
    <div key={`txt-${c.n}`} data-ch-text={c.n} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {ChapterText(c.n)}
    </div>
  ));

  return (
    <>
      {/* The persistent visual stage — pinned by the master ScrollTrigger */}
      <StoryStage
        ref={stageRef}
        backdrop={allBackdrops}
        visual={allVisuals}
        text={allTexts}
      />

      {/* The invisible scroll runway — its height drives the master timeline */}
      <div
        ref={runwayRef}
        className="runway"
        style={{ height: `${TOTAL_RUNWAY}vh` }}
      >
        {/* Semantic chapter markers for ProgressIndicator & Nav anchors */}
        {STORY.map((c, i) => {
          const offsetVh = STORY.slice(0, i).reduce((s, ch) => s + ch.runway, 0);
          return (
            <div
              key={c.n}
              id={`chapter-${String(c.n).padStart(2, "0")}`}
              data-chapter-index={c.n}
              style={{ position: "absolute", top: `${offsetVh}vh`, height: `${c.runway}vh`, width: "100%" }}
            />
          );
        })}
      </div>
    </>
  );
}
