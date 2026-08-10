import { STORY, TOTAL_RUNWAY } from "./story";

/** Each chapter occupies `runway` seconds on the master timeline
 * (1 second per 100vh of scroll). Labels let any tween reference the
 * chapter’s entry point. */
export function chapterLabel(n: number) {
  return `ch${String(n).padStart(2, "0")}`;
}

export function chapterStart(n: number): number {
  let t = 0;
  for (const c of STORY) {
    if (c.n === n) return t;
    t += c.runway / 100;
  }
  return t;
}

export function chapterDur(n: number): number {
  const c = STORY.find((c) => c.n === n);
  return (c?.runway ?? 100) / 100;
}

export { STORY, TOTAL_RUNWAY };