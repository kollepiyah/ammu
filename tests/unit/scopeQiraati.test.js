import { describe, it, expect } from 'vitest'
import { scopeQiraati } from '@/utils/guruScope'

// Kyai (5 Agu 2026): "Akun Kepala SDI yg juga guru PTPT, di data santri sudah benar,
// tapi di rekap prestasi PTPT masih muncul semua santri SDI yg PTPT, harusnya santri
// kelasnya saja."
//
// Dua sebab bertumpuk di RekapPrestasiView lama:
//   1) isFullFilterRole() memperlakukan SETIAP kepala sebagai admin-penuh -> penyaring
//      "santri ampuan" tak pernah dijalankan untuk kepala;
//   2) penyaringnya memakai `sesi.lembaga` = lembaga tempat ia MENGAJAR ngaji, bukan
//      lembaga yang ia PIMPIN (itu ada di jabatan: "Kepala SDI").
//
// Aturan yang benar di layar QIRAATI: kuasa penuh hanya di lembaga NGAJI yang dipimpin.
// Kepala SEKOLAH boleh MELIHAT santri kelas sekolahnya (read-only) tapi tak boleh
// mengubah nilai qiraati — itu wilayah Rekap Diniyah.

// Kepala SDI yang juga guru ngaji PTPT. `lembaga` = tempat ia MENGAJAR (PTPT);
// yang ia PIMPIN disebut jabatan (SDI). Inilah akun dari laporan Kyai.
const kepalaSdi = {
  id: 'g1',
  nama: 'Ust. Hasan',
  guru: 'Ust. Hasan',
  role_sistem: 'guru',
  jabatan: 'Kepala SDI',
  lembaga: 'PTPT'
}

// Kepala PTPT — kepala lembaga NGAJI, jadi kuasanya penuh atas santri PTPT.
const kepalaPtpt = {
  id: 'g2',
  nama: 'Ust. Umar',
  guru: 'Ust. Umar',
  role_sistem: 'guru',
  jabatan: 'Kepala PTPT',
  lembaga: 'PTPT'
}

const guruBiasa = {
  id: 'g3',
  nama: 'Ust. Zaid',
  guru: 'Ust. Zaid',
  role_sistem: 'guru',
  jabatan: 'Guru',
  lembaga: 'PTPT'
}

const superAdmin = { id: 'g9', nama: 'Mudir', role_sistem: 'super_admin' }
const adminKeuangan = { id: 'g8', nama: 'Bendahara', role_sistem: 'admin_keuangan' }

// Santri PTPT yang sekolahnya SDI, DI KELAS NGAJI Ust. Hasan.
const ampuanHasan = {
  id: 's1',
  nama: 'Santri A',
  lembaga: 'PTPT',
  lembaga_sekolah: 'SDI',
  guru_pagi: 'Ust. Hasan'
}
// Santri PTPT yang sekolahnya SDI, TAPI kelas ngajinya orang lain. Inilah yang dulu
// bocor ke layar Kepala SDI.
const sdiBukanAmpuan = {
  id: 's2',
  nama: 'Santri B',
  lembaga: 'PTPT',
  lembaga_sekolah: 'SDI',
  guru_pagi: 'Ust. Umar'
}
// Santri PTPT di kelas SEKOLAH Ust. Hasan (dia wali kelasnya) — boleh dilihat, tak boleh diedit.
const kelasSekolahHasan = {
  id: 's3',
  nama: 'Santri C',
  lembaga: 'PTPT',
  lembaga_sekolah: 'SDI',
  guru_pagi: 'Ust. Umar',
  guru_sekolah: ['Ust. Hasan']
}
// Santri PPPH, tak ada hubungannya dengan siapa pun di atas.
const luarSemua = {
  id: 's4',
  nama: 'Santri D',
  lembaga: 'PPPH',
  lembaga_sekolah: 'PKBM',
  guru_pagi: 'Ust. Ali'
}

describe('scopeQiraati — Kepala SDI yang juga guru ngaji PTPT', () => {
  const sc = scopeQiraati(kepalaSdi)

  it('dikenali sebagai kepala, bukan admin penuh', () => {
    expect(sc.adminPenuh).toBe(false)
    expect(sc.kepala).toBe(true)
  })

  it('REGRESI: santri SDI yang BUKAN kelasnya tidak muncul', () => {
    expect(sc.lihat(sdiBukanAmpuan)).toBe(false)
    expect(sc.edit(sdiBukanAmpuan)).toBe(false)
  })

  it('santri kelas NGAJI-nya muncul & boleh diedit', () => {
    expect(sc.lihat(ampuanHasan)).toBe(true)
    expect(sc.edit(ampuanHasan)).toBe(true)
  })

  it('santri kelas SEKOLAH-nya boleh dilihat tapi read-only (nilai qiraati bukan wilayahnya)', () => {
    expect(sc.lihat(kelasSekolahHasan)).toBe(true)
    expect(sc.edit(kelasSekolahHasan)).toBe(false)
  })

  it('santri lembaga lain tetap tertutup', () => {
    expect(sc.lihat(luarSemua)).toBe(false)
  })
})

describe('scopeQiraati — kepala lembaga NGAJI tetap berkuasa penuh', () => {
  const sc = scopeQiraati(kepalaPtpt)

  it('semua santri PTPT terlihat & bisa diedit, bukan hanya ampuannya', () => {
    expect(sc.lihat(sdiBukanAmpuan)).toBe(true)
    expect(sc.edit(sdiBukanAmpuan)).toBe(true)
    expect(sc.lihat(ampuanHasan)).toBe(true)
    expect(sc.edit(ampuanHasan)).toBe(true)
  })

  it('lembaga qiraati LAIN tidak ikut', () => {
    expect(sc.lihat(luarSemua)).toBe(false)
    expect(sc.edit(luarSemua)).toBe(false)
  })
})

describe('scopeQiraati — guru biasa (perilaku lama harus tetap)', () => {
  const sc = scopeQiraati(guruBiasa)

  it('bukan kepala', () => {
    expect(sc.kepala).toBe(false)
    expect(sc.adminPenuh).toBe(false)
  })

  it('hanya santri ampuannya', () => {
    const punyaZaid = { id: 's5', lembaga: 'PTPT', guru_sore: 'Ust. Zaid' }
    expect(sc.lihat(punyaZaid)).toBe(true)
    expect(sc.edit(punyaZaid)).toBe(true)
    expect(sc.lihat(sdiBukanAmpuan)).toBe(false)
  })

  it('santri kelas sekolahnya read-only', () => {
    const kelasSekolahZaid = { id: 's6', lembaga: 'PTPT', guru_sekolah: ['Ust. Zaid'] }
    expect(sc.lihat(kelasSekolahZaid)).toBe(true)
    expect(sc.edit(kelasSekolahZaid)).toBe(false)
  })
})

describe('scopeQiraati — peran lain', () => {
  it('super_admin: semua terbuka', () => {
    const sc = scopeQiraati(superAdmin)
    expect(sc.adminPenuh).toBe(true)
    expect(sc.lihat(luarSemua)).toBe(true)
    expect(sc.edit(luarSemua)).toBe(true)
  })

  it('id "admin" bawaan: semua terbuka', () => {
    const sc = scopeQiraati({ id: 'admin' })
    expect(sc.adminPenuh).toBe(true)
    expect(sc.edit(luarSemua)).toBe(true)
  })

  it('admin_keuangan BUKAN admin penuh di layar akademik', () => {
    const sc = scopeQiraati(adminKeuangan)
    expect(sc.adminPenuh).toBe(false)
    expect(sc.lihat(luarSemua)).toBe(false)
    expect(sc.edit(ampuanHasan)).toBe(false)
  })

  it('sesi null/kosong tak membuka apa pun', () => {
    const sc = scopeQiraati(null)
    expect(sc.adminPenuh).toBe(false)
    expect(sc.lihat(ampuanHasan)).toBe(false)
    expect(sc.edit(ampuanHasan)).toBe(false)
  })

  it('nama guru dicocokkan tanpa peduli huruf besar-kecil & spasi', () => {
    const sc = scopeQiraati({ ...guruBiasa, guru: '  UST. ZAID ' })
    expect(sc.edit({ id: 's7', lembaga: 'PTPT', guru_pagi: 'Ust. Zaid' })).toBe(true)
  })

  it('jabatan tambahan juga dihitung sebagai kepala', () => {
    const sc = scopeQiraati({
      ...guruBiasa,
      jabatan: 'Guru',
      jabatan_tambahan: 'Kepala PTPT'
    })
    expect(sc.kepala).toBe(true)
    expect(sc.edit(sdiBukanAmpuan)).toBe(true)
  })

  it('jabatan yang KEBETULAN memuat kata lembaga tanpa "kepala" tak memberi kuasa', () => {
    const sc = scopeQiraati({ ...guruBiasa, jabatan: 'Guru PTPT' })
    expect(sc.kepala).toBe(false)
    expect(sc.edit(sdiBukanAmpuan)).toBe(false)
  })
})
