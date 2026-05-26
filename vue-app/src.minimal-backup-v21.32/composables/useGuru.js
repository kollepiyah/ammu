// useGuru — list guru/pegawai real-time + role-based filter + search
// Phase 5.6 (v.35.0526) — mirror pattern dari useSantri.js
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
// v.21.10.0526: Import lembaga helpers
import { getLembagaGroup, canSee } from './useLembaga'

// Helper: derive guru.lembaga_refs dari legacy fields + jabatan_tambahan
// 1 guru bisa multi-lembaga (mis: Admin Yayasan + Guru TPQ).
function deriveGuruLembagaRefs(g) {
  if (Array.isArray(g.lembaga_refs) && g.lembaga_refs.length > 0) return g.lembaga_refs
  const refs = []
  // Primary lembaga
  if (g.lembaga) {
    refs.push({
      group: getLembagaGroup(g.lembaga) || 'qiraati',
      lembaga: g.lembaga,
      shift: g.shift || null,
      jabatan_di_sini: g.jabatan || 'Guru',
      kelas_diajar: Array.isArray(g.kelas_diajar) ? g.kelas_diajar : []
    })
  }
  // Lembaga sekolah (kalau beda dari lembaga utama)
  if (g.lembaga_sekolah && g.lembaga_sekolah !== g.lembaga) {
    refs.push({
      group: getLembagaGroup(g.lembaga_sekolah) || 'sekolah',
      lembaga: g.lembaga_sekolah,
      jabatan_di_sini: g.jabatan_sekolah || 'Guru',
      kelas_diajar: Array.isArray(g.kelas_diajar_sekolah) ? g.kelas_diajar_sekolah : []
    })
  }
  // Jabatan tambahan (legacy): mungkin ref ke lembaga lain (Admin Yayasan dst)
  if (Array.isArray(g.jabatan_tambahan) && g.jabatan_tambahan.length > 0) {
    for (const jt of g.jabatan_tambahan) {
      if (typeof jt === 'string' && jt && !refs.some((r) => r.jabatan_di_sini === jt)) {
        // Heuristic: jabatan Admin/PJ/Supervisi → Yayasan, Keamanan/Kebersihan → Sarana Prasarana
        const lembagaTambahan = /admin|supervisi|pj/i.test(jt)
          ? 'Yayasan'
          : /keamanan|kebersihan/i.test(jt)
            ? 'Sarana Prasarana'
            : null
        if (lembagaTambahan) {
          refs.push({ group: 'non-lembaga', lembaga: lembagaTambahan, jabatan_di_sini: jt })
        }
      }
    }
  }
  return refs
}

// Helper: cek apakah guru adalah Kepala Lembaga (untuk visibility scoping)
function isKepalaLembaga(g, namaLembaga = null) {
  const refs = deriveGuruLembagaRefs(g)
  if (namaLembaga) {
    return refs.some((r) => r.lembaga === namaLembaga && /kepala/i.test(r.jabatan_di_sini || ''))
  }
  return refs.some((r) => /kepala/i.test(r.jabatan_di_sini || ''))
}

const JABATAN_ORDER = {
  'Kepala Lembaga': 1,
  'PJ PTPT': 2,
  'PJ Administrasi': 3,
  Guru: 4,
  Pegawai: 5
}

const LEMBAGA_ORDER = {
  'TPQ Pagi': 1,
  'TPQ Sore': 2,
  'Pra PTPT': 3,
  PTPT: 4,
  Yayasan: 0
}

export function useGuru() {
  const auth = useAuthStore()
  const guruRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsubGuru = null

  // Search & filter state
  const search = ref('')
  const filterLembaga = ref('')
  const filterJabatan = ref('')
  const filterStatus = ref('aktif') // default tampilkan yg aktif saja

  // Role-based access — admin/super_admin only
  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  // Filtered + sorted list
  const guru = computed(() => {
    let list = guruRaw.value.filter(Boolean)

    // Non-admin: tidak boleh lihat data guru
    if (!isFullAccess.value) return []

    // Status filter
    if (filterStatus.value === 'aktif') {
      list = list.filter((g) => {
        const st = String(g.status || 'Aktif')
          .toLowerCase()
          .trim()
        return st === 'aktif'
      })
    } else if (filterStatus.value === 'tidak_aktif') {
      list = list.filter((g) => {
        const st = String(g.status || 'Aktif')
          .toLowerCase()
          .trim()
        return st !== 'aktif'
      })
    }

    // Search filter
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        (g) =>
          String(g.nama || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.wa || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.jabatan || '')
            .toLowerCase()
            .includes(kw) ||
          String(g.username || '')
            .toLowerCase()
            .includes(kw)
      )
    }

    // v.21.24d.0526: Lembaga filter case-insensitive (dedupe varian "TPQ Pagi" vs "TPQ PAGI")
    if (filterLembaga.value) {
      const target = String(filterLembaga.value).toLowerCase()
      list = list.filter((g) => String(g.lembaga || '').toLowerCase() === target)
    }

    // Jabatan filter
    if (filterJabatan.value) {
      list = list.filter((g) => g.jabatan === filterJabatan.value)
    }

    // Sort: jabatan order → lembaga order → nama asc
    return list.sort((a, b) => {
      const oa = JABATAN_ORDER[a.jabatan] || 99
      const ob = JABATAN_ORDER[b.jabatan] || 99
      if (oa !== ob) return oa - ob
      const la = LEMBAGA_ORDER[a.lembaga] !== undefined ? LEMBAGA_ORDER[a.lembaga] : 99
      const lb = LEMBAGA_ORDER[b.lembaga] !== undefined ? LEMBAGA_ORDER[b.lembaga] : 99
      if (la !== lb) return la - lb
      return String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
    })
  })

  // Stats berbasis seluruh data (bukan filter)
  const stats = computed(() => {
    const all = guruRaw.value.filter(Boolean)
    const aktif = all.filter((g) => {
      const st = String(g.status || 'Aktif')
        .toLowerCase()
        .trim()
      return st === 'aktif'
    })
    const perLembaga = aktif.reduce((acc, g) => {
      const k = g.lembaga || '—'
      acc[k] = (acc[k] || 0) + 1
      return acc
    }, {})
    return {
      total: all.length,
      aktif: aktif.length,
      tidakAktif: all.length - aktif.length,
      perLembaga
    }
  })

  onMounted(() => {
    unsubGuru = subscribeColl('guru', (docs) => {
      guruRaw.value = docs
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubGuru) {
      try {
        unsubGuru()
      } catch (e) {}
      unsubGuru = null
    }
  })

  return {
    guru,
    guruRaw,
    loading,
    search,
    filterLembaga,
    filterJabatan,
    filterStatus,
    stats,
    isFullAccess,
    canSee,
    deriveGuruLembagaRefs,
    isKepalaLembaga
  }
}
