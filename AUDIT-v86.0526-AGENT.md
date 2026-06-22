# AUDIT KOMPREHENSIF — Ammu Online v.86.0526

**Tanggal:** 30 Mei 2026 · **Auditor:** Agent (Senior SW Architect mode) · **Scope:** distribusi production 3 platform (Web / Android AAB / Electron)

> Catatan state: HEAD git = commit `70450f6` **v.74**, tapi working tree sudah **v.86** (kerja v.75→v.86 BELUM di-commit). Audit ini berjalan di atas working tree. **Recovery dari git HEAD = mundur ke v.74** — hati-hati.

---

## RINGKASAN EKSEKUTIF

| # | Area | Status | Severity tertinggi |
|---|------|--------|--------------------|
| 0 | Electron blank screen (app setelah install) | ✅ **FIXED + verified** | 🔴→✅ |
| 1 | Version consistency v.86.0526 | ✅ Lulus | 🟢 |
| 2 | Capacitor config | ✅ Inti benar, ada footgun | 🟡 |
| 3 | Firestore + Storage rules | ⚠️ Masalah serius | 🔴 |
| 4 | Security (key/secret/HTTPS) | ⚠️ 1 critical | 🔴 |
| 5 | PWA | ⚠️ Tidak lengkap | 🟠 |
| 6 | Accessibility (WCAG) | ✅ Bagus, minor | 🟡 |
| 7 | Performance | ⚠️ Bloat + chunk besar | 🟠 |

**3 hal paling mendesak:**
1. 🔴 **Admin password plaintext di Firestore yang world-readable** (lihat §4) — siapa pun bisa baca password admin via REST API.
2. 🟠 **Bloat `public/vue/vue/vue/…` rekursif** masuk ke AAB (lihat §7) — perbesar ukuran APK signifikan.
3. 🟠 **PWA tidak installable** (no manifest link / SW / apple-touch) (lihat §5).

---

## §0. ELECTRON — BLANK SCREEN (✅ FIXED)

**Gejala:** build sukses, installer jadi, tapi app blank/error setelah di-install.

**Akar masalah:** `vue-app/electron/src/index.ts` → `protocol.interceptFileProtocol('file', …)` me-redirect **SEMUA** request `file://` drive-rooted ke `APP_ROOT`. Akibatnya `loadFile()` untuk `index.html` sendiri jadi path ganda:
`path.join(APP_ROOT, "…/resources/app/app/index.html")` → `ERR_FILE_NOT_FOUND` → window blank. Intercept itu cuma dimaksudkan remap ref absolut Vue (`/logo.png`), tapi menelan file app yang valid.

**Fix (surgical, 1 fungsi):** cek `fs.existsSync(urlPath)` lebih dulu → file yang nyata ada (index.html, `./assets/*`) di-serve apa adanya; remap ke `APP_ROOT` hanya untuk path yang TIDAK ada (+ fallback basename).

**Verifikasi:** `electron:make` exit 0 → relaunch packaged app → `ERR_FILE_NOT_FOUND: 0`, `mount FAIL: 0`, `Renderer crashed: 0`. App render normal.

**Belum di-commit** (kyai yang commit). File berubah: `vue-app/electron/src/index.ts`.

**Isu sekunder Electron (NON-fatal, belum difix — opsional):**
- 🟡 **AutoUpdate 404** — `electron-updater` nunjuk `github.com/lexanoisgroup3/portal-mu/releases` yang belum ada → auto-update tidak jalan (ter-catch, tidak crash). Publish release / matikan auto-update kalau belum siap.
- 🟡 **Splash desktop** pakai `data:` URL → Chromium blok gambar `file://` di dalamnya → splash tampil warna solid tanpa gambar Bakafrawi. Perlu embed base64 atau load via file HTML.

---

## §1. VERSION CONSISTENCY — ✅ LULUS SEMUA

| Lokasi | Nilai | Status |
|---|---|---|
| `package.json` (root) | `86.0526` | ✅ |
| `vue-app/package.json` | `86.0526` | ✅ |
| `vue-app/electron/package.json` | `86.0.526` | ✅ |
| `vue-app/android/app/build.gradle` | versionCode `86` + versionName `v.86.0526` | ✅ |
| Footer Sidebar (`AppSidebar.vue` L48) | `v.86.0526` | ✅ |
| Footer Login (`LoginView.vue` L348) | `v.86.0526` | ✅ |
| Footer Dashboard (`DashboardView.vue` L56) | `v.86.0526` | ✅ |
| Footer PpdbAdmin (`PpdbAdminView.vue` L307) | `v.86.0526` | ✅ |
| Sentry release (`main.js`) | `portal-mu@86.0526` | ✅ |

Tidak ada stempel versi UI yang stale. (Komentar `v.84/85.0526` di kode hanya jejak historis, bukan tampilan.)

---

## §2. CAPACITOR CONFIG — ✅ inti benar, 🟡 footgun

**`vue-app/capacitor.config.json` (aktif, Cap 8 bundled):** semua benar.
- `appId: app.ammu.id` ✅ · `webDir: dist` ✅ · `launchShowDuration: 3000` ✅
- `server.androidScheme: https` + `cleartext: false` ✅ (HTTPS-only)
- `capacitor.config.ts` **terhapus** (root & vue-app) ✅
- **AndroidManifest** (`vue-app/android/app/src/main`): INTERNET, WRITE/READ_EXTERNAL_STORAGE (maxSdk scoped), READ_MEDIA_IMAGES/VIDEO, CAMERA + `uses-feature camera required=false` + FileProvider ✅ — storage+camera lengkap.

**Temuan:**
- 🟡 **Root `capacitor.config.json` masih ada** = config LAMA (Cap 6, mode REMOTE `server.url → ammuonline.web.app`, `webDir: public`). Kalau ada `npx cap …` dijalankan dari root, akan pakai config remote yang salah. Rekomendasi: hapus/arsipkan, atau dokumentasikan bahwa build resmi selalu dari `vue-app/`.
- 🟡 **Mismatch versi Capacitor:** `vue-app/package.json` core `@capacitor/*: ^8.3.4` tapi `@capacitor/cli: ^7.6.5` (CLI 7 vs core 8). Selaraskan CLI ke ^8 untuk hindari surprise `cap sync`.
- 🟡 **Root `package.json`** masih pin Capacitor 6 (`@capacitor/android: ^6.2.0`). Sisa legacy; bukan jalur build aktif tapi membingungkan.

---

## §3. FIRESTORE + STORAGE RULES — 🔴 MASALAH SERIUS

**Firestore (`firestore.rules` v.108.44):**
- 🟢 Default-deny di akhir (`match /{document=**} { allow read,write: if false }`) ✅
- 🟢 Immutable di tempat yang tepat: `keuangan_transaksi` (update/delete:false), `audit_log` (update/delete:false), `backup_hapus`, `keuangan_tabungan_guru` ✅
- 🔴 **READ = `if true` (anonim) di HAMPIR SEMUA koleksi** — `santri`, `guru`, `keuangan_*`, `rapor_semester`, `absensi_*`, dll. PII santri, data guru, **catatan keuangan**, dan **nilai rapor** bisa dibaca SIAPA SAJA via REST (`firestore.googleapis.com/.../santri`) tanpa login. Tidak ada scoping per role (admin/guru/santri/wali) seperti yang ditargetkan.
- 🟠 **WRITE = `signedIn()` saja** (Firebase Anonymous dihitung signed-in). Tidak ada cek role. Koleksi sensitif (`keuangan_buku_induk`, `rapor_semester`, `santri`, `guru`) bisa di-create/update/delete oleh client mana pun yang authenticated. Validasi yang ada hanya bentuk data, **bukan** otorisasi peran dan **bukan** field-level lock.
- **Akar arsitektur:** app pakai *custom auth + Firebase Anonymous*, jadi `request.auth` tidak punya klaim role → rules tak bisa cek peran. **Rekomendasi:** pindah ke Firebase Auth custom claims (set role via Admin SDK/Cloud Function), atau pindahkan operasi sensitif (keuangan/rapor write) ke Cloud Functions ber-Admin-SDK. Minimal: ubah READ koleksi sensitif dari `if true` → `if signedIn()`.
- 🟡 PSB & kritik_saran: `create` anonim (benar untuk form publik) tapi validasi minimal (hanya `nama`/`pesan`) → rawan spam. Pertimbangkan App Check / rate limit.

**Storage (`storage.rules` v.108.53):**
- 🟢 WRITE & DELETE butuh `request.auth != null` + size + content-type ✅; default-deny ✅; PSB `create` publik (benar).
- 🟡 READ semua path `if true` → `santri_foto`/`guru_foto` (foto orang) world-readable lewat URL.
- ⚠️ **Path `pembayaran_transfer` TIDAK ADA** di storage.rules (brief mengharapkannya). Path yang ada: `santri_foto`, `guru_foto`, `rapor_logos`, `psb/…`, dll. Upload bukti transfer (`pembayaran_konfirmasi`) belum punya path storage → kemungkinan fitur pembayaran upload **belum selesai** (sesuai PENDING: `PembayaranPendingView.vue` belum di-implement).

---

## §4. SECURITY — 🔴 1 critical

- 🔴 **CRITICAL — Admin password plaintext di Firestore yang public-read.**
  - `services/auth.js` L147–148: login admin divalidasi terhadap `settings.password || settings.adminPassword` (dibaca **client-side**).
  - `PengaturanView.vue` L1247: default `adminPassword: '1234'`. `ProfilPengaturanSaya.vue` L425: fallback `'1234'`.
  - `firestore.rules`: `match /settings/{docId} { allow read: if true }`.
  - **Dampak:** siapa pun bisa `GET https://firestore.googleapis.com/v1/projects/portal-mambaul-ulum/databases/(default)/documents/settings/general` → membaca `adminPassword` plaintext → login sebagai admin. Default `'1234'` memperparah.
  - **Rekomendasi:** (a) jangan simpan/validasi password di client; pindah verifikasi admin ke Firebase Auth (email/password) atau Cloud Function; (b) minimal — `settings` read jadi `if signedIn()` dan **jangan** simpan password di doc yang dibaca app; (c) ganti default `'1234'`.
- 🟢 **Firebase web API key** (`firebase.js` `AIzaSyB…`) = **web-safe** (identifier publik, bukan secret) ✅. Keamanan bergantung pada Rules (lihat §3).
- 🟢 **Tidak ada secret hardcoded** (service account / `BEGIN PRIVATE KEY` / token) di `vue-app/src` ✅. Hanya web API key yang match.
- 🟢 **HTTPS-only** di Capacitor (`androidScheme: https`, `cleartext: false`) ✅.
- 🟡 Secondary Firebase app untuk provisioning Auth user (`getSecondaryAuth`) — pola benar (createUser tanpa swap session). OK.

---

## §5. PWA — 🟠 TIDAK LENGKAP

`vue-app/index.html` (source) + `vue-app/public/`:
- 🟢 `theme-color #0f766e` ✅ · favicon `/logo.png` ✅ · `viewport-fit=cover` ✅ (safe-area).
- 🟠 **TIDAK ada `<link rel="manifest">`** di index.html → browser tidak menawarkan install. `dist/manifest.webmanifest` tidak ada (ENOENT).
- 🟠 **TIDAK ada `apple-touch-icon`** dan **TIDAK ada `apple-touch-startup-image`** (splash iOS) — brief minta ini.
- 🟠 **TIDAK ada service worker app** — semua match `serviceWorker` hanyalah milik internal Firebase Auth (IndexedDB sync), bukan SW PWA. Tidak ada offline caching.
- 🟠 **Aset PWA hilang dari `public/vue`** — hanya `bakafrawi-logo.png`, `logo.png`. Tidak ada `manifest.webmanifest`, icon 192/512/maskable, maupun `splash-*.png`. Splash di index.html mereferensikan `/splash-portrait-light.png` dll yang **tidak ada di build** → splash in-app jatuh ke warna solid.
- **Rekomendasi:** tambah `<link rel="manifest" href="/manifest.webmanifest">` + manifest valid (name, short_name, start_url, display:standalone, theme/background color, icons 192+512+maskable) di `vue-app/public/`; tambah `apple-touch-icon` 180×180 + `apple-touch-startup-image`; taruh splash PNG di `public/`; daftarkan service worker (workbox-cli sudah ada di devDeps).

---

## §6. ACCESSIBILITY (WCAG 2.1) — ✅ Bagus, 🟡 minor

- 🟢 **Focus indicator (2.4.7):** `App.vue` `:focus-visible { outline: 2px solid var(--theme-color); outline-offset: 2px }` + eksplisit untuk button/a/[role=button]/input/select/textarea. UiButton juga `focus-visible:ring-2`. **Visible** ✅.
- 🟢 **aria-label di icon button** (`AppHeader.vue`): hamburger "Toggle sidebar", dark toggle "Toggle dark mode", avatar "Menu profil" ✅.
- 🟢 **prefers-reduced-motion (2.3.3)** ✅ · StatusBar style inversion (text kontras light/dark) ✅.
- 🟡 **Touch target < 44px:** icon button header `w-10 h-10` = **40px**; `UiButton` size `sm` ≈28px / `md` ≈36px. Lulus WCAG 2.1 **AA** (min 24px, kriteria 2.5.8) tapi **di bawah target 44px** yang kyai minta (itu setara AAA/Apple HIG). Rekomendasi: header icon → `w-11 h-11` (44px); UiButton tambah `min-h-[44px]` untuk md.
- 🟡 **`user-select: none` global** (App.vue) di body/button/div/span/dll demi "native feel" → user tidak bisa select/copy teks (mis. nama santri) kecuali input/`.selectable`. Pertimbangkan whitelist lebih luas (tabel data).

---

## §7. PERFORMANCE — 🟠

- 🟠 **Bloat rekursif `public/vue/vue/vue/…`** — terkonfirmasi `public/vue/vue` dan `public/vue/vue/vue` ADA, dan ikut ter-merge ke Android assets (`…/mergeReleaseAssets/public/vue/vue/vue/vue/assets/…`). Tiap level menduplikasi seluruh build Vue → memperbesar AAB. **Akar:** copy `dist → public/vue` tanpa membersihkan (rsync `--delete` gagal di Windows mount, sesuai catatan KB). **Rekomendasi:** hapus `public/vue/vue` (dan turunannya) dari source; di script deploy pakai `robocopy /MIR` atau hapus folder tujuan dulu sebelum copy.
- 🟠 **Chunk besar:** `dist/assets/index-*.js` = **825 KB** (gzip ~216 KB), `StatistikView-*.js` = **226 KB**. `vite.config.js` `chunkSizeWarningLimit: 1000` menyembunyikan warning. **Rekomendasi:** `build.rollupOptions.output.manualChunks` untuk pisah vendor (firebase, chart.js) dari index; pertimbangkan lazy-load Chart.js hanya di Statistik.
- 🟢 **Subscribe leak:** semua composable yang subscribe punya pasangan cleanup (`onUnmounted`/`unsub`) — mis. `useSantri` (3 sub/12 cleanup), `useLembaga` (4/11). Tidak ada leak nyata. (`useKeuangan` 7 sub / 5 cleanup — review ringan, kemungkinan unsub di-batch.)
- 🟢 jsPDF/pdfmake lazy-loaded (drop ~250 KB initial) ✅ · Scheherazade WOFF2 (−75% vs TTF) ✅.
- 🟡 Kompresi ikon/splash: tidak bisa dinilai penuh karena aset PWA tidak ada di build (lihat §5). `appIcon.png` Electron 197 KB (bisa dikompres).

---

## §8. SMOKE TEST CHECKLIST (manual — untuk kyai eksekusi di device)

Audit kode/config + build sudah saya verifikasi. Langkah berikut butuh device fisik & mata kyai.

**Web (`ammuonline.web.app`):**
- [ ] Login admin + login guru/santri
- [ ] Navigasi sidebar semua menu (cek tidak ada blank/route error)
- [ ] Export PDF rapor (window.print → Save as PDF) hasil rapi
- [ ] Toggle dark mode (persist setelah reload)
- [ ] DevTools Console bersih (no error merah)

**Android (install AAB v.86 di device):**
- [ ] Login → **tutup app → buka lagi** → masih login (persistence, fix v.83 `_persistFullSesi`)
- [ ] Status bar terbaca di **light** DAN **dark** mode (teks tidak invisible)
- [ ] Export PDF → muncul **share dialog** (3-tier Filesystem fallback)
- [ ] Device ber-notch: konten tidak ketiban status bar (safe-area)
- [ ] Splash tampil benar (light/dark × portrait/landscape)

**Electron (install `Setup 86.0.526.exe`):**
- [ ] App load **TIDAK blank** (fix §0) — tampil login, bukan layar kosong
- [ ] Splash muncul (catatan: gambar splash mungkin solid color — isu sekunder §0)
- [ ] Window controls (min/max/close) + titlebar overlay ikut theme
- [ ] Print struk/PDF (jika printer tersedia)
- [ ] Abaikan log "AutoUpdate 404" (belum ada GitHub release)

---

## §9. ACTION LIST (prioritas)

**🔴 Sekarang (sebelum distribusi luas):**
1. Tangani admin password plaintext + `settings` public-read (§4). Ganti default `'1234'`.
2. Putuskan strategi otorisasi Rules: minimal READ koleksi sensitif → `if signedIn()`; idealnya custom claims / Cloud Functions untuk write keuangan & rapor (§3).

**🟠 Berikutnya:**
3. Bersihkan bloat `public/vue/vue/…` + perbaiki script copy (robocopy /MIR) (§7).
4. Lengkapi PWA: manifest + link + apple-touch + service worker (§5).
5. Commit fix Electron `src/index.ts` (§0); publish GitHub release atau matikan auto-update.

**🟡 Polish:**
6. manualChunks untuk pisah vendor (firebase/chart.js) dari index 825 KB (§7).
7. Touch target → 44px (header `w-11 h-11`, UiButton md `min-h-[44px]`) (§6).
8. Selaraskan Capacitor CLI ke ^8; hapus/arsipkan root `capacitor.config.json` + deps Cap 6 (§2).
9. Fix splash desktop (embed base64) (§0).

---

## CATATAN KERJA
- Satu file source diubah: `vue-app/electron/src/index.ts` (fix Electron). **Belum di-commit** — kyai yang commit.
- Build dijalankan: `vite build:electron` (exit 0) + `electron:make` (exit 0, Setup.exe ter-regenerate). **Tidak ada deploy.**
- File helper sementara ada di `tmp_recovery/` (`_run_electron.cmd`, `_run_vite.cmd`, log `_*.txt`/`_*.log`) — aman dihapus.
- Tidak ada perubahan ke Firestore/Storage rules, package.json, atau config — semua temuan §1–§9 baru rekomendasi, menunggu keputusan kyai.

**— END OF AUDIT —**
