<template>
  <!-- v.67.0526: Ahlan card + logo app terpotong di kanan (variant A, lebih masuk ke kiri) -->
  <div
    class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3"
  >
    <!-- Dekorasi: logo app (Mambaul Ulum) di kanan, terpotong sebagian, opacity rendah -->
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      class="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 h-24 md:h-32 w-auto opacity-[0.18] pointer-events-none select-none object-contain"
    />

    <!-- Avatar -->
    <div
      class="relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 border-2 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0"
    >
      <img v-if="fotoUrl" :src="fotoUrl" alt="Foto" class="w-full h-full object-cover" />
      <i v-else :class="['fas', iconRole, 'text-teal-600 dark:text-teal-200 text-sm']"></i>
    </div>

    <!-- Text content -->
    <div class="relative z-10 flex-1 min-w-0">
      <h2
        class="text-sm md:text-base font-black text-teal-700 dark:text-teal-300 leading-tight truncate"
      >
        {{ welcomeWord }}, {{ namaUser }}!
      </h2>
      <div class="flex items-center gap-2 text-[10px] md:text-xs mt-0.5">
        <span class="text-slate-500 dark:text-slate-400">Masuk sebagai:</span>
        <span
          class="text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border"
          :class="roleStyle"
        >
          {{ roleLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { getNamaGuruGelar } from '@/utils/format'
const { guruRaw } = useGuru()

const auth = useAuthStore()
const settings = useSettingsStore()
// v.20.58.0526: sapaan dari settings.txtWelcome (admin set di Pengaturan Web)
const welcomeWord = computed(() => settings.settings?.txtWelcome || 'Ahlan')

const fotoUrl = computed(() => {
  // v.20.77: fallback foto dari guru record kalau sesi.foto kosong (admin-promoted-guru)
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

const namaUser = computed(() => {
  const s = auth.sesiAktif
  if (!s) return 'User'
  // v.20.74.0526: BUGFIX — guru ber-role_sistem (super_admin/admin/admin_keuangan) di-promote ke role='admin',
  // tapi nama asli tetap di s.nama. Sebelumnya widget hardcoded 'Administrator' untuk SEMUA role=admin
  // → akun kayak 'kollepiyah' (guru dipromote) salah di-greet 'Ahlan, Administrator!'.
  // Fix: 'Administrator' literal hanya untuk built-in admin (id==='admin'), selainnya pakai nama asli.
  if (s.id === 'admin') return 'Administrator'
  if (s.role === 'guru' || s.role === 'admin')
    return getNamaGuruGelar(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
  return s.nama || s.username || '—'
})

const ROLE_LABELS = {
  admin: 'Administrator',
  guru: 'Guru/Pegawai',
  santri: 'Santri/Wali'
}
const roleLabel = computed(() => ROLE_LABELS[auth.sesiAktif?.role] || '—')

const ROLE_STYLES = {
  admin:
    'bg-teal-50 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700',
  guru: 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
  santri:
    'bg-cyan-50 text-cyan-700 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700'
}
const roleStyle = computed(
  () => ROLE_STYLES[auth.sesiAktif?.role] || ROLE_STYLES[auth.sesiAktif?.role] || ROLE_STYLES.santri
)

const iconRole = computed(() => {
  if (auth.sesiAktif?.role === 'admin') return 'fa-user-shield'
  if (auth.sesiAktif?.role === 'guru') return 'fa-chalkboard-teacher'
  return 'fa-user-graduate'
})
</script>
