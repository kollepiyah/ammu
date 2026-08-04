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
import {
  groupOfLembaga,
  isSekolahLembaga,
  sekolahTierList,
  DEFAULT_LEMBAGA_SEED
} from '@/composables/useLembaga'
import { LEMBAGA_KENAIKAN_SEKOLAH } from '@/utils/kenaikan'
import { scanLembagaFix } from '@/utils/v100_lembagaFix'

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

// ─────────────────────────────────────────────────────────────────────────────
// sekolahTierList menggantikan konstanta ['TK','SDI','SMP','SMA'] yang dulu disalin
// di TIGA tempat NaikKelasView (SEKOLAH_KENAIKAN, SEKOLAH_MUT, LEMBAGA_KENAIKAN_SEKOLAH)
// dan menyetir dropdown kenaikan/mutasi/riwayat + label "Kelulusan vs Ceremonial".
// Kesetaraan untuk data seed WAJIB dibuktikan, bukan diklaim.
// ─────────────────────────────────────────────────────────────────────────────
describe('sekolahTierList — pengganti konstanta kenaikan sekolah', () => {
  it('KUNCI: untuk DEFAULT_LEMBAGA_SEED hasilnya PERSIS LEMBAGA_KENAIKAN_SEKOLAH', () => {
    // Nilai DAN urutan harus sama — dropdown kenaikan memakai urutan ini apa adanya.
    expect(sekolahTierList(DEFAULT_LEMBAGA_SEED)).toEqual(LEMBAGA_KENAIKAN_SEKOLAH)
  })

  it('PKBM dipecah jadi sub-tier SMP & SMA, payungnya sendiri tidak ikut', () => {
    const out = sekolahTierList(DEFAULT_LEMBAGA_SEED)
    expect(out).toContain('SMP')
    expect(out).toContain('SMA')
    expect(out).not.toContain('PKBM')
  })

  it('SKENARIO KYAI: sekolah tambahan ikut muncul, yang lama tetap utuh', () => {
    const out = sekolahTierList([...DEFAULT_LEMBAGA_SEED, { lembaga: 'SMK', tipe: 'Formal' }])
    expect(out).toEqual([...LEMBAGA_KENAIKAN_SEKOLAH, 'SMK'])
  })

  it('lembaga non-sekolah tak ikut terseret', () => {
    const out = sekolahTierList([
      ...DEFAULT_LEMBAGA_SEED,
      { lembaga: 'Koperasi', tipe: 'Non Lembaga' },
      { lembaga: 'Madrasah Diniyah', tipe: 'Qiraati' }
    ])
    expect(out).toEqual(LEMBAGA_KENAIKAN_SEKOLAH)
  })

  it('varian di bawah payung TK (tk_group) dilewati', () => {
    const out = sekolahTierList([
      ...DEFAULT_LEMBAGA_SEED,
      { lembaga: 'TK A', tk_group: 'TK', tipe: 'Formal' }
    ])
    expect(out).toEqual(LEMBAGA_KENAIKAN_SEKOLAH)
  })

  it('master kosong → daftar kosong (pemanggil yang pasang fallback konstanta)', () => {
    expect(sekolahTierList([])).toEqual([])
    expect(sekolahTierList(null)).toEqual([])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Migrasi Lembaga (Salah Impor) — Rule B ikut memakai penilaian yang sama.
//
// Kyai 4 Agu 2026: layar "Migrasi Lembaga" menampilkan 34 temuan
//   'Lembaga sekolah "Kelas Baca" bukan TK/SDI/PKBM → dikosongkan'
// dengan tombol Terapkan(34) siap ditekan. "Kelas Baca" itu sekolah SAH yang Kyai
// daftarkan sendiri (tipe Formal) — menekannya akan menghapus lembaga_sekolah DAN
// kelas_sekolah 34 santri. Akarnya daftar nama hardcoded v.100, kelas bug yang
// SAMA dengan keluhan 22 Jul di atas; v100_lembagaFix.js cuma terlewat ikut pindah.
// ─────────────────────────────────────────────────────────────────────────────
describe('scanLembagaFix Rule B — jangan kosongkan sekolah yang SAH', () => {
  const MASTER_NYATA = [
    { lembaga: 'TPQ Pagi', tipe: 'Qiraati', group: 'qiraati' },
    { lembaga: 'TPQ Sore', tipe: 'Qiraati', group: 'qiraati' },
    { lembaga: 'PTPT', tipe: 'Qiraati', group: 'qiraati' },
    { lembaga: 'TK', tipe: 'Formal', group: 'sekolah' },
    { lembaga: 'SDI', tipe: 'Formal', group: 'sekolah' },
    { lembaga: 'PKBM', tipe: 'Formal', group: 'sekolah' },
    { lembaga: "Ma'had", group: 'mahad' },
    // ↓ sekolah tambahan Kyai — TANPA `group`, cuma `tipe` (bentuk nyata master 4 Agu)
    { lembaga: 'Kelas Baca', tipe: 'Formal' }
  ]
  const ruleB = (santri, master) =>
    scanLembagaFix(santri, master).filter((f) => f.type === 'sekolah_invalid')

  it('KUNCI: "Kelas Baca" bertipe Formal BUKAN temuan', () => {
    const out = ruleB([{ id: '1', nama: 'Ahmad', lembaga_sekolah: 'Kelas Baca' }], MASTER_NYATA)
    expect(out).toEqual([])
  })

  it('pencocokan abai huruf besar/kecil & spasi (data impor tak seragam)', () => {
    const out = ruleB(
      [
        { id: '1', nama: 'A', lembaga_sekolah: 'kelas baca' },
        { id: '2', nama: 'B', lembaga_sekolah: '  KELAS BACA ' }
      ],
      MASTER_NYATA
    )
    expect(out).toEqual([])
  })

  it('maksud aslinya tetap jalan: nilai NGAJI di kolom sekolah tetap tertangkap', () => {
    const out = ruleB(
      [
        { id: '1', nama: 'A', lembaga_sekolah: 'TPQ Pagi' },
        { id: '2', nama: 'B', lembaga_sekolah: "Ma'had" }
      ],
      MASTER_NYATA
    )
    expect(out.map((f) => f.id)).toEqual(['1', '2'])
    expect(out[0].patch).toEqual({ lembaga_sekolah: '', kelas_sekolah: '' })
  })

  it('sekolah lama (TK/SDI/PKBM) tetap aman', () => {
    const out = ruleB(
      [
        { id: '1', nama: 'A', lembaga_sekolah: 'TK' },
        { id: '2', nama: 'B', lembaga_sekolah: 'SDI' },
        { id: '3', nama: 'C', lembaga_sekolah: 'PKBM' },
        { id: '4', nama: 'D', lembaga_sekolah: 'SMP' } // alias sub-tier PKBM
      ],
      MASTER_NYATA
    )
    expect(out).toEqual([])
  })

  it('master belum termuat → NOL temuan, bukan jatuh ke daftar nama lama', () => {
    const santri = [
      { id: '1', nama: 'A', lembaga_sekolah: 'Kelas Baca' },
      { id: '2', nama: 'B', lembaga_sekolah: 'TPQ Pagi' }
    ]
    expect(ruleB(santri, [])).toEqual([])
    expect(ruleB(santri, null)).toEqual([])
    expect(scanLembagaFix(santri).filter((f) => f.type === 'sekolah_invalid')).toEqual([])
  })

  it('nama tak dikenal DIBIARKAN (bisa sekolah yang belum didaftarkan)', () => {
    // Lebih baik satu typo lolos daripada satu sekolah sah dikosongkan.
    const out = ruleB([{ id: '1', nama: 'A', lembaga_sekolah: 'SMK Entah' }], MASTER_NYATA)
    expect(out).toEqual([])
  })

  it('santri non-aktif & lembaga_sekolah kosong tidak ikut discan', () => {
    const out = ruleB(
      [
        { id: '1', nama: 'A', lembaga_sekolah: 'TPQ Pagi', aktif: false },
        { id: '2', nama: 'B', lembaga_sekolah: '' }
      ],
      MASTER_NYATA
    )
    expect(out).toEqual([])
  })

  it('Rule A (kelas ↔ lembaga) tidak terpengaruh gerbang master', () => {
    const out = scanLembagaFix([{ id: '1', nama: 'A', kelas: 'Level 3', lembaga: 'PTPT' }], [])
    expect(out.map((f) => f.type)).toEqual(['kelas_lembaga'])
    expect(out[0].saranLembaga).toBe('Pra PTPT')
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
