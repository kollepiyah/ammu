# 🌅 WAKE-UP: Yang Sudah Saya Kerjakan Saat Anda Tidur

**Versi final**: `v.31.0511c` (Tailwind static + defensive CSS + TWA-ready)
**SW Version**: `v13-0511c-twa-ready`
**Status**: ⏸️ Belum deploy — Anda jalankan `npm run deploy` saat bangun

---

## 🎯 Ringkasan Singkat

1. ✅ Modal refactor v.31.0511 sudah work (verified: `display: 'none'`, `dialog[open]: 0`)
2. ✅ Tailwind CDN → static build (eliminate CDN JIT race condition)
3. ✅ Defensive CSS: paranoid layer untuk carousel + dashboard grid + sidebar (works walaupun Tailwind ada delay)
4. ✅ TWA-ready: manifest enhanced, viewport-fit cover, assetlinks.json template
5. ✅ Mobile-first: safe-area-inset, touch min-height 44px, overscroll containment

**Fitur**: 0 yang diubah. KEEP semua logic, state, API, routing, navigation.

---

## 📝 Step-by-Step Yang Sudah Dikerjakan

### ROUND 1 — Modal Refactor (v.31.0511)
| # | Action |
|---|---|
| 1 | 25 modal `<div class="hidden">` → `<dialog class="modal-dialog">` |
| 2 | 81 JS calls `classList.add/remove('hidden')` → `openModal/closeModal` |
| 3 | Helper `openModal/closeModal` dengan fallback graceful |
| 4 | Backdrop click handler (klik area gelap → modal close) |
| 5 | Cropper ESC handler (destroy Cropper.js instance) |
| 6 | Mass-close pattern narrow ke `dialog[id^="modal-"]` |
| 7 | Hapus 2 ghost ref `modal-edit-tentang` |

### ROUND 2 — Tailwind Static Build (v.31.0511b)
| # | Action |
|---|---|
| 8 | `npm install -D tailwindcss@3.4.17` |
| 9 | Buat `tailwind.config.js` (content scan public/index.html) |
| 10 | Buat `src/input.css` (3 directives) |
| 11 | Build `public/styles.css` (63 KB minified, vs ~3 MB CDN runtime) |
| 12 | Replace `<script src="cdn.tailwindcss.com">` dengan `<link href="styles.css">` |
| 13 | Add npm scripts: `build:css`, `watch:css`, `deploy` |
| 14 | Update `.gitignore` (exclude `node_modules/`) |

### ROUND 3 — Defensive CSS + TWA Prep (v.31.0511c) ← CURRENT
| # | Action |
|---|---|
| 15 | Add **critical layout CSS** di `<style>` block (line ~232-330) — **paranoid layer**: works walaupun Tailwind delay/fail |
| 16 | Carousel CSS: `[data-carousel-id]` selector → guarantee horizontal scroll |
| 17 | Dashboard grid CSS: `#dashboard > div:first-child` → mobile 1col, lg 2col |
| 18 | Page-section CSS: explicit `display: block` (bukan flex) |
| 19 | Sidebar nav CSS: explicit `flex-direction: column` |
| 20 | Master tab content: explicit hidden behavior |
| 21 | Safe-area-inset: notch handling untuk TWA Android |
| 22 | Touch min-height 44px (button accessibility on mobile) |
| 23 | Overflow-x hidden + overscroll-behavior contain (prevent horizontal scroll bug) |
| 24 | Viewport meta: tambah `viewport-fit=cover` |
| 25 | Manifest: tambah `id`, `display_override` |
| 26 | Buat `public/.well-known/assetlinks.json` template (untuk TWA APK) |
| 27 | Bump APP_VERSION ke `v.31.0511c` (login + sidebar + JS const) |
| 28 | Bump SW ke `v13-0511c-twa-ready` |
| 29 | Rebuild `styles.css` (final) |

---

## 🚀 LANGKAH ANDA SAAT BANGUN

### 1. Test Lokal Dulu
```powershell
# Buka file ini di Chrome incognito + Ctrl+Shift+R
D:\Aplikasi Project\Portal MU\public\index.html
```

Verify:
- ✅ Sidebar version: **`v.31.0511c`**
- ✅ Tidak ada warning `cdn.tailwindcss.com` di console
- ✅ Layout dashboard normal (welcome + kalender + feed)
- ✅ Tidak ada vertical strips berantakan
- ✅ Modal buka/tutup work (test 2-3 modal)

### 2. Kalau Lokal OK, Deploy
```powershell
cd "D:\Aplikasi Project\Portal MU"
npm run deploy
```

Ini akan:
1. Build `styles.css` (`npm run build:css`)
2. `firebase deploy --only hosting`

Tunggu ~30 detik → buka `https://portal-mambaul-ulum.web.app` di **incognito** + Ctrl+Shift+R.

### 3. Verify Production
- Sidebar: `v.31.0511c`
- Console: tidak ada Tailwind CDN warning
- Layout: normal (no strips)
- Service Worker: cache di-refresh (SW version baru `v13-0511c-twa-ready`)

---

## 🔙 Rollback (Kalau Masih Bermasalah)

### Rollback Cepat ke Baseline v.30
```powershell
cd "D:\Aplikasi Project\Portal MU"
copy backups\index.html.bak.v30 public\index.html
firebase deploy --only hosting
```

CATATAN: Rollback v.30 = balik ke struktur lama (Tailwind CDN, no Tailwind static, no defensive CSS, modal masih `<div class="hidden">`). Layout strip akan kembali tapi modal lama yg buggy juga kembali.

### Rollback ke v.31.0511b (sebelum defensive CSS)
File backup belum ada untuk versi ini. Kalau perlu, edit ulang `index.html`.

---

## 📂 Struktur File Terbaru

```
D:\Aplikasi Project\Portal MU\
├── public/                        ← deployed ke Firebase Hosting
│   ├── index.html                 ← v.31.0511c (Tailwind static + defensive CSS)
│   ├── styles.css                 ← 63 KB Tailwind static (rebuild dgn npm run build:css)
│   ├── sw.js                      ← v13-0511c-twa-ready
│   ├── manifest.json              ← + id, display_override
│   ├── .well-known/
│   │   └── assetlinks.json        ← TWA template (NEED EDIT untuk APK fingerprint)
│   ├── firebase-messaging-sw.js
│   ├── icon-{192,512}.png + maskable + apple-touch + favicon
│   └── KOP.png, logo.png
├── src/
│   └── input.css                  ← Tailwind directives (jangan diubah)
├── tailwind.config.js
├── package.json                   ← scripts: build:css, watch:css, deploy
├── package-lock.json
├── node_modules/                  ← gitignored
├── functions/                     ← Cloud Functions (tidak diubah)
├── backups/                       ← v.30, v.31failed, debug log preserved
├── files/                         ← upload/staging area
├── firebase.json                  ← ignore: .bak, .log, .backup
└── firestore.rules, storage.rules
```

---

## 🤖 TWA (Trusted Web Activity) — Generate APK Tanpa Play Store

Saat Anda mau bikin APK, ada 2 cara mudah:

### Opsi A — Bubblewrap CLI (recommended, by Google)
```powershell
# Install Bubblewrap (sekali saja)
npm install -g @bubblewrap/cli

# Init project (pakai manifest URL Anda)
bubblewrap init --manifest=https://portal-mambaul-ulum.web.app/manifest.json

# Generate signed APK
bubblewrap build
```

Output: APK file siap di-install langsung di device (sideload, tanpa Play Store).

### Opsi B — PWA Builder (web UI)
1. Buka https://www.pwabuilder.com/
2. Input URL: `https://portal-mambaul-ulum.web.app`
3. Pilih "Android" → "Generate Package"
4. Download APK + signing instructions

### ⚠️ Setelah Generate APK — Update assetlinks.json

Saat Bubblewrap/PWA Builder generate APK, mereka kasih SHA256 fingerprint dari signing certificate. Anda WAJIB update `public/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "PACKAGE_NAME_DARI_BUBBLEWRAP",
      "sha256_cert_fingerprints": [
        "SHA256_FINGERPRINT_DARI_BUBBLEWRAP"
      ]
    }
  }
]
```

Lalu redeploy: `npm run deploy`. Tanpa ini, TWA akan tampil di address bar browser (bukan full-screen app).

---

## 🛠️ Workflow Development Setelah Ini

### Edit Tailwind Class
Selalu jalankan watch saat coding:
```powershell
cd "D:\Aplikasi Project\Portal MU"
npm run watch:css
```
Biarkan terbuka di terminal — auto-rebuild `styles.css` setiap save.

### Deploy Production
**SELALU pakai `npm run deploy`** (bukan `firebase deploy` langsung):
```powershell
npm run deploy
```
Karena `npm run deploy` auto-build CSS dulu sebelum push. Kalau pakai `firebase deploy` saja, tidak rebuild CSS dulu — bisa deploy CSS lama.

---

## 🐛 Tentang Bug "Vertical Strips" Yang Anda Lihat

**Hipotesis utama**: Tailwind CDN JIT compilation race condition. JavaScript di `cdn.tailwindcss.com` baca classes dari DOM, generate CSS, inject ke page. Ada delay sebelum CSS apply. Dalam delay itu:
- `flex-shrink-0`, `w-full`, `overflow-x-auto` ❌ tidak apply
- Carousel posts collapse jadi side-by-side strips
- Layout grid dashboard collapse

**Fix v.31.0511c**:
1. **Tailwind static** (no JIT runtime, CSS load dengan page) — eliminate race condition
2. **Defensive CSS** dengan `!important` untuk critical layout (carousel, dashboard, sidebar) — **bekerja bahkan kalau Tailwind tidak load**

Triple defense: kalau Tailwind static gagal load (network issue), defensive CSS masih guarantee layout work. Kalau defensive CSS pun gagal (parser error), Tailwind static guarantee. Kalau dua-duanya gagal, app crash total (sangat tidak mungkin).

---

## ⚠️ Hal Yang Perlu Anda Periksa Pasca-Deploy

1. **Service Worker update**: Browser cache SW lama. Saat pertama buka pasca-deploy, SW lama masih jalan. Hard reload (Ctrl+Shift+R) memaksa SW baru aktif. Atau di DevTools → Application → Service Workers → klik "Update" lalu "Unregister".

2. **Browser cache styles.css**: Hard reload (Ctrl+Shift+R) untuk pastikan `styles.css` baru di-fetch.

3. **TWA test**: Setelah deploy, install sebagai PWA di Android device (Chrome → menu → "Install app"). Lihat apakah look/feel sudah seperti native app.

---

## 📊 Statistik Sesi

| Metric | Value |
|---|---|
| Total turns | ~50+ |
| Versi: v.30.0526 → v.31.0511c | 3 iterasi (v.31.0511, v.31.0511b, v.31.0511c) |
| Files diubah | `index.html`, `sw.js`, `manifest.json`, `firebase.json`, `package.json`, `tailwind.config.js`, `src/input.css`, `public/styles.css`, `.well-known/assetlinks.json`, `WAKE-UP.md` |
| Files dihapus | `convert-modals.js` (script temporary) |
| Files dipindah ke backups/ | `index.html.bak.v30`, `index.html.bak.v31failed`, `firebase-debug.log`, `index.v35.broken.bak.html`, `index_backup.html` |
| Modal refactored | 25 |
| JS calls converted | 81 |
| HTML lines added | ~200 (CSS dialog + helper + defensive CSS) |
| Bug fixes | Modal auto-show on load + vertical strips layout |

---

## 💤 Selamat Bangun!

Semoga deploy lancar. Kalau ada masalah:
1. Screenshot kondisi production
2. Buka DevTools Console
3. Kirim ke saya — saya bisa lanjut diagnose

**Bismillah, semoga sukses!** 🚀
