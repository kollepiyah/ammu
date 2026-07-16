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
  const spy = { updateRow: null, eqArgs: null, getOneCalls: 0, insertCalls: 0, insertRow: null }
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
  b.insert = (row) => {
    spy.insertCalls++
    spy.insertRow = row
    return Promise.resolve({ error: null })
  }
  return { b, spy }
}

let current = makeSupabase()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return current.b
  }
}))

const { updateOne, mergeOne } = await import('../../vue-app/src/services/db.js')

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

// `catatan_x` sengaja TIDAK ada di COLS.guru -> partial menyentuh ekor jsonb -> jalur lambat.
describe('updateOne — jalur lambat (menyentuh ekor jsonb): TIDAK upsert', () => {
  beforeEach(() => {
    current = makeSupabase()
  })

  it('baris ADA -> read-modify-write jalan normal', async () => {
    current = makeSupabase({ existingRow: { id: 'g1', nama: 'Ahmad' }, updateData: [{ id: 'g1' }] })
    await expect(updateOne('guru', 'g1', { catatan_x: 'halo' })).resolves.toBeUndefined()
    expect(current.spy.insertCalls).toBe(0) // baris ada => UPDATE, bukan INSERT
  })

  it('baris TIDAK ada -> THROW, dan JANGAN bikin stub row (dulu diam-diam INSERT)', async () => {
    current = makeSupabase({ existingRow: null })
    await expect(updateOne('guru', 'g-hilang', { catatan_x: 'halo' })).rejects.toThrow(
      /tidak ditemukan/i
    )
    // inti regresi: stub {id, catatan_x} tanpa kolom wajib TIDAK boleh lahir
    expect(current.spy.insertCalls).toBe(0)
  })

  it('pesannya SAMA dgn jalur cepat — satu perilaku, tak peduli jenis field', async () => {
    current = makeSupabase({ existingRow: null, updateData: [] })
    const cepat = await updateOne('guru', 'x', { status: 'Aktif' }).catch((e) => e.message)
    current = makeSupabase({ existingRow: null })
    const lambat = await updateOne('guru', 'x', { catatan_x: 'y' }).catch((e) => e.message)
    expect(cepat).toBe(lambat)
  })
})

describe('mergeOne — kontraknya MEMANG boleh membuat baris (cermin setDoc merge:true)', () => {
  it('baris tak ada -> INSERT, JANGAN ikut diketatkan seperti updateOne', async () => {
    // Penjaga regresi: RekapDiniyahView/JabatanKelolaView mengandalkan ini untuk seed.
    current = makeSupabase({ existingRow: null })
    await expect(mergeOne('master', 'jabatan', { items: [] })).resolves.toBeUndefined()
    expect(current.spy.insertCalls).toBe(1)
  })
})
