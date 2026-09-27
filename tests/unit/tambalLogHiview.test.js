// Mesin HiView diam sejak Kamis 24 Sep 2026 17:44 WIB (v.1.4.6 gelombang 3, 27 Sep 2026).
//
// Keluhan Kyai: "absen per tgl 25 terhitung alpa padahal gurunya sudah absen dan hadir".
// Aplikasinya benar — baris dari mesin HiView memang NOL sejak 25 Sep (75/70/60 baris per hari
// sebelumnya), karena tak satu kiriman pun sampai ke server. Dua hal dikunci di sini:
//   1. hari yang terlewat bisa ditambal dari berkas EKSPOR mesin, diproses dengan aturan yang
//      sama dengan kiriman langsung, dan hanya mengisi slot yang MASIH kosong;
//   2. mesin yang diam diperingatkan di layar — bukan ketahuan dua hari kemudian.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  kunciKolom,
  petakanKolom,
  bacaWaktu,
  tentukanUrutan,
  bacaCsv,
  objekDariCsv,
  scanDariBaris,
  samakanPin
} from '@/utils/logMesinHiview'
import {
  pisahWaktuScan,
  kelompokkanScan,
  saringScan,
  rencanaTambalScan,
  idBarisShift
} from '@/utils/scanMesin'
import { nilaiMesinDiam } from '@/utils/mesinDiam'
import { labelSumberAbsen } from '@/utils/absensiRekap'

const baca = (rel) => readFileSync(resolve(process.cwd(), rel), 'utf8')

// Shift berjam beda (bentuk shiftPulang.test.js); `sekolah` ikut hadir `pagi` (guru gabungan).
const SET = {
  shiftMaster: [
    {
      id: 'pagi',
      label: 'Pagi',
      untuk: 'guru',
      urutan: 1,
      mulai: '06:00',
      terlambat: '06:30',
      selesai: '12:00'
    },
    {
      id: 'sekolah',
      label: 'Sekolah',
      untuk: 'guru',
      urutan: 3,
      mulai: '06:30',
      terlambat: '07:00',
      selesai: '13:00',
      hadir_ikut: ['pagi']
    },
    {
      id: 'sore',
      label: 'Sore',
      untuk: 'guru',
      urutan: 4,
      mulai: '15:00',
      terlambat: '15:30',
      selesai: '17:00'
    }
  ]
}
const GURU = [
  { id: 'g1', nama: 'Ahmad', id_fingerprint: '14', shift_ids: ['pagi', 'sore'] },
  { id: 'g2', nama: 'Budi', id_fingerprint: '0059', shift_ids: ['pagi', 'sekolah'] },
  { id: 'g3', nama: 'Citra', id_fingerprint: '25', shift_ids: ['pagi'] },
  { id: 'g4', nama: 'Dewi', id_fingerprint: '13', shift_ids: ['pagi'] }
]
const scan = (pin, ts, nama = '') => ({ device_pin: pin, timestamp: ts, nama })

// ── Membaca berkas ekspor ──────────────────────────────────────────────────
describe('petakanKolom — judul kolom ekspor mesin', () => {
  it('ekspor berbahasa Inggris; "No." BUKAN PIN', () => {
    expect(petakanKolom(['No.', 'Employee ID', 'Name', 'Time', 'Event Types'])).toEqual({
      pin: 'Employee ID',
      waktu: 'Time',
      nama: 'Name',
      hasil: 'Event Types'
    })
  })

  it('ekspor berbahasa Indonesia dengan tanggal & jam terpisah', () => {
    expect(petakanKolom(['ID Karyawan', 'Nama', 'Tanggal', 'Jam'])).toEqual({
      pin: 'ID Karyawan',
      nama: 'Nama',
      tanggal: 'Tanggal',
      jam: 'Jam'
    })
  })

  it('"Date" + "Time": Time jadi jam saja, bukan tanggal', () => {
    const k = petakanKolom(['Person ID', 'Date', 'Time'])
    expect(k.pin).toBe('Person ID')
    expect(k.tanggal).toBe('Date')
    expect(k.waktu).toBe('Time')
  })

  it('laporan ringkas Check-In / Check-Out dikenali', () => {
    const k = petakanKolom(['Employee ID', 'Name', 'Date', 'Check-In', 'Check-Out'])
    expect(k).toMatchObject({ masuk: 'Check-In', pulang: 'Check-Out', tanggal: 'Date' })
    expect(kunciKolom(' Check-In ')).toBe('checkin')
  })
})

describe('bacaWaktu — bentuk tanggal/jam yang ditemui di ekspor', () => {
  const W = (tanggal, jam) => ({ tanggal, jam })

  it('ISO polos = jam mesin (WIB) apa adanya', () => {
    expect(bacaWaktu('2026-09-25 06:45:12')).toEqual(W('2026-09-25', '06:45:12'))
    expect(bacaWaktu('2026/09/25 06:45')).toEqual(W('2026-09-25', '06:45:00'))
    expect(bacaWaktu('2026-09-25T06:45:12+07:00')).toEqual(W('2026-09-25', '06:45:12'))
  })

  it('ISO ber-zona UTC dikonversi ke WIB — dini hari tak mundur ke kemarin', () => {
    expect(bacaWaktu('2026-09-24T23:45:00Z')).toEqual(W('2026-09-25', '06:45:00'))
    expect(bacaWaktu('2026-09-25T06:45:00+08:00')).toEqual(W('2026-09-25', '05:45:00'))
  })

  it('teks lokal DD/MM/YYYY, MM/DD/YYYY, AM/PM, dan nama bulan', () => {
    expect(bacaWaktu('25/09/2026 06:45:12')).toEqual(W('2026-09-25', '06:45:12'))
    expect(bacaWaktu('25-09-2026')).toEqual(W('2026-09-25', null))
    expect(bacaWaktu('09/25/2026 06:45 AM', 'MDY')).toEqual(W('2026-09-25', '06:45:00'))
    expect(bacaWaktu('09/25/2026 12:10 AM', 'MDY')).toEqual(W('2026-09-25', '00:10:00'))
    expect(bacaWaktu('09/25/2026 12:10 PM', 'MDY')).toEqual(W('2026-09-25', '12:10:00'))
    expect(bacaWaktu('25 Sep 2026 06:45')).toEqual(W('2026-09-25', '06:45:00'))
    expect(bacaWaktu('25 Agu 2026')).toEqual(W('2026-08-25', null))
    expect(bacaWaktu('06:45')).toEqual(W(null, '06:45:00'))
  })

  it('sel Excel: Date (komponen UTC = isi sel), nomor seri, dan pecahan jam', () => {
    expect(bacaWaktu(new Date(Date.UTC(2026, 8, 25, 6, 45, 12)))).toEqual(
      W('2026-09-25', '06:45:12')
    )
    // Sel JAM saja di ExcelJS jatuh pada 30 Des 1899.
    expect(bacaWaktu(new Date(Date.UTC(1899, 11, 30, 6, 45)))).toEqual(W(null, '06:45:00'))
    const seri = Date.UTC(2026, 8, 25, 6, 45) / 86400000 + 25569
    expect(bacaWaktu(seri)).toEqual(W('2026-09-25', '06:45:00'))
    expect(bacaWaktu(0.28125)).toEqual(W(null, '06:45:00'))
  })

  it('yang mustahil ditolak, bukan ditebak', () => {
    for (const v of ['31/09/2026 06:00', '2026-02-30 06:00', '25:61', 'abc', '', null])
      expect(bacaWaktu(v)).toBeNull()
  })
})

describe('tentukanUrutan — DD/MM atau MM/DD per berkas', () => {
  it('bukti hari > 12 → DMY pasti; bulan > 12 → MDY pasti', () => {
    expect(tentukanUrutan(['25/09/2026 06:00', '03/09/2026 07:00'])).toEqual({
      urutan: 'DMY',
      pasti: true
    })
    expect(tentukanUrutan(['09/25/2026 06:00'])).toEqual({ urutan: 'MDY', pasti: true })
  })
  it('tanpa bukti atau bertentangan → DMY, ditandai tak pasti', () => {
    expect(tentukanUrutan(['03/09/2026 07:00'])).toEqual({ urutan: 'DMY', pasti: false })
    expect(tentukanUrutan(['25/09/2026', '09/25/2026'])).toEqual({ urutan: 'DMY', pasti: false })
  })
})

describe('bacaCsv & objekDariCsv', () => {
  it('BOM, CRLF, pemisah titik koma, dan sel berkutip berkoma', () => {
    const teks = '﻿Employee ID;Name;Time\r\n14;"Ahmad, S.Pd";25/09/2026 06:12:00\r\n'
    expect(bacaCsv(teks)).toEqual([
      ['Employee ID', 'Name', 'Time'],
      ['14', 'Ahmad, S.Pd', '25/09/2026 06:12:00']
    ])
  })

  it('baris judul laporan di atas tabel dilewati', () => {
    const rows = bacaCsv('Attendance Record\nEmployee ID,Name,Time\n14,Ahmad,2026-09-25 06:12:00\n')
    expect(objekDariCsv(rows)).toEqual([
      { 'Employee ID': '14', Name: 'Ahmad', Time: '2026-09-25 06:12:00' }
    ])
  })
})

describe('scanDariBaris', () => {
  it('autentikasi gagal & baris tanpa PIN dilewati dan dihitung', () => {
    const b = scanDariBaris([
      { 'Employee ID': '14', Name: 'Ahmad', Time: '2026-09-25 06:12:00', 'Event Types': 'Face' },
      { 'Employee ID': '', Name: '', Time: '2026-09-25 06:13:00', 'Event Types': 'Stranger' },
      {
        'Employee ID': '13',
        Name: 'Dewi',
        Time: '2026-09-25 06:14:00',
        'Event Types': 'Face Authentication Failed'
      },
      { 'Employee ID': '25', Name: 'Citra', Time: 'kemarin', 'Event Types': 'Face' }
    ])
    expect(b.ok).toBe(true)
    expect(b.scans).toEqual([scan('14', '2026-09-25 06:12:00', 'Ahmad')])
    expect([b.tanpaPin, b.gagal, b.waktuRusak]).toEqual([1, 1, 1])
  })

  it('Tanggal + Jam terpisah digabung; Check-In/Check-Out jadi dua scan', () => {
    expect(scanDariBaris([{ PIN: '14', Tanggal: '25/09/2026', Jam: '06:12' }]).scans).toEqual([
      scan('14', '2026-09-25 06:12:00')
    ])
    const r = scanDariBaris([
      { 'Employee ID': '14', Date: '2026-09-25', 'Check-In': '06:12', 'Check-Out': '11:55' }
    ])
    expect(r.scans.map((s) => s.timestamp)).toEqual(['2026-09-25 06:12:00', '2026-09-25 11:55:00'])
  })

  it('kolom tak dikenali → ok:false dengan daftar judul yang ADA', () => {
    const b = scanDariBaris([{ Nomor: 1, Nama: 'Ahmad', Keterangan: 'x' }])
    expect(b.ok).toBe(false)
    expect(b.judul).toEqual(['Nomor', 'Nama', 'Keterangan'])
  })
})

describe('samakanPin — nol depan yang dibuang Excel', () => {
  it('"59" di berkas = "0059" di data guru', () => {
    expect(samakanPin([scan('59', '2026-09-25 06:45:00')], GURU)[0].device_pin).toBe('0059')
  })
  it('PIN persis tak diubah; tabrakan dua guru tak ditebak', () => {
    expect(samakanPin([scan('14', 't')], GURU)[0].device_pin).toBe('14')
    const bentrok = [
      { id: 'a', id_fingerprint: '059' },
      { id: 'b', id_fingerprint: '0059' }
    ]
    expect(samakanPin([scan('59', 't')], bentrok)[0].device_pin).toBe('59')
  })
})

// ── Aturan scan → baris (satu salinan untuk sinkron Revo & tambal HiView) ───
describe('kelompokkanScan', () => {
  it('scan terawal di window = masuk; sisanya kandidat pulang; luar window dicatat', () => {
    const k = kelompokkanScan(
      [
        scan('14', '2026-09-25 11:55:00'),
        scan('14', '2026-09-25 06:12:00'),
        scan('14', '2026-09-25 06:13:00'),
        scan('14', '2026-09-26 20:00:00'),
        scan('99', '2026-09-25 06:00:00')
      ],
      GURU,
      SET
    )
    expect(Object.keys(k.agg)).toEqual(['14|2026-09-25|pagi'])
    expect(k.agg['14|2026-09-25|pagi'].hhmm).toBe('06:12')
    expect(k.pulangScans['14|2026-09-25'].times.sort()).toEqual(['06:13', '11:55'])
    expect([...k.takKenal]).toEqual(['99'])
    expect(k.luar).toBe(1)
    expect(k.luarPer['14|2026-09-26'].times).toEqual(['20:00'])
  })

  it('pisahWaktuScan menolak timestamp rusak', () => {
    expect(pisahWaktuScan('2026-09-25 06:12:00')).toEqual({
      date: '2026-09-25',
      hhmm: '06:12',
      full: '2026-09-25 06:12:00'
    })
    expect(pisahWaktuScan('25/09/2026')).toBeNull()
  })
})

describe('saringScan', () => {
  it('rentang tanggal & tanggal sesudah hari ini disisihkan terpisah', () => {
    const r = saringScan(
      [
        scan('14', '2026-09-24 06:00:00'),
        scan('14', '2026-09-25 06:00:00'),
        scan('14', '2026-09-30 06:00:00')
      ],
      { dari: '2026-09-25', sampai: '2026-09-26', hariIni: '2026-09-27' }
    )
    expect(r.dipakai.map((s) => s.timestamp)).toEqual(['2026-09-25 06:00:00'])
    expect([r.luarRentang, r.masaDepan]).toEqual([1, 1])
  })
})

describe('rencanaTambalScan — hanya mengisi yang MASIH kosong', () => {
  // Hari yang ditambal sudah disentuh tangan: Citra CUTI lewat pengajuan, Dewi diperbaiki
  //   Kyai jadi HADIR (tanpa jam). Keduanya tak boleh ditimpa berkas.
  const ADA = [
    {
      id: 'shift_g3_2026-09-25_pagi',
      guru_id: 'g3',
      tanggal: '2026-09-25',
      shift: 'pagi',
      status: 'cuti',
      source: 'pengajuan_guru'
    },
    {
      id: 'shift_g4_2026-09-25_pagi',
      guru_id: 'g4',
      tanggal: '2026-09-25',
      shift: 'pagi',
      status: 'hadir',
      jam: '',
      source: 'manual_perbaikan'
    }
  ]
  const SCANS = samakanPin(
    [
      scan('14', '2026-09-25 06:12:00'),
      scan('14', '2026-09-25 11:55:00'),
      scan('14', '2026-09-25 15:40:00'),
      scan('14', '2026-09-25 17:05:00'),
      scan('59', '2026-09-25 06:45:00'),
      scan('25', '2026-09-25 06:10:00'),
      scan('25', '2026-09-25 12:10:00'),
      scan('13', '2026-09-25 06:05:00'),
      scan('13', '2026-09-25 12:00:00'),
      scan('99', '2026-09-25 06:30:00')
    ],
    GURU
  )
  const rencana = (ada) =>
    rencanaTambalScan({
      kelompok: kelompokkanScan(SCANS, GURU, SET),
      ada,
      guruAktif: GURU,
      settings: SET,
      sumber: 'hiview_impor',
      waktu: '2026-09-27T03:00:00.000Z'
    })

  it('baris baru: shift & status dari jam scan, jam pulang menempel, sumber hiview_impor', () => {
    const r = rencana(ADA)
    const baru = Object.fromEntries(r.baru.map((b) => [b.id, b]))
    expect(Object.keys(baru).sort()).toEqual([
      'shift_g1_2026-09-25_pagi',
      'shift_g1_2026-09-25_sore',
      'shift_g2_2026-09-25_pagi'
    ])
    expect(baru['shift_g1_2026-09-25_pagi']).toMatchObject({
      guru_id: 'g1',
      tanggal: '2026-09-25',
      periode: '2026-09',
      jam: '06:12',
      jam_pulang: '11:55',
      status: 'hadir',
      source: 'hiview_impor',
      imported_at: '2026-09-27T03:00:00.000Z'
    })
    // Pulang sore menempel ke sore, TIDAK ke pagi.
    expect(baru['shift_g1_2026-09-25_sore']).toMatchObject({
      jam: '15:40',
      status: 'terlambat',
      jam_pulang: '17:05'
    })
    // PIN "59" (nol depannya dibuang Excel) tetap sampai ke Budi.
    expect(baru['shift_g2_2026-09-25_pagi']).toMatchObject({ jam: '06:45', status: 'terlambat' })
  })

  it('cuti & perbaikan manual DIBIARKAN; jam pulang tetap ditempel ke baris hadir lama', () => {
    const r = rencana(ADA)
    expect(r.lewat.map((l) => [l.id, l.status, l.sumber])).toEqual([
      ['shift_g3_2026-09-25_pagi', 'cuti', 'pengajuan_guru'],
      ['shift_g4_2026-09-25_pagi', 'hadir', 'manual_perbaikan']
    ])
    // Cuti tak punya jam pulang; hadir manual tanpa jam menerima jam pulang dari mesin.
    expect(r.pulang).toEqual([
      {
        id: 'shift_g4_2026-09-25_pagi',
        nama: 'Dewi',
        tanggal: '2026-09-25',
        shift: 'pagi',
        jam_pulang: '12:00'
      }
    ])
  })

  it('guru gabungan: baris "hadir sekolah" ikut lahir dari baris pagi yang baru', () => {
    const r = rencana(ADA)
    expect(r.gabungan).toHaveLength(1)
    expect(r.gabungan[0]).toMatchObject({
      id: idBarisShift('g2', '2026-09-25', 'sekolah'),
      shift: 'sekolah',
      status: 'hadir',
      source: 'auto_gabungan'
    })
    expect(r.perTanggal['2026-09-25']).toEqual({ baru: 3, pulang: 1, gabungan: 1, lewat: 2 })
  })

  it('aman diulang: jalan kedua atas berkas yang sama tak menulis apa pun', () => {
    const r1 = rencana(ADA)
    const sesudah = [
      ...ADA.map((a) => (a.id === r1.pulang[0].id ? { ...a, jam_pulang: '12:00' } : a)),
      ...r1.baru,
      ...r1.gabungan
    ]
    const r2 = rencana(sesudah)
    expect([r2.baru.length, r2.gabungan.length, r2.pulang.length]).toEqual([0, 0, 0])
  })
})

// ── Peringatan mesin diam ──────────────────────────────────────────────────
describe('nilaiMesinDiam', () => {
  // Kiriman terakhir yang sesungguhnya: event "exception" 24 Sep 2026 17:44:31 WIB.
  const TERAKHIR = '2026-09-24T10:44:31.203+00:00'
  const dasar = { terakhir: TERAKHIR, hariKerja: true, jamMulai: '06:00' }

  it('Jumat 25 Sep pukul 09:00 → diam sejak Kamis 17:44', () => {
    expect(nilaiMesinDiam({ ...dasar, hariIni: '2026-09-25', jamKini: '09:00' })).toEqual({
      diam: true,
      sejakTanggal: '2026-09-24',
      sejakJam: '17:44',
      hari: 1
    })
  })

  it('belum lewat jam mulai + 2 jam tenggang → belum diperingatkan', () => {
    expect(nilaiMesinDiam({ ...dasar, hariIni: '2026-09-25', jamKini: '07:59' }).diam).toBe(false)
    expect(nilaiMesinDiam({ ...dasar, hariIni: '2026-09-25', jamKini: '08:00' }).diam).toBe(true)
  })

  it('Ahad / libur → tak diperingatkan (memang sepi)', () => {
    expect(
      nilaiMesinDiam({ ...dasar, hariKerja: false, hariIni: '2026-09-27', jamKini: '10:00' }).diam
    ).toBe(false)
  })

  it('ada kiriman hari ini → tidak diam; tengah malam UTC tak menggeser tanggal WIB', () => {
    const t = {
      ...dasar,
      terakhir: '2026-09-24T18:30:00Z',
      hariIni: '2026-09-25',
      jamKini: '10:00'
    }
    expect(nilaiMesinDiam(t)).toMatchObject({ diam: false, sejakTanggal: '2026-09-25' })
  })

  it('jejak kosong / tak terbaca → tak ada peringatan; jam mulai kosong → 07:00', () => {
    expect(
      nilaiMesinDiam({ ...dasar, terakhir: null, hariIni: '2026-09-25', jamKini: '10:00' })
    ).toEqual({ diam: false, sejakTanggal: '', sejakJam: '', hari: 0 })
    const tanpaJam = { ...dasar, jamMulai: '', hariIni: '2026-09-25' }
    expect(nilaiMesinDiam({ ...tanpaJam, jamKini: '08:59' }).diam).toBe(false)
    expect(nilaiMesinDiam({ ...tanpaJam, jamKini: '09:00' }).diam).toBe(true)
  })

  it('umur diam dihitung lintas bulan', () => {
    const r = nilaiMesinDiam({
      ...dasar,
      terakhir: '2026-08-31T09:00:00Z',
      hariIni: '2026-09-02',
      jamKini: '10:00'
    })
    expect(r).toMatchObject({ diam: true, sejakTanggal: '2026-08-31', hari: 2 })
  })
})

// ── Cermin ─────────────────────────────────────────────────────────────────
describe('cermin: satu aturan, dipasang di layar', () => {
  it('sinkron Revo memakai kelompokkanScan yang sama — tak lagi punya salinan sendiri', () => {
    const src = baca('vue-app/src/composables/useFingerprintSync.js')
    expect(src).toMatch(/kelompokkanScan\(scans, guru, settings\)/)
    expect(src).not.toMatch(/const agg = \{\}/)
    expect(src).toMatch(/export \{ hitungScanTanpaAbsen \}/)
  })

  it('tambal membaca ulang baris yang ada TEPAT sebelum menulis', () => {
    const src = baca('vue-app/src/components/absensi/TambalLogHiview.vue')
    const tulis = src.split('async function tulis()')[1] || ''
    expect(tulis.indexOf('await muatAda()')).toBeGreaterThan(-1)
    expect(tulis.indexOf('await muatAda()')).toBeLessThan(
      tulis.indexOf('susunRencana(new Date().toISOString())')
    )
    expect(src).toMatch(/const SUMBER = 'hiview_impor'/)
  })

  it('AbsensiGuruView: peringatan diam, denyut dari jejak, penambal di tab Impor', () => {
    const src = baca('vue-app/src/views/AbsensiGuruView.vue')
    expect(src).toMatch(/v-if="mesinDiam\.diam"/)
    expect(src).toMatch(/queryColl\('hiview_scan_log', \[\], \[\['created_at', 'desc'\]\], 1\)/)
    expect(src).toMatch(/<TambalLogHiview :guru="guruRaw"/)
    // Label sumber satu sumber: tab Riwayat & daftar "sudah terisi" di penambal.
    expect(src).toMatch(/const sourceLabel = labelSumberAbsen/)
    expect(baca('vue-app/src/components/absensi/TambalLogHiview.vue')).toMatch(
      /labelSumberAbsen\(l\.sumber\)/
    )
  })

  it('labelSumberAbsen: baris tambal terbaca "Impor HiView", sumber lain tak berubah', () => {
    expect(labelSumberAbsen('hiview_impor')).toBe('Impor HiView')
    expect(labelSumberAbsen('hiview')).toBe('HiView')
    expect(labelSumberAbsen('pengajuan_guru')).toBe('Izin/Pengajuan')
    expect(labelSumberAbsen('manual_perbaikan')).toBe('Perbaikan manual')
    expect(labelSumberAbsen('')).toBe('manual')
  })
})
