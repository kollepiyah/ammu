# Capacitor Setup Guide — Ammu Online

v.21.115.0528 · Step-by-step build APK Android + IPA iOS + Desktop Electron.

---

## Prasyarat

- ✅ Node.js 18+ + npm
- ✅ Vue app sudah build (`npm run build` di `vue-app/`)
- ✅ Output `public/vue/` ada (vite build)
- ✅ Untuk Android: Android Studio + JDK 17 + Android SDK
- ✅ Untuk iOS: Mac + Xcode 14+ (atau cloud build seperti AppFlow/Codemagic)
- ✅ Untuk Desktop: nothing special (Electron build cross-platform)

---

## CAP-1: ANDROID BUILD

### Step 1 — Install Capacitor packages

```bash
cd vue-app
npm install --save @capacitor/core @capacitor/android
npm install --save-dev @capacitor/cli
npm install --save @capacitor/splash-screen @capacitor/status-bar @capacitor/keyboard @capacitor/haptics @capacitor/network @capacitor/app
```

### Step 2 — Init Capacitor (sudah ada `capacitor.config.ts`, skip kalau OK)

```bash
# Skip kalau capacitor.config.ts sudah ada (kita sudah generate di repo)
# npx cap init "Ammu Online" "id.web.ammuonline" --web-dir=public/vue
```

### Step 3 — Add Android platform

```bash
npx cap add android
```

Ini akan generate folder `vue-app/android/`. **Folder ini harus di-commit ke git.**

### Step 4 — Sync web assets ke native project

```bash
# Build Vue dulu
npm run build

# Sync ke Android
npx cap sync android
```

### Step 5 — Generate icons + splash screens

```bash
npm install --save-dev @capacitor/assets

# Taruh logo source di:
#   vue-app/resources/icon.png       (1024x1024)
#   vue-app/resources/splash.png     (2732x2732)
#   vue-app/resources/splash-dark.png

npx capacitor-assets generate --android
```

### Step 6 — Open di Android Studio + Build APK

```bash
npx cap open android
```

Di Android Studio:
1. **Build → Generate Signed Bundle / APK**
2. Pilih APK
3. Create new keystore (simpan baik-baik) atau pakai existing
4. Pilih `release` build variant
5. Output: `vue-app/android/app/release/app-release.apk`

### Step 7 — Test di device

```bash
adb install vue-app/android/app/release/app-release.apk
```

Atau drag APK ke emulator/device.

---

## CAP-2: iOS BUILD (via 3uTools sideload)

> User req: tanpa App Store, pakai 3uTools sideload.

### Step 1 — Add iOS platform (di Mac saja)

```bash
cd vue-app
npx cap add ios
npx cap sync ios
```

### Step 2 — Open Xcode

```bash
npx cap open ios
```

Di Xcode:
1. **Signing & Capabilities → Personal Team** (free Apple ID)
2. Bundle ID: `id.web.ammuonline`
3. **Product → Archive** (untuk build IPA)
4. Distribute App → **Development** → Export → IPA

### Step 3 — Sideload via 3uTools (di Windows)

1. Buka 3uTools di Windows
2. Plug iPhone via USB
3. Apps tab → "Install local apps"
4. Pilih file `.ipa` hasil Xcode archive
5. Install — iOS akan trust setelah konfirmasi di Settings → General → VPN & Device Management

**Catatan**: free Apple ID = app expire 7 hari, harus re-sign. Untuk production sideload reliable pakai Apple Developer Program ($99/year) atau cloud signing service.

---

## CAP-3: DESKTOP (Electron bundled)

### Step 1 — Install Capacitor Electron

```bash
cd vue-app
npm install --save @capacitor-community/electron
```

### Step 2 — Add Electron platform

```bash
npx cap add @capacitor-community/electron
```

### Step 3 — Configure Electron build (electron-builder)

Tambah di `vue-app/electron/package.json`:

```json
{
  "build": {
    "appId": "id.web.ammuonline",
    "productName": "Ammu Online",
    "publish": {
      "provider": "github",
      "owner": "YOUR_GITHUB_USER",
      "repo": "ammu-online"
    },
    "win": {
      "target": "nsis",
      "icon": "../resources/icon.png"
    },
    "mac": {
      "target": "dmg",
      "icon": "../resources/icon.png"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

### Step 4 — Build native installer

```bash
cd vue-app
npm run build
npx cap sync @capacitor-community/electron

cd electron
npm install
npm run electron:build-win    # Windows
npm run electron:build-mac    # Mac
npm run electron:build-linux  # Linux
```

Output: `vue-app/electron/dist/Ammu Online Setup.exe` (Windows installer)

### Step 5 — Auto-update via electron-updater

```bash
cd vue-app/electron
npm install --save electron-updater
```

Tambah di `vue-app/electron/src/index.ts`:

```typescript
import { autoUpdater } from 'electron-updater'

autoUpdater.checkForUpdatesAndNotify()
```

GitHub Releases sebagai update server — upload `.exe` ke release page.

### Step 6 — Native printing (struk dot-matrix)

Wire IPC channel:

```typescript
// electron/src/index.ts (main process)
import { ipcMain } from 'electron'

ipcMain.handle('print-receipt', async (event, htmlContent) => {
  const win = BrowserWindow.getFocusedWindow()
  await win.webContents.print({
    silent: true,
    printBackground: false,
    pageSize: { width: 80000, height: 297000 }, // 80mm thermal
    margins: { marginType: 'none' }
  })
})
```

Di Vue (renderer):

```javascript
if (window.electron?.printReceipt) {
  await window.electron.printReceipt(htmlContent)
} else {
  // fallback ke window.print() di browser
  window.print()
}
```

---

## CAP-4: LOGIN PAGE DOWNLOAD BUTTONS

Setelah semua build siap, upload ke GitHub Releases atau Firebase Storage. Update `LoginView.vue` dengan download section di bawah card login.

Sketch link structure:

```
https://github.com/USER/REPO/releases/latest/download/AmmuOnline.apk
https://github.com/USER/REPO/releases/latest/download/AmmuOnline.ipa
https://github.com/USER/REPO/releases/latest/download/AmmuOnline-Setup.exe
```

---

## CI/CD (Optional)

GitHub Actions workflow di `.github/workflows/build.yml` bisa otomasi:
1. Trigger on tag push (e.g. `v21.115.0`)
2. Build Vue → APK Android → Upload to release
3. Build Electron → Setup.exe → Upload to release
4. iOS perlu Mac runner (GitHub Actions macos-latest)

Contoh skeleton — bisa ditambah nanti.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `JAVA_HOME not set` | Set env var ke JDK 17 install path |
| Android Studio "Gradle sync failed" | File → Invalidate Caches & Restart |
| iOS "code signing failed" | Pastikan Apple ID di Xcode Preferences, Bundle ID unique |
| Electron "module not found" | `npm install` di folder `electron/` setelah `cap add` |
| Splash screen tidak muncul | Regenerate via `npx capacitor-assets generate` |
| Hash mode router glitch di Android back button | Wire `@capacitor/app` `backButton` listener ke Vue Router |

---

## File yang harus di-commit ke git

```
vue-app/capacitor.config.ts       ✅ sudah generate
vue-app/android/                  ✅ commit setelah cap add
vue-app/ios/                      ✅ commit setelah cap add (di Mac)
vue-app/electron/                 ✅ commit setelah cap add
vue-app/resources/                ✅ source icon + splash
```

Yang JANGAN di-commit (sudah .gitignore default):
```
vue-app/android/.gradle/
vue-app/android/build/
vue-app/android/app/build/
vue-app/ios/Pods/
vue-app/electron/dist/
vue-app/electron/node_modules/
```
