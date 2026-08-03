// v.1.2.6 (Kyai): whitelist status santri untuk targeting jenis pembayaran (syahriyah).
//   Non-mukim = bukan mukim & bukan fullday; Ma'had = is_mukim; Fullday = is_fullday.
//   Kosong = berlaku semua; antar-status OR.
import { describe, it, expect } from 'vitest'
import {
  matchStatusOnly,
  STATUS_SANTRI_OPTS,
  matchJenisKelamin,
  JK_OPTS,
  matchShiftNgaji,
  SHIFT_NGAJI_OPTS
} from '@/utils/statusSantri'

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

describe('matchJenisKelamin', () => {
  const putra = { id: 1, jk: 'L' }
  const putri = { id: 2, jk: 'P' }

  it('whitelist kosong / bukan array → semua jenis kelamin cocok', () => {
    expect(matchJenisKelamin(putra, [])).toBe(true)
    expect(matchJenisKelamin(putri, undefined)).toBe(true)
    expect(matchJenisKelamin(putra, null)).toBe(true)
  })

  it("whitelist ['L'] cocok hanya Putra", () => {
    expect(matchJenisKelamin(putra, ['L'])).toBe(true)
    expect(matchJenisKelamin(putri, ['L'])).toBe(false)
  })

  it("whitelist ['P'] cocok hanya Putri", () => {
    expect(matchJenisKelamin(putri, ['P'])).toBe(true)
    expect(matchJenisKelamin(putra, ['P'])).toBe(false)
  })

  it("['L','P'] cocok keduanya", () => {
    expect(matchJenisKelamin(putra, ['L', 'P'])).toBe(true)
    expect(matchJenisKelamin(putri, ['L', 'P'])).toBe(true)
  })

  it('case-insensitive & jk absen tak cocok bila whitelist non-kosong', () => {
    expect(matchJenisKelamin({ id: 3, jk: 'l' }, ['L'])).toBe(true)
    expect(matchJenisKelamin({ id: 4 }, ['L'])).toBe(false)
  })

  it('JK_OPTS memuat Putra(L) & Putri(P)', () => {
    expect(JK_OPTS.map((o) => o.key)).toEqual(['L', 'P'])
    expect(JK_OPTS.map((o) => o.label)).toEqual(['Putra', 'Putri'])
  })
})

// Kyai 4 Agu 2026: "syahriyah pagi untuk ngaji pagi, syahriyah sore untuk sore".
// Pagar terpenting di sini = shift KOSONG dianggap ikut KEDUANYA. `shift_ngaji` baru terisi
// 30% (155/524) dan sisanya dikoreksi guru kelas belakangan; kalau kosong dianggap "tidak
// cocok", 70% santri kehilangan tagihan ngaji — pemasukan hilang, jauh lebih berbahaya
// daripada tagihan kembar yang sekarang disaring TU.
describe('matchShiftNgaji — whitelist shift ngaji pada jenis pembayaran', () => {
  it('whitelist kosong = berlaku semua shift', () => {
    expect(matchShiftNgaji({ shift_ngaji: 'pagi' }, [])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'sore' }, null)).toBe(true)
    expect(matchShiftNgaji({}, undefined)).toBe(true)
  })

  it('cocok sesuai shift santri', () => {
    expect(matchShiftNgaji({ shift_ngaji: 'pagi' }, ['pagi'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'pagi' }, ['sore'])).toBe(false)
    expect(matchShiftNgaji({ shift_ngaji: 'sore' }, ['sore'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'sore' }, ['pagi'])).toBe(false)
  })

  it("'pagi_sore' cocok untuk dua-duanya (santri ikut dua sesi)", () => {
    expect(matchShiftNgaji({ shift_ngaji: 'pagi_sore' }, ['pagi'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'pagi_sore' }, ['sore'])).toBe(true)
  })

  it('shift KOSONG/ambigu dianggap ikut keduanya (jangan sampai tagihan hilang)', () => {
    expect(matchShiftNgaji({ shift_ngaji: '' }, ['pagi'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: '' }, ['sore'])).toBe(true)
    expect(matchShiftNgaji({}, ['pagi'])).toBe(true)
    expect(matchShiftNgaji(null, ['sore'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'entah' }, ['pagi'])).toBe(true)
  })

  it('case-insensitive & nilai whitelist aneh diabaikan', () => {
    expect(matchShiftNgaji({ shift_ngaji: 'PAGI' }, ['pagi'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'Sore' }, ['SORE'])).toBe(true)
    expect(matchShiftNgaji({ shift_ngaji: 'pagi' }, ['malam'])).toBe(false)
  })

  it('SHIFT_NGAJI_OPTS memuat pagi & sore', () => {
    expect(SHIFT_NGAJI_OPTS.map((o) => o.key)).toEqual(['pagi', 'sore'])
  })
})
