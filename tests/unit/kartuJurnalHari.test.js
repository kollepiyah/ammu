// Kyai 17 Nov 2026: "ini saya coba jadwalkan guru di laju 2, tapi di menu pondok laju ada
// keterangan 'Anda tidak terjadwal piket'" — lalu: "kalau seumpama tidak perlu memilih dropdown
// gimana, jadi langsung isian kartu sendiri (Tadarrus Pagi, Laju 1, Laju 2), kartunya muncul
// sesuai daftar jadwal."
//
// Pesan itu sebenarnya BENAR (jadwalnya besok, dan piketnya guru lain), tapi terasa seperti
// kerusakan karena ia baru muncul SESUDAH memilih sesi di dropdown. Obatnya: yang dipajang
// jadwalnya sendiri. Aturan siapa-melihat-kartu-apa ditaruh di util ini supaya diuji, bukan
// tertanam di layar.
import { describe, it, expect } from 'vitest'
import { kartuJurnalHari } from '@/utils/pondokLajuSesi'

// Kelas Pondok Laju: kuncinya nama guru kelas yang dinormalkan (lihat kelasPondokLaju).
const kelasList = [
  { key: 'siti nor aisah', guru: 'Siti Nor Aisah', juz: '5', santri: [{ id: 's1' }, { id: 's2' }] },
  { key: 'indah', guru: 'Indah', juz: '3', santri: [{ id: 's3' }] },
  { key: 'aizza jundhana', guru: 'Aizza Jundhana', juz: '7', santri: [{ id: 's4' }] }
]

// Bentuk nyata baris jadwal produksi 17 Nov 2026 (dipendekkan).
const jadwalAizza = {
  id: '2026-11-18_laju2_siti-nor-aisah',
  tanggal: '2026-11-18',
  sesi: 'laju2',
  guru_id: '1782344496913',
  kelas_key: 'siti nor aisah',
  guru_nama: 'Aizza Jundhana'
}

describe('kartuJurnalHari — guru biasa', () => {
  it('KASUS KYAI: guru yang dijadwalkan Laju 2 mendapat kartunya', () => {
    const k = kartuJurnalHari({
      jadwal: [jadwalAizza],
      kelasList,
      guruId: '1782344496913',
      guruNama: 'Aizza Jundhana'
    })
    // Dua kartu: Tadarus Pagi kelasnya sendiri + Laju 2 yang dijadwalkan.
    expect(k.map((x) => `${x.sesi}|${x.kelas.key}`)).toEqual([
      'tadarus|aizza jundhana',
      'laju2|siti nor aisah'
    ])
  })

  it('guru lain tak melihat jadwal orang — dan itulah yang dulu berbunyi "tidak terjadwal"', () => {
    const k = kartuJurnalHari({
      jadwal: [jadwalAizza],
      kelasList,
      guruId: 'g-lain',
      guruNama: 'Indah'
    })
    // Hanya Tadarus Pagi kelasnya sendiri; piket Laju 2 milik Aizza tak muncul.
    expect(k).toHaveLength(1)
    expect(k[0]).toMatchObject({ sesi: 'tadarus', piketGuruId: '', piketNama: '' })
  })

  it('guru yang bukan guru kelas & tak piket: tak ada kartu sama sekali (bukan galat)', () => {
    expect(
      kartuJurnalHari({ jadwal: [], kelasList, guruId: 'g9', guruNama: 'Pegawai Kantor' })
    ).toEqual([])
  })

  it('tanpa jadwal pada tanggal itu, kartu Tadarus Pagi tetap ada', () => {
    const k = kartuJurnalHari({ jadwal: [], kelasList, guruId: 'g1', guruNama: 'Indah' })
    expect(k.map((x) => x.sesi)).toEqual(['tadarus'])
  })
})

describe('kartuJurnalHari — admin & penyusun jadwal', () => {
  it('melihat SELURUH jadwal hari itu, berlabel nama guru piketnya', () => {
    const k = kartuJurnalHari({
      jadwal: [jadwalAizza],
      kelasList,
      guruId: 'admin',
      guruNama: 'Rahman Fanani',
      semuaKelas: true
    })
    expect(k).toHaveLength(1)
    expect(k[0]).toMatchObject({
      sesi: 'laju2',
      piketGuruId: '1782344496913',
      piketNama: 'Aizza Jundhana'
    })
  })

  it('kartu tambahan manual boleh kelas mana pun, tanpa piket', () => {
    const k = kartuJurnalHari({
      jadwal: [],
      kelasList,
      guruId: 'admin',
      guruNama: 'Rahman Fanani',
      semuaKelas: true,
      manual: [{ sesi: 'laju1', kelasKey: 'indah' }]
    })
    expect(k).toEqual([expect.objectContaining({ sesi: 'laju1', piketGuruId: '', piketNama: '' })])
  })

  it('kelas manual yang tak dikenal diabaikan, bukan melempar', () => {
    expect(
      kartuJurnalHari({
        jadwal: [],
        kelasList,
        guruId: 'admin',
        guruNama: 'x',
        semuaKelas: true,
        manual: [{ sesi: 'laju1', kelasKey: 'tak ada' }, null, { sesi: '', kelasKey: 'indah' }]
      })
    ).toEqual([])
  })
})

describe('kartuJurnalHari — bentuk daftar', () => {
  it('tak ada kartu kembar untuk satu kelas × sesi walau jadwalnya ganda', () => {
    const k = kartuJurnalHari({
      jadwal: [jadwalAizza, { ...jadwalAizza, id: 'lain' }],
      kelasList,
      guruId: 'admin',
      guruNama: '-',
      semuaKelas: true,
      manual: [{ sesi: 'laju2', kelasKey: 'siti nor aisah' }]
    })
    expect(k).toHaveLength(1)
  })

  it('urutannya Tadarus → Laju 1 → Laju 2, lalu nama guru kelas', () => {
    const k = kartuJurnalHari({
      jadwal: [
        { sesi: 'laju2', guru_id: 'a', kelas_key: 'indah' },
        { sesi: 'laju1', guru_id: 'a', kelas_key: 'siti nor aisah' },
        { sesi: 'laju1', guru_id: 'a', kelas_key: 'indah' }
      ],
      kelasList,
      guruId: 'a',
      guruNama: 'Aizza Jundhana'
    })
    expect(k.map((x) => `${x.sesi}|${x.kelas.guru}`)).toEqual([
      'tadarus|Aizza Jundhana',
      'laju1|Indah',
      'laju1|Siti Nor Aisah',
      'laju2|Indah'
    ])
  })

  it('baris jadwal ber-sesi tadarus diabaikan — Tadarus Pagi tak pernah dijadwalkan', () => {
    const k = kartuJurnalHari({
      jadwal: [{ sesi: 'tadarus', guru_id: 'a', kelas_key: 'indah' }],
      kelasList,
      guruId: 'a',
      guruNama: 'bukan guru kelas',
      semuaKelas: true
    })
    expect(k).toEqual([])
  })

  it('masukan kosong/rusak → daftar kosong, tak melempar', () => {
    expect(kartuJurnalHari()).toEqual([])
    expect(kartuJurnalHari({ jadwal: null, kelasList: null })).toEqual([])
  })
})
