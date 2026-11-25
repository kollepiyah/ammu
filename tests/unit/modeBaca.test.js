import { describe, it, expect } from 'vitest'
import { ketukDiTengah, rapikanSetelanBaca } from '@/utils/modeBaca'

describe('mode baca layar penuh', () => {
  it('ketukan di tengah mengalihkan kontrol, di pita atas/bawah 20% tidak', () => {
    expect(ketukDiTengah(400, 800)).toBe(true)
    expect(ketukDiTengah(100, 800)).toBe(false)
    expect(ketukDiTengah(700, 800)).toBe(false)
    expect(ketukDiTengah(undefined, 800)).toBe(false)
    expect(ketukDiTengah(400, 0)).toBe(false)
  })
  it('layar tetap menyala bawaan aktif; nilai salah dirapikan', () => {
    expect(rapikanSetelanBaca({})).toEqual({ tetapMenyala: true })
    expect(rapikanSetelanBaca({ tetapMenyala: false })).toEqual({ tetapMenyala: false })
    expect(rapikanSetelanBaca({ tetapMenyala: 'tidak' })).toEqual({ tetapMenyala: true })
  })
})
