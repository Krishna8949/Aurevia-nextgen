"use client";

import { Fragment, type ReactNode } from "react";
import { STORY } from "@/lib/story";

/* The per-chapter stage content. Each function returns React nodes for the
   backdrop / visual / text / image layers. Most chapters paint info into the
   text + visual layers; the persistent stage animates these in place. */

const HEADLINE = (s: string, cls = "display-1") => (
  <span className={`${cls} letter-row`} style={{ whiteSpace: "nowrap" }}>{s}</span>
);

const CAPTION = (c: string) => (
  <span className="caption opacity-90">{c}</span>
);

const LETTERS = (s: string, cls = "display-1", color = "#f5f2ee") => (
  <span className={`${cls} letter-row`} style={{ whiteSpace: "nowrap", color }}>
    {s.split("").map((L, i) => (
      <span key={i} data-letter={i} className="inline-block">{L}</span>
    ))}
  </span>
);

const DOC_CELL = (i: number, key: any) => (
  <div key={key} className="doc-cell" data-doc={i}>
    <span className="eyebrow text-red/70">{["PREPRINT","PAPER","DATASET","PATENT","FOUND.","NEG.","CONF.","LET.","TRANS.","REV.","GRANT","CHAPTER"][i % 12]}</span>
    <span className="caption text-white/90" style={{ fontSize: "clamp(0.9rem,1.1vw,1.2rem)" }}>
      {["On the entropy of curiosity","Tensor decomposition of learning","Spectral methods in ML","Phase transitions of knowledge",
         "Decoding information geometry","Latent failure surfaces","Emergent cooperation","Limits of attention","Approximate inference","Recursive goals","Refactor the world","Knowledge compaction"
       ][i % 12]}
    </span>
    <span className="eyebrow text-offwhite/50" style={{ marginTop: "auto" }}>{2018 + (i % 7)}</span>
  </div>
);

const FIELD_CLIP = (n: number, key: any) => (
  <div key={key} className={`visual-layer flex items-center justify-center`} data-field={n} style={{ zIndex: 100 - n, whiteSpace: "nowrap" }}>
    <span className="display-1" style={{ color: n % 2 ? "#f5f2ee" : "#c30d23" }}>{STORY[13].words && STORY[13].words[n]}</span>
  </div>
);

export function ChapterVisual(n: number): ReactNode {
  switch (n) {
    case 1: return null; // void — pure backdrop
    case 2: return null;
    case 3: return null; // CURIOSITY letters live in text-layer
    case 4: return (
      <div className="flex items-center justify-center" data-spark>
        <div className="absolute rounded-full bg-red" data-dot style={{ width: 12, height: 12 }} />
        {[0,1,2,3,4,5,6].map((i) => (
          <span key={i} className="absolute rounded-full border border-red/40" data-ring={i}
            style={{ width: `${(i+1)*14}%`, height: `${(i+1)*14}%` }} />
        ))}
      </div>
    );
    case 6: return null;
    case 7: return (
      <div data-knowledge-img className="absolute inset-0">
        <div className="absolute left-[8%] top-[16%] w-[42vw] h-[60vh] bg-gradient-to-br from-offwhite/15 via-red/10 to-transparent border-l border-red/30" />
        <div className="absolute right-[10%] bottom-[14%] w-[34vw] h-[42vh] bg-gradient-to-tl from-crimson/10 to-transparent" />
      </div>
    );
    case 8: return (
      <div className="docs-grid" data-docs>
        {Array.from({ length: 12 }).map((_, i) => DOC_CELL(i, i))}
      </div>
    );
    case 9: return (
      <div className="absolute inset-0" data-overload>
        <div className="docs-grid">
          {Array.from({ length: 12 }).map((_, i) => DOC_CELL(i + 12, i))}
        </div>
      </div>
    );
    case 10: return (
      <div className="absolute inset-0 flex items-center">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-red" data-line style={{ transformOrigin: "left center" }} />
      </div>
    );
    case 11: return (
      <div className="absolute inset-0 flex items-center justify-center [perspective:600px]">
        {LETTERS("AUREVIA", "display-1", "#f5f2ee")}
      </div>
    );
    case 12: return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div data-discover-img className="absolute w-[58vmin] h-[34vh] bg-gradient-to-br from-red/30 via-offwhite/15 to-transparent border border-red/30" />
      </div>
    );
    case 13: return (
      <div className="absolute inset-0 overflow-hidden" data-research-bg>
        <div className="absolute left-[6%] top-[18%] w-[40vw] h-[60vh] bg-gradient-to-tr from-offwhite/12 to-transparent border-l border-offwhite/20" />
        <div className="absolute right-[10%] bottom-[16%] w-[28vw] h-[42vh] bg-gradient-to-tl from-red/10 to-transparent" />
      </div>
    );
    case 14: return STORY[13].words!.map((_, i) => FIELD_CLIP(i, i));
    case 15: return (
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 gap-px p-[6%]" data-library>
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="bg-offwhite/[0.04] border border-offwhite/10" />
        ))}
      </div>
    );
    case 16: return (
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-[8vh_6vw]" data-people>
        {(STORY[15].words ?? []).map((w) => (
          <div key={w} className="flex items-center justify-center border border-red/30 bg-offwhite/5">
            <span className="display-3 text-white">{w}</span>
          </div>
        ))}
      </div>
    );
    case 17: return (
      <div className="flex items-center justify-center">
        <svg viewBox="-100 -100 200 200" className="network-svg" data-network>
          {Array.from({ length: 26 }).map((_, i) => {
            const a = (i / 26) * Math.PI * 2;
            return (
              <g key={i}>
                <line data-edge={i} x1={0} y1={0} x2={Math.cos(a) * 80} y2={Math.sin(a) * 80} stroke="#c30d23" strokeWidth="0.4" opacity="0" />
                <circle data-node={i} cx={Math.cos(a) * 80} cy={Math.sin(a) * 80} r="1.8" fill="#f5f2ee" opacity="0" />
              </g>
            );
          })}
        </svg>
      </div>
    );
    case 18: return (
      <svg viewBox="0 0 100 14" className="absolute top-[68%] left-[6%] w-[88%] h-[14vh]" data-together>
        {[0,1,2,3,4,5,6,7,8].map((i) => (
          <line key={i} data-line={i} x1={6 + i*11} y1={7} x2={18 + i*11} y2={7} stroke="#c30d23" strokeWidth="0.2"
            style={{ transformOrigin: `${6 + i*11}px 7px` }} />
        ))}
      </svg>
    );
    case 20: return (
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-3 p-[8vh_8vw]" data-experiment>
        {(STORY[19].words ?? []).map((w) => (
          <div key={w} className="flex items-center justify-center border border-red/20 bg-offwhite/5">
            <span className="display-3 text-white">{w}</span>
          </div>
        ))}
      </div>
    );
    case 22: return (
      <div className="absolute inset-0 grid place-content-center" data-rebuild>
        {STORY[21].words!.map((w, i) => (
          <span key={i} data-rebuild-line={i} className="display-3 text-white block opacity-0 mb-3">{w}</span>
        ))}
      </div>
    );
    case 24: return (
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-[6vh_6vw]" data-creation>
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} data-block={i} className="bg-gradient-to-t from-offwhite/10 to-red/15 border border-red/20" style={{ transformOrigin: "bottom", transform: "scaleY(0)" }} />
        ))}
      </div>
    );
    case 25: return (
      <div className="flex items-center justify-center">
        <div className="rounded-full bg-red" data-impactdot style={{ width: 14, height: 14, transformOrigin: "center" }} />
      </div>
    );
    case 26: {
      const NODES = [[20,30],[78,22],[60,60],[35,75],[88,72],[12,82],[45,18],[70,44],[28,52],[82,55],
        [52,82],[15,48],[63,30],[40,40],[73,82],[5,12],[92,90],[55,55]];
      return (
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="network-svg" data-world>
            {NODES.flatMap((p, i) =>
              NODES.slice(i + 1).map((q, j) => {
                const dx = q[0] - p[0], dy = q[1] - p[1];
                return dx*dx + dy*dy < 1100
                  ? <line key={`${i}-${j}`} data-edge={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="#c30d23" strokeWidth="0.18" opacity="0" />
                  : null;
              })
            ).filter(Boolean)}
            {NODES.map((p, i) => (
              <circle key={i} data-node={i} cx={p[0]} cy={p[1]} r="1" fill="#f5f2ee" opacity="0" />
            ))}
          </svg>
        </div>
      );
    }
    case 27: return (
      <div className="absolute inset-0" data-dust>
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="absolute w-px h-px bg-offwhite/40" style={{ left: `${(i*2.5)%100}%`, top: `${(i*7)%100}%` }} />
        ))}
      </div>
    );
    case 28: return null;
    case 29: return null;
    case 30: return (
      <div className="flex items-center justify-center">
        <div className="rounded-full bg-red animate-breathe" style={{ width: 8, height: 8 }} />
      </div>
    );
    default: return null;
  }
}

export function ChapterText(n: number): ReactNode {
  const c = STORY.find((c) => c.n === n)!;
  switch (n) {
    case 1: return (
      <div className="text-box items-center text-center gap-[2.5rem]" style={{ marginTop: "auto", marginBottom: "auto" }}>
        <span className="eyebrow text-offwhite/80" data-subtag>WHERE CURIOSITY MEETS RESEARCH</span>
        <span className="display-2 text-white" data-headline>{c.headline}</span>
        <span className="display-3 text-offwhite/80" data-tagline>{c.words && c.words[0]}</span>
      </div>
    );
    case 2: return (
      <div className="flex items-center justify-center" data-question-stack>
        {(c.words ?? []).map((w, i) => (
          <span key={i} data-word={i} className="display-1 absolute text-white" style={{ whiteSpace: "nowrap" }}>{w}</span>
        ))}
      </div>
    );
    case 3: return (
      <div className="text-box items-center text-center" data-curious-text>
        <span data-headline-letters className="display-1 text-white">
          {c.headline!.split("").map((L, i) => <span key={i} data-letter={i} className="inline-block">{L}</span>)}
        </span>
        <span className="caption text-offwhite/80" data-caption>{c.caption}</span>
      </div>
    );
    case 4: return (
      <div className="absolute bottom-[10%] left-0 right-0 text-center" data-spark-text>
        <span className="caption text-offwhite/80">{c.caption}</span>
      </div>
    );
    case 5: return (
      <div className="flex items-center justify-center" data-questions-stack>
        {(c.words ?? []).map((w, i) => (
          <span key={i} data-word={i} className="display-2 absolute text-offwhite/80" style={{ whiteSpace: "nowrap" }}>{w}</span>
        ))}
      </div>
    );
    case 6: return (
      <div className="text-box" style={{ right: "8vw", left: "auto", alignItems: "flex-end" }}>
        <span className="display-1 text-red" data-headline style={{ fontStyle: "italic" }}>{c.headline}</span>
        <span className="caption text-white/80" data-caption>{c.caption}</span>
      </div>
    );
    case 7: return (
      <div className="text-box" style={{ top: "10vh", left: "8vw", alignItems: "flex-start" }}>
        <span className="display-1 text-white" data-headline>KNOWLEDGE</span>
        <span className="caption text-offwhite/80" data-caption>{c.caption}</span>
      </div>
    );
    case 8: return (
      <div className="text-box" style={{ top: "10vh", left: "8vw", alignItems: "flex-start" }}>
        <span className="display-1 text-red" data-headline>INFORMATION</span>
        <span className="caption text-white/90" data-caption style={{ marginTop: "100vh" }}>{c.caption}</span>
      </div>
    );
    case 9: return (
      <div className="text-box" style={{ bottom: "10vh", right: "8vw", alignItems: "flex-end" }}>
        <span className="display-2 text-offwhite" data-headline style={{ fontStyle: "italic" }}>{c.headline}</span>
        <span className="caption text-white/90" data-caption>{c.caption}</span>
      </div>
    );
    case 10: return (
      <div className="text-box items-center text-center" style={{ top: "28vh", left: 0, right: 0 }}>
        <span className="caption text-white" data-caption>{c.caption}</span>
      </div>
    );
    case 11: return (
      <div className="text-box items-center text-center" style={{ bottom: "10vh", left: 0, right: 0 }}>
        <span className="caption text-offwhite/80" data-caption>{c.caption}</span>
      </div>
    );
    case 12: return (
      <div className="flex items-center justify-center" data-discover-text>
        <span className="display-1 text-white" data-headline>{c.headline}</span>
      </div>
    );
    case 13: return (
      <div className="flex items-center justify-center">
        <span data-headline className="display-1 text-white">{c.headline}</span>
      </div>
    );
    case 14: return null; // visual layer holds the field words
    case 15: return (
      <div className="text-box" style={{ bottom: "10vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="caption text-white/90" data-caption>{c.caption}</span>
      </div>
    );
    case 16: return (
      <div className="text-box" style={{ bottom: "6vh", left: "8vw", alignItems: "flex-start" }}>
        <span className="display-2 text-white" data-headline>{c.headline}</span>
        <span className="caption text-offwhite/80" data-caption>{c.caption}</span>
      </div>
    );
    case 17: return (
      <div className="text-box" style={{ top: "10vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="caption text-white" data-caption>{c.caption}</span>
      </div>
    );
    case 18: return (
      <div className="flex items-center justify-center">
        <span data-headline className="display-1 text-white" style={{ whiteSpace: "nowrap", transformOrigin: "left center" }}>TOGETHER</span>
      </div>
    );
    case 19: return (
      <div className="flex items-center justify-center" data-opportunity>
        {(STORY[18].words ?? []).map((w, i) => (
          <span key={i} data-word={i} className="display-1 absolute" style={{ whiteSpace: "nowrap", color: i % 2 ? "#e8e0d8" : "#c30d23", transformOrigin: "center" }}>{w}</span>
        ))}
      </div>
    );
    case 20: return (
      <div className="text-box" style={{ bottom: "6vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="display-2 text-red" data-headline>{c.headline}</span>
        <span className="caption text-white" data-caption>{c.caption}</span>
      </div>
    );
    case 21: {
      const lines = (c.caption ?? "").split("\n");
      return (
        <div className="text-box items-center text-center gap-[2rem]" data-fail>
          {lines.map((l, i) => (
            <span key={i} data-fail-line={i} className={i === 0 ? "display-2 text-white" : "display-2 text-offwhite/70"} style={{ fontStyle: "italic" }}>{l}</span>
          ))}
          <div data-fail-bar className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red to-transparent" style={{ transformOrigin: "bottom", transform: "scaleY(0)" }} />
        </div>
      );
    }
    case 22: return null; // visual-layer holds the lines
    case 23: return (
      <div className="flex items-center justify-center" data-innovate>
        <span className="display-1 text-white" data-headline style={{ whiteSpace: "nowrap" }}>INNOVATE</span>
      </div>
    );
    case 24: return (
      <div className="text-box" style={{ bottom: "6vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="display-2 text-white" data-headline>{c.headline}</span>
        <span className="caption text-offwhite" data-caption>{c.caption}</span>
      </div>
    );
    case 25: return (
      <div className="text-box" style={{ bottom: "10vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="display-2 text-white" data-headline>{c.headline}</span>
        <span className="caption text-offwhite/80" data-caption>{c.caption}</span>
      </div>
    );
    case 26: return (
      <div className="text-box" style={{ bottom: "10vh", left: 0, right: 0, alignItems: "center" }}>
        <span className="caption text-white/90" data-caption>{c.caption}</span>
      </div>
    );
    case 27: return (
      <div className="flex items-center justify-center">
        <span data-future className="display-3 text-white" style={{ whiteSpace: "nowrap", fontStyle: "italic", opacity: 0 }}>{c.headline}</span>
      </div>
    );
    case 28: return (
      <div className="flex items-center justify-center" data-answer>
        {STORY[27].words!.map((w, i) => (
          <span key={i} data-word={i} className="display-1 absolute" style={{ whiteSpace: "nowrap", color: i === 1 ? "#c30d23" : "rgba(245,242,238,0.6)" }}>{w}</span>
        ))}
      </div>
    );
    case 29: return (
      <div className="text-box items-center text-center gap-[2.5rem]">
        <span className="display-1 text-white" data-headline>{c.headline}</span>
        <span className="display-3 text-offwhite/80" data-tagline>{c.words && c.words[0]}</span>
        <span className="caption text-offwhite/90" data-caption>{c.caption}</span>
        <div className="flex gap-6" data-cta>
          <a href="#chapter-17" data-cursor-label="JOIN" className="px-8 py-4 border border-red text-white eyebrow hover:bg-red hover:text-ink transition-colors">JOIN OUR COMMUNITY</a>
          <a href="#chapter-13" data-cursor-label="EXPLORE" className="px-8 py-4 border border-offwhite/40 text-offwhite eyebrow hover:border-white hover:text-white transition-colors">EXPLORE RESEARCH</a>
        </div>
      </div>
    );
    case 30: return (
      <div className="text-box items-center text-center gap-[3rem]">
        <span className="eyebrow text-offwhite/70" data-tag>{c.caption}</span>
        <div className="flex gap-8" data-final-words>
          {(c.words ?? []).map((w, i) => (
            <span key={i} data-word={i} className={i === 2 ? "display-2 text-red" : "display-2 text-white"} style={{ whiteSpace: "nowrap", opacity: 0 }}>{w}</span>
          ))}
        </div>
      </div>
    );
    default: return null;
  }
}

export function ChapterBackdrop(n: number): ReactNode {
  const c = STORY.find((c) => c.n === n)!;
  return (
    <Fragment>
      <div data-bg={n} className="absolute inset-0 transition-none" key={`bg-${n}`} style={{ background: c.bg, opacity: 0 }} />
    </Fragment>
  );
}