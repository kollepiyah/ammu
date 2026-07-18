<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- No access -->
    <div
      v-if="!isAdminKeu && !isGuru"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses Keuangan terbatas
      </p>
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
        <!-- v.103b: tab strip 1-baris scroll-samping, scrollbar disembunyikan -->
        <div
          v-if="!isDesktop"
          class="flex flex-nowrap gap-2 border-b border-[var(--border-subtle)] mt-4 overflow-x-auto hide-scrollbar [&>*]:shrink-0"
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
              subTab === 'bulk'
                ? 'bg-emerald-600 text-white'
                : 'text-[var(--text-secondary)] hover:bg-emerald-50'
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
            <p
              class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2 tracking-wider"
            >
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
            <p
              class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2 tracking-wider"
            >
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
              <!-- v.1.1.9: rincian kehadiran = INFO. Bonus kehadiran sendiri sudah jadi
                   baris line item di atas (Jenis Bisyaroh ber-hitungan "× hadir"). -->
              <div
                v-if="rincianHadir.length > 0"
                class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg px-3 py-2 border border-cyan-200"
              >
                <p class="text-xs font-black text-cyan-800 mb-1">
                  <i class="fas fa-calendar-check mr-1"></i>Kehadiran periode ini
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-cyan-700">
                  <span v-for="r in rincianHadir" :key="r.shift">
                    {{ r.label }}: <b>{{ r.jml }}×</b>
                  </span>
                </div>
                <p class="text-[9px] text-cyan-600 italic mt-1">
                  Tidak hadir = tidak dapat bonus (bukan dipotong). Nominalnya diatur di Pengaturan
                  Keuangan &rsaquo; Bisyaroh sebagai jenis "× hadir".
                </p>
              </div>
              <!-- v.111: Bisyaroh Glondongan PTPT auto (per juz disimak) -->
              <div
                v-if="bisyarohGlondongan.total > 0 || bisyarohGlondongan.juz > 0"
                class="bg-teal-50 dark:bg-teal-900/20 rounded-lg px-3 py-2 border border-teal-200"
              >
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <p class="text-xs font-black text-teal-800">
                    <i class="fas fa-people-arrows mr-1"></i>Bisyaroh Glondongan PTPT (otomatis)
                  </p>
                  <p class="text-base font-black text-teal-900">
                    {{ fmtRp(bisyarohGlondongan.total) }}
                  </p>
                </div>
                <p class="text-[10px] text-teal-700 mt-0.5">
                  <b>{{ bisyarohGlondongan.juz }} juz</b> disimak ({{
                    bisyarohGlondongan.blok
                  }}
                  blok) × Rp{{ Number(bisyarohGlondongan.tarif).toLocaleString('id-ID') }}
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
                  <p class="text-[10px] text-rose-500">
                    Opsional — bukan dari absen. Tidak hadir tidak otomatis dipotong.
                  </p>
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
            <p
              class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 tracking-wider"
            >
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
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Bulan</label
              >
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
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Tahun</label
              >
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
              <b>{{ bulkTargets.length }} guru</b> akan di-generate slip-nya. Nominal dari
              <b>Jenis Bisyaroh</b> ber-scope + master tunjangan/potongan (Pengaturan Keuangan).
              Yang sudah punya slip periode ini akan di-OVERWRITE.
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

          <!-- v.1.1.9: Tunjangan & Potongan bulanan via Excel (per periode terpilih) -->
          <div class="mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <p
              class="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-1"
            >
              <i class="fas fa-file-excel text-emerald-600 mr-1"></i>Tunjangan &amp; Potongan
              Bulanan
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] mb-2">
              Unduh template berisi daftar guru untuk periode
              <b>{{ BULAN_NAMES[bulan - 1] }} {{ tahun }}</b
              >, isi kolom Tunjangan/Potongan, lalu impor. Slip guru yang diisi akan di-generate
              ulang + ditambah nominal itu.
            </p>
            <div class="flex gap-2 flex-wrap">
              <button
                @click="unduhTemplateBulanan"
                type="button"
                class="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
              >
                <i class="fas fa-download"></i>Template {{ BULAN_NAMES[bulan - 1] }}
              </button>
              <label
                class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer"
              >
                <i class="fas fa-file-import"></i>{{ imporBulananBusy ? 'Mengimpor…' : 'Impor' }}
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  class="hidden"
                  @change="imporBulanan"
                  :disabled="imporBulananBusy"
                />
              </label>
            </div>
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
              <i :class="['fas', exportingRekap ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>Export
              PDF
            </button>
            <!-- v.1.1.9: ekspor rekap slip ke Excel (sesuai filter periode) -->
            <button
              @click="exportRekapSlipExcel"
              :disabled="filteredSlips.length === 0"
              title="Ekspor rekap slip ke Excel (sesuai filter periode)"
              class="text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <i class="fas fa-file-excel"></i>Export Excel
            </button>
            <!-- v.97.0626: ekspor daftar pencairan via BMT (Excel) untuk disetor ke BMT -->
            <button
              v-if="isAdminKeu && filteredSlips.length > 0"
              @click="exportLaporanBmt"
              title="Ekspor daftar pencairan via BMT (Excel) — slip non-cash di filter periode ini"
              class="text-[10px] font-black bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <i class="fas fa-file-excel"></i>Laporan BMT
            </button>
            <!-- v.100 Batch12: kirim Laporan BMT ke Google Sheet (mirip PDF) -->
            <button
              v-if="isAdminKeu && filteredSlips.length > 0 && gsheetConfigured()"
              @click="kirimBmtGsheet"
              :disabled="sendingGsheetBmt"
              title="Kirim daftar pencairan via BMT ke Google Sheet"
              class="text-[10px] font-black bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <i :class="['fas', sendingGsheetBmt ? 'fa-spinner fa-spin' : 'fa-table']"></i>Sheet
              BMT
            </button>
            <!-- v.21.100.0527: bulk select hapus -->
            <label
              v-if="isAdmin && filteredSlips.length > 0"
              class="flex items-center gap-1 text-[10px] font-bold cursor-pointer"
            >
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
              <i class="fas fa-money-check-alt mr-1"></i>Cairkan &amp; Catat ({{
                selectedSlip.size
              }})
            </button>
            <button
              v-if="isAdminKeu && selectedSlip.size > 0"
              @click="tandaiMetode('cash')"
              title="Tandai slip terpilih dibayar Cash (tidak masuk laporan BMT)"
              class="text-[10px] font-black bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg"
            >
              <i class="fas fa-money-bill-wave mr-1"></i>Tandai Cash
            </button>
            <button
              v-if="isAdminKeu && selectedSlip.size > 0"
              @click="tandaiMetode('bmt')"
              title="Kembalikan slip terpilih ke metode BMT"
              class="text-[10px] font-black bg-slate-500 hover:bg-slate-600 text-white px-2.5 py-1 rounded-lg"
            >
              <i class="fas fa-university mr-1"></i>Tandai BMT
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
              <span
                v-if="String(slip.metode_cair || '') === 'cash'"
                class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded"
                >Cash</span
              >
              <span
                v-if="String(slip.status_cair || '') === 'cair'"
                class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded"
                ><i class="fas fa-check"></i> Cair</span
              >
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
            <p class="text-sm font-bold text-[var(--text-primary)]">Periode {{ slip.periode }}</p>
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase"
                >Take Home {{ fmtRp(slip.take_home) }}</span
              >
              <button
                @click="openSlipReceipt(slip)"
                title="Lihat slip"
                aria-label="Lihat slip bisyaroh"
                class="w-7 h-7 flex-shrink-0 rounded-full border border-[var(--border-default)] text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 flex items-center justify-center transition cursor-pointer"
              >
                <i class="fas fa-eye text-xs"></i>
              </button>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
// v.91.0626: deleteOne = backup audit_log dulu. serverTimestamp = shim ISO string (db.js).
import {
  subscribeColl,
  subscribeDoc,
  setOne,
  mergeOne,
  deleteOne,
  serverTimestamp
} from '@/services/db'
import { useLembaga } from '@/composables/useLembaga'
// v.1.1.9: engine Jenis Bisyaroh + label shift dari master
import {
  jenisBisyarohList,
  barisBisyaroh,
  refsUntukScope,
  ringkasSlip
} from '@/utils/bisyarohScope'
import { shiftsForGuru } from '@/utils/shiftDerive'
import { shiftLabelOf } from '@/utils/shiftMaster'
import { materialisasiHadirIkut } from '@/utils/absensiMaterialize'
import { jpByLembagaForGuru } from '@/utils/bebanMengajar'
import { hariKerjaCount } from '@/utils/hariKerja'
import { useKegiatan } from '@/composables/useKegiatan'
import { useAuthStore } from '@/stores/auth'
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
import { useSettingsStore } from '@/stores/settings'
import { useKeuangan } from '@/composables/useKeuangan'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { useExcel } from '@/composables/useExcel'
import { fmtRp, getNamaGuruGelar } from '@/utils/format'
import { periodeBulan } from '@/utils/glondongan' // v.111: bisyaroh tes glondongan PTPT
import ReceiptModal from '@/components/ReceiptModal.vue'
import { buildSlipBisyarohHtml } from '@/utils/receiptHtml'
import { cetakSlipBisyarohPdf, exportRekapBisyarohPdf } from '@/utils/strukBuilder'

const { gaji, loading } = useKeuangan()
const { guruRaw, deriveGuruLembagaRefs } = useGuru()
// v.1.1.9: Jenis Bisyaroh ber-scope (jabatan × lembaga × shift) — ganti map pokok
//   per guru + 5 tarif shift global.
const { lembagaRaw } = useLembaga()
const jabatanItems = ref([])
let unsubJabatan = null
// v.21.103.0527: absensi shift guru utk hitung bonus kehadiran otomatis (pagi/sore/sekolah)
const absensiShift = ref([])
let unsubAbsensi = null
// v.111: baris tes_glondongan (bisyaroh per juz disimak) — snapshot ke slip saat generate.
const glondonganRows = ref([])
let unsubGlondongan = null
onMounted(() => {
  unsubAbsensi = subscribeColl('absensi_shift_guru', (docs) => {
    absensiShift.value = docs || []
  })
  unsubGlondongan = subscribeColl('tes_glondongan', (docs) => {
    glondonganRows.value = docs || []
  })
  // v.1.1.9: master jabatan (units[]) utk derivasi tempat tugas pd pencocokan scope
  unsubJabatan = subscribeDoc('master', 'jabatan', (d) => {
    jabatanItems.value = Array.isArray(d?.items) ? d.items : []
  })
})
onUnmounted(() => {
  if (unsubAbsensi) {
    try {
      unsubAbsensi()
    } catch {
      /* ignore */
    }
  }
  if (unsubGlondongan) {
    try {
      unsubGlondongan()
    } catch {
      /* ignore */
    }
  }
  if (unsubJabatan) {
    try {
      unsubJabatan()
    } catch {
      /* ignore */
    }
  }
})

// v.111: hitung bisyaroh glondongan 1 guru utk 1 periode ('YYYY-MM').
//   Σ juz dari baris 'selesai' (match penguji_id, fallback penguji_nama) × tarif per juz.
function hitungGlondonganGuru(guruId, guruNama, periode, settings) {
  const tarif = Number((settings || {}).keu_glondongan_per_juz || 0) || 0
  const gid = String(guruId == null ? '' : guruId)
  const gnama = String(guruNama || '')
    .trim()
    .toLowerCase()
  let juz = 0
  let blok = 0
  for (const r of glondonganRows.value || []) {
    if (r.status !== 'selesai') continue
    const bln = r.tgl_nilai ? periodeBulan(new Date(r.tgl_nilai)) : ''
    if (bln !== periode) continue
    const pid = String(r.penguji_id || '')
    const match = pid
      ? pid === gid
      : String(r.penguji_nama || r.penilai_nama || '')
          .trim()
          .toLowerCase() === gnama
    if (!match) continue
    juz += Array.isArray(r.juz) ? r.juz.length : 0
    blok += 1
  }
  return { juz, blok, tarif, total: juz * tarif }
}
const auth = useAuthStore()
const settingsStore = useSettingsStore()
// v.1.1.x: event libur (multi-day) → Set 'YYYY-MM-DD' utk denominator hari kerja (prorata per_jp).
const { kegiatanRaw } = useKegiatan()
const liburEventSet = computed(() => {
  const set = new Set()
  for (const k of kegiatanRaw.value || []) {
    if (k.tipe !== 'libur' && k.tipe !== 'libur_nasional') continue
    const start = k.tgl_mulai
    const end = k.tgl_akhir || k.tgl_mulai
    if (!start) continue
    const sd = new Date(start)
    const ed = new Date(end)
    if (isNaN(sd.getTime()) || isNaN(ed.getTime())) continue
    const cur = new Date(sd)
    while (cur <= ed) {
      const y = cur.getFullYear()
      const m = String(cur.getMonth() + 1).padStart(2, '0')
      const d = String(cur.getDate()).padStart(2, '0')
      set.add(`${y}-${m}-${d}`)
      cur.setDate(cur.getDate() + 1)
    }
  }
  return set
})
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
    await cetakSlipBisyarohPdf(slipReceiptData.value, settingsStore.settings || {}, {
      preview: false
    })
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
  if (!slips.length) {
    toast.warning('Tidak ada slip untuk diekspor.')
    return
  }
  exportingRekap.value = true
  try {
    await exportRekapBisyarohPdf(
      slips,
      settingsStore.settings || {},
      _fmtPeriodeLabel(filterPeriode.value)
    )
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  } finally {
    exportingRekap.value = false
  }
}

async function hapusSlip(slip) {
  if (!isAdmin.value) return
  const label =
    getNamaGuruGelar(slip.guru_nama || guruNamaById(slip.guru_id)) + ' / ' + slip.periode
  if (
    !confirm(
      `Hapus PERMANEN slip bisyaroh:\n${label}\nTotal: ${fmtRp(slip.take_home || 0)}\n\nTidak bisa di-undo.`
    )
  )
    return
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
  let ok = 0,
    fail = 0
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
  return (
    (Number(s.bisyaroh_pokok) || 0) +
    (Number(s.bisyaroh_sekolah) || 0) +
    (Number(s.bisyaroh_tambahan) || 0) -
    (Number(s.total_potongan) || 0)
  )
}
async function cairkanTerpilih() {
  if (!isAdminKeu.value) {
    toast.error('Hanya admin keuangan yang bisa mencairkan')
    return
  }
  const ids = Array.from(selectedSlip.value)
  if (ids.length === 0) return
  const slips = ids
    .map((id) => filteredSlips.value.find((x) => String(x.id) === String(id)))
    .filter(Boolean)
  const belum = slips.filter((s) => String(s.status_cair || '') !== 'cair' && _slipTakeHome(s) > 0)
  const sudah = slips.length - belum.length
  if (belum.length === 0) {
    toast.info('Semua slip terpilih sudah dicairkan / nominal 0')
    return
  }
  const totalRp = belum.reduce((a, s) => a + _slipTakeHome(s), 0)
  if (
    !confirm(
      `Cairkan ${belum.length} slip (total ${fmtRp(totalRp)})?\n\nPastikan transfer ke rekening BMT guru sudah dilakukan.\nIni mencatat kas KELUAR ke Buku Induk & menandai slip lunas.${sudah ? `\n\n(${sudah} slip dilewati: sudah cair / nominal 0)` : ''}`
    )
  )
    return
  const tgl = _todayYMD()
  const operator = auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
  let ok = 0,
    fail = 0
  for (const s of belum) {
    try {
      const th = _slipTakeHome(s)
      const metode = String(s.metode_cair || '') === 'cash' ? 'tunai' : 'bmt'
      const biId = `gaji_${s.id}`
      await setOne('keuangan_buku_induk', biId, {
        id: biId,
        tipe: 'keluar',
        nominal: th,
        tanggal: tgl,
        keterangan:
          `Bisyaroh ${s.periode || ''} — ${s.guru_nama || ''} (${metode === 'tunai' ? 'Tunai' : 'BMT'})`.trim(),
        sumber: 'gaji',
        kategori: 'Bisyaroh',
        guru_id: s.guru_id != null ? s.guru_id : '',
        slip_id: String(s.id),
        metode,
        operator,
        created_at: serverTimestamp()
      })
      await mergeOne('keuangan_gaji', String(s.id), {
        status_cair: 'cair',
        dicairkan_at: serverTimestamp(),
        dicairkan_by: operator,
        dicairkan_via: metode === 'tunai' ? 'cash' : 'bmt_manual',
        buku_induk_id: biId
      })
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

// v.97.0626: tandai metode pencairan slip terpilih (default BMT; tandai 'cash' utk yg dibayar tunai).
async function tandaiMetode(metode) {
  if (!isAdminKeu.value) return
  const ids = Array.from(selectedSlip.value)
  if (ids.length === 0) return
  const val = metode === 'cash' ? 'cash' : 'bmt'
  let ok = 0
  for (const id of ids) {
    try {
      await mergeOne('keuangan_gaji', String(id), { metode_cair: val })
      ok++
    } catch (e) {
      console.warn('[tandaiMetode]', id, e.message)
    }
  }
  selectedSlip.value = new Set()
  toast.success(`${ok} slip ditandai ${val === 'cash' ? 'Cash' : 'BMT'}`)
}

// v.97.0626: ekspor daftar pencairan via BMT (Excel) — slip non-cash & belum cair di filter periode aktif.
async function exportLaporanBmt() {
  if (!isAdminKeu.value) return
  const target = filteredSlips.value.filter(
    (s) =>
      String(s.metode_cair || '') !== 'cash' &&
      String(s.status_cair || '') !== 'cair' &&
      _slipTakeHome(s) > 0
  )
  if (target.length === 0) {
    toast.info('Tidak ada slip via BMT yang perlu dicairkan di filter ini')
    return
  }
  const guruById = (id) => (guruRaw.value || []).find((g) => String(g.id) === String(id)) || {}
  const rows = target.map((s, i) => {
    const g = guruById(s.guru_id)
    return {
      no: i + 1,
      nama: s.guru_nama || g.nama || '',
      rek_bmt: g.rek_bmt || g.no_rek_bmt || '',
      nominal: _slipTakeHome(s),
      periode: s.periode || ''
    }
  })
  const total = rows.reduce((a, r) => a + Number(r.nominal || 0), 0)
  rows.push({ no: '', nama: 'TOTAL', rek_bmt: '', nominal: total, periode: '' })
  const per = filterPeriode.value || rows[0]?.periode || 'semua'
  try {
    const { exportSimple } = useExcel()
    await exportSimple(rows, {
      filename: `Laporan_Pencairan_BMT_${per}.xlsx`,
      sheetName: 'Pencairan BMT',
      title: `Laporan Pencairan Bisyaroh via BMT — ${per}`,
      columns: [
        { key: 'no', header: 'No', width: 6 },
        { key: 'nama', header: 'Nama Guru/Pegawai', width: 30 },
        { key: 'rek_bmt', header: 'No. Rekening BMT', width: 22 },
        { key: 'nominal', header: 'Nominal (Rp)', width: 16 },
        { key: 'periode', header: 'Periode', width: 14 }
      ]
    })
    toast.success(`Laporan BMT (${target.length} guru) diekspor`)
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  }
}
const toast = useToast()

// v.100 Batch12: kirim Laporan Pencairan BMT ke Google Sheet (reuse data/kolom yang sama dgn Excel)
const { isConfigured: gsheetConfigured, sendToSheet: _sendBmtSheet } = useGoogleSheet()
const sendingGsheetBmt = ref(false)
async function kirimBmtGsheet() {
  if (!isAdminKeu.value || sendingGsheetBmt.value) return
  if (!gsheetConfigured()) {
    toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.')
    return
  }
  const target = filteredSlips.value.filter(
    (s) =>
      String(s.metode_cair || '') !== 'cash' &&
      String(s.status_cair || '') !== 'cair' &&
      _slipTakeHome(s) > 0
  )
  if (target.length === 0) {
    toast.info('Tidak ada slip via BMT yang perlu dicairkan di filter ini')
    return
  }
  sendingGsheetBmt.value = true
  try {
    const guruById = (id) => (guruRaw.value || []).find((g) => String(g.id) === String(id)) || {}
    const rows = target.map((s, i) => {
      const g = guruById(s.guru_id)
      return {
        no: i + 1,
        nama: s.guru_nama || g.nama || '',
        rek_bmt: g.rek_bmt || g.no_rek_bmt || '',
        nominal: _slipTakeHome(s),
        periode: s.periode || ''
      }
    })
    const total = rows.reduce((a, r) => a + Number(r.nominal || 0), 0)
    rows.push({ no: '', nama: 'TOTAL', rek_bmt: '', nominal: total, periode: '' })
    const per = filterPeriode.value || rows[0]?.periode || 'semua'
    const ss = settingsStore.settings || {}
    const { url } = await _sendBmtSheet({
      rows,
      title: `Laporan Pencairan BMT ${per}`,
      sheetName: 'Pencairan BMT',
      kop: [
        ss.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM',
        `Laporan Pencairan Bisyaroh via BMT — ${per}`
      ].filter(Boolean),
      subtitle: `${target.length} guru/pegawai`,
      columns: [
        { key: 'no', header: 'No', width: 6 },
        { key: 'nama', header: 'Nama Guru/Pegawai', width: 30 },
        { key: 'rek_bmt', header: 'No. Rekening BMT', width: 22 },
        { key: 'nominal', header: 'Nominal (Rp)', width: 16 },
        { key: 'periode', header: 'Periode', width: 14 }
      ]
    })
    toast.success(`Laporan BMT (${target.length} guru) terkirim ke Google Sheet.`)
    try {
      window.open(url, '_blank')
    } catch (e) {
      /* ignore */
    }
  } catch (e) {
    toast.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    sendingGsheetBmt.value = false
  }
}

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

// v.98 full-native (Electron): sub-menu Bisyaroh -> grup pita "Aksi Halaman"; tab in-page disembunyikan
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!isAdminKeu.value) return []
  return [
    {
      label: 'Generate Slip',
      icon: 'doc',
      primary: mainTab.value === 'generate',
      on: () => {
        mainTab.value = 'generate'
      }
    },
    {
      label: 'Riwayat Slip',
      icon: 'refresh',
      primary: mainTab.value === 'riwayat',
      on: () => {
        mainTab.value = 'riwayat'
      }
    },
    { label: 'Ekspor Rekap', icon: 'download', on: exportRekap }
  ]
})
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

// v.1.1.9: hitung SEMUA hadir per shift utk 1 guru pada 1 periode ('YYYY-MM').
//   Dulu 5 shift di-hardcode; kini apa pun shift-nya (termasuk shift buatan Kyai).
function hadirPerShiftGuru(guruId, periode) {
  const out = {}
  const gid = String(guruId)
  for (const a of absensiShift.value || []) {
    if (String(a.guru_id) !== gid) continue
    if (!String(a.tanggal || '').startsWith(periode)) continue
    const st = String(a.status || '').toLowerCase()
    if (st !== 'hadir' && st !== 'terlambat') continue
    const sh = String(a.shift || '').toLowerCase()
    if (!sh) continue
    out[sh] = (out[sh] || 0) + 1
  }
  return out
}

// v.1.1.x: faktor prorata bisyaroh sekolah (per_jp) = (hadir+terlambat shift 'sekolah')
//   ÷ hari kerja periode. Hanya hadir+terlambat (izin/sakit/cuti/alpa mengurangi). Cap 1.
//   Numerator pakai shift id 'sekolah' (shift sekolah bawaan).
function faktorHadirSekolah(g, periode) {
  const [y, m] = String(periode).split('-').map(Number)
  if (!y || !m) return 1
  const hadir = Number(hadirPerShiftGuru(g.id, periode).sekolah || 0)
  const s = settingsStore.settings || {}
  const akhir = `${y}-${String(m).padStart(2, '0')}-${String(new Date(y, m, 0).getDate()).padStart(2, '0')}`
  const hk = hariKerjaCount(`${periode}-01`, akhir, {
    liburJumat: s.liburJumat,
    hariLiburList: Array.isArray(s.hariLibur) ? s.hariLibur : [],
    liburEventSet: liburEventSet.value,
    todayIso: new Date().toISOString().slice(0, 10)
  })
  return Math.min(1, hadir / Math.max(hk, 1))
}

// v.1.1.9: konteks pencocokan scope 1 guru — tempat tugas + shift + kehadiran.
function ctxGuru(g, periode) {
  const s = settingsStore.settings || {}
  return {
    refs: refsUntukScope(
      deriveGuruLembagaRefs(g, {
        jabatanItems: jabatanItems.value,
        lembagaList: lembagaRaw.value
      }),
      g
    ),
    shiftIds: shiftsForGuru(g, s),
    hadirPerShift: hadirPerShiftGuru(g.id, periode),
    // per_jp (bisyaroh sekolah): JP per lembaga + faktor prorata kehadiran sekolah.
    bebanJPByLembaga: jpByLembagaForGuru(s, g.id),
    faktorHadirSekolah: faktorHadirSekolah(g, periode)
  }
}

// v.1.1.9: baris slip dari Jenis Bisyaroh ber-scope (jabatan × lembaga × shift).
//   Dulu: 1 baris kosong per tempat tugas + nominal diketik tangan per guru, lalu
//   bonus kehadiran dihitung terpisah dari 5 tarif global. Kini keduanya jadi satu
//   daftar jenis; nominal ditentukan lembaga & tugas.
function buildLineItemsFromGuru(g, periode) {
  const jenis = jenisBisyarohList(settingsStore.settings || {})
  const items = barisBisyaroh(jenis, ctxGuru(g, periode)).map((b) => ({
    kategori: b.kategori,
    lembaga: b.lembaga,
    label:
      b.hitungan === 'per_hadir'
        ? `${b.label} (${b.qty}× ${fmtRp(b.tarif)})`
        : b.hitungan === 'per_jp'
          ? `${b.label} (${b.qty} JP × ${fmtRp(b.tarif)} × ${Math.round((b.faktor ?? 1) * 100)}%)`
          : b.label,
    nominal: b.nominal,
    jenis_id: b.jenis_id
  }))
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
  // Slip yang SUDAH ada dibuka apa adanya — nominal yang pernah Kyai timpa manual
  // tak boleh ditimpa balik oleh hasil hitung ulang.
  if (existing && Array.isArray(existing.line_items) && existing.line_items.length > 0) {
    form.value = {
      line_items: existing.line_items.map((li) => ({
        kategori: li.kategori || 'ngaji',
        lembaga: li.lembaga || '-',
        label: li.label || 'Bisyaroh',
        nominal: Number(li.nominal || 0),
        jenis_id: li.jenis_id || ''
      })),
      total_potongan: Number(existing.total_potongan || 0)
    }
    return
  }
  // v.1.1.9: slip baru (atau slip legacy tanpa line_items) → hitung dari Jenis Bisyaroh.
  //   Slip legacy TIDAK lagi direkonstruksi dari bisyaroh_pokok/sekolah/tambahan: angka
  //   itu lahir dari model per-guru yang sudah dihapus, jadi menyalinnya balik = memanen
  //   nominal yang tak punya jenis. Riwayat slip lamanya sendiri tetap utuh.
  const items = buildLineItemsFromGuru(g, periode)
  // master tunjangan/potongan per-guru (scope guru_ids) — sengaja TIDAK dilebur ke Jenis
  // Bisyaroh (keputusan Kyai), jadi tetap ditambahkan di sini.
  for (const t of applicableMaster('master_tunjangan', g)) {
    items.push({
      kategori: 'tunjangan',
      lembaga: '-',
      label: t.nama || 'Tunjangan',
      nominal: Number(t.nominal) || 0
    })
  }
  const potonganAuto = applicableMaster('master_potongan', g).reduce(
    (s, p) => s + (Number(p.nominal) || 0),
    0
  )
  form.value = { line_items: items, total_potongan: potonganAuto }
}

function addLineItem() {
  form.value.line_items.push({
    kategori: 'tambahan',
    lembaga: '-',
    label: 'Tambahan Manual',
    nominal: 0
  })
}

// v.1.1.9: rincian kehadiran guru terpilih — INFO saja (tak dijumlahkan ke take-home).
//   Bonus kehadiran kini jadi baris line item dari Jenis Bisyaroh ber-hitungan '× hadir',
//   jadi tak lagi dihitung terpisah dari 5 tarif global.
const rincianHadir = computed(() => {
  if (!selectedGuru.value) return []
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  const per = hadirPerShiftGuru(selectedGuru.value.id, periode)
  const s = settingsStore.settings || {}
  return Object.entries(per)
    .map(([shift, jml]) => ({ shift, label: shiftLabelOf(s, shift), jml }))
    .sort((a, b) => a.label.localeCompare(b.label, 'id'))
})

// v.1.1.x: materialisasi "hadir sekolah" guru gabungan (Bagian B) SEBELUM hitung bonus,
// agar preview & slip generate konsisten. Idempoten + create-only (util absensiMaterialize) →
// baris FISIK, jadi hadirPerShiftGuru tak berubah. Pakai absensiShift (koleksi penuh).
const _gabunganBusy = ref(false)
async function materialisasiGabunganPeriode(periode) {
  if (_gabunganBusy.value) return 0
  _gabunganBusy.value = true
  try {
    const rows = (absensiShift.value || []).filter(
      (a) => String(a.tanggal || '').slice(0, 7) === periode
    )
    const guruAktifList = (guruRaw.value || []).filter(
      (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'
    )
    return await materialisasiHadirIkut(guruAktifList, rows, settingsStore.settings || {}, setOne)
  } catch {
    return 0
  } finally {
    _gabunganBusy.value = false
  }
}
// Auto saat periode/data siap. Idempoten → konvergen (run sesudah tulis hanya no-op);
// guard re-entrancy cegah tumpang-tindih. Membuat preview rincianHadir akurat.
watch(
  [tahun, bulan, () => (absensiShift.value || []).length, () => (guruRaw.value || []).length],
  () => {
    if (!(guruRaw.value || []).length) return
    materialisasiGabunganPeriode(`${tahun.value}-${String(bulan.value).padStart(2, '0')}`)
  },
  { immediate: true }
)

// v.111: bisyaroh glondongan guru terpilih utk periode form (preview single-mode).
const bisyarohGlondongan = computed(() => {
  if (!selectedGuru.value) return { juz: 0, blok: 0, tarif: 0, total: 0 }
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  return hitungGlondonganGuru(
    selectedGuru.value.id,
    selectedGuru.value.nama,
    periode,
    settingsStore.settings || {}
  )
})

const takeHome = computed(() => {
  // v.1.1.9: bonus kehadiran SUDAH jadi baris line_items (jenis '× hadir'), jadi
  //   tak ditambahkan lagi terpisah — dulu ada `+ bonusKehadiran.total` di sini.
  const totalIn = (form.value.line_items || []).reduce(
    (sum, li) => sum + (Number(li.nominal) || 0),
    0
  )
  // v.111: + bisyaroh glondongan (auto dari tes_glondongan, dihitung per juz)
  const glond = bisyarohGlondongan.value.total
  const totalOut = Number(form.value.total_potongan) || 0
  return totalIn + glond - totalOut
})

const saving = ref(false)
// v.96.0626: No. slip bisyaroh rapi — BS-NNNddmmyy (seq harian + tgl generate)
function genBisyarohNo(extra = 0) {
  const now = new Date()
  const ddmmyy =
    String(now.getDate()).padStart(2, '0') +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getFullYear()).slice(-2)
  const todayCount = (gaji.value || []).filter(
    (s) => typeof s.no_bukti === 'string' && s.no_bukti.slice(-6) === ddmmyy
  ).length
  return 'BS-' + String(todayCount + 1 + extra).padStart(3, '0') + ddmmyy
}

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
      nominal: Number(li.nominal) || 0,
      jenis_id: li.jenis_id || ''
    }))
    // v.1.1.9: ringkasan turunan dari line_items — tiap baris masuk TEPAT SATU ember
    //   (pokok / sekolah / tambahan / bonus / tunjangan) supaya rekap PDF yang
    //   menjumlahkan kolom-kolom itu tidak dobel.
    const rk = ringkasSlip(lineItems)
    const potongan = Number(form.value.total_potongan) || 0
    // v.111: snapshot bisyaroh glondongan (Σ juz selesai × tarif) periode ini
    const glond = hitungGlondonganGuru(
      selectedGuru.value.id,
      selectedGuru.value.nama,
      periode,
      settingsStore.settings || {}
    )
    await setOne('keuangan_gaji', slipId, {
      id: slipId,
      no_bukti: genBisyarohNo(),
      guru_id: Number(selectedGuru.value.id) || selectedGuru.value.id,
      guru_nama: selectedGuru.value.nama,
      lembaga: selectedGuru.value.lembaga || '',
      jabatan: selectedGuru.value.jabatan || '',
      periode,
      line_items: lineItems,
      bisyaroh_pokok: rk.pokok,
      bisyaroh_sekolah: rk.sekolah,
      bisyaroh_tambahan: rk.tambahan,
      // v.1.1.9: bonus kehadiran kini turunan dari baris jenis '× hadir' (dulu dari
      //   5 tarif global). Tetap ditulis supaya rekap PDF & dasbor tak perlu diubah.
      bonus_kehadiran: { total: rk.bonusTotal, rincian: rk.bonusRincian },
      // v.111: snapshot bisyaroh glondongan PTPT (per juz disimak)
      bonus_glondongan: {
        juz: Number(glond.juz || 0),
        blok: Number(glond.blok || 0),
        tarif: Number(glond.tarif || 0),
        total: Number(glond.total || 0)
      },
      total_pemasukan: rk.totalIn + Number(glond.total || 0),
      total_potongan: potongan,
      take_home: rk.totalIn + Number(glond.total || 0) - potongan,
      tunjangan_list: rk.tunjanganList,
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

// v.1.1.9: payload slip bersama utk bulk & impor bulanan — supaya sumber hitungnya SATU.
//   extra = { tunjanganExtra:[{label,nominal}], potonganExtra:[{label,nominal}], via }.
//   Baris dari Jenis Bisyaroh + master tunjangan/potongan (scope) + penyesuaian per bulan.
function buildSlipPayload(g, periode, seq, extra = {}) {
  const settings = settingsStore.settings || {}
  const lineItems = buildLineItemsFromGuru(g, periode)
  const ptList = applicableMaster('master_potongan', g).map((p) => ({
    label: p.nama || 'Potongan',
    nominal: Number(p.nominal) || 0
  }))
  for (const t of applicableMaster('master_tunjangan', g)) {
    lineItems.push({
      kategori: 'tunjangan',
      lembaga: '-',
      label: t.nama || 'Tunjangan',
      nominal: Number(t.nominal) || 0
    })
  }
  for (const t of extra.tunjanganExtra || []) {
    if (Number(t.nominal) > 0)
      lineItems.push({
        kategori: 'tunjangan',
        lembaga: '-',
        label: t.label || 'Tunjangan',
        nominal: Number(t.nominal) || 0
      })
  }
  const extraPot = (extra.potonganExtra || [])
    .map((p) => ({ label: p.label || 'Potongan', nominal: Number(p.nominal) || 0 }))
    .filter((p) => p.nominal > 0)
  const allPot = [...ptList, ...extraPot]
  const totalPotongan = allPot.reduce((s, p) => s + p.nominal, 0)
  const rk = ringkasSlip(lineItems)
  const glond = hitungGlondonganGuru(g.id, g.nama, periode, settings)
  const totalSlip = rk.totalIn + Number(glond.total || 0)
  return {
    id: `gaji_${g.id}_${periode}`,
    no_bukti: genBisyarohNo(seq),
    guru_id: Number(g.id) || g.id,
    guru_nama: g.nama,
    lembaga: g.lembaga || '',
    jabatan: g.jabatan || '',
    periode,
    line_items: lineItems,
    bisyaroh_pokok: rk.pokok,
    bisyaroh_sekolah: rk.sekolah,
    bisyaroh_tambahan: rk.tambahan,
    bonus_kehadiran: { total: rk.bonusTotal, rincian: rk.bonusRincian },
    bonus_glondongan: {
      juz: Number(glond.juz || 0),
      blok: Number(glond.blok || 0),
      tarif: Number(glond.tarif || 0),
      total: Number(glond.total || 0)
    },
    total_pemasukan: totalSlip,
    total_potongan: totalPotongan,
    take_home: totalSlip - totalPotongan,
    tunjangan_list: rk.tunjanganList,
    potongan_list: allPot,
    generated_via: extra.via || 'bulk',
    updated_at: serverTimestamp()
  }
}

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
  try {
    // Bagian B: pastikan "hadir sekolah" guru gabungan sudah materialisasi SEBELUM hitung bonus.
    const nGab = await materialisasiGabunganPeriode(periode)
    if (nGab > 0) bulkLog.value.push(`Sinkron gabungan: ${nGab} hadir sekolah otomatis dibuat`)
    let bulkSeq = 0
    for (const g of bulkTargets.value) {
      try {
        const payload = buildSlipPayload(g, periode, bulkSeq++, { via: 'bulk' })
        await setOne('keuangan_gaji', payload.id, payload)
        bulkLog.value.push(`OK ${g.nama} -> ${fmtRp(payload.take_home)}`)
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

// ── v.1.1.9: Excel bulanan di menu Bisyaroh ──
// Ekspor rekap slip periode (sesuai filter Riwayat) + template/impor potongan &
// tunjangan per guru untuk 1 periode. Impor = generate slip guru tsb dgn penyesuaian.
const { exportSimple, importFile } = useExcel()
const imporBulananBusy = ref(false)
const _pick = (obj, names) => {
  const map = {}
  for (const k of Object.keys(obj || {})) map[String(k).trim().toLowerCase()] = obj[k]
  for (const n of names) {
    const v = map[n]
    if (v !== undefined && v !== null && String(v).trim() !== '') return v
  }
  return ''
}
const _parseRp = (v) => parseInt(String(v == null ? '' : v).replace(/[^0-9]/g, '')) || 0

async function exportRekapSlipExcel() {
  const slips = filteredSlips.value || []
  if (!slips.length) {
    toast.warning('Tidak ada slip untuk diekspor.')
    return
  }
  const guruById = (id) => (guruRaw.value || []).find((g) => String(g.id) === String(id)) || {}
  const rows = slips.map((s, i) => {
    const g = guruById(s.guru_id)
    return {
      no: i + 1,
      nama: s.guru_nama || guruNamaById(s.guru_id),
      // v.1.1.9: rekening BMT tujuan transfer (fallback field lama no_rek_bmt)
      rek_bmt: g.rek_bmt || g.no_rek_bmt || '',
      lembaga: s.lembaga || '',
      jabatan: s.jabatan || '',
      periode: s.periode || '',
      pokok: Number(s.bisyaroh_pokok || 0),
      sekolah: Number(s.bisyaroh_sekolah || 0),
      tambahan: Number(s.bisyaroh_tambahan || 0),
      glondongan: Number((s.bonus_glondongan || {}).total || 0),
      potongan: Number(s.total_potongan || 0),
      take_home: Number(s.take_home || 0)
    }
  })
  const per = filterPeriode.value || rows[0]?.periode || 'semua'
  try {
    await exportSimple(rows, {
      filename: `Rekap_Bisyaroh_${per}.xlsx`,
      sheetName: 'Rekap Bisyaroh',
      title: `Rekap Slip Bisyaroh — ${per}`,
      columns: [
        { key: 'no', header: 'No', width: 6 },
        { key: 'nama', header: 'Nama', width: 28 },
        { key: 'rek_bmt', header: 'No. Rekening BMT', width: 22 },
        { key: 'lembaga', header: 'Lembaga', width: 18 },
        { key: 'jabatan', header: 'Jabatan', width: 18 },
        { key: 'periode', header: 'Periode', width: 12 },
        { key: 'pokok', header: 'Pokok', width: 14 },
        { key: 'sekolah', header: 'Sekolah', width: 14 },
        { key: 'tambahan', header: 'Tambahan/Bonus', width: 16 },
        { key: 'glondongan', header: 'Glondongan', width: 14 },
        { key: 'potongan', header: 'Potongan', width: 14 },
        { key: 'take_home', header: 'Take Home', width: 16 }
      ]
    })
    toast.success(`Rekap ${rows.length} slip diekspor.`)
  } catch (e) {
    toast.error('Gagal ekspor: ' + (e.message || e))
  }
}

function unduhTemplateBulanan() {
  const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
  const rows = bulkTargets.value.map((g) => ({
    id: String(g.id),
    nama: g.nama || '',
    lembaga: g.lembaga || g.lembaga_sekolah || '',
    tunjangan: '',
    potongan: '',
    keterangan: ''
  }))
  if (rows.length === 0) {
    toast.warning('Tidak ada guru pada filter tipe ini.')
    return
  }
  exportSimple(rows, {
    filename: `tunjangan_potongan_${periode}.xlsx`,
    sheetName: 'Bulanan',
    title: `Tunjangan & Potongan Bulanan — ${periode} (JANGAN ubah kolom ID)`,
    columns: [
      { key: 'id', header: 'ID', width: 16 },
      { key: 'nama', header: 'Nama', width: 28 },
      { key: 'lembaga', header: 'Lembaga', width: 18 },
      { key: 'tunjangan', header: 'Tunjangan (Rp)', width: 16 },
      { key: 'potongan', header: 'Potongan (Rp)', width: 16 },
      { key: 'keterangan', header: 'Keterangan', width: 24 }
    ]
  })
}

async function imporBulanan(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporBulananBusy.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    const periode = `${tahun.value}-${String(bulan.value).padStart(2, '0')}`
    // Bagian B: pastikan hadir sekolah guru gabungan sudah ada sebelum hitung slip impor.
    await materialisasiGabunganPeriode(periode)
    const byId = {}
    const byNama = {}
    for (const g of guruRaw.value || []) {
      byId[String(g.id)] = g
      byNama[
        String(g.nama || '')
          .trim()
          .toLowerCase()
      ] = g
    }
    // Kumpulkan dulu target (guru + nominal) supaya bisa konfirmasi jumlahnya.
    const targets = []
    let miss = 0
    for (const r of rows) {
      const id = String(_pick(r, ['id', 'guru_id']) || '').trim()
      const nama = String(_pick(r, ['nama', 'nama guru']) || '').trim()
      const g = (id && byId[id]) || (nama && byNama[nama.toLowerCase()]) || null
      const tunj = _parseRp(_pick(r, ['tunjangan (rp)', 'tunjangan']))
      const pot = _parseRp(_pick(r, ['potongan (rp)', 'potongan']))
      if (!g) {
        if (tunj || pot) miss++
        continue
      }
      if (tunj <= 0 && pot <= 0) continue
      const ket = String(_pick(r, ['keterangan']) || '').trim()
      targets.push({ g, tunj, pot, ket })
    }
    if (targets.length === 0) {
      toast.info(
        `Tidak ada baris berisi tunjangan/potongan${miss ? ` (${miss} guru tak cocok)` : ''}.`
      )
      return
    }
    if (
      !confirm(
        `Terapkan ke ${targets.length} slip periode ${periode}?\n\nSlip guru tsb akan di-GENERATE ULANG dari Jenis Bisyaroh + master, lalu ditambah tunjangan/potongan dari Excel. Penyesuaian manual sebelumnya pada slip itu tergantikan.`
      )
    )
      return
    let ok = 0
    let seq = 0
    for (const t of targets) {
      try {
        const payload = buildSlipPayload(t.g, periode, seq++, {
          via: 'impor_bulanan',
          tunjanganExtra:
            t.tunj > 0 ? [{ label: t.ket || 'Tunjangan (impor)', nominal: t.tunj }] : [],
          potonganExtra: t.pot > 0 ? [{ label: t.ket || 'Potongan (impor)', nominal: t.pot }] : []
        })
        await setOne('keuangan_gaji', payload.id, payload)
        ok++
      } catch (e) {
        console.warn('[imporBulanan]', t.g?.nama, e.message)
      }
    }
    toast.success(`${ok} slip diperbarui${miss ? `, ${miss} guru tak cocok (ID/nama)` : ''}.`)
  } catch (e) {
    toast.error('Gagal impor: ' + (e.message || e))
  } finally {
    imporBulananBusy.value = false
    ev.target.value = ''
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
