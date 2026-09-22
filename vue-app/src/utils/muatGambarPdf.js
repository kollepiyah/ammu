// muatGambarPdf.js — v.1.4.5: muat gambar untuk jsPDF dari beberapa kandidat URL.
//
// Dulu tiap pembuat PDF memilih URL-nya dengan rantai `a || b || c` SEBELUM ada yang
// dicoba dimuat. Begitu `kop_logo` lembaga (atau tanda tangan guru) masih menunjuk
// Firebase Storage lama — 402 sejak 22 Sep 2026 — URL mati itu memenangkan rantai lalu
// gagal diam-diam: rapor tercetak tanpa logo kanan, padahal logo pondok hidup di Supabase.
//
// Kembaran `_muatLogoKop` di pdfBuilder (drawKopLetterhead); keduanya sebaiknya
// disatukan ke sini begitu gelombang logo KOP v.1.4.5 ter-commit.
import { imageToDataURL } from '@/services/pdf'
import { urlBerkas } from './urlBerkas'

/**
 * Data URL gambar pertama yang benar-benar bisa DIGAMBAR jsPDF dari `kandidat` (urut
 * prioritas); null bila tak satu pun.
 *
 * - URL yang pasti mati (utils/urlBerkas) dilompati tanpa diambil.
 * - "Berhasil diambil" belum cukup: jawaban 200 berisi halaman galat, SVG, atau berkas
 *   rusak lolos fetch tapi melempar di addImage — maka diuji lewat getImageProperties.
 * - Hasil per URL disimpan di `doc`, jadi satu PDF tak mengambil gambar yang sama dua
 *   kali (logo pondok bisa jadi kandidat kiri DAN kanan).
 */
export async function muatGambarPertama(doc, kandidat = []) {
  if (!doc._gambarDimuat) doc._gambarDimuat = new Map()
  const cache = doc._gambarDimuat
  for (const u of kandidat) {
    const url = urlBerkas(u)
    if (!url) continue
    if (!cache.has(url)) {
      let data = null
      try {
        data = url.startsWith('data:') ? url : await imageToDataURL(url)
        if (data && typeof doc.getImageProperties === 'function') doc.getImageProperties(data)
      } catch {
        data = null
      }
      cache.set(url, data && /^data:image\//i.test(data) ? data : null)
    }
    if (cache.get(url)) return cache.get(url)
  }
  return null
}
