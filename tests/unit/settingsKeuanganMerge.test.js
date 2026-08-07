// Regresi kelas bug: "salinan basi di row PUBLIK menutupi config keuangan yang asli".
//
// Migrasi 29 Jul 2026 memindahkan kunci keuangan sensitif ke row `settings/keuangan`
// (finance-only) dan menghapusnya dari `general`/`web` yang anon-readable. Store lalu
// MENGANDALKAN penghapusan itu. Diperiksa 7 Agu 2026 lewat anon REST: kunci-kunci itu ada
// LAGI di `general`, berisi default kosong — klien lawas yang tak kenal row `keuangan`
// menerbitkannya kembali saat "Simpan Semua". Selama salinan itu ikut ter-merge, satu
// urutan yang meleset (row `keuangan` gagal/terlambat terbaca) sudah cukup membuat POS &
// Bisyaroh memakai daftar jenis DEFAULT — tarif salah di layar kasir, dan itu uang riil.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

const rows = { general: null, web: null, keuangan: null }
const subs = {} // key -> callback terakhir

vi.mock('@/services/db', () => ({
  getOne: vi.fn((_coll, id) => Promise.resolve(rows[id])),
  mergeOne: vi.fn(() => Promise.resolve()),
  subscribeDoc: vi.fn((_coll, id, cb) => {
    subs[id] = cb
    return () => {}
  })
}))

const { useSettingsStore } = await import('@/stores/settings')

// Persis bentuk yang ditemukan di produksi: general membawa daftar jenis DEFAULT.
const GENERAL_TERPOLUSI = {
  kopLine1: 'PONDOK',
  keuTagihanJenis: [{ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0 }],
  keuTagihanJenisByTA: { '2026/2027': [] },
  keu_jenis_tagihan: ['Syahriyah'],
  keuBisyarohJenis: [],
  bebanMengajar: [],
  master_tunjangan: [],
  master_potongan: []
}
const KEUANGAN_ASLI = {
  keuTagihanJenis: [
    { id: 'syahriyah_pondok', label: 'Syahriyah Pondok', nominal_default: 200000 },
    { id: 'qiraati_pagi', label: 'Syahriyah Qiraati Pagi', nominal_default: 90000 }
  ],
  keuBisyarohJenis: [{ id: 'pokok', label: 'Pokok', nominal: 500000 }]
}

describe('settings store — kunci keuangan hanya dari row keuangan', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    rows.general = null
    rows.web = null
    rows.keuangan = null
    for (const k of Object.keys(subs)) delete subs[k]
  })

  it('row keuangan menang atas salinan basi di general', async () => {
    rows.general = GENERAL_TERPOLUSI
    rows.keuangan = KEUANGAN_ASLI
    const s = useSettingsStore()
    await s.load()
    expect(s.settings.keuTagihanJenis).toHaveLength(2)
    expect(s.settings.keuTagihanJenis[0].id).toBe('syahriyah_pondok')
    expect(s.keuanganTerbaca).toBe(true)
  })

  it('keuangan TAK terbaca -> kunci ABSEN, bukan jatuh ke salinan default general', async () => {
    rows.general = GENERAL_TERPOLUSI
    rows.keuangan = null // peran non-keuangan / sesi mati / RLS menyaring
    const s = useSettingsStore()
    await s.load()
    for (const k of [
      'keuTagihanJenis',
      'keuTagihanJenisByTA',
      'keu_jenis_tagihan',
      'keuBisyarohJenis',
      'bebanMengajar',
      'master_tunjangan',
      'master_potongan'
    ]) {
      expect(s.settings[k], `kunci ${k} bocor dari general`).toBeUndefined()
    }
    expect(s.keuanganTerbaca).toBe(false)
    // Kunci non-keuangan tetap terbaca seperti biasa.
    expect(s.settings.kopLine1).toBe('PONDOK')
  })

  it('realtime general tak boleh menghidupkan lagi salinan basi', async () => {
    rows.general = { kopLine1: 'PONDOK' }
    rows.keuangan = KEUANGAN_ASLI
    const s = useSettingsStore()
    await s.load()
    s.subscribe()
    // Klien lawas menulis default ke general; realtime mengirimkannya ke sini.
    subs.general(GENERAL_TERPOLUSI)
    expect(s.settings.keuTagihanJenis).toHaveLength(2)
    expect(s.settings.keuBisyarohJenis).toHaveLength(1)
    expect(s.settings.kopLine1).toBe('PONDOK')
  })

  it('realtime general saat keuangan belum terbaca: kunci tetap absen', async () => {
    rows.general = { kopLine1: 'PONDOK' }
    rows.keuangan = null
    const s = useSettingsStore()
    await s.load()
    s.subscribe()
    subs.general(GENERAL_TERPOLUSI)
    expect(s.settings.keuTagihanJenis).toBeUndefined()
    expect(s.settings.keuBisyarohJenis).toBeUndefined()
  })

  it('realtime keuangan menyalakan penanda terbaca', async () => {
    rows.general = GENERAL_TERPOLUSI
    rows.keuangan = null
    const s = useSettingsStore()
    await s.load()
    s.subscribe()
    expect(s.keuanganTerbaca).toBe(false)
    subs.keuangan(KEUANGAN_ASLI)
    expect(s.keuanganTerbaca).toBe(true)
    expect(s.settings.keuTagihanJenis).toHaveLength(2)
  })

  it('reset (logout) mengembalikan penanda ke false', async () => {
    rows.keuangan = KEUANGAN_ASLI
    const s = useSettingsStore()
    await s.load()
    s.reset()
    expect(s.keuanganTerbaca).toBe(false)
  })
})

describe('settings store — save() tak menulis ulang config keuangan', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    rows.general = { kopLine1: 'PONDOK' }
    rows.web = null
    rows.keuangan = KEUANGAN_ASLI
  })

  it('menyimpan hal lain TIDAK menyentuh row keuangan', async () => {
    const { mergeOne } = await import('@/services/db')
    mergeOne.mockClear()
    const s = useSettingsStore()
    await s.load()
    await s.save({ logoUrl: 'x.png' })
    const target = mergeOne.mock.calls.map((c) => c[1])
    expect(target).toContain('general')
    expect(target).toContain('web')
    expect(target).not.toContain('keuangan') // snapshot basi tak boleh menimpa
  })

  it('kunci keuangan tak pernah ikut ke row publik', async () => {
    const { mergeOne } = await import('@/services/db')
    mergeOne.mockClear()
    const s = useSettingsStore()
    await s.load()
    await s.save({ keuTagihanJenis: [{ id: 'baru' }] })
    for (const [, key, data] of mergeOne.mock.calls) {
      if (key === 'general' || key === 'web') expect(data.keuTagihanJenis).toBeUndefined()
      if (key === 'keuangan') expect(data.keuTagihanJenis).toEqual([{ id: 'baru' }])
    }
    expect(mergeOne.mock.calls.map((c) => c[1])).toContain('keuangan')
  })
})
