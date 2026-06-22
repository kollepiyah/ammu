# Status Recovery 19 Mei 2026 — Massive Windows Mount Truncation

## TL;DR

11 file Vue + 1 root package.json ke-truncate Windows mount silently selama sesi maraton edit sebelumnya. Build error. Setelah recover semua, **build PASSED locally** (1693 modules transformed, no errors). dist sudah disync ke `public/vue/`. 

**Kyai tinggal jalankan:**

```bash
cd "D:\Aplikasi Project\Portal MU"
npm run firebase:deploy
```

Sandbox tidak punya Firebase auth, jadi deploy harus dari Windows terminal yang sudah login.

## Files yang Direcover

| File | Disk Before | Recovered Lines | Status |
|---|---|---|---|
| `vue-app/src/views/BisyarohView.vue` | 72 (mid-attr) | 419 | OK |
| `vue-app/src/views/PengaturanView.vue` | 957 (mid-attr) | 1095 | OK |
| `vue-app/src/views/TabunganView.vue` | 226 (mid-expr) | 227 | OK |
| `vue-app/src/views/RaporView.vue` | 808 (mid-comment) | 758 | OK |
| `vue-app/src/views/StatistikView.vue` | 660 (mid-str) | 682 | OK |
| `vue-app/src/views/LembagaView.vue` | 134 (mid-str) | 161 | OK |
| `vue-app/src/views/RekapDiniyahView.vue` | 244 (mid-call) | 210 | OK |
| `vue-app/src/views/PengaturanKeuanganView.vue` | 550 (mid-assign) | 485 | OK |
| `vue-app/src/views/PersonalView.vue` | 201 | 201 | OK |
| `vue-app/src/views/MasterDataView.vue` | 50 (mid-template) | 580 | OK |
| `vue-app/src/components/layout/AppSidebar.vue` | 177 (mid-fn) | 143 | OK |
| `vue-app/src/views/profil/ProfilPengaturanSaya.vue` | 370 (mid-comment) | 359 | OK |
| `package.json` (root) | line 56 mid-string | 60 | OK |

Recovery method: Read tool cached content → Write ke `outputs/*.vue` → `cp` ke Windows mount (bypass Write tool truncation).

## Build Output

```
✓ 1693 modules transformed.
PengaturanView-CvfjZN77.js   56.85 kB │ gzip:  14.80 kB
StatistikView-BrX-hgAa.js    33.68 kB │ gzip:   7.99 kB
RaporView-BV_34mL7.js        28.81 kB │ gzip:   8.25 kB
MasterDataView-CUMcoYJn.js   24.99 kB │ gzip:   6.94 kB
PengaturanKeuanganView-...   25.42 kB │ gzip:   5.86 kB
BisyarohView-Cpsh34sL.js     23.11 kB │ gzip:   6.16 kB
ProfilView-C5oPrliR.js       37.48 kB │ gzip:   9.92 kB
NaikKelasView-C6bRVBvE.js    31.38 kB │ gzip:   8.34 kB
SantriFormView-CF5bRMPy.js   24.88 kB │ gzip:   6.76 kB
index-jgj3_kQY.js           697.88 kB │ gzip: 181.11 kB
✓ built in 8.62s
```

dist target: `D:\Aplikasi Project\Portal MU\vue-app\dist\` (sandbox) + `public\vue\` (sync untuk firebase hosting).

## Apa yang Hilang dari Edit Saya Sebelumnya (Tetap Preserved via Read Cache)

- **BisyarohView**: Dual-mode (admin/guru), tab Generate (Per Guru + Bulk) + Riwayat, Bulk Generate v.20.28 implementation
- **PengaturanView**: Schema Rapor editor (perLevel/perKelas/sections), BG rapor TPQ/Diniyah, predikat rules, rekap Diniyah mapel
- **TabunganView**: Aggregate mutasi → saldo, orphan ID display
- **RaporView**: BG watermark layer, TTD from guru.tanda_tangan, KOP lookup case-insensitive, schema renderers (perLevel khotam matrix, perKelas mapel KKM, sections)
- **StatistikView**: Guru section full (Statistik Pengajaran, Kehadiran Saya, Kelas Saya)
- **LembagaView**: Card matrix gradient + icon per-tipe
- **RekapDiniyahView**: Grid mapel × santri, save per-cell ke `rekap_diniyah`
- **PengaturanKeuanganView**: Jenis tagihan objects, master tunjangan/potongan, bank info
- **PersonalView**: Header + Kehadiran + Kelas Diampu + Slip Bisyaroh personal
- **MasterDataView**: 7 tabs (Lembaga/Jabatan/Guru/Santri/Rapor/Rekap/Audit), CRUD Jabatan, predikat rules, BG rapor upload
- **AppSidebar**: 3-zone (top mint logo, middle white menus, bottom mint footer)
- **ProfilPengaturanSaya**: 9 cards modal (sandi, foto, username, wa, wa_wali, ttd, ekgq, google, notif)

## What's Done in This Session

1. Recover semua truncated files
2. Verify all Vue source files syntax balanced (template/script/style + braces + parens)
3. Verify all script blocks pass `node --check` (JS syntax OK)
4. Install Linux rollup binary di node_modules untuk build di sandbox
5. Fix root `package.json` corruption
6. Successful build (1693 modules)
7. Sync dist ke `public/vue/`

## What Kyai Needs to Do

1. **`npm run firebase:deploy`** — deploy ke Firebase Hosting
   - Akan rebuild Vue di Windows (works because Windows has native deps), copy ke public/vue, deploy multi-target (ammuonline + portal-mambaul-ulum)
2. **Smoke test** di browser setelah deploy
3. Kalau perlu rebuild AAB: **`npm run build:aab`**

## Lessons Learned

- Windows mount truncation bukan one-off — bisa hit MULTI file sekaligus dalam sesi maraton edit. Skala 19 Mei: 12 file rusak bareng.
- **Wajib scan agresif** sebelum claim build done. Build error message hanya nunjuk file PERTAMA yang gagal — banyak lagi di belakang.
- Read tool nampaknya keep CACHED content lebih lengkap dari disk (file_state tracking), jadi recovery via Read+outputs+cp masih bisa walaupun disk truncated.
- Recovery script siap di memory: `feedback_windows_mount_truncation_scope.md`

Versi: v.20.0526 (no change in version number since recovery is restoration, bukan feature baru)
