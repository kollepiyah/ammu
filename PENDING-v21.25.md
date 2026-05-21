# PENDING v.21.25+ — Status update 21 Mei 2026 sore

**Versi target:** v.21.25/26/27 (multi-batch)
**Scope:** Bug fixes + feature completion + source recovery
**Status:** Sebagian DONE, sebagian masih PENDING (lihat status per issue)

---

## STATUS RINGKAS (21 Mei 2026)

### ✅ DONE (build & deployed)
- v.21.25 batch 1-12 — initial fix
- v.21.26 — Hapus duplikat Google + kontras badge ProfilGuru
- v.21.27 — Konsolidasi /lembaga → /master-data, PSB admin access fix (isAdmin computed)
- vue-app/ snapshot di git (commit pre-recovery)

### ❌ MASIH PENDING (belum ada perubahan / belum ke-build)

#### PSB Public Form (ammuonline-psb.web.app)
**Status:** Belum sesuai spec kyai.
- Sekarang masih flow LAMA: Lembaga Tujuan DULU → Identitas Santri
- Target flow BARU:
  1. Step 1: Tipe Santri (Ma'had / Non-Mukim PP / Fullday)
  2. Step 2: Lembaga Qiraati (required) + Lembaga Sekolah (optional, hidden untuk TPQ Pagi)
  3. Step 3: Syarat & Ketentuan + Info Pembayaran (ikon mata → popup gambar/PDF)
  4. Step 4: Identitas Santri + ACF
- Hanya filter Qiraati/Sekolah Formal yang sudah masuk (v.21.26)

#### Jabatan per-Lembaga di GuruForm
**Status:** Belum sesuai. Jabatan yang kyai edit di Kelola Lembaga belum ke-pakai di field dropdown Edit Guru. Perlu fix `useGuruForm.js` jabatanOptionsFiltered baca dari `master/lembaga.list[i].jabatan`.

#### View yang masih STUB "dalam pemeliharaan" (perlu recovery)
**Priority 1 (urgent — dipakai harian):**
- useAbsensiSantri.js (composable stub) + AbsensiSantriView.vue
- NaikKelasView.vue (Kenaikan/Mutasi)
- RaporView.vue (rapor semester) + RekapPrestasiView.vue + RekapDiniyahView.vue

**Priority 2 (audit keuangan):**
- TabunganView, TagihanView, BisyarohView
- PembayaranView, PosSantriView
- PengaturanKeuanganView, LaporanKeuanganView, HutangPiutangView

**Priority 3 (nice-to-have):**
- PpdbFormView (admin route — psb-form public di sub-app), PpdbDetailView
- KegiatanPesantrenView, KalenderKegiatanView
- PostsView, KritikSaranView, StatistikView
- CapaianPrestasiView, PersonalView
- ProfilSantri, ProfilPengaturanSaya

**Stub bersihkan (tidak prioritas):**
- PengaturanView, FieldSchemaView, KelasView, MasterFormBridgeView
- AbsensiGuruView, InputBulananView

#### Cetak PDF (banyak yang blank)
- Migrate ke jsPDF + jspdf-autotable + Times New Roman (sudah dibahas kyai)
- Bundle helper `utils/pdfBuilder.js` (sudah ada dari v.21.25)
- Apply ke RaporView (priority), NaikKelasView, PsbDetailView, SlipBisyaroh

#### Lain-lain
- Rekap Absensi Santri nama "(unknown)" — composable stub belum baca santri real
- Filter Kenaikan TPQ shift-aware — NaikKelasView stub
- TPQ sub-lembaga visibility di Master Data (kyai konfirm sudah OK setelah konsolidasi route)
- AAB rebuild untuk Play Store (defer akhir)

---

## RECOVERY STRATEGY (mulai 21 Mei sore)

**Mode:** 3 file per batch — careful write, build verify, git commit setiap file sukses.

**Anti-truncation:**
- Tulis chunk kecil <500 lines per Edit call
- Pakai Python /tmp + shutil.copy untuk write besar
- Strip NULL byte setelah tiap write
- Tail check `tail -c 5 file | od -c` setelah write

---

## 1. Google Connect Modal (di Pengaturan Profil)

**Masalah:** Tombol "Tautkan Akun Google" di Pengaturan Profil tidak ada reaksi saat diklik.

**Investigasi:**
- Cek `ProfilPengaturanSaya.vue` — apakah ada modal/handler "Connect Google Account"
- Modal yang muncul di screenshot kyai (Connect Google Account dengan tombol "Connect dengan Google") kemungkinan dari component lain, BUKAN section saya di ProfilGuru
- Cari semua referensi "Tautkan" / "Connect Google" / "linkGoogleAccount" di Vue codebase

**Fix:**
- Wire handler `handleLinkGoogle` dari `services/auth.js linkGoogleAccount()`
- Tampilkan loading saat proses
- Handle error: popup-closed-by-user (silent), conflict (toast warning), success (toast + update local state)

---

## 2. Sub-menu Master Data Navigation

**Masalah:** Setiap klik card lembaga di Master Data → URL pindah ke `/lembaga/[nama]` → tidak ada cara kembali ke Master Data tab Lembaga selain klik menu Master Data lagi di sidebar.

**Fix:**
- LembagaDetailView header: tambah tombol "Kembali ke Master Data" yang appear kalau `route.query.from === 'master-data'`
- LembagaView card link: tambah `?from=master-data` query kalau navigate dari Master Data
- LembagaDetailView: detect `route.query.from` dan tambah breadcrumb yang sesuai
- Same pattern untuk semua sub-tab di Master Data (TP, Guru, Santri, Audit) — kalau klik item navigasi ke detail page

---

## 3. Master Data Edit Guru — Tidak Sync ke Database

**Masalah:** Setelah edit guru di Master Data (khususnya field lembaga sekolah) → klik Simpan → kembali ke list → perubahan tidak tampil.

**Investigasi:**
- Cek `useGuruForm.save()` — apakah lembaga_sekolah benar-benar disimpan ke Firestore
- Verify subscribe useGuru pakai onSnapshot live update
- Cek apakah ada bug di setDoc(merge:true) yang menghapus field

**Fix:**
- Force setDoc tanpa merge untuk field yang explicit dipilih (kalau perlu)
- Tambah logging di save: console.log payload sebelum setDoc
- Atau pakai updateDoc untuk partial field

---

## 4. Cetak/Ekspor PDF — Hasil Blank

**Masalah:** Semua tombol Cetak PDF / Ekspor PDF → file kosong / blank.

**Lokasi yang affected:**
- SantriView Cetak PDF
- GuruView Cetak PDF (window.print)
- RaporView Cetak PDF
- AbsensiGuru Cetak PDF
- PosSantri Cetak PDF
- PSB Cetak PDF
- BukuInduk PDF
- Slip Bisyaroh PDF

**Strategy (LOCKED — kyai spec):**

Migrasi seluruh PDF dari `html2canvas + jsPDF` (yang bermasalah blank) → **`jsPDF` + `jspdf-autotable`** (code-based, vector text, lebih reliable).

**Font policy (LOCKED):**
- **Rapor** (RaporView Qiraati + Diniyah) → `times` (Times New Roman)
- **PDF umum lainnya** (santri, guru, slip bisyaroh, buku induk, laporan keuangan, PSB, daftar, dll) → `helvetica` (default jsPDF)
- **Print thermal pembayaran** (PosSantri/Pembayaran/Tabungan struk) → `courier` (monospace, thermal-printer friendly)

**Implementasi:**
- Buat `utils/pdfBuilder.js` helper umum dengan:
  - `createPdf({ kind: 'rapor' | 'umum' | 'thermal', orientation, kop })` → return jsPDF instance dengan font default sesuai kind
  - `drawKopLetterhead(doc, kop)` — header KOP standard
  - `drawSignature(doc, namaKepala, jabatan)` — footer ttd
  - `drawTable(doc, opts)` — wrapper autoTable dengan style default sesuai font
- CDN load: `jspdf` + `jspdf-autotable` dari `cdnjs.cloudflare.com` (sudah pattern yang dipakai untuk exceljs)
- Refactor semua view PDF pakai helper baru

**Fix Excel Export juga (Issue #5):**
- Copy `public/exceljs.min.js` ke `public/vue/exceljs.min.js` ATAU
- Update `useExcel.js` load langsung dari CDN cdnjs tanpa local fallback

---

## 5. Ekspor Excel — exceljs.min.js MIME error

**Masalah:**
```
Refused to execute script from 'https://ammuonline.web.app/exceljs.min.js' because its MIME type ('text/html') is not executable
[useExcel] local load failed, fallback to CDN: Script error
```

**Root cause:** `/exceljs.min.js` tidak ada di `public/vue/` (atau di-rewrite ke index.html oleh Firebase Hosting rewrite rule).

**Fix:**
- Copy `public/exceljs.min.js` ke `public/vue/exceljs.min.js`
- Atau update useExcel.js untuk load langsung dari CDN cdnjs.cloudflare.com tanpa local fallback
- Verify firebase.json rewrites tidak nge-catch path `/exceljs.min.js`

---

## 6. Kenaikan / Mutasi (NaikKelas)

**Masalah:**
1. Santri TPQ (Pagi/Sore/Pra PTPT) tidak terbaca datanya
2. Klik "Proses Naik" → tanggal tidak auto-input di kartu
3. Riwayat kenaikan tidak terbaca
4. PTPT naik Juz → cek apakah catatan tampil di dashboard santri

**Fix:**
- `NaikKelasView.vue`: filter santri include TPQ shift varian (TPQ Pagi/Sore + Pra PTPT). Cek subscribeColl + filter logic
- Saat klik "Proses Naik": set `tgl_naik = new Date().toISOString().slice(0,10)` ke `santri.riwayat` array
- Riwayat: pastikan baca `santri.riwayat` array bukan koleksi terpisah
- Dashboard santri: tampilkan riwayat terakhir + catatan kenaikan di section terpisah

---

## 7. Rekap Prestasi

**Masalah:**
1. Santri TPQ (PAGI/SORE/PRA PTPT) tidak terbaca
2. Filter Rekap Qiraati harus hanya lembaga Qiraati (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH)
3. Filter Rekap Diniyah harus hanya lembaga Sekolah (SDI/PKBM)
4. Santri sekolah TK tidak punya pelajaran Diniyah (skip TK)
5. Pelajaran Diniyah hanya SDI/PKBM, beda per jenjang kelas (editable manual)

**Fix:**
- `RekapPrestasiView.vue`: filter santri include TPQ varian
- `RekapDiniyahView.vue`: filter lembaga IN ['SDI', 'PKBM'] only (exclude TK)
- Master Data Lembaga SDI/PKBM Edit → Rapor Diniyah Schema: editable mapel per kelas (1-6 SDI, 7-12 PKBM)
- Defer mapel custom default — kyai akan setup manual via UI

---

## 8. Rapor Qiraati

**Masalah:**
1. Santri TPQ (PAGI/SORE/PRA PTPT) tidak terbaca
2. Tgl Lulus/Naik Kelas/Jilid/Juz harus auto-input dari `santri.riwayat`
3. Rapor sifatnya KUMULATIF — santri PTPT kelas 2 sekarang tampil tabel **kelas 2 saja** (SALAH). Harusnya tampil **tabel Kelas 1 + Kelas 2** (akumulasi semua kelas yang sudah dilewati). Semakin tinggi kelas santri, semakin banyak kolom kelas yang ditampilkan di rapor.
4. Absensi auto-rekap dari absensi bulanan (bisa edit manual)
5. Nilai rapor diisi manual

**Fix:**
- `RaporView.vue`: include TPQ shift varian + Pra PTPT
- Auto-fill tanggal: baca `s.riwayat[].tgl_naik` untuk kelas current
- Filter tabel rapor: hanya tampilkan row kelas current santri (bukan semua)
- Section Absensi: ambil dari absensi_bulanan + jumlahkan periode semester
- Section Nilai: input field per mapel/kategori

---

## 9. Rapor Diniyah

**Masalah:**
1. Hanya untuk santri SDI/PKBM
2. Mapel beda per jenjang kelas, editable manual

**Fix:**
- Cek apakah rapor diniyah tab ada di RaporView atau separate view
- Filter santri IN SDI/PKBM
- Schema mapel: per kelas (1-6 SDI, 7-12 PKBM) editable via Master Lembaga → Schema Diniyah

---

## 10. Absensi Santri

**Masalah:**
1. Hanya untuk santri non-mukim (PP/Fullday) — exclude Ma'had
2. Auto rekap ke rapor (jumlah selama 1 semester) + tombol "Generate ke Rapor"
3. Absen bulanan saja (bukan harian)
4. Semua santri tidak terbaca di menu absen
5. Tambah menu Impor/Ekspor Excel & PDF

**Fix:**
- `AbsensiSantriView.vue`:
  - Filter santri: `is_mukim === false` (PP or Fullday)
  - Subscribe absensi_bulanan collection (pastikan nama tepat)
  - Mode bulanan: per santri × hari dalam bulan = grid checkbox/dropdown (H/I/S/A)
  - Tombol "Generate ke Rapor": kumpulkan rekap per semester → simpan ke rapor field
  - Tombol Impor Excel: parse + bulk upsert
  - Tombol Ekspor Excel + PDF

---

## 11. Kegiatan Pesantren — Sudah OK (Ma'had only)

**Skip — tidak ada perubahan.**

---

## 12. PSB (Penerimaan Santri Baru)

**Masalah:**
1. ACF + CRUD PSB pindah ke halaman PSB admin (sekarang di Pengaturan per-Lembaga)
2. Upload syarat & ketentuan + info pembayaran ke halaman PSB admin
3. Form PSB public: tampilkan TIPE SANTRI dulu (Ma'had / Non-Mukim / Fullday) → baru field Lembaga
4. Filter lembaga: 2 dropdown (Qiraati + Sekolah). Pilih TPQ Pagi → skip lembaga sekolah
5. Field pilih lembaga sekarang tampilkan SEMUA (termasuk Yayasan) → fix sesuai poin 3-4
6. Setelah pilih tipe santri + lembaga → samping fieldnya muncul label "Syarat & Ketentuan" + "Informasi Pembayaran" dengan ikon mata 👁️ → klik = popup gambar/PDF yang di-upload di PSB admin

**Fix:**
- `PsbAdminView.vue` (atau buat baru kalau belum ada):
  - Section ACF (custom fields per lembaga + per tipe santri)
  - Section Upload Syarat (PDF/image per lembaga + tipe)
  - Section Upload Info Pembayaran (PDF/image per lembaga + tipe)
- `PsbFormView.vue` (public form):
  - Step 1: pilih Tipe Santri (Ma'had / Non-Mukim PP / Fullday)
  - Step 2a: pilih Lembaga Qiraati (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH) — visible always
  - Step 2b: pilih Lembaga Sekolah (TK A/B, SDI, PKBM) — visible kalau bukan TPQ Pagi only
  - Step 3: auto-detect Syarat + Info Pembayaran sesuai lembaga + tipe → tampil ikon mata + label → popup
  - Step 4: ACF fields sesuai lembaga + tipe
- Hapus ACF/Upload UI dari `LembagaDetailView.vue` Pengaturan section

---

## EXECUTION ORDER (Autonomous)

1. **Quick fixes (low risk):**
   - exceljs.min.js copy (#5)
   - Google connect modal wire (#1)
   - Master Data edit guru sync (#3)

2. **PDF/Excel infrastructure:**
   - Cetak PDF blank investigation + fix (#4)

3. **Sub-menu navigation:**
   - Master Data ↔ Detail page back navigation (#2)

4. **Filter & visibility:**
   - TPQ shift varian visibility di Kenaikan/Rekap/Rapor/Absensi (#6, #7, #8, #10)
   - Filter lembaga per modul (Qiraati vs Diniyah)
   - Absensi santri non-mukim only

5. **Schema customization:**
   - Mapel Diniyah per kelas editable (#7, #9)

6. **Auto-fill rapor:**
   - Tgl auto dari riwayat (#6, #8)
   - Absensi auto-rekap (#10 + #8)
   - Tabel rapor hanya kelas current (#8)

7. **PSB refactor (largest):**
   - Move ACF + Upload ke PsbAdminView (#12.1-2)
   - Refactor PsbFormView flow (#12.3-6)

8. **Build & sync to public/vue**

---

## NOTE PENTING

- **Windows mount truncation issue** — pakai Python script + /tmp/ + shutil.copy untuk semua write besar
- **NULL byte injection** — strip dengan `d.replace(b'\\x00', b'')` setiap kali file ke-truncate
- **Build sukses** = entry baru `index-*.js` di public/vue/index.html
- **Setelah selesai semua**: lapor ke kyai dengan summary + ask untuk audit fitur keuangan

---

## SETELAH BATCH INI

Lanjut **audit fitur keuangan** (kyai req):
- POS Santri
- Tabungan
- Tagihan
- Pembayaran
- Bisyaroh
- Hutang Piutang
- Laporan Keuangan

— end PENDING.md —
