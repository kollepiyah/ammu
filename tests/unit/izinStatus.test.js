import { describe, it, expect } from 'vitest'
import {
  statusIzin,
  labelStatusIzin,
  kelasStatusIzin,
  rekapIzinPerOrang,
  tahunIzinTersedia
} from '@/utils/izinStatus'

// KELUHAN NYATA (Kyai, 10 Sep 2026), tiga hal:
//  1. Pengajuan yang DIBATALKAN SENDIRI oleh gurunya berlabel merah "Ditolak".
//  2. Riwayat perizinan tak bisa dilihat per orang, dan lampirannya hilang dari layar
//     begitu pengajuannya diputus.
//  3. Satu baris tersangkut selamanya di panel "Sudah disetujui, absensinya belum terisi".
// Berkas ini mengunci (1) dan (2); (3) hidup di PersonalView (penyaring tgl_terap_ulang).

describe('statusIzin — batal ≠ tolak', () => {
  it('status baru "dibatalkan" terbaca apa adanya', () => {
    expect(statusIzin({ status: 'dibatalkan' })).toBe('dibatalkan')
    expect(labelStatusIzin({ status: 'dibatalkan' })).toBe('Dibatalkan')
  })

  it('baris LAMA (ditolak + catatan "Dibatalkan pengaju") tetap terbaca Dibatalkan', () => {
    // Tanpa ini, semua pengajuan yang ditarik sendiri sebelum v.1.4.2 akan terus
    // menuduh atasan menolak — dan memperbaikinya butuh migrasi data.
    const lama = { status: 'ditolak', catatan_putus: 'Dibatalkan pengaju' }
    expect(statusIzin(lama)).toBe('dibatalkan')
    expect(labelStatusIzin(lama)).toBe('Dibatalkan')
  })

  it('penolakan sungguhan TIDAK ikut jadi "dibatalkan"', () => {
    const tolak = { status: 'ditolak', catatan_putus: 'Sedang banyak kegiatan' }
    expect(statusIzin(tolak)).toBe('ditolak')
    expect(labelStatusIzin(tolak)).toBe('Ditolak')
    expect(statusIzin({ status: 'ditolak' })).toBe('ditolak')
  })

  it('dibatalkan berwarna netral, bukan merah seperti ditolak', () => {
    expect(kelasStatusIzin({ status: 'dibatalkan' })).not.toBe(
      kelasStatusIzin({ status: 'ditolak' })
    )
    expect(kelasStatusIzin({ status: 'dibatalkan' })).toContain('slate')
  })

  it('status kosong / tak dikenal jatuh ke "diajukan" (Menunggu)', () => {
    expect(labelStatusIzin({})).toBe('Menunggu')
    expect(labelStatusIzin({ status: 'entah' })).toBe('Menunggu')
    expect(labelStatusIzin(null)).toBe('Menunggu')
  })
})

const HARI = (a) => {
  const s = String(a.tgl_mulai || '')
  const e = String(a.tgl_selesai || s)
  if (!s) return 1
  return Math.round((Date.parse(e) - Date.parse(s)) / 86400000) + 1
}

const DATA = [
  {
    id: '1',
    guru_id: 'g1',
    guru_nama: 'Ardyah Savira Putri',
    lembaga: 'SDI',
    jenis: 'izin',
    status: 'disetujui',
    tgl_mulai: '2026-07-24',
    tgl_selesai: '2026-07-24',
    lampiran_url: 'https://x/surat.pdf'
  },
  {
    id: '2',
    guru_id: 'g1',
    guru_nama: 'Ardyah Savira Putri',
    lembaga: 'SDI',
    jenis: 'sakit',
    status: 'disetujui',
    tgl_mulai: '2026-08-03',
    tgl_selesai: '2026-08-05'
  },
  {
    id: '3',
    guru_id: 'g1',
    guru_nama: 'Ardyah Savira Putri',
    jenis: 'izin',
    status: 'ditolak',
    tgl_mulai: '2026-08-07',
    tgl_selesai: '2026-08-07'
  },
  {
    id: '4',
    guru_id: 'g2',
    guru_nama: 'Rahman Fanani',
    lembaga: 'PTPT',
    jenis: 'cuti',
    kategori: 'k1',
    status: 'diajukan',
    tgl_mulai: '2026-09-01',
    tgl_selesai: '2026-09-02'
  },
  {
    id: '5',
    guru_id: 'g2',
    guru_nama: 'Rahman Fanani',
    jenis: 'izin',
    status: 'dibatalkan',
    tgl_mulai: '2025-12-30',
    tgl_selesai: '2025-12-30'
  }
]

describe('rekapIzinPerOrang', () => {
  it('mengelompokkan per guru_id dan menghitung jenis + hari', () => {
    const r = rekapIzinPerOrang(DATA, { hitungHari: HARI })
    expect(r).toHaveLength(2)
    // Yang punya pengajuan MENUNGGU naik ke atas — itu yang perlu ditindak.
    expect(r[0].nama).toBe('Rahman Fanani')
    expect(r[0].menunggu).toBe(1)

    const ardyah = r.find((g) => g.id === 'g1')
    expect(ardyah.total).toBe(3)
    expect(ardyah.n).toEqual({ izin: 2, sakit: 1, cuti: 0 })
    // Hari HANYA dari yang disetujui: 1 (izin) + 3 (sakit 3–5 Agu). Yang ditolak nol.
    expect(ardyah.hari).toEqual({ izin: 1, sakit: 3, cuti: 0 })
    expect(ardyah.totalHari).toBe(4)
    expect(ardyah.lembaga).toBe('SDI')
  })

  it('menghitung berapa pengajuan yang punya lampiran (bisa dibuka ulang)', () => {
    const ardyah = rekapIzinPerOrang(DATA, { hitungHari: HARI }).find((g) => g.id === 'g1')
    expect(ardyah.lampiran).toBe(1)
    expect(ardyah.items.find((a) => a.id === '1').lampiran_url).toBe('https://x/surat.pdf')
  })

  it('pengajuan yang MENUNGGU ikut masuk rekap orangnya', () => {
    const rahman = rekapIzinPerOrang(DATA, { hitungHari: HARI }).find((g) => g.id === 'g2')
    expect(rahman.items.map((a) => a.id).sort()).toEqual(['4', '5'])
    expect(rahman.totalHari).toBe(0) // belum ada yang disetujui
  })

  it('item terbaru di urutan atas', () => {
    const ardyah = rekapIzinPerOrang(DATA, { hitungHari: HARI }).find((g) => g.id === 'g1')
    expect(ardyah.items.map((a) => a.tgl_mulai)).toEqual(['2026-08-07', '2026-08-03', '2026-07-24'])
  })

  it('penyaring tahun memakai tgl_mulai', () => {
    const r = rekapIzinPerOrang(DATA, { tahun: '2025', hitungHari: HARI })
    expect(r).toHaveLength(1)
    expect(r[0].items).toHaveLength(1)
    expect(r[0].items[0].id).toBe('5')
  })

  it('pencarian nama tak peduli besar-kecil huruf', () => {
    const r = rekapIzinPerOrang(DATA, { cari: 'SAVIRA', hitungHari: HARI })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('g1')
  })

  it('baris tanpa guru_id dikelompokkan lewat nama, bukan dilebur jadi satu', () => {
    const r = rekapIzinPerOrang(
      [
        {
          id: 'a',
          guru_nama: 'Tanpa Id A',
          jenis: 'izin',
          status: 'disetujui',
          tgl_mulai: '2026-01-01'
        },
        {
          id: 'b',
          guru_nama: 'Tanpa Id B',
          jenis: 'izin',
          status: 'disetujui',
          tgl_mulai: '2026-01-02'
        }
      ],
      { hitungHari: HARI }
    )
    expect(r).toHaveLength(2)
  })

  it('masukan kosong / bukan array tidak melempar', () => {
    expect(rekapIzinPerOrang(null)).toEqual([])
    expect(rekapIzinPerOrang([])).toEqual([])
  })
})

describe('tahunIzinTersedia', () => {
  it('unik, terbaru dulu, abaikan tanggal rusak', () => {
    expect(tahunIzinTersedia([...DATA, { tgl_mulai: '' }, { tgl_mulai: 'xx' }])).toEqual([
      '2026',
      '2025'
    ])
  })
})
