<template>
  <!-- Setelan ibadah (metode + lokasi) — satu komponen untuk Pengaturan publik & roda gigi
       layar Jadwal Sholat (blueprint 3.7: yang sudah login tak perlu ke Pengaturan publik). -->
  <div class="space-y-4">
    <div>
      <p class="text-xs font-bold text-[var(--text-secondary)] mb-2">Metode perhitungan</p>
      <div class="space-y-2">
        <button
          v-for="m in daftarMetode"
          :key="m.kunci"
          type="button"
          class="w-full text-left px-3 py-2.5 rounded-xl border transition cursor-pointer flex items-center gap-3"
          :class="
            metode === m.kunci
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30'
              : 'border-slate-200 dark:border-slate-700'
          "
          @click="setMetode(m.kunci)"
        >
          <i
            :class="[
              'fas',
              metode === m.kunci ? 'fa-circle-dot text-teal-600' : 'fa-circle text-slate-300'
            ]"
          ></i>
          <span class="min-w-0">
            <span class="block text-xs font-bold text-[var(--text-primary)]">{{ m.label }}</span>
            <span class="block text-[11px] text-[var(--text-secondary)]">{{ m.keterangan }}</span>
          </span>
        </button>
      </div>
      <p class="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
        <i class="fas fa-circle-info mr-1 text-teal-600"></i>Falakiyah NU menyusul setelah
        dicocokkan dengan jadwal resmi LFNU.
      </p>
    </div>

    <div>
      <p class="text-xs font-bold text-[var(--text-secondary)] mb-2">Lokasi</p>
      <label
        v-if="geolokasiTersedia"
        class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer"
      >
        <span class="min-w-0">
          <span class="block text-xs font-bold text-[var(--text-primary)]">Lokasi otomatis</span>
          <span class="block text-[11px] text-[var(--text-secondary)]">
            {{ ketLokasi }}
          </span>
        </span>
        <input
          type="checkbox"
          class="w-5 h-5 accent-teal-600 shrink-0"
          :checked="otomatis"
          @change="setOtomatis($event.target.checked)"
        />
      </label>
      <button
        v-if="geolokasiTersedia"
        type="button"
        class="mt-2 w-full py-2.5 rounded-xl text-xs font-bold border border-teal-600 text-teal-700 dark:text-teal-300 transition cursor-pointer disabled:opacity-60"
        :disabled="memuatLokasi"
        @click="perbaruiLokasi({ paksa: true })"
      >
        <i
          :class="['fas mr-1.5', memuatLokasi ? 'fa-spinner fa-spin' : 'fa-location-crosshairs']"
        ></i
        >{{ memuatLokasi ? 'Membaca lokasi…' : 'Perbarui lokasi sekarang' }}
      </button>
      <p v-if="galatLokasi" class="text-[11px] text-rose-600 dark:text-rose-300 mt-2">
        {{ galatLokasi }}
      </p>
      <label class="block mt-3">
        <span class="block text-[11px] text-[var(--text-secondary)] mb-1">Atau pilih kota</span>
        <select
          class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[var(--bg-card)] text-xs text-[var(--text-primary)]"
          :value="lokasi.sumber === 'kota' ? lokasi.nama : ''"
          @change="pilih($event.target.value)"
        >
          <option value="">— pilih kota —</option>
          <option v-for="k in DAFTAR_KOTA" :key="k.nama" :value="k.nama">{{ k.nama }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIbadah, DAFTAR_KOTA } from '@/composables/useIbadah'
import { METODE } from '@/utils/waktuSholat'

const {
  metode,
  otomatis,
  lokasi,
  memuatLokasi,
  galatLokasi,
  perbaruiLokasi,
  setMetode,
  setOtomatis,
  pilihKota,
  geolokasiTersedia
} = useIbadah({ otomatisSaatDibuka: false })

const daftarMetode = Object.values(METODE)

const ketLokasi = computed(() => {
  const l = lokasi.value
  if (l.sumber !== 'gps') return `Sekarang: ${l.nama}`
  const t = l.diperbarui ? new Date(l.diperbarui) : null
  const jam = t
    ? `${String(t.getHours()).padStart(2, '0')}.${String(t.getMinutes()).padStart(2, '0')}`
    : '-'
  return `Lokasi HP · diperbarui ${jam}`
})

function pilih(nama) {
  pilihKota(DAFTAR_KOTA.find((k) => k.nama === nama))
}
</script>
