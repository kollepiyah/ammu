// Kyai (5 Sep 2026): "di riwayat keuangan ada tagihan yg sudah di bayar, tapi di tagihan
// santri itu masih ada" + "ada yg belum bayar tapi di riwayat tertulis di bayar."
//
// Yang WAJIB dijaga tes ini, berurut dari yang paling mahal bila jebol — semuanya UANG:
//   1. Tagihan yang SEHAT tak boleh muncul sebagai temuan. Alat ini akan dipakai menulis
//      angka `terbayar`; satu positif palsu = tagihan sah yang dinyatakan lunas.
//   2. Tagihan gabungan (dipecah jadi baris komponen di buku induk) harus tetap cocok.
//      Kalau induknya tak terbaca, SELURUH santri gabungan jadi temuan palsu.
//   3. Selisih dua arah dipisah, karena artinya berlawanan: yang satu tunggakan palsu,
//      yang satu uang yang tak ada jejaknya.
//   4. Baris yang periodenya tak terbaca DILEWATI, bukan ditebak. Menebak = menautkan
//      uang ke tagihan yang salah.
//   5. `usulTerbayar` tak pernah melebihi nominal tagihan.
import { describe, it, expect } from 'vitest'
import {
  periksaKecocokanBayar,
  petaBayarPerSel,
  kodePeriodeBaris,
  jenisBarisBuku,
  jenisTagihan,
  payloadTambalKurang,
  payloadSelaraskanStatus,
  alokasiEksplisit,
  petaBayarPerTagihan
} from '@/utils/cocokBayarTagihan'

const tg = (o) => ({
  id: 'tagihan_1_syahriyah_2026-10',
  santri_id: '1',
  santri_nama: 'Ahmad',
  kategori: 'Syahriyah',
  periode: 'Oktober 2026',
  nominal: 150000,
  terbayar: 0,
  status: 'belum',
  ...o
})
const bi = (o) => ({
  id: 'pos_x',
  sumber: 'pos_santri',
  tipe: 'masuk',
  santri_id: '1',
  santri_nama: 'Ahmad',
  kategori: 'Syahriyah',
  periode_kode: '2026-10',
  nominal: 150000,
  ...o
})

describe('pembacaan kunci sel', () => {
  it('periode terbaca dari periode_kode, teks bulan, atau jatuh tempo', () => {
    expect(kodePeriodeBaris({ periode_kode: '2026-10' })).toBe('2026-10')
    expect(kodePeriodeBaris({ periode: 'Oktober 2026' })).toBe('2026-10')
    expect(kodePeriodeBaris({ periode: '2026-7' })).toBe('2026-07')
    expect(kodePeriodeBaris({ jatuh_tempo: '2026-10-10' })).toBe('2026-10')
  })

  it('periode TAHUNAN disamakan dari dua ejaan yang benar-benar dipakai', () => {
    // POS menulis 'TA2026' di periode_kode; tagihannya berperiode 'TA 2026/2027'.
    // Kalau keduanya tak bertemu, uang gedung yang dibayar di muka tak akan pernah cocok.
    expect(kodePeriodeBaris({ periode_kode: 'TA2026' })).toBe('TA2026')
    expect(kodePeriodeBaris({ periode: 'TA 2026/2027' })).toBe('TA2026')
  })

  it("teks aneh → '' (dilewati, bukan ditebak)", () => {
    expect(kodePeriodeBaris({ periode: 'Semesteran' })).toBe('')
    expect(kodePeriodeBaris(null)).toBe('')
  })

  it('jenis induk baris gabungan terbaca dari induk_jenis (baris baru)', () => {
    expect(jenisBarisBuku({ kategori: 'SPP Sekolah', induk_jenis: 'Syahriyah' })).toBe('syahriyah')
  })

  it('…dan dari keterangan untuk baris LAMA yang belum punya induk_jenis', () => {
    expect(
      jenisBarisBuku({
        kategori: 'Ngaji',
        keterangan: 'Ngaji — Ahmad (123) — bagian dari Syahriyah'
      })
    ).toBe('syahriyah')
  })

  it('baris biasa memakai kategorinya sendiri', () => {
    expect(jenisBarisBuku({ kategori: 'Syahriyah' })).toBe('syahriyah')
    expect(jenisTagihan({ kategori: 'Syahriyah' })).toBe('syahriyah')
  })
})

describe('petaBayarPerSel', () => {
  it('hanya baris MASUK bersumber pembayaran santri yang dihitung', () => {
    const peta = petaBayarPerSel([
      bi({ id: 'a' }),
      bi({ id: 'b', sumber: 'kas_manual' }), // bukan pembayaran santri
      bi({ id: 'c', tipe: 'keluar' }), // pengeluaran
      bi({ id: 'd', santri_id: '' }), // tanpa santri
      bi({ id: 'e', periode_kode: '', periode: '' }) // periode tak terbaca
    ])
    expect(peta.size).toBe(1)
    expect([...peta.values()][0].total).toBe(150000)
  })

  it('transfer terverifikasi & VA BMT ikut terhitung', () => {
    const peta = petaBayarPerSel([
      bi({ id: 'a', sumber: 'transfer_verified', nominal: 50000 }),
      bi({ id: 'b', sumber: 'bmt_va', nominal: 25000 })
    ])
    expect([...peta.values()][0].total).toBe(75000)
  })
})

describe('tagihan yang SEHAT tidak dilaporkan', () => {
  it('lunas lewat POS: buku induk 150rb, terbayar 150rb → nihil temuan', () => {
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'lunas' })], [bi()])
    expect(h.kurangTercatat).toEqual([])
    expect(h.lebihTercatat).toEqual([])
    expect(h.statusMeleset).toEqual([])
  })

  it('bayar sebagian yang konsisten juga nihil', () => {
    const h = periksaKecocokanBayar(
      [tg({ terbayar: 50000, status: 'partial' })],
      [bi({ nominal: 50000 })]
    )
    expect(h.ringkas.kurangTercatat).toBe(0)
    expect(h.ringkas.lebihTercatat).toBe(0)
    expect(h.ringkas.statusMeleset).toBe(0)
  })

  it('tagihan gabungan yang dipecah jadi 2 baris komponen tetap cocok', () => {
    // Inilah jebakan terbesar: baris buku induk memakai label KOMPONEN, bukan nama
    // tagihannya. Tanpa pembacaan induk_jenis, ini akan tampil sebagai selisih 150rb.
    const h = periksaKecocokanBayar(
      [tg({ terbayar: 150000, status: 'lunas' })],
      [
        bi({ id: 'p1', kategori: 'SPP Sekolah', induk_jenis: 'Syahriyah', nominal: 100000 }),
        bi({ id: 'p2', kategori: 'Ngaji', induk_jenis: 'Syahriyah', nominal: 50000 })
      ]
    )
    expect(h.kurangTercatat).toEqual([])
    expect(h.lebihTercatat).toEqual([])
  })
})

describe('kurangTercatat — "di riwayat sudah bayar, di tagihan masih ada"', () => {
  // Bayar di muka: uang masuk sebelum tagihannya terbit, lalu generator melahirkan
  // tagihan dengan terbayar 0 karena ia hanya memeriksa tagihan kembar.
  const hasil = periksaKecocokanBayar([tg()], [bi()], { namaSantri: { 1: 'Ahmad' } })

  it('terdeteksi dengan selisih penuh', () => {
    expect(hasil.kurangTercatat).toHaveLength(1)
    const t = hasil.kurangTercatat[0]
    expect(t.diRiwayat).toBe(150000)
    expect(t.terbayar).toBe(0)
    expect(t.selisih).toBe(150000)
    expect(t.nama).toBe('Ahmad')
    expect(t.barisBuku).toEqual(['pos_x'])
  })

  it('usul tambalannya melunasi, dan tak pernah melebihi nominal tagihan', () => {
    expect(hasil.kurangTercatat[0].usulTerbayar).toBe(150000)
    const lebihBayar = periksaKecocokanBayar([tg()], [bi({ nominal: 200000 })])
    expect(lebihBayar.kurangTercatat[0].usulTerbayar).toBe(150000)
  })

  it('payload tambalannya menulis terbayar + status + jejak, tanpa menyentuh nominal', () => {
    const p = payloadTambalKurang(hasil.kurangTercatat[0], '2026-09-05T10:00:00Z')
    expect(p.terbayar).toBe(150000)
    expect(p.status).toBe('lunas')
    expect(p.rekon_dari).toBe(0)
    expect(p).not.toHaveProperty('nominal')
  })

  it('sebagian pun terdeteksi (cicilan yang gagal ditulis ke tagihan)', () => {
    const h = periksaKecocokanBayar(
      [tg({ terbayar: 50000, status: 'partial' })],
      [bi({ id: 'p1', nominal: 50000 }), bi({ id: 'p2', nominal: 100000 })]
    )
    expect(h.kurangTercatat[0].selisih).toBe(100000)
    expect(payloadTambalKurang(h.kurangTercatat[0], 's').status).toBe('lunas')
  })
})

describe('lebihTercatat — "tagihan mengaku terbayar, uangnya tak ada di riwayat"', () => {
  it('terdeteksi saat baris buku induknya dihapus', () => {
    // Menghapus transaksi POS memang TIDAK me-revert tagihan (tertulis di layarnya).
    const h = periksaKecocokanBayar(
      [tg({ terbayar: 150000, status: 'lunas' })],
      [bi({ nominal: 50000 })]
    )
    expect(h.kurangTercatat).toEqual([])
    expect(h.lebihTercatat).toHaveLength(1)
    expect(h.lebihTercatat[0].selisih).toBe(100000)
  })

  it('tagihan tanpa satu pun baris buku induk TIDAK dilaporkan di sini', () => {
    // Sengaja: tagihan yang belum dibayar sama sekali adalah keadaan normal, dan tagihan
    // lunas tanpa jejak bisa saja dibayar lewat jalur lama sebelum buku induk dipakai.
    // Melaporkannya akan menenggelamkan temuan yang benar-benar perlu diperiksa.
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'lunas' })], [])
    expect(h.lebihTercatat).toEqual([])
    expect(h.kurangTercatat).toEqual([])
  })
})

describe('statusMeleset — kolom status vs sisa hasil hitung', () => {
  it('kolom bilang lunas padahal masih ada sisa', () => {
    // Daftar tunggakan POS & notifikasi menyaring lewat KOLOM, sedangkan Tagihan &
    // Pembayaran menghitung SISA — selama berselisih, dua layar bicara beda.
    const h = periksaKecocokanBayar([tg({ terbayar: 50000, status: 'lunas' })], [])
    expect(h.statusMeleset).toHaveLength(1)
    expect(h.statusMeleset[0].statusKolom).toBe('lunas')
    expect(h.statusMeleset[0].statusHitung).toBe('partial')
    expect(payloadSelaraskanStatus(h.statusMeleset[0])).toEqual({ status: 'partial' })
  })

  it('kolom bilang belum padahal sudah penuh', () => {
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'belum' })], [])
    expect(h.statusMeleset[0].statusHitung).toBe('lunas')
  })

  it('tagihan tanpa kolom status tak dilaporkan (baris lama, bukan salah)', () => {
    const h = periksaKecocokanBayar([tg({ status: '', terbayar: 0 })], [])
    expect(h.statusMeleset).toEqual([])
  })
})

describe('transferYatim — uang di riwayat dari transfer yang tidak sah', () => {
  const baris = {
    id: 'bi_trf_p9',
    sumber: 'transfer_verified',
    tipe: 'masuk',
    santri_id: '1',
    santri_nama: 'Ahmad',
    nominal: 300000,
    tanggal: '2026-09-01',
    transfer_ref_id: 'p9',
    periode_kode: '2026-10',
    kategori: 'Syahriyah'
  }

  it('transfer yang DITOLAK tapi barisnya tertinggal', () => {
    const h = periksaKecocokanBayar([], [baris], {
      transferPending: [{ id: 'p9', status: 'rejected' }]
    })
    expect(h.transferYatim).toHaveLength(1)
    expect(h.transferYatim[0].refStatus).toBe('rejected')
    expect(h.ringkas.transferYatimRp).toBe(300000)
  })

  it('transfer yang sudah terhapus juga terlihat', () => {
    const h = periksaKecocokanBayar([], [baris], { transferPending: [] })
    expect(h.transferYatim[0].refStatus).toContain('tak ada')
  })

  it('transfer yang sah tidak dilaporkan', () => {
    const h = periksaKecocokanBayar([], [baris], {
      transferPending: [{ id: 'p9', status: 'verified' }]
    })
    expect(h.transferYatim).toEqual([])
  })

  it('tanpa daftar transferPending, pemeriksaan ini dilewati (bukan dianggap yatim)', () => {
    const h = periksaKecocokanBayar([], [baris])
    expect(h.transferYatim).toEqual([])
  })
})

describe('bayarTanpaTagihan — bayar di muka yang belum bertagihan', () => {
  it('dilaporkan terpisah: bukan salah, tapi calon tunggakan palsu bulan depan', () => {
    const h = periksaKecocokanBayar([], [bi({ periode_kode: '2026-12' })])
    expect(h.bayarTanpaTagihan).toHaveLength(1)
    expect(h.bayarTanpaTagihan[0].kode).toBe('2026-12')
    expect(h.bayarTanpaTagihan[0].diRiwayat).toBe(150000)
    expect(h.ringkas.bayarTanpaTagihanRp).toBe(150000)
  })

  it('sel yang sudah punya tagihan tidak ikut ke daftar ini', () => {
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'lunas' })], [bi()])
    expect(h.bayarTanpaTagihan).toEqual([])
  })
})

describe('ringkasan', () => {
  it('menghitung jumlah baris & rupiah tiap kelompok', () => {
    const h = periksaKecocokanBayar(
      [tg(), tg({ id: 't2', santri_id: '2', santri_nama: 'Budi', periode: 'November 2026' })],
      [bi(), bi({ id: 'p2', santri_id: '2', periode_kode: '2026-11', nominal: 100000 })]
    )
    expect(h.ringkas.tagihanDiperiksa).toBe(2)
    expect(h.ringkas.kurangTercatat).toBe(2)
    expect(h.ringkas.kurangTercatatRp).toBe(250000)
  })

  it('daftar kosong tidak melempar galat', () => {
    const h = periksaKecocokanBayar(null, null)
    expect(h.ringkas.kurangTercatat).toBe(0)
    expect(h.bayarTanpaTagihan).toEqual([])
  })
})

describe('alokasi EKSPLISIT — POS ber-tagihan_id & VA BMT ber-alokasi[]', () => {
  // Sejak v.1.4.2 sebuah baris buku induk boleh menyebut sendiri tagihan yang dilunasinya.
  // Dua penulisnya beda bentuk: POS satu tagihan per baris, VA BMT bisa beberapa sekaligus.
  it('membaca kedua bentuk', () => {
    expect(alokasiEksplisit({ tagihan_id: 't1', nominal: 90000 })).toEqual([
      { tagihanId: 't1', nominal: 90000 }
    ])
    expect(
      alokasiEksplisit({
        nominal: 300000,
        alokasi: [
          { tagihan_id: 't1', nominal: 100000 },
          { tagihan_id: 't2', nominal: 200000 }
        ]
      })
    ).toEqual([
      { tagihanId: 't1', nominal: 100000 },
      { tagihanId: 't2', nominal: 200000 }
    ])
    expect(alokasiEksplisit({ kategori: 'Syahriyah' })).toEqual([])
  })

  it('baris ber-alokasi TIDAK dihitung dua kali lewat bucket periode', () => {
    // Kalau ikut terhitung di dua jalur, tagihan yang SEHAT akan dilaporkan
    // "lebih tercatat" — persis positif palsu yang paling mahal di alat ini.
    const buku = [bi({ id: 'p1', tagihan_id: 'tagihan_1_syahriyah_2026-10' })]
    expect(petaBayarPerSel(buku).size).toBe(0)
    expect(petaBayarPerTagihan(buku).get('tagihan_1_syahriyah_2026-10').total).toBe(150000)
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'lunas' })], buku)
    expect(h.kurangTercatat).toEqual([])
    expect(h.lebihTercatat).toEqual([])
  })

  it('pembayaran VA BMT terlihat walau barisnya tanpa kategori & periode', () => {
    // Baris `bmt_va` memang tak punya keduanya. Tanpa jalur alokasi ia tak masuk hitungan
    // mana pun, dan tagihan yang separuh dibayar POS lalu dilunasi VA akan tampak
    // "lebih tercatat" padahal benar.
    const buku = [
      bi({ id: 'pos1', nominal: 50000 }),
      {
        id: 'bi_bmt_r9',
        sumber: 'bmt_va',
        tipe: 'masuk',
        santri_id: '1',
        nominal: 100000,
        alokasi: [{ tagihan_id: 'tagihan_1_syahriyah_2026-10', nominal: 100000 }]
      }
    ]
    const h = periksaKecocokanBayar([tg({ terbayar: 150000, status: 'lunas' })], buku)
    expect(h.lebihTercatat).toEqual([])
    expect(h.kurangTercatat).toEqual([])
  })

  it('VA yang tak sampai ke tagihan tetap terdeteksi kurang tercatat', () => {
    const buku = [
      {
        id: 'bi_bmt_r9',
        sumber: 'bmt_va',
        tipe: 'masuk',
        santri_id: '1',
        nominal: 150000,
        alokasi: [{ tagihan_id: 'tagihan_1_syahriyah_2026-10', nominal: 150000 }]
      }
    ]
    const h = periksaKecocokanBayar([tg()], buku)
    expect(h.kurangTercatat).toHaveLength(1)
    expect(h.kurangTercatat[0].diRiwayat).toBe(150000)
    expect(h.kurangTercatat[0].barisBuku).toEqual(['bi_bmt_r9'])
  })
})
