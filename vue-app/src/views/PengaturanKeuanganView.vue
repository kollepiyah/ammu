<template>
  <div class="p-4 md:p-6 max-w-5xl mx-auto space-y-4 page-narrow">
    <!-- Header -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-5 md:p-6 border border-[var(--border-subtle)] shadow-sm"
    >
      <h2 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-sliders-h text-cyan-600 mr-2"></i>{{ sectionMeta.t }}
      </h2>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        {{ sectionMeta.s }}
      </p>
    </div>

    <!-- v.110.0626: Tab navigasi — pecah 7 area jadi 5 tab, tampil 1 per tab (anti-bingung). -->
    <div class="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-0.5">
      <button
        v-for="tb in TABS"
        :key="tb.id"
        type="button"
        @click="setTab(tb.id)"
        :class="[
          'shrink-0 h-9 px-3.5 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold transition',
          activeTab === tb.id
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-card-elevated)]'
        ]"
      >
        <i :class="['fas', tb.icon]"></i>{{ tb.t }}
      </button>
    </div>

    <!-- Pembayaran & Jatuh Tempo (T14: section-aware — tagihan/struk vs syahriyah) -->
    <div
      v-show="secVisible('tagihan') || secVisible('syahriyah')"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div v-show="secVisible('tagihan')">
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
        >
          <i class="fas fa-calendar-day text-teal-600 mr-1"></i>Pembayaran &amp; Jatuh Tempo
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
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
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
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

        <!-- v.95.0626: kill-switch cron server auto-generate (tombol manual di atas TETAP berfungsi) -->
        <div
          class="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700"
        >
          <input
            id="autoGenCron"
            v-model="form.keu_auto_generate_cron"
            type="checkbox"
            class="mt-0.5 w-4 h-4 accent-teal-600"
          />
          <label
            for="autoGenCron"
            class="text-[11px] text-[var(--text-secondary)] leading-snug cursor-pointer"
          >
            <span class="font-bold text-[var(--text-primary)]"
              >Auto-generate otomatis tiap bulan (server)</span
            >
            — sistem membuat tagihan bulan berjalan secara otomatis untuk jenis ber-flag
            <em>auto_generate</em> (jatuh tempo ikut setelan di atas). Aman dari duplikat. Matikan
            kalau ingin generate manual saja; tombol "Generate Bulan Ini" tetap bisa dipakai kapan
            pun untuk uji coba.
          </label>
        </div>

        <!-- v.94.0626: Generate Tagihan Khusus (infaq/iuran sekali-jalan, target fleksibel) -->
        <div class="mt-3">
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Tagihan Khusus (Infaq / Iuran — sekali jalan)
          </label>
          <button
            @click="openGenKhusus"
            class="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer"
          >
            <i class="fas fa-plus-circle"></i>Generate Tagihan Khusus
          </button>
          <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
            <i class="fas fa-info-circle mr-1"></i>Untuk infaq pembangunan, infaq kegiatan, dsb.
            Tidak menyentuh Syahriyah &amp; bisa ditarget per lembaga/kelas/santri. Tagihan yang
            sudah ada (santri + kategori + periode sama) otomatis di-skip.
          </p>
        </div>

        <!-- v.21.89.0527: Lebar kertas struk POS (dot-matrix) -->
        <div class="mt-4">
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
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
            <i class="fas fa-info-circle mr-1"></i>Untuk cetak struk POS ke printer dot-matrix Epson
            LX-310 atau thermal. Cetak langsung (silent) tersedia di aplikasi Desktop (Windows).
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
        <div
          v-if="form.posStrukPaper === '9.5'"
          class="mt-3 p-3 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--border-default)]"
        >
          <div class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2">
            Penyetelan Struk Cetak (Grafis ESC/P)
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label class="text-[10px] text-[var(--text-secondary)] block mb-1"
                >Lebar slip (mm)</label
              >
              <input
                v-model.number="form.posStrukSlipW"
                type="number"
                min="120"
                max="260"
                class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label class="text-[10px] text-[var(--text-secondary)] block mb-1"
                >Tinggi slip (mm)</label
              >
              <input
                v-model.number="form.posStrukSlipH"
                type="number"
                min="60"
                max="230"
                class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label class="text-[10px] text-[var(--text-secondary)] block mb-1"
                >Margin atas (mm)</label
              >
              <input
                v-model.number="form.posStrukTopMm"
                type="number"
                min="0"
                max="140"
                class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label class="text-[10px] text-[var(--text-secondary)] block mb-1"
                >Geser kanan (mm)</label
              >
              <input
                v-model.number="form.posStrukLeftMm"
                type="number"
                min="0"
                max="80"
                class="w-full px-2 py-1.5 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
              />
            </div>
          </div>
          <p class="text-[10px] text-[var(--text-secondary)] mt-2 italic">
            <i class="fas fa-info-circle mr-1"></i>Struk dicetak
            <b>grafis langsung ke printer (ESC/P)</b> — tajam &amp; tanpa feed kosong. Lebar maks
            cetak ~8 inci (200mm). Untuk <b>center</b>: kecilkan <b>Lebar slip</b> (mis. 185) lalu
            naikkan <b>Geser kanan</b> (mis. 15–18) sampai konten di tengah. <b>Margin atas</b> =
            jarak dari tepi atas (0 = paling atas). <b>Tinggi slip</b> = tinggi fisik slip (mis.
            140) agar tiap cetak maju tepat 1 slip.
          </p>
        </div>
      </div>
      <!-- /blok tagihan -->

      <div v-show="secVisible('syahriyah')" class="mt-4">
        <h4
          class="font-black text-slate-700 dark:text-[var(--text-tertiary)] text-[11px] uppercase tracking-wider mb-2"
        >
          Daftar Jenis Pembayaran (label + nominal default — match legacy)
        </h4>
        <p class="text-[10px] text-[var(--text-secondary)] mb-2 italic">
          <i class="fas fa-info-circle mr-1"></i>Nominal default akan auto-isi di ModalPOS saat klik
          preset jenis. Set 0 kalau nominal variabel.
        </p>
        <!-- v.110: template + impor jenis pembayaran (TU isi, admin tinggal impor) -->
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            @click="unduhTemplateJenis"
            type="button"
            class="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
          >
            <i class="fas fa-download"></i>Unduh Template
          </button>
          <label
            class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer"
          >
            <i class="fas fa-file-import"></i>{{ imporJenisBusy ? 'Mengimpor…' : 'Impor' }}
            <input
              type="file"
              accept=".xlsx,.xls"
              class="hidden"
              @change="imporJenis"
              :disabled="imporJenisBusy"
            />
          </label>
        </div>
        <!-- v.1.1.x: model tabel (gaya Braja Soft) + tombol Tambah/Ubah/Hapus + dialog -->
        <div class="flex justify-end mb-2">
          <button
            @click="openJenisBaru"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-plus"></i>Tambah Jenis
          </button>
        </div>
        <div
          class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto"
        >
          <table class="w-full text-sm min-w-[660px]">
            <thead>
              <tr
                class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
              >
                <th class="text-left px-3 py-2.5 font-black w-10">No</th>
                <th class="text-left px-3 py-2.5 font-black">Nama Jenis</th>
                <th class="text-left px-3 py-2.5 font-black">Pos Dana</th>
                <th class="text-right px-3 py-2.5 font-black">Nominal Default</th>
                <th class="text-left px-3 py-2.5 font-black">Penagihan</th>
                <th class="text-left px-3 py-2.5 font-black">Tarif Khusus</th>
                <th class="text-center px-3 py-2.5 font-black w-20">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-subtle)]">
              <tr
                v-for="(jenis, idx) in jenisList"
                :key="jenis.id || idx"
                class="hover:bg-[var(--bg-card-elevated)] transition"
              >
                <td class="px-3 py-2 text-[var(--text-tertiary)]">{{ idx + 1 }}</td>
                <td class="px-3 py-2 font-bold text-[var(--text-primary)]">{{ jenis.label }}</td>
                <td class="px-3 py-2 text-[var(--text-secondary)] text-xs">
                  {{ posLabel(jenis.pos) }}
                </td>
                <td class="px-3 py-2 text-right font-bold text-[var(--text-primary)]">
                  <span v-if="Number(jenis.nominal_default) > 0"
                    >Rp {{ Number(jenis.nominal_default).toLocaleString('id-ID') }}</span
                  >
                  <span v-else class="text-[var(--text-tertiary)] font-normal italic"
                    >variabel</span
                  >
                </td>
                <td class="px-3 py-2">
                  <span
                    :class="[
                      'text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap',
                      frekMeta(jenis.frekuensi).cls
                    ]"
                    >{{ frekMeta(jenis.frekuensi).label }}</span
                  >
                </td>
                <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                  <span v-if="tarifKhususInfo(jenis)">{{ tarifKhususInfo(jenis) }}</span>
                  <span v-else class="text-[var(--text-tertiary)]">—</span>
                </td>
                <td class="px-3 py-2">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      @click="openJenisDialog(jenis)"
                      class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                      title="Ubah"
                    >
                      <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button
                      @click="removeJenis(idx)"
                      :disabled="jenis.id === 'syahriyah'"
                      :title="jenis.id === 'syahriyah' ? 'Jenis dasar — tak bisa dihapus' : 'Hapus'"
                      class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="jenisList.length === 0">
                <td colspan="7" class="text-center text-[var(--text-tertiary)] italic py-4">
                  Belum ada jenis pembayaran. Klik "Tambah Jenis".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Bisyaroh -->
    <div
      v-show="secVisible('bisyaroh')"
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
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh per Shift Pagi (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_pagi"
            @input="onFmtChange($event, 'keu_bisyaroh_pagi')"
            type="text"
            inputmode="numeric"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh per Shift Sore (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_sore"
            @input="onFmtChange($event, 'keu_bisyaroh_sore')"
            type="text"
            inputmode="numeric"
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
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <!-- v.99: bonus kehadiran khusus PEGAWAI (tarif beda dari guru) — pisah pagi & sore -->
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh per Shift Pegawai — Pagi (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_pegawai_pagi"
            @input="onFmtChange($event, 'keu_bisyaroh_pegawai_pagi')"
            type="text"
            inputmode="numeric"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh per Shift Pegawai — Sore (otomatis dari absensi)
          </label>
          <input
            v-model="form.keu_bisyaroh_pegawai_sore"
            @input="onFmtChange($event, 'keu_bisyaroh_pegawai_sore')"
            type="text"
            inputmode="numeric"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
        </div>
        <!-- v.111: bisyaroh Tes Glondongan PTPT — per juz disimak (rekap di layar Glondongan) -->
        <div class="md:col-span-2">
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Bisyaroh Glondongan PTPT — per Juz Disimak
          </label>
          <input
            v-model="form.keu_glondongan_per_juz"
            @input="onFmtChange($event, 'keu_glondongan_per_juz')"
            type="text"
            inputmode="numeric"
            placeholder="mis. 5.000"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          />
          <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
            Tarif per juz yang disimak penguji glondongan/berjalan. Rekap per guru/bulan ada di
            layar Glondongan PTPT (admin).
          </p>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-start mb-2 gap-2">
          <h4
            class="font-black text-slate-700 dark:text-[var(--text-tertiary)] text-[11px] uppercase tracking-wider"
          >
            Bisyaroh Pokok Per Guru/Pegawai (Flat Bulanan)
          </h4>
          <!-- v.110: template + impor bisyaroh pegawai (TU isi, admin tinggal impor) -->
          <div class="flex gap-1.5 flex-shrink-0">
            <button
              @click="unduhTemplateBisyaroh"
              type="button"
              class="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 whitespace-nowrap"
            >
              <i class="fas fa-download"></i>Template
            </button>
            <label
              class="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer whitespace-nowrap"
            >
              <i class="fas fa-file-import"></i>{{ imporBisyarohBusy ? 'Impor…' : 'Impor' }}
              <input
                type="file"
                accept=".xlsx,.xls"
                class="hidden"
                @change="imporBisyaroh"
                :disabled="imporBisyarohBusy"
              />
            </label>
          </div>
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
              title="Pokok Pondok"
              class="px-2 py-1.5 text-xs text-right font-bold border border-[var(--border-default)] rounded bg-white dark:bg-slate-900 text-[var(--text-primary)]"
            />
            <input
              v-model="form.keu_bisyaroh_sekolah[g.id]"
              @input="onFmtMapChange($event, 'keu_bisyaroh_sekolah', g.id)"
              type="text"
              inputmode="numeric"
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
      v-show="activeTab === 'kategori'"
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

      <!-- Kategori Tabungan (dipakai di menu Tabungan → Input Mutasi) -->
      <div class="mt-5 pt-4 border-t border-[var(--border-subtle)]">
        <h4 class="font-black text-[var(--text-primary)] text-[11px] uppercase tracking-wider mb-1">
          <i class="fas fa-wallet text-teal-600 mr-1"></i>Kategori Tabungan
        </h4>
        <p class="text-[10px] text-[var(--text-secondary)] italic mb-2">
          Muncul di menu Tabungan → Input Mutasi (dropdown Kategori). Nominal default opsional
          (auto-isi saat kategori dipilih).
        </p>
        <div class="space-y-1.5 mb-2">
          <div
            v-for="(kat, idx) in form.keu_tabungan_kategori"
            :key="idx"
            class="grid grid-cols-[1fr_7rem_auto] gap-2 items-center bg-slate-50 dark:bg-slate-700/30 px-3 py-2 rounded-lg"
          >
            <input
              v-model="kat.label"
              type="text"
              placeholder="Nama kategori"
              class="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none border-b border-[var(--border-default)] pb-1"
            />
            <input
              v-model.number="kat.nominal_default"
              type="number"
              min="0"
              placeholder="0"
              title="Nominal default (opsional)"
              class="text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-default)] rounded px-2 py-1 text-right outline-none"
            />
            <button
              @click="removeTabunganKat(idx)"
              class="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 rounded text-xs"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newKatTabungan"
            @keyup.enter="addTabunganKat"
            type="text"
            placeholder="Tambah kategori tabungan…"
            class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
          <button
            @click="addTabunganKat"
            class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-2 rounded-lg text-xs"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Master Tunjangan -->
    <div
      v-show="secVisible('bisyaroh')"
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
          class="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg space-y-1.5"
        >
          <div class="grid grid-cols-[1fr_120px_30px_30px] gap-2 items-center">
            <input
              v-model="item.nama"
              type="text"
              class="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
            />
            <input
              v-model="item.nominalFmt"
              @input="onMasterFmtChange(item, $event)"
              type="text"
              inputmode="numeric"
              class="bg-transparent text-xs text-right font-bold text-emerald-800 dark:text-emerald-200 outline-none border border-emerald-300 dark:border-emerald-700 rounded px-2 py-1"
            />
            <button
              @click="item._guruExpanded = !item._guruExpanded"
              :title="masterScopeLabel(item)"
              class="text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-1 py-1 rounded text-xs"
            >
              <i class="fas fa-user-tag"></i>
            </button>
            <button
              @click="removeMaster('tunjangan', idx)"
              class="text-rose-600 hover:bg-rose-50 px-1 py-1 rounded text-xs"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="text-[9px] text-[var(--text-tertiary)]">
            <i class="fas fa-filter mr-1"></i>Berlaku:
            <b class="text-[var(--text-secondary)]">{{ masterScopeLabel(item) }}</b>
          </div>
          <div
            v-if="item._guruExpanded"
            class="border-t border-emerald-200 dark:border-emerald-800 pt-1.5"
          >
            <input
              v-model="item._guruSearch"
              type="text"
              placeholder="cari guru/pegawai..."
              class="w-full px-2 py-1 text-[11px] border border-[var(--border-default)] rounded bg-[var(--bg-card)] text-[var(--text-primary)] mb-1"
            />
            <div class="max-h-40 overflow-y-auto space-y-0.5">
              <label
                v-for="g in masterGuruCari(item)"
                :key="`${idx}_tg_${g.id}`"
                class="flex items-center gap-1.5 text-[10px] cursor-pointer px-1 py-0.5 rounded hover:bg-[var(--bg-card)]"
              >
                <input
                  type="checkbox"
                  :checked="(item.guru_ids || []).map(String).includes(String(g.id))"
                  @change="toggleGuruMaster(item, g.id)"
                  class="w-3 h-3"
                />
                <span class="font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</span>
              </label>
            </div>
            <p class="text-[9px] text-[var(--text-tertiary)] italic mt-1">
              Tidak pilih satupun = berlaku semua guru/pegawai.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Master Potongan -->
    <div
      v-show="secVisible('bisyaroh')"
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
          class="bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg space-y-1.5"
        >
          <div class="grid grid-cols-[1fr_120px_30px_30px] gap-2 items-center">
            <input
              v-model="item.nama"
              type="text"
              class="bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
            />
            <input
              v-model="item.nominalFmt"
              @input="onMasterFmtChange(item, $event)"
              type="text"
              inputmode="numeric"
              class="bg-transparent text-xs text-right font-bold text-rose-800 dark:text-rose-200 outline-none border border-rose-300 dark:border-rose-700 rounded px-2 py-1"
            />
            <button
              @click="item._guruExpanded = !item._guruExpanded"
              :title="masterScopeLabel(item)"
              class="text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-1 py-1 rounded text-xs"
            >
              <i class="fas fa-user-tag"></i>
            </button>
            <button
              @click="removeMaster('potongan', idx)"
              class="text-rose-600 hover:bg-rose-50 px-1 py-1 rounded text-xs"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="text-[9px] text-[var(--text-tertiary)]">
            <i class="fas fa-filter mr-1"></i>Berlaku:
            <b class="text-[var(--text-secondary)]">{{ masterScopeLabel(item) }}</b>
          </div>
          <div
            v-if="item._guruExpanded"
            class="border-t border-rose-200 dark:border-rose-800 pt-1.5"
          >
            <input
              v-model="item._guruSearch"
              type="text"
              placeholder="cari guru/pegawai..."
              class="w-full px-2 py-1 text-[11px] border border-[var(--border-default)] rounded bg-[var(--bg-card)] text-[var(--text-primary)] mb-1"
            />
            <div class="max-h-40 overflow-y-auto space-y-0.5">
              <label
                v-for="g in masterGuruCari(item)"
                :key="`${idx}_pg_${g.id}`"
                class="flex items-center gap-1.5 text-[10px] cursor-pointer px-1 py-0.5 rounded hover:bg-[var(--bg-card)]"
              >
                <input
                  type="checkbox"
                  :checked="(item.guru_ids || []).map(String).includes(String(g.id))"
                  @change="toggleGuruMaster(item, g.id)"
                  class="w-3 h-3"
                />
                <span class="font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</span>
              </label>
            </div>
            <p class="text-[9px] text-[var(--text-tertiary)] italic mt-1">
              Tidak pilih satupun = berlaku semua guru/pegawai.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bank -->
    <div
      v-show="activeTab === 'bank'"
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
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Nama Bank</label
          >
          <input
            v-model="form.bank_nama"
            type="text"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Nomor Rekening</label
          >
          <input
            v-model="form.bank_nomor"
            type="text"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Atas Nama</label
          >
          <input
            v-model="form.bank_atasnama"
            type="text"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
      </div>
    </div>

    <!-- v.97.0626: Integrasi BMT PETA (Virtual Account) -->
    <div
      v-show="activeTab === 'bank'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-credit-card text-indigo-600 mr-1"></i>Integrasi BMT PETA (Virtual Account)
      </h3>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-3">
        Aktifkan untuk menampilkan opsi pembayaran Virtual Account (VA tetap per santri) di halaman
        Pembayaran wali. Konfirmasi otomatis menyusul setelah integrasi API BMT siap.
      </p>
      <label
        class="flex items-start gap-2 p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 mb-3 cursor-pointer"
      >
        <input v-model="form.bmt_aktif" type="checkbox" class="mt-0.5 w-4 h-4 accent-indigo-600" />
        <span class="text-[11px] text-[var(--text-secondary)] leading-snug">
          <span class="font-bold text-[var(--text-primary)]"
            >Aktifkan opsi Virtual Account BMT PETA</span
          >
          — saat OFF, alur pembayaran wali tetap seperti sekarang (transfer + upload bukti). Saat
          ON, opsi VA muncul memakai prefix di bawah.
        </span>
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Nama BMT / Penerbit VA</label
          >
          <input
            v-model="form.bmt_nama"
            type="text"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
        </div>
        <div>
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
            >Prefix Kode VA (dari BMT)</label
          >
          <input
            v-model="form.bmt_va_prefix"
            type="text"
            inputmode="numeric"
            class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-mono"
          />
          <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
            Nomor VA santri = <b>prefix</b> + No. Induk santri. Format final mengikuti standar BMT
            PETA.
          </p>
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

    <!-- v.1.1.x: Dialog Tambah/Ubah Jenis Pembayaran (model tabel gaya Braja Soft) -->
    <div
      v-if="dlgOpen && dlgJenis"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]"
        >
          <h3 class="text-base font-black">
            <i class="fas fa-file-invoice-dollar text-teal-500 mr-1.5"></i
            >{{ dlgIsNew ? 'Tambah' : 'Ubah' }} Jenis Pembayaran
          </h3>
          <button
            @click="dlgOpen = false"
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Nama Jenis</label
              >
              <input
                v-model="dlgJenis.label"
                type="text"
                placeholder="mis. Syahriyah"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Pos Dana</label
              >
              <select
                v-model="dlgJenis.pos"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              >
                <option value="">Kas Umum</option>
                <option value="kegiatan">Uang Kegiatan</option>
                <option value="buku">Uang Buku</option>
                <option value="tabungan_wajib">Tabungan Wajib</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nominal Default (Rp) — 0 = variabel</label
            >
            <input
              v-model.number="dlgJenis.nominal_default"
              type="number"
              min="0"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
            />
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Penagihan</label
            >
            <div class="grid grid-cols-3 gap-1.5">
              <button
                v-for="opt in [
                  { v: 'bulanan', l: 'Auto · bulanan', i: 'fa-calendar-day' },
                  { v: 'tahunan', l: 'Tahunan', i: 'fa-calendar' },
                  { v: 'manual', l: 'Manual', i: 'fa-hand-pointer' }
                ]"
                :key="opt.v"
                type="button"
                @click="dlgJenis.frekuensi = opt.v"
                :class="[
                  'py-2 rounded-lg text-xs font-bold border transition',
                  dlgJenis.frekuensi === opt.v
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                ]"
              >
                <i :class="['fas', opt.i, 'mr-1']"></i>{{ opt.l }}
              </button>
            </div>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
              <i class="fas fa-info-circle mr-1"></i>Bulanan = tagihan otomatis tiap bulan · Tahunan
              = sekali per tahun ajaran · Manual = hanya saat ditagih/dibayar.
            </p>
          </div>
          <!-- Tarif Khusus (collapsible) — dipindah dari list lama -->
          <div class="border-t border-[var(--border-subtle)] pt-3">
            <button
              type="button"
              @click="dlgTarif = !dlgTarif"
              class="w-full flex items-center justify-between text-left"
            >
              <span class="text-xs font-black text-[var(--text-primary)]">
                <i class="fas fa-sliders-h text-teal-500 mr-1.5"></i>Tarif Khusus per lembaga /
                kelas / santri
                <span
                  v-if="tarifKhususInfo(dlgJenis)"
                  class="ml-1 text-[10px] font-bold text-teal-600"
                  >({{ tarifKhususInfo(dlgJenis) }})</span
                >
              </span>
              <i
                :class="[
                  'fas',
                  dlgTarif ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-[var(--text-secondary)]'
                ]"
              ></i>
            </button>
            <div v-if="dlgTarif" class="mt-3 space-y-3">
              <!-- 1) Whitelist lembaga -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-filter mr-1"></i>Hanya untuk lembaga ini (kosong = semua
                  lembaga):
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="lemb in lembagaRaw || []"
                    :key="`dlg_wl_${lemb.lembaga}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="
                        Array.isArray(dlgJenis.lembaga_only) &&
                        dlgJenis.lembaga_only.includes(lemb.lembaga)
                      "
                      @change="toggleLembagaOnly(dlgJenis, lemb.lembaga)"
                      class="w-3 h-3 accent-teal-600"
                    />
                    {{ lemb.lembaga }}
                  </label>
                </div>
              </div>
              <!-- 2) Override per-lembaga -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1.5">
                  <i class="fas fa-building mr-1"></i>Nominal per lembaga (kosong / 0 = pakai
                  default).
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div
                    v-for="lemb in lembagaScope(dlgJenis)"
                    :key="`dlg_pl_${lemb.lembaga}`"
                    class="flex items-center gap-2 bg-[var(--bg-card-elevated)] rounded px-2 py-1"
                  >
                    <span
                      class="text-[10px] font-bold text-[var(--text-secondary)] flex-1 truncate"
                      >{{ lemb.lembaga }}</span
                    >
                    <input
                      :value="dlgJenis.nominal_per_lembaga?.[lemb.lembaga] || ''"
                      @input="
                        dlgJenis.nominal_per_lembaga = {
                          ...(dlgJenis.nominal_per_lembaga || {}),
                          [lemb.lembaga]: Number($event.target.value) || 0
                        }
                      "
                      type="number"
                      min="0"
                      :placeholder="String(dlgJenis.nominal_default || 0)"
                      class="w-28 text-xs font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-2 py-1 text-right"
                    />
                  </div>
                </div>
              </div>
              <!-- 3) Override per-kelas -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1.5">
                  <i class="fas fa-layer-group mr-1"></i>Nominal per kelas (paling spesifik).
                </p>
                <div class="space-y-2">
                  <div
                    v-for="lemb in lembagaScope(dlgJenis)"
                    :key="`dlg_pk_${lemb.lembaga}`"
                    class="bg-[var(--bg-card-elevated)] rounded p-2 border border-[var(--border-subtle)]"
                  >
                    <p class="text-[10px] font-black text-[var(--text-secondary)] mb-1">
                      {{ lemb.lembaga }}
                    </p>
                    <div
                      v-if="kelasOfLembaga(lemb).length === 0"
                      class="text-[9px] text-[var(--text-tertiary)] italic"
                    >
                      Lembaga ini belum punya kelas
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                      <div
                        v-for="kls in kelasOfLembaga(lemb)"
                        :key="`dlg_pk_${lemb.lembaga}_${kls}`"
                        class="flex items-center gap-1.5"
                      >
                        <span
                          class="text-[9px] font-bold text-[var(--text-secondary)] w-12 truncate"
                          >{{ kls }}</span
                        >
                        <input
                          :value="(dlgJenis.nominal_per_kelas?.[lemb.lembaga] || {})[kls] || ''"
                          @input="setNominalKelas(dlgJenis, lemb.lembaga, kls, $event.target.value)"
                          type="number"
                          min="0"
                          :placeholder="
                            String(
                              (dlgJenis.nominal_per_lembaga || {})[lemb.lembaga] ||
                                dlgJenis.nominal_default ||
                                0
                            )
                          "
                          class="flex-1 text-[10px] font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-1.5 py-0.5 text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 4) Override per-santri -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-user-tag mr-1"></i>Nominal khusus per santri —
                  <b>{{ overrideSantriCount(dlgJenis) }}</b> di-set:
                </p>
                <input
                  v-model="perSantriSearch[dlgJenis.id]"
                  type="text"
                  placeholder="cari nama / No. Induk santri..."
                  class="w-full px-2 py-1 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1.5"
                />
                <div class="space-y-1 max-h-48 overflow-y-auto">
                  <div
                    v-for="s in santriCariFor(dlgJenis)"
                    :key="`dlg_ps_${s.id}`"
                    class="flex items-center gap-2 bg-[var(--bg-card-elevated)] rounded px-2 py-1 border border-[var(--border-subtle)]"
                  >
                    <span class="flex-1 text-[10px] font-bold text-[var(--text-primary)] truncate"
                      >{{ s.nama }}
                      <span class="text-[var(--text-tertiary)] font-normal">{{
                        s.nis || '-'
                      }}</span></span
                    >
                    <input
                      :value="(dlgJenis.nominal_per_santri || {})[String(s.id)] || ''"
                      @input="setNominalSantri(dlgJenis, s.id, $event.target.value)"
                      type="number"
                      min="0"
                      :placeholder="String(dlgJenis.nominal_default || 0)"
                      class="w-24 text-[10px] font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-1.5 py-0.5 text-right"
                    />
                  </div>
                  <p
                    v-if="santriCariFor(dlgJenis).length === 0"
                    class="text-[9px] text-[var(--text-tertiary)] italic px-1 py-1"
                  >
                    {{
                      perSantriSearch[dlgJenis.id]
                        ? 'Santri tidak ditemukan.'
                        : 'Ketik nama/No. Induk untuk set nominal khusus.'
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-end gap-2 px-5 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] rounded-b-2xl"
        >
          <button
            @click="dlgOpen = false"
            class="px-4 py-2 text-sm font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
          >
            Batal
          </button>
          <button
            @click="simpanJenisDialog"
            class="px-4 py-2 text-sm font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white inline-flex items-center gap-1.5"
          >
            <i class="fas fa-check"></i>{{ dlgIsNew ? 'Tambah' : 'Simpan' }}
          </button>
        </div>
      </div>
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
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-2"
        />

        <!-- Pos Dana: tagihan ini masuk rekap Uang Kegiatan/Buku/Tabungan Wajib saat dibayar
             (auto dari jenis). Tabungan Wajib: generate hanya utk santri kelas akhir. -->
        <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
          Pos Dana
        </label>
        <select
          v-model="genPos"
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-2"
        >
          <option value="">Kas Umum</option>
          <option value="kegiatan">Uang Kegiatan</option>
          <option value="buku">Uang Buku</option>
          <option value="tabungan_wajib">Tabungan Wajib</option>
        </select>

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
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1"
        />
        <label
          v-if="genJenisId"
          class="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-secondary)] mb-3 cursor-pointer"
        >
          <input
            v-model="genPakaiNominalJenis"
            type="checkbox"
            class="w-3.5 h-3.5 accent-emerald-600"
          />
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
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
          >
            Semua aktif
          </button>
          <button
            type="button"
            @click="genScope = 'lembaga'"
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'lembaga'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
          >
            Lembaga/Kelas
          </button>
          <button
            type="button"
            @click="genScope = 'santri'"
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'santri'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
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
            placeholder="Cari nama / No. Induk..."
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
          <i class="fas fa-users mr-1"></i>Akan dibuat untuk <b>{{ genTargetCount }}</b> santri
          aktif.
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
import { useRoute } from 'vue-router'
// v.F6e: adapter Supabase (serverTimestamp = shim ISO string).
import { getAll, setOne, mergeOne, serverTimestamp } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { useLembaga } from '@/composables/useLembaga'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { useGedungScope } from '@/composables/useGedungScope'

// v.111: scope Gedung — generate tagihan hanya untuk santri gedung admin
const { scoped: gedungScoped, myGedung } = useGedungScope()
const _inMyGedung = (x) => !gedungScoped.value || String(x.gedung || '').trim() === myGedung.value

const settingsStore = useSettingsStore()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()
const toast = useToast()
const route = useRoute()

// v.100 (Batch 4, Electron): pita Keuangan memecah Pengaturan jadi tombol → buka view ini dgn
// ?section=tagihan|syahriyah|bisyaroh untuk fokus 1 area. Tanpa query (web/Android) tampil PENUH.
const focusSection = computed(() => String(route.query.section || ''))

// v.110.0626: navigasi TAB (web) — pecah 7 section jadi 5 area, tampil 1 per tab (anti-bingung).
//   Deep-link Electron ?section=tagihan|syahriyah|bisyaroh tetap jalan (di-map ke tab).
const TABS = [
  { id: 'tagihan', t: 'Tagihan', icon: 'fa-file-invoice-dollar' },
  { id: 'jenis', t: 'Jenis Pembayaran', icon: 'fa-list-ul' },
  { id: 'bisyaroh', t: 'Bisyaroh', icon: 'fa-hand-holding-usd' },
  { id: 'kategori', t: 'Kategori', icon: 'fa-tags' },
  { id: 'bank', t: 'Bank & VA', icon: 'fa-university' }
]
function _tabFromSection(sec) {
  if (sec === 'syahriyah') return 'jenis'
  if (sec === 'bisyaroh') return 'bisyaroh'
  if (sec === 'tagihan') return 'tagihan'
  return ''
}
const activeTab = ref(_tabFromSection(focusSection.value) || 'tagihan')
function setTab(id) {
  activeTab.value = id
}
// secVisible: blok lama (tagihan/syahriyah/bisyaroh) kini ikut TAB aktif.
function secVisible(name) {
  if (name === 'tagihan') return activeTab.value === 'tagihan'
  if (name === 'syahriyah') return activeTab.value === 'jenis'
  if (name === 'bisyaroh') return activeTab.value === 'bisyaroh'
  return activeTab.value === name
}
const sectionMeta = computed(() => {
  const m = {
    tagihan: {
      t: 'Buat / Generate Tagihan',
      s: 'Generate tagihan bulanan & khusus (infaq/iuran), atur jatuh tempo & struk.'
    },
    jenis: {
      t: 'Jenis Pembayaran Santri',
      s: 'Atur jenis & nominal — default, lalu khusus per lembaga / kelas / santri.'
    },
    bisyaroh: {
      t: 'Bisyaroh Guru/Pegawai',
      s: 'Bisyaroh shift & pokok, plus master tunjangan & potongan.'
    },
    kategori: {
      t: 'Kategori Transaksi Manual',
      s: 'Kategori pemasukan & pengeluaran untuk Buku Induk.'
    },
    bank: {
      t: 'Bank & Virtual Account',
      s: 'Rekening bank pondok & integrasi BMT PETA (VA).'
    }
  }
  return m[activeTab.value] || m.tagihan
})

// v.94.0626: buka modal Pengaturan Printer (deteksi printer Windows). PrinterSettingsModal global dengar event ini.
function bukaPengaturanPrinter() {
  try {
    window.dispatchEvent(new CustomEvent('ammu:open-printer-settings'))
  } catch (e) {
    /* ignore */
  }
}

const newKatMasuk = ref('')
const newKatKeluar = ref('')
const newKatTabungan = ref('') // input tambah kategori tabungan
const searchGuru = ref('')
const filterLembaga = ref('')
const generating = ref(false)
const saving = ref(false)
const jenisList = ref([])
// v.1.1.x: dialog Tambah/Ubah jenis (model tabel gaya Braja Soft)
const dlgOpen = ref(false)
const dlgIsNew = ref(false)
const dlgIdx = ref(-1)
const dlgJenis = ref(null)
const dlgTarif = ref(false)
// v.110: Excel template + impor (jenis pembayaran & bisyaroh pegawai)
const { exportSimple, importFile } = useExcel()
const imporJenisBusy = ref(false)
const imporBisyarohBusy = ref(false)

const form = reactive({
  keu_jatuh_tempo: 10,
  keu_auto_generate_cron: true, // v.95.0626: kill-switch cron server auto-generate
  // v.21.89.0527: Lebar kertas struk POS (dot-matrix). '9.5' = Epson LX-310 continuous form (default).
  posStrukPaper: '9.5',
  // v.95.0626: penyetelan struk cetak PDF slip (mm) — bisa diatur sendiri tanpa rebuild
  posStrukSlipW: 190,
  posStrukSlipH: 140,
  posStrukTopMm: 2,
  posStrukLeftMm: 0, // v.96.0626: geser kanan (center) utk cetak grafis ESC/P
  keu_jenis_tagihan: [],
  keu_bisyaroh_pagi: '',
  keu_bisyaroh_sore: '',
  keu_bisyaroh_sekolah_shift: '',
  keu_bisyaroh_pegawai_pagi: '',
  keu_bisyaroh_pegawai_sore: '',
  keu_glondongan_per_juz: '', // v.111: bisyaroh tes glondongan PTPT per juz disimak
  keu_bisyaroh_pokok: {},
  keu_bisyaroh_sekolah: {},
  keu_kategori_masuk: [],
  keu_kategori_keluar: [],
  keu_tabungan_kategori: [], // {id,label,nominal_default} -> settings.keuTabunganKategori
  master_tunjangan: [],
  master_potongan: [],
  bank_nama: '',
  bank_nomor: '',
  bank_atasnama: '',
  // v.97.0626: Integrasi BMT PETA (Virtual Account)
  bmt_aktif: false,
  bmt_nama: '',
  bmt_va_prefix: ''
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
  form.keu_auto_generate_cron = s.keu_auto_generate_cron !== false // default ON
  form.posStrukPaper = s.posStrukPaper || '9.5'
  form.posStrukSlipW = Number(s.posStrukSlipW) || 190
  form.posStrukSlipH = Number(s.posStrukSlipH) || 140
  form.posStrukTopMm = s.posStrukTopMm != null ? Number(s.posStrukTopMm) : 2
  form.posStrukLeftMm = s.posStrukLeftMm != null ? Number(s.posStrukLeftMm) : 0

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
            // v.95.0626: override nominal per SANTRI (santri yg bayar syahriyahnya beda)
            nominal_per_santri:
              t.nominal_per_santri && typeof t.nominal_per_santri === 'object'
                ? { ...t.nominal_per_santri }
                : _emptyMap(),
            auto_generate: !!t.auto_generate,
            // v.1.1.x: frekuensi penagihan (bulanan/tahunan/manual) — migrasi dari auto_generate lama
            frekuensi: t.frekuensi || (t.auto_generate ? 'bulanan' : 'manual'),
            // pos dana: '' (kas umum) | 'kegiatan' | 'buku' | 'tabungan_wajib' — penyaring rekap pos
            pos: t.pos || '',
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
      {
        id: 'syahriyah',
        label: 'Syahriyah',
        nominal_default: 0,
        nominal_per_lembaga: _emptyMap(),
        lembaga_only: [],
        nominal_per_kelas: _emptyMap(),
        auto_generate: true,
        _expanded: false
      },
      {
        id: 'spp_sekolah',
        label: 'SPP Sekolah',
        nominal_default: 0,
        nominal_per_lembaga: _emptyMap(),
        lembaga_only: [],
        nominal_per_kelas: _emptyMap(),
        auto_generate: false,
        _expanded: false
      },
      {
        id: 'kebersihan',
        label: 'Kebersihan',
        nominal_default: 0,
        nominal_per_lembaga: _emptyMap(),
        lembaga_only: [],
        nominal_per_kelas: _emptyMap(),
        auto_generate: false,
        _expanded: false
      }
    ]
  }
  if (!arr.find((t) => t.id === 'syahriyah')) {
    arr.unshift({
      id: 'syahriyah',
      label: 'Syahriyah',
      nominal_default: 0,
      nominal_per_lembaga: _emptyMap(),
      lembaga_only: [],
      nominal_per_kelas: _emptyMap(),
      auto_generate: true,
      _expanded: false
    })
  }
  // v.1.1.x: pastikan tiap jenis punya frekuensi (fallback dari auto_generate lama)
  arr.forEach((j) => {
    if (!j.frekuensi) j.frekuensi = j.auto_generate ? 'bulanan' : 'manual'
  })
  jenisList.value = arr
  form.keu_jenis_tagihan = arr.map((t) => t.label)

  form.keu_bisyaroh_pagi = fmtRp(s.keu_bisyaroh_pagi || 0)
  form.keu_bisyaroh_sore = fmtRp(s.keu_bisyaroh_sore || 0)
  form.keu_bisyaroh_sekolah_shift = fmtRp(s.keu_bisyaroh_sekolah_shift || 0)
  form.keu_bisyaroh_pegawai_pagi = fmtRp(s.keu_bisyaroh_pegawai_pagi || 0)
  form.keu_bisyaroh_pegawai_sore = fmtRp(s.keu_bisyaroh_pegawai_sore || 0)
  form.keu_glondongan_per_juz = fmtRp(s.keu_glondongan_per_juz || 0)
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
  // Kategori Tabungan (dibaca TabunganView). Fallback 4 default supaya bisa langsung diedit.
  form.keu_tabungan_kategori =
    Array.isArray(s.keuTabunganKategori) && s.keuTabunganKategori.length > 0
      ? s.keuTabunganKategori.map((k) => ({
          id: k.id || slugId(k.label || k.nama || ''),
          label: k.label || k.nama || '',
          nominal_default: Number(k.nominal_default || k.nominal || 0) || 0
        }))
      : [
          { id: 'umum', label: 'Umum', nominal_default: 0 },
          { id: 'sukarela', label: 'Sukarela', nominal_default: 0 },
          { id: 'wisuda', label: 'Wisuda', nominal_default: 0 },
          { id: 'rihlah', label: 'Rihlah', nominal_default: 0 }
        ]
  // v.95.0626: + guru_ids (scope per guru/pegawai; kosong = semua)
  const _mapMaster = (t) => ({
    nama: t.nama || '',
    nominal: t.nominal || 0,
    nominalFmt: fmtRp(t.nominal || 0),
    guru_ids: Array.isArray(t.guru_ids) ? t.guru_ids.map(String) : [],
    _guruExpanded: false,
    _guruSearch: ''
  })
  form.master_tunjangan = Array.isArray(s.master_tunjangan)
    ? s.master_tunjangan.map(_mapMaster)
    : []
  form.master_potongan = Array.isArray(s.master_potongan) ? s.master_potongan.map(_mapMaster) : []
  form.bank_nama = s.bank_nama || ''
  form.bank_nomor = s.bank_nomor || ''
  form.bank_atasnama = s.bank_atasnama || ''
  // v.97.0626: BMT PETA Virtual Account
  form.bmt_aktif = s.bmt_aktif === true
  form.bmt_nama = s.bmt_nama || ''
  form.bmt_va_prefix = s.bmt_va_prefix || ''
}

onMounted(async () => {
  // FIX bug "balik ke default setelah refresh": pastikan store ter-load dari DB
  // TERBARU dulu. main.js hanya settingsStore.subscribe() (fetch async), jadi refresh
  // LANGSUNG di halaman ini bisa jalan sebelum data DB tiba → loadFromSettings membaca
  // store basi → nominal/jenis balik default walau DB sudah tersimpan. (Halaman
  // Pengaturan lain sudah await load — samakan.)
  await settingsStore.load()
  loadFromSettings()
  // T6: tombol pita "Buat Tagihan" buka langsung modal Generate Tagihan Khusus
  if (route.query.gen) {
    setTimeout(() => {
      try {
        openGenKhusus()
      } catch (e) {
        /* ignore */
      }
    }, 0)
  }
})

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
  const cur =
    jenis.nominal_per_kelas && typeof jenis.nominal_per_kelas === 'object'
      ? { ...jenis.nominal_per_kelas }
      : {}
  const inner = { ...(cur[lembagaName] || {}) }
  if (n > 0) inner[kelas] = n
  else delete inner[kelas]
  if (Object.keys(inner).length > 0) cur[lembagaName] = inner
  else delete cur[lembagaName]
  jenis.nominal_per_kelas = cur
}

// v.95.0626: override nominal per SANTRI (untuk santri yg bayar syahriyahnya beda)
const perSantriSearch = reactive({})
function setNominalSantri(jenis, santriId, val) {
  const n = Number(val) || 0
  const cur =
    jenis.nominal_per_santri && typeof jenis.nominal_per_santri === 'object'
      ? { ...jenis.nominal_per_santri }
      : {}
  const sid = String(santriId)
  if (n > 0) cur[sid] = n
  else delete cur[sid]
  jenis.nominal_per_santri = cur
}
function santriCariFor(jenis) {
  const kw = String(perSantriSearch[jenis.id] || '')
    .trim()
    .toLowerCase()
  const ov = jenis.nominal_per_santri || {}
  if (!kw) return genSantriAktif.value.filter((s) => Number(ov[String(s.id)] || 0) > 0)
  return genSantriAktif.value
    .filter(
      (s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(kw) ||
        String(s.nis || '')
          .toLowerCase()
          .includes(kw)
    )
    .slice(0, 25)
}
function overrideSantriCount(jenis) {
  return Object.values(jenis.nominal_per_santri || {}).filter((v) => Number(v) > 0).length
}
// v.95.0626: muat santri aktif (sekali) utk picker override per-santri
async function loadSantriAktif() {
  if (genSantriAktif.value.length > 0) return
  try {
    genSantriAktif.value = (await getAll('santri')).filter(
      (x) => x.aktif !== false && _inMyGedung(x)
    )
  } catch (e) {
    toast.error('Gagal memuat data santri: ' + (e.message || e))
  }
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

function addTabunganKat() {
  const v = newKatTabungan.value.trim()
  if (!v) return
  if (
    form.keu_tabungan_kategori.some(
      (k) =>
        String(k.label || '')
          .trim()
          .toLowerCase() === v.toLowerCase()
    )
  ) {
    toast.warning('Kategori tabungan sudah ada')
    return
  }
  form.keu_tabungan_kategori.push({ id: slugId(v), label: v, nominal_default: 0 })
  newKatTabungan.value = ''
}

function removeTabunganKat(idx) {
  form.keu_tabungan_kategori.splice(idx, 1)
}

function addMaster(kind) {
  ;(kind === 'tunjangan' ? form.master_tunjangan : form.master_potongan).push({
    nama: '',
    nominal: 0,
    nominalFmt: '',
    guru_ids: [],
    _guruExpanded: false,
    _guruSearch: ''
  })
}
// v.95.0626: scope master tunjangan/potongan per guru
function toggleGuruMaster(item, guruId) {
  const sid = String(guruId)
  const cur = Array.isArray(item.guru_ids) ? item.guru_ids.map(String) : []
  const i = cur.indexOf(sid)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(sid)
  item.guru_ids = cur
}
function masterGuruCari(item) {
  const kw = String(item._guruSearch || '')
    .trim()
    .toLowerCase()
  let list = (guruRaw.value || []).filter(
    (g) => String(g.status || 'Aktif').toLowerCase() === 'aktif'
  )
  if (kw)
    list = list.filter((g) =>
      String(g.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''))).slice(0, 60)
}
function masterScopeLabel(item) {
  const n = Array.isArray(item.guru_ids) ? item.guru_ids.length : 0
  return n === 0 ? 'Semua guru/pegawai' : n + ' guru dipilih'
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
        // v.95.0626: serialize nominal_per_santri (buang yg 0)
        const perS = {}
        if (t.nominal_per_santri && typeof t.nominal_per_santri === 'object') {
          for (const [sid, v] of Object.entries(t.nominal_per_santri)) {
            const n = Number(v) || 0
            if (n > 0) perS[String(sid)] = n
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
          nominal_per_santri: perS,
          lembaga_only: wl,
          // v.1.1.x: frekuensi = sumber kebenaran; auto_generate diturunkan (backward compat cron/generator)
          frekuensi: t.frekuensi || (t.auto_generate ? 'bulanan' : 'manual'),
          auto_generate: (t.frekuensi || (t.auto_generate ? 'bulanan' : 'manual')) === 'bulanan',
          pos: t.pos || ''
        }
      })
    const payload = {
      keu_jatuh_tempo: form.keu_jatuh_tempo,
      keu_auto_generate_cron: form.keu_auto_generate_cron,
      posStrukPaper: form.posStrukPaper || '9.5',
      posStrukSlipW: Number(form.posStrukSlipW) || 190,
      posStrukSlipH: Number(form.posStrukSlipH) || 140,
      // v.96.0626: jgn pakai `|| 6` — angka 0 (margin atas 0) jadi ke-reset; pakai isFinite
      posStrukTopMm: Number.isFinite(Number(form.posStrukTopMm)) ? Number(form.posStrukTopMm) : 2,
      posStrukLeftMm: Number.isFinite(Number(form.posStrukLeftMm))
        ? Number(form.posStrukLeftMm)
        : 0,
      keuTagihanJenis: jenis,
      keu_jenis_tagihan: jenis.map((t) => t.label),
      keu_bisyaroh_pagi: parseRp(form.keu_bisyaroh_pagi),
      keu_bisyaroh_sore: parseRp(form.keu_bisyaroh_sore),
      keu_bisyaroh_sekolah_shift: parseRp(form.keu_bisyaroh_sekolah_shift),
      keu_bisyaroh_pegawai_pagi: parseRp(form.keu_bisyaroh_pegawai_pagi),
      keu_bisyaroh_pegawai_sore: parseRp(form.keu_bisyaroh_pegawai_sore),
      keu_glondongan_per_juz: parseRp(form.keu_glondongan_per_juz),
      keu_bisyaroh_pokok: {},
      keu_bisyaroh_sekolah: {},
      keu_kategori_masuk: form.keu_kategori_masuk.filter((t) => t.trim()),
      keu_kategori_keluar: form.keu_kategori_keluar.filter((t) => t.trim()),
      keuTabunganKategori: form.keu_tabungan_kategori
        .filter((k) => String(k.label || '').trim())
        .map((k) => ({
          id: k.id || slugId(k.label),
          label: String(k.label).trim(),
          nominal_default: Number(k.nominal_default || 0) || 0
        })),
      master_tunjangan: form.master_tunjangan
        .filter((t) => t.nama.trim())
        .map((t) => ({
          nama: t.nama.trim(),
          nominal: t.nominal || 0,
          guru_ids: Array.isArray(t.guru_ids) ? t.guru_ids.map(String) : []
        })),
      master_potongan: form.master_potongan
        .filter((t) => t.nama.trim())
        .map((t) => ({
          nama: t.nama.trim(),
          nominal: t.nominal || 0,
          guru_ids: Array.isArray(t.guru_ids) ? t.guru_ids.map(String) : []
        })),
      bank_nama: form.bank_nama.trim(),
      bank_nomor: form.bank_nomor.trim(),
      bank_atasnama: form.bank_atasnama.trim(),
      // v.97.0626: Integrasi BMT PETA (Virtual Account)
      bmt_aktif: !!form.bmt_aktif,
      bmt_nama: String(form.bmt_nama || '').trim(),
      bmt_va_prefix: String(form.bmt_va_prefix || '').trim()
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_pokok)) {
      const n = parseRp(v)
      if (n > 0) payload.keu_bisyaroh_pokok[k] = n
    }
    for (const [k, v] of Object.entries(form.keu_bisyaroh_sekolah)) {
      const n = parseRp(v)
      if (n > 0) payload.keu_bisyaroh_sekolah[k] = n
    }
    await mergeOne('settings', 'general', payload)
    await mergeOne('settings', 'web', payload)
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

// ==== v.1.1.x: Dialog Tambah/Ubah jenis pembayaran (model tabel gaya Braja Soft) ====
const POS_LABELS = {
  '': 'Kas Umum',
  kegiatan: 'Uang Kegiatan',
  buku: 'Uang Buku',
  tabungan_wajib: 'Tabungan Wajib'
}
function posLabel(p) {
  return POS_LABELS[p || ''] || 'Kas Umum'
}
function frekMeta(f) {
  if (f === 'bulanan')
    return {
      label: 'Auto · bulanan',
      cls: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-200'
    }
  if (f === 'tahunan')
    return {
      label: 'Tahunan',
      cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
    }
  return {
    label: 'Manual',
    cls: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200'
  }
}
// Ringkasan tarif khusus utk kolom tabel ('' kalau tak ada override)
function tarifKhususInfo(j) {
  const nl = Object.values(j.nominal_per_lembaga || {}).filter((v) => Number(v) > 0).length
  const nk = Object.values(j.nominal_per_kelas || {}).reduce(
    (a, m) => a + Object.values(m || {}).filter((v) => Number(v) > 0).length,
    0
  )
  const ns = Object.values(j.nominal_per_santri || {}).filter((v) => Number(v) > 0).length
  const wl = (j.lembaga_only || []).length
  const parts = []
  if (wl) parts.push(`${wl} lembaga`)
  if (nl) parts.push(`${nl} tarif/lembaga`)
  if (nk) parts.push(`${nk} tarif/kelas`)
  if (ns) parts.push(`${ns} santri`)
  return parts.join(' · ')
}
function openJenisDialog(j) {
  dlgIdx.value = jenisList.value.indexOf(j)
  dlgIsNew.value = false
  dlgJenis.value = JSON.parse(JSON.stringify(j)) // edit pada SALINAN → Batal benar-benar batal
  dlgTarif.value = false
  loadSantriAktif() // muat santri utk picker Tarif Khusus per-santri
  dlgOpen.value = true
}
function openJenisBaru() {
  dlgIdx.value = -1
  dlgIsNew.value = true
  dlgJenis.value = {
    id: '',
    label: '',
    nominal_default: 0,
    nominal_per_lembaga: {},
    lembaga_only: [],
    nominal_per_kelas: {},
    nominal_per_santri: {},
    frekuensi: 'manual',
    pos: '',
    _expanded: false
  }
  dlgTarif.value = false
  loadSantriAktif() // muat santri utk picker Tarif Khusus per-santri
  dlgOpen.value = true
}
function simpanJenisDialog() {
  const j = dlgJenis.value
  if (!j) return
  const label = String(j.label || '').trim()
  if (!label) {
    toast.warning('Nama jenis wajib diisi')
    return
  }
  j.label = label
  if (!j.id) j.id = slugId(label)
  if (dlgIsNew.value) {
    if (jenisList.value.some((x) => x.id === j.id)) {
      toast.warning(`Jenis "${label}" sudah ada`)
      return
    }
    jenisList.value.push(j)
  } else if (dlgIdx.value >= 0) {
    jenisList.value.splice(dlgIdx.value, 1, j)
  }
  form.keu_jenis_tagihan = jenisList.value.map((t) => t.label)
  dlgOpen.value = false
  toast.info('Perubahan siap — klik "Simpan Semua" untuk menyimpan permanen.')
}

// ============================================================================
// v.110: Template + Impor — Jenis Pembayaran & Bisyaroh Pegawai (TU isi, admin impor).
//   Impor TIDAK auto-simpan: mengisi form → Kyai cek → klik "Simpan Semua".
//   Jenis = MERGE by id/label (pertahankan override per-lembaga/kelas/santri).
//   Bisyaroh = cocokkan by ID (fallback nama) → set pokok pondok/sekolah per guru.
// ============================================================================
// Ambil nilai kolom by header (case-insensitive, dukung beberapa alias).
function pickCol(obj, names) {
  const map = {}
  for (const k of Object.keys(obj || {})) map[String(k).trim().toLowerCase()] = obj[k]
  for (const n of names) {
    const v = map[n]
    if (v !== undefined && v !== null && String(v).trim() !== '') return v
  }
  return ''
}

function unduhTemplateJenis() {
  const rows = jenisList.value.map((j) => ({
    label: j.label || '',
    pos: posLabel(j.pos),
    nominal: Number(j.nominal_default || 0) || 0,
    penagihan: j.frekuensi || 'manual'
  }))
  exportSimple(rows, {
    filename: 'template_jenis_pembayaran.xlsx',
    sheetName: 'Jenis Pembayaran',
    title: 'Template Jenis Pembayaran — Ammu',
    columns: [
      { key: 'label', header: 'Label', width: 32 },
      { key: 'pos', header: 'Pos Dana', width: 20 },
      { key: 'nominal', header: 'Nominal Default', width: 18 },
      { key: 'penagihan', header: 'Penagihan (bulanan/tahunan/manual)', width: 30 }
    ]
  })
}

async function imporJenis(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporJenisBusy.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    let imported = 0
    const next = [...jenisList.value]
    for (const r of rows) {
      const label = String(pickCol(r, ['label', 'jenis', 'nama', 'jenis pembayaran']) || '').trim()
      if (!label) continue
      const nominal = parseRp(pickCol(r, ['nominal default', 'nominal_default', 'nominal']))
      // v.1.1.x: Penagihan (bulanan/tahunan/manual). Fallback ke kolom "Auto" lama (Ya→bulanan).
      const penStr = String(
        pickCol(r, ['penagihan (bulanan/tahunan/manual)', 'penagihan', 'frekuensi']) || ''
      )
        .trim()
        .toLowerCase()
      const autoStr = String(
        pickCol(r, ['auto generate (ya/tidak)', 'auto generate', 'auto', 'auto_generate']) || ''
      )
        .trim()
        .toLowerCase()
      let frekuensi = null
      if (['bulanan', 'bulan', 'monthly'].includes(penStr)) frekuensi = 'bulanan'
      else if (['tahunan', 'tahun', 'yearly', 'annual'].includes(penStr)) frekuensi = 'tahunan'
      else if (['manual', 'insidental', 'tidak'].includes(penStr)) frekuensi = 'manual'
      else if (['ya', 'yes', 'true', '1', 'y', 'v'].includes(autoStr)) frekuensi = 'bulanan'
      else if (autoStr) frekuensi = 'manual'
      // Pos Dana (kosong = jangan ubah yang lama)
      const posStr = String(pickCol(r, ['pos dana', 'pos', 'pos_dana']) || '')
        .trim()
        .toLowerCase()
      let pos = null
      if (posStr) {
        if (posStr.includes('kegiatan')) pos = 'kegiatan'
        else if (posStr.includes('buku')) pos = 'buku'
        else if (posStr.includes('tabungan')) pos = 'tabungan_wajib'
        else pos = ''
      }
      const id = slugId(label)
      const ex = next.find(
        (t) => t.id === id || String(t.label || '').toLowerCase() === label.toLowerCase()
      )
      if (ex) {
        // update label/nominal/frekuensi/pos — PERTAHANKAN override per-lembaga/kelas/santri & whitelist.
        ex.label = label
        ex.nominal_default = nominal
        if (frekuensi != null) {
          ex.frekuensi = frekuensi
          ex.auto_generate = frekuensi === 'bulanan'
        }
        if (pos != null) ex.pos = pos
      } else {
        const fr = frekuensi || 'manual'
        next.push({
          id,
          label,
          nominal_default: nominal,
          nominal_per_lembaga: {},
          lembaga_only: [],
          nominal_per_kelas: {},
          nominal_per_santri: {},
          frekuensi: fr,
          auto_generate: fr === 'bulanan',
          pos: pos || '',
          _expanded: false
        })
      }
      imported++
    }
    jenisList.value = next
    form.keu_jenis_tagihan = next.map((t) => t.label)
    toast.success(`${imported} jenis diimpor. Cek lalu klik "Simpan Semua".`)
  } catch (e) {
    toast.error('Gagal impor jenis: ' + (e.message || e))
  } finally {
    imporJenisBusy.value = false
    ev.target.value = ''
  }
}

// Pegawai aktif (sumber template bisyaroh; pre-isi id+nama biar TU tinggal isi nominal).
function _guruAktifSorted() {
  return (guruRaw.value || [])
    .filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')))
}

function unduhTemplateBisyaroh() {
  const rows = _guruAktifSorted().map((g) => ({
    id: String(g.id),
    nama: g.nama || '',
    lembaga: g.lembaga || g.lembaga_sekolah || '',
    pondok: parseRp(form.keu_bisyaroh_pokok[g.id] || '') || '',
    sekolah: parseRp(form.keu_bisyaroh_sekolah[g.id] || '') || ''
  }))
  exportSimple(rows, {
    filename: 'template_bisyaroh_pegawai.xlsx',
    sheetName: 'Bisyaroh Pegawai',
    title: 'Template Bisyaroh Pokok Pegawai — Ammu (JANGAN ubah/hapus kolom ID)',
    columns: [
      { key: 'id', header: 'ID', width: 16 },
      { key: 'nama', header: 'Nama', width: 28 },
      { key: 'lembaga', header: 'Lembaga', width: 22 },
      { key: 'pondok', header: 'Pokok Pondok', width: 16 },
      { key: 'sekolah', header: 'Pokok Sekolah', width: 16 }
    ]
  })
}

async function imporBisyaroh(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporBisyarohBusy.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
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
    let ok = 0
    let miss = 0
    for (const r of rows) {
      const id = String(pickCol(r, ['id', 'guru_id', 'id guru']) || '').trim()
      const nama = String(pickCol(r, ['nama', 'nama guru', 'nama pegawai']) || '').trim()
      const g = (id && byId[id]) || (nama && byNama[nama.toLowerCase()]) || null
      if (!g) {
        miss++
        continue
      }
      const sid = String(g.id)
      const pondok = parseRp(pickCol(r, ['pokok pondok', 'pondok', 'pokok']))
      const sekolah = parseRp(pickCol(r, ['pokok sekolah', 'sekolah']))
      if (pondok > 0) form.keu_bisyaroh_pokok[sid] = fmtRp(pondok)
      else delete form.keu_bisyaroh_pokok[sid]
      if (sekolah > 0) form.keu_bisyaroh_sekolah[sid] = fmtRp(sekolah)
      else delete form.keu_bisyaroh_sekolah[sid]
      ok++
    }
    toast.success(
      `${ok} pegawai diimpor${miss ? `, ${miss} baris tak cocok (ID/nama)` : ''}. Cek lalu klik "Simpan Semua".`
    )
  } catch (e) {
    toast.error('Gagal impor bisyaroh: ' + (e.message || e))
  } finally {
    imporBisyarohBusy.value = false
    ev.target.value = ''
  }
}

// v.21.104.0527: implementasi Vue (gantikan legacy window.autoGenerateSyahriyahManual).
// Generate tagihan utk jenis ber-auto_generate=true (default: Syahriyah)
// utk semua santri aktif, nominal pakai 3-lapis lookup
// (nominal_per_kelas → nominal_per_lembaga → nominal_default).
async function autoGenerate() {
  if (generating.value) return
  if (
    !confirm(
      `Generate tagihan untuk ${gedungScoped.value ? `santri ${myGedung.value}` : 'semua santri aktif'}?\n\nJenis "bulanan" → periode bulan ini. Jenis "tahunan" → tahun ajaran berjalan. Tagihan duplikat (periode sama) di-skip.`
    )
  )
    return
  generating.value = true
  try {
    // v.1.1.x: proses jenis bulanan + tahunan (manual dilewati)
    const jenisAuto = (jenisList.value || []).filter(
      (j) =>
        (j.frekuensi === 'bulanan' || j.frekuensi === 'tahunan') && String(j.label || '').trim()
    )
    if (jenisAuto.length === 0) {
      toast.warning('Tidak ada jenis "bulanan" / "tahunan" untuk di-generate.')
      generating.value = false
      return
    }
    // Fetch santri aktif (v.111: ke-scope ke gedung admin keuangan)
    const santriAktif = (await getAll('santri')).filter((x) => x.aktif !== false && _inMyGedung(x))
    // Fetch tagihan existing utk skip duplikat
    const tagihanAll = await getAll('keuangan_tagihan')
    const existing = new Set()
    for (const t of tagihanAll) {
      const key = `${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`
      existing.add(key)
    }
    const now = new Date()
    const BULAN_NM = [
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
    // Periode bulanan (bulan ini) + periode tahunan (tahun ajaran berjalan, Juli–Juni)
    const periodeBulan = `${BULAN_NM[now.getMonth()]} ${now.getFullYear()}`
    const jtBulan = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
    const taStart = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
    const periodeTahun = `TA ${taStart}/${taStart + 1}`
    const jtTahun = `${taStart}-12-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
    let created = 0,
      skipped = 0,
      errCount = 0
    for (const j of jenisAuto) {
      const tahunan = j.frekuensi === 'tahunan'
      const periode = tahunan ? periodeTahun : periodeBulan
      const jt = tahunan ? jtTahun : jtBulan
      const wl = Array.isArray(j.lembaga_only) ? j.lembaga_only.filter(Boolean) : []
      for (const sx of santriAktif) {
        // whitelist gating
        if (wl.length > 0) {
          if (!(wl.includes(sx.lembaga) || wl.includes(sx.lembaga_sekolah))) continue
        }
        const dupKey = `${String(sx.id)}__${(j.label || '').toLowerCase()}__${periode}`
        if (existing.has(dupKey)) {
          skipped++
          continue
        }
        // v.95.0626: 4-lapis lookup — per-SANTRI dulu (override), lalu per-kelas, per-lembaga, default
        let nominal = Number((j.nominal_per_santri || {})[String(sx.id)] || 0)
        const perK = j.nominal_per_kelas || {}
        if (nominal === 0)
          for (const [lemb, ks] of [
            [sx.lembaga, sx.kelas],
            [sx.lembaga_sekolah, sx.kelas_sekolah]
          ]) {
            if (!lemb) continue
            const inner = perK[lemb] || {}
            const v = Number(inner[ks] || 0)
            if (v > 0) {
              nominal = v
              break
            }
          }
        if (nominal === 0) {
          const perL = j.nominal_per_lembaga || {}
          nominal =
            Number(perL[sx.lembaga] || perL[sx.lembaga_sekolah] || 0) ||
            Number(j.nominal_default || 0)
        }
        if (nominal <= 0) {
          skipped++
          continue
        }
        try {
          const idPeriode = tahunan
            ? `TA${taStart}`
            : `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
          const id = `tagihan_${sx.id}_${j.id}_${idPeriode}`
          await setOne('keuangan_tagihan', id, {
            id,
            santri_id: String(sx.id),
            santri_nama: sx.nama || '',
            kategori: j.label || j.id || 'Tagihan',
            periode,
            nominal,
            terbayar: 0,
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
    toast.success(
      `Auto-generate: ${created} dibuat, ${skipped} skip${errCount ? `, ${errCount} gagal` : ''}`
    )
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
// pos dana tagihan ('' = kas umum | 'kegiatan' | 'buku' | 'tabungan_wajib'), auto dari jenis
const genPos = ref('')
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

const _GEN_BULAN_NM = [
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

async function openGenKhusus() {
  // reset state tiap buka
  genJenisId.value = ''
  genKategori.value = ''
  genPos.value = ''
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
    genSantriAktif.value = (await getAll('santri')).filter(
      (x) => x.aktif !== false && _inMyGedung(x)
    )
  } catch (e) {
    toast.error('Gagal memuat data santri: ' + (e.message || e))
  }
}

function onGenPickJenis() {
  const j = jenisList.value.find((x) => x.id === genJenisId.value)
  if (j) {
    genKategori.value = j.label || ''
    genPos.value = j.pos || ''
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
        String(s.nama || '')
          .toLowerCase()
          .includes(kw) ||
        String(s.nis || '')
          .toLowerCase()
          .includes(kw)
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
      // v.95.0626: per-santri override dulu
      const perS = Number((j.nominal_per_santri || {})[String(sx.id)] || 0)
      if (perS > 0) return perS
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
    // dedup: kumpulkan tagihan existing (santri+kategori+periode)
    const tagihanAll = await getAll('keuangan_tagihan')
    const existing = new Set()
    for (const t of tagihanAll) {
      existing.add(
        `${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`
      )
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
        await setOne('keuangan_tagihan', id, {
          id,
          santri_id: String(sx.id),
          santri_nama: sx.nama || '',
          kategori,
          periode,
          nominal,
          terbayar: 0,
          status: 'belum',
          pos: genPos.value || '',
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
    toast.success(
      `Selesai: ${created} dibuat, ${skipped} skip${errCount ? `, ${errCount} gagal` : ''}`
    )
    if (created > 0) genOpen.value = false
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    genBusy.value = false
  }
}
</script>
