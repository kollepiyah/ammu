// rekapIzinPdf.js — v.1.4.9: PDF "Rekap Riwayat Izin per Orang" (Kyai, 4 Nov 2026).
// Masukannya kelompok dari utils/izinStatus.rekapIzinPerOrang — PDF dan layar membaca
// kelompok yang sama, jadi angka hari di kertas = angka di layar.
import {
  buildKopFromSettings,
  createPdf,
  drawKopLetterhead,
  drawTitle,
  drawTable,
  savePdf
} from './pdfBuilder'
import { labelStatusIzin, statusIzin, shiftIzin } from './izinStatus'
import { formatTanggal } from './format'

const JENIS_LABEL = { izin: 'Izin', sakit: 'Sakit', cuti: 'Cuti' }

function _jenis(a, cutiKatNama) {
  const j = JENIS_LABEL[a?.jenis] || 'Izin'
  if (a?.jenis === 'cuti' && a?.kategori && typeof cutiKatNama === 'function')
    return `${j} (${cutiKatNama(a.kategori)})`
  return j
}

function _rentang(a) {
  const m = formatTanggal(a?.tgl_mulai)
  const s = a?.tgl_selesai && a.tgl_selesai !== a.tgl_mulai ? formatTanggal(a.tgl_selesai) : ''
  return s ? `${m} – ${s}` : m
}

function _shift(arr) {
  return (Array.isArray(arr) ? arr : [])
    .map((x) => String(x).charAt(0).toUpperCase() + String(x).slice(1))
    .join(', ')
}

/**
 * Baris tabel rincian satu orang. Kolom Jumlah ("2 hr / 4 sh") hanya terisi untuk pengajuan
 * DISETUJUI — sama dengan rekapIzinPerOrang. v.1.4.9 (Kyai): izin sering hanya satu shift,
 * jadi jumlah shift ikut ditulis, bukan hari saja.
 */
export function barisRincianIzin(items, { cutiKatNama, hitungHari } = {}) {
  const hari = typeof hitungHari === 'function' ? hitungHari : () => 1
  return (Array.isArray(items) ? items : []).map((a, i) => [
    String(i + 1),
    _jenis(a, cutiKatNama),
    _rentang(a),
    statusIzin(a) === 'disetujui' ? `${hari(a)} hr / ${hari(a) * shiftIzin(a).length} sh` : '-',
    _shift(shiftIzin(a)),
    [a?.keterangan, a?.catatan_putus].filter(Boolean).join(' — ') || '-',
    labelStatusIzin(a),
    a?.penyetuju || '-',
    a?.lampiran_url ? 'Ada' : '-'
  ])
}

/** Satu kalimat ringkasan per orang: "Izin 2 (3 shift / 2 hari disetujui) · …". */
export function ringkasanOrang(g) {
  const p = []
  for (const j of ['izin', 'sakit', 'cuti']) {
    if (g?.n?.[j])
      p.push(
        `${JENIS_LABEL[j]} ${g.n[j]} (${g.shift?.[j] || 0} shift / ${g.hari?.[j] || 0} hari disetujui)`
      )
  }
  if (g?.menunggu) p.push(`${g.menunggu} menunggu`)
  return p.join(' · ') || 'Tanpa pengajuan'
}

/**
 * Cetak PDF rekap. `groups` satu orang → judul memuat namanya dan tanpa tabel ringkasan;
 * lebih dari satu → tabel ringkasan semua orang lalu rincian per orang.
 * @returns {Promise<{doc:any, filename:string}>}
 */
export async function cetakRekapIzinPdf(
  groups,
  { settings = {}, tahun = '', cutiKatNama, hitungHari, pencetak = '', simpan = true } = {}
) {
  const list = Array.isArray(groups) ? groups : []
  const satu = list.length === 1
  const doc = await createPdf({ kind: 'umum', orientation: 'p', format: 'F4' })
  const font = doc._fontMU || 'helvetica'
  const pageH = doc.internal.pageSize.getHeight()
  const left = 12

  let y = await drawKopLetterhead(doc, buildKopFromSettings(settings), { y: 10 })
  drawTitle(doc, 'REKAP RIWAYAT PERIZINAN & CUTI', { y: y + 7, size: 13 })
  doc.setFontSize(10)
  const sub = [
    satu ? list[0].nama : `${list.length} orang`,
    tahun ? `Tahun ${tahun}` : 'Semua tahun'
  ]
  doc.text(sub.join(' · '), doc.internal.pageSize.getWidth() / 2, y + 13, { align: 'center' })
  y += 19

  if (!satu && list.length) {
    drawTable(doc, {
      startY: y,
      head: [
        ['No', 'Nama', 'Lembaga', 'Izin', 'Sakit', 'Cuti', 'Total Shift', 'Total Hari', 'Menunggu']
      ],
      body: list.map((g, i) => [
        String(i + 1),
        g.nama,
        g.lembaga || '-',
        String(g.shift?.izin || 0),
        String(g.shift?.sakit || 0),
        String(g.shift?.cuti || 0),
        String(g.totalShift || 0),
        String(g.totalHari || 0),
        String(g.menunggu || 0)
      ]),
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        3: { halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center' },
        6: { halign: 'center' },
        7: { halign: 'center' },
        8: { halign: 'center' }
      },
      styles: { fontSize: 8.5 }
    })
    doc.setFontSize(8)
    doc.setFont(font, 'italic')
    doc.text(
      'Izin/Sakit/Cuti = jumlah SHIFT yang disetujui (1 hari dengan 2 shift = 2). Total Hari = hari kalender.',
      left,
      doc.lastAutoTable.finalY + 4
    )
    doc.setFont(font, 'normal')
    y = doc.lastAutoTable.finalY + 10
  }

  for (const g of list) {
    // Judul orang + ringkasannya jangan tertinggal sendirian di dasar halaman.
    if (y > pageH - 45) {
      doc.addPage()
      y = 15
    }
    doc.setFont(font, 'bold')
    doc.setFontSize(10)
    doc.text(`${g.nama}${g.lembaga ? ' — ' + g.lembaga : ''}`, left, y)
    doc.setFont(font, 'normal')
    doc.setFontSize(8.5)
    doc.text(ringkasanOrang(g), left, y + 4.5)
    drawTable(doc, {
      startY: y + 7,
      head: [
        ['No', 'Jenis', 'Tanggal', 'Jumlah', 'Shift', 'Keterangan', 'Status', 'Penyetuju', 'Lamp.']
      ],
      body: barisRincianIzin(g.items, { cutiKatNama, hitungHari }),
      columnStyles: {
        0: { halign: 'center', cellWidth: 8 },
        1: { cellWidth: 22 },
        2: { cellWidth: 30 },
        3: { halign: 'center', cellWidth: 18 },
        4: { cellWidth: 20 },
        6: { cellWidth: 19 },
        7: { cellWidth: 25 },
        8: { halign: 'center', cellWidth: 11 }
      },
      styles: { fontSize: 7.5 }
    })
    y = doc.lastAutoTable.finalY + 9
  }

  // Jejak cetak di kaki halaman terakhir.
  doc.setFontSize(7.5)
  doc.setFont(font, 'italic')
  const kini = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
  doc.text(`Dicetak ${kini} WIB${pencetak ? ' oleh ' + pencetak : ''}`, left, pageH - 8)
  doc.setFont(font, 'normal')

  const bagianNama = satu
    ? String(list[0].nama || 'orang')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_')
    : 'Semua'
  const filename = `Rekap_Izin_${bagianNama}_${tahun || 'SemuaTahun'}.pdf`
  if (simpan) await savePdf(doc, filename)
  return { doc, filename }
}
