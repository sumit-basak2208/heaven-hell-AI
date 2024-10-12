import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       animation: {
        loader: 'loader 0.6s infinite alternate'
      },
      keyframes: {
        loader: {
          to: {
            opacity: "0.1",
            transform: 'translate3d(0, -3px, 0)'
          }
        }
      },
      colors: {
        "neon-red": "#FF006E",
      },
      backgroundImage: {
        "gradient-navbar": "linear-gradient(to right, #630000 40%, #cc1a1a)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
