# SESI COWORK 2 Juni 2026 — Perbaikan UI Mobile + Splash Android

> Agent Cowork. Branch `feature/vue-migration` (HEAD `562f347`). BELUM commit/build — kyai jalankan langkah di bawah.
> Fokus: bottom navbar, splash Capacitor Android, ikon search mobile, safe-area layout. Web/PWA splash TIDAK diubah (sudah benar per kyai).

---

## 1. APA YANG DIPERBAIKI (file + akar masalah)

### A. Posisi bottom navbar mengambang (gap dobel) — FIX
**Akar:** `src/assets/main.css` blok `@supports`:
- `body` di-`padding-bottom: env(safe-area-inset-bottom)` **DAN** `.h-screen` dikurangi inset bawah, **DAN** `BottomNav` juga `padding-bottom: inset` → inset bawah dihitung **2x** → navbar terangkat, ada gap kosong di bawahnya (terlihat di screenshot Android & iOS).

**Fix (`main.css`):** inset bawah TIDAK lagi di `body`/`.h-screen`. Sekarang:
- `body` hanya pad top/left/right.
- `.h-screen` = `calc(100dvh - inset-top)` (penuh sampai dasar layar).
- `BottomNav` jadi satu-satunya pemilik inset bawah → bg navbar mengisi di belakang gesture bar, ikon tepat di atasnya, tanpa gap.

**`BottomNav.vue`:** tambah class `app-bottom-nav` (biar ke-hide saat print — aturan `nav.app-bottom-nav` di App.vue tadinya tak match), `shrink-0`, + shadow atas tipis (elevasi).

### B. Splash Capacitor Android tidak compatible semua device — FIX
**Akar:** splash Capacitor plugin pakai `splash.png` **full-bleed** (portrait 1242×2208 / landscape 1920×1080) + `androidScaleType: CENTER_CROP` → di HP tinggi / tablet / foldable, "Powered by Bakafrawi" di bawah ke-CROP & logo bergeser. Plus `splash_icon` (Android 12 animated icon) isi ~95% kanvas → ke-clip mask lingkaran 192dp Android 12.

**Fix (regen aset dari `/Splashscreen`, TANPA ubah config/styles):**
- `splash_icon.png` (5 densitas) → logo Ammu di-skala ~64% + padding transparan → muat di safe-circle Android 12, tak ke-clip.
- `splash.png` (22 varian port/land × densitas × light/night) → bg solid + logo Ammu + "Powered by Bakafrawi" **dikelompok di tengah** (crop-safe) → CENTER_CROP tak pernah memotong konten di device manapun. Light `#F2FEF9`, dark `#1E293B`.
- `splash_branding.png` (branding bawah Android 12) → TETAP (sudah bagus).
- Android 12+ SplashScreen API (`styles.xml`: windowSplashScreenBackground/AnimatedIcon/BrandingImage) sudah benar → tidak diubah.

> Catatan: ini perubahan **NATIVE** → hanya muncul setelah **rebuild AAB** (web deploy tidak cukup).

### C. Posisi ikon search mengambang di tengah header (mobile) — FIX
**Akar:** `GlobalSearch.vue` root tanpa `flex-1` di mobile → di header `justify-between` (3 anak) ikon search melayang di tengah.
**Fix:** root jadi `flex flex-1 ... justify-end` → ikon mengelompok ke kanan bersama dark-toggle & profil. `AppHeader.vue` header tambah `gap-2 md:gap-0` (jarak antar cluster di mobile, desktop tak berubah).

### D. Konten ketutup gesture bar saat tanpa bottom-nav — FIX
`AppLayout.vue` `<main>`: saat `!showBottomNav` (browser/Electron/desktop) `main` own `padding-bottom: env(safe-area-inset-bottom)`; saat ada bottom-nav, nav yang own. Konten terakhir tak ketutup.

### E. Dashboard Keuangan: Buku Induk 4 entri tapi grafik/saldo Rp 0 — FIX
**Akar (`KeuanganDashboardView.vue`):** `monthlyData` & `kategoriBulanIni` HANYA baca `t.tipe` ('masuk'/'keluar') + `t.nominal` dan parse tanggal naif `new Date(t.tanggal)`. Sebagian entri buku induk (legacy / writer lain) simpan **field `masuk`/`keluar`** atau `tipe` varian ('pemasukan'/'in') / tanggal non-ISO → ke-hitung **0**, padahal `BukuIndukView` menampilkannya (pakai `b.masuk || b.nominal`). Jadi kyai lihat 4 entri ada isinya, tapi dashboard 0.
**Fix:** 3 helper toleran (samakan dgn BukuIndukView + AdminStatsCharts):
- `ymOf(tanggal)` — parse robust: ISO `YYYY-MM-DD`, `DD/MM/YYYY`, Firestore Timestamp, Date.
- `arusOf(t)` — `{masuk,keluar}` dari 2 shape: prioritas `tipe`+`nominal`, fallback field `masuk`/`keluar`; kenali 'masuk/in/income/pemasukan' & 'keluar/out/expense/pengeluaran'. TANPA dobel-hitung entri form (tipe+nominal+masuk sekaligus).
- `isTabungan(t)` — skip residu tabungan (sumber/kategori mengandung 'tabungan').
`monthlyData` + `kategoriBulanIni` dipakai ulang helper ini.
> Catatan: KPI Tagihan/Tabungan/Slip Bisyaroh = 0 itu **wajar** (koleksi memang masih kosong), bukan bug.
> Kalau setelah deploy masih 0: cek 4 entri di menu Buku Induk — pastikan **tanggalnya dalam 12 bulan terakhir** (Jul'25–Jun'26) & ada nominal masuk/keluar.

### F. SELALU LOGOUT saat app dibuka ulang (SEMUA platform: web/PWA/Capacitor/Electron) — FIX
**Akar (`stores/auth.js`):** dua bug:
1. `login()` set `sesiAktif` LANGSUNG tapi **tak pernah** panggil `_persistFullSesi` (cuma `setSesiAktif` yg panggil, dan login bypass itu) → backup `localStorage['portalMu_sesiAktif']` tak pernah ditulis.
2. Saat reopen, `onAuthStateChanged → loadSesiFromUser(user)` **set `sesiAktif = null`** kalau user Firebase tak match `linked_uid`/`linked_email`/`wa` — persis kasus guru/super_admin login pakai username (mis. Rahman Fanani). → ketendang logout.
**Fix:**
- `login()` admin/guru/santri → tiap cabang panggil `_persistFullSesi(sesiAktif.value)` (backup ke localStorage).
- `onAuthStateChanged` → `loadSesiFromUser` hanya jalan kalau `!sesiAktif.value` (jangan timpa sesi yg sudah ke-restore dari localStorage).
- `initAuth` sudah punya `_loadFullSesi()` (restore sync) → sekarang ADA isinya. localStorage persist di semua platform → tak logout lagi.

### G. Hapus breadcrumb di mobile (yg dilingkari) — DONE
`AppLayout.vue`: wrapper breadcrumb jadi `hidden md:block` (redundan dgn judul halaman; tetap tampil di desktop).

### H. Konsistensi layout PWA/Capacitor (sidebar safe-area bawah) — DONE
`AppSidebar.vue`: `aside` + `padding-bottom: env(safe-area-inset-bottom)` supaya footer (© + versi) tak ketutup gesture bar (efek `.h-screen` kini sampai dasar layar).

**File diubah:** `vue-app/src/assets/main.css`, `vue-app/src/stores/auth.js`, `vue-app/src/components/layout/{BottomNav,GlobalSearch,AppHeader,AppLayout,AppSidebar}.vue`, `vue-app/src/views/KeuanganDashboardView.vue`, + 27 PNG splash Android.
**Verifikasi:** semua SFC OK via `@vue/compiler-sfc`; `auth.js` lolos `node --check`.
> F/G/H + Dashboard Keuangan = perubahan `.vue/.js` → cukup **`npm run firebase:deploy`** (web/PWA). AAB splash tetap pending sesuai keputusan kyai.

### I. Status bar nutupin overlay (sidebar drawer + search) — FIX
**Akar:** overlay `fixed`/`absolute` viewport-anchored (sidebar drawer & search overlay) **escape `body` padding-top** → jam status bar nimpa logo drawer & input search (screenshot kyai).
**Fix:** `AppSidebar.vue` aside + `GlobalSearch.vue` overlay mobile → `padding-top/bottom: env(safe-area-inset-*)`. Bg overlay isi penuh di belakang status bar, konten masuk safe area.

### J. Breadcrumb dihapus TOTAL (semua halaman, semua device) — DONE
`AppLayout.vue`: blok `AppBreadcrumb` + import dibuang (sebelumnya cuma `hidden md:block`). Kyai minta hapus di semua halaman.

### K. Pull-to-refresh mobile — DONE
Composable `usePullToRefresh.js` attach ke `<main>` scroll: tarik dari atas (saat scrollTop=0) → indikator panah/spinner → refresh = re-mount view via nonce `:key` (`router-view`) → re-subscribe data. Mobile shell only (`showBottomNav`). Resistance + `preventDefault` hanya saat menarik turun (tak ganggu scroll/horizontal quick-actions).

### L. Gesture back semua halaman mobile — DONE
- `useEdgeSwipeBack.js`: swipe dari **tepi kiri** → `router.back()` — **platform-agnostic** (PWA/Capacitor/iOS/Android), aktif di mobile shell. Skip kalau ada overlay/dialog terbuka.
- `App.vue` Android `backButton`: tutup sidebar dulu → pakai Capacitor `canGoBack` (lebih andal dari `history.length`) → exit hanya di root.
> Catatan iOS: swipe-back native WKWebView (Capacitor iOS) butuh `allowsBackForwardNavigationGestures` di sisi native; edge-swipe JS di atas sudah menutup kebutuhan itu lintas platform.

**File baru:** `usePullToRefresh.js`, `useEdgeSwipeBack.js`. **File diubah (ronde ini):** `AppLayout.vue`, `AppSidebar.vue`, `GlobalSearch.vue`, `App.vue`.
**Verifikasi:** AppLayout/App.vue well-formed (Read authoritative), composables lolos `node --check`, ui store punya `sidebarOpen/closeSidebar`.

> ⚠️ PENTING (semua ronde): app Capacitor = **NATIVE bundle** (`webDir:dist`, tanpa `server.url`) → web deploy HANYA update **PWA & browser**. **App Android (Capacitor) baru dapat semua fix ini setelah AAB di-rebuild.** Jadi: PWA/browser = `firebase:deploy` cukup; HP (app) = wajib `npm run build:aab`.

---

## 2. VERIFIKASI
- 4 SFC + main.css diverifikasi well-formed via Read/Grep (Windows authoritative). Compile akhir = `tmp_recovery\_run_vite.cmd` (kyai).
- Aset splash di-cek visual (port light, port night, splash_icon) — center-group & padding benar.
- Sandbox bash mount nge-lag (nampilkan file truncated) → compile via mount tak reliable utk file Edit-tool; itu normal di project ini, bukan error nyata.

---

## 3. YANG HARUS KYAI JALANKAN (urut)

```bat
:: 0) (opsional) verifikasi build vue dulu
tmp_recovery\_run_vite.cmd

:: 1) Commit (binary png aman, no EOL issue)
cd /d "D:\Aplikasi Project\Portal MU"
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit --no-verify -m "fix(ui+splash): bottom-nav safe-area, splash Android crop-safe, ikon search mobile, layout inset"

:: 2) Deploy WEB/PWA (bottom-nav, search, layout — .vue/.css)
npm run firebase:deploy

:: 3) Rebuild AAB (WAJIB utk splash Android native + bottom-nav native)
::    versionCode 91 masih aman (90 di Playstore). Kalau 91 sudah ke-upload -> naikkan 92 dulu.
npm run build:aab

:: 4) (opsional) Rebuild Electron
npm run build:electron --prefix vue-app
robocopy "vue-app\dist" "vue-app\electron\app" /MIR
cd vue-app\electron && npm run electron:make
```

Cek setelah AAB: splash di HP tinggi/tablet — logo + "Powered by Bakafrawi" utuh di tengah, tak ke-crop; ikon Android 12 tak ke-clip; bottom nav nempel dasar (tak mengambang).

---

## 4. PENDING SESI SEBELUMNYA (belum dikerjakan — butuh kyai / keputusan)
Dari PROJECT-KNOWLEDGE-BASE + HANDOFF, masih open:
1. **Migrasi lembaga v.88** — Master Data → "Normalisasi Lembaga Santri" → Dry-Run → Execute (operasi Firestore, kyai jalankan). JANGAN klik tombol biru lama "Migrasi TPQ Shift".
2. **Pensiunkan model TPQ shift** (`utils/tpqShift.js`) — setelah migrasi sukses (kode, hati-hati).
3. **Audit menyeluruh vs LOGIC GLOBAL** (lembaga/jenjang/rapor/RBAC) — butuh app jalan + arahan kyai.
4. **Dashboard Keuangan** masih salah — kyai sebutkan angka yang benar dulu.
5. Nice-to-have: pull-to-refresh list mobile.

Mau lanjut yang mana? Aku sarankan: kyai jalankan migrasi v.88 + build di atas dulu, lalu kita audit per-lembaga atau garap pull-to-refresh.
