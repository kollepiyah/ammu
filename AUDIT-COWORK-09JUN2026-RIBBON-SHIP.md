# AUDIT MENYELURUH v.98 — RIBBON DESKTOP + KESIAPAN SHIP (9 Juni 2026, Cowork)

> Antrean **A–F** dari `NEXT-SESSION-PROMPT.md` / KB section "SESI v.98 — RIBBON DESKTOP REDESIGN".
> Metode: 5 audit paralel membaca **file asli D:\ (authoritative)**. Temuan paling berat **diverifikasi ulang langsung** oleh agen utama (bukan sekadar klaim). Build asli tetap dijalankan kyai di Windows.
> ⚠️ **Catatan state:** git di sandbox Linux **index-nya corrupt** (warning "ignoring … extension") → `git status`/`git diff` sandbox TIDAK bisa dipercaya (sempat tampak ~46 file "modified" padahal mayoritas artefak EOL/stale). **Mohon kyai `git status` di Windows** untuk konfirmasi working tree sebelum commit. HEAD = `1619928` (recap KB), seluruh commit v.98 (`51f20c0`→`39a6dd2`) sudah masuk.

---

## RINGKAS VERDICT PER AREA

| Area | Lingkup | Verdict | P0 | P1 | P2/P3 |
|---|---|---|---|---|---|
| **A** | Electron Ribbon (fitur/tombol/UI/dark slate/desain) | ✅ **SHIP-READY** | 0 | 0 | 4 |
| **B** | Performa Web + Android | ⚠️ **FIX-FIRST** | 1 | 3 | 3 |
| **C** | Notifikasi per role & scope | ⚠️ rute **BENAR**; postur data P0 | 1* | 1 | 2 |
| **D** | Filter data ANTI BOCOR | ⚠️ **FIX-FIRST** | 1 | 1 | 3 |
| **E** | Kartu kenaikan auto-isi | ✅ **PASS** | 0 | 0 | 1 |

\* P0 area C = akar yang SAMA dengan postur `firestore.rules` di area D (dihitung satu isu).

**3 ISU UTAMA (lihat "ISU GABUNGAN" di bawah):**
1. 🔴 **Kebocoran data sisi-app (guru):** Global Search → Profil bisa buka SEMUA santri/guru lintas-lembaga. **Bisa fix surgical sekarang.**
2. 🔴 **Postur `firestore.rules` (risiko lama, BUKAN dari v.98):** data sensitif `read: if true` + auth anonim tanpa role-claim → scope hanya di UI. Workstream terpisah (custom claims); ada `firestore.rules.stage2-proposed`.
3. 🟠 **versionCode 96 → wajib ≥97** sebelum upload Play.

---

## AUDIT A — ELECTRON RIBBON ✅ SHIP-READY (P0:0, P1:0)

**Peta 7 tab → tombol → tujuan: SEMUA tervalidasi.** Tiap tombol pita menuju rute yang **benar-benar ada** di `router/index.js` (Home/Pendidikan/Keuangan/Saluran/Personal/Supervisi/Bantuan) atau handler nyata (`theme/ribbon/refresh/update/logout`). **NOL tombol mati / placeholder.**
- `RibbonPlaceholderView` hanya terjangkau lewat rute `modul/:judul` (router:108) — **tak ada** item pita/backstage yang menunjuk ke sana → tak berbahaya (scaffolding mati).
- **Dark mode SLATE konsisten** (`ribbon.css:53-73`): `#0f172a / #1e293b / #334155 / #f1f5f9`, aksen `var(--theme-color)`. Tidak ada warna coklat/nyasar. **Edge-to-edge** override aktif (`ribbon.css:672-674`). Search `min(520px,46vw)`, tinggi 30px (140,152). **Kartu sapaan sudah dihapus.**
- **Frameless + window controls + updater** ter-wire (`electron/src/index.ts:142-143,227-270`; `preload.ts`). Min/Max/Close → IPC `window:*`. Cek pembaruan in-app jalan.
- `definePageActions` di **akhir** `<script setup>` (SantriView:310, BukuIndukView:863, NaikKelasView:1061, NotifikasiView:97).
- **Paritas desain Visual Communication PASS** — token light 1:1 dengan `design_handoff_ammu_desktop/app/ammu.css`; dark = slate adalah **penyimpangan yang disengaja** (handoff pakai coklat; slate dipilih agar konsisten dgn dark mode app). Sesuai keputusan kyai di KB.

**P2 (polish, tidak memblok):**
- `RibbonStatusBar.vue:30` & `RibbonBackstage.vue:84` fallback versi **`v.97.0626`** (kedaluwarsa, harusnya v.98) — muncul hanya bila `settings.appVersion` kosong.
- Kode `.rb-greet` (CSS + cabang greeting) kini **dead** (tak ada data path) — boleh dihapus.
- Tombol QAT title bar (Save/Undo/Redo) **dekoratif** (`tabindex="-1"`, tanpa `@click`) — meniru Office; bukan tombol mati fungsional, tapi kalau mau "tak ada tombol inert" → wire atau buang.
- Listener IPC (`onUpdateStatus`/maximize) tak di-`removeListener` — window tunggal & long-lived → **tak ada leak nyata**, higiene minor.

---

## AUDIT B — PERFORMA ⚠️ FIX-FIRST (P0:1, P1:3, P2:3)

**🔴 P0-1 · versionCode belum dibump.** `vue-app/android/app/build.gradle:19-20` = `versionCode 96` / `versionName "v.96.0626"`. Play menolak AAB dengan versionCode ≤ upload terakhir. Tak konsisten dgn `main.js` (Sentry `portal-mu@97.0626`). **Fix:** bump ke **97** di SEMUA titik §5 lalu rebuild AAB. (Pemblokir proses rilis, bukan bug runtime.)

**🟠 P1 — listener Firestore bocor (tanpa cleanup) — TERVERIFIKASI (0 `onUnmounted`):**
- `composables/useSantriForm.js:319,323` — `onSnapshot(master/lembaga)` + `onSnapshot(collection 'guru')` (KOLEKSI PENUH), **tanpa `onUnmounted`**. Tiap buka form santri (new/edit) menambah listener `guru` permanen. (`useGuruForm.js` justru sudah benar cleanup.) **Fix:** `onUnmounted(() => { unsubLembaga?.(); unsubGuru?.() })`.
- `views/MasterDataView.vue:34-46` — `subscribeColl('audit_log')` tanpa `onUnmounted` + **over-fetch** (ambil seluruh `audit_log` lalu `.slice(0,50)` di klien). super_admin-only. **Fix:** cleanup + query `orderBy('timestamp','desc')`+`limit(50)`.
- `views/KelasView.vue:53-58` — `onSnapshot(master/lembaga)` tanpa `onUnmounted`. **Fix:** `onUnmounted(() => unsub?.())`.

**P2:** render daftar tak terbatas (SantriView:190, TagihanView:60, Rekap*) — aman di skala ratusan, risiko skala; lookup O(n²) per baris (TagihanView `getNamaSantri`, RekapPrestasi `find`) → pakai Map; `App.vue` native listeners tak dilepas (root, tak unmount → tak berbahaya).

**✅ INTACT (tidak regresi):** semua rute lazy `()=>import()` (router:7-91); prefetch dibatasi 9 rute + skip 2g/Save-Data (router:246-279); `vite.config.js:34-42` `manualChunks` eksplisit per lib berat (`vendor-pdf/excel/fcm/charts/firebase`); jspdf/exceljs/messaging **dynamic-import** (pdf.js:10-11, useExcel:15, usePushNotifications:71) — **bukan CDN, bukan eager**; `capacitor.config.json` `webDir:"dist"` **tanpa `server.url`** (native bundle benar); satu-satunya `setInterval` (useClock:26) sudah di-clear; Electron renderer `contextIsolation:true`/`webSecurity:true`, load file dist lokal.

---

## AUDIT C — NOTIFIKASI ⚠️ (logika rute BENAR; akar P0 = postur rules)

**`functions/index.js` = 1035 baris, UTUH/tidak terpotong** (selisih "-224" tadi = artefak index sandbox stale; file D:\ self-closing, 7 fungsi lengkap).

**Tabel rute — SEMUA PASS (sesuai aturan kyai):**

| Notif | Penerima dimaksud | Lonceng in-app (`useNotifications.js`) | FCM (`functions/index.js`) | Verdict |
|---|---|---|---|---|
| tagihan | wali/santri terkait | `getTagihan` santri-only + `santri_id===me` | `onTagihanCreated` `{santri,id}`, SKIP bulk | ✅ |
| pembayaran | santri terkait | `getPembayaran` own | `onPembayaranVerified` `{santri,id}` | ✅ |
| prestasi anak | walisantri anak itu | `getPrestasi` own | (in-app saja) | ✅ |
| bisyaroh | guru ybs | `getBisyaroh` guru-only + `guru_id===me` | tak ada push nominal | ✅ |
| catatan kelas/supervisi | guru / kepala-PJ target | `getSupervisi` target_type guru/lembaga | — | ✅ |
| kritik & saran | admin | `getKritik` admin-only | — | ✅ |
| kenaikan | wali anak | `getKenaikan` own | `onKenaikanCreated` `{santri,id}` | ✅ |
| libur | audiens tepat | `getLibur` gate audience | broadcast via post | ✅ |
| transfer bukti | admin verifikator | (admin) | `target:'admin'` (resolver = admin/keu/super) | ✅ |
| auto-gen (cron) | santri_semua | — | `target:'santri_semua'` (token santri saja) | ✅ |

**🔴 P0 (lapisan data — = isu rules area D):** lonceng in-app dibangun **di klien** via `subscribeColl('keuangan_gaji'/'keuangan_tagihan'/'notif_prestasi'…)` **tanpa filter Firestore**, sedang rules `read: if true`. Maka filter per-role hanya **kosmetik UI**: guru/wali/ (bahkan caller anonim DevTools) bisa baca `keuangan_gaji` (bisyaroh guru lain), `keuangan_tagihan`, `notif_prestasi` langsung dari API. **Push FCM TIDAK terdampak** (resolve token server-side, payload generik/own). → fix = postur rules (lihat ISU GABUNGAN #2).

**P1:** `resolveTokensByTarget` (functions/index.js:73-74) fan-out ke semua santri ber-`wa` sama (disengaja utk 1 wali banyak anak). Bila ada `wa` kosong/placeholder/duplikat antar-keluarga → bocor lintas-keluarga. **Fix:** guard `if (wa && wa.length>=8)` + pastikan keunikan `wa`.
**P2:** `notif_queue` `read: if signedIn()` (rules:232) → memuat pesan spesifik + **token FCM**, terbaca user mana pun yang signed-in. **Fix:** `read: if false` (server-only). Libur audience bisa di-spoof penulis non-admin (dampak rendah).

---

## AUDIT D — FILTER DATA ANTI BOCOR ⚠️ FIX-FIRST (P0:1, P1:1, P2:3)

| Invarian | Status | Bukti |
|---|---|---|
| 1. santri/wali hanya datanya | ✅ PASS | TagihanView:260-267, TabunganView:649-670, PembayaranView:527-559, CapaianPrestasi:262-265; guard `noSantri` redirect (router:230-236); search disembunyikan dari santri |
| 2. guru hanya ampuannya | 🔴 **FAIL** | lihat P0 di bawah |
| 3. Kepala/PJ se-lembaga | ✅ PASS | useSantri:71-76 `lembagaScopeMatches`; useStatistikScope; Rekap/Absensi/Rapor scoped |
| 4. admin_keuangan / admin / super | ✅ PASS | roleScope.js:5-37; keuangan-gate `cekHakAkses` (auth:99-102); CRUD = super_admin |
| 5. tak ada bocor lintas-lembaga/akun | 🔴 **FAIL** | akibat #2 |

**🔴 P0 · Kebocoran roster/lintas-lembaga via Global Search → Profil (role GURU) — TERVERIFIKASI LANGSUNG.**
`useSantri()` mengekspor DUA: `santri` (computed **ter-scope** per role, `useSantri.js:59-124`) **dan** `santriRaw` (koleksi **mentah tanpa scope**, `useSantri.js:33,155`). **`GlobalSearch.vue:99`** memakai **`santriRaw`/`guruRaw`** (bukan yang ter-scope) → `santriHits`/`guruHits` (109-124) mencari **seluruh** santri/guru. Klik hasil → `goSantri/goGuru` (139-146) → rute `/profil/:tipe/:id` → **`ProfilDetailView.vue:60`** `getOne(tipe,id)` (`services/firestore.js` `getDoc` mentah, **tanpa scope**). Global Search **tampil untuk guru** (`AppHeader` `canSearch=['admin','guru']`; dikonfirmasi KB v.91). 
**Akibat:** guru mana pun bisa cari & buka profil LENGKAP santri/guru **lintas-lembaga** (nama wali, no. WA, alamat, prestasi). Melanggar aturan kyai "guru sesuai ampuannya; tak ada bocor lintas-lembaga/akun".
**Fix surgical:** (a) `GlobalSearch` pakai `santri` (computed ter-scope) bukan `santriRaw`; scope `guruHits` per-role (guru → hanya dirinya/sekolahnya, atau nonaktifkan pencarian guru utk guru); (b) `ProfilDetailView` tambah **guard scope** (admin/super = bebas; guru = hanya ampuan/diri; Kepala = `lembagaScopeMatches`) → kalau di luar scope tampilkan "Data tidak ditemukan".

**🟠 P1 · `ProfilDetailView` tanpa guard scope sama sekali** (`:56-65`). Meski lewat search di-scope, deep-link manual `#/profil/santri/<id>` tetap tembus (rute hanya `noSantri`, tak blokir guru). Fix = (b) di atas.

**P2:** RekapDiniyahView/InputBulananView tak punya cabang `kepalaScope` (justru LEBIH ketat → bukan bocor, hanya inkonsisten); `/santri` & `/absensi-santri` tanpa `meta.noSantri` (render kosong utk santri, bukan bocor); **postur `firestore.rules` world-readable** (ISU GABUNGAN #2).

**Postur `firestore.rules`:** read terbuka (`if true`) untuk hampir semua koleksi sensitif — `keuangan_*` (tagihan:88, gaji:130, buku_induk:146), `rapor_semester:246`, `supervisi_catatan:400`, `notif_prestasi:446`, `santri`/`guru` (PII), `audit_log`. Write butuh `signedIn()` (anon OK). Karena custom-auth + Anonymous **tanpa role-claim**, rule per-record memang tak bisa keying ke peran → **disengaja & terdokumentasi**, tapi artinya siapa pun dengan config project bisa baca seluruh koleksi via SDK/REST, melewati UI. **Rekomendasi:** migrasi ke auth ber-claim (custom token bawa `role`/`lembaga`/`santri_id`) lalu ketatkan read; **quick-win interim:** naikkan koleksi paling sensitif (`keuangan_*`, `rapor_semester`, `notif_prestasi`, `supervisi_catatan`, `audit_log`) dari `if true` → minimal `signedIn()` (app selalu buat sesi anon saat login → risiko rendah, hapus eksposur fully-public).

---

## AUDIT E — KARTU KENAIKAN ✅ PASS

**tanggal auto-isi end-to-end.** `NaikKelasView.saveFormKenaikan` (`:1855`): `today = new Date().toISOString().slice(0,10)` (1891) → tulis `santri.kartu_kenaikan[lembaga][kelasId][itemId] = today` (1907) + `.ceremonial = today` (1910) via `updateDoc` (2018). **Sisi baca** (RaporView `tglKhotamFromKenaikan`/`getTglKhotamPtpt`:1867-1924 & `raporPdf.js` `tglKhotamPtptKK`/`tglKhotamLevelKK`:95-132) membaca **key yang persis sama** → kolom "Tgl Khotam" terisi otomatis. **Field map cocok.**
**catatan** round-trip di key sama (`entries[]`) tapi terisi di kartu **hanya bila admin mengetik** (textarea "Opsional"); narasi otomatis ("Naik ke …/Khotam …") ditulis ke `riwayat`/`riwayat_kenaikan`, bukan ke `kartu_kenaikan.entries`.
**P3 (opsional):** mirror narasi otomatis ke `kartu_kenaikan[...].entries` agar kartu ikut terisi tanpa ketik manual (`saveFormKenaikan`, push `{tanggal:today,itemId,tipe:'catatan',text:ket}`). Bukan bug.
`useKartuKenaikan.js` **sudah tidak ada** di tree (logika inline di kenaikan.js/NaikKelasView/raporPdf) — tak ada dead-import.

---

## ISU GABUNGAN & REKOMENDASI URUTAN

1. 🔴 **[App-side, bisa fix sekarang] Global Search/Profil guru-scope** (Audit D-P0+P1). Surgical, langsung memenuhi instruksi anti-bocor.
2. 🔴 **[Arsitektur, workstream terpisah] Postur `firestore.rules`** (Audit C-P0 + D-postur). Pre-existing (sudah live, BUKAN regresi v.98). Quick-win: gate koleksi sensitif → `signedIn()`. Penuh: custom claims (lihat `firestore.rules.stage2-proposed`).
3. 🟠 **[Proses rilis] versionCode 96→97** (§5: build.gradle, package.json root+vue-app, electron/package.json, main.js Sentry, 4 footer).
4. 🟠 **[Aman, surgical] 3 listener leak** (useSantriForm, MasterDataView, KelasView) + **P1 same-wa guard**.
5. 🟡 **[Polish] P2/P3**: fallback versi Ribbon v.97→v.98; `.rb-greet` dead; `notif_queue` read:false; mirror catatan kartu; Map utk lookup O(n²).

---

## CHECKLIST SHIP (jalankan SETELAH fix disepakati — PowerShell, pakai `;`)

```powershell
cd "D:\Aplikasi Project\Portal MU";
.\tmp_recovery\_run_vite.cmd                       # verifikasi VITE_EXITCODE=0
git add -A ; git commit --no-verify -F .\tmp_recovery\_msg.txt
npm run firebase:deploy                            # web/PWA
firebase deploy --only firestore:rules,storage     # JIKA rules diubah
firebase deploy --only functions                   # JIKA functions diubah (same-wa guard)
npm run build:aab                                  # SETELAH versionCode ≥97 (kyai, butuh keystore)
# Desktop (Ribbon hanya muncul setelah ini):
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; $env:GH_TOKEN="<token kollepiyah/ammu>" ; npm run electron:publish ; cd ..\..
git push
```
> Ribbon HANYA aktif di build Electron (`useDesktopShell().isElectron`); `firebase:deploy` tidak menyentuh desktop. `electron:publish` → repo GitHub `kollepiyah/ammu` (electron-updater). Husky → selalu `--no-verify`.

**Status akhir:** Ribbon (A) & Kartu Kenaikan (E) lolos. SHIP disarankan **setelah** minimal isu #1 (anti-bocor app-side) + #3 (versionCode) + #4 (listener) ditangani; isu #2 (rules) keputusan kyai (blok ship atau jadikan follow-up).

---

## ✅ FIXES DITERAPKAN (9 Jun 2026, sesi ini) — BELUM commit/deploy (kyai)

> Semua edit surgical + diverifikasi via **Read tool (D:\ authoritative)**. Catatan: bash/mount sandbox menyajikan salinan STALE/terpotong (root `package.json` "rusak" di L59, `firestore.rules` tail terpotong, ProfilDetail `canView`=0) — itu **artefak mount** (KB-documented), file asli D:\ BENAR (Read-confirmed; `useSantriForm.js` lolos `node --check`).

**Fix #1 — Anti-bocor (Audit D-P0/P1):**
- `components/layout/GlobalSearch.vue`: `santriRaw`/`guruRaw` (mentah) → `santri`/`guru` (TER-SCOPE dari useSantri/useGuru). Guru kini hanya menemukan santri **ampuannya**; daftar guru kosong utk non-admin (useGuru.guru ⇒ []).
- `views/ProfilDetailView.vue`: + guard `canView(tp, rec)` (admin/super/keu = bebas; guru = ampuan/diri; Kepala = lembagaScopeMatches) → di luar scope tampil "Data tidak ditemukan". Menutup deep-link `#/profil/:tipe/:id`.

**Fix #2 — Listener leak (Audit B-P1):** + `onUnmounted` cleanup di `composables/useSantriForm.js` (unsubLembaga+unsubGuru = koleksi `guru` penuh), `views/MasterDataView.vue` (audit_log), `views/KelasView.vue` (master/lembaga).

**Fix #3 — versionCode → 97 (Audit B-P0, §5):** `android/app/build.gradle` (vc **97** + vn v.97.0626), root `package.json` (97.0626), `electron/package.json` (97.0.626), footer `LoginView`/`DashboardView`/`PpdbAdminView` (v.97.0626). (`vue-app/package.json`, `main.js` Sentry, Ribbon StatusBar/Backstage, AppSidebar, BantuanView SUDAH 97 → tak diubah.)

**Fix #4 — Rules quick-win (Audit C-P0 / D-postur):** `firestore.rules` — `read: if true` → `if signedIn()` untuk **15 koleksi sensitif** (keuangan_tagihan/tabungan_santri/uang_saku/gaji/buku_induk/hutang_piutang/pembayaran, tabungan_mutasi, rapor_semester, rekap_diniyah, rekap_prestasi, riwayat_kenaikan, supervisi_catatan, notif_prestasi, audit_log) + `notif_queue` read → `false`. **Login-path TETAP publik** (master/settings/guru/santri/lembaga/posts/kegiatan/beranda_post). Struktur utuh (Read-confirmed: helper `signedIn()` L37, default-deny + tutup L451-456).

**Fix #5 — BUILD BLOCKER (VITE_EXITCODE=1, bug BAWAAN v.98, bukan dari edit audit):** `vue-app/src/views/TabunganView.vue` (L819 + L1169) & `views/PosSantriView.vue` (L242 + L248) mendeklarasikan `isDesktop` **DUA KALI** → `[vue/compiler-sfc] Identifier 'isDesktop' has already been declared` → build:electron gagal. Kode v.98 ini ke-commit tapi belum pernah di-build:electron bersih. **Fix:** buang baris v.98 yang dobel (`const { isElectron: isDesktop } = useDesktopShell()`), pertahankan deklarasi awal `const isDesktop` (no TDZ, `definePageActions` tetap pakai). Verifikasi: tiap file kini **1** deklarasi `isDesktop`. **Scan proaktif 31 file v.98 (20 view + 11 Ribbon/shell) via compiler vite pada versi committed = 0 error** → tak ada duplikat lain. ⚠️ Re-run `tmp_recovery\_run_vite.cmd` harus `VITE_EXITCODE=0` sebelum commit.

**Tidak diubah (sesuai temuan):** Ribbon versi = no-op (fallback sudah v.97.0626). Kartu kenaikan (E) PASS. P1 same-`wa` fan-out (functions/index.js) & P2 (list O(n²), `.rb-greet` dead) = **ditunda** (follow-up).

### ⚠️ WAJIB DITES KYAI sebelum deploy rules (timing anon-auth)
Rules sensitif kini butuh sesi login. App pakai persisted-anon + `await ensureAnonAuth()` saat login → secara teori aman, koleksi `read: if signedIn()` lain (pembayaran_*) sudah jalan. **Tes:** (1) login baru → buka Keuangan/Rapor + lonceng notif terisi; (2) **reload keras saat masih login** → data & lonceng tetap muncul TANPA error "Missing or insufficient permissions" di console. Jika ada yg kosong → race anon-auth → mitigasi: tunda subscribe sampai auth siap (follow-up) atau revert koleksi itu ke `if true`.

### Verifikasi build (kyai, Windows — gate asli)
```powershell
cd "D:\Aplikasi Project\Portal MU"; .\tmp_recovery\_run_vite.cmd    # harus VITE_EXITCODE=0
```

### Urutan SHIP (SETELAH tes di atas lolos) — PowerShell, pakai `;`
```powershell
cd "D:\Aplikasi Project\Portal MU";
git add -A ; git commit --no-verify -F .\tmp_recovery\_msg.txt
npm run firebase:deploy                          # web/PWA
firebase deploy --only firestore:rules,storage   # rules hardening v.98
npm run build:aab                                # vc97 (butuh keystore)
npm run build:electron --prefix vue-app ; robocopy "vue-app\dist" "vue-app\electron\app" /MIR ; cd vue-app\electron ; $env:GH_TOKEN="<token kollepiyah/ammu>" ; npm run electron:publish ; cd ..\..
git push
```
(functions tak diubah sesi ini → `firebase deploy --only functions` hanya bila kelak terapkan guard same-`wa`.)
