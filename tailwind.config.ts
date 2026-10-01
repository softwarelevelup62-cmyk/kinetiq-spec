import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090a10",
        surface: "#10121c",
        "surface-highlight": "#161927",
        "surface-border": "#21273a",
        brand: {
          cyan: "#00f0ff",
          blue: "#3b82f6",
          emerald: "#10b981",
          purple: "#8b5cf6",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(to right, #1f243818 1px, transparent 1px), linear-gradient(to bottom, #1f243818 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
