<!--
  v.20.70.0526 — UiActionCard: shared action card with gradient + icon + title + subtitle.
  Used across PengaturanView, MasterDataView, LembagaDetailView, RaporView, NaikKelasView,
  AbsensiGuruView mode picker, KegiatanPesantrenView tab picker, etc.

  Props:
    icon (string)        FontAwesome class (e.g. "fas fa-cog")
    title (string)       Bold heading
    subtitle (string)    Optional small description (hidden md:block)
    gradient (string)    Tailwind gradient stops, default "from-teal-500 to-teal-700"
    active (boolean)     If true → ring highlight
  Slots:
    default              Optional additional content (e.g. badge)
  Events:
    @click
-->
<template>
  <button
    @click="$emit('click', $event)"
    :class="[
      'group relative overflow-hidden rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-1 cursor-pointer bg-gradient-to-br',
      gradient,
      active ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50' : ''
    ]"
  >
    <i :class="[icon, 'text-base md:text-lg drop-shadow']"></i>
    <h3 class="text-[11px] md:text-xs font-black leading-tight drop-shadow-sm">{{ title }}</h3>
    <p v-if="subtitle" class="hidden md:block text-[10px] text-white/85 font-medium leading-snug">{{ subtitle }}</p>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'fas fa-circle' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  gradient: { type: String, default: 'from-teal-500 to-teal-700' },
  active: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>
