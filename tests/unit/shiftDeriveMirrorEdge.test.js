// PAGAR ANTI-MENYIMPANG: `supabase/functions/hiview-absen/shiftDerive.ts` (+ shiftMaster.ts)
// adalah cermin Deno dari `vue-app/src/utils/shiftDerive.js` (+ shiftMaster.js). Keduanya
// memutuskan hal yang sama: sebuah scan jatuh di shift mana, dan hadir atau terlambat.
// Mesin HiView memakai yang .ts; app + sync Desktop memakai yang .js. Kalau menyimpang,
// guru yang sama bisa tercatat berbeda tergantung mesin mana yang ia pakai — dan itu
// mengalir ke bonus kehadiran tanpa ada yang menyadarinya.
//
// Berkas ini menjalankan kasus yang sama pada KEDUA implementasi dan menuntut hasil
// identik, termasuk sapuan menyeluruh atas jam 00:00–23:59. CATATAN: sapuan hanya
// menjaga cabang yang setelannya ikut disapu — cabang aturan BARU wajib ditambahkan
// sebagai kasus eksplisit di bawah, jangan mengandalkan sapuannya saja.
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/shiftDerive.js'
import * as ts from '../../supabase/functions/hiview-absen/shiftDerive.ts'

// Setelan dibuat sebagai fungsi supaya tiap kasus dapat objek segar (tak saling mencemari).
const setelan = ({ awalPagi = 0, telatPagi = 0, awalSore = 0, telatSore = 0 } = {}) => ({
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
      id: 'pegawai_pagi',
      label: 'Pegawai Pagi',
      untuk: 'pegawai',
      urutan: 2,
      mulai: '',
      terlambat: '',
      selesai: ''
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
})

const ORANG = [
  { id: 'g1', nama: 'dua shift', shift_ids: ['pagi', 'sore'] },
  { id: 'g2', nama: 'pagi saja', shift_ids: ['pagi'] },
  { id: 'g3', nama: 'legacy tanpa shift_ids', tipe_pegawai: 'guru', shift: 'pagi_sore' },
  {
    id: 'g4',
    nama: 'pegawai menumpang jam guru',
    tipe_pegawai: 'pegawai',
    shift_ids: ['pegawai_pagi']
  },
  { id: 'g5', nama: 'legacy kosong', tipe_pegawai: 'guru', shift: 'kosong' }
]

const SETELAN_UJI = [
  setelan(),
  setelan({ awalPagi: 30 }),
  setelan({ telatSore: 45 }),
  setelan({ awalPagi: 30, telatPagi: 30, awalSore: 30, telatSore: 30 }),
  // sengaja ekstrem: window sore melar sampai menabrak window inti pagi
  setelan({ awalSore: 240 }),
  // toleransi mendekati batas atas & di atas batas (harus sama-sama dijepit)
  setelan({ awalPagi: 720, telatSore: 9999 })
]

// Semua jam dinding 00:00..23:59 — 1440 titik per (setelan × orang).
function semuaJam() {
  const out = []
  for (let m = 0; m < 24 * 60; m++) {
    const p = (n) => String(n).padStart(2, '0')
    out.push(p(Math.floor(m / 60)) + ':' + p(m % 60))
  }
  return out
}

describe('shiftDerive JS ⇄ Deno — deriveShift identik', () => {
  it('sapuan 00:00–23:59 × 6 setelan × 5 bentuk guru', () => {
    const jam = semuaJam()
    let dibandingkan = 0
    for (const S of SETELAN_UJI) {
      for (const g of ORANG) {
        for (const t of jam) {
          const a = js.deriveShift(t, g, S)
          const b = ts.deriveShift(t, g, S)
          if (a !== b) {
            throw new Error(
              `MENYIMPANG di ${g.nama} jam ${t}: js=${JSON.stringify(a)} ts=${JSON.stringify(b)}`
            )
          }
          dibandingkan++
        }
      }
    }
    expect(dibandingkan).toBe(SETELAN_UJI.length * ORANG.length * 1440)
  })

  it('cabang toleransi diperiksa eksplisit, tidak hanya lewat sapuan', () => {
    const S = setelan({ awalPagi: 30, telatSore: 30 })
    const g = ORANG[0]
    // datang kepagian
    expect(js.deriveShift('05:45', g, S)).toBe('pagi')
    expect(ts.deriveShift('05:45', g, S)).toBe('pagi')
    // tepat di batas toleransi
    expect(js.deriveShift('05:30', g, S)).toBe(ts.deriveShift('05:30', g, S))
    // lewat batas
    expect(js.deriveShift('05:29', g, S)).toBeNull()
    expect(ts.deriveShift('05:29', g, S)).toBeNull()
    // pulang telat masih dihitung masuk
    expect(js.deriveShift('17:40', g, S)).toBe('sore')
    expect(ts.deriveShift('17:40', g, S)).toBe('sore')
    // window inti menang atas toleransi shift lain
    const bentrok = setelan({ awalSore: 240 })
    expect(js.deriveShift('11:30', g, bentrok)).toBe('pagi')
    expect(ts.deriveShift('11:30', g, bentrok)).toBe('pagi')
  })

  it('toleransi menumpang shift fallback di kedua sisi', () => {
    const S = setelan({ awalPagi: 30 })
    const pegawai = ORANG[3]
    expect(js.deriveShift('05:45', pegawai, S)).toBe('pegawai_pagi')
    expect(ts.deriveShift('05:45', pegawai, S)).toBe('pegawai_pagi')
  })
})

describe('shiftDerive JS ⇄ Deno — statusFor & pilihShiftPulang identik', () => {
  it('statusFor sama di seluruh jam untuk tiap shift', () => {
    const S = setelan({ awalPagi: 30, telatSore: 30 })
    for (const shift of ['pagi', 'pegawai_pagi', 'sore', 'tak_ada']) {
      for (const t of semuaJam()) {
        expect(js.statusFor(t, shift, S)).toBe(ts.statusFor(t, shift, S))
      }
    }
  })

  it('pilihShiftPulang sama untuk susunan baris masuk yang lazim', () => {
    const S = setelan()
    const susunan = [
      [],
      [{ shift: 'pagi', jam: '06:10', status: 'hadir' }],
      [{ shift: 'pagi', jam: '06:10', status: 'izin' }],
      [
        { shift: 'pagi', jam: '06:10', status: 'hadir' },
        { shift: 'sore', jam: '15:05', status: 'terlambat' }
      ],
      [{ shift: 'pagi', jam: '', status: 'hadir' }]
    ]
    for (const baris of susunan) {
      for (const t of semuaJam()) {
        expect(js.pilihShiftPulang(t, baris, S)).toEqual(ts.pilihShiftPulang(t, baris, S))
      }
    }
  })

  it('MIN_JEDA_PULANG_MENIT tak boleh beda antar cermin', () => {
    expect(js.MIN_JEDA_PULANG_MENIT).toBe(ts.MIN_JEDA_PULANG_MENIT)
  })
})
