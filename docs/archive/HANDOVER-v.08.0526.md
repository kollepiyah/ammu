# 🤝 HANDOVER — Portal Mambaul Ulum v.08.0526

**Tanggal:** 12 Mei 2026
**Session terakhir:** Phase 1-6.2 (TWA migration + dark mode + polish + refactor)

---

## 📍 State Aplikasi Sekarang

| Komponen | Versi | Status |
|---|---|---|
| **Web `APP_VERSION`** | `v.08.0526` | ✅ Deployed |
| **`SW_VERSION`** | `v108-0526-lembaga-settings-refactor` | ✅ Deployed |
| **TWA Android (`appVersionName`)** | `v.02.0526` | ✅ Installed di HP |
| **TWA `appVersionCode`** | `2` | ✅ |
| **Firebase Hosting** | https://portal-mambaul-ulum.web.app | ✅ Live |

### Identitas TWA
- **Package:** `app.ammu.twa`
- **App display name:** "Ammu App"
- **Launcher name:** "Ammu"
- **SHA-256 fingerprint:** `5C:0C:27:BD:B6:FE:2B:71:13:9C:6B:13:91:18:82:C0:26:F2:9B:0C:52:C8:36:E4:87:FE:91:A0:28:B2:2C:60`
- **Theme color:** `#0F766E` (teal)
- **Splash bg:** `#FFFFFF` (putih) + logo Manshur transparent

---

## 📁 Lokasi File Penting

```
D:\Aplikasi Project\Portal MU\
├── public\
│   ├── index.html              (1.5 MB — main app)
│   ├── sw.js                   (Service Worker)
│   ├── manifest.json           (PWA manifest)
│   ├── .well-known\
│   │   └── assetlinks.json     (TWA verification)
│   ├── icon-512.png            (PWA icon original — gradient teal)
│   ├── icon-twa-512.png        (TWA icon square — transparent kaligrafi)
│   ├── icon-twa-192.png        (TWA icon small)
│   └── icon-512-transparent.png (logo asli kiriman kyai)
├── firebase.json
├── firestore.rules
├── DESIGN-SYSTEM-RULES.md      ⭐ (BARU — rules lengkap UI/UX)
├── HANDOVER-v.08.0526.md       ⭐ (file ini)
├── TWA-INTERNAL-SIDELOAD.md    (panduan TWA original)
├── ammu-app.keystore           ⚠️ (CRITICAL — backup minimal 2 lokasi!)

D:\Aplikasi Project\Ammu TWA\   (TWA project folder)
├── twa-manifest.json
├── app\
│   ├── build.gradle
│   ├── src\main\res\drawable-*\splash.png  (5 sizes — already transparent logo)
│   └── build\outputs\apk\release\app-release-unsigned.apk
└── app-release-v02-signed.apk  (APK siap install v.02)

D:\AndroidSDK\                  (Android SDK installation)
├── cmdline-tools\latest\
├── build-tools\34.0.0, 35.0.0, 36.0.0\
├── platforms\android-34, 35, 36\
└── platform-tools\

C:\Program Files\Eclipse Adoptium\
├── jdk-17.0.19.10-hotspot\     (untuk Bubblewrap/Gradle)
└── jdk-25.0.3.9-hotspot\        (untuk default `java` PATH)
```

---

## ✅ Yang SUDAH SELESAI di Session Ini

### Phase 1: TWA Migration (APK v.01 → v.02)
- ✅ Generate keystore `ammu-app.keystore`
- ✅ Setup assetlinks.json di Firebase (SHA-256 verified)
- ✅ Build APK via Gradle (Bubblewrap CLI Windows bug → bypass dengan gradle direct)
- ✅ Sign APK pakai apksigner
- ✅ Splash putih + logo Manshur transparent
- ✅ Performance quick wins (38 img `loading="lazy"`, defer scripts, preconnect)

### Phase 2: Rapor PKBM 4 TTD
- ✅ Tambah kolom TTD "PJ PTPT" di rapor Diniyah
- ✅ Conditional: hanya untuk lembaga **PKBM** atau **kelas VII-XII**
- ✅ Lembaga lain tetap 3 TTD (backward compat)

### Phase 3: Struk POS PDF Berwarna
- ✅ Existing implementation enhanced
- ✅ ACF santri auto-render di struk (Data Tambahan section)

### Phase 4: Struk POS Dot Matrix
- ✅ Default printer lebar `5.5"` → `9.5"` (Epson LX continuous form)
- ✅ Dialog 3 pilihan: LX-310 / PDF Berwarna / **Tidak Cetak** (cancel)

### Phase 5: Dark Mode OLED + Schema PKBM + ACF
- ✅ Dark mode palette OLED: body `#0a0a0a`, card `#18181b` (zinc-900), modal `#27272a`
- ✅ Text contrast naik signifikan (slate-400 #cbd5e1, etc)
- ✅ Schema preset PKBM (PPPH + PTPT + Diniyah Salaf) + tombol Apply di Schema Editor
- ✅ ACF santri render di struk POS (PDF berwarna + LX-310 dot matrix)

### Phase 6.1: Prompt Rename Label
- ✅ `tambahField`, `tambahSection`, `tambahMapelDiniyah`, `tambahJenjangDiniyah`, `_tambahFieldNilaiPraPtpt`, `_tambahLevelPraPtpt` → semua sekarang prompt user input nama label dulu (no more default "Field Baru")
- ✅ CSS bug fix: input + select flex layout (input wide, select 7rem fixed)

### Phase 6.2: Refactor Per-Lembaga Settings
- ✅ Schema Editor pindah dari modal global → inline di **Master Data → Lembaga → Pengaturan**
- ✅ ACF link section ditambah di Pengaturan Lembaga
- ✅ Modal lama tetap exist (renamed IDs `-modal`) untuk backward compat
- ✅ Helper functions: `_getSchemaContainer()`, `_inisialisasiSchemaInline()`, dll
- ✅ Pengaturan Web global menu Schema Rapor → redirect notice

---

## ⏳ Yang PENDING (Audit Senior Architect)

Berdasarkan audit DKV + UX, ada **technical debt** yang perlu dikerjakan:

### 🔴 P0 — Critical (Belum dikerjakan)
1. **Setup `tailwind.config.js`** — custom palette + design tokens
2. **Refactor modular** — split `index.html` jadi modules (long-term)
3. **Build system** — esbuild/Vite untuk minify + bundle
4. **Performance** — Lighthouse 32 → target 80+ (code split, lazy load Firebase)

### 🟡 P1 — Important UX
5. **`active:` state semua button** — visual press feedback (0× saat ini!)
6. **`focus:ring-*` semua interactive** — keyboard accessibility (9× saat ini)
7. **Replace 50% Swal → Toast** — less intrusive untuk success notification
8. **`disabled:` state standardize**

### 🟢 P2 — Polish
9. **Hapus 395 `onclick=` inline** → `addEventListener` + event delegation
10. **Tambah `xl:` dan `2xl:` breakpoints** (desktop besar belum optimal)
11. **Accessibility** — tambah `aria-*` (13× saat ini, perlu 50+)
12. **Reduce color drift** — 14 family → 6 family (brand + 5 semantic)

### 🔵 P3 — Long-term
13. Migrasi `body.dark-mode` → Tailwind native `dark:` variant
14. Migrasi ke Vue/React (kalau project tumbuh)

### 🚀 ULTIMATE GOAL — Migrasi Native App (Capacitor + Tauri)

**Project akhir Portal MU** (timeline 6-12 bulan ke depan):

#### Capacitor (Mobile Android + iOS) — Replace TWA
**Tujuan:** Native features yang TWA tidak bisa:
1. ✅ **Notifikasi konsisten** (FCM native + local notifications)
2. ✅ **Print langsung ke printer** (Bluetooth thermal, WiFi, USB)
3. ✅ Akses native: kamera, file system, NFC, location
4. ✅ Offline-first dengan sync
5. ✅ iOS support (bonus — bisa upload ke App Store kalau perlu)

**Plugin Capacitor yang akan dipakai:**
- `@capacitor/push-notifications` (FCM)
- `@capacitor-community/bluetooth-le` (printer Bluetooth)
- `cordova-plugin-printer` (print dot matrix Epson LX)
- `@capacitor/filesystem` (backup/export)
- `@capacitor/camera` (foto santri)
- `@capacitor/local-notifications` (reminder)
- `@capacitor/share` (share PDF)

**Migration effort:** ~1-2 minggu (existing web code reuse 95%)

#### Tauri (Desktop Admin Panel) — Optional
**Tujuan:** Admin panel di kantor pondok dengan akses native:
1. ✅ Print langsung ke printer dot matrix Epson LX (tanpa dialog browser)
2. ✅ File system full access (backup massal, export Excel langsung ke folder)
3. ✅ Offline-first dengan SQLite + sync ke Firestore
4. ✅ Background sync tasks
5. ✅ System tray (notif desktop)

**Tools needed:** Rust + npm + @tauri-apps/cli
**Migration effort:** ~2-3 minggu (perlu learn Rust basics)

**📖 Detail lengkap lihat `DESIGN-SYSTEM-RULES.md` Rule #14**

---

## 🔄 Workflow Update (Untuk Diingat)

### Update Fitur Biasa (90% kasus)
```cmd
1. Edit D:\Aplikasi Project\Portal MU\public\index.html
2. Bump APP_VERSION (3 lokasi: 2 HTML display + 1 const)
3. Bump SW_VERSION di public/sw.js (pattern: vNNN-MMYY-deskripsi)
4. Deploy:
   cd /D "D:\Aplikasi Project\Portal MU"
   firebase deploy --only hosting
5. User di HP buka app → Service Worker auto-update
```

### Update Memerlukan Rebuild APK (jarang)
Hanya kalau ubah:
- `twa-manifest.json` (icon URL, package name, version code)
- Android resources di `D:\Aplikasi Project\Ammu TWA\app\src\main\res\`
- `app/build.gradle`

Command rebuild:
```cmd
cd /D "D:\Aplikasi Project\Ammu TWA"
rmdir /S /Q app\build
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"
set "ANDROID_HOME=D:\AndroidSDK"
gradlew.bat assembleRelease

"D:\AndroidSDK\build-tools\36.0.0\apksigner.bat" sign --ks "D:\Aplikasi Project\Portal MU\ammu-app.keystore" --ks-key-alias ammu-app --out "D:\Aplikasi Project\Ammu TWA\app-release-vXX-signed.apk" "D:\Aplikasi Project\Ammu TWA\app\build\outputs\apk\release\app-release-unsigned.apk"
```

⚠️ **Bubblewrap CLI di Windows ada bug** — pakai gradle direct (Workaround B di session sebelumnya).

---

## 🔒 CRITICAL — Backup Reminder

| Item | Status Backup |
|---|---|
| `ammu-app.keystore` | ⚠️ **KYAI WAJIB backup 3 lokasi:** Drive private, USB, hard drive eksternal |
| Password keystore | ⚠️ **Password manager + screenshot di Drive** |
| Source code (Portal MU folder) | Backup ke Drive / GitHub private repo |
| Firebase config | Sudah di Firebase Console |
| Firestore data | Aktifkan Firebase scheduled backup |

**Kehilangan keystore = APK tidak bisa di-update selamanya** (user harus uninstall + install ulang).

---

## 📊 Statistik App Sekarang

```
File index.html        : 1.5 MB (~20,000 lines)
- Inline CSS           : ~107 KB (20 blocks)
- Inline JS            : ~1 MB  (2 blocks)
External libraries     : 15 CDN scripts
Tailwind classes used  : 489 hover:, 23 sm:, 106 md:, 24 lg:, 0 xl:/2xl:
Color families         : 14 (target: 6)
Buttons                : 414
Inputs                 : 318
Tables                 : 70
Swal.fire dialogs      : 393 (target: reduce 50% → Toast)
Inline onclick         : 395 (target: 0 — pakai addEventListener)
FontAwesome icons      : 671
Service Worker         : Active (v108)
Lighthouse Performance : 32 (target: 80+)
```

---

## 🚀 Untuk Sesi Chat Baru

**Karena chat ini sudah panjang, lanjutkan di chat baru** dengan prompt di file:

`D:\Aplikasi Project\Portal MU\PROMPT-NEXT-CHAT.md`

Atau langsung copy-paste prompt di bawah.

---

**Maintained by:** Claude AI (sebagai senior architect + lead full-stack developer assistant)
**For:** Kyai (developer & founder Portal Mambaul Ulum)
**Last updated:** 12 Mei 2026
