// v.80.0526 — Dev mode live runner.
// Jalankan: `npm run electron:start-live`
// Akan: (1) start vite dev server vue-app di port 5174, (2) tunggu listen, (3) start electron pointing ke localhost:5174.

const { spawn } = require('node:child_process')
const path = require('node:path')
const net = require('node:net')

const VUE_APP_DIR = path.join(__dirname, '..')
const VITE_PORT = 5174

function waitForPort(port, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    function check() {
      const s = net.createConnection({ port })
      s.once('connect', () => {
        s.end()
        resolve()
      })
      s.once('error', () => {
        s.destroy()
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Port ${port} not ready after ${timeoutMs}ms`))
        } else {
          setTimeout(check, 500)
        }
      })
    }
    check()
  })
}

async function main() {
  console.log('[live-runner] Starting vite dev server di port', VITE_PORT, '...')
  const vite = spawn('npm', ['run', 'dev', '--', '--port', String(VITE_PORT)], {
    cwd: VUE_APP_DIR,
    stdio: 'inherit',
    shell: true
  })

  try {
    await waitForPort(VITE_PORT)
  } catch (e) {
    console.error('[live-runner] Vite tidak ready:', e.message)
    vite.kill()
    process.exit(1)
  }

  console.log('[live-runner] Vite ready. Starting Electron...')
  process.env.ELECTRON_IS_DEV = '1'

  const electron = spawn('npm', ['run', 'electron:start'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  })

  electron.on('exit', () => {
    console.log('[live-runner] Electron closed. Stopping vite.')
    vite.kill()
    process.exit(0)
  })
}

main().catch((e) => {
  console.error('[live-runner] fatal:', e)
  process.exit(1)
})
