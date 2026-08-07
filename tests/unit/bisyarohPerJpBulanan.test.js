// Cara hitung `per_jp_bulanan` (Kyai, 7 Agu 2026: "ini rumus JPnya kok gk sesuai ya").
//
// Tarif bisyaroh sekolah dimaksudkan PER JP PER BULAN, bukan per pertemuan. Dengan `per_jp`
// lama, 30 JP/minggu × Rp 20.000 keluar Rp 2.400.000 sebulan — JP mingguan disebar ke hari
// aktif lalu dikalikan tiap hari guru masuk, sehingga di bulan berisi 24 hari efektif
// hasilnya tepat 4× lipat. Yang dimaksud Rp 600.000, dengan kehadiran tetap memotong.
import { describe, it, expect } from 'vitest'
import { barisBisyaroh, normalizeJenisBisyaroh } from '../../vue-app/src/utils/bisyarohScope.js'

const jenis = (o) => normalizeJenisBisyaroh({ aktif: true, ...o })

// Aizza di SDI: 30 JP/minggu. Agustus 2026 = 24 hari efektif, hari aktif Sen–Sab (6),
// jadi 5 JP/hari × 24 = 120 JP terjadwal.
const ctx = (diajar = 120) => ({
  guruId: 'g1',
  refs: [{ jabatan_di_sini: 'Guru', lembaga: 'SDI', group: 'sekolah' }],
  shiftIds: new Set(['sekolah']),
  hadirPerShift: { sekolah: 24 },
  hadirTepatPerShift: { sekolah: 24 },
  bebanJPByLembaga: { SDI: 30 },
  jpDiajarByLembaga: { SDI: { diajar, terjadwal: 120 } }
})

const JENIS_BULANAN = [
  jenis({ id: 'sdi', label: 'Bisyaroh Guru SDI', hitungan: 'per_jp_bulanan', nominal: 20000 })
]
const JENIS_LAMA = [
  jenis({ id: 'sdi', label: 'Bisyaroh Guru SDI', hitungan: 'per_jp', nominal: 20000 })
]

describe('per_jp_bulanan', () => {
  it('pengalinya JP MINGGUAN, bukan JP sebulan', () => {
    const b = barisBisyaroh(JENIS_BULANAN, ctx())[0]
    expect(b).toMatchObject({ hitungan: 'per_jp_bulanan', qty: 30, tarif: 20000 })
    expect(b.nominal).toBe(600000)
  })

  it('empat kali lebih kecil dari per_jp lama pada bulan 4 minggu — itu memang keluhannya', () => {
    expect(barisBisyaroh(JENIS_LAMA, ctx())[0].nominal).toBe(2400000)
    expect(barisBisyaroh(JENIS_BULANAN, ctx())[0].nominal).toBe(600000)
  })

  it('kehadiran memotong lewat prorata JP diajar ÷ terjadwal', () => {
    // Bolong 12 JP dari 120 -> 90% -> 540.000
    const b = barisBisyaroh(JENIS_BULANAN, ctx(108))[0]
    expect(b.prorata).toBe(0.9)
    expect(b.nominal).toBe(540000)
  })

  it('hadir penuh = utuh; tak hadir sama sekali = nol', () => {
    expect(barisBisyaroh(JENIS_BULANAN, ctx(120))[0].nominal).toBe(600000)
    expect(barisBisyaroh(JENIS_BULANAN, ctx(0))[0].nominal).toBe(0)
  })

  it('tanpa jadwal di lembaga mana pun -> TAK ADA baris sama sekali', () => {
    // Sejak lembaga per-JP diambil dari Beban Mengajar (Kyai 7 Agu), guru tanpa baris beban
    // memang tak mengajar di sana — jadi barisnya tak lahir, bukan lahir bernilai Rp 0.
    const kosong = { ...ctx(), bebanJPByLembaga: {}, jpDiajarByLembaga: {} }
    expect(barisBisyaroh(JENIS_BULANAN, kosong)).toEqual([])
  })

  it('lembaga baris diambil dari Beban Mengajar, bukan dari jabatan/ref', () => {
    // Kepala SDI yang juga mengajar di PKBM: tak punya ref PKBM sama sekali.
    const kepala = {
      ...ctx(),
      refs: [{ jabatan_di_sini: 'Kepala Lembaga', lembaga: 'SDI', group: 'sekolah' }],
      bebanJPByLembaga: { SDI: 30, PKBM: 22 },
      jpDiajarByLembaga: {
        SDI: { diajar: 120, terjadwal: 120 },
        PKBM: { diajar: 88, terjadwal: 88 }
      }
    }
    const pkbm = [
      jenis({
        id: 'pkbm',
        label: 'Bisyaroh Guru PKBM',
        hitungan: 'per_jp_bulanan',
        nominal: 25000,
        scope: { lembaga: ['PKBM'] }
      })
    ]
    const b = barisBisyaroh(pkbm, kepala)
    expect(b).toHaveLength(1)
    expect(b[0]).toMatchObject({ lembaga: 'PKBM', qty: 22, nominal: 550000 })
  })

  it('scope lembaga KOSONG -> satu baris per lembaga yang diajar, bukan cuma yang pertama', () => {
    const dua = {
      ...ctx(),
      bebanJPByLembaga: { SDI: 30, PKBM: 22 },
      jpDiajarByLembaga: {
        SDI: { diajar: 120, terjadwal: 120 },
        PKBM: { diajar: 44, terjadwal: 88 } // PKBM hadir separuh
      }
    }
    const semua = [
      jenis({
        id: 'sekolah',
        label: 'Bisyaroh Sekolah',
        hitungan: 'per_jp_bulanan',
        nominal: 20000
      })
    ]
    const b = barisBisyaroh(semua, dua)
    expect(b.map((x) => x.lembaga).sort()).toEqual(['PKBM', 'SDI'])
    expect(b.find((x) => x.lembaga === 'SDI').nominal).toBe(600000)
    expect(b.find((x) => x.lembaga === 'PKBM').nominal).toBe(220000) // 22 × 20.000 × 50%
  })

  it('scope jabatan tetap menyaring, tapi tak wajib seref dengan lembaganya', () => {
    const kepala = {
      ...ctx(),
      refs: [{ jabatan_di_sini: 'Kepala Lembaga', lembaga: 'SDI', group: 'sekolah' }],
      bebanJPByLembaga: { PKBM: 22 },
      jpDiajarByLembaga: { PKBM: { diajar: 88, terjadwal: 88 } }
    }
    const utkKepala = [
      jenis({
        id: 'k',
        label: 'X',
        hitungan: 'per_jp_bulanan',
        nominal: 25000,
        scope: { jabatan: ['Kepala Lembaga'] }
      })
    ]
    const utkGuru = [
      jenis({
        id: 'g',
        label: 'Y',
        hitungan: 'per_jp_bulanan',
        nominal: 25000,
        scope: { jabatan: ['Guru'] }
      })
    ]
    expect(barisBisyaroh(utkKepala, kepala)).toHaveLength(1)
    expect(barisBisyaroh(utkGuru, kepala)).toEqual([])
  })

  it('dibulatkan ke rupiah utuh — JP mingguan pun bisa pecahan sesudah prorata', () => {
    const b = barisBisyaroh(JENIS_BULANAN, ctx(101))[0] // 101/120 = 0,8417
    expect(Number.isInteger(b.nominal)).toBe(true)
    expect(b.nominal).toBe(Math.round(30 * 20000 * (101 / 120)))
  })

  it('masuk ember `sekolah` seperti per_jp — rekap pokok/sekolah tak berubah artinya', () => {
    expect(barisBisyaroh(JENIS_BULANAN, ctx())[0].kategori).toBe('sekolah')
  })

  it('cara hitung ini dikenali normalisasi (tak jatuh ke flat)', () => {
    expect(jenis({ label: 'X', hitungan: 'per_jp_bulanan' }).hitungan).toBe('per_jp_bulanan')
  })
})
