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

    <!-- Kyai 7 Agu 2026: config keuangan hanya bersumber dari row `settings/keuangan`.
         Bila row itu tak terbaca, seluruh daftar di bawah adalah setelan BAWAAN, bukan
         setelan pesantren — dan menyimpannya akan menimpa yang tersimpan. Peringatannya
         dipasang di atas, sebelum ada yang sempat disunting; `simpan()` juga menolak. -->
    <div
      v-if="settingsStore.isLoaded && !settingsStore.keuanganTerbaca"
      class="rounded-2xl border-2 border-rose-400 bg-rose-50 dark:bg-rose-900/25 p-4"
    >
      <p class="text-sm font-black text-rose-800 dark:text-rose-200">
        <i class="fas fa-triangle-exclamation mr-2"></i>Config keuangan TIDAK terbaca dari server
      </p>
      <p class="text-xs text-rose-800/90 dark:text-rose-200/90 mt-1 leading-relaxed">
        Yang tampil di halaman ini adalah <b>setelan bawaan</b>, bukan setelan pesantren — jenis
        pembayaran, tarif, dan jenis bisyaroh bisa tampak kosong atau salah.
        <b>Jangan menyimpan.</b> Muat ulang halaman; kalau masih begini, keluar lalu masuk lagi
        (sesi bisa kedaluwarsa tanpa pemberitahuan). Penyimpanan sudah dikunci supaya config yang
        tersimpan tak tertimpa.
      </p>
    </div>

    <!-- v.110.0626: Tab navigasi — pecah 7 area jadi 5 tab, tampil 1 per tab (anti-bingung). -->
    <div class="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-0.5">
      <button
        v-for="tb in TABS"
        :key="tb.id"
        type="button"
        :class="[
          'shrink-0 h-9 px-3.5 inline-flex items-center gap-1.5 rounded-xl text-xs font-bold transition',
          activeTab === tb.id
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-card-elevated)]'
        ]"
        @click="setTab(tb.id)"
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
            <!-- Pratinjau DULU (Kyai 3-4 Agu): uang riil sejak 1 Agu, angkanya harus bisa
                 diperiksa sebelum 500-an tagihan terbit. Jalur hitungnya sama persis. -->
            <button
              :disabled="generating || praBusy"
              class="w-full mb-1.5 bg-[var(--bg-card-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] font-bold py-2 rounded-lg text-sm transition cursor-pointer disabled:opacity-50 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              @click="pratinjauGenerate"
            >
              <i class="fas fa-eye mr-1"></i>{{ praBusy ? 'Menghitung...' : 'Pratinjau dulu' }}
            </button>
            <button
              :disabled="generating"
              class="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer disabled:opacity-50"
              @click="autoGenerate"
            >
              <i class="fas fa-sync mr-1"></i
              >{{ generating ? 'Generating...' : 'Generate Bulan Ini' }}
            </button>
          </div>
        </div>

        <!-- v.1.2.x: bulan pertama pencatatan tagihan di AMMU — bulan sebelumnya tak dihitung tunggakan -->
        <div class="mt-3">
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Mulai Tagih di AMMU (bulan pertama pencatatan)
          </label>
          <input
            v-model="form.keuMulaiTagih"
            type="month"
            class="w-full md:w-56 px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
          />
          <p class="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
            Bulan sebelum ini tak muncul merah "belum" di POS dan tak dihitung tunggakan. Kosongkan
            = ikut awal Tahun Ajaran berjalan.
          </p>
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

        <!-- Kyai 7 Agu 2026: simulasi PEMASUKAN bulanan — pasangan simulasi plafon bisyaroh
             (yang itu uang keluar, ini uang masuk). HANYA jenis bulanan. -->
        <div
          class="mt-4 rounded-xl border border-emerald-300/60 bg-emerald-50/60 dark:bg-emerald-900/20"
        >
          <div
            class="px-3 py-2 border-b border-emerald-300/40 flex items-center justify-between gap-2 flex-wrap"
          >
            <p class="text-sm font-black text-emerald-900 dark:text-emerald-200">
              <i class="fas fa-arrow-trend-up mr-2"></i>Simulasi Pemasukan Bulanan
              <span class="font-bold text-[11px]">— hanya jenis bulanan</span>
            </p>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                :disabled="simPemasukanBusy"
                class="text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1"
                @click="hitungSimulasiPemasukan"
              >
                <i :class="['fas', simPemasukanBusy ? 'fa-spinner fa-spin' : 'fa-calculator']"></i>
                {{ simPemasukan ? 'Hitung Ulang' : 'Hitung' }}
              </button>
              <button
                v-if="simPemasukan && simPemasukan.perJenis.length"
                type="button"
                :disabled="simPemasukanExporting"
                class="text-[10px] font-black bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1"
                @click="exportSimulasiPemasukanPdf"
              >
                <i
                  :class="['fas', simPemasukanExporting ? 'fa-spinner fa-spin' : 'fa-file-pdf']"
                ></i>
                PDF
              </button>
            </div>
          </div>
          <div class="px-3 pb-3 pt-2">
            <p
              class="text-[11px] text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed mb-2"
            >
              Perkiraan uang <b>masuk sebulan</b> bila semua santri aktif membayar penuh. Memakai
              <b>tarif yang sedang tampil di layar ini</b> (belum tentu yang tersimpan), jadi Kyai
              bisa mengubah nominal lalu Hitung Ulang. Jenis
              <b>tahunan &amp; manual tidak dihitung</b> — memasukkannya membuat angka bulanan
              tampak jauh lebih besar dari yang benar-benar masuk tiap bulan.
            </p>
            <div v-if="simPemasukan" class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead class="text-[10px] uppercase text-[var(--text-secondary)]">
                  <tr class="border-b border-emerald-300/50">
                    <th class="text-left py-1.5">Jenis</th>
                    <th class="text-right py-1.5">Santri</th>
                    <th class="text-right py-1.5">Rata-rata</th>
                    <th class="text-right py-1.5">Subtotal / bulan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="r in simPemasukan.perJenis"
                    :key="'sp-' + r.jenis_id"
                    class="border-b border-emerald-200/40"
                  >
                    <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">{{ r.label }}</td>
                    <td class="text-right tabular-nums">{{ r.santri }}</td>
                    <td class="text-right tabular-nums whitespace-nowrap">
                      Rp {{ Number(r.rata || 0).toLocaleString('id-ID') }}
                    </td>
                    <td class="text-right font-black tabular-nums whitespace-nowrap">
                      Rp {{ Number(r.subtotal || 0).toLocaleString('id-ID') }}
                    </td>
                  </tr>
                  <tr v-if="!simPemasukan.perJenis.length">
                    <td
                      colspan="4"
                      class="py-4 text-center text-[var(--text-tertiary)] text-[11px]"
                    >
                      Tak ada jenis bulanan yang mengenai santri mana pun.
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t-2 border-emerald-400">
                    <td class="py-2 font-black text-[var(--text-primary)]">TOTAL / BULAN</td>
                    <td class="text-right text-[10px] text-[var(--text-secondary)]">
                      {{ simPemasukan.santriKena }} / {{ simPemasukan.santriTotal }}
                    </td>
                    <td></td>
                    <td
                      class="text-right text-base font-black text-emerald-900 dark:text-emerald-200 whitespace-nowrap"
                    >
                      Rp {{ Number(simPemasukan.total || 0).toLocaleString('id-ID') }}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <p class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
                <i class="fas fa-circle-info mr-1"></i>{{ simPemasukan.santriKena }} dari
                {{ simPemasukan.santriTotal }} santri aktif kena tagihan bulanan. Yang tak kena
                biasanya karena whitelist lembaga/status jenisnya, atau tarifnya masih 0.
              </p>
            </div>
          </div>
        </div>

        <!-- v.94.0626: Generate Tagihan Khusus (infaq/iuran sekali-jalan, target fleksibel) -->
        <div class="mt-3">
          <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
            Tagihan Khusus (Infaq / Iuran — sekali jalan)
          </label>
          <button
            class="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition cursor-pointer"
            @click="openGenKhusus"
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
            class="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg hover:bg-teal-100"
            @click="bukaPengaturanPrinter"
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
            type="button"
            class="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
            @click="unduhTemplateJenis"
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
              :disabled="imporJenisBusy"
              @change="imporJenis"
            />
          </label>
        </div>
        <!-- v.1.1.x: model tabel (gaya Braja Soft) + Tahun Ajaran + Salin + Tambah/Ubah/Hapus + dialog -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[11px] font-bold text-[var(--text-secondary)] whitespace-nowrap">
              <i class="fas fa-calendar-alt mr-1 text-teal-500"></i>Tahun Ajaran
            </span>
            <select
              v-model="taAktif"
              class="text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-card-elevated)] border border-[var(--border-default)] rounded-lg px-2 py-1.5 outline-none"
            >
              <option v-for="ta in TA_LIST" :key="ta" :value="ta">
                {{ ta }}{{ ta === taBerjalan ? ' — berjalan' : '' }}
              </option>
            </select>
            <button
              class="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
              title="Salin semua jenis + tarif ke tahun ajaran berikutnya"
              @click="salinTahunAjaran"
            >
              <i class="fas fa-copy"></i>Salin ke {{ taBerikut }}
            </button>
          </div>
          <button
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
            @click="openJenisBaru"
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
                      class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                      title="Ubah"
                      @click="openJenisDialog(jenis)"
                    >
                      <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button
                      :disabled="jenis.id === 'syahriyah'"
                      :title="jenis.id === 'syahriyah' ? 'Jenis dasar — tak bisa dihapus' : 'Hapus'"
                      class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                      @click="removeJenis(idx)"
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
      <!-- v.1.1.9: Jenis Bisyaroh — MENGGANTIKAN 5 tarif shift global + 75 baris pokok per guru.
           Nominal kini ditentukan lembaga & tugas, bukan diketik per orang. -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <p class="text-[11px] text-[var(--text-secondary)] italic">
          <i class="fas fa-info-circle mr-1"></i>Kriteria yang dikosongkan
          <b>tidak menyaring</b> (berlaku semua). Semua jenis yang cocok dijumlahkan.
        </p>
        <div class="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
            title="Unduh Excel (berisi data saat ini — bisa diisi lalu diimpor)"
            @click="unduhTemplateJenisBisyaroh"
          >
            <i class="fas fa-file-excel"></i>Template
          </button>
          <label
            class="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer"
          >
            <i class="fas fa-file-import"></i>{{ imporJenisBsyBusy ? 'Impor…' : 'Impor' }}
            <input
              type="file"
              accept=".xlsx,.xls"
              class="hidden"
              :disabled="imporJenisBsyBusy"
              @change="imporJenisBisyaroh"
            />
          </label>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
            @click="openJenisBisyarohBaru"
          >
            <i class="fas fa-plus"></i>Tambah
          </button>
        </div>
      </div>
      <div class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto">
        <table class="w-full text-sm min-w-[720px]">
          <thead>
            <tr
              class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              <th class="text-left px-3 py-2.5 font-black w-10">No</th>
              <th class="text-left px-3 py-2.5 font-black">Nama Jenis</th>
              <th class="text-left px-3 py-2.5 font-black">Hitungan</th>
              <th class="text-left px-3 py-2.5 font-black">Jabatan</th>
              <th class="text-left px-3 py-2.5 font-black">Lembaga</th>
              <th class="text-left px-3 py-2.5 font-black">Shift</th>
              <th class="text-right px-3 py-2.5 font-black">Nominal</th>
              <th class="text-center px-3 py-2.5 font-black w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-subtle)]">
            <tr
              v-for="(j, idx) in jenisBisyarohList"
              :key="j.id || idx"
              :class="[
                'hover:bg-[var(--bg-card-elevated)] transition',
                j.aktif ? '' : 'opacity-50'
              ]"
            >
              <td class="px-3 py-2 text-[var(--text-tertiary)]">{{ idx + 1 }}</td>
              <td class="px-3 py-2 font-bold text-[var(--text-primary)]">
                {{ j.label }}
                <span v-if="!j.aktif" class="text-[9px] font-normal italic">(nonaktif)</span>
              </td>
              <td class="px-3 py-2">
                <span
                  :class="[
                    'text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap',
                    j.hitungan === 'per_hadir'
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200'
                      : j.hitungan === 'per_tepat'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                        : j.hitungan === 'per_jp'
                          ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200'
                          : j.hitungan === 'per_shift'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200'
                  ]"
                  >{{
                    j.hitungan === 'per_hadir'
                      ? '× hadir'
                      : j.hitungan === 'per_tepat'
                        ? '× tepat'
                        : j.hitungan === 'per_jp'
                          ? '× JP'
                          : j.hitungan === 'per_shift'
                            ? '× Shift'
                            : 'Flat'
                  }}</span
                >
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ scopeText(j.scope.jabatan) }}
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ scopeText(j.scope.lembaga) }}
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ scopeText(j.scope.shift.map(shiftLabelById)) }}
              </td>
              <td class="px-3 py-2 text-right font-bold text-[var(--text-primary)]">
                Rp {{ Number(j.nominal).toLocaleString('id-ID') }}
              </td>
              <td class="px-3 py-2">
                <div class="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                    title="Ubah"
                    @click="openJenisBisyarohDialog(j, idx)"
                  >
                    <i class="fas fa-pen text-xs"></i>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center"
                    title="Hapus"
                    @click="hapusJenisBisyaroh(idx)"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="jenisBisyarohList.length === 0">
              <td colspan="8" class="text-center text-[var(--text-tertiary)] italic py-6">
                Belum ada Jenis Bisyaroh. Klik "Tambah Jenis Bisyaroh" — mis. "Bisyaroh Pokok Guru
                PTPT" (Flat, jabatan Guru + lembaga PTPT) atau "Bonus Kehadiran Pagi" (× hadir,
                shift Pagi).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="tumpangTindihJenis.length > 0"
        class="mt-2 text-[11px] bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-lg px-3 py-2"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>
        <b>Tumpang tindih:</b> lebih dari satu jenis "× hadir" mengenai shift yang sama — nominalnya
        <b>dijumlahkan</b>, bukan saling menimpa.
        <span v-for="t in tumpangTindihJenis" :key="t.shift" class="block ml-4">
          · {{ shiftLabelById(t.shift) }}: {{ t.labels.join(' + ') }}
        </span>
      </div>

      <!-- Glondongan PTPT tetap terpisah: dihitung per JUZ disimak, bukan per shift/tugas -->
      <div class="mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block">
          Bisyaroh Glondongan PTPT — per Juz Disimak
        </label>
        <input
          v-model="form.keu_glondongan_per_juz"
          type="text"
          inputmode="numeric"
          placeholder="mis. 5.000"
          class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
          @input="onFmtChange($event, 'keu_glondongan_per_juz')"
        />
        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
          Tarif per juz yang disimak penguji glondongan/berjalan — di luar Jenis Bisyaroh karena
          dihitung per juz, bukan per tugas/shift. Rekap ada di layar Glondongan PTPT.
        </p>
      </div>
    </div>

    <!-- v.1.1.9: Dialog Tambah/Ubah Jenis Bisyaroh -->
    <div
      v-if="dlgJbOpen && dlgJb"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgJbOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]"
        >
          <h3 class="text-base font-black">
            <i class="fas fa-hand-holding-usd text-cyan-500 mr-1.5"></i
            >{{ dlgJbIsNew ? 'Tambah' : 'Ubah' }} Jenis Bisyaroh
          </h3>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgJbOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nama Jenis</label
            >
            <input
              v-model="dlgJb.label"
              type="text"
              placeholder="mis. Bisyaroh Pokok Guru PTPT"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
            />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Cara Hitung</label
              >
              <div class="grid grid-cols-2 gap-1.5">
                <button
                  v-for="o in HITUNGAN_OPTIONS"
                  :key="o.value"
                  type="button"
                  :class="[
                    'py-2 rounded-lg text-xs font-bold border transition',
                    dlgJb.hitungan === o.value
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                  ]"
                  @click="dlgJb.hitungan = o.value"
                >
                  {{ o.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Nominal (Rp)</label
              >
              <input
                v-model.number="dlgJb.nominal"
                type="number"
                min="0"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
              />
            </div>
          </div>
          <p class="text-[10px] text-[var(--text-secondary)] italic">
            <i class="fas fa-info-circle mr-1"></i>
            {{
              dlgJb.hitungan === 'per_hadir'
                ? 'Dikali jumlah hadir shift dari absensi (hadir + terlambat). Shift dikosongkan = semua shift orang itu dijumlahkan.'
                : dlgJb.hitungan === 'per_tepat'
                  ? 'Dikali jumlah hadir TEPAT WAKTU saja (status hadir, BUKAN terlambat). Untuk Bonus Tepat Waktu — yang terlambat tak dapat untuk shift itu.'
                  : dlgJb.hitungan === 'per_jp'
                    ? 'Tarif = per JP per PERTEMUAN. JP mingguan disebar ke hari aktif lembaga, lalu dikalikan tiap hari guru masuk — di bulan berisi 24 hari efektif hasilnya ±4× JP mingguan. Isi scope lembaga.'
                    : dlgJb.hitungan === 'per_jp_bulanan'
                      ? 'Tarif = per JP per BULAN. Nominal = JP/minggu (menu Beban Mengajar) × tarif, lalu dipotong prorata kehadiran (hadir 90% → 90% nominal). Mis. 30 JP/minggu × Rp 20.000 = Rp 600.000/bulan. Isi scope lembaga.'
                      : dlgJb.hitungan === 'per_shift'
                        ? 'Nominal × JUMLAH shift guru yang cocok. Mengajar pagi + sore (scope Pagi,Sore) = 2× nominal. Cocok utk bisyaroh pokok per shift.'
                        : 'Dibayar sekali per bulan bila cocok scope.'
            }}
          </p>
          <div class="border-t border-[var(--border-subtle)] pt-3 space-y-3">
            <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase">
              Berlaku Untuk — kosongkan = semua
            </p>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Jabatan</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="j in jabatanScopeOptions"
                  :key="'sj-' + j"
                  type="button"
                  :class="chipCls(dlgJb.scope.jabatan.includes(j))"
                  @click="toggleScope('jabatan', j)"
                >
                  {{ j }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Lembaga / Unit</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="l in lembagaScopeOptions"
                  :key="'sl-' + l"
                  type="button"
                  :class="chipCls(dlgJb.scope.lembaga.includes(l))"
                  @click="toggleScope('lembaga', l)"
                >
                  {{ l }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Shift</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="s in shiftScopeOptions"
                  :key="'ss-' + s.id"
                  type="button"
                  :class="chipCls(dlgJb.scope.shift.includes(s.id))"
                  @click="toggleScope('shift', s.id)"
                >
                  {{ s.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Per Orang (guru)</label
              >
              <div class="grid grid-cols-2 gap-1.5 mb-1.5">
                <button
                  type="button"
                  :class="[
                    'py-1.5 rounded-lg text-xs font-bold border transition',
                    (dlgJb.scope.guru_ids || []).length === 0
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                  ]"
                  @click="semuaGuruJb"
                >
                  Semua (ikut scope di atas)
                </button>
                <button
                  type="button"
                  :class="[
                    'py-1.5 rounded-lg text-xs font-bold border transition',
                    (dlgJb.scope.guru_ids || []).length > 0
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                  ]"
                  @click="dlgJbPilihGuru = true"
                >
                  Orang tertentu ({{ (dlgJb.scope.guru_ids || []).length }})
                </button>
              </div>
              <div v-if="(dlgJb.scope.guru_ids || []).length > 0 || dlgJbPilihGuru">
                <input
                  v-model="dlgJbGuruSearch"
                  type="text"
                  placeholder="Cari nama guru/pegawai…"
                  class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1.5"
                />
                <div
                  class="max-h-44 overflow-y-auto space-y-0.5 border border-[var(--border-subtle)] rounded-lg p-1.5"
                >
                  <label
                    v-for="g in dlgJbGuruCari"
                    :key="g.id"
                    class="flex items-center gap-2 text-xs cursor-pointer px-2 py-1.5 rounded hover:bg-[var(--bg-card-elevated)]"
                  >
                    <input
                      type="checkbox"
                      :checked="(dlgJb.scope.guru_ids || []).map(String).includes(String(g.id))"
                      class="w-4 h-4 accent-teal-600"
                      @change="toggleGuruJb(g.id)"
                    />
                    <span class="font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</span>
                    <span class="text-[10px] text-[var(--text-tertiary)] ml-auto">{{
                      g.lembaga || g.lembaga_sekolah || '-'
                    }}</span>
                  </label>
                </div>
                <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
                  Kosongkan semua centang = "Semua" (pakai scope jabatan/lembaga/shift di atas).
                </p>
              </div>
            </div>
            <label class="flex items-center gap-2 text-xs font-bold cursor-pointer pt-1">
              <input v-model="dlgJb.aktif" type="checkbox" class="w-4 h-4 accent-teal-600" />
              Aktif — ikut dihitung saat generate slip
            </label>
          </div>
        </div>
        <div
          class="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] rounded-b-2xl"
        >
          <button
            type="button"
            class="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgJbOpen = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-black rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            @click="simpanJenisBisyaroh"
          >
            <i class="fas fa-check mr-1"></i>Terapkan
          </button>
        </div>
      </div>
    </div>

    <!-- Beban Mengajar Sekolah (dasar bisyaroh per_jp) -->
    <div
      v-show="activeTab === 'beban'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h3
            class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
          >
            <i class="fas fa-book text-teal-600 mr-1"></i>Beban Mengajar Sekolah
          </h3>
          <p class="text-[11px] text-[var(--text-secondary)] mt-1">
            Cukup isi <b>JP per minggu</b> tiap guru di tiap sekolah — tak perlu dirinci per mapel.
            Bisyaroh sekolah = tarif × JP yang <b>benar-benar diajar</b> (Jenis Bisyaroh "× JP
            diajar"). JP dibagi rata ke hari aktif sekolah, jadi guru yang tidak masuk terpotong
            porsi hari itu; hari libur & di luar hari aktif tidak dihitung absen. Total:
            <b>{{ bebanTotalJP }}</b> JP/minggu.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)] font-bold px-3 py-2 rounded-lg text-xs"
            @click="unduhTemplateBeban"
          >
            <i class="fas fa-file-download"></i>Template
          </button>
          <label
            class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-lg text-xs cursor-pointer"
            :class="imporBebanBusy ? 'opacity-50 pointer-events-none' : ''"
          >
            <i :class="['fas', imporBebanBusy ? 'fa-spinner fa-spin' : 'fa-file-import']"></i>Impor
            <input type="file" accept=".xlsx,.xls,.csv" class="hidden" @change="imporBebanExcel" />
          </label>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)] font-bold px-3 py-2 rounded-lg text-xs"
            @click="exportBebanExcel"
          >
            <i class="fas fa-file-export"></i>Ekspor
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
            @click="openBebanBaru"
          >
            <i class="fas fa-plus"></i>Tambah
          </button>
        </div>
      </div>
      <div class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto">
        <table class="w-full text-sm min-w-[640px]">
          <thead>
            <tr
              class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              <th class="text-left px-3 py-2.5 font-black w-10">No</th>
              <th class="text-left px-3 py-2.5 font-black">Guru</th>
              <th class="text-left px-3 py-2.5 font-black">Lembaga</th>
              <th class="text-right px-3 py-2.5 font-black w-28">JP/minggu</th>
              <th class="text-center px-3 py-2.5 font-black w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-subtle)]">
            <tr
              v-for="(b, idx) in bebanMengajarList"
              :key="idx"
              class="hover:bg-[var(--bg-card-elevated)] transition"
            >
              <td class="px-3 py-2 text-[var(--text-tertiary)]">{{ idx + 1 }}</td>
              <td class="px-3 py-2 font-bold text-[var(--text-primary)]">
                {{ namaGuruById(b.guru_id) }}
              </td>
              <td class="px-3 py-2 text-[var(--text-secondary)]">{{ b.lembaga || '-' }}</td>
              <td class="px-3 py-2 text-right font-mono font-bold">{{ b.jp_minggu }}</td>
              <td class="px-3 py-2">
                <div class="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                    title="Ubah"
                    @click="openBebanDialog(b, idx)"
                  >
                    <i class="fas fa-pen text-xs"></i>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center"
                    title="Hapus"
                    @click="hapusBeban(idx)"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="bebanMengajarList.length === 0">
              <td colspan="5" class="text-center text-[var(--text-tertiary)] italic py-6">
                Belum ada beban mengajar. Klik "Tambah" atau "Impor" (kolom: guru_id/nama, lembaga,
                jp_minggu).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- v.1.2.1: hari aktif = PENYEBUT prorata JP. Cukup diatur sekali per sekolah. -->
      <div class="mt-4 pt-4 border-t border-[var(--border-subtle)]">
        <h4
          class="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-widest mb-1"
        >
          <i class="fas fa-calendar-week text-teal-600 mr-1"></i>Hari Aktif Sekolah
        </h4>
        <p class="text-[11px] text-[var(--text-secondary)] mb-3">
          Hari sekolah benar-benar masuk. Dipakai membagi JP/minggu jadi JP per hari — hari yang
          <b>tidak</b> dicentang tak pernah dihitung sebagai absen. Kalau tak diatur, dianggap semua
          hari kecuali Jumat.
        </p>
        <div
          v-if="sekolahLembagaList.length === 0"
          class="text-xs text-[var(--text-tertiary)] italic"
        >
          Belum ada lembaga bertipe "Formal (Sekolah)" di Master Data.
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="lemb in sekolahLembagaList"
            :key="'ha-' + lemb"
            class="flex flex-wrap items-center gap-2"
          >
            <span class="text-xs font-bold text-[var(--text-primary)] w-24 shrink-0">{{
              lemb
            }}</span>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="(hl, d) in HARI_LABELS"
                :key="'ha-' + lemb + '-' + d"
                type="button"
                :class="[
                  'px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition',
                  hariAktifFor(lemb).includes(d)
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                ]"
                @click="toggleHariAktif(lemb, d)"
              >
                {{ hl.slice(0, 3) }}
              </button>
            </div>
            <span class="text-[10px] text-[var(--text-tertiary)] italic"
              >{{ hariAktifFor(lemb).length }} hari/minggu</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog Tambah/Ubah Beban Mengajar -->
    <div
      v-if="dlgBebanOpen && dlgBeban"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgBebanOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]"
        >
          <h3 class="text-base font-black">
            <i class="fas fa-book text-teal-500 mr-1.5"></i>{{ dlgBebanIsNew ? 'Tambah' : 'Ubah' }}
            Beban Mengajar
          </h3>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgBebanOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Guru</label
            >
            <select
              v-model="dlgBeban.guru_id"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            >
              <option value="">— pilih guru —</option>
              <option v-for="g in guruAktifOptions" :key="g.id" :value="String(g.id)">
                {{ g.nama }}
              </option>
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Lembaga (sekolah)</label
            >
            <select
              v-model="dlgBeban.lembaga"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            >
              <option value="">— pilih lembaga —</option>
              <option v-for="l in lembagaScopeOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Jam Pelajaran per Minggu</label
            >
            <input
              v-model.number="dlgBeban.jp_minggu"
              type="number"
              min="0"
              step="0.5"
              placeholder="mis. 24"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
            />
            <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
              Total JP guru ini di sekolah tsb dalam sepekan — gabungan semua mapel, tak perlu
              dirinci. {{ rincianPerHariBeban }}
            </p>
          </div>
        </div>
        <div
          class="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] rounded-b-2xl"
        >
          <button
            type="button"
            class="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgBebanOpen = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-black rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            @click="simpanBeban"
          >
            <i class="fas fa-check mr-1"></i>Terapkan
          </button>
        </div>
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
                class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"
                @click="removeKategori('masuk', idx)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newKatMasuk"
              type="text"
              class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              @keyup.enter="addKategori('masuk')"
            />
            <button
              class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-2 rounded-lg text-xs"
              @click="addKategori('masuk')"
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
                class="text-rose-600 hover:bg-rose-50 px-2 rounded text-xs"
                @click="removeKategori('keluar', idx)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newKatKeluar"
              type="text"
              class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
              @keyup.enter="addKategori('keluar')"
            />
            <button
              class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-2 rounded-lg text-xs"
              @click="addKategori('keluar')"
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
              class="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 rounded text-xs"
              @click="removeTabunganKat(idx)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newKatTabungan"
            type="text"
            placeholder="Tambah kategori tabungan…"
            class="flex-1 px-3 py-2 text-xs border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            @keyup.enter="addTabunganKat"
          />
          <button
            class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-2 rounded-lg text-xs"
            @click="addTabunganKat"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Kyai 7 Agu 2026: JENIS TUNJANGAN ber-scope — "dimiripkan pengaturan bisyaroh".
         Menggantikan Master Tunjangan lama yang cuma nama+nominal+daftar orang. -->
    <div
      v-show="secVisible('bisyaroh')"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i class="fas fa-plus-circle text-emerald-600 mr-1"></i>Jenis Tunjangan
        </h3>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
          @click="openJenisTunjanganBaru"
        >
          <i class="fas fa-plus"></i>Tambah Tunjangan
        </button>
      </div>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-2">
        Bentuknya sama dengan Jenis Bisyaroh: nominal ditentukan <b>jabatan &amp; lembaga</b>, bukan
        diketik per orang. Tiap jenis yang cocok = satu baris tunjangan di slip, semuanya
        dijumlahkan. Tunjangan pengabdian membaca <b>Tgl. Tugas</b> di data guru — yang kosong tak
        terbit.
      </p>
      <div class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto">
        <table class="w-full text-sm min-w-[560px]">
          <thead>
            <tr
              class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              <th class="text-left px-3 py-2.5 font-black w-10">No</th>
              <th class="text-left px-3 py-2.5 font-black">Nama</th>
              <th class="text-left px-3 py-2.5 font-black">Cara Hitung &amp; Syarat</th>
              <th class="text-right px-3 py-2.5 font-black">Nominal</th>
              <th class="text-left px-3 py-2.5 font-black">Berlaku</th>
              <th class="text-center px-3 py-2.5 font-black w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-subtle)]">
            <tr
              v-for="(j, idx) in jenisTunjanganListRef"
              :key="'tj-' + j.id + idx"
              class="hover:bg-[var(--bg-card-elevated)] transition"
              :class="{ 'opacity-50': j.aktif === false }"
            >
              <td class="px-3 py-2 text-[var(--text-tertiary)]">{{ idx + 1 }}</td>
              <td class="px-3 py-2 font-bold text-[var(--text-primary)]">
                {{ j.label }}
                <span v-if="j.aktif === false" class="text-[9px] font-black text-rose-500"
                  >NONAKTIF</span
                >
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ tunjanganCaraLabel(j) }}
              </td>
              <td class="px-3 py-2 text-right font-bold text-emerald-700 dark:text-emerald-300">
                Rp {{ Number(j.nominal || 0).toLocaleString('id-ID') }}
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ tunjanganScopeLabel(j) }}
              </td>
              <td class="px-3 py-2">
                <div class="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                    title="Ubah"
                    @click="openJenisTunjanganDialog(j, idx)"
                  >
                    <i class="fas fa-pen text-xs"></i>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center"
                    title="Hapus"
                    @click="hapusJenisTunjangan(idx)"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="jenisTunjanganListRef.length === 0">
              <td colspan="6" class="text-center text-[var(--text-tertiary)] italic py-5">
                Belum ada. Klik "Tambah Tunjangan" — mis. "Tunjangan Kepala Lembaga", "Tunjangan
                Pengabdian", atau "Tunjangan Berprestasi".
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dialog Tambah/Ubah Jenis Tunjangan -->
    <div
      v-if="dlgTjOpen && dlgTj"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgTjOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]"
        >
          <h3 class="text-base font-black">
            <i class="fas fa-plus-circle text-emerald-600 mr-1.5"></i
            >{{ dlgTjIsNew ? 'Tambah' : 'Ubah' }} Tunjangan
          </h3>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgTjOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nama Tunjangan</label
            >
            <input
              v-model="dlgTj.label"
              type="text"
              placeholder="mis. Tunjangan Kepala Lembaga"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
            />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Cara Hitung</label
              >
              <div class="grid grid-cols-2 gap-1.5">
                <button
                  v-for="o in HITUNGAN_TUNJANGAN_OPTIONS"
                  :key="o.value"
                  type="button"
                  :class="[
                    'py-2 rounded-lg text-[11px] font-bold border transition',
                    dlgTj.hitungan === o.value
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                  ]"
                  @click="dlgTj.hitungan = o.value"
                >
                  {{ o.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Nominal (Rp)</label
              >
              <input
                v-model.number="dlgTj.nominal"
                type="number"
                min="0"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
              />
              <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
                {{
                  dlgTj.hitungan === 'per_tahun_pengabdian'
                    ? 'Nominal PER TAHUN mengabdi — dikalikan tahunnya tiap bulan.'
                    : 'Nominal per bulan.'
                }}
              </p>
            </div>
          </div>
          <p class="text-[10px] text-[var(--text-secondary)] italic">
            <i class="fas fa-info-circle mr-1"></i>
            {{ HITUNGAN_TUNJANGAN_OPTIONS.find((o) => o.value === dlgTj.hitungan)?.hint || '' }}
          </p>

          <div
            class="border-t border-[var(--border-subtle)] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Minimal Masa Pengabdian (tahun)</label
              >
              <input
                v-model.number="dlgTj.syarat.masa_min_tahun"
                type="number"
                min="0"
                max="60"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
              />
              <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
                0 = tanpa syarat. Isi 5 untuk "khusus yang mengabdi di atas 5 tahun". Guru yang
                <b>Tgl. Tugas</b>-nya kosong tidak lolos.
              </p>
            </div>
            <div v-if="dlgTj.hitungan === 'flat_prestasi'">
              <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
                >Ambang Tepat Waktu (%)</label
              >
              <input
                v-model.number="dlgTj.syarat.persen_tepat_min"
                type="number"
                min="1"
                max="100"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
              />
              <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
                100 = harus hadir tepat waktu di SEMUA hari efektif bulan itu. Izin/sakit/cuti ikut
                memotong.
              </p>
            </div>
          </div>

          <div class="border-t border-[var(--border-subtle)] pt-3 space-y-3">
            <p class="text-[10px] font-black text-[var(--text-secondary)] uppercase">
              Berlaku Untuk — kosongkan = semua
            </p>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Jabatan</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="j in jabatanScopeOptions"
                  :key="'tj-j-' + j"
                  type="button"
                  :class="chipCls(dlgTj.scope.jabatan.includes(j))"
                  @click="toggleScopeTj('jabatan', j)"
                >
                  {{ j }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Lembaga / Unit</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="l in lembagaScopeOptions"
                  :key="'tj-l-' + l"
                  type="button"
                  :class="chipCls(dlgTj.scope.lembaga.includes(l))"
                  @click="toggleScopeTj('lembaga', l)"
                >
                  {{ l }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block"
                >Shift</label
              >
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="sh in shiftScopeOptions"
                  :key="'tj-s-' + sh.id"
                  type="button"
                  :class="chipCls(dlgTj.scope.shift.includes(sh.id))"
                  @click="toggleScopeTj('shift', sh.id)"
                >
                  {{ sh.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="flex items-center gap-2 text-[11px] font-bold cursor-pointer">
                <input
                  type="checkbox"
                  :checked="dlgTjPilihGuru"
                  class="w-4 h-4 accent-emerald-600"
                  @change="setPilihGuruTj($event.target.checked)"
                />
                Batasi ke orang tertentu ({{ dlgTj.scope.guru_ids.length }} dipilih)
              </label>
              <div v-if="dlgTjPilihGuru" class="mt-2 space-y-2">
                <input
                  v-model="dlgTjGuruSearch"
                  type="text"
                  placeholder="Cari nama..."
                  class="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)]"
                />
                <div
                  class="max-h-40 overflow-y-auto border border-[var(--border-subtle)] rounded-lg p-2 flex flex-wrap gap-1"
                >
                  <button
                    v-for="g in dlgTjGuruCari"
                    :key="'tj-g-' + g.id"
                    type="button"
                    :class="chipCls(dlgTj.scope.guru_ids.map(String).includes(String(g.id)))"
                    @click="toggleGuruTj(g.id)"
                  >
                    {{ g.nama }}
                  </button>
                </div>
              </div>
            </div>
            <label class="flex items-center gap-2 text-[11px] font-bold cursor-pointer">
              <input v-model="dlgTj.aktif" type="checkbox" class="w-4 h-4 accent-emerald-600" />
              Aktif (nonaktif = tak terbit di slip, tapi tak terhapus)
            </label>
          </div>
        </div>
        <div
          class="flex items-center justify-end gap-2 px-5 py-4 border-t border-[var(--border-subtle)]"
        >
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-xs font-bold border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgTjOpen = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white"
            @click="simpanJenisTunjangan"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- v.1.1.9: Master Potongan — tabel + dialog (ganti layout inline lama
         yang field nama-nya transparan/tak kelihatan & pemilih guru sesak). -->
    <div
      v-for="cfg in [
        {
          kind: 'potongan',
          list: form.master_potongan,
          judul: 'Master Potongan',
          ikon: 'fa-minus-circle text-rose-600',
          nomCls: 'text-rose-700 dark:text-rose-300'
        }
      ]"
      v-show="secVisible('bisyaroh')"
      :key="cfg.kind"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <h3
          class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest"
        >
          <i :class="['fas mr-1', cfg.ikon]"></i>{{ cfg.judul }}
        </h3>
        <div class="flex items-center gap-1.5 flex-wrap">
          <!-- Template & Impor mencakup Tunjangan + Potongan sekaligus → tampil sekali (di kartu Tunjangan) -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
            title="Unduh Excel Potongan (berisi data saat ini)"
            @click="unduhTemplateMasterTP"
          >
            <i class="fas fa-file-excel"></i>Template
          </button>
          <label
            class="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer"
          >
            <i class="fas fa-file-import"></i>{{ imporMasterBusy ? 'Impor…' : 'Impor' }}
            <input
              type="file"
              accept=".xlsx,.xls"
              class="hidden"
              :disabled="imporMasterBusy"
              @change="imporMasterTP"
            />
          </label>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-xs"
            @click="openMasterBaru(cfg.kind)"
          >
            <i class="fas fa-plus"></i>Tambah
          </button>
        </div>
      </div>
      <p class="text-[10px] text-[var(--text-tertiary)] italic mb-2">
        Otomatis memotong slip bisyaroh guru sesuai scope. Tunjangan kini punya kartunya sendiri di
        atas (ber-scope seperti Jenis Bisyaroh).
      </p>
      <div class="border border-[var(--border-subtle)] rounded-xl overflow-hidden overflow-x-auto">
        <table class="w-full text-sm min-w-[480px]">
          <thead>
            <tr
              class="bg-[var(--bg-card-elevated)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
            >
              <th class="text-left px-3 py-2.5 font-black w-10">No</th>
              <th class="text-left px-3 py-2.5 font-black">Nama</th>
              <th class="text-right px-3 py-2.5 font-black">Nominal</th>
              <th class="text-left px-3 py-2.5 font-black">Berlaku</th>
              <th class="text-center px-3 py-2.5 font-black w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-subtle)]">
            <tr
              v-for="(item, idx) in cfg.list"
              :key="idx"
              class="hover:bg-[var(--bg-card-elevated)] transition"
            >
              <td class="px-3 py-2 text-[var(--text-tertiary)]">{{ idx + 1 }}</td>
              <td class="px-3 py-2 font-bold text-[var(--text-primary)]">
                {{ item.nama || '(tanpa nama)' }}
              </td>
              <td :class="['px-3 py-2 text-right font-bold', cfg.nomCls]">
                Rp {{ Number(item.nominal || 0).toLocaleString('id-ID') }}
              </td>
              <td class="px-3 py-2 text-[11px] text-[var(--text-secondary)]">
                {{ masterScopeLabel(item) }}
              </td>
              <td class="px-3 py-2">
                <div class="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 flex items-center justify-center"
                    title="Ubah"
                    @click="openMasterDialog(cfg.kind, item, idx)"
                  >
                    <i class="fas fa-pen text-xs"></i>
                  </button>
                  <button
                    type="button"
                    class="w-7 h-7 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center"
                    title="Hapus"
                    @click="removeMaster(cfg.kind, idx)"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="cfg.list.length === 0">
              <td colspan="5" class="text-center text-[var(--text-tertiary)] italic py-5">
                Belum ada. Klik "Tambah".
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Dialog Tambah/Ubah Tunjangan/Potongan -->
    <div
      v-if="dlgMasterOpen && dlgMaster"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="dlgMasterOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]"
        >
          <h3 class="text-base font-black">
            <i
              :class="[
                'fas mr-1.5',
                dlgMasterKind === 'tunjangan'
                  ? 'fa-plus-circle text-emerald-600'
                  : 'fa-minus-circle text-rose-600'
              ]"
            ></i
            >{{ dlgMasterIsNew ? 'Tambah' : 'Ubah' }}
            {{ dlgMasterKind === 'tunjangan' ? 'Tunjangan' : 'Potongan' }}
          </h3>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgMasterOpen = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nama {{ dlgMasterKind === 'tunjangan' ? 'Tunjangan' : 'Potongan' }}</label
            >
            <input
              v-model="dlgMaster.nama"
              type="text"
              :placeholder="
                dlgMasterKind === 'tunjangan' ? 'mis. Tunjangan Transport' : 'mis. Kasbon'
              "
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold"
            />
          </div>
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Nominal (Rp)</label
            >
            <input
              v-model.number="dlgMaster.nominal"
              type="number"
              min="0"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] font-bold text-right"
            />
          </div>
          <div class="border-t border-[var(--border-subtle)] pt-3">
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 block"
              >Berlaku Untuk</label
            >
            <div class="grid grid-cols-2 gap-1.5 mb-2">
              <button
                type="button"
                :class="[
                  'py-2 rounded-lg text-xs font-bold border transition',
                  dlgMaster.guru_ids.length === 0
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                ]"
                @click="dlgMaster.guru_ids = []"
              >
                Semua guru/pegawai
              </button>
              <button
                type="button"
                :class="[
                  'py-2 rounded-lg text-xs font-bold border transition',
                  dlgMaster.guru_ids.length > 0
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                ]"
                @click="dlgMasterPilih = true"
              >
                Guru tertentu ({{ dlgMaster.guru_ids.length }})
              </button>
            </div>
            <div v-if="dlgMaster.guru_ids.length > 0 || dlgMasterPilih">
              <input
                v-model="dlgMasterSearch"
                type="text"
                placeholder="Cari nama guru/pegawai…"
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-1.5"
              />
              <div
                class="max-h-52 overflow-y-auto space-y-0.5 border border-[var(--border-subtle)] rounded-lg p-1.5"
              >
                <label
                  v-for="g in dlgMasterGuruCari"
                  :key="g.id"
                  class="flex items-center gap-2 text-xs cursor-pointer px-2 py-1.5 rounded hover:bg-[var(--bg-card-elevated)]"
                >
                  <input
                    type="checkbox"
                    :checked="dlgMaster.guru_ids.map(String).includes(String(g.id))"
                    class="w-4 h-4 accent-teal-600"
                    @change="toggleGuruDlg(g.id)"
                  />
                  <span class="font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</span>
                  <span class="text-[10px] text-[var(--text-tertiary)] ml-auto">{{
                    g.lembaga || g.lembaga_sekolah || '-'
                  }}</span>
                </label>
              </div>
              <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
                Kosongkan semua centang = kembali ke "Semua guru/pegawai".
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex justify-end gap-2 px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] rounded-b-2xl"
        >
          <button
            type="button"
            class="px-4 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgMasterOpen = false"
          >
            Batal
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-black rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            @click="simpanMaster"
          >
            <i class="fas fa-check mr-1"></i>Terapkan
          </button>
        </div>
      </div>
    </div>

    <!-- Potongan POS — Kyai 5 Agu 2026: "potongan diskon syahriyah (per item) jangan di data
         santri dan jenis syahriyah, tapi di POS saja setiap transaksi tinggal pilih
         diskon/potongannya". Daftar di sini = pilihan siap pakai bagi kasir; angkanya masih
         boleh disesuaikan per transaksi untuk kasus khusus. -->
    <div
      v-show="activeTab === 'kategori'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3
        class="text-xs md:text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-1 border-b border-[var(--border-subtle)] pb-2"
      >
        <i class="fas fa-scissors text-rose-600 mr-1"></i>Potongan POS
      </h3>
      <p class="text-[11px] text-[var(--text-secondary)] mb-3">
        Dipakai kasir saat menerima pembayaran, dipilih <b>per baris</b> (per jenis), bukan untuk
        seluruh transaksi. Potongan ikut menutup tagihan — tagihan tak menyisakan tunggakan.
      </p>
      <div class="space-y-1.5 mb-2">
        <div
          v-for="(p, idx) in form.keuPotonganPos"
          :key="idx"
          class="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 px-3 py-2 rounded-lg flex-wrap"
        >
          <input
            v-model="p.label"
            type="text"
            placeholder="Nama potongan (mis. Anak Guru)"
            class="flex-1 min-w-[140px] bg-transparent text-xs font-bold text-[var(--text-primary)] outline-none"
          />
          <select
            v-model="p.tipe"
            class="text-[11px] font-bold px-2 py-1 rounded border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)]"
          >
            <option value="persen">Persen (%)</option>
            <option value="nominal">Nominal (Rp)</option>
          </select>
          <input
            v-model.number="p.nilai"
            type="number"
            min="0"
            :max="p.tipe === 'persen' ? 100 : undefined"
            class="w-24 text-xs font-bold px-2 py-1 rounded border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] text-right"
          />
          <label class="text-[11px] font-bold text-[var(--text-secondary)] flex items-center gap-1">
            <input v-model="p.aktif" type="checkbox" class="accent-emerald-600" />Aktif
          </label>
          <button
            class="text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 px-2 rounded text-xs"
            title="Hapus potongan"
            @click="hapusPotonganPos(idx)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p
          v-if="!form.keuPotonganPos.length"
          class="text-[11px] text-[var(--text-tertiary)] italic"
        >
          Belum ada potongan. Selama daftar ini kosong, kasir tetap bisa mengisi potongan manual di
          POS.
        </p>
      </div>
      <button
        class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-3 py-2 rounded-lg text-xs"
        @click="tambahPotonganPos"
      >
        <i class="fas fa-plus mr-1"></i>Tambah Potongan
      </button>
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
        :disabled="saving"
        class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-slate-200 transition cursor-pointer disabled:opacity-50"
        @click="reset"
      >
        <i class="fas fa-undo mr-1"></i>Reset
      </button>
      <button
        :disabled="saving"
        class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition cursor-pointer disabled:opacity-50"
        @click="simpan"
      >
        <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan Semua' }}
      </button>
    </div>

    <!-- Kyai 3-4 Agu: PRATINJAU generate. Read-only, memakai jalur hitung yang SAMA
         PERSIS dengan tombol Generate (autoGenerate(dryRun)) — uang riil sejak 1 Agu,
         jadi angkanya harus bisa diperiksa sebelum 500-an tagihan terbit. -->
    <div
      v-if="praOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="praOpen = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)] sticky top-0 bg-[var(--bg-card)]"
        >
          <div>
            <h3 class="text-base font-black text-[var(--text-primary)]">
              <i class="fas fa-eye text-teal-600 mr-1.5"></i>Pratinjau Generate Tagihan
            </h3>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              Belum ada yang ditulis. Periksa angkanya, baru tekan Generate.
            </p>
          </div>
          <button
            class="text-[var(--text-secondary)] hover:text-rose-600 text-xl leading-none"
            @click="praOpen = false"
          >
            &times;
          </button>
        </div>
        <div class="p-5 space-y-3">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
              <p class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Tagihan</p>
              <p class="text-lg font-black text-[var(--text-primary)]">{{ praRows.length }}</p>
            </div>
            <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
              <p class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Total</p>
              <p class="text-lg font-black text-teal-700 dark:text-teal-300">
                {{ fmtRp(praTotal) }}
              </p>
            </div>
            <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
              <p class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Gabungan</p>
              <p class="text-lg font-black text-indigo-700 dark:text-indigo-300">
                {{ praGabungan }}
              </p>
            </div>
          </div>
          <p v-if="!praRows.length" class="text-center text-xs text-[var(--text-tertiary)] py-8">
            Tak ada tagihan baru yang akan dibuat (semua sudah ada, atau tak ada yang cocok).
          </p>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-[11px]">
              <thead>
                <tr class="text-left text-[var(--text-secondary)] uppercase">
                  <th class="py-1.5 pr-2">Santri</th>
                  <th class="py-1.5 pr-2">Kategori</th>
                  <th class="py-1.5 pr-2 text-right">Ditagih</th>
                  <th class="py-1.5">Rincian komponen</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="r in praRows.slice(0, 300)"
                  :key="r.id"
                  class="border-t border-[var(--border-subtle)]"
                >
                  <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">
                    {{ r.santri_nama || r.santri_id }}
                  </td>
                  <td class="py-1.5 pr-2 text-[var(--text-secondary)]">{{ r.kategori }}</td>
                  <td class="py-1.5 pr-2 text-right font-black text-[var(--text-primary)]">
                    {{ fmtRp(r.nominal) }}
                  </td>
                  <td class="py-1.5 text-[10px] text-[var(--text-secondary)]">
                    <span v-if="!r.komponen">—</span>
                    <span v-else>
                      <span v-for="(k, ki) in r.komponen" :key="ki" class="whitespace-nowrap">
                        {{ ki ? ' + ' : '' }}{{ k.label }} {{ fmtRp(k.nominal) }}
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              v-if="praRows.length > 300"
              class="text-center text-[10px] text-[var(--text-tertiary)] mt-2"
            >
              Menampilkan 300 dari {{ praRows.length }} baris — ringkasan di atas menghitung
              semuanya.
            </p>
          </div>
        </div>
      </div>
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
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="dlgOpen = false"
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
          <!-- Kyai 4 Agu: kas lembaga — uang jenis ini masuk buku kas lembaga mana.
               BEDA dari "Hanya untuk lembaga ini" di Tarif Khusus (itu penyaring siapa
               yang DITAGIH); yang ini menentukan kasnya. -->
          <div>
            <label class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1 block"
              >Masuk Kas Lembaga</label
            >
            <select
              v-model="dlgJenis.kas_lembaga"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)]"
            >
              <option value="">Kas Induk / belum ditentukan</option>
              <option
                v-for="o in opsiKas"
                :key="`dlg_kas_${o.nama}`"
                :value="o.nama"
                :title="o.ket"
              >
                {{ o.nama }}{{ o.ket ? ` — ${o.ket}` : '' }}
              </option>
            </select>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
              <i class="fas fa-info-circle mr-1"></i>Dipakai laporan kas per lembaga. Dibiarkan
              kosong: kalau "Hanya untuk lembaga ini" berisi <b>tepat satu</b> lembaga, kas ikut
              lembaga itu — selain itu masuk Kas Induk. Beberapa lembaga boleh BERBAGI satu kas
              (mis. Kelas Baca diarahkan ke <b>TPQ Pagi</b>) — cukup pilih kas yang sama.
            </p>
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
                :class="[
                  'py-2 rounded-lg text-xs font-bold border transition',
                  dlgJenis.frekuensi === opt.v
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
                ]"
                @click="dlgJenis.frekuensi = opt.v"
              >
                <i :class="['fas', opt.i, 'mr-1']"></i>{{ opt.l }}
              </button>
            </div>
            <p class="text-[10px] text-[var(--text-secondary)] mt-1 italic">
              <i class="fas fa-info-circle mr-1"></i>Bulanan = tagihan otomatis tiap bulan · Tahunan
              = sekali per tahun ajaran · Manual = hanya saat ditagih/dibayar.
            </p>
          </div>
          <!-- Kyai 3-4 Agu: Penggabungan syahriyah (collapsible).
               "200rb itu sudah termasuk, baik untuk TPQ (90rb) atau PTPT (100rb)" — jenis
               ngaji tak ditagih sendiri; nominalnya jadi KOMPONEN di dalam tagihan sekolah/
               fullday, lalu dipecah kembali per lembaga di Buku Induk saat dibayar. -->
          <div class="border-t border-[var(--border-subtle)] pt-3">
            <button
              type="button"
              class="w-full flex items-center justify-between text-left"
              @click="dlgGabung = !dlgGabung"
            >
              <span class="text-xs font-black text-[var(--text-primary)]">
                <i class="fas fa-object-group text-indigo-500 mr-1.5"></i>Digabung ke jenis lain
                <span
                  v-if="(dlgJenis.gabung_ke || []).length"
                  class="ml-1 text-[10px] font-bold text-indigo-600"
                  >({{ (dlgJenis.gabung_ke || []).length }} kandidat)</span
                >
              </span>
              <i
                :class="[
                  'fas',
                  dlgGabung ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-[var(--text-secondary)]'
                ]"
              ></i>
            </button>
            <div v-if="dlgGabung" class="mt-3 space-y-3">
              <p class="text-[10px] text-[var(--text-secondary)] italic">
                Pakai ini di jenis <b>ngaji</b>: nominalnya tidak ditagih sendiri, melainkan
                <b>sudah termasuk</b> di dalam tagihan yang dipilih di bawah. Kosongkan kalau jenis
                ini ditagih tersendiri.
              </p>
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-arrow-right mr-1"></i>Termasuk di dalam jenis ini (boleh pilih
                  beberapa — yang dipakai adalah yang cocok untuk santrinya):
                </p>
                <p
                  v-if="!jenisLainOpsi.length"
                  class="text-[10px] text-[var(--text-tertiary)] italic"
                >
                  Belum ada jenis lain untuk dipilih.
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="opt in jenisLainOpsi"
                    :key="`dlg_gk_${opt.id}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="
                        Array.isArray(dlgJenis.gabung_ke) && dlgJenis.gabung_ke.includes(opt.id)
                      "
                      class="w-3 h-3 accent-indigo-600"
                      @change="toggleGabungKe(dlgJenis, opt.id)"
                    />
                    {{ opt.label }}
                  </label>
                </div>
                <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
                  Sisi sekolah ada beberapa jenis (SD / TK / PKBM / Kelas Baca) — centang semua yang
                  mungkin, sistem memilih yang berlaku untuk tiap santri.
                </p>
              </div>
              <div v-if="(dlgJenis.gabung_ke || []).length">
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-question-circle mr-1"></i>Digabung untuk santri yang:
                </p>
                <select
                  v-model="dlgJenis.gabung_syarat"
                  class="w-full px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900"
                >
                  <option v-for="sy in GABUNG_SYARAT" :key="sy.key" :value="sy.key">
                    {{ sy.label }}{{ sy.saran ? ' — disarankan' : '' }}
                  </option>
                </select>
                <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
                  Santri yang tak memenuhi syarat ini tetap ditagih jenis ngajinya
                  <b>tersendiri</b> — jadi tak ada pemasukan yang hilang.
                </p>
              </div>
            </div>
          </div>

          <!-- Kyai 3 Agu: Paket nominal pilihan (collapsible). Diskon anak guru DICABUT 5 Agu.
               Sengaja SEKSI SENDIRI, bukan digabung ke "Tarif Khusus": ini bukan tarif
               per lembaga/kelas/santri, melainkan pilihan yang menempel ke DATA SANTRI. -->
          <div class="border-t border-[var(--border-subtle)] pt-3">
            <button
              type="button"
              class="w-full flex items-center justify-between text-left"
              @click="dlgPaket = !dlgPaket"
            >
              <span class="text-xs font-black text-[var(--text-primary)]">
                <i class="fas fa-tags text-amber-500 mr-1.5"></i>Paket nominal pilihan
                <span
                  v-if="paketDiskonInfo(dlgJenis)"
                  class="ml-1 text-[10px] font-bold text-amber-600"
                  >({{ paketDiskonInfo(dlgJenis) }})</span
                >
              </span>
              <i
                :class="[
                  'fas',
                  dlgPaket ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-[var(--text-secondary)]'
                ]"
              ></i>
            </button>
            <div v-if="dlgPaket" class="mt-3 space-y-3">
              <!-- Diskon anak guru DICABUT (Kyai, 5 Agu 2026): potongan pindah sepenuhnya ke
                   POS, dipilih kasir per baris transaksi. Daftarnya diatur di tab Kategori. -->
              <p
                class="text-[10px] text-[var(--text-secondary)] bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] rounded-lg px-2 py-1.5"
              >
                <i class="fas fa-circle-info text-teal-600 mr-1"></i>Potongan/diskon tidak lagi
                diatur di sini. Tagihan selalu terbit <b>penuh</b>; potongannya dipilih kasir
                <b>per baris</b> saat menerima pembayaran di POS. Daftar potongan diatur di tab
                <b>Kategori</b>.
              </p>
              <!-- Paket nominal pilihan -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-list-ul mr-1"></i>Paket nominal pilihan (santri memilihnya di
                  data santri):
                </p>
                <p
                  v-if="!(dlgJenis.paket || []).length"
                  class="text-[10px] text-[var(--text-tertiary)] italic mb-1.5"
                >
                  Belum ada paket — semua santri memakai tarif biasa.
                </p>
                <div
                  v-for="(p, i) in dlgJenis.paket || []"
                  :key="`dlg_pk_${i}`"
                  class="flex items-center gap-1.5 mb-1.5"
                >
                  <input
                    v-model="p.label"
                    type="text"
                    placeholder="Nama paket (mis. Peduli)"
                    class="flex-1 px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900"
                  />
                  <input
                    v-model.number="p.nominal"
                    type="number"
                    min="0"
                    placeholder="Nominal"
                    class="w-28 px-2 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-white dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    class="px-2 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 hover:bg-rose-100"
                    title="Hapus paket"
                    @click="hapusPaket(dlgJenis, i)"
                  >
                    <i class="fas fa-trash text-[11px]"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold hover:bg-amber-100"
                  @click="tambahPaket(dlgJenis)"
                >
                  <i class="fas fa-plus mr-1"></i>Tambah paket
                </button>
                <p class="text-[10px] text-[var(--text-tertiary)] mt-1.5">
                  Urutan menang: <b>nominal khusus per santri</b> &gt; <b>paket</b> &gt; tarif per
                  kelas &gt; per lembaga &gt; default. Paket tanpa nama atau bernominal 0 dibuang
                  saat disimpan.
                </p>
              </div>
            </div>
          </div>

          <!-- Tarif Khusus (collapsible) — dipindah dari list lama -->
          <div class="border-t border-[var(--border-subtle)] pt-3">
            <button
              type="button"
              class="w-full flex items-center justify-between text-left"
              @click="dlgTarif = !dlgTarif"
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
                      class="w-3 h-3 accent-teal-600"
                      @change="toggleLembagaOnly(dlgJenis, lemb.lembaga)"
                    />
                    {{ lemb.lembaga }}
                  </label>
                </div>
              </div>
              <!-- 1b) v.1.2.6 (Kyai): Whitelist STATUS santri (non-mukim/ma'had/fullday) -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-user-check mr-1"></i>Hanya untuk status santri ini (kosong =
                  semua status):
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="st in STATUS_SANTRI_OPTS"
                    :key="`dlg_st_${st.key}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="
                        Array.isArray(dlgJenis.status_only) && dlgJenis.status_only.includes(st.key)
                      "
                      class="w-3 h-3 accent-teal-600"
                      @change="toggleStatusOnly(dlgJenis, st.key)"
                    />
                    {{ st.label }}
                  </label>
                </div>
              </div>
              <!-- 1b2) Kyai 4 Agu: Whitelist SHIFT NGAJI (pagi/sore).
                   "syahriyah pagi untuk ngaji pagi, syahriyah sore untuk sore". Tanpa ini
                   jenis Pagi & Sore terbit ke SEMUA santri (Agustus 2026: 513 + 909 tagihan,
                   tumpang tindih 100%) dan TU menyaringnya manual di POS. -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-clock mr-1"></i>Hanya untuk shift ngaji ini (kosong = semua
                  shift):
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="sh in SHIFT_NGAJI_OPTS"
                    :key="`dlg_sh_${sh.key}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="
                        Array.isArray(dlgJenis.shift_only) && dlgJenis.shift_only.includes(sh.key)
                      "
                      class="w-3 h-3 accent-teal-600"
                      @change="toggleShiftOnly(dlgJenis, sh.key)"
                    />
                    {{ sh.label }}
                  </label>
                </div>
                <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
                  Santri yang <b>Shift Ngaji</b>-nya belum diisi dianggap <b>ikut keduanya</b>, jadi
                  ia tetap tertagih — tagihannya membaik sendiri begitu guru kelas mengoreksi
                  datanya. Aman: tak ada tagihan yang hilang di tengah jalan.
                </p>
              </div>
              <!-- 1c) v.1.2.x (Kyai): Whitelist JENIS KELAMIN (Putra/Putri) -->
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] italic mb-1">
                  <i class="fas fa-venus-mars mr-1"></i>Hanya untuk jenis kelamin ini (kosong =
                  semua):
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="jkOpt in JK_OPTS"
                    :key="`dlg_jk_${jkOpt.key}`"
                    class="inline-flex items-center gap-1 text-[10px] font-bold cursor-pointer bg-[var(--bg-card-elevated)] px-2 py-1 rounded border border-[var(--border-default)]"
                  >
                    <input
                      type="checkbox"
                      :checked="
                        Array.isArray(dlgJenis.jk_only) && dlgJenis.jk_only.includes(jkOpt.key)
                      "
                      class="w-3 h-3 accent-teal-600"
                      @change="toggleJkOnly(dlgJenis, jkOpt.key)"
                    />
                    {{ jkOpt.label }}
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
                      type="number"
                      min="0"
                      :placeholder="String(dlgJenis.nominal_default || 0)"
                      class="w-28 text-xs font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-2 py-1 text-right"
                      @input="
                        dlgJenis.nominal_per_lembaga = {
                          ...(dlgJenis.nominal_per_lembaga || {}),
                          [lemb.lembaga]: Number($event.target.value) || 0
                        }
                      "
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
                          @input="setNominalKelas(dlgJenis, lemb.lembaga, kls, $event.target.value)"
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
                      type="number"
                      min="0"
                      :placeholder="String(dlgJenis.nominal_default || 0)"
                      class="w-24 text-[10px] font-bold text-[var(--text-primary)] outline-none border border-[var(--border-default)] rounded px-1.5 py-0.5 text-right"
                      @input="setNominalSantri(dlgJenis, s.id, $event.target.value)"
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
            class="px-4 py-2 text-sm font-bold rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)]"
            @click="dlgOpen = false"
          >
            Batal
          </button>
          <button
            class="px-4 py-2 text-sm font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white inline-flex items-center gap-1.5"
            @click="simpanJenisDialog"
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
            class="text-[var(--text-secondary)] hover:text-rose-500 p-1"
            aria-label="Tutup"
            @click="genOpen = false"
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
          class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] mb-2"
          @change="onGenPickJenis"
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
              type="text"
              inputmode="numeric"
              class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] text-right font-bold"
              @input="onGenNominal"
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
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
            @click="genScope = 'all'"
          >
            Semua aktif
          </button>
          <button
            type="button"
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'lembaga'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
            @click="genScope = 'lembaga'"
          >
            Lembaga/Kelas
          </button>
          <button
            type="button"
            :class="[
              'flex-1 py-1.5 rounded-lg border transition',
              genScope === 'santri'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
            @click="genScope = 'santri'"
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
                  class="w-3 h-3 accent-emerald-600"
                  @change="toggleGenLembaga(lm)"
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
                  class="w-3 h-3 accent-emerald-600"
                  @change="toggleGenKelas(kl)"
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
                class="w-3.5 h-3.5 accent-emerald-600 flex-shrink-0"
                @change="toggleGenSantri(s.id)"
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
            class="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)] font-bold rounded-xl text-sm"
            @click="genOpen = false"
          >
            Batal
          </button>
          <button
            :disabled="genBusy || genTargetCount === 0"
            class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm"
            @click="doGenKhusus"
          >
            {{ genBusy ? 'Generating...' : 'Generate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
// v.F6e: adapter Supabase (serverTimestamp = shim ISO string).
import {
  getAll,
  getOne,
  queryColl,
  setOne,
  mergeOne,
  serverTimestamp,
  subscribeDoc
} from '@/services/db'
// v.1.1.9: Jenis Bisyaroh ber-scope (ganti 5 tarif shift global + map pokok per guru)
import {
  jenisBisyarohList as bacaJenisBisyaroh,
  normalizeJenisBisyaroh,
  slugJenisId,
  cekTumpangTindih,
  HITUNGAN_OPTIONS,
  // Kyai 7 Agu 2026: Jenis Tunjangan ber-scope (ganti master_tunjangan)
  jenisTunjanganList as bacaJenisTunjangan,
  normalizeJenisTunjangan,
  HITUNGAN_TUNJANGAN_OPTIONS
} from '@/utils/bisyarohScope'
import { shiftList, shiftLabelOf } from '@/utils/shiftMaster'
import { namaLembaga } from '@/utils/jabatanUnit'
import { useSettingsStore } from '@/stores/settings'
import { useGuru } from '@/composables/useGuru'
import { useLembaga, isSekolahLembaga } from '@/composables/useLembaga'
import { HARI_AKTIF_DEFAULT } from '@/utils/bebanMengajar' // v.1.2.1: penyebut prorata JP
// v.1.2.6: whitelist status santri (non-mukim/ma'had/fullday) utk targeting jenis syahriyah
// Kyai 3-4 Agu: syarat penggabungan syahriyah (sumber tunggal di utils/syahriyah.js)
import { GABUNG_SYARAT, hitungTagihan, nominalDasar, paketNominal } from '@/utils/syahriyah'
// Hanya OPSI yang dipakai di sini (daftar centang). Matcher-nya tak lagi dipanggil langsung:
//   seluruh aturan berlaku/tidak sudah dijalankan hitungTagihan() di utils/syahriyah.js.
import { STATUS_SANTRI_OPTS, JK_OPTS, SHIFT_NGAJI_OPTS } from '@/utils/statusSantri'
// Kyai 4 Agu: pilihan kas = master + kas bukan-lembaga (TPQ payung, Fullday, Ma'had)
import { opsiKasLembaga } from '@/utils/kasLembaga'
import { normalisasiPotongan } from '@/utils/potonganPos'
// Kyai 7 Agu 2026: simulasi pemasukan bulanan (hanya jenis bulanan)
import { simulasiPemasukan as hitungPemasukan } from '@/utils/simulasiPemasukan'
// Gerbang "Mulai Tagih di AMMU" — dipakai Generate & Generate Khusus.
import { mulaiTagihKode, bolehTerbitPeriode, pesanTolakPeriode } from '@/utils/periodeTagihan'
// Pola id tagihan otomatis = kontrak dengan cron; lihat catatan di utils/tagihanId.js.
import { kodeBulan, idTagihanAuto } from '@/utils/tagihanId'
import { useToast } from '@/composables/useToast'
import { useExcel } from '@/composables/useExcel'
import { useGedungScope } from '@/composables/useGedungScope'

// v.111: scope Gedung — generate tagihan hanya untuk santri gedung admin
const { scoped: gedungScoped, myGedung } = useGedungScope()
const _inMyGedung = (x) => !gedungScoped.value || String(x.gedung || '').trim() === myGedung.value

const settingsStore = useSettingsStore()
const { guruRaw } = useGuru()
const { lembagaRaw } = useLembaga()
// v.1.1.9: jabatan (+units) utk opsi scope Jenis Bisyaroh
const jabatanItems = ref([])
let _unsubJabatanKeu = null
onMounted(() => {
  _unsubJabatanKeu = subscribeDoc('master', 'jabatan', (d) => {
    jabatanItems.value = Array.isArray(d?.items) ? d.items : []
  })
})
onUnmounted(() => {
  if (_unsubJabatanKeu) {
    try {
      _unsubJabatanKeu()
    } catch (e) {
      /* ignore */
    }
  }
})
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
  { id: 'beban', t: 'Beban Mengajar', icon: 'fa-book' },
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
const generating = ref(false)
const saving = ref(false)
const jenisList = ref([])

// ── v.1.1.9: Jenis Bisyaroh (settings.keuBisyarohJenis) ────────────────────
// Menggantikan 5 tarif shift global + map pokok per guru. Lihat utils/bisyarohScope.js.
const jenisBisyarohList = ref([])
const dlgJbOpen = ref(false)
const dlgJbIsNew = ref(false)
const dlgJbIdx = ref(-1)
const dlgJb = ref(null)

const scopeText = (arr) => (!arr || arr.length === 0 ? '—' : arr.join(', '))
const chipCls = (aktif) =>
  [
    'px-2 py-1 rounded-md text-[11px] font-bold border transition',
    aktif
      ? 'bg-teal-600 text-white border-teal-600'
      : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]'
  ].join(' ')

// Opsi scope: jabatan dari master/jabatan, lembaga dari master/lembaga, shift dari Master Shift.
const jabatanScopeOptions = computed(() => {
  const items = jabatanItems.value || []
  const names = items.map((x) => String(x?.nama || '').trim()).filter(Boolean)
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'id'))
})
const lembagaScopeOptions = computed(() =>
  (lembagaRaw.value || []).map(namaLembaga).filter(Boolean)
)
const shiftScopeOptions = computed(() => shiftList(settingsStore.settings || {}))
const shiftLabelById = (id) => shiftLabelOf(settingsStore.settings || {}, id)

// Peringatan: >1 jenis '× hadir' mengenai shift yang sama → nominal DIJUMLAHKAN.
const tumpangTindihJenis = computed(() =>
  cekTumpangTindih(jenisBisyarohList.value, new Set(shiftScopeOptions.value.map((s) => s.id)))
)

// v.1.1.x: scope per-orang (guru tertentu) utk Jenis Bisyaroh. Kosong = pakai scope lain.
const dlgJbPilihGuru = ref(false)
const dlgJbGuruSearch = ref('')
const dlgJbGuruCari = computed(() => {
  const kw = String(dlgJbGuruSearch.value || '')
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
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''))).slice(0, 80)
})
function toggleGuruJb(guruId) {
  const sid = String(guruId)
  const cur = (dlgJb.value.scope.guru_ids || []).map(String)
  const i = cur.indexOf(sid)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(sid)
  dlgJb.value.scope.guru_ids = cur
}
function semuaGuruJb() {
  dlgJb.value.scope.guru_ids = []
  dlgJbPilihGuru.value = false
}
function openJenisBisyarohBaru() {
  dlgJbIsNew.value = true
  dlgJbIdx.value = -1
  dlgJb.value = normalizeJenisBisyaroh({ label: '', hitungan: 'flat', nominal: 0, aktif: true })
  dlgJbPilihGuru.value = false
  dlgJbGuruSearch.value = ''
  dlgJbOpen.value = true
}
function openJenisBisyarohDialog(j, idx) {
  dlgJbIsNew.value = false
  dlgJbIdx.value = idx
  dlgJb.value = normalizeJenisBisyaroh(JSON.parse(JSON.stringify(j)))
  dlgJbPilihGuru.value = false
  dlgJbGuruSearch.value = ''
  dlgJbOpen.value = true
}
function toggleScope(kunci, nilai) {
  const cur = [...(dlgJb.value.scope[kunci] || [])]
  const i = cur.indexOf(nilai)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(nilai)
  dlgJb.value.scope[kunci] = cur
}
function simpanJenisBisyaroh() {
  const j = dlgJb.value
  if (!j) return
  const label = String(j.label || '').trim()
  if (!label) {
    toast.warning('Nama jenis wajib diisi')
    return
  }
  // Id dikunci setelah dibuat — dipakai slip lama utk melacak asal baris.
  const next = normalizeJenisBisyaroh({ ...j, label, id: j.id || slugJenisId(label) })
  if (!next.id) {
    toast.warning('Nama jenis harus mengandung huruf/angka')
    return
  }
  const bentrok = jenisBisyarohList.value.some((x, i) => x.id === next.id && i !== dlgJbIdx.value)
  if (bentrok) {
    toast.warning(`Jenis "${label}" sudah ada`)
    return
  }
  if (dlgJbIsNew.value) jenisBisyarohList.value.push(next)
  else jenisBisyarohList.value.splice(dlgJbIdx.value, 1, next)
  dlgJbOpen.value = false
  toast.info('Perubahan siap — klik "Simpan Semua" untuk menyimpan permanen.')
}
function hapusJenisBisyaroh(idx) {
  const j = jenisBisyarohList.value[idx]
  if (!j) return
  if (!confirm(`Hapus Jenis Bisyaroh "${j.label}"?\n\nSlip yang sudah digenerate tidak berubah.`))
    return
  jenisBisyarohList.value.splice(idx, 1)
}

// ── Kyai 7 Agu 2026: Simulasi PEMASUKAN bulanan syahriyah ────────────────────
// Pasangan simulasi plafon bisyaroh: yang itu uang KELUAR sebulan, ini uang MASUK.
// Dihitung ON DEMAND (tombol), bukan otomatis: butuh SELURUH baris santri, dan tak semua
// yang membuka Pengaturan sedang memerlukannya.
const simPemasukanBusy = ref(false)
const simPemasukanExporting = ref(false)
const simPemasukan = ref(null)
async function hitungSimulasiPemasukan() {
  simPemasukanBusy.value = true
  try {
    // Penyaring santri SAMA dengan Generate Tagihan (aktif + scope gedung) — kalau berbeda,
    //   simulasi menjanjikan pemasukan dari santri yang tak akan pernah ditagih.
    const santri = (await getAll('santri')).filter((x) => x.aktif !== false && _inMyGedung(x))
    // Tarif yang dipakai = yang SEDANG TAMPIL di layar (jenisList), bukan yang tersimpan,
    //   supaya Kyai bisa mengubah nominal lalu Hitung Ulang tanpa menyimpan apa pun dulu.
    simPemasukan.value = hitungPemasukan(serializeJenisList(jenisList.value), santri)
  } catch (e) {
    toast.error('Gagal menghitung: ' + (e?.message || e))
  } finally {
    simPemasukanBusy.value = false
  }
}
async function exportSimulasiPemasukanPdf() {
  if (!simPemasukan.value?.perJenis?.length) return
  simPemasukanExporting.value = true
  try {
    const { exportSimulasiPemasukanPdf: buat } = await import('@/utils/strukBuilder')
    await buat(simPemasukan.value, settingsStore.settings || {}, taAktif.value)
  } catch (e) {
    toast.error('Gagal membuat PDF: ' + (e?.message || e))
  } finally {
    simPemasukanExporting.value = false
  }
}

// ══ Kyai 7 Agu 2026: JENIS TUNJANGAN ber-scope (settings.keuTunjanganJenis) ═══
// Menggantikan `master_tunjangan` yang cuma {nama, nominal, guru_ids}: tak bisa menyasar
//   jabatan ("Tunjangan Kepala Lembaga"), tak kenal masa kerja (pengabdian kelipatan /
//   khusus di atas 5 tahun), tak kenal kedisiplinan (berprestasi 100% tepat waktu).
// Mesin & bentuk dialognya SAMA dengan Jenis Bisyaroh — permintaan Kyai "dimiripkan
//   pengaturan bisyaroh" — hanya ditambah kotak Syarat.
const jenisTunjanganListRef = ref([])
const dlgTjOpen = ref(false)
const dlgTjIsNew = ref(false)
const dlgTjIdx = ref(-1)
const dlgTj = ref(null)
const dlgTjPilihGuru = ref(false)
const dlgTjGuruSearch = ref('')
const dlgTjGuruCari = computed(() => {
  const kw = String(dlgTjGuruSearch.value || '')
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
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''))).slice(0, 80)
})
function toggleScopeTj(kunci, nilai) {
  const cur = [...(dlgTj.value.scope[kunci] || [])]
  const i = cur.indexOf(nilai)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(nilai)
  dlgTj.value.scope[kunci] = cur
}
/** Matikan pembatasan per-orang = KOSONGKAN daftarnya, jangan cuma menyembunyikan —
 *  daftar tersembunyi yang masih terisi tetap menyaring saat disimpan. */
function setPilihGuruTj(nyala) {
  dlgTjPilihGuru.value = !!nyala
  if (!nyala && dlgTj.value) dlgTj.value.scope.guru_ids = []
}
function toggleGuruTj(guruId) {
  const sid = String(guruId)
  const cur = (dlgTj.value.scope.guru_ids || []).map(String)
  const i = cur.indexOf(sid)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(sid)
  dlgTj.value.scope.guru_ids = cur
}
function openJenisTunjanganBaru() {
  dlgTjIsNew.value = true
  dlgTjIdx.value = -1
  dlgTj.value = normalizeJenisTunjangan({ label: '', hitungan: 'flat', nominal: 0, aktif: true })
  dlgTjPilihGuru.value = false
  dlgTjGuruSearch.value = ''
  dlgTjOpen.value = true
}
function openJenisTunjanganDialog(j, idx) {
  dlgTjIsNew.value = false
  dlgTjIdx.value = idx
  dlgTj.value = normalizeJenisTunjangan(JSON.parse(JSON.stringify(j)))
  dlgTjPilihGuru.value = (dlgTj.value.scope.guru_ids || []).length > 0
  dlgTjGuruSearch.value = ''
  dlgTjOpen.value = true
}
function simpanJenisTunjangan() {
  const j = dlgTj.value
  if (!j) return
  if (!String(j.label || '').trim()) {
    toast.warning('Nama tunjangan wajib diisi')
    return
  }
  const next = normalizeJenisTunjangan(j)
  const bentrok = jenisTunjanganListRef.value.some(
    (x, i) => x.id === next.id && i !== dlgTjIdx.value
  )
  if (bentrok) {
    toast.warning(`Sudah ada tunjangan dengan nama serupa (${next.id})`)
    return
  }
  if (dlgTjIsNew.value) jenisTunjanganListRef.value.push(next)
  else jenisTunjanganListRef.value.splice(dlgTjIdx.value, 1, next)
  dlgTjOpen.value = false
  toast.info('Tersimpan di layar — klik "Simpan Semua" agar berlaku.')
}
function hapusJenisTunjangan(idx) {
  const j = jenisTunjanganListRef.value[idx]
  if (!j) return
  if (!confirm(`Hapus tunjangan "${j.label}"?\n\nSlip yang sudah digenerate tidak berubah.`)) return
  jenisTunjanganListRef.value.splice(idx, 1)
}
/** Label ringkas cara hitung + syarat, untuk kolom tabel. */
function tunjanganCaraLabel(j) {
  const h = HITUNGAN_TUNJANGAN_OPTIONS.find((o) => o.value === j.hitungan)?.label || 'Flat / bulan'
  const s = []
  if (Number(j.syarat?.masa_min_tahun) > 0) s.push(`min ${j.syarat.masa_min_tahun} th mengabdi`)
  if (j.hitungan === 'flat_prestasi') s.push(`tepat waktu ≥ ${j.syarat?.persen_tepat_min ?? 100}%`)
  return s.length ? `${h} · ${s.join(' · ')}` : h
}
/** Scope ringkas — sejajar `masterScopeLabel` pada kartu Potongan. */
function tunjanganScopeLabel(j) {
  const s = j.scope || {}
  const bits = []
  if (s.jabatan?.length) bits.push(s.jabatan.join(', '))
  if (s.lembaga?.length) bits.push(s.lembaga.join(', '))
  if (s.shift?.length) bits.push(`shift ${s.shift.join('+')}`)
  if (s.guru_ids?.length) bits.push(`${s.guru_ids.length} orang`)
  return bits.length ? bits.join(' · ') : 'Semua guru/pegawai'
}

// ==== v.1.1.x: Beban Mengajar Sekolah — dasar bisyaroh per_jp ====
// settings.bebanMengajar[] = { guru_id, lembaga, mapel(teks bebas), jp }.
const bebanMengajarList = ref([])
const dlgBebanOpen = ref(false)
const dlgBebanIsNew = ref(false)
const dlgBebanIdx = ref(-1)
const dlgBeban = ref(null)
const imporBebanBusy = ref(false)

const guruAktifOptions = computed(() =>
  (guruRaw.value || [])
    .filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
    .slice()
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)
function namaGuruById(id) {
  return (guruRaw.value || []).find((g) => String(g.id) === String(id))?.nama || String(id || '-')
}
// Total JP MINGGUAN semua baris.
const bebanTotalJP = computed(() =>
  bebanMengajarList.value.reduce((s, b) => s + (Number(b.jp_minggu) || 0), 0)
)

const HARI_LABELS = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

// v.1.2.1 HARI AKTIF SEKOLAH (settings.hariAktifLembaga = { [lembaga]: [0..6] }).
//   Ini PENYEBUT prorata: JP/hari = jp_minggu ÷ jumlah hari aktif. Kunci settings-nya
//   sudah lama ada di bebanMengajar.js tapi TAK PERNAH punya UI, jadi selalu jatuh ke
//   default "semua kecuali Jumat" — termasuk Ahad. Untuk sekolah yang libur Ahad itu
//   berarti guru kehilangan porsi 1 hari tiap pekan diam-diam. Karena ini menyetir
//   uang, hari aktif WAJIB bisa Kyai atur — cukup sekali per sekolah, bukan per guru.
const hariAktifLembagaMap = ref({})
const sekolahLembagaList = computed(() =>
  (lembagaRaw.value || [])
    .filter((l) => !l.tk_group && isSekolahLembaga(namaLembaga(l), lembagaRaw.value))
    .map((l) => namaLembaga(l))
    .filter(Boolean)
)
function hariAktifFor(lemb) {
  const cur = hariAktifLembagaMap.value[lemb]
  return Array.isArray(cur) && cur.length ? cur : HARI_AKTIF_DEFAULT
}
function toggleHariAktif(lemb, d) {
  const cur = hariAktifFor(lemb).slice()
  const i = cur.indexOf(d)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(d)
  if (!cur.length) return toast.warning('Minimal satu hari aktif — kalau nol, JP tak bisa dibagi')
  hariAktifLembagaMap.value = {
    ...hariAktifLembagaMap.value,
    [lemb]: cur.sort((a, b) => a - b)
  }
}

// Pratinjau di dialog: JP/minggu yang diketik → berapa JP per hari aktif.
const rincianPerHariBeban = computed(() => {
  const b = dlgBeban.value
  const jpm = Number(b?.jp_minggu) || 0
  const lemb = String(b?.lembaga || '').trim()
  if (!jpm || !lemb) return ''
  const n = hariAktifFor(lemb).length
  if (!n) return ''
  const per = Math.round((jpm / n) * 100) / 100
  return `Dibagi ${n} hari aktif ${lemb} → ±${per} JP/hari.`
})

function openBebanBaru() {
  dlgBebanIsNew.value = true
  dlgBebanIdx.value = -1
  dlgBeban.value = { guru_id: '', lembaga: '', jp_minggu: null }
  dlgBebanOpen.value = true
}
function openBebanDialog(b, idx) {
  dlgBebanIsNew.value = false
  dlgBebanIdx.value = idx
  dlgBeban.value = { ...b }
  dlgBebanOpen.value = true
}
function simpanBeban() {
  const b = dlgBeban.value
  if (!b) return
  if (!String(b.guru_id || '').trim()) return toast.warning('Pilih guru dulu')
  if (!String(b.lembaga || '').trim()) return toast.warning('Pilih lembaga (sekolah) dulu')
  if (!(Number(b.jp_minggu) > 0)) return toast.warning('JP per minggu harus lebih dari 0')
  const row = {
    guru_id: String(b.guru_id),
    lembaga: String(b.lembaga || '').trim(),
    jp_minggu: Number(b.jp_minggu) || 0
  }
  if (dlgBebanIsNew.value) bebanMengajarList.value.push(row)
  else bebanMengajarList.value.splice(dlgBebanIdx.value, 1, row)
  dlgBebanOpen.value = false
  toast.info('Perubahan siap — klik "Simpan Semua" untuk menyimpan permanen.')
}
function hapusBeban(idx) {
  const b = bebanMengajarList.value[idx]
  if (!b) return
  if (
    !confirm(
      `Hapus beban ${namaGuruById(b.guru_id)} — ${b.lembaga || '-'} (${b.jp_minggu} JP/minggu)?`
    )
  )
    return
  bebanMengajarList.value.splice(idx, 1)
}
const BEBAN_COLS = [
  { key: 'guru_id', header: 'Guru ID', width: 12 },
  { key: 'nama', header: 'Nama', width: 28 },
  { key: 'lembaga', header: 'Lembaga', width: 14 },
  { key: 'jp_minggu', header: 'JP per minggu', width: 14 }
]
async function unduhTemplateBeban() {
  // v.1.2.1: 1 baris = 1 guru + 1 sekolah + total JP sepekan (tak lagi per mapel/hari).
  const contoh = [
    {
      guru_id: '',
      nama: '(nama guru persis / atau isi Guru ID)',
      lembaga: 'SDI',
      jp_minggu: 24
    },
    {
      guru_id: '',
      nama: '(nama guru persis / atau isi Guru ID)',
      lembaga: 'PKBM',
      jp_minggu: 12
    }
  ]
  await exportSimple(contoh, {
    filename: 'Template_Beban_Mengajar.xlsx',
    sheetName: 'Beban',
    columns: BEBAN_COLS,
    title: 'TEMPLATE BEBAN MENGAJAR — 1 baris = 1 guru di 1 sekolah; JP = total sepekan'
  })
}
async function exportBebanExcel() {
  const rows = bebanMengajarList.value.map((b) => ({
    guru_id: b.guru_id,
    nama: namaGuruById(b.guru_id),
    lembaga: b.lembaga,
    jp_minggu: Number(b.jp_minggu) || 0
  }))
  await exportSimple(rows, {
    filename: 'Beban_Mengajar_Sekolah.xlsx',
    sheetName: 'Beban',
    columns: BEBAN_COLS,
    title: 'BEBAN MENGAJAR SEKOLAH (JP per minggu per guru)'
  })
}
async function imporBebanExcel(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporBebanBusy.value = true
  try {
    const rows = await importFile(file)
    const byNama = {}
    for (const g of guruRaw.value || [])
      byNama[
        String(g.nama || '')
          .trim()
          .toLowerCase()
      ] = g
    let ok = 0
    let miss = 0
    for (const r of rows) {
      const id = String(pickCol(r, ['guru_id', 'id']) || '').trim()
      const nama = String(pickCol(r, ['nama', 'nama guru']) || '').trim()
      const g =
        (id && (guruRaw.value || []).find((x) => String(x.id) === id)) ||
        byNama[nama.toLowerCase()] ||
        null
      // v.1.2.1: kolom utama `jp_minggu`. Nama lama ('jp'/'jumlah jp') tetap diterima
      //   supaya file lama yang sudah terlanjur dibuat Kyai tak langsung ditolak.
      const jp =
        Number(
          parseRp(pickCol(r, ['jp_minggu', 'jp per minggu', 'jp/minggu', 'jp', 'jumlah jp']))
        ) || 0
      if (!g || jp <= 0) {
        miss++
        continue
      }
      bebanMengajarList.value.push({
        guru_id: String(g.id),
        lembaga: String(pickCol(r, ['lembaga']) || '').trim(),
        jp_minggu: jp
      })
      ok++
    }
    toast.success(
      `${ok} baris beban diimpor${miss ? `, ${miss} dilewati` : ''}. Klik "Simpan Semua".`
    )
  } catch (e) {
    toast.error('Gagal impor: ' + (e.message || e))
  } finally {
    imporBebanBusy.value = false
    ev.target.value = ''
  }
}

// v.1.1.x: dialog Tambah/Ubah jenis (model tabel gaya Braja Soft)
const dlgOpen = ref(false)
const dlgIsNew = ref(false)
const dlgIdx = ref(-1)
const dlgJenis = ref(null)
// Kyai 4 Agu: pilihan "Masuk Kas Lembaga" = baris master + kas yang BUKAN lembaga
//   (TPQ payung, Fullday, Ma'had) — lihat utils/kasLembaga. Nilai yang sedang dipakai
//   ikut disertakan supaya setelan lama tak lenyap saat disimpan.
const opsiKas = computed(() => opsiKasLembaga(lembagaRaw.value, dlgJenis.value?.kas_lembaga || ''))
const dlgTarif = ref(false)
// Kyai 3 Agu: paket nominal pilihan (santri boleh ambil di atas standar) — BERDIRI SENDIRI,
//   tak menyentuh penggabungan syahriyah. Diskon anak guru dicabut 5 Agu (pindah ke POS).
const dlgPaket = ref(false)
// Kyai 3-4 Agu: penggabungan syahriyah. "200rb itu sudah termasuk, baik untuk TPQ (90rb)
//   atau PTPT (100rb)" — jenis ngaji tak ditagih sendiri, nominalnya jadi KOMPONEN di dalam
//   tagihan sekolah/fullday, dan saat dibayar dipecah kembali per lembaga di Buku Induk.
const dlgGabung = ref(false)
// Pratinjau generate (read-only). Memanggil autoGenerate(true) — jalur hitung SAMA PERSIS.
const praOpen = ref(false)
const praBusy = ref(false)
const praRows = ref([])
const praTotal = computed(() => praRows.value.reduce((a, r) => a + Number(r.nominal || 0), 0))
const praGabungan = computed(
  () => praRows.value.filter((r) => Array.isArray(r.komponen) && r.komponen.length).length
)
async function pratinjauGenerate() {
  if (praBusy.value || generating.value) return
  praBusy.value = true
  try {
    const rows = await autoGenerate(true)
    praRows.value = Array.isArray(rows) ? rows : []
    praOpen.value = true
  } catch (e) {
    toast.error('Gagal menghitung pratinjau: ' + (e?.message || e))
  } finally {
    praBusy.value = false
  }
}
/** Kandidat target: jenis LAIN di daftar (tak boleh menempel ke diri sendiri). */
const jenisLainOpsi = computed(() =>
  (jenisList.value || [])
    .filter(
      (j) =>
        String(j?.label || '').trim() && String(j?.id || '') !== String(dlgJenis.value?.id || '')
    )
    .map((j) => ({ id: String(j.id || ''), label: String(j.label || '') }))
)
function toggleGabungKe(jenis, id) {
  if (!jenis) return
  if (!Array.isArray(jenis.gabung_ke)) jenis.gabung_ke = []
  const i = jenis.gabung_ke.indexOf(id)
  if (i >= 0) jenis.gabung_ke.splice(i, 1)
  else jenis.gabung_ke.push(id)
}
function tambahPaket(j) {
  if (!j) return
  if (!Array.isArray(j.paket)) j.paket = []
  j.paket.push({ id: '', label: '', nominal: 0 })
}
function hapusPaket(j, idx) {
  if (!j || !Array.isArray(j.paket)) return
  j.paket.splice(idx, 1)
}
/** Ringkasan untuk judul accordion — sejajar tarifKhususInfo. */
function paketDiskonInfo(j) {
  if (!j) return ''
  const bits = []
  const n = (Array.isArray(j.paket) ? j.paket : []).filter((p) =>
    String(p?.label || '').trim()
  ).length
  if (n) bits.push(`${n} paket`)
  return bits.join(' · ')
}
// v.1.1.x: jenis pembayaran per Tahun Ajaran (Braja "Daftar Jenis Biaya per Tahun Pelajaran")
const jenisByTA = ref({}) // { '2026/2027': [ ...jenis ] }
const taAktif = ref('')
const taBerjalan = computed(() => {
  const d = new Date()
  const y = d.getFullYear()
  return d.getMonth() >= 6 ? `${y}/${y + 1}` : `${y - 1}/${y}` // Juli = awal tahun ajaran
})
const taBerikut = computed(() => {
  const a =
    Number(String(taAktif.value || taBerjalan.value).split('/')[0]) || new Date().getFullYear()
  return `${a + 1}/${a + 2}`
})
const TA_LIST = computed(() => {
  const set = new Set(Object.keys(jenisByTA.value))
  set.add(taBerjalan.value)
  const a = Number(taBerjalan.value.split('/')[0])
  set.add(`${a + 1}/${a + 2}`)
  return [...set].sort()
})
// v.110: Excel template + impor (jenis pembayaran & bisyaroh pegawai)
const { exportSimple, importFile } = useExcel()
const imporJenisBusy = ref(false)

const form = reactive({
  keu_jatuh_tempo: 10,
  keuMulaiTagih: '', // v.1.2.x: bulan pertama pencatatan tagihan (YYYY-MM); kosong = ikut awal T.A.
  keu_auto_generate_cron: true, // v.95.0626: kill-switch cron server auto-generate
  // v.21.89.0527: Lebar kertas struk POS (dot-matrix). '9.5' = Epson LX-310 continuous form (default).
  posStrukPaper: '9.5',
  // v.95.0626: penyetelan struk cetak PDF slip (mm) — bisa diatur sendiri tanpa rebuild
  posStrukSlipW: 190,
  posStrukSlipH: 140,
  posStrukTopMm: 2,
  posStrukLeftMm: 0, // v.96.0626: geser kanan (center) utk cetak grafis ESC/P
  keu_jenis_tagihan: [],
  // v.1.1.9: 5 tarif shift global (keu_bisyaroh_pagi/sore/sekolah_shift/pegawai_*)
  //   + map pokok per guru (keu_bisyaroh_pokok/keu_bisyaroh_sekolah) DIHAPUS —
  //   diganti settings.keuBisyarohJenis ber-scope. Lihat utils/bisyarohScope.js.
  keu_glondongan_per_juz: '', // v.111: bisyaroh tes glondongan PTPT per juz disimak
  keu_kategori_masuk: [],
  keu_kategori_keluar: [],
  keu_tabungan_kategori: [], // {id,label,nominal_default} -> settings.keuTabunganKategori
  master_tunjangan: [],
  master_potongan: [], // potongan BISYAROH guru — beda dari keuPotonganPos di bawah
  keuPotonganPos: [], // potongan POS per baris transaksi santri {id,label,tipe,nilai,aktif}
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
  // v.1.1.9: Jenis Bisyaroh. Belum ada → [] (SENGAJA tak di-seed dari tarif lama:
  //   jangan memunculkan nominal yang tak pernah Kyai setujui di tabel baru).
  jenisBisyarohList.value = bacaJenisBisyaroh(s)
  // Kyai 7 Agu 2026: Jenis Tunjangan. Selama kunci barunya belum pernah disimpan, isinya
  //   diturunkan dari `master_tunjangan` lama supaya tak ada tunjangan yang hilang diam-diam
  //   saat halaman ini pertama kali dibuka sesudah pembaruan.
  jenisTunjanganListRef.value = bacaJenisTunjangan(s)
  // v.1.2.1: bentuk baru { guru_id, lembaga, jp_minggu }. Baris bentuk LAMA
  //   ({ jp per pertemuan, hari[] }) dibaca-mundur jadi jp_minggu = jp × jumlah hari,
  //   sama persis dengan cara lama menghitungnya — jadi angkanya tak berubah.
  bebanMengajarList.value = Array.isArray(s.bebanMengajar)
    ? s.bebanMengajar.map((b) => {
        let jpm = Number(b.jp_minggu)
        if (!Number.isFinite(jpm) || jpm <= 0) {
          const hariLama = Array.isArray(b.hari)
            ? b.hari.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6)
            : []
          jpm = (Number(b.jp) || 0) * hariLama.length
        }
        return {
          guru_id: String(b.guru_id ?? ''),
          lembaga: String(b.lembaga ?? ''),
          jp_minggu: jpm > 0 ? jpm : 0
        }
      })
    : []
  hariAktifLembagaMap.value =
    s.hariAktifLembaga && typeof s.hariAktifLembaga === 'object' ? { ...s.hariAktifLembaga } : {}
  form.keu_jatuh_tempo = s.keu_jatuh_tempo || 10
  form.keuMulaiTagih = s.keuMulaiTagih || '' // v.1.2.x
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
            // v.1.2.6: whitelist status santri (non_mukim/mahad/fullday)
            status_only: Array.isArray(t.status_only) ? [...t.status_only] : [],
            // v.1.2.x: whitelist jenis kelamin (Putra=L / Putri=P)
            jk_only: Array.isArray(t.jk_only) ? [...t.jk_only] : [],
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
  // v.1.1.x: jenis per Tahun Ajaran. Pakai byTA baru bila ada; else migrasi legacy → byTA[TA berjalan].
  const rawByTA = s.keuTagihanJenisByTA
  const nextByTA = {}
  if (rawByTA && typeof rawByTA === 'object' && Object.keys(rawByTA).length > 0) {
    for (const [ta, list] of Object.entries(rawByTA)) {
      const norm = (Array.isArray(list) ? list : []).map(normalizeJenisRaw)
      if (!norm.find((t) => t.id === 'syahriyah'))
        norm.unshift(
          normalizeJenisRaw({ id: 'syahriyah', label: 'Syahriyah', frekuensi: 'bulanan' })
        )
      nextByTA[ta] = norm
    }
  }
  const taNow = taBerjalan.value
  // Migrasi dari keuTagihanJenis (global) lama. Lewat normalizeJenisRaw supaya jalur ini
  //   tak lagi menjatuhkan field yang lahir belakangan — pembangun `arr` di atas warisan
  //   v.21 dan tak pernah ikut ditambahi shift_only/gabung_ke/paket/kas_lembaga.
  if (!nextByTA[taNow]) nextByTA[taNow] = arr.map(normalizeJenisRaw)
  jenisByTA.value = nextByTA
  taAktif.value = taNow
  jenisList.value = nextByTA[taNow]
  form.keu_jenis_tagihan = jenisList.value.map((t) => t.label)

  form.keu_glondongan_per_juz = fmtRp(s.keu_glondongan_per_juz || 0)

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
  // v.1.1.9: field inline lama (nominalFmt/_guruExpanded/_guruSearch) dibuang — kini pakai dialog.
  const _mapMaster = (t) => ({
    nama: t.nama || '',
    nominal: Number(t.nominal) || 0,
    guru_ids: Array.isArray(t.guru_ids) ? t.guru_ids.map(String) : []
  })
  form.master_tunjangan = Array.isArray(s.master_tunjangan)
    ? s.master_tunjangan.map(_mapMaster)
    : []
  form.master_potongan = Array.isArray(s.master_potongan) ? s.master_potongan.map(_mapMaster) : []
  // Dinormalisasi supaya baris cacat dari settings tak sampai ke daftar pilihan kasir.
  form.keuPotonganPos = normalisasiPotongan(s.keuPotonganPos)
  form.bank_nama = s.bank_nama || ''
  form.bank_nomor = s.bank_nomor || ''
  form.bank_atasnama = s.bank_atasnama || ''
  // v.97.0626: BMT PETA Virtual Account
  form.bmt_aktif = s.bmt_aktif === true
  form.bmt_nama = s.bmt_nama || ''
  form.bmt_va_prefix = s.bmt_va_prefix || ''

  hidrasiKeu.value = sidikJariKeu(s) // Kyai 7 Agu: bekal penjaga simpan (lihat simpan())
}

// ── Penjaga anti-timpa config keuangan (Kyai, 7 Agu 2026) ────────────────────
// Layar ini menyimpan SELURUH daftar jenis pembayaran & bisyaroh sekaligus. Kalau ia
// terhidrasi saat row `settings/keuangan` tak terbaca (sesi zombie, jaringan, peran, atau
// aplikasi lawas yang tak kenal row itu), yang tampil adalah fallback hardcoded — dan satu
// klik "Simpan Semua" menerbitkan fallback itu sebagai config sungguhan. Itu bukan teori:
// 7 Agu 2026 salinan default persis begitu ditemukan sudah tertulis di settings/general.
//
// Dua lapis penjagaan, dua kegagalan yang berbeda:
//   1. `keuanganTerbaca` — row-nya memang tak pernah terbaca sejak halaman dimuat.
//   2. sidik jari — row-nya terbaca, TAPI isinya kini memuat jenis yang layar ini tak
//      pernah lihat (perangkat lain menyimpan lebih dulu, atau hidrasinya basi). Menyimpan
//      akan MENGHAPUS jenis itu tanpa Kyai pernah melihatnya.
const hidrasiKeu = ref(null)

/** Kumpulan id jenis (pembayaran semua T.A. + bisyaroh) di satu objek settings. */
function sidikJariKeu(s) {
  const ids = new Set()
  const serap = (arr, awalan) => {
    for (const j of Array.isArray(arr) ? arr : []) {
      const id = String(j?.id || j?.label || '').trim()
      if (id) ids.add(awalan + id.toLowerCase())
    }
  }
  serap(s?.keuTagihanJenis, 'bayar:')
  const byTA = s?.keuTagihanJenisByTA
  if (byTA && typeof byTA === 'object') {
    for (const [ta, list] of Object.entries(byTA)) serap(list, `bayar:${ta}:`)
  }
  serap(s?.keuBisyarohJenis, 'bisyaroh:')
  return ids
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

// v.1.2.6: toggle STATUS santri di whitelist (non_mukim/mahad/fullday)
function toggleStatusOnly(jenis, statusKey) {
  if (!Array.isArray(jenis.status_only)) jenis.status_only = []
  const i = jenis.status_only.indexOf(statusKey)
  if (i >= 0) jenis.status_only.splice(i, 1)
  else jenis.status_only.push(statusKey)
}

// Kyai 4 Agu: toggle SHIFT NGAJI di whitelist (pagi/sore)
function toggleShiftOnly(jenis, shiftKey) {
  if (!Array.isArray(jenis.shift_only)) jenis.shift_only = []
  const i = jenis.shift_only.indexOf(shiftKey)
  if (i >= 0) jenis.shift_only.splice(i, 1)
  else jenis.shift_only.push(shiftKey)
}

// v.1.2.x: toggle JENIS KELAMIN di whitelist (L=Putra / P=Putri)
function toggleJkOnly(jenis, jkKey) {
  if (!Array.isArray(jenis.jk_only)) jenis.jk_only = []
  const i = jenis.jk_only.indexOf(jkKey)
  if (i >= 0) jenis.jk_only.splice(i, 1)
  else jenis.jk_only.push(jkKey)
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

function masterScopeLabel(item) {
  const n = Array.isArray(item.guru_ids) ? item.guru_ids.length : 0
  return n === 0 ? 'Semua guru/pegawai' : n + ' guru dipilih'
}

function removeMaster(kind, idx) {
  ;(kind === 'tunjangan' ? form.master_tunjangan : form.master_potongan).splice(idx, 1)
}

// ── Potongan POS (per baris transaksi santri) ────────────────────────────────
// Baris baru sengaja lahir AKTIF dengan tipe persen: bentuk yang paling sering dipakai
//   (mis. "Anak Guru 50%"), dan nilai 0 membuatnya belum muncul di POS sampai diisi.
function tambahPotonganPos() {
  form.keuPotonganPos.push({
    // id harus UNIK & stabil: POS memilih potongan lewat id, dan id kembar membuat baris
    //   keranjang mengambil potongan yang salah.
    id: 'pot_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    label: '',
    tipe: 'persen',
    nilai: 0,
    aktif: true
  })
}
function hapusPotonganPos(idx) {
  form.keuPotonganPos.splice(idx, 1)
}

// v.1.1.9: dialog Tambah/Ubah Tunjangan/Potongan (ganti edit inline yg field nama-nya
//   tak kelihatan & pemilih guru sesak).
const dlgMasterOpen = ref(false)
const dlgMasterKind = ref('tunjangan')
const dlgMasterIdx = ref(-1)
const dlgMasterIsNew = ref(false)
const dlgMaster = ref(null)
const dlgMasterSearch = ref('')
const dlgMasterPilih = ref(false) // buka daftar guru walau belum ada yg dipilih

const dlgMasterGuruCari = computed(() => {
  const kw = String(dlgMasterSearch.value || '')
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
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''))).slice(0, 80)
})

function openMasterBaru(kind) {
  dlgMasterKind.value = kind
  dlgMasterIsNew.value = true
  dlgMasterIdx.value = -1
  dlgMaster.value = { nama: '', nominal: 0, guru_ids: [] }
  dlgMasterSearch.value = ''
  dlgMasterPilih.value = false
  dlgMasterOpen.value = true
}
function openMasterDialog(kind, item, idx) {
  dlgMasterKind.value = kind
  dlgMasterIsNew.value = false
  dlgMasterIdx.value = idx
  dlgMaster.value = {
    nama: item.nama || '',
    nominal: Number(item.nominal) || 0,
    guru_ids: Array.isArray(item.guru_ids) ? item.guru_ids.map(String) : []
  }
  dlgMasterSearch.value = ''
  dlgMasterPilih.value = false
  dlgMasterOpen.value = true
}
function toggleGuruDlg(guruId) {
  const sid = String(guruId)
  const cur = dlgMaster.value.guru_ids.map(String)
  const i = cur.indexOf(sid)
  if (i >= 0) cur.splice(i, 1)
  else cur.push(sid)
  dlgMaster.value.guru_ids = cur
}
function simpanMaster() {
  const m = dlgMaster.value
  if (!m) return
  const nama = String(m.nama || '').trim()
  if (!nama) {
    toast.warning('Nama wajib diisi')
    return
  }
  const entry = {
    nama,
    nominal: Number(m.nominal) || 0,
    guru_ids: [...new Set(m.guru_ids.map(String))]
  }
  const list = dlgMasterKind.value === 'tunjangan' ? form.master_tunjangan : form.master_potongan
  if (dlgMasterIsNew.value) list.push(entry)
  else list.splice(dlgMasterIdx.value, 1, entry)
  dlgMasterOpen.value = false
  toast.info('Perubahan siap — klik "Simpan Semua" untuk menyimpan permanen.')
}

// ── v.1.1.9: Excel Jenis Bisyaroh + Tunjangan/Potongan (template = juga berfungsi
//   sebagai ekspor karena berisi data saat ini; impor MENGGABUNG by nama/id, tak
//   menghapus yang tak ada di file). ──
const csvArr = (v) =>
  String(v == null ? '' : v)
    .split(/[;,]/)
    .map((x) => x.trim())
    .filter(Boolean)
const imporJenisBsyBusy = ref(false)
const imporMasterBusy = ref(false)

function unduhTemplateJenisBisyaroh() {
  const rows = jenisBisyarohList.value.map((j) => ({
    nama: j.label,
    hitungan: j.hitungan,
    nominal: Number(j.nominal || 0),
    jabatan: (j.scope.jabatan || []).join(', '),
    lembaga: (j.scope.lembaga || []).join(', '),
    shift: (j.scope.shift || []).map(shiftLabelById).join(', '),
    aktif: j.aktif === false ? 'tidak' : 'ya'
  }))
  if (rows.length === 0)
    rows.push(
      {
        nama: 'Contoh: Pokok Guru PTPT',
        hitungan: 'flat',
        nominal: 500000,
        jabatan: 'Guru',
        lembaga: 'PTPT',
        shift: '',
        aktif: 'ya'
      },
      {
        nama: 'Contoh: Bonus Hadir Pagi',
        hitungan: 'per_hadir',
        nominal: 10000,
        jabatan: '',
        lembaga: '',
        shift: 'Pagi',
        aktif: 'ya'
      }
    )
  exportSimple(rows, {
    filename: 'jenis_bisyaroh.xlsx',
    sheetName: 'Jenis Bisyaroh',
    title: 'Jenis Bisyaroh — Ammu (scope dikosongkan = berlaku semua)',
    columns: [
      { key: 'nama', header: 'Nama', width: 30 },
      { key: 'hitungan', header: 'Hitungan (flat/per_hadir/per_jp/per_shift)', width: 30 },
      { key: 'nominal', header: 'Nominal', width: 14 },
      { key: 'jabatan', header: 'Jabatan (pisah koma)', width: 24 },
      { key: 'lembaga', header: 'Lembaga (pisah koma)', width: 24 },
      { key: 'shift', header: 'Shift (pisah koma)', width: 20 },
      { key: 'aktif', header: 'Aktif (ya/tidak)', width: 14 }
    ]
  })
}

async function imporJenisBisyaroh(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporJenisBsyBusy.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    // shift: terima label ATAU id
    const shiftMap = {}
    for (const s of shiftScopeOptions.value) {
      shiftMap[String(s.label).toLowerCase()] = s.id
      shiftMap[String(s.id).toLowerCase()] = s.id
    }
    const next = [...jenisBisyarohList.value]
    let imported = 0
    for (const r of rows) {
      const nama = String(pickCol(r, ['nama', 'label', 'jenis']) || '').trim()
      if (!nama || /^contoh:/i.test(nama)) continue
      const hitStr = String(
        pickCol(r, [
          'hitungan (flat/per_hadir/per_jp/per_shift)',
          'hitungan (flat/per_hadir/per_jp)',
          'hitungan (flat/per_hadir)',
          'hitungan',
          'cara hitung'
        ]) || ''
      ).toLowerCase()
      const hitungan = hitStr.includes('tepat')
        ? 'per_tepat'
        : hitStr.includes('jp')
          ? 'per_jp'
          : hitStr.includes('shift')
            ? 'per_shift'
            : hitStr.includes('hadir')
              ? 'per_hadir'
              : 'flat'
      const nominal = parseRp(pickCol(r, ['nominal', 'tarif']))
      const shift = csvArr(pickCol(r, ['shift (pisah koma)', 'shift']))
        .map((x) => shiftMap[x.toLowerCase()] || slugJenisId(x))
        .filter(Boolean)
      const aktifStr = String(pickCol(r, ['aktif (ya/tidak)', 'aktif']) || 'ya').toLowerCase()
      const entry = normalizeJenisBisyaroh({
        id: slugJenisId(nama),
        label: nama,
        hitungan,
        nominal,
        scope: {
          jabatan: csvArr(pickCol(r, ['jabatan (pisah koma)', 'jabatan'])),
          lembaga: csvArr(pickCol(r, ['lembaga (pisah koma)', 'lembaga'])),
          shift
        },
        aktif: !['tidak', 'no', 'nonaktif', '0', 'n'].includes(aktifStr)
      })
      if (!entry.id) continue
      const i = next.findIndex((x) => x.id === entry.id)
      if (i >= 0) next[i] = entry
      else next.push(entry)
      imported++
    }
    jenisBisyarohList.value = next
    toast.success(`${imported} jenis bisyaroh diimpor. Cek lalu klik "Simpan Semua".`)
  } catch (e) {
    toast.error('Gagal impor: ' + (e.message || e))
  } finally {
    imporJenisBsyBusy.value = false
    ev.target.value = ''
  }
}

function _guruNamaByIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return 'Semua'
  return ids
    .map((id) => (guruRaw.value || []).find((g) => String(g.id) === String(id))?.nama || id)
    .join(', ')
}
function unduhTemplateMasterTP() {
  // Kyai 7 Agu 2026: tunjangan pindah ke Jenis Tunjangan ber-scope, yang tak muat di
  //   Excel 4 kolom ini (jabatan/lembaga/shift/syarat). Jadi template ini POTONGAN saja —
  //   mengekspornya setengah jadi lalu mengimpornya balik akan memangkas scope diam-diam.
  const rows = []
  for (const p of form.master_potongan)
    rows.push({
      tipe: 'potongan',
      nama: p.nama,
      nominal: Number(p.nominal || 0),
      guru: _guruNamaByIds(p.guru_ids)
    })
  if (rows.length === 0)
    rows.push({
      tipe: 'potongan',
      nama: 'Contoh: Kasbon',
      nominal: 50000,
      guru: 'Nama Guru A, Nama Guru B'
    })
  exportSimple(rows, {
    filename: 'tunjangan_potongan.xlsx',
    sheetName: 'Tunjangan & Potongan',
    title: 'Tunjangan & Potongan — Ammu (Guru: "Semua" atau nama pisah koma)',
    columns: [
      { key: 'tipe', header: 'Tipe (tunjangan/potongan)', width: 24 },
      { key: 'nama', header: 'Nama', width: 28 },
      { key: 'nominal', header: 'Nominal', width: 14 },
      { key: 'guru', header: 'Guru (Semua / nama pisah koma)', width: 38 }
    ]
  })
}
async function imporMasterTP(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  imporMasterBusy.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / tidak ada data')
      return
    }
    const guruByNama = {}
    for (const g of guruRaw.value || [])
      guruByNama[
        String(g.nama || '')
          .trim()
          .toLowerCase()
      ] = String(g.id)
    const incTunj = []
    const incPot = []
    let miss = 0
    for (const r of rows) {
      const nama = String(pickCol(r, ['nama']) || '').trim()
      if (!nama || /^contoh:/i.test(nama)) continue
      const isPot = String(pickCol(r, ['tipe (tunjangan/potongan)', 'tipe']) || 'tunjangan')
        .toLowerCase()
        .includes('poton')
      const nominal = parseRp(pickCol(r, ['nominal']))
      const guruStr = String(pickCol(r, ['guru (semua / nama pisah koma)', 'guru']) || '').trim()
      const guru_ids = []
      if (guruStr && guruStr.toLowerCase() !== 'semua') {
        for (const nm of csvArr(guruStr)) {
          const id = guruByNama[nm.toLowerCase()]
          if (id) guru_ids.push(id)
          else miss++
        }
      }
      ;(isPot ? incPot : incTunj).push({ nama, nominal, guru_ids: [...new Set(guru_ids)] })
    }
    const mergeByNama = (existing, incoming) => {
      const out = existing.map((x) => ({ ...x }))
      for (const e of incoming) {
        const i = out.findIndex(
          (x) =>
            String(x.nama || '')
              .trim()
              .toLowerCase() === e.nama.toLowerCase()
        )
        if (i >= 0) out[i] = e
        else out.push(e)
      }
      return out
    }
    form.master_potongan = mergeByNama(form.master_potongan, incPot)
    // Baris `tipe: tunjangan` di berkas lama SENGAJA diabaikan, bukan diam-diam ditelan:
    //   tunjangan kini ber-scope (jabatan/lembaga/shift/syarat) dan Excel 4 kolom ini tak
    //   memuatnya — menerimanya berarti membuat tunjangan tanpa scope yang tampak sah.
    toast.success(
      `${incPot.length} potongan diimpor${miss ? `, ${miss} nama guru tak cocok` : ''}. Klik "Simpan Semua".`
    )
    if (incTunj.length > 0) {
      toast.warning(
        `${incTunj.length} baris "tunjangan" dilewati — tunjangan kini diatur di kartu Jenis Tunjangan (ber-scope), bukan lewat Excel ini.`
      )
    }
  } catch (e) {
    toast.error('Gagal impor: ' + (e.message || e))
  } finally {
    imporMasterBusy.value = false
    ev.target.value = ''
  }
}

// v.1.1.x: serialize satu daftar jenis (dipakai per Tahun Ajaran saat Simpan Semua)
function serializeJenisList(list) {
  return (list || [])
    .filter((t) => String(t.label || '').trim())
    .map((t) => {
      const perL = {}
      if (t.nominal_per_lembaga && typeof t.nominal_per_lembaga === 'object') {
        for (const [k, v] of Object.entries(t.nominal_per_lembaga)) {
          const n = Number(v) || 0
          if (n > 0) perL[k] = n
        }
      }
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
      // v.1.2.6: whitelist status santri (non_mukim/mahad/fullday)
      const wlStatus = Array.isArray(t.status_only)
        ? t.status_only.filter((x) => String(x || '').trim())
        : []
      // v.1.2.x: whitelist jenis kelamin (L/P)
      const wlJk = Array.isArray(t.jk_only) ? t.jk_only.filter((x) => String(x || '').trim()) : []
      // Kyai 4 Agu: whitelist SHIFT ngaji (pagi/sore) — 'syahriyah pagi untuk ngaji pagi'
      const wlShift = Array.isArray(t.shift_only)
        ? t.shift_only.filter((x) => String(x || '').trim())
        : []
      const frekuensi = t.frekuensi || (t.auto_generate ? 'bulanan' : 'manual')
      // Kyai 3 Agu: paket nominal pilihan. Label WAJIB & nominal > 0 — entri setengah jadi
      //   dibuang supaya tak ada paket "hantu" yang bisa dipilih di data santri.
      //   `id` diturunkan dari label bila kosong, dan itulah yang disimpan di
      //   santri.paket_syahriyah — jadi JANGAN ganti label sembarangan sesudah dipakai.
      const paket = (Array.isArray(t.paket) ? t.paket : [])
        .map((p) => {
          const label = String(p?.label || '').trim()
          return {
            id: String(p?.id || '').trim() || slugId(label),
            label,
            nominal: Number(p?.nominal || 0) || 0
          }
        })
        .filter((p) => p.label && p.nominal > 0)
      // Diskon anak guru/pegawai (persen, 0 = tak ada). Dibatasi 0..100 di sini juga supaya
      //   angka aneh dari impor/ketik tak lolos ke perhitungan uang.
      // Kyai 3-4 Agu: penggabungan. `gabung_ke` = daftar KANDIDAT target (sisi sekolah ada
      //   4 jenis: SD/TK/PKBM/Kelas Baca) — resolver memilih yang berlaku untuk si santri.
      //   Terima bentuk string lama supaya konfigurasi manual/impor tak patah.
      const gabungKe = (Array.isArray(t.gabung_ke) ? t.gabung_ke : t.gabung_ke ? [t.gabung_ke] : [])
        .map((x) => String(x || '').trim())
        .filter(Boolean)
      const gabungSyarat = GABUNG_SYARAT.some((x) => x.key === t.gabung_syarat)
        ? t.gabung_syarat
        : 'punya_sekolah'
      return {
        id: t.id || slugId(t.label),
        label: String(t.label || '').trim(),
        nominal_default: Number(t.nominal_default || 0) || 0,
        nominal_per_lembaga: perL,
        nominal_per_kelas: perK,
        nominal_per_santri: perS,
        lembaga_only: wl,
        status_only: wlStatus,
        jk_only: wlJk,
        shift_only: wlShift,
        // Kyai 4 Agu: kas lembaga — uang jenis ini masuk buku kas lembaga mana.
        //   BEDA dari lembaga_only (itu penyaring "siapa yang ditagih").
        kas_lembaga: String(t.kas_lembaga || '').trim(),
        gabung_ke: gabungKe,
        gabung_syarat: gabungSyarat,
        paket,
        frekuensi,
        auto_generate: frekuensi === 'bulanan',
        pos: t.pos || ''
      }
    })
}

/**
 * Boleh menulis kunci keuangan sekarang? Dijalankan TEPAT sebelum menulis.
 *
 * Membaca ulang row `settings/keuangan` dari server (bukan dari store) — justru kegagalan
 * membaca itulah yang hendak dideteksi, dan store bisa saja sudah lama basi.
 * @returns {Promise<string>} '' = boleh; selain itu = alasan penolakan (siap ditampilkan).
 */
async function alasanTolakSimpanKeu() {
  let server = null
  try {
    server = await getOne('settings', 'keuangan')
  } catch (e) {
    return (
      'Config keuangan di server tidak bisa dibaca (' +
      (e?.message || e) +
      '). Simpan dibatalkan supaya isi layar ini tidak menimpa data yang tersimpan. ' +
      'Coba logout lalu login lagi, periksa koneksi, dan buka ulang halaman ini.'
    )
  }
  // Server kosong / row belum ada → tak ada yang bisa hilang; menyimpan justru membuatnya.
  const idsServer = sidikJariKeu(server || {})
  if (idsServer.size === 0) return ''
  if (!settingsStore.keuanganTerbaca) {
    return (
      'Halaman ini dimuat TANPA config keuangan dari server, jadi yang tampil adalah ' +
      'setelan bawaan — bukan setelan pesantren. Menyimpannya akan menghapus config yang ' +
      'tersimpan. Muat ulang halaman (atau logout–login) sampai daftarnya terisi benar.'
    )
  }
  const dilihat = hidrasiKeu.value || new Set()
  const hilang = [...idsServer].filter((id) => !dilihat.has(id))
  if (hilang.length) {
    return (
      `Di server ada ${hilang.length} jenis yang tak pernah tampil di layar ini ` +
      `(mis. ${hilang
        .slice(0, 3)
        .map((x) => x.split(':').pop())
        .join(', ')}). ` +
      'Kemungkinan tersimpan dari perangkat lain sesudah halaman ini dibuka. Simpan ' +
      'dibatalkan supaya jenis itu tak terhapus — muat ulang halaman dulu, lalu ulangi suntingan.'
    )
  }
  return ''
}

async function simpan() {
  saving.value = true
  try {
    // Kyai 7 Agu: jangan pernah menimpa config keuangan dengan layar yang tak terhidrasi.
    const tolak = await alasanTolakSimpanKeu()
    if (tolak) {
      toast.error(tolak)
      return
    }
    // v.1.1.x: serialize semua Tahun Ajaran; global keuTagihanJenis = TA berjalan (konsumen lama tak berubah)
    const byTA = {}
    for (const [ta, list] of Object.entries(jenisByTA.value)) {
      byTA[ta] = serializeJenisList(list)
    }
    const jenis = byTA[taBerjalan.value] || serializeJenisList(jenisList.value)
    const payload = {
      keu_jatuh_tempo: form.keu_jatuh_tempo,
      keuMulaiTagih: form.keuMulaiTagih || '', // v.1.2.x: bulan pertama pencatatan tagihan
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
      keuTagihanJenisByTA: byTA,
      keu_jenis_tagihan: jenis.map((t) => t.label),
      // v.1.1.9: Jenis Bisyaroh ber-scope menggantikan 5 tarif shift global +
      //   map pokok per guru. Tarif & map lama SENGAJA TIDAK ditulis lagi (Kyai:
      //   "hapus total") — BisyarohView kini menghitung dari daftar ini.
      keuBisyarohJenis: jenisBisyarohList.value.map(normalizeJenisBisyaroh),
      // Kyai 7 Agu 2026: Jenis Tunjangan ber-scope. `master_tunjangan` lama sengaja TIDAK
      //   ditulis lagi — sekali kunci ini tersimpan, ia yang jadi sumber tunggal.
      keuTunjanganJenis: jenisTunjanganListRef.value.map(normalizeJenisTunjangan),
      // v.1.2.1: master beban mengajar (dasar bisyaroh sekolah per_jp) — JP per MINGGU
      //   per guru per sekolah. Kolom mapel & hari dibuang.
      bebanMengajar: bebanMengajarList.value
        .filter((b) => String(b.guru_id || '').trim() && Number(b.jp_minggu) > 0)
        .map((b) => ({
          guru_id: String(b.guru_id),
          lembaga: String(b.lembaga || '').trim(),
          jp_minggu: Number(b.jp_minggu) || 0
        })),
      // v.1.2.1: hari aktif sekolah = PENYEBUT prorata JP (JP/hari = jp_minggu ÷ n hari).
      hariAktifLembaga: hariAktifLembagaMap.value,
      keu_glondongan_per_juz: parseRp(form.keu_glondongan_per_juz),
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
      keuPotonganPos: normalisasiPotongan(form.keuPotonganPos),
      bank_nama: form.bank_nama.trim(),
      bank_nomor: form.bank_nomor.trim(),
      bank_atasnama: form.bank_atasnama.trim(),
      // v.97.0626: Integrasi BMT PETA (Virtual Account)
      bmt_aktif: !!form.bmt_aktif,
      bmt_nama: String(form.bmt_nama || '').trim(),
      bmt_va_prefix: String(form.bmt_va_prefix || '').trim()
    }
    // A1 (audit 29 Jul): kunci keuangan SENSITIF → settings/keuangan (finance-only),
    //   JANGAN ke general/web yang anon-readable (PSB+login). Sinkron dgn KEUANGAN_KEYS
    //   di stores/settings.js.
    const KEU_KEYS = [
      'keuTagihanJenis',
      'keuTagihanJenisByTA',
      'keu_jenis_tagihan',
      'keuBisyarohJenis',
      'keuTunjanganJenis',
      'bebanMengajar',
      'master_tunjangan',
      'master_potongan',
      'keuPotonganPos'
    ]
    const pub = { ...payload }
    const keu = {}
    for (const k of KEU_KEYS) {
      if (k in payload) keu[k] = payload[k]
      delete pub[k]
    }
    await mergeOne('settings', 'general', pub)
    await mergeOne('settings', 'web', pub)
    if (Object.keys(keu).length) await mergeOne('settings', 'keuangan', keu)
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
  const wlStatus = (j.status_only || []).length // v.1.2.6
  const wlShift = (j.shift_only || []).length // Kyai 4 Agu
  const parts = []
  if (wl) parts.push(`${wl} lembaga`)
  if (wlStatus) parts.push(`${wlStatus} status`)
  if (wlShift) parts.push(`shift ${(j.shift_only || []).join('+')}`)
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
    status_only: [], // v.1.2.6: whitelist status santri (kosong = semua)
    jk_only: [], // v.1.2.x: whitelist jenis kelamin (kosong = semua)
    shift_only: [], // Kyai 4 Agu: whitelist shift ngaji pagi/sore (kosong = semua)
    kas_lembaga: '', // Kyai 4 Agu: buku kas lembaga tujuan (kosong = Kas Induk)
    gabung_ke: [], // Kyai 3-4 Agu: kosong = jenis ini ditagih sendiri
    gabung_syarat: 'punya_sekolah',
    nominal_per_kelas: {},
    nominal_per_santri: {},
    paket: [], // Kyai 3 Agu: paket nominal pilihan (kosong = tak ada pilihan)
    frekuensi: 'manual',
    pos: '',
    _expanded: false
  }
  dlgTarif.value = false
  dlgPaket.value = false
  dlgGabung.value = false
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

// ==== v.1.1.x: Jenis per Tahun Ajaran + "Salin ke tahun berikutnya" (Braja Copy) ====
function normalizeJenisRaw(t) {
  if (typeof t !== 'object' || t === null) {
    return {
      id: slugId(t),
      label: String(t || ''),
      nominal_default: 0,
      nominal_per_lembaga: {},
      lembaga_only: [],
      nominal_per_kelas: {},
      nominal_per_santri: {},
      shift_only: [],
      kas_lembaga: '', // Kyai 4 Agu: buku kas lembaga tujuan (kosong = Kas Induk)
      gabung_ke: [],
      gabung_syarat: 'punya_sekolah',
      paket: [],
      frekuensi: 'manual',
      auto_generate: false,
      pos: '',
      _expanded: false
    }
  }
  const frekuensi = t.frekuensi || (t.auto_generate ? 'bulanan' : 'manual')
  return {
    id: t.id || slugId(t.label || t.nama || ''),
    label: t.label || t.nama || '',
    nominal_default: Number(t.nominal_default || t.nominal || 0) || 0,
    nominal_per_lembaga:
      t.nominal_per_lembaga && typeof t.nominal_per_lembaga === 'object'
        ? { ...t.nominal_per_lembaga }
        : {},
    lembaga_only: Array.isArray(t.lembaga_only) ? [...t.lembaga_only] : [],
    status_only: Array.isArray(t.status_only) ? [...t.status_only] : [], // v.1.2.6
    jk_only: Array.isArray(t.jk_only) ? [...t.jk_only] : [], // v.1.2.x
    shift_only: Array.isArray(t.shift_only) ? [...t.shift_only] : [], // Kyai 4 Agu
    kas_lembaga: String(t.kas_lembaga || '').trim(), // Kyai 4 Agu: buku kas tujuan
    // Kyai 3-4 Agu: penggabungan (daftar kandidat target + syaratnya)
    gabung_ke: Array.isArray(t.gabung_ke)
      ? [...t.gabung_ke]
      : t.gabung_ke
        ? [String(t.gabung_ke)]
        : [],
    gabung_syarat: t.gabung_syarat || 'punya_sekolah',
    nominal_per_kelas:
      t.nominal_per_kelas && typeof t.nominal_per_kelas === 'object'
        ? JSON.parse(JSON.stringify(t.nominal_per_kelas))
        : {},
    nominal_per_santri:
      t.nominal_per_santri && typeof t.nominal_per_santri === 'object'
        ? { ...t.nominal_per_santri }
        : {},
    // Kyai 3 Agu: paket nominal pilihan. Deep-copy paket supaya edit di
    //   dialog (yang bekerja atas salinan) tak menyentuh daftar aslinya sebelum disimpan.
    paket: Array.isArray(t.paket) ? JSON.parse(JSON.stringify(t.paket)) : [],
    frekuensi,
    auto_generate: frekuensi === 'bulanan',
    pos: t.pos || '',
    _expanded: false
  }
}
function ensureTA(ta) {
  if (!jenisByTA.value[ta]) {
    jenisByTA.value[ta] = [
      normalizeJenisRaw({ id: 'syahriyah', label: 'Syahriyah', frekuensi: 'bulanan' })
    ]
  }
  return jenisByTA.value[ta]
}
function salinTahunAjaran() {
  const src = jenisByTA.value[taAktif.value] || []
  const target = taBerikut.value
  if (
    Array.isArray(jenisByTA.value[target]) &&
    jenisByTA.value[target].length > 0 &&
    !confirm(
      `Tahun ${target} sudah punya ${jenisByTA.value[target].length} jenis. Timpa dengan salinan dari ${taAktif.value}?`
    )
  )
    return
  jenisByTA.value[target] = JSON.parse(JSON.stringify(src))
  taAktif.value = target // watch → jenisList ikut pindah
  toast.success(`Jenis disalin ke ${target}. Edit seperlunya lalu klik "Simpan Semua".`)
}
// Ganti Tahun Ajaran aktif → jenisList ikut (arsip per-TA). form label ikut disegarkan.
watch(taAktif, (ta) => {
  if (!ta) return
  jenisList.value = ensureTA(ta)
  form.keu_jenis_tagihan = jenisList.value.map((t) => t.label)
})

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

// v.1.1.9: Template + impor Excel "Bisyaroh Pokok Pegawai" DIHAPUS bersama model
//   per-guru-nya. Nominal kini ditentukan lembaga & tugas lewat Jenis Bisyaroh, jadi
//   tak ada lagi 75 baris nominal per orang yang perlu diisi TU di Excel.

// v.21.104.0527: implementasi Vue (gantikan legacy window.autoGenerateSyahriyahManual).
// Generate tagihan utk jenis ber-auto_generate=true (default: Syahriyah)
// utk semua santri aktif, nominal pakai 3-lapis lookup
// (nominal_per_kelas → nominal_per_lembaga → nominal_default).
// Kyai 3-4 Agu: `dryRun` = PRATINJAU. Sengaja jalur kode yang SAMA PERSIS dengan generate
//   (bukan fungsi hitung kedua) supaya angka yang Kyai periksa di pratinjau benar-benar
//   yang akan ditulis. Uang riil sejak 1 Agu — pratinjau yang bisa melenceng dari
//   kenyataan lebih berbahaya daripada tak ada pratinjau.
//   dryRun mengembalikan array baris rencana; mode normal menulis & mengembalikan undefined.
async function autoGenerate(dryRun = false) {
  if (generating.value) return
  if (
    !dryRun &&
    !confirm(
      `Generate tagihan untuk ${gedungScoped.value ? `santri ${myGedung.value}` : 'semua santri aktif'}?\n\nJenis "bulanan" → periode bulan ini. Jenis "tahunan" → tahun ajaran berjalan. Tagihan duplikat (periode sama) di-skip.`
    )
  )
    return
  generating.value = true
  try {
    // v.1.1.x: proses jenis bulanan + tahunan (manual dilewati) — pakai jenis TAHUN AJARAN BERJALAN
    const jenisAuto = (jenisByTA.value[taBerjalan.value] || jenisList.value || []).filter(
      (j) =>
        (j.frekuensi === 'bulanan' || j.frekuensi === 'tahunan') && String(j.label || '').trim()
    )
    if (jenisAuto.length === 0) {
      toast.warning('Tidak ada jenis "bulanan" / "tahunan" untuk di-generate.')
      generating.value = false
      return dryRun ? [] : undefined
    }
    // Periode target dihitung DULU utk membatasi fetch tagihan (D1 audit).
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
    const taStart = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
    const periodeTahun = `TA ${taStart}/${taStart + 1}`
    const jtBulan = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
    const jtTahun = `${taStart}-12-${String(form.keu_jatuh_tempo || 10).padStart(2, '0')}`
    // Fetch santri aktif (v.111: ke-scope ke gedung admin keuangan)
    const santriAktif = (await getAll('santri')).filter((x) => x.aktif !== false && _inMyGedung(x))
    // D1 (audit): fetch tagihan existing HANYA utk periode yang akan digenerate
    //   (dulu getAll seluruh riwayat → lambat saat data menumpuk). Cermin edge
    //   auto-generate-tagihan yang sudah membatasi .eq('periode', ...).
    const tagihanAll = await queryColl('keuangan_tagihan', [
      ['periode', 'in', [periodeBulan, periodeTahun]]
    ])
    const existing = new Set()
    // Kunci KEDUA: id baris yang sudah ada (Kyai 5 Agu 2026, "kalau saya klik ulang
    //   generate apakah duplikat?"). Dedup di atas memakai NAMA jenis, sedangkan `id`
    //   memakai ID jenis — kalau nama sebuah jenis pernah diganti setelah tagihannya
    //   terbit, keduanya tak lagi sejalan: dedup meleset, lalu `setOne` (yang MENIMPA
    //   seluruh baris) menulis ulang dengan terbayar 0 & status 'belum'. Tagihan yang
    //   sudah dibayar akan kembali tampak menunggak dan bisa tertagih dua kali.
    //   Cron tak kena karena memakai upsert ignoreDuplicates; jalur inilah yang perlu
    //   pagar sendiri.
    const existingIds = new Set()
    for (const t of tagihanAll) {
      const key = `${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`
      existing.add(key)
      if (t.id) existingIds.add(String(t.id))
    }
    let created = 0,
      skipped = 0,
      errCount = 0
    const rencana = []
    // Gerbang "Mulai Tagih di AMMU" (Kyai 5 Agu 2026) — tagihan bulan SEBELUM pesantren
    //   mulai memakai AMMU tak boleh lahir; wali langsung melihatnya sebagai tunggakan.
    //   Periode tahunan tak ikut dinilai (gerbangnya soal bulan).
    const _mulaiKode = mulaiTagihKode(settingsStore.settings || {})
    if (!bolehTerbitPeriode(periodeBulan, _mulaiKode)) {
      toast.warning(pesanTolakPeriode(periodeBulan, _mulaiKode))
      generating.value = false
      return dryRun ? [] : undefined
    }
    for (const j of jenisAuto) {
      const tahunan = j.frekuensi === 'tahunan'
      const periode = tahunan ? periodeTahun : periodeBulan
      const jt = tahunan ? jtTahun : jtBulan
      for (const sx of santriAktif) {
        const dupKey = `${String(sx.id)}__${(j.label || '').toLowerCase()}__${periode}`
        if (existing.has(dupKey)) {
          skipped++
          continue
        }
        // Kyai 3-4 Agu: SEMUA aturan pindah ke utils/syahriyah.hitungTagihan —
        //   whitelist (lembaga/status/JK/shift), 4-lapis nominal LAMA, paket, dan pelipatan
        //   jenis ngaji ke tagihan sekolah/fullday. Sengaja satu sumber:
        //   dulu rumus ini disalin di generate manual, cron, generate khusus, dan POS —
        //   empat salinan yang gampang menyimpang. null = santri tak ditagih jenis ini
        //   (tak berlaku / nominal 0 / sudah jadi komponen jenis lain).
        const h = hitungTagihan(j, sx, jenisAuto)
        if (!h) {
          skipped++
          continue
        }
        const idPeriode = tahunan ? `TA${taStart}` : kodeBulan(now)
        const id = idTagihanAuto(sx.id, j.id, idPeriode)
        // Baris dengan id ini sudah ada -> JANGAN ditulis ulang. Diperiksa juga pada
        //   dryRun supaya pratinjau memperlihatkan kenyataan, bukan rencana yang lebih
        //   besar daripada yang benar-benar akan terjadi.
        if (existingIds.has(id)) {
          skipped++
          continue
        }
        const payload = {
          id,
          santri_id: String(sx.id),
          santri_nama: sx.nama || '',
          kategori: j.label || j.id || 'Tagihan',
          periode,
          nominal: h.nominal,
          terbayar: 0,
          status: 'belum',
          jatuh_tempo: jt,
          sumber: 'auto_generate',
          created_at: serverTimestamp()
        }
        // Field tambahan HANYA bila relevan — supaya bentuk baris tagihan biasa tetap
        //   sama persis seperti sebelumnya (tak ada kejutan di pembaca lama).
        if (h.komponen.length) payload.komponen = h.komponen
        if (dryRun) {
          rencana.push(payload)
          continue
        }
        try {
          await setOne('keuangan_tagihan', id, payload)
          created++
        } catch (e) {
          errCount++
          console.warn('[autoGenerate]', sx.nama, e.message)
        }
      }
    }
    if (dryRun) return rencana
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
      // Kyai 3-4 Agu: lapis nominal dari utils/syahriyah (bukan salinan 3-lapis lagi), jadi
      //   PAKET pun terbaca di jalur ini. Urutannya sama dengan hitungTagihan:
      //   per_santri > paket > per_kelas > per_lembaga > default.
      // SENGAJA TANPA whitelist dan TANPA pelipatan:
      //   - target di jalur ini dicentang MANUAL oleh admin → jangan diam-diam melewatinya;
      //   - tagihan khusus (infaq/iuran sekali jalan) tak boleh menempel ke jenis lain;
      const perS = Number((j.nominal_per_santri || {})[String(sx.id)] || 0)
      if (perS > 0) return perS
      const v = paketNominal(j, sx) || nominalDasar(j, sx)
      if (v > 0) return v
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
  // Gerbang "Mulai Tagih di AMMU" (Kyai 5 Agu 2026) — di jalur inilah periode dipilih
  //   BEBAS, jadi ia yang paling mungkin menerbitkan bulan lampau tanpa disadari.
  //   Diperiksa sebelum konfirmasi & sebelum query, supaya tak ada kerja sia-sia.
  const _mulaiKhusus = mulaiTagihKode(settingsStore.settings || {})
  if (!bolehTerbitPeriode(periode, _mulaiKhusus)) {
    toast.warning(pesanTolakPeriode(periode, _mulaiKhusus))
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
    // AUDIT AGU 2026 (P5): dibatasi ke PERIODE sasaran saja — dulu getAll seluruh
    //   tabel (2.805 baris per 3 Agu). Eksak menurut konstruksi: dupKey di bawah
    //   selalu memuat `periode` yang sama, jadi baris periode LAIN mustahil cocok.
    //   Ada index (periode, status) sehingga query-nya murah. Kolom tetap '*' —
    //   kunci dedup memakai `t.kategori || t.jenis`, dan `jenis` tinggal di ekor
    //   jsonb; membuang kolom `data` bisa membuat kunci berbeda -> tagihan DOBEL.
    const tagihanAll = await queryColl('keuangan_tagihan', [['periode', '==', periode]])
    const existing = new Set()
    // Pagar kedua, alasan sama dengan autoGenerate: `setOne` MENIMPA seluruh baris, jadi
    //   baris yang lolos dedup tapi ber-id sama akan kehilangan catatan pembayarannya.
    const existingIds = new Set()
    for (const t of tagihanAll) {
      existing.add(
        `${String(t.santri_id)}__${(t.kategori || t.jenis || '').toLowerCase()}__${t.periode || ''}`
      )
      if (t.id) existingIds.add(String(t.id))
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
      const id = `tagihan_${sx.id}_${katSlug}_${perSlug}`
      if (existingIds.has(id)) {
        skipped++
        continue
      }
      try {
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
