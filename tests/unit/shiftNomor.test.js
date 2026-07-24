// Impor/ekspor guru memakai NOMOR shift (posisi 1-based di Master Shift) sebagai
// ganti mengetik label — Kyai (24 Jul 2026): "supaya lebih mudah shift kasih nomor
// ID saja sesuai urutan yg sekarang". Tes menjaga:
//   1. nomor → shift_ids sesuai POSISI di daftar shift terurut;
//   2. input toleran (pisah | , ; / spasi), nomor invalid/di luar rentang diabaikan;
//   3. bolak-balik ids ⇄ nomor konsisten.
import { describe, it, expect } from 'vitest'
import { shiftIdsFromNomor, shiftNomorFromIds, shiftList } from '@/utils/shiftMaster'

// 9 shift kustom Kyai (urutan = yang tampil di Master Shift).
const SHIFTS = [
  { id: 'tpq_pagi', label: 'TPQ Pagi', urutan: 1, mulai: '06:00', selesai: '13:00' },
  { id: 'pra_ptpt_pagi', label: 'Pra PTPT Pagi', urutan: 2, mulai: '06:00', selesai: '13:00' },
  { id: 'ptpt_ppph_pagi', label: 'PTPT-PPPH Pagi', urutan: 3, mulai: '06:00', selesai: '13:00' },
  { id: 'tpq_sore', label: 'TPQ Sore', urutan: 4, mulai: '14:30', selesai: '18:00' },
  {
    id: 'pra_ptpt_ptpt_ppph_sore',
    label: 'Pra PTPT - PTPT - PPPH Sore',
    urutan: 5,
    mulai: '14:30',
    selesai: '18:00'
  },
  { id: 'tk', label: 'TK', urutan: 6, mulai: '08:30', selesai: '12:00' },
  { id: 'sdi_pkbm', label: 'SDI - PKBM', urutan: 7, mulai: '09:00', selesai: '13:00' },
  {
    id: 'pegawai_pagi',
    label: 'Pegawai Pagi',
    untuk: 'pegawai',
    urutan: 8,
    mulai: '06:00',
    selesai: '13:00'
  },
  {
    id: 'pegawai_sore',
    label: 'Pegawai Sore',
    untuk: 'pegawai',
    urutan: 9,
    mulai: '14:30',
    selesai: '18:00'
  }
]
const LIST = shiftList({ shiftMaster: SHIFTS })

describe('shiftIdsFromNomor — nomor posisi → shift_ids', () => {
  it('nomor tunggal & ganda (pisah |) sesuai POSISI', () => {
    expect(shiftIdsFromNomor('1', LIST)).toEqual(['tpq_pagi'])
    expect(shiftIdsFromNomor('1|4', LIST)).toEqual(['tpq_pagi', 'tpq_sore'])
    expect(shiftIdsFromNomor('2|5', LIST)).toEqual(['pra_ptpt_pagi', 'pra_ptpt_ptpt_ppph_sore'])
    expect(shiftIdsFromNomor('8|9', LIST)).toEqual(['pegawai_pagi', 'pegawai_sore'])
  })
  it('pemisah campur (koma/titik-koma/garis miring/spasi) diterima', () => {
    expect(shiftIdsFromNomor('1,4', LIST)).toEqual(['tpq_pagi', 'tpq_sore'])
    expect(shiftIdsFromNomor('1; 7', LIST)).toEqual(['tpq_pagi', 'sdi_pkbm'])
    expect(shiftIdsFromNomor('3 / 6', LIST)).toEqual(['ptpt_ppph_pagi', 'tk'])
  })
  it('nomor di luar rentang / bukan angka diabaikan; duplikat dibuang', () => {
    expect(shiftIdsFromNomor('0|10|abc|4', LIST)).toEqual(['tpq_sore'])
    expect(shiftIdsFromNomor('4|4', LIST)).toEqual(['tpq_sore'])
    expect(shiftIdsFromNomor('', LIST)).toEqual([])
    expect(shiftIdsFromNomor(null, LIST)).toEqual([])
  })
})

describe('shiftNomorFromIds — shift_ids → nomor (utk ekspor)', () => {
  it('id → nomor posisi, terurut naik, dipisah |', () => {
    expect(shiftNomorFromIds(['tpq_pagi', 'tpq_sore'], LIST)).toBe('1|4')
    expect(shiftNomorFromIds(['tpq_sore', 'tpq_pagi'], LIST)).toBe('1|4') // tetap terurut
    expect(shiftNomorFromIds([], LIST)).toBe('')
    expect(shiftNomorFromIds(['tak_ada'], LIST)).toBe('') // id asing dilewati
  })
  it('bolak-balik konsisten', () => {
    const ids = ['pra_ptpt_pagi', 'pra_ptpt_ptpt_ppph_sore']
    expect(shiftIdsFromNomor(shiftNomorFromIds(ids, LIST), LIST)).toEqual(ids)
  })
})
