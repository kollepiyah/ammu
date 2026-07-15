// Regresi kelas bug: "UPDATE 0-baris lolos diam-diam".
// PostgREST TIDAK memberi error saat RLS menolak UPDATE — cuma balas 204/0 baris. Jalur cepat
// updateOne (partial = kolom riil semua) dulu tak memeriksanya sama sekali, jadi penolakan
// lolos sebagai "sukses": UI bilang tersimpan, data tampak "balik" sesudah refresh.
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock builder PostgREST. Dua rantai yang dipakai db.js:
//   getOne    : from(t).select('*').eq(pk,id).maybeSingle()
//   jalur cepat: from(t).update(row).eq(pk,id).select(pk)
// `select` melayani keduanya, dibedakan lewat `mode` (di-reset setelah dipakai update).
function makeSupabase({ updateData = [], updateError = null, existingRow = null } = {}) {
  const spy = { updateRow: null, eqArgs: null, getOneCalls: 0 }
  let mode = null
  const b = {}
  b.from = () => b
  b.update = (row) => {
    mode = 'update'
    spy.updateRow = row
    return b
  }
  b.eq = (col, val) => {
    spy.eqArgs = [col, val]
    return b
  }
  b.select = () => {
    if (mode === 'update') {
      mode = null
      return Promise.resolve({ data: updateData, error: updateError })
    }
    return b
  }
  b.maybeSingle = () => {
    spy.getOneCalls++
    return Promise.resolve({ data: existingRow, error: null })
  }
  b.insert = () => Promise.resolve({ error: null })
  return { b, spy }
}

let current = makeSupabase()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return current.b
  }
}))

const { updateOne } = await import('../../vue-app/src/services/db.js')

describe('updateOne — jalur cepat (partial = kolom riil semua)', () => {
  beforeEach(() => {
    current = makeSupabase()
  })

  it('sukses bila UPDATE benar-benar mengubah baris (tanpa getOne tambahan)', async () => {
    current = makeSupabase({ updateData: [{ id: 'g1' }] })
    await expect(updateOne('guru', 'g1', { status: 'Aktif' })).resolves.toBeUndefined()
    expect(current.spy.updateRow).toEqual({ status: 'Aktif' })
    expect(current.spy.eqArgs).toEqual(['id', 'g1'])
    // hemat: baris berubah => tak perlu getOne pembeda
    expect(current.spy.getOneCalls).toBe(0)
  })

  it('THROW saat 0 baris padahal baris ADA (= ditolak RLS) — dulu lolos diam-diam', async () => {
    current = makeSupabase({ updateData: [], existingRow: { id: 'g1', status: 'Nonaktif' } })
    await expect(updateOne('guru', 'g1', { status: 'Aktif' })).rejects.toThrow(
      /ditolak RLS|hak akses/i
    )
    expect(current.spy.getOneCalls).toBe(1) // dipakai untuk memisahkan sebab
  })

  it('THROW saat 0 baris dan baris TIDAK ada — pesannya beda, jangan menyesatkan', async () => {
    current = makeSupabase({ updateData: [], existingRow: null })
    await expect(updateOne('guru', 'g-hilang', { status: 'Aktif' })).rejects.toThrow(
      /tidak ditemukan/i
    )
  })

  it('error PostgREST asli tetap diteruskan apa adanya', async () => {
    current = makeSupabase({ updateError: new Error('boom-postgrest') })
    await expect(updateOne('guru', 'g1', { status: 'Aktif' })).rejects.toThrow('boom-postgrest')
  })

  it('kasus nyata: batalIntent va_intent ditolak RLS (created_by beda) harus THROW', async () => {
    // PembayaranView.batalIntent -> { status } = kolom riil keuangan_va_intent => jalur cepat.
    // va_intent_upd = created_by = auth.uid() OR auth_can_keuangan(): intent milik orang lain
    // => 0 baris tanpa error => dulu toast.success('Tagihan VA dibatalkan') padahal tidak.
    current = makeSupabase({ updateData: [], existingRow: { id: 'i1', status: 'pending' } })
    await expect(updateOne('keuangan_va_intent', 'i1', { status: 'dibatalkan' })).rejects.toThrow(
      /ditolak RLS|hak akses/i
    )
  })
})
