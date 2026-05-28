<!--
  v.20.70.0526 — UiActionCard: shared action card with gradient + icon + title + subtitle.
  Refactored to use CSS variable design tokens (Pesantren Modern — Olive + Gold).
  Used across PengaturanView, MasterDataView, LembagaDetailView, RaporView, NaikKelasView,
  AbsensiGuruView mode picker, KegiatanPesantrenView tab picker, etc.

  Props:
    icon (string)        FontAwesome class (e.g. "fas fa-cog")
    title (string)       Bold heading
    subtitle (string)    Optional small description (hidden md:block)
    gradient (string)    Tailwind gradient stops; empty → fallback olive primary gradient via CSS var
    active (boolean)     If true → ring highlight (gold accent)
  Slots:
    default              Optional additional content (e.g. badge)
  Events:
    @click
-->
<template>
  <button
    :style="!gradient ? `background-image: linear-gradient(to bottom right, var(--color-primary), var(--color-primary-hover));` : null"
    :class="[
      'group relative overflow-hidden rounded-[var(--radius-lg)] p-2.5 md:p-3 text-left text-[var(--text-on-primary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-1 cursor-pointer',
      gradient ? `bg-gradient-to-br ${gradient}` : '',
      active ? 'ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--bg-page)]' : ''
    ]"
    @click="$emit('click', $event)"
  >
    <i :class="[icon, 'text-base md:text-lg drop-shadow']"></i>
    <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">
      {{ title }}
    </h3>
    <p
      v-if="subtitle"
      class="hidden md:block text-[10px] text-white/85 font-medium leading-snug"
    >
      {{ subtitle }}
    </p>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'fas fa-circle' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  gradient: { type: String, default: '' },
  active: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>
