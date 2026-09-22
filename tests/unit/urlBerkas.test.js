// urlBerkas — URL Firebase Storage proyek lama dianggap mati di titik tampil & cetak.
//
// 22 Sep 2026: bucket portal-mambaul-ulum menjawab 402 untuk tiap berkas. Rantai
// cadangan di kode (`kop_logo || logoKop || '/logo.png'`, `v-if="foto"` lalu ikon)
// berhenti di nilai TIDAK KOSONG pertama, jadi URL mati tak pernah jatuh ke
// cadangannya. Yang dijaga di sini: URL mati → '' (cadangan jalan), selain itu utuh.
import { describe, it, expect } from 'vitest'
import { berkasMati, urlBerkas, pilihBerkas } from '@/utils/urlBerkas'

// Bentuk asli dari master/lembaga produksi (dibaca 22 Sep 2026).
const FB_BARU =
  'https://firebasestorage.googleapis.com/v0/b/portal-mambaul-ulum.firebasestorage.app/o/lembaga_logos%2Fkop_PTPT_1780208570506.png?alt=media'
const FB_APPSPOT =
  'https://firebasestorage.googleapis.com/v0/b/portal-mambaul-ulum.appspot.com/o/profil_foto%2Fguru_7.jpg?alt=media&token=abc'
const SUPABASE =
  'https://rzwefjilxzsqlokkwiyt.supabase.co/storage/v1/object/public/branding/app_logos/logoQiraati_1780208574946.png'

describe('berkasMati', () => {
  it('KUNCI: kedua bentuk bucket Firebase proyek lama = mati', () => {
    expect(berkasMati(FB_BARU)).toBe(true)
    expect(berkasMati(FB_APPSPOT)).toBe(true)
    expect(berkasMati('  ' + FB_BARU + '  ')).toBe(true)
  })

  it('Supabase, aset lokal, data URL, dan Firebase proyek LAIN tidak dianggap mati', () => {
    expect(berkasMati(SUPABASE)).toBe(false)
    expect(berkasMati('/logo.png')).toBe(false)
    expect(berkasMati('data:image/png;base64,AAAA')).toBe(false)
    expect(
      berkasMati('https://firebasestorage.googleapis.com/v0/b/proyek-lain.appspot.com/o/x.png')
    ).toBe(false)
  })

  it('nilai kosong / bukan teks → false (bukan "mati", memang tak ada)', () => {
    for (const v of ['', null, undefined, 0, {}, []]) expect(berkasMati(v)).toBe(false)
  })
})

describe('urlBerkas', () => {
  it('URL mati → kosong, supaya `v-if` jatuh ke ikon', () => {
    expect(urlBerkas(FB_BARU)).toBe('')
  })

  it('URL hidup dikembalikan utuh (dipangkas spasinya)', () => {
    expect(urlBerkas(SUPABASE)).toBe(SUPABASE)
    expect(urlBerkas(` ${SUPABASE}\n`)).toBe(SUPABASE)
    expect(urlBerkas('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })

  it('bukan teks → kosong, tak melempar', () => {
    for (const v of [null, undefined, 42, {}, ['x']]) expect(urlBerkas(v)).toBe('')
  })
})

describe('pilihBerkas', () => {
  it('KUNCI: logo lembaga mati → logo pondok (kasus kop rapor PTPT)', () => {
    expect(pilihBerkas(FB_BARU, SUPABASE, '/logo.png')).toBe(SUPABASE)
  })

  it('semua kandidat mati/kosong → cadangan statis terakhir', () => {
    expect(pilihBerkas(FB_BARU, '', null, FB_APPSPOT, '/logo.png')).toBe('/logo.png')
  })

  it('kandidat hidup pertama menang — urutan prioritas dipertahankan', () => {
    expect(pilihBerkas(SUPABASE, '/logo.png')).toBe(SUPABASE)
    expect(pilihBerkas('', '/logo.png', SUPABASE)).toBe('/logo.png')
  })

  it('tak ada kandidat sama sekali → kosong', () => {
    expect(pilihBerkas()).toBe('')
    expect(pilihBerkas(FB_BARU)).toBe('')
  })
})
