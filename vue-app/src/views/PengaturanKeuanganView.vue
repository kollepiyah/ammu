<template>
  <div class="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-5 md:p-6 border border-[var(--border-subtle)] shadow-sm"
    >
      <h2 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-sliders-h text-cyan-600 mr-2"></i>Pengaturan Keuangan
      </h2>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Atur tanggal jatuh tempo, jenis tagihan, bisyaroh shift &amp; bisyaroh pokok.
      </p>
    </div>

    <!-- Pembayaran & Jatuh Tempo -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-calendar-day text-teal-600 mr-1"></i>Pembayaran &amp; Jatuh Tempo
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
          >
            Tanggal Jatuh Tempo Default Syahriyah Bulanan (1-28)
          </label>
          <input
            v-model.number="form.keu_jatuh_tempo"
            type="number"
            min="1"
            max="28"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
          >
            Auto-Generate Pembayaran
          </label>
          <button
            @click="autoGenerate"
            :disabled="generating"
            class="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer disabled:opacity-50"
          >
            <i class="fas fa-sync mr-1"></i
            >{{ generating ? 'Generating...' : 'Generate Bulan Ini' }}
          </button>
        </div>
      </div>

      <!-- v.21.89.0527: Lebar kertas struk POS (dot-matrix) -->
      <div class="mt-4">
        <label
          class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
        >
          Lebar Kertas Struk POS (Dot-matrix)
        </label>
        <select
          v-model="form.posStrukPaper"
          class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
        >
          <option value="9.5">9.5 inci (continuous form, ±24 cm — Epson LX-310)</option>
          <option value="thermal80">80 mm thermal (~42 kolom)</option>
          <option value="thermal58">58 mm thermal (~32 kolom)</option>
        </select>
        <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
          <i class="fas fa-info-circle mr-1"></i>Untuk cetak struk POS ke printer dot-matrix
          Epson LX-310 atau thermal. Pencetakan langsung via Tauri menyusul.
        </p>
      </div>

      <div class="mt-4">
        <h4
          class="font-black text-slate-700 dark:text-[var(--text-tertiary)] text-[11px] uppercase tracking-wider mb-2"
        >
          Daftar Jenis Pembayaran (label + nominal default — match legacy)
        </h4>
        <p class="text-[10px] text-[var(--text-secondary)] mb-2 italic">
          <i class="fas fa-info-circle mr-1"></i>Nominal default akan auto-isi di ModalPOS saat klik
          preset jenis. Set 0 kalau nominal variabel.
        </p>
        <div class="space-y-1.5 mb-2">
          <div
            v-for="(jenis, idx) in jenisList"
            :key="idx"
            class="bg-slate-50 dark:bg-slate-700/30 px-3 py-2 rounded-lg"
          >
            <div class="grid grid-cols-12 gap-2 items-center">
              <input
                v-model="jenis.label"
                type="text"
                placeholder="Label (Syahriyah, Infaq, ...)"
                class="col-span-5 bg-transparent text-sm font-bold text-[var(--text-primary)] outline-none border-b border-[var(--border-default)] pb-1"
              />
              <input
                v-model.number="jenis.nominal_default"
                type="number"
                min="0"
                placeholder="Nominal default"
                class="col-span-3 bg-[var(--bg-card)] text-xs font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-2 py-1"
              />
              <label class="col-span-2 flex items-center gap-1 text-[10px] font-bold text-[var(--text-secondary)]">
                <input v-model="jenis.auto_generate" type="checkbox" class="w-3 h-3" />
                Auto
              </label>
              <button
                @click="jenis._expanded = !jenis._expanded"
                :title="jenis._expanded ? 'Tutup override' : 'Atur nominal per lembaga'"
                class="col-span-1 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-2 py-1 rounded text-xs"
              >
                <i :class="['fas', jenis._expanded ? 'fa-chevron-up' : 'fa-building']"></i>
              </button>
              <button
                @click="removeJenis(idx)"
                :disabled="jenis.id === 'syahriyah'"
                :title="jenis.id === 'syahriyah' ? 'Protected - jenis dasar' : 'Hapus'"
                class="col-span-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 py-1 rounded text-xs disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <!-- v.21.100.0527: Whitelist + override per-lembaga + per-kelas -->
            <div v-if="jenis._expanded" class="mt-2 pt-2 border-t border-[var(--border-subtle)] space-y-3">
              <!-- 1) Whitelist lembaga -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-filter mr-1"></i>Hanya untuk lembaga ini (kosong = semua lembaga):
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="lemb in (lembagaRaw || [])"
                    :key="`${jenis.id}_wl_${lemb.lembaga}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="Array.isArray(jenis.lembaga_only) && jenis.lembaga_only.includes(lemb.lembaga)"
                      @change="toggleLembagaOnly(jenis, lemb.lembaga)"
                      class="w-3 h-3 accent-teal-600"
                    />
                    {{ lemb.lembaga }}
                  </label>
                </div>
                <p v-if="Array.isArray(jenis.lembaga_only) && jenis.lembaga_only.length > 0" class="text-[9px] text-teal-600 mt-1">
                  <i class="fas fa-check-circle"></i> Hanya muncul di POS untuk: {{ jenis.lembaga_only.join(', ') }}
                </p>
              </div>

              <!-- 2) Override per-lembaga -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1.5">
                  <i class="fas fa-building mr-1"></i>Nominal per lembaga (override default). Kosong / 0 = pakai default.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div
                    v-for="lemb in lembagaScope(jenis)"
                    :key="`${jenis.id}_pl_${lemb.lembaga}`"
                    class="flex items-center gap-2 bg-[var(--bg-card)] rounded px-2 py-1"
                  >
                    <span class="text-[10px] font-bold text-[var(--text-secondary)] flex-1 truncate">{{ lemb.lembaga }}</span>
                    <input
                      :value="jenis.nominal_per_lembaga?.[lemb.lembaga] || ''"
                      @input="jenis.nominal_per_lembaga = { ...(jenis.nominal_per_lembaga || {}), [lemb.lembaga]: Number($event.target.value) || 0 }"
                      type="number"
                      min="0"
                      :placeholder="String(jenis.nominal_default || 0)"
                      class="w-28 text-xs font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-2 py-1 text-right"
                    />
                  </div>
                </div>
              </div>

              <!-- 3) Override per-kelas (paling spesifik) -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1.5">
                  <i class="fas fa-layer-group mr-1"></i>Nominal per kelas (paling spesifik, mengalahkan per-lembaga). Kosong = pakai per-lembaga / default.
                </p>
                <div class="space-y-2">
                  <div
                    v-for="lemb in lembagaScope(jenis)"
                    :key="`${jenis.id}_pk_${lemb.lembaga}`"
                    class="bg-[var(--bg-card)] rounded p-2 border border-[var(--border-subtle)]"
                  >
                    <p class="text-[10px] font-black text-[var(--text-secondary)] mb-1">{{ lemb.lembaga }}</p>
                    <div v-if="kelasOfLembaga(lemb).length === 0" class="text-[9px] text-[var(--text-tertiary)] italic">
                      Lembaga ini belum punya kelas
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                      <div
                        v-for="kls in kelasOfLembaga(lemb)"
                        :key="`${jenis.id}_pk_${lemb.lembaga}_${kls}`"
                        class="flex items-center gap-1.5"
                      >
                        <span class="text-[9px] font-bold text-[var(--text-secondary)] w-12 truncate">{{ kls }}</span>
                        <input
                          :value="(jenis.nominal_per_kelas?.[lemb.lembaga] || {})[kls] || ''"
                          @input="setNominalKelas(jenis, lemb.lembaga, kls, $event.target.value)"
                          type="number"
                          min="0"
                          :placeholder="String((jenis.nominal_per_lembaga || {})[lemb.lembaga] || jenis.nominal_default || 0)"
                          class="flex-1 text-[10px] font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-1.5 py-0.5 text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p v-if="jenisList.length === 0" class="text-xs text-[var(--text-tertiary)] italic text-center py-2">
            Belum ada jenis tagihan. Tambah di bawah.
          </p>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newJenis"
            @keyup.enter="addJenis"
            type="text"
            placeholder="Nama jenis tagihan baru..."
            class="flex-1 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
          <button
            @click="addJenis"
            class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap"
          >
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>
      </div>
    </div>

    <!-- Bisyaroh -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-hand-holding-usd text-cyan-600 mr-1"></i>Bisyaroh Guru/Pegawai
      </h3>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 pb-4 border-b border-[var(--border-subtle)]"
      >
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
          >
            Bisyaroh per Shift Pagi (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_pagi"
            @input="onFmtChange($event, 'keu_bisyaroh_pagi')"
            type="text"
            inputmode="numeric"
            placeholder="Nominal per kehadiran..."
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
          >
            Bisyaroh per Shift Sore (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_sore"
            @input="onFmtChange($event, 'keu_bisyaroh_sore')"
            type="text"
            inputmode="numeric"
            placeholder="Nominal per kehadiran..."
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <!-- v.21.103.0527: shift sekolah utk guru sekolah -->
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh per Shift Sekolah (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_sekolah_shift"
            @input="onFmtChange($event, 'keu_bisyaroh_sekolah_shift')"
            type="text"
            inputmode="numeric"
            placeholder="Nominal per kehadiran..."
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
      </div>

      <div>
        <div class="flex justify-between items-start mb-2">
          <h4
            class="font-black text-slate-700 dark:text-[var(--text-tertiary)] text-[11px] uppercase tracking-wider"
          >
            Bisyaroh Pokok Per Guru/Pegawai (Flat Bulanan)
          </h4>
        </div>
        <p class="text-[10px] text-[var(--text-tertiary)] italic mb-2">
          Pokok = bayar tetap. Tambahan dari shift = otomatis dari absensi.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-2 mb-3">
          <input
            v-model="searchGuru"
            type="text"
            placeholder="Cari nama guru..."
            class="px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
          <select
            v-model="filterLembaga"
            class="px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          >
            <option value="">Semua Lembaga</option>
            <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div class="space-y-1.5 max-h-96 overflow-y-auto custom-scrollbar">
          <div
            v-for="g in filteredGuru"
            :key="g.id"
            class="grid grid-cols-[1fr_120px_120px] gap-2 items-center bg-slate-50 dark:bg-slate-700/30 px-3 py-2 rounded-lg"
          >
            <div class="min-w-0">
              <p class="text-xs font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] truncate">
                {{ g.lembaga || '-' }}
              </p>
            </div>
            <input
              v-model="form.keu_bisyaroh_pokok[g.id]"
              @input="onFmtMapChange($event, 'keu_bisyaroh_pokok', g.id)"
              type="text"
              inputmode="numeric"
              placeholder="0"
              title="Pokok Pondok"
              class="px-2 py-1.5 text-xs text-right font-bold border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
            <input
              v-model="form.keu_bisyaroh_sekolah[g.id]"
              @input="onFmtMapChange($event, 'keu_bisyaroh_sekolah', g.id)"
              type="text"
              inputmode="numeric"
              placeholder="0"
              title="Pokok Sekolah (terpisah)"
              class="px-2 py-1.5 text-xs text-right font-bold border border-emerald-300 dark:border-emerald-700 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"
            />
          </div>
          <p
            v-if="filteredGuru.length === 0"
            class="text-xs text-[var(--text-tertiary)] italic text-center py-4"
          >
            Tidak ada guru cocok filter.
          </p>
        </div>
        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
          Kolom kiri = Pokok Pondok &middot; Kolom kanan emerald = Pokok Sekolah (flat per guru per
          bulan)
        </p>
      </div>
    </div>

    <!-- Kategori Transaksi -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-tags text-teal-600 mr-1"></i>Kategori Transaksi Manual (Buku Induk)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Pemasukan -->
        <div>
          <h4
            class="font-black text-emerald-700 dark:text-emerald-300 text-[11px] uppercase tracking-wider mb-2"
          >
            <i class="fas fa-arrow-down mr-1"></i>Kategori Pemasukan
          </h4>
          <div class="space-y-1.5 mb-2">
            <div
              v-for="(kat, idx) in form.keu_kategori_masuk"
              :key="idx"
              class="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg"
            >
              <input
                v-model="form.keu_kategori_masuk[idx]"
                type="text"
                class="flex-1 bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
              />
              <button
                @click="removeKategori('masuk', idx)"
                class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newKatMasuk"
              @keyup.enter="addKategori('masuk')"
              type="text"
              placeholder="Kategori baru..."
              class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            />
            <button
              @click="addKategori('masuk')"
              class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-2 rounded-lg text-xs"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <!-- Pengeluaran -->
        <div>
          <h4
            class="font-black text-rose-700 dark:text-rose-300 text-[11px] uppercase tracking-wider mb-2"
          >
            <i class="fas fa-arrow-up mr-1"></i>Kategori Pengeluaran
          </h4>
          <div class="space-y-1.5 mb-2">
            <div
              v-for="(kat, idx) in form.keu_kategori_keluar"
              :key="idx"
              class="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg"
            >
              <input
                v-model="form.keu_kategori_keluar[idx]"
                type="text"
                class="flex-1 bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
              />
              <button
                @click="removeKategori('keluar', idx)"
                class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newKatKeluar"
              @keyup.enter="addKategori('keluar')"
              type="text"
              placeholder="Kategori baru..."
              class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            />
            <button
              @click="addKategori('keluar')"
              class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-lg text-xs"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Master Tunjangan -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div
        class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-plus-circle text-emerald-600 mr-1"></i>Master Tunjangan
        </h3>
        <button
          @click="addMaster('tunjangan')"
          class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-2">
        Tunjangan otomatis terisi di slip gaji guru sesuai scope.
      </p>
      <div
        v-if="form.master_tunjangan.length === 0"
        class="text-xs text-[var(--text-tertiary)] italic text-center py-3"
      >
        Belum ada master tunjangan.
      </div>
      <div v-else class="space-y-1.5">
        <div
          v-for="(item, idx) in form.master_tunjangan"
          :key="idx"
          class="grid grid-cols-[1fr_140px_60px] gap-2 items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg"
        >
          <input
            v-model="item.nama"
            type="text"
            placeholder="Nama tunjangan"
            class="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
          />
          <input
            v-model="item.nominalFmt"
            @input="onMasterFmtChange(item, $event)"
            type="text"
            inputmode="numeric"
            placeholder="Rp 0"
            class="bg-transparent text-xs text-right font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-emerald-300 dark:border-emerald-700 rounded px-2 py-1"
          />
          <button
            @click="removeMaster('tunjangan', idx)"
            class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Master Potongan -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div
        class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3"
      >
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-minus-circle text-rose-600 mr-1"></i>Master Potongan
        </h3>
        <button
          @click="addMaster('potongan')"
          class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-2">
        Potongan otomatis terisi di slip gaji guru sesuai scope.
      </p>
      <div
        v-if="form.master_potongan.length === 0"
        class="text-xs text-[var(--text-tertiary)] italic text-center py-3"
      >
        Belum ada master potongan.
      </div>
      <div v-else class="space-y-1.5">
        <div
          v-for="(item, idx) in form.master_potongan"
          :key="idx"
          class="grid grid-cols-[1fr_140px_60px] gap-2 items-center bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg"
        >
          <input
            v-model="item.nama"
            type="text"
            placeholder="Nama potongan"
            class="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
          />
          <input
            v-model="item.nominalFmt"
            @input="onMasterFmtChange(item, $event)"
            type="text"
            inputmode="numeric"
            placeholder="Rp 0"
            class="bg-transparent text-xs text-right font-bold text-rose-800 dark:text-rose-200 outline-none border border-rose-300 dark:border-rose-700 rounded px-2 py-1"
          />
          <button
            @click="removeMaster('potongan', idx)"
            class="text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Bank -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-university text-cyan-600 mr-1"></i>Rekening Bank Pondok
      </h3>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-3">
        Akan tampil di struk POS jika metode bayar = transfer.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Nama Bank</label
          >
          <input
            v-model="form.bank_nama"
            type="text"
            placeholder="BSI / BCA / BRI..."
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Nomor Rekening</label
          >
          <input
            v-model="form.bank_nomor"
            type="text"
            placeholder="1234567890"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label
            class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Atas Nama</label
          >
          <input
            v-model="form.bank_atasnama"
            type="text"
            placeholder="Yayasan Mambaul Ulum"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
      </div>
    </div>

    <!-- Sticky save bar -->
    <div
      class="sticky bottom-4 z-20 flex justify-end gap-2 bg-[var(--bg-card)]/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-3 border border-[var(--border-subtle)] shadow-lg"
    >
      <button
        @click="reset"
        :disabled="saving"
        class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-slate-200 transition cursor-pointer disabled:opacity-50"
      >
        <i class="fas fa-undo mr-1"></i>Reset
      </button>
      <button
        @click="simpan"
        :disabled="saving"
        class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition cursor-pointer disabled:opacity-50"
      >
        <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { useLembaga } from '@/composables/useLembaga'
import { useToast } from '@/composables/useToast'

const settingsStore = useSettingsStore()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()
const toast = useToast()

const newJenis = ref('')
const newKatMasuk = ref('')
const newKatKeluar = ref('')
const searchGuru = ref('')
const filterLembaga = ref('')
const generating = ref(false)
const saving = ref(false)
const jenisList = ref([])

const form = reactive({
  keu_jatuh_tempo: 10,
  // v.21.89.0527: Lebar kertas struk POS (dot-matrix). '9.5' = Epson LX-310 continuous form (default).
  posStrukPaper: '9.5',
  keu_jenis_tagihan: [],
  keu_bisyaroh_pagi: '',
  keu_bisyaroh_sore: '',
  keu_bisyaroh_sekolah_shift: '',
  keu_bisyaroh_pokok: {},
  keu_bisyaroh_sekolah: {},
  keu_kategori_masuk: [],
  keu_kategori_keluar: [],
  master_tunjangan: [],
  master_potongan: [],
  bank_nama: '',
  bank_nomor: '',
  bank_atasnama: ''
})

function slugId(s) {
  return (
    String(s || '')
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '') || 'jenis'
  )
}

function loadFromSettings() {
  const s = settingsStore.settings || {}
  form.keu_jatuh_tempo = s.keu_jatuh_tempo || 10
  form.posStrukPaper = s.posStrukPaper || '9.5'

  // v.21.97.0527: + nominal_per_lembaga (override per lembaga)
  const _emptyMap = () => ({})
  let arr = []
  if (Array.isArray(s.keuTagihanJenis) && s.keuTagihanJenis.length > 0) {
    arr = s.keuTagihanJenis.map((t) =>
      typeof t === 'object' && t !== null
        ? {
            id: t.id || slugId(t.label || t.nama || ''),
            label: t.label || t.nama || '',
            nominal_default: Number(t.nominal_default || t.nominal || 0) || 0,
            nominal_per_lembaga:
              t.nominal_per_lembaga && typeof t.nominal_per_lembaga === 'object'
                ? { ...t.nominal_per_lembaga }
                : _emptyMap(),
            // v.21.100.0527: whitelist lembaga + nominal per kelas
            lembaga_only: Array.isArray(t.lembaga_only) ? [...t.lembaga_only] : [],
            nominal_per_kelas:
              t.nominal_per_kelas && typeof t.nominal_per_kelas === 'object'
                ? JSON.parse(JSON.stringify(t.nominal_per_kelas))
                : _emptyMap(),
            auto_generate: !!t.auto_generate,
            _expanded: false
          }
        : {
            id: slugId(t),
            label: String(t || ''),
            nominal_default: 0,
            nominal_per_lembaga: _emptyMap(),
            lembaga_only: [],
            nominal_per_kelas: _emptyMap(),
            auto_generate: false,
            _expanded: false
          }
    )
  } else if (Array.isArray(s.keu_jenis_tagihan) && s.keu_jenis_tagihan.length > 0) {
    arr = s.keu_jenis_tagihan.map((t) => ({
      id: slugId(t),
      label: String(t || ''),
      nominal_default: 0,
      nominal_per_lembaga: _emptyMap(),
      lembaga_only: [],
      nominal_per_kelas: _emptyMap(),
      auto_generate: slugId(t) === 'syahriyah',
      _expanded: false
    }))
  } else {
    arr = [
      { id: 'syahriyah', label: 'Syahriyah', nominal_default: 0, nominal_per_lembaga: _emptyMap(), lembaga_only: [], nominal_per_kelas: _emptyMap(), auto_generate: true, _expanded: false },
      { id: 'spp_sekolah', label: 'SPP Sekolah', nominal_default: 0, nominal_per_lembaga: _emptyMap(), lembaga_only: [], nominal_per_kelas: _emptyMap(), auto_generate: false, _expanded: false },
      { id: 'kebersihan', label: 'Kebersihan', nominal_default: 0, nominal_per_lembaga: _emptyMap(), lembaga_only: [], nominal_per_kelas: _emptyMap(), auto_generate: false, _expanded: false }
    ]
  }
  if (!arr.find((t) => t.id === 'syahriyah')) {
    arr.unshift({ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0, nominal_per_lembaga: _emptyMap(), lembaga_only: [], nominal_per_kelas: _emptyMap(), auto_generate: true, _expanded: false })
  }
  jenisList.value = arr
  form.keu_jenis_tagihan = arr.map((t) => t.label)

  form.keu_bisyaroh_pagi = fmtRp(s.keu_bisyaroh_pagi || 0)
  form.keu_bisyaroh_sore = fmtRp(s.keu_bisyaroh_sore || 0)
  form.keu_bisyaroh_sekolah_shift = fmtRp(s.keu_bisyaroh_sekolah_shift || 0)
  form.keu_bisyaroh_pokok = { ...(s.keu_bisyaroh_pokok || {}) }
  form.keu_bisyaroh_sekolah = { ...(s.keu_bisyaroh_sekolah || {}) }
  for (const k of Object.keys(form.keu_bisyaroh_pokok)) {
    form.keu_bisyaroh_pokok[k] = fmtRp(form.keu_bisyaroh_pokok[k] || 0)
  }
  for (const k of Object.keys(form.keu_bisyaroh_sekolah)) {
    form.keu_bisyaroh_sekolah[k] = fmtRp(form.keu_bisyaroh_sekolah[k] || 0)
  }

  form.keu_kategori_masuk = Array.isArray(s.keu_kategori_masuk)
    ? [...s.keu_kategori_masuk]
    : ['Donasi', 'Wakaf', 'Lainnya']
  form.keu_kategori_keluar = Array.isArray(s.keu_kategori_keluar)
    ? [...s.keu_kategori_keluar]
    : ['Operasional', 'Konsumsi', 'Listrik/Air', 'Perbaikan']
  form.master_tunjangan = Array.isArray(s.master_tunjangan)
    ? s.master_tunjangan.map((t) => ({
        nama: t.nama || '',
        nominal: t.nominal || 0,
        nominalFmt: fmtRp(t.nominal || 0)
      }))
    : []
  form.master_potongan = Array.isArray(s.master_potongan)
    ? s.master_potongan.map((t) => ({
        nama: t.nama || '',
        nominal: t.nominal || 0,
        nominalFmt: fmtRp(t.nominal || 0)
      }))
    : []
  form.bank_nama = s.bank_nama || ''
  form.bank_nomor = s.bank_nomor || ''
  form.bank_atasnama = s.bank_atasnama || ''
}

onMounted(loadFromSettings)

function fmtRp(v) {
  const n = parseInt(String(v).replace(/\D/g, '')) || 0
  return n === 0 ? '' : n.toLocaleString('id-ID')
}

function parseRp(v) {
  return parseInt(String(v).replace(/\D/g, '')) || 0
}

function onFmtChange(e, key) {
  form[key] = fmtRp(e.target.value)
}

function onFmtMapChange(e, key, id) {
  form[key][id] = fmtRp(e.target.value)
}

function addJenis() {
  const s = newJenis.value.trim()
  if (!s) return
  const id = slugId(s)
  if (jenisList.value.find((t) => t.id === id || t.label === s)) {
    toast.warning('Jenis tagihan sudah ada')
    return
  }
  jenisList.value.push({ id, label: s, nominal_default: 0, nominal_per_lembaga: {}, lembaga_only: [], nominal_per_kelas: {}, auto_generate: false, _expanded: false })
  newJenis.value = ''
}

function removeJenis(idx) {
  const j = jenisList.value[idx]
  if (j?.id === 'syahriyah') {
    toast.warning('Jenis Syahriyah protected, tidak bisa dihapus')
    return
  }
  jenisList.value.splice(idx, 1)
}

// v.21.100.0527: toggle lembaga di whitelist
function toggleLembagaOnly(jenis, lembagaName) {
  if (!Array.isArray(jenis.lembaga_only)) jenis.lembaga_only = []
  const i = jenis.lembaga_only.indexOf(lembagaName)
  if (i >= 0) jenis.lembaga_only.splice(i, 1)
  else jenis.lembaga_only.push(lembagaName)
}

// v.21.100.0527: scope lembaga sesuai whitelist (jika kosong = semua)
function lembagaScope(jenis) {
  const all = lembagaRaw.value || []
  const wl = Array.isArray(jenis.lembaga_only) ? jenis.lembaga_only : []
  if (wl.length === 0) return all
  return all.filter((l) => wl.includes(l.lembaga))
}

function kelasOfLembaga(lemb) {
  if (!lemb) return []
  if (Array.isArray(lemb.kelas)) return lemb.kelas.filter(Boolean)
  if (Array.isArray(lemb.kelas_list)) return lemb.kelas_list.filter(Boolean)
  return []
}

function setNominalKelas(jenis, lembagaName, kelas, val) {
  const n = Number(val) || 0
  const cur = jenis.nominal_per_kelas && typeof jenis.nominal_per_kelas === 'object'
    ? { ...jenis.nominal_per_kelas }
    : {}
  const inner = { ...(cur[lembagaName] || {}) }
  if (n > 0) inner[kelas] = n
  else delete inner[kelas]
  if (Object.keys(inner).length > 0) cur[lembagaName] = inner
  else delete cur[lembagaName]
  jenis.nominal_per_kelas = cur
}

function addKategori(kind) {
  const ref$ = kind === 'masuk' ? newKatMasuk : newKatKeluar
  const list = kind === 'masuk' ? form.keu_kategori_masuk : form.keu_kategori_keluar
  const v = ref$.value.trim()
  if (!v) return
  if (list.includes(v)) {
    toast.warning('Kategori sudah ada')
    return
  }
  list.push(v)
  ref$.value = ''
}

function removeKategori(kind, idx) {
  ;(kind === 'masuk' ? form.keu_kategori_masuk : form.keu_kategori_keluar).splice(idx, 1)
}

function addMaster(kind) {
  ;(kind === 'tunjangan' ? form.master_tunjangan : form.master_potongan).push({
    nama: '',
    nominal: 0,
    nominalFmt: ''
  })
}

function removeMaster(kind, idx) {
  ;(kind === 'tunjangan' ? form.master_tunjangan : form.master_potongan).splice(idx, 1)
}

function onMasterFmtChange(item, e) {
  const n = parseInt(String(e.target.value).replace(/\D/g, '')) || 0
  item.nominal = n
  item.nominalFmt = n === 0 ? '' : n.toLocaleString('id-ID')
}

const lembagaOptions = computed(() =>
  (lembagaRaw.value || []).map((l) => l.lembaga).filter(Boolean)
)

const filteredGuru = computed(() => {
  let list = (guruRaw.value || []).filter(
    (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'
  )
  if (filterLembaga.value) {
    list = list.filter(
      (g) => g.lembaga === filterLembaga.value || g.lembaga_sekolah === filterLembaga.value
    )
  }
  if (searchGuru.value.trim()) {
    const kw = searchGuru.value.trim().toLowerCase()
    list = list.filter((g) =>
      String(g.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
})

async function simpan() {
  saving.value = true
  try {
    const jenis = jenisList.value
      .filter((t) => String(t.label || '').trim())
      .map((t) => {
        // v.21.97.0527: simpan nominal_per_lembaga (override per lembaga).
        const perL = {}
        if (t.nominal_per_lembaga && typeof t.nominal_per_lembaga === 'object') {
          for (const [k, v] of Object.entries(t.nominal_per_lembaga)) {
            const n = Number(v) || 0
            if (n > 0) perL[k] = n
          }
        }
        // v.21.100.0527: serialize nominal_per_kelas — buang yg 0
        const perK = {}
        if (t.nominal_per_kelas && typeof t.nominal_per_kelas === 'object') {
          for (const [lemb, kelasMap] of Object.entries(t.nominal_per_kelas)) {
            if (!kelasMap || typeof kelasMap !== 'object') continue
            const inner = {}
            for (const [kls, val] of Object.entries(kelasMap)) {
              const n = Number(val) || 0
              if (n > 0) inner[kls] = n
            }
            if (Object.keys(inner).length > 0) perK[lemb] = inner
          }
        }
        const wl = Array.isArray(t.lembaga_only)
          ? t.lembaga_only.filter((x) => String(x || '').trim())
          : []
        return {
          id: t.id || slugId(t.label),
          label: String(t.label || '').trim(),
          nominal_default: Number(t.nominal_default || 0) || 0,
          nominal_per_lembaga: perL,
          nominal_per_kelas: perK,
          lembaga_only: wl,
          auto_generate: !!t.auto_generate
        }
      })
    const payload = {
      keu_jatuh_tempo: form.keu_jatuh_tempo,
      posStrukPaper: form.posStrukPaper || '9.5',
      keuTagihanJenis: jenis,
      keu_jenis_tagihan: jenis.map((t) => t.label),
      keu_bisyaroh_pagi: parseRp(form.keu_bisyaroh_pagi),
      keu_bisyaroh_sore: parseRp(form.keu_bisyaroh_sore),
      keu_bisyaroh_sekolah_shift: parseRp(form.keu_bisyaroh_sekolah_shift),
      keu_bisyaroh_pokok: {},
      keu_bisyaroh_sekolah: {},
      keu_kategori_masuk: form.keu_kategori_masuk.filter((t) => t.trim()),
      keu_kategori_keluar: form.keu_kategori_keluar.filter((t) => t.trim()),
      master_tunjangan: form.master_tunjangan
        .filter((t) => t.nama.trim())
        .map((t) => ({ nama: t.nama.trim(), nominal: t.nominal || 0 })),
      master_potongan: form.master_potongan
        .filter((t) => t.nama.trim())
        .map((t) => ({ nama: t.nama.trim(), nominal: t.nominal || 0 })),
      bank_nama: form.bank_nama.trim(),
      bank_nomor: form.bank_nomor.trim(),
      bank_atasnama: form.bank_atasnama.trim()
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_pokok)) {
      const n = parseRp(v)
      if (n > 0) payload.keu_bisyaroh_pokok[k] = n
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_sekolah)) {
      const n = parseRp(v)
      if (n > 0) payload.keu_bisyaroh_sekolah[k] = n
    }
    await setDoc(doc(db, 'settings', 'general'), payload, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), payload, { merge: true })
    toast.success('Pengaturan keuangan tersimpan')
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

function reset() {
  loadFromSettings()
  toast.info('Form direset')
}

async function autoGenerate() {
  generating.value = true
  try {
    if (typeof window.autoGenerateSyahriyahManual === 'function') {
      await window.autoGenerateSyahriyahManual()
      toast.success('Auto-generate selesai')
    } else {
      toast.warning(
        'Fitur auto-generate akan migrate di batch berikutnya. Gunakan menu Tagihan untuk generate manual.'
      )
    }
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    generating.value = false
  }
}
</script>
