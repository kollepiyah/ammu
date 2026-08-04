// Kyai (4 Agu 2026): "pencatatan kas per lembaga itu sendiri-sendiri sesuai LABEL
// PEMBAYARAN" — untuk transaksi Buku Induk / Uang Buku / Uang Kegiatan / Tabungan.
//
// Penentunya jenis pembayaran, BUKAN tempat santri sekolah: satu santri bisa
// membayar syahriyah SDI dan uang buku TPQ dalam satu transaksi, dan uangnya harus
// jatuh ke dua kas berbeda. Tagihan gabungan sudah dipecah per komponen di Buku
// Induk (K1) sehingga kategori tiap BARIS = jenis pembayarannya sendiri.
//
// Uang riil sejak 1 Agu 2026 → baris lama TIDAK ditulis ulang; lembaganya
// diturunkan saat dibaca. Karena itu resolver ini yang dijaga, bukan migrasi data.
import { describe, it, expect } from 'vitest'
import {
  kunciLembaga,
  petaKasLembaga,
  kasLembagaBaris,
  kasLembagaTabungan,
  petaLembagaSantri,
  arahNominal,
  ringkasKasLembaga,
  ringkasTabunganLembaga,
  opsiKasLembaga,
  KAS_LEMBAGA_EKSTRA
} from '@/utils/kasLembaga'

const JENIS = [
  { id: 'syah_sdi', label: 'Syahriyah SDI', kas_lembaga: 'SDI' },
  { id: 'syah_tpq', label: 'Syahriyah TPQ Pagi', kas_lembaga: 'TPQ Pagi' },
  // kas_lembaga kosong, whitelist tepat satu → jatuh ke whitelist itu
  { id: 'buku_kb', label: 'Uang Buku Kelas Baca', lembaga_only: ['Kelas Baca'] },
  // whitelist lebih dari satu & tanpa kas_lembaga → tak bisa ditentukan
  { id: 'kegiatan', label: 'Uang Kegiatan', lembaga_only: ['SDI', 'TK'] },
  // tanpa penanda apa pun
  { id: 'infaq', label: 'Infaq' }
]

describe('kunciLembaga — perbandingan nama lembaga', () => {
  it('abai huruf besar/kecil, spasi tepi, dan spasi ganda', () => {
    expect(kunciLembaga('  Kelas   Baca ')).toBe('kelas baca')
    expect(kunciLembaga('KELAS BACA')).toBe(kunciLembaga('kelas baca'))
  })

  it('null/undefined → string kosong, tidak melempar', () => {
    expect(kunciLembaga(null)).toBe('')
    expect(kunciLembaga(undefined)).toBe('')
  })
})

describe('petaKasLembaga', () => {
  it('membaca kas_lembaga apa adanya', () => {
    const p = petaKasLembaga(JENIS)
    expect(p.get('syahriyah sdi')).toBe('SDI')
    expect(p.get('syahriyah tpq pagi')).toBe('TPQ Pagi')
  })

  it('kas_lembaga kosong + whitelist TEPAT SATU → pakai whitelist itu', () => {
    expect(petaKasLembaga(JENIS).get('uang buku kelas baca')).toBe('Kelas Baca')
  })

  it('whitelist >1 atau tanpa penanda → tidak masuk peta (jadi Kas Induk)', () => {
    const p = petaKasLembaga(JENIS)
    expect(p.has('uang kegiatan')).toBe(false)
    expect(p.has('infaq')).toBe(false)
  })

  it('kas_lembaga MENANG atas whitelist kalau keduanya ada', () => {
    const p = petaKasLembaga([{ label: 'X', kas_lembaga: 'TK', lembaga_only: ['SDI'] }])
    expect(p.get('x')).toBe('TK')
  })

  it('masukan aneh tidak melempar', () => {
    expect(petaKasLembaga(null).size).toBe(0)
    expect(petaKasLembaga([null, {}, { label: '   ' }]).size).toBe(0)
  })
})

describe('kasLembagaBaris — baris keuangan_buku_induk', () => {
  const peta = petaKasLembaga(JENIS)

  it('tag `lembaga` di baris MENANG (fakta saat uang diterima)', () => {
    // Laporan bulan lalu tak boleh bergeser hanya karena konfigurasi jenis diubah.
    const r = { lembaga: 'TK', kategori: 'Syahriyah SDI' }
    expect(kasLembagaBaris(r, peta)).toBe('TK')
  })

  it('tanpa tag → diturunkan dari kategori (baris LAMA tetap terbaca)', () => {
    expect(kasLembagaBaris({ kategori: 'Syahriyah SDI' }, peta)).toBe('SDI')
  })

  it('KUNCI K1: dua komponen satu tagihan gabungan pergi ke kas MASING-MASING', () => {
    const barisSekolah = { kategori: 'Syahriyah SDI', induk_jenis: 'Syahriyah SDI' }
    const barisNgaji = { kategori: 'Syahriyah TPQ Pagi', induk_jenis: 'Syahriyah SDI' }
    expect(kasLembagaBaris(barisSekolah, peta)).toBe('SDI')
    expect(kasLembagaBaris(barisNgaji, peta)).toBe('TPQ Pagi')
  })

  it('kategori tak terdaftar → jatuh ke induk_jenis', () => {
    const r = { kategori: 'Potongan Ngaji', induk_jenis: 'Syahriyah SDI' }
    expect(kasLembagaBaris(r, peta)).toBe('SDI')
  })

  it('kategori diketik beda huruf besar/kecil tetap cocok', () => {
    expect(kasLembagaBaris({ kategori: 'syahriyah  sdi' }, peta)).toBe('SDI')
  })

  it('tak bisa ditentukan → "" (Kas Induk), bukan menebak', () => {
    expect(kasLembagaBaris({ kategori: 'Infaq' }, peta)).toBe('')
    expect(kasLembagaBaris({ kategori: 'Uang Kegiatan' }, peta)).toBe('')
    expect(kasLembagaBaris({}, peta)).toBe('')
    expect(kasLembagaBaris(null, peta)).toBe('')
  })

  it('peta hilang/bukan Map tidak melempar', () => {
    expect(kasLembagaBaris({ kategori: 'Syahriyah SDI' })).toBe('')
    expect(kasLembagaBaris({ lembaga: 'SDI' }, undefined)).toBe('SDI')
  })
})

describe('arahNominal — cermin `stats` BukuIndukView', () => {
  it('tipe menentukan arah, nominal jadi cadangan kolom arah', () => {
    expect(arahNominal({ tipe: 'masuk', nominal: 5000 })).toEqual({ masuk: 5000, keluar: 0 })
    expect(arahNominal({ tipe: 'keluar', nominal: 5000 })).toEqual({ masuk: 0, keluar: 5000 })
  })

  it('kolom masuk/keluar terpisah dipakai kalau ada (baris lama)', () => {
    expect(arahNominal({ masuk: 3000, nominal: 9999 })).toEqual({ masuk: 3000, keluar: 0 })
    expect(arahNominal({ keluar: 2000, nominal: 9999 })).toEqual({ masuk: 0, keluar: 2000 })
  })

  it('baris tanpa arah & masukan aneh → nol, tidak melempar', () => {
    expect(arahNominal({ nominal: 1000 })).toEqual({ masuk: 0, keluar: 0 })
    expect(arahNominal(null)).toEqual({ masuk: 0, keluar: 0 })
    expect(arahNominal({ tipe: 'masuk', nominal: 'abc' })).toEqual({ masuk: 0, keluar: 0 })
  })
})

describe('ringkasKasLembaga', () => {
  const peta = petaKasLembaga(JENIS)
  const resolver = (r) => kasLembagaBaris(r, peta)
  const rows = [
    { tipe: 'masuk', nominal: 200000, kategori: 'Syahriyah SDI' },
    { tipe: 'masuk', nominal: 90000, kategori: 'Syahriyah TPQ Pagi' },
    { tipe: 'keluar', nominal: 50000, lembaga: 'SDI', kategori: 'Beli papan tulis' },
    { tipe: 'masuk', nominal: 25000, kategori: 'Infaq' } // tak berlembaga → Kas Induk
  ]

  it('menjumlah masuk/keluar/saldo per lembaga', () => {
    const out = ringkasKasLembaga(rows, resolver)
    const sdi = out.find((x) => x.lembaga === 'SDI')
    expect(sdi).toMatchObject({ masuk: 200000, keluar: 50000, saldo: 150000, jumlah: 2 })
    expect(out.find((x) => x.lembaga === 'TPQ Pagi')).toMatchObject({ masuk: 90000, saldo: 90000 })
  })

  it('KUNCI: Kas Induk selalu di URUTAN TERAKHIR (keranjang sisa, bukan lembaga)', () => {
    const out = ringkasKasLembaga(rows, resolver)
    expect(out[out.length - 1].lembaga).toBe('')
    expect(out[out.length - 1].masuk).toBe(25000)
  })

  it('lembaga berurut nama (locale id)', () => {
    const out = ringkasKasLembaga(rows, resolver).filter((x) => x.kunci)
    expect(out.map((x) => x.lembaga)).toEqual(['SDI', 'TPQ Pagi'])
  })

  it('nama beda huruf besar/kecil dihitung SATU lembaga', () => {
    const out = ringkasKasLembaga(
      [
        { tipe: 'masuk', nominal: 1000, lembaga: 'Kelas Baca' },
        { tipe: 'masuk', nominal: 2000, lembaga: 'kelas  baca' }
      ],
      resolver
    )
    expect(out).toHaveLength(1)
    expect(out[0].masuk).toBe(3000)
  })

  it('daftar kosong / resolver hilang tidak melempar', () => {
    expect(ringkasKasLembaga([], resolver)).toEqual([])
    expect(ringkasKasLembaga(null, resolver)).toEqual([])
    expect(ringkasKasLembaga(rows)).toHaveLength(1) // semua jatuh ke Kas Induk
  })
})

describe('kasLembagaTabungan — ikut lembaga santri', () => {
  const santri = [
    { id: 's1', lembaga: 'TPQ Pagi', lembaga_sekolah: 'SDI' },
    { id: 's2', lembaga: '', lembaga_sekolah: 'Kelas Baca' }, // hanya sekolah
    { id: 's3', lembaga: '', lembaga_sekolah: '' }
  ]
  const peta = petaLembagaSantri(santri)

  it('lembaga ngaji dipakai lebih dulu', () => {
    expect(kasLembagaTabungan({ santri_id: 's1' }, peta)).toBe('TPQ Pagi')
  })

  it('ngaji kosong → jatuh ke lembaga sekolah', () => {
    expect(kasLembagaTabungan({ santri_id: 's2' }, peta)).toBe('Kelas Baca')
  })

  it('dua-duanya kosong / santri tak dikenal → "" (Kas Induk)', () => {
    expect(kasLembagaTabungan({ santri_id: 's3' }, peta)).toBe('')
    expect(kasLembagaTabungan({ santri_id: 'entah' }, peta)).toBe('')
    expect(kasLembagaTabungan({}, peta)).toBe('')
  })

  it('id angka vs teks tetap cocok (id Supabase = TEKS)', () => {
    const p = petaLembagaSantri([{ id: 7, lembaga: 'PTPT' }])
    expect(kasLembagaTabungan({ santri_id: 7 }, p)).toBe('PTPT')
    expect(kasLembagaTabungan({ santri_id: '7' }, p)).toBe('PTPT')
  })

  it('masukan aneh tidak melempar', () => {
    expect(petaLembagaSantri(null).size).toBe(0)
    expect(kasLembagaTabungan(null, peta)).toBe('')
    expect(kasLembagaTabungan({ santri_id: 's1' })).toBe('')
  })
})

describe('ringkasTabunganLembaga — setor/tarik per lembaga', () => {
  const peta = petaLembagaSantri([
    { id: 's1', lembaga: 'TPQ Pagi' },
    { id: 's2', lembaga: 'TPQ Pagi' },
    { id: 's3', lembaga: '', lembaga_sekolah: 'SDI' }
  ])
  const mutasi = [
    { santri_id: 's1', jenis: 'setor', nominal: 100000 },
    { santri_id: 's2', jenis: 'setor', nominal: 50000 },
    { santri_id: 's1', jenis: 'tarik', nominal: 30000 },
    { santri_id: 's3', jenis: 'setor', nominal: 20000 },
    { santri_id: 'hantu', jenis: 'setor', nominal: 7000 } // santri tak dikenal
  ]

  it('setor = masuk, tarik = keluar, saldo = setor − tarik', () => {
    const out = ringkasTabunganLembaga(mutasi, peta)
    expect(out.find((x) => x.lembaga === 'TPQ Pagi')).toMatchObject({
      masuk: 150000,
      keluar: 30000,
      saldo: 120000,
      jumlah: 3
    })
    expect(out.find((x) => x.lembaga === 'SDI')).toMatchObject({ saldo: 20000 })
  })

  it('santri tak dikenal jatuh ke Kas Induk di urutan terakhir', () => {
    const out = ringkasTabunganLembaga(mutasi, peta)
    expect(out[out.length - 1]).toMatchObject({ lembaga: '', saldo: 7000 })
  })

  it('jenis selain setor dihitung TARIK (jangan diam-diam jadi masuk)', () => {
    const out = ringkasTabunganLembaga([{ santri_id: 's1', jenis: '', nominal: 5000 }], peta)
    expect(out[0]).toMatchObject({ masuk: 0, keluar: 5000, saldo: -5000 })
  })

  it('bidang santriId (camelCase, data lama) ikut terbaca', () => {
    const out = ringkasTabunganLembaga([{ santriId: 's1', jenis: 'setor', nominal: 1000 }], peta)
    expect(out[0]).toMatchObject({ lembaga: 'TPQ Pagi', saldo: 1000 })
  })

  it('masukan aneh tidak melempar', () => {
    expect(ringkasTabunganLembaga(null, peta)).toEqual([])
    expect(ringkasTabunganLembaga([], peta)).toEqual([])
  })
})

// Kyai 4 Agu 2026 (lanjutan): "ini belum ada, untuk lembaga TPQ (TPQ mencakup TPQ Pagi/
// TPQ Sore/Pra PTPT/PTPT/PPPH), Fullday, dan Ma'had (Uang Makan, Syahriyah Pondok)" —
// plus "kelas baca jadi satu dg TPQ Pagi".
//
// Akarnya: pilihan "Masuk Kas Lembaga" diambil dari master/lembaga, dan di master Kyai
// (terverifikasi REST 4 Agu) TIDAK ADA baris "TPQ" payung, tidak ada "Fullday", dan tidak
// ada "Ma'had" — dua yang terakhir itu STATUS santri, bukan lembaga. Jadi ketiga kas itu
// mustahil dipilih, bukan sekadar belum diisi.
describe('opsiKasLembaga — pilihan kas termasuk yang BUKAN baris master', () => {
  const MASTER_4AGU = [
    { lembaga: 'TPQ Pagi', tipe: 'Qiraati' },
    { lembaga: 'TPQ Sore', tipe: 'Qiraati' },
    { lembaga: 'PTPT', tipe: 'Qiraati' },
    { lembaga: 'SDI', tipe: 'Formal' },
    { lembaga: 'TK', tipe: 'Formal' },
    { lembaga: 'Kelas Baca', tipe: 'Formal' }
  ]
  const nama = (list) => list.map((o) => o.nama)

  it("KUNCI: TPQ, Fullday, dan Ma'had bisa dipilih walau bukan baris master", () => {
    const out = nama(opsiKasLembaga(MASTER_4AGU))
    expect(out).toContain('TPQ')
    expect(out).toContain('Fullday')
    expect(out).toContain("Ma'had")
  })

  it('baris master tetap ada semua, dan urut master dulu', () => {
    const out = nama(opsiKasLembaga(MASTER_4AGU))
    expect(out.slice(0, 6)).toEqual(['TPQ Pagi', 'TPQ Sore', 'PTPT', 'SDI', 'TK', 'Kelas Baca'])
  })

  it('"Kelas Baca jadi satu dg TPQ Pagi" bisa dinyatakan — dua-duanya ada sbg pilihan', () => {
    // Penyatuannya lewat setelan: jenis Kelas Baca diarahkan ke kas 'TPQ Pagi'.
    // Yang perlu dijamin kode cuma: kedua nama itu tersedia untuk dipilih.
    const out = nama(opsiKasLembaga(MASTER_4AGU))
    expect(out).toContain('Kelas Baca')
    expect(out).toContain('TPQ Pagi')
  })

  it('kas ekstra membawa keterangan (dipakai UI utk menjelaskan cakupan TPQ)', () => {
    const tpq = opsiKasLembaga(MASTER_4AGU).find((o) => o.nama === 'TPQ')
    expect(tpq.ket).toMatch(/Pra PTPT/)
    expect(KAS_LEMBAGA_EKSTRA.map((e) => e.nama)).toEqual(['TPQ', 'Fullday', "Ma'had"])
  })

  it('master yang sudah memuat nama kas ekstra tidak menggandakannya', () => {
    const out = nama(opsiKasLembaga([...MASTER_4AGU, { lembaga: "Ma'had", tipe: 'Qiraati' }]))
    expect(out.filter((n) => n === "Ma'had")).toHaveLength(1)
  })

  it('nama beda huruf besar/kecil dihitung sama (tak menggandakan)', () => {
    const out = nama(opsiKasLembaga([{ lembaga: 'fullday' }]))
    expect(out.filter((n) => n.toLowerCase() === 'fullday')).toHaveLength(1)
  })

  it('KUNCI: nilai yang SEDANG dipakai selalu disertakan walau tak dikenal', () => {
    // Tanpa ini <select> yang nilainya di luar daftar tampil kosong lalu MENGHAPUS
    // setelan Kyai tanpa suara saat disimpan (nilai bisa masuk lewat impor/SQL).
    const out = nama(opsiKasLembaga(MASTER_4AGU, 'Kas Lama Entah'))
    expect(out).toContain('Kas Lama Entah')
  })

  it('nilai terpakai yang sudah ada di daftar tidak digandakan', () => {
    const out = nama(opsiKasLembaga(MASTER_4AGU, 'SDI'))
    expect(out.filter((n) => n === 'SDI')).toHaveLength(1)
  })

  it('master kosong / null tetap memberi kas ekstra, tidak melempar', () => {
    expect(nama(opsiKasLembaga([]))).toEqual(['TPQ', 'Fullday', "Ma'had"])
    expect(nama(opsiKasLembaga(null))).toEqual(['TPQ', 'Fullday', "Ma'had"])
    expect(nama(opsiKasLembaga([null, {}, { lembaga: '  ' }]))).toEqual([
      'TPQ',
      'Fullday',
      "Ma'had"
    ])
  })
})
