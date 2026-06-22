// v.86.0526: Wali multi-anak — kumpulkan semua santri yang berbagi "no WA wali" yang sama.
// Login santri/wali pakai NIS atau no WA wali (lihat auth.login), jadi anak-anak satu wali
// berbagi field `wa` yang sama. Picker memungkinkan wali beralih konteks antar anak.
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'

const onlyDigits = (v) => String(v || '').replace(/\D/g, '')

export function useWaliChildren() {
  const auth = useAuthStore()
  const { santriRaw } = useSantri()

  const isSantriRole = computed(() => auth.sesiAktif?.role === 'santri')

  // Daftar anak = santri aktif dengan `wa` (no WA wali) sama dengan sesi aktif.
  const children = computed(() => {
    if (!isSantriRole.value) return []
    const wa = onlyDigits(auth.sesiAktif?.wa)
    const myId = String(auth.sesiAktif?.id || '')
    const all = (santriRaw.value || []).filter((s) => s.aktif !== false)
    let list = wa ? all.filter((s) => onlyDigits(s.wa) === wa) : []
    // Anak yang sedang login wajib ikut (kalau wa kosong / tidak match).
    if (!list.some((s) => String(s.id) === myId)) {
      const self = all.find((s) => String(s.id) === myId)
      if (self) list = [self, ...list]
    }
    // Dedup by id, urutkan by nama.
    const seen = new Set()
    return list
      .filter((s) => {
        const k = String(s.id)
        if (seen.has(k)) return false
        seen.add(k)
        return true
      })
      .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
  })

  const hasMultiple = computed(() => children.value.length > 1)
  const activeId = computed(() => String(auth.sesiAktif?.id || ''))

  // Beralih konteks ke anak lain: rebuild sesi santri (sesi AUTH tetap milik akun login wali).
  function switchTo(child) {
    if (!child) return
    const cur = auth.sesiAktif || {}
    if (String(child.id) === String(cur.id)) return
    auth.setSesiAktif({
      id: child.id,
      role: 'santri',
      role_sistem: 'santri',
      nama: child.nama,
      nis: child.nis || '',
      username: child.username || '',
      wa: child.wa || cur.wa || '',
      foto: child.foto || '',
      lembaga: child.lembaga || '',
      kelas: child.kelas || '',
      wali: child.wali || '',
      is_mukim: child.is_mukim === true,
      auth_method: cur.auth_method,
      // v.109 fix: WAJIB pertahankan identitas Supabase Auth (sesi auth TETAP milik akun login).
      //   Tanpa supabase_uid, saat reload baris 286 stores/auth.js anggap sesi basi →
      //   rebuild buildSesi() → balik ke anak pertama (revert).
      supabase_uid: cur.supabase_uid,
      supabase_email: cur.supabase_email,
      firebase_uid: cur.firebase_uid,
      firebase_email: cur.firebase_email
    })
    // v.109 fix: swap sesi in-place bikin banyak view santri nyangkut (santriId di-cache di ref,
    //   watcher tak melacak sesiAktif.id) → SELURUH app loading muter & logout mati. Reload penuh =
    //   boot bersih untuk anak terpilih. Aman: sesi sudah di-persist + supabase_uid match → TIDAK
    //   di-rebuild ke anak pertama.
    window.location.reload()
  }

  return { isSantriRole, children, hasMultiple, activeId, switchTo }
}
