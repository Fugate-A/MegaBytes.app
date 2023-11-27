/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'page-background': "url('/public/bg1.JPG')",
    }),
    maxHeight: {
      '70vh': '70vh',
    },
    height: {
      '95': '91.4vh',
    },
  plugins: [],
}
}}