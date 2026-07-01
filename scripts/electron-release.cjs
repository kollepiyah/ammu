#!/usr/bin/env node
/**
 * Electron Release Pipeline — Ammu Online Desktop.
 *
 * Membungkus alur manual jadi 1 perintah:
 *   1) Build Vue KHUSUS Electron (vite --base=./ → vue-app/dist; base relatif utk file://,
 *      App Check debug token IKUT — beda dari build web yang dikosongkan).
 *   2) Mirror dist → vue-app/electron/app (setara robocopy /MIR: hapus lama + salin baru).
 *   3) Publish 2 installer (Win7 + modern) ke GitHub Release v{version electron}.
 *
 * PRASYARAT: env var GH_TOKEN sudah di-set — JANGAN hardcode token di file ini.
 *   PowerShell sekali (permanen): setx GH_TOKEN "token_kamu"  → lalu buka PowerShell BARU.
 *   electron-builder membaca GH_TOKEN dari environment secara otomatis.
 */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const VUE = path.join(ROOT, 'vue-app')
const DIST = path.join(VUE, 'dist')
const APP = path.join(VUE, 'electron', 'app')
const ELECTRON = path.join(VUE, 'electron')

function log(m) {
  console.log(`[electron-release] ${m}`)
}
function run(cmd, cwd = ROOT) {
  log(`$ ${cmd}${cwd !== ROOT ? `   (cwd: ${path.relative(ROOT, cwd) || '.'})` : ''}`)
  execSync(cmd, { stdio: 'inherit', cwd, env: process.env })
}

try {
  // Guard: token WAJIB ada di env (bukan di kode).
  if (!process.env.GH_TOKEN) {
    throw new Error(
      'GH_TOKEN belum di-set. Jalankan sekali: setx GH_TOKEN "token_kamu" lalu buka PowerShell baru.'
    )
  }

  // ---- Step 1: Build Vue utk Electron (base relatif) ----
  log('Step 1: Build Vue (base relatif) → vue-app/dist')
  run('npm run build:electron --prefix vue-app')
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    throw new Error('vue-app/dist/index.html tidak ada setelah build — dibatalkan.')
  }

  // ---- Step 2: Mirror dist → electron/app (hapus lama + salin, setara robocopy /MIR) ----
  log('Step 2: Sync dist → electron/app (mirror)')
  if (fs.existsSync(APP)) fs.rmSync(APP, { recursive: true, force: true })
  fs.mkdirSync(APP, { recursive: true })
  fs.cpSync(DIST, APP, { recursive: true })
  log('✓ electron/app disinkronkan dari dist')

  // ---- Step 3: Publish 2 installer ke rilis GitHub v{version} ----
  log('Step 3: Publish Win7 + modern (electron-builder --publish always)')
  run('npm run electron:publish:win7', ELECTRON)
  run('npm run electron:publish', ELECTRON)

  log('✓ Rilis Electron selesai — cek GitHub Releases (kollepiyah/ammu).')
} catch (err) {
  console.error('[electron-release] GAGAL:', err.message)
  process.exit(1)
}
