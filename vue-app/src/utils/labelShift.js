// Label shift ngaji santri Pagi-Sore / Pagi / Sore (Kyai, 16 Nov 2026), dari `shiftNgajiOf`.
//   Kartu guru TIDAK memakainya: chip "Shift:" dari Master Shift sudah memuat pagi/sore.

const _LABEL = { pagi_sore: 'Pagi-Sore', pagi: 'Pagi', sore: 'Sore' }

/** 'pagi_sore' | 'pagi' | 'sore' → label; selain itu ''. */
export function labelShiftPagiSore(kode) {
  return _LABEL[String(kode || '')] || ''
}
