/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        primary: "Sf-pro",
        title: "Sf-pro-bold",
        semi: "Sf-pro-semi",
      },
    },

    screens: {
      xss: { raw: "(min-height: 750px)" },

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    colors: {
      bg: "#FFFFFF",
      bg_d: "#121212",
      bg_d2: "#2D2D2D",
      card: "#F4F4F4",
      card_d: "#212121",
      primary: "#00D208",
      primary_d: "#81FF45",
      text: "#000000",
      "text-light": "#FCFCFC",
      text2: "#5E5E5E",
      text2_d: "#D8D5D5",
      raised: "#E25656",
      warning: "#F1AE00",
      border_light: "#E6E6E6",
    },
  },
  plugins: [],
}
