import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Penjaga regresi tanggal transaksi WIB.
 *
 * `new Date().toISOString().slice(0, 10)` memberi tanggal UTC, jadi setiap transaksi
 * yang dicatat 00:00–06:59 WIB (= 17:00–23:59 UTC hari sebelumnya) tersimpan MUNDUR
 * SEHARI. Untuk halaman di bawah ini akibatnya nyata: uang masuk ke laporan harian
 * yang salah, dan absensi shift subuh menggeser hitungan bisyaroh/bonus.
 *
 * Pola benarnya `todayJakarta()` di @/utils/format (perilakunya diuji di
 * todayJakarta.test.js). Tes ini menjaga halaman-halaman itu tidak diam-diam kembali
 * ke pola UTC — bug yang sama sudah kambuh tiga kali: POS (v.1.2.6), setor/tarik
 * Tabungan (v.1.2.8), lalu impor mutasi Tabungan yang saat itu terlewat.
 *
 * Daftarnya SENGAJA eksplisit, bukan sapuan seluruh src: file baru harus didaftarkan
 * sadar-sadar, dan tanggal yang memang UTC (created_at/updated_at, nama file ekspor,
 * dummy tes cetak) tidak ikut terjaring.
 */
const BERKAS_TANGGAL_TRANSAKSI = [
  // Keuangan — menyentuh uang riil
  'views/TagihanView.vue',
  'views/PembayaranView.vue',
  'views/PembayaranPendingView.vue',
  'views/HutangPiutangView.vue',
  'views/UangPosView.vue',
  'views/TabunganView.vue',
  'views/BukuIndukView.vue',
  'views/PosSantriView.vue',
  'components/pos/ModalPOS.vue',
  // Absensi guru — tanggal simpan + penentu Alpha, hulunya bisyaroh
  'views/AbsensiGuruView.vue'
]

// `.slice(0, 10)` maupun `.split('T')[0]` — dua ejaan bug yang sama.
const POLA_UTC =
  /toISOString\(\)\s*\.\s*(?:slice\(\s*0\s*,\s*10\s*\)|split\(\s*['"]T['"]\s*\)\s*\[\s*0\s*\])/

/** Buang komentar agar catatan yang MENYEBUT pola lama tidak dianggap pelanggaran. */
function tanpaKomentar(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
}

/**
 * Akar repo dicari dari cwd (naik maksimal 3 level) — bukan dari `import.meta.url`:
 * di lingkungan jsdom, `node:url` di-shim sehingga URL relatif ber-drive-letter Windows
 * ter-resolve keliru ke akar drive.
 */
const AKAR = (() => {
  let dir = process.cwd()
  for (let i = 0; i < 4; i++) {
    if (existsSync(path.join(dir, 'vue-app', 'src'))) return dir
    dir = path.dirname(dir)
  }
  throw new Error('Akar repo (yang memuat vue-app/src) tak ketemu dari ' + process.cwd())
})()

function baca(rel) {
  return readFileSync(path.join(AKAR, 'vue-app', 'src', ...rel.split('/')), 'utf8')
}

describe('tanggal transaksi memakai WIB, bukan UTC', () => {
  it.each(BERKAS_TANGGAL_TRANSAKSI)('%s tidak memakai toISOString() sebagai tanggal', (rel) => {
    const kode = tanpaKomentar(baca(rel))
    const baris = kode.split('\n').filter((l) => POLA_UTC.test(l))
    expect(baris, `pakai todayJakarta() — baris melanggar:\n${baris.join('\n')}`).toEqual([])
  })

  it.each(BERKAS_TANGGAL_TRANSAKSI)('%s mengimpor todayJakarta dari utils/format', (rel) => {
    const kode = baca(rel)
    expect(kode).toMatch(
      /import\s*\{[^}]*\btodayJakarta\b[^}]*\}\s*from\s*['"]@\/utils\/format['"]/
    )
  })

  it('polanya memang mengenali kedua ejaan bug (penjaga untuk penjaganya)', () => {
    expect(POLA_UTC.test('new Date().toISOString().slice(0, 10)')).toBe(true)
    expect(POLA_UTC.test("new Date().toISOString().split('T')[0]")).toBe(true)
    // Timestamp instant penuh memang benar pakai UTC — jangan ikut terjaring.
    expect(POLA_UTC.test('created_at: new Date().toISOString()')).toBe(false)
  })

  it('komentar yang menyebut pola lama tidak dianggap pelanggaran', () => {
    const contoh = [
      '// dulu: new Date().toISOString().slice(0, 10) — UTC, salah',
      'const t = todayJakarta()'
    ].join('\n')
    expect(POLA_UTC.test(tanpaKomentar(contoh))).toBe(false)
  })
})
