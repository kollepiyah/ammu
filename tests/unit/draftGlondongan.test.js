// v.1.3.7 (Kyai, 31 Agu 2026): "input nilai glondongan ada fitur simpan (artinya tidak
// langsung terkirim) jadi tambah tombol baru misal 'Selesai' yg berarti sudah diinput semua."
//
// Tombol "Simpan" menulis nilai ke baris TANPA menyentuh `status` — baris tetap
// 'ditugaskan'. Yang diuji di sini adalah janji keamanannya: draft TIDAK BOLEH terhitung
// sebagai pekerjaan yang sudah rampung di satu pun tempat. Semua konsumen memang sudah
// mensyaratkan status 'selesai', tapi justru karena itu ia gampang tergeser tanpa ada
// yang sadar — nilai yang bocor jadi bisyaroh atau membuka kunci PJ adalah uang & rapor.
import { describe, it, expect } from 'vitest'
import {
  gerbangGlondongan,
  agregatPenyimakGlondongan,
  hitungTugasAktif,
  jumlahTugasAktif,
  isBarisTerbuka
} from '@/utils/glondongan'

// Blok glondongan kelas 1 yang SUDAH diisi angka lewat tombol Simpan, tapi belum "Selesai".
const draft = (o = {}) => ({
  tipe: 'glondongan',
  kelas_asal: 1,
  juz_target: 11,
  juz: [1, 2, 3, 4, 5],
  status: 'ditugaskan',
  penguji_id: 'g1',
  penguji_nama: 'Ust. A',
  santri_id: 's1',
  nilai: { 1: { tahfizh: 80, istimror: 78 }, 2: { tahfizh: 75 } },
  tgl_draft: '2026-09-01T03:00:00.000Z',
  draft_oleh: 'Ust. A',
  ...o
})

describe('draft nilai glondongan tidak dianggap selesai', () => {
  it('tidak membuka gerbang PJ PTPT', () => {
    // Santri tes juz 11 (kelas 3) → wajib ada blok kelas 1 & 2 + juz berjalan.
    const g = gerbangGlondongan(11, [draft()])
    expect(g.terkunci).toBe(true)
    expect(g.pending.some((p) => p.tipe === 'glondongan' && p.kelas_asal === 1)).toBe(true)
  })

  it('tidak masuk rekap penyimak / bisyaroh walau tgl_nilai kebetulan terisi', () => {
    const agg = agregatPenyimakGlondongan(
      [
        draft({ tgl_nilai: '2026-09-01' }),
        draft({ santri_id: 's2', status: 'selesai', tgl_nilai: '2026-09-01' })
      ],
      '2026-09'
    )
    // Hanya baris 'selesai' yang terhitung — draft-nya tidak, walau isinya sama.
    expect(agg).toHaveLength(1)
    expect(agg[0]).toMatchObject({ key: 'g1', blok: 1, juz: 5 })
  })

  it('penyimaknya TETAP terhitung sibuk (blok belum dilepas)', () => {
    const peta = hitungTugasAktif([draft()])
    expect(jumlahTugasAktif({ id: 'g1', nama: 'Ust. A' }, peta)).toBe(1)
  })

  it('blok kelas berikutnya tetap terkunci sampai draft ditandai Selesai', () => {
    const rows = [draft(), draft({ kelas_asal: 2, nilai: {}, tgl_draft: '' })]
    const kelas2 = rows[1]
    expect(isBarisTerbuka(kelas2, rows)).toBe(false)
    rows[0].status = 'selesai' // penyimak menekan "Selesai"
    expect(isBarisTerbuka(kelas2, rows)).toBe(true)
  })
})
