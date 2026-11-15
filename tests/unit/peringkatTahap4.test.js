// Pondok Laju tahap 4 (Kyai 15–16 Nov 2026): Top 10 + daftar lengkap, isian prestasi sekali
// per kelas Pondok Laju, dan peringkat guru menurut santri yang lulus tes dari ajuannya.
import { describe, it, expect } from 'vitest'
import { peringkatPrestasi, BATAS_TOP_PRESTASI } from '@/utils/rekapPrestasiTabel'
import { nilaiSeragam, kelasLajuDiajukan } from '@/utils/pondokLaju'
import { peringkatGuruLulus, rentangBulan } from '@/utils/peringkatGuru'

describe('peringkatPrestasi — Top 10 + daftar lengkap', () => {
  const r = (nama, totalNum, juzNum = 0, dinilai = true) => ({
    id: nama,
    nama,
    totalNum,
    juzNum,
    dinilai
  })
  it('Top 10, urut capaian → juz → nama; capaian 0 tak masuk Top tapi masuk daftar lengkap', () => {
    const rows = Array.from({ length: 12 }, (_, i) => r('S' + String(i).padStart(2, '0'), i + 1))
    rows.push(r('Nol', 0), r('Kosong', 0, 0, false))
    const p = peringkatPrestasi(rows)
    expect(BATAS_TOP_PRESTASI).toBe(10)
    expect(p.top).toHaveLength(10)
    expect(p.top[0].nama).toBe('S11')
    expect(p.semua).toHaveLength(13) // 12 + "Nol"; "Kosong" belum dinilai
    expect(p.semua.at(-1).nama).toBe('Nol')
    expect(p.belum).toBe(1)
  })
  it('seri capaian dipecah juz tertinggi lalu nama', () => {
    const p = peringkatPrestasi([r('Budi', 8, 3), r('Ani', 8, 3), r('Citra', 8, 7)])
    expect(p.top.map((x) => x.nama)).toEqual(['Citra', 'Ani', 'Budi'])
  })
})

describe('isian prestasi sekali per kelas Pondok Laju', () => {
  it('nilai bersama bila semua sama; beragam bila berbeda; kosong bila belum diisi', () => {
    expect(nilaiSeragam(['42', '42', ' 42 '])).toEqual({ nilai: '42', beragam: false })
    expect(nilaiSeragam(['42', '40'])).toEqual({ nilai: '', beragam: true })
    expect(nilaiSeragam(['', ''])).toEqual({ nilai: '', beragam: false })
    expect(nilaiSeragam([])).toEqual({ nilai: '', beragam: false })
  })
  it('kelas = guru kelas + juz; santri bukan Pondok Laju tak ikut', () => {
    const s = (id, guru, juz, laju = true) => ({ id, guru_pagi: guru, juz, is_pondok_laju: laju })
    const k = kelasLajuDiajukan([
      s(1, 'Ust. A', 'Juz 3'),
      s(2, 'Ust. A', 'Juz 3'),
      s(3, 'Ust. A', 'Juz 4'),
      s(4, 'Ust. A', 'Juz 3', false)
    ])
    expect(k.map((x) => [x.juz, x.santri.map((y) => y.id)])).toEqual([
      ['3', [1, 2]],
      ['4', [3]]
    ])
  })
})

describe('peringkat guru — santri lulus tes dari ajuan guru itu', () => {
  const a = (id, guru_id, guru_nama, santri_id, tgl, status = 'lulus', lembaga = 'PTPT') => ({
    id,
    guru_id,
    guru_nama,
    santri_id,
    nama_cache: 'Santri ' + santri_id,
    lembaga,
    status,
    tgl_hasil: tgl ? `${tgl}T00:00:00.000Z` : ''
  })
  const data = [
    a(1, 'g1', 'Ust. Ali', 's1', '2026-11-03'),
    a(2, 'g1', 'Ust. Ali', 's1', '2026-11-20'), // santri sama, juz berikutnya
    a(3, 'g1', 'Ust. Ali', 's2', '2026-11-21', 'lulus', 'TPQ'),
    a(4, 'g2', 'Ust. Badru', 's3', '2026-11-10'),
    a(5, 'g2', 'Ust. Badru', 's4', '2026-11-11', 'tidak_lulus'),
    a(6, 'g2', 'Ust. Badru', 's5', '2026-10-31'),
    a(7, 'g3', 'Ust. Cici', 's6', '')
  ]
  it('rentang bulan inklusif', () => {
    expect(rentangBulan('2026-02')).toEqual({ dari: '2026-02-01', sampai: '2026-02-28' })
    expect(rentangBulan('2026-11')).toEqual({ dari: '2026-11-01', sampai: '2026-11-30' })
    expect(rentangBulan('x')).toEqual({ dari: '', sampai: '' })
  })
  it('per bulan: hanya status lulus, hitung tes & santri unik, rincian lembaga', () => {
    const p = peringkatGuruLulus(data, rentangBulan('2026-11'))
    expect(p.map((g) => [g.guru, g.lulus, g.santri])).toEqual([
      ['Ust. Ali', 3, 2],
      ['Ust. Badru', 1, 1]
    ])
    expect(p[0].lembaga).toEqual([
      { nama: 'PTPT', jumlah: 2 },
      { nama: 'TPQ', jumlah: 1 }
    ])
    expect(p[0].daftar.map((d) => d.tgl)).toEqual(['2026-11-03', '2026-11-20', '2026-11-21'])
  })
  it('periode bebas & tanpa periode (ajuan tanpa tanggal hanya masuk bila tak dibatasi)', () => {
    const bebas = peringkatGuruLulus(data, { dari: '2026-10-15', sampai: '2026-11-15' })
    expect(bebas.map((g) => [g.guru, g.lulus])).toEqual([
      ['Ust. Badru', 2],
      ['Ust. Ali', 1]
    ])
    const semua = peringkatGuruLulus(data)
    expect(semua.find((g) => g.guru === 'Ust. Cici').lulus).toBe(1)
  })
})
