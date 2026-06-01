// v.90.0626: Util klasifikasi jenjang Diniyah (SDI / SMP / SMA) — SUMBER TUNGGAL.
// Dipakai di RaporView, RekapDiniyahView, RekapPrestasiView, dan LembagaDetailView
// supaya filter PKBM (split SMP/SMA) + daftar mapel Diniyah konsisten di semua menu.

// Klasifikasi kelas sekolah -> jenjang PKBM.
// Toleran angka & romawi, suffix A/B / prefix "Kelas" diabaikan.
//   VII / VIII / IX / 7 / 8 / 9   -> 'SMP'
//   X / XI / XII / 10 / 11 / 12    -> 'SMA'
export function kelasJenjang(kelasRaw) {
  const k = String(kelasRaw || '')
    .toUpperCase()
    .replace(/KELAS/g, '')
    .trim()
  const t = (k.split(/[\s_-]/)[0] || '').replace(/[^A-Z0-9]/g, '')
  if (/^(VII|VIII|IX|7|8|9)$/.test(t)) return 'SMP'
  if (/^(X|XI|XII|10|11|12)$/.test(t)) return 'SMA'
  return ''
}

// Jenjang Diniyah dari data santri.
//   lembaga_sekolah 'SDI'  -> 'SDI'
//   lembaga_sekolah 'PKBM' -> 'SMP' / 'SMA' (berdasar kelas_sekolah)
//   selain itu (TK / kosong) -> ''
export function diniyahJenjang(lembagaSekolah, kelasSekolah) {
  const lb = String(lembagaSekolah || '')
    .toLowerCase()
    .trim()
  if (lb === 'sdi') return 'SDI'
  if (lb === 'pkbm') return kelasJenjang(kelasSekolah)
  return ''
}

// Daftar jenjang Diniyah resmi (urutan tampil di picker / filter).
export const DINIYAH_JENJANG = ['SDI', 'SMP', 'SMA']

// Lembaga formal yang punya Diniyah (TK tidak menerbitkan Diniyah).
export const DINIYAH_LEMBAGA = ['SDI', 'PKBM']

// Default mapel Diniyah bila settings belum diisi admin.
export const DEFAULT_MAPEL_DINIYAH = ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab']

// Ambil daftar mapel Diniyah untuk satu jenjang dari settings.rekapDiniyahMapel.
// Struktur baru: { SDI: 'a, b', SMP: 'c, d', SMA: 'e, f' } (per jenjang).
// Fallback kompat lama: key 'PKBM' dipakai utk SMP & SMA bila key jenjang kosong.
// Mengembalikan array string (nama mapel). Kosong -> DEFAULT_MAPEL_DINIYAH.
export function mapelDiniyahFor(jenjangKey, rekapDiniyahMapel) {
  const all = rekapDiniyahMapel || {}
  let raw = all[jenjangKey]
  if (!raw && (jenjangKey === 'SMP' || jenjangKey === 'SMA')) raw = all['PKBM']
  const list = String(raw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return list.length ? list : DEFAULT_MAPEL_DINIYAH.slice()
}
