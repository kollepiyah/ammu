// Kyai (14 Sep 2026): "di uang saku dan POS dan yg lain, saya ingin admin keu bisa print
// ulang struk."
//
// Struk cetak ulang kini dirakit di SATU tempat untuk POS, Riwayat POS, Buku Induk, dan
// Uang Kegiatan/Buku. Yang wajib dijaga, karena semuanya pernah salah di kertas:
//   1. Cara bayar transfer tak pernah tercetak "TUNAI" (v.1.4.1, tiga perakit).
//   2. Kolom periode tak berisi "bagian dari Syahriyah" atau teks potongan.
//   3. Total, terbilang, dan data santri ikut — Buku Induk dulu mencetak tanpa NIS/kelas.
import { describe, it, expect } from 'vitest'
import {
  trxDariBaris,
  periodeDariBaris,
  periodeDariKeterangan,
  barisSeTransaksi
} from '../../vue-app/src/utils/trxStruk.js'

describe('barisSeTransaksi — struk cetak ulang dari ledger yang sudah termuat', () => {
  const r = (id, o) => ({ id, santri_id: 's1', tanggal: '2026-09-14', ...o })

  it('baris POS dikumpulkan per transaksi, bukan per nomor struk yang kembar', () => {
    const semua = [
      r('a', { trx_id: 'MU-001140926', trx_uid: 'U1' }),
      r('b', { trx_id: 'MU-001140926', trx_uid: 'U1' }),
      r('c', { trx_id: 'MU-001140926', trx_uid: 'U2', santri_id: 's2' }),
      r('d', { sumber: 'transfer_verified' })
    ]
    expect(barisSeTransaksi(semua[0], semua).map((x) => x.id)).toEqual(['a', 'b'])
  })

  it('baris tanpa nomor struk (transfer/VA) dicetak sendiri, tak disatukan per hari', () => {
    const t1 = r('t1', { sumber: 'transfer_verified' })
    const t2 = r('t2', { sumber: 'transfer_verified' })
    expect(barisSeTransaksi(t1, [t1, t2])).toEqual([t1])
  })

  it('ledger belum memuat barisnya → baris itu sendiri', () => {
    const b = r('x', { trx_id: 'MU-009140926' })
    expect(barisSeTransaksi(b, [])).toEqual([b])
    expect(barisSeTransaksi(null, [b])).toEqual([])
  })
})

const baris = (o) => ({
  id: 'pos_MU-001140926_0_0_abcde',
  tanggal: '2026-09-14',
  tipe: 'masuk',
  sumber: 'pos_santri',
  trx_id: 'MU-001140926',
  santri_id: 's1',
  santri_nama: 'Ahmad',
  kategori: 'Syahriyah',
  nominal: 150000,
  keterangan: 'Syahriyah — Ahmad (1234) — September 2026',
  periode_kode: '2026-09',
  operator: 'Bu Admin',
  metode: 'Tunai',
  ...o
})

describe('trxDariBaris — satu perakit struk cetak ulang', () => {
  it('kosong → null', () => {
    expect(trxDariBaris([])).toBeNull()
    expect(trxDariBaris(null)).toBeNull()
  })

  it('transfer tetap TRANSFER — dari field metode maupun dari sumber', () => {
    expect(trxDariBaris([baris({ metode: 'Transfer' })]).metode).toBe('TRANSFER')
    expect(trxDariBaris([baris({ metode: undefined, sumber: 'transfer_verified' })]).metode).toBe(
      'TRANSFER'
    )
    expect(trxDariBaris([baris({ metode: undefined, sumber: 'bmt_va' })]).metode).toBe('TRANSFER')
    expect(trxDariBaris([baris()]).metode).toBe('TUNAI')
  })

  it('total, bayar, dan terbilang dari seluruh baris', () => {
    const trx = trxDariBaris([
      baris(),
      baris({ id: 'pos_MU-001140926_1_0_x', kategori: 'Uang Buku', nominal: 50000 })
    ])
    expect(trx.total).toBe(200000)
    expect(trx.bayar).toBe(200000)
    expect(trx.kembali).toBe(0)
    expect(typeof trx.terbilang).toBe('string')
    expect(trx.terbilang.length).toBeGreaterThan(0)
  })

  it('data santri & penyetor: wali di baris menang, wali santri sebagai cadangan', () => {
    const santri = {
      nis: '1234',
      lembaga: 'TPQ Pagi',
      kelas: 'Jilid 3',
      lembaga_sekolah: 'SDI',
      kelas_sekolah: 'IV',
      wali: 'Pak Budi',
      aktif: true
    }
    const trx = trxDariBaris([baris()], { santri, ttdUrl: 'ttd.png' })
    expect(trx).toMatchObject({
      santri_nis: '1234',
      lembaga: 'TPQ Pagi',
      kelas: 'Jilid 3',
      lembaga_sekolah: 'SDI',
      kelas_sekolah: 'IV',
      penyetor: 'Pak Budi',
      status_siswa: 'Aktif',
      operator: 'Bu Admin',
      operator_ttd_url: 'ttd.png',
      no_struk: 'MU-001140926'
    })
    expect(trxDariBaris([baris({ wali: 'Bu Siti' })], { santri }).penyetor).toBe('Bu Siti')
    expect(trxDariBaris([baris()], { santri: { aktif: false } }).status_siswa).toBe('Tidak Aktif')
  })

  it('item diurutkan seperti keranjang (id bernomor, bukan urutan abjad)', () => {
    const trx = trxDariBaris([
      baris({ id: 'pos_X_10_0_a', kategori: 'K' }),
      baris({ id: 'pos_X_2_0_a', kategori: 'B' }),
      baris({ id: 'pos_X_0_0_a', kategori: 'A' })
    ])
    expect(trx.items.map((i) => i.jenis)).toEqual(['A', 'B', 'K'])
  })
})

describe('periode di struk', () => {
  it('periode_kode lebih dulu: bulan dan tahun ajaran', () => {
    expect(periodeDariBaris(baris({ periode_kode: '2026-07' }))).toBe('Juli 2026')
    expect(periodeDariBaris(baris({ periode_kode: 'TA2026' }))).toBe('TA 2026/2027')
  })

  it('baris lama tanpa periode_kode dibaca dari keterangan', () => {
    expect(periodeDariBaris(baris({ periode_kode: undefined }))).toBe('September 2026')
  })

  it('pecahan tagihan gabungan tak lagi tercetak "bagian dari …"', () => {
    expect(periodeDariKeterangan('Ngaji — Ahmad (1234) — Juli 2026 — bagian dari Syahriyah')).toBe(
      'Juli 2026'
    )
  })

  it('ekor potongan dilewati', () => {
    expect(
      periodeDariKeterangan('Syahriyah — Ahmad (1234) — Juli 2026 — potongan Anak Guru Rp 75.000')
    ).toBe('Juli 2026')
  })

  it('keterangan kasir yang pendek tetap ikut; keterangan tanpa pola POS kosong', () => {
    expect(periodeDariKeterangan('Infaq — Ahmad (1234) — Maulid')).toBe('Maulid')
    expect(periodeDariKeterangan('Transfer terverifikasi - Syahriyah - Ahmad')).toBe('')
    expect(periodeDariKeterangan('')).toBe('')
  })
})
