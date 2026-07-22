// Kyai (22 Jul 2026): "di menu penugasan glondongan, saya ingin jika koordinator akan
// menugaskan guru penyimak, nama guru yg sudah bertugas (belum selesai) jangan muncul
// di dropdown penugasan."
//
// SIBUK = punya baris glondongan ber-status 'ditugaskan'. Baris 'berjalan' (tugas guru
// kelas yang lahir otomatis & menunggu semua glondongan rampung) SENGAJA tak dihitung —
// kalau ikut, hampir semua guru kelas lenyap dari dropdown selamanya.
import { describe, it, expect } from 'vitest'
import { hitungTugasAktif, jumlahTugasAktif } from '@/utils/glondongan'

const baris = (o) => ({ tipe: 'glondongan', status: 'ditugaskan', ...o })

describe('hitungTugasAktif — siapa yang masih pegang blok', () => {
  it('menghitung hanya baris glondongan ber-status ditugaskan', () => {
    const peta = hitungTugasAktif([
      baris({ penguji_id: 'g1', penguji_nama: 'Ust. A' }),
      baris({ penguji_id: 'g1', penguji_nama: 'Ust. A' }),
      baris({ penguji_id: 'g2', penguji_nama: 'Ust. B', status: 'selesai' }),
      baris({ penguji_id: 'g3', penguji_nama: 'Ust. C', status: 'menunggu' })
    ])
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(2)
    expect(jumlahTugasAktif({ id: 'g2', nama: 'Ust. B' }, peta)).toBe(0)
    expect(jumlahTugasAktif({ id: 'g3', nama: 'Ust. C' }, peta)).toBe(0)
  })

  it('baris tipe "berjalan" (guru kelas) TIDAK bikin sibuk', () => {
    const peta = hitungTugasAktif([
      baris({ tipe: 'berjalan', penguji_id: 'g1', penguji_nama: 'Ust. A' })
    ])
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(0)
  })

  it('blok yang belum gilirannya tetap dihitung sibuk (gurunya sudah dibooking)', () => {
    // Status baris tak membedakan sudah/belum giliran — keduanya 'ditugaskan'.
    const peta = hitungTugasAktif([baris({ penguji_id: 'g1', penguji_nama: 'Ust. A' })])
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(1)
  })

  it('baris lama tanpa penguji_id tetap terdeteksi lewat nama', () => {
    const peta = hitungTugasAktif([baris({ penguji_id: '', penguji_nama: 'Ust.  Abdul  Ghofur' })])
    expect(jumlahTugasAktif({ id: 'g9', nama: 'ust. abdul ghofur' }, peta)).toBe(1)
  })

  it('id menang atas nama (guru beda dengan nama mirip tak ikut tersaring)', () => {
    const peta = hitungTugasAktif([baris({ penguji_id: 'g1', penguji_nama: 'Ust. A' })])
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(1)
    expect(jumlahTugasAktif({ id: 'g2', nama: 'Ust. Lain' }, peta)).toBe(0)
  })

  it('input kosong/rusak → 0 (bukan lempar)', () => {
    const peta = hitungTugasAktif(null)
    expect(peta.byId.size).toBe(0)
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(0)
    expect(jumlahTugasAktif(null, peta)).toBe(0)
    expect(jumlahTugasAktif({ id: 'g1' }, null)).toBe(0)
    expect(hitungTugasAktif([null, {}, { tipe: 'glondongan' }]).byId.size).toBe(0)
  })
})
