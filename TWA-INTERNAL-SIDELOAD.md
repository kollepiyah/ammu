# TWA Internal Side-Load Guide — Portal Mambaul Ulum

**Fokus:** Internal pondok, side-load APK manual, **TIDAK** publish Play Store.
**Versi App:** v.107.1.0526
**URL Live:** https://portal-mambaul-ulum.web.app

---

## Kenapa Side-Load (bukan Play Store)

| Aspek | Side-Load | Play Store |
|---|---|---|
| Biaya | **GRATIS** | $25 USD developer account |
| Privacy Policy | Tidak butuh | Wajib (dengan URL) |
| App Content Rating | Tidak butuh | Wajib (questionnaire) |
| Review time | Instan | 1-7 hari |
| Distribusi | Manual (transfer APK / Google Drive link) | Public download |
| Cocok untuk | Internal pondok, terbatas user | Public / komersial |

**Untuk internal pondok: Side-load = pilihan terbaik.** Distribusi via WhatsApp group / Drive folder ke staff & wali santri.

---

## Auto-Update Mechanism (Tanpa Bongkar APK)

**INI KEUNGGULAN UTAMA TWA:** APK hanya **wrapper** Chrome Custom Tab. Konten app dimuat dari URL Firebase hosting setiap kali app dibuka.

**Workflow update:**
1. Edit code di `D:\Aplikasi Project\Portal MU\public\` (HTML, CSS, JS)
2. Bump `SW_VERSION` di `public/sw.js` (force cache refresh — sudah dilakukan otomatis di workflow Anda)
3. Deploy: `firebase deploy --only hosting` atau `npm run deploy`
4. **APK di HP user otomatis dapat update** — Service Worker detect SW_VERSION baru, clear cache lama, load fresh content

**Tidak perlu rebuild APK kecuali:**
- Ubah `manifest.json` metadata (name, icons, start_url, theme_color, dll)
- Ubah `assetlinks.json` (SHA256 fingerprint, package name)
- Ubah signing keystore

**Yang BISA di-update via web (auto):**
- Semua fitur app (CRUD, rapor, kartu kenaikan, ACF, dll)
- UI/UX (HTML, CSS, JS)
- Firestore schema/rules (deploy via `firebase deploy --only firestore:rules`)
- Konten beranda, pengumuman, kalender
- Schema rapor/kartu/ACF (saved di Firestore, tidak butuh code change)

---

## Persiapan (One-Time Setup)

### Step 1: Install JDK 17

1. Download dari https://adoptium.net (Temurin JDK 17 LTS)
2. Install dengan default options
3. Verify di PowerShell:
```powershell
java --version
```
Expected: `openjdk 17.x.x`

### Step 2: Generate Signing Keystore

**WARNING:** Backup keystore + password ke 2-3 lokasi (Drive private, hard drive, USB). Kehilangan = tidak bisa update APK selamanya — user harus uninstall + install ulang dengan package_name baru.

```powershell
cd "D:\Aplikasi Project\Portal MU"
keytool -genkeypair -v -keystore portal-mu.keystore -alias portal-mu -keyalg RSA -keysize 2048 -validity 10000
```

Isi prompts:
- **Password:** buat strong password (catat di password manager, mis: `MambaulUlum@2026!`)
- **First & last name:** "Portal Mambaul Ulum"
- **Organizational unit:** "IT Pesantren"
- **Organization:** "Pondok Pesantren Mambaul Ulum"
- **City:** Sidoarjo
- **State:** Jawa Timur
- **Country code:** ID
- **Confirm:** y
- **Key password:** kosongkan = sama dengan keystore password (tekan Enter)

### Step 3: Extract SHA-256 Fingerprint

```powershell
keytool -list -v -keystore portal-mu.keystore -alias portal-mu
```
Masukkan password. Cari baris yang dimulai `SHA256:` lalu **salin nilai hex** (format `AA:BB:CC:...`).

### Step 4: Update assetlinks.json

Edit file `D:\Aplikasi Project\Portal MU\public\.well-known\assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "app.web.portal_mambaul_ulum.twa",
      "sha256_cert_fingerprints": [
        "PASTE_SHA256_DARI_STEP_3_DI_SINI"
      ]
    }
  }
]
```

Replace `PASTE_SHA256_DARI_STEP_3_DI_SINI` dengan SHA256 lengkap.

### Step 5: Deploy assetlinks ke Hosting

```powershell
firebase deploy --only hosting
```

**Verify accessible:** buka di browser https://portal-mambaul-ulum.web.app/.well-known/assetlinks.json — harus return JSON dengan SHA256 yang Anda paste.

**Verify Google validation:**
- Buka https://developers.google.com/digital-asset-links/tools/generator
- Hosting site domain: `portal-mambaul-ulum.web.app`
- Application package name: `app.web.portal_mambaul_ulum.twa` (sama dengan assetlinks)
- Application package fingerprint: SHA256
- Klik "Test statement" — harus PASS

---

## Build APK (Pakai PWABuilder — Tanpa CLI)

**PWABuilder = web tool, paling mudah untuk side-load.**

1. Buka https://www.pwabuilder.com
2. Input URL: `https://portal-mambaul-ulum.web.app`
3. Klik **"Start"** → wait analyze (10-30 detik)
4. Score harus minimal 80/100 untuk Android (PWA criteria)
5. Klik tab **"Android"** → klik **"Generate Package"**
6. Form Android:
   - **Package ID:** `app.web.portal_mambaul_ulum.twa` (sama dengan assetlinks!)
   - **App name:** Portal Mambaul Ulum
   - **Launch URL:** `/`
   - **Theme color:** `#0f766e`
   - **Background color:** `#0f766e`
   - **Display mode:** `standalone`
   - **Status bar color:** `#0f766e`
   - **Signing key:** "Use mine"
     - Upload `portal-mu.keystore`
     - Key alias: `portal-mu`
     - Keystore password: yang Anda set di Step 2
     - Key password: sama
7. Klik **"Generate"** → wait (30-60 detik)
8. Download ZIP file
9. Extract:
   - `app-release-signed.apk` ← **INI yang Anda butuhkan untuk side-load**
   - `app-release-bundle.aab` ← skip, ini untuk Play Store
   - `next-steps.html` ← baca opsional

---

## Install APK di HP Android (Side-Load)

### Distribusi:
- Upload `app-release-signed.apk` ke Google Drive folder pondok
- Share link ke staff & wali santri via WhatsApp / Telegram
- Atau: install langsung via USB ke device

### Install:
1. Di HP Android: Settings → Security → toggle **"Install unknown apps"** untuk app yang dipakai download (Chrome, Drive, WhatsApp, dll)
2. Tap APK file → **Install** → tap **Open**

### Test:
- App buka **fullscreen tanpa URL bar Chrome** ← KRITERIA SUKSES TWA
- Splash screen tampil (theme color)
- Login → semua fitur normal
- **Disconnect WiFi/Data** → buka app lagi → konten cached masih bisa diakses (Service Worker offline)

### Kalau muncul URL bar (TWA gagal verify):
- Penyebab: `assetlinks.json` belum proper deploy atau SHA256 salah
- Cek:
  - URL https://portal-mambaul-ulum.web.app/.well-known/assetlinks.json return JSON valid
  - SHA256 di assetlinks = SHA256 dari keystore yang dipakai sign APK
  - Package name di APK = package_name di assetlinks
- Setelah fix: uninstall APK, **clear Chrome cache** (Settings Chrome → Privacy → Clear cache), reinstall APK

---

## Workflow Update Setelah APK Live

**Skenario 1: Update fitur/UI (90% kasus)**
1. Edit code di `D:\Aplikasi Project\Portal MU\public\index.html`
2. Bump SW_VERSION di `public/sw.js` (auto pattern: `vNN-MMYY-deskripsi`)
3. Deploy: `npm run deploy`
4. User di HP buka app → SW detect update → clear cache → fresh content

**Skenario 2: Update Firestore rules atau schema**
1. Edit `firestore.rules`
2. Deploy: `firebase deploy --only firestore:rules`
3. APK auto pakai rules baru saat next request

**Skenario 3: Update logo/manifest (rare — butuh rebuild APK)**
- Hanya kalau ubah `manifest.json` (icon, theme color, name)
- Build APK baru via PWABuilder (Step 6 di atas, pakai keystore yang SAMA)
- Distribusi APK baru ke user
- User uninstall old + install new (atau install over kalau version code naik)

---

## Distribusi APK

### Option A: Google Drive Link
1. Upload `app-release-signed.apk` ke folder Drive private
2. Share via link "Anyone with link"
3. Embed link di WhatsApp group:
```
Download Portal Mambaul Ulum App:
[link Drive]

Cara install:
1. Tap link → Download APK
2. Buka file → Install
3. Buka app → login pakai NIS/WA
```

### Option B: Firebase Hosting (host APK file sendiri)
1. Buat folder `public/downloads/` di project
2. Copy APK ke `public/downloads/portal-mu-v1.apk`
3. Deploy: `firebase deploy --only hosting`
4. Distribusi link: `https://portal-mambaul-ulum.web.app/downloads/portal-mu-v1.apk`

### Option C: Tanya Page Khusus
- Buat halaman `public/install.html` dengan instruksi visual
- User bisa scan QR code → buka link → download

---

## Maintenance

### Backup Keystore (CRITICAL)
- File `portal-mu.keystore` + password
- Backup ke: Google Drive private (terenkripsi), USB, hard drive
- Kehilangan = bencana (tidak bisa update app, harus publish ulang dengan package_name baru, semua user harus uninstall + reinstall)

### Bump SW_VERSION
Selalu bump SW_VERSION setiap deploy update kode supaya cache di-refresh:
```js
// public/sw.js
const SW_VERSION = 'v100-0526-darkmode-comprehensive';  // → naik ke v101 saat update berikutnya
```

### Monitor Firestore Usage
- Firebase Console: cek quota Firestore, Storage, Hosting
- Free tier biasanya cukup untuk pondok internal

---

## File State Saat Ini (per v.107.1.0526)

| File | Status |
|---|---|
| `public/index.html` | 1.56 MB, end `</html>` ✓ |
| `public/sw.js` | SW_VERSION `v100-0526-darkmode-comprehensive` ✓ |
| `public/manifest.json` | Valid (name, icons 192/512/maskable, theme_color, shortcuts) ✓ |
| `public/.well-known/assetlinks.json` | Template ready (perlu isi SHA256) ⚠ |
| `firebase.json` | Hosting + rules + functions config ✓ |
| `firestore.rules` | v.102 update (allow delete BI) ✓ |
| `cors.json` | Storage CORS ✓ |
| Icons (192, 512, maskable, apple-touch) | All present ✓ |

---

## Estimasi Waktu

| Step | Durasi |
|---|---|
| Install JDK | 10 menit |
| Generate keystore | 5 menit |
| Update assetlinks + deploy | 5 menit |
| Build APK via PWABuilder | 15 menit |
| Test install di HP | 10 menit |
| **TOTAL** | **~45 menit** (one-time setup) |

Setelah itu, semua update fitur **otomatis tanpa rebuild APK**.

---

## Troubleshooting

### "App buka dengan URL bar Chrome di atas"
- assetlinks belum verified. Hari pertama install kadang butuh ~24 jam untuk Google verify
- Pastikan URL `/.well-known/assetlinks.json` accessible dan return JSON valid
- Uninstall APK, clear Chrome data, reinstall

### "Update web tidak ter-reflect di app"
- Bump SW_VERSION dulu sebelum deploy (force cache refresh)
- User di HP: open app → tunggu 10-30 detik → restart app

### "PWABuilder gagal generate"
- Cek manifest.json valid: https://manifest-validator.appspot.com
- Cek service worker active: https://portal-mambaul-ulum.web.app → DevTools → Application → Service Worker
- Cek HTTPS: harus https (Firebase default)

### "Keystore lupa password"
- **Tidak bisa di-recover.** Solusi: generate keystore baru, build APK dengan package_name baru, semua user harus uninstall+install ulang
- **Pelajaran:** simpan password di password manager dari awal

---

## Action Items Anda

**Sebelum buka chat baru untuk TWA migration:**
1. Install JDK 17 dari https://adoptium.net
2. Sediakan password keystore (catat di password manager)
3. Hard refresh https://portal-mambaul-ulum.web.app dan test fitur dark mode + search input

**Di chat baru, paste prompt:**
```
Halo Claude, saya melanjutkan project Portal Mambaul Ulum dari v.107.1.0526.

Saya mau MIGRASI TWA untuk INTERNAL PONDOK (side-load only, tidak Play Store).

Tolong baca file panduan dulu:
D:\Aplikasi Project\Portal MU\TWA-INTERNAL-SIDELOAD.md

Setelah baca, beri saya:
1. Konfirmasi siap atau ada blocker
2. Step pertama (Generate Keystore via keytool)
3. Tunggu saya report SHA256 hasil keystore

Pandu sampai APK siap install di HP. Bismillah.
```

---

**Status Final:** Ready for TWA migration. Selamat ngoprek.
