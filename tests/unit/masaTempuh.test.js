// Kyai (21 Jul 2026): "untuk santri PTPT saya ingin tes kenaikan antar juz ada masa
// tempuh ketika lulus tes... dihitung dari hari aktif antara juz sebelumnya dg juz
// yg dites."
//
// "Hari aktif" = HARI EFEKTIF LEMBAGA (kalender minus Jumat minus libur kalender),
// bukan hari hadir santri — absensi ngaji hanya tersimpan per bulan.
import { describe, it, expect } from 'vitest'
import { hariEfektif, masaTempuhJuz, riwayatLulusJuz, labelMasaTempuh } from '@/utils/masaTempuh'

// 2026-01-01 = Kamis. Jadi 2026-01-02 Jumat, 01-09 Jumat, dst.
describe('hariEfektif', () => {
  it('hari lulus juz LAMA tidak ikut dihitung (eksklusif), hari lulus baru ikut', () => {
    // Kam 1 → Sab 3: yang dihitung 2 (Jum, libur) + 3 (Sab) = 1 hari.
    expect(hariEfektif('2026-01-01', '2026-01-03')).toBe(1)
  })

  it('Jumat dibuang secara default (settings.liburJumat)', () => {
    // 01-01 Kam → 01-08 Kam = 7 hari kalender, 1 Jumat (01-02) → 6.
    expect(hariEfektif('2026-01-01', '2026-01-08')).toBe(6)
  })

  it('liburJumat:false → Jumat ikut dihitung', () => {
    expect(hariEfektif('2026-01-01', '2026-01-08', { liburJumat: false })).toBe(7)
  })

  it('tanggal libur kalender ikut dibuang', () => {
    const libur = new Set(['2026-01-05', '2026-01-06'])
    expect(hariEfektif('2026-01-01', '2026-01-08', { libur })).toBe(4)
  })

  it('libur yang jatuh di Jumat tidak dihitung dua kali', () => {
    const libur = new Set(['2026-01-02']) // Jumat
    expect(hariEfektif('2026-01-01', '2026-01-08', { libur })).toBe(6)
  })

  it('menerima ISO penuh (tgl_hasil disimpan sebagai ISO timestamp)', () => {
    expect(hariEfektif('2026-01-01T09:15:00.000Z', '2026-01-08T02:00:00.000Z')).toBe(6)
  })

  it('tanggal akhir <= awal → 0, bukan negatif', () => {
    expect(hariEfektif('2026-01-08', '2026-01-01')).toBe(0)
    expect(hariEfektif('2026-01-01', '2026-01-01')).toBe(0)
  })

  it('tanggal tak terbaca → null (bukan NaN yang bocor ke layar)', () => {
    expect(hariEfektif('', '2026-01-08')).toBe(null)
    expect(hariEfektif('ngawur', '2026-01-08')).toBe(null)
    expect(hariEfektif(null, undefined)).toBe(null)
  })

  it('rentang ngawur bertahun-tahun tetap berhenti (guard MAX_HARI)', () => {
    const n = hariEfektif('1990-01-01', '2026-01-01')
    expect(Number.isFinite(n)).toBe(true)
    expect(n).toBeLessThanOrEqual(366 * 5)
  })
})

const A = (o) => ({
  santri_id: 's1',
  lembaga: 'PTPT',
  jenis: 'juz',
  status: 'lulus',
  ...o
})

describe('riwayatLulusJuz', () => {
  const list = [
    A({ id: 'a2', tgl_hasil: '2026-03-01', target: '6' }),
    A({ id: 'a1', tgl_hasil: '2026-01-01', target: '5' }),
    A({ id: 'x1', tgl_hasil: '2026-02-01', status: 'ditolak' }),
    A({ id: 'x2', tgl_hasil: '2026-02-01', santri_id: 's2' }),
    A({ id: 'x3', tgl_hasil: '2026-02-01', lembaga: 'TPQ' }),
    A({ id: 'x4', tgl_hasil: '2026-02-01', jenis: 'kelas' })
  ]

  it('hanya ajuan lulus, PTPT, jenis juz, santri yang sama — urut menaik', () => {
    expect(riwayatLulusJuz(list, 's1').map((a) => a.id)).toEqual(['a1', 'a2'])
  })

  it('santri tanpa riwayat → []', () => {
    expect(riwayatLulusJuz(list, 's9')).toEqual([])
    expect(riwayatLulusJuz(list, '')).toEqual([])
  })
})

describe('masaTempuhJuz', () => {
  const a1 = A({ id: 'a1', tgl_hasil: '2026-01-01', target: '5' })
  const a2 = A({ id: 'a2', tgl_hasil: '2026-01-08', target: '6' })

  it('menghitung dari lulus juz sebelumnya ke lulus juz ini', () => {
    const mt = masaTempuhJuz([a1, a2], a2)
    expect(mt.hari).toBe(6) // 7 hari kalender - 1 Jumat
    expect(mt.dari).toBe('2026-01-01')
    expect(mt.sampai).toBe('2026-01-08')
    expect(mt.juz_dari).toBe('5')
    expect(mt.juz_sampai).toBe('6')
  })

  it('JUZ PERTAMA → null (ditampilkan "—", bukan mengarang angka)', () => {
    expect(masaTempuhJuz([a1], a1)).toBe(null)
  })

  it('ajuan belum lulus → null', () => {
    const belum = A({ id: 'a3', tgl_hasil: '2026-02-01', status: 'menunggu' })
    expect(masaTempuhJuz([a1, belum], belum)).toBe(null)
  })

  it('memakai lulus TERAKHIR sebelum tanggal ini, bukan yang pertama', () => {
    const a3 = A({ id: 'a3', tgl_hasil: '2026-01-15', target: '7' })
    const mt = masaTempuhJuz([a1, a2, a3], a3)
    expect(mt.dari).toBe('2026-01-08') // a2, bukan a1
  })

  it('ajuan lulus SESUDAH tanggal ini diabaikan (koreksi data lama)', () => {
    const a3 = A({ id: 'a3', tgl_hasil: '2026-06-01', target: '9' })
    expect(masaTempuhJuz([a1, a2, a3], a2).dari).toBe('2026-01-01')
  })

  it('dua ajuan lulus di tanggal sama tidak menghitung dirinya sendiri', () => {
    const kembar = A({ id: 'a9', tgl_hasil: '2026-01-08', target: '6b' })
    const mt = masaTempuhJuz([a1, a2, kembar], a2)
    expect(mt.dari).toBe('2026-01-01')
  })

  it('libur kalender terpakai', () => {
    const mt = masaTempuhJuz([a1, a2], a2, { libur: new Set(['2026-01-05']) })
    expect(mt.hari).toBe(5)
  })
})

describe('labelMasaTempuh', () => {
  it('ada angka → "N hari aktif"', () => {
    expect(labelMasaTempuh({ hari: 87 })).toBe('87 hari aktif')
    expect(labelMasaTempuh({ hari: 0 })).toBe('0 hari aktif')
  })

  it('null → "—"', () => {
    expect(labelMasaTempuh(null)).toBe('—')
    expect(labelMasaTempuh({ hari: null })).toBe('—')
  })
})
