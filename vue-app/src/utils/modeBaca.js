// Aturan mode baca layar penuh (blueprint §3.6) — fungsi murni + tes. Dipakai useModeBaca.

/** Ketukan dianggap "di tengah" (alihkan kontrol) bila di luar pita atas & bawah 20% layar —
 *  ketukan di tepi biasanya mengenai tombol/kontrol, jangan ikut menyembunyikannya. */
export function ketukDiTengah(y, tinggi) {
  if (!(tinggi > 0) || !Number.isFinite(y)) return false
  return y > tinggi * 0.2 && y < tinggi * 0.8
}

export const SETELAN_BACA_BAWAAN = Object.freeze({ tetapMenyala: true })

export function rapikanSetelanBaca(s) {
  return { tetapMenyala: typeof s?.tetapMenyala === 'boolean' ? s.tetapMenyala : true }
}
