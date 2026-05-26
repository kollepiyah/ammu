# SKEMA AUDIT — Rapor & Rekap (per spec PENDING-v21.25.md)

**Tanggal:** 21 Mei 2026 sore
**Status:** Verify implementasi v.21.36 current vs spec Kyai

---

## Issue #7 — Rekap Prestasi

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| Santri TPQ Pagi/Sore/Pra PTPT terbaca | Filter `LEMBAGA_QIRAATI.some()` + handle TPQ shift case-insensitive | ✅ |
| Filter Qiraati hanya 5 lembaga (TPQ Pagi/Sore/Pra PTPT/PTPT/PPPH) | `LEMBAGA_QIRAATI = ['TPQ Pagi','TPQ Sore','Pra PTPT','PTPT','PPPH']` strict | ✅ |
| Filter Diniyah hanya SDI/PKBM | `DINIYAH_LEMBAGA = ['SDI','PKBM']` strict | ✅ |
| TK exclude dari Diniyah | TK tidak masuk DINIYAH_LEMBAGA, otomatis exclude | ✅ |
| Mapel Diniyah editable manual via Master Lembaga → Schema Diniyah | **DIBUAT TAB PENGATURAN MAPEL di RekapDiniyahView (BUKAN di Master Lembaga)** — perlu klarifikasi: di mana Kyai mau editor mapel? | ⚠️ NEED CLARIFY |

---

## Issue #8 — Rapor Qiraati (KRITIS)

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| Santri TPQ Pagi/Sore/Pra PTPT terbaca | Filter case-insensitive + shift | ✅ |
| Tgl auto dari `santri.riwayat[]` | Section "Riwayat Kenaikan (auto)" tampil semua riwayat | ✅ |
| **KUMULATIF — PTPT kelas 2 tampil tabel Kelas 1+2, bukan Kelas 2 saja** | `kumulatifMatrix` computed slice kelas 0 sampai activeIdx+1 | ✅ |
| Absensi auto-rekap semester | Section "Absensi Semester" baca dari raporCurrent.absensi (yang diisi via Generate ke Rapor) | ✅ |
| Nilai manual editable | mapelList editor + addMapel/removeMapel | ✅ |
| **Cetak PDF Times New Roman** | `createPdf({orientation:'p', format:'a4'})` + drawKopLetterhead + drawTable | ⚠️ Belum lock font ke 'times' |

---

## Issue #9 — Rapor Diniyah

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| Hanya SDI/PKBM | Filter sama dengan RekapDiniyahView | ⚠️ Tidak ada RaporDiniyahView terpisah — perlu klarifikasi: rapor diniyah tab di RaporView atau separate page? |
| Mapel beda per jenjang, editable manual | Tab Pengaturan Mapel di RekapDiniyahView + useDiniyahSchema composable | ⚠️ NEED CLARIFY lokasi UI |

---

## Issue #6 — Kenaikan/Mutasi (NaikKelas)

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| Santri TPQ terbaca | Filter case-insensitive | ✅ |
| Tgl auto-input ke kartu saat Proses Naik | `simpanProsesNaik` update `kartu_kenaikan[lembaga][kelas][item]` | ✅ |
| Riwayat tab terbaca | `riwayatList` computed dari santri yg punya kartu_kenaikan | ✅ |
| Catatan tampil di dashboard santri | **BELUM** — PersonalView/DashboardView role=santri belum render catatan | ❌ MISSING |

---

## Issue #10 — Absensi Santri

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| Hanya non-mukim (PP/Fullday) | `is_mukim !== true` permissive filter | ✅ |
| Tombol Generate ke Rapor | `generateKeRapor` write ke `rapor_semester` | ✅ |
| Bulanan, bukan harian | Subscribe `absensi_bulanan` collection | ✅ |
| Data santri terbaca | Permissive filter | ✅ |
| Impor/Ekspor Excel & PDF | exportExcel + exportPdf + importExcel | ✅ |

---

## Issue #12 — PSB

| Spec Kyai | Implementasi v.21.36 | Status |
|---|---|---|
| ACF + CRUD ke PsbAdminView | Section "Upload Syarat & Info Pembayaran per Lembaga" sudah di PsbAdminView | ✅ |
| Form public: Step 1 Tipe Santri → Step 2 Lembaga | Sub-app vue-app-psb 4-step flow | ✅ |
| Filter 2 grup Qiraati+Sekolah | QIRAATI_NAMES + SEKOLAH_NAMES strict | ✅ |
| TPQ Pagi tidak perlu sekolah | `needsLembagaSekolah` computed | ✅ |
| Icon mata + popup syarat/pembayaran | `currentAssets.syarat` button + modal | ✅ |
| **Hapus ACF/Upload dari LembagaDetailView** | **BELUM** — LembagaDetailView masih punya section ACF dan Upload Syarat | ❌ MISSING |

---

## GAP YANG MASIH HARUS DIKERJAKAN

1. **Kyai req: lokasi UI Mapel Diniyah** — Master Lembaga atau RekapDiniyahView? (Issue #7, #9)
2. **RaporView PDF font 'times'** — sudah pakai createPdf tapi default helvetica (Issue #4)
3. **Catatan kenaikan PTPT di dashboard santri** — PersonalView mode role=santri belum render (Issue #6.4)
4. **RaporDiniyahView terpisah** — perlu separate page atau tab? Saat ini cuma RekapDiniyahView yang ada (Issue #9)
5. **LembagaDetailView clean-up** — hapus section ACF + Upload Syarat (Issue #12)

---

## PERMINTAAN KLARIFIKASI KE KYAI

Tolong jawab 3 pertanyaan:

**Q1.** Mapel Diniyah per jenjang — UI editor di mana?
   - (a) Master Lembaga → klik SDI/PKBM → tab Schema Diniyah
   - (b) RekapDiniyahView → tab Pengaturan Mapel (current saya)
   - (c) Buat menu dedicated "Mapel Diniyah"

**Q2.** Rapor Diniyah — page-nya bagaimana?
   - (a) Tab di dalam RaporView ("Qiraati" tab + "Diniyah" tab)
   - (b) Separate page RaporDiniyahView (sidebar terpisah)
   - (c) Cuma RekapDiniyahView, tidak ada rapor diniyah formal

**Q3.** Catatan kenaikan Santri view — di mana ditampilkan?
   - (a) Dashboard santri (Beranda role=santri)
   - (b) PersonalView (Halaman Personal role=santri)
   - (c) Section terpisah "Catatan Saya" di sidebar santri
