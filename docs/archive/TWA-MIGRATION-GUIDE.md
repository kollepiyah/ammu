# TWA Migration Guide — Portal Mambaul Ulum

**Status PWA Readiness:** Lighthouse Best Practices 100/100 — siap untuk TWA
**Versi App:** v.105.0526
**URL Live:** https://portal-mambaul-ulum.web.app

---

## Apa itu TWA?

**Trusted Web Activity (TWA)** = wrap PWA jadi APK Android native menggunakan Chrome Custom Tab. App jalan fullscreen tanpa URL bar, bisa di-publish ke Google Play Store. Update web app otomatis ter-reflect di TWA tanpa rebuild APK.

**Keuntungan untuk Portal MU:**
- Bisa di-install dari Play Store (kredibilitas + distribusi)
- Branded splash screen + icon
- Tanpa "install from browser" prompt
- Update via Firebase deploy = otomatis di TWA

---

## Prerequisite

**Sudah ready (di v.105):**
- `public/manifest.json` lengkap (name, icons, theme_color, dll)
- `public/sw.js` Service Worker aktif
- `public/.well-known/assetlinks.json` template tersedia
- HTTPS via Firebase hosting
- Icons: 192x192, 512x512, 192-maskable, 512-maskable, apple-touch-icon-180

**User harus install:**
- **JDK 17** (Java Development Kit) — download dari https://adoptium.net
- **Bubblewrap CLI** (optional, kalau pilih CLI route): `npm install -g @bubblewrap/cli`

---

## Fase 1 — Generate Android Signing Keystore

**WARNING:** Keystore + password ini WAJIB di-backup. Kehilangan = tidak bisa update app di Play Store selamanya. Backup ke 2-3 lokasi (Drive private, hard drive, USB).

### Langkah:

1. Buka PowerShell di folder project: `cd "D:\Aplikasi Project\Portal MU"`

2. Generate keystore:
```powershell
keytool -genkeypair -v -keystore portal-mu.keystore -alias portal-mu -keyalg RSA -keysize 2048 -validity 10000
```

3. Isi prompts:
   - **Enter keystore password:** (buat password kuat, catat di password manager)
   - **What is your first and last name?** Nama Anda atau "Portal Mambaul Ulum"
   - **Organizational unit?** "IT Pesantren"
   - **Organization?** "Pondok Pesantren Mambaul Ulum"
   - **City?** Sidoarjo
   - **State?** Jawa Timur
   - **Country code (XX)?** ID
   - **Is information correct?** y

4. **BACKUP keystore:** copy file `portal-mu.keystore` ke 2-3 lokasi aman.

5. Extract SHA-256 fingerprint:
```powershell
keytool -list -v -keystore portal-mu.keystore -alias portal-mu
```
Masukkan password keystore. Output panjang, cari baris:
```
SHA256: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:...
```
Salin semua hex (format pakai titik dua, contoh: `4F:9C:80:7E:...`).

---

## Fase 2 — Update assetlinks.json

1. Buka file `public/.well-known/assetlinks.json`

2. Replace `REPLACE_WITH_YOUR_SHA256_FINGERPRINT_FROM_KEYSTORE` dengan SHA256 dari Fase 1 langkah 5.

3. Pastikan `package_name` sesuai. Default: `app.web.portal_mambaul_ulum.twa`. Boleh ganti ke `com.mambaululum.portal` (lebih konvensional reverse-domain). **CATAT package_name ini — harus sama dengan yang dimasukkan di Bubblewrap/PWABuilder nanti.**

4. Deploy ke Firebase hosting:
```powershell
firebase deploy --only hosting
```

5. Verify accessible di browser:
   - Buka https://portal-mambaul-ulum.web.app/.well-known/assetlinks.json
   - Harus return JSON yang valid (bukan 404 atau HTML)

6. Validasi via Google tool:
   - Buka https://developers.google.com/digital-asset-links/tools/generator
   - Hosting site domain: `portal-mambaul-ulum.web.app`
   - Application package name: (sesuai langkah 3)
   - Application package fingerprint: (SHA256)
   - Klik "Test statement" — harus PASS

---

## Fase 3 — Build TWA APK

### Pilihan A: PWABuilder.com (PALING MUDAH)

1. Buka https://www.pwabuilder.com
2. Input URL: `https://portal-mambaul-ulum.web.app`
3. Klik "Start" — wait analyze
4. Klik tab **"Android"** → "Generate Package"
5. Form Android:
   - **Package ID:** sesuai assetlinks.json package_name
   - **App name:** "Mambaul Ulum"
   - **Launch URL:** `/`
   - **Theme color:** `#0f766e`
   - **Background color:** `#0f766e`
   - **Display mode:** `standalone`
   - **Signing key:** "Use mine" → upload `portal-mu.keystore` + password
6. Klik "Generate"
7. Download ZIP, extract:
   - `app-release-signed.apk` → untuk side-load testing
   - `app-release-bundle.aab` → untuk upload Play Store

### Pilihan B: Bubblewrap CLI (lebih fleksibel)

```powershell
npm install -g @bubblewrap/cli
cd "D:\Aplikasi Project\Portal MU"
bubblewrap init --manifest https://portal-mambaul-ulum.web.app/manifest.json
```

Jawab prompts:
- **Domain:** portal-mambaul-ulum.web.app
- **App name:** Mambaul Ulum
- **Package ID:** (sesuai assetlinks.json)
- **Display mode:** standalone
- **Orientation:** any
- **Theme color:** #0f766e
- **Background color:** #0f766e
- **Use signing key:** "Yes" → path ke `portal-mu.keystore`

```powershell
bubblewrap build
```

Output di folder `app/build/outputs/`:
- `app-release-signed.apk`
- `app-release-bundle.aab`

---

## Fase 4 — Test APK di Android Device

### Side-load (tanpa Play Store)

1. Transfer `app-release-signed.apk` ke HP Android (USB, WhatsApp, Drive)
2. Di HP:
   - Settings → Security → toggle **"Install unknown apps"** untuk file manager / browser yang dipakai install
3. Buka APK → Install → Open
4. Test:
   - App buka **fullscreen tanpa URL bar** ← KRITERIA SUKSES TWA
   - Splash screen tampil dengan warna theme
   - Login → fitur normal jalan
   - Disconnect WiFi → buka app lagi → konten cached masih akses

**Kalau muncul URL bar di atas:** assetlinks.json belum verified. Kemungkinan:
- SHA256 salah
- assetlinks.json tidak deploy / 404
- Package name di APK ≠ package_name di assetlinks.json
- Cache: uninstall + reinstall APK

### Test PWA installable (bonus)

Buka https://portal-mambaul-ulum.web.app di Chrome HP:
- Menu titik 3 → harus muncul **"Install app"** atau **"Add to Home screen"** dengan icon Mambaul Ulum

---

## Fase 5 — Publish ke Google Play Store (OPSIONAL)

### Persiapan:

1. **Daftar Google Play Developer** ($25 USD one-time, ~Rp 400.000)
   - https://play.google.com/console/signup
   - Verify identity (KTP / paspor)
   - Setup payment

2. **Privacy Policy** (wajib)
   - Buat halaman privacy di Firebase hosting (mis: `public/privacy.html`)
   - URL: `https://portal-mambaul-ulum.web.app/privacy.html`
   - Isi: data apa yang di-collect, untuk apa, retention policy

3. **Aset listing:**
   - **Icon:** 512x512 PNG (high-res)
   - **Feature graphic:** 1024x500 PNG (banner Play Store)
   - **Screenshots:** min 2, max 8 — buka app di HP, screenshot, transfer
   - **Short description:** max 80 karakter
   - **Full description:** max 4000 karakter

### Upload:

1. Play Console → Create app
   - App name: Mambaul Ulum
   - Default language: Indonesian
   - App or game: App
   - Free or paid: Free
2. **App content** → setup semua: privacy policy, ads, content rating, target audience
3. **Production** → Releases → Create new release
4. Upload `app-release-bundle.aab`
5. Release notes → tulis "Versi pertama TWA Portal Mambaul Ulum"
6. Submit review

**Wait 1-7 hari (rata-rata 2-3 hari).** Setelah approved, app live di Play Store.

---

## Fase 6 — Maintenance Pasca-Migrasi

### Update Web App

App TWA load konten dari URL Firebase hosting. Update pakai cara biasa:
```powershell
cd "D:\Aplikasi Project\Portal MU"
npm run deploy
```
**Otomatis muncul di TWA tanpa rebuild APK** (asal Service Worker bump SW_VERSION supaya cache di-refresh).

### Update APK (rare)

Rebuild APK hanya kalau ubah:
- `package_name` (jangan diubah — harus stabil)
- Signing key (jangan diubah — wajib backup)
- `manifest.json` metadata fundamental (name, icons, dll)
- Native splash / shortcuts

Untuk update Play Store: build AAB baru dengan keystore yang sama → upload sebagai version code +1.

### Backup Keystore

**WAJIB:** simpan `portal-mu.keystore` + password ke:
1. Cloud storage (Drive private folder)
2. Hard drive lokal terenkripsi
3. USB cadangan

Kehilangan keystore = tidak bisa update app yang sudah live. Harus publish ulang dengan package_name baru, user harus uninstall old + install new.

---

## Quick Checklist

**Sebelum mulai:**
- [ ] JDK 17 installed
- [ ] Lighthouse Best Practices 100 (sudah di v.105)
- [ ] Manifest.json valid (sudah)
- [ ] assetlinks.json template ada (sudah)

**Generate keystore:**
- [ ] `keytool -genkeypair` jalan, file `.keystore` ter-generate
- [ ] Password keystore di-catat di password manager
- [ ] Backup keystore ke 2-3 lokasi
- [ ] SHA256 fingerprint di-extract

**Update assetlinks:**
- [ ] SHA256 di-paste ke `assetlinks.json`
- [ ] Package name diconfirm (sama dengan TWA build)
- [ ] Deploy `firebase deploy --only hosting`
- [ ] Verify URL accessible (200 OK)

**Build APK:**
- [ ] PWABuilder atau Bubblewrap selesai build
- [ ] APK + AAB ter-download

**Test:**
- [ ] APK install di HP Android
- [ ] App buka fullscreen (no URL bar)
- [ ] Login + fitur jalan
- [ ] Offline mode work (cache SW)

**Publish (opsional):**
- [ ] Google Play Developer terdaftar
- [ ] Privacy policy ready
- [ ] Aset listing siap (icon, screenshots, deskripsi)
- [ ] AAB di-upload, submit review

---

## Estimasi Waktu

| Fase | Durasi |
|---|---|
| Fase 1 — Keystore | 15 menit |
| Fase 2 — assetlinks deploy | 10 menit |
| Fase 3 — Build APK | 30 menit (PWABuilder) atau 60 menit (Bubblewrap pertama kali) |
| Fase 4 — Test APK | 30 menit |
| Fase 5 — Play Store submit | 1-2 jam (siapkan aset) + 1-7 hari review |

**Total kerja aktif:** ~2-4 jam (tidak termasuk wait Play review)

---

## Troubleshooting

### "URL bar muncul di TWA"
- assetlinks.json belum verified. Cek:
  - SHA256 di assetlinks = SHA256 dari keystore yang dipakai sign APK
  - assetlinks.json deploy + accessible di URL
  - Package name di APK = package_name di assetlinks
- Uninstall APK + clear cache Chrome di HP, reinstall

### "Keytool command not found"
- JDK belum di-install atau PATH belum di-set
- Install JDK 17, restart PowerShell
- Atau pakai full path: `"C:\Program Files\Java\jdk-17\bin\keytool.exe"`

### "PWABuilder build failed"
- Cek manifest.json valid (validator: https://manifest-validator.appspot.com)
- Pastikan icons accessible (open https://portal-mambaul-ulum.web.app/icon-512.png)
- Coba Bubblewrap CLI sebagai alternatif

### "Lighthouse Performance turun setelah lazy load"
- Hard refresh + run Lighthouse incognito ulang
- Library dengan `fetchpriority="low"` memang lambat di Lighthouse simulasi, tapi TWA real user experience tidak terpengaruh karena cache

---

## Resources

- PWABuilder: https://www.pwabuilder.com
- Bubblewrap docs: https://github.com/GoogleChromeLabs/bubblewrap
- Digital Asset Links generator: https://developers.google.com/digital-asset-links/tools/generator
- TWA documentation: https://developer.chrome.com/docs/android/trusted-web-activity
- Manifest validator: https://manifest-validator.appspot.com
- Play Console: https://play.google.com/console

---

**Selamat memigrasikan! Kalau stuck di langkah tertentu, kasih tau Claude untuk bantu.**
