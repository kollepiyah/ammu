import { describe, it, expect } from 'vitest'
import { formatTanggal } from '../../src/helpers.js'

describe('formatTanggal', () => {
  it('ISO YYYY-MM-DD → DD/MM/YYYY (fast path)', () => {
    expect(formatTanggal('2025-05-14')).toBe('14/05/2025')
  })

  it('null / undefined / empty returns -', () => {
    expect(formatTanggal(null)).toBe('-')
    expect(formatTanggal(undefined)).toBe('-')
    expect(formatTanggal('')).toBe('-')
  })

  it('placeholder dash returns -', () => {
    expect(formatTanggal('-')).toBe('-')
  })

  it('invalid date string returns input as-is', () => {
    expect(formatTanggal('not-a-real-date')).toBe('not-a-real-date')
  })

  it('parseable date string (not ISO 10-char) → DD/MM/YYYY', () => {
    // Date constructor will parse "May 14, 2025"
    expect(formatTanggal('May 14, 2025')).toBe('14/05/2025')
  })

  it('Date object input → DD/MM/YYYY via string fallback', () => {
    // Date object → String() yields locale-dependent string, but constructor parses back.
    const d = new Date('2024-12-31')
    const result = formatTanggal(d)
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
  })

  it('pads single-digit day/month', () => {
    expect(formatTanggal('2025-01-05')).toBe('05/01/2025')
  })
})
