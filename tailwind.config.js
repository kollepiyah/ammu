/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.{html,js}', './vue-widgets/src/**/*.{vue,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0F766E',
          700: '#0f5c55',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e'
        },
        sidebar: { DEFAULT: '#0a3d35', dark: '#073127', light: '#0e4d44' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', '"Amiri"', 'serif']
      }
    }
  },
  plugins: []
}
