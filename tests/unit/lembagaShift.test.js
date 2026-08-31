// v.1.3.7 (Kyai, 31 Agu 2026): "guru yg ngajar sekolah dan ngaji, padahal sekolahnya
// libur, tapi ngajinya masuk. tapi guru itu di absensi bulanannya masih terhitung absen
// sekolahnya."
//
// Yang diuji di sini adalah jawaban atas pertanyaan "sel absensi (guru × shift) ini milik
// lembaga apa?", karena dari situlah libur dinilai. Tes terakhir menyusunnya kembali
// bersama liburScope — bentuk persis keluhan Kyai, supaya regresi ini tak bisa balik diam-diam.
import { describe, it, expect } from 'vitest'
import { lembagaKalenderShift, lembagaLabelShift } from '../../vue-app/src/utils/lembagaShift.js'
import { buildLiburScope, liburKenaLembaga } from '../../vue-app/src/utils/liburScope.js'

// Guru "dua kaki": ngaji di PTPT (shift pagi) + wali kelas SDI (shift sekolah).
const duaKaki = { lembaga: 'PTPT', lembaga_sekolah: 'SDI' }
// Sama, tapi kolom Lembaga Sekolah-nya belum diisi admin — kasus yang bikin alpa palsu.
const tanpaLembagaSekolah = { lembaga: 'PTPT', lembaga_sekolah: '' }

// settings dengan Master Shift eksplisit. `lembaga` = kolom "Khusus Lembaga".
const settingsMaster = (extra = []) => ({
  shiftMaster: [
    { id: 'pagi', label: 'Pagi', untuk: 'guru', urutan: 1, mulai: '06:00', selesai: '08:00' },
    { id: 'sekolah', label: 'Sekolah', untuk: 'guru', urutan: 3, mulai: '07:00', selesai: '12:00' },
    ...extra
  ]
})

describe('lembagaKalenderShift — lembaga yang kalendernya menentukan libur', () => {
  it('shift bawaan "sekolah" memakai Lembaga Sekolah guru', () => {
    expect(lembagaKalenderShift(duaKaki, 'sekolah', settingsMaster())).toBe('SDI')
  })

  it('shift ngaji memakai Lembaga (ngaji) guru', () => {
    expect(lembagaKalenderShift(duaKaki, 'pagi', settingsMaster())).toBe('PTPT')
  })

  it('shift sekolah TIDAK meminjam lembaga ngaji saat Lembaga Sekolah kosong', () => {
    // Inti bug: dulu di sini keluar 'PTPT', sehingga libur sekolah tak mengenainya
    // (→ alpa palsu) dan libur PTPT malah membebaskannya (→ alpa yang hilang).
    // Sekarang turun ke label kelompok: shift-nya jelas shift sekolah, cuma sekolah
    // MANA yang belum diketahui.
    expect(lembagaKalenderShift(tanpaLembagaSekolah, 'sekolah', settingsMaster())).toBe('Sekolah')
  })

  it('shift ngaji TIDAK meminjam lembaga sekolah saat Lembaga (ngaji) kosong', () => {
    const g = { lembaga: '', lembaga_sekolah: 'SDI' }
    expect(lembagaKalenderShift(g, 'pagi', settingsMaster())).toBe('')
  })

  it('shift buatan sendiri dikenali lewat kolom "Khusus Lembaga"', () => {
    const s = settingsMaster([
      { id: 'sdi_pagi', label: 'SDI Pagi', untuk: 'guru', urutan: 6, lembaga: ['SDI'] }
    ])
    // Tanpa aturan ini id 'sdi_pagi' bukan 'sekolah' → jatuh ke lembaga ngaji (PTPT).
    expect(lembagaKalenderShift(duaKaki, 'sdi_pagi', s)).toBe('SDI')
  })

  it('scope shift tunggal menentukan walau field lembaga guru kosong', () => {
    const s = settingsMaster([
      { id: 'sdi_pagi', label: 'SDI Pagi', untuk: 'guru', urutan: 6, lembaga: ['SDI'] }
    ])
    expect(lembagaKalenderShift(tanpaLembagaSekolah, 'sdi_pagi', s)).toBe('SDI')
  })

  it('scope shift lintas lembaga sekelompok → label kelompok, bukan menebak salah satu', () => {
    const s = settingsMaster([
      {
        id: 'sekolah_pagi',
        label: 'Sekolah Pagi',
        untuk: 'guru',
        urutan: 6,
        lembaga: ['SDI', 'TK']
      }
    ])
    expect(lembagaKalenderShift({ lembaga: 'PTPT' }, 'sekolah_pagi', s)).toBe('Sekolah')
  })

  it('scope shift lintas KELOMPOK (sekolah + ngaji) = diam, tak ada yang bisa disimpulkan', () => {
    const s = settingsMaster([
      { id: 'campur', label: 'Campur', untuk: 'guru', urutan: 6, lembaga: ['SDI', 'PTPT'] }
    ])
    expect(lembagaKalenderShift({ lembaga: 'PPPH' }, 'campur', s)).toBe('')
  })

  it('scope shift berlabel luas ("Sekolah") tetap mengembalikan lembaga SPESIFIK guru', () => {
    const s = settingsMaster([
      { id: 'jam_sekolah', label: 'Jam Sekolah', untuk: 'guru', urutan: 6, lembaga: ['Sekolah'] }
    ])
    // 'Sekolah' cuma label kelompok; event kalender bernama 'SDI' tak akan cocok dengannya.
    expect(lembagaKalenderShift(duaKaki, 'jam_sekolah', s)).toBe('SDI')
  })
})

describe('lembagaLabelShift — judul kelompok rekap (boleh menebak)', () => {
  it('memakai lembaga pasti bila ada', () => {
    expect(lembagaLabelShift(duaKaki, 'sekolah', settingsMaster())).toBe('SDI')
  })

  it('shift sekolah tanpa Lembaga Sekolah berjudul kelompoknya, bukan lembaga ngaji', () => {
    // Sebelum v.1.3.7 baris ini berjudul 'PTPT' — shift SEKOLAH yang duduk di bawah
    // judul lembaga ngaji. Sekarang jujur: "Sekolah", sekaligus jadi tanda buat Kyai
    // bahwa kolom Lembaga Sekolah guru itu masih kosong.
    expect(lembagaLabelShift(tanpaLembagaSekolah, 'sekolah', settingsMaster())).toBe('Sekolah')
  })

  it('kedua field kosong (shift ngaji) → penanda "(Tanpa Lembaga)"', () => {
    // Judul kosong akan membuang baris dari penyaring lembaga, jadi di sini menebak
    // masih boleh — hasilnya memang tak pernah dipakai menilai libur.
    expect(lembagaLabelShift({}, 'pagi', settingsMaster())).toBe('(Tanpa Lembaga)')
  })
})

describe('regresi Kyai 31 Agu 2026 — sekolah libur, ngaji masuk', () => {
  // Kalender: 1 hari libur ber-scope 'Sekolah' (persis contoh di form Kalender Kegiatan:
  // "Kosongkan = libur semua lembaga. Pilih mis. 'Sekolah' bila sekolah libur tapi ngaji
  // tetap masuk.")
  const liburMap = buildLiburScope([
    { tipe: 'libur', tgl_mulai: '2026-09-02', tgl_akhir: '2026-09-02', lembaga: ['Sekolah'] }
  ])
  const iso = '2026-09-02'

  it('shift sekolah libur, shift ngaji tetap hari kerja', () => {
    const s = settingsMaster()
    const lemSekolah = lembagaKalenderShift(duaKaki, 'sekolah', s)
    const lemNgaji = lembagaKalenderShift(duaKaki, 'pagi', s)
    expect(liburKenaLembaga(liburMap, iso, lemSekolah)).toBe(true) // tak dituntut hadir
    expect(liburKenaLembaga(liburMap, iso, lemNgaji)).toBe(false) // tetap wajib hadir
  })

  it('shift sekolah buatan sendiri ikut libur setelah "Khusus Lembaga" diisi', () => {
    const s = settingsMaster([
      { id: 'sdi_pagi', label: 'SDI Pagi', untuk: 'guru', urutan: 6, lembaga: ['SDI'] }
    ])
    expect(liburKenaLembaga(liburMap, iso, lembagaKalenderShift(duaKaki, 'sdi_pagi', s))).toBe(true)
  })

  it('guru yang kolom Lembaga Sekolah-nya kosong pun ikut libur "Sekolah"', () => {
    // Kasus paling mungkin di lapangan: shift bawaan 'sekolah', kolom Lembaga Sekolah
    // belum diisi admin. Dulu shift ini memakai 'PTPT' → tak kena libur → alpa palsu.
    const lem = lembagaKalenderShift(tanpaLembagaSekolah, 'sekolah', settingsMaster())
    expect(liburKenaLembaga(liburMap, iso, lem)).toBe(true)
    // …tapi libur yang ditandai khusus satu sekolah tetap TIDAK mengenainya: sekolah
    // mana yang diampu guru ini memang belum terdata, jadi tak boleh diklaim.
    const liburSdi = buildLiburScope([{ tipe: 'libur', tgl_mulai: iso, lembaga: ['SDI'] }])
    expect(liburKenaLembaga(liburSdi, iso, lem)).toBe(false)
  })

  it('libur tanpa scope tetap mengenai semua shift (kompatibel mundur)', () => {
    const semua = buildLiburScope([{ tipe: 'libur_nasional', tgl_mulai: iso, lembaga: [] }])
    const s = settingsMaster()
    for (const sh of ['pagi', 'sekolah']) {
      expect(liburKenaLembaga(semua, iso, lembagaKalenderShift(duaKaki, sh, s))).toBe(true)
    }
  })
})
