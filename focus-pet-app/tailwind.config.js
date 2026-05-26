/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#04101E', // Ciemny granat z prototypu
        surface: '#0B1A2C', // Jaśniejszy granat dla paneli
        primary: '#6DE1B5', // Miętowy zielony dla przycisków
        primaryHover: '#58CBA0', // Ciemniejszy miętowy
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Popularny font dla nowoczesnych UI
      }
    },
  },
  plugins: [],
}
