// Rombel sebagai ENTITAS (keputusan Kyai, 17 Nov 2026).
//
// Sebelum ini "kelas ngaji" tak pernah berupa barang; ia cuma kunci turunan
// `guru_pagi||guru_sore` yang dirakit ulang dari tiap baris santri (lihat utils/kelasHitung).
// Akibatnya dua keluhan yang sebenarnya satu penyakit:
//
//   1. Santri yang hanya diisi SALAH SATU dari pasangan guru hilang dari guru pasangannya.
//      Siti mengajar pagi, Indah sore, satu rombel. Ahmad ikut sore saja, jadi hanya
//      `guru_sore = Indah` yang terisi — kuncinya jadi `||indah`, BEDA dari `siti||indah`,
//      sehingga Ahmad tak pernah muncul di akun Siti dan terhitung rombel tersendiri.
//   2. Mengganti guru satu kelas harus dilakukan santri per santri, sebab tak ada satu
//      barang pun yang bisa diganti gurunya sekali jalan.
//
// Modul ini PURE (tanpa I/O) dan jadi satu-satunya tempat aturan rombel ditulis. Penarikan
// & penulisannya ada di pemanggil.

const norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
const asli = (v) => String(v ?? '').trim()

export const KATEGORI_ROMBEL = ['ngaji', 'sekolah']

/**
 * Dua slot guru EFEKTIF seorang santri untuk keperluan rombel.
 *
 * Sengaja TIDAK memakai `effGuru` milik kelasHitung: fungsi itu membuang slot yang tak sesuai
 * shift santri (benar untuk MENGHITUNG kelas), padahal di sini kita justru butuh tahu siapa
 * yang tertulis — termasuk pada santri satu shift yang slot sebelahnya memang kosong.
 * Field lama `guru` dianggap guru pagi bila kedua slot kosong, sama seperti di kelasHitung.
 */
export function slotGuruSantri(s) {
  let pagi = asli(s?.guru_pagi)
  const sore = asli(s?.guru_sore)
  if (!pagi && !sore) pagi = asli(s?.guru)
  return { pagi, sore }
}

/** Kunci pasangan guru (ternormalisasi). '' bila dua-duanya kosong. */
export function kunciPasangan(guruPagi, guruSore) {
  const p = norm(guruPagi)
  const s = norm(guruSore)
  return p || s ? `${p}||${s}` : ''
}

const _slug = (v) =>
  norm(v)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Id rombel yang DITURUNKAN dari isinya, bukan dari jam pembuatan.
 * Disengaja: menyusun ulang rombel dari data santri jadi idempoten — rombel yang sama
 * menghasilkan id yang sama, jadi tak lahir kembaran tiap kali tombolnya ditekan.
 */
export function idRombel(lembaga, guruPagi, guruSore) {
  return `rb_${_slug(lembaga) || 'x'}_${_slug(guruPagi) || 'x'}__${_slug(guruSore) || 'x'}`
}

/** Kunci sebuah baris rombel. */
export function kunciRombel(r) {
  return kunciPasangan(r?.guru_pagi, r?.guru_sore)
}

/** Label rombel yang enak dibaca: "Siti + Indah" / "Siti (Pagi)" / "Indah (Sore)". */
export function labelRombel(r) {
  if (r?.nama) return asli(r.nama)
  const p = asli(r?.guru_pagi)
  const s = asli(r?.guru_sore)
  if (p && s) return p === s ? `${p} (Pagi-Sore)` : `${p} + ${s}`
  if (p) return `${p} (Pagi)`
  if (s) return `${s} (Sore)`
  return '(tanpa guru)'
}

/**
 * Apakah guru `nama` mengampu rombel ini? Inilah yang membuat Ahmad terlihat oleh Siti:
 * Ahmad menunjuk rombel `siti||indah`, dan Siti ada di salah satu slot rombel itu.
 */
export function rombelPunyaGuru(r, nama) {
  const n = norm(nama)
  if (!n || !r) return false
  return norm(r.guru_pagi) === n || norm(r.guru_sore) === n
}

/** Peta id rombel → baris, untuk pencarian cepat di layar. */
export function petaRombel(rombelList) {
  const m = new Map()
  for (const r of rombelList || []) if (r?.id != null) m.set(String(r.id), r)
  return m
}

/**
 * Rombel seorang santri: lewat `rombel_id` kalau sudah ditunjuk, kalau belum dicocokkan
 * dari pasangan gurunya. Fallback ini penting selama masa peralihan — data lama belum
 * punya rombel_id, dan layar tak boleh ikut kosong karenanya.
 */
export function rombelSantri(s, peta, petaKunci) {
  const id = asli(s?.rombel_id)
  if (id && peta?.get) {
    const r = peta.get(id)
    if (r) return r
  }
  if (petaKunci?.get) {
    const { pagi, sore } = slotGuruSantri(s)
    const k = kunciPasangan(pagi, sore)
    if (k) return petaKunci.get(`${norm(s?.lembaga)}|${k}`) || null
  }
  return null
}

/**
 * Pasangan guru LENGKAP seorang santri: slot yang kosong di baris santri diisi dari
 * rombelnya. Inilah yang membuat Ahmad (sore saja) tetap terhitung milik Siti juga.
 *
 * Mengembalikan `{ pagi, sore }` — bukan menyalin ke objek santri, supaya tak ada yang
 * tanpa sengaja ikut tertulis kembali ke basis data.
 */
export function pasanganLengkap(s, rombel) {
  const { pagi, sore } = slotGuruSantri(s)
  if (!rombel) return { pagi, sore }
  return {
    pagi: pagi || asli(rombel.guru_pagi),
    sore: sore || asli(rombel.guru_sore)
  }
}

/**
 * Konteks rombel siap pakai untuk guruScope / kelasHitung.
 * @param {Array} rombelList baris tabel `rombel`.
 */
export function konteksRombel(rombelList) {
  return { peta: petaRombel(rombelList), petaKunci: petaKunciRombel(rombelList) }
}

/** Peta '<lembaga>|<kunci pasangan>' → rombel, pasangan untuk rombelSantri(). */
export function petaKunciRombel(rombelList) {
  const m = new Map()
  for (const r of rombelList || []) {
    const k = kunciRombel(r)
    if (k) m.set(`${norm(r.lembaga)}|${k}`, r)
  }
  return m
}

/**
 * `rombel_id` yang PANTAS untuk santri sesudah gurunya diubah di form.
 *
 * Tanpa ini, mengganti guru seorang santri meninggalkan `rombel_id` lama yang menunjuk kelas
 * yang sudah bukan kelasnya — dan karena rombel_id diutamakan saat membaca, santri itu akan
 * terus terhitung di kelas lamanya tanpa ada yang tahu.
 *
 * Urutannya: pertahankan rombel lama kalau masih memuat salah satu guru santri; kalau tidak,
 * carikan yang pasangannya cocok; kalau tak ada yang cocok, KOSONGKAN — lebih baik tak
 * menunjuk apa-apa daripada menunjuk kelas yang salah.
 *
 * @returns {string} id rombel, atau '' bila tak ada yang pantas.
 */
export function rombelIdSesudahUbah(s, peta, petaKunci) {
  const { pagi, sore } = slotGuruSantri(s)
  if (!pagi && !sore) return ''
  const lama = asli(s?.rombel_id)
  if (lama && peta?.get) {
    const r = peta.get(lama)
    if (r && (rombelPunyaGuru(r, pagi) || rombelPunyaGuru(r, sore))) return lama
  }
  if (petaKunci?.get) {
    const r = petaKunci.get(`${norm(s?.lembaga)}|${kunciPasangan(pagi, sore)}`)
    if (r) return String(r.id)
  }
  return ''
}

/**
 * Susun USULAN rombel dari data santri yang sudah ada, lalu gabungkan yang sebelah slotnya
 * kosong ke pasangan lengkap yang cocok. Ini inti perbaikan data Kyai.
 *
 * Aturan gabung — sengaja berhati-hati:
 *   - Pasangan "sebelah" (`||indah`) dilebur ke pasangan LENGKAP di lembaga yang sama yang
 *     memuat guru itu di SLOT YANG SAMA (`siti||indah`).
 *   - Hanya kalau calonnya TEPAT SATU. Kalau Indah berpasangan dengan Siti dan juga dengan
 *     Ani, tak ada yang bisa ditebak dengan jujur — pasangan itu dibiarkan berdiri sendiri
 *     dan dilaporkan sebagai `ambigu` supaya Kyai yang memutuskan.
 *   - Pasangan lengkap tak pernah dilebur ke pasangan lengkap lain.
 *
 * @param {Array} santriList santri (aktif saja — penyaringan di pemanggil).
 * @returns {{usul: Array, ambigu: Array}} `usul` siap jadi baris rombel; tiap usul membawa
 *   `santriIds` supaya pemanggil bisa menunjuk rombel_id tanpa mencocokkan ulang.
 */
export function usulRombelDariSantri(santriList) {
  const grup = new Map() // '<lembaga>|<kunci>' -> { lembaga, guru_pagi, guru_sore, santriIds }
  for (const s of santriList || []) {
    const { pagi, sore } = slotGuruSantri(s)
    const kunci = kunciPasangan(pagi, sore)
    if (!kunci) continue // santri tanpa guru bukan urusan rombel
    const lem = asli(s?.lembaga)
    const key = `${norm(lem)}|${kunci}`
    let g = grup.get(key)
    if (!g) {
      g = { key, lembaga: lem, guru_pagi: pagi, guru_sore: sore, santriIds: [] }
      grup.set(key, g)
    }
    if (s?.id != null) g.santriIds.push(String(s.id))
  }

  const semua = [...grup.values()]
  const lengkap = semua.filter((g) => g.guru_pagi && g.guru_sore)
  const sebelah = semua.filter((g) => !g.guru_pagi || !g.guru_sore)

  const ambigu = []
  const dilebur = new Set()
  for (const g of sebelah) {
    const slot = g.guru_pagi ? 'guru_pagi' : 'guru_sore'
    const nama = norm(g.guru_pagi || g.guru_sore)
    const calon = lengkap.filter(
      (L) => norm(L.lembaga) === norm(g.lembaga) && norm(L[slot]) === nama
    )
    if (calon.length === 1) {
      calon[0].santriIds.push(...g.santriIds)
      dilebur.add(g.key)
    } else if (calon.length > 1) {
      ambigu.push({
        key: g.key,
        lembaga: g.lembaga,
        guru: g.guru_pagi || g.guru_sore,
        slot: slot === 'guru_pagi' ? 'pagi' : 'sore',
        jumlahSantri: g.santriIds.length,
        calon: calon.map((L) => labelRombel(L))
      })
    }
  }

  const usul = semua
    .filter((g) => !dilebur.has(g.key))
    .map((g) => ({
      key: g.key,
      lembaga: g.lembaga,
      kategori: 'ngaji',
      guru_pagi: g.guru_pagi,
      guru_sore: g.guru_sore,
      nama: labelRombel(g),
      santriIds: [...new Set(g.santriIds)]
    }))
    .sort((a, b) => a.lembaga.localeCompare(b.lembaga) || a.nama.localeCompare(b.nama))

  return { usul, ambigu }
}
