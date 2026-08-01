import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orbit: {
          dark: "#02367B",      // Primary Deep Ocean Blue
          primary: "#02367B",   // Primary Brand Navy (#02367B)
          royal: "#005BAA",     // Royal Ocean Blue
          mid: "#0082C8",       // Mid Ocean Blue
          cyan: "#00A9E0",      // Vibrant Cyan Accent
          light: "#46D3E4",     // Light Aqua Accent
          ice: "#E6F7FF",       // Ice Blue Tint
          yellow: {
            400: "#facc15",
            500: "#eab308",
            600: "#ca8a04",
          },
        },
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(0, 169, 224, 0.3)',
        'glow-yellow': '0 0 25px -5px rgba(234, 179, 8, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
