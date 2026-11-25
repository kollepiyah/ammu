import { describe, it, expect, vi, beforeEach } from 'vitest'
import { uraiNominatim, uraiBigDataCloud, cariNamaTempat } from '@/services/namaTempat'
import {
  detikMenuju,
  formatHitungMundur,
  namaTempatPendek,
  namaTempatPanjang,
  LOKASI_PESANTREN
} from '@/utils/waktuSholat'
import { formatHijriLatin, NAMA_BULAN_HIJRI } from '@/utils/hijri'

// Jawaban sungguhan layanan peta untuk titik pesantren (dicek 25 Nov 2026).
const NOMINATIM = {
  village: 'Kedungrejo',
  municipality: 'Waru',
  county: 'Sidoarjo',
  state: 'Jawa Timur',
  country: 'Indonesia'
}
const BDC = {
  locality: 'Waru',
  city: 'Waru',
  localityInfo: {
    administrative: [
      { adminLevel: 4, name: 'Jawa Timur' },
      { adminLevel: 5, name: 'Sidoarjo' },
      { adminLevel: 6, name: 'Waru' }
    ]
  }
}

describe('urai jawaban layanan peta', () => {
  it('Nominatim → desa, kecamatan, kabupaten', () => {
    expect(uraiNominatim(NOMINATIM)).toEqual({
      desa: 'Kedungrejo',
      kecamatan: 'Waru',
      kabupaten: 'Sidoarjo'
    })
    expect(uraiNominatim({ county: 'Kabupaten Gresik' }).kabupaten).toBe('Gresik')
    expect(uraiNominatim(null)).toBeNull()
  })
  it('BigDataCloud → kecamatan (tanpa desa)', () => {
    expect(uraiBigDataCloud(BDC)).toEqual({ desa: '', kecamatan: 'Waru', kabupaten: 'Sidoarjo' })
    expect(uraiBigDataCloud({})).toBeNull()
  })
})

describe('cariNamaTempat', () => {
  beforeEach(() => localStorage.clear())
  it('koordinat dibulatkan, jawaban disimpan — titik yang sama tak bertanya lagi', async () => {
    const fetchPalsu = vi.fn(async () => ({ ok: true, json: async () => ({ address: NOMINATIM }) }))
    vi.stubGlobal('fetch', fetchPalsu)
    const a = await cariNamaTempat(-7.35213, 112.72904)
    const b = await cariNamaTempat(-7.3519, 112.7291) // titik bulat sama
    expect(a).toEqual(b)
    expect(fetchPalsu).toHaveBeenCalledTimes(1)
    const url = fetchPalsu.mock.calls[0][0]
    expect(url).toContain('lat=-7.35&')
    expect(url).toContain('lon=112.73')
    vi.unstubAllGlobals()
  })
  it('Nominatim gagal → cadangan BigDataCloud; semua gagal → null', async () => {
    const fetchPalsu = vi.fn(async (url) =>
      url.includes('nominatim') ? { ok: false } : { ok: true, json: async () => BDC }
    )
    vi.stubGlobal('fetch', fetchPalsu)
    expect((await cariNamaTempat(-7.4, 112.7)).kecamatan).toBe('Waru')
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false }))
    )
    expect(await cariNamaTempat(-8, 113)).toBeNull()
    vi.unstubAllGlobals()
  })
})

describe('label tempat & hitung mundur', () => {
  it('kartu Beranda = desa; layar jadwal = desa, kecamatan', () => {
    expect(namaTempatPendek(LOKASI_PESANTREN)).toBe('Panjunan')
    expect(namaTempatPanjang(LOKASI_PESANTREN)).toBe('Panjunan, Waru')
    expect(namaTempatPendek({ nama: 'Surabaya' })).toBe('Surabaya')
    expect(namaTempatPanjang({ nama: 'Lokasi HP' })).toBe('Lokasi HP')
  })
  it('detik menuju waktu berikutnya (hari ini & besok)', () => {
    const kini = new Date(2026, 10, 25, 17, 50, 48)
    expect(detikMenuju({ menit: 18 * 60 + 48, besok: false }, kini)).toBe(57 * 60 + 12)
    expect(detikMenuju({ menit: 3 * 60 + 40, besok: true }, kini)).toBe((9 * 60 + 49) * 60 + 12)
  })
  it('format gaya NU Online', () => {
    expect(formatHitungMundur(3432)).toBe('− 00 : 57 : 12')
    expect(formatHitungMundur(3669)).toBe('− 01 : 01 : 09')
  })
  it('Hijriah Latin memakai daftar bulan bersama', () => {
    expect(NAMA_BULAN_HIJRI).toHaveLength(12)
    expect(formatHijriLatin(new Date(2026, 10, 25), 0)).toMatch(/^\d{1,2} \S.* 144\d$/)
  })
})
