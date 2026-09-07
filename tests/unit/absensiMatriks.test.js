// Kyai (3 Sep 2026): "akses edit rekap absen bulanan guru terasa lambat ketika saya edit
// manual." Perbaikannya memindahkan perakitan sel matriks dari empat fungsi di dalam
// template ke satu turunan sekali-jalan (utils/absensiMatriks).
//
// Yang WAJIB dijaga tes ini, berurut dari yang paling mahal bila jebol:
//   1. HURUF, WARNA, dan KOLOM REKAP tak boleh berselisih. Dulu masing-masing memutuskan
//      sendiri "libur?/bukan jadwal?/sudah lewat?" — tiga salinan aturan yang sama. Kalau
//      salah satu bergeser, sel bisa bertulis 'H' sementara kolom A ikut bertambah, dan
//      tak ada yang tahu sampai ada guru protes slipnya.
//   2. Sel KOSONG di luar jadwal mengajar = '·', bukan 'A' (v.1.3.8). Kalau jebol, guru
//      paruh-waktu kembali dituduh alpa ±12 kali sebulan.
//   3. Baris 'alpa' yang DITANDAI MANUSIA di hari di luar jadwal tetap terhitung — itu
//      penilaian Kyai, bukan simpulan sistem dari sel kosong.
//   4. Hari libur mengalahkan segalanya, dan sel libur TIDAK bisa diperbaiki (menulis
//      baris di sana tak akan mengubah tampilannya).
import { describe, it, expect } from 'vitest'
import { bangunSel, bangunMatriksBulanan } from '@/utils/absensiMatriks'

const HARI_INI = '2026-09-20'

// Guru tunggal, shift 'pagi', September 2026 (30 hari).
// Ahad jatuh di 6, 13, 20, 27. Guru B hanya masuk Senin/Rabu/Jumat.
const guruA = { id: 'gA', nama: 'Guru A', lembaga: 'PTPT' }
const guruB = { id: 'gB', nama: 'Guru B', lembaga: 'PTPT' }

function isoOf(d) {
  return `2026-09-${String(d).padStart(2, '0')}`
}
function dow(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

/** Rakit matriks dengan penyuntik sederhana. `absen` = { 'gId_shift_d': row }. */
function matriks({ baris, absen = {}, liburIso = [], jadwal = {} }) {
  const dipanggil = { lembagaOf: 0, liburOf: 0 }
  const rows = bangunMatriksBulanan({
    baris,
    hari: 30,
    hariIni: HARI_INI,
    isoOf,
    absenOf: (gid, shift, d) => absen[`${gid}_${shift}_${d}`] || null,
    lembagaOf: (g) => {
      dipanggil.lembagaOf++
      return g.lembaga
    },
    liburOf: (iso) => {
      dipanggil.liburOf++
      return dow(iso) === 0 || liburIso.includes(iso)
    },
    masukOf: (g, shift, iso) => {
      const h = jadwal[g.id]
      return h ? h.includes(dow(iso)) : true
    },
    labelShiftOf: (s) => (s === 'pagi' ? 'Pagi' : 'Sekolah')
  })
  return { rows, dipanggil }
}

const BARIS_A = [{ g: guruA, shift: 'pagi', isFirst: true, span: 1 }]

describe('bangunSel — libur mengalahkan segalanya', () => {
  it('libur = huruf L dan TIDAK bisa diperbaiki, walau ada barisnya', () => {
    const s = bangunSel({
      d: 6,
      iso: '2026-09-06',
      absen: { status: 'hadir', jam: '07:00' },
      libur: true,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('L')
    expect(s.judul).toBe('2026-09-06 — Libur')
    expect(s.bisaPerbaiki).toBe(false)
    expect(s.pulangPending).toBe(false)
  })

  // SATU-SATUNYA perilaku yang berubah di v.1.4.0, dan diubah dengan sengaja.
  //
  // Kode lama menilai penanda "belum absen pulang" TERPISAH dari selnya: `pulangPending`
  // tak pernah menengok libur, jadi titik oranye itu tetap muncul di sel yang bertulis
  // 'L' dan bertooltip "Libur" — penanda yang membantah sel yang ditempelinya. Dibandingkan
  // sel demi sel pada 6.300 sel, inilah satu-satunya selisih antara kode lama dan baru
  // (teks, warna, tooltip, dan kolom H/T/I-S-C/A: nol beda).
  //
  // Sekarang penanda itu mengikuti selnya. Tak ada keterangan yang hilang: baris di hari
  // libur memang sudah tak tampil di matriks sejak v.1.2.3 — hurufnya 'L', tooltipnya
  // "Libur" — jadi titik itu menggantung tanpa konteks apa pun.
  it('penanda belum pulang TIDAK muncul di sel libur (perubahan sengaja v.1.4.0)', () => {
    const s = bangunSel({
      d: 6,
      iso: '2026-09-06',
      absen: { status: 'hadir', jam: '07:00', jam_pulang: '' },
      libur: true,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('L')
    expect(s.pulangPending).toBe(false)
  })
})

describe('bangunSel — sel kosong', () => {
  it('di luar jadwal = titik abu-abu, BUKAN A merah', () => {
    const s = bangunSel({
      d: 8,
      iso: '2026-09-08',
      absen: null,
      libur: false,
      bukanJadwal: true,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('·')
    expect(s.kelas).toContain('opacity-60')
    expect(s.kelas).not.toContain('rose')
    expect(s.judul).toContain('Bukan jadwal mengajarnya')
  })

  it('hari kerja yang sudah lewat = A merah', () => {
    const s = bangunSel({
      d: 8,
      iso: '2026-09-08',
      absen: null,
      libur: false,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('A')
    expect(s.kelas).toContain('rose')
    expect(s.judul).toContain('Alpha')
    expect(s.bisaPerbaiki).toBe(true)
  })

  it('hari yang belum lewat = kosong dan belum bisa diperbaiki', () => {
    const s = bangunSel({
      d: 25,
      iso: '2026-09-25',
      absen: null,
      libur: false,
      bukanJadwal: false,
      lampau: false,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('')
    expect(s.judul).toContain('(belum)')
    expect(s.bisaPerbaiki).toBe(false)
  })
})

describe('bangunSel — baris yang ada', () => {
  it.each([
    ['hadir', 'H', 'emerald'],
    ['terlambat', 'T', 'cyan'],
    ['izin', 'I', 'cyan'],
    ['sakit', 'S', 'cyan'],
    ['cuti', 'C', 'violet'],
    ['alpa', 'A', 'rose']
  ])('status %s → huruf %s', (status, huruf, warna) => {
    const s = bangunSel({
      d: 8,
      iso: '2026-09-08',
      absen: { status },
      libur: false,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe(huruf)
    expect(s.kelas).toContain(warna)
  })

  it("status 'alpa' TIDAK boleh jatuh ke H", () => {
    const s = bangunSel({
      d: 8,
      iso: '2026-09-08',
      absen: { status: 'alpha' },
      libur: false,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.teks).toBe('A')
  })

  it('penanda belum pulang hanya untuk hadir/terlambat tanpa jam_pulang', () => {
    const buat = (absen) =>
      bangunSel({
        d: 8,
        iso: '2026-09-08',
        absen,
        libur: false,
        bukanJadwal: false,
        lampau: true,
        labelShift: 'Pagi'
      })
    expect(buat({ status: 'hadir', jam: '07:00' }).pulangPending).toBe(true)
    expect(buat({ status: 'terlambat', jam: '07:30' }).pulangPending).toBe(true)
    expect(buat({ status: 'hadir', jam_pulang: '12:00' }).pulangPending).toBe(false)
    expect(buat({ status: 'izin' }).pulangPending).toBe(false)
    expect(buat({ status: 'hadir' }).judul).toContain('belum pulang')
    expect(buat({ status: 'hadir', jam_pulang: '12:00' }).judul).toContain('pulang 12:00')
  })
})

describe('rekapBaris — huruf sel dan kolom rekap tak pernah berselisih', () => {
  it('menghitung H/T/I-S-C dari baris yang ada di hari non-libur', () => {
    const absen = {
      gA_pagi_1: { status: 'hadir' },
      gA_pagi_2: { status: 'terlambat' },
      gA_pagi_3: { status: 'izin' },
      gA_pagi_4: { status: 'sakit' },
      gA_pagi_5: { status: 'cuti' }
    }
    const { rows } = matriks({ baris: BARIS_A, absen })
    const r = rows[0]
    expect({ H: r.H, T: r.T, ISC: r.ISC }).toEqual({ H: 1, T: 1, ISC: 3 })
    // Huruf yang tampak sejalan dengan hitungannya.
    expect(r.sel.slice(0, 5).map((s) => s.teks)).toEqual(['H', 'T', 'I', 'S', 'C'])
  })

  it('hari libur tak menambah apa pun, walau barisnya ada', () => {
    // 6 September 2026 = Ahad. Barisnya ada, tapi sel libur tak boleh ikut dihitung —
    // dibandingkan dengan matriks yang baris itu TIDAK ada: keduanya harus sama persis.
    const tanpa = matriks({ baris: BARIS_A }).rows[0]
    const dengan = matriks({ baris: BARIS_A, absen: { gA_pagi_6: { status: 'hadir' } } }).rows[0]
    expect(dengan.sel[5].teks).toBe('L')
    expect(dengan.H).toBe(0)
    expect({ H: dengan.H, T: dengan.T, ISC: dengan.ISC, A: dengan.A }).toEqual({
      H: tanpa.H,
      T: tanpa.T,
      ISC: tanpa.ISC,
      A: tanpa.A
    })
  })

  it('setiap sel bertulis A menghasilkan tepat satu hitungan A', () => {
    const absen = { gA_pagi_10: { status: 'alpa' } } // sisanya kosong
    const { rows } = matriks({ baris: BARIS_A, absen })
    const r = rows[0]
    const selA = r.sel.filter((s) => s.teks === 'A').length
    expect(r.A).toBe(selA)
    // 1..20 kecuali Ahad (6, 13, 20) = 17 hari kerja yang sudah lewat.
    expect(r.A).toBe(17)
  })

  it('hari di luar jadwal: kosong tak jadi alpa, tapi alpa yang DITANDAI tetap dihitung', () => {
    // Guru B masuk Senin(1)/Rabu(3)/Jumat(5) saja.
    const barisB = [{ g: guruB, shift: 'pagi', isFirst: true, span: 1 }]
    const jadwal = { gB: [1, 3, 5] }
    const polos = matriks({ baris: barisB, jadwal }).rows[0]
    // 1..20 tanpa Ahad = 17 hari kerja; yang Sen/Rab/Jum di antaranya cuma 8 —
    // sembilan sisanya bukan jadwalnya, dan itulah alpa palsu yang ditutup v.1.3.8.
    expect(polos.A).toBe(8)
    expect(polos.sel.filter((s) => s.teks === '·').length).toBeGreaterThan(0)

    // 8 Sep 2026 = Selasa (bukan jadwalnya) — ditandai alpa oleh Kyai sendiri.
    const ditandai = matriks({
      baris: barisB,
      jadwal,
      absen: { gB_pagi_8: { status: 'alpa' } }
    }).rows[0]
    expect(ditandai.A).toBe(9)
    expect(ditandai.sel[7].teks).toBe('A')
  })

  it('hari depan tak pernah dihitung alpa', () => {
    const { rows } = matriks({ baris: BARIS_A })
    // 21..30 belum lewat → kosong, tak berhuruf.
    expect(rows[0].sel.slice(20).every((s) => s.teks === '' || s.teks === 'L')).toBe(true)
  })
})

describe('bangunMatriksBulanan — bentuk & biaya', () => {
  it('membawa serta rowspan nama guru dan label shift', () => {
    const baris = [
      { g: guruA, shift: 'pagi', isFirst: true, span: 2 },
      { g: guruA, shift: 'sekolah', isFirst: false, span: 2 }
    ]
    const { rows } = matriks({ baris })
    expect(rows.map((r) => r.key)).toEqual(['rgA_pagi', 'rgA_sekolah'])
    expect(rows[0].isFirst).toBe(true)
    expect(rows[1].isFirst).toBe(false)
    expect(rows[0].span).toBe(2)
    expect(rows.map((r) => r.labelShift)).toEqual(['Pagi', 'Sekolah'])
  })

  it('lembaga kalender diturunkan SEKALI per baris, bukan per sel', () => {
    // Inilah yang membuat matriksnya lambat dulu: lembagaKalenderShift memanggil
    // shiftList() yang me-normalisasi + sort seluruh master shift, dan itu terjadi
    // 3x per SEL. Kalau angka ini naik lagi jadi kelipatan jumlah hari, biayanya balik.
    const baris = [
      { g: guruA, shift: 'pagi', isFirst: true, span: 1 },
      { g: guruB, shift: 'pagi', isFirst: true, span: 1 }
    ]
    const { dipanggil } = matriks({ baris })
    expect(dipanggil.lembagaOf).toBe(2)
    // Libur memang harus ditanya per sel — tapi sekali saja, bukan 3x seperti dulu.
    expect(dipanggil.liburOf).toBe(2 * 30)
  })

  it('daftar baris kosong menghasilkan matriks kosong, bukan galat', () => {
    expect(matriks({ baris: [] }).rows).toEqual([])
    expect(matriks({ baris: undefined }).rows).toEqual([])
  })
})

// ── v.1.4.1 — Kyai, 5 Sep 2026: "shift yg belum dimulai jangan dihitung alpa" ────────
//
// Yang dijaga di sini bukan sekadar huruf di layar. Kolom A yang sama dibaca Excel, PDF,
// dan kartu "kehadiran saya" milik guru — jadi kalau blok ini jebol, guru kembali melihat
// dirinya alpa atas shift yang belum sempat dijalani siapa pun.
describe('shift yang belum dimulai (v.1.4.1)', () => {
  // 20 Sep 2026 = Ahad (libur), jadi HARI_INI dipindah ke 18 Sep (Jumat) supaya sel hari
  // ini benar-benar hari kerja. Baris B (Sen/Rab/Jum) tetap masuk pada hari itu.
  const HARI_KERJA_INI = '2026-09-18'

  function matriksJam({ belumMulaiOf } = {}) {
    return bangunMatriksBulanan({
      baris: BARIS_A,
      hari: 30,
      hariIni: HARI_KERJA_INI,
      isoOf,
      absenOf: () => null, // tak ada satu pun baris absen → semuanya calon alpa
      lembagaOf: (g) => g.lembaga,
      liburOf: (iso) => dow(iso) === 0,
      masukOf: () => true,
      labelShiftOf: () => 'Sore',
      belumMulaiOf
    })
  }

  it('shift yang belum dibuka: sel HARI INI kosong, bukan "A"', () => {
    const row = matriksJam({ belumMulaiOf: () => true })[0]
    const sel = row.sel[17] // tanggal 18
    expect(sel.iso).toBe(HARI_KERJA_INI)
    expect(sel.teks).toBe('')
    expect(sel.bolehAlpa).toBe(false)
    // Tanggalnya tetap "lampau" — menandai izin hari ini harus tetap bisa diklik.
    expect(sel.lampau).toBe(true)
    expect(sel.bisaPerbaiki).toBe(true)
    expect(sel.judul).toContain('shift belum dimulai')
  })

  it('hanya HARI INI yang tertahan — kemarin tetap alpa', () => {
    const row = matriksJam({ belumMulaiOf: () => true })[0]
    expect(row.sel[16].teks).toBe('A') // 17 Sep, Kamis
    expect(row.sel[16].bolehAlpa).toBe(true)
  })

  it('kolom A ikut berkurang tepat satu — huruf & angka tak boleh berselisih', () => {
    const berjalan = matriksJam({ belumMulaiOf: () => false })[0]
    const tertahan = matriksJam({ belumMulaiOf: () => true })[0]
    expect(tertahan.A).toBe(berjalan.A - 1)
    // Dan angkanya memang sebanyak huruf 'A' yang tampak di baris itu.
    expect(tertahan.A).toBe(tertahan.sel.filter((s) => s.teks === 'A').length)
  })

  it('tanpa belumMulaiOf, perilakunya persis seperti sebelum v.1.4.1', () => {
    const lama = matriksJam()[0]
    const eksplisit = matriksJam({ belumMulaiOf: () => false })[0]
    expect(lama.A).toBe(eksplisit.A)
    expect(lama.sel[17].teks).toBe('A')
  })

  it('bangunSel tanpa bolehAlpa mengikuti lampau (pemanggil lama tak berubah diam-diam)', () => {
    const s = bangunSel({
      d: 1,
      iso: '2026-09-01',
      absen: null,
      libur: false,
      bukanJadwal: false,
      lampau: true,
      labelShift: 'Pagi'
    })
    expect(s.bolehAlpa).toBe(true)
    expect(s.teks).toBe('A')
  })

  it("'alpa' yang DITANDAI manusia tetap terhitung walau shift belum dibuka", () => {
    // Penilaian Kyai bukan simpulan sistem — dan kalau ia ditahan, huruf 'A' di sel akan
    // berselisih dengan angka 0 di kolom A pada baris yang sama.
    const rows = bangunMatriksBulanan({
      baris: BARIS_A,
      hari: 30,
      hariIni: HARI_KERJA_INI,
      isoOf,
      absenOf: (gid, shift, d) => (d === 18 ? { status: 'alpa' } : null),
      lembagaOf: (g) => g.lembaga,
      liburOf: (iso) => dow(iso) === 0,
      masukOf: () => true,
      labelShiftOf: () => 'Sore',
      belumMulaiOf: () => true
    })
    expect(rows[0].sel[17].teks).toBe('A')
    expect(rows[0].A).toBe(rows[0].sel.filter((s) => s.teks === 'A').length)
  })
})
