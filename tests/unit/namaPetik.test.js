// Kyai 16 Nov 2026: "Siti Ma'rifatin" tersimpan "Siti Ma'Rifatin" — impor Excel awal
// (importMap.titleCase) memakai `\b\w` yang menganggap petik batas kata. Kini satu aturan
// dengan form guru/santri (utils/format.toTitleCase).
import { describe, it, expect } from 'vitest'
import { titleCase } from '../../vue-app/src/services/importMap.js'
import { toTitleCase } from '@/utils/format'

describe('kapitalisasi nama berpetik', () => {
  it('huruf sesudah petik tidak dikapitalkan', () => {
    expect(titleCase("SITI MA'RIFATIN")).toBe("Siti Ma'rifatin")
    expect(titleCase("ahmad ma'ruf")).toBe("Ahmad Ma'ruf")
    expect(toTitleCase("nu'man")).toBe("Nu'man")
  })
  it('gelar tetap rapi', () => {
    expect(titleCase('ikrimatul alifiyah, s.pd., gr.')).toBe('Ikrimatul Alifiyah, S.Pd., Gr.')
  })
  it('sel kosong tetap kosong', () => {
    expect(titleCase('')).toBe('')
    expect(titleCase(null)).toBe('')
  })
})
