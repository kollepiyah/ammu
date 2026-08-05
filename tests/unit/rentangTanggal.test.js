import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { rentangTanggal } from '@/utils/format'

// BUG NYATA (Kyai, 5 Agu 2026): "perizinan tidak masuk". Izin 4 Agu disetujui, tapi di
// rekap kehadiran kolom Izin tetap 0 dan hari itu tetap ALPA.
//
// Akarnya bukan di absensinya, tapi di deret tanggalnya: useIzinGuru memakai
//   for (d = new Date(start + 'T00:00:00'); ...) out.push(d.toISOString().slice(0,10))
// `new Date('2026-08-04T00:00:00')` = tengah malam LOKAL. Di WIB (UTC+7) itu
// 2026-08-03T17:00:00Z, dan toISOString() membacanya sebagai UTC -> '2026-08-03'.
// Jadi barisnya ditulis ke tanggal 3, dan karena tanggal 3 biasanya sudah punya baris
// "hadir", penulisan justru DILEWATI -> nol baris izin sama sekali.
//
// rentangTanggal() bekerja pada string kalender + iterasi UTC murni, jadi tak pernah
// menyentuh zona lokal. Tes ini menyetel TZ ke Asia/Jakarta supaya pergeseran itu
// benar-benar aktif — kalau dijalankan di TZ=UTC, bug lamanya tak akan muncul dan
// tes ini kehilangan gigi.
const TZ_ASLI = process.env.TZ

// Replika pola LAMA — dipakai sebagai pembanding, bukan sebagai kode produksi.
function dateRangeLama(start, end) {
  if (!start) return []
  const s = new Date(start + 'T00:00:00')
  const e = new Date((end || start) + 'T00:00:00')
  if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) return [start]
  const out = []
  for (let d = new Date(s); d <= e && out.length < 60; d.setDate(d.getDate() + 1)) {
    out.push(d.toISOString().slice(0, 10))
  }
  return out
}

describe('rentangTanggal (deret tanggal kalender, bebas zona)', () => {
  beforeAll(() => {
    process.env.TZ = 'Asia/Jakarta'
  })
  afterAll(() => {
    process.env.TZ = TZ_ASLI
  })

  it('satu hari: tanggalnya TIDAK mundur (regresi bug izin)', () => {
    expect(rentangTanggal('2026-08-04', '2026-08-04')).toEqual(['2026-08-04'])
  })

  it('pola lama memang mundur 1 hari di WIB — bukti bugnya nyata', () => {
    // Kalau suatu hari tes ini gagal karena TZ tak terpasang, tes di atas tetap
    // menjaga perilaku yang benar; yang ini cuma mendokumentasikan sebabnya.
    const offsetWib = new Date('2026-08-04T00:00:00').getTimezoneOffset() === -420
    if (!offsetWib) return
    expect(dateRangeLama('2026-08-04', '2026-08-04')).toEqual(['2026-08-03'])
  })

  it('rentang beberapa hari inklusif di kedua ujung', () => {
    expect(rentangTanggal('2026-08-03', '2026-08-06')).toEqual([
      '2026-08-03',
      '2026-08-04',
      '2026-08-05',
      '2026-08-06'
    ])
  })

  it('lintas bulan', () => {
    expect(rentangTanggal('2026-07-30', '2026-08-02')).toEqual([
      '2026-07-30',
      '2026-07-31',
      '2026-08-01',
      '2026-08-02'
    ])
  })

  it('lintas tahun', () => {
    expect(rentangTanggal('2026-12-31', '2027-01-02')).toEqual([
      '2026-12-31',
      '2027-01-01',
      '2027-01-02'
    ])
  })

  it('tahun kabisat: 29 Feb tidak dilompati', () => {
    expect(rentangTanggal('2028-02-28', '2028-03-01')).toEqual([
      '2028-02-28',
      '2028-02-29',
      '2028-03-01'
    ])
  })

  it('end kosong = satu hari saja', () => {
    expect(rentangTanggal('2026-08-04')).toEqual(['2026-08-04'])
  })

  it('end lebih awal dari start = hanya start (tak meledak)', () => {
    expect(rentangTanggal('2026-08-10', '2026-08-01')).toEqual(['2026-08-10'])
  })

  it('guard maxHari membatasi rentang keliru', () => {
    // Salah ketik tahun: 2026 -> 2126. Tanpa guard ini = ~36 ribu penulisan baris.
    const r = rentangTanggal('2026-08-01', '2126-08-01', 60)
    expect(r.length).toBe(60)
    expect(r[0]).toBe('2026-08-01')
  })

  it('maxHari bisa dinaikkan bila memang perlu', () => {
    expect(rentangTanggal('2026-01-01', '2026-12-31', 400).length).toBe(365)
  })

  it('input tak valid -> array kosong', () => {
    expect(rentangTanggal('')).toEqual([])
    expect(rentangTanggal(null)).toEqual([])
    expect(rentangTanggal('bukan-tanggal')).toEqual([])
    expect(rentangTanggal('04-08-2026')).toEqual([])
  })

  it('menerima timestamp panjang (dipotong ke 10 karakter)', () => {
    expect(rentangTanggal('2026-08-04T12:30:00Z', '2026-08-05T01:00:00Z')).toEqual([
      '2026-08-04',
      '2026-08-05'
    ])
  })
})
