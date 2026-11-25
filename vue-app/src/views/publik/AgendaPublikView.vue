<template>
  <!-- Agenda publik (blueprint §3.3 / F4): daftar tanpa kalender, hanya agenda yang ditandai
       admin "Tampilkan di Agenda publik". Tarik sekali tanpa realtime (useKegiatan publik). -->
  <div class="max-w-xl mx-auto">
    <div class="flex gap-2 px-4 py-3 overflow-x-auto">
      <button
        v-for="s in SARING_AGENDA"
        :key="s.kunci"
        type="button"
        class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer"
        :class="
          saring === s.kunci
            ? 'bg-teal-600 border-teal-600 text-white'
            : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
        "
        @click="saring = s.kunci"
      >
        {{ s.label }}
      </button>
    </div>

    <p v-if="loading" class="text-center text-sm text-[var(--text-secondary)] py-10">
      <i class="fas fa-spinner fa-spin mr-1.5"></i>Memuat agenda…
    </p>
    <p v-else-if="!kelompok.length" class="text-center text-sm text-[var(--text-secondary)] py-10">
      Belum ada agenda {{ saring === 'akan' ? 'yang akan datang' : 'bulan ini' }}.
    </p>

    <section v-for="g in kelompok" :key="g.kunci" class="pb-2">
      <h3
        class="px-4 pt-3 pb-1 text-[11px] font-black tracking-wider uppercase text-[var(--text-secondary)]"
      >
        {{ g.label }}
      </h3>
      <div
        v-for="a in g.item"
        :key="a.id"
        class="flex items-start gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800"
      >
        <div
          class="shrink-0 w-12 rounded-xl overflow-hidden text-center border"
          :class="
            a.jenis === 'libur'
              ? 'border-rose-200 dark:border-rose-800'
              : 'border-teal-200 dark:border-teal-800'
          "
        >
          <p
            class="text-[10px] font-black text-white py-0.5"
            :class="a.jenis === 'libur' ? 'bg-rose-500' : 'bg-teal-600'"
          >
            {{ a.bulanPendek }}
          </p>
          <p
            class="text-lg font-black py-1"
            :class="
              a.jenis === 'libur'
                ? 'text-rose-600 dark:text-rose-300'
                : 'text-teal-700 dark:text-teal-300'
            "
          >
            {{ a.hari }}
          </p>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold text-[var(--text-primary)] leading-snug">{{ a.judul }}</p>
          <p class="text-[11px] text-[var(--text-secondary)] mt-0.5 flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full font-bold" :class="LENCANA[a.jenis].kelas">{{
              LENCANA[a.jenis].label
            }}</span>
            <span v-if="a.rentang">{{ a.rentang }}</span>
          </p>
          <p
            v-if="a.deskripsi"
            class="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed line-clamp-3"
          >
            {{ a.deskripsi }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useKegiatan } from '@/composables/useKegiatan'
import { SARING_AGENDA, susunAgenda } from '@/utils/agenda'
import { todayJakarta } from '@/utils/format'

const LENCANA = {
  libur: {
    label: 'Libur',
    kelas: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
  },
  ujian: {
    label: 'Ujian',
    kelas: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  },
  kegiatan: {
    label: 'Kegiatan',
    kelas: 'bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
  }
}

const saring = ref('akan')
const { kegiatanRelevan, loading } = useKegiatan({ publik: true })
const kelompok = computed(() =>
  susunAgenda(kegiatanRelevan.value, { saring: saring.value, hariIni: todayJakarta() })
)
</script>
