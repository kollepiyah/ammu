// logMesinHiview — membaca berkas EKSPOR mesin HiView (.xlsx / .csv) menjadi deretan scan
//   { device_pin, timestamp: 'YYYY-MM-DD HH:MM:SS' (WIB), nama }
// — bentuk yang sama dengan att_log sinkron Revo, supaya keduanya diproses satu aturan
// (utils/scanMesin).
//
// v.1.4.6 gel. 3 (27 Sep 2026): mesin HiView berhenti mengirim sejak 24 Sep 17:44 WIB; hari
// yang terlewat ditambal dari berkas ekspor mesin. Bentuk berkas itu TAK dijamin: judul kolom
// berbeda menurut bahasa & versi firmware ("Employee ID" / "ID Karyawan" / "Person ID", "Time" /
// "Waktu", atau "Date" + "Time" terpisah), dan tanggalnya bisa berupa sel tanggal Excel, teks
// ISO berzona waktu, atau teks lokal DD/MM/YYYY. Jadi kolom dikenali dari daftar sinonim, dan
// hasil pengenalannya DITAMPILKAN di pratinjau — kalau salah tebak, Kyai melihatnya sebelum
// satu baris pun ditulis.
//
// Semua fungsi PURE.

const pad = (n) => String(n).padStart(2, '0')

/** Judul kolom → kunci pembanding: huruf kecil, tanpa spasi & tanda baca. */
export function kunciKolom(h) {
  return String(h ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]/g, '')
}

// Urutan = prioritas: nama yang spesifik didahulukan, "id" polos paling akhir. "No" SENGAJA
//   tak ada — di ekspor mana pun itu nomor urut baris, bukan PIN.
const SINONIM = {
  pin: [
    'employeeno',
    'employeeid',
    'employeenumber',
    'employeecode',
    'personid',
    'personno',
    'personcode',
    'userid',
    'userno',
    'idkaryawan',
    'nokaryawan',
    'nomorkaryawan',
    'kodekaryawan',
    'idpegawai',
    'nopegawai',
    'kodepegawai',
    'idpengguna',
    'pin',
    'nopin',
    'idfingerprint',
    'fingerprintid',
    'fpid',
    'noid',
    'id'
  ],
  // Tanggal + jam dalam SATU sel. "time"/"waktu" di sini juga, karena di banyak ekspor
  //   kolom bernama "Time" berisi tanggal-jam lengkap; kalau ternyata jam saja, ia
  //   digabung dengan kolom tanggal (lihat bacaBaris).
  waktu: [
    'datetime',
    'dateandtime',
    'tanggaldanwaktu',
    'tanggalwaktu',
    'waktutanggal',
    'eventtime',
    'checktime',
    'attendancetime',
    'authenticationtime',
    'accesstime',
    'recordtime',
    'punchtime',
    'clocktime',
    'scantime',
    'waktuscan',
    'jamscan',
    'waktuabsen',
    'timestamp',
    'time',
    'waktu'
  ],
  tanggal: [
    'date',
    'tanggal',
    'tgl',
    'eventdate',
    'attendancedate',
    'scandate',
    'tanggalabsen',
    'tanggalscan'
  ],
  jam: ['jam', 'jamabsen'],
  // Laporan RINGKAS (satu baris per orang per hari): jam masuk & pulang jadi dua scan.
  masuk: ['checkin', 'jammasuk', 'masuk', 'clockin', 'timein', 'firstin'],
  pulang: ['checkout', 'jampulang', 'pulang', 'clockout', 'timeout', 'lastout'],
  nama: [
    'name',
    'nama',
    'personname',
    'employeename',
    'fullname',
    'namakaryawan',
    'namapegawai',
    'namalengkap',
    'firstname'
  ],
  hasil: [
    'authenticationresult',
    'verifyresult',
    'result',
    'hasil',
    'eventtype',
    'eventtypes',
    'jenisevent',
    'event',
    'keterangan',
    'description',
    'deskripsi',
    'attendancestatus',
    'verifystatus',
    'status'
  ]
}

/**
 * Tebak kolom dari judul. Satu kolom hanya dipakai satu peran; "waktu" dan "tanggal" dibagi
 * sesudah semuanya ditebak (kolom "Time" di samping "Date" = jam saja).
 * @returns {{pin?:string, waktu?:string, tanggal?:string, jam?:string, masuk?:string,
 *   pulang?:string, nama?:string, hasil?:string}} judul kolom asli per peran
 */
export function petakanKolom(headers) {
  const daftar = (headers || []).map((h) => ({ asli: h, k: kunciKolom(h) })).filter((x) => x.k)
  const dipakai = new Set()
  const pilih = (peran) => {
    for (const s of SINONIM[peran]) {
      const x = daftar.find((d) => d.k === s && !dipakai.has(d.asli))
      if (x) {
        dipakai.add(x.asli)
        return x.asli
      }
    }
    return undefined
  }
  const out = {}
  for (const peran of ['pin', 'tanggal', 'masuk', 'pulang', 'jam', 'waktu', 'nama', 'hasil']) {
    const kol = pilih(peran)
    if (kol !== undefined) out[peran] = kol
  }
  return out
}

const BULAN = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  mei: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  agu: 8,
  agt: 8,
  sep: 9,
  oct: 10,
  okt: 10,
  nov: 11,
  dec: 12,
  des: 12
}

function tanggalSah(y, m, d) {
  if (!(y >= 1900 && m >= 1 && m <= 12 && d >= 1 && d <= 31)) return null
  const dt = new Date(Date.UTC(y, m - 1, d))
  if (dt.getUTCMonth() !== m - 1) return null // 31 Sep, 30 Feb, dst
  return `${y}-${pad(m)}-${pad(d)}`
}
function jamSah(h, mi, s, ampm) {
  let hh = Number(h)
  const mm = Number(mi)
  const ss = Number(s || 0)
  if (ampm) {
    const pm = /^p/i.test(ampm)
    if (hh < 1 || hh > 12) return null
    hh = (hh % 12) + (pm ? 12 : 0)
  }
  if (!(hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59 && ss >= 0 && ss <= 59)) return null
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`
}
/** Milidetik UTC → { tanggal, jam } menurut komponen UTC-nya. */
function dariKomponenUtc(ms) {
  const d = new Date(ms)
  if (isNaN(d.getTime())) return null
  return {
    tanggal: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
    jam: `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
  }
}
const WIB_MS = 7 * 3600 * 1000

/**
 * Satu nilai sel → { tanggal: 'YYYY-MM-DD'|null, jam: 'HH:MM:SS'|null }, atau null bila tak
 * terbaca. Waktu dinding tanpa zona dianggap WIB (jam mesin); waktu ber-zona (…Z, +07:00)
 * dikonversi ke WIB.
 *
 * Sel tanggal Excel: ExcelJS menyimpan nomor seri sebagai milidetik UTC, jadi komponen UTC
 * objek Date-nya = yang tertulis di sel. Sel JAM saja jatuh di 30 Des 1899.
 *
 * @param {*} v nilai sel
 * @param {'DMY'|'MDY'} [urutan='DMY'] urutan untuk teks 25/09/2026 vs 09/25/2026
 */
export function bacaWaktu(v, urutan = 'DMY') {
  if (v === null || v === undefined || v === '') return null
  if (v instanceof Date) {
    const w = dariKomponenUtc(v.getTime())
    if (!w) return null
    return w.tanggal < '1900-01-01' ? { tanggal: null, jam: w.jam } : w
  }
  if (typeof v === 'number' && Number.isFinite(v)) {
    // 0 ≤ x < 1 = pecahan hari (sel JAM saja); ≥ 1 = nomor seri tanggal Excel.
    if (v >= 0 && v < 1) {
      const w = dariKomponenUtc(Math.round(v * 86400000))
      return w ? { tanggal: null, jam: w.jam } : null
    }
    if (v >= 1 && v < 2958466) return dariKomponenUtc(Math.round((v - 25569) * 86400000))
    return null
  }
  const s = String(v).trim().replace(/\s+/g, ' ')
  if (!s) return null

  // 2026-09-25 06:45[:12][.123][Z|+07:00]  ·  2026/09/25 …
  let m = s.match(
    /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?\s*(Z|[+-]\d{2}:?\d{2})?$/i
  )
  if (m) {
    const tanggal = tanggalSah(+m[1], +m[2], +m[3])
    if (!tanggal) return null
    if (m[4] === undefined) return { tanggal, jam: null }
    const jam = jamSah(m[4], m[5], m[6])
    if (!jam) return null
    if (!m[7]) return { tanggal, jam }
    // Ber-zona → WIB. Contoh '2026-09-24T23:30:00Z' = 25 Sep 06:30 WIB.
    const zona = m[7].toUpperCase()
    let offMenit = 0
    if (zona !== 'Z') {
      const z = zona.replace(':', '')
      offMenit = (z[0] === '-' ? -1 : 1) * (Number(z.slice(1, 3)) * 60 + Number(z.slice(3, 5)))
    }
    const ms =
      Date.UTC(+m[1], +m[2] - 1, +m[3], +jam.slice(0, 2), +jam.slice(3, 5), +jam.slice(6, 8)) -
      offMenit * 60000
    return dariKomponenUtc(ms + WIB_MS)
  }

  // 25/09/2026 06:45[:12] [AM|PM]  ·  25-09-2026  ·  25.09.2026  (atau MDY)
  m = s.match(
    /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:[ ,T]+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?)?$/
  )
  if (m) {
    const [a, b] = [+m[1], +m[2]]
    const tanggal = urutan === 'MDY' ? tanggalSah(+m[3], a, b) : tanggalSah(+m[3], b, a)
    if (!tanggal) return null
    if (m[4] === undefined) return { tanggal, jam: null }
    const jam = jamSah(m[4], m[5], m[6], m[7])
    return jam ? { tanggal, jam } : null
  }

  // 25 Sep 2026 06:45  ·  25 September 2026
  m = s.match(
    /^(\d{1,2})\s+([A-Za-z]{3,})\.?,?\s+(\d{4})(?:[ ,]+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?)?$/
  )
  if (m) {
    const bulan = BULAN[m[2].slice(0, 3).toLowerCase()]
    const tanggal = bulan ? tanggalSah(+m[3], bulan, +m[1]) : null
    if (!tanggal) return null
    if (m[4] === undefined) return { tanggal, jam: null }
    const jam = jamSah(m[4], m[5], m[6], m[7])
    return jam ? { tanggal, jam } : null
  }

  // Jam saja: 06:45[:12] [AM|PM]
  m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?$/)
  if (m) {
    const jam = jamSah(m[1], m[2], m[3], m[4])
    return jam ? { tanggal: null, jam } : null
  }
  return null
}

/**
 * Urutan tanggal teks "a/b/yyyy" untuk SATU berkas, dari nilai yang tak ambigu: bagian
 * pertama > 12 → pasti hari dulu (DMY); bagian kedua > 12 → pasti bulan dulu (MDY). Tanpa
 * bukti → DMY (kebiasaan Indonesia), ditandai `pasti: false` supaya pratinjau
 * mengingatkan Kyai memeriksa rentang tanggalnya.
 */
export function tentukanUrutan(nilai) {
  let dmy = false
  let mdy = false
  for (const v of nilai || []) {
    if (typeof v !== 'string') continue
    const m = v.trim().match(/^(\d{1,2})[-/.](\d{1,2})[-/.]\d{4}/)
    if (!m) continue
    if (+m[1] > 12) dmy = true
    if (+m[2] > 12) mdy = true
  }
  if (mdy && !dmy) return { urutan: 'MDY', pasti: true }
  return { urutan: 'DMY', pasti: dmy && !mdy }
}

/** CSV → baris (array sel). Tahan BOM, CRLF, sel berkutip; pemisah , ; atau tab ditebak. */
export function bacaCsv(teks) {
  let s = String(teks ?? '')
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1)
  const contoh = s
    .split(/\r?\n/)
    .filter((l) => l.trim())
    .slice(0, 5)
    .join('\n')
  const hitung = (c) => contoh.split(c).length - 1
  const pemisah = [',', ';', '\t'].reduce((a, b) => (hitung(b) > hitung(a) ? b : a))
  const rows = []
  let row = []
  let sel = ''
  let kutip = false
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (kutip) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          sel += '"'
          i++
        } else kutip = false
      } else sel += c
    } else if (c === '"') kutip = true
    else if (c === pemisah) {
      row.push(sel)
      sel = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++
      row.push(sel)
      rows.push(row)
      row = []
      sel = ''
    } else sel += c
  }
  if (sel !== '' || row.length) {
    row.push(sel)
    rows.push(row)
  }
  return rows.filter((r) => r.some((v) => String(v).trim() !== ''))
}

/**
 * Baris CSV → objek per judul kolom. Baris judul = baris pertama (dari 10) yang memuat kolom
 * PIN dan waktu/tanggal; berkas yang diawali baris judul laporan tetap terbaca.
 */
export function objekDariCsv(rows) {
  const list = rows || []
  let iJudul = list.slice(0, 10).findIndex((r) => {
    const k = petakanKolom(r)
    return k.pin && (k.waktu || k.tanggal || k.masuk)
  })
  if (iJudul < 0) iJudul = 0
  const judul = (list[iJudul] || []).map((h, i) => String(h ?? '').trim() || `kolom${i + 1}`)
  return list.slice(iJudul + 1).map((r) => {
    const o = {}
    judul.forEach((h, i) => {
      if (!(h in o)) o[h] = r[i] ?? ''
    })
    return o
  })
}

// Hasil autentikasi yang GAGAL — baris ini bukan kehadiran walau ber-PIN.
const GAGAL_RE =
  /(gagal|fail|invalid|stranger|ditolak|denied|tidak dikenal|tak dikenal|mismatch|tidak cocok)/i

/**
 * Objek baris (dari ExcelJS atau objekDariCsv) → deretan scan.
 * @returns {{ ok: boolean, kolom: object, judul: string[], urutan: string, urutanPasti: boolean,
 *   scans: Array<{device_pin:string, timestamp:string, nama:string}>, total: number,
 *   tanpaPin: number, gagal: number, waktuRusak: number }}
 */
export function scanDariBaris(rows) {
  const list = (rows || []).filter((r) => r && typeof r === 'object')
  const judul = [...new Set(list.slice(0, 50).flatMap((r) => Object.keys(r)))]
  const kolom = petakanKolom(judul)
  const hasil = {
    ok: false,
    kolom,
    judul,
    urutan: 'DMY',
    urutanPasti: true,
    scans: [],
    total: list.length,
    tanpaPin: 0,
    gagal: 0,
    waktuRusak: 0
  }
  if (!kolom.pin || !(kolom.waktu || kolom.tanggal || kolom.masuk)) return hasil
  hasil.ok = true

  const kolomWaktu = ['waktu', 'tanggal', 'jam', 'masuk', 'pulang']
    .map((p) => kolom[p])
    .filter(Boolean)
  const { urutan, pasti } = tentukanUrutan(list.flatMap((r) => kolomWaktu.map((k) => r[k])))
  hasil.urutan = urutan
  hasil.urutanPasti = pasti

  for (const r of list) {
    const pin = String(r[kolom.pin] ?? '').trim()
    if (!pin) {
      hasil.tanpaPin++
      continue
    }
    if (kolom.hasil && GAGAL_RE.test(String(r[kolom.hasil] ?? ''))) {
      hasil.gagal++
      continue
    }
    const nama = kolom.nama ? String(r[kolom.nama] ?? '').trim() : ''
    const tgl = kolom.tanggal ? bacaWaktu(r[kolom.tanggal], urutan) : null
    const waktuList = []
    for (const p of ['waktu', 'jam', 'masuk', 'pulang']) {
      if (!kolom[p]) continue
      const w = bacaWaktu(r[kolom[p]], urutan)
      if (!w) continue
      // Jam saja → tanggalnya dari kolom tanggal.
      const tanggal = w.tanggal || tgl?.tanggal || null
      if (tanggal && w.jam) waktuList.push(`${tanggal} ${w.jam}`)
    }
    // Kolom tanggal yang ternyata berisi tanggal+jam lengkap (dan tak ada kolom jam lain).
    if (!waktuList.length && tgl?.tanggal && tgl?.jam) waktuList.push(`${tgl.tanggal} ${tgl.jam}`)
    if (!waktuList.length) {
      hasil.waktuRusak++
      continue
    }
    for (const timestamp of [...new Set(waktuList)]) {
      hasil.scans.push({ device_pin: pin, timestamp, nama })
    }
  }
  return hasil
}

/**
 * Samakan PIN berkas dengan `id_fingerprint` guru. Excel kerap membuang nol di depan
 * ("0014" → 14), jadi PIN angka yang tak cocok persis dicocokkan tanpa nol depannya — tapi
 * hanya bila hasilnya menunjuk SATU guru; bila dua guru bertabrakan, PIN dibiarkan (tak
 * dikenal) daripada menebak orang.
 * @returns scans baru; `device_pin` diganti id_fingerprint guru yang cocok
 */
export function samakanPin(scans, guruList) {
  const persis = new Set()
  const angka = new Map() // pin tanpa nol depan → id_fingerprint | null (bentrok)
  for (const g of guruList || []) {
    const pin = String(g?.id_fingerprint ?? '').trim()
    if (!pin) continue
    persis.add(pin)
    if (/^\d+$/.test(pin)) {
      const k = pin.replace(/^0+(?=\d)/, '')
      angka.set(k, angka.has(k) && angka.get(k) !== pin ? null : pin)
    }
  }
  return (scans || []).map((s) => {
    const pin = String(s.device_pin ?? '').trim()
    if (persis.has(pin) || !/^\d+$/.test(pin)) return s
    const cocok = angka.get(pin.replace(/^0+(?=\d)/, ''))
    return cocok ? { ...s, device_pin: cocok } : s
  })
}
