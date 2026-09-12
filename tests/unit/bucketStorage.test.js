// PENJAGA CERMIN — rute "prefix path → bucket" (JS) vs kebijakan tulis bucket (SQL).
//
// Keduanya menjawab pertanyaan yang sama dari dua sisi: JS memilih RAK, SQL
// menentukan SIAPA yang boleh menaruh barang di rak itu. Ketika keduanya tak
// sepakat, yang muncul di layar pengguna adalah "new row violates row-level
// security policy" — kalimat yang terbaca seolah datanya yang salah.
//
// Itulah yang terjadi pada lampiran izin: `izin_lampiran/` tak terdaftar di rute
// mana pun, jatuh ke DEFAULT `branding`, dan `branding` hanya boleh ditulis
// super_admin/admin. Guru yang melampirkan surat dokter selalu ditolak — diam
// sejak fitur itu lahir, karena yang mengetesnya selalu admin.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { bucketUntukPath, BUCKET_TULIS_ADMIN } from '@/utils/bucketStorage'

const SQL_PATH = resolve(process.cwd(), 'supabase/migrations/20260622092000_storage_policies.sql')

// Bucket yang policy INSERT-nya menuntut auth_can_manage(), dibaca dari migrasinya.
function bucketAdminDariSql() {
  const sql = readFileSync(SQL_PATH, 'utf8')
  const out = new Set()
  for (const baris of sql.split('\n')) {
    if (!/create policy .* for insert/i.test(baris)) continue
    if (!/auth_can_manage\(\)/.test(baris)) continue
    const m = baris.match(/bucket_id\s*=\s*'([a-z0-9_-]+)'/i)
    if (m) out.add(m[1])
  }
  return out
}

describe('BUCKET_TULIS_ADMIN = daftar bucket admin-only di migrasi storage', () => {
  it('parser-nya benar-benar menemukan sesuatu (jangan lolos diam-diam)', () => {
    expect(bucketAdminDariSql().size).toBeGreaterThan(0)
  })

  it('daftar di JS sama persis dengan kebijakan INSERT di SQL', () => {
    expect([...bucketAdminDariSql()].sort()).toEqual([...BUCKET_TULIS_ADMIN].sort())
  })
})

describe('bucketUntukPath — prefix yang ditulis PENGGUNA BIASA tak boleh ke rak admin', () => {
  // Setiap prefix di sini diunggah oleh orang yang BUKAN super_admin/admin:
  // guru, pegawai, santri, atau wali. Kalau salah satunya mendarat di bucket
  // admin-only, unggahannya pasti ditolak RLS.
  const PREFIX_PENGGUNA = [
    'izin_lampiran/izin_1757_ab12.jpg', // lampiran izin/sakit/cuti — guru & pegawai
    'izin_lampiran/izin_1757_ab12.pdf', // surat dokter dalam PDF
    'profil_foto/guru_7_1757.jpg', // foto profil sendiri
    'tanda_tangan/guru_7_1757.png', // tanda tangan sendiri
    'pembayaran_transfer/trf_1757_s9.pdf' // bukti transfer wali santri
  ]

  for (const p of PREFIX_PENGGUNA) {
    it(`"${p.split('/')[0]}" tidak dirutekan ke bucket admin-only`, () => {
      expect(BUCKET_TULIS_ADMIN).not.toContain(bucketUntukPath(p))
    })
  }

  it('lampiran izin mendarat di bucket dokumen (psb), yang terbukti menerima PDF', () => {
    expect(bucketUntukPath('izin_lampiran/izin_1.pdf')).toBe('psb')
  })
})

describe('bucketUntukPath — rute lama tidak boleh bergeser', () => {
  it('foto & gambar tetap ke photo', () => {
    expect(bucketUntukPath('profil_foto/guru_1.jpg')).toBe('photo')
    expect(bucketUntukPath('tanda_tangan/guru_1.png')).toBe('photo')
    expect(bucketUntukPath('beranda_post/p1/1_0_a.jpg')).toBe('photo')
  })

  it('dokumen pendaftaran & unggahan wali tetap ke psb', () => {
    expect(bucketUntukPath('pembayaran_transfer/trf_1.jpg')).toBe('psb')
    expect(bucketUntukPath('psb/berkas_1.pdf')).toBe('psb')
    expect(bucketUntukPath('lembaga/3/syarat_ketentuan_1.pdf')).toBe('psb')
    expect(bucketUntukPath('dokumen/apa_saja.pdf')).toBe('psb')
  })

  it('aset milik admin tetap ke branding — termasuk yang MIRIP prefix psb', () => {
    // `lembaga_logos` sengaja TIDAK cocok `lembaga/`: pemisahnya garis miring.
    expect(bucketUntukPath('lembaga_logos/kop_3_1.png')).toBe('branding')
    expect(bucketUntukPath('app_logos/logoQiraati_1.png')).toBe('branding')
    expect(bucketUntukPath('bg_rapor/tpq_1.png')).toBe('branding')
  })

  it('path kosong/aneh tidak meledak', () => {
    expect(bucketUntukPath('')).toBe('branding')
    expect(bucketUntukPath(null)).toBe('branding')
    expect(bucketUntukPath(undefined)).toBe('branding')
  })
})
