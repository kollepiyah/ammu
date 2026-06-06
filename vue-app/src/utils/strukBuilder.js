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

// v.95.0626: Kelas gabungan SEKOLAH/QIRAATI -> "PKBM X/PPPH" (mis. "V/PTPT 3").
//   Urutan: sekolah dulu, lalu qiraati/ngaji. Hanya yang ada yang ditampilkan.
function kelasFull(trx) {
  const ng = [trx.lembaga, trx.kelas].filter(Boolean).join(' ')          // qiraati/ngaji
  const sk = [trx.lembaga_sekolah, trx.kelas_sekolah].filter(Boolean).join(' ') // sekolah
  return [sk, ng].filter(Boolean).join('/') || '-'
}

export function buildKopFromSettings(s = {}) {
  // v.21.92.0527: prioritas logo selaras Pengaturan Web (logoKop = field utama)
  return {
    logoUrl: s.logoKop || s.kop_logo || s.kopLogo || s.logoUrl || '',
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
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  const font = doc._fontMU || 'helvetica'
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, 'BUKTI PEMBAYARAN', { y: y + 7, size: 13 })
  y += 15

  doc.setFontSize(9)
  const pageW = doc.internal.pageSize.getWidth()
  const left = 12
  const colMid = pageW / 2 + 4
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const tglFmt = formatTglDdMmYyyy(trx.tanggal)
  const leftRows = [
    ['Diterima dari', trx.santri_nama || '-'],
    ['NIS', trx.santri_nis || '-'],
    ['Kelas', kelasFull(trx)],
    ['Terbilang', terb]
  ]
  const rightRows = [
    ['Tgl. Bayar', tglFmt],
    ['No. Transaksi', trx.no_struk || '-'],
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
  // v.94.0626: nama penyetor auto-isi dari wali santri (fallback garis kosong utk TTD manual)
  const penyetorPdf = String(trx.penyetor || '').trim()
  doc.text(penyetorPdf ? '( ' + penyetorPdf + ' )' : '( .................. )', left + 4, ty)
  doc.text('( ' + (trx.operator || '').padEnd(16) + ' )', pageW / 2 + 8, ty)

  const safe = String(trx.santri_nama || 'santri').replace(/\s+/g, '_')
  savePdf(doc, 'struk_' + safe + '_' + (trx.tanggal || '') + '.pdf', { preview })
  return doc
}

// ── 1c) PDF "slip" POS (cetak GRAFIS tajam ke dot-matrix) — gaya CONTOH:
//   header teks (nama yayasan + alamat, TANPA logo/kop formal) + kotak BUKTI kanan-atas,
//   Status inline di Kelas, rincian leader titik (+bulan), total band, TANPA Petugas.
//   Ukuran slip & margin atas dari settings (mm) → pas kertas + whitespace printer.
//   Return doc (caller -> doc.output('blob') -> printPdf). preview=true utk buka/simpan.
export async function cetakStrukSlipPdf(trx, settings = {}, { preview = false } = {}) {
  const kop = buildKopFromSettings(settings)
  const num = (v, lo, hi, def) => { const n = parseFloat(v); return Number.isFinite(n) && n >= lo && n <= hi ? n : def }
  const slipW = num(settings.posStrukSlipW, 120, 260, 220)
  const slipH = num(settings.posStrukSlipH, 60, 230, 140)
  const topMm = num(settings.posStrukTopMm, 0, 140, 6)
  // v.95.0626: slip biasanya lebih LEBAR dari tinggi (210x130) -> landscape, biar tidak ke-rotate printer
  const doc = await createPdf({ kind: 'umum', orientation: slipW >= slipH ? 'l' : 'p', format: [slipW, slipH] })
  const font = doc._fontMU || 'helvetica'
  const left = 9
  const right = slipW - 9
  const dash = (pat) => { if (typeof doc.setLineDashPattern === 'function') doc.setLineDashPattern(pat || [], 0) }

  // ── Header teks RINGKAS (yayasan tdk kebesaran, baris rapat) + kotak BUKTI kanan-atas ──
  let y = topMm + 4.5
  doc.setFont(font, 'bold'); doc.setFontSize(10)
  doc.text(String(kop.line1 || ''), left, y)
  let ky = y + 3.8
  if (kop.line2) { doc.setFont(font, 'bold'); doc.setFontSize(8.3); doc.text(String(kop.line2), left, ky); ky += 3.2 }
  doc.setFont(font, 'normal'); doc.setFontSize(7)
  for (const ln of [kop.line3, kop.line4, kop.line5].filter(Boolean)) {
    doc.text(String(ln), left, ky)
    ky += 2.9
  }
  const boxLabel = 'BUKTI PEMBAYARAN'
  doc.setFont(font, 'bold'); doc.setFontSize(8)
  const bw = doc.getTextWidth(boxLabel) + 6
  const bh = 7
  const bx = right - bw
  const by = y - 3.8
  dash([0.7, 0.5]); doc.setLineWidth(0.3)
  doc.rect(bx, by, bw, bh)
  dash(null)
  doc.text(boxLabel, bx + bw / 2, by + 4.6, { align: 'center' })
  const hy = Math.max(ky - 1.4, by + bh) + 1.6
  doc.setLineWidth(0.5); doc.line(left, hy, right, hy)
  y = hy + 4.2

  // ── Info 2 kolom (rapat; Kelas = sekolah/qiraati bold; TANPA Status Siswa & Petugas) ──
  doc.setFont(font, 'normal'); doc.setFontSize(8.3)
  const colMid = slipW / 2 + 8
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const tglFmt = formatTglDdMmYyyy(trx.tanggal)
  const leftRows = [
    ['Diterima dari', trx.santri_nama || '-'],
    ['NIS', trx.santri_nis || '-'],
    ['__KELAS__', ''],
    ['Terbilang', terb]
  ]
  const rightRows = [
    ['Tgl. Bayar', tglFmt],
    ['No. Transaksi', trx.no_struk || '-'],
    ['Metode', trx.metode || 'TUNAI']
  ]
  const yStart = y
  const rowH = 4.2
  const labelW = 22
  for (let i = 0; i < leftRows.length; i++) {
    const ry = yStart + i * rowH
    if (leftRows[i][0] === '__KELAS__') {
      doc.setFont(font, 'normal')
      doc.text('Kelas', left, ry)
      doc.text(':', left + labelW, ry)
      doc.setFont(font, 'bold')
      doc.text(kelasFull(trx), left + labelW + 2.5, ry)
    } else {
      doc.setFont(font, 'normal')
      doc.text(leftRows[i][0], left, ry)
      doc.text(': ' + String(leftRows[i][1]), left + labelW, ry)
    }
  }
  for (let i = 0; i < rightRows.length; i++) {
    const ry = yStart + i * rowH
    doc.setFont(font, 'normal')
    doc.text(rightRows[i][0], colMid, ry)
    doc.text(': ' + String(rightRows[i][1]), colMid + 19, ry)
  }
  y = yStart + leftRows.length * rowH + 2.8

  // ── Rincian (rapat; leader titik + periode) ──
  doc.setFont(font, 'normal'); doc.setFontSize(8.3)
  doc.text('Dengan rincian pembayaran sebagai berikut :', left, y)
  y += 4.8
  doc.setFontSize(8.6)
  const items = trx.items || []
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    const name = (it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : '')
    const amt = 'Rp. ' + fmtNum(it.nominal)
    doc.text(String(i + 1) + '.', left, y)
    doc.text(name, left + 5.5, y)
    doc.text(amt, right, y, { align: 'right' })
    const ne = left + 5.5 + doc.getTextWidth(name) + 2
    const as = right - doc.getTextWidth(amt) - 2
    if (as > ne) { dash([0.4, 0.7]); doc.setLineWidth(0.2); doc.line(ne, y - 0.8, as, y - 0.8); dash(null) }
    y += 4.4
  }
  if (!items.length) { doc.text('—', slipW / 2, y, { align: 'center' }); y += 4.4 }
  y += 0.8
  doc.setLineWidth(0.5); doc.line(left, y, right, y)
  y += 5

  // ── Footer: Penyetor / Penerima + total band kanan ──
  doc.setFontSize(8.6)
  const c1 = left + 26
  const c2 = slipW / 2 - 8
  doc.setFont(font, 'normal')
  doc.text('Penyetor,', c1, y, { align: 'center' })
  doc.text('Penerima,', c2, y, { align: 'center' })
  const totLabelX = slipW / 2 + 16
  let ty = y
  const rowR = (label, val, bold) => {
    doc.setFont(font, bold ? 'bold' : 'normal')
    doc.text(label, totLabelX, ty)
    doc.text(val, right, ty, { align: 'right' })
    ty += 4.5
  }
  rowR('Jumlah Rp.', fmtNum(trx.total), true)
  rowR('Pembayaran Rp.', fmtNum(trx.bayar))
  rowR('Kembali Rp.', fmtNum(trx.kembali))
  doc.setFont(font, 'normal')
  if (trx.operator_ttd_url) {
    try {
      const d = String(trx.operator_ttd_url).startsWith('data:') ? trx.operator_ttd_url : await imageToDataURL(trx.operator_ttd_url)
      if (d) doc.addImage(d, 'PNG', c2 - 13, y + 1, 24, 11, undefined, 'FAST')
    } catch (e) { /* ignore */ }
  }
  const sy = y + 14
  const penyetorPdf = String(trx.penyetor || '').trim()
  doc.text(penyetorPdf ? '( ' + penyetorPdf + ' )' : '( .................. )', c1, sy, { align: 'center' })
  doc.text('( ' + (trx.operator || '') + ' )', c2, sy, { align: 'center' })

  if (preview) {
    const safe = String(trx.santri_nama || 'santri').replace(/\s+/g, '_')
    savePdf(doc, 'struk_' + safe + '_' + (trx.tanggal || '') + '.pdf', { preview: true })
  }
  return doc
}

// ── 1b) PDF Slip Bisyaroh (guru) — match desain cetakStrukPdf (KOP F4 + tabel) ──
export async function cetakSlipBisyarohPdf(slip = {}, settings = {}, { preview = false } = {}) {
  const kop = buildKopFromSettings(settings)
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  const font = doc._fontMU || 'helvetica'
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, 'SLIP BISYAROH', { y: y + 7, size: 13 })
  y += 15

  const fmtPer = (p) => {
    const m = String(p || '').match(/^(\d{4})[-_](\d{1,2})$/)
    if (m) {
      const b = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][parseInt(m[2], 10) - 1]
      return (b || m[2]) + ' ' + m[1]
    }
    return String(p || '-')
  }

  doc.setFontSize(9)
  const pageW = doc.internal.pageSize.getWidth()
  const left = 12
  const colMid = pageW / 2 + 4
  const leftRows = [
    ['Nama', slip.guru_nama || '-'],
    ['Lembaga', slip.lembaga || '-'],
    ['Jabatan', slip.jabatan || 'Guru']
  ]
  const rightRows = [
    ['Periode', fmtPer(slip.periode)],
    ['No. Slip', slip.no_bukti || slip.id || '-']
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
  doc.text('Rincian bisyaroh :', left, y)
  y += 3

  const li = Array.isArray(slip.line_items) ? slip.line_items : []
  const bonusTotal = Number((slip.bonus_kehadiran || {}).total || 0)
  const body = li.map((it) => [
    String(it.label || 'Bisyaroh') + (it.lembaga && it.lembaga !== '-' ? ' (' + it.lembaga + ')' : ''),
    fmtRpStruk(it.nominal)
  ])
  if (bonusTotal > 0) body.push(['Bonus Kehadiran', fmtRpStruk(bonusTotal)])

  drawTable(doc, {
    startY: y,
    head: [['Keterangan', 'Nominal']],
    body,
    columnStyles: { 1: { halign: 'right', cellWidth: 38 } },
    styles: { fontSize: 9 }
  })

  let ty = doc.lastAutoTable ? doc.lastAutoTable.finalY : y
  ty += 6
  const rightX = pageW - 12
  const pemasukan = Number(slip.total_pemasukan || 0) ||
    (Number(slip.bisyaroh_pokok || 0) + Number(slip.bisyaroh_sekolah || 0) + Number(slip.bisyaroh_tambahan || 0) + bonusTotal)
  const potongan = Number(slip.total_potongan || 0)
  const take = Number(slip.take_home || 0) || (pemasukan - potongan)
  doc.setFontSize(10)
  const rowR = (label, val, bold) => {
    doc.setFont(font, bold ? 'bold' : 'normal')
    doc.text(label, rightX - 55, ty)
    doc.text(val, rightX, ty, { align: 'right' })
    ty += 5.5
  }
  rowR('Total Pemasukan', fmtNum(pemasukan))
  rowR('Potongan', (potongan > 0 ? '- ' : '') + fmtNum(potongan))
  rowR('Take Home Rp.', fmtNum(take), true)

  ty += 10
  doc.setFontSize(9)
  doc.setFont(font, 'normal')
  doc.text('Penerima,', left + 8, ty)
  doc.text('Bendahara,', pageW / 2 + 12, ty)
  ty += 20
  doc.text('( ' + String(slip.guru_nama || '').trim() + ' )', left + 4, ty)
  doc.text('( .......................... )', pageW / 2 + 8, ty)

  const safe = String(slip.guru_nama || 'guru').replace(/\s+/g, '_')
  savePdf(doc, 'slip_bisyaroh_' + safe + '_' + (slip.periode || '') + '.pdf', { preview })
  return doc
}

// ── 1d) PDF REKAP slip bisyaroh per bulan (landscape F4) — daftar semua slip + detail kolom ──
// v.95.0626: ekspor riwayat slip bisyaroh terfilter (per periode) ke 1 PDF tabel rinci + TOTAL.
export async function exportRekapBisyarohPdf(slips = [], settings = {}, periodeLabel = '') {
  const kop = buildKopFromSettings(settings)
  const doc = await createPdf({ kind: 'umum', orientation: 'l', format: 'F4' })
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, 'REKAP SLIP BISYAROH' + (periodeLabel ? ' — ' + periodeLabel : ''), { y: y + 7, size: 13 })
  y += 14

  const pokokOf = (s) => (Number(s.bisyaroh_pokok) || 0) + (Number(s.bisyaroh_sekolah) || 0) + (Number(s.bisyaroh_tambahan) || 0)
  const bonusOf = (s) => Number((s.bonus_kehadiran || {}).total || 0)
  const tunjOf = (s) => Array.isArray(s.tunjangan_list) ? s.tunjangan_list.reduce((a, t) => a + (Number(t.nominal) || 0), 0) : 0
  const potOf = (s) => Number(s.total_potongan) || 0
  const takeOf = (s) => Number(s.take_home) || 0

  const tot = { pokok: 0, bonus: 0, tunj: 0, pot: 0, take: 0 }
  const body = slips.map((s, i) => {
    tot.pokok += pokokOf(s); tot.bonus += bonusOf(s); tot.tunj += tunjOf(s); tot.pot += potOf(s); tot.take += takeOf(s)
    return [
      String(i + 1),
      s.guru_nama || '-',
      s.jabatan || '-',
      fmtRpStruk(pokokOf(s)),
      fmtRpStruk(bonusOf(s)),
      fmtRpStruk(tunjOf(s)),
      fmtRpStruk(potOf(s)),
      fmtRpStruk(takeOf(s))
    ]
  })
  body.push(['', 'TOTAL (' + slips.length + ' slip)', '', fmtRpStruk(tot.pokok), fmtRpStruk(tot.bonus), fmtRpStruk(tot.tunj), fmtRpStruk(tot.pot), fmtRpStruk(tot.take)])

  drawTable(doc, {
    startY: y,
    head: [['No', 'Nama', 'Jabatan', 'Bisyaroh Pokok', 'Bonus', 'Tunjangan', 'Potongan', 'Take Home']],
    body,
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      3: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' },
      6: { halign: 'right' }, 7: { halign: 'right', fontStyle: 'bold' }
    },
    styles: { fontSize: 8, cellPadding: 1.5 }
  })

  const safe = String(periodeLabel || 'semua').replace(/\s+/g, '_')
  savePdf(doc, 'rekap_bisyaroh_' + safe + '.pdf', { preview: true })
  return doc
}

// ── 1e) PDF slip TABUNGAN / UANG SAKU (setor/tarik) — layout SAMA dgn struk POS (cetakStrukSlipPdf) ──
// v.96.0626: disamakan persis dgn slip POS (KOP ringkas, kotak BUKTI kanan-atas, info 2 kolom,
//   rincian leader-titik, band total kanan, ttd Penyetor/Petugas). opts: { preview, saldo, santri, label }
//   label = 'TABUNGAN' | 'UANG SAKU'.
export async function cetakSlipTabunganPdf(mut = {}, settings = {}, { preview = true, saldo = null, santri = {}, label = 'TABUNGAN' } = {}) {
  const kop = buildKopFromSettings(settings)
  const num = (v, lo, hi, def) => { const n = parseFloat(v); return Number.isFinite(n) && n >= lo && n <= hi ? n : def }
  const slipW = num(settings.posStrukSlipW, 120, 260, 220)
  const slipH = num(settings.posStrukSlipH, 60, 230, 140)
  const topMm = num(settings.posStrukTopMm, 0, 140, 6)
  const doc = await createPdf({ kind: 'umum', orientation: slipW >= slipH ? 'l' : 'p', format: [slipW, slipH] })
  const font = doc._fontMU || 'helvetica'
  const left = 9
  const right = slipW - 9
  const dash = (pat) => { if (typeof doc.setLineDashPattern === 'function') doc.setLineDashPattern(pat || [], 0) }
  const isSetor = String(mut.jenis || 'setor').toLowerCase() === 'setor'
  const isUS = String(label).toUpperCase().includes('SAKU')
  const boxLabel = 'BUKTI ' + (isSetor ? 'SETOR ' : 'TARIK ') + label

  // ── Header teks RINGKAS + kotak BUKTI kanan-atas (sama dgn POS) ──
  let y = topMm + 4.5
  doc.setFont(font, 'bold'); doc.setFontSize(10)
  doc.text(String(kop.line1 || ''), left, y)
  let ky = y + 3.8
  if (kop.line2) { doc.setFont(font, 'bold'); doc.setFontSize(8.3); doc.text(String(kop.line2), left, ky); ky += 3.2 }
  doc.setFont(font, 'normal'); doc.setFontSize(7)
  for (const ln of [kop.line3, kop.line4, kop.line5].filter(Boolean)) { doc.text(String(ln), left, ky); ky += 2.9 }
  doc.setFont(font, 'bold'); doc.setFontSize(8)
  const bw = doc.getTextWidth(boxLabel) + 6
  const bh = 7
  const bx = right - bw
  const by = y - 3.8
  dash([0.7, 0.5]); doc.setLineWidth(0.3)
  doc.rect(bx, by, bw, bh)
  dash(null)
  doc.text(boxLabel, bx + bw / 2, by + 4.6, { align: 'center' })
  const hy = Math.max(ky - 1.4, by + bh) + 1.6
  doc.setLineWidth(0.5); doc.line(left, hy, right, hy)
  y = hy + 4.2

  // ── Info 2 kolom (Kelas bold; Terbilang kiri; Petugas kanan) ──
  doc.setFont(font, 'normal'); doc.setFontSize(8.3)
  const colMid = slipW / 2 + 8
  const nama = mut.nama_cache || santri.nama || '-'
  const nis = santri.nis || mut.santri_nis || '-'
  const kelas = [santri.lembaga_sekolah, santri.kelas_sekolah].filter(Boolean).join(' ') || [santri.lembaga, santri.kelas].filter(Boolean).join(' ') || '-'
  const petugas = mut.operator || mut.petugas || '-'
  // v.96.0626: nasabah — setor = nama walisantri; tarik = nama santri
  const waliName = santri.wali || santri.nama_wali || santri.nama_ayah || (santri.ayah && santri.ayah.nama) || ''
  const nasabah = isSetor ? waliName : (santri.nama || nama)
  const terb = terbilangRupiah(mut.nominal)
  const tglFmt = formatTglDdMmYyyy(mut.tanggal)
  const leftRows = [
    ['Diterima dari', nama],
    ['NIS', nis],
    ['__KELAS__', kelas],
    ['Terbilang', terb]
  ]
  const rightRows = [
    ['Tanggal', tglFmt],
    ['No. Transaksi', mut.no_bukti || mut.id || '-'],
    ['Metode', 'TUNAI']
  ]
  const yStart = y
  const rowH = 4.2
  const labelW = 22
  for (let i = 0; i < leftRows.length; i++) {
    const ry = yStart + i * rowH
    if (leftRows[i][0] === '__KELAS__') {
      doc.setFont(font, 'normal')
      doc.text('Kelas', left, ry)
      doc.text(':', left + labelW, ry)
      doc.setFont(font, 'bold')
      doc.text(String(leftRows[i][1]), left + labelW + 2.5, ry)
    } else {
      doc.setFont(font, 'normal')
      doc.text(leftRows[i][0], left, ry)
      doc.text(': ' + String(leftRows[i][1]), left + labelW, ry)
    }
  }
  for (let i = 0; i < rightRows.length; i++) {
    const ry = yStart + i * rowH
    doc.setFont(font, 'normal')
    doc.text(rightRows[i][0], colMid, ry)
    doc.text(': ' + String(rightRows[i][1]), colMid + 19, ry)
  }
  y = yStart + leftRows.length * rowH + 2.8

  // ── Rincian (1 baris: setoran/penarikan + nominal, leader titik) ──
  doc.setFont(font, 'normal'); doc.setFontSize(8.3)
  doc.text('Dengan rincian sebagai berikut :', left, y)
  y += 4.8
  doc.setFontSize(8.6)
  const ketr = (isSetor ? 'Setoran ' : 'Penarikan ') + (isUS ? 'uang saku' : 'tabungan') + (mut.catatan ? ' (' + mut.catatan + ')' : '')
  const amt = 'Rp. ' + fmtNum(mut.nominal)
  doc.text('1.', left, y)
  doc.text(ketr, left + 5.5, y)
  doc.text(amt, right, y, { align: 'right' })
  const ne = left + 5.5 + doc.getTextWidth(ketr) + 2
  const as = right - doc.getTextWidth(amt) - 2
  if (as > ne) { dash([0.4, 0.7]); doc.setLineWidth(0.2); doc.line(ne, y - 0.8, as, y - 0.8); dash(null) }
  y += 4.4 + 0.8
  doc.setLineWidth(0.5); doc.line(left, y, right, y)
  y += 5

  // ── Footer: Penyetor/Pengambil + Petugas + band total kanan ──
  doc.setFontSize(8.6)
  const c1 = left + 26
  const c2 = slipW / 2 - 8
  doc.setFont(font, 'normal')
  doc.text(isSetor ? 'Nasabah (Penyetor),' : 'Nasabah (Penarik),', c1, y, { align: 'center' })
  doc.text('Penerima,', c2, y, { align: 'center' })
  const totLabelX = slipW / 2 + 16
  let ty = y
  const rowR = (lbl, val, bold) => {
    doc.setFont(font, bold ? 'bold' : 'normal')
    doc.text(lbl, totLabelX, ty)
    doc.text(val, right, ty, { align: 'right' })
    ty += 4.5
  }
  rowR('Jumlah Rp.', fmtNum(mut.nominal), true)
  if (saldo != null) rowR('Saldo Akhir Rp.', fmtNum(saldo))
  doc.setFont(font, 'normal')
  const sy = y + 14
  doc.text('( ' + (nasabah || '..................') + ' )', c1, sy, { align: 'center' })
  doc.text('( ' + (petugas && petugas !== '-' ? petugas : '') + ' )', c2, sy, { align: 'center' })

  const safe = String(nama).replace(/\s+/g, '_')
  savePdf(doc, 'slip_' + (isUS ? 'uangsaku' : 'tabungan') + '_' + safe + '_' + (mut.tanggal || '') + '.pdf', { preview })
  return doc
}

// ── 1g) HTML slip (CETAK LANGSUNG dot-matrix) ───────────────────────────────────
// v.96.0626: cetak PDF lewat Electron TAK ANDAL di dot-matrix (kosong / teks jadi KOTAK abu —
//   plugin PDF Chrome gagal di-raster di window print). Cetak langsung kini pakai HTML (teks
//   dirender engine browser = pasti keluar, tajam) via IPC print:struk. Layout disamakan dgn slip PDF
//   / contoh struk: KOP, kotak BUKTI kanan-atas, info 2 kolom, rincian, Jumlah, ttd. Preview/unduh tetap PDF.
function slipDims(settings = {}) {
  const num = (v, lo, hi, def) => { const n = parseFloat(v); return Number.isFinite(n) && n >= lo && n <= hi ? n : def }
  return {
    W: num(settings.posStrukSlipW, 120, 260, 220),
    H: num(settings.posStrukSlipH, 60, 230, 140),
    top: num(settings.posStrukTopMm, 0, 140, 6)
  }
}
// ukuran halaman (microns) utk opsi print Electron — dipanggil view yg cetak HTML slip.
export function slipPageSizeMicrons(settings = {}) {
  const d = slipDims(settings)
  return { width: Math.round(d.W * 1000), height: Math.round(d.H * 1000) }
}
function infoRowsHtml(rows) {
  return (rows || []).filter(Boolean).map(([k, v]) =>
    `<div class="r"><span class="l">${escapeHtml(k)}</span><span class="c">:</span><span class="v">${escapeHtml(String(v == null ? '' : v))}</span></div>`
  ).join('')
}
function slipShellHtml({ settings = {}, boxLabel = '', infoLeft = [], infoRight = [], midHtml = '', footHtml = '' }) {
  const kop = buildKopFromSettings(settings)
  const { top } = slipDims(settings)
  const kopRest = [kop.line3, kop.line4, kop.line5].filter(Boolean).map((l) => `<div class="ks">${escapeHtml(l)}</div>`).join('')
  // v.96.0626: size:auto + width:100% → IKUTI ukuran kertas driver (form "Slip Ammu"), bukan paksa mm sendiri.
  //   Ini mencegah driver menengahkan konten (blank di atas). Konten mengalir dari atas kertas.
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Slip</title><style>'
    + '@page{size:auto;margin:0}'
    + '*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
    + 'html,body{margin:0;padding:0}'
    + 'body{font-family:Arial,Helvetica,sans-serif;color:#000;font-size:13pt;line-height:1.34;font-weight:700}'
    + `.slip{width:100%;padding:${top}mm 7mm 3mm 7mm;position:relative}`
    + '.k1{font-weight:bold;font-size:17.5pt;line-height:1.08}'
    + '.k2{font-weight:bold;font-size:13pt}'
    + '.ks{font-size:10pt;font-weight:normal;line-height:1.25}'
    + `.box{position:absolute;top:${top}mm;right:7mm;border:2px solid #000;padding:3px 10px;font-weight:bold;font-size:11pt;text-align:center;line-height:1.15}`
    + '.hr{border-top:2px solid #000;margin:2mm 0 1.6mm}'
    + '.info{display:flex;gap:5mm}'
    + '.info .col{flex:1}'
    + '.r{display:flex;align-items:baseline;margin:0.3mm 0}'
    + '.r .l{width:28mm;flex:none}'
    + '.r .c{width:3mm;flex:none}'
    + '.r .v{flex:1}'
    + '.hdr{margin:0.4mm 0 1mm}'
    + '.item{display:flex;justify-content:space-between;gap:4mm;margin:0.2mm 0}'
    + '.item .amt{white-space:nowrap}'
    + '.foot{display:flex;align-items:flex-end;gap:3mm;margin-top:2.5mm}'
    + '.sign{width:33mm;text-align:center}'
    + '.sign .sp{height:12mm}'
    + '.tot{margin-left:auto;text-align:right;min-width:54mm}'
    + '.tot .tr{display:flex;justify-content:space-between;gap:6mm;margin:0.3mm 0}'
    + '.tot .big{font-weight:bold;font-size:15.5pt}'
    + '</style></head><body><div class="slip">'
    + `<div class="k1">${escapeHtml(kop.line1 || '')}</div>`
    + (kop.line2 ? `<div class="k2">${escapeHtml(kop.line2)}</div>` : '')
    + kopRest
    + `<div class="box">${escapeHtml(boxLabel)}</div>`
    + '<div class="hr"></div>'
    + `<div class="info"><div class="col">${infoRowsHtml(infoLeft)}</div><div class="col">${infoRowsHtml(infoRight)}</div></div>`
    + '<div class="hr"></div>'
    + `<div class="mid">${midHtml}</div>`
    + '<div class="hr"></div>'
    + `<div class="foot">${footHtml}</div>`
    + '</div></body></html>'
}
// Slip TABUNGAN / UANG SAKU (setor/tarik)
export function buildSlipTabunganHtml(mut = {}, settings = {}, { saldo = null, santri = {}, label = 'TABUNGAN' } = {}) {
  const isSetor = String(mut.jenis || 'setor').toLowerCase() === 'setor'
  const isUS = String(label).toUpperCase().includes('SAKU')
  const nama = mut.nama_cache || santri.nama || '-'
  const nis = santri.nis || mut.santri_nis || '-'
  const kelas = [santri.lembaga_sekolah, santri.kelas_sekolah].filter(Boolean).join(' ') || [santri.lembaga, santri.kelas].filter(Boolean).join(' ') || '-'
  const petugas = mut.operator || mut.petugas || '-'
  // v.96.0626: nasabah — setor = nama walisantri; tarik = nama santri
  const waliName = santri.wali || santri.nama_wali || santri.nama_ayah || (santri.ayah && santri.ayah.nama) || ''
  const nasabah = isSetor ? waliName : (santri.nama || nama)
  const ket = (isSetor ? 'Setoran ' : 'Penarikan ') + (isUS ? 'uang saku' : 'tabungan') + (mut.catatan ? ' (' + mut.catatan + ')' : '')
  const midHtml = '<div class="hdr">Dengan rincian sebagai berikut :</div>'
    + `<div class="item"><span>1. ${escapeHtml(ket)}</span><span class="amt">Rp. ${fmtNum(mut.nominal)}</span></div>`
  const totRows = [['Jumlah Rp.', fmtNum(mut.nominal), true]]
  if (saldo != null) totRows.push(['Saldo Akhir Rp.', fmtNum(saldo), false])
  const totHtml = totRows.map(([l, v, b]) => `<div class="tr${b ? ' big' : ''}"><span>${escapeHtml(l)}</span><span>${escapeHtml(v)}</span></div>`).join('')
  const footHtml =
    `<div class="sign">${isSetor ? 'Nasabah (Penyetor),' : 'Nasabah (Penarik),'}<div class="sp"></div>( ${escapeHtml(nasabah || '.......... ')} )</div>`
    + `<div class="sign">Penerima,<div class="sp"></div>( ${escapeHtml(petugas && petugas !== '-' ? petugas : '')} )</div>`
    + `<div class="tot">${totHtml}</div>`
  return slipShellHtml({
    settings,
    boxLabel: 'BUKTI ' + (isSetor ? 'SETOR ' : 'TARIK ') + label,
    infoLeft: [['Diterima dari', nama], ['NIS', nis], ['Kelas', kelas], ['Terbilang', terbilangRupiah(mut.nominal)]],
    infoRight: [['Tanggal', formatTglDdMmYyyy(mut.tanggal)], ['No. Transaksi', mut.no_bukti || mut.id || '-'], ['Metode', 'TUNAI']],
    midHtml,
    footHtml
  })
}
// Slip PEMBAYARAN POS (struk pembayaran santri)
export function buildStrukSlipHtml(trx = {}, settings = {}) {
  const items = Array.isArray(trx.items) ? trx.items : []
  const itemsHtml = items.length
    ? items.map((it, i) => {
        const name = (it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : '')
        return `<div class="item"><span>${i + 1}. ${escapeHtml(name)}</span><span class="amt">Rp. ${fmtNum(it.nominal)}</span></div>`
      }).join('')
    : '<div class="item"><span>&mdash;</span><span></span></div>'
  const midHtml = '<div class="hdr">Dengan rincian pembayaran sebagai berikut :</div>' + itemsHtml
  const totRows = [['Jumlah Rp.', fmtNum(trx.total), true]]
  if (trx.bayar != null) totRows.push(['Pembayaran Rp.', fmtNum(trx.bayar), false])
  if (trx.kembali != null) totRows.push(['Kembali Rp.', fmtNum(trx.kembali), false])
  const totHtml = totRows.map(([l, v, b]) => `<div class="tr${b ? ' big' : ''}"><span>${escapeHtml(l)}</span><span>${escapeHtml(v)}</span></div>`).join('')
  const footHtml =
    `<div class="sign">Penyetor,<div class="sp"></div>( ${escapeHtml(String(trx.penyetor || '').trim())} )</div>`
    + `<div class="sign">Penerima,<div class="sp"></div>( ${escapeHtml(trx.operator || '')} )</div>`
    + `<div class="tot">${totHtml}</div>`
  return slipShellHtml({
    settings,
    boxLabel: 'BUKTI PEMBAYARAN',
    infoLeft: [['Diterima dari', trx.santri_nama || '-'], ['NIS', trx.santri_nis || '-'], ['Kelas', kelasFull(trx)], ['Terbilang', trx.terbilang || terbilangRupiah(trx.total)]],
    infoRight: [['Tgl. Bayar', formatTglDdMmYyyy(trx.tanggal)], ['No. Transaksi', trx.no_struk || '-'], ['Metode', trx.metode || 'TUNAI']],
    midHtml,
    footHtml
  })
}

// ── 1f) PDF REKAP TABUNGAN (saldo per santri) ──
export async function exportRekapTabunganPdf(items = [], settings = {}, { title = 'REKAP TABUNGAN', namaOf = null } = {}) {
  const kop = buildKopFromSettings(settings)
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, title, { y: y + 7, size: 13 })
  y += 14
  let tot = 0
  const body = items.map((t, i) => {
    const s = Number(t.saldo) || 0
    tot += s
    return [String(i + 1), (namaOf ? namaOf(t) : (t.nama_cache || t.santri_id || '-')), t.terakhir_update || '-', fmtRpStruk(s)]
  })
  body.push(['', 'TOTAL (' + items.length + ' santri)', '', fmtRpStruk(tot)])
  drawTable(doc, {
    startY: y,
    head: [['No', 'Nama', 'Update Terakhir', 'Saldo']],
    body,
    columnStyles: { 0: { halign: 'center', cellWidth: 12 }, 3: { halign: 'right', fontStyle: 'bold' } },
    styles: { fontSize: 9 }
  })
  savePdf(doc, 'rekap_tabungan_' + Date.now() + '.pdf', { preview: true })
  return doc
}

// ── 2) Dot-matrix / thermal (teks fixed-width, paper-aware) ──
const PAPER = {
  '9.5': { cols: 80, pageCss: '@page { size: 241mm 279mm; margin: 5mm 5mm; } body { font-size: 17px; font-weight: 700; color: #000; letter-spacing: 0.3px; }' }, // 9.5x11 inci; font 17px = 80 kolom mengisi penuh lebar 9.5"
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

  // v.95.0626: "BUKTI PEMBAYARAN" dalam kotak (kanan atas, sejajar nama yayasan) — match struk asli
  const tb = ['+------------------+', '| BUKTI PEMBAYARAN |', '+------------------+']
  const boxAt = W - tb[0].length // v.95.0626: BUKTI box rata kanan (pojok kanan-atas) — match gambar 2
  const kopBox = (left, box) => padR(String(left), boxAt) + box
  out.push(kopBox('', tb[0]))
  out.push(kopBox(kopL[0] || '', tb[1]))
  out.push(kopBox(kopL[1] || '', tb[2]))
  for (let i = 2; i < kopL.length; i++) out.push(kopL[i])
  out.push(repCh('-', W))

  const tglFmt = formatTglDdMmYyyy(trx.tanggal)
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const ml = [
    ['Diterima dari', trx.santri_nama || '-'],
    ['NIS', trx.santri_nis || '-'],
    ['Kelas', kelasFull(trx)]
  ]
  const mr = [
    ['Tgl. Bayar', tglFmt],
    ['No. Transaksi', trx.no_struk || '-'],
    ['Metode', trx.metode || 'TUNAI']
  ]
  const rows = Math.max(ml.length, mr.length)
  const LW = 13
  for (let i = 0; i < rows; i++) {
    const l = ml[i] ? metaLine(ml[i][0], ml[i][1], LW) : ''
    const r = mr[i] ? metaLine(mr[i][0], mr[i][1], LW) : ''
    out.push(col2(l, r, W, HALF))
  }
  out.push(metaLine('Terbilang', terb, 13))
  out.push('Dengan rincian pembayaran sebagai berikut :')

  let i = 0
  for (const it of trx.items || []) {
    i++
    const label =
      ' ' + String(i).padStart(2, ' ') + '. ' +
      (it.jenis || '-') +
      (it.keterangan ? ' (' + it.keterangan + ')' : '')
    const val = 'Rp. ' + fmtNum(it.nominal)
    out.push(lr(label, val, W))
  }
  out.push(repCh('-', W))

  // v.95.0626: bawah ala gambar 2 — Penyetor | Penerima | (Jumlah/Pembayaran/Kembali) satu band, ringkas
  const penyetorWide = String(trx.penyetor || '').trim()
  const C2 = 26 // kolom mulai blok Penerima
  const C3 = 50 // kolom mulai blok total (kanan)
  const cell = (str, wd) => { str = String(str); return str.length >= wd ? str.slice(0, wd) : str + ' '.repeat(wd - str.length) }
  const totRow = (label, val) => lr(label + ' Rp.', fmtNum(val), W - C3)
  const sigName = (n) => '( ' + (n ? String(n) : '..................') + ' )'
  out.push(cell(center('Penyetor,', C2), C2) + cell(center('Penerima,', C3 - C2), C3 - C2) + totRow('Jumlah', trx.total))
  out.push(cell('', C2) + cell('', C3 - C2) + totRow('Pembayaran', trx.bayar))
  out.push(cell('', C2) + cell('', C3 - C2) + totRow('Kembali', trx.kembali))
  out.push(cell(center(sigName(penyetorWide), C2), C2) + cell(center(sigName(trx.operator), C3 - C2), C3 - C2))
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
  const lk = kelasFull(trx)
  if (lk) out.push('Kelas : ' + lk)
  out.push('Kasir : ' + (trx.operator || '-'))
  // v.94.0626: nama penyetor (wali) auto-isi bila ada
  if (String(trx.penyetor || '').trim()) out.push('Wali  : ' + clip(String(trx.penyetor).trim(), w - 8))
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
    ' body { font-family: "Courier New", monospace; white-space: pre; line-height: 1.3; margin: 0; padding: 2px 4px; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
  w.document.write(
    paper.cols >= 60
      ? buildStrukHtmlWide(trx, settings)
      : '<!DOCTYPE html><html><head><title>Struk</title><style>' + css +
        '</style></head><body>' + escapeHtml(text) + '</body></html>'
  )
  w.document.close()
  w.focus()
  setTimeout(function () { try { w.print() } catch (e) {} }, 350)
}

// v.07.0626: build HTML struk untuk SILENT print (Electron desktop, tanpa dialog)
function _row(label, val) {
  return '<tr><td style="vertical-align:top;white-space:nowrap;padding:1px 0;">' + escapeHtml(label) +
    '</td><td style="vertical-align:top;padding:1px 0 1px 6px;">: ' + escapeHtml(String(val == null ? '' : val)) + '</td></tr>'
}
// v.95.0626: STRUK LEBAR (9.5") gaya struk lama — tabel + garis tipis + kotak BUKTI + font proporsional.
export function buildStrukHtmlWide(trx, s = {}) {
  const kop1 = String(s.kopLine1 || 'YAYASAN MAMBAUL ULUM')
  const kop2 = String(s.kopLine2 || '')
  const addr = [s.kopLine3, s.kopLine4, s.kopLine5].filter(Boolean)
  const tgl = formatTglDdMmYyyy(trx.tanggal)
  const terb = trx.terbilang || terbilangRupiah(trx.total)
  const kelas = kelasFull(trx)
  const penyetor = String(trx.penyetor || '').trim()
  const items = (trx.items || [])
    .map((it, i) =>
      '<tr><td style="vertical-align:top;padding:2px 4px;width:22px;">' + (i + 1) + '.</td>' +
      '<td style="vertical-align:top;padding:2px 4px;">' + escapeHtml(clip(String(it.jenis || '-') + (it.keterangan ? ' (' + it.keterangan + ')' : ''), 58)) + '</td>' +
      '<td style="vertical-align:top;padding:2px 4px;text-align:right;white-space:nowrap;">Rp. ' + fmtNum(it.nominal) + '</td></tr>'
    )
    .join('')
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Struk</title><style>' +
    '@page{size:241mm 139mm;margin:0;}*{box-sizing:border-box;}' +
    'body{font-family:Arial,Helvetica,sans-serif;font-size:12pt;line-height:1.45;color:#000;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}' +
    'table{border-collapse:collapse;width:100%;}.sheet{width:182mm;margin:6mm 0 6mm 12mm;}.rule{border-top:1.5px solid #000;margin:5px 0;}' +
    '</style></head><body><div class="sheet">' +
    '<table><tr><td style="vertical-align:top;">' +
      '<div style="font-weight:bold;font-size:12pt;">' + escapeHtml(kop1) + '</div>' +
      (kop2 ? '<div style="font-size:10pt;">' + escapeHtml(kop2) + '</div>' : '') +
      addr.map((a) => '<div style="font-size:9pt;">' + escapeHtml(a) + '</div>').join('') +
    '</td><td style="vertical-align:top;text-align:right;white-space:nowrap;width:1%;">' +
      '<span style="border:1.5px dashed #000;padding:4px 14px;font-weight:bold;display:inline-block;">BUKTI PEMBAYARAN</span>' +
    '</td></tr></table>' +
    '<div class="rule"></div>' +
    '<table><tr><td style="vertical-align:top;width:56%;"><table>' +
      _row('Diterima dari', trx.santri_nama || '-') +
      _row('NIS', trx.santri_nis || '-') +
      '<tr><td style="vertical-align:top;white-space:nowrap;padding:1px 0;">Kelas</td>' +
      '<td style="vertical-align:top;padding:1px 0 1px 6px;">: ' + escapeHtml(kelas) +
      ' &nbsp;&nbsp;&nbsp;&nbsp;Status Siswa : ' + escapeHtml(trx.status_siswa || 'Aktif') + '</td></tr>' +
      _row('Terbilang', terb) +
    '</table></td><td style="vertical-align:top;"><table>' +
      _row('Tgl. Bayar', tgl) +
      _row('No. Transaksi', trx.no_struk || '-') +
      _row('Metode', trx.metode || 'TUNAI') +
      _row('Petugas', trx.operator || '-') +
    '</table></td></tr></table>' +
    '<div class="rule"></div>' +
    '<div style="margin:2px 0;">Dengan rincian pembayaran sebagai berikut :</div>' +
    '<table>' + items + '</table>' +
    '<div class="rule"></div>' +
    '<table style="margin-top:7px;"><tr>' +
      '<td style="width:34%;text-align:center;vertical-align:top;">Penyetor,<div style="height:20px;"></div>( ' + (penyetor ? escapeHtml(penyetor) : '&nbsp;..........&nbsp;') + ' )</td>' +
      '<td style="width:34%;text-align:center;vertical-align:top;">Penerima,<div style="height:16px;"></div>( ' + escapeHtml(String(trx.operator || '')) + ' )</td>' +
      '<td style="vertical-align:top;"><table>' +
        '<tr><td style="text-align:right;font-weight:bold;padding:1px 0;">Jumlah Rp.</td><td style="text-align:right;font-weight:bold;white-space:nowrap;padding:1px 0 1px 10px;">' + fmtNum(trx.total) + '</td></tr>' +
        '<tr><td style="text-align:right;padding:1px 0;">Pembayaran Rp.</td><td style="text-align:right;white-space:nowrap;padding:1px 0 1px 10px;">' + fmtNum(trx.bayar) + '</td></tr>' +
        '<tr><td style="text-align:right;padding:1px 0;">Kembali Rp.</td><td style="text-align:right;white-space:nowrap;padding:1px 0 1px 10px;">' + fmtNum(trx.kembali) + '</td></tr>' +
      '</table></td></tr></table>' +
    '</div></body></html>'
}

export function buildStrukHtml(trx, settings = {}) {
  const paper = paperFromSettings(settings)
  if (paper.cols >= 60) return buildStrukHtmlWide(trx, settings)
  const text = buildStrukText(trx, settings)
  const css = paper.pageCss +
    ' body { font-family: "Courier New", monospace; white-space: pre; line-height: 1.3; margin: 0; padding: 2px 4px; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
  return '<!DOCTYPE html><html><head><title>Struk</title><style>' + css +
    '</style></head><body>' + escapeHtml(text) + '</body></html>'
}

// v.95.0626: ESC/P raw bytes (base64) untuk Epson LX-310 dot-matrix — teks fixed-width + perintah
//   printer langsung (BUKAN render gambar). Set form-length via ESC C -> 1 slip per struk, ukuran
//   pas, tajam spt struk lama. settings.posStrukFormLines = jumlah baris 1 slip (default 33 = 5.5" @ 6 LPI).
export function buildStrukEscposBase64(trx, settings = {}) {
  const ESC = '\x1B'
  const text = buildStrukText(trx, settings) // 80-kolom fixed-width (sama dgn struk lama)
  let lines = parseInt(settings && settings.posStrukFormLines, 10)
  if (!(lines >= 6 && lines <= 127)) lines = 41 // 41 baris @ 8 LPI ~= 13cm (1 slip; setel ke tinggi kertas: cm x 3.15)
  let raw = ''
  raw += ESC + '@'                               // 1) reset/init printer
  raw += ESC + 'G'                               // 2) double-strike ON (lebih hitam utk 2-ply carbon)
  raw += ESC + '0'                               // 3) line spacing 1/8" (8 LPI) — rapat, muat slip pendek 12-14cm
  // 4) char pitch: DEFAULT 10 cpi (pica) — 80 kolom = 8" = ~203mm, mengisi penuh kertas ~210mm.
  //    settings.posStrukCpi = 10|12|15|17 (makin besar = makin kecil/rapat utk kertas sempit)
  const cpi = parseInt(settings && settings.posStrukCpi, 10)
  raw += cpi === 12 ? ESC + 'M' : cpi === 15 ? ESC + 'g' : cpi === 17 ? '\x0F' : ESC + 'P'
  // 4b) margin kiri = centering (geser konten ke kanan). settings.posStrukLeftCols (default 6; 0 = mepet kiri)
  const leftCols = parseInt(settings && settings.posStrukLeftCols, 10)
  const lm = leftCols >= 0 && leftCols <= 40 ? leftCols : 1 // default 1 kolom: 80 kol @10cpi=203mm hampir penuhi 210mm
  if (lm > 0) raw += ESC + 'l' + String.fromCharCode(lm)
  raw += ESC + 'C' + String.fromCharCode(lines)  // 5) page length = `lines` baris (panjang 1 slip)
  // 5b) margin atas (zona tak-tercetak printer). settings.posStrukTopLines (default 2 baris kosong)
  const topLines = parseInt(settings && settings.posStrukTopLines, 10)
  const tl = topLines >= 0 && topLines <= 12 ? topLines : 0 // default 0: printer dot-matrix biasanya sudah ada whitespace atas (~5cm)
  if (tl > 0) raw += '\r\n'.repeat(tl)
  raw += String(text).replace(/\r?\n/g, '\r\n')  // 6) isi struk, tiap baris diakhiri CR+LF
  raw += '\x0C'                                  // 7) form feed -> maju tepat ke slip berikutnya
  if (typeof btoa === 'function') return btoa(raw)
  return Buffer.from(raw, 'latin1').toString('base64')
}
