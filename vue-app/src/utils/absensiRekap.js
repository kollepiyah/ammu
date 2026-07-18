// absensiRekap — helper agregasi rekap absensi (Bagian C). SEMUA PURE.
// Tanggal ISO 'YYYY-MM-DD'. "today" & "libur" di-inject dari view agar deterministik & testable.

function pad2(n) {
  return String(n).padStart(2, '0')
}
export function isoOf(y, m, d) {
  return `${y}-${pad2(m)}-${pad2(d)}`
}

// Daftar tanggal ISO inklusif [startIso, endIso].
export function tanggalRentang(startIso, endIso) {
  const out = []
  const [ys, ms, ds] = String(startIso).split('-').map(Number)
  const [ye, me, de] = String(endIso).split('-').map(Number)
  const cur = new Date(ys, ms - 1, ds)
  const end = new Date(ye, me - 1, de)
  let guard = 0
  while (cur <= end && guard++ < 400) {
    out.push(`${cur.getFullYear()}-${pad2(cur.getMonth() + 1)}-${pad2(cur.getDate())}`)
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

// Senin–Minggu yang memuat anchorIso → {start, end} ISO.
export function rentangMinggu(anchorIso) {
  const [y, m, d] = String(anchorIso).split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  const dow = dt.getDay() // 0=Minggu..6=Sabtu
  const keSenin = dow === 0 ? -6 : 1 - dow
  const senin = new Date(y, m - 1, d + keSenin)
  const minggu = new Date(senin.getFullYear(), senin.getMonth(), senin.getDate() + 6)
  const f = (x) => `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`
  return { start: f(senin), end: f(minggu) }
}

// Rentang bulan penuh → {start, end} ISO.
export function rentangBulan(year, month) {
  const last = new Date(year, month, 0).getDate()
  return { start: isoOf(year, month, 1), end: isoOf(year, month, last) }
}

// Geser anchor n minggu (utk tombol prev/next).
export function geserMinggu(anchorIso, n) {
  const [y, m, d] = String(anchorIso).split('-').map(Number)
  const dt = new Date(y, m - 1, d + n * 7)
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`
}

// Index harian (guru|shift|iso) -> row, dedup baris ganda by prioritas status.
export function indexAbsensiHarian(rows) {
  const map = new Map()
  const prio = (s) => (s === 'terlambat' ? 3 : s === 'hadir' ? 2 : 1)
  for (const a of rows || []) {
    const gid = String(a.guru_id || a.guruId || '')
    const sh = String(a.shift || '').toLowerCase()
    const iso = String(a.tanggal || '').slice(0, 10)
    if (!gid || !sh || !iso) continue
    const key = gid + '|' + sh + '|' + iso
    const ex = map.get(key)
    if (
      !ex ||
      prio(String(a.status || 'hadir').toLowerCase()) >
        prio(String(ex.status || 'hadir').toLowerCase())
    ) {
      map.set(key, a)
    }
  }
  return map
}

// Hitung 1 sel rekap (guru,shift) atas tanggalKerja (sudah non-libur).
// Alpha = tanggalKerja <= today yang tak ada record. belumPulang = hadir/terlambat tanpa jam_pulang.
export function hitungSel(index, guruId, shift, tanggalKerja, todayIso) {
  let H = 0,
    T = 0,
    I = 0,
    S = 0,
    C = 0,
    A = 0,
    belumPulang = 0
  const gid = String(guruId)
  const sh = String(shift).toLowerCase()
  for (const iso of tanggalKerja) {
    const a = index.get(gid + '|' + sh + '|' + iso)
    if (!a) {
      if (iso <= todayIso) A++
      continue
    }
    const st = String(a.status || 'hadir').toLowerCase()
    if (st === 'terlambat') T++
    else if (st === 'izin') I++
    else if (st === 'sakit') S++
    else if (st === 'cuti') C++
    else H++
    if ((st === 'hadir' || st === 'terlambat') && !String(a.jam_pulang || '').trim()) belumPulang++
  }
  return { H, T, I, S, C, A, belumPulang, total: H + T + I + S + C + A }
}

// Tambah counts b ke akumulator a (subtotal).
export function tambahSel(a, b) {
  a.H += b.H
  a.T += b.T
  a.I += b.I
  a.S += b.S
  a.C += b.C
  a.A += b.A
  a.belumPulang += b.belumPulang
  a.total += b.total
  return a
}
export function selKosong() {
  return { H: 0, T: 0, I: 0, S: 0, C: 0, A: 0, belumPulang: 0, total: 0 }
}
