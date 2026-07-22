// Kyai (22 Jul 2026): "saya ingin merubah ini supaya tidak setiap guru isi mapel
// satu-satu, saya ingin langsung per guru berapa jam pelajaran per minggu."
//
// Bentuk baris berubah dari { guru_id, lembaga, mapel, hari[], jp per pertemuan }
// menjadi { guru_id, lembaga, jp_minggu }. Karena baris ini menyetir BISYAROH,
// tiga hal yang wajib dijaga tes:
//   1. JP mingguan yang dipakai menghitung uang benar-benar yang Kyai ketik;
//   2. guru yang tak masuk tetap terpotong — sekarang lewat pembagian rata ke
//      hari aktif sekolah, bukan lagi jadwal mapel per hari;
//   3. hari di LUAR hari aktif tidak boleh dihitung sebagai absen.
import { describe, it, expect } from 'vitest'
import {
  normalizeBeban,
  bebanList,
  jpByLembagaForGuru,
  jpPerHariForGuru,
  jpDiajarPeriode,
  hariAktifOf,
  HARI_AKTIF_DEFAULT
} from '@/utils/bebanMengajar'

const S = (rows, extra = {}) => ({ bebanMengajar: rows, ...extra })

describe('normalizeBeban — bentuk baru & baca-mundur bentuk lama', () => {
  it('bentuk BARU: jp_minggu dipakai apa adanya', () => {
    expect(normalizeBeban({ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 24 })).toEqual({
      guru_id: 'g1',
      lembaga: 'SDI',
      jp_minggu: 24
    })
  })

  it('bentuk LAMA: jp per pertemuan × jumlah hari → jp_minggu (angka lama dipertahankan)', () => {
    // 2 JP tiap Senin & Rabu = 4 JP/minggu — persis yang dihitung versi sebelumnya.
    expect(normalizeBeban({ guru_id: 'g1', lembaga: 'SDI', jp: 2, hari: [1, 3] }).jp_minggu).toBe(4)
  })

  it('bentuk lama tanpa hari = 0 JP (bukan diam-diam dianggap penuh)', () => {
    // Ini kondisi baris yang dulu tersimpan lewat dialog "Tambah" — `hari` memang
    // dijatuhkan saat simpan, jadi bisyarohnya nol. Dibiarkan nol, bukan ditebak.
    expect(normalizeBeban({ guru_id: 'g1', jp: 5, hari: [] }).jp_minggu).toBe(0)
  })

  it('jp_minggu menang atas kolom lama bila dua-duanya ada', () => {
    expect(normalizeBeban({ guru_id: 'g1', jp_minggu: 10, jp: 2, hari: [1, 3] }).jp_minggu).toBe(10)
  })

  it('nilai sampah tidak meloloskan baris', () => {
    expect(bebanList(S([{ guru_id: '', jp_minggu: 10 }]))).toEqual([])
    expect(bebanList(S([{ guru_id: 'g1', jp_minggu: 0 }]))).toEqual([])
    expect(bebanList(S([{ guru_id: 'g1', jp_minggu: -5 }]))).toEqual([])
    expect(bebanList(S(null))).toEqual([])
  })
})

describe('jpByLembagaForGuru', () => {
  it('beberapa baris di lembaga sama dijumlahkan', () => {
    const s = S([
      { guru_id: 'g1', lembaga: 'SDI', jp_minggu: 12 },
      { guru_id: 'g1', lembaga: 'SDI', jp_minggu: 6 },
      { guru_id: 'g1', lembaga: 'PKBM', jp_minggu: 8 },
      { guru_id: 'g2', lembaga: 'SDI', jp_minggu: 99 }
    ])
    expect(jpByLembagaForGuru(s, 'g1')).toEqual({ SDI: 18, PKBM: 8 })
  })

  it('guru tanpa beban → objek kosong', () => {
    expect(jpByLembagaForGuru(S([]), 'g9')).toEqual({})
  })
})

describe('jpPerHariForGuru — JP mingguan dibagi rata ke hari aktif', () => {
  const s = S([{ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 24 }])

  it('tanpa pengaturan hari aktif → default semua KECUALI Ahad/Minggu', () => {
    const per = jpPerHariForGuru(s, 'g1', 'SDI')
    expect(
      Object.keys(per)
        .map(Number)
        .sort((a, b) => a - b)
    ).toEqual(HARI_AKTIF_DEFAULT)
    expect(per[0]).toBeUndefined() // Ahad/Minggu libur
    expect(per[5]).toBe(4) // Jumat kini hari kerja
    expect(per[1]).toBe(4) // 24 ÷ 6 hari (Sen–Sab)
  })

  it('hari aktif per lembaga dipakai sebagai penyebut', () => {
    // Sekolah 5 hari (Senin–Jumat): 24 ÷ 5 = 4,8 JP/hari.
    const s5 = S([{ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 24 }], {
      hariAktifLembaga: { SDI: [1, 2, 3, 4, 5] }
    })
    const per = jpPerHariForGuru(s5, 'g1', 'SDI')
    expect(per[1]).toBeCloseTo(4.8, 6)
    expect(per[0]).toBeUndefined() // Ahad tak aktif
    expect(per[6]).toBeUndefined() // Sabtu tak aktif
  })

  it('guru tanpa beban di lembaga itu → map kosong (bukan NaN)', () => {
    expect(jpPerHariForGuru(s, 'g1', 'PKBM')).toEqual({})
    expect(jpPerHariForGuru(s, 'g9', 'SDI')).toEqual({})
  })

  it('hariAktifOf: tak diatur → null, diatur → daftar bersih', () => {
    expect(hariAktifOf({}, 'SDI')).toBeNull()
    expect(hariAktifOf({ hariAktifLembaga: { SDI: [] } }, 'SDI')).toBeNull()
    expect(hariAktifOf({ hariAktifLembaga: { SDI: [1, 1, 9, 2] } }, 'SDI')).toEqual([1, 2])
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Ini bagian yang menyentuh UANG: berapa JP yang benar-benar dibayar.
// ─────────────────────────────────────────────────────────────────────────────
describe('jpDiajarPeriode — pemotongan karena tidak masuk', () => {
  // Sepekan penuh 5–11 Jan 2026: Sen 5, Sel 6, Rab 7, Kam 8, Jum 9, Sab 10, Ahad 11.
  const SEPEKAN = [
    '2026-01-05',
    '2026-01-06',
    '2026-01-07',
    '2026-01-08',
    '2026-01-09',
    '2026-01-10',
    '2026-01-11'
  ]
  // 24 JP/minggu, hari aktif default (6 hari Sen–Sab, tanpa Ahad) → 4 JP/hari.
  const jpPerHari = jpPerHariForGuru(
    S([{ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 24 }]),
    'g1',
    'SDI'
  )

  it('hadir semua hari aktif → dapat JP mingguan PENUH', () => {
    const hadir = SEPEKAN.filter((d) => d !== '2026-01-11') // Ahad memang tak aktif
    const r = jpDiajarPeriode({ jpPerHari, tanggalList: SEPEKAN, hadirSet: hadir })
    expect(r.terjadwal).toBe(24)
    expect(r.diajar).toBe(24)
  })

  it('bolos 1 hari → terpotong tepat porsi hari itu', () => {
    const hadir = SEPEKAN.filter((d) => d !== '2026-01-11' && d !== '2026-01-06') // Ahad + bolos Selasa
    const r = jpDiajarPeriode({ jpPerHari, tanggalList: SEPEKAN, hadirSet: hadir })
    expect(r.terjadwal).toBe(24)
    expect(r.diajar).toBe(20) // 24 − 4
  })

  it('KUNCI: Ahad (di luar hari aktif) TIDAK dihitung absen', () => {
    // Guru tak pernah hadir hari Ahad, dan itu tak boleh mengurangi apa pun —
    // baik JP terjadwal maupun JP diajar.
    const hadir = SEPEKAN.filter((d) => d !== '2026-01-11')
    const r = jpDiajarPeriode({ jpPerHari, tanggalList: SEPEKAN, hadirSet: hadir })
    expect(r.terjadwal).toBe(24) // bukan 28
    expect(r.diajar).toBe(24)
  })

  it('hari libur dilewati — tak mengurangi hak, tak jadi utang', () => {
    const hadir = SEPEKAN.filter((d) => d !== '2026-01-11' && d !== '2026-01-07') // Ahad + Rabu libur
    const r = jpDiajarPeriode({
      jpPerHari,
      tanggalList: SEPEKAN,
      hadirSet: hadir,
      liburSet: ['2026-01-07'] // Rabu libur → guru tak absen walau tak hadir
    })
    expect(r.terjadwal).toBe(20)
    expect(r.diajar).toBe(20)
  })

  it('tidak masuk sama sekali → 0 JP', () => {
    const r = jpDiajarPeriode({ jpPerHari, tanggalList: SEPEKAN, hadirSet: [] })
    expect(r.diajar).toBe(0)
    expect(r.terjadwal).toBe(24)
  })

  it('JP pecahan dibulatkan 2 desimal (bukan 20.833333333333336)', () => {
    // 25 JP ÷ 6 hari aktif = 4,1666… — tanpa pembulatan, label slip jadi berantakan.
    const jph = jpPerHariForGuru(S([{ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 25 }]), 'g1', 'SDI')
    const hadir = SEPEKAN.filter((d) => d !== '2026-01-11' && d !== '2026-01-06') // Ahad + bolos Selasa
    const r = jpDiajarPeriode({ jpPerHari: jph, tanggalList: SEPEKAN, hadirSet: hadir })
    expect(r.terjadwal).toBe(25)
    expect(r.diajar).toBe(20.83)
  })

  it('tanpa beban (map kosong) → nol, tidak melempar', () => {
    const r = jpDiajarPeriode({ jpPerHari: {}, tanggalList: SEPEKAN, hadirSet: SEPEKAN })
    expect(r).toEqual({ diajar: 0, terjadwal: 0 })
  })
})

describe('peralihan dari bentuk lama', () => {
  it('total JP mingguan DIPERTAHANKAN, tapi sebaran hariannya memang berubah', () => {
    // Baris lama: 4 JP tiap Senin & Rabu = 8 JP/minggu, dulu menumpuk di 2 hari itu.
    const lama = S([{ guru_id: 'g1', lembaga: 'SDI', jp: 4, hari: [1, 3] }])
    expect(jpByLembagaForGuru(lama, 'g1')).toEqual({ SDI: 8 })
    // Sekarang 8 JP itu disebar rata ke 6 hari aktif → ±1,33 JP/hari.
    const per = jpPerHariForGuru(lama, 'g1', 'SDI')
    expect(per[1]).toBeCloseTo(8 / 6, 6)
    expect(per[2]).toBeCloseTo(8 / 6, 6) // Selasa kini ikut, dulu tidak
    // Konsekuensinya disengaja: bayaran sebulan penuh (hadir terus) tetap sama,
    // yang berubah hanya potongan saat guru absen di hari tertentu.
  })
})
