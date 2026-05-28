# Audit Port-In: RekapPrestasiView.vue

Tanggal: 26 Mei 2026
Source: `public/index.html` (legacy) → `vue-app/src/views/RekapPrestasiView.vue` (target di Vue 3 + Pinia + Firebase v9)

---

## 1. Baseline Vue current (sebelum port)

File baseline 7.8 KB. Hanya berisi:

- Header + sub-info santri Qiraati count
- 3 filter sederhana (lembaga / kelas / search)
- Stats badges (total kenaikan, santri aktif naik, avg naik, jumlah santri)
- List card santri (nama + lembaga + kelas + badge prestasi_awal/akhir/total + count kenaikan)
- Expand riwayat kenaikan per santri

Inti baseline = read-only viewer riwayat kenaikan. TIDAK ada input bulanan, TIDAK ada export, TIDAK ada ranking, TIDAK ada cetak.

---

## 2. Section legacy yang ditemukan

Keyword `rekap prestasi` / `prestasi_total` / `prestasi_awal` / `prestasi_akhir` di `public/index.html`:

| Lokasi (line) | Fungsi / Section |
|---|---|
| 7663-7701 | Landing 2-card (Qiraati vs Diniyah) |
| 7775-7927 | `#input-bulanan` page (tabel editable + tombol Cetak/Excel/PDF/Simpan + KOP rekap) |
| 7703-7773 | `#rekap-diniyah` page (schema bebas per lembaga) |
| 18831-18941 | `renderStatistikAdmin` (statistik prestasi per lembaga + Top 5 santri) |
| 18944-19068 | `renderStatistikGuru` (Top 5 santri kelas guru + thresholds PTPT) |
| 27807-27963 | `renderTabelBulanan` (build tbody bulanan + group row by lembaga/kelas/guru) |
| 27966-27990 | `getKelasWarnaPTPT` + `rekap()` auto-compute akhir-awal |
| 27992-28026 | `simpanRekap` (batch updateDoc santri) |
| 28084-28103 | `cetakHalamanAsli` (HTML print clone + KOP) |
| 28105-28245 | `eksporPDFSesuaiFormat` (jsPDF + autoTable + KOP) |
| 28246-28343 | `eksporExcelSesuaiFormat` (XLSX + exportToExcelStyled) |

Schema editor Diniyah (line 7167+ tab Master Data) **out of scope** — itu admin-only schema, beda menu (`/rekap-diniyah`). Vue parity sekarang fokus ke Qiraati saja.

---

## 3. Fitur MISSING di Vue baseline → ter-port

| # | Fitur Legacy | Port di Vue v2 | Catatan |
|---|---|---|---|
| 1 | Pemilih Bulan + Tahun (current period) | `bulan` / `tahun` ref + `<select>` | Default current month/year |
| 2 | Editable input table Awal/Akhir/Total | Mode `bulanan` + `groupedBulanan` computed | Group row LEMBAGA/KELAS/GURU sesuai legacy |
| 3 | PTPT auto-compute Total = Akhir - Awal | `computedTotal(s)` + `warnaPTPT(s)` (red/yellow/green by threshold) | Threshold sama: <5/5-9/≥10 hal |
| 4 | PTPT Juz input number 1-30 | Cell `Juz` muncul kalau ada PTPT di list, input `<input type=number>` mapped ke `JUZ {n}` saat save | Match legacy v.19 input style |
| 5 | Non-PTPT manual Total | Cell `Total` input bebas string | E.g. TPQ "Jilid 3B Hal 15" |
| 6 | Simpan ke Firestore (`updateDoc santri/{id}`) | `simpanRekap()` async + batch promises | Firebase v9 modular API |
| 7 | Cetak HTML print preview | `cetakHTML()` window.open + auto print | KOP dari `savedSettings` (4 baris) |
| 8 | Export PDF (jsPDF) | `exportPdf()` via `buildListPdf` (utils/pdfBuilder) | Landscape, kop, columns dinamis (Juz only if hasPTPT) |
| 9 | Export Excel | `exportExcel()` via `useExcel().exportStyled` | KOP 4 baris + subtitle |
| 10 | Top 5 santri prestasi tertinggi per lembaga | Mode `ranking` + `rankingPerLembaga` computed | Per lembaga, sorted desc total, max 5 |
| 11 | PTPT histogram Kurang/Cukup/Bagus | Card di mode ranking, render kalau `isPTPT` | Mirroring `renderStatistikAdmin` block 2 |
| 12 | Stats Belum/Sudah Dinilai | 2 badge tambahan di stats grid (rose/teal) | Count berdasarkan edits OR firestore values |
| 13 | View mode toggle (Bulanan / Ranking / Riwayat) | Header pill toggle 3 mode | Riwayat = baseline lama tetap dipertahankan |

---

## 4. Perubahan major dari baseline

- Layout grid stats jadi 6 kolom (was 4): tambahan **Belum Dinilai** + **Sudah Dinilai**
- 3 view mode (`bulanan` default, `ranking`, `riwayat`) — toggle via pill di header
- State `edits` reactive object — local edits sebelum simpan, di-merge saat render
- Group row pakai key `lembaga::kelas::guru` (sama persis logic legacy `renderTabelBulanan`)
- TPQ shift-aware: lembagaMatch() helper handle "tpq pagi"/"tpq sore" vs `s.shift` field
- Lembaga ganti → auto reset filterKelas (`watch(filterLembaga, ...)`)
- PDF & Excel pakai dynamic columns (Juz hidden kalau hasPTPT=false), match legacy `hasPTPT` ternary

---

## 5. Asumsi

1. **`updateDoc(doc(db, 'santri', id), ...)`** valid path — sama dengan legacy `db.collection('santri').doc(id).update(...)`.
2. `savedSettings` ada di `useSettingsStore()` dengan key `kopLine1..4` / `txtAppName` — kalau beda nama field, KOP cuma blank tapi tidak crash.
3. `buildListPdf` accept `kop`, `columns`, `rows` signature seperti di file `utils/pdfBuilder.js:188` — verified.
4. `exportStyled` accept `rows`, `{ filename, sheetName, kop, subtitle, columns }` — verified di `composables/useExcel.js:116`.
5. `subscribeColl('santri'/'guru', cb)` standard pattern — sama dengan view lain (verified pattern di NaikKelasView dll).
6. `extractNumber`, `getNamaGuruGelar` di `@/utils/format` — verified.
7. **Diniyah schema editor** sengaja TIDAK di-port — itu page terpisah (`/rekap-diniyah`), beda menu di legacy. Bisa jadi parity task tersendiri.
8. **PTPT Threshold (<5/5-9/≥10 Hal)** = hardcoded dari legacy line 18913/27967, tidak dari settings.
9. Untuk Pra PTPT, legacy pakai `_rekapPraPTPTBulanan()` (auto-compute count kenaikan × multiplier). **TIDAK di-port** — di Vue, Pra PTPT diperlakukan seperti TPQ (manual Total). Catatan untuk batch lanjutan kalau perlu compute otomatis.

---

## 6. Tidak di-port (sengaja)

- Bottom warning card "PENTING klik tombol simpan" — sudah cukup hint di action bar.
- Filter lembaga via `_VIRTUAL_GROUPS` (TPQ payung) — diganti dengan `lembagaMatch` shift-aware sederhana yang sudah memadai.
- Pra PTPT auto-compute via `_rekapPraPTPTBulanan` — defer (kompleks, butuh kartu_kenaikan parsing).
- Schema editor Diniyah (`#rekap-diniyah` page).
- Dashboard santri "Selisih Capaian" + label PTPT — itu di dashboard santri view, bukan rekap.

---

## 7. File output

- `tmp_recovery/feature-parity-v2/RekapPrestasiView.vue` (~22 KB, valid SFC, balanced template/script)
- `tmp_recovery/feature-parity-v2/RekapPrestasi-AUDIT.md` (file ini)
