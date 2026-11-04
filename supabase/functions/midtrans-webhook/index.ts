// midtrans-webhook — terima HTTP Notification Midtrans lalu catat pembayaran wali.
//
// v.1.4.9 gel. 2 (Kyai, 4 Nov 2026). Fungsi PUBLIC (deploy --no-verify-jwt): pemanggilnya
// server Midtrans. Pengaman berlapis:
//   1. signature_key = SHA512(order_id + status_code + gross_amount + ServerKey) harus cocok;
//   2. status dibaca ULANG dari API Midtrans (GET /v2/{order_id}/status) dan itulah yang
//      dipercaya, bukan badan notifikasi;
//   3. pencatatan lewat RPC apply_bmt_payment (idempoten per ref = transaction_id), jadi
//      notifikasi yang dikirim ulang Midtrans tak mencatat dua kali.
// Nominal ke RPC = dibayar wali − biaya layanan (biaya ditanggung wali, bukan milik santri).
//
// DEPLOY: supabase functions deploy midtrans-webhook --no-verify-jwt
// Dasbor Midtrans → Settings → Payment → Notification URL:
//   https://<ref-proyek>.supabase.co/functions/v1/midtrans-webhook
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import {
  nomorBayar,
  nominalBersih,
  putusanStatus,
  tandaTanganSah,
  urlMidtrans
} from '../_shared/midtrans.ts'

const SERVER_KEY = Deno.env.get('MIDTRANS_SERVER_KEY') || ''

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  // GET = uji sambungan dari peramban / tombol "Test notification URL".
  if (req.method === 'GET') return json({ ok: true, service: 'midtrans-webhook', siap: !!SERVER_KEY })
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)
  if (!SERVER_KEY) return json({ ok: false, error: 'server key belum di-set' }, 503)

  // deno-lint-ignore no-explicit-any
  const notif: any = await req.json().catch(() => null)
  if (!notif?.order_id) return json({ ok: false, error: 'payload' }, 400)
  if (!(await tandaTanganSah(notif, SERVER_KEY))) {
    console.warn('[midtrans-webhook] tanda tangan salah untuk', notif.order_id)
    return json({ ok: false, error: 'signature' }, 401)
  }

  try {
    const url = urlMidtrans(SERVER_KEY)
    const r = await fetch(`${url.api}/v2/${encodeURIComponent(notif.order_id)}/status`, {
      headers: { Authorization: 'Basic ' + btoa(SERVER_KEY + ':'), Accept: 'application/json' }
    })
    // deno-lint-ignore no-explicit-any
    const st: any = await r.json().catch(() => ({}))
    // Gagal membaca status → 500 supaya Midtrans mengirim ulang nanti.
    if (!r.ok || !st.order_id) throw new Error('status Midtrans tak terbaca: ' + r.status)

    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: it } = await db
      .from('keuangan_va_intent')
      .select('*')
      .eq('id', String(st.order_id))
      .maybeSingle()
    if (!it) {
      // Order bukan buatan Ammu (mis. uji dari dasbor) — jawab 200 supaya tak dikirim ulang.
      console.log('[midtrans-webhook] order tak dikenal:', st.order_id)
      return json({ ok: true, abaikan: 'order tak dikenal' })
    }

    const putusan = putusanStatus(st.transaction_status, st.fraud_status)
    const kini = new Date().toISOString()
    const data = it.data || {}

    if (putusan === 'lunas') {
      const bersih = nominalBersih(st.gross_amount, data.biaya_layanan)
      if (bersih <= 0) return json({ ok: true, abaikan: 'nominal 0' })
      const { data: hasil, error } = await db.rpc('apply_bmt_payment', {
        p_santri_id: String(it.santri_id),
        p_nominal: bersih,
        p_ref: 'mt-' + String(st.transaction_id || st.order_id),
        p_payload: st,
        p_intent_id: String(it.id),
        p_sumber: 'midtrans',
        p_label: String(data.kanal_label || 'Midtrans')
      })
      if (error) throw error
      console.log(`[midtrans-webhook] ${st.order_id} lunas bersih=${bersih} ->`, hasil)
      return json({ ok: true, hasil })
    }

    if (putusan === 'menunggu') {
      // Simpan nomor VA / kode bayar Mandiri supaya bisa ditampilkan lagi di aplikasi.
      const nb = nomorBayar(st)
      if (nb.nomor && it.status === 'pending' && it.va !== nb.nomor) {
        await db
          .from('keuangan_va_intent')
          .update({
            va: nb.nomor,
            data: { ...data, kode_perusahaan: nb.kodePerusahaan, expiry_time: st.expiry_time || '' },
            updated_at: kini
          })
          .eq('id', it.id)
      }
      return json({ ok: true, status: 'menunggu' })
    }

    if (putusan === 'kadaluarsa' || putusan === 'batal') {
      await db
        .from('keuangan_va_intent')
        .update({
          status: putusan === 'kadaluarsa' ? 'kadaluarsa' : 'dibatalkan',
          data: { ...data, midtrans_status: st.transaction_status },
          updated_at: kini
        })
        .eq('id', it.id)
        .eq('status', 'pending')
      return json({ ok: true, status: putusan })
    }

    console.log('[midtrans-webhook] status diabaikan:', st.order_id, st.transaction_status)
    return json({ ok: true, abaikan: st.transaction_status })
  } catch (e) {
    console.error('[midtrans-webhook] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
