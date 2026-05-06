import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vacina: {
          teal: "#56B0BB",
          gold: "#F0B954",
          dark: "#1A3858",
          gray: "#5A5A5A",
          lightGray: "#EAF4EB",
        },
      },
      fontFamily: {
        franie: ["var(--font-franie)", "sans-serif"],
      },
      fontSize: {
        "hero-title": ["80px", { lineHeight: "100px", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};
export default config;
