import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  // Alias `@` = vue-app/src, sama seperti vue-app/vite.config.js. Tanpa ini modul app
  // yang memakai `@/...` tak bisa diimpor dari tests/.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./vue-app/src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['vue-widgets/src/**/*.test.{js,vue}', 'tests/**/*.test.js']
  }
})
