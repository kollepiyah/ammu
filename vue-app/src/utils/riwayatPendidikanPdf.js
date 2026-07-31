// riwayatPendidikanPdf.js — PDF RIWAYAT PENDIDIKAN santri LINTAS-LEMBAGA.
// v.1.2.6 (Kyai): satu santri = seluruh perjalanan (TPQ→Pra PTPT→PTPT→PPPH,
//   TK→…→SMP) dalam 1 file, dari `santri.riwayat_kenaikan` (kronologis) + ringkasan
//   lembaga yang punya jejak kartu (`santri.kartu_kenaikan`). Ekspor per-lembaga yang
//   lama (KartuKenaikan) tetap ada; ini pelengkapnya.
import { createPdf, drawKopLetterhead, drawTitle, drawTable, savePdf } from './pdfBuilder'
import { buildKopFromSettings } from './strukBuilder'
import { formatTanggal } from './format'

function _fmtTgl(t) {
  if (!t) return '-'
  const s = formatTanggal(t)
  return s || '-'
}

/**
 * Cetak PDF riwayat pendidikan 1 santri (semua lembaga).
 * @param {object} santri dokumen santri (butuh: nama, nis, lembaga, lembaga_sekolah,
 *   wali, data.tempat_lahir, data.tgl_lahir, riwayat_kenaikan[], kartu_kenaikan{})
 * @param {object} settings pengaturan (KOP)
 */
export async function cetakRiwayatPendidikanPdf(santri = {}, settings = {}) {
  const kop = buildKopFromSettings(settings)
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  const font = doc._fontMU || 'helvetica'
  let y = await drawKopLetterhead(doc, kop, { y: 10 })
  drawTitle(doc, 'RIWAYAT PENDIDIKAN SANTRI', { y: y + 7, size: 13 })
  y += 15

  // ── Identitas (2 kolom) ──
  doc.setFontSize(9)
  const pageW = doc.internal.pageSize.getWidth()
  const left = 12
  const colMid = pageW / 2 + 4
  const d = santri.data || {}
  const ttl = [d.tempat_lahir, d.tgl_lahir ? _fmtTgl(d.tgl_lahir) : ''].filter(Boolean).join(', ')
  const leftRows = [
    ['Nama', santri.nama || '-'],
    ['No. Induk', santri.nis || '-'],
    ['Tempat/Tgl Lahir', ttl || '-']
  ]
  const rightRows = [
    ['Lembaga Qiraati', santri.lembaga || '-'],
    ['Lembaga Sekolah', santri.lembaga_sekolah || '-'],
    ['Wali', santri.wali || '-']
  ]
  const yStart = y
  const rowH = 5
  for (let i = 0; i < leftRows.length; i++) {
    doc.setFont(font, 'normal')
    doc.text(leftRows[i][0], left, yStart + i * rowH)
    doc.text(': ' + String(leftRows[i][1]), left + 30, yStart + i * rowH)
  }
  for (let i = 0; i < rightRows.length; i++) {
    doc.setFont(font, 'normal')
    doc.text(rightRows[i][0], colMid, yStart + i * rowH)
    doc.text(': ' + String(rightRows[i][1]), colMid + 28, yStart + i * rowH)
  }
  y = yStart + Math.max(leftRows.length, rightRows.length) * rowH + 6

  // ── Tabel perjalanan (kronologis) ──
  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text('Perjalanan Kenaikan', left, y)
  y += 2
  const rk = (Array.isArray(santri.riwayat_kenaikan) ? [...santri.riwayat_kenaikan] : []).sort(
    (a, b) => String(a.tanggal || '').localeCompare(String(b.tanggal || ''))
  )
  const body = rk.map((r, i) => [
    String(i + 1),
    r.tanggal_display || _fmtTgl(r.tanggal),
    r.ke_lembaga || r.dari_lembaga || '-',
    r.ke_kelas || '-',
    [r.khotam_ke ? 'Khotam ke-' + r.khotam_ke : '', r.juz ? 'Juz ' + r.juz : '']
      .filter(Boolean)
      .join(' · ') || '-'
  ])
  if (!body.length) {
    body.push(['', '-', 'Belum ada riwayat kenaikan tercatat', '-', '-'])
  }
  drawTable(doc, {
    startY: y + 2,
    head: [['No', 'Tanggal', 'Lembaga', 'Kelas/Jenjang', 'Keterangan']],
    body,
    columnStyles: {
      0: { halign: 'center', cellWidth: 12 },
      1: { cellWidth: 34 }
    },
    styles: { fontSize: 9 }
  })

  // ── Ringkasan lembaga yang pernah ditempuh (dari jejak kartu_kenaikan) ──
  let ty = doc.lastAutoTable ? doc.lastAutoTable.finalY : y
  const lembagaJejak = Object.keys(santri.kartu_kenaikan || {}).filter(
    (k) => santri.kartu_kenaikan[k] && typeof santri.kartu_kenaikan[k] === 'object'
  )
  if (lembagaJejak.length) {
    ty += 8
    doc.setFont(font, 'bold')
    doc.setFontSize(9)
    doc.text('Lembaga yang pernah ditempuh: ', left, ty)
    doc.setFont(font, 'normal')
    const w = doc.getTextWidth('Lembaga yang pernah ditempuh: ')
    doc.text(lembagaJejak.join(', '), left + w, ty)
  }

  const safe = String(santri.nama || 'santri').replace(/\s+/g, '_')
  savePdf(doc, 'riwayat_pendidikan_' + safe + '.pdf', { preview: true })
  return doc
}
