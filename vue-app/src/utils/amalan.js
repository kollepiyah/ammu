// Kitab & Wirid (blueprint F7) — aturan data, fungsi murni + tes. Satu bacaan = { judul, kategori,
// urutan, aktif, keterangan, bentuk:'tunggal'|'berbab', bab:[{ judul, bagian:[blok] }] } dengan
// blok = { jenis?:'teks'|'judul'|'syair'|'pemisah', judul?, arab, latin?, arti?, ulang? }.
// Sejak 26 Nov 2026 bab dari editor teks kaya berbentuk { judul, warna?, html } (utils/isiAmalan).
import { saringHtmlAmalan, teksPolos } from './isiAmalan'

export const KATEGORI_AMALAN = Object.freeze([
  { kunci: 'wirid', label: 'Wirid' },
  { kunci: 'doa', label: 'Doa' },
  { kunci: 'tahlil', label: 'Tahlil' },
  { kunci: 'maulid', label: 'Maulid' },
  { kunci: 'lainnya', label: 'Lainnya' }
])
const KUNCI_KATEGORI = new Set(KATEGORI_AMALAN.map((k) => k.kunci))

export function labelKategori(k) {
  return KATEGORI_AMALAN.find((x) => x.kunci === k)?.label || 'Lainnya'
}

/** Daftar untuk layar publik: saring kategori ('semua' = semua), urut kategori → urutan → judul. */
export function susunDaftarAmalan(list, kategori = 'semua') {
  const posisi = (k) => {
    const i = KATEGORI_AMALAN.findIndex((x) => x.kunci === k)
    return i < 0 ? KATEGORI_AMALAN.length : i
  }
  return (list || [])
    .filter((a) => kategori === 'semua' || (a.kategori || 'lainnya') === kategori)
    .slice()
    .sort(
      (a, b) =>
        posisi(a.kategori) - posisi(b.kategori) ||
        (Number(a.urutan) || 0) - (Number(b.urutan) || 0) ||
        String(a.judul || '').localeCompare(String(b.judul || ''), 'id')
    )
}

const rapi = (s) =>
  String(s ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim()

export const JENIS_BLOK = Object.freeze([
  { kunci: 'teks', label: 'Teks' },
  { kunci: 'judul', label: 'Judul' },
  { kunci: 'syair', label: 'Syair' },
  { kunci: 'pemisah', label: 'Pemisah ***' }
])
const KUNCI_JENIS = new Set(JENIS_BLOK.map((j) => j.kunci))

/** Satu blok bacaan bersih, atau null bila kosong. Blok "pemisah" tak butuh teks Arab. */
// Kyai 26 Nov 2026: admin mengatur rata & warna teks per bagian, dan warna judul bab.
export const RATA_TEKS = Object.freeze([
  { kunci: 'kanan', label: 'Kanan', kelas: 'text-right' },
  { kunci: 'tengah', label: 'Tengah', kelas: 'text-center' },
  { kunci: 'kiri', label: 'Kiri', kelas: 'text-left' }
])
// Kelas ditulis utuh supaya terbaca Tailwind (tak boleh dirakit dari potongan).
// Biru & Ungu memakai kelas hex khusus (.warna-teks-biru / .warna-teks-ungu di main.css) karena
// palet sky & violet di tailwind.config.js disatukan ke teal & zinc.
export const WARNA_TEKS = Object.freeze([
  { kunci: 'hijau', label: 'Hijau', kelas: 'text-teal-700 dark:text-teal-300' },
  { kunci: 'merah', label: 'Merah', kelas: 'text-rose-700 dark:text-rose-300' },
  { kunci: 'biru', label: 'Biru', kelas: 'warna-teks-biru' },
  { kunci: 'emas', label: 'Emas', kelas: 'text-amber-700 dark:text-amber-300' },
  { kunci: 'ungu', label: 'Ungu', kelas: 'warna-teks-ungu' }
])
const KUNCI_RATA = new Set(RATA_TEKS.map((r) => r.kunci))
const KUNCI_WARNA = new Set(WARNA_TEKS.map((w) => w.kunci))

/** Kelas rata; kunci kosong/asing → bawaan (teks Arab: kanan, judul: tengah). */
export function kelasRata(kunci, bawaan = 'kanan') {
  const r = RATA_TEKS.find((x) => x.kunci === kunci) || RATA_TEKS.find((x) => x.kunci === bawaan)
  return r.kelas
}
/** Kelas warna; kunci kosong/asing → kelas `bawaan`. */
export function kelasWarna(kunci, bawaan = 'text-[var(--text-primary)]') {
  return WARNA_TEKS.find((w) => w.kunci === kunci)?.kelas || bawaan
}

function bersihkanBlok(b) {
  const jenis = KUNCI_JENIS.has(b?.jenis) ? b.jenis : 'teks'
  if (jenis === 'pemisah') return { jenis }
  const ulang = Math.floor(Number(b?.ulang))
  const out = { arab: rapi(b?.arab) }
  if (jenis !== 'teks') out.jenis = jenis
  if (rapi(b?.judul)) out.judul = rapi(b.judul)
  if (rapi(b?.latin)) out.latin = rapi(b.latin)
  if (rapi(b?.arti)) out.arti = rapi(b.arti)
  if (ulang >= 2 && ulang <= 1000) out.ulang = ulang
  if (jenis !== 'syair' && KUNCI_RATA.has(b?.rata)) out.rata = b.rata
  if (KUNCI_WARNA.has(b?.warna)) out.warna = b.warna
  return out.arab ? out : null
}

/**
 * Daftar bab sebuah bacaan. Bacaan lama (sebelum 26 Nov 2026) hanya punya `bagian` datar →
 * dianggap satu bab tanpa judul, jadi tetap terbaca tanpa migrasi data.
 */
export function babAmalan(a) {
  if (Array.isArray(a?.bab) && a.bab.length) return a.bab
  if (Array.isArray(a?.bagian) && a.bagian.length) return [{ judul: '', bagian: a.bagian }]
  return []
}

/**
 * Bersihkan isian form admin sebelum disimpan. Bentuk "tunggal" = satu bacaan yang halamannya
 * digeser; "berbab" = ada daftar bab lebih dulu. Bab tanpa blok berisi dibuang; bab tak berjudul
 * pada bentuk berbab diberi "Bab n". Hasil { ok, galat?, nilai }.
 */
export function bersihkanAmalan(form) {
  const judul = rapi(form?.judul)
  const bentuk = form?.bentuk === 'berbab' ? 'berbab' : 'tunggal'
  const bab = babAmalan(form)
    .map((x) => {
      const dasar = {
        judul: rapi(x?.judul),
        ...(KUNCI_WARNA.has(x?.warna) ? { warna: x.warna } : {})
      }
      // Kyai 26 Nov 2026: isi teks kaya dari editor — disaring di sini, sebelum disimpan.
      if (typeof x?.html === 'string') return { ...dasar, html: saringHtmlAmalan(x.html) }
      return {
        ...dasar,
        bagian: (Array.isArray(x?.bagian) ? x.bagian : []).map(bersihkanBlok).filter(Boolean)
      }
    })
    // Bab kosong (atau isinya hanya pemisah) dibuang.
    .filter((x) =>
      'html' in x ? !!teksPolos(x.html) : x.bagian.some((b) => b.jenis !== 'pemisah')
    )
    .map((x, i) => ({ ...x, judul: x.judul || (bentuk === 'berbab' ? `Bab ${i + 1}` : '') }))
  if (!judul) return { ok: false, galat: 'Judul wajib diisi.' }
  if (!bab.length) return { ok: false, galat: 'Minimal satu bagian berisi teks Arab.' }
  return {
    ok: true,
    nilai: {
      judul,
      kategori: KUNCI_KATEGORI.has(form?.kategori) ? form.kategori : 'lainnya',
      urutan: Math.max(0, Math.floor(Number(form?.urutan) || 0)),
      aktif: form?.aktif !== false,
      keterangan: rapi(form?.keterangan),
      bentuk,
      bab
    }
  }
}

/**
 * Tempel massal: teks panjang dipecah jadi bagian di setiap BARIS KOSONG. Baris berhuruf Arab
 * masuk `arab`; baris Latin pertama sesudahnya → `latin`, sisanya → `arti`. Mempercepat admin
 * menyalin dari dokumen tanpa mengisi kotak satu per satu.
 */
export function pecahTeksAmalan(teks) {
  const ARAB = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/
  return String(teks || '')
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((blok) => {
      const baris = blok
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean)
      // Blok berisi bintang/titik saja ("***") = garis pemisah antarbagian.
      if (baris.length && baris.every((x) => /^[*•·\s]+$/.test(x))) return { jenis: 'pemisah' }
      const arab = baris.filter((x) => ARAB.test(x))
      const lain = baris.filter((x) => !ARAB.test(x))
      const b = { arab: arab.join('\n') }
      if (lain.length > 1) {
        b.latin = lain[0]
        b.arti = lain.slice(1).join('\n')
      } else if (lain.length === 1) b.arti = lain[0]
      return b
    })
    .filter((b) => b.arab || b.jenis === 'pemisah')
}

/** Ukuran huruf Arab layar baca (A−/A+): batas aman 20–48 px, langkah 2. */
export function ukuranArab(sekarang, arah) {
  const n = (Number(sekarang) || 28) + (arah > 0 ? 2 : -2)
  return Math.min(48, Math.max(20, n))
}

/**
 * Tempel massal berbab: baris "=== Judul bab" memulai bab baru (judul boleh kosong). Teks sebelum
 * penanda pertama jadi bab pertama. Isi tiap bab dipecah dengan pecahTeksAmalan.
 */
export function pecahTeksBab(teks) {
  const hasil = []
  let kini = { judul: '', baris: [] }
  for (const baris of String(teks || '')
    .replace(/\r\n/g, '\n')
    .split('\n')) {
    const m = baris.match(/^\s*={3,}\s*(.*)$/)
    if (m) {
      hasil.push(kini)
      kini = { judul: m[1].trim(), baris: [] }
    } else kini.baris.push(baris)
  }
  hasil.push(kini)
  return hasil
    .map((x) => ({ judul: x.judul, bagian: pecahTeksAmalan(x.baris.join('\n')) }))
    .filter((x) => x.bagian.length)
}

/** Baris syair: tiap baris Arab bergantian rata kanan (awal) dan rata kiri (akhir). */
export function barisSyair(arab) {
  return String(arab || '')
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t, i) => ({ teks: t, sisi: i % 2 === 0 ? 'awal' : 'akhir' }))
}

/** Label penunjuk halaman: bacaan berbab dihitung per bab, tunggal per halaman. */
export function labelHalaman(bentuk, i, n) {
  return `${bentuk === 'berbab' ? 'Bab' : 'Halaman'} ${i + 1} dari ${n}`
}

/** Tombol ع/A: Arab saja → Arab + Latin → lengkap (dengan arti) → kembali ke Arab saja. */
export const MODE_TAMPIL = Object.freeze(['lengkap', 'arab', 'latin'])
export const LABEL_MODE = Object.freeze({
  lengkap: 'Arab, Latin & arti',
  arab: 'Arab saja',
  latin: 'Arab & Latin'
})
export function modeBerikut(m) {
  const i = MODE_TAMPIL.indexOf(m)
  return MODE_TAMPIL[(i + 1) % MODE_TAMPIL.length]
}

/** Halaman yang dibuka: dari ?hal= di URL bila sah; bacaan berbab tanpa ?hal → daftar bab (-1). */
export function halamanAwal(bentuk, n, hal) {
  const h = Math.floor(Number(hal))
  if (hal !== undefined && hal !== null && hal !== '' && h >= 0 && h < n) return h
  return bentuk === 'berbab' && n > 1 ? -1 : 0
}
