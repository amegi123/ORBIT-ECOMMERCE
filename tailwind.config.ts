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
        orbit: {
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#0f172a",
          },
          yellow: {
            400: "#facc15",
            500: "#eab308",
            600: "#ca8a04",
          },
          accent: "#0066cc",
          dark: "#0b132b",
          light: "#f8fafc",
        },
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-yellow': '0 0 25px -5px rgba(234, 179, 8, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
