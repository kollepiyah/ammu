// Label shift Pagi-Sore / Pagi / Sore (Kyai, 16 Nov 2026) — SATU sumber untuk kartu santri & guru.
//   Santri: dari shift ngaji (`shiftNgajiOf`). Guru/pegawai: dari shift absensinya (master shift);
//   shift pegawai pagi/sore dihitung sama dengan pagi/sore.

const _LABEL = { pagi_sore: 'Pagi-Sore', pagi: 'Pagi', sore: 'Sore' }

/** 'pagi_sore' | 'pagi' | 'sore' → label; selain itu ''. */
export function labelShiftPagiSore(kode) {
  return _LABEL[String(kode || '')] || ''
}

const _PAGI = new Set(['pagi', 'pegawai_pagi'])
const _SORE = new Set(['sore', 'pegawai_sore'])

/** Id shift yang diwakili label Pagi/Sore (sisanya tetap tampil di baris "Shift:"). */
export function isShiftPagiSore(id) {
  const k = String(id || '')
  return _PAGI.has(k) || _SORE.has(k)
}

/** Kode pagi/sore dari daftar id shift guru: 'pagi_sore' | 'pagi' | 'sore' | ''. */
export function shiftPagiSoreDariIds(ids) {
  const arr = [...(ids || [])].map(String)
  const pagi = arr.some((x) => _PAGI.has(x))
  const sore = arr.some((x) => _SORE.has(x))
  return pagi && sore ? 'pagi_sore' : pagi ? 'pagi' : sore ? 'sore' : ''
}
