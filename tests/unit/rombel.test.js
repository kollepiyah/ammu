// Rombel sebagai entitas (Kyai, 17 Nov 2026). Kasus yang diceritakan Kyai dipakai apa adanya
// sebagai tes: Siti mengajar pagi, Indah sore, satu rombel; Ahmad ikut sore saja sehingga
// hanya guru_sore-nya terisi — dan selama ini Ahmad hilang dari akun Siti.
import { describe, it, expect } from 'vitest'
import {
  slotGuruSantri,
  kunciPasangan,
  labelRombel,
  rombelPunyaGuru,
  petaRombel,
  petaKunciRombel,
  rombelSantri,
  pasanganLengkap,
  konteksRombel,
  usulRombelDariSantri
} from '@/utils/rombel'
import { ownsNgaji } from '@/utils/guruScope'
import { kelasKeyQiraati } from '@/utils/kelasHitung'

const S = (id, extra = {}) => ({ id, lembaga: 'TPQ Pagi', ...extra })

describe('slotGuruSantri', () => {
  it('membaca dua slot apa adanya', () => {
    expect(slotGuruSantri({ guru_pagi: 'Siti', guru_sore: 'Indah' })).toEqual({
      pagi: 'Siti',
      sore: 'Indah'
    })
  })

  it('santri sore saja: slot pagi memang kosong, bukan diisi paksa', () => {
    expect(slotGuruSantri({ guru_sore: 'Indah' })).toEqual({ pagi: '', sore: 'Indah' })
  })

  it('field lama `guru` dianggap guru pagi hanya bila dua slot kosong', () => {
    expect(slotGuruSantri({ guru: 'Umar' })).toEqual({ pagi: 'Umar', sore: '' })
    expect(slotGuruSantri({ guru: 'Umar', guru_sore: 'Indah' })).toEqual({
      pagi: '',
      sore: 'Indah'
    })
  })
})

describe('kunciPasangan & labelRombel', () => {
  it('kunci tak peduli huruf besar dan spasi', () => {
    expect(kunciPasangan(' SITI ', 'Indah')).toBe('siti||indah')
    expect(kunciPasangan('', '')).toBe('')
  })

  it('label terbaca sesuai isi slotnya', () => {
    expect(labelRombel({ guru_pagi: 'Siti', guru_sore: 'Indah' })).toBe('Siti + Indah')
    expect(labelRombel({ guru_pagi: 'Siti' })).toBe('Siti (Pagi)')
    expect(labelRombel({ guru_sore: 'Indah' })).toBe('Indah (Sore)')
    expect(labelRombel({ guru_pagi: 'Siti', guru_sore: 'Siti' })).toBe('Siti (Pagi-Sore)')
    expect(labelRombel({})).toBe('(tanpa guru)')
  })

  it('nama yang diberi Kyai mengalahkan label turunan', () => {
    expect(labelRombel({ nama: 'Kelas Melati', guru_pagi: 'Siti' })).toBe('Kelas Melati')
  })
})

describe('rombelPunyaGuru', () => {
  const r = { guru_pagi: 'Siti', guru_sore: 'Indah' }
  it('kedua slot dihitung sebagai pengampu', () => {
    expect(rombelPunyaGuru(r, 'Siti')).toBe(true)
    expect(rombelPunyaGuru(r, 'indah')).toBe(true)
    expect(rombelPunyaGuru(r, 'Ani')).toBe(false)
    expect(rombelPunyaGuru(r, '')).toBe(false)
  })
})

describe('rombelSantri', () => {
  const rombel = [{ id: 'r1', lembaga: 'TPQ Pagi', guru_pagi: 'Siti', guru_sore: 'Indah' }]
  const peta = petaRombel(rombel)
  const petaK = petaKunciRombel(rombel)

  it('memakai rombel_id kalau sudah ditunjuk', () => {
    expect(rombelSantri(S('a', { rombel_id: 'r1' }), peta, petaK)?.id).toBe('r1')
  })

  it('data lama tanpa rombel_id masih ketemu lewat pasangan gurunya', () => {
    const s = S('b', { guru_pagi: 'Siti', guru_sore: 'Indah' })
    expect(rombelSantri(s, peta, petaK)?.id).toBe('r1')
  })

  it('rombel_id yang menunjuk entah ke mana jatuh ke pencocokan nama', () => {
    const s = S('c', { rombel_id: 'hilang', guru_pagi: 'Siti', guru_sore: 'Indah' })
    expect(rombelSantri(s, peta, petaK)?.id).toBe('r1')
  })

  it('santri tanpa guru tidak dipaksa masuk rombel mana pun', () => {
    expect(rombelSantri(S('d'), peta, petaK)).toBeNull()
  })

  it('lembaga ikut menentukan — nama guru sama di lembaga lain bukan rombel yang sama', () => {
    const s = S('e', { lembaga: 'TPQ Sore', guru_pagi: 'Siti', guru_sore: 'Indah' })
    expect(rombelSantri(s, peta, petaK)).toBeNull()
  })
})

describe('jalur baca: Ahmad akhirnya terlihat oleh Siti', () => {
  const rombel = [{ id: 'r1', lembaga: 'TPQ Pagi', guru_pagi: 'Siti', guru_sore: 'Indah' }]
  const ctx = konteksRombel(rombel)
  const ahmad = S('ahmad', { rombel_id: 'r1', guru_sore: 'Indah' })
  const budi = S('budi', { rombel_id: 'r1', guru_pagi: 'Siti', guru_sore: 'Indah' })

  it('pasanganLengkap mengisi slot yang kosong dari rombelnya', () => {
    expect(pasanganLengkap(ahmad, rombel[0])).toEqual({ pagi: 'Siti', sore: 'Indah' })
  })

  it('pasanganLengkap TIDAK menimpa slot yang sudah terisi', () => {
    const beda = S('x', { guru_pagi: 'Ani', guru_sore: 'Indah' })
    expect(pasanganLengkap(beda, rombel[0])).toEqual({ pagi: 'Ani', sore: 'Indah' })
  })

  it('ownsNgaji dengan konteks: Siti kini melihat Ahmad', () => {
    expect(ownsNgaji(ahmad, 'Siti')).toBe(false) // perilaku lama, tanpa konteks
    expect(ownsNgaji(ahmad, 'Siti', ctx)).toBe(true)
    expect(ownsNgaji(ahmad, 'Indah', ctx)).toBe(true)
    expect(ownsNgaji(ahmad, 'Ani', ctx)).toBe(false)
  })

  it('tanpa konteks, perilaku lama tak berubah sedikit pun', () => {
    expect(ownsNgaji(budi, 'Siti')).toBe(true)
    expect(ownsNgaji(S('z', { guru: 'Umar' }), 'Umar')).toBe(true)
  })

  it('Ahmad dan Budi kini satu kunci kelas, bukan dua', () => {
    expect(kelasKeyQiraati(ahmad)).not.toBe(kelasKeyQiraati(budi))
    expect(kelasKeyQiraati(ahmad, ctx)).toBe(kelasKeyQiraati(budi, ctx))
    expect(kelasKeyQiraati(ahmad, ctx)).toBe('siti||indah')
  })

  it('santri tanpa rombel tetap memakai aturan lama walau konteks diberikan', () => {
    const lepas = S('lepas', { lembaga: 'TPQ Sore', guru_pagi: 'Umar' })
    expect(kelasKeyQiraati(lepas, ctx)).toBe('umar||')
    expect(ownsNgaji(lepas, 'Umar', ctx)).toBe(true)
  })
})

describe('usulRombelDariSantri — kasus Kyai', () => {
  it('Ahmad yang hanya punya guru sore ikut ke rombel Siti + Indah', () => {
    const santri = [
      S('budi', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('cahya', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('ahmad', { guru_sore: 'Indah' })
    ]
    const { usul, ambigu } = usulRombelDariSantri(santri)
    expect(usul).toHaveLength(1)
    expect(usul[0].nama).toBe('Siti + Indah')
    expect(usul[0].santriIds.sort()).toEqual(['ahmad', 'budi', 'cahya'])
    expect(ambigu).toEqual([])
  })

  it('santri pagi saja juga ikut ke pasangan lengkap yang cocok', () => {
    const santri = [
      S('budi', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('dina', { guru_pagi: 'Siti' })
    ]
    const { usul } = usulRombelDariSantri(santri)
    expect(usul).toHaveLength(1)
    expect(usul[0].santriIds.sort()).toEqual(['budi', 'dina'])
  })

  it('TIDAK menebak kalau gurunya berpasangan dengan dua orang — dilaporkan ambigu', () => {
    const santri = [
      S('budi', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('cahya', { guru_pagi: 'Ani', guru_sore: 'Indah' }),
      S('ahmad', { guru_sore: 'Indah' })
    ]
    const { usul, ambigu } = usulRombelDariSantri(santri)
    expect(usul.map((u) => u.nama).sort()).toEqual(['Ani + Indah', 'Indah (Sore)', 'Siti + Indah'])
    expect(ambigu).toHaveLength(1)
    expect(ambigu[0]).toMatchObject({ guru: 'Indah', slot: 'sore', jumlahSantri: 1 })
    expect(ambigu[0].calon.sort()).toEqual(['Ani + Indah', 'Siti + Indah'])
  })

  it('tak ada pasangan lengkap yang cocok → berdiri sendiri, bukan ambigu', () => {
    const { usul, ambigu } = usulRombelDariSantri([S('ahmad', { guru_sore: 'Indah' })])
    expect(usul.map((u) => u.nama)).toEqual(['Indah (Sore)'])
    expect(ambigu).toEqual([])
  })

  it('slot harus sama — guru sore tidak dilebur ke pasangan yang memuatnya di slot pagi', () => {
    const santri = [
      S('budi', { guru_pagi: 'Indah', guru_sore: 'Siti' }),
      S('ahmad', { guru_sore: 'Indah' })
    ]
    const { usul } = usulRombelDariSantri(santri)
    expect(usul.map((u) => u.nama).sort()).toEqual(['Indah (Sore)', 'Indah + Siti'])
  })

  it('lembaga berbeda tak pernah dilebur walau namanya sama', () => {
    const santri = [
      S('budi', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('ahmad', { lembaga: 'TPQ Sore', guru_sore: 'Indah' })
    ]
    const { usul } = usulRombelDariSantri(santri)
    expect(usul).toHaveLength(2)
  })

  it('santri tanpa guru sama sekali dilewati', () => {
    const { usul } = usulRombelDariSantri([S('x'), S('y', { guru_pagi: '  ' })])
    expect(usul).toEqual([])
  })

  it('satu santri tak terhitung dua kali walau datanya kembar', () => {
    const santri = [
      S('budi', { guru_pagi: 'Siti', guru_sore: 'Indah' }),
      S('budi', { guru_sore: 'Indah' })
    ]
    const { usul } = usulRombelDariSantri(santri)
    expect(usul[0].santriIds).toEqual(['budi'])
  })

  it('aman dengan daftar kosong', () => {
    expect(usulRombelDariSantri([])).toEqual({ usul: [], ambigu: [] })
    expect(usulRombelDariSantri(null)).toEqual({ usul: [], ambigu: [] })
  })
})
