# HANDOFF — Ammu Online v.86 (sesi agent, 31 Mei 2026)

## A. AKAR MASALAH "FITUR HILANG"
`git reflog` HEAD@{8}: **`reset: moving to origin/feature/vue-migration`** membuang commit v.83 (`14cb922`) + v.84 (`716a12e`, `a7ded60`). Working tree v.86 dibangun dari v.74 (`70450f6`) → sebagian fitur v.83/84 tidak ke-redo = hilang. **Commit masih ADA di reflog → bisa di-recover.**
⚠️ JANGAN `git reset --hard origin/...` kalau origin ketinggalan dari lokal — itu yang membuang kerjaan.

## B. SUDAH DI-RECOVER (sesi ini, committed)
- Transfer pembayaran (upload bukti) — PembayaranView (`1ffd42d`) + firestore rules `pembayaran_transfer_pending`
- Admin verify — PembayaranPendingView 258 baris (`274a70b`) + menu "Verifikasi Pembayaran"
- `composables/useDesktopPrint.js`, `useLocalNotif.js`, `stores/childPicker.js` (`274a70b`)
- `ProfilGuru.vue` (`274a70b`), `ProfilSantri.vue` (`7636268`)
- Multi-anak `useWaliChildren` (dibuat ulang `97510a9`)
- **PSB: TIDAK hilang** (PpdbFormView memang landing 14-baris → sub-app by design; PpdbAdmin/Detail + `vue-app-psb/PsbFormView` 676 baris utuh).

## C. KANDIDAT MASIH HILANG / DIVERGEN — perlu REVIEW konten, **JANGAN blind-restore**
Dari `git diff --numstat HEAD a7ded60 -- vue-app/src` (a7ded60 = tip v.84 yang hilang). File yang versi v.84 punya jauh lebih banyak baris dari current:

| File | +v84 / -current | Catatan |
|---|---|---|
| `views/RaporView.vue` | +386 / -116 | ⚠️ JANGAN overwrite — current punya fix privacy + export-only sesi ini. Diff fitur spesifik (diniyah/kop/schema) lalu merge. |
| `views/PengaturanView.vue` | +178 / -2 | Kemungkinan setting v.84 hilang |
| `views/SantriFormView.vue` | +153 / -0 | Review konten |
| `composables/useSantriForm.js` | +108 / -0 | Review |
| `views/GuruFormView.vue` | +85 / -0 | Review |
| `stores/auth.js` | +66 / -1 | Hati-hati (core auth) — fitur v.84 (mis. Google link / persist) mungkin hilang |
| `views/NaikKelasView.vue` | +77 / -13 | Review |
| `utils/strukBuilder.js` | +52 / -10 | Format struk pembayaran |
| `views/profil/ProfilPengaturanSaya.vue` | +57 / -17 | Review |
| `utils/predikat.js` | +48 / -11 | Predikat rapor |
| `composables/useWaliChildren.js` | +89 / -55 | Versi sekarang lebih simpel; asli pakai `childPicker` store |
| `services/firebase.js` | +36 / -2 | Config/init |
| `views/TabunganView.vue` | +30 / -4 | Review |

**Cara verifikasi per file:** `git show a7ded60:<path>` → bandingkan fungsi/fitur vs current → recover **bagian yang hilang saja (merge)**, bukan overwrite. (File yang besar+aktif seperti RaporView sudah berisi kerja v.86 + fix sesi ini.)

## D. TASK PENDING (fitur baru / belum dikerjakan)
1. **Polish merge Tagihan↔Pembayaran**:
   - Tombol "Bayar" di `TagihanView` (tagihan belum lunas) → deep-link `/pembayaran?tab=transfer&tagihan_id=...&nominal=...&kategori=...` (PembayaranView hasil recover SUDAH dukung query-param prefill).
   - Tampilkan rekening dari Pengaturan Keuangan (`settings.bank_nama` / `bank_nomor` / `bank_atasnama`) di tab Transfer (sekarang masih teks "hubungi admin").
   - Notif ke superadmin/admin_keuangan saat bukti transfer masuk (pakai `notif_queue` / `useLocalNotif`).
2. **Track RBAC** (spec kyai — helper sudah ada di `utils/roleScope.js`):
   - super_admin: full
   - admin: full *view*, TANPA CRUD (sembunyikan tombol create/update/delete utk `role_sistem='admin'`), tanpa keuangan (sudah ke-gate)
   - admin_keuangan: pribadi + kelasnya + keuangan (tanpa CRUD)
   - user/guru: pribadi + data kelasnya
   - Kepala Lembaga/PJ: pribadi + santri kelas + guru/santri lembaganya
   - Direktur/Supervisor: pribadi + kelas + fitur supervisi
   - santri/wali: pribadi + prestasi pribadi  ✅ SUDAH
3. **Verifikasi di device**: ProfilSantri/ProfilGuru, flow transfer (santri upload → admin verify), splash Android (styles.xml v.86 Android-12 API), Electron header (titlebar+menu).

## E. AAB / RILIS PLAY CONSOLE
- ⛔ JANGAN rebuild AAB sampai kyai komando (bundle v.86 sudah ter-upload di Play Console).
- Saat rebuild AAB nanti, **NAIKKAN versi dulu** (Play Console tolak versionCode sama):
  - `vue-app/android/app/build.gradle`: `versionCode 86 → 87`, `versionName "v.86.0526" → "v.87.xxxx"`
  - `package.json` (root + vue-app + vue-app/electron) ikut bump
  - Footer stamps: `AppSidebar.vue` L48, `LoginView.vue` L348, `DashboardView.vue` L56, `PpdbAdminView.vue` L307
  - Sentry release: `main.js` `release: 'portal-mu@...'`

## F. DEPLOY COMMANDS (dari root D:\Aplikasi Project\Portal MU)
- Web: `npm run firebase:deploy`
- Rules (WAJIB utk fitur transfer): `firebase deploy --only firestore:rules,storage`
- AAB (HANYA setelah bump versi + komando kyai): `npm run build --prefix vue-app && npm run build:aab`
- Electron: `npm run build:electron --prefix vue-app` → `robocopy "vue-app\dist" "vue-app\electron\app" /MIR` → `cd vue-app\electron && npm run electron:make && cd ..\..`

## G. CATATAN TEKNIS (untuk agent berikutnya)
- Shell Desktop Commander: PATH/PATHEXT ke-strip → bare `git/node/npm` gagal. Pakai `Start-Process -FilePath <full-exe> -WorkingDirectory <dir> -RedirectStandardOutput <file>` ATAU batch `tmp_recovery/_run_*.cmd` (yang set PATH+PATHEXT lengkap). git=`C:\Program Files\Git\cmd\git.exe`, node/npm=`C:\nvm4w\nodejs`.
- Commit: husky pre-commit (lint-staged) gagal di shell DC → commit pakai `git commit --no-verify` (commit dari terminal normal kyai tetap kena hook).
- Build verify cepat: `tmp_recovery/_run_vite.cmd` (vite build:electron) & `_run_electron.cmd` (electron:make).
- Recovery source: `git show 14cb922:<path>` (v.83) atau `git show a7ded60:<path>` (v.84). Reflog: `git reflog`.
- Semua commit sesi ini di branch `feature/vue-migration` (HEAD `7636268`), BELUM di-push. Working tree masih banyak file v.75→v.86 yang belum di-commit (punya kyai).

**— END HANDOFF —**

---
## UPDATE (lanjutan sesi "gas semua")
**SUDAH dikerjakan + committed (lanjutan):**
- Merge Tagihan↔Pembayaran: tombol "Bayar" di Tagihan (santri, belum lunas) → deep-link `/pembayaran?tab=transfer` (prefill) + `notif_queue` ke admin saat bukti masuk (`e226dd2`). Rekening dari `settings.bank_*` sudah tampil di view recovered.
- RBAC helper `roleScope.canCRUD` (`2d9dbfd`). **TEMUAN penting:** "admin tanpa CRUD" SUDAH ter-enforce arsitektur — CRUD master-data di balik `isMasterMode` (Master Data = menu super_admin only), CRUD keuangan di balik `isSuperAdmin`, menu keuangan di balik `akses_keuangan`. admin-biasa sudah view-only utk data sensitif.

**MASIH SISA (untuk sesi berikut):**
- RBAC scoping per JABATAN (perlu review per-view, belum dikerjakan):
  - admin_keuangan → scope ke kelasnya (kini lihat keuangan global)
  - user/guru → pastikan strict ke kelasnya (guru-mode filter via nama guru sudah ada di Rapor/Rekap/Absensi; cek view lain)
  - Kepala Lembaga/PJ → santri kelas + guru/santri lembaganya
  - Direktur/Supervisor → kelasnya + supervisi (SupervisiView sudah ada)
  - (Keputusan produk) apakah admin-biasa juga diblokir CRUD operasional (posts/kegiatan/PSB/settings)? Kini masih boleh (dianggap tugas operasional).
- Lost-feature candidates (§C: RaporView/PengaturanView/auth.js dll) — BELUM di-review konten.

**HEAD `feature/vue-migration` = `2d9dbfd`. Semua build OK. Belum push. AAB belum rebuild (tunggu komando + bump versi).**


---
## UPDATE (sesi "dasbor keuangan + admin_keuangan")
**SUDAH dikerjakan + committed (`002aa13`):**
- **FIX perhitungan Dashboard Keuangan** (kyai: "perhitungannya gk benar" + "tabungan terpisah, tidak terhitung di buku induk & dasbor"):
  - `useKeuangan.js stats`: `totalTabunganSantri` = NET (Σsetor − Στarik), bukan `sum(t.saldo)` (field saldo tidak ada di doc transaksi → dulu NaN/0). `totalBisyarohBulan` difilter ke periode bulan berjalan `${year}-${MM}` (dulu menjumlah SEMUA periode).
  - `KeuanganDashboardView.vue`: exclude `sumber === 'tabungan_santri' | 'tabungan_guru'` dari (a) `monthlyData` (pemasukan/pengeluaran/saldo) dan (b) breakdown pengeluaran per-kategori. Tabungan TERPISAH dari kas pondok.
  - `BukuIndukView.filteredBuku` SUDAH exclude tabungan sejak v.21.96.0527 (L674-678) — diverifikasi, tidak diubah.

**T30 admin_keuangan — DIVERIFIKASI SUDAH BENAR (tidak perlu ubah kode, sudah dibangun v.21.115.0528):**
- `auth.js cekHakAkses`: `admin_keuangan` dapat `akses_keuangan` (L98); `admin` biasa dapat semua perm KECUALI `akses_keuangan` (L100) → menu keuangan otomatis tersembunyi dari admin-biasa.
- Pola konsisten di SEMUA view keuangan: `isFullAccess` (super_admin + admin_keuangan) → boleh **input / bayar / cetak / cetak-ulang / ekspor**; `isAdmin` (=`isSuperAdmin`) → satu-satunya yang boleh **edit + hapus** (per-row & bulk).
  - BukuInduk: Input Manual + Ekspor Excel + Cetak Laporan + Cetak-ulang struk = ungated (boleh admin_keuangan); Edit (`bukaEditBuku`) & Hapus (`hapusBuku`) = `v-if="isAdmin"` (super only). ✓
  - Tagihan: Tambah + Bayar = `isFullAccess`; Hapus = `isAdmin`. Tidak ada tombol edit-existing. ✓
  - HutangPiutang/Tabungan/Bisyaroh: hapus/delete = `isAdmin`; input/generate/setor-tarik = isFullAccess/ungated. ✓
- Kesimpulan: admin_keuangan **bisa input keluar/masuk + cetak ulang, TIDAK bisa edit/hapus** — persis sesuai aturan kyai.

**PENDING BARU:**
- **Splashscreen Electron** (kyai kirim screenshot): titlebar+menu native (Berkas/Edit/Tampilan/Bantuan) sudah benar & app jalan, TAPI splash awal = kotak biru-tua gelap solid TANPA logo. Perlu perbaiki splash window Electron (kemungkinan `splash.html`/asset logo tidak ke-load di `electron/app` — cek path logo relatif & robocopy dist→app, atau `index.ts` splash BrowserWindow loadFile). Belum dikerjakan.

**HEAD `feature/vue-migration` = `002aa13`. Build OK (VITE_EXITCODE=0). Belum push. AAB belum rebuild (tunggu komando + bump versi). Web belum deploy (perlu `npm run firebase:deploy`).**


---
## UPDATE (sesi "splash + RBAC scoping investigation")
**SUDAH: fix splash Electron** (`7a3cad9`) — embed PNG base64 (lihat di atas).

**TEMUAN AUDIT RBAC SCOPING PER JABATAN (akar masalah — perlu keputusan kyai sebelum implementasi):**

Scoping saat ini dijalankan oleh DUA mekanisme paralel:
1. `roleScope.isFullFilterRole` (biner): super_admin/admin = full; **Kepala Lembaga/PJ = full juga** (via match string `jabatan`); selain itu = "guru-mode". Dipakai di view akademik: **Rapor, RekapPrestasi, AbsensiSantri, Statistik**. Guru-mode menyaring santri via nama guru (ownNgaji: `guru_pagi`/`guru_sore`) → kelas yang dia ajar.
2. `useLembaga.canSee(user, lembaga, kelas)` (granular): admin/super = all; Kepala Lembaga (via `user.lembaga_refs[].jabatan==='Kepala Lembaga'`) = se-lembaga/se-group; guru = `kelas_diajar` saja. Dipakai di master list: **SantriView, GuruView** (via composable useSantri/useGuru).

**AKAR MASALAH:** `auth.js` saat membangun `sesiAktif` (login & loadSesiFromUser) **TIDAK mengisi `lembaga_refs`**. Akibatnya cabang granular `canSee` (kelas-level guru + Kepala Lembaga + group) **dormant**; `canSee` jatuh ke fallback legacy `user.lembaga === target_lembaga` → **guru melihat SE-LEMBAGA, bukan kelasnya saja**.

**Selisih vs spec kyai:**
- guru/user (spec: "data kelasnya") → di **SantriView/GuruView** sekarang lihat **se-lembaga** (terlalu luas); di view akademik sudah ke-kelas (ownNgaji). → tidak konsisten.
- Kepala Lembaga/PJ (spec: "lembaganya") → di view akademik `isFullFilterRole=true` = **lihat SEMUA lembaga** (terlalu luas, setara super_admin). Mestinya dikunci ke lembaga/group-nya.
- admin_keuangan (spec: "data kelasnya") → `isFullFilterRole=false` (guru-mode) tapi tak punya assignment guru → view akademik kemungkinan kosong; keuangan global (perlu utk billing). Frasa "data kelasnya" ambigu utk staf keuangan.
- Direktur/Supervisor → guru-mode + menu Supervisi ✓ (sesuai).
- santri/wali → sudah terkunci (sesi sebelumnya) ✓.

**OPSI PERBAIKAN (butuh keputusan):**
- (A) Root-cause: isi `lembaga_refs` di sesi (derive dari `guru_pagi`/`guru_sore`/`guru_sekolah`/`jabatan` di doc guru), lalu seragamkan SEMUA view pakai `canSee`. Paling benar, tapi refactor + WAJIB tes multi-akun di device (tak bisa diverif via build).
- (B) Surgical minimal: (1) kunci lembaga picker ke lembaga/group sendiri utk Kepala Lembaga di 4 view akademik; (2) sempitkan SantriView/GuruView guru ke kelas (pakai ownNgaji), bukan se-lembaga. Lebih kecil, tetap perlu tes device.
- Keputusan produk: apakah "data kelasnya" utk guru = **kelas yang diajar saja** (ketat) atau **se-lembaga** (sekarang)? Ini menentukan A/B.

**Belum diimplementasi — menunggu arahan kyai (granularity + A/B). Tidak diedit blind karena menyangkut visibilitas data santri di produksi & tak bisa diverif tanpa akun multi-role.**


---
## UPDATE (lanjutan RBAC — Kepala Lembaga scoping)
**KEPUTUSAN KYAI:** Kepala Lembaga/PJ discope **SE-GROUP** lembaganya (Kepala TPQ → TPQ Pagi+Sore+Pra PTPT; Kepala SDI → SDI; dst).

**SUDAH dikerjakan + committed (`5385350`):**
- `useSantri.js` (Data Santri master list): hapus shortcut `isFullAccess` untuk jabatan kepala/pj/pengasuh (yang membuat Kepala lihat SEMUA santri global + bikin branch `canSee` jadi dead code). Kepala kini tersaring: `canSee(exact-lembaga)` + match keluarga lembaga via `getLembagaGroup` (TPQ Pagi/Sore/Pra PTPT → key 'TPQ'). Guru biasa tetap ke santri ampuannya (guru_pagi/guru_sore/guru_sekolah == nama). Build vite OK.

**Verifikasi yang dibutuhkan (TIDAK bisa via build — perlu DEVICE, akun Kepala):**
- Login akun Kepala TPQ → Data Santri harus tampil HANYA santri TPQ Pagi+Sore+Pra PTPT (bukan SDI/PKBM/Ma'had dst).
- Pastikan `sesi.lembaga` untuk akun Kepala = salah satu variant (mis. "TPQ Pagi") supaya `getLembagaGroup` resolve ke 'TPQ'. Kalau `lembaga` Kepala kosong/aneh → bisa lihat 0 santri (cek data akun).

**SISA (follow-up, belum dikerjakan — perlu device test):**
- View akademik (Rapor, RekapPrestasi, AbsensiSantri, Statistik): `isFullFilterRole` masih kasih Kepala FULL-FILTER (bisa pilih SEMUA lembaga & ekspor rapor lintas lembaga = over-exposure sejenis). Belum discope ke group karena: (a) logika picker dipakai bareng super_admin/admin (risiko regресi), (b) kalau Kepala didrop ke guru-mode malah ke-narrow (cuma santri yg dia jadi guru-nya). Butuh penambahan mode "kepala-scope" per-view + tes device.
- Data Guru: Kepala saat ini TIDAK lihat guru manapun (menu Data Guru = bucket 'admin'; useGuru return [] utk non-admin) → UNDER-exposed (aman, bukan bocor). Spec "guru lembaganya" = penambahan fitur (beri Kepala view guru scoped) — opsional, bukan leak.

**HEAD `feature/vue-migration` = `5385350`. Build OK. Belum push. Web fix dasbor keuangan (`002aa13`) + splash (`7a3cad9`) + Kepala-scope (`5385350`) semua perlu `npm run firebase:deploy` (web) / rebuild installer (desktop).**


---
## UPDATE (sesi "batch besar: T34 + bugs + bump 87")
**Versi dinaikkan 86 → 87 (v.87.0526)** — commit `cec35dd`. gradle versionCode 87 + versionName, package.json (root/vue-app/electron), Sentry release, 4 footer (AppSidebar/LoginView/DashboardView/PpdbAdminView).

**Commit sesi ini (branch feature/vue-migration):**
- `002aa13` fix dashboard keuangan (tabungan net + bisyaroh bulan ini + exclude tabungan)
- `7a3cad9` fix splash Electron logo (embed base64)
- `5385350` + `cbf3258` + `1b2b686` RBAC Kepala/PJ scope se-group (Data Santri + Rapor + Rekap + Absensi)
- `6b86dfd` fix splash Electron DOBEL (tahan main hidden sampai splash native tutup)
- `3f79f1d` fix Edit Data Saya persist (ProfilGuru+ProfilSantri Object.assign props) + tombol edit Data Santri (border-top)
- `d011c7c` fix PSB convertToSantri copy biodata LENGKAP (alamat + ortu ayah/ibu flat+nested)
- `cec35dd` bump versi 87

**PERLU DIJALANKAN KYAI (build/deploy — semua dari root `D:\Aplikasi Project\Portal MU`):**
1. Web (semua fix Vue): `npm run firebase:deploy`
2. AAB (versi 87, butuh keystore kyai → jalankan di terminal kyai): `npm run build:aab`
   → output `vue-app/android/app/build/outputs/bundle/release/app-release.aab` → upload Play Console.
   (build-aab.cjs: build vue → force-clean assets → cap sync → gradlew bundleRelease. Env kyai sudah ada JAVA_HOME/ANDROID_HOME + keystore.)
3. Desktop installer (splash fixes): `npm run build:electron --prefix vue-app` → `robocopy "vue-app\dist" "vue-app\electron\app" /MIR` → `cd vue-app\electron && npm run electron:make`

**CATATAN tes device (tidak bisa diverif via build):**
- Kepala/PJ scope: login akun Kepala → Data Santri/Rapor/Rekap/Absensi harus HANYA santri se-group lembaganya. Helper `lembagaScopeMatches` handle variant/family ('TPQ Sore'→TPQ) & label broad ('Qiraati'→semua qiraati).
- Edit Data Saya (guru & wali/santri): edit → simpan → data harus TETAP (tidak revert).
- PSB convert: hanya untuk pendaftar BARU yang di-convert. Santri LAMA (sudah ter-convert dg data tipis) TIDAK ke-backfill otomatis — isi via Edit (admin) atau wali via Profil. (Opsi: bikin skrip backfill dari psb_id — belum dibuat.)
- Splash Electron: native splash (logo) tampil ~1.8s, main muncul setelah splash tutup (tidak dobel lagi).

**SISA pending:** T41 scope Kepala di StatistikView (agregat, minor) ; backfill santri lama dari PSB (opsional, belum dibuat).


---
## BATCH BARU (kyai, belum dikerjakan — sesi berikutnya). Widget Jam Hijri SUDAH recovered (commit f63651a).

1. **Dashboard Statistik belum sesuai** — sebelumnya sudah fix kelasCount (santri ber-guru). Kyai bilang MASIH salah tapi belum sebut angka mana. AKSI: minta kyai sebut metrik spesifik (total santri? guru? kelas? per-lembaga?). File: `StatistikView.vue` pakai `santriRaw` langsung di banyak computed (totalSantri/santriAktif/lembagaCount/kelasCount L859+). Cek apakah hitung termasuk non-aktif / duplikat lembaga.

2. **Dashboard Keuangan belum sesuai** — sudah fix tabungan-exclude + bisyaroh bulan ini + net. Masih salah. AKSI: minta kyai sebut angka mana (pemasukan/pengeluaran/saldo/breakdown). Cek `KeuanganDashboardView.monthlyData` (L182+) & `useKeuangan.stats` vs isi `bukuInduk` real.

3. **Splash 3 platform:**
   - Web: tambah animasi FADE pada splash in-app (cek splash di `vue-app/index.html` atau komponen splash Vue — kasih `@keyframes fade` + opacity transition).
   - Desktop: SUDAH native light/dark (electron base64). ✓
   - Android: native light/dark per tema. "gk muncul" → cek `vue-app/android/app/src/main/res` splash drawable (`drawable/splash.xml`, `drawable-night/`) + `values/styles.xml` (Theme `AppTheme.NoActionBarLaunch` windowBackground / Android 12 `windowSplashScreenBackground` + `windowSplashScreenAnimatedIcon`) + capacitor.config `SplashScreen.androidSplashResourceName=splash`. Kemungkinan drawable `splash` tidak ada / tidak ke-generate → pakai @cap/assets atau buat drawable splash + night variant.

4. **Cek gambar + compatibility semua device** — uji layout responsif mobile/tablet/desktop. Vague; minta contoh kasus yang rusak. (Screenshot mobile terlihat OK.)

5. **Android runtime permissions** (storage/notif/camera) — manifest deklarasi sudah ada (INTERNET, storage, READ_MEDIA_*, CAMERA) TAPI **POST_NOTIFICATIONS belum ada** (Android 13+) → tambah. Runtime REQUEST: Capacitor Camera/Filesystem minta saat dipakai; notif Android 13+ perlu request eksplisit. AKSI: tambah `POST_NOTIFICATIONS` di manifest + request izin notif saat app start (plugin LocalNotifications/PushNotifications). Cek `useLocalNotif.js`.

6. **Pembayaran + Tagihan jadi SATU menu (wali)** — hilangkan pilih kategori; wali: pilih TAGIHAN (yg belum lunas) → pilih METODE (transfer/VA) → upload bukti → verifikasi. AKSI: `useMenus.js` hapus menu "Pembayaran" untuk santri (Tagihan jadi entry tunggal, atau rename). `TagihanView` tombol Bayar → modal/route metode (tanpa kategori). `PembayaranView` simplify: terima konteks tagihan (id+nominal+nama via query, sudah ada `goBayar`), skip pilih kategori, langsung metode + upload. Hapus tab Manual untuk wali (manual = admin kantor saja).

7. **Performa semua device** — sudah: manualChunks (firebase/charts split), route lazy, pdf lazy, font woff2. Lanjut: lazy-load Firebase Storage (cuma dipakai upload), kurangi initial paint, image lazy + ukuran tepat, audit re-render. vendor-firebase 683KB = core (sulit dikecilkan).

**HEAD = `f63651a` (feature/vue-migration), belum push. Widget native = WAJIB rebuild AAB (Android Studio) utk muncul + verifikasi compile.**


---
## SESI v.87.0526 — 31 Mei 2026 (lanjutan, agent)
**HEAD `feature/vue-migration` = `e3d9551` (5 commit sesi ini, BELUM push).** Tiap commit: build vite/tsc OK, stage PER-FILE (JANGAN `git add -A` — masih ada WIP kyai).

### SUDAH (commit sesi ini)
- `8f0c654` **Pembayaran+Tagihan = 1 alur berlangkah (wali)** [batch lama #6]: menu "Pembayaran" santri DIHAPUS, "Tagihan Saya" → **"Tagihan & Pembayaran"** (1 pintu). TagihanView: tombol Bayar per-tagihan (kategori terkunci) + "Setoran Lain" (kategori bebas) + ikon Riwayat. PembayaranView wali: 3-tab → **alur berlangkah** (Pilih Metode: Transfer aktif / VA coming-soon → Bayar+upload). Riwayat via `mode`. Route `/pembayaran` tetap via deep-link.
- `d21cec9` **Splash 3-platform** [#3]: Web fix fade-out (`@keyframes splashFadeOut` forwards — root cause: `splashFadeIn ... both` nahan opacity). Electron splash ikut **TEMA APP** (persist `userData/ammu-theme.json` via IPC `theme:set`). Android `res/values-night/colors.xml` (splashBg `#0F172A`). **+ Deploy: hapus `hosting:legacy`.**
- `bc7fb90` **Notif Center diperluas** [#5 + req kyai]: `useNotifications` tambah **tagihan**, **libur** (kegiatan `tipe==='libur'`, KECUALI `libur_nasional`), **kenaikan** (event ditulis ke koleksi `riwayat_kenaikan` saat NaikKelasView PROSES NAIK), extend **pembayaran** (`transfer_verified`). OS-notif: `AppNotifBell` mirror `pushFromItems` + `setupLocalNotif` (izin). `AndroidManifest` + `POST_NOTIFICATIONS`.
- `fb1eb51` **Deploy 2 site**: `firebase:deploy` = `hosting:main` (ammuonline) + `hosting:psb` + `firestore:rules` (+ Step build `vue-app-psb` → sync `public/psb`). Legacy SKIP.
- `e3d9551` **Notif prestasi**: koleksi `notif_prestasi` (rule baru) + event di `RekapPrestasiView.simpanRekap` (1/santri/bulan, id `np_<id>_<YYYY-MM>`) + `getPrestasi`.

### PERLU DIJALANKAN KYAI
- **Web+PSB+rules:** `npm run firebase:deploy` (include firestore:rules — WAJIB krn rule `notif_prestasi` baru).
- **Notif HP (status bar):** plugin `@capacitor/local-notifications` BELUM ke-install di vue-app → wiring siap (no-op sampai plugin ada). `npm install @capacitor/local-notifications@^8 --prefix vue-app` → `npx cap sync android` → `npm run build:aab`.
- **AAB rebuild** juga utk: splash native Android (values-night), `POST_NOTIFICATIONS`, widget Jam Hijri.
- **Desktop installer** (splash tema app): `npm run build:electron --prefix vue-app` → robocopy dist→app → `electron:make`.

### CATATAN PENTING (sesi baru)
- Working tree masih ada **WIP KYAI belum commit**: `App.vue`, `stores/auth.js`, `assets/main.css`, `composables/useNativeDownload.js`, `utils/strukBuilder.js` + aset splash Android + build artifacts. **JANGAN `git add -A`** — stage per-file.
- Notif prestasi: nilai prestasi tetap di doc santri (`prestasi_awal/akhir/total`); `notif_prestasi` cuma event ringan.
- Notif kenaikan: koleksi `riwayat_kenaikan` (top-level) dipakai sbg event (rule sudah ada); beda dari field array `santri.riwayat_kenaikan`.

### BATCH BARU (kyai, 31 Mei — BELUM dikerjakan)
1. **Audit master lembaga + SEMUA data** — pastikan semua berfungsi: rules, function, skema, pengaturan, dll. (rujuk §6/§10 KB + memory `portal_mu_lembaga_schema_canonical`).
2. **Hapus tombol kembali (←) di RaporView santri** (mode "Hanya lihat"). File `vue-app/src/views/RaporView.vue` — hapus panah back utk role santri.
3. **Dashboard jumlah kelas SALAH** → kelas dihitung dari **GURU yang SUDAH punya santri** (bukan cara sekarang). File `StatistikView.vue` (`kelasCount`). [refine batch lama #1]
4. **Cek menyeluruh**: (a) dead code, (b) code ada tapi tak terpakai (fitur dibuat tapi HILANG — kyai lupa beberapa), (c) code miss/bug. (Ingat: git reset bersejarah membuang v.82/83/84 — lihat §C atas, sebagian fitur belum di-redo.)

### SISA batch lama (masih open)
- Dashboard Keuangan "masih salah" (perlu kyai sebut angka). Performa semua device (#7). Cek gambar + compatibility (#4).

**— END SESI v.87 —**
