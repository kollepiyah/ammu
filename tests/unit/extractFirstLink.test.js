import { describe, it, expect } from 'vitest'
import { extractFirstLink } from '../../src/helpers.js'

describe('extractFirstLink', () => {
  it('extracts basic https URL', () => {
    expect(extractFirstLink('lihat di https://portal-mu.web.app')).toBe('https://portal-mu.web.app')
  })

  it('extracts http (insecure) URL', () => {
    expect(extractFirstLink('legacy http://example.com')).toBe('http://example.com')
  })

  it('strips trailing punctuation (sentence terminator)', () => {
    expect(extractFirstLink('Klik https://google.com.')).toBe('https://google.com')
    expect(extractFirstLink('Apa: https://google.com?')).toBe('https://google.com')
    expect(extractFirstLink('Wow https://google.com!')).toBe('https://google.com')
  })

  it('returns first link only when multiple present', () => {
    expect(extractFirstLink('a https://first.com and b https://second.com')).toBe(
      'https://first.com'
    )
  })

  it('returns null when no link', () => {
    expect(extractFirstLink('no link here')).toBeNull()
  })

  it('returns null for empty / null / undefined', () => {
    expect(extractFirstLink('')).toBeNull()
    expect(extractFirstLink(null)).toBeNull()
    expect(extractFirstLink(undefined)).toBeNull()
  })

  it('strips trailing closing brackets', () => {
    expect(extractFirstLink('Lihat (https://example.com)')).toBe('https://example.com')
  })

  it('handles URL with query string and path', () => {
    expect(extractFirstLink('Check https://app.com/path?q=1&t=2 ya')).toBe(
      'https://app.com/path?q=1&t=2'
    )
  })

  it('case-insensitive scheme matching', () => {
    expect(extractFirstLink('HTTPS://example.com')).toBe('HTTPS://example.com')
  })
})
