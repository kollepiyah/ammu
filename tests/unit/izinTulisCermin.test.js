// PENJAGA CERMIN — siapa yang LAYARNYA mengizinkan mengurus Perizinan & Cuti
// vs siapa yang KEBIJAKAN RLS-nya mengizinkan menulis tabel `izin_guru`.
//
// Kelas bug yang dijaga: gerbang UI dilebarkan (atau memang tak pernah ada),
// gerbang DB tertinggal, lalu penggunanya bertemu "new row violates row-level
// security policy" berbulan-bulan kemudian. Persis yang dilaporkan seorang guru
// kepada Kyai 12 Sep 2026 — "setiap kali saya mencoba mengunakan izin di
// aplikasi selalu gagal" — dan persis yang sudah terjadi 23 Jul 2026 pada
// `absensi_shift_guru` dan 31 Agu 2026 pada `santri`.
//
// Sumber kebenaran JS: composables/useIzinGuru.js
//   · `ajukan()`  — TANPA gerbang peran sama sekali: setiap orang yang membuka
//                   halaman Personal melihat tombol "Ajukan".
//   · `isApprover` — isSuperAdmin || isAdminBiasa || isAdminKeuangan || isKepalaLembaga
// Sumber kebenaran SQL: 20260912120000_izin_guru_staff_write.sql (kebijakan) +
//   20260622090500_profiles_rls.sql (daftar peran di dalam auth_is_staff()).
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { isSuperAdmin, isAdminBiasa, isAdminKeuangan, isKepalaLembaga } from '@/utils/roleScope'

const SQL_IZIN = resolve(
  process.cwd(),
  'supabase/migrations/20260912120000_izin_guru_staff_write.sql'
)
const SQL_HELPER = resolve(process.cwd(), 'supabase/migrations/20260622090500_profiles_rls.sql')

// Seluruh nilai `profiles.role_sistem` yang bisa lahir dari handle_new_user
// (lihat pemetaannya di 20260812120000_auth_email_internal_ketat.sql).
const SEMUA_PERAN = ['super_admin', 'admin', 'admin_keuangan', 'guru', 'santri']

// Cermin PERSIS ekspresi `isApprover` di useIzinGuru.js.
function uiPenyetuju(sesi) {
  return isSuperAdmin(sesi) || isAdminBiasa(sesi) || isAdminKeuangan(sesi) || isKepalaLembaga(sesi)
}

// Daftar peran di dalam helper RLS, dibaca dari migrasinya.
function peranHelper(nama) {
  const sql = readFileSync(SQL_HELPER, 'utf8')
  const mulai = sql.indexOf(`create or replace function public.${nama}()`)
  expect(mulai, `helper ${nama}() tak ditemukan di migrasi`).toBeGreaterThan(-1)
  const blok = sql.slice(mulai, sql.indexOf('$$;', mulai))
  const m = blok.match(/auth_role_sistem\(\)\s+in\s+\(([^)]*)\)/)
  expect(m, `daftar peran di ${nama}() tak terbaca`).toBeTruthy()
  return new Set([...m[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]))
}

describe('kebijakan tulis izin_guru memakai auth_is_staff(), bukan auth_can_akademik()', () => {
  const sql = readFileSync(SQL_IZIN, 'utf8')

  it('INSERT dan UPDATE keduanya bersandar pada auth_is_staff()', () => {
    const ins = sql.match(/create policy izin_guru_ins[\s\S]*?;/)
    const upd = sql.match(/create policy izin_guru_upd[\s\S]*?;/)
    expect(ins, 'policy izin_guru_ins tak ditemukan').toBeTruthy()
    expect(upd, 'policy izin_guru_upd tak ditemukan').toBeTruthy()
    expect(ins[0]).toContain('auth_is_staff()')
    expect(upd[0]).toContain('auth_is_staff()')
  })

  it('tak ada sisa auth_can_akademik() — itulah gerbang yang menolak staf kantor', () => {
    // Boleh disebut di komentar (memang dijelaskan panjang di sana), tapi tidak
    // di dalam pernyataan create policy.
    const perintah = sql
      .split('\n')
      .filter((b) => !b.trimStart().startsWith('--'))
      .join('\n')
    expect(perintah).not.toContain('auth_can_akademik()')
  })

  it('DELETE sengaja TIDAK ikut dilebarkan (tetap super_admin di migrasi asal)', () => {
    expect(sql).not.toMatch(/create policy izin_guru_del/)
  })
})

describe('auth_is_staff() memuat setiap peran yang layarnya diberi tombol izin', () => {
  const peran = peranHelper('auth_is_staff')

  it('parser-nya benar-benar membaca daftar peran', () => {
    expect(peran.size).toBeGreaterThanOrEqual(4)
  })

  for (const rs of SEMUA_PERAN.filter((r) => r !== 'santri')) {
    it(`"${rs}" — pegawai yang bisa MENGAJUKAN izin, jadi wajib boleh menulis`, () => {
      // Tombol "Ajukan" tak punya gerbang peran; semua yang bekerja di pondok
      // punya shift, termasuk staf kantor ber-peran admin_keuangan.
      expect(peran.has(rs), `auth_is_staff() belum memuat '${rs}'`).toBe(true)
    })
  }

  it('setiap peran yang isApprover-nya true juga boleh MENULIS keputusannya', () => {
    for (const rs of SEMUA_PERAN) {
      const sesi = { id: 'g1', role_sistem: rs, jabatan: 'Guru' }
      if (!uiPenyetuju(sesi)) continue
      expect(peran.has(rs), `layar memberi tombol Setujui ke '${rs}' tapi RLS menolaknya`).toBe(
        true
      )
    }
  })

  it('kepala lembaga (role_sistem guru + jabatan Kepala) ikut tercakup', () => {
    const kepala = { id: 'g2', role_sistem: 'guru', jabatan: 'Kepala SDI' }
    expect(uiPenyetuju(kepala)).toBe(true)
    expect(peran.has('guru')).toBe(true)
  })

  it('santri/wali TETAP tak boleh menulis izin_guru', () => {
    expect(uiPenyetuju({ id: 's1', role_sistem: 'santri' })).toBe(false)
    expect(peran.has('santri')).toBe(false)
  })
})
