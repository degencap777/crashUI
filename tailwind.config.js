/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#12171E',
        'main-container-background-color': '#1B2027',
        'border-color': '#22272E',
        'font-color': '#454A51',
        'yellow-color': '#E3C947',
        'button-color': '#62E63E',
        'button-border-color': '#4BC430',
      }
    },
  },
  plugins: [],
}
