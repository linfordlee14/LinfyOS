import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        os: {
          bg: "#0a0e1a",
          desktop: "#0f172a",
          panel: "#1e293b",
          "panel-hover": "#334155",
          cyan: "#06b6d4",
          "cyan-glow": "#22d3ee",
          teal: "#14b8a6",
          green: "#10b981",
          red: "#ef4444",
          yellow: "#f59e0b",
          text: "#f1f5f9",
          "text-muted": "#94a3b8",
          border: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        window: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        glow: "0 0 16px rgba(6,182,212,0.4)",
        "glow-strong": "0 0 32px rgba(6,182,212,0.6)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        glitch: "glitch 0.4s linear",
        scanline: "scanline 8s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        flicker: "flicker 3s infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
