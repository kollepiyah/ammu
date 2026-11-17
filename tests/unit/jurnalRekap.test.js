// Kyai 17 Nov 2026: "saya ingin jurnal itu ada rekapannya selama satu bulan, bisa ekspor pdf."
// Angka rekap dipakai BERSAMA oleh layar (tab Riwayat) dan PDF, jadi diuji di sini sekali —
// kalau kertas dan layar berselisih, itu selalu karena ada yang menghitung sendiri.
import { describe, it, expect } from 'vitest'
import { rekapJurnalBulan, sesiJurnalBulan, kelasJurnalBulan } from '@/utils/jurnalRekap'

const kelasList = [
  { key: 'indah', guru: 'Indah', juz: '3', santri: [{ id: 's1' }, { id: 's2' }] },
  { key: 'siti', guru: 'Siti', juz: '5', santri: [{ id: 's3' }] }
]

// Satu kelas membaca BERSAMA: baris per santri, isinya sama. Itulah bentuk nyata simpanan.
function sekelas(tanggal, sesi, kelas_key, halaman, juz, ids, extra = {}) {
  return ids.map((id) => ({
    id: `${tanggal}_${sesi}_${id}`,
    tanggal,
    sesi,
    kelas_key,
    santri_id: id,
    santri_nama: id.toUpperCase(),
    halaman,
    juz,
    guru_nama: 'Indah',
    ...extra
  }))
}

const rows = [
  ...sekelas('2026-11-02', 'tadarus', 'indah', 10, 1, ['s1', 's2']),
  ...sekelas('2026-11-02', 'laju1', 'indah', 12, 1, ['s1', 's2'], { catatan: 'lancar' }),
  ...sekelas('2026-11-05', 'laju2', 'indah', 20, 1, ['s1', 's2']),
  ...sekelas('2026-11-05', 'laju1', 'siti', 30, 2, ['s3'], { guru_nama: 'Siti' })
]

describe('sesiJurnalBulan — satu baris per sesi', () => {
  it('mengelompokkan tanggal × sesi × kelas, bukan per santri', () => {
    const s = sesiJurnalBulan(rows)
    expect(s).toHaveLength(4)
    expect(s[0]).toMatchObject({
      tanggal: '2026-11-02',
      sesi: 'tadarus',
      kelasKey: 'indah',
      nSantri: 2
    })
  })

  it('urut maju: tanggal lalu Tadarus → Laju 1 → Laju 2', () => {
    expect(sesiJurnalBulan(rows).map((x) => `${x.tanggal}|${x.sesi}`)).toEqual([
      '2026-11-02|tadarus',
      '2026-11-02|laju1',
      '2026-11-05|laju1',
      '2026-11-05|laju2'
    ])
  })

  it('posisi "beragam" kalau santri sekelas tak seragam — tanda ada yang diisi per anak', () => {
    const campur = [
      ...sekelas('2026-11-09', 'laju1', 'indah', 40, 2, ['s1']),
      ...sekelas('2026-11-09', 'laju1', 'indah', 41, 2, ['s2'])
    ]
    expect(sesiJurnalBulan(campur)[0].posisi).toBe('beragam')
  })

  it('catatan & pencatat digabung tanpa kembar', () => {
    const s = sesiJurnalBulan(rows).find((x) => x.sesi === 'laju1' && x.kelasKey === 'indah')
    expect(s.catatan).toBe('lancar')
    expect(s.pencatat).toBe('Indah')
  })
})

describe('kelasJurnalBulan — rekap per kelas', () => {
  it('menghitung sesi, hari, dan posisi awal → akhir', () => {
    const k = kelasJurnalBulan(rows, { kelasList }).find((x) => x.key === 'indah')
    expect(k).toMatchObject({ nSesi: 3, nHari: 2, nSantriTercatat: 2, nSantriKelas: 2 })
    expect(k.tglAwal).toBe('2026-11-02')
    expect(k.tglAkhir).toBe('2026-11-05')
    expect(k.majuHalaman).toBe(10) // halaman 10 → 20
  })

  it('kelas TANPA satu pun catatan tetap muncul dengan nol — itu yang perlu terlihat', () => {
    const k = kelasJurnalBulan([], { kelasList })
    expect(k).toHaveLength(2)
    expect(k.every((x) => x.nSesi === 0 && x.awal === '')).toBe(true)
  })

  it('mundur (murojaah) dibiarkan negatif, tidak disembunyikan', () => {
    const mundur = [
      ...sekelas('2026-11-01', 'laju1', 'indah', 50, 3, ['s1']),
      ...sekelas('2026-11-03', 'laju1', 'indah', 45, 3, ['s1'])
    ]
    expect(kelasJurnalBulan(mundur, { kelasList }).find((x) => x.key === 'indah').majuHalaman).toBe(
      -5
    )
  })

  it('kelas yang hilang dari daftar kelas tetap terhitung dari barisnya', () => {
    const asing = sekelas('2026-11-04', 'laju1', 'kelas-bubar', 9, 1, ['s9'])
    const k = kelasJurnalBulan(asing, { kelasList }).find((x) => x.key === 'kelas-bubar')
    expect(k).toMatchObject({ nSesi: 1, guru: '', nSantriKelas: 0 })
  })
})

describe('rekapJurnalBulan — ringkasan sebulan', () => {
  it('angka ringkasnya sesuai isi', () => {
    const r = rekapJurnalBulan(rows, { kelasList, bulan: '2026-11' })
    expect(r.bulan).toBe('2026-11')
    expect(r.total).toMatchObject({
      nSesi: 4,
      nHari: 2,
      nKelasAktif: 2,
      nKelasKosong: 0,
      nSantri: 3
    })
    expect(r.total.perSesiJenis).toEqual({ tadarus: 1, laju1: 2, laju2: 1 })
  })

  it('menghitung kelas yang bulan itu kosong', () => {
    const r = rekapJurnalBulan(sekelas('2026-11-02', 'laju1', 'indah', 5, 1, ['s1']), {
      kelasList,
      bulan: '2026-11'
    })
    expect(r.total).toMatchObject({ nKelasAktif: 1, nKelasKosong: 1 })
  })

  it('bulan kosong → nol semua, tak melempar', () => {
    const r = rekapJurnalBulan([], { kelasList, bulan: '2026-12' })
    expect(r.total.nSesi).toBe(0)
    expect(r.sesi).toEqual([])
    expect(rekapJurnalBulan()).toMatchObject({ total: { nSesi: 0 } })
  })
})
