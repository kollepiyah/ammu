import { describe, it, expect } from 'vitest'
import {
  alasanTolakTanggal,
  deteksiTimpa,
  adaKeteranganTertimpa
} from '../../vue-app/src/utils/absenHarian.js'

const HARI_INI = '2026-08-06'

describe('alasanTolakTanggal', () => {
  it('hari ini selalu boleh, super admin atau bukan', () => {
    expect(alasanTolakTanggal(HARI_INI, HARI_INI, false)).toBeNull()
    expect(alasanTolakTanggal(HARI_INI, HARI_INI, true)).toBeNull()
  })

  it('tanggal lampau: super admin boleh, yang lain ditolak', () => {
    expect(alasanTolakTanggal('2026-08-01', HARI_INI, true)).toBeNull()
    expect(alasanTolakTanggal('2026-08-01', HARI_INI, false)).toMatch(/super admin/i)
  })

  it('masa depan ditolak untuk SIAPA PUN — absennya belum terjadi', () => {
    for (const boleh of [true, false]) {
      expect(alasanTolakTanggal('2026-08-07', HARI_INI, boleh)).toMatch(/belum terjadi/i)
    }
  })

  it('tanggal kosong/ngawur ditolak, tak diam-diam jatuh ke hari ini', () => {
    for (const buruk of ['', null, undefined, '2026-8-6', '06-08-2026', 'kemarin']) {
      expect(alasanTolakTanggal(buruk, HARI_INI, true)).toMatch(/belum dipilih/i)
    }
  })

  it('perbandingan leksikal aman lintas bulan & tahun', () => {
    expect(alasanTolakTanggal('2025-12-31', HARI_INI, true)).toBeNull()
    expect(alasanTolakTanggal('2026-09-01', HARI_INI, true)).toMatch(/belum terjadi/i)
    // 2026-08-10 > 2026-08-06 walau '10' < '6' secara angka satuan
    expect(alasanTolakTanggal('2026-08-10', HARI_INI, true)).toMatch(/belum terjadi/i)
  })
})

describe('deteksiTimpa', () => {
  const w = (id, nama, shift) => ({ id, guru_nama: nama, shift })

  it('kosong bila tak ada tabrakan id', () => {
    const writes = [w('shift_1_2026-08-01_sdi_pkbm', 'A', 'sdi_pkbm')]
    expect(deteksiTimpa(writes, [{ id: 'shift_9_2026-08-01_sdi_pkbm' }])).toEqual([])
    expect(deteksiTimpa(writes, [])).toEqual([])
    expect(deteksiTimpa(writes, null)).toEqual([])
  })

  it('melaporkan status & jam LAMA — itu yang akan hilang', () => {
    const writes = [w('shift_1_2026-08-01_sdi_pkbm', 'Bu A', 'sdi_pkbm')]
    const ada = [
      {
        id: 'shift_1_2026-08-01_sdi_pkbm',
        status: 'izin',
        source: 'pengajuan_guru',
        jam: '',
        guru_nama: 'Bu A'
      }
    ]
    expect(deteksiTimpa(writes, ada)).toEqual([
      {
        id: 'shift_1_2026-08-01_sdi_pkbm',
        nama: 'Bu A',
        shift: 'sdi_pkbm',
        statusLama: 'izin',
        sourceLama: 'pengajuan_guru',
        jamLama: ''
      }
    ])
  })

  it('baris tanpa id di DB diabaikan, tak bikin cocok palsu', () => {
    const writes = [w('shift_1_2026-08-01_pagi', 'A', 'pagi')]
    expect(deteksiTimpa(writes, [{ status: 'hadir' }, null])).toEqual([])
  })

  it('nama diambil dari baris lama bila yang baru kosong', () => {
    const writes = [{ id: 'x', shift: 'pagi', guru_nama: '' }]
    expect(deteksiTimpa(writes, [{ id: 'x', guru_nama: 'Dari DB', status: 'hadir' }])[0].nama).toBe(
      'Dari DB'
    )
  })
})

describe('adaKeteranganTertimpa', () => {
  it('true untuk izin / sakit / cuti (huruf besar-kecil bebas)', () => {
    for (const s of ['izin', 'SAKIT', 'Cuti']) {
      expect(adaKeteranganTertimpa([{ statusLama: s }])).toBe(true)
    }
  })

  it('false untuk hadir/terlambat/alpa — menimpanya tak menghapus keterangan', () => {
    expect(adaKeteranganTertimpa([{ statusLama: 'hadir' }, { statusLama: 'terlambat' }])).toBe(
      false
    )
    expect(adaKeteranganTertimpa([])).toBe(false)
    expect(adaKeteranganTertimpa(null)).toBe(false)
  })
})
