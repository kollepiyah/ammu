// Kyai, 4 Nov 2026: lulus Juz 30 PTPT tak langsung ke PPPH — masuk kelas terakhir PTPT
// "Persiapan Khotaman", lalu naik ke PPPH lewat Tes Khotaman (tanpa glondongan).
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/services/db', () => ({ setOne: vi.fn(), updateOne: vi.fn() }))

import {
  kelasPtptUntukJuz,
  isPersiapanKhotaman,
  tujuanNaikLembaga,
  itemJenjang,
  jenjangLembaga
} from '@/utils/jenjangQiraati'
import { tesJenisOptions, tesTargetOptions, tesTargetDefault } from '@/utils/tesKenaikan'
import { getKartuKenaikanSchema, DEFAULT_KARTU_KENAIKAN_PTPT } from '@/utils/kenaikan'
import { layakCeremonial, pilihKandidat } from '@/composables/useCeremonial'
import { buildKenaikanQiraatiPayload } from '@/utils/promosiKenaikan'

const KELAS_LAMA = ['1', '2', '3', '4', '5', '6']
const KELAS_BARU = [...KELAS_LAMA, 'Persiapan Khotaman']
const PPPH = { lembaga: 'PPPH', kelas: ["Level 1 (Arba'in Nawawi)", 'Level 2 (Riyadhus Sholihin)'] }
const master = (kelas) => [{ lembaga: 'PTPT', kelas }, PPPH]

describe('kelas terakhir PTPT', () => {
  it('Persiapan Khotaman dikenali dalam berbagai ejaan', () => {
    expect(isPersiapanKhotaman('Persiapan Khotaman')).toBe(true)
    expect(isPersiapanKhotaman('Kelas Persiapan Khotaman')).toBe(true)
    expect(isPersiapanKhotaman('PERSIAPAN KHOTAMAN ')).toBe(true)
    expect(isPersiapanKhotaman('Kelas 6')).toBe(false)
  })

  it('juz → kelas: Juz 30 = Persiapan Khotaman bila ada di daftar; tanpa itu tetap kelas 6', () => {
    expect(kelasPtptUntukJuz('Juz 11', KELAS_BARU)).toBe('3')
    expect(kelasPtptUntukJuz('30', KELAS_BARU)).toBe('Persiapan Khotaman')
    expect(kelasPtptUntukJuz('30', KELAS_LAMA)).toBe('6')
    expect(kelasPtptUntukJuz('', KELAS_BARU)).toBe('')
  })

  it('cadangan (master kosong) sudah memuat Persiapan Khotaman di ujung', () => {
    expect(jenjangLembaga('PTPT', []).at(-1)).toBe('Persiapan Khotaman')
  })
})

describe('lulus Juz 30 → Persiapan Khotaman, bukan PPPH', () => {
  const ajuanJuz30 = { lembaga: 'PTPT', jenis: 'juz', kelas_asal: '6', target: 'Juz 30' }

  it('dengan master baru: tidak menamatkan PTPT', () => {
    expect(tujuanNaikLembaga(ajuanJuz30, { lembagaList: master(KELAS_BARU) })).toBeNull()
  })

  it('master lama (sebelum migrasi): perilaku lama tetap — langsung PPPH', () => {
    expect(tujuanNaikLembaga(ajuanJuz30, { lembagaList: master(KELAS_LAMA) })).toEqual({
      lembaga: 'PPPH',
      kelas: "Level 1 (Arba'in Nawawi)"
    })
  })

  it('kartu: kelas 6 tetap Juz 26..30 walau master 6 kelas & kartu 7 blok', () => {
    expect(itemJenjang('PTPT', '6', { lembagaList: master(KELAS_LAMA) })).toEqual([
      'Juz 26',
      'Juz 27',
      'Juz 28',
      'Juz 29',
      'Juz 30'
    ])
  })
})

describe('Tes Khotaman → PPPH Level 1', () => {
  const santriPk = { lembaga: 'PTPT', kelas: 'Persiapan Khotaman', juz: 'JUZ 30' }

  it('santri Persiapan Khotaman diajukan Tes Khotaman, santri PTPT lain tetap juz', () => {
    expect(tesJenisOptions('PTPT', santriPk)).toEqual([
      { value: 'khotaman', label: 'Tes Khotaman' }
    ])
    expect(tesJenisOptions('PTPT', { lembaga: 'PTPT', kelas: '6' })[0].value).toBe('juz')
    expect(tesJenisOptions('PTPT')[0].value).toBe('juz')
    expect(tesTargetOptions(santriPk, 'khotaman')).toEqual(['Khotaman'])
    expect(tesTargetDefault(santriPk, 'khotaman')).toBe('Khotaman')
  })

  it('lulus Tes Khotaman menamatkan PTPT → PPPH Level 1', () => {
    const a = {
      lembaga: 'PTPT',
      jenis: 'khotaman',
      kelas_asal: 'Persiapan Khotaman',
      target: 'Khotaman'
    }
    expect(tujuanNaikLembaga(a, { lembagaList: master(KELAS_BARU) })).toEqual({
      lembaga: 'PPPH',
      kelas: "Level 1 (Arba'in Nawawi)"
    })
  })

  it('Tes Khotaman bukan kandidat ceremonial; label ceremonial juz 30 = Persiapan Khotaman', () => {
    expect(layakCeremonial({ jenis: 'khotaman', juz_asal: 'JUZ 30' })).toBe(false)
    const [k] = pilihKandidat(
      [
        {
          id: 'a',
          santri_id: 's1',
          jenis: 'juz',
          status: 'lulus',
          juz_asal: 'Juz 30',
          lembaga: 'PTPT'
        }
      ],
      new Map()
    )
    expect(k?.kelas_tujuan).toBe('Persiapan Khotaman')
  })

  it('pindah ke PPPH mencap kolom Khotaman di kartu PTPT + riwayat khotam 30 juz', () => {
    const s = {
      id: 's1',
      nama: 'Umar',
      lembaga: 'PTPT',
      kelas: 'Persiapan Khotaman',
      kartu_kenaikan: {}
    }
    const { payload } = buildKenaikanQiraatiPayload(
      s,
      { lembaga: 'PPPH', kelas: "Level 1 (Arba'in Nawawi)", tanggal: '2026-11-04' },
      { lembagaList: master(KELAS_BARU), settings: {} }
    )
    expect(payload.kartu_kenaikan.PTPT.persiapan_khotaman.khotaman).toBe('2026-11-04')
    expect(payload.riwayat.at(-1).keterangan).toMatch(/khotam Al-Qur'an 30 juz bil Ghoib/)
  })
})

describe('skema kartu PTPT', () => {
  it('bawaan memuat blok Persiapan Khotaman (item Khotaman)', () => {
    expect(DEFAULT_KARTU_KENAIKAN_PTPT.kelasList.at(-1)).toMatchObject({
      id: 'persiapan_khotaman',
      items: [{ id: 'khotaman', label: 'Khotaman' }]
    })
  })

  it('override lama (6 kelas juz) tetap dipakai, blok Persiapan Khotaman ditambahkan', () => {
    const lama = JSON.parse(JSON.stringify(DEFAULT_KARTU_KENAIKAN_PTPT))
    lama.kelasList.pop()
    lama.kelasList[0].label = 'Kelas Satu' // penanda override benar-benar dipakai
    const sch = getKartuKenaikanSchema('PTPT', { kartuKenaikanSchema: { PTPT: lama } })
    expect(sch.kelasList[0].label).toBe('Kelas Satu')
    expect(sch.kelasList.at(-1).id).toBe('persiapan_khotaman')
    expect(sch.kelasList).toHaveLength(7)
  })
})
