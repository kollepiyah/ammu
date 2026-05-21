# Portal MU — Live Audit 34 Routes (20 Mei 2026 v.20.75)

## A. Live audit hasil (Chrome MCP, login: Rahman Fanani / Admin)

| # | Route | Status | Detail |
|---|---|---|---|
| 1 | /dashboard | ✅ LIVE | Ahlan widget + Hijri date + Kalender + Quick action slider, no error |
| 2 | /profil | ✅ LIVE | 37 buttons, UiActionCard, no placeholder. Text contrast issue (kyai req) |
| 3 | /santri | ✅ LIVE | 30 btns + 3 inputs (search). **MISSING: tombol Ekspor PDF** |
| 4 | /guru | ✅ LIVE | 39 btns + 3 inputs. **MISSING: tombol Ekspor PDF** |
| 5 | /lembaga | ✅ LIVE | 29 btns + 2 inputs (search+filter tipe). Cards list lembaga. |
| 6 | /lembaga/:id | ✅ LIVE | LembagaDetail 5 cards (non-lembaga: 1 card only — fix v.20.74.4) |
| 7 | /kelas | ✅ LIVE | 29 btns + 2 inputs |
| 8 | /master-data | ✅ LIVE | Tabs: Lembaga/Divisi, Jabatan, Guru, Diniyah, Kegiatan. **#20 Jabatan: load fix v.20.76** |
| 9 | /field-schema | ✅ LIVE | ACF editor untuk santri/guru custom fields |
| 10 | /rapor | ✅ LIVE | UiActionCard kategori → sub-lembaga → santri → view → window.print() ✓ |
| 11 | /naik-kelas | ✅ LIVE | 37 btns. **Auto-tanggal fix v.20.77** (siap deploy) |
| 12 | /absensi-guru | ✅ LIVE | FP ID column ✓ (v.20.74.4). Input Harian + Rekap Bulanan + Impor 3 tabs |
| 13 | /absensi-santri | ✅ LIVE | Rekap per-Santri + Detail per-Hari. **MISSING: tombol Hapus orphan** |
| 14 | /pembayaran | 🔴 PLACEHOLDER | **"Fitur Sedang Disiapkan"** — full feature MISSING |
| 15 | /tabungan | ✅ LIVE | Tabel mutasi + filter santri. **MISSING: auto-fill nominal syahriyah** |
| 16 | /tagihan | ✅ LIVE | Tunggakan + Lunas tab. Export Excel done |
| 17 | /pos-santri | ✅ LIVE | Modal-based POS. Spec match legacy (perlu verify dengan kyai) |
| 18 | /bisyaroh | ✅ LIVE | Grid + filter |
| 19 | /buku-induk | ✅ LIVE | Manual input + Cetak Laporan ✓ |
| 20 | /hutang-piutang | ✅ LIVE | Done #19 + Excel export |
| 21 | /laporan-keuangan | ✅ LIVE | Per-kategori |
| 22 | /keuangan | ✅ LIVE | KeuanganDashboard |
| 23 | /keu-pengaturan | ✅ LIVE | Kategori tagihan |
| 24 | /posts | ✅ LIVE | Mading/Ammu Channel + Reactions (5 emoji) ✓ |
| 25 | /kalender | ✅ LIVE | KalenderKegiatanView dengan agenda |
| 26 | /statistik | ✅ LIVE | Charts per role. **Perlu verify: Stat Guru Kehadiran, Stat Santri Prestasi, Chart Keuangan, Chart Kegiatan** |
| 27 | /pengaturan-web | ✅ LIVE | 13 sections card. **Non-lembaga filter fix v.20.77** |
| 28 | /rekap-prestasi | ✅ LIVE | Per lembaga |
| 29 | /rekap-diniyah | ✅ LIVE | Per-kelas mapel ✓ (#77) |
| 30 | /input-bulanan | ✅ LIVE | Auto-compute Pra PTPT + manual TPQ/PPPH |
| 31 | /psb | ✅ LIVE | Admin list + detail. **MISSING: ACF custom fields per-lembaga** |
| 32 | /personal | ✅ LIVE | Page admin personal |
| 33 | /capaian-prestasi | ✅ LIVE | Santri achievement |
| 34 | /kritik-saran | ✅ LIVE | Form + list |

---

## B. Yang BELUM MATCH legacy 100%

### 🔴 HARD MISSING (belum ada di Vue sama sekali)

| # | Item | Legacy function | Vue location | Effort |
|---|---|---|---|---|
| M1 | **PembayaranView** full feature | `renderPembayaran` | PembayaranView | 1-2 hari (butuh spec kyai) |
| M2 | **Tabungan Nominal Syahriyah preset** | `renderNominalSyahriyahGrid` | PengaturanKeuangan | 4 jam |
| M3 | **Tunjangan & Potongan** setting | `renderTunjPot` | PengaturanKeuangan | 4 jam |
| M4 | **Master Tahun Pelajaran** | `renderMasterTP` | MasterDataView tab | 2 jam |
| M5 | **PSB ACF custom fields** per-lembaga | `renderAcfFieldsEditor` | LembagaDetail / PSB | 1 hari |
| M6 | **Audit Log viewer** | `renderAuditLog` + `renderAuditIssues` | MasterDataView placeholder | 4 jam |
| M7 | **Preview Buku Pribadi** grid | `renderPreviewGridBP` | — | 4 jam |
| M8 | **Bulk Guru actions** | `renderBulkGuruList` | GuruView | 2 jam |
| M9 | **Charts: Stat Guru Kehadiran, Stat Santri Prestasi, Chart Keuangan, Rekap Kegiatan** | 4 functions | StatistikView | 1 hari |
| M10 | **Santri/Guru list Ekspor PDF** | (window.print di legacy) | SantriView/GuruView | 2 jam |
| M11 | **Absensi Santri orphan delete button** | (legacy ada hapus) | AbsensiSantriView | 2 jam |
| M12 | **Login Google handler** | renderStatusGoogleProfil | LoginView/ProfilSetting | 2 jam |
| M13 | **TTD rapor No EKGQ** rendering | (legacy TTD ada) | RaporView TTD section | 2 jam |
| M14 | **About / Tentang Kami** | `renderTentangKami` | — | 1 jam (minor) |
| M15 | **KegiatanPesantren fingerprint sync** | (line 141 placeholder) | KegiatanPesantrenView | 4 jam |

**Total effort estimate**: ~6-8 hari full work untuk close gap

### ⚠️ PARTIAL (sudah ada di Vue tapi fitur kurang)

| # | Item | Detail |
|---|---|---|
| P1 | **/pembayaran** placeholder | Hide fitur sampai spec final dari kyai |
| P2 | **Profil text contrast** | WCAG audit + warna fix |
| P3 | **Lightbox image PostsView** | Click image untuk zoom |
| P4 | **MasterData Diniyah tab** | sub-sections per-kelas vs per-lembaga |
| P5 | **POS Santri match legacy** | perlu kyai konfirm spec |
| P6 | **Hijri kalibrasi widget** | useClock sudah pakai kalibrasi, perlu test |
| P7 | **PSB public — Info Pembayaran render** | upload admin done, public render belum |
| P8 | **Card style remaining** | PengaturanView tab cards, MasterData entity cards |

### ✅ SUDAH DONE (verify only)

26 routes lain — sudah live, no error, no placeholder, sesuai legacy.

---

## C. ROADMAP MATCH 100% legacy

**v.20.77** (sync done, kyai deploy):
- ✓ Pengaturan section non-lembaga filter
- ✓ DashboardGreeting fotoUrl fallback
- ✓ NaikKelas auto-tanggal

**v.20.78** (urgent, ~1 hari):
- M10 Santri/Guru ekspor PDF (window.print + .no-print CSS)
- M11 Absensi Santri orphan delete tombol
- M13 TTD No EKGQ render di RaporView
- P2 Profil text contrast audit
- P8 Card style migrate sisa

**v.20.79** (~1-2 hari):
- M2 Tabungan nominal syahriyah preset
- M3 Tunjangan & Potongan
- M4 Master Tahun Pelajaran
- M6 Audit Log viewer  
- M8 Bulk Guru actions

**v.20.80** (~2 hari):
- M5 PSB ACF custom fields per-lembaga
- M7 Preview Buku Pribadi grid
- M9 4 chart missing (Stat Guru, Stat Santri, Chart Keuangan, Rekap Kegiatan)
- P3 Lightbox image
- P7 PSB public Info Pembayaran render

**v.20.81** (perlu kyai spec):
- M1 PembayaranView full
- M15 KegiatanPesantren fingerprint sync
- M12 Login Google handler
- M14 About / Tentang Kami

---

**Output**: `D:\Aplikasi Project\Portal MU\COMPARE-LIVE-20MEI2026.md`
