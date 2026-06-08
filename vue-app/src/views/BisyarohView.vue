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
              <!-- v.21.103.0527: Bonus Kehadiran auto (pagi/sore/sekolah) -->
              <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg px-3 py-2 border border-cyan-200">
                <div class="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                  <p class="text-xs font-black text-cyan-800"><i class="fas fa-bolt mr-1"></i>Bonus Kehadiran (otomatis dari absensi)</p>
                  <p class="text-base font-black text-cyan-900">{{ fmtRp(bonusKehadiran.total) }}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-1.5 text-[10px] text-cyan-700">
                  <div>Pagi: <b>{{ bonusKehadiran.hadir_pagi }}x</b> × Rp{{ Number(bonusKehadiran.tarif_pagi).toLocaleString('id-ID') }} = {{ fmtRp(bonusKehadiran.total_pagi) }}</div>
                  <div>Sore: <b>{{ bonusKehadiran.hadir_sore }}x</b> × Rp{{ Number(bonusKehadiran.tarif_sore).toLocaleString('id-ID') }} = {{ fmtRp(bonusKehadiran.total_sore) }}</div>
                  <div>Sekolah: <b>{{ bonusKehadiran.hadir_sekolah }}x</b> × Rp{{ Number(bonusKehadiran.tarif_sekolah).toLocaleString('id-ID') }} = {{ fmtRp(bonusKehadiran.total_sekolah) }}</div>
                </div>
                <p class="text-[9px] text-cyan-600 italic mt-1">
                  Tidak hadir = tidak dapat bonus (bukan dipotong). Atur tarif di Pengaturan Keuangan.
                </p>
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
                  <p class="text-xs font-bold text-rose-700">Potongan Lain (manual)</p>
                  <p class="text-[10px] text-rose-500">Opsional — bukan dari absen. Tidak hadir tidak otomatis dipotong.</p>
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
            <!-- v.95.0626: ekspor PDF rekap riwayat (terfilter periode) -->
            <button
              @click="exportRekap"
              :disabled="exportingRekap || filteredSlips.length === 0"
              title="Ekspor PDF rekap slip (sesuai filter periode)"
              class="text-[10px] font-black bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <i :class="['fas', exportingRekap ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Export PDF
            </button>
            <!-- v.21.100.0527: bulk select hapus -->
            <label v-if="isAdmin && filteredSlips.length > 0" class="flex items-center gap-1 text-[10px] font-bold cursor-pointer">
              <input
                type="checkbox"
                :checked="selectedSlip.size === filteredSlips.length && filteredSlips.length > 0"
                @change="toggleSemuaSlip"
                class="w-4 h-4 accent-rose-600"
              />Pilih semua
            </label>
            <button
              v-if="isAdminKeu && selectedSlip.size > 0"
              @click="cairkanTerpilih"
              title="Catat pencairan ke Buku Induk (setelah transfer ke rekening BMT guru)"
              class="text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg"
            >
              <i class="fas fa-money-check-alt mr-1"></i>Cairkan &amp; Catat ({{ selectedSlip.size }})
            </button>
            <button
              v-if="isAdmin && selectedSlip.size > 0"
              @click="hapusSlipTerpilih"
              class="text-[10px] font-black bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-lg"
            >
              <i class="fas fa-trash mr-1"></i>Hapus Terpilih ({{ selectedSlip.size }})
            </button>
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
              <input
                v-if="isAdmin"
                type="checkbox"
                :checked="selectedSlip.has(String(slip.id))"
                @change="toggleSlipSel(slip.id)"
                class="w-4 h-4 accent-rose-600 flex-shrink-0"
                title="Pilih slip"
              />
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
                @click="openSlipReceipt(slip)"
                title="Lihat slip bisyaroh"
                aria-label="Lihat slip bisyaroh"
                class="text-[10px] font-bold px-2 py-1 rounded bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition cursor-pointer"
              >
                <i class="fas fa-eye"></i>
              </button>
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
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase"
                >Take Home {{ fmtRp(slip.take_home) }}</span
              >
              <button @click="openSlipReceipt(slip)" title="Lihat slip" aria-label="Lihat slip bisyaroh" class="w-7 h-7 flex-shrink-0 rounded-full border border-[var(--border-default)] text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 flex items-center justify-center transition cursor-pointer"><i class="fas fa-eye text-xs"></i></button>
            </div>
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
    <ReceiptModal
      :open="slipReceiptOpen"
      title="Slip Bisyaroh"
      :body-html="slipReceiptHtml"
      :downloading="slipReceiptDownloading"
      @close="slipReceiptOpen = false"
      @download="downloadSlipReceipt"
    />
  </div>
</template>

<script setup>
// BisyarohView — slip bisyaroh guru/pegawai
// v.21.10+ line_items system, bulk generate dari settings, kirim WA slip
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { deleteOne } from '@/services/firestore' // v.91.0626: hapus = backup audit_log dulu
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
import { useSettingsStore } from '@/stores/settings'
import { useKeuangan } from '@/composables/useKeuangan'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { fmtRp, getNamaGuruGelar } from '@/utils/format'
import ReceiptModal from '@/components/ReceiptModal.vue'
import { buildSlipBisyarohHtml } from '@/utils/receiptHtml'
import { cetakSlipBisyarohPdf, exportRekapBisyarohPdf } from '@/utils/strukBuilder'

const { gaji, loading } = useKeuangan()
const { guruRaw, deriveGuruLembagaRefs } = useGuru()
// v.21.103.0527: absensi shift guru utk hitung bonus kehadiran otomatis (pagi/sore/sekolah)
const absensiShift = ref([])
let unsubAbsensi = null
onMounted(() => {
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => { absensiShift.value = docs || [] })
})
onUnmounted(() => {
  if (unsubAbsensi) { try { unsubAbsensi() } catch { /* ignore */ } }
})
const auth = useAuthStore()
const settingsStore = useSettingsStore()
// v.21.99.0527: super_admin only — hapus slip bisyaroh (koreksi data)
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

// v.95.0626: Slip viewer (view-only) — preview slip bisyaroh match desain PDF + download
const slipReceiptOpen = ref(false)
const slipReceiptHtml = ref('')
const slipReceiptData = ref(null)
const slipReceiptDownloading = ref(false)
function openSlipReceipt(slip) {
  slipReceiptData.value = slip
  slipReceiptHtml.value = buildSlipBisyarohHtml(slip, settingsStore.settings || {})
  slipReceiptOpen.value = true
}
async function downloadSlipReceipt() {
  if (!slipReceiptData.value) return
  slipReceiptDownloading.value = true
  try {
    await cetakSlipBisyarohPdf(slipReceiptData.value, settingsStore.settings || {}, { preview: false })
  } catch (e) {
    toast.error('Gagal membuat PDF: ' + (e.message || e))
  } finally {
    slipReceiptDownloading.value = false
  }
}

// v.95.0626: ekspor PDF rekap riwayat slip bisyaroh (terfilter periode) — detail rinci + total
const exportingRekap = ref(false)
function _fmtPeriodeLabel(p) {
  const m = String(p || '').match(/^(\d{4})-(\d{2})$/)
  if (m) return (BULAN_NAMES[parseInt(m[2], 10) - 1] || m[2]) + ' ' + m[1]
  return p || 'Semua Periode'
}
async function exportRekap() {
  const slips = filteredSlips.value || []
  if (!slips.length) { toast.warning('Tidak ada slip untuk diekspor.'); return }
  exportingRekap.value = true
  try {
    await exportRekapBisyarohPdf(slips, settingsStore.settings || {}, _fmtPeriodeLabel(filterPeriode.value))
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  } finally {
    exportingRekap.value = false
  }
}

async function hapusSlip(slip) {
  if (!isAdmin.value) return
  const label = getNamaGuruGelar(slip.guru_nama || guruNamaById(slip.guru_id)) + ' / ' + slip.periode
  if (!confirm(`Hapus PERMANEN slip bisyaroh:\n${label}\nTotal: ${fmtRp(slip.take_home || 0)}\n\nTidak bisa di-undo.`)) return
  try {
    await deleteOne('keuangan_gaji', slip.id)
    toast.success('Slip dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

// v.21.100.0527: bulk select hapus slip (super_admin)
const selectedSlip = ref(new Set())
function toggleSlipSel(id) {
  const ns = new Set(selectedSlip.value)
  const sid = String(id)
  if (ns.has(sid)) ns.delete(sid)
  else ns.add(sid)
  selectedSlip.value = ns
}
function toggleSemuaSlip() {
  if (selectedSlip.value.size === filteredSlips.value.length && filteredSlips.value.length > 0) {
    selectedSlip.value = new Set()
  } else {
    selectedSlip.value = new Set(filteredSlips.value.map((x) => String(x.id)))
  }
}
async function hapusSlipTerpilih() {
  if (!isAdmin.value) return
  const ids = Array.from(selectedSlip.value)
  if (ids.length === 0) return
  if (!confirm(`Hapus ${ids.length} slip bisyaroh terpilih?\n\nTidak bisa di-undo.`)) return
  let ok = 0, fail = 0
  for (const id of ids) {
    try {
      await deleteOne('keuangan_gaji', id)
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusSlip]', id, e.message)
    }
  }
  selectedSlip.value = new Set()
  // v.21.104.0527: audit log
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'bulk_delete',
    target: 'keuangan_gaji',
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} slip dihapus`)
}

// v.97.0626: Cairkan bisyaroh terpilih (Model A — admin transfer di BMT lalu konfirmasi di sini).
// Auto-catat kas KELUAR ke Buku Induk (sumber 'gaji', idempoten via id gaji_<slipId>) + tandai slip 'cair'.
// TODO(Model B): saat API disbursement BMT siap, ganti/dampingi dgn pemanggilan Cloud Function bmtDisbursementBatch.
function _todayYMD() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function _slipTakeHome(s) {
  const th = Number(s.take_home)
  if (th > 0) return th
  return (Number(s.bisyaroh_pokok) || 0) + (Number(s.bisyaroh_sekolah) || 0) + (Number(s.bisyaroh_tambahan) || 0) - (Number(s.total_potongan) || 0)
}
async function cairkanTerpilih() {
  if (!isAdminKeu.value) { toast.error('Hanya admin keuangan yang bisa mencairkan'); return }
  const ids = Array.from(selectedSlip.value)
  if (ids.length === 0) return
  const slips = ids.map((id) => filteredSlips.value.find((x) => String(x.id) === String(id))).filter(Boolean)
  const belum = slips.filter((s) => String(s.status_cair || '') !== 'cair' && _slipTakeHome(s) > 0)
  const sudah = slips.length - belum.length
  if (belum.length === 0) { toast.info('Semua slip terpilih sudah dicairkan / nominal 0'); return }
  const totalRp = belum.reduce((a, s) => a + _slipTakeHome(s), 0)
  if (!confirm(`Cairkan ${belum.length} slip (total ${fmtRp(totalRp)})?\n\nPastikan transfer ke rekening BMT guru sudah dilakukan.\nIni mencatat kas KELUAR ke Buku Induk & menandai slip lunas.${sudah ? `\n\n(${sudah} slip dilewati: sudah cair / nominal 0)` : ''}`)) return
  const tgl = _todayYMD()
  const operator = auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
  let ok = 0, fail = 0
  for (const s of belum) {
    try {
      const th = _slipTakeHome(s)
      const biId = `gaji_${s.id}`
      await setDoc(doc(db, 'keuangan_buku_induk', biId), {
        id: biId,
        tipe: 'keluar',
        nominal: th,
        tanggal: tgl,
        keterangan: `Bisyaroh ${s.periode || ''} — ${s.guru_nama || ''}`.trim(),
        sumber: 'gaji',
        kategori: 'Bisyaroh',
        guru_id: s.guru_id != null ? s.guru_id : '',
        slip_id: String(s.id),
        metode: 'bmt',
        operator,
        created_at: serverTimestamp()
      })
      await setDoc(doc(db, 'keuangan_gaji', String(s.id)), {
        status_cair: 'cair',
        dicairkan_at: serverTimestamp(),
        dicairkan_by: operator,
        dicairkan_via: 'bmt_manual',
        buku_induk_id: biId
      }, { merge: true })
      ok++
    } catch (e) {
      fail++
      console.warn('[cairkanBisyaroh]', s.id, e.message)
    }
  }
  selectedSlip.value = new Set()
  await writeAuditLog({
    operator,
    action: 'cairkan_bisyaroh',
    target: 'keuangan_gaji',
    ids: belum.map((s) => String(s.id)),
    detail: { ok, fail, total: totalRp, via: 'bmt_manual' }
  })
  if (fail > 0) toast.warning(`${ok} dicairkan & dicatat, ${fail} gagal — cek console`)
  else toast.success(`${ok} slip dicairkan & tercatat di Buku Induk`)
}
const toast = useToast()

// ─── Role guards ──────────────────────────────────────────────────────────
// v.21.115.0528: gunakan cekHakAkses('akses_keuangan') untuk konsisten dengan menu gate.
// Admin biasa tidak masuk (per spec kyai — admin tanpa akses keuangan = tidak boleh lihat bisyaroh).
const isAdminKeu = computed(() => {
  return auth.cekHakAkses('akses_keuangan')
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

// v.95.0626: master tunjangan/potongan yg berlaku utk guru g (scope guru_ids; kosong = semua)
function applicableMaster(key, g) {
  const sset = settingsStore.settings || {}
  const arr = Array.isArray(sset[key]) ? sset[key] : []
  const gid = String(g.id)
  return arr.filter((m) => {
    const ids = Array.isArray(m.guru_ids) ? m.guru_ids.map(String) : []
    return ids.length === 0 || ids.includes(gid)
  })
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
    // v.95.0626: tunjangan dari slip (bulk) -> tampil di editor
    for (const tj of Array.isArray(existing.tunjangan_list) ? existing.tunjangan_list : []) {
      items.push({ kategori: 'tunjangan', lembaga: '-', label: tj.label || 'Tunjangan', nominal: Number(tj.nominal) || 0 })
    }
    form.value = {
      line_items: items,
      total_potongan: Number(existing.total_potongan || 0)
    }
  } else {
    // v.95.0626: slip baru — auto-isi tunjangan/potongan per-guru dari master (scope guru_ids; kosong = semua)
    const items = buildLineItemsFromGuru(g)
    for (const t of applicableMaster('master_tunjangan', g)) {
      items.push({ kategori: 'tunjangan', lembaga: '-', label: t.nama || 'Tunjangan', nominal: Number(t.nominal) || 0 })
    }
    const potonganAuto = applicableMaster('master_potongan', g).reduce((s, p) => s + (Number(p.nominal) || 0), 0)
    form.value = { line_items: items, total_potongan: potonganAuto }
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

// v.21.103.0527: hitung bonus kehadiran otomatis dari absensi_shift_guru
// 3 shift: pagi, sore, sekolah. hadir = status in [hadir, terlambat].
const bonusKehadiran = computed(() => {
  const out = {
    hadir_pagi: 0, hadir_sore: 0, hadir_sekolah: 0,
    tarif_pagi: 0, tarif_sore: 0, tarif_sekolah: 0,
    total_pagi: 0, total_sore: 0, total_sekolah: 0,
    total: 0
  }
  if (!selectedGuru.value) return out
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  const gid = String(selectedGuru.value.id)
  for (const a of absensiShift.value) {
    if (String(a.guru_id) !== gid) continue
    const tgl = String(a.tanggal || '')
    if (!tgl.startsWith(periode)) continue
    const status = String(a.status || '').toLowerCase()
    if (status !== 'hadir' && status !== 'terlambat') continue
    const sh = String(a.shift || '').toLowerCase()
    if (sh === 'pagi') out.hadir_pagi += 1
    else if (sh === 'sore') out.hadir_sore += 1
    else if (sh === 'sekolah') out.hadir_sekolah += 1
  }
  const sset = settingsStore.settings || {}
  out.tarif_pagi = Number(sset.keu_bisyaroh_pagi || 0) || 0
  out.tarif_sore = Number(sset.keu_bisyaroh_sore || 0) || 0
  out.tarif_sekolah = Number(sset.keu_bisyaroh_sekolah_shift || 0) || 0
  out.total_pagi = out.hadir_pagi * out.tarif_pagi
  out.total_sore = out.hadir_sore * out.tarif_sore
  out.total_sekolah = out.hadir_sekolah * out.tarif_sekolah
  out.total = out.total_pagi + out.total_sore + out.total_sekolah
  return out
})

const takeHome = computed(() => {
  const totalIn = (form.value.line_items || []).reduce(
    (sum, li) => sum + (Number(li.nominal) || 0),
    0
  )
  // v.21.103.0527: bonus kehadiran (auto dari absen) + potongan manual
  const bonus = bonusKehadiran.value.total
  const totalOut = Number(form.value.total_potongan) || 0
  return totalIn + bonus - totalOut
})

const saving = ref(false)
// v.96.0626: No. slip bisyaroh rapi — BS-NNNddmmyy (seq harian + tgl generate)
function genBisyarohNo(extra = 0) {
  const now = new Date()
  const ddmmyy = String(now.getDate()).padStart(2, '0') + String(now.getMonth() + 1).padStart(2, '0') + String(now.getFullYear()).slice(-2)
  const todayCount = (gaji.value || []).filter((s) => typeof s.no_bukti === 'string' && s.no_bukti.slice(-6) === ddmmyy).length
  return 'BS-' + String(todayCount + 1 + extra).padStart(3, '0') + ddmmyy
}

async function saveSlipSingle() {
  if (!selectedGuru.value) return
  saving.value = true
  try {
    const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
    const slipId = `gaji_${selectedGuru.value.id}_${periode}`
    // v.21.103.0527: snapshot bonus kehadiran saat save
    const bonus = bonusKehadiran.value
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
      no_bukti: genBisyarohNo(),
      guru_id: Number(selectedGuru.value.id) || selectedGuru.value.id,
      guru_nama: selectedGuru.value.nama,
      lembaga: selectedGuru.value.lembaga || '',
      jabatan: selectedGuru.value.jabatan || '',
      periode,
      line_items: lineItems,
      bisyaroh_pokok: pokok,
      bisyaroh_sekolah: sekolah,
      bisyaroh_tambahan: tambahan,
      // v.21.103.0527: snapshot bonus kehadiran (auto dari absensi_shift_guru)
      bonus_kehadiran: {
        hadir_pagi: Number(bonus.hadir_pagi || 0),
        hadir_sore: Number(bonus.hadir_sore || 0),
        hadir_sekolah: Number(bonus.hadir_sekolah || 0),
        tarif_pagi: Number(bonus.tarif_pagi || 0),
        tarif_sore: Number(bonus.tarif_sore || 0),
        tarif_sekolah: Number(bonus.tarif_sekolah || 0),
        total: Number(bonus.total || 0)
      },
      total_pemasukan: totalIn + Number(bonus.total || 0),
      total_potongan: potongan,
      take_home: totalIn + Number(bonus.total || 0) - potongan,
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
    // v.21.104.0527: hitung bonus kehadiran per guru dari absensi_shift_guru
    // (selaras dgn single-mode supaya take_home konsisten)
    const tarifPagi = Number(settings.keu_bisyaroh_pagi || 0) || 0
    const tarifSore = Number(settings.keu_bisyaroh_sore || 0) || 0
    const tarifSekolah = Number(settings.keu_bisyaroh_sekolah_shift || 0) || 0
    function hitungBonusGuru(guruId) {
      let hp = 0, hs = 0, hsk = 0
      const gid = String(guruId)
      for (const a of absensiShift.value || []) {
        if (String(a.guru_id) !== gid) continue
        const tgl = String(a.tanggal || '')
        if (!tgl.startsWith(periode)) continue
        const st = String(a.status || '').toLowerCase()
        if (st !== 'hadir' && st !== 'terlambat') continue
        const sh = String(a.shift || '').toLowerCase()
        if (sh === 'pagi') hp++
        else if (sh === 'sore') hs++
        else if (sh === 'sekolah') hsk++
      }
      const tp = hp * tarifPagi
      const ts = hs * tarifSore
      const tsk = hsk * tarifSekolah
      return {
        hadir_pagi: hp, hadir_sore: hs, hadir_sekolah: hsk,
        tarif_pagi: tarifPagi, tarif_sore: tarifSore, tarif_sekolah: tarifSekolah,
        total: tp + ts + tsk
      }
    }
    let bulkSeq = 0
    for (const g of bulkTargets.value) {
      try {
        const slipId = `gaji_${g.id}_${periode}`
        const pokok = Number(mapPokok[g.id] || 0)
        const sekolah = Number(mapSekolah[g.id] || 0)
        const bonus = hitungBonusGuru(g.id)
        // v.95.0626: tunjangan & potongan per-guru dari master (scope guru_ids; kosong = semua)
        const tjList = applicableMaster('master_tunjangan', g).map((t) => ({ label: t.nama || 'Tunjangan', nominal: Number(t.nominal) || 0 }))
        const ptList = applicableMaster('master_potongan', g).map((p) => ({ label: p.nama || 'Potongan', nominal: Number(p.nominal) || 0 }))
        const totalTunjangan = tjList.reduce((s, t) => s + t.nominal, 0)
        const totalPotongan = ptList.reduce((s, p) => s + p.nominal, 0)
        const totalIn = pokok + sekolah
        const totalSlip = totalIn + Number(bonus.total || 0) + totalTunjangan
        await setDoc(doc(db, 'keuangan_gaji', slipId), {
          id: slipId,
          no_bukti: genBisyarohNo(bulkSeq++),
          guru_id: Number(g.id) || g.id,
          guru_nama: g.nama,
          lembaga: g.lembaga || '',
          jabatan: g.jabatan || '',
          periode,
          bisyaroh_pokok: pokok,
          bisyaroh_sekolah: sekolah,
          bisyaroh_tambahan: 0,
          bonus_kehadiran: bonus,
          total_pemasukan: totalSlip,
          total_potongan: totalPotongan,
          take_home: totalSlip - totalPotongan,
          tunjangan_list: tjList,
          potongan_list: ptList,
          generated_via: 'bulk',
          updated_at: serverTimestamp()
        })
        bulkLog.value.push(`OK ${g.nama} -> ${fmtRp(totalSlip - totalPotongan)} (bonus ${fmtRp(bonus.total)})`)
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
