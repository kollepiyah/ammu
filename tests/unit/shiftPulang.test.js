// Kyai (22 Jul 2026): "saya sudah mengatur jam masuk dan pulang di aplikasi per shift.
// jadi harusnya kalau shift pagi itu berbeda dg shift sore, guru yg sudah ceklok pulang
// shift pagi di riwayat absen masih tertulis belum pulang."
//
// Akar bug: window masuk sebuah shift membentang `mulai`..`selesai` (supaya yang datang
// telat tetap tercatat hadir). Ceklok pulang SEBELUM shift bubar karena itu masih jatuh
// di dalam window shift-nya sendiri → dulu dibuang (kalah dari scan terawal) dan tak
// pernah sampai ke pass pulang. Aturan baru: pulang menempel ke shift yang PALING
// BELAKANGAN dimasuki, tanpa syarat shift-nya sudah bubar.
import { describe, it, expect } from 'vitest'
import { pilihShiftPulang, MIN_JEDA_PULANG_MENIT } from '@/utils/shiftDerive'

// Shift pagi & sore sengaja dibikin BEDA jam (kasus yang dilaporkan Kyai).
// `sekolah` dipakai menguji baris gabungan (jam masuknya menyalin scan ngaji pagi).
const SET = {
  shiftMaster: [
    {
      id: 'pagi',
      label: 'Pagi',
      untuk: 'guru',
      urutan: 1,
      mulai: '06:00',
      terlambat: '06:30',
      selesai: '12:00'
    },
    {
      id: 'sekolah',
      label: 'Sekolah',
      untuk: 'guru',
      urutan: 3,
      mulai: '06:30',
      terlambat: '07:00',
      selesai: '13:00'
    },
    {
      id: 'sore',
      label: 'Sore',
      untuk: 'guru',
      urutan: 4,
      mulai: '15:00',
      terlambat: '15:30',
      selesai: '17:00'
    }
  ]
}

describe('pilihShiftPulang — sasaran jam pulang', () => {
  it('BUG KYAI: pulang sebelum shift bubar tetap tercatat', () => {
    const baris = [{ shift: 'pagi', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('11:50', baris, SET)).toEqual(['pagi'])
  })

  it('pulang setelah shift bubar tetap tercatat (perilaku lama tak hilang)', () => {
    const baris = [{ shift: 'pagi', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('12:40', baris, SET)).toEqual(['pagi'])
  })

  it('pulang sore menempel ke sore — TIDAK menimpa pulang pagi', () => {
    const baris = [
      { shift: 'pagi', jam: '06:20', status: 'hadir' },
      { shift: 'sore', jam: '15:10', status: 'terlambat' }
    ]
    expect(pilihShiftPulang('17:30', baris, SET)).toEqual(['sore'])
  })

  it('pulang siang menempel ke pagi walau shift sore juga dimiliki (belum masuk sore)', () => {
    const baris = [{ shift: 'pagi', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('11:00', baris, SET)).toEqual(['pagi'])
  })

  it('scan dobel saat masuk BUKAN pulang (jeda < batas)', () => {
    const baris = [{ shift: 'pagi', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('06:22', baris, SET)).toEqual([])
    // tepat di batas jeda → sudah dianggap pulang
    expect(MIN_JEDA_PULANG_MENIT).toBe(30)
    expect(pilihShiftPulang('06:50', baris, SET)).toEqual(['pagi'])
    expect(pilihShiftPulang('06:49', baris, SET)).toEqual([])
  })

  it('scan sebelum jam masuk bukan pulang', () => {
    const baris = [{ shift: 'pagi', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('05:40', baris, SET)).toEqual([])
  })

  it('izin/sakit/cuti/alpa tak pernah jadi sasaran pulang', () => {
    for (const status of ['izin', 'sakit', 'cuti', 'alpa']) {
      const baris = [{ shift: 'pagi', jam: '06:20', status }]
      expect(pilihShiftPulang('12:10', baris, SET)).toEqual([])
    }
  })

  it('baris hadir manual (tanpa jam) tetap bisa menerima pulang', () => {
    const baris = [{ shift: 'pagi', jam: '', status: 'hadir' }]
    expect(pilihShiftPulang('12:10', baris, SET)).toEqual(['pagi'])
  })

  it('baris berjam menang atas baris manual tanpa jam', () => {
    const baris = [
      { shift: 'pagi', jam: '', status: 'hadir' },
      { shift: 'sore', jam: '15:10', status: 'hadir' }
    ]
    expect(pilihShiftPulang('17:30', baris, SET)).toEqual(['sore'])
  })

  it('baris gabungan (jam masuk identik) ditinggalkan bersamaan → dua-duanya', () => {
    const baris = [
      { shift: 'pagi', jam: '06:20', status: 'hadir' },
      { shift: 'sekolah', jam: '06:20', status: 'hadir' }
    ]
    expect(pilihShiftPulang('12:30', baris, SET).sort()).toEqual(['pagi', 'sekolah'])
  })

  it('shift yang sudah dihapus dari master diabaikan', () => {
    const baris = [{ shift: 'shift_lama', jam: '06:20', status: 'hadir' }]
    expect(pilihShiftPulang('12:10', baris, SET)).toEqual([])
  })

  it('input rusak → [] (bukan lempar)', () => {
    expect(pilihShiftPulang('', [{ shift: 'pagi', jam: '06:20', status: 'hadir' }], SET)).toEqual(
      []
    )
    expect(pilihShiftPulang('bukan jam', [], SET)).toEqual([])
    expect(pilihShiftPulang('12:00', null, SET)).toEqual([])
    expect(pilihShiftPulang('12:00', [null, {}], SET)).toEqual([])
  })
})
