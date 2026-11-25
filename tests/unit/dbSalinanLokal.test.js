// Audit egress 25 Nov 2026 (P2): tarikan AWAL subscribeColl dari salinan di perangkat.
// Janji yang dijaga: (1) salinan tampil seketika lalu disegarkan TANPA tarikan penuh;
// (2) hasil akhirnya sama dengan tarikan penuh — baris terhapus hilang, berubah terganti,
// baru ikut; (3) setiap keraguan (salinan basi, daftar id kosong, penyaring, pengguna lain)
// jatuh ke tarikan penuh seperti dulu.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const T0 = '2026-11-20T08:00:00.000000+00:00'
const T1 = '2026-11-25T09:00:00.000000+00:00'
const baris = (id, nama, updated_at = T0) => ({ id, nama, data: { x: id }, updated_at })

// Server rekaan: `tabel` = isi tabel sekarang. Mencatat setiap permintaan.
function makeSupabase() {
  const spy = { req: [] }
  const srv = { tabel: [] }
  const from = (table) => {
    const q = { table, select: '*', filters: [], inIds: null }
    const b = {}
    b.select = (s) => ((q.select = s), b)
    b.order = () => b
    b.eq = (c, v) => (q.filters.push(['eq', c, v]), b)
    b.gte = (c, v) => (q.filters.push(['gte', c, v]), b)
    b.limit = () => b
    const jawab = () => {
      spy.req.push({ ...q })
      let rows = srv.tabel
      for (const [op, c, v] of q.filters) {
        if (op === 'gte') rows = rows.filter((r) => String(r[c]) >= String(v))
        if (op === 'eq') rows = rows.filter((r) => r[c] === v)
      }
      if (q.inIds) rows = rows.filter((r) => q.inIds.includes(r.id))
      if (q.select === 'id') rows = rows.map((r) => ({ id: r.id }))
      return Promise.resolve({ data: rows.map((r) => ({ ...r })), error: null })
    }
    b.range = (a) => (a > 0 ? Promise.resolve({ data: [], error: null }) : jawab())
    b.in = (_c, ids) => ((q.inIds = ids), jawab())
    b.maybeSingle = () => Promise.resolve({ data: null, error: null })
    return b
  }
  const ch = { on: () => ch, subscribe: () => ch }
  return { b: { from, channel: () => ch, removeChannel: () => {} }, spy, srv }
}

let cur = makeSupabase()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return cur.b
  }
}))

const db = await import('../../vue-app/src/services/db.js')
const lokal = await import('../../vue-app/src/services/salinanLokal.js')
const { subscribeColl, setAuditSesi, hapusSalinanLokal, _internal } = db
const { SALINAN_LOKAL, SEGAR_DELTA, SALINAN_JEDA_SIMPAN_MS, SALINAN_VERSI } = _internal

const gudang = new Map()
lokal._aturPenyimpanan({
  muat: async (k) => gudang.get(k),
  simpan: async (k, v) => void gudang.set(k, structuredClone(v)),
  hapusSemua: async () => gudang.clear()
})

const tunggu = async () => {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}
const tarikPenuh = () =>
  cur.spy.req.filter((r) => r.select === '*' && !r.filters.length && !r.inIds)

beforeEach(() => {
  vi.useFakeTimers()
  cur = makeSupabase()
  gudang.clear()
  setAuditSesi({ role: 'guru', id: 'g1' })
})
afterEach(() => {
  vi.useRealTimers()
  setAuditSesi(null)
})

async function bukaDanSimpan(rows) {
  cur.srv.tabel = rows
  const unsub = subscribeColl('santri', () => {})
  await tunggu()
  await vi.advanceTimersByTimeAsync(SALINAN_JEDA_SIMPAN_MS + 10)
  unsub()
}

describe('salinan lokal subscribeColl', () => {
  it('tabel salinan harus bagian dari SEGAR_DELTA (punya trigger updated_at)', () => {
    for (const t of SALINAN_LOKAL) expect(SEGAR_DELTA.has(t), t).toBe(true)
  })

  it('pertama kali: tarikan penuh, lalu salinan tersimpan', async () => {
    await bukaDanSimpan([baris('a', 'A'), baris('b', 'B')])
    expect(tarikPenuh()).toHaveLength(1)
    const [[kunci, s]] = [...gudang]
    expect(kunci).toBe('guru:g1|santri|[]')
    expect(s.v).toBe(SALINAN_VERSI)
    expect(s.rows.map((r) => r.id)).toEqual(['a', 'b'])
  })

  it('dibuka lagi: salinan tampil seketika, disegarkan TANPA tarikan penuh, hasil = isi server', async () => {
    await bukaDanSimpan([baris('a', 'A'), baris('b', 'B'), baris('c', 'C')])
    cur = makeSupabase()
    // Sementara itu di server: b terhapus, c berubah, d baru (updated_at lama — hanya tertangkap
    // lewat daftar id, mis. baru terlihat karena RLS).
    cur.srv.tabel = [baris('a', 'A'), baris('c', 'C2', T1), baris('d', 'D')]
    const terima = []
    subscribeColl('santri', (docs) => terima.push(docs.map((d) => `${d.id}:${d.nama}`)))
    await tunggu()
    expect(terima[0]).toEqual(['a:A', 'b:B', 'c:C']) // dari salinan, sebelum jaringan
    expect(tarikPenuh()).toHaveLength(0)
    expect(cur.spy.req.some((r) => r.select === 'id')).toBe(true)
    expect(cur.spy.req.some((r) => r.filters.some((f) => f[1] === 'updated_at'))).toBe(true)
    expect(terima.at(-1)).toEqual(['a:A', 'c:C2', 'd:D'])
  })

  it('daftar id KOSONG di tarikan awal (token belum menempel) → tak dikosongkan, tarik penuh', async () => {
    await bukaDanSimpan([baris('a', 'A')])
    cur = makeSupabase()
    cur.srv.tabel = [] // RLS menyaring semua
    const terima = []
    subscribeColl('santri', (docs) => terima.push(docs.length))
    await tunggu()
    await vi.advanceTimersByTimeAsync(1000)
    expect(terima[0]).toBe(1)
    expect(tarikPenuh()).toHaveLength(1)
    // Hasil kosong TIDAK menimpa salinan.
    await vi.advanceTimersByTimeAsync(SALINAN_JEDA_SIMPAN_MS + 10)
    expect([...gudang.values()][0].rows).toHaveLength(1)
  })

  it('salinan lebih tua dari 7 hari sejak tarikan penuh → tarik penuh', async () => {
    await bukaDanSimpan([baris('a', 'A')])
    vi.setSystemTime(Date.now() + 8 * 24 * 3600 * 1000)
    cur = makeSupabase()
    cur.srv.tabel = [baris('a', 'A')]
    subscribeColl('santri', () => {})
    await tunggu()
    expect(tarikPenuh()).toHaveLength(1)
  })

  it('pengguna lain di perangkat yang sama tak memakai salinan orang lain', async () => {
    await bukaDanSimpan([baris('a', 'A')])
    setAuditSesi({ role: 'santri', id: 's9' })
    cur = makeSupabase()
    cur.srv.tabel = [baris('a', 'A')]
    subscribeColl('santri', () => {})
    await tunggu()
    expect(tarikPenuh()).toHaveLength(1)
  })

  it('langganan berpenyaring & tabel di luar daftar tak memakai salinan', () => {
    expect(_internal.kunciSalinan('santri', [['lembaga', '==', 'PTPT']], [])).toBeNull()
    expect(_internal.kunciSalinan('absensi_shift_guru', [], [])).toBeNull()
    setAuditSesi(null)
    expect(_internal.kunciSalinan('santri', [], [])).toBeNull()
  })

  it('keluar akun membuang semua salinan', async () => {
    await bukaDanSimpan([baris('a', 'A')])
    expect(gudang.size).toBe(1)
    await hapusSalinanLokal()
    expect(gudang.size).toBe(0)
  })
})
