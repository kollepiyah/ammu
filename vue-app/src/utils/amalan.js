// Kitab & Wirid (blueprint F7) — aturan data, fungsi murni + tes. Satu bacaan = { judul, kategori,
// urutan, aktif, keterangan, bagian:[{ judul?, arab, latin?, arti?, ulang? }] }.

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

/**
 * Bersihkan isian form admin sebelum disimpan. Bagian tanpa teks Arab dibuang; `ulang` hanya
 * bilangan bulat 2..1000 (1 = tak perlu ditulis). Hasil { ok, galat?, nilai }.
 */
export function bersihkanAmalan(form) {
  const judul = rapi(form?.judul)
  const bagian = (Array.isArray(form?.bagian) ? form.bagian : [])
    .map((b) => {
      const ulang = Math.floor(Number(b?.ulang))
      const out = { arab: rapi(b?.arab) }
      if (rapi(b?.judul)) out.judul = rapi(b.judul)
      if (rapi(b?.latin)) out.latin = rapi(b.latin)
      if (rapi(b?.arti)) out.arti = rapi(b.arti)
      if (ulang >= 2 && ulang <= 1000) out.ulang = ulang
      return out
    })
    .filter((b) => b.arab)
  if (!judul) return { ok: false, galat: 'Judul wajib diisi.' }
  if (!bagian.length) return { ok: false, galat: 'Minimal satu bagian berisi teks Arab.' }
  return {
    ok: true,
    nilai: {
      judul,
      kategori: KUNCI_KATEGORI.has(form?.kategori) ? form.kategori : 'lainnya',
      urutan: Math.max(0, Math.floor(Number(form?.urutan) || 0)),
      aktif: form?.aktif !== false,
      keterangan: rapi(form?.keterangan),
      bagian
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
      const arab = baris.filter((x) => ARAB.test(x))
      const lain = baris.filter((x) => !ARAB.test(x))
      const b = { arab: arab.join('\n') }
      if (lain.length > 1) {
        b.latin = lain[0]
        b.arti = lain.slice(1).join('\n')
      } else if (lain.length === 1) b.arti = lain[0]
      return b
    })
    .filter((b) => b.arab)
}

/** Ukuran huruf Arab layar baca (A−/A+): batas aman 20–48 px, langkah 2. */
export function ukuranArab(sekarang, arah) {
  const n = (Number(sekarang) || 28) + (arah > 0 ? 2 : -2)
  return Math.min(48, Math.max(20, n))
}
