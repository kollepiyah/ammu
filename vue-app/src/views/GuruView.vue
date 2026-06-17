<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Access denied (non-admin) -->
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses terbatas</p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Halaman Data Guru hanya dapat diakses oleh admin pondok.
      </p>
    </div>

    <template v-else>
      <!-- v.98: input impor tersembunyi (dipicu aksi pita "Impor XLSX" di Electron) -->
      <input ref="importInputGuru" type="file" accept=".xlsx,.xls" class="hidden" @change="onImportGuru" />
      <!-- v.21.14.0526: Header refactor. v.98: header disembunyikan di Electron (aksi -> pita) -->
      <div v-if="!isDesktop" class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="flex items-baseline gap-2 flex-wrap">
            <h1 class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap">
              <i class="fas fa-chalkboard-teacher text-teal-500 mr-1"></i>Data Guru / Pegawai
            </h1>
            <p class="text-[11px] text-[var(--text-secondary)]">— Master data guru &amp; pegawai pondok</p>
          </div>
          <!-- Stats badges + tombol tambah — v.103 mobile: toolbar 1-baris scroll-samping -->
          <div class="flex flex-nowrap md:flex-wrap gap-2 items-center overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink -mx-1 px-1 lg:mx-0 lg:px-0">
            <div class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs">
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-[var(--text-secondary)] ml-1">total</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs">
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{ stats.aktif }}</span>
              <span class="text-[var(--text-secondary)] ml-1">aktif</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 text-xs">
              <span class="text-rose-700 dark:text-rose-300 font-bold">{{ stats.tidakAktif }}</span>
              <span class="text-[var(--text-secondary)] ml-1">non-aktif</span>
            </div>
            <!-- v.21.17c.0526: View vs Master mode actions -->
            <!-- v.21.109.0527: warna cyan (action) bukan rose (danger) -->
            <div class="flex flex-nowrap md:flex-wrap gap-2 items-center [&>*]:shrink-0 md:[&>*]:shrink">
            <button @click="printPage" aria-label="Cetak daftar guru PDF" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer no-print">
              <i class="fas fa-file-pdf"></i>Cetak PDF
            </button>
            <button @click="exportGuruExcel" :disabled="exporting" aria-label="Ekspor daftar guru Excel" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
              <i :class="['fas', exporting ? 'fa-spinner fa-spin' : 'fa-file-excel']"></i>{{ exporting ? 'Ekspor...' : 'Ekspor Excel' }}
            </button>
            <button v-if="gsheetConfigured()" @click="kirimGuruGsheet" :disabled="sendingGsheet" aria-label="Kirim daftar guru ke Google Sheet" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
              <i :class="['fas', sendingGsheet ? 'fa-spinner fa-spin' : 'fa-table']"></i>{{ sendingGsheet ? 'Mengirim...' : 'Google Sheet' }}
            </button>
            <router-link v-if="!isMasterMode" to="/master-data?tab=guru" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition" title="CRUD guru di Master Data">
              <i class="fas fa-edit"></i>Kelola
            </router-link>
            <template v-if="isMasterMode">
              <button @click="downloadTemplateGuru" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
                <i class="fas fa-download"></i>Template
              </button>
              <label class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer">
                <i :class="['fas', importingGuru ? 'fa-spinner fa-spin' : 'fa-upload']"></i>{{ importingGuru ? 'Impor...' : 'Impor XLSX' }}
                <input type="file" accept=".xlsx,.xls" class="hidden" @change="onImportGuru" :disabled="importingGuru" />
              </label>
              <router-link to="/guru/new?from=master" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition">
                <i class="fas fa-plus"></i>Tambah Guru
              </router-link>
            </template>
            </div>
          </div>
        </div>
      </div>

      <!-- v.21.11.0526: Import preview modal -->
      <div v-if="importPreviewGuru" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col">
          <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <h3 class="text-base font-black text-[var(--text-primary)]">
              <i class="fas fa-file-import text-cyan-600 mr-2"></i>Preview Impor Guru — {{ importPreviewGuru.rows.length }} baris
            </h3>
            <button @click="importPreviewGuru = null" class="text-[var(--text-tertiary)] hover:text-rose-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <div class="p-4 overflow-auto flex-1 text-xs">
            <div class="grid grid-cols-3 gap-2 mb-3">
              <div class="bg-emerald-50 rounded p-2 border border-emerald-200">
                <p class="text-[10px] text-emerald-700 font-bold uppercase">Baru</p>
                <p class="text-2xl font-black text-emerald-700">{{ importPreviewGuru.newCount }}</p>
              </div>
              <div class="bg-cyan-50 rounded p-2 border border-cyan-200">
                <p class="text-[10px] text-cyan-700 font-bold uppercase">Update</p>
                <p class="text-2xl font-black text-cyan-700">{{ importPreviewGuru.updateCount }}</p>
              </div>
              <div class="bg-rose-50 rounded p-2 border border-rose-200">
                <p class="text-[10px] text-rose-700 font-bold uppercase">Skip</p>
                <p class="text-2xl font-black text-rose-700">{{ importPreviewGuru.skipCount }}</p>
              </div>
            </div>
            <table class="w-full border border-[var(--border-subtle)]">
              <thead class="bg-[var(--bg-muted)]">
                <tr>
                  <th class="px-2 py-1 text-left">#</th>
                  <th class="px-2 py-1 text-left">Aksi</th>
                  <th class="px-2 py-1 text-left">Nama</th>
                  <th class="px-2 py-1 text-left">Jabatan</th>
                  <th class="px-2 py-1 text-left">Lembaga</th>
                  <th class="px-2 py-1 text-left">WA</th>
                  <th class="px-2 py-1 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in importPreviewGuru.preview" :key="i" class="border-t border-[var(--border-subtle)]">
                  <td class="px-2 py-1">{{ i + 1 }}</td>
                  <td class="px-2 py-1"><span :class="r.action === 'new' ? 'text-emerald-700' : 'text-cyan-700'" class="font-bold">{{ r.action.toUpperCase() }}</span></td>
                  <td class="px-2 py-1">{{ r.nama }}</td>
                  <td class="px-2 py-1">{{ r.jabatan }}</td>
                  <td class="px-2 py-1">{{ r.lembaga }}</td>
                  <td class="px-2 py-1">{{ r.wa }}</td>
                  <td class="px-2 py-1">{{ r.status }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="importPreviewGuru.rows.length > importPreviewGuru.preview.length" class="text-[10px] italic text-[var(--text-secondary)] mt-2">
              ...dan {{ importPreviewGuru.rows.length - importPreviewGuru.preview.length }} baris lagi
            </p>
          </div>
          <div class="p-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
            <button @click="importPreviewGuru = null" class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-200 hover:bg-slate-300">Batal</button>
            <button @click="confirmImportGuru" :disabled="importingGuru" class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50">
              <i :class="['fas', importingGuru ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>{{ importingGuru ? 'Importing...' : `Konfirmasi (${importPreviewGuru.newCount + importPreviewGuru.updateCount})` }}
            </button>
          </div>
        </div>
      </div>

      <!-- Search + filter bar -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm">
        <!-- Pencarian -->
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama, WA, jabatan, atau username..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
          />
        </div>
        <!-- v.97.0626: filter dropdown (lembaga Qiraati + Sekolah, status) gantikan chip -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <select v-model="filterLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua lembaga</option>
            <optgroup v-if="uniqueLembaga.length" label="Qiraati (Ngaji)">
              <option v-for="l in uniqueLembaga" :key="'ng-' + l" :value="l">{{ l }}</option>
            </optgroup>
            <optgroup v-if="uniqueLembagaSekolah.length" label="Sekolah (Formal)">
              <option v-for="l in uniqueLembagaSekolah" :key="'sk-' + l" :value="l">{{ l }}</option>
            </optgroup>
          </select>
          <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="aktif">Hanya yang aktif</option>
            <option value="">Semua status</option>
            <option value="tidak_aktif">Tidak aktif saja</option>
          </select>
        </div>
      </div>

      <!-- v.21.22c.0526: Bulk action bar (Master mode only) -->
      <div v-if="isMasterMode && selectedCount > 0" class="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl p-3 border border-teal-300 dark:border-teal-700 shadow-sm flex flex-wrap items-center gap-2 mb-3">
        <span class="text-xs font-black text-teal-800 dark:text-teal-200"><i class="fas fa-check-square mr-1"></i>{{ selectedCount }} terpilih</span>
        <button @click="bulkSetStatus('Aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-check"></i>Set Aktif</button>
        <button @click="bulkSetStatus('Non-aktif')" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-user-slash"></i>Set Non-aktif</button>
        <button @click="bulkDeleteGuru" :disabled="bulkSaving" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-[11px] font-bold transition cursor-pointer"><i class="fas fa-trash"></i>Hapus</button>
        <label class="h-8 px-2 inline-flex items-center gap-1 rounded-lg bg-white dark:bg-slate-700 border border-[var(--border-default)] text-[11px]">
          <select v-model="bulkRoleSistem" class="bg-transparent text-[11px] font-bold text-[var(--text-primary)] outline-none cursor-pointer">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="admin_keuangan">admin_keuangan</option>
            <option value="super_admin">super_admin</option>
          </select>
          <button @click="bulkSetRole" :disabled="bulkSaving" class="ml-1 px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-[10px] font-bold cursor-pointer">Set Role</button>
        </label>
        <button @click="clearSelection" class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-[var(--text-primary)] text-[11px] font-bold transition cursor-pointer ml-auto"><i class="fas fa-times"></i>Batal</button>
      </div>

      <!-- v.21.22c.0526: Select-all (Master mode only) -->
      <div v-if="isMasterMode && guru.length > 0" class="bg-[var(--bg-card)] rounded-2xl px-4 py-2 border border-[var(--border-subtle)] shadow-sm flex items-center gap-2 mb-2">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" :checked="isAllVisibleSelected" :indeterminate.prop="isSomeVisibleSelected" @change="toggleSelectAllVisible" class="w-4 h-4 rounded border-[var(--border-default)] text-teal-600 focus:ring-teal-500 cursor-pointer" />
          <span class="text-[11px] font-bold text-[var(--text-secondary)]">Pilih semua ({{ guru.length }})</span>
        </label>
        <span v-if="selectedCount > 0" class="text-[10px] text-teal-700 dark:text-teal-300 font-bold">— {{ selectedCount }} terpilih</span>
      </div>


      <!-- v.21.115.0528: skeleton loader replace spinner -->
      <SkeletonCard v-if="loading" :count="5" variant="list" />

      <!-- Empty — v.91.0626: komponen EmptyState (konsisten) -->
      <EmptyState
        v-else-if="guru.length === 0"
        icon="fa-user-slash"
        :title="hasFilter ? 'Tidak ada guru yang cocok' : 'Belum ada data guru'"
        :description="hasFilter ? 'Coba ubah filter atau kata kunci pencarian' : 'Tambah guru pertama di Master Data legacy.'"
      />

      <!-- v.21.17b.0526: List view-only -->
      <template v-else>

        <div class="space-y-2">
          <div
            v-for="g in guruShown"
            :key="g.id"
            @click="goProfil(g, $event)"
            :class="[
              'bg-[var(--bg-card)] rounded-xl p-3 md:p-4 border shadow-sm hover:shadow-md transition cursor-pointer',
              selected.has(String(g.id)) ? 'border-teal-400 ring-2 ring-teal-100 dark:ring-teal-900/40' : 'border-[var(--border-subtle)]'
            ]"
          >
            <div class="flex items-start gap-3">
              <!-- v.21.22c.0526: Checkbox (Master mode only) -->
              <input v-if="isMasterMode" type="checkbox" :checked="selected.has(String(g.id))" @change="toggleSelect(g.id)" class="flex-shrink-0 mt-2 w-4 h-4 rounded border-[var(--border-default)] text-teal-600 focus:ring-teal-500 cursor-pointer" />
              <!-- Avatar -->
              <div
                class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-700 dark:to-emerald-700 border-2 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden"
              >
                <img v-if="g.foto" :src="g.foto" alt="Foto" class="w-full h-full object-cover" />
                <i v-else class="fas fa-chalkboard-teacher text-teal-500 dark:text-teal-200"></i>
              </div>
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm md:text-base font-black text-[var(--text-primary)] truncate">
                      {{ getNamaGuruGelar(g.nama, g.jk) }}
                    </h3>
                    <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      {{ g.jabatan || '—' }}{{ g.jabatan_tambahan ? ` · ${g.jabatan_tambahan}` : '' }}
                      <span v-if="g.jk"> · {{ g.jk === 'L' ? 'L' : 'P' }}</span>
                    </p>
                  </div>
                  <span
                    v-if="isAktif(g)"
                    class="text-[9px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0"
                  >
                    Aktif
                  </span>
                  <span
                    v-else
                    class="text-[9px] bg-slate-200 dark:bg-slate-700 text-[var(--text-secondary)] border border-[var(--border-default)] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex-shrink-0"
                  >
                    Non-aktif
                  </span>
                </div>
                <!-- Tags row -->
                <div class="flex flex-wrap gap-1 mt-1.5">
                  <span
                    v-if="g.lembaga"
                    class="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-bold"
                  >
                    {{ g.lembaga }}
                  </span>
                  <span
                    v-if="g.lembaga_sekolah"
                    class="text-[10px] bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 px-2 py-0.5 rounded font-bold"
                  >
                    Sekolah: {{ g.lembaga_sekolah }}
                  </span>
                  <span
                    v-if="g.shift"
                    class="text-[10px] bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 px-2 py-0.5 rounded font-bold uppercase"
                  >
                    Shift: {{ g.shift.replace('_', '+') }}
                  </span>
                  <span
                    v-if="g.role_sistem && g.role_sistem !== 'user'"
                    class="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 px-2 py-0.5 rounded font-bold uppercase"
                  >
                    {{ g.role_sistem }}
                  </span>
                </div>
                <!-- Tugas duration -->
                <p
                  v-if="g.tanggal_tugas"
                  class="text-[10px] text-[var(--text-secondary)] mt-1.5"
                >
                  <i class="fas fa-clock mr-1"></i>{{ hitungLamaMengajar(g.tanggal_tugas) }}
                  <span class="text-[var(--text-tertiary)]">· sejak {{ formatTanggal(g.tanggal_tugas) }}</span>
                </p>
                <!-- WA + username -->
                <div class="flex items-center gap-2 mt-1.5 text-[11px] text-[var(--text-secondary)]">
                  <span v-if="g.username" class="text-[var(--text-secondary)]">
                    <i class="fas fa-at mr-1"></i>{{ g.username }}
                  </span>
                  <a
                    v-if="g.wa"
                    :href="`https://wa.me/${cleanWa(g.wa)}`"
                    target="_blank"
                    class="ml-auto text-green-600 dark:text-green-400 hover:text-green-700 flex items-center gap-1 flex-shrink-0"
                  >
                    <i class="fab fa-whatsapp"></i>{{ g.wa }}
                  </a>
                </div>
                <!-- v.21.22c.0526: Edit/Toggle Aktif/Delete (Master mode only) -->
                <div v-if="isMasterMode" class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
                  <!-- v.21.24.0526: Reset Sandi tombol -->
                  <button @click="resetSandiGuru(g)" class="text-[10px] text-cyan-700 dark:text-cyan-300 hover:underline font-bold" title="Reset sandi ke 1234">
                    <i class="fas fa-key mr-1"></i>Reset Sandi
                  </button>
                  <button @click="toggleAktifGuru(g)" :class="['text-[10px] font-bold hover:underline', isAktif(g) ? 'text-cyan-700 dark:text-cyan-300' : 'text-emerald-700 dark:text-emerald-300']">
                    <i :class="['fas', isAktif(g) ? 'fa-toggle-off' : 'fa-toggle-on', 'mr-1']"></i>{{ isAktif(g) ? 'Non-aktifkan' : 'Aktifkan' }}
                  </button>
                  <router-link :to="`/guru/${g.id}/edit?from=master`" class="text-[10px] text-teal-700 dark:text-teal-300 hover:underline font-bold">
                    <i class="fas fa-edit mr-1"></i>Edit
                  </router-link>
                  <button @click="deleteGuru(g)" class="text-[10px] text-rose-700 dark:text-rose-300 hover:underline font-bold">
                    <i class="fas fa-trash mr-1"></i>Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Footer -->
      <p class="text-center text-[10px] text-slate-400 dark:text-[var(--text-secondary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>Menampilkan {{ guru.length }} guru ·
        Vue 3 · Phase 5.6
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
// v.21.17c.0526: mode prop — 'view' (sidebar, default) atau 'master' (Master Data, full CRUD)
const props = defineProps({ mode: { type: String, default: 'view' } })
const isMasterMode = computed(() => props.mode === 'master')
import { useExcel } from '@/composables/useExcel'
import { useSettingsStore } from '@/stores/settings'
import { useToast as _useToastGuruExp } from '@/composables/useToast'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'
import { useGuru } from '@/composables/useGuru'
import { useConfirm } from '@/composables/useConfirm'
// v.21.115.0528: skeleton loader
import SkeletonCard from '@/components/layout/SkeletonCard.vue'
import EmptyState from '@/components/layout/EmptyState.vue' // v.91.0626: empty-state konsisten
// v.21.11.0526: + deleteOne untuk delete & bulk delete
import { updateOne, deleteOne, subscribeDoc, getAll } from '@/services/firestore'
import { planRegenerateNig, applyNigChanges } from '@/utils/nigGenerator' // v.100 Batch16: auto-NIG pasca impor (reshuffle tgl tugas terlama)
import { useAuthStore as _useAuthStoreGuru } from '@/stores/auth'
// v.21.13b.0526: + toTitleCase + normalizeWA + parseMultipleWA (dual WA)
import { getNamaGuruGelar, formatTanggal, hitungLamaMengajar, toTitleCase, normalizeWA, parseMultipleWA } from '@/utils/format'
import { sortLembagaNames } from '@/utils/santriSort' // v.100 Batch10: urutan canonical dropdown lembaga

const {
  guru,
  guruRaw,
  loading,
  search,
  filterLembaga,
  filterJabatan,
  filterStatus,
  stats,
  isFullAccess
} = useGuru()

// v.99: sumber FILTER jabatan = master/jabatan (yang kyai tambahkan), bukan distinct dari data guru.
const jabatanMaster = ref([])
let _unsubJabatanGV = null
onMounted(() => {
  _unsubJabatanGV = subscribeDoc('master', 'jabatan', (d) => {
    const items = Array.isArray(d?.items) ? d.items.map((it) => it && it.nama).filter(Boolean) : []
    const list = Array.isArray(d?.list) ? d.list.filter(Boolean) : []
    jabatanMaster.value = items.length ? items : list
  })
})
onUnmounted(() => { if (_unsubJabatanGV) { try { _unsubJabatanGV() } catch (e) {} } })

// v.91.0626: prefill pencarian dari ?q= (global search header)
const _route = useRoute()
watch(() => _route.query.q, (v) => { if (v != null && v !== '') search.value = String(v) }, { immediate: true })
// v.98: pita "Data Guru" (?tipe=guru) vs "Data Pegawai" (?tipe=pegawai) — pisah guru vs pegawai non-guru.
// Heuristik (belum ada field eksplisit): jabatan mengandung guru/ustadz/pengajar/mudarris/wali kelas/kepala
// dianggap GURU; selain itu PEGAWAI. Ganti regex / pakai field khusus bila kyai mau klasifikasi lain.
const tipeFilter = computed(() => String(_route.query.tipe || '').toLowerCase())
// v.100 FIX: utamakan field eksplisit `tipe_pegawai` (guru/pegawai/pegawai_guru + legacy ngaji/sekolah).
// Tanpa ini, guru yang `jabatan`-nya tak cocok regex (mis. kosong/"Tenaga Pendidik") salah terfilter jadi PEGAWAI.
function _isPengajar(g) {
  const t = String(g.tipe_pegawai || '').toLowerCase().trim()
  if (['guru', 'pegawai_guru', 'ngaji', 'ngaji_sekolah', 'sekolah'].includes(t)) return true
  if (['pegawai', 'admin'].includes(t)) return false
  // fallback heuristik jabatan bila tipe_pegawai kosong / legacy tak dikenal
  const j = (String(g.jabatan || '') + ' ' + String(g.jabatan_tambahan || '')).toLowerCase()
  return /guru|ustadz|ustadzah|pengajar|mu.?allim|mudarr?is|asatidz|wali\s*kelas|kepala|pengasuh/.test(j)
}
const guruShown = computed(() => {
  const t = tipeFilter.value
  if (t === 'guru') return guru.value.filter(_isPengajar)
  if (t === 'pegawai') return guru.value.filter((g) => !_isPengajar(g))
  return guru.value
})
// v.91.0626: klik card -> halaman profil (abaikan klik tombol/link/checkbox)
const router = useRouter()
function goProfil(g, e) {
  if (e && e.target && e.target.closest('button, a, input, label')) return
  router.push('/profil/guru/' + g.id)
}

// v.21.24d.0526: Dedupe lembaga case-insensitive — "TPQ Pagi" / "TPQ PAGI" / "TPQ pagi" → 1 entry
// Prefer canonical capitalization (Title Case match master/lembaga)
const uniqueLembaga = computed(() => {
  const map = new Map() // key=lowercase, value=canonical (first occurrence dengan format proper)
  for (const g of guruRaw.value) {
    const raw = String(g?.lembaga || '').trim()
    if (!raw) continue
    const key = raw.toLowerCase()
    if (!map.has(key)) {
      // Pakai Title Case kalau yang ada all-caps, else as-is
      const canonical = raw === raw.toUpperCase()
        ? raw.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
        : raw
      map.set(key, canonical)
    }
  }
  return sortLembagaNames([...map.values()]) // v.100 Batch10: urut canonical
})

// v.97.0626: daftar lembaga SEKOLAH (formal) utk dropdown filter (dedupe case-insensitive + Title Case)
const uniqueLembagaSekolah = computed(() => {
  const map = new Map()
  for (const g of guruRaw.value) {
    const raw = String(g?.lembaga_sekolah || '').trim()
    if (!raw) continue
    const key = raw.toLowerCase()
    if (!map.has(key)) {
      const canonical = raw === raw.toUpperCase()
        ? raw.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
        : raw
      map.set(key, canonical)
    }
  }
  return sortLembagaNames([...map.values()]) // v.100 Batch10: urut canonical
})

const uniqueJabatan = computed(() => {
  // v.99: hanya jabatan dari master/jabatan (ditambahkan kyai). Fallback distinct guru bila master kosong.
  if (jabatanMaster.value.length) {
    return [...new Set(jabatanMaster.value)].sort((a, b) => String(a).localeCompare(String(b), 'id'))
  }
  const set = new Set()
  for (const g of guruRaw.value) {
    if (g?.jabatan) set.add(g.jabatan)
  }
  return [...set].sort()
})

const hasFilter = computed(
  () =>
    !!search.value ||
    !!filterLembaga.value ||
    !!filterJabatan.value ||
    filterStatus.value !== 'aktif'
)

function isAktif(g) {
  return String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'
}
function cleanWa(wa) {
  return String(wa || '').replace(/[^0-9]/g, '').replace(/^0/, '62')
}
// v.21.25.0526: Cetak PDF code-based jsPDF + autoTable
async function printPage() {
  try {
    const settingsObj = _settingsExp?.settings || {}
    // v.21.92.0527: helper kanonik — baca logoKop/kopLine* dari Pengaturan Web
    const kop = buildKopFromSettings(settingsObj)
    const rows = (guru.value || []).map((g, i) => ({
      no: i + 1,
      // v.21.93.0527: kirim string nama (+jk), bukan seluruh objek (sebelumnya jadi [object Object])
      nama: getNamaGuruGelar ? getNamaGuruGelar(g.nama, g.jk) : (g.nama || ''),
      jk: g.jk || '',
      jabatan: g.jabatan || '',
      lembaga: [g.lembaga, g.lembaga_sekolah].filter(Boolean).join(' / '),
      shift: g.shift || '',
      wa: g.wa || '',
      status: g.status || 'Aktif'
    }))
    await buildListPdf({
      kind: 'umum',
      orientation: 'l',
      format: 'a4',
      kop,
      title: 'DAFTAR GURU / PEGAWAI',
      columns: [
        { key: 'no', header: 'No', width: 12 },
        { key: 'nama', header: 'Nama', width: 55 },
        { key: 'jk', header: 'JK', width: 10 },
        { key: 'jabatan', header: 'Jabatan', width: 35 },
        { key: 'lembaga', header: 'Lembaga', width: 50 },
        { key: 'shift', header: 'Shift', width: 20 },
        { key: 'wa', header: 'No. WA', width: 32 },
        { key: 'status', header: 'Status', width: 20 }
      ],
      rows,
      filename: `daftar-guru-${new Date().toISOString().slice(0, 10)}.pdf`
    })
  } catch (e) {
    if (_toastExp) _toastExp.error('Gagal cetak PDF: ' + (e?.message || e))
  }
}
// v.20.41.0526: Export Excel
const exporting = ref(false)
// v.21.11.0526: + importFile untuk Impor XLSX
const { exportStyled, importFile } = useExcel()
// v.100 Batch12: kirim Data Guru ke Google Sheet (hybrid, mirip PDF) — reuse rows/kolom Excel
const { isConfigured: gsheetConfigured, sendToSheet: _sendGuruSheet } = useGoogleSheet()
const sendingGsheet = ref(false)
const importingGuru = ref(false)

// v.98 full-native (Electron): header disembunyikan, aksi pindah ke grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
const importInputGuru = ref(null)
function triggerImportGuru() {
  try {
    importInputGuru.value && importInputGuru.value.click()
  } catch (e) {
    /* ignore */
  }
}
definePageActions(() => {
  if (!isFullAccess.value) return []
  const acts = [
    { label: 'Cetak PDF', icon: 'printer', on: printPage },
    { label: 'Ekspor Excel', icon: 'download', on: exportGuruExcel, disabled: exporting.value }
  ]
  if (gsheetConfigured()) acts.push({ label: 'Google Sheet', icon: 'file', on: kirimGuruGsheet, disabled: sendingGsheet.value })
  if (isMasterMode.value) {
    acts.push({ label: 'Tambah Guru', icon: 'plus', primary: true, on: () => router.push('/guru/new?from=master') })
    acts.push({ label: 'Template', icon: 'download', on: downloadTemplateGuru })
    acts.push({ label: 'Impor XLSX', icon: 'file', on: triggerImportGuru, disabled: importingGuru.value })
  } else {
    acts.push({ label: 'Kelola', icon: 'edit', primary: true, on: () => router.push('/master-data?tab=guru') })
  }
  return acts
})
const importPreviewGuru = ref(null)
const _settingsExp = useSettingsStore()
const _toastExp = _useToastGuruExp()
const _authStoreGuru = _useAuthStoreGuru() // v.100 Batch16: atribusi user utk audit_log generate NIG

// v.99: ekspor LENGKAP — selaras template & impor (+ jabatan tambahan, tanggal tugas, NIG, No Rek BMT, tipe/shift/role/fingerprint)
function _buildExcelRows(list) {
  return list.map((g, i) => ({
    no: i + 1,
    nama: g.nama || '',
    nik: g.nik || '',
    jk: g.jk || '',
    tgl_lahir: g.tgl_lahir || '',
    jabatan: g.jabatan || '',
    jabatan_tambahan: g.jabatan_tambahan || '',
    lembaga: g.lembaga || '',
    lembaga_sekolah: g.lembaga_sekolah || '',
    tanggal_tugas: g.tanggal_tugas || '',
    nig: g.nig || g.ekgq || g.no_ekgq || g.no_syahadah || '',
    rek_bmt: g.rek_bmt || '',
    pendidikan: g.pendidikan_terakhir || '',
    wa: g.wa || g.no_wa || '',
    alamat: g.alamat || '',
    tipe_pegawai: g.tipe_pegawai || '',
    shift: g.shift || '',
    role_sistem: g.role_sistem || '',
    id_fingerprint: g.id_fingerprint || '',
    status: g.status || 'Aktif'
  }))
}
const _excelColumns = [
  { key: 'no', header: 'No', width: 5 },
  { key: 'nama', header: 'Nama Guru (Dengan Gelar)', width: 28 },
  { key: 'nik', header: 'NIK', width: 18 },
  { key: 'jk', header: 'L/P', width: 5 },
  { key: 'tgl_lahir', header: 'Tgl Lahir (DD/MM/YYYY)', width: 14 },
  { key: 'jabatan', header: 'Jabatan', width: 18 },
  { key: 'jabatan_tambahan', header: 'Jabatan Tambahan', width: 16 },
  { key: 'lembaga', header: 'Lembaga', width: 14 },
  { key: 'lembaga_sekolah', header: 'Lembaga Sekolah', width: 14 },
  { key: 'tanggal_tugas', header: 'Tanggal Tugas (DD/MM/YYYY)', width: 14 },
  { key: 'nig', header: 'NIG', width: 12 },
  { key: 'rek_bmt', header: 'No Rek BMT', width: 18 },
  { key: 'pendidikan', header: 'Pendidikan Terakhir', width: 16 },
  { key: 'wa', header: 'WA', width: 14 },
  { key: 'alamat', header: 'Alamat', width: 28 },
  { key: 'tipe_pegawai', header: 'Tipe Pegawai (guru/pegawai/pegawai_guru)', width: 20 },
  { key: 'shift', header: 'Shift (pagi/sore/pagi_sore)', width: 14 },
  { key: 'role_sistem', header: 'Role Sistem (user/admin/admin_keuangan/super_admin)', width: 18 },
  { key: 'id_fingerprint', header: 'ID Fingerprint', width: 14 },
  { key: 'status', header: 'Status', width: 10 }
]

async function exportGuruExcel() {
  if (exporting.value) return
  exporting.value = true
  try {
    const list = (typeof guruRaw !== 'undefined' && guruRaw.value) || []
    const rows = _buildExcelRows(list)
    const ss = _settingsExp.settings || {}
    await exportStyled(rows, {
      filename: `data_guru_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Data Guru',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Data Guru/Pegawai — ${rows.length} orang`,
      columns: _excelColumns
    })
    _toastExp.success(`Ekspor ${rows.length} guru ke Excel`)
  } catch (e) {
    _toastExp.error('Gagal: ' + (e.message || e))
  } finally {
    exporting.value = false
  }
}

// v.100 Batch12: kirim Data Guru ke Google Sheet (reuse rows + kolom yang sama dgn Excel)
async function kirimGuruGsheet() {
  if (sendingGsheet.value) return
  if (!gsheetConfigured()) { _toastExp.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.'); return }
  sendingGsheet.value = true
  try {
    const list = (typeof guruRaw !== 'undefined' && guruRaw.value) || []
    const rows = _buildExcelRows(list)
    const ss = _settingsExp.settings || {}
    const { url } = await _sendGuruSheet({
      rows,
      title: `Data Guru ${new Date().toISOString().slice(0, 10)}`,
      sheetName: 'Data Guru',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''].filter(Boolean),
      subtitle: `Data Guru/Pegawai — ${rows.length} orang`,
      columns: _excelColumns
    })
    _toastExp.success(`${rows.length} guru terkirim ke Google Sheet.`)
    try { window.open(url, '_blank') } catch (e) { /* ignore */ }
  } catch (e) {
    _toastExp.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    sendingGsheet.value = false
  }
}

// === v.20.80.0526 M8: Bulk Guru actions ===
const selected = ref(new Set())
const bulkRoleSistem = ref('user')
const bulkSaving = ref(false)
const confirmDialog = useConfirm()

const selectedCount = computed(() => selected.value.size)

const isAllVisibleSelected = computed(() => {
  if (guru.value.length === 0) return false
  return guru.value.every((g) => selected.value.has(String(g.id)))
})

const isSomeVisibleSelected = computed(() => {
  if (guru.value.length === 0) return false
  const c = guru.value.filter((g) => selected.value.has(String(g.id))).length
  return c > 0 && c < guru.value.length
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
    for (const g of guru.value) next.delete(String(g.id))
    selected.value = next
  } else {
    const next = new Set(selected.value)
    for (const g of guru.value) next.add(String(g.id))
    selected.value = next
  }
}

function clearSelection() {
  selected.value = new Set()
}

async function bulkSetStatus(status) {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDialog({
    title: `Ubah status jadi "${status}"?`,
    message: `${ids.length} guru akan di-set status = "${status}".`,
    confirmText: 'Terapkan',
    danger: status !== 'Aktif'
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0
  let failCount = 0
  for (const id of ids) {
    try {
      await updateOne('guru', id, { status })
      okCount++
    } catch (e) {
      failCount++
      console.warn(`[bulkSetStatus] guru ${id} gagal:`, e.message)
    }
  }
  bulkSaving.value = false
  if (failCount > 0) {
    _toastExp.warning(`Selesai: ${okCount} ok, ${failCount} gagal`)
  } else {
    _toastExp.success(`${okCount} guru di-set "${status}"`)
  }
  clearSelection()
}

async function bulkSetRole() {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const role = bulkRoleSistem.value
  const ok = await confirmDialog({
    title: `Ubah role_sistem jadi "${role}"?`,
    message: `${ids.length} guru akan di-set role_sistem = "${role}". Akses sistem mereka akan berubah.`,
    confirmText: 'Terapkan',
    danger: role === 'super_admin' || role === 'admin_keuangan'
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0
  let failCount = 0
  for (const id of ids) {
    try {
      await updateOne('guru', id, { role_sistem: role })
      okCount++
    } catch (e) {
      failCount++
      console.warn(`[bulkSetRole] guru ${id} gagal:`, e.message)
    }
  }
  bulkSaving.value = false
  if (failCount > 0) {
    _toastExp.warning(`Selesai: ${okCount} ok, ${failCount} gagal`)
  } else {
    _toastExp.success(`${okCount} guru di-set role "${role}"`)
  }
  clearSelection()
}

// v.21.11.0526: Delete single + Bulk Delete
async function deleteGuru(g) {
  const ok = await confirmDialog({
    title: `Hapus ${g.nama}?`,
    message: `Guru "${g.nama}" (${g.jabatan || '-'}) akan dihapus permanen dari Firestore. Aksi ini tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('guru', String(g.id))
    _toastExp.success(`Guru "${g.nama}" dihapus`)
  } catch (e) {
    _toastExp.error('Gagal hapus: ' + (e.message || e))
  }
}

async function resetSandiGuru(g) {
  const ok = await confirmDialog({
    title: `Reset sandi ${g.nama}?`,
    message: `Sandi guru "${g.nama}" akan direset ke default: 1234. Guru perlu ganti sandi sendiri setelah login.`,
    confirmText: 'Reset',
    danger: true
  })
  if (!ok) return
  try {
    await updateOne('guru', String(g.id), { password: '1234' })
    _toastExp.success(`Sandi ${g.nama} direset ke 1234`)
  } catch (e) {
    _toastExp.error('Gagal reset: ' + (e.message || e))
  }
}

async function toggleAktifGuru(g) {
  const wasAktif = isAktif(g)
  const newStatus = wasAktif ? 'Non-aktif' : 'Aktif'
  const ok = await confirmDialog({
    title: `${wasAktif ? 'Non-aktifkan' : 'Aktifkan'} ${g.nama}?`,
    message: `Status guru "${g.nama}" akan di-set "${newStatus}".`,
    confirmText: wasAktif ? 'Non-aktifkan' : 'Aktifkan',
    danger: wasAktif
  })
  if (!ok) return
  try {
    await updateOne('guru', String(g.id), { status: newStatus })
    _toastExp.success(`${g.nama} di-set ${newStatus}`)
  } catch (e) {
    _toastExp.error('Gagal: ' + (e.message || e))
  }
}

async function bulkDeleteGuru() {
  const ids = [...selected.value]
  if (ids.length === 0) return
  const ok = await confirmDialog({
    title: `Hapus ${ids.length} guru?`,
    message: `${ids.length} guru akan dihapus PERMANEN dari Firestore. Aksi ini tidak bisa di-undo. Lanjutkan?`,
    confirmText: 'Hapus Semua',
    danger: true
  })
  if (!ok) return
  bulkSaving.value = true
  let okCount = 0, failCount = 0
  for (const id of ids) {
    try {
      await deleteOne('guru', String(id))
      okCount++
    } catch (e) {
      failCount++
      console.warn(`[bulkDeleteGuru] guru ${id} gagal:`, e.message)
    }
  }
  bulkSaving.value = false
  if (failCount > 0) {
    _toastExp.warning(`Selesai: ${okCount} hapus, ${failCount} gagal`)
  } else {
    _toastExp.success(`${okCount} guru dihapus`)
  }
  clearSelection()
}

async function bulkExportSelected() {
  const ids = [...selected.value].map(String)
  if (ids.length === 0) return
  if (exporting.value) return
  exporting.value = true
  try {
    const list = (guruRaw.value || []).filter((g) => ids.includes(String(g.id)))
    const rows = _buildExcelRows(list)
    const ss = _settingsExp.settings || {}
    await exportStyled(rows, {
      filename: `data_guru_pilihan_${new Date().toISOString().slice(0, 10)}.xlsx`,
      sheetName: 'Data Guru Pilihan',
      kop: [ss.kopLine1 || '', ss.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM', ss.kopLine3 || '', ss.kopLine4 || ''],
      subtitle: `Data Guru Terpilih — ${rows.length} orang`,
      columns: _excelColumns
    })
    _toastExp.success(`Ekspor ${rows.length} guru terpilih`)
  } catch (e) {
    _toastExp.error('Gagal: ' + (e.message || e))
  } finally {
    exporting.value = false
  }
}

// v.21.13b.0526: Template TANPA KOP — headers di row 1 langsung supaya importFile auto-detect benar
async function downloadTemplateGuru() {
  try {
    // v.99: selaras field guru terbaru (+ NIK, Tgl Lahir, Jabatan Tambahan, No Rek BMT, Pendidikan, Alamat).
    //   FIX hint Tipe Pegawai ke taksonomi BARU (guru/pegawai/pegawai_guru) — nilai legacy bikin guru tak terbaca di form santri.
    const headers = [
      'Nama Guru (Dengan Gelar)', 'NIK', 'L/P', 'Tgl Lahir (DD/MM/YYYY)',
      'Jabatan', 'Jabatan Tambahan', 'Lembaga', 'Lembaga Sekolah',
      'Tanggal Tugas (DD/MM/YYYY)', 'NIG', 'No Rek BMT', 'Pendidikan Terakhir', 'WA', 'Status',
      'Tipe Pegawai (guru/pegawai/pegawai_guru)', 'Shift (pagi/sore/pagi_sore)',
      'ID Fingerprint', 'Role Sistem (user/admin/admin_keuangan/super_admin)',
      'Username (opsional)', 'Alamat'
    ]
    await exportStyled([], {
      filename: 'Template_Data_Guru.xlsx',
      sheetName: 'Template_Guru',
      // No kop+subtitle — keep headers at row 1
      columns: headers.map((h) => ({ key: h, header: h, width: Math.max(14, h.length + 2) }))
    })
    _toastExp.success('Template guru ter-download. Nama=TitleCase, Jabatan/Lembaga=UPPERCASE saat impor.')
  } catch (e) {
    _toastExp.error('Gagal: ' + (e.message || e))
  }
}

function _parseTglGuru(v) {
  if (!v) return ''
  // v.99: guard bug epoch Excel — sel tanggal kosong terbaca jadi 1899-12-30 (serial 0).
  //   Tahun < 1901 mustahil -> kosongkan (penting: tanggal_tugas kosong jangan jadi 301299 di NIG).
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
  if (s.slice(0, 10) === '1899-12-30' || s.slice(0, 10) === '1900-01-00') return ''
  return s
}

// v.99: normalisasi tipe_pegawai impor — legacy (ngaji/sekolah/ngaji_sekolah/admin) → BARU (guru/pegawai/pegawai_guru).
//   Tanpa ini, guru hasil impor lama tak terbaca di form santri (filter pakai taksonomi baru).
function _normTipeGuru(v) {
  const t = String(v || '').trim().toLowerCase()
  if (!t) return 'guru'
  if (t === 'ngaji' || t === 'sekolah' || t === 'ngaji_sekolah') return 'guru'
  if (t === 'admin') return 'pegawai'
  if (['guru', 'pegawai', 'pegawai_guru'].includes(t)) return t
  return 'guru'
}

async function onImportGuru(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importingGuru.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      _toastExp.warning('File kosong atau format tidak sesuai')
      importingGuru.value = false
      e.target.value = ''
      return
    }
    const existing = guruRaw.value || []
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
    for (const r of rows) {
      const namaRaw = String(_pick(r, 'Nama Guru (Dengan Gelar)', 'Nama Guru', 'Nama', 'NAMA', 'nama') || '').trim()
      if (!namaRaw) { skipCount++; continue }
      const nama = toTitleCase(namaRaw)
      const waList = parseMultipleWA(_pick(r, 'No WA', 'WA', 'wa'))
      const wa = waList[0] || ''
      const idx = existing.findIndex((g) =>
        (wa && String(g.wa || '').replace(/\D/g, '') === wa) ||
        String(g.nama || '').toLowerCase().trim() === nama.toLowerCase()
      )
      const action = idx >= 0 ? 'update' : 'new'
      if (action === 'new') newCount++; else updateCount++
      const jabatan = String(_pick(r, 'Jabatan', 'jabatan') || 'Guru').trim()
      const lembaga = String(_pick(r, 'Lembaga', 'lembaga') || '').trim()
      const statusVal = String(_pick(r, 'Status', 'status') || 'Aktif').trim()
      allMapped.push({
        existingId: idx >= 0 ? existing[idx].id : null,
        action,
        nama, jabatan, lembaga, wa,
        status: statusVal,
        data: {
          nama,
          jk: String(_pick(r, 'L/P', 'JK', 'Jenis Kelamin', 'jk') || 'P').trim().toUpperCase().charAt(0),
          nik: String(_pick(r, 'NIK', 'nik') || '').trim(),
          tgl_lahir: _parseTglGuru(_pick(r, 'Tgl Lahir (DD/MM/YYYY)', 'Tgl Lahir', 'Tanggal Lahir', 'tgl_lahir')),
          jabatan,
          jabatan_tambahan: String(_pick(r, 'Jabatan Tambahan', 'jabatan_tambahan') || '').trim(),
          lembaga,
          lembaga_sekolah: String(_pick(r, 'Lembaga Sekolah', 'lembaga_sekolah') || '').trim(),
          tanggal_tugas: _parseTglGuru(_pick(r, 'Tanggal Tugas (DD/MM/YYYY)', 'Tgl Tugas', 'Tanggal Tugas', 'tanggal_tugas')),
          nig: String(_pick(r, 'NIG', 'No Syahadah', 'EKGQ', 'ekgq', 'nig') || '').trim(),
          // v.99: No Rekening BMT (tujuan pencairan bisyaroh) + pendidikan + fingerprint
          rek_bmt: String(_pick(r, 'No Rek BMT', 'Rek BMT', 'rek_bmt') || '').trim(),
          pendidikan_terakhir: String(_pick(r, 'Pendidikan Terakhir', 'Pendidikan', 'pendidikan_terakhir') || '').trim(),
          id_fingerprint: String(_pick(r, 'ID Fingerprint', 'id_fingerprint') || '').trim(),
          wa,
          wa_2: waList[1] || '',
          username: wa || String(_pick(r, 'Username (opsional)', 'Username', 'username') || '').trim(),
          status: statusVal,
          tipe_pegawai: _normTipeGuru(_pick(r, 'Tipe Pegawai (guru/pegawai/pegawai_guru)', 'Tipe Pegawai', 'tipe_pegawai')),
          shift: String(_pick(r, 'Shift (pagi/sore/pagi_sore)', 'Shift', 'shift') || 'pagi_sore').trim().toLowerCase(),
          role_sistem: String(_pick(r, 'Role Sistem (user/admin/admin_keuangan/super_admin)', 'Role Sistem', 'role_sistem') || 'user').trim().toLowerCase(),
          custom_fields: {}
        }
      })
    }
    importPreviewGuru.value = { rows: allMapped, preview: allMapped.slice(0, 50), newCount, updateCount, skipCount }
  } catch (e) {
    _toastExp.error('Gagal baca file: ' + (e.message || e))
  } finally {
    importingGuru.value = false
    e.target.value = ''
  }
}

async function confirmImportGuru() {
  if (!importPreviewGuru.value) return
  importingGuru.value = true
  let ok = 0, fail = 0
  try {
    const { setDoc: _setDoc, doc: _doc, serverTimestamp: _stamp } = await import('firebase/firestore')
    const { db: _db } = await import('@/services/firebase')
    for (const item of importPreviewGuru.value.rows) {
      try {
        const numId = item.existingId
          ? (Number(item.existingId) || Number(String(item.existingId).replace(/\D/g, '')) || Date.now() + ok)
          : (Date.now() + ok)
        await _setDoc(_doc(_db, 'guru', String(numId)), {
          id: numId,
          password: '1234',
          ...item.data,
          _imported_v21_26_at: _stamp()
        }, { merge: true })
        ok++
      } catch (e) {
        fail++
        console.error('Import guru row failed:', e)
      }
    }
    _toastExp.success(`Impor selesai: ${ok} OK, ${fail} gagal`)
    // v.100 Batch16: regenerate NIG otomatis (IMPOR = reshuffle SEMUA guru by tgl tugas terlama → nama A–Z)
    try {
      const fresh = await getAll('guru')
      const plan = planRegenerateNig(fresh)
      const res = await applyNigChanges(plan.changes, { sesi: _authStoreGuru?.sesiAktif })
      let msg = `NIG digenerate ulang: ${res.changed} diperbarui`
      if (plan.skipped.length) msg += `, ${plan.skipped.length} tanpa tgl tugas (dilewati)`
      if (res.fail) msg += `, ${res.fail} gagal`
      _toastExp.success(msg)
    } catch (e) {
      _toastExp.warning('NIG gagal digenerate ulang: ' + (e.message || e))
    }
    importPreviewGuru.value = null
  } catch (e) {
    _toastExp.error('Gagal: ' + (e.message || e))
  } finally {
    importingGuru.value = false
  }
}
</script>
