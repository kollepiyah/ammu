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

  log('Step 3: Swap minified into index.html')
  fs.copyFileSync(MIN, SRC)

  log('Step 4: Run firebase deploy --only hosting')
  run('firebase deploy --only hosting')

  log('Step 5: Restore original index.html')
  restore()

  log('✓ Deploy selesai. Original file intact.')
} catch (err) {
  console.error('[deploy-minified] FAILED:', err.message)
  restore()
  process.exit(1)
}
