// "Tugas Saya" (Kyai 16 Nov 2026) — kartu tugas guru di beranda + widget Android.
// Daftar ini dipakai tiga tampilan sekaligus, jadi aturannya diuji di sini SATU kali.
import { describe, it, expect } from 'vitest'
import {
  JENIS_TUGAS,
  LABEL_PERLU,
  geserHari,
  kelompokTanggal,
  susunTugasSaya,
  ringkasUntukWidget
} from '@/utils/tugasSaya'

const HARI_INI = '2026-11-16'

/** Baris pondok_laju_jadwal seperti yang datang dari Supabase. */
function jadwal(tanggal, sesi, guruId, kelas = 'Juz 5') {
  return {
    id: `${tanggal}|${sesi}|${kelas}`,
    tanggal,
    sesi,
    guru_id: guruId,
    periode: tanggal.slice(0, 7),
    data: { kelas_key: kelas, kelas_guru: kelas, guru_nama: 'Guru ' + guruId }
  }
}

describe('geserHari', () => {
  it('maju dan mundur melewati batas bulan', () => {
    expect(geserHari('2026-11-16', 1)).toBe('2026-11-17')
    expect(geserHari('2026-11-30', 1)).toBe('2026-12-01')
    expect(geserHari('2026-03-01', -1)).toBe('2026-02-28')
  })

  it('tanggal tak terbaca menghasilkan string kosong, bukan galat', () => {
    expect(geserHari('', 1)).toBe('')
    expect(geserHari('bukan-tanggal', 1)).toBe('')
    expect(geserHari(null, 1)).toBe('')
  })
})

describe('kelompokTanggal', () => {
  it('membedakan lewat / hari ini / besok / minggu ini / nanti', () => {
    expect(kelompokTanggal('2026-11-15', HARI_INI)).toBe('lewat')
    expect(kelompokTanggal('2026-11-16', HARI_INI)).toBe('hari_ini')
    expect(kelompokTanggal('2026-11-17', HARI_INI)).toBe('besok')
    expect(kelompokTanggal('2026-11-20', HARI_INI)).toBe('minggu_ini')
    expect(kelompokTanggal('2026-11-24', HARI_INI)).toBe('nanti')
  })

  it('hari ke-7 masih "minggu ini", hari ke-8 sudah "nanti"', () => {
    expect(kelompokTanggal('2026-11-23', HARI_INI)).toBe('minggu_ini')
    expect(kelompokTanggal('2026-11-24', HARI_INI)).toBe('nanti')
  })
})

describe('susunTugasSaya — keadaan kosong', () => {
  it('guru tanpa tugas menghasilkan daftar kosong, bukan galat', () => {
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI })
    expect(h.terjadwal).toEqual([])
    expect(h.perlu).toEqual([])
    expect(h.total).toBe(0)
  })

  it('tanpa guruId atau tanggal, tak ada yang disusun', () => {
    expect(
      susunTugasSaya({ hariIni: HARI_INI, jadwalLaju: [jadwal(HARI_INI, 'laju1', 'g1')] }).total
    ).toBe(0)
    expect(susunTugasSaya({ guruId: 'g1', hariIni: '16/11/2026' }).total).toBe(0)
  })
})

describe('susunTugasSaya — piket Pondok Laju', () => {
  const jadwalLaju = [
    jadwal(HARI_INI, 'laju2', 'g1'),
    jadwal('2026-11-17', 'laju1', 'g1'),
    jadwal('2026-11-16', 'laju1', 'g9'), // milik guru lain
    jadwal('2026-12-01', 'laju1', 'g1') // di luar horizon 7 hari
  ]

  it('hanya piket saya yang masuk, dan hanya sampai batas horizon', () => {
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, jadwalLaju, capaianLaju: [] })
    expect(h.terjadwal).toHaveLength(2)
    expect(h.terjadwal[0].kelompok).toBe('hari_ini')
    expect(h.terjadwal[0].judul).toBe('Piket Laju 2')
    expect(h.terjadwal[1].kelompok).toBe('besok')
    expect(h.terjadwal[1].judul).toBe('Piket Laju 1')
  })

  it('horizon bisa dilebarkan supaya piket bulan depan ikut tampil', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      horizonHari: 30,
      jadwalLaju,
      capaianLaju: []
    })
    expect(h.terjadwal).toHaveLength(3)
  })

  it('rute piket menunjuk layar Pondok Laju', () => {
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, jadwalLaju })
    expect(h.terjadwal[0].rute).toBe(JENIS_TUGAS.piket_laju.rute)
  })
})

describe('susunTugasSaya — capaian yang belum diisi', () => {
  const kemarin = '2026-11-15'
  const jadwalLaju = [jadwal(kemarin, 'laju1', 'g1')]

  it('piket kemarin tanpa capaian muncul di laci "perlu dikerjakan"', () => {
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, jadwalLaju, capaianLaju: [] })
    expect(h.terjadwal).toHaveLength(0)
    expect(h.perlu).toHaveLength(1)
    expect(h.perlu[0].jenis).toBe('capaian_laju')
    expect(h.perlu[0].judul).toBe('Capaian Laju 1 belum diisi')
  })

  it('satu baris capaian saja sudah menandai sesi itu beres', () => {
    const capaianLaju = [{ tanggal: kemarin, sesi: 'laju1', guru_id: 'g1', santri_id: 's1' }]
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, jadwalLaju, capaianLaju })
    expect(h.perlu).toHaveLength(0)
  })

  it('capaian guru lain tidak menutup tugas saya', () => {
    const capaianLaju = [{ tanggal: kemarin, sesi: 'laju1', guru_id: 'g9', santri_id: 's1' }]
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, jadwalLaju, capaianLaju })
    expect(h.perlu).toHaveLength(1)
  })

  it('piket yang sudah terlalu lama tidak diungkit lagi', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      jadwalLaju: [jadwal('2026-10-01', 'laju1', 'g1')],
      capaianLaju: []
    })
    expect(h.perlu).toHaveLength(0)
  })
})

describe('susunTugasSaya — seremonial PTPT', () => {
  function sesi(tanggal, penyimak, status = 'terjadwal') {
    return {
      id: 'c1',
      tanggal,
      jam_mulai: '08:00',
      status,
      data: {
        judul: 'Seremonial Juz 10',
        tempat: 'Aula',
        peserta: [{ santri_id: 's1' }, { santri_id: 's2' }],
        penyimak_guru: penyimak.map((id) => ({ id, nama: 'Guru ' + id }))
      }
    }
  }

  it('masuk hanya kalau saya terdaftar sebagai penyimak', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      seremonial: [sesi(HARI_INI, ['g1', 'g2']), sesi(HARI_INI, ['g7'])]
    })
    expect(h.terjadwal).toHaveLength(1)
    expect(h.terjadwal[0].jam).toBe('08:00')
    expect(h.terjadwal[0].detail).toBe('2 santri · Aula')
  })

  it('sesi yang sudah selesai tidak lagi jadi tugas', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      seremonial: [sesi(HARI_INI, ['g1'], 'selesai')]
    })
    expect(h.terjadwal).toHaveLength(0)
  })
})

describe('susunTugasSaya — penugasan tanpa tanggal diringkas satu baris', () => {
  it('tes glondongan dihitung, yang sudah selesai tidak', () => {
    const glondongan = [
      { penguji_id: 'g1', status: 'ditugaskan' },
      { penguji_id: 'g1', status: 'proses' },
      { penguji_id: 'g1', status: 'selesai' },
      { penguji_id: 'g9', status: 'ditugaskan' }
    ]
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, glondongan })
    expect(h.perlu).toHaveLength(1)
    expect(h.perlu[0].jumlah).toBe(2)
    expect(h.perlu[0].detail).toBe('2 blok belum dinilai')
  })

  it('tes sekolah diringkas terpisah dari glondongan', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      glondongan: [{ penguji_id: 'g1', status: 'ditugaskan' }],
      tesSekolah: [{ penguji_id: 'g1', status: 'ditugaskan' }]
    })
    expect(h.perlu.map((x) => x.jenis).sort()).toEqual(['glondongan', 'tes_sekolah'])
  })

  it('input bulanan yang belum dikerjakan ikut terhitung', () => {
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, inputBulananBelum: 3 })
    expect(h.perlu[0].detail).toBe('3 kelas belum diinput bulan ini')
    expect(susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, inputBulananBelum: 0 }).total).toBe(0)
  })

  it('izin orang lain hanya jadi tugas kalau saya PJ', () => {
    const izinMenunggu = [{ guru_id: 'g5' }, { guru_id: 'g6' }]
    expect(susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, izinMenunggu }).total).toBe(0)
    const h = susunTugasSaya({ guruId: 'g1', hariIni: HARI_INI, izinMenunggu, sebagaiPj: true })
    expect(h.perlu[0].detail).toBe('2 pengajuan')
  })
})

describe('susunTugasSaya — urutan', () => {
  it('terjadwal urut tanggal lalu jam', () => {
    const h = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      jadwalLaju: [jadwal('2026-11-17', 'laju1', 'g1')],
      seremonial: [
        {
          id: 'c1',
          tanggal: HARI_INI,
          jam_mulai: '13:00',
          status: 'terjadwal',
          data: { judul: 'Sore', penyimak_guru: [{ id: 'g1' }] }
        },
        {
          id: 'c2',
          tanggal: HARI_INI,
          jam_mulai: '07:00',
          status: 'terjadwal',
          data: { judul: 'Pagi', penyimak_guru: [{ id: 'g1' }] }
        }
      ]
    })
    expect(h.terjadwal.map((t) => t.judul)).toEqual(['Pagi', 'Sore', 'Piket Laju 1'])
  })
})

describe('ringkasUntukWidget', () => {
  it('memotong sesuai batas dan tetap membawa tanggal untuk disaring widget', () => {
    const hasil = susunTugasSaya({
      guruId: 'g1',
      hariIni: HARI_INI,
      jadwalLaju: [
        jadwal(HARI_INI, 'laju1', 'g1', 'A'),
        jadwal('2026-11-17', 'laju1', 'g1', 'B'),
        jadwal('2026-11-18', 'laju1', 'g1', 'C'),
        jadwal('2026-11-19', 'laju1', 'g1', 'D')
      ]
    })
    const ringkas = ringkasUntukWidget(hasil, 3)
    expect(ringkas).toHaveLength(3)
    expect(ringkas[0]).toEqual({ t: HARI_INI, j: '', h: 'Piket Laju 1', d: 'A' })
  })

  it('aman dipanggil dengan hasil kosong', () => {
    expect(ringkasUntukWidget(null)).toEqual([])
    expect(ringkasUntukWidget({ terjadwal: [], perlu: [] })).toEqual([])
  })
})

describe('kata yang dipakai di tampilan', () => {
  it('laci kedua TIDAK memakai kata "tunggakan" (permintaan Kyai)', () => {
    expect(LABEL_PERLU.toLowerCase()).not.toContain('tunggak')
    expect(LABEL_PERLU).toBe('Perlu Dikerjakan')
  })
})
