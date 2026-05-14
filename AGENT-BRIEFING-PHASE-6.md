# BRIEFING — Phase 6 Capacitor Android (H1-H5)

**Untuk Kyai:** Copy paste isi file ini sebagai prompt pertama di Claude Code session baru.

---

## 🤖 PROMPT AGENT

Halo. Kamu **Senior Developer, Solution Architect** lanjutan project **Portal MU / Ammu Online** (PWA Ponpes Mambaul Ulum, Sidoarjo). Phase 1-5 + Batch 1 polish SELESAI. Sekarang **Phase 6 Capacitor Android** — wrap PWA jadi APK Android untuk distribusi sideload + optional Play Store.

Panggil "Kyai". Bahasa Indonesia simple. Pattern: "diskusi → bagi step → approve → eksekusi". Reasoning singkat per decision.

---

## LANGKAH 1 — Konteks Project

**Working dir:** `D:\Aplikasi Project\Portal MU`
**Repo:** `https://github.com/kollepiyah/ammu.git`
**Deployed:** `https://portal-mambaul-ulum.web.app` (Firebase Hosting)

**Status pre-Phase 6:**
- Phase 1-5 complete (security, auth migration, code health, UI/UX polish, Vue 3 widgets 4/5 wired)
- Bug batch fix v.109.x deployed (toast freeze, logout DOM modal, KOP.png, etc.)
- 8 task Batch 1 polish complete (skeleton wire, empty state, aria-labelledby, dead modal cleanup)
- `APP_VERSION`: terbaru ~v.109.10+

**Tech stack:**
- Frontend: Vanilla JS SPA monolithic (`public/index.html` ~1.93 MB) + 4 Vue 3 widgets ADDITIVE
- Backend: Firebase Hosting + Firestore + Storage + Auth + Cloud Functions
- PWA: Service worker + manifest.json

---

## LANGKAH 2 — Phase 6 Scope: H1-H5 Capacitor Android

| Task | Effort | Risk | Detail |
|---|---|---|---|
| **H1** Setup Capacitor + Android Studio | 2 jam | LOW | Install Capacitor CLI, init project, integrate dengan existing `public/` |
| **H2** Sign APK dengan `ammu-app.keystore` | 30 menit | LOW | Keystore sudah ada di project. Configure gradle signing config |
| **H3** AssetLinks verification SHA256 | 30 menit | LOW | Generate SHA256 fingerprint, host `assetlinks.json` di Firebase Hosting (`.well-known/assetlinks.json`) |
| **H4** Internal sideload distribution | 30 menit | LOW | Build APK release → upload ke Google Drive → share link + QR code |
| **H5** Optional Play Store track | 1 jam | MEDIUM | $25 dev account → upload AAB → internal testing track |

**Total: ~5-6 jam, additive (web tetap jalan paralel).**

---

## LANGKAH 3 — H1 Detail: Setup Capacitor

### Prerequisites Check
```bash
node --version  # ≥ 18
npm --version
java --version  # JDK 17 required for Android Gradle Plugin 8
```

Install Android Studio: https://developer.android.com/studio
- SDK Platform: Android 14 (API 34)
- Build Tools: latest
- Set `ANDROID_HOME` env var

### Install Capacitor di Project
```bash
cd "D:\Aplikasi Project\Portal MU"
npm install --save @capacitor/core @capacitor/cli
npm install --save @capacitor/android
```

### Init Capacitor
```bash
npx cap init "Ammu Online" "com.mambaululum.ammu" --web-dir=public
```

Buat `capacitor.config.ts`:
```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.mambaululum.ammu',
  appName: 'Ammu Online',
  webDir: 'public',
  server: {
    // Untuk dev: bisa pakai live reload
    // androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
}

export default config
```

### Add Android Platform
```bash
npx cap add android
npx cap sync
```

Output folder: `android/`

### Build APK
```bash
cd android
./gradlew assembleRelease    # untuk signed release
# atau
./gradlew assembleDebug       # untuk debug build
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## LANGKAH 4 — H2 Detail: APK Signing

Keystore sudah ada di project: `ammu-app.keystore`.

### Setup Gradle Signing Config

File: `android/app/build.gradle`

```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../ammu-app.keystore')
            storePassword System.getenv('KEYSTORE_PASSWORD') ?: 'PROMPT'
            keyAlias System.getenv('KEY_ALIAS') ?: 'PROMPT'
            keyPassword System.getenv('KEY_PASSWORD') ?: 'PROMPT'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

Set env vars di Kyai laptop:
```powershell
$env:KEYSTORE_PASSWORD = "..."
$env:KEY_ALIAS = "..."
$env:KEY_PASSWORD = "..."
```

Atau pakai `~/.gradle/gradle.properties` (NEVER commit ke git).

### Verify Signed APK
```bash
keytool -printcert -jarfile app-release.apk | grep SHA256
# Output SHA256 fingerprint — pakai untuk H3 AssetLinks
```

---

## LANGKAH 5 — H3 Detail: AssetLinks (Universal Links)

Tujuan: Android auto-launch app dari deep link (mis. user klik link `portal-mambaul-ulum.web.app` → buka app, bukan browser).

### Generate AssetLinks JSON

File: `public/.well-known/assetlinks.json`

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.mambaululum.ammu",
      "sha256_cert_fingerprints": ["<SHA256_FINGERPRINT_FROM_H2>"]
    }
  }
]
```

### Deploy
```bash
firebase deploy --only hosting
```

Verify: `https://portal-mambaul-ulum.web.app/.well-known/assetlinks.json` accessible + content-type JSON.

### Android Manifest

File: `android/app/src/main/AndroidManifest.xml`

```xml
<activity android:name=".MainActivity">
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https"
          android:host="portal-mambaul-ulum.web.app" />
  </intent-filter>
</activity>
```

---

## LANGKAH 6 — H4 Detail: Internal Sideload Distribution

### Build Release APK
```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk` (sekitar 5-10 MB).

### Upload Distribution

Option A — Google Drive (paling simple):
1. Upload APK ke Google Drive
2. Share link: "Anyone with link can view"
3. Generate QR code: https://www.qr-code-generator.com/

Option B — Firebase App Distribution (auto-update):
1. Setup di Firebase Console → App Distribution
2. Upload APK
3. Invite testers via email

### User Install Steps
1. User scan QR atau klik link
2. Download APK
3. Enable "Install from Unknown Sources" di Settings
4. Tap install
5. App icon muncul di home screen

---

## LANGKAH 7 — H5 Detail: Optional Play Store Track

**Prasyarat:**
- Google Play Developer account: $25 one-time fee
- App icon HD (512×512)
- Feature graphic (1024×500)
- Screenshots (min 2, max 8)
- Privacy policy URL
- App description (full + short)

### Build AAB (Bundle, bukan APK)
```bash
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Upload ke Play Console
1. https://play.google.com/console
2. Create app: "Ammu Online"
3. Internal testing track → Upload AAB
4. Add testers (max 100 emails atau Google Group)
5. Submit for review (internal track usually instant)

---

## LANGKAH 8 — Aturan Eksekusi

### Constraint Kyai
- ❌ JANGAN ubah Firestore schema
- ❌ JANGAN ubah business logic
- ❌ JANGAN push/deploy tanpa Kyai approve
- ✅ Build pipeline + Android folder OK
- ✅ Modify capacitor.config.ts + AndroidManifest.xml OK

### Per Task
1. Diskusi plan + estimasi
2. Tunggu Kyai approve
3. Eksekusi
4. Verify build success
5. Generate `PHASE-6-H<N>-REPORT.md`

### Versioning
- H1: `v.110.0` / sw v300
- H2: `v.110.1` / sw v301
- H3: `v.110.2` / sw v302
- H4: `v.110.3` / sw v303
- H5: `v.110.4` / sw v304

---

## LANGKAH 9 — Verify State Sebelum Start

```bash
cd "D:\Aplikasi Project\Portal MU"
git log --oneline -5
grep "APP_VERSION = '" public/index.html | head -1
ls ammu-app.keystore  # Should exist
node --version  # ≥ 18
java --version  # JDK 17+
```

Expected: HEAD commit dengan `b1-` atau `Batch 1` keyword. APP_VERSION ~v.109.10+.

---

## LANGKAH 10 — What's Next After Phase 6

Phase 7 Tauri Desktop — wrap PWA jadi Win/Mac/Linux native app. Briefing tersedia di `AGENT-BRIEFING-PHASE-7.md`.

🌙→☀️ Selamat bekerja Phase 6 Capacitor. Quality over speed.
