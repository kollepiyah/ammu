# PROJECT KNOWLEDGE BASE — Ammu Online (Portal MU)
> Dokumen onboarding untuk sesi Claude baru. Baca ini DULU sebelum mulai. Update terakhir: 31 Mei 2026 (v.87.0526 — sesi lanjutan, HEAD `e3d9551`).

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
Format `v.<versionCode>.<MMYY>` (MM=bulan, YY=2 digit tahun). Saat ini **v.87.0526** (versionCode 87, Mei 2026). Bump SEMUA tempat saat rilis AAB baru (Play Console tolak versionCode sama):
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
HEAD `feature/vue-migration` = `e3d9551` (BELUM push). Detail commit + perintah build/deploy di HANDOFF bagian "SESI v.87.0526".

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

**⏳ SESI BARU WAJIB: BUMP v.87 → v.88** sebelum rilis AAB (lihat §5: gradle versionCode 87→88 + versionName, package.json root+vue-app, electron, Sentry release, 4 footer).

**SISA batch lama (masih open):** Dashboard Keuangan masih salah (perlu kyai sebut angka); Performa semua device; Cek gambar + compatibility. Minor: T41 scope Kepala StatistikView; backfill santri lama PSB. (Notif prestasi & splash & pembayaran-merge SUDAH.)

## 12. LANGKAH PERTAMA SESI BARU
1. `git -C "D:\Aplikasi Project\Portal MU" log --oneline -8` + baca `HANDOFF-v86-PENDING-RECOVERY.md` (tail).
2. Konfirmasi belum ada perubahan kyai yang belum ke-commit (`git status`).
3. Minta kyai angka spesifik dashboard (item 1-2) sambil mulai item paling konkret (6 pembayaran-merge / 3 splash Android).
4. Tiap task: edit surgical → build verify (`_run_vite.cmd`) → commit `--no-verify -F msg` → kasih instruksi build.
