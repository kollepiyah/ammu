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
// v.100: normalisasi nama utk pembanding keluarga (dipakai guard fan-out same-wa di branch santri).
function _normNama(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '') }
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
        // device wali bisa login sebagai anak lain (wa sama) -> ikutkan, TAPI hanya SE-KELUARGA
        //   (nik_ayah / nama_ayah sama dgn santri target). Cegah notif bocor ke keluarga lain
        //   yg nomor WA-nya kebetulan tertukar/sama. Tanpa data ayah -> konservatif (token sendiri saja).
        if (sd.wa && String(sd.wa).trim().length >= 8) {
          const nikAyah = _digitsOnly(sd.nik_ayah || (sd.ayah && sd.ayah.nik))
          const namaAyah = _normNama(sd.nama_ayah || (sd.ayah && sd.ayah.nama))
          if (nikAyah || namaAyah) {
            const sib = await db.collection('santri').where('wa', '==', sd.wa).get()
            sib.forEach((d) => {
              const x = d.data()
              if (!x.fcm_token) return
              const xnik = _digitsOnly(x.nik_ayah || (x.ayah && x.ayah.nik))
              const xnama = _normNama(x.nama_ayah || (x.ayah && x.ayah.nama))
              if ((nikAyah && xnik && xnik === nikAyah) || (namaAyah && xnama && xnama === namaAyah)) {
                tokens.add(x.fcm_token)
              }
            })
          }
        }
      }
    } else if (t.type === 'wa' && t.wa && String(t.wa).trim().length >= 8) {
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
    // v.100: teruskan `link` (utk tap->buka halaman) + stringify target (FCM data hanya boleh string,
    //   target event individual berupa objek {type,id} -> kalau tak di-stringify, send GAGAL).
    const _link = String(data.link || '/')
    const _hashLink = '/#' + (_link.startsWith('#') ? _link.slice(1) : _link)
    const message = {
      notification: {
        title: data.judul || 'Mambaul Ulum',
        body: data.pesan || ''
      },
      data: {
        target: typeof data.target === 'string' ? data.target : JSON.stringify(data.target || 'semua'),
        sender: data.sender || 'Admin',
        timestamp: data.timestamp || new Date().toISOString(),
        link: _link
      },
      webpush: {
        notification: {
          icon: '/icon-192.png',
          badge: '/icon-192.png'
        },
        fcmOptions: { link: _hashLink }
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
    // v.100: tagihan yang LAHIR sudah lunas (mis. bayar-di-muka via POS, dibayar di loket) jangan
    //   kirim notif "Tagihan Baru" — wali sudah membayarnya langsung, notif "tagihan baru" menyesatkan.
    if (String(t.status || '').toLowerCase() === 'lunas') return
    const rp = new Intl.NumberFormat('id-ID').format(Number(t.nominal || 0))
    await db.collection('notif_queue').add({
      judul: 'Tagihan Baru',
      pesan: `${t.santri_nama ? t.santri_nama + ' · ' : ''}${t.kategori || 'Tagihan'}${t.periode ? ' · ' + t.periode : ''} · Rp ${rp}`,
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
      pesan: `${after.santri_nama ? after.santri_nama + ' · ' : ''}${after.kategori || 'Pembayaran'} Rp ${rp} sudah diverifikasi. Terima kasih.`,
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
    const _nm = r.santri_nama ? String(r.santri_nama) : 'Ananda'
    await db.collection('notif_queue').add({
      judul: 'Selamat, Naik Tingkat! 🎉',
      pesan: tujuan ? `${_nm} naik ke ${tujuan}.` : `${_nm} telah naik tingkat. Selamat!`,
      target: { type: 'santri', id: String(r.santri_id) },
      link: '/capaian-prestasi',
      sender: 'Pondok',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// v.100: Rekap prestasi baru (notif_prestasi) -> push "tertarget" ke wali.
//   Doc id = np_<santriId>_<YYYY-MM> (1 per santri/bulan) -> onCreate = 1x/bulan, tak spam
//   (re-impor di bulan sama = update, tak memicu push lagi).
exports.onPrestasiCreated = onDocumentCreated(
  { document: 'notif_prestasi/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const p = event.data?.data()
    if (!p || !p.santri_id) return
    const nm = p.santri_nama ? String(p.santri_nama) : 'Ananda'
    const tot = String(p.total || '').trim()
    await db.collection('notif_queue').add({
      judul: 'Prestasi Diperbarui',
      pesan: tot ? `${nm} · nilai prestasi bulan ini: ${tot}` : `${nm} · rekap prestasi bulan ini sudah dinilai.`,
      target: { type: 'santri', id: String(p.santri_id) },
      link: '/capaian-prestasi',
      sender: 'Pondok',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// v.100: Tes Kenaikan Qiraati — ajuan baru (status 'diajukan') -> push ke Kepala/PJ lembaga.
//   kepala_nama di-resolve di app saat ajukan (target type 'guru' by nama).
exports.onTesKenaikanCreated = onDocumentCreated(
  { document: 'tes_kenaikan/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const t = event.data?.data()
    if (!t || t.status !== 'diajukan' || !t.kepala_nama) return // tanpa kepala teridentifikasi -> hanya in-app
    const nm = t.nama_cache ? String(t.nama_cache) : 'Santri'
    await db.collection('notif_queue').add({
      judul: 'Ajuan Tes Kenaikan',
      pesan: `${nm} diajukan tes${t.target ? ' ke ' + t.target : ''}${t.guru_nama ? ' oleh ' + t.guru_nama : ''}.`,
      target: { type: 'guru', nama: String(t.kepala_nama) },
      link: '/tes-kenaikan',
      sender: 'Pondok',
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  }
)

// v.100: Hasil tes diputuskan kepala -> LULUS push Wali + Guru; tidak lulus/ditolak push Guru saja.
//   Guard: hanya saat status berubah & ada `penguji` (skip pembatalan pengaju yg tak set penguji).
exports.onTesKenaikanDecided = onDocumentUpdated(
  { document: 'tes_kenaikan/{id}', region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB' },
  async (event) => {
    const before = event.data?.before?.data() || {}
    const after = event.data?.after?.data() || {}
    if (before.status === after.status || !after.penguji) return // tak berubah / batal pengaju -> skip
    const nm = after.nama_cache ? String(after.nama_cache) : 'Ananda'
    const tgt = after.target || 'tingkat berikutnya'
    if (after.status === 'lulus') {
      if (after.santri_id) {
        await db.collection('notif_queue').add({
          judul: 'Lulus Tes Kenaikan! 🎉',
          pesan: `${nm} dinyatakan LULUS dan siap naik ke ${tgt}.`,
          target: { type: 'santri', id: String(after.santri_id) },
          link: '/capaian-prestasi',
          sender: 'Pondok', status: 'pending', timestamp: new Date().toISOString()
        })
      }
      if (after.guru_nama) {
        await db.collection('notif_queue').add({
          judul: 'Hasil Tes: Lulus',
          pesan: `${nm} LULUS — siap naik ke ${tgt}.`,
          target: { type: 'guru', nama: String(after.guru_nama) },
          link: '/tes-kenaikan',
          sender: 'Pondok', status: 'pending', timestamp: new Date().toISOString()
        })
      }
    } else if ((after.status === 'tidak_lulus' || after.status === 'ditolak') && after.guru_nama) {
      const lbl = after.status === 'tidak_lulus' ? 'Belum lulus' : 'Ditolak'
      await db.collection('notif_queue').add({
        judul: `Hasil Tes: ${lbl}`,
        pesan: `${nm} → ${lbl}${after.catatan_hasil ? ' · ' + after.catatan_hasil : ''}.`,
        target: { type: 'guru', nama: String(after.guru_nama) },
        link: '/tes-kenaikan',
        sender: 'Pondok', status: 'pending', timestamp: new Date().toISOString()
      })
    }
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

// ====================================================================
// FUNCTION 6 (v.97.0626): BMT PETA — WEBHOOK KONFIRMASI PEMBAYARAN VA (santri)
//   STUB/KERANGKA — AMAN DIDEPLOY. Default DRY-RUN: TIDAK menulis Firestore sampai
//     (a) settings/general.bmt_webhook_enabled === true, DAN
//     (b) secret BMT_WEBHOOK_SECRET sudah di-set.
//   Saat ENABLED: catat pembayaran ke keuangan_buku_induk + alokasikan ke tagihan santri,
//   IDEMPOTEN via bmt_trx_id (1 transaksi diproses sekali).
//   Format payload & autentikasi FINAL MENGIKUTI SPEC BMT — lihat bagian bertanda TODO(BMT).
//
// SETUP & DEPLOY:
//   firebase functions:secrets:set BMT_WEBHOOK_SECRET   (paste secret saat prompt)
//   firebase deploy --only functions:bmtPaymentWebhook
// URL endpoint (berikan ke BMT):
//   https://asia-southeast2-<projectId>.cloudfunctions.net/bmtPaymentWebhook
// ====================================================================
const bmtWebhookSecret = defineSecret('BMT_WEBHOOK_SECRET')

function _digitsOnly(s) { return String(s || '').replace(/\D/g, '') }

exports.bmtPaymentWebhook = onRequest(
  { region: 'asia-southeast2', timeoutSeconds: 60, memory: '256MiB', cors: false, secrets: [bmtWebhookSecret] },
  async (req, res) => {
    try {
      if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'POST only' }); return }

      // 1) AUTENTIKASI — verifikasi secret/tanda tangan dari BMT.
      //    TODO(BMT): ganti ke skema final BMT (HMAC signature + timestamp, IP allowlist, dll).
      const secret = (bmtWebhookSecret.value && bmtWebhookSecret.value()) || ''
      const provided = String(req.get('x-bmt-signature') || req.get('authorization') || '').replace(/^Bearer\s+/i, '')
      if (!secret) { res.status(503).json({ ok: false, error: 'webhook belum dikonfigurasi (secret kosong)' }); return }
      if (!provided || provided !== secret) { res.status(401).json({ ok: false, error: 'unauthorized' }); return }

      // 2) PARSE payload — TODO(BMT): sesuaikan nama field dgn spesifikasi BMT.
      const b = req.body || {}
      const vaNumber = _digitsOnly(b.va_number || b.virtual_account || b.va)
      const amount = Number(b.amount || b.nominal || 0)
      const bmtTrxId = String(b.bmt_trx_id || b.trx_id || b.reference_id || '')
      const paidAt = String(b.paid_at || b.payment_time || new Date().toISOString())
      const channel = String(b.channel || b.payment_channel || 'bmt')
      if (!vaNumber || !(amount > 0) || !bmtTrxId) {
        res.status(400).json({ ok: false, error: 'payload tidak lengkap (butuh va_number, amount, bmt_trx_id)' }); return
      }

      // 3) Settings + kill-switch (DRY-RUN default).
      let s = {}
      try { const sd = await db.collection('settings').doc('general').get(); if (sd.exists) s = sd.data() || {} } catch (e) { /* default */ }
      const enabled = s.bmt_webhook_enabled === true
      const prefix = _digitsOnly(s.bmt_va_prefix)

      // 4) Resolusi santri dari VA: cocokkan field va_bmt, lalu fallback strip-prefix -> nis.
      let santri = null
      try {
        let q = await db.collection('santri').where('va_bmt', '==', vaNumber).limit(1).get()
        if (q.empty && prefix && vaNumber.startsWith(prefix)) {
          const nis = vaNumber.slice(prefix.length)
          q = await db.collection('santri').where('nis', '==', nis).limit(1).get()
        }
        if (!q.empty) santri = { id: q.docs[0].id, ...q.docs[0].data() }
      } catch (e) { logger.warn('[bmtWebhook] resolve santri:', e?.message || e) }

      // 5) DRY-RUN: kalau belum enabled, jangan tulis apa pun — cuma log & ack (utk uji koneksi BMT).
      if (!enabled) {
        logger.info(`[bmtWebhook] DRY-RUN va=${vaNumber} amount=${amount} trx=${bmtTrxId} santri=${santri ? santri.id : '?'}`)
        res.json({ ok: true, mode: 'dry-run', resolved_santri: santri ? (santri.nama || santri.id) : null, note: 'set settings.bmt_webhook_enabled=true utk aktifkan pencatatan' }); return
      }

      // 6) IDEMPOTEN: 1 bmt_trx_id diproses sekali.
      const logRef = db.collection('bmt_payment_log').doc(bmtTrxId)
      if ((await logRef.get()).exists) { res.json({ ok: true, duplicate: true }); return }

      if (!santri) {
        await logRef.set({ status: 'unmatched', va_number: vaNumber, amount, paid_at: paidAt, channel, created_at: FieldValue.serverTimestamp() })
        res.status(202).json({ ok: true, matched: false, note: 'VA tak cocok santri — dicatat sbg unmatched utk ditinjau admin' }); return
      }

      // 7) Catat kas masuk (buku induk) + alokasi ke tagihan belum lunas (tertua dulu).
      //    TODO(BMT/kyai): konfirmasi aturan alokasi & nilai status final ('lunas'/'sebagian').
      const tgl = String(paidAt).slice(0, 10)
      const biId = `bmtva_${bmtTrxId}`
      const batch = db.batch()
      batch.set(db.collection('keuangan_buku_induk').doc(biId), {
        id: biId, tipe: 'masuk', keterangan: `Pembayaran VA — ${santri.nama || santri.id} — ${channel}`,
        nominal: amount, tanggal: tgl, sumber: 'bmt_va', santri_id: String(santri.id),
        bmt_trx_id: bmtTrxId, created_at: FieldValue.serverTimestamp()
      })
      let sisa = amount
      try {
        const tq = await db.collection('keuangan_tagihan').where('santri_id', '==', String(santri.id)).get()
        const belum = tq.docs.map((d) => ({ id: d.id, ...d.data() }))
          .filter((t) => String(t.status || 'belum') !== 'lunas')
          .sort((a, b) => String(a.jatuh_tempo || '').localeCompare(String(b.jatuh_tempo || '')))
        for (const t of belum) {
          if (sisa <= 0) break
          const kurang = Number(t.nominal || 0) - Number(t.bayar || 0)
          if (kurang <= 0) continue
          const bayar = Math.min(sisa, kurang)
          const nb = Number(t.bayar || 0) + bayar
          batch.update(db.collection('keuangan_tagihan').doc(t.id), {
            bayar: nb, status: nb >= Number(t.nominal || 0) ? 'lunas' : 'sebagian',
            sumber_bayar: 'bmt_va', updated_at: FieldValue.serverTimestamp()
          })
          sisa -= bayar
        }
      } catch (e) { logger.warn('[bmtWebhook] alokasi tagihan:', e?.message || e) }

      batch.set(logRef, {
        status: 'processed', va_number: vaNumber, amount, sisa_tak_teralokasi: sisa,
        santri_id: String(santri.id), bmt_trx_id: bmtTrxId, paid_at: paidAt, channel,
        created_at: FieldValue.serverTimestamp()
      })
      await batch.commit()

      try {
        await db.collection('notif_queue').add({
          judul: 'Pembayaran Diterima',
          pesan: `Pembayaran Rp ${new Intl.NumberFormat('id-ID').format(amount)} via VA sudah diterima. Terima kasih.`,
          target: { type: 'santri', id: String(santri.id) }, link: '/tagihan',
          sender: 'Sistem', status: 'pending', timestamp: new Date().toISOString()
        })
      } catch (e) { /* notif best-effort */ }

      logger.info(`[bmtWebhook] processed trx=${bmtTrxId} santri=${santri.id} amount=${amount} sisa=${sisa}`)
      res.json({ ok: true, processed: true, santri: santri.nama || santri.id, allocated: amount - sisa, unallocated: sisa })
    } catch (e) {
      logger.error('[bmtWebhook] error', e)
      res.status(500).json({ ok: false, error: String((e && e.message) || e) })
    }
  }
)

// ====================================================================
// FUNCTION 7 (v.97.0626): BMT PETA — PENCAIRAN BISYAROH (disbursement, pondok -> guru)
//   STUB/KERANGKA Model B — AMAN. Default DRY-RUN: TIDAK memerintahkan transfer & TIDAK
//   menulis Firestore sampai (a) settings/general.bmt_disburse_enabled === true DAN
//   (b) secret BMT_DISBURSE_SECRET di-set. Bahkan saat enabled, fungsi TIDAK pernah mengaku
//   sukses sebelum API BMT benar2 disambung (lihat TODO(BMT)) — jadi tak akan mencatat
//   pencairan yang tak terjadi.
//   Body: { periode, items:[{ slip_id, guru_id, rek_bmt, nominal }] }.
//   Idempoten via bmt_disburse_log/<slip_id>. FALLBACK (Model A) = konfirmasi manual di
//   UI BisyarohView (admin transfer sendiri di BMT) — fungsi ini tak dipakai pada Model A.
//
// SETUP & DEPLOY:
//   firebase functions:secrets:set BMT_DISBURSE_SECRET
//   firebase deploy --only functions:bmtDisbursementBatch
// ====================================================================
const bmtDisburseSecret = defineSecret('BMT_DISBURSE_SECRET')

exports.bmtDisbursementBatch = onRequest(
  { region: 'asia-southeast2', timeoutSeconds: 120, memory: '256MiB', cors: false, secrets: [bmtDisburseSecret] },
  async (req, res) => {
    try {
      if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'POST only' }); return }

      // 1) AUTENTIKASI pemanggil. TODO: ganti ke verifikasi sesi admin yang kuat.
      const secret = (bmtDisburseSecret.value && bmtDisburseSecret.value()) || ''
      const provided = String(req.get('authorization') || '').replace(/^Bearer\s+/i, '')
      if (!secret) { res.status(503).json({ ok: false, error: 'disbursement belum dikonfigurasi (secret kosong)' }); return }
      if (!provided || provided !== secret) { res.status(401).json({ ok: false, error: 'unauthorized' }); return }

      // 2) PARSE daftar pencairan.
      const items = Array.isArray(req.body && req.body.items) ? req.body.items : []
      const periode = String((req.body && req.body.periode) || '')
      if (items.length === 0) { res.status(400).json({ ok: false, error: 'items kosong' }); return }
      const norm = items.map((it) => ({
        slip_id: String(it.slip_id || ''),
        guru_id: it.guru_id != null ? it.guru_id : '',
        rek_bmt: String(it.rek_bmt || '').replace(/\s+/g, ''),
        nominal: Number(it.nominal || 0)
      }))
      const invalid = norm.filter((it) => !it.slip_id || !it.rek_bmt || !(it.nominal > 0))

      // 3) Settings + kill-switch (DRY-RUN default).
      let s = {}
      try { const sd = await db.collection('settings').doc('general').get(); if (sd.exists) s = sd.data() || {} } catch (e) { /* default */ }
      const enabled = s.bmt_disburse_enabled === true

      // 4) DRY-RUN: validasi & rencana saja, tanpa transfer/tulis.
      if (!enabled) {
        const total = norm.reduce((a, it) => a + (it.nominal > 0 ? it.nominal : 0), 0)
        logger.info(`[bmtDisburse] DRY-RUN periode=${periode} items=${norm.length} invalid=${invalid.length} total=${total}`)
        res.json({ ok: true, mode: 'dry-run', count: norm.length, invalid: invalid.length, total, note: 'set settings.bmt_disburse_enabled=true + sambungkan API BMT utk eksekusi nyata' }); return
      }
      if (invalid.length > 0) { res.status(400).json({ ok: false, error: 'ada item tak valid (slip_id/rek_bmt/nominal)', invalid }); return }

      // 5) EKSEKUSI per item (idempoten via bmt_disburse_log/<slip_id>).
      const results = []
      for (const it of norm) {
        const logRef = db.collection('bmt_disburse_log').doc(it.slip_id)
        if ((await logRef.get()).exists) { results.push({ slip_id: it.slip_id, status: 'duplicate' }); continue }

        // --- TODO(BMT): panggil API disbursement BMT (pondok rek -> it.rek_bmt, it.nominal) ---
        //   const bmtResp = await callBmtDisbursementApi(it)  // implementasi mengikuti spec BMT
        //   const sukses = !!bmtResp.success; const trxId = String(bmtResp.trx_id || '')
        // Selama API belum tersambung, JANGAN mengaku sukses (cegah pencatatan pencairan palsu):
        const sukses = false
        const trxId = ''

        if (!sukses) { results.push({ slip_id: it.slip_id, status: 'pending_api', note: 'API BMT belum terhubung' }); continue }

        // (Saat API tersedia) catat kas keluar + tandai slip + log idempoten.
        const tgl = new Date().toISOString().slice(0, 10)
        const biId = `gaji_${it.slip_id}`
        const batch = db.batch()
        batch.set(db.collection('keuangan_buku_induk').doc(biId), {
          id: biId, tipe: 'keluar', nominal: it.nominal, tanggal: tgl,
          keterangan: `Bisyaroh ${periode} — guru ${it.guru_id}`, sumber: 'gaji', kategori: 'Bisyaroh',
          guru_id: it.guru_id, slip_id: it.slip_id, metode: 'bmt_api', bmt_trx_id: trxId, created_at: FieldValue.serverTimestamp()
        })
        batch.set(db.collection('keuangan_gaji').doc(it.slip_id), {
          status_cair: 'cair', dicairkan_at: FieldValue.serverTimestamp(), dicairkan_via: 'bmt_api', bmt_trx_id: trxId, buku_induk_id: biId
        }, { merge: true })
        batch.set(logRef, { status: 'processed', slip_id: it.slip_id, guru_id: it.guru_id, nominal: it.nominal, bmt_trx_id: trxId, created_at: FieldValue.serverTimestamp() })
        await batch.commit()
        results.push({ slip_id: it.slip_id, status: 'processed', bmt_trx_id: trxId })
      }

      res.json({ ok: true, processed: results.filter((r) => r.status === 'processed').length, results })
    } catch (e) {
      logger.error('[bmtDisburse] error', e)
      res.status(500).json({ ok: false, error: String((e && e.message) || e) })
    }
  }
)
