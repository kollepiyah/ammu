// v.1.2.6 (Kyai): status santri untuk targeting jenis pembayaran (syahriyah) — sejajar
//   dengan whitelist `lembaga_only`. Non-mukim = bukan mukim & bukan fullday;
//   Ma'had = is_mukim; Fullday = is_fullday. Sumber: field santri is_mukim / is_fullday.
//   MURNI (tanpa I/O) supaya gampang diuji & bisa dicerminkan di edge function (Deno).

export const STATUS_SANTRI_OPTS = [
  { key: 'non_mukim', label: 'Non-mukim' },
  { key: 'mahad', label: "Ma'had" },
  { key: 'fullday', label: 'Fullday' }
]

/**
 * Apakah santri `s` cocok dengan whitelist status `statusOnly`?
 *   - whitelist kosong / bukan array → true (berlaku untuk SEMUA status).
 *   - antar-status bersifat OR (santri masuk bila cocok SALAH SATU status terpilih).
 * @param {Object} s - dokumen santri (dibaca is_mukim & is_fullday).
 * @param {string[]} statusOnly - subset dari ['non_mukim','mahad','fullday'].
 */
export function matchStatusOnly(s, statusOnly) {
  const wl = Array.isArray(statusOnly) ? statusOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const mukim = !!(s && s.is_mukim)
  const fullday = !!(s && s.is_fullday)
  return wl.some((st) =>
    st === 'mahad'
      ? mukim
      : st === 'fullday'
        ? fullday
        : st === 'non_mukim'
          ? !mukim && !fullday
          : false
  )
}
