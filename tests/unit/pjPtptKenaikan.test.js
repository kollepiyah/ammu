// Kyai (4 Agu 2026): "akun PJ PTPT tidak bisa memproses kelulusan santri tes",
// galatnya menyebut RLS menolak.
//
// Akarnya: tombol LULUS menulis `santri` lewat writeKenaikan SEBELUM menulis
// tes_kenaikan, dan UPDATE public.santri dulu hanya terbuka untuk admin, santri ybs,
// dan GURU PENGAMPU (guru_pagi/guru_sore/guru/guru_sekolah[]). Hak PJ di UI justru
// diturunkan dari field LAIN — `santri.pj_ptpt` (buatScopePj) — yang tak pernah
// dilihat auth_is_pengampu. Penawarnya kebijakan RLS `santri_upd_pj_ptpt`
// (supabase/migrations/20260804120000_santri_upd_pj_ptpt.sql).
//
// Berkas ini menjaga SATU asumsi yang ditumpangi kebijakan itu: WITH CHECK-nya
// memakai predikat yang sama dengan USING, jadi baris BARU wajib masih berlabel PJ
// yang sama. Itu aman HANYA karena buildKenaikanQiraatiPayload tak pernah
// MENGOSONGKAN `pj_ptpt`. Kalau invarian ini pecah, kelulusan PJ akan ditolak DB
// lagi — dan gagalnya di produksi, bukan di sini. Karena itu dijaga tes.
import { describe, it, expect } from 'vitest'
import { buildKenaikanQiraatiPayload } from '@/utils/promosiKenaikan'

const santri = { id: 's1', nama: 'Ahmad', lembaga: 'PTPT', kelas: 'Kelas 2', pj_ptpt: 'Ust. Fulan' }
const ctx = { settings: {}, lembagaList: [] }

describe('buildKenaikanQiraatiPayload — label pj_ptpt (fondasi RLS santri_upd_pj_ptpt)', () => {
  it('KUNCI: opts.pj_ptpt kosong → kunci `pj_ptpt` TIDAK ditulis (label lama bertahan)', () => {
    // Inilah jalur "lulus KELUAR dari PTPT": TesKenaikanView mengirim pj_ptpt: ''
    // untuk lembaga selain PTPT. updateOne = merge dangkal, jadi tanpa kunci ini
    // label lama tetap ada → WITH CHECK kebijakan RLS tetap terpenuhi.
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PPPH', kelas: 'Level 1', pj_ptpt: '' },
      ctx
    )
    expect('pj_ptpt' in payload).toBe(false)
  })

  it('opts.pj_ptpt hanya spasi juga tidak menulis apa pun', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PPPH', kelas: 'Level 1', pj_ptpt: '   ' },
      ctx
    )
    expect('pj_ptpt' in payload).toBe(false)
  })

  it('opts.pj_ptpt tak diisi sama sekali juga tidak menulis apa pun', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3' },
      ctx
    )
    expect('pj_ptpt' in payload).toBe(false)
  })

  it('label yang DIPILIH tetap ditulis (dan dirapikan spasinya)', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3', juz: '11', pj_ptpt: '  Ust. Fulan  ' },
      ctx
    )
    expect(payload.pj_ptpt).toBe('Ust. Fulan')
  })

  it('kenaikan di dalam PTPT tetap menulis kelas & juz (bukti payload memang jalur uang-nya kelulusan)', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'PTPT', kelas: 'Kelas 3', juz: '11', pj_ptpt: 'Ust. Fulan' },
      ctx
    )
    expect(payload.lembaga).toBe('PTPT')
    expect(payload.kelas).toBe('Kelas 3')
    expect(payload.juz).toBe('JUZ 11')
  })
})
