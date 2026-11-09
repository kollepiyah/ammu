// midtrans-charge — wali membuat (atau membatalkan) kode bayar Midtrans untuk keranjangnya.
//
// v.1.4.9 gel. 2 (Kyai, 4 Nov 2026). Dipanggil dari PembayaranView lewat
// supabase.functions.invoke('midtrans-charge', { body }). JWT WAJIB (deploy TANPA
// --no-verify-jwt). Body:
//   { aksi: 'buat', santri_id, kanal: 'bri'|'bni'|'bca'|'bsi'|'mandiri'|'qris',
//     items: [{ tipe:'tagihan', tagihan_id, nominal } | { tipe:'uang_saku', nominal }] }
//   { aksi: 'batal', intent_id }
//
// Angka dari layar TIDAK dipercaya: sisa tagihan dibaca ulang, item dijepit ke sisanya,
// biaya layanan dihitung ulang dari settings (cermin utils/biayaMidtrans.js). Keranjang
// disimpan sebagai keuangan_va_intent (total = BERSIH, tanpa biaya layanan) — bentuk yang
// sama dengan keranjang VA BMT, jadi midtrans-webhook mencatatnya lewat apply_bmt_payment.
//
// v.1.4.9 gel. 2: BRI/BNI/BCA/Mandiri/QRIS lewat Core API (nomor VA / QR tampil di Ammu);
//   BSI lewat Snap (jendela Midtrans). Respons memuat `mode: 'core' | 'snap'`.
//
// DEPLOY: supabase functions deploy midtrans-charge
// SECRET: supabase secrets set MIDTRANS_SERVER_KEY="SB-Mid-server-…"  (sandbox berawalan SB-)
//   Kunci dibaca SEKALI saat fungsi menyala: sesudah mengganti secret, deploy ulang fungsi ini
//   dan midtrans-webhook supaya tak ada instans hangat yang masih memegang kunci lama. Cek:
//   GET …/functions/v1/midtrans-webhook → "mode": "production" | "sandbox".
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'
import {
  bacaHasilCharge,
  bangunCharge,
  bangunSnap,
  buatOrderId,
  cariKanal,
  kanalAktif,
  midtransAktif,
  rincianBayar,
  urlMidtrans,
  type ItemBayar
} from '../_shared/midtrans.ts'

const SERVER_KEY = Deno.env.get('MIDTRANS_SERVER_KEY') || ''

function authMidtrans(): string {
  return 'Basic ' + btoa(SERVER_KEY + ':')
}

// deno-lint-ignore no-explicit-any
async function fetchSettings(db: any): Promise<Record<string, unknown>> {
  const [g, w] = await Promise.all([
    db.from('settings').select('value').eq('key', 'general').maybeSingle(),
    db.from('settings').select('value').eq('key', 'web').maybeSingle()
  ])
  return { ...(w.data?.value || {}), ...(g.data?.value || {}) }
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405)

  try {
    const authHeader = req.headers.get('Authorization') || ''
    if (!/^Bearer\s+.+/i.test(authHeader)) return json({ ok: false, error: 'Belum masuk.' }, 401)
    if (!SERVER_KEY) return json({ ok: false, error: 'Midtrans belum disiapkan (server key).' }, 503)

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    // Klien ber-JWT pemanggil: RLS santri menentukan santri mana yang boleh ia bayarkan.
    const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    })
    const db = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: userData } = await asCaller.auth.getUser()
    const uid = userData?.user?.id || null
    if (!uid) return json({ ok: false, error: 'Sesi tidak sah.' }, 401)

    const body = await req.json().catch(() => ({}))
    const aksi = String(body.aksi || 'buat')
    const url = urlMidtrans(SERVER_KEY)

    // ── Batal: hanya intent Midtrans yang masih menunggu, milik santri yang bisa dibaca pemanggil.
    if (aksi === 'batal') {
      const id = String(body.intent_id || '')
      const { data: it } = await db.from('keuangan_va_intent').select('*').eq('id', id).maybeSingle()
      if (!it || it.data?.sumber !== 'midtrans') return json({ ok: false, error: 'Tidak ditemukan.' }, 404)
      const { data: boleh } = await asCaller.from('santri').select('id').eq('id', it.santri_id).maybeSingle()
      if (!boleh) return json({ ok: false, error: 'Bukan santri Anda.' }, 403)
      if (it.status !== 'pending') return json({ ok: true, status: it.status })
      // Batalkan di Midtrans dulu: kalau gagal karena SUDAH dibayar, intent jangan ditutup —
      //   notifikasinya akan datang dan mencatatnya.
      const r = await fetch(`${url.api}/v2/${encodeURIComponent(id)}/cancel`, {
        method: 'POST',
        headers: { Authorization: authMidtrans(), Accept: 'application/json' }
      })
      const j = await r.json().catch(() => ({}))
      const st = String(j.transaction_status || '')
      if (st === 'settlement' || st === 'capture') {
        return json({ ok: false, error: 'Sudah dibayar — menunggu pencatatan.' }, 409)
      }
      await db
        .from('keuangan_va_intent')
        .update({
          status: 'dibatalkan',
          data: { ...(it.data || {}), dibatalkan_at: new Date().toISOString(), midtrans_batal: j },
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('status', 'pending')
      return json({ ok: true, status: 'dibatalkan' })
    }

    // ── Buat
    const settings = await fetchSettings(db)
    if (!midtransAktif(settings)) return json({ ok: false, error: 'Pembayaran online belum aktif.' }, 403)
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

    // 9 Nov 2026 (pindah ke kunci production): kode sandbox santri ini yang masih "pending" tak
    //   bisa lagi dibayar maupun dicatat — statusnya kini ditanya ke API production yang tak
    //   mengenalnya, jadi notifikasi kedaluwarsanya pun tak pernah tercatat. Tutup supaya tak
    //   tampil "Menunggu Bayar" di daftar wali. Gagal di sini tak menghalangi kode baru.
    if (!url.sandbox) {
      const { error: tutupErr } = await db
        .from('keuangan_va_intent')
        .update({ status: 'kadaluarsa', updated_at: new Date().toISOString() })
        .eq('santri_id', santriId)
        .eq('status', 'pending')
        .eq('data->>sumber', 'midtrans')
        .eq('data->>sandbox', 'true')
      if (tutupErr) console.warn('[midtrans-charge] tutup kode sandbox lama gagal:', tutupErr.message)
    }

    // Item dijepit ke sisa tagihan yang SEKARANG (bukan yang dilihat layar beberapa menit lalu).
    const minta = Array.isArray(body.items) ? body.items : []
    const idTagihan = [
      ...new Set(
        // deno-lint-ignore no-explicit-any
        minta.filter((x: any) => x?.tipe === 'tagihan' && x?.tagihan_id).map((x: any) => String(x.tagihan_id))
      )
    ]
    const peta = new Map<string, { kategori: string; periode: string; sisa: number }>()
    if (idTagihan.length) {
      const { data: rows, error } = await db
        .from('keuangan_tagihan')
        .select('id, santri_id, nominal, terbayar, kategori, periode')
        .in('id', idTagihan)
        .eq('santri_id', santriId)
      if (error) throw error
      for (const t of rows || []) {
        peta.set(String(t.id), {
          kategori: String(t.kategori || 'Tagihan'),
          periode: String(t.periode || ''),
          sisa: Math.max(0, Math.round(Number(t.nominal || 0) - Number(t.terbayar || 0)))
        })
      }
    }
    const items: ItemBayar[] = []
    for (const x of minta) {
      const n = Math.round(Number(x?.nominal) || 0)
      if (n <= 0) continue
      if (x?.tipe === 'tagihan') {
        const t = peta.get(String(x.tagihan_id))
        if (!t || t.sisa <= 0) continue
        const pakai = Math.min(n, t.sisa)
        t.sisa -= pakai // tagihan yang sama dua kali di keranjang tak bisa melebihi sisanya
        items.push({ tipe: 'tagihan', tagihan_id: String(x.tagihan_id), kategori: t.kategori, periode: t.periode, nominal: pakai })
      } else if (x?.tipe === 'uang_saku') {
        items.push({ tipe: 'uang_saku', nominal: n })
      }
    }
    const net = items.reduce((s, i) => s + i.nominal, 0)
    const rinci = rincianBayar(net, kanal.id, settings)
    if (!items.length) return json({ ok: false, error: 'Tidak ada yang perlu dibayar.' }, 400)
    if (rinci.galat) return json({ ok: false, error: rinci.galat }, 400)

    const orderId = buatOrderId(santriId, Date.now(), crypto.randomUUID().replace(/-/g, ''))
    // Label yang dilihat wali — tanpa nama penyedia (Kyai: "tulisan Midtrans hilangkan").
    const label = kanal.jenis === 'qris' ? 'QRIS' : `VA ${kanal.label}`
    const kini = new Date().toISOString()
    const dataIntent = {
      sumber: 'midtrans',
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
      id: orderId,
      santri_id: santriId,
      va: '',
      total: net,
      status: 'pending',
      created_by: uid,
      data: dataIntent
    })
    if (insErr) throw insErr

    const gagal = async (pesan: string, status: number) => {
      await db
        .from('keuangan_va_intent')
        .update({ status: 'gagal', data: { ...dataIntent, galat: pesan }, updated_at: kini })
        .eq('id', orderId)
      console.error('[midtrans-charge]', status, pesan)
      return json({ ok: false, error: pesan }, 502)
    }

    // v.1.4.9 gel. 2 (Kyai: "seperti Shopee") — kanal core: Core API, nomor VA / QR ditampilkan
    //   di layar Ammu sendiri. BSI (tak ada di Core API) tetap lewat Snap di bawah.
    if (kanal.core) {
      const bodyCore = bangunCharge({ orderId, kanal, items, biaya: rinci.biaya, santriNama: santri.nama || '' })
      const rc = await fetch(`${url.api}/v2/charge`, {
        method: 'POST',
        headers: {
          Authorization: authMidtrans(),
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(bodyCore)
      })
      const jc = await rc.json().catch(() => ({}))
      const h = bacaHasilCharge(jc, kanal, Date.now())
      if (!h.ok) {
        if (h.galatAsli !== h.galat) console.error('[midtrans-charge] Midtrans:', h.galatAsli)
        return await gagal(h.galat, rc.status)
      }
      const dataCore = {
        ...dataIntent,
        mode: 'core',
        kode_perusahaan: h.kodePerusahaan,
        qr_url: h.qrUrl,
        qr_string: h.qrString,
        transaction_id: h.transactionId,
        expiry_at: h.expiryAt
      }
      await db
        .from('keuangan_va_intent')
        .update({ va: h.nomor, data: dataCore, updated_at: kini })
        .eq('id', orderId)
      return json({
        ok: true,
        mode: 'core',
        intent_id: orderId,
        kanal: kanal.id,
        kanal_label: label,
        nomor: h.nomor,
        kode_perusahaan: h.kodePerusahaan,
        qr_url: h.qrUrl,
        expiry_at: h.expiryAt,
        net,
        biaya: rinci.biaya,
        total: rinci.total,
        sandbox: url.sandbox
      })
    }

    const payload = bangunSnap({ orderId, kanal, items, biaya: rinci.biaya, santriNama: santri.nama || '' })
    const r = await fetch(url.snap, {
      method: 'POST',
      headers: {
        Authorization: authMidtrans(),
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok || !j.redirect_url) {
      const pesan = Array.isArray(j.error_messages) ? j.error_messages.join('; ') : 'Midtrans menolak permintaan.'
      return await gagal(pesan, r.status)
    }
    await db
      .from('keuangan_va_intent')
      .update({
        data: { ...dataIntent, mode: 'snap', snap_token: j.token, redirect_url: j.redirect_url },
        updated_at: kini
      })
      .eq('id', orderId)

    return json({
      ok: true,
      mode: 'snap',
      intent_id: orderId,
      snap_token: j.token,
      redirect_url: j.redirect_url,
      net,
      biaya: rinci.biaya,
      total: rinci.total,
      sandbox: url.sandbox
    })
  } catch (e) {
    console.error('[midtrans-charge] error:', (e as Error)?.message || e)
    return json({ ok: false, error: (e as Error)?.message || 'server' }, 500)
  }
})
