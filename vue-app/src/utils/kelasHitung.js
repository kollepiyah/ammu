// v.1.1.9 — SUMBER TUNGGAL definisi "1 kelas" untuk statistik.
//
// Keputusan Kyai: kelas dihitung PER GURU (rombel), BUKAN per "kelas jenjang".
//   Qiraati : guru_pagi + guru_sore yang SEPASANG (mengampu rombel yang sama) =
//             **1 kelas**, walau namanya berbeda. Sebelumnya tiap guru dihitung
//             sendiri -> 1 rombel pagi+sore terhitung 2 kelas (bug yang dilaporkan,
//             paling kentara di PTPT).
//   Sekolah : himpunan guru_sekolah[] pada kelas_sekolah yang sama = 1 kelas.
//
// Format kunci SENGAJA sama dengan grouping di StatistikLembagaDetailView.vue
//   (`gp + '||' + gs` / `guruSekolah.sort().join(' & ')`) supaya badge "N kelas"
//   di halaman detail = jumlah tabel di ekspor PDF-nya. Jangan diubah sepihak.

const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// Kunci rombel Qiraati 1 santri (tanpa lembaga). '' bila kelas/guru kosong.
export function kelasKeyQiraati(s) {
  const kls = norm(s?.kelas)
  if (!kls) return ''
  const gp = norm(s?.guru_pagi)
  const gs = norm(s?.guru_sore)
  // `guru` = field lama (pra guru_pagi/guru_sore); dipakai hanya bila keduanya kosong.
  const pasangan = gp || gs ? `${gp}||${gs}` : norm(s?.guru)
  if (!pasangan || pasangan === '||') return ''
  return `${kls}|${pasangan}`
}

// Kunci rombel Sekolah 1 santri (tanpa lembaga). '' bila kelas/guru kosong.
export function kelasKeySekolah(s) {
  const kls = norm(s?.kelas_sekolah)
  if (!kls) return ''
  const guru = [
    ...new Set((Array.isArray(s?.guru_sekolah) ? s.guru_sekolah : []).map(norm).filter(Boolean))
  ].sort()
  if (!guru.length) return ''
  return `${kls}|${guru.join(' & ')}`
}

// Semua kunci kelas milik 1 santri, ber-prefix lembaga (santri bisa punya 2:
//   rombel ngaji + rombel sekolah).
export function kelasKeysOf(s) {
  const out = []
  const kq = kelasKeyQiraati(s)
  if (kq && norm(s?.lembaga)) out.push(`${norm(s.lembaga)}|${kq}`)
  const ks = kelasKeySekolah(s)
  if (ks && norm(s?.lembaga_sekolah)) out.push(`${norm(s.lembaga_sekolah)}|${ks}`)
  return out
}

// Jumlah kelas dari daftar santri. Santri non-aktif & tanpa guru diabaikan.
export function hitungKelas(list) {
  const set = new Set()
  for (const s of list || []) {
    if (!s || s.aktif === false) continue
    for (const k of kelasKeysOf(s)) set.add(k)
  }
  return set.size
}

// Jumlah kelas untuk SATU lembaga: `jenis` menentukan sisi mana yang dipakai
//   ('qiraati' | 'sekolah'), supaya baris per-lembaga tak kecampuran sisi lain.
//   Daftar santri sudah harus difilter ke lembaga tsb oleh pemanggil.
export function hitungKelasLembaga(list, jenis = 'qiraati') {
  const set = new Set()
  for (const s of list || []) {
    if (!s || s.aktif === false) continue
    const k = jenis === 'sekolah' ? kelasKeySekolah(s) : kelasKeyQiraati(s)
    if (k) set.add(k)
  }
  return set.size
}
