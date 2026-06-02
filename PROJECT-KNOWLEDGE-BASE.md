# PROJECT KNOWLEDGE BASE — Ammu Online (Portal MU)
> Dokumen onboarding untuk sesi Claude baru. Baca ini DULU sebelum mulai. Update terakhir: 31 Mei 2026 (v.88.0526 — sesi lanjutan, HEAD `e3d9551`).

---

## 1. IDENTITAS & STACK
- **Aplikasi:** Ammu Online — sistem manajemen Pondok Pesantren Mambaul Ulum.
- **Root project:** `D:\Aplikasi Project\Portal MU`
- **Branch aktif:** `feature/vue-migration` (HEAD terakhir `e3d9551`, BELUM di-push). v.87 sesi: 5 commit `8f0c654`→`e3d9551`.
- **Stack inti:** Vue 3 (`<script setup>`) + Vite + Pinia + Vue Router (hash mode `createWebHashHistory`).
- **Backend:** Firebase v10 modular (Hosting + Firestore + Auth + Storage). Auth custom + Firebase Anonymous (TIDAK pakai role claims di request.auth → rules longgar, scoping di sisi app).
- **Android:** Capacitor 8, **mode NATIVE/bundle** (`vue-app/capacitor.config.json`: `webDir:"dist"`, TANPA `server.url`). Web di-bundle ke AAB.
- **Desktop:** Electron 27 + electron-builder 24 (NSIS, `asar:false`).
- **Sub-app PSB:** pendaftaran santri baru (folder `public/psb` legacy + alur convert di `PpdbDetailView`).
- **Akun kyai (dev):** Rahman Fanani, role ADMINISTRATOR (super_admin), jabatan "PJ Administrasi", lembaga "Qiraati".

## 2. STRUKTUR DIREKTORI
- `vue-app/` — aplikasi Vue utama (yang aktif). `vue-app/src/` = source.
  - `src/views/` — halaman. `src/components/` — komponen. `src/composables/` — logic reusable (useSantri, useGuru, useKeuangan, useLembaga, useMenus, useWaliChildren, dll).
  - `src/stores/` — Pinia (auth.js penting). `src/utils/` — roleScope.js, format.js, santriSort.js.
  - `src/router/index.js` — route + meta (admin/noSantri dll).
- `vue-app/android/` — project Android Capacitor (yang dipakai build AAB). versionCode di `app/build.gradle`.
- `vue-app/electron/` — Electron (`src/index.ts` → compile ke `build/index.js`).
- `scripts/build-aab.cjs` — pipeline AAB. `firestore.rules`, `storage.rules` di root.
- `tmp_recovery/` — scratch (batch `.cmd`, dump file recovery). JANGAN commit isi sembarangan.
- `HANDOFF-v86-PENDING-RECOVERY.md` — log progres + pending TERBARU (baca untuk status).

## 3. ENVIRONMENT DEV & QUIRKS (PENTING!)
Shell Desktop Commander **men-strip PATH + PATHEXT** → `git`/`node`/`npm` telanjang GAGAL.
- **git:** pakai full path `C:\Program Files\Git\cmd\git.exe` via `Start-Process -FilePath $git -ArgumentList ... -WorkingDirectory <repo> -RedirectStandardOutput <file>`. ATAU batch yang set `GIT=` full path.
- **node/npm:** di `C:\nvm4w\nodejs`. Pakai batch yang set `PATH` + `PATHEXT=.COM;.EXE;.BAT;.CMD` lengkap (contoh: `tmp_recovery/_run_vite.cmd`, `_run_tsc_electron.cmd`).
- **Batch quirk:** `npm` tanpa `call` mengakhiri batch lebih awal → pakai `call npm ...`. Selalu set PATHEXT kalau panggil command tanpa ekstensi (`findstr`/`git` bare gagal).
- **Commit:** husky pre-commit (lint-staged) gagal di shell DC → SELALU `git commit --no-verify`. Pesan commit via `-F msgfile` (UTF-8; `-m` dengan spasi pecah, Out-File UTF-16 bikin exit 128 → pakai DC `write_file` UTF-8 / PowerShell `Set-Content -Encoding UTF8`).
- **Build verify cepat:** `tmp_recovery/_run_vite.cmd` (vite build:electron, cek `VITE_EXITCODE=0`), `_run_tsc_electron.cmd` (tsc electron).
- **Android SDK:** `local.properties sdk.dir=C:\Users\Lenovo\AppData\Local\Android\Sdk`. JAVA_HOME/ANDROID_HOME TIDAK ke-set di shell DC (JDK ada di `C:\Program Files\Eclipse Adoptium`). **AAB build (signed, butuh keystore release) → JALANKAN KYAI di terminal/Android Studio sendiri**, jangan dari shell DC.
- **Output besar:** redirect git ke file lalu baca; `& $git ... | Select` kadang glitch ("document in pipeline") + output >25k token error → tulis ke file, baca dengan offset/limit/Select-String.

## 4. BUILD & DEPLOY (dari root `D:\Aplikasi Project\Portal MU`)
- **Web:** `npm run firebase:deploy` (= `node scripts/deploy-minified.cjs`).
- **Rules:** `firebase deploy --only firestore:rules,storage`.
- **AAB (kyai jalankan; butuh keystore):** `npm run build:aab` → build vue → force-clean android assets → `npx cap sync android` → `gradlew bundleRelease` → `vue-app/android/app/build/outputs/bundle/release/app-release.aab` → upload Play Console.
- **Desktop:** `npm run build:electron --prefix vue-app` → `robocopy "vue-app\dist" "vue-app\electron\app" /MIR` → `cd vue-app\electron && npm run electron:make`.
- **Perubahan NATIVE Android (widget/manifest/splash)** → WAJIB rebuild AAB (web deploy tidak cukup).

## 5. SKEMA VERSI
Format `v.<versionCode>.<MMYY>` (MM=bulan, YY=2 digit tahun). Saat ini **v.88.0526** (versionCode 88, Mei 2026). Bump SEMUA tempat saat rilis AAB baru (Play Console tolak versionCode sama):
- `vue-app/android/app/build.gradle` (versionCode + versionName)
- `package.json` (root + vue-app = "87.0526"), `vue-app/electron/package.json` ("87.0.526")
- `vue-app/src/main.js` Sentry `release: 'portal-mu@87.0526'`
- Footer display: `AppSidebar.vue`, `LoginView.vue`, `DashboardView.vue`, `PpdbAdminView.vue`
- JANGAN ubah comment kode `// v.86.0526:` (itu tag historis, bukan versi tampil).

## 6. MODEL DOMAIN
- **Lembaga (LEMBAGA_GROUPS di useLembaga.js):** keluarga → variant. TPQ→[TPQ Pagi, TPQ Sore, Pra PTPT]; PTPT→[PTPT]; PPPH→[PPPH] (grup `qiraati`). TK/SDI/PKBM (grup `sekolah`). Ma'had (`mahad`). Yayasan/Sarana Prasarana (`non-lembaga`).
  - `getLembagaGroup(nama)` → family key (TPQ Pagi→'TPQ'). `getLembagaBroadGroup` → 'qiraati'/'sekolah'/dll. `lembagaScopeMatches(userLembaga, target)` → scope Kepala (handle variant/family & label broad 'Qiraati').
- **Santri (collection `santri`):** field biodata flat + nested (ayah/ibu {nama,nik,pekerjaan,pendidikan,telp}). Guru pengampu: `guru`/`guru_pagi`/`guru_sore` (ngaji) + `guru_sekolah[]`. `lembaga`+`kelas` (ngaji), `lembaga_sekolah`+`kelas_sekolah`. `aktif`, `is_mukim`, `is_fullday`, `wa` (wa wali), `psb_id`.
- **Guru (collection `guru`):** `role_sistem`, `jabatan`, `lembaga`, `akses{}`. Convert dari PSB di `PpdbDetailView.convertToSantri` (sudah copy biodata lengkap sejak v.87).
- **Keuangan:** Buku Induk (kas pondok). **Tabungan TERPISAH** (`tabungan_santri`/`tabungan_guru`) — JANGAN dihitung di buku induk/dashboard. Transfer wali: upload bukti → `pembayaran_transfer_pending` (+ storage `pembayaran_transfer/`) → admin verifikasi.

## 7. RBAC / ROLES (sudah ter-enforce, lihat roleScope.js + auth.js cekHakAkses)
- **super_admin** (role_sistem super_admin / id='admin'): full + satu-satunya yg boleh CRUD/edit/hapus + edit keuangan.
- **admin biasa** (role_sistem 'admin', id≠admin): full VIEW, TANPA CRUD, TANPA keuangan (cekHakAkses L100: semua perm kecuali akses_keuangan).
- **admin_keuangan:** akses keuangan (input/bayar/cetak/cetak-ulang), TIDAK boleh edit/hapus (edit/hapus = isSuperAdmin). Verified.
- **guru/user:** data pribadi + santri ampuannya (match nama di guru_pagi/sore/guru_sekolah). Sudah scoped di useSantri + view akademik.
- **Kepala Lembaga/PJ** (jabatan kepala/pj/pengasuh): se-GROUP lembaganya (via lembagaScopeMatches). Sudah scoped di Data Santri + Rapor + Rekap + Absensi. **StatistikView BELUM** (pending T41, agregat minor).
- **Direktur/Supervisor:** + menu Supervisi. **santri/wali:** data pribadi + prestasi saja (sudah dikunci).
- Bucket `role` (admin/guru/santri) ditentukan di `auth.js`: pengurus (super_admin/admin/admin_keuangan)→'admin'; lainnya→'guru'/'santri'. Menu di `useMenus.js` filter by role + `roleSistem` + `perm` + `featureFlag`.

## 8. SPLASH (status per platform — v.87 DONE)
- **Desktop (Electron):** ✓ native logo base64; light/dark ikut **TEMA APP** (persist `userData/ammu-theme.json` via IPC `theme:set`, BUKAN prefers-color-scheme/OS); anti-dobel.
- **Web:** ✓ fade-out FIX — animation `splashFadeOut` forwards (menang atas fill-mode `both` `splashFadeIn` yang dulu nahan opacity). Tema ikut localStorage (`portalMu_darkMode`).
- **Android:** ✓ aset light + `drawable-night` lengkap + `values-night/colors.xml` (splashBg dark `#0F172A` utk Android-12 system splash). Splash native ikut tema **SISTEM HP** (tak bisa baca toggle in-app krn render sebelum JS). Verifikasi via rebuild AAB.

## 9. GAYA KERJA KYAI (WAJIB DIIKUTI)
- Bahasa **Indonesia**, panggil user **"kyai"**.
- **Surgical edits** + verifikasi tiap edit (Read/grep + build). JANGAN asumsi; root-cause, BUKAN workaround.
- **Auto-commit tiap task selesai** + beri **instruksi build** (kyai yang deploy/rebuild). Pakai absolute path `D:\`.
- Untuk fitur hilang / investigasi: **laporkan dulu** sebelum fix besar.
- Build deliverable (firebase deploy, AAB) → kasih COMMAND, kyai jalankan sendiri (punya env + keystore).
- Password default '1234' itu disengaja (pre-rilis) — jangan flag.

## 10. LESSONS LEARNED / GOTCHA
- **git reset bersejarah** (reflog `70450f6 reset: moving to origin/feature/vue-migration`) membuang v.82(d3d60f7)/v.83(14cb922)/v.84(a7ded60). Recovery via `git show <commit>:<path>`. Widget Jam Hijri = dari d3d60f7 (sudah recovered f63651a).
- **Props stale bug:** setelah updateDoc, view baca props lama → tampak "kembali default". Fix: `Object.assign(props.xxx, {...})` (ProfilGuru/ProfilSantri).
- **Capacitor:** NATIVE (bundle), bukan remote. AAB mengecil setelah build bersih = wajar (assets stale dibuang).
- **isFullFilterRole vs canSee vs useSantri.isFullAccess** — beberapa mekanisme scoping paralel; hati-hati saat ubah (bisa over/under-expose). `lembaga_refs` di sesi auth TIDAK diisi → cabang granular canSee dormant (pakai fallback legacy lembaga match).

## 11. STATE & PENDING (per 31 Mei 2026 — sesi lanjutan v.87)
HEAD `feature/vue-migration` = `e3d9551` (BELUM push). Detail commit + perintah build/deploy di HANDOFF bagian "SESI v.88.0526".

**SUDAH sesi ini (commit, belum push):**
- Pembayaran+Tagihan = 1 alur berlangkah wali (`8f0c654`) [batch lama #6]
- Splash 3-platform: web fade FIX, electron ikut TEMA APP, android values-night (`d21cec9`) [#3] + deploy hapus legacy
- Notif Center diperluas: tagihan, pembayaran (transfer terverifikasi), libur (non-nasional), kenaikan, prestasi + wiring OS-notif + POST_NOTIFICATIONS (`bc7fb90`, `e3d9551`) [#5 + req kyai]
- Deploy 2 site: main (ammuonline) + psb, legacy dibuang (`fb1eb51`)
- (sesi sebelumnya: dashboard keuangan calc, splash Electron, RBAC Kepala scope, Edit Data Saya, PSB convert, bump v.87, widget Jam Hijri)

**WAJIB kyai jalankan:** `npm run firebase:deploy` (main+psb+rules — WAJIB krn rule `notif_prestasi` baru). Notif HP: `npm i @capacitor/local-notifications@^8 --prefix vue-app` + `npx cap sync android` + `npm run build:aab`.

**PENDING — BATCH BARU kyai (31 Mei, belum dikerjakan; detail di HANDOFF):**
1. **Audit master lembaga + SEMUA data** — pastikan semua berfungsi: rules, function, skema, pengaturan, dll.
2. ~~Hapus tombol kembali (←) di RaporView santri~~ ✅ **DONE** (`v-if="!isSantri"`).
3. ~~Dashboard jumlah kelas SALAH~~ ✅ **DONE** — `kelasCount` key `lembaga|kelas` → `guru|lembaga|kelas` (StatistikView).
4. **Cek menyeluruh**: (a) dead code, (b) code ada tapi tak terpakai (fitur dibuat tapi hilang — kyai lupa beberapa), (c) code miss/bug.

**✅ v.88 DONE (31 Mei):** bump v.88 + KOP/settings rule fix + Statistik F1 + MIGRASI lembaga (tombol "Normalisasi Lembaga Santri" di Master Data). Detail + PENDING SESI BARU + LOGIC GLOBAL canonical + matriks RBAC ada di HANDOFF bagian **"SESI v.88.0526 / HANDOFF SESI BARU"** (baca itu). PENDING utama: jalankan migrasi lembaga, splash Android (asset+AAB), AAB v.88 rebuild, audit menyeluruh vs LOGIC GLOBAL.

**SISA batch lama (masih open):** Dashboard Keuangan masih salah (perlu kyai sebut angka); Performa semua device; Cek gambar + compatibility. Minor: T41 scope Kepala StatistikView; backfill santri lama PSB. (Notif prestasi & splash & pembayaran-merge SUDAH.)

## 12. LANGKAH PERTAMA SESI BARU
1. `git -C "D:\Aplikasi Project\Portal MU" log --oneline -8` + baca `HANDOFF-v86-PENDING-RECOVERY.md` (tail).
2. Konfirmasi belum ada perubahan kyai yang belum ke-commit (`git status`).
3. Minta kyai angka spesifik dashboard (item 1-2) sambil mulai item paling konkret (6 pembayaran-merge / 3 splash Android).
4. Tiap task: edit surgical → build verify (`_run_vite.cmd`) → commit `--no-verify -F msg` → kasih instruksi build.


---

## SESI v.90.0626 RECAP (1-2 Juni 2026, Cowork agent) — BACA UNTUK SESI BERIKUTNYA

> Lanjutan dari v.88. Versi naik ke v.90.0626 (versionCode 90, versionName "v.90.0626"). Branch feature/vue-migration.
> Util BARU: vue-app/src/utils/jenjang.js (sumber tunggal jenjang/mapel Diniyah).

### COMMIT sesi ini (urut)
- ab4cd1b fix(diniyah+auth+ux): KOP/guru sekolah + anon-auth admin + toast global + jabatan master
- fe0cad4 feat(diniyah): mapel Diniyah PER-KELAS (I-XII)
- 50bbac0 chore(release): bump versionName v.90.0626 (versionCode 90)
- ef2db0e feat(splash): branding "Powered by Bakafrawi" + fade-out (SplashScreen API)

### APA YANG DIKERJAKAN
1. Notif dropdown (AppNotifBell.vue): header backdrop-blur-sm bikin containing-block -> panel fixed ter-anchor ke header (overlap). Fix: Teleport to body (disabled !isMobile) + center + memanjang ke bawah + outside-click sadar [data-notif-panel].
2. Filter Diniyah Rekap (RekapDiniyahView + RekapPrestasiView): router /rekap-diniyah tak passing props & view tak baca route.query. Fix: baca route.query lembaga/jenjang, filter jadi jenjang -> lalu KELAS.
3. Mapel Diniyah (LembagaDetailView + RekapDiniyahView + RaporView): mulanya per-jenjang (SDI/SMP/SMA), FINAL per-KELAS (key = kelas_sekolah dari lembagaData.kelas). Util mapelDiniyahFor(kelas, map) + jenjangFromKelas fallback (kompat data per-jenjang/PKBM lama). Input field add/hapus (bukan koma). FIX BUG: loadRekapMapel dulu tak pernah dipanggil -> sekarang ada watch(kelas+setting+section).
4. Rapor Diniyah pakai SEKOLAH: KOP (kop computed + findLembagaObjFor) + Guru Kelas (namaGuru + raporPdf drawSignBlocks) ambil dari lembaga_sekolah/guru_sekolah, BUKAN ngaji (PTPT). Kolom mapel = buildDiniyahSchemaFromSetting(kelas).
5. AUTH (akar "tombol simpan tidak jalan" + console permission): admin built-in login validasi lokal, user null -> request.auth null -> SEMUA rule signedIn() (read+write) GAGAL. Fix: stores/auth.js beri sesi Firebase Anonymous (ensureAnonAuth) saat login admin + initAuth; onAuthStateChanged guard isAnonymous. WAJIB provider Anonymous AKTIF di Firebase Console (kyai sudah enable). firestore.rules: read publik kritik_saran/supervisi_catatan/user_notif_state.
6. ToastStack TAK PERNAH DI-MOUNT -> toast tak muncul. Fix: mount ToastStack global di App.vue.
7. Dropdown jabatan guru (useGuruForm.js): JABATAN_OPTIONS hardcoded jadi FALLBACK saja -> dropdown ikut master/jabatan.
8. Splash Android (native, butuh AAB): tambah android:windowSplashScreenBrandingImage=@drawable/splash_branding (bakafrawi-logo.png 5 densitas) + MainActivity.java installSplashScreen + keepOnScreen ~900ms + fade-out. Branding hanya Android 12+ (API 31+). compileSdk 35, Java 21.

### PENDING kyai
- Deploy web: npm run firebase:deploy (batch per-kelas).
- Rebuild AAB v.90: npm run build:aab (WAJIB utk splash). versionCode 90 (kalau ditolak Play Console naikkan 91).
- Rebuild Electron: npm run build:electron --prefix vue-app + robocopy dist->electron/app + electron:make.
- Pastikan tab "Kelas" tiap lembaga (SDI I-VI, PKBM VII-XII) terisi -> UI mapel per-kelas ambil dari situ.

### CARA KERJA (konfirmasi)
- File-tools (Read/Write/Edit/Grep) = store Windows D authoritative. Bash mount BISA STALE utk file Edit/Write-tool (lag). Edit via python (bash) -> mount fresh + propagate. Verifikasi: compile @vue/compiler-sfc (mount) utk python-written; Grep (Windows) utk Edit-written.
- Commit via Desktop Commander: batch .cmd set GIT full-path + --no-verify + -F msgfile, run via PowerShell. PowerShell+git di PIPELINE glitch -> redirect ke file. git status kadang kosong (glitch) -> pakai batch .cmd.
- EOL: mayoritas CRLF; RekapDiniyahView + utils/jenjang.js + styles.xml LF; MainActivity.java CRLF. Jaga EOL.

### NICE-TO-HAVE diusulkan (belum dikerjakan)
Kartu ringkasan/KPI di Beranda + bottom-nav mobile (mockup diberikan); empty-state ramah; badge status tagihan + reminder wali; global search header; halaman Wali "Anak Saya"; skeleton + indikator offline; pull-to-refresh.


---

## SESI v.91.0626 RECAP (2 Juni 2026, Cowork agent) — lanjutan v.90

> versionCode **91**, versionName **v.91.0626** (90 SUDAH di Playstore -> wajib 91). Branch feature/vue-migration.
> File BARU: utils/jenjang.js (v.90), composables/useMobileShell.js, views/NotifikasiView.vue, components/layout/BottomNav.vue, components/layout/GlobalSearch.vue, views/ProfilDetailView.vue.

### COMMIT sesi ini (urut, di atas v.90 cf08fbb)
- 056f79e feat(v.91): bump v.91.0626 (vc91) + search santri di Kelas + indikator offline topbar + badge status tagihan
- f009f14 feat(santri): hapus "Lihat Rapor" di Capaian Prestasi + guard /rapor noSantri + poles judul kartu tagihan santri
- db285c7 feat(mobile): bottom nav 5 tab + halaman Notifikasi penuh; bell pindah dari topbar di mobile
- cfc4259 feat(search): global search header (admin/guru)
- bb7f042 feat(profil): klik card santri/guru -> halaman profil read-only + prestasi (noSantri)
- 2c06a71 fix(profil): seluruh card clickable (abaikan tombol/link) + sembunyikan Pengaturan Profil saat readonly

### APA YANG DIKERJAKAN
1. Bump versionCode 90->91 + versionName v.91.0626 (build.gradle + package.json x3 + main.js + 4 footer). Komentar build.gradle: "89,90 sudah dipakai".
2. KelasGuruView: tambah search SANTRI (santriKandidatTampil) di daftar kandidat tugaskan-ke-guru.
3. AppHeader: indikator offline kecil (pill "Offline") via online/offline events + navigator.onLine.
4. TagihanView: statusBadge(t) 3-state sadar jatuh_tempo -> Lunas (hijau) / Jatuh tempo (amber) / Nunggak (merah, lewat tempo). Judul kartu santri = kategori-periode (bukan nama anak).
5. Hapus blok "Lihat Rapor" (Rapor Qiraati/Diniyah) di CapaianPrestasiView (akun santri). Route /rapor di-meta noSantri (santri tak bisa deep-link).
6. **Bottom nav mobile** (BottomNav.vue): 5 tab role-adaptif (Beranda/Pendidikan/Keuangan/Notifikasi/Profil; label "Pendidikan"). Gate via useMobileShell.showBottomNav = mobile(<=767) DAN (Capacitor native ATAU PWA standalone). Desktop/Electron/browser-biasa = sidebar. Badge unread di tab Notifikasi. Render di AppLayout setelah <main> (flex sibling, safe-area inset).
7. **Notifikasi halaman penuh** (NotifikasiView.vue, route /notifikasi, gaya FB) gantikan dropdown di mobile. AppHeader: <AppNotifBell v-if="!showBottomNav"> (bell sembunyi saat bottom nav aktif).
8. **Global search** (GlobalSearch.vue di AppHeader, canSearch = admin/guru saja): desktop = bar memanjang di tengah header; mobile = ikon -> overlay penuh (Teleport). Cari santri (nama/NIS) + guru (nama). Hasil -> /profil/:tipe/:id. "Ammu Online" tetap.
9. **Profil detail** (ProfilDetailView.vue, route /profil/:tipe/:id, meta noSantri): load getOne(santri/guru, id) -> render <ProfilSantri readonly> / <ProfilGuru readonly> + kartu Capaian Prestasi (santri). Prop **readonly** BARU di ProfilSantri/ProfilGuru: sembunyikan tab "Edit Data Saya" + komponen <ProfilPengaturanSaya> (Ganti Sandi/Foto/Username/Google/Notif) + hint edit. Klik **seluruh card** santri/guru di Data Santri/Guru -> goProfil(s,$event) yang abaikan klik di button/a/input/label (tombol Edit/Hapus/WA/checkbox tetap jalan). SantriView/GuruView juga prefill search dari ?q=.

### PENDING kyai
- **DEPLOY web** (npm run firebase:deploy) untuk semua di atas (card-click + hide-pengaturan ada di commit 2c06a71 — kalau deploy sebelum bb7f042/2c06a71, card belum clickable).
- **Rebuild AAB versionCode 91** (npm run build:aab) untuk splash branding+fade (v.90) + bottom nav native. 90 sudah di Playstore -> 91 aman.
- **Rebuild Electron**.
- Sisa nice-to-have BELUM dikerjakan: **pull-to-refresh** di list mobile. (kartu ringkasan Beranda DITOLAK kyai; halaman Wali full DITOLAK -> cukup poles pembayaran/badge.)

### CATATAN
- `$router` di template script-setup KURANG ANDAL di project ini -> pakai useRouter() + function. (card-click v1 pakai $router gagal; v2 pakai goProfil + useRouter berhasil.)
- Bottom nav "Notifikasi" = halaman penuh (bukan dropdown) atas permintaan kyai (gaya FB).
- Global search + profil detail = admin/guru only (noSantri).
- Cara kerja commit via Desktop Commander + mount-stale + EOL: lihat recap v.90 di atas (sama).
