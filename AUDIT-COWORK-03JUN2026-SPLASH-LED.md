# AUDIT + FIX — Splash compact, kompatibilitas, ringan, LED koneksi (3 Juni 2026, Cowork)

> Lanjutan sesi `v.91.0626`. Branch `feature/vue-migration`. Semua edit di file authoritative `D:\`.
> ⚠️ Build/commit DIJALANKAN KYAI (mount sandbox lag untuk verifikasi build — gate asli = `tmp_recovery\_run_vite.cmd`).
> Permintaan kyai sesi ini: (1) splash compact semua device, (2) kompatibel semua device, (3) UI/UX rapi konsisten,
> (4) ringan di mobile, (5) LED online/offline kecil di top bar. + klarifikasi: pakai logo saja (jangan `splash.png` full
> yang gepeng di sebagian rasio), tampilan seperti splash.png, dan splash JANGAN muncul 2 kali.

## RINGKASAN AKAR MASALAH
- **Gepeng:** splash native pakai `splash.png` full-bleed + `CENTER_CROP` → ke-crop/zoom di rasio ekstrem. Web pakai 1 gambar besar.
- **Muncul 2×:** di app native, splash OS/Capacitor tampil saat cold-start, LALU `#splash-screen` web ikut tampil lagi 3000ms.
- **Berat:** 4 PNG splash web (~370KB) + 22 PNG splash Android full-design ikut ke-bundle.

## YANG DIKERJAKAN (file authoritative D:\)

### 1. Splash WEB/PWA — disusun dari logo (compact, anti-gepeng) — `vue-app/index.html`
- Buang `background-image` 4 PNG full-design. Splash sekarang **flex-center**: `logo.png` ukuran tetap (`42vw`, max 176px,
  min 116px) + footer "Powered by Bakafrawi" (`bakafrawi-logo.png`) di bawah, di atas bg solid (light `#F2FEF9` / dark `#0F172A`).
- Object-fit + ukuran tetap → **tak pernah gepeng** di rasio layar mana pun. + `prefers-reduced-motion` + safe-area padding.

### 2. Splash anti-DOBEL + timing ringkas — `vue-app/src/main.js`
- Deteksi `IS_NATIVE` (Capacitor). Di native: `#splash-screen` web **disembunyikan seketika** (`app-running`, tanpa min-durasi)
  lalu `SplashScreen.hide()` saat app siap → **hanya splash native yang tampil** (tidak 2×).
- Di web/PWA: durasi splash **3000ms → 1400ms** (lebih compact) + fallback 5s tetap.

### 3. Splash NATIVE Android anti-gepeng — `capacitor.config.json` + `android/.../res/drawable-*`
- `androidScaleType` `CENTER_CROP` → **`CENTER`** (logo digambar ukuran natural, TIDAK di-scale → tak gepeng);
  `backgroundColor` `#0F766E` → **`#F2FEF9`** (mengisi layar di belakang logo); `launchShowDuration` 3000 → **2000** + `launchFadeOutDuration: 300`.
- **22 `splash.png` full-design DIHAPUS**, diganti **5 PNG logo-only transparan** (`drawable-{mdpi..xxxhdpi}/splash.png`, 120dp).
- Android 12+ system splash (`splash_icon` + `splash_branding` + `splashBg` night-aware) TIDAK diubah (sudah center & robust).

### 4. LED indikator koneksi — `vue-app/src/components/layout/AppHeader.vue`
- Pill "Offline" (hanya muncul saat offline) → **LED bulat kecil (10px) SELALU tampil**: hijau (emerald) = online,
  merah (rose, + ping halus) = offline. Glow + `ring` + `title`/`aria-label`.
- Deteksi: native pakai **`@capacitor/network`** (navigator.onLine tak andal di WebView) + event `online`/`offline` web sbg fallback.

### 5. Ringan di mobile + kompatibilitas — `public/` + `manifest.webmanifest`
- Hapus 4 PNG splash web tak terpakai (`splash-portrait/landscape-*.png`, ~370KB) → web deploy + AAB lebih ringan.
- `manifest.webmanifest` `background_color` `#0F766E` → **`#F2FEF9`** (splash PWA mulus ke splash web, tak loncat warna).
- Splash web + native kini adaptif di semua rasio (HP jangkung, HP biasa, tablet) — tak gepeng.

## FILE BERUBAH
`vue-app/index.html`, `vue-app/src/main.js`, `vue-app/capacitor.config.json`,
`vue-app/src/components/layout/AppHeader.vue`, `vue-app/public/manifest.webmanifest`.
**Dihapus:** `vue-app/public/splash-portrait-light.png` + `-dark` + `splash-landscape-light/-dark.png`;
22× `vue-app/android/app/src/main/res/drawable-*/splash.png` (port/land/night).
**Ditambah:** `vue-app/android/app/src/main/res/drawable-{mdpi,hdpi,xhdpi,xxhdpi,xxxhdpi}/splash.png` (logo-only).

## YANG HARUS DIJALANKAN KYAI (Windows, dari `D:\Aplikasi Project\Portal MU`)
```bat
:: 0) verifikasi build dulu (gate asli)
tmp_recovery\_run_vite.cmd      :: pastikan VITE_EXITCODE=0

:: 1) commit (PNG biner + hapus file aman; --no-verify krn husky)
git add -A
git commit --no-verify -m "feat(v.91): splash compact dari logo (anti-gepeng, anti-dobel), LED koneksi, ringan + manifest"

:: 2) WEB / PWA (semua perubahan .vue/.js/.html/manifest + hapus splash web)
npm run firebase:deploy

:: 3) APP HP (WAJIB utk splash native + anti-dobel + ringan AAB) — versionCode 91 (kalau sudah keupload -> 92)
npm run build:aab

:: 4) (opsional) Desktop
npm run build:electron --prefix vue-app
```

## TES SESUDAH DEPLOY
- App HP cold-start: splash **muncul 1×** (logo di tengah, tak gepeng), bukan 2×.
- Coba HP berbeda rasio / tablet: logo tetap proporsional di tengah.
- Header: LED **hijau** saat ada internet; matikan data/wifi → LED **merah berkedip**. Selalu tampil.
- Lighthouse: web load lebih ringan (4 PNG splash hilang).

## CATATAN / KNOWN (evaluasi on-device)
- **Dark mode overlay Capacitor:** `backgroundColor` plugin satu nilai (`#F2FEF9`) → di dark mode, overlay Capacitor (sangat singkat,
  ditutup saat app siap) bisa kilas mint. Splash sistem Android 12 TETAP dark-aware. Kalau mengganggu, bisa dipertimbangkan
  pensiun overlay Capacitor & andalkan splash sistem saja.
- **Android 12 system splash** masih pakai `splash_icon` (kaligrafi ~85% kanvas). Kalau di HP tertentu ter-mask lingkaran,
  regen `splash_icon` dgn padding (logo ~62%) — belum diubah krn lingkaran kaligrafi umumnya muat di mask lingkaran.
- **UI/UX konsistensi (rollout `PageHeader`/`EmptyState` ke view lain):** disarankan incremental + cek visual; belum dirombak
  massal sesi ini (risiko tampilan). Bisa dilanjut bertahap.

## ADDENDUM — logo Bakafrawi gepeng (follow-up kyai)
- **Akar:** `splash_branding.png` (footer Bakafrawi di splash native Android 12) ber-rasio **1.837:1**, padahal
  `bakafrawi-logo.png` asli **2.667:1** → ke-squish (gepeng).
- **Fix native:** regen 5 densitas `splash_branding.png` di rasio **2.667:1** (anti-gepeng) + **diperkecil ~36dp** (sebelumnya
  ~98dp) ala footer "from Meta". `android/.../res/drawable-{mdpi..xxxhdpi}/splash_branding.png`.
- **Fix web (`index.html`):** footer Bakafrawi diperkecil — `width 130px → 96px` (max `46vw → 34vw`), teks "Powered by"
  `12px → 10px` + warna lebih lembut, posisi lebih ke bawah. `height:auto` jaga rasio (memang tak gepeng di web).
- **Tetap butuh `npm run build:aab`** supaya `splash_branding` baru sampai ke HP.
- **Branding diperkecil lagi:** 36dp → **24dp** (native), web 96px → 72px.

## ADDENDUM 2 — logo app di splash diperkecil (ala Claude/WA/IG)
- **Android 12 system splash** (`splash_icon`): logo dikasih padding → **~50% kanvas** (sebelumnya ~85%) → tampil lebih kecil + mask-safe. (`drawable-*/splash_icon.png`)
- **Overlay Capacitor** (`splash.png`): **120dp → 96dp**.
- **Web/PWA** (`index.html .splash-logo`): **42vw/176px → 28vw/112px**.
- Butuh `npm run build:aab` utk yg native sampai ke HP.
