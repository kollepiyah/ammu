// Kyai (5 Agu 2026): "di beberapa HP low end masih terasa lambat".
//
// Sebab terbesarnya bukan CPU, tapi jumlah baris yang diunduh: subscribeColl SUDAH
// menerima parameter penyaring sejak awal, tapi 78 pemanggilannya di app memakainya
// NOL kali — semuanya menarik tabel penuh lalu menyaring di klien. Untuk halaman
// pribadi (Profil guru, Capaian anak) itu berarti mengunduh absensi/slip/rekap
// SELURUH pondok demi menampilkan satu orang.
//
// Tes ini mengunci mekanismenya: penyaring yang dikirim ke subscribeColl HARUS jadi
// syarat di sisi server (PostgREST .eq/.gte), bukan disaring sesudah diunduh. Kalau
// suatu saat argumen ini diabaikan lagi, penghematannya hilang tanpa satu pun error.
import { describe, it, expect, vi, beforeEach } from 'vitest'

function makeSupabase() {
  const spy = { eq: [], gte: [], tarikan: 0 }
  const b = {}
  b.from = () => b
  b.select = () => b
  b.order = () => b
  b.eq = (ref, val) => {
    spy.eq.push([ref, val])
    return b
  }
  b.gte = (ref, val) => {
    spy.gte.push([ref, val])
    return b
  }
  b.limit = () => Promise.resolve({ data: [], error: null })
  b.range = () => {
    spy.tarikan++
    return Promise.resolve({ data: [], error: null })
  }
  b.maybeSingle = () => Promise.resolve({ data: null, error: null })
  b.channel = () => {
    const ch = {}
    ch.on = () => ch
    ch.subscribe = () => ch
    return ch
  }
  b.removeChannel = () => {}
  return { b, spy }
}

let current = makeSupabase()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return current.b
  }
}))

const { subscribeColl } = await import('../../vue-app/src/services/db.js')

describe('subscribeColl — penyaring dikirim ke server', () => {
  beforeEach(() => {
    current = makeSupabase()
  })

  it('guru_id disaring sebagai KOLOM RIIL, bukan lewat data jsonb', async () => {
    // absensi_shift_guru punya kolom nyata guru_id (index guru_id+periode). Kalau ia
    // sampai tersaring sebagai `data->>guru_id`, indexnya tak terpakai.
    const lepas = subscribeColl('absensi_shift_guru', () => {}, [['guru_id', '==', 'g7']])
    await Promise.resolve()
    expect(current.spy.eq).toEqual([['guru_id', 'g7']])
    lepas()
  })

  it('santri_id pada rekap_prestasi juga kolom riil', async () => {
    const lepas = subscribeColl('rekap_prestasi', () => {}, [['santri_id', '==', 's3']])
    await Promise.resolve()
    expect(current.spy.eq).toEqual([['santri_id', 's3']])
    lepas()
  })

  it('beberapa penyaring sekaligus (jendela 30 hari + milik sendiri) semuanya terkirim', async () => {
    // Ini bentuk yang dipakai useNotifications: batas created_at + santri_id.
    const lepas = subscribeColl('keuangan_tagihan', () => {}, [
      ['created_at', '>=', '2026-07-06T00:00:00.000Z'],
      ['santri_id', '==', 's9']
    ])
    await Promise.resolve()
    expect(current.spy.gte).toEqual([['created_at', '2026-07-06T00:00:00.000Z']])
    expect(current.spy.eq).toEqual([['santri_id', 's9']])
    lepas()
  })

  it('field yang BUKAN kolom riil jatuh ke data jsonb (bukan error senyap)', async () => {
    // `shift` tinggal di data jsonb pada absensi_shift_guru — masih bisa disaring,
    // hanya tanpa index. Dites supaya jelas bedanya dengan kolom riil di atas.
    const lepas = subscribeColl('absensi_shift_guru', () => {}, [['shift', '==', 'pagi']])
    await Promise.resolve()
    expect(current.spy.eq).toEqual([['data->>shift', 'pagi']])
    lepas()
  })

  it('tanpa penyaring = tak ada syarat terkirim (perilaku lama tetap)', async () => {
    const lepas = subscribeColl('absensi_shift_guru', () => {})
    await Promise.resolve()
    expect(current.spy.eq).toEqual([])
    expect(current.spy.gte).toEqual([])
    lepas()
  })

  it('penyaring array kosong tak menghasilkan syarat', async () => {
    const lepas = subscribeColl('rekap_prestasi', () => {}, [])
    await Promise.resolve()
    expect(current.spy.eq).toEqual([])
    lepas()
  })
})
