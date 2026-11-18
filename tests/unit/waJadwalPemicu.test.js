// Pemicu pengingat WA di app: memanggil kirim-wa-jadwal sampai `sisa` habis tanpa berputar
// pada guru yang sama, dan merangkum hasilnya jadi satu toast.
import { describe, it, expect } from 'vitest'
import { kirimPengingatJadwal, ringkasPengingat } from '../../vue-app/src/services/waJadwal.js'

const jawab = (data) => Promise.resolve({ data, error: null })

describe('kirimPengingatJadwal', () => {
  it('memanggil lagi selama ada sisa, membawa daftar guru yang sudah diproses', async () => {
    const panggilan = []
    const urutan = [
      {
        ok: true,
        terkirim: 2,
        sisa: 1,
        diproses: ['g1', 'g2', 'g3'],
        tanpaNomor: ['Budi'],
        gagal: []
      },
      { ok: true, terkirim: 1, sisa: 0, diproses: ['g4'], tanpaNomor: [], gagal: [] }
    ]
    const h = await kirimPengingatJadwal(['a', 'b', 'a'], {
      invoke: (body) => {
        panggilan.push(JSON.parse(JSON.stringify(body)))
        return jawab(urutan.shift())
      }
    })
    expect(panggilan).toEqual([
      { ids: ['a', 'b'], lewatiGuru: [] },
      { ids: ['a', 'b'], lewatiGuru: ['g1', 'g2', 'g3'] }
    ])
    expect(h).toMatchObject({ aktif: true, terkirim: 3, tanpaNomor: ['Budi'], galat: '' })
  })

  it('berhenti bila fungsi menyatakan berhenti (token/kuota) atau tak memproses apa pun', async () => {
    let n = 0
    await kirimPengingatJadwal(['a'], {
      invoke: () => {
        n++
        return jawab({
          ok: true,
          terkirim: 0,
          sisa: 9,
          berhenti: true,
          diproses: ['g1'],
          tanpaNomor: [],
          gagal: [{ nama: 'A', alasan: 'token invalid' }]
        })
      }
    })
    expect(n).toBe(1)
    n = 0
    await kirimPengingatJadwal(['a'], {
      invoke: () => {
        n++
        return jawab({ ok: true, terkirim: 0, sisa: 3, diproses: [], tanpaNomor: [], gagal: [] })
      }
    })
    expect(n).toBe(1)
  })

  it('token Fonnte belum dipasang → tidak aktif, bukan galat', async () => {
    const h = await kirimPengingatJadwal(['a'], {
      invoke: () => jawab({ ok: false, error: 'belum-dikonfigurasi' })
    })
    expect(h.aktif).toBe(false)
    expect(ringkasPengingat(h).jenis).toBe('info')
  })

  it('tanpa id tak memanggil apa pun', async () => {
    let n = 0
    await kirimPengingatJadwal([], { invoke: () => (n++, jawab({ ok: true })) })
    expect(n).toBe(0)
  })
})

describe('ringkasPengingat', () => {
  it('sukses penuh / ada yang tanpa nomor / semuanya sudah pernah dikirim', () => {
    const dasar = { aktif: true, terkirim: 0, tanpaNomor: [], gagal: [], galat: '' }
    expect(ringkasPengingat({ ...dasar, terkirim: 4 })).toEqual({
      jenis: 'success',
      teks: 'Pengingat WA terkirim ke 4 guru.'
    })
    const r = ringkasPengingat({ ...dasar, terkirim: 2, tanpaNomor: ['Budi'] })
    expect(r.jenis).toBe('warning')
    expect(r.teks).toContain('tanpa nomor WA: Budi')
    expect(ringkasPengingat(dasar)).toBeNull()
    expect(ringkasPengingat({ ...dasar, galat: 'forbidden' }).jenis).toBe('warning')
  })
})
