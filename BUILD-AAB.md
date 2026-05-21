# 🤖 Build AAB Guide — Ammu Online v1.0.0

> **Untuk:** Kyai build signed AAB siap upload Play Store Internal Testing
> **Estimasi waktu:** 30-60 menit (first time, termasuk install Android Studio)
> **Output:** `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🛠️ Prerequisite (one-time setup)

### 1. Java JDK 17

Capacitor 6 wajib **JDK 17** (bukan JDK 8 / 11 / 21).

```powershell
# Cek versi Java aktif
java -version
```

Kalau bukan JDK 17, download dari:
- [Adoptium Temurin JDK 17](https://adoptium.net/temurin/releases/?version=17) — installer Windows x64
- Setelah install, set `JAVA_HOME` env var ke `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`

### 2. Android Studio (atau Android SDK CLI)

**Recommended:** Install Android Studio Ladybug (2024.2+):
- [developer.android.com/studio](https://developer.android.com/studio)
- Install dengan default options — akan auto-download SDK 34 + Build Tools 34

Setelah install, set env var:
- `ANDROID_HOME` = `C:\Users\<kyai>\AppData\Local\Android\Sdk`
- Tambah ke `PATH`: `%ANDROID_HOME%\platform-tools` + `%ANDROID_HOME%\build-tools\34.0.0`

### 3. Node modules (Capacitor + plugins)

```powershell
cd "D:\Aplikasi Project\Portal MU"
npm install
```

Akan install plugin baru: `@capacitor/push-notifications`, `@capacitor/share`, `@capacitor/app`, `@capacitor/splash-screen`, `@capacitor/status-bar`.

### 4. Keystore aktif

Pastikan file `ammu-app.keystore` masih di root project. **JANGAN HILANG.**

Backup ke 2 tempat aman (kalau belum):
- Google Drive private (folder "Ammu Keystore Backup")
- USB Flash Drive (label: "Ammu Online Keystore 2026")

---

## 📦 Step 1 — Generate android/ folder (one-time)

```powershell
cd "D:\Aplikasi Project\Portal MU"
npx cap add android
```

Output: folder `android/` baru dengan project Gradle. **JANGAN edit manual file di dalamnya** — tiap `cap sync` akan overwrite beberapa file.

**Verify:**
```powershell
ls android\
# Harus ada: app/, build.gradle, settings.gradle, gradle/, gradlew.bat
```

---

## 🔄 Step 2 — Sync web → android (setiap habis update public/)

```powershell
cd "D:\Aplikasi Project\Portal MU"
npx cap sync android
```

Capacitor akan:
- Copy `public/*` ke `android/app/src/main/assets/public/`
- Update plugin native (Push, Share, dll)
- Generate `capacitor.config.json` di android/

**Wajib jalankan ini SEBELUM build AAB.**

---

## 🎨 Step 3 — Setup app icon & splash (one-time)

Setelah `cap add android`, copy icon hasil generate kita:

```powershell
# Adaptive icon foreground & background ke mipmap
copy "playstore-assets\adaptive-icon-foreground-432.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png"
copy "playstore-assets\adaptive-icon-background-432.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_background.png"
copy "playstore-assets\adaptive-icon-monochrome-432.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_monochrome.png"

# Legacy icon (untuk Android < 8)
copy "playstore-assets\app-icon-512.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
copy "playstore-assets\app-icon-512.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png"

# Notification icon
copy "playstore-assets\notification-icon-96.png" "android\app\src\main\res\drawable\ic_notification.png"
```

**Recommended:** Pakai **Android Studio Image Asset Studio** (lebih rapi, generate semua density):
1. Buka Android Studio → buka folder `android/`
2. Right-click `res/` → New → Image Asset
3. Pilih **Launcher Icons (Adaptive and Legacy)**
4. Foreground: pilih `playstore-assets/adaptive-icon-foreground-432.png`
5. Background: pilih warna putih `#FFFFFF` (atau import `adaptive-icon-background-432.png`)
6. Finish — akan generate semua density (mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi)

---

## ⚙️ Step 4 — Edit `android/app/build.gradle`

Buka `android/app/build.gradle`, pastikan section `android.defaultConfig`:

```gradle
android {
    namespace "app.ammu.id"
    compileSdk rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "app.ammu.id"      // ← match capacitor.config.json
        minSdk 22                        // Android 5.1 Lollipop minimum
        targetSdk rootProject.ext.targetSdkVersion
        versionCode 1                    // ← AUTO-increment di setiap rilis
        versionName "1.0.0"              // ← SemVer
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }
    signingConfigs {
        release {
            storeFile file('../../ammu-app.keystore')
            storePassword System.getenv("AMMU_KEYSTORE_PASS") ?: "REPLACE_DI_GRADLE_PROPS"
            keyAlias 'ammu-app'
            keyPassword System.getenv("AMMU_KEY_PASS") ?: "REPLACE_DI_GRADLE_PROPS"
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```

**⚠️ Keystore password security:**

JANGAN hardcode password di `build.gradle` (file ini di git commit). Pakai salah satu cara:

**Opsi A — Environment variable (recommended):**
Sebelum build, set di PowerShell:
```powershell
$env:AMMU_KEYSTORE_PASS = "<password keystore>"
$env:AMMU_KEY_PASS = "<password key alias>"
```

**Opsi B — gradle.properties (ignored di git):**
Buat `android/gradle.properties.local`:
```
AMMU_KEYSTORE_PASS=password_keystore_kyai
AMMU_KEY_PASS=password_key_alias
```

Lalu di `build.gradle` baca via `project.findProperty('AMMU_KEYSTORE_PASS')`.

---

## 🔧 Step 5 — Edit `android/app/src/main/AndroidManifest.xml`

Tambah permission untuk FCM Push:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

Pastikan `<application>` punya:
```xml
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme"
    android:usesCleartextTraffic="false">
```

**Penting:** `usesCleartextTraffic="false"` — wajib karena Play Store strict ke HTTP.

---

## 🌐 Step 6 — FCM `google-services.json`

Untuk FCM Push bekerja, butuh `google-services.json` dari Firebase Console:

1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Pilih project **qiraati-rapor**
3. ⚙️ Settings → Your apps → Add app → Android
4. Package name: `app.ammu.id`
5. App nickname: Ammu Online
6. SHA-1 fingerprint:
   ```powershell
   keytool -list -v -keystore "D:\Aplikasi Project\Portal MU\ammu-app.keystore" -alias ammu-app
   ```
   Copy SHA-1, paste ke Firebase form.
7. Download `google-services.json` → letakkan di `android/app/google-services.json`
8. **JANGAN commit ke git** — sudah di `.gitignore` default Capacitor

Tambah Google Services Gradle plugin di `android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.2'
    }
}
```

Di `android/app/build.gradle`, bagian paling bawah:
```gradle
apply plugin: 'com.google.gms.google-services'
```

---

## 🚀 Step 7 — Build AAB

```powershell
cd "D:\Aplikasi Project\Portal MU\android"

# Set env keystore password (Opsi A)
$env:AMMU_KEYSTORE_PASS = "<password>"
$env:AMMU_KEY_PASS = "<password>"

# Build signed AAB (mode release)
.\gradlew bundleRelease
```

Atau via Android Studio:
1. Build → Generate Signed Bundle/APK
2. Pilih **Android App Bundle**
3. Keystore path: `D:\Aplikasi Project\Portal MU\ammu-app.keystore`
4. Alias: `ammu-app`
5. Passwords: isi
6. Destination folder: default
7. Build variant: **release**
8. Finish

**Output:** `android\app\build\outputs\bundle\release\app-release.aab`

**Ukuran expected:** 5-15 MB (tergantung berapa banyak asset di-bundle).

---

## ✅ Step 8 — Verify AAB sebelum upload

```powershell
# Cek isi AAB (di-pack zip)
cd "android\app\build\outputs\bundle\release"

# Verifikasi signing
$JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot"
& "$JAVA_HOME\bin\jarsigner" -verify -verbose -certs app-release.aab
```

Output expected: `jar verified` + cert detail = keystore Kyai. ✓

---

## 📤 Step 9 — Upload ke Play Console Internal Testing

1. Login [play.google.com/console](https://play.google.com/console)
2. Pilih app "Ammu Online"
3. Sidebar → **Testing → Internal testing**
4. **Create new release**
5. **App bundles & APKs**: upload `app-release.aab`
6. **Release name**: `1.0.0`
7. **Release notes**: copy dari `PLAYSTORE-LISTING.md` section #10
8. Save → Review release → Start rollout to Internal testing
9. **Tester list**: tambah email pengurus / sesepuh / kyai sendiri
10. Bagikan opt-in URL ke tester

---

## 🔁 Step 10 — Update releases berikutnya

Untuk versi 1.0.1, 1.0.2, dst:

```powershell
# 1. Update versionCode + versionName di android/app/build.gradle
#    versionCode 2     ← naikkan 1
#    versionName "1.0.1"

# 2. Update web kalau ada (legacy public/index.html atau vue-app build)
# 3. Sync
npx cap sync android

# 4. Build
cd android
.\gradlew bundleRelease

# 5. Upload AAB baru ke Play Console
```

---

## ⚠️ Common Issues

### Issue 1: "Failed to find target with hash string 'android-34'"
**Fix:** Buka Android Studio → SDK Manager → install Android SDK 34.

### Issue 2: "Could not find com.android.tools.build:gradle"
**Fix:** Pastikan internet aktif, gradle download dependencies pertama kali (~10-20 menit).

### Issue 3: "INSTALL_PARSE_FAILED_NO_CERTIFICATES"
**Fix:** AAB tidak ter-sign. Cek keystore path di `build.gradle`, pastikan password benar.

### Issue 4: "Package app.ammu.id already exists"
**Fix:** Kalau pernah install versi dev di HP, uninstall dulu sebelum install AAB baru (build dev signature beda dengan release).

### Issue 5: FCM token tidak diterima
**Fix:**
- Pastikan `google-services.json` ada di `android/app/`
- Pastikan SHA-1 keystore terdaftar di Firebase Console
- Pastikan permission `POST_NOTIFICATIONS` di AndroidManifest
- Test di HP fisik (emulator kadang FCM tidak jalan)

### Issue 6: Splash screen tidak muncul
**Fix:** Generate splash via Android Studio Image Asset, atau buat `android/app/src/main/res/drawable/splash.png` (1242x2208 atau 1080x1920).

---

## 📋 Checklist FINAL sebelum upload Play Store

- [ ] `npm install` sukses (semua plugin Capacitor ter-install)
- [ ] `npx cap add android` sukses
- [ ] App icon copied ke `android/app/src/main/res/mipmap-*` (via Image Asset Studio)
- [ ] `build.gradle` versionCode=1, versionName="1.0.0"
- [ ] `AndroidManifest.xml` permission POST_NOTIFICATIONS ada
- [ ] `google-services.json` ada di `android/app/`
- [ ] SHA-1 keystore ter-register di Firebase Console
- [ ] `npx cap sync android` sukses
- [ ] `gradlew bundleRelease` sukses, output AAB exists
- [ ] `jarsigner -verify` sukses
- [ ] Play Console: Privacy Policy URL diisi
- [ ] Play Console: Data Safety form diisi
- [ ] Play Console: Content Rating questionnaire diisi
- [ ] Play Console: Listing copy (judul, deskripsi, kategori) diisi
- [ ] Play Console: Icon 512x512 + feature graphic 1024x500 uploaded
- [ ] Play Console: min 2 screenshots uploaded
- [ ] Internal Testing tester list ditambah

---

## Catatan Production

**Sebelum naik dari Internal Testing → Open Testing → Production:**
1. Internal testing minimum 14 hari (Google policy untuk app baru)
2. Crash rate < 1% (cek Play Console Vitals)
3. Tester feedback positive (minimum 12 tester aktif)
4. Privacy Policy + Data Safety + listing semua filled
5. App stability — uptime > 99%

Target Production launch: **awal Juli 2026** kalau Internal Testing mulai 20 Mei 2026.
