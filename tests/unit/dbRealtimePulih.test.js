// Regresi kelas bug: "langganan realtime mati diam-diam, layar beku tanpa galat".
//
// Audit 12 Sep 2026 atas laporan Kyai "banyak beberapa kurang stabil dalam pemakaian".
// `subscribeColl` dulu memasang channel dengan `.subscribe()` TANPA callback status,
// jadi ketika channel-nya mati — HP/laptop tidur, WiFi berpindah, token diperbarui,
// server memutus channel yang menganggur — tak ada yang tahu. Daftar tetap tampak
// normal tapi isinya beku sampai aplikasi dimuat ulang.
//
// Berkas ini menjaga dua janji: channel yang putus DIPASANG ULANG dengan jeda menaik,
// dan data ditarik lagi begitu tersambung kembali / perangkat dipakai lagi.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock seperti dbRealtimeDebounce, DITAMBAH: callback status `.subscribe(cb)` disimpan
// supaya tes bisa mematikan & menghidupkan channel sendiri.
function makeSupabase() {
  const spy = { tarikan: 0, handlers: [], status: [], dibuat: 0, removed: 0 }
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
    spy.dibuat++
    const ch = {}
    ch.on = (_ev, _cfg, handler) => {
      spy.handlers.push(handler)
      return ch
    }
    ch.subscribe = (cb) => {
      spy.status.push(cb)
      return ch
    }
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

const { subscribeColl, _internal } = await import('../../vue-app/src/services/db.js')
const { RT_ULANG_MS, RT_JEDA_SEGAR_MS, RT_DEBOUNCE_MS } = _internal

/** Kirim status ke channel yang TERAKHIR dipasang. */
function kirimStatus(s) {
  const cb = current.spy.status[current.spy.status.length - 1]
  if (typeof cb === 'function') cb(s)
}

describe('channel realtime yang putus dipasang ulang', () => {
  beforeEach(() => {
    current = makeSupabase()
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('callback status BENAR-BENAR dipasang (dulu `.subscribe()` kosong)', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(typeof current.spy.status[0]).toBe('function')
    unsub()
  })

  it('CHANNEL_ERROR memasang ulang sesudah jeda pertama, tidak seketika', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(current.spy.dibuat).toBe(1)

    kirimStatus('CHANNEL_ERROR')
    vi.advanceTimersByTime(RT_ULANG_MS[0] - 1)
    expect(current.spy.dibuat).toBe(1) // masih menunggu — bukan badai percobaan
    vi.advanceTimersByTime(1)
    expect(current.spy.dibuat).toBe(2)
    expect(current.spy.removed).toBe(1) // channel mati dibuang dulu
    unsub()
  })

  it('TIMED_OUT dan CLOSED diperlakukan sama — keduanya nyata terjadi', () => {
    for (const s of ['TIMED_OUT', 'CLOSED']) {
      current = makeSupabase()
      const unsub = subscribeColl('keuangan_tagihan', () => {})
      kirimStatus(s)
      vi.advanceTimersByTime(RT_ULANG_MS[0])
      expect(current.spy.dibuat, `status ${s} harus memasang ulang`).toBe(2)
      unsub()
    }
  })

  it('jeda pemasangan ulang MENAIK — jaringan buruk tak dihujani percobaan', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    for (let i = 0; i < 3; i++) {
      kirimStatus('CHANNEL_ERROR')
      vi.advanceTimersByTime(RT_ULANG_MS[i] - 1)
      expect(current.spy.dibuat, `percobaan ke-${i + 1} terlalu cepat`).toBe(i + 1)
      vi.advanceTimersByTime(1)
      expect(current.spy.dibuat).toBe(i + 2)
    }
    unsub()
  })

  it('tersambung LAGI menarik data sekali — event selagi mati tak pernah dikirim ulang', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(current.spy.tarikan).toBe(1) // tarikan awal

    kirimStatus('SUBSCRIBED') // sambungan PERTAMA: jangan menarik dua kali
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)

    kirimStatus('CHANNEL_ERROR')
    vi.advanceTimersByTime(RT_ULANG_MS[0])
    kirimStatus('SUBSCRIBED') // sambungan ULANG: data bisa sudah basi
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(2)
    unsub()
  })

  it('sesudah unsubscribe, channel tidak dipasang ulang lagi', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    kirimStatus('CHANNEL_ERROR')
    unsub()
    vi.advanceTimersByTime(60000)
    expect(current.spy.dibuat).toBe(1)
  })
})

describe('perangkat dipakai lagi → data disegarkan', () => {
  beforeEach(() => {
    current = makeSupabase()
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  const kembaliTerlihat = () => document.dispatchEvent(new Event('visibilitychange'))

  it('kembali ke jendela sesudah lama menganggur menarik data', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(current.spy.tarikan).toBe(1)

    vi.advanceTimersByTime(RT_JEDA_SEGAR_MS + 1000) // perangkat ditinggal
    kembaliTerlihat()
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(2)
    unsub()
  })

  it('bolak-balik jendela dengan cepat TIDAK menarik berulang', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    for (let i = 0; i < 5; i++) kembaliTerlihat()
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1) // masih di dalam jeda RT_JEDA_SEGAR_MS
    unsub()
  })

  it('kembali online menarik data', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    vi.advanceTimersByTime(RT_JEDA_SEGAR_MS + 1000)
    window.dispatchEvent(new Event('online'))
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(2)
    unsub()
  })

  it('langganan yang sudah dilepas tak ikut disegarkan', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    unsub()
    vi.advanceTimersByTime(RT_JEDA_SEGAR_MS + 1000)
    kembaliTerlihat()
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
  })

  it('koleksi NON-realtime tidak mendaftar sebagai penyegar', () => {
    const unsub = subscribeColl('audit_log', () => {})
    vi.advanceTimersByTime(RT_JEDA_SEGAR_MS + 1000)
    kembaliTerlihat()
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
    unsub()
  })
})
