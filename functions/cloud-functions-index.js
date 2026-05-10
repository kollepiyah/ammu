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
//    "firebase-admin": "^13.0.0",
//    "firebase-functions": "^7.0.0",
//    "cheerio": "^1.0.0"
//    
//    JALANKAN:
//    cd functions
//    npm install cheerio
//    cd ..
// 6. Deploy: firebase deploy --only functions
//
// CATATAN:
// - Firebase wajib pakai Blaze (pay-as-you-go) plan untuk Cloud Functions
// - Free quota: 2 juta invocations/bulan, 400.000 GB-detik (cukup besar)
// ====================================================================

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

initializeApp();
const messaging = getMessaging();
const db = getFirestore();

// ====================================================================
// FUNCTION 1: NOTIFICATION DISPATCHER
// Trigger: setiap document baru di 'notif_queue'
// ====================================================================
exports.kirimNotifikasiMassal = onDocumentCreated(
    {
        document: "notif_queue/{notifId}",
        region: "asia-southeast2", // Jakarta region
        timeoutSeconds: 60,
        memory: "256MiB"
    },
    async (event) => {
        const snap = event.data;
        if (!snap) return;
        const data = snap.data();
        const notifId = event.params.notifId;
        
        if (data.status === 'sent') {
            logger.info(`Notif ${notifId} already sent, skipping.`);
            return;
        }
        
        const tokens = data.tokens || [];
        if (tokens.length === 0) {
            await snap.ref.update({ status: 'failed', error: 'No tokens' });
            return;
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
                    badge: '/icon-72.png'
                },
                fcmOptions: { link: '/' }
            }
        };
        
        // Kirim batch (FCM batas 500 token per batch)
        let sukses = 0, gagal = 0;
        const tokenInvalid = [];
        for (let i = 0; i < tokens.length; i += 500) {
            const batch = tokens.slice(i, i + 500);
            try {
                const resp = await messaging.sendEachForMulticast({
                    ...message,
                    tokens: batch
                });
                sukses += resp.successCount;
                gagal += resp.failureCount;
                resp.responses.forEach((r, idx) => {
                    if (!r.success) {
                        const err = r.error;
                        if (err && (err.code === 'messaging/invalid-registration-token' ||
                                   err.code === 'messaging/registration-token-not-registered')) {
                            tokenInvalid.push(batch[idx]);
                        }
                    }
                });
            } catch (e) {
                logger.error(`Batch error:`, e);
                gagal += batch.length;
            }
        }
        
        // Hapus token invalid dari user
        if (tokenInvalid.length > 0) {
            try {
                const guruSnap = await db.collection('guru').where('fcm_token', 'in', tokenInvalid.slice(0, 30)).get();
                guruSnap.forEach(doc => doc.ref.update({ fcm_token: null }));
                const santriSnap = await db.collection('santri').where('fcm_token', 'in', tokenInvalid.slice(0, 30)).get();
                santriSnap.forEach(doc => doc.ref.update({ fcm_token: null }));
            } catch(e) { logger.warn('Cleanup invalid tokens:', e); }
        }
        
        // Update status notifikasi
        await snap.ref.update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            sukses_count: sukses,
            gagal_count: gagal,
            invalid_tokens_removed: tokenInvalid.length
        });
        
        logger.info(`Notif ${notifId}: ${sukses} sukses, ${gagal} gagal`);
    }
);

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
const cheerio = require('cheerio');
// node-fetch DIHAPUS — Node 18+ sudah punya native fetch built-in
// (Node 24 di Cloud Functions Firebase pasti ada native fetch)

exports.getLinkPreview = onRequest(
    {
        region: "us-central1", // sesuai default Firebase Functions
        timeoutSeconds: 30,
        memory: "256MiB",
        cors: true // izinkan request dari semua origin
    },
    async (req, res) => {
        // Set CORS headers eksplisit (untuk safety)
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
            return res.status(204).send('');
        }
        
        const targetUrl = req.query.url;
        if (!targetUrl) {
            return res.status(400).json({ error: 'Missing ?url= parameter' });
        }
        
        // Validasi URL
        let parsed;
        try {
            parsed = new URL(targetUrl);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                return res.status(400).json({ error: 'Only http/https URLs allowed' });
            }
        } catch (e) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        
        // Cache key (hash dari URL)
        const cacheKey = Buffer.from(targetUrl).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 100);
        
        // Cek cache Firestore (TTL 7 hari)
        try {
            const cacheDoc = await db.collection('link_preview_cache').doc(cacheKey).get();
            if (cacheDoc.exists) {
                const cached = cacheDoc.data();
                const cachedAt = new Date(cached.cached_at).getTime();
                const ageMs = Date.now() - cachedAt;
                const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari
                if (ageMs < TTL_MS) {
                    logger.info(`Cache HIT: ${targetUrl}`);
                    return res.json(cached.data);
                }
            }
        } catch (e) { logger.warn('Cache read error:', e.message); }
        
        // Fetch HTML
        let html;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 12000); // 12 detik
            const r = await fetch(targetUrl, {
                redirect: 'follow',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MambaulUlumBot/1.0; +https://almanshur.id)',
                    'Accept': 'text/html,application/xhtml+xml',
                    'Accept-Language': 'id,en;q=0.5'
                }
            });
            clearTimeout(timeout);
            if (!r.ok) {
                return res.status(502).json({ error: `Target returned ${r.status}` });
            }
            const ct = r.headers.get('content-type') || '';
            if (!ct.includes('text/html')) {
                return res.status(415).json({ error: 'Target is not HTML' });
            }
            // Limit size: max 5 MB. Kalau lebih, truncate ke 1MB pertama (cukup untuk meta tag)
            const buf = await r.buffer();
            if (buf.length > 5 * 1024 * 1024) {
                // Truncate, tetap proses bagian awal (meta tag biasanya di <head> = depan)
                html = buf.slice(0, 1024 * 1024).toString('utf8');
                logger.warn(`HTML truncated from ${buf.length} bytes to 1MB for: ${targetUrl}`);
            } else {
                html = buf.toString('utf8');
            }
        } catch (e) {
            logger.error('Fetch error:', e.message);
            return res.status(504).json({ error: 'Fetch timeout or error: ' + e.message });
        }
        
        // Parse Open Graph + standard meta tags
        let result = { url: targetUrl };
        try {
            const $ = cheerio.load(html);
            
            const getMeta = (selectors) => {
                for (const sel of selectors) {
                    const v = $(sel).attr('content') || $(sel).attr('value');
                    if (v && v.trim()) return v.trim();
                }
                return '';
            };
            
            result.title = getMeta([
                'meta[property="og:title"]',
                'meta[name="twitter:title"]',
                'meta[itemprop="name"]'
            ]) || $('title').first().text().trim() || parsed.hostname;
            
            result.description = getMeta([
                'meta[property="og:description"]',
                'meta[name="twitter:description"]',
                'meta[name="description"]'
            ]).substring(0, 280);
            
            let imgRaw = getMeta([
                'meta[property="og:image"]',
                'meta[property="og:image:url"]',
                'meta[name="twitter:image"]',
                'meta[name="twitter:image:src"]',
                'meta[itemprop="image"]'
            ]);
            
            // Resolve relative image URL
            if (imgRaw) {
                try {
                    result.image = new URL(imgRaw, targetUrl).href;
                } catch (e) {
                    result.image = imgRaw;
                }
            } else {
                result.image = '';
            }
            
            result.siteName = getMeta([
                'meta[property="og:site_name"]',
                'meta[name="application-name"]'
            ]) || parsed.hostname;
            
            // Truncate long titles
            if (result.title.length > 200) result.title = result.title.substring(0, 200) + '...';
            
        } catch (e) {
            logger.error('Parse error:', e.message);
            result.title = parsed.hostname;
            result.description = '';
            result.image = '';
            result.siteName = parsed.hostname;
        }
        
        // Cache result (7 hari)
        try {
            await db.collection('link_preview_cache').doc(cacheKey).set({
                url: targetUrl,
                data: result,
                cached_at: new Date().toISOString()
            });
        } catch (e) { logger.warn('Cache write error:', e.message); }
        
        logger.info(`Cache MISS, fetched: ${targetUrl}`);
        return res.json(result);
    }
);

// ====================================================================
// FUNCTION 3: AUTO-CLEANUP AUDIT_LOG (jadwal harian)
// Hapus record audit_log lebih dari 90 hari untuk cegah collection bloat
// ====================================================================
exports.cleanupAuditLog = onSchedule(
    {
        schedule: "every day 02:00",   // jam 2 pagi setiap hari
        timeZone: "Asia/Jakarta",
        region: "asia-southeast2",
        timeoutSeconds: 540,            // max 9 menit
        memory: "256MiB"
    },
    async (event) => {
        const RETENSI_HARI = 90;
        const cutoffISO = new Date(Date.now() - RETENSI_HARI * 24 * 60 * 60 * 1000).toISOString();
        logger.info(`[cleanupAuditLog] Hapus audit_log < ${cutoffISO}`);
        
        let totalDeleted = 0;
        let hasMore = true;
        
        // Loop batch sampai habis (max 500 per batch Firestore)
        while (hasMore) {
            const snap = await db.collection('audit_log')
                .where('timestamp', '<', cutoffISO)
                .limit(450)
                .get();
            if (snap.empty) { hasMore = false; break; }
            
            const batch = db.batch();
            snap.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            totalDeleted += snap.size;
            logger.info(`[cleanupAuditLog] Batch hapus ${snap.size} record (total: ${totalDeleted})`);
            
            if (snap.size < 450) hasMore = false;
        }
        
        logger.info(`[cleanupAuditLog] SELESAI. Total ${totalDeleted} record dihapus (>${RETENSI_HARI} hari).`);
        return null;
    }
);

// ====================================================================
// CATATAN INSTALASI FUNCTION 3:
// 
// 1. Pastikan Firebase plan = Blaze (Cloud Scheduler butuh Blaze)
// 2. Update firestore.rules: ubah audit_log delete rule jadi:
//    allow delete: if false; // tetap false; CF pakai admin SDK yang bypass rules
//    (admin SDK selalu bypass security rules, jadi CF tetap bisa delete)
// 3. Deploy: firebase deploy --only functions:cleanupAuditLog
// 4. Cek di Firebase Console → Cloud Scheduler:
//    Job "firebase-schedule-cleanupAuditLog-asia-southeast2" akan run jam 02:00 WIB
// 5. Untuk test manual: di Console Cloud Scheduler, klik "RUN NOW" pada job
// 6. Atau ubah schedule sementara ke "every 5 minutes" untuk uji cepat
//
// Untuk ubah retensi (default 90 hari), ubah konstanta RETENSI_HARI di atas.
// ====================================================================
