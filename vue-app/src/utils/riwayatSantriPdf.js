// v.21.102.0527 — riwayatSantriPdf
// Ekspor PDF riwayat keuangan per santri dalam rentang bulan-tahun.
// Penggunaan:
//   await cetakRiwayatSantriPdf({
//     santri, dari: 'YYYY-MM-DD', sampai: 'YYYY-MM-DD',
//     tagihan, pembayaran, tabungan, kop
//   })
import {
  createPdf,
  drawKopLetterhead,
  drawTitle,
  drawTable,
  lastTableY,
  savePdf,
  buildKopFromSettings
} from './pdfBuilder'

function fmtRp(n) {
  const v = Number(n || 0)
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(v))
}

const BULAN_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

function fmtTgl(d) {
  if (!d) return '-'
  try {
    const dt = toDate(d)
    if (!dt) return String(d)
    const dd = String(dt.getDate()).padStart(2, '0')
    const mm = String(dt.getMonth() + 1).padStart(2, '0')
    const yy = dt.getFullYear()
    return `${dd}/${mm}/${yy}`
  } catch {
    return String(d)
  }
}

function fmtRangeLabel(dari, sampai) {
  try {
    const a = new Date(dari)
    const b = new Date(sampai)
    const sameYear = a.getFullYear() === b.getFullYear()
    if (sameYear) {
      return `${BULAN_ID[a.getMonth()]} - ${BULAN_ID[b.getMonth()]} ${a.getFullYear()}`
    }
    return `${BULAN_ID[a.getMonth()]} ${a.getFullYear()} - ${BULAN_ID[b.getMonth()]} ${b.getFullYear()}`
  } catch {
    return ''
  }
}

// String/number tolerant santri match (kompat data lama)
function matchSantri(doc, sid) {
  const want = String(sid)
  const a = doc.santri_id == null ? '' : String(doc.santri_id)
  const b = doc.santriId == null ? '' : String(doc.santriId)
  return a === want || b === want
}

function toDate(v) {
  if (!v) return null
  try {
    if (typeof v === 'object' && typeof v.toDate === 'function') {
      const d = v.toDate()
      if (!isNaN(d.getTime())) return d
    }
    if (typeof v === 'object' && typeof v.seconds === 'number') {
      const d = new Date(v.seconds * 1000)
      if (!isNaN(d.getTime())) return d
    }
    const d = new Date(v)
    if (!isNaN(d.getTime())) return d
  } catch {
    /* ignore */
  }
  return null
}

function getDocDate(doc, kind) {
  if (kind === 'tagihan') {
    return toDate(doc.jatuh_tempo) || toDate(doc.tanggal) || toDate(doc.created_at) || toDate(doc.createdAt) || null
  }
  return toDate(doc.tanggal) || toDate(doc.created_at) || toDate(doc.createdAt) || null
}

function inRange(date, dari, sampai) {
  if (!date) return false
  const dStart = new Date(dari + 'T00:00:00')
  const dEnd = new Date(sampai + 'T23:59:59')
  return date >= dStart && date <= dEnd
}

function groupTrx(rows) {
  const groups = {}
  for (const r of rows) {
    const key = r.trx_id || `${r.santri_id || r.santriId || ''}__${r.tanggal}__${r.operator || ''}`
    if (!groups[key]) {
      groups[key] = {
        trx_id: r.trx_id || key,
        tanggal: r.tanggal || '',
        no_struk: r.no_struk || r.trx_id || '',
        operator: r.operator || '-',
        items: [],
        total: 0
      }
    }
    groups[key].items.push({
      jenis: r.kategori || 'Pembayaran',
      nominal: Number(r.nominal || 0)
    })
    groups[key].total += Number(r.nominal || 0)
  }
  return Object.values(groups).sort((a, b) =>
    String(a.tanggal || '').localeCompare(String(b.tanggal || ''))
  )
}

export async function cetakRiwayatSantriPdf({
  santri = {},
  dari = '',
  sampai = '',
  tagihan = [],
  pembayaran = [],
  tabungan = [],
  kop = null,
  filename = ''
} = {}) {
  if (!dari || !sampai) {
    const now = new Date()
    const y = now.getFullYear()
    dari = `${y}-01-01`
    sampai = `${y}-12-31`
  }

  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  let y = 10
  if (kop) {
    y = await drawKopLetterhead(doc, kop, { y })
  }

  drawTitle(doc, 'RIWAYAT KEUANGAN SANTRI', { y: y + 8, size: 12 })
  drawTitle(doc, fmtRangeLabel(dari, sampai).toUpperCase(), { y: y + 14, size: 10 })
  y += 18

  doc.setFont(doc._fontMU || 'helvetica', 'normal')
  doc.setFontSize(10)
  const infoLines = [
    ['Nama', santri.nama || '-'],
    ['NIS', santri.nis || santri.id || '-'],
    ['Lembaga', santri.lembaga || '-'],
    ['Kelas', santri.kelas || '-'],
    ['Periode', `${fmtTgl(dari)} s/d ${fmtTgl(sampai)}`]
  ]
  let infoY = y + 6
  for (const [k, v] of infoLines) {
    doc.text(`${k}`, 12, infoY)
    doc.text(`: ${v}`, 35, infoY)
    infoY += 5
  }
  y = infoY + 2

  const sid = santri.id

  // A. Tagihan
  const tagihanFiltered = tagihan
    .filter((t) => matchSantri(t, sid))
    .filter((t) => {
      const d = getDocDate(t, 'tagihan')
      return d ? inRange(d, dari, sampai) : true
    })
    .sort((a, b) => {
      const da = getDocDate(a, 'tagihan')
      const db = getDocDate(b, 'tagihan')
      return (da?.getTime() || 0) - (db?.getTime() || 0)
    })

  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('A. TAGIHAN', 12, y + 4)
  y += 5

  if (tagihanFiltered.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada tagihan pada periode ini.', 14, y + 4)
    y += 6
  } else {
    let totalT = 0, totalB = 0, totalS = 0
    const rows = tagihanFiltered.map((t, i) => {
      const tot = Number(t.nominal || t.nominal_total || 0)
      const byr = Number(t.bayar || t.nominal_terbayar || 0)
      const sis = Math.max(0, tot - byr)
      totalT += tot
      totalB += byr
      totalS += sis
      let status = 'Belum'
      if (sis === 0 && tot > 0) status = 'Lunas'
      else if (byr > 0) status = 'Cicilan'
      return [
        String(i + 1),
        t.kategori || t.jenis || t.jenis_id || '-',
        t.periode || '-',
        fmtTgl(t.jatuh_tempo || t.tanggal),
        fmtRp(tot),
        fmtRp(byr),
        fmtRp(sis),
        status
      ]
    })
    drawTable(doc, {
      startY: y + 2,
      head: [['No', 'Kategori', 'Periode', 'Jatuh Tempo', 'Tagihan', 'Bayar', 'Sisa', 'Status']],
      body: rows,
      foot: [[
        { content: 'TOTAL', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(totalT), styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(totalB), styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(totalS), styles: { halign: 'right', fontStyle: 'bold' } },
        ''
      ]],
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'center' }
      }
    })
    y = lastTableY(doc) + 4
  }

  // B. Pembayaran POS
  const pembayaranFiltered = pembayaran
    .filter((p) => matchSantri(p, sid))
    .filter((p) => {
      const d = getDocDate(p, 'pos')
      return d ? inRange(d, dari, sampai) : false
    })
  const trxList = groupTrx(pembayaranFiltered)

  if (y > 240) { doc.addPage(); y = 14 }
  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('B. PEMBAYARAN (POS)', 12, y + 4)
  y += 5

  if (trxList.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada pembayaran POS pada periode ini.', 14, y + 4)
    y += 6
  } else {
    let grand = 0
    const rows = trxList.map((t, i) => {
      grand += t.total
      const itemsStr = t.items.map((it) => `${it.jenis} ${fmtRp(it.nominal).replace('Rp ', '')}`).join('; ')
      return [String(i + 1), fmtTgl(t.tanggal), t.no_struk || t.trx_id, itemsStr, t.operator, fmtRp(t.total)]
    })
    drawTable(doc, {
      startY: y + 2,
      head: [['No', 'Tanggal', 'No. Struk', 'Item', 'Operator', 'Total']],
      body: rows,
      foot: [[
        { content: 'TOTAL PEMBAYARAN', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(grand), styles: { halign: 'right', fontStyle: 'bold' } }
      ]],
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 20 },
        2: { cellWidth: 28 },
        4: { cellWidth: 25 },
        5: { halign: 'right', cellWidth: 26 }
      }
    })
    y = lastTableY(doc) + 4
  }

  // C. Mutasi Tabungan
  const tabunganFiltered = tabungan
    .filter((m) => matchSantri(m, sid))
    .filter((m) => {
      const d = getDocDate(m, 'tabungan')
      return d ? inRange(d, dari, sampai) : false
    })
    .sort((a, b) => {
      const da = getDocDate(a, 'tabungan')
      const db = getDocDate(b, 'tabungan')
      return (da?.getTime() || 0) - (db?.getTime() || 0)
    })

  if (y > 240) { doc.addPage(); y = 14 }
  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('C. MUTASI TABUNGAN', 12, y + 4)
  y += 5

  if (tabunganFiltered.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada mutasi tabungan pada periode ini.', 14, y + 4)
    y += 6
  } else {
    let saldo = 0, totalSetor = 0, totalTarik = 0
    const rows = tabunganFiltered.map((m, i) => {
      const nom = Number(m.nominal || 0)
      const isSetor = (m.jenis || '').toLowerCase() === 'setor'
      if (isSetor) { saldo += nom; totalSetor += nom }
      else { saldo -= nom; totalTarik += nom }
      return [
        String(i + 1),
        fmtTgl(m.tanggal),
        (m.jenis || '-').toUpperCase(),
        m.kategori || '-',
        isSetor ? fmtRp(nom) : '',
        !isSetor ? fmtRp(nom) : '',
        fmtRp(saldo),
        m.catatan || ''
      ]
    })
    drawTable(doc, {
      startY: y + 2,
      head: [['No', 'Tanggal', 'Jenis', 'Kategori', 'Setor', 'Tarik', 'Saldo', 'Catatan']],
      body: rows,
      foot: [[
        { content: 'TOTAL', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(totalSetor), styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(totalTarik), styles: { halign: 'right', fontStyle: 'bold' } },
        { content: fmtRp(saldo), styles: { halign: 'right', fontStyle: 'bold' } },
        ''
      ]],
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 20 },
        2: { cellWidth: 18, halign: 'center' },
        4: { halign: 'right' },
        5: { halign: 'right' },
        6: { halign: 'right' }
      }
    })
    y = lastTableY(doc) + 4
  }

  if (y > 250) { doc.addPage(); y = 14 }
  doc.setFont(doc._fontMU || 'helvetica', 'italic')
  doc.setFontSize(8)
  doc.text(`Dicetak: ${new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}`, 12, y + 6)

  const stats = {
    tagihan: tagihanFiltered.length,
    pembayaran: trxList.length,
    tabungan: tabunganFiltered.length
  }

  const namaSlug = (santri.nama || 'santri').toString().toLowerCase().replace(/\s+/g, '_')
  const periodeSlug = `${dari}_${sampai}`
  const fname = filename || `riwayat_${namaSlug}_${periodeSlug}.pdf`
  savePdf(doc, fname)
  return { doc, stats }
}

export { buildKopFromSettings }
