// Story plan — single source of truth for the 30-chapter master timeline.
// Each chapter declares: tonal backdrop, headline that fills the viewport,
// a `kind` that selects which layered visual plays on the persistent stage,
// and how much scroll runway (in 100vh units) the chapter occupies.

// COLOR SCHEME: BLACK (#050505), RED (#c30d23), off-white (#e8e0d8), white (#f5f2ee)

export type ChapterKind =
  | "void"          // minimal
  | "question"      // huge typography (WHY/WHAT/HOW morph)
  | "word-break"    // CURIOSITY — letters separate and scatter
  | "spark"         // small object grows into rings
  | "questions"     // multiple question layers, WHAT IF remains
  | "expand"        // word becomes a world outline
  | "knowledge"     // editorial image reveal behind type
  | "documents"     // documents multiply across 300vh
  | "overload"      // documents reshape into dense chaos then freeze
  | "line"          // single red line crosses; camera follows
  | "logo-build"    // line → letters → AUREVIA wordmark
  | "discover"      // DISCOVER scales; image grows inside word
  | "research"      // word drifts; research imagery backdrop moves
  | "fields"        // 8 field words advance one per scroll
  | "library"       // dolly through grid
  | "people"        // portraits overtake library
  | "network"       // one node → expanding network
  | "together"      // TOGETHER scales fullscreen, anchoring lines
  | "opportunity"   // 7 fullscreen word moments
  | "experiment"    // project grid + dual text swap
  | "minimal-line"  // slow dissolve + build bar
  | "rebuild"       // sequential text reveal out of black
  | "innovate"      // letter-spacing morph into energetic poster
  | "creation"      // block build-up
  | "impact"        // one node scales to explosion
  | "world"         // proximity graph (artistic global)
  | "future"        // dust clears revealing huge question
  | "answer"        // WHY? → WHY NOT? climax
  | "invitation"    // Aurevia identity + CTAs
  | "final";        // three final words + breathing loop

export type ChapterPlan = {
  n: number;
  kind: ChapterKind;
  runway: number;            // scroll height in viewport units (vh)
  bg: string;                // backdrop tone for the stage during this chapter
  fg: string;                // foreground accent tone
  headline: string;          // large display text. "" = no headline
  caption?: string;          // small supporting line. "" = no caption
  words?: string[];          // ordered set of words the chapter cycles through
};

export const STORY: ChapterPlan[] = [
  { n: 1,  kind: "void",         runway: 80,  bg: "#050505", fg: "#e8e0d8", headline: "AUREVIA", words: ["NEXT GEN"] },
  { n: 2,  kind: "question",     runway: 160, bg: "#080808", fg: "#f5f2ee", headline: "WHY?", words: ["WHY?", "WHAT?", "HOW?"] },
  { n: 3,  kind: "word-break",   runway: 150, bg: "#080808", fg: "#f5f2ee", headline: "CURIOSITY", caption: "Every discovery begins somewhere." },
  { n: 4,  kind: "spark",        runway: 120, bg: "#0a0a0b", fg: "#c30d23", headline: "", caption: "Sometimes, it begins with something incredibly small." },
  { n: 5,  kind: "questions",    runway: 190, bg: "#0b0b0c", fg: "#e8e0d8", headline: "WHAT IF?", words: ["Why does it work?", "What if it didn\u2019t?", "Can it be better?", "What happens next?", "WHAT IF?"] },
  { n: 6,  kind: "expand",       runway: 130, bg: "#0d0d0f", fg: "#c30d23", headline: '"What if?"', caption: "A question creates a possibility." },
  { n: 7,  kind: "knowledge",    runway: 150, bg: "#0a0a0b", fg: "#f5f2ee", headline: "KNOWLEDGE", caption: "Possibility needs knowledge." },
  { n: 8,  kind: "documents",    runway: 180, bg: "#0c0a08", fg: "#e8e0d8", headline: "INFORMATION", caption: "We have never had more information.", words: ["pubmed.ncbi.nih", "arxiv 2410.01234", "doi 10.1038/s41586", "JSTOR 0022-5193", "USPTO 11,234,567", "LIGO P2400123", "CRISPR Cas9", "JWST-1287", "arXiv 2307.01989", "ORCID 0000-0002", "OpenAlex W2745", "IUPAC 2024"] },
  { n: 9,  kind: "overload",     runway: 160, bg: "#1a0508", fg: "#c30d23", headline: "OVERLOAD", caption: "But more information doesn\u2019t always mean more understanding." },
  { n: 10, kind: "line",         runway: 120, bg: "#0a0a0b", fg: "#c30d23", headline: "", caption: "Understanding needs direction." },
  { n: 11, kind: "logo-build",   runway: 160, bg: "#0a0a0b", fg: "#f5f2ee", headline: "AUREVIA", caption: "That\u2019s where Aurevia begins." },
  { n: 12, kind: "discover",     runway: 150, bg: "#0c0a08", fg: "#e8e0d8", headline: "DISCOVER" },
  { n: 13, kind: "research",     runway: 140, bg: "#0c0b10", fg: "#f5f2ee", headline: "RESEARCH", caption: "Ask better questions." },
  { n: 14, kind: "fields",       runway: 160, bg: "#09080c", fg: "#f5f2ee", headline: "", words: ["AI", "SCIENCE", "TECHNOLOGY", "MEDICINE", "BUSINESS", "SPACE", "PSYCHOLOGY", "CLIMATE"] },
  { n: 15, kind: "library",      runway: 150, bg: "#0a080a", fg: "#f5f2ee", headline: "", caption: "Find what you need." },
  { n: 16, kind: "people",       runway: 130, bg: "#0a0a0b", fg: "#f5f2ee", headline: "PEOPLE", caption: "But research isn\u2019t only about information.", words: ["STUDENTS", "RESEARCHERS", "CREATORS", "MENTORS"] },
  { n: 17, kind: "network",      runway: 150, bg: "#0a0b10", fg: "#c30d23", headline: "", caption: "It\u2019s about people." },
  { n: 18, kind: "together",     runway: 140, bg: "#0a0a0b", fg: "#f5f2ee", headline: "TOGETHER", caption: "Great questions become better when explored together." },
  { n: 19, kind: "opportunity",  runway: 190, bg: "#080808", fg: "#c30d23", headline: "", words: ["RESEARCH", "WORKSHOPS", "COMPETITIONS", "MENTORSHIP", "PUBLICATIONS", "INTERNSHIPS", "SCHOLARSHIPS"] },
  { n: 20, kind: "experiment",   runway: 150, bg: "#0c0a08", fg: "#e8e0d8", headline: "EXPERIMENT", caption: "Don\u2019t just learn. Experiment.", words: ["PROTOTYPE", "ALPHA", "BETA", "TRIAL", "HYPOTHESIS", "DATA", "BUILD", "TEST"] },
  { n: 21, kind: "minimal-line", runway: 120, bg: "#060606", fg: "#f5f2ee", headline: "", caption: "Some ideas fail.\nThat\u2019s research." },
  { n: 22, kind: "rebuild",      runway: 130, bg: "#080808", fg: "#f5f2ee", headline: "", words: ["Failure changes the question.", "And sometimes...", "...the new question changes everything."] },
  { n: 23, kind: "innovate",     runway: 150, bg: "#0c0a08", fg: "#c30d23", headline: "INNOVATE", caption: "Knowledge becomes action." },
  { n: 24, kind: "creation",     runway: 140, bg: "#0b0a06", fg: "#e8e0d8", headline: "CREATION", caption: "Build what doesn\u2019t exist yet." },
  { n: 25, kind: "impact",       runway: 130, bg: "#080806", fg: "#c30d23", headline: "IMPACT", caption: "One idea can travel further than you think." },
  { n: 26, kind: "world",        runway: 160, bg: "#070812", fg: "#f5f2ee", headline: "", caption: "Knowledge has no borders." },
  { n: 27, kind: "future",       runway: 130, bg: "#050505", fg: "#f5f2ee", headline: '"WHAT COMES NEXT?"' },
  { n: 28, kind: "answer",       runway: 150, bg: "#1a0508", fg: "#c30d23", headline: "WHY NOT?", words: ["WHY?", "WHY NOT?"] },
  { n: 29, kind: "invitation",   runway: 130, bg: "#0a0a0b", fg: "#f5f2ee", headline: "AUREVIA", caption: "Your curiosity has somewhere to go.", words: ["NEXT GEN"] },
  { n: 30, kind: "final",        runway: 120, bg: "#050505", fg: "#f5f2ee", headline: "", caption: "WHERE CURIOSITY MEETS RESEARCH", words: ["DISCOVER.", "RESEARCH.", "INNOVATE."] },
];

// Total scroll length in 100vh units — the height of the master runway.
export const TOTAL_RUNWAY = STORY.reduce((s, c) => s + c.runway, 0);
// Cumulative offset (in 100vh units) where each chapter begins on the master timeline.
export const CHAPTER_OFFSETS: number[] = STORY.reduce((acc: number[], c, i) => {
  const prev = i === 0 ? 0 : acc[i - 1];
  acc.push(prev + (i === 0 ? 0 : STORY[i - 1].runway));
  return acc;
}, []);