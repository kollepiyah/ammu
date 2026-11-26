// Isi bacaan Kitab & Wirid sebagai TEKS KAYA (Kyai 26 Nov 2026: "per baris, per kata bisa diedit —
// tebal, miring, warna", seperti editor SIAKAD). Satu bab = satu dokumen HTML dari editor Tiptap.
// Di sini: penyaring (satu-satunya pintu sebelum v-html), konversi bacaan lama, dan rapikan
// tampilan (syair bergantian, baris Arab otomatis). Murni selain DOMPurify/DOM — diuji di jsdom.
import DOMPurify from 'dompurify'

/** Gaya baris (kelas `gaya-…`). Tombol ع/A menyembunyikan latin/arti. */
export const GAYA_BARIS = Object.freeze([
  { kunci: '', label: 'Biasa' },
  { kunci: 'arab', label: 'Arab' },
  { kunci: 'latin', label: 'Latin' },
  { kunci: 'arti', label: 'Arti' },
  { kunci: 'judul', label: 'Judul' },
  { kunci: 'syair', label: 'Syair' }
])
/** Warna kata (kelas `warna-…`, didefinisikan di main.css untuk terang & gelap). */
export const WARNA_KATA = Object.freeze([
  { kunci: 'hijau', label: 'Hijau', contoh: '#0f766e' },
  { kunci: 'merah', label: 'Merah', contoh: '#be123c' },
  { kunci: 'biru', label: 'Biru', contoh: '#0369a1' },
  { kunci: 'emas', label: 'Emas', contoh: '#b45309' },
  { kunci: 'ungu', label: 'Ungu', contoh: '#6d28d9' }
])

const KELAS_SAH = new Set([
  ...GAYA_BARIS.filter((g) => g.kunci).map((g) => `gaya-${g.kunci}`),
  ...WARNA_KATA.map((w) => `warna-${w.kunci}`),
  'syair-awal',
  'syair-akhir'
])
const RATA_SAH = /^text-align:\s*(left|center|right|justify)\s*;?$/i
export const ARAB = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/

// Hanya kelas gaya/warna kita & rata teks yang boleh lewat — warna/ukuran tempelan Word dibuang.
function saringAtributAmalan(node, data) {
  if (data.attrName === 'class') {
    const sah = String(data.attrValue)
      .split(/\s+/)
      .filter((k) => KELAS_SAH.has(k))
    if (sah.length) data.attrValue = sah.join(' ')
    else data.keepAttr = false
  } else if (data.attrName === 'style') {
    const rata = String(data.attrValue)
      .split(';')
      .map((x) => x.trim())
      .find((x) => RATA_SAH.test(x))
    if (rata && node.nodeName === 'P') data.attrValue = rata.replace(/;?$/, ';')
    else data.keepAttr = false
  } else if (data.attrName === 'dir') {
    if (!/^(rtl|ltr|auto)$/.test(String(data.attrValue))) data.keepAttr = false
  }
}

/**
 * SATU-SATUNYA pintu sebelum isi bacaan ditampilkan / disimpan. Tag tak dikenal (gambar hiasan,
 * tabel, skrip) dibuang, teksnya tetap. Hook dipasang lokal lalu dilepas di finally agar tidak
 * memengaruhi pemanggil DOMPurify lain di masa depan.
 */
export function saringHtmlAmalan(html) {
  DOMPurify.addHook('uponSanitizeAttribute', saringAtributAmalan)
  try {
    return DOMPurify.sanitize(String(html || ''), {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'span', 'hr'],
      ALLOWED_ATTR: ['class', 'style', 'dir', 'data-gaya'],
      KEEP_CONTENT: true
    })
  } finally {
    DOMPurify.removeHook('uponSanitizeAttribute')
  }
}

/** Teks polos (untuk cek kosong & pratinjau). */
export function teksPolos(html) {
  const div = document.createElement('div')
  div.innerHTML = saringHtmlAmalan(html)
  return (div.textContent || '').replace(/\s+/g, ' ').trim()
}

/**
 * Rapikan HTML untuk layar baca: baris tanpa gaya yang berhuruf Arab → gaya-arab; baris syair
 * yang berurutan diberi syair-awal / syair-akhir bergantian (seperti cetakan Diba').
 */
export function rapikanTampilan(htmlAman) {
  const div = document.createElement('div')
  div.innerHTML = htmlAman
  let urut = 0
  for (const el of div.children) {
    if (el.tagName !== 'P') {
      urut = 0
      continue
    }
    const gaya = [...el.classList].find((k) => k.startsWith('gaya-'))
    if (!gaya && ARAB.test(el.textContent || '')) el.classList.add('gaya-arab')
    if (el.classList.contains('gaya-syair')) {
      el.classList.add(urut % 2 === 0 ? 'syair-awal' : 'syair-akhir')
      urut++
    } else urut = 0
    if (!el.getAttribute('dir')) el.setAttribute('dir', 'auto')
  }
  return div.innerHTML
}

const lolos = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
const baris = (teks, gaya, rata, warna) =>
  String(teks || '')
    .split('\n')
    .filter((t) => t.trim())
    .map(
      (t) =>
        `<p class="gaya-${gaya}"${rata ? ` style="text-align: ${rata};"` : ''}>${warna ? `<span class="warna-${warna}">${lolos(t)}</span>` : lolos(t)}</p>`
    )
    .join('')
const RATA_LAMA = { kanan: 'right', tengah: 'center', kiri: 'left' }

/** Bagian bentuk lama (blok teks/judul/syair/pemisah) → HTML editor. Tak ada data yang hilang. */
export function bagianKeHtml(bagian) {
  return (Array.isArray(bagian) ? bagian : [])
    .map((b) => {
      if (b?.jenis === 'pemisah') return '<hr>'
      const rata = RATA_LAMA[b?.rata] || ''
      let out = ''
      if (b?.judul) out += `<p class="gaya-judul">${lolos(b.judul)}</p>`
      if (b?.jenis === 'judul') {
        out += baris(b.arab, 'judul', rata || 'center') + baris(b.latin, 'judul', 'center')
        return out
      }
      const arab = baris(b?.arab, b?.jenis === 'syair' ? 'syair' : 'arab', rata, b?.warna)
      out += b?.ulang ? arab.replace(/<\/p>$/, ` (${b.ulang}×)</p>`) : arab
      out += baris(b?.latin, 'latin') + baris(b?.arti, 'arti')
      return out
    })
    .join('')
}

/** HTML satu bab: isi editor bila ada, selain itu hasil konversi bentuk lama. */
export function htmlBab(bab) {
  if (bab && typeof bab.html === 'string' && bab.html.trim()) return bab.html
  return bagianKeHtml(bab?.bagian)
}
