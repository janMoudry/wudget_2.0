import tailwindcssAnimated from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["trirong", "sans-serif"],
      },

      colors: {
        primary: "#abc99c",
        "primary-dark": "#8EAD8A",
        secondary: "#B784B7",
        white: "#ffffff",
        black: "#202124",
        "black-light": "#424346",
        "bg-light": "#F4F7FE",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
      spacing: {
        "side-menu": "300px",
        "side-menu-closed": "80px",

        "side-menu-icon-x": "calc(300px - 20px)",
        "side-menu-icon-x-closed": "calc(80px - 20px)",

        15: "3.75rem",

        "1px": "1px",

        "svh-header": "calc(100vh - 80px)",
      },
      animation: {
        stop: "animation-stop 0.1s forwards",
      },
    },
  },

  // ...

  plugins: [tailwindcssAnimated],
};
