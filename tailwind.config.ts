import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        white: "#f5f2ee",
        offwhite: "#e8e0d8",
        red: "#c30d23",
        crimson: "#e63946",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        text: ["var(--font-text)", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale — clamp(min, vw, max)
        "micro": ["clamp(0.625rem, 0.8vw, 0.875rem)", { lineHeight: "1.2", letterSpacing: "0.3em" }],
        "body": ["clamp(1rem, 1.2vw, 1.25rem)", { lineHeight: "1.6" }],
        "lead": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.35" }],
        "title": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display": ["clamp(4rem, 14vw, 13.75rem)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        "void": ["clamp(6rem, 26vw, 24rem)", { lineHeight: "0.78", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        widest2: "0.4em",
      },
      transitionTimingFunction: {
        quint: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      keyframes: {
        lineRevealUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        lineRevealFade: {
          "0%": { transform: "translateY(0.2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        spin3d: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        pulse: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
      },
      animation: {
        "line-up": "lineRevealUp 1s cubic-bezier(0.23,1,0.32,1) forwards",
        "line-fade": "lineRevealFade 0.8s cubic-bezier(0.23,1,0.32,1) forwards",
        "marquee-left": "marqueeLeft 25s linear infinite",
        "marquee-right": "marqueeRight 25s linear infinite",
        "spin3d": "spin3d 18s linear infinite",
        "pulse": "pulse 3s ease-in-out infinite",
        "breathe": "breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
