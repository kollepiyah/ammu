# PROJECT KNOWLEDGE BASE — Ammu Online (Portal MU)
> Dokumen onboarding untuk sesi Claude baru. Baca ini DULU sebelum mulai. **Update terakhir: 4 Juni 2026 (v.93.0626 — UI/UX overhaul Cowork: splash+animasi Netflix, LED koneksi, sidebar fixed, status bar, PDF, gesture back). BELUM commit/build.**
> ⚠️ KB KANONIK = file ini (`PROJECT-KNOWLEDGE-BASE.md`). File lama `PROJECT_KNOWLEDGE_BASE.md` (underscore) DEPRECATED — abaikan.
> 👉 **RECAP TERBARU ada di PALING BAWAH** (cari "SESI v.93.0626"). Detail lengkap (8 addendum): `AUDIT-COWORK-03JUN2026-SPLASH-LED.md`.
> ⏳ **STATUS:** semua perubahan v.93.0626 SUDAH di file (D:\), BELUM commit. **Kyai WAJIB:** `git add -A && git commit --no-verify -F msg` → `npm run firebase:deploy` → `npm run build:aab` (vc93). Banyak fix NATIVE (splash/status bar/back/permission) → HANYA muncul di HP setelah AAB rebuild, BUKAN firebase:deploy.

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
Format `v.<versionCode>.<MMYY>` (MM=bulan, YY=2 digit tahun). Saat ini **v.93.0626** (versionCode 93, Juni 2026; vc 88-92 SUDAH dipakai → minimal 94 utk rilis berikut). Bump SEMUA tempat saat rilis AAB baru (Play Console tolak versionCode sama):
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

## 8. SPLASH (v.93.0626 — IN-APP ANIMATION; detail lengkap: `AUDIT-COWORK-03JUN2026-SPLASH-LED.md`)
- **v.93 FINAL (yg dipakai):** logo + footer disusun dari `public/logo.png` + `public/bakafrawi-footer.png` (gambar HTML `height:auto` → ANTI-GEPENG, footer sudah ada "Powered by"). Animasi **Netflix zoom-in 2 detik** di DALAM app (`index.html` `#splash-screen.reveal .splash-logo`, logo `top:45%`). Splash NATIVE (sistem+overlay) = JEMBATAN LATAR mint singkat TANPA logo: ikon `@drawable/splash_blank` (transparan), overlay `splash.png` transparan, `MainActivity` keepSplash 450ms. `main.js`: di native SKIP splash web (anti-DOBEL) → `revealSplash()` mainkan animasi. ⚠️ Aset Android lama TAK TERPAKAI lagi (boleh hapus): `splash_icon.png`, `splash_branding.png`, `splash_icon_anim.xml`, `splash_anim_*.png`, `bakafrawi-logo.png`(web). Slot branding Android 12 SENGAJA tak dipakai (men-stretch footer = gepeng di Samsung).
- (historis ↓ v.87)
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


---

## SESI v.91.0626 LANJUTAN (2–3 Juni 2026, Cowork agent) — RECAP TERBARU, BACA INI

> Lanjutan v.91. BELUM commit/build dari sesi ini — kyai yang commit + deploy/AAB di Windows.
> Fokus: polish mobile (PWA/Capacitor), bug fixes. Detail lengkap per-fix ada di `SESI-COWORK-02JUN2026-UI.md` (companion).

### ⚠️ PALING PENTING (sering kelupaan)
**App Capacitor = NATIVE bundle** (`vue-app/capacitor.config.json` `webDir:"dist"`, TANPA `server.url`). Maka:
- **`npm run firebase:deploy` HANYA update PWA + browser.** App Android yang terinstal TIDAK ikut berubah.
- **Semua perubahan .vue/.js + splash baru muncul di app HP setelah `npm run build:aab`.** Kalau kyai tes di app terinstal & belum berubah → itu karena AAB belum di-rebuild.

### APA YANG DIKERJAKAN (semua sudah edit + verifikasi, belum commit)
1. **Splash Capacitor Android compatible semua device** (NATIVE → butuh AAB). Akar: `splash.png` full-bleed + `CENTER_CROP` ke-crop di HP tinggi/tablet; `splash_icon` kepenuhan ke-clip mask Android 12. Fix (regen dari `/Splashscreen` pakai PIL, overwrite in-place, TANPA ubah config/styles): `splash_icon` ×5 densitas (logo ~64% + padding transparan, muat safe-circle Android 12) + `splash.png` ×22 (port/land/light/night → bg solid + logo + footer Bakafrawi DIKELOMPOK DI TENGAH = crop-safe). `splash_branding` (Android 12 bottom) tetap. styles.xml SplashScreen API sudah benar.
2. **Bottom navbar mengambang** — `assets/main.css`: inset bawah dihitung 2× (body padding-bottom + .h-screen -inset + BottomNav padding-bottom). Fix: body pad top/left/right SAJA; `.h-screen = calc(100dvh - inset-top)`; BottomNav jadi satu-satunya pemilik inset bawah. BottomNav + class `app-bottom-nav` (print-hide) + shadow atas.
3. **Ikon search mobile mengambang di tengah** — `GlobalSearch.vue` root + `flex-1` (justify-end → mengelompok ke kanan); `AppHeader` header + `gap-2 md:gap-0`.
4. **Dashboard Keuangan: Buku Induk 4 entri tapi grafik/saldo Rp 0** — `KeuanganDashboardView.vue` dulu cuma baca `t.tipe`+`t.nominal`+`new Date(t.tanggal)`. Sebagian entri pakai field `masuk`/`keluar` / tipe varian / tanggal lain → 0 (padahal BukuIndukView tampil pakai `b.masuk||b.nominal`). Fix: helper `arusOf(t)` (toleran 2 shape), `ymOf(t)` (parse ISO/DD-MM-YYYY/Timestamp), `isTabungan(t)`. KPI Tagihan/Tabungan/Bisyaroh = 0 itu WAJAR (koleksi kosong).
5. **SELALU LOGOUT saat reopen (SEMUA platform, bukan cuma PWA)** — `stores/auth.js`: (a) `login()` set sesiAktif langsung TAPI tak pernah `_persistFullSesi` → backup localStorage `portalMu_sesiAktif` kosong; (b) `onAuthStateChanged→loadSesiFromUser` set `sesiAktif=null` saat user Firebase tak match linked_uid/email/wa (kasus guru/super_admin login username spt Rahman Fanani). Fix: `_persistFullSesi(sesiAktif.value)` di tiap cabang login (admin/guru/santri); `loadSesiFromUser` hanya jalan `if(!sesiAktif.value)` (jangan timpa sesi ke-restore). ⚠️ User yg sudah login kode lama: harus LOGIN SEKALI lagi sesudah deploy utk seed backup.
6. **Breadcrumb DIHAPUS total** (semua halaman, semua device) — `AppLayout.vue` buang blok + import AppBreadcrumb.
7. **Status bar nutupin overlay** — sidebar drawer (`absolute inset-y-0`, viewport-anchored) & search overlay (`fixed inset-0`) escape body padding-top. Fix: `AppSidebar` aside + `GlobalSearch` overlay → `padding-top/bottom: env(safe-area-inset-*)`.
8. **Pull-to-refresh** (mobile shell) — BARU `composables/usePullToRefresh.js` attach ke `<main>`; refresh = re-mount view via nonce `:key` (re-subscribe). ⚠️ GOTCHA penting: composable return `{distance,refreshing,ready}` (refs) lalu diakses `ptr.refreshing` di template → **ref NESTED di objek biasa TIDAK auto-unwrap** → selalu truthy → spinner nyangkut. FIX: **destructure jadi binding top-level** (`const { distance: pullDist, refreshing: pullBusy } = ...`).
9. **Gesture back semua halaman mobile** — BARU `composables/useEdgeSwipeBack.js` (swipe tepi kiri → router.back, platform-agnostic, mobile-shell only, skip kalau ada overlay) + `App.vue` Android backButton diperbaiki (tutup sidebar dulu → `canGoBack` Capacitor → exit hanya di root).

### FILE BARU
`vue-app/src/composables/usePullToRefresh.js`, `vue-app/src/composables/useEdgeSwipeBack.js`.
### FILE DIUBAH
`assets/main.css`; `stores/auth.js`; `views/KeuanganDashboardView.vue`; `components/layout/{AppLayout,AppSidebar,AppHeader,BottomNav,GlobalSearch}.vue`; `App.vue`; + 27 PNG splash di `android/app/src/main/res/drawable-*/`.

### YANG HARUS KYAI JALANKAN
```bat
:: commit (binary png aman)
git add -A && git commit --no-verify -m "feat(v.91): splash Android crop-safe, safe-area overlay/navbar, fix logout reopen, dashboard keuangan, pull-to-refresh, gesture back, hapus breadcrumb"
:: PWA/browser
npm run firebase:deploy
:: app HP (WAJIB utk splash + semua fix di atas sampai ke app native)
npm run build:aab   :: versionCode 91 (kalau sudah keupload -> 92)
```
Tes sesudah deploy: login 1× lalu tutup-buka (harus tetap login), pull-to-refresh (spinner harus hilang), swipe tepi kiri = back.

### PENDING (belum dikerjakan)
- **Rebuild AAB** (splash + semua native JS) — kyai keputusan, tadinya ditahan.
- **Pensiun model TPQ-shift** (`utils/tpqShift.js` + tombol lama "Migrasi TPQ Shift") — migrasi v.88 sudah selesai jadi aman; cegah lembaga balik ke 'TPQ'+shift.
- **Audit menyeluruh vs LOGIC GLOBAL** (lembaga/jenjang/rapor/RBAC) — butuh app jalan + konfirmasi kyai.
- Dashboard Keuangan: kalau masih Rp 0 sesudah deploy → cek tanggal 4 entri (harus dalam 12 bln) di menu Buku Induk.

### GOTCHA SESI INI (utk sesi baru)
- **Cowork mount LAG**: file yg diedit via Edit-tool sering STALE di bash mount (compile `@vue/compiler-sfc` lewat mount kasih "Element is missing end tag" PALSU). Verifikasi pakai Read/Grep (Windows authoritative) + `node --check` utk .js. Build asli = kyai (`tmp_recovery\_run_vite.cmd`).
- **CRLF**: auth.js dll CRLF → edit multi-line bisa gagal match; pakai edit 1-baris (semicolon `;`) atau anchor pendek.
- **Vue ref unwrap**: jangan akses ref nested (`obj.someRef`) di template — destructure ke top-level dulu.


---

## SESI v.91.0626 — AUDIT + FIX (3 Juni 2026, Cowork agent) — RECAP TERBARU

> Detail lengkap di `AUDIT-COWORK-03JUN2026.md`. Semua edit LOLOS `vite build` (1756 modul, exit 0) via `tmp_recovery\_run_vite.cmd`. Branch feature/vue-migration. Commit oleh agent (git add -A, --no-verify).

### DIKERJAKAN
1. **Sidebar mobile menggantung — FIX AKAR:** `AppLayout.vue` root `<div>` tambah `relative` (containing-block drawer `absolute inset-y-0`); `AppSidebar.vue` hapus `padding-top: env(safe-area-inset-top)` (sisakan padding-bottom). Akar = drawer ter-anchor ke viewport/ICB bukan kotak app → tinggi tak deterministik. **Butuh AAB** utk HP.
2. **Lighthouse perf:** `router/index.js` prefetch SEMUA chunk → dibatasi 9 rute umum + ditunda 4s + skip Save-Data/2g (ini biang "page loaded too slowly"). `index.html`: FA + Google Fonts non-render-blocking (media-swap) + `<meta name=description>`. `user-scalable=no` DIPERTAHANKAN (kyai).
3. **Dead code dihapus:** `AppBreadcrumb.vue`, `utils/raporCompute.js` (superseded inline di RaporView), `stores/childPicker.js` (superseded useWaliChildren), `components/kartu/KartuKenaikanMatrix.vue` + `KartuKenaikanSchemaEditor.vue` (fitur jalan via useKartuKenaikan). Recover dari git bila perlu.
4. **EmptyState + PageHeader diadopsi:** EmptyState → SantriView + GuruView; PageHeader → SantriView (de-orphan + konsisten).
5. **firestoreSafe DI-AKTIFKAN:** `deleteOne()` (services/firestore.js) kini getDoc→backup ke `audit_log`→deleteDoc (best-effort) + `setAuditSesi()`; auth.js feed sesi; hapus santri (single+bulk) & keuangan (Tagihan/BukuInduk/Tabungan/Bisyaroh/HutangPiutang) di-migrasi ke deleteOne. GuruView sudah pakai deleteOne. **Hapus data kini ter-backup & bisa di-recover.**

### CARA KERJA (Desktop Commander, Windows authoritative)
- File-tools = Desktop Commander (akses D:\ langsung; bukan sandbox mount). edit_block normalize EOL saat match.
- Build verify: `& "C:\Windows\System32\cmd.exe" /c "...\tmp_recovery\_run_vite.cmd"` → baca `_vite_full.log`.
- git: `Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList ... -RedirectStandardOutput file` (pipeline `& git |` glitch "document in pipeline"). PATH stripped → cmd/git/node full-path.
- EOL: mayoritas CRLF; firestore.js/firestoreSafe.js/BukuInduk/Bisyaroh/HutangPiutang = LF. Sudah dinormalisasi per-file.

### PENDING (lanjutan)
- Audit RBAC/lembaga mendalam vs LOGIC GLOBAL → perlu device test multi-akun (RaporView schema sudah cocok).
- Pensiun `utils/tpqShift.js` + tombol "Migrasi TPQ Shift" (hati-hati, jangan balik migrasi v.88).
- Backup-sebelum-hapus untuk LEMBAGA (rewrite list di settings, bukan per-doc).
- PageHeader rollout ke view lain (incremental, cek visual).
- Dashboard Keuangan: kalau masih Rp0, cek tanggal entri Buku Induk (≤12 bln).

### YANG HARUS KYAI JALANKAN
`npm run firebase:deploy` (web/PWA) + `npm run build:aab` (WAJIB utk sidebar native + semua fix ke app HP). Tes: sidebar nempel dasar; hapus 1 data uji → cek koleksi `audit_log`; Lighthouse ulang.


---

## SESI v.93.0626 — UI/UX OVERHAUL (3–4 Juni 2026, Cowork agent) — RECAP TERBARU, BACA INI

> Lanjutan v.91. versionCode **93**, versionName **v.93.0626** (88-92 sudah dipakai). Branch feature/vue-migration.
> ⚠️ **BELUM commit, BELUM build.** Semua edit ADA di file (D:\, authoritative). Detail lengkap per-item (8 addendum) di `AUDIT-COWORK-03JUN2026-SPLASH-LED.md`.
> Mount sandbox Cowork LAG utk verifikasi build → gate asli = `tmp_recovery\_run_vite.cmd` (kyai). File-tools (Read/Edit) = D:\ authoritative.

### DIKERJAKAN (ringkas — detail di companion doc)
1. **SPLASH overhaul** (lihat §8): disusun dari logo (anti-gepeng), animasi **Netflix zoom-in 2 dtk in-app**, native = jembatan mint TANPA logo (anti-dobel), footer "Powered by Bakafrawi" gambar HTML. Logo `top:45%`.
2. **LED indikator online/offline** di top bar (`AppHeader.vue`): titik kecil hijau=online / merah berkedip=offline, SELALU tampil. Deteksi via `@capacitor/network` (native) + event `online/offline` (web). Ganti pill "Offline" lama.
3. **Sidebar anti-melayang** (`AppSidebar.vue`): drawer mobile `absolute`→`fixed` (penuh viewport), header/footer/close + `env(safe-area-inset-*)` → mengisi belakang status bar & gesture bar. Desktop `md:relative` (no-op).
4. **Status bar = warna header app + FIX kontras** (`App.vue` + `capacitor.config.json` + `styles.xml`): light `#FFFFFF`/dark `#1E293B`. Enum Style lama TERBALIK (komentar salah) → `isDark?Style.Dark:Style.Light`. Splash native me-reset appearance → **re-apply 600/1400/2200/3200ms + on resume** + native `windowLightStatusBar=true`.
5. **Gesture back semua halaman + back 2× keluar** (`App.vue` backButton): sidebar→overlay (event `android-back` cancelable; `ConfirmDialog`+`GlobalSearch` tutup diri)→navigasi back→home tekan 2× (toast). + `useEdgeSwipeBack` swipe tepi kiri tetap.
6. **PDF rapikan** (`utils/raporPdf.js` + `utils/pdfBuilder.js`): SEMUA tabel = **lebar KOP (F4 191mm) + center** (PTPT/Pra-PTPT margin→12/12, kolom rescale 191; `buildListPdf` skala penuh). Tabel rapor **NO FILL** (hapus shading abu/biru/kuning).
7. **Permission Android** (`AndroidManifest.xml`): eksplisitkan `ACCESS_NETWORK_STATE`, `VIBRATE`, `RECEIVE_BOOT_COMPLETED` (tadinya cuma ter-merge plugin).
8. **Ringan**: hapus 4 PNG splash web (~370KB) + ganti 22 PNG splash Android full-design jadi kecil/transparan → **AAB mengecil (wajar, bukan rusak)**.
9. **Bump v.93.0626** (9 titik: gradle/3×package.json/main.js/4 footer).

### FILE BARU
`vue-app/public/bakafrawi-footer.png` (footer "Powered by Bakafrawi" lengkap, di-crop dari `Splashscreen/Bakafrawi Logo (Footer).png`); `vue-app/android/.../res/drawable/splash_blank.xml`.
### FILE DIUBAH (utama)
`index.html`, `src/main.js`, `src/App.vue`, `capacitor.config.json`, `src/components/layout/{AppHeader,AppSidebar,GlobalSearch}.vue`, `src/components/ui/ConfirmDialog.vue`, `public/manifest.webmanifest`, `android/app/src/main/AndroidManifest.xml`, `android/.../res/values/styles.xml`, `android/.../MainActivity.java`, `android/app/build.gradle`, `package.json`(root+vue-app), `electron/package.json`, `src/utils/{raporPdf,pdfBuilder}.js`, `src/views/{DashboardView,LoginView,PpdbAdminView}.vue`. **Dihapus:** `public/splash-{portrait,landscape}-{light,dark}.png`.

### YANG HARUS KYAI JALANKAN
```bat
tmp_recovery\_run_vite.cmd        :: verifikasi build (VITE_EXITCODE=0)
git add -A && git commit --no-verify -m "release v.93.0626: splash+animasi Netflix, LED koneksi, sidebar fixed, status bar, PDF KOP-width no-fill, gesture back 2x, permission"
npm run firebase:deploy           :: web/PWA
npm run build:aab                 :: WAJIB (vc93) — splash/status bar/back/permission NATIVE hanya muncul lewat AAB
:: (opsional) npm run build:electron --prefix vue-app + robocopy dist->electron/app + electron:make
```

### TES SESUDAH BUILD (device, kyai)
- Splash: animasi zoom 2dtk, muncul 1× (tak dobel), logo+footer tak gepeng.
- Status bar: teks JELAS di mode terang DAN gelap (toggle).
- Gesture back: tiap halaman back mundur; di Beranda tekan 2× = keluar; dialog/search ditutup back.
- LED: hijau online, merah saat data/wifi mati.
- PDF: cetak rapor PTPT + Pra-PTPT + daftar guru → tabel selebar KOP + center, rapor tanpa shading.

### PENDING / BELUM (lanjutan)
- Aset Android splash lama tak terpakai (`splash_icon*`, `splash_branding`, `splash_anim_*`, `splash_icon_anim.xml`, web `bakafrawi-logo.png`) — boleh dihapus utk ramping (sengaja dibiarkan agar mudah revert).
- Backlog lama (belum disentuh): audit RBAC/lembaga mendalam vs LOGIC GLOBAL, pensiun model TPQ-shift, Dashboard Keuangan kalau masih Rp0, rollout `PageHeader` ke view lain bertahap, backup-sebelum-hapus utk lembaga.
- Splash di Electron: animasi web ikut jalan; kalau terasa dobel dgn splash native Electron, minta agent skip salah satu (khusus Electron).
