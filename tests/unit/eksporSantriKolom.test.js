// Kolom ekspor Data Santri (Kyai 17 Nov 2026): status yang tampil di kartu (Non-mukim /
// Fullday / Ma'had / Pondok Laju) dan shift ngaji yang terbaca, bukan kode mentah.
import { describe, it, expect } from 'vitest'
import { SANTRI_FIELDS, parseShiftNgaji, LABEL_SHIFT_NGAJI } from '@/services/santriFields'

function kolom(header) {
  return SANTRI_FIELDS.find((f) => f.header === header)
}

describe('kolom "Status Santri"', () => {
  const f = () => kolom('Status Santri')

  it('ada di daftar kolom ekspor', () => {
    expect(f()).toBeTruthy()
  })

  it('memakai label yang sama dengan kartu santri', () => {
    expect(f().exp({ is_mukim: true })).toBe("Ma'had")
    expect(f().exp({ is_pondok_laju: true })).toBe('Pondok Laju')
    expect(f().exp({ is_fullday: true })).toBe('Fullday')
    expect(f().exp({})).toBe('Non-mukim')
  })

  it('Pondok Laju yang juga Fullday tetap tertulis Pondok Laju', () => {
    expect(f().exp({ is_pondok_laju: true, is_fullday: true })).toBe('Pondok Laju')
  })

  it('Mukim mengalahkan semuanya', () => {
    expect(f().exp({ is_mukim: true, is_pondok_laju: true })).toBe("Ma'had")
  })

  it('TIDAK bisa diimpor — ia turunan tiga kolom boolean, bukan sumber', () => {
    expect(f().imp).toBeUndefined()
    expect(f().exportOnly).toBe(true)
  })
})

describe('kolom "Shift Ngaji"', () => {
  const f = () => kolom('Shift Ngaji')

  it('mengeluarkan label terbaca, bukan kode mentah', () => {
    expect(f().exp({ shift_ngaji: 'pagi_sore' })).toBe('Pagi-Sore')
    expect(f().exp({ shift_ngaji: 'pagi' })).toBe('Pagi')
    expect(f().exp({ shift_ngaji: 'sore' })).toBe('Sore')
  })

  it('santri tanpa shift dianggap ikut keduanya — sama seperti aturan impor', () => {
    expect(f().exp({})).toBe('Pagi-Sore')
    expect(parseShiftNgaji('')).toBe('pagi_sore')
  })

  it('ekspor baru BISA diimpor ulang (bolak-balik tak berubah makna)', () => {
    for (const kode of ['pagi_sore', 'pagi', 'sore']) {
      expect(parseShiftNgaji(f().exp({ shift_ngaji: kode }))).toBe(kode)
    }
  })

  it('ekspor LAMA (kode mentah) tetap terbaca saat impor', () => {
    expect(parseShiftNgaji('pagi_sore')).toBe('pagi_sore')
    expect(parseShiftNgaji('sore')).toBe('sore')
  })

  it('label dan kode tetap sepasang', () => {
    expect(Object.keys(LABEL_SHIFT_NGAJI).sort()).toEqual(['pagi', 'pagi_sore', 'sore'])
  })
})
