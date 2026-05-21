<template>
  <!-- v.72.7.0526: Data Pribadi DI ATAS, Pengaturan Profil DI BAWAH -->
  <div class="space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <!-- HEADER PROFIL -->
      <div class="flex flex-col items-center mb-6 border-b border-slate-100 pb-6">
        <div class="relative mb-3">
          <div
            class="w-36 h-36 bg-gradient-to-br from-cyan-50 to-blue-50 border-4 border-white ring-4 ring-cyan-100 rounded-full flex items-center justify-center overflow-hidden shadow-xl"
          >
            <img
              v-if="santri?.foto"
              :src="santri.foto"
              class="w-full h-full object-cover"
              alt="Foto Santri"
            />
            <i v-else class="fas fa-user-graduate text-cyan-300 text-6xl"></i>
          </div>
        </div>
        <h2 class="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 text-center">
          {{ santri?.nama || '-' }}
        </h2>
        <p class="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
          {{ santri?.lembaga || '-' }} · Kelas {{ santri?.kelas || '-' }}
        </p>
        <span
          class="inline-block mt-2 text-[10px] bg-cyan-100 text-cyan-700 font-bold px-3 py-1 rounded-full uppercase tracking-widest"
        >
          Santri
        </span>
      </div>

      <!-- GRID DETAIL -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Identitas Santri -->
        <div class="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3
            class="font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4"
          >
            <i class="fas fa-id-badge mr-2"></i>Identitas
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">Nama:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.nama || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">NIS:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.nis || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">Username:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.username || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">L/P:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ jkLabel }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">Tgl Lahir:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ tglLahirFmt }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-slate-300 font-bold">Status Mukim:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ mukimLabel }}</span>
            </li>
          </ul>
        </div>

        <!-- Pendidikan -->
        <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-100 dark:border-cyan-800">
          <h3
            class="font-black text-cyan-800 text-sm uppercase tracking-widest border-b border-cyan-200 pb-2 mb-4"
          >
            <i class="fas fa-school mr-2"></i>Pendidikan
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Lembaga:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.lembaga || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Kelas Pondok:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.kelas || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Kelas Sekolah:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">
                {{ santri?.kelas_sekolah || '-' }}
              </span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Guru Pagi:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.guru_pagi || santri?.guru || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Guru Sore:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri?.guru_sore || '-' }}</span>
            </li>
            <li v-if="santri?.juz" class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Juz Sekarang:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ santri.juz }}</span>
            </li>
          </ul>
        </div>

        <!-- Wali Santri (full width) — info untuk wali yang login pakai akun santri ini -->
        <div class="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800 md:col-span-2">
          <h3
            class="font-black text-amber-800 text-sm uppercase tracking-widest border-b border-amber-200 pb-2 mb-4 flex items-center justify-between"
          >
            <span><i class="fas fa-users mr-2"></i>Wali Santri</span>
            <span class="text-[9px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded normal-case tracking-normal">
              Akses akun ini
            </span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-amber-100 dark:border-amber-800">
              <p class="text-[10px] text-amber-600 font-bold uppercase">Nama Wali</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ santri?.wali || '-' }}</p>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-amber-100 dark:border-amber-800">
              <p class="text-[10px] text-amber-600 font-bold uppercase">No WA Wali</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ santri?.wa || '-' }}</p>
            </div>
          </div>
          <p class="text-[10px] text-amber-700 italic mt-3 bg-amber-100 p-2 rounded border border-amber-200">
            <i class="fas fa-info-circle mr-1"></i>Akun santri ini digunakan oleh wali (orang tua) untuk
            memantau perkembangan ananda — absensi, nilai rapor, tabungan, dan informasi pondok.
          </p>
        </div>
      </div>

      <p class="text-[10px] text-slate-400 italic mt-4 text-center">
        <i class="fas fa-info-circle mr-1"></i>Untuk mengubah foto, sandi, atau no WA wali, klik
        avatar di kanan atas → Edit Profil.
      </p>
    </div>

    <!-- v.21.25.0526: Linear timeline dari santri.riwayat[] (sumber tgl auto rapor) -->
    <div v-if="riwayatLinear.length > 0" class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 class="font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
        <i class="fas fa-route text-blue-500"></i>Timeline Kenaikan Kelas
      </h3>
      <div class="relative pl-6">
        <div class="absolute left-2 top-1 bottom-1 w-0.5 bg-blue-200"></div>
        <div v-for="(r, i) in riwayatLinear" :key="i" class="relative mb-4 last:mb-0">
          <div class="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-white"></div>
          <div class="bg-blue-50/60 rounded-lg p-3 border border-blue-100">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[10px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{{ formatTanggal(r.tgl_naik) }}</span>
              <span class="text-xs font-bold text-slate-800">{{ r.kelas_from || '—' }} <i class="fas fa-arrow-right text-[10px] mx-1"></i> {{ r.kelas_to || '—' }}</span>
              <span v-if="r.juz" class="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{{ r.juz }}</span>
              <span class="text-[10px] text-slate-500">{{ r.lembaga }}</span>
            </div>
            <p v-if="r.catatan" class="text-xs text-slate-600 mt-1 italic"><i class="fas fa-comment mr-1"></i>{{ r.catatan }}</p>
            <p v-if="r.guru" class="text-[10px] text-slate-400 mt-0.5">Oleh: {{ r.guru }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- v.72.19.0526: Riwayat Naik Kelas + Catatan/Rekomendasi multi-entry per juz -->
    <div v-if="riwayatKenaikan.length > 0" class="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 class="font-black text-slate-700 dark:text-slate-200 text-sm uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 flex items-center gap-2">
        <i class="fas fa-trophy text-amber-500"></i>Riwayat Naik Kelas
      </h3>
      <div class="space-y-3">
        <div
          v-for="r in riwayatKenaikan"
          :key="`${r.lembaga}-${r.kelasId}`"
          class="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 dark:border-slate-700"
        >
          <div class="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div>
              <h4 class="text-sm font-black text-slate-800 dark:text-slate-100">
                <i class="fas fa-graduation-cap text-emerald-600 mr-1"></i>{{ r.lembaga }} — {{ r.kelasLabel }}
              </h4>
              <p v-if="r.ceremonial" class="text-[11px] text-amber-700 font-bold mt-0.5">
                <i class="fas fa-medal mr-1"></i>Ceremonial: {{ formatTanggal(r.ceremonial) }}
              </p>
            </div>
            <span class="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">
              {{ r.totalTanggal }} Item Tuntas
            </span>
          </div>
          <!-- Timeline entries (catatan + rekomendasi multi-entry per juz/jilid) -->
          <div v-if="r.entries.length > 0" class="space-y-1.5">
            <div
              v-for="(e, idx) in r.entries"
              :key="idx"
              :class="[
                'border-l-4 px-3 py-2 rounded-r-lg',
                e.tipe === 'rekomendasi'
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              ]"
            >
              <p :class="[
                'text-[10px] font-black uppercase tracking-wider mb-0.5',
                e.tipe === 'rekomendasi' ? 'text-emerald-700' : 'text-blue-700'
              ]">
                <i :class="['fas mr-1', e.tipe === 'rekomendasi' ? 'fa-lightbulb' : 'fa-comment-dots']"></i>
                {{ e.tipe === 'rekomendasi' ? 'Rekomendasi' : 'Catatan' }}
                <span class="font-medium normal-case text-slate-700 dark:text-slate-300 ml-1">
                  · {{ e.tanggal ? formatTanggal(e.tanggal) : '—' }}{{ e.itemLabel ? ' · ' + e.itemLabel : '' }}
                </span>
              </p>
              <p class="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line">{{ e.text }}</p>
            </div>
          </div>
          <p v-else class="text-[10px] text-slate-400 italic">
            Belum ada catatan/rekomendasi dari guru.
          </p>
        </div>
      </div>
    </div>

    <!-- v.72.7.0526: Pengaturan Profil di BAWAH -->
    <ProfilPengaturanSaya role="santri" :entity-id="santri?.id" :entity="santri" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatTanggal } from '@/utils/format'
import { getKartuKenaikanSchema } from '@/utils/kenaikan'
import { useSettingsStore } from '@/stores/settings'
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'

const settings = useSettingsStore()

const props = defineProps({
  santri: { type: Object, required: true }
})

const jkLabel = computed(() => (props.santri?.jk === 'L' ? 'Laki-laki' : 'Perempuan'))
const tglLahirFmt = computed(() => formatTanggal(props.santri?.tgl_lahir))
const mukimLabel = computed(() => (props.santri?.is_mukim ? 'Mukim' : 'Non-Mukim'))

// v.21.25.0526: Linear riwayat dari santri.riwayat[] (sumber tunggal tgl auto rapor)
const riwayatLinear = computed(() => {
  const arr = Array.isArray(props.santri?.riwayat) ? props.santri.riwayat : []
  return arr.slice().sort((a, b) => String(b.tgl_naik || '').localeCompare(String(a.tgl_naik || '')))
})

// v.72.19.0526: Riwayat Naik Kelas dengan entries array (catatan/rekomendasi per juz multi)
const riwayatKenaikan = computed(() => {
  const kk = props.santri?.kartu_kenaikan
  if (!kk || typeof kk !== 'object') return []
  const result = []
  for (const lembaga of Object.keys(kk)) {
    const data = kk[lembaga]
    if (!data || typeof data !== 'object') continue
    const schema = getKartuKenaikanSchema(lembaga, settings.settings || {})
    const kelasMap = Object.fromEntries((schema.kelasList || []).map((k) => [k.id, k]))
    for (const kelasId of Object.keys(data)) {
      const cells = data[kelasId]
      if (!cells || typeof cells !== 'object') continue
      let totalTanggal = 0
      const RESERVED = new Set(['ceremonial', 'catatan', 'rekomendasi', 'entries'])
      for (const [k, v] of Object.entries(cells)) {
        if (RESERVED.has(k)) continue
        if (v) totalTanggal++
      }
      // Build entries: new array + legacy string fallback
      const kelasObj = kelasMap[kelasId] || { items: [], label: kelasId }
      const itemLabelMap = Object.fromEntries((kelasObj.items || []).map((it) => [it.id, it.label]))
      itemLabelMap.ceremonial = 'Ceremonial'
      const entriesRaw = Array.isArray(cells.entries) ? cells.entries.slice() : []
      // Legacy string fallback
      if (typeof cells.catatan === 'string' && cells.catatan.trim()) {
        entriesRaw.push({ tanggal: '', itemId: '', tipe: 'catatan', text: cells.catatan })
      }
      if (typeof cells.rekomendasi === 'string' && cells.rekomendasi.trim()) {
        entriesRaw.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: cells.rekomendasi })
      }
      const entries = entriesRaw
        .map((e) => ({
          tanggal: e.tanggal || '',
          itemId: e.itemId || '',
          itemLabel: itemLabelMap[e.itemId] || '',
          tipe: e.tipe === 'rekomendasi' ? 'rekomendasi' : 'catatan',
          text: e.text || ''
        }))
        .sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))

      // Only show kalau ada entries / ceremonial / tanggal terisi
      if (entries.length === 0 && !cells.ceremonial && totalTanggal === 0) continue
      result.push({
        lembaga,
        kelasId,
        kelasLabel: kelasObj.label || kelasId,
        ceremonial: cells.ceremonial || '',
        entries,
        totalTanggal
      })
    }
  }
  return result.sort((a, b) => (b.ceremonial || '').localeCompare(a.ceremonial || ''))
})
</script>
