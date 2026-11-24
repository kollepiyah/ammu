// Tema Terang / Gelap / Otomatis (ikut sistem HP). Aturan murni, dipakai stores/ui.js.
export const MODE_TEMA = ['terang', 'gelap', 'otomatis']

/** Normalisasi nilai tersimpan; data lama hanya punya portalMu_darkMode '1'/'0'. */
export function bacaModeTema(modeTersimpan, darkLama) {
  if (MODE_TEMA.includes(modeTersimpan)) return modeTersimpan
  return darkLama === '1' ? 'gelap' : 'terang'
}

export function temaGelapAktif(mode, sistemGelap) {
  if (mode === 'gelap') return true
  if (mode === 'otomatis') return !!sistemGelap
  return false
}
