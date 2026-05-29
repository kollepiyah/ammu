// vue-app/src/utils/raporPdf.js
// PDF rapor generator dengan template match requirements kyai.
// v.21.42: Major overhaul for visual parity, KOP refinement, dynamic PTPT sizing, and 3-block signatures.

import { createPdf, drawTable, savePdf } from './pdfBuilder'
import { imageToDataURL } from '@/services/pdf'

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

async function drawKopRapor(doc, settings, lembaga, lembagaOverride = null) {
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  const startY = 10

  // Logo kiri (Qiraati) - Shared for all
  const leftUrl = settings.logoQiraati || ''
  if (leftUrl) {
    try {
      const dataUrl = leftUrl.startsWith('data:') ? leftUrl : await imageToDataURL(leftUrl)
      if (dataUrl) doc.addImage(dataUrl, 'PNG', 14, startY, 18, 18, undefined, 'FAST')
    } catch (_e) {}
  }

  // Logo kanan (MU / Pesantren) — v.21.51: cek per-lembaga override dulu
  const rightUrl =
    (lembagaOverride && lembagaOverride.kop_logo) || settings.logoKop || settings.logoUrl || ''
  if (rightUrl) {
    try {
      const dataUrl = rightUrl.startsWith('data:') ? rightUrl : await imageToDataURL(rightUrl)
      if (dataUrl) doc.addImage(dataUrl, 'PNG', pageW - 32, startY, 18, 18, undefined, 'FAST')
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
  doc.text(telp, pageW / 2, startY + 22, { align: 'center' })

  // 2-line divider
  const dividerY = startY + 25
  doc.setLineWidth(0.6)
  doc.line(12, dividerY, pageW - 12, dividerY)
  doc.setLineWidth(0.2)
  doc.line(12, dividerY + 1, pageW - 12, dividerY + 1)

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
  // v.21.46: tahun/semester geser kanan + rapikan spacing
  const pageW = doc.internal.pageSize.getWidth()
  const font = doc._fontMU || 'times'
  doc.setFont(font, 'normal')
  doc.setFontSize(11)

  const col1 = 16 // label kiri
  const col2 = pageW - 68 // v.21.49: lebih ke kanan lagi (was -80)

  const ta = raporState.periode?.tahun_ajaran || ''
  const sm = raporState.periode?.semester || ''
  const isPasc = ['Pra PTPT', 'PTPT', 'PPPH'].includes(raporState.lembaga)

  const rows = [
    ['Nama Santri', santri.nama || '-', 'Tahun Pelajaran', ta],
    [
      isPasc ? 'Kelas Sekolah' : 'Jilid / Kelas',
      isPasc ? santri.kelas_sekolah || '-' : santri.kelas || '-',
      'Semester',
      sm
    ]
  ]

  // Plain text rows (NO box border) — line spacing rapikan 5mm
  rows.forEach((row, i) => {
    const py = y + i * 5
    doc.text(row[0], col1, py)
    doc.text(':', col1 + 28, py)
    doc.text(safeStr(row[1]), col1 + 31, py)

    doc.text(row[2], col2, py)
    doc.text(':', col2 + 28, py)
    doc.text(safeStr(row[3]), col2 + 31, py)
  })

  return y + rows.length * 5 + 3
}

// ============================================================
// Footer & Signatures
// ============================================================

function drawAbsensiKepribadian(doc, y, absensi, kepribadian) {
  // v.21.47: tambah gap 4mm supaya tidak nempel tabel diatas
  const pageW = doc.internal.pageSize.getWidth()
  const colW = (pageW - 28) / 2
  const font = doc._fontMU || 'times'
  y = y + 4 // gap top

  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text('ABSENSI', 14, y + 3.5)
  doc.text('NILAI KEPRIBADIAN', 14 + colW + 10, y + 3.5)

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
    doc.text(lbl, 14 + colW + 10, py)
    formatKepribadian(doc, 14 + colW + 10 + doc.getTextWidth(lbl), py, kr[1], opts, font)
  })

  for (let i = 0; i < 3; i++) {
    doc.text(absLines[i], 16, y + 8 + i * 4)
  }
  return y + 24 // v.21.47: relax from y+22
}

function drawSignBlocks(doc, y, santri, settings, lembaga, dbGuru = []) {
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
  if (lembaga === 'PTPT' || lembaga === 'PPPH') {
    labelKepala = 'PJ PTPT'
    searchTitle = 'PJ PTPT'
  } else if (lembaga === 'Diniyah') {
    // v.21.59: Diniyah ikut Sekolah (bukan Madin)
    labelKepala = 'Kepala Sekolah'
    searchTitle = 'KEPALA SEKOLAH'
  }

  // v.21.47: tambah gap atas (y+5) supaya tidak nempel ke tabel
  const yStart = y + 5
  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  doc.text(`Dikeluarkan di : ${tempat}`, pageW - 14, yStart, { align: 'right' })
  doc.text(`Pada Tanggal   : ${today}`, pageW - 14, yStart + 5, { align: 'right' })

  const col1 = 35
  const col2 = pageW / 2
  const col3 = pageW - 35
  const labelY = yStart + 14 // v.21.47: relax gap label dari +10 ke +14

  doc.text('Wali Santri', col1, labelY, { align: 'center' })
  doc.text('Guru Kelas', col2, labelY, { align: 'center' })
  doc.text(labelKepala, col3, labelY, { align: 'center' })

  // Lookup Signatures
  const guruKelasName = santri.guru || ''
  const guruKelas = dbGuru.find((g) => g.nama === guruKelasName && g.status !== 'Non-Aktif')

  // v.21.10 match: if labelKepala contains 'PJ PTPT', search specifically for that
  const searchFinal = labelKepala.includes('PJ PTPT') ? 'PJ PTPT' : searchTitle

  const kepala = dbGuru.find((g) => {
    const jab = String(g.jabatan || '').toUpperCase()
    const jabT = String(g.jabatan_tambahan || '').toUpperCase()
    return (jab.includes(searchFinal) || jabT.includes(searchFinal)) && g.status !== 'Non-Aktif'
  })

  const nameY = labelY + 26 // v.21.47: relax kembali ke +26 (kompak terlalu agresif)

  // Signature Images
  if (guruKelas?.ttd_b64) {
    doc.addImage(guruKelas.ttd_b64, 'PNG', col2 - 15, labelY + 2, 30, 15, undefined, 'FAST')
  }
  if (kepala?.ttd_b64) {
    doc.addImage(kepala.ttd_b64, 'PNG', col3 - 15, labelY + 2, 30, 15, undefined, 'FAST')
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
    guruKelas?.ekgq || guruKelas?.no_ekgq || guruKelas?.no_syahadah || guruKelas?.nip || ''
  if (guruEkgq) {
    doc.setFont(font, 'normal')
    doc.setFontSize(8)
    doc.text(String(guruEkgq), col2, nameY + 4, { align: 'center' })
    doc.setFont(font, 'bold')
    doc.setFontSize(10)
  }

  // Kepala
  const kName = kepala?.nama || settings.namaKepala || '________________'
  doc.text(kName, col3, nameY, { align: 'center' })
  const kepalaEkgq = kepala?.ekgq || kepala?.no_ekgq || kepala?.no_syahadah || kepala?.nip || ''
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
  doc.text('CATATAN UNTUK SANTRI / ORANG TUA:', 14, y + 4)

  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  const txt = (catatan || '').trim()
  const boxH = 22 // v.21.47: box height naik 18 → 22
  const boxY = y + 6
  doc.setLineWidth(0.3)
  doc.rect(14, boxY, pageW - 28, boxH)
  if (txt) {
    const lines = doc.splitTextToSize(txt, pageW - 32)
    doc.text(lines, 16, boxY + 5)
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
        styles: { halign: 'center', fillColor: [240, 240, 240], fontStyle: 'bold' }
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

    const body = []
    if (sec.rows?.length) {
      for (const row of sec.rows) {
        const r = [row]
        for (const f of fields) r.push(safeStr(data[`${sec.id}__${row}__${f.id}`]))
        body.push(r)
      }
    } else {
      const r = []
      for (const f of fields) r.push(safeStr(data[`${sec.id}__${f.id}`]))
      body.push(r)
    }

    drawTable(doc, {
      startY: y,
      head: heads,
      body,
      styles: { font: doc._fontMU, fontSize: 7.5, cellPadding: 1.0, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80,80,80], lineWidth: 0.15 },
      headStyles: { fillColor: [255, 255, 255], textColor: 0, lineWidth: 0.15 },
      alternateRowStyles: { fillColor: [255, 255, 255] } // v.21.51: no zebra
    })
    y = (doc.lastAutoTable?.finalY || y) + 2
  }

  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Nilai Rata-rata', fmtNilai(avg)]],
    styles: { font: doc._fontMU, fontSize: 8.5, fontStyle: 'bold', halign: 'center', cellPadding: 1.2 },
    columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 'auto' } }
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
      'Adab',
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
      r.push(safeStr(data[`pra__${lvl.id}__${kh.id}__adab`]))

      let sum = 0
      const keys = ['fashohah', 'tartil', 'tahfizh_juz_30', 'ghorib', 'tajwid', 'adab']
      keys.forEach((k) => {
        const v = Number(data[`pra__${lvl.id}__${kh.id}__${k}`])
        if (v) sum += v
      })
      r.push(sum || '-')
      body.push(r)
    })
  })

  // v.21.60.2.0526: presisi total = 185mm (F4 usable). margin kiri+kanan = 14+15 = 29mm. 215-29=186 → 185 aman.
  // Kolom: Kelas(8) + LevelBaca(14) + Target(28) + Tgl(22) + 7 nilai×14 + Jml(15) = 185
  drawTable(doc, {
    startY: y,
    head,
    body,
    margin: { left: 14, right: 15 },
    tableWidth: 185,
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
      fillColor: [248, 250, 252],
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
      1: { cellWidth: 14 }, // Level Baca
      2: { cellWidth: 28, halign: 'left' }, // Target Khotam
      3: { cellWidth: 22 }, // Tgl Khotam (dd/mm/yyyy butuh ruang)
      4: { cellWidth: 14 }, // Fashohah
      5: { cellWidth: 14 }, // Tartil
      6: { cellWidth: 14 }, // Tahfizh Juz 30
      7: { cellWidth: 14 }, // Ghorib
      8: { cellWidth: 14 }, // Tajwid
      9: { cellWidth: 14 }, // Doa Harian
      10: { cellWidth: 14 }, // Adab
      11: { cellWidth: 15, fontStyle: 'bold', fillColor: [253, 246, 178] } // Jml — bold + bg kuning lembut
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
    margin: { left: 14, right: 15 },
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
      0: { cellWidth: 50, fillColor: [248, 250, 252] },
      1: { fillColor: [255, 255, 255] }
    }
  })

  return doc.lastAutoTable.finalY || y
}

async function generatePtptPdf(doc, y, santri, schema, raporState, settings) {
  // v.21.49: Kelas rowspan + Istimror typo fix + center align (kyai image spec)
  const data = raporState.data || {}
  const head = [
    [
      { content: 'Kelas', rowSpan: 2, styles: { valign: 'middle' } },
      { content: 'Juz', rowSpan: 2, styles: { valign: 'middle' } },
      { content: 'Tanggal Khotam', rowSpan: 2, styles: { valign: 'middle' } },
      { content: 'Kualitas Bacaan', colSpan: 2 },
      { content: 'Kualitas Hafalan', colSpan: 2 },
      { content: 'Adab', rowSpan: 2, styles: { valign: 'middle' } },
      { content: 'Predikat', rowSpan: 2, styles: { valign: 'middle' } }
    ],
    ['Fashohah', 'Tartil', 'Istimror', 'Kelancaran']
  ]

  const body = []
  const rows = schema.rows || []

  // Cumulative filter: e.g. Kelas 2 shows Juz 1-10
  const curKelasNum = parseInt(String(santri.kelas).match(/\d+/)?.[0] || '1')
  const filteredRows = rows.filter((r) => {
    const rKlsNum = parseInt(String(r.kelas).match(/\d+/)?.[0] || '1')
    return rKlsNum <= curKelasNum
  })

  // v.21.49: Group by kelas for rowspan — index pertama kelas dapat rowSpan = count
  const kelasCount = {}
  for (const r of filteredRows) {
    const k = String(r.kelas).trim()
    kelasCount[k] = (kelasCount[k] || 0) + 1
  }
  const kelasSeen = new Set()

  for (const row of filteredRows) {
    const juzNum = String(row.juz).match(/\d+/)?.[0]
    const kelasKey = String(row.kelas).trim()
    const r = []
    if (!kelasSeen.has(kelasKey)) {
      // First row of this kelas — set rowSpan
      r.push({
        content: row.kelas,
        rowSpan: kelasCount[kelasKey],
        styles: { valign: 'middle', fontStyle: 'bold' }
      })
      kelasSeen.add(kelasKey)
    }
    r.push(row.juz)
    r.push(safeStr(data[`kj__juz_${juzNum}__tgl_khotam`]))
    r.push(safeStr(data[`kj__juz_${juzNum}__bacaan_fashohah`]))
    r.push(safeStr(data[`kj__juz_${juzNum}__bacaan_tartil`]))
    r.push(
      safeStr(
        data[`kj__juz_${juzNum}__hafalan_istimror`] || data[`kj__juz_${juzNum}__hafalan_istiqror`]
      )
    )
    r.push(safeStr(data[`kj__juz_${juzNum}__hafalan_kelancaran`]))
    r.push(safeStr(data[`kj__juz_${juzNum}__adab`]))
    r.push(safeStr(data[`kj__juz_${juzNum}__predikat`]))
    body.push(r)
  }

  // PTPT auto-compact threshold (kyai spec v.21.43) — 5 step density
  // Kelas 1 → 5 rows spacious; Kelas 5-6 → 25-30 rows compact untuk muat 1 halaman
  // v.21.86: lebih compact + Predikat width lebih lebar untuk teks "Sangat Baik"
  let fSize, cPad
  const n = body.length
  if (n <= 5) {
    fSize = 9
    cPad = 1.8
  } else if (n <= 10) {
    fSize = 8.5
    cPad = 1.4
  } else if (n <= 20) {
    fSize = 8
    cPad = 1.0
  } else if (n <= 30) {
    fSize = 7
    cPad = 0.6
  } else {
    fSize = 6
    cPad = 0.4
  }

  drawTable(doc, {
    startY: y,
    head,
    body,
    theme: 'grid',
    styles: {
      font: doc._fontMU,
      fontSize: fSize,
      cellPadding: cPad,
      halign: 'center',
      valign: 'middle',
      overflow: 'linebreak',
      lineColor: [80, 80, 80],
      lineWidth: 0.15
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: 'bold',
      lineWidth: 0.2,
      lineColor: [60, 60, 60],
      valign: 'middle',
      halign: 'center'
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    // F4 width 215mm - margin 14*2 = 187mm usable. Total: 14+12+28+22+22+22+22+16+24 = 182mm
    columnStyles: {
      0: { cellWidth: 14 },  // Kelas
      1: { cellWidth: 12 },  // Juz
      2: { cellWidth: 28 },  // Tanggal Khotam
      3: { cellWidth: 22 },  // Fashohah
      4: { cellWidth: 22 },  // Tartil
      5: { cellWidth: 22 },  // Istimror
      6: { cellWidth: 22 },  // Kelancaran
      7: { cellWidth: 16 },  // Adab
      8: { cellWidth: 24 }   // Predikat lebih lebar
    },
    margin: { left: 14, right: 14 }
  })

  y = doc.lastAutoTable.finalY + 2
  const avg = raporState.rata_rata || 0
  drawTable(doc, {
    startY: y,
    body: [['Nilai Rata-rata', fmtNilai(avg)]],
    styles: { font: doc._fontMU, fontSize: 8.5, fontStyle: 'bold', halign: 'center', cellPadding: 1.2 },
    columnStyles: { 0: { cellWidth: 100 } }
  })
  return doc.lastAutoTable.finalY || y
}

async function generateDiniyahPdf(doc, y, santri, schema, raporState, settings) {
  const data = raporState.data || {}
  const jenjang = (schema.jenjang || []).find((j) => j.kelas === (santri.kelas_sekolah || ''))
  if (!jenjang) return y

  const head = [['NO', 'MATA PELAJARAN', 'KKM', 'RATA-RATA SUMATIF', 'SUMATIF AKHIR']]
  const body = (jenjang.mapel || []).map((m, i) => {
    const mid =
      m.id ||
      String(m.nama)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
    const keyR = `dn__${jenjang.kelas}__${mid}__sumatif`
    const keyS = `dn__${jenjang.kelas}__${mid}__akhir`
    return [i + 1, m.nama, m.kkm || 80, safeStr(data[keyR]), safeStr(data[keyS])]
  })

  drawTable(doc, {
    startY: y,
    head,
    body,
    styles: { font: doc._fontMU, fontSize: 8, cellPadding: 1.2, halign: 'center', valign: 'middle', overflow: 'linebreak', lineColor: [80,80,80], lineWidth: 0.15 },
    headStyles: { fillColor: [255, 255, 255], textColor: 0, lineWidth: 0.15 },
    alternateRowStyles: { fillColor: [255, 255, 255] }, // v.21.51: no zebra
    columnStyles: { 1: { halign: 'left', fontStyle: 'bold' } }
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

  let y = await drawKopRapor(doc, settings, lembaga, lembagaOverride)
  y = drawJudulRapor(doc, y)
  y = drawIdentitas(doc, y, santri, raporState)

  if (schema?.perLevel) {
    y = await generatePraPtptPdf(doc, y, santri, schema, raporState, settings)
  } else if (schema?.perKelas) {
    y = await generateDiniyahPdf(doc, y, santri, schema, raporState, settings)
  } else if (lembaga === 'PTPT' || lembaga === 'PPPH') {
    // v.21.115.0528: PPPH (Pasca PTPT Program Hadits) ikut format PTPT, bukan TPQ.
    // Sebelum fix: PPPH falls through ke generateTpqPdf yang format-nya beda lembaga.
    y = await generatePtptPdf(doc, y, santri, schema, raporState, settings)
  } else {
    y = await generateTpqPdf(doc, y, santri, schema, raporState, settings)
  }

  y = drawAbsensiKepribadian(doc, y + 4, raporState.absensi, raporState.kepribadian)
  y = drawCatatanBox(doc, y + 4, raporState.catatan_wali_kelas || raporState.catatan)
  y = drawSignBlocks(doc, y + 6, santri, settings, lembaga, dbGuru, lembagaOverride)

  const fn =
    filename ||
    `rapor_${santri.nama || 'santri'}_${raporState.semester || ''}_${raporState.tahun_ajaran || ''}.pdf`
  // v.71.0526: pakai saveBlob (native Capacitor save + share di Android/iOS, browser download di web)
  const { saveBlob } = await import('@/composables/useNativeDownload')
  await saveBlob(doc.output('blob'), fn.replace(/\s+/g, '_'))
}
