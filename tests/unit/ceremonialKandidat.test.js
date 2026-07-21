// Kyai (21 Jul 2026): "setiap santri itu bisa ceremonial di beberapa sesi, mis:
// ceremonial kelas 2 itu ada 2 sesi jadi harusnya bisa dijadwal sesi sampai banyak."
//
// Regresi: dulu santri yang sudah masuk 1 sesi DIBUANG dari daftar kandidat, jadi
// mustahil menambahkannya ke sesi kedua. Sekarang tetap muncul + ditandai.
import { describe, it, expect } from 'vitest'
import { pilihKandidat } from '@/composables/useCeremonial'

const A = (o) => ({
  status: 'lulus',
  lembaga: 'PTPT',
  nama_cache: 'Fulan',
  tgl_hasil: '2026-01-01',
  ...o
})

describe('pilihKandidat', () => {
  it('REGRESI: santri yang sudah dijadwal TETAP muncul (boleh sesi ke-2)', () => {
    const list = [A({ id: 'a1', santri_id: 's1' })]
    const out = pilihKandidat(list, new Map([['s1', 1]]))
    expect(out).toHaveLength(1)
    expect(out[0].sesi_terjadwal).toBe(1)
  })

  it('jumlah sesi ikut terbawa untuk penanda UI', () => {
    const list = [A({ id: 'a1', santri_id: 's1' })]
    expect(pilihKandidat(list, new Map([['s1', 3]]))[0].sesi_terjadwal).toBe(3)
  })

  it('belum pernah dijadwal → 0 (bukan undefined)', () => {
    const list = [A({ id: 'a1', santri_id: 's1' })]
    expect(pilihKandidat(list, new Map())[0].sesi_terjadwal).toBe(0)
  })

  it('Set bentuk lama tetap terbaca sebagai 1 sesi', () => {
    const list = [A({ id: 'a1', santri_id: 's1' })]
    expect(pilihKandidat(list, new Set(['s1']))[0].sesi_terjadwal).toBe(1)
  })

  it('terjadwal tak diisi → semua 0, tak lempar', () => {
    const list = [A({ id: 'a1', santri_id: 's1' })]
    expect(pilihKandidat(list, undefined)[0].sesi_terjadwal).toBe(0)
  })

  it('hanya ajuan LULUS & lembaga PTPT', () => {
    const list = [
      A({ id: 'a1', santri_id: 's1' }),
      A({ id: 'a2', santri_id: 's2', status: 'ditolak' }),
      A({ id: 'a3', santri_id: 's3', lembaga: 'TPQ' })
    ]
    expect(pilihKandidat(list, new Map()).map((k) => k.santri_id)).toEqual(['s1'])
  })

  it('ambil ajuan lulus TERBARU per santri', () => {
    const list = [
      A({ id: 'a1', santri_id: 's1', tgl_hasil: '2026-01-01', target: '5' }),
      A({ id: 'a2', santri_id: 's1', tgl_hasil: '2026-03-01', target: '6' })
    ]
    const out = pilihKandidat(list, new Map())
    expect(out).toHaveLength(1)
    expect(out[0].juz).toBe('6')
    expect(out[0].ajuan_id).toBe('a2')
  })

  it('urut nama A–Z', () => {
    const list = [
      A({ id: 'a1', santri_id: 's1', nama_cache: 'Zaid' }),
      A({ id: 'a2', santri_id: 's2', nama_cache: 'Ahmad' })
    ]
    expect(pilihKandidat(list, new Map()).map((k) => k.nama)).toEqual(['Ahmad', 'Zaid'])
  })

  it('daftar kosong aman', () => {
    expect(pilihKandidat([], new Map())).toEqual([])
    expect(pilihKandidat(null, new Map())).toEqual([])
  })
})
