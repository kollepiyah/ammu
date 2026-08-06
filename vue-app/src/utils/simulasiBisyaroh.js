// simulasiBisyaroh — PLAFON biaya bisyaroh sebulan, dengan andaian HADIR PENUH.
//
// PERMINTAAN KYAI (6 Agu 2026): "saya hanya ingin membuat perhitungan sebelum
//   memutuskan isi nominal bisyaroh, karena dari yayasan ada perubahan."
//
// Jadi ini alat COBA-COBA, bukan laporan: nominal diketik sementara di layar, tak
// ada yang disimpan, tak ada slip yang terbit. Yang dijawab: "kalau tarifnya sekian,
// sebulan keluar berapa?"
//
// ANDAIAN (pilihan Kyai): setiap guru hadir di SETIAP hari efektif shift-nya, dan
//   selalu tepat waktu. Hasilnya PLAFON — biaya tertinggi yang mungkin. Realisasi
//   hampir selalu lebih rendah (ada izin, sakit, terlambat), jadi angka ini aman
//   dipakai menyusun anggaran, bukan untuk menebak pengeluaran sebenarnya.
//
// Sengaja MEMAKAI ULANG `barisBisyaroh` — mesin yang sama dengan slip sungguhan.
// Kalau aturan scope/hitungan berubah, simulasi ikut berubah tanpa disentuh. Jangan
// menyalin rumusnya ke sini: cermin yang berpisah diam-diam adalah kelas bug yang
// sudah berkali-kali menggigit di repo ini.

import { barisBisyaroh } from './bisyarohScope'

/** Ahad libur, Senin–Sabtu efektif — sama dengan aturan absensi & bisyaroh per_jp. */
export function hariEfektif(tanggalList, liburSet) {
  const libur = liburSet instanceof Set ? liburSet : new Set(liburSet || [])
  let n = 0
  for (const iso of tanggalList || []) {
    const t = String(iso).slice(0, 10)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) continue
    if (libur.has(t)) continue
    // new Date('YYYY-MM-DD') = UTC midnight; getUTCDay() supaya tak bergeser di WIB.
    if (new Date(t + 'T00:00:00Z').getUTCDay() === 0) continue // Ahad
    n++
  }
  return n
}

/** Semua tanggal 1..akhir bulan `YYYY-MM`. Tak dipotong "sampai hari ini" — simulasi
 *  memang tentang bulan PENUH, beda dari rekap yang hanya boleh menghitung yang lewat. */
export function tanggalBulanPenuh(periode) {
  const [y, m] = String(periode || '')
    .split('-')
    .map(Number)
  if (!y || !m || m < 1 || m > 12) return []
  const akhir = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const out = []
  for (let d = 1; d <= akhir; d++) {
    out.push(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }
  return out
}

/**
 * Jalankan `barisBisyaroh` untuk tiap guru, lalu jumlahkan per jenis.
 *
 * `ctxList` = konteks per guru yang SUDAH berisi kuantitas hadir-penuh (dibangun di
 * view, sebab ia butuh master shift/libur/beban mengajar). Util ini sengaja tak tahu
 * dari mana angkanya datang — itu yang membuatnya bisa diuji tanpa DOM & tanpa DB.
 *
 * @returns { perJenis: [{jenis_id,label,hitungan,tarif,guru,qty,subtotal}], total, guruKena }
 */
export function simulasiBisyaroh(jenisList, ctxList) {
  const perJenis = new Map()
  const guruKena = new Set()
  for (const ctx of ctxList || []) {
    for (const b of barisBisyaroh(jenisList || [], ctx) || []) {
      const nominal = Number(b.nominal) || 0
      if (nominal <= 0) continue
      const k = String(b.jenis_id)
      if (!perJenis.has(k)) {
        perJenis.set(k, {
          jenis_id: k,
          label: b.label || k,
          hitungan: b.hitungan || 'flat',
          tarif: Number(b.tarif) || 0,
          guru: 0,
          qty: 0,
          subtotal: 0
        })
      }
      const r = perJenis.get(k)
      r.guru++
      r.qty += Number(b.qty) || 0
      r.subtotal += nominal
      guruKena.add(String(ctx?.guruId ?? ''))
    }
  }
  const baris = [...perJenis.values()].sort((a, b) => b.subtotal - a.subtotal)
  return {
    perJenis: baris,
    total: baris.reduce((a, r) => a + r.subtotal, 0),
    guruKena: guruKena.size
  }
}

/**
 * Salin daftar jenis dengan nominal DIGANTI dari `override` (id -> nominal).
 *
 * Dipakai supaya Kyai bisa mengetik tarif calon tanpa menyimpannya ke Pengaturan.
 * ⚠️ Menyalin, bukan menyunting di tempat: kalau objek settings ikut berubah, angka
 * coba-coba bisa ikut tersimpan saat halaman lain memanggil simpan — persis jenis
 * kecelakaan yang membuat alat "simulasi" jadi berbahaya.
 */
export function terapkanNominal(jenisList, override) {
  const map = override || {}
  return (jenisList || []).map((j) => {
    const v = map[String(j?.id)]
    if (v === undefined || v === null || v === '') return { ...j }
    const n = Math.max(0, Math.round(Number(v) || 0))
    return { ...j, nominal: n }
  })
}
