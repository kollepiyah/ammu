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
 * Note: v.12.0526 pakai Capacitor mode REMOTE (server.url → ammuonline.web.app),
 * jadi assets di AAB hanya bootstrap shell. Update web content cukup `firebase:deploy`,
 * AAB tidak perlu rebuild tiap bug fix kecil. Rebuild AAB hanya saat:
 *   - Bump versionCode (Play Store release)
 *   - Update Capacitor plugins / native code
 *   - Update splash / icon / theme XML
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const ANDROID_DIR = path.join(ROOT, 'android')
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
  log('Step 1: Sync Capacitor — public/ → android assets')
  run('npx cap sync android', { cwd: ROOT })

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
