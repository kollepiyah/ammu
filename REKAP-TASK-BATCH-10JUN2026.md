# REKAP TASK + RENCANA BATCH — Sesi 10 Juni 2026 (Cowork)

> **STATUS:** ✅ **SEMUA BATCH 1–8 SELESAI.** Batch 1–6 deployed kyai. **Batch 7** commit `413cbf7` (T20 Google login PERLU VERIFIKASI DEVICE kyai pasca rebuild Electron). **T22+P5/P6/P7** commit `23d7c9a`. **Batch 8a (audit menu overhaul)** commit `5bca2ac`. **Batch 8 FINAL (10 Jun 2026, sesi Claude Code): re-audit regresi LOLOS + P9 + BUMP vc99→100 (13 titik §5)** — lihat blok "BATCH 8 FINAL" di bawah. **PENDING kyai = SHIP:** `firebase:deploy` + **`firebase deploy --only functions`** (⚠️ WAJIB — `functions/index.js` berubah di `23d7c9a`: P5 guard fan-out `wa`≥8, belum pernah dideploy) + `build:aab` (vc100) + `electron:publish` + `git push` (rules TIDAK berubah sejak hardening v.98 yg sudah live → tak perlu deploy rules). Keputusan kyai: Batch 4 Bisyaroh/Syahriyah = Electron saja. Batch 6: schema sekolah = 1 tanggal naik/kelas + kelulusan; semua step.
>
> ### ✅ BATCH 12 — FIX 3 TEMUAN KYAI + ROLL-OUT GOOGLE SHEET (10 Jun 2026, sesi sama) — commit `052e137` (fix 1–3) + GSheet roll-out (commit menyusul)
> 1. **Migrasi Lembaga: kelas "Level" → Pra PTPT (bukan PTPT).** REVISI keputusan 10 Jun. `inferLembagaFromKelas` (`utils/v100_lembagaFix.js`): regex `\blevel\b` kini balikan **'Pra PTPT'** (dicek SEBELUM `juz` agar "Level N Juz" tertangkap Pra PTPT); "Juz N" utuh tanpa Level tetap **PTPT**; "Pra PTPT ..." tetap Pra PTPT. Teks panel `MasterDataView` ("Level/Juz → PTPT" → "Level → Pra PTPT, Juz utuh → PTPT") + komentar header file diperbarui. ⚠️ Sebelum fix, klik "Terapkan" akan SALAH memindah santri Pra PTPT → PTPT (186 baris di data kyai). Setelah fix, santri "Level.." yang sudah Pra PTPT tak diflag lagi → Scan ulang.
> 2. **Audit Kesehatan Data: detektor nama = angka.** `composables/useDataAudit.js` + grup baru `s_nama_angka` (sev danger): santri yang field `nama`-nya tanpa huruf sama sekali (cuma angka/simbol) = NIK/NIS nyasar ke kolom nama. Report-only; kyai betulkan manual via Edit.
> 3. **Google Sheet: baris data kosong (KOP+header muncul, data tidak).** Akar = bug app, BUKAN Apps Script: `kirimGoogleSheet` (`SantriView.vue`) membangun `rows` (dipakai di subtitle) tapi LUPA menyertakannya ke argumen `sendToSheet({...})` → payload `rows` undefined → Apps Script hanya tulis KOP + header. Fix: tambah `rows,`. ("Tes Koneksi" tetap jalan karena kirim `rows` eksplisit → Apps Script tak perlu diubah/redeploy.)
> 4. **ROLL-OUT GOOGLE SHEET ke 6 ekspor data** (keputusan kyai: "kasih semua yg bisa ekspor Excel"). Tombol teal **"Google Sheet"** (muncul bila `gsheetConfigured()`) di samping tombol Excel + masuk ribbon (bila ada `definePageActions`), reuse data/kolom/KOP yang SAMA dgn ekspor Excel-nya: **Guru** (`GuruView`, reuse `_buildExcelRows`/`_excelColumns`), **Buku Induk** (`BukuIndukView`), **Rekap Prestasi** (`RekapPrestasiView`, kolom dinamis +Juz bila ada PTPT), **Absensi Guru** (`AbsensiGuruView`, kolom per-hari), **Riwayat Kenaikan** (`NaikKelasView`), **Laporan Pencairan BMT** (`BisyarohView`). **Dilewati** (bukan ekspor data tabular): template impor (Santri/Guru/RekapPrestasi/KelasGuru/Tabungan), PDF/impor-only (Tabungan, Kegiatan, Impor Kalender, Bisyaroh-Rekap PDF). **Bonus bugfix:** `NaikKelasView` `exportStyled({...})` salah panggil (1 objek, bukan `(rows, opts)`) → diperbaiki ke `exportStyled(rows, {kop,subtitle,columns})`; ekspor Excel riwayat kenaikan kini jalan + tampil KOP.
> 5. **Audit lebih akurat (3 perbaikan, kyai):** (a) **Rule C Migrasi Lembaga** kini hanya flag **TPQ PAGI + sekolah TK** (bentrok jam pagi) — TPQ Sore + TK WAJAR, tak diflag lagi (`v100_lembagaFix.js` helper `isTpqPagi`). (b) **Dedupe santri TIDAK lagi pakai No. WA** sbg sinyal penguat (`v100_dedupe.js` `santriSamePerson` — baris `eqPhone(wa)` dihapus): wali multi-anak berbagi 1 WA → WA sama ≠ orang sama (sinyal tersisa: NIS/NISN/NIK/tgl_lahir/lembaga+kelas). (c) **Kandidat Nama Mirip lebih canggih** (`useDataAudit.js` `fuzzyDup` ditulis ulang): jarak edit **Levenshtein** (sim≥0.85 nama mirip; sim≥0.5 + **tgl_lahir sama**; sim≥0.4 + tgl_lahir sama) + union-find grouping + label alasan per grup; tetap report-only, TANPA WA. UI `MasterDataView` tampilkan `grp.reason` + deskripsi diperbarui.
> 6. **Impor Rekap Prestasi & Assign Guru pakai pencocokan FUZZY** (kyai: biar tak repot edit). Util baru `utils/fuzzyMatch.js` (`fuzzyKey`/`levenshtein`/`simRatio`/`bestNameMatch`) — sumber tunggal; `useDataAudit.js` ikut pakai (hapus duplikat). Di `onImportRekap` (`RekapPrestasiView`) & `onImportAssign` (`KelasGuruView`): setelah gagal cocok NIS & nama persis → fallback `bestNameMatch(nama, santriList)` (skor ≥0.86 **dan tidak ambigu** — kandidat kedua harus jauh di bawah, gap 0.06 → tak salah tebak). Jumlah yang tercocok via nama mirip dilaporkan di toast ("N via nama mirip — cek bila ragu"). NIS & nama persis tetap prioritas.
> Verify: `_run_vite.cmd` **VITE_EXITCODE=0** (4×: fix 1–3, roll-out GSheet, audit refine, fuzzy impor). TANPA bump versionCode / deploy (nunggu hasil tes kyai di app).
>
> ### ✅ BATCH 11 — EKGQ → NIG (10 Jun 2026, sesi sama) — commit e2c8516
> Label **EKGQ** diganti **NIG (Nomor Induk Guru)** di semua UI (form guru, Profil Guru, Pengaturan Saya, header ekspor/template XLSX, rapor). Field Firestore baru `nig` (TULIS); BACA pakai fallback `nig || ekgq || no_ekgq || no_syahadah` (+`nrg`/`nip` di rapor) → data lama tetap muncul TANPA migrasi paksa (fallback = strategi migrasi aman; field lama `ekgq` dibiarkan sbg cadangan). Impor terima alias NIG + lama (EKGQ/No Syahadah). Variabel internal (`ekgqState`/`ekgqGuru`/modal id 'ekgq') sengaja dibiarkan (tak tampil ke user). ⚠️ Makna berubah: EKGQ=No Syahadah Qiraati → NIG=Nomor Induk Guru (keputusan kyai). Opsional (belum dibuat): tombol backfill `ekgq`→`nig` semua guru bila mau Firestore bersih. Verify exit 0.
> **✅ Google Sheet HYBRID — PILOT Data Santri (commit menyusul).** Keputusan kyai: hybrid (Excel tetap) + layout rapi mirip PDF + pilot = Data Santri + panduan langkah-demi-langkah. Implementasi:
> - `composables/useGoogleSheet.js` — `sendToSheet({title,sheetName,kop,subtitle,columns,rows})` POST JSON (text/plain anti-preflight) ke Apps Script Web App, balas `{url}`. `isConfigured()` cek settings.
> - Settings: `gsheetUrl`+`gsheetToken` (settings store DEFAULT + PengaturanView defaultForm). Tab baru **Pengaturan → Google Sheet** (input URL+token + **Tes Koneksi** bikin sheet contoh). Auto-hydrate/save lewat `simpanSemua`.
> - **Data Santri** (`SantriView`): tombol **"Google Sheet"** (muncul bila `gsheetConfigured()`, admin) + aksi pita — kolom RINGKAS mirip PDF (No/Nama/NIS/JK/Lembaga/Kelas/Sekolah/WA), buka tab hasil.
> - **Apps Script** + panduan deploy lengkap: `docs/APPSCRIPT-GSHEET.md` (kode `Code.gs`: doPost token-guard → buat Spreadsheet, format KOP merge + header teal + zebra + border + freeze + lebar kolom → share anyone-with-link → balas url). **Kyai deploy sendiri** (akun Google kyai) → tempel URL+token di Pengaturan.
> - Verify exit 0. Roll-out laporan lain (Buku Induk/Rekap) menyusul setelah pilot OK.
>
> ### ✅ BATCH 10 — 4 FITUR BARU KYAI (10 Jun 2026, sesi sama)
> 1. **Migrasi Lembaga (fix salah impor)** — Master Data → Audit Data, kartu amber "Migrasi Lembaga (Salah Impor)". Util baru `utils/v100_lembagaFix.js`: `scanLembagaFix` deteksi (A) kelas pola Level/Juz→PTPT, "Pra PTPT"→Pra PTPT, Jilid/KPI/Persiapan/Khotam→TPQ tapi lembaga tak cocok (saran lembaga EDITABLE per baris, dropdown Qiraati); (B) `lembaga_sekolah` berisi nilai ngaji (mis. "TPQ Pagi") → kosongkan lembaga+kelas sekolah; (C) lembaga TPQ + sekolah TK → flag cek-manual (DEFAULT TIDAK dicentang). `applyLembagaFix`: updateDoc parsial + backup nilai LAMA ke `audit_log` (aksi 'update'). UI: Scan → centang → Terapkan (n), progress + hasil.
> 2. **Impor + template XLSX Rekap Prestasi Qiraati** — `RekapPrestasiView` toolbar (admin/isFullFilter): "Template Impor" (PREFILLED daftar santri sesuai filter aktif: NIS/Nama/Lembaga/Kelas/Juz/Awal/Akhir/Total) + "Impor XLSX" (match NIS→fallback nama; PTPT: total auto `N Hal` dari Awal−Akhir + `JUZ n`; TPQ/PPPH/Pra: pakai kolom Total; + `notif_prestasi` per santri spt simpanRekap).
> 3. **Impor + template XLSX assign guru→santri** — `KelasGuruView` header: "Template Assign" (PREFILLED semua santri aktif urut canonical: NIS/Nama/Lembaga/Kelas/Guru Pagi/Sore/Sekolah1/2) + "Impor Assign" (match NIS→nama; sel kosong=lewati, `-`=KOSONGKAN guru, isi=set TitleCase; `guru` compat ikut di-set; `guru_sekolah` merge 2 slot).
> 4. **Urutan lembaga + sort santri** — `santriSort.js`: + `sortLembagaNames()` (sumber tunggal urutan dropdown) + opsi `sortSantri(..., {byNama:true})`. `useSantri.santri` kini **lembaga → NAMA A–Z** (kyai; tier kelas dilewati krn kelas impor tak seragam bikin urutan tampak acak). Dropdown dirapikan: `SantriView` uniqueLembaga+Sekolah, `GuruView` uniqueLembaga+Sekolah, `KelasGuruView` lembagaOptions, `PpdbAdminView` lembagaOptions (semula `.sort()` alfabetis → PPPH nongol duluan).
> Verify: `_run_vite.cmd` exit 0. Semua Vue source murni (web/Android/Electron).
>
> ### ✅ BATCH 9 — FIX HASIL TES DEVICE KYAI (10 Jun 2026, sesi sama)
> Dua temuan kyai dari Electron v.100:
> 1. **Form kenaikan SEKOLAH "membaca data Qiraati"** — murni bug TAMPILAN (simpan sudah benar via `saveFormKenaikanSekolah`; filter list juga sudah benar match `lembaga_sekolah`). Akar: identitas form (`Saat ini:`) & label baris list selalu render `lembaga`/`kelas` ngaji. Fix `NaikKelasView.vue`: computed `formSaatIni` + helper `santriRowLabel(s)` — kategori sekolah → tampil `lembaga_sekolah · kelas_sekolah`; sort list kategori sekolah juga pakai field sekolah.
> 2. **Backstage Printer cuma view** → kini **pengaturan printer PENUH gaya Office** di `RibbonBackstage.vue` rail Printer: daftar printer terdeteksi Windows (`listPrinters`, auto-refresh saat rail dibuka + tombol Deteksi Ulang), pilih printer (highlight aksen), **Simpan Default** (`setDefaultPrinter` + toast), **Tes Cetak** ESC/P raster (dummy slip via `buildStrukSlipEscpBase64` + `printRaw`) — reuse penuh `useDesktopPrint`, modal global `PrinterSettingsModal` TETAP utk POS/Keuangan; tombol "Buka Pengaturan Printer" (event modal) dihapus dari backstage. Penyetelan ukuran slip/ESC-P tetap di Keuangan → Buat Tagihan.
> 3. **"Gabung duplikat belum bisa"** — grup nama-sama dgn **NIS BEDA** (mis. Maryam 2× NIS 0157/0158, Mauludiyah 3× NIS 0263/0264/0265) memang DITOLAK auto-Migrate (guard konflik keras `diffText(nis)` di `santriSamePerson` — by design, anti salah-gabung). Solusi: **tombol "Gabung Grup Ini" per-grup** di panel detail Analisis Duplikat (keputusan manual admin, guard identitas dilewati SADAR + konfirmasi). Util baru `mergeGroupManual(coll, items)` di `v100_dedupe.js` (reuse `planGroup`: primer = terlengkap, isi field kosong, hapus duplikat via `deleteOne` → backup `audit_log`). `_findDup` kini bawa `records` mentah; `dupKategori` + `kind` santri/guru; state `manualMerging` anti dobel-klik. Auto-Migrate TETAP konservatif.
> Verify: `_run_vite.cmd` exit 0. Web/Android tak terdampak (backstage = Electron-only; fix NaikKelas netral utk Qiraati; tombol gabung manual = fitur tambahan panel admin, semua platform).
>
> ### ✅ BATCH 8 FINAL — RE-AUDIT + P9 + BUMP vc100 (10 Jun 2026, sesi Claude Code desktop)
> - **Re-audit regresi (LOLOS semua):** (a) anti-bocor v.98 utuh — `GlobalSearch.vue` tetap pakai data ter-scope (nol `santriRaw`/`guruRaw`), guard `canView` `ProfilDetailView.vue` utuh; (b) `StatistikLembagaDetailView` (B7) aman — data via `scopedSantriAll` (useStatistikScope), route `meta:noSantri`, link profil lewat guard canView, tanpa listener sendiri; (c) `useDataAudit.js` (B8a) murni computed — nol listener; (d) cleanup listener `audit_log` di `MasterDataView` SELAMAT dari rewrite 5bca2ac (`onUnmounted` L49); (e) referensi 3 util migrasi terhapus = NIHIL; (f) `setWindowOpenHandler` (T20) ada di `electron/src/index.ts` + `build/index.js` (sinkron).
> - **P9 (dead slip builders):** hapus `cetakStrukDotMatrix` (popup+window.print, jalur driver lama yg dilarang utk slip 9.5) + `buildStrukEscposBase64` (ESC/P mode teks, digantikan raster `escpImage.js`) dari `utils/strukBuilder.js`; import mati di `PosSantriView.vue` dirapikan. **`buildStrukHtml`/`buildStrukHtmlWide`/`buildStrukText` TETAP** (masih dipakai cetak driver kertas non-9.5 + struk PDF).
> - **BUMP v.100.0626 (vc 99→100) — 13 titik §5:** `build.gradle` (vc+vn), `package.json` root+vue-app ("100.0626"), `electron/package.json` ("100.0.626"), `main.js` Sentry (`portal-mu@100.0626`), footer `LoginView`/`DashboardView`/`PpdbAdminView`/`AppSidebar`, fallback `RibbonStatusBar`/`RibbonBackstage`/`BantuanView` ("v.100.0626"). Sisa string `99.0626` di src = NOL.
> - Verify: `_run_vite.cmd` **VITE_EXITCODE=0**. (Diff `public/dist/tailwind.css` 1 baris = artefak build, ikut commit.)
>
> ### ✅ T22 + FOLLOW-UP SELESAI (10 Jun 2026, sesi lanjutan) — commit `23d7c9a`
> ⚠️ **Catatan label:** commit message tertulis "Batch7" — itu KELIRU (Batch 7 = T19/T20/T21 di atas). Isi commit `23d7c9a` sebenarnya = **T22 (audit tombol hilang Electron → nativize) + 3 follow-up (P5/P6/P7)**, masuk wilayah Batch 8.
> - **T22 (nativize 4 view Electron):** `PostsView.vue`, `HutangPiutangView.vue`, `PembayaranPendingView.vue`, `MasterDataView.vue` — header/tab-bar disembunyikan di Electron (`v-if="!isDesktop"` via `useDesktopShell().isElectron`). Aksi PostsView (Post Baru) + HutangPiutang (Tambah) migrasi ke pita via `definePageActions`. MasterDataView: tab-bar disembunyikan (navigasi via ribbon `?tab=`). PembayaranPending: hanya header (tak ada aksi). **Hasil audit T22: tidak ada tombol yang benar-benar hilang** — Buku Induk (`definePageActions` Input Manual/Ekspor/Cetak) & Supervisi (sub-tab via `watch route.query.tab`) sudah beres dari Batch 3–5; sisanya cuma header redundan.
> - **P7 (hapus dead `.rb-greet`):** `ribbon.css` (−46 baris CSS greeting widget) + `RibbonGroup.vue` (template greeting + import `useRibbonUser` + filter `'greeting'` dibuang; `useRibbonUser` MASIH dipakai `RibbonTitleBar.vue` → composable TIDAK dihapus) + `useRibbonNav.js` (`itemVisible` buang `'greeting'`).
> - **P6 (perf TagihanView):** `getNamaSantri` O(n²) `.find()` → `santriMap` computed (Map) O(1) lookup; modal simpan juga pakai Map.
> - **P5 (security functions):** `resolveTokensByTarget` — guard fan-out `wa` minimal 8 char (`String(wa).trim().length >= 8`) di branch `type:'santri'` & `type:'wa'`, cegah cross-family notif leak saat `wa` kosong/duplikat.
> - Verify: `npx vite build` exit 0 (built in ~21s, tanpa error). **TANPA bump versionCode.** (T19/T20/T21 sudah commit `413cbf7`; PENDING kyai = deploy/rebuild.)
>
> ### ✅ AUDIT MENU OVERHAUL (10 Jun 2026, Batch 8) — commit menyusul
> Permintaan kyai: migrasi duplikat lebih pintar, hapus fitur audit tak terpakai, tambah fitur audit pro. Di `MasterDataView.vue` tab **Audit Data**:
> - **HAPUS 3 migrasi satu-kali yang sudah selesai** (panel + script + file util): Migrasi v.21.10 (`lembaga_refs` — dormant, lihat KB §10), Migrasi TK v.21.70, Normalisasi Lembaga v.88. File dihapus: `utils/v21_10_migration.js`, `utils/v21_70_tk_migration.js`, `utils/v88_lembaga_normalize.js` (git tetap simpan history). Tidak ada importer lain (sudah dicek).
> - **Migrate duplikat lebih pintar** (`utils/v100_dedupe.js`): `canonPhone()` normalisasi WA Indonesia (`0`/`62`/`+62` → kanonik `62XXXX`) dipakai di `eqPhone`/`diffPhone` + kunci grup WA guru → duplikat WA beda-prefix kini ketangkap. `norm()` collapse spasi ganda (nama). Auto-merge tetap konservatif (identitas unik + nama-sama bersinyal, guard konflik).
> - **Fitur audit PRO baru "Kesehatan Data"** (composable baru `composables/useDataAudit.js`, report-only): integritas santri (tanpa NIS/lembaga/guru/WA, WA invalid, **rujuk guru tak terdaftar/yatim**, field guru sampah true/false), guru (tanpa jabatan/lembaga, WA invalid), lembaga (tanpa kelas/santri) — tiap temuan ada jumlah + detail expand & severity (danger/warn/info). Plus **Kandidat Nama Mirip (fuzzy)**: nama yang terlihat sama tapi beda tulisan (gelar/spasi/ejaan) untuk review manual (tidak auto-merge).
> - Verify: `_run_vite.cmd` exit 0. TANPA bump versionCode.
>
> ### 🆕 TASK BARU KYAI (10 Jun 2026)
> - **T21 → Batch 7:** Dasbor "Statistik Lembaga" bisa diklik → diarahkan ke **halaman data kelas** (guru + santri per kelas). ✅ SELESAI.
> - **T22 → Batch 8 (akhir):** Cek beberapa halaman ada tombol **hilang di Electron** (mis. Buku Induk: di web ada input manual dll, di Electron hilang). **Pindahkan tombol-tombol ke ribbon.** Cek halaman lain mungkin ada juga. ⏳ BELUM (Batch 8).

> ### ✅ BATCH 7 SELESAI (10 Jun 2026) — Login Electron + Statistik klik
> - **T21 (statistik lembaga → data kelas):** view baru `views/StatistikLembagaDetailView.vue` + route `/statistik/lembaga/:nama` (meta noSantri). Kartu "Statistik Lembaga" di `StatistikView.vue` kini `goLembagaDetail(nama)` → router.push (ganti toggle inline; inline detail + `detailLembaga`/`detailKelasRows` dihapus, logika diport ke view baru). Halaman: per-kelas (guru[] + santri klik → `/profil/santri/:id`), header total kelas/santri/guru. Scope ikut `useStatistikScope` (kepala/PJ se-lembaga).
> - **T19 (scrollbar login Electron):** `LoginView.vue` root +class `login-page` + `<style>` non-scoped `:has(.login-page)` → scrollbar tipis modern (8px, putih transparan) khusus route login (desktop; mobile sudah disembunyikan di main.css).
> - **T20 (Google login Electron) — DIAGNOSA + FIX awal, ⚠️ PERLU VERIFIKASI DEVICE KYAI:** Akar = `electron/src/index.ts` TIDAK punya `setWindowOpenHandler` → Electron men-DENY `window.open` default → popup `signInWithPopup` (Firebase auth handler) gagal diam-diam. Fix: tambah `setWindowOpenHandler` yang IZINKAN popup domain auth (`*.firebaseapp.com`/`*.web.app`/`accounts.google.com`/`apis.google.com`) + URL lain → `shell.openExternal` (browser sistem). **Catatan risiko:** popup `https` → opener `file://` bisa kena batasan postMessage; bila masih gagal, langkah lanjut = OAuth via browser sistem + `signInWithCredential` (butuh OAuth client + redirect URI). Kyai tes di app Electron rebuild, laporkan kode error nyata bila masih gagal.

> ### ✅ BATCH 6 SELESAI (10 Jun 2026) — T2 Kenaikan/Mutasi skema SEKOLAH
> Schema kyai: **1 tanggal naik per kelas + kelulusan (ceremonial) di kelas akhir**; itemHeader "Kenaikan". File: `utils/kenaikan.js` + `views/NaikKelasView.vue`.
> 1. **Default schema sekolah** (`kenaikan.js`): `DEFAULT_KARTU_KENAIKAN_{TK,SDI,SMP,SMA}` (TK A/B; I–VI; VII–IX; X–XII), label kelas = token `kelas_sekolah` agar `resolveKenaikanSchemaPath` direct-match. `getKartuKenaikanSchema` kenal TK/SDI/SMP/SMA. Export `LEMBAGA_KENAIKAN_SEKOLAH=['TK','SDI','SMP','SMA']`.
> 2. **Pengaturan tab**: list lembaga = `pengaturanLembagaList` (Qiraati + Sekolah) → admin bisa atur KOP & schema kartu sekolah.
> 3. **Form "Proses Naik" sekolah**: `formIsSekolah` (admin + kategori sekolah). Lembaga Baru = `LEMBAGA_KENAIKAN_SEKOLAH`, kelas = `SEKOLAH_KELAS_MAP`, guru = filter `lembaga_sekolah` (SMP/SMA→PKBM). Simpan via jalur terpisah `saveFormKenaikanSekolah()` (TIDAK menyentuh logika Qiraati): update `kelas_sekolah` + `guru_sekolah` (non-destruktif, union) + `kartu_kenaikan[TK/SDI/SMP/SMA][kelasId].naik=tgl` + ceremonial bila kelas akhir + catatan→entries + riwayat + `riwayat_kenaikan` (doc + koleksi event notif wali).
> 4. **Riwayat tab**: dropdown optgroup Qiraati/Sekolah; filter sekolah via `lembaga_sekolah` (SMP/SMA sub-tier `getPkbmSubTier`). count/latestCatatan pakai key sekolah.
> 5. **PDF kartu sekolah** (`eksporKartuPdf`): `isSekolahKartu` → identitas pakai `kelas_sekolah` + baris **GURU KELAS** (guru_sekolah), ceremonial label = **Kelulusan**. Modal layar: `kartuCeremonialLabel`.
> **Catatan/limitasi:** kartu sekolah disimpan di key `'SMP'/'SMA'` (bukan 'PKBM') konsisten dgn filter sub-tier. Mode form sekolah = **admin** (guru_sekolah role belum dapat mode sekolah — follow-up). versionCode BELUM dibump (ditahan utk Batch 8/ship).

> Disusun setelah membaca KB kanonik (`PROJECT-KNOWLEDGE-BASE.md`), `LOGIC-GLOBAL-LEMBAGA-CANONICAL.md`, `AUDIT-COWORK-09JUN2026-RIBBON-SHIP.md`, dan inspeksi langsung file sumber (`useRibbonNav.js`, `RibbonTitleBar.vue`, `NaikKelasView.vue`, `useLembaga.js`, `santriSort.js`, `GuruView.vue`, `GlobalSearch.vue`).
> Status awal repo: HEAD pasca audit v.98; ada uncommitted UI batch (lihat KB §STATUS). Build asli & rilis tetap dijalankan kyai di Windows.
> **Konvensi tetap dipatuhi:** surgical edits, verifikasi tiap edit (`tmp_recovery\_run_vite.cmd`), commit `--no-verify`, Vue source dipakai bersama Web/PWA/Android/Electron (perubahan `.vue/.js` → web via `firebase:deploy`, app HP via `build:aab`, desktop via `build:electron`).

---

## 0. PETA TASK → LOKASI KODE (hasil audit ringkas)

| # | Task kyai | Area | File utama | Risiko |
|---|---|---|---|---|
| T1 | Audit logika & fungsi (Web/PWA/Android/Electron) | semua | (lihat audit 08–09 Jun + re-verify) | — |
| T2 | Kenaikan/Mutasi lembaga **Sekolah**: skema khusus (kelas+guru sekolah, field catatan, kartu) | domain | `NaikKelasView.vue`, `utils/kenaikan.js`, `utils/raporPdf.js`, `useLembaga.js` | 🔴 tinggi |
| T3 | Urutan lembaga Qiraati: TPQ Pagi → Sore → Pra PTPT → PTPT → PPPH | global | `useLembaga.js`, `santriSort.js` | 🟢 rendah |
| T4 | Urutan lembaga Sekolah: TK → SDI → PKBM | global | `useLembaga.js`, `santriSort.js` | 🟢 rendah |
| T5 | Terapkan urutan lembaga di **semua data** | global | semua list/dropdown | 🟡 sedang |
| T6 | "Generate Tagihan Khusus" → isi tombol **Buat Tagihan** (Electron) | Electron+keu | `useRibbonNav.js`, `PengaturanKeuanganView.vue`, route baru | 🟡 sedang |
| T7 | Pengaturan **Bisyaroh** → tombol + halaman khusus (edit bisyaroh guru/pegawai) | Electron+keu | `useRibbonNav.js`, view baru `PengaturanBisyarohView` | 🟡 sedang |
| T8 | Pengaturan **Syahriyah** santri → tombol + halaman khusus | Electron+keu | `useRibbonNav.js`, view baru `PengaturanSyahriyahView` | 🟡 sedang |
| T9 | Scan duplikat → tambah tombol **Migrate** | data | view scan duplikat (MasterData/utility) | 🟢 rendah |
| T10 | Electron→Pendidikan→Data Guru: muncul guru tapi **terfilter pegawai** (bug) | bug | `useGuru.js`, `GuruView.vue`, `useRibbonNav.js` (`tipe=guru`) | 🟢 rendah |
| T11 | Urutkan semua santri/guru: lembaga Qiraati dulu + **nama A–Z** | global | `santriSort.js` + pemanggil | 🟡 sedang |
| T12 | Tombol **Undo/Redo** title bar mati → ganti **Mundur/Maju halaman** | Electron UI | `RibbonTitleBar.vue` | 🟢 rendah |
| T13 | Tombol **Simpan** title bar mati | Electron UI | `RibbonTitleBar.vue` + `useRibbonContext.js` | 🟡 sedang |
| T14 | Pengaturan keuangan **pecah jadi tombol ribbon** (tidak tampil menyeluruh) | Electron+keu | `useRibbonNav.js`, `PengaturanKeuanganView.vue` | 🟡 sedang |
| T15 | Pengaturan **Printer** dilengkapi & di-split di **menu File** (backstage) | Electron | `RibbonBackstage.vue`, `useDesktopPrint.js`, view printer | 🟡 sedang |
| T16 | Halaman **PSB** jadi **tab ribbon baru** + (riwayat pendaftaran, upload S&K, info pembayaran) jadi tombol | Electron | `useRibbonNav.js`, `PpdbAdminView.vue` + sub-rute | 🟡 sedang |
| T17 | Search bar Electron: ketik nama santri/guru → **muncul di list** | Electron UI | `GlobalSearch.vue`, `RibbonTitleBar.vue` | 🟡 sedang |
| T18 | Title bar Electron: tombol **Logout** + **pop-up konfirmasi** (jangan langsung keluar) | Electron UI | `RibbonTitleBar.vue`, reuse `useRibbonNav` action `logout` + `useConfirm` | 🟢 rendah |
| T19 | **Scrollbar** halaman login Electron dirapikan (modern) | Electron UI | `LoginView.vue` | 🟢 rendah |
| T20 | **Login Google** di Electron masih error → cek & perbaiki | Electron auth | `LoginView.vue`, `stores/auth.js`, Electron main (`index.ts`) | 🔴 tinggi |

---

## 1. TEMUAN AUDIT AWAL (yang memengaruhi rencana)

- **Title bar QAT inert (T12/T13):** `RibbonTitleBar.vue:5-7` — tombol Simpan/Undo/Redo memang **dekoratif** (`tabindex="-1"`, tanpa `@click`). Bukan "rusak" — memang belum di-wire (sengaja meniru Office). Maka T12/T13 = *implementasi baru*, bukan perbaikan regresi.
- **Logout (T18):** sudah ADA sebagai action di ribbon (`useRibbonNav` tab Personal → `action:'logout'`) tapi **belum** ada di title bar; pop-up konfirmasi perlu via `useConfirm`.
- **Lembaga order (T3/T4):** `useLembaga.js` `LEMBAGA_GROUPS` + `LEMBAGA_ORDER` dan `santriSort.js` `LEMBAGA_RANK` **sudah** mendekati canonical, tapi belum 100% konsisten di semua dropdown/daftar (mis. rank PKBM/SMP/SMA terpisah). T11 nama A–Z perlu dicek sudah jadi tiebreaker akhir di `sortSantri`.
- **Data Guru terfilter pegawai (T10):** ribbon mengarah `/guru?kelola=1&tipe=guru`; perlu verifikasi `useGuru.js`/`GuruView.vue` menghormati `tipe` (guru vs pegawai) — gejala kyai = filter `tipe` salah/kebalik.
- **Kenaikan Sekolah (T2):** `NaikKelasView` saat ini memakai jalur kartu kenaikan **Qiraati** (key `kartu_kenaikan[lembaga][kelasId][itemId]`, lihat Audit E). Untuk lembaga `sekolah` perlu cabang skema sendiri: pakai `lembaga_sekolah`+`kelas_sekolah`+`guru_sekolah[]`, item kenaikan = kelas sekolah, + field `catatan`, + template kartu sekolah di `raporPdf.js`.
- **Login Google Electron (T20):** `signInWithPopup` umumnya gagal di Electron `file://` (CSP/redirect). Solusi tipikal: alihkan ke OAuth via browser sistem + `signInWithCredential`, atau `shell.openExternal` + custom protocol callback. Perlu investigasi error nyata dulu (butuh device kyai).
- **firestore.rules (konteks):** quick-win v.98 sudah menaikkan 15 koleksi sensitif ke `signedIn()`. Tidak memblok task ini, tapi jaga jangan sampai halaman baru (bisyaroh/syahriyah) butuh read koleksi yang kini `signedIn()` sebelum sesi anon siap.

---

## 2. PEMBAGIAN BATCH (rekomendasi)

Prinsip pengelompokan: (a) fondasi dulu (urutan lembaga dipakai di mana-mana), (b) kumpulkan perubahan yang menyentuh file sama (ribbon nav, title bar) agar tak konflik, (c) yang paling berisiko/perlu device test (kenaikan sekolah, login Google) diisolasi.

### 🟩 BATCH 1 — Fondasi: Urutan Lembaga + Sorting Global  `[T3, T4, T5, T11]`
**Kenapa pertama:** dipakai semua halaman; rendah risiko; jadi dasar verifikasi batch lain.
- Set `LEMBAGA_ORDER` canonical tunggal: `TPQ Pagi, TPQ Sore, Pra PTPT, PTPT, PPPH, TK, SDI, PKBM` (+ Ma'had/Yayasan/Sarpras di akhir).
- Selaraskan `santriSort.js` `LEMBAGA_RANK` ke order itu; pastikan **nama A–Z** jadi tiebreaker terakhir.
- Audit semua pemanggil daftar/dropdown lembaga → pakai sumber order tunggal (`SantriView`, `GuruView`, `Rekap*`, `Rapor`, `Absensi`, dropdown filter, master).
- **Deliverable:** semua list santri/guru urut lembaga (Qiraati dulu) → kelas → nama A–Z, di Web/PWA/Android/Electron.

### 🟦 BATCH 2 — Bug cepat: Data Guru filter + Scan Duplikat Migrate  `[T9, T10]`
**Kenapa awal:** bug terisolasi, cepat, menambah kepercayaan.
- T10: perbaiki filter `tipe=guru` vs `tipe=pegawai` di `useGuru.js`/`GuruView.vue`.
- T9: tambah tombol **Migrate** di view scan duplikat (jalankan normalisasi/merge terkontrol + konfirmasi).

### 🟪 BATCH 3 — Title Bar Electron: Navigasi, Simpan, Logout, Search  `[T12, T13, T17, T18]`
**Kenapa dikelompok:** semua menyentuh `RibbonTitleBar.vue` (+ `GlobalSearch.vue`) — hindari konflik edit.
- T12: ganti Undo/Redo → **Mundur/Maju** (`router.back()` / `router.forward()` + disable state via history).
- T13: wire **Simpan** ke aksi simpan halaman aktif (via `useRibbonContext` page-action "simpan"; jika halaman tak punya, sembunyikan/disable).
- T18: tombol **Logout** + `useConfirm` pop-up (samakan UX web/Android).
- T17: search → tampilkan hasil santri/guru di list (perbaiki dropdown hasil `GlobalSearch` saat dipakai di title bar Electron; tetap hormati scope anti-bocor v.98).

### 🟨 BATCH 4 — Ribbon Keuangan: Pecah Pengaturan jadi Tombol  `[T6, T7, T8, T14]`
**Kenapa bareng:** semua memecah `PengaturanKeuanganView` global → tombol ribbon + halaman khusus.
- T14: pengaturan keuangan tidak lagi 1 halaman menyeluruh → grup ribbon "Pengaturan" berisi tombol terpisah.
- T6: tombol **Buat Tagihan** = halaman **Generate Tagihan Khusus**.
- T7: tombol **Pengaturan Bisyaroh** → halaman khusus edit/atur bisyaroh guru/pegawai.
- T8: tombol **Pengaturan Syahriyah** → halaman khusus syahriyah santri.
- Tambah rute baru + split view; non-Electron (web/Android) tetap pakai halaman gabungan (atau ikut split — konfirmasi kyai).

### 🟧 BATCH 5 — Ribbon: Tab PSB + Printer di Menu File  `[T15, T16]`
- T16: tambah **tab PSB** di ribbon; tombol: Riwayat Pendaftaran, Upload Syarat & Ketentuan, Info Pembayaran.
- T15: lengkapi **Pengaturan Printer** + pindah/expose di **backstage (menu File)** Electron (`RibbonBackstage.vue` + `useDesktopPrint.js`).

### 🟥 BATCH 6 — Kenaikan/Mutasi Skema Sekolah  `[T2]`
**Kenapa belakang (tapi prioritas tinggi kyai):** paling berisiko (data + kartu/PDF), butuh urutan lembaga (Batch 1) stabil + test data.
- Cabang skema **sekolah** di `NaikKelasView`: kenaikan pakai `lembaga_sekolah` + `kelas_sekolah` + `guru_sekolah[]`.
- Tambah **field catatan kenaikan** (per santri) tersimpan & ikut kartu.
- Template **kartu kenaikan sekolah** di `raporPdf.js` (KOP + guru sekolah, bukan PTPT/Qiraati).

### 🟫 BATCH 7 — Login Electron: Scrollbar + Google Login  `[T19, T20]`
**Kenapa terakhir:** T20 butuh investigasi error nyata + device test kyai (auth Electron).
- T19: rapikan scrollbar `LoginView` (modern, custom thin scrollbar).
- T20: diagnosa & perbaiki Google sign-in di Electron (kemungkinan ganti `signInWithPopup` → flow browser-sistem + `signInWithCredential`).

### ⬛ BATCH 8 — Re-Audit Menyeluruh + Ship  `[T1]`
- Re-verify Web/PWA/Android/Electron pasca semua batch; cek regresi anti-bocor v.98, listener leak, lembaga/kenaikan.
- Bump versionCode (≥100), `firebase:deploy` + `build:aab` + `build:electron`/`electron:publish`, push.

---

## 3. URUTAN EKSEKUSI YANG DISARANKAN

`Batch 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8`

Alasan: fondasi urutan lembaga (1) menopang verifikasi semua; bug cepat (2) cepat selesai; title bar (3) terisolasi & high-UX; ribbon keuangan (4) lalu ribbon PSB/printer (5) keduanya restrukturisasi `useRibbonNav`; kenaikan sekolah (6) saat urutan lembaga sudah pasti; login Google (7) terakhir karena butuh device kyai; re-audit + ship (8) penutup.

> **Catatan paralel:** Batch 1 & 2 bisa digabung jadi satu rilis kecil. Batch 6 (kenaikan) bisa dimulai lebih awal bila kyai memprioritaskannya — hanya pastikan Batch 1 sudah merge agar `kelas_sekolah`/order konsisten.

---

## 4. PERTANYAAN KONFIRMASI SEBELUM EKSEKUSI

1. **Scope platform per task:** sebagian task ditandai "khusus Electron" (T6, T7, T8, T14, T15, T16). Untuk T7/T8 (halaman Bisyaroh & Syahriyah) — apakah halaman khusus ini **juga** dimunculkan di Web/Android, atau **Electron saja** (web/Android tetap pakai Pengaturan Keuangan gabungan)?
2. **Mulai dari batch mana?** (default rekomendasi: Batch 1).
