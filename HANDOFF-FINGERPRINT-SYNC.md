# Handoff — Sync Fingerprint ke App AMMU Desktop (Electron)

**Tanggal:** 24 Jun 2026 · **Branch:** `claude/busy-buck-5feb10` · **Sesi:** busy-buck

Tujuan: pindahkan sinkron absensi mesin fingerprint (yang tadinya skrip Python + Task
Scheduler) ke **dalam app AMMU Desktop (Electron)**, supaya PC baru cukup install
**Fingerspot Personnel + AmmuOnline-Setup.exe** (tanpa Python/skrip/repo).

---

## Status fase

| Fase | Isi | Status | Commit |
|------|-----|--------|--------|
| 1 | Main process baca `att_log` (IPC `fingerprint:read-attlog`) | ✅ SELESAI | `8c5dd46` |
| 2 | Composable sync + util shift (terverifikasi = `fp_sync.py`) | ✅ SELESAI | `2ecf97b` |
| 3 | UI Pengaturan (path/jadwal/status + tombol "Sinkron sekarang") + scheduler | ✅ SELESAI | (sesi quizzical-torvalds) |
| 4 | Build installer + uji E2E in-app + pensiun `fp_sync.py` | ⏳ TODO (butuh PC ber-Personnel) | — |

## Arsitektur final

```
mesin Revo → Fingerspot Personnel (auto-download, sudah ON) → MySQL fin_pro.att_log
                                                                     │
         ┌── AMMU Desktop (Electron) ──────────────────────────────┴─────────────┐
         │ MAIN  : readAttLog() — spawn mysqld throwaway di SALINAN datadir       │ ✅ F1
         │ RENDER: useFingerprintSync → deriveShift (utils/shiftDerive) → db.js   │ ✅ F2
         │ UI    : Pengaturan (path Personnel + jadwal + status) + scheduler      │ ⏳ F3
         └────────────────────────────────────────────────────────────────────────┘
```
Personnel **wajib** (jembatan protokol proprietary Revo — decode sendiri sudah divonis buntu 3×).
"Setting IP mesin" = ranah Personnel; AMMU cuma butuh **path Personnel + jadwal**.

## File yang sudah dibuat/diubah

- `vue-app/electron/src/fingerprint-sync.ts` — `readAttLog({personnelDir})` (port `fp_sync.py`, Node-only)
- `vue-app/electron/src/index.ts` — IPC handler `fingerprint:read-attlog`
- `vue-app/electron/src/preload.ts` — `electronAPI.readAttLog(config)`
- `vue-app/src/utils/shiftDerive.js` — logika shift PURE bersama (cermin AbsensiGuruView + fp_sync.py)
- `vue-app/src/composables/useFingerprintSync.js` — `sync({personnelDir, commit})` → ringkasan

## Fase 3 — SELESAI (sesi quizzical-torvalds, 24 Jun)

UI dibuka dari hub **Pengaturan Desktop** (card "Mesin Absensi", Electron-only) → halaman
`/mesin-absensi`. Build `npm run build:electron` exit 0, chunk MesinAbsensiView ter-emit.

File baru/diubah:
- `vue-app/src/stores/fingerprint.js` — **BARU**. Pinia store: config (personnelDir/autoSync/intervalMin,
  persist localStorage `ammu_fp_sync_cfg`) + status (running/lastSyncAt/lastResult/lastError/lastTrigger) +
  **scheduler `setInterval`**. Scheduler hidup di STORE (singleton) bukan di view → auto-sync tetap jalan
  walau pindah halaman. Default auto-sync **OFF** (hanya PC station yg di-enable manual). `runNow(trigger)`
  anti-overlap (guard `running`), tak melempar (error → `lastError`). `init()` 1× dari RibbonLayout.
- `vue-app/src/views/MesinAbsensiView.vue` — **BARU**. UI tipis di atas store: input path (commit on blur),
  toggle auto-sync + interval (min 5 mnt), tombol "Sinkron sekarang" (+toast), status terakhir, ringkasan
  (written/scan/skipIzin/skipSame/luar/takKenal) + tabel baris ditulis. Di web → notice "hanya di Desktop".
- `vue-app/src/views/PengaturanDesktopView.vue` — +card "Mesin Absensi" (flag `electronOnly`, di-gate `isElectron`).
- `vue-app/src/router/index.js` — +route `mesin-absensi` (lazy, meta admin).
- `vue-app/src/components/ribbon/RibbonLayout.vue` — `useFingerprintStore().init()` (resume auto-sync pasca-restart; root Electron-only).

Catatan: scheduler tick pertama menunggu 1 interval (TIDAK sync saat init) → hindari race dgn login/sesi.
Setsetan PER-PC (localStorage) — enable auto-sync hanya di PC station; PC lain biarkan OFF.

## Fase 4 — build & uji

- Build: `cd vue-app/electron && npm run electron:make` (NSIS → `dist/AmmuOnline-Setup.exe`).
  - ⚠️ **GOTCHA build di worktree:** `vue-app/electron/node_modules` harus **junction** ke main-worktree:
    `New-Item -ItemType Junction -Path "<wt>\vue-app\electron\node_modules" -Target "D:\Aplikasi Project\Portal MU\vue-app\electron\node_modules"`
  - `build/*.js` IKUT di-track git + di-prettier saat pre-commit.
- Uji E2E in-app: buka AMMU Desktop → Pengaturan → Mesin Absensi → "Sinkron sekarang" → cek `absensi_shift_guru` di Supabase.
- Setelah lolos: pensiunkan `fp_sync.py` + hapus Task Scheduler "AMMU Fingerprint Sync".

## Jembatan SEMENTARA (masih jalan, JANGAN dimatikan dulu)

- `C:\Users\Lenovo\fp_sync.py` + Task Scheduler **"AMMU Fingerprint Sync"** (tiap 30 mnt) — masih menyinkronkan absensi sampai modul Electron rampung & teruji. Matikan baru di akhir Fase 4.

## Catatan teknis penting

- **Sumber scan**: MySQL Personnel `fin_pro.att_log` (`pin` = guru.id_fingerprint, `scan_date` = WIB native, tanpa 'Z'). Password root MySQL hardcoded di binary → dibaca via **throwaway mysqld `--skip-grant-tables` di SALINAN datadir** (tanpa password, service :3309 tak tersentuh).
- **Window shift NYATA** (settings Supabase): pagi **06:00–12:00** telat 06:45, sore 15:00–17:15 telat 15:20, sekolah telat 10:30.
- **Auth sync**: pakai **sesi login** (RLS) — JANGAN service-key di app klien. `absensi_shift_guru` RLS: insert/update = `auth_can_akademik` (super_admin/admin/guru).
- **Guard**: jangan timpa baris status `izin`/`sakit`; skip baris identik. source `'fingerprint'` (auto) ≠ `'fingerprint_import'` (xlsx manual).
- Uji util Fase 2 (data nyata): 6 scan att_log → 2 kandidat (Rahman PIN 2: 06-23 & 06-24 pagi, keduanya 07:42/07:38 → terlambat). Akun uji: `demoplay@ammu.local` / `mu_auth_1234`.
- Repo: AMMU Electron = Electron 27, `vue-app/electron/`, build NSIS + auto-update GitHub (`kollepiyah/ammu`), v109.

## Prompt siap-tempel untuk sesi baru

> Lanjutkan **Fase 4** modul sync fingerprint di AMMU Desktop (Electron). Baca dulu
> `HANDOFF-FINGERPRINT-SYNC.md` di root repo. Fase 1-3 selesai & build hijau (UI Mesin Absensi
> + store scheduler `stores/fingerprint.js` + view `MesinAbsensiView.vue`). Kerjakan Fase 4 di
> **PC ber-Personnel**: `cd vue-app/electron && npm run electron:make` (junction node_modules dulu),
> uji E2E in-app (Pengaturan → Mesin Absensi → "Sinkron sekarang" → cek `absensi_shift_guru`),
> lalu pensiunkan `fp_sync.py` + hapus Task Scheduler "AMMU Fingerprint Sync". Panggil Kyai, ringkas.
