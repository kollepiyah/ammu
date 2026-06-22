// Hitung pasaran Jawa (5-day cycle): Legi → Pahing → Pon → Wage → Kliwon
// Anchor: 1 Januari 1900 (Senin) = Pahing
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']
const ANCHOR = new Date(1900, 0, 1) // 1 Jan 1900 = Pahing (index 1)
const ANCHOR_INDEX = 1

export function hitungPasaran(date) {
  const d = new Date(date)
  const diffDays = Math.floor((d - ANCHOR) / (1000 * 60 * 60 * 24))
  const idx = (((ANCHOR_INDEX + diffDays) % 5) + 5) % 5
  return PASARAN[idx]
}
