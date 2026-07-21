// Kyai (21 Jul 2026): "jika santri glondongannya banyak (mis: kelas 1-2) maka di
// penugasan tampilkan kelas 1 dulu, setelah lulus baru tampil kelas 2 dst, review juz
// berjalan juga harus menunggu semua glondongan selesai."
import { describe, it, expect } from 'vitest'
import { isBarisTerbuka } from '@/utils/glondongan'

// Santri tes juz 13 (Kelas 3) → glondongan blok Kelas 1 & Kelas 2, plus 'berjalan'
// untuk juz 11-12. Lihat splitGlondongan.
const T = 13
const G = (kelas_asal, status) => ({
  tipe: 'glondongan',
  kelas_asal,
  status,
  juz_target: T,
  ajuan_id: 'a1'
})
const BERJALAN = (status = 'ditugaskan') => ({
  tipe: 'berjalan',
  kelas_asal: 3,
  status,
  juz_target: T,
  ajuan_id: 'a1'
})

describe('isBarisTerbuka — glondongan dikerjakan berurutan', () => {
  it('blok kelas TERKECIL selalu terbuka', () => {
    const rows = [G(1, 'menunggu'), G(2, 'menunggu')]
    expect(isBarisTerbuka(rows[0], rows)).toBe(true)
  })

  it('SKENARIO KYAI: kelas 2 TERKUNCI selama kelas 1 belum selesai', () => {
    const rows = [G(1, 'menunggu'), G(2, 'menunggu')]
    expect(isBarisTerbuka(rows[1], rows)).toBe(false)
  })

  it('kelas 1 ditugaskan (belum dinilai) pun BELUM membuka kelas 2', () => {
    const rows = [G(1, 'ditugaskan'), G(2, 'menunggu')]
    expect(isBarisTerbuka(rows[1], rows)).toBe(false)
  })

  it('kelas 1 selesai → kelas 2 terbuka', () => {
    const rows = [G(1, 'selesai'), G(2, 'menunggu')]
    expect(isBarisTerbuka(rows[1], rows)).toBe(true)
  })
})

describe('isBarisTerbuka — review juz berjalan menunggu SEMUA glondongan', () => {
  it('terkunci saat masih ada glondongan belum selesai', () => {
    const rows = [G(1, 'selesai'), G(2, 'ditugaskan'), BERJALAN()]
    expect(isBarisTerbuka(rows[2], rows)).toBe(false)
  })

  it('terbuka saat semua glondongan selesai', () => {
    const rows = [G(1, 'selesai'), G(2, 'selesai'), BERJALAN()]
    expect(isBarisTerbuka(rows[2], rows)).toBe(true)
  })

  it('Kelas 1 (tak punya glondongan sama sekali) → berjalan langsung terbuka', () => {
    // Santri tes juz 3: tak ada kelas lampau, jadi tak ada yang perlu ditunggu.
    const b = {
      tipe: 'berjalan',
      kelas_asal: 1,
      status: 'ditugaskan',
      juz_target: 3,
      ajuan_id: 'a2'
    }
    expect(isBarisTerbuka(b, [b])).toBe(true)
  })
})

describe('isBarisTerbuka — tahan data tak lengkap', () => {
  it('BARIS KELAS 1 HILANG (spawn gagal) tetap mengunci kelas 2', () => {
    // Penting: daftar blok wajib dihitung dari RUMUS (juz_target), bukan dari baris
    // yang kebetulan ada. Kalau diambil dari baris, blok hilang terlewat & urutan bocor.
    const rows = [G(2, 'menunggu')]
    expect(isBarisTerbuka(rows[0], rows)).toBe(false)
  })

  it('juz_target tak terbaca → jatuh ke baris yang ada, jangan mengunci total', () => {
    const rows = [
      { tipe: 'glondongan', kelas_asal: 1, status: 'selesai', ajuan_id: 'a3' },
      { tipe: 'glondongan', kelas_asal: 2, status: 'menunggu', ajuan_id: 'a3' }
    ]
    expect(isBarisTerbuka(rows[1], rows)).toBe(true)
  })

  it('kelas_asal tak terbaca → dianggap terbuka (jangan menyembunyikan data)', () => {
    const r = { tipe: 'glondongan', status: 'menunggu', juz_target: T, ajuan_id: 'a1' }
    expect(isBarisTerbuka(r, [r])).toBe(true)
  })

  it('tipe lain / baris kosong → terbuka', () => {
    expect(isBarisTerbuka({ tipe: 'lain' }, [])).toBe(true)
    expect(isBarisTerbuka(null, [])).toBe(true)
  })

  it('barisAjuan bukan array → tak lempar', () => {
    expect(isBarisTerbuka(G(1, 'menunggu'), null)).toBe(true)
  })
})
