// Kyai (22 Jul 2026): "saya menambah lembaga sekolah baru tapi tidak terdeteksi sekolah."
//
// Akarnya: deteksi "ini sekolah" tersebar sebagai daftar NAMA hardcoded di banyak file
//   ['TK','SDI','MI','MTS','MA','SMP','SMA','PKBM'].some((s) => n.includes(s))
// padahal penanda yang Kyai isi di Master Data adalah `tipe: 'Formal'`.
//
// Dua bug sekaligus dari pola itu:
//   1. lembaga baru di luar daftar (mis. "SMK") TAK PERNAH dikenali sekolah;
//   2. cocok-substring bikin "Ma'had" DIANGGAP sekolah — ia mengandung "MA".
import { describe, it, expect } from 'vitest'
import { groupOfLembaga, isSekolahLembaga } from '@/composables/useLembaga'

// Bentuk baris master/lembaga yang nyata di lapangan:
//   - baris SEED lama  -> punya `group`, sering TANPA `tipe`
//   - baris tambahan Kyai lewat form -> punya `tipe`, TAK PERNAH punya `group`
//     (useLembagaForm.save hanya menulis lembaga/tipe/kelas/jabatan/shift_count)
const MASTER = [
  { lembaga: 'TPQ Pagi', group: 'qiraati' },
  { lembaga: 'PTPT', group: 'qiraati' },
  { lembaga: "Ma'had", group: 'mahad' },
  { lembaga: 'SDI', group: 'sekolah' },
  { lembaga: 'PKBM', group: 'sekolah' },
  { lembaga: 'Yayasan', group: 'non-lembaga' },
  // ↓ yang baru ditambah Kyai — TANPA `group`, cuma `tipe`
  { lembaga: 'SMK', tipe: 'Formal' },
  { lembaga: 'Madrasah Diniyah', tipe: 'Qiraati' },
  { lembaga: 'Koperasi', tipe: 'Non Lembaga' }
]

describe('groupOfLembaga — SKENARIO KYAI: lembaga sekolah baru', () => {
  it('lembaga tambahan bertipe Formal TERDETEKSI sekolah', () => {
    expect(groupOfLembaga('SMK', MASTER)).toBe('sekolah')
    expect(isSekolahLembaga('SMK', MASTER)).toBe(true)
  })

  it('penyaring LAMA gagal pada kasus yang sama (bukti bugnya)', () => {
    // Persis pola hardcoded yang dipakai useStatistikDashboard & RingkasanSantriLembaga.
    const penyaringLama = (nama) =>
      ['TK', 'SDI', 'MI', 'MTS', 'MA', 'SMP', 'SMA', 'PKBM'].some((s) =>
        String(nama || '')
          .toUpperCase()
          .includes(s)
      )
    expect(penyaringLama('SMK')).toBe(false) // ← keluhan Kyai
    expect(isSekolahLembaga('SMK', MASTER)).toBe(true) // ← sesudah diperbaiki
  })

  it('REGRESI: Ma\'had BUKAN sekolah (dulu lolos karena mengandung "MA")', () => {
    expect(groupOfLembaga("Ma'had", MASTER)).toBe('mahad')
    expect(isSekolahLembaga("Ma'had", MASTER)).toBe(false)
  })

  it('tipe Qiraati / Non Lembaga tidak ikut terseret jadi sekolah', () => {
    expect(groupOfLembaga('Madrasah Diniyah', MASTER)).toBe('qiraati')
    expect(groupOfLembaga('Koperasi', MASTER)).toBe('non-lembaga')
  })
})

describe('groupOfLembaga — urutan baca: tipe → group → konstanta', () => {
  it('1. `tipe` menang atas `group` (Kyai baru saja mengubahnya di Master Data)', () => {
    const list = [{ lembaga: 'PKBM', group: 'sekolah', tipe: 'Qiraati' }]
    expect(groupOfLembaga('PKBM', list)).toBe('qiraati')
  })

  it('2. baris seed TANPA `tipe` tetap terbaca dari `group`', () => {
    expect(groupOfLembaga('SDI', MASTER)).toBe('sekolah')
    expect(groupOfLembaga('TPQ Pagi', MASTER)).toBe('qiraati')
    expect(groupOfLembaga('Yayasan', MASTER)).toBe('non-lembaga')
  })

  it('3. master belum termuat → jatuh ke konstanta LEMBAGA_GROUPS', () => {
    // Penting: helper ini kerap dipanggil SEBELUM subscribe master/lembaga selesai.
    expect(groupOfLembaga('SDI', [])).toBe('sekolah')
    expect(groupOfLembaga('TPQ Sore', [])).toBe('qiraati')
    expect(groupOfLembaga('PPPH', undefined)).toBe('qiraati')
    expect(groupOfLembaga('Yayasan', null)).toBe('non-lembaga')
  })

  it('3b. alias ikut kebaca lewat canonLembaga (SMP/SMA = sub-tier PKBM)', () => {
    // useStatistikDashboard memecah PKBM jadi baris sintetis SMP & SMA yang TIDAK
    // ada di master — keduanya wajib tetap dihitung sekolah.
    expect(isSekolahLembaga('SMP', MASTER)).toBe(true)
    expect(isSekolahLembaga('SMA', MASTER)).toBe(true)
    expect(isSekolahLembaga('SD', MASTER)).toBe(true) // alias SDI
  })
})

describe('groupOfLembaga — bentuk data & masukan aneh', () => {
  it('baris master boleh {nama} maupun {lembaga}', () => {
    expect(groupOfLembaga('SMK', [{ nama: 'SMK', tipe: 'Formal' }])).toBe('sekolah')
  })

  it('pencocokan nama abai huruf besar/kecil, spasi, dan tanda baca', () => {
    expect(groupOfLembaga('  smk  ', MASTER)).toBe('sekolah')
    expect(groupOfLembaga('MA HAD', MASTER)).toBe('mahad')
  })

  it('nama kosong / null → non-lembaga, tidak melempar', () => {
    expect(groupOfLembaga('', MASTER)).toBe('non-lembaga')
    expect(groupOfLembaga(null, MASTER)).toBe('non-lembaga')
    expect(groupOfLembaga(undefined, undefined)).toBe('non-lembaga')
    expect(isSekolahLembaga(null, null)).toBe(false)
  })

  it('lembaga tak dikenal sama sekali → non-lembaga (bukan sekolah)', () => {
    expect(groupOfLembaga('Entah Apa', MASTER)).toBe('non-lembaga')
    expect(isSekolahLembaga('Entah Apa', MASTER)).toBe(false)
  })
})
