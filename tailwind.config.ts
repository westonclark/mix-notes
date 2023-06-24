import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

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
        black: {
          DEFAULT: colors.black,
          1: "rgb(15,15,20)",
          2: "rgb(25,25,40)",
          3: "rgb(40,40,60)",
        },
        white: {
          DEFAULT: colors.white,
          1: "rgb(255,255,255)",
          2: "rgb(215,215,215)",
          3: "rgb(130,130,130)",
        },
        blue: {
          DEFAULT: colors.blue,
          1: "rgb(10, 77, 104)",
          2: "rgb(0, 43, 91)",
          3: "rgb(11,173,214)",
        },
        highlight: "#1A8BBF",
        shadow: "#0D2F4F",
      },
      fontFamily: {
        inter: ["Inter var", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        namespace: "1px 1px 10px #9ab4fb70",
      },
    },
  },
  plugins: [],
} satisfies Config;
