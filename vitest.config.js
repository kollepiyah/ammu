import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['vue-widgets/src/**/*.test.{js,vue}', 'tests/**/*.test.js']
  }
})
