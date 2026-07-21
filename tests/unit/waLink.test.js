// v.1.1.9 — tautan wa.me untuk kontak penyimak & guru kelas di menu Glondongan
// (Kyai 21 Jul: "saya ingin tertera no WA penyimak, guru kelas, dan santri").
//
// wa.me minta format internasional TANPA '+'. Nomor di DB tersimpan lokal ('0812…'),
// ada juga yang '+62…' / '62…' / berspasi — semuanya harus jadi tautan yang benar,
// dan nomor sampah harus jadi '' supaya UI menampilkan "no WA belum diisi", bukan
// tautan rusak.
import { describe, it, expect } from 'vitest'
import { waLink } from '@/utils/format'

describe('waLink', () => {
  it('nomor lokal 08… → 62…', () => {
    expect(waLink('081234567890')).toBe('https://wa.me/6281234567890')
  })

  it('sudah 62 / +62 tidak jadi dobel', () => {
    expect(waLink('6281234567890')).toBe('https://wa.me/6281234567890')
    expect(waLink('+6281234567890')).toBe('https://wa.me/6281234567890')
  })

  it('spasi, strip, kurung dibersihkan', () => {
    expect(waLink('0812-3456 7890')).toBe('https://wa.me/6281234567890')
    expect(waLink('(0812) 3456 7890')).toBe('https://wa.me/6281234567890')
  })

  it('tanpa awalan 0 tetap dianggap nomor lokal', () => {
    // normalizeWA menambah '0' di depan (keputusan lama: "auto tambah 0").
    expect(waLink('81234567890')).toBe('https://wa.me/6281234567890')
  })

  it('kosong / sampah / terlalu pendek → "" (UI tampilkan "belum diisi")', () => {
    expect(waLink('')).toBe('')
    expect(waLink(null)).toBe('')
    expect(waLink(undefined)).toBe('')
    expect(waLink('-')).toBe('')
    expect(waLink('0812')).toBe('') // < 8 digit
  })

  it('pesan awal ikut di-encode', () => {
    expect(waLink('081234567890', 'Assalamu alaikum & terima kasih')).toBe(
      'https://wa.me/6281234567890?text=Assalamu%20alaikum%20%26%20terima%20kasih'
    )
  })

  it('tanpa pesan tidak menambahkan ?text kosong', () => {
    expect(waLink('081234567890', '')).toBe('https://wa.me/6281234567890')
  })
})
