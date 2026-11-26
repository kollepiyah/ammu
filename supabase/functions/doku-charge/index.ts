// doku-charge — wali membuat (atau membatalkan) tautan bayar DOKU untuk keranjangnya.
//
// v.1.5.5 (Kyai 26 Nov 2026): gerbang kedua di samping Midtrans, aktif bila Pengaturan Keuangan
// `gerbang_bayar = 'doku'`. Body & aturan sama dengan midtrans-charge:
//   { aksi: 'buat', santri_id, kanal: 'bri'|'bni'|'bca'|'bsi'|'mandiri'|'qris', items: [...] }
//   { aksi: 'batal', intent_id }
// Keranjang dijepit ulang di server (_shared/keranjangBayar), biaya layanan dihitung ulang
// (_shared/midtrans rincianBayar). Intent disimpan di keuangan_va_intent dengan sumber
// 'midtrans' (= "pembayaran online" bagi seluruh layar & RPC) dan `gerbang: 'doku'`.
// Jalur DOKU Checkout: respons `mode: 'tautan'` + redirect_url halaman bayar DOKU.
//
// DEPLOY : supabase functions deploy doku-charge
// SECRET : supabase secrets set DOKU_CLIENT_ID="…" DOKU_SECRET_KEY="…" DOKU_ENV="sandbox"
//          (DOKU_ENV = "production" untuk kunci production; selain itu dianggap sandbox)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import { cariKanal, kanalAktif, midtransAktif, rincianBayar } from '../_shared/midtrans.ts'
import { ambilSetelan, susunKeranjang } from '../_shared/keranjangBayar.ts'
import {
  bacaHasilCheckout,
  bangunCheckout,
  buatInvoiceDoku,
  headerDoku,
  urlDoku
} from '../_shared/doku.ts'

const CLIENT_ID = Deno.env.get('DOKU_CLIENT_ID') || ''
const SECRET_KEY = Deno.env.get('DOKU_SECRET_KEY') || ''
const ENV = Deno.env.get('DOKU_ENV') || 'sandbox'

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!/^Bearer\s+.+/i.test(authHeader)) return json({ ok: false, error: 'Belum masuk.' }, 401)
    if (!CLIENT_ID || !SECRET_KEY) return json({ ok: false, error: 'DOKU belum disiapkan (kunci).' }, 503)

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    })
    const db = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: userData } = await asCaller.auth.getUser()
    const uid = userData?.user?.id || null
    if (!uid) return json({ ok: false, error: 'Sesi tidak sah.' }, 401)

    const body = await req.json().catch(() => ({}))
    const aksi = String(body.aksi || 'buat')
    const url = urlDoku(ENV)

    // ── Batal: DOKU Checkout tak punya API pembatalan — kode ditutup di Ammu saja. Bila wali
    //   tetap membayar tautan lama, webhook mencatatnya (RPC menaruh ke uang saku bila intent
    //   sudah tak pending), jadi uang tak pernah hilang.
    if (aksi === 'batal') {
      const id = String(body.intent_id || '')
      const { data: it } = await db.from('keuangan_va_intent').select('*').eq('id', id).maybeSingle()
      if (!it || it.data?.gerbang !== 'doku') return json({ ok: false, error: 'Tidak ditemukan.' }, 404)
      const { data: boleh } = await asCaller.from('santri').select('id').eq('id', it.santri_id).maybeSingle()
      if (!boleh) return json({ ok: false, error: 'Bukan santri Anda.' }, 403)
      if (it.status !== 'pending') return json({ ok: true, status: it.status })
      await db
        .from('keuangan_va_intent')
        .update({
          status: 'dibatalkan',
          data: { ...(it.data || {}), dibatalkan_at: new Date().toISOString() },
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('status', 'pending')
      return json({ ok: true, status: 'dibatalkan' })
    }

    // ── Buat
    const settings = await ambilSetelan(db)
    if (!midtransAktif(settings) || settings.gerbang_bayar !== 'doku') {
      return json({ ok: false, error: 'Pembayaran online lewat DOKU belum aktif.' }, 403)
    }
    const kanal = cariKanal(body.kanal)
    if (!kanal || !kanalAktif(settings).some((k) => k.id === kanal.id)) {
      return json({ ok: false, error: 'Cara bayar tidak tersedia.' }, 400)
    }

    const santriId = String(body.santri_id || '')
    const { data: santri } = await asCaller
      .from('santri')
      .select('id, nama')
      .eq('id', santriId)
      .maybeSingle()
    if (!santri) return json({ ok: false, error: 'Santri tidak ditemukan untuk akun ini.' }, 403)

    const items = await susunKeranjang(db, santriId, Array.isArray(body.items) ? body.items : [])
    const net = items.reduce((s, i) => s + i.nominal, 0)
    const rinci = rincianBayar(net, kanal.id, settings)
    if (!items.length) return json({ ok: false, error: 'Tidak ada yang perlu dibayar.' }, 400)
    if (rinci.galat) return json({ ok: false, error: rinci.galat }, 400)

    const invoice = buatInvoiceDoku(santriId, Date.now(), crypto.randomUUID().replace(/-/g, ''))
    const label = kanal.jenis === 'qris' ? 'QRIS' : `VA ${kanal.label}`
    const kini = new Date().toISOString()
    const dataIntent = {
      sumber: 'midtrans', // "pembayaran online" bagi layar & RPC; gerbangnya di bawah
      gerbang: 'doku',
      kanal: kanal.id,
      kanal_label: label,
      jenis: kanal.jenis,
      items,
      santri_nama: santri.nama || '',
      biaya_layanan: rinci.biaya,
      gross: rinci.total,
      created_at: kini,
      sandbox: url.sandbox
    }
    const { error: insErr } = await db.from('keuangan_va_intent').insert({
      id: invoice,
      santri_id: santriId,
      va: '',
      total: net,
      status: 'pending',
      created_by: uid,
      data: dataIntent
    })
    if (insErr) throw insErr

    const notifUrl = `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/doku-webhook`
    const badan = JSON.stringify(
      bangunCheckout({ invoice, kanal, items, biaya: rinci.biaya, santriNama: santri.nama || '', notifUrl })
    )
    const target = '/checkout/v1/payment'
    const headers = await headerDoku({
      clientId: CLIENT_ID,
      secretKey: SECRET_KEY,
      requestId: crypto.randomUUID(),
      nowMs: Date.now(),
      target,
      badan
    })
    const r = await fetch(url.api + target, { method: 'POST', headers, body: badan })
    const j = await r.json().catch(() => ({}))
    const h = bacaHasilCheckout(j, r.ok)
    if (!h.ok) {
      await db
        .from('keuangan_va_intent')
        .update({ status: 'gagal', data: { ...dataIntent, galat: h.galat }, updated_at: kini })
        .eq('id', invoice)
      console.error('[doku-charge]', r.status, h.galat)
      return json({ ok: false, error: h.galat }, 502)
    }
    await db
      .from('keuangan_va_intent')
      .update({
        data: {
          ...dataIntent,
          mode: 'tautan',
          redirect_url: h.url,
          doku_token: h.tokenId,
          expiry_at: h.expiryAt
        },
        updated_at: kini
      })
      .eq('id', invoice)

    return json({
      ok: true,
      mode: 'tautan',
      gerbang: 'doku',
      intent_id: invoice,
      redirect_url: h.url,
      expiry_at: h.expiryAt,
      net,
      biaya: rinci.biaya,
      total: rinci.total,
      sandbox: url.sandbox
    })
  } catch (e) {
    console.error('[doku-charge] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
