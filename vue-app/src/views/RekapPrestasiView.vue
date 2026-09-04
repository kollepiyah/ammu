<template>
  <div class="p-3 md:p-5 max-w-7xl mx-auto space-y-4">
    <!-- v.1.4.1: Pratinjau pemindahan isian ke bucket bulan yang benar (Kyai, 4 Sep 2026).
         Tak ada yang ditulis sampai tombol di bawah ditekan. -->
    <div
      v-if="pindahRencana"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col"
      >
        <div
          class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"
        >
          <h3 class="text-base font-black text-slate-800 dark:text-slate-100">
            <i class="fas fa-right-left text-amber-600 mr-2"></i>Pindahkan ke Rekap {{ bulan }}
            {{ tahun }}
          </h3>
          <button class="text-slate-400 hover:text-rose-600 text-xl" @click="pindahRencana = null">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 text-xs space-y-3">
          <p class="text-[11px] text-slate-600 dark:text-slate-300">
            Isian di <b>Rekap {{ labelBulanPeriode(pindahRencana.periodeDari) }}</b> yang ditulis
            pada/sesudah <b>{{ pindahRencana.sejak }}</b> — yaitu sesudah jendela Rekap
            {{ bulan }} dibuka. Menurut aturan Kyai, angka itu capaian
            <b>{{ bulanDataLabel }}</b> dan tempatnya di Rekap {{ bulan }}.
          </p>
          <p
            v-if="penyaringAktif.length"
            class="text-[11px] rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-2 text-amber-900 dark:text-amber-200"
          >
            <i class="fas fa-filter mr-1"></i><b>Penyaring masih aktif:</b>
            {{ penyaringAktif.join(' · ') }}. Rencana di bawah HANYA mencakup daftar yang sedang
            tampil — kosongkan penyaringnya dulu bila ingin memindahkan semua lembaga sekaligus.
          </p>
          <div class="grid grid-cols-2 gap-2">
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded p-2 border border-emerald-200 dark:border-emerald-800"
            >
              <p class="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">
                Dipindah
              </p>
              <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {{ pindahRencana.pindah.length }}
              </p>
            </div>
            <div
              class="bg-amber-50 dark:bg-amber-900/20 rounded p-2 border border-amber-200 dark:border-amber-800"
            >
              <p class="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase">
                Dilewati (tujuan sudah terisi)
              </p>
              <p class="text-2xl font-black text-amber-700 dark:text-amber-300">
                {{ pindahRencana.bentrok.length }}
              </p>
            </div>
          </div>
          <p
            v-if="pindahRencana.bentrok.length"
            class="text-[11px] text-amber-700 dark:text-amber-300"
          >
            <i class="fas fa-circle-info mr-1"></i>Santri yang tujuannya SUDAH berangka tidak
            ditimpa — angka Rekap {{ bulan }} yang menang. Barisnya tetap di
            {{ labelBulanPeriode(pindahRencana.periodeDari) }}, silakan periksa manual.
          </p>
          <table
            v-if="pindahRencana.pindah.length"
            class="w-full border border-slate-200 dark:border-slate-700"
          >
            <thead class="bg-slate-100 dark:bg-slate-700/50">
              <tr>
                <th class="px-2 py-1 text-left">#</th>
                <th class="px-2 py-1 text-left">Nama Santri</th>
                <th class="px-2 py-1 text-left">Kelas</th>
                <th class="px-2 py-1 text-left">Awal</th>
                <th class="px-2 py-1 text-left">Akhir</th>
                <th class="px-2 py-1 text-left">Ditulis</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(p, i) in pindahRencana.pindah.slice(0, 100)"
                :key="p.santriId"
                class="border-t border-slate-200 dark:border-slate-700"
              >
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1 font-bold text-slate-700 dark:text-slate-200">
                  {{ p.nama }}
                </td>
                <td class="px-2 py-1">{{ p.kelas || '-' }}</td>
                <td class="px-2 py-1">{{ p.awal || '-' }}</td>
                <td class="px-2 py-1">{{ p.akhir || '-' }}</td>
                <td class="px-2 py-1 text-slate-400">{{ String(p.updatedAt).slice(0, 10) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="pindahRencana.pindah.length > 100" class="text-[10px] italic text-slate-500">
            …dan {{ pindahRencana.pindah.length - 100 }} baris lagi (semua diproses saat konfirmasi)
          </p>
          <p v-if="!pindahRencana.pindah.length" class="text-[11px] italic text-slate-500">
            Tak ada yang perlu dipindah.
          </p>
        </div>
        <div
          class="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2 items-center"
        >
          <button
            class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
            @click="pindahRencana = null"
          >
            Batal
          </button>
          <button
            :disabled="pindahBusy || !pindahRencana.pindah.length"
            class="px-4 py-2 text-xs font-black rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
            @click="terapkanPindah"
          >
            <i :class="['fas', pindahBusy ? 'fa-spinner fa-spin' : 'fa-right-left', 'mr-1']"></i>
            Pindahkan {{ pindahRencana.pindah.length }} baris
          </button>
        </div>
      </div>
    </div>

    <!-- v.100 Batch12: Preview impor Rekap Prestasi (review dulu: Baru/Update/Lewati/Tak ditemukan) -->
    <div
      v-if="importRekapPreview"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[88vh] flex flex-col"
      >
        <div
          class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"
        >
          <h3 class="text-base font-black text-slate-800 dark:text-slate-100">
            <i class="fas fa-file-import text-cyan-600 mr-2"></i>Preview Impor Rekap Prestasi —
            {{ importRekapPreview.plan.length }} baris
          </h3>
          <button
            class="text-slate-400 hover:text-rose-600 text-xl"
            @click="importRekapPreview = null"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4 overflow-auto flex-1 text-xs">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div
              class="bg-emerald-50 dark:bg-emerald-900/20 rounded p-2 border border-emerald-200 dark:border-emerald-800"
            >
              <p class="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">
                Baru
              </p>
              <p class="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {{ importRekapPreview.cBaru }}
              </p>
            </div>
            <div
              class="bg-cyan-50 dark:bg-cyan-900/20 rounded p-2 border border-cyan-200 dark:border-cyan-800"
            >
              <p class="text-[10px] text-cyan-700 dark:text-cyan-300 font-bold uppercase">Update</p>
              <p class="text-2xl font-black text-cyan-700 dark:text-cyan-300">
                {{ importRekapPreview.cUpdate }}
              </p>
            </div>
            <div
              class="bg-slate-50 dark:bg-slate-700/40 rounded p-2 border border-slate-200 dark:border-slate-600"
            >
              <p class="text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">
                Lewati (kosong)
              </p>
              <p class="text-2xl font-black text-slate-600 dark:text-slate-300">
                {{ importRekapPreview.cSkip }}
              </p>
            </div>
            <div
              class="bg-rose-50 dark:bg-rose-900/20 rounded p-2 border border-rose-200 dark:border-rose-800"
            >
              <p class="text-[10px] text-rose-700 dark:text-rose-300 font-bold uppercase">
                Tak ditemukan
              </p>
              <p class="text-2xl font-black text-rose-700 dark:text-rose-300">
                {{ importRekapPreview.cNotFound }}
              </p>
            </div>
          </div>
          <p
            v-if="importRekapPreview.cFuzzy"
            class="text-[11px] text-amber-700 dark:text-amber-300 mb-2"
          >
            <i class="fas fa-circle-info mr-1"></i>{{ importRekapPreview.cFuzzy }} baris dicocokkan
            via <b>nama mirip / tak lengkap</b> (badge "Mirip"/"Lingkup", pakai lingkup guru+kelas)
            — periksa bila ragu.
          </p>
          <table class="w-full border border-slate-200 dark:border-slate-700">
            <thead class="bg-slate-100 dark:bg-slate-700/50">
              <tr>
                <th class="px-2 py-1 text-left">#</th>
                <th class="px-2 py-1 text-left">Aksi</th>
                <th class="px-2 py-1 text-left">Cocok</th>
                <th class="px-2 py-1 text-left">Nama</th>
                <th class="px-2 py-1 text-left">No. Induk</th>
                <th class="px-2 py-1 text-left">Lembaga</th>
                <th class="px-2 py-1 text-left">Nilai Baru</th>
                <th class="px-2 py-1 text-left">Nilai Lama</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(p, i) in importRekapPreview.preview"
                :key="i"
                class="border-t border-slate-200 dark:border-slate-700"
              >
                <td class="px-2 py-1">{{ i + 1 }}</td>
                <td class="px-2 py-1">
                  <span
                    class="font-bold px-1.5 py-0.5 rounded text-[10px]"
                    :class="{
                      'bg-emerald-100 text-emerald-700': p.action === 'baru',
                      'bg-cyan-100 text-cyan-700': p.action === 'update',
                      'bg-slate-200 text-slate-600': p.action === 'skip',
                      'bg-rose-100 text-rose-700': p.action === 'notfound'
                    }"
                    >{{
                      p.action === 'baru'
                        ? 'BARU'
                        : p.action === 'update'
                          ? 'UPDATE'
                          : p.action === 'skip'
                            ? 'LEWATI'
                            : 'TAK ADA'
                    }}</span
                  >
                </td>
                <td class="px-2 py-1">
                  <span
                    v-if="p.matchBy"
                    class="text-[10px] px-1.5 py-0.5 rounded"
                    :class="
                      p.matchBy === 'Mirip' || p.matchBy === 'Lingkup'
                        ? 'bg-amber-100 text-amber-700 font-bold'
                        : 'bg-slate-100 text-slate-500'
                    "
                    >{{ p.matchBy }}</span
                  >
                </td>
                <td class="px-2 py-1 font-bold text-slate-700 dark:text-slate-200">{{ p.nama }}</td>
                <td class="px-2 py-1">{{ p.nis }}</td>
                <td class="px-2 py-1">{{ p.lembaga }}</td>
                <td class="px-2 py-1 text-cyan-700 dark:text-cyan-300">{{ p.nilaiBaru }}</td>
                <td class="px-2 py-1 text-slate-400">{{ p.nilaiLama }}</td>
              </tr>
            </tbody>
          </table>
          <p
            v-if="importRekapPreview.plan.length > importRekapPreview.preview.length"
            class="text-[10px] italic text-slate-500 mt-2"
          >
            …dan {{ importRekapPreview.plan.length - importRekapPreview.preview.length }} baris lagi
            (semua diproses saat konfirmasi)
          </p>
        </div>
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
          <button
            class="px-4 py-2 text-xs font-bold rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 text-slate-700 dark:text-slate-100"
            @click="importRekapPreview = null"
          >
            Batal
          </button>
          <button
            :disabled="importingRekap || importRekapPreview.applyCount === 0"
            class="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50"
            @click="confirmImportRekap"
          >
            <i :class="['fas', importingRekap ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i
            >{{
              importingRekap
                ? `Memproses… ${importRekapProgress.i}/${importRekapProgress.total}`
                : `Konfirmasi (${importRekapPreview.applyCount})`
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===== LAYER 1: LANDING (pilih Qiraati / Diniyah) ===== -->
    <div
      v-if="viewStep === 'landing'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-emerald-100 shadow-sm"
    >
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-book-open text-emerald-600 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">Rekap Prestasi</h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">
            Pilih kategori rekap untuk mengelola data prestasi santri.
          </p>
        </div>
      </div>
      <!-- v.1.3.8 (Kyai, 2 Sep 2026): penambalan riwayat. InputBulananView tak pernah menulis
           snapshot bulanan sampai v.1.3.8, jadi bulan yang diisi lewat layar itu hidup HANYA
           di baris santri. Wajib ditambal SEBELUM angka di data santri boleh dikosongkan. -->
      <div v-if="canCrud" class="mb-4">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition cursor-pointer"
          :class="tambalBusy ? 'opacity-50 pointer-events-none' : ''"
          @click="bukaTambal"
        >
          <i :class="['fas', tambalBusy ? 'fa-spinner fa-spin' : 'fa-notes-medical']"></i>
          Periksa Riwayat Bulanan
        </button>
        <p class="text-[11px] text-slate-500 mt-1.5">
          Mencari bulan yang angkanya hanya ada di data santri dan belum punya riwayat sendiri.
          Memeriksa dulu &mdash; tak ada yang tersimpan sampai Kyai menekan Terapkan.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          class="group relative overflow-hidden bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-teal-700 dark:to-teal-900 hover:from-emerald-600 dark:from-emerald-800 hover:to-teal-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          @click="pilihKategori('qiraati')"
        >
          <i class="fas fa-mosque text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">
            Rekap Qiraati
          </h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">PTPT · PPPH</p>
        </button>
        <button
          class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:from-cyan-600 dark:from-cyan-800 hover:to-cyan-800 rounded-2xl p-5 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          @click="pilihKategori('diniyah')"
        >
          <i class="fas fa-book text-2xl drop-shadow mb-2"></i>
          <h3 class="text-base md:text-lg font-black leading-tight drop-shadow-sm !text-white">
            Rekap Diniyah
          </h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">Mata pelajaran agama</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 2-Q: SUB-LANDING QIRAATI ===== -->
    <div
      v-else-if="viewStep === 'sub-qiraati'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-emerald-100 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
          @click="backToLanding"
        >
          <i class="fas fa-arrow-left text-slate-600"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">
            <i class="fas fa-mosque text-emerald-600 mr-2"></i>Rekap Qiraati
          </h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">
            Pilih lembaga untuk mulai input nilai.
          </p>
        </div>
      </div>
      <!-- v.1.2.3: rekap prestasi bulanan HANYA PTPT & PPPH (TPQ Pagi/Sore/Pra PTPT tak perlu, Kyai). -->
      <div class="grid grid-cols-2 gap-2 md:gap-3">
        <button
          class="bg-gradient-to-br from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
          @click="pilihLembagaInput('PTPT')"
        >
          <i class="fas fa-quran text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            PTPT
          </h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Program tahfizh</p>
        </button>
        <button
          class="bg-gradient-to-br from-cyan-600 dark:from-cyan-800 to-cyan-800 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-3 text-left text-white shadow-sm transition-all cursor-pointer"
          @click="pilihLembagaInput('PPPH')"
        >
          <i class="fas fa-scroll text-base drop-shadow"></i>
          <h3 class="text-xs md:text-sm font-black leading-tight drop-shadow-sm !text-white mt-1">
            PPPH
          </h3>
          <p class="text-[10px] text-white/85 font-medium mt-0.5">Program hadits</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 2-D: SUB-LANDING DINIYAH (redirect ke RekapDiniyahView) ===== -->
    <div
      v-else-if="viewStep === 'sub-diniyah'"
      class="bg-white rounded-2xl p-5 md:p-6 border border-cyan-100 shadow-sm"
    >
      <div class="flex items-center gap-3 mb-4">
        <button
          class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          title="Kembali"
          @click="backToLanding"
        >
          <i class="fas fa-arrow-left text-slate-600"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 leading-tight">
            <i class="fas fa-book text-cyan-600 mr-2"></i>Rekap Diniyah
          </h2>
          <p class="text-xs md:text-sm text-slate-500 mt-0.5">
            Pilih jenjang sekolah untuk mulai input nilai diniyah.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        <button
          class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
          @click="$router.push('/rekap-diniyah?lembaga=SDI')"
        >
          <i class="fas fa-school text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SDI</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">
            Sekolah Dasar Islam (Kelas I–VI)
          </p>
        </button>
        <button
          class="bg-gradient-to-br from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
          @click="$router.push('/rekap-diniyah?lembaga=PKBM&jenjang=SMP')"
        >
          <i class="fas fa-school-flag text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMP</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">PKBM · Kelas VII–IX</p>
        </button>
        <button
          class="bg-gradient-to-br from-cyan-700 dark:from-cyan-900 to-cyan-900 hover:shadow-md hover:-translate-y-0.5 rounded-xl p-4 text-left text-white shadow-sm transition-all cursor-pointer"
          @click="$router.push('/rekap-diniyah?lembaga=PKBM&jenjang=SMA')"
        >
          <i class="fas fa-graduation-cap text-xl drop-shadow"></i>
          <h3 class="text-base font-black leading-tight drop-shadow-sm !text-white mt-1">SMA</h3>
          <p class="text-[11px] text-white/85 font-medium mt-0.5">PKBM · Kelas X–XII</p>
        </button>
      </div>
    </div>

    <!-- ===== LAYER 3: INPUT BULANAN (existing — wrapped) ===== -->
    <template v-else-if="viewStep === 'input'">
      <!-- HEADER WITH BACK (admin/super only) -->
      <button
        v-if="isFullFilter"
        class="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer text-slate-700 dark:text-slate-200"
        title="Pilih lembaga lain"
        @click="backToSub"
      >
        <i class="fas fa-arrow-left"></i> Pilih Lembaga Lain
      </button>

      <!-- HEADER -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
              <i class="fas fa-trophy text-cyan-500 mr-1"></i>Rekap Prestasi Qiraati
            </h1>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              Rekap bulanan prestasi santri Qiraati. Total: {{ filteredSantri.length }} santri ·
              Rekap: <b class="text-cyan-700">{{ bulan }} {{ tahun }}</b> · berisi capaian
              <b class="text-cyan-700">{{ bulanDataLabel }}</b>
            </p>
            <!-- v.1.3.7 (Kyai 31 Agu 2026): tiap bulan mulai kosong. Keterangan ini perlu
                 karena perubahannya justru terlihat sebagai "data hilang" bagi yang terbiasa
                 melihat angka bulan lalu sudah terisi di sana. -->
            <p
              v-if="mode === 'bulanan'"
              class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5"
            >
              <i class="fas fa-circle-info mr-1"></i><b>Rekap {{ bulan }}</b> diisi tgl 29
              {{ bulanDataLabel }} s/d 5 {{ bulan }}, isinya capaian <b>{{ bulanDataLabel }}</b
              >. Tiap rekap mulai <b>kosong</b>; angka abu-abu di kotak isian hanya
              <b>petunjuk rekap sebelumnya</b>, tidak ikut tersimpan.
            </p>
          </div>
          <!-- View mode toggle -->
          <div class="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              v-for="m in modes"
              :key="m.id"
              :class="[
                'px-3 py-1.5 text-[11px] font-bold rounded-lg transition',
                mode === m.id
                  ? 'bg-white shadow-sm text-cyan-700'
                  : 'text-slate-500 hover:text-slate-700'
              ]"
              @click="mode = m.id"
            >
              <i :class="['fas', m.icon, 'mr-1']"></i>{{ m.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- FILTERS + PERIODE -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-2"
      >
        <select
          v-model="bulan"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option v-for="b in BULAN_LIST" :key="b" :value="b">{{ b }}</option>
        </select>
        <select
          v-model="tahun"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option v-for="t in TAHUN_LIST" :key="t" :value="t">{{ t }}</option>
        </select>
        <select
          v-if="isFullFilter"
          v-model="filterLembaga"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua lembaga</option>
          <option v-for="l in LEMBAGA_QIRAATI" :key="l" :value="l">{{ l }}</option>
        </select>
        <select
          v-model="filterKelas"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua kelas</option>
          <option v-for="k in uniqueKelas" :key="k" :value="k">{{ k }}</option>
        </select>
        <!-- v.1.4.1 (Kyai): pisah rekap per PJ PTPT. Dibiarkan '' → PDF-nya sendiri yang
             DIPISAH jadi satu bagian per PJ (satu berkas, halaman terpisah per PJ). -->
        <select
          v-if="pjOptions.length > 1"
          v-model="filterPj"
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua PJ (PDF dipisah per PJ)</option>
          <option v-for="p in pjOptions" :key="p" :value="p">PJ {{ p }}</option>
        </select>
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama..."
          class="px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none col-span-2 md:col-span-1"
        />
      </div>

      <!-- v.100d: FILTER KATEGORI SANTRI (guru DUAL saja) — Qiraati ngaji vs Sekolah read-only → ekspor terpisah -->
      <div
        v-if="isDualGuru"
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-2"
      >
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <i class="fas fa-filter mr-1 text-cyan-500"></i>Kategori santri:
        </span>
        <div class="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
          <button
            v-for="t in tipeOptions"
            :key="t.id"
            :class="[
              'px-3 py-1.5 text-[11px] font-bold rounded-lg transition cursor-pointer',
              filterTipe === t.id
                ? 'bg-white dark:bg-slate-800 shadow-sm text-cyan-700'
                : 'text-slate-500 hover:text-slate-700'
            ]"
            @click="filterTipe = t.id"
          >
            <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
          </button>
        </div>
        <span class="text-[10px] text-slate-400 italic"
          >Ekspor (PDF/Excel/Sheet/Cetak) mengikuti kategori terpilih.</span
        >
      </div>

      <!-- STATS BADGES -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-2 text-center"
      >
        <div class="bg-cyan-50 rounded-lg p-2">
          <p class="text-2xl font-black text-cyan-700">{{ stats.totalKenaikan }}</p>
          <p class="text-[10px] uppercase text-slate-500">Total Kenaikan</p>
        </div>
        <div class="bg-emerald-50 rounded-lg p-2">
          <p class="text-2xl font-black text-emerald-700">{{ stats.santriDgnRiwayat }}</p>
          <p class="text-[10px] uppercase text-slate-500">Santri Aktif Naik</p>
        </div>
        <div class="bg-cyan-50 rounded-lg p-2">
          <p class="text-2xl font-black text-cyan-700">{{ stats.avgKenaikan }}</p>
          <p class="text-[10px] uppercase text-slate-500">Avg Naik/Santri</p>
        </div>
        <div class="bg-teal-50 rounded-lg p-2">
          <p class="text-2xl font-black text-teal-700">{{ filteredSantri.length }}</p>
          <p class="text-[10px] uppercase text-slate-500">Santri</p>
        </div>
        <div class="bg-rose-50 rounded-lg p-2">
          <p class="text-2xl font-black text-rose-700">{{ stats.belumDinilai }}</p>
          <p class="text-[10px] uppercase text-slate-500">Belum Dinilai</p>
        </div>
        <div class="bg-teal-50 rounded-lg p-2">
          <p class="text-2xl font-black text-teal-700">{{ stats.sudahDinilai }}</p>
          <p class="text-[10px] uppercase text-slate-500">Sudah Dinilai</p>
        </div>
      </div>

      <!-- v.1.4.1 (Kyai): "guru2 katanya banyak yg sudah isi, tapi di rekap kok banyak yg
           belum diisi." Isian yang tersangkut di bucket bulan sebelah — akibat dropdown
           lama yang terbuka pada bulan kalender, bukan pada periode rekap yang berjalan. -->
      <div
        v-if="mode === 'bulanan' && tersangkutBulanSebelah.jumlah > 0"
        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-2xl p-3 text-[11px] text-amber-900 dark:text-amber-200"
      >
        <p class="font-black">
          <i class="fas fa-triangle-exclamation mr-1"></i>{{ tersangkutBulanSebelah.jumlah }} santri
          isiannya tersimpan di
          <b>Rekap {{ labelBulanPeriode(tersangkutBulanSebelah.periodeSebelum) }}</b
          >, bukan di Rekap {{ bulan }}.
        </p>
        <p class="mt-1 opacity-90">
          Semuanya ditulis pada/sesudah
          <b>{{ tersangkutBulanSebelah.sejak }}</b> — yaitu sesudah jendela Rekap
          {{ bulan }} dibuka, jadi isinya memang capaian {{ bulanDataLabel }}. Versi lama membuka
          dropdown ini pada bulan kalender, sehingga guru yang mengisi tanggal 29–31 tersimpan ke
          bulan sebelumnya. Buka filter
          <b>{{ labelBulanPeriode(tersangkutBulanSebelah.periodeSebelum) }}</b> untuk melihat
          angkanya.
        </p>
        <button
          v-if="canCrud"
          class="mt-2 px-3 py-1.5 text-[11px] font-black rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
          :disabled="pindahBusy"
          @click="bukaPindah"
        >
          <i class="fas fa-right-left mr-1"></i>Tinjau &amp; pindahkan ke Rekap {{ bulan }}
        </button>
      </div>

      <!-- ACTION BAR (Export/Print/Simpan) -->
      <div
        v-if="mode === 'bulanan'"
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-2"
      >
        <div class="text-[11px] text-slate-500">
          <i class="fas fa-info-circle mr-1 text-cyan-500"></i>
          Edit kolom <b>Awal</b> & <b>Akhir</b>, lalu klik <b>Simpan</b>. Total auto-compute untuk
          PTPT.
        </div>
        <!-- v.21.115.0528: standardize per design-tokens — Cetak cyan, PDF cyan, Excel emerald, Simpan primary -->
        <!-- v.103b: mobile = toolbar 1-baris scroll-samping (sebelumnya wrap jadi 3 baris berantakan) -->
        <div
          class="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink w-full md:w-auto -mx-1 px-1 md:mx-0 md:px-0"
        >
          <button
            aria-label="Cetak rekap HTML"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
            @click="cetakHTML()"
          >
            <i class="fas fa-print"></i>Cetak
          </button>
          <button
            :disabled="busy"
            aria-label="Ekspor rekap PDF"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            @click="exportPdf()"
          >
            <i class="fas fa-file-pdf"></i>PDF
          </button>
          <button
            :disabled="busy"
            aria-label="Ekspor rekap Excel"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            @click="exportExcel()"
          >
            <i class="fas fa-file-excel"></i>Excel
          </button>
          <button
            v-if="gsheetConfigured()"
            :disabled="busy"
            aria-label="Kirim rekap ke Google Sheet"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            @click="kirimRekapGsheet()"
          >
            <i :class="['fas', 'fa-table']"></i>Google Sheet
          </button>
          <!-- v.100 Batch10: impor massal nilai prestasi (data baru & banyak) — admin -->
          <button
            v-if="isFullFilter"
            :disabled="busy"
            aria-label="Unduh template impor"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
            @click="downloadTemplateRekap()"
          >
            <i class="fas fa-file-arrow-down"></i>Template Impor
          </button>
          <label
            v-if="isFullFilter"
            aria-label="Impor rekap XLSX"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition cursor-pointer"
            :class="importingRekap ? 'opacity-50 pointer-events-none' : ''"
          >
            <i :class="['fas', importingRekap ? 'fa-spinner fa-spin' : 'fa-file-arrow-up']"></i>
            {{
              importingRekap
                ? `Impor… ${importRekapProgress.i}/${importRekapProgress.total}`
                : 'Impor XLSX'
            }}
            <input
              type="file"
              accept=".xlsx,.xls"
              class="hidden"
              :disabled="importingRekap"
              @change="onImportRekap"
            />
          </label>
          <button
            :disabled="busy"
            aria-label="Simpan rekap"
            class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black transition cursor-pointer"
            @click="simpanRekap()"
          >
            <i :class="['fas', busy ? 'fa-spinner fa-spin' : 'fa-save']"></i
            >{{ busy ? 'Menyimpan...' : 'SIMPAN' }}
          </button>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500">Memuat...</p>
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="filteredSantri.length === 0"
        class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Tidak ada santri Qiraati yang cocok.</p>
      </div>

      <!-- ============= MODE 1: RIWAYAT (list expandable kartu kenaikan) ============= -->
      <div v-else-if="mode === 'riwayat'" class="space-y-2">
        <div
          v-for="s in filteredSantri"
          :key="s.id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-slate-500">
                {{ s.lembaga }}{{ s.shift ? ' · ' + s.shift : '' }} · Kelas {{ s.kelas || '-'
                }}{{ s.juz ? ' · ' + s.juz : '' }}
              </p>
              <div class="flex flex-wrap gap-1 mt-1">
                <span class="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-bold"
                  >{{ countRiwayat(s) }} kenaikan</span
                >
                <span
                  v-if="prestasiRiwayatOf(s.id).length"
                  class="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold"
                  >{{ prestasiRiwayatOf(s.id).length }} bln prestasi</span
                >
                <span
                  v-if="s.prestasi_awal"
                  class="text-[9px] bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded font-bold"
                  >Awal: {{ s.prestasi_awal }}</span
                >
                <span
                  v-if="s.prestasi_akhir"
                  class="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold"
                  >Akhir: {{ s.prestasi_akhir }}</span
                >
                <span
                  v-if="s.prestasi_total"
                  class="text-[9px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-bold"
                  >Total: {{ s.prestasi_total }}</span
                >
              </div>
            </div>
            <button
              class="text-cyan-500 hover:bg-cyan-50 px-2 py-1 rounded"
              @click="toggleExpand(s.id)"
            >
              <i :class="['fas', expandedId === s.id ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </button>
          </div>
          <div v-if="expandedId === s.id" class="mt-2 pt-2 border-t border-cyan-100 space-y-3">
            <!-- v.100d: Riwayat Prestasi Bulanan (snapshot per bulan) -->
            <div v-if="prestasiRiwayatOf(s.id).length > 0">
              <p class="text-[10px] font-bold text-emerald-700 uppercase mb-1">
                Riwayat Prestasi Bulanan ({{ prestasiRiwayatOf(s.id).length }})
              </p>
              <div class="overflow-x-auto">
                <table class="w-full text-[11px] border-collapse">
                  <thead>
                    <tr class="bg-emerald-50 text-emerald-800">
                      <th class="border border-emerald-100 px-2 py-1 text-left">Bulan</th>
                      <th class="border border-emerald-100 px-2 py-1 text-center">Awal</th>
                      <th class="border border-emerald-100 px-2 py-1 text-center">Akhir</th>
                      <th class="border border-emerald-100 px-2 py-1 text-center">Total</th>
                      <th v-if="canCrud" class="border border-emerald-100 px-2 py-1 text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in prestasiRiwayatOf(s.id)" :key="r.id">
                      <td class="border border-slate-200 px-2 py-1 font-bold text-slate-700">
                        {{ r.bulan_label || r.periode }}
                      </td>
                      <td class="border border-slate-200 px-2 py-1 text-center">
                        {{ r.awal || '-' }}
                      </td>
                      <td class="border border-slate-200 px-2 py-1 text-center">
                        {{ r.akhir || '-' }}
                      </td>
                      <td
                        class="border border-slate-200 px-2 py-1 text-center font-bold text-emerald-700"
                      >
                        {{ r.total || '-'
                        }}<span v-if="r.juz" class="text-rose-600"> · {{ r.juz }}</span>
                      </td>
                      <td
                        v-if="canCrud"
                        class="border border-slate-200 px-1 py-1 text-center whitespace-nowrap"
                      >
                        <button
                          class="text-cyan-600 hover:text-cyan-800 px-1"
                          title="Koreksi"
                          @click="openEditPrestasi(r)"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          class="text-rose-600 hover:text-rose-800 px-1"
                          title="Hapus"
                          @click="hapusPrestasi(r)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- Riwayat Kenaikan (existing) -->
            <div v-if="Array.isArray(s.riwayat) && s.riwayat.length > 0">
              <p class="text-[10px] font-bold text-cyan-700 uppercase mb-1">
                Riwayat Kenaikan ({{ s.riwayat.length }})
              </p>
              <div class="space-y-1">
                <div
                  v-for="(r, i) in s.riwayat"
                  :key="i"
                  class="text-[11px] bg-cyan-50 rounded px-2 py-1 flex justify-between gap-2"
                >
                  <span
                    ><b>{{ r.tgl_naik || r.tanggal || '-' }}</b
                    >: {{ r.kelas_from || '?' }} → {{ r.kelas_to || r.keterangan || '?' }}</span
                  >
                  <span v-if="r.catatan" class="text-slate-500 italic truncate">{{
                    r.catatan
                  }}</span>
                </div>
              </div>
            </div>
            <!-- kosong -->
            <p
              v-if="
                prestasiRiwayatOf(s.id).length === 0 &&
                !(Array.isArray(s.riwayat) && s.riwayat.length)
              "
              class="text-[11px] text-slate-400 italic"
            >
              Belum ada riwayat prestasi bulanan / kenaikan untuk santri ini.
            </p>
          </div>
        </div>
      </div>

      <!-- ============= MODE 2: BULANAN (editable input table) ============= -->
      <div
        v-else-if="mode === 'bulanan'"
        class="bg-white dark:bg-slate-800 rounded-2xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <!-- Desktop: tabel -->
        <div v-if="!isMobile" class="overflow-x-auto">
          <table class="min-w-full text-xs border-collapse">
            <thead class="bg-slate-100 sticky top-0 z-10">
              <tr>
                <!-- v.21.115.0528: Nama Santri sticky kiri supaya tetap visible saat scroll horizontal mobile -->
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-left text-[10px] uppercase text-slate-700 sticky left-0 bg-slate-100 z-20 min-w-[140px]"
                >
                  Nama Santri
                </th>
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] text-slate-700"
                >
                  L/P
                </th>
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] text-slate-700"
                >
                  Lembaga/Kelas
                </th>
                <th
                  v-if="hasPTPT"
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-rose-50 text-rose-900"
                >
                  Juz
                </th>
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-teal-100 text-teal-900"
                >
                  Awal Bln
                </th>
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-teal-100 text-teal-900"
                >
                  Akhir Bln
                </th>
                <th
                  class="py-2 px-2 border border-slate-300 font-black text-center text-[10px] bg-cyan-100 text-cyan-900"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="grp in groupedBulanan" :key="grp.key">
                <tr class="bg-slate-200">
                  <td
                    :colspan="hasPTPT ? 7 : 6"
                    class="p-2 border border-slate-300 font-black text-slate-800 uppercase tracking-wider text-[10px]"
                  >
                    GURU: {{ grp.guru || '— belum ada guru —' }} | {{ grp.lembaga }} | KELAS:
                    {{ grp.kelas || '-' }} | {{ grp.jumlah }} santri
                  </td>
                </tr>
                <tr v-for="s in grp.santri" :key="s.id" class="hover:bg-cyan-50/30">
                  <!-- v.21.115.0528: nama santri body sticky kiri -->
                  <td
                    class="p-2 border border-slate-300 font-bold text-slate-800 whitespace-nowrap sticky left-0 bg-white dark:bg-slate-800 z-[1]"
                  >
                    {{ s.nama }}
                    <span
                      v-if="!canEditPrestasi(s)"
                      class="ml-1 text-[8px] font-black px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 align-middle"
                      title="Santri kelas sekolah Anda — prestasi qiraati hanya dapat dilihat"
                      >SEKOLAH</span
                    >
                  </td>
                  <td class="p-2 border border-slate-300 text-center font-bold">
                    {{ s.jk || '-' }}
                  </td>
                  <td class="p-2 border border-slate-300 text-center text-[10px]">
                    {{ s.lembaga }} - {{ kelasLabel(s) || '-' }}
                  </td>
                  <td v-if="hasPTPT" class="p-1 border border-slate-300 bg-rose-50/40">
                    <input
                      v-if="s.lembaga === 'PTPT'"
                      type="number"
                      min="1"
                      max="30"
                      :value="getJuzNum(s)"
                      :readonly="!canEditPrestasi(s)"
                      :class="[
                        'w-full text-center rounded p-1 text-[11px] font-bold border outline-none focus:ring-2 focus:ring-rose-400',
                        canEditPrestasi(s)
                          ? 'bg-rose-50 text-rose-900 border-rose-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                      ]"
                      @input="setJuz(s.id, $event.target.value)"
                    />
                    <span v-else class="text-[10px] text-slate-400">-</span>
                  </td>
                  <td class="p-1 border border-slate-300 bg-white">
                    <input
                      type="text"
                      :value="getEdit(s.id, 'awal')"
                      :placeholder="petunjukLalu(s.id, 'awal')"
                      :readonly="!canEditPrestasi(s)"
                      :class="[
                        'w-full text-center border-2 rounded-lg p-1.5 text-[11px] font-black shadow-sm focus:border-teal-500 outline-none',
                        canEditPrestasi(s)
                          ? 'border-slate-200'
                          : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                      ]"
                      @input="setEdit(s.id, 'awal', $event.target.value)"
                    />
                  </td>
                  <td class="p-1 border border-slate-300 bg-white">
                    <input
                      type="text"
                      :value="getEdit(s.id, 'akhir')"
                      :placeholder="petunjukLalu(s.id, 'akhir')"
                      :readonly="!canEditPrestasi(s)"
                      :class="[
                        'w-full text-center border-2 rounded-lg p-1.5 text-[11px] font-black shadow-sm focus:border-teal-500 outline-none',
                        canEditPrestasi(s)
                          ? 'border-slate-200'
                          : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                      ]"
                      @input="setEdit(s.id, 'akhir', $event.target.value)"
                    />
                  </td>
                  <td class="p-1 border border-slate-300 bg-slate-50">
                    <input
                      v-if="s.lembaga === 'PTPT'"
                      type="text"
                      :value="computedTotal(s)"
                      readonly
                      :class="[
                        'w-full text-center font-black text-[11px] p-1.5 rounded-lg border-2 cursor-not-allowed shadow-inner',
                        warnaPTPT(s)
                      ]"
                    />
                    <input
                      v-else
                      type="text"
                      :value="getEdit(s.id, 'total')"
                      :placeholder="petunjukLalu(s.id, 'total')"
                      :readonly="!canEditPrestasi(s)"
                      :class="[
                        'w-full text-center font-black text-[11px] p-1.5 rounded-lg border-2 shadow-sm focus:border-teal-500 outline-none',
                        canEditPrestasi(s)
                          ? 'border-slate-200'
                          : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                      ]"
                      @input="setEdit(s.id, 'total', $event.target.value)"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- v.103b mobile: kartu input per santri (berkelompok) — konsisten dgn Rekap Diniyah -->
        <div v-else class="space-y-3">
          <template v-for="grp in groupedBulanan" :key="'m' + grp.key">
            <p
              class="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider px-1 pt-1"
            >
              <i class="fas fa-layer-group mr-1.5 text-cyan-600"></i
              >{{ grp.guru || '— belum ada guru —' }} · {{ grp.lembaga }} {{ grp.kelas || '-' }} ·
              {{ grp.jumlah }} santri
            </p>
            <div
              v-for="s in grp.santri"
              :key="'m' + s.id"
              class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-3 space-y-2.5"
            >
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate min-w-0">
                  {{ s.nama }}
                  <span class="text-[10px] font-bold text-slate-500"
                    >{{ s.jk || '-' }} · {{ s.lembaga }} {{ kelasLabel(s) || '-' }}</span
                  >
                </p>
                <span
                  v-if="!canEditPrestasi(s)"
                  class="text-[8px] font-black px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 flex-shrink-0"
                  title="Santri kelas sekolah Anda — prestasi qiraati hanya dapat dilihat"
                  >SEKOLAH</span
                >
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label v-if="s.lembaga === 'PTPT'" class="block">
                  <span
                    class="block text-[9px] font-black uppercase tracking-wider text-rose-600 mb-0.5"
                    >Juz</span
                  >
                  <input
                    type="number"
                    min="1"
                    max="30"
                    inputmode="numeric"
                    :value="getJuzNum(s)"
                    :readonly="!canEditPrestasi(s)"
                    :class="[
                      'w-full text-center rounded-lg p-2 text-sm font-bold border outline-none focus:ring-2 focus:ring-rose-400',
                      canEditPrestasi(s)
                        ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-200 border-rose-300'
                        : 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                    ]"
                    @input="setJuz(s.id, $event.target.value)"
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-[9px] font-black uppercase tracking-wider text-teal-700 mb-0.5"
                    >Awal Bln</span
                  >
                  <input
                    type="text"
                    inputmode="numeric"
                    :value="getEdit(s.id, 'awal')"
                    :placeholder="petunjukLalu(s.id, 'awal')"
                    :readonly="!canEditPrestasi(s)"
                    :class="[
                      'w-full text-center font-black text-sm p-2 rounded-lg border-2 outline-none focus:border-teal-500',
                      canEditPrestasi(s)
                        ? 'border-slate-200 bg-white dark:bg-slate-900 dark:text-white'
                        : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                    ]"
                    @input="setEdit(s.id, 'awal', $event.target.value)"
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-[9px] font-black uppercase tracking-wider text-teal-700 mb-0.5"
                    >Akhir Bln</span
                  >
                  <input
                    type="text"
                    inputmode="numeric"
                    :value="getEdit(s.id, 'akhir')"
                    :placeholder="petunjukLalu(s.id, 'akhir')"
                    :readonly="!canEditPrestasi(s)"
                    :class="[
                      'w-full text-center font-black text-sm p-2 rounded-lg border-2 outline-none focus:border-teal-500',
                      canEditPrestasi(s)
                        ? 'border-slate-200 bg-white dark:bg-slate-900 dark:text-white'
                        : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                    ]"
                    @input="setEdit(s.id, 'akhir', $event.target.value)"
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-[9px] font-black uppercase tracking-wider text-cyan-700 mb-0.5"
                    >Total</span
                  >
                  <input
                    v-if="s.lembaga === 'PTPT'"
                    type="text"
                    :value="computedTotal(s)"
                    readonly
                    :class="[
                      'w-full text-center font-black text-sm p-2 rounded-lg border-2 cursor-not-allowed',
                      warnaPTPT(s)
                    ]"
                  />
                  <input
                    v-else
                    type="text"
                    inputmode="numeric"
                    :value="getEdit(s.id, 'total')"
                    :placeholder="petunjukLalu(s.id, 'total')"
                    :readonly="!canEditPrestasi(s)"
                    :class="[
                      'w-full text-center font-black text-sm p-2 rounded-lg border-2 outline-none focus:border-teal-500',
                      canEditPrestasi(s)
                        ? 'border-slate-200 bg-white dark:bg-slate-900 dark:text-white'
                        : 'border-slate-100 bg-slate-100 text-slate-500 cursor-not-allowed'
                    ]"
                    @input="setEdit(s.id, 'total', $event.target.value)"
                  />
                </label>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- ============= MODE 3: RANKING (top 5 per lembaga) ============= -->
      <template v-else-if="mode === 'ranking'">
        <!-- v.1.4.1 (Kyai, 4 Sep 2026): "di halaman ini belum ada tombol ekspor pdf."
             Tab Ranking dulu tak punya ekspor sama sekali — padahal justru DI SINI ekspornya
             paling masuk akal: PDF-nya memang sudah diurut capaian terbanyak lalu juz
             tertinggi (permintaan Kyai), jadi berkasnya persis daftar peringkat yang sedang
             dilihat, hanya lengkap sampai santri terakhir. Fungsinya DIPAKAI ULANG apa
             adanya, bukan disalin — kartu di layar & berkas cetak tak boleh bisa berbeda. -->
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-2"
        >
          <div class="text-[11px] text-slate-500">
            <i class="fas fa-info-circle mr-1 text-cyan-500"></i>
            Berkas ekspor memuat <b>seluruh santri</b> (bukan cuma Top 5), urut
            <b>capaian terbanyak</b> lalu <b>juz tertinggi</b>.
            <template v-if="!filterPj && pjOptions.length > 1">
              PDF-nya <b>dipisah per PJ PTPT</b>.
            </template>
          </div>
          <div
            class="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink w-full md:w-auto -mx-1 px-1 md:mx-0 md:px-0"
          >
            <button
              aria-label="Cetak peringkat"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
              @click="cetakHTML()"
            >
              <i class="fas fa-print"></i>Cetak
            </button>
            <button
              :disabled="busy"
              aria-label="Ekspor peringkat PDF"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              @click="exportPdf()"
            >
              <i class="fas fa-file-pdf"></i>PDF
            </button>
            <button
              :disabled="busy"
              aria-label="Ekspor peringkat Excel"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              @click="exportExcel()"
            >
              <i class="fas fa-file-excel"></i>Excel
            </button>
            <button
              v-if="gsheetConfigured()"
              :disabled="busy"
              aria-label="Kirim peringkat ke Google Sheet"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              @click="kirimRekapGsheet()"
            >
              <i class="fas fa-table"></i>Google Sheet
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div
            v-for="lmb in rankingPerLembaga"
            :key="lmb.lembaga"
            class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 shadow-sm"
          >
            <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
              <h3 class="font-black text-sm text-slate-800 uppercase tracking-wider">
                {{ lmb.lembaga }}
              </h3>
              <span class="text-[10px] font-bold text-slate-500"
                >{{ lmb.dinilai }}/{{ lmb.total }} dinilai</span
              >
            </div>
            <!-- PTPT histogram -->
            <div v-if="lmb.isPTPT" class="grid grid-cols-3 gap-2 mb-3">
              <div class="bg-rose-50 border border-rose-200 rounded-lg p-2 text-center">
                <p class="text-[9px] font-bold text-rose-700 uppercase">Kurang</p>
                <p class="text-lg font-black text-rose-800">{{ lmb.kurang }}</p>
                <p class="text-[8px] text-rose-600">&lt;5 hal</p>
              </div>
              <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-2 text-center">
                <p class="text-[9px] font-bold text-cyan-700 uppercase">Cukup</p>
                <p class="text-lg font-black text-cyan-800">{{ lmb.cukup }}</p>
                <p class="text-[8px] text-cyan-600">5-9 hal</p>
              </div>
              <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
                <p class="text-[9px] font-bold text-emerald-700 uppercase">Bagus</p>
                <p class="text-lg font-black text-emerald-800">{{ lmb.bagus }}</p>
                <p class="text-[8px] text-emerald-600">&ge;10 hal</p>
              </div>
            </div>
            <p class="text-[10px] font-black text-slate-600 uppercase mb-2">
              <i class="fas fa-medal text-cyan-500 mr-1"></i>Top 5 Prestasi Tertinggi
            </p>
            <ol v-if="lmb.top5.length > 0" class="space-y-1">
              <li
                v-for="(t, idx) in lmb.top5"
                :key="t.id || idx"
                class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs"
              >
                <span class="font-bold text-slate-800 truncate">
                  <span class="inline-block w-5 text-cyan-600 font-black">{{ idx + 1 }}.</span
                  >{{ t.nama }}
                </span>
                <span :class="['font-black whitespace-nowrap ml-2', t.color]">{{ t.display }}</span>
              </li>
            </ol>
            <p v-else class="text-xs text-slate-400 italic text-center py-3">
              Belum ada data prestasi.
            </p>
          </div>
        </div>
      </template>
    </template>
  </div>
  <!-- v.107: modal koreksi prestasi bulanan (super_admin) -->
  <div
    v-if="editP"
    class="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
    @click.self="editP = null"
  >
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 w-full max-w-xs shadow-xl border border-[var(--border-subtle)]"
    >
      <h3 class="text-sm font-bold text-[var(--text-primary)] mb-3">
        Koreksi Prestasi — {{ editP.label }}
      </h3>
      <div class="space-y-2">
        <label class="block text-[11px] font-semibold text-[var(--text-secondary)]"
          >Awal
          <input
            v-model="editP.awal"
            type="number"
            class="mt-0.5 w-full px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
        </label>
        <label class="block text-[11px] font-semibold text-[var(--text-secondary)]"
          >Akhir
          <input
            v-model="editP.akhir"
            type="number"
            class="mt-0.5 w-full px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
        </label>
        <label class="block text-[11px] font-semibold text-[var(--text-secondary)]"
          >Total
          <input
            v-model="editP.total"
            type="number"
            class="mt-0.5 w-full px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
        </label>
        <label class="block text-[11px] font-semibold text-[var(--text-secondary)]"
          >Juz (opsional)
          <input
            v-model="editP.juz"
            type="text"
            class="mt-0.5 w-full px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
        </label>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button
          class="h-9 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
          @click="editP = null"
        >
          Batal
        </button>
        <button
          class="h-9 px-3 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700"
          @click="saveEditPrestasi()"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
  <!-- ===== v.1.3.8 · DIALOG PENAMBALAN RIWAYAT BULANAN ===== -->
  <div
    v-if="tambal"
    class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
    @click.self="tambal = null"
  >
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
      <div class="px-5 py-4 border-b border-slate-200">
        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">
          <i class="fas fa-notes-medical text-amber-600 mr-1"></i>Penambalan Riwayat Bulanan
        </h3>
        <p class="text-[11px] text-slate-500 mt-1">
          Menyalin angka yang kini hanya ada di data santri ke riwayat bulan yang bersangkutan,
          supaya tak ikut hilang saat data santri dikosongkan.
        </p>
      </div>

      <div class="px-5 py-4 overflow-y-auto space-y-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div class="rounded-xl border border-amber-200 bg-amber-50 p-2.5">
            <p class="text-lg font-black text-amber-700">{{ tambal.siap.length }}</p>
            <p class="text-[10px] font-bold text-amber-700 uppercase">akan ditambal</p>
          </div>
          <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5">
            <p class="text-lg font-black text-emerald-700">{{ tambal.sudah }}</p>
            <p class="text-[10px] font-bold text-emerald-700 uppercase">sudah aman</p>
          </div>
          <div class="rounded-xl border border-rose-200 bg-rose-50 p-2.5">
            <p class="text-lg font-black text-rose-700">{{ tambal.beresiko.length }}</p>
            <p class="text-[10px] font-bold text-rose-700 uppercase">terancam hilang</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
            <p class="text-lg font-black text-slate-600">{{ tambal.kosong }}</p>
            <p class="text-[10px] font-bold text-slate-600 uppercase">tanpa angka</p>
          </div>
        </div>

        <div v-if="tambalSebaran.length" class="text-[11px] text-slate-600">
          <b>Sebaran bulan:</b>
          <span v-for="p in tambalSebaran" :key="p.periode" class="ml-1">
            {{ labelPeriodeTambal(p.periode) }} ({{ p.jml }})<span
              v-if="p !== tambalSebaran[tambalSebaran.length - 1]"
              >,</span
            >
          </span>
        </div>

        <!-- Yang TAK bisa ditambal wajib terlihat, bukan disembunyikan di balik angka. -->
        <div
          v-if="tambal.beresiko.length"
          class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-[11px] text-rose-800"
        >
          <p class="font-bold">
            <i class="fas fa-triangle-exclamation mr-1"></i>{{ tambal.beresiko.length }} santri
            punya angka TANPA riwayat sama sekali
          </p>
          <p class="mt-1">
            Angkanya TIDAK ditambal otomatis — bulannya tak diketahui, dan menaruhnya di bulan yang
            salah lebih berbahaya daripada membiarkannya. Angka mereka akan HILANG bila data santri
            dikosongkan; isi bulannya lewat Rekap Prestasi lebih dulu:
            <span class="font-bold">{{ tambalBeresikoNama }}</span>
          </p>
        </div>

        <div v-if="tambal.siap.length" class="border border-slate-200 rounded-xl overflow-hidden">
          <table class="w-full text-[11px]">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[9px]">
              <tr>
                <th class="text-left px-2 py-1.5 font-black">Santri</th>
                <th class="text-left px-2 py-1.5 font-black">Lembaga</th>
                <th class="text-left px-2 py-1.5 font-black">Bulan</th>
                <th class="text-right px-2 py-1.5 font-black">Awal</th>
                <th class="text-right px-2 py-1.5 font-black">Akhir</th>
                <th class="text-right px-2 py-1.5 font-black">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="r in tambal.siap.slice(0, 50)" :key="r.id">
                <td class="px-2 py-1 font-bold text-slate-700">{{ r.santri.nama }}</td>
                <td class="px-2 py-1 text-slate-500">{{ r.santri.lembaga }}</td>
                <td class="px-2 py-1 text-slate-500">{{ labelPeriodeTambal(r.periode) }}</td>
                <td class="px-2 py-1 text-right font-mono">{{ r.awal || '-' }}</td>
                <td class="px-2 py-1 text-right font-mono">{{ r.akhir || '-' }}</td>
                <td class="px-2 py-1 text-right font-mono">{{ r.total || '-' }}</td>
              </tr>
            </tbody>
          </table>
          <p
            v-if="tambal.siap.length > 50"
            class="text-[10px] text-slate-400 italic px-2 py-1.5 bg-slate-50"
          >
            &hellip; dan {{ tambal.siap.length - 50 }} baris lagi (semuanya ikut ditambal).
          </p>
        </div>
        <p v-else class="text-xs text-slate-500 italic text-center py-4">
          Tak ada lubang riwayat &mdash; semua angka sudah punya bulannya sendiri.
        </p>
      </div>

      <div class="px-5 py-4 border-t border-slate-200 flex items-center justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 cursor-pointer"
          @click="tambal = null"
        >
          Tutup
        </button>
        <button
          v-if="tambal.siap.length"
          type="button"
          class="px-4 py-2 text-xs font-black rounded-lg bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
          :class="tambalBusy ? 'opacity-50 pointer-events-none' : ''"
          @click="terapkanTambal"
        >
          <i :class="['fas', tambalBusy ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i>
          Terapkan ({{ tambal.siap.length }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive, watch } from 'vue'
import { subscribeColl, deleteOne, updateOne, mergeOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useExcel } from '@/composables/useExcel'
import { useGoogleSheet } from '@/composables/useGoogleSheet' // v.100 Batch12: ekspor ke Google Sheet
import { useSettingsStore } from '@/stores/settings'
import { extractNumber, todayJakarta } from '@/utils/format'
import { bestNameMatch, fuzzyKey, simRatio } from '@/utils/fuzzyMatch' // v.100 Batch12/14: cocokkan nama mirip + scope guru (impor Google Form)
import {
  createPdf,
  drawKopLetterhead,
  drawTitle,
  drawTable,
  savePdf,
  buildKopFromSettings
} from '@/utils/pdfBuilder'
import { muassisDataUrlSync } from '@/utils/kopMuassis' // v.100: baris-1 KOP print = gambar muassis
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router' // v.100c-fix: pilihKategori('diniyah') pakai router.push (sebelumnya undefined → ReferenceError)
import { isFullFilterRole, isSuperAdmin } from '@/utils/roleScope'
import { ownsSekolah, deteksiTipeGuru, scopeQiraati } from '@/utils/guruScope' // v.100b: guru sekolah lihat prestasi qiraati santri kelasnya (read-only); v.100d: deteksiTipeGuru utk toggle kategori guru dual; v.1.2.8: scopeQiraati = scope kepala per-sisi
import { sortSantri, kelasRank } from '@/utils/santriSort'
// v.1.3.7: angka prestasi MILIK BULAN — sumber tunggal, dipakai juga InputBulananView.
import {
  petaPrestasiPeriode,
  periodeSebelumnya,
  nilaiPrestasiBulan,
  petunjukBulanLalu,
  payloadRiwayatPrestasi,
  sudahDinilaiBulan,
  LEMBAGA_PRESTASI_BULANAN,
  // v.1.4.1 (Kyai 4 Sep 2026): periode = BULAN LAPORAN, isinya capaian bulan sebelumnya.
  periodeRekapBerjalan,
  periodeDataRekap,
  labelBulanPeriode,
  snapshotSalahJendela
} from '@/utils/prestasiBulanan'
// v.1.4.1: label kelas kanonik ('Kelas 1', bukan '1') + pembanding kelas yang toleran.
import { labelJenjang, kelasSama } from '@/utils/jenjangQiraati'
// v.1.4.1: bentuk tabel rekap (baris, urutan, kelompok per guru, pisah per PJ) — PURE.
import {
  KOLOM_REKAP_PRESTASI,
  TANPA_PJ,
  barisRekapPrestasi,
  urutkanRekapPrestasi,
  kelompokPerGuru,
  kelompokPerPj,
  daftarPj,
  barisCetak,
  guruSantri
} from '@/utils/rekapPrestasiTabel'
// v.1.4.1 (Kyai, 4 Sep 2026): "guru yg mengisi dari tgl 29 agustus - september itu adalah
//   data september." Rencana pemindahannya MURNI + 13 tes; layar ini hanya menampilkan &
//   menerapkan sesudah Kyai menekan konfirmasi.
import { rencanaPindahJendela } from '@/utils/pindahJendelaRekap'
import { usePjGuru } from '@/composables/usePjGuru'
import { buatPetaPjSantri } from '@/utils/glondongan'
// v.1.3.8 (Kyai, 2 Sep 2026): menambal riwayat bulanan yang tak pernah tertulis, SEBELUM
//   angka di data santri boleh dikosongkan tiap tanggal 25.
import { analisaTambal, labelPeriode as labelPeriodeTambal } from '@/utils/tambalRiwayatPrestasi'
import { useMobileShell } from '@/composables/useMobileShell'

// v.1.2.3: rekap prestasi bulanan HANYA untuk PTPT & PPPH (TPQ Pagi/Sore/Pra PTPT tak
//   perlu prestasi bulanan — Kyai). Menyetir tombol lembaga, filter, scope santri, & ekspor.
// v.1.3.8: daftarnya naik ke utils/prestasiBulanan — kartu dasbor "Guru Belum Input" kini
//   memakai daftar yang SAMA, dan dua salinan yang bisa berbeda persis itu yang dulu bikin
//   guru TPQ/Pra PTPT tertagih rekap yang tak pernah jadi kewajiban mereka.
const LEMBAGA_QIRAATI = LEMBAGA_PRESTASI_BULANAN
const BULAN_LIST = [
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
const _now = new Date()
const TAHUN_LIST = [2024, 2025, 2026, 2027, 2028]

const toast = useToast()
const settings = useSettingsStore()
const { exportStyled } = useExcel()
// v.100 Batch12: kirim Rekap Prestasi ke Google Sheet (hybrid, mirip PDF)
const { isConfigured: gsheetConfigured, sendToSheet } = useGoogleSheet()

const modes = [
  { id: 'bulanan', label: 'Input Bulanan', icon: 'fa-table' },
  { id: 'ranking', label: 'Ranking', icon: 'fa-medal' },
  { id: 'riwayat', label: 'Riwayat', icon: 'fa-history' }
]
// v.100d: kategori santri utk guru DUAL (Qiraati ngaji vs Sekolah read-only) → ekspor terpisah
const tipeOptions = [
  { id: 'all', label: 'Semua', icon: 'fa-layer-group' },
  { id: 'qiraati', label: 'Qiraati', icon: 'fa-mosque' },
  { id: 'sekolah', label: 'Sekolah', icon: 'fa-school' }
]

const santriRaw = ref([])
const guruRaw = ref([])
const riwayatPrestasiRaw = ref([]) // v.100d: koleksi riwayat_prestasi (snapshot bulanan)
const loading = ref(true)
const busy = ref(false)
const search = ref('')
const filterLembaga = ref('')
const auth = useAuthStore()

// v.107 CRUD (super_admin): koreksi/hapus snapshot prestasi bulanan (koleksi riwayat_prestasi).
const confirmDlg = useConfirm()
const canCrud = computed(() => isSuperAdmin(auth.sesiAktif || {}))
const editP = ref(null) // record riwayat_prestasi yang sedang dikoreksi
function openEditPrestasi(r) {
  editP.value = {
    id: r.id,
    label: r.bulan_label || r.periode || '',
    awal: r.awal ?? '',
    akhir: r.akhir ?? '',
    total: r.total ?? '',
    juz: r.juz ?? ''
  }
}
async function saveEditPrestasi() {
  const e = editP.value
  if (!e) return
  try {
    await updateOne('riwayat_prestasi', String(e.id), {
      awal: e.awal === '' ? null : Number(e.awal),
      akhir: e.akhir === '' ? null : Number(e.akhir),
      total: e.total === '' ? null : Number(e.total),
      juz: e.juz === '' ? null : e.juz,
      _edited_at: new Date().toISOString()
    })
    toast.success('Prestasi bulanan dikoreksi.')
    editP.value = null
  } catch (err) {
    toast.error('Gagal simpan koreksi: ' + (err.message || err))
  }
}
// ── v.1.3.8 · PENAMBALAN RIWAYAT BULANAN ────────────────────────────────────
// Kyai berencana mengosongkan angka prestasi di data santri tiap tanggal 25. Itu aman
// HANYA bila tiap bulan sudah punya salinannya sendiri — dan InputBulananView tak pernah
// menulis snapshot sampai v.1.3.8, jadi banyak bulan hidup hanya di baris santri.
// Aturannya (murni & teruji) di utils/tambalRiwayatPrestasi; di sini cuma IO + tampilan.
const tambal = ref(null)
const tambalBusy = ref(false)

function bukaTambal() {
  if (tambalBusy.value) return
  tambal.value = analisaTambal(santriRaw.value, riwayatPrestasiRaw.value)
}
const tambalSebaran = computed(() =>
  Object.entries(tambal.value?.periode || {})
    .map(([periode, jml]) => ({ periode, jml }))
    .sort((a, b) => String(b.periode).localeCompare(String(a.periode)))
)
const tambalBeresikoNama = computed(() => {
  const n = (tambal.value?.beresiko || []).map((s) => s.nama || '(tanpa nama)')
  return n.length > 8 ? `${n.slice(0, 8).join(', ')}, dan ${n.length - 8} lainnya` : n.join(', ')
})

async function terapkanTambal() {
  const daftar = tambal.value?.siap || []
  if (!daftar.length || tambalBusy.value) return
  const ok = await confirmDlg({
    title: `Tambal ${daftar.length} riwayat bulanan?`,
    message:
      'Angka yang kini hanya ada di data santri disalin ke riwayat bulan masing-masing. ' +
      'Data santri TIDAK diubah, dan riwayat yang sudah berangka tidak ditimpa.',
    confirmText: 'Terapkan'
  })
  if (!ok) return
  tambalBusy.value = true
  let sukses = 0
  const gagal = []
  try {
    for (const r of daftar) {
      try {
        // Bentuk baris DITURUNKAN dari payloadRiwayatPrestasi — sumber yang sama dengan
        // dua penulis lain, supaya baris tambalan tak berbeda bentuk dari baris asli.
        await mergeOne(
          'riwayat_prestasi',
          r.id,
          payloadRiwayatPrestasi({
            santri: r.santri,
            periode: r.periode,
            bulanLabel: labelPeriodeTambal(r.periode),
            awal: r.awal,
            akhir: r.akhir,
            total: r.total,
            juz: r.juz
          })
        )
        sukses++
      } catch (e) {
        gagal.push(`${r.santri.nama || r.santri.id}: ${e.message || e}`)
      }
    }
    if (gagal.length) {
      toast.error(`${sukses} tertambal, ${gagal.length} gagal — ${gagal[0]}`)
    } else {
      toast.success(`${sukses} riwayat bulanan tertambal.`)
    }
    // Hitung ulang dari data terbaru supaya angkanya tak berbohong sesudah diterapkan.
    tambal.value = analisaTambal(santriRaw.value, riwayatPrestasiRaw.value)
  } finally {
    tambalBusy.value = false
  }
}

async function hapusPrestasi(r) {
  const ok = await confirmDlg({
    title: `Hapus prestasi ${r.bulan_label || r.periode}?`,
    message: 'Snapshot prestasi bulanan ini dihapus (dicadangkan ke audit_log).',
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('riwayat_prestasi', String(r.id), {
      alasan: 'Hapus snapshot prestasi bulanan (super_admin)'
    })
    toast.success('Prestasi bulanan dihapus.')
  } catch (err) {
    toast.error('Gagal hapus: ' + (err.message || err))
  }
}
const router = useRouter()
const { isMobile } = useMobileShell()
const isFullFilter = computed(() => isFullFilterRole(auth.sesiAktif))
const isGuruMode = computed(() => !isFullFilter.value)
// v.1.2.8 (Kyai 5 Agu 2026): scope kepala PER-SISI — sumber tunggal di utils/guruScope.
//   Menutup bug "Kepala SDI yang juga guru ngaji PTPT melihat SEMUA santri SDI di rekap
//   prestasi PTPT"; alasan lengkapnya ada di komentar scopeQiraati.
const qs = computed(() => scopeQiraati(auth.sesiAktif))
function _lowS(v) {
  return String(v || '')
    .toLowerCase()
    .trim()
}
function ownNgaji(s) {
  const gn = _lowS(auth.sesiAktif?.guru || auth.sesiAktif?.nama)
  if (!gn) return false
  return _lowS(s.guru_pagi) === gn || _lowS(s.guru_sore) === gn || _lowS(s.guru) === gn
}
// v.100b: santri ini di kelas SEKOLAH guru ini? (utk LIHAT prestasi qiraati, read-only).
function ownSekolah(s) {
  return ownsSekolah(s, auth.sesiAktif?.guru || auth.sesiAktif?.nama)
}
// Boleh edit prestasi? admin penuh = ya. Kepala = lembaga NGAJI yang ia pimpin + santri
//   ngaji ampuannya (kepala SEKOLAH tak dapat kuasa atas nilai qiraati). Guru = santri
//   NGAJI ampuannya saja; santri kelas sekolahnya read-only.
function canEditPrestasi(s) {
  return qs.value.edit(s)
}
// v.100d: filter kategori utk guru DUAL (mengampu ngaji DAN wali kelas sekolah) → ekspor terpisah
const filterTipe = ref('all') // 'all' | 'qiraati' | 'sekolah'
const tipeGuru = computed(() =>
  deteksiTipeGuru(santriQiraati.value, auth.sesiAktif?.guru || auth.sesiAktif?.nama)
)
const isDualGuru = computed(
  () => isGuruMode.value && tipeGuru.value.qiraati && tipeGuru.value.sekolah
)
const filterKelas = ref('')
// v.1.4.1 (Kyai): penyaring PJ PTPT — '' = semua PJ (PDF-nya lalu DIPISAH per PJ).
const filterPj = ref('')
const expandedId = ref(null)
const mode = ref('bulanan')
// v.1.4.1 (Kyai, 4 Sep 2026): "di filter saya membukanya di September, bukan di agustus."
//   Layar dibuka pada periode LAPORAN yang sedang jadi giliran — 29 Agu s/d 28 Sep itu
//   September. Dulu `_now.getMonth()` polos: benar sepanjang tanggal 1–28, tapi salah
//   justru di hari-hari jendela baru dibuka (29–31), ketika layar ini paling dibutuhkan.
const _periodeAwal =
  periodeRekapBerjalan(todayJakarta()) ||
  `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}`
const bulan = ref(BULAN_LIST[Number(_periodeAwal.slice(5, 7)) - 1] || BULAN_LIST[_now.getMonth()])
const tahun = ref(Number(_periodeAwal.slice(0, 4)) || _now.getFullYear())
// v.100d: periode utk riwayat prestasi bulanan = bulan+tahun TERPILIH di filter (YYYY-MM)
const periodeSel = computed(() => {
  const mi = BULAN_LIST.indexOf(bulan.value)
  const mm = String((mi >= 0 ? mi : _now.getMonth()) + 1).padStart(2, '0')
  return `${tahun.value}-${mm}`
})
const bulanLabelSel = computed(() => `${bulan.value} ${tahun.value}`)
// Bulan yang angkanya SEDANG diisi. Nama bulan laporan tak pernah lagi tampil sendirian:
//   "Rekap September" tanpa keterangan itulah yang Kyai sebut masih ambigu.
const bulanDataLabel = computed(() => labelBulanPeriode(periodeDataRekap(periodeSel.value)))

// v.21.84.0527: 3-layer flow — landing → sub-landing → input (match live UX)
const viewStep = ref('landing') // 'landing' | 'sub-qiraati' | 'sub-diniyah' | 'input'
const LEMBAGA_DINIYAH = ['SDI', 'PKBM']
function pilihKategori(cat) {
  if (isGuruMode.value) {
    // Guru: langsung input (santri diampu, tanpa pilih lembaga)
    if (cat === 'qiraati') {
      filterLembaga.value = ''
      viewStep.value = 'input'
    } else {
      // Diniyah → ke RekapDiniyahView (guru mode di-handle di sana)
      router.push('/rekap-diniyah')
    }
    return
  }
  viewStep.value = cat === 'qiraati' ? 'sub-qiraati' : 'sub-diniyah'
}
function pilihLembagaInput(lmb) {
  filterLembaga.value = lmb
  viewStep.value = 'input'
}
function backToLanding() {
  viewStep.value = 'landing'
  filterLembaga.value = ''
}
function backToSub() {
  const lmb = String(filterLembaga.value || '').toLowerCase()
  if (['sdi', 'pkbm'].includes(lmb)) viewStep.value = 'sub-diniyah'
  else viewStep.value = 'sub-qiraati'
  filterLembaga.value = ''
}

// edits state (Awal/Akhir/Total/Juz per santri)
const edits = reactive({})
// v.1.4.1 (Kyai, 4 Sep 2026 — "ganti bulan/filter, angka lama ikut terbawa"): suntingan
//   yang belum tersimpan MILIK satu periode saja. Tanpa ini, angka yang diketik untuk
//   September masih menempel waktu dropdown dipindah ke Oktober — dan karena getEdit
//   mengutamakan `edits`, angka itu menutupi snapshot bulan yang baru dibuka lalu ikut
//   tersimpan ke sana begitu Simpan ditekan. Persis kelas bug v.1.3.7, versi lokalnya.
watch(periodeSel, () => {
  for (const id of Object.keys(edits)) delete edits[id]
})
let unsubSantri = null
let unsubGuru = null
let unsubRiwayatP = null // v.100d

const santriQiraati = computed(() => {
  return santriRaw.value.filter((s) => {
    if (s.aktif === false) return false
    const lmb = String(s.lembaga || '')
      .trim()
      .toLowerCase()
    return LEMBAGA_QIRAATI.some((q) => q.toLowerCase() === lmb)
  })
})

function lembagaMatch(s, filter) {
  const lmb = String(s.lembaga || '').toLowerCase()
  const fl = filter.toLowerCase()
  if (fl === 'tpq pagi')
    return lmb === 'tpq pagi' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'pagi')
  if (fl === 'tpq sore')
    return lmb === 'tpq sore' || (lmb === 'tpq' && String(s.shift || '').toLowerCase() === 'sore')
  return lmb === fl
}

const filteredSantri = computed(() => {
  let list = santriQiraati.value
  // Satu penyaring untuk semua non-admin: guru = santri ngaji ampuan (editable) + santri
  //   kelas sekolahnya (read-only); kepala = itu semua PLUS lembaga ngaji yang ia pimpin.
  if (!qs.value.adminPenuh) {
    list = list.filter((s) => qs.value.lihat(s))
    // v.100d: guru DUAL pisah kategori → ekspor terpisah. qiraati=ngaji (editable);
    //   sekolah=read-only (badge "SEKOLAH"). Toggle ini hanya muncul untuk guru.
    if (isGuruMode.value) {
      if (filterTipe.value === 'qiraati') list = list.filter((s) => ownNgaji(s))
      else if (filterTipe.value === 'sekolah')
        list = list.filter((s) => ownSekolah(s) && !ownNgaji(s))
    }
  }
  if (filterLembaga.value) list = list.filter((s) => lembagaMatch(s, filterLembaga.value))
  // v.1.4.1: dicocokkan lewat kelasSama — data PTPT memuat DUA ejaan untuk satu kelas
  //   ('1' dan 'Kelas 1'), jadi pembandingan string persis membuang separuh daftar diam-diam.
  if (filterKelas.value) list = list.filter((s) => kelasSama(s.kelas, filterKelas.value))
  // v.1.4.1 (Kyai): rekap bisa dipisah per PJ PTPT — penyaringnya menyetir layar & ekspor.
  if (filterPj.value)
    list = list.filter((s) => petaPjSantri.value.get(String(s.id)) === filterPj.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
})

// Pilihan kelas memakai label KANONIK, jadi '1' & 'Kelas 1' tak lagi jadi dua baris
//   dropdown untuk kelas yang sama (itulah "kelas/jilid PTPT tidak konsisten" yang dilihat
//   Kyai). Diurut lewat kelasRank supaya Kelas 10 tak nyelip sesudah Kelas 1.
const uniqueKelas = computed(() => {
  const set = new Set()
  for (const s of santriQiraati.value) {
    const k = labelJenjang(s.lembaga, s.kelas, lembagaMaster.value)
    if (k) set.add(k)
  }
  return [...set].sort((a, b) => kelasRank(a) - kelasRank(b) || a.localeCompare(b, 'id'))
})

const hasPTPT = computed(() => filteredSantri.value.some((s) => s.lembaga === 'PTPT'))

// ── v.1.4.1 · PJ efektif + baris rekap + kelompok per GURU ───────────────────
//
// Kyai (4 Sep 2026): "nama guru kosong padahal semua santri PTPT sudah punya guru. dan di
//   rekap kelompokkan per guru."
//
// Dua sebab yang berdiri sendiri, dua-duanya di blok lama ini:
//   (1) nama guru diambil dari `s.guru` — field TUNGGAL pra-v.1.1.9 yang di PTPT memang
//       sering kosong, sementara pengampu sebenarnya ada di `guru_pagi`/`guru_sore`;
//   (2) grupnya RUN-LENGTH atas daftar yang diurut lembaga→kelas→usia. Karena guru tak
//       pernah ikut mengurutkan, satu guru pecah jadi belasan grup dan judulnya berulang.
// Aturannya kini di utils/rekapPrestasiTabel (murni + tes).
const { pjGuru, lembagaList: lembagaMaster } = usePjGuru()
const petaPjSantri = computed(() => buatPetaPjSantri(santriRaw.value, guruRaw.value, pjGuru.value))
// Diturunkan dari peta PJ langsung, bukan dari baris rekap: dropdown-nya tak boleh ikut
//   menyusut waktu sebuah PJ dipilih (kalau tidak, PJ lain hilang & tak bisa dipilih lagi).
const pjOptions = computed(() =>
  daftarPj(santriQiraati.value.map((s) => ({ pj: petaPjSantri.value.get(String(s.id)) || '' })))
)

/**
 * Baris untuk MENGELOMPOKKAN — sengaja TANPA `nilai`, jadi tak bergantung pada `edits`.
 *
 * Pengelompokan cuma butuh id/nama/lembaga/kelas/guru; angka bulanan tak ikut menentukan
 * apa pun di sini. Kalau ia membaca `edits`, SETIAP huruf yang diketik di satu kotak isian
 * akan merakit ulang ~300 baris lalu mengelompokkannya lagi — biaya yang persis sama dengan
 * yang baru dibuang dari matriks absensi di v.1.4.0.
 */
const barisGrup = computed(() =>
  filteredSantri.value.map((s) => barisRekapPrestasi(s, { lembagaList: lembagaMaster.value }))
)

/**
 * Baris rekap LENGKAP dengan angka bulan terpilih (termasuk suntingan yang belum tersimpan).
 * Hanya dibaca saat EKSPOR ditekan — bukan saat render — jadi ketergantungannya pada
 * `edits` tak membebani pengetikan.
 */
const barisRekap = computed(() =>
  filteredSantri.value.map((s) =>
    barisRekapPrestasi(s, {
      nilai: nilaiTampil(s.id),
      lembagaList: lembagaMaster.value,
      pj: petaPjSantri.value.get(String(s.id)) || ''
    })
  )
)

const petaSantriId = computed(() => new Map(filteredSantri.value.map((s) => [String(s.id), s])))

// Grid isian: kelompok per guru, tapi urutan baris di dalamnya TETAP (lihat catatan di
//   kelompokPerGuru) — kalau diurut capaian, barisnya melompat sambil diketik.
const groupedBulanan = computed(() =>
  kelompokPerGuru(barisGrup.value, { urut: 'tetap' }).map((g) => ({
    key: g.key,
    lembaga: g.lembaga,
    kelas: g.kelas,
    guru: g.guru,
    jumlah: g.jumlah,
    santri: g.rows.map((r) => petaSantriId.value.get(r.id)).filter(Boolean)
  }))
)

/** Label kelas kanonik satu santri — dipakai sel tabel, kartu HP, dan cetak. */
function kelasLabel(s) {
  return labelJenjang(s?.lembaga, s?.kelas, lembagaMaster.value)
}

// Stats: count kenaikan + status dinilai
const stats = computed(() => {
  let totalKenaikan = 0
  let santriDgnRiwayat = 0
  let belumDinilai = 0
  let sudahDinilai = 0
  for (const s of filteredSantri.value) {
    const n = Array.isArray(s.riwayat) ? s.riwayat.length : 0
    totalKenaikan += n
    if (n > 0) santriDgnRiwayat++
    // v.1.3.7: TANPA jatuh ke `s.prestasi_*`. Jatuh itu membuat bulan yang belum
    //   disentuh siapa pun terhitung "sudah dinilai" — angka bulan lalu yang menjawab.
    if (
      sudahDinilaiBulan({
        awal: getEdit(s.id, 'awal'),
        akhir: getEdit(s.id, 'akhir'),
        total: getEdit(s.id, 'total')
      })
    )
      sudahDinilai++
    else belumDinilai++
  }
  const avg =
    filteredSantri.value.length > 0 ? (totalKenaikan / filteredSantri.value.length).toFixed(1) : '0'
  return { totalKenaikan, santriDgnRiwayat, avgKenaikan: avg, belumDinilai, sudahDinilai }
})

// RANKING per lembaga
const rankingPerLembaga = computed(() => {
  const result = []
  for (const lembaga of LEMBAGA_QIRAATI) {
    const list = filteredSantri.value.filter((s) => lembagaMatch(s, lembaga))
    if (list.length === 0) continue
    const isPTPT = lembaga === 'PTPT'
    let kurang = 0,
      cukup = 0,
      bagus = 0,
      dinilai = 0
    const scored = list.map((s) => {
      // v.1.3.7: ranking bulan terpilih dihitung dari angka BULAN ITU saja (lihat stats).
      const aw = extractNumber(getEdit(s.id, 'awal'))
      const ak = extractNumber(getEdit(s.id, 'akhir'))
      const rawTot = getEdit(s.id, 'total') || ''
      const computed = isPTPT ? Math.max(0, ak - aw) : extractNumber(rawTot)
      if (rawTot || aw || ak) dinilai++
      if (isPTPT) {
        if (computed > 0 && computed < 5) kurang++
        else if (computed >= 5 && computed < 10) cukup++
        else if (computed >= 10) bagus++
      }
      let color = 'text-slate-700'
      if (isPTPT) {
        if (computed >= 10) color = 'text-emerald-700'
        else if (computed >= 5) color = 'text-cyan-700'
        else if (computed > 0) color = 'text-rose-700'
      }
      const display = isPTPT ? (computed > 0 ? `${computed} Hal` : '-') : rawTot || '-'
      return { id: s.id, nama: s.nama, total: computed, display, color }
    })
    scored.sort((a, b) => b.total - a.total)
    const top5 = scored.filter((t) => t.total > 0).slice(0, 5)
    result.push({
      lembaga,
      isPTPT,
      total: list.length,
      dinilai,
      kurang,
      cukup,
      bagus,
      top5
    })
  }
  return result
})

// v.100d: riwayat prestasi bulanan per santri (submenu Riwayat) — urut periode TERBARU dulu
const riwayatPrestasiBySantri = computed(() => {
  const m = {}
  for (const r of riwayatPrestasiRaw.value) {
    const sid = String(r.santri_id || '')
    if (!sid) continue
    if (!m[sid]) m[sid] = []
    m[sid].push(r)
  }
  for (const sid in m)
    m[sid].sort((a, b) => String(b.periode || '').localeCompare(String(a.periode || '')))
  return m
})
function prestasiRiwayatOf(id) {
  return riwayatPrestasiBySantri.value[String(id)] || []
}

// Helpers
function countRiwayat(s) {
  return Array.isArray(s.riwayat) ? s.riwayat.length : 0
}
function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}
// v.1.3.7 (Kyai 31 Agu 2026): "kenapa tidak tereset setiap bulan, bulan agustus masih
//   terinput rekapan bulan lalu. harusnya kosong."
//   Grid ini dulu mengisi dirinya dari BARIS SANTRI (`s.prestasi_awal` dst) — satu-satunya
//   set angka yang tak punya dimensi bulan. Akibatnya memilih bulan lain tak mengubah apa
//   pun, dan angka bulan lalu muncul sebagai ISIAN: sekali disimpan, ia resmi jadi angka
//   bulan ini. Sekarang sumbernya SNAPSHOT bulan terpilih (`riwayat_prestasi`, sudah
//   ditulis sejak v.100d tapi tak pernah dibaca balik). Aturannya di utils/prestasiBulanan.
const petaPrestasiBulan = computed(() =>
  petaPrestasiPeriode(riwayatPrestasiRaw.value, periodeSel.value)
)
const petaPrestasiBulanLalu = computed(() =>
  petaPrestasiPeriode(riwayatPrestasiRaw.value, periodeSebelumnya(periodeSel.value))
)

// v.1.4.1 (Kyai, 4 Sep 2026): "guru2 katanya banyak yg sudah isi, tapi di rekap kok banyak
//   yg belum diisi." Sampai v.1.4.0 dropdown ini terbuka pada BULAN KALENDER, sedangkan
//   jendela pengisian menyeberangi pergantian bulan — yang mengisi 29–31 menyimpan ke bulan
//   sebelumnya, yang mengisi tgl 1–5 menyimpan ke bulan ini. Isian yang tersangkut di bucket
//   sebelah dilacak lewat WAKTU TULIS-nya (lihat snapshotSalahJendela), bukan lewat "ada
//   isian di bulan lalu" — kalau tidak, siklus bulan lalu yang normal pun ikut terhitung.
//   Sengaja hanya DILAPORKAN, tidak dipindah otomatis: bucket sebelah juga menampung rekap
//   yang sah, dan memindahkannya adalah keputusan Kyai.
const tersangkutBulanSebelah = computed(() =>
  snapshotSalahJendela(
    riwayatPrestasiRaw.value,
    periodeSel.value,
    filteredSantri.value.map((s) => String(s.id))
  )
)

// ── Pemindahan ke bucket yang benar — PRATINJAU DULU, tak ada yang ditulis sebelum
//    Kyai menekan konfirmasi. Pola & alasannya sama dengan dialog "Tambal" di atas.
const pindahRencana = ref(null)
const pindahBusy = ref(false)
// v.1.4.1: rencana pemindahan mengikuti daftar yang SEDANG TAMPIL — itu yang membuat
//   angkanya cocok dengan spanduk di atasnya. Konsekuensinya jadi jebakan kalau tak
//   disebutkan: Kyai bilang "pindahkan semua" sementara penyaring lembaga masih di PTPT,
//   lalu PPPH tak ikut terpindah dan tak ada yang memberi tahu. Karena itu penyaring yang
//   aktif DITULIS di dialognya.
const penyaringAktif = computed(() => {
  const p = []
  if (filterLembaga.value) p.push(`lembaga ${filterLembaga.value}`)
  if (filterKelas.value) p.push(`kelas ${filterKelas.value}`)
  if (filterPj.value) p.push(`PJ ${filterPj.value}`)
  if (String(search.value || '').trim()) p.push(`pencarian "${search.value.trim()}"`)
  if (isGuruMode.value && filterTipe.value !== 'all') p.push(`kategori ${filterTipe.value}`)
  return p
})
function bukaPindah() {
  if (pindahBusy.value) return
  pindahRencana.value = rencanaPindahJendela(riwayatPrestasiRaw.value, periodeSel.value, {
    santriList: santriRaw.value,
    idSantri: filteredSantri.value.map((s) => String(s.id))
  })
}
async function terapkanPindah() {
  const daftar = pindahRencana.value?.pindah || []
  if (!daftar.length || pindahBusy.value) return
  const ok = await confirmDlg({
    title: `Pindahkan ${daftar.length} isian ke Rekap ${bulan.value}?`,
    message:
      `Angka yang tersimpan di Rekap ${labelBulanPeriode(pindahRencana.value.periodeDari)} ` +
      `sejak ${pindahRencana.value.sejak} dipindahkan ke Rekap ${bulan.value} ${tahun.value}. ` +
      'Baris asalnya dihapus (tersalin dulu ke audit_log), data santri TIDAK diubah, dan ' +
      'baris tujuan yang sudah berangka tidak ditimpa.',
    confirmText: 'Pindahkan'
  })
  if (!ok) return
  pindahBusy.value = true
  let sukses = 0
  const gagal = []
  try {
    for (const it of daftar) {
      try {
        // TULIS DULU, baru hapus. Urutannya penting: kalau tulisnya gagal, baris asal masih
        // utuh dan tak ada angka yang lenyap. Kebalikannya menghilangkan data begitu satu
        // permintaan gagal di tengah daftar.
        const rp = payloadRiwayatPrestasi({
          santri: it.santri || {
            id: it.santriId,
            nama: it.nama,
            lembaga: it.lembaga,
            kelas: it.kelas
          },
          periode: pindahRencana.value.periodeKe,
          bulanLabel: bulanLabelSel.value,
          awal: it.awal,
          akhir: it.akhir,
          total: it.total,
          juz: it.juz
        })
        await mergeOne('riwayat_prestasi', rp.id, rp)
        // deleteOne menyalin baris ke audit_log dulu (v.91.0626) — jadi pemindahan ini
        // masih bisa ditelusuri kalau suatu saat Kyai ingin memeriksanya.
        if (it.dariId && it.dariId !== rp.id) {
          await deleteOne('riwayat_prestasi', it.dariId, {
            alasan: `pindah jendela rekap ${pindahRencana.value.periodeDari} → ${pindahRencana.value.periodeKe}`
          })
        }
        sukses++
      } catch (e) {
        gagal.push(`${it.nama}: ${e.message || e}`)
      }
    }
    if (gagal.length) toast.error(`${sukses} dipindah, ${gagal.length} gagal — ${gagal[0]}`)
    else toast.success(`${sukses} isian dipindahkan ke Rekap ${bulan.value} ${tahun.value}.`)
    pindahRencana.value = null
  } finally {
    pindahBusy.value = false
  }
}
function nilaiBulan(id) {
  const s = santriRaw.value.find((x) => String(x.id) === String(id))
  return nilaiPrestasiBulan(petaPrestasiBulan.value.get(String(id)) || null, s || {})
}
/** Angka bulan lalu — PLACEHOLDER saja (tak ikut tersimpan & tak ikut dihitung). */
function petunjukLalu(id, field) {
  const s = santriRaw.value.find((x) => String(x.id) === String(id))
  if (!s) return ''
  return petunjukBulanLalu(petaPrestasiBulanLalu.value.get(String(id)) || null, s)[field] || ''
}
/** Empat angka bulan terpilih sekaligus (termasuk suntingan yang belum tersimpan). */
function nilaiTampil(id) {
  return {
    awal: getEdit(id, 'awal'),
    akhir: getEdit(id, 'akhir'),
    total: getEdit(id, 'total'),
    juz: getEdit(id, 'juz')
  }
}
function getEdit(id, field) {
  const e = edits[id]
  if (e && e[field] !== undefined) return e[field]
  return nilaiBulan(id)[field] || ''
}
function setEdit(id, field, val) {
  if (!edits[id]) edits[id] = {}
  edits[id][field] = val
}
function getJuzNum(s) {
  // v.1.3.7: juz = keadaan BERJALAN, bukan ukuran bulanan — snapshot bulan itu dulu
  //   (kalau memang mencatatnya), baru juz santri sekarang. Sengaja TIDAK dikosongkan
  //   seperti awal/akhir: santri tak kembali ke Juz 1 setiap tanggal 1.
  const cur = edits[s.id]?.juz
  const raw = cur !== undefined ? cur : getEdit(s.id, 'juz')
  return extractNumber(raw) || ''
}
function setJuz(id, val) {
  setEdit(id, 'juz', val ? `JUZ ${val}` : '-')
}
function computedTotal(s) {
  // v.1.3.7: hanya angka BULAN TERPILIH — lihat catatan di getEdit.
  const aw = extractNumber(getEdit(s.id, 'awal'))
  const ak = extractNumber(getEdit(s.id, 'akhir'))
  const tot = Math.max(0, ak - aw)
  return tot > 0 ? `${tot} Hal` : ''
}
function warnaPTPT(s) {
  const aw = extractNumber(getEdit(s.id, 'awal'))
  const ak = extractNumber(getEdit(s.id, 'akhir'))
  const tot = Math.max(0, ak - aw)
  if (tot > 0 && tot < 5) return 'bg-rose-100 text-rose-900 border-rose-400'
  if (tot >= 5 && tot < 10) return 'bg-cyan-100 text-cyan-900 border-cyan-400'
  if (tot >= 10) return 'bg-green-100 text-green-900 border-green-500'
  return 'bg-slate-100 text-cyan-900 border-slate-300'
}

// SIMPAN
async function simpanRekap() {
  if (busy.value) return
  const ids = Object.keys(edits)
  if (ids.length === 0) {
    toast.info('Tidak ada perubahan.')
    return
  }
  busy.value = true
  try {
    const promises = []
    for (const id of ids) {
      const e = edits[id]
      const s = santriRaw.value.find((x) => String(x.id) === String(id))
      if (!s) continue
      if (!canEditPrestasi(s)) continue // v.100b: guru sekolah read-only — jangan simpan
      const payload = {}
      if (e.awal !== undefined) payload.prestasi_awal = e.awal
      if (e.akhir !== undefined) payload.prestasi_akhir = e.akhir
      if (s.lembaga === 'PTPT') {
        // Auto-compute PTPT total
        // v.1.3.7: pembanding = angka BULAN TERPILIH (getEdit), bukan baris santri —
        //   kalau tidak, total bulan baru dihitung dari akhir bulan lalu.
        const aw = extractNumber(e.awal ?? getEdit(id, 'awal'))
        const ak = extractNumber(e.akhir ?? getEdit(id, 'akhir'))
        const tot = Math.max(0, ak - aw)
        payload.prestasi_total = tot > 0 ? `${tot} Hal` : ''
        if (e.juz !== undefined) payload.juz = e.juz
      } else {
        if (e.total !== undefined) payload.prestasi_total = e.total
      }
      if (Object.keys(payload).length === 0) continue
      // v.1.3.7: baris santri = "angka TERAKHIR yang pernah disimpan" (dibaca Data Santri,
      //   profil, ekspor). Karena grid kini bisa membuka bulan mana pun, mencerminkan
      //   suntingan bulan LAMA ke sana akan memundurkan angka berjalan santri — mengoreksi
      //   Juni di bulan Agustus tak boleh mengubah "sekarang". Bulan lampau cukup mengubah
      //   snapshot bulannya sendiri.
      if (periodeSel.value >= todayJakarta().slice(0, 7)) {
        promises.push(updateOne('santri', String(id), payload))
      }
      // v.87.0526: event notif prestasi (1 per santri / bulan berjalan) -> Notif Center wali.
      // Bulan WIB, bukan UTC: `_periode` ikut jadi ID dokumen (`np_<id>_<periode>`), jadi
      //   tanggal 1 pukul 00:00–06:59 WIB akan menimpa notif BULAN SEBELUMNYA kalau dihitung UTC.
      const _periode = todayJakarta().slice(0, 7)
      const _npId = `np_${id}_${_periode}`
      promises.push(
        mergeOne('notif_prestasi', _npId, {
          id: _npId,
          santri_id: String(id),
          santri_nama: s.nama || '',
          total: String(payload.prestasi_total ?? e.total ?? ''),
          periode: _periode,
          createdAt: new Date().toISOString()
        })
      )
      // v.100d: snapshot prestasi BULANAN (periode = bulan/tahun terpilih) → submenu Riwayat.
      // v.1.3.7: nilai yang tak disunting diambil dari SNAPSHOT BULAN ITU (getEdit), bukan
      //   dari baris santri. Dulu jatuh ke baris santri, jadi menyimpan satu kolom saja
      //   sudah cukup untuk menyalin angka bulan lalu ke bulan ini — persis gejala yang
      //   Kyai laporkan, tapi versi permanennya (tersimpan, bukan cuma tampil).
      const _rpTotal =
        s.lembaga === 'PTPT'
          ? payload.prestasi_total || ''
          : e.total !== undefined
            ? e.total
            : getEdit(id, 'total')
      const _rpBaris = payloadRiwayatPrestasi({
        santri: s,
        periode: periodeSel.value,
        bulanLabel: bulanLabelSel.value,
        awal: e.awal !== undefined ? e.awal : getEdit(id, 'awal'),
        akhir: e.akhir !== undefined ? e.akhir : getEdit(id, 'akhir'),
        total: _rpTotal,
        juz: s.lembaga === 'PTPT' ? (e.juz !== undefined ? e.juz : getEdit(id, 'juz')) : ''
      })
      promises.push(mergeOne('riwayat_prestasi', _rpBaris.id, _rpBaris))
    }
    await Promise.all(promises)
    // clear local edits (snapshot will refresh)
    for (const id of ids) delete edits[id]
    toast.success(`Berhasil simpan ${promises.length} santri.`)
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  }
  busy.value = false
}

// ── v.100 Batch10: TEMPLATE + IMPOR XLSX rekap prestasi Qiraati (data baru & banyak — kyai) ──
const { importFile } = useExcel()
const importingRekap = ref(false)
const importRekapProgress = ref({ i: 0, total: 0 })
// v.100 Batch12: preview impor (review dulu spt impor santri/guru) sebelum tulis
const importRekapPreview = ref(null)

// Template berisi DAFTAR SANTRI sesuai filter aktif → tinggal isi kolom prestasi lalu impor.
async function downloadTemplateRekap() {
  if (busy.value) return
  busy.value = true
  try {
    const list = filteredSantri.value || []
    const rows = list.map((s) => ({
      nis: s.nis || '',
      nama: s.nama || '',
      lembaga: s.lembaga || '',
      kelas: s.kelas || '',
      juz: extractNumber(s.juz) || '',
      awal: s.prestasi_awal || '',
      akhir: s.prestasi_akhir || '',
      total: s.prestasi_total || ''
    }))
    await exportStyled(rows, {
      filename: `Template_Rekap_Prestasi_${(filterLembaga.value || 'Qiraati').replace(/\s+/g, '_')}.xlsx`,
      sheetName: 'Rekap Prestasi',
      // tanpa KOP — header row 1 supaya importFile auto-detect
      columns: [
        { key: 'nis', header: 'No. Induk', width: 12 },
        { key: 'nama', header: 'Nama Santri', width: 26 },
        { key: 'lembaga', header: 'Lembaga Qiraati', width: 14 },
        { key: 'kelas', header: 'Kelas', width: 16 },
        { key: 'juz', header: 'Juz (PTPT, angka)', width: 12 },
        { key: 'awal', header: 'Prestasi Awal', width: 14 },
        { key: 'akhir', header: 'Prestasi Akhir', width: 14 },
        { key: 'total', header: 'Prestasi Total (TPQ/PPPH manual)', width: 22 }
      ]
    })
    toast.success(
      `Template berisi ${rows.length} santri (${filterLembaga.value || 'semua Qiraati'}). PTPT: isi Awal+Akhir (total auto). Lainnya: isi Total.`
    )
  } catch (e) {
    toast.error('Gagal buat template: ' + (e.message || e))
  } finally {
    busy.value = false
  }
}

function _pickRekap(row, ...aliases) {
  for (const a of aliases) {
    if (row[a] !== undefined && row[a] !== null && row[a] !== '') return row[a]
  }
  const lower = {}
  for (const k of Object.keys(row)) lower[k.toLowerCase().trim()] = row[k]
  for (const a of aliases) {
    const v = lower[String(a).toLowerCase().trim()]
    if (v !== undefined && v !== null && v !== '') return v
  }
  return ''
}

// Ringkasan nilai utk preview
function _fmtNilaiBaru(p) {
  const parts = []
  if (p.kelas != null && p.kelas !== '') parts.push(`Kelas ${p.kelas}`)
  if (p.prestasi_awal != null && p.prestasi_awal !== '') parts.push(`Awal ${p.prestasi_awal}`)
  if (p.prestasi_akhir != null && p.prestasi_akhir !== '') parts.push(`Akhir ${p.prestasi_akhir}`)
  if (p.prestasi_total != null && p.prestasi_total !== '') parts.push(`Total ${p.prestasi_total}`)
  if (p.juz != null && p.juz !== '') parts.push(p.juz)
  return parts.join(' · ') || '—'
}
function _fmtNilaiLama(s) {
  const parts = []
  if (s.kelas) parts.push(`Kelas ${s.kelas}`)
  if (s.prestasi_awal) parts.push(`Awal ${s.prestasi_awal}`)
  if (s.prestasi_akhir) parts.push(`Akhir ${s.prestasi_akhir}`)
  if (s.prestasi_total) parts.push(`Total ${s.prestasi_total}`)
  if (s.juz) parts.push(s.juz)
  return parts.join(' · ') || '—'
}

// v.100 Batch14: impor Google Form — nama santri sering TAK lengkap & tanpa NIS. Manfaatkan kolom
//   Guru + Kelas + JK utk MEMPERSEMPIT pencarian, lalu cocokkan nama (persis/awalan/token) di lingkup kecil.
//   (Guru/Kelas/JK hanya penyaring — TIDAK ditulis ke santri. Yang ditulis: Juz → field juz, dsb.)
function _normNm(x) {
  return String(x == null ? '' : x)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
function _guruScopeMatch(s, guruIn) {
  const gi = _normNm(guruIn)
  if (!gi) return false
  for (const g of [s.guru_pagi, s.guru_sore, s.guru]) {
    const gn = _normNm(g)
    if (!gn) continue
    if (gn === gi || gn.includes(gi) || gi.includes(gn)) return true
    if (simRatio(fuzzyKey(g), fuzzyKey(guruIn)) >= 0.8) return true
  }
  return false
}
// Cocokkan nama (mungkin tak lengkap) di dalam pool. Return { s, how } | { s:null, ambiguous? }.
function _matchNameInPool(namaIn, pool) {
  const fn = _normNm(namaIn)
  if (!fn) return { s: null }
  const ftok = fn.split(' ').filter(Boolean)
  let cands = pool.filter((s) => _normNm(s.nama) === fn) // 1) persis
  if (cands.length === 1) return { s: cands[0], how: 'Nama' }
  if (cands.length > 1) return { s: null, ambiguous: cands.length }
  cands = pool.filter((s) => {
    // 2) awalan / subset token (nama form lebih pendek)
    const sn = _normNm(s.nama)
    if (!sn) return false
    if (sn.startsWith(fn) || fn.startsWith(sn)) return true
    const stok = sn.split(' ')
    return ftok.every((t) => stok.some((u) => u === t || u.startsWith(t) || t.startsWith(u)))
  })
  if (cands.length === 1) return { s: cands[0], how: 'Lingkup' }
  if (cands.length > 1) return { s: null, ambiguous: cands.length }
  const m = bestNameMatch(fn, pool, { getName: (x) => x.nama, min: 0.72 }) // 3) fuzzy ejaan (longgar, pool sempit)
  if (m) return { s: m.item, how: 'Mirip' }
  return { s: null }
}

// v.100 Batch12: FASE 1 — baca file → bangun PREVIEW (review dulu, belum tulis ke Firestore).
async function onImportRekap(e) {
  const file = e.target?.files?.[0]
  if (!file) return
  importingRekap.value = true
  try {
    const rows = await importFile(file)
    if (!rows.length) {
      toast.warning('File kosong / format tidak sesuai')
      return
    }
    const list = santriRaw.value || []
    const byNis = new Map()
    const byNama = new Map()
    for (const s of list) {
      const nis = String(s.nis || '').trim()
      if (nis && !byNis.has(nis)) byNis.set(nis, s)
      const nm = String(s.nama || '')
        .trim()
        .toLowerCase()
      if (nm && !byNama.has(nm)) byNama.set(nm, s)
    }
    const plan = []
    let cBaru = 0,
      cUpdate = 0,
      cSkip = 0,
      cNotFound = 0,
      cFuzzy = 0
    for (const r of rows) {
      const nisIn = String(
        _pickRekap(r, 'No. Induk', 'No Induk', 'no_induk', 'NIS', 'nis') || ''
      ).trim() // v.100: terima header baru + template lama
      const namaIn = String(
        _pickRekap(r, 'Nama Santri', 'Nama Lengkap Santri', 'Nama', 'nama') || ''
      ).trim()
      const namaLow = namaIn.toLowerCase()
      // v.100 Batch14: kolom Google Form sbg PENYARING pencocokan (tidak ditulis ke santri)
      const guruIn = String(
        _pickRekap(r, 'Nama Lengkap Guru', 'Nama Guru', 'Guru', 'guru') || ''
      ).trim()
      const kelasIn = String(_pickRekap(r, 'Sekolah', 'Kelas', 'kelas') || '').trim()
      const jkIn = String(_pickRekap(r, 'Jenis Kelamin', 'JK', 'L/P', 'jk') || '')
        .trim()
        .toUpperCase()
        .charAt(0)
      let s = null,
        matchBy = ''
      if (nisIn && byNis.get(nisIn)) {
        s = byNis.get(nisIn)
        matchBy = 'No. Induk'
      } else if (namaLow && byNama.get(namaLow)) {
        s = byNama.get(namaLow)
        matchBy = 'Nama'
      } else if (namaLow) {
        // v.100 Batch14: bangun POOL ter-scope (guru → kelas → JK), cocokkan nama tak lengkap di lingkup kecil
        let pool = list
        if (guruIn) {
          const byG = list.filter((x) => _guruScopeMatch(x, guruIn))
          if (byG.length) pool = byG
        }
        if (kelasIn) {
          const kf = _normNm(kelasIn)
          const byK = pool.filter((x) => _normNm(x.kelas_sekolah) === kf || _normNm(x.kelas) === kf)
          if (byK.length) pool = byK
        }
        if (jkIn === 'L' || jkIn === 'P') {
          const byJ = pool.filter(
            (x) =>
              String(x.jk || '')
                .toUpperCase()
                .charAt(0) === jkIn
          )
          if (byJ.length) pool = byJ
        }
        const scoped = pool !== list
        const res = _matchNameInPool(namaIn, pool)
        if (res.s) {
          s = res.s
          matchBy = res.how === 'Nama' ? 'Nama' : res.how // 'Lingkup' | 'Mirip'
          if (res.how !== 'Nama') cFuzzy++
        } else if (!scoped) {
          // tanpa info guru/kelas → fallback fuzzy global lama (kemiripan tinggi & tak ambigu)
          const m = bestNameMatch(namaLow, list, { getName: (x) => x.nama })
          if (m) {
            s = m.item
            matchBy = 'Mirip'
            cFuzzy++
          }
        }
      }
      if (!s) {
        if (nisIn || namaIn) {
          cNotFound++
          plan.push({
            action: 'notfound',
            matchBy: '',
            nama: namaIn || '(tanpa nama)',
            nis: nisIn || '-',
            lembaga: '',
            nilaiBaru: '—',
            nilaiLama: '—'
          })
        }
        continue
      }
      const awal = String(_pickRekap(r, 'Prestasi Awal', 'Awal', 'awal') || '').trim()
      const akhir = String(_pickRekap(r, 'Prestasi Akhir', 'Akhir', 'akhir') || '').trim()
      const totalIn = String(
        _pickRekap(r, 'Prestasi Total (TPQ/PPPH manual)', 'Prestasi Total', 'Total', 'total') || ''
      ).trim()
      const juzIn = String(_pickRekap(r, 'Juz (PTPT, angka)', 'Juz', 'juz') || '').trim()
      // v.100 Batch15b (kyai): kolom "PTPT" di Google Form = KELAS Qiraati → tulis ke field kelas.
      const ptptKelasIn = String(_pickRekap(r, 'PTPT', 'ptpt') || '').trim()
      const payload = {}
      if (awal) payload.prestasi_awal = awal
      if (akhir) payload.prestasi_akhir = akhir
      const isPtpt =
        String(s.lembaga || '')
          .toLowerCase()
          .trim() === 'ptpt'
      if (isPtpt) {
        // mirror simpanRekap: total PTPT auto dari Awal/Akhir
        const aw = extractNumber(awal || s.prestasi_awal)
        const ak = extractNumber(akhir || s.prestasi_akhir)
        const tot = Math.max(0, ak - aw)
        if (awal || akhir) payload.prestasi_total = tot > 0 ? `${tot} Hal` : ''
        if (juzIn) payload.juz = `JUZ ${extractNumber(juzIn)}`
        if (ptptKelasIn) payload.kelas = ptptKelasIn // PTPT = Kelas (posisi terkini)
      } else if (totalIn) {
        payload.prestasi_total = totalIn
      }
      const base = {
        matchBy,
        santriId: String(s.id),
        nama: s.nama || namaIn,
        nis: s.nis || nisIn || '-',
        lembaga: s.lembaga || '-',
        nilaiLama: _fmtNilaiLama(s)
      }
      if (!Object.keys(payload).length) {
        cSkip++
        plan.push({ ...base, action: 'skip', nilaiBaru: '—' })
        continue
      }
      const hadOld = !!(s.prestasi_total || s.prestasi_awal || s.prestasi_akhir)
      const action = hadOld ? 'update' : 'baru'
      if (action === 'baru') cBaru++
      else cUpdate++
      plan.push({ ...base, action, payload, totalIn, nilaiBaru: _fmtNilaiBaru(payload) })
    }
    importRekapPreview.value = {
      plan,
      preview: plan.slice(0, 100),
      cBaru,
      cUpdate,
      cSkip,
      cNotFound,
      cFuzzy,
      applyCount: cBaru + cUpdate
    }
  } catch (e2) {
    toast.error('Gagal baca file: ' + (e2.message || e2))
  } finally {
    importingRekap.value = false
    if (e.target) e.target.value = ''
  }
}

// v.100 Batch12: FASE 2 — terapkan hasil preview (hanya baris Baru/Update).
async function confirmImportRekap() {
  if (!importRekapPreview.value) return
  const items = importRekapPreview.value.plan.filter(
    (p) => p.action === 'baru' || p.action === 'update'
  )
  if (!items.length) {
    importRekapPreview.value = null
    return
  }
  importingRekap.value = true
  importRekapProgress.value = { i: 0, total: items.length }
  // Bulan WIB — lihat catatan di simpanRekap: _periode ikut jadi ID dokumen notif.
  const _periode = todayJakarta().slice(0, 7)
  let ok = 0,
    fail = 0
  try {
    for (const it of items) {
      importRekapProgress.value = { i: importRekapProgress.value.i + 1, total: items.length }
      try {
        await updateOne('santri', String(it.santriId), it.payload)
        // event notif prestasi (sama dgn simpanRekap) → Notif Center wali
        const _npId = `np_${it.santriId}_${_periode}`
        await mergeOne('notif_prestasi', _npId, {
          id: _npId,
          santri_id: String(it.santriId),
          santri_nama: it.nama || '',
          total: String(it.payload.prestasi_total ?? it.totalIn ?? ''),
          periode: _periode,
          createdAt: new Date().toISOString()
        })
        // v.100d: snapshot prestasi BULANAN (periode = bulan/tahun terpilih di layar)
        const _sImp = santriRaw.value.find((x) => String(x.id) === String(it.santriId))
        const _rpId = `rp_${it.santriId}_${periodeSel.value}`
        await mergeOne('riwayat_prestasi', _rpId, {
          id: _rpId,
          santri_id: String(it.santriId),
          santri_nama: it.nama || '',
          lembaga: it.lembaga || _sImp?.lembaga || '',
          kelas: _sImp?.kelas || '',
          periode: periodeSel.value,
          bulan_label: bulanLabelSel.value,
          awal: String(it.payload.prestasi_awal ?? _sImp?.prestasi_awal ?? ''),
          akhir: String(it.payload.prestasi_akhir ?? _sImp?.prestasi_akhir ?? ''),
          total: String(it.payload.prestasi_total ?? it.totalIn ?? _sImp?.prestasi_total ?? ''),
          juz: String(it.payload.juz ?? ''),
          updatedAt: new Date().toISOString()
        })
        ok++
      } catch (err) {
        fail++
        console.error('[importRekap]', it.santriId, err)
      }
    }
    toast.success(`Impor rekap: ${ok} santri terisi${fail ? `, ${fail} gagal` : ''}.`)
    importRekapPreview.value = null
  } catch (e2) {
    toast.error('Gagal impor: ' + (e2.message || e2))
  } finally {
    importingRekap.value = false
  }
}

// ── EXPORT PDF ───────────────────────────────────────────────────────────────
//
// Kyai (4 Sep 2026): "untuk ekspor PDF rekap prestasi bulanan, saya ingin bisa dipisah per
//   PJ PTPT. dan format tabelnya ekspornya berisi: No, Nama Santri, Kelas PTPT, Juz, Awal
//   Bulan, Akhir Bulan, Total Capaian, Nama Guru. dan diurutkan dari yg terbanyak total
//   capaiannya kemudian dari juz yg tertinggi."
//
// Kolom & urutannya TIDAK ditulis di sini — dua-duanya dari utils/rekapPrestasiTabel,
//   supaya PDF, cetak, dan layar mustahil berselisih.
//
// "Dipisah per PJ" = SATU berkas, satu BAGIAN per PJ, tiap bagian mulai di halaman baru
//   dengan kop, judul PJ, dan penomoran yang mulai dari 1 lagi — jadi tiap PJ tinggal
//   mencabut halamannya. Memilih satu PJ di penyaring menghasilkan berkas berisi PJ itu saja.
//
// ⚠ Sekalian diperbaiki: kop PDF ini dulu dirakit dengan kunci {title,name,address,contact}
//   sedangkan drawKopLetterhead membaca {line1..line5} — jadi seluruh baris kop-nya SELAMA
//   INI kosong (yang tampil hanya gambar muassis). buildKopFromSettings adalah bentuk yang
//   benar dan sudah dipakai ekspor lain.
function bagianEkspor() {
  const rows = barisRekap.value
  if (!rows.length) return []
  // PJ tertentu terpilih → satu bagian saja (penyaring sudah menyaring barisnya).
  if (filterPj.value) return [{ pj: filterPj.value, rows: urutkanRekapPrestasi(rows) }]
  // Tak ada peta PJ sama sekali (mis. lembaga PPPH) → jangan paksakan bagian palsu.
  const perPj = kelompokPerPj(rows)
  if (perPj.length === 1 && perPj[0].pj === TANPA_PJ) {
    return [{ pj: '', rows: perPj[0].rows }]
  }
  return perPj
}

async function exportPdf() {
  if (busy.value) return
  const bagian = bagianEkspor()
  if (!bagian.length) {
    toast.warning('Tak ada santri untuk diekspor.')
    return
  }
  busy.value = true
  try {
    const judul = `REKAPITULASI PRESTASI QIRAATI — REKAP ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const subJudul = `Capaian bulan ${bulanDataLabel.value}${
      filterLembaga.value ? ' · ' + filterLembaga.value : ''
    }`
    const kop = buildKopFromSettings(settings.savedSettings || {})
    const doc = await createPdf({ kind: 'umum', orientation: 'l', format: 'F4' })
    const head = [KOLOM_REKAP_PRESTASI.map((c) => c.header)]
    const availW = doc.internal.pageSize.getWidth() - 24
    const sumW = KOLOM_REKAP_PRESTASI.reduce((s, c) => s + c.lebar, 0)
    const skala = sumW > 0 ? availW / sumW : 1
    const columnStyles = KOLOM_REKAP_PRESTASI.reduce((acc, c, i) => {
      acc[i] = { cellWidth: Math.round(c.lebar * skala * 100) / 100 }
      return acc
    }, {})

    let pertama = true
    for (const b of bagian) {
      if (!pertama) doc.addPage()
      pertama = false
      let y = await drawKopLetterhead(doc, kop, { y: 10 })
      drawTitle(doc, judul, { y: y + 8, size: 12 })
      y += 12
      drawTitle(doc, subJudul, { y: y + 4, size: 9 })
      y += 6
      if (b.pj) {
        drawTitle(doc, `PJ PTPT: ${b.pj} · ${b.rows.length} santri`, { y: y + 5, size: 10 })
        y += 7
      }
      drawTable(doc, {
        startY: y + 4,
        head,
        body: barisCetak(b.rows).map((r) =>
          KOLOM_REKAP_PRESTASI.map((c) => String(r[c.key] ?? ''))
        ),
        tableWidth: availW,
        columnStyles
      })
    }

    const namaPj = filterPj.value ? '_' + filterPj.value.replace(/\s+/g, '_') : ''
    await savePdf(doc, `REKAP_PRESTASI_${bulan.value}_${tahun.value}${namaPj}.pdf`)
    toast.success(
      bagian.length > 1
        ? `PDF dibuat — ${bagian.length} bagian, dipisah per PJ.`
        : 'PDF berhasil di-generate.'
    )
  } catch (e) {
    toast.error('Gagal export PDF: ' + (e.message || e))
  }
  busy.value = false
}

// EXPORT EXCEL
async function exportExcel() {
  if (busy.value) return
  busy.value = true
  try {
    const set = settings.savedSettings || {}
    const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const columns = [
      { key: 'no', header: 'No', width: 6 },
      { key: 'nama', header: 'Nama Santri', width: 28 },
      { key: 'jk', header: 'L/P', width: 6 },
      { key: 'lembaga_kelas', header: 'Lembaga/Kelas', width: 22 }
    ]
    if (hasPTPT.value) columns.push({ key: 'juz', header: 'Juz', width: 10 })
    columns.push({ key: 'awal', header: 'Awal Bln', width: 12 })
    columns.push({ key: 'akhir', header: 'Akhir Bln', width: 12 })
    columns.push({ key: 'total', header: 'Total', width: 12 })

    let no = 1
    const rows = filteredSantri.value.map((s) => {
      const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
      const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
      const tot =
        s.lembaga === 'PTPT' ? computedTotal(s) : getEdit(s.id, 'total') || s.prestasi_total || ''
      const jz = s.lembaga === 'PTPT' ? getEdit(s.id, 'juz') || s.juz || '-' : '-'
      return {
        no: no++,
        nama: s.nama,
        jk: s.jk || '-',
        lembaga_kelas: `${s.lembaga} - ${s.kelas || '-'}`,
        juz: jz,
        awal: aw,
        akhir: ak,
        total: tot
      }
    })

    const kopLines = [
      set.kopLine1 || set.txtAppName || '',
      set.kopLine2 || '',
      set.kopLine3 || '',
      set.kopLine4 || ''
    ]
    await exportStyled(rows, {
      filename: `REKAP_PRESTASI_${bulan.value}_${tahun.value}.xlsx`,
      sheetName: 'Rekap Prestasi',
      kop: kopLines,
      subtitle: `${judul} · Total: ${rows.length} santri`,
      columns
    })
    toast.success('Excel berhasil di-generate.')
  } catch (e) {
    toast.error('Gagal export Excel: ' + (e.message || e))
  }
  busy.value = false
}

// v.100 Batch12: kirim Rekap Prestasi ke Google Sheet (reuse data/kolom yang sama dgn Excel)
async function kirimRekapGsheet() {
  if (busy.value) return
  if (!gsheetConfigured()) {
    toast.warning('Google Sheet belum diatur. Buka Pengaturan → Google Sheet dulu.')
    return
  }
  busy.value = true
  try {
    const set = settings.savedSettings || {}
    const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
    const columns = [
      { key: 'no', header: 'No', width: 6 },
      { key: 'nama', header: 'Nama Santri', width: 28 },
      { key: 'jk', header: 'L/P', width: 6 },
      { key: 'lembaga_kelas', header: 'Lembaga/Kelas', width: 22 }
    ]
    if (hasPTPT.value) columns.push({ key: 'juz', header: 'Juz', width: 10 })
    columns.push({ key: 'awal', header: 'Awal Bln', width: 12 })
    columns.push({ key: 'akhir', header: 'Akhir Bln', width: 12 })
    columns.push({ key: 'total', header: 'Total', width: 12 })
    let no = 1
    const rows = filteredSantri.value.map((s) => {
      const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
      const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
      const tot =
        s.lembaga === 'PTPT' ? computedTotal(s) : getEdit(s.id, 'total') || s.prestasi_total || ''
      const jz = s.lembaga === 'PTPT' ? getEdit(s.id, 'juz') || s.juz || '-' : '-'
      return {
        no: no++,
        nama: s.nama,
        jk: s.jk || '-',
        lembaga_kelas: `${s.lembaga} - ${s.kelas || '-'}`,
        juz: jz,
        awal: aw,
        akhir: ak,
        total: tot
      }
    })
    const kopLines = [
      set.kopLine1 || set.txtAppName || '',
      set.kopLine2 || '',
      set.kopLine3 || '',
      set.kopLine4 || ''
    ].filter(Boolean)
    const { url } = await sendToSheet({
      rows,
      title: `Rekap Prestasi ${bulan.value} ${tahun.value}`,
      sheetName: 'Rekap Prestasi',
      kop: kopLines,
      subtitle: `${judul} · Total: ${rows.length} santri`,
      columns
    })
    toast.success(`${rows.length} santri terkirim ke Google Sheet.`)
    try {
      window.open(url, '_blank')
    } catch (e) {
      /* ignore */
    }
  } catch (e) {
    toast.error('Gagal kirim ke Google Sheet: ' + (e?.message || e))
  } finally {
    busy.value = false
  }
}

// CETAK HTML (print preview newwindow)
function cetakHTML() {
  const set = settings.savedSettings || {}
  const judul = `REKAPITULASI PRESTASI QIRAATI BULAN ${String(bulan.value).toUpperCase()} ${tahun.value}`
  let no = 1
  let lastKey = ''
  let bodyRows = ''
  // Urutan cetak = urutan grup di layar (per guru), supaya kertas & layar sama isinya.
  const urutanCetak = groupedBulanan.value.flatMap((g) => g.santri)
  for (const s of urutanCetak) {
    const aw = getEdit(s.id, 'awal') || s.prestasi_awal || ''
    const ak = getEdit(s.id, 'akhir') || s.prestasi_akhir || ''
    const tot =
      s.lembaga === 'PTPT' ? computedTotal(s) : getEdit(s.id, 'total') || s.prestasi_total || ''
    const jz = s.lembaga === 'PTPT' ? getEdit(s.id, 'juz') || s.juz || '-' : '-'
    // v.1.4.1: nama guru dari PASANGAN (guru_pagi/sore), bukan `s.guru` yang di PTPT
    //   memang sering kosong — cermin persis judul grup di layar.
    const guruName = guruSantri(s) || '—'
    const kls = kelasLabel(s) || '-'
    const key = `${s.lembaga}::${kls}::${guruName}`
    if (key !== lastKey) {
      lastKey = key
      const cols = hasPTPT.value ? 8 : 7
      bodyRows += `<tr style="background:#e2e8f0;"><td colspan="${cols}" style="padding:6px;font-weight:900;text-transform:uppercase;">GURU: ${guruName} | ${s.lembaga} | KELAS: ${kls}</td></tr>`
    }
    bodyRows += `<tr><td>${no++}</td><td style="text-align:left;">${s.nama}</td><td>${s.jk || '-'}</td><td>${s.lembaga} - ${kls}</td>${hasPTPT.value ? `<td>${jz}</td>` : ''}<td>${aw}</td><td>${ak}</td><td>${tot}</td></tr>`
  }
  const head = `<tr><th>No</th><th>Nama Santri</th><th>L/P</th><th>Lembaga/Kelas</th>${hasPTPT.value ? '<th>Juz</th>' : ''}<th>Awal</th><th>Akhir</th><th>Total</th></tr>`
  const html = `<html><head><title>${judul}</title><style>
    body{font-family:Arial,sans-serif;padding:20px;color:#1e293b;}
    .header{text-align:center;margin-bottom:14px;}
    .header h2{margin:4px 0;font-size:14px;text-decoration:underline;}
    .header p{margin:2px 0;font-size:11px;}
    table{width:100%;border-collapse:collapse;font-size:11px;}
    th,td{border:1px solid #000;padding:6px;text-align:center;}
    th{background:#e5e7eb;font-weight:bold;}
  </style></head><body>
  <div class="header">
    ${
      muassisDataUrlSync()
        ? `<img src="${muassisDataUrlSync()}" alt="" style="height:30px;display:block;margin:0 auto 2px;" />`
        : `<p style="font-weight:bold;">${set.kopLine1 || set.txtAppName || ''}</p>`
    }
    <h1 style="margin:2px 0;font-size:16px;font-weight:900;">${set.kopLine2 || ''}</h1>
    <p>${set.kopLine3 || ''}</p>
    <p>${set.kopLine4 || ''}</p>
    <h2>${judul}</h2>
    <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
  </div>
  <table><thead>${head}</thead><tbody>${bodyRows}</tbody></table>
  </body></html>`
  const w = window.open('', '_blank', 'width=900,height=700')
  if (!w) {
    toast.error('Popup diblokir. Izinkan popup untuk print.')
    return
  }
  w.document.write(html)
  w.document.close()
  setTimeout(() => {
    try {
      w.print()
    } catch (_) {}
  }, 350)
}

// SUBSCRIBE
// Auto-init untuk guru mode: ngaji-only langsung input, sekolah-only ke Diniyah
let _guruInited = false
function initGuruFlow() {
  if (_guruInited || !isGuruMode.value || !santriRaw.value.length) return
  _guruInited = true
  const hasNgaji = santriRaw.value.some((s) => s.aktif !== false && ownNgaji(s))
  const lmbList = santriQiraati.value // ngaji list (sudah filter qiraati lembaga)
  // hasSekolah: santri yg guru ampu di sekolah
  const gn = _lowS(auth.sesiAktif?.guru || auth.sesiAktif?.nama)
  const hasSekolah = santriRaw.value.some((s) => {
    if (s.aktif === false) return false
    const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah.map(_lowS) : []
    return arr.includes(gn)
  })
  if (hasNgaji && !hasSekolah) {
    // Guru qiraati murni → langsung input ngaji.
    filterLembaga.value = ''
    viewStep.value = 'input'
  }
  // v.100b: guru sekolah-saja & dual → tetap LANDING supaya bisa pilih Rekap Qiraati
  //   (lihat prestasi qiraati santri kelas sekolahnya, read-only) ATAU Rekap Diniyah.
}

onMounted(() => {
  // v.21.84.0527: reset ke landing setiap fresh mount supaya gak stuck di step=input
  viewStep.value = 'landing'
  filterLembaga.value = ''
  _guruInited = false
  unsubSantri = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
    loading.value = false
    initGuruFlow()
  })
  unsubGuru = subscribeColl('guru', (docs) => {
    guruRaw.value = docs
  })
  // v.100d: riwayat prestasi bulanan
  unsubRiwayatP = subscribeColl('riwayat_prestasi', (docs) => {
    riwayatPrestasiRaw.value = docs
  })
})
onUnmounted(() => {
  if (unsubSantri) {
    try {
      unsubSantri()
    } catch (e) {}
  }
  if (unsubGuru) {
    try {
      unsubGuru()
    } catch (e) {}
  }
  if (unsubRiwayatP) {
    try {
      unsubRiwayatP()
    } catch (e) {}
  }
})

// reset filterKelas kalau lembaga ganti
watch(filterLembaga, () => {
  filterKelas.value = ''
})
</script>
