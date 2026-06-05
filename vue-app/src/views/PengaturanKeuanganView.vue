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

      <!-- v.94.0626: Generate Tagihan Khusus (infaq/iuran sekali-jalan, target fleksibel) -->
      <div class="mt-3">
        <label
          class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
        >
          Tagihan Khusus (Infaq / Iuran — sekali jalan)
        </label>
        <button
          @click="openGenKhusus"
          class="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer"
        >
          <i class="fas fa-plus-circle"></i>Generate Tagihan Khusus
        </button>
        <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
          <i class="fas fa-info-circle mr-1"></i>Untuk infaq pembangunan, infaq kegiatan,
          dsb. Tidak menyentuh Syahriyah &amp; bisa ditarget per lembaga/kelas/santri.
          Tagihan yang sudah ada (santri + kategori + periode sama) otomatis di-skip.
        </p>
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
          Epson LX-310 atau thermal. Cetak langsung (silent) tersedia di aplikasi Desktop (Windows).
        </p>
        <!-- v.94.0626: buka Pengaturan Printer (deteksi printer terhubung Windows) -->
        <button
          type="button"
          @click="bukaPengaturanPrinter"
          class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg hover:bg-teal-100"
        >
          <i class="fas fa-print"></i>Pengaturan Printer (Desktop)
        </button>
      </div>

      <!-- v.95.0626: penyetelan struk dot-matrix ESC/P — atur sendiri tanpa rebuild -->
      <div v-if="form.posStrukPaper === '9.5'" class="mt-3 p-3 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)]">
        <div class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2">Penyetelan Struk Dot-matrix (ESC/P)</div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[10px] text-[var(--text-secondary)] block mb-1">Ukuran font</label>
            <select v-model.number="form.posStrukCpi" class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]">
              <option :value="10">10 cpi (paling besar)</option>
              <option :value="12">12 cpi</option>
              <option :value="15">15 cpi (kecil)</option>
              <option :value="17">17 cpi (sangat kecil)</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] text-[var(--text-secondary)] block mb-1">Tinggi slip (baris) = cm × 3,15</label>
            <input v-model.number="form.posStrukFormLines" type="number" min="6" max="127" class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]" />
          </div>
          <div>
            <label class="text-[10px] text-[var(--text-secondary)] block mb-1">Geser ke kanan (kolom)</label>
            <input v-model.number="form.posStrukLeftCols" type="number" min="0" max="40" class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]" />
          </div>
          <div>
            <label class="text-[10px] text-[var(--text-secondary)] block mb-1">Margin atas (baris)</label>
            <input v-model.number="form.posStrukTopLines" type="number" min="0" max="12" class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]" />
          </div>
        </div>
        <p class="text-[10px] text-[var(--text-secondary)] mt-2 italic">
          <i class="fas fa-info-circle mr-1"></i>Atur lalu <b>Simpan</b> — langsung berlaku tanpa rebuild. Spasi baris 8 LPI (rapat, muat slip pendek). <b>cpi 10</b> = teks paling besar &amp; mengisi lebar ~210mm (default); pilih 12/15 kalau kelebaran. <b>Tinggi slip (baris) = tinggi kertas (cm) × 3,15</b> — mis. 12cm→38, 13cm→41, 14cm→44. <b>Margin atas 0</b> (printer dot-matrix biasanya sudah ada whitespace atas ~5cm). Geser kanan utk center. Kalau bawah <b>kepotong</b>: kecilkan Tinggi slip atau pilih cpi 12.
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

    <!-- v.94.0626: Modal Generate Tagihan Khusus (infaq/iuran, target fleksibel) -->
    <div
      v-if="genOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="genOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-black">
            <i class="fas fa-plus-circle text-emerald-500 mr-1"></i>Generate Tagihan Khusus
          </h3>
          <button
            @click="genOpen = false"
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Jenis / kategori -->
        <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
          Jenis Tagihan
        </label>
        <select
          v-model="genJenisId"
          @change="onGenPickJenis"
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-2"
        >
          <option value="">— Ketik manual —</option>
          <option v-for="j in jenisList" :key="j.id" :value="j.id">{{ j.label }}</option>
        </select>
        <input
          v-model="genKategori"
          type="text"
          placeholder="Kategori (mis. Infaq Pembangunan)"
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-2"
        />

        <!-- Nominal + jatuh tempo -->
        <div class="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
              Nominal (Rp)
            </label>
            <input
              :value="genNominalFmt"
              @input="onGenNominal"
              type="text"
              inputmode="numeric"
              placeholder="0"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] text-right font-bold"
            />
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
              Jatuh Tempo
            </label>
            <input
              v-model="genJatuhTempo"
              type="date"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            />
          </div>
        </div>

        <!-- Periode / label -->
        <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
          Periode / Label
        </label>
        <input
          v-model="genPeriode"
          type="text"
          placeholder="mis. Juni 2026 / Tahap 1"
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1"
        />
        <label
          v-if="genJenisId"
          class="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-secondary)] mb-3 cursor-pointer"
        >
          <input v-model="genPakaiNominalJenis" type="checkbox" class="w-3.5 h-3.5 accent-emerald-600" />
          Pakai nominal per lembaga/kelas dari pengaturan jenis (kalau ada)
        </label>

        <!-- Target scope -->
        <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
          Target Santri
        </label>
        <div class="flex gap-1 mb-2 text-xs font-bold">
          <button
            type="button"
            @click="genScope = 'all'"
            :class="['flex-1 py-1.5 rounded-lg border transition', genScope === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-[var(--border-default)] text-[var(--text-secondary)]']"
          >
            Semua aktif
          </button>
          <button
            type="button"
            @click="genScope = 'lembaga'"
            :class="['flex-1 py-1.5 rounded-lg border transition', genScope === 'lembaga' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-[var(--border-default)] text-[var(--text-secondary)]']"
          >
            Lembaga/Kelas
          </button>
          <button
            type="button"
            @click="genScope = 'santri'"
            :class="['flex-1 py-1.5 rounded-lg border transition', genScope === 'santri' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-[var(--border-default)] text-[var(--text-secondary)]']"
          >
            Pilih santri
          </button>
        </div>

        <!-- Picker lembaga + kelas -->
        <div v-if="genScope === 'lembaga'" class="mb-2 space-y-2">
          <div>
            <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
              Lembaga (kosong = semua lembaga):
            </p>
            <div class="flex flex-wrap gap-1.5">
              <label
                v-for="lm in genLembagaList"
                :key="`genlm_${lm}`"
                class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
              >
                <input
                  type="checkbox"
                  :checked="genLembagaSel.includes(lm)"
                  @change="toggleGenLembaga(lm)"
                  class="w-3 h-3 accent-emerald-600"
                />{{ lm }}
              </label>
            </div>
          </div>
          <div v-if="genKelasList.length">
            <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
              Kelas (kosong = semua kelas di lembaga terpilih):
            </p>
            <div class="flex flex-wrap gap-1.5">
              <label
                v-for="kl in genKelasList"
                :key="`genkl_${kl}`"
                class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
              >
                <input
                  type="checkbox"
                  :checked="genKelasSel.includes(kl)"
                  @change="toggleGenKelas(kl)"
                  class="w-3 h-3 accent-emerald-600"
                />{{ kl }}
              </label>
            </div>
          </div>
        </div>

        <!-- Picker santri individual -->
        <div v-if="genScope === 'santri'" class="mb-2">
          <input
            v-model="genSantriSearch"
            type="text"
            placeholder="Cari nama / NIS..."
            class="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1"
          />
          <div
            class="max-h-44 overflow-y-auto border border-[var(--border-subtle)] rounded-lg divide-y divide-[var(--border-subtle)]"
          >
            <label
              v-for="s in genSantriFiltered"
              :key="`gens_${s.id}`"
              class="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer hover:bg-[var(--bg-muted)]"
            >
              <input
                type="checkbox"
                :checked="genSantriSel.includes(String(s.id))"
                @change="toggleGenSantri(s.id)"
                class="w-3.5 h-3.5 accent-emerald-600 flex-shrink-0"
              />
              <span class="font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</span>
              <span class="text-[10px] text-[var(--text-secondary)] whitespace-nowrap">
                {{ s.lembaga || s.lembaga_sekolah || '' }} {{ s.kelas || s.kelas_sekolah || '' }}
              </span>
            </label>
            <p
              v-if="genSantriFiltered.length === 0"
              class="text-[10px] text-[var(--text-tertiary)] italic text-center py-2"
            >
              Tidak ada santri.
            </p>
          </div>
          <p class="text-[10px] text-emerald-600 mt-1">{{ genSantriSel.length }} santri dipilih</p>
        </div>

        <!-- Preview + actions -->
        <div
          class="mt-2 mb-3 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-lg px-3 py-2"
        >
          <i class="fas fa-users mr-1"></i>Akan dibuat untuk <b>{{ genTargetCount }}</b> santri aktif.
        </div>
        <div class="flex gap-2">
          <button
            @click="genOpen = false"
            class="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)] font-bold rounded-xl text-sm"
          >
            Batal
          </button>
          <button
            @click="doGenKhusus"
            :disabled="genBusy || genTargetCount === 0"
            class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm"
          >
            {{ genBusy ? 'Generating...' : 'Generate' }}
          </button>
        </div>
      </div>
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

// v.94.0626: buka modal Pengaturan Printer (deteksi printer Windows). PrinterSettingsModal global dengar event ini.
function bukaPengaturanPrinter() {
  try {
    window.dispatchEvent(new CustomEvent('ammu:open-printer-settings'))
  } catch (e) {
    /* ignore */
  }
}

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
  // v.95.0626: penyetelan struk ESC/P dot-matrix (bisa diatur sendiri tanpa rebuild)
  posStrukCpi: 15,
  posStrukFormLines: 30,
  posStrukLeftCols: 6,
  posStrukTopLines: 2,
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
  form.posStrukCpi = Number(s.posStrukCpi) || 15
  form.posStrukFormLines = Number(s.posStrukFormLines) || 30
  form.posStrukLeftCols = s.posStrukLeftCols != null ? Number(s.posStrukLeftCols) : 6
  form.posStrukTopLines = s.posStrukTopLines != null ? Number(s.posStrukTopLines) : 2

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
      posStrukCpi: Number(form.posStrukCpi) || 15,
      posStrukFormLines: Number(form.posStrukFormLines) || 30,
      posStrukLeftCols: Number(form.posStrukLeftCols) || 0,
      posStrukTopLines: Number(form.posStrukTopLines) || 0,
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

// v.21.104.0527: implementasi Vue (gantikan legacy window.autoGenerateSyahriyahManual).
// Generate tagihan utk jenis ber-auto_generate=true (default: Syahriyah)
// utk semua santri aktif, nominal pakai 3-lapis lookup
// (nominal_per_kelas → nominal_per_lembaga → nominal_default).
async function autoGenerate() {
  if (generating.value) return
  if (!confirm('Generate tagihan otomatis bulan ini untuk semua santri aktif?\n\nJenis ber-flag auto_generate akan di-create. Tagihan duplikat (periode sama) akan di-skip.')) return
  generating.value = true
  try {
    const { collection, getDocs, setDoc, doc, serverTimestamp } = await import('firebase/firestore')
    const { db } = await import('@/services/firebase')
    const jenisAuto = (jenisList.value || []).filter((j) => j.auto_generate && String(j.label || '').trim())
    if (jenisAuto.length === 0) {
      toast.warning('Tidak ada jenis tagihan dengan flag auto_generate.')
      generating.value = false
      return
    }
    // Fetch santri aktif
    const sSnap = await getDocs(collection(db, 'santri'))
    const santriAktif = sSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((x) => x.aktif !== false)
    // Fetch tagihan existing utk skip duplikat
    const tSnap = await getDocs(collection(db, 'keuangan_tagihan'))
    const existing = new Set()
    for (const d of tSnap.docs) {
      const t = d.data()
      const key = `${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`
      existing.add(key)
    }
    const now = new Date()
    const BULAN_NM = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    const periode = `${BULAN_NM[now.getMonth()]} ${now.getFullYear()}`
    const jt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
    let created = 0, skipped = 0, errCount = 0
    for (const j of jenisAuto) {
      const wl = Array.isArray(j.lembaga_only) ? j.lembaga_only.filter(Boolean) : []
      for (const sx of santriAktif) {
        // whitelist gating
        if (wl.length > 0) {
          if (!(wl.includes(sx.lembaga) || wl.includes(sx.lembaga_sekolah))) continue
        }
        const dupKey = `${String(sx.id)}__${(j.label || '').toLowerCase()}__${periode}`
        if (existing.has(dupKey)) { skipped++; continue }
        // 3-lapis lookup
        let nominal = 0
        const perK = j.nominal_per_kelas || {}
        for (const [lemb, ks] of [[sx.lembaga, sx.kelas], [sx.lembaga_sekolah, sx.kelas_sekolah]]) {
          if (!lemb) continue
          const inner = perK[lemb] || {}
          const v = Number(inner[ks] || 0)
          if (v > 0) { nominal = v; break }
        }
        if (nominal === 0) {
          const perL = j.nominal_per_lembaga || {}
          nominal = Number(perL[sx.lembaga] || perL[sx.lembaga_sekolah] || 0) || Number(j.nominal_default || 0)
        }
        if (nominal <= 0) { skipped++; continue }
        try {
          const id = `tagihan_${sx.id}_${j.id}_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
          await setDoc(doc(db, 'keuangan_tagihan', id), {
            id,
            santri_id: String(sx.id),
            santri_nama: sx.nama || '',
            kategori: j.label || j.id || 'Tagihan',
            periode,
            nominal,
            bayar: 0,
            status: 'belum',
            jatuh_tempo: jt,
            sumber: 'auto_generate',
            created_at: serverTimestamp()
          })
          created++
        } catch (e) {
          errCount++
          console.warn('[autoGenerate]', sx.nama, e.message)
        }
      }
    }
    toast.success(`Auto-generate: ${created} dibuat, ${skipped} skip${errCount ? `, ${errCount} gagal` : ''}`)
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    generating.value = false
  }
}

// ============================================================================
// v.94.0626: Generate Tagihan Khusus — infaq/iuran SEKALI-JALAN, target fleksibel
//   (semua santri aktif / per lembaga+kelas / pilih santri tertentu).
//   - TIDAK menyentuh Syahriyah & tidak butuh flag auto_generate (tombol terpisah).
//   - Dedup-safe: skip kalau tagihan santri+kategori+periode sudah ada (lunas/belum).
//   - Tulis ke koleksi keuangan_tagihan (santri_id + created_at) → otomatis muncul
//     real-time di akun santri/wali (TagihanView) + notif "Tagihan baru"
//     (useNotifications), tanpa kerja tambahan.
// ============================================================================
const genOpen = ref(false)
const genBusy = ref(false)
const genJenisId = ref('')
const genKategori = ref('')
const genNominal = ref(0)
const genNominalFmt = ref('')
const genPakaiNominalJenis = ref(false)
const genPeriode = ref('')
const genJatuhTempo = ref('')
const genScope = ref('all') // 'all' | 'lembaga' | 'santri'
const genLembagaSel = ref([])
const genKelasSel = ref([])
const genSantriSel = ref([])
const genSantriSearch = ref('')
const genSantriAktif = ref([])

const _GEN_BULAN_NM = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

async function openGenKhusus() {
  // reset state tiap buka
  genJenisId.value = ''
  genKategori.value = ''
  genNominal.value = 0
  genNominalFmt.value = ''
  genPakaiNominalJenis.value = false
  genScope.value = 'all'
  genLembagaSel.value = []
  genKelasSel.value = []
  genSantriSel.value = []
  genSantriSearch.value = ''
  const now = new Date()
  genPeriode.value = `${_GEN_BULAN_NM[now.getMonth()]} ${now.getFullYear()}`
  genJatuhTempo.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
  genOpen.value = true
  // muat santri aktif sekali (untuk preview & picker individual)
  try {
    const { collection, getDocs } = await import('firebase/firestore')
    const snap = await getDocs(collection(db, 'santri'))
    genSantriAktif.value = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((x) => x.aktif !== false)
  } catch (e) {
    toast.error('Gagal memuat data santri: ' + (e.message || e))
  }
}

function onGenPickJenis() {
  const j = jenisList.value.find((x) => x.id === genJenisId.value)
  if (j) {
    genKategori.value = j.label || ''
    if (Number(j.nominal_default) > 0) {
      genNominal.value = Number(j.nominal_default)
      genNominalFmt.value = fmtRp(j.nominal_default)
    }
  }
}

function onGenNominal(e) {
  const n = parseRp(e.target.value)
  genNominal.value = n
  genNominalFmt.value = fmtRp(n)
}

const genLembagaList = computed(() =>
  (lembagaRaw.value || []).map((l) => l.lembaga).filter(Boolean)
)

const genKelasList = computed(() => {
  const sel = genLembagaSel.value
  const src = (lembagaRaw.value || []).filter((l) => sel.length === 0 || sel.includes(l.lembaga))
  const set = new Set()
  for (const l of src) {
    const ks = Array.isArray(l.kelas) ? l.kelas : Array.isArray(l.kelas_list) ? l.kelas_list : []
    for (const k of ks) if (k) set.add(String(k))
  }
  // fallback: kalau master lembaga tak punya daftar kelas, ambil dari data santri
  if (set.size === 0) {
    for (const s of genSantriAktif.value) {
      if (sel.length === 0 || sel.includes(s.lembaga) || sel.includes(s.lembaga_sekolah)) {
        if (s.kelas) set.add(String(s.kelas))
        if (s.kelas_sekolah) set.add(String(s.kelas_sekolah))
      }
    }
  }
  return [...set].sort()
})

function toggleGenLembaga(lm) {
  const i = genLembagaSel.value.indexOf(lm)
  if (i >= 0) genLembagaSel.value.splice(i, 1)
  else genLembagaSel.value.push(lm)
  // buang kelas yang tak lagi valid setelah ubah lembaga
  genKelasSel.value = genKelasSel.value.filter((k) => genKelasList.value.includes(k))
}
function toggleGenKelas(kl) {
  const i = genKelasSel.value.indexOf(kl)
  if (i >= 0) genKelasSel.value.splice(i, 1)
  else genKelasSel.value.push(kl)
}
function toggleGenSantri(id) {
  const sid = String(id)
  const i = genSantriSel.value.indexOf(sid)
  if (i >= 0) genSantriSel.value.splice(i, 1)
  else genSantriSel.value.push(sid)
}

const genSantriFiltered = computed(() => {
  const kw = genSantriSearch.value.trim().toLowerCase()
  let list = genSantriAktif.value
  if (kw) {
    list = list.filter(
      (s) =>
        String(s.nama || '').toLowerCase().includes(kw) ||
        String(s.nis || '').toLowerCase().includes(kw)
    )
  }
  return [...list]
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
    .slice(0, 300)
})

// santri target sesuai scope (dipakai preview + generate)
const genTargetSantri = computed(() => {
  const all = genSantriAktif.value
  if (genScope.value === 'all') return all
  if (genScope.value === 'santri') {
    const sel = new Set(genSantriSel.value.map(String))
    return all.filter((s) => sel.has(String(s.id)))
  }
  // lembaga/kelas
  const lsel = genLembagaSel.value
  const ksel = genKelasSel.value
  return all.filter((s) => {
    const lembagaOk =
      lsel.length === 0 || lsel.includes(s.lembaga) || lsel.includes(s.lembaga_sekolah)
    if (!lembagaOk) return false
    if (ksel.length === 0) return true
    return ksel.includes(String(s.kelas)) || ksel.includes(String(s.kelas_sekolah))
  })
})
const genTargetCount = computed(() => genTargetSantri.value.length)

// nominal per santri (flat, atau ikut pengaturan jenis bila diminta)
function _genNominalUntuk(sx) {
  if (genPakaiNominalJenis.value && genJenisId.value) {
    const j = jenisList.value.find((x) => x.id === genJenisId.value)
    if (j) {
      const perK = j.nominal_per_kelas || {}
      for (const [lemb, ks] of [
        [sx.lembaga, sx.kelas],
        [sx.lembaga_sekolah, sx.kelas_sekolah]
      ]) {
        if (!lemb) continue
        const inner = perK[lemb] || {}
        const v = Number(inner[ks] || 0)
        if (v > 0) return v
      }
      const perL = j.nominal_per_lembaga || {}
      const vl = Number(perL[sx.lembaga] || perL[sx.lembaga_sekolah] || 0)
      if (vl > 0) return vl
    }
  }
  return Number(genNominal.value || 0)
}

async function doGenKhusus() {
  if (genBusy.value) return
  const kategori = String(genKategori.value || '').trim()
  if (!kategori) {
    toast.warning('Isi kategori tagihan dulu.')
    return
  }
  const periode = String(genPeriode.value || '').trim()
  if (!periode) {
    toast.warning('Isi periode/label dulu.')
    return
  }
  const targets = genTargetSantri.value
  if (targets.length === 0) {
    toast.warning('Tidak ada santri target.')
    return
  }
  if (!genPakaiNominalJenis.value && Number(genNominal.value || 0) <= 0) {
    toast.warning('Nominal harus lebih dari 0.')
    return
  }
  if (
    !confirm(
      `Generate tagihan "${kategori}" (${periode}) untuk ${targets.length} santri?\n\nTagihan yang sudah ada (santri + kategori + periode sama) akan di-skip.`
    )
  )
    return
  genBusy.value = true
  try {
    const { collection, getDocs, setDoc, doc, serverTimestamp } = await import('firebase/firestore')
    // dedup: kumpulkan tagihan existing (santri+kategori+periode)
    const tSnap = await getDocs(collection(db, 'keuangan_tagihan'))
    const existing = new Set()
    for (const d of tSnap.docs) {
      const t = d.data()
      existing.add(`${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`)
    }
    const katLower = kategori.toLowerCase()
    const katSlug = slugId(kategori)
    const perSlug = slugId(periode)
    let created = 0,
      skipped = 0,
      errCount = 0
    for (const sx of targets) {
      const dupKey = `${String(sx.id)}__${katLower}__${periode}`
      if (existing.has(dupKey)) {
        skipped++
        continue
      }
      const nominal = _genNominalUntuk(sx)
      if (nominal <= 0) {
        skipped++
        continue
      }
      try {
        const id = `tagihan_${sx.id}_${katSlug}_${perSlug}`
        await setDoc(doc(db, 'keuangan_tagihan', id), {
          id,
          santri_id: String(sx.id),
          santri_nama: sx.nama || '',
          kategori,
          periode,
          nominal,
          bayar: 0,
          status: 'belum',
          jatuh_tempo: genJatuhTempo.value || '',
          sumber: 'generate_khusus',
          created_at: serverTimestamp()
        })
        created++
      } catch (e) {
        errCount++
        console.warn('[genKhusus]', sx.nama, e.message)
      }
    }
    toast.success(`Selesai: ${created} dibuat, ${skipped} skip${errCount ? `, ${errCount} gagal` : ''}`)
    if (created > 0) genOpen.value = false
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    genBusy.value = false
  }
}
</script>
