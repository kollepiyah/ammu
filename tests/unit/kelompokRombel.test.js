// Tes utils/kelompokRombel — pengelompokan per rombel guru untuk PDF Data Santri & Data Kelas.
// Keluhan Kyai 15 Nov 2026: PDF dashboard "masih berantakan kolom juz dan kolom kelasnya"
// ('Kelas 1, 2, Kelas 1', 'JUZ 4' bercampur '5'), dan PDF Data Santri tak dikelompokkan
// per guru kelas — terutama kelas 2 yang guru pagi & sorenya berbeda.
import { describe, it, expect } from 'vitest'
import {
  kelompokRombel,
  labelKelasSantri,
  labelGuruRombel
} from '../../vue-app/src/utils/kelompokRombel'

const S = (id, nama, o = {}) => ({ id, nama, lembaga: 'PTPT', aktif: true, ...o })

describe('kelompokRombel — sisi ngaji', () => {
  const list = [
    S(1, 'Zaid', { kelas: 'Kelas 1', guru_pagi: 'Nur Faizah', guru_sore: 'Nur Fais Zalillah' }),
    S(2, 'Ahmad', { kelas: '2', guru_pagi: 'Nur Faizah', guru_sore: 'Nur Fais Zalillah' }),
    S(3, 'Aqila', { kelas: '1', guru_sore: 'Nur Fais Zalillah', shift_ngaji: 'sore' }),
    S(4, 'Budi', {
      kelas: '1',
      guru_pagi: 'Ikrimatul Alifiyah, S.Pd., Gr.',
      guru_sore: 'Ikrimatul Alifiyah, S.Pd., Gr.'
    }),
    S(5, 'Malik', { kelas: '1' })
  ]
  const g = kelompokRombel(list)

  it('pasangan pagi/sore beda guru = SATU kelompok; santri sore-saja menempel', () => {
    const pas = g.find((x) => x.guruLabel === 'Pagi: Nur Faizah · Sore: Nur Fais Zalillah')
    expect(pas.santri.map((s) => s.nama)).toEqual(['Ahmad', 'Aqila', 'Zaid'])
  })

  it('label kelas kanonik & tak dobel: "Kelas 1 & 2", bukan "Kelas 1, 2, Kelas 1"', () => {
    const pas = g.find((x) => x.guruLabel.startsWith('Pagi: Nur Faizah'))
    expect(pas.kelas).toBe('Kelas 1 & 2')
    const ikr = g.find((x) => x.guruLabel.includes('Ikrimatul'))
    expect(ikr.kelas).toBe('Kelas 1')
    expect(ikr.guruLabel).toBe('Guru Pagi/Sore: Ikrimatul Alifiyah, S.Pd., Gr.')
  })

  it('santri tanpa guru tetap tampil tapi tak dihitung', () => {
    const kosong = g.find((x) => !x.dihitung)
    expect(kosong.guruLabel).toBe('— belum ada guru —')
    expect(kosong.santri.map((s) => s.nama)).toEqual(['Malik'])
  })
})

describe('kelompokRombel — sisi sekolah', () => {
  it('dikelompokkan per himpunan guru_sekolah, kelas romawi diberi awalan', () => {
    const g = kelompokRombel(
      [
        { id: 1, nama: 'A', lembaga_sekolah: 'SDI', kelas_sekolah: 'II', guru_sekolah: ['Bu X'] },
        { id: 2, nama: 'B', lembaga_sekolah: 'SDI', kelas_sekolah: 'II', guru_sekolah: ['Bu X'] }
      ],
      { sekolah: true }
    )
    expect(g).toHaveLength(1)
    expect(g[0].kelas).toBe('Kelas II')
    expect(g[0].guruLabel).toBe('Guru: Bu X')
  })
})

describe('labelKelasSantri & labelGuruRombel', () => {
  it("'1' dan 'Kelas 1' PTPT keluar sama", () => {
    expect(labelKelasSantri({ lembaga: 'PTPT', kelas: '1' }, false)).toBe(
      labelKelasSantri({ lembaga: 'PTPT', kelas: 'Kelas 1' }, false)
    )
  })
  it('guru lama (field `guru`) tetap berlabel', () => {
    expect(labelGuruRombel({ guruLegacy: 'Ust. A' })).toBe('Guru: Ust. A')
  })
})
