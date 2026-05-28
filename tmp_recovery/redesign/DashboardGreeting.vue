<template>
  <!-- v.21.80.0526: Greeting Pesantren Modern — olive gradient bg + gold badge accents -->
  <div
    class="relative overflow-hidden rounded-[var(--radius-lg)] px-3 py-2.5 md:px-4 md:py-3 border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] flex items-center gap-3 ammu-greet"
  >
    <!-- Dekorasi: logo app (Mambaul Ulum) di kanan, terpotong sebagian, opacity rendah (gold tint) -->
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      class="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 h-24 md:h-32 w-auto opacity-[0.18] pointer-events-none select-none object-contain"
    />

    <!-- Avatar (gold ring) -->
    <div
      class="relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-[var(--radius-full)] bg-[var(--color-accent-soft)] border-2 border-[var(--color-accent)] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
    >
      <img v-if="fotoUrl" :src="fotoUrl" alt="Foto" class="w-full h-full object-cover" />
      <i v-else :class="['fas', iconRole, 'text-[var(--color-primary)] text-sm']"></i>
    </div>

    <!-- Text content -->
    <div class="relative z-10 flex-1 min-w-0">
      <h2 class="text-sm md:text-base font-black text-white leading-tight truncate drop-shadow">
        {{ welcomeWord }}, {{ namaUser }}!
      </h2>
      <div class="flex items-center gap-2 text-[10px] md:text-xs mt-0.5">
        <span class="text-[#FAF1DC]/85">Masuk sebagai:</span>
        <span
          class="text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-[var(--radius-full)] uppercase tracking-wider border"
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
const welcomeWord = computed(() => settings.settings?.txtWelcome || 'Ahlan')

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

const namaUser = computed(() => {
  const s = auth.sesiAktif
  if (!s) return 'User'
  if (s.id === 'admin') return 'Administrator'
  if (s.role === 'guru' || s.role === 'admin') return getNamaGuruGelar(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
  return s.nama || s.username || '—'
})

const ROLE_LABELS = {
  admin: 'Administrator',
  guru: 'Guru/Pegawai',
  santri: 'Santri/Wali'
}
const roleLabel = computed(() => ROLE_LABELS[auth.sesiAktif?.role] || '—')

// v.21.80.0526: pakai gold accent + olive untuk seluruh role (warna sistem unified)
const ROLE_STYLES = {
  admin: 'bg-[#D4AF5C]/25 text-[#FAF1DC] border-[#D4AF5C]/60',
  guru: 'bg-[#D4AF5C]/20 text-[#FAF1DC] border-[#D4AF5C]/50',
  santri: 'bg-[#FAF1DC]/15 text-[#FAF1DC] border-[#FAF1DC]/40'
}
const roleStyle = computed(() => ROLE_STYLES[auth.sesiAktif?.role] || ROLE_STYLES.santri)

const iconRole = computed(() => {
  if (auth.sesiAktif?.role === 'admin') return 'fa-user-shield'
  if (auth.sesiAktif?.role === 'guru') return 'fa-chalkboard-teacher'
  return 'fa-user-graduate'
})
</script>

<style scoped>
.ammu-greet {
  background: linear-gradient(135deg, #2F4F2F 0%, #264026 100%);
}
:global(.dark) .ammu-greet,
.dark-mode .ammu-greet {
  background: linear-gradient(135deg, #14201A 0%, #0F1A0F 100%);
}
</style>
