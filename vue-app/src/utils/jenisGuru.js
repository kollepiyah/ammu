// Jenis guru untuk penyaring Data Guru (Kyai, 16 Nov 2026): Qiraati-Sekolah / Qiraati / Sekolah /
//   Pegawai. Dibaca dari lembaga ngaji (`lembaga`) & sekolah (`lembaga_sekolah`) yang tercatat di
//   data guru — jenis tiap lembaga dari master/lembaga (groupOfLembaga), bukan daftar nama tetap.
import { groupOfLembaga } from '@/composables/useLembaga'

export const JENIS_GURU_OPTS = [
  { value: 'qiraati_sekolah', label: 'Qiraati-Sekolah' },
  { value: 'qiraati', label: 'Qiraati' },
  { value: 'sekolah', label: 'Sekolah' },
  { value: 'pegawai', label: 'Pegawai' }
]

/**
 * Pengajar atau pegawai non-pengajar? Utamakan `tipe_pegawai` (guru/pegawai/pegawai_guru + legacy
 * ngaji/sekolah); bila kosong/asing, tebak dari jabatan. (Dipindah utuh dari GuruView v.100.)
 */
export function isPengajar(g) {
  const t = String(g?.tipe_pegawai || '')
    .toLowerCase()
    .trim()
  if (['guru', 'pegawai_guru', 'ngaji', 'ngaji_sekolah', 'sekolah'].includes(t)) return true
  if (['pegawai', 'admin'].includes(t)) return false
  const j = (String(g?.jabatan || '') + ' ' + String(g?.jabatan_tambahan || '')).toLowerCase()
  return /guru|ustadz|ustadzah|pengajar|mu.?allim|mudarr?is|asatidz|wali\s*kelas|kepala|pengasuh/.test(
    j
  )
}

/** 'qiraati_sekolah' | 'qiraati' | 'sekolah' | 'pegawai' | '' (pengajar tanpa lembaga dikenal). */
export function jenisGuru(g, lembagaList) {
  if (!isPengajar(g)) return 'pegawai'
  const grup = [g?.lembaga, g?.lembaga_sekolah]
    .map((x) => String(x || '').trim())
    .filter(Boolean)
    .map((n) => groupOfLembaga(n, lembagaList))
  const q = grup.includes('qiraati')
  const s = grup.includes('sekolah')
  return q && s ? 'qiraati_sekolah' : q ? 'qiraati' : s ? 'sekolah' : ''
}
