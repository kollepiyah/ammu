// jurnalPdf — PDF "Rekap Jurnal Pondok Laju" satu bulan (Kyai, 17 Nov 2026).
//
// Angkanya datang dari utils/jurnalRekap yang SAMA dengan yang dipajang di layar; berkas ini
// hanya menatanya di kertas. Jangan menghitung apa pun di sini — begitu PDF menghitung sendiri,
// kertas dan layar mulai berselisih dan tak ada yang tahu mana yang benar.
import {
  buildKopLembaga,
  createPdf,
  drawKopLetterhead,
  drawTitle,
  drawTable,
  lastTableY,
  savePdf
} from './pdfBuilder'
import { fmtTgl } from './format'

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

/** 'YYYY-MM' → 'November 2026'; bentuk lain dikembalikan apa adanya. */
export function labelBulan(bulan) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(bulan || ''))
  if (!m) return String(bulan || '')
  return `${BULAN_ID[Number(m[2]) - 1] || m[2]} ${m[1]}`
}

/** Baris tabel ringkasan per kelas. Dipisah supaya bisa diuji tanpa menyentuh jsPDF. */
export function barisKelasPdf(kelas = []) {
  return kelas.map((k, i) => [
    String(i + 1),
    k.guru || k.key || '—',
    k.juz ? `Juz ${k.juz}` : '-',
    String(k.nSantriKelas || 0),
    String(k.nSesi || 0),
    String(k.nHari || 0),
    k.awal || '-',
    k.akhir || '-',
    k.majuHalaman ? `${k.majuHalaman > 0 ? '+' : ''}${k.majuHalaman} hal` : '-'
  ])
}

/** Baris tabel rincian per sesi. `namaKelas` memetakan kelas_key → nama guru kelas. */
export function barisSesiPdf(sesi = [], namaKelas = {}) {
  return sesi.map((s, i) => [
    String(i + 1),
    fmtTgl(s.tanggal),
    s.sesiLabel || s.sesi || '',
    namaKelas[s.kelasKey] || s.kelasKey || '—',
    s.posisi || '-',
    String(s.nSantri || 0),
    s.pencatat || '-',
    s.catatan || '-'
  ])
}

/**
 * Cetak PDF rekap jurnal sebulan.
 * @param {object} rekap hasil `rekapJurnalBulan`
 * @param {object} [opt]
 * @param {object} [opt.settings] store settings (KOP)
 * @param {Array} [opt.lembagaList] `master/lembaga`.list — KOP lembaga PTPT bila ada
 * @param {string} [opt.pencetak] nama yang mencetak, ditulis di kaki
 * @param {boolean} [opt.preview=false] true → pratinjau, false → unduh
 * @returns {Promise<{doc: any, filename: string}>}
 */
export async function cetakRekapJurnalPdf(
  rekap,
  { settings = {}, lembagaList = [], pencetak = '', preview = false } = {}
) {
  const r = rekap || { sesi: [], kelas: [], total: {} }
  // Mendatar: tabel rincian punya delapan kolom, tegak membuat catatan tak terbaca.
  const doc = await createPdf({ kind: 'umum', orientation: 'l', format: 'F4' })
  const font = doc._fontMU || 'helvetica'
  const pageW = doc.internal.pageSize.getWidth()

  let y = await drawKopLetterhead(doc, buildKopLembaga(settings, lembagaList, 'PTPT'), { y: 10 })
  drawTitle(doc, 'REKAP JURNAL PONDOK LAJU', { y: y + 7, size: 13 })
  doc.setFont(font, 'normal')
  doc.setFontSize(10)
  doc.text(labelBulan(r.bulan), pageW / 2, y + 13, { align: 'center' })
  y += 19

  const t = r.total || {}
  doc.setFontSize(9)
  doc.text(
    [
      `${t.nSesi || 0} sesi tercatat`,
      `${t.nHari || 0} hari`,
      `${t.nKelasAktif || 0} kelas berjalan`,
      `${t.nKelasKosong || 0} kelas tanpa catatan`,
      `${t.nSantri || 0} santri`
    ].join(' · '),
    12,
    y
  )
  y += 5

  drawTable(doc, {
    startY: y,
    head: [
      ['#', 'Kelas (guru)', 'Juz', 'Santri', 'Sesi', 'Hari', 'Posisi awal', 'Posisi akhir', 'Maju']
    ],
    body: barisKelasPdf(r.kelas || []),
    styles: { fontSize: 8 },
    columnStyles: {
      0: { halign: 'center', cellWidth: 8 },
      3: { halign: 'center' },
      4: { halign: 'center' },
      5: { halign: 'center' },
      8: { halign: 'center' }
    }
  })

  const namaKelas = {}
  for (const k of r.kelas || []) namaKelas[k.key] = k.guru || k.key

  y = lastTableY(doc) + 8
  doc.setFont(font, 'bold')
  doc.setFontSize(10)
  doc.text('RINCIAN PER SESI', 12, y)
  doc.setFont(font, 'normal')

  drawTable(doc, {
    startY: y + 2,
    head: [['#', 'Tanggal', 'Sesi', 'Kelas', 'Posisi', 'Santri', 'Dicatat oleh', 'Catatan']],
    body: barisSesiPdf(r.sesi || [], namaKelas),
    styles: { fontSize: 8 },
    columnStyles: { 0: { halign: 'center', cellWidth: 8 }, 5: { halign: 'center' } }
  })

  if (pencetak) {
    const yy = Math.min(lastTableY(doc) + 8, doc.internal.pageSize.getHeight() - 8)
    doc.setFontSize(8)
    doc.text(`Dicetak oleh ${pencetak} · ${fmtTgl(new Date().toISOString().slice(0, 10))}`, 12, yy)
  }

  const filename = `Rekap-Jurnal-Pondok-Laju-${r.bulan || 'bulan'}.pdf`
  await savePdf(doc, filename, { preview })
  return { doc, filename }
}
