<template>
  <!-- Notifikasi waktu sholat (mock-up disetujui Kyai 25 Nov 2026). Android saja. -->
  <div v-if="didukung">
    <p class="text-xs font-bold text-[var(--text-secondary)] mb-2">Notifikasi waktu sholat</p>
    <label
      class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer"
    >
      <span class="text-xs font-bold text-[var(--text-primary)]">
        <i class="fas fa-bell text-teal-600 mr-1.5"></i>Nyalakan notifikasi
      </span>
      <input
        type="checkbox"
        class="w-5 h-5 accent-teal-600 shrink-0"
        :checked="setelan.nyala"
        @change="ubahNyala($event)"
      />
    </label>
    <p v-if="pesan" class="text-[11px] text-rose-600 dark:text-rose-300 mt-2">{{ pesan }}</p>

    <template v-if="setelan.nyala">
      <div
        class="mt-2 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800"
      >
        <label
          v-for="k in WAKTU_ADZAN"
          :key="k"
          class="flex items-center justify-between px-3 py-2.5 cursor-pointer"
        >
          <span class="text-xs text-[var(--text-primary)]">{{ NAMA_WAKTU[k] }}</span>
          <input
            type="checkbox"
            class="w-5 h-5 accent-teal-600"
            :checked="setelan.aktif[k]"
            @change="setWaktu(k, $event.target.checked)"
          />
        </label>
        <div class="flex items-center justify-between px-3 py-2.5">
          <span class="text-xs text-[var(--text-primary)]">Suara</span>
          <span class="text-[11px] text-[var(--text-secondary)]"
            >Bunyi notifikasi HP · adzan menyusul</span
          >
        </div>
        <label class="flex items-center justify-between px-3 py-2.5">
          <span class="text-xs text-[var(--text-primary)]">Pengingat sebelum waktu</span>
          <select
            class="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-[var(--bg-card)] text-xs text-[var(--text-primary)]"
            :value="setelan.sebelum"
            @change="setSebelum($event.target.value)"
          >
            <option v-for="n in PILIHAN_SEBELUM" :key="n" :value="n">
              {{ n ? `${n} menit` : 'Tidak' }}
            </option>
          </select>
        </label>
      </div>
      <button
        v-if="izinTepat === false"
        type="button"
        class="mt-2 w-full text-left px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-[11px] text-amber-800 dark:text-amber-200 leading-relaxed cursor-pointer"
        @click="bukaIzinTepat"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Supaya tepat waktu, izinkan
        <b>"Alarm &amp; pengingat"</b> untuk Ammu. Ketuk untuk membuka setelan HP.
      </button>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAdzan, adzanDidukung } from '@/composables/useAdzan'
import { WAKTU_ADZAN, PILIHAN_SEBELUM } from '@/utils/adzan'
import { NAMA_WAKTU } from '@/utils/waktuSholat'

const didukung = adzanDidukung()
const { setelan, izinTepat, setNyala, setWaktu, setSebelum, cekIzinTepat, bukaIzinTepat } =
  useAdzan()
const pesan = ref('')

onMounted(() => {
  if (didukung && setelan.nyala) cekIzinTepat()
})

async function ubahNyala(e) {
  pesan.value = ''
  const ok = await setNyala(e.target.checked)
  if (!ok) {
    e.target.checked = false
    pesan.value =
      'Izin notifikasi ditolak. Nyalakan lewat Setelan HP → Aplikasi → Ammu → Notifikasi.'
  }
}
</script>
