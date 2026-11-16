// Kyai 17 Nov 2026: banyak santri sudah naik di luar aplikasi lalu juznya dibetulkan manual,
// tapi ajuan tes lamanya menggantung — antrian tes menumpuk berisi anak yang sudah lewat.
// Aturan "ajuan mana yang jadi basi" ditulis sekali di sini dan diuji di sini.
import { describe, it, expect } from 'vitest'
import { ajuanBasiKarenaJuz } from '@/utils/tesKenaikan'

const A = (id, juz_asal, status = 'diajukan') => ({ id, juz_asal, status })

describe('ajuanBasiKarenaJuz', () => {
  it('membatalkan ajuan yang juz asalnya sudah tak sama dengan juz santri', () => {
    // Contoh Kyai: santri juz 22, ada ajuan naik ke 23, lalu juz diedit jadi 25.
    const basi = ajuanBasiKarenaJuz([A('a', 'Juz 22')], 'Juz 25')
    expect(basi.map((x) => x.id)).toEqual(['a'])
  })

  it('TIDAK membatalkan kalau juznya sebenarnya sama', () => {
    expect(ajuanBasiKarenaJuz([A('a', 'Juz 22')], 'Juz 22')).toEqual([])
  })

  it('beda cara menulis juz dianggap sama — bandingkan angkanya', () => {
    expect(ajuanBasiKarenaJuz([A('a', 'JUZ 22')], 'Juz 22')).toEqual([])
    expect(ajuanBasiKarenaJuz([A('a', '22')], 'Juz 22')).toEqual([])
    expect(ajuanBasiKarenaJuz([A('a', 'juz 06')], 'Juz 6')).toEqual([])
  })

  it('ajuan yang SUDAH dinilai adalah riwayat — jangan pernah disentuh', () => {
    const ajuan = [
      A('lulus', 'Juz 22', 'lulus'),
      A('tidak', 'Juz 22', 'tidak_lulus'),
      A('batal', 'Juz 22', 'dibatalkan'),
      A('tolak', 'Juz 22', 'ditolak'),
      A('hidup', 'Juz 22', 'diajukan')
    ]
    expect(ajuanBasiKarenaJuz(ajuan, 'Juz 25').map((x) => x.id)).toEqual(['hidup'])
  })

  it('juz baru tak terbaca → tak membatalkan apa pun (lebih baik diam)', () => {
    const ajuan = [A('a', 'Juz 22')]
    expect(ajuanBasiKarenaJuz(ajuan, '')).toEqual([])
    expect(ajuanBasiKarenaJuz(ajuan, '-')).toEqual([])
    expect(ajuanBasiKarenaJuz(ajuan, null)).toEqual([])
    expect(ajuanBasiKarenaJuz(ajuan, 'entah')).toEqual([])
  })

  it('ajuan tanpa juz_asal yang terbaca dilewati, bukan dibatalkan', () => {
    expect(ajuanBasiKarenaJuz([A('a', ''), A('b', null)], 'Juz 25')).toEqual([])
  })

  it('juz turun pun tetap basi — yang penting tak lagi cocok', () => {
    expect(ajuanBasiKarenaJuz([A('a', 'Juz 25')], 'Juz 20').map((x) => x.id)).toEqual(['a'])
  })

  it('aman dengan daftar kosong / bukan larik', () => {
    expect(ajuanBasiKarenaJuz([], 'Juz 5')).toEqual([])
    expect(ajuanBasiKarenaJuz(null, 'Juz 5')).toEqual([])
    expect(ajuanBasiKarenaJuz(undefined, 'Juz 5')).toEqual([])
  })

  it('menerima angka, bukan cuma teks', () => {
    expect(ajuanBasiKarenaJuz([A('a', 22)], 25).map((x) => x.id)).toEqual(['a'])
    expect(ajuanBasiKarenaJuz([A('a', 25)], 25)).toEqual([])
  })
})
