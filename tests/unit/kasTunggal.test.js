// Kyai (14 Sep 2026), tentang Kas Induk/Yayasan yang "kosong":
//   "kalau bisyaroh dibebankan ke lembaga pasti ada lembaga yg minus, karena setiap unit itu
//    saling mensubsidi satu sama lain" — "selama ini secara operasional itu kas tunggal, dan
//    jika lembaga membutuhkan baru mengajukan ke yayasan".
// Lalu, atas usulan menyesuaikan tampilannya: "iya saya terima usulannya yg kas induk".
//
// Yang dikunci di sini: lembaga hanyalah LABEL sumber dana. Kartu per lembaga menampilkan
// pemasukan, saldonya satu untuk kas yayasan, dan keduanya dihitung dengan rumus yang sama —
// jumlah seluruh kartu selalu bertemu dengan kas yayasan, apa pun sebaran labelnya.
import { describe, it, expect } from 'vitest'
import {
  LABEL_KAS_UMUM,
  labelKasLembaga,
  jumlahKas,
  ringkasKasLembaga,
  petaKasLembaga,
  kasLembagaBaris
} from '@/utils/kasLembaga'
import { saldoAwalSebelum } from '@/utils/bukuIndukLaporan'

const peta = petaKasLembaga([
  { label: 'Syahriyah SDI', kas_lembaga: 'SDI' },
  { label: 'Syahriyah TPQ Pagi', kas_lembaga: 'TPQ Pagi' }
])
const resolver = (r) => kasLembagaBaris(r, peta)

// Kas pondok dalam kecil: pemasukan berlabel lembaga, infaq tanpa label, dan bisyaroh — yang
// ditulis pencairan TANPA `lembaga`, jadi seluruhnya jatuh ke Umum / Yayasan.
const AGUSTUS = [
  { id: 'a1', tanggal: '2026-08-01', tipe: 'masuk', nominal: 3000000, kategori: 'Syahriyah SDI' },
  {
    id: 'a2',
    tanggal: '2026-08-02',
    tipe: 'masuk',
    nominal: 1200000,
    kategori: 'Syahriyah TPQ Pagi'
  },
  { id: 'a3', tanggal: '2026-08-03', tipe: 'masuk', nominal: 150000, kategori: 'Infaq' },
  { id: 'a4', tanggal: '2026-08-25', tipe: 'keluar', nominal: 3900000, kategori: 'Bisyaroh' },
  { id: 'a5', tanggal: '2026-08-26', tipe: 'keluar', nominal: 100000, lembaga: 'SDI' }
]
const SEPTEMBER = [
  { id: 's1', tanggal: '2026-09-02', tipe: 'masuk', nominal: 2800000, kategori: 'Syahriyah SDI' },
  {
    id: 's2',
    tanggal: '2026-09-03',
    tipe: 'masuk',
    nominal: 1300000,
    kategori: 'Syahriyah TPQ Pagi'
  },
  { id: 's3', tanggal: '2026-09-25', tipe: 'keluar', nominal: 3900000, kategori: 'Bisyaroh' }
]

describe('labelKasLembaga — satu nama untuk baris tanpa label lembaga', () => {
  it('kosong / null / spasi → "Umum / Yayasan", bukan lagi "Kas Induk"', () => {
    expect(LABEL_KAS_UMUM).toBe('Umum / Yayasan')
    expect(labelKasLembaga('')).toBe(LABEL_KAS_UMUM)
    expect(labelKasLembaga(null)).toBe(LABEL_KAS_UMUM)
    expect(labelKasLembaga(undefined)).toBe(LABEL_KAS_UMUM)
    expect(labelKasLembaga('   ')).toBe(LABEL_KAS_UMUM)
  })

  it('nama lembaga dipertahankan (hanya spasi tepi dibuang)', () => {
    expect(labelKasLembaga('SDI')).toBe('SDI')
    expect(labelKasLembaga('  Kelas Baca ')).toBe('Kelas Baca')
  })

  it('slug nama berkas dari label ini aman — garis miringnya tak ikut ke nama berkas', () => {
    // Judul & nama berkas PDF per lembaga dibentuk dari label ini dengan regex yang sama.
    expect(LABEL_KAS_UMUM.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toBe('umum-yayasan')
  })
})

describe('jumlahKas — satu kas, tanpa dipecah lembaga', () => {
  it('menjumlah masuk, keluar, selisih, dan jumlah baris', () => {
    expect(jumlahKas(AGUSTUS)).toEqual({
      masuk: 4350000,
      keluar: 4000000,
      selisih: 350000,
      jumlah: 5
    })
  })

  it('baris lama bercolom masuk/keluar terpisah tetap terbaca; nominal sampah jadi nol', () => {
    const rows = [{ masuk: 5000, nominal: 9999 }, { keluar: 2000 }, { tipe: 'masuk', nominal: 'x' }]
    expect(jumlahKas(rows)).toEqual({ masuk: 5000, keluar: 2000, selisih: 3000, jumlah: 3 })
  })

  it('masukan aneh tidak melempar', () => {
    const nol = { masuk: 0, keluar: 0, selisih: 0, jumlah: 0 }
    expect(jumlahKas()).toEqual(nol)
    expect(jumlahKas(null)).toEqual(nol)
  })
})

describe('KUNCI kas tunggal: kartu per lembaga selalu bertemu dengan kas yayasan', () => {
  it('jumlah pemasukan, pengeluaran, dan transaksi seluruh kartu = kas yayasan', () => {
    const kartu = ringkasKasLembaga(AGUSTUS, resolver)
    const kas = jumlahKas(AGUSTUS)
    expect(kartu.reduce((n, o) => n + o.masuk, 0)).toBe(kas.masuk)
    expect(kartu.reduce((n, o) => n + o.keluar, 0)).toBe(kas.keluar)
    expect(kartu.reduce((n, o) => n + o.jumlah, 0)).toBe(kas.jumlah)
  })

  it('bisyaroh tanpa label membuat "saldo" Umum / Yayasan minus walau kasnya surplus', () => {
    // Inilah "kas induk/yayasan kosong" yang Kyai lihat — dan alasan kartunya kini
    //   menampilkan PEMASUKAN, bukan saldo.
    const umum = ringkasKasLembaga(AGUSTUS, resolver).find((o) => !o.kunci)
    expect(umum).toMatchObject({ masuk: 150000, keluar: 3900000, saldo: -3750000 })
    expect(jumlahKas(AGUSTUS).selisih).toBe(350000)
  })

  it('saldo kas yayasan satu angka; saldo per lembaga cara lama hanya pecahannya', () => {
    // Pola Buku Induk: saldo sebelum = ledger TANPA penyaring lembaga, lalu + mutasi periode
    //   TANPA penyaring lembaga.
    const ledger = [...AGUSTUS, ...SEPTEMBER]
    const sebelum = saldoAwalSebelum(ledger, '2026-09')
    const setelah = sebelum + jumlahKas(SEPTEMBER).selisih
    expect(sebelum).toBe(350000)
    expect(setelah).toBe(550000)

    const caraLama = ringkasKasLembaga(ledger, resolver)
    // Kartu "Kas Induk / Yayasan" dulu menampilkan angka ini...
    expect(caraLama.find((o) => !o.kunci).saldo).toBe(-7650000)
    // ...padahal uangnya ada, di kas yang sama.
    expect(caraLama.reduce((n, o) => n + o.saldo, 0)).toBe(setelah)
  })
})
