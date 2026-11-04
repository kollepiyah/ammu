<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black">
            <i class="fas fa-money-check-alt text-cyan-500 mr-2"></i>Pembayaran
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            {{ isSantriOnly ? 'Riwayat & metode pembayaran Anda' : 'Log pembayaran semua santri' }}
          </p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs">
          <span class="text-cyan-700 font-bold">{{ fmtRp(totalPembayaran) }}</span>
          <span class="text-[var(--text-secondary)] ml-1">total</span>
        </div>
      </div>
    </div>

    <!-- v.87.0526: header navigasi alur berlangkah (ganti 3-tab). Back/Riwayat kontekstual. -->
    <div
      v-if="isSantriOnly"
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-2 flex items-center justify-between gap-2"
    >
      <div class="flex items-center gap-1.5 min-w-0">
        <button
          v-if="mode === 'flow' && step === 'bayar'"
          class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition cursor-pointer"
          @click="step = 'metode'"
        >
          <i class="fas fa-chevron-left"></i>Pilih metode
        </button>
        <button
          v-else-if="mode === 'riwayat'"
          class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition cursor-pointer"
          @click="mode = 'flow'"
        >
          <i class="fas fa-chevron-left"></i>Pembayaran
        </button>
        <span v-else class="px-1.5 text-sm font-black truncate"
          ><i class="fas fa-wallet text-cyan-500 mr-1"></i>Pilih metode pembayaran</span
        >
      </div>
      <button
        v-if="mode === 'flow'"
        class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black text-[var(--text-secondary)] hover:bg-slate-50 dark:hover:bg-slate-700/40 transition cursor-pointer"
        aria-label="Lihat riwayat pembayaran"
        @click="mode = 'riwayat'"
      >
        <i class="fas fa-history"></i>Riwayat
      </button>
      <button
        v-else
        class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition cursor-pointer"
        @click="mode = 'flow'"
      >
        <i class="fas fa-credit-card"></i>Bayar
      </button>
    </div>

    <!-- v.83.0526: Picker anak DIHAPUS di sini — sudah di topbar global (AppHeader).
         selectedAnakId still wired ke store via useWaliChildren composable. -->

    <!-- ============================================================
         TAB: MANUAL — Riwayat pembayaran offline (admin POS) + transfer ter-verifikasi
         ============================================================ -->
    <template v-if="!isSantriOnly || mode === 'riwayat'">
      <!-- Filter (admin) -->
      <div
        v-if="!isSantriOnly"
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama santri..."
          class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <select
          v-model.number="filterBulan"
          class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        >
          <option :value="0">Semua bulan</option>
          <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
        </select>
        <select
          v-model.number="filterTahun"
          class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        >
          <option v-for="y in [2024, 2025, 2026, 2027]" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <!-- v.1.4.9: transfer manual dihapus dari alur bayar; bukti yang SUDAH terkirim tetap
           terlihat statusnya di sini sampai admin memverifikasi / menolaknya. -->
      <div
        v-if="myPendingTransfers.length > 0"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-3">
          <i class="fas fa-hourglass-half text-amber-600 mr-1"></i>Menunggu Verifikasi
          <span class="text-[10px] text-[var(--text-tertiary)] normal-case ml-1"
            >({{ myPendingTransfers.length }} transfer)</span
          >
        </h3>
        <div class="space-y-2">
          <div
            v-for="p in myPendingTransfers"
            :key="p.id"
            class="bg-amber-50/40 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3"
          >
            <div class="flex items-start gap-3">
              <div
                class="w-9 h-9 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0"
              >
                <i :class="['fas', p.status === 'rejected' ? 'fa-times' : 'fa-hourglass-half']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  {{ fmtTgl(p.tanggal) }} · {{ p.kategori || 'Transfer' }} · {{ p.catatan || '-' }}
                </p>
                <p
                  v-if="p.status === 'rejected' && p.alasan_tolak"
                  class="text-[10px] text-rose-700 italic mt-1"
                >
                  <i class="fas fa-exclamation-circle mr-1"></i>Ditolak: {{ p.alasan_tolak }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-amber-700">{{ fmtRp(p.nominal) }}</p>
                <span
                  :class="[
                    'text-[9px] px-2 py-0.5 rounded font-black uppercase mt-1 inline-block',
                    p.status === 'rejected'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-amber-200 text-amber-800 border border-amber-300'
                  ]"
                >
                  {{ p.status === 'rejected' ? 'Ditolak' : 'Menunggu' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- List Riwayat -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl"></i>
      </div>
      <div
        v-else-if="filteredItems.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada pembayaran.</p>
        <p v-if="isSantriOnly" class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
          Pembayaran offline (cash) yang diinput admin akan otomatis muncul di sini.
        </p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="p in filteredItems"
          :key="p.id"
          class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                p.sumber === 'transfer_verified'
                  ? 'bg-cyan-100 text-cyan-600'
                  : 'bg-emerald-100 text-emerald-600'
              ]"
            >
              <i
                :class="['fas', p.sumber === 'transfer_verified' ? 'fa-university' : 'fa-check']"
              ></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold truncate">
                {{ p.santri_nama || getNamaSantri(p.santri_id) }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ fmtTgl(p.tanggal) }} · {{ p.catatan || p.kanal || '-' }}
                <!-- v.1.4.1: label cara bayar dulu diturunkan di sini sendiri — `sumber`
                     'transfer_verified' = Transfer, SELAIN ITU "[Tunai]". Kasir POS yang
                     memilih Transfer, dan pembayaran VA BMT, karena itu tercetak "Tunai"
                     di riwayat wali. Sekarang lewat utils/metodeBayar, sumber yang sama
                     dengan Buku Induk & laporan PDF. -->
                <span
                  :class="[
                    'ml-1 font-bold',
                    metodeTransaksi(p) === 'Transfer' ? 'text-cyan-700' : 'text-emerald-700'
                  ]"
                  >[{{ metodeTransaksi(p) }}]</span
                >
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-emerald-700">{{ fmtRp(p.nominal) }}</p>
            </div>
            <button
              aria-label="Lihat bukti pembayaran"
              title="Lihat bukti pembayaran"
              class="w-8 h-8 flex-shrink-0 rounded-full border border-[var(--border-default)] text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 flex items-center justify-center transition cursor-pointer"
              @click="openReceipt(p)"
            >
              <i class="fas fa-eye text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- ============================================================
         v.87.0526 STEP: PILIH METODE — daftar metode (bukan tab)
         ============================================================ -->
    <template v-if="isSantriOnly && mode === 'flow' && step === 'metode'">
      <!-- ringkasan tagihan kalau datang dari tombol Bayar -->
      <div
        v-if="bayarForm.tagihan_id || bayarForm.nominal"
        class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Tagihan dipilih
        </p>
        <div class="flex items-center justify-between mt-1">
          <span class="text-sm font-black truncate">{{ bayarForm.kategori || 'Pembayaran' }}</span>
          <span class="text-base font-black text-cyan-700">{{ fmtRp(bayarForm.nominal) }}</span>
        </div>
      </div>

      <!-- v.1.4.9: daftar metode dari utils/metodeBayarWali (transfer dihapus, BMT disembunyikan) -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <p class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] px-1">
          Pilih cara bayar
        </p>
        <button
          v-for="m in methodsSantri"
          :key="m.id"
          :disabled="!m.active"
          :class="[
            'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition',
            !m.active
              ? 'opacity-60 cursor-not-allowed border-[var(--border-subtle)]'
              : selectedMethod === m.id
                ? 'border-2 border-cyan-500 bg-cyan-50/40 dark:bg-cyan-900/20 cursor-pointer'
                : 'border-[var(--border-default)] hover:border-cyan-300 cursor-pointer'
          ]"
          @click="pilihMetode(m.id)"
        >
          <i
            :class="[
              'fas',
              m.icon,
              'text-lg w-6 text-center',
              m.active ? 'text-cyan-600' : 'text-[var(--text-tertiary)]'
            ]"
          ></i>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-black">{{ m.label }}</p>
            <p class="text-[10px] text-[var(--text-secondary)]">{{ m.desc }}</p>
          </div>
          <span
            v-if="!m.active"
            class="text-[9px] px-2 py-0.5 rounded font-black uppercase bg-amber-100 text-amber-700 border border-amber-200"
            >Coming soon</span
          >
          <i
            v-else-if="selectedMethod === m.id"
            class="fas fa-circle-check text-cyan-600 text-lg"
          ></i>
          <i v-else class="fas fa-chevron-right text-[var(--text-tertiary)]"></i>
        </button>
      </div>

      <button
        v-if="adaMetodeAktif"
        class="w-full px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl text-sm shadow-md transition cursor-pointer"
        @click="lanjutBayar"
      >
        <i class="fas fa-arrow-right mr-1"></i>Lanjut
      </button>
      <div
        v-else
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-[12px] text-amber-800 dark:text-amber-200 leading-relaxed"
      >
        <i class="fas fa-info-circle mr-1"></i>
        <strong>Pembayaran online segera hadir.</strong> Sementara ini pembayaran dilayani langsung
        di kantor / kasir pondok.
      </div>
    </template>

    <!-- ============================================================
         STEP: BAYAR — keranjang bersama untuk VA BMT (v.97.0626) dan pembayaran online
         Midtrans (v.1.4.9 gel. 2: VA bank / QRIS). Keranjang = tagihan (boleh sebagian →
         cicilan) + top-up uang saku, dibayar sekali.
         ============================================================ -->
    <template v-if="isSantriOnly && mode === 'flow' && step === 'bayar' && metodeKeranjang">
      <!-- Pilih anak dulu (multi-anak, belum terpilih) -->
      <div
        v-if="!vaSantri && waliChildren.length > 1"
        class="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-900 rounded-2xl p-5 text-white shadow-lg"
      >
        <p class="text-sm font-bold mb-2">
          <i class="fas fa-hand-pointer mr-1"></i>Pilih anak dulu
        </p>
        <select
          v-model="bayarForm.santri_id"
          class="w-full px-3 py-2 text-sm rounded-xl border-0 text-slate-800 outline-none cursor-pointer"
        >
          <option value="">— Pilih Anak —</option>
          <option v-for="c in waliChildren" :key="c.id" :value="String(c.id)">{{ c.nama }}</option>
        </select>
      </div>

      <template v-else-if="isMidtrans || vaNumber">
        <!-- A. Keranjang: susun pembayaran (tagihan + top-up uang saku) dalam 1 kali bayar -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
        >
          <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-1">
            <i class="fas fa-cart-plus text-indigo-600 mr-1"></i>Susun Pembayaran
            <span v-if="vaSantri" class="normal-case text-[var(--text-secondary)] font-bold"
              >— {{ vaSantri.nama }}</span
            >
          </h3>
          <p class="text-[11px] text-[var(--text-secondary)] mb-3">
            Centang tagihan yang ingin dibayar dan/atau isi top-up uang saku. Semuanya dibayar
            <b>sekali</b>. Mau <b>mencicil</b>? Ubah nominal di kotak kanan tagihan — sisanya bisa
            dibayar lain kali.
          </p>

          <!-- Tagihan belum lunas -->
          <div v-if="vaTagihanList.length" class="space-y-1.5">
            <label
              v-for="t in vaTagihanList"
              :key="t.id"
              class="flex items-center gap-2.5 bg-[var(--bg-card-elevated)] rounded-xl px-3 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="isCarted(t)"
                class="w-4 h-4 accent-indigo-600 flex-shrink-0"
                @change="toggleCart(t)"
              />
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-[var(--text-primary)] truncate">
                  {{ t.kategori || 'Tagihan' }}
                </p>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  {{ t.periode || '-' }} · sisa {{ fmtRp(getSisaVa(t)) }}
                </p>
              </div>
              <input
                v-if="isCarted(t)"
                :value="cartSel[t.id]"
                type="number"
                min="0"
                :max="getSisaVa(t)"
                aria-label="Nominal yang dibayar untuk tagihan ini"
                class="w-28 px-2 py-1 text-xs text-right font-bold rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] flex-shrink-0"
                @input="setCartNominal(t, $event.target.value)"
                @click.prevent.stop
              />
            </label>
          </div>
          <p v-else class="text-[11px] text-[var(--text-tertiary)] italic">
            Tidak ada tagihan tertunggak. Bisa langsung top-up uang saku di bawah.
          </p>

          <!-- Top-up uang saku -->
          <div class="mt-3 pt-3 border-t border-[var(--border-subtle)]">
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">
              <i class="fas fa-wallet text-emerald-600 mr-1"></i>Top-up Uang Saku (opsional)
            </label>
            <input
              v-model.number="cartUangSaku"
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] text-[var(--text-primary)] text-right font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <!-- Total (+ tombol VA BMT) -->
          <div class="mt-4 flex items-center justify-between gap-3">
            <div>
              <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase">
                {{ isMidtrans ? 'Subtotal' : 'Total' }}
              </p>
              <p class="text-xl font-black text-[var(--text-primary)]">{{ fmtRp(cartTotal) }}</p>
            </div>
            <button
              v-if="!isMidtrans"
              :disabled="cartTotal <= 0 || creatingIntent"
              class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              @click="buatTagihanVa"
            >
              <i class="fas fa-plus-circle mr-1"></i
              >{{ creatingIntent ? 'Membuat...' : 'Buat Tagihan VA' }}
            </button>
          </div>
        </div>

        <!-- B1. Pembayaran online (Midtrans): pilih bank, rincian biaya layanan, bayar -->
        <div
          v-if="isMidtrans"
          class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
        >
          <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-3">
            <i
              :class="[
                'fas mr-1 text-cyan-600',
                selectedMethod === 'qris' ? 'fa-qrcode' : 'fa-building-columns'
              ]"
            ></i
            >{{ selectedMethod === 'qris' ? 'Bayar dengan QRIS' : 'Pilih bank Virtual Account' }}
          </h3>
          <div
            v-if="selectedMethod === 'midtrans_va'"
            class="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4"
            role="radiogroup"
            aria-label="Bank Virtual Account"
          >
            <button
              v-for="k in bankMidtrans"
              :key="k.id"
              type="button"
              role="radio"
              :aria-checked="bankPilih === k.id"
              :class="[
                'py-2.5 rounded-xl border text-sm font-black transition cursor-pointer',
                bankPilih === k.id
                  ? 'border-2 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-200'
                  : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-cyan-300'
              ]"
              @click="pilihBank(k.id)"
            >
              {{ k.label }}
            </button>
          </div>
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)]">Subtotal</span>
              <span class="font-bold">{{ fmtRp(rincianMidtrans.net) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[var(--text-secondary)]"
                >Biaya layanan {{ labelKanalMidtrans }}</span
              >
              <span class="font-bold">{{ fmtRp(rincianMidtrans.biaya) }}</span>
            </div>
            <div
              class="flex justify-between items-center border-t border-[var(--border-subtle)] pt-2"
            >
              <span class="text-xs font-black uppercase text-[var(--text-secondary)]"
                >Total dibayar</span
              >
              <span class="text-lg font-black text-cyan-700 dark:text-cyan-300">{{
                fmtRp(rincianMidtrans.total)
              }}</span>
            </div>
          </div>
          <p
            v-if="cartTotal > 0 && rincianMidtrans.galat"
            class="text-[11px] text-rose-600 font-bold mt-2"
          >
            <i class="fas fa-exclamation-circle mr-1"></i>{{ rincianMidtrans.galat }}
          </p>
          <button
            :disabled="!bolehBayarMidtrans || membuatKode"
            class="w-full mt-4 px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl text-sm shadow-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            @click="bayarMidtrans"
          >
            <i :class="['fas mr-1', membuatKode ? 'fa-spinner fa-spin' : 'fa-lock']"></i
            >{{ membuatKode ? 'Menyiapkan…' : 'Bayar ' + fmtRp(rincianMidtrans.total) }}
          </button>
          <p class="text-[10px] text-[var(--text-tertiary)] mt-2 leading-relaxed">
            Halaman pembayaran Midtrans akan terbuka dan menampilkan
            {{ selectedMethod === 'qris' ? 'kode QR' : 'nomor Virtual Account' }} beserta nominalnya
            — tinggal bayar dari m-banking<template v-if="selectedMethod === 'qris'">
              / e-wallet</template
            >. Biaya layanan ditanggung pembayar. Status di aplikasi berubah sendiri begitu dana
            masuk.
          </p>
        </div>

        <!-- B2. Kartu Nomor VA BMT -->
        <div
          v-else
          class="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-900 rounded-2xl p-5 text-white shadow-lg"
        >
          <p class="text-[10px] font-bold uppercase opacity-80 tracking-wider mb-3">
            <i class="fas fa-credit-card mr-1"></i>Virtual Account {{ bmtNama || 'BMT PETA' }}
          </p>
          <p class="text-2xl md:text-3xl font-black mt-1 tracking-wider drop-shadow break-all">
            {{ formatVa(vaNumber) }}
            <button
              class="ml-2 px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur transition cursor-pointer align-middle"
              :title="'Salin nomor VA'"
              @click="copyToClipboard(vaNumber)"
            >
              <i class="fas fa-copy"></i>
            </button>
          </p>
          <p class="text-[11px] opacity-90 mt-3 leading-relaxed">
            Setelah membuat Tagihan VA, transfer <b>sejumlah total</b> ke nomor VA di atas lewat
            m-banking / ATM / teller / kantor {{ bmtNama || 'BMT PETA' }}. Saat dana masuk, tagihan
            &amp; uang saku terisi otomatis sesuai rincian.
          </p>
        </div>

        <!-- Catatan integrasi BMT (belum live) -->
        <div
          v-if="!isMidtrans"
          class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-[12px] text-amber-800 dark:text-amber-200 leading-relaxed"
        >
          <i class="fas fa-info-circle mr-1"></i>
          <strong>Konfirmasi otomatis ({{ bmtNama || 'BMT PETA' }})</strong> — integrasi konfirmasi
          BMT sedang disiapkan.
        </div>
      </template>

      <!-- VA BMT belum tersedia (santri tunggal tanpa VA / prefix belum di-set) -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl p-6 border border-dashed border-[var(--border-subtle)] text-center"
      >
        <i class="fas fa-exclamation-circle text-amber-400 text-3xl mb-2"></i>
        <p class="text-sm font-bold text-[var(--text-primary)]">Nomor VA belum tersedia</p>
        <p class="text-[11px] text-[var(--text-secondary)] italic mt-1">
          Hubungi admin pondok untuk info Virtual Account santri.
        </p>
      </div>
    </template>

    <!-- Daftar kode bayar (VA BMT & online) — tampil di langkah mana pun selama alur bayar,
         supaya wali yang kembali dari m-banking bisa melanjutkan / melihat statusnya. -->
    <div
      v-if="isSantriOnly && mode === 'flow' && myVaIntents.length"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-3">
        <i class="fas fa-receipt text-indigo-600 mr-1"></i>Kode Bayar
      </h3>
      <div class="space-y-2">
        <div
          v-for="i in myVaIntents"
          :key="i.id"
          class="bg-[var(--bg-card-elevated)] rounded-xl px-3 py-2.5 flex items-start justify-between gap-2"
        >
          <div class="min-w-0 flex-1">
            <p class="text-sm font-black text-[var(--text-primary)]">
              {{ fmtRp(i.sumber === 'midtrans' ? i.gross || i.total : i.total) }}
              <span class="text-[10px] font-bold text-[var(--text-secondary)]">
                · {{ i.kanal_label || 'VA BMT' }}</span
              >
            </p>
            <p class="text-[10px] text-[var(--text-secondary)] truncate">
              {{ i.santri_nama ? i.santri_nama + ' — ' : '' }}{{ intentRincian(i) }}
            </p>
            <p
              v-if="i.sumber === 'midtrans' && i.status === 'pending' && i.va"
              class="text-[11px] font-mono font-bold text-[var(--text-primary)] mt-0.5"
            >
              <template v-if="i.kode_perusahaan"
                >Kode perusahaan {{ i.kode_perusahaan }} · </template
              >No. bayar {{ i.va }}
              <button
                class="ml-1 text-cyan-600 hover:underline cursor-pointer"
                title="Salin nomor"
                @click="copyToClipboard(i.va)"
              >
                <i class="fas fa-copy"></i>
              </button>
            </p>
          </div>
          <div class="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              :class="[
                'text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full',
                i.status === 'terbayar'
                  ? 'bg-emerald-100 text-emerald-700'
                  : i.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-200 text-slate-600'
              ]"
              >{{ vaIntentStatusLabel(i.status) }}</span
            >
            <button
              v-if="i.sumber === 'midtrans' && i.status === 'pending' && i.redirect_url"
              class="text-[10px] font-black text-cyan-700 hover:underline cursor-pointer"
              @click="bukaHalamanBayar(i.redirect_url)"
            >
              Lanjutkan bayar
            </button>
            <button
              v-if="i.status === 'pending'"
              :disabled="batalId === i.id"
              class="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer disabled:opacity-50"
              @click="batalIntent(i)"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>

    <ReceiptModal
      :open="receiptOpen"
      title="Bukti Pembayaran"
      :body-html="receiptHtmlStr"
      :downloading="receiptDownloading"
      @close="receiptOpen = false"
      @download="downloadReceipt"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { subscribeColl, setOne, updateOne } from '@/services/db'
// v.1.4.1: cara bayar disimpulkan satu tempat (Buku Induk, POS, pos dana, riwayat wali).
import { metodeTransaksi } from '@/utils/metodeBayar'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useWaliChildren } from '@/composables/useWaliChildren'
import { useGedungScope } from '@/composables/useGedungScope'
import { fmtRp, fmtTgl } from '@/utils/format'
import { sisaTagihan } from '@/utils/tagihan'
import ReceiptModal from '@/components/ReceiptModal.vue'
import { buildReceiptStrukHtml } from '@/utils/receiptHtml'
import { cetakStrukPdf } from '@/utils/strukBuilder'
// v.1.2.6: kelompokkan struk per TRANSAKSI (nomor struk lama bisa kembar antar santri)
import { kunciTransaksi } from '@/utils/trxStruk'
import { computeVaSantri, formatVa } from '@/utils/bmtVa'
import { metodeBayarWali } from '@/utils/metodeBayarWali'
// v.1.4.9 gel. 2: pembayaran online Midtrans (VA bank / QRIS), biaya layanan ditanggung wali.
import { kanalAktif, cariKanal, rincianBayar } from '@/utils/biayaMidtrans'
import { buatKodeBayar, batalKodeBayar, bukaHalamanBayar } from '@/services/midtrans'
import { SUMBER_BAYAR_SANTRI } from '@/utils/cocokBayarTagihan'

// v.82.0526: deep-link dari TagihanView — tagihan terpilih terisi otomatis
const route = useRoute()

const NAMA_BULAN = [
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
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// v.1.3.6: scope Gedung — admin keuangan ber-gedung hanya melihat santri, tagihan, dan
//   riwayat pembayaran gedungnya. Sesi tak ter-scope (super_admin, santri, wali) tak
//   terpengaruh: allowSantri/allowRow mengembalikan true.
const { allowSantri, allowRow } = useGedungScope()
const _pembayaranAll = ref([])
const _santriAll = ref([])
const _tagihanAll = ref([])
const _pendingAll = ref([])
const pembayaranRaw = computed(() => _pembayaranAll.value.filter(allowRow))
const santriList = computed(() => _santriAll.value.filter((s) => allowSantri(s.id)))
const tagihanRaw = computed(() => _tagihanAll.value.filter((t) => allowSantri(t.santri_id)))
const pendingRaw = computed(() => _pendingAll.value.filter((p) => allowSantri(p.santri_id)))
const loading = ref(true)
const search = ref('')
const filterBulan = ref(0)
const filterTahun = ref(new Date().getFullYear())
// v.87.0526: alur berlangkah (ganti 3-tab). step: 'metode' -> 'bayar'. mode: 'flow' | 'riwayat'.
const step = ref('metode')
const mode = ref('flow')
const selectedMethod = ref('')
const selectedAnakId = ref('')
let unsubBayar = null
let unsubSantri = null
let unsubTagihan = null
let unsubPending = null

const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')

// v.81.0526: multi-anak detection via WA wali
const { children: waliChildren } = useWaliChildren(santriList)

// v.87.0526: tabsSantri (3-tab) DIHAPUS — diganti alur berlangkah (pilih metode -> bayar) + riwayat via ikon.
// v.1.4.9 (Kyai): Transfer Bank (upload bukti) dihapus; VA BMT tampil hanya bila `bmt_aktif`;
//   Midtrans (VA tetap + QRIS) tampil "Segera hadir" sampai tersambung. Aturannya satu
//   tempat di utils/metodeBayarWali.
const bmtNama = computed(() => (settings.settings || {}).bmt_nama || '')
const methodsSantri = computed(() => metodeBayarWali(settings.settings))
const adaMetodeAktif = computed(() => methodsSantri.value.some((m) => m.active))
const metodeAktifPertama = () => methodsSantri.value.find((m) => m.active)?.id || ''
// Metode yang memakai keranjang di langkah Bayar: VA BMT & dua kanal Midtrans.
const isMidtrans = computed(() => ['midtrans_va', 'qris'].includes(selectedMethod.value))
const metodeKeranjang = computed(() => selectedMethod.value === 'va' || isMidtrans.value)

// ─── Midtrans: bank pilihan wali (diingat per perangkat), rincian biaya layanan ───
const bankMidtrans = computed(() => kanalAktif(settings.settings).filter((k) => k.jenis === 'va'))
const KUNCI_BANK = 'ammu_bank_bayar'
const bankPilih = ref('')
try {
  bankPilih.value = localStorage.getItem(KUNCI_BANK) || ''
} catch {
  /* penyimpanan tak tersedia — pakai bank pertama */
}
function pilihBank(id) {
  bankPilih.value = id
  try {
    localStorage.setItem(KUNCI_BANK, id)
  } catch {
    /* abaikan */
  }
}
const kanalMidtrans = computed(() => {
  if (selectedMethod.value === 'qris') return 'qris'
  const ada = bankMidtrans.value.find((k) => k.id === bankPilih.value)
  return (ada || bankMidtrans.value[0])?.id || ''
})
const labelKanalMidtrans = computed(() => {
  const k = cariKanal(kanalMidtrans.value)
  return !k ? '' : k.jenis === 'qris' ? 'QRIS' : 'VA ' + k.label
})
const rincianMidtrans = computed(() =>
  rincianBayar(cartTotal.value, kanalMidtrans.value, settings.settings)
)
const bolehBayarMidtrans = computed(
  () => !!vaSantri.value && cartTotal.value > 0 && !rincianMidtrans.value.galat
)
const membuatKode = ref(false)
async function bayarMidtrans() {
  const s = vaSantri.value
  if (!s) {
    toast.info('Pilih anak dulu.')
    return
  }
  if (rincianMidtrans.value.galat) {
    toast.warning(rincianMidtrans.value.galat)
    return
  }
  membuatKode.value = true
  try {
    const r = await buatKodeBayar({
      santriId: s.id,
      kanal: kanalMidtrans.value,
      items: cartItems.value
    })
    cartSel.value = {}
    cartUangSaku.value = 0
    toast.success(`Kode bayar ${fmtRp(r.total)} dibuat — halaman pembayaran dibuka.`)
    if (!bukaHalamanBayar(r.redirect_url)) toast.info('Buka lewat "Lanjutkan bayar" di daftar.')
  } catch (e) {
    toast.error('Gagal membuat kode bayar: ' + (e?.message || e))
  } finally {
    membuatKode.value = false
  }
}

// v.97.0626: VA BMT — santri terpilih (dari bayarForm / anak tunggal) + nomor VA tetap
const vaSantri = computed(() => {
  const list = waliChildren.value || []
  if (!list.length) return null
  const sid = bayarForm.value?.santri_id
  if (sid) {
    const found = list.find((c) => String(c.id) === String(sid))
    if (found) return found
  }
  return list.length === 1 ? list[0] : null
})
const vaNumber = computed(() => computeVaSantri(vaSantri.value, settings.settings))

// ─── Keranjang VA (niat-bayar campur tagihan + top-up uang saku, 1 transfer) ───
const vaIntentRaw = ref([])
const cartSel = ref({}) // { [tagihan_id]: nominal yang dibayar }
const cartUangSaku = ref(0)
const creatingIntent = ref(false)
let unsubIntent = null

// sisa tagihan = nominal - sudah terbayar (satu sumber logika: utils/tagihan)
function getSisaVa(t) {
  return sisaTagihan(t)
}
// tagihan belum-lunas santri terpilih (tertua dulu)
const vaTagihanList = computed(() => {
  const s = vaSantri.value
  if (!s) return []
  return tagihanRaw.value
    .filter((t) => String(t.santri_id) === String(s.id))
    .filter((t) => String(t.status || 'belum') !== 'lunas' && getSisaVa(t) > 0)
    .sort((a, b) =>
      String(a.jatuh_tempo || a.tanggal || '').localeCompare(
        String(b.jatuh_tempo || b.tanggal || '')
      )
    )
})
function isCarted(t) {
  return cartSel.value[t.id] !== undefined
}
function toggleCart(t) {
  const c = { ...cartSel.value }
  if (c[t.id] !== undefined) delete c[t.id]
  else c[t.id] = getSisaVa(t)
  cartSel.value = c
}
function setCartNominal(t, val) {
  const n = Math.max(0, Math.min(Number(val) || 0, getSisaVa(t)))
  cartSel.value = { ...cartSel.value, [t.id]: n }
}
const cartItems = computed(() => {
  const items = []
  for (const t of vaTagihanList.value) {
    const n = cartSel.value[t.id]
    if (n !== undefined && Number(n) > 0) {
      items.push({
        tipe: 'tagihan',
        tagihan_id: String(t.id),
        kategori: t.kategori || 'Tagihan',
        periode: t.periode || '',
        nominal: Number(n)
      })
    }
  }
  const us = Number(cartUangSaku.value) || 0
  if (us > 0) items.push({ tipe: 'uang_saku', nominal: us })
  return items
})
const cartTotal = computed(() => cartItems.value.reduce((s, i) => s + (Number(i.nominal) || 0), 0))

// niat-bayar milik anak-anak wali (pending + terbayar terbaru; sembunyikan yg dibatalkan)
const myVaIntents = computed(() =>
  vaIntentRaw.value
    .filter(
      (i) =>
        allOwnedIds.value.has(String(i.santri_id)) && !['dibatalkan', 'gagal'].includes(i.status)
    )
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
    .slice(0, 10)
)
function vaIntentStatusLabel(s) {
  if (s === 'terbayar') return 'Terbayar'
  if (s === 'dibatalkan') return 'Dibatalkan'
  if (s === 'kadaluarsa') return 'Kedaluwarsa'
  return 'Menunggu Bayar'
}
function intentRincian(i) {
  const items = Array.isArray(i.items) ? i.items : []
  return items
    .map((it) =>
      it.tipe === 'uang_saku'
        ? `Uang Saku ${fmtRp(it.nominal)}`
        : `${it.kategori || 'Tagihan'} ${fmtRp(it.nominal)}`
    )
    .join(' · ')
}
async function buatTagihanVa() {
  const s = vaSantri.value
  if (!s) {
    toast.info('Pilih anak dulu.')
    return
  }
  const items = cartItems.value
  const total = cartTotal.value
  if (total <= 0) {
    toast.info('Centang tagihan atau isi top-up uang saku.')
    return
  }
  creatingIntent.value = true
  try {
    const id = `vaintent_${Date.now()}_${s.id}`
    await setOne('keuangan_va_intent', id, {
      id,
      santri_id: String(s.id),
      va: vaNumber.value,
      total,
      status: 'pending',
      santri_nama: s.nama || '',
      items,
      created_at: new Date().toISOString()
    })
    toast.success('Tagihan VA dibuat — transfer ' + fmtRp(total) + ' ke nomor VA.')
    cartSel.value = {}
    cartUangSaku.value = 0
  } catch (e) {
    toast.error('Gagal buat tagihan VA: ' + (e?.message || e))
  } finally {
    creatingIntent.value = false
  }
}
const batalId = ref('')
async function batalIntent(i) {
  batalId.value = i.id
  try {
    // Kode Midtrans dibatalkan juga di Midtrans (lewat server) supaya tak bisa dibayar lagi.
    if (i.sumber === 'midtrans') await batalKodeBayar(i.id)
    else await updateOne('keuangan_va_intent', i.id, { status: 'dibatalkan' })
    toast.success('Kode bayar dibatalkan.')
  } catch (e) {
    toast.error('Gagal batalkan: ' + (e?.message || e))
  } finally {
    batalId.value = ''
  }
}

function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

// v.95.0626: Receipt viewer (view-only) — bukti pembayaran per transaksi (group by trx_id)
const receiptOpen = ref(false)
const receiptHtmlStr = ref('')
const receiptTrx = ref(null)
const receiptDownloading = ref(false)

function extractPeriode(ket) {
  const parts = String(ket || '').split(' — ')
  if (parts.length >= 3) {
    const last = parts[parts.length - 1].trim()
    if (/^[A-Za-z]+\s+\d{4}$/.test(last) || (last && last.length <= 22)) return last
  }
  return ''
}
function buildTrxFromGroup(p) {
  // v.1.2.6: kunci ber-santri (trx_uid -> trx_id+santri_id) — dulu murni trx_id sehingga
  //   nomor struk yang kembar menarik baris milik santri lain ke dalam satu kwitansi.
  const key = p.trx_id ? kunciTransaksi(p) : String(p.id)
  const group = pembayaranRaw.value.filter((x) =>
    x.trx_id ? kunciTransaksi(x) === key : String(x.id) === key
  )
  const rows = group.length ? group : [p]
  const s = santriList.value.find((x) => String(x.id) === String(p.santri_id)) || {}
  const total = rows.reduce((sum, r) => sum + Number(r.nominal || 0), 0)
  return {
    no_struk: p.trx_id || p.id || '-',
    tanggal: p.tanggal,
    santri_nama: p.santri_nama || getNamaSantri(p.santri_id),
    santri_nis: s.nis || s.nik || '-',
    lembaga: s.lembaga || '',
    kelas: s.kelas || '',
    lembaga_sekolah: s.lembaga_sekolah || '',
    kelas_sekolah: s.kelas_sekolah || '',
    operator: p.operator || 'Administrator',
    penyetor: p.wali || '',
    // v.1.4.1: dulu disimpulkan di sini sendiri — `sumber` 'transfer_verified' = Transfer,
    //   SELAIN ITU 'TUNAI'. v.1.4.1 membetulkan label di daftar riwayat tapi MELEWATI
    //   pembangun bukti ini, jadi pembayaran POS-transfer dan VA BMT tetap tercetak
    //   "TUNAI" di kwitansi yang diunduh wali. Sekarang satu sumber dengan layarnya.
    metode: metodeTransaksi(p).toUpperCase(),
    status_siswa: s.aktif === false ? 'Tidak Aktif' : 'Aktif',
    items: rows.map((r) => ({
      jenis: r.kategori || 'Tagihan',
      nominal: Number(r.nominal || 0),
      keterangan: extractPeriode(r.keterangan)
    })),
    total,
    bayar: total,
    kembali: 0
  }
}
function openReceipt(p) {
  const trx = buildTrxFromGroup(p)
  receiptTrx.value = trx
  receiptHtmlStr.value = buildReceiptStrukHtml(trx, settings.settings || {})
  receiptOpen.value = true
}
async function downloadReceipt() {
  if (!receiptTrx.value) return
  receiptDownloading.value = true
  try {
    await cetakStrukPdf(receiptTrx.value, settings.settings || {}, { preview: false })
  } catch (e) {
    toast.error('Gagal membuat PDF: ' + (e.message || e))
  } finally {
    receiptDownloading.value = false
  }
}

// Pembayaran ter-confirm (tunai POS + transfer yang sudah di-verify admin)
const allOwnedIds = computed(() => new Set(waliChildren.value.map((c) => String(c.id))))

const filteredItems = computed(() => {
  let list = [...pembayaranRaw.value]
  if (isSantriOnly.value) {
    // filter ke anak-anak yg dimiliki wali (multi-anak)
    list = list.filter((p) => allOwnedIds.value.has(String(p.santri_id)))
    // kalau pilih anak spesifik, narrow ke 1 anak
    if (selectedAnakId.value) {
      list = list.filter((p) => String(p.santri_id) === selectedAnakId.value)
    }
  }
  if (filterBulan.value && filterBulan.value > 0) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return (
        !isNaN(d.getTime()) &&
        d.getFullYear() === filterTahun.value &&
        d.getMonth() + 1 === filterBulan.value
      )
    })
  } else if (filterTahun.value && !isSantriOnly.value) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return !isNaN(d.getTime()) && d.getFullYear() === filterTahun.value
    })
  }
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((p) =>
      String(p.santri_nama || getNamaSantri(p.santri_id))
        .toLowerCase()
        .includes(kw)
    )
  return list.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

const totalPembayaran = computed(() =>
  filteredItems.value.reduce((s, p) => s + (Number(p.nominal) || 0), 0)
)

// Pending transfer pribadi (santri/wali only)
const myPendingTransfers = computed(() => {
  if (!isSantriOnly.value) return []
  // v.95.0626 FIX: transfer yang sudah diverifikasi admin JANGAN tampil di "Menunggu Verifikasi"
  // lagi (sudah jadi pembayaran transfer_verified di riwayat). Tampilkan hanya pending + rejected.
  return pendingRaw.value
    .filter((p) => allOwnedIds.value.has(String(p.santri_id)) && p.status !== 'verified')
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
})

// ─── Pilihan bayar: santri + tagihan terpilih (prefill dari tombol Bayar di Tagihan) ───
const bayarForm = ref({ santri_id: '', nominal: 0, kategori: '', tagihan_id: '' })

function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text)
    toast.success('Nomor tersalin')
  } catch {
    toast.error('Browser tidak support clipboard')
  }
}

// v.87.0526: navigasi alur berlangkah (pilih metode -> bayar)
function pilihMetode(id) {
  const m = methodsSantri.value.find((x) => x.id === id)
  if (!m || !m.active) {
    toast.info('Metode ini belum aktif')
    return
  }
  selectedMethod.value = id
}
function lanjutBayar() {
  const m = methodsSantri.value.find((x) => x.id === selectedMethod.value)
  if (!m || !m.active) {
    toast.info('Pilih metode yang aktif')
    return
  }
  step.value = 'bayar'
}

// ─── Subscribe Firestore ───────────────────────────────────────
onMounted(() => {
  // Pembayaran santri: tunai POS, transfer terverifikasi, VA BMT, online (Midtrans).
  //   v.1.4.9 gel. 2: satu daftar dengan pencocok tagihan (SUMBER_BAYAR_SANTRI) — dulu
  //   pembayaran VA BMT tak pernah muncul di riwayat wali.
  unsubBayar = subscribeColl('keuangan_buku_induk', (docs) => {
    _pembayaranAll.value = (docs || []).filter((r) => SUMBER_BAYAR_SANTRI.includes(r.sumber))
    loading.value = false
  })
  unsubSantri = subscribeColl('santri', (docs) => {
    _santriAll.value = docs
  })
  unsubTagihan = subscribeColl('keuangan_tagihan', (docs) => {
    _tagihanAll.value = docs || []
  })
  // Pending transfer (untuk santri lihat sendiri, admin lihat semua di view lain)
  unsubPending = subscribeColl('pembayaran_transfer_pending', (docs) => {
    _pendingAll.value = docs || []
  })
  // Niat-bayar VA (keranjang) — status flip 'terbayar' tampil realtime
  unsubIntent = subscribeColl('keuangan_va_intent', (docs) => {
    vaIntentRaw.value = docs || []
  })
  // Initialize default selected anak kalau cuma 1
  setTimeout(() => {
    if (waliChildren.value.length === 1 && !bayarForm.value.santri_id) {
      bayarForm.value.santri_id = String(waliChildren.value[0].id)
    }
    // v.87.0526: alur berlangkah — terjemahkan query jadi mode/step (ganti activeTab)
    const q = route.query
    if (q.view === 'riwayat') {
      mode.value = 'riwayat'
    } else {
      // default: alur pembayaran (pilih metode dulu). Prefill dari tagihan kalau ada.
      mode.value = 'flow'
      step.value = 'metode'
      selectedMethod.value = metodeAktifPertama()
      if (q.santri) bayarForm.value.santri_id = String(q.santri)
      if (q.nominal) bayarForm.value.nominal = Number(q.nominal) || 0
      if (q.kategori) bayarForm.value.kategori = String(q.kategori)
      if (q.tagihan_id) bayarForm.value.tagihan_id = String(q.tagihan_id)
      // toast info hanya kalau benar2 ada prefill dari tagihan (bukan dari "Setoran Lain")
      if (q.tagihan_id || q.nominal) toast.info('Tagihan terpilih — pilih metode pembayaran')
    }
  }, 500)
})
onUnmounted(() => {
  for (const u of [unsubBayar, unsubSantri, unsubTagihan, unsubPending, unsubIntent]) {
    if (u) {
      try {
        u()
      } catch (e) {}
    }
  }
})
</script>
