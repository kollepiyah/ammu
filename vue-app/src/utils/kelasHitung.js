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

// v.1.2.4 — Shift ngaji santri: ikut PAGI, SORE, atau KEDUANYA. Sumber: field
//   eksplisit `shift_ngaji` ('pagi'|'sore'|'pagi_sore'); bila kosong DISIMPULKAN
//   dari guru pagi/sore yang terisi (kompat data lama). '' = tak ada guru.
export function shiftNgajiOf(s) {
  const v = norm(s?.shift_ngaji)
  if (v === 'pagi' || v === 'sore' || v === 'pagi_sore') return v
  const gp = norm(s?.guru_pagi)
  const gs = norm(s?.guru_sore)
  if (gp && gs) return 'pagi_sore'
  if (gp) return 'pagi'
  if (gs) return 'sore'
  // legacy: hanya field `guru` → anggap pagi (selaras useSantriForm & pasanganGuru)
  return norm(s?.guru) ? 'pagi' : ''
}

// Guru pagi & sore EFEKTIF 1 santri, menghormati shift_ngaji: santri 'pagi' tak
//   membawa guru sore (walau kolomnya terisi), dan sebaliknya. Field `guru` lama
//   dianggap guru pagi bila guru_pagi/guru_sore dua-duanya kosong.
function effGuru(s) {
  let gp = norm(s?.guru_pagi)
  let gs = norm(s?.guru_sore)
  if (!gp && !gs) gp = norm(s?.guru) // legacy → pagi
  const shift = norm(s?.shift_ngaji)
  if (shift === 'pagi') gs = ''
  else if (shift === 'sore') gp = ''
  return { pagi: gp, sore: gs }
}

// Kunci rombel Qiraati 1 santri (tanpa lembaga). '' bila TAK ADA GURU.
//   Bentuk `pagi||sore`; menghormati shift (pagi-saja → `pagi||`).
export function kelasKeyQiraati(s) {
  const { pagi, sore } = effGuru(s)
  if (!pagi && !sore) return ''
  return `${pagi}||${sore}`
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

// v.1.2.4 — Resolver "1 kelas = pasangan guru" untuk SATU daftar santri.
//   Santri PAGI-SAJA / SORE-SAJA ditempelkan ke kelas PASANGAN yang berbagi guru
//   shift-nya (mis. santri pagi-saja gurunya "Lailatul" → masuk kelas yang guru
//   paginya "Lailatul"), jadi ia tak lagi terpisah/terhitung sebagai kelas sendiri.
//   Maps ber-scope lembaga supaya nama guru yang kebetulan sama di dua lembaga tak
//   salah gabung. keyOf(s) → kunci kanonik rombel (tanpa prefix lembaga).
export function buildResolverQiraati(list) {
  const byPagi = new Map() // `${lembaga}||${guruPagi}` -> kunci pasangan
  const bySore = new Map() // `${lembaga}||${guruSore}` -> kunci pasangan
  for (const s of list || []) {
    if (!s || s.aktif === false) continue
    const { pagi, sore } = effGuru(s)
    if (!pagi || !sore) continue // hanya PASANGAN penuh yang jadi jangkar
    const lem = norm(s.lembaga)
    const key = `${pagi}||${sore}`
    const pk = `${lem}||${pagi}`
    const sk = `${lem}||${sore}`
    if (!byPagi.has(pk)) byPagi.set(pk, key)
    if (!bySore.has(sk)) bySore.set(sk, key)
  }
  return function keyOf(s) {
    const raw = kelasKeyQiraati(s)
    if (!raw) return ''
    const { pagi, sore } = effGuru(s)
    const lem = norm(s?.lembaga)
    if (pagi && !sore) return byPagi.get(`${lem}||${pagi}`) || raw
    if (sore && !pagi) return bySore.get(`${lem}||${sore}`) || raw
    return raw
  }
}

// Jumlah kelas dari daftar santri. Santri non-aktif & tanpa guru diabaikan.
//   Qiraati lewat resolver (pagi-saja nempel ke pasangan); sekolah apa adanya.
export function hitungKelas(list) {
  const set = new Set()
  const keyOf = buildResolverQiraati(list)
  for (const s of list || []) {
    if (!s || s.aktif === false) continue
    const lem = norm(s.lembaga)
    const kq = keyOf(s)
    if (kq && lem) set.add(`${lem}|${kq}`)
    const ks = kelasKeySekolah(s)
    const lemS = norm(s.lembaga_sekolah)
    if (ks && lemS) set.add(`${lemS}|${ks}`)
  }
  return set.size
}

// Jumlah kelas untuk SATU lembaga: `jenis` menentukan sisi mana yang dipakai
//   ('qiraati' | 'sekolah'), supaya baris per-lembaga tak kecampuran sisi lain.
//   Daftar santri sudah harus difilter ke lembaga tsb oleh pemanggil.
export function hitungKelasLembaga(list, jenis = 'qiraati') {
  const set = new Set()
  if (jenis === 'sekolah') {
    for (const s of list || []) {
      if (!s || s.aktif === false) continue
      const k = kelasKeySekolah(s)
      if (k) set.add(k)
    }
    return set.size
  }
  const keyOf = buildResolverQiraati(list)
  for (const s of list || []) {
    if (!s || s.aktif === false) continue
    const k = keyOf(s)
    if (k) set.add(k)
  }
  return set.size
}
