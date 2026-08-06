// Kyai (6 Agu 2026), atas berkas "buku-induk-2026-08-03-kas-umum-tanpa-pos--sdi-tunai.pdf":
// "ekspor PDF laporan keuangan harian, total saldonya tidak jelas (tidak sesuai perhitungan
// yg difilter)."
//
// Berkas itu berisi 14 transaksi yang SEMUANYA masuk, tapi kolom Saldo malah menurun dari
// Rp 6.230.000 ke Rp 2.130.000, sedangkan baris TOTAL bilang Rp 2.290.000. Tes di bawah
// mengunci dua hal yang menyebabkannya: urutan cetak yang terbalik dari arah akumulasi,
// dan saldo yang diambil dari ledger penuh alih-alih dari ledger yang tersaring.
import { describe, it, expect } from 'vitest'
import {
  petaSaldoBerjalan,
  saldoAwalSebelum,
  bangunBarisLaporan,
  nominalMasuk,
  nominalKeluar
} from '@/utils/bukuIndukLaporan'

const masuk = (id, tanggal, nominal, extra = {}) => ({
  id,
  tanggal,
  tipe: 'masuk',
  masuk: nominal,
  ...extra
})
const keluar = (id, tanggal, nominal, extra = {}) => ({
  id,
  tanggal,
  tipe: 'keluar',
  keluar: nominal,
  ...extra
})

describe('nominal masuk/keluar', () => {
  it('membaca kolom masuk/keluar langsung', () => {
    expect(nominalMasuk({ masuk: 200000 })).toBe(200000)
    expect(nominalKeluar({ keluar: 50000 })).toBe(50000)
  })

  it('baris lama yang hanya punya `nominal` + `tipe` tetap terbaca', () => {
    expect(nominalMasuk({ tipe: 'masuk', nominal: 75000 })).toBe(75000)
    expect(nominalKeluar({ tipe: 'masuk', nominal: 75000 })).toBe(0)
    expect(nominalKeluar({ tipe: 'keluar', nominal: 30000 })).toBe(30000)
  })

  it('nilai kosong / sampah jadi 0, bukan NaN', () => {
    expect(nominalMasuk({})).toBe(0)
    expect(nominalMasuk({ masuk: 'abc' })).toBe(0)
    expect(nominalKeluar(null)).toBe(0)
  })
})

describe('petaSaldoBerjalan', () => {
  it('akumulasi kronologis naik, apa pun urutan masukannya', () => {
    const acak = [
      masuk('c', '2026-08-03', 200000),
      masuk('a', '2026-08-01', 500000),
      keluar('b', '2026-08-02', 100000)
    ]
    const peta = petaSaldoBerjalan(acak)
    expect(peta.get('a')).toBe(500000)
    expect(peta.get('b')).toBe(400000)
    expect(peta.get('c')).toBe(600000)
  })

  it('tanggal kembar diputus id supaya hasilnya deterministik', () => {
    const l = [masuk('b2', '2026-08-01', 20000), masuk('a1', '2026-08-01', 10000)]
    expect(petaSaldoBerjalan(l).get('a1')).toBe(10000)
    expect(petaSaldoBerjalan(l).get('b2')).toBe(30000)
    // dibalik urutannya → hasil identik
    expect(petaSaldoBerjalan([...l].reverse()).get('b2')).toBe(30000)
  })

  it('ledger kosong menghasilkan peta kosong, bukan galat', () => {
    expect(petaSaldoBerjalan([]).size).toBe(0)
    expect(petaSaldoBerjalan(null).size).toBe(0)
  })

  it('KUNCI keluhan Kyai: selisih antar baris = nominal barisnya', () => {
    // Semua transaksi masuk → saldo TIDAK BOLEH menurun. Di berkas 3 Agu, saldo turun
    // karena dihitung dari ledger penuh; di sini ledger sudah tersaring lebih dulu.
    const tersaring = [
      masuk('t1', '2026-08-03', 200000),
      masuk('t2', '2026-08-03', 200000),
      masuk('t3', '2026-08-03', 30000)
    ]
    const peta = petaSaldoBerjalan(tersaring)
    expect(peta.get('t1')).toBe(200000)
    expect(peta.get('t2')).toBe(400000)
    expect(peta.get('t3')).toBe(430000)
  })
})

describe('saldoAwalSebelum', () => {
  const ledger = [
    masuk('l1', '2026-07-30', 1000000),
    keluar('l2', '2026-07-31', 250000),
    masuk('l3', '2026-08-03', 200000)
  ]

  it('hanya menjumlah yang jatuh SEBELUM tanggal periode', () => {
    expect(saldoAwalSebelum(ledger, '2026-08-03')).toBe(750000)
  })

  it('bekerja untuk periode bulanan & tahunan (panjang batas menyesuaikan)', () => {
    expect(saldoAwalSebelum(ledger, '2026-08')).toBe(750000)
    expect(saldoAwalSebelum(ledger, '2026')).toBe(0)
    expect(saldoAwalSebelum(ledger, '2027')).toBe(950000)
  })

  it('tanpa periode → 0 (tak ada yang bisa disebut "saldo awal")', () => {
    expect(saldoAwalSebelum(ledger, '')).toBe(0)
  })

  it('baris tanggal kosong tak ikut dihitung', () => {
    expect(saldoAwalSebelum([...ledger, masuk('x', '', 999)], '2026-08-03')).toBe(750000)
  })
})

describe('bangunBarisLaporan', () => {
  const METODE = ['Tunai', 'Transfer']
  const metodeOf = (b) => b.metode || 'Tunai'
  const ringkasMetodeOf = (l) => {
    const out = { Tunai: { masuk: 0, keluar: 0 }, Transfer: { masuk: 0, keluar: 0 } }
    for (const b of l) {
      const m = metodeOf(b)
      out[m].masuk += nominalMasuk(b)
      out[m].keluar += nominalKeluar(b)
    }
    return out
  }
  const opsi = (extra = {}) => ({
    labelPeriode: '3 Agustus 2026',
    metodeOf,
    metodeOpts: METODE,
    ringkasMetodeOf,
    ...extra
  })

  // Bentuk mini dari berkas yang Kyai lampirkan: semua masuk, tunai, satu hari.
  const HARIAN = [
    masuk('h1', '2026-08-03', 200000),
    masuk('h2', '2026-08-03', 30000),
    masuk('h3', '2026-08-03', 200000)
  ]

  it('baris pertama SALDO AWAL, baris terakhir TOTAL', () => {
    const rows = bangunBarisLaporan(HARIAN, opsi({ saldoAwal: 750000 }))
    expect(rows[0].keterangan).toBe('SALDO AWAL (sebelum 3 Agustus 2026)')
    expect(rows[0].saldo).toBe(750000)
    expect(rows[rows.length - 1].keterangan).toBe('TOTAL (3 transaksi)')
  })

  it('SALDO AWAL + masuk − keluar = saldo di baris TOTAL', () => {
    const campur = [...HARIAN, keluar('h4', '2026-08-03', 100000)]
    const rows = bangunBarisLaporan(campur, opsi({ saldoAwal: 750000 }))
    const total = rows[rows.length - 1]
    expect(total.masuk).toBe(430000)
    expect(total.keluar).toBe(100000)
    expect(total.saldo).toBe(750000 + 430000 - 100000)
  })

  it('transaksi dicetak kronologis NAIK walau masukannya terbalik', () => {
    const terbalik = [...HARIAN].reverse()
    const rows = bangunBarisLaporan(terbalik, opsi()).filter((r) => !r._ringkas)
    expect(rows.map((r) => r.no)).toEqual([1, 2, 3])
    expect(rows.map((r) => r.masuk)).toEqual([200000, 30000, 200000])
  })

  it('semua transaksi masuk → saldo menaik, tak pernah turun', () => {
    const rows = bangunBarisLaporan(HARIAN, opsi({ saldoAwal: 0 })).filter((r) => !r._ringkas)
    const saldo = rows.map((r) => r.saldo)
    expect(saldo).toEqual([200000, 230000, 430000])
    for (let i = 1; i < saldo.length; i++) expect(saldo[i]).toBeGreaterThan(saldo[i - 1])
  })

  it('SUBTOTAL per cara bayar muncul hanya untuk metode yang ada isinya', () => {
    const rows = bangunBarisLaporan(HARIAN, opsi())
    const sub = rows.filter((r) => String(r.keterangan).startsWith('SUBTOTAL'))
    expect(sub).toHaveLength(1)
    expect(sub[0].keterangan).toBe('SUBTOTAL TUNAI')
    expect(sub[0].masuk).toBe(430000)
    // kolom saldo baris subtotal = net cara bayar itu (yang dicocokkan dgn uang laci)
    expect(sub[0].saldo).toBe(430000)
  })

  it('dua cara bayar → dua subtotal, urut sesuai metodeOpts', () => {
    const campur = [
      masuk('m1', '2026-08-03', 200000, { metode: 'Tunai' }),
      masuk('m2', '2026-08-03', 500000, { metode: 'Transfer' })
    ]
    const sub = bangunBarisLaporan(campur, opsi()).filter((r) =>
      String(r.keterangan).startsWith('SUBTOTAL')
    )
    expect(sub.map((r) => r.keterangan)).toEqual(['SUBTOTAL TUNAI', 'SUBTOTAL TRANSFER'])
  })

  it('pakaiSaldoAwal:false → tanpa baris awal, saldo mulai dari 0', () => {
    const rows = bangunBarisLaporan(HARIAN, opsi({ saldoAwal: 750000, pakaiSaldoAwal: false }))
    expect(rows[0].no).toBe(1)
    expect(rows[0].saldo).toBe(200000)
    expect(rows[rows.length - 1].saldo).toBe(430000)
  })

  it('daftar kosong tetap menghasilkan SALDO AWAL + TOTAL 0 transaksi', () => {
    const rows = bangunBarisLaporan([], opsi({ saldoAwal: 120000 }))
    expect(rows).toHaveLength(2)
    expect(rows[1].keterangan).toBe('TOTAL (0 transaksi)')
    expect(rows[1].saldo).toBe(120000) // saldo tak berubah karena tak ada mutasi
  })

  it('tanpa ringkasMetodeOf, laporan tetap sah (hanya tanpa subtotal)', () => {
    const rows = bangunBarisLaporan(HARIAN, { saldoAwal: 0 })
    expect(rows.some((r) => String(r.keterangan).startsWith('SUBTOTAL'))).toBe(false)
    expect(rows[rows.length - 1].saldo).toBe(430000)
  })
})

describe('laporan tersaring ⇄ peta saldo layar tetap bertemu', () => {
  // Penjaga silang: angka di kolom Saldo layar (petaSaldoBerjalan atas ledger tersaring)
  // harus sama dengan saldo baris terakhir laporan. Kalau dua jalur ini menyimpang,
  // Kyai akan melihat angka berbeda di layar dan di PDF untuk penyaring yang sama.
  const ledgerTersaring = [
    masuk('p1', '2026-07-31', 500000),
    masuk('p2', '2026-08-03', 200000),
    keluar('p3', '2026-08-03', 50000)
  ]
  const periode = ledgerTersaring.filter((b) => b.tanggal.startsWith('2026-08-03'))

  it('saldo baris terakhir laporan = saldo peta untuk transaksi terakhir', () => {
    const rows = bangunBarisLaporan(periode, {
      saldoAwal: saldoAwalSebelum(ledgerTersaring, '2026-08-03'),
      labelPeriode: '3 Agustus 2026'
    })
    const peta = petaSaldoBerjalan(ledgerTersaring)
    const barisTerakhir = rows.filter((r) => !r._ringkas).at(-1)
    expect(barisTerakhir.saldo).toBe(peta.get('p3'))
    expect(rows.at(-1).saldo).toBe(peta.get('p3')) // TOTAL = saldo akhir
  })
})
