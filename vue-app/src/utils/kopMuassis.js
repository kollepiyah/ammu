// v.100: Baris PERTAMA semua KOP = gambar kaligrafi muassis (مؤسسة المنصور معهد منبع العلوم الأسلامى)
//   dari src/assets/muassis.png (3000×554 px). Dipakai oleh:
//     - raporPdf.drawKopRapor (KOP rapor, center)
//     - pdfBuilder.drawKopLetterhead (KOP umum semua PDF list/struk F4, kiri)
//     - strukBuilder cetakStrukSlipPdf/cetakSlipTabunganPdf (slip PDF) + slipShellHtml +
//       buildStrukHtmlWide (HTML silent print)
//     - escpImage.drawSlip (slip ESC/P raster canvas)
//     - receiptHtml.kopHtml (kwitansi HTML)
//     - RaporView (preview KOP di layar)
//   KOP berbasis TEKS murni (struk dot-matrix mode teks, XLSX/GSheet) TETAP pakai settings.kopLine1
//   (tidak bisa render gambar) — semua renderer di sini juga fallback ke kopLine1 bila gambar gagal.
import muassisUrl from '@/assets/muassis.png'
import { imageToDataURL } from '@/services/pdf'

export const MUASSIS_URL = muassisUrl
export const MUASSIS_RATIO = 3000 / 554 // lebar/tinggi asli ≈ 5.42 → tinggi = lebar / RATIO

let _dataUrl = null
let _loading = null
// dataURL (cached) — untuk jsPDF addImage & HTML print window (URL relatif tak andal di window cetak).
export function muassisDataUrl() {
  if (_dataUrl) return Promise.resolve(_dataUrl)
  if (!_loading) {
    _loading = imageToDataURL(muassisUrl)
      .then((d) => { _dataUrl = d || null; return _dataUrl })
      .catch(() => null)
  }
  return _loading
}
// Versi sinkron untuk builder HTML yang sinkron — null bila belum siap (fallback teks).
export function muassisDataUrlSync() { return _dataUrl }

let _img = null
// HTMLImageElement (cached) untuk canvas (escpImage) — null bila belum load (fallback teks).
export function muassisImageSync() {
  if (typeof Image === 'undefined') return null
  if (!_img) { _img = new Image(); _img.src = muassisUrl }
  return _img.complete && _img.naturalWidth > 0 ? _img : null
}

// Pre-warm saat modul dimuat (35KB) — builder sinkron tinggal pakai cache saat user mencetak.
muassisDataUrl()
muassisImageSync()
