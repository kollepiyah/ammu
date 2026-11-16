// Kyai 16 Nov 2026: "hari sekolah tanpa scan pulang menjadi alpa. JP dan bonus kehadiran sekolah hari
// itu juga tidak dibayar" + "guru yang scan pulang pada waktu itu (akhir Laju 1) dihitung hadir Laju 1".
import { describe, it, expect } from 'vitest'
import { shiftWajibPulang, barisEfektif, hadirSah, tanpaPulang } from '@/utils/absenPulang'
import { hitungSel, indexAbsensiHarian } from '@/utils/absensiRekap'
import { hitungBarisAutoGabungan, hitungBarisLajuDariPulang } from '@/utils/absensiMaterialize'
import { penentuShiftLaju } from '@/utils/shiftLaju'
import { deriveShift } from '@/utils/shiftDerive'
import { normalizeShift } from '@/utils/shiftMaster'

const S = {
  shiftMaster: [
    {
      id: 'pagi',
      label: 'Pagi',
      untuk: 'guru',
      urutan: 1,
      mulai: '06:30',
      terlambat: '06:45',
      selesai: '12:00'
    },
    {
      id: 'sdi_pkbm',
      label: 'SDI - PKBM',
      untuk: 'guru',
      urutan: 2,
      mulai: '07:00',
      terlambat: '07:15',
      selesai: '13:00',
      wajib_pulang: true,
      hadir_ikut: ['pagi']
    },
    {
      id: 'laju_1',
      label: 'Laju 1',
      untuk: 'guru',
      urutan: 3,
      mulai: '11:00',
      terlambat: '',
      selesai: '11:45'
    },
    {
      id: 'sore',
      label: 'Sore',
      untuk: 'guru',
      urutan: 4,
      mulai: '15:00',
      terlambat: '15:20',
      selesai: '17:15'
    }
  ],
  pondokLajuShift: { laju1: 'laju_1' }
}
const W = shiftWajibPulang(S)

describe('hadir dihitung dari absen pulang', () => {
  it('tanda tersimpan di Master Shift; hanya shift bertanda', () => {
    expect([...W]).toEqual(['sdi_pkbm'])
    expect(normalizeShift({ id: 'x', label: 'X', wajib_pulang: true }).wajib_pulang).toBe(true)
    expect(normalizeShift({ id: 'x', label: 'X' }).wajib_pulang).toBe(false)
  })
  it('tanpa pulang di hari lampau = alpa; hari ini belum; shift lain tak tersentuh', () => {
    const r = (tanggal, shift, jam_pulang = '', status = 'hadir') => ({
      tanggal,
      shift,
      status,
      jam: '07:02',
      jam_pulang
    })
    expect(barisEfektif(r('2026-11-16', 'sdi_pkbm'), W, '2026-11-17')).toMatchObject({
      status: 'alpa',
      _tanpaPulang: true
    })
    expect(barisEfektif(r('2026-11-17', 'sdi_pkbm'), W, '2026-11-17').status).toBe('hadir')
    expect(barisEfektif(r('2026-11-16', 'sdi_pkbm', '13:05'), W, '2026-11-17').status).toBe('hadir')
    expect(barisEfektif(r('2026-11-16', 'pagi'), W, '2026-11-17').status).toBe('hadir')
    expect(barisEfektif(r('2026-11-16', 'sdi_pkbm', '', 'izin'), W, '2026-11-17').status).toBe(
      'izin'
    )
    expect(hadirSah(r('2026-11-16', 'sdi_pkbm'), W)).toBe(false) // JP & bonus tak dibayar
    expect(hadirSah(r('2026-11-16', 'sdi_pkbm', '13:05', 'terlambat'), W)).toBe(true)
    expect(tanpaPulang(r('2026-11-16', 'sdi_pkbm'), new Set())).toBe(false) // tanpa tanda: perilaku lama
  })
  it('Rekap Unit: baris alpa (manual / tanpa pulang) dihitung A, bukan H', () => {
    const rows = [
      { guru_id: 'g1', shift: 'sdi_pkbm', tanggal: '2026-11-16', status: 'hadir', jam: '07:00' },
      { guru_id: 'g1', shift: 'sdi_pkbm', tanggal: '2026-11-17', status: 'alpa' },
      {
        guru_id: 'g1',
        shift: 'sdi_pkbm',
        tanggal: '2026-11-18',
        status: 'hadir',
        jam: '07:00',
        jam_pulang: '13:02'
      }
    ].map((a) => barisEfektif(a, W, '2026-11-19'))
    const sel = hitungSel(
      indexAbsensiHarian(rows),
      'g1',
      'sdi_pkbm',
      ['2026-11-16', '2026-11-17', '2026-11-18'],
      '2026-11-19'
    )
    expect([sel.H, sel.A]).toEqual([1, 2])
  })
})

describe('hadir ikut membawa jam pulang & butuh sumber yang sah', () => {
  const guru = [{ id: 'g1', nama: 'Guru Gabungan', shift_ids: ['pagi', 'sdi_pkbm'] }]
  it('baris otomatis ikut jam pulang sumber; baris lama disusul jam pulangnya', () => {
    const pagi = {
      guru_id: 'g1',
      tanggal: '2026-11-16',
      shift: 'pagi',
      status: 'hadir',
      jam: '06:40',
      jam_pulang: '13:05'
    }
    expect(hitungBarisAutoGabungan(guru, [pagi], S).map((b) => [b.shift, b.jam_pulang])).toEqual([
      ['sdi_pkbm', '13:05']
    ])
    const autoLama = {
      id: 'shift_g1_2026-11-16_sdi_pkbm',
      guru_id: 'g1',
      tanggal: '2026-11-16',
      shift: 'sdi_pkbm',
      status: 'hadir',
      jam: '06:40',
      jam_pulang: '',
      source: 'auto_gabungan'
    }
    expect(
      hitungBarisAutoGabungan(guru, [pagi, autoLama], S).map((b) => [b.id, b.jam_pulang])
    ).toEqual([['shift_g1_2026-11-16_sdi_pkbm', '13:05']])
    // baris buatan manusia tak pernah disentuh
    expect(
      hitungBarisAutoGabungan(guru, [pagi, { ...autoLama, source: 'manual_perbaikan' }], S)
    ).toEqual([])
  })
})

describe('hadir Laju dari jam pulang', () => {
  const guru = [{ id: 'g2', nama: 'Guru Pagi', shift_ids: ['pagi'] }]
  const tentukan = penentuShiftLaju({
    settings: S,
    jadwal: [{ guru_id: 'g2', tanggal: '2026-11-16', sesi: 'laju1' }]
  })
  it('scan pulang 11.30 = pulang pagi (bukan masuk Laju 1) → hadir Laju 1 diturunkan', () => {
    // shift tetap didahulukan: 11:30 jatuh di window inti Pagi
    expect(deriveShift('11:30', guru[0], S, new Set(['laju_1']))).toBe('pagi')
    const pagi = {
      guru_id: 'g2',
      tanggal: '2026-11-16',
      shift: 'pagi',
      status: 'hadir',
      jam: '06:35',
      jam_pulang: '11:30'
    }
    expect(
      hitungBarisLajuDariPulang(guru, [pagi], S, tentukan).map((b) => [b.shift, b.jam, b.source])
    ).toEqual([['laju_1', '11:30', 'auto_pulang_laju']])
  })
  it('pulang di luar jam Laju 1, hari tanpa jadwal, atau sudah ada barisnya → tidak', () => {
    const pagi = (tanggal, jam_pulang) => ({
      guru_id: 'g2',
      tanggal,
      shift: 'pagi',
      status: 'hadir',
      jam: '06:35',
      jam_pulang
    })
    expect(hitungBarisLajuDariPulang(guru, [pagi('2026-11-16', '10:15')], S, tentukan)).toEqual([])
    expect(hitungBarisLajuDariPulang(guru, [pagi('2026-11-17', '11:30')], S, tentukan)).toEqual([])
    const sudah = {
      guru_id: 'g2',
      tanggal: '2026-11-16',
      shift: 'laju_1',
      status: 'hadir',
      jam: '11:02'
    }
    expect(
      hitungBarisLajuDariPulang(guru, [pagi('2026-11-16', '11:30'), sudah], S, tentukan)
    ).toEqual([])
    expect(hitungBarisLajuDariPulang(guru, [pagi('2026-11-16', '11:30')], S)).toEqual([])
  })
})
