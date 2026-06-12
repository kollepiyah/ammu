<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- v.91.0626: pakai komponen PageHeader (design-system konsisten) -->
    <PageHeader v-if="!isDesktop" icon="fa-users" title="Data Santri" :subtitle="isFullAccess ? 'Semua santri pondok' : 'Santri yang Anda ampu'">
      <template #stats>
        <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
          <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
          <span class="text-[var(--text-secondary)] ml-1">total</span>
        </div>
        <!-- v.21.12.0526: label "Mukim" → "Ma'had", hide non-mukim label -->
        <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
          <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.mukim }}</span>
          <span class="text-[var(--text-secondary)] ml-1">Ma'had</span>
        </div>
      </template>
      <template #actions>
        <!-- v.21.17c.0526: View mode actions (sidebar) vs Master mode actions (Master Data) -->
        <button v-if="isFullAccess" @click="cetakPdf" aria-label="Cetak daftar santri PDF" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
          <i class="fas fa-file-pdf"></i>Cetak PDF
        </button>
        <button v-if="isFullAccess" @click="exportSantriExcel" :disabled="exporting" aria-label="Ekspor daftar santri Excel" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i :class="['fas', exporting ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>{{ exporting ? 'Ekspor...' : 'Ekspor Excel' }}
        </button>
        <button v-if="isFullAccess && gsheetConfigured()" @click="kirimGoogleSheet" :disabled="sendingGsheet" aria-label="Kirim daftar santri ke Google Sheet" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
          <i :class="['fas', sendingGsheet ? 'fa-spinner fa-spin' : 'fa-table']"></i>{{ sendingGsheet ? 'Mengirim...' : 'Google Sheet' }}
        </button>
        <!-- View mode: tombol Kelola -->
        <router-link v-if="isFullAccess && !isMasterMode" to="/master-data?tab=santri" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-[var(--text-primary)] text-xs font-bold transition" title="CRUD santri di Master Data">
          <i class="fas fa-edit"></i>Kelola
        </router-link>
        <!-- Master mode: full CRUD buttons -->
        <template v-if="isFullAccess && isMasterMode">
          <button @click="downloadTemplateSantri" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
            <i class="fas fa-download"></i>Template
          </button>
          <label class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
            <i :class="['fas', importing ? 'fa-spinner fa-spin' : 'fa-upload']"></i>{{ importing ? 'Impor...' : 'Impor XLSX' }}
            <input type="file" accept=".xlsx,.xls" class="hidden" @change="onImportSantri" :disabled="importing" />
          </label>
          <router-link to="/santri/new?from=master" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition">
            <i class="fas fa-plus"></i>Tambah Santri
          </router-link>
        </template>
      </template>
    </PageHeader>

    <!-- v.98: input impor tersembunyi (dipicu aksi pita "Impor XLSX" di Electron) -->
    <input ref="importInput" type="file" accept=".xlsx,.xls" class="hidden" @change="onImportSantri" />

    <!-- v.21.22c.0526: Bulk action bar (Master mode only) -->
    <div v-if="isMasterMode && isFullAccess && selectedCount > 0" class="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl p-3 border border-teal-300 dark:border-teal-700 shadow-sm flex flex-wrap items-center gap-2">
      <span class="text-xs font-black text-teal-800 dark:text-teal-200"><i class="fas fa-check-square mr-1"></i>{{ selectedCount }} terpilih</span>
      <button @click="bulkSetStatusSantri('aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-check"></i>Set Aktif</button>
      <button @click="bulkSetStatusSantri('tidak_aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-user-slash"></i>Set Non-aktif</button>
      <button @click="bulkDelete" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-trash"></i>Hapus</button>
      <button @click="clearSelection" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-[var(--text-primary)] text-[11px] font-bold transition cursor-pointer ml-auto"><i class="fas fa-times"></i>Batal</button>
    </div>


    <!-- Import preview modal -->
    <div v-if="importPreview" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-file-import text-cyan-600 mr-2"></i>Preview Impor — {{ importPreview.rows.length }} baris
          </h3>
          <button @click="importPreview = null" class="text-[var(--text-tertiary)] hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div class="p-4 overflow-auto flex-1 text-xs">
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div class="bg-emerald-50 rounded p-2 border border-emerald-200">
              <p class="text-[10px] text-emerald-700 font-bold uppercase">Baru</p>
              <p class="text-2xl font-black text-emerald-700">{{ importPreview.newCount }}</p>
            </div>
            <div class="bg-cyan-50 rounded p-2 border border-cyan-200">
              <p class="text-[10px] text-cyan-700 font-bold uppercase">Update</p>
              <p class="text-2xl font-black text-cyan-700">{{ importPreview.updateCount }}</p>
            </div>
            <div class="bg-rose-50 rounded p-2 border border-rose-200">
              <p class="text-[10px] text-rose-700 font-bold uppercase">Skip (no nama)</p>
              <p class="text-2xl font-black text-rose-700">{{ importPreview.skipCount }}</p>
            </div>
          </div>
          <table class="w-full border border-[var(--border-subtle)]">
            <thead class="bg-[var(--bg-muted)]">
              <tr>
                <th class="px-2 py-1 text-left">#</th>
                <th class="px-2 py-1 text-left">Aksi</th>
                <th class="px-2 py-1 text-left">Nama</th>
                <th class="px-2 py-1 text-left">No. Induk</th>
                <th class="px-2 py-1 text-left">Lembaga</th>
                <th class="px-2 py-1 text-left">Kelas</th>
                <th class="px-2 py-1 text-left">Wali</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in importPreview.preview" :key="i" class="border-t border-[var(--border-subtle)]">
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1"><span :class="r.action === 'new' ? 'text-emerald-700' : 'text-cyan-700'" class="font-bold">{{ r.action.toUpperCase() }}</span></td>
                <td class="px-2 py-1">{{ r.nama }}</td>
                <td class="px-2 py-1">{{ r.nis }}</td>
                <td class="px-2 py-1">{{ r.lembaga }}</td>
                <td class="px-2 py-1">{{ r.kelas }}</td>
                <td class="px-2 py-1">{{ r.wali }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="importPreview.rows.length > importPreview.preview.length" class="text-[10px] italic text-[var(--text-secondary)] mt-2">
            ...dan {{ importPreview.rows.length - importPreview.preview.length }} baris lagi
          </p>
        </div>
        <div class="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
          <button @click="importPreview = null" class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-200 hover:bg-slate-300">Batal</button>
          <button @click="confirmImportSantri" :disabled="importing" class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50">
            <i :class="['fas', importing ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ importing ? 'Importing...' : `Konfirmasi (${importPreview.newCount + importPreview.updateCount})` }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search + filter bar -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm">
      <!-- Pencarian -->
      <div class="relative">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
        <input v-model="search" type="text" placeholder="Cari nama, No. Induk, atau wali..." class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
      </div>
      <!-- v.97.0626: filter dropdown (lembaga Qiraati + Sekolah, status tempat, status aktif) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        <select v-model="filterLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua lembaga</option>
          <optgroup v-if="uniqueLembaga.length" label="Qiraati (Ngaji)">
            <option v-for="l in uniqueLembaga" :key="'ng-' + l" :value="l">{{ l }}</option>
          </optgroup>
          <optgroup v-if="uniqueLembagaSekolah.length" label="Sekolah (Formal)">
            <option v-for="l in uniqueLembagaSekolah" :key="'sk-' + l" :value="l">{{ l }}</option>
          </optgroup>
        </select>
        <select v-model="filterMukim" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="">Semua status tempat</option>
          <option value="mukim">Ma'had</option>
          <option value="fullday">Fullday</option>
          <option value="non-mukim">Pulang Pergi</option>
        </select>
        <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
          <option value="aktif">Hanya aktif</option>
          <option value="">Semua status</option>
          <option value="tidak_aktif">Tidak aktif / Keluar</option>
        </select>
      </div>
      <!-- v.21.22c.0526: Select-all (Master mode only) -->
      <div v-if="isMasterMode && isFullAccess && santri.length > 0" class="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-2">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" :checked="isAllVisibleSelected" :indeterminate.prop="isSomeVisibleSelected" @change="toggleSelectAllVisible" class="w-4 h-4 rounded border-[var(--border-default)] text-teal-600 focus:ring-teal-500 cursor-pointer" />
          <span class="text-[11px] font-bold text-[var(--text-secondary)]">Pilih semua ({{ santri.length }})</span>
        </label>
        <span v-if="selectedCount > 0" class="text-[10px] text-teal-700 dark:text-teal-300 font-bold">— {{ selectedCount }} terpilih</span>
      </div>
    </div>

    <!-- v.21.115.0528: skeleton loader replace spinner -->
    <SkeletonCard v-if="loading" :count="5" variant="list" />

    <!-- Empty state — v.91.0626: komponen EmptyState (konsisten) -->
    <EmptyState
      v-else-if="santri.length === 0"
      icon="fa-user-slash"
      :title="search || filterLembaga || filterMukim ? 'Tidak ada santri yang cocok' : 'Belum ada santri'"
      :description="search || filterLembaga || filterMukim ? 'Coba ubah filter atau kata kunci pencarian' : isFullAccess ? 'Tambah santri pertama di Master Data' : 'Belum ada santri yang Anda ampu di sistem'"
    />

    <!-- Santri list -->
    <div v-else class="space-y-2">
      <template v-for="s in santriRows" :key="s.id">
      <!-- v.100b: header section utk guru dual-role (Qiraati / Sekolah) -->
      <div v-if="sectionHeaderFor(s)" class="flex items-center gap-2 pt-2 pb-1 first:pt-0">
        <span class="text-xs font-black text-teal-700 dark:text-teal-300 uppercase tracking-wider"><i class="fas fa-layer-group mr-1.5"></i>{{ sectionHeaderFor(s) }}</span>
        <span class="flex-1 h-px bg-[var(--border-subtle)]"></span>
      </div>
      <div @click="goProfil(s, $event)" class="bg-[var(--bg-card)] rounded-xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition cursor-pointer">
        <div class="flex items-start gap-3">
          <!-- v.21.22c.0526: Checkbox (Master mode only) -->
          <input v-if="isMasterMode && isFullAccess" type="checkbox" :checked="selected.has(String(s.id))" @change="toggleSelect(s.id)" class="flex-shrink-0 mt-2 w-4 h-4 rounded border-[var(--border-default)] text-teal-600 focus:ring-teal-500 cursor-pointer" />
          <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-100 dark:from-cyan-700 dark:to-cyan-700 border-2 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden">
            <img v-if="s.foto" :src="s.foto" alt="Foto" class="w-full h-full object-cover" />
            <i v-else class="fas fa-user-graduate text-cyan-500 dark:text-cyan-200"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] truncate">{{ s.nama }}</h3>
                <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  No. Induk: {{ s.nis || '-' }} · {{ s.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}
                </p>
              </div>
              <!-- v.21.12.0526: Ma'had / Fullday / Tidak Aktif / (PP tanpa label) -->
              <span v-if="s.is_mukim" class="text-[9px] bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Ma'had</span>
              <span v-else-if="s.is_fullday" class="text-[9px] bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Fullday</span>
              <span v-if="s.aktif === false" class="text-[9px] bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0">Tidak Aktif</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1.5">
              <span v-if="s.lembaga" class="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-bold">{{ s.lembaga }} · {{ s.kelas || '-' }}</span>
              <span v-if="s.kelas_sekolah" class="text-[10px] bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 px-2 py-0.5 rounded font-bold">Sekolah: {{ s.kelas_sekolah }}</span>
              <span v-if="s.juz" class="text-[10px] bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700 px-2 py-0.5 rounded font-bold">Juz {{ s.juz }}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1">
              <span v-for="(label, k) in formatGuru(s)" :key="k" class="text-[10px] bg-slate-50 dark:bg-slate-700/40 text-[var(--text-secondary)] border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">{{ label }}</span>
            </div>
            <div class="flex items-center gap-2 mt-1.5 text-[11px] text-[var(--text-secondary)]">
              <i class="fas fa-user-friends"></i>
              <span class="truncate">{{ s.wali || '—' }}</span>
              <a v-if="s.wa" :href="`https://wa.me/${cleanWa(s.wa)}`" target="_blank" class="ml-auto text-green-600 dark:text-green-400 hover:text-green-700 flex items-center gap-1 flex-shrink-0">
                <i class="fab fa-whatsapp"></i>{{ s.wa }}
              </a>
            </div>
            <!-- v.21.24.0526: Edit/Reset Sandi/Toggle Aktif/Delete (Master mode only) -->
            <!-- v.86.0526: pisah dari baris data (border-top + pt) biar tombol tidak menempel/overlap dg no WA -->
            <div v-if="isFullAccess && isMasterMode" class="mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-end items-center gap-3 flex-wrap">
              <button @click="resetSandiSantri(s)" class="text-[10px] text-cyan-700 dark:text-cyan-300 hover:underline font-bold" title="Reset sandi ke 1234">
                <i class="fas fa-key mr-1"></i>Reset Sandi
              </button>
              <button @click="toggleAktifSantri(s)" :class="['text-[10px] font-bold hover:underline', s.aktif === false ? 'text-emerald-700 dark:text-emerald-300' : 'text-cyan-700 dark:text-cyan-300']">
                <i :class="['fas', s.aktif === false ? 'fa-toggle-on' : 'fa-toggle-off', 'mr-1']"></i>{{ s.aktif === false ? 'Aktifkan' : 'Non-aktifkan' }}
              </button>
              <router-link :to="`/santri/${s.id}/edit?from=master`" class="text-[10px] text-teal-700 dark:text-teal-300 hover:underline font-bold">
                <i class="fas fa-edit mr-1"></i>Edit
              </router-link>
              <button @click="deleteSantri(s)" class="text-[10px] text-rose-700 dark:text-rose-300 hover:underline font-bold">
                <i class="fas fa-trash mr-1"></i>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <p class="text-center text-[10px] text-slate-400 dark:text-[var(--text-secondary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>Menampilkan {{ santri.length }} santri · v.74.0526
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
import { useSantri } from '@/composables/useSantri'
import { getPkbmSubTier, canonLembaga } from '@/composables/useLembaga' // v.99: PKBM -> SMP/SMA; v.100: auto-deteksi nama lembaga kanonik
import { sortLembagaNames } from '@/utils/santriSort' // v.100 Batch10: urutan canonical dropdown lembaga
import { useAuthStore } from '@/stores/auth'
import { ownsNgaji, ownsSekolah, deteksiTipeGuru } from '@/utils/guruScope' // v.100b: pisah santri qiraati/sekolah utk guru dual

// v.21.17c.0526: mode prop — 'view' (sidebar, default) atau 'master' (di Master Data tab, full CRUD)
const props = defineProps({ mode: { type: String, default: 'view' } })
const isMasterMode = computed(() => props.mode === 'master')
// v.21.13b.0526: + toTitleCase + normalizeWA + parseMultipleWA (v.21.22b dual WA)
import { getNamaGuruGelar, toTitleCase, normalizeWA, parseMultipleWA } from '@/utils/format'
import { useExcel } from '@/composables/useExcel'
import { useGoogleSheet } from '@/composables/useGoogleSheet'
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { useConfirm } from '@/composables/useConfirm'
// v.21.115.0528: skeleton loader
import SkeletonCard from '@/components/layout/SkeletonCard.vue'
import EmptyState from '@/components/layout/EmptyState.vue' // v.91.0626
import PageHeader from '@/components/layout/PageHeader.vue' // v.91.0626
import { setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { deleteOne, getAll } from '@/services/firestore' // v.91.0626: hapus = backup ke audit_log dulu
import { planRegenerateNis, applyNisChanges } from '@/utils/nisGenerator' // v.100 Batch14: auto-NIS pasca impor (reshuffle tgl lahir tertua)

const exporting = ref(false)
const importing = ref(false)
const importPreview = ref(null)
const { exportStyled, importFile } = useExcel()
// v.100 Batch11: kirim ke Google Sheet (layout rapi mirip PDF) — hybrid, Excel tetap
const { isConfigured: gsheetConfigured, sendToSheet } = useGoogleSheet()
const sendingGsheet = ref(false)
const toast = useToast()
const confirmDlg = useConfirm()
const settingsStore = useSettingsStore()
const authStore = useAuthStore() // v.100 Batch14: atribusi user utk audit_log generate NIS

const {
  santri, santriRaw, guruRaw, loading, search,
  filterLembaga, filterMukim, filterStatus, stats, isFullAccess
} = useSantri()

// v.91.0626: prefill pencarian dari ?q= (global search header)
const route = useRoute()
watch(() => route.query.q, (v) => { if (v != null && v !== '') search.value = String(v) }, { immediate: true })
// v.98: pita Pendidikan "Data Ma'had" -> ?tempat=mukim memilih filter status tempat
watch(() => route.query.tempat, (v) => { if (v != null && v !== '') filterMukim.value = String(v) }, { immediate: true })
// v.91.0626: klik card -> halaman profil (abaikan klik tombol/link/checkbox)
const router = useRouter()

// v.100b: guru DUAL-role (Qiraati + Sekolah) → pisah daftar jadi 2 section.
//   Tipe dideteksi dari SELURUH santri (santriRaw), tak terpengaruh filter/cari aktif.
const myNamaGuru = computed(() => authStore.sesiAktif?.guru || authStore.sesiAktif?.nama || '')
const guruDual = computed(() => {
  if (isFullAccess.value) return false
  const t = deteksiTipeGuru(santriRaw.value, myNamaGuru.value)
  return t.qiraati && t.sekolah
})
// Daftar tampil + peta header section (pada santri pertama tiap grup). Non-dual → list apa adanya.
const guruDisplay = computed(() => {
  if (!guruDual.value) return { rows: santri.value, headerById: {} }
  const nm = myNamaGuru.value
  const ngaji = [], sekolah = []
  for (const s of santri.value) {
    if (ownsNgaji(s, nm)) ngaji.push(s)
    else if (ownsSekolah(s, nm)) sekolah.push(s)
    else ngaji.push(s)
  }
  const headerById = {}
  if (ngaji.length) headerById[ngaji[0].id] = `Santri Qiraati Saya (${ngaji.length})`
  if (sekolah.length) headerById[sekolah[0].id] = `Santri Kelas Sekolah Saya (${sekolah.length})`
  return { rows: [...ngaji, ...sekolah], headerById }
})
const santriRows = computed(() => guruDisplay.value.rows)
function sectionHeaderFor(s) { return guruDisplay.value.headerById[String(s.id)] || guruDisplay.value.headerById[s.id] || null }

// v.98 full-native (Electron): header in-page disembunyikan, aksi pindah ke grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
const importInput = ref(null)
function triggerImportSantri() {
  try {
    importInput.value && importInput.value.click()
  } catch (e) {
    /* ignore */
  }
}
definePageActions(() => {
  if (!isFullAccess.value) return []
  const acts = [
    { label: 'Cetak PDF', icon: 'printer', on: cetakPdf },
    { label: 'Ekspor Excel', icon: 'download', on: exportSantriExcel, disabled: exporting.value }
  ]
  if (gsheetConfigured()) acts.push({ label: 'Google Sheet', icon: 'file', on: kirimGoogleSheet, disabled: sendingGsheet.value })
  if (isMasterMode.value) {
    acts.push({ label: 'Tambah Santri', icon: 'plus', primary: true, on: () => router.push('/santri/new?from=master') })
    acts.push({ label: 'Template', icon: 'download', on: downloadTemplateSantri })
    acts.push({ label: 'Impor XLSX', icon: 'file', on: triggerImportSantri, disabled: importing.value })
  } else {
    acts.push({ label: 'Kelola', icon: 'edit', primary: true, on: () => router.push('/master-data?tab=santri') })
  }
  return acts
})

function goProfil(s, e) {
  if (e && e.target && e.target.closest('button, a, input, label')) return
  router.push('/profil/santri/' + s.id)
}

// v.21.11.0526: Bulk selection state
const selected = ref(new Set())
const bulkSaving = ref(false)
const selectedCount = computed(() => selected.value.size)
const isAllVisibleSelected = computed(() => santri.value.length > 0 && santri.value.every((s) => selected.value.has(String(s.id))))
const isSomeVisibleSelected = computed(() => {
  if (santri.value.length === 0) return false
  const c = santri.value.filter((s) => selected.value.has(String(s.id))).length
  return c > 0 && c < santri.value.length
})

function toggleSelect(id) {
  const s = String(id)
  const next = new Set(selected.value)
  if (next.has(s)) next.delete(s)
  else next.add(s)
  selected.value = next
}

function toggleSelectAllVisible() {
  if (isAllVisibleSelected.value) {
    const next = new Set(selected.value)
    for (const s of santri.value) next.delete(String(s.id))
    selected.value = next
  } else {
    const next = new Set(selected.value)
    for (const s of santri.value) next.add(String(s.id))
    selected.value = next
  }
}

function clearSelection() { selected.value = new Set() }

async function deleteSantri(s) {
  const ok = await confirmDlg({
    title: `Hapus ${s.nama}?`,
    message: `Santri "${s.nama}" (No. Induk: ${s.nis || '-'}) akan dihapus permanen dari Firestore. Aksi ini tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('santri', s.id)
    toast.success(`Santri "${s.nama}" dihapus`)
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

async function resetSandiSantri(s) {
  const ok = await confirmDlg({
    title: `Reset sandi ${s.nama}?`,
    message: `Sandi santri "${s.nama}" akan direset ke default: 1234. Santri perlu ganti sandi sendiri setelah login.`,
    confirmText: 'Reset',
    danger: true
  })
  if (!ok) return
  try {
    await setDoc(doc(db, 'santri', String(s.id)), { password: '1234' }, { merge: true })
    toast.success(`Sandi ${s.nama} direset ke 1234`)
  } catch (e) {
    toast.error('Gagal reset: ' + (e.message || e))
  }
}

async function toggleAktifSantri(s) {
  const newStatus = s.aktif === false ? true : false
  const ok = await confirmDlg({
    title: `${newStatus ? 'Aktifkan' : 'Non-aktifkan'} ${s.nama}?`,
    message: `Status santri "${s.nama}" akan di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}.`,
    confirmText: newStatus ? 'Aktifkan' : 'Non-aktifkan',
    danger: !newStatus
  })
  if (!ok) return
  try {
    await setDoc(doc(db, 'santri', String(s.id)), { aktif: newStatus }, { merge: true })
    toast.success(`${s.nama} di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

async function bulkDelete() {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDlg({
    title: `Hapus ${ids.length} santri?`,
    message: `${ids.length} santri akan dihapus PERMANEN dari Firestore. Aksi ini tidak bisa di-undo. Lanjutkan?`,
    confirmText: 'Hapus Semua',
    danger: true
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0, failCount = 0
  for (const id of ids) {
    try {
      await deleteOne('santri', id)
      okCount++
    } catch (e) {
      failCount++
      console.warn(`[bulkDelete] santri ${id} gagal:`, e.message)
    }
  }
  bulkSaving.value = false
  if (failCount > 0) toast.warning(`Selesai: ${okCount} hapus, ${failCount} gagal`)
  else toast.success(`${okCount} santri dihapus`)
  clearSelection()
}

async function bulkSetStatusSantri(status) {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDlg({
    title: `Set status ${status}?`,
    message: `${ids.length} santri akan di-set status: ${status === 'aktif' ? 'AKTIF' : 'NON-AKTIF'}.`,
    confirmText: 'Terapkan',
    danger: status !== 'aktif'
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0, failCount = 0
  for (const id of ids) {
    try {
      await setDoc(doc(db, 'santri', String(id)), { aktif: status === 'aktif' }, { merge: true })
      okCount++
    } catch (e) {
      failCount++
    }
  }
  bulkSaving.value = false
  toast.success(`${okCount} santri di-set ${status}${failCount > 0 ? ` (${failCount} gagal)` : ''}`)
  clearSelection()
}

const uniqueLembaga = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.lembaga) set.add(s.lembaga)
  }
  return sortLembagaNames([...set]) // v.100 Batch10: urut canonical (bukan alfabetis)
})

// v.97.0626: daftar lembaga SEKOLAH (formal) utk dropdown filter
// v.99: PKBM sudah di-split jadi sub-jenjang SMP (VII-IX) / SMA (X-XII) di master data →
//   filter menampilkan SMP/SMA (turunan kelas_sekolah), TIDAK ada opsi "PKBM" lagi.
const uniqueLembagaSekolah = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    const ls = s.lembaga_sekolah
    if (!ls) continue
    if (String(ls).toUpperCase() === 'PKBM') {
      const tier = getPkbmSubTier(String(s.kelas_sekolah || s.kelas || '').toUpperCase())
      if (tier) set.add(tier) // 'SMP' | 'SMA'
      // PKBM tanpa kelas valid: tetap tampil di "Semua lembaga" (tak ditambah opsi PKBM)
    } else {
      set.add(ls)
    }
  }
  return sortLembagaNames([...set]) // v.100 Batch10: TK → SDI → SMP → SMA
})

function formatGuru(s) {
  const labels = []
  const gPagi = s.guru_pagi
  const gSore = s.guru_sore
  const gOld = s.guru
  if (gPagi) {
    const g = guruRaw.value.find((x) => x.nama === gPagi)
    labels.push(`Pagi: ${g ? getNamaGuruGelar(g.nama, g.jk) : gPagi}`)
  }
  if (gSore) {
    const g = guruRaw.value.find((x) => x.nama === gSore)
    labels.push(`Sore: ${g ? getNamaGuruGelar(g.nama, g.jk) : gSore}`)
  }
  if (!gPagi && !gSore && gOld) {
    const g = guruRaw.value.find((x) => x.nama === gOld)
    labels.push(g ? getNamaGuruGelar(g.nama, g.jk) : gOld)
  }
  if (labels.length === 0) labels.push('— Belum ada guru —')
  return labels
}

function cleanWa(wa) {
  return String(wa || '').replace(/[^0-9]/g, '').replace(/^0/, '62')
}

// v.21.25.0526: Cetak PDF code-based jsPDF + autoTable (font helvetica untuk umum)
async function cetakPdf() {
  try {
    // v.21.109.0527: fix BUG — `settings` tidak terdefinisi; pakai `settingsStore`
    const settingsObj = settingsStore.settings || {}
    // v.21.92.0527: helper kanonik — baca logoKop/kopLine* dari Pengaturan Web
    const kop = buildKopFromSettings(settingsObj)
    const rows = (santri.value || []).map((s, i) => ({
      no: i + 1,
      nama: s.nama || '',
      nis: s.nis || '',
      jk: s.jk || '',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      wa: s.wa || ''
    }))
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: 'DAFTAR SANTRI',
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 60 },
        { key: 'nis', header: 'No. Induk', width: 25 },
        { key: 'jk', header: 'JK', width: 12 },
        { key: 'lembaga', header: 'Lembaga', width: 35 },
        { key: 'kelas', header: 'Kelas', width: 25 },
        { key: 'wa', header: 'No. WA', width: 35 }
      ],
      rows,
      filename: `daftar-santri-${new Date().toISOString().slice(0, 10)}.pdf`
    })
    toast?.success?.('PDF santri berhasil dibuat')
  } catch (e) {
    toast?.error?.('Gagal cetak PDF: ' + (e?.message || e))
  }
}

// v.100 Batch11: kirim Data Santri ke Google Sheet (kolom ringkas mirip PDF)
async function kirimGoogleSheet() {
  if (sendingGsheet.value) return
  if (!gsheetConfigured()) {
    toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.')
    return
  }
  sendingGsheet.value = true
  try {
    const ss = settingsStore.settings || {}
    const rows = (santri.value || []).map((s, i) => ({
      no: i + 1,
      nama: s.nama || '',
      nis: s.nis || '',
      jk: s.jk || '',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      lembaga_sekolah: s.lembaga_sekolah || '',
      kelas_sekolah: s.kelas_sekolah || '',
      wa: s.wa || ''
    }))
    const { url } = await sendToSheet({
      rows, // v.100: WAJIB — tanpa ini Apps Script hanya tulis KOP + header (baris data kosong)
      title: `Data Santri ${new Date().toISOString().slice(0, 10)}`,
      sheetName: 'Data Santri',
      kop: [ss.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine2 || '', ss.kopLine3 || ''].filter(Boolean),
      subtitle: `Data Santri — ${rows.length} santri (${new Date().toLocaleDateString('id-ID')})`,
      columns: [
        { key: 'no', header: 'No', width: 6 },
        { key: 'nama', header: 'Nama Santri', width: 28 },
        { key: 'nis', header: 'No. Induk', width: 14 },
        { key: 'jk', header: 'L/P', width: 6 },
        { key: 'lembaga', header: 'Lembaga Qiraati', width: 16 },
        { key: 'kelas', header: 'Kelas', width: 14 },
        { key: 'lembaga_sekolah', header: 'Lembaga Sekolah', width: 16 },
        { key: 'kelas_sekolah', header: 'Kelas Sekolah', width: 14 },
        { key: 'wa', header: 'No. WA Wali', width: 18 }
      ]
    })
    toast.success(`${rows.length} santri terkirim ke Google Sheet.`)
    try { window.open(url, '_blank') } catch (e) { /* ignore */ }
  } catch (e) {
    toast.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    sendingGsheet.value = false
  }
}

async function exportSantriExcel() {
  if (exporting.value) return
  exporting.value = true
  try {
    // v.99: ekspor LENGKAP — selaras dgn template & impor (round-trip ekspor→edit→impor)
    const _g = (s) => Array.isArray(s.guru_sekolah) ? s.guru_sekolah.join(' | ') : (s.guru_sekolah || '')
    const rows = (santri.value || []).map((s, i) => ({
      no: i + 1,
      nis: s.nis || '', nis_sekolah: s.nis_sekolah || '', nisn: s.nisn || '', nik: s.nik || '',
      nama: s.nama || '', panggilan: s.nama_panggilan || '', jk: s.jk || '',
      tempat_lahir: s.tempat_lahir || '', tgl_lahir: s.tgl_lahir || '', tgl_masuk: s.tgl_masuk || '', no_kk: s.no_kk || '',
      wali: s.nama_wali || s.wali || '', wa: s.wa || '',
      lembaga: s.lembaga || '', kelas: s.kelas || '', juz: s.juz || '',
      guru_pagi: s.guru_pagi || '', guru_sore: s.guru_sore || '',
      lembaga_sekolah: s.lembaga_sekolah || '', kelas_sekolah: s.kelas_sekolah || '', guru_sekolah: _g(s), asal_sekolah: s.asal_sekolah || '',
      nama_ayah: s.nama_ayah || (s.ayah && s.ayah.nama) || '', nik_ayah: s.nik_ayah || (s.ayah && s.ayah.nik) || '',
      pendidikan_ayah: s.pendidikan_ayah || (s.ayah && s.ayah.pendidikan) || '', pekerjaan_ayah: s.pekerjaan_ayah || (s.ayah && s.ayah.pekerjaan) || '', hp_ayah: s.hp_ayah || (s.ayah && s.ayah.telp) || '',
      nama_ibu: s.nama_ibu || (s.ibu && s.ibu.nama) || '', nik_ibu: s.nik_ibu || (s.ibu && s.ibu.nik) || '',
      pendidikan_ibu: s.pendidikan_ibu || (s.ibu && s.ibu.pendidikan) || '', pekerjaan_ibu: s.pekerjaan_ibu || (s.ibu && s.ibu.pekerjaan) || '', hp_ibu: s.hp_ibu || (s.ibu && s.ibu.telp) || '',
      penghasilan_ortu: s.penghasilan_ortu || '',
      alamat: s.alamat || '', dusun: s.alamat_dusun || '', rt: s.alamat_rt || '', rw: s.alamat_rw || '',
      desa: s.alamat_desa || '', kecamatan: s.alamat_kecamatan || '', kabupaten: s.alamat_kabupaten || '', provinsi: s.alamat_provinsi || '',
      aktif: s.aktif === false ? 'false' : 'true', mukim: s.is_mukim ? 'true' : 'false', fullday: s.is_fullday ? 'true' : 'false',
      catatan: s.catatan_riwayat_pribadi || '', tgl_keluar: s.tgl_keluar || '', alasan_keluar: s.alasan_keluar || ''
    }))
    const ss = settingsStore.settings || {}
    await exportStyled(rows, {
      filename: `data_santri_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Data Santri',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Data Santri — ${rows.length} santri (${new Date().toLocaleDateString('id-ID')})`,
      columns: [
        { key: 'no', header: 'No', width: 5 },
        { key: 'nis', header: 'No. Induk', width: 12 },
        { key: 'nis_sekolah', header: 'NIS', width: 12 },
        { key: 'nisn', header: 'NISN', width: 14 },
        { key: 'nik', header: 'NIK', width: 18 },
        { key: 'nama', header: 'Nama Santri', width: 26 },
        { key: 'panggilan', header: 'Nama Panggilan', width: 14 },
        { key: 'jk', header: 'L/P', width: 5 },
        { key: 'tempat_lahir', header: 'Tempat Lahir', width: 14 },
        { key: 'tgl_lahir', header: 'Tgl Lahir (DD/MM/YYYY)', width: 14 },
        { key: 'tgl_masuk', header: 'Tgl Masuk (DD/MM/YYYY)', width: 14 },
        { key: 'no_kk', header: 'No KK', width: 18 },
        { key: 'wali', header: 'Nama Wali', width: 22 },
        { key: 'wa', header: 'No WA Wali', width: 16 },
        { key: 'lembaga', header: 'Lembaga Qiraati', width: 14 },
        { key: 'kelas', header: 'Kelas Qiraati', width: 12 },
        { key: 'juz', header: 'Juz (PTPT)', width: 8 },
        { key: 'guru_pagi', header: 'Guru Pagi', width: 18 },
        { key: 'guru_sore', header: 'Guru Sore', width: 18 },
        { key: 'lembaga_sekolah', header: 'Lembaga Sekolah', width: 14 },
        { key: 'kelas_sekolah', header: 'Kelas Sekolah', width: 12 },
        { key: 'guru_sekolah', header: 'Guru Sekolah (pisah |)', width: 22 },
        { key: 'asal_sekolah', header: 'Asal Sekolah', width: 18 },
        { key: 'nama_ayah', header: 'Nama Ayah', width: 20 },
        { key: 'nik_ayah', header: 'NIK Ayah', width: 18 },
        { key: 'pendidikan_ayah', header: 'Pendidikan Ayah', width: 14 },
        { key: 'pekerjaan_ayah', header: 'Pekerjaan Ayah', width: 14 },
        { key: 'hp_ayah', header: 'HP Ayah', width: 16 },
        { key: 'nama_ibu', header: 'Nama Ibu', width: 20 },
        { key: 'nik_ibu', header: 'NIK Ibu', width: 18 },
        { key: 'pendidikan_ibu', header: 'Pendidikan Ibu', width: 14 },
        { key: 'pekerjaan_ibu', header: 'Pekerjaan Ibu', width: 14 },
        { key: 'hp_ibu', header: 'HP Ibu', width: 16 },
        { key: 'penghasilan_ortu', header: 'Penghasilan Ortu', width: 14 },
        { key: 'alamat', header: 'Alamat', width: 28 },
        { key: 'dusun', header: 'Dusun/Jalan', width: 16 },
        { key: 'rt', header: 'RT', width: 6 },
        { key: 'rw', header: 'RW', width: 6 },
        { key: 'desa', header: 'Desa', width: 14 },
        { key: 'kecamatan', header: 'Kecamatan', width: 14 },
        { key: 'kabupaten', header: 'Kabupaten', width: 14 },
        { key: 'provinsi', header: 'Provinsi', width: 14 },
        { key: 'aktif', header: 'Status Aktif (true/false)', width: 12 },
        { key: 'mukim', header: 'Mukim (true/false)', width: 10 },
        { key: 'fullday', header: 'Fullday (true/false)', width: 10 },
        { key: 'catatan', header: 'Catatan Riwayat Pribadi (Mukim)', width: 26 },
        { key: 'tgl_keluar', header: 'Tgl Keluar (DD/MM/YYYY)', width: 14 },
        { key: 'alasan_keluar', header: 'Alasan Keluar', width: 18 }
      ]
    })
    toast.success(`Ekspor ${rows.length} santri ke Excel`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    exporting.value = false
  }
}

// v.21.13b.0526: Template TANPA KOP supaya importFile auto-detect headers di row 1
async function downloadTemplateSantri() {
  try {
    // v.99: template diselaraskan dengan SEMUA field form santri (biodata + ortu + alamat detail)
    const headers = [
      'No. Induk', 'NIS', 'NISN', 'NIK', 'Nama Santri', 'Nama Panggilan', 'L/P',
      'Tempat Lahir', 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Masuk (DD/MM/YYYY)', 'No KK',
      'Nama Wali', 'No WA Wali',
      'Lembaga Qiraati', 'Kelas Qiraati', 'Juz (PTPT)', 'Guru Pagi', 'Guru Sore',
      'Lembaga Sekolah', 'Kelas Sekolah', 'Guru Sekolah (pisah |)', 'Asal Sekolah',
      'Nama Ayah', 'NIK Ayah', 'Pendidikan Ayah', 'Pekerjaan Ayah', 'HP Ayah',
      'Nama Ibu', 'NIK Ibu', 'Pendidikan Ibu', 'Pekerjaan Ibu', 'HP Ibu', 'Penghasilan Ortu',
      'Alamat', 'Dusun/Jalan', 'RT', 'RW', 'Desa', 'Kecamatan', 'Kabupaten', 'Provinsi',
      'Status Aktif (true/false)', 'Mukim (true/false)', 'Fullday (true/false)',
      'Catatan Riwayat Pribadi (Mukim)', 'Tgl Keluar (DD/MM/YYYY)', 'Alasan Keluar'
    ]
    await exportStyled([], {
      filename: 'Template_Data_Santri.xlsx',
      sheetName: 'Template_Santri',
      // No KOP — headers at row 1
      columns: headers.map((h) => ({ key: h, header: h, width: Math.max(12, h.length + 2) }))
    })
    toast.success('Template santri ter-download. Nama=TitleCase, Lembaga=UPPERCASE saat impor.')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

function parseTglDDMMYYYY(v) {
  if (!v) return ''
  // v.99: guard bug epoch Excel — sel tanggal KOSONG sering terbaca SheetJS sebagai
  //   Date/serial 0 = 1899-12-30. Tahun < 1901 = mustahil utk data santri -> kosongkan
  //   (jangan isi otomatis). Berlaku tgl_lahir/tgl_masuk/tgl_keluar.
  if (v instanceof Date) {
    if (isNaN(v.getTime()) || v.getFullYear() < 1901) return ''
    return v.toISOString().slice(0, 10)
  }
  const s = String(v).trim()
  if (!s) return ''
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/)
  if (m) {
    if (Number(m[3]) < 1901) return ''
    return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  }
  // ISO atau format lain — buang epoch eksplisit
  if (s.slice(0, 10) === '1899-12-30' || s.slice(0, 10) === '1900-01-00') return ''
  return s
}

// v.21.22b.0526: parseBool — broader matching. Note: untuk field aktif, default true di call site.
function parseBool(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '').toLowerCase().trim()
  if (['true', 'ya', 'y', '1', 'aktif', 'mukim', 'fullday'].includes(s)) return true
  return false
}
// Khusus aktif — terima lebih flexible, default true kalau ambigu
function parseAktif(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '').toLowerCase().trim()
  if (['false', 'tidak', 'no', 'n', '0', 'tidak aktif', 'non-aktif', 'nonaktif', 'keluar', 'non aktif'].includes(s)) return false
  return true // default: aktif (kalau "Aktif" / "TRUE" / "1" / kosong / unknown)
}

async function onImportSantri(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importing.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong atau format tidak sesuai')
      importing.value = false
      e.target.value = ''
      return
    }
    const existing = santriRaw.value || []
    let newCount = 0, updateCount = 0, skipCount = 0
    const allMapped = []
    function _pick(row, ...aliases) {
      for (const alias of aliases) {
        if (row[alias] !== undefined && row[alias] !== null && row[alias] !== '') return row[alias]
      }
      const lowerMap = {}
      for (const k of Object.keys(row)) lowerMap[k.toLowerCase().trim()] = row[k]
      for (const alias of aliases) {
        const v = lowerMap[String(alias).toLowerCase().trim()]
        if (v !== undefined && v !== null && v !== '') return v
      }
      return ''
    }
    // v.100: template BARU punya kolom 'No. Induk' (auto pondok) + 'NIS' (NIS Dinas manual).
    //   Template LAMA hanya punya 'NIS' = nomor auto pondok → tetap dipetakan ke field nis (No. Induk).
    const hasNoIndukCol = rows.some((row) => Object.keys(row).some((k) => String(k).toLowerCase().replace(/[\s.]/g, '') === 'noinduk'))
    for (const r of rows) {
      const namaRaw = String(_pick(r, 'Nama Santri', 'Nama', 'NAMA', 'nama') || '').trim()
      if (!namaRaw) { skipCount++; continue }
      const nama = toTitleCase(namaRaw)
      const nis = String((hasNoIndukCol ? _pick(r, 'No. Induk', 'No Induk', 'no_induk') : _pick(r, 'NIS', 'nis')) || '').trim()
      const nisSekolah = String((hasNoIndukCol ? _pick(r, 'NIS', 'nis') : _pick(r, 'NIS Dinas', 'nis_sekolah')) || '').trim()
      // v.100 Batch12: auto-deteksi nama lembaga ke bentuk kanonik ("PRA PTPT" -> "Pra PTPT", dst)
      const lembaga = canonLembaga(_pick(r, 'Lembaga Qiraati', 'Lembaga', 'lembaga'))
      const kelas = String(_pick(r, 'Kelas Qiraati', 'Kelas', 'kelas') || '').trim()
      const idx = existing.findIndex((s) =>
        (nis && String(s.nis || '') === nis) ||
        String(s.nama || '').toLowerCase().trim() === nama.toLowerCase()
      )
      const action = idx >= 0 ? 'update' : 'new'
      if (action === 'new') newCount++; else updateCount++
      const aktifVal = _pick(r, 'Status Aktif (true/false)', 'Status Aktif', 'Aktif', 'aktif')
      const waList = parseMultipleWA(_pick(r, 'No WA Wali', 'No WA', 'WA Wali', 'WA', 'wa'))
      allMapped.push({
        existingId: idx >= 0 ? existing[idx].id : null,
        action,
        nama, nis, lembaga, kelas,
        wali: toTitleCase(_pick(r, 'Nama Wali', 'Wali', 'wali') || ''),
        data: {
          nis, nama,
          ...(hasNoIndukCol ? { nis_sekolah: nisSekolah } : {}), // template lama tak punya kolom NIS Dinas → jangan timpa
          // v.99: biodata tambahan (selaras form + template baru)
          nisn: String(_pick(r, 'NISN', 'nisn') || '').trim(),
          nik: String(_pick(r, 'NIK', 'nik') || '').trim(),
          nama_panggilan: toTitleCase(_pick(r, 'Nama Panggilan', 'nama_panggilan') || ''),
          tempat_lahir: toTitleCase(_pick(r, 'Tempat Lahir', 'tempat_lahir') || ''),
          no_kk: String(_pick(r, 'No KK', 'No. KK', 'no_kk') || '').trim(),
          jk: String(_pick(r, 'L/P', 'JK', 'Jenis Kelamin', 'jk') || 'L').trim().toUpperCase().charAt(0),
          tgl_lahir: parseTglDDMMYYYY(_pick(r, 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Lahir', 'Tanggal Lahir', 'tgl_lahir')),
          tgl_masuk: parseTglDDMMYYYY(_pick(r, 'Tgl Masuk (DD/MM/YYYY)', 'Tgl Masuk', 'Tanggal Masuk', 'tgl_masuk')),
          wali: toTitleCase(_pick(r, 'Nama Wali', 'Wali', 'wali') || ''),
          wa: waList[0] || '',
          wa_2: waList[1] || '',
          lembaga, kelas,
          guru_pagi: toTitleCase(_pick(r, 'Guru Pagi', 'Guru Kelas Pagi', 'guru_pagi') || ''),
          guru_sore: toTitleCase(_pick(r, 'Guru Sore', 'Guru Kelas Sore', 'guru_sore') || ''),
          juz: String(_pick(r, 'Juz (PTPT)', 'Juz', 'juz') || '').trim().toUpperCase(),
          lembaga_sekolah: canonLembaga(_pick(r, 'Lembaga Sekolah', 'lembaga_sekolah')),
          kelas_sekolah: String(_pick(r, 'Kelas Sekolah', 'kelas_sekolah') || '').trim(),
          guru_sekolah: String(_pick(r, 'Guru Sekolah (pisah |)', 'Guru Sekolah', 'guru_sekolah') || '').split('|').map((s) => s.trim()).filter(Boolean),
          aktif: parseAktif(aktifVal),
          is_mukim: parseBool(_pick(r, 'Mukim (true/false)', 'Mukim', "Ma'had", 'is_mukim')),
          is_fullday: parseBool(_pick(r, 'Fullday (true/false)', 'Fullday', 'is_fullday')),
          catatan_riwayat_pribadi: String(_pick(r, 'Catatan Riwayat Pribadi (Mukim)', 'Catatan Riwayat Pribadi', 'catatan_riwayat_pribadi') || '').trim(),
          alamat: String(_pick(r, 'Alamat', 'alamat') || '').trim(),
          // v.99: alamat detail
          alamat_dusun: String(_pick(r, 'Dusun/Jalan', 'Dusun', 'alamat_dusun') || '').trim(),
          alamat_rt: String(_pick(r, 'RT', 'alamat_rt') || '').trim(),
          alamat_rw: String(_pick(r, 'RW', 'alamat_rw') || '').trim(),
          alamat_desa: String(_pick(r, 'Desa', 'Desa / Kelurahan', 'alamat_desa') || '').trim(),
          alamat_kecamatan: String(_pick(r, 'Kecamatan', 'alamat_kecamatan') || '').trim(),
          alamat_kabupaten: String(_pick(r, 'Kabupaten', 'alamat_kabupaten') || '').trim(),
          alamat_provinsi: String(_pick(r, 'Provinsi', 'alamat_provinsi') || '').trim(),
          // v.99: asal sekolah + penghasilan + data ortu (flat + nested ayah/ibu spt form)
          asal_sekolah: toTitleCase(_pick(r, 'Asal Sekolah', 'asal_sekolah') || ''),
          penghasilan_ortu: String(_pick(r, 'Penghasilan Ortu', 'penghasilan_ortu') || '').trim(),
          nama_ayah: toTitleCase(_pick(r, 'Nama Ayah', 'nama_ayah') || ''),
          nik_ayah: String(_pick(r, 'NIK Ayah', 'nik_ayah') || '').trim(),
          pendidikan_ayah: String(_pick(r, 'Pendidikan Ayah', 'pendidikan_ayah') || '').trim(),
          pekerjaan_ayah: String(_pick(r, 'Pekerjaan Ayah', 'pekerjaan_ayah') || '').trim(),
          hp_ayah: String(_pick(r, 'HP Ayah', 'hp_ayah') || '').trim(),
          nama_ibu: toTitleCase(_pick(r, 'Nama Ibu', 'nama_ibu') || ''),
          nik_ibu: String(_pick(r, 'NIK Ibu', 'nik_ibu') || '').trim(),
          pendidikan_ibu: String(_pick(r, 'Pendidikan Ibu', 'pendidikan_ibu') || '').trim(),
          pekerjaan_ibu: String(_pick(r, 'Pekerjaan Ibu', 'pekerjaan_ibu') || '').trim(),
          hp_ibu: String(_pick(r, 'HP Ibu', 'hp_ibu') || '').trim(),
          ayah: {
            nama: toTitleCase(_pick(r, 'Nama Ayah', 'nama_ayah') || ''),
            nik: String(_pick(r, 'NIK Ayah', 'nik_ayah') || '').trim(),
            pekerjaan: String(_pick(r, 'Pekerjaan Ayah', 'pekerjaan_ayah') || '').trim(),
            pendidikan: String(_pick(r, 'Pendidikan Ayah', 'pendidikan_ayah') || '').trim(),
            telp: String(_pick(r, 'HP Ayah', 'hp_ayah') || '').trim()
          },
          ibu: {
            nama: toTitleCase(_pick(r, 'Nama Ibu', 'nama_ibu') || ''),
            nik: String(_pick(r, 'NIK Ibu', 'nik_ibu') || '').trim(),
            pekerjaan: String(_pick(r, 'Pekerjaan Ibu', 'pekerjaan_ibu') || '').trim(),
            pendidikan: String(_pick(r, 'Pendidikan Ibu', 'pendidikan_ibu') || '').trim(),
            telp: String(_pick(r, 'HP Ibu', 'hp_ibu') || '').trim()
          },
          // v.99: status keluar
          tgl_keluar: parseTglDDMMYYYY(_pick(r, 'Tgl Keluar (DD/MM/YYYY)', 'Tgl Keluar', 'tgl_keluar')),
          alasan_keluar: String(_pick(r, 'Alasan Keluar', 'alasan_keluar') || '').trim(),
          custom_fields: {}
        }
      })
    }
    importPreview.value = { rows: allMapped, preview: allMapped.slice(0, 50), newCount, updateCount, skipCount }
  } catch (e) {
    toast.error('Gagal baca file: ' + (e.message || e))
  } finally {
    importing.value = false
    e.target.value = ''
  }
}

async function confirmImportSantri() {
  if (!importPreview.value) return
  importing.value = true
  let ok = 0, fail = 0
  try {
    for (const item of importPreview.value.rows) {
      try {
        const numId = item.existingId
          ? (Number(item.existingId) || Number(String(item.existingId).replace(/\D/g, '')) || Date.now() + ok)
          : (Date.now() + ok)
        await setDoc(doc(db, 'santri', String(numId)), {
          id: numId,
          ...item.data,
          _imported_v21_26_at: serverTimestamp()
        }, { merge: true })
        ok++
      } catch (e) {
        fail++
        console.error('Import row failed:', e)
      }
    }
    toast.success(`Impor selesai: ${ok} OK, ${fail} gagal`)
    // v.100 Batch14: regenerate No. Induk otomatis (IMPOR = reshuffle SEMUA santri by tgl lahir tertua → nama A–Z)
    try {
      const fresh = await getAll('santri')
      const plan = planRegenerateNis(fresh)
      const res = await applyNisChanges(plan.changes, { sesi: authStore?.sesiAktif, mode: 'impor' })
      let msg = `No. Induk digenerate ulang: ${res.changed} diperbarui`
      if (plan.skipped.length) msg += `, ${plan.skipped.length} tanpa tgl lahir (dilewati)`
      if (res.fail) msg += `, ${res.fail} gagal`
      toast.success(msg)
    } catch (e) {
      toast.warning('No. Induk gagal digenerate ulang: ' + (e.message || e))
    }
    importPreview.value = null
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    importing.value = false
  }
}
</script>
