import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vue 3 SPA — Portal MU full migration
// Dev: npm run dev  → http://localhost:5174
// Build: npm run build → dist/ (akan di-deploy ke Firebase Hosting nanti)
export default defineConfig({
  // v.72.20.0526: Multi-site hosting — Vue di-deploy ke site `ammuonline` (root)
  // ammuonline.web.app/ → public/vue/ → base path '/' (SPA at root)
  // Legacy site (portal-mambaul-ulum.web.app) tidak include vue/ lagi (ignored)
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174, // beda dari vue-widgets (default 5173) supaya bisa jalan paralel
    open: false
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
})
