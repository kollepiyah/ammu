// Regresi kelas bug: "1 event realtime = 1 tarikan tabel PENUH".
// subscribeColl me-refetch seluruh koleksi tiap perubahan (cermin onSnapshot). Tanpa
// penggabungan, satu keranjang POS 3 item = 3 INSERT keuangan_buku_induk + 3 UPDATE
// keuangan_tagihan = 6 event -> 6x tarik tabel penuh (tagihan 2.805 baris per 3 Agu),
// di SETIAP komponen yang berlangganan dan setiap perangkat yang online. Itu penyebab
// paling nyata "PC kasir berat sesudah menyimpan" (audit Agu 2026, P4).
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock minimal: rantai baca (from->select->range) + channel realtime. Handler event
// disimpan supaya tes bisa "menembakkan" perubahan sendiri.
function makeSupabase() {
  const spy = { tarikan: 0, handlers: [], removed: 0 }
  const b = {}
  b.from = () => b
  b.select = () => b
  b.order = () => b
  b.eq = () => b
  b.limit = () => Promise.resolve({ data: [], error: null })
  b.range = () => {
    spy.tarikan++
    return Promise.resolve({ data: [], error: null })
  }
  b.maybeSingle = () => {
    spy.tarikan++
    return Promise.resolve({ data: null, error: null })
  }
  b.channel = () => {
    const ch = {}
    ch.on = (_ev, _cfg, handler) => {
      spy.handlers.push(handler)
      return ch
    }
    ch.subscribe = () => ch
    return ch
  }
  b.removeChannel = () => {
    spy.removed++
  }
  return { b, spy }
}

let current = makeSupabase()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return current.b
  }
}))

const { subscribeColl, subscribeDoc, _internal } = await import('../../vue-app/src/services/db.js')

describe('subscribeColl — event realtime digabung', () => {
  beforeEach(() => {
    current = makeSupabase()
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('6 event beruntun hanya memicu SATU tarikan tambahan', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(current.spy.tarikan).toBe(1) // tarikan awal saat subscribe
    const fire = current.spy.handlers[0]
    expect(typeof fire).toBe('function')

    for (let i = 0; i < 6; i++) fire() // cermin 1 keranjang POS 3 item
    expect(current.spy.tarikan).toBe(1) // belum ada tarikan tambahan (masih digabung)

    vi.advanceTimersByTime(399)
    expect(current.spy.tarikan).toBe(1)
    vi.advanceTimersByTime(1)
    expect(current.spy.tarikan).toBe(2) // 6 event -> 1 tarikan

    unsub()
    expect(current.spy.removed).toBe(1)
  })

  it('event yang datang berjauhan tetap masing-masing menarik', () => {
    subscribeColl('keuangan_tagihan', () => {})
    const fire = current.spy.handlers[0]
    fire()
    vi.advanceTimersByTime(500)
    expect(current.spy.tarikan).toBe(2)
    fire()
    vi.advanceTimersByTime(500)
    expect(current.spy.tarikan).toBe(3)
  })

  it('unsubscribe membatalkan tarikan yang masih tertunda', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    const fire = current.spy.handlers[0]
    fire()
    unsub()
    vi.advanceTimersByTime(5000)
    expect(current.spy.tarikan).toBe(1) // tak ada tarikan untuk komponen yang sudah dilepas
  })

  it('koleksi NON-realtime tetap fetch sekali tanpa channel', () => {
    expect(_internal.REALTIME.has('audit_log')).toBe(false)
    const unsub = subscribeColl('audit_log', () => {})
    expect(current.spy.tarikan).toBe(1)
    expect(current.spy.handlers.length).toBe(0)
    unsub()
    expect(current.spy.removed).toBe(0)
  })
})

describe('subscribeDoc — event realtime digabung', () => {
  beforeEach(() => {
    current = makeSupabase()
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('beberapa event pada satu baris hanya memicu satu tarikan tambahan', () => {
    subscribeDoc('settings', 'general', () => {})
    expect(current.spy.tarikan).toBe(1)
    const fire = current.spy.handlers[0]
    fire()
    fire()
    fire()
    expect(current.spy.tarikan).toBe(1)
    vi.advanceTimersByTime(400)
    expect(current.spy.tarikan).toBe(2)
  })
})
