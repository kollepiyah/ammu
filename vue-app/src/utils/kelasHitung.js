// v.1.1.9 — SUMBER TUNGGAL definisi "1 kelas" untuk statistik.
//
// Keputusan Kyai (revisi 19 Jul): **kelas ditentukan NAMA GURU saja, jenjang kelas
//   TIDAK ikut menentukan.** Sebab satu rombel bisa berisi santri campur jenjang —
//   mis. Ust. Muin mengampu santri kelas 1 DAN 2 sekaligus; itu tetap **1 kelas**,
//   bukan 2. Berlaku untuk SEMUA unit (PTPT, TPQ, dst).
//   Qiraati : pasangan guru_pagi + guru_sore = 1 kelas (walau namanya berbeda);
//             field `guru` lama dipakai bila keduanya kosong.
//   Sekolah : himpunan guru_sekolah[] = 1 kelas.
//
// Riwayat: versi pertama memakai `kelas|guru` (jenjang ikut) — itu memecah rombel
//   campuran jadi beberapa kelas. Jangan dihidupkan lagi.
//
// SEMUA penghitung kelas WAJIB lewat sini. Sudah 2 kali angka melenceng gara-gara
//   ada file yang merakit kuncinya sendiri (useStatistikDashboard, lalu grid kartu
//   di RingkasanSantriLembaga). Kalau butuh hitung kelas: impor, jangan tulis ulang.

const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()

// Kunci rombel Qiraati 1 santri (tanpa lembaga). '' bila TAK ADA GURU.
export function kelasKeyQiraati(s) {
  const gp = norm(s?.guru_pagi)
  const gs = norm(s?.guru_sore)
  // `guru` = field lama (pra guru_pagi/guru_sore); dipakai hanya bila keduanya kosong.
  const pasangan = gp || gs ? `${gp}||${gs}` : norm(s?.guru)
  if (!pasangan || pasangan === '||') return ''
  return pasangan
}

// Kunci rombel Sekolah 1 santri (tanpa lembaga). '' bila TAK ADA GURU.
export function kelasKeySekolah(s) {
  const guru = [
    ...new Set((Array.isArray(s?.guru_sekolah) ? s.guru_sekolah : []).map(norm).filter(Boolean))
  ].sort()
  if (!guru.length) return ''
  return guru.join(' & ')
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
