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
        "brand-teal": "#56B0BB",
        "brand-yellow": "#F0B954",
        "brand-dark-blue": "#1A3858",
        "brand-gray": "#5A5A5A",
        "brand-divider": "#EAF4EB",
      },
      fontFamily: {
        franie: ["var(--font-franie)", "sans-serif"],
      },
      fontSize: {
        "hero-title": "80px",
        "hero-sub": "22px",
        "nav-link": "18px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
