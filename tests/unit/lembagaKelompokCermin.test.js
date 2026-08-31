// PENJAGA CERMIN — peta "nama lembaga → kelompok luas" hidup di DUA tempat:
//
//   1. JS  : LEMBAGA_GROUPS di vue-app/src/composables/useLembaga.js
//   2. SQL : CTE `grup(nama, broad)` di dalam public.auth_heads_lembaga()
//            (supabase/migrations/20260831120000_santri_upd_kepala_lembaga.sql)
//
// Duplikasi itu tak terhindarkan — Postgres tak bisa memanggil fungsi JS, sedangkan
// kebijakan RLS-nya HARUS menjawab pertanyaan yang sama dengan gerbang UI: "guru ini
// kepala lembaga tsb?". Yang bisa dihindari adalah duplikasi yang MENYIMPANG DIAM-DIAM,
// dan itulah tugas berkas ini: menambah lembaga baru di JS tanpa menyunting migrasinya
// akan membuat tes ini MERAH, bukan membuat seorang kepala lembaga bertemu pesan
// "ditolak RLS" berbulan-bulan kemudian.
//
// Kelas bug ini persis yang dilaporkan Kyai 31 Agu 2026: yang terlihat di layar sudah
// dilebarkan, izin simpannya tertinggal.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { LEMBAGA_GROUPS } from '@/composables/useLembaga'

// Dari root proyek (vitest.config.js ada di root, jadi cwd = root). Sengaja BUKAN
// import.meta.url: di environment jsdom nilainya bukan URL ber-skema file://.
const SQL_PATH = resolve(
  process.cwd(),
  'supabase/migrations/20260831120000_santri_upd_kepala_lembaga.sql'
)

// Peta yang DIHARAPKAN, diturunkan dari sumber JS (huruf kecil — SQL sudah mem-lower).
function petaDariJs() {
  const out = {}
  for (const info of Object.values(LEMBAGA_GROUPS)) {
    for (const v of info.variants) out[String(v).toLowerCase()] = info.group
  }
  return out
}

// Baca kembali baris VALUES di CTE `grup(nama, broad)` milik migrasi.
function petaDariSql() {
  const sql = readFileSync(SQL_PATH, 'utf8')
  const mulai = sql.indexOf('grup(nama, broad) as (')
  expect(mulai, 'CTE grup(nama, broad) tak ditemukan di migrasi').toBeGreaterThan(-1)
  // Batas akhir = CTE berikutnya. Sengaja BUKAN '),' — tiap baris VALUES sendiri
  // berakhir dengan '),', jadi potongannya akan terputus di baris pertama.
  const akhir = sql.indexOf('jab as (', mulai)
  expect(akhir, 'CTE `jab` (penanda akhir blok grup) tak ditemukan').toBeGreaterThan(mulai)
  const blok = sql.slice(mulai, akhir)
  const out = {}
  for (const m of blok.matchAll(/\('((?:[^']|'')+)',\s*'([a-z-]+)'\)/g)) {
    out[m[1].replace(/''/g, "'")] = m[2] // '' = apostrof yang di-escape SQL
  }
  return out
}

describe('peta lembaga → kelompok: JS dan migrasi RLS harus sama', () => {
  it('SQL memuat PERSIS lembaga yang sama dengan LEMBAGA_GROUPS', () => {
    expect(petaDariSql()).toEqual(petaDariJs())
  })

  it('petanya tidak kosong (kalau parsernya patah, tes di atas jangan lolos diam-diam)', () => {
    const peta = petaDariSql()
    expect(Object.keys(peta).length).toBeGreaterThanOrEqual(9)
    expect(peta.sdi).toBe('sekolah')
    expect(peta.ptpt).toBe('qiraati')
  })

  it('hanya empat label kelompok yang dikenal kebijakan RLS', () => {
    // Daftar ini juga tertulis literal di auth_heads_lembaga (cabang label kelompok).
    const dikenal = new Set(['qiraati', 'sekolah', 'mahad', 'non-lembaga'])
    for (const [nama, broad] of Object.entries(petaDariJs())) {
      expect(dikenal.has(broad), `kelompok "${broad}" (${nama}) belum dikenal migrasi`).toBe(true)
    }
  })
})
