<script setup>
// v.1.5.0 (gelombang 3) — kartu "Tugas Saya" di beranda (permintaan Kyai 16 Nov 2026).
// Isi daftarnya datang dari utils/tugasSaya.js lewat composable; komponen ini hanya
// menggambar. Jangan menambah aturan "apa yang dihitung tugas" di sini.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTugasSaya } from '@/composables/useTugasSaya'
import { JENIS_TUGAS, LABEL_PERLU } from '@/utils/tugasSaya'

const router = useRouter()
const { hasil, memuat, galat, berlaku } = useTugasSaya()

// Kelas Tailwind HARUS utuh — `bg-${warna}-50` kena purge dan jadi tak berwarna.
const WARNA = {
  emerald: { titik: 'bg-emerald-500', kotak: 'bg-emerald-50/70 dark:bg-emerald-900/15' },
  violet: { titik: 'bg-violet-500', kotak: 'bg-violet-50/70 dark:bg-violet-900/15' },
  amber: { titik: 'bg-amber-500', kotak: 'bg-amber-50/70 dark:bg-amber-900/15' },
  sky: { titik: 'bg-sky-500', kotak: 'bg-sky-50/70 dark:bg-sky-900/15' },
  cyan: { titik: 'bg-cyan-500', kotak: 'bg-cyan-50/70 dark:bg-cyan-900/15' },
  rose: { titik: 'bg-rose-500', kotak: 'bg-rose-50/70 dark:bg-rose-900/15' },
  orange: { titik: 'bg-orange-500', kotak: 'bg-orange-50/70 dark:bg-orange-900/15' }
}
function warna(jenis) {
  return WARNA[JENIS_TUGAS[jenis]?.warna] || WARNA.sky
}

const LABEL_KELOMPOK = {
  hari_ini: 'Hari ini',
  besok: 'Besok',
  minggu_ini: 'Minggu ini'
}

// Terjadwal dikelompokkan supaya "Hari ini" selalu di puncak — bagian yang paling dicari.
const grupTerjadwal = computed(() => {
  const urut = ['hari_ini', 'besok', 'minggu_ini']
  return urut
    .map((k) => ({
      kunci: k,
      label: LABEL_KELOMPOK[k],
      isi: hasil.value.terjadwal.filter((t) => t.kelompok === k)
    }))
    .filter((g) => g.isi.length)
})

const adaIsi = computed(() => hasil.value.total > 0)

function buka(tugas) {
  if (tugas?.rute) router.push(tugas.rute)
}
</script>

<template>
  <div
    v-if="berlaku"
    class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
  >
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
        <i class="fas fa-clipboard-check text-emerald-500 mr-2"></i>Tugas Saya
      </h3>
      <span
        v-if="adaIsi"
        class="text-[11px] font-black text-white bg-emerald-500 rounded-full px-2 py-0.5"
        >{{ hasil.total }}</span
      >
    </div>

    <div v-if="memuat" class="py-6 text-center">
      <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl mb-2"></i>
      <p class="text-xs text-slate-500 font-bold">Memuat tugas...</p>
    </div>

    <p
      v-else-if="galat"
      class="py-4 text-center text-xs font-bold text-amber-600 dark:text-amber-400"
    >
      <i class="fas fa-triangle-exclamation mr-1"></i>{{ galat }}
    </p>

    <!-- Tak punya tugas adalah keadaan NORMAL dan paling sering — jangan dibuat
         seperti kegagalan. -->
    <div
      v-else-if="!adaIsi"
      class="py-6 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-600"
    >
      <i class="fas fa-mug-hot text-slate-300 dark:text-slate-600 text-3xl mb-2"></i>
      <p class="text-xs text-slate-500 dark:text-slate-400 font-bold">Tak ada tugas terjadwal</p>
    </div>

    <div v-else class="space-y-3">
      <div v-for="g in grupTerjadwal" :key="g.kunci">
        <p
          class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5"
        >
          {{ g.label }}
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="t in g.isi"
            :key="t.id"
            class="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-sm transition"
            :class="warna(t.jenis).kotak"
            @click="buka(t)"
          >
            <span class="flex-shrink-0 w-2 h-2 rounded-full" :class="warna(t.jenis).titik"></span>
            <span class="min-w-0 flex-1">
              <span class="block text-xs font-bold text-slate-700 dark:text-slate-100 truncate">{{
                t.judul
              }}</span>
              <span
                v-if="t.detail"
                class="block text-[11px] text-slate-500 dark:text-slate-400 truncate"
                >{{ t.detail }}</span
              >
            </span>
            <span
              v-if="t.jam"
              class="flex-shrink-0 text-[11px] font-black text-slate-600 dark:text-slate-300"
              >{{ t.jam }}</span
            >
          </li>
        </ul>
      </div>

      <div v-if="hasil.perlu.length">
        <p
          class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5"
        >
          {{ LABEL_PERLU }}
        </p>
        <ul class="space-y-1.5">
          <li
            v-for="t in hasil.perlu"
            :key="t.id"
            class="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-sm transition"
            :class="warna(t.jenis).kotak"
            @click="buka(t)"
          >
            <span class="flex-shrink-0 w-2 h-2 rounded-full" :class="warna(t.jenis).titik"></span>
            <span class="min-w-0 flex-1">
              <span class="block text-xs font-bold text-slate-700 dark:text-slate-100 truncate">{{
                t.judul
              }}</span>
              <span
                v-if="t.detail"
                class="block text-[11px] text-slate-500 dark:text-slate-400 truncate"
                >{{ t.detail }}</span
              >
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
