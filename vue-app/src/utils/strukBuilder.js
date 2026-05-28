// v.21.90.0527: Struk pembayaran POS — PDF A5 ber-KOP + dot-matrix teks fixed-width.
// Wide (80 col, 9.5" continuous form Epson LX-310): mirror struk Yayasan. Narrow (32/42) kompak.
import { createPdf, drawKopLetterhead, drawTitle, drawTable, savePdf } from './pdfBuilder'
import { imageToDataURL } from '@/services/pdf'
import { terbilangRupiah } from './terbilang'

export function fmtRpStruk(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}
function fmtNum(n) {
  return new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
}
function formatTglDdMmYyyy(t) {
  if (!t) return '-'
  const m = String(t).match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return m[3] + '-' + m[2] + '-' + m[1]
  try {
    const d = new Date(t)
    if (!isNaN(d))
      return (
        String(d.getDate()).padStart(2, '0') + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        d.getFullYear()
      )
  } catch (e) {}
  return t
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
  drawTitle(doc, 'BUKTI PEMBAYARAN', { y: y + 7, size: 13 })
  y += 11

  doc.setFontSize(9)
  const pageW = doc.internal.pageSize.getWidth()
  const left = 12
  const colMid = pageW / 2 + 4
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const tglFmt = formatTglDdMmYyyy(trx.tanggal)
  const leftRows = [
    ['Diterima dari', trx.santri_nama || '-'],
    ['Nomor Induk', trx.santri_nis || '-'],
    ['Kelas', [trx.lembaga, trx.kelas].filter(Boolean).join(' ') || '-'],
    ['Terbilang', terb]
  ]
  const rightRows = [
    ['Tgl. Bayar', tglFmt],
    ['No. Bukti', trx.no_struk || '-'],
    ['Metode', trx.metode || 'TUNAI'],
    ['Petugas', trx.operator || '-'],
    ['Status Siswa', trx.status_siswa || 'Aktif']
  ]
  const yStart = y
  const rowH = 5
  for (let i = 0; i < leftRows.length; i++) {
    doc.setFont(font, 'normal')
    doc.text(leftRows[i][0], left, yStart + i * rowH)
    doc.text(': ' + String(leftRows[i][1]), left + 24, yStart + i * rowH)
  }
  for (let i = 0; i < rightRows.length; i++) {
    doc.setFont(font, 'normal')
    doc.text(rightRows[i][0], colMid, yStart + i * rowH)
    doc.text(': ' + String(rightRows[i][1]), colMid + 22, yStart + i * rowH)
  }
  y = yStart + Math.max(leftRows.length, rightRows.length) * rowH + 4

  doc.setFont(font, 'normal')
  doc.text('Dengan rincian pembayaran sebagai berikut :', left, y)
  y += 3

  drawTable(doc, {
    startY: y,
    head: [['No', 'Jenis Pembayaran', 'Nominal']],
    body: (trx.items || []).map((it, idx) => [
      String(idx + 1),
      (it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : ''),
      fmtRpStruk(it.nominal)
    ]),
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      2: { halign: 'right', cellWidth: 30 }
    },
    styles: { fontSize: 9 }
  })

  let ty = doc.lastAutoTable ? doc.lastAutoTable.finalY : y
  ty += 6
  const rightX = pageW - 12
  doc.setFontSize(10)
  const rowR = (label, val, bold) => {
    doc.setFont(font, bold ? 'bold' : 'normal')
    doc.text(label, rightX - 50, ty)
    doc.text(val, rightX, ty, { align: 'right' })
    ty += 5.5
  }
  rowR('Jumlah Rp.', fmtNum(trx.total), true)
  rowR('Pembayaran Rp.', fmtNum(trx.bayar))
  rowR('Kembali Rp.', fmtNum(trx.kembali))

  ty += 8
  doc.setFontSize(9)
  doc.setFont(font, 'normal')
  doc.text('Penyetor,', left + 8, ty)
  doc.text('Penerima,', pageW / 2 + 12, ty)
  // v.21.91.0527: TTD operator (kasir) auto dari guru.tanda_tangan bila ada
  if (trx.operator_ttd_url) {
    try {
      const dataUrl = String(trx.operator_ttd_url).startsWith('data:')
        ? trx.operator_ttd_url
        : await imageToDataURL(trx.operator_ttd_url)
      if (dataUrl) doc.addImage(dataUrl, 'PNG', pageW / 2 + 14, ty + 2, 28, 14, undefined, 'FAST')
    } catch (e) {
      /* ignore — fallback nama saja */
    }
  }
  ty += 20
  doc.text('( .................. )', left + 4, ty)
  doc.text('( ' + (trx.operator || '').padEnd(16) + ' )', pageW / 2 + 8, ty)

  const safe = String(trx.santri_nama || 'santri').replace(/\s+/g, '_')
  savePdf(doc, 'struk_' + safe + '_' + (trx.tanggal || '') + '.pdf', { preview })
  return doc
}

// ── 2) Dot-matrix / thermal (teks fixed-width, paper-aware) ──
const PAPER = {
  '9.5': { cols: 80, pageCss: '@page { size: 241mm auto; margin: 4mm; } body { font-size: 11px; }' },
  thermal80: { cols: 42, pageCss: '@page { size: 80mm auto; margin: 2mm; } body { font-size: 11px; }' },
  thermal58: { cols: 32, pageCss: '@page { size: 58mm auto; margin: 2mm; } body { font-size: 10px; }' }
}
function paperFromSettings(settings = {}) {
  const code = String(settings && settings.posStrukPaper || '9.5')
  return PAPER[code] || PAPER['9.5']
}

function repCh(ch, n) {
  return String(ch || '-').repeat(Math.max(0, n))
}
function padR(s, n) {
  s = String(s)
  if (s.length >= n) return s.slice(0, n)
  return s + ' '.repeat(n - s.length)
}
function clip(s, n) {
  s = String(s)
  return s.length > n ? s.slice(0, n) : s
}
function lr(left, right, w) {
  left = String(left)
  right = String(right)
  if (left.length + right.length >= w) return (left + ' ' + right).slice(0, w)
  return left + ' '.repeat(w - left.length - right.length) + right
}
function center(t, w) {
  t = String(t)
  if (t.length >= w) return t.slice(0, w)
  return ' '.repeat(Math.floor((w - t.length) / 2)) + t
}
function col2(left, right, w, halfW) {
  const h = halfW || Math.floor(w / 2)
  const l = clip(left, h - 1)
  const r = clip(right, w - h)
  return l + ' '.repeat(h - l.length) + r
}
function metaLine(label, val, labelW) {
  return padR(label, labelW) + ': ' + String(val)
}
function dotted(label, val, w) {
  const lab = String(label || '')
  const v = String(val || '')
  const minDots = 3
  if (lab.length + v.length + 2 + minDots >= w) return clip(lab + ' ' + v, w)
  return lab + ' ' + '.'.repeat(w - lab.length - v.length - 2) + ' ' + v
}

function buildStrukWide(trx, settings) {
  const W = 80
  const HALF = Math.floor(W * 0.55)
  const s = settings || {}
  const out = []
  const kopL = [
    String(s.kopLine1 || 'YAYASAN MAMBAUL ULUM').toUpperCase(),
    String(s.kopLine2 || ''),
    String(s.kopLine3 || ''),
    String(s.kopLine4 || ''),
    String(s.kopLine5 || '')
  ].filter(function (l) { return l })

  out.push(col2(kopL[0] || '', 'BUKTI PEMBAYARAN', W, HALF))
  out.push(col2(kopL[1] || '', '================', W, HALF))
  for (let i = 2; i < kopL.length; i++) out.push(kopL[i])
  out.push(repCh('=', W))

  const tglFmt = formatTglDdMmYyyy(trx.tanggal)
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const ml = [
    ['Diterima dari', trx.santri_nama || '-'],
    ['Nomor Induk', trx.santri_nis || '-'],
    ['Kelas', [trx.lembaga, trx.kelas].filter(Boolean).join(' ') || '-'],
    ['Terbilang', terb]
  ]
  const mr = [
    ['Tgl. Bayar', tglFmt],
    ['No. Bukti', trx.no_struk || '-'],
    ['Metode', trx.metode || 'TUNAI'],
    ['Petugas', trx.operator || '-'],
    ['Status Siswa', trx.status_siswa || 'Aktif']
  ]
  const rows = Math.max(ml.length, mr.length)
  const LW = 13
  for (let i = 0; i < rows; i++) {
    const l = ml[i] ? metaLine(ml[i][0], ml[i][1], LW) : ''
    const r = mr[i] ? metaLine(mr[i][0], mr[i][1], LW) : ''
    out.push(col2(l, r, W, HALF))
  }
  out.push('')
  out.push('Dengan rincian pembayaran sebagai berikut :')
  out.push('')

  let i = 0
  for (const it of trx.items || []) {
    i++
    const label =
      ' ' + String(i).padStart(2, ' ') + '. ' +
      (it.jenis || '-') +
      (it.keterangan ? ' (' + it.keterangan + ')' : '')
    const val = 'Rp. ' + fmtNum(it.nominal)
    out.push(dotted(label, val, W))
  }
  out.push('')

  const tWidth = 36
  const tStart = W - tWidth
  const tLine = function (label, val) {
    return ' '.repeat(tStart) + dotted(label, 'Rp. ' + fmtNum(val), tWidth)
  }
  out.push(tLine('Jumlah', trx.total))
  out.push(tLine('Pembayaran', trx.bayar))
  out.push(tLine('Kembali', trx.kembali))
  out.push('')
  out.push('')

  out.push(col2('  Penyetor,', '  Penerima,', W, HALF))
  out.push('')
  out.push('')
  out.push(col2(
    '  ( .................. )',
    '  ( ' + padR(String(trx.operator || ''), 16) + ' )',
    W, HALF
  ))
  out.push('')
  return out.join('\n')
}

function buildStrukNarrow(trx, settings, w) {
  const s = settings || {}
  const out = []
  out.push(center(String(s.kopLine2 || s.kopLine1 || 'MAMBAUL ULUM').toUpperCase(), w))
  if (s.kopLine3) out.push(center(String(s.kopLine3), w))
  if (s.kopLine4) out.push(center(String(s.kopLine4), w))
  out.push(repCh('=', w))
  out.push(center('BUKTI PEMBAYARAN', w))
  out.push(repCh('=', w))
  out.push('No    : ' + (trx.no_struk || '-'))
  out.push('Tgl   : ' + formatTglDdMmYyyy(trx.tanggal))
  out.push('Nama  : ' + (trx.santri_nama || '-'))
  if (trx.santri_nis) out.push('NIS   : ' + trx.santri_nis)
  const lk = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')
  if (lk) out.push('Kelas : ' + lk)
  out.push('Kasir : ' + (trx.operator || '-'))
  out.push(repCh('-', w))
  for (const it of trx.items || []) {
    out.push(String(it.jenis || '-'))
    out.push(lr('  ' + (it.keterangan || ''), 'Rp ' + fmtNum(it.nominal), w))
  }
  out.push(repCh('-', w))
  out.push(lr('TOTAL', 'Rp ' + fmtNum(trx.total), w))
  out.push(lr('BAYAR', 'Rp ' + fmtNum(trx.bayar), w))
  out.push(lr('KEMBALI', 'Rp ' + fmtNum(trx.kembali), w))
  out.push(repCh('=', w))
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  out.push('Terbilang:')
  let cur = ''
  for (const word of terb.split(' ')) {
    if ((cur + ' ' + word).trim().length > w) { out.push(cur); cur = word }
    else { cur = (cur ? cur + ' ' : '') + word }
  }
  if (cur) out.push(cur)
  out.push(center('Terima kasih', w))
  out.push('')
  out.push('')
  return out.join('\n')
}

export function buildStrukText(trx, settings = {}) {
  const paper = paperFromSettings(settings)
  if (paper.cols >= 60) return buildStrukWide(trx, settings)
  return buildStrukNarrow(trx, settings, paper.cols)
}

function escapeHtml(t) {
  return String(t).replace(/[&<>]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]
  })
}

export function cetakStrukDotMatrix(trx, settings = {}) {
  const paper = paperFromSettings(settings)
  const text = buildStrukText(trx, settings)
  const winW = paper.cols >= 60 ? 760 : 380
  const w = window.open('', '_blank', 'width=' + winW + ',height=640')
  if (!w) { alert('Popup diblokir — izinkan popup untuk mencetak struk.'); return }
  const css = paper.pageCss +
    ' body { font-family: "Courier New", monospace; white-space: pre; line-height: 1.35; margin: 0; padding: 4px; }'
  w.document.write(
    '<!DOCTYPE html><html><head><title>Struk</title><style>' + css +
    '</style></head><body>' + escapeHtml(text) + '</body></html>'
  )
  w.document.close()
  w.focus()
  setTimeout(function () { try { w.print() } catch (e) {} }, 350)
}
