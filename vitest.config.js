import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  // Alias `@` = vue-app/src, sama seperti vue-app/vite.config.js. Tanpa ini modul app
  // yang memakai `@/...` tak bisa diimpor dari tests/.
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./vue-app/src', import.meta.url)),
      // Vue terpasang di vue-app/node_modules, bukan di root — tanpa alias ini berkas
      // tes di tests/ tak bisa `import { ref } from 'vue'` (modul app bisa karena
      // resolusinya relatif ke vue-app/src). Runtime-only: tes tak mengompilasi template.
      vue: fileURLToPath(
        new URL('./vue-app/node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url)
      ),
      // Sama ceritanya dengan `vue` di atas — pinia juga hanya ada di vue-app/node_modules,
      // jadi tes yang menguji store (mis. settingsKeuanganMerge) tak bisa mengimpornya.
      pinia: fileURLToPath(new URL('./vue-app/node_modules/pinia/dist/pinia.mjs', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['vue-widgets/src/**/*.test.{js,vue}', 'tests/**/*.test.js']
  }
})
