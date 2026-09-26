/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        caveat: ['Caveat', 'cursive'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
