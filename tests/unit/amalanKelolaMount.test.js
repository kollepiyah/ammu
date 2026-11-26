// @vitest-environment node
// Master Data → Kitab & Wirid harus bisa DIBUKA (Kyai 26 Nov 2026): `form = reactive(kosong())`
// sempat berada di atas `const blokKosong` → "Cannot access 'f' before initialization" di produksi
// (const panah tak ter-hoist; kosong() memanggilnya saat setup). Tes di sini tak mengompilasi .vue,
// jadi pagarnya urutan deklarasi di <script setup>.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

describe('AmalanKelolaView — urutan deklarasi', () => {
  it('form dibuat sesudah blokKosong & babKosong', () => {
    const src = readFileSync(
      fileURLToPath(new URL('../../vue-app/src/views/AmalanKelolaView.vue', import.meta.url)),
      'utf8'
    )
    const pakai = src.indexOf('reactive(kosong())')
    expect(pakai).toBeGreaterThan(0)
    expect(pakai).toBeGreaterThan(src.indexOf('const blokKosong'))
    expect(pakai).toBeGreaterThan(src.indexOf('const babKosong'))
  })
})
