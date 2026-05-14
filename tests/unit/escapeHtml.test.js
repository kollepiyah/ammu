import { describe, it, expect } from 'vitest'
import { escapeHtml } from '../../src/helpers.js'

describe('escapeHtml', () => {
  it('escapes < and > (XSS basic tag)', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes ampersand (must run first to avoid double-escape)', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
  })

  it('escapes double quote', () => {
    expect(escapeHtml('say "hi"')).toBe('say &quot;hi&quot;')
  })

  it('escapes single quote / apostrophe', () => {
    expect(escapeHtml("can't")).toBe('can&#039;t')
  })

  it('blocks XSS attribute breakout — angle brackets + quotes escaped', () => {
    // Tujuan escapeHtml: rusak syntactic structure HTML, bukan match string mentah.
    // Setelah < dan " di-escape, "onerror" jadi text biasa, tidak parsed sbg attr.
    const payload = '"><img src=x onerror=alert(1)>'
    const result = escapeHtml(payload)
    expect(result).not.toContain('<')
    expect(result).not.toContain('>')
    expect(result).not.toMatch(/[^&]"/) // raw quote (not entity prefix) absent
    expect(result).toContain('&lt;img')
    expect(result).toContain('&quot;')
  })

  it('handles null / undefined safely', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })

  it('handles non-string by coercion', () => {
    expect(escapeHtml(123)).toBe('123')
    expect(escapeHtml(true)).toBe('true')
  })

  it('preserves safe Indonesian characters', () => {
    expect(escapeHtml('Ahmad — santri')).toBe('Ahmad — santri')
  })
})
