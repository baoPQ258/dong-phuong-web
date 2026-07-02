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
        primary: {
          50: "#e3f0fb",
          100: "#b5d4f4",
          200: "#85b7eb",
          300: "#559ae2",
          400: "#3182d8",
          500: "#1565c0", // main brand blue
          600: "#0d47a1",
          700: "#0a3880",
          800: "#072960",
          900: "#041a40",
        },
        teal: {
          400: "#3ecfb2",
          500: "#2ec4a5",
          600: "#1db896",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
