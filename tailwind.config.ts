import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scampi: {
          "50": "#f5f5fa",
          "100": "#e9eaf5",
          "200": "#ced2e9",
          "300": "#a4abd5",
          "400": "#737ebd",
          "500": "#5b68af",
          "600": "#3e488b",
          "700": "#333a71",
          "800": "#2e335e",
          "900": "#2a2e50",
          "950": "#1c1e35",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
