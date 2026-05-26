// v.21.25.0526 — pdfBuilder helper umum (jsPDF + jspdf-autotable)
// Menggantikan html2canvas approach yang sering blank.
//
// Font policy (LOCKED):
//   - 'rapor'   → times (Times New Roman)
//   - 'umum'    → helvetica (default)
//   - 'thermal' → courier (monospace, thermal printer)
//
// API:
//   const doc = await createPdf({ kind, orientation, format, kop })
//   drawKopLetterhead(doc, kop, opts)
//   drawSignature(doc, { nama, jabatan, tempat, tanggal, x, y })
//   drawTable(doc, opts)  // wrapper autoTable
//   doc.save('filename.pdf')

import { jsPDFFromCDN, imageToDataURL } from '@/services/pdf'

const FONT_MAP = {
  rapor: 'times',
  umum: 'helvetica',
  thermal: 'courier'
}

/**
 * Create a new jsPDF instance with sensible defaults.
 * @param {object} opts
 * @param {'rapor'|'umum'|'thermal'} opts.kind
 * @param {'p'|'l'} [opts.orientation]
 * @param {string} [opts.format]  e.g. 'a4', 'letter', 'a5', [w,h] mm
 * @returns {Promise<any>} jsPDF instance
 */
export async function createPdf({ kind = 'umum', orientation = 'p', format = 'a4' } = {}) {
  const jsPDF = await jsPDFFromCDN()
  const doc = new jsPDF({ orientation, unit: 'mm', format })
  const font = FONT_MAP[kind] || 'helvetica'
  doc.setFont(font, 'normal')
  doc._kindMU = kind
  doc._fontMU = font
  return doc
}

/**
 * Letterhead/KOP block. Optional logo (URL or data URL).
 * @param {any} doc
 * @param {object} kop  { logoUrl, line1, line2, line3, line4, line5 }
 * @param {object} [opts] { y, withLine }
 * @returns {Promise<number>} y position after the kop
 */
export async function drawKopLetterhead(doc, kop = {}, opts = {}) {
  const font = doc._fontMU || 'helvetica'
  const startY = opts.y ?? 10
  const pageW = doc.internal.pageSize.getWidth()
  let y = startY

  // Logo (left)
  if (kop.logoUrl) {
    try {
      const dataUrl = kop.logoUrl.startsWith('data:')
        ? kop.logoUrl
        : await imageToDataURL(kop.logoUrl)
      if (dataUrl) {
        doc.addImage(dataUrl, 'PNG', 12, y, 20, 20, undefined, 'FAST')
      }
    } catch {
      /* ignore */
    }
  }

  // Lines (center)
  doc.setFont(font, 'bold')
  const lines = [kop.line1, kop.line2, kop.line3].filter(Boolean)
  const subLines = [kop.line4, kop.line5].filter(Boolean)
  doc.setFontSize(14)
  if (lines[0]) {
    doc.text(String(lines[0]), pageW / 2, y + 5, { align: 'center' })
  }
  doc.setFontSize(11)
  if (lines[1]) {
    doc.text(String(lines[1]), pageW / 2, y + 11, { align: 'center' })
  }
  if (lines[2]) {
    doc.text(String(lines[2]), pageW / 2, y + 16, { align: 'center' })
  }
  doc.setFont(font, 'normal')
  doc.setFontSize(9)
  let yy = y + 21
  for (const sl of subLines) {
    doc.text(String(sl), pageW / 2, yy, { align: 'center' })
    yy += 4
  }
  y = Math.max(yy, y + 23)
  // Garis pemisah
  if (opts.withLine !== false) {
    doc.setLineWidth(0.4)
    doc.line(12, y + 1, pageW - 12, y + 1)
    doc.setLineWidth(0.2)
    doc.line(12, y + 2.2, pageW - 12, y + 2.2)
    y += 4
  }
  return y
}

/**
 * Tanda tangan footer.
 * @param {any} doc
 * @param {object} opts { nama, jabatan, tempat, tanggal, y, x, align }
 */
export function drawSignature(doc, opts = {}) {
  const font = doc._fontMU || 'helvetica'
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const align = opts.align || 'right'
  const x = opts.x ?? (align === 'right' ? pageW - 50 : 25)
  const y = opts.y ?? pageH - 40
  doc.setFont(font, 'normal')
  doc.setFontSize(10)
  if (opts.tempat || opts.tanggal) {
    const tl = [opts.tempat, opts.tanggal].filter(Boolean).join(', ')
    doc.text(tl, x, y, { align })
  }
  if (opts.jabatan) {
    doc.text(String(opts.jabatan), x, y + 6, { align })
  }
  if (opts.ttdImg) {
    try {
      const ttdW = 28,
        ttdH = 14
      const ix = align === 'right' ? x - ttdW : x
      doc.addImage(opts.ttdImg, 'PNG', ix, y + 8, ttdW, ttdH, undefined, 'FAST')
    } catch {
      /* ignore */
    }
  }
  doc.setFont(font, 'bold')
  if (opts.nama) {
    doc.text(String(opts.nama), x, y + 26, { align })
  }
  doc.setFont(font, 'normal')
  if (opts.nip) {
    doc.setFontSize(9)
    doc.text(String(opts.nip), x, y + 30, { align })
  }
}

/**
 * Wrapper autoTable dengan font default sesuai kind.
 * @param {any} doc
 * @param {object} opts  autoTable options + { kind override }
 */
export function drawTable(doc, opts = {}) {
  if (typeof doc.autoTable !== 'function') {
    throw new Error('jspdf-autotable plugin tidak ke-load')
  }
  const font = doc._fontMU || 'helvetica'
  const merged = {
    theme: 'grid',
    styles: {
      font,
      fontSize: 9,
      cellPadding: 1.5,
      textColor: 20,
      lineColor: 80,
      lineWidth: 0.1,
      ...(opts.styles || {})
    },
    headStyles: {
      font,
      fontStyle: 'bold',
      fillColor: [16, 122, 87],
      textColor: 255,
      halign: 'center',
      ...(opts.headStyles || {})
    },
    bodyStyles: { ...(opts.bodyStyles || {}) },
    alternateRowStyles: { fillColor: [245, 248, 246], ...(opts.alternateRowStyles || {}) },
    margin: { left: 12, right: 12, ...(opts.margin || {}) },
    ...opts
  }
  doc.autoTable(merged)
}

/** Helper: get current Y after last table. */
export function lastTableY(doc) {
  return doc.lastAutoTable ? doc.lastAutoTable.finalY : 0
}

/**
 * Helper: draw title (centered).
 */
export function drawTitle(doc, text, opts = {}) {
  const font = doc._fontMU || 'helvetica'
  const pageW = doc.internal.pageSize.getWidth()
  doc.setFont(font, 'bold')
  doc.setFontSize(opts.size || 14)
  doc.text(String(text), pageW / 2, opts.y || 30, { align: 'center' })
  doc.setFont(font, 'normal')
}

/**
 * Save & download. Returns blob URL for preview if requested.
 */
export function savePdf(doc, filename = 'document.pdf', { preview = false } = {}) {
  if (preview) {
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    return url
  }
  doc.save(filename)
}

/**
 * Convenience: build a simple table-based PDF in one call.
 * Useful for daftar/listing exports (santri/guru/dll).
 */
export async function buildListPdf({
  kind = 'umum',
  orientation = 'l',
  format = 'a4',
  kop = null,
  title = '',
  columns = [],
  rows = [],
  signature = null,
  filename = 'list.pdf'
}) {
  const doc = await createPdf({ kind, orientation, format })
  let y = 10
  if (kop) y = await drawKopLetterhead(doc, kop, { y })
  if (title) {
    drawTitle(doc, title, { y: y + 8, size: 12 })
    y += 12
  }
  // Convert columns to autotable head/body
  const head = [columns.map((c) => c.header || c.label || c.key)]
  const body = rows.map((r) =>
    columns.map((c) => {
      const v = typeof c.format === 'function' ? c.format(r[c.key], r) : r[c.key]
      return v == null ? '' : String(v)
    })
  )
  drawTable(doc, {
    startY: y + 4,
    head,
    body,
    columnStyles: columns.reduce((acc, c, i) => {
      if (c.width) acc[i] = { cellWidth: c.width }
      return acc
    }, {})
  })
  if (signature) {
    drawSignature(doc, signature)
  }
  savePdf(doc, filename)
  return doc
}
