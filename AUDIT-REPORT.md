# AUDIT REPORT — Portal MU / Ammu Online

**Tanggal audit:** 14 Mei 2026
**Auditor:** Claude (Senior Developer + Solution Architect + Security Auditor)
**Commit base:** `82ef813` (B2 + Toast compact + lazy-init: Firestore Rules tightening)
**Live version:** `v.108.51.0513-toast-compact` / SW `v249-0513-toast-compact`
**Scope:** Read-only audit terhadap `public/`, `firestore.rules`, `firebase.json`, `manifest.json`.

---

## 1. Code Health Metrics

### 1.1 File terbesar: `public/index.html`

| Metrik | Nilai | Catatan |
|---|---|---|
| Ukuran | **1,791,526 bytes** (~1.79 MB) | Single-file monolith |
| Total baris | **37,072** | Naik dari estimasi 24k |
| Inline `<script>` blocks | 6 | 1 entry init + 1 main + ekstra (inline print/popup writer) |
| Function declarations | **658** unique | High coupling risk |
| Async functions | 179 | Banyak operasi Firestore |
| Arrow functions (rough) | 84 | |
| `try { ... }` blocks | **273** | Error handling coverage cukup |
| HTML comments | 275 | Kebanyakan section marker |
| JS line comments (`//`) | 1,386 | |
| JS block comments (`/* */`) | 115 | |
| Density komentar / 1000 baris | ~48 | Wajar |

**Architectural verdict:** File 1.79 MB / 37 ribu baris masuk kategori **mature monolith** — sudah melewati threshold di mana refactor jadi mahal. Performa initial load dipertahankan dengan PWA cache; tapi maintenance cost mulai terasa (lihat #5 di bawah).

### 1.2 Service Worker `public/sw.js`

- Ukuran: 3,777 bytes (145 baris) — sehat.
- Versi: `v249-0513-toast-compact`.

### 1.3 PWA Manifest `public/manifest.json`

- Valid JSON, 1,699 bytes.
- 5 icons declared, **semua file fisik EXIST** di `public/`:
  - `icon-192.png`, `icon-512.png` (any)
  - `icon-192-maskable.png`, `icon-512-maskable.png` (maskable)
  - `apple-touch-icon-180.png`
- `theme_color`: `#0f766e` (teal-700) → konsisten dengan B3 palette migration.
- `background_color`: `#0f766e` → solid match.
- Shortcuts: 2 (Beranda, Buat Postingan) — sudah jalan.

**Hasil:** Manifest tidak perlu perubahan. Lihat juga rekomendasi micro-optimization di #7.

---

## 2. Security Surface

### 2.1 Dangerous primitives

| Primitif | Count | Verdict |
|---|---|---|
| `eval()` | 0 | ✅ Bersih |
| `new Function(...)` | 0 | ✅ Bersih |
| `document.write(...)` | 3 | ⚠️ Hanya untuk print preview window (`w.document.write` ke window baru, bukan main doc) — acceptable tapi noted |
| `.innerHTML = ` | **230** | ⚠️ XSS attack surface besar |
| `.innerHTML = ` `template literal` | 26 | Sebagian besar konten static; sebagian inject value Firestore |
| `.outerHTML = ` | 1 | Low risk |
| `.textContent = ` | 20 | Safer alternative yang masih kurang dipakai |
| `DOMPurify` | 0 | ❌ Tidak ada sanitizer library |

**Severity:** Medium. `innerHTML` dengan data dari Firestore (yang bisa diisi user lewat form) berpotensi XSS kalau user kirim string `<script>` atau `<img onerror=...>`. Saat ini Firestore Rules belum filter HTML/script di field, mengandalkan UI escape — yang dilakukan oleh `innerHTML` justru tidak escape.

**Mitigasi yang direkomendasikan:**
1. **Quick win:** convert template literals yang inject user data jadi `textContent` + DOM API (createElement, appendChild). Untuk template yang complex, pakai `DOMPurify.sanitize(html)`.
2. **Defense in depth:** tambah validation di Firestore Rules untuk strip tag `<script>`, attribute `on*`, dan `javascript:` URL — tapi ini terbatas karena rules engine tidak punya regex parser yang kuat.
3. **Long-term:** migrasi ke template engine yang auto-escape (mis. lit-html / Vue) — sudah ada di roadmap (B3 Vue 3 migration).

### 2.2 Auth state

- Firebase Auth migration (B1) sudah ter-instrumentasi:
  - `buildAuthEmail`: 3x reference
  - `_toAuthPassword`: 6x reference (sanitize + pad helper)
  - `_provisionAuthForUser`: 3x reference
  - `signInWithEmailAndPassword`: 2x reference
  - `createUserWithEmailAndPassword`: 3x reference
- Tidak ada lagi pattern legacy `doc.password === inputPassword` di codebase (`0` matches) — **migrasi B1 sudah tuntas di sisi code path**.

### 2.3 Firestore Rules state

`firestore.rules` versi `v.108.44` — sudah B2 tightening:
- `read: if true` (tetap public untuk lazy migration lookup)
- `write/delete: if request.auth != null` (semua koleksi: master, settings, guru, santri, dll)
- Validasi tipe field per-koleksi (string/number/length bounds)

**Verdict:** Rules sudah sesuai standar. Lihat #8 untuk catatan tambahan tentang verify ke deployed.

### 2.4 Files yang bisa bocor lewat hosting

`public/firebase-debug.log` (314 KB) ada di folder publik **tapi** `firebase.json` sudah `ignore: ["**/*.log"]` — **tidak akan dideploy**. ✅

Tetap direkomendasikan dihapus dari local folder (gitignored, jadi clean-up aman).

---

## 3. Console Pollution

Debug output yang akan muncul di production browser console:

| Tipe | Count |
|---|---|
| `console.log` | **37** |
| `console.warn` | 87 |
| `console.error` | 16 |
| `console.debug` | 0 |
| **Total** | **140** |

**Severity:** Low–Medium.
- `console.log` 37 → debug ke leftover. **Recommended fix:** kill di build step atau wrap dengan flag `__DEV__`.
- `console.warn` 87 → kemungkinan besar legitimate (warning kondisi tak terduga). Bisa diaudit batch berikutnya.
- `console.error` 16 → sebaiknya tetap (untuk Sentry-like reporting nanti).

**Architectural insight:** Tanpa build step, console.log akan ter-deploy. Solusi terbaik adalah introduce minimal post-process script (mis. `terser` minify + drop_console) di `firebase:deploy` flow.

---

## 4. Comment Versioning Hygiene

Comment yang mention versi (`v.85` – `v.108`):

| Versi | Count |
|---|---|
| v.85 | 6 (CSS section banner) |
| v.86–v.99 | 14 cumulative |
| v.100 | 1 |
| v.103 | 3 |
| v.105 | 1 |
| v.106 | 9 (HTML section markers ACF) |
| v.107 | 3 |
| **v.108.x** | **99** |

**Audit findings:**
- 0 comment versi-only (cuma `// v.108.xx` tanpa konten).
- 0 comment minimal (`// v.108.xx fix:` tanpa content).
- **Semua 99 comment `v.108.x` punya konten substantif** menjelaskan apa yang dilakukan.

**Verdict task A2:** **SKIP** — tidak ada target aman untuk batch cleanup tanpa kehilangan context. Comment lama berfungsi sebagai changelog inline yang masih punya nilai dokumentasi.

**Recommended approach untuk Kyai:** kalau memang ingin clean, hapus secara manual saat refactor file/section terkait, bukan via batch regex.

---

## 5. Dead Code Candidates

Function declared tapi **0 caller** ditemukan di scan textual (perlu verifikasi manual karena bisa dipanggil dari `onclick=""` attribute atau dynamic dispatch):

```
_collectCustomFieldsValues          _hapusGenerik
_initSubmenuAbsenSantri             _renderCustomFieldsView
_renderSubmenuAbsenSantri           bukaModalEditTentangKami
bukaModalMutasiTabGuru              downloadTemplateMutasiTabGuru
eksporPDFTabunganGuruAll            formatTanggalHijriyahLatin
getKopForLembaga                    imporMutasiTabGuru
isBukuIndukUnlocked                 loadAbsensiKegiatan
loadBerandaPost                     loadKegiatan
logoutPaksa                         simpanMasterKelasSekolah
simpanTentangKami                   switchKopTab
tambahKopPDFQiraati                 tampilGuruSantri
toggleProfileDropdown               uploadLogoKop
validasiSesiAuth
```

Total: **25** kandidat (dari 658 functions = ~3.8%).

**HATI-HATI sebelum hapus:** banyak function ini terlihat seperti event handler yang dipanggil dari HTML `onclick` attribute. Saya tidak hapus apapun — flagged untuk review manual Kyai.

**Recommended verification per function:**
```bash
grep -nE "onclick=\"[^\"]*FNNAME" public/index.html
grep -nE "addEventListener.*FNNAME" public/index.html
```

---

## 6. Tailwind Palette Status (Task A4 / B3 continuation)

`bg-blue-*` masih tersebar di codebase:

| Class | Count | Context dominan |
|---|---|---|
| `bg-blue-50` | **64** | Info badge & light card (HATI-HATI: jangan asal ganti) |
| `bg-blue-100` | 16 | Hover state badge |
| `bg-blue-200` | 4 | Border accent |
| `bg-blue-500` | 2 | Rare |
| `bg-blue-600` | **37** | **Action button (kandidat utama replace ke teal-600)** |
| `bg-blue-700` | **25** | Button hover (kandidat replace ke teal-700) |
| `bg-blue-800` | 1 | Edge case |

**Total `bg-blue-*`: 149** (lebih banyak dari estimasi 84 di PENDING.md).

`bg-teal-*` (current brand):

| Class | Count |
|---|---|
| `bg-teal-50` | 27 |
| `bg-teal-100` | 10 |
| `bg-teal-200` | 1 |
| `bg-teal-600` | 4 |
| `bg-teal-700` | 5 |
| `bg-teal-900` | 1 |

**Strategy untuk B3 task A4:**
- **Phase 1 (safer):** `bg-blue-600 hover:bg-blue-700` button class → `bg-teal-600 hover:bg-teal-700`. Ini consistent dengan brand teal. Estimasi: ~62 occurrences.
- **Phase 2 (riskier):** evaluate `bg-blue-50` per-context. Banyak yang info badge (`fa-info-circle`, blue tip card) — biarkan, karena blue universally codes "info" di UI convention.
- **DECISION:** kerjakan Phase 1 di sesi ini kalau ada budget waktu. Phase 2 tunggu konfirmasi Kyai.

---

## 7. Minor / Hygiene Findings

| # | Finding | Severity | Recommended action |
|---|---|---|---|
| 7.1 | `public/firebase-debug.log` (314 KB) ada di folder publik | Low (sudah di-ignore Firebase + git) | Hapus dari working dir (zero risk) |
| 7.2 | `public/exceljs.min.js` 1.9 MB (vendor) dilayani via static hosting | Low (sudah ada PWA cache) | Pertimbangkan CDN + integrity hash di tahap optimisasi |
| 7.3 | `public/bg-pesantren.jpg` 692 KB | Low | Compress / convert ke WebP atau AVIF — bisa hemat ~60% |
| 7.4 | `public/KOP.png` 459 KB & `public/bakafrawi-logo.png` 530 KB | Low | Convert ke WebP / SVG bila memungkinkan |
| 7.5 | Manifest icon paths relative (tanpa leading `/`) | Negligible | Optional: ubah ke absolute (`/icon-192.png`) untuk safety, tapi sekarang berfungsi |
| 7.6 | `display_override` array (`["standalone","minimal-ui","browser"]`) sudah modern PWA spec | ✅ | No-op |
| 7.7 | ARIA usage hanya 13 instance | Medium | Accessibility audit terpisah — di luar scope sesi ini |

---

## 8. Firebase Rules — Deployed vs File (Task A6)

CLI `firebase firestore:rules:get` tidak available di sandbox (no Firebase CLI auth). Verify state berdasarkan file:

- `firestore.rules` (current file): `v.108.44 — B2 Tightening (Firebase Auth based)` ✅
- File size: ~300 baris, semua koleksi punya `read: if true` + `write: if signedIn()` + validation.
- Commit terakhir yang sentuh: `82ef813` (B2 tightening).

**Recommended manual verify oleh Kyai:**
1. Buka Firebase Console → Firestore → Rules.
2. Bandingkan dengan `firestore.rules` di repo. Cari diff di header (`v.108.44` marker).
3. Kalau drift → `firebase deploy --only firestore:rules`.

(Kanal ini tidak akan deploy tanpa konfirmasi Kyai.)

---

## 9. Architectural Insights

### 9.1 Apa yang sudah bagus
- **Try/catch coverage tinggi** (273 try blocks) → resiliensi UI/network terjaga.
- **Lazy migration auth** patternnya elegan: anonymous read OK → verify legacy password → silently provision Firebase Auth user → reload session.
- **Service Worker minimal** (3.7 KB) → tidak over-engineer cache.
- **Firestore Rules layered** (per-koleksi schema validation) → defense in depth.

### 9.2 Architectural risks (long-term)
- **Monolith index.html (1.79 MB / 37k baris)** — sudah Roadmap B-series (Vue 3 + Capacitor migration). Layak diakselerasi setelah B0/B1/B2 stabil.
- **innerHTML-heavy rendering** → kalau ada bug di sanitize chain, dampak XSS bisa luas. DOMPurify deserve dipertimbangkan walaupun bukan paling utama sekarang.
- **No build step / minify** → console.log + non-minified template literals masuk production.

### 9.3 Refactor priority (kalau Kyai punya 1 hari free)
1. Drop `console.log` 37x dengan `__DEV__` flag wrapper.
2. Add DOMPurify untuk inject-user-data innerHTML (~26 template literal usages).
3. Phase 1 palette migration: `bg-blue-600/700` → `bg-teal-600/700` di action button.
4. Audit dead code 25 candidates → hapus yang clearly dead.

---

## 10. Coverage Firebase Auth migration

Function | Reference count | Status
---|---|---
`buildAuthEmail(...)` | 3 | ✅ Aktif
`_toAuthPassword(...)` | 6 | ✅ Aktif (sanitize+pad)
`_provisionAuthForUser(...)` | 3 | ✅ Aktif
`signInWithEmailAndPassword(...)` | 2 | ✅ Aktif
`createUserWithEmailAndPassword(...)` | 3 | ✅ Aktif

**Legacy pattern check:** `doc.password === ...` direct compare → **0** match. Migrasi tuntas di code path login flow.

---

## 11. Recommended next actions untuk Kyai

Prioritas eksekusi (high → low impact):

1. **[High]** Console.log cleanup batch (37 occurrences) → reduce production noise. ~30 menit risk-low task.
2. **[High]** DOMPurify integration untuk template literal innerHTML yang inject user data — XSS hardening.
3. **[Medium]** Phase 1 palette migration `bg-blue-600/700` → `bg-teal-600/700`. ~62 occurrences action buttons.
4. **[Medium]** Image optimization: bg-pesantren.jpg, KOP.png, bakafrawi-logo.png → WebP. Save ~1.2 MB total PWA cache.
5. **[Medium]** Dead code review 25 candidates → manual verify, hapus yang dead.
6. **[Low]** Manifest absolute icon paths.
7. **[Low]** Hapus `public/firebase-debug.log` dari working dir.

---

## 12. State stamp

```
Audit commit base : 82ef813
index.html bytes  : 1,791,526
index.html tail   : "</html>" (intact)
Total LOC         : 37,072
Total functions   : 658
Null bytes        : 0 (verified)
```

— end of report —
