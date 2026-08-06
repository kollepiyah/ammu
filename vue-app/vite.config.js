import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

// v.1.2.9: versi app tersedia di kode sebagai __APP_VERSION__ — dulu diketik ulang
//   sebagai teks di LoginView, dan nama berkas installer di URL unduhan ikut
//   ditebak manual. Satu sumber = satu titik bump yang berkurang.
const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8')
)

// Vue 3 SPA — Portal MU full migration
// Dev: npm run dev  → http://localhost:5174
// Build: npm run build → dist/ (akan di-deploy ke Firebase Hosting nanti)
export default defineConfig({
  // v.72.20.0526: Multi-site hosting — Vue di-deploy ke site `ammuonline` (root)
  // ammuonline.web.app/ → public/vue/ → base path '/' (SPA at root)
  // Legacy site (portal-mambaul-ulum.web.app) tidak include vue/ lagi (ignored)
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
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
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // v.86.0526: pisah vendor besar dari index (sebelumnya index ~825KB / gzip 216KB).
        //   firebase + chart.js jadi chunk sendiri supaya initial load lebih ringan & cache-friendly.
        //
        // AUDIT AGU 2026 (P1) — pemisahan lama BOCOR dua arah:
        //   1. Aturan `id.includes('jspdf')` cuma memindahkan berkas jsPDF SENDIRI.
        //      DEPENDENSINYA (html2canvas 197kB, canvg 80kB + core-js 45kB/svg-pathdata/
        //      rgbcolor/stackblur, dompurify 22kB) tetap jatuh ke 'vendor' = chunk BOOT.
        //      Sama utk @kurkle/color (dep chart.js) dan vue-advanced-cropper (cuma
        //      dipakai ProfilPengaturanSaya).
        //   2. Helper interop CJS + preload-helper Vite (modul VIRTUAL, tanpa
        //      'node_modules' di id-nya) ditaruh rollup di 'vendor-pdf', lalu 'vendor'
        //      meng-import-nya => `Circular chunk: vendor-pdf -> vendor -> vendor-pdf`
        //      => index.html modulepreload vendor-pdf => jsPDF 391kB TETAP ikut muat
        //      awal walau semua pemakaiannya dynamic import. (Terbukti di live: berkas
        //      vendor-pdf ter-unduh 104kB di halaman login.)
        //
        // Perbaikan: (a) helper virtual dipaku ke 'vendor' supaya arah dependensi
        // cuma satu (vendor-pdf -> vendor); (b) anggota chunk lazy tak lagi didaftar
        // manual tapi DITURUNKAN dari importer — sebuah paket ikut pindah HANYA bila
        // SELURUH jalur importernya berasal dari akar lazy yang sama. Begitu ia juga
        // dipakai jalur boot, ia otomatis tinggal di 'vendor'. Jadi upgrade dependensi
        // tak bisa diam-diam menyeret muatan baru ke jalur boot.
        manualChunks(id, { getModuleInfo }) {
          // (a) Helper lintas-chunk: WAJIB di chunk boot, jangan sampai chunk lazy
          //     yang "memiliki"-nya (itu yang bikin siklus di atas).
          if (
            id.includes('commonjsHelpers') ||
            id.includes('vite/preload-helper') ||
            id.includes('vite/modulepreload-polyfill')
          )
            return 'vendor'
          if (!id.includes('node_modules')) return

          // Akar chunk: paket yang dikenali langsung dari nama berkasnya.
          const rootOf = (mid) => {
            if (mid.includes('firebase/messaging') || mid.includes('@firebase/messaging'))
              return 'vendor-fcm'
            if (mid.includes('firebase') || mid.includes('@firebase')) return 'vendor-firebase'
            if (mid.includes('chart.js') || mid.includes('vue-chartjs')) return 'vendor-charts'
            // jspdf/exceljs/cropper DIPAKAI hanya lewat dynamic import (cetak/ekspor/
            // ganti foto) — boleh berat asal tak ikut boot.
            if (mid.includes('jspdf')) return 'vendor-pdf'
            if (mid.includes('exceljs')) return 'vendor-excel'
            if (mid.includes('vue-advanced-cropper')) return 'vendor-cropper'
            return null
          }

          const own = rootOf(id)
          if (own) return own

          // (b) Bukan akar: telusuri KE ATAS, kumpulkan SEMUA akar yang bisa mencapai
          //     modul ini. Sengaja himpunan (union), bukan keputusan per-jalur: internal
          //     core-js saling impor melingkar, dan penelusuran per-jalur menyerah di
          //     siklus lalu jatuh ke 'vendor' — itu yang dulu menyandera 123 modul
          //     core-js (29,6 kB) di chunk boot padahal cuma dipakai canvg/jsPDF.
          const rootsReaching = (start) => {
            const roots = new Set()
            const seen = new Set([start])
            const stack = [start]
            while (stack.length) {
              const info = getModuleInfo(stack.pop())
              const importers = [...(info?.importers || []), ...(info?.dynamicImporters || [])]
              if (importers.length === 0) {
                roots.add('vendor') // yatim: aman-kan ke boot
                continue
              }
              for (const imp of importers) {
                const r = rootOf(imp)
                if (r)
                  roots.add(r) // sampai di paket akar — berhenti di sini
                else if (!imp.includes('node_modules'))
                  roots.add('vendor') // kode app = boot
                else if (!seen.has(imp)) {
                  seen.add(imp)
                  stack.push(imp)
                }
              }
            }
            return roots
          }
          const LAZY = new Set(['vendor-pdf', 'vendor-excel', 'vendor-charts', 'vendor-cropper'])
          const roots = rootsReaching(id)
          if (roots.size === 1) {
            const only = [...roots][0]
            if (LAZY.has(only)) return only
          }
          // Dipakai jalur boot, atau dipakai >1 chunk lazy (mis. dep bersama) -> 'vendor'.
          return 'vendor'
        }
      }
    }
  }
})
