'use strict'
// Fingerprint sync — Fase 1: baca att_log dari Fingerspot Personnel (MySQL fin_pro).
//
// Sumber scan = app Fingerspot Personnel (MySQL 5.1 fin_pro.att_log @127.0.0.1:3309).
// Password root MySQL HARDCODED di binary Personnel (tak diketahui) → kita BACA via
// THROWAWAY mysqld (--skip-grant-tables) di atas SALINAN datadir, port 3310-an.
// Service asli :3309 & app Personnel TAK tersentuh; tanpa password; tanpa ubah grant.
//
// Ini port langsung dari fp_sync.py read_att_log() (Python) ke Node — logika identik.
// Skema att_log: pin varchar (= guru.id_fingerprint), scan_date datetime (WIB lokal native).
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = []
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k
          return ar
        }
      return ownKeys(o)
    }
    return function (mod) {
      if (mod && mod.__esModule) return mod
      var result = {}
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i])
      __setModuleDefault(result, mod)
      return result
    }
  })()
Object.defineProperty(exports, '__esModule', { value: true })
exports.readAttLog = readAttLog
const child_process_1 = require('child_process')
const fs = __importStar(require('fs'))
const os = __importStar(require('os'))
const path = __importStar(require('path'))
const net = __importStar(require('net'))
const DEFAULT_DIR = 'C:\\Program Files (x86)\\Fingerspot Personnel'
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
// true = port BEBAS (tak ada yang listen). Dipakai utk pilih port throwaway & deteksi mysqld siap.
function portFree(port) {
  return new Promise((resolve) => {
    const sock = new net.Socket()
    let done = false
    const finish = (free) => {
      if (done) return
      done = true
      try {
        sock.destroy()
      } catch (e) {
        /* ignore */
      }
      resolve(free)
    }
    sock.setTimeout(300)
    sock.once('connect', () => finish(false)) // ada listener → tak bebas
    sock.once('timeout', () => finish(true))
    sock.once('error', () => finish(true)) // connect gagal → bebas
    sock.connect(port, '127.0.0.1')
  })
}
async function pickPort() {
  for (let p = 3310; p <= 3319; p++) {
    if (await portFree(p)) return p
  }
  throw new Error('tak ada port bebas 3310-3319 untuk mysqld throwaway')
}
// poll sampai port LISTEN (mysqld siap) atau timeout
async function waitPortUp(port, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (!(await portFree(port))) return true
    await sleep(400)
  }
  return false
}
function execFileP(file, args, timeoutMs) {
  return new Promise((resolve, reject) => {
    ;(0, child_process_1.execFile)(
      file,
      args,
      { timeout: timeoutMs, windowsHide: true, maxBuffer: 32 * 1024 * 1024 },
      (err, stdout, stderr) => {
        // toleran spt fp_sync.py: kalau ADA stdout, pakai walau exit non-zero.
        if (err && !stdout) reject(new Error(String(stderr || err.message || '').slice(0, 300)))
        else resolve(String(stdout || ''))
      }
    )
  })
}
/**
 * Baca fin_pro.att_log → [{device_pin, timestamp}] via mysqld throwaway di SALINAN datadir.
 * scan_date = WIB lokal (datetime native, tanpa suffix 'Z').
 */
async function readAttLog(config = {}) {
  const dir = config.personnelDir || DEFAULT_DIR
  const dataDir = path.join(dir, 'mysql', 'data')
  const binDir = path.join(dir, 'mysql', 'bin')
  const mysqld = path.join(binDir, 'mysqld.exe')
  const mysqlCli = path.join(binDir, 'mysql.exe')
  const mysqladmin = path.join(binDir, 'mysqladmin.exe')
  for (const f of [mysqld, mysqlCli, mysqladmin]) {
    if (!fs.existsSync(f)) {
      throw new Error('Tak ketemu: ' + f + ' — cek path install Fingerspot Personnel')
    }
  }
  if (!fs.existsSync(path.join(dataDir, 'fin_pro'))) {
    throw new Error(
      'Database fin_pro tak ketemu di ' + dataDir + ' — Personnel belum terpasang benar?'
    )
  }
  const port = await pickPort()
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fp_my_'))
  const data = path.join(tmp, 'data')
  // copy datadir (file boleh di-copy walau service live; cuma password yg terkunci)
  fs.cpSync(path.join(dataDir, 'mysql'), path.join(data, 'mysql'), { recursive: true })
  fs.cpSync(path.join(dataDir, 'fin_pro'), path.join(data, 'fin_pro'), { recursive: true })
  fs.mkdirSync(path.join(data, 'test'), { recursive: true })
  const errf = path.join(tmp, 't.err')
  const proc = (0, child_process_1.spawn)(
    mysqld,
    [
      '--no-defaults',
      '--skip-grant-tables',
      '--skip-innodb',
      '--default-storage-engine=MyISAM',
      '--datadir=' + data,
      '--port=' + String(port),
      '--bind-address=127.0.0.1',
      '--skip-name-resolve',
      '--pid-file=' + path.join(tmp, 't.pid'),
      '--log-error=' + errf,
      '--socket=' + path.join(tmp, 't.sock')
    ],
    { stdio: 'ignore', windowsHide: true }
  )
  try {
    const up = await waitPortUp(port, 20000)
    if (!up) {
      let hint = ''
      try {
        hint = fs.readFileSync(errf, 'utf8').slice(-300)
      } catch (e) {
        /* ignore */
      }
      throw new Error('mysqld throwaway tak siap.' + (hint ? ' Log: ' + hint : ''))
    }
    const out = await execFileP(
      mysqlCli,
      [
        '-h',
        '127.0.0.1',
        '-P',
        String(port),
        '-u',
        'root',
        '-N',
        '-B',
        '-e',
        "SELECT pin, DATE_FORMAT(scan_date,'%Y-%m-%d %H:%i:%s') FROM fin_pro.att_log ORDER BY scan_date"
      ],
      30000
    )
    const rows = []
    for (const ln of out.split(/\r?\n/)) {
      const parts = ln.split('\t')
      if (parts.length >= 2 && parts[0] !== '') {
        rows.push({ device_pin: parts[0], timestamp: parts[1] })
      }
    }
    return rows
  } finally {
    try {
      await execFileP(
        mysqladmin,
        ['-h', '127.0.0.1', '-P', String(port), '-u', 'root', 'shutdown'],
        10000
      )
    } catch (e) {
      /* ignore */
    }
    try {
      proc.kill()
    } catch (e) {
      /* ignore */
    }
    await sleep(300) // beri waktu lepas file-lock sebelum hapus
    try {
      fs.rmSync(tmp, { recursive: true, force: true })
    } catch (e) {
      /* ignore */
    }
  }
}
// CLI uji Fase 1:  node build/fingerprint-sync.js  ["C:\path\Fingerspot Personnel"]
if (require.main === module) {
  const dir = process.argv[2]
  readAttLog(dir ? { personnelDir: dir } : {})
    .then((rows) => {
      console.log('ATT_LOG rows:', rows.length)
      for (const r of rows.slice(-10)) console.log('  ', r.device_pin, r.timestamp)
    })
    .catch((e) => {
      console.error('ERR', (e && e.message) || e)
      process.exit(1)
    })
}
