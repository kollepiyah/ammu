/** @type {import('tailwindcss').Config} */
// v.20.0526: Tailwind config Vue 3 SPA
// - darkMode 'class': toggle via classList di <html> (initDarkFromStorage di ui.js)
// - content: scan SEMUA file Vue/JS supaya purge utility classes yang dipakai
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Scheherazade New"', 'serif']
      }
    }
  },
  plugins: []
}
