# Setup Operations Guide — 3 Pending Action

**Untuk Kyai**. Total estimasi: ~30 menit.

---

## 1️⃣ Iframely API Key (Link Preview Thumbnail)

**Apa yang fix:** Beranda post yang berisi link (mis. share artikel) — sekarang link preview thumbnail/title/description **TIDAK MUNCUL**. Setelah setup, link auto-render preview card cantik.

### Step-by-step

**A. Daftar Iframely (free 1000 req/month, no credit card):**
1. Buka https://iframely.com/
2. Klik **Sign Up** → email/Google
3. Dashboard → Settings → **API Keys**
4. Copy API key (format: `abc123def456...`)

**B. Save secret ke Firebase Secret Manager:**

```powershell
cd "D:\Aplikasi Project\Portal MU"
firebase functions:secrets:set IFRAMELY_KEY
```

Akan prompt — paste API key dari step A → Enter.

Output sukses:
```
+  Created a new secret version projects/<id>/secrets/IFRAMELY_KEY/versions/1
```

**C. Deploy ulang Cloud Function:**

```powershell
firebase deploy --only functions:getLinkPreview --token "$env:FIREBASE_CI_TOKEN"
```

Atau pakai script gabungan kalau ada (cek `package.json` scripts):
```powershell
npm run firebase:deploy:functions
```

**D. Verify:**
1. Buka Firebase Console → Functions → `getLinkPreview` → cek "Latest deployment" version baru
2. Test di app: Buat post beranda dengan link → preview muncul

---

## 2️⃣ cleanupAuditLog Cloud Function Deploy

**Apa yang fix:** `audit_log` collection di Firestore terus bertambah tanpa batas. Function ini auto-hapus record >30 hari setiap hari jam 02:00 WIB. Prevent Firestore bloat + biaya.

### Step-by-step

**A. Verify code sudah ada:**
File `functions/index.js` line 411 — `exports.cleanupAuditLog = onSchedule(...)`. Sudah merged commit lama.

**B. Deploy:**

```powershell
cd "D:\Aplikasi Project\Portal MU"
firebase deploy --only functions:cleanupAuditLog --token "$env:FIREBASE_CI_TOKEN"
```

Output sukses:
```
+  functions[asia-southeast2-cleanupAuditLog]: Successful create operation.
+  scheduler-jobs[firebase-schedule-cleanupAuditLog-asia-southeast2] created.
```

**C. Verify schedule:**
1. Firebase Console → Functions → `cleanupAuditLog`
2. Tab **Trigger** → harus muncul "Cloud Scheduler" job dengan cron `0 2 * * *` (jam 02:00 WIB tiap hari)
3. Atau Google Cloud Console → Cloud Scheduler → cari `firebase-schedule-cleanupAuditLog`

**D. (Optional) Test manual trigger:**
```powershell
# Trigger function manual via gcloud CLI (kalau pengen test tanpa nunggu jam 02:00)
gcloud scheduler jobs run firebase-schedule-cleanupAuditLog-asia-southeast2 --location=asia-southeast2
```

---

## 3️⃣ Sentry DSN Replace (Error Tracking)

**Apa yang fix:** Sekarang `SENTRY_DSN = "PLACEHOLDER_DSN_KYAI_REPLACE"` — Sentry silent skip. Setelah replace, semua JS error production akan ter-log ke Sentry dashboard → Kyai bisa monitor + auto-alert.

### Step-by-step

**A. Buat akun Sentry (free tier 5k events/month):**
1. Buka https://sentry.io/signup/
2. Sign up email/Google
3. Saat onboarding, pilih:
   - Platform: **JavaScript** (vanilla, not React)
   - Project name: `portal-mu` atau `ammu-online`
4. Sentry akan kasih DSN format: `https://abc123@o123456.ingest.sentry.io/789012`

**B. Copy DSN, paste ke index.html:**

Kyai modify `public/index.html` line 16311 manual via VS Code:

```js
// Find:
const SENTRY_DSN = "PLACEHOLDER_DSN_KYAI_REPLACE";

// Replace dengan:
const SENTRY_DSN = "https://abc123@o123456.ingest.sentry.io/789012";  // ← DSN real Kyai
```

**C. Atau lewat saya (agent) — kasih DSN ke chat, saya patch + auto-deploy:**

Kalau Kyai mau lebih cepat:
1. Kasih DSN ke saya di chat
2. Saya patch index.html + bump version + commit + push + deploy via auto-deploy.ps1
3. Done in 3 menit

⚠️ **Catatan keamanan:** Sentry DSN BUKAN secret (publik OK, beda dengan API key). Boleh hardcode di client JS, boleh push ke GitHub. Worst case kalau di-abuse: orang lain bisa kirim event ke Sentry project Kyai (rate limit melindungi).

**D. Verify:**
1. Deploy v.109.13 (kalau pakai opsi C)
2. Open app di browser
3. DevTools Console → trigger error manual: `Sentry.captureMessage('test from Kyai')`
4. Sentry Dashboard → Issues → muncul "test from Kyai" event

---

## 📋 Setup Order Recommendation

| Urutan | Setup | Waktu | Dependency |
|---|---|---|---|
| 1 | Iframely API key | 10 menit | Firebase CLI (sudah) |
| 2 | cleanupAuditLog deploy | 5 menit | Iframely deploy berhasil dulu |
| 3 | Sentry DSN replace | 10 menit | Independent — bisa dilakukan kapan saja |

Total: ~25 menit.

---

## 🛠️ Quick Command Reference

```powershell
# Sebelum mulai: pastikan di project root + firebase token loaded
cd "D:\Aplikasi Project\Portal MU"
$env:FIREBASE_CI_TOKEN = (Get-Content .\.agent-credentials.env | Select-String "FIREBASE_CI_TOKEN").ToString().Split("=")[1]

# 1. Set Iframely secret
firebase functions:secrets:set IFRAMELY_KEY
# (paste API key saat prompt)

# 2. Deploy getLinkPreview function
firebase deploy --only functions:getLinkPreview --token $env:FIREBASE_CI_TOKEN

# 3. Deploy cleanupAuditLog function
firebase deploy --only functions:cleanupAuditLog --token $env:FIREBASE_CI_TOKEN

# 4. Sentry DSN — paste DSN ke chat (saya patch + auto-deploy) atau edit manual di line 16311 index.html
```

---

## ⚠️ Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `Permission denied: secrets.versions.add` | Kyai login firebase belum cukup permission | `firebase login` ulang dengan akun owner project |
| `Cloud Scheduler API not enabled` | scheduler API belum aktif di GCP project | Buka GCP Console → Enable "Cloud Scheduler API" |
| `Function deploy timeout` | Network slow | Retry deploy, biasanya works run kedua |
| `Sentry events tidak muncul` | DSN salah copy atau ad-blocker block sentry-cdn | Test di incognito + disable ad-blocker |

---

🌙 Setelah 3 setup selesai, Portal MU operations matured:
- Link preview cantik di beranda post
- Audit log auto-cleanup (Firestore size terkontrol)
- Production error tracking (auto-alert ke Sentry dashboard)
