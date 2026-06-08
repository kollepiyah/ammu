#!/usr/bin/env node
/**
 * AAB Rebuild Pipeline — Portal MU / Ammu Online
 *
 * Steps:
 *   1. npx cap sync android (sync public/ → android/app/src/main/assets/public/)
 *   2. cd android && gradlew bundleRelease (generate signed AAB)
 *   3. Echo path AAB output ke kyai
 *
 * Pre-requisites:
 *   - Java JDK 17+ installed
 *   - Android SDK + ANDROID_HOME env var set
 *   - Keystore configured di android/app (signingConfigs.debug pakai default keystore)
 *
 * Output:
 *   android/app/build/outputs/bundle/release/app-release.aab
 *
 * Note: v.96.0626 — Capacitor mode NATIVE (vue-app/capacitor.config.json: webDir "dist",
 * TANPA server.url). Web di-BUNDLE ke AAB → SEMUA perubahan .vue/.js + splash/native baru
 * sampai ke app HP SETELAH rebuild AAB ini. `firebase:deploy` HANYA update PWA/browser,
 * BUKAN app terinstal. (Komentar lama "mode REMOTE" USANG — itu root/android legacy vc70.)
 * Rebuild AAB tiap: perubahan kode web, bump versionCode, plugin/native, splash/icon/theme.
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
// v.86.0526: Pakai vue-app/android (Capacitor 8 + JDK 21 + Kotlin 2.0.21 + versionCode 85)
//   Sebelumnya ROOT/android = legacy versionCode 70 (tidak dipakai)
const VUE_APP = path.join(ROOT, 'vue-app')
const ANDROID_DIR = path.join(VUE_APP, 'android')
const AAB_PATH = path.join(
  ANDROID_DIR,
  'app',
  'build',
  'outputs',
  'bundle',
  'release',
  'app-release.aab'
)

function log(msg) {
  console.log(`[build-aab] ${msg}`)
}

function run(cmd, opts = {}) {
  log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

try {
  // v.86.0526: Step 1 — build Vue terbaru ke vue-app/dist (capacitor.config webDir = "dist")
  log('Step 1: Build Vue app → vue-app/dist/')
  run('npm run build --prefix vue-app', { cwd: ROOT })

  // v.86.0526: Force-delete Android assets/public dulu sebelum cap sync — cap sync
  //   kadang skip overwrite kalau detect hash sama. Force clean = guaranteed fresh assets.
  const ANDROID_ASSETS = path.join(ANDROID_DIR, 'app', 'src', 'main', 'assets', 'public')
  if (fs.existsSync(ANDROID_ASSETS)) {
    log('Step 1b: Force-delete Android assets/public/ (avoid cap sync stale cache)')
    fs.rmSync(ANDROID_ASSETS, { recursive: true, force: true })
  }

  log('Step 1c: Sync Capacitor — vue-app/dist → vue-app/android/app/src/main/assets/public/')
  // v.86.0526: webDir = "dist" (relative ke capacitor.config.json) — langsung baca Vue build output
  run('npx cap sync android', { cwd: VUE_APP })

  log('Step 2: Run gradle bundleRelease (generate signed AAB)')
  // Windows: gradlew.bat, Linux/Mac: ./gradlew
  const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew'
  run(`${gradlew} bundleRelease`, { cwd: ANDROID_DIR })

  if (fs.existsSync(AAB_PATH)) {
    const size = (fs.statSync(AAB_PATH).size / 1024 / 1024).toFixed(2)
    log(`✓ AAB rebuilt: ${AAB_PATH}`)
    log(`  Size: ${size} MB`)
    log('')
    log('Next steps (kyai manual):')
    log('  1. Upload AAB ke Play Console → Internal testing track')
    log('  2. Tunggu Play Store review (1-3 jam)')
    log('  3. Test install via Play Store internal tester link')
  } else {
    throw new Error(`AAB output missing: ${AAB_PATH}`)
  }
} catch (err) {
  console.error('[build-aab] FAILED:', err.message)
  console.error('')
  console.error('Common issues:')
  console.error('  - JAVA_HOME not set → install JDK 17+ dan set env var')
  console.error('  - ANDROID_HOME not set → install Android SDK')
  console.error('  - Keystore missing → cek android/app/build.gradle signingConfig')
  process.exit(1)
}
