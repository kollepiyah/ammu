// Jenis kelamin dari data santri/guru: tersimpan 'L'/'P', tapi data lama bisa berisi
// 'Laki-laki'/'Perempuan'/huruf kecil. Satu penormal untuk penyaring Data Santri & Guru.
export function kunciJk(v) {
  const s = String(v ?? '')
    .trim()
    .toUpperCase()
  if (s.startsWith('L')) return 'L'
  if (s.startsWith('P') || s.startsWith('W')) return 'P'
  return ''
}

export const OPSI_JK = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' }
]

/** Saring daftar menurut jenis kelamin; `jk` kosong = semua. */
export function saringJk(list, jk) {
  if (!jk) return list
  return list.filter((x) => kunciJk(x?.jk) === jk)
}
