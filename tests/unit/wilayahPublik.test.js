import { describe, it, expect } from 'vitest'
import { nilaiWilayahPublik, kegiatanUntukTamu } from '@/utils/wilayahPublik'
import { bacaModeTema, temaGelapAktif } from '@/utils/tema'

describe('nilaiWilayahPublik', () => {
  it('Android native → publik', () => {
    expect(nilaiWilayahPublik({ isNative: true })).toBe(true)
  })
  it('PWA terpasang → publik', () => {
    expect(nilaiWilayahPublik({ isStandalone: true })).toBe(true)
  })
  it('web biasa → tidak', () => {
    expect(nilaiWilayahPublik({})).toBe(false)
  })
  it('Electron tidak pernah publik, walau standalone', () => {
    expect(nilaiWilayahPublik({ isElectron: true, isStandalone: true })).toBe(false)
  })
  it('override dev menang', () => {
    expect(nilaiWilayahPublik({ paksa: 'mobile' })).toBe(true)
    expect(nilaiWilayahPublik({ isNative: true, paksa: 'desktop' })).toBe(false)
  })
})

describe('kegiatanUntukTamu', () => {
  it('agenda umum tampil, agenda guru/santri tidak', () => {
    expect(kegiatanUntukTamu({ judul: 'Haul' })).toBe(true)
    expect(kegiatanUntukTamu({ audience: 'guru' })).toBe(false)
    expect(kegiatanUntukTamu({ audience: 'santri' })).toBe(false)
  })
  it('agenda khusus lembaga tidak tampil, libur berscope tetap tampil', () => {
    expect(kegiatanUntukTamu({ lembaga: ['PTPT'] })).toBe(false)
    expect(kegiatanUntukTamu({ lembaga: [''] })).toBe(true)
    expect(kegiatanUntukTamu({ tipe: 'libur', lembaga: ['SMP'] })).toBe(true)
  })
})

describe('tema', () => {
  it('data lama darkMode dibaca jadi mode', () => {
    expect(bacaModeTema(null, '1')).toBe('gelap')
    expect(bacaModeTema(null, '0')).toBe('terang')
    expect(bacaModeTema(null, null)).toBe('terang')
    expect(bacaModeTema('otomatis', '1')).toBe('otomatis')
    expect(bacaModeTema('ngawur', '1')).toBe('gelap')
  })
  it('otomatis ikut sistem', () => {
    expect(temaGelapAktif('otomatis', true)).toBe(true)
    expect(temaGelapAktif('otomatis', false)).toBe(false)
    expect(temaGelapAktif('gelap', false)).toBe(true)
    expect(temaGelapAktif('terang', true)).toBe(false)
  })
})
