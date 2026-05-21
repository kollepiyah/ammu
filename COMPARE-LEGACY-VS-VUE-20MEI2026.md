# Compare Legacy vs Vue — Portal MU per-halaman

**Data**: 80+ render functions dari `public/index.html` (41k lines) cross-reference dengan Vue routes (`vue-app/src/router/index.js`).
**Status**: ✅ Done | ⚠️ Partial | ❌ Missing | 🔧 Bug aktif

---

## 1. DASHBOARD & STATISTIK

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 1 | `renderBerandaFeed` | DashboardView | ✅ | done #74 |
| 2 | `renderDashboardSantri` | DashboardView (role=santri) | ⚠️ | role-specific layout belum konfirm |
| 3 | `renderStatistik` / `renderStatistikAdmin/Guru/Pegawai` | StatistikView | ⚠️ | per-role view? |
| 4 | `renderStatGuruKehadiran` | — | ❌ | Chart absensi guru MISSING |
| 5 | `renderStatSantriPrestasi` | — | ❌ | Chart prestasi santri MISSING |
| 6 | `renderChartKeuangan` | — | ❌ | Chart keuangan MISSING |
| 7 | `renderRekapKegiatan` | — | ❌ | Chart kegiatan MISSING |
| 8 | `renderKalenderKegiatan` | KalenderKegiatanView | ✅ | |

## 2. SANTRI / GURU

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 9 | `renderAdminSantri` | SantriView | ⚠️ | **Ekspor PDF belum ada** (kyai req) |
| 10 | `renderListSantriPOS` | PosSantriView | ⚠️ | match legacy spec belum |
| 11 | `renderListSantriRapor` | RaporView santri step | ✅ | done #7 |
| 12 | `renderBulkGuruList` | — | ❌ | Bulk action MISSING |
| 13 | `renderAdminGuru` / `renderViewGuru` | GuruView | ⚠️ | **Ekspor PDF belum ada** |
| 14 | `renderOpsiGuruForm` | GuruFormView | ⚠️ | EKGQ field done (#81), foto avatar fix di v.20.77 |
| 15 | `renderDataSantriSelf` | ProfilView (santri) | ⚠️ | text contrast issue |
| 16 | `renderGuruProfil` | ProfilView (guru) | ⚠️ | |
| 17 | `renderUserProfilPage` | ProfilView (admin) | ⚠️ | |

## 3. MASTER DATA

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 18 | `renderMasterLembaga` | LembagaView, LembagaDetailView | ✅ | non-lembaga filter (v.20.74.4) |
| 19 | `renderMasterKelasSekolah` | KelasView, MasterDataView | ⚠️ | sub-tab di MD |
| 20 | `renderMasterJabatan` | MasterDataView tab Jabatan | 🔧 | **Settings.load global** fix v.20.76, verify next deploy |
| 21 | `renderMasterTP` (Tahun Pelajaran) | — | ❌ | Tahun Pelajaran admin belum ada |
| 22 | `renderMasterKegiatan` | Pengaturan section | ⚠️ | sudah ada di Pengaturan |
| 23 | `renderACFFieldsEditor` | FieldSchemaView (partial), PSB belum | ❌ | **PSB ACF MISSING** (kyai req Task C.4) |
| 24 | `renderFieldInput` / `renderFieldOrderList` | FieldSchemaView | ⚠️ | |
| 25 | `renderAuditLog` | — | ❌ | MasterDataView placeholder line 507 |
| 26 | `renderAuditIssues` | — | ❌ | MISSING |

## 4. KENAIKAN / RAPOR

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 27 | `renderEditorKartu` | NaikKelasView modal | ⚠️ | auto-tanggal fix v.20.77 |
| 28 | `renderKartuKenaikanModal` | NaikKelasView modal | ✅ | done #11 |
| 29 | `renderRiwayatKenaikanList` | NaikKelasView Riwayat | ✅ | done #25 (Excel export) |
| 30 | `renderFormRapor` | RaporView | ⚠️ | TTD EKGQ rendering perlu verify |
| 31 | `renderRaporSettingsUI` | LembagaDetailView Schema editor | ✅ | done #12 |
| 32 | `renderSchemaEditor` | LembagaDetailView | ✅ | done |
| 33 | `renderRekapSettingsUI` | LembagaDetailView (Rekap config) | ⚠️ | |
| 34 | `renderRekapDiniyah` | RekapDiniyahView | ✅ | done #77 (per-kelas) |
| 35 | `renderPredikatRulesUI` | LembagaDetailView | ⚠️ | |
| 36 | `renderPreviewGridBP` (Buku Pribadi) | — | ❌ | MISSING |
| 37 | RaporView PDF Cetak | window.print() | ✅ | done v.20.75 Opsi 3 |
| 38 | RaporView TTD No EKGQ | — | ⚠️ | belum render di TTD (Task A scheduled) |

## 5. ABSENSI

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 39 | `renderAbsensi` (santri) | AbsensiSantriView | ⚠️ | **Orphan delete belum ada** (kyai req) |
| 40 | `renderRekapAbsensi` | AbsensiSantriView rekap mode | ⚠️ | per santri delete missing |
| 41 | AbsensiGuru | AbsensiGuruView | ✅ | done #69 + FP ID kolom (v.20.74.4) |
| 42 | `renderListLibur` | AbsensiGuruView Kelola Libur | ✅ | |
| 43 | `renderKegiatanPesantren` | KegiatanPesantrenView | ⚠️ | placeholder "coming v.73" line 141 |

## 6. KEUANGAN

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 44 | `renderKeuDashboard` | KeuanganDashboardView | ✅ | |
| 45 | `renderPengaturanKeuangan` | PengaturanKeuanganView | ✅ | |
| 46 | `renderJenisTagihan` | PengaturanKeuanganView (kategori) | ⚠️ | |
| 47 | `renderNominalSyahriyahGrid` | — | ❌ | **Tabungan auto-fill nominal MISSING** (#56) |
| 48 | `renderTunjPot` (Tunjangan Potongan) | — | ❌ | MISSING di PengaturanKeuangan |
| 49 | `renderTabunganSantri` | TabunganView | ✅ | |
| 50 | `renderTabelBulanan` (mutasi) | TabunganView | ⚠️ | |
| 51 | `renderTabelMutasi` | TabunganView | ⚠️ | |
| 52 | `renderTunggakan` / `renderSantriTunggakan` | TagihanView | ⚠️ | tab Tunggakan |
| 53 | `renderRiwayatTransaksiSantri` | TagihanView (Lunas tab) | ⚠️ | |
| 54 | `renderBisyarohGrid` / `renderBisyarohSekolahGrid` | BisyarohView | ⚠️ | dual grid match legacy? |
| 55 | `renderGuruSlipSaya` / `renderRiwayatSlip` | BisyarohView (guru) | ⚠️ | |
| 56 | `renderBukuInduk` | BukuIndukView | ✅ | done #19, manual input |
| 57 | `renderHutang` | HutangPiutangView | ✅ | done #19 |
| 58 | POS Santri (`renderCartItems`, `renderLembagaTabsPOS`, `renderKategoriList`) | PosSantriView | ⚠️ | spec match legacy |
| 59 | LaporanKeuanganView | LaporanKeuanganView | ⚠️ | |

## 7. PSB / PENERIMAAN

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 60 | PSB public form | vue-app-psb / PsbFormView | ✅ | done #62, non-lembaga filter v.20.76 |
| 61 | PSB admin | PsbAdminView, PsbDetailView | ✅ | done #63 |
| 62 | Info Pembayaran + Syarat per-lembaga | LembagaDetailView | ⚠️ | upload admin done #67, public render MISSING |
| 63 | PSB ACF custom fields | — | ❌ | **MISSING** (kyai req Task C.4) |

## 8. PENGATURAN

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 64 | Identitas + KOP Surat | PengaturanView | ✅ | |
| 65 | Logo & BG | PengaturanView | ✅ | persist fix v.20.74.5 + main.js global v.20.76 |
| 66 | Kalibrasi Hijri | PengaturanView | ⚠️ | DashboardJamHijri pakai kalibrasi via useClock — verify |
| 67 | Tema Warna | PengaturanView | ✅ | done #44 |
| 68 | Fitur & Mode | PengaturanView | ✅ | done #45 |
| 69 | Jam Shift | PengaturanView | ✅ | done #72 |
| 70 | Printer | PengaturanView | ✅ | done #48 |
| 71 | Pengaturan Postingan | PengaturanView | ✅ | wire PostsView ada (v.20.75) |
| 72 | Submenu Formal/Qiraati | PengaturanView | ⚠️ | non-lembaga filter v.20.77 |
| 73 | Schema Rapor per-lembaga | LembagaDetailView | ✅ | done |
| 74 | Master Kegiatan | PengaturanView | ✅ | |

## 9. KOMUNIKASI / POSTS

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 75 | Mading / Ammu Channel | PostsView | ✅ | done + reactions v.20.73 |
| 76 | Image lightbox | PostsView | ⚠️ | `renderLightboxImg` belum konfirm |
| 77 | Kritik & Saran | KritikSaranView | ⚠️ | |
| 78 | `renderTentangKami` | — | ❌ | About page MISSING (minor) |

## 10. PEMBAYARAN / TAGIHAN SANTRI

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 79 | Pembayaran santri | PembayaranView | ❌ | **"Fitur Sedang Disiapkan" placeholder** |
| 80 | Capaian Prestasi | CapaianPrestasiView | ⚠️ | |

## 11. AUTH / PROFIL

| # | Legacy | Vue | Status | Gap |
|---|---|---|---|---|
| 81 | Login Google | LoginView | ⚠️ | tombol ada, OAuth aktif? |
| 82 | `renderStatusGoogleProfil` | ProfilPengaturanSaya | ⚠️ | |
| 83 | `renderStatusNotifProfil` | ProfilPengaturanSaya | ⚠️ | |
| 84 | Logout dialog | ConfirmDialog | ✅ | fix v.20.74.5 |

---

## RINGKASAN STATISTIK

| Status | Count | % |
|---|---|---|
| ✅ Done | 31 | 37% |
| ⚠️ Partial | 39 | 46% |
| ❌ Missing | 14 | 17% |

---

## ❌ MISSING (14) — yang BELUM ada di Vue sama sekali

**Critical**
- #4 Stat Guru Kehadiran chart
- #5 Stat Santri Prestasi chart  
- #6 Chart Keuangan
- #7 Chart Rekap Kegiatan
- #21 Master Tahun Pelajaran (admin)
- #23 PSB ACF custom fields
- #25 Audit Log viewer (MasterData)
- #36 Preview Grid Buku Pribadi
- #47 Tabungan Nominal Syahriyah auto-fill preset
- #48 Tunjangan & Potongan setting
- #63 PSB ACF custom fields per-lembaga (sama #23)
- #79 PembayaranView full feature
- #78 About / Tentang Kami (minor)
- #12 Bulk Guru actions

## ⚠️ PARTIAL (39) — Vue ada tapi fitur kurang/perlu polish

Prioritas:
1. **#9, #13 Santri/Guru ekspor PDF** — kyai req
2. **#39 Absensi Santri orphan delete** — kyai req
3. **#38 RaporView TTD No EKGQ rendering**
4. **#27 NaikKelas auto-tanggal** — fixed v.20.77
5. **#43 KegiatanPesantren placeholder "coming v.73"**
6. **#66 Hijri kalibrasi sync widget** — useClock sudah baca kalibrasi (perlu verify live)
7. **#62 PSB public Info Pembayaran render**
8. **#82-83 Profil status Google/Notif handlers**

## ✅ DONE (31)

Sudah match legacy. Hanya perlu verify live setelah deploy v.20.77.

---

**File**: `D:\Aplikasi Project\Portal MU\COMPARE-LEGACY-VS-VUE-20MEI2026.md`
**Generated**: 20 Mei 2026
