import { describe, it, expect } from 'vitest'
import {
  ringkasSetorTarik,
  mutasiSetor,
  ringkasTabunganLembaga,
  petaLembagaSantri
} from '@/utils/kasLembaga'

// Kyai (5 Agu 2026): "di tabungan belum ada ekspor PDF harian untuk admin keuangan".
//
// Laporan harian itu dipakai mencocokkan catatan dengan uang di kas, jadi subtotalnya
// harus SEPAKAT dengan kartu "Tabungan per lembaga" yang tampil di layar yang sama.
// Bahayanya halus: kartu rekap memakai konvensi "'setor' = masuk, SELAIN ITU keluar",
// dan kalau laporan memakai kebalikannya ("'tarik' = keluar, selain itu masuk"), baris
// berjenis kosong/salah ketik akan dihitung MASUK di PDF tapi KELUAR di kartu — dua
// angka berbeda untuk hari yang sama, tanpa satu pun galat muncul.
describe('ringkasSetorTarik', () => {
  it('menjumlah setor & tarik + saldo bersih', () => {
    const r = ringkasSetorTarik([
      { jenis: 'setor', nominal: 50000 },
      { jenis: 'setor', nominal: 25000 },
      { jenis: 'tarik', nominal: 30000 }
    ])
    expect(r).toEqual({ setor: 75000, tarik: 30000, saldo: 45000, jumlah: 3 })
  })

  it('saldo bisa MINUS (tarikan melebihi setoran pada periode itu)', () => {
    const r = ringkasSetorTarik([
      { jenis: 'setor', nominal: 10000 },
      { jenis: 'tarik', nominal: 40000 }
    ])
    expect(r.saldo).toBe(-30000)
  })

  it('huruf besar-kecil jenis tak mengubah hasil', () => {
    const r = ringkasSetorTarik([
      { jenis: 'SETOR', nominal: 1000 },
      { jenis: 'Setor', nominal: 2000 },
      { jenis: 'TARIK', nominal: 500 }
    ])
    expect(r).toMatchObject({ setor: 3000, tarik: 500 })
  })

  it('nominal berbentuk teks / kosong tetap terhitung sebagai angka', () => {
    const r = ringkasSetorTarik([
      { jenis: 'setor', nominal: '15000' },
      { jenis: 'setor' },
      { jenis: 'tarik', nominal: null }
    ])
    expect(r).toMatchObject({ setor: 15000, tarik: 0, jumlah: 3 })
  })

  it('daftar kosong / bukan array aman', () => {
    expect(ringkasSetorTarik([])).toEqual({ setor: 0, tarik: 0, saldo: 0, jumlah: 0 })
    expect(ringkasSetorTarik(null)).toEqual({ setor: 0, tarik: 0, saldo: 0, jumlah: 0 })
    expect(ringkasSetorTarik([null, undefined])).toMatchObject({ jumlah: 0 })
  })

  it('jenis kosong/asing digolongkan KELUAR — sama seperti rekap per lembaga', () => {
    const r = ringkasSetorTarik([{ jenis: '', nominal: 7000 }])
    expect(r).toMatchObject({ setor: 0, tarik: 7000 })
  })
})

describe('mutasiSetor', () => {
  it('hanya "setor" (bebas huruf besar-kecil) yang setoran', () => {
    expect(mutasiSetor({ jenis: 'setor' })).toBe(true)
    expect(mutasiSetor({ jenis: 'SETOR' })).toBe(true)
    expect(mutasiSetor({ jenis: 'tarik' })).toBe(false)
    expect(mutasiSetor({ jenis: '' })).toBe(false)
    expect(mutasiSetor({})).toBe(false)
    expect(mutasiSetor(null)).toBe(false)
  })
})

describe('laporan PDF vs kartu rekap per lembaga — angkanya WAJIB sepakat', () => {
  it('total setor/tarik sama, termasuk untuk baris berjenis aneh', () => {
    const santri = [{ id: 's1', lembaga: 'PTPT' }]
    const peta = petaLembagaSantri(santri)
    const mutasi = [
      { santri_id: 's1', jenis: 'setor', nominal: 100000 },
      { santri_id: 's1', jenis: 'tarik', nominal: 40000 },
      // baris cacat: jenis kosong. Inilah yang dulu bisa terhitung beda di dua tempat.
      { santri_id: 's1', jenis: '', nominal: 5000 }
    ]
    const laporan = ringkasSetorTarik(mutasi)
    const kartu = ringkasTabunganLembaga(mutasi, peta)
    const totalMasuk = kartu.reduce((s, o) => s + o.masuk, 0)
    const totalKeluar = kartu.reduce((s, o) => s + o.keluar, 0)
    expect(laporan.setor).toBe(totalMasuk)
    expect(laporan.tarik).toBe(totalKeluar)
    expect(laporan.saldo).toBe(kartu.reduce((s, o) => s + o.saldo, 0))
  })
})
