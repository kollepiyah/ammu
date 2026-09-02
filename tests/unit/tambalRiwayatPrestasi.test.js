// Kyai (2 Sep 2026): "kalau saya minta dihapus angka di data santri setiap tgl 25, riwayat
// yg bulan lalu masih ada kan ya?" — dan jawabannya: aman HANYA untuk bulan yang sudah punya
// snapshot. InputBulananView tak pernah menulis snapshot sampai v.1.3.8, jadi bulan yang
// diisi lewat layar itu hidup HANYA di `santri.prestasi_*`. Penambalan ini menutup lubang itu
// SEBELUM penghapusan tanggal 25 dinyalakan.
//
// Pertanyaan yang dijawab BUKAN "angka ini milik bulan apa" melainkan "kalau kolom ini
// dikosongkan, ada yang hilang selamanya atau tidak" — rumusan pertama salah, dan data
// sungguhan yang membetulkannya: RekapPrestasiView menulis `riwayat_prestasi` tapi TIDAK
// menulis `catatan_bulanan`, sehingga 237 santri yang riwayatnya justru paling lengkap
// nyaris dilaporkan terancam.
//
// Yang dijaga tes ini, berurut dari yang paling mahal bila jebol:
//   1. Tak pernah MENGARANG bulan — angka tanpa jejak bulan tidak ditambal, dilaporkan.
//   2. Santri yang sudah punya riwayat berangka TIDAK dihitung terancam.
//   3. Tak menimpa riwayat yang sudah berangka.
//   4. Bulan yang dipilih benar-benar bulan TERAKHIR yang tercatat.
import { describe, it, expect } from 'vitest'
import {
  punyaAngkaPrestasi,
  periodeTerakhirCatatan,
  analisaTambal,
  labelPeriode
} from '@/utils/tambalRiwayatPrestasi'
import { idRiwayatPrestasi } from '@/utils/prestasiBulanan'

const S = (o) => ({ id: 's1', nama: 'Santri Satu', lembaga: 'PTPT', ...o })
const RP = (santriId, periode, o = {}) => ({
  id: idRiwayatPrestasi(santriId, periode),
  santri_id: santriId,
  periode,
  awal: '',
  akhir: '',
  total: '',
  ...o
})

describe('punyaAngkaPrestasi', () => {
  it('salah satu kolom terisi sudah cukup', () => {
    expect(punyaAngkaPrestasi(S({ prestasi_akhir: '30' }))).toBe(true)
    expect(punyaAngkaPrestasi(S({ prestasi_awal: '10' }))).toBe(true)
    expect(punyaAngkaPrestasi(S({ prestasi_total: '5 Hal' }))).toBe(true)
  })

  it('KUNCI: juz & kelas TIDAK dihitung — keduanya selalu terisi', () => {
    // Kalau ikut dihitung, SEMUA santri tampak berangka dan penambalan akan menulis
    // ribuan riwayat kosong.
    expect(punyaAngkaPrestasi(S({ juz: 'JUZ 5', kelas: '3A' }))).toBe(false)
  })

  it('spasi kosong bukan angka', () => {
    expect(punyaAngkaPrestasi(S({ prestasi_akhir: '   ' }))).toBe(false)
    expect(punyaAngkaPrestasi(S({}))).toBe(false)
    expect(punyaAngkaPrestasi(null)).toBe(false)
  })
})

describe('periodeTerakhirCatatan — angka ini milik bulan apa', () => {
  it('ambil kunci TERBESAR, bukan yang pertama ditemui', () => {
    const s = S({ catatan_bulanan: { '2026_06': 'x', '2026_08': 'y', '2026_07': 'z' } })
    expect(periodeTerakhirCatatan(s)).toBe('2026-08')
  })

  it('menyeberang tahun tetap benar', () => {
    const s = S({ catatan_bulanan: { '2025_12': 'a', '2026_01': 'b' } })
    expect(periodeTerakhirCatatan(s)).toBe('2026-01')
  })

  it('menerima bentuk YYYY-MM maupun YYYY_MM', () => {
    expect(periodeTerakhirCatatan(S({ catatan_bulanan: { '2026-08': 'x' } }))).toBe('2026-08')
  })

  it('kunci sampah diabaikan, tak bikin melempar', () => {
    const s = S({ catatan_bulanan: { agustus: 'x', '2026_13': 'y', '2026_07': 'z' } })
    expect(periodeTerakhirCatatan(s)).toBe('2026-07')
  })

  it('tanpa catatan_bulanan → kosong (BUKAN menebak bulan berjalan)', () => {
    expect(periodeTerakhirCatatan(S({}))).toBe('')
    expect(periodeTerakhirCatatan(S({ catatan_bulanan: {} }))).toBe('')
    expect(periodeTerakhirCatatan(S({ catatan_bulanan: [] }))).toBe('')
    expect(periodeTerakhirCatatan(S({ catatan_bulanan: 'agustus' }))).toBe('')
  })
})

describe('analisaTambal', () => {
  it('lubang yang sebenarnya: ada angka, ada bulan, TAK ada riwayat → siap ditambal', () => {
    const s = S({
      prestasi_awal: '10',
      prestasi_akhir: '30',
      prestasi_total: '20 Hal',
      juz: 'JUZ 5',
      catatan_bulanan: { '2026_08': 'lancar' }
    })
    const r = analisaTambal([s], [])
    expect(r.siap).toHaveLength(1)
    expect(r.siap[0].periode).toBe('2026-08')
    expect(r.siap[0].id).toBe('rp_s1_2026-08')
    expect(r.siap[0]).toMatchObject({ awal: '10', akhir: '30', total: '20 Hal', juz: 'JUZ 5' })
    expect(r.periode).toEqual({ '2026-08': 1 })
  })

  it('KUNCI: riwayat yang SUDAH berangka tidak disentuh', () => {
    const s = S({ prestasi_akhir: '30', catatan_bulanan: { '2026_08': 'x' } })
    const r = analisaTambal([s], [RP('s1', '2026-08', { akhir: '25' })])
    expect(r.siap).toHaveLength(0)
    expect(r.sudah).toBe(1)
  })

  it('riwayat ADA tapi kosong melompong tetap dihitung lubang', () => {
    // Baris kosong tak menyelamatkan apa pun saat data santri dihapus.
    const s = S({ prestasi_akhir: '30', catatan_bulanan: { '2026_08': 'x' } })
    const r = analisaTambal([s], [RP('s1', '2026-08')])
    expect(r.siap).toHaveLength(1)
    expect(r.sudah).toBe(0)
  })

  it('KUNCI: punya angka, tanpa jejak bulan, TANPA riwayat apa pun → terancam hilang', () => {
    // Menaruh angka di bulan yang salah lebih buruk daripada tak menambal: yang kedua
    // masih bisa dibetulkan manusia, yang pertama menyamar jadi data sungguhan.
    const s = S({ prestasi_akhir: '30' })
    const r = analisaTambal([s], [])
    expect(r.siap).toHaveLength(0)
    expect(r.beresiko).toHaveLength(1)
    expect(r.beresiko[0].id).toBe('s1')
  })

  it('KUNCI: tanpa jejak bulan TAPI sudah punya riwayat berangka → AMAN, bukan terancam', () => {
    // Rancangan pertama salah di sini: RekapPrestasiView menulis `riwayat_prestasi` tapi
    // TIDAK menulis `catatan_bulanan`, sehingga santri yang riwayatnya justru paling
    // lengkap dilaporkan "tak ada bulannya" — 237 santri di data sungguhan.
    const s = S({ prestasi_akhir: '30' }) // tanpa catatan_bulanan
    const r = analisaTambal([s], [RP('s1', '2026-07', { akhir: '30' })])
    expect(r.beresiko).toHaveLength(0)
    expect(r.siap).toHaveLength(0)
    expect(r.sudah).toBe(1)
  })

  it('riwayat KOSONG tak menyelamatkan santri tanpa jejak bulan', () => {
    const s = S({ prestasi_akhir: '30' })
    const r = analisaTambal([s], [RP('s1', '2026-07')]) // semua kolom kosong
    expect(r.beresiko).toHaveLength(1)
    expect(r.sudah).toBe(0)
  })

  it('santri tanpa angka sama sekali dilewati diam-diam', () => {
    const r = analisaTambal([S({ juz: 'JUZ 3', catatan_bulanan: { '2026_08': 'x' } })], [])
    expect(r.siap).toHaveLength(0)
    expect(r.kosong).toBe(1)
  })

  it('riwayat bulan LAIN tak menutup lubang bulan ini', () => {
    const s = S({ prestasi_akhir: '30', catatan_bulanan: { '2026_08': 'x' } })
    const r = analisaTambal([s], [RP('s1', '2026-07', { akhir: '20' })])
    expect(r.siap).toHaveLength(1)
    expect(r.siap[0].periode).toBe('2026-08')
  })

  it('riwayat milik santri LAIN tak menutup lubang santri ini', () => {
    const s = S({ prestasi_akhir: '30', catatan_bulanan: { '2026_08': 'x' } })
    const r = analisaTambal([s], [RP('s9', '2026-08', { akhir: '20' })])
    expect(r.siap).toHaveLength(1)
  })

  it('banyak santri: tiap golongan terhitung sekali, sebaran periode benar', () => {
    const list = [
      S({ id: 'a', nama: 'Ahmad', prestasi_akhir: '30', catatan_bulanan: { '2026_08': 'x' } }),
      S({ id: 'b', nama: 'Budi', prestasi_akhir: '20', catatan_bulanan: { '2026_08': 'x' } }),
      S({ id: 'c', nama: 'Cahya', prestasi_akhir: '10', catatan_bulanan: { '2026_07': 'x' } }),
      S({ id: 'd', nama: 'Dedi', prestasi_akhir: '40', catatan_bulanan: { '2026_08': 'x' } }),
      S({ id: 'e', nama: 'Eko' }), // tanpa angka
      S({ id: 'f', nama: 'Fajar', prestasi_akhir: '5' }), // angka tanpa bulan, tanpa riwayat
      S({ id: 'g', nama: 'Galih', prestasi_akhir: '7' }) // tanpa bulan TAPI punya riwayat
    ]
    const r = analisaTambal(list, [
      RP('d', '2026-08', { akhir: '40' }),
      RP('g', '2026-05', { akhir: '7' })
    ])
    expect(r.siap.map((x) => x.santri.id)).toEqual(['a', 'b', 'c'])
    expect(r.sudah).toBe(2) // Dedi (bulan cocok) + Galih (punya riwayat lain)
    expect(r.kosong).toBe(1) // Eko
    expect(r.beresiko.map((x) => x.id)).toEqual(['f'])
    expect(r.periode).toEqual({ '2026-08': 2, '2026-07': 1 })
  })

  it('urut periode TERBARU dulu, lalu nama — pratinjau terbaca rapi', () => {
    const list = [
      S({ id: 'z', nama: 'Zaki', prestasi_akhir: '1', catatan_bulanan: { '2026_08': 'x' } }),
      S({ id: 'a', nama: 'Ahmad', prestasi_akhir: '1', catatan_bulanan: { '2026_08': 'x' } }),
      S({ id: 'm', nama: 'Mahfud', prestasi_akhir: '1', catatan_bulanan: { '2026_07': 'x' } })
    ]
    const r = analisaTambal(list, [])
    expect(r.siap.map((x) => x.santri.nama)).toEqual(['Ahmad', 'Zaki', 'Mahfud'])
  })

  it('daftar kosong / sampah tak melempar', () => {
    expect(analisaTambal([], []).siap).toEqual([])
    expect(analisaTambal(null, null).siap).toEqual([])
    expect(analisaTambal([null, { nama: 'tanpa id' }], []).siap).toEqual([])
  })
})

describe('labelPeriode', () => {
  it('YYYY-MM jadi nama bulan Indonesia', () => {
    expect(labelPeriode('2026-08')).toBe('Agustus 2026')
    expect(labelPeriode('2026-01')).toBe('Januari 2026')
  })

  it('nilai tak sah dikembalikan apa adanya, bukan "undefined NaN"', () => {
    expect(labelPeriode('')).toBe('')
    expect(labelPeriode('2026')).toBe('2026')
  })
})
