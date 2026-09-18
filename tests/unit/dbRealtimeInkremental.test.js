// v.1.4.4 — event realtime DITERAPKAN ke salinan lokal, bukan memicu tarikan tabel penuh.
//
// Sampai v.1.4.3 satu INSERT di keuangan_buku_induk membuat SETIAP langganan di SETIAP
// perangkat yang online mengunduh ulang seluruh buku induk. Organisasi Supabase-nya di
// Free Plan (egress 5 GB per siklus; insiden 14–17 Sep 2026 menembus 19,42 GB dan tak
// seorang pun bisa login), jadi jalur baca yang menarik satu tabel per event adalah
// anggaran yang tak ada.
//
// Berkas ini menjaga tiga janji:
//   1. event yang payload-nya utuh dan pasti = NOL permintaan ke server;
//   2. yang tak pasti (kolom TOAST hilang, `errors`, penyaring yang tak bisa dijawab di
//      klien) ditanyakan PER ID, bukan per tabel — dan hasilnya sama dengan tarikan penuh;
//   3. kontrak callback tetap: array penuh berbentuk Firestore, array baru tiap kali.
//
// Mock-nya meniru server sungguhan sejauh yang relevan: tabel di memori yang menjawab
// penyaring PostgREST (eq/gte/lte/in), channel yang SUBSCRIBED sesudah satu RTT dan
// mengabarkan CLOSED saat dibuang (pola makeSupabaseNyata di dbRealtimePulih), serta
// payload berbentuk realtime-js — { eventType, new, old, errors, commit_timestamp } —
// dengan kolom berurutan jsonb (kunci pendek dulu), bukan urutan kolom PostgREST.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const TABEL = 'keuangan_buku_induk'
const RTT = 150
// Jam server sengaja meleset 3 jam dari jam perangkat: penambal celah awal harus memakai
// jam server (commit_timestamp), bukan jam HP yang sering salah.
const SELISIH_SERVER_MS = 3 * 3600 * 1000
const KINI = new Date('2026-09-18T03:00:00.000Z')

const salin = (o) => JSON.parse(JSON.stringify(o))
/** Bentuk timestamptz dari PostgREST / to_jsonb: "…+00:00", bukan "…Z". */
const isoPg = (ms) => new Date(ms).toISOString().replace('Z', '+00:00')
const jamServer = () => isoPg(Date.now() + SELISIH_SERVER_MS)

/** Satu baris keuangan_buku_induk dalam bentuk DB (kolom riil + ekor `data`). */
function bi(id, ubah = {}) {
  return {
    id,
    tipe: 'masuk',
    sumber: 'pos_santri',
    nominal: 50000,
    tanggal: '2026-09-18',
    keterangan: 'Syahriyah',
    data: { santri_id: 's1', lembaga: 'PTPT' },
    created_at: '2026-09-18T01:00:00+00:00',
    updated_at: '2026-09-18T01:00:00+00:00',
    ...ubah
  }
}

// ---- server tiruan -----------------------------------------------------------
function nilaiKolom(row, ref) {
  if (ref.includes('->>')) {
    const [kolom, field] = ref.split('->>')
    const v = row[kolom] ? row[kolom][field] : undefined
    if (v === undefined || v === null) return null
    return typeof v === 'string' ? v : JSON.stringify(v)
  }
  return row[ref] === undefined ? null : row[ref]
}
function cocokSyarat(row, [ref, op, val]) {
  const v = nilaiKolom(row, ref)
  if (op === 'in') return val.map(String).includes(String(v))
  if (v === null) return false
  const waktu = ref === 'created_at' || ref === 'updated_at'
  const a = waktu ? Date.parse(v) : typeof v === 'number' ? v : String(v)
  const b = waktu ? Date.parse(val) : typeof v === 'number' ? Number(val) : String(val)
  if (op === 'eq') return a === b
  if (op === 'gte') return a >= b
  if (op === 'lte') return a <= b
  if (op === 'gt') return a > b
  if (op === 'lt') return a < b
  throw new Error(`mock: operator ${op} belum didukung`)
}
/** Kolom record realtime diurutkan seperti kunci jsonb: yang pendek dulu. */
function urutJsonb(row) {
  const out = {}
  const kunci = Object.keys(row).sort((a, b) => a.length - b.length || (a < b ? -1 : 1))
  for (const k of kunci) out[k] = row[k]
  return out
}

/** @param {object} [opsi]
 *  @param {number|((n:number)=>number)} [opsi.tunda] jeda jawaban (ms); fungsi = per
 *    permintaan ke-n (0 = tarikan awal), untuk membuat jawaban tiba tak berurutan. */
function makeServer(barisAwal = [], { tunda = 0, gagalPerId = false, tabel = TABEL } = {}) {
  const baris = barisAwal.map(salin)
  const spy = { permintaan: [], kanal: [] }
  const jawab = (hasil) => {
    const ms = typeof tunda === 'function' ? tunda(spy.permintaan.length - 1) : tunda
    return new Promise((res) => (ms ? setTimeout(() => res(hasil), ms) : res(hasil)))
  }

  const b = {}
  b.from = () => {
    const syarat = []
    const q = {}
    q.select = () => q
    q.order = () => q
    for (const op of ['eq', 'gte', 'lte', 'gt', 'lt']) {
      q[op] = (ref, val) => {
        syarat.push([ref, op, val])
        return q
      }
    }
    // Snapshot diambil SAAT permintaan dieksekusi, jawaban boleh tiba belakangan.
    const pilih = (tambahan = []) =>
      baris.filter((r) => [...syarat, ...tambahan].every((s) => cocokSyarat(r, s))).map(salin)
    q.range = (from, to) => {
      spy.permintaan.push({ jenis: 'range', from, syarat: [...syarat] })
      return jawab({ data: pilih().slice(from, to + 1), error: null })
    }
    q.in = (ref, ids) => {
      spy.permintaan.push({ jenis: 'in', ids: [...ids], syarat: [...syarat] })
      if (gagalPerId) return jawab({ data: null, error: new Error('jaringan putus') })
      return jawab({ data: pilih([[ref, 'in', ids]]), error: null })
    }
    return q
  }
  b.channel = () => {
    const ch = { cb: null, handler: null, dibuang: false }
    ch.on = (_ev, _cfg, handler) => {
      ch.handler = handler
      return ch
    }
    ch.subscribe = (cb) => {
      ch.cb = cb
      setTimeout(() => !ch.dibuang && cb('SUBSCRIBED'), RTT)
      return ch
    }
    spy.kanal.push(ch)
    return ch
  }
  b.removeChannel = (ch) => {
    ch.dibuang = true
    setTimeout(() => ch.cb?.('CLOSED'), RTT) // perilaku realtime-js 2.108 (lihat dbRealtimePulih)
    return Promise.resolve('ok')
  }

  const payload = (eventType, baru, lama) => ({
    schema: 'public',
    table: tabel,
    commit_timestamp: new Date(Date.now() + SELISIH_SERVER_MS).toISOString(),
    eventType,
    new: baru ? urutJsonb(salin(baru)) : {},
    old: lama || {},
    errors: null
  })

  return {
    b,
    spy,
    baris,
    /** Kirim payload ke SETIAP channel yang masih hidup, seperti server Realtime. */
    siarkan(p) {
      for (const ch of spy.kanal) if (!ch.dibuang && ch.handler) ch.handler(p)
    },
    tambah(row) {
      const r = { ...row, created_at: jamServer(), updated_at: jamServer() }
      baris.push(salin(r))
      return payload('INSERT', r)
    },
    /** UPDATE di server. `tanpa`: kolom yang TIDAK ikut terkirim (TOAST tak berubah). */
    ubah(id, ubahan, { tanpa = [] } = {}) {
      const r = baris.find((x) => x.id === id)
      Object.assign(r, salin(ubahan), { updated_at: jamServer() })
      const kirim = salin(r)
      for (const k of tanpa) delete kirim[k]
      return payload('UPDATE', kirim)
    },
    hapus(id) {
      const i = baris.findIndex((x) => x.id === id)
      if (i >= 0) baris.splice(i, 1)
      return payload('DELETE', null, { id }) // tanpa REPLICA IDENTITY FULL: PK saja
    },
    tarikPenuh: () =>
      spy.permintaan.filter(
        (q) => q.jenis === 'range' && q.from === 0 && !q.syarat.some(([r]) => r === 'updated_at')
      ),
    susulan: () =>
      spy.permintaan.filter(
        (q) => q.jenis === 'range' && q.syarat.some(([r]) => r === 'updated_at')
      ),
    perId: () => spy.permintaan.filter((q) => q.jenis === 'in')
  }
}

let srv = makeServer()
vi.mock('../../vue-app/src/services/supabase', () => ({
  get supabase() {
    return srv.b
  }
}))

const { subscribeColl, _internal } = await import('../../vue-app/src/services/db.js')
const { RT_DEBOUNCE_MS, RT_ULANG_MS, RT_TARIK_ID_MAKS, RT_SUSUL_AWAL_MARGIN_MS } = _internal
const { cocokFilter, bandingUrutan, mikrodetik } = _internal

const tunggu = (ms) => vi.advanceTimersByTimeAsync(ms)
const lewatJedaGabung = () => tunggu(RT_DEBOUNCE_MS + 50)

/** Berlangganan dan tunggu tarikan awal selesai + channel tersambung. */
async function langganan({ tabel = TABEL, filters = [], orders = [] } = {}) {
  const panggilan = []
  const unsub = subscribeColl(tabel, (docs) => panggilan.push(docs), filters, orders)
  await tunggu(RTT + 50)
  return { unsub, panggilan, terakhir: () => panggilan[panggilan.length - 1] }
}

/** Seperti `langganan`, lalu lewati gelombang event PERTAMA — gelombang itu membawa satu
 *  tarikan susulan kecil untuk celah awal (diuji tersendiri di bawah). Sesudahnya
 *  hitungan permintaan dikosongkan, jadi tes cukup menghitung dari nol. */
async function langgananSiap(opsi) {
  const l = await langganan(opsi)
  srv.siarkan(srv.hapus('__pemanasan__')) // DELETE id yang tak ada: tak mengubah apa pun
  await lewatJedaGabung()
  expect(srv.susulan()).toHaveLength(1)
  srv.spy.permintaan.length = 0
  return l
}

const idDari = (docs) => docs.map((d) => d.id)

let lepas = []
beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(KINI)
  lepas = []
})
afterEach(() => {
  for (const f of lepas) f()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

// =============================================================================
describe('event diterapkan ke salinan lokal — tanpa menarik ulang tabel', () => {
  it('INSERT: baris baru muncul di callback, NOL permintaan ke server', async () => {
    srv = makeServer([bi('a'), bi('b')])
    const l = await langgananSiap()
    lepas.push(l.unsub)

    srv.siarkan(srv.tambah(bi('c', { nominal: 75000, data: { santri_id: 's2' } })))
    await lewatJedaGabung()

    expect(srv.spy.permintaan).toHaveLength(0)
    expect(idDari(l.terakhir())).toEqual(['a', 'b', 'c'])
    // bentuk Firestore lewat _flatten yang sama: ekor `data` diratakan
    expect(l.terakhir()[2]).toMatchObject({ id: 'c', nominal: 75000, santri_id: 's2' })
    expect(l.terakhir()[2]).not.toHaveProperty('data')
  })

  it('UPDATE: baris diganti DI TEMPATNYA; DELETE cukup dengan primary key', async () => {
    srv = makeServer([bi('a'), bi('b'), bi('c')])
    const l = await langgananSiap()
    lepas.push(l.unsub)

    srv.siarkan(srv.ubah('b', { nominal: 1234, data: { santri_id: 's1', lunas: true } }))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['a', 'b', 'c'])
    expect(l.terakhir()[1]).toMatchObject({ id: 'b', nominal: 1234, lunas: true })

    srv.siarkan(srv.hapus('a'))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['b', 'c'])
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('satu keranjang POS (3 INSERT + 3 UPDATE) = SATU callback, nol permintaan', async () => {
    srv = makeServer([bi('t1'), bi('t2'), bi('t3')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const sebelum = l.panggilan.length

    for (let i = 1; i <= 3; i++) {
      srv.siarkan(srv.tambah(bi(`k${i}`)))
      srv.siarkan(srv.ubah(`t${i}`, { keterangan: 'Lunas' }))
    }
    await tunggu(RT_DEBOUNCE_MS - 50)
    expect(l.panggilan.length).toBe(sebelum) // masih digabung
    await tunggu(100)
    expect(l.panggilan.length).toBe(sebelum + 1)
    expect(idDari(l.terakhir())).toEqual(['t1', 't2', 't3', 'k1', 'k2', 'k3'])
    expect(
      l
        .terakhir()
        .slice(0, 3)
        .every((d) => d.keterangan === 'Lunas')
    ).toBe(true)
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('tiga langganan buku induk di satu perangkat: satu INSERT tetap nol permintaan', async () => {
    // store koleksi + Buku Induk + Laporan Keuangan — dulu = 3 tarikan tabel utuh per event
    srv = makeServer([bi('a')])
    const ls = []
    for (let i = 0; i < 3; i++) ls.push(await langgananSiap())
    for (const l of ls) lepas.push(l.unsub)

    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    expect(srv.spy.permintaan).toHaveLength(0)
    for (const l of ls) expect(idDari(l.terakhir())).toEqual(['a', 'b'])
  })

  it('event yang tak mengubah apa pun (DELETE id asing, INSERT ganda) tak memanggil callback', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const p = srv.tambah(bi('b'))
    srv.siarkan(p)
    await lewatJedaGabung()
    const sesudahInsert = l.panggilan.length

    srv.siarkan(p) // event yang sama terkirim dua kali
    srv.siarkan(srv.hapus('tak-pernah-ada'))
    await lewatJedaGabung()
    expect(l.panggilan.length).toBe(sesudahInsert)
  })
})

// =============================================================================
describe('kontrak callback tetap', () => {
  it('array BARU tiap kali; baris yang tak berubah tetap objek yang sama', async () => {
    // Array baru wajib: store & view menyimpannya ke ref(), dan Vue tak memicu apa pun
    // bila nilai yang sama di-assign ulang.
    srv = makeServer([bi('a'), bi('b')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const sebelum = l.terakhir()

    srv.siarkan(srv.ubah('b', { nominal: 1 }))
    await lewatJedaGabung()
    const sesudah = l.terakhir()
    expect(sesudah).not.toBe(sebelum)
    expect(sesudah[0]).toBe(sebelum[0])
    expect(sesudah[1]).not.toBe(sebelum[1])
    expect(sebelum[1].nominal).toBe(50000) // array lama tak ikut berubah
  })

  it('dokumen dari event tak bisa dibedakan dari dokumen hasil tarikan — urutan kunci pun sama', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    const [dariTarikan, dariEvent] = l.terakhir()
    expect(Object.keys(dariEvent)).toEqual(Object.keys(dariTarikan))
  })

  it('komponen yang sudah dilepas tak menerima hasil tarikan yang masih di jalan', async () => {
    // Dulu tarikan yang sedang berjalan tetap memanggil callback sesudah unsubscribe —
    // termasuk sesudah logout (collections.clear), mengisi lagi store yang baru dikosongkan.
    srv = makeServer([bi('a')], { tunda: 1000 })
    const panggilan = []
    const unsub = subscribeColl(TABEL, (docs) => panggilan.push(docs))
    await tunggu(500)
    unsub()
    await tunggu(5000)
    expect(panggilan).toHaveLength(0)
  })
})

// =============================================================================
describe('penyaring pemanggil tetap berlaku', () => {
  it('santri_id milik sendiri (useNotifications): baris santri lain diabaikan, yang pindah dibuang', async () => {
    srv = makeServer([bi('a'), bi('x', { data: { santri_id: 's2' } })])
    const l = await langgananSiap({ filters: [['santri_id', '==', 's1']] })
    lepas.push(l.unsub)
    expect(idDari(l.terakhir())).toEqual(['a'])
    const n = l.panggilan.length

    srv.siarkan(srv.tambah(bi('y', { data: { santri_id: 's2' } })))
    await lewatJedaGabung()
    expect(l.panggilan.length).toBe(n) // bukan urusan langganan ini

    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['a', 'b'])

    srv.siarkan(srv.ubah('a', { data: { santri_id: 's2' } })) // tak lagi lolos penyaring
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['b'])
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('jendela tanggal di ekor jsonb (useAbsensi) dinilai di klien', async () => {
    const abs = (id, tanggal) => ({
      id,
      guru_id: 'g1',
      periode: tanggal.slice(0, 7),
      data: { tanggal, shift: 'pagi' },
      created_at: '2026-09-01T01:00:00+00:00',
      updated_at: '2026-09-01T01:00:00+00:00'
    })
    srv = makeServer([abs('a', '2026-09-02')], { tabel: 'absensi_shift_guru' })
    const l = await langgananSiap({
      tabel: 'absensi_shift_guru',
      filters: [
        ['tanggal', '>=', '2026-09-01'],
        ['tanggal', '<=', '2026-09-30']
      ]
    })
    lepas.push(l.unsub)

    srv.siarkan(srv.tambah(abs('okt', '2026-10-01')))
    srv.siarkan(srv.tambah(abs('sep', '2026-09-30')))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['a', 'sep'])
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('batas created_at 30 hari (useNotifications) dinilai sampai mikrodetik', async () => {
    const batas = '2026-08-19T03:00:00.000Z'
    srv = makeServer([bi('baru', { created_at: '2026-09-01T00:00:00+00:00' })])
    const l = await langgananSiap({ filters: [['created_at', '>=', batas]] })
    lepas.push(l.unsub)

    // baris lama yang diedit tetap di luar jendela
    srv.baris.push(bi('lama', { created_at: '2026-08-19T02:59:59.999999+00:00' }))
    srv.siarkan(srv.ubah('lama', { nominal: 1 }))
    srv.siarkan(srv.tambah(bi('kini')))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['baru', 'kini'])
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('penyaring yang tak bisa dipastikan di klien diserahkan ke server — per id', async () => {
    // Rentang pada teks bebas bergantung collation DB; klien tak menebak.
    srv = makeServer([bi('a', { keterangan: 'Syahriyah' })])
    const l = await langgananSiap({ filters: [['keterangan', '>=', 'Kas']] })
    lepas.push(l.unsub)

    srv.siarkan(srv.tambah(bi('b', { keterangan: 'Uang gedung' })))
    srv.siarkan(srv.tambah(bi('c', { keterangan: 'Infaq' })))
    await lewatJedaGabung()
    expect(srv.tarikPenuh()).toHaveLength(0)
    expect(srv.perId()).toHaveLength(1)
    expect(srv.perId()[0].ids.sort()).toEqual(['b', 'c'])
    expect(srv.perId()[0].syarat).toContainEqual(['keterangan', 'gte', 'Kas'])
    // server menjawab: 'Uang gedung' lolos, 'Infaq' tidak
    expect(idDari(l.terakhir())).toEqual(['a', 'b'])
  })
})

// =============================================================================
describe('urutan (`orders`) tetap berlaku', () => {
  it('DESC: baris baru & baris yang tanggalnya berubah mendarat di tempatnya; NULL di depan', async () => {
    srv = makeServer([
      bi('c', { tanggal: '2026-09-20' }),
      bi('b', { tanggal: '2026-09-18' }),
      bi('a', { tanggal: '2026-09-10' })
    ])
    const l = await langgananSiap({ orders: [['tanggal', 'desc']] })
    lepas.push(l.unsub)

    srv.siarkan(srv.tambah(bi('d', { tanggal: '2026-09-15' })))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['c', 'b', 'd', 'a'])

    srv.siarkan(srv.ubah('a', { tanggal: '2026-09-25' }))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['a', 'c', 'b', 'd'])

    // Postgres: DESC -> NULLS FIRST
    srv.siarkan(srv.tambah(bi('n', { tanggal: null })))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['n', 'a', 'c', 'b', 'd'])
  })

  it('ASC dengan kunci kedua: NULL di belakang, seri diputus kunci berikutnya', async () => {
    srv = makeServer([
      bi('a', { tanggal: '2026-09-01', nominal: 10 }),
      bi('b', { tanggal: '2026-09-02', nominal: 5 })
    ])
    const l = await langgananSiap({
      orders: [
        ['tanggal', 'asc'],
        ['nominal', 'desc']
      ]
    })
    lepas.push(l.unsub)

    srv.siarkan(srv.tambah(bi('n', { tanggal: null })))
    srv.siarkan(srv.tambah(bi('c', { tanggal: '2026-09-01', nominal: 99 })))
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['c', 'a', 'b', 'n'])
  })
})

// =============================================================================
describe('payload yang tak utuh ditanyakan per id, bukan per tabel', () => {
  it('UPDATE tanpa kolom `data` (TOAST tak berubah) -> tanya satu baris itu', async () => {
    srv = makeServer([bi('a'), bi('b', { data: { santri_id: 's7', catatan: 'panjang' } })])
    const l = await langgananSiap()
    lepas.push(l.unsub)

    // mis. edge function: UPDATE ... SET nominal = … — kolom `data` tak disentuh
    srv.siarkan(srv.ubah('b', { nominal: 99000 }, { tanpa: ['data'] }))
    await lewatJedaGabung()

    expect(srv.tarikPenuh()).toHaveLength(0)
    expect(srv.perId()).toEqual([expect.objectContaining({ ids: ['b'] })])
    // field dari ekor jsonb TIDAK lenyap
    expect(l.terakhir()[1]).toMatchObject({
      id: 'b',
      nominal: 99000,
      santri_id: 's7',
      catatan: 'panjang'
    })
  })

  it('`errors` terisi (413: baris > 1 MB dikirim terpotong) -> tanya baris itu', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const p = srv.ubah('a', { keterangan: 'besar' })
    p.errors = ['Error 413: Payload Too Large']
    p.new = { id: 'a' } // hanya kolom ≤ 64 byte yang ikut
    srv.siarkan(p)
    await lewatJedaGabung()
    expect(srv.perId()).toHaveLength(1)
    expect(l.terakhir()[0]).toMatchObject({ keterangan: 'besar', santri_id: 's1' })
  })

  it('record yang ber-`errors` tak dipercaya walau kolomnya tampak lengkap', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const p = srv.ubah('a', { keterangan: 'versi server' })
    p.new = { ...p.new, keterangan: 'versi rusak' }
    p.errors = ['Error 413: Payload Too Large']
    srv.siarkan(p)
    await lewatJedaGabung()
    expect(srv.perId()).toHaveLength(1)
    expect(l.terakhir()[0].keterangan).toBe('versi server')
  })

  it('UPDATE yang mengganti primary key: baris ber-kunci lama ikut hilang', async () => {
    srv = makeServer([bi('a'), bi('b')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    srv.baris.find((x) => x.id === 'a').id = 'a2'
    const p = srv.ubah('a2', { nominal: 5 })
    p.old = { id: 'a' } // Postgres mencatat kunci lama hanya bila kuncinya berubah
    srv.siarkan(p)
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['b', 'a2'])
    expect(srv.spy.permintaan).toHaveLength(0)
  })

  it('baris yang ditanyakan tapi tak kembali (sudah dihapus / tak terbaca) dibuang', async () => {
    srv = makeServer([bi('a'), bi('b')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    const p = srv.ubah('b', { nominal: 1 }, { tanpa: ['data'] })
    srv.hapus('b') // terhapus sebelum pertanyaannya sampai (event DELETE-nya tertinggal)
    srv.siarkan(p)
    await lewatJedaGabung()
    expect(idDari(l.terakhir())).toEqual(['a'])
  })

  it('lebih dari RT_TARIK_ID_MAKS baris tak utuh dalam satu gelombang -> satu tarikan penuh', async () => {
    const awal = Array.from({ length: RT_TARIK_ID_MAKS + 1 }, (_, i) => bi(`r${i}`))
    srv = makeServer(awal)
    const l = await langgananSiap()
    lepas.push(l.unsub)
    for (const r of awal) srv.siarkan(srv.ubah(r.id, { tipe: 'keluar' }, { tanpa: ['data'] }))
    await lewatJedaGabung()
    expect(srv.perId()).toHaveLength(0)
    expect(srv.tarikPenuh()).toHaveLength(1)
    expect(l.terakhir().every((d) => d.tipe === 'keluar' && d.santri_id === 's1')).toBe(true)
  })

  it('pertanyaan per id GAGAL -> satu tarikan penuh sesudah jeda gabung, tanpa perulangan', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    srv = makeServer([bi('a')], { gagalPerId: true })
    const l = await langgananSiap()
    lepas.push(l.unsub)
    srv.siarkan(srv.ubah('a', { nominal: 7 }, { tanpa: ['data'] }))
    await lewatJedaGabung() // pertanyaan per id -> gagal -> jadwalkan tarikan penuh
    await lewatJedaGabung()
    expect(console.error).toHaveBeenCalled()
    expect(srv.tarikPenuh()).toHaveLength(1)
    expect(l.terakhir()[0].nominal).toBe(7)
    await tunggu(10 * 60 * 1000)
    expect(srv.spy.permintaan).toHaveLength(2) // satu per id + satu penuh, lalu diam
  })
})

// =============================================================================
describe('yang tak terbaca sama sekali tetap jatuh ke tarikan penuh (perilaku lama)', () => {
  it('payload tanpa primary key (post_reactions ber-PK gabungan)', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    srv.siarkan({
      eventType: 'INSERT',
      new: { post_id: 'p1', post_type: 'posts', user_id: 'u1' },
      old: {},
      errors: null
    })
    await lewatJedaGabung()
    expect(srv.tarikPenuh()).toHaveLength(1)
  })

  it('event tanpa payload yang dikenal', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    srv.siarkan(undefined)
    await lewatJedaGabung()
    expect(srv.tarikPenuh()).toHaveLength(1)
  })
})

// =============================================================================
describe('urutan kejadian: tarikan yang masih di jalan vs event yang tiba', () => {
  it('event yang tiba selagi tarikan AWAL berjalan diterapkan sesudahnya — tanpa tarikan kedua', async () => {
    srv = makeServer([bi('a')], { tunda: 2000 })
    const panggilan = []
    lepas.push(subscribeColl(TABEL, (docs) => panggilan.push(docs)))
    await tunggu(500) // channel sudah SUBSCRIBED, tarikan awal belum kembali
    srv.siarkan(srv.tambah(bi('b')))
    await tunggu(5000)
    expect(srv.tarikPenuh()).toHaveLength(1)
    expect(idDari(panggilan[panggilan.length - 1])).toEqual(['a', 'b'])
  })

  it('jawaban tarikan penuh yang LEBIH TUA tak menimpa yang lebih baru', async () => {
    // Tarikan awal (permintaan #0) lambat sekali; channel keburu putus-sambung dan
    // tarikan penuh sambung-ulang kembali lebih dulu. Dulu keduanya memanggil callback
    // menurut urutan TIBA, jadi snapshot lama bisa menimpa yang baru.
    srv = makeServer([bi('a')], { tunda: (n) => (n === 0 ? 5000 : 50) })
    const panggilan = []
    lepas.push(subscribeColl(TABEL, (docs) => panggilan.push(docs)))
    await tunggu(RTT + 10)
    srv.baris.push(bi('b')) // berubah selagi tarikan awal masih di jalan
    srv.spy.kanal[0].cb('CHANNEL_ERROR')
    await tunggu(RT_ULANG_MS[0] + RTT + RT_DEBOUNCE_MS + 200)
    expect(idDari(panggilan[panggilan.length - 1])).toEqual(['a', 'b'])
    await tunggu(5000) // jawaban tarikan awal (snapshot tanpa b) akhirnya tiba
    expect(idDari(panggilan[panggilan.length - 1])).toEqual(['a', 'b'])
  })

  it('jawaban per id yang TUA tak menimpa event yang lebih baru', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)
    // pertanyaan per id berangkat saat nominal = 2, jawabannya tiba 1 detik kemudian
    srv.b.from = ((asli) => () => {
      const q = asli()
      const inAsli = q.in
      q.in = (ref, ids) =>
        inAsli(ref, ids).then((h) => new Promise((res) => setTimeout(() => res(h), 1000)))
      return q
    })(srv.b.from)
    srv.siarkan(srv.ubah('a', { nominal: 2 }, { tanpa: ['data'] }))
    await lewatJedaGabung()
    srv.siarkan(srv.ubah('a', { nominal: 3 })) // utuh, lebih baru
    await tunggu(3000)
    expect(l.terakhir()[0].nominal).toBe(3)
  })
})

// =============================================================================
describe('pemulihan tetap memakai tarikan penuh', () => {
  it('sesudah tersambung ulang: satu tarikan penuh, lalu event kembali nol permintaan', async () => {
    srv = makeServer([bi('a')])
    const l = await langgananSiap()
    lepas.push(l.unsub)

    srv.spy.kanal[0].cb('CHANNEL_ERROR') // HP tidur / WiFi berpindah
    srv.baris.push(bi('selagi-putus')) // perubahan yang tak pernah menjadi event
    await tunggu(RT_ULANG_MS[0] + RTT + RT_DEBOUNCE_MS + 100)
    expect(srv.tarikPenuh()).toHaveLength(1)
    expect(idDari(l.terakhir())).toEqual(['a', 'selagi-putus'])

    srv.spy.permintaan.length = 0
    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    expect(srv.spy.permintaan).toHaveLength(0) // tarikan penuh tadi menutup celahnya sendiri
    expect(idDari(l.terakhir())).toEqual(['a', 'selagi-putus', 'b'])
  })
})

// =============================================================================
describe('celah awal (tarikan awal vs aktifnya langganan) tertambal seperti dulu', () => {
  it('gelombang event PERTAMA ikut menarik baris yang berubah sejak tarikan awal', async () => {
    srv = makeServer([bi('a'), bi('b')])
    const l = await langganan()
    lepas.push(l.unsub)
    const mulai = KINI.getTime()

    // berubah di celah: sesudah snapshot tarikan awal, sebelum langganan aktif — tanpa event
    srv.ubah('b', { nominal: 777 })
    await tunggu(5000)
    const tiba = Date.now()
    const p = srv.tambah(bi('c'))
    srv.siarkan(p)
    await lewatJedaGabung()

    expect(srv.susulan()).toHaveLength(1)
    // batasnya dihitung dengan jam SERVER: commit event pertama − (tiba − mulai) − margin
    const batas = Date.parse(p.commit_timestamp) - (tiba - mulai) - RT_SUSUL_AWAL_MARGIN_MS
    expect(srv.susulan()[0].syarat).toContainEqual([
      'updated_at',
      'gte',
      new Date(batas).toISOString()
    ])
    expect(srv.tarikPenuh()).toHaveLength(1) // hanya tarikan awal
    expect(l.terakhir().find((d) => d.id === 'b').nominal).toBe(777)
    expect(idDari(l.terakhir())).toEqual(['a', 'b', 'c'])

    srv.siarkan(srv.tambah(bi('d')))
    await lewatJedaGabung()
    expect(srv.susulan()).toHaveLength(1) // sekali saja per langganan
  })

  it('penambal mengikuti penyaring pemanggil', async () => {
    srv = makeServer([bi('a')])
    const l = await langganan({ filters: [['santri_id', '==', 's1']] })
    lepas.push(l.unsub)
    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    expect(srv.susulan()[0].syarat).toContainEqual(['data->>santri_id', 'eq', 's1'])
  })

  it('langganan yang tak pernah menerima event tak pernah menambal', async () => {
    srv = makeServer([bi('a')])
    const l = await langganan()
    lepas.push(l.unsub)
    await tunggu(10 * 60 * 1000)
    expect(srv.spy.permintaan).toHaveLength(1) // tarikan awal saja
  })

  it('tak ada penambal sesudah tarikan penuh sambung-ulang — di situ celahnya sudah tertutup', async () => {
    srv = makeServer([bi('a')])
    const l = await langganan()
    lepas.push(l.unsub)
    srv.spy.kanal[0].cb('CHANNEL_ERROR')
    await tunggu(RT_ULANG_MS[0] + RTT + RT_DEBOUNCE_MS + 100)
    srv.siarkan(srv.tambah(bi('b')))
    await lewatJedaGabung()
    expect(srv.susulan()).toHaveLength(0)
    expect(srv.tarikPenuh()).toHaveLength(2) // awal + sambung ulang
  })
})

// =============================================================================
describe('penilai penyaring di klien menjawab HANYA bila pasti', () => {
  const baris = bi('a', {
    keterangan: null,
    data: { santri_id: 's1', urut: 10, lunas: true, nilai: 7.5 }
  })

  it('NULL tak pernah memenuhi =, <>, IN, NOT IN (kecuali NOT IN daftar kosong)', () => {
    expect(cocokFilter(TABEL, baris, [['keterangan', '==', 'x']])).toBe(false)
    expect(cocokFilter(TABEL, baris, [['keterangan', '!=', 'x']])).toBe(false)
    expect(cocokFilter(TABEL, baris, [['keterangan', 'in', ['x']]])).toBe(false)
    expect(cocokFilter(TABEL, baris, [['keterangan', 'not-in', ['x']]])).toBe(false)
    expect(cocokFilter(TABEL, baris, [['keterangan', 'not-in', []]])).toBe(true)
    expect(cocokFilter(TABEL, baris, [['santri_id', 'in', []]])).toBe(false)
  })

  it('`->>` selalu TEKS: angka & boolean di ekor jsonb dibandingkan sebagai teks', () => {
    expect(cocokFilter(TABEL, baris, [['urut', '<', '9']])).toBe(true) // '10' < '9'
    expect(cocokFilter(TABEL, baris, [['urut', '==', 10]])).toBe(true)
    expect(cocokFilter(TABEL, baris, [['lunas', '==', true]])).toBe(true)
    expect(cocokFilter(TABEL, baris, [['nilai', '==', 7.5]])).toBeUndefined() // '7.5' vs '7.50'?
  })

  it('kolom bigint dibandingkan sebagai angka; boolean memakai ejaan cast Postgres', () => {
    expect(cocokFilter(TABEL, baris, [['nominal', '>=', '5000']])).toBe(true)
    expect(cocokFilter(TABEL, baris, [['nominal', '<', 9]])).toBe(false)
    expect(cocokFilter(TABEL, baris, [['nominal', '==', '5e4']])).toBeUndefined()
    const s = { id: 's1', aktif: true, data: {} }
    expect(cocokFilter('santri', s, [['aktif', '==', 'true']])).toBe(true)
    expect(cocokFilter('santri', s, [['aktif', '!=', 't']])).toBe(false)
    expect(cocokFilter('santri', s, [['aktif', '==', 'mungkin']])).toBeUndefined()
  })

  it('rentang teks hanya dipastikan untuk teks bertanda baca tanggal', () => {
    expect(
      cocokFilter(TABEL, baris, [
        ['tanggal', '>=', '2026-09-01'],
        ['tanggal', '<=', '2026-09-30']
      ])
    ).toBe(true)
    const b = bi('b', { keterangan: 'Infaq' })
    expect(cocokFilter(TABEL, b, [['keterangan', '>', 'infaq']])).toBeUndefined()
    expect(cocokFilter(TABEL, b, [['keterangan', '==', 'infaq']])).toBe(false) // sama/tidak pasti
    // satu syarat yang PASTI gagal mengalahkan syarat yang tak pasti
    expect(
      cocokFilter(TABEL, b, [
        ['keterangan', '>', 'infaq'],
        ['nominal', '<', 9]
      ])
    ).toBe(false)
    expect(cocokFilter(TABEL, b, [['tags', 'array-contains', 'x']])).toBeUndefined()
  })

  it('created_at dibandingkan sebagai waktu, sampai mikrodetik, lintas zona', () => {
    const r = bi('a', { created_at: '2026-09-18T03:00:37.394500+00:00' })
    expect(cocokFilter(TABEL, r, [['created_at', '>', '2026-09-18T03:00:37.394Z']])).toBe(true)
    expect(cocokFilter(TABEL, r, [['created_at', '==', '2026-09-18T03:00:37.394Z']])).toBe(false)
    expect(cocokFilter(TABEL, r, [['created_at', '==', '2026-09-18T10:00:37.3945+07:00']])).toBe(
      true
    )
    // tanpa zona = tergantung TimeZone sesi DB -> serahkan ke server
    expect(cocokFilter(TABEL, r, [['created_at', '>=', '2026-09-18 10:00']])).toBeUndefined()
  })

  it('mikrodetik(): presisi timestamptz penuh, semua bentuk zona', () => {
    const us = Date.UTC(2026, 8, 18, 3, 0, 37) * 1000 + 394123
    expect(mikrodetik('2026-09-18T03:00:37.394123+00:00')).toBe(us)
    expect(mikrodetik('2026-09-18T10:00:37.394123+07:00')).toBe(us)
    expect(mikrodetik('2026-09-18 10:00:37.394123+07')).toBe(us)
    expect(mikrodetik('2026-09-18T00:30:37.394123-0230')).toBe(us)
    expect(mikrodetik('2026-09-18T03:00:37Z')).toBe(us - 394123)
    expect(mikrodetik('2026-09-18T03:00:37')).toBeNaN()
    expect(mikrodetik(null)).toBeNaN()
  })

  it('pembanding urutan mencerminkan ORDER BY Postgres', () => {
    const a = bi('a', { tanggal: '2026-09-10' })
    const n = bi('n', { tanggal: null })
    expect(bandingUrutan(TABEL, [['tanggal', 'asc']], a, n)).toBeLessThan(0) // NULLS LAST
    expect(bandingUrutan(TABEL, [['tanggal', 'desc']], a, n)).toBeGreaterThan(0) // NULLS FIRST
    const sepuluh = bi('x', { nominal: 10, data: { urut: 10 } })
    const sembilan = bi('y', { nominal: 9, data: { urut: 9 } })
    expect(bandingUrutan(TABEL, [['nominal', 'asc']], sepuluh, sembilan)).toBeGreaterThan(0)
    expect(bandingUrutan(TABEL, [['urut', 'asc']], sepuluh, sembilan)).toBeLessThan(0) // teks
  })
})
