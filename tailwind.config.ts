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
        "neon-red": "#FF006E",
      },
      backgroundImage: {
        "gradient-navbar": "linear-gradient(to right, #630000 40%, #cc1a1a)",
      },
    },
  },
  plugins: [],
};
export default config;
