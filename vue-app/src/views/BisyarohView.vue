<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- No access -->
    <div
      v-if="!isAdminKeu && !isGuru"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses Keuangan terbatas</p>
    </div>

    <!-- ADMIN KEUANGAN -->
    <template v-else-if="isAdminKeu">
      <!-- Header + Tabs -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
          <i class="fas fa-money-check-alt text-emerald-600 mr-2"></i>Bisyaroh Guru/Pegawai
        </h2>
        <p class="text-xs text-[var(--text-secondary)] mt-1">
          Generate slip bisyaroh bulanan, terhubung dengan absensi &amp; bisyaroh pokok.
        </p>
        <div
          class="flex gap-2 border-b border-[var(--border-subtle)] mt-4 overflow-x-auto"
        >
          <button
            @click="mainTab = 'generate'"
            :class="[
              'px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap cursor-pointer transition',
              mainTab === 'generate'
                ? 'border-emerald-500 text-emerald-700'
                : 'border-transparent text-[var(--text-secondary)] hover:text-emerald-700'
            ]"
          >
            <i class="fas fa-file-invoice-dollar mr-1"></i>Generate Slip Bisyaroh
          </button>
          <button
            @click="mainTab = 'riwayat'"
            :class="[
              'px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap cursor-pointer transition',
              mainTab === 'riwayat'
                ? 'border-emerald-500 text-emerald-700'
                : 'border-transparent text-[var(--text-secondary)] hover:text-emerald-700'
            ]"
          >
            <i class="fas fa-history mr-1"></i>Riwayat Slip
          </button>
        </div>
      </div>

      <!-- TAB: GENERATE -->
      <div v-if="mainTab === 'generate'" class="space-y-4">
        <!-- Sub-tab switcher -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-2 border border-[var(--border-subtle)] shadow-sm flex gap-1"
        >
          <button
            @click="subTab = 'single'"
            :class="[
              'flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer',
              subTab === 'single'
                ? 'bg-emerald-600 text-white'
                : 'text-[var(--text-secondary)] hover:bg-emerald-50'
            ]"
          >
            <i class="fas fa-user mr-1"></i>Per Guru
          </button>
          <button
            @click="subTab = 'bulk'"
            :class="[
              'flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer',
              subTab === 'bulk' ? 'bg-emerald-600 text-white' : 'text-[var(--text-secondary)] hover:bg-emerald-50'
            ]"
          >
            <i class="fas fa-users mr-1"></i>Bulk Generate
          </button>
        </div>

        <!-- SUB-TAB: SINGLE (Per Guru) -->
        <div
          v-if="subTab === 'single'"
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm space-y-4"
        >
          <!-- Filter Tipe -->
          <div>
            <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2 tracking-wider">
              Filter Tipe Pegawai
            </p>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="t in TIPE_OPTIONS"
                :key="t.value"
                @click="filterTipe = t.value"
                :class="[
                  'px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition',
                  filterTipe === t.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-[var(--text-primary)] hover:bg-slate-300'
                ]"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

          <!-- Search + periode -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block tracking-wider"
                >Pilih Guru/Pegawai</label
              >
              <input
                v-model="searchGuru"
                type="text"
                placeholder="Ketik nama guru..."
                class="w-full text-sm px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block tracking-wider"
                >Bulan</label
              >
              <select
                v-model.number="bulan"
                class="w-full text-sm px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              >
                <option v-for="(m, idx) in BULAN_NAMES" :key="m" :value="idx + 1">
                  {{ m }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block tracking-wider"
                >Tahun</label
              >
              <input
                v-model.number="tahun"
                type="number"
                min="2024"
                max="2030"
                class="w-full text-sm px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          <!-- Daftar guru -->
          <div>
            <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2 tracking-wider">
              Daftar Guru — {{ filteredGuru.length }} pegawai
            </p>
            <div
              v-if="filteredGuru.length === 0"
              class="py-6 text-center text-xs text-[var(--text-tertiary)] italic"
            >
              Tidak ada guru sesuai filter.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              <button
                v-for="g in filteredGuru"
                :key="g.id"
                @click="pilihGuru(g)"
                :class="[
                  'text-left px-3 py-2 rounded-lg border-2 cursor-pointer transition',
                  selectedGuru?.id === g.id
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-emerald-50'
                ]"
              >
                <p class="font-bold text-sm">{{ g.nama }}</p>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  {{ g.lembaga || '-' }} · {{ guruTipeLabel(g) }}
                </p>
              </button>
            </div>
          </div>

          <!-- Form line items -->
          <div
            v-if="selectedGuru"
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200"
          >
            <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
              <p class="text-xs font-black text-emerald-800 uppercase">
                Input Bisyaroh — {{ selectedGuru.nama }} · Periode {{ BULAN_NAMES[bulan - 1] }}
                {{ tahun }}
              </p>
              <span
                class="text-[9px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded uppercase"
                >v.21.10 line items</span
              >
            </div>
            <div class="space-y-1.5">
              <div
                v-for="(li, idx) in form.line_items"
                :key="idx"
                class="grid grid-cols-[1fr_140px_30px] gap-2 items-center bg-[var(--bg-card)] rounded-lg px-3 py-2 border border-emerald-200"
              >
                <div>
                  <p class="text-xs font-bold text-[var(--text-primary)]">{{ li.label }}</p>
                  <p class="text-[10px] text-[var(--text-secondary)]">
                    {{ li.lembaga || '—' }} ·
                    <span class="font-bold uppercase">{{ li.kategori }}</span>
                  </p>
                </div>
                <input
                  v-model.number="li.nominal"
                  type="number"
                  min="0"
                  class="text-sm px-2 py-1.5 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-right"
                />
                <button
                  @click="form.line_items.splice(idx, 1)"
                  class="text-rose-500 hover:text-rose-700 text-xs"
                  title="Hapus line item"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button
                @click="addLineItem"
                class="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 px-2 py-1"
              >
                <i class="fas fa-plus mr-1"></i>Tambah Line Item Manual
              </button>
              <div
                class="grid grid-cols-[1fr_140px_30px] gap-2 items-center bg-rose-50 rounded-lg px-3 py-2 border border-rose-200"
              >
                <div>
                  <p class="text-xs font-bold text-rose-700">Potongan (Sakit/Izin/Alpa)</p>
                  <p class="text-[10px] text-rose-500">Slip-level (dikurangi dari total)</p>
                </div>
                <input
                  v-model.number="form.total_potongan"
                  type="number"
                  min="0"
                  class="text-sm px-2 py-1.5 border border-rose-300 rounded-lg bg-[var(--bg-card)] text-right"
                />
                <span></span>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <p class="text-sm font-black text-emerald-900">
                Take Home:
                <span class="text-lg">{{ fmtRp(takeHome) }}</span>
              </p>
              <button
                @click="saveSlipSingle"
                :disabled="saving"
                class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-black px-5 py-2 rounded-lg shadow disabled:opacity-50 cursor-pointer"
              >
                <i class="fas fa-save mr-1"></i>
                {{ saving ? 'Menyimpan...' : 'Simpan Slip' }}
              </button>
            </div>
          </div>
        </div>

        <!-- SUB-TAB: BULK -->
        <div
          v-else
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm space-y-3"
        >
          <p class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-users text-emerald-600 mr-2"></i>Bulk Generate Slip Bisyaroh
          </p>
          <p class="text-xs text-[var(--text-secondary)]">
            Generate slip untuk SEMUA guru aktif sekaligus berdasar bisyaroh pokok di Pengaturan
            Keuangan ({{ BULAN_NAMES[bulan - 1] }} {{ tahun }}).
          </p>
          <div>
            <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 tracking-wider">
              Generate untuk:
            </p>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="t in TIPE_OPTIONS"
                :key="'bulk-' + t.value"
                @click="bulkTipe = t.value"
                :class="[
                  'px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition',
                  bulkTipe === t.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-[var(--text-primary)] hover:bg-slate-300'
                ]"
              >
                {{ t.label }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">Bulan</label>
              <select
                v-model.number="bulan"
                class="w-full text-sm px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
              >
                <option v-for="(m, idx) in BULAN_NAMES" :key="'bbulk-' + m" :value="idx + 1">
                  {{ m }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">Tahun</label>
              <input
                v-model.number="tahun"
                type="number"
                min="2024"
                max="2030"
                class="w-full text-sm px-3 py-2 border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)]"
              />
            </div>
          </div>
          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200"
          >
            <p class="text-xs text-emerald-800">
              <i class="fas fa-info-circle mr-1"></i>Target:
              <b>{{ bulkTargets.length }} guru</b> akan di-generate slip-nya. Nominal pokok/sekolah
              dari Pengaturan Keuangan → Bisyaroh Pokok per Guru. Yang sudah punya slip periode ini
              akan di-OVERWRITE.
            </p>
          </div>
          <button
            @click="bulkGenerate"
            :disabled="bulkRunning || bulkTargets.length === 0"
            class="w-full bg-gradient-to-r from-emerald-600 dark:from-emerald-800 to-teal-600 dark:to-teal-800 hover:from-emerald-700 dark:from-emerald-900 hover:to-teal-700 dark:to-teal-900 text-white text-sm font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer transition"
          >
            <i :class="['fas', bulkRunning ? 'fa-spinner fa-spin' : 'fa-bolt', 'mr-2']"></i>
            {{
              bulkRunning
                ? `Generating ${bulkDone}/${bulkTargets.length}...`
                : `Generate Slip untuk ${bulkTargets.length} Guru`
            }}
          </button>
          <div
            v-if="bulkLog.length > 0"
            class="mt-3 max-h-40 overflow-y-auto bg-[var(--bg-card-elevated)] rounded-lg p-2 text-[10px] font-mono space-y-0.5"
          >
            <p
              v-for="(line, idx) in bulkLog"
              :key="idx"
              :class="
                line.startsWith('OK')
                  ? 'text-emerald-700'
                  : line.startsWith('ER')
                    ? 'text-rose-700'
                    : 'text-[var(--text-secondary)]'
              "
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>

      <!-- TAB: RIWAYAT -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div
          class="px-4 md:px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between flex-wrap gap-2"
        >
          <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
            <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Slip Bisyaroh
          </h3>
          <div class="flex gap-2 items-center">
            <input
              v-model="searchRiwayat"
              type="text"
              placeholder="Cari nama..."
              class="text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg"
            />
            <select
              v-model="filterPeriode"
              class="text-xs px-3 py-1.5 border border-[var(--border-default)] rounded-lg"
            >
              <option value="">Semua periode</option>
              <option v-for="p in uniquePeriode" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <span class="text-[10px] text-[var(--text-tertiary)] font-bold"
              >{{ filteredSlips.length }} slip · {{ totalTakeFmt }}</span
            >
          </div>
        </div>
        <div v-if="loading" class="p-10 text-center">
          <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl"></i>
        </div>
        <div v-else-if="filteredSlips.length === 0" class="p-10 text-center">
          <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
          <p class="text-sm text-[var(--text-secondary)] italic">Belum ada slip.</p>
        </div>
        <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="slip in filteredSlips"
            :key="slip.id"
            class="p-3 md:p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30"
          >
            <div class="flex items-center gap-3 flex-wrap">
              <div
                class="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center"
              >
                <i class="fas fa-receipt"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                  {{ getNamaGuruGelar(slip.guru_nama || guruNamaById(slip.guru_id)) }}
                </p>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  {{ slip.lembaga || '-' }} · {{ slip.jabatan || 'Guru' }}
                </p>
              </div>
              <span class="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded">{{
                slip.periode
              }}</span>
              <button
                @click="kirimWA(slip)"
                title="Kirim slip via WhatsApp"
                class="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition cursor-pointer"
              >
                <i class="fab fa-whatsapp mr-1"></i>Kirim
              </button>
              <button
                v-if="isAdmin"
                @click="hapusSlip(slip)"
                title="Hapus slip (super admin)"
                class="text-[10px] font-bold px-2 py-1 rounded bg-rose-100 text-rose-600 hover:bg-rose-200 transition cursor-pointer"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
              <div class="bg-[var(--bg-card-elevated)] rounded-lg p-2">
                <p class="text-[9px] text-[var(--text-secondary)]">Pokok</p>
                <p class="font-black">{{ fmtRp(slip.bisyaroh_pokok) }}</p>
              </div>
              <div class="bg-[var(--bg-card-elevated)] rounded-lg p-2">
                <p class="text-[9px] text-[var(--text-secondary)]">Sekolah</p>
                <p class="font-black">{{ fmtRp(slip.bisyaroh_sekolah) }}</p>
              </div>
              <div class="bg-[var(--bg-card-elevated)] rounded-lg p-2">
                <p class="text-[9px] text-[var(--text-secondary)]">Tambahan</p>
                <p class="font-black">{{ fmtRp(slip.bisyaroh_tambahan) }}</p>
              </div>
              <div
                class="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-2 border border-emerald-200"
              >
                <p class="text-[9px] text-emerald-700 font-bold">Take Home</p>
                <p class="font-black text-emerald-800">
                  {{
                    fmtRp(
                      slip.take_home ||
                        (Number(slip.bisyaroh_pokok) || 0) +
                          (Number(slip.bisyaroh_sekolah) || 0) +
                          (Number(slip.bisyaroh_tambahan) || 0) -
                          (Number(slip.total_potongan) || 0)
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- GURU VIEW (read-only) -->
    <template v-else>
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
          <i class="fas fa-receipt text-cyan-600 mr-2"></i>Slip Bisyaroh Saya
        </h2>
        <p class="text-xs text-[var(--text-secondary)] mt-1">
          Slip bisyaroh per bulan (read-only).
        </p>
      </div>
      <div v-if="loading" class="text-center py-8">
        <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl"></i>
      </div>
      <div
        v-else-if="filteredSlips.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada slip untuk Anda.</p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="slip in filteredSlips"
          :key="slip.id"
          class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex items-center justify-between gap-2 mb-2">
            <p class="text-sm font-bold text-[var(--text-primary)]">
              Periode {{ slip.periode }}
            </p>
            <span
              class="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase"
              >Take Home {{ fmtRp(slip.take_home) }}</span
            >
          </div>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p class="text-[9px] text-[var(--text-secondary)]">Pokok</p>
              <p class="font-bold">{{ fmtRp(slip.bisyaroh_pokok) }}</p>
            </div>
            <div>
              <p class="text-[9px] text-[var(--text-secondary)]">Sekolah</p>
              <p class="font-bold">{{ fmtRp(slip.bisyaroh_sekolah) }}</p>
            </div>
            <div>
              <p class="text-[9px] text-[var(--text-secondary)]">Tambahan</p>
              <p class="font-bold">{{ fmtRp(slip.bisyaroh_tambahan) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
// BisyarohView — slip bisyaroh guru/pegawai
// v.21.10+ line_items system, bulk generate dari settings, kirim WA slip
import { ref, computed } from 'vue'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import { useSettingsStore } from '@/stores/settings'
import { useKeuangan } from '@/composables/useKeuangan'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { fmtRp, getNamaGuruGelar } from '@/utils/format'

const { gaji, loading } = useKeuangan()
const { guruRaw, deriveGuruLembagaRefs } = useGuru()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
// v.21.99.0527: super_admin only — hapus slip bisyaroh (koreksi data)
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

async function hapusSlip(slip) {
  if (!isAdmin.value) return
  const label = getNamaGuruGelar(slip.guru_nama || guruNamaById(slip.guru_id)) + ' / ' + slip.periode
  if (!confirm(`Hapus PERMANEN slip bisyaroh:\n${label}\nTotal: ${fmtRp(slip.take_home || 0)}\n\nTidak bisa di-undo.`)) return
  try {
    await deleteDoc(doc(db, 'keuangan_gaji', String(slip.id)))
    toast.success('Slip dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}
const toast = useToast()

// ─── Role guards ──────────────────────────────────────────────────────────
const isAdminKeu = computed(() => {
  const role = auth.sesiAktif?.role_sistem
  return (
    role === 'admin' ||
    role === 'super_admin' ||
    role === 'admin_keuangan' ||
    auth.sesiAktif?.id === 'admin'
  )
})
const isGuru = computed(() => {
  return !isAdminKeu.value && auth.sesiAktif?.role === 'guru'
})

// ─── Static options ───────────────────────────────────────────────────────
const BULAN_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const TIPE_OPTIONS = [
  { value: 'semua', label: 'Semua' },
  { value: 'ngaji', label: 'Guru Ngaji' },
  { value: 'sekolah', label: 'Guru Sekolah' },
  { value: 'ngaji_sekolah', label: '+ Keduanya' }
]

// ─── Periode state ────────────────────────────────────────────────────────
const now = new Date()
const bulan = ref(now.getMonth() + 1)
const tahun = ref(now.getFullYear())

// ─── Tab state ────────────────────────────────────────────────────────────
const mainTab = ref('generate')
const subTab = ref('single')

// ─── Single (Per Guru) state ──────────────────────────────────────────────
const filterTipe = ref('semua')
const searchGuru = ref('')

function guruTipeLabel(g) {
  const isNgaji = !!(g.lembaga && g.lembaga !== 'Yayasan' && !g.is_sekolah)
  const isSekolah = !!(
    g.is_sekolah ||
    g.lembaga_sekolah ||
    (g.shift || '').toLowerCase().includes('sekolah')
  )
  if (isNgaji && isSekolah) return 'NGAJI+SEKOLAH'
  if (isNgaji) return 'NGAJI'
  if (isSekolah) return 'SEKOLAH'
  return '-'
}

const filteredGuru = computed(() => {
  let list = (guruRaw.value || []).filter(
    (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'
  )
  const q = searchGuru.value.trim().toLowerCase()
  if (q) {
    list = list.filter((g) =>
      String(g.nama || '')
        .toLowerCase()
        .includes(q)
    )
  }
  if (filterTipe.value !== 'semua') {
    list = list.filter((g) => {
      const isNgaji = !!(g.lembaga && g.lembaga !== 'Yayasan')
      const isSekolah = !!(g.is_sekolah || g.lembaga_sekolah)
      if (filterTipe.value === 'ngaji') return isNgaji && !isSekolah
      if (filterTipe.value === 'sekolah') return isSekolah && !isNgaji
      if (filterTipe.value === 'ngaji_sekolah') return isNgaji && isSekolah
      return true
    })
  }
  return list.sort((a, b) => String(a.nama).localeCompare(String(b.nama)))
})

const selectedGuru = ref(null)
const form = ref({ line_items: [], total_potongan: 0 })

function buildLineItemsFromGuru(g) {
  const refs = deriveGuruLembagaRefs(g) || []
  const items = []
  for (const r of refs) {
    let kategori = 'ngaji'
    let label = `Bisyaroh Ngaji (${r.lembaga})`
    if (r.group === 'sekolah') {
      kategori = 'sekolah'
      label = `Bisyaroh Sekolah (${r.lembaga})`
    } else if (r.group === 'mahad') {
      kategori = 'mahad'
      label = "Bisyaroh Ma'had"
    } else if (r.group === 'non-lembaga') {
      kategori = 'admin'
      label = `Bisyaroh ${r.lembaga}${r.jabatan_di_sini ? ' — ' + r.jabatan_di_sini : ''}`
    }
    items.push({
      kategori,
      lembaga: r.lembaga || '-',
      label,
      nominal: 0
    })
  }
  if (items.length === 0) {
    items.push({
      kategori: 'ngaji',
      lembaga: g.lembaga || '-',
      label: 'Bisyaroh Pokok',
      nominal: 0
    })
  }
  return items
}

function pilihGuru(g) {
  selectedGuru.value = g
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  const existing = gaji.value.find(
    (x) => String(x.guru_id) === String(g.id) && x.periode === periode
  )
  if (existing && Array.isArray(existing.line_items) && existing.line_items.length > 0) {
    form.value = {
      line_items: existing.line_items.map((li) => ({
        kategori: li.kategori || 'ngaji',
        lembaga: li.lembaga || '-',
        label: li.label || 'Bisyaroh',
        nominal: Number(li.nominal || 0)
      })),
      total_potongan: Number(existing.total_potongan || 0)
    }
  } else if (existing) {
    // Legacy slip → reconstruct line_items dari struktur lama
    const items = buildLineItemsFromGuru(g)
    const itemNgaji = items.find((it) => it.kategori === 'ngaji' || it.kategori === 'mahad')
    if (itemNgaji) itemNgaji.nominal = Number(existing.bisyaroh_pokok || 0)
    const itemSekolah = items.find((it) => it.kategori === 'sekolah')
    if (itemSekolah) itemSekolah.nominal = Number(existing.bisyaroh_sekolah || 0)
    if (Number(existing.bisyaroh_tambahan || 0) > 0) {
      items.push({
        kategori: 'tambahan',
        lembaga: '-',
        label: 'Tambahan Shift (OP+OS)',
        nominal: Number(existing.bisyaroh_tambahan)
      })
    }
    form.value = {
      line_items: items,
      total_potongan: Number(existing.total_potongan || 0)
    }
  } else {
    form.value = {
      line_items: buildLineItemsFromGuru(g),
      total_potongan: 0
    }
  }
}

function addLineItem() {
  form.value.line_items.push({
    kategori: 'tambahan',
    lembaga: '-',
    label: 'Tambahan Manual',
    nominal: 0
  })
}

const takeHome = computed(() => {
  const totalIn = (form.value.line_items || []).reduce(
    (sum, li) => sum + (Number(li.nominal) || 0),
    0
  )
  const totalOut = Number(form.value.total_potongan) || 0
  return totalIn - totalOut
})

const saving = ref(false)
async function saveSlipSingle() {
  if (!selectedGuru.value) return
  saving.value = true
  try {
    const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
    const slipId = `gaji_${selectedGuru.value.id}_${periode}`
    const lineItems = (form.value.line_items || []).map((li) => ({
      kategori: li.kategori || 'ngaji',
      lembaga: li.lembaga || '-',
      label: li.label || 'Bisyaroh',
      nominal: Number(li.nominal) || 0
    }))
    const pokok = lineItems
      .filter((li) => li.kategori === 'ngaji' || li.kategori === 'mahad')
      .reduce((s, li) => s + li.nominal, 0)
    const sekolah = lineItems
      .filter((li) => li.kategori === 'sekolah')
      .reduce((s, li) => s + li.nominal, 0)
    const tambahan = lineItems
      .filter((li) => li.kategori === 'tambahan' || li.kategori === 'admin')
      .reduce((s, li) => s + li.nominal, 0)
    const potongan = Number(form.value.total_potongan) || 0
    const totalIn = pokok + sekolah + tambahan
    await setDoc(doc(db, 'keuangan_gaji', slipId), {
      id: slipId,
      guru_id: Number(selectedGuru.value.id) || selectedGuru.value.id,
      guru_nama: selectedGuru.value.nama,
      lembaga: selectedGuru.value.lembaga || '',
      jabatan: selectedGuru.value.jabatan || '',
      periode,
      line_items: lineItems,
      bisyaroh_pokok: pokok,
      bisyaroh_sekolah: sekolah,
      bisyaroh_tambahan: tambahan,
      total_pemasukan: totalIn,
      total_potongan: potongan,
      take_home: totalIn - potongan,
      tunjangan_list: [],
      potongan_list: [],
      updated_at: serverTimestamp()
    })
    toast.success(`Slip bisyaroh ${selectedGuru.value.nama} tersimpan`)
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// ─── Riwayat state ────────────────────────────────────────────────────────
const searchRiwayat = ref('')
const filterPeriode = ref('')

function guruNamaById(id) {
  const g = (guruRaw.value || []).find((x) => String(x.id) === String(id))
  return g?.nama || '(unknown)'
}

const filteredSlips = computed(() => {
  let list = [...gaji.value]
  if (isGuru.value) {
    const s = auth.sesiAktif
    const me =
      (guruRaw.value || []).find((g) => String(g.id) === String(s?.id)) ||
      (guruRaw.value || []).find(
        (g) => String(g.nama || '').toLowerCase() === String(s?.nama || '').toLowerCase()
      )
    const myId = me?.id
    if (myId !== undefined) {
      list = list.filter((x) => String(x.guru_id) === String(myId))
    } else {
      list = []
    }
  }
  if (filterPeriode.value) {
    list = list.filter((x) => x.periode === filterPeriode.value)
  }
  const q = (isAdminKeu.value ? searchRiwayat.value : '').trim().toLowerCase()
  if (q) {
    list = list.filter((x) =>
      String(x.guru_nama || guruNamaById(x.guru_id))
        .toLowerCase()
        .includes(q)
    )
  }
  return list.sort((a, b) => (b.periode || '').localeCompare(a.periode || ''))
})

const uniquePeriode = computed(() => {
  const set = new Set()
  for (const x of gaji.value) if (x.periode) set.add(x.periode)
  return [...set].sort().reverse()
})

const totalTakeFmt = computed(() =>
  fmtRp(filteredSlips.value.reduce((sum, x) => sum + (Number(x.take_home) || 0), 0))
)

// ─── Bulk Generate state ──────────────────────────────────────────────────
const bulkTipe = ref('semua')
const bulkRunning = ref(false)
const bulkDone = ref(0)
const bulkLog = ref([])

const bulkTargets = computed(() => {
  let list = (guruRaw.value || []).filter(
    (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'
  )
  if (bulkTipe.value !== 'semua') {
    list = list.filter((g) => {
      const isNgaji = !!(g.lembaga && g.lembaga !== 'Yayasan')
      const isSekolah = !!(g.is_sekolah || g.lembaga_sekolah)
      if (bulkTipe.value === 'ngaji') return isNgaji && !isSekolah
      if (bulkTipe.value === 'sekolah') return isSekolah && !isNgaji
      if (bulkTipe.value === 'ngaji_sekolah') return isNgaji && isSekolah
      return true
    })
  }
  return list
})

async function bulkGenerate() {
  if (
    !confirm(
      `Generate slip bisyaroh untuk ${bulkTargets.value.length} guru? Slip yang sudah ada di periode ini akan di-OVERWRITE.`
    )
  )
    return
  bulkRunning.value = true
  bulkDone.value = 0
  bulkLog.value = []
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  const settings = settingsStore.settings || {}
  const mapPokok = settings.keu_bisyaroh_pokok || {}
  const mapSekolah = settings.keu_bisyaroh_sekolah || {}
  try {
    for (const g of bulkTargets.value) {
      try {
        const slipId = `gaji_${g.id}_${periode}`
        const pokok = Number(mapPokok[g.id] || 0)
        const sekolah = Number(mapSekolah[g.id] || 0)
        const total = pokok + sekolah
        await setDoc(doc(db, 'keuangan_gaji', slipId), {
          id: slipId,
          guru_id: Number(g.id) || g.id,
          guru_nama: g.nama,
          lembaga: g.lembaga || '',
          jabatan: g.jabatan || '',
          periode,
          bisyaroh_pokok: pokok,
          bisyaroh_sekolah: sekolah,
          bisyaroh_tambahan: 0,
          total_pemasukan: total,
          total_potongan: 0,
          take_home: total,
          tunjangan_list: [],
          potongan_list: [],
          generated_via: 'bulk',
          updated_at: serverTimestamp()
        })
        bulkLog.value.push(`OK ${g.nama} -> ${fmtRp(total)}`)
      } catch (e) {
        bulkLog.value.push(`ER ${g.nama} -> ${e.message}`)
      }
      bulkDone.value++
    }
    toast.success(`Bulk generate selesai: ${bulkDone.value}/${bulkTargets.value.length} slip`)
  } catch (e) {
    toast.error('Bulk generate gagal: ' + (e.message || e))
  } finally {
    bulkRunning.value = false
  }
}

// ─── Kirim WA ─────────────────────────────────────────────────────────────
function kirimWA(slip) {
  const g = (guruRaw.value || []).find((x) => String(x.id) === String(slip.guru_id))
  const wa = g?.wa || g?.nomor_wa || g?.no_wa || ''
  if (!wa) {
    toast.warning('Nomor WA guru belum diisi di profil')
    return
  }
  const phone = String(wa)
    .replace(/[^0-9]/g, '')
    .replace(/^0/, '62')
  const lines = [
    `*Slip Bisyaroh* — ${slip.guru_nama || g?.nama}`,
    `Periode: ${slip.periode}`,
    `Bisyaroh Pokok: ${fmtRp(slip.bisyaroh_pokok)}`,
    `Bisyaroh Sekolah: ${fmtRp(slip.bisyaroh_sekolah)}`,
    `Tambahan Shift: ${fmtRp(slip.bisyaroh_tambahan)}`,
    `Potongan: ${fmtRp(slip.total_potongan)}`,
    `*Take Home: ${fmtRp(slip.take_home)}*`,
    '',
    'Barakallah, terima kasih atas dedikasinya.'
  ]
  const text = lines.join('\n')
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}
</script>
