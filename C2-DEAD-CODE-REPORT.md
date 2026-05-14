# C2 — Dead Code Review Report

**Tanggal:** 14 Mei 2026
**Scope:** 25 function candidates dari AUDIT-REPORT.md §5
**Auditor:** Claude (Senior Developer)
**File:** `public/index.html` (1,831,587 bytes, 37,072 baris)

---

## 🔬 Metodologi Verifikasi

Untuk SETIAP kandidat, dilakukan 4 layer scan:

1. **Whole-word grep** (`grep -w`) di `public/index.html` — exclude substring match palsu.
2. **String literal scan** — pattern `'fn'` / `"fn"` untuk deteksi `window['fn']` atau dynamic dispatch.
3. **HTML attribute scan** — `onclick=`, `onchange=`, `addEventListener` mention.
4. **Cross-file grep** — `*.html`, `*.js`, `*.vue`, `*.json` di root + functions/ + src/.

**Hasil agregat:** Semua 25 hanya muncul 1× di seluruh codebase (= line definition itself). 0 caller, 0 string literal, 0 HTML attribute reference, 0 cross-file usage.

False positive yang ter-handle:
- `uploadLogoKop` substring match di `uploadLogoKopLembagaQiraati` (function lain yang masih dipakai) — di-exclude oleh whole-word grep.

---

## ✅ Konfirmasi DEAD (semua 25)

Sorted by line position di `public/index.html`:

| # | Function | Start | End | Lines | Preview |
|---|---|---:|---:|---:|---|
| 1 | `tampilGuruSantri` | 15982 | 15997 | 16 | `function tampilGuruSantri(s) {` |
| 2 | `toggleProfileDropdown` | 16507 | 16509 | 3 | `function toggleProfileDropdown() {` |
| 3 | `_hapusGenerik` | 18815 | 18827 | 13 | `async function _hapusGenerik(...)` |
| 4 | `_renderSubmenuAbsenSantri` | 20364 | 20400 | 37 | `function _renderSubmenuAbsenSantri(ctx) {` |
| 5 | `_initSubmenuAbsenSantri` | 20401 | 20414 | 14 | `async function _initSubmenuAbsenSantri(ctx) {` |
| 6 | `simpanMasterKelasSekolah` | 22388 | 22404 | 17 | `async function simpanMasterKelasSekolah(e) {` |
| 7 | `tambahKopPDFQiraati` | 26040 | 26131 | **92** | `function tambahKopPDFQiraati(doc, orientation = 'l') {` |
| 8 | `isBukuIndukUnlocked` | 27019 | 27027 | 9 | `function isBukuIndukUnlocked() {` |
| 9 | `eksporPDFTabunganGuruAll` | 27888 | 27906 | 19 | `function eksporPDFTabunganGuruAll() {` |
| 10 | `bukaModalMutasiTabGuru` | 28181 | 28193 | 13 | `function bukaModalMutasiTabGuru() {` |
| 11 | `downloadTemplateMutasiTabGuru` | 29613 | 29637 | 25 | `function downloadTemplateMutasiTabGuru() {` |
| 12 | `imporMutasiTabGuru` | 29638 | 29709 | **72** | `function imporMutasiTabGuru(e) {` |
| 13 | `validasiSesiAuth` | 31068 | 31083 | 16 | `async function validasiSesiAuth() {` |
| 14 | `logoutPaksa` | 31084 | 31096 | 13 | `async function logoutPaksa(reason) {` |
| 15 | `loadAbsensiKegiatan` | 31516 | 31524 | 9 | `async function loadAbsensiKegiatan() {` |
| 16 | `formatTanggalHijriyahLatin` | 32175 | 32179 | 5 | `function formatTanggalHijriyahLatin(tglMasehi) {` |
| 17 | `_collectCustomFieldsValues` | 33222 | 33230 | 9 | `function _collectCustomFieldsValues(entity) {` |
| 18 | `_renderCustomFieldsView` | 33233 | 33253 | 21 | `function _renderCustomFieldsView(entity, values) {` |
| 19 | `uploadLogoKop` | 35084 | 35110 | 27 | `async function uploadLogoKop(e, kopNum, slot) {` |
| 20 | `switchKopTab` | 35113 | 35131 | 19 | `function switchKopTab(n) {` |
| 21 | `getKopForLembaga` | 35137 | 35148 | 12 | `function getKopForLembaga(lembaga) {` |
| 22 | `loadKegiatan` | 35206 | 35214 | 9 | `async function loadKegiatan() {` |
| 23 | `loadBerandaPost` | 35850 | 35858 | 9 | `async function loadBerandaPost() {` |
| 24 | `bukaModalEditTentangKami` | 36788 | 36797 | 10 | `function bukaModalEditTentangKami() {` |
| 25 | `simpanTentangKami` | 36798 | 36820 | 23 | `async function simpanTentangKami(e) {` |
| | **TOTAL** | | | **512** | |

---

## 🧩 Kategorisasi Logis (untuk Kyai)

Saya cluster berdasarkan domain/feature — biar Kyai bisa sanity check per cluster:

### Cluster A — Submenu Absensi Santri (3 fn, 64 baris)
- `_renderSubmenuAbsenSantri`, `_initSubmenuAbsenSantri`, `loadAbsensiKegiatan`
- **Hipotesis:** feature submenu absensi yang awal di-draft, lalu workflow di-redesign ke pattern lain.

### Cluster B — Custom Fields (2 fn, 30 baris)
- `_collectCustomFieldsValues`, `_renderCustomFieldsView`
- **Hipotesis:** experimental custom fields feature yang tidak jadi rilis.

### Cluster C — Mutasi Tabungan Guru (4 fn, 122 baris)
- `bukaModalMutasiTabGuru`, `downloadTemplateMutasiTabGuru`, `imporMutasiTabGuru`, `eksporPDFTabunganGuruAll`
- **Hipotesis:** import/ekspor batch mutasi tabungan guru yang dihandle di flow lain (mungkin lewat tabungan santri pattern yang shared).

### Cluster D — Tentang Kami (2 fn, 33 baris)
- `bukaModalEditTentangKami`, `simpanTentangKami`
- **Hipotesis:** form edit profil lembaga yang sekarang di-handle inline di settings.

### Cluster E — Kop Lembaga / Logo Multi-slot (4 fn, 150 baris)
- `tambahKopPDFQiraati`, `uploadLogoKop`, `switchKopTab`, `getKopForLembaga`
- **Hipotesis:** versi awal sistem kop multi-slot yang di-rewrite jadi `uploadLogoKopLembagaQiraati` (yang masih hidup) + flow per-lembaga.

### Cluster F — Beranda / Kegiatan Loaders (2 fn, 18 baris)
- `loadBerandaPost`, `loadKegiatan`
- **Hipotesis:** ada nama lain `loadBerandaPosts()` plural atau `tampilKegiatan()` yang aktif.

### Cluster G — Auth/Session (2 fn, 29 baris)
- `validasiSesiAuth`, `logoutPaksa`
- **Hipotesis:** legacy session helpers — sekarang flow auth pakai Firebase Auth (B1 migration) jadi tidak dibutuhkan.

### Cluster H — Misc Utilities (6 fn, 66 baris)
- `tampilGuruSantri`, `toggleProfileDropdown`, `_hapusGenerik`, `simpanMasterKelasSekolah`, `isBukuIndukUnlocked`, `formatTanggalHijriyahLatin`
- **Hipotesis:** orphan helpers — `toggleProfileDropdown` (UI dropdown profil dibuat dengan pattern lain), `formatTanggalHijriyahLatin` (helper Hijriah pakai lib library), dll.

---

## ⚠️ Catatan Risiko

**Verdict saya: SAFE to delete (LOW risk).** Alasan:

1. **0 dynamic call risk** — tidak ada string literal `'fn'` atau `window['fn']` yang bisa unmark static-grep.
2. **0 HTML attribute reference** — tidak ada `onclick="fn()"` atau `onchange="fn(...)"`.
3. **0 cross-file reference** — confirmed di semua file yang di-deploy (index.html, sw.js, functions/index.js, src/helpers.js).
4. **Test suite** (Vitest 53 tests) tidak ada yang test 25 function ini.
5. Backup commit history existing — kalau ada regresi, `git revert` bisa restore.

**Kalau Kyai punya keraguan untuk function spesifik**, sebut nama-nya — saya bisa biarkan & hanya hapus yang sisanya.

---

## 🎯 Yang Akan Saya Lakukan (kalau approved)

1. Hapus 25 function dari `public/index.html` via Python /tmp pattern (descending line order, jadi nomor line tidak shift).
2. Validate: `node --check` pada extracted JS, `prettier --check`.
3. Verify integrity: `wc -c`, `tail -c 50`, null byte count.
4. Bump `APP_VERSION` → `v.108.76.0514-c2-dead-code`.
5. Bump `SW_VERSION` → `v265-0514-c2-dead-code`.
6. Commit `feat(code-health): C2 — remove 25 dead functions (512 lines)`.
7. Generate `C2-REPORT.md` dengan hasil akhir.

**Estimasi:** 30-40 menit (sesuai Phase 3 simple cycle).

**Tidak akan deploy / push** — Kyai handle manual.

---

## 📊 Expected Impact

| Metrik | Sebelum | Estimasi Sesudah | Delta |
|---|---|---|---|
| index.html lines | 37,072 | ~36,560 | **-512 (-1.38%)** |
| index.html bytes | 1,831,587 | ~1,815,000 | -16,000 (-0.9%) |
| Function count | 658 | 633 | **-25 (-3.8%)** |
| Bundle (minified, est.) | ~1.14 MB | ~1.13 MB | -10 KB |

Trade-off: speedup parsing JS engine marginal (~5-10 ms initial load), tapi yang lebih penting adalah **mengurangi cognitive load saat refactor selanjutnya** (Phase 4 G & Phase 5 F Vue 3 migration).

---

## ✋ Menunggu Persetujuan Kyai

**Pertanyaan untuk Kyai:**
1. Approve hapus semua 25? (rekomendasi saya: ya)
2. Atau ada function tertentu yang Kyai mau biarkan?
3. Lanjut eksekusi sekarang?

— end of report —
