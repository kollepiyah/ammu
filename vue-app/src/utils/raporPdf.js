// vue-app/src/utils/raporPdf.js
// PDF rapor generator dengan template match requirements kyai.
// v.21.42: Major overhaul for visual parity, KOP refinement, dynamic PTPT sizing, and 3-block signatures.

import { createPdf, drawTable, savePdf } from './pdfBuilder'
import { imageToDataURL } from '@/services/pdf'
import { predikatQiraati, predikatDiniyah, PREDIKAT_AR } from './predikat'

// ============================================================
// Helpers
// ============================================================

const BULAN_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

function fmtTanggalID(dateObj) {
  const d = dateObj instanceof Date ? dateObj : new Date()
  return `${d.getDate()} ${BULAN_ID[d.getMonth()]} ${d.getFullYear()}`
}

function fmtNilai(v) {
  if (v === null || v === undefined || v === '') return ''
  const n = Number(v)
  if (isNaN(n)) return String(v)
  if (Number.isInteger(n)) return String(n)
  return n.toFixed(2).replace('.', ',')
}

function safeStr(v) {
  return v == null ? '' : String(v)
}

function fmtDateShort(v) {
  if (!v) return ''
  try {
    return new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch {
    return String(v)
  }
}

// ===== Predikat aksara Arab di PDF (render canvas -> image, shaping benar) =====
const _arPredCache = {}
function arabicPredikatDataURL(key) {
  if (!key || !PREDIKAT_AR[key]) return ''
  if (_arPredCache[key]) return _arPredCache[key]
  try {
    if (typeof document === 'undefined') return ''
    const txt = PREDIKAT_AR[key]
    const scale = 6
    const W = 110
    const H = 30
    const c = document.createElement('canvas')
    c.width = W * scale
    c.height = H * scale
    const ctx = c.getContext('2d')
    ctx.scale(scale, scale)
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    try { ctx.direction = 'rtl' } catch (_e) {}
    ctx.font = "700 20px 'Traditional Arabic','Amiri','Scheherazade New','Segoe UI','Arial',serif"
    ctx.fillText(txt, W / 2, H / 2 + 1)
    const url = c.toDataURL('image/png')
    _arPredCache[key] = url
    return url
  } catch (_e) {
    return ''
  }
}
function drawPredikatImage(doc, cell, key) {
  const url = arabicPredikatDataURL(key)
  if (!url) return
  const iw = Math.min(20, cell.width - 1.5)
  const ih = iw * (30 / 110)
  const ix = cell.x + (cell.width - iw) / 2
  const iy = cell.y + (cell.height - ih) / 2
  try { doc.addImage(url, 'PNG', ix, iy, iw, ih, undefined, 'FAST') } catch (_e) {}
}

// tgl khotam PTPT dari kartu kenaikan (kelas_K -> juz_N), best-effort.
function tglKhotamPtptKK(santri, juzNum) {
  const kk = santri && santri.kartu_kenaikan
  if (!kk || !juzNum) return ''
  let scope = kk['PTPT']
  if (!scope) {
    const k = Object.keys(kk).find((x) => String(x).toLowerCase().trim() === 'ptpt')
    scope = k ? kk[k] : null
  }
  if (!scope || typeof scope !== 'object') return ''
  const n = parseInt(juzNum, 10)
  const itemId = 'juz_' + n
  const tryO = (o) => {
    if (!o || typeof o !== 'object') return ''
    if (o[itemId]) return o[itemId]
    const es = Array.isArray(o.entries) ? o.entries : []
    const m = es.find((e) => e?.itemId === itemId && e?.tanggal)
    return m ? m.tanggal : ''
  }
  const d = tryO(scope['kelas_' + Math.ceil(n / 5)])
  if (d) return d
  for (const kkey of Object.keys(scope)) {
    const v = tryO(scope[kkey])
    if (v) return v
  }
  return ''
}
// tgl khotam level (PPPH) dari kartu kenaikan.
function tglKhotamLevelKK(santri, lembaga, levelId) {
  const kk = santri && santri.kartu_kenaikan
  if (!kk) return ''
  let scope = kk[lembaga]
  if (!scope) {
    const k = Object.keys(kk).find((x) => String(x).toLowerCase().trim() === String(lembaga).toLowerCase().trim())
    scope = k ? kk[k] : null
  }
  if (!scope || typeof scope !== 'object') return ''
  const o = scope[levelId] || {}
  if (o.ceremonial) return o.ceremonial
  const es = Array.isArray(o.entries) ? o.entries : []
  const m = es.find((e) => e?.tanggal)
  return m ? m.tanggal : ''
}

/**
 * Striks through unselected options.
 */
function formatKepribadian(doc, x, y, val, options, font) {
  let curX = x
  options.forEach((opt, i) => {
    const isSelected = val === opt
    doc.setFont(font, isSelected ? 'bold' : 'normal')
    doc.text(opt, curX, y)

    if (!isSelected) {
      const w = doc.getTextWidth(opt)
      doc.setLineWidth(0.2)
      doc.line(curX - 0.5, y - 1, curX + w + 0.5, y - 1)
    }

    curX += doc.getTextWidth(opt)
    if (i < options.length - 1) {
      doc.setFont(font, 'normal')
      doc.text(' / ', curX, y)
      curX += doc.getTextWidth(' / ')
    }
  })
}

// ============================================================
// KOP (logo Qiraati kiri + 4 lines center + logo MU kanan + 2-line divider)
// ============================================================

async function drawKopRapor(doc, settings, lembaga, lembagaOverride = null, isDiniyah = false) {
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  const startY = 10

  // Logo kiri: Diniyah pakai LOGO PONDOK (sama dgn KOP umum), Qiraati pakai logoQiraati.
  const pondokLogo =
    settings.logoKop || settings.kop_logo || settings.kopLogo || settings.logoUrl || '/logo.png'
  const leftUrl = isDiniyah ? pondokLogo : settings.logoQiraati || pondokLogo
  if (leftUrl) {
    try {
      const dataUrl = leftUrl.startsWith('data:') ? leftUrl : await imageToDataURL(leftUrl)
      if (dataUrl) doc.addImage(dataUrl, 'PNG', 15, startY, 18, 18, undefined, 'FAST')
    } catch (_e) {}
  }

  // Logo kanan (MU / Pesantren) — v.21.51: cek per-lembaga override dulu
  const rightUrl =
    (lembagaOverride && lembagaOverride.kop_logo) ||
    settings.logoKop ||
    settings.logoUrl ||
    '/logo.png'
  if (rightUrl) {
    try {
      const dataUrl = rightUrl.startsWith('data:') ? rightUrl : await imageToDataURL(rightUrl)
      if (dataUrl) doc.addImage(dataUrl, 'PNG', pageW - 33, startY, 18, 18, undefined, 'FAST')
    } catch (_e) {}
  }

  // Lines center — Line 1+2 UPPERCASE bold (kyai spec v.21.45)
  // Wired ke Pengaturan KOP Surat (settings.kopLine1-4) sebagai override
  doc.setFont(font, 'bold')

  // Line 1: per-lembaga override (master/lembaga) > settings.kopLine1 > default per-lembaga
  let line1 =
    (lembagaOverride && lembagaOverride.kop_line1) || settings.kopLine1 || settings.subtitleRapor
  if (!line1) {
    if (lembaga === 'PTPT') line1 = 'Pasca TPQ Program Tahfizh'
    else if (lembaga === 'PPPH') line1 = 'Pasca PTPT Program Hadits'
    else if (lembaga === 'Diniyah')
      line1 = 'Sekolah' // v.21.59: Diniyah ikut Sekolah (bukan Madin)
    else line1 = 'Taman Pendidikan Al-Qur’an' // TPQ Pagi/Sore + Pra PTPT default
  }
  doc.setFontSize(13)
  doc.text(line1.toUpperCase(), pageW / 2, startY + 5, { align: 'center' })

  // Line 2: "[LEMBAGA] [namaLembaga]" UPPERCASE
  // namaLembaga dari settings.kopLine2 atau default "MAMBAUL ULUM"
  // TPQ Pagi/Sore + Pra PTPT → "TPQ" (Pra PTPT inherit TPQ)
  // v.21.60.0526: Diniyah → pakai NAMA lembaga_sekolah override (SDI/PKBM/dll), bukan label "Diniyah"
  doc.setFontSize(18)
  let lembagaLabel
  if (['TPQ Pagi', 'TPQ Sore', 'Pra PTPT'].includes(lembaga)) lembagaLabel = 'TPQ'
  else if (lembaga === 'Diniyah') lembagaLabel = (lembagaOverride && lembagaOverride.lembaga) || ''
  else lembagaLabel = lembaga
  const namaLembaga = (
    (lembagaOverride && lembagaOverride.kop_line2) ||
    settings.kopLine2 ||
    'MAMBAUL ULUM'
  ).trim()
  // v.21.54: skip prefix lembagaLabel kalau namaLembaga sudah include nya (hindari "TPQ TPQ MAMBAUL ULUM")
  const namaUpper = namaLembaga.toUpperCase()
  const labelUpper = String(lembagaLabel || '').toUpperCase()
  let line2
  if (!labelUpper) line2 = namaUpper
  else
    line2 = namaUpper.startsWith(labelUpper)
      ? namaUpper
      : `${lembagaLabel} ${namaLembaga}`.toUpperCase()
  doc.text(line2, pageW / 2, startY + 12, { align: 'center' })

  // Line 3: Alamat (wired ke settings.kopLine3 atau settings.alamat)
  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  const addr =
    (lembagaOverride && lembagaOverride.kop_line3) ||
    settings.kopLine3 ||
    settings.alamat ||
    'Jl. Kol. Sugiono 112 Panjunan-Kepuh Kiriman Waru Sidoarjo'
  doc.text(addr, pageW / 2, startY + 18, { align: 'center' })

  // Line 4: Telp (wired ke settings.kopLine4 atau settings.telp)
  const telp =
    (lembagaOverride && lembagaOverride.kop_line4) ||
    settings.kopLine4 ||
    settings.telp ||
    'Telp. 031-8674713'
  doc.text(telp.toLowerCase(), pageW / 2, startY + 22, { align: 'center' })

  // 2-line divider
  const dividerY = startY + 25
  doc.setLineWidth(0.6)
  doc.line(15, dividerY, pageW - 15, dividerY)
  doc.setLineWidth(0.2)
  doc.line(15, dividerY + 1, pageW - 15, dividerY + 1)

  return dividerY + 4
}

function drawJudulRapor(doc, y) {
  // v.21.49: tambah gap return y+18 supaya tidak nempel ke identitas
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  doc.setFont(font, 'bold')
  doc.setFontSize(13)
  doc.text('SURAT KETERANGAN HASIL PENDIDIKAN', pageW / 2, y + 6, { align: 'center' })
  // v.21.59: hapus garis bawah judul (kyai spec)
  return y + 14
}

// ============================================================
// Identity
// ============================================================

function drawIdentitas(doc, y, santri, raporState) {
  // Kiri: Nama / NISN / NIS · Kanan: Kelas (gabungan) / Semester / Tahun Ajaran
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  doc.setFont(font, 'normal')
  doc.setFontSize(11)

  const col1 = 16
  const col1Colon = 42
  const rLabelX = pageW - 80
  const rColonX = pageW - 52

  const ta = raporState.tahun_ajaran || raporState.periode?.tahun_ajaran || ''
  const sm = raporState.semester || raporState.periode?.semester || ''
  const sekolah = String(santri.kelas_sekolah || '').trim()
  const ngaji = [String(santri.lembaga || '').trim(), String(santri.kelas || '').trim()]
    .filter(Boolean)
    .join(' ')
    .trim()
  const kelasGab = [sekolah, ngaji].filter(Boolean).join(' / ') || '-'

  const rows = [
    ['Nama Santri', santri.nama || '-', 'Kelas', kelasGab],
    ['NISN', santri.nisn || '-', 'Semester', sm],
    ['NIS', santri.nis || '-', 'Tahun Ajaran', ta]
  ]

  rows.forEach((row, i) => {
    const py = y + i * 5
    doc.text(row[0], col1, py)
    doc.text(':', col1Colon, py)
    doc.text(safeStr(row[1]), col1Colon + 3, py)

    doc.text(row[2], rLabelX, py)
    doc.text(':', rColonX, py)
    doc.text(safeStr(row[3]), rColonX + 3, py)
  })

  return y + rows.length * 5 + 3
}

// ============================================================
// Footer & Signatures
// ============================================================

function drawAbsensiKepribadian(doc, y, absensi, kepribadian) {
  // v.21.47: tambah gap 4mm supaya tidak nempel tabel diatas
  const pageW = doc.internal.pageSize.getWidth()
  const colW = (pageW - 30) / 2
  const font = doc._fontMU || 'times'
  y = y + 4 // gap top

  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text('ABSENSI', 15, y + 3.5)
  doc.text('NILAI KEPRIBADIAN', 15 + colW + 22, y + 3.5)

  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  const abs = absensi || { sakit: 0, izin: 0, alpa: 0 }
  const absLines = [
    `1. Sakit  : ${abs.sakit ?? '-'} Hari`,
    `2. Izin   : ${abs.izin ?? '-'} Hari`,
    `3. Alpa   : ${abs.alpa ?? '-'} Hari`
  ]

  const opts = ['Baik', 'Cukup', 'Perlu Perhatian']
  const kp = kepribadian || {}

  const kpRows = [
    ['Kelakuan', kp.kelakuan],
    ['Kerajinan', kp.kerajinan],
    ['Kebersihan', kp.kebersihan]
  ]
  kpRows.forEach((kr, i) => {
    const py = y + 8 + i * 4
    const lbl = (kr[0] + '   : ').padEnd(13, ' ')
    doc.text(lbl, 15 + colW + 22, py)
    formatKepribadian(doc, 15 + colW + 22 + doc.getTextWidth(lbl), py, kr[1], opts, font)
  })

  for (let i = 0; i < 3; i++) {
    doc.text(absLines[i], 16, y + 8 + i * 4)
  }
  return y + 24 // v.21.47: relax from y+22
}

async function drawSignBlocks(doc, y, santri, settings, lembaga, dbGuru = [], lembagaOverride = null) {
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  const tempat = settings.kota || 'Sidoarjo'
  const today = fmtTanggalID(new Date())

  // Determine Kepala Label (kyai spec v.21.44 — image refs)
  // TPQ + Pra PTPT → Kepala TPQ MU (Pra PTPT inherit TPQ)
  // PTPT + PPPH → PJ PTPT
  // Diniyah → Kepala Madin
  let labelKepala = 'Kepala TPQ MU'
  let searchTitle = 'KEPALA TPQ'
  if (lembaga === 'PTPT') {
    labelKepala = 'PJ PTPT'
    searchTitle = 'PJ PTPT'
  } else if (lembaga === 'PPPH') {
    labelKepala = 'PJ PPPH'
    searchTitle = 'PJ PPPH'
  } else if (lembaga === 'Diniyah') {
    const ls = String(santri.lembaga_sekolah || '').toLowerCase().trim()
    if (ls === 'sdi') {
      labelKepala = 'Kepala SDI'
      searchTitle = 'KEPALA SDI'
    } else if (ls === 'pkbm') {
      labelKepala = 'Kepala PKBM'
      searchTitle = 'KEPALA PKBM'
    } else {
      labelKepala = 'Kepala Sekolah'
      searchTitle = 'KEPALA SEKOLAH'
    }
  }

  // v.21.47: tambah gap atas (y+5) supaya tidak nempel ke tabel
  const yStart = y + 5
  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  const _dkColonX = pageW - 48
  doc.text('Dikeluarkan di', _dkColonX - 1.5, yStart, { align: 'right' })
  doc.text(':', _dkColonX, yStart)
  doc.text(String(tempat), pageW - 15, yStart, { align: 'right' })
  doc.text('Pada Tanggal', _dkColonX - 1.5, yStart + 5, { align: 'right' })
  doc.text(':', _dkColonX, yStart + 5)
  doc.text(String(today), pageW - 15, yStart + 5, { align: 'right' })

  const col1 = 35
  const col2 = pageW / 2
  const col3 = pageW - 35
  const labelY = yStart + 14 // v.21.47: relax gap label dari +10 ke +14

  doc.text('Wali Santri', col1, labelY, { align: 'center' })
  doc.text(lembaga === 'Diniyah' ? 'Wali Kelas' : 'Guru Kelas', col2, labelY, { align: 'center' })
  doc.text(labelKepala, col3, labelY, { align: 'center' })

  // Lookup Signatures — v.90.0626: Diniyah pakai guru_sekolah (wali kelas sekolah), bukan ngaji
  // v.95.0626: Qiraati/ngaji -> guru, fallback guru_pagi/guru_sore (TPQ shift / PTPT) supaya auto-isi
  const _gkRaw =
    lembaga === 'Diniyah'
      ? santri.guru_sekolah
      : [santri.guru, santri.guru_pagi, santri.guru_sore].find((v) =>
          Array.isArray(v) ? v.filter(Boolean).length > 0 : String(v || '').trim() !== ''
        )
  const _gkArr = Array.isArray(_gkRaw) ? _gkRaw.filter(Boolean) : _gkRaw ? [_gkRaw] : []
  const guruKelasName = _gkArr.join(', ')
  const guruKelas = dbGuru.find((g) => _gkArr.some((n) => g.nama === n) && g.status !== 'Non-Aktif')

  // v.21.10 match: if labelKepala contains 'PJ PTPT', search specifically for that
  const searchFinal = labelKepala.includes('PJ PTPT') ? 'PJ PTPT' : searchTitle

  const kepala = dbGuru.find((g) => {
    const jab = String(g.jabatan || '').toUpperCase()
    const jabT = String(g.jabatan_tambahan || '').toUpperCase()
    return (jab.includes(searchFinal) || jabT.includes(searchFinal)) && g.status !== 'Non-Aktif'
  })

  // Nama Kepala/PJ: guru jabatan match -> master Lembaga (kepala_lembaga) -> settings.
  const kepalaNamaLmb =
    (lembagaOverride &&
      (lembagaOverride.kepala_lembaga || lembagaOverride.kepala_sekolah || lembagaOverride.kepala)) ||
    ''
  const kepalaNama = kepala?.nama || kepalaNamaLmb || settings.namaKepala || settings.namaPengasuh || ''
  const kepalaGuru =
    kepala || (kepalaNama ? dbGuru.find((g) => g.nama === kepalaNama && g.status !== 'Non-Aktif') : null)

  const nameY = labelY + 26 // v.21.47: relax kembali ke +26 (kompak terlalu agresif)

  // Tanda tangan digital — auto-fill dari akun guru (field tanda_tangan/ttd_url/ttd/ttd_b64).
  const _resolveTtd = async (g) => {
    const src = g?.tanda_tangan || g?.ttd_url || g?.ttd || g?.ttd_b64 || ''
    if (!src) return ''
    try {
      return src.startsWith('data:') ? src : await imageToDataURL(src)
    } catch (_e) {
      return ''
    }
  }
  const guruTtdImg = await _resolveTtd(guruKelas)
  const kepalaTtdImg = await _resolveTtd(kepalaGuru)
  if (guruTtdImg) {
    try { doc.addImage(guruTtdImg, 'PNG', col2 - 15, labelY + 2, 30, 15, undefined, 'FAST') } catch (_e) {}
  }
  if (kepalaTtdImg) {
    try { doc.addImage(kepalaTtdImg, 'PNG', col3 - 15, labelY + 2, 30, 15, undefined, 'FAST') } catch (_e) {}
  }

  doc.setFont(font, 'bold')
  doc.setFontSize(10)

  // Wali
  const wali = santri.wali || santri.nama_wali || '________________'
  doc.text(wali, col1, nameY, { align: 'center' })

  // Guru
  const gName = guruKelasName || '________________'
  doc.text(gName, col2, nameY, { align: 'center' })
  // EKGQ raw number saja, NO prefix label (kyai spec v.21.43)
  // Fallback chain: ekgq → no_ekgq → no_syahadah → nip
  const guruEkgq =
    guruKelas?.nrg || guruKelas?.ekgq || guruKelas?.no_ekgq || guruKelas?.no_syahadah || guruKelas?.nip || ''
  if (guruEkgq) {
    doc.setFont(font, 'normal')
    doc.setFontSize(8)
    doc.text(String(guruEkgq), col2, nameY + 4, { align: 'center' })
    doc.setFont(font, 'bold')
    doc.setFontSize(10)
  }

  // Kepala
  const kName = kepalaNama || '________________'
  doc.text(kName, col3, nameY, { align: 'center' })
  const kepalaEkgq =
    kepalaGuru?.nrg || kepalaGuru?.ekgq || kepalaGuru?.no_ekgq || kepalaGuru?.no_syahadah || kepalaGuru?.nip || ''
  if (kepalaEkgq) {
    doc.setFont(font, 'normal')
    doc.setFontSize(8)
    doc.text(String(kepalaEkgq), col3, nameY + 4, { align: 'center' })
  }
}

function drawCatatanBox(doc, y, catatan) {
  // v.21.47: gap top + box lebih tinggi
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  y = y + 3
  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text('CATATAN UNTUK SANTRI / ORANG TUA:', 15, y + 4)

  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  const txt = (catatan || '').trim()
  const boxH = 22 // v.21.47: box height naik 18 → 22
  const boxY = y + 6
  doc.setLineWidth(0.3)
  doc.rect(15, boxY, pageW - 30, boxH)
  if (txt) {
    const lines = doc.splitTextToSize(txt, pageW - 32)
    doc.text(lines, 17, boxY + 5)
  }
  return boxY + boxH + 4
}

// ============================================================
// Templates
// ============================================================

async function generateTpqPdf(doc, y, santri, schema, raporState, settings) {
  const sections = schema.sections || []
  const data = raporState.data || {}

  for (const sec of sections) {
    const fields = sec.fields || []

    // Grouping "Materi Tambahan"
    const grouped = []
    let cur = null
    for (const f of fields) {
      const g = f.group || ''
      if (g && cur && cur.label === g) {
        cur.fields.push(f)
        cur.span += 1
      } else {
        cur = { label: g, fields: [f], span: 1, isStandalone: !g }
        grouped.push(cur)
      }
    }
    const hasAnyGroup = grouped.some((g) => !g.isStandalone)

    // Header Row 1: Section Title
    const headRow1 = [
      {
        content: (sec.title || '').toUpperCase(),
        colSpan: (sec.rows?.length ? 1 : 0) + fields.length,
        styles: { halign: 'center', fillColor: [255, 255, 255], fontStyle: 'bold' }
      }
    ]

    // Header Row 2: Labels / Group Headers
    const headRow2 = []
    if (sec.rows?.length) headRow2.push({ content: 'Jilid', rowSpan: hasAnyGroup ? 2 : 1 })

    const headRow3 = []
    for (const g of grouped) {
      if (g.isStandalone) {
        headRow2.push({ content: g.fields[0].label, rowSpan: hasAnyGroup ? 2 : 1 })
      } else {
        headRow2.push({ content: g.label, colSpan: g.span })
        for (const f of g.fields) headRow3.push(f.label)
      }
    }

    const heads = [headRow1, headRow2]
    if (hasAnyGroup) heads.push(headRow3)

    const predFieldIdx = fields.findIndex((f) => f.type === 'auto_predikat')
    const numIds = fields.filter((f) => f.type === 'number').map((f) => f.id)
    const predikatKeys = []
    const body = []
    const pushRow = (prefix, rowLabel) => {
      const r = rowLabel != null ? [rowLabel] : []
      for (const f of fields) {
        if (f.type === 'auto_predikat') r.push('')
        else if (f.type === 'date') r.push(fmtDateShort(data[`${prefix}__${f.id}`]))
        else r.push(safeStr(data[`${prefix}__${f.id}`]))
      }
      let sum = 0
      let n = 0
      numIds.forEach((id) => {
        const v = Number(data[`${prefix}__${id}`])
        if (!isNaN(v) && v > 0) {
          sum += v
          n++
        }
      })
      predikatKeys.push(n > 0 ? predikatQiraati(sum / n, settings.predikatScale).key : '')
      body.push(r)
    }
    if (sec.rows?.length) {
      for (const row of sec.rows) pushRow(`${sec.id}__${row}`, row)
    } else {
      pushRow(`${sec.id}`, null)
    }
    const predikatColIdx = (sec.rows?.length ? 1 : 0) + predFieldIdx

    drawTable(doc, {
      startY: y,
      head: heads,
      body,
      styles: { font: doc._fontMU, fontSize: 7.5, cellPadding: 1.0, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80,80,80], lineWidth: 0.15 },
      headStyles: { fillColor: [255, 255, 255], textColor: 0, lineWidth: 0.15 },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      didDrawCell: (d) => { if (predFieldIdx >= 0 && d.section === 'body' && d.column.index === predikatColIdx) drawPredikatImage(doc, d.cell, predikatKeys[d.row.index]) }
    })
    y = (doc.lastAutoTable?.finalY || y) + 2
  }

  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Nilai Rata-rata', fmtNilai(avg)]],
    styles: { font: doc._fontMU, fontSize: 8.5, fontStyle: 'bold', halign: 'center', cellPadding: 1.2 },
    margin: { left: 15, right: 15 },
    tableWidth: 185,
    columnStyles: { 0: { cellWidth: 110 }, 1: { cellWidth: 'auto' } }
  })
  return doc.lastAutoTable?.finalY || y
}

async function generatePraPtptPdf(doc, y, santri, schema, raporState, settings) {
  const data = raporState.data || {}
  // v.21.46: header single-row + short multi-line labels untuk hindari overlap di A4 portrait
  const head = [
    [
      'Kelas',
      'Level\nBaca',
      'Target Khotam',
      'Tgl\nKhotam',
      'Fasho-\nhah',
      'Tartil',
      'Tahfizh\nJuz 30',
      'Ghorib',
      'Tajwid',
      "Do'a\nHarian",
      'Jml'
    ]
  ]

  const body = []
  ;(schema.levels || []).forEach((lvl, lvlIdx) => {
    const khList = lvl.khotamList || []
    khList.forEach((kh, kIdx) => {
      const r = []
      if (kIdx === 0) {
        r.push({
          content: String(lvlIdx + 1),
          rowSpan: khList.length,
          styles: { halign: 'center', valign: 'middle' }
        })
        r.push({
          content: lvl.levelBaca || '',
          rowSpan: khList.length,
          styles: { halign: 'center', valign: 'middle' }
        })
      }
      r.push(`${kh.labelKhotam} (${kh.multiplier}x)`)
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__tgl_khotam`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__fashohah`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__tartil`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__tahfizh_juz_30`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__ghorib`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__tajwid`]))
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__doa_harian`]))

      let sum = 0
      const keys = ['fashohah', 'tartil', 'tahfizh_juz_30', 'ghorib', 'tajwid']
      keys.forEach((k) => {
        const v = Number(data[`pra__${lvl.id}__${kh.id}__${k}`])
        if (v) sum += v
      })
      r.push(sum || '-')
      body.push(r)
    })
  })

  // v.93.0626: lebar tabel = KOP (215-24=191mm), margin 12/12 -> center & sama lebar dgn KOP.
  // Kolom: Kelas(8)+LevelBaca(15)+Target(30)+Tgl(23)+7 nilai×14+Jml(17) = 191
  drawTable(doc, {
    startY: y,
    head,
    body,
    margin: { left: 15, right: 15 },
    styles: {
      font: doc._fontMU,
      fontSize: 7,
      cellPadding: 0.9,
      halign: 'center',
      valign: 'middle',
      lineWidth: 0.15,
      lineColor: [80, 80, 80],
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      fontSize: 6.8,
      cellPadding: 1.0
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 8 }, // Kelas
      1: { cellWidth: 15 }, // Level Baca
      2: { cellWidth: 26, halign: 'left' }, // Target Khotam
      3: { cellWidth: 21 }, // Tgl Khotam (dd/mm/yyyy butuh ruang)
      4: { cellWidth: 16 }, // Fashohah
      5: { cellWidth: 16 }, // Tartil
      6: { cellWidth: 16 }, // Tahfizh Juz 30
      7: { cellWidth: 16 }, // Ghorib
      8: { cellWidth: 16 }, // Tajwid
      9: { cellWidth: 16 }, // Doa Harian
      10: { cellWidth: 19, fontStyle: 'bold' } // Jml — bold
    }
  })

  y = doc.lastAutoTable.finalY + 2
  // v.21.60.2.0526: hitung totalKhotam by checking actual data tgl_khotam Firestore (bukan index r[3] yg shift untuk rowSpan)
  let totalKhotam = 0
  ;(schema.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      if (data[`pra__${lvl.id}__${kh.id}__tgl_khotam`]) totalKhotam++
    })
  })
  const avg = raporState.rata_rata || 0

  drawTable(doc, {
    startY: y,
    margin: { left: 15, right: 15 },
    tableWidth: 185,
    body: [
      ['Jumlah Khotam', `${totalKhotam} Khotam`],
      ['Nilai Rata-rata', fmtNilai(avg)]
    ],
    // v.21.60.2.0526: lebar match table di atas (185mm)
    styles: {
      font: doc._fontMU,
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 1.8,
      lineWidth: 0.15,
      lineColor: [80, 80, 80]
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { fillColor: [255, 255, 255] }
    }
  })

  return doc.lastAutoTable.finalY || y
}

async function generatePtptPdf(doc, y, santri, schema, raporState, settings) {
  const data = raporState.data || {}
  const fields = schema.fields || []

  // Header grouping dari schema (sama dgn tampilan layar).
  const groupedFields = fields.filter((f) => f.group)
  const hasGroup = groupedFields.length > 0
  const headRow1 = [
    { content: 'Kelas', rowSpan: hasGroup ? 2 : 1, styles: { valign: 'middle' } },
    { content: 'Juz', rowSpan: hasGroup ? 2 : 1, styles: { valign: 'middle' } }
  ]
  let gi = 0
  while (gi < fields.length) {
    const f = fields[gi]
    if (f.group) {
      let span = 1
      let j = gi + 1
      while (j < fields.length && fields[j].group === f.group) {
        span++
        j++
      }
      headRow1.push({ content: f.group, colSpan: span, styles: { halign: 'center' } })
      gi = j
    } else {
      headRow1.push({ content: f.label, rowSpan: hasGroup ? 2 : 1, styles: { valign: 'middle' } })
      gi++
    }
  }
  const head = hasGroup ? [headRow1, groupedFields.map((f) => f.label)] : [headRow1]

  const predFieldIdx = fields.findIndex((f) => f.type === 'auto_predikat')
  const predikatColIdx = 2 + predFieldIdx
  const numIds = fields.filter((f) => f.type === 'number').map((f) => f.id)
  const predikatKeys = []

  const curKelasNum = parseInt(String(santri.kelas).match(/\d+/)?.[0] || '1')
  const filteredRows = (schema.rows || []).filter(
    (r) => parseInt(String(r.kelas).match(/\d+/)?.[0] || '1') <= curKelasNum
  )
  const kelasCount = {}
  for (const r of filteredRows) {
    const k = String(r.kelas).trim()
    kelasCount[k] = (kelasCount[k] || 0) + 1
  }
  const kelasSeen = new Set()
  const body = []
  for (const row of filteredRows) {
    const juzNum = String(row.juz).match(/\d+/)?.[0]
    const base = `kj__juz_${juzNum}`
    const kelasKey = String(row.kelas).trim()
    const r = []
    if (!kelasSeen.has(kelasKey)) {
      r.push({ content: row.kelas, rowSpan: kelasCount[kelasKey], styles: { valign: 'middle', fontStyle: 'bold' } })
      kelasSeen.add(kelasKey)
    }
    r.push(row.juz)
    let sum = 0
    let n = 0
    for (const f of fields) {
      if (f.type === 'date') {
        r.push(fmtDateShort(data[`${base}__tgl_khotam`] || tglKhotamPtptKK(santri, juzNum)))
      } else if (f.type === 'auto_predikat') {
        r.push('')
      } else {
        r.push(safeStr(data[`${base}__${f.id}`]))
      }
    }
    numIds.forEach((id) => {
      const v = Number(data[`${base}__${id}`])
      if (!isNaN(v) && v > 0) {
        sum += v
        n++
      }
    })
    predikatKeys.push(n > 0 ? predikatQiraati(sum / n, settings.predikatScale).key : '')
    body.push(r)
  }

  let fSize, cPad
  const nrows = body.length
  if (nrows <= 5) { fSize = 9; cPad = 1.8 }
  else if (nrows <= 10) { fSize = 8.5; cPad = 1.4 }
  else if (nrows <= 20) { fSize = 8; cPad = 1.0 }
  else if (nrows <= 30) { fSize = 7; cPad = 0.6 }
  else { fSize = 6; cPad = 0.4 }

  const dateW = 28
  const predW = 32
  const numCount = numIds.length
  const numW = Math.max(16, Math.floor((185 - 14 - 12 - dateW - predW) / Math.max(1, numCount)))
  const columnStyles = { 0: { cellWidth: 14 }, 1: { cellWidth: 12 } }
  fields.forEach((f, idx) => {
    if (f.type === 'date') columnStyles[2 + idx] = { cellWidth: dateW }
    else if (f.type === 'auto_predikat') columnStyles[2 + idx] = { cellWidth: predW }
    else columnStyles[2 + idx] = { cellWidth: numW }
  })

  drawTable(doc, {
    startY: y,
    head,
    body,
    theme: 'grid',
    margin: { left: 15, right: 15 },
    styles: { font: doc._fontMU, fontSize: fSize, cellPadding: cPad, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80, 80, 80], lineWidth: 0.15 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold', lineWidth: 0.2, lineColor: [60, 60, 60], valign: 'middle', halign: 'center' },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles,
    didDrawCell: (d) => {
      if (predFieldIdx >= 0 && d.section === 'body' && d.column.index === predikatColIdx) {
        drawPredikatImage(doc, d.cell, predikatKeys[d.row.index])
      }
    }
  })

  y = doc.lastAutoTable.finalY + 2
  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Nilai Rata-rata', fmtNilai(avg)]],
    styles: { font: doc._fontMU, fontSize: 8.5, fontStyle: 'bold', halign: 'center', cellPadding: 1.2 },
    margin: { left: 15, right: 15 },
    tableWidth: 185,
    columnStyles: { 0: { cellWidth: 110 } }
  })
  return doc.lastAutoTable.finalY || y
}

async function generateDiniyahPdf(doc, y, santri, schema, raporState, settings) {
  const data = raporState.data || {}
  const jenjang =
    (schema.jenjang || []).find((j) => j.kelas === (santri.kelas_sekolah || '')) ||
    (schema.jenjang || [])[0]
  if (!jenjang) return y

  const predikatKeys = []
  const head = [['NO', 'MATA PELAJARAN', 'KKM', 'RATA-RATA SUMATIF', 'SUMATIF AKHIR SEMESTER', 'PREDIKAT']]
  const body = (jenjang.mapel || []).map((m, i) => {
    const mid = m.id || String(m.nama).toLowerCase().replace(/[^a-z0-9]/g, '_')
    const sm = Number(data[`dn__${jenjang.kelas}__${mid}__sumatif`])
    const ak = Number(data[`dn__${jenjang.kelas}__${mid}__akhir`])
    const arr = [sm, ak].filter((v) => !isNaN(v) && v > 0)
    const nilai = arr.length ? arr.reduce((s2, v) => s2 + v, 0) / arr.length : null
    const kkm = Number(m.kkm) || 75
    predikatKeys.push(nilai == null ? '' : predikatDiniyah(nilai, kkm, settings.predikatScale).key)
    return [i + 1, m.nama, kkm, isNaN(sm) ? '-' : fmtNilai(sm), isNaN(ak) ? '-' : fmtNilai(ak), '']
  })

  // Baris lebih tinggi + teks lebih besar -> mengisi halaman (kurangi whitespace bawah).
  drawTable(doc, {
    startY: y,
    head,
    body,
    margin: { left: 15, right: 15 },
    styles: { font: doc._fontMU, fontSize: 10, cellPadding: 2.2, minCellHeight: 12.5, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80, 80, 80], lineWidth: 0.15 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold', lineWidth: 0.15, fontSize: 8.5, minCellHeight: 11, valign: 'middle' },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: { 0: { cellWidth: 12 }, 1: { halign: 'left', fontStyle: 'bold' }, 2: { cellWidth: 16 }, 3: { cellWidth: 34 }, 4: { cellWidth: 34 }, 5: { cellWidth: 32 } },
    didDrawCell: (d) => {
      if (d.section === 'body' && d.column.index === 5) drawPredikatImage(doc, d.cell, predikatKeys[d.row.index])
    }
  })

  y = doc.lastAutoTable.finalY + 3
  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Rata-rata Nilai', fmtNilai(avg)]],
    margin: { left: 15, right: 15 },
    styles: { font: doc._fontMU, fontSize: 10, fontStyle: 'bold', halign: 'center', valign: 'middle', cellPadding: 2.2, minCellHeight: 11, lineColor: [80, 80, 80], lineWidth: 0.15 },
    columnStyles: { 0: { cellWidth: 120 } }
  })
  return doc.lastAutoTable.finalY || y
}

async function generatePpphPdf(doc, y, santri, schema, raporState, settings) {
  const data = raporState.data || {}
  const fieldsNilai = schema.fieldsNilai || []
  const predikatKeys = []
  const head = [['Level', 'Kitab', 'Tgl Khotam', ...fieldsNilai.map((f) => f.label), 'Predikat']]
  const predikatColIdx = 3 + fieldsNilai.length
  const body = (schema.levels || []).map((lvl, i) => {
    const tgl = data[`ppph__${lvl.id}__tgl_khotam`] || tglKhotamLevelKK(santri, 'PPPH', lvl.id)
    const cells = [i + 1, lvl.kitab || lvl.label, fmtDateShort(tgl)]
    let sum = 0
    let n = 0
    fieldsNilai.forEach((f) => {
      const v = data[`ppph__${lvl.id}__${f.id}`]
      cells.push(safeStr(v))
      const num = Number(v)
      if (!isNaN(num) && num > 0) {
        sum += num
        n++
      }
    })
    predikatKeys.push(n > 0 ? predikatQiraati(sum / n, settings.predikatScale).key : '')
    cells.push('')
    return cells
  })

  drawTable(doc, {
    startY: y,
    head,
    body,
    margin: { left: 15, right: 15 },
    styles: { font: doc._fontMU, fontSize: 9, cellPadding: 1.6, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80, 80, 80], lineWidth: 0.15 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold', lineWidth: 0.15 },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: { 0: { cellWidth: 16 }, 1: { halign: 'left', fontStyle: 'bold' }, 2: { cellWidth: 28 }, [predikatColIdx]: { cellWidth: 34 } },
    didDrawCell: (d) => {
      if (d.section === 'body' && d.column.index === predikatColIdx) drawPredikatImage(doc, d.cell, predikatKeys[d.row.index])
    }
  })

  y = doc.lastAutoTable.finalY + 2
  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Nilai Rata-rata', fmtNilai(avg)]],
    styles: { font: doc._fontMU, fontSize: 8.5, fontStyle: 'bold', halign: 'center', cellPadding: 1.2 },
    margin: { left: 15, right: 15 },
    tableWidth: 185,
    columnStyles: { 0: { cellWidth: 110 } }
  })
  return doc.lastAutoTable.finalY || y
}

// ============================================================
// Dispatcher
// ============================================================

export async function generateRaporPdf({
  santri,
  schema,
  raporState,
  settings,
  dbGuru,
  filename,
  lembagaOverride = null
}) {
  const doc = await createPdf({ kind: 'rapor', orientation: 'p', format: [215, 330] }) // v.21.51: F4 (215×330mm)
  const lembaga = raporState.lembaga || santri.lembaga || ''

  let y = await drawKopRapor(doc, settings, lembaga, lembagaOverride, !!schema?.perKelas)
  y = drawJudulRapor(doc, y)
  y = drawIdentitas(doc, y, santri, raporState)

  if (schema?.perLevel) {
    y = await generatePraPtptPdf(doc, y, santri, schema, raporState, settings)
  } else if (schema?.perKitab) {
    y = await generatePpphPdf(doc, y, santri, schema, raporState, settings)
  } else if (schema?.perKelas) {
    y = await generateDiniyahPdf(doc, y, santri, schema, raporState, settings)
  } else if (lembaga === 'PTPT') {
    y = await generatePtptPdf(doc, y, santri, schema, raporState, settings)
  } else {
    y = await generateTpqPdf(doc, y, santri, schema, raporState, settings)
  }

  y = drawAbsensiKepribadian(doc, y + 4, raporState.absensi, raporState.kepribadian)
  y = drawCatatanBox(doc, y + 4, raporState.catatan_wali_kelas || raporState.catatan)
  y = await drawSignBlocks(doc, y + 6, santri, settings, lembaga, dbGuru, lembagaOverride)

  const fn =
    filename ||
    `rapor_${santri.nama || 'santri'}_${raporState.semester || ''}_${raporState.tahun_ajaran || ''}.pdf`
  // v.71.0526: pakai saveBlob (native Capacitor save + share di Android/iOS, browser download di web)
  const { saveBlob } = await import('@/composables/useNativeDownload')
  await saveBlob(doc.output('blob'), fn.replace(/\s+/g, '_'))
}
