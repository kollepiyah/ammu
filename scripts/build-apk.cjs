#!/usr/bin/env node
/**
 * APK Rebuild Pipeline — Portal MU / Ammu Online (UNTUK TESTER / sideload)
 *
 * Sama dengan build-aab.cjs, tapi menghasilkan APK (assembleRelease), bukan AAB.
 * APK bisa langsung dikirim & di-install di HP tester (tanpa Play Store).
 *
 * Steps:
 *   1. npm run build --prefix vue-app   (build Vue → vue-app/dist/)
 *   2. Force-delete android assets/public (hindari cache cap sync basi)
 *   3. npx cap sync android             (dist → android assets/public)
 *   4. cd android && gradlew assembleRelease  (generate signed APK)
 *
 * Output:
 *   vue-app/android/app/build/outputs/apk/release/app-release.apk
 *
 * Pre-requisites: sama dgn build:aab (JDK, Android SDK, keystore release).
 * Catatan: APK ini ber-signature SAMA dengan AAB (signingConfigs.release).
 * Tester perlu mengaktifkan "Install unknown apps" untuk app pengirim (mis. WhatsApp/Files).
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const VUE_APP = path.join(ROOT, 'vue-app')
const ANDROID_DIR = path.join(VUE_APP, 'android')
const APK_PATH = path.join(
  ANDROID_DIR,
  'app',
  'build',
  'outputs',
  'apk',
  'release',
  'app-release.apk'
)

function log(msg) {
  console.log(`[build-apk] ${msg}`)
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

try {
  log('Step 1: Build Vue app → vue-app/dist/')
  run('npm run build --prefix vue-app', { cwd: ROOT })

  const ANDROID_ASSETS = path.join(ANDROID_DIR, 'app', 'src', 'main', 'assets', 'public')
  if (fs.existsSync(ANDROID_ASSETS)) {
    log('Step 1b: Force-delete Android assets/public/ (avoid cap sync stale cache)')
    fs.rmSync(ANDROID_ASSETS, { recursive: true, force: true })
  }

  log('Step 1c: Sync Capacitor — vue-app/dist → vue-app/android/app/src/main/assets/public/')
  run('npx cap sync android', { cwd: VUE_APP })

  log('Step 2: Run gradle assembleRelease (generate signed APK)')
  const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew'
  run(`${gradlew} assembleRelease`, { cwd: ANDROID_DIR })

  if (fs.existsSync(APK_PATH)) {
    const size = (fs.statSync(APK_PATH).size / 1024 / 1024).toFixed(2)
    log(`✓ APK rebuilt: ${APK_PATH}`)
    log(`  Size: ${size} MB`)
    log('')
    log('Next steps (kyai manual):')
    log('  1. Kirim app-release.apk ke tester (WhatsApp / Google Drive / kabel USB)')
    log('  2. Di HP tester: aktifkan "Install unknown apps" untuk app pengirim')
    log('  3. Buka file APK → Install. (Kalau ada versi lama dgn signature beda, uninstall dulu)')
  } else {
    throw new Error(`APK output missing: ${APK_PATH}`)
  }
} catch (err) {
  console.error('[build-apk] FAILED:', err.message)
  console.error('')
  console.error('Common issues:')
  console.error('  - JAVA_HOME not set → install JDK 17+ dan set env var')
  console.error('  - ANDROID_HOME not set → install Android SDK')
  console.error('  - Keystore missing → cek vue-app/android/app/build.gradle signingConfig')
  process.exit(1)
}
