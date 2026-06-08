# PROJECT KNOWLEDGE BASE — Ammu Online (Portal MU)
> Dokumen onboarding untuk sesi Claude baru. Baca ini DULU sebelum mulai. **Update terakhir: 5 Juni 2026 (v.95.0626 — Generate Tagihan Khusus/infaq, ikon Tabungan→dompet, login bg base64+blur, hapus QuickActions Beranda, bottom-nav guru→Rekap, Dashboard Statistik overhaul [Top5 PTPT/PPPH klik-detail + kartu Guru Belum Input + Kelas Overload, scope kepala/PJ], rapor auto-isi Guru Kelas (fallback shift), repo rilis→kollepiyah/ammu, bump vc95). LANJUTAN sesi: FCM push (Android plugin + web/VAPID + 4 trigger server) + fix auth anon (fcm_token bisa simpan) + hapus toggle notif manual, struk dot-matrix 9.5×11 (BUKTI dikotak, terbilang baris penuh, penyetor kiri/penerima kanan), Electron Win7 dual-build (Electron 22) + dropdown versi di download login. TETAP vc95 (belum upload Play Console).**
> ⚠️ KB KANONIK = file ini (`PROJECT-KNOWLEDGE-BASE.md`). File lama `PROJECT_KNOWLEDGE_BASE.md` (underscore) DEPRECATED — abaikan.
> 👉 **RECAP TERBARU ada di PALING BAWAH** (cari "SESI v.97.0626 — RAPOR REDESIGN FULL-ACF (8 Juni 2026)" lalu cari "SESI v.98.0626" di PALING BAWAH utk layout/rapor/statistik + catatan TRUNCATION raporPdf; dan **"SESI BMT-PETA"** di PALING BAWAH utk integrasi pembayaran VA santri + pencairan bisyaroh via BMT PETA). ⭐ **CETAK SLIP 2-ply (dot-matrix 9.5") FINAL = ESC/P GRAFIS RASTER** (`utils/escpImage.js` → `print:raw`, BYPASS driver): render canvas Arial → bit-image ESC/P. Driver Windows (PDF/HTML) = kosong/kotak/feed-5cm → JANGAN dipakai utk slip 9.5. Tombol "Struk PDF" tetap PDF (preview/unduh). No.Transaksi: MU-/TB-/US-/BS-NNNddmmyy. Recap sebelumnya: "BATCH 13 ITEM + STRUK SLIP PDF + FCM + VERIFY + NOTIF + NISN", "RECEIPT VIEWER + STRUK ESC/P", "FCM PUSH + STRUK + WIN7".
> ⏳ **STATUS:** perubahan v.95.0626 ADA di file (D:\). **Alur rilis kyai:** `tmp_recovery\_run_vite.cmd` → `git add -A && git commit --no-verify` → `npm run firebase:deploy` (web/PWA) → `npm run build:aab` (vc95 — WAJIB agar perubahan sampai ke app HP, krn Capacitor NATIVE bundle) → (desktop) `electron:publish` ke repo `kollepiyah/ammu`. Sesi v.95 = web/JS murni, tapi AAB tetap perlu utk app HP. **LANJUTAN aktivasi:** FCM butuh `google-services.json` di `vue-app/android/app/` + `npm i @capacitor/push-notifications --prefix vue-app` + `npx cap sync android` + `firebase deploy --only functions`. Win7 publish: HAPUS rilis GitHub `v95.0.626` lama dulu (electron-builder skip rilis >2 jam) lalu publish ulang. Detail lengkap di section "LANJUTAN: FCM PUSH + STRUK + WIN7" paling bawah.

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
Format `v.<versionCode>.<MMYY>` (MM=bulan, YY=2 digit tahun). Saat ini **v.96.0626** (versionCode 96, Juni 2026; vc 88-96 SUDAH dipakai → minimal 97 utk rilis berikut). Bump SEMUA tempat saat rilis AAB baru (Play Console tolak versionCode sama):
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


---

## SESI v.95.0626 RECAP (5 Juni 2026, Cowork agent) — BACA INI DULU

> Lanjutan v.93. versionCode **95**, versionName **v.95.0626** (88-94 sudah dipakai → ≥96 utk rilis berikut). Branch feature/vue-migration. Sesi panjang, banyak fitur. Semua edit terverifikasi authoritative (Read/Grep) + compile `@vue/compiler-sfc` utk file baru/kecil. Error "missing end tag"/"Missing }" pada StatistikView/RaporView/raporPdf/router saat compile lewat mount = **FALSE POSITIVE mount-lag** (region edit terbukti bersih via Read). Gerbang build asli = `tmp_recovery\_run_vite.cmd` (kyai).

### DIKERJAKAN
1. **Generate Tagihan Khusus** (`PengaturanKeuanganView.vue`): tombol + modal infaq/iuran SEKALI-JALAN, target fleksibel (semua / per-lembaga+kelas / pilih santri), dedup-safe (skip santri+kategori+periode sama), TIDAK menyentuh Syahriyah & tak butuh flag `auto_generate`. Tulis ke `keuangan_tagihan` (santri_id + created_at) → real-time muncul di akun santri/wali (TagihanView + notif "Tagihan baru") otomatis.
2. **Ikon Tabungan** `fa-piggy-bank`→`fa-wallet` (dompet) di: `useMenus`, `TabunganView` (×4), `KeuanganDashboardView`, `DashboardQuickActions` (key color-map). (kyai: ikon babi tak pantas utk pesantren).
3. **Login bg** (`LoginView`): blur `backdrop-blur-md`→`sm`; bg default jadi **inline base64** (`src/assets/loginBg.js`, webp 1000px ~7KB) — ringan + perbaiki bug fallback `/bg-pesantren.webp` yg 404 (TIDAK ada di `vue-app/public`, hanya di root `public/`). Override `settings.bgImage` tetap menang.
4. **Hapus Quick Actions Beranda** (`DashboardView`: import + `<DashboardQuickActions/>`). File komponen dibiarkan (yatim/unused).
5. **Bottom-nav GURU**: tab "Keuangan" (→`/personal`) jadi **"Rekap"** (→`/rekap-prestasi`, ikon `fa-book-open`). (guru tak punya menu pembayaran.)
6. **Dashboard Statistik overhaul** (detail di bawah).
7. **Rapor auto-isi Guru Kelas** (detail di bawah).
8. **Repo rilis dibetulkan → kollepiyah/ammu** (detail di bawah).
9. **Bump v.95.0626** (gradle vc95+vn; `package.json` root+vue-app "95.0626"; `electron/package.json` "95.0.626"; `main.js` Sentry; 4 footer: Sidebar/Login/Dashboard/PpdbAdmin).

### DASHBOARD STATISTIK (untuk admin/super_admin = SEMUA; kepala/PJ = se-lembaganya)
- **Scope baru:** `composables/useStatistikScope.js` → `scopedSantriAktif` (full admin=semua; kepala/PJ via `lembagaScopeMatches(sesi.lembaga, …)`), `guruBelumInput`, `kelasOverload`, `statusFromSelisih()`, const `RASIO_GURU_SANTRI`. (StatistikView dulu pakai `santriRaw` UNSCOPED — T41.)
- **Top 5 HANYA PTPT & PPPH** (`lembagaPrestasi` direstrukturisasi): nilai = selisih (akhir−awal) — PTPT "Hal", PPPH "Hadits". Tiap baris **clickable** → `/statistik/santri/:id`.
- **Band status:** PTPT `<5 / 5-9 / ≥10` (hal); **PPPH `<5 / 5-20 / >20` (hadits)** [kyai]. Distribusi Kurang/Cukup/Bagus kini utk KEDUANYA (dulu PTPT only).
- **Kartu "Guru Belum Input"** (bulan ini) → jml guru + total santri; klik → `/statistik/guru-belum-input`. Definisi "belum input" = santri NGAJI tanpa key `catatan_bulanan["YYYY_MM"]` (key ditulis `InputBulananView` saat simpan). Halaman: daftar guru (expand) + santrinya (klik→detail santri).
- **Kartu "Kelas Overload"** = per (guru×lembaga×kelas) NGAJI; overload bila jml santri > rasio. **Rasio: TPQ Pagi 1:5, TPQ Sore 1:10, Pra PTPT 1:5, PTPT 1:10, PPPH 1:10. Lembaga SEKOLAH = tanpa rasio (skip).**
- **Hapus pie "Prestasi Santri (per lembaga)"** (M9.b) dari `components/charts/AdminStatsCharts.vue` (+ buang `Pie` import, `extractNum`/`chartSantriPrestasi`/`chartOptionsPie`, `useSantri`/`santriList`).
- Route baru (`router/index.js`, meta `noSantri`): `/statistik/santri/:id` (`StatistikSantriDetailView`) + `/statistik/guru-belum-input` (`GuruBelumInputView`).

### RAPOR — auto-isi nama Guru Kelas
- Dulu: Diniyah=`guru_sekolah` (OK), tapi Qiraati/ngaji HANYA baca `s.guru` → MELEWATKAN `guru_pagi`/`guru_sore` → nama Guru Kelas kosong (`-`/`..........`/garis) utk santri shift (TPQ shift & banyak PTPT).
- Fix (konsisten LAYAR + PDF): Qiraati fallback `guru → guru_pagi → guru_sore`.
  - `RaporView.vue`: helper `guruKelasNames(s)` dipakai `namaGuru` + `ekgqGuru` (kode EKGQ/NRG ikut benar).
  - `utils/raporPdf.js` `drawSignBlocks`: `_gkRaw` fallback shift.

### REPO RILIS (GitHub) — DIBETULKAN
- Git origin asli = **`kollepiyah/ammu`** (public). Link download login + config publish electron DULU salah (`lexanoisgroup3/ammuonline` & `lexanoisgroup3/portal-mu` = repo lama → auto-update 404).
- Betulkan: `LoginView.vue` 3 link unduh (apk/ipa/exe) → `kollepiyah/ammu`. `electron/package.json` `build.publish`: `owner:kollepiyah, repo:ammu` + `nsis.artifactName:"AmmuOnline-Setup.${ext}"`.
- ⚠️ `ammuonline.web.app` (Firebase Hosting) = **BENAR, JANGAN diubah** — itu beda hal dari repo GitHub.
- Desktop publish (butuh token GitHub akun pemilik kollepiyah/ammu, scope `repo`):
  ```
  npm run build:electron --prefix vue-app
  robocopy "vue-app\dist" "vue-app\electron\app" /MIR
  $env:GH_TOKEN="ghp_..."
  cd vue-app\electron && npm run electron:publish
  ```
  → upload `AmmuOnline-Setup.exe`+`latest.yml` ke rilis v95.0.626. Link login `/releases/latest/download/AmmuOnline-Setup.exe` jadi berfungsi.

### DIKONFIRMASI (tanpa ubah kode)
- **Syahriyah generate** (tombol "Generate Bulan Ini" lama): santri TPQ Pagi tanpa nominal → TIDAK ditagih (skip `nominal≤0`); nominal per-lembaga/per-kelas akurat (lookup 3-lapis per_kelas→per_lembaga→default). Whitelist `lembaga_only` mengecualikan total. (Disimulasikan node — cocok.)
- **Rapor santri/wali** sudah disembunyikan (menu admin/guru, route `noSantri` redirect, blok "Lihat Rapor" dihapus v.91).
- **Permission CAMERA Android** SUDAH ADA di `AndroidManifest.xml` (CAMERA + READ_MEDIA_IMAGES + READ_EXTERNAL); upload struk pakai `<input type=file accept="image/*,.pdf">` (foto kamera / galeri). Tak perlu ubah.

### FILE BARU
`src/assets/loginBg.js`, `src/composables/useStatistikScope.js`, `src/views/StatistikSantriDetailView.vue`, `src/views/GuruBelumInputView.vue`.
### FILE DIUBAH (utama)
`views/{PengaturanKeuanganView,LoginView,DashboardView,StatistikView,RaporView,TabunganView,KeuanganDashboardView,PpdbAdminView}.vue`; `components/layout/{BottomNav,AppSidebar}.vue`; `components/dashboard/DashboardQuickActions.vue`; `components/charts/AdminStatsCharts.vue`; `composables/useMenus.js`; `utils/raporPdf.js`; `router/index.js`; `main.js`; `android/app/build.gradle`; `package.json` (root+vue-app); `electron/package.json`.

### YANG HARUS KYAI JALANKAN
```bat
tmp_recovery\_run_vite.cmd
git add -A && git commit --no-verify -m "release v.95.0626"
npm run firebase:deploy          :: web/PWA
npm run build:aab                :: vc95 (Play Console; WAJIB utk app HP — Capacitor NATIVE bundle)
:: desktop (opsional): lihat blok REPO RILIS (electron:publish ke kollepiyah/ammu)
```

### PENDING / CATATAN SESI BARU
- Tes device: kartu Statistik (Guru Belum Input / Kelas Overload) + Top5 PTPT/PPPH klik→detail; login **KEPALA/PJ** → data hanya lembaganya; rapor "Guru Kelas" terisi (PTPT/TPQ shift); bg login muncul instan.
- **Mount Cowork LAG parah** utk file besar yg di-Edit (StatistikView/RaporView/raporPdf/router) → compile/`node --check` lewat mount kasih error PALSU (truncated/"missing end tag"). Verif pakai **Read/Grep authoritative**; build asli `_run_vite.cmd`.
- Backlog lama tetap (lihat recap v.93): audit RBAC/lembaga vs LOGIC GLOBAL, pensiun model TPQ-shift, Dashboard Keuangan kalau Rp0, rollout `PageHeader`, backup-sebelum-hapus lembaga. Komponen `DashboardQuickActions.vue` kini yatim (boleh hapus).


---

## SESI v.95.0626 — LANJUTAN: FCM PUSH + STRUK + WIN7 (5 Juni 2026, Cowork) — RECAP TERBARU, BACA INI

> Masih versionCode **95** (kyai pilih TETAP 95 — belum upload Play Console). Tambahan besar di atas recap v.95 sebelumnya. Branch feature/vue-migration. BELUM commit (kyai).

### A. AUTH — FIX KRITIS (fondasi FCM + semua write santri/wali)
- Akar error toast "Missing or insufficient permissions": santri/wali/guru yg login lewat **FALLBACK LOKAL** (mayoritas — hanya punya doc Firestore, TANPA akun Firebase Auth) → `result.user=null` → `request.auth=null` → SEMUA write Firestore ditolak (rules `signedIn()`).
- Fix (`stores/auth.js`): tambah `await ensureAnonAuth()` di cabang login **GURU & SANTRI** (sebelumnya cuma admin). Kini tiap sesi punya sesi Firebase (anon fallback) → write (incl. simpan `fcm_token`) jalan. Provider Anonymous WAJIB aktif di Console (sudah).

### B. FCM PUSH (native Android + web/PWA + server)
- **Server SUDAH ada sebelumnya** (`functions/index.js`): `kirimNotifikasiMassal` (trigger `notif_queue/{id}` → `messaging.sendEachForMulticast`, cleanup token invalid dari `santri/guru.fcm_token`). Project sudah **Blaze**; FCM **V1 Enabled** (Console). Sender ID 289365012301.
- **Ditambah server:** helper `resolveTokensByTarget(target)` (target = `'semua'` | `{type:'santri',id}` | `{wa}` | `{lembaga}` | `{guru,nama}`); `kirimNotifikasiMassal` kini resolve token dari `target` kalau `tokens` kosong (server-side, aman). **4 trigger auto-push** (enqueue ke `notif_queue` → dikirim fungsi di atas): `onBerandaPostCreated` (pengumuman→broadcast SEMUA), `onTagihanCreated` (tagihan INDIVIDUAL→wali; SKIP bulk `auto_generate`/`generate_khusus` biar tak flood), `onPembayaranVerified` (status→`verified`→wali), `onKenaikanCreated` (`riwayat_kenaikan` = naik jilid/khotam→wali = "prestasi tertarget").
- **Client BARU** `composables/usePushNotifications.js`: NATIVE (`window.Capacitor.Plugins.PushNotifications`) register + simpan `fcm_token`; WEB (`firebase/messaging` + VAPID `BFcAMob-…`) `getToken`+`onMessage`. Token: role santri → `santri/{id}.fcm_token`; lainnya → `guru/{id}.fcm_token` (admin built-in skip). Di-wire di `App.vue` (`watch sesiAktif.id → register`). Electron skip (no-op).
- **Web SW BARU** `public/firebase-messaging-sw.js` (onBackgroundMessage + notificationclick → buka `/#link`).
- **Toggle "Aktifkan Push Notification" DIHAPUS** dari `ProfilPengaturanSaya.vue` (kyai: cukup izin Android otomatis). Modal `notif` jadi dead-code (boleh dibersihkan).
- Rules: TAK perlu ubah (santri/guru `update if signedIn()` + validasi id/nama; merge `fcm_token` lolos).
- **AKTIVASI kyai:** `google-services.json` di `vue-app/android/app/` (Android app `app.ammu.id` sudah didaftar Console) → `npm i @capacitor/push-notifications --prefix vue-app` → `npx cap sync android` → `firebase deploy --only functions` → `firebase:deploy` (web SW) → `build:aab` (native). Web push: Chrome/Edge (Android+desktop) & iOS16.4+ PWA.
- BELUM: web push perlu tes device; `notif_prestasi` bulanan sengaja TIDAK auto-push (flood); ESC/P struk (lihat C).

### C. STRUK dot-matrix (`utils/strukBuilder.js`) — match struk Yayasan
- 2 jalur: PDF (`cetakStrukPdf`, F4 — preview) + **TEKS 80-kolom** (`buildStrukWide` → cetak via tombol "Cetak Langsung"/Dot-matrix di POS). Yg ke 9-pin = jalur teks/HTML (Electron `printStruk`). Buram = HTML di-render jadi GRAFIS raster.
- Fix: `PAPER['9.5'].pageCss` → `@page size 241mm 279mm` (9.5×11 eksplisit) + `font-size:17px; font-weight:700; color:#000` (80 kolom mengisi PENUH lebar 9.5", tebal-hitam) + `print-color-adjust:exact`. (font 13px dulu cuma ~6.5" → kelihatan sempit.)
- Layout `buildStrukWide`: **"BUKTI PEMBAYARAN" dalam kotak** ASCII (`+--+ | | +--+`) kanan-atas sejajar nama yayasan; **Terbilang baris penuh** (dipindah dari kolom kiri yg ke-clip ~43 char); **Penyetor kolom 2 / Penerima kolom 50**.
- BELUM tuntas: kalau dot-matrix masih kurang pekat → perlu cetak **TEKS MENTAH ESC/P** (font bawaan printer) = perubahan Electron-main (`useDesktopPrint`/preload/index.ts), BELUM dibuat. Kyai tes cetak sendiri dulu.

### D. ELECTRON Win7 (dual-build) + LOGIN DROPDOWN
- `electron/package.json`: `electron:make:win7` + `electron:publish:win7` = `electron-builder --config.electronVersion=22.3.27` (Electron 22 dukung Win7; di-download otomatis utk build itu, TAK perlu install kedua) → `AmmuOnline-Setup-Win7.exe`. Build modern (`electron:make`/`electron:publish`) tetap Electron 27 (Win10+).
- `LoginView.vue`: tombol Desktop jadi **DROPDOWN** (Windows 10/11 = `AmmuOnline-Setup.exe`, Windows 7 = `AmmuOnline-Setup-Win7.exe`). `downloadDesktopWin7Url` (override `settings.downloadDesktopWin7`).
- ⚠️ **GOTCHA PUBLISH:** electron-builder **SKIP upload** kalau rilis GitHub `v95.0.626` sudah dipublish **>2 jam** (pengaman). Solusi: HAPUS rilis lama di GitHub → publish ulang (**win7 dulu, modern terakhir** biar `latest.yml` = modern). Atau upload manual `.exe`. ⚠️ Token GH yg ter-ekspos di screenshot kyai → **REVOKE/regenerate**.

### E. FILE BARU/DIUBAH (lanjutan)
- BARU: `composables/usePushNotifications.js`, `public/firebase-messaging-sw.js`.
- DIUBAH: `stores/auth.js`, `App.vue`, `views/profil/ProfilPengaturanSaya.vue`, `views/LoginView.vue`, `utils/strukBuilder.js`, `functions/index.js`, `electron/package.json`, `vue-app/package.json` (dep `@capacitor/push-notifications`).

### F. GOTCHA SESI INI
- **Mount Cowork LAG MAKIN PARAH** utk file besar yg di-Edit: `node --check`/compile lewat mount kasih error PALSU ("Unexpected end of input"/"Invalid package config"/"missing end tag"/truncated). Verif AUTHORITATIVE pakai **Read/Grep** (D:\). Build asli = `_run_vite.cmd` (web) + `firebase deploy` (functions di-parse saat deploy).
- Versi **TETAP 95** (kyai belum upload Play Console) — jangan bump tanpa diminta. Kalau nanti upload AAB ke Play Console & 95 ditolak → baru bump 96 (9 titik, lihat §5).

---

## SESI v.95.0626 — RECEIPT VIEWER + STRUK ESC/P (5–6 Juni 2026, Cowork) — RECAP TERBARU, BACA INI

> versionCode TETAP **95** (belum upload Play Console). Branch feature/vue-migration. **BELUM commit** (kyai lanjut di sesi baru). Lanjutan dari "LANJUTAN: FCM PUSH + STRUK + WIN7" di atas. Fokus: fix upload Posts, viewer struk/slip in-app (view-only), dan **PIVOT cetak struk dot-matrix dari HTML-grafis → TEKS ESC/P (raw print)** — KEPUTUSAN FINAL kyai.

### A. POSTS — fix upload gambar "maks 0MB"
- `views/PostsView.vue`: `MAX_TOTAL_BYTES`/`MAX_IMAGES` dulu cuma default saat setting 0 → admin set kecil bikin limit ~0MB (toast "maks 0 MB") walau auto-compress ada. Fix: floor `Math.max(setting,16384)*1024` (min 16MB) + `Math.max(.,5)` gambar. Auto-compress (>1MB→~1MB, maxDim 1600, JPEG q0.8) tetap jalan.

### B. RECEIPT VIEWER in-app (VIEW-ONLY, tanpa tombol cetak — kyai req)
- BARU `components/ReceiptModal.vue`: modal preview HTML + 1 tombol **Download PDF** (no print). 
- BARU `utils/receiptHtml.js`: `buildReceiptStrukHtml(trx,s)` (bukti pembayaran santri) + `buildSlipBisyarohHtml(slip,s)` — HTML gaya PDF (KOP, BUKTI box, 2-kolom, tabel, total, ttd).
- BARU `cetakSlipBisyarohPdf(slip,settings,{preview})` di `strukBuilder.js` (jsPDF, match desain `cetakStrukPdf`: KOP F4, "SLIP BISYAROH", line_items, take home, ttd).
- WIRING ikon **mata**: `PembayaranView.vue` (riwayat santri/wali) per baris → group `keuangan_buku_induk` per `trx_id` → ReceiptModal; download=`cetakStrukPdf(preview:false)`. `BisyarohView.vue` (daftar admin + kartu guru) → ReceiptModal slip; download=`cetakSlipBisyarohPdf(preview:false)`. "samakan dg desain PDF" = preview HTML ikut layout `cetakStrukPdf`.

### C. STRUK DOT-MATRIX → PIVOT KE ESC/P RAW ⭐ (kyai pilih "ESC/P teks tajam", BUKAN HTML grafis)
- HTML-grafis (`buildStrukHtmlWide` via `printStruk`) di 9-pin LX-310 = **blur** (raster) + 2 lembar (pageSize 11") + kekecilan (scaling). Karena itu PIVOT ke teks mentah.
- **`buildStrukEscposBase64(trx,settings)`** (`strukBuilder.js`): bungkus teks 80-kolom (`buildStrukText`→`buildStrukWide`) dgn ESC/P: `ESC @` init, `ESC G` double-strike, `ESC 2` 6 LPI, pitch (`ESC P`=10 / `ESC M`=12 / **`ESC g`=15 default** / `0x0F`=17 cpi), `ESC l` margin kiri (center), `ESC C n` form-length (n baris = tinggi slip), margin atas (CRLF×N), isi, `FF`. Return base64.
- **IPC `print:raw`** (`electron/src/index.ts`): tulis bytes→temp `.prn` + jalankan **PowerShell winspool.drv** (`Add-Type` C#: OpenPrinter/StartDocPrinter datatype RAW/WritePrinter) kirim byte MENTAH ke printer. Win7+ OK. Const `RAW_PRINT_PS1`. Tambah import `os`+`child_process` (execFile).
- `preload.ts`: expose `printRaw`. `useDesktopPrint.js`: `printRaw(payload)`.
- WIRING (paper '9.5'→printRaw; thermal tetap HTML): `PosSantriView.cetakLangsung`, `PrinterSettingsModal.tesCetak`, `RiwayatPosView.cetakDot` (reprint).
- **`buildStrukWide` dirombak ala gambar 2:** garis tipis tunggal (ganti `====`), kolom rata-kanan bersih (ganti titik-titik), **kotak BUKTI rata-KANAN-atas** (`padR(left,W-20)+box`), Penyetor/Penerima **di-tengah** tiap kolom, **total (Jumlah/Pembayaran/Kembali) satu band sebaris ttd di bawah**. Ringkas **±22 baris** → muat 1 slip.

### D. SETELAN STRUK in-app (atur tanpa rebuild — `PengaturanKeuanganView.vue`)
- Field baru (v-if paper '9.5'): **Ukuran font** (cpi 10/12/15-default/17), **Tinggi slip (baris)** (=tinggi inci×6, default 30≈12.7cm), **Geser ke kanan** (margin kiri/center, default 6), **Margin atas** (baris, default 2). Simpan→settings→`buildStrukEscposBase64` baca langsung. **Tanpa rebuild** utk penyesuaian.

### E. DATA struk
- Label **"Nomor Induk" → "NIS"** (PDF + mono).
- **Kelas gabungan** → `kelasFull(trx)` = "PTPT 2/SDI III" (semua builder). Caller (`PosSantriView` lastTrx, `PembayaranView`, `RiwayatPosView`) kirim `lembaga_sekolah`+`kelas_sekolah`.
- **Bulan/tahun rincian** "(Juni 2026)": `periodeTagihan(t)`=`t.periode||t.bulan||derive(t.jatuh_tempo)` (`PosSantriView`); reprint pakai `extractPeriode(keterangan)` (parse keterangan buku_induk verbose "jenis — nama (nis) — periode"). Berlaku pembayaran BARU (tagihan lama tanpa periode/jatuh_tempo tak ada datanya).

### F. PRINTER TROUBLESHOOT (PENTING — banyak waktu kebuang di sini)
- "Silent print berhasil tapi tak ngeprint" = **printer default salah** (Microsoft Print to PDF). FIX: Pengaturan Printer (app)→pilih EPSON LX-310→Simpan. Nama yg dikirim = `p.name` (benar).
- "Tes Page Windows pun tak keluar" (job status "Dicetak" tapi kosong) = printer **off-line / port salah / kabel**. FIX kyai: tekan tombol **On Line** printer + cek Ports tab + kabel. SETELAH ITU ESC/P keluar TAJAM (terbukti). 
- ⚠️ Perubahan Electron MAIN (`index.ts`/`preload.ts`) HANYA aktif setelah **INSTALL ULANG .exe** (`electron\dist\AmmuOnline-Setup.exe`) — `build:electron`+`robocopy` cuma update renderer.

### G. FILE BARU/DIUBAH (sesi ini)
- BARU: `components/ReceiptModal.vue`, `utils/receiptHtml.js`.
- DIUBAH: `utils/strukBuilder.js` (cetakSlipBisyarohPdf, buildStrukEscposBase64, buildStrukWide rombak+BUKTI kanan+ttd tengah+total band, kelasFull, NIS), `electron/src/index.ts` (print:raw+RAW_PRINT_PS1+os/child_process), `electron/src/preload.ts` (printRaw), `composables/useDesktopPrint.js` (printRaw), `views/PosSantriView.vue` (ESC/P+periodeTagihan+school class), `views/PembayaranView.vue` (eye+receipt), `views/BisyarohView.vue` (eye+slip), `views/RiwayatPosView.vue` (reprint ESC/P+extractPeriode+school class), `views/PengaturanKeuanganView.vue` (setelan struk), `views/PostsView.vue` (upload floor).

### H. PENDING (next sesi / kyai)
- **Rebuild + INSTALL ULANG .exe** utk ESC/P terbaru (BUKTI pojok kanan, ttd tengah, total band, periode, setelan in-app): `cd vue-app; npm run build:electron; robocopy dist electron\app /MIR; cd electron; npm run electron:make` → jalankan installer.
- **Tune di Pengaturan Keuangan → Penyetelan Struk**: Tinggi slip = ukur×6 (slip kyai ~12-14cm tinggi; **lebar belum disebut** → tanya utk set default geser-kanan), Geser kanan utk center, font 17 kalau kelebaran, margin atas kalau kepotong. Muat kertas pas perforasi atas (Load/Tear-Off).
- Masih pending dari recap sebelumnya: **commit**; FCM (`google-services.json` + `cap sync` + `firebase deploy --only functions`); **revoke GH token** ter-ekspos; electron republish (win7 dulu, hapus rilis lama).

### I. GOTCHA
- Mount Cowork LAG/TRUNCATED utk file besar → `node --check` lewat mount kasih error PALSU ("Unexpected end of input", file kepotong). Verif AUTHORITATIVE via **Read/Grep** (D:\) + render fungsi standalone di /tmp. Build asli = `_run_vite.cmd`.
- ESC/P keterbatasan (vs HTML gambar 2): font selalu fixed-width (bukan proporsional), garis pakai karakter, tak ada huruf tebal. Susunan bisa disamakan, gaya huruf khas dot-matrix — konsekuensi pilih "tajam".

---

## SESI v.96.0626 — BATCH 13 ITEM + STRUK SLIP PDF + FCM + VERIFY + NOTIF + NISN (6 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU

> versionCode **95→96**, versionName **v.96.0626**. Branch feature/vue-migration. Semua perubahan = WEB renderer + Cloud Functions + Firestore rules (TIDAK ada perubahan native Android/Electron main, KECUALI versionCode/Name). Lanjutan dari v.95 (receipt viewer + ESC/P).

### ⭐ A. STRUK RE-PIVOT: ESC/P → GRAFIS SLIP PDF (kyai BATAL ESC/P)
- **ESC/P (raw dot-matrix) DIBATALKAN.** Cetak 2-ply = **PDF slip grafis landscape** via **`cetakStrukSlipPdf(trx,settings,{preview})`** (strukBuilder.js): orientation `slipW>=slipH?'l':'p'`, format `[slipW,slipH]`, KOP teks polos (NO logo), kotak BUKTI dashed kanan-atas, info 2-kolom (Kelas tebal, NO Status Siswa), rincian dotted-leader + periode, band TOTAL, ttd Penyetor/Penerima (NO Petugas).
- **2 MODE**: (1) **Struk PDF** = `cetakStrukPdf` (F4 kop+logo, download) — TIDAK diubah; (2) **Struk Print 2-ply** = `cetakStrukSlipPdf` — SEMUA jalur 2-ply diunifikasi ke sini (PosSantriView.cetakLangsung '9.5'→printPdf, cetakLastDot→preview, RiwayatPosView.cetakDot, PrinterSettingsModal.tesCetak, BukuIndukView dot mode).
- **Default 220×140mm (22×14cm)** per batas potong (was 210×130) — di strukBuilder num default + form Pengaturan (posStrukSlipW/H/TopMm init/load/simpan/placeholder/max). Settings tersimpan MENANG atas default → kalau kyai sudah pernah simpan, set 220/140 manual.
- `cetakSlipTabunganPdf(mut,settings,{preview,saldo,santri,label})` BARU — slip setor/tarik (label "BUKTI SETOR/TARIK <TABUNGAN|UANG SAKU>").

### B. BATCH 13 ITEM (semua DONE)
1. **Cicil** (bayar sebagian→sisa): defensive PosSantriView.handleSimpan (tagUpdErr surface) + TagihanView.getSisa (dibayar fallback) + verify kurangi tagihan (D). **MASIH PERLU TES KYAI (#2 in-progress).**
2. **Tagihan khusus tak muncul POS**: PosSantriView.openModal query DUAL string+number santri_id (no limit), merge Map.
3,8. **Filter per-guru Master Tunjangan + Potongan**: items + `guru_ids[]` + panel assign (search+checkbox) PengaturanKeuanganView; BisyarohView `applicableMaster(key,g)` filter guru_ids (kosong=semua) → inject line_items/potongan saat pilihGuru + bulk-generate.
4. **Filter santri Syahriyah**: jenis `nominal_per_santri{}` + UI per-santri search; generate 4-lapis (santri→kelas→lembaga→default).
5. **Auto-generate CRON**: CF `autoGenerateTagihanBulanan` (onSchedule 'every day 01:00' WIB, idempotent, baca settings/general.keuTagihanJenis+keu_jatuh_tempo, jenis auto_generate, dedup periode-scoped, broadcast 1 notif santri_semua). Kill-switch `keu_auto_generate_cron` (toggle Pengaturan, default ON). **Tombol manual "Generate Bulan Ini" TETAP.**
9. **Ekspor PDF rekap bisyaroh**: `exportRekapBisyarohPdf` (F4 landscape tabel+TOTAL) + tombol di tab Riwayat BisyarohView.
10,11. **Tabungan ekspor/impor + cetak slip**: useExcel (ExcelJS CDN) exportSimple(template)/importFile(impor cocok NIS/nama); `exportRekapTabunganPdf`; header PDF/Template/Impor + cetak slip per mutasi.
12. **UANG SAKU ma'had**: TabunganView di-PARAMETRIZE by route `mode` (meta.mode='uangsaku'). `isUangSaku`/`COLL`(keuangan_uang_saku_santri)/`pageTitle`/`mutasiSource` (admin uangsaku subscribe lokal `uangSakuMutasi`; tabungan tetap useKeuangan.tabunganSantri). Picker filter `is_mukim===true`. Route `/uang-saku` + menu "Uang Saku"(admin)+"Uang Saku Saya"(santri). Rule `keuangan_uang_saku_santri`. Semua teks mode-aware (kategori "Umum/Sukarela/.." drop prefix Tabungan). **Default mode tabungan TIDAK berubah.**
13. **Card responsif desktop**: assets/main.css `@media(min-width:1280/1536px)` `main .grid.md\:grid-cols-2/3:not(:has(input/label/select/textarea))` naik kolom (2→3→4, 3→4→5) + widen `main>.max-w-7xl`→1600/1840. Form dikecualikan :has(). Opt-out `no-densify`. Mobile aman (≥1280px only).

### C. FCM PUSH (akhirnya JALAN)
- **VAPID key SALAH** di usePushNotifications.js → 401. Ganti ke key Console: `BOEAStvEGgdHCSKGONFbPY0olQ7OEUUvhbX3NofzqWyFBvaXG0tceRbvNE36Bw7qv35ZL6fXtOPEa6Wyp8VBWfY`.
- Kyai enable **Firebase Installations API** + **FCM API** di GCP + allow di API key restrictions → push JALAN.
- **Ikon**: badge `/icon-72.png` TAK ADA → ganti `/icon-192.png` (onMessage + CF payload + public/firebase-messaging-sw.js + vue-app/public/firebase-messaging-sw.js). PWA Android small-icon = monokrom siluet (batasan platform).

### D. VERIFY TRANSFER + TAGIHAN ("Missing or insufficient permissions")
- Rule `keuangan_buku_induk` create WAJIB tipe+keterangan+nominal(number)+tanggal(YYYY-MM-DD)+sumber-in-list. Verify dulu tak isi tipe/keterangan, pakai `catatan`, sumber `transfer_verified` belum di-allow → ditolak (status terlanjur verified, ledger gagal). FIX: (1) rule +`'transfer_verified'` (create+delete); (2) verifyTransfer isi tipe='masuk'+keterangan+Number(nominal)+tanggal YYYY-MM-DD; (3) **URUTAN dibalik**: buku_induk+tagihan DULU, status='verified' TERAKHIR.
- **Tagihan berkurang setelah verify** kalau `tagihan_id` ada (wali bayar via tombol "Bayar"→goBayar set tagihan_id). "Setoran Lain"=standalone → admin pakai Edit/Link (E).
- **Wali "menunggu" padahal verified**: PembayaranView.myPendingTransfers filter `status!=='verified'`.

### E. CRUD VERIFIKASI PEMBAYARAN (PembayaranPendingView)
- **Hapus** (semua tab) + **Edit/Link Tagihan** (modal nominal/kategori/catatan + dropdown tagihan belum-lunas → set tagihan_id). Indikator "Terhubung ke tagihan" + sisaTagihan.

### F. NOTIF TARGET (kyai: "sesuai user, jangan terbalik")
- Transfer "bukti baru" → **target:'admin'** + resolver CF `'admin'` (guru role_sistem admin/admin_keuangan/super_admin). Tagihan bulanan → **'santri_semua'** (resolver baru = santri token saja, BUKAN guru).
- **Lonceng in-app (`useNotifications.js`) TERPISAH dari notif_queue/FCM** — build dari koleksi sumber, filter PER ROLE: getTagihan/getPembayaran/getKenaikan/getPrestasi = santri-only+own; getBisyaroh=guru-only; getKritik=admin. **Guru TAK PERNAH lihat tagihan.** Sudah benar (tak diubah).

### G. NISN
- Field NISN di `useSantriForm.js` (emptyForm+populate+save) + input SantriFormView (sebelah NIS) + tampil ProfilSantri. Santri rule tak whitelist field → aman. **Impor/ekspor massal NISN BELUM** (offer kyai).

### H. BUMP v.96.0626 (vc 95→96)
- gradle (vc96+vn), package.json root+vue-app "96.0626", electron/package.json "96.0.626", main.js Sentry "portal-mu@96.0626", 4 footer (Sidebar/Login/Dashboard/PpdbAdmin). vc 88-95 SUDAH dipakai → minimal **97** rilis berikut.

### I. DEPLOY (kyai jalankan)
- **Web+rules**: `npm run firebase:deploy` (struk, batch 13, CRUD, verify, NISN, notif web/SW, density, uang saku rule).
- **Cloud Functions**: `firebase deploy --only functions` (autoGenerateTagihanBulanan + resolver target admin/santri_semua + ikon payload). Blaze aktif.
- **AAB v.96**: `npm run build:aab` (remote-shell — hanya perlu kalau rilis Play Console; web update cukup firebase:deploy).
- **Electron**: `npm run build:electron --prefix vue-app` + robocopy dist→electron/app + `cd vue-app\electron && npm run electron:make`. (Electron main TAK berubah sesi ini → renderer-only; tak wajib install ulang .exe.)

### J. PENDING / GOTCHA
- **Cicil (#2)** nunggu tes kyai setelah deploy. NISN impor/ekspor massal (offer).
- GOTCHA tetap: mount Cowork LAG/TRUNCATED → `node --check`/grep via mount kasih error PALSU; verif AUTHORITATIVE via Read/Grep (D:\) + render fungsi standalone di /tmp.


---

## SESI v.96.0626 — CETAK LANGSUNG = ESC/P GRAFIS RASTER + No.TRANSAKSI + NASABAH (6 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU

> Lanjutan v.96. versionCode TETAP **96**. Branch feature/vue-migration. **SUDAH commit + deploy + install** (commit `3dacb59` struk + `b971bb6` hapus folder duplikat; `_run_vite.cmd` EXIT=0; firebase:deploy + electron rebuild + install ulang .exe — SELESAI & terpasang). Fokus: bikin cetak struk 2-ply di EPSON LX-310 BENAR (tajam, tanpa blank), No. Transaksi rapi, Nasabah, polish layout.

### ⭐ A. CETAK LANGSUNG (dot-matrix 9.5") = ESC/P GRAFIS RASTER (KEPUTUSAN FINAL)
- **Akar masalah:** cetak lewat **driver Windows** di LX-310 SELALU bermasalah: (a) **kosong** (printPdf PDF plugin di window tersembunyi), (b) teks jadi **KOTAK abu** (rasterisasi GPU offscreen), (c) **feed kosong ~5cm** di atas tiap cetak (Top-of-Form driver — muncul BAHKAN di "Cetak Halaman Uji" Windows). App LAMA tak begitu krn cetak **langsung ke printer (tanpa driver)**.
- **Solusi FINAL:** render slip ke `<canvas>` (font **Arial**, anisotropic **120dpi H × 72dpi V** via `ctx.setTransform(120/72,0,0,1)` biar teks TIDAK gepeng) → threshold 1-bit → encode **ESC/P bit-image** (`ESC *` mode 1 = 120dpi, `ESC 3 24` = line spacing 8/72") → base64 → kirim via IPC **`print:raw`** (winspool RAW, **BYPASS driver**). Hasil: **grafis Arial, tajam, TANPA feed 5cm**.
- **File BARU `vue-app/src/utils/escpImage.js`:** `buildStrukSlipEscpBase64(trx)` (POS) + `buildSlipTabunganEscpBase64(mut, {saldo,santri,label})` (tabungan/uang saku). Internal: `posData`/`tabData` (data) → `drawSlip` (canvas) → `encodeEscpBase64`. Tiap cetak maju tepat 1 slip via padding line-feed (dari `posStrukSlipH`).
- **Wiring 4 jalur 9.5** → `printRaw({ base64, deviceName })`: `PosSantriView.cetakLangsung`, `RiwayatPosView.cetakDot`, `TabunganView.cetakSlipLangsung`, `PrinterSettingsModal.tesCetak`. (Thermal non-9.5 tetap `printStruk` HTML; web non-Electron fallback `cetak...Pdf` preview.)
- **`print:raw` IPC SUDAH ADA sejak v.95** (`RAW_PRINT_PS1` winspool, `electron/src/index.ts`) → **TIDAK perlu ubah Electron main**. Perubahan = RENDERER-only → rebuild electron + **INSTALL ULANG .exe**.
- ⚠️ **JANGAN balik** cetak slip 9.5 ke `printPdf`(PDF) atau `printStruk`(HTML) — dua-duanya lewat driver = kosong/kotak/feed-5cm. Builder HTML (`buildStrukSlipHtml`/`buildSlipTabunganHtml`) & `cetakStrukSlipPdf` silent kini **tak dipakai utk cetak 9.5** (PDF masih utk tombol "Struk PDF" preview/unduh). `print:pdf` Electron diubah (file://+showInactive) tapi kini cuma utk **rapor batch**, bukan slip.

### B. SLIP TABUNGAN & UANG SAKU = gaya POS + tombol cetak
- Layout disamakan POS (KOP, kotak BUKTI kanan-atas, 2 kolom, rincian, total, ttd). `cetakSlipTabunganPdf` (PDF preview) di-rewrite samakan POS; `buildSlipTabunganHtml` (HTML); `buildSlipTabunganEscpBase64` (ESC/P cetak).
- `TabunganView.simpanMutasi` (mutasi BARU) → **panel SUKSES** (modal tak ditutup) dgn tombol **Struk PDF** + **Cetak Langsung** + Transaksi Baru/Selesai (kyai pilih "tampilkan tombol cetak"). Uang Saku = mode route (`label='UANG SAKU'`).

### C. No. TRANSAKSI rapi (format NNNddmmyy)
- POS = `MU-` (sudah, field `no_struk`), **Tabungan = `TB-`**, **Uang Saku = `US-`** (di-generate `TabunganView.simpanMutasi` → field **`no_bukti`**; seq = jumlah mutasi hari ini di `mutasiSource` + 1, + ddmmyy). **Bisyaroh = `BS-`** (`BisyarohView.genBisyarohNo()` — single `saveSlipSingle` + `bulkGenerate`, field `no_bukti`).
- Label **"No. Bukti" → "No. Transaksi"** di SEMUA slip (strukBuilder POS+tabungan, escpImage, receiptHtml, ModalPOS, panel TabunganView). Bisyaroh tetap "No. Slip" (pakai `no_bukti`). Slip pakai `mut.no_bukti || mut.id` (lama tanpa no_bukti tetap fallback id). Rules TAK whitelist ketat → field `no_bukti` aman.

### D. NASABAH (khusus Tabungan/Uang Saku)
- ttd KIRI: **setor → "Nasabah (Penyetor)" = nama WALISANTRI**; **tarik → "Nasabah (Penarik)" = nama SANTRI**. Wali = `santri.wali||nama_wali||nama_ayah||ayah.nama`. ttd KANAN tetap "Penerima" (operator/petugas). (escpImage tabData + strukBuilder cetakSlipTabunganPdf + buildSlipTabunganHtml.)

### E. PENYETELAN STRUK (PengaturanKeuanganView) + POLISH
- Field: `posStrukSlipW` (Lebar), `posStrukSlipH` (Tinggi), `posStrukTopMm` (Margin atas), **BARU `posStrukLeftMm` (Geser kanan)**.
- **FIX "Margin atas tak bisa 0":** simpan dulu `Number(...)||6` → 0 ke-reset; ganti `Number.isFinite(...)?...:default`. Default baru: Lebar 190, Margin atas 2.
- **FIX "Geser kanan tak berfungsi":** ternyata `escpImage.renderEscp` BELUM baca `posStrukLeftMm`/`posStrukTopMm` (field ada, wiring terlewat). Kini dibaca: geser kanan = `ctx.translate`, konten **MENYUSUT** saat digeser biar tak kepotong kanan (lebar maks 9-pin ~200mm/8"). Margin atas → start y konten.
- **Polish layout escpImage:** font besar+tebal Arial, jarak baris longgar, **kolom kanan (Tanggal/No.Transaksi/Metode) RATA KANAN** (anti-tumpuk), **total (Jumlah/Pembayaran/Kembali/Saldo) label NEMPEL kiri nominal** (jarak 3mm via measureText).

### F. CLEANUP GIT
- Hapus folder **DUPLIKAT NYASAR** `D:\Aplikasi Project\Portal MU\Portal MU\` (~110MB, gitlink mode 160000, salinan lama Mei) yg bikin `git status` nampilin "modified: Portal MU (modified content)". `git rm --cached "Portal MU"` + `Remove-Item -Recurse` + commit (`b971bb6`).

### FILE BARU/DIUBAH
- BARU: `utils/escpImage.js`.
- DIUBAH: `utils/strukBuilder.js` (cetakSlipTabunganPdf rewrite, buildSlipTabunganHtml/buildStrukSlipHtml + slipShellHtml, No.Transaksi, Nasabah, no_bukti); `views/TabunganView.vue` (panel cetak + no_bukti TB/US + cetakSlipLangsung→ESC/P); `views/PosSantriView.vue` + `views/RiwayatPosView.vue` (cetak 9.5→ESC/P); `views/BisyarohView.vue` (genBisyarohNo + wire single/bulk); `views/PengaturanKeuanganView.vue` (field Geser kanan + fix margin0 + default 190/2); `components/PrinterSettingsModal.vue` (tesCetak→ESC/P); `components/pos/ModalPOS.vue` (label); `utils/receiptHtml.js` (label + no_bukti). `electron/src/index.ts` (print:pdf file://+showInactive — utk rapor; tak dipakai slip).

### GOTCHA / CATATAN SESI BARU
- **Cetak slip 9.5 LX-310 WAJIB ESC/P raw (`print:raw` + escpImage)** — jangan balik ke driver (kosong/kotak/feed-5cm). App lama rapi krn raw, bukan grafis driver.
- ESC/P bit-image: `ESC *` mode 1 (120dpi H), `ESC 3 24` (8/72" line), canvas anisotropic scaleH=120/72 (teks tak gepeng). Lebar maks ~200mm (960 dots).
- Mount Cowork LAG/TRUNCATED tetap → `node --check`/compile via mount = error PALSU; verif AUTHORITATIVE Read/Grep (D:\).
- Folder `Portal MU/Portal MU` SUDAH dihapus — jangan bingung lagi soal "modified: Portal MU".

### PENDING (lama, belum disentuh)
- Cicil (#2) tes; NISN impor/ekspor massal; audit RBAC/lembaga vs LOGIC GLOBAL; pensiun TPQ-shift; backlog v.93/v.95.
- Builder HTML slip (`buildStrukSlipHtml`/`buildSlipTabunganHtml`) + slip PDF silent kini sebagian dead (cetak pakai ESC/P) — boleh dirapikan kalau mau ramping.
- Transaksi tabungan/uang saku & slip bisyaroh **lama** tak punya `no_bukti` → reprint fallback ke id. Yang baru/regenerate dapat TB-/US-/BS-.


---

## SESI v.108 (8 Juni 2026, Cowork) — POS METODE BAYAR + BAYAR DI MUKA + KERANJANG + FILTER RIWAYAT + RESIDU BUKU INDUK + LAYOUT MAX-WIDTH — RECAP TERBARU, BACA INI DULU

> Branch feature/vue-migration. **BELUM commit / build / deploy** (kyai tes dulu via `npm run dev`, lalu rebuild AAB). Semua edit diverifikasi compile (SFC) tapi belum dijalankan di app sungguhan. versionCode belum dibump (placeholder "v.108" di komentar kode).

### ⭐ A. STRUK TABUNGAN — label "Nasabah" (BATALKAN sebagian keputusan v.96 D)
- ttd kiri slip tabungan/uang saku: **"Nasabah (Penyetor)"/"Nasabah (Penarik)" → cukup "Nasabah,"** (kurung dibuang) atas permintaan kyai.
- File: `utils/strukBuilder.js` (baris ~550 PDF + ~658 HTML thermal), `utils/escpImage.js` (`signLeftLabel` ~242). Nama nasabah (wali utk setor / santri utk tarik) TETAP terisi di bawah label.
- Label "Penyetor," pada struk **POS penjualan** (receiptHtml/strukBuilder POS) TIDAK diubah — beda konteks.

### B. POS METODE BAYAR (Tunai / Transfer — TANPA QRIS)
- `components/pos/ModalPOS.vue`: `METODE_LIST = ['Tunai','Transfer']`, ref `metode`, `isTunai`. Saat non-tunai (Transfer): bagian "Uang diterima/uang cepat/kembalian" disembunyikan, `bayar=total`, kembalian 0. Emit `metode` di payload `simpan`.
- `views/PosSantriView.vue`: `docData.metode = payload.metode||'Tunai'` (tersimpan ke `keuangan_buku_induk`); `lastTrx.metode = (payload.metode||'Tunai').toUpperCase()` (ganti hardcode 'TUNAI'). Struk sudah baca `trx.metode||'TUNAI'` (strukBuilder banyak titik) → otomatis tampil.

### C. POS BAYAR DI MUKA (beberapa bulan ke depan)
- Tagihan bulan depan BELUM dibuat di sistem (tagihan dibuat manual per santri per periode di TagihanView). Keputusan kyai: **POS yang MEMBUAT** tagihan baru status **lunas** utk bulan yang dibayar maju.
- `ModalPOS.vue`: section "Bayar di muka" — pilih jenis rutin + bulan mulai (`type=month`, default bulan depan) + jumlah bulan → `addPrepay()` generate item per bulan (`{prepay:true, periode:'YYYY-MM', periode_label:'Juli 2026'}`), nominal dari `lookupNominal()` (3-lapis: per_kelas→per_lembaga→default, di-refactor dari addExtra). Anti-dobel dgn tagihan tertunggak & prepay yg sudah ada.
- `PosSantriView.handleSimpan`: item ber-`prepay` → `setDoc(keuangan_tagihan, tagihan_{sid}_{ts}_{rand})` {kategori, periode(label), periode_kode, nominal, bayar, dibayar, status:'lunas', jatuh_tempo: periode+'-10', dibayar_via:'pos_santri', trx_id}.

### D. POS KERANJANG GABUNGAN (UX — kyai: "ribet, daftar transaksi gk muncul")
- Sebelumnya prepay item nyasar ke list "Item lain". Sekarang **SATU "Keranjang"**: tagihan tertunggak (prefilled) + item lain + bayar-di-muka tampil dalam 1 daftar `cart-row` (jenis + tag [Tagihan/Bayar muka/Item] + keterangan/periode + nominal editable + ✕). Checkbox tagihan DIHAPUS — semua tagihan otomatis di keranjang, ✕ utk buang (`removeTagihan(key)`); item via `removeItem(id)`.
- Kontrol "Tambah pembayaran" (item lain + bayar di muka) diringkas di atas keranjang. `total` & `simpan` tak lagi pakai `r.checked` (semua tagihanRows dihitung).

### E. DASHBOARD — hitungan Buku Induk jujur
- `views/KeuanganDashboardView.vue`: dulu `bukuInduk.length` (mentah) → tampil 4 walau ledger 0. Tambah computed **`bukuIndukValid`** (buang kategori/sumber 'tabungan' + wajib tanggal `^\d{4}-\d{2}`); card pakai `bukuIndukValid.length`. (composable useKeuangan TAK diubah.)

### F. BUKU INDUK — tombol "Bersihkan residu" (super_admin)
- `views/BukuIndukView.vue`: computed **`residuBuku`** (entri tabungan-residu ATAU tanpa tanggal valid = yg ke-hitung dashboard tapi tak tampil ledger) + fungsi **`bersihkanResidu()`** (confirm → `deleteOne` per id → `writeAuditLog` action `cleanup_residu`). Banner kuning di atas list (v-if isAdmin && residuBuku.length>0) dgn tombol "Bersihkan residu (N)".
- **PENDING kyai**: klik tombol ini di app utk benar2 hapus 4 dok sampah (agen tak bisa akses Firestore langsung).

### G. FILTER TAHUN/BULAN/TANGGAL di Riwayat
- `views/RiwayatPosView.vue`: ganti single date `filterTanggal` → 3 select **filterYear/filterMonth/filterDay** (+ `years` computed dari data). Filter di computed `transaksi`.
- `views/TabunganView.vue` (dipakai **Tabungan & Uang Saku** via route mode): panel "Semua Mutasi" dapat 3 select **mutFilterYear/Month/Day** + `mutYears` + computed **`mutasiFiltered`** (v-for tabel pakai ini; count "X / Y mutasi"; empty state ikut filter).

### H. LAYOUT — fix white space layar besar (TERPUSAT, 1 file)
- Keluhan kyai: di layar besar banyak white space, card terlihat kecil/melompong (full-bleed, konten meregang).
- `components/layout/AppLayout.vue`: bungkus `<router-view>` dgn **`<div class="mx-auto w-full max-w-[1400px]">`**. ≤1400px tak berubah (HP/tablet/laptop full); >1400px konten ditengahkan & compact. Angka 1400 mudah disetel. (Alternatif kalau kyai mau card MENGISI penuh layar besar: tambah kolom `xl:` di grid, belum dilakukan.)

### FILE DIUBAH SESI INI
- `components/pos/ModalPOS.vue` (metode + bayar di muka + keranjang gabungan)
- `views/PosSantriView.vue` (metode ke buku induk/struk + buat tagihan prepay lunas)
- `utils/strukBuilder.js` + `utils/escpImage.js` (label Nasabah)
- `views/KeuanganDashboardView.vue` (bukuIndukValid)
- `views/BukuIndukView.vue` (residuBuku + bersihkanResidu + banner)
- `views/RiwayatPosView.vue` (filter Y/M/D)
- `views/TabunganView.vue` (filter Y/M/D panel Semua Mutasi)
- `components/layout/AppLayout.vue` (max-width wrapper)

### ⚠️ GOTCHA PENTING (BACA — beda dari sesi lalu)
- **Edit/Write tool MERUSAK file di Windows mount sesi ini** (TRUNCATE + inject NULL byte): PosSantriView & ModalPOS ter-truncate di tengah, strukBuilder dapat 5 null byte. **POLA AMAN dipakai: restore `git show HEAD:path` → /tmp → patch via `python3` (assert count==1) → verify → `cp` ke target.** JANGAN andalkan Edit tool utk file penting; kalaupun pakai, langsung verify null/tail.
- **Build penuh TIDAK BISA di sandbox**: `node_modules` terinstall utk **Windows** → rollup (`@rollup/rollup-linux-x64-gnu`) & esbuild (`@esbuild/win32-x64`) native binary salah platform. `npm run build`/vite/esbuild GAGAL di Linux sandbox — itu NORMAL, bukan error kode. **Verifikasi kompilasi pakai parser murni-JS**: `@vue/compiler-sfc` (parse+compileScript+compileTemplate) utk .vue, `@babel/parser` utk .js (lihat /tmp/vchk*.mjs pola). Build sungguhan di mesin kyai (Windows).
- Capacitor: kyai bilang mode **NATIVE** (bukan remote), TAPI `capacitor.config.json` ter-commit MASIH ada `server.url: https://ammuonline.web.app` + `webDir:"public"` (komentar build-aab.cjs juga "REMOTE"). **Belum disinkronkan** — kalau benar mau native murni, `server.url` perlu dihapus & `webDir` ke build Vue. Konfirmasi ke kyai. (Untuk tes fitur web: `npm run dev`; untuk app native: `npm run build:aab` lalu install.)

### PENDING SESI INI
- Kyai TES via `npm run dev` (hot-reload): metode bayar, bayar di muka, keranjang, filter riwayat, layout 1400px (mungkin perlu disetel 1280/lain), tombol Bersihkan residu (klik utk hapus 4 dok).
- Belum commit/build/deploy. AAB native vs config remote perlu diperjelas.
- Pending lama tetap: Cicil(#2) tes; NISN massal; audit RBAC/lembaga; pensiun TPQ-shift.

---

## SESI v.96.0626 — AUDIT MENYELURUH + REMEDIASI P0/P1 + PERFORMA (8 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU

> Audit menyeluruh (logika/filter/dead-code/UI-UX/performa/keamanan) + eksekusi remediasi berurutan P0→P1→P2. versionCode TETAP 96 (TIDAK dibump). Branch feature/vue-migration. Laporan audit lengkap: `AUDIT-COWORK-08JUN2026-MENYELURUH.md`.
> ⚠️ GOTCHA mount Cowork sesi ini: **bash mount TIDAK BISA hapus file** (rm/unlink ditolak "Operation not permitted") & **read via bash sering STALE** pasca Edit/cp. → Verifikasi AUTHORITATIVE pakai Read tool; edit kode via python→cp + validasi `@vue/compiler-sfc`/`@babel/parser` di /tmp. Build asli = kyai `.\tmp_recovery\_run_vite.cmd` (SUDAH HIJAU, VITE_EXITCODE=0).

### STATUS DEPLOY (PENTING untuk sesi baru)
- **Committed:** HANYA #9 (`d0adced` — stop-track build output + keystore lama). SEMUA perubahan lain MASIH uncommitted (working tree) → kyai commit besar nanti.
- **Sudah LIVE di web** (kyai firebase:deploy saat setup App Check): App Check init (`firebase.js`) + CSP reCAPTCHA (`firebase.json`).
- **BELUM deploy:** #11/#12/#13/#16/#17 + App Check sinkron + messaging lazy → kyai WAJIB `npm run firebase:deploy` (web) + `npm run build:aab` (native) final.
- **Rules hardening BELUM deploy:** kyai `firebase deploy --only firestore:rules` (`firestore.rules` sudah diupdate; backup `firestore.rules.bak.pre-stage2`).
- **App Check:** Web App "mambaululum" REGISTERED (reCAPTCHA v3); Firestore+Storage = **MONITOR** (BELUM Enforce). Site key di `vue-app/.env.local` (`VITE_APPCHECK_RECAPTCHA_KEY`, gitignored). Android `app.ammu.id` BELUM register (native pakai debug token/Play Integrity nanti). Flip Enforce setelah verified tinggi (WEB dulu).
- **npm install SUDAH:** jspdf, jspdf-autotable, exceljs (di vue-app).

### DIKERJAKAN (per task)
- **#8 KEAMANAN (P0):** App Check reCAPTCHA v3 — init SINKRON `services/firebase.js` (env-gated; key kosong=OFF). CSP `firebase.json` +`www.google.com`+`recaptcha.net` (script/script-elem/frame, 3 site). `firestore.rules` hardening MERGE-SAFE (keuangan_tagihan/pembayaran/hutang_piutang cek tipe kondisional + supervisi_catatan cap teks). Model = custom-auth + Anonymous TANPA role claim → rules TAK bisa tegakkan peran; App Check = gate per-app (lever utama). Role enforcement penuh = custom claims (future, BELUM).
- **#9 HIGIENE REPO (P0, COMMITTED d0adced):** gitignore `public/vue/`+`electron/app/`+`*.keystore`; `git rm --cached` 213 file build-artifact + keystore lama. Hentikan churn 412 file.
- **#10 CAPACITOR (P1):** `@capacitor/cli` ^7.6.5→^8.3.4 (vue-app). Komentar `build-aab.cjs` diluruskan ke NATIVE (build = vue-app/android, webDir:dist). Root `android/`+`capacitor.config.json` = legacy REMOTE vc70 MATI (hapus = #14).
- **#11 PDF/EXCEL OFFLINE (P1):** `services/pdf.js` + `composables/useExcel.js` → dynamic-import npm (jspdf/jspdf-autotable/exceljs) ganti CDN; html2pdf+pdfmake DEAD dihapus. + 3 dep di vue-app/package.json.
- **#12 SCOPE KEPALA (P1):** `useStatistikScope.js` +`scopedSantriAll`; StatistikView 8 computed KPI/chart `santriRaw`→`scopedSantriAll` → Kepala/PJ lihat lembaganya saja. (RekapDiniyah/InputBulanan masih santriRaw TAPI filter-driven = follow-up lunak; AbsensiGuru N/A.)
- **#13 POS ANTI-DOBEL (P1):** ModalPOS.addPrepay + prop `prepaidPeriodes` (dari PosSantriView.openModal `seen` incl. LUNAS) → cegah tagihan bayar-di-muka ganda lintas-sesi. Cicil: logika BENAR (review), tinggal tes fungsional kyai.
- **#15 DEAD CODE (P2):** orphan `DashboardQuickActions.vue`+`useKartuKenaikan.js` (0 ref) → kyai `git rm` (PowerShell: `Remove-Item` lock dulu). Dead-export `strukBuilder` (buildStrukSlipHtml/buildSlipTabunganHtml) DIBIARKAN (kritikal, lazy, nol biaya); **buildStrukHtmlWide MASIH dipakai internal** (L909/982).
- **#16 LAYOUT (P2):** disatukan **1600px** (AppLayout cap + main.css density, buang 1840 yg konflik) + grid densify → "kompatibel semua layar" (kyai).
- **#17 PERFORMA:** vite `manualChunks` pisah jspdf→`vendor-pdf`, exceljs→`vendor-excel`, firebase/messaging→`vendor-fcm` (lazy, keluar boot). `usePushNotifications` messaging dynamic-import. **Boot vendor 1.88MB → 545KB** (exceljs 940KB + pdf 391KB + fcm 26KB kini LAZY). Lighthouse 36 ter-skew IndexedDB/login → RETEST INCOGNITO.
- **#14 SKIP** (kyai): bersih legacy ~674MB (root public/+android/), tmp_recovery, 93 .md, dup KB underscore.

### FILE DIUBAH (uncommitted)
`firebase.json`, `firestore.rules`(+.bak.pre-stage2), `.gitignore`(+vue-app/.gitignore), `scripts/build-aab.cjs`; vue-app: `services/{firebase,pdf}.js`, `composables/{useExcel,usePushNotifications,useStatistikScope}.js`, `views/{StatistikView,PosSantriView}.vue`, `components/pos/ModalPOS.vue`, `components/layout/AppLayout.vue`, `assets/main.css`, `vite.config.js`, `package.json`, `.env.local`(gitignored). BARU: `firestore.rules.stage2-proposed`(=live, boleh hapus), `AUDIT-COWORK-08JUN2026-MENYELURUH.md`, `tmp_recovery/_commit_task9_higiene.cmd`. Inert sisa: `vue-app/node_modules/_sc.mjs`,`_sc2.mjs` (gitignored).

### SISA KYAI (urut, PowerShell — selalu `cd "D:\Aplikasi Project\Portal MU";`)
1. `.\tmp_recovery\_run_vite.cmd` (final cek; sudah hijau).
2. `git rm` 2 orphan (#15): `if (Test-Path ".git\index.lock"){Remove-Item -Force ".git\index.lock"}` lalu `git rm vue-app/src/components/dashboard/DashboardQuickActions.vue vue-app/src/composables/useKartuKenaikan.js`.
3. Deploy: `firebase deploy --only firestore:rules` ; `npm run firebase:deploy` ; `npm run build:aab`.
4. App Check → **Enforce** setelah monitor verified (web dulu).
5. Commit besar + push.
6. Retest Lighthouse **incognito**.

### GOTCHA SESI INI (untuk sesi baru)
- Mount Cowork: TIDAK bisa hapus file + read bash STALE pasca-edit → Read tool authoritative; edit via python→cp + validasi parser di /tmp.
- `npm install --prefix vue-app` DARI ROOT salah baca package.json root ("removed 2, changed 1" bukan "added") → install dari DALAM: `cd vue-app; npm install`.
- vite `manualChunks` `else→'vendor'` MELUMAT dynamic-import jadi eager → WAJIB rule eksplisit per lib berat (vendor-pdf/excel/fcm) supaya tetap lazy.
- Kyai pakai **PowerShell** → sintaks PS (`Test-Path`/`Remove-Item`), BUKAN CMD (`if exist...del`). Beri perintah lengkap dgn `cd "D:\..."`.
- App Check Enforce: hati-hati FCM token + native (belum register) → enforce WEB dulu.


---

## SESI v.97.0626 — RAPOR REDESIGN FULL-ACF (8 Juni 2026)
> Redesign total fitur **Rapor** (Qiraati + Diniyah) sesuai SKEMA RAPOR kyai. Web/JS murni (versionCode native TETAP, hanya bump display 96→97). File: `utils/predikat.js`, `utils/raporPdf.js`, `views/RaporView.vue`, `views/LembagaDetailView.vue`, `views/PengaturanView.vue`. **Preview on-screen == hasil PDF (paritas dijaga).**

### Hasil akhir (spec kyai)
- **Header rapor:** judul "SURAT KETERANGAN HASIL PENDIDIKAN". Identitas **2 kolom rata kiri**, titik dua sejajar: kiri = Nama Santri/NISN/NIS, kanan = Kelas(gabungan "VII/PTPT 1")/Semester/Tahun Ajaran (digeser ke kanan, `rLabelX=pageW-80`).
- **Predikat (EDITABLE):** Mumtaz/Jayyid/Maqbul/Rasib (aksara Arab di layar via font, di PDF via canvas→image). Skala bisa diedit admin (label+nilai minimum) di Lembaga→Rapor. Sumber tunggal `settings.predikatScale` → `predikat.js predikatNilai(nilai, scale)`. Default min: 81/71/61/0.
- **Adab DIHAPUS total** (stripAdabSchema + migrasi override lama PTPT/PPPH yg masih ber-Adab → rebuild via buildSchema).
- **Qiraati:** PTPT (kelasJuz, kolom Tgl Khotam auto dari kartu kenaikan, Istimror/Kelancaran/Fashohah/Tajwid + Predikat). PPPH = **4 kitab** (Arba'in/Riyadhus/Bukhari/Muslim) perKitab. TPQ + Pra PTPT tanpa Adab.
- **Diniyah (SDI/SMP/SMA):** kolom No|Mapel|KKM|**Rata-rata Sumatif**|**Sumatif Akhir Semester**|Predikat (Sumatif & Akhir TERPISAH). Rata-rata Sumatif = AVERAGE rekap bulanan per semester (auto) **TAPI bisa di-override manual** di editor (input number, kosong=auto, placeholder "Auto: N"). Absensi auto dari absensi bulanan.
- **KOP per-lembaga (JANGAN diubah strukturnya):** 2 logo. **Logo kiri:** Diniyah = **logo pondok** (`settings.logoKop`, sama KOP umum); Qiraati = `settings.logoQiraati`. **Logo kanan:** per-lembaga `lembagaOverride.kop_logo`. Fallback `/logo.png` agar selalu 2 logo. **KOP line 4 dipaksa lowercase** (utk email; layar dulu `titleCase` → diganti `.toLowerCase()`). Diniyah dideteksi via `schema.perKelas` (diteruskan ke `drawKopRapor(...,isDiniyah)`).
- **TTD:** Qiraati = Wali Santri | Guru Kelas (Nama+No.EKGQ auto dari akun guru) | Kepala/PJ. PPPH→PJ PPPH. Diniyah = Wali Santri | Wali Kelas | Kepala (SDI→"Kepala SDI", PKBM→"Kepala PKBM"). TTD gambar auto dari `guru.tanda_tangan` (bukan `ttd_b64`). No.EKGQ = angka saja tanpa label.
- **Margin PDF ~1.5cm.** Tabel "Nilai Rata-rata" full-width (margin 15, tableWidth 185).

### FULL ACF (semua editable di Master Data → Lembaga → Pengaturan Rapor)
- **Struktur Field Rapor** (Qiraati): auto-load template default kalau belum ada override; editable (kelasJuz/perKitab/perLevel/sections).
- **Mata Pelajaran Diniyah + KKM:** section "Mata Pelajaran" — tiap mapel ada input **nama + KKM** per kelas (+"Isi default"). Nama → `settings.rekapDiniyahMapel`; KKM → `settings.rekapDiniyahKKM[kelas][i]` (paralel index). RaporView `buildDiniyahSchemaFromSetting` baca KKM dari situ.
- **Predikat:** editor label+min (read-only info card LAMA diganti editor editable) → `settings.predikatScale`.
- **KOP per-lembaga:** Edit Info (kop_line1-4 + kop_logo). Logo kiri global Diniyah = Pengaturan Web → Logo Kop.

### Arsitektur kunci (RaporView.vue)
- Subscribe: `rapor_semester`, `rekap_diniyah`, `absensi_santri_ngaji_bulanan`, `absensi_santri_sekolah_bulanan`.
- `schema = computed(stripAdabSchema(_schemaRaw))`. `_schemaRaw`: override `settings.raporSchemas[lembaga]` > `buildSchema()`; migrasi auto utk PTPT/PPPH stale.
- Diniyah pakai `buildDiniyahSchemaFromSetting` (mapel dari rekapDiniyahMapel, KKM dari rekapDiniyahKKM) — BUKAN raporSchemas.
- `nilaiSumatif(mp)`: stored manual > auto rekap bulanan. `buildRaporStateFor`: inject auto sumatif+absensi utk PDF (manual override menang). Editor inline: `startEdit/draft/simpanRapor` (setDoc merge → `rapor_semester.data_nilai`). Key: `dn__{kelas}__{mid}__sumatif|akhir`, `ppph__{lvl}__{field}`, `kj__juz_{n}__{field}`, `pra__{lvl}__{kh}__{field}`.

### CARA EDIT (workflow Cowork sesi ini — sama dgn audit)
- Mount bash TIDAK bisa hapus file + read STALE pasca-cp → edit via python→`/tmp` + validasi `@vue/compiler-sfc`(.vue)/`@babel/parser`(.js) di /tmp, lalu `cp` ke mount. Validasi AUTHORITATIVE = DC copy ke nama baru lalu parse (hindari stale).
- Build kyai: `.\tmp_recovery\_run_vite.cmd` (VITE_EXITCODE=0). Deploy web: `npm run firebase:deploy`.

### ⚠️ ACTION KYAI sisa
- **Hapus lembaga lama "P3H"** di Master Data → Lembaga (sekarang = PPPH); pindahkan santrinya ke PPPH. Kode sudah alias p3h→ppph tapi entri lembaga lama harus dihapus manual.

---

## SESI v.98.0626 — LAYOUT FULL-WIDTH + RAPOR/STATISTIK (8 Juni 2026, Cowork)
> Lanjutan v.97. **Web/JS murni — display TETAP v.97.0626 (versionCode native TIDAK dibump).** Branch feature/vue-migration. SUDAH commit + push + `npm run firebase:deploy` (web/PWA) oleh kyai. Commit "all pending" (`git add -u`) → IKUT melandaskan kerja v95/v96 yg sebelumnya menggantung (POS metode/bayar-muka/keranjang, struk ESC/P, filter riwayat Y/M/D, dashboard residu, App Check, vite manualChunks). Scratch TIDAK di-commit (tmp_recovery/, firestore.rules.stage2-proposed, design_handoff_ammu_desktop/, AUDIT/REKAP .md masih untracked — pakai `git add -u`).

### DIKERJAKAN
1. **LAYOUT FULL-WIDTH edge-to-edge SEMUA halaman** (kyai: di layar besar banyak white space, card melompong). TERPUSAT di 2 file:
   - `components/layout/AppLayout.vue`: cap `max-w-[1600px]` DILEPAS → `<div class="w-full">`.
   - `assets/main.css` (ganti section densify v95/v96): (a) **un-cap page container** `main .max-w-{4,5,6,7}xl.mx-auto:not(.page-narrow) { max-width:none }` di ≥1024px; (b) **grid kartu auto-fit** — `md:grid-cols-2 → repeat(auto-fit,minmax(300px,1fr))`, `md:grid-cols-3`+`lg:grid-cols-3 → minmax(230px,1fr)` di ≥1024px. Form dikecualikan `:not(:has(input/label/select/textarea))`. `lg:grid-cols-2` SENGAJA dibiarkan (split Beranda greeting|kalender).
   - **AKAR white space**: TIAP view nge-cap diri sendiri (`max-w-4xl/5xl/6xl/7xl mx-auto`); main.css lama cuma override `max-w-7xl` → cap lain lolos. (POS=4xl 896px, Beranda/Statistik/Santri=6xl 1152px.)
   - **Kenapa auto-fit (bukan kolom-tetap)**: versi-1 pakai `repeat(4/5/6)` BERTAHAP → grid yg cuma 2 kartu (Personal Bisyaroh/Lama, chooser Rekap-Prestasi & Absensi-Santri = md:grid-cols-2) menyisakan kolom kosong di kanan ("belum full"). auto-fit: 2 kartu → melebar 50/50; banyak kartu → mengalir nambah kolom.
   - **Form/pengaturan dijaga RAMPING** (anti-melar) via class **`.page-narrow`** di 6 view: GuruFormView, SantriFormView, PengaturanView, PengaturanKeuanganView, FieldSchemaView, LembagaDetailView. (ProfilView SEMPAT ditandai lalu DILEPAS — halaman tampilan, kyai mau full.)
   - **Knobs gampang**: minmax 300px (grid-2) / 230px (grid-3); breakpoint un-cap 1024px; opt-out `.page-narrow` (container) & `.no-densify` (grid).
2. **Rapor Pra PTPT — field Kelas** (`utils/raporPdf.js drawIdentitas` + `views/RaporView.vue kelasGabungan` — PARITY): hapus prefix lembaga → `{kelas_sekolah} / {kelas/level}` (mis "I / Level ½ Juz", atau "Level ½ Juz" kalau tak ada kelas sekolah). HANYA `lembaga==='Pra PTPT'`; PTPT tetap "VII / PTPT 1".
3. **Rapor — blok "Dikeluarkan di / Pada Tanggal"** (`raporPdf.js drawSignBlocks`): nilai tempat+tanggal **rata kiri** tepat setelah titik dua (dulu `align:'right'` flush ke tepi `pageW-15`). Posisi blok tetap (atas TTD Kepala).
4. **Statistik Lembaga — PKBM → SMP + SMA** (`views/StatistikView.vue statistikLembaga`): kartu PKBM diganti 2 kartu **SMP** (kelas VII-IX) & **SMA** (X-XII) via `getPkbmSubTier` (useLembaga). flatMap ganti row 'pkbm'. Santri by `kelas_sekolah`; guru per-tier diturunkan dari `guru_sekolah` santri (master guru PKBM tak ber-sub-tier). + import `getPkbmSubTier`; `URUTAN_LEMBAGA` += 'SMP','SMA'.
5. **Distribusi Santri per Lembaga** (`StatistikView.vue distribusiLembaga`): kini hitung `s.lembaga` (ngaji) **+ `s.lembaga_sekolah` (FORMAL)**; PKBM dipecah SMP/SMA. Dulu cuma `s.lembaga` → lembaga formal (TK/SDI/SMP/SMA) tak terdata.

### FILE DIUBAH (sesi ini)
`components/layout/AppLayout.vue`, `assets/main.css`, `utils/raporPdf.js`, `views/RaporView.vue`, `views/StatistikView.vue`, `views/{GuruFormView,SantriFormView,PengaturanView,PengaturanKeuanganView,FieldSchemaView,LembagaDetailView,ProfilView}.vue`.

### ⚠️ GOTCHA PENTING (BACA — sesi Cowork ini)
- **Desktop Commander `edit_block` MEN-TRUNCATE `raporPdf.js`** (file 1037 baris): ekor file (blok `saveBlob` + `}` penutup `generateRaporPdf`) HILANG saat salah satu edit → `node --check` "Unexpected end of input", brace `{}` +1. **Diperbaiki**: `git show HEAD:vue-app/src/utils/raporPdf.js` (v97 SUDAH committed = HEAD f863998) → restore ekor via python ke mount → `node --check` OK + `diff <(git show HEAD:..) file` = hanya 2 edit niat. **PELAJARAN: utk file BESAR (>~1000 baris), JANGAN percaya edit_block buta — SELALU verifikasi `node --check`(.js) / brace-balance / diff-HEAD sesudahnya.**
- **Bash mount STALE** utk file yg diedit via DC (DC tulis langsung ke D:\, mount lag) → `wc -l`/`tail`/last-line via bash bisa SALAH (mis. main.css dilapor 223 baris padahal 235; StatistikView 1491 padahal 1543). **Read tool = AUTHORITATIVE (D:\).** File yg DITULIS via mount (python) propagate normal ke D:\.
- **git index CORRUPT di sandbox Linux** ("index uses extension ... corrupt") → `git diff`/`git status` via bash GAGAL, TAPI `git show HEAD:path` (object DB) JALAN. Recovery: `git show` + `diff <(git show HEAD:path) file`.
- Verifikasi semua file besar lain UTUH via Read tool (end-tag benar): StatistikView 1543, RaporView 2807, PengaturanView 1789, PengaturanKeuanganView 1837, LembagaDetailView 1906, GuruForm/SantriForm.

### STATUS DEPLOY / PENDING
- ✅ Commit + push (feature/vue-migration) + `npm run firebase:deploy` (web/PWA) — DONE kyai. Build verify `tmp_recovery\_run_vite.cmd` = VITE_EXITCODE=0.
- ⏳ **App HP terinstal TAK berubah** sampai `npm run build:aab` (BELUM; vc minimal 97). Desktop Electron perlu rebuild kalau mau perubahan ke .exe.
- ⏳ **firestore.rules** ikut ke-commit (App Check v96). `firebase:deploy`=hosting; kalau rules belum live: `firebase deploy --only firestore:rules`.
- Opsional bersih root: scratch + .md lama, `firestore.rules.stage2-proposed`, `design_handoff_ammu_desktop/`.
- Kalau angka PKBM/SMP/SMA atau distribusi terlihat aneh: pastikan `kelas_sekolah` santri PKBM ∈ {VII..XII} (di luar itu tak ter-tier SMP/SMA).
- Backlog lama tetap: audit RBAC/lembaga mendalam vs LOGIC GLOBAL, pensiun model TPQ-shift, hapus lembaga lama "P3H" (alias→PPPH).


---

## SESI BMT-PETA — INTEGRASI PEMBAYARAN VA + PENCAIRAN BISYAROH (8 Juni 2026, Cowork agent) — RECAP, BACA INI

> Workstream **TERPISAH** dari sesi rapor/statistik v.97/v.98 (itu sudah commit HEAD f863998). Sesi ini **BELUM commit** — kyai commit + deploy sendiri (git sandbox Linux corrupt → pakai shell Windows). Tag komentar kode `v.97.0626` (BENTROK label dgn sesi rapor — abaikan, cuma komentar; **versionCode build.gradle TETAP 96, belum bump**).
> Konteks: integrasi **dua arah** dgn sistem **BMT PETA** — (1) tarik pembayaran santri via **Virtual Account** (masuk), (2) salur **bisyaroh** guru ke rekening BMT (keluar). Masih tahap rancangan/persiapan; **API BMT BELUM ada** → semua bagian BMT default-OFF/dry-run, **alur lama tetap utuh**.

### DELIVERABLE NON-KODE
- **`SKEMA-INTEGRASI-PEMBAYARAN-VA-BMT-PETA.html`** (root) — dokumen skema untuk diajukan ke BMT PETA Pusat/GM (dua arah: VA masuk + pencairan bisyaroh keluar, 3 model eksekusi, kebutuhan API BMT, Diagram 1-4). Buka di browser → Print → PDF.

### A. VIRTUAL ACCOUNT (santri, masuk)
- `utils/bmtVa.js` BARU: `computeVaSantri`(prefix+NIS), `formatVa`, `isBmtAktif`. VA TETAP per santri.
- `PengaturanKeuanganView.vue`: section "Integrasi BMT PETA (Virtual Account)" — `bmt_aktif` (toggle default false), `bmt_nama`, `bmt_va_prefix` (→ settings/general+web).
- `PembayaranView.vue`: metode `va` aktif mengikuti `bmt_aktif` (`methodsSantri` jadi computed); step bayar VA tampil nomor VA + salin + instruksi. Transfer + upload bukti TETAP (fallback). Default OFF → wali tak berubah sampai kyai nyalakan + isi prefix.
- `functions/index.js` **`bmtPaymentWebhook`** (onRequest asia-southeast2): terima konfirmasi bayar VA dari BMT → catat buku_induk (sumber `bmt_va`, Admin SDK bypass rules) + alokasi tagihan, IDEMPOTEN via `bmt_trx_id`. **DRY-RUN** sampai `settings.bmt_webhook_enabled=true` + secret `BMT_WEBHOOK_SECRET`. Cari `TODO(BMT)` utk parsing/auth final.

### B. PENCAIRAN BISYAROH (guru, keluar) — slip di koleksi `keuangan_gaji`
- REALITA (info kyai): admin keuangan **lapor manual ke BMT** (BMT yg transfer), **sebagian guru CASH**. Keputusan kyai: target **Model B (API BMT)**, **Model A cadangan**; sekarang jalan **Model C (laporan Excel)**. Persetujuan = **SATU konfirmasi admin keuangan** (maker-checker ditinjau ulang kalau naik Model B).
- `BisyarohView.vue` (gate `isAdminKeu` = cekHakAkses('akses_keuangan')):
  - **`cairkanTerpilih()`**: pilih slip → catat **kas KELUAR** ke `keuangan_buku_induk` (sumber **'gaji'** — sudah di-allow rules; idempoten id `gaji_<slipId>`; skip yg sudah cair) + tandai slip `status_cair='cair'`. **METODE-AWARE**: `metode_cair==='cash'` → 'tunai', else 'bmt'. + audit log. **Menambal: slip dulu TAK pernah masuk Buku Induk.**
  - **`tandaiMetode('cash'|'bmt')`**: default semua BMT; tandai sebagian Cash (`metode_cair` di slip). Badge Cash/Cair di baris.
  - **`exportLaporanBmt()`**: ekspor **Excel** (`useExcel().exportSimple`) daftar slip via-BMT belum-cair sesuai filter periode (No, Nama, No.Rek BMT, Nominal, Periode + TOTAL) — gantikan laporan manual admin. Rek dari guru.`rek_bmt`.
- `functions/index.js` **`bmtDisbursementBatch`** (onRequest): stub Model B (pondok→guru). **DRY-RUN** + sengaja TIDAK pernah mengaku sukses sebelum API BMT disambung (cegah catat pencairan palsu). `settings.bmt_disburse_enabled` + secret `BMT_DISBURSE_SECRET`. Idempoten via `bmt_disburse_log/<slip_id>`.
- `composables/useGuruForm.js` emptyForm + `views/GuruFormView.vue`: field BARU **`rek_bmt`** (No. Rekening BMT guru, opsional) — tujuan transfer + dipakai Laporan Excel.

### C. TOOLING
- `scripts/build-apk.cjs` BARU + `package.json` script **`build:apk`**: mirror build-aab tapi `assembleRelease` → `vue-app/android/app/build/outputs/apk/release/app-release.apk` (signed, untuk tester sideload).

### FILE DIUBAH/BARU (sesi ini)
BARU: `utils/bmtVa.js`, `scripts/build-apk.cjs`, `SKEMA-INTEGRASI-PEMBAYARAN-VA-BMT-PETA.html`. DIUBAH: `views/PembayaranView.vue`, `views/PengaturanKeuanganView.vue`, `views/BisyarohView.vue`, `views/GuruFormView.vue`, `composables/useGuruForm.js`, `functions/index.js`, `package.json`.

### YANG HARUS KYAI JALANKAN
```bat
tmp_recovery\_run_vite.cmd
git add -A && git commit --no-verify -m "feat: integrasi BMT PETA — VA santri + pencairan bisyaroh (Cash/BMT + Laporan Excel) + stub webhook/disbursement + rek_bmt + build:apk + skema GM"
npm run firebase:deploy                 :: web/PWA
firebase deploy --only functions        :: bmtPaymentWebhook + bmtDisbursementBatch (set secrets dulu kalau mau aktif)
:: app HP: npm run build:apk (tester)  /  npm run build:aab (Play, bump vc>=97 dulu)
```
Webhook/disbursement AMAN dideploy (dry-run). firestore.rules TIDAK diubah (pakai sumber 'gaji' yg sudah di-allow; webhook pakai Admin SDK).

### PENDING / NEXT (sesi berikut)
- Isi field **`rek_bmt`** tiap guru agar Laporan BMT punya nomor rekening.
- Saat API BMT siap: isi `TODO(BMT)` di `bmtPaymentWebhook` (parsing/auth) + `bmtDisbursementBatch` (panggil API), lalu set `bmt_webhook_enabled`/`bmt_disburse_enabled`=true + secrets.
- Build warning vite (`vendor-pdf` circular + firebase dynamic/static) = **benign**, sengaja diabaikan (bukan dari sesi ini).
