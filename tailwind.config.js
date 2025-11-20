/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nbaOrange: "#FF6F00",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif']
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hoverable', '@media (hover: hover) and (pointer: fine)');
    },
  ],
}


