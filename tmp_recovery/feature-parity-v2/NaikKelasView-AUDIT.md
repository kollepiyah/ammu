# Audit NaikKelasView — Vue vs Legacy

Tanggal: 2026-05-26
Vue source: `vue-app/src/views/NaikKelasView.vue` (1842 baris, 74 KB)
Legacy source: `public/index.html` line 7180-7460 (UI), 23843-24603 (JS Kartu Kenaikan + Editor + KOP), 27198-27450 (mutasi/promote form)

---

## Ringkasan Fitur

| # | Fitur Legacy | Status di Vue Current | Action |
|---|---|---|---|
| 1 | Tab system: Form / Riwayat / Pengaturan | OK ada | — |
| 2 | Filter Lembaga (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH) di tab Form | OK ada (shift-aware lebih baik dari legacy) | — |
| 3 | Search santri di list Form | OK ada | — |
| 4 | Role santri: lihat kartu sendiri | OK ada | — |
| 5 | Role guru: scope ke santri-nya saja | OK ada | — |
| 6 | Modal Kartu Kenaikan — Matrix Kelas x Items, date input | OK ada | — |
| 7 | Modal Kartu — Ceremonial date input per kelas | OK ada | — |
| 8 | Modal Kartu — Catatan & Rekomendasi per kelas (entries array) | OK ada (lebih bagus dari legacy yang flat `catatan`/`rekomendasi` string) | — |
| 9 | Modal Kartu — KOP preview di top (judul/subjudul/alamat) | OK ada | — |
| 10 | Schema Editor: itemHeader + kelasList + items, ceremonial checkbox | OK ada | — |
| 11 | Schema Editor: Reset Default | OK ada | — |
| 12 | KOP Editor per lembaga (judul/subjudul/alamat) | OK ada | — |
| 13 | Save schema dual-write (settings/general + settings/web) | OK ada | — |
| 14 | Modal Form Kenaikan (simple promote): kelas_sekolah, lembaga, kelas, guru, juz (PTPT), khotam_ke (Pra PTPT) | OK ada | — |
| 15 | Riwayat tab: filter lembaga + search + expand catatan + lihat kartu | OK ada | — |
| 16 | Excel export Riwayat (per-lembaga, semua santri × tanggal terisi) | OK ada | — |
| 17 | **PDF export Riwayat (Cetak PDF Daftar)** — table No/Nama/Kelas/Riwayat | MISSING | **PORTED** via buildListPdf |
| 18 | **PDF Cetak Kartu Kenaikan per-santri** — A4 portrait, KOP table + logo kiri+kanan + identitas dotted + matrix auto-fit | PARTIAL (cuma window.print di-screen) | **PORTED** via buildListPdf custom layout |
| 19 | **Dual riwayat field**: `riwayat` (text) + `riwayat_kenaikan` (structured) | PARTIAL (Vue cuma write `riwayat` dengan struktur sendiri) | **PORTED** — Vue sekarang juga maintain `riwayat_kenaikan` |
| 20 | **Auto-catatan transisi penting (milestone)**: IMTAS, Khotam bil Nazhor, Khotam 30 juz bil Ghoib | MISSING | **PORTED** — append ke riwayat saat trigger transition match |
| 21 | **Duplicate khotam check (Pra PTPT)** — warn kalau khotam_ke sudah ada di level itu | MISSING | **PORTED** — confirm() prompt jika ada existing match |
| 22 | "Cetak PDF Daftar Riwayat" button | MISSING | **PORTED** ke tab Riwayat |

---

## Fitur yang di-Port

### 1. PDF Cetak Daftar Riwayat (legacy `eksporPDFRiwayatKenaikan`)
- Lokasi UI: tombol baru "PDF" di tab Riwayat, sebelah tombol Excel
- Function: `exportRiwayatPdf()` — pakai `buildListPdf` dari `@/utils/pdfBuilder`
- Kolom: No, Nama Santri, Kelas Sekarang, Riwayat Kenaikan (ringkas tanggal → ke_lembaga ke_kelas + Khotam/Juz)
- Source: `riwayat_kenaikan` array (kalau ada) atau fallback ke `kartu_kenaikan` block dengan format tanggal:item
- Reason: Legacy punya button "Cetak PDF Daftar" tapi Vue cuma Excel — kyai sering perlu cetak hard copy untuk arsip lembaga

### 2. PDF Cetak Kartu Kenaikan per-santri (legacy `cetakKartuKenaikan`)
- Lokasi UI: tombol "Ekspor PDF" baru di footer modal Kartu, di samping Cetak (window.print)
- Function: `eksporKartuPdf()` — pakai `buildListPdf` dengan kop + custom matrix flow (treat tiap kelas sebagai mini-table dalam single PDF)
- KOP: dari `getKopKartuLembaga(lembaga, settings)` + settings.kop_logo / kopLine1-5 sebagai fallback
- Reason: Vue `window.print()` jelek kalau dipanggil dari modal (browser print viewport + sidebar visible). Legacy generate dedicated A4 layout. Vue 3 version: pakai `buildListPdf` (jsPDF) — sama dengan pattern di GuruView/SantriView.

### 3. Dual riwayat field + auto-catatan milestone
- Function `saveFormKenaikan()` di-update untuk:
  - Tetap append `riwayat` text array (legacy compat)
  - Append `riwayat_kenaikan` structured object `{ tanggal, tanggal_display, dari_lembaga, dari_kelas, ke_lembaga, ke_kelas, khotam_ke, juz }` — dipakai PDF/Excel export
  - Detect 3 transisi milestone & inject text catatan auto:
    - Persiapan Khotaman → Pra PTPT Level 1 → "Telah LULUS IMTAS"
    - Pra PTPT Level 5 → PTPT Kelas 1 → "Telah Khotam Al-Qur'an bil Nazhor 60x"
    - PTPT kelas terakhir → bukan PTPT → "Alhamdulillah, ananda X telah khotam 30 juz bil Ghoib"

### 4. Duplicate Khotam Confirm (Pra PTPT)
- Sebelum save, kalau lembaga = Pra PTPT dan khotam_ke sudah ada di riwayat_kenaikan untuk level yang sama → `confirm()` prompt "Santri sudah punya entry Khotam X di level Y. Tetap simpan?"

---

## Tidak di-Port (Sengaja)

- **`html2canvas + jsPDF` srcdoc iframe trick** (legacy `_eksporCetakSebagaiPDF`) → Vue pakai jsPDF native via `buildListPdf` lebih clean, tidak perlu intercept `window.open`.
- **Hardcoded P3H label** → Vue sudah ikut convention baru pakai "PPPH" (sesuai spec kyai 25 Mei).
- **Editor schema "items via comma split"** (legacy bug-prone — re-generate ID per save) → Vue sudah pakai per-item input proper.

---

## Risk Catatan

1. **Schema kartu_kenaikan field PPPH vs P3H** — Vue masih konsisten dengan canonical "PPPH" tapi data lama di Firestore mungkin masih pakai key "P3H". Filter di Vue sudah handle dual lookup di `filteredFormSantri` dan `riwayatList`.

2. **`riwayat_kenaikan` migration** — Santri lama yang dimutasi via Vue (sebelum patch ini) hanya punya `riwayat` text. PDF export fallback ke `kartu_kenaikan` data → safe.

3. **buildListPdf table-per-kelas** — Tidak straightforward untuk matrix kartu kenaikan karena `buildListPdf` cuma single table. Solusi: untuk kartu per-santri, generate single-row table per kelas dengan kolom dinamis = items[].label, lalu append tabel berikutnya via callback. Implementation: build rows untuk tiap kelas + concat di kolom dynamic, atau pakai multiple `buildListPdf` calls per kelas → trade-off accepted (file = 1 page per kelas, A4 portrait, more pages but more readable).

4. **Print fallback** — `printKartu()` (window.print) tetap dipertahankan untuk kompatibilitas kalau user mau langsung print via browser; "Ekspor PDF" jadi tombol baru untuk download file.

5. **PDF render performance** — `buildListPdf` synchronous untuk small lists (<500 santri). Riwayat tab biasanya filter per-lembaga sehingga maksimal ~300 santri → aman.
