// Kyai (21 Jul 2026): "setiap santri itu bisa ceremonial di beberapa sesi, mis:
// ceremonial kelas 2 itu ada 2 sesi jadi harusnya bisa dijadwal sesi sampai banyak."
//
// Regresi: dulu santri yang sudah masuk 1 sesi DIBUANG dari daftar kandidat, jadi
// mustahil menambahkannya ke sesi kedua. Sekarang tetap muncul + ditandai.
import { describe, it, expect } from 'vitest'
import { pilihKandidat, layakCeremonial } from '@/composables/useCeremonial'

const A = (o) => ({
  status: 'lulus',
  lembaga: 'PTPT',
  nama_cache: 'Fulan',
  tgl_hasil: '2026-01-01',
  juz_asal: 'JUZ 10', // default: juz terakhir kelas -> layak ceremonial
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

// ─────────────────────────────────────────────────────────────────────────────
// Kyai (21 Jul 2026): "santri yg sudah lulus tes juz terakhir kelas di PJ atau mau
// naik kelas ada cerem — saya ingin otomatis masuk di daftar ceremonial."
//
// Kelas PTPT = 5 juz, jadi juz terakhir kelas = kelipatan 5. Yang DITES adalah
// `juz_asal`; `target` = juz tujuan (T+1). Kalau patokannya target, yang terjaring
// malah santri yang baru MULAI kelas baru — persis kebalikannya.
// ─────────────────────────────────────────────────────────────────────────────
describe('layakCeremonial', () => {
  it('lulus juz terakhir kelas (kelipatan 5) = layak', () => {
    for (const j of [5, 10, 15, 20, 25, 30]) {
      expect(layakCeremonial({ juz_asal: `JUZ ${j}` })).toBe(true)
    }
  })

  it('juz tengah kelas = BELUM waktunya ceremonial', () => {
    for (const j of [1, 4, 6, 9, 11, 14]) {
      expect(layakCeremonial({ juz_asal: `JUZ ${j}` })).toBe(false)
    }
  })

  it('patokannya juz_asal (yang DITES), bukan target', () => {
    // Tes juz 10 -> target 11. Yang layak justru ini.
    expect(layakCeremonial({ juz_asal: 'JUZ 10', target: 'Juz 11' })).toBe(true)
    // Tes juz 11 -> target 12. Belum waktunya, walau targetnya bukan kelipatan 5.
    expect(layakCeremonial({ juz_asal: 'JUZ 11', target: 'Juz 12' })).toBe(false)
  })

  it('menerima angka polos & string tanpa prefiks', () => {
    expect(layakCeremonial({ juz_asal: 10 })).toBe(true)
    expect(layakCeremonial({ juz_asal: '10' })).toBe(true)
  })

  it('record LAMA berjenis "kelas" tetap layak (riwayat jangan hilang)', () => {
    expect(layakCeremonial({ jenis: 'kelas', juz_asal: '' })).toBe(true)
  })

  it('juz tak terbaca / kosong = tidak layak', () => {
    expect(layakCeremonial({ juz_asal: '' })).toBe(false)
    expect(layakCeremonial({ juz_asal: '-' })).toBe(false)
    expect(layakCeremonial({})).toBe(false)
    expect(layakCeremonial(null)).toBe(false)
  })
})

describe('pilihKandidat — hanya yang akan naik kelas', () => {
  const L = (o) => A({ id: 'x', santri_id: 's1', tgl_hasil: '2026-01-01', ...o })

  it('menyaring santri yang belum di juz terakhir kelas', () => {
    const list = [
      L({ id: 'a1', santri_id: 's1', juz_asal: 'JUZ 10' }),
      L({ id: 'a2', santri_id: 's2', juz_asal: 'JUZ 7' })
    ]
    expect(pilihKandidat(list, new Map()).map((k) => k.santri_id)).toEqual(['s1'])
  })

  it('membawa juz_lulus & kelas_tujuan untuk label daftar', () => {
    const out = pilihKandidat([L({ id: 'a1', juz_asal: 'JUZ 10' })], new Map())
    expect(out[0].juz_lulus).toBe(10)
    expect(out[0].kelas_tujuan).toBe('Kelas 3') // juz 10 selesai -> masuk kelas 3
  })

  it('juz 5 -> Kelas 2, juz 25 -> Kelas 6', () => {
    expect(pilihKandidat([L({ juz_asal: 'JUZ 5' })], new Map())[0].kelas_tujuan).toBe('Kelas 2')
    expect(pilihKandidat([L({ juz_asal: 'JUZ 25' })], new Map())[0].kelas_tujuan).toBe('Kelas 6')
  })
})
