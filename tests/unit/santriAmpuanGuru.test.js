// Kyai (31 Agu 2026): "ada beberapa kemarin eror di akun guru" — Absensi & Input Nilai.
//
// Gejalanya bukan galat merah, tapi DAFTAR KOSONG: guru membuka Input Bulanan / Rekap
// Diniyah / Absensi Santri dan tak melihat seorang pun, padahal santri yang sama muncul
// di Data Santri. Sebabnya satu: aturan "santri ampuan guru" disalin di empat berkas
// (useSantri, InputBulananView, RekapDiniyahView, AbsensiSantriView) dan salinannya
// berpisah diam-diam:
//   • InputBulananView tak pernah memeriksa `guru_sekolah[]`     → wali kelas sekolah kosong
//   • RekapDiniyahView memakai Array.includes (peka huruf besar) → nama beda kapital kosong
//   • AbsensiSantriView menganggap `guru_sekolah` selalu larik   → baris lama kosong
//
// Tes ini mengunci utils/guruScope sebagai satu-satunya rumus, lengkap dengan bentuk data
// yang dulu meleset. Kalau ada yang menulis salinan kelima, ia akan lolos tes ini — maka
// yang dijaga di sini adalah PERILAKU rumusnya, dan pemakaiannya dijaga lewat impor.
import { describe, it, expect } from 'vitest'
import { ownsNgaji, ownsSekolah, headsLembaga, punyaGuruKategori } from '@/utils/guruScope'

const NAMA = 'Ahmad Fauzi'

describe('ownsNgaji — pengampu ngaji (Qiraati)', () => {
  it('cocok lewat guru_pagi, guru_sore, atau guru (legacy)', () => {
    expect(ownsNgaji({ guru_pagi: NAMA }, NAMA)).toBe(true)
    expect(ownsNgaji({ guru_sore: NAMA }, NAMA)).toBe(true)
    expect(ownsNgaji({ guru: NAMA }, NAMA)).toBe(true)
  })

  it('tak peka huruf besar & spasi berlebih', () => {
    expect(ownsNgaji({ guru_pagi: '  AHMAD FAUZI ' }, 'ahmad fauzi')).toBe(true)
  })

  it('guru lain tidak ikut terbawa', () => {
    expect(ownsNgaji({ guru_pagi: 'Budi' }, NAMA)).toBe(false)
  })

  it('nama kosong tak pernah cocok — jangan sampai membuka semua santri', () => {
    expect(ownsNgaji({ guru_pagi: '' }, '')).toBe(false)
    expect(ownsNgaji({ guru_pagi: NAMA }, '')).toBe(false)
    expect(ownsNgaji(null, NAMA)).toBe(false)
  })
})

describe('ownsSekolah — wali kelas sekolah', () => {
  it('cocok pada larik guru_sekolah', () => {
    expect(ownsSekolah({ guru_sekolah: ['Budi', NAMA] }, NAMA)).toBe(true)
  })

  it('KUNCI: tak peka huruf besar (Array.includes lama gagal di sini)', () => {
    expect(ownsSekolah({ guru_sekolah: ['AHMAD FAUZI'] }, 'Ahmad Fauzi')).toBe(true)
    expect(ownsSekolah({ guru_sekolah: [' Ahmad Fauzi '] }, NAMA)).toBe(true)
  })

  it('KUNCI: baris lama yang menyimpan guru_sekolah sebagai TEKS tunggal tetap terbaca', () => {
    expect(ownsSekolah({ guru_sekolah: NAMA }, NAMA)).toBe(true)
  })

  it('kosong / tak ada = bukan ampuan', () => {
    expect(ownsSekolah({ guru_sekolah: [] }, NAMA)).toBe(false)
    expect(ownsSekolah({}, NAMA)).toBe(false)
    expect(ownsSekolah({ guru_sekolah: ['Budi'] }, NAMA)).toBe(false)
  })
})

describe('ngaji vs sekolah adalah dua wilayah terpisah', () => {
  // Inilah yang hilang di InputBulananView: hanya sisi ngaji yang diperiksa, sehingga
  // guru yang MURNI wali kelas sekolah melihat daftar kosong.
  const santriSekolahSaja = { guru_sekolah: [NAMA], lembaga: 'PTPT', lembaga_sekolah: 'SDI' }

  it('wali kelas sekolah tak terjaring oleh pemeriksaan ngaji saja', () => {
    expect(ownsNgaji(santriSekolahSaja, NAMA)).toBe(false)
    expect(ownsSekolah(santriSekolahSaja, NAMA)).toBe(true)
  })

  it('penyaring gabungan (ngaji ATAU sekolah) menjaring keduanya', () => {
    const ampu = (s) => ownsNgaji(s, NAMA) || ownsSekolah(s, NAMA)
    expect(ampu(santriSekolahSaja)).toBe(true)
    expect(ampu({ guru_pagi: NAMA })).toBe(true)
    expect(ampu({ guru_pagi: 'Budi', guru_sekolah: ['Siti'] })).toBe(false)
  })
})

describe('headsLembaga — kepala/PJ tetap melihat lembaganya', () => {
  const kepalaSdi = { jabatan: 'Kepala SDI', jabatan_tambahan: '' }

  it('kepala mengenali lembaga yang DISEBUT jabatannya', () => {
    expect(headsLembaga(kepalaSdi, 'SDI')).toBe(true)
  })

  it('bukan lembaga yang cuma tempat ia mengajar', () => {
    expect(headsLembaga(kepalaSdi, 'PTPT')).toBe(false)
  })

  it('guru biasa tak memimpin apa pun', () => {
    expect(headsLembaga({ jabatan: 'Guru' }, 'SDI')).toBe(false)
    expect(headsLembaga(null, 'SDI')).toBe(false)
  })

  it('lembaga kosong tak pernah dianggap dipimpin', () => {
    expect(headsLembaga(kepalaSdi, '')).toBe(false)
    expect(headsLembaga(kepalaSdi, undefined)).toBe(false)
  })
})

describe('punyaGuruKategori — ngaji & sekolah dihitung terpisah', () => {
  it('santri berguru ngaji belum tentu sudah punya guru sekolah', () => {
    const s = { guru_pagi: NAMA }
    expect(punyaGuruKategori(s, 'ngaji')).toBe(true)
    expect(punyaGuruKategori(s, 'sekolah')).toBe(false)
  })

  it('guru_sekolah teks tunggal ikut terhitung', () => {
    expect(punyaGuruKategori({ guru_sekolah: NAMA }, 'sekolah')).toBe(true)
  })
})
