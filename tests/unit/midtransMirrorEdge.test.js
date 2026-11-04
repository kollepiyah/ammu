// @vitest-environment node
// PAGAR ANTI-MENYIMPANG: `supabase/functions/_shared/midtrans.ts` (angka yang DITAGIHKAN server)
// harus sama dengan `vue-app/src/utils/biayaMidtrans.js` (angka yang DITAMPILKAN ke wali).
// Kalau menyimpang, wali melihat Rp X di layar tapi m-banking meminta Rp Y.
import { describe, it, expect } from 'vitest'
import { createHash } from 'node:crypto'
import * as js from '../../vue-app/src/utils/biayaMidtrans.js'
import * as ts from '../../supabase/functions/_shared/midtrans.ts'

const SETELAN = [
  {},
  { midtrans_biaya_va: 4000, midtrans_biaya_qris_persen: 0.7 },
  { midtrans_biaya_va: '', midtrans_biaya_qris_persen: '' },
  { midtrans_biaya_va: 0, midtrans_biaya_qris_persen: 0 },
  { midtrans_biaya_va: 'x', midtrans_biaya_qris_persen: 99 },
  { midtrans_kanal: ['bri', 'qris'] }
]

describe('cermin biaya Midtrans JS ⇄ Deno', () => {
  it('daftar kanal identik', () => {
    expect(ts.KANAL_MIDTRANS).toEqual(js.KANAL_MIDTRANS)
    for (const s of SETELAN) expect(ts.kanalAktif(s)).toEqual(js.kanalAktif(s))
  })

  it('biaya & rincian identik pada sapuan nominal × kanal × setelan', () => {
    const nominal = [0, 1, 999, 1000, 9999, 10000, 12345, 90000, 750000, 9_930_000, 12_000_000]
    for (let i = 0; i < 200; i++) nominal.push(Math.floor(((i * 7919) % 5000) * 1013))
    for (const s of SETELAN)
      for (const k of [...js.KANAL_MIDTRANS.map((x) => x.id), 'tak_ada'])
        for (const n of nominal) {
          expect(ts.hitungBiayaLayanan(n, k, s)).toBe(js.hitungBiayaLayanan(n, k, s))
          expect(ts.rincianBayar(n, k, s)).toEqual(js.rincianBayar(n, k, s))
        }
  })
})

describe('biaya layanan (ditanggung wali)', () => {
  it('VA flat Rp4.500 bawaan', () => {
    expect(js.rincianBayar(750000, 'bri', {})).toEqual({
      net: 750000,
      biaya: 4500,
      total: 754500,
      galat: ''
    })
  })

  it('QRIS: sesudah MDR dipotong dari total, pondok tetap menerima utuh', () => {
    for (const n of [5000, 90000, 750000, 3_000_000]) {
      const { biaya, total } = js.rincianBayar(n, 'qris', {})
      const dipotong = Math.ceil(total * 0.0078)
      expect(total - dipotong).toBeGreaterThanOrEqual(n)
      expect(biaya % 100).toBe(0)
    }
  })

  it('batas minimal & QRIS maksimal', () => {
    expect(js.rincianBayar(9000, 'bca', {}).galat).toMatch(/Minimal/)
    expect(js.rincianBayar(9_990_000, 'qris', {}).galat).toMatch(/QRIS maksimal/)
    expect(js.rincianBayar(9_990_000, 'bsi', {}).galat).toBe('')
  })
})

describe('payload Snap & notifikasi', () => {
  const kanal = ts.cariKanal('mandiri')

  it('item_details berjumlah tepat gross_amount, biaya layanan jadi baris sendiri', () => {
    const p = ts.bangunSnap({
      orderId: 'mt-S1-abc',
      kanal,
      items: [
        {
          tipe: 'tagihan',
          tagihan_id: 't1',
          kategori: 'Syahriyah',
          periode: 'November 2026',
          nominal: 100000
        },
        { tipe: 'uang_saku', nominal: 50000 }
      ],
      biaya: 4500,
      santriNama: 'Budi'
    })
    expect(p.transaction_details).toEqual({ order_id: 'mt-S1-abc', gross_amount: 154500 })
    expect(p.enabled_payments).toEqual(['echannel'])
    expect(p.item_details.map((x) => x.name)).toEqual([
      'Syahriyah November 2026',
      'Top-up Uang Saku',
      'Biaya layanan VA Mandiri'
    ])
    expect(p.expiry).toEqual({ unit: 'hours', duration: 24 })
  })

  it('order id aman untuk Midtrans', () => {
    const id = ts.buatOrderId('santri/12 34_x', 1_793_750_000_000, 'a1b2c3')
    expect(id).toMatch(/^mt-[A-Za-z0-9-]+$/)
    expect(id.length).toBeLessThanOrEqual(50)
  })

  it('tanda tangan notifikasi: cocok, dan menolak nominal yang diubah', async () => {
    const kunci = 'SB-Mid-server-uji'
    const n = { order_id: 'mt-S1-abc', status_code: '200', gross_amount: '154500.00' }
    n.signature_key = createHash('sha512')
      .update(n.order_id + n.status_code + n.gross_amount + kunci)
      .digest('hex')
    expect(await ts.tandaTanganSah(n, kunci)).toBe(true)
    expect(await ts.tandaTanganSah({ ...n, gross_amount: '1.00' }, kunci)).toBe(false)
    expect(await ts.tandaTanganSah(n, 'kunci-lain')).toBe(false)
  })

  it('status, nomor bayar, nominal bersih', () => {
    expect(ts.putusanStatus('settlement')).toBe('lunas')
    expect(ts.putusanStatus('capture', 'challenge')).toBe('menunggu')
    expect(ts.putusanStatus('expire')).toBe('kadaluarsa')
    expect(ts.putusanStatus('deny')).toBe('batal')
    expect(ts.putusanStatus('refund')).toBe('abaikan')
    expect(ts.nomorBayar({ va_numbers: [{ bank: 'bri', va_number: '123' }] })).toEqual({
      nomor: '123',
      kodePerusahaan: ''
    })
    expect(ts.nomorBayar({ bill_key: '998', biller_code: '70012' })).toEqual({
      nomor: '998',
      kodePerusahaan: '70012'
    })
    expect(ts.nominalBersih('154500.00', 4500)).toBe(150000)
    expect(ts.urlMidtrans('SB-Mid-server-x').sandbox).toBe(true)
    expect(ts.urlMidtrans('Mid-server-x').snap).toBe(
      'https://app.midtrans.com/snap/v1/transactions'
    )
  })
})
