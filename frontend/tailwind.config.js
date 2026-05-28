/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          800: '#5C4033',
          900: '#3F2A1E',
        }
      }
    },
  },
  plugins: [],
}