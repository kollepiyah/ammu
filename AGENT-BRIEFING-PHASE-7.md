# BRIEFING — Phase 7 Tauri Desktop (I1-I4)

**Untuk Kyai:** Copy paste isi file ini sebagai prompt pertama di Claude Code session baru.

---

## 🤖 PROMPT AGENT

Halo. Kamu **Senior Developer** lanjutan project **Portal MU / Ammu Online** (PWA Ponpes Mambaul Ulum). Phase 1-6 SELESAI. Sekarang **Phase 7 Tauri Desktop** — wrap PWA jadi native desktop app (Win/Mac/Linux) untuk distribusi internal pondok.

Panggil "Kyai". Bahasa Indonesia simple. Pattern: diskusi → approve → eksekusi.

---

## LANGKAH 1 — Konteks Project

**Working dir:** `D:\Aplikasi Project\Portal MU`
**Repo:** `https://github.com/kollepiyah/ammu.git`

**Status pre-Phase 7:**
- Phase 1-6 done: web PWA + Android APK distribution
- `APP_VERSION` terbaru ~v.110.x (Capacitor)
- Tech: vanilla JS SPA + Vue 3 widgets + Firebase

---

## LANGKAH 2 — Phase 7 Scope: I1-I4 Tauri

| Task | Effort | Risk | Detail |
|---|---|---|---|
| **I1** Rust + Cargo install | 1 jam | LOW | rustup-init, configure path, install build tools |
| **I2** Tauri scaffold | 1 jam | LOW | `cargo install tauri-cli`, `npm create tauri-app` |
| **I3** Build Win/Mac/Linux | 3 jam | MEDIUM | Multi-platform build, code signing optional |
| **I4** Internal distribution | 30 menit | LOW | Drive link + installer per OS |

**Total: ~5-7 jam.**

---

## LANGKAH 3 — I1 Detail: Rust + Cargo

### Install rustup
- Windows: https://rustup.rs/ → run `rustup-init.exe`
- Verify: `rustc --version`, `cargo --version`

### Install Visual Studio Build Tools (Windows only)
- Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
- Workload: "Desktop development with C++"
- Required: MSVC + Windows 10/11 SDK

### Install Tauri Prerequisites
```bash
# Windows
# WebView2 sudah pre-installed di Win11/Win10 update terbaru

# Verify
rustup target list --installed
```

---

## LANGKAH 4 — I2 Detail: Tauri Scaffold

### Install Tauri CLI
```bash
cd "D:\Aplikasi Project\Portal MU"
npm install --save-dev @tauri-apps/cli
```

### Init Tauri di Project
```bash
npx tauri init
```

Prompts:
- App name: `Ammu Online`
- Window title: `Portal MU`
- Web assets location: `../public` (relative dari src-tauri/)
- Dev server URL: `https://portal-mambaul-ulum.web.app` (production deployed) atau local `http://localhost:5000` (firebase serve)

Output folder: `src-tauri/`

### Tauri Config

File: `src-tauri/tauri.conf.json`
```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "Ammu Online",
  "version": "1.0.0",
  "identifier": "com.mambaululum.ammu",
  "build": {
    "frontendDist": "../public",
    "devUrl": "http://localhost:5000"
  },
  "app": {
    "windows": [
      {
        "title": "Portal MU / Ammu Online",
        "width": 1280,
        "height": 800,
        "minWidth": 1024,
        "minHeight": 600,
        "resizable": true,
        "fullscreen": false
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

Generate icons (kalau belum ada):
```bash
npx tauri icon /path/to/source-icon.png
```

### Dev Run
```bash
npx tauri dev
```

Window pop up dengan PWA loaded. Hot reload kalau index.html berubah.

---

## LANGKAH 5 — I3 Detail: Build Multi-Platform

### Windows (.msi + .exe)
```bash
npx tauri build
```
Output:
- `src-tauri/target/release/bundle/msi/Ammu Online_1.0.0_x64_en-US.msi`
- `src-tauri/target/release/bundle/nsis/Ammu Online_1.0.0_x64-setup.exe`

### macOS (.dmg + .app)
**Requires:** macOS Build environment (cannot cross-compile from Windows easily).

Options:
- A. Sewa Mac (Travis CI, GitHub Actions macOS runner)
- B. Pinjam Mac fisik

```bash
# Di macOS
npx tauri build --target universal-apple-darwin
```

Output: `src-tauri/target/release/bundle/dmg/Ammu Online_1.0.0_x64.dmg`

### Linux (.AppImage + .deb)
**Requires:** Linux build environment (atau WSL2 di Windows).

```bash
# Di Ubuntu / WSL2
sudo apt install libwebkit2gtk-4.0-dev libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
npx tauri build
```

Output:
- `src-tauri/target/release/bundle/appimage/ammu-online_1.0.0_amd64.AppImage`
- `src-tauri/target/release/bundle/deb/ammu-online_1.0.0_amd64.deb`

### Code Signing (Optional)
- Windows: kode signing cert ($100-300/year) — bypass "Unknown publisher" warning
- macOS: Apple Developer Program ($99/year) — bypass Gatekeeper
- Linux: GPG signature (free)

Untuk internal pondok, code signing OPSIONAL — user bisa accept warning sendiri.

---

## LANGKAH 6 — I4 Detail: Internal Distribution

### Upload ke Google Drive
1. Buat folder `Ammu Online — Desktop Install`
2. Upload semua installer:
   - Windows: `Ammu Online_1.0.0_x64-setup.exe`
   - macOS: `Ammu Online_1.0.0_x64.dmg`
   - Linux: `ammu-online_1.0.0_amd64.AppImage`
3. Share folder: "Anyone with link"

### Generate Install Guide

File: `INSTALL-DESKTOP.md`

```markdown
# Install Portal MU Desktop

## Windows
1. Download: <Drive link Win installer>
2. Run setup.exe
3. Klik "More info" → "Run anyway" (kalau ada warning)
4. Follow installer wizard
5. App icon di Start Menu

## macOS
1. Download: <Drive link DMG>
2. Buka .dmg
3. Drag Ammu Online ke Applications
4. First run: Right-click app → Open → Confirm

## Linux (AppImage)
1. Download .AppImage
2. chmod +x ammu-online_1.0.0_amd64.AppImage
3. ./ammu-online_1.0.0_amd64.AppImage
```

### Auto-Update (Optional)

Tauri punya built-in updater. Setup:
1. Generate signing keypair: `npx tauri signer generate`
2. Host updater JSON di Firebase Hosting: `public/desktop-updater.json`
3. Configure di `tauri.conf.json`:
   ```json
   "updater": {
     "active": true,
     "endpoints": ["https://portal-mambaul-ulum.web.app/desktop-updater.json"],
     "pubkey": "<PUBLIC_KEY>"
   }
   ```

User app cek update on launch, auto-download + install.

---

## LANGKAH 7 — Aturan Eksekusi

### Constraint Kyai
- ❌ JANGAN ubah Firestore schema, business logic, auth flow
- ❌ JANGAN push/deploy tanpa Kyai approve
- ✅ Modify tauri.conf.json + src-tauri/ folder OK
- ✅ Generate icons OK

### Per Task
1. Diskusi plan + estimasi → Kyai approve → eksekusi
2. Verify build success
3. Generate `PHASE-7-I<N>-REPORT.md`

### Versioning
- I1: `v.111.0` / sw v305
- I2: `v.111.1` / sw v306
- I3: `v.111.2` / sw v307
- I4: `v.111.3` / sw v308

---

## LANGKAH 8 — Verify State

```bash
cd "D:\Aplikasi Project\Portal MU"
git log --oneline -5
grep "APP_VERSION = '" public/index.html | head -1
# Should be ~v.110.x (post-Capacitor)
```

---

## LANGKAH 9 — Tauri vs Capacitor Comparison

| Aspect | Capacitor (Android) | Tauri (Desktop) |
|---|---|---|
| Use case | Mobile install | Desktop install |
| Bundle size | 5-10 MB APK | 5-15 MB binary |
| Tech | Java/Kotlin wrapper | Rust wrapper |
| WebView | Android System WebView | Native (WebView2/WKWebView/WebKitGTK) |
| Offline | PWA cache | PWA cache |
| Distribution | Drive/Play Store | Drive/Direct |

Phase 6 + 7 = **lengkap** — Portal MU bisa di-install di:
- iOS/Android (PWA add-to-homescreen + Android APK)
- Windows/Mac/Linux (Tauri installer)
- Browser web (Firebase Hosting)

---

🌙→☀️ Selamat bekerja Phase 7 Tauri. Quality over speed.
