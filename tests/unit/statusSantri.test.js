// v.1.2.6 (Kyai): whitelist status santri untuk targeting jenis pembayaran (syahriyah).
//   Non-mukim = bukan mukim & bukan fullday; Ma'had = is_mukim; Fullday = is_fullday.
//   Kosong = berlaku semua; antar-status OR.
import { describe, it, expect } from 'vitest'
import { matchStatusOnly, STATUS_SANTRI_OPTS } from '@/utils/statusSantri'

const nonMukim = { id: 1, is_mukim: false, is_fullday: false }
const mahad = { id: 2, is_mukim: true, is_fullday: false }
const fullday = { id: 3, is_mukim: false, is_fullday: true }

describe('matchStatusOnly', () => {
  it('whitelist kosong / bukan array → semua santri cocok', () => {
    expect(matchStatusOnly(nonMukim, [])).toBe(true)
    expect(matchStatusOnly(mahad, [])).toBe(true)
    expect(matchStatusOnly(fullday, undefined)).toBe(true)
    expect(matchStatusOnly(mahad, null)).toBe(true)
  })

  it("status 'mahad' cocok hanya santri is_mukim", () => {
    expect(matchStatusOnly(mahad, ['mahad'])).toBe(true)
    expect(matchStatusOnly(nonMukim, ['mahad'])).toBe(false)
    expect(matchStatusOnly(fullday, ['mahad'])).toBe(false)
  })

  it("status 'fullday' cocok hanya santri is_fullday", () => {
    expect(matchStatusOnly(fullday, ['fullday'])).toBe(true)
    expect(matchStatusOnly(nonMukim, ['fullday'])).toBe(false)
    expect(matchStatusOnly(mahad, ['fullday'])).toBe(false)
  })

  it("status 'non_mukim' cocok hanya santri bukan mukim & bukan fullday", () => {
    expect(matchStatusOnly(nonMukim, ['non_mukim'])).toBe(true)
    expect(matchStatusOnly(mahad, ['non_mukim'])).toBe(false)
    expect(matchStatusOnly(fullday, ['non_mukim'])).toBe(false)
  })

  it('antar-status bersifat OR', () => {
    expect(matchStatusOnly(mahad, ['mahad', 'fullday'])).toBe(true)
    expect(matchStatusOnly(fullday, ['mahad', 'fullday'])).toBe(true)
    expect(matchStatusOnly(nonMukim, ['mahad', 'fullday'])).toBe(false)
  })

  it('nilai status tak dikenal diabaikan (tak cocok)', () => {
    expect(matchStatusOnly(mahad, ['ngawur'])).toBe(false)
    expect(matchStatusOnly(mahad, ['ngawur', 'mahad'])).toBe(true)
  })

  it('field kosong/absen diperlakukan non-mukim', () => {
    expect(matchStatusOnly({ id: 9 }, ['non_mukim'])).toBe(true)
    expect(matchStatusOnly({ id: 9 }, ['mahad'])).toBe(false)
  })

  it('STATUS_SANTRI_OPTS memuat 3 status kanonik', () => {
    expect(STATUS_SANTRI_OPTS.map((o) => o.key)).toEqual(['non_mukim', 'mahad', 'fullday'])
  })
})
