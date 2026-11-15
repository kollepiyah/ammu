// Pondok Laju tahap 5 (Kyai 15–16 Nov 2026): jadwal piket Laju, capaian bacaan bersambung
// Tadarus Pagi → Laju 1 → Laju 2, mushaf Usmani Indonesia, bisyaroh per sesi bila hadir.
import { describe, it, expect } from 'vitest'
import {
  SESI_PIKET,
  kelasPondokLaju,
  rentangHalamanJuz,
  juzDariHalaman,
  SURAH,
  jumlahAyat,
  namaSurah,
  validasiPosisi,
  teksPosisi,
  posisiSebelum,
  posisiTerakhirPerSantri,
  idJadwal,
  tanggalBulan,
  rencanaBergilir,
  bentrokJadwal,
  adminPondokLaju,
  bolehSusunJadwal,
  sesiLajuTerbayar
} from '@/utils/pondokLajuSesi'

describe('mushaf Usmani Indonesia', () => {
  it('juz 1 s/d hal. 21, juz 2 mulai hal. 22, juz 30 sampai 604', () => {
    expect(rentangHalamanJuz(1)).toEqual({ awal: 1, akhir: 21 })
    expect(rentangHalamanJuz(2)).toEqual({ awal: 22, akhir: 41 })
    expect(rentangHalamanJuz(5)).toEqual({ awal: 82, akhir: 101 })
    expect(rentangHalamanJuz(30)).toEqual({ awal: 582, akhir: 604 })
    expect(rentangHalamanJuz(31)).toBeNull()
  })
  it('juz dari halaman cocok bolak-balik di semua halaman', () => {
    for (let h = 1; h <= 604; h++) {
      const r = rentangHalamanJuz(juzDariHalaman(h))
      expect(h >= r.awal && h <= r.akhir).toBe(true)
    }
    expect(juzDariHalaman(605)).toBe(0)
  })
  it('114 surah, 6236 ayat', () => {
    expect(SURAH).toHaveLength(114)
    expect(SURAH.reduce((s, x) => s + x[1], 0)).toBe(6236)
    expect(namaSurah(36)).toBe('Yasin')
    expect(jumlahAyat(2)).toBe(286)
  })
  it('validasi posisi', () => {
    expect(validasiPosisi({ juz: 7, halaman: 130, surah: 5, ayat: 50 })).toEqual([])
    expect(validasiPosisi({ juz: 7, halaman: 130 })).toEqual([]) // surah/ayat boleh kosong
    expect(validasiPosisi({ juz: 7, halaman: 200 })).toEqual(['Halaman juz 7 adalah 122–141'])
    expect(validasiPosisi({ juz: 7, halaman: 130, surah: 108, ayat: 4 })).toEqual([
      'Ayat Al-Kausar 1–3'
    ])
    expect(validasiPosisi({ juz: 7, halaman: 130, ayat: 4 })).toEqual([
      'Pilih surah dulu sebelum ayat'
    ])
    expect(validasiPosisi({})).toHaveLength(2)
    expect(teksPosisi({ juz: 7, halaman: 130, surah: 5, ayat: 50 })).toBe(
      'Juz 7 · hal. 130 · Al-Maidah 50'
    )
  })
})

describe('kelas Pondok Laju & rantai posisi', () => {
  const s = (id, nama, guru, juz, laju = true) => ({
    id,
    nama,
    guru_pagi: guru,
    juz,
    is_pondok_laju: laju
  })
  it('kelas = guru kelas; juz terbanyak; santri non-Laju tak ikut', () => {
    const k = kelasPondokLaju([
      s(1, 'Bima', 'Ust. A', 'Juz 7'),
      s(2, 'Ahmad', 'Ust. A', 'Juz 7'),
      s(3, 'Cici', 'Ust. A', 'Juz 8'),
      s(4, 'Dodi', 'Ust. B', 'Juz 2'),
      s(5, 'Eka', 'Ust. A', 'Juz 7', false)
    ])
    expect(k.map((x) => [x.guru, x.juz, x.santri.map((y) => y.nama)])).toEqual([
      ['Ust. A', '7', ['Ahmad', 'Bima', 'Cici']],
      ['Ust. B', '2', ['Dodi']]
    ])
  })
  it('Tadarus Pagi → Laju 1 → Laju 2 → esok hari bersambung', () => {
    const rows = [
      { santri_id: 's1', tanggal: '2026-11-16', sesi: 'laju2', halaman: 120 },
      { santri_id: 's1', tanggal: '2026-11-17', sesi: 'tadarus', halaman: 122 },
      { santri_id: 's1', tanggal: '2026-11-17', sesi: 'laju1', halaman: 124 },
      { santri_id: 's2', tanggal: '2026-11-17', sesi: 'laju2', halaman: 50 }
    ]
    expect(posisiSebelum(rows, 's1', '2026-11-17', 'tadarus').halaman).toBe(120)
    expect(posisiSebelum(rows, 's1', '2026-11-17', 'laju1').halaman).toBe(122)
    expect(posisiSebelum(rows, 's1', '2026-11-17', 'laju2').halaman).toBe(124)
    expect(posisiSebelum(rows, 's1', '2026-11-16', 'laju2')).toBeNull()
    expect(posisiTerakhirPerSantri(rows).get('s1').halaman).toBe(124)
  })
})

describe('jadwal piket bergilir', () => {
  it('tanggal sebulan tanpa Ahad', () => {
    const t = tanggalBulan('2026-11')
    expect(t).toHaveLength(25) // 30 hari − 5 Ahad
    expect(t).not.toContain('2026-11-01') // Ahad
    expect(t[0]).toBe('2026-11-02')
  })
  it('bergilir: tak ada guru dobel dalam satu sesi bila guru ≥ kelas, giliran merata', () => {
    const r = rencanaBergilir({
      tanggal: ['2026-11-02', '2026-11-03'],
      kelas: ['k1', 'k2'],
      guru: ['g1', 'g2', 'g3']
    })
    expect(r).toHaveLength(2 * SESI_PIKET.length * 2)
    expect(bentrokJadwal(r)).toEqual([])
    const hitung = {}
    for (const x of r) hitung[x.guru_id] = (hitung[x.guru_id] || 0) + 1
    expect(Object.values(hitung).sort()).toEqual([2, 3, 3])
    expect(r[0]).toEqual({ tanggal: '2026-11-02', sesi: 'laju1', kelas_key: 'k1', guru_id: 'g1' })
  })
  it('bentrok terdeteksi; id jadwal aman', () => {
    expect(
      bentrokJadwal([
        { tanggal: 't', sesi: 'laju1', guru_id: 'g1' },
        { tanggal: 't', sesi: 'laju1', guru_id: 'g1' },
        { tanggal: 't', sesi: 'laju2', guru_id: 'g1' }
      ])
    ).toEqual([{ tanggal: 't', sesi: 'laju1', guru_id: 'g1', kelas: 2 }])
    expect(idJadwal('2026-11-17', 'laju1', 'ust. siti ma’rifatin, s.pd.')).toBe(
      '2026-11-17_laju1_ust-siti-ma-rifatin-s-pd'
    )
  })
  it('peran penyusun: admin, PJ PTPT, Admin Pondok Laju; guru lain tidak', () => {
    const L = [{ lembaga: 'PTPT', admin_pondok_laju: ['g9', 9] }]
    expect(adminPondokLaju(L)).toEqual(['g9', '9'])
    expect(bolehSusunJadwal({ id: 'x', role_sistem: 'admin' }, L)).toBe(true)
    expect(bolehSusunJadwal({ id: 'g9', role_sistem: 'user' }, L)).toBe(true)
    expect(
      bolehSusunJadwal({ id: 'p', jabatan: 'PJ PTPT', lembaga: 'PTPT', role_sistem: 'user' }, L)
    ).toBe(true)
    expect(bolehSusunJadwal({ id: 'g2', jabatan: 'Guru', lembaga: 'PTPT' }, L)).toBe(false)
  })
})

describe('bisyaroh piket per sesi — hanya bila hadir di shift Pondok Laju', () => {
  const jadwal = [
    { guru_id: 'g1', tanggal: '2026-11-02', sesi: 'laju1' },
    { guru_id: 'g1', tanggal: '2026-11-02', sesi: 'laju2' },
    { guru_id: 'g1', tanggal: '2026-11-03', sesi: 'laju1' },
    { guru_id: 'g1', tanggal: '2026-11-04', sesi: 'laju2' },
    { guru_id: 'g2', tanggal: '2026-11-02', sesi: 'laju1' }
  ]
  const absensi = [
    { guru_id: 'g1', tanggal: '2026-11-02', shift: 'laju_1', status: 'hadir' },
    { guru_id: 'g1', tanggal: '2026-11-02', shift: 'laju_2', status: 'terlambat' },
    { guru_id: 'g1', tanggal: '2026-11-03', shift: 'pagi', status: 'hadir' }, // bukan shift Laju
    { guru_id: 'g1', tanggal: '2026-11-04', shift: 'laju_2', status: 'izin' }
  ]
  it('dibayar = min(terjadwal, shift Laju yang dihadiri) per tanggal', () => {
    const r = sesiLajuTerbayar({ jadwal, absensi, guruId: 'g1', shiftIds: ['laju_1', 'LAJU_2'] })
    expect([r.terjadwal, r.dibayar]).toEqual([4, 2])
    expect(r.rincian.map((x) => [x.tanggal, x.dibayar])).toEqual([
      ['2026-11-02', 2],
      ['2026-11-03', 0],
      ['2026-11-04', 0]
    ])
  })
  it('tanpa shift terpilih tak ada yang dibayar; periode menyaring', () => {
    expect(sesiLajuTerbayar({ jadwal, absensi, guruId: 'g1' }).dibayar).toBe(0)
    const r = sesiLajuTerbayar({
      jadwal,
      absensi,
      guruId: 'g1',
      shiftIds: ['laju_1', 'laju_2'],
      dalamPeriode: (t) => t >= '2026-11-03'
    })
    expect([r.terjadwal, r.dibayar]).toEqual([2, 0])
  })
})

describe('Jenis Bisyaroh × sesi Pondok Laju → baris slip', () => {
  it('terbit hanya bila ada sesi dibayar; jabatan/lembaga tak menyaring; scope.shift diteruskan', async () => {
    const { barisBisyaroh, normalizeJenisBisyaroh } = await import('@/utils/bisyarohScope')
    const j = normalizeJenisBisyaroh({
      id: 'piket_laju',
      label: 'Piket Pondok Laju',
      hitungan: 'per_sesi_laju',
      nominal: 15000,
      scope: { shift: ['laju_1', 'laju_2'], lembaga: ['PTPT'] }
    })
    expect(j.hitungan).toBe('per_sesi_laju')
    let diminta = null
    const ctx = {
      guruId: 'g7',
      refs: [{ lembaga: 'TPQ', jabatan_di_sini: 'Guru' }], // guru TPQ tetap dapat piket
      sesiLaju: (ids) => {
        diminta = ids
        return 3
      }
    }
    expect(barisBisyaroh([j], ctx)).toEqual([
      {
        jenis_id: 'piket_laju',
        kategori: 'tambahan',
        lembaga: 'Pondok Laju',
        label: 'Piket Pondok Laju',
        hitungan: 'per_sesi_laju',
        qty: 3,
        tarif: 15000,
        nominal: 45000
      }
    ])
    expect(diminta).toEqual(['laju_1', 'laju_2'])
    expect(barisBisyaroh([j], { ...ctx, sesiLaju: () => 0 })).toEqual([])
    expect(barisBisyaroh([j], { ...ctx, sesiLaju: undefined })).toEqual([])
  })
})

describe('Kyai 16 Nov: guru shift sekolah SD–PKBM tak dibayar Laju 1', () => {
  // Bentuk Master Shift produksi: id sudah dinamai ulang, yang menentukan kolom Khusus Lembaga.
  const daftar = [
    { id: 'sore', lembaga: ['PTPT', 'PPPH'] },
    { id: 'tk', lembaga: ['TK'] },
    { id: 'sdi_pkbm', lembaga: ['SDI', 'PKBM'] },
    { id: 'kelas_baca', lembaga: ['Kelas Baca'] },
    { id: 'khusus_pkbm', lembaga: [' pkbm '] }
  ]
  it('dikenali dari lembaga shift, bukan id; TK & Kelas Baca tidak termasuk', async () => {
    const { sesiTakDibayarGuru } = await import('@/utils/pondokLajuSesi')
    expect(sesiTakDibayarGuru(new Set(['sore', 'sdi_pkbm']), daftar)).toEqual(['laju1'])
    expect(sesiTakDibayarGuru(['khusus_pkbm'], daftar)).toEqual(['laju1'])
    expect(sesiTakDibayarGuru(['sore', 'tk', 'kelas_baca'], daftar)).toEqual([])
    expect(sesiTakDibayarGuru([], daftar)).toEqual([])
  })
  it('Laju 1 tetap terjadwal tapi tak dibayar; Laju 2 tetap dibayar', () => {
    const jadwal = [
      { guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju1' },
      { guru_id: 'g1', tanggal: '2026-11-17', sesi: 'laju2' },
      { guru_id: 'g1', tanggal: '2026-11-18', sesi: 'laju1' }
    ]
    const absensi = [
      { guru_id: 'g1', tanggal: '2026-11-17', shift: 'laju_1', status: 'hadir' },
      { guru_id: 'g1', tanggal: '2026-11-17', shift: 'laju_2', status: 'hadir' },
      { guru_id: 'g1', tanggal: '2026-11-18', shift: 'laju_1', status: 'hadir' }
    ]
    const dasar = { jadwal, absensi, guruId: 'g1', shiftIds: ['laju_1', 'laju_2'] }
    const biasa = sesiLajuTerbayar(dasar)
    const sekolah = sesiLajuTerbayar({ ...dasar, sesiTakDibayar: ['laju1'] })
    expect([biasa.terjadwal, biasa.berbayar, biasa.dibayar]).toEqual([3, 3, 3])
    expect([sekolah.terjadwal, sekolah.berbayar, sekolah.dibayar]).toEqual([3, 1, 1])
  })
})
