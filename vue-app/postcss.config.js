// v.20.0526: Vue 3 PostCSS config — Tailwind + Autoprefixer
// Wajib ada supaya `@tailwind base/components/utilities` di main.css diproses Vite
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
