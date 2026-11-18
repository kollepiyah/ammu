// Kyai 18 Nov 2026: menu Pondok Laju, Seremonial, dan Glondongan hanya untuk guru yang punya
// tugas di sana; pengelola (admin, PJ PTPT, koordinator, Admin Pondok Laju) selalu melihat.
import { describe, it, expect } from 'vitest'
import {
  aksesMenuTugas,
  aksesPenuhTugas,
  susunTugasSaya
} from '../../vue-app/src/utils/tugasSaya.js'

const HARI = '2026-11-18'
const guru = (over = {}) => ({
  id: 'g1',
  role: 'guru',
  role_sistem: 'user',
  nama: 'Ahmad, S.Pd.',
  lembaga: 'PTPT',
  jabatan: 'Guru',
  ...over
})
const ptpt = (over = {}) => [{ lembaga: 'PTPT', ...over }]

describe('aksesPenuhTugas', () => {
  it('admin & role_sistem pengelola selalu penuh, guru biasa tidak', () => {
    expect(aksesPenuhTugas({ id: 'admin', role: 'admin' })).toBe(true)
    expect(aksesPenuhTugas(guru({ role_sistem: 'super_admin' }))).toBe(true)
    expect(aksesPenuhTugas(guru({ role_sistem: 'admin_keuangan' }))).toBe(true)
    expect(aksesPenuhTugas(guru())).toBe(false)
    expect(aksesPenuhTugas(null)).toBe(false)
  })
})

describe('aksesMenuTugas', () => {
  it('guru tanpa tugas apa pun: ketiga menu tertutup', () => {
    expect(aksesMenuTugas({ sesi: guru(), hariIni: HARI })).toEqual({
      pondokLaju: false,
      seremonial: false,
      glondongan: false
    })
  })

  it('pengelola penuh selalu terbuka walau tanpa data', () => {
    const a = aksesMenuTugas({ sesi: { id: 'admin', role: 'admin' }, hariIni: HARI })
    expect(a).toEqual({ pondokLaju: true, seremonial: true, glondongan: true })
  })

  it('PJ PTPT: ketiganya terbuka (penyusun jadwal Laju + penjadwal seremonial)', () => {
    const a = aksesMenuTugas({ sesi: guru({ jabatan: 'PJ PTPT' }), hariIni: HARI })
    expect(a).toEqual({ pondokLaju: true, seremonial: true, glondongan: true })
  })

  it('koordinator glondongan: Seremonial & Glondongan, bukan Pondok Laju', () => {
    const a = aksesMenuTugas({
      sesi: guru(),
      hariIni: HARI,
      lembagaList: ptpt({ koordinator_glondongan: { mahad: ['g1'], nonmahad: [] } })
    })
    expect(a).toEqual({ pondokLaju: false, seremonial: true, glondongan: true })
  })

  it('Admin Pondok Laju: hanya Pondok Laju', () => {
    const a = aksesMenuTugas({
      sesi: guru(),
      hariIni: HARI,
      lembagaList: ptpt({ admin_pondok_laju: ['g1'] })
    })
    expect(a.pondokLaju).toBe(true)
    expect(a.seremonial).toBe(false)
  })

  describe('Pondok Laju', () => {
    it('piket mendatang atau ≤7 hari lalu membuka; piket lama & milik orang lain tidak', () => {
      const cek = (tanggal, guruId = 'g1') =>
        aksesMenuTugas({ sesi: guru(), hariIni: HARI, jadwalLaju: [{ tanggal, guru_id: guruId }] })
          .pondokLaju
      expect(cek('2026-11-25')).toBe(true)
      expect(cek('2026-11-11')).toBe(true) // jurnal boleh telat sepekan
      expect(cek('2026-11-10')).toBe(false)
      expect(cek('2026-11-25', 'g9')).toBe(false)
    })

    it('guru kelas santri Pondok Laju aktif (Tadarus Pagi) — nama bergelar tetap cocok', () => {
      const santri = [{ id: 's1', is_pondok_laju: true, guru_pagi: 'Ahmad,  S.Pd.' }]
      expect(aksesMenuTugas({ sesi: guru(), hariIni: HARI, santriList: santri }).pondokLaju).toBe(
        true
      )
      const nonaktif = [{ ...santri[0], aktif: false }]
      expect(aksesMenuTugas({ sesi: guru(), hariIni: HARI, santriList: nonaktif }).pondokLaju).toBe(
        false
      )
    })
  })

  describe('Seremonial', () => {
    const sesiSer = (over = {}) => ({
      tanggal: '2026-11-20',
      status: 'terjadwal',
      penyimak_guru: [{ id: 'g1', nama: 'Ahmad' }],
      ...over
    })
    const cek = (rows) =>
      aksesMenuTugas({ sesi: guru(), hariIni: HARI, seremonial: rows }).seremonial

    it('penyimak sesi terjadwal yang belum lewat — bentuk rata maupun mentah', () => {
      expect(cek([sesiSer()])).toBe(true)
      expect(
        cek([
          { tanggal: '2026-11-20', status: 'terjadwal', data: { penyimak_guru: [{ id: 'g1' }] } }
        ])
      ).toBe(true)
    })

    it('sesi lewat, selesai/batal, atau penyimak orang lain tidak membuka', () => {
      expect(cek([sesiSer({ tanggal: '2026-11-17' })])).toBe(false)
      expect(cek([sesiSer({ status: 'selesai' })])).toBe(false)
      expect(cek([sesiSer({ penyimak_guru: [{ id: 'g9' }] })])).toBe(false)
    })
  })

  describe('Glondongan', () => {
    const cek = (rows) =>
      aksesMenuTugas({ sesi: guru(), hariIni: HARI, glondongan: rows }).glondongan

    it('blok ditugaskan ke saya (id, atau nama bila id kosong) membuka', () => {
      expect(cek([{ status: 'ditugaskan', penguji_id: 'g1' }])).toBe(true)
      expect(cek([{ status: 'ditugaskan', penguji_id: '', penguji_nama: 'ahmad, s.pd.' }])).toBe(
        true
      )
    })

    it('blok selesai / milik penguji lain tidak', () => {
      expect(cek([{ status: 'selesai', penguji_id: 'g1' }])).toBe(false)
      expect(cek([{ status: 'ditugaskan', penguji_id: 'g9', penguji_nama: 'Ahmad, S.Pd.' }])).toBe(
        false
      )
    })
  })
})

describe('susunTugasSaya — seremonial berbentuk rata (jalur app)', () => {
  it('baris hasil queryColl (ekor jsonb sudah diratakan) tetap terbaca', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI,
      seremonial: [
        {
          id: 'c1',
          tanggal: HARI,
          jam_mulai: '08:00',
          status: 'terjadwal',
          judul: 'Seremonial Juz 10',
          peserta: [{ santri_id: 's1' }],
          penyimak_guru: [{ id: 'g1' }]
        }
      ]
    })
    expect(h.terjadwal).toHaveLength(1)
    expect(h.terjadwal[0].jenis).toBe('seremonial')
  })
})
