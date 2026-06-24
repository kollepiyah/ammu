// Fingerprint sync — Fase 1: baca att_log dari Fingerspot Personnel (MySQL fin_pro).
//
// Sumber scan = app Fingerspot Personnel (MySQL 5.1 fin_pro.att_log @127.0.0.1:3309).
// Password root MySQL HARDCODED di binary Personnel (tak diketahui) → kita BACA via
// THROWAWAY mysqld (--skip-grant-tables) di atas SALINAN datadir, port 3310-an.
// Service asli :3309 & app Personnel TAK tersentuh; tanpa password; tanpa ubah grant.
//
// Ini port langsung dari fp_sync.py read_att_log() (Python) ke Node — logika identik.
// Skema att_log: pin varchar (= guru.id_fingerprint), scan_date datetime (WIB lokal native).

import { spawn, execFile } from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as net from 'net'

export interface FpConfig {
  // Folder install Fingerspot Personnel (yang berisi mysql\bin & mysql\data).
  personnelDir?: string
}

export interface AttRow {
  device_pin: string
  timestamp: string // 'YYYY-MM-DD HH:MM:SS' (WIB lokal)
}

const DEFAULT_DIR = 'C:\\Program Files (x86)\\Fingerspot Personnel'

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

// true = port BEBAS (tak ada yang listen). Dipakai utk pilih port throwaway & deteksi mysqld siap.
function portFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const sock = new net.Socket()
    let done = false
    const finish = (free: boolean) => {
      if (done) return
      done = true
      try { sock.destroy() } catch (e) { /* ignore */ }
      resolve(free)
    }
    sock.setTimeout(300)
    sock.once('connect', () => finish(false)) // ada listener → tak bebas
    sock.once('timeout', () => finish(true))
    sock.once('error', () => finish(true)) // connect gagal → bebas
    sock.connect(port, '127.0.0.1')
  })
}

async function pickPort(): Promise<number> {
  for (let p = 3310; p <= 3319; p++) {
    if (await portFree(p)) return p
  }
  throw new Error('tak ada port bebas 3310-3319 untuk mysqld throwaway')
}

// poll sampai port LISTEN (mysqld siap) atau timeout
async function waitPortUp(port: number, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (!(await portFree(port))) return true
    await sleep(400)
  }
  return false
}

function execFileP(file: string, args: string[], timeoutMs: number): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
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
export async function readAttLog(config: FpConfig = {}): Promise<AttRow[]> {
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
    throw new Error('Database fin_pro tak ketemu di ' + dataDir + ' — Personnel belum terpasang benar?')
  }

  const port = await pickPort()
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fp_my_'))
  const data = path.join(tmp, 'data')

  // copy datadir (file boleh di-copy walau service live; cuma password yg terkunci)
  fs.cpSync(path.join(dataDir, 'mysql'), path.join(data, 'mysql'), { recursive: true })
  fs.cpSync(path.join(dataDir, 'fin_pro'), path.join(data, 'fin_pro'), { recursive: true })
  fs.mkdirSync(path.join(data, 'test'), { recursive: true })

  const errf = path.join(tmp, 't.err')
  const proc = spawn(
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
      try { hint = fs.readFileSync(errf, 'utf8').slice(-300) } catch (e) { /* ignore */ }
      throw new Error('mysqld throwaway tak siap.' + (hint ? ' Log: ' + hint : ''))
    }
    const out = await execFileP(
      mysqlCli,
      [
        '-h', '127.0.0.1', '-P', String(port), '-u', 'root', '-N', '-B',
        '-e',
        "SELECT pin, DATE_FORMAT(scan_date,'%Y-%m-%d %H:%i:%s') FROM fin_pro.att_log ORDER BY scan_date"
      ],
      30000
    )
    const rows: AttRow[] = []
    for (const ln of out.split(/\r?\n/)) {
      const parts = ln.split('\t')
      if (parts.length >= 2 && parts[0] !== '') {
        rows.push({ device_pin: parts[0], timestamp: parts[1] })
      }
    }
    return rows
  } finally {
    try {
      await execFileP(mysqladmin, ['-h', '127.0.0.1', '-P', String(port), '-u', 'root', 'shutdown'], 10000)
    } catch (e) { /* ignore */ }
    try { proc.kill() } catch (e) { /* ignore */ }
    await sleep(300) // beri waktu lepas file-lock sebelum hapus
    try { fs.rmSync(tmp, { recursive: true, force: true }) } catch (e) { /* ignore */ }
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
