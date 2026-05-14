# Phase 5 W2 — JamHijri Wire-Up Report

**Tanggal:** 14 Mei 2026
**Commit:** `c0fa81b`
**Versi:** `v.108.96.0514-w2-jamhijri-wire` (APP) / `v285-0514-w2-jamhijri-wire` (SW)
**Status:** ✅ Committed — Menunggu Kyai Smoke Test

---

## 📦 Yang Berubah

| File | Modifikasi | Lines |
|---|---|---|
| `public/index.html` | Add mount target `#vue-widget-jam-hijri` + feature flag block + script loader + bump APP_VERSION | +46 / -2 |
| `public/sw.js` | `/dist/widgets.js` ditambah `SHELL_URLS` + bump `SW_VERSION` | +2 / -1 |
| `public/dist/widgets.js` | Rebuild W0 minified production IIFE | 104,518 bytes (gzip 38.3 kB), 21 lines |

**Stat commit:** `3 files changed, 68 insertions(+), 5441 deletions(-)` (deletions = pretty old widgets.js → minified new).

---

## 🎯 Detail Edits

### Edit A — Vue Mount Target (`public/index.html` ~line 4905)
Sibling div setelah vanilla `#widget-hari-hijriyah` gradient card:
```html
                </div>
                <!-- v.108.96 Phase 5 W2: Vue widget mount target (toggle window._useVueJamHijri) -->
                <div id="vue-widget-jam-hijri" data-vue-widget="JamHijri" style="display:none"></div>
              </div>
```

### Edit B — APP_VERSION (line 16310)
- Sebelum: `v.108.95.0514-g1-g2-wire-up`
- Sesudah: `v.108.96.0514-w2-jamhijri-wire`

### Edit C — Feature Flag Block + Script Loader (line ~16349)
Setelah Sentry init `try-catch`, sebelum `// Wrapper aman` comment. 42 baris:
- 5 feature flags (`_useVueJamHijri`, `_useVuePostCard`, `_useVueKalenderMini`, `_useVueKalenderPendidikan`, `_useVueModalPOS`) — default OFF
- IIFE `loadVueWidgetsConditional()`: kalau ada flag ON, load `/dist/widgets.js` defer
- `onload`: mount Vue widget + hide vanilla
- `onerror`: fallback vanilla tampilkan (resilient)

### Edit D — sw.js
- `SW_VERSION = 'v285-0514-w2-jamhijri-wire'`
- `SHELL_URLS` tambah `/dist/widgets.js` (preload cache shell)

---

## 🧪 Smoke Test Instructions untuk Kyai

### Setup
1. **Deploy ke staging atau local Firebase emulator:**
   ```powershell
   cd "D:\Aplikasi Project\Portal MU"
   firebase serve --only hosting
   # atau
   firebase deploy --only hosting
   ```

2. **Buka app di browser** (Chrome/Edge recommended). Ctrl+Shift+R untuk hard refresh (force SW update).

### Test 1 — Default OFF (Regression Check)
1. Open app, login normal
2. Buka halaman Dashboard
3. ✅ **Verify:** Widget JamHijri vanilla render normal (gradient teal, day badge, Hijri text font-arabic, Masehi, jam realtime ticking)
4. ✅ **Verify:** DevTools Console — no error `[AmmuWidgets]`, no `[Phase 5]` log
5. ✅ **Verify:** DevTools Network — `/dist/widgets.js` TIDAK ter-load (karena flag OFF)
6. **Expected:** Identik dengan v.108.95 (no visible change)

### Test 2 — Toggle Vue ON
1. DevTools Console:
   ```js
   window._useVueJamHijri = true;
   location.reload();
   ```
2. ✅ **Verify:** Hard refresh, Network tab load `/dist/widgets.js` (status 200, size ~104 KB)
3. ✅ **Verify:** Console log: `[AmmuWidgets] ready — PostCard, JamHijri, KalenderMini, ModalPOS, KalenderPendidikan`
4. ✅ **Verify:** Vanilla `#widget-hari-hijriyah` HIDDEN (CSS `display: none`)
5. ✅ **Verify:** Vue widget `#vue-widget-jam-hijri` RENDER (gradient teal Vue version, jam ticking)
6. ✅ **Verify:** Jam Vue update setiap detik
7. ✅ **Verify:** Hijri text & Masehi update (read `window.savedSettings.kalibrasiHijri` kalau ada)

### Test 3 — Toggle OFF Lagi
1. DevTools Console:
   ```js
   window._useVueJamHijri = false;
   location.reload();
   ```
2. ✅ **Verify:** Vanilla render kembali
3. ✅ **Verify:** Vue mount target hidden lagi

### Test 4 — Error Resilience (Optional)
1. DevTools Network → Throttling: Offline
2. Toggle: `window._useVueJamHijri = true; location.reload();`
3. ✅ **Verify:** Console error `[Phase 5] Vue bundle load fail`
4. ✅ **Verify:** Vanilla widget tetap visible (fallback)

### Test 5 — SW Cache Hit
1. After Test 2, refresh app sekali lagi (Ctrl+R)
2. DevTools → Application → Cache Storage → `mu-shell-v285-0514-w2-jamhijri-wire`
3. ✅ **Verify:** Cache contains `/dist/widgets.js`
4. ✅ **Verify:** Network tab: `widgets.js` served from `ServiceWorker` (instant)

---

## ⚠️ Known Limitations / Caveats

| Limitation | Impact | Mitigation |
|---|---|---|
| Vanilla `updateJamRealtime()` setInterval tetap jalan saat flag ON | Low — update hidden element, no UI impact | Bisa di-pause saat flag ON nanti (opsional optimization, defer) |
| `widget-hari-hijriyah` selector di CSS body.dark-mode line 2089, 2096 | Saat flag ON, vanilla hidden — dark-mode CSS no longer apply | Vue widget punya scoped CSS dark mode sendiri (line 77-80 JamHijri.vue) ✅ |
| Bundle load = async defer | First-load saat flag ON ada momen blank target | Acceptable: ~100ms delay, vanilla hidden saat onload fire |
| Feature flag tidak persist | Reload page = flag reset OFF | By design (sesuai approved decision: default OFF + console toggle) |

---

## ✅ Acceptance Criteria

- [x] Mount target `<div id="vue-widget-jam-hijri">` ditambah (additive, default hidden)
- [x] Feature flag `window._useVueJamHijri` default OFF
- [x] Script `/dist/widgets.js` conditional load
- [x] `onerror` fallback ke vanilla
- [x] SW SHELL_URLS include `/dist/widgets.js`
- [x] APP_VERSION + SW_VERSION bumped
- [x] Commit `c0fa81b` di branch main
- [ ] **Smoke test Test 1-5 sukses** (Kyai action)
- [ ] **No regression vanilla functionality** (Kyai confirm)

---

## 🎯 Next Step

Setelah Kyai konfirmasi smoke test PASS:
- Lanjut **W4 KalenderMini wire-up** (LOW risk, similar pattern)

Kalau smoke test FAIL:
- Saya investigate root cause
- Adjust widget atau wire-up logic
- Re-commit fix sebelum lanjut W4
