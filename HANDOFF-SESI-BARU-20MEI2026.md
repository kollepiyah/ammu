# 🤝 HANDOFF Portal MU — Sesi Chat Baru (20 Mei 2026)

**Untuk agent berikutnya. Jangan minta kyai konfirmasi yang sudah jelas — lanjut autonomous per batch plan.**

---

## 1. SITE URLS (PALING PENTING)

| Site | URL | Tipe | Status |
|---|---|---|---|
| **Vue 3 SPA (UTAMA)** | https://ammuonline.web.app | Vue 3 + Pinia + Firebase v10, full SPA | LIVE v.20.79 deployed |
| **Legacy** | https://portal-mambaul-ulum.web.app | Vanilla JS index.html (41k lines), source of truth fitur | LIVE — backup |
| **PSB Public** | https://ammuonline-psb.web.app | Vue 3 mini app — formulir PSB calon santri | LIVE v.20.76 |

**Firebase project**: `portal-mambaul-ulum` (BUKAN `ammu.id` — itu Play Store appId saja).
**Deploy host targets**: `main` (ammuonline.web.app) + `psb` (ammuonline-psb.web.app) + `legacy` (portal-mambaul-ulum.web.app).

## 2. LOKASI KERJA

| Path | Isi |
|---|---|
| `D:\Aplikasi Project\Portal MU\` | Root project |
| `D:\Aplikasi Project\Portal MU\vue-app\` | Vue 3 SPA source (`src/views`, `src/components`, `src/stores`, dst) |
| `D:\Aplikasi Project\Portal MU\vue-app-psb\` | PSB mini Vue source |
| `D:\Aplikasi Project\Portal MU\public\vue\` | Build output deploy → Firebase Hosting target `main` |
| `D:\Aplikasi Project\Portal MU\public\psb\` | Build output PSB → target `psb` |
| `D:\Aplikasi Project\Portal MU\public\index.html` | Legacy single-file app (41k lines) — source of truth fitur |

**Build & sync flow:**
```
cd vue-app
npx vite build --outDir /tmp/vue_dist_XX
# kemudian Python copy /tmp/vue_dist_XX → public/vue
```

**Deploy** (kyai run di Windows):
```
npm run firebase:deploy
```

## 3. KEY TECHNICAL NOTES

### ⚠️ Windows mount truncation bug
File Vue di Windows mount sering truncated saat Edit/Write tool. Workaround:
1. Tulis ke `/sessions/.../mnt/outputs/file_v79.vue` dulu
2. `shutil.copy(out, src_path)` — copy ke Windows mount
3. Verify: `python3 -c "d=open(f,'rb').read(); print(len(d), d.count(bytes([0])))"` — NUL byte HARUS 0

### Settings load
`main.js` sudah global init `settings.load() + subscribe()` (v.20.76). Semua views otomatis dapet `settings.settings` ready.

### Auth structure
- `auth.sesiAktif` = { id, role, role_sistem, nama, foto, lembaga, akses, ... }
- Built-in admin: `id='admin'`, role='admin', nama='Administrator'
- Guru promoted to admin (role_sistem in admin/super_admin/admin_keuangan): role='admin' tapi nama=g.nama asli
- Cek `s.id === 'admin'` untuk built-in admin only

### PDF Rapor
- Pakai `window.print()` + `@media print CSS` (Opsi 3 kyai)
- pdfmake + jsPDF DROPPED dari initial load — lazy load on demand
- `.no-print` class untuk hide elements saat print
- `.print-area` untuk show only saat print

### Hijri kalibrasi
- `settings.kalibrasiHijri` (integer offset days)
- `getKalibrasi(settings)` di `src/utils/hijri.js`
- `useClock()` composable consume via `formatHijri(now, kalibrasi)`
- DashboardJamHijri sudah pakai useClock — kalibrasi sync

## 4. PROGRESS STATUS (v.20.79)

### ✅ COMPLETED batch
- **v.20.73**: Rekap Diniyah per-kelas + UiActionCard
- **v.20.74**: pdfmake POC (kemudian di-DROP — pindah ke window.print)
- **v.20.74.1**: App.vue crash fix + WOFF2 deploy path + Sidebar default
- **v.20.74.2**: Sidebar default-open + © symbol  
- **v.20.74.3**: RaporView PDF crash fix
- **v.20.74.4**: Branding Ammu Online + PDF align + Absensi FP ID + Non-Lembaga
- **v.20.74.5**: ConfirmDialog mounted + PengaturanView settings.load always
- **v.20.75**: PDF Rapor window.print() Opsi 3 + @media print CSS proper + EKGQ
- **v.20.76**: main.js global settings.load() + PSB non-lembaga filter regex
- **v.20.77**: PengaturanView non-lembaga filter section + DashboardGreeting foto fallback + NaikKelas auto-tanggal
- **v.20.78**: TTD NEGQ→EKGQ rename + GuruView Cetak PDF btn + Absensi orphan delete + Profil text contrast (slate-500→700)
- **v.20.79**: Master Tahun Pelajaran tab + Audit Log viewer real

### ❌ MISSING / PENDING (sisanya untuk match 100%)

**v.20.80 next batch (priority HIGH):**
- **M9.a** Chart Stat Guru Kehadiran (StatistikView — bar chart hadir vs alfa per guru/bulan, data dari `absensi_guru`)
- **M9.b** Chart Stat Santri Prestasi (pie chart per khotam/juz tercapai)
- **M9.c** Chart Keuangan (line chart pemasukan/pengeluaran per bulan, data dari `keuangan_pos` + `buku_induk`)
- **M9.d** Chart Rekap Kegiatan (bar chart hadir per jenis kegiatan)
- **M5** PSB ACF custom fields per-lembaga: di LembagaDetailView add section "Custom Fields PSB" CRUD, render dynamic di vue-app-psb PsbFormView
- **P7** PSB public Info Pembayaran render — embed PDF iframe + checkbox "Setuju" required
- **M8** Bulk Guru actions di GuruView — checkbox per row + action bar (set role, set aktif, export selected)
- **M2** Tabungan auto-fill nominal syahriyah (cari input form di TabunganView, wire ke `jenisTagihan.find(j => j.id === 'syahriyah').nominal_default`)
- **SantriView** add Cetak PDF btn (pattern beda dari GuruView, butuh edit manual)

**v.20.81:**
- **M7** Preview Buku Pribadi grid (di ProfilSantri atau RaporView card baru)
- **M15** KegiatanPesantren fingerprint sync — drop line 141 placeholder, tab "Sinkronisasi Device" upload xlsx
- **M14** About / Tentang Kami page baru (/about)
- **P3** Lightbox image PostsView click → zoom modal
- **P8** Card style migrate sisa di PengaturanView tab cards + MasterDataView entity cards

**v.20.82:**
- **M12** Login Google handler — Firebase Auth Google Provider activate (drop toast.info)
- **M1** PembayaranView full feature — 2 jalur (in-app QRIS placeholder + Manual transfer upload bukti)

**v.20.83 polish:**
- **P5** POS Santri match legacy spec (cek dengan kyai screenshot)
- **P6** Hijri kalibrasi widget verify
- **P4** MasterData Diniyah sub-sections per-kelas vs per-lembaga
- Final audit live + screenshot per route

**v.20.84 final:**
- AAB rebuild versionCode 84
- Update memory `portal_mu_v83_complete.md`

## 5. RULES SECTION (untuk agent baru)

1. **JANGAN minta konfirmasi spec kyai yang sudah jelas** — pakai reasonable default
2. **JANGAN skip task** — kalau stuck, dokumentasi alasan + lanjut next
3. **Build + sync setiap batch selesai**
4. **Bump version banner per batch** (.80 → .84)
5. **Kyai panggilan: "kyai"** (bukan "akhi" / "user")
6. **Bahasa**: Indonesian primary
7. **Setelah batch selesai**: kasih 1 perintah ke kyai = `npm run firebase:deploy`

## 6. PENDING TASKS DETAIL (from Cowork list)

Old pending tasks yang masih valid:
- **#55** Pengaturan Postingan wire — DONE (sudah di PostsView line 352)
- **#56** Tabungan orphan + auto-fill nominal syahriyah — partial: auto-fill BELUM, orphan handling unclear
- **#57** AAB rebuild Play Store update — manual platform task
- **#58** Sentry monitoring — code ada, test di prod belum
- **#59** Tauri Desktop direct print — separate platform

## 7. MEMORY FILES (sudah ada di kyai memory)

`C:\Users\Lenovo\AppData\Roaming\Claude\local-agent-mode-sessions\...\memory\`:
- portal_mu_project.md
- portal_mu_roadmap.md
- portal_mu_vue_app_structure.md
- portal_mu_v108_17_pending.md
- portal_mu_playstore_decisions.md
- portal_mu_capacitor_remote_mode.md
- portal_mu_collection_mismatch.md
- portal_mu_lembaga_spec.md
- portal_mu_multisite_hosting.md
- feedback_visual_parity_legacy.md
- feedback_theme_palette_mint_cream.md
- feedback_write_tool_windows_mount.md
- feedback_no_workaround_kyai.md
- feedback_lessons_13_mei_2026.md
- user_title.md (panggil kyai bukan akhi)
- user_dev_profile.md

Baca semua sebelum mulai kerja.

## 8. CURRENT VERSION (last deployed by kyai)

**v.20.79.0526** — Master Tahun Pelajaran tab + Audit Log viewer.
Sync ke `public/vue/` done jam ~07:50 WIB 20 Mei 2026.
Kyai run `npm run firebase:deploy` setelah read handoff ini.

---

**Penghormatan dari sesi sebelumnya. Lanjutkan ke 100% match legacy. Pak Kyai sudah capek, gak mau jelasin lagi — tinggal eksekusi.**

---

## 9. KYAI SPEC TAMBAHAN (HARUS DIPATUHI AGENT BARU)

### TPQ Pagi + TPQ Sore = SATU lembaga (cuma beda shift)

**Penting**: TPQ Pagi dan TPQ Sore itu 1 lembaga TPQ, bukan 2 lembaga terpisah.
- Mereka beda shift (jadwal/waktu), tapi same kurikulum + same kepala TPQ + same KOP rapor
- Treatment di code:
  - **Master Lembaga**: TPQ tampil sebagai 1 entry "TPQ" dengan property `shift: ['pagi', 'sore']` (atau sub-entries)
  - **PSB public form dropdown**: tampil 1 pilihan "TPQ" (kalau perlu sub-pilihan shift, tampil setelah pilih TPQ)
  - **Rapor**: rapor TPQ Pagi dan Sore pakai schema yang sama (sudah done #20 — TPQ schema unified)
  - **Statistik**: santri TPQ Pagi + Sore di-roll-up sebagai TPQ total
  - **Bisyaroh guru**: shift Pagi vs Sore tetap dipisah (jadwal beda), tapi lembaga = TPQ
- **Vue saat ini**: TPQ Pagi dan TPQ Sore masih SEPARATE di master lembaga (2 entry). PERLU MERGE atau treat as shift-variant.

**Action item untuk agent baru** (v.20.80 tambah):
- M16: Refactor master lembaga: gabung TPQ Pagi+Sore → 1 entry "TPQ" dengan field `shifts: ['Pagi', 'Sore']`
- Update dropdown PSB: tampil "TPQ" tunggal
- Update LembagaDetailView: jika tipe = TPQ, tampilkan sub-tab shift
- Update Rapor: filter santri TPQ tanpa pisah shift
- Migration: cek santri.lembaga yang "TPQ Pagi"/"TPQ Sore" → migrasi ke "TPQ" + tambah field `shift`
