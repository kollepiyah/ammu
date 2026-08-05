// tagihanId — pembentuk id baris `keuangan_tagihan` untuk jalur OTOMATIS.
//
// Id-nya sengaja DETERMINISTIK (santri + jenis + periode), bukan acak: itulah yang membuat
// tombol Generate dan cron bulanan tak saling menerbitkan tagihan kedua untuk santri yang
// sama. Konsekuensinya polanya jadi kontrak — kalau salah satu sisi mengubah bentuknya,
// baris "yang sama" jadi ber-id berbeda dan santri menerima DUA tagihan untuk satu bulan.
//
// ⚠️ Cermin di `supabase/functions/auto-generate-tagihan/index.ts` menyusun id dengan pola
// yang sama secara inline (`tagihan_${sx.id}_${j.id}_${ym}`). Kalau berkas ini diubah,
// ubah juga di sana. Tes `tests/unit/tagihanId.test.js` mengunci bentuknya.

/** Kode bulan 'YYYYMM' untuk potongan id periode bulanan. */
export function kodeBulan(d = new Date()) {
  const dt = d instanceof Date ? d : new Date(d)
  if (isNaN(dt.getTime())) return ''
  return `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Id tagihan jalur otomatis: `tagihan_<santriId>_<jenisId>_<kodePeriode>`.
 * `kodePeriode` = 'YYYYMM' (bulanan) atau 'TA<tahun>' (tahunan).
 */
export function idTagihanAuto(santriId, jenisId, kodePeriode) {
  return `tagihan_${santriId}_${jenisId}_${kodePeriode}`
}
