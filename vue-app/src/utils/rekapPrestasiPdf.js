// rekapPrestasiPdf — menggambar PDF Rekap Prestasi bulanan ke sebuah dokumen jsPDF.
//
// v.1.4.5 · Kyai, 22 Sep 2026: *"saya ingin dikelompokkan perkelas (perguru) dan diurutkan
// dari total capaian terbanyak. saya ingin setiap kelas itu tabelnya terpisah dg kelas lain,
// dan ada keterangan rata2 capaian (persen). jadi berapa persen santri kelas tersebut
// memenuhi target."*
//
// Bentuk berkasnya:
//   bagian per PJ (halaman baru, kop, judul, target PJ + ringkasan keseluruhan)
//     └ SATU TABEL per kelas (guru) — judul kelas jadi baris kepala tabel itu sendiri,
//       jadi ia ikut terulang di halaman lanjutan dan tak pernah tertinggal sendirian di
//       dasar halaman; ringkasan persentasenya jadi baris kaki di halaman terakhir tabel.
//
// Isi (baris, urutan, kelompok, angka ringkasan) seluruhnya dari utils/rekapPrestasiTabel —
// berkas ini hanya menata letak. Dipisah dari RekapPrestasiView supaya bisa dijalankan
// dengan data contoh tanpa layar & tanpa login.
import { drawKopLetterhead, drawTitle, drawTable } from './pdfBuilder'
import {
  KOLOM_REKAP_PRESTASI,
  KOLOM_KETERANGAN,
  barisCetak,
  judulKelompok,
  teksRingkasan,
  teksRingkasanPj,
  teksTarget
} from './rekapPrestasiTabel'

const MARGIN_X = 12
const MARGIN_ATAS = 14
const MARGIN_BAWAH = 12
// Ruang minimum untuk memulai tabel baru: judul kelas + kepala kolom + satu baris.
const RUANG_MULAI_TABEL = 24
const JARAK_ANTAR_TABEL = 6
// Tinggi satu baris tabel (mm) pada huruf 9 pt + padding 1,5 mm — hanya untuk MEMUTUSKAN
// pindah halaman. Kalau perkiraannya meleset sedikit, autoTable tetap memotong dengan rapi.
const TINGGI_BARIS = 6.8

/**
 * Tabel kelas yang MUAT utuh di satu halaman jangan dipotong dua hanya karena sisa halaman
 * ini kurang beberapa baris — satu kelas yang terbelah memaksa pembaca membalik halaman
 * untuk membaca persentasenya. Tabel yang memang lebih panjang dari satu halaman tetap
 * dibiarkan bersambung (kepala tabelnya terulang).
 */
function perluHalamanBaru(startY, jumlahBaris, adaKaki, pageH) {
  const sisa = pageH - MARGIN_BAWAH - startY
  if (sisa < RUANG_MULAI_TABEL) return true
  const tinggi = (2 + jumlahBaris + (adaKaki ? 2 : 0)) * TINGGI_BARIS
  const muatSehalaman = tinggi <= pageH - MARGIN_BAWAH - MARGIN_ATAS
  return tinggi > sisa && muatSehalaman
}

const WARNA_STATUS = {
  tercapai: [21, 128, 61],
  minimal: [180, 83, 9],
  kurang: [185, 28, 28],
  kosong: [100, 116, 139]
}

/** Lebar kolom (mm) diskalakan penuh ke lebar halaman, sama seperti tabel lain di pdfBuilder. */
function gayaKolom(kolom, lebarTersedia) {
  const jumlahLebar = kolom.reduce((s, c) => s + c.lebar, 0)
  const skala = jumlahLebar > 0 ? lebarTersedia / jumlahLebar : 1
  return kolom.reduce((acc, c, i) => {
    acc[i] = { cellWidth: Math.round(c.lebar * skala * 100) / 100 }
    return acc
  }, {})
}

/** Teks rata tengah yang dibungkus bila melebihi lebar; mengembalikan y sesudahnya. */
function tulisTengah(doc, teks, y, { size = 9, bold = false, lebar } = {}) {
  const font = doc._fontMU || 'helvetica'
  doc.setFont(font, bold ? 'bold' : 'normal')
  doc.setFontSize(size)
  const baris = doc.splitTextToSize(String(teks), lebar)
  const pageW = doc.internal.pageSize.getWidth()
  const tinggi = size * 0.3528 * 1.25 // pt → mm, dengan jarak baris
  baris.forEach((b, i) => doc.text(b, pageW / 2, y + i * tinggi, { align: 'center' }))
  doc.setFont(font, 'normal')
  return y + (baris.length - 1) * tinggi
}

/**
 * Gambar seluruh rekap ke `doc`.
 *
 * @param {object} doc  dokumen dari pdfBuilder.createPdf.
 * @param {object} isi
 * @param {object} isi.kop        dari buildKopLembaga.
 * @param {string} isi.judul
 * @param {string} isi.subJudul
 * @param {Array}  isi.bagian     dari rekapPrestasiTabel.susunBagianEkspor.
 */
export async function gambarRekapPrestasi(doc, { kop, judul, subJudul, bagian }) {
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const lebar = pageW - MARGIN_X * 2

  let pertama = true
  for (const b of bagian || []) {
    if (!pertama) doc.addPage()
    pertama = false

    let y = await drawKopLetterhead(doc, kop, { y: 10 })
    drawTitle(doc, judul, { y: y + 8, size: 12 })
    y += 12
    drawTitle(doc, subJudul, { y: y + 4, size: 9 })
    y += 6
    if (b.pj) {
      drawTitle(doc, `PJ PTPT: ${b.pj} · ${b.jumlah} santri`, { y: y + 5, size: 10 })
      y += 7
    }
    if (b.target) {
      y = tulisTengah(doc, teksTarget(b.target), y + 4.5, { size: 9, bold: true, lebar })
      y = tulisTengah(doc, teksRingkasanPj(b.ringkasan, b.target), y + 4.5, { size: 8.5, lebar })
      y += 1
    }

    const kolom = b.target ? [...KOLOM_REKAP_PRESTASI, KOLOM_KETERANGAN] : KOLOM_REKAP_PRESTASI
    const idxKet = kolom.indexOf(KOLOM_KETERANGAN)
    const columnStyles = gayaKolom(kolom, lebar)

    let startY = y + 5
    for (const g of b.grup || []) {
      const cetak = barisCetak(g.rows, { target: b.target })
      const ring = b.target ? teksRingkasan(g.ringkasan, b.target) : null
      if (perluHalamanBaru(startY, cetak.length, !!ring, pageH)) {
        doc.addPage()
        startY = MARGIN_ATAS
      }
      const foot = ring
        ? [
            [{ content: ring.utama, colSpan: kolom.length, styles: { fontStyle: 'bold' } }],
            [{ content: ring.rinci, colSpan: kolom.length, styles: { fontStyle: 'normal' } }]
          ]
        : undefined

      drawTable(doc, {
        startY,
        head: [
          [
            {
              content: judulKelompok(g),
              colSpan: kolom.length,
              styles: {
                halign: 'left',
                fontSize: 10,
                fillColor: [220, 237, 229],
                textColor: [12, 74, 54]
              }
            }
          ],
          kolom.map((c) => c.header)
        ],
        body: cetak.map((r) => kolom.map((c) => String(r[c.key] ?? ''))),
        foot,
        showFoot: 'lastPage',
        footStyles: {
          fillColor: [241, 247, 244],
          textColor: 20,
          fontSize: 8.5,
          halign: 'left'
        },
        tableWidth: lebar,
        columnStyles,
        rowPageBreak: 'avoid',
        margin: { left: MARGIN_X, right: MARGIN_X, top: MARGIN_ATAS, bottom: MARGIN_BAWAH },
        didParseCell: (data) => {
          if (data.section !== 'body' || idxKet < 0 || data.column.index !== idxKet) return
          const warna = WARNA_STATUS[cetak[data.row.index]?.status]
          if (warna) {
            data.cell.styles.textColor = warna
            data.cell.styles.fontStyle = 'bold'
          }
        }
      })
      startY = doc.lastAutoTable.finalY + JARAK_ANTAR_TABEL
    }
  }
}
