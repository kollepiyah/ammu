// Aturan kunci aplikasi (sidik jari / Face ID) — fungsi murni + tes. Kyai 25 Nov 2026: Android & PWA.
// Kunci HANYA untuk Portal (data pribadi santri/keuangan); wilayah publik (jadwal sholat, kiblat,
// channel) tetap terbuka walau aplikasi terkunci.

/** Ditinggal di latar selama ini atau lebih → dikunci lagi saat kembali. */
export const JEDA_KUNCI_MS = 3 * 60 * 1000

/**
 * Perlu dikunci sekarang?
 * @param {{aktif:boolean, adaSesi:boolean, dibukaUlang?:boolean, tersembunyiMs?:number}} o
 *   dibukaUlang = aplikasi baru dijalankan (bukan kembali dari latar).
 */
export function perluDikunci({ aktif, adaSesi, dibukaUlang = false, tersembunyiMs = 0 } = {}) {
  if (!aktif || !adaSesi) return false
  return dibukaUlang || tersembunyiMs >= JEDA_KUNCI_MS
}

/** Layar kunci tampil? Rute publik & layar masuk tak pernah ditutupi. */
export function tampilkanKunci({ terkunci, rutePublik } = {}) {
  return !!terkunci && !rutePublik
}

/** Kunci penyimpanan setelan per pengguna (perangkat bisa dipakai bergantian). */
export function kunciSetelan(uid) {
  return `ammu_kunci_${String(uid || '')}`
}
