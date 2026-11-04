import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Penjaga regresi layar putih Pembayaran (v.1.4.9 gel. 2, 4 Nov 2026).
 *
 * watch(...) menjalankan getter-nya SAAT SETUP. Getter prefill membaca vaTagihanList →
 * vaSantri → bayarForm; bila `const bayarForm` dideklarasikan sesudah watch itu, wali yang
 * data santrinya sudah termuat langsung kena "Cannot access before initialization" (TDZ)
 * dan halaman kosong. Di uji tanpa data santri jalur itu tak terbaca, jadi lolos diam-diam.
 */
const src = readFileSync(
  path.resolve(__dirname, '../../vue-app/src/views/PembayaranView.vue'),
  'utf8'
)
const script = src.slice(src.indexOf('<script setup>'))

function posisi(pola) {
  const i = script.search(pola)
  expect(i, `tidak ketemu: ${pola}`).toBeGreaterThanOrEqual(0)
  return i
}

describe('PembayaranView — urutan deklarasi yang dibaca saat setup', () => {
  it('bayarForm dideklarasikan sebelum vaSantri dan sebelum watch pertama', () => {
    const bayarForm = posisi(/^const bayarForm = /m)
    expect(bayarForm).toBeLessThan(posisi(/^const vaSantri = /m))
    expect(bayarForm).toBeLessThan(posisi(/^watch\(/m))
  })

  it('bayarForm hanya dideklarasikan sekali', () => {
    expect(script.match(/^const bayarForm = /gm)).toHaveLength(1)
  })

  it('rantai getter watch prefill sudah lahir sebelum watch dipasang', () => {
    const w = posisi(/^watch\(\(\) => vaTagihanList\.value\.length/m)
    for (const nama of ['tagihanRaw', 'waliChildren', 'vaSantri', 'vaTagihanList', 'cartSel']) {
      const dekl = posisi(new RegExp(`^const (\\{[^}]*\\b${nama}\\b[^}]*\\}|${nama}) = `, 'm'))
      expect(dekl, nama).toBeLessThan(w)
    }
  })
})
