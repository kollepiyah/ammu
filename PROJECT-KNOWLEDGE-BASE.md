# PROJECT KNOWLEDGE BASE — Ammu Online (Portal MU)
> 🆕 **RECAP TERBARU (13 Jun 2026) = "SESI v.100b/c — SANTRIVIEW DUAL-ROLE + RAPOR (filter/KOP) + STATISTIK TREN"** di PALING BAWAH. Commit `181ce9e` / `a1c3ad2` / `dd1064f`. Verify build:electron exit 0. BELUM deploy.
> 🆕 **RECAP TERAKHIR = "SESI v.99.0626 — PUSH NOTIF + STATUS BAR + BONUS PEGAWAI + FIX TGL IMPOR" (di PALING BAWAH).** Rencana 8-batch lengkap + peta task→file = **`REKAP-TASK-BATCH-10JUN2026.md`**.
> ✅ **STATUS 10 Jun 2026 (sesi Claude Code desktop): Batch 1–5 SELESAI & SUDAH commit + deploy/rebuild oleh kyai; Batch 6 SELESAI (verify `_run_vite.cmd` exit 0, BELUM commit/deploy oleh kyai).** Commit urut B1–5: `17b02e5` (B1+2 urutan lembaga canonical + sort A–Z + fix Data Guru tipe_pegawai + Migrate identitas) → `8b676a7` (B3 title bar Electron: Mundur/Maju, Simpan via `definePageSave`, Logout+konfirmasi, search Teleport anti-clip) → `65d2f33` (fix Migrate: gabung NAMA-sama bila ada sinyal penguat + guard konflik) → `b403935` (B4 ribbon Keuangan pecah jadi tombol, Electron — `PengaturanKeuanganView` section-aware `?section=`) → `78c9cb5` (B5 tab PSB ribbon + Printer di backstage menu File). **Batch 6 (T2 — Kenaikan/Mutasi skema SEKOLAH):** `utils/kenaikan.js` (default schema TK/SDI/SMP/SMA = 1 tgl naik/kelas + kelulusan) + `views/NaikKelasView.vue` (Pengaturan + Form "Proses Naik" sekolah via jalur terpisah `saveFormKenaikanSekolah`, Riwayat sekolah, PDF kartu sekolah dgn baris GURU KELAS + label Kelulusan) — commit `9649f30`. Detail di `REKAP-TASK-BATCH-10JUN2026.md` (blok "BATCH 6 SELESAI"). **Batch 7 (T19 scrollbar login + T21 statistik lembaga→halaman data kelas `/statistik/lembaga/:nama` + T20 Google login Electron):** `LoginView.vue` (+`login-page` scrollbar modern), `StatistikView.vue` (kartu lembaga → `goLembagaDetail` router.push, inline detail dihapus) + view baru `StatistikLembagaDetailView.vue` + route, `electron/src/index.ts` (`setWindowOpenHandler` izinkan popup OAuth — ⚠️ **T20 PERLU VERIFIKASI DEVICE KYAI**, popup file:// bisa kena batasan postMessage). Verify vite+tsc exit 0. Semua Vue source murni, **TANPA bump versionCode**. ⚠️ **Batch 7 ini MASIH UNCOMMITTED di working tree** (kyai belum commit/deploy): `LoginView.vue`, `StatistikView.vue`, `StatistikLembagaDetailView.vue`, `router/index.js`, `electron/src/index.ts`+`build/index.js`. **✅ T22 + follow-up SELESAI — commit `23d7c9a`** (⚠️ message tertulis "Batch7" tapi KELIRU; isinya T22+P5/P6/P7, wilayah Batch 8): **T22** nativize 4 view Electron (`PostsView`/`HutangPiutangView`/`PembayaranPendingView`/`MasterDataView` — header/tab `v-if="!isDesktop"`, aksi → pita via `definePageActions`; hasil audit: tak ada tombol benar2 hilang); **P7** hapus dead `.rb-greet` (`ribbon.css` −46 baris + `RibbonGroup.vue` + `useRibbonNav.js`; `useRibbonUser` tetap dipakai `RibbonTitleBar`); **P6** `TagihanView.getNamaSantri` O(n²)→`santriMap` O(1); **P5** `functions/index.js resolveTokensByTarget` guard fan-out `wa`≥8 char (cegah cross-family leak). Verify `npx vite build` exit 0. **✅ Batch 8 FINAL SELESAI (10 Jun 2026, sesi Claude Code): re-audit regresi LOLOS (anti-bocor v.98 utuh — GlobalSearch scoped + canView ProfilDetail; StatistikLembagaDetail ter-scope `scopedSantriAll`+noSantri; useDataAudit murni computed; cleanup `audit_log` MasterDataView selamat; referensi 3 util migrasi terhapus NIHIL; `setWindowOpenHandler` sinkron src/build) + P9 (hapus dead `cetakStrukDotMatrix`+`buildStrukEscposBase64` di `strukBuilder.js` + rapikan import `PosSantriView`; `buildStrukHtml` TETAP — masih dipakai cetak non-9.5) + BUMP vc99→100 v.100.0626 (13 titik §5, sisa "99.0626" di src = NOL). Verify `_run_vite.cmd` exit 0. PENDING kyai = SHIP: `firebase:deploy` + **`firebase deploy --only functions`** (⚠️ WAJIB — P5 guard fan-out `wa` di `functions/index.js` commit `23d7c9a` BELUM pernah dideploy) + `build:aab` (vc100) + `electron:publish` + `git push` (rules TIDAK berubah sejak v.98 live). T20 Google login = verifikasi device kyai pasca rebuild Electron. ✚ **Batch 9 (fix tes device kyai):** (1) form kenaikan SEKOLAH tampil identitas/label `lembaga_sekolah·kelas_sekolah` (bug tampilan; simpan memang sudah benar) — `NaikKelasView.vue` `formSaatIni`+`santriRowLabel`; (2) backstage Printer = pengaturan PENUH gaya Office (deteksi/pilih/Simpan Default/Tes Cetak ESC/P langsung di `RibbonBackstage.vue`, reuse `useDesktopPrint`; modal global tetap utk POS/Keuangan); (3) tombol **"Gabung Grup Ini"** per-grup di panel Analisis Duplikat (`mergeGroupManual` di `v100_dedupe.js`) — utk grup nama-sama ber-NIS-beda yang auto-Migrate tolak (guard konflik keras by design); merge manual sadar + konfirmasi + backup audit_log. Verify exit 0. ✚ **Batch 10 (4 fitur kyai):** (1) **Migrasi Lembaga** salah-impor (util `v100_lembagaFix.js` + kartu amber di Audit Data: kelas Level/Juz→PTPT, Pra PTPT→Pra PTPT, Jilid→TPQ, `lembaga_sekolah` nilai ngaji→kosongkan, TPQ+TK→cek manual; saran editable, backup audit_log aksi 'update'); (2) **impor+template XLSX Rekap Prestasi Qiraati** (`RekapPrestasiView`, admin, template prefilled, PTPT auto-total+notif_prestasi); (3) **impor+template XLSX assign guru→santri** (`KelasGuruView`, `-`=kosongkan); (4) **`sortLembagaNames()`** sumber tunggal urutan dropdown lembaga (SantriView/GuruView/KelasGuru/Ppdb) + `useSantri` sort jadi **lembaga→NAMA A–Z** (`byNama:true`). Verify exit 0.** Detail tiap batch SELESAI ada di recap v.100 PALING BAWAH + `REKAP-TASK-BATCH-10JUN2026.md`.
> Dokumen onboarding untuk sesi Claude baru. Baca ini DULU sebelum mulai. **Update terakhir: 9 Juni 2026 (UI BATCH + BUMP v.98 — bump versionCode 97→98 di SEMUA titik §5; perubahan: (1) rapor "Dikeluarkan di/Pada Tanggal" label rata KIRI (tepi sejajar) di semua rapor [raporPdf.js + RaporView preview]; (2) filter lembaga di Data Santri & Data Guru: chip → DROPDOWN dgn optgroup Qiraati + Sekolah [match `lembaga` ATAU `lembaga_sekolah`]; (3) FIX Electron: App Check skip reCAPTCHA di `file://`/Capacitor native [stop spam `appCheck/recaptcha-error`], fix TDZ BantuanView [`open` ref dipindah sebelum watch immediate]; (4) "Hubungi Admin" → TOAST kontak author (Rahman Fanani, WA 085331172477, Bakafrawi Project) + info Author/Kontak/Organization di Tentang; (5) Pusat Bantuan kini TAMPIL di web & Android [menu sidebar useMenus + konten platform-aware]. ⚠️ Batch ini sebagian BELUM commit/deploy/rebuild — lihat STATUS di bawah. Recap SEBELUMNYA: AUDIT v.98 RIBBON + SHIP [5 fix keamanan/perf, bump vc97 — sudah live].**
> ⚠️ KB KANONIK = file ini (`PROJECT-KNOWLEDGE-BASE.md`). File lama `PROJECT_KNOWLEDGE_BASE.md` (underscore) DEPRECATED — abaikan.
> 👉 **RECAP TERBARU ada di PALING BAWAH** (cari **"SESI v.98 — UI BATCH + BUMP v.98 (9 Juni 2026)"** = recap TERAKHIR: rapor align + filter dropdown santri/guru + fix Electron App Check/TDZ + kontak author + Bantuan multi-platform + bump vc98; sebelumnya **"SESI v.98 — AUDIT RIBBON + SHIP (9 Juni 2026)"** = audit menyeluruh A–E + 5 fix + bump vc97, SUDAH ship; sebelumnya **"SESI v.98 — RIBBON DESKTOP REDESIGN (Electron-only)"** = redesain shell desktop gaya Ribbon/Office [frameless, pita kontekstual, full-native, updater in-app, Impor Kalender]; **"SESI BMT-PETA"** utk integrasi pembayaran VA santri + pencairan bisyaroh via BMT PETA; "SESI v.97.0626 — RAPOR REDESIGN FULL-ACF" + "SESI v.98.0626" utk layout/rapor/statistik + catatan TRUNCATION raporPdf). ⭐ **CETAK SLIP 2-ply (dot-matrix 9.5") FINAL = ESC/P GRAFIS RASTER** (`utils/escpImage.js` → `print:raw`, BYPASS driver): render canvas Arial → bit-image ESC/P. Driver Windows (PDF/HTML) = kosong/kotak/feed-5cm → JANGAN dipakai utk slip 9.5. Tombol "Struk PDF" tetap PDF (preview/unduh). No.Transaksi: MU-/TB-/US-/BS-NNNddmmyy. Recap sebelumnya: "BATCH 13 ITEM + STRUK SLIP PDF + FCM + VERIFY + NOTIF + NISN", "RECEIPT VIEWER + STRUK ESC/P", "FCM PUSH + STRUK + WIN7".
> ⏳ **STATUS (9 Juni 2026):** SHIP audit v.98 (vc97) SUDAH live. **UI BATCH terbaru (rapor align + filter dropdown Santri) SUDAH commit `b10272c`** (24 file, ikut menyapu fix audit yg menggantung). **SISA UI batch BELUM commit/deploy/rebuild** (uncommitted di working tree): filter Guru (`GuruView`/`useGuru`), fix Electron (`firebase.js` App Check, `BantuanView` TDZ), kontak author (`useRibbonNav`/`BantuanView`), Bantuan multi-platform (`useMenus`/`BantuanView`), **bump vc98** (13 titik §5). **PENDING KYAI = commit + `firebase:deploy` (web) + `build:aab` (vc98, app HP) + rebuild Electron `electron:publish` + push.** (Catatan: git/mount sandbox Cowork sering nampilin HEAD lama/working-tree kotor karena index corrupt + lag — itu artefak, BUKAN indikasi belum commit; sumber kebenaran = mesin Windows kyai.) **Alur rilis baku kyai (PowerShell, pakai `;`):** `tmp_recovery\_run_vite.cmd` (VITE_EXITCODE=0) → `git add -A ; git commit --no-verify` → `npm run firebase:deploy` → `firebase deploy --only firestore:rules,storage` (jika rules diubah) → `npm run build:aab` (bump vc dulu — Capacitor NATIVE bundle) → `npm run build:electron --prefix vue-app ; robocopy dist electron\app /MIR ; cd vue-app\electron ; electron:publish`. **Follow-up DITUNDA (belum dikerjakan):** guard same-`wa` fan-out (functions/index.js), lookup O(n²)→Map (TagihanView/RekapPrestasi), hapus `.rb-greet` dead, mirror catatan otomatis ke `kartu_kenaikan.entries`, migrasi penuh custom-claims rules (`firestore.rules.stage2-proposed`). Detail di section **"SESI v.98 — AUDIT RIBBON + SHIP"** paling bawah.

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
Format `v.<versionCode>.<MMYY>` (MM=bulan, YY=2 digit tahun). Saat ini **v.99.0626** (versionCode **99**, Juni 2026). ⚠️ **Play Console terakhir = vc 98** → vc 99 VALID utk rilis berikut. CATATAN: vc 100 sempat di-set di sesi sebelumnya lalu **DITURUNKAN ke 99** oleh kyai (11 Jun 2026) karena vc 99/100 belum pernah benar-benar ter-upload ke Play. Bump SEMUA tempat saat rilis AAB baru (Play Console tolak versionCode sama):
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


---

## SESI v.98 — RIBBON DESKTOP REDESIGN (Electron-only) — 8–9 Juni 2026, Cowork — RECAP TERBARU, BACA INI

> Workstream **TERPISAH** & paling baru. **Redesain shell DESKTOP (Electron) ke gaya Ribbon (MS Office + Windows 11).** Web & HP **TETAP** pakai shell lama (`AppLayout`). **Backend/data/logika Firebase TIDAK disentuh — hanya lapisan UI/navigasi.** Tag komentar kode `v.98`. **versionCode native BELUM dibump** (electron `package.json` 96.0.626, vue-app `package.json` 97.0626).
> ✅ Sudah di-commit kyai sesi ini (feature/vue-migration). Antrean commit v.98: `51f20c0` shell → `66bd06e` rollout (Supervisi/Tagihan/BukuInduk + Mapel Diniyah + Cek Pembaruan) → `671eaae` Bisyaroh/Kalender → `09b5378` Tabungan/Uang Saku → `4344885` POS/NaikKelas/Rapor → `51cb29b` Impor Kalender → `39a6dd2` sembunyikan header judul (Kelas/Kritik/Personal/Notifikasi).
> ⚠️ **Ribbon HANYA muncul di build Electron.** Kode `.vue` ikut ke-bundle web tapi di-gate `useDesktopShell().isElectron` → web/HP aman. Agar `.exe` dapat Ribbon: **rebuild Electron + `electron:publish`** (web `firebase:deploy` tidak menyentuh desktop).

### LINGKUP & KEPUTUSAN KYAI (verbatim intent)
- Ribbon **Electron saja**; web/HP legacy. **Title bar frameless (Opsi A)** — 1 bar, tombol Min/Max/Close custom.
- **Dark mode = SLATE konsisten** (bukan coklat). Search bar: **jangan dilebarkan, tinggi 30px**. **Card sapaan dihapus** (identitas sudah di title bar).
- **Mapel = editor LANGSUNG** (bukan via Master Lembaga). **Tombol dobel/mati → bangun fiturnya atau hapus** (no placeholder mati). **Pembaruan in-app** (tak perlu buka web/GitHub).
- **Full native**: SEMUA halaman action/tab-heavy → header in-page disembunyikan, aksi/sub-tab pindah ke pita.

### ARSITEKTUR SHELL
- `components/layout/AppShell.vue` (BARU) — toggle: `<RibbonLayout v-if useRibbon>` (Electron) vs `<AppLayout v-else>` (web/HP). Router parent = AppShell.
- `components/ribbon/*` (BARU): **RibbonLayout** (root; `watch route /dashboard→/beranda`; `useUpdater().wire()`), **RibbonTitleBar** (frameless drag, GlobalSearch, AppNotifBell, kartu user `useRibbonUser`, window controls `useWindowControls`), **RibbonTabBar**, **RibbonBar** (render grup tab + grup kontekstual **"Aksi Halaman"** dari `pageActions`, actionStacks ber-3), RibbonGroup, RibbonButton, **RibbonIcon** (peta path SVG, incl. 'restore'), RibbonClock (`useClock`), RibbonStatusBar, **RibbonBackstage** (Pengaturan→/pengaturan-desktop).
- `assets/ribbon.css` (BARU): chrome scoped `.ammu-ribbon-app` + prefix `rb-` + `[data-theme]` light/dark. **Dark = SLATE** (`--rb-app-bg:#0f172a`, `--rb-strip/card:#1e293b`, border `#334155`, teks `#f1f5f9`); `--accent: var(--theme-color,#0f766e)`. Edge-to-edge: `.ammu-ribbon-app .rb-content :is(.max-w-2xl..7xl,.page-narrow){max-width:none!important}`. Search `.rb-searchwrap{width:min(520px,46vw)}` + tinggi 30px.
- **Electron** `electron/src/index.ts`: `frame:false`+`autoHideMenuBar:true`; IPC window (minimize/toggle-maximize/close/is-maximized + event maximized-changed); `setupUpdater(mainWindow)` + IPC `update:check/download/install` + autoUpdater events (**autoDownload=false**). `preload.ts` expose window controls + updater (checkUpdate/downloadUpdate/installUpdate/onUpdateStatus/onUpdateProgress).

### NAVIGASI PITA (`composables/useRibbonNav.js`)
- **7 tab**: Home / Pendidikan / Keuangan / Saluran / Personal / Supervisi / Bantuan. `TABS`+`TAB_PATHS`+`passGate` (admin/keuangan/supervisi/noSantri/superadmin) + `activeTab` watcher + `selectTab` + `onItem` (theme/ribbon/refresh/update/logout/modul/to).
- **Tombol data → mode kelola** (`?kelola=1`): `/santri?kelola=1`, `/guru?kelola=1&tipe=guru`, dst (router `props` map `mode`).
- **Aksi kontekstual**: `composables/useRibbonContext.js` (BARU, `pageActions` singleton + `definePageActions(getActions)`) — tiap view daftarkan aksi halaman; reaktif (watchEffect), **Electron-only**, dibersihkan `onUnmounted`.

### FULL-NATIVE (Electron): header in-page disembunyikan, aksi→pita
Pola per view: `const { isElectron: isDesktop } = useDesktopShell()` + bungkus header `v-if="!isDesktop"` + `definePageActions(...)` di **AKHIR** `<script setup>`. View ter-wire: **Santri, Guru, Tagihan, BukuInduk, Bisyaroh, Supervisi(sub-tab), Kalender, Tabungan, PosSantri, NaikKelas, Rapor** + (sesi ini, judul-saja) **Kelas, Kritik & Saran, Personal, Notifikasi** (Notifikasi: aksi Tandai Dibaca/Bersihkan→pita). **Profil** dilewati (kontennya komponen profil, tak ada judul terpisah).

### FITUR BARU
- **Mapel Diniyah editor langsung** (`views/MapelDesktopView.vue`, route `/mapel-lembaga`): port rekapMapel, simpan ke `settings/general`+`settings/web` (`rekapDiniyahMapel`/`rekapDiniyahKKM`); banner info Diniyah (berkaitan rapor).
- **Cek Pembaruan in-app** (`composables/useUpdater.js` + autoUpdater): ada update → konfirm download → progres → konfirm install; tak ada → **toast "aplikasi sudah versi terbaru"**.
- **Impor Kalender Kegiatan** (`views/ImporKalenderView.vue`, route `/impor-kalender`, admin): unduh template Excel → unggah → pratinjau (valid/dilewati) → impor ke koleksi **`kegiatan`** via `useKegiatan().simpanKegiatan` (toleran format tanggal + alias kolom). Akses: pita tab **Kalender → "Impor Excel"**.
- **BerandaDesktopView** (2 dasbor: statistik + keuangan, via `useStatistikDashboard`/`useKeuanganDashboard`), **KeuanganDesktopView**, **PengaturanDesktopView** (hub kartu ACF/CRUD → /pengaturan-desktop), **BantuanView** (konten nyata, `?bagian`), RibbonPlaceholderView.

### FILE BARU (utama)
composables: `useDesktopShell, useWindowControls, useRibbonNav, useRibbonContext, useUpdater, useRibbonPrefs, useRibbonUser, useStatistikDashboard, useKeuanganDashboard, useClock`. components: `layout/AppShell.vue`, `ribbon/{RibbonLayout,RibbonTitleBar,RibbonTabBar,RibbonBar,RibbonGroup,RibbonButton,RibbonIcon,RibbonClock,RibbonStatusBar,RibbonBackstage}.vue`. assets: `ribbon.css`. views: `BerandaDesktopView, KeuanganDesktopView, MapelDesktopView, PengaturanDesktopView, ImporKalenderView, RibbonPlaceholderView, BantuanView`. electron: `src/index.ts` (frameless+IPC+updater), `src/preload.ts`. router: rute baru (bantuan, modul/:judul, beranda, keuangan-desktop, kelas-guru, mapel-lembaga, pengaturan-desktop, impor-kalender) + `/santri`&`/guru` props mode.

### CATATAN NOTIFIKASI SUPERVISI (rujukan utk audit notif)
Catatan supervisi (koleksi **`supervisi_catatan`**, dibuat dari menu **Data Supervisi**) sampai ke akun guru/kepala/PJ lewat **2 jalur**: (1) **lonceng notif** — `useNotifications.getSupervisi()` filter `target_type==='guru' && target_id===me` ATAU `target_type==='lembaga' && isKepala(lembaga itu)`, jenis `'supervisi'`, link `/personal`; (2) **halaman Personal** → bagian **"Catatan Supervisi"** (filter sama), status Open→Diproses→Selesai. Menu `/supervisi` = sisi **pembuat/supervisor** (Buat/Riwayat/Rekap).

### ⚠️ GOTCHA (Cowork — sama spt sesi lain)
- **Mount LAG**: SFC compile via Linux mount memberi "Element is missing end tag"/"Unexpected EOF" **PALSU** utk file baru di-Edit/Write. **Read tool (D:\) = AUTHORITATIVE.** Gate asli = build Windows kyai (`tmp_recovery\_run_vite.cmd`).
- **`definePageActions` taruh di AKHIR `<script setup>`** (setelah deklarasi ref): fungsi ter-hoist, ref tidak → hindari TDZ.
- **Bash workspace cold-start** kadang timeout 45s → retry. **git di sandbox Linux kadang aneh** (`ls-files` glitch) → file D:\ tetap kebenaran.
- **PowerShell kyai pakai `;` BUKAN `&&`** (gabung command). Selalu `cd "D:\Aplikasi Project\Portal MU";`.

### ⏳ PENDING — SESI BERIKUTNYA (ANTREAN AUDIT + SHIP, instruksi kyai)
**A. AUDIT ELECTRON menyeluruh** — (1) semua fitur berfungsi; (2) **tak ada tombol mati/placeholder**; (3) UI/UX rapi (spacing, alignment, dark **slate** konsisten, edge-to-edge); (4) **sesuai kode desain Visual Communication** (token warna/tipografi/aksen — banding ke prototipe `design_handoff_ammu_desktop/`).
**B. AUDIT WEB + ANDROID** — performa bagus di semua device (bundle/lazy-load, list besar, langganan Firestore, memori).
**C. AUDIT NOTIFIKASI sesuai rule (role & scope)** — pembayaran/tagihan; **catatan prestasi anak → akun walisantri**; **catatan kelas guru & bisyaroh → akun guru**; supervisi → guru/kepala/PJ; kritik → admin; libur/kenaikan → audiens tepat. Cek `useNotifications.js` + Cloud Functions FCM (`functions/index.js`).
**D. AUDIT SEMUA FILTER DATA sesuai role & scope (ANTI DATA BOCOR)** — santri/wali hanya datanya sendiri; guru sesuai lembaga/kelas; admin_keuangan sesuai scope; tak ada kebocoran lintas-lembaga/akun. Cek `utils/roleScope.js` + filter tiap composable/view + `firestore.rules`.
**E. CEK KARTU KENAIKAN** — pastikan **tgl & catatan terisi OTOMATIS dari proses naik kelas** (`NaikKelasView` + sumber data kenaikan), bukan kosong/manual.
**F. JIKA SEMUA LOLOS → SHIP** — `git commit` → `npm run firebase:deploy` (web/PWA) → rebuild **AAB** (bump versionCode ≥97 di SEMUA titik §5) untuk Play → **`electron:publish`** (GitHub `kollepiyah/ammu`, electron-updater) → **push git** → update KB + rekap task → **DONE**.

> ✅ **ANTREAN A–F = SELESAI SEMUA** pada sesi 9 Juni 2026 (audit + 5 fix + SHIP → app live). Hasil + fix ada di recap berikut. Laporan audit lengkap (5 area, tabel verdict, bukti baris-per-baris): `AUDIT-COWORK-09JUN2026-RIBBON-SHIP.md`.


---

## SESI v.98 — AUDIT RIBBON + SHIP (9 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU

> Eksekusi antrean **A–F** dari recap "RIBBON DESKTOP REDESIGN" di atas: audit menyeluruh 5 area + remediasi + SHIP. versionCode **96→97**, versionName **v.97.0626**. Branch feature/vue-migration. ✅ **STATUS: SUDAH commit + deploy (web/PWA + rules) + rebuild AAB vc97 + Electron publish + push — APP LIVE.** Laporan audit lengkap: `AUDIT-COWORK-09JUN2026-RIBBON-SHIP.md`.

### VERDICT AUDIT (5 area)
- **A — Electron Ribbon:** ✅ **SHIP-READY** (P0:0, P1:0). 7 tab → tombol → rute SEMUA valid, NOL tombol mati/placeholder; dark **slate** konsisten (`#0f172a/#1e293b/#334155/#f1f5f9`, aksen `var(--theme-color)`); frameless + window controls + updater ter-wire; paritas desain Visual Communication PASS (dark slate = penyimpangan DISENGAJA dari handoff coklat, sesuai keputusan kyai).
- **B — Performa Web+Android:** ⚠️ fix-first. P0 = versionCode belum bump (DIPERBAIKI). Listener Firestore bocor tanpa cleanup (DIPERBAIKI). INTACT: rute lazy, prefetch dibatasi, manualChunks per-lib, jspdf/exceljs/messaging dynamic-import (bukan CDN/eager), capacitor `webDir:dist` tanpa `server.url` (native benar).
- **C — Notifikasi per role & scope:** ✅ rute SEMUA BENAR (tagihan/pembayaran→wali, bisyaroh/supervisi→guru, prestasi→walisantri, kritik→admin, transfer→admin verifikator, dst). `functions/index.js` 1035 baris UTUH. P0 = lonceng in-app dibangun klien tanpa filter Firestore (akar = postur rules, sama dgn area D) → DIPERBAIKI via rules quick-win.
- **D — Filter data anti-bocor:** ⚠️ fix-first. P0 = Global Search→Profil bisa buka SEMUA santri/guru lintas-lembaga utk role guru (DIPERBAIKI). Invarian santri/wali, Kepala/PJ, admin_keuangan/super = PASS.
- **E — Kartu kenaikan auto-isi:** ✅ **PASS**. Tanggal auto end-to-end (`NaikKelasView.saveFormKenaikan` tulis `kartu_kenaikan[...]=today`; RaporView/raporPdf baca key sama → "Tgl Khotam" terisi). `useKartuKenaikan.js` sudah tidak ada (logika inline). Catatan otomatis ditulis ke `riwayat_kenaikan` bukan `kartu_kenaikan.entries` (P3 opsional, bukan bug).

### 5 FIX DITERAPKAN (semua surgical, verifikasi Read tool D:\ authoritative)
1. **Anti-bocor (D-P0/P1):** `components/layout/GlobalSearch.vue` `santriRaw`/`guruRaw` (mentah) → `santri`/`guru` (TER-SCOPE dari useSantri/useGuru); guru kini hanya temukan santri **ampuannya**, daftar guru kosong utk non-admin. `views/ProfilDetailView.vue` + guard **`canView(tp,rec)`** (admin/super/keu bebas; guru = ampuan/diri; Kepala = `lembagaScopeMatches`) → di luar scope tampil "Data tidak ditemukan" (tutup deep-link `#/profil/:tipe/:id`).
2. **Listener leak (B-P1):** + `onUnmounted` cleanup di `composables/useSantriForm.js` (unsubLembaga + unsubGuru koleksi `guru` penuh), `views/MasterDataView.vue` (audit_log), `views/KelasView.vue` (master/lembaga).
3. **versionCode → 97 (B-P0, §5):** `android/app/build.gradle` (vc97 + vn v.97.0626), root `package.json` (97.0626), `electron/package.json` (97.0.626), footer LoginView/DashboardView/PpdbAdminView. (vue-app/package.json, main.js Sentry, Ribbon StatusBar/Backstage, AppSidebar, BantuanView SUDAH 97.)
4. **Rules quick-win (C-P0 / D-postur):** `firestore.rules` `read: if true` → **`if signedIn()`** utk **15 koleksi sensitif** (keuangan_tagihan/tabungan_santri/uang_saku/gaji/buku_induk/hutang_piutang/pembayaran, tabungan_mutasi, rapor_semester, rekap_diniyah, rekap_prestasi, riwayat_kenaikan, supervisi_catatan, notif_prestasi, audit_log) + `notif_queue` read → **`false`** (server-only, sembunyikan token FCM). Login-path TETAP publik (master/settings/guru/santri/lembaga/posts/kegiatan/beranda_post). Custom-auth + Anonymous tanpa role-claim → ini quick-win, bukan migrasi penuh.
5. **Build-blocker (bug BAWAAN v.98, BUKAN dari edit audit):** `views/TabunganView.vue` (L819+L1169) & `views/PosSantriView.vue` (L242+L248) deklarasi **`isDesktop` DOBEL** → `[vue/compiler-sfc] Identifier 'isDesktop' has already been declared` → build:electron gagal. Buang baris v.98 yang dobel (`const { isElectron: isDesktop } = useDesktopShell()`), pertahankan `const isDesktop` awal. Scan proaktif 31 file v.98 (20 view + 11 Ribbon/shell) = 0 duplikat lain.

### FILE DIUBAH (sesi audit ini)
`components/layout/GlobalSearch.vue`, `views/ProfilDetailView.vue`, `composables/useSantriForm.js`, `views/MasterDataView.vue`, `views/KelasView.vue`, `views/TabunganView.vue`, `views/PosSantriView.vue`, `firestore.rules`, `android/app/build.gradle`, `package.json` (root), `electron/package.json`, footer (LoginView/DashboardView/PpdbAdminView). BARU: `AUDIT-COWORK-09JUN2026-RIBBON-SHIP.md`.

### ⚠️ TES KYAI saat deploy rules (timing anon-auth) — penting
Koleksi sensitif kini butuh sesi login. App pakai persisted-anon + `await ensureAnonAuth()` saat login → secara teori aman. **Tes:** (1) login baru → buka Keuangan/Rapor + lonceng notif terisi; (2) **reload keras saat masih login** → data & lonceng tetap muncul TANPA "Missing or insufficient permissions" di console. Jika ada yang kosong → race anon-auth → tunda subscribe sampai auth siap, atau revert koleksi itu ke `if true`.

### ▶️ URUTAN SHIP (✅ SUDAH dijalankan kyai — arsip; PowerShell, pakai `;`)
```powershell
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd                       # WAJIB VITE_EXITCODE=0 (cek fix #5 isDesktop)
git add -A ; git commit --no-verify -F .\tmp_recovery\_msg.txt
npm run firebase:deploy                            # web/PWA
firebase deploy --only firestore:rules,storage     # rules hardening v.98 (lalu TES timing anon-auth di atas)
npm run build:aab                                  # vc97 (butuh keystore)
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; $env:GH_TOKEN="<token kollepiyah/ammu>" ; npm run electron:publish ; cd ..\..
git push
```
> functions TAK diubah sesi ini → `firebase deploy --only functions` hanya bila kelak terapkan guard same-`wa` (C-P1). Ribbon hanya muncul setelah `electron:publish`. Husky → selalu `--no-verify`.

### PENDING / FOLLOW-UP (ditunda — belum dikerjakan)
- **C-P1:** guard same-`wa` fan-out di `functions/index.js` `resolveTokensByTarget` (`if (wa && wa.length>=8)` + pastikan `wa` unik) — cegah bocor lintas-keluarga bila wa kosong/duplikat. Butuh `firebase deploy --only functions`.
- **B-P2:** lookup O(n²) per baris (TagihanView `getNamaSantri`, RekapPrestasi `find`) → pakai Map; render daftar tak terbatas (virtualize bila skala ribuan).
- **A-P2:** fallback versi Ribbon StatusBar/Backstage v.97→tampilkan terbaru; hapus `.rb-greet` dead (CSS + cabang greeting); QAT title bar (Save/Undo/Redo) dekoratif → wire atau buang.
- **E-P3:** mirror narasi otomatis ke `kartu_kenaikan[...].entries` agar kartu terisi tanpa ketik manual.
- **Arsitektur (workstream terpisah):** migrasi penuh ke auth ber-custom-claim (`role`/`lembaga`/`santri_id`) lalu ketatkan read per-record — `firestore.rules.stage2-proposed`. Quick-win #4 sudah menutup eksposur fully-public sementara.
- **Backlog lama tetap:** pensiun model TPQ-shift; hapus lembaga lama "P3H" (alias→PPPH) di Master Data; BMT-PETA aktivasi (isi `rek_bmt` guru, sambung API → set `bmt_webhook_enabled`/`bmt_disburse_enabled`); FCM `google-services.json` + `cap sync` jika belum.

### GOTCHA (sama spt sesi Cowork lain)
- Mount/bash sandbox menyajikan salinan **STALE/terpotong** (root `package.json` "rusak" L59, `firestore.rules` tail terpotong, ProfilDetail `canView`=0) = artefak mount; file asli D:\ BENAR (Read tool authoritative). git sandbox Linux **index corrupt** → `git status`/`git diff` sandbox tak dipercaya; `git show HEAD:path` jalan. Build asli = kyai `tmp_recovery\_run_vite.cmd` (VITE_EXITCODE=0).
- Ribbon HANYA muncul di build Electron (`useDesktopShell().isElectron`); `firebase:deploy` tak menyentuh desktop → WAJIB `electron:publish` agar `.exe` dapat Ribbon.


---

## SESI v.98 — UI BATCH + BUMP v.98 (9 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU

> Lanjutan setelah SHIP audit v.98. Kumpulan perbaikan UI/UX + fix Electron + bump versionCode **97→98** (v.98.0626). Branch feature/vue-migration. ⚠️ **Sebagian SUDAH commit (`b10272c`), sebagian BELUM** — lihat STATUS COMMIT di bawah. Semua edit terverifikasi Read tool (D:\) + compile `@vue/compiler-sfc`/`node --check` di /tmp (false-positive "missing end tag"/"Unexpected end of input" = mount stale, KB-documented). Gate asli = kyai `tmp_recovery\_run_vite.cmd`.

### DIKERJAKAN
1. **Rapor — "Dikeluarkan di / Pada Tanggal" rata KIRI** (semua jenis rapor): label dulu rata-KANAN → "Pada Tanggal" menjorok, tepi kiri ragged. Sekarang label rata-kiri di `_dkLabelX` sama (lebar dari `getTextWidth` label terpanjang) + titik dua (`_dkColonX`) & nilai tetap sejajar. `utils/raporPdf.js` `drawSignBlocks` + `views/RaporView.vue` (td `text-right`→`text-left`, paritas layar=PDF). 1 titik = berlaku PTPT/Pra-PTPT/Diniyah/TPQ.
2. **Filter lembaga = DROPDOWN (gantikan chip) di Data Santri & Data Guru** + mencakup **lembaga SEKOLAH (formal)**:
   - Logika: `useSantri.js` & `useGuru.js` filter cocokkan `s.lembaga` **ATAU** `s.lembaga_sekolah` (guru case-insensitive).
   - UI: `SantriView.vue` & `GuruView.vue` — chip dihapus, jadi `<select>` dgn **optgroup "Qiraati (Ngaji)"** + **"Sekolah (Formal)"**. Computed baru `uniqueLembagaSekolah` (Santri: koleksi `lembaga_sekolah`; Guru: dedupe case-insensitive + Title Case spt `uniqueLembaga`). Layout: search full-width di atas, dropdown sejajar di bawah.
3. **FIX Electron (dari console error kyai):**
   - **App Check reCAPTCHA spam** (`appCheck/recaptcha-error` berulang): reCAPTCHA v3 tak jalan di Electron `file://` & Capacitor native. `services/firebase.js` — init App Check HANYA bila origin web http(s) (`_isWebOrigin`: protocol http/https, bukan UA Electron, bukan `Capacitor.isNativePlatform()`) ATAU ada debug token. App Check masih MONITOR (belum Enforce) → aman.
   - **TDZ BantuanView** (`ReferenceError: Cannot access 'd' before initialization`): `watch(route.query.bagian, …, {immediate:true})` mengakses `open.value` padahal `const open = ref(-1)` dideklarasi SETELAH watch → TDZ saat setup. Fix: pindahkan `const open` ke ATAS sebelum watch.
4. **"Hubungi Admin" → TOAST kontak author** (ganti arah ke Kritik & Saran): `useRibbonNav.js` item action `kontak` + `BantuanView.vue` kartu `kontak:true` → `toast.info('Hubungi Admin — Rahman Fanani · WA: 085331172477 (Bakafrawi Project)', 8000)`. "Lapor Bug" TETAP ke /kritik-saran. **Tentang** + 3 baris: Author (Rahman Fanani), Kontak (WA 085331172477), Organization (Bakafrawi Project).
5. **Pusat Bantuan tampil di WEB & ANDROID** (sebelumnya hanya pita Bantuan di Electron): `useMenus.js` + entry group "Bantuan" (`/bantuan`, semua role). `BantuanView.vue` **platform-aware** (`useDesktopShell().isElectron` + `Capacitor.isNativePlatform()`): judul/baris Platform/teks intro menyesuaikan Desktop/Android/Web. Teks panduan diperbarui ("chip lembaga"→"dropdown lembaga", "tab"→"menu", FAQ tema netral). Route `/bantuan` tak ber-gate → terbuka semua platform.
6. **BUMP v.98.0626 (vc 97→98) — 13 titik §5:** `build.gradle` (vc98+vn), `package.json` root+vue-app ("98.0626"), `electron/package.json` ("98.0.626"), `main.js` Sentry ("portal-mu@98.0626"), footer LoginView/DashboardView/PpdbAdminView/AppSidebar, fallback RibbonStatusBar/RibbonBackstage/BantuanView ("v.98.0626"). (Komentar tag `// v.97.0626:` historis = dibiarkan.)

### STATUS COMMIT (PENTING utk sesi baru)
- ✅ **SUDAH commit `b10272c`** (kyai, "feat(santri): filter lembaga jadi dropdown…", 24 file): rapor align (#1) + filter Santri (#2 bag. santri) + **menyapu fix audit v.98 yg menggantung** (firestore.rules hardening, vc97, AUDIT-…md). Lalu kyai rebuild Electron → muncul console error App Check/TDZ → lahir fix #3.
- ⏳ **BELUM commit (working tree):** #2 bag. **Guru** (`GuruView.vue`, `useGuru.js`), #3 (`services/firebase.js`, `BantuanView.vue`), #4 (`useRibbonNav.js`, `BantuanView.vue`), #5 (`useMenus.js`, `BantuanView.vue`), #6 bump vc98 (13 file). **`b10272c` masih vc97** → AAB perlu rebuild lagi di vc98 setelah commit batch sisa.

### FILE DIUBAH (batch ini, di luar yg sudah di b10272c)
`views/GuruView.vue`, `composables/useGuru.js`, `services/firebase.js`, `views/BantuanView.vue`, `composables/useRibbonNav.js`, `composables/useMenus.js`; bump: `android/app/build.gradle`, `package.json`(root+vue-app), `electron/package.json`, `src/main.js`, `views/{LoginView,DashboardView,PpdbAdminView}.vue`, `components/layout/AppSidebar.vue`, `components/ribbon/{RibbonStatusBar,RibbonBackstage}.vue`.

### YANG HARUS KYAI JALANKAN (PowerShell, pakai `;`)
```powershell
cd "D:\Aplikasi Project\Portal MU"; .\tmp_recovery\_run_vite.cmd          # VITE_EXITCODE=0
if (Test-Path ".git\index.lock") { Remove-Item -Force ".git\index.lock" } # lock basi sering nyangkut
git add -A ; git commit --no-verify -m "feat(v.98): filter lembaga dropdown Guru, fix Electron App Check/TDZ Bantuan, Hubungi Admin toast kontak, Bantuan multi-platform (web/Android), bump vc98"
npm run firebase:deploy                                                    # web/PWA
npm run build:aab                                                          # vc98 (app HP — Capacitor NATIVE)
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
git push
```
(firestore.rules TIDAK diubah batch ini → tak perlu deploy rules lagi. functions juga tak diubah.)

### CATATAN / GOTCHA
- **`.git/index.lock` basi** sering bikin commit gagal ("File exists / Another git process") padahal tak ada proses git → `Remove-Item -Force ".git\index.lock"` lalu commit ulang (KB §10/cara kerja).
- **App Check**: Electron/Android kini TANPA App Check token. Saat nanti Console di-**Enforce**, desktop/native butuh debug token / Play Integrity dulu (jangan Enforce sebelum itu).
- **Bantuan di mobile**: muncul di **sidebar drawer** (group "Bantuan"), bukan bottom-nav (bottom-nav tetap 5 tab). Konten `BantuanView` menyesuaikan platform via `useDesktopShell`+`Capacitor.isNativePlatform()`.
- Mount/bash sandbox tetap STALE/terpotong utk file yg di-Edit → Read tool authoritative; `node --check` lulus = file valid walau `tail` tampak terpotong.


---

## SESI v.99.0626 — AUDIT MASTER DATA + FORM SANTRI/GURU + FILTER PKBM + XLSX + KELAS-FLOW + BUMP v.99 (9 Juni 2026, Cowork) — RECAP TERBARU, BACA INI DULU
> Web/JS murni **+ BUMP versionCode 98→99** (versionName v.99.0626). Branch feature/vue-migration. Verifikasi via **Read tool authoritative** (mount Cowork serve file TERPOTONG → parser bash tak reliabel; gate build = kyai `tmp_recovery\_run_vite.cmd`). Laporan lengkap: `AUDIT-COWORK-09JUN2026-MASTERDATA-FORM-XLSX.md`.

### DIKERJAKAN
1. **Form edit santri**: + field `nik` (load+simpan; sebelumnya ada di template tapi yatim) ; `save()` → `setDoc(...,{merge:true})` (anti-wipe field tersimpan: wa_2/psb_id/shift_qiraati/lembaga_refs). [`useSantriForm.js`]
2. **Guru tak terbaca di form santri** — AKAR: `guruByLembaga`/`guruByLembagaSekolah` filter `tipe_pegawai` **legacy** (ngaji/ngaji_sekolah/sekolah), padahal `useGuruForm` simpan **baru** (guru/pegawai/pegawai_guru). FIX: helper `_isGuruMengajar` (baru+legacy+kosong) + match `lembaga` ATAU `lembaga_sekolah`. [`useSantriForm.js`]
3. **Filter Data Santri**: PKBM → **SMP/SMA** (turunan kelas via `getPkbmSubTier`), tanpa opsi "PKBM". Data tetap `lembaga_sekolah='PKBM'` (TANPA migrasi). [`useSantri.js`+`SantriView.vue`]. **Guru & NaikKelas SENGAJA tetap "PKBM"** (guru tak ber-kelas; promosi = unit PKBM). Rapor/RekapDiniyah/Statistik/Absensi sudah SMP/SMA sejak v.90/v.98.
4. **Template/ekspor/impor XLSX**: Santri 46 kolom (NISN/NIK/panggilan/tempat lahir/No KK/alamat detail/ayah-ibu flat+nested/asal sekolah/penghasilan/keluar) ; Guru (+NIK/Tgl Lahir/Jabatan Tambahan/Tanggal Tugas/EKGQ/**No Rek BMT**/Pendidikan/Tipe-Shift-Role-Fingerprint, FIX hint Tipe Pegawai ke taksonomi baru, `_normTipeGuru` normalisasi legacy→baru saat impor). [`SantriView.vue`+`GuruView.vue`]
5. **Kelas & Guru → ALUR KELAS (REWRITE, pilihan kyai opsi B):** kategori→lembaga→**KELAS (+tambah kelas)**→pilih **1-2 guru** (Pagi/Sore atau 2 guru sekolah)→assign santri. Default guru kelas disimpan di **`master/lembaga.list[i].kelas_guru[kelas]`** (`{guru_pagi,guru_sore}` / `{guru_sekolah:[]}`). Penugasan tetap ditulis ke santri (`guru_pagi`/`guru_sore`/`guru_sekolah`, non-destruktif) → kompat downstream. [`KelasGuruView.vue`]
6. **Form santri PREFILL** guru dari `kelas_guru` default saat lembaga+kelas dipilih & guru kosong (non-destruktif). [`useSantriForm.js`]
7. **BUMP v.99.0626** (vc 98→99) di SEMUA titik §5 + fallback display Ribbon/Bantuan. Komentar tag historis `v.98.0626` SENGAJA tak diubah.

### KOMPAT (sudah dicek) — rekap/rapor/kenaikan OK ✅
- Field BARU `kelas_guru` di `master/lembaga` **DIPERTAHANKAN** semua penulis lembaga (`LembagaDetailView.saveLembagaKelas`/`simpanPengaturan` + `useLembagaForm.save` pakai spread `{...existing}`). Aman dari ke-wipe saat edit lembaga.
- **Rapor** baca `guru/guru_pagi/guru_sore/guru_sekolah` → otomatis terisi dari alur Kelas baru (sinergi). **Rekap** pakai jenjang SMP/SMA (sudah ada). **Kenaikan** pakai `updateDoc` partial → field baru aman. Catatan: naik kelas TIDAK auto-ubah guru (sama spt sebelumnya; prefill kelas membantu saat edit santri).

### FILE DIUBAH
`composables/useSantriForm.js`, `composables/useSantri.js`, `views/SantriView.vue`, `views/GuruView.vue`, `views/KelasGuruView.vue` (REWRITE). Bump: `vue-app/android/app/build.gradle`, `package.json`(root+vue-app), `vue-app/electron/package.json`, `vue-app/src/main.js`, footer `AppSidebar/LoginView/DashboardView/PpdbAdminView`, fallback `RibbonBackstage/RibbonStatusBar/BantuanView`. BARU: `AUDIT-COWORK-09JUN2026-MASTERDATA-FORM-XLSX.md`.

### KYAI JALANKAN (PowerShell, `;`)
```
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd                                  # cek VITE_EXITCODE=0
if (Test-Path ".git\index.lock") { Remove-Item -Force ".git\index.lock" }
git add -A ; git commit --no-verify -m "feat(v.99): NIK+merge-safe santri, guru terbaca (taksonomi tipe_pegawai), filter PKBM->SMP/SMA, XLSX santri+guru lengkap, Kelas&Guru alur-kelas + prefill form, bump vc99"
npm run firebase:deploy                                       # web/PWA
npm run build:aab                                             # AAB vc99 (Play Console) — butuh keystore
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
git push
```
**firestore.rules TIDAK diubah** sesi ini (tulis `master/lembaga` + `santri` sudah diizinkan) → tak perlu deploy rules.

### PENDING / NEXT
- Setelah deploy: kyai isi guru tiap KELAS via halaman Kelas & Guru (otomatis jadi default + prefill form santri).
- Opsional: auto-reset/assign guru saat Naik Kelas (sekarang manual). Isi `rek_bmt` guru utk Laporan BMT.
- Backlog lama tetap (audit RBAC mendalam, pensiun TPQ-shift, hapus lembaga lama "P3H").

### BATCH LANJUTAN v.99 (sesi sama — fix + fitur tambahan)
1. **Electron asar AKTIF** (`electron/package.json`: `asar:true` + `asarUnpack:["assets/**/*"]`) — warning hilang; splash/icon dibaca via fs tetap jalan (Electron asar-aware). **WAJIB rebuild Electron.**
2. **Filter jabatan (GuruView)** bersumber dari **master/jabatan** (yang kyai tambahkan), bukan distinct data guru (+subscribeDoc; fallback distinct guru bila master kosong).
3. **Kepala TPQ = SEMUA lembaga Qiraati** (umbrella 'Qiraati'); PJ Administrasi tetap 'Qiraati'. (JABATAN_QIRAATI_UMBRELLA=[PJ Administrasi, Kepala TPQ]; getLembagaGroup dikembalikan ke asal.)
4. **Profil guru** baris "Lembaga/Devisi" → relabel **"Lembaga:"** (istilah "Devisi" dibuang; lembaga tetap tampil). [`ProfilGuru.vue`]
5. **PKBM**: santri TETAP split SMP/SMA; **guru TIDAK displit** (Statistik: guru = total lembaga PKBM, sama di kartu SMP & SMA). [`StatistikView.vue`]
6. **`getPkbmSubTier` robust** (VII-XII, 7-12, "Kelas X", case-insensitive). ⚠️ Kalau SMP/SMA masih ~0 santri: cek record benar2 `lembaga_sekolah='PKBM'`+kelas VII-XII (bukan bug klasifikasi; `kelasJenjang` Rapor/Rekap sudah robust).
7. **MUTASI santri (#21)** — **Kenaikan/Mutasi → tab "Mutasi"**: kategori (Qiraati/Sekolah) → filter lembaga → list → **Keluarkan** (tgl+alasan, aktif=false) + toggle "sudah keluar" → **aktifkan kembali**. [`NaikKelasView.vue`]
8. **KENAIKAN lembaga SEKOLAH (#19)** — "Form Kenaikan" + toggle **Qiraati/Sekolah**. Sekolah → TK/SDI/SMP/SMA → list (match `lembaga_sekolah`, SMP/SMA=jenjang PKBM) → form perbarui **Kelas Sekolah**. Akar lama: filter Qiraati-only + list match `lembaga` ngaji. Simpan `updateDoc` parsial (ngaji aman). [`NaikKelasView.vue`]

### FILE DIUBAH (batch lanjutan)
`electron/package.json`, `composables/{useGuruForm,useLembaga}.js`, `views/GuruView.vue`, `views/StatistikView.vue`, `views/profil/ProfilGuru.vue`, `views/NaikKelasView.vue`.

### MASIH PENDING (sesi berikutnya)
- **#17 Hubungi Admin**: toast → **popup/modal detail** + **edit kontak admin** + **ACF konten menu Bantuan** (simpan settings). (`useRibbonNav.js` L343 + `BantuanView.vue` AUTHOR hardcoded.)
- **#18 Analisis duplikat** (audit): santri (NIS/NISN/nama) & guru (WA/nama).
- **#20 Statistik detail kelas per lembaga** (drill-down kelas → guru + daftar santri) di dasbor.
- **#3 "Filter Semua lembaga"**: tunggu contoh konkret dari kyai.

### DEPLOY/REBUILD FINAL (SEMUA batch v.99 — PowerShell)
```
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd
if (Test-Path ".git\index.lock") { Remove-Item -Force ".git\index.lock" }
git add -A ; git commit --no-verify -m "feat(v.99): audit master data — NIK+merge santri, guru terbaca (taksonomi), PKBM->SMP/SMA, XLSX santri+guru, Kelas&Guru alur-kelas+prefill, jabatan filter master, Kepala TPQ=Qiraati, asar Electron, mutasi + kenaikan sekolah, bump vc99"
npm run firebase:deploy
npm run build:aab
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
git push
```
firestore.rules TIDAK diubah → tak perlu deploy rules.

---

### BATCH v.99 — IMPOR FIX + 3 FITUR LANJUTAN (lanjutan, sesi sama) — SEMUA SELESAI ✅
**A. Fix impor & WA & jabatan (web/JS):**
1. **Impor guru ke-skip semua** → header template `'Nama Guru (Dengan Gelar)'` tak cocok alias `_pick('Nama Guru')`. Alias ditambah. [`GuruView.vue`]
2. **`normalizeWA`** (utils/format.js): `+62`→`0`, dan **awalan bukan 0 → tambah 0**. Dipakai di impor + simpan form guru/santri.
3. **`parseMultipleWA`**: pemisah lebih luas (`/ ; , |` newline, "dan", 2+ spasi) + dedup → WA wali dobel impor santri = 2 nomor (`wa` + `wa_2`).
4. **Jabatan butuh-lembaga dari master/jabatan `tipe_lembaga`** ("Perlu/Tanpa Lembaga"), bukan `tipe_pegawai`. Field lembaga muncul & wajib hanya bila jabatan butuh lembaga. [`useGuruForm.js` + `GuruFormView.vue`]

**B. 3 fitur lanjutan:**
5. **#17 Hubungi Admin** → **POPUP modal** (bukan toast) + **edit kontak admin** (settings `adminNama/adminWa/adminOrg`) + **ACF Panduan & FAQ** (super_admin edit/tambah/hapus/reset, simpan `settings.bantuanPanduan/bantuanFaq`, fallback default). Pita "Hubungi Admin" → `/bantuan?kontak=1` buka popup. [`BantuanView.vue`, `useRibbonNav.js`]
6. **#18 Analisis Data Duplikat** — Master Data → tab **"Audit Data"**: kartu deteksi duplikat santri (Nama/NIS/NISN) + guru (Nama/WA), tampil grup + anggota; rapikan manual via Edit/Hapus. [`MasterDataView.vue`]
7. **#20 Statistik detail kelas** — StatistikView: **klik kartu lembaga → drill-down kelas** (guru pengampu + daftar santri). Dukung Qiraati + Sekolah (SMP/SMA). [`StatistikView.vue`]

### FILE DIUBAH (batch ini)
`utils/format.js`, `views/GuruView.vue`, `composables/{useGuruForm,useSantriForm}.js`, `views/GuruFormView.vue`, `views/BantuanView.vue`, `composables/useRibbonNav.js`, `views/MasterDataView.vue`, `views/StatistikView.vue`.

### STATUS: SEMUA permintaan kyai v.99 SELESAI. Pending kecil: **#3 "Filter Semua lembaga"** (tunggu contoh konkret). Settings BARU (opsional diisi admin): `adminNama/adminWa/adminOrg`, `bantuanPanduan[]`, `bantuanFaq[]` — semua punya fallback.

### DEPLOY (web cukup `firebase:deploy`; Electron rebuild bila mau ke desktop)
```
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd ; if (Test-Path ".git\index.lock"){Remove-Item -Force ".git\index.lock"} ; git add -A ; git commit --no-verify -m "feat(v.99): impor guru fix, WA leading-0+multi, jabatan tipe_lembaga, Hubungi Admin popup+ACF Bantuan, analisis duplikat, statistik detail kelas" ; npm run firebase:deploy
```
firestore.rules TIDAK diubah.

---

## SESI v.100 — BATCH BARU KYAI (20 TASK), BATCH 1–5 SELESAI (10 Juni 2026) — RECAP TERBARU, BACA INI

> Kyai memberi **20 task baru** (audit + fitur Electron Ribbon + skema kenaikan Sekolah + urutan lembaga + login). Saya bagi jadi **8 batch**. **Rencana lengkap + peta task→file + urutan eksekusi = `REKAP-TASK-BATCH-10JUN2026.md`** (baca itu untuk detail tiap task).
> Keputusan kyai: halaman Bisyaroh/Syahriyah khusus (Batch 4) = **Electron saja** (web/Android tetap pakai Pengaturan Keuangan gabungan).
> **PROGRES:** ✅ Batch 1–5 SELESAI + SUDAH commit + deploy/rebuild kyai (commit `17b02e5`→`8b676a7`→`65d2f33`→`b403935`→`78c9cb5`; lihat ringkasan tiap batch di bawah). ⏳ LANJUT = **Batch 6 (Kenaikan/Mutasi skema SEKOLAH [T2] — RISIKO TINGGI)**, lalu Batch 7 (login Electron) & Batch 8 (re-audit + bump vc≥100 + ship).
> **Pola section-aware (dipakai B4 & B5):** view besar dibuat fokus via `?section=...` + `secVisible()` + **`v-show`** (BUKAN v-if, supaya field tetap ter-mount → Simpan tetap utuh). Tanpa query (web/Android) tampil PENUH. Tombol pita deep-link ke `?section=`. Contoh: `PengaturanKeuanganView`, `PpdbAdminView`.

### ✅ SELESAI Batch 1 + 2
**Batch 1 — Urutan lembaga canonical + sort A–Z [T3/T4/T5/T11]:**
- `utils/santriSort.js` = **SUMBER TUNGGAL** urutan lembaga sekarang. `lembagaRank` di-**export**; `LEMBAGA_RANK` dirapikan canonical: Qiraati (TPQ Pagi→TPQ Sore→Pra PTPT→PTPT→PPPH) → Sekolah (TK→SDI→PKBM; SMP/SMA = sub-tier PKBM rank sama) → non-utama (Ma'had/Yayasan/Sarpras di akhir). + helper baru `sortGuru(list)` (lembaga→nama A–Z).
- `composables/useLembaga.js` — buang `LEMBAGA_ORDER` lokal yang SALAH (Yayasan rank 0 di atas semua; Ma'had menyela Qiraati↔Sekolah) → `import { lembagaRank }` + sort pakai itu.
- `composables/useGuru.js` — buang `LEMBAGA_ORDER`/`JABATAN_ORDER` lokal (incomplete, jabatan-first) → sort **lembaga (Qiraati dulu, `lembaga||lembaga_sekolah`) → nama A–Z**.
- Santri: sudah `sortSantri` (lembaga→kelas→nama A–Z) di `useSantri` (tak diubah). Sisa sort alfabetis lembaga di `StatistikView`/`useStatistikScope` = agregat statistik (bukan roster) → sengaja dibiarkan.

**Batch 2a — Data Guru terfilter pegawai [T10]:**
- `views/GuruView.vue` `_isPengajar()` — **utamakan field `tipe_pegawai`** (`guru`/`pegawai_guru`/`ngaji`/`ngaji_sekolah`/`sekolah` → GURU; `pegawai`/`admin` → PEGAWAI); regex `jabatan` jadi fallback saja. Akar bug: dulu cuma regex `jabatan` → guru yg jabatannya tak match (kosong/"Tenaga Pendidik") salah masuk Pegawai.

**Batch 2b — Tombol Migrate scan duplikat [T9]:**
- FILE BARU `utils/v100_dedupe.js` — `scanDedupe()` + `runDedupe()`. AMAN & reversibel: hanya gabung duplikat **identitas unik** (santri NIS / NISN, guru WA). Per grup: pilih record terlengkap = primer → isi field kosong primer dari duplikat (non-destruktif) → `deleteOne` sisanya (auto-backup `audit_log`). Duplikat **"Nama sama" SENGAJA tidak** auto-merge (rawan 2 orang beda nama sama).
- `views/MasterDataView.vue` — di panel "Analisis Data Duplikat": tombol **Dry-Run Migrate** + **Migrate (Gabung Duplikat)** + ringkasan rencana + progress. (Pakai `santriRaw`/`guruRaw` penuh.)

### FILE DIUBAH/BARU sesi ini
`utils/santriSort.js`, `composables/useLembaga.js`, `composables/useGuru.js`, `views/GuruView.vue`, `views/MasterDataView.vue`, **BARU** `utils/v100_dedupe.js`.

### ✅ SELESAI Batch 3 — Title bar Electron [T12/T13/T17/T18] (belum commit/build di atas Batch 1+2)
- **T12 Mundur/Maju:** QAT `RibbonTitleBar.vue` — Undo/Redo (inert `tabindex=-1`) diganti **Mundur** (`router.back`) / **Maju** (`router.forward`). Status disable dari `window.history.state.back/.forward` (Vue Router 4), di-sync via `router.afterEach`+`popstate`. Ikon baru `arrow-left`/`arrow-right` di `RibbonIcon.vue`.
- **T13 Simpan:** infra baru `definePageSave(fn)` + singleton `pageSave` di `useRibbonContext.js`. Tombol Simpan QAT jalankan handler halaman aktif; **disable** (opacity .35) bila halaman tak daftarkan. Contoh wiring: `SantriFormView.vue` daftar `definePageSave(onSubmit)`.
- **T17 Search muncul di list:** akar = root shell `.ammu-ribbon-app { overflow:hidden }` meng-clip dropdown `absolute`. Fix `GlobalSearch.vue`: dropdown desktop **Teleport ke body + posisi `fixed`** (anchor ke rect bar, reposition saat scroll/resize). Tetap hormati scope anti-bocor v.98 (`useSantri`/`useGuru` ter-scope). Berlaku di Electron & web.
- **T18 Logout + konfirmasi:** tombol Keluar (ikon `logout`) di `rb-right` → `ui.confirm(...)` pop-up dulu → `auth.logout()` → `/login` (tidak langsung keluar).
- **FILE:** `components/ribbon/RibbonTitleBar.vue`, `components/ribbon/RibbonIcon.vue`, `composables/useRibbonContext.js`, `components/layout/GlobalSearch.vue`, `assets/ribbon.css` (style `:disabled` QAT), `views/SantriFormView.vue`. Build `_run_vite.cmd` exit 0.

### ✅ SELESAI Batch 4 — Ribbon Keuangan pecah jadi tombol [T6/T7/T8/T14] (ELECTRON SAJA)
- **Pendekatan:** `PengaturanKeuanganView` dibuat **section-aware** via `?section=tagihan|syahriyah|bisyaroh` (TANPA duplikasi logika/rute baru). Tanpa query (web/Android) → tampil PENUH seperti semula. Pakai **`v-show`** (bukan v-if) supaya semua field tetap ter-mount → tombol Simpan tetap menyimpan SELURUH setting walau hanya 1 section tampil.
- **T6 Buat Tagihan:** tombol pita "Buat Tagihan" → `/keu-pengaturan?section=tagihan&gen=1` → halaman tagihan/struk + modal **Generate Tagihan Khusus** auto-buka (onMounted baca `route.query.gen`).
- **T7 Pengaturan Bisyaroh:** grup Bisyaroh, tombol "Pengaturan Bisyaroh" → `?section=bisyaroh` (Bisyaroh shift/pokok + Master Tunjangan + Potongan).
- **T8 Pengaturan Syahriyah:** grup Pengaturan, "Syahriyah Santri" → `?section=syahriyah` (jenis+nominal+whitelist+override).
- **T14 pecah jadi tombol:** grup pita **Pengaturan** baru (Pengaturan Keuangan penuh + Syahriyah Santri + Tagihan & Struk). Header view ikut section (judul/subjudul dinamis `sectionMeta`).
- **FILE:** `views/PengaturanKeuanganView.vue` (focusSection/secVisible/sectionMeta + v-show per-card + auto-open modal), `composables/useRibbonNav.js` (tab Keuangan). Build `_run_vite.cmd` exit 0.

### ✅ SELESAI Batch 5 — Ribbon PSB + Printer di Menu File [T15/T16] (ELECTRON SAJA)
- **T16 tab PSB:** tab baru `psb` di `useRibbonNav.js` (gate admin) — grup "Pendaftaran" (Riwayat Pendaftaran → `?section=riwayat`, Pratinjau Form → `/psb-form`) + grup "Berkas & Info" (Upload Syarat → `?section=syarat`, Info Pembayaran → `?section=pembayaran`). `TAB_PATHS.psb=['/psb']` (dipindah dari pendidikan). `PpdbAdminView` dibuat **section-aware** (`focusSection`/`secVisible`, v-show, `:open` auto-expand details asset saat fokus). Tanpa query (web/Android) tampil penuh.
- **T15 Printer di menu File:** `RibbonBackstage.vue` dapat rail **Printer** → halaman ringkas (printer default + mode) + tombol "Buka Pengaturan Printer" yang men-dispatch event `ammu:open-printer-settings` (reuse `PrinterSettingsModal` global yang sudah lengkap: deteksi Windows, pilih default, tes cetak ESC/P, simpan). Penyetelan ukuran slip/ESC-P tetap di Keuangan → Buat Tagihan.
- **FILE:** `composables/useRibbonNav.js` (tab psb + TAB_PATHS), `views/PpdbAdminView.vue` (section-aware), `components/ribbon/RibbonBackstage.vue` (rail+page Printer). Build `_run_vite.cmd` exit 0.

### ⏳ PENDING — Batch 6–8 (urut rekomendasi; detail di `REKAP-TASK-BATCH-10JUN2026.md`)
- **Batch 6 — Kenaikan/Mutasi skema SEKOLAH [T2] (RISIKO TINGGI):** cabang sekolah di `NaikKelasView` pakai `lembaga_sekolah`+`kelas_sekolah`+`guru_sekolah[]`; tambah **field catatan kenaikan**; template **kartu kenaikan sekolah** di `raporPdf.js` (KOP + guru sekolah, bukan PTPT/Qiraati). Saat ini kenaikan sekolah masih pakai jalur kartu Qiraati.
- **Batch 7 — Login Electron [T19/T20]:** scrollbar `LoginView` modern; **fix Google login Electron** (kemungkinan `signInWithPopup` → flow browser-sistem + `signInWithCredential`; butuh error nyata + device test kyai).
- **Batch 8 — Re-audit 4 platform + ship [T1]:** verifikasi regresi (anti-bocor v.98, listener leak), **bump versionCode ≥100**, deploy.

### VERIFIKASI + SHIP Batch 1+2 (kyai, PowerShell — pakai `;`)
```powershell
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd                       # harus VITE_EXITCODE=0
if (Test-Path ".git\index.lock"){Remove-Item -Force ".git\index.lock"}
git add -A ; git commit --no-verify -m "feat(v.100) Batch1+2: urutan lembaga canonical (sumber tunggal lembagaRank) + sort guru/santri A-Z; fix Data Guru pakai tipe_pegawai; tombol Migrate gabung duplikat identitas (NIS/NISN/WA)"
npm run firebase:deploy                            # web/PWA
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
# (app HP, hanya bila perlu) npm run build:aab   # SETELAH bump versionCode ≥100
git push
```
firestore.rules TIDAK diubah sesi ini. Semua perubahan = Vue source murni (kena Web/PWA/Android/Electron).

### CATATAN UNTUK SESI LANJUTAN (Claude Code desktop)
- Build gate asli tetap `tmp_recovery\_run_vite.cmd` (VITE_EXITCODE=0). Tes fungsional kyai: (a) urutan list Santri & Guru = Qiraati dulu lalu Sekolah, nama A–Z; (b) menu Pendidikan→Data Guru kini tampil GURU (bukan kebanjiran pegawai); (c) Master Data→Analisis Duplikat → Dry-Run Migrate lalu Migrate, cek `audit_log` ter-backup.
- Mulai Batch 3 dari `RibbonTitleBar.vue` (QAT Save/Undo/Redo masih `tabindex="-1"` tanpa `@click` = memang inert, bukan regresi).


---

## SESI v.99.0626 — PUSH NOTIF + STATUS BAR ANDROID + BONUS KEHADIRAN PEGAWAI + FIX TGL IMPOR (11 Jun 2026, Claude Code) — RECAP TERBARU, BACA INI DULU

> Konteks: audit kesesuaian app di **Android (Capacitor native bundle, `webDir:dist`, TANPA `server.url`) + PWA**, fokus kyai = (1) push notification SESUAI DATA + penerima tepat, (2) ikon status bar = logo + nama "Ammu Online". Plus 2 permintaan lanjutan kyai (bonus pegawai, fix tgl impor). **SEMUA UNCOMMITTED — pending kyai deploy.** Build gate `tmp_recovery\_run_vite.cmd` exit 0 (semua verified). ⚠️ versionCode **99** (Play Console terakhir = 98; vc100 sesi lalu DITURUNKAN ke 99 — lihat §5).

### A. PUSH NOTIFICATION — fix data & penerima (`functions/index.js`, perlu `deploy --only functions`)
- **K2 `link` + serialisasi target (BUG LATEN):** `kirimNotifikasiMassal` dulu set `message.data.target` = OBJEK utk event individual `{type:'santri',id}` → `firebase-admin` TOLAK nilai `data` non-string → **push individual (tagihan/pembayaran/kenaikan) GAGAL terkirim diam-diam** (ke-catch jadi gagal_count). Fix: `JSON.stringify(target)` bila objek + teruskan `link` ke `message.data.link` & `webpush.fcmOptions.link` (hash route `/#/...`) → tap notif buka halaman benar (native `pushNotificationActionPerformed` + SW `notificationclick` baca `data.link`). P5 guard fan-out `wa`≥8 char DIVERIFIKASI masih utuh.
- **S1 nama anak di body:** `onTagihanCreated`/`onPembayaranVerified`/`onKenaikanCreated` sisipkan `santri_nama` ke body (anti tertukar antar anak utk wali multi-anak; field sudah ada di doc).
- **S2 push prestasi (FUNGSI BARU `onPrestasiCreated`):** trigger `notif_prestasi/{id}` → push ke wali. Doc id `np_<santriId>_<YYYY-MM>` (1/bulan) → onCreate = 1×/bulan/santri (tak spam). Sebelumnya prestasi HANYA in-app Notif Center (`useNotifications.js`, terfilter `santri_id===me`).
- **K1 logout clear token (`stores/auth.js`, web+AAB):** `clearToken()` di `usePushNotifications.js` dulu TAK PERNAH dipanggil → token FCM device basi menempel di doc user lama → tagihan anak A nyasar ke wali B di HP berbagi (cross-family leak). Fix: `logout()` hapus `fcm_token` user yang keluar SEBELUM `authService.logout()` (selagi rules `signedIn()` lolos).

### B. STATUS BAR ANDROID — ikon logo + warna (NATIVE → WAJIB AAB)
- **K3:** generate `ic_stat_ammu.png` 5 densitas (mdpi24/hdpi36/xhdpi48/xxhdpi72/xxxhdpi96) = **silhouette PUTIH** kaligrafi Mambaul Ulum dari `vue-app/public/logo.png` via PIL (alpha sbg mask, 6% margin). `AndroidManifest.xml` +meta-data `com.google.firebase.messaging.default_notification_icon`/`..default_notification_color`/`..default_notification_channel_id=ammu_default`. `res/values/colors.xml` +`ammu_notif_accent #0F766E`. `capacitor.config.json` +`LocalNotifications.smallIcon=ic_stat_ammu`+`iconColor`. `usePushNotifications.js` foreground `LocalNotifications.schedule` pakai `smallIcon`/`iconColor`+`extra.link` + wire listener `localNotificationActionPerformed`. `strings.xml app_name` SUDAH "Ammu Online" (benar dari awal). Tanpa K3, notif latar belakang FCM = kotak putih default.

### C. BONUS KEHADIRAN SHIFT PEGAWAI (permintaan kyai: bonus guru ≠ pegawai; Vue → web+AAB+Electron)
- Tambah 2 shift `pegawai_pagi`/`pegawai_sore` (tarif sendiri) SEJAJAR pagi/sore/sekolah di koleksi `absensi_shift_guru`.
- `PengaturanKeuanganView.vue`: 2 input tarif `keu_bisyaroh_pegawai_pagi`/`_sore` (default/hydrate/simpan). ⚠️ **kyai WAJIB isi pasca deploy** (kalau 0 → bonus 0).
- `AbsensiGuruView.vue`: tabel absensi harian jadi **5 kolom** + **GATING per tipe** (helper `shiftsForGuru(g)`): tipe `guru`→shift mengajar (pagi/sore sesuai field `shift` + Sekolah bila `lembaga_sekolah`); `pegawai`→Peg.Pagi/Sore saja; `pegawai_guru` (dual)→keduanya. Kolom tak berlaku tampil "·" terkunci (cegah salah centang — sekaligus enforcement: guru "Sore saja" tak bisa dicentang pagi). Impor fingerprint + badge (PgP/PgS indigo) + opsi filter shift diperbarui. Ambang jam pegawai reuse pagi/sore (`thresholdBaseShift`).
- `BisyarohView.vue`: `bonusKehadiran` (mode tunggal) + `hitungBonusGuru` (mode bulk) kini hitung `pegawai_pagi/sore × tarif` → masuk take-home. Snapshot slip simpan `hadir/tarif_pegawai_pagi/sore`. Cetak slip (`receiptHtml.js`/`strukBuilder.js`) pakai `bonus.total` → pegawai otomatis ikut. Rincian layar tampil baris "Pegawai Pagi/Sore" (v-if relevan).
- Kasus kyai: dual-role admin pagi + ngajar sore (Shift Qiraati "Sore saja", tanpa lembaga sekolah) → kolom muncul **Sore · Peg.Pagi · Peg.Sore** → centang Sore (tarif guru sore) + Peg.Pagi (tarif pegawai pagi) = 2 bonus tarif beda. (CATATAN logika: field "Shift Qiraati"/`shift` guru TIDAK mempengaruhi perhitungan bonus — bonus murni dari record absensi; gating hanya membatasi kolom yang tampil.)

### D. FIX IMPOR TANGGAL KOSONG → `1899-12-30` (epoch Excel; Vue → web+AAB)
- Akar: sel tanggal KOSONG terbaca SheetJS sbg `Date` serial 0 = 1899-12-30; parser meneruskannya. Fix `SantriView.parseTglDDMMYYYY` + `GuruView._parseTglGuru`: guard `Date.getFullYear() < 1901` (atau string `1899-12-30`/`1900-01-00`/yr<1901) → kosongkan (tak diisi otomatis). Lindungi `tgl_lahir`/`tgl_masuk`/`tgl_keluar` (santri) + `tgl_lahir`/`tanggal_tugas` (guru — cegah NIG `301299`). Data LAMA yg sudah 1899-12-30: kyai betulkan via **impor ulang** (keputusan kyai; TANPA tombol cleanup).

### FILE DIUBAH (semua uncommitted di working tree)
`functions/index.js` · `vue-app/src/stores/auth.js` · `composables/usePushNotifications.js` · `vue-app/capacitor.config.json` · `android/app/src/main/AndroidManifest.xml` · `res/values/colors.xml` · `res/drawable-{m,h,xh,xxh,xxx}dpi/ic_stat_ammu.png` (5 BARU) · `views/PengaturanKeuanganView.vue` · `views/AbsensiGuruView.vue` · `views/BisyarohView.vue` · `views/SantriView.vue` · `views/GuruView.vue` · + 13 titik bump versi 100→99 (`build.gradle` vc+vn / `package.json`×3 / `main.js` Sentry / footer AppSidebar·LoginView·DashboardView·PpdbAdminView / fallback RibbonStatusBar·RibbonBackstage·BantuanView).

### PENDING KYAI = SHIP (urutan)
```powershell
firebase deploy --only functions      # A: K2/S1/S2 + P5 guard yg BELUM pernah dideploy
npm run firebase:deploy               # web/PWA: K1(client), C, D, footer versi
npm run build:aab                     # vc99 — WAJIB app HP (native bundle): K1, K3 ikon, C, D
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
git add -A ; git commit --no-verify -m "..." ; git push
```
firestore.rules TIDAK berubah. **Setelah deploy: isi 2 tarif bisyaroh pegawai di Pengaturan Keuangan.** Tes device: (a) notif HP = ikon Ammu + nama "Ammu Online" + body memuat nama anak + tap buka halaman benar; (b) HP berbagi: logout wali A → notif anak A tak masuk ke wali B; (c) absensi pegawai → bonus muncul di slip Bisyaroh; (d) impor file dgn sel tgl kosong → field tetap kosong (bukan 1899-12-30).

---

## SESI v.99.0626 — AUDIT MENYELURUH + FIX BAYAR-DI-MUKA + GUARD FAN-OUT WA (11 Jun 2026, Claude Code) — RECAP TERBARU, BACA INI DULU

> Audit read-only menyeluruh (keamanan/RBAC/anti-bocor/integritas data/push notif/parity platform/performa/versi) atas paket v.99 yang menggantung. **Verdict: sehat** — anti-bocor v.98 utuh, push K1/K2/K3/S1/S2 benar, bonus shift pegawai & lembaga canonical OK, versi konsisten vc99 (13 titik §5). **2 fix diterapkan** (approve kyai), 1 temuan dibatalkan (false alarm). **TANPA bump versionCode** (tetap vc99). Build `tmp_recovery\_run_vite.cmd` VITE_EXITCODE=0 + `node --check functions/index.js` OK. SEMUA uncommitted saat audit → di-commit di akhir sesi ini bersama paket v.99.

### KONFIRMASI KYAI atas temuan audit
- **#1 PII santri (`firestore.rules` `read: if true` utk santri/guru/settings/master)** = data terbaca SIAPA PUN dari LUAR app (anonim, via REST). Scoping DI DALAM app (guru kelas + Kepala/PJ view-only) SUDAH BENAR (`useSantri` filter + `ProfilDetailView` readonly + `canView`). Keterbatasan arsitektur custom-auth TANPA role-claim. Kyai: **BIARKAN** (akun belum dibagikan) → catat **backlog strategis** = migrasi custom-claims (`firestore.rules.stage2-proposed`). TIDAK dikerjakan sesi ini.
- **#3 Reshuffle NIS saat impor** (mengubah identitas login santri tanpa-WA) = kyai: **BIARKAN** (akun belum dibagikan).
- **#4 "Edit profil guru reset password '1234'"** = **FALSE ALARM** (koreksi jujur). `useGuruForm.save()` SUDAH preserve `data.password = old.password || '1234'` saat edit (L397); selain itu auth riil pakai Firebase Auth (field Firestore `password` hanya fallback lazy-migration). Edit profil TIDAK pernah me-reset sandi login → tidak ada perubahan.

### FIX DITERAPKAN (approve kyai; functions + web, TIDAK butuh AAB)
1. **A — Bayar-di-muka (POS) tak lagi memicu notif "Tagihan Baru" palsu** (BUG). Tagihan prepay ditulis `status:'lunas'` (sudah dibayar di loket) tapi `onTagihanCreated` dulu tetap push "Tagihan Baru" → wali bingung. Fix: `functions/index.js onTagihanCreated` tambah `if (status==='lunas') return`; `useNotifications.getTagihan` filter keluar `status==='lunas'` (lonceng in-app). Tagihan normal (`belum`) tak terpengaruh.
2. **B — Guard fan-out WA lintas-keluarga via data ayah**. `functions/index.js resolveTokensByTarget` cabang `type:'santri'`: fan-out ke device ber-WA sama kini DISARING — hanya kirim ke anak yg `nik_ayah` sama (prioritas) ATAU `nama_ayah` sama dgn santri target (baca flat `nik_ayah`/`nama_ayah` + nested `ayah.nik`/`ayah.nama`). Santri target tanpa data ayah → konservatif (token sendiri saja). Helper baru `_normNama`. Cabang `type:'wa'` (broadcast manual) tetap guard panjang ≥8.

### FILE DIUBAH (sesi audit ini, DI ATAS paket v.99)
`functions/index.js` (onTagihanCreated skip lunas + resolveTokensByTarget guard ayah + `_normNama`), `vue-app/src/composables/useNotifications.js` (getTagihan filter lunas).

### DIVERIFIKASI AMAN (tak diubah)
GlobalSearch ter-scope; ProfilDetail `canView` guard deep-link; lonceng `useNotifications` ter-filter per role+id; push K2 (JSON.stringify target + link), S1 (nama anak di body), S2 (`onPrestasiCreated` 1×/bln), K1 (logout clear fcm_token), K3 (manifest meta-data + ic_stat_ammu 5 densitas); bonus shift pegawai (single+bulk) + gating `shiftsForGuru`; lembaga canonical (`lembagaRank`/`canonLembaga`/`getPkbmSubTier`); Capacitor native (no `server.url`); `notif_queue` read=false; versi vc99 konsisten.

### DEPLOY (gabung dgn paket v.99 yg memang WAJIB deploy functions)
```
firebase deploy --only functions   # A + B + paket v.99 (K2/S1/S2/P5 belum pernah live)
npm run firebase:deploy            # web/PWA: lonceng getTagihan + sisa paket v.99
npm run build:aab                  # vc99 — HANYA utk paket v.99 native (K3 ikon/bonus pegawai/fix tgl). Fix A+B TIDAK butuh AAB
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; npm run electron:publish ; cd ..\..
git push
```
firestore.rules TIDAK berubah. **Setelah deploy paket v.99: isi 2 tarif bisyaroh pegawai di Pengaturan Keuangan.**

### FOLLOW-UP — Shift kerja PEGAWAI utk dual-role (11 Jun 2026, approve kyai)
- **Temuan kyai**: tipe `pegawai_guru` (dual-role) tak bisa memilih shift PEGAWAI — field `shift` dipakai utk "Shift Qiraati" (mengajar); blok "Shift Kerja" hanya muncul utk tipe `pegawai` murni. Akibat di absensi: kolom Peg.Pagi & Peg.Sore SELALU dua-duanya (tak peduli shift) → bisa salah-centang.
- **Fix (Vue murni, web+AAB+Electron, TANPA bump vc)**: field baru **`shift_pegawai`** (`useGuruForm` emptyForm/populate/save, default `'pagi_sore'`); blok form **"Shift Kerja (Pegawai)"** `v-if tipe==='pegawai_guru'` (`GuruFormView`); `AbsensiGuruView.shiftsForGuru` gating kolom pegawai = shift kerja (pegawai murni→`g.shift`, dual→`g.shift_pegawai`; default `pagi_sore`=dua kolom → data lama tak regresi). Bonus calc (`BisyarohView`) tak diubah — sudah murni dari record absensi. Verify `_run_vite.cmd` exit 0.

---

## SESI v.100 — NIS → "No. Induk" + NIS Dinas manual (12 Jun 2026, Claude Code) — RECAP TERBARU

> Permintaan kyai: santri sekolah TK/SDI/PKBM ternyata SUDAH punya NIS & NISN dari Dinas (input manual).
> Keputusan: nomor auto NNNN+DDMMYY TETAP untuk SEMUA santri tapi berganti label jadi **"No. Induk"**;
> NIS Dinas = field BARU. Rapor Qiraati pakai No. Induk, rapor Diniyah pakai NIS (Dinas).
> Commit `a99a0ae` (26 file, verify `_run_vite.cmd` exit 0). BELUM deploy.

### MODEL DATA (penting utk sesi berikutnya)
- **`nis` (field lama, TIDAK di-rename)** = No. Induk pondok, auto NNNN+DDMMYY (nisGenerator). Label UI = "No. Induk".
  JANGAN rename field ini: dipakai login santri (`services/auth.js where('nis'==...)` + authKey/username default),
  VA BMT (`bmtVa.js`), dedupe/Migrate (`v100_dedupe.js`), impor/ekspor XLSX, struk.
- **`nis_sekolah` (BARU)** = NIS dari Dinas, MANUAL, khusus santri sekolah. Label UI = "NIS".
- **`nisn`** (sudah ada sejak v.95) = NISN Dinas, manual.

### PERUBAHAN
1. Form santri (`useSantriForm` + `SantriFormView`): + field/input `nis_sekolah`; label "NIS"→"No. Induk".
2. Rapor: `raporPdf.drawIdentitas(+param isDiniyah=schema.perKelas)` & `RaporView` preview —
   Qiraati → "No. Induk" (nis); Diniyah → "NIS" (nis_sekolah); NISN tetap di keduanya.
3. PSB convert (`PpdbDetailView`): `p.nis` form PSB → `nis_sekolah`; `payload.nis` SELALU auto (append); + copy `p.nisn`.
4. XLSX Santri (`SantriView`): template/ekspor punya kolom "No. Induk" + "NIS"; importer SADAR-TEMPLATE
   (`hasNoIndukCol`): template lama kolom NIS→field nis; template baru kolom NIS→nis_sekolah
   (template lama TIDAK menimpa nis_sekolah). Importer KelasGuru/RekapPrestasi/Tabungan terima header lama+baru.
5. Relabel "NIS"→"No. Induk" di UI/cetak: struk ESC/P+HTML+PDF (teks polos pakai "Induk : " 6-char jaga alignment),
   kwitansi, ProfilSantri (+baris NIS Dinas), POS/ModalPOS, search placeholder, audit data, dedupe, NaikKelas,
   Statistik×2, RiwayatSantri, pesan error login, tombol/dialog Generate di MasterData.
6. `nisGenerator.js`: LOGIC & format TIDAK berubah (cuma komentar + alasan audit_log). Aksi audit tetap `generate_nis`.

### PENDING KYAI
- `npm run firebase:deploy` (web/PWA) + `npm run build:aab` (app HP) + rebuild Electron + `git push`.
- Isi NIS Dinas (`nis_sekolah`) santri sekolah: manual via form ATAU impor XLSX template BARU (unduh ulang template!).
- Template XLSX lama masih diterima importer (kolom NIS lama = No. Induk).

---

## SESI v.100 — KOP MUASSIS (12 Jun 2026, Claude Code) — RECAP TERBARU

> Baris PERTAMA semua KOP (rapor + KOP umum) = gambar kaligrafi muassis
> (`vue-app/src/assets/muassis.png`, dari `muassis.png` root, 3000×554 rasio 5.42, 35KB).
> Commit `54411d8` (9 file). Verify `_run_vite.cmd` exit 0. BELUM deploy.

### MODEL
- Util pusat **`utils/kopMuassis.js`**: `MUASSIS_URL`/`MUASSIS_RATIO` + `muassisDataUrl()` (async cache, jsPDF/print-window)
  + `muassisDataUrlSync()` (builder HTML sinkron) + `muassisImageSync()` (HTMLImageElement utk canvas ESC/P).
  Pre-warm saat modul dimuat. SEMUA renderer fallback ke teks `settings.kopLine1` bila gambar gagal/belum siap.
- Renderer yang diganti: `raporPdf.drawKopRapor` (center 80mm, baris 2-4+divider relatif `kopBase`),
  `pdfBuilder.drawKopLetterhead` (kiri h10mm, off +4.5mm → semua PDF list/struk F4/riwayat otomatis ikut),
  `strukBuilder` (slip POS+tabungan PDF h7mm; `slipShellHtml`+`buildStrukHtmlWide` pakai dataURL),
  `escpImage.drawSlip` (h26pt canvas), `receiptHtml.kopHtml` (26px), `RekapPrestasiView` print-window,
  `RaporView` preview (34px + `dark:invert`).
- **TIDAK diganti (by design)**: struk dot-matrix MODE TEKS + XLSX/GSheet (tak bisa gambar → tetap kopLine1),
  kartu kontrol kenaikan (KOP sendiri judul+subjudul, `kenaikan.getKopKartuLembaga`), sidebar title.
  `settings.kopLine1` kini berperan sebagai fallback/teks-only.

### PENDING KYAI
- Deploy: `npm run firebase:deploy` + `build:aab` + rebuild Electron + `git push`.
- Tes visual: cetak 1 rapor Qiraati + 1 Diniyah (KOP ~10mm lebih tinggi dr sblmnya — cek tak ada overflow halaman),
  1 slip POS (PDF + ESC/P), kwitansi in-app, PDF daftar (KOP umum).

---

## SESI v.100 — FITUR TES KENAIKAN QIRAATI (12 Jun 2026, Claude Code) — RECAP TERBARU

> Fitur BARU: guru ngaji mengajukan tes kenaikan santri ampuannya ke Kepala/PJ via aplikasi.
> Commits: A `50ea5fc`, B `ef99177`, C `568f0b9`. Verify _run_vite.cmd exit 0 tiap fase.

### KEPUTUSAN KYAI (domain)
- **Pra PTPT TANPA tes** → dikecualikan total. **TPQ** Pagi/Sore = Naik Jilid. **PTPT** = 2 model:
  Naik Juz (Juz n→n+1) & Naik Kelas (hanya bila juz akhir kelas = kelipatan 5, "setelah ceremonial").
  **PPPH** = Naik Level. Cakupan: TPQ+PTPT+PPPH.
- **LULUS = "siap naik" SAJA** — TIDAK ubah kelas santri (santri bisa pindah kelas). Kenaikan aktual
  tetap MANUAL di NaikKelasView. Penguji = Kepala/PJ lembaga. Antrian saja (tanpa jadwal). Bisa batch.
- Notif WALI HANYA saat LULUS. Ajuan→Kepala; hasil→Guru; lulus→Wali+Guru; tidak lulus/tolak→Guru saja.

### ARSITEKTUR
- Koleksi baru **`tes_kenaikan`** (auto id). Field: santri_id, nama_cache, lembaga, kelas_asal,
  juz_asal, jenis ('jilid'|'juz'|'kelas'|'level'), target, guru_id, guru_nama, kepala_nama (resolve
  saat ajukan utk push), status ('diajukan'|'lulus'|'tidak_lulus'|'ditolak'), penguji, catatan_hasil,
  tgl_daftar/tgl_hasil, _ts, batch_id. Rules: read/write signedIn (scoping di app).
- **utils/tesKenaikan.js** (pure): isEligibleForTes, tesJenisOptions, tesTargetOptions, tesTargetDefault,
  canNaikKelasPtpt (juz%5==0), STATUS_LABEL. Opsi target diturunkan dari schema utils/kenaikan.js.
- **composables/useTesKenaikan.js**: subscribe koleksi, scope per-role (pengaju=guru by guru_id;
  penguji=kepala via lembagaScopeMatches(sesi.lembaga) + admin=semua). ajukanBatch/putuskan/batalAjuan +
  hasOpenAjuan (guard dobel). Reuse useSantri utk daftar santri (sudah ter-scope).
- **views/TesKenaikanView.vue** (route /tes-kenaikan, menu Pendidikan "Tes Kenaikan",
  featureFlag fiturTesKenaikan default ON): tab adaptif role — Ajukan (batch checkbox + jenis/target) +
  Status Ajuan (guru); Antrian (Lulus/Belum/Tolak + catatan) + Riwayat (kepala/admin).
- **functions/index.js**: onTesKenaikanCreated (push Kepala by kepala_nama) + onTesKenaikanDecided
  (lulus→Wali+Guru, tidak/tolak→Guru; guard status berubah & ada penguji → skip batal pengaju).
  Reuse notif_queue + resolveTokensByTarget ({type:'guru',nama}/{type:'santri',id}).
- **useNotifications.js**: getTesKenaikan() per-role + subscribe + jenis 'tes' di markAllRead/clearAll.
- **NaikKelasView.vue**: badge hijau "Siap naik → [target]" di daftar Proses Naik (santri lulus tes,
  auto-hilang setelah target tercapai). subscribeColl realtime.

### PENDING KYAI (deploy)
- `npm run firebase:deploy` (web) + **`firebase deploy --only firestore:rules`** (koleksi tes_kenaikan)
  + **`firebase deploy --only functions`** (push Fase B — onTesKenaikan*) + `build:aab` + Electron + push.
- Tanpa deploy functions: notif HP tes TAK jalan (Notif Center in-app tetap jalan).
- featureFlag fiturTesKenaikan default ON (sembunyikan via settings.fiturTesKenaikan=false bila perlu).

---

## SESI v.100b/c — SANTRIVIEW DUAL-ROLE + RAPOR (FILTER/KOP) + STATISTIK TREN (13 Jun 2026, Claude Code) — RECAP TERBARU

> 3 commit di `feature/vue-migration`: `181ce9e` (SantriView dual-role), `a1c3ad2` (rapor),
> `dd1064f` (statistik tren). Verify `_run_vite.cmd`/build:electron exit 0 tiap commit. BELUM deploy.
> Util BARU `utils/guruScope.js` = sumber tunggal scope guru (dipakai SantriView + RaporView + StatistikView).

### 1) SantriView — 2 section guru dual-role (`181ce9e`, v.100b)
- Guru yang mengampu Qiraati DAN Sekolah (non-fullaccess) → daftar santri terbagi 2 grup berheader:
  "Santri Qiraati Saya (n)" + "Santri Kelas Sekolah Saya (n)". Guru single-role & admin: apa adanya.
- **utils/guruScope.js** (BARU): `ownsNgaji(s,nama)` (guru_pagi/sore/guru), `ownsSekolah(s,nama)`
  (guru_sekolah[]), `deteksiTipeGuru(list,nama)`→{qiraati,sekolah}. Deteksi dari santriRaw (semua santri,
  tak terpengaruh filter/cari aktif).
- SantriView: computed guruDual/guruDisplay (pisah ngaji/sekolah + header di santri pertama tiap grup) +
  santriRows + sectionHeaderFor(); card dibungkus `<template v-for="santriRows">`.

### 2) Rapor — filter kategori per tipe guru + KOP logo + baris-4 (`a1c3ad2`)
- RaporView picker (STEP 1): kartu kategori difilter `deteksiTipeGuru` — dual=Qiraati+Diniyah,
  qiraati-saja=Qiraati, sekolah-saja=Diniyah, admin/full=keduanya. Grid auto 1 kolom bila 1 kartu.
  Computed showKatQiraati/showKatDiniyah (fallback tak-terdeteksi → keduanya).
- **KOP rapor PDF** (`raporPdf.drawKopRapor`): logo **18→22mm + center vertikal** pada blok KOP +
  kiri-kanan ukuran/margin identik. AKAR (di-diff dari `54411d8^`): logo dipaku `y=startY=10` sejak dulu,
  tapi baris-1 jadi gambar muassis → blok memanjang (divider 35→~41mm) → logo ketinggian & terlihat kecil.
  `LOGO_SZ=22`, `logoY` center thd [startY, startY+100/MUASSIS_RATIO+20]; kanan `pageW-15-LOGO_SZ`.
- Baris-4 KOP (telp) **apa-adanya** — hapus `toLowerCase()` di PDF (`raporPdf.js:267`) & preview
  (`RaporView.vue` ~L515). Baris-3 alamat masih `titleCase` (sengaja; kyai hanya minta baris 4).

### 3) Statistik — grafik Tren Perkembangan capaian Qiraati (`dd1064f`, "Opsi A")
- Pilihan kyai: Opsi A (tren garis) di Halaman Statistik, cakupan **Qiraati dulu**; guru sekolah
  (wali kelas) tetap lihat tren Qiraati dari santri sekolahnya (DIPISAH).
- Sumber data = **`notif_prestasi`** (`np_{santriId}_{YYYY-MM}`, field `total`="N Hal" + `periode`) =
  riwayat capaian/bulan. ⚠️ `catatan_bulanan[bulan]` HANYA simpan TEKS catatan (bukan angka) → tak dipakai.
  `prestasi_awal/akhir/total` = field bulan BERJALAN (ditimpa) → bukan riwayat.
- **components/charts/TrenCapaianChart.vue** (BARU, Chart.js Line via vue-chartjs): props
  `santriIds[]`+`title`+`subtitle`. Query `notif_prestasi where santri_id 'in'` (chunk ≤10), agregat
  rata-rata capaian per periode, N bulan terakhir (default 12), chip delta ↑/↓, empty-state (butuh ≥2 bln).
  Self-contained (pola AdminStatsCharts).
- **StatistikView** (cabang `role==='guru'`): Kepala/PJ (`isKepalaLembaga`) → tren se-lembaga
  (`scopedSantriAktif`); Guru → tren kelasnya DIPISAH ngaji (`santriQiraatiSaya`) & sekolah
  (`santriSekolahSaya`). Computed isKepalaMode/lembagaSantriIds/qiraatiSantriIds/sekolahSantriIds.
  **TANPA ubah router/menu** (guru sudah akses /statistik).
- **CapaianPrestasiView** (santri/wali — wali pakai akun santri, 1 anak/akun): tren diri/anak
  (`santriIdsTren=[santriId]`). Wali diblok dari /statistik (meta noSantri) → tren-nya di sini.

### PENDING KYAI
- Deploy: `npm run firebase:deploy` (web saja — TANPA bump vc, TANPA perubahan rules/functions/native).
- Tes visual: (a) ekspor rapor PDF → cek logo (22mm/center; sebut angka bila mau disesuaikan);
  (b) /statistik (guru/kepala) + Capaian Prestasi (santri) → tren muncul (butuh ≥2 bln data notif_prestasi).
- FOLLOW-UP opsional: tren **Diniyah/sekolah per-semester** (`rekap_diniyah`) utk guru sekolah-murni.

---

## SESI v.100c (lanjut) — RAPOR: FIX REDIRECT GURU SEKOLAH + KKM EDITABLE + TGL MANUAL (13 Jun 2026, Claude Code)

> 2 commit: `342d9a8` (fix #1 redirect), `e89fbed` (#2 KKM + #3 tanggal). Verify build:electron exit 0. BELUM deploy.

### #1 FIX — guru sekolah tak lagi dipaksa ke rapor Qiraati (`342d9a8`)
- Bug: akun guru sekolah klik "Rapor Semester" → auto-jump ke daftar santri Qiraati. Akar: onMounted
  auto-jump pakai field `guru.lembaga` (tak andal) + selalu prioritas jalur qiraati.
- Fix: auto-jump pakai `deteksiTipeGuru(santriRaw)` (sama dgn picker kartu, util guruScope) →
  qiraati-saja→'qiraati', sekolah-saja→'diniyah', DUAL→tetap picker (pilih sendiri). Dipindah ke
  `watch([santriRaw, guruTipeRapor])` (async-safe). Daftar guru-mode `lembaga=''` sudah filter benar.

### #2 KKM diniyah EDITABLE — per kelas (`e89fbed`)
- Editor KKM mapel di form edit rapor diniyah (`v-if kategori==='diniyah'`). `kkmMapelNames` (dari
  `_mapelDiniyahResolved`) + `kkmDraft[]`; `saveKkm()` tulis **`settings.rekapDiniyahKKM[kelas]`**
  (berlaku SEMUA santri kelas itu — KKM = standar kelas). `buildDiniyahSchemaFromSetting` baca array ini
  → reaktif. `loadKkmDraft()` dipanggil di `startEdit` saat diniyah.

### #3 Tanggal terbit rapor MANUAL — satu per periode (`e89fbed`)
- "Dikeluarkan Pada Tanggal" bisa diset manual. SATU tanggal per periode (TahunAjaran+Semester),
  berlaku semua santri, tersimpan **`settings.raporTglTerbit[periodKey]`**. Input `type=date` di toolbar
  list (batch) + detail; `@change saveTglTerbit`. Kosong → hari ini.
- `tglCetak` (preview) & `buildRaporStateFor.tanggal` (=`tglTerbitID` terformat ID) → `raporPdf.drawSignBlocks`
  pakai `raporState.tanggal` bila ada, else `fmtTanggalID(new Date())`.

### CATATAN
- Izin: `firestore.rules` settings `allow write: if signedIn()` → guru bisa simpan KKM & tanggal (via
  `settingsStore.save` yg merge ke settings/general + settings/web).

### PENDING KYAI
- Deploy: `npm run firebase:deploy` (web saja — tanpa bump vc/rules/functions/native).
- Tes: (a) login guru sekolah → menu Rapor Semester → harus ke Diniyah (bukan Qiraati); guru DUAL → picker.
  (b) Edit rapor diniyah → set KKM mapel → Simpan KKM → cek predikat berubah sesuai KKM.
  (c) Set Tgl terbit di toolbar → ekspor PDF → cek "Dikeluarkan Pada Tanggal".

---

## SESI v.100c (lanjut-2) — FIX 4 BUG GURU SEKOLAH + AGENDA SESI BARU (13 Jun 2026, Claude Code)

> Commit `33e5c6c`. Verify build:electron exit 0. BELUM deploy. (Lanjutan dari `342d9a8`/`e89fbed`.)

### FIX (commit `33e5c6c`)
1. **`router is not defined` → guru tak bisa buka Rekap Diniyah.** RekapPrestasiView TAK impor
   vue-router; `pilihKategori('diniyah')` panggil `router.push` (template pakai `$router`, script `router`
   undefined). Fix: `import { useRouter }` + `const router = useRouter()`.
2. **Preview rapor kolom nama Kepala/PJ KOSONG, tapi PDF terisi.** Akar: `namaKepala` (preview) hanya
   baca master lembaga; PDF (`raporPdf.drawSignBlocks`) cari guru by JABATAN. Fix: `namaKepala` cari guru
   by jabatan (KEPALA TPQ/PJ PTPT/KEPALA SDI/PKBM/dst) DULU → selaras PDF, lalu fallback master+settings.
3. **Kartu kenaikan SEKOLAH balik ke kartu Qiraati (guru).** `openKartu` pakai `filterLembaga||s.lembaga`
   — guru filterLembaga kosong → `s.lembaga` (qiraati). Fix: sadar `kenaikanKategori` — sekolah →
   `lembaga_sekolah` (PKBM→SMP/SMA via getPkbmSubTier), else qiraati. (Path dari tab Riwayat sudah set
   filterLembaga → tetap benar.)
4. **Riwayat kenaikan (akun guru) tampil SEMUA santri.** `riwayatList` tak di-scope. Fix: guru hanya
   lihat ampuannya — `ownsSekolah` utk lembaga sekolah, `ownsNgaji` utk qiraati (util guruScope).

### JAWABAN INVESTIGASI: apakah riwayat tertimpa? (kyai tanya)
- **Kenaikan**: ✅ PENUH. Append `santri.riwayat[]` + `santri.riwayat_kenaikan[]` + entri `kartu_kenaikan`
  + dokumen per-event koleksi `riwayat_kenaikan` (id `rk_{id}_{timestamp}`). Tak tertimpa.
- **Tes Kenaikan**: ✅ PENUH. Tiap ajuan = dokumen baru auto-id; hasil update status dokumen itu.
- **Rapor**: ✅ per (santri×lembaga×semester) = `rapor_{id}_{lembaga}_{periode}`. Tiap semester sendiri.
- **Rekap Prestasi**: ⚠️ SEBAGIAN. Field `santri.prestasi_awal/akhir/total` = bulan BERJALAN (tertimpa
  tiap bulan). Riwayat bulanan TERPISAH di `notif_prestasi` (`np_{id}_{YYYY-MM}`) TAPI HANYA simpan
  `total` (bukan awal/akhir). Submenu "Riwayat" di RekapPrestasiView (mode 'riwayat') menampilkan
  **Riwayat KENAIKAN** (`s.riwayat.length`), BUKAN riwayat prestasi bulanan.

---

## ⏭️ AGENDA SESI BARU (kyai akan lanjut di sesi baru) — PRIORITAS

> Kyai eksplisit menyebut 3 hal untuk dibahas/dikerjakan di sesi BARU. Catatan biar sesi baru efisien.

1. **Riwayat Rekap Prestasi BULANAN** (kyai: "harusnya sudah ada karena ada submenunya").
   - TEMUAN: submenu "Riwayat" (mode 'riwayat' RekapPrestasiView, tab id 'riwayat') menampilkan Riwayat
     KENAIKAN, bukan prestasi bulanan. `notif_prestasi` hanya simpan `total` per bulan.
   - RENCANA: saat `simpanRekap`, snapshot **awal+akhir+total** per bulan ke koleksi khusus
     (mis. `riwayat_prestasi` id `rp_{santriId}_{YYYY-MM}`) ATAU perluas field `notif_prestasi`. Lalu
     tampilkan timeline bulanan di submenu Riwayat (per santri: tabel bulan→awal/akhir/total). Pertimbangkan
     migrasi/backfill dari `notif_prestasi` lama (total saja).
2. **Diskusi DATABASE: Firestore vs "SQL Connect" (Firebase Data Connect / Cloud SQL PostgreSQL).**
   - Konteks: app skala pondok (santri/guru/kenaikan/rapor/keuangan = relasional). Bahas trade-off,
     biaya, effort migrasi, apakah worth. (Jawaban ringkas sudah diberi di chat; pendalaman di sesi baru.)
3. **Menu DAFTAR TES (Tes Kenaikan Qiraati)** — kyai ingin FOKUS bahas/kembangkan fitur ini.
   - Status saat ini: Fase A/B/C SELESAI (commit `50ea5fc`/`ef99177`/`568f0b9`). Lihat recap "FITUR TES
     KENAIKAN QIRAATI" di atas. Kemungkinan arah: penyempurnaan UX, statistik tes, integrasi ke rapor, dll.
4. **Rekap Prestasi (input bulanan) — FILTER pemisah Qiraati / Sekolah utk guru DUAL.**
   - Konteks (screenshot kyai, akun Aizza Jundhana GURU/PEGAWAI): mode bulanan tampilkan santri qiraati
     ampuan (editable) + santri kelas sekolah (badge "SEKOLAH", read-only) TERCAMPUR dlm satu tabel.
   - MINTA kyai: tambah toggle filter (Qiraati / Sekolah / Semua) di RekapPrestasiView mode bulanan
     supaya bisa **ekspor TERSENDIRI** (PDF/Excel/Google Sheet) per kategori santri.
   - RENCANA: ref `filterTipe` ('all'|'qiraati'|'sekolah'); `filteredSantri` hormati filter (qiraati=ownNgaji,
     sekolah=ownSekolah); toggle hanya tampil utk guru DUAL (`deteksiTipeGuru`). Ekspor sudah pakai
     `filteredSantri` → otomatis terpisah. (Pola sama dgn toggle NaikKelasView / 2-section SantriView.)

### STATUS DEPLOY (semua sesi v.100/b/c BELUM deploy oleh kyai)
- Web: `npm run firebase:deploy`. Rules: `firebase deploy --only firestore:rules` (koleksi `tes_kenaikan`).
  Functions: `firebase deploy --only functions` (push tes — `onTesKenaikan*`). + AAB + Electron + push.
