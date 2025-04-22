// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      poppins: ["var(--font-poppins)", "sans-serif"],
      bowlby: ["var(--font-bowlby)", "cursive"], // Bowlby es tipo display
    },
  },
  
  plugins: [],
};

export default config;
