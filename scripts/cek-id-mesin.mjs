/**
 * Cek silang ID Fingerprint: ekspor AllReport mesin HiView  <->  ekspor Data Guru Ammu.
 *
 * Kyai 16 Nov 2026. Berkas recordList_*.csv & finger.db/local.db terenkripsi, jadi daftar
 * ID di mesin hanya bisa dibaca dari AllReport (lembar "Attendance Record" berkolom
 * `Employee ID | Name | Department`). Skrip ini menjodohkan keduanya dan menyebut siapa
 * yang nomornya berbeda — pekerjaan yang kalau diperiksa satu per satu memakan 88 baris.
 *
 * Pakai:
 *   node scripts/cek-id-mesin.mjs <AllReport.xlsx> <data_guru.xlsx>
 *
 * HANYA MEMBACA — tak menulis apa pun, tak menyentuh database.
 */
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// ExcelJS hanya terpasang di vue-app; dicari relatif ke berkas ini, bukan ke folder
// tempat perintah dijalankan, supaya skrip tetap jalan dipanggil dari mana pun.
const AKAR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require_ = createRequire(import.meta.url)
const ExcelJS = require_(path.join(AKAR, 'vue-app', 'node_modules', 'exceljs'))

const [berkasMesin, berkasAmmu] = process.argv.slice(2)
if (!berkasMesin || !berkasAmmu) {
  console.error('Pakai: node scripts/cek-id-mesin.mjs <AllReport.xlsx> <data_guru.xlsx>')
  process.exit(1)
}
for (const f of [berkasMesin, berkasAmmu]) {
  if (!fs.existsSync(f)) {
    console.error(`Berkas tak ditemukan: ${f}`)
    process.exit(1)
  }
  // Mesin HiView & aplikasi Fingerspot menulis .xls lama (BIFF8/OLE2) yang tak bisa
  // dibaca ExcelJS. Konversinya sekali klik, jadi tak perlu menambah pustaka baru.
  if (f.toLowerCase().endsWith('.xls')) {
    console.error(
      `${path.basename(f)} masih .xls (bentuk Excel lama).\n` +
        'Buka di Excel → Simpan Sebagai → "Buku Kerja Excel (*.xlsx)", lalu ulangi perintah ini.'
    )
    process.exit(1)
  }
}

const sel = (v) => {
  if (v == null) return ''
  if (typeof v === 'object') {
    if (v.text != null) return String(v.text)
    if (Array.isArray(v.richText)) return v.richText.map((r) => r.text).join('')
    if (v.result != null) return String(v.result)
  }
  return String(v)
}
const rapi = (s) => sel(s).replace(/\s+/g, ' ').trim()
const idRapi = (s) => rapi(s).replace(/\.0+$/, '') // Excel kadang menulis 42 jadi "42.0"

// Gelar yang lazim dipakai di Data Guru; dibuang supaya "Nurul Layyina A'fua, S.Sos."
// bisa dijodohkan dengan "Nurul Layyina" yang tertulis di mesin.
const GELAR = /\b(h|hj|drs|dra|s ?pd|s ?sos|s ?e|s ?h|s ?ag|m ?pd|m ?si|gr|a ?ma|st|se|lc)\b/g

/**
 * Petik DIBUANG sama sekali. Mesin HiView menulis "Rohmatul A''Liyyah" (petik ganda,
 * kapital sesudahnya) untuk "Rohmatul A'liyyah" — kalau petik dipertahankan, orang yang
 * sama dilaporkan sebagai dua orang. Terbukti 16 Nov 2026 pada ekspor asli.
 */
function intiNama(s) {
  return rapi(s)
    .toLowerCase()
    .split(',')[0] // gelar di belakang koma
    .replace(/['`’]/g, '')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(GELAR, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Jarak sunting, untuk salah ketik di mesin seperti "Lalilatul" vs "Lailatul". */
function jarakSunting(a, b) {
  let baris = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const baru = [i]
    for (let j = 1; j <= b.length; j++) {
      baru[j] = Math.min(
        baris[j] + 1,
        baru[j - 1] + 1,
        baris[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
    baris = baru
  }
  return baris[b.length]
}

/**
 * Seberapa mirip dua nama. Tiga kelonggaran yang semuanya lahir dari data asli:
 *  - AWALAN: Fingerspot memotong nama di ~15 huruf ("Hidayatul Choir").
 *  - SALAH KETIK: beda satu-dua huruf ("Lalilatul" vs "Lailatul").
 *  - GELAR & PETIK: diabaikan oleh intiNama.
 * Satu kata yang sama TAK pernah cukup — "Siti Mu'alimah" dan "Siti Ma'rifatin" bukan
 * orang yang sama, dan tebakan semacam itu lebih berbahaya daripada tak menebak.
 */
function mirip(a, b) {
  const A = intiNama(a)
  const B = intiNama(b)
  if (!A || !B) return 0
  if (A === B) return 1
  const [pendek, panjang] = A.length <= B.length ? [A, B] : [B, A]
  if (pendek.length >= 8 && panjang.startsWith(pendek)) return 1
  if (Math.abs(A.length - B.length) <= 2 && jarakSunting(A, B) <= 2) return 0.95
  const sA = new Set(A.split(' ').filter(Boolean))
  const sB = new Set(B.split(' ').filter(Boolean))
  // Satu kata panjang yang berdiri sendiri: mesin menulis "Nasrulloh" untuk
  // "Much. Nasrulloh". Batas 7 huruf menjaga agar "nabila" tak menyambar "Nabil Anwar".
  const [kecil, besar] = sA.size <= sB.size ? [sA, sB] : [sB, sA]
  if (kecil.size === 1) {
    const kata = [...kecil][0]
    if (kata.length >= 7 && besar.has(kata)) return 0.9
  }
  let sama = 0
  for (const w of sA) if (sB.has(w)) sama++
  if (sama < 2) return 0
  return sama / Math.max(sA.size, sB.size)
}

async function bukaBuku(f) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(f)
  return wb
}

/** Cari baris judul yang memuat SEMUA kata kunci. */
function cariTabel(wb, petaKunci, batasBaris = 30) {
  for (const ws of wb.worksheets) {
    const maks = Math.min(ws.rowCount, batasBaris)
    for (let r = 1; r <= maks; r++) {
      const judul = []
      ws.getRow(r).eachCell({ includeEmpty: true }, (c, n) => {
        judul[n] = rapi(c.value).toLowerCase()
      })
      const kolom = {}
      for (const [nama, cocok] of Object.entries(petaKunci)) {
        const i = judul.findIndex((j) => j && cocok.test(j))
        if (i > 0) kolom[nama] = i
      }
      if (Object.keys(kolom).length === Object.keys(petaKunci).length) {
        return { ws, baris: r, kolom }
      }
    }
  }
  return null
}

// ── 1. Daftar orang di MESIN (AllReport) ────────────────────────────────────
const wbMesin = await bukaBuku(berkasMesin)
const tMesin = cariTabel(wbMesin, {
  id: /^(employee ?id|emp.*no|pin|id)$/,
  nama: /^(name|nama)$/
})
if (!tMesin) {
  console.error(
    'Kolom "Employee ID" dan "Name" tak ditemukan di berkas mesin.\n' +
      'Lembar yang ada: ' +
      wbMesin.worksheets.map((w) => `"${w.name}"`).join(', ') +
      '\nPastikan yang dipakai AllReport (lembar "Attendance Record"), bukan recordList_….csv.'
  )
  process.exit(1)
}
const mesin = new Map() // id -> nama
for (let r = tMesin.baris + 1; r <= tMesin.ws.rowCount; r++) {
  const row = tMesin.ws.getRow(r)
  const id = idRapi(row.getCell(tMesin.kolom.id).value)
  const nama = rapi(row.getCell(tMesin.kolom.nama).value)
  if (!id || !/^\d/.test(id)) continue
  if (!mesin.has(id)) mesin.set(id, nama)
}

// ── 2. Daftar guru di AMMU ──────────────────────────────────────────────────
const wbAmmu = await bukaBuku(berkasAmmu)
const tAmmu = cariTabel(wbAmmu, { nama: /nama guru/, id: /id fingerprint/, status: /^status$/ })
if (!tAmmu) {
  console.error('Judul kolom Data Guru tak dikenali. Ekspor ulang dari Ammu → Data Guru → Ekspor.')
  process.exit(1)
}
const ammu = []
for (let r = tAmmu.baris + 1; r <= tAmmu.ws.rowCount; r++) {
  const row = tAmmu.ws.getRow(r)
  const nama = rapi(row.getCell(tAmmu.kolom.nama).value)
  if (!nama) continue
  ammu.push({
    nama,
    id: idRapi(row.getCell(tAmmu.kolom.id).value),
    status: rapi(row.getCell(tAmmu.kolom.status).value) || 'Aktif'
  })
}
const aktif = ammu.filter((g) => g.status.toLowerCase() !== 'nonaktif')
const idAmmu = new Map()
for (const g of ammu) if (g.id) idAmmu.set(g.id, g)

const judul = (t) => console.log('\n' + '='.repeat(74) + '\n' + t + '\n' + '='.repeat(74))
console.log(`Mesin : ${path.basename(berkasMesin)} — ${mesin.size} orang`)
console.log(`Ammu  : ${path.basename(berkasAmmu)} — ${ammu.length} guru (${aktif.length} aktif)`)

// ── A. ID sama, tapi ORANGNYA beda → paling berbahaya ───────────────────────
judul('A. ID SAMA TAPI NAMA BEDA  (absen masuk ke nama orang lain)')
let aAda = 0
for (const [id, namaMesin] of mesin) {
  const g = idAmmu.get(id)
  if (!g || !namaMesin) continue
  if (mirip(namaMesin, g.nama) < 0.5) {
    aAda++
    console.log(`  ID ${id.padEnd(5)} mesin: "${namaMesin}"   ≠   Ammu: "${g.nama}"`)
  }
}
if (!aAda) console.log('  (tidak ada — semua ID yang sama menunjuk orang yang sama)')

// ── B. Ada di mesin, tak dikenal Ammu ───────────────────────────────────────
judul('B. ID ADA DI MESIN TAPI TAK ADA DI AMMU  (scan ditolak "pin_tak_dikenal")')
let bAda = 0
for (const [id, namaMesin] of mesin) {
  if (idAmmu.has(id)) continue
  bAda++
  const calon = ammu
    .map((g) => ({ g, s: mirip(namaMesin, g.nama) }))
    .filter((x) => x.s >= 0.5)
    .sort((a, b) => b.s - a.s)[0]
  const tebak = calon
    ? `  → sepertinya "${calon.g.nama}", yang di Ammu ber-ID ${calon.g.id || '(kosong)'}`
    : '  → tak ada nama mirip di Ammu'
  console.log(`  ID ${id.padEnd(5)} "${namaMesin}"${tebak}`)
}
if (!bAda) console.log('  (tidak ada)')

// ── C. Guru aktif Ammu yang tak ada di mesin ────────────────────────────────
judul('C. GURU AKTIF DI AMMU YANG TAK ADA DI DAFTAR MESIN')
let cAda = 0
for (const g of aktif) {
  if (g.id && mesin.has(g.id)) continue
  cAda++
  const calon = [...mesin.entries()]
    .map(([id, n]) => ({ id, n, s: mirip(n, g.nama) }))
    .filter((x) => x.s >= 0.5)
    .sort((a, b) => b.s - a.s)[0]
  const tebak = calon ? `  → di mesin tercatat ID ${calon.id} "${calon.n}"` : ''
  console.log(`  ${g.nama.padEnd(40)} ID Ammu: ${(g.id || '(kosong)').padEnd(6)}${tebak}`)
}
if (!cAda) console.log('  (tidak ada)')

judul('RINGKASAN')
console.log(`  A. ID tertukar orang         : ${aAda}`)
console.log(`  B. ID mesin tak dikenal Ammu : ${bAda}`)
console.log(`  C. Guru Ammu tak ada di mesin: ${cAda}`)
console.log('\nCatatan: daftar mesin diambil dari periode AllReport itu (lihat baris "Made Date"),')
console.log(
  'jadi guru yang baru didaftarkan SESUDAH periode itu ikut muncul di C tanpa salah apa-apa.'
)
console.log(
  'Ekspor ulang AllReport untuk bulan berjalan sebelum menyimpulkan ada yang belum terdaftar.'
)
