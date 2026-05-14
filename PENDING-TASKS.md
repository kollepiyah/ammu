# PENDING TASKS — Sorted by UI + Fungsi Priority (Kyai Request)

**Tanggal:** 14 Mei 2026
**Sesi commits:** 24 (semua belum di-push, sesuai permintaan Kyai)
**Latest:** `13c7c7a` — DOM toast definitive + login bg preload

---

## 🎨 PRIORITAS 1 — UI & UX (User Visible)

### P1.1 🔴 Verify toast benar-benar hilang otomatis (post v.108.65 DOM impl)
- **Sebab:** Kyai feedback v3 — "toast masih belum hilang otomatis, kamu kurang teliti"
- **Fix terakhir:** v.108.65 replace Swal toast dengan **pure DOM** (immune dari Swal pause)
- **Test:** trigger toast (mis. simpan profil) → tunggu 3 detik → harus hilang. Hover toast → tetap hilang (no freeze).
- **Action Kyai:** smoke test setelah deploy. Kalau masih freeze, kasih saya screenshot + jenis toast.

### P1.2 🟠 Login page bg-pesantren loading
- **Status fix:** v.108.65 — preload `<link rel="preload">` di head, fallback color teal-900, blur 10px → 4px
- **Test:** logout → reload → login screen bg-pesantren langsung muncul (no white bocor)
- **Kalau masih bocor:** kemungkinan CDN/Firebase Hosting cache. Cek Network tab DevTools — bg-pesantren.jpg response time.

### P1.3 🟠 Nama otomatis di TTD rapor
- **Status:** Helper `findTTDGuruByNama()` sudah ada di L33617. Tapi mungkin `guru.ttd_b64` kosong di Firestore.
- **Test Kyai:** edit profil guru → upload TTD PNG → simpan → reload → buka rapor santri → TTD harus tampil di section guru kelas.
- **Kalau tidak tampil:** kasih saya screenshot section rapor + nama guru (saya bisa trace lookup).

### P1.4 🟡 3 UI button ekspor PDF tersisa
- **Sudah ada:** 5 wrapper functions exposed (`eksporPDFKartuKenaikan`, `eksporPDFRaporSantriIni`, `eksporPDFSlipGajiById`, `eksporPDFLaporanTunggakan`, `eksporPDFBuktiTabungan`)
- **Sudah di UI:** 2 button (Kartu Kenaikan + Rapor Santri)
- **Belum di UI:** 3 button (Slip Gaji, Tunggakan, Bukti Tabungan)
- **Action Kyai:** kasih screenshot lokasi tombol Cetak yang ingin di-partner Ekspor PDF.

### P1.5 🟡 Modal style full migration ke `.mu-modal-card` utility class
- **Status:** 10 modal accent border-biru sudah di-migrate ke teal (commit `f73a206`). Tapi 34 custom HTML modal belum konsisten dengan style Swal modal.
- **Effort:** ~1-2 jam untuk migrate full
- **Decision Kyai:** Mau dilakukan? Atau cukup yang sudah?

### P1.6 🟢 Loading skeleton screen
- **Status:** Kebanyakan loading pakai global spinner. Modern UX rekomen skeleton screen.
- **Effort:** 2-3 jam untuk top 3 list view (Data Santri, Data Guru, Riwayat).

### P1.7 🟢 Empty state design system
- **Status:** Empty state pakai `fa-inbox` generic. Bisa pakai illustration brand-specific.
- **Effort:** 1 jam.

---

## ⚙️ PRIORITAS 2 — FUNGSI (Functional Bug & Feature)

### P2.1 🔴 Verifikasi Storage Rules deployed
- **Status:** v.108.53 storage.rules tightening sudah commit (`0051c9a`). **BELUM DI-DEPLOY**.
- **Action Kyai:** `firebase deploy --only storage`. Lalu smoke test: anonymous DevTools coba delete file → must `permission-denied`.

### P2.2 🟠 Cloud Function `cleanupAuditLog` (audit log bloat prevention)
- **Status:** Function code ada di `functions/cloud-functions-index.js` (LEGACY DUPLICATE), TAPI TIDAK ADA di `functions/index.js` (current deploy).
- **`audit_log` collection** dipakai 28x di app → akan bloat tanpa cleanup.
- **3 opsi:**
  - **A (recommended):** Merge `cleanupAuditLog` ke `functions/index.js`, re-deploy
  - **B:** Drop feature, pakai Firestore TTL policy
  - **C:** Verify deployed status di Firebase Console
- **Effort A:** 30 menit (saya bisa kerjakan kalau Kyai pilih A).

### P2.3 🟠 getLinkPreview thumbnail (link preview)
- **Status:** Root cause — social media URL butuh Iframely API key.
- **Action Kyai:**
  ```bash
  # 1. Daftar di iframely.com (free 1000/month)
  firebase functions:secrets:set IFRAMELY_KEY
  # 2. Re-deploy
  firebase deploy --only functions:getLinkPreview
  ```

### P2.4 🟡 Concurrent edit handling
- **Risk:** Kalau 2 admin edit santri sama bersamaan, last-write-wins (silent overwrite).
- **Fix:** Pakai Firestore transaction + version field. Effort: 2-3 jam per critical entity.
- **Decision Kyai:** Implement now atau defer?

### P2.5 🟡 Image upload retry
- **Risk:** Firebase Storage timeout → user lose progress.
- **Fix:** Add retry logic dengan exponential backoff di `uploadImgKeStorage`.
- **Effort:** 1 jam.

### P2.6 🟢 Filter performance (search 1000+ records)
- **Risk:** `db_santri.filter` setiap keystroke → UI lag.
- **Fix:** Debounce input (300ms) + virtual scroll. Effort: 2 jam.

---

## 🔐 PRIORITAS 3 — SECURITY (Background Hardening)

### P3.1 🔴 DOMPurify integration
- **Risk:** 230 `innerHTML =` dengan template literal inject data Firestore. XSS surface besar.
- **Fix:** Integrate DOMPurify (10KB lib), wrap setiap template literal innerHTML dengan `DOMPurify.sanitize(html)`.
- **Effort:** 1-2 jam (helper function + replace 20-30 critical sites).

### P3.2 🟠 CSP Header
- **Risk:** Tidak ada Content-Security-Policy → inline scripts/styles open ke injection.
- **Fix:** Tambah `headers` di `firebase.json` hosting config:
  ```json
  "headers": [{"source": "**", "headers": [{
    "key": "Content-Security-Policy",
    "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net..."
  }]}]
  ```
- **Effort:** 30 menit (test + refine policy).

### P3.3 🟡 Remove legacy `adminPassword` field
- **Status:** Masih ada plain-text `adminPassword` di `settings/general`. Sudah di-migrate ke Firebase Auth tapi field tidak removed.
- **Action:** Verify tidak ada code yang baca, lalu hapus dari Firestore + code.

### P3.4 🟢 Audit log untuk admin actions
- **Status:** `audit_log` collection ada, tapi tidak semua admin action di-log.
- **Effort:** 2-3 jam.

---

## 🏗️ PRIORITAS 4 — INFRASTRUKTUR (Dev Workflow)

### P4.1 🟠 Bundle minification di deploy flow
- **Status:** `npm run build:html` ada (html-minifier-terser) tapi tidak otomatis di-run.
- **Fix:** Update `firebase:deploy` script di `package.json`:
  ```json
  "firebase:deploy": "npm run build:html && firebase deploy --only hosting"
  ```
- **Hasil:** 1.82 MB → ~600 KB (saving ~67%).
- **Effort:** 30 menit (test minified output tidak break).

### P4.2 🟡 Sentry / Crashlytics integration
- **Status:** Production blind spot.
- **Fix:** Integrate Firebase Crashlytics atau Sentry untuk error tracking.
- **Effort:** 1 jam.

### P4.3 🟡 Vitest tests untuk helper kritis
- **Status:** Vitest configured, 0 tests.
- **Fix:** Add test untuk `buildAuthEmail`, `_toAuthPassword`, `hitungUsiaPadaTanggal`, `formatTanggal`, dll.
- **Effort:** 2-3 jam.

### P4.4 🟢 CI/CD GitHub Actions
- **Status:** `.github/workflows/*.DISABLED` exists.
- **Fix:** Enable PR preview deploy, auto-test on push.
- **Effort:** 1 jam.

---

## 🧹 PRIORITAS 5 — CLEANUP (Housekeeping)

### P5.1 🟢 `bg-pesantren.jpg` duplicate
- **Status:** Di root + `public/` identical md5.
- **Fix:** `git rm bg-pesantren.jpg` (yang di root).
- **Effort:** 1 menit.

### P5.2 🟢 `commit-msg.txt` tracking inconsistent
- **Status:** Tracked di git TAPI di `.gitignore`.
- **Fix:** `git rm --cached commit-msg.txt` (untrack tapi keep di working dir).
- **Effort:** 1 menit.

### P5.3 🟢 `backups/` folder 11 MB cleanup
- **Status:** Backup file lama (v30, v31, v.108.31 truncated).
- **Decision Kyai:** Buang atau keep historical.

### P5.4 🟢 Console.log cleanup
- **Status:** 37 console.log di production. Should be wrapped `__DEV__` flag.
- **Effort:** 30 menit batch find+replace.

### P5.5 🟢 Dead code review
- **Status:** 25 function candidates (di AUDIT-REPORT.md). Manual verify per `onclick`.
- **Effort:** 1 jam.

### P5.6 🟢 Cloud Function legacy file delete
- **Status:** `functions/cloud-functions-index.js` duplicate dari `functions/index.js`.
- **Fix:** Setelah decision P2.2, delete file.

### P5.7 🟢 Image WebP conversion
- **Files:** `bg-pesantren.jpg` (692 KB), `KOP.png` (459 KB), `bakafrawi-logo.png` (530 KB).
- **Fix:** Convert ke WebP, save ~1.2 MB di PWA cache.
- **Effort:** 30 menit (online converter atau ImageMagick).

---

## 🎯 RECOMMENDED EXECUTION ORDER

Berdasarkan **UI + Fungsi dulu** sesuai request Kyai:

### Hari ini / besok (UI critical)
1. **Smoke test** P1.1 toast DOM impl — pastikan freeze fix sukses
2. **Smoke test** P1.2 login bg preload
3. P2.1 Deploy storage rules
4. P1.3 Verify TTD upload guru → rapor

### Minggu ini (fungsi critical)
5. P2.2 cleanupAuditLog Cloud Function (pilih opsi A/B/C)
6. P2.3 Setup Iframely Secret
7. P1.4 3 UI button Ekspor PDF tersisa (kasih saya lokasi)
8. P3.1 DOMPurify integration

### Bulan ini (infrastruktur)
9. P4.1 Bundle minification
10. P3.2 CSP header
11. P4.2 Sentry integration
12. P1.5 Modal style full migration
13. P4.3 Vitest tests

### Quarter depan (long-term)
14. P1.6 Loading skeleton
15. P4.4 CI/CD enable
16. P2.4 Concurrent edit handling
17. Image WebP + cleanup misc

---

## 📦 TOTAL SESSION SUMMARY

| Metric | Nilai |
|---|---|
| Commits | **24** (belum di-push, sesuai request Kyai) |
| Issue Kyai address | 13+ (semua sudah ditangani) |
| Sisa task active | 25+ (4 prioritas level) |
| Files baru | 6 (AUDIT-REPORT, AUDIT-ADDENDUM, AUTO-SESSION-REPORT, VERIFY-FIREBASE-RULES, FOLLOWUP-PLAN, STATUS-REPORT, SENIOR-AUDIT, PENDING-TASKS) |

### Next session start dengan
1. Push 24 commits ke origin
2. Deploy ke Firebase
3. Smoke test sequence (10 menit)
4. Pilih priority dari list di atas

Kalau Kyai pilih "lanjut" di final, saya eksekusi default top 4: P1.4 (3 UI button), P2.2 (cleanupAuditLog Option A), P3.1 (DOMPurify), P4.1 (bundle minification).

---

**Untuk detail audit framework/security/UX/standar:** lihat `SENIOR-AUDIT.md`.
