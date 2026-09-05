// absensiMatriks — bangun SEKALI seluruh sel matriks rekap absen bulanan (guru × shift × hari).
//
// v.1.4.0 (Kyai, 3 Sep 2026): "akses edit rekap absen bulanan guru terasa lambat ketika
// saya edit manual."
//
// AKAR MASALAH — bukan datanya, melainkan berapa kali keputusan yang sama diulang.
// Sampai perbaikan ini tiap sel matriks dirakit oleh EMPAT fungsi terpisah yang dipanggil
// langsung dari template (`cellText`, `cellClass`, `cellTitle`, `pulangPending`), dan
// masing-masing menurunkan ULANG tiga hal yang persis sama untuk sel yang sama:
//
//   · lembaga mana yang kalendernya berlaku  (lembagaKalenderShift → shiftById → shiftList,
//     dan shiftList me-map + normalisasi + SORT seluruh master shift tiap dipanggil)
//   · tanggal itu libur atau bukan            (isLiburIso)
//   · tanggal itu jadwal gurunya atau bukan   (guruMasukPada)
//
// Fungsi di dalam template TIDAK bisa di-cache Vue: ia dijalankan ulang setiap kali
// komponen render, bukan hanya saat datanya berubah. Padahal komponen ini ikut render
// untuk hal-hal yang sama sekali tak menyentuh matriks — dialog perbaikan dibuka, tombol
// jadi "Menyimpan…", dialog ditutup. Satu perbaikan manual karena itu merender ulang
// seluruh matriks EMPAT kali, dan tiap kali membayar lagi ~200 rb turunan.
//
// Diukur pada 120 guru × 30 hari (≈200 baris, 6.000 sel): 117 ms turunan JS per render
// → 6 ms bila diturunkan sekali. Itu baru sisi JS, belum diff DOM 6.000 sel.
//
// KENAPA DI SINI, BUKAN DI VIEW. Empat fungsi tadi masing-masing memutuskan sendiri
// "libur?", "bukan jadwal?", "sudah lewat?" — tiga salinan aturan yang sama, persis kelas
// bug "cermin yang berpisah" yang berulang di repo ini (huruf sel bisa bilang satu hal
// sementara warnanya bilang hal lain). Di sini ketiganya diputuskan SEKALI per sel lalu
// dipakai bersama teks, warna, tooltip, DAN kolom rekap H/T/I-S-C/A — jadi layar, Excel,
// dan PDF mustahil berbeda.
//
// Semua fungsi PURE. Yang bergantung store/settings di-suntik sebagai fungsi lewat
// parameter, supaya bisa diuji tanpa pinia/Supabase.

/** Kelas warna sel per status. Dipisah supaya urutan cabangnya tak tersebar. */
const KELAS_LIBUR = 'bg-rose-200 text-rose-800'
// v.1.3.8: bukan jadwalnya → abu-abu netral, sengaja TIDAK merah. Merah di kolom ini
//   selama ini berarti "ada yang salah"; hari yang memang bukan jadwal guru tak boleh
//   terlihat begitu.
const KELAS_BUKAN_JADWAL = 'bg-[var(--bg-card-elevated)] text-[var(--text-tertiary)] opacity-60'
const KELAS_ALPA = 'bg-rose-100 text-rose-700'
const KELAS_BELUM = 'bg-[var(--bg-card-elevated)] text-[var(--text-tertiary)]'

/** Huruf + warna untuk baris absen yang MEMANG ADA. */
function dariStatus(status) {
  const s = String(status || 'hadir').toLowerCase()
  if (s === 'terlambat') return { teks: 'T', kelas: 'bg-cyan-200 text-cyan-800' }
  if (s === 'izin') return { teks: 'I', kelas: 'bg-cyan-200 text-cyan-800' }
  if (s === 'sakit') return { teks: 'S', kelas: 'bg-cyan-200 text-cyan-800' }
  if (s === 'cuti') return { teks: 'C', kelas: 'bg-violet-200 text-violet-800' }
  // Alpa TERCATAT (dari perbaikan manual) — beda dengan alpa karena baris tak ada.
  //   Tanpa cabang ini ia jatuh ke 'H': guru yang justru ditandai alpa tampil HADIR.
  if (s === 'alpa' || s === 'alpha') return { teks: 'A', kelas: KELAS_ALPA }
  return { teks: 'H', kelas: 'bg-emerald-200 text-emerald-800' }
}

/** Status baris dianggap alpa yang DICATAT manusia (bukan simpulan dari sel kosong). */
function statusAlpa(a) {
  return ['alpa', 'alpha'].includes(String(a?.status || '').toLowerCase())
}

/**
 * Satu sel matriks — semua yang dibutuhkan tampilan sudah jadi, tak ada lagi turunan
 * saat render.
 *
 * `lampau`   = tanggalnya sudah lewat (≤ hari ini). Ini yang menentukan sel boleh
 *              DIKLIK untuk diperbaiki — menandai izin di hari yang sedang berjalan
 *              tetap masuk akal walau shift-nya belum dibuka.
 * `bolehAlpa` = sel KOSONG di sini sudah pantas disebut alpa. v.1.4.2 (Kyai, 5 Sep 2026:
 *              "shift yg belum dimulai jangan dihitung alpa") memisahkannya dari
 *              `lampau`: hari ini sudah "lampau" sejak pukul 00:00, tapi shift Sore baru
 *              dibuka pukul 15:00. Bila tak diberikan, ia mengikuti `lampau` = perilaku
 *              lama, supaya pemanggil yang belum tahu jam tidak berubah diam-diam.
 *
 * @returns {{d:number, iso:string, teks:string, kelas:string, judul:string,
 *   libur:boolean, bukanJadwal:boolean, lampau:boolean, bolehAlpa:boolean, ada:boolean,
 *   pulangPending:boolean, bisaPerbaiki:boolean}}
 */
export function bangunSel({ d, iso, absen, libur, bukanJadwal, lampau, bolehAlpa, labelShift }) {
  const a = absen || null
  const alpaBoleh = bolehAlpa === undefined ? !!lampau : !!bolehAlpa
  if (libur) {
    return {
      d,
      iso,
      teks: 'L',
      kelas: KELAS_LIBUR,
      judul: iso + ' — Libur',
      libur: true,
      bukanJadwal: false,
      lampau,
      bolehAlpa: alpaBoleh,
      ada: !!a,
      pulangPending: false,
      // Hari libur: statusnya turun dari KALENDER, bukan dari baris absen. Menulis baris
      //   di sini tak akan mengubah tampilan sel — jadi menolak lebih jujur daripada
      //   menyimpan diam-diam sesuatu yang tak terlihat.
      bisaPerbaiki: false
    }
  }
  if (!a) {
    // Kosong & slotnya sudah lewat = alpa; belum terjadi = kosong.
    // v.1.3.8: kecuali memang bukan jadwalnya — titik, bukan 'A'.
    // v.1.4.2: "sudah lewat" kini menghitung JAM juga (lihat catatan `bolehAlpa` di atas),
    //   jadi shift yang belum dibuka tampil kosong seperti hari depan — bukan 'A' merah.
    const teks = bukanJadwal ? '·' : alpaBoleh ? 'A' : ''
    const kelas = bukanJadwal ? KELAS_BUKAN_JADWAL : alpaBoleh ? KELAS_ALPA : KELAS_BELUM
    const judul = bukanJadwal
      ? iso + ' — Bukan jadwal mengajarnya [' + labelShift + ']'
      : iso +
        (alpaBoleh ? ' — Alpha' : lampau ? ' — (shift belum dimulai)' : ' — (belum)') +
        ' [' +
        labelShift +
        ']'
    return {
      d,
      iso,
      teks,
      kelas,
      judul,
      libur: false,
      bukanJadwal,
      lampau,
      bolehAlpa: alpaBoleh,
      ada: false,
      pulangPending: false,
      bisaPerbaiki: lampau
    }
  }
  const { teks, kelas } = dariStatus(a.status)
  const st = String(a.status || 'hadir').toLowerCase()
  // Baris hadir/terlambat yg belum ada jam_pulang → penanda "belum pulang"
  // (informatif saja, tak nge-gate apa pun).
  const perluPulang = st === 'hadir' || st === 'terlambat'
  const pulangPending = perluPulang && !String(a.jam_pulang || '').trim()
  const pulangTxt = perluPulang
    ? a.jam_pulang
      ? ' · pulang ' + a.jam_pulang
      : ' · belum pulang'
    : ''
  return {
    d,
    iso,
    teks,
    kelas,
    judul: `${iso} — ${a.status || 'hadir'}${a.jam ? ' (' + a.jam + ')' : ''}${pulangTxt} [${labelShift}]`,
    libur: false,
    bukanJadwal,
    lampau,
    bolehAlpa: alpaBoleh,
    ada: true,
    pulangPending,
    bisaPerbaiki: lampau
  }
}

/**
 * Rekap satu baris (guru × shift) dari sel-selnya. Sengaja membaca SEL, bukan mengulang
 * pembacaan absensi: kalau kolom H/T/I-S-C/A punya jalan sendiri, suatu saat ia akan
 * berselisih dengan huruf yang tampak di baris yang sama.
 *
 * · H / T / I-S-C  = baris yang MEMANG ADA di hari non-libur. Hari depan & hari di luar
 *   jadwal tidak dikecualikan — kalau barisnya ada, gurunya memang tercatat.
 * · A = dua bentuk alpa, dan keduanya terhitung SEKALI: tak ada baris sama sekali di slot
 *   kerja yang sudah lewat, ATAU baris ber-status 'alpa' hasil perbaikan manual. Hari di
 *   luar jadwal dilewati saat KOSONG — tapi 'alpa' yang Kyai tandai sendiri di hari
 *   seperti itu tetap dihitung (itu penilaian manusia, bukan simpulan sistem).
 *
 *   v.1.4.2: sel KOSONG memakai `bolehAlpa` (tanggal + jam), sedangkan 'alpa' TERTULIS
 *   tetap memakai `lampau`. Bedanya disengaja: yang pertama simpulan sistem dan tak boleh
 *   mendahului jam shift; yang kedua sudah diketik manusia, dan menahannya sampai shift
 *   dibuka berarti angka A di layar berselisih dengan huruf 'A' di baris yang sama.
 */
export function rekapBaris(sel, absenSel) {
  let H = 0
  let T = 0
  let ISC = 0
  let A = 0
  for (let i = 0; i < sel.length; i++) {
    const s = sel[i]
    if (s.libur) continue
    const a = absenSel[i]
    if (a) {
      const st = String(a.status || 'hadir').toLowerCase()
      if (st === 'hadir') H++
      else if (st === 'terlambat') T++
      else if (st === 'izin' || st === 'sakit' || st === 'cuti') ISC++
      if (s.lampau && statusAlpa(a)) A++
      continue
    }
    if (s.bolehAlpa && !s.bukanJadwal) A++
  }
  return { H, T, ISC, A }
}

/**
 * Bangun seluruh baris matriks bulanan.
 *
 * Turunan yang mahal (lembaga kalender, libur, jadwal) dihitung SEKALI per sel di sini;
 * `lembagaOf` bahkan sekali per BARIS, karena jawabannya tak bergantung tanggal.
 *
 * @param {object} p
 * @param {Array<{g:object, shift:string, isFirst:boolean, span:number}>} p.baris
 * @param {number} p.hari jumlah hari dalam bulan
 * @param {string} p.hariIni ISO hari ini (WIB) — pembatas "sudah lewat"
 * @param {(d:number)=>string} p.isoOf
 * @param {(guruId:string, shift:string, d:number)=>object|null} p.absenOf
 * @param {(guru:object, shift:string)=>string} p.lembagaOf lembaga yang KALENDERNYA dipakai
 * @param {(iso:string, lembaga:string)=>boolean} p.liburOf
 * @param {(guru:object, shift:string, iso:string)=>boolean} p.masukOf jadwal mengajar
 * @param {(shift:string)=>string} p.labelShiftOf
 * @param {(shift:string)=>boolean} [p.belumMulaiOf] shift ini belum dibuka pada jam
 *   sekarang (v.1.4.2). Ditanya SEKALI per baris — jawabannya soal jam, tak bergantung
 *   tanggal. Tak diberikan → seluruh hari ini dianggap sudah berjalan (perilaku lama).
 */
export function bangunMatriksBulanan(p) {
  const {
    baris,
    hari,
    hariIni,
    isoOf,
    absenOf,
    lembagaOf,
    liburOf,
    masukOf,
    labelShiftOf,
    belumMulaiOf
  } = p
  // ISO per hari diturunkan sekali, bukan per sel × 4 pembaca seperti dulu.
  const iso = []
  for (let d = 1; d <= hari; d++) iso[d] = isoOf(d)

  const out = []
  for (const row of baris || []) {
    const g = row.g
    const labelShift = labelShiftOf(row.shift)
    const lembaga = lembagaOf(g, row.shift) // sekali per baris — tak bergantung tanggal
    // v.1.4.2: soal JAM, jadi cukup sekali per baris juga (shift-nya tetap sepanjang baris).
    const belumMulai = typeof belumMulaiOf === 'function' ? !!belumMulaiOf(row.shift) : false
    const sel = []
    const absenSel = []
    for (let d = 1; d <= hari; d++) {
      const t = iso[d]
      const absen = absenOf(g.id, row.shift, d)
      absenSel.push(absen)
      const lampau = t <= hariIni
      sel.push(
        bangunSel({
          d,
          iso: t,
          absen,
          libur: liburOf(t, lembaga),
          bukanJadwal: !masukOf(g, row.shift, t),
          lampau,
          // Hanya HARI INI yang bisa tertahan jam; tanggal kemarin tetap alpa.
          bolehAlpa: lampau && !(belumMulai && t === hariIni),
          labelShift
        })
      )
    }
    const { H, T, ISC, A } = rekapBaris(sel, absenSel)
    out.push({
      key: 'r' + g.id + '_' + row.shift,
      g,
      shift: row.shift,
      isFirst: row.isFirst,
      span: row.span,
      labelShift,
      lembaga,
      sel,
      H,
      T,
      ISC,
      A
    })
  }
  return out
}
