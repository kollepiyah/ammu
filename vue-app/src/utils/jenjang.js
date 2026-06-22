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
// Jenjang Diniyah dari KELAS saja (tanpa lembaga): I-VI -> 'SDI', VII-IX -> 'SMP', X-XII -> 'SMA'.
export function jenjangFromKelas(kelas) {
  const j = kelasJenjang(kelas) // 'SMP' | 'SMA' | '' (VII-XII)
  if (j) return j
  const t = String(kelas || '')
    .toUpperCase()
    .replace(/KELAS/g, '')
    .trim()
    .split(/[\s_-]/)[0]
    .replace(/[^A-Z0-9]/g, '')
  if (/^(I|II|III|IV|V|VI|1|2|3|4|5|6)$/.test(t)) return 'SDI'
  return ''
}

// v.90.0626b: mapel Diniyah PER-KELAS (key = label kelas, mis 'VII').
// Prioritas: per-kelas > per-jenjang lama (SDI/SMP/SMA) > legacy 'PKBM' > default.
// raw bisa array (format baru) ATAU string koma (format lama) — keduanya didukung.
export function mapelDiniyahFor(kelas, rekapDiniyahMapel) {
  const all = rekapDiniyahMapel || {}
  const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
  let raw = all[String(kelas || '').trim()]
  if (isEmpty(raw)) {
    const jk = jenjangFromKelas(kelas)
    if (jk) raw = all[jk]
    if (isEmpty(raw) && (jk === 'SMP' || jk === 'SMA')) raw = all['PKBM']
  }
  const list = (Array.isArray(raw) ? raw : String(raw || '').split(','))
    .map((s) => String(s).trim())
    .filter(Boolean)
  return list.length ? list : DEFAULT_MAPEL_DINIYAH.slice()
}
