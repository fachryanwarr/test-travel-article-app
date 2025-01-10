/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          surface: "#090808",
          primary: "#121212",
          secondary: "#242424",
        },
        primary: {
          50: "#FEF2F2",
          100: "#FFE1E2",
          200: "#FFC8C9",
          300: "#FFA2A4",
          400: "#FC5B5F",
          500: "#F43F43",
          600: "#E22025",
          700: "#BE171B",
          800: "#9D171A",
          900: "#821A1D",
          950: "#47080A",
        },
        bw: {
          50: "#E5E5E5",
          100: "#CCCCCC",
          200: "#B3B3B3",
          300: "#999999",
          400: "#808080",
          500: "#666666",
          600: "#4C4C4C",
          700: "#333333",
          800: "#1A1A1A",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
