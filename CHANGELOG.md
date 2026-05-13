# Changelog

Semua perubahan penting Portal Mambaul Ulum tercatat di sini.

Format: [Keep a Changelog](https://keepachangelog.com/id/1.1.0/)
Versioning: `v.{nomor-urut}.{MMDDtahunmu}` (mis: `v.108.0527`)

---

## [Unreleased]

### Planned
- Capacitor Android first build + sideload APK
- Capacitor iOS setup
- Tauri Desktop scaffold
- Pre-commit hooks (husky + lint-staged)
- Initial unit tests (vitest)

---

## [v.108.0527] — 2026-05-27 — Clean Restore

### Restored
- Baseline `public/index.html` restored dari `backup v.107/` setelah recovery dari Firebase Hosting Releases
- File v.24.0526 (broken) di-backup ke `backups/v24-broken-pre-restore/`

### Added
- `README.md` proper dengan Quick Start, struktur project, deployment guide, security notes
- `CHANGELOG.md` (this file)
- `docs/archive/` untuk dokumentasi handover lama

### Changed
- `SW_VERSION` → `v201-0527-v108-clean-restore`
- Project structure cleanup:
  - 9 file dokumentasi lama (HANDOVER, AUDIT, WAKE-UP, PROMPT-NEXT-CHAT, TWA-MIGRATION-GUIDE) dipindah ke `docs/archive/`
  - `portal-mu-v2/` rename ke `_archive-portal-mu-v2/` (preserved Vue 3 attempt)
  - `files/` (duplicate v.30) pindah ke `backups/old-files-v30/`

### Removed
- `.backups-corrupt/` (artifact corrupt v.18)
- `cloud-functions-index.js` (duplicate dari `functions/`)
- `tailwind.config.reference.js` (duplicate config)
- `Al Manshur Project/` (empty folder, unknown origin)
- `_tmp_*` files (artifacts dari sesi gagal)

---

## [v.107.1.0526] — 2026-05-12 — Final Patch Pre-TWA

### Added
- ACF (Advanced Custom Fields) Lite untuk Santri/Guru/Lembaga
- Riwayat Kenaikan submenu di Master Data Mutasi
- Kartu Kenaikan visual + cetak PDF (PTPT 6 kelas × 5 juz + ceremonial)
- KOP Kartu Kenaikan per Lembaga (PTPT/TPQ/Pra PTPT/P3H)
- Editor schema kartu kenaikan per lembaga
- Eksport PDF Lembaga + Riwayat Kenaikan
- ACF di Excel/CSV export santri + guru
- `eksporCSVSantri` function baru (sebelumnya tombol broken)
- Validasi unique khotam_ke per level santri Pra PTPT
- Backup schema kartu warning saat ID berubah

### Fixed
- Bug ACF tidak muncul saat edit santri
- Logo bg hitam di semua kop (rapor, rekap, kartu)
- Search input padding overlap dengan icon
- Dark mode topbar contrast (background, text, placeholder, icon)
- Kartu PDF margin 1.5cm A4 + 1 kelas per row
- Text riwayat: "Naik" vs "Dipindah" kondisional (sebelumnya "Naik/Dipindah" hardcoded)
- File truncation issue saat patch besar (recovered 2x)

### Changed
- Tab Pengaturan Kenaikan → card per Lembaga
- Field ACF dengan opsi Required (wajib isi)
- Kelola Field UI: counter, nomor urut, tombol reorder up/down

---

## [v.107.0526] — 2026-05-12 — Pra PTPT perLevel Schema

### Added
- `DEFAULT_SCHEMA_PRA_PTPT` (perLevel: 5 level × 23 khotam = 60 target)
- Field "Khotam ke?" di modal mutasi (dropdown I-XI)
- `simpanMutasi` simpan ke `santri.riwayat_kenaikan` (structured)
- Render form rapor + cetak rapor perLevel
- Editor schema perLevel (tab per level + nested khotam)
- Helper `_rekapPraPTPTBulanan(santriId, periode)`
- Auto-fill Tgl Khotam di rapor dari riwayat_kenaikan
- Auto-force perLevel di `getSchemaLembaga` untuk Pra PTPT

### Fixed
- Filter santri di Absen Bulanan validate kelas vs lembaga.kelas (santri kelas KPI tidak masuk Pra PTPT)
- autoFillTanggalKhotam legacy fallback (parse santri.riwayat pre-v.103)
- Kotak Catatan rapor overweight (padding-bottom .page 95mm → 65mm)

---

## [v.106.0526] — 2026-05-12 — ACF Lite + Riwayat Kenaikan

### Added
- Text riwayat: "Naik" (lembaga sama) vs "Dipindah" (lembaga beda)
- ACF Lite helper system (`_renderCustomFieldsForm`, `_collectCustomFieldsValues`)
- ACF section di form Santri
- Submenu Riwayat Kenaikan dengan list santri Qiraati + tombol Lihat Kartu
- Schema kartu kenaikan default untuk PTPT/TPQ/Pra PTPT/P3H
- Modal Kartu Kenaikan visual (matrix kelas × items + ceremonial)
- Modal Editor Schema Kartu

### Fixed
- File truncation saat batch patch besar (recovered via backup pattern)

---

## [v.105.0526] — 2026-05-11 — TWA Ready + Performance

### Added
- `TWA-MIGRATION-GUIDE.md` (panduan 6 fase: keystore → assetlinks → PWABuilder → sideload → Play Store)
- Lazy-load library berat (jsPDF, ExcelJS, html2canvas) dengan `fetchpriority="low"`
- `_ensureLib(name, url)` helper untuk dynamic script loading
- Defer `_preCacheLogos` via `requestIdleCallback` (improve LCP)
- Manifest.json optimized untuk PWA + TWA

### Performance
- LCP target turun dari 42s → ~10-15s
- File index.html optimized untuk first paint

---

## [v.104.0526] — 2026-05-11 — Audit + Bonus Fixes

### Added
- `AUDIT-CRUD-v104.md` (checklist hak akses Super Admin per modul)
- Backward compat `autoFillTanggalKenaikan` untuk semua lembaga (TPQ sections, Diniyah perKelas, Pra PTPT perLevel)

### Fixed
- Filter Bisyaroh "Sekolah" cek `lembaga_sekolah` non-empty (sebelumnya hanya `tipe_pegawai`)

---

## [v.103.0526] — 2026-05-11 — Pra PTPT Schema (initial)

### Added
- Schema Pra PTPT dengan struktur perLevel (initial implementation)
- Modal Kenaikan field "Khotam ke?"
- Editor schema perLevel + cetak rapor perLevel

---

## [v.102.0526] — 2026-05-11 — Refactor Absensi Bulanan

### Changed
- Absensi santri lembaga: HARIAN → BULANAN
- Collection baru: `absensi_santri_sekolah_bulanan` (auto-aggregate per santri per bulan)
- Submenu "Absen Bulanan" di semua lembaga Qiraati + Formal

### Deprecated
- Collection `absensi_santri_sekolah` (data harian) — replace dengan bulanan
- Helper `_hapusAbsenHarianLama()` di console untuk cleanup data lama

### Added
- Excel template export + import untuk absen bulanan
- Auto-fill rapor.absensi dari aggregate bulanan saat buka rapor

---

## [v.101.0526] — 2026-05-11 — Editor Schema Qiraati

### Added
- Editor schema sections-based untuk Pra PTPT / PTPT / P3H
- Tombol "Copy from TPQ" untuk quick start schema
- Fix kop rapor whitespace (conditional render baris kosong)
- Compact rapor Qiraati TPQ (cell padding 4-5px → 3px)

---

## [v.100.0526] — 2026-05-11 — Editor Schema Diniyah perKelas

### Added
- Editor schema Diniyah dengan struktur `perKelas` (14 jenjang × 8 mapel × KKM)
- UI tab per jenjang TK A-XII
- Tambah/Hapus jenjang + mapel via UI

### Fixed
- Critical: `window._schemaEdit` exposure (inline handler `onchange` silent fail tanpa ini)

---

## Versi Sebelumnya (v.85 → v.99)

Riwayat detail lihat `docs/archive/HANDOVER-v99.md`.

Highlights:
- v.99: Quick filter Bisyaroh datalist + strip 134 emoji
- v.98: Firestore rules update (allow delete BI untuk semua sumber)
- v.97: Tabungan santri quick input
- v.95: Hapus tab Tabungan Guru + rename GAJI → BISYAROH, TAGIHAN → PEMBAYARAN
- v.94: TTD layout absolute (Guru kiri / Wali tengah / Kepala kanan)
- v.92: Schema Diniyah perKelas baru (14 jenjang × 8 mapel × KKM 80)
- v.89: Critical hotfix `window._raporState = _raporState`
- v.85: Initial baseline tracked dengan format `v.{NN}.{MMYY}`

---

[Unreleased]: https://github.com/USER/REPO/compare/v.108.0527...HEAD
[v.108.0527]: https://github.com/USER/REPO/releases/tag/v.108.0527
