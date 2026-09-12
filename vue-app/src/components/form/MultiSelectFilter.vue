<template>
  <div ref="akar" class="relative">
    <!-- Pemicu: tampak seperti <select> lain di bilah penyaring, supaya deretannya rata -->
    <button
      type="button"
      :class="[
        'w-full px-3 py-2.5 text-sm rounded-xl border text-left flex items-center justify-between gap-2 transition',
        terpilih.length
          ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/20'
          : 'border-[var(--border-default)] bg-[var(--bg-card-elevated)]'
      ]"
      :aria-expanded="buka"
      aria-haspopup="listbox"
      @click="buka = !buka"
    >
      <span class="truncate text-[var(--text-primary)]">{{ ringkasan }}</span>
      <span class="flex items-center gap-1.5 flex-shrink-0">
        <span
          v-if="terpilih.length"
          class="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-teal-600 text-white"
          >{{ terpilih.length }}</span
        >
        <i
          :class="[
            'fas text-xs text-[var(--text-tertiary)]',
            buka ? 'fa-chevron-up' : 'fa-chevron-down'
          ]"
        ></i>
      </span>
    </button>

    <div
      v-if="buka"
      class="absolute z-30 mt-1 w-full bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl shadow-xl max-h-80 overflow-hidden flex flex-col"
    >
      <div class="p-2 border-b border-[var(--border-subtle)] flex items-center gap-2">
        <input
          v-model="cari"
          type="search"
          :placeholder="placeholderCari"
          class="flex-1 min-w-0 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
        />
        <button
          v-if="terpilih.length"
          type="button"
          class="text-[10px] font-bold text-rose-600 hover:underline flex-shrink-0"
          @click="kosongkan"
        >
          Bersihkan
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-1.5 space-y-0.5" role="listbox">
        <p
          v-if="!tersaring.length"
          class="text-xs text-[var(--text-tertiary)] italic text-center py-4"
        >
          {{ cari ? 'Tidak ada yang cocok.' : kosongLabel }}
        </p>
        <label
          v-for="o in tersaring"
          :key="o.nilai"
          class="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20"
        >
          <input
            type="checkbox"
            class="w-4 h-4 accent-teal-600 flex-shrink-0"
            :checked="dipilih(o.nilai)"
            @change="ubah(o.nilai, $event.target.checked)"
          />
          <span class="text-sm text-[var(--text-primary)] truncate">{{ o.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
// MultiSelectFilter — penyaring daftar yang boleh dicentang LEBIH DARI SATU.
//
// Kyai, 12 Sep 2026: _"untuk filter kelas (nama guru) saya ingin diubah jadi bisa centang,
// jadi bisa tampil kelas dari beberapa guru."_ Dengan `<select>` tunggal, membandingkan
// dua rombel yang bersebelahan berarti membuka-tutup penyaring berkali-kali.
//
// Sengaja dibuat GENERIK (bukan khusus guru) supaya penyaring berikutnya yang perlu
// centang tak melahirkan komponen kembar — repo ini sudah punya dua MultiSelect yang
// mirip tapi terikat ke guru + shift.
//
// v-model = LARIK nilai. Tampilannya meniru `<select>` di bilah penyaring supaya
// deretan penyaringnya tetap rata.
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  // [{ nilai, label }] — pemanggil yang menyusun labelnya (mis. "+ 11 santri").
  options: { type: Array, default: () => [] },
  label: { type: String, default: 'Pilih' },
  semuaLabel: { type: String, default: 'Semua' },
  kosongLabel: { type: String, default: 'Belum ada pilihan.' },
  placeholderCari: { type: String, default: 'Cari…' }
})
const emit = defineEmits(['update:modelValue'])

const buka = ref(false)
const cari = ref('')
const akar = ref(null)

const terpilih = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))
const dipilih = (v) => terpilih.value.includes(v)

const tersaring = computed(() => {
  const kw = cari.value.trim().toLowerCase()
  if (!kw) return props.options
  return props.options.filter((o) =>
    String(o.label || '')
      .toLowerCase()
      .includes(kw)
  )
})

// Ringkasan di tombol: satu pilihan tampil namanya, lebih dari satu diringkas —
// nama rombel di sini panjang-panjang ("Ni'matur Rizkiyah S.Sos.I & Dewi Nur Sandika Puri").
const ringkasan = computed(() => {
  const n = terpilih.value.length
  if (n === 0) return props.semuaLabel
  if (n === 1) {
    const o = props.options.find((x) => x.nilai === terpilih.value[0])
    return o ? o.label : terpilih.value[0]
  }
  return `${n} ${props.label} dipilih`
})

function ubah(nilai, aktif) {
  const set = new Set(terpilih.value)
  if (aktif) set.add(nilai)
  else set.delete(nilai)
  emit('update:modelValue', [...set])
}
function kosongkan() {
  emit('update:modelValue', [])
}

// Klik di luar menutup panel. Tanpa ini panel menutupi kartu santri di bawahnya dan
// satu-satunya jalan keluar adalah menekan pemicunya lagi.
function onKlikLuar(e) {
  if (!buka.value) return
  if (akar.value && !akar.value.contains(e.target)) buka.value = false
}
onMounted(() => document.addEventListener('click', onKlikLuar, true))
onUnmounted(() => document.removeEventListener('click', onKlikLuar, true))
</script>
