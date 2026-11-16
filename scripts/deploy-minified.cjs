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

/**
 * Ganti isi folder tujuan dengan isi folder sumber, tahan gangguan Windows.
 *
 * Kyai 16 Nov 2026: deploy mati di tengah dengan
 *   `ENOENT ... '\\?\D:\...\public\vue\assets'`
 * padahal perintah yang SAMA berhasil saat diulang beberapa detik kemudian (186 berkas
 * tersalin lengkap). Build-nya pun 2m52s, ~4x biasanya. Tandanya jelas: pemindai
 * antivirus/pengindeks masih memegang berkas yang baru ditulis Vite, dan di Windows
 * penghapusan folder TIDAK selesai seketika — folder "pending delete" membuat cpSync
 * berikutnya gagal ENOENT di dalamnya. Logikanya benar, lingkungannya yang bermusuhan,
 * jadi obatnya mengulang — bukan mengubah cara menyalin.
 */
function salinGanti(src, dst, nama) {
  const PERCOBAAN = 5
  const tidur = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  for (let ke = 1; ke <= PERCOBAAN; ke++) {
    try {
      if (fs.existsSync(dst)) fs.rmSync(dst, { recursive: true, force: true })
      fs.mkdirSync(dst, { recursive: true })
      fs.cpSync(src, dst, { recursive: true })
      if (ke > 1) log(`  ✓ ${nama} berhasil pada percobaan ke-${ke}`)
      return
    } catch (e) {
      if (ke === PERCOBAAN) {
        throw new Error(
          `${nama}: gagal menyalin sesudah ${PERCOBAAN} percobaan (${e.code || ''} ${e.message}). ` +
            'Tutup Ammu Desktop/Explorer yang membuka folder itu, atau kecualikan folder project ' +
            'dari pemindaian antivirus, lalu ulangi.'
        )
      }
      log(`  ⚠ ${nama} gagal (${e.code || e.message}) — ulang dalam ${ke} detik…`)
      tidur(ke * 1000)
    }
  }
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
  salinGanti(VUE_DIST, VUE_TARGET, 'vue-app/dist → public/vue')
  log('✓ Vue dist copied → public/vue/')

  // v.86.0526: copy PWA assets + splash ke public/vue/ supaya Firebase main serve manifest+icons+splash
  //
  // ⚠️ Langkah ini menyalin dari `public/` ROOT (warisan era legacy) dan berjalan SESUDAH
  //    cpSync(vue-app/dist) di atas — jadi untuk berkas yang ada di KEDUA tempat, versi root
  //    MENINDIH keluaran Vite tanpa suara. Terbukti 3 Agu 2026: `bakafrawi-logo.png` sudah
  //    diperkecil 64 kB -> 13 kB di vue-app/public, tapi yang ter-deploy tetap 64 kB.
  //    Daftar ini karena itu HANYA untuk berkas yang memang tak ada di vue-app/public
  //    (diperiksa 3 Agu: 14 dari 16 entri lama begitu). `logo.png` & `bakafrawi-logo.png`
  //    DIKELUARKAN — keduanya ada di vue-app/public dan sudah ikut terbawa Vite.
  //    Kalau menambah entri baru: pastikan berkasnya TIDAK ada di vue-app/public.
  const PWA_FILES = [
    'manifest.json', 'favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon-180.png',
    'icon-192.png', 'icon-512.png', 'icon-192-maskable.png', 'icon-512-maskable.png', 'icon-512-transparent.png',
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
      salinGanti(PSB_DIST, PSB_TARGET, 'vue-app-psb/dist → public/psb')
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
