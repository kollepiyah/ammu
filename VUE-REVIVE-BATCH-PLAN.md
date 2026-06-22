# Portal MU — Batch Plan Perbaiki Skema Sistem Vue

**Goal**: Bangun Vue lagi (revive dari archive di `public/vue/`), tapi pastikan **skema sistem match legacy** sebelum deploy.

**Source of Truth**: `LEGACY-SCHEMA-MASTER.md` (sudah dibuat).
**Status saat ini**: Vue archived di `public/vue/`, legacy aktif di `ammuonline.web.app`.

---

## v.21.10.0526 — REFACTOR SKEMA LEMBAGA (CORE FIX)

**Goal**: TPQ Pagi+Sore = 1 lembaga "TPQ" dengan field `shifts: ['pagi', 'sore']`. Bukan 2 entry terpisah.

**Tasks**:
1. `master/lembaga.list` refactor:
   - Hapus 2 entry "TPQ Pagi" + "TPQ Sore"
   - Tambah 1 entry: `{ lembaga: 'TPQ', shifts: ['pagi', 'sore'], kelas: ['Jilid 1', ..., 'KPI', 'Persiapan Khotaman'] }`
2. Migration script untuk:
   - `santri` records: `lembaga: 'TPQ Pagi'` → `lembaga: 'TPQ', shift: 'pagi'` (sama untuk Sore)
   - `guru` records: same migration
   - `absensi_*` records: same migration
   - `rapor_semester` records: lookup by `lembaga + shift`
3. Vue `useLembaga.js` adjust: emit list with `shifts` field
4. PSB form dropdown: tampil "TPQ" tunggal, sub-pilih shift (radio) setelahnya
5. Statistik: roll-up Pagi + Sore sebagai "TPQ" total + tab pisah per-shift
6. Rapor: filter santri by `lembaga: 'TPQ'`, render shift sebagai info di KOP/identitas

**Effort**: ~6 jam (migration paling effort-intensive)

## v.21.11 — REFACTOR ROLE SYSTEM

**Goal**: role_sistem hierarchy clear + admin-promoted-guru handling konsisten.

**Tasks**:
1. Vue `auth.js`: clarify `sesiAktif.role` vs `sesiAktif.role_sistem`
   - `role`: high-level UI category (`'admin' | 'guru' | 'santri'`)
   - `role_sistem`: precise authority (`'super_admin' | 'admin' | 'admin_keuangan' | 'user'`)
2. Logic: kalau guru dengan `role_sistem in [super_admin, admin, admin_keuangan]` → `role = 'admin'` (promoted)
3. `cekHakAkses()` permissions matrix:
   - super_admin: ALL
   - admin: ALL except super-admin-only
   - admin_keuangan: keuangan + read-only lain
   - user: guru biasa, akses by lembaga + shift
4. UI gating per route + per fitur sesuai matrix

**Effort**: ~3 jam

## v.21.12 — REFACTOR TIPE PEGAWAI / SCOPE GURU

**Goal**: `tipe_pegawai` field dipakai konsisten untuk gating menu.

**Tasks**:
1. Guru schema field `tipe_pegawai`: `'ngaji'` / `'ngaji_sekolah'` / `'sekolah'`
2. Menu visibility logic:
   - `'ngaji'`: hanya Qiraati menu (Rapor Qiraati, Input Bulanan, dst)
   - `'sekolah'`: hanya Sekolah menu (Rekap Diniyah, Absen Bulanan Sekolah, Rapor Diniyah)
   - `'ngaji_sekolah'`: BOTH
3. AbsensiGuru: filter guru per tipe + per shift
4. Bisyaroh: kategorikan per tipe

**Effort**: ~2 jam

## v.21.13 — REFACTOR FIELD SCHEMA SANTRI/GURU

**Goal**: Field naming match legacy. Drop suffix `_santri`/`_guru` di Firestore.

**Tasks**:
1. Vue `useSantriForm.js`: form fields pakai suffix untuk UI, mapper layer ke Firestore field tanpa suffix
2. Vue `useGuruForm.js`: same pattern
3. Validate ALL Vue read/write match legacy field names exactly:
   - `nama_santri` UI ↔ `nama` Firestore
   - `lembaga_guru` UI ↔ `lembaga` Firestore
   - `jabatan_tambahan_guru` UI ↔ `jabatan_tambahan` Firestore (array)
4. Drop `txtAppName` / `txtHeaderBar` confusion — keep `txtAppName: 'Ammu Online'` (kyai approved)

**Effort**: ~2 jam

## v.21.14 — REFACTOR KEUANGAN SCHEMA

**Goal**: 7 koleksi keuangan match legacy. Buku induk auto-mirror jalan.

**Tasks**:
1. Verify Vue collection names match legacy:
   - `keuangan_tagihan`
   - `keuangan_transaksi`
   - `keuangan_tabungan_santri` / `keuangan_tabungan_guru`
   - `keuangan_gaji`
   - `keuangan_hutang`
   - `keuangan_buku_induk`
2. Auto-mirror logic: setiap insert ke `keuangan_transaksi` / `keuangan_gaji` / dst → auto insert ke `keuangan_buku_induk` dengan kategori sesuai
3. Nominal Syahriyah preset: di Pengaturan Keuangan `jenisTagihan` array — auto-fill di POS Santri form input
4. Tunjangan + Potongan master list: section di Pengaturan Keuangan (sudah ada di Vue, perlu verify match legacy)

**Effort**: ~3 jam

## v.21.15 — REFACTOR ABSENSI SCHEMA

**Goal**: 4 koleksi absensi match legacy. Per-shift handling konsisten.

**Tasks**:
1. Collections:
   - `absensi` (guru daily, dari device fingerprint atau manual)
   - `absensi_kegiatan` (kegiatan pesantren attendance)
   - `absensi_santri_sekolah` (daily)
   - `absensi_santri_sekolah_bulanan` (rekap bulanan)
   - `absensi_shift_guru` (shift schedule per hari)
2. AbsensiGuruView: harian input + rekap bulanan + impor xlsx (sudah ada, verify)
3. FP ID field di guru — sudah ada di v.20.74.4, verify
4. Orphan delete tombol per record (sudah ada v.20.78, verify)
5. Kelola libur per bulan + per lembaga (sudah ada, verify)

**Effort**: ~2 jam

## v.21.16 — REFACTOR MASTER DATA TABS

**Goal**: 7 tabs Master Data lengkap.

**Tasks** (sudah sebagian done v.20.79):
1. ✅ Lembaga/Divisi tab — DONE
2. ✅ Jabatan tab — DONE (settings.load global v.20.76)
3. ✅ Tahun Pelajaran tab — DONE v.20.79
4. Guru/Pegawai tab — verify field schema match legacy
5. Data Santri tab — verify field schema
6. Rapor tab — schema editor per-lembaga (done)
7. Rekap Prestasi tab — schema editor (done)
8. ✅ Audit Log viewer — DONE v.20.79
9. ❌ ACF Custom Fields (PSB) — MISSING, perlu tambah

**Effort**: ~3 jam (mostly polish + ACF tab)

## v.21.17 — REFACTOR RAPOR SCHEMA

**Goal**: Rapor per-lembaga schema editor match legacy + window.print() flow.

**Tasks**:
1. Schema per-lembaga di `settings/lembaga_schemas.{lembaga}` (mirror legacy struktur)
2. RaporView: support Qiraati (TPQ + Pra PTPT + PTPT + PPPH) + Diniyah (per-lembaga formal)
3. Per-Kelas mapel di Diniyah (v.20.77 done)
4. Window.print() + @media print CSS (v.20.75 done)
5. EKGQ rendering di TTD (done v.20.78)

**Effort**: ~1 jam (mostly verify)

## v.21.18 — PSB FULL FEATURE

**Goal**: PSB site (vue-app-psb) + admin section (di main Vue) full.

**Tasks**:
1. ✅ PSB public form (vue-app-psb) — done #62
2. ✅ Filter non-lembaga di dropdown (v.20.76)
3. ✅ Admin PSB section di main Vue — done #63
4. ❌ ACF custom fields per-lembaga — MISSING
5. ❌ Info Pembayaran + Syarat Ketentuan render di public — partial done #67 (admin upload), public render belum
6. ❌ Checkbox "Setuju syarat" required sebelum Submit

**Effort**: ~4 jam

## v.21.19 — CHARTS & STATISTIK

**Goal**: 4 chart utama tampil di /statistik.

**Tasks**:
1. Stat Guru Kehadiran chart (bar — hadir vs alfa per guru per bulan)
2. Stat Santri Prestasi chart (pie — khotam/juz tercapai)
3. Chart Keuangan (line — pemasukan vs pengeluaran per bulan)
4. Chart Rekap Kegiatan (bar — hadir per kegiatan)

Library: Chart.js (sudah di-CDN-load saat StatistikView open)
**Effort**: ~4 jam

## v.21.20 — POLISH + FINAL AUDIT

**Tasks**:
1. Profil text contrast (sudah v.20.78 done)
2. Card style unified (sudah v.74.x done)
3. Sidebar default open (sudah v.74.4 done)
4. Sentry init verify
5. Live audit semua route Vue post-revive
6. Compare 1:1 dengan legacy via Chrome MCP
7. Bump AAB versionCode

**Effort**: ~3 jam

---

## TOTAL ESTIMATE

- v.21.10 → v.21.20: ~33 jam (4-5 hari full work)
- Plus migration scripts (data exist di Firestore production)

## RULES UNTUK BATCH INI

1. **Skema lembaga = HOLY** — TPQ refactor di v.21.10 wajib done sebelum yang lain
2. **Migration script** untuk setiap field rename — backfill data lama
3. **Test di staging** dulu (kalau ada) sebelum push ke production
4. **Vue source masih di `public/vue/`** — restore via `firebase.json` target swap kalau siap
5. **Legacy tetap deployed di `ammuonline.web.app`** sebagai fallback sampai Vue v.21.20 fully tested

## NEXT STEP setelah list ini

Kalau kyai mau lanjut sekarang: mulai v.21.10 (TPQ shift refactor) — paling critical karena affect Lembaga/Santri/Guru/Absensi/Rapor sekaligus. 6 jam kerja focused.

Atau end sesi sini, lanjut di sesi baru dengan agent yang baca file ini + LEGACY-SCHEMA-MASTER.md sebagai context.

---
**File**: `D:\Aplikasi Project\Portal MU\VUE-REVIVE-BATCH-PLAN.md`
