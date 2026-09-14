// Kyai (14 Sep 2026): "di uang saku dan POS dan yg lain, saya ingin admin keu bisa print
// ulang struk."
//
// Slip setor/tarik Tabungan & Uang Saku dulu selalu mencetak saldo HARI INI. Slip yang
// dicetak ulang harus sama dengan slip aslinya: saldo TEPAT SESUDAH mutasi itu, dengan
// urutan yang sama persis dengan buku besar santri di layar.
import { describe, it, expect } from 'vitest'
import { saldoSetelahMutasi, bandingMutasi } from '@/utils/kasLembaga'

const m = (id, tanggal, jenis, nominal, o = {}) => ({
  id,
  santri_id: 's1',
  tanggal,
  jenis,
  nominal,
  ...o
})

const DAFTAR = [
  m('m3', '2026-08-10', 'tarik', 20000),
  m('m1', '2026-08-01', 'setor', 50000),
  m('m2', '2026-08-05', 'setor', 30000),
  m('lain', '2026-08-02', 'setor', 999999, { santri_id: 's2' })
]

describe('saldoSetelahMutasi — saldo yang pantas tercetak di slip', () => {
  it('saldo berjalan per mutasi, bukan saldo hari ini', () => {
    expect(saldoSetelahMutasi(DAFTAR, DAFTAR[1])).toBe(50000)
    expect(saldoSetelahMutasi(DAFTAR, DAFTAR[2])).toBe(80000)
    expect(saldoSetelahMutasi(DAFTAR, DAFTAR[0])).toBe(60000)
  })

  it('mutasi santri lain tak ikut', () => {
    expect(saldoSetelahMutasi(DAFTAR, DAFTAR[3])).toBe(999999)
  })

  it('tanggal sama diurutkan menurut waktu catat', () => {
    const list = [
      m('b', '2026-08-01', 'tarik', 10000, { createdAt: '2026-08-01T10:00:00Z' }),
      m('a', '2026-08-01', 'setor', 40000, { createdAt: '2026-08-01T08:00:00Z' })
    ]
    expect(saldoSetelahMutasi(list, list[1])).toBe(40000)
    expect(saldoSetelahMutasi(list, list[0])).toBe(30000)
  })

  it('mutasi yang baru disimpan (belum ada di daftar) ikut dihitung pada tempatnya', () => {
    const baru = m('m4', '2026-08-12', 'setor', 5000)
    expect(saldoSetelahMutasi(DAFTAR, baru)).toBe(65000)
  })

  it('tanpa santri → 0', () => {
    expect(saldoSetelahMutasi(DAFTAR, { id: 'x', nominal: 1 })).toBe(0)
  })

  it('bandingMutasi: 0 untuk mutasi yang identik urutannya', () => {
    const a = m('a', '2026-08-01', 'setor', 1)
    expect(bandingMutasi(a, { ...a })).toBe(0)
    expect(bandingMutasi(a, m('b', '2026-08-02', 'setor', 1))).toBe(-1)
  })
})
