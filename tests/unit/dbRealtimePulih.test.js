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
const { RT_ULANG_MS, RT_JEDA_SEGAR_MS, RT_DEBOUNCE_MS, RT_SEGAR_SESUDAH_SEMBUNYI_MS } = _internal

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

// ---------------------------------------------------------------------------
// INSIDEN 14–17 Sep 2026: egress Supabase 19,42 GB dari kuota 5 GB, semua proyek
// dibatasi ("Services restricted") dan tak seorang pun bisa login.
//
// Mock di atas memperlakukan `removeChannel` sebagai pencatat pasif. realtime-js
// 2.108 TIDAK begitu: `removeChannel(ch)` -> `ch.unsubscribe()` -> phoenix `leave()`
// memicu onClose hooks, dan `subscribe(cb)` mendaftarkan `cb('CLOSED')` di sana. Jadi
// channel yang kita BUANG SENDIRI saat memasang ulang ikut mengabarkan CLOSED — dan
// kode v.1.4.2 membacanya sebagai "putus lagi": pasang ulang -> SUBSCRIBED -> tarik
// tabel PENUH -> buang -> CLOSED -> ... tiap ±1 detik, selamanya, untuk SETIAP
// langganan, di setiap perangkat yang pernah sekali saja putus (HP tidur, WiFi ganti).
//
// Mock di bawah meniru perilaku pustaka yang sebenarnya (dibuktikan terhadap
// realtime-js 2.108.2 terpasang: removeChannel -> callback menerima ["CLOSED"]).
function makeSupabaseNyata({ rtt = 150, closedSinkron = false } = {}) {
  const spy = { tarikan: 0, dibuat: 0, removed: 0, kanal: [] }
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
    const ch = { cb: null, dibuang: false }
    ch.on = () => ch
    ch.subscribe = (cb) => {
      ch.cb = cb
      // server menjawab join sesudah satu perjalanan pulang-pergi
      setTimeout(() => !ch.dibuang && cb('SUBSCRIBED'), rtt)
      return ch
    }
    spy.kanal.push(ch)
    return ch
  }
  b.removeChannel = (ch) => {
    spy.removed++
    ch.dibuang = true
    // Soket tersambung: CLOSED tiba saat server membalas `leave`. Soket putus:
    // phoenix memicu 'ok' seketika (`!canPush()`), jadi CLOSED datang SINKRON.
    if (closedSinkron) ch.cb?.('CLOSED')
    else setTimeout(() => ch.cb?.('CLOSED'), rtt)
    return Promise.resolve('ok')
  }
  return { b, spy }
}

describe('channel yang dibuang sendiri tak boleh memicu pemasangan ulang (insiden egress)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  /** Satu kali putus sungguhan, lalu biarkan aplikasi terbuka 10 menit. */
  async function putusSekaliLalu10Menit(opsi) {
    current = makeSupabaseNyata(opsi)
    const unsub = subscribeColl('keuangan_buku_induk', () => {})
    await vi.advanceTimersByTimeAsync(1000) // tersambung pertama kali
    expect(current.spy.tarikan).toBe(1)

    const [pertama] = current.spy.kanal
    pertama.cb('CHANNEL_ERROR') // HP tidur / WiFi berpindah — SEKALI
    await vi.advanceTimersByTimeAsync(10 * 60 * 1000)
    const hasil = { ...current.spy }
    unsub()
    return hasil
  }

  it('satu putus = satu pasang ulang + satu tarikan susulan, bukan perulangan', async () => {
    const s = await putusSekaliLalu10Menit()
    expect(s.dibuat).toBe(2) // channel awal + satu pengganti
    expect(s.tarikan).toBe(2) // tarikan awal + satu susulan sesudah tersambung lagi
  })

  it('tetap diam saat CLOSED datang SINKRON (soket sedang putus waktu dibuang)', async () => {
    const s = await putusSekaliLalu10Menit({ closedSinkron: true })
    expect(s.dibuat).toBe(2)
    expect(s.tarikan).toBe(2)
  })

  it('CLOSED dari server pada channel yang MASIH dipakai tetap memasang ulang', async () => {
    current = makeSupabaseNyata()
    const unsub = subscribeColl('keuangan_buku_induk', () => {})
    await vi.advanceTimersByTimeAsync(1000)
    current.spy.kanal[0].cb('CLOSED') // server menutup channel — ini putus sungguhan
    await vi.advanceTimersByTimeAsync(RT_ULANG_MS[0] + 1000)
    unsub()
    expect(current.spy.dibuat).toBe(2)
  })

  it('channel yang putus-sambung terus (server) tak menarik tabel lebih dari 2x per menit', async () => {
    current = makeSupabaseNyata()
    const unsub = subscribeColl('keuangan_buku_induk', () => {})
    await vi.advanceTimersByTimeAsync(1000)
    const awal = current.spy.tarikan
    // Server menerima join lalu memutusnya lagi, berulang-ulang, selama 10 menit.
    const putusin = setInterval(() => {
      const aktif = current.spy.kanal.filter((k) => !k.dibuang)
      for (const k of aktif) k.cb?.('CHANNEL_ERROR')
    }, 500)
    await vi.advanceTimersByTimeAsync(10 * 60 * 1000)
    clearInterval(putusin)
    unsub()
    expect(current.spy.tarikan - awal).toBeLessThanOrEqual(20)
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

  // jsdom selalu `hidden === false`; tes ini perlu jendela yang bisa disembunyikan.
  let tersembunyi = false
  beforeEach(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => tersembunyi })
  })
  afterEach(() => {
    tersembunyi = false
    delete document.hidden
  })
  const ubahTerlihat = (sembunyi) => {
    tersembunyi = sembunyi
    document.dispatchEvent(new Event('visibilitychange'))
  }
  /** Minimize / pindah aplikasi / tertutup jendela lain selama `ms`, lalu kembali. */
  const sembunyikanSelama = (ms) => {
    ubahTerlihat(true)
    vi.advanceTimersByTime(ms)
    ubahTerlihat(false)
  }

  it('kembali ke jendela sesudah lama tersembunyi menarik data', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    expect(current.spy.tarikan).toBe(1)

    sembunyikanSelama(RT_SEGAR_SESUDAH_SEMBUNYI_MS) // perangkat ditinggal
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(2)
    unsub()
  })

  it('pindah ke Excel lalu kembali, berulang-ulang, TIDAK menarik tabel', () => {
    // INSIDEN 14–17 Sep 2026: dulu tiap kembali terlihat (>5 detik sejak tarikan
    // terakhir) menarik ulang SEMUA tabel yang dilanggani, betapa pun singkat jendelanya
    // ditinggal — dan di PC kasir, pindah jendela bisa terjadi puluhan kali sehari.
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    for (let i = 0; i < 20; i++) {
      sembunyikanSelama(RT_SEGAR_SESUDAH_SEMBUNYI_MS / 2)
      vi.advanceTimersByTime(RT_JEDA_SEGAR_MS) // bekerja di jendela Ammu sebentar
    }
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
    unsub()
  })

  it('kabar "terlihat" beruntun tanpa pernah tersembunyi TIDAK menarik', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    vi.advanceTimersByTime(RT_SEGAR_SESUDAH_SEMBUNYI_MS * 2)
    for (let i = 0; i < 5; i++) ubahTerlihat(false)
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
    unsub()
  })

  it('tiap sembunyi-lama = satu tarikan; kabar "online" sesaat sesudahnya tidak', () => {
    const unsub = subscribeColl('keuangan_tagihan', () => {})
    ubahTerlihat(true)
    vi.advanceTimersByTime(RT_SEGAR_SESUDAH_SEMBUNYI_MS)
    ubahTerlihat(false)
    ubahTerlihat(true) // bolak-balik lagi seketika sesudahnya
    vi.advanceTimersByTime(RT_SEGAR_SESUDAH_SEMBUNYI_MS)
    ubahTerlihat(false)
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(3) // awal + dua kali tersembunyi lama

    // koleksi yang baru ditarik (< RT_JEDA_SEGAR_MS) tak ditarik lagi oleh pemicu lain
    window.dispatchEvent(new Event('online'))
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(3)
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
    sembunyikanSelama(RT_SEGAR_SESUDAH_SEMBUNYI_MS)
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
  })

  it('koleksi NON-realtime tidak mendaftar sebagai penyegar', () => {
    const unsub = subscribeColl('audit_log', () => {})
    sembunyikanSelama(RT_SEGAR_SESUDAH_SEMBUNYI_MS)
    vi.advanceTimersByTime(RT_DEBOUNCE_MS + 10)
    expect(current.spy.tarikan).toBe(1)
    unsub()
  })
})
