import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin() // Inline CSS ke JS bundle → 1 file output
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  build: {
    outDir: resolve(__dirname, '../public/dist'),
    // v.56.0526: JANGAN empty — emptyOutDir wipe tailwind.css yang di-build sebelumnya
    // (root cause MIME type error /dist/tailwind.css = text/html karena file missing)
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'AmmuWidgets',
      fileName: () => 'widgets.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        exports: 'named'
      }
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    target: 'es2018'
  },
  server: { port: 5174, open: false }
})
