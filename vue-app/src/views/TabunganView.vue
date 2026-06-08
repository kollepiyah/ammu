<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Akses ditolak (selain santri & full-access) -->
    <div
      v-if="!isFullAccess && !isSantri"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Akses Keuangan terbatas</p>
    </div>

    <!-- =================== MODE SANTRI =================== -->
    <template v-else-if="isSantri">
      <!-- Card saldo santri -->
      <div
        class="bg-gradient-to-br from-[var(--color-info)] to-[var(--color-info)] rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none"
        />
        <div class="relative">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
            <i class="fas fa-wallet mr-1"></i>{{ pageTitle }} Saya
          </p>
          <h2 class="text-xl md:text-2xl font-black mt-1 drop-shadow">{{ namaSantriAktif }}</h2>
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-90 mt-4">
            Saldo {{ pageTitle }}
          </p>
          <p class="text-3xl md:text-4xl font-black mt-1 drop-shadow">{{ saldoSantriFmt }}</p>
        </div>
      </div>

      <!-- Riwayat mutasi santri -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div
          class="px-4 md:px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between"
        >
          <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
            <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mutasi
          </h3>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">
            {{ mutasiSantri.length }} transaksi
          </span>
        </div>

        <div v-if="loading" class="p-10 text-center">
          <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl mb-2"></i>
          <p class="text-xs text-[var(--text-secondary)] font-bold">Memuat...</p>
        </div>
        <div
          v-else-if="mutasiSantri.length === 0"
          class="p-10 border-t-2 border-dashed border-[var(--border-subtle)] text-center"
        >
          <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
          <p class="text-sm text-[var(--text-secondary)] italic">Belum ada mutasi {{ pageTitle.toLowerCase() }}.</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="bg-[var(--bg-card-elevated)] text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest"
            >
              <tr>
                <th class="px-4 py-2.5 text-left">Tanggal</th>
                <th class="px-4 py-2.5 text-left">Jenis</th>
                <th class="px-4 py-2.5 text-right">Nominal</th>
                <th class="px-4 py-2.5 text-right">Saldo</th>
                <th class="px-4 py-2.5 text-left">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="m in mutasiSantri"
                :key="m.id"
                class="border-t border-[var(--border-subtle)] hover:bg-slate-50 dark:hover:bg-slate-900/30"
              >
                <td
                  class="px-4 py-2.5 text-xs text-slate-700 dark:text-[var(--text-tertiary)] whitespace-nowrap"
                >
                  {{ fmtTgl(m.tanggal) }}
                </td>
                <td class="px-4 py-2.5">
                  <span
                    :class="[
                      'inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                      m.jenis === 'setor' || m.tipe === 'masuk'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    ]"
                  >
                    {{ m.jenis || m.tipe || '-' }}
                  </span>
                </td>
                <td
                  :class="[
                    'px-4 py-2.5 text-right font-black whitespace-nowrap',
                    m.jenis === 'setor' || m.tipe === 'masuk' ? 'text-emerald-700' : 'text-rose-700'
                  ]"
                >
                  {{ fmtRp(m.nominal) }}
                </td>
                <td
                  class="px-4 py-2.5 text-right text-xs font-bold text-slate-700 dark:text-[var(--text-tertiary)] whitespace-nowrap"
                >
                  {{ fmtRp(m.saldo_after || m.saldo) }}
                </td>
                <td
                  class="px-4 py-2.5 text-xs text-[var(--text-secondary)] truncate max-w-[200px]"
                >
                  {{ m.catatan || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- =================== MODE ADMIN / KEUANGAN =================== -->
    <template v-else>
      <!-- Header -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-base md:text-lg font-black text-[var(--text-primary)]">
              <i class="fas fa-wallet text-emerald-500 mr-2"></i>{{ pageTitle }}
            </h1>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">Saldo {{ pageTitle.toLowerCase() }} santri{{ isUangSaku ? " ma'had" : '' }}</p>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <div
              class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs"
            >
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">
                {{ totalSaldoFmt }}
              </span>
            </div>
            <template v-if="!isDesktop">
            <button @click="exportPdf" title="Ekspor PDF rekap saldo" class="bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-file-pdf mr-1"></i>PDF</button>
            <button @click="downloadTemplate" title="Unduh template XLSX" class="bg-slate-600 hover:bg-slate-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i class="fas fa-file-download mr-1"></i>Template</button>
            <button @click="triggerImport" :disabled="importingTab" title="Impor mutasi dari XLSX" class="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"><i :class="['fas mr-1', importingTab ? 'fa-spinner fa-spin' : 'fa-file-upload']"></i>Impor</button>
            </template>
            <input ref="importInput" type="file" accept=".xlsx,.xls" class="hidden" @change="importXlsx" />
            <template v-if="!isDesktop">
            <button
              @click="openModal()"
              class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-black px-3 py-1.5 rounded-full shadow"
            >
              <i class="fas fa-plus mr-1"></i>Input Mutasi
            </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="relative">
          <i
            class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
          ></i>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <!-- Empty / loading states -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-emerald-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat...</p>
      </div>
      <div
        v-else-if="filteredItems.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-wallet text-[var(--text-tertiary)] text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">Tidak ada {{ pageTitle.toLowerCase() }}</p>
      </div>

      <!-- Orphan banner -->
      <div
        v-if="orphanStats.count > 0"
        class="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-2"
      >
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <p class="text-xs font-bold text-rose-800">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            {{ orphanStats.count }} mutasi orphan (santri_id tidak ada di koleksi santri) &mdash;
            {{ fmtRp(orphanStats.totalSaldo) }}
          </p>
          <div class="flex gap-1.5 flex-wrap">
            <button
              @click="dumpOrphan"
              class="text-[11px] font-bold text-rose-700 bg-[var(--bg-card)] border border-rose-300 px-2 py-1 rounded hover:bg-rose-100 cursor-pointer"
            >
              <i class="fas fa-terminal mr-1"></i>Dump console
            </button>
            <button
              v-if="isFullAccess"
              @click="cleanupOrphan"
              :disabled="orphanCleaning"
              class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-2 py-1 rounded cursor-pointer"
            >
              <i :class="['fas', orphanCleaning ? 'fa-spinner fa-spin' : 'fa-broom', 'mr-1']"></i>
              {{ orphanCleaning ? 'Membersihkan...' : 'Hapus Mutasi Orphan' }}
            </button>
          </div>
        </div>
        <p class="text-[10px] text-rose-600 mt-1.5">
          <i class="fas fa-info-circle mr-1"></i>
          Mutasi orphan = transaksi yang santri-nya sudah dihapus dari data santri. "Hapus Mutasi
          Orphan" akan menghapus permanen seluruh record `{{ COLL }}` dengan santri_id
          tersebut.
        </p>
      </div>

      <!-- List santri -->
      <div v-if="!loading && filteredItems.length > 0" class="space-y-2">
        <div
          v-for="t in filteredItems"
          :key="t.santri_id"
          class="bg-[var(--bg-card)] rounded-xl p-3 border border-emerald-200 dark:border-emerald-700 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center"
            >
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{
                  getNamaSantri(t.santri_id) !== '(unknown)'
                    ? getNamaSantri(t.santri_id)
                    : t.nama_cache || `(orphan ID: ${t.santri_id})`
                }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ t.terakhir_update ? `Update: ${fmtTgl(t.terakhir_update)}` : '' }}
              </p>
            </div>
            <p class="text-base font-black text-emerald-700 dark:text-emerald-400 mr-2">
              {{ fmtRp(t.saldo) }}
            </p>
            <div class="flex gap-1">
              <button
                @click="openModal(t.santri_id, 'setor')"
                class="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-1 rounded"
                title="Setor"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                @click="openModal(t.santri_id, 'tarik')"
                class="bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-black px-2 py-1 rounded"
                title="Tarik"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- v.21.100.0527: SEMUA MUTASI panel — super_admin edit/hapus + bulk -->
    <div
      v-if="isFullAccess && isAdmin"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <div class="px-4 md:px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between flex-wrap gap-2">
        <h3 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">
          <i class="fas fa-list-check text-emerald-600 mr-2"></i>Semua Mutasi
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold ml-1">(super admin)</span>
        </h3>
        <div class="flex items-center gap-2 flex-wrap">
          <select v-model.number="mutFilterYear" class="text-[11px] px-2 py-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] outline-none">
            <option v-for="y in mutYears" :key="y" :value="y">{{ y }}</option>
          </select>
          <select v-model.number="mutFilterMonth" class="text-[11px] px-2 py-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] outline-none">
            <option :value="0">Semua bln</option>
            <option v-for="(b, i) in BULAN_TAB" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select v-model.number="mutFilterDay" class="text-[11px] px-2 py-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] outline-none">
            <option :value="0">Semua tgl</option>
            <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
          </select>
          <span class="text-[10px] text-[var(--text-tertiary)] font-bold">
            {{ mutasiFiltered.length }} / {{ mutasiSource.length }} mutasi
          </span>
          <button
            v-if="selectedMutasi.size > 0"
            @click="hapusMutasiTerpilih"
            class="text-[11px] font-black bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg"
          >
            <i class="fas fa-trash mr-1"></i>Hapus Terpilih ({{ selectedMutasi.size }})
          </button>
        </div>
      </div>
      <div v-if="mutasiFiltered.length === 0" class="p-6 text-center text-xs text-[var(--text-tertiary)] italic">
        {{ mutasiSource.length === 0 ? 'Belum ada mutasi.' : 'Tidak ada mutasi pada filter ini.' }}
      </div>
      <div v-else class="max-h-[480px] overflow-y-auto">
        <table class="w-full text-xs">
          <thead class="bg-[var(--bg-card-elevated)] sticky top-0">
            <tr class="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
              <th class="px-3 py-2 w-8"></th>
              <th class="px-3 py-2 text-left">Tanggal</th>
              <th class="px-3 py-2 text-left">Santri</th>
              <th class="px-3 py-2 text-left">Jenis</th>
              <th class="px-3 py-2 text-right">Nominal</th>
              <th class="px-3 py-2 text-left">Catatan</th>
              <th class="px-3 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="m in mutasiFiltered"
              :key="m.id"
              class="border-t border-[var(--border-subtle)] hover:bg-slate-50 dark:hover:bg-slate-900/30"
            >
              <td class="px-3 py-2 text-center">
                <input
                  type="checkbox"
                  :checked="selectedMutasi.has(String(m.id))"
                  @change="toggleMutasi(m.id)"
                  class="w-4 h-4 accent-emerald-600"
                />
              </td>
              <td class="px-3 py-2 whitespace-nowrap text-[11px] text-[var(--text-secondary)]">{{ fmtTgl(m.tanggal) }}</td>
              <td class="px-3 py-2 font-bold text-[var(--text-primary)] truncate max-w-[200px]">
                {{ m.nama_cache || getNamaSantri(m.santri_id) }}
              </td>
              <td class="px-3 py-2">
                <span :class="['inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded', m.jenis === 'setor' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">{{ m.jenis }}</span>
              </td>
              <td :class="['px-3 py-2 text-right font-black whitespace-nowrap', m.jenis === 'setor' ? 'text-emerald-700' : 'text-rose-700']">{{ fmtRp(m.nominal) }}</td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)] truncate max-w-[200px]">{{ m.catatan || '-' }}</td>
              <td class="px-3 py-2 text-right whitespace-nowrap">
                <button
                  @click="cetakSlip(m)"
                  class="text-[10px] text-emerald-600 hover:bg-emerald-50 px-1.5 py-1 rounded mr-1"
                  title="Cetak slip"
                ><i class="fas fa-receipt"></i></button>
                <button
                  @click="openEditMutasi(m)"
                  class="text-[10px] text-cyan-600 hover:bg-cyan-50 px-1.5 py-1 rounded mr-1"
                  title="Edit"
                ><i class="fas fa-edit"></i></button>
                <button
                  @click="hapusMutasi(m)"
                  class="text-[10px] text-rose-600 hover:bg-rose-50 px-1.5 py-1 rounded"
                  title="Hapus"
                ><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- =================== MODAL INPUT MUTASI =================== -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
      @click.self="closeModal"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between sticky top-0 bg-[var(--bg-card)] z-10"
        >
          <h3 class="text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-wallet text-emerald-500 mr-2"></i>Input Mutasi {{ pageTitle }}
          </h3>
          <button @click="closeModal" class="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <form v-if="!savedMutasi" @submit.prevent="simpanMutasi" class="p-5 space-y-3">
          <!-- Santri (datalist autocomplete) -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]"
            >
              Santri
            </label>
            <input
              v-model="modalSantriLabel"
              list="tabungan-santri-list"
              placeholder="Ketik nama santri..."
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              @input="onSantriInput"
              required
            />
            <datalist id="tabungan-santri-list">
              <option
                v-for="s in santriOptions"
                :key="s.id"
                :value="`${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`"
              ></option>
            </datalist>
            <p v-if="modalSantriId" class="text-[10px] mt-1 text-emerald-700 font-bold">
              <i class="fas fa-check-circle mr-1"></i>Saldo: {{ fmtRp(modalSaldoSantri) }}
            </p>
            <p
              v-else-if="modalSantriLabel.length >= 2"
              class="text-[10px] mt-1 text-rose-600 font-bold"
            >
              Santri tidak ditemukan &mdash; pilih dari saran.
            </p>
          </div>

          <!-- Jenis + Kategori -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label
                class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]"
              >
                Jenis
              </label>
              <select
                v-model="modalJenis"
                class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="setor">Setor</option>
                <option value="tarik">Tarik</option>
              </select>
            </div>
            <div>
              <label
                class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]"
              >
                Kategori
              </label>
              <select
                v-model="modalKategori"
                @change="onKategoriChange"
                class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option v-for="k in kategoriOptions" :key="k.id" :value="k.id">
                  {{ k.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Nominal -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]"
            >
              Nominal
              <span v-if="autoFilled" class="text-emerald-600 normal-case font-bold ml-1">
                <i class="fas fa-magic mr-1"></i>auto-fill {{ getKategoriLabel(modalKategori) }}
              </span>
            </label>
            <input
              v-model.number="modalNominal"
              type="number"
              min="0"
              placeholder="Rp 0"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none font-black text-lg text-emerald-700"
              required
            />
            <p class="text-[10px] mt-1 text-[var(--text-secondary)]">{{ fmtRp(modalNominal) }}</p>
          </div>

          <!-- Catatan -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]"
            >
              Catatan (opsional)
            </label>
            <input
              v-model="modalCatatan"
              type="text"
              placeholder="Keterangan"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <!-- Actions -->
          <div
            class="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-subtle)]"
          >
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving || !modalSantriId || !modalNominal"
              class="px-5 py-2 text-xs font-black bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>

        <!-- v.96.0626: panel SUKSES + tombol cetak struk (gaya POS) -->
        <div v-else class="p-5 space-y-4 text-center">
          <div class="mx-auto w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
            <i class="fas fa-check"></i>
          </div>
          <div>
            <p class="text-base font-black text-[var(--text-primary)]">Mutasi tersimpan</p>
            <p class="text-sm text-[var(--text-secondary)] mt-0.5">
              {{ savedMutasi.nama_cache }} &middot;
              {{ savedMutasi.jenis === 'setor' ? 'Setor' : 'Tarik' }} {{ fmtRp(savedMutasi.nominal) }}
            </p>
            <p class="text-[11px] text-[var(--text-tertiary)] mt-0.5">No. Transaksi: {{ savedMutasi.no_bukti || savedMutasi.id }}</p>
          </div>

          <p class="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Cetak struk:</p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              @click="cetakSlip(savedMutasi)"
              class="px-4 py-2 text-xs font-black bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
            >
              <i class="fas fa-file-pdf mr-1"></i>Struk PDF
            </button>
            <button
              v-if="isDesktop"
              type="button"
              @click="cetakSlipLangsung(savedMutasi)"
              class="px-4 py-2 text-xs font-black bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
            >
              <i class="fas fa-bolt mr-1"></i>Cetak Langsung
            </button>
          </div>

          <div class="flex items-center justify-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              @click="transaksiBaru"
              class="px-4 py-2 text-xs font-bold text-[var(--text-primary)] hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg"
            >
              <i class="fas fa-plus mr-1"></i>Transaksi Baru
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-5 py-2 text-xs font-black bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg"
            >
              <i class="fas fa-check-double mr-1"></i>Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { deleteOne } from '@/services/firestore' // v.91.0626: hapus = backup audit_log dulu
import { isSuperAdmin } from '@/utils/roleScope'
import { writeAuditLog } from '@/utils/auditLog'
import { db } from '@/services/firebase'
import { sortSantri } from '@/utils/santriSort'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
// v.21.115.0528: useConfirm utk replace window.confirm native
import { useConfirm } from '@/composables/useConfirm'
import { useKeuangan } from '@/composables/useKeuangan'
import { fmtRp, fmtTgl } from '@/utils/format'
import { cetakSlipTabunganPdf, exportRekapTabunganPdf } from '@/utils/strukBuilder'
import { buildSlipTabunganEscpBase64 } from '@/utils/escpImage'
import { isElectron, printRaw, getDefaultPrinter } from '@/composables/useDesktopPrint' // v.96.0626: cetak struk setor/tarik gaya POS (ESC/P grafis raster)
import { useExcel } from '@/composables/useExcel'
import { useRoute } from 'vue-router'

const { tabunganSantri, loading, isFullAccess, getNamaSantri, santriRaw } = useKeuangan()
// v.95.0626: mode dari route — 'uangsaku' (menu terpisah, koleksi sendiri, santri ma'had/mukim) atau default 'tabungan'
const route = useRoute()
const isUangSaku = computed(() => String(route.meta?.mode || route.query?.mode || '') === 'uangsaku')
const COLL = computed(() => (isUangSaku.value ? 'keuangan_uang_saku_santri' : 'keuangan_tabungan_santri'))
const pageTitle = computed(() => (isUangSaku.value ? 'Uang Saku' : 'Tabungan'))
const uangSakuMutasi = ref([]) // sumber mutasi admin saat mode uang saku (subscribe lokal)
let unsubUS = null
const mutasiSource = computed(() => (isUangSaku.value ? uangSakuMutasi.value : tabunganSantri.value))
// v.108: filter tahun/bulan/hari utk panel "Semua Mutasi"
const BULAN_TAB = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const mutFilterYear = ref(new Date().getFullYear())
const mutFilterMonth = ref(0)
const mutFilterDay = ref(0)
const mutYears = computed(() => {
  const ys = new Set()
  for (const m of mutasiSource.value) {
    const y = String(m.tanggal || '').slice(0, 4)
    if (/^\d{4}$/.test(y)) ys.add(Number(y))
  }
  ys.add(new Date().getFullYear())
  return [...ys].sort((a, b) => b - a)
})
const mutasiFiltered = computed(() =>
  mutasiSource.value
    .filter((m) => {
      const tg = String(m.tanggal || '')
      if (mutFilterYear.value && tg.slice(0, 4) !== String(mutFilterYear.value)) return false
      if (mutFilterMonth.value > 0 && tg.slice(5, 7) !== String(mutFilterMonth.value).padStart(2, '0')) return false
      if (mutFilterDay.value > 0 && tg.slice(8, 10) !== String(mutFilterDay.value).padStart(2, '0')) return false
      return true
    })
    .slice()
    .sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
)
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()
const confirmDlg = useConfirm()
// v.21.100.0527: super_admin only — edit/hapus mutasi tabungan
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

// Role flags
const isSantri = computed(() => auth.sesiAktif?.role === 'santri')
const namaSantriAktif = computed(() => auth.sesiAktif?.nama || '-')
const myId = computed(() => String(auth.sesiAktif?.id || ''))

// =================== SANTRI MODE — saldo + mutasi ===================
const mutasiRaw = ref([])
let unsubMutasi = null

const saldoSantri = computed(() => {
  let total = 0
  for (const m of mutasiRaw.value) {
    if (String(m.santri_id || m.santriId) !== myId.value) continue
    const nominal = Number(m.nominal) || 0
    const jenis = String(m.jenis || '').toLowerCase()
    if (jenis === 'setor') total += nominal
    else if (jenis === 'tarik') total -= nominal
  }
  return total
})
const saldoSantriFmt = computed(() => fmtRp(saldoSantri.value))

const mutasiSantri = computed(() =>
  mutasiRaw.value
    .filter((m) => String(m.santri_id || m.santriId) === myId.value)
    .sort((a, b) => {
      const ta = new Date(a.tanggal || a.createdAt || a.created_at || 0).getTime()
      const tb = new Date(b.tanggal || b.createdAt || b.created_at || 0).getTime()
      return tb - ta
    })
)

onMounted(() => {
  if (isSantri.value) {
    unsubMutasi = subscribeColl(COLL.value, (docs) => {
      mutasiRaw.value = docs
    })
  } else if (isUangSaku.value) {
    // admin + uang saku: tabungan admin pakai useKeuangan.tabunganSantri, uang saku subscribe lokal
    unsubUS = subscribeColl('keuangan_uang_saku_santri', (docs) => {
      uangSakuMutasi.value = docs
    })
  }
})
onUnmounted(() => {
  if (unsubMutasi) {
    try {
      unsubMutasi()
    } catch (e) {}
    unsubMutasi = null
  }
  if (unsubUS) {
    try {
      unsubUS()
    } catch (e) {}
    unsubUS = null
  }
})

// =================== ADMIN MODE — aggregate per santri ===================
const search = ref('')

const aggregated = computed(() => {
  const map = {}
  for (const t of mutasiSource.value) {
    const sid = String(t.santri_id || t.santriId || '')
    if (!sid) continue
    if (!map[sid]) {
      map[sid] = { santri_id: sid, saldo: 0, terakhir_update: '', nama_cache: t.nama || '' }
    }
    const nominal = Number(t.nominal) || 0
    const jenis = String(t.jenis || '').toLowerCase()
    if (jenis === 'setor') map[sid].saldo += nominal
    else if (jenis === 'tarik') map[sid].saldo -= nominal
    const tgl = String(t.tanggal || '')
    if (tgl && tgl > map[sid].terakhir_update) map[sid].terakhir_update = tgl
  }
  return Object.values(map)
})

const filteredItems = computed(() => {
  const kw = search.value.trim().toLowerCase()
  let list = [...aggregated.value]
  if (kw) {
    list = list.filter((t) =>
      (getNamaSantri(t.santri_id) || t.nama_cache || '').toLowerCase().includes(kw)
    )
  }
  return list.sort((a, b) => (Number(b.saldo) || 0) - (Number(a.saldo) || 0))
})

const orphanStats = computed(() => {
  const orphans = aggregated.value.filter(
    (t) => getNamaSantri(t.santri_id) === '(unknown)' && !t.nama_cache
  )
  return {
    count: orphans.length,
    totalSaldo: orphans.reduce((s, o) => s + Number(o.saldo || 0), 0),
    ids: orphans.map((o) => o.santri_id)
  }
})

const totalSaldoFmt = computed(() =>
  fmtRp(aggregated.value.reduce((s, t) => s + (Number(t.saldo) || 0), 0))
)

// Orphan cleanup
const orphanCleaning = ref(false)

async function cleanupOrphan() {
  const ids = orphanStats.value.ids
  if (ids.length === 0) return
  // v.21.115.0528: useConfirm API = function call, bukan .ask()
  const confirmed = await confirmDlg({
    title: `Hapus PERMANEN ${orphanStats.value.count} mutasi orphan?`,
    message: `santri_id: ${ids.join(', ')}\nTotal saldo: ${fmtRp(orphanStats.value.totalSaldo)}\n\nMutasi ini akan hilang dari database. Tidak bisa di-undo.`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!confirmed) return
  orphanCleaning.value = true
  let ok = 0
  let fail = 0
  try {
    // v.21.95.0527: Fix — orphan filter harus cek kedua varian field santri_id/santriId
    // (legacy data pakai santriId), dan compare sebagai string supaya match dgn ids list.
    const targets = mutasiSource.value.filter((m) => {
      const sid = String(m.santri_id || m.santriId || '')
      return ids.includes(sid)
    })
    for (const m of targets) {
      try {
        await deleteOne(COLL.value, m.id)
        ok++
      } catch (e) {
        fail++
        console.error('[cleanupOrphan] gagal hapus', m.id, e)
      }
    }
    if (fail > 0) toast.warning(`Cleanup: ${ok} hapus, ${fail} gagal — cek console`)
    else toast.success(`${ok} mutasi orphan dihapus`)
  } catch (e) {
    toast.error('Gagal cleanup: ' + (e.message || e))
  } finally {
    orphanCleaning.value = false
  }
}

function dumpOrphan() {
  console.group('[TabunganView] Orphan mutasi diagnostic')
  console.log('Orphan santri_id list:', orphanStats.value.ids)
  console.log('Total saldo orphan:', orphanStats.value.totalSaldo)
  console.log(
    'Detail:',
    aggregated.value.filter((t) => orphanStats.value.ids.includes(t.santri_id))
  )
  console.groupEnd()
  alert(
    `Orphan dump tersimpan di console (F12). ${orphanStats.value.count} santri_id tidak terhubung ke koleksi santri.`
  )
}

// =================== MODAL — input mutasi ===================
const modalOpen = ref(false)
const modalSantriId = ref('')
const modalSantriLabel = ref('')
const modalJenis = ref('setor')
const modalKategori = ref('umum')
const modalNominal = ref(0)
const modalCatatan = ref('')
const saving = ref(false)
const autoFilled = ref(false)
// v.21.100.0527: edit-mode + multi-select bulk delete
const editingMutasiId = ref(null)
const selectedMutasi = ref(new Set())
// v.96.0626: panel "tersimpan" + tombol cetak struk (gaya POS) setelah simpan mutasi baru
const savedMutasi = ref(null)
const savedSantri = ref(null)
const isDesktop = computed(() => isElectron())

// v.21.104.0527: Kategori tabungan terpisah dari jenis tagihan.
// Sumber utama: settings.keuTabunganKategori (array of {id, label, nominal_default}).
// Fallback default: 4 kategori umum tabungan santri.
const KATEGORI_TABUNGAN_DEFAULT = [
  { id: 'umum', label: 'Umum', nominal_default: 0 },
  { id: 'sukarela', label: 'Sukarela', nominal_default: 0 },
  { id: 'wisuda', label: 'Wisuda', nominal_default: 0 },
  { id: 'rihlah', label: 'Rihlah', nominal_default: 0 }
]
const kategoriOptions = computed(() => {
  const raw = settings.settings?.keuTabunganKategori
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((k) => ({
      id:
        k.id ||
        String(k.label || k.nama || '')
          .toLowerCase()
          .replace(/\s+/g, '_'),
      label: k.label || k.nama || k.id || '-',
      nominal_default: Number(k.nominal_default || k.nominal || 0) || 0
    }))
  }
  return KATEGORI_TABUNGAN_DEFAULT
})

function getKategoriLabel(id) {
  return kategoriOptions.value.find((k) => k.id === id)?.label || id
}

// Saldo santri yang dipilih di modal
const modalSaldoSantri = computed(() => {
  if (!modalSantriId.value) return 0
  const t = aggregated.value.find((x) => String(x.santri_id) === String(modalSantriId.value))
  return t?.saldo || 0
})

// Santri options buat datalist
const santriOptions = computed(() =>
  sortSantri(
    (santriRaw.value || [])
      .filter((s) => s.aktif !== false && (!isUangSaku.value || s.is_mukim === true))
      .map((s) => ({ id: s.id, nama: s.nama, lembaga: s.lembaga, kelas: s.kelas }))
  ).slice(0, 200)
)

function openModal(santriId = '', jenis = 'setor') {
  modalOpen.value = true
  editingMutasiId.value = null
  modalJenis.value = jenis
  modalKategori.value = 'umum'
  modalCatatan.value = ''
  const def = kategoriOptions.value.find((k) => k.id === 'syahriyah')
  modalNominal.value = def?.nominal_default || 0
  autoFilled.value = (def?.nominal_default || 0) > 0
  if (santriId) {
    const s = (santriRaw.value || []).find((x) => String(x.id) === String(santriId))
    if (s) {
      modalSantriId.value = String(s.id)
      modalSantriLabel.value = `${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`
    }
  } else {
    modalSantriId.value = ''
    modalSantriLabel.value = ''
  }
}

function closeModal() {
  modalOpen.value = false
  editingMutasiId.value = null
  savedMutasi.value = null
  savedSantri.value = null
}

// v.96.0626: reset form utk transaksi baru (modal tetap terbuka, panel cetak ditutup)
function transaksiBaru() {
  savedMutasi.value = null
  savedSantri.value = null
  openModal('', 'setor')
}

// v.21.100.0527: super_admin only — buka modal edit dari mutasi existing
function openEditMutasi(m) {
  if (!isAdmin.value) return
  modalOpen.value = true
  editingMutasiId.value = String(m.id)
  modalSantriId.value = String(m.santri_id || m.santriId || '')
  const sx = (santriRaw.value || []).find((x) => String(x.id) === modalSantriId.value)
  modalSantriLabel.value = sx ? `${sx.nama} (${sx.lembaga || ''} - ${sx.kelas || ''})` : (m.nama_cache || '')
  modalJenis.value = m.jenis || 'setor'
  modalKategori.value = m.kategori || 'umum'
  modalNominal.value = Number(m.nominal || 0)
  modalCatatan.value = m.catatan || ''
  autoFilled.value = false
}

// v.21.100.0527: hapus mutasi individual (super_admin)
async function hapusMutasi(m) {
  if (!isAdmin.value) return
  if (!confirm(`Hapus mutasi ${pageTitle.value.toLowerCase()}?\nSantri: ${m.nama_cache || getNamaSantri(m.santri_id)}\n${m.jenis} ${fmtRp(m.nominal)}\n\nTidak bisa di-undo.`)) return
  try {
    await deleteOne(COLL.value, m.id)
    toast.success('Mutasi dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

// v.21.100.0527: bulk hapus mutasi terpilih (super_admin)
async function hapusMutasiTerpilih() {
  if (!isAdmin.value) return
  const ids = Array.from(selectedMutasi.value)
  if (ids.length === 0) return
  if (!confirm(`Hapus ${ids.length} mutasi ${pageTitle.value.toLowerCase()} terpilih?\n\nTidak bisa di-undo.`)) return
  let ok = 0, fail = 0
  for (const id of ids) {
    try {
      await deleteOne(COLL.value, id)
      ok++
    } catch (e) {
      fail++
      console.warn('[bulkHapusMutasi] gagal', id, e.message)
    }
  }
  selectedMutasi.value = new Set()
  // v.21.104.0527: audit log
  await writeAuditLog({
    operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
    action: 'bulk_delete',
    target: COLL.value,
    ids,
    detail: { ok, fail }
  })
  if (fail > 0) toast.warning(`${ok} dihapus, ${fail} gagal — cek console`)
  else toast.success(`${ok} mutasi dihapus`)
}

function toggleMutasi(id) {
  const ns = new Set(selectedMutasi.value)
  const sid = String(id)
  if (ns.has(sid)) ns.delete(sid)
  else ns.add(sid)
  selectedMutasi.value = ns
}

// Resolve santri id ketika user mengetik di datalist
function onSantriInput() {
  const namaInput = (modalSantriLabel.value || '').trim().split(' (')[0].trim().toLowerCase()
  const match = (santriRaw.value || []).find(
    (s) => s.aktif !== false && (s.nama || '').toLowerCase() === namaInput
  )
  modalSantriId.value = match ? String(match.id) : ''
}

function onKategoriChange() {
  const k = kategoriOptions.value.find((x) => x.id === modalKategori.value)
  if (k && k.nominal_default > 0) {
    modalNominal.value = k.nominal_default
    autoFilled.value = true
  } else {
    autoFilled.value = false
  }
}

// Manual edit nominal → matikan auto-fill flag
watch(modalNominal, () => {
  if (modalOpen.value) autoFilled.value = false
})

async function simpanMutasi() {
  if (!modalSantriId.value || !modalNominal.value || saving.value) return
  saving.value = true
  try {
    const santri = (santriRaw.value || []).find((s) => String(s.id) === String(modalSantriId.value))
    if (editingMutasiId.value) {
      // v.21.100.0527: mode edit — update mutasi existing
      await updateDoc(doc(db, COLL.value, editingMutasiId.value), {
        santri_id: modalSantriId.value,
        nama_cache: santri?.nama || '',
        jenis: modalJenis.value,
        kategori: modalKategori.value,
        nominal: Number(modalNominal.value),
        catatan: modalCatatan.value
      })
      toast.success('Mutasi diperbarui')
    } else {
      const id = `mutasi_${modalSantriId.value}_${Date.now()}`
      const tanggal = new Date().toISOString().slice(0, 10)
      const opName = auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
      // v.96.0626: No. Transaksi rapi — TB-NNNddmmyy (tabungan) / US-NNNddmmyy (uang saku), mirror POS MU-
      const dtp = tanggal.split('-')
      const ddmmyy = (dtp[2] || '') + (dtp[1] || '') + String(dtp[0] || '').slice(-2)
      const seqN = (mutasiSource.value || []).filter((x) => x.tanggal === tanggal).length + 1
      const noBukti = (isUangSaku.value ? 'US-' : 'TB-') + String(seqN).padStart(3, '0') + ddmmyy
      await setDoc(doc(db, COLL.value, id), {
        id,
        no_bukti: noBukti,
        santri_id: modalSantriId.value,
        nama_cache: santri?.nama || '',
        jenis: modalJenis.value,
        kategori: modalKategori.value,
        nominal: Number(modalNominal.value),
        catatan: modalCatatan.value,
        tanggal,
        operator: opName,
        createdAt: serverTimestamp()
      })
      toast.success('Mutasi tersimpan')
      // v.96.0626: tampilkan panel cetak struk (jangan tutup modal — kyai pilih "tampilkan tombol cetak")
      savedMutasi.value = {
        id,
        no_bukti: noBukti,
        santri_id: modalSantriId.value,
        nama_cache: santri?.nama || '',
        jenis: modalJenis.value,
        kategori: modalKategori.value,
        nominal: Number(modalNominal.value),
        catatan: modalCatatan.value,
        tanggal,
        operator: opName
      }
      savedSantri.value = santri || null
      saving.value = false
      return
    }
    closeModal()
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

// =================== v.95.0626: EKSPOR PDF / IMPOR XLSX / TEMPLATE / CETAK SLIP ===================
const { exportSimple, importFile } = useExcel()
const importingTab = ref(false)
const importInput = ref(null)

function saldoSantriById(sid) {
  const a = aggregated.value.find((x) => String(x.santri_id) === String(sid))
  return a ? Number(a.saldo) || 0 : 0
}
// v.96.0626: cari objek santri (KOP slip butuh NIS/kelas). savedSantri dipakai utk transaksi yg baru disimpan.
function slipSantriOf(m) {
  const sid = String(m?.santri_id || m?.santriId || '')
  if (savedSantri.value && String(savedSantri.value.id) === sid) return savedSantri.value
  return (santriRaw.value || []).find((s) => String(s.id) === sid) || {}
}
function slipOpts(m) {
  return {
    saldo: saldoSantriById(m.santri_id || m.santriId),
    santri: slipSantriOf(m),
    label: pageTitle.value.toUpperCase()
  }
}
// Struk PDF (preview / unduh) — tombol mata riwayat + panel "tersimpan"
async function cetakSlip(m) {
  try {
    await cetakSlipTabunganPdf(m, settings.settings || {}, { preview: true, ...slipOpts(m) })
  } catch (e) {
    toast.error('Gagal cetak slip: ' + (e.message || e))
  }
}
// v.96.0626: Cetak Langsung (silent ke printer) — gaya POS. Desktop only; web fallback ke preview PDF.
async function cetakSlipLangsung(m) {
  try {
    const s = settings.settings || {}
    if (!isElectron()) { await cetakSlipTabunganPdf(m, s, { preview: true, ...slipOpts(m) }); return }
    // v.96.0626: cetak GRAFIS RASTER via ESC/P (bypass driver -> TANPA feed 5cm, tetap Arial)
    const printerName = getDefaultPrinter()
    const res = await printRaw({ base64: buildSlipTabunganEscpBase64(m, s, slipOpts(m)), deviceName: printerName || undefined })
    if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
    toast.success('Struk dikirim ke: ' + (printerName || 'printer default Windows'))
  } catch (e) {
    toast.error('Gagal cetak: ' + (e.message || e))
  }
}
async function exportPdf() {
  const items = filteredItems.value || []
  if (!items.length) { toast.warning('Tidak ada data untuk diekspor.'); return }
  try {
    await exportRekapTabunganPdf(items, settings.settings || {}, {
      title: 'REKAP ' + pageTitle.value.toUpperCase() + ' SANTRI',
      namaOf: (t) => (getNamaSantri(t.santri_id) !== '(unknown)' ? getNamaSantri(t.santri_id) : (t.nama_cache || t.santri_id))
    })
  } catch (e) {
    toast.error('Gagal ekspor PDF: ' + (e.message || e))
  }
}
async function downloadTemplate() {
  try {
    await exportSimple(
      [{ nis: '03.00245', nama: 'Contoh Santri', jenis: 'setor', nominal: 50000, catatan: 'saldo awal' }],
      {
        filename: 'template_' + (isUangSaku.value ? 'uang_saku' : 'tabungan') + '.xlsx',
        sheetName: pageTitle.value,
        title: 'TEMPLATE IMPOR ' + pageTitle.value.toUpperCase() + ' (hapus baris contoh, isi data)',
        columns: [
          { key: 'nis', header: 'NIS', width: 16 },
          { key: 'nama', header: 'Nama', width: 28 },
          { key: 'jenis', header: 'jenis (setor/tarik)', width: 18 },
          { key: 'nominal', header: 'Nominal', width: 14 },
          { key: 'catatan', header: 'Catatan', width: 26 }
        ]
      }
    )
  } catch (e) {
    toast.error('Gagal buat template: ' + (e.message || e))
  }
}
function triggerImport() { importInput.value && importInput.value.click() }
async function importXlsx(e) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  importingTab.value = true
  try {
    const rows = await importFile(file)
    let ok = 0, skip = 0
    const writes = []
    for (const r of rows) {
      const nis = String(r.NIS || r.nis || '').trim()
      const namaR = String(r.Nama || r.nama || '').trim()
      const jenis = String(r['jenis (setor/tarik)'] || r.jenis || r.Jenis || 'setor').toLowerCase().includes('tarik') ? 'tarik' : 'setor'
      const nominal = Number(String(r.Nominal || r.nominal || 0).replace(/[^\d]/g, '')) || 0
      if (nominal <= 0) { skip++; continue }
      const santri = (santriRaw.value || []).find(
        (s) => (nis && String(s.nis) === nis) || (namaR && String(s.nama || '').toLowerCase() === namaR.toLowerCase())
      )
      if (!santri) { skip++; continue }
      const id = `mutasi_${santri.id}_${Date.now()}_${ok}`
      writes.push(setDoc(doc(db, COLL.value, id), {
        id, santri_id: String(santri.id), nama_cache: santri.nama || '',
        jenis, kategori: 'impor', nominal,
        catatan: String(r.Catatan || r.catatan || 'impor xlsx'),
        tanggal: new Date().toISOString().slice(0, 10), createdAt: serverTimestamp()
      }))
      ok++
    }
    await Promise.all(writes)
    toast.success(`Impor selesai: ${ok} mutasi masuk, ${skip} dilewati (NIS/nama tak cocok atau nominal 0)`)
  } catch (err) {
    toast.error('Gagal impor: ' + (err.message || err))
  } finally {
    importingTab.value = false
    if (importInput.value) importInput.value.value = ''
  }
}

// v.98 full-native (Electron): tombol aksi header (PDF/Template/Impor/Input Mutasi) -> grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!isFullAccess.value) return []
  return [
    { label: 'Input Mutasi', icon: 'plus', primary: true, on: () => openModal() },
    { label: 'Ekspor PDF', icon: 'printer', on: exportPdf },
    { label: 'Template', icon: 'download', on: downloadTemplate },
    { label: 'Impor XLSX', icon: 'file', on: triggerImport, disabled: importingTab.value }
  ]
})
</script>
