// useRibbonUser — identitas user untuk pita (greeting + kartu user), PERSIS logika web
// DashboardGreeting.vue: welcomeWord (settings.txtWelcome), nama+gelar (getNamaGuruGelar),
// label peran ramah (Administrator / Guru-Pegawai / Santri-Wali). Dipakai bareng titlebar & greeting.
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { getNamaGuruGelar } from '@/utils/format'

const ROLE_LABELS = { admin: 'Administrator', guru: 'Guru/Pegawai', santri: 'Santri/Wali' }

export function useRibbonUser() {
  const auth = useAuthStore()
  const settings = useSettingsStore()
  const { guruRaw } = useGuru()

  const welcomeWord = computed(() => settings.settings?.txtWelcome || 'Ahlan')

  const namaUser = computed(() => {
    const s = auth.sesiAktif
    if (!s) return 'Pengguna'
    if (s.id === 'admin') return 'Administrator'
    if (s.role === 'guru' || s.role === 'admin') return getNamaGuruGelar(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
    return s.nama || s.username || 'Pengguna'
  })

  const roleLabel = computed(() => ROLE_LABELS[auth.sesiAktif?.role] || '—')

  const fotoUrl = computed(() => {
    const s = auth.sesiAktif
    if (!s) return ''
    if (s.foto) return s.foto
    const gid = s.id || s.guru_id
    if (gid && guruRaw.value?.length) {
      const g = guruRaw.value.find((x) => String(x.id) === String(gid))
      return g?.foto || ''
    }
    return ''
  })

  const initials = computed(() => {
    const n = String(auth.sesiAktif?.nama || namaUser.value || '').trim()
    const p = n.split(/\s+/)
    return ((p[0]?.[0] || '') + (p[1]?.[0] || '')).toUpperCase() || (n[0] || '?').toUpperCase()
  })

  return { welcomeWord, namaUser, roleLabel, fotoUrl, initials }
}
