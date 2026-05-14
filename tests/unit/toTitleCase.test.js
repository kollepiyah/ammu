import { describe, it, expect } from 'vitest'
import { toTitleCase } from '../../src/helpers.js'

describe('toTitleCase', () => {
  it('Indonesian word lowercase → title', () => {
    expect(toTitleCase('mambaul ulum')).toBe('Mambaul Ulum')
  })

  it('all caps → title case', () => {
    expect(toTitleCase('PONDOK PESANTREN')).toBe('Pondok Pesantren')
  })

  it('mixed case → normalized title', () => {
    expect(toTitleCase('aHmAd FaUzI')).toBe('Ahmad Fauzi')
  })

  it('empty / null / undefined → empty string', () => {
    expect(toTitleCase('')).toBe('')
    expect(toTitleCase(null)).toBe('')
    expect(toTitleCase(undefined)).toBe('')
  })

  it('single word', () => {
    expect(toTitleCase('santri')).toBe('Santri')
  })

  it('handles multiple spaces between words (will produce empty Cap)', () => {
    // Split on single space — multiple spaces produces empty tokens which capitalize to ''
    expect(toTitleCase('foo  bar')).toBe('Foo  Bar')
  })

  it('preserves Indonesian particles (no special-casing)', () => {
    // toTitleCase capitalizes EVERY word including small particles — by design
    expect(toTitleCase('kyai gus rahman')).toBe('Kyai Gus Rahman')
  })
})
