// Kyai (1 Sep 2026): "di satu lembaga ada guru yang masuk tiap hari dan ada yang cuma
// 3 hari, saat ini tidak ada tempat mengaturnya. Jadi guru yg mengajarnya tidak full
// senin-sabtu terhitung punya alpa banyak."
//
// Yang WAJIB dijaga tes ini, berurut dari yang paling mahal bila jebol:
//   1. Guru TANPA jadwal khusus tak berubah sedikit pun — mayoritas guru ada di sini,
//      dan fitur ini tak boleh menggeser satu angka pun milik mereka.
//   2. Hari di luar jadwal tak jadi alpa, TAPI kalau gurunya ternyata datang, baris
//      hadirnya tetap terhitung (kalau hilang, bisyaroh "× kehadiran"-nya ikut hilang).
//   3. Daftar hari KOSONG dibaca "belum diatur", bukan "tak pernah masuk" — beda antara
//      dua tafsir itu adalah beda antara bisyaroh utuh dan bisyaroh nol.
import { describe, it, expect } from 'vitest'
import {
  normHariList,
  jadwalMap,
  hariShiftGuru,
  guruMasukPada,
  tanggalBukanJadwal,
  hariGuruLembaga,
  punyaJadwalKhusus,
  dowOf
} from '@/utils/jadwalGuru'
import { hitungSel, indexAbsensiHarian } from '@/utils/absensiRekap'
import { jpPerHariForGuru, jpDiajarPeriode } from '@/utils/bebanMengajar'

// Sepekan 5–11 Jan 2026: Sen 5, Sel 6, Rab 7, Kam 8, Jum 9, Sab 10, Ahad 11.
const SEPEKAN = [
  '2026-01-05',
  '2026-01-06',
  '2026-01-07',
  '2026-01-08',
  '2026-01-09',
  '2026-01-10',
  '2026-01-11'
]
const SENIN_SABTU = SEPEKAN.slice(0, 6)

describe('normHariList & dowOf', () => {
  it('membuang sampah, unik, terurut', () => {
    expect(normHariList([3, 1, 1, 9, -2, 'x', 5])).toEqual([1, 3, 5])
    expect(normHariList(null)).toEqual([])
    expect(normHariList('senin')).toEqual([])
  })

  it('dowOf memakai tengah malam LOKAL — sama dengan isLiburIso & bebanMengajar', () => {
    expect(dowOf('2026-01-05')).toBe(1) // Senin
    expect(dowOf('2026-01-11')).toBe(0) // Ahad
    expect(dowOf('bukan-tanggal')).toBeNull()
  })
})

describe('jadwalMap — pembacaan yang tak mudah tertipu data lama', () => {
  it('kunci kosong & daftar sampah dibuang', () => {
    const g = { hari_shift: { pagi: [1, 3, 5], '': [1], sore: [], sekolah: ['x', 99] } }
    expect(jadwalMap(g)).toEqual({ pagi: [1, 3, 5] })
  })

  it('bentuk salah (array / string / null) tak melempar', () => {
    expect(jadwalMap({ hari_shift: [1, 2] })).toEqual({})
    expect(jadwalMap({ hari_shift: 'senin' })).toEqual({})
    expect(jadwalMap({})).toEqual({})
    expect(jadwalMap(null)).toEqual({})
  })

  it('punyaJadwalKhusus hanya true bila benar-benar ada isinya', () => {
    expect(punyaJadwalKhusus({ hari_shift: { pagi: [] } })).toBe(false)
    expect(punyaJadwalKhusus({ hari_shift: { pagi: [1] } })).toBe(true)
  })
})

describe('hariShiftGuru — "tak diatur" harus null, bukan []', () => {
  it('shift tanpa jadwal → null (pemanggil pakai perilaku lama)', () => {
    expect(hariShiftGuru({ hari_shift: { pagi: [1, 3] } }, 'sore')).toBeNull()
    expect(hariShiftGuru({}, 'pagi')).toBeNull()
  })

  it('KUNCI: daftar kosong dibaca "tak diatur", bukan "tak pernah masuk"', () => {
    // Centang yang tak sengaja terhapus tidak boleh menihilkan absensi & bisyaroh guru.
    expect(hariShiftGuru({ hari_shift: { pagi: [] } }, 'pagi')).toBeNull()
    expect(guruMasukPada({ hari_shift: { pagi: [] } }, 'pagi', '2026-01-06')).toBe(true)
  })
})

describe('guruMasukPada', () => {
  const g3 = { hari_shift: { pagi: [1, 3, 5] } } // Senin, Rabu, Jumat

  it('guru tanpa jadwal khusus masuk tiap hari (perilaku sebelum 1 Sep 2026)', () => {
    for (const iso of SEPEKAN) expect(guruMasukPada({}, 'pagi', iso)).toBe(true)
  })

  it('guru 3 hari hanya masuk di harinya', () => {
    expect(guruMasukPada(g3, 'pagi', '2026-01-05')).toBe(true) // Senin
    expect(guruMasukPada(g3, 'pagi', '2026-01-06')).toBe(false) // Selasa
    expect(guruMasukPada(g3, 'pagi', '2026-01-07')).toBe(true) // Rabu
  })

  it('jadwal shift lain tak bocor ke shift ini', () => {
    // Inti keputusan "per shift": sekolah tiap hari, ngaji sore 3 hari.
    const dual = { hari_shift: { sore: [1, 3, 5] } }
    expect(guruMasukPada(dual, 'sekolah', '2026-01-06')).toBe(true) // sekolah tak diatur
    expect(guruMasukPada(dual, 'sore', '2026-01-06')).toBe(false) // ngaji Selasa libur
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// ALPA — keluhan aslinya.
// ─────────────────────────────────────────────────────────────────────────────
describe('hitungSel — alpa palsu guru paruh-waktu', () => {
  const idx = indexAbsensiHarian([
    { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-05', status: 'hadir', jam_pulang: '12:00' },
    { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-07', status: 'hadir', jam_pulang: '12:00' },
    { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-09', status: 'hadir', jam_pulang: '12:00' }
  ])
  const g3 = { id: 'g1', hari_shift: { pagi: [1, 3, 5] } }
  const AKHIR = '2026-01-31' // seluruh pekan sudah lewat

  it('SEBELUM perbaikan: hadir 3 hari sesuai jadwal tetap kena 3 alpa', () => {
    const sel = hitungSel(idx, 'g1', 'pagi', SENIN_SABTU, AKHIR)
    expect(sel.H).toBe(3)
    expect(sel.A).toBe(3) // Selasa, Kamis, Sabtu — padahal bukan jadwalnya
  })

  it('SESUDAH: nol alpa, kehadiran tetap 3', () => {
    const sel = hitungSel(
      idx,
      'g1',
      'pagi',
      SENIN_SABTU,
      AKHIR,
      tanggalBukanJadwal(g3, 'pagi', SENIN_SABTU)
    )
    expect(sel.A).toBe(0)
    expect(sel.H).toBe(3)
    expect(sel.total).toBe(3)
  })

  it('KUNCI: guru yang tetap datang di luar jadwal TETAP dihitung hadir', () => {
    // Kalau tanggalnya dibuang dari daftar (bukan hukumannya saja), kehadiran ini
    // lenyap dan bisyaroh "× kehadiran"-nya ikut hilang tanpa jejak.
    const idx2 = indexAbsensiHarian([
      { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-05', status: 'hadir' }, // Senin, jadwal
      { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-06', status: 'terlambat' }, // Selasa, DI LUAR jadwal
      { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-07', status: 'hadir' }, // Rabu, jadwal
      { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-09', status: 'hadir' } // Jumat, jadwal
    ])
    const sel = hitungSel(
      idx2,
      'g1',
      'pagi',
      SENIN_SABTU,
      AKHIR,
      tanggalBukanJadwal(g3, 'pagi', SENIN_SABTU)
    )
    expect(sel.H).toBe(3)
    expect(sel.T).toBe(1) // Selasa di luar jadwal tetap terhitung, bukan dibuang
    expect(sel.A).toBe(0)
    expect(sel.total).toBe(4)
  })

  it('hari JADWAL yang kosong tetap alpa — pembebasannya tidak kebablasan', () => {
    // Hanya Senin yang ada barisnya; Rabu & Jumat memang jadwalnya dan memang bolos.
    const idxSenin = indexAbsensiHarian([
      { guru_id: 'g1', shift: 'pagi', tanggal: '2026-01-05', status: 'hadir' }
    ])
    const sel = hitungSel(
      idxSenin,
      'g1',
      'pagi',
      SENIN_SABTU,
      AKHIR,
      tanggalBukanJadwal(g3, 'pagi', SENIN_SABTU)
    )
    expect(sel.H).toBe(1)
    expect(sel.A).toBe(2) // Rabu + Jumat, BUKAN 5
  })

  it('guru full Senin–Sabtu tak berubah: yang benar-benar bolos tetap alpa', () => {
    const sel = hitungSel(
      idx,
      'g1',
      'pagi',
      SENIN_SABTU,
      AKHIR,
      tanggalBukanJadwal({}, 'pagi', SENIN_SABTU)
    )
    expect(sel.A).toBe(3)
  })

  it('hari depan tetap bukan alpa (batas today masih berlaku)', () => {
    const sel = hitungSel(
      idx,
      'g1',
      'pagi',
      SENIN_SABTU,
      '2026-01-05',
      tanggalBukanJadwal(g3, 'pagi', SENIN_SABTU)
    )
    expect(sel.A).toBe(0)
    // `todayIso` hanya menggerbangi ALPA, tidak menyaring baris yang sudah ada —
    // perilaku asli hitungSel, sengaja tak diubah di sini.
    expect(sel.H).toBe(3)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// UANG — bagian yang paling mahal bila salah.
// ─────────────────────────────────────────────────────────────────────────────
describe('jpPerHariForGuru — pembagi JP', () => {
  const S = { bebanMengajar: [{ guru_id: 'g1', lembaga: 'SDI', jp_minggu: 12 }] }

  it('tanpa jadwal khusus → persis seperti sebelumnya (12 ÷ 6 hari)', () => {
    const per = jpPerHariForGuru(S, 'g1', 'SDI')
    expect(per[1]).toBe(2)
    expect(per[2]).toBe(2)
  })

  it('KUNCI: guru 3 hari dibagi 3, bukan 6 — bisyaroh utuh, bukan separuh', () => {
    const per = jpPerHariForGuru(S, 'g1', 'SDI', [1, 3, 5])
    expect(per[1]).toBe(4) // 12 ÷ 3
    expect(per[2]).toBeUndefined() // Selasa bukan jadwalnya
    const r = jpDiajarPeriode({
      jpPerHari: per,
      tanggalList: SEPEKAN,
      hadirSet: ['2026-01-05', '2026-01-07', '2026-01-09']
    })
    expect(r.terjadwal).toBe(12)
    expect(r.diajar).toBe(12) // dulu 6 — inilah separuh yang hilang
  })

  it('irisan dengan hari aktif lembaga: sekolah libur Jumat tak membayar Jumat', () => {
    const S5 = { ...S, hariAktifLembaga: { SDI: [1, 2, 3, 4, 6] } } // tanpa Jumat
    const per = jpPerHariForGuru(S5, 'g1', 'SDI', [1, 3, 5]) // guru menyebut Jumat
    expect(per[5]).toBeUndefined() // Jumat gugur — sekolahnya memang tutup
    expect(per[1]).toBe(6) // 12 ÷ 2 hari tersisa (Senin, Rabu)
  })

  it('irisan KOSONG (data bertentangan) → jatuh ke hari guru, bukan ke nol', () => {
    // Menihilkan bisyaroh diam-diam jauh lebih berbahaya daripada sedikit lebih.
    const S5 = { ...S, hariAktifLembaga: { SDI: [2, 4] } }
    const per = jpPerHariForGuru(S5, 'g1', 'SDI', [1, 3])
    expect(per[1]).toBe(6)
    expect(Object.keys(per).length).toBe(2)
  })

  it('daftar hari sampah diabaikan → kembali ke hari lembaga', () => {
    expect(jpPerHariForGuru(S, 'g1', 'SDI', [])[1]).toBe(2)
    expect(jpPerHariForGuru(S, 'g1', 'SDI', ['x', 99])[1]).toBe(2)
  })
})

describe('hariGuruLembaga — jembatan shift → lembaga', () => {
  // Shift 'sdi_pagi' menyebut lembaganya sendiri lewat kolom "Khusus Lembaga".
  const settings = {
    shiftMaster: [
      { id: 'sdi_pagi', label: 'SDI Pagi', untuk: 'guru', urutan: 1, lembaga: ['SDI'] },
      { id: 'sore', label: 'Sore', untuk: 'guru', urutan: 2 }
    ]
  }
  const guru = {
    id: 'g1',
    lembaga: 'PTPT',
    lembaga_sekolah: 'SDI',
    shift_ids: ['sdi_pagi', 'sore'],
    hari_shift: { sdi_pagi: [1, 3, 5] }
  }

  it('hari shift sekolah terbaca sebagai hari guru di lembaga SDI', () => {
    expect(hariGuruLembaga(guru, 'SDI', settings)).toEqual([1, 3, 5])
  })

  it('lembaga yang shift-nya belum diatur → null (pakai hari aktif lembaga)', () => {
    expect(hariGuruLembaga(guru, 'PTPT', settings)).toBeNull()
  })

  it('lembaga asing / kosong → null, tidak melempar', () => {
    expect(hariGuruLembaga(guru, 'MTS', settings)).toBeNull()
    expect(hariGuruLembaga(guru, '', settings)).toBeNull()
  })

  it('beberapa shift di lembaga sama → harinya digabung', () => {
    const s2 = {
      shiftMaster: [
        { id: 'ngaji_pagi', label: 'Ngaji Pagi', untuk: 'guru', urutan: 1, lembaga: ['PTPT'] },
        { id: 'ngaji_sore', label: 'Ngaji Sore', untuk: 'guru', urutan: 2, lembaga: ['PTPT'] }
      ]
    }
    const g2 = {
      id: 'g2',
      lembaga: 'PTPT',
      shift_ids: ['ngaji_pagi', 'ngaji_sore'],
      hari_shift: { ngaji_pagi: [1, 3], ngaji_sore: [3, 5] }
    }
    expect(hariGuruLembaga(g2, 'PTPT', s2)).toEqual([1, 3, 5])
  })

  it('satu shift lembaga itu belum diatur → null (penyebut separuh-jadi lebih bahaya)', () => {
    const s2 = {
      shiftMaster: [
        { id: 'ngaji_pagi', label: 'Ngaji Pagi', untuk: 'guru', urutan: 1, lembaga: ['PTPT'] },
        { id: 'ngaji_sore', label: 'Ngaji Sore', untuk: 'guru', urutan: 2, lembaga: ['PTPT'] }
      ]
    }
    const g3 = {
      id: 'g3',
      lembaga: 'PTPT',
      shift_ids: ['ngaji_pagi', 'ngaji_sore'],
      hari_shift: { ngaji_pagi: [1, 3] }
    }
    expect(hariGuruLembaga(g3, 'PTPT', s2)).toBeNull()
  })
})
