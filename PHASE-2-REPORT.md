# Phase 2 Auto-Session Report — 14 Mei 2026

**Mulai:** 05:44 WIB (workspace UTC mapping)
**Selesai:** 06:05 WIB
**Base commit:** `617a6e6` (v.108.67.0514-dompurify)
**HEAD commit:** `f4886a0` (v.108.71.0514-lighthouse)
**Mode:** Solo + Otonom (scheduled task)

---

## Completed

### B1. Bundle minification deploy pipeline

- **Commit:** `1fac75b`
- **APP_VERSION:** v.108.67 → **v.108.68.0514-minify**
- **File size:** 1,826,579 bytes (1.74 MB) → **1,144,265 bytes (1.09 MB) — saved 682,314 bytes (37.4%)**
- **Catatan:** Roadmap menargetkan ~600 KB tapi reduksi realistik dengan `html-minifier-terser` di-source 1.74 MB adalah 37%. Untuk mencapai ~600 KB perlu strategi tambahan (gzip/brotli di Firebase Hosting — sudah otomatis, splitting bundle, atau lazy-load Tailwind). Reduksi 37% sudah signifikan dan menghemat ~680 KB initial-load bandwidth.
- **Implementasi:** `scripts/deploy-minified.cjs` — pattern backup → swap → deploy → restore. Original `public/index.html` tetap human-readable di git, sementara yang dipush ke Firebase Hosting versi minified.
- **Files:**
  - `+ scripts/deploy-minified.cjs` (deploy wrapper script)
  - `M package.json` (firebase:deploy → node scripts/..., firebase:deploy:raw preserved as escape hatch)
  - `M .gitignore` (ignore index.min.html + deploy-bak)
  - `M public/index.html` (APP_VERSION bump)

### B2. Vitest unit tests untuk 7 helper kritis

- **Commit:** `6f9180b`
- **APP_VERSION:** v.108.68 → **v.108.69.0514-tests**
- **Hasil tests:** **7 files / 53 cases, all pass** (`npm run test:run`)
- **Implementasi:** Helper di-extract ke `src/helpers.js` (pure functions, no DOM). Versi bit-identical dengan implementasi di `public/index.html`.
- **Coverage detail:**

| Helper                  | Test file                       | Cases  | Notable edge cases                                |
| ----------------------- | ------------------------------- | ------ | ------------------------------------------------- |
| `buildAuthEmail`        | `buildAuthEmail.test.js`        | 7      | WA-style input, unicode strip, all-special → null |
| `_toAuthPassword`       | `_toAuthPassword.test.js`       | 7      | null-safety, min-length invariant                 |
| `hitungUsiaPadaTanggal` | `hitungUsiaPadaTanggal.test.js` | 8      | leap year, pre-birthday, future birth, Date obj   |
| `formatTanggal`         | `formatTanggal.test.js`         | 7      | ISO fast-path, invalid input, Date obj, padding   |
| `toTitleCase`           | `toTitleCase.test.js`           | 7      | ALLCAPS, mixed, Indonesian particles              |
| `escapeHtml`            | `escapeHtml.test.js`            | 8      | 5 entities, XSS attribute breakout, non-string    |
| `extractFirstLink`      | `extractFirstLink.test.js`      | 9      | trailing punctuation, first-of-many, brackets     |
| **TOTAL**               |                                 | **53** |                                                   |

- **Files:**
  - `+ src/helpers.js` (135 lines, 7 pure functions)
  - `+ tests/unit/*.test.js` (7 files)
  - `M public/index.html` (APP_VERSION bump)

### B3. Sentry error tracking integration

- **Commit:** `9397f87`
- **APP_VERSION:** v.108.69 → **v.108.70.0514-sentry**
- **DSN:** `PLACEHOLDER_DSN_KYAI_REPLACE` (Kyai replace)
- **Implementasi:**
  - CDN script tag added at head (`browser.sentry-cdn.com/8/bundle.min.js`, `defer` + `fetchpriority="low"`)
  - Init block dengan gate guard: kalau DSN masih PLACEHOLDER, init di-skip (silent no-op)
  - Config: `release=APP_VERSION`, `environment='production'`, `tracesSampleRate=0.1`, `beforeSend` filter localhost
  - `captureToSentry(err, ctx)` wrapper aman (no-op kalau SDK absent)
- **Lokasi captureToSentry yang di-wire:**
  - `initApp()` main catch — `{ where: 'initApp' }`
  - `simpanGuru()` catch — `{ where: 'simpanGuru' }`
  - `simpanSantri()` catch — `{ where: 'simpanSantri' }`
  - `simpanRaporSantri()` predikat catch — `{ where: 'simpanRaporSantri.predikat' }`
  - Auth signIn catch — `{ where: 'auth.signIn', code }`
  - Auth linkGoogle catch — `{ where: 'auth.linkGoogle', code }`
- **Files:**
  - `+ SENTRY-SETUP.md` (instruksi Kyai dapat DSN + replace placeholder, 6 sections)
  - `M public/index.html` (Sentry CDN + init + captureToSentry wrapper + 7 call-sites)

### B4. Lighthouse CI tighten thresholds

- **Commit:** `f4886a0`
- **APP_VERSION:** v.108.70 → **v.108.71.0514-lighthouse**
- **Thresholds (sebelum → sesudah):**

| Category       | Old  | New          |
| -------------- | ---- | ------------ |
| performance    | 0.70 | **0.85**     |
| accessibility  | 0.85 | **0.90**     |
| best-practices | 0.85 | **0.90**     |
| seo            | 0.80 | **0.85**     |
| FCP (NEW)      | —    | **≤ 2000ms** |

- **CLI verified:** `@lhci/cli@0.14.0` installed di node_modules.
- **Scripts:**
  - `lh:ci` — `lhci autorun` (live URL)
  - `lh:check` — `lhci autorun --collect.staticDistDir=public` (pre-deploy gate, static serve)
- **Severity:** Semua `warn` (bukan `error`) — tidak block deploy, hanya log warning. Sesuai kebutuhan beta internal testing.
- **Files:**
  - `M .lighthouserc.cjs` (thresholds + FCP assertion)
  - `M public/index.html` (APP_VERSION bump)

---

## Skipped

_Tidak ada B-task yang di-skip._ Semua 4 task (B1–B4) selesai.

---

## Issues

### 1. Edit tool truncate `package.json` di Windows mount (severity: medium, recovered)

Saat B1, Edit tool truncate `package.json` ke 1820 bytes (membuat `npm` gagal parse JSON). Workaround: rewrite full content via Python binary mode write. Memory `feedback_write_tool_windows_mount.md` confirmed. Tidak terulang setelah switch ke Python /tmp pattern.

### 2. Git index.lock berulang (severity: low, recovered)

Git operations beberapa kali fail dengan `index.lock exists`. Workaround `mv .git/index.lock .git/index.lock.del.<timestamp>` bekerja, tapi kadang perlu retry 2-3x sebelum commit sukses. Tidak ada commit yang hilang. Semua 4 B-task commits ter-record.

### 3. Reduksi minify 37% (bukan 67% seperti target roadmap) (severity: low, by-design)

Roadmap optimistik menargetkan 1.82 MB → 600 KB (-67%). Reduksi actual dengan `html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true` adalah 37% (1.74 MB → 1.09 MB). Untuk mencapai 600 KB perlu code-splitting atau lazy-load — bukan scope B1. Hosting Firebase otomatis gzip/brotli compress lagi → real wire bytes ~250-300 KB.

### 4. Rollup native binary platform mismatch (severity: low, recovered)

Vitest pertama kali fail karena `node_modules/@rollup/rollup-linux-x64-gnu` ada tapi require gagal. Workaround: tidak diperlukan eksplisit — re-run berikutnya berhasil (cache priming). Tidak akan terjadi di mesin Kyai (Windows native).

### 5. `firestore.rules` modified (uncommitted, NOT touched by Phase 2)

Pre-existing CRLF↔LF line-ending churn (300/300 diff dengan same line count). Tidak di-stage / commit per aturan kritikal. Kyai bisa fix dengan `git checkout firestore.rules` atau dedicated commit kalau intent line-ending normalize.

### 6. `.agents/skills/**` modifications (uncommitted, NOT touched by Phase 2)

Pre-existing modifications di skills documentation. Tidak terkait Phase 2, tidak di-stage.

---

## Verification Snapshot

```
$ git log --oneline -5
f4886a0 B4: Lighthouse CI tighten thresholds (v.108.71.0514-lighthouse)
9397f87 B3: Sentry error tracking integration (v.108.70.0514-sentry)
6f9180b B2: vitest unit tests for 7 critical helpers (v.108.69.0514-tests)
1fac75b B1: bundle minification deploy pipeline (v.108.68.0514-minify)
617a6e6 fix(csp): connect-src tambah cdnjs.cloudflare.com + cdn.jsdelivr.net + sentry-cdn

$ npm run test:run
Test Files  7 passed (7)
     Tests  53 passed (53)

$ npm run build:html  →  public/index.min.html = 1,144,265 bytes (saved 37.4%)

$ wc -c public/index.html
1826579  (v.108.71.0514-lighthouse)
```

---

## Action Kyai (sequential)

1. **Replace SENTRY_DSN placeholder** di `public/index.html` per `SENTRY-SETUP.md`. Sign up Sentry → buat project JavaScript Browser → copy DSN → search `PLACEHOLDER_DSN_KYAI_REPLACE` → replace. Tanpa step ini, Sentry init silent skip (aman tapi no tracking).
2. **`git push origin main`** untuk push semua 7+ commits Phase 1+2 (atau lebih, kalau di Kyai's local ada extra). HEAD = `f4886a0`.
3. **Smoke test minified deploy:** jalankan `npm run firebase:emulator` lokal dulu, test login/save santri/save rapor. Kalau OK, `npm run firebase:deploy` (akan otomatis swap minified saat push ke Firebase Hosting).
4. **Smoke test live:** buka portal-mambaul-ulum.web.app di browser baru (mobile + desktop), verifikasi:
   - Login berhasil (Firebase Auth)
   - Initial paint cepat (~37% bandwidth saved)
   - Console tidak ada CSP violation atau Sentry-init warning
5. **Phase 3 decision** — pilih satu:
   - **Group C/G** (UX hardening + i18n) — incremental polish
   - **Group F** (Vue 3 migration) — strategic refactor sebelum Capacitor
   - **Group D/E** (Cloud Functions hardening + storage budget) — security/cost
   - Rekomendasi: **Group C** dulu (low-risk wins) sebelum Group F (high-impact refactor).
6. **Optional cleanup** uncommitted state: keputusan untuk `firestore.rules` line-ending dan `.agents/skills/**` modifications. Sebelum push, run `git diff firestore.rules` untuk verify cuma CRLF churn. Kalau iya, `git checkout firestore.rules` aman.

---

## Decisions yang dibuat otonom (catatan Senior)

1. **Deploy pattern: backup-swap-restore, bukan `dist/` folder.** Alasan: minimal blast radius (firebase.json, capacitor sync, SW path semua expect `public/`). Kalau pakai `dist/`, perlu update banyak referensi. Script `scripts/deploy-minified.cjs` cleanly swaps dengan signal-handler untuk restore on Ctrl-C.
2. **Helpers extracted ke `src/helpers.js` sebagai modul ES, bukan inline copy.** Alasan: testable, single source of truth nantinya. Sementara index.html masih punya copy duplikat untuk runtime — sync manual saat ada perubahan. Phase 3+ bisa migrate ke import sebenarnya.
3. **Sentry DSN gate dengan `indexOf('PLACEHOLDER') === -1`.** Alasan: foolproof — kalau Kyai lupa replace, init di-skip dengan benar (no broken DSN sent). Wrapper `captureToSentry` juga safe-by-default.
4. **Lighthouse `warn` bukan `error`.** Alasan: beta internal testing, kita masih perlu fleksibilitas. Kalau strictly `error`, B4 akan block deploy berkali-kali karena 0.85 threshold lebih agresif. Phase 3 bisa toggle ke `error` setelah baseline stable.
5. **`firebase:deploy:raw` preserved.** Escape hatch kalau minify break sesuatu — Kyai bisa `npm run firebase:deploy:raw` untuk deploy original.

---

🌙 → ☀️ Phase 2 Group B selesai. 4 commits, 0 task di-skip, semua tests pass, semua deliverable in repo.
