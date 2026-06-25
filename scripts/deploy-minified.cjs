#!/usr/bin/env node
/**
 * Deploy Pipeline — Portal MU (full Supabase: Vue + PSB).
 *
 * v.110.0625: Build LEGACY DIBUANG dari deploy — app HTML5 legacy sudah TIDAK
 *   disajikan (hosting cuma main=public/vue + psb=public/psb; target `legacy` =
 *   legacy-redirect statis). Langkah yang dihapus: build:css (public/dist/tailwind.css),
 *   build:widgets (public/dist/widgets.js), build:html (minify index.html) + swap/restore
 *   root index.html — semua menyentuh public/dist & public/index.html yang TAK dideploy.
 *   Skrip legacy itu masih ADA di package.json (cuma tak dipanggil saat deploy);
 *   file legacy di public/ TIDAK dihapus (lihat catatan repo).
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname, '..', 'public')

function log(msg) {
  console.log(`[deploy] ${msg}`)
}

function run(cmd) {
  log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

try {
  // v.100f: JANGAN bake debug token App Check ke bundle WEB (publik bisa diekstrak -> bypass).
  //   Web pakai reCAPTCHA asli; debug token HANYA utk build NATIVE (AAB/Electron).
  //   Vite: env yg sudah ada di process.env menang atas .env.local -> override jadi kosong.
  process.env.VITE_APPCHECK_DEBUG_TOKEN = ''
  log('App Check: debug token DIKOSONGKAN utk bundle web (web pakai reCAPTCHA murni).')

  // ---- Step 1: Build Vue app (utama) + sync ke public/vue/ (hosting:main) ----
  log('Step 1: Build Vue app + sync ke public/vue/')
  run('npm run build --prefix vue-app')
  const VUE_DIST = path.join(__dirname, '..', 'vue-app', 'dist')
  const VUE_TARGET = path.join(PUBLIC, 'vue')
  if (!fs.existsSync(VUE_DIST)) {
    throw new Error('vue-app/dist tidak ada setelah build — deploy dibatalkan.')
  }
  if (fs.existsSync(VUE_TARGET)) fs.rmSync(VUE_TARGET, { recursive: true, force: true })
  fs.cpSync(VUE_DIST, VUE_TARGET, { recursive: true })
  log('✓ Vue dist copied → public/vue/')

  // v.86.0526: copy PWA assets + splash ke public/vue/ supaya Firebase main serve manifest+icons+splash
  const PWA_FILES = [
    'manifest.json', 'favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon-180.png',
    'icon-192.png', 'icon-512.png', 'icon-192-maskable.png', 'icon-512-maskable.png', 'icon-512-transparent.png',
    'logo.png', 'bakafrawi-logo.png',
    'splash-portrait-light.png', 'splash-portrait-dark.png',
    'splash-landscape-light.png', 'splash-landscape-dark.png'
  ]
  let copiedCount = 0
  for (const f of PWA_FILES) {
    const src = path.join(PUBLIC, f)
    const dst = path.join(VUE_TARGET, f)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst)
      copiedCount++
    }
  }
  const SPLASH_SRC = path.join(PUBLIC, 'splash')
  if (fs.existsSync(SPLASH_SRC)) {
    fs.cpSync(SPLASH_SRC, path.join(VUE_TARGET, 'splash'), { recursive: true })
  }
  log(`✓ ${copiedCount} PWA assets + splash copied → public/vue/`)

  // ---- Step 2: Build PSB sub-app + sync ke public/psb/ (hosting:psb) ----
  log('Step 2: Build PSB (vue-app-psb) + sync ke public/psb/')
  try {
    run('npm run build --prefix vue-app-psb')
    const PSB_DIST = path.join(__dirname, '..', 'vue-app-psb', 'dist')
    const PSB_TARGET = path.join(PUBLIC, 'psb')
    if (fs.existsSync(PSB_DIST)) {
      if (fs.existsSync(PSB_TARGET)) fs.rmSync(PSB_TARGET, { recursive: true, force: true })
      fs.cpSync(PSB_DIST, PSB_TARGET, { recursive: true })
      log('✓ PSB dist copied → public/psb/')
    } else {
      log('⚠ vue-app-psb/dist tidak ada, skip PSB sync (deploy public/psb existing)')
    }
  } catch (e) {
    log(`⚠ PSB build error (skip, deploy public/psb existing): ${e.message}`)
  }

  // ---- Step 3: Firebase deploy — 2 site: main (Vue) + psb ----
  // v.87.0526: hosting:legacy (portal-mambaul-ulum) DIHAPUS — legacy tak dipakai.
  // v.109: firestore:rules DIHAPUS — app sudah full Supabase.
  log('Step 3: firebase deploy --only hosting:main,hosting:psb')
  run('firebase deploy --only hosting:main,hosting:psb')

  log('✓ Deploy selesai.')
  log('   Vue (utama)  → https://ammuonline.web.app')
  log('   PSB          → https://ammuonline-psb.web.app')
  log('')
  log('💡 Rebuild AAB (Play Store): npm run build:aab')
  log('   AAB versionCode/Name ikut vue-app/android/app/build.gradle (cek sebelum rilis)')
} catch (err) {
  console.error('[deploy] FAILED:', err.message)
  process.exit(1)
}
