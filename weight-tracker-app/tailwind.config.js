/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#D3FAD6",
        "secondary-green": "#D1EFB5",
      }
    },
  },
  plugins: [],
}