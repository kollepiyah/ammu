// Kyai (14 Sep 2026): "sekaligus audit yg lain, dan tombol2 yg digunakan untuk merapikan,
// jika sudah selesai dihapus aja bisa?"
//
// Audit menemukan rantai yang bisa menghapus tabungan santri tanpa satu galat pun: santri
// dihapus/digabung → tabungannya kehilangan pemilik → "Hapus Mutasi Orphan" menghapusnya
// permanen. Yang wajib dijaga tes ini:
//   1. Riwayat keuangan SEKECIL apa pun (bahkan yang sudah lunas) terhitung "masih ada".
//   2. Saldo memakai konvensi yang sama dengan buku besar Tabungan.
//   3. Orphan yang masih BERSALDO — positif maupun negatif — tak pernah masuk daftar hapus.
import { describe, it, expect } from 'vitest'
import {
  ringkasRujukanKeuangan,
  pesanRujukanKeuangan,
  pilahOrphanTabungan
} from '@/utils/rujukanKeuanganSantri'

describe('ringkasRujukanKeuangan', () => {
  it('tanpa baris apa pun → ada = false', () => {
    expect(ringkasRujukanKeuangan({})).toMatchObject({ ada: false, saldoTabungan: 0, tagihan: 0 })
    expect(ringkasRujukanKeuangan()).toMatchObject({ ada: false })
  })

  it('saldo tabungan & uang saku: setor masuk, selain itu keluar', () => {
    const r = ringkasRujukanKeuangan({
      tabungan: [
        { jenis: 'setor', nominal: 100000 },
        { jenis: 'tarik', nominal: 30000 }
      ],
      uangSaku: [{ jenis: 'setor', nominal: '25000' }]
    })
    expect(r).toMatchObject({
      mutasiTabungan: 2,
      saldoTabungan: 70000,
      mutasiUangSaku: 1,
      saldoUangSaku: 25000,
      ada: true
    })
  })

  it('riwayat yang sudah lunas pun tetap "ada" — tagihan & baris kas', () => {
    const r = ringkasRujukanKeuangan({
      tagihan: [
        { nominal: 90000, terbayar: 90000 },
        { nominal: 90000, terbayar: 0 }
      ],
      bukuInduk: [{ id: 'pos_1' }]
    })
    expect(r).toMatchObject({ tagihan: 2, tagihanTerbayar: 1, barisKas: 1, ada: true })
  })

  it('tabungan bersaldo nol tetap riwayat', () => {
    const r = ringkasRujukanKeuangan({
      tabungan: [
        { jenis: 'setor', nominal: 5000 },
        { jenis: 'tarik', nominal: 5000 }
      ]
    })
    expect(r).toMatchObject({ saldoTabungan: 0, ada: true })
  })
})

describe('pesanRujukanKeuangan', () => {
  it('menyebut apa saja yang masih menempel', () => {
    const teks = pesanRujukanKeuangan(
      'Ahmad',
      ringkasRujukanKeuangan({
        tabungan: [{ jenis: 'setor', nominal: 150000 }],
        tagihan: [{ nominal: 90000, terbayar: 90000 }],
        bukuInduk: [{ id: 'a' }, { id: 'b' }]
      })
    )
    expect(teks).toContain('Ahmad masih punya riwayat keuangan')
    expect(teks).toContain('tabungan Rp 150.000 (1 mutasi)')
    expect(teks).toContain('1 tagihan (1 sudah dibayar)')
    expect(teks).toContain('2 transaksi di Buku Induk')
  })
  it('tanpa rujukan → kosong', () => {
    expect(pesanRujukanKeuangan('Ahmad', ringkasRujukanKeuangan({}))).toBe('')
    expect(pesanRujukanKeuangan('Ahmad', null)).toBe('')
  })
})

describe('pilahOrphanTabungan — yang bersaldo tak pernah ditawarkan dihapus', () => {
  it('nol boleh dibersihkan; positif & negatif tidak', () => {
    const hasil = pilahOrphanTabungan([
      { santri_id: 11, saldo: 0 },
      { santri_id: '12', saldo: 250000 },
      { santri_id: '13', saldo: -5000 },
      { santri_id: '14', saldo: 0.2 },
      null
    ])
    expect(hasil.idsNol).toEqual(['11', '14'])
    expect(hasil.bersaldo.map((o) => o.santri_id)).toEqual(['12', '13'])
    expect(hasil.saldoBersaldo).toBe(245000)
  })
  it('daftar kosong', () => {
    expect(pilahOrphanTabungan([])).toEqual({ idsNol: [], bersaldo: [], saldoBersaldo: 0 })
  })
})
