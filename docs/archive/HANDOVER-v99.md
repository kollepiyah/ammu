# HANDOVER untuk Sesi Chat Berikutnya — Portal Mambaul Ulum

**Tanggal handover:** 11 Mei 2026 (sesi v.85 → v.99)
**Versi terakhir:** `v.99.0526`
**Service Worker:** `v84-0526-bisyaroh-quickfilter-noemoji`
**Status deploy:** Tergantung user — beberapa versi mungkin belum deploy production
**Repository:** `D:\Aplikasi Project\Portal MU\`

---

## KONTEKS PROJECT

**App:** Portal Mambaul Ulum — web app management pesantren (Firebase-hosted)
- URL: `https://portal-mambaul-ulum.web.app`
- Stack: Firebase (Hosting + Firestore + Auth + Storage + Functions + Messaging), Tailwind CSS self-hosted, jsPDF, html2canvas, ExcelJS, SweetAlert2
- File utama: `public/index.html` (~1.41 MB, single-file SPA)
- Bucket Storage: `gs://portal-mambaul-ulum.firebasestorage.app`
- User login test: Rahman Fanani (Super Admin, sesiAktif.id='admin')

**User preferences (PENTING — jangan dilanggar):**
- Bahasa Indonesia ringkas
- Diskusi step-by-step DULU sebelum eksekusi (kecuali user explicit pilih opsi cepat)
- Hindari GitHub Actions (deploy via Firebase CLI saja)
- Format versi: `v.{updateNum}.{MM}{YY}` — contoh `v.99.0526` = update ke-99, bulan Mei tahun 2026
- Format SW_VERSION: `v{NN}-{MMYY}-{descriptor}` — contoh `v84-0526-bisyaroh-quickfilter-noemoji`
- TIDAK PAKAI EMOJI di seluruh app (sudah di-strip semua di v.99)

---

## RIWAYAT VERSI v.85 → v.99 (yang dikerjakan di sesi ini)

| Versi | Scope |
|---|---|
| v.85.0606 | Mobile CSS disable iOS swipe-back gesture |
| v.86.0526 | Fix padding mobile iOS — welcome card & kalender card overflow (tambah `min-w-0` ke grid items + CSS global mobile `.grid > * { min-width: 0 }`) |
| v.87.0526 | Wire `DEFAULT_SCHEMA_DINIYAH` (sebelumnya pakai DEFAULT_SCHEMA_KOSONG) + banner warning schema kosong + auto-save sebelum cetak rapor + defensive log rekap diniyah |
| v.88.0526 | Bug santri TPQ tidak muncul (handle virtual group `_VIRTUAL_GROUPS['TPQ']` = TPQ Pagi + Sore) + bug kenaikan santri "Guru Kelas Baru" jadi opsional |
| v.89.0526 | **CRITICAL HOTFIX**: `window._raporState = _raporState;` — inline handler oninput akses `window._raporState.data[...]` undefined (let bukan var) → semua input nilai HILANG silent |
| v.90.0526 | Kop rapor virtual group fallback ke member kop + standardize font kop semua tempat (HTML 14/18/12px, PDF 11/14/9pt) + recompute predikat saat save & cetak |
| v.91.0526 | Hide spinner browser di input number rapor + onfocus selectAll (cegah append issue) + reset stale predikat (clear kalau nilai=0) + font kop baris 2 → 22px |
| v.92.0526 | Schema Diniyah baru `perKelas: true` dengan 14 jenjang (TK A, TK B, I-XII) × 8 mapel default × KKM 80 + render perKelas + cetak layout sesuai Gambar 1 |
| v.93.0526 | TTD layout flex column + push to bottom (tidak work di print, di-revert v.94) |
| v.94.0526 | TTD position absolute (replace flex), urutan **Guru kiri \| Wali tengah \| Kepala kanan**, tanggal sejajar Kepala, EKGQ di bawah nama (replace jabatan kepala), auto rotation manifest, dark mode kontras gradient *-50 + border *-200 |
| v.95.0526 | Hapus tab "Tabungan Guru" + rename UI: GAJI→BISYAROH (4), Gaji→Bisyaroh (22), TAGIHAN→PEMBAYARAN (4), Tagihan→Pembayaran (20). tambahSection guard untuk schema perKelas |
| v.96.0526 | Hotfix `switchKeuGuruTab` — hapus 'tabungan' dari array loop (tab di-hapus v.95) + defensive null check |
| v.97.0526 | Hide card Push Notif Pembayaran (sementara, di-revert v.98) + tabungan santri quick input: datalist autocomplete + tombol Setor/Tarik/Riwayat per row + functions `bukaModalMutasiTabSantriQuick` `_populateMtsDatalist` `_resolveMtsSantri` |
| v.98.0526 | **firestore.rules update**: allow delete BI untuk sumber `['manual', 'gaji', 'pos_santri', 'tabungan_santri', 'tabungan_guru', 'hutang']` (fix error simpan slip overwrite) + revert PN hide + filter tipe pegawai 4 tombol di Bisyaroh |
| v.99.0526 | Quick filter Bisyaroh — datalist autocomplete (ketik nama guru) + hapus 134 emoji unicode (semua emoji di-strip) |

---

## TASK PENDING — LANJUT DI SESI BERIKUTNYA

Urutan rekomendasi (paling siap → paling kompleks):

### 1. v.100 — UI Editor Schema Diniyah perKelas (Big — 3-5 calls)

**Konteks:** Schema Diniyah baru pakai struktur `{ perKelas: true, jenjang: [{kelas, mapel:[{id,nama,kkm}]}] }`. Editor existing `bukaEditorSchema()` hanya support sections-based (TPQ). Kalau buka editor untuk Diniyah → tombol "Tambah Section" di-guard di v.95 dengan Swal info "v.96+".

**Spec yang dibutuhkan:**
- Modal editor baru (atau extend `modal-schema-rapor`) yang detect `schema.perKelas === true`
- Tab per jenjang (TK A, TK B, I-XII) — 14 tabs
- Per tab: list mapel (nama + KKM input number) + tombol Tambah Mapel + tombol Hapus Mapel
- Tombol Tambah Jenjang (kalau user mau jenjang custom)
- Tombol Hapus Jenjang
- Tombol Reset to default (sudah ada — pakai DEFAULT_SCHEMA_DINIYAH_PER_KELAS)
- Save → `savedSettings.raporSchemas['Diniyah']`

**File location:**
- Schema definition: `index.html` line ~14064 (`DEFAULT_SCHEMA_DINIYAH_PER_KELAS`)
- Helper: `_slugMapelDiniyah` (line ~14082)
- Editor existing: `bukaEditorSchema()` (line ~14572 area), `renderSchemaEditor()` (line ~14580 area), `tambahSection()` (line ~14723 area, sudah punya guard perKelas)
- Render form: `renderFormRapor()` (line ~14264) sudah handle perKelas
- Cetak: `generatePrintHTML()` (line ~14997) sudah handle perKelas

### 2. v.101 — UI Editor Schema Qiraati Custom Per-Lembaga (Medium — 2-3 calls)

**Konteks:** Lembaga Qiraati: TPQ (virtual: TPQ Pagi + Sore), Pra PTPT, PTPT, P3H. Default schema TPQ ada. Lainnya (Pra PTPT, PTPT, P3H) → KOSONG (banner warning sudah ada di v.87).

**Spec:**
- Reuse `bukaEditorSchema()` existing untuk sections-based Qiraati lembaga
- User klik "Edit Schema" di Master Data → Lembaga (per lembaga) → buka editor sections-based
- Save → `savedSettings.raporSchemas[lembaga]`
- Tombol "Copy from TPQ" untuk quick start

**Konfirmasi user sebelum eksekusi:** apakah PTPT/Pra PTPT/P3H butuh field tambahan (mis: Juz Tahfizh)?

### 3. v.102 — Refactor Absensi Lembaga (Huge — 5-8 calls)

**Konteks:** User catatan dari sesi: "untuk absen santri lembaga itu input/impornya bukan harian tapi bulanan. absen santri harian hanya untuk santri mukim di menu kegiatan pesantren"

**Saat ini:** Absensi santri lembaga formal dicatat HARIAN di `absensi_santri_sekolah` (1 hari = 1 status Hadir/Sakit/Izin/Alpa). Schema Firestore line ~308 di `firestore.rules`.

**Yang user mau:**
- Absensi lembaga = **BULANAN** (input total Sakit/Izin/Alpa/Hadir per bulan per santri)
- Absensi mukim (santri pondok) = HARIAN, di menu Kegiatan Pesantren (sudah benar)

**Yang perlu refactor:**
- Skema Firestore baru: `absensi_santri_sekolah_bulanan` dengan field `{ id, santri_id, periode (YYYY-MM), sakit, izin, alpa, hadir }` 
- UI baru: form input bulanan per santri (atau bulk via tabel)
- Import Excel template bulanan
- Update render rapor: ambil absensi dari schema baru, bukan hitung dari harian
- Backward compat: tetap bisa baca data lama (atau migrasi)

### 4. v.103+ — Audit CRUD Super Admin (Medium — 3-5 calls)

**Konteks:** Legacy task dari handover v85.

**Spec:**
- Test semua tombol Tambah/Edit/Hapus di Santri, Guru, Lembaga, Rapor, Keuangan, Bisyaroh, Tabungan, Hutang, dll
- Verify `cekHakAkses()` return `true` untuk super_admin di semua case
- Check role-based UI hide/show
- Test workflow lengkap user journey

### Bonus tasks kecil:

- **Fix filter tipe guru/pegawai di Bisyaroh** (BARU dari user di akhir sesi v.99):
  - Saat ini filter tipe ada 4 tombol (Semua / Ngaji / Sekolah / Keduanya) di form Bisyaroh — line ~3334 area
  - Function `setFilterBisyarohTipe(tipe, btn)` + `_filterBisyarohTipe` global var (line ~11645)
  - `initFormGaji()` filter `db_guru` by tipe_pegawai sebelum populate datalist (v.99 sudah datalist)
  - Bug yang user laporkan kemungkinan: filter belum re-trigger update datalist saat ditekan, atau hasil filter tidak match
  - **Investigasi:** test apakah klik tombol filter benar-benar update datalist guru
  - Catatan: filter Sekolah seharusnya cek juga apakah guru punya `lembaga_sekolah` field (bukan cuma tipe_pegawai); user pernah sampaikan: "jika guru tersebut tidak punya field guru sekolah maka namanya tidak ada di input bisyaroh guru sekolah"
- **Tgl khotam auto-fill verify**: function `autoFillTanggalKenaikan()` (line ~14795) — apakah masih work? Test dengan santri yang punya `riwayat_kenaikan`
- **Push notif (PN)** card di POS Santri — user salah paham di v.97, sudah di-revert (un-hide) di v.98. Kalau ternyata mau hide di kemudian hari, tinggal tambah `class="hidden"` di line ~3015

---

## TECHNICAL NOTES PENTING

### File Editing Strategy
- File `public/index.html` ~1.41 MB. **Edit tool sering truncate** file saat patch besar.
- **Best practice:** pakai `mcp__workspace__bash` + Python heredoc untuk patches >2 statements.
- Always verify after edit: `tail -3 index.html` harus end dengan `</html>`.
- Backup terakhir: `backups/index.v35.0526d.before-cleanrestore.bak.html` (untuk restore tail kalau truncated).

### Folder Path (untuk Cowork Bash)
- Host (Windows): `D:\Aplikasi Project\Portal MU\`
- Sandbox (Linux mount): `/sessions/<sid>/mnt/Portal MU/` — pakai bash dengan path ini
- Read/Write/Edit/Grep tools: pakai Windows path

### Kop Rapor — 4 tempat (v.90.0526)
1. **Rapor HTML print** — `generatePrintHTML` line ~15053. Font 14/18/12 px (baris 2 di v.91 jadi 22px)
2. **Rekap HTML print** — `_buildKopHTML` line ~9501. Font 14/18/12 px
3. **PDF native** — `tambahKopPDF` line ~9890. Font 11/14/9 pt
4. **PDF Qiraati** — `tambahKopPDFQiraati` line ~9972. Font 11/14/9 pt

### Cetak / Print Architecture
- **Semua cetak HTML** pakai `cetakHtmlSebagaiPDF(html, opts)` helper (v.83+) yang panggil `window.print()` di tab baru
- Untuk rapor: `cetakRaporPDF(listSantri)` → wrapper ke `generatePrintHTML(listSantri)` (v.92 sudah handle perKelas Diniyah)
- **User HARUS uncheck "Headers and footers"** di Chrome print dialog (otomatis muncul tip via Swal)
- jsPDF native (`tambahKopPDF`, `tambahKopPDFQiraati`) untuk PDF table data — embed via `doc.addImage(dataURL)`

### TTD Rapor Layout (v.94.0526)
- Page wrapper: `padding-bottom: 95mm` reserve area TTD
- TTD wrapper: `position: absolute; bottom: 15mm; left: 15mm; right: 15mm;`
- Urutan: **Guru Kelas (kiri) | Wali Santri (tengah) | Kepala (kanan)**
- Tanggal "Sidoarjo, [tgl cetak]" di kolom kanan, sejajar dengan label "Kepala"
- EKGQ di bawah nama (replace jabatan kepala)
- `getTandaTanganLembaga` return `ekgq: guru.ekgq || ''` (v.94 fix)

### Image Storage Strategy
- **Semua logo + BG + foto** → Firebase Storage URL (bukan base64 di Firestore)
- Folders: `bg_rapor/`, `app_logos/`, `app_bg/`, `ttd_guru/`, `lembaga_logos/`, `santri_foto/`, `guru_foto/`
- CORS rules sudah deploy: `gsutil cors set cors.json gs://portal-mambaul-ulum.firebasestorage.app`
- Pre-cache logos saat init: `_preCacheLogos()` → store dataURL di `window._imgUrlCache`
- jsPDF butuh dataURL (bukan URL Storage langsung) → pakai `_imgUrlCache[URL]` lookup

### Firestore Rules Update (v.98)
- `keuangan_buku_induk` allow delete: `sumber in ['manual', 'gaji', 'pos_santri', 'tabungan_santri', 'tabungan_guru', 'hutang']` (sebelumnya hanya 'manual')
- Setelah ubah rules: deploy dengan `firebase deploy --only firestore:rules`

### Helper Console Functions (DevTools F12)
- `_diagSettings()` — show tabel field sizes di settings/general doc
- `_cleanupSettings()` — hapus base64 lama dari settings/general (free 1MB doc limit)
- `_cleanupLembagaImages()` — hapus base64 lama dari db_lembaga.kop_logo

### State Management — Critical Pattern
- `_raporState` declared `let` di line ~14127 — **HARUS** assign ke `window._raporState` (v.89 fix)
- Inline handler `oninput="window._raporState.data['key'] = this.value;"` — kalau `_raporState` script-scoped only (let), tidak accessible via `window.` → silent TypeError
- Pattern aplikasi: kalau bikin state baru yang dipakai inline handler, **ALWAYS** `window.X = X;` setelah declare

### Versioning
- Setiap major change: bump APP_VERSION + SW_VERSION
- Format APP_VERSION: `v.NN.MMYY` (v.99.0526 = update 99, Mei 2026)
- Format SW_VERSION: `vNN-MMYY-<descriptor>`
- Update via Python (avoid Edit tool truncation)
- 4 lokasi APP_VERSION:
  1. `const APP_VERSION = 'v.NN.MMYY';` di line ~4511
  2. `id="app-version-login">v.NN.MMYY</p>` di line ~893
  3. `id="app-version-sidebar">v.NN.MMYY</p>` di line ~973
  4. SW_VERSION di `public/sw.js` line 8

### Deploy
```powershell
cd "D:\Aplikasi Project\Portal MU"
npm run deploy   # auto build Tailwind CSS + firebase deploy hosting
# Plus untuk rules update:
firebase deploy --only firestore:rules
firebase deploy --only storage   # untuk storage rules
# Atau gabung:
firebase deploy --only firestore:rules,hosting
```

---

## STRUKTUR FOLDER

```
D:\Aplikasi Project\Portal MU\
├── public/                          → deployed ke Firebase Hosting
│   ├── index.html                   → v.99.0526 (~1.41 MB single-file)
│   ├── styles.css                   → Tailwind compiled
│   ├── sw.js                        → Service Worker v84
│   ├── manifest.json                → orientation: "any" (v.94)
│   ├── firebase-messaging-sw.js
│   ├── exceljs.min.js
│   ├── bg-pesantren.jpg
│   ├── logo.png, icon-*.png, favicon-*.png, apple-touch-icon-*.png
│   └── .well-known/assetlinks.json
├── src/
│   └── input.css                    → Tailwind directives
├── functions/                       → Cloud Functions (tidak disentuh)
├── backups/                         → Backup files (v.30, v.35, dll)
├── tailwind.config.js
├── package.json                     → scripts: build:css, watch:css, deploy
├── firebase.json
├── firestore.rules                  → v.98 update allow delete BI
├── storage.rules                    → whitelist bg_rapor, ttd_guru, app_bg
├── cors.json                        → CORS Storage rules
├── HANDOVER-v85.md                  → handover sesi pertama
└── HANDOVER-v99.md                  → INI FILE (handover sesi kedua)
```

---

## RECOVERY KALAU FILE BROKEN

Kalau setelah patch besar, file truncated atau syntax error:

```bash
cd "/sessions/<session>/mnt/Portal MU"
python3 << 'EOF'
from pathlib import Path
curr = Path("public/index.html")
bak = Path("backups/index.v35.0526d.before-cleanrestore.bak.html")
ct = curr.read_text(encoding='utf-8')
bt = bak.read_text(encoding='utf-8')
marker = "<the last meaningful line>"  # find dengan grep
c_idx = ct.rfind(marker)
b_idx = bt.rfind(marker)
ct_clean = ct[:c_idx]
tail = bt[b_idx:]
curr.write_text(ct_clean + tail, encoding='utf-8')
assert ct_clean.rstrip().endswith("</html>")
EOF
```

---

## PROMPT INISIASI SESI BARU

Tinggal paste prompt ini ke chat baru (gabung semua task pending jadi 1 step):

---

> **PROMPT UNTUK SESI CHAT BARU:**
>
> Halo Claude, saya melanjutkan project **Portal Mambaul Ulum** dari sesi sebelumnya (v.99.0526).
>
> **Tolong baca file `D:\Aplikasi Project\Portal MU\HANDOVER-v99.md` dulu** untuk konteks lengkap project, list task pending, technical notes, dan strategi editing.
>
> Setelah baca handover, **JANGAN langsung kerja**. Beri saya ringkasan singkat (1-2 paragraf):
> 1. Status terakhir project (versi v.99.0526, fitur yang sudah confirm work)
> 2. Top task pending prioritas (berurutan dari paling siap)
> 3. Konfirmasi paham technical notes (terutama: file 1.41 MB jangan pakai Edit untuk patch besar, pakai Python heredoc; selalu verify `</html>` di tail; pattern `window._raporState = _raporState;`; firestore.rules update v.98)
>
> Lalu saya mau lanjut **task pending dijadikan 1 step** (gabung semua jadi 1 plan eksekusi besar):
> - **v.100**: UI Editor Schema Diniyah perKelas (tab per jenjang, edit mapel + KKM)
> - **v.101**: UI Editor Schema Qiraati custom per-lembaga (Pra PTPT, PTPT, P3H)
> - **v.102**: Refactor Absensi Lembaga (harian → bulanan + import Excel)
> - **v.103+**: Audit CRUD Super Admin semua fitur
> - bonus: Fix filter tipe guru/pegawai di Bisyaroh (filter sekolah harus cek lembaga_sekolah field, bukan cuma tipe_pegawai)
> - bonus: Tgl khotam auto-fill verify
>
> Diskusi dulu plan eksekusi (urutan, breakdown, estimate calls), saya approve, baru mulai kerja.
>
> Catatan: gunakan Bahasa Indonesia ringkas, hindari Edit tool untuk patches besar (pakai Python heredoc via bash), pastikan file end dengan `</html>` setelah setiap patch, **TIDAK PAKAI EMOJI** di output kode/UI.

---

**Bismillah, semoga next session lancar.**
