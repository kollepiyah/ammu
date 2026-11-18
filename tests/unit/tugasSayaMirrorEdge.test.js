// PAGAR ANTI-MENYIMPANG: `supabase/functions/widget-tugas/tugasSaya.ts` adalah cermin Deno
// dari `vue-app/src/utils/tugasSaya.js`. Keduanya menjawab hal yang sama: apa tugas seorang
// guru hari-hari ini.
//
// Yang .js dipakai kartu beranda dan widget saat app dibuka; yang .ts dipakai widget Android
// saat ia menarik sendiri secara berkala. Kalau menyimpang, widget bisa menampilkan daftar
// yang BERBEDA dari kartu beranda pada menit yang sama — tanpa ada yang menyadarinya.
//
// Berkas ini menjalankan kasus yang sama pada KEDUA implementasi dan menuntut hasil identik.
// CATATAN: aturan BARU wajib ditambahkan sebagai kasus eksplisit di bawah; sapuan tanggal
// hanya menjaga cabang yang ikut tersapu.
import { describe, it, expect } from 'vitest'
import * as js from '../../vue-app/src/utils/tugasSaya.js'
import * as ts from '../../supabase/functions/widget-tugas/tugasSaya.ts'
import { labelSesi as labelSesiApp } from '../../vue-app/src/utils/pondokLajuSesi.js'

const HARI_INI = '2026-11-16'

const jadwal = (tanggal, sesi, guruId, kelas = 'Juz 5') => ({
  id: `${tanggal}|${sesi}|${kelas}`,
  tanggal,
  sesi,
  guru_id: guruId,
  data: { kelas_key: kelas, kelas_guru: kelas }
})

const seremonial = (tanggal, penyimak, status = 'terjadwal', jam = '08:00') => ({
  id: 'c|' + tanggal + '|' + jam,
  tanggal,
  jam_mulai: jam,
  status,
  data: {
    judul: 'Seremonial Juz 10',
    tempat: 'Aula',
    peserta: [{ santri_id: 's1' }, { santri_id: 's2' }],
    penyimak_guru: penyimak.map((id) => ({ id }))
  }
})

/** Semua masukan yang dipakai kedua sisi — satu tempat supaya tak bisa beda diam-diam. */
const KASUS = {
  'guru tanpa tugas': { guruId: 'g1', hariIni: HARI_INI },

  'piket hari ini & besok, milik orang lain diabaikan': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [
      jadwal(HARI_INI, 'laju2', 'g1'),
      jadwal('2026-11-17', 'laju1', 'g1'),
      jadwal(HARI_INI, 'laju1', 'g9'),
      jadwal('2026-12-01', 'laju1', 'g1')
    ]
  },

  'capaian kemarin belum diisi': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [jadwal('2026-11-15', 'laju1', 'g1')],
    capaianLaju: []
  },

  'capaian kemarin sudah diisi': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [jadwal('2026-11-15', 'laju1', 'g1')],
    capaianLaju: [{ tanggal: '2026-11-15', sesi: 'laju1', guru_id: 'g1' }]
  },

  'capaian guru lain tak menutup tugas saya': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [jadwal('2026-11-15', 'laju1', 'g1')],
    capaianLaju: [{ tanggal: '2026-11-15', sesi: 'laju1', guru_id: 'g9' }]
  },

  'seremonial: penyimak, bukan penyimak, dan yang sudah selesai': {
    guruId: 'g1',
    hariIni: HARI_INI,
    seremonial: [
      seremonial(HARI_INI, ['g1', 'g2'], 'terjadwal', '13:00'),
      seremonial(HARI_INI, ['g1'], 'terjadwal', '07:00'),
      seremonial(HARI_INI, ['g7']),
      seremonial(HARI_INI, ['g1'], 'selesai')
    ]
  },

  'urutan: tanggal lalu jam lalu jenis': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [jadwal('2026-11-17', 'laju1', 'g1')],
    seremonial: [
      seremonial(HARI_INI, ['g1'], 'terjadwal', '13:00'),
      seremonial(HARI_INI, ['g1'], 'terjadwal', '07:00')
    ]
  },

  'penugasan tanpa tanggal diringkas satu baris': {
    guruId: 'g1',
    hariIni: HARI_INI,
    glondongan: [
      { penguji_id: 'g1', status: 'ditugaskan' },
      { penguji_id: 'g1', status: 'proses' },
      { penguji_id: 'g1', status: 'selesai' },
      { penguji_id: 'g9', status: 'ditugaskan' }
    ],
    tesSekolah: [{ penguji_id: 'g1', status: 'ditugaskan' }]
  },

  'input bulanan & izin PJ': {
    guruId: 'g1',
    hariIni: HARI_INI,
    inputBulananBelum: 3,
    izinMenunggu: [{ guru_id: 'g5' }, { guru_id: 'g6' }],
    sebagaiPj: true
  },

  'izin TANPA status PJ tak dihitung': {
    guruId: 'g1',
    hariIni: HARI_INI,
    izinMenunggu: [{ guru_id: 'g5' }],
    sebagaiPj: false
  },

  'horizon dilebarkan': {
    guruId: 'g1',
    hariIni: HARI_INI,
    horizonHari: 30,
    jadwalLaju: [jadwal('2026-12-01', 'laju1', 'g1')]
  },

  'tanggal tak terbaca tak membuat macet': {
    guruId: 'g1',
    hariIni: '16/11/2026',
    jadwalLaju: [jadwal(HARI_INI, 'laju1', 'g1')]
  },

  'sesi tak dikenal tetap berlabel apa adanya': {
    guruId: 'g1',
    hariIni: HARI_INI,
    jadwalLaju: [jadwal(HARI_INI, 'entah', 'g1')]
  },

  // 18 Nov 2026: app mengirim baris yang ekor jsonb-nya sudah diratakan (tanpa `data`).
  'seremonial berbentuk rata': {
    guruId: 'g1',
    hariIni: HARI_INI,
    seremonial: [
      (({ data, ...r }) => ({ ...r, ...data }))(seremonial(HARI_INI, ['g1'])),
      (({ data, ...r }) => ({ ...r, ...data }))(seremonial(HARI_INI, ['g9']))
    ]
  }
}

describe('cermin tugasSaya: app (.js) vs edge function (.ts)', () => {
  for (const [nama, opt] of Object.entries(KASUS)) {
    it(`identik — ${nama}`, () => {
      const a = js.susunTugasSaya(opt)
      const b = ts.susunTugasSaya(opt)
      expect(b).toEqual(a)
      expect(ts.ringkasUntukWidget(b, 12)).toEqual(js.ringkasUntukWidget(a, 12))
    })
  }

  // labelSesi disalin ke dalam cermin .ts (di app ia diimpor dari pondokLajuSesi), jadi
  // dibandingkan langsung ke sumber aslinya — bukan ke tugasSaya.js.
  it('label sesi sama dengan sumber aslinya di app', () => {
    for (const k of ['tadarus', 'laju1', 'laju2', 'entah', '']) {
      expect(ts.labelSesi(k)).toBe(labelSesiApp(k))
    }
  })

  it('metadata jenis tugas sama (warna & rute dipakai kedua sisi)', () => {
    expect(ts.JENIS_TUGAS).toEqual(js.JENIS_TUGAS)
    expect(ts.LABEL_PERLU).toBe(js.LABEL_PERLU)
    expect(ts.LABEL_TERJADWAL).toBe(js.LABEL_TERJADWAL)
  })

  it('sapuan tanggal: kelompokTanggal & geserHari identik sepanjang 60 hari', () => {
    for (let n = -30; n <= 30; n++) {
      const t = js.geserHari(HARI_INI, n)
      expect(ts.geserHari(HARI_INI, n)).toBe(t)
      expect(ts.kelompokTanggal(t, HARI_INI)).toBe(js.kelompokTanggal(t, HARI_INI))
    }
    for (const buruk of ['', 'bukan-tanggal', null]) {
      expect(ts.geserHari(buruk, 1)).toBe(js.geserHari(buruk, 1))
    }
  })
})
