/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: '#FF8C32',
        brandBrown: '#4A2511',
        brandBg: '#FAF9F6',
      },
    },
  },
  plugins: [],
}