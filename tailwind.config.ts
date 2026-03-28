import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: { 1: "#111111", 2: "#141414" },
        border: "#222222",
        accent: {
          DEFAULT: "#FF6B00",
          hover: "#E86200",
          glow: "rgba(255, 107, 0, 0.4)",
        },
        success: "#00C896",
        danger: "#FF3B3B",
        warning: "#FFAA00",
        info: "#6495ED",
        muted: "#888888",
        dim: "#555555",
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        body: ["Inter", "sans-serif"],
        data: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        hero: ["56px", { lineHeight: "1.1", fontWeight: "800" }],
        "hero-mobile": ["36px", { lineHeight: "1.1", fontWeight: "800" }],
        section: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "section-mobile": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-title": ["20px", { lineHeight: "1.2", fontWeight: "700" }],
        stat: ["12px", { lineHeight: "1.5", fontWeight: "500" }],
        badge: ["10px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
      },
      spacing: {
        "2xs": "2px",
        xs: "4px",
      },
      maxWidth: {
        content: "1280px",
      },
      keyframes: {
        "stat-fill": {
          from: { width: "0%" },
        },
        "fade-in-right": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "stat-fill": "stat-fill 0.8s ease-out forwards",
        "fade-in-right": "fade-in-right 150ms ease-out",
        "fade-in-left": "fade-in-left 150ms ease-out",
        "skeleton-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
