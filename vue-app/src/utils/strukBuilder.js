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

// ── 2) Dot-matrix / thermal (teks fixed-width 32 kolom) ──
const WIDTH = 32

function lineCh(ch) {
  return String(ch || '-').repeat(WIDTH)
}
function lr(left, right) {
  left = String(left)
  right = String(right)
  if (left.length + right.length >= WIDTH) return (left + ' ' + right).slice(0, WIDTH)
  return left + ' '.repeat(WIDTH - left.length - right.length) + right
}
function center(t) {
  t = String(t)
  if (t.length >= WIDTH) return t.slice(0, WIDTH)
  return ' '.repeat(Math.floor((WIDTH - t.length) / 2)) + t
}

export function buildStrukText(trx, settings = {}) {
  const s = settings || {}
  const out = []
  out.push(center(String(s.kopLine2 || s.kopLine1 || 'MAMBAUL ULUM').toUpperCase()))
  if (s.kopLine3) out.push(center(String(s.kopLine3)))
  if (s.kopLine4) out.push(center(String(s.kopLine4)))
  out.push(lineCh('='))
  out.push(center('STRUK PEMBAYARAN'))
  out.push(lineCh('='))
  out.push('No   : ' + (trx.no_struk || '-'))
  out.push('Tgl  : ' + (trx.tanggal || '-'))
  out.push('Nama : ' + (trx.santri_nama || '-'))
  if (trx.santri_nis) out.push('NIS  : ' + trx.santri_nis)
  const lk = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')
  if (lk) out.push('Kelas: ' + lk)
  out.push(lineCh('-'))
  for (const it of trx.items || []) {
    out.push(String(it.jenis || '-'))
    out.push(lr('  ' + (it.keterangan || ''), fmtRpStruk(it.nominal)))
  }
  out.push(lineCh('-'))
  out.push(lr('TOTAL', fmtRpStruk(trx.total)))
  out.push(lr('BAYAR', fmtRpStruk(trx.bayar)))
  out.push(lr('KEMBALI', fmtRpStruk(trx.kembali)))
  out.push(lineCh('='))
  out.push('Kasir: ' + (trx.operator || '-'))
  out.push(center('Terima kasih'))
  out.push('')
  out.push('')
  return out.join('\n')
}

function escapeHtml(t) {
  return String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}

export function cetakStrukDotMatrix(trx, settings = {}) {
  const text = buildStrukText(trx, settings)
  const w = window.open('', '_blank', 'width=380,height=640')
  if (!w) {
    alert('Popup diblokir — izinkan popup untuk mencetak struk.')
    return
  }
  w.document.write(
    '<!DOCTYPE html><html><head><title>Struk</title><style>' +
      '@page { margin: 4mm; } ' +
      'body { font-family: "Courier New", monospace; font-size: 12px; white-space: pre; line-height: 1.35; margin: 0; padding: 4px; }' +
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
