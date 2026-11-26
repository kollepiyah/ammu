/** @type {import('tailwindcss').Config} */
// v.20.0526: Tailwind config Vue 3 SPA
// - darkMode 'class': toggle via classList di <html> (initDarkFromStorage di ui.js)
// - content: scan SEMUA file Vue/JS supaya purge utility classes yang dipakai
import colors from 'tailwindcss/colors'

// Kyai 26 Nov 2026: banyak warna lepas dari palet hijau Ammu (cyan 1.501×, indigo, violet, sky,
// blue). Disatukan DI SINI, bukan dengan menyunting ribuan kelas: cyan/sky/blue = teal persis;
// indigo = teal satu tingkat lebih tua dan violet = abu netral, supaya kategori yang dulu
// dibedakan warna (mis. kolom Cuti di Absensi) tetap terbedakan. Merah/kuning/hijau-sukses tetap.
const TINGKAT = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
function geser(palet, langkah) {
  return Object.fromEntries(
    TINGKAT.map((t, i) => [t, palet[TINGKAT[Math.min(TINGKAT.length - 1, i + langkah)]]])
  )
}

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
        },
        cyan: colors.teal,
        sky: colors.teal,
        blue: colors.teal,
        indigo: geser(colors.teal, 1),
        violet: colors.zinc
      }
    }
  },
  plugins: []
}
