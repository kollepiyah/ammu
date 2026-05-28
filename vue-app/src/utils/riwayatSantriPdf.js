// v.21.101.0527 — riwayatSantriPdf
// Ekspor PDF riwayat keuangan per santri (1 tahun):
//   - Tagihan (kategori + periode + nominal + bayar + sisa + status)
//   - Pembayaran (transaksi POS dari keuangan_buku_induk sumber=pos_santri)
//   - Mutasi tabungan (keuangan_tabungan_santri)
// Penggunaan:
//   await cetakRiwayatSantriPdf({ santri, tahun, tagihan, pembayaran, tabungan, kop, settings })
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

function fmtTgl(d) {
  if (!d) return '-'
  try {
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return String(d)
    const dd = String(dt.getDate()).padStart(2, '0')
    const mm = String(dt.getMonth() + 1).padStart(2, '0')
    const yy = dt.getFullYear()
    return `${dd}/${mm}/${yy}`
  } catch {
    return String(d)
  }
}

function getYear(d) {
  if (!d) return null
  try {
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return null
    return dt.getFullYear()
  } catch {
    return null
  }
}

/**
 * Group transaksi POS per trx_id (gabungkan items dengan trx_id sama).
 */
function groupTrx(rows) {
  const groups = {}
  for (const r of rows) {
    const key = r.trx_id || `${r.santri_id}__${r.tanggal}__${r.operator || ''}`
    if (!groups[key]) {
      groups[key] = {
        trx_id: r.trx_id || key,
        tanggal: r.tanggal || '',
        no_struk: r.no_struk || '',
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

/**
 * Cetak PDF riwayat santri 1 tahun.
 * @param {object} opts
 * @param {object} opts.santri  { id, nama, nis, lembaga, kelas, ... }
 * @param {number} opts.tahun   misal 2026
 * @param {array}  opts.tagihan list dari keuangan_tagihan (sudah filter santri_id)
 * @param {array}  opts.pembayaran list keuangan_buku_induk sumber=pos_santri (santri_id)
 * @param {array}  opts.tabungan list keuangan_tabungan_santri (santri_id)
 * @param {object} opts.kop     { logoUrl, line1, ..., line5 }
 * @param {string} [opts.filename]
 */
export async function cetakRiwayatSantriPdf({
  santri = {},
  tahun = new Date().getFullYear(),
  tagihan = [],
  pembayaran = [],
  tabungan = [],
  kop = null,
  filename = ''
} = {}) {
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  let y = 10
  if (kop) {
    y = await drawKopLetterhead(doc, kop, { y })
  }

  // Title + info santri
  drawTitle(doc, `RIWAYAT KEUANGAN SANTRI - TAHUN ${tahun}`, { y: y + 8, size: 12 })
  y += 12

  doc.setFont(doc._fontMU || 'helvetica', 'normal')
  doc.setFontSize(10)
  const infoLines = [
    ['Nama', santri.nama || '-'],
    ['NIS', santri.nis || santri.id || '-'],
    ['Lembaga', santri.lembaga || '-'],
    ['Kelas', santri.kelas || '-']
  ]
  let infoY = y + 6
  for (const [k, v] of infoLines) {
    doc.text(`${k}`, 12, infoY)
    doc.text(`: ${v}`, 35, infoY)
    infoY += 5
  }
  y = infoY + 2

  // -------- Section 1: Tagihan -------- //
  const tagihanFiltered = tagihan
    .filter((t) => String(t.santri_id) === String(santri.id))
    .filter((t) => {
      const yr = getYear(t.jatuh_tempo) || getYear(t.tanggal) || getYear(t.created_at)
      return yr == null || yr === tahun
    })
    .sort((a, b) =>
      String(a.jatuh_tempo || a.periode || '').localeCompare(
        String(b.jatuh_tempo || b.periode || '')
      )
    )

  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('A. TAGIHAN', 12, y + 4)
  y += 5

  if (tagihanFiltered.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada tagihan pada tahun ini.', 14, y + 4)
    y += 6
  } else {
    let totalT = 0,
      totalB = 0,
      totalS = 0
    const rows = tagihanFiltered.map((t, i) => {
      const tot = Number(t.nominal || 0)
      const byr = Number(t.bayar || 0)
      const sis = Math.max(0, tot - byr)
      totalT += tot
      totalB += byr
      totalS += sis
      let status = 'Belum'
      if (sis === 0) status = 'Lunas'
      else if (byr > 0) status = 'Cicilan'
      return [
        String(i + 1),
        t.kategori || '-',
        t.periode || '-',
        fmtTgl(t.jatuh_tempo),
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
      foot: [
        [
          { content: 'TOTAL', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(totalT), styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(totalB), styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(totalS), styles: { halign: 'right', fontStyle: 'bold' } },
          ''
        ]
      ],
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

  // -------- Section 2: Pembayaran POS -------- //
  // Pembayaran filter: sumber pos_santri (sudah di-filter di caller),
  // tahun tanggal.
  const pembayaranFiltered = pembayaran
    .filter((p) => String(p.santri_id) === String(santri.id))
    .filter((p) => {
      const yr = getYear(p.tanggal) || getYear(p.created_at)
      return yr == null || yr === tahun
    })
  const trxList = groupTrx(pembayaranFiltered)

  if (y > 240) {
    doc.addPage()
    y = 14
  }
  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('B. PEMBAYARAN (POS)', 12, y + 4)
  y += 5

  if (trxList.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada pembayaran POS pada tahun ini.', 14, y + 4)
    y += 6
  } else {
    let grand = 0
    const rows = trxList.map((t, i) => {
      grand += t.total
      const itemsStr = t.items
        .map((it) => `${it.jenis} ${fmtRp(it.nominal).replace('Rp ', '')}`)
        .join('; ')
      return [
        String(i + 1),
        fmtTgl(t.tanggal),
        t.no_struk || t.trx_id,
        itemsStr,
        t.operator,
        fmtRp(t.total)
      ]
    })
    drawTable(doc, {
      startY: y + 2,
      head: [['No', 'Tanggal', 'No. Struk', 'Item', 'Operator', 'Total']],
      body: rows,
      foot: [
        [
          { content: 'TOTAL PEMBAYARAN', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(grand), styles: { halign: 'right', fontStyle: 'bold' } }
        ]
      ],
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

  // -------- Section 3: Mutasi Tabungan -------- //
  const tabunganFiltered = tabungan
    .filter((m) => String(m.santri_id || m.santriId) === String(santri.id))
    .filter((m) => {
      const yr = getYear(m.tanggal) || getYear(m.created_at)
      return yr == null || yr === tahun
    })
    .sort((a, b) => String(a.tanggal || '').localeCompare(String(b.tanggal || '')))

  if (y > 240) {
    doc.addPage()
    y = 14
  }
  doc.setFont(doc._fontMU || 'helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('C. MUTASI TABUNGAN', 12, y + 4)
  y += 5

  if (tabunganFiltered.length === 0) {
    doc.setFont(doc._fontMU || 'helvetica', 'italic')
    doc.setFontSize(9)
    doc.text('Tidak ada mutasi tabungan pada tahun ini.', 14, y + 4)
    y += 6
  } else {
    let saldo = 0
    let totalSetor = 0,
      totalTarik = 0
    const rows = tabunganFiltered.map((m, i) => {
      const nom = Number(m.nominal || 0)
      const isSetor = (m.jenis || '').toLowerCase() === 'setor'
      if (isSetor) {
        saldo += nom
        totalSetor += nom
      } else {
        saldo -= nom
        totalTarik += nom
      }
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
      foot: [
        [
          { content: 'TOTAL', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(totalSetor), styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(totalTarik), styles: { halign: 'right', fontStyle: 'bold' } },
          { content: fmtRp(saldo), styles: { halign: 'right', fontStyle: 'bold' } },
          ''
        ]
      ],
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

  // Footer info
  if (y > 250) {
    doc.addPage()
    y = 14
  }
  doc.setFont(doc._fontMU || 'helvetica', 'italic')
  doc.setFontSize(8)
  doc.text(
    `Dicetak: ${new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}`,
    12,
    y + 6
  )

  const fname =
    filename ||
    `riwayat_${(santri.nama || 'santri').toString().toLowerCase().replace(/\s+/g, '_')}_${tahun}.pdf`
  savePdf(doc, fname)
  return doc
}

// Re-export helper supaya caller bisa pakai
export { buildKopFromSettings }
