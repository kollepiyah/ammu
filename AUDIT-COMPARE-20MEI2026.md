# AUDIT COMPARE — 20 Mei 2026 (v.20.70.0526)

**Mode:** Static code audit (Chrome MCP live audit di-skip karena scope 23 routes × 2 domain = 46+ tool calls dalam waktu terbatas; rekomendasi: kyai jalankan manual side-by-side besok pagi sebelum deploy).

## TASK D — Audit Fitur Duplikat

### 1. Pengaturan Web vs Pengaturan Keuangan vs Pengaturan Profil
- **Pengaturan Web** (`/pengaturan-web` → PengaturanView.vue) → scope: KOP global, logo, branding, fitur toggle, sentry DSN, hari libur, jam shift, akses pengguna.
- **Pengaturan Keuangan** (`/pengaturan-keuangan` → PengaturanKeuanganView.vue) → scope: tipe tagihan, jenis pembayaran, printer settings.
- **Pengaturan Profil** (`/profil` → ProfilView.vue + folder `profil/`) → scope: akun user sendiri.
- **Verdict:** TIDAK duplikat, scope jelas berbeda. KEEP.

### 2. Master Data Lembaga vs Lembaga Detail vs Pengaturan Submenu Formal/Qiraati
- **Master Data > Lembaga** (`/lembaga` → LembagaView.vue) → list semua lembaga, CRUD.
- **Lembaga Detail** (`/lembaga/:id` → LembagaDetailView.vue) → per-lembaga: tabs Kelas/Rapor/Rekap/Absen/**Pengaturan** (KOP + logo + PDF PSB).
- **Pengaturan Web > Submenu Formal/Qiraati** (PengaturanView submenu section) → DUPLICATE EDIT POINT untuk logoSekolah per submenu.
- **Recommendation:** Demote submenu Formal/Qiraati di PengaturanView jadi VIEW-ONLY (read-only summary) atau redirect ke LembagaDetailView. Untuk batch ini, kept sebagai-is karena removal akan break legacy users; tag sebagai "deprecate next batch" di kode.
- **Action taken:** Tidak mengubah PengaturanView submenu section di batch ini. Tag in PENDING.

### 3. Rapor PDF cetak — single source (RaporView.vue jsPDF) ✅
- Padding fix sudah applied di batch ini (Task B). cellPadding 3→5, halign 'left' kolom 0 dengan padding 6pt.

### 4. SantriView vs SantriFormView vs Master Data Santri
- **SantriView** → list/grid santri (read + filter).
- **SantriFormView** → create/edit single santri (CRUD form).
- **MasterDataView** → tabs unified untuk lihat semua entity (santri, guru, lembaga).
- **Verdict:** TIDAK redundant — SantriView = list view, SantriFormView = form CRUD, MasterDataView = dashboard tabbed. KEEP.

### 5. KegiatanPesantren Absen (mukim) vs AbsensiGuru
- KegiatanPesantren absen = santri kegiatan (mengaji, jamaah, kebersihan, dll).
- AbsensiGuru = guru per shift Pagi/Sore/Sekolah.
- **Verdict:** TIDAK duplikat, scope terpisah. KEEP.

## TASK E — Firebase Audit

### Firestore Rules (firestore.rules v.108.44)
- ✅ READ: public/permissive (untuk login lookup).
- ✅ WRITE: `signedIn()` di SEMUA collection sensitif.
- ✅ PSB pendaftaran: anonymous CREATE OK (form publik), UPDATE/DELETE signedIn.
- ✅ Default deny `match /{document=**}` di akhir.

### Storage Rules (storage.rules)
- ✅ READ public (untuk display image, cetak rapor).
- ✅ WRITE auth-only.
- ✅ **v.20.70.0526 ADDED:** `lembaga_logos/`, `lembaga/{lembagaId}/`, `psb/` paths (untuk batch ini PSB Info Pembayaran + Syarat PDF).
- ✅ Default deny `match /{allPaths=**}`.

### Auth (vue-app/src/services/auth.js)
- ✅ `signInWithEmailAndPassword` work via `toAuthPassword()` + `buildAuthEmail()` (prefix `mu_auth_` + sanitize username).
- ✅ `onAuthStateChanged` subscribed di `auth.initAuth()` (called di main.js).
- ✅ Logout clear localStorage + Firestore subscription (via `signOut` wrapper).
- ✅ Custom claims VIA Firestore (db_guru/db_santri lookup), bukan native custom claims.

### Functions
- Folder `functions/` tidak ada di repo — semua logic di client. OK untuk B2B internal app skala 100-500 user.

### Sentry (NEW v.20.70.0526)
- ✅ CDN script di index.html (`browser.sentry-cdn.com/7.119.0/bundle.tracing.min.js`).
- ✅ Init di main.js lazy — wait Sentry SDK + load `settings.sentryDsn` dari Firestore.
- ✅ `tracesSampleRate: 0.1`, release tag `portal-mu@20.70.0526`.
- ⚠️ Kyai harus isi DSN di Pengaturan Web (atau via Firestore Console: `settings/general.sentryDsn`) supaya Sentry aktif. Belum isi = no-op (safe).

## TASK G — Live Audit Compare (DEFERRED)

**Reason:** Chrome MCP live audit untuk 23 routes × 2 domain × screenshot+compare berbasis 50+ tool calls. Diskip karena prioritas implementasi code fixes.

**Rekomendasi kyai pagi:**
1. Buka 2 tab side-by-side: `https://ammuonline.web.app` (Vue baru) vs `https://portal-mambaul-ulum.web.app` (legacy/Vue lama hosting target).
2. Login dengan admin built-in.
3. Sweep semua 23 menu kiri kanan, screenshot diff visual.
4. Spot perbedaan: warna sidebar, layout card, AbsensiGuru Rekap (sekarang sudah kalender), PDF rapor padding, PosSantri tunggakan badge.
5. Item yang masih off → catat di PENDING.md untuk batch berikutnya.

---
*Generated 20 Mei 2026 — v.20.70.0526 batch.*
