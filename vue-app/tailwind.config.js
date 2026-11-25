/** @type {import('tailwindcss').Config} */
// v.20.0526: Tailwind config Vue 3 SPA
// - darkMode 'class': toggle via classList di <html> (initDarkFromStorage di ui.js)
// - content: scan SEMUA file Vue/JS supaya purge utility classes yang dipakai
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Scheherazade New"', 'serif']
      },
      // Kyai 25 Nov 2026: slate gelap lewat variabel CSS supaya mode gelap Obsidian (netral)
      // berlaku untuk semua dark:bg-slate-* tanpa menyunting ratusan komponen.
      colors: {
        slate: {
          600: 'rgb(var(--slate-600) / <alpha-value>)',
          700: 'rgb(var(--slate-700) / <alpha-value>)',
          800: 'rgb(var(--slate-800) / <alpha-value>)',
          900: 'rgb(var(--slate-900) / <alpha-value>)',
          950: 'rgb(var(--slate-950) / <alpha-value>)'
        }
      }
    }
  },
  plugins: []
}
