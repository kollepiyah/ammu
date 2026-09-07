// Kyai (5 Sep 2026): "shift yg belum dimulai jangan dihitung alpa."
//
// Sampai v.1.4.1 alpa disimpulkan dari TANGGAL saja, jadi setiap pagi seluruh shift Sore
// hari itu sudah bertulis 'A' merah — di rekap admin, di Excel, DAN di kartu "kehadiran
// saya" milik guru. Yang WAJIB dijaga tes ini:
//   1. HARI INI tertahan sampai jam mulai shift; kemarin tidak pernah tertahan. Kalau
//      batas ini melar ke hari kemarin, alpa sungguhan hilang dari rekap tanpa jejak.
//   2. Shift yang jam mulainya BELUM DIATUR berperilaku seperti sebelumnya (boleh alpa).
//      Menebak jam untuk shift tanpa jam = membebaskan alpa yang seharusnya ada.
//   3. Shift pegawai yang jamnya dikosongkan menumpang jam shift guru pasangannya —
//      aturan fallback yang sama dengan penurunan shift dari jam scan (shiftDerive).
//   4. Kunci daftar shift bernilai SAMA selama tak ada shift yang baru dibuka. Itu yang
//      menjaga matriks 6.000 sel tidak dirakit ulang 1.440 kali sehari (lihat catatan
//      kinerja v.1.4.0 di utils/absensiMatriks).
import { describe, it, expect } from 'vitest'
import {
  jamJakarta,
  jamMulaiShift,
  slotBolehAlpa,
  shiftBelumMulai,
  kunciBelumMulai,
  setDariKunci
} from '@/utils/shiftBerjalan'

// Master shift ala pesantren ini: pagi & sekolah pagi, sore sesudah asar, plus dua shift
// pegawai yang JAMNYA SENGAJA DIKOSONGKAN (menumpang jam guru) dan satu shift tanpa jam
// sama sekali.
const SETTINGS = {
  shiftMaster: [
    { id: 'pagi', label: 'Pagi', untuk: 'guru', urutan: 1, mulai: '06:30', selesai: '11:00' },
    {
      id: 'pegawai_pagi',
      label: 'Pegawai Pagi',
      untuk: 'pegawai',
      urutan: 2,
      mulai: '',
      selesai: ''
    },
    { id: 'sekolah', label: 'Sekolah', untuk: 'guru', urutan: 3, mulai: '07:00', selesai: '12:30' },
    { id: 'sore', label: 'Sore', untuk: 'guru', urutan: 4, mulai: '15:30', selesai: '17:00' },
    { id: 'piket_malam', label: 'Piket Malam', untuk: 'guru', urutan: 6 }
  ]
}

const HARI_INI = '2026-09-05'

describe('jamJakarta', () => {
  it('memberi HH:MM 24-jam dan mengikuti WIB, bukan zona perangkat', () => {
    // 2026-09-05T01:30:00Z = 08:30 WIB.
    expect(jamJakarta(new Date('2026-09-05T01:30:00Z'))).toBe('08:30')
    // Tengah malam WIB harus '00:00', bukan '24:00' (hourCycle h23).
    expect(jamJakarta(new Date('2026-09-04T17:00:00Z'))).toBe('00:00')
  })

  it('tanggal tak sah → string kosong (pemanggil menganggapnya "jam tak terbaca")', () => {
    expect(jamJakarta(new Date('bukan tanggal'))).toBe('')
  })
})

describe('jamMulaiShift', () => {
  it('membaca jam master apa adanya', () => {
    expect(jamMulaiShift('sore', SETTINGS)).toBe('15:30')
  })

  it('shift pegawai berjam kosong menumpang jam shift guru pasangannya', () => {
    expect(jamMulaiShift('pegawai_pagi', SETTINGS)).toBe('06:30')
  })

  it('shift tanpa jam sama sekali → kosong', () => {
    expect(jamMulaiShift('piket_malam', SETTINGS)).toBe('')
    expect(jamMulaiShift('tak_ada', SETTINGS)).toBe('')
  })
})

describe('slotBolehAlpa', () => {
  it('hari kemarin selalu boleh alpa — jam tak ada urusannya', () => {
    expect(slotBolehAlpa('2026-09-04', HARI_INI, '05:00', '15:30')).toBe(true)
    expect(slotBolehAlpa('2026-08-31', HARI_INI, '23:59', '15:30')).toBe(true)
  })

  it('hari depan tak pernah alpa', () => {
    expect(slotBolehAlpa('2026-09-06', HARI_INI, '23:00', '06:30')).toBe(false)
  })

  it('HARI INI tertahan sampai jam mulai shift — inti permintaan Kyai', () => {
    // Pukul 08:00, shift Sore (15:30) belum dibuka.
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '08:00', '15:30')).toBe(false)
    // Shift Pagi (06:30) sudah berjalan sejak subuh.
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '08:00', '06:30')).toBe(true)
  })

  it('pas di jam mulai sudah dihitung berjalan (batasnya inklusif)', () => {
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '15:30', '15:30')).toBe(true)
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '15:29', '15:30')).toBe(false)
  })

  it('shift tanpa jam mulai berperilaku seperti sebelum v.1.4.1', () => {
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '00:05', '')).toBe(true)
  })

  it('jam sekarang tak terbaca → alpa TIDAK dihapus (jangan menyembunyikan yang sah)', () => {
    expect(slotBolehAlpa(HARI_INI, HARI_INI, '', '15:30')).toBe(true)
  })

  it('tanggal rusak tak pernah jadi alpa', () => {
    expect(slotBolehAlpa('', HARI_INI, '08:00', '06:30')).toBe(false)
    expect(slotBolehAlpa(HARI_INI, '', '08:00', '06:30')).toBe(false)
  })
})

describe('daftar shift yang belum dimulai', () => {
  it('pukul 08:00 hanya Sore yang belum dibuka', () => {
    expect(shiftBelumMulai(SETTINGS, '08:00')).toEqual(['sore'])
  })

  it('pukul 05:00 semua shift berjam belum dibuka — yang tanpa jam tidak ikut', () => {
    expect(shiftBelumMulai(SETTINGS, '05:00')).toEqual(['pagi', 'pegawai_pagi', 'sekolah', 'sore'])
    expect(shiftBelumMulai(SETTINGS, '05:00')).not.toContain('piket_malam')
  })

  it('pukul 20:00 tak ada lagi yang tertahan', () => {
    expect(shiftBelumMulai(SETTINGS, '20:00')).toEqual([])
  })

  it('jam tak terbaca → daftar kosong (tak ada alpa yang dibebaskan)', () => {
    expect(shiftBelumMulai(SETTINGS, '')).toEqual([])
  })
})

describe('kunci render', () => {
  it('bernilai SAMA sepanjang jam-jam yang tak membuka shift apa pun', () => {
    // 08:00 s/d 15:29 tak ada shift baru yang dibuka → kunci identik, ref tak memicu render.
    const a = kunciBelumMulai(SETTINGS, '08:00')
    expect(kunciBelumMulai(SETTINGS, '11:59')).toBe(a)
    expect(kunciBelumMulai(SETTINGS, '15:29')).toBe(a)
    // Begitu Sore dibuka, kuncinya berubah — dan hanya di situ matriks dirakit ulang.
    expect(kunciBelumMulai(SETTINGS, '15:30')).not.toBe(a)
  })

  it('bolak-balik kunci ⇄ Set', () => {
    const k = kunciBelumMulai(SETTINGS, '05:00')
    const set = setDariKunci(k)
    expect(set.has('sore')).toBe(true)
    expect(set.has('piket_malam')).toBe(false)
    expect(setDariKunci('').size).toBe(0)
  })
})
