// Kyai (21 Jul 2026): "guru yg berpasangan (pagi & sore berbeda guru) itu jadi satu
// kelas, seperti bu mazidatur pasangannya bu lilik masudah, jadi pilihnya juga ada
// muncul 2 nama."
//
// Sekaligus regresi temuan C: kenaikan kelas dulu HANYA menulis field `guru`,
// sedangkan guru_pagi/guru_sore dibiarkan nilai lama — padahal kelasKeyQiraati dan
// semua filter ampuan membaca pasangan itu duluan, jadi "pindah guru" tak berefek.
import { describe, it, expect } from 'vitest'
import {
  pasanganQiraati,
  labelPasangan,
  cariPasangan,
  pasanganSantri,
  kunciPasangan,
  labelPasanganRingkas
} from '@/utils/pasanganGuru'
import { buildKenaikanQiraatiPayload } from '@/utils/promosiKenaikan'

const S = (o) => ({ aktif: true, lembaga: 'TPQ', ...o })

describe('labelPasangan', () => {
  it('dua guru berbeda → "A & B"', () => {
    expect(labelPasangan({ guru_pagi: 'Bu Mazidatur', guru_sore: 'Bu Lilik Masudah' })).toBe(
      'Bu Mazidatur & Bu Lilik Masudah'
    )
  })

  it('guru sama pagi & sore → satu nama saja, bukan "A & A"', () => {
    expect(labelPasangan({ guru_pagi: 'Ust. Muin', guru_sore: 'Ust. Muin' })).toBe('Ust. Muin')
  })

  it('hanya satu sisi → ditandai shift-nya', () => {
    expect(labelPasangan({ guru_pagi: 'Ust. Muin' })).toBe('Ust. Muin (pagi)')
    expect(labelPasangan({ guru_sore: 'Ust. Muin' })).toBe('Ust. Muin (sore)')
  })

  it('kosong → string kosong (bukan "undefined")', () => {
    expect(labelPasangan({})).toBe('')
    expect(labelPasangan(null)).toBe('')
  })
})

describe('pasanganQiraati', () => {
  it('SKENARIO KYAI: pasangan pagi+sore jadi SATU pilihan berisi 2 nama', () => {
    const list = [
      S({ guru_pagi: 'Bu Mazidatur', guru_sore: 'Bu Lilik Masudah' }),
      S({ guru_pagi: 'Bu Mazidatur', guru_sore: 'Bu Lilik Masudah' })
    ]
    const out = pasanganQiraati(list)
    expect(out).toHaveLength(1)
    expect(out[0].label).toBe('Bu Mazidatur & Bu Lilik Masudah')
    expect(out[0].jumlah).toBe(2)
  })

  it('jenjang kelas TIDAK memecah pasangan (1 rombel campuran = 1 kelas)', () => {
    // Cermin keputusan di utils/kelasHitung.js: kelas ditentukan guru, bukan jenjang.
    const list = [
      S({ kelas: 'Jilid 1A', guru_pagi: 'Ust. Muin', guru_sore: 'Ust. Muin' }),
      S({ kelas: 'Jilid 2B', guru_pagi: 'Ust. Muin', guru_sore: 'Ust. Muin' })
    ]
    expect(pasanganQiraati(list)).toHaveLength(1)
  })

  it('pasangan berbeda = pilihan berbeda', () => {
    const list = [
      S({ guru_pagi: 'A', guru_sore: 'B' }),
      S({ guru_pagi: 'A', guru_sore: 'C' }),
      S({ guru_pagi: 'A', guru_sore: 'B' })
    ]
    const out = pasanganQiraati(list)
    expect(out).toHaveLength(2)
    expect(out.map((x) => x.label)).toEqual(['A & B', 'A & C'])
  })

  it('filter lembaga dipatuhi', () => {
    const list = [S({ lembaga: 'TPQ', guru_pagi: 'A' }), S({ lembaga: 'PTPT', guru_pagi: 'B' })]
    expect(pasanganQiraati(list, { lembaga: 'PTPT' }).map((x) => x.guru_pagi)).toEqual(['B'])
  })

  it('santri non-aktif & tanpa guru diabaikan', () => {
    const list = [
      S({ aktif: false, guru_pagi: 'A' }),
      S({ guru_pagi: '', guru_sore: '', guru: '' }),
      S({ guru_pagi: 'B' })
    ]
    expect(pasanganQiraati(list).map((x) => x.guru_pagi)).toEqual(['B'])
  })

  it('field `guru` lama dibaca sebagai guru PAGI (data pra guru_pagi/guru_sore)', () => {
    const out = pasanganQiraati([S({ guru: 'Ust. Lama' })])
    expect(out[0].guru_pagi).toBe('Ust. Lama')
    expect(out[0].guru_sore).toBe('')
  })

  it('cariPasangan menemukan lewat key', () => {
    const out = pasanganQiraati([S({ guru_pagi: 'A', guru_sore: 'B' })])
    expect(cariPasangan(out, out[0].key).guru_sore).toBe('B')
    expect(cariPasangan(out, 'ngawur')).toBe(null)
  })
})

describe('buildKenaikanQiraatiPayload — pasangan guru ikut tersimpan (temuan C)', () => {
  const santri = {
    lembaga: 'TPQ',
    kelas: 'Jilid 1A',
    guru_pagi: 'Guru Lama',
    guru_sore: 'Sore Lama'
  }
  const ctx = { settings: {}, lembagaList: [] }

  it('REGRESI: guru_pagi & guru_sore BARU ikut ditulis, bukan cuma `guru`', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      {
        lembaga: 'TPQ',
        kelas: 'Jilid 2A',
        guru_pagi: 'Bu Mazidatur',
        guru_sore: 'Bu Lilik Masudah'
      },
      ctx
    )
    expect(payload.guru_pagi).toBe('Bu Mazidatur')
    expect(payload.guru_sore).toBe('Bu Lilik Masudah')
    // `guru` dipertahankan sebagai cermin field lama.
    expect(payload.guru).toBe('Bu Mazidatur')
  })

  it('pasangan hanya sore → `guru` cermin ke sore, pagi dikosongkan', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'TPQ', kelas: 'Jilid 2A', guru_sore: 'Bu Lilik Masudah' },
      ctx
    )
    expect(payload.guru_pagi).toBe('')
    expect(payload.guru_sore).toBe('Bu Lilik Masudah')
    expect(payload.guru).toBe('Bu Lilik Masudah')
  })

  it('form guru dibiarkan kosong → pasangan lama TIDAK disentuh', () => {
    // Penting: tanpa guard ini, menaikkan kelas tanpa mengubah guru akan
    // menghapus assignment guru santri.
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      { lembaga: 'TPQ', kelas: 'Jilid 2A' },
      ctx
    )
    expect('guru_pagi' in payload).toBe(false)
    expect('guru_sore' in payload).toBe(false)
  })

  it('riwayat mencatat PASANGAN, bukan satu nama', () => {
    const { payload } = buildKenaikanQiraatiPayload(
      santri,
      {
        lembaga: 'TPQ',
        kelas: 'Jilid 2A',
        guru_pagi: 'Bu Mazidatur',
        guru_sore: 'Bu Lilik Masudah'
      },
      ctx
    )
    const last = payload.riwayat[payload.riwayat.length - 1]
    expect(last.guru).toBe('Bu Mazidatur & Bu Lilik Masudah')
    expect(last.keterangan).toContain('Bu Mazidatur & Bu Lilik Masudah')
  })
})

// Kyai (2 Sep 2026): "untuk guru yg sepasang jangan dipisah daftarnya."
//
// Daftar "Guru Belum Isi Rekap Prestasi" dulu satu baris per NAMA guru, jadi satu kelas
// berpasangan muncul dua kali dengan daftar santri yang sama persis — terbaca seolah dua
// guru berbeda yang lalai, dan jumlah "guru belum input" ikut terhitung dobel.
describe('pengelompokan daftar per pasangan (v.1.3.8)', () => {
  it('pasangan yang sama menghasilkan kunci yang sama → satu baris, bukan dua', () => {
    const a = pasanganSantri({ guru_pagi: 'Bu Mazidatur', guru_sore: 'Bu Lilik Masudah' })
    const b = pasanganSantri({ guru_pagi: 'bu mazidatur', guru_sore: 'BU LILIK MASUDAH' })
    expect(kunciPasangan(a)).toBe(kunciPasangan(b))
  })

  it('pagi & sore TERBALIK dianggap pasangan BERBEDA — urutannya memang bermakna', () => {
    const a = pasanganSantri({ guru_pagi: 'Bu A', guru_sore: 'Bu B' })
    const b = pasanganSantri({ guru_pagi: 'Bu B', guru_sore: 'Bu A' })
    expect(kunciPasangan(a)).not.toBe(kunciPasangan(b))
  })

  it('field `guru` lama dibaca sebagai guru PAGI — asumsi sama dgn pasanganQiraati', () => {
    expect(pasanganSantri({ guru: 'Ust. Khusnul' })).toEqual({
      guru_pagi: 'Ust. Khusnul',
      guru_sore: ''
    })
    // Tapi kalau sore terisi, `guru` lama TIDAK boleh merebut kolom pagi.
    expect(pasanganSantri({ guru: 'Ust. Lama', guru_sore: 'Bu Sore' })).toEqual({
      guru_pagi: '',
      guru_sore: 'Bu Sore'
    })
  })

  it('santri tanpa guru sama sekali → kunci kosong (tak ada yang bisa ditagih)', () => {
    expect(kunciPasangan(pasanganSantri({}))).toBe('')
    expect(kunciPasangan(pasanganSantri({ guru: '   ' }))).toBe('')
  })

  it('pagi & sore orang yang SAMA → satu kunci, label tak mendobel namanya', () => {
    const p = pasanganSantri({ guru_pagi: 'Bu Nur', guru_sore: 'Bu Nur' })
    expect(kunciPasangan(p)).toBe('bu nur')
    expect(labelPasanganRingkas(p)).toBe('Bu Nur')
  })

  it('labelPasanganRingkas: tunggal TANPA akhiran "(pagi)" — beda dari dropdown', () => {
    // PTPT & PPPH satu guru per santri; akhiran "(pagi)" akan muncul di hampir semua
    // baris tanpa pernah ada sore-nya, dan itu menyesatkan di daftar tagihan.
    const p = pasanganSantri({ guru: 'Ust. Khusnul' })
    expect(labelPasanganRingkas(p)).toBe('Ust. Khusnul')
    expect(labelPasangan(p)).toBe('Ust. Khusnul (pagi)') // dropdown tetap seperti dulu
  })

  it('berpasangan → "A & B"', () => {
    expect(labelPasanganRingkas({ guru_pagi: 'Bu Mazidatur', guru_sore: 'Bu Lilik Masudah' })).toBe(
      'Bu Mazidatur & Bu Lilik Masudah'
    )
  })
})
