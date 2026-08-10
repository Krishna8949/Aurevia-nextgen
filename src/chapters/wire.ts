"use client";

import { gsap } from "gsap";
import { STORY } from "@/lib/story";
import { chapterDur, chapterLabel, chapterStart } from "@/lib/timeline";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Select inside the persistent stage — every chapter's content lives in
 *  [data-stage] so we scope all queries there. */
const S = (sel: string) => `[data-stage] ${sel}`;

/** The wrapper div for chapter n's visual layer content */
const VIS = (n: number) => S(`[data-ch-visual="${n}"]`);
/** The wrapper div for chapter n's text layer content */
const TXT = (n: number) => S(`[data-ch-text="${n}"]`);

/* ------------------------------------------------------------------ */
/* wireChapter — appends a labelled sub-timeline for chapter n         */
/* ------------------------------------------------------------------ */

export function wireChapter(master: gsap.core.Timeline, n: number): void {
  const label = chapterLabel(n);
  const start = chapterStart(n);
  const dur = chapterDur(n);

  // Scoped selector helper inside this chapter's text or visual container
  const S = (sel: string) => {
    if (sel.startsWith("[data-bg")) return `[data-stage] ${sel}`;
    return `[data-stage] [data-ch-text="${n}"] ${sel}, [data-stage] [data-ch-visual="${n}"] ${sel}`;
  };

  // Add label
  master.addLabel(label, start);

  /* --- Backdrop crossfade ----------------------------------------- */
  // Fade this chapter's bg in at start, hold it, fade it out at end (skip fade-in for Ch 1 since it's already visible on load)
  if (n > 1) {
    master.to(S(`[data-bg="${n}"]`), {
      autoAlpha: 1, duration: dur * 0.15, ease: "power2.inOut",
    }, start);
  }
  // Only fade out backdrop if there's a next chapter
  if (n < 30) {
    master.to(S(`[data-bg="${n}"]`), {
      autoAlpha: 0, duration: dur * 0.15, ease: "power2.inOut",
    }, start + dur - dur * 0.05);
  }

  /* --- Show/hide the chapter's visual+text wrappers --------------- */
  // Fade in chapter layers at start (skip for Ch 1 to show it on load)
  if (n > 1) {
    master.fromTo(VIS(n), { autoAlpha: 0 }, {
      autoAlpha: 1, duration: dur * 0.08,
    }, start);
    master.fromTo(TXT(n), { autoAlpha: 0 }, {
      autoAlpha: 1, duration: dur * 0.08,
    }, start);
  }
  // Fade out chapter layers at end (except last chapter)
  if (n < 30) {
    master.to(VIS(n), { autoAlpha: 0, duration: dur * 0.08 }, start + dur - dur * 0.08);
    master.to(TXT(n), { autoAlpha: 0, duration: dur * 0.08 }, start + dur - dur * 0.08);
  }

  /* --- Chapter-specific animations -------------------------------- */
  const sub = gsap.timeline({ defaults: { ease: "none" } });

  switch (n) {
    case 1: { // VOID — title fades in, letter-spaces out, fades
      sub.from(S("[data-headline]"), { y: 30, autoAlpha: 0, duration: 0.3 }, 0)
         .from(S("[data-subtag]"), { autoAlpha: 0, duration: 0.3 }, 0.1)
         .from(S("[data-tagline]"), { autoAlpha: 0, duration: 0.3 }, 0.35)
         .to(S("[data-headline]"), { letterSpacing: "0.4em", autoAlpha: 0.5, duration: 0.4 }, 0.5);
      break;
    }
    case 2: { // QUESTION — WHY? WHAT? HOW? scale beyond viewport
      const W = (STORY[1].words ?? []).length;
      STORY[1].words!.forEach((_, i) => {
        const k = S(`[data-word="${i}"]`);
        sub.fromTo(k, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.08 }, (i / W) * 0.7);
        sub.to(k, { scale: 16, autoAlpha: 0, duration: 0.16, ease: "power2.in" }, ((i + 1) / W) * 0.7);
      });
      break;
    }
    case 3: { // CURIOSITY — letters scatter, caption arrives
      sub.fromTo(S("[data-headline-letters]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.2 }, 0);
      sub.to(S("[data-letter]"), {
        x: () => (Math.random() - 0.5) * 1300,
        y: () => (Math.random() - 0.5) * 700,
        rotate: () => (Math.random() - 0.5) * 360,
        autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.025,
      }, 0.4);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.85);
      break;
    }
    case 4: { // SPARK — dot grows, rings expand
      sub.fromTo(S("[data-dot]"), { scale: 0 }, { scale: 6, autoAlpha: 0.85, duration: 0.2 }, 0)
         .fromTo(S("[data-ring]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.06, duration: 0.3 }, 0.15)
         .to(S("[data-ring]"), { scale: 4, autoAlpha: 0, duration: 0.4, stagger: 0.04 }, 0.5);
      sub.fromTo(S("[data-spark-text]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.75);
      break;
    }
    case 5: { // QUESTIONS — cycle words, WHAT IF? stays
      const W = STORY[4].words!.length;
      STORY[4].words!.forEach((_, i) => {
        const k = S(`[data-word="${i}"]`);
        const colorIn = STORY[4].words![i] === "WHAT IF?" ? "#c30d23" : "#e8e0d8";
        sub.fromTo(k, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, color: colorIn, duration: 0.06 }, (i / W) * 0.85);
        if (i < W - 1) {
          sub.to(k, { autoAlpha: 0, y: -60, duration: 0.06 }, ((i + 1) / W) * 0.85);
        }
      });
      // Last word stays and scales up
      sub.to(S(`[data-word="${W - 1}"]`), { scale: 1.4, color: "#c30d23", duration: 0.15 }, 0.85);
      break;
    }
    case 6: { // POSSIBILITY — italic headline expands
      sub.fromTo(S("[data-headline]"), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3 }, 0)
         .to(S("[data-headline]"), { scale: 3.5, letterSpacing: "0.04em", duration: 0.5, ease: "power2.in" }, 0.4);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.75);
      break;
    }
    case 7: { // KNOWLEDGE — image reveals behind type
      sub.fromTo(S("[data-knowledge-img]"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5 }, 0)
         .fromTo(S("[data-headline]"), { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3 }, 0.05)
         .fromTo(S("[data-caption]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.55);
      break;
    }
    case 8: { // INFORMATION — documents multiply
      sub.fromTo(S("[data-docs]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0);
      for (let i = 0; i < 12; i++) {
        sub.fromTo(S(`[data-doc="${i}"]`),
          { autoAlpha: 0, scale: 0.7, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.05 },
          0.15 + (i / 12) * 0.6);
      }
      sub.fromTo(S("[data-headline]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0.4);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.7);
      break;
    }
    case 9: { // OVERLOAD — scatter, freeze
      sub.to(S("[data-overload] [data-doc]"), {
        x: (i: number) => (i % 4 - 2) * 60,
        y: (i: number) => (i % 3 - 1) * 50,
        rotate: (i: number) => (i % 2 ? 7 : -7),
        duration: 0.4, stagger: 0.01,
      }, 0.05);
      sub.to(S("[data-overload]"), { scale: 1.04, duration: 0.2 }, 0.6);
      sub.fromTo(S("[data-headline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.55);
      break;
    }
    case 10: { // DIRECTION — gold line draws left to right
      sub.set(S("[data-line]"), { scaleX: 0, autoAlpha: 1, transformOrigin: "left center" })
         .to(S("[data-line]"), { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.1)
         .to(S("[data-line]"), { y: -100, duration: 0.3, ease: "power2.out" }, 0.6);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.5);
      break;
    }
    case 11: { // AUREVIA — letters fly in from below in 3D
      sub.fromTo(S("[data-ch-visual='11'] [data-letter]"),
        { y: 80, autoAlpha: 0, rotateX: 90 },
        { y: 0, autoAlpha: 1, rotateX: 0, stagger: 0.045, duration: 0.3 },
        0.1);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.65);
      break;
    }
    case 12: { // DISCOVER — word scales, image inside
      sub.fromTo(S("[data-discover-text] [data-headline]"), { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.25 }, 0)
         .fromTo(S("[data-discover-img]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3 }, 0.3)
         .to(S("[data-discover-text] [data-headline]"), { scale: 3.2, letterSpacing: "0.03em", duration: 0.4, ease: "power2.in" }, 0.55);
      break;
    }
    case 13: { // RESEARCH — backdrop imagery, word drifts
      sub.fromTo(S("[data-research-bg]"), { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.45 }, 0)
         .fromTo(S("[data-headline]"), { autoAlpha: 0, x: -120 }, { autoAlpha: 1, x: 0, duration: 0.3 }, 0.1)
         .to(S("[data-headline]"), { x: 200, autoAlpha: 0.7, duration: 0.4 }, 0.55);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.75);
      break;
    }
    case 14: { // FIELDS — eight field words advance one per scroll
      const W = STORY[13].words!.length;
      STORY[13].words!.forEach((_, i) => {
        const k = S(`[data-field="${i}"]`);
        sub.fromTo(k, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.06 }, (i / W) * 0.85);
        sub.to(k, { yPercent: -100, autoAlpha: 0, duration: 0.06 }, ((i + 1) / W) * 0.85);
      });
      break;
    }
    case 15: { // LIBRARY — dolly through grid
      sub.fromTo(S("[data-library]"), { scale: 1.7, x: 400, autoAlpha: 0 }, { scale: 1, x: 0, autoAlpha: 1, duration: 0.5 }, 0)
         .to(S("[data-library]"), { scale: 0.78, x: -200, autoAlpha: 0.5, duration: 0.5, ease: "power2.in" }, 0.5);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 16: { // PEOPLE — portraits overtake library
      const W = STORY[15].words!.length;
      STORY[15].words!.forEach((_, i) => {
        sub.fromTo(S(`[data-people] > :nth-child(${i + 1})`),
          { autoAlpha: 0, scale: 0.6, y: 50 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.18 },
          0.2 + (i / W) * 0.5);
      });
      sub.fromTo(S("[data-headline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.4);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 17: { // COMMUNITY — network grows
      sub.fromTo(S('[data-network] [data-node="0"]'), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.1)
         .to(S("[data-network] [data-node]"), { autoAlpha: 1, scale: 1, stagger: 0.01, duration: 0.05 }, 0.2)
         .to(S("[data-network] [data-edge]"), { autoAlpha: 0.6, stagger: 0.005, duration: 0.2 }, 0.55);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0);
      break;
    }
    case 18: { // TOGETHER — scales fullscreen, anchoring lines
      sub.fromTo(S("[data-headline]"), { scaleX: 0.4, autoAlpha: 0, transformOrigin: "left center" },
        { scaleX: 1, autoAlpha: 1, duration: 0.45 }, 0)
         .fromTo(S("[data-together] [data-line]"), { scaleX: 0, transformOrigin: "left center" },
           { scaleX: 1, stagger: 0.04, duration: 0.25 }, 0.4);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 19: { // OPPORTUNITY — seven fullscreen word moments
      const W = STORY[18].words!.length;
      STORY[18].words!.forEach((_, i) => {
        const k = S(`[data-word="${i}"]`);
        sub.fromTo(k, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.06 }, (i / W) * 0.92);
        sub.to(k, { yPercent: -100, autoAlpha: 0, duration: 0.06 }, ((i + 1) / W) * 0.92);
      });
      break;
    }
    case 20: { // EXPERIMENT — project grid + caption
      sub.fromTo(S("[data-experiment] > *"), { autoAlpha: 0, y: 50, scale: 0.85 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.03, duration: 0.2 }, 0);
      sub.fromTo(S("[data-headline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.55);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 21: { // FAILURE — slow dissolve + rebuild bar
      sub.fromTo(S('[data-fail-line="0"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0)
         .to(S('[data-fail-line="0"]'), { autoAlpha: 0, duration: 0.2 }, 0.4)
         .fromTo(S('[data-fail-line="1"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.45)
         .to(S('[data-fail-line="1"]'), { autoAlpha: 0, duration: 0.2 }, 0.75);
      sub.to(S("[data-fail-bar]"), { scaleY: 1, duration: 0.3, ease: "power2.out" }, 0.85);
      break;
    }
    case 22: { // DISCOVERY (rebuild) — text reveal from black
      const W = STORY[21].words!.length;
      STORY[21].words!.forEach((_, i) => {
        const k = S(`[data-rebuild-line="${i}"]`);
        sub.fromTo(k, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.2 }, (i / W) * 0.9);
        if (i < W - 1) {
          sub.to(k, { autoAlpha: 0, y: -20, duration: 0.18 }, ((i + 1) / W) * 0.9);
        }
      });
      break;
    }
    case 23: { // INNOVATION — letter-spacing morph
      sub.fromTo(S("[data-headline]"), { letterSpacing: "0.45em", autoAlpha: 0 },
        { letterSpacing: "-0.04em", autoAlpha: 1, scale: 1.25, duration: 0.4 }, 0)
         .to(S("[data-headline]"), { scale: 1, color: "#c30d23", duration: 0.3 }, 0.45);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 24: { // CREATION — block build-up
      sub.to(S("[data-creation] [data-block]"), { scaleY: 1, autoAlpha: 1, stagger: 0.02, duration: 0.25 }, 0)
         .to(S("[data-creation]"), { scale: 1.05, duration: 0.25, ease: "power2.in" }, 0.7);
      sub.fromTo(S("[data-headline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.5);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.75);
      break;
    }
    case 25: { // IMPACT — dot explodes to fill viewport
      sub.fromTo(S("[data-impactdot]"), { scale: 0 }, { scale: 0.6, autoAlpha: 1, duration: 0.2 }, 0)
         .to(S("[data-impactdot]"), { scale: 40, autoAlpha: 0.85, duration: 0.4, ease: "power2.in" }, 0.3);
      sub.fromTo(S("[data-headline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.55);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 26: { // WORLD — proximity graph
      sub.to(S("[data-world] [data-node]"), { autoAlpha: 1, scale: 1, stagger: 0.005, duration: 0.05 }, 0.1)
         .to(S("[data-world] [data-edge]"), { autoAlpha: 0.55, stagger: 0.003, duration: 0.3 }, 0.5)
         .to(S("[data-world]"), { rotate: 6, scale: 1.08, duration: 0.4, ease: "power2.inOut" }, 0.6);
      sub.fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7);
      break;
    }
    case 27: { // FUTURE — dust fades, question emerges
      sub.to(S("[data-dust]"), { autoAlpha: 0, duration: 0.3 }, 0)
         .fromTo(S("[data-future]"), { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5 }, 0.3);
      break;
    }
    case 28: { // ANSWER — WHY? → WHY NOT?
      sub.fromTo(S('[data-word="0"]'), { scale: 1.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.25 }, 0)
         .to(S('[data-word="0"]'), { scale: 1.6, autoAlpha: 0, duration: 0.25 }, 0.35)
         .fromTo(S('[data-word="1"]'), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35 }, 0.55)
         .to(S('[data-word="1"]'), { scale: 1.15, color: "#c30d23", duration: 0.4, ease: "power2.out" }, 0.95);
      break;
    }
    case 29: { // INVITATION — brand + CTAs
      sub.fromTo(S("[data-headline]"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25 }, 0)
         .fromTo(S("[data-tagline]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.25)
         .fromTo(S("[data-caption]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.4)
         .fromTo(S("[data-cta] a"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.25 }, 0.6);
      break;
    }
    case 30: { // FINAL — three words + breathing dot
      sub.fromTo(S("[data-tag]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
         .fromTo(S("[data-final-words] [data-word]"), { autoAlpha: 0 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.25 }, 0.3);
      break;
    }
  }
  // Add the sub-timeline to the master at the chapter's start position
  const subDur = sub.duration();
  if (subDur > 0) {
    sub.timeScale(subDur / dur);
    master.add(sub, start);
  }
}

export { chapterLabel };