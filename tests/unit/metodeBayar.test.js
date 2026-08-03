import { describe, it, expect } from 'vitest'
import { metodeTransaksi, ringkasMetode } from '../../vue-app/src/utils/metodeBayar.js'

describe('metodeTransaksi — tunai vs transfer', () => {
  it('pakai field metode dari POS Santri', () => {
    expect(metodeTransaksi({ metode: 'Tunai', sumber: 'pos_santri' })).toBe('Tunai')
    expect(metodeTransaksi({ metode: 'Transfer', sumber: 'pos_santri' })).toBe('Transfer')
  })

  it('metode tak peduli besar-kecil huruf & varian penulisan', () => {
    expect(metodeTransaksi({ metode: 'TRANSFER' })).toBe('Transfer')
    expect(metodeTransaksi({ metode: ' tunai ' })).toBe('Tunai')
    expect(metodeTransaksi({ metode: 'cash' })).toBe('Tunai')
    expect(metodeTransaksi({ metode: 'tf' })).toBe('Transfer')
    expect(metodeTransaksi({ metode: 'Transfer Bank' })).toBe('Transfer')
  })

  it('baris lama tanpa field metode: transfer terverifikasi = Transfer', () => {
    expect(metodeTransaksi({ sumber: 'transfer_verified' })).toBe('Transfer')
    expect(metodeTransaksi({ sumber: 'va_bmt' })).toBe('Transfer')
  })

  it('kas manual / sumber lain tanpa metode = Tunai (uang laci)', () => {
    expect(metodeTransaksi({ sumber: 'manual' })).toBe('Tunai')
    expect(metodeTransaksi({ sumber: 'pos_santri' })).toBe('Tunai')
    expect(metodeTransaksi({})).toBe('Tunai')
    expect(metodeTransaksi(null)).toBe('Tunai')
  })

  it('field metode MENANG atas tebakan sumber', () => {
    // kas manual yang sebenarnya lewat rekening
    expect(metodeTransaksi({ sumber: 'manual', metode: 'Transfer' })).toBe('Transfer')
  })
})

describe('ringkasMetode — subtotal laporan harian', () => {
  it('pisahkan masuk/keluar per cara bayar', () => {
    const rows = [
      { tipe: 'masuk', nominal: 100000, metode: 'Tunai' },
      { tipe: 'masuk', nominal: 250000, metode: 'Transfer' },
      { tipe: 'keluar', nominal: 40000, metode: 'Tunai' },
      { tipe: 'masuk', nominal: 50000, sumber: 'transfer_verified' }
    ]
    const r = ringkasMetode(rows)
    expect(r.Tunai).toEqual({ masuk: 100000, keluar: 40000 })
    expect(r.Transfer).toEqual({ masuk: 300000, keluar: 0 })
  })

  it('dukung baris ber-kolom masuk/keluar (bukan tipe+nominal)', () => {
    const r = ringkasMetode([
      { masuk: 75000, metode: 'Tunai' },
      { keluar: 25000, metode: 'Tunai' }
    ])
    expect(r.Tunai).toEqual({ masuk: 75000, keluar: 25000 })
  })

  it('daftar kosong -> semua nol (bukan NaN)', () => {
    const r = ringkasMetode([])
    expect(r.Tunai).toEqual({ masuk: 0, keluar: 0 })
    expect(r.Transfer).toEqual({ masuk: 0, keluar: 0 })
  })
})
