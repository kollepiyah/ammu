<script setup>
// ImporSupabaseView — F3: alat migrasi sekali-pakai (super_admin). Impor master
// dari Excel "Ammu Data/" -> Supabase. Preview JALAN sekarang (client-side);
// tombol "Impor" aktif setelah skema di-apply (F2) + login admin Supabase (F5).
import { reactive, computed } from 'vue'
import { useSupabaseImport } from '@/composables/useSupabaseImport'

const ENTITIES = [
  { type: 'santri', label: 'Santri', file: 'DATA SANTRI AUTO NEW.xlsx (sheet DATA UTAMA)',
    cols: [['nama', 'Nama'], ['jk', 'JK'], ['lembaga', 'Lembaga'], ['kelas', 'Kelas'], ['wali', 'Wali'], ['wa', 'WA']] },
  { type: 'guru', label: 'Guru', file: 'DATA GURU AUTO.xlsx (sheet DATA GURU)',
    cols: [['nama', 'Nama'], ['jabatan', 'Jabatan'], ['lembaga', 'Lembaga'], ['wa', 'WA'], ['role_sistem', 'Role']] },
  { type: 'prestasi', label: 'Rekap Prestasi', file: 'PRESTASI PTPT AUTO.xlsx (sheet Rekap Prestasi)',
    cols: [['_nama', 'Nama'], ['lembaga', 'Lembaga'], ['kelas', 'Kelas'], ['_juz', 'Juz'], ['_awal', 'Awal'], ['_akhir', 'Akhir']] }
]

const imp = reactive({})
ENTITIES.forEach((e) => { imp[e.type] = useSupabaseImport() })
const ready = computed(() => ENTITIES[0] && imp.santri.isReady())

function cellOf(row, key) {
  if (key === '_nama') return row.data?.santri_nama
  if (key === '_juz') return row.data?.juz
  if (key === '_awal') return row.data?.prestasi_awal
  if (key === '_akhir') return row.data?.prestasi_akhir
  return row[key]
}

async function onFile(ev, type) {
  const file = ev.target.files?.[0]
  if (!file) return
  try { await imp[type].loadPreview(file, type) } catch (e) { /* error sudah di state */ }
  ev.target.value = '' // reset agar bisa pilih file sama lagi
}
async function onCommit(type) {
  if (!confirm(`Impor data ${type} ke Supabase? (upsert by id — aman diulang)`)) return
  try { await imp[type].commit() } catch (e) { /* error sudah di state */ }
}
</script>

<template>
  <div class="p-4 max-w-5xl mx-auto">
    <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100">Impor Data → Supabase</h1>
    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
      Alat migrasi (super admin). Pilih file Excel dari folder <b>Ammu Data</b>, cek pratinjau, lalu impor.
      Upsert by <code>id</code> — aman diulang.
    </p>

    <div v-if="!ready"
      class="mt-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
      ⚠️ Supabase belum terkonfigurasi / belum login admin Supabase. <b>Pratinjau tetap jalan</b>;
      tombol <b>Impor</b> aktif setelah skema di-apply (F2) &amp; auth Supabase (F5).
    </div>

    <div v-for="e in ENTITIES" :key="e.type"
      class="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div class="font-semibold text-slate-800 dark:text-slate-100">{{ e.label }}</div>
          <div class="text-xs text-slate-400">{{ e.file }}</div>
        </div>
        <label class="h-11 md:h-9 px-3 inline-flex items-center rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium cursor-pointer">
          Pilih File…
          <input type="file" accept=".xlsx,.xls" class="hidden" @change="onFile($event, e.type)" />
        </label>
      </div>

      <div v-if="imp[e.type].busy.value" class="mt-3 text-sm text-slate-500">Memproses…</div>
      <div v-if="imp[e.type].error.value" class="mt-3 text-sm text-red-600 dark:text-red-400">⚠️ {{ imp[e.type].error.value }}</div>
      <div v-if="imp[e.type].result.value" class="mt-3 text-sm text-green-600 dark:text-green-400">✓ {{ imp[e.type].result.value }}</div>

      <template v-if="imp[e.type].preview.value">
        <div class="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Total baris: <b>{{ imp[e.type].preview.value.total }}</b> ·
          Termap: <b>{{ imp[e.type].preview.value.rows.length }}</b> ·
          Dilewati (tanpa nama): {{ imp[e.type].preview.value.skipped }} ·
          Duplikat-id: {{ imp[e.type].preview.value.duplicates }}
        </div>
        <div class="mt-2 overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th v-for="c in e.cols" :key="c[0]" class="py-1 pr-3 font-medium">{{ c[1] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in imp[e.type].preview.value.rows.slice(0, 8)" :key="i"
                class="border-b border-slate-100 dark:border-slate-700/50">
                <td v-for="c in e.cols" :key="c[0]" class="py-1 pr-3 text-slate-700 dark:text-slate-200">
                  {{ cellOf(row, c[0]) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="imp[e.type].preview.value.rows.length > 8" class="text-xs text-slate-400 mt-1">
            …dan {{ imp[e.type].preview.value.rows.length - 8 }} baris lain.
          </div>
        </div>
        <button
          class="mt-3 h-11 md:h-9 px-4 inline-flex items-center rounded-xl text-sm font-medium text-white disabled:opacity-50"
          :class="ready ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-400 cursor-not-allowed'"
          :disabled="!ready || imp[e.type].busy.value"
          @click="onCommit(e.type)">
          Impor {{ imp[e.type].preview.value.rows.length }} baris ke Supabase
        </button>
      </template>
    </div>
  </div>
</template>
