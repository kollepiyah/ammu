# Ammu Online — Portal Mambaul Ulum

Aplikasi manajemen Pondok Pesantren Mambaul Ulum (Sidoarjo, Jawa Timur): data santri & guru, akademik (rapor, tes kenaikan, prestasi), absensi (termasuk integrasi mesin sidik jari), keuangan (tagihan, tabungan, bisyaroh), dan pendaftaran santri baru (PSB).

**Live:** https://ammuonline.web.app · **PSB:** https://ammuonline-psb.web.app

---

## Stack

- **Frontend:** Vue 3 + Vite + Pinia + Vue Router (hash mode) + Tailwind CSS, PWA (service worker).
- **Backend:** Supabase — Postgres (RLS), Auth, Storage, Edge Functions (Deno), Realtime, pg_cron.
- **Hosting:** Firebase Hosting (2 site: utama + PSB).
- **Push notif:** Firebase Cloud Messaging (FCM) sebagai transport; dispatch via Supabase Edge Function.
- **App Check:** reCAPTCHA v3 (web) / Play Integrity (Android) — defense-in-depth.
- **Native:** Capacitor (Android → Play Store) + Electron (desktop, modul sync absensi sidik jari).

> **Catatan arsitektur:** Data, Auth, dan Storage **sepenuhnya Supabase** (migrasi penuh dari Firebase Firestore selesai). Firebase kini tinggal Hosting + FCM + App Check. App lama berbasis HTML5 monolit (`public/index.html`) sudah pensiun.

---

## Struktur

```
Portal MU/
├── vue-app/              # Aplikasi utama (Vue 3) — portal admin/guru/wali
│   ├── src/
│   ├── android/          # Capacitor Android (build AAB Play Store)
│   └── electron/         # Electron desktop (modul sync absensi sidik jari)
├── vue-app-psb/          # Sub-app PSB (pendaftaran santri baru)
├── supabase/
│   ├── migrations/       # Skema + RLS + RPC + cron (SQL)
│   └── functions/        # Edge Functions (Deno): dispatch-push, auto-generate-tagihan, dll
├── functions/            # (legacy) Firebase Cloud Functions — sebagian besar sudah pindah ke Edge Functions
├── public/
│   ├── vue/              # Output build vue-app (di-serve Firebase site "main")
│   └── psb/              # Output build vue-app-psb (di-serve Firebase site "psb")
├── scripts/              # deploy-minified.cjs, build-aab.cjs, dll
├── docs/                 # Runbook aktif (Supabase deploy, roadmap, dll)
├── firebase.json         # Konfigurasi hosting (main + psb + legacy-redirect)
└── package.json
```

---

## Quick start

```bash
git clone <repo> && cd "Portal MU"
npm install
cd vue-app && npm install

# Dev server (Vite) — butuh vue-app/.env.local berisi kredensial Supabase
npm run dev
```

`vue-app/.env.local` berisi `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APPCHECK_RECAPTCHA_KEY`, dll — **tidak di-commit**.

---

## Deploy

```bash
# Build Vue + PSB lalu deploy ke 2 site Firebase Hosting
npm run firebase:deploy
```

- Deploy **wajib dari direktori utama** (yang punya `vue-app/.env.local`). Setelah deploy, hard-refresh / Incognito untuk menembus cache service worker.
- Perubahan skema / RPC / cron Supabase: `npx supabase db push`.
- Edge Functions + secret: lihat [docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md](docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md).

### Build native

```bash
npm run build:aab     # Android App Bundle (Play Store)
```

Modul absensi sidik jari (Electron): lihat [HANDOFF-FINGERPRINT-SYNC.md](HANDOFF-FINGERPRINT-SYNC.md).

---

## Fitur utama

- **Master data:** Santri, Guru/Pegawai, Lembaga (Qiraati / Sekolah formal / Non-lembaga).
- **Akademik:** Rapor semester (schema-driven per lembaga), Tes Kenaikan, Rekap Prestasi, Naik Kelas.
- **Absensi:** Santri (ngaji & sekolah) + Guru via mesin sidik jari (Fingerspot Revo + HiView ISAPI push).
- **Keuangan:** Tagihan (auto-generate via cron), Pembayaran, Tabungan, Bisyaroh, Buku Induk, Hutang/Piutang.
- **Dasbor Statistik:** KPI + grafik per-domain (santri / keuangan / akademik / absensi / pegawai).
- **PSB:** Pendaftaran santri baru (sub-app terpisah).
- **Notifikasi:** Push (FCM) + in-app, update realtime via Supabase.
- **Multi-peran:** super_admin, admin, admin_keuangan, guru, wali/santri (dijaga RLS Supabase).

---

## Keamanan

- **Auth:** Supabase Auth (email internal `<key>@ammu.local`); login via username / WA / NIS (RPC case-insensitive).
- **Otorisasi:** Row Level Security (RLS) per peran — gerbang utama akses data.
- **App Check:** reCAPTCHA (web) / Play Integrity (Android) — saat ini mode Monitoring.

**JANGAN commit:** `*.keystore`, `.env*`, service account key (`*firebase-adminsdk*.json`), `google-services.json`. Pre-commit hook (Husky) memblokir pola ini.

---

## Backup

GitHub Action harian (02:00 WIB) → `pg_dump` Supabase → rclone → Google Drive.

---

## Versioning

Format `v.{nomor}.{MMDD}` — contoh `v.110.0626`. Riwayat lengkap: [CHANGELOG.md](CHANGELOG.md).

---

## Lisensi

Proprietary — Pondok Pesantren Mambaul Ulum, Sidoarjo. Penggunaan internal.

Solo developer: **Rahman Fanani** (Bakafrawi Project).
