// Kyai (6 Agu 2026): "ada guru yg sudah scan tapi datanya tidak terkirim ke aplikasi.
// padahal ID finger sudah benar."
//
// Akar: deriveShift hanya menerima scan yang jatuh PERSIS di `mulai`..`selesai`. Guru
// yang ceklok sebelum shift dibuka (datang kepagian) atau jauh setelah shift bubar
// tak jadi baris absen sama sekali — hilang diam-diam, cuma jadi angka "luar jam shift".
//
// Aturan baru: dua angka toleransi per shift melebarkan window itu. DEFAULT 0 supaya
// tak ada absensi lama yang berubah, dan window INTI selalu menang atas toleransi
// shift lain (dua lintasan di deriveShift).
import { describe, it, expect } from 'vitest'
import { deriveShift, statusFor } from '@/utils/shiftDerive'
import {
  normalizeShift,
  normToleransi,
  MAKS_TOLERANSI_MENIT,
  SHIFT_LEGACY_KOSONG
} from '@/utils/shiftMaster'

// Jam NYATA pesantren (HANDOFF-FINGERPRINT-SYNC.md): pagi 06:00–12:00 telat 06:45,
// sore 15:00–17:15 telat 15:20.
function setelan({ awalPagi = 0, telatPagi = 0, awalSore = 0, telatSore = 0 } = {}) {
  return {
    shiftMaster: [
      {
        id: 'pagi',
        label: 'Pagi',
        untuk: 'guru',
        urutan: 1,
        mulai: '06:00',
        terlambat: '06:45',
        selesai: '12:00',
        toleransi_awal: awalPagi,
        toleransi_telat: telatPagi
      },
      {
        id: 'sore',
        label: 'Sore',
        untuk: 'guru',
        urutan: 4,
        mulai: '15:00',
        terlambat: '15:20',
        selesai: '17:15',
        toleransi_awal: awalSore,
        toleransi_telat: telatSore
      }
    ]
  }
}

const GURU = { id: 'g1', nama: 'Ust. A', shift_ids: ['pagi', 'sore'] }

describe('normToleransi', () => {
  it('kosong / bukan angka / negatif → 0 (perilaku lama)', () => {
    for (const v of [undefined, null, '', 'abc', 0, -5, NaN]) {
      expect(normToleransi(v)).toBe(0)
    }
  })

  it('angka pecahan dibulatkan ke bawah, teks angka diterima', () => {
    expect(normToleransi(30.9)).toBe(30)
    expect(normToleransi('45')).toBe(45)
  })

  it('dijepit di MAKS_TOLERANSI_MENIT — menjaring salah ketik "600" untuk 60', () => {
    expect(normToleransi(9999)).toBe(MAKS_TOLERANSI_MENIT)
  })

  it('normalizeShift membawa kedua field, default 0', () => {
    const polos = normalizeShift({ id: 'pagi', label: 'Pagi' })
    expect(polos.toleransi_awal).toBe(0)
    expect(polos.toleransi_telat).toBe(0)
    const isi = normalizeShift({ id: 'pagi', label: 'Pagi', toleransi_awal: '20' })
    expect(isi.toleransi_awal).toBe(20)
  })
})

describe('deriveShift — perilaku lama saat toleransi 0', () => {
  const S = setelan()

  it('scan di dalam window tetap kena shift-nya', () => {
    expect(deriveShift('06:00', GURU, S)).toBe('pagi')
    expect(deriveShift('11:59', GURU, S)).toBe('pagi')
    expect(deriveShift('15:30', GURU, S)).toBe('sore')
  })

  it('datang kepagian & pulang telat tetap NULL — inilah bug yang dilaporkan', () => {
    expect(deriveShift('05:45', GURU, S)).toBeNull()
    expect(deriveShift('17:30', GURU, S)).toBeNull()
  })
})

describe('deriveShift — toleransi datang awal', () => {
  it('scan 05:45 masuk shift pagi saat toleransi awal 30 menit', () => {
    const S = setelan({ awalPagi: 30 })
    expect(deriveShift('05:45', GURU, S)).toBe('pagi')
    expect(deriveShift('05:30', GURU, S)).toBe('pagi') // tepat di batas
  })

  it('sebelum batas toleransi tetap null', () => {
    const S = setelan({ awalPagi: 30 })
    expect(deriveShift('05:29', GURU, S)).toBeNull()
  })

  it('datang lebih awal tetap dihitung HADIR, bukan terlambat', () => {
    const S = setelan({ awalPagi: 30 })
    expect(statusFor('05:45', 'pagi', S)).toBe('hadir')
  })

  it('toleransi tidak melipat ke hari sebelumnya — dijepit di 00:00', () => {
    const S = {
      shiftMaster: [
        {
          id: 'subuh',
          label: 'Subuh',
          untuk: 'guru',
          urutan: 1,
          mulai: '00:30',
          terlambat: '00:45',
          selesai: '02:00',
          toleransi_awal: 120
        }
      ]
    }
    const g = { id: 'g2', shift_ids: ['subuh'] }
    expect(deriveShift('00:00', g, S)).toBe('subuh')
    expect(deriveShift('23:00', g, S)).toBeNull() // TIDAK melipat ke hari kemarin
  })
})

describe('deriveShift — toleransi telat setelah shift bubar', () => {
  it('scan 17:30 masuk shift sore saat toleransi telat 30 menit, status terlambat', () => {
    const S = setelan({ telatSore: 30 })
    expect(deriveShift('17:30', GURU, S)).toBe('sore')
    expect(statusFor('17:30', 'sore', S)).toBe('terlambat')
  })

  it('lewat batas toleransi tetap null', () => {
    const S = setelan({ telatSore: 30 })
    expect(deriveShift('17:46', GURU, S)).toBeNull()
  })
})

describe('deriveShift — window inti selalu menang atas toleransi shift lain', () => {
  // Sore diberi toleransi awal 4 jam → window efektifnya 11:00–17:15, menyerobot
  // jam-jam terakhir shift pagi. Scan yang masih di window INTI pagi harus tetap pagi.
  const S = setelan({ awalSore: 240 })

  it('scan 11:30 tetap shift pagi, bukan direbut toleransi sore', () => {
    expect(deriveShift('11:30', GURU, S)).toBe('pagi')
  })

  it('scan 12:00 (batas akhir pagi) tetap pagi', () => {
    expect(deriveShift('12:00', GURU, S)).toBe('pagi')
  })

  it('barulah setelah window inti pagi habis, toleransi sore berlaku', () => {
    expect(deriveShift('12:01', GURU, S)).toBe('sore')
  })

  it('tanpa toleransi, jam yang sama itu hilang (pembanding perilaku lama)', () => {
    expect(deriveShift('12:01', GURU, setelan())).toBeNull()
  })
})

describe('deriveShift — toleransi ikut shift fallback', () => {
  // Pegawai Pagi tak punya jam sendiri → menumpang jam GURU pagi. Toleransinya pun
  // harus ikut, supaya tak perlu disetel dua kali di tempat berbeda.
  const S = {
    shiftMaster: [
      {
        id: 'pagi',
        label: 'Pagi',
        untuk: 'guru',
        urutan: 1,
        mulai: '06:00',
        terlambat: '06:45',
        selesai: '12:00',
        toleransi_awal: 30
      },
      {
        id: 'pegawai_pagi',
        label: 'Pegawai Pagi',
        untuk: 'pegawai',
        urutan: 2,
        mulai: '',
        terlambat: '',
        selesai: ''
      }
    ]
  }
  const pegawai = { id: 'p1', shift_ids: ['pegawai_pagi'] }

  it('pegawai yang menumpang jam guru ikut menumpang toleransinya', () => {
    expect(deriveShift('05:45', pegawai, S)).toBe('pegawai_pagi')
  })
})

describe('deriveShift — penjaga yang tak boleh longgar', () => {
  it('guru tanpa shift tetap null berapa pun toleransinya', () => {
    const S = setelan({ awalPagi: 120, telatSore: 120 })
    // shift_ids kosong TIDAK berarti tanpa shift — turun ke aturan legacy. "Tanpa shift"
    // yang sesungguhnya = penanda SHIFT_LEGACY_KOSONG (lihat shiftMaster.js).
    const tanpaShift = { id: 'g3', shift_ids: [], shift: SHIFT_LEGACY_KOSONG }
    expect(deriveShift('06:00', tanpaShift, S)).toBeNull()
  })

  it('shift_ids kosong turun ke aturan legacy, bukan jadi "tanpa shift"', () => {
    // Jebakan saat menelusuri "guru scan tapi tak jadi absen": shift_ids kosong masih
    // menghasilkan pagi+sore lewat jalur data lama, jadi bukan itu sebabnya.
    const S = setelan()
    expect(deriveShift('06:00', { id: 'g5', shift_ids: [] }, S)).toBe('pagi')
  })

  it('shift tanpa jam tak pernah cocok walau toleransi diisi', () => {
    const S = {
      shiftMaster: [{ id: 'piket', label: 'Piket', untuk: 'guru', urutan: 1, toleransi_awal: 60 }]
    }
    expect(deriveShift('06:00', { id: 'g4', shift_ids: ['piket'] }, S)).toBeNull()
  })

  it('jam scan tak valid tetap null', () => {
    expect(deriveShift('', GURU, setelan({ awalPagi: 60 }))).toBeNull()
  })
})
