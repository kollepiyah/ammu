// useSupabaseImport.js — F3: orkestrasi impor Excel master -> Supabase.
// useExcel.importFile (parsing File) + importMap (mapper murni) + supabase upsert.
// Target: santri, guru, rekap_prestasi. COMMIT butuh sesi Supabase admin (RLS) ->
// aktif penuh setelah skema di-apply (F2) + auth cutover (F5). Preview JALAN sekarang.
import { ref } from 'vue'
import { useExcel } from './useExcel'
import { parseRows } from '@/services/importMap'
import { supabase, isSupabaseReady } from '@/services/supabase'

const TABLE = { santri: 'santri', guru: 'guru', prestasi: 'rekap_prestasi' }
const _norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim()

export function useSupabaseImport() {
  const { importFile } = useExcel()
  const preview = ref(null) // { type, rows, skipped, duplicates, total }
  const busy = ref(false)
  const error = ref('')
  const result = ref('')

  /** Baca File Excel -> mapper -> preview (client-side; tak sentuh DB). */
  async function loadPreview(file, type) {
    busy.value = true; error.value = ''; result.value = ''; preview.value = null
    try {
      const raw = await importFile(file)
      preview.value = { type, ...parseRows(raw, type) }
      return preview.value
    } catch (e) {
      error.value = e?.message || String(e); throw e
    } finally {
      busy.value = false
    }
  }

  /** Upsert preview ke Supabase (batch). Butuh sesi admin (RLS). */
  async function commit() {
    if (!preview.value) throw new Error('Belum ada preview.')
    if (!isSupabaseReady()) throw new Error('Supabase belum dikonfigurasi (.env.local) — aktif setelah F5.')
    const { type, rows } = preview.value
    busy.value = true; error.value = ''; result.value = ''
    try {
      let toWrite = rows
      if (type === 'prestasi') {
        const map = await _santriNameMap()
        toWrite = rows.map((r) => ({ ...r, santri_id: map.get(_norm(r.data.santri_nama)) || null }))
      }
      const table = TABLE[type]
      const CHUNK = 500
      let done = 0
      for (let i = 0; i < toWrite.length; i += CHUNK) {
        const batch = toWrite.slice(i, i + CHUNK)
        const { error: e } = await supabase.from(table).upsert(batch, { onConflict: 'id' })
        if (e) throw e
        done += batch.length
      }
      result.value = `Berhasil impor ${done} baris ke "${table}".`
      return done
    } catch (e) {
      error.value = e?.message || String(e); throw e
    } finally {
      busy.value = false
    }
  }

  // Peta nama santri -> id (utk resolve santri_id prestasi). Page 1000/baca.
  async function _santriNameMap() {
    const map = new Map()
    let from = 0
    const PAGE = 1000
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data, error: e } = await supabase.from('santri').select('id,nama').range(from, from + PAGE - 1)
      if (e) throw e
      if (!data || data.length === 0) break
      for (const s of data) map.set(_norm(s.nama), s.id)
      if (data.length < PAGE) break
      from += PAGE
    }
    return map
  }

  return { preview, busy, error, result, loadPreview, commit, isReady: isSupabaseReady }
}
