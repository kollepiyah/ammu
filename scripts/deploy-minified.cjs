#!/usr/bin/env node
/**
 * Minified Deploy Pipeline — Portal MU
 *
 * Pattern: backup index.html → swap minified in → run firebase deploy → restore original
 * Ini menjaga `public/index.html` (yang di-edit dev) tetap human-readable di git,
 * sementara yang dideploy ke hosting Firebase versi minified (~37% lebih kecil).
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname, '..', 'public')
const SRC = path.join(PUBLIC, 'index.html')
const MIN = path.join(PUBLIC, 'index.min.html')
const BAK = path.join(PUBLIC, 'index.html.deploy-bak')

function log(msg) {
  console.log(`[deploy-minified] ${msg}`)
}

function run(cmd) {
  log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

function restore() {
  if (fs.existsSync(BAK)) {
    fs.copyFileSync(BAK, SRC)
    fs.unlinkSync(BAK)
    log('Original index.html restored.')
  }
}

process.on('SIGINT', () => {
  restore()
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.error('[deploy-minified] error:', err.message)
  restore()
  process.exit(1)
})

try {
  log('Step 0: Regenerate Tailwind CSS (mencegah dist/tailwind.css missing/stale)')
  const DIST_TAILWIND = path.join(PUBLIC, 'dist', 'tailwind.css')
  run('npm run build:css')
  if (!fs.existsSync(DIST_TAILWIND)) {
    throw new Error(`Tailwind output missing setelah build:css: ${DIST_TAILWIND}`)
  }
  const cssSize = fs.statSync(DIST_TAILWIND).size
  log(`Tailwind.css regenerated: ${cssSize} bytes`)

  // v.37.0526: Build Vue app + sync ke public/vue/ supaya Vue routes deployable
  log('Step 0b: Build Vue app + sync ke public/vue/')
  try {
    run('npm run build --prefix vue-app')
    const VUE_DIST = path.join(__dirname, '..', 'vue-app', 'dist')
    const VUE_TARGET = path.join(PUBLIC, 'vue')
    if (fs.existsSync(VUE_DIST)) {
      // Clean target
      if (fs.existsSync(VUE_TARGET)) fs.rmSync(VUE_TARGET, { recursive: true, force: true })
      // Copy recursive
      fs.cpSync(VUE_DIST, VUE_TARGET, { recursive: true })
      log(`✓ Vue dist copied → public/vue/`)
    } else {
      log('⚠ vue-app/dist tidak ada, skip Vue sync')
    }
  } catch (e) {
    log(`⚠ Vue build error (skip, deploy legacy only): ${e.message}`)
  }

  // v.52.0526: Build Vue widgets bundle juga (PostCard, KalenderPendidikan, ModalPOS, dll)
  // Output: public/dist/widgets.js — di-import oleh legacy index.html via window.AmmuWidgets
  log('Step 0c: Build Vue widgets bundle → public/dist/widgets.js')
  try {
    run('npm run build:widgets')
    const WIDGETS_OUT = path.join(PUBLIC, 'dist', 'widgets.js')
    if (fs.existsSync(WIDGETS_OUT)) {
      log(`✓ widgets.js rebuilt: ${fs.statSync(WIDGETS_OUT).size} bytes`)
    } else {
      log('⚠ widgets.js tidak ada setelah build, kemungkinan output path beda')
    }
  } catch (e) {
    log(`⚠ Widgets build error (skip, pakai widgets.js existing): ${e.message}`)
  }

  log('Step 1: Build minified bundle')
  run('npm run build:html')

  if (!fs.existsSync(MIN)) {
    throw new Error(`Minified output missing: ${MIN}`)
  }
  const minSize = fs.statSync(MIN).size
  const srcSize = fs.statSync(SRC).size
  log(
    `Original: ${srcSize} bytes / Minified: ${minSize} bytes (saved ${(((srcSize - minSize) / srcSize) * 100).toFixed(1)}%)`
  )

  log('Step 2: Backup original index.html')
  fs.copyFileSync(SRC, BAK)

  log('Step 3: Swap minified ke index.html (v.49 REVERT — legacy balik ke root /)')
  // v.49.0526: REVERT hard swap v.46. Legacy minified jadi root /, Vue tetap deploy ke /vue/ subpath.
  // Alasan: Vue belum full feature parity (Dashboard widgets lengkap, login akun terdata, AmmuPOS, dll).
  // Tester guru pakai legacy stable. Vue lanjut dev paralel di /vue/.
  fs.copyFileSync(MIN, SRC)
  log(`✓ Minified legacy disalin ke / (root) — Vue tetap accessible di /vue/`)

  log('Step 4: Run firebase deploy — multi-target (main = Vue ammuonline, legacy = portal-mambaul-ulum)')
  // v.20.0526: Multi-site hosting
  // - hosting:main → site `ammuonline` (Vue di public/vue/) → ammuonline.web.app
  // - hosting:legacy → site `portal-mambaul-ulum` (legacy public/) → portal-mambaul-ulum.web.app
  // v.20.15.0526: deploy firestore rules juga (kalau ada perubahan koleksi/rules baru)
  run('firebase deploy --only hosting:main,hosting:legacy,firestore:rules')

  log('Step 5: Restore original index.html (untuk dev)')
  restore()

  log('✓ Deploy selesai (v.20.0526). Original file intact.')
  log('   Vue (utama)  → https://ammuonline.web.app')
  log('   Legacy backup → https://portal-mambaul-ulum.web.app')
  log('')
  log('💡 Untuk rebuild AAB (Play Store): npm run build:aab')
  log('   AAB versionCode 20, versionName "20.0526" — match web version')
} catch (err) {
  console.error('[deploy-minified] FAILED:', err.message)
  restore()
  process.exit(1)
}
