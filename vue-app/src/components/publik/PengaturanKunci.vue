<template>
  <!-- Sakelar kunci sidik jari / Face ID — dipakai tab Pengaturan Portal & Pengaturan publik. -->
  <div>
    <label
      class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer"
    >
      <span class="min-w-0">
        <span class="block text-xs font-bold text-[var(--text-primary)]">
          <i class="fas fa-fingerprint text-teal-600 mr-1.5"></i>Kunci dengan sidik jari / Face ID
        </span>
        <span class="block text-[11px] text-[var(--text-secondary)] mt-0.5">
          Portal terkunci saat aplikasi dibuka atau ditinggal lebih dari 3 menit.
        </span>
      </span>
      <input
        type="checkbox"
        class="w-5 h-5 accent-teal-600 shrink-0"
        :checked="kunci.aktif"
        :disabled="sibuk"
        @change="ubah($event)"
      />
    </label>
    <p
      v-if="pesan"
      class="text-[11px] mt-2"
      :class="berhasil ? 'text-teal-700 dark:text-teal-300' : 'text-rose-600 dark:text-rose-300'"
    >
      {{ pesan }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useKunciAplikasiStore } from '@/stores/kunciAplikasi'

const kunci = useKunciAplikasiStore()
const sibuk = ref(false)
const pesan = ref('')
const berhasil = ref(false)

async function ubah(e) {
  const mau = e.target.checked
  pesan.value = ''
  if (!mau) {
    kunci.nonaktifkan()
    berhasil.value = true
    pesan.value = 'Kunci dimatikan.'
    return
  }
  sibuk.value = true
  try {
    const r = await kunci.aktifkan()
    berhasil.value = r.ok
    pesan.value = r.pesan
    if (!r.ok) e.target.checked = false
  } finally {
    sibuk.value = false
  }
}
</script>
