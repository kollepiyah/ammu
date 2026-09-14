// Kyai (14 Sep 2026), meneruskan laporan admin keuangan: "riwayat transaksi yg
// dibatalkan/dihapus oleh admin karena kekeliruan input admin, tapi di POS santrinya
// terbaca lunas. padahal tadi sudah dihapus"
//
// Yang WAJIB dijaga tes ini, berurut dari yang paling mahal bila jebol — semuanya UANG:
//   1. Menghapus pembayaran mengembalikan tagihannya TEPAT ke angka sebelum dibayar —
//      termasuk bila ada potongan, pembulatan kasir, atau tagihan gabungan yang dipecah.
//   2. Tagihan TAK PERNAH diturunkan di bawah uang yang masih tercatat. Menghapus baris
//      kembar tak boleh menagih ulang wali yang sudah membayar.
//   3. Hapus yang diulang tak mengurangi dua kali.
//   4. Baris yang cocok dengan lebih dari satu tagihan tak ditebak.
//   5. Kas manual / bisyaroh tak pernah menyentuh tagihan.
//   6. Rumus sisi BAYAR identik dengan yang dulu ditulis PosSantriView.
import { describe, it, expect } from 'vitest'
import {
  pelunasanItem,
  bagiTambahTagihan,
  barisBayarSantri,
  tambahanBaris,
  indeksTagihan,
  tautanBaris,
  rencanaBatalBayar,
  payloadBatalBayar,
  ringkasRencanaBatal,
  pesanHasilHapus,
  barisDariAuditHapus
} from '@/utils/batalBayarTagihan'
import { lunasDenganPotongan } from '@/utils/potonganPos'
import { terbayarDari } from '@/utils/tagihan'

// Rumus PosSantriView sebelum dipindah ke util — pembanding, bukan kode produksi.
function rumusLama(item) {
  const penuh = Number(item.nominal_penuh || 0)
  const potongan = Number(item.potongan_nominal || 0)
  const newDibayar = Number(item.dibayar_lama || 0) + Number(item.nominal || 0)
  const isLunas = lunasDenganPotongan(penuh, item.dibayar_lama, item.nominal, potongan)
  return { lunas: isLunas, terbayar: isLunas ? penuh || newDibayar : newDibayar }
}

const tagihan = (o) => ({
  id: 'tg1',
  santri_id: 's1',
  santri_nama: 'Ahmad',
  kategori: 'Syahriyah',
  periode: 'Juli 2026',
  nominal: 150000,
  terbayar: 150000,
  status: 'lunas',
  ...o
})
const baris = (o) => ({
  id: 'pos_MU-001_0_0_aaaaa',
  tipe: 'masuk',
  sumber: 'pos_santri',
  santri_id: 's1',
  santri_nama: 'Ahmad',
  kategori: 'Syahriyah',
  nominal: 150000,
  periode_kode: '2026-07',
  tagihan_id: 'tg1',
  ...o
})

describe('pelunasanItem — sisi BAYAR, cermin rumus lama PosSantriView', () => {
  const kasus = [
    { nama: 'lunas pas', item: { nominal_penuh: 150000, dibayar_lama: 0, nominal: 150000 } },
    {
      nama: 'lunas dengan potongan',
      item: { nominal_penuh: 300000, dibayar_lama: 0, nominal: 150000, potongan_nominal: 150000 }
    },
    {
      nama: 'pembulatan ke atas',
      item: { nominal_penuh: 150000, dibayar_lama: 0, nominal: 200000 }
    },
    { nama: 'cicilan', item: { nominal_penuh: 300000, dibayar_lama: 100000, nominal: 50000 } },
    {
      nama: 'cicilan + potongan belum lunas',
      item: { nominal_penuh: 300000, dibayar_lama: 0, nominal: 50000, potongan_nominal: 100000 }
    },
    {
      nama: 'bayar di muka (tanpa tagihan)',
      item: { nominal_penuh: 0, dibayar_lama: 0, nominal: 90000 }
    }
  ]
  for (const k of kasus) {
    it(`sama dengan rumus lama: ${k.nama}`, () => {
      const lama = rumusLama(k.item)
      const baru = pelunasanItem(k.item)
      expect(baru.lunas).toBe(lama.lunas)
      expect(baru.terbayar).toBe(lama.terbayar)
      expect(baru.tambah).toBe(lama.terbayar - Number(k.item.dibayar_lama || 0))
    })
  }

  it('tambah = uang + potongan saat potongan menutup tagihan', () => {
    expect(
      pelunasanItem({
        nominal_penuh: 300000,
        dibayar_lama: 0,
        nominal: 150000,
        potongan_nominal: 150000
      }).tambah
    ).toBe(300000)
  })

  it('tambah < uang saat kasir membulatkan ke atas (tagihan dijepit ke nominalnya)', () => {
    expect(pelunasanItem({ nominal_penuh: 150000, dibayar_lama: 0, nominal: 200000 }).tambah).toBe(
      150000
    )
  })
})

describe('bagiTambahTagihan — tambah dibagi ke baris pecahan', () => {
  it('tanpa selisih: tiap baris = uangnya sendiri', () => {
    expect(bagiTambahTagihan([100000, 90000], 190000)).toEqual([100000, 90000])
  })
  it('potongan ditanggung baris paling depan', () => {
    expect(bagiTambahTagihan([100000, 50000], 300000)).toEqual([250000, 50000])
  })
  it('pembulatan ke atas dikurangkan dari depan, tanpa baris negatif', () => {
    expect(bagiTambahTagihan([30000, 120000], 100000)).toEqual([0, 100000])
  })
  it('jumlahnya selalu = tambah', () => {
    const hasil = bagiTambahTagihan([12345, 67890, 11111], 70000)
    expect(hasil.reduce((a, b) => a + b, 0)).toBe(70000)
    expect(hasil.every((x) => x >= 0)).toBe(true)
  })
  it('daftar kosong → kosong', () => {
    expect(bagiTambahTagihan([], 5000)).toEqual([])
  })
})

describe('barisBayarSantri & tambahanBaris', () => {
  it('kas manual, bisyaroh, dan pengeluaran BUKAN pembayaran santri', () => {
    expect(barisBayarSantri(baris({ sumber: 'manual' }))).toBe(false)
    expect(barisBayarSantri(baris({ sumber: 'gaji' }))).toBe(false)
    expect(barisBayarSantri(baris({ tipe: 'keluar' }))).toBe(false)
    expect(barisBayarSantri(baris())).toBe(true)
    expect(barisBayarSantri(baris({ sumber: 'transfer_verified' }))).toBe(true)
    expect(barisBayarSantri(baris({ sumber: 'bmt_va' }))).toBe(true)
  })
  it('tagihan_tambah dipakai bila ada — termasuk nol', () => {
    expect(tambahanBaris(baris({ tagihan_tambah: 120000 }))).toBe(120000)
    expect(tambahanBaris(baris({ tagihan_tambah: 0 }))).toBe(0)
  })
  it('baris lama ditaksir uang + potongan', () => {
    expect(tambahanBaris(baris({ nominal: 150000, potongan_nominal: 150000 }))).toBe(300000)
    expect(tambahanBaris(baris({ tagihan_tambah: 'x' }))).toBe(150000)
  })
})

describe('tautanBaris — tagihan mana yang dilunasi baris ini', () => {
  it('tagihan_id langsung', () => {
    const idx = indeksTagihan([tagihan()])
    expect(tautanBaris(baris(), idx).tautan).toEqual([
      { tagihanId: 'tg1', jumlah: 150000, cara: 'tagihan_id' }
    ])
  })
  it('alokasi VA BMT ke beberapa tagihan', () => {
    const idx = indeksTagihan([tagihan(), tagihan({ id: 'tg2' })])
    const b = {
      id: 'bmt1',
      tipe: 'masuk',
      sumber: 'bmt_va',
      nominal: 250000,
      alokasi: [
        { tagihan_id: 'tg1', nominal: 150000 },
        { tagihan_id: 'tg2', nominal: 100000 }
      ]
    }
    expect(tautanBaris(b, idx).tautan).toEqual([
      { tagihanId: 'tg1', jumlah: 150000, cara: 'alokasi' },
      { tagihanId: 'tg2', jumlah: 100000, cara: 'alokasi' }
    ])
  })
  it('transfer terverifikasi lewat applied_transfer_refs tagihan', () => {
    const idx = indeksTagihan([tagihan({ applied_transfer_refs: ['trf9'] })])
    const b = baris({
      id: 'bi_trf_trf9',
      sumber: 'transfer_verified',
      tagihan_id: undefined,
      periode_kode: undefined,
      transfer_ref_id: 'trf9',
      nominal: 150000
    })
    expect(tautanBaris(b, idx).tautan).toEqual([
      { tagihanId: 'tg1', jumlah: 150000, cara: 'transfer' }
    ])
  })
  it('tagihan yang lahir dari bayar di muka (prabayar_dari) — hanya uangnya', () => {
    const idx = indeksTagihan([tagihan({ prabayar_dari: ['pos_lama'] })])
    const b = baris({ id: 'pos_lama', tagihan_id: undefined, potongan_nominal: 10000 })
    expect(tautanBaris(b, idx).tautan).toEqual([
      { tagihanId: 'tg1', jumlah: 150000, cara: 'prabayar' }
    ])
  })
  it('baris POS lama tanpa tagihan_id → sel santri × jenis × periode', () => {
    const idx = indeksTagihan([tagihan()])
    const b = baris({ tagihan_id: undefined })
    expect(tautanBaris(b, idx).tautan).toEqual([{ tagihanId: 'tg1', jumlah: 150000, cara: 'sel' }])
  })
  it('pecahan tagihan gabungan menemukan induknya lewat induk_jenis', () => {
    const idx = indeksTagihan([tagihan({ nominal: 290000, terbayar: 290000 })])
    const b = baris({ tagihan_id: undefined, kategori: 'Ngaji', induk_jenis: 'Syahriyah' })
    expect(tautanBaris(b, idx).tautan[0].tagihanId).toBe('tg1')
  })
  it('dua tagihan dalam sel yang sama → AMBIGU, tak ditebak', () => {
    const idx = indeksTagihan([tagihan(), tagihan({ id: 'tg_kembar' })])
    const r = tautanBaris(baris({ tagihan_id: undefined }), idx)
    expect(r.ambigu).toBe(true)
    expect(r.tautan).toEqual([])
  })
  it('baris tanpa periode tak dicocokkan ke sel mana pun', () => {
    const idx = indeksTagihan([tagihan()])
    expect(tautanBaris(baris({ tagihan_id: undefined, periode_kode: '' }), idx).tautan).toEqual([])
  })
  it('kas manual tak pernah bertaut', () => {
    const idx = indeksTagihan([tagihan()])
    expect(tautanBaris(baris({ sumber: 'manual' }), idx).tautan).toEqual([])
  })
})

describe('rencanaBatalBayar — laporan Kyai 14 Sep 2026', () => {
  it('pembayaran POS dihapus → tagihan kembali BELUM, tanggal lunas dicabut', () => {
    const t = tagihan({ tanggal_lunas: '2026-09-14', dibayar_via: 'pos_santri' })
    const b = baris({ tagihan_tambah: 150000 })
    const { rencana } = rencanaBatalBayar({
      dihapus: [b],
      tagihan: [t],
      stamp: 'S',
      operator: 'Op'
    })
    expect(rencana).toHaveLength(1)
    const r = rencana[0]
    expect(r.terbayarLama).toBe(150000)
    expect(r.terbayarBaru).toBe(0)
    expect(r.statusBaru).toBe('belum')
    expect(r.payload).toMatchObject({
      terbayar: 0,
      status: 'belum',
      tanggal_lunas: null,
      dibayar_via: '',
      batal_baris: [b.id],
      batal_at: 'S',
      batal_oleh: 'Op',
      batal_dari: 150000
    })
  })

  it('tagihan gabungan dipecah dua baris: hapus semua → nol, hapus satu → sebagian', () => {
    const t = tagihan({ nominal: 290000, terbayar: 290000 })
    const b1 = baris({
      id: 'pos_X_0_0_a',
      kategori: 'SPP Sekolah',
      nominal: 200000,
      tagihan_tambah: 200000
    })
    const b2 = baris({
      id: 'pos_X_0_1_b',
      kategori: 'Ngaji',
      nominal: 90000,
      tagihan_tambah: 90000
    })
    expect(rencanaBatalBayar({ dihapus: [b1, b2], tagihan: [t] }).rencana[0].terbayarBaru).toBe(0)
    const satu = rencanaBatalBayar({ dihapus: [b2], tersisa: [b1], tagihan: [t] }).rencana[0]
    expect(satu.terbayarBaru).toBe(200000)
    expect(satu.statusBaru).toBe('partial')
  })

  it('lunas karena potongan: kembali ke nol dan potongannya ikut dicabut', () => {
    const t = tagihan({
      nominal: 300000,
      terbayar: 300000,
      potongan_nominal: 150000,
      potongan_label: 'Anak Guru'
    })
    for (const b of [
      baris({ nominal: 150000, potongan_nominal: 150000, tagihan_tambah: 300000 }),
      // baris lama tanpa tagihan_tambah — taksiran uang + potongan
      baris({ nominal: 150000, potongan_nominal: 150000 })
    ]) {
      const r = rencanaBatalBayar({ dihapus: [b], tagihan: [t] }).rencana[0]
      expect(r.terbayarBaru).toBe(0)
      expect(r.payload.potongan_nominal).toBe(0)
      expect(r.payload.potongan_label).toBe('')
    }
  })

  it('pembulatan kasir: tagihan_tambah mengembalikan angka tepat, bukan uangnya', () => {
    // tagihan 300rb, sudah dicicil 100rb (baris lain), lalu dilunasi dengan uang 250rb
    //   (dibulatkan) → terbayar dijepit 300rb, tambahan transaksi ini 200rb.
    const t = tagihan({ nominal: 300000, terbayar: 300000 })
    const cicil = baris({ id: 'pos_A', nominal: 100000, tagihan_tambah: 100000 })
    const bulat = baris({ id: 'pos_B', nominal: 250000, tagihan_tambah: 200000 })
    const r = rencanaBatalBayar({ dihapus: [bulat], tersisa: [cicil], tagihan: [t] }).rencana[0]
    expect(r.terbayarBaru).toBe(100000)
    expect(r.statusBaru).toBe('partial')
  })

  it('baris KEMBAR: menghapus satu tak mengubah tagihan yang masih ditopang kembarannya', () => {
    const t = tagihan()
    const asli = baris({ id: 'pos_1' })
    const kembar = baris({ id: 'pos_2' })
    const hasil = rencanaBatalBayar({ dihapus: [kembar], tersisa: [asli], tagihan: [t] })
    expect(hasil.rencana).toEqual([])
    expect(hasil.adaBayar).toBe(true)
  })

  it('pembayaran lain tetap menopang: hanya bagian baris yang dihapus yang kembali', () => {
    const t = tagihan({ nominal: 300000, terbayar: 300000 })
    const a = baris({ id: 'pos_A', nominal: 100000, tagihan_tambah: 100000 })
    const b = baris({ id: 'pos_B', nominal: 200000, tagihan_tambah: 200000 })
    const r = rencanaBatalBayar({ dihapus: [a], tersisa: [b], tagihan: [t] }).rencana[0]
    expect(r.terbayarBaru).toBe(200000)
  })

  it('hapus yang DIULANG tak mengurangi dua kali (batal_baris)', () => {
    const b = baris()
    const sudah = tagihan({ terbayar: 0, status: 'belum', batal_baris: [b.id] })
    expect(rencanaBatalBayar({ dihapus: [b], tagihan: [sudah] }).rencana).toEqual([])
  })

  it('baris yang tagihannya sudah dikembalikan tapi masih ada tak menopang apa pun', () => {
    // hapus baris A pernah gagal sesudah tagihannya dikembalikan; kini baris B dihapus.
    const t = tagihan({ nominal: 300000, terbayar: 200000, batal_baris: ['pos_A'] })
    const a = baris({ id: 'pos_A', nominal: 100000, tagihan_tambah: 100000 })
    const b = baris({ id: 'pos_B', nominal: 200000, tagihan_tambah: 200000 })
    const r = rencanaBatalBayar({ dihapus: [b], tersisa: [a], tagihan: [t] }).rencana[0]
    expect(r.terbayarBaru).toBe(0)
    expect(r.payload.batal_baris).toEqual(['pos_A', 'pos_B'])
  })

  it('tak pernah di bawah nol walau taksiran baris lama berlebih', () => {
    const t = tagihan({ nominal: 150000, terbayar: 150000 })
    const b = baris({ nominal: 200000 }) // pembulatan, tanpa tagihan_tambah
    expect(rencanaBatalBayar({ dihapus: [b], tagihan: [t] }).rencana[0].terbayarBaru).toBe(0)
  })

  it('kas manual: tak ada rencana dan tak dianggap pembayaran', () => {
    const hasil = rencanaBatalBayar({
      dihapus: [baris({ sumber: 'manual', tagihan_id: 'tg1' })],
      tagihan: [tagihan()]
    })
    expect(hasil.rencana).toEqual([])
    expect(hasil.adaBayar).toBe(false)
  })

  it('transfer: ref-nya dicabut dari applied_transfer_refs supaya bisa diakui lagi', () => {
    const t = tagihan({ applied_transfer_refs: ['trf1', 'trf9'] })
    const b = baris({
      id: 'bi_trf_trf9',
      sumber: 'transfer_verified',
      tagihan_id: undefined,
      periode_kode: undefined,
      transfer_ref_id: 'trf9'
    })
    const r = rencanaBatalBayar({ dihapus: [b], tagihan: [t] }).rencana[0]
    expect(r.payload.applied_transfer_refs).toEqual(['trf1'])
    expect(r.terbayarBaru).toBe(0)
  })

  it('ekor jsonb lama (bayar) ikut dinolkan — terbayarDari tak jatuh ke sana lagi', () => {
    const t = tagihan({ terbayar: 0, bayar: 150000 })
    const r = rencanaBatalBayar({ dihapus: [baris()], tagihan: [t] }).rencana[0]
    expect(r.payload.bayar).toBe(0)
    expect(terbayarDari({ ...t, ...r.payload })).toBe(0)
  })

  it('VA BMT ke dua tagihan: masing-masing kembali sebesar alokasinya', () => {
    const t1 = tagihan({ id: 'tg1' })
    const t2 = tagihan({ id: 'tg2', kategori: 'Uang Buku', nominal: 100000, terbayar: 100000 })
    const b = {
      id: 'bmt1',
      tipe: 'masuk',
      sumber: 'bmt_va',
      santri_id: 's1',
      nominal: 250000,
      alokasi: [
        { tagihan_id: 'tg1', nominal: 150000 },
        { tagihan_id: 'tg2', nominal: 100000 }
      ]
    }
    const { rencana } = rencanaBatalBayar({ dihapus: [b], tagihan: [t1, t2] })
    expect(rencana.map((r) => [r.tagihanId, r.terbayarBaru]).sort()).toEqual([
      ['tg1', 0],
      ['tg2', 0]
    ])
  })

  it('sel ambigu dilaporkan, tagihannya tak disentuh', () => {
    const hasil = rencanaBatalBayar({
      dihapus: [baris({ tagihan_id: undefined })],
      tagihan: [tagihan(), tagihan({ id: 'tg_kembar' })]
    })
    expect(hasil.rencana).toEqual([])
    expect(hasil.ambigu).toHaveLength(1)
  })

  it('tagihan yang ditunjuk tapi tak ada → tagihanHilang, bukan galat', () => {
    const hasil = rencanaBatalBayar({ dihapus: [baris({ tagihan_id: 'tg_hilang' })], tagihan: [] })
    expect(hasil.rencana).toEqual([])
    expect(hasil.tagihanHilang).toEqual([expect.objectContaining({ tagihanId: 'tg_hilang' })])
  })

  it('bayar di muka tanpa tagihan → tanpaTautan (normal, tak ada yang dikembalikan)', () => {
    const hasil = rencanaBatalBayar({
      dihapus: [baris({ tagihan_id: undefined, periode_kode: '2027-01' })],
      tagihan: [tagihan()]
    })
    expect(hasil.rencana).toEqual([])
    expect(hasil.tanpaTautan).toHaveLength(1)
  })
})

describe('payloadBatalBayar — hanya angka, status, dan jejak', () => {
  it('nominal tagihan tak pernah ikut ditulis', () => {
    const p = payloadBatalBayar(tagihan(), { terbayarBaru: 50000, baris: ['x'] })
    expect(p).not.toHaveProperty('nominal')
    expect(p.status).toBe('partial')
  })
  it('masih sebagian → tanggal lunas dicabut tapi jejak pelunas dibiarkan', () => {
    const p = payloadBatalBayar(
      tagihan({ tanggal_lunas: '2026-09-01', dibayar_via: 'pos_santri' }),
      { terbayarBaru: 50000, baris: ['x'] }
    )
    expect(p.tanggal_lunas).toBeNull()
    expect(p).not.toHaveProperty('dibayar_via')
  })
})

describe('ringkasRencanaBatal & pesanHasilHapus', () => {
  it('kas manual → tak ada kalimat tambahan', () => {
    expect(ringkasRencanaBatal({ adaBayar: false, rencana: [] })).toBe('')
  })
  it('menyebut tagihan, angka sebelum → sesudah, dan status baru', () => {
    const hasil = rencanaBatalBayar({ dihapus: [baris()], tagihan: [tagihan()] })
    const teks = ringkasRencanaBatal(hasil)
    expect(teks).toContain('Ahmad')
    expect(teks).toContain('Syahriyah Juli 2026')
    expect(teks).toContain('(belum)')
  })
  it('memperingatkan baris ambigu', () => {
    const teks = ringkasRencanaBatal({ adaBayar: true, rencana: [], ambigu: [{}] })
    expect(teks).toContain('TIDAK diubah')
  })
  it('kegagalan tagihan disebut sebagai galat, bukan keberhasilan', () => {
    const p = pesanHasilHapus({
      barisOk: 0,
      tagihanOk: 0,
      tagihanGagal: [{ tagihanId: 'tg1', pesan: 'RLS' }],
      barisTertahan: ['pos_1']
    })
    expect(p.tipe).toBe('error')
    expect(p.teks).toContain('TIDAK dihapus')
  })
  it('baris gagal dihapus → peringatan yang menyuruh mengulang', () => {
    const p = pesanHasilHapus({ barisOk: 1, tagihanOk: 1, barisGagal: [{ id: 'x', pesan: 'net' }] })
    expect(p.tipe).toBe('warning')
  })
  it('sukses menyebut tagihan yang dikembalikan', () => {
    expect(pesanHasilHapus({ barisOk: 2, tagihanOk: 1 })).toEqual({
      tipe: 'success',
      teks: '2 baris dihapus · 1 tagihan dikembalikan.'
    })
  })
})

describe('barisDariAuditHapus — salinan penghapusan lama', () => {
  const audit = (o) => ({
    id: 'del_1',
    aksi: 'delete',
    collection: 'keuangan_buku_induk',
    doc_id: 'pos_1',
    user_nama: 'Admin Keu',
    timestamp: '2026-09-14T08:00:00Z',
    data_snapshot: JSON.stringify(baris({ id: 'pos_1' })),
    ...o
  })
  it('membaca snapshot JSON dan menempelkan jejak penghapusnya', () => {
    const [r] = barisDariAuditHapus([audit()])
    expect(r.id).toBe('pos_1')
    expect(r.tagihan_id).toBe('tg1')
    expect(r._hapus).toMatchObject({ oleh: 'Admin Keu', waktu: '2026-09-14T08:00:00Z' })
  })
  it('melewati tabel lain, snapshot rusak, dan baris yang sudah dipulihkan', () => {
    const rows = barisDariAuditHapus(
      [
        audit({ collection: 'santri' }),
        audit({ id: 'del_2', doc_id: 'pos_2', data_snapshot: '{rusak' }),
        audit({
          id: 'del_3',
          doc_id: 'pos_3',
          data_snapshot: JSON.stringify(baris({ id: 'pos_3' }))
        })
      ],
      ['pos_3']
    )
    expect(rows).toEqual([])
  })
  it('penghapusan terakhir yang menang', () => {
    const rows = barisDariAuditHapus([
      audit({ id: 'del_a', timestamp: '2026-09-10T00:00:00Z', user_nama: 'Lama' }),
      audit({ id: 'del_b', timestamp: '2026-09-14T00:00:00Z', user_nama: 'Baru' })
    ])
    expect(rows).toHaveLength(1)
    expect(rows[0]._hapus.oleh).toBe('Baru')
  })
})
