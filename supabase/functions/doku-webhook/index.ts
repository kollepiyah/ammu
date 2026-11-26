// doku-webhook — terima HTTP Notification DOKU lalu catat pembayaran wali.
//
// v.1.5.5 (Kyai 26 Nov 2026). Fungsi PUBLIC (deploy --no-verify-jwt): pemanggilnya server DOKU.
// Alamatnya dikirim doku-charge di tiap transaksi (additional_info.override_notification_url),
// jadi tak perlu diisi di dasbor DOKU. Pengaman berlapis (pola midtrans-webhook):
//   1. tanda tangan HMACSHA256 (Client-Id, Request-Id, Request-Timestamp, Request-Target, Digest);
//   2. status dibaca ULANG dari API DOKU (GET /orders/v1/status/{invoice}) dan itulah yang
//      dipercaya — tanda tangan yang tak cocok hanya dicatat, karena Request-Target bisa berbeda
//      bila alamat fungsi dilewatkan proksi;
//   3. pencatatan lewat RPC apply_bmt_payment, idempoten per ref (= invoice, berawalan 'dk-').
// Nominal ke RPC = dibayar wali − biaya layanan. DOKU menganggap 2xx = diterima; selain itu
// dikirim ulang (30 menit, 6 jam, 12 jam).
//
// DEPLOY: supabase functions deploy doku-webhook --no-verify-jwt
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import { nominalBersih } from '../_shared/midtrans.ts'
import { headerDoku, notifikasiSah, putusanStatusDoku, urlDoku } from '../_shared/doku.ts'

const CLIENT_ID = Deno.env.get('DOKU_CLIENT_ID') || ''
const SECRET_KEY = Deno.env.get('DOKU_SECRET_KEY') || ''
const ENV = Deno.env.get('DOKU_ENV') || 'sandbox'

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (req.method === 'GET') return json({ ok: true, service: 'doku-webhook', siap: !!(CLIENT_ID && SECRET_KEY) })
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)
  if (!CLIENT_ID || !SECRET_KEY) return json({ ok: false, error: 'kunci DOKU belum di-set' }, 503)

  const mentah = await req.text()
  // deno-lint-ignore no-explicit-any
  let notif: any = null
  try {
    notif = JSON.parse(mentah)
  } catch {
    return json({ ok: false, error: 'payload' }, 400)
  }
  const invoice = String(notif?.order?.invoice_number || '')
  if (!invoice) return json({ ok: false, error: 'payload' }, 400)

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const sigOk = await notifikasiSah({
    headers: {
      clientId: req.headers.get('Client-Id') || '',
      requestId: req.headers.get('Request-Id') || '',
      timestamp: req.headers.get('Request-Timestamp') || '',
      signature: req.headers.get('Signature') || ''
    },
    target: new URL(`${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/doku-webhook`).pathname,
    badanMentah: mentah,
    clientId: CLIENT_ID,
    secretKey: SECRET_KEY
  })
  if (!sigOk) console.warn('[doku-webhook] tanda tangan tak cocok, dicek ulang lewat API:', invoice)

  try {
    const db = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: it } = await db.from('keuangan_va_intent').select('*').eq('id', invoice).maybeSingle()
    if (!it || it.data?.gerbang !== 'doku') {
      console.log('[doku-webhook] invoice tak dikenal:', invoice)
      return json({ ok: true, abaikan: 'invoice tak dikenal' })
    }

    // Status dari API DOKU (kunci Ammu) — sumber kebenaran.
    const url = urlDoku(ENV)
    const target = `/orders/v1/status/${encodeURIComponent(invoice)}`
    // deno-lint-ignore no-explicit-any
    let st: any = null
    let alasan = ''
    try {
      const headers = await headerDoku({
        clientId: CLIENT_ID,
        secretKey: SECRET_KEY,
        requestId: crypto.randomUUID(),
        nowMs: Date.now(),
        target
      })
      const r = await fetch(url.api + target, { headers })
      const j = await r.json().catch(() => ({}))
      if (r.ok && String(j?.order?.invoice_number || '') === invoice) st = j
      else alasan = `HTTP ${r.status}`
    } catch (e) {
      alasan = (e as Error)?.message || 'fetch gagal'
    }
    if (!st) {
      if (!sigOk) throw new Error('tak terverifikasi — status DOKU: ' + alasan)
      console.warn('[doku-webhook] status API tak terbaca, pakai notifikasi bertanda tangan sah:', alasan)
      st = notif
    }

    const putusan = putusanStatusDoku(st?.transaction?.status)
    const kini = new Date().toISOString()
    const data = it.data || {}

    if (putusan === 'lunas') {
      const bersih = nominalBersih(st?.order?.amount, data.biaya_layanan)
      if (bersih <= 0) return json({ ok: true, abaikan: 'nominal 0' })
      const nomorVa = String(st?.virtual_account_info?.virtual_account_number || '')
      if (nomorVa && !it.va) await db.from('keuangan_va_intent').update({ va: nomorVa }).eq('id', it.id)
      const { data: hasil, error } = await db.rpc('apply_bmt_payment', {
        p_santri_id: String(it.santri_id),
        p_nominal: bersih,
        p_ref: invoice, // sudah berawalan 'dk-' — tak bertabrakan dengan ref Midtrans ('mt-…')
        p_payload: st,
        p_intent_id: String(it.id),
        p_sumber: 'midtrans',
        p_label: String(data.kanal_label || 'Pembayaran') + ' (online)'
      })
      if (error) throw error
      console.log(`[doku-webhook] ${invoice} lunas bersih=${bersih} ->`, hasil)
      return json({ ok: true, hasil })
    }

    if (putusan === 'kadaluarsa' || putusan === 'batal') {
      await db
        .from('keuangan_va_intent')
        .update({
          status: putusan === 'kadaluarsa' ? 'kadaluarsa' : 'dibatalkan',
          data: { ...data, doku_status: st?.transaction?.status },
          updated_at: kini
        })
        .eq('id', it.id)
        .eq('status', 'pending')
      return json({ ok: true, status: putusan })
    }

    return json({ ok: true, status: putusan })
  } catch (e) {
    console.error('[doku-webhook] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
