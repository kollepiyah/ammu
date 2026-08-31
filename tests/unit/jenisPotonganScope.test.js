// Kyai (31 Agu 2026): "untuk potongan tambahkan filter seperti jenis bisyaroh dan
// tunjangan. dan tambahkan filter laki2 atau perempuan."
//
// Dua hal yang dikunci di sini:
//   1. Potongan memakai MESIN SCOPE yang sama dengan Jenis Bisyaroh & Tunjangan, dan
//      selama `keuPotonganJenis` belum pernah disimpan ia jatuh mundur ke `master_potongan`
//      lama — supaya slip tak berubah sebelum Kyai menyentuh Pengaturan.
//   2. Penyaring jenis kelamin berlaku pada KETIGA daftar, dan guru yang kolom L/P-nya
//      kosong TIDAK ikut: menebak jenis kelamin berarti memotong (atau membayar) uang atas
//      data yang tak ada.
import { describe, it, expect } from 'vitest'
import {
  normalizeJenisPotongan,
  jenisPotonganList,
  barisPotongan,
  totalPotongan,
  ringkasScope,
  kanonJk,
  jenisKenaGuru,
  barisBisyaroh,
  barisTunjangan,
  normalizeJenisBisyaroh,
  normalizeJenisTunjangan
} from '@/utils/bisyarohScope'

// Guru rujukan: laki-laki, Guru di PTPT, shift pagi.
const ctxPria = {
  guruId: '7',
  jk: 'L',
  refs: [{ lembaga: 'PTPT', jabatan_di_sini: 'Guru', group: 'ngaji' }],
  shiftIds: new Set(['pagi']),
  hadirPerShift: { pagi: 20 },
  hadirTepatPerShift: { pagi: 18 },
  efektifPerShift: { pagi: 20 },
  tahunPengabdian: 9
}
const ctxWanita = { ...ctxPria, guruId: '8', jk: 'P' }
const ctxTanpaJk = { ...ctxPria, guruId: '9', jk: '' }

describe('kanonJk', () => {
  it('meringkas ejaan manusia ke L/P', () => {
    expect(kanonJk('L')).toBe('L')
    expect(kanonJk('laki-laki')).toBe('L')
    expect(kanonJk('Pria')).toBe('L')
    expect(kanonJk('P')).toBe('P')
    expect(kanonJk('Perempuan')).toBe('P')
    expect(kanonJk('wanita')).toBe('P')
  })

  it('nilai kosong / tak dikenali jadi string kosong', () => {
    expect(kanonJk('')).toBe('')
    expect(kanonJk(null)).toBe('')
    expect(kanonJk('-')).toBe('')
  })

  it('normalisasi membuang nilai sampah dari scope, tak menyimpannya', () => {
    const j = normalizeJenisPotongan({ label: 'X', scope: { jk: ['p', 'PEREMPUAN', 'xyz'] } })
    expect(j.scope.jk).toEqual(['P']) // dedupe + buang sampah
  })
})

describe('penyaring jenis kelamin berlaku di ketiga daftar', () => {
  const scopeP = { jk: ['P'] }

  it('Jenis Bisyaroh: scope Perempuan tak kena ke guru laki-laki', () => {
    const j = normalizeJenisBisyaroh({ label: 'Pokok Putri', nominal: 500000, scope: scopeP })
    expect(barisBisyaroh([j], ctxWanita)).toHaveLength(1)
    expect(barisBisyaroh([j], ctxPria)).toHaveLength(0)
  })

  it('Jenis Tunjangan: sama perlakuannya', () => {
    const j = normalizeJenisTunjangan({ label: 'Tunjangan Putri', nominal: 100000, scope: scopeP })
    expect(barisTunjangan([j], ctxWanita)).toHaveLength(1)
    expect(barisTunjangan([j], ctxPria)).toHaveLength(0)
  })

  it('Jenis Potongan: sama perlakuannya', () => {
    const j = normalizeJenisPotongan({ label: 'Seragam Putri', nominal: 25000, scope: scopeP })
    expect(barisPotongan([j], ctxWanita)).toHaveLength(1)
    expect(barisPotongan([j], ctxPria)).toHaveLength(0)
  })

  it('guru tanpa data L/P TIDAK ikut saat penyaring dipakai', () => {
    const j = normalizeJenisPotongan({ label: 'Seragam Putri', nominal: 25000, scope: scopeP })
    expect(barisPotongan([j], ctxTanpaJk)).toHaveLength(0)
  })

  it('scope jk kosong = tak menyaring — semua kena, termasuk yang L/P-nya kosong', () => {
    const j = normalizeJenisPotongan({ label: 'Kasbon', nominal: 50000 })
    for (const ctx of [ctxPria, ctxWanita, ctxTanpaJk]) {
      expect(barisPotongan([j], ctx)).toHaveLength(1)
    }
  })

  it('jk di-AND dengan kriteria lain, bukan di-OR', () => {
    // Perempuan DI PTPT. Guru perempuan di lembaga lain tak kena.
    const j = normalizeJenisPotongan({
      label: 'Iuran Putri PTPT',
      nominal: 10000,
      scope: { jk: ['P'], lembaga: ['PTPT'] }
    })
    expect(jenisKenaGuru(j, ctxWanita)).toBe(true)
    expect(
      jenisKenaGuru(j, {
        ...ctxWanita,
        refs: [{ lembaga: 'SDI', jabatan_di_sini: 'Guru', group: 'sekolah' }]
      })
    ).toBe(false)
  })

  it('dua-duanya dicentang = semua, tapi yang L/P-nya kosong tetap di luar', () => {
    const j = normalizeJenisPotongan({ label: 'Iuran', nominal: 5000, scope: { jk: ['L', 'P'] } })
    expect(barisPotongan([j], ctxPria)).toHaveLength(1)
    expect(barisPotongan([j], ctxWanita)).toHaveLength(1)
    expect(barisPotongan([j], ctxTanpaJk)).toHaveLength(0)
  })
})

describe('barisPotongan', () => {
  it('tiap jenis yang cocok = satu baris, semuanya dijumlahkan', () => {
    const list = [
      normalizeJenisPotongan({ label: 'Kasbon', nominal: 50000 }),
      normalizeJenisPotongan({ label: 'Koperasi', nominal: 15000 })
    ]
    const baris = barisPotongan(list, ctxPria)
    expect(baris.map((b) => b.label)).toEqual(['Kasbon', 'Koperasi'])
    expect(baris.every((b) => b.kategori === 'potongan')).toBe(true)
    expect(totalPotongan(list, ctxPria)).toBe(65000)
  })

  it('nominal POSITIF — tanda minusnya urusan penjumlah slip', () => {
    const list = [normalizeJenisPotongan({ label: 'Kasbon', nominal: 50000 })]
    expect(barisPotongan(list, ctxPria)[0].nominal).toBe(50000)
  })

  it('jenis nonaktif tak memotong apa pun', () => {
    const list = [normalizeJenisPotongan({ label: 'Kasbon', nominal: 50000, aktif: false })]
    expect(barisPotongan(list, ctxPria)).toHaveLength(0)
    expect(totalPotongan(list, ctxPria)).toBe(0)
  })

  it('scope per-orang tetap jalan seperti model lama', () => {
    const j = normalizeJenisPotongan({
      label: 'Kasbon Pribadi',
      nominal: 200000,
      scope: { guru_ids: ['7'] }
    })
    expect(barisPotongan([j], ctxPria)).toHaveLength(1)
    expect(barisPotongan([j], ctxWanita)).toHaveLength(0)
  })

  it('daftar kosong / null aman', () => {
    expect(barisPotongan([], ctxPria)).toEqual([])
    expect(barisPotongan(null, ctxPria)).toEqual([])
    expect(totalPotongan(null, ctxPria)).toBe(0)
  })
})

describe('jenisPotonganList — jembatan dari master_potongan lama', () => {
  it('kunci baru belum pernah disimpan → turunkan dari master_potongan', () => {
    const list = jenisPotonganList({
      master_potongan: [{ nama: 'Kasbon', nominal: 50000, guru_ids: ['7'] }]
    })
    expect(list).toHaveLength(1)
    expect(list[0].label).toBe('Kasbon')
    expect(list[0].nominal).toBe(50000)
    expect(list[0].scope.guru_ids).toEqual(['7'])
    // slip TIDAK boleh berubah sebelum Kyai menyentuh Pengaturan
    expect(totalPotongan(list, ctxPria)).toBe(50000)
  })

  it('kunci baru ADA tapi kosong = memang dihapus, bukan belum bermigrasi', () => {
    const list = jenisPotonganList({
      keuPotonganJenis: [],
      master_potongan: [{ nama: 'Kasbon', nominal: 50000 }]
    })
    expect(list).toEqual([])
  })

  it('kunci baru menang atas daftar lama', () => {
    const list = jenisPotonganList({
      keuPotonganJenis: [{ label: 'Seragam Putri', nominal: 25000, scope: { jk: ['P'] } }],
      master_potongan: [{ nama: 'Kasbon', nominal: 50000 }]
    })
    expect(list.map((j) => j.label)).toEqual(['Seragam Putri'])
    expect(totalPotongan(list, ctxWanita)).toBe(25000)
    expect(totalPotongan(list, ctxPria)).toBe(0)
  })

  it('settings kosong → daftar kosong, bukan galat', () => {
    expect(jenisPotonganList(null)).toEqual([])
    expect(jenisPotonganList({})).toEqual([])
  })

  it('baris tanpa nama dibuang (id kosong = tak bisa dirujuk slip)', () => {
    expect(jenisPotonganList({ keuPotonganJenis: [{ label: '  ', nominal: 1000 }] })).toEqual([])
  })
})

describe('ringkasScope — satu kalimat untuk ketiga tabel', () => {
  it('scope kosong berbunyi "Semua guru/pegawai"', () => {
    expect(ringkasScope({})).toBe('Semua guru/pegawai')
    expect(ringkasScope(null)).toBe('Semua guru/pegawai')
  })

  it('menyebut jenis kelamin dengan kata manusia, bukan huruf', () => {
    expect(ringkasScope({ jk: ['P'] })).toBe('Perempuan')
    expect(ringkasScope({ jk: ['L', 'P'] })).toBe('Laki-laki + Perempuan')
  })

  it('menggabung semua kriteria dengan pemisah yang sama', () => {
    const teks = ringkasScope(
      { jabatan: ['Guru'], lembaga: ['PTPT'], shift: ['pagi'], jk: ['L'], guru_ids: ['1', '2'] },
      (id) => (id === 'pagi' ? 'Pagi' : id)
    )
    expect(teks).toBe('Guru · PTPT · shift Pagi · Laki-laki · 2 orang')
  })
})
