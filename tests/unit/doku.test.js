// @vitest-environment node
// DOKU (v.1.5.5, Kyai 26 Nov 2026) — gerbang kedua di samping Midtrans. Tanda tangan dicek
// terhadap HMAC node:crypto yang ditulis terpisah, supaya salah urutan baris / awalan ketahuan.
import { describe, it, expect } from 'vitest'
import { createHash, createHmac } from 'node:crypto'
import * as doku from '../../supabase/functions/_shared/doku.ts'
import { KANAL_MIDTRANS, cariKanal } from '../../supabase/functions/_shared/midtrans.ts'
import { susunKeranjang } from '../../supabase/functions/_shared/keranjangBayar.ts'

const RAHASIA = 'SK-uji-rahasia'
const CLIENT = 'BRN-0000-0000000000000'

function sigNode({ requestId, timestamp, target, badan }) {
  let teks = `Client-Id:${CLIENT}\nRequest-Id:${requestId}\nRequest-Timestamp:${timestamp}\nRequest-Target:${target}`
  if (badan !== undefined) teks += `\nDigest:${createHash('sha256').update(badan).digest('base64')}`
  return 'HMACSHA256=' + createHmac('sha256', RAHASIA).update(teks).digest('base64')
}

describe('tanda tangan DOKU (non-SNAP)', () => {
  it('POST: header lengkap, Digest ikut, cocok dengan HMAC node', async () => {
    const badan = JSON.stringify({ order: { amount: 10000, invoice_number: 'dk-1' } })
    const h = await doku.headerDoku({
      clientId: CLIENT,
      secretKey: RAHASIA,
      requestId: 'req-1',
      nowMs: Date.UTC(2026, 10, 26, 1, 2, 3, 456),
      target: '/checkout/v1/payment',
      badan
    })
    expect(h['Request-Timestamp']).toBe('2026-11-26T01:02:03Z')
    expect(h['Content-Type']).toBe('application/json')
    expect(h.Signature).toBe(
      sigNode({
        requestId: 'req-1',
        timestamp: '2026-11-26T01:02:03Z',
        target: '/checkout/v1/payment',
        badan
      })
    )
  })
  it('GET: tanpa Digest', async () => {
    const h = await doku.headerDoku({
      clientId: CLIENT,
      secretKey: RAHASIA,
      requestId: 'req-2',
      nowMs: Date.UTC(2026, 10, 26),
      target: '/orders/v1/status/dk-1'
    })
    expect(h['Content-Type']).toBeUndefined()
    expect(h.Signature).toBe(
      sigNode({
        requestId: 'req-2',
        timestamp: '2026-11-26T00:00:00Z',
        target: '/orders/v1/status/dk-1'
      })
    )
  })
  it('notifikasi: sah hanya bila badan, target, kunci & Client-Id cocok', async () => {
    const badan =
      '{"order":{"invoice_number":"dk-1","amount":14500},"transaction":{"status":"SUCCESS"}}'
    const target = '/functions/v1/doku-webhook'
    const headers = {
      clientId: CLIENT,
      requestId: 'n-1',
      timestamp: '2026-11-26T03:00:00Z',
      signature: sigNode({ requestId: 'n-1', timestamp: '2026-11-26T03:00:00Z', target, badan })
    }
    const o = { headers, target, badanMentah: badan, clientId: CLIENT, secretKey: RAHASIA }
    expect(await doku.notifikasiSah(o)).toBe(true)
    expect(await doku.notifikasiSah({ ...o, badanMentah: badan.replace('14500', '99999') })).toBe(
      false
    )
    expect(await doku.notifikasiSah({ ...o, target: '/lain' })).toBe(false)
    expect(await doku.notifikasiSah({ ...o, secretKey: 'salah' })).toBe(false)
    expect(await doku.notifikasiSah({ ...o, clientId: 'BRN-lain' })).toBe(false)
  })
})

describe('Checkout & status DOKU', () => {
  it('setiap kanal Ammu punya metode DOKU', () => {
    for (const k of KANAL_MIDTRANS) expect(doku.METODE_DOKU[k.id], k.id).toBeTruthy()
  })
  it('badan Checkout: jumlah = item + biaya, satu metode, masa berlaku VA sehari / QR sejam', () => {
    const items = [
      { tipe: 'tagihan', tagihan_id: 't1', nominal: 500000 },
      { tipe: 'uang_saku', nominal: 50000 }
    ]
    const va = doku.bangunCheckout({
      invoice: 'dk-a',
      kanal: cariKanal('bsi'),
      items,
      biaya: 4500,
      santriNama: 'Ahmad',
      notifUrl: 'https://x.supabase.co/functions/v1/doku-webhook'
    })
    expect(va.order.amount).toBe(554500)
    expect(va.order.invoice_number).toBe('dk-a')
    expect(va.payment.payment_method_types).toEqual(['VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI'])
    expect(va.payment.payment_due_date).toBe(1440)
    expect(va.additional_info.override_notification_url).toMatch(/doku-webhook$/)
    const qr = doku.bangunCheckout({
      invoice: 'dk-b',
      kanal: cariKanal('qris'),
      items,
      biaya: 0,
      santriNama: '',
      notifUrl: ''
    })
    expect(qr.payment.payment_due_date).toBe(60)
    expect(qr.customer.name).toBe('Santri')
  })
  it('invoice ≤ 30 karakter, berawalan dk-, tanpa simbol aneh', () => {
    const inv = doku.buatInvoiceDoku(
      'santri/abc_123-panjang-sekali',
      Date.UTC(2026, 10, 26),
      'a1b2c3d4e5'
    )
    expect(inv.length).toBeLessThanOrEqual(30)
    expect(inv).toMatch(/^dk-[A-Za-z0-9]+-[a-z0-9]+$/)
  })
  it('hasil Checkout & status', () => {
    const ok = doku.bacaHasilCheckout(
      {
        response: {
          payment: {
            url: 'https://sandbox.doku.com/checkout/abc',
            expired_date: '20261127100000',
            token_id: 't'
          }
        }
      },
      true
    )
    expect(ok.ok).toBe(true)
    expect(ok.expiryAt).toBe('2026-11-27T03:00:00.000Z')
    const gagal = doku.bacaHasilCheckout({ error_messages: ['invoice duplikat'] }, false)
    expect(gagal.ok).toBe(false)
    expect(gagal.galat).toBe('invoice duplikat')
    expect(doku.putusanStatusDoku('SUCCESS')).toBe('lunas')
    expect(doku.putusanStatusDoku('pending')).toBe('menunggu')
    expect(doku.putusanStatusDoku('EXPIRED')).toBe('kadaluarsa')
    expect(doku.putusanStatusDoku('FAILED')).toBe('batal')
    expect(doku.putusanStatusDoku('ANEH')).toBe('abaikan')
    expect(doku.urlDoku('production').api).toBe('https://api.doku.com')
    expect(doku.urlDoku('').sandbox).toBe(true)
  })
})

describe('susunKeranjang (bersama Midtrans & DOKU)', () => {
  const db = {
    from: () => ({
      select: () => ({
        in: () => ({
          eq: async () => ({
            data: [{ id: 't1', nominal: 100000, terbayar: 30000, kategori: 'SPP', periode: 'Nov' }],
            error: null
          })
        })
      })
    })
  }
  it('item dijepit ke sisa tagihan; tagihan ganda tak melebihi sisa; tagihan asing dibuang', async () => {
    const items = await susunKeranjang(db, 's1', [
      { tipe: 'tagihan', tagihan_id: 't1', nominal: 50000 },
      { tipe: 'tagihan', tagihan_id: 't1', nominal: 50000 },
      { tipe: 'tagihan', tagihan_id: 'asing', nominal: 10000 },
      { tipe: 'uang_saku', nominal: 20000 },
      { tipe: 'uang_saku', nominal: -5 }
    ])
    expect(items).toEqual([
      { tipe: 'tagihan', tagihan_id: 't1', kategori: 'SPP', periode: 'Nov', nominal: 50000 },
      { tipe: 'tagihan', tagihan_id: 't1', kategori: 'SPP', periode: 'Nov', nominal: 20000 },
      { tipe: 'uang_saku', nominal: 20000 }
    ])
  })
})
