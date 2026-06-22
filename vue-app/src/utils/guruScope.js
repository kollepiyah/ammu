// v.100: Scope guru terpusat — sumber tunggal untuk membedakan "guru Qiraati" vs "guru Sekolah".
//   Dipakai NaikKelasView (kenaikan), RekapPrestasiView (rekap), SantriView (data santri).
//   Deteksi berbasis ASSIGNMENT santri (paling andal, konsisten dgn scoping nama-match yang ada):
//     - Qiraati  : guru muncul sbg guru_pagi / guru_sore / guru (ngaji) di santri.
//     - Sekolah  : guru muncul di guru_sekolah[] (wali kelas sekolah) di santri.
//   Tipe guru (kyai): 1) Qiraati+Sekolah, 2) Qiraati saja, 3) Sekolah saja.

function _lower(v) { return String(v || '').toLowerCase().trim() }

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
  const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : s.guru_sekolah ? [s.guru_sekolah] : []
  return arr.some((g) => _lower(g) === gn)
}

// Tipe guru dari daftar santri: { qiraati:bool, sekolah:bool }. dual = keduanya true.
export function deteksiTipeGuru(santriList, nama) {
  const gn = _lower(nama)
  let qiraati = false, sekolah = false
  if (!gn) return { qiraati, sekolah }
  for (const s of santriList || []) {
    if (!qiraati && ownsNgaji(s, gn)) qiraati = true
    if (!sekolah && ownsSekolah(s, gn)) sekolah = true
    if (qiraati && sekolah) break
  }
  return { qiraati, sekolah }
}
