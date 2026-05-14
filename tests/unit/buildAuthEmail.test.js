import { describe, it, expect } from 'vitest'
import { buildAuthEmail } from '../../src/helpers.js'

describe('buildAuthEmail', () => {
  it('returns email-like string from clean username', () => {
    expect(buildAuthEmail('ahmad')).toBe('ahmad@portal-mu.local')
  })

  it('strips spaces and special chars (WA-style input)', () => {
    expect(buildAuthEmail('+62 813 1234 5678')).toBe('6281312345678@portal-mu.local')
  })

  it('lowercases mixed case', () => {
    expect(buildAuthEmail('Ahmad.Fauzi-01')).toBe('ahmad.fauzi-01@portal-mu.local')
  })

  it('returns null for empty / null / undefined input', () => {
    expect(buildAuthEmail('')).toBeNull()
    expect(buildAuthEmail(null)).toBeNull()
    expect(buildAuthEmail(undefined)).toBeNull()
  })

  it('returns null when input is only special chars', () => {
    expect(buildAuthEmail('!!! ??? @@@')).toBeNull()
  })

  it('preserves allowed punctuation [._-]', () => {
    expect(buildAuthEmail('a.b_c-d')).toBe('a.b_c-d@portal-mu.local')
  })

  it('handles unicode by stripping non-ascii', () => {
    expect(buildAuthEmail('müller')).toBe('mller@portal-mu.local')
  })
})
