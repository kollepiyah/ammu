// v.100: Scope guru terpusat — sumber tunggal untuk membedakan "guru Qiraati" vs "guru Sekolah".
//   Dipakai NaikKelasView (kenaikan), RekapPrestasiView (rekap), SantriView (data santri).
//   Deteksi berbasis ASSIGNMENT santri (paling andal, konsisten dgn scoping nama-match yang ada):
//     - Qiraati  : guru muncul sbg guru_pagi / guru_sore / guru (ngaji) di santri.
//     - Sekolah  : guru muncul di guru_sekolah[] (wali kelas sekolah) di santri.
//   Tipe guru (kyai): 1) Qiraati+Sekolah, 2) Qiraati saja, 3) Sekolah saja.

function _lower(v) {
  return String(v || '')
    .toLowerCase()
    .trim()
}

// Santri ini diampu guru `nama` sebagai guru NGAJI (Qiraati)?
export function ownsNgaji(s, nama) {
  const gn = _lower(nama)
  if (!gn || !s) return false
  return _lower(s.guru_pagi) === gn || _lower(s.guru_sore) === gn || _lower(s.guru) === gn
}

// Santri ini diampu guru `nama` sebagai WALI KELAS SEKOLAH?
export function ownsSekolah(s, nama) {
  const gn = _lower(nama)
  if (!gn || !s) return false
  const arr = Array.isArray(s.guru_sekolah)
    ? s.guru_sekolah
    : s.guru_sekolah
      ? [s.guru_sekolah]
      : []
  return arr.some((g) => _lower(g) === gn)
}

// Tipe guru dari daftar santri: { qiraati:bool, sekolah:bool }. dual = keduanya true.
export function deteksiTipeGuru(santriList, nama) {
  const gn = _lower(nama)
  let qiraati = false,
    sekolah = false
  if (!gn) return { qiraati, sekolah }
  for (const s of santriList || []) {
    if (!qiraati && ownsNgaji(s, gn)) qiraati = true
    if (!sekolah && ownsSekolah(s, gn)) sekolah = true
    if (qiraati && sekolah) break
  }
  return { qiraati, sekolah }
}

/**
 * v.1.2.0 — Guru masih AKTIF? Sumber tunggal penyaring status guru.
 *
 * Nilai `status` yang benar-benar tersimpan hanya dua ragam:
 *   'Aktif' (form guru) / 'aktif' (impor Excel)  -> aktif
 *   'Tidak Aktif'                                -> nonaktif
 * Kosong/undefined dianggap AKTIF (data lama sebelum kolom status ada).
 *
 * DUA BUG yang lahir dari tak adanya sumber tunggal ini (Kyai 22 Jul 2026,
 * "nama guru data lama selalu muncul di dropdown pilih guru pengajar"):
 *   1. NaikKelasView.guruOptions & TesKenaikanView.guruOptionsFor menyaring
 *      LEMBAGA saja, status tak dicek sama sekali.
 *   2. CeremonialView memakai `status !== 'Non-Aktif'` — string itu TAK PERNAH
 *      ditulis siapa pun, jadi penyaringnya tak pernah membuang apa-apa.
 * Perbandingan WAJIB case-insensitive: form menulis 'Aktif', impor menulis 'aktif'.
 */
export function isGuruAktif(g) {
  return _lower(g?.status || 'Aktif') === 'aktif'
}

/** Saring daftar guru ke yang aktif saja. */
export function guruAktifSaja(list) {
  return (list || []).filter(isGuruAktif)
}

/**
 * v.1.2.0 — Santri ini SUDAH punya guru untuk kategori tsb?
 *   'ngaji'   : guru_pagi / guru_sore / guru (field lama pra-pasangan)
 *   'sekolah' : guru_sekolah[] terisi
 *
 * Dipakai layar Assign Guru Kelas untuk menyembunyikan santri yang sudah terurus
 * (Kyai 22 Jul 2026). Pengecekan WAJIB per-kategori: kalau dicampur, santri yang
 * punya guru ngaji tak akan pernah bisa di-assign guru sekolah — dan karena hampir
 * semua santri punya guru ngaji, daftar sekolah akan kosong melompong.
 */
export function punyaGuruKategori(s, kategori) {
  if (kategori === 'sekolah') {
    const gs = Array.isArray(s?.guru_sekolah)
      ? s.guru_sekolah
      : s?.guru_sekolah
        ? [s.guru_sekolah]
        : []
    return gs.some((x) => _lower(x))
  }
  return !!(_lower(s?.guru_pagi) || _lower(s?.guru_sore) || _lower(s?.guru))
}
