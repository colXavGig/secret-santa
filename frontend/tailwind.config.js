/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#D42426',
          darkred: '#A8181A',
          green: '#165B33',
          darkgreen: '#104A27',
          gold: '#F8B229',
          snow: '#F4F4F4',
        }
      }
    },
  },
  plugins: [],
}
