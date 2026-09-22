// drawKopLetterhead — logo KOP yang gagal dimuat.
//
// Kyai, 22 Sep 2026: "prestasi PTPT, ekspor PDF tidak muncul logo KOP". `kop_logo` semua
// lembaga masih menunjuk Firebase Storage lama, yang sejak akun penagihannya nonaktif
// menjawab 402 untuk tiap berkas. Dua cacat yang ikut terlihat di PDF itu:
//   1. tak ada logo sama sekali, padahal logo pondok (Supabase) bisa dipakai;
//   2. teks kop tetap bergeser ke kanan seolah logonya ada — celah kosong di kiri kop.
// Yang dijaga tes ini: logo lembaga → cadangan pondok → tanpa logo (teks rapat kiri).
import { describe, it, expect, vi, beforeEach } from 'vitest'

const PNG = 'data:image/png;base64,AAAA'
const JAWABAN = {
  'https://firebase.mati/logo-ptpt.png': null, // imageToDataURL → null (HTTP 402)
  'https://supabase.hidup/logo-pondok.png': PNG,
  'https://salah.format/logo.svg': 'data:image/svg+xml;base64,PHN2Zz4=',
  'https://bukan.gambar/galat': 'data:text/html;base64,PGh0bWw+'
}
const imageToDataURL = vi.fn(async (url) => JAWABAN[url] ?? null)

vi.mock('@/services/pdf', () => ({
  imageToDataURL: (...a) => imageToDataURL(...a),
  jsPDFFromCDN: async () => null
}))
// Gambar kaligrafi muassis tak relevan di sini — tanpa gambar, baris 1 jatuh ke teks.
vi.mock('@/utils/kopMuassis', () => ({ muassisDataUrl: async () => null, MUASSIS_RATIO: 9 }))

const { drawKopLetterhead } = await import('@/utils/pdfBuilder')

/** Dokumen jsPDF tiruan: mencatat teks & gambar; SVG ditolak seperti jsPDF asli. */
function docTiruan() {
  const doc = {
    teks: [],
    gambar: [],
    internal: { pageSize: { getWidth: () => 330 } },
    setFont() {},
    setFontSize() {},
    setLineWidth() {},
    line() {},
    text(t, x, y) {
      doc.teks.push({ t: String(t), x, y })
    },
    addImage(data, fmt, x, y, w, h) {
      doc.gambar.push({ data, x, y, w, h })
    },
    getImageProperties(data) {
      if (!/^data:image\/(png|jpe?g)/.test(data)) throw new Error('Unsupported image type')
      return { width: 10, height: 10 }
    }
  }
  return doc
}

const KOP = { line1: 'YAYASAN', line2: 'PTPT MAMBAUL ULUM', line3: 'Jl. Kolonel Sugiono' }
const xBaris2 = (doc) => doc.teks.find((t) => t.t === 'PTPT MAMBAUL ULUM').x

beforeEach(() => imageToDataURL.mockClear())

describe('drawKopLetterhead — logo lembaga mati', () => {
  it('KUNCI: logo lembaga gagal → logo pondok (cadangan) yang tergambar', async () => {
    const doc = docTiruan()
    await drawKopLetterhead(doc, {
      ...KOP,
      logoUrl: 'https://firebase.mati/logo-ptpt.png',
      logoCadangan: 'https://supabase.hidup/logo-pondok.png'
    })
    expect(doc.gambar).toHaveLength(1)
    expect(doc.gambar[0].data).toBe(PNG)
    expect(xBaris2(doc)).toBe(40) // teks di kanan logo
  })

  it('KUNCI: tak satu pun logo termuat → teks rapat kiri, tanpa celah logo', async () => {
    const doc = docTiruan()
    await drawKopLetterhead(doc, { ...KOP, logoUrl: 'https://firebase.mati/logo-ptpt.png' })
    expect(doc.gambar).toHaveLength(0)
    expect(xBaris2(doc)).toBe(12)
  })

  it('logo lembaga yang hidup tetap menang atas cadangan', async () => {
    const doc = docTiruan()
    await drawKopLetterhead(doc, {
      ...KOP,
      logoUrl: 'https://supabase.hidup/logo-pondok.png',
      logoCadangan: 'https://firebase.mati/logo-ptpt.png'
    })
    expect(doc.gambar).toHaveLength(1)
    expect(imageToDataURL).toHaveBeenCalledTimes(1) // cadangan tak perlu diambil
  })

  it('jawaban yang bukan gambar (halaman galat) atau format yang ditolak jsPDF → cadangan', async () => {
    for (const rusak of ['https://bukan.gambar/galat', 'https://salah.format/logo.svg']) {
      const doc = docTiruan()
      await drawKopLetterhead(doc, {
        ...KOP,
        logoUrl: rusak,
        logoCadangan: 'https://supabase.hidup/logo-pondok.png'
      })
      expect(doc.gambar.map((g) => g.data)).toEqual([PNG])
    }
  })

  it('data URL langsung dipakai tanpa diambil', async () => {
    const doc = docTiruan()
    await drawKopLetterhead(doc, { ...KOP, logoUrl: PNG })
    expect(doc.gambar).toHaveLength(1)
    expect(imageToDataURL).not.toHaveBeenCalled()
  })

  it('PDF bersisi banyak bagian (per PJ) mengambil tiap URL SEKALI saja', async () => {
    const doc = docTiruan()
    const kop = {
      ...KOP,
      logoUrl: 'https://firebase.mati/logo-ptpt.png',
      logoCadangan: 'https://supabase.hidup/logo-pondok.png'
    }
    await drawKopLetterhead(doc, kop)
    await drawKopLetterhead(doc, kop)
    await drawKopLetterhead(doc, kop)
    expect(doc.gambar).toHaveLength(3)
    expect(imageToDataURL).toHaveBeenCalledTimes(2) // mati 1× + cadangan 1×
  })
})
