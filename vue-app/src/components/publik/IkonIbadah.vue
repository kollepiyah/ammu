<template>
  <!-- Kyai 25 Nov 2026: ikon ibadah bergaya 3D (gradasi + kilau + bayangan) seperti NU Online.
       Digambar sendiri sebagai SVG — tanpa aset luar. -->
  <svg viewBox="0 0 48 48" class="ikon-ibadah" aria-hidden="true">
    <defs>
      <radialGradient id="ii-latar" cx="35%" cy="30%" r="75%">
        <stop offset="0" stop-color="#3a4250" />
        <stop offset="1" stop-color="#1c2129" />
      </radialGradient>
      <linearGradient id="ii-hijau" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2dd4bf" />
        <stop offset="1" stop-color="#0f766e" />
      </linearGradient>
      <linearGradient id="ii-kertas" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fffbeb" />
        <stop offset="1" stop-color="#f5e6c4" />
      </linearGradient>
      <linearGradient id="ii-emas" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fde68a" />
        <stop offset="1" stop-color="#d97706" />
      </linearGradient>
      <linearGradient id="ii-merah" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fb7185" />
        <stop offset="1" stop-color="#be123c" />
      </linearGradient>
      <linearGradient id="ii-kayu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b45309" />
        <stop offset="1" stop-color="#78350f" />
      </linearGradient>
    </defs>
    <!-- lingkaran dasar + kilau -->
    <circle cx="24" cy="24" r="23" :fill="latar" />
    <ellipse cx="18" cy="12" rx="12" ry="6" fill="#fff" opacity="0.08" />

    <!-- Al-Qur'an: mushaf terbuka di atas rehal -->
    <g v-if="jenis === 'quran'">
      <path d="M13 33 L24 38 L35 33 L33 36 L24 41 L15 36 Z" fill="url(#ii-kayu)" />
      <path d="M11 15 Q17 13 24 16 L24 34 Q17 31 11 33 Z" fill="url(#ii-hijau)" />
      <path d="M37 15 Q31 13 24 16 L24 34 Q31 31 37 33 Z" fill="url(#ii-hijau)" />
      <path d="M12.5 16 Q18 14.5 23.3 17 L23.3 32.3 Q18 30 12.5 31.6 Z" fill="url(#ii-kertas)" />
      <path d="M35.5 16 Q30 14.5 24.7 17 L24.7 32.3 Q30 30 35.5 31.6 Z" fill="url(#ii-kertas)" />
      <path
        d="M15 20 h6 M15 23 h6 M15 26 h6 M27 20 h6 M27 23 h6 M27 26 h6"
        stroke="#b08d57"
        stroke-width="0.9"
        stroke-linecap="round"
      />
    </g>

    <!-- Wirid: tasbih -->
    <g v-else-if="jenis === 'wirid'">
      <circle
        v-for="(t, i) in manik"
        :key="i"
        :cx="t[0]"
        :cy="t[1]"
        r="2.6"
        fill="url(#ii-hijau)"
        stroke="#0b4f4a"
        stroke-width="0.4"
      />
      <path d="M24 35 L24 39" stroke="#d97706" stroke-width="1.6" />
      <path d="M21.5 39 L26.5 39 L25.5 44 L22.5 44 Z" fill="url(#ii-emas)" />
    </g>

    <!-- Kiblat: kompas dengan Ka'bah -->
    <g v-else-if="jenis === 'kiblat'">
      <circle cx="24" cy="25" r="15" fill="url(#ii-hijau)" />
      <circle cx="24" cy="25" r="12" fill="#f8fafc" />
      <path d="M24 9 L26.5 15 L21.5 15 Z" fill="url(#ii-emas)" />
      <path d="M18 21 L24 18.5 L30 21 L30 30 L24 32.5 L18 30 Z" fill="#111827" />
      <path d="M18 21 L24 23.5 L30 21" fill="none" stroke="#374151" stroke-width="0.8" />
      <path d="M18 24.2 L24 26.7 L30 24.2" fill="none" stroke="url(#ii-emas)" stroke-width="1.6" />
      <path d="M24 23.5 L24 32.5" stroke="#374151" stroke-width="0.6" />
    </g>

    <!-- Jadwal sholat: jam -->
    <g v-else-if="jenis === 'sholat'">
      <circle cx="24" cy="25" r="15" fill="url(#ii-hijau)" />
      <circle cx="24" cy="25" r="12" fill="#f8fafc" />
      <g stroke="#0f766e" stroke-width="1.2" stroke-linecap="round">
        <path d="M24 15 v2 M24 33 v2 M14 25 h2 M32 25 h2" />
      </g>
      <path d="M24 25 L24 18.5" stroke="#111827" stroke-width="1.8" stroke-linecap="round" />
      <path d="M24 25 L29 28" stroke="#be123c" stroke-width="1.6" stroke-linecap="round" />
      <circle cx="24" cy="25" r="1.6" fill="#111827" />
    </g>

    <!-- Agenda: kalender -->
    <g v-else-if="jenis === 'agenda'">
      <rect x="12" y="14" width="24" height="23" rx="4" fill="#f8fafc" />
      <path d="M12 18 a4 4 0 0 1 4 -4 h16 a4 4 0 0 1 4 4 v4 h-24 Z" fill="url(#ii-merah)" />
      <rect x="17" y="11" width="2.6" height="6" rx="1.3" fill="#e2e8f0" />
      <rect x="28.4" y="11" width="2.6" height="6" rx="1.3" fill="#e2e8f0" />
      <path
        d="M19 29 l3.5 3.5 L29.5 25.5"
        fill="none"
        stroke="#0f766e"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui'

defineProps({ jenis: { type: String, required: true } })
const ui = useUiStore()
// Lingkaran dasar mengikuti tema: gelap di mode gelap, lembut di mode terang.
const latar = computed(() => (ui.isDark ? 'url(#ii-latar)' : '#e6f4f1'))
// Manik tasbih melingkar (titik-titik pada lingkaran r=10 di (24,22)).
const manik = Array.from({ length: 11 }, (_, i) => {
  const a = Math.PI / 2 + (i / 11) * Math.PI * 2 + Math.PI / 11
  return [24 + 10 * Math.cos(a), 22 + 10 * Math.sin(a)]
})
</script>

<style scoped>
.ikon-ibadah {
  width: 3.25rem;
  height: 3.25rem;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.28));
}
</style>
