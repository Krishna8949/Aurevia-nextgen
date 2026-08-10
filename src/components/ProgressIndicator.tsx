"use client"
import { useEffect, useRef, useState } from "react";
import { STORY, CHAPTER_OFFSETS } from "../lib/story";

export function ProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(1);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      const top = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? top / h : 0);

      const vh = window.innerHeight;
      let idx = 1;
      for (let i = 0; i < STORY.length; i++) {
        const offsetPx = CHAPTER_OFFSETS[i] * (vh / 100);
        if (top >= offsetPx - vh * 0.4) {
          idx = STORY[i].n;
        } else {
          break;
        }
      }
      setActive(idx);
      raf.current = requestAnimationFrame(update);
    };
    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <div className="h-[2px] bg-ink/30">
          <div className="h-full bg-red origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <div className="fixed bottom-4 right-6 z-[60] text-micro hidden sm:block text-offwhite pointer-events-none">
        {String(active).padStart(2, "0")} / {String(30).padStart(2, "0")}
      </div>
    </>
  );
}
