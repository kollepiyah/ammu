# CONSOLIDATED TO-DO — Portal MU

**Created:** 14 Mei 2026
**Constraint:** TANPA mengubah desain visual atau fungsi yang sekarang.
**Source:** Kombinasi Senior Audit findings + PENDING-TASKS rekomendasi, sudah filter task yang ubah UI/UX user-facing.
**Filosofi:** Quality + Security + Infrastructure hardening saja. Visual identity dan feature behavior preserve.

---

## ✅ Yang sudah selesai (preserve baseline)

| Sudah ada / fixed | Status |
|---|---|
| Toast pure DOM (no Swal pause issue) | `v.108.65` |
| Logout modal — no icon, high-contrast cancel, async flow | `v.108.61+` |
| Sidebar color edit apply (3-layer fix) | `v.108.60` |
| Storage rules tightening (auth required write+delete) | `v.108.53` (need deploy) |
| Firestore rules tightening | `v.108.44` (sudah deploy) |
| Auto-update SW dengan 5-detik countdown | `v.108.53+` |
| Modal Swal elegant (refined, compact) | `v.108.55` |
| Backdrop blur minimal (1px modal, 0 toast) | `v.108.62+` |
| B3 Palette migration (action button) | Phase 1+2 done |
| Tombol hapus foto profil visible saat upload | `v.108.56` |
| `kritik_saran` lazy load post-login | `v.108.57` |
| Ekspor PDF langsung (5 wrapper functions, 2 UI button) | `v.108.59` |
| POS struk wali auto-fill (transaksi baru) | `v.108.64` |
| Login bg-pesantren preload | `v.108.65` |

---

## 🔴 GROUP A — Wajib (security & integrity)

### A1. Deploy storage rules tightening
- **Why:** Sudah commit di `0051c9a`. Tanpa deploy, anonymous masih bisa delete file Storage.
- **What:** `firebase deploy --only storage`
- **Effort:** 5 menit
- **Impact:** CRITICAL — anti-DoS Storage delete attack

### A2. DOMPurify integration untuk innerHTML
- **Why:** 230 `innerHTML =` dengan template literal inject data Firestore. XSS surface besar. Banyak yang escape via `escapeHtml()` tapi inconsistent.
- **What:**
  1. Tambah `<script src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js">` di head
  2. Build helper: `function safeHTML(html) { return DOMPurify.sanitize(html) }`
  3. Wrap inner HTML pattern: `el.innerHTML = safeHTML(\`...\${userData}...\`)`
  4. Audit + replace 20-30 critical sites yang inject user data
- **Effort:** 1-2 jam
- **Impact:** HIGH — prevent stored XSS

### A3. CSP (Content-Security-Policy) header
- **Why:** Firebase Hosting default tidak set CSP. Inline injection terbuka.
- **What:** Edit `firebase.json` tambah headers:
  ```json
  "hosting": {
    ...
    "headers": [{
      "source": "**",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src * data: blob:; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com https://firestore.googleapis.com https://firebasestorage.googleapis.com https://identitytoolkit.googleapis.com https://*.cloudfunctions.net https://iframe.ly https://api.iframe.ly;"
        },
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "X-Frame-Options", "value": "SAMEORIGIN"},
        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}
      ]
    }]
  }
  ```
- **Effort:** 30 menit (test setelah deploy — pastikan tidak break Firebase/CDN script)
- **Impact:** HIGH — defense in depth

### A4. Re-deploy `cleanupAuditLog` Cloud Function
- **Why:** `audit_log` collection dipakai 28x. Tanpa cleanup → Firestore bloat = cost increase.
- **What:**
  1. Cek apakah masih deployed di Firebase Console
  2. Kalau tidak: merge fungsi dari `functions/cloud-functions-index.js` (L335-385) ke `functions/index.js`
  3. `firebase deploy --only functions:cleanupAuditLog`
  4. Delete `functions/cloud-functions-index.js` (legacy duplicate)
- **Effort:** 30 menit
- **Impact:** MEDIUM — prevent storage bloat

### A5. Remove legacy `adminPassword` field
- **Why:** Plain-text password di `settings/general` masih ada walau Firebase Auth sudah migrate.
- **What:**
  1. Grep code: `grep -rn "adminPassword" public/index.html`
  2. Verify tidak ada code yang masih read
  3. Update Firestore: hapus field `adminPassword` dari `settings/general` doc
  4. Hapus reference dari code
- **Effort:** 30 menit
- **Impact:** HIGH — eliminate credential leak

---

## 🟠 GROUP B — Build Pipeline (perf + dev workflow)

### B1. Bundle minification di deploy flow
- **Why:** Production deploy `index.html` 1.82 MB non-minified. Bisa ~600 KB minified.
- **What:** Update `package.json`:
  ```json
  "firebase:deploy": "npm run build:html && firebase deploy --only hosting"
  ```
  Kalau `build:html` belum jalan: test `npm run build:html` standalone dulu, fix output path.
- **Effort:** 30 menit
- **Impact:** HIGH — save ~67% bandwidth + faster TTI mobile

### B2. Add Vitest tests untuk helper kritis
- **Why:** 0 tests, refactor risk = manual smoke test.
- **What:** Test target:
  - `buildAuthEmail(input)` — sanitize variations
  - `_toAuthPassword(pass)` — padding correctness
  - `hitungUsiaPadaTanggal(tglLahir, tglAcuan)` — edge cases (leap year, same date, future date)
  - `formatTanggal(iso)` — invalid input handling
  - `toTitleCase(str)` — Indonesian word handling
  - `escapeHtml(str)` — XSS sample inputs
  - `extractFirstLink(text)` — URL parsing edge cases
- **Effort:** 3 jam
- **Impact:** MEDIUM — confidence untuk refactor future

### B3. Sentry / Firebase Crashlytics integration
- **Why:** Production blind spot. Bug user-side baru terdeteksi via manual report.
- **What:** Pilih:
  - **Sentry Free** (5K events/month) — paling popular, dashboard nice
  - **Firebase Crashlytics** — already integrated stack
- **Action:**
  1. Sign up + dapat DSN
  2. Add script di head:
     ```html
     <script src="https://browser.sentry-cdn.com/8/bundle.min.js"></script>
     <script>Sentry.init({ dsn: '...', release: APP_VERSION, environment: 'production' })</script>
     ```
  3. Wrap try-catch di critical paths dengan `Sentry.captureException(err)`
- **Effort:** 1-2 jam
- **Impact:** HIGH — visibility production errors

### B4. Lighthouse CI tighten + integrate ke deploy
- **Why:** Sudah configured tapi target ringan (perf 0.7). Tidak auto-run di deploy.
- **What:**
  - Update `.lighthouserc.cjs` target ≥0.85 untuk performance
  - Add npm script `lh:check` yang run sebelum deploy
- **Effort:** 1 jam
- **Impact:** MEDIUM — performance regression detection

---

## 🟡 GROUP C — Code Health (background hardening)

### C1. Console.log cleanup
- **Why:** 37 `console.log` masuk production. Browser console pollution.
- **What:** Replace dengan:
  ```javascript
  const DEBUG = false  // toggle by env
  const log = DEBUG ? console.log.bind(console) : () => {}
  // ganti console.log → log
  ```
  Atau wrap manual dengan `if (typeof window.__DEV__ !== 'undefined') console.log(...)`.
  
  Keep `console.warn` (87) dan `console.error` (16) — itu legitimate diagnostics.
- **Effort:** 30 menit (batch find + replace)
- **Impact:** LOW — production hygiene

### C2. Dead code review (25 candidates)
- **Why:** Function declared tapi 0 callers di text scan. Bisa dipanggil via HTML `onclick`.
- **What:**
  Per candidate (dari AUDIT-REPORT.md):
  ```bash
  # Verify benar tidak dipanggil
  grep -nE "onclick=\"[^\"]*FNNAME" public/index.html
  grep -nE "addEventListener.*FNNAME" public/index.html
  ```
  Kalau benar dead → comment out dengan `// DEAD CODE — kept for archeology, delete after v.108.70`
- **Effort:** 1 jam (audit per function)
- **Impact:** LOW — code clarity

### C3. JSDoc untuk helper public API
- **Why:** Type signature implicit. Sulit untuk new dev atau future Kyai.
- **What:** Add JSDoc untuk 10-15 most-used helper:
  ```javascript
  /**
   * Sanitize username/WA input ke email internal Firebase Auth
   * @param {string} input - username atau nomor WA
   * @returns {string} email format <sanitized>@portal-mu.local
   */
  function buildAuthEmail(input) { ... }
  ```
- **Effort:** 1 jam
- **Impact:** LOW — onboarding future dev

### C4. Concurrent edit handling (last-write-wins → optimistic)
- **Why:** 2 admin edit santri sama bersamaan → silent overwrite.
- **What:** Wrap critical writes dengan Firestore transaction + version field:
  ```javascript
  await db.runTransaction(async (t) => {
    const snap = await t.get(doc)
    if (snap.data().version !== expectedVersion) throw new Error('Stale')
    t.update(doc, { ...newData, version: expectedVersion + 1 })
  })
  ```
- **Effort:** 2-3 jam per critical entity (santri, guru, settings)
- **Impact:** MEDIUM — data integrity

### C5. Image upload retry dengan exponential backoff
- **Why:** Firebase Storage timeout → user lose progress.
- **What:** Wrap `uploadBytes` dengan retry helper:
  ```javascript
  async function uploadWithRetry(ref, blob, maxRetry = 3) {
    for (let i = 0; i < maxRetry; i++) {
      try { return await uploadBytes(ref, blob) }
      catch (e) {
        if (i === maxRetry - 1) throw e
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)))
      }
    }
  }
  ```
- **Effort:** 1 jam
- **Impact:** MEDIUM — UX resilience

---

## 🟢 GROUP D — Cleanup (zero-risk housekeeping)

### D1. Hapus `bg-pesantren.jpg` duplicate di root
- **Why:** Duplicate dengan `public/bg-pesantren.jpg`, identical md5. 692 KB waste.
- **What:**
  ```bash
  git rm bg-pesantren.jpg
  git commit -m "chore: remove duplicate bg-pesantren.jpg from root"
  ```
- **Effort:** 1 menit
- **Impact:** Disk space + git cleanup

### D2. Untrack `commit-msg.txt`
- **Why:** Tracked di git TAPI di `.gitignore`. State inconsistent.
- **What:**
  ```bash
  git rm --cached commit-msg.txt
  git commit -m "chore: untrack commit-msg.txt (gitignored scratchpad)"
  ```
- **Effort:** 1 menit
- **Impact:** Git hygiene

### D3. Hapus `cleanup-batch-a1.ps1` (obsolete)
- **Why:** PowerShell script untuk cleanup folder. Target folder sudah tidak ada.
- **What:** `git rm cleanup-batch-a1.ps1`
- **Effort:** 1 menit
- **Impact:** Repo cleanup

### D4. Hapus `functions/cloud-functions-index.js`
- **Why:** Legacy duplicate dari `functions/index.js`. Confusing.
- **Prerequisite:** A4 done (cleanupAuditLog merged ke index.js)
- **What:** `git rm functions/cloud-functions-index.js`
- **Effort:** 1 menit
- **Impact:** Repo cleanup

### D5. Hapus `firebase-debug.log` dari `public/`
- **Why:** 314 KB debug log accidentally di public folder. Sudah gitignored, Firebase hosting `**/*.log` ignore — tapi tetap di working dir.
- **What:** `rm public/firebase-debug.log`
- **Effort:** 1 menit
- **Impact:** Disk space

### D6. Image WebP conversion
- **Why:** `bg-pesantren.jpg` (692 KB), `KOP.png` (459 KB), `bakafrawi-logo.png` (530 KB) total 1.7 MB.
- **What:** Convert ke WebP (~70% smaller). Tools:
  ```bash
  # cwebp dari Google
  cwebp -q 80 bg-pesantren.jpg -o bg-pesantren.webp
  ```
  Update reference di code: `bg-pesantren.jpg` → `bg-pesantren.webp` dengan fallback `<picture>`.
- **Effort:** 30 menit (convert + update references)
- **Impact:** MEDIUM — PWA cache size + mobile data

### D7. Cleanup `backups/` folder (11 MB)
- **Why:** File backup lama (v30, v31, v.108.31 truncated). Historical value rendah.
- **Decision Kyai:** keep atau hapus?
- **What kalau hapus:**
  ```bash
  rm -rf backups/
  echo "backups/" >> .gitignore  # kalau belum
  ```
- **Effort:** 1 menit
- **Impact:** Disk space

---

## 🔵 GROUP E — Configuration & Setup (need Kyai action)

### E1. Setup Iframely Secret (link preview thumbnail)
- **Why:** Link preview social media (IG/TT/FB) tidak tampil thumbnail tanpa Iframely API key.
- **What:**
  ```bash
  # 1. Daftar di iframely.com (free 1000/month, no CC)
  # 2. Dapat API key
  cd "D:\Aplikasi Project\Portal MU"
  firebase functions:secrets:set IFRAMELY_KEY
  # paste key saat prompt
  firebase deploy --only functions:getLinkPreview
  ```
- **Effort:** 10 menit (sign up + setup)
- **Impact:** MEDIUM — link preview UX restore

### E2. Firestore offline persistence
- **Why:** PWA tapi data Firestore butuh online. Offline-first convention belum implemented.
- **What:** Add di kode setelah Firebase init:
  ```javascript
  firebase.firestore().enablePersistence({ synchronizeTabs: true })
    .catch(err => console.warn('Persistence failed:', err.code))
  ```
- **Effort:** 15 menit (plus test offline behavior)
- **Impact:** HIGH — true PWA offline support

### E3. CI/CD GitHub Actions enable
- **Why:** `.github/workflows/firebase-hosting-pull-request.yml.DISABLED` ada tapi disabled.
- **What:**
  ```bash
  mv .github/workflows/firebase-hosting-pull-request.yml.DISABLED .github/workflows/firebase-hosting-pull-request.yml
  ```
  Plus update workflow untuk run tests + lighthouse.
- **Effort:** 1 jam (test workflow + secrets setup)
- **Impact:** MEDIUM — automated deploy preview

---

## 📊 Ringkasan total effort (kalau Kyai mau eksekusi semua)

| Group | Total effort | Impact category |
|---|---|---|
| A (Security & integrity) | ~3-4 jam | CRITICAL |
| B (Build pipeline) | ~5-7 jam | HIGH |
| C (Code health) | ~5-7 jam | MEDIUM |
| D (Cleanup) | ~40 menit | LOW (zero risk) |
| E (Config setup) | ~1.5 jam | MEDIUM-HIGH |
| **Total** | **~16-20 jam** | |

---

## 🎯 Yang saya BISA eksekusi LANGSUNG sekarang (zero-risk + no UI change)

Berikut subset yang aman saya kerjakan tanpa konfirmasi spesifik Kyai:

1. ✅ **D1** — Hapus `bg-pesantren.jpg` root
2. ✅ **D2** — Untrack `commit-msg.txt`
3. ✅ **D3** — Hapus `cleanup-batch-a1.ps1`
4. ✅ **D5** — Hapus `firebase-debug.log` di `public/`
5. ✅ **A3** — CSP header di `firebase.json` (safe defaults)
6. ✅ **E2** — Firestore offline persistence (1 line addition)
7. ✅ **C1** — Console.log cleanup (37 → 0 dengan DEBUG flag)
8. ✅ **C3** — JSDoc untuk 10 helper kritis
9. ✅ **B2** — Vitest test scaffold untuk 5 helper kritis

Yang BUTUH konfirmasi/info dari Kyai (skip):
- A1, A4 — butuh deploy (Kyai's machine)
- A2 — DOMPurify (butuh decide cara wrap — keep current or refactor)
- A5 — adminPassword removal (butuh verify Firestore manual)
- B1 — bundle minify (butuh test output)
- B3 — Sentry (butuh DSN signup)
- D4 — delete legacy functions (depends on A4)
- D6, D7 — image WebP / backups cleanup (butuh keputusan)
- E1, E3 — Iframely + CI/CD (butuh sign-up/secrets)

---

## 💬 Pertanyaan untuk Kyai

1. **Lanjutkan default zero-risk?** Saya eksekusi langsung 9 task di atas (D1-D3, D5, A3, E2, C1, C3, B2). ~3 jam work, no UI change, no deploy.

2. **Atau pilih spesifik?** Sebutkan item (mis. "A2 + B1 + C5") — saya akan kerjakan + commit.

3. **A5 adminPassword removal** — butuh Kyai cek dulu Firestore Console → `settings/general` doc — apakah field `adminPassword` masih dipakai by current login flow?

---

**Generated:** 14 Mei 2026
**Constraint check:** Semua task di list ini TIDAK ubah desain visual atau fungsi UX user-facing. Quality + Security + Infrastructure only.
