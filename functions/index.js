// ====================================================================
// FIREBASE CLOUD FUNCTIONS — Mambaul Ulum
// Berisi 2 functions:
//   1. kirimNotifikasiMassal — dispatch FCM notifications
//   2. getLinkPreview — fetch Open Graph metadata for link preview
//
// CARA DEPLOY:
// 1. Install Firebase CLI: npm install -g firebase-tools
// 2. firebase login
// 3. Di folder project (sejajar dengan index.html), jalankan:
//    firebase init functions
//    Pilih: JavaScript, gunakan ESLint (opsional), install dependencies = Yes
// 4. Replace isi file `functions/index.js` dengan file ini
// 5. Pastikan package.json di folder functions punya dependency:
//    "firebase-admin": "^12.0.0",
//    "firebase-functions": "^5.0.0",
//    "cheerio": "^1.0.0",
//    "node-fetch": "^2.7.0"
//
//    JALANKAN:
//    cd functions
//    npm install cheerio node-fetch@2
//    cd ..
// 6. Deploy: firebase deploy --only functions
//
// CATATAN:
// - Firebase wajib pakai Blaze (pay-as-you-go) plan untuk Cloud Functions
// - Free quota: 2 juta invocations/bulan, 400.000 GB-detik (cukup besar)
// ====================================================================

const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore')
const { onRequest } = require('firebase-functions/v2/https')
const { onSchedule } = require('firebase-functions/v2/scheduler')
const { defineSecret } = require('firebase-functions/params')
const { initializeApp } = require('firebase-admin/app')
const { getMessaging } = require('firebase-admin/messaging')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')
const logger = require('firebase-functions/logger')

// v.108.31: Iframely API key as Secret (modern, future-proof, no deprecation)
// Setup: firebase functions:secrets:set IFRAMELY_KEY (paste API key saat prompt)
const iframelyKey = defineSecret('IFRAMELY_KEY')

initializeApp()
const messaging = getMessaging()
const db = getFirestore()

// v.95.0626: resolve daftar fcm_token dari `target` (server-side, lebih aman & skalabel).
//   target: 'semua' | {type:'santri',id} | {type:'wa',wa} | {type:'lembaga',lembaga} | {type:'guru',nama}
async function resolveTokensByTarget(target) {
  const tokens = new Set()
  const addTok = (snap) =>
    snap.forEach((d) => {
      const t = d.data().fcm_token
      if (t) tokens.add(t)
    })
  try {
    const t = target || 'semua'
    if (t === 'semua' || t === 'all' || t.type === 'all') {
      addTok(await db.collection('santri').where('fcm_token', '!=', null).get())
      addTok(await db.collection('guru').where('fcm_token', '!=', null).get())
    } else if (t === 'admin' || t.type === 'admin') {
      // v.95.0626c: HANYA admin verifikator (admin/admin_keuangan/super_admin) — bukan wali pengirim
      addTok(await db.collection('guru').where('role_sistem', 'in', ['admin', 'admin_keuangan', 'super_admin']).get())
    } else if (t === 'santri_semua' || t.type === 'santri_all') {
      // v.95.0626d: broadcast ke SEMUA wali/santri saja (tanpa guru) — utk notif tagihan bulanan
      addTok(await db.collection('santri').where('fcm_token', '!=', null).get())
    } else if (t.type === 'santri' && t.id) {
      const sdoc = await db.collection('santri').doc(String(t.id)).get()
      if (sdoc.exists) {
        const sd = sdoc.data()
        if (sd.fcm_token) tokens.add(sd.fcm_token)
        // device wali bisa login sebagai anak lain (wa sama) -> ikutkan
        if (sd.wa) addTok(await db.collection('santri').where('wa', '==', sd.wa).get())
      }
    } else if (t.type === 'wa' && t.wa) {
      addTok(await db.collection('santri').where('wa', '==', t.wa).get())
    } else if (t.type === 'lembaga' && t.lembaga) {
      addTok(await db.collection('santri').where('lembaga', '==', t.lembaga).get())
      addTok(await db.collection('santri').where('lembaga_sekolah', '==', t.lembaga).get())
      addTok(await db.collection('guru').where('lembaga', '==', t.lembaga).get())
    } else if (t.type === 'guru' && t.nama) {
      addTok(await db.collection('guru').where('nama', '==', t.nama).get())
    }
  } catch (e) {
    logger.warn('resolveTokensByTarget:', e?.message || e)
  }
  return [...tokens]
}

// ====================================================================
// FUNCTION 1: NOTIFICATION DISPATCHER
// Trigger: setiap document baru di 'notif_queue'
// ====================================================================
exports.kirimNotifikasiMassal = onDocumentCreated(
  {
    document: 'notif_queue/{notifId}',
    region: 'asia-southeast2', // Jakarta region
    timeoutSeconds: 60,
    memory: '256MiB'
  },
  async (event) => {
    const snap = event.data
    if (!snap) return
    const data = snap.data()
    const notifId = event.params.notifId

    if (data.status === 'sent') {
      logger.info(`Notif ${notifId} already sent, skipping.`)
      return
    }

    // v.95.0626: pakai tokens eksplisit kalau ada; kalau tidak, resolve dari `target` (server-side)
    let tokens = Array.isArray(data.tokens) ? data.tokens.filter(Boolean) : []
    if (tokens.length === 0) tokens = await resolveTokensByTarget(data.target)
    if (tokens.length === 0) {
      await snap.ref.update({ status: 'failed', error: 'No tokens' })
      return
    }

    // Build message
    const message = {
      notification: {
        title: data.judul || 'Mambaul Ulum',
        body: data.pesan || ''
      },
      data: {
        target: data.target || 'semua',
        sender: data.sender || 'Admin',
        timestamp: data.timestamp || new Date().toISOString()
      },
      webpush: {
        notification: {
          icon: '/icon-192.png',
          badge: '/icon-192.png'
        },
        fcmOptions: { link: '/' }
      }
    }

    // Kirim batch (FCM batas 500 token per batch)
    let sukses = 0,
      gagal = 0
    const tokenInvalid = []
    for (let i = 0; i < tokens.length; i += 500) {
      const batch = tokens.slice(i, i + 500)
      try {
        const resp = await messaging.sendEachForMulticast({
          ...message,
          tokens: batch
        })
        sukses += resp.successCount
        gagal += resp.failureCount
        resp.responses.forEach((r, idx) => {
          if (!r.success) {
            const err = r.error
            if (
              err &&
              (err.code === 'messaging/invalid-registration-token' ||
                err.code === 'messaging/registration-token-not-registered')
            ) {
              tokenInvalid.push(batch[idx])
            }
          }
        })
      } catch (e) {
        logger.error(`Batch error:`, e)
        gagal += batch.length
      }
    }

    // Hapus token invalid dari user
    if (tokenInvalid.length > 0) {
      try {
        const guruSnap = await db
          .collection('guru')
          .where('fcm_token', 'in', tokenInvalid.slice(0, 30))
          .get()
        guruSnap.forEach((doc) => doc.ref.update({ fcm_token: null }))
        const santriSnap = await db
          .collection('santri')
          .where('fcm_token', 'in', tokenInvalid.slice(0, 30))
          .get()
        santriSnap.forEach((doc) => doc.ref.update({ fcm_token: null }))
      } catch (e) {
        logger.warn('Cleanup invalid tokens:', e)
      }
    }

    // Update status notifikasi
    await snap.ref.update({
      status: 'sent',
      sent_at: new Date().toISOString(),
      sukses_count: sukses,
      gagal_count: gagal,
      invalid_tokens_removed: tokenInvalid.length
    })

    logger.info(`Notif ${notifId}: ${sukses} sukses, ${gagal} gagal`)
  }
)

// ====================================================================
// v.95.0626 — AUTO-PUSH per event (enqueue ke notif_queue -> dikirim kirimNotifikasiMassal)
// ====================================================================

// Pengumuman baru (beranda_post) -> broadcast ke SEMUA.
exports.onBerandaPostCreated = onDocumentCreated(
  { document: 'beranda_post/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const p = event.data?.data()
    if (!p) return
    await db.collection('notif_queue').add({
      judul: p.judul ? `Pengumuman: ${p.judul}` : 'Pengumuman Baru',
      pesan: String(p.isi || p.judul || '').slice(0, 140),
      target: 'semua',
      link: '/posts',
      sender: p.author || p.penulis || 'Admin',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// Tagihan INDIVIDUAL baru -> push ke wali. Skip BULK (auto_generate/generate_khusus) biar tak flood.
exports.onTagihanCreated = onDocumentCreated(
  { document: 'keuangan_tagihan/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const t = event.data?.data()
    if (!t || !t.santri_id) return
    const sumber = String(t.sumber || '')
    if (sumber === 'auto_generate' || sumber === 'generate_khusus') return // bulk -> jangan spam
    const rp = new Intl.NumberFormat('id-ID').format(Number(t.nominal || 0))
    await db.collection('notif_queue').add({
      judul: 'Tagihan Baru',
      pesan: `${t.kategori || 'Tagihan'}${t.periode ? ' · ' + t.periode : ''} · Rp ${rp}`,
      target: { type: 'santri', id: String(t.santri_id) },
      link: '/tagihan',
      sender: 'Sistem',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// Pembayaran transfer terverifikasi -> push ke wali (saat status berubah jadi 'verified').
exports.onPembayaranVerified = onDocumentUpdated(
  { document: 'pembayaran_transfer_pending/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const before = event.data?.before?.data() || {}
    const after = event.data?.after?.data() || {}
    if (after.status !== 'verified' || before.status === after.status) return
    if (!after.santri_id) return
    const rp = new Intl.NumberFormat('id-ID').format(Number(after.nominal || 0))
    await db.collection('notif_queue').add({
      judul: 'Pembayaran Terverifikasi',
      pesan: `${after.kategori || 'Pembayaran'} Rp ${rp} sudah diverifikasi. Terima kasih.`,
      target: { type: 'santri', id: String(after.santri_id) },
      link: '/tagihan',
      sender: 'Admin',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// Kenaikan jilid/kelas/khotam (riwayat_kenaikan) -> push "tertarget" ke wali (event, bukan input massal).
exports.onKenaikanCreated = onDocumentCreated(
  { document: 'riwayat_kenaikan/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const r = event.data?.data()
    if (!r || !r.santri_id) return
    const tujuan = `${r.ke_lembaga || ''} ${r.ke_kelas || ''}`.trim()
    await db.collection('notif_queue').add({
      judul: 'Selamat, Naik Tingkat! 🎉',
      pesan: tujuan ? `Ananda naik ke ${tujuan}.` : 'Ananda telah naik tingkat. Selamat!',
      target: { type: 'santri', id: String(r.santri_id) },
      link: '/capaian-prestasi',
      sender: 'Pondok',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// ====================================================================
// FUNCTION 2: LINK PREVIEW (Open Graph fetcher)
// HTTP GET endpoint dengan CORS enabled
// Usage dari web:
//   fetch('https://us-central1-<projectId>.cloudfunctions.net/getLinkPreview?url=<URL>')
//
// Return: JSON { title, description, image, url, siteName }
//
// Cache di Firestore collection 'link_preview_cache' (TTL 7 hari)
// supaya link yang sama tidak di-fetch ulang
// ====================================================================
const cheerio = require('cheerio')
const fetch = require('node-fetch')

exports.getLinkPreview = onRequest(
  {
    region: 'us-central1', // sesuai default Firebase Functions
    timeoutSeconds: 30,
    memory: '256MiB',
    cors: true, // izinkan request dari semua origin
    secrets: [iframelyKey] // v.108.31: bind Secret Manager value
  },
  async (req, res) => {
    // Set CORS headers eksplisit (untuk safety)
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(204).send('')
    }

    const targetUrl = req.query.url
    if (!targetUrl) {
      return res.status(400).json({ error: 'Missing ?url= parameter' })
    }

    // Validasi URL
    let parsed
    try {
      parsed = new URL(targetUrl)
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return res.status(400).json({ error: 'Only http/https URLs allowed' })
      }
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL' })
    }

    // Cache key (hash dari URL)
    const cacheKey = Buffer.from(targetUrl)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 100)

    // Cek cache Firestore (TTL 7 hari)
    try {
      const cacheDoc = await db.collection('link_preview_cache').doc(cacheKey).get()
      if (cacheDoc.exists) {
        const cached = cacheDoc.data()
        const cachedAt = new Date(cached.cached_at).getTime()
        const ageMs = Date.now() - cachedAt
        const TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 hari
        if (ageMs < TTL_MS) {
          logger.info(`Cache HIT: ${targetUrl}`)
          return res.json(cached.data)
        }
      }
    } catch (e) {
      logger.warn('Cache read error:', e.message)
    }

    // v.108.31: Social media URLs (Instagram, TikTok, FB) — pakai Iframely API
    // (OG scraping gagal karena social media block server-side scraping)
    const SOCIAL_DOMAINS =
      /(?:instagram\.com|tiktok\.com|facebook\.com|twitter\.com|x\.com|threads\.net|pinterest\.com)/i
    if (SOCIAL_DOMAINS.test(parsed.hostname)) {
      try {
        // Iframely Free Tier: 1000 req/bulan
        // Setup: daftar di iframely.com → dapat API key → set via Secret Manager:
        //   firebase functions:secrets:set IFRAMELY_KEY
        //   (paste API key saat prompt, lalu deploy: firebase deploy --only functions)
        const IFRAMELY_KEY = iframelyKey.value() || ''
        if (!IFRAMELY_KEY) {
          logger.warn('Iframely API key not configured — social media link preview disabled')
          // Tetap fallback ke generic preview tanpa rich data
          const fallback = {
            url: targetUrl,
            title: parsed.hostname,
            description: 'Konten di ' + parsed.hostname,
            image: '',
            siteName: parsed.hostname
          }
          return res.json(fallback)
        }
        const iframelyUrl = `https://iframe.ly/api/oembed?url=${encodeURIComponent(targetUrl)}&api_key=${IFRAMELY_KEY}&iframe=0`
        const r = await fetch(iframelyUrl, { timeout: 10000 })
        if (r.ok) {
          const j = await r.json()
          const result = {
            url: targetUrl,
            title: (j.title || '').trim(),
            description: (j.description || '').trim(),
            image: j.thumbnail_url || '',
            siteName: j.provider_name || parsed.hostname
          }
          // Cache
          try {
            await db.collection('link_preview_cache').doc(cacheKey).set({
              data: result,
              cached_at: new Date().toISOString(),
              source: 'iframely'
            })
          } catch (e) {
            logger.warn('Cache write error:', e.message)
          }
          logger.info(`Iframely OK: ${targetUrl}`)
          return res.json(result)
        }
        logger.warn(`Iframely failed (${r.status}) for ${targetUrl}, fallback to OG scraping`)
      } catch (e) {
        logger.warn('Iframely error:', e.message)
      }
    }

    // Fetch HTML (untuk URL non-social media atau Iframely gagal)
    let html
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 12000) // 12 detik
      const r = await fetch(targetUrl, {
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MambaulUlumBot/1.0; +https://almanshur.id)',
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'id,en;q=0.5'
        }
      })
      clearTimeout(timeout)
      if (!r.ok) {
        return res.status(502).json({ error: `Target returned ${r.status}` })
      }
      const ct = r.headers.get('content-type') || ''
      if (!ct.includes('text/html')) {
        return res.status(415).json({ error: 'Target is not HTML' })
      }
      // Limit size: max 1 MB
      const buf = await r.buffer()
      if (buf.length > 1024 * 1024) {
        return res.status(413).json({ error: 'Target HTML too large' })
      }
      html = buf.toString('utf8')
    } catch (e) {
      logger.error('Fetch error:', e.message)
      return res.status(504).json({ error: 'Fetch timeout or error: ' + e.message })
    }

    // Parse Open Graph + standard meta tags
    let result = { url: targetUrl }
    try {
      const $ = cheerio.load(html)

      const getMeta = (selectors) => {
        for (const sel of selectors) {
          const v = $(sel).attr('content') || $(sel).attr('value')
          if (v && v.trim()) return v.trim()
        }
        return ''
      }

      result.title =
        getMeta([
          'meta[property="og:title"]',
          'meta[name="twitter:title"]',
          'meta[itemprop="name"]'
        ]) ||
        $('title').first().text().trim() ||
        parsed.hostname

      result.description = getMeta([
        'meta[property="og:description"]',
        'meta[name="twitter:description"]',
        'meta[name="description"]'
      ]).substring(0, 280)

      let imgRaw = getMeta([
        'meta[property="og:image"]',
        'meta[property="og:image:url"]',
        'meta[name="twitter:image"]',
        'meta[name="twitter:image:src"]',
        'meta[itemprop="image"]'
      ])

      // Resolve relative image URL
      if (imgRaw) {
        try {
          result.image = new URL(imgRaw, targetUrl).href
        } catch (e) {
          result.image = imgRaw
        }
      } else {
        result.image = ''
      }

      result.siteName =
        getMeta(['meta[property="og:site_name"]', 'meta[name="application-name"]']) ||
        parsed.hostname

      // Truncate long titles
      if (result.title.length > 200) result.title = result.title.substring(0, 200) + '...'
    } catch (e) {
      logger.error('Parse error:', e.message)
      result.title = parsed.hostname
      result.description = ''
      result.image = ''
      result.siteName = parsed.hostname
    }

    // Cache result (7 hari)
    try {
      await db.collection('link_preview_cache').doc(cacheKey).set({
        url: targetUrl,
        data: result,
        cached_at: new Date().toISOString()
      })
    } catch (e) {
      logger.warn('Cache write error:', e.message)
    }

    logger.info(`Cache MISS, fetched: ${targetUrl}`)
    return res.json(result)
  }
)

// ====================================================================
// FUNCTION 3: AUTO-CLEANUP AUDIT_LOG (jadwal harian)
// Hapus record audit_log lebih dari 90 hari untuk cegah collection bloat
//
// (v.108.66) Restored dari legacy cloud-functions-index.js.
// Sebelumnya hilang saat migration ke functions/index.js -> audit_log
// collection bisa bloat tanpa cleanup. Re-include + deploy.
//
// CARA DEPLOY:
//   firebase deploy --only functions:cleanupAuditLog
//
// CARA VERIFIKASI:
//   Firebase Console -> Cloud Scheduler
//   Job: firebase-schedule-cleanupAuditLog-asia-southeast2
//
// CARA TEST MANUAL: di Cloud Scheduler console, klik RUN NOW
//
// CARA UBAH RETENSI: edit konstanta RETENSI_HARI di bawah
// ====================================================================
exports.cleanupAuditLog = onSchedule(
  {
    schedule: 'every day 02:00', // jam 2 pagi setiap hari
    timeZone: 'Asia/Jakarta',
    region: 'asia-southeast2',
    timeoutSeconds: 540, // max 9 menit
    memory: '256MiB'
  },
  async (event) => {
    const RETENSI_HARI = 90
    const cutoffISO = new Date(Date.now() - RETENSI_HARI * 24 * 60 * 60 * 1000).toISOString()
    logger.info(`[cleanupAuditLog] Hapus audit_log < ${cutoffISO}`)

    let totalDeleted = 0
    let hasMore = true

    // Loop batch sampai habis (max 500 per batch Firestore)
    while (hasMore) {
      const snap = await db
        .collection('audit_log')
        .where('timestamp', '<', cutoffISO)
        .limit(450)
        .get()
      if (snap.empty) {
        hasMore = false
        break
      }

      const batch = db.batch()
      snap.forEach((doc) => batch.delete(doc.ref))
      await batch.commit()
      totalDeleted += snap.size
      logger.info(`[cleanupAuditLog] Batch hapus ${snap.size} record (total: ${totalDeleted})`)

      if (snap.size < 450) hasMore = false
    }

    logger.info(
      `[cleanupAuditLog] SELESAI. Total ${totalDeleted} record dihapus (>${RETENSI_HARI} hari).`
    )
    return null
  }
)


// ====================================================================
// v.07.0626 (Exec D Opsi 2): findUserByLogin — lookup user SERVER-SIDE (Admin SDK)
//   Tujuan: client tak perlu baca/enumerasi koleksi guru/santri -> PII santri (NIK/ortu)
//   tak world-readable. Port logika persis dari client findUserByLoginInput.
//   Response PII di-STRIP (cuma kirim field yang dibutuhkan login). { user: {...}|null }.
//   Client tetap punya FALLBACK direct-read kalau function gagal (login tak patah).
// ====================================================================
const _STRIP_PII = ['nik','no_kk','ayah','ibu','nama_ayah','nik_ayah','pekerjaan_ayah','pendidikan_ayah','hp_ayah','nama_ibu','nik_ibu','pekerjaan_ibu','pendidikan_ibu','hp_ibu','alamat','alamat_dusun','alamat_rt','alamat_rw','alamat_desa','alamat_kecamatan','alamat_kabupaten','alamat_provinsi','tempat_lahir','nama_panggilan','asal_sekolah','penghasilan_ortu','catatan_riwayat_pribadi','riwayat']
function _stripPII(o) { const c = { ...o }; for (const k of _STRIP_PII) delete c[k]; return c }

exports.findUserByLogin = onRequest(
  { region: 'us-central1', timeoutSeconds: 20, memory: '256MiB', cors: true },
  async (req, res) => {
    try {
      const input = String((req.query && req.query.input) || (req.body && req.body.input) || '').trim()
      if (!input) { res.json({ user: null }); return }
      const u = input
      const uLower = u.toLowerCase()
      const uDigits = u.replace(/\D/g, '')
      const fdb = getFirestore()

      let adminUser = 'adminmu'
      try {
        const ws = await fdb.collection('settings').doc('web').get()
        if (ws.exists && ws.data() && ws.data().adminUsername) adminUser = ws.data().adminUsername
      } catch (e) { /* default adminmu */ }
      if (uLower === 'adminmu' || uLower === String(adminUser).toLowerCase()) {
        res.json({ user: { source: 'admin', data: { id: 'admin', username: adminUser }, authKey: String(adminUser).toLowerCase() } })
        return
      }

      let guruDoc = null
      let gq = await fdb.collection('guru').where('username', '==', u).limit(1).get()
      if (!gq.empty) guruDoc = gq.docs[0]
      if (!guruDoc && uDigits.length >= 8) {
        gq = await fdb.collection('guru').where('wa', '==', uDigits).limit(1).get()
        if (!gq.empty) guruDoc = gq.docs[0]
      }
      if (!guruDoc && /[a-z]/i.test(u)) {
        const all = await fdb.collection('guru').get()
        guruDoc = all.docs.find((d) => String(d.data().username || '').toLowerCase() === uLower)
      }
      if (guruDoc) {
        const g = { id: guruDoc.id, ...guruDoc.data() }
        const wa = String(g.wa || '').replace(/\D/g, '')
        const authKey = wa.length >= 8 ? wa : (g.username || String(g.id))
        res.json({ user: { source: 'guru', data: _stripPII(g), authKey } })
        return
      }

      let santriDoc = null
      let sq = await fdb.collection('santri').where('username', '==', u).limit(1).get()
      if (!sq.empty) santriDoc = sq.docs[0]
      if (!santriDoc && uDigits.length >= 8) {
        sq = await fdb.collection('santri').where('wa', '==', uDigits).limit(1).get()
        if (!sq.empty) santriDoc = sq.docs[0]
      }
      if (!santriDoc) {
        sq = await fdb.collection('santri').where('nis', '==', u).limit(1).get()
        if (!sq.empty) santriDoc = sq.docs[0]
      }
      if (!santriDoc && /[a-z]/i.test(u)) {
        const all = await fdb.collection('santri').get()
        santriDoc = all.docs.find((d) => String(d.data().username || '').toLowerCase() === uLower)
      }
      if (santriDoc) {
        const s = { id: santriDoc.id, ...santriDoc.data() }
        const wa = String(s.wa || '').replace(/\D/g, '')
        const authKey = wa.length >= 8 ? wa : (s.username || s.nis || String(s.id))
        res.json({ user: { source: 'santri', data: _stripPII(s), authKey } })
        return
      }

      res.json({ user: null })
    } catch (e) {
      logger.error('[findUserByLogin] error', e)
      res.status(500).json({ error: String((e && e.message) || e) })
    }
  }
)

// ====================================================================
// FUNCTION 5 (v.95.0626): AUTO-GENERATE TAGIHAN BULANAN — jadwal harian, IDEMPOTENT
//   Replikasi server-side dari tombol manual "autoGenerate" (PengaturanKeuanganView).
//   - Jalan tiap hari 01:00 WIB. Buat tagihan bulan berjalan utk jenis ber-flag
//     auto_generate=true. Dedup (santri_id + kategori + periode) -> aman walau jalan
//     tiap hari: run pertama tiap bulan yang membuat, sisanya skip.
//   - Nominal: 4-lapis (per-santri -> per-kelas -> per-lembaga -> default), persis client.
//   - jatuh_tempo = tahun-bulan-<keu_jatuh_tempo> (mis. 2026-06-10).
//   - Kill-switch: settings/general.keu_auto_generate_cron === false -> SKIP (tanpa hapus
//     tombol manual; tombol manual tetap utk uji coba).
//   - Setelah generate, enqueue 1 notif broadcast "Tagihan bulan ini terbit" (tidak spam).
//
// DEPLOY: firebase deploy --only functions:autoGenerateTagihanBulanan
// VERIFIKASI: Firebase Console -> Cloud Scheduler -> job ...autoGenerateTagihanBulanan...
// TEST MANUAL: Cloud Scheduler -> RUN NOW (atau pakai tombol manual di app).
// ====================================================================
const _BULAN_NM = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

exports.autoGenerateTagihanBulanan = onSchedule(
  {
    schedule: 'every day 01:00',
    timeZone: 'Asia/Jakarta',
    region: 'asia-southeast2',
    timeoutSeconds: 540,
    memory: '512MiB'
  },
  async () => {
    // 1) Settings (sumber sama dgn tombol manual: settings/general)
    let s = {}
    try {
      const sd = await db.collection('settings').doc('general').get()
      if (sd.exists) s = sd.data() || {}
    } catch (e) {
      logger.warn('[autoGenTagihan] baca settings gagal:', e?.message || e)
    }
    if (s.keu_auto_generate_cron === false) {
      logger.info('[autoGenTagihan] kill-switch OFF (keu_auto_generate_cron=false) — skip.')
      return null
    }
    const jenisAuto = (Array.isArray(s.keuTagihanJenis) ? s.keuTagihanJenis : []).filter(
      (j) => j && j.auto_generate && String(j.label || '').trim()
    )
    if (jenisAuto.length === 0) {
      logger.info('[autoGenTagihan] tidak ada jenis ber-flag auto_generate — skip.')
      return null
    }
    const jtDay = String(s.keu_jatuh_tempo || 10).padStart(2, '0')

    // 2) Santri aktif
    const sSnap = await db.collection('santri').get()
    const santriAktif = sSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((x) => x.aktif !== false)

    // 3) Periode bulan berjalan (zona Jakarta)
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
    const periode = `${_BULAN_NM[now.getMonth()]} ${now.getFullYear()}`
    const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
    const jt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${jtDay}`

    // 4) Dedup: cukup baca tagihan periode ini saja (hemat, single-field index otomatis)
    const existing = new Set()
    try {
      const tSnap = await db.collection('keuangan_tagihan').where('periode', '==', periode).get()
      tSnap.forEach((d) => {
        const t = d.data()
        existing.add(`${String(t.santri_id)}__${String(t.kategori || t.jenis || '').toLowerCase()}`)
      })
    } catch (e) {
      logger.warn('[autoGenTagihan] baca tagihan existing gagal:', e?.message || e)
    }

    let created = 0, skipped = 0, errCount = 0
    let batch = db.batch()
    let inBatch = 0
    const commit = async () => {
      if (inBatch > 0) { await batch.commit(); batch = db.batch(); inBatch = 0 }
    }

    for (const j of jenisAuto) {
      const wl = Array.isArray(j.lembaga_only) ? j.lembaga_only.filter(Boolean) : []
      for (const sx of santriAktif) {
        if (wl.length > 0 && !(wl.includes(sx.lembaga) || wl.includes(sx.lembaga_sekolah))) continue
        const dupKey = `${String(sx.id)}__${String(j.label || '').toLowerCase()}`
        if (existing.has(dupKey)) { skipped++; continue }
        // 4-lapis lookup: per-santri -> per-kelas -> per-lembaga -> default
        let nominal = Number((j.nominal_per_santri || {})[String(sx.id)] || 0)
        if (nominal === 0) {
          const perK = j.nominal_per_kelas || {}
          for (const [lemb, ks] of [[sx.lembaga, sx.kelas], [sx.lembaga_sekolah, sx.kelas_sekolah]]) {
            if (!lemb) continue
            const v = Number((perK[lemb] || {})[ks] || 0)
            if (v > 0) { nominal = v; break }
          }
        }
        if (nominal === 0) {
          const perL = j.nominal_per_lembaga || {}
          nominal = Number(perL[sx.lembaga] || perL[sx.lembaga_sekolah] || 0) || Number(j.nominal_default || 0)
        }
        if (nominal <= 0) { skipped++; continue }
        try {
          const id = `tagihan_${sx.id}_${j.id}_${ym}`
          batch.set(db.collection('keuangan_tagihan').doc(id), {
            id,
            santri_id: String(sx.id),
            santri_nama: sx.nama || '',
            kategori: j.label || j.id || 'Tagihan',
            periode,
            nominal,
            bayar: 0,
            status: 'belum',
            jatuh_tempo: jt,
            sumber: 'auto_generate',
            created_at: FieldValue.serverTimestamp()
          })
          existing.add(dupKey)
          created++; inBatch++
          if (inBatch >= 450) await commit()
        } catch (e) {
          errCount++
          logger.warn('[autoGenTagihan]', sx.nama, e?.message || e)
        }
      }
    }
    await commit()

    // Broadcast 1 notif kalau ada tagihan baru (onTagihanCreated skip sumber=auto_generate, jadi tak flood)
    if (created > 0) {
      try {
        await db.collection('notif_queue').add({
          judul: 'Tagihan Bulan Ini Terbit',
          pesan: `Tagihan ${periode} sudah terbit. Cek menu Tagihan & Pembayaran.`,
          target: 'santri_semua', // v.95.0626d: hanya wali/santri, bukan guru

          link: '/tagihan',
          sender: 'Sistem',
          status: 'pending',
          timestamp: new Date().toISOString()
        })
      } catch (e) {
        logger.warn('[autoGenTagihan] enqueue notif gagal:', e?.message || e)
      }
    }

    logger.info(`[autoGenTagihan] periode=${periode} jt=${jt} created=${created} skipped=${skipped} err=${errCount}`)
    return null
  }
)
