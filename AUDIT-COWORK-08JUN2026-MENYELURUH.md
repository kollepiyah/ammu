# AUDIT MENYELURUH — Ammu Online (Portal MU)
> Senior Architect / Full-Stack Audit · 8 Juni 2026 (Cowork agent) · READ-ONLY (tidak ada kode yang diubah)
> Cakupan: Web/PWA · Capacitor Android (native) · Electron Desktop. Branch `feature/vue-migration`, HEAD `51fa48d`.
> Metode: pembacaan kode authoritative (D:\) + analisis statis (grep/cross-ref) + verifikasi sintaks parser murni-JS (`@vue/compiler-sfc` + `@babel/parser`). **Build penuh tidak dijalankan** (node_modules platform Windows; sesuai catatan KB).

Legenda severity: 🔴 Kritis · 🟠 Tinggi · 🟡 Sedang · 🔵 Rendah/Info

---

## 0. RINGKASAN EKSEKUTIF

| Dimensi | Status | Catatan utama |
|---|---|---|
| 1. Logika & fungsi | 🟢 Sehat | Auth/RBAC matang & konsisten. Gap: scope Kepala di StatistikView (T41), edge-case prepay POS. |
| 2. Filter | 🟢 Berfungsi | Semua filter (Y/M/D, route.query, dashboard) ter-wiring benar. Gap: konsistensi scope Kepala. |
| 3. Dead code & trash | 🔴 Berat | ~674MB legacy (root `public/`+`android/`), 174 build-artifact ke-commit, 93 file .md, beberapa orphan. |
| 4. UI/UX responsif | 🟡 Cukup–Baik | Pola matang (safe-area, tabel overflow). Breakpoint nyaris hanya `md:`; konflik max-width 1400 vs density. |
| 5. Performa | 🟡 Cukup–Baik | Lazy-load + prefetch terukur, store singleton bagus. Risiko: lib PDF/Excel via CDN (gagal offline). |
| **Keamanan** | 🔴 **Kritis (pra-rilis)** | Firestore rules: READ publik semua koleksi + WRITE/DELETE cukup `signedIn()` (anon = lolos). |

**3 hal paling mendesak sebelum rilis publik:**
1. 🔴 **Firestore rules** — data santri (PII anak), keuangan, guru bisa dibaca siapa saja; tulis/hapus bisa oleh siapa pun yang sign-in anonim. Proteksi CRUD super_admin hanya ada di UI, BUKAN di rules.
2. 🔴 **Higiene repo** — output build (`public/vue/assets`, `vue-app/electron/app/assets`) ter-commit → 412 perubahan menumpuk tiap build; ~674MB folder legacy; keystore lama ada di repo publik.
3. 🟠 **Konflik konfigurasi Capacitor** — `capacitor.config.json` root (remote, `webDir:public`) vs `vue-app/` (native, `webDir:dist`) belum disinkron; CLI `@capacitor/cli@7` ≠ core `@8`.

> Catatan positif: kualitas kode aplikasi inti (auth store, roleScope, router, composable data, scoping santri) sangat rapi, ber-versi, dan terdokumentasi. Temuan kritis terkonsentrasi di **konfigurasi rilis & keamanan rules**, bukan di logika fitur.

---

## 1. STATUS BUILD & KONFIGURASI

🟠 **Konflik dua config Capacitor.**
- Root `capacitor.config.json`: `webDir:"public"` + `server.url:"https://ammuonline.web.app"` → mode **REMOTE**.
- `vue-app/capacitor.config.json`: `webDir:"dist"`, tanpa `server.url` → mode **NATIVE**.
- Ada pula DUA project Android: root `android/` (legacy) dan `vue-app/android/` (aktif untuk AAB). Build resmi pakai `vue-app/`, jadi config NATIVE yang berlaku — tapi keberadaan config root yang remote membingungkan & berisiko salah pakai. KB v.108 sendiri menandai ini "belum disinkronkan". **Rekomendasi:** putuskan satu mode, hapus config + folder android root yang tak dipakai.

🟠 **Versi Capacitor tidak seragam.** `@capacitor/cli ^7.6.5` (devDep) sedangkan `@capacitor/core` & `@capacitor/android` `^8.3.4`. CLI beda major dari core → `npx cap sync` bisa warning/misbehave. Samakan CLI ke `^8`.

🔵 **45 file source v.108 belum di-commit** (App.vue, AppLayout, ModalPOS, PosSantriView, TabunganView, RiwayatPosView, BukuIndukView, KeuanganDashboardView, strukBuilder, escpImage, auth.js, router, dll) + firestore.rules + storage.rules.
✅ **Verifikasi sintaks: 45/45 LULUS** (parse-error = 0, null-byte = 0). Tidak ada korupsi file (kekhawatiran "Edit tool inject NULL" dari KB tidak terbukti pada kondisi file saat ini). Aman untuk di-commit setelah dites kyai.

---

## 2. AUDIT 1 — LOGIKA & FUNGSI

### Sehat ✅
- **Auth store (`stores/auth.js`)** — alur login (admin built-in / guru / santri), fallback lokal, `ensureAnonAuth()` di semua cabang, persist full-sesi (fix reopen-logout), `loadSesiFromUser` hanya jalan bila sesi kosong (anti-timpa). Koheren.
- **RBAC (`utils/roleScope.js` + `auth.cekHakAkses`)** — `isSuperAdmin`/`canCRUD`/`isAdminBiasa`/`isAdminKeuangan`/`isKepalaLembaga`/`isSupervisor` jelas & sesuai spec ("admin = full view tanpa CRUD/keuangan"; CRUD master & edit keuangan = super_admin).
- **Router guard (`router/index.js`)** — berlapis: `authReady` await → `isLoggedIn` → `meta.admin` → `meta.roleSistem` → `meta.noSantri` → `meta.keuangan` (`cekHakAkses`). Lazy-load semua view.
- **Composable data (`useSantri` + `stores/collections`)** — pakai **store singleton** (`ensure()` ber-guard `_started`), satu subscription dibagi semua komponen. Scoping santri benar: full-access (admin/super_admin/admin_keuangan) → Kepala via `lembagaScopeMatches` → guru via match `guru_pagi/guru_sore/guru_sekolah`.

### Temuan
🟡 **StatistikView — scope Kepala tidak lengkap (T41, masih terbuka).** `isAdminMode = isFullFilterRole(sesi)` mencakup Kepala/PJ, dan halaman ini memakai `santriRaw` (UNSCOPED) di hampir semua computed inti: `totalSantri`, `santriAktif`, `lembagaCount`, `kelasCount`, dan `<AdminStatsCharts :santri-list="santriRaw">` (`StatistikView.vue` L760, L969–1046, L1131, L1178, L1234–1240, L1375, L1422, L1436). Hanya kartu baru v.95 (Top5/Guru-Belum-Input/Kelas-Overload) yang pakai `scopedSantriAktif` (L1100). **Efek:** Kepala/PJ melihat angka total SELURUH pesantren di kartu KPI & grafik, bukan lembaganya saja → tidak konsisten dengan niat scoping.

🟡 **POS "Bayar di muka" — anti-dobel belum cek tagihan yang sudah LUNAS.** `ModalPOS.addPrepay()` (L181–184) mencegah duplikat terhadap `tagihanRows` (tunggakan di keranjang) + `extraItems` (prepay di keranjang), tapi TIDAK terhadap tagihan periode sama yang sudah `status:'lunas'` di database. Jika wali bayar-muka periode yang sama dua kali (sesi berbeda), berpotensi membuat tagihan lunas ganda. (KB juga menandai fitur Cicil #2 masih perlu tes kyai.)

🔵 **Route tanpa gate granular.** `naik-kelas`, `absensi-santri`, `tabungan`, `bisyaroh` dll tanpa `meta` → mengandalkan gating di level view. Santri tak melihat menunya, tapi deep-link mungkin. Pastikan view memang memfilter ke data sendiri (mayoritas sudah).

🔵 **Listener tak dilepas saat logout.** `stores/collections` subscribe sekali & tak pernah `unsubscribe` (termasuk saat logout). Untuk SPA umumnya aman, tapi setelah logout listener santri/guru tetap jalan di sesi anon.

---

## 3. AUDIT 2 — FILTER vs GLOBAL LOGIC

### Berfungsi ✅ (terverifikasi ter-wiring ke computed + template)
- **RiwayatPosView** — `filterYear/Month/Day` → computed `transaksi` (L207–209) + select (L320–333). ✓
- **TabunganView / Uang Saku** — `mutFilterYear/Month/Day` → `mutasiFiltered` (L615) → v-for + counter + empty-state. ✓
- **RekapDiniyahView** — baca `route.query.lembaga/jenjang` via `applyScope` + `watch(route.query, …, {deep,immediate})` (L217–229). ✓
- **KeuanganDashboardView** — `bukuIndukValid` (buang residu/tanpa-tanggal) → kartu (L69). ✓
- **BukuIndukView** — `residuBuku` + `bersihkanResidu` → banner + tombol (L233–244). ✓
- **Global logic** (`getLembagaGroup`/`lembagaScopeMatches` di `useLembaga`, `jenjang.js` sumber tunggal mapel Diniyah) dipakai konsisten di useSantri/useStatistikScope/RaporView/RekapDiniyah.

### Temuan
🟡 **Konsistensi scope Kepala antar-halaman.** `lembagaScopeMatches` dipakai di Data Santri, Rapor, Rekap Prestasi, Absensi Santri, useStatistikScope — TAPI **tidak** di StatistikView (lihat §2), InputBulanan, AbsensiGuru, dan RekapDiniyah (RekapDiniyah hanya scope via route.query/dropdown, bukan auto-scope Kepala). Filter tetap berfungsi, hanya scoping default untuk Kepala yang belum seragam.

🔵 `pembayaran_konfirmasi` rule mensyaratkan `santri_id is number`, sedangkan ID di app campur string/number → create bisa gagal untuk ID string. Perlu cek lapangan.

---

## 4. AUDIT 3 — DEAD CODE & TRASH

### Dead code di dalam app (aman dirapikan)
🟡 `components/dashboard/DashboardQuickActions.vue` — **orphan** (tak di-import; KB konfirmasi yatim sejak v.95).
🟡 `composables/useKartuKenaikan.js` — **orphan** (0 referensi). KB v.91 mengklaim fitur kartu kenaikan "jalan via useKartuKenaikan" — kini tak terpakai sama sekali. Perlu konfirmasi apakah fiturnya memang sudah pensiun.
🟡 Dead exports di `utils/strukBuilder.js`: `buildStrukSlipHtml`, `buildSlipTabunganHtml`, `buildStrukHtmlWide` — tak ada referensi eksternal (sejak pivot ke ESC/P). `cetakStrukSlipPdf` MASIH dipakai (preview PDF) → jangan dihapus.
🔵 Modal `notif` di `ProfilPengaturanSaya.vue` jadi dead setelah toggle push dihapus (KB).

### Trash / legacy di repo (besar) 🔴
- **Root `public/` ~324MB + root `android/` ~350MB** = ±674MB sisa app pra-migrasi & project Capacitor lama. TIDAK dikirim ke produksi (yang aktif `vue-app/dist` + `vue-app/android`) tapi membengkakkan repo.
- **Build artifact ter-commit ke git** (seharusnya gitignore): `public/vue/assets` (87 file) + `vue-app/electron/app/assets` (87 file) → biang **412 perubahan** muncul tiap build (`git status` selalu "kotor"). `vue-app/.gitignore` hanya cover `dist` + `node_modules`; `public/vue` & `electron/app` tidak.
- **93 file `.md`** di root (laporan audit/phase/handoff historis). `PROJECT_KNOWLEDGE_BASE.md` (underscore, 27KB) = duplikat DEPRECATED dari KB kanonik.
- **`tmp_recovery/` ~7.2MB** scratch (batch .cmd, dump) ter-commit — KB sendiri bilang "JANGAN commit isi sembarangan".
- File lepas root: `splash.duplicate-bak.png` (161KB), `firebase.json.bak` (0 byte kosong), `bakafrawi-logo.png` (911KB, KB: web tak terpakai), `logo-baru.png` (489KB), `preview-maskable-v109*.png` ×3 (±455KB).
- 🟠 **`ammu-app.keystore.OLD-lupa-password` ter-commit di repo PUBLIK** (`github.com/kollepiyah/ammu`). Keystore ini defunct (password hilang) jadi dampak terbatas, tapi keystore tidak boleh ada di git — bersihkan dari riwayat. Keystore AKTIF (`ammu-app.keystore`) TIDAK ter-track (benar). `google-services.json`/secret juga tidak ter-track (benar).

> Tidak ditemukan import yang rusak: referensi `tpqShift` di `v21_10_migration.js` hanya komentar (file `tpqShift.js` memang sudah dihapus, aman).

---

## 5. AUDIT 4 — UI/UX RESPONSIF SEMUA DEVICE

### Baik ✅
- `assets/main.css` matang: token CSS light/dark, `@supports env(safe-area-inset-*)` (fix overlap status bar/gesture bar, inset bawah di-own BottomNav — anti navbar mengambang), `@media print`, sembunyikan scrollbar mobile, `min-height:36px` untuk tombol (target sentuh).
- **Tabel responsif:** 12 view ber-`<table>`, SEMUA punya wrapper `overflow-x-auto` (cek "tabel tanpa overflow" = kosong). Tak ada tabel yang berpotensi pecah horizontal di HP.
- Mobile shell (BottomNav 5-tab role-adaptif, edge-swipe back, pull-to-refresh) + safe-area = pengalaman native yang konsisten.

### Temuan
🟡 **Breakpoint nyaris satu tingkat.** Pemakaian: `md:` 731× vs `lg:` 20× · `sm:` 17× · `xl:` 1×. Praktis layout hanya dua mode: <768 (mobile) dan ≥768 ("md"). Akibatnya:
- Tablet & laptop kecil (768–1280) memakai layout "md" yang sama → bisa terasa melebar.
- Layar besar mengandalkan trik CSS density (bukan kelas `xl:` per-komponen).
Bukan bug, tapi pengetatan responsif di rentang menengah/besar masih kasar.

🟡 **Konflik keputusan layout layar besar.** `main.css` density v.95 (#13) melebarkan `main > .max-w-7xl` → 1600px (≥1280) / 1840px (≥1536) DAN menaikkan kolom grid (2→3→4, 3→4→5). Tapi v.108 membungkus `<router-view>` di `AppLayout.vue` dengan `max-w-[1400px]`. → Pelebaran 1600/1840 ter-cap 1400 (saling meniadakan sebagian). Perlu diputuskan: pakai cap 1400 ATAU density lebar, jangan keduanya. (KB v.108 sendiri menandai ini "belum final".)

🔵 `user-scalable=no` dipertahankan (keputusan kyai) — membatasi pinch-zoom; trade-off aksesibilitas yang disengaja.
🔵 Verifikasi visual sebenarnya (gepeng splash, overflow modal di HP sempit) butuh device/emulator — di luar jangkauan analisis statis ini.

---

## 6. AUDIT 5 — PERFORMA

### Baik ✅
- **Code-splitting**: semua view `() => import()` (bundle awal kecil).
- **Prefetch terukur** (`router/index.js`): dibatasi 9 rute tersering, ditunda 4 detik setelah navigasi pertama, di-batch via `requestIdleCallback`, dan **skip saat Save-Data/2G**. Ini perbaikan tepat atas keluhan Lighthouse "page loaded too slowly".
- **Store singleton** (`collections.ensure`) — tidak ada listener berlipat saat composable dipakai banyak komponen.
- Aset login bg = base64 inline ~7KB (cepat, anti-404).

### Temuan
🟠 **Lib berat via CDN runtime → risiko offline.** `services/pdf.js` (jsPDF, jspdf-autotable, html2pdf, pdfmake) & `composables/useExcel.js` (ExcelJS) di-`injectScript` dari `cdnjs.cloudflare.com` saat fitur dipakai. Untung untuk bundle awal, TAPI di **app native/Electron tanpa internet**, semua ekspor PDF/Excel (Struk PDF preview, Rapor PDF, rekap, ekspor/impor tabungan) akan GAGAL. Untuk pesantren dengan koneksi tak stabil ini berdampak. (Cetak struk dot-matrix sudah aman karena pakai ESC/P canvas lokal, bukan jsPDF.) **Rekomendasi:** bundel lib ini secara lokal (npm) atau cache via service worker untuk fitur kritis.
🟡 **File view sangat besar** menyulitkan maintainability & menambah waktu kompilasi chunk: `NaikKelasView` 2405, `RaporView` 2231, `LembagaDetailView` 1861, `PengaturanKeuanganView` 1837, `PengaturanView` 1772, `StatistikView` 1509, `MasterDataView` 1466 baris. Pertimbangkan pecah komponen bertahap.
🔵 Total source `vue-app/src` ±48k baris (52 view, 29 komponen, 27 composable, 21 util) — sehat untuk skala fitur.

---

## 7. KEAMANAN (FOKUS — pra-rilis) 🔴

Repo `kollepiyah/ammu` **publik**; config Firebase klien memang publik secara desain — jadi keamanan bergantung SEPENUHNYA pada Firestore/Storage rules. Kondisi `firestore.rules` (v.108.44):

🔴 **READ publik untuk hampir semua koleksi** (`allow read: if true`): `santri`, `guru`, `keuangan_buku_induk`, `keuangan_tagihan`, `keuangan_tabungan_santri`, `keuangan_gaji`, `rapor_semester`, `absensi_*`, dst. Artinya **PII anak (NIK, nama orang tua, alamat, no HP wali), seluruh buku kas, gaji guru, dapat dibaca siapa pun** yang tahu project ID. Justifikasi di komentar = "perlu untuk lookup login lama"; tapi membuka SEMUA field SEMUA koleksi jauh melebihi kebutuhan itu.

🔴 **WRITE/DELETE cukup `signedIn()`** = `request.auth != null`. Karena app memberi **sesi Firebase Anonymous ke SEMUA user** (`ensureAnonAuth`, v.90+), syarat ini dipenuhi oleh siapa pun yang memanggil `signInAnonymously()` pada project. → Pembatasan "hanya super_admin yang boleh CRUD/hapus" hanya berlaku di UI, **tidak di server**. Penyerang anonim secara teknis bisa membuat/mengubah/menghapus santri, guru, tagihan, buku induk (tunduk hanya pada validasi field). Komentar rules "Anonymous attacker tidak bisa write" sudah tidak akurat sejak anon-auth diaktifkan.

Mitigasi yang disarankan (untuk dibahas, BUKAN dikerjakan sekarang):
- Aktifkan **Firebase App Check** (hadang pemakaian config dari luar app).
- Pindahkan READ data sensitif ke balik auth non-anonim, atau persempit field yang publik (hanya yang dibutuhkan login lookup).
- Tegakkan peran via **custom claims** (request.auth.token.role) untuk gating write/delete sensitif, atau pindahkan operasi kritis ke Cloud Functions (Admin SDK).
- Audit `storage.rules` dengan prinsip sama (perlu review terpisah).

> Konteks adil: ini fase **pra-rilis** (password default '1234' disengaja). Temuan ini "wajib beres sebelum publik", bukan indikasi pembobolan saat ini.

---

## 8. PRIORITAS TINDAKAN (menunggu komando kyai — belum ada yang dikerjakan)

**P0 — sebelum rilis publik**
1. 🔴 Perketat Firestore + Storage rules (read sensitif + write/delete berbasis peran / App Check).
2. 🔴 Gitignore output build (`public/vue/assets`, `vue-app/electron/app/`), keluarkan dari tracking; hapus `*.keystore*` dari repo/riwayat.

**P1 — kualitas & rilis**
3. 🟠 Sinkronkan satu config Capacitor (native vs remote) + samakan `@capacitor/cli` ke `^8`.
4. 🟠 Bundel lokal lib PDF/Excel (atau SW-cache) agar ekspor/rapor jalan offline di app native.
5. 🟡 Lengkapi scope Kepala di StatistikView (`scopedSantriAktif` untuk KPI & charts) + seragamkan di RekapDiniyah/InputBulanan/AbsensiGuru.
6. 🟡 POS bayar-di-muka: cek juga tagihan `lunas` periode sama (anti-dobel) + tes alur Cicil.

**P2 — kebersihan**
7. 🟡 Arsipkan/hapus legacy ~674MB (root `public/`+`android/`), rapikan 93 .md (pindah ke `docs/arsip/`), hapus duplikat KB underscore, file splash/preview/logo lepas, `tmp_recovery/` dari tracking.
8. 🟡 Hapus orphan: `DashboardQuickActions.vue`, `useKartuKenaikan.js` (konfirmasi dulu), dead export HTML-builder di `strukBuilder.js`.
9. 🔵 Putuskan konflik layout layar besar (cap 1400 vs density 1600/1840) + tambah breakpoint `lg/xl` untuk rentang tablet/desktop.

---

## 9. CATATAN PROSES
- Audit ini **tidak mengubah satu baris kode pun**. Semua di atas = temuan + rekomendasi.
- 1 file sementara tertinggal: `vue-app/node_modules/_sc.mjs` (skrip cek-sintaks; mount menolak penghapusan oleh agent). Inert & ter-gitignore (di dalam node_modules) — kyai bisa hapus manual bila mau.
- Verifikasi build sesungguhnya tetap di mesin kyai (`tmp_recovery\_run_vite.cmd`).
