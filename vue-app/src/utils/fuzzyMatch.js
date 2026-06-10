// v.100 Batch12: utilitas pencocokan nama "fuzzy" (jarak edit / Levenshtein).
//   Dipakai oleh:
//     - Audit "Kandidat Nama Mirip" (composables/useDataAudit.js)
//     - Impor Rekap Prestasi & Impor Assign Guru (cocokkan baris ke santri walau nama
//       ditulis sedikit beda — kurangi kerja manual edit, keputusan kyai).
//   AMAN: `bestNameMatch` hanya mengembalikan match bila skor tinggi DAN tidak ambigu.

export function normNama(v) {
  return String(v == null ? '' : v).trim().toLowerCase().replace(/\s+/g, ' ')
}

// Kunci nama agresif: buang gelar umum + non-alfanumerik (mis. "M. Ali, S.Pd" -> "ali").
export function fuzzyKey(nama) {
  return normNama(nama)
    .replace(/\b(m|moh|moch|muh|mhd|h|hj|kh|ust|ustadz|ustadzah|drs|s\.?pd|s\.?ag|a\.?ma)\b/g, '')
    .replace(/[^a-z0-9]/g, '')
}

// Jarak edit (Levenshtein) iteratif (hemat memori, O(n) ruang).
export function levenshtein(a, b) {
  a = a || ''
  b = b || ''
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  let prev = new Array(n + 1)
  for (let j = 0; j <= n; j++) prev[j] = j
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[n]
}

// Rasio kemiripan 0..1 (1 = identik).
export function simRatio(a, b) {
  const mx = Math.max((a || '').length, (b || '').length)
  if (!mx) return 0
  return 1 - levenshtein(a, b) / mx
}

/**
 * Cari 1 kandidat terbaik dari `list` berdasarkan kemiripan nama.
 * AMAN: hanya kembalikan match bila skor >= min DAN tidak ambigu
 *   (kandidat kedua harus lebih rendah, beda >= gap) supaya tidak salah tebak.
 * @param {string} nama nama dari file impor
 * @param {Array} list daftar kandidat (mis. santri)
 * @param {object} [opts] { getName, min, gap }
 * @returns {{item:any, score:number}|null}
 */
export function bestNameMatch(nama, list, opts = {}) {
  const { getName = (x) => x.nama, min = 0.86, gap = 0.06 } = opts
  const key = fuzzyKey(nama)
  if (!key || key.length < 3) return null
  let best = null
  let bestScore = 0
  let second = 0
  for (const it of list || []) {
    const k = fuzzyKey(getName(it))
    if (!k || k.length < 3) continue
    if (Math.abs(k.length - key.length) > 6) continue // beda panjang ekstrem -> lewati
    const s = simRatio(key, k)
    if (s > bestScore) {
      second = bestScore
      bestScore = s
      best = it
    } else if (s > second) {
      second = s
    }
  }
  if (!best || bestScore < min) return null
  if (second >= bestScore - gap) return null // ambigu -> jangan tebak
  return { item: best, score: bestScore }
}
