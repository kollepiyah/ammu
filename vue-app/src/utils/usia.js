// usia — hitung umur santri/guru auto dari tanggal lahir (port dari legacy
// hitungUsiaDariTanggal / hitungUsiaPadaTanggal). Format hasil: "Xth Ybln".
//
// Parser manual per-komponen (bukan new Date(str)) supaya bebas geser timezone &
// menerima dua format: ISO 'YYYY-MM-DD' (simpanan internal) + 'DD/MM/YYYY' (data lama).
// Semua fungsi PURE; input kosong/invalid → '' (pemanggil pakai v-if / sel kosong).
//
// SATU-SATUNYA tempat umur boleh dihitung. Kyai (31 Agu 2026): "perhitungan usia masuk
// tidak sesuai jika dihitung dari tgl lahir (tidak akurat)". Penyebabnya salinan kedua di
// composables/useSantriForm.js: rumusnya mengambil BULAN tanggal acuan apa adanya
// (`m = r.getMonth()`) alih-alih SELISIH bulan, dan tak pernah mengoreksi tanggal — jadi
// santri lahir 20 Nov 2015 yang masuk 5 Jul 2020 tercatat "5 thn 6 bln", padahal 4th 7bln.
// Salinan itu sudah dihapus; jangan menulis rumus umur baru di mana pun.

// 'YYYY-MM-DD' atau 'DD/MM/YYYY' → { y, m, d } (m,d 1-based). null bila tak valid.
function parseTgl(tgl) {
  if (!tgl) return null
  const s = String(tgl).trim()
  let y, m, d
  let mt = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (mt) {
    y = +mt[1]
    m = +mt[2]
    d = +mt[3]
  } else {
    mt = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
    if (mt) {
      d = +mt[1]
      m = +mt[2]
      y = +mt[3]
    }
  }
  if (!y || !m || !d || y < 1901) return null
  return { y, m, d }
}

// Selisih {y,m} antara lahir → acuan (keduanya {y,m,d}). Kurang sebulan bila tanggal acuan < tanggal lahir.
function selisih(lahir, acuan) {
  let y = acuan.y - lahir.y
  let m = acuan.m - lahir.m
  if (acuan.d < lahir.d) m--
  if (m < 0) {
    y--
    m += 12
  }
  return { y, m }
}

// Umur SEKARANG dari tgl lahir. '' bila tak valid / belum lahir.
export function usiaKini(tglLahir) {
  const b = parseTgl(tglLahir)
  if (!b) return ''
  const now = new Date()
  const ref = { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }
  const { y, m } = selisih(b, ref)
  if (y < 0) return ''
  return `${y}th ${m}bln`
}

// Umur PADA tanggal acuan (mis. saat masuk = tgl_masuk). '' bila salah satu tak valid.
export function usiaPada(tglLahir, tglAcuan) {
  const b = parseTgl(tglLahir)
  const a = parseTgl(tglAcuan)
  if (!b || !a) return ''
  const { y, m } = selisih(b, a)
  if (y < 0) return ''
  return `${y}th ${m}bln`
}
