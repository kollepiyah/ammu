// v.21.88.0527: Struk pembayaran bersama (dipakai POS Santri + fitur keuangan lain).
// Dua jenis:
//   1) cetakStrukPdf       — PDF A5 berwarna ber-KOP (untuk cetak/arsip dari riwayat)
//   2) cetakStrukDotMatrix — struk teks fixed-width (32 kolom) via print window browser.
//      Cetak ke printer dot-matrix/thermal lewat dialog print. Hook ESC/POS Tauri menyusul.
//
// trx shape:
//   { no_struk, tanggal, santri_nama, santri_nis, lembaga, kelas, operator,
//     items: [{ jenis, nominal, keterangan }], total, bayar, kembali }
import { createPdf, drawKopLetterhead, drawTitle, drawTable, savePdf } from './pdfBuilder'

export function fmtRpStruk(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}

export function buildKopFromSettings(s = {}) {
  return {
    logoUrl: s.kop_logo || s.kopLogo || s.logoKop || '',
    line1: s.kopLine1 || 'YAYASAN MAMBAUL ULUM',
    line2: s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
    line3: s.kopLine3 || '',
    line4: s.kopLine4 || '',
    line5: s.kopLine5 || ''
  }
}

// ── 1) PDF berwarna ber-KOP (A5 portrait) ──
export async function cetakStrukPdf(trx, settings = {}, { preview = true } = {}) {
  const kop = buildKopFromSettings(settings)
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'a5' })
  const font = doc._fontMU || 'helvetica'
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, 'STRUK PEMBAYARAN', { y: y + 7, size: 13 })
  y += 11

  doc.setFontSize(9)
  const left = 12
  const info = [
    ['No', trx.no_struk || '-'],
    ['Tanggal', trx.tanggal || '-'],
    ['Santri', trx.santri_nama || '-'],
    ['NIS', trx.santri_nis || '-'],
    ['Lembaga', [trx.lembaga, trx.kelas].filter(Boolean).join(' · ') || '-'],
    ['Kasir', trx.operator || '-']
  ]
  for (const [k, v] of info) {
    doc.setFont(font, 'normal')
    doc.text(String(k), left, y)
    doc.text(': ' + String(v), left + 22, y)
    y += 5
  }
  y += 2

  drawTable(doc, {
    startY: y,
    head: [['Jenis', 'Keterangan', 'Nominal']],
    body: (trx.items || []).map((it) => [
      it.jenis || '-',
      it.keterangan || '',
      fmtRpStruk(it.nominal)
    ]),
    columnStyles: { 2: { halign: 'right', cellWidth: 30 } },
    styles: { fontSize: 9 }
  })

  let ty = doc.lastAutoTable ? doc.lastAutoTable.finalY : y
  ty += 7
  const pageW = doc.internal.pageSize.getWidth()
  const rightX = pageW - 12
  doc.setFontSize(10)
  const rowR = (label, val, bold) => {
    doc.setFont(font, bold ? 'bold' : 'normal')
    doc.text(label, rightX - 50, ty)
    doc.text(val, rightX, ty, { align: 'right' })
    ty += 5.5
  }
  rowR('Total', fmtRpStruk(trx.total), true)
  rowR('Uang diterima', fmtRpStruk(trx.bayar))
  rowR('Kembalian', fmtRpStruk(trx.kembali))

  ty += 8
  doc.setFont(font, 'italic')
  doc.setFontSize(9)
  doc.text('Terima kasih — simpan struk ini sebagai bukti pembayaran.', pageW / 2, ty, {
    align: 'center'
  })

  const safe = String(trx.santri_nama || 'santri').replace(/\s+/g, '_')
  savePdf(doc, `struk_${safe}_${trx.tanggal || ''}.pdf`, { preview })
  return doc
}

// ── 2) Dot-matrix / thermal (teks fixed-width) ──
// v.21.89.0527: lebar kertas konfigurabel via settings.posStrukPaper.
//   '9.5'        → 80 kolom (Epson LX-310 continuous form, 10 cpi) — DEFAULT
//   'thermal80'  → 42 kolom (printer thermal 80mm)
//   'thermal58'  → 32 kolom (printer thermal 58mm)
const PAPER = {
  '9.5': { cols: 80, pageCss: '@page { size: 241mm auto; margin: 4mm; } body { font-size: 11px; }' },
  thermal80: { cols: 42, pageCss: '@page { size: 80mm auto; margin: 2mm; } body { font-size: 11px; }' },
  thermal58: { cols: 32, pageCss: '@page { size: 58mm auto; margin: 2mm; } body { font-size: 10px; }' }
}
function paperFromSettings(settings = {}) {
  const code = String(settings?.posStrukPaper || '9.5')
  return PAPER[code] || PAPER['9.5']
}

function lineCh(ch, width) {
  return String(ch || '-').repeat(width)
}
function lr(left, right, width) {
  left = String(left)
  right = String(right)
  if (left.length + right.length >= width) return (left + ' ' + right).slice(0, width)
  return left + ' '.repeat(width - left.length - right.length) + right
}
function center(t, width) {
  t = String(t)
  if (t.length >= width) return t.slice(0, width)
  return ' '.repeat(Math.floor((width - t.length) / 2)) + t
}

export function buildStrukText(trx, settings = {}) {
  const s = settings || {}
  const w = paperFromSettings(s).cols
  const out = []
  out.push(center(String(s.kopLine2 || s.kopLine1 || 'MAMBAUL ULUM').toUpperCase(), w))
  if (s.kopLine3) out.push(center(String(s.kopLine3), w))
  if (s.kopLine4) out.push(center(String(s.kopLine4), w))
  out.push(lineCh('=', w))
  out.push(center('STRUK PEMBAYARAN', w))
  out.push(lineCh('=', w))
  out.push('No    : ' + (trx.no_struk || '-'))
  out.push('Tgl   : ' + (trx.tanggal || '-'))
  out.push('Nama  : ' + (trx.santri_nama || '-'))
  if (trx.santri_nis) out.push('NIS   : ' + trx.santri_nis)
  const lk = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')
  if (lk) out.push('Kelas : ' + lk)
  out.push('Kasir : ' + (trx.operator || '-'))
  out.push(lineCh('-', w))
  for (const it of trx.items || []) {
    out.push(String(it.jenis || '-'))
    out.push(lr('  ' + (it.keterangan || ''), fmtRpStruk(it.nominal), w))
  }
  out.push(lineCh('-', w))
  out.push(lr('TOTAL', fmtRpStruk(trx.total), w))
  out.push(lr('BAYAR', fmtRpStruk(trx.bayar), w))
  out.push(lr('KEMBALI', fmtRpStruk(trx.kembali), w))
  out.push(lineCh('=', w))
  out.push(center('Terima kasih', w))
  out.push('')
  out.push('')
  return out.join('\n')
}

function escapeHtml(t) {
  return String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}

export function cetakStrukDotMatrix(trx, settings = {}) {
  const paper = paperFromSettings(settings)
  const text = buildStrukText(trx, settings)
  const winW = paper.cols >= 80 ? 720 : 380
  const w = window.open('', '_blank', 'width=' + winW + ',height=640')
  if (!w) {
    alert('Popup diblokir — izinkan popup untuk mencetak struk.')
    return
  }
  const css =
    paper.pageCss +
    ' body { font-family: "Courier New", monospace; white-space: pre; line-height: 1.35; margin: 0; padding: 4px; }'
  w.document.write(
    '<!DOCTYPE html><html><head><title>Struk</title><style>' +
      css +
      '</style></head><body>' +
      escapeHtml(text) +
      '</body></html>'
  )
  w.document.close()
  w.focus()
  setTimeout(() => {
    try {
      w.print()
    } catch (e) {
      /* ignore */
    }
  }, 350)
}
