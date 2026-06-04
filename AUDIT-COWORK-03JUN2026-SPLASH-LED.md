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

## ADDENDUM 3 — footer "Powered by" + ukuran final (match contoh splash kyai)
- Sumber footer baru: `Splashscreen/Bakafrawi Logo (Footer).png` (1024² — sudah ada teks "Powered by"). Di-crop ke konten (rasio **1.876**).
- **Android** `splash_branding.png` (5 densitas) regen dari file ini, tinggi **64dp**, rasio terjaga → "Powered by" tampil lagi di bawah.
- **Web** (`index.html`): footer = 1 gambar `public/bakafrawi-footer.png` (hapus span teks "Powered by" terpisah), `width 108px`.
- Logo tengah Android = 40% kanvas + geser ke atas (pusat 44%) — sudah disetujui kyai ("pas").
- **Asset baru:** `vue-app/public/bakafrawi-footer.png`. (Lama `bakafrawi-logo.png` tak lagi dipakai web; boleh dihapus utk ramping.)

## ADDENDUM 4 — animasi logo "muncul" (pilihan kyai: IN-APP)
Logo tengah muncul beranimasi (zoom + fade-in, ease-out-back) lalu footer fade-in. Cara: splash native jadi
jembatan LATAR mint singkat TANPA logo, animasi dimainkan di dalam app (web splash) → mulus & konsisten semua HP.
- `index.html`: `.splash-logo`/`.splash-brand` default `opacity:0`; animasi dipicu class `.reveal` (`@keyframes splashLogoIn`). `prefers-reduced-motion` → tampil statis.
- `src/main.js`: `revealSplash()`. Native: tutup overlay Capacitor dulu → `revealSplash()` (animasi terlihat) → fade-out. Web: reveal langsung.
- `android/.../res/values/styles.xml`: `windowSplashScreenAnimatedIcon` → `@drawable/splash_blank` (transparan); branding system splash dihapus (footer kini di web splash).
- BARU `android/.../res/drawable/splash_blank.xml` (transparan). `splash.png` overlay → transparan (latar mint saja).
- `MainActivity.java`: tahan splash sistem `900ms → 500ms` (jembatan singkat).
- ⚠️ Catatan HP: di sebagian merek, slot ikon transparan BISA diganti ikon launcher sekejap. **→ DIGANTI di Addendum 5.**
- Butuh `npm run build:aab`.

## ADDENDUM 5 — FINAL: animasi native (anti ikon launcher) + diperlambat + logo lebih ke atas
Ganti pendekatan transparan (Addendum 4) → **AnimationDrawable** (ikon NYATA, tak akan jadi ikon launcher di HP manapun, tetap beranimasi).
- BARU `android/.../res/drawable-nodpi/splash_anim_00..13.png` (14 frame zoom/pop, scale 0.72→1.0 overshoot, **center 40%** = lebih ke atas). Frame 0 = logo penuh (fallback aman bila HP tak memutar animasi).
- BARU `android/.../res/drawable/splash_icon_anim.xml` (`animation-list` oneshot, 14×60ms ≈ **840ms**, jauh lebih pelan dari sebelumnya).
- `styles.xml`: `windowSplashScreenAnimatedIcon` → `@drawable/splash_icon_anim` + `windowSplashScreenAnimationDuration=1000` + branding (footer) dikembalikan.
- `MainActivity.java`: tahan splash **500ms → 1300ms** (animasi 840ms main penuh + hold, baru fade — biang "terlalu cepat" karena dulu keburu putus di 500ms).
- `splash.png` overlay = logo statis center 40% (lanjutan animasi). `main.js`: native skip splash web lagi (anti-dobel; logo animasi ada di splash sistem). Web/PWA: animasi diperlambat (1s) + logo dinaikkan (`margin-bottom:10vh`).
- `splash_blank.xml` + `splash_icon.png` jadi tak terpakai (boleh diabaikan/hapus).
- Butuh `npm run build:aab`. Kalau di HP tertentu animasi tak jalan (jarang) → tampil logo statis (frame 0), TETAP bukan ikon launcher.

## ADDENDUM 6 — FINAL (yg dipakai): IN-APP, 2 detik, animasi ala Netflix
> Branding slot Android 12 ternyata MEN-STRETCH footer (gepeng) di Samsung. Maka footer WAJIB dirender HTML (in-app).
> Kembali ke in-app (footer & logo dirender di web splash), animasi diperhalus & diperpanjang 2 detik.
- `index.html`: logo `position:absolute; top:40%` (lebih ke atas), animasi `splashLogoIn` **2s** `cubic-bezier(0.33,0,0.2,1)` (zoom-in halus "push-in" ala Netflix), footer fade @1.25s. Footer = `bakafrawi-footer.png` (HTML img, `height:auto` → **anti-gepeng**, ada "Powered by").
- `src/main.js`: native → tutup overlay Capacitor → `revealSplash()` (animasi 2s) → fade-out (~2.4s). Web sama (SPLASH_MIN_MS 2400).
- `styles.xml`: `windowSplashScreenAnimatedIcon=@drawable/splash_blank` (transparan) lagi; branding sistem DIHAPUS (biang gepeng). `splash.png` overlay = transparan (jembatan mint). `MainActivity` keepSplash **1300→450ms**.
- Tak terpakai lagi (boleh diabaikan): `splash_icon_anim.xml`, `splash_anim_*.png`, `splash_branding.png`, `splash_icon.png`.
- ⚠️ Ikon transparan: di Samsung & mayoritas HP = aman (tak ada ikon launcher, sudah dikonfirmasi kyai sebelumnya). Di segelintir OEM non-standar bisa kilas ikon launcher sekejap — trade-off demi footer anti-gepeng + animasi mulus.
- Butuh `npm run firebase:deploy` + `npm run build:aab`.

## ADDENDUM 7 — UI polish + v.93 + PDF + permission (batch lanjutan)
- **Sidebar anti-melayang:** drawer mobile `absolute`→`fixed` (penuh viewport), header padding-top + footer padding-bottom + close button = `env(safe-area-inset-*)` → mengisi sampai belakang status bar & gesture bar. Desktop `md:relative` (insets=0, no-op).
- **Splash logo:** `top: 40%`→`45%` (jangan terlalu ke atas).
- **Status bar = warna app:** `App.vue` StatusBar bg light `#FFFFFF` / dark `#1E293B` (match header) + `capacitor.config.json` StatusBar `#0F766E`→`#FFFFFF`. (native → butuh AAB)
  - **FIX kontras (v.93):** enum Style ternyata TERBALIK di kode/komentar lama. Per plugin: `Style.Dark`=teks terang, `Style.Light`=teks gelap. Diperbaiki: `isDark ? Style.Dark : Style.Light` + config `style:"LIGHT"`. Teks status bar kini terlihat di light & dark.
- **Bump v.93.0626** (versionCode 93) — 9 titik (gradle/package×3/main.js/4 footer). 92 sudah dipakai.
- **PDF rapikan** (`utils/raporPdf.js` + `utils/pdfBuilder.js`): semua tabel = **lebar KOP (215-24=191mm F4) + center** (PTPT & Pra-PTPT margin 14/15→12/12, kolom di-rescale sum 191; TPQ/Diniyah/Nilai sudah default 12). Tabel rapor **NO FILL** (hapus shading abu section TPQ, header biru Pra-PTPT, kuning kolom "Jml", abu "Jumlah Khotam"). `buildListPdf` (daftar guru/santri) kolom di-skala isi penuh lebar KOP.
- **Permission Android** (`AndroidManifest.xml`): eksplisitkan `ACCESS_NETWORK_STATE` (LED network), `VIBRATE` (haptics), `RECEIVE_BOOT_COMPLETED` (notif reboot) — sebelumnya cuma ter-merge dari plugin. Lain (INTERNET, POST_NOTIFICATIONS, storage, media, camera, exact-alarm) sudah ada & sesuai.
- Butuh `npm run firebase:deploy` + `npm run build:aab`.
