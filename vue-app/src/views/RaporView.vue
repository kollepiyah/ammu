<template>
  <!-- v.20.29.0526: Rapor Semester — 4-step flow match legacy: picker → lembaga → santri → detail -->
  <div class="p-4 md:p-6 max-w-5xl mx-auto">
    <!-- Step 1: Category Picker -->
    <div v-if="step === 'picker'" class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm">
      <div class="flex items-start gap-3 mb-4">
        <i class="fas fa-graduation-cap text-emerald-700 dark:text-emerald-300 text-2xl"></i>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">Rapor Semester</h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih lembaga untuk mengelola data rapor santri.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4">
        <select v-model="tahunAjaran" class="px-4 py-3 text-sm font-bold border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
          <option v-for="t in tahunOpts" :key="t" :value="t">{{ t }}</option>
        </select>
        <select v-model="semester" class="px-4 py-3 text-sm font-bold border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
          <option value="Ganjil">Ganjil</option>
          <option value="Genap">Genap</option>
        </select>
      </div>

      <!-- v.20.73.0526: pakai UiActionCard untuk konsistensi style -->
      <div class="grid grid-cols-2 gap-2 md:gap-3">
        <UiActionCard
          icon="fas fa-mosque"
          title="Rapor Qiraati"
          subtitle="TPQ Sore · Pra PTPT · PTPT · PPPH"
          gradient="from-emerald-500 to-emerald-700"
          @click="pilihKategori('qiraati')"
        />
        <UiActionCard
          icon="fas fa-book-open"
          title="Rapor Diniyah"
          subtitle="Mata pelajaran agama"
          gradient="from-blue-500 to-indigo-700"
          @click="pilihKategori('diniyah')"
        />
      </div>
      <!-- Old buttons kept hidden untuk reference -->
      <div v-if="false" class="grid grid-cols-2 gap-2 md:gap-3">
        <button @click="pilihKategori('qiraati')" class="bg-emerald-500">
          <h3>Rapor Qiraati</h3>
          <p>TPQ Sore · Pra PTPT · PTPT · PPPH</p>
        </button>
        <button @click="pilihKategori('diniyah')" class="bg-blue-500">
          <h3>Rapor Diniyah</h3>
          <p>Mata pelajaran agama
          </p>
        </button>
      </div>
    </div>

    <!-- Step 2: Sub-lembaga picker -->
    <div v-else-if="step === 'lembaga'" class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-emerald-100 dark:border-slate-700 shadow-sm">
      <div class="flex items-center gap-3 mb-4">
        <button @click="step = 'picker'" class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition cursor-pointer" title="Kembali">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white leading-tight">
            <i :class="['fas mr-2', kategori === 'qiraati' ? 'fa-mosque text-emerald-700' : 'fa-book-open text-blue-700']"></i>
            Rapor {{ kategori === 'qiraati' ? 'Qiraati' : 'Diniyah' }}
          </h2>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pilih {{ kategori === 'qiraati' ? 'lembaga Qiraati' : 'sekolah formal' }}.
          </p>
        </div>
      </div>

      <div v-if="kategori === 'qiraati'" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <button v-for="sub in SUB_QIRAATI" :key="sub.id" @click="pilihSubLembaga(sub.id)" :class="['group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1', sub.gradient]">
          <i :class="['fas', sub.icon, 'text-base md:text-lg drop-shadow']"></i>
          <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">{{ sub.label }}</h3>
          <p class="text-[10px] text-white/90 font-medium leading-snug">{{ sub.subtitle }}</p>
        </button>
      </div>

      <div v-else-if="kategori === 'diniyah'">
        <div v-if="SUB_DINIYAH.length === 0" class="text-center py-8 text-xs text-slate-400 italic">
          <i class="fas fa-school text-3xl text-slate-300 dark:text-slate-600 block mb-2"></i>
          Belum ada sekolah formal terdaftar. Tambah lembaga tipe "Formal" di Master Data &gt; Lembaga.
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          <button v-for="sub in SUB_DINIYAH" :key="sub.id" @click="pilihSubLembaga(sub.id)" :class="['group relative overflow-hidden bg-gradient-to-br rounded-xl p-3 md:p-4 text-left text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex flex-col gap-1', sub.gradient]">
            <i :class="['fas', sub.icon, 'text-base md:text-lg drop-shadow']"></i>
            <h3 class="text-sm md:text-base font-black leading-tight drop-shadow-sm">{{ sub.label }}</h3>
            <p class="text-[10px] text-white/90 font-medium leading-snug">{{ sub.subtitle }}</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Step 3: Santri picker (LIST CARDS, no dropdowns) v.20.29.0526 match legacy -->
    <div v-else-if="step === 'santri'" class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div class="flex items-center gap-2">
            <button @click="step = 'lembaga'" class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer" title="Kembali">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
              <i :class="['fas', kategori === 'qiraati' ? 'fa-mosque text-emerald-600' : 'fa-book-open text-blue-600', 'mr-1']"></i>
              {{ subLembaga }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <span class="text-[10px] text-slate-400 font-bold">{{ santriListSubLembaga.length }} santri</span>
        </div>

        <!-- Search + filter kelas (optional, untuk navigasi cepat) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input v-model="santriSearch" type="search" placeholder="Cari nama santri..." class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
          <select v-model="filterKelas" class="text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
            <option value="">Semua Kelas</option>
            <option v-for="k in kelasOpts" :key="k" :value="k">Kelas {{ k }}</option>
          </select>
        </div>
      </div>

      <!-- Santri list cards -->
      <div v-if="santriListSubLembaga.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
        <i class="fas fa-users-slash text-slate-300 text-4xl block mb-2"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Belum ada santri di {{ subLembaga }}</p>
        <p class="text-xs text-slate-500 mt-1">Tambah santri lewat Master Data &gt; Data Santri dengan lembaga "{{ subLembaga }}".</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        <button v-for="s in santriListSubLembaga" :key="s.id" @click="pilihSantri(s)" class="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-200 dark:border-slate-700 rounded-xl p-3 md:p-4 text-left transition cursor-pointer flex items-center gap-3">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
              {{ s.nama }}
              <!-- v.21.10.0526: badge multi-rapor (santri yg punya Qiraati + Diniyah) -->
              <span v-if="getRapors(s).length > 1" class="ml-1 text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold align-middle" :title="`Santri ini punya ${getRapors(s).length} rapor`">
                <i class="fas fa-layer-group mr-0.5"></i>{{ getRapors(s).length }} rapor
              </span>
            </p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              <span class="font-bold">{{ s.lembaga || '-' }}</span> · Kelas {{ s.kelas || '-' }}
              <span v-if="s.nis" class="ml-1">· NIS {{ s.nis }}</span>
              <span v-if="s.is_mukim" class="ml-1 text-purple-600 font-bold">· MUKIM</span>
            </p>
          </div>
          <i class="fas fa-chevron-right text-slate-400 text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Step 4: Detail (rapor preview) -->
    <div v-else-if="step === 'detail'" class="space-y-4">
      <div class="no-print bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2">
            <button @click="kembaliKeSantri" class="text-xs font-bold px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition cursor-pointer" title="Kembali">
              <i class="fas fa-arrow-left"></i>
            </button>
            <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
              <i :class="['fas', kategori === 'qiraati' ? 'fa-mosque text-emerald-600' : 'fa-book-open text-blue-600', 'mr-1']"></i>
              {{ selectedSantri?.nama }} · {{ subLembaga }} · {{ tahunAjaran }} {{ semester }}
            </h2>
          </div>
          <button v-if="selectedSantri && !isSantriOnly" @click="cetak" class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition cursor-pointer">
            <i class="fas fa-print mr-1"></i>Cetak / Simpan PDF
          </button>
        </div>
        <!-- v.21.10.0526: Quick switch rapor lain (untuk santri Mukim/multi-rapor) -->
        <div v-if="selectedSantri && otherRapors.length > 0" class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 flex-wrap">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <i class="fas fa-layer-group mr-1 text-amber-600"></i>Rapor lain:
          </span>
          <button v-for="r in otherRapors" :key="r.lembaga" @click="switchRapor(r)" class="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition cursor-pointer">
            <i :class="['fas', r.jenis === 'qiraati' ? 'fa-mosque' : 'fa-book-open', 'mr-1']"></i>{{ r.lembaga }} ({{ r.jenis === 'qiraati' ? 'Qiraati' : 'Diniyah' }})
          </button>
        </div>
      </div>

      <!-- Rapor preview -->
      <div v-if="selectedSantri" id="rapor-print-area" class="bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-sm p-8 print:shadow-none print:border-0 print:rounded-none print:p-6 relative overflow-hidden" style="font-family: 'Times New Roman', Times, serif;">
        <div v-if="bgRaporUrl" aria-hidden="true" class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style="z-index:0;">
          <img :src="bgRaporUrl" alt="" style="width:50%;height:auto;opacity:0.1;object-fit:contain;-webkit-print-color-adjust:exact;print-color-adjust:exact;" />
        </div>
        <div class="relative" style="z-index:1;">
        <table class="w-full border-b-2 border-black pb-1.5 mb-2">
          <tr>
            <td class="w-[95px] text-center align-middle">
              <img v-if="kopLogoKiri" :src="kopLogoKiri" class="inline-block w-[85px] h-[85px] object-contain" alt="Logo kiri" />
            </td>
            <td class="text-center align-middle px-2 py-0.5">
              <div v-if="kop.line1" class="text-[14px] font-normal uppercase leading-tight">{{ kop.line1 }}</div>
              <div v-if="kop.line2" class="text-[22px] font-bold uppercase leading-tight">{{ kop.line2 }}</div>
              <div v-if="kop.line3" class="text-[12px] font-normal leading-tight text-slate-700">{{ titleCase(kop.line3) }}</div>
              <div v-if="kop.line4" class="text-[12px] font-normal leading-tight text-slate-700">{{ titleCase(kop.line4) }}</div>
            </td>
            <td class="w-[95px] text-center align-middle">
              <img v-if="kopLogoKanan" :src="kopLogoKanan" class="inline-block w-[85px] h-[85px] object-contain" alt="Logo kanan" />
            </td>
          </tr>
        </table>

        <h2 class="text-center text-[13px] font-bold underline my-2.5 leading-snug">
          {{ kategori === 'diniyah' ? 'LAPORAN HASIL BELAJAR DINIYAH PESERTA DIDIK' : 'SURAT KETERANGAN HASIL PENDIDIKAN' }}
          <template v-if="kategori === 'diniyah'"><br />TAHUN PELAJARAN {{ tahunAjaran }}</template>
        </h2>

        <table class="w-full text-[11px] mb-2">
          <tbody v-if="kategori === 'diniyah'">
            <tr>
              <td class="w-[120px] py-0.5">No. Induk</td><td class="w-[10px]">:</td><td class="py-0.5">{{ selectedSantri.nis || '-' }}</td>
              <td class="w-[120px]">Kelas</td><td class="w-[10px]">:</td><td>{{ selectedSantri.kelas_sekolah || '-' }}</td>
            </tr>
            <tr>
              <td class="py-0.5">Nama</td><td>:</td><td class="py-0.5">{{ selectedSantri.nama }}</td>
              <td>Semester</td><td>:</td><td>{{ semester }}</td>
            </tr>
            <tr>
              <td class="py-0.5">Lembaga</td><td>:</td><td class="py-0.5" colspan="4">{{ selectedSantri.lembaga_sekolah || selectedSantri.lembaga || '-' }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="w-[120px] py-0.5">Nama Santri</td><td class="w-[10px]">:</td><td class="py-0.5">{{ selectedSantri.nama }}</td>
              <td class="w-[120px]">Tahun Pelajaran</td><td class="w-[10px]">:</td><td>{{ tahunAjaran }}</td>
            </tr>
            <tr>
              <td class="py-0.5">Lembaga</td><td>:</td><td class="py-0.5">{{ selectedSantri.lembaga || '-' }}</td>
              <td>Semester</td><td>:</td><td>{{ semester }}</td>
            </tr>
            <tr>
              <!-- v.20.34.0526: Kelas auto = kelas_sekolah (kyai: legacy udah bener) -->
              <td class="py-0.5">Kelas</td><td>:</td><td class="py-0.5" colspan="4">{{ selectedSantri.kelas_sekolah || selectedSantri.kelas || '-' }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="schema.perLevel" class="mt-3">
          <table class="w-full border-collapse text-[9px] leading-snug">
            <thead class="bg-slate-200">
              <tr>
                <th class="border border-black px-1 py-1.5 w-[30px] align-middle">Kelas</th>
                <th class="border border-black px-1 py-1.5 w-[55px] align-middle">Level Baca</th>
                <th class="border border-black px-1 py-1.5 text-left align-middle">Target Khotam</th>
                <th class="border border-black px-1 py-1.5 w-[65px] align-middle">Tgl Khotam</th>
                <th v-for="f in praFields" :key="f.id" class="border border-black px-1 py-1.5 align-middle">{{ f.label }}</th>
                <th class="border border-black px-1 py-1.5 w-[55px] align-middle">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(lvl, lvlIdx) in (schema.levels || [])" :key="lvl.id">
                <tr v-for="(kh, kIdx) in (lvl.khotamList || [])" :key="kh.id">
                  <td v-if="kIdx === 0" :rowspan="(lvl.khotamList || []).length" class="border border-black px-1 py-1.5 text-center font-bold align-middle">{{ lvlIdx + 1 }}</td>
                  <td v-if="kIdx === 0" :rowspan="(lvl.khotamList || []).length" class="border border-black px-1 py-1.5 text-center align-middle">{{ lvl.levelBaca || lvl.label || '' }}</td>
                  <td class="border border-black px-1 py-1.5 align-middle">{{ kh.labelKhotam || kh.id }} ({{ kh.multiplier || 2 }}x)</td>
                  <td class="border border-black px-1 py-1.5 text-center align-middle">{{ fmtDateShort(getRaporData(`pra__${lvl.id}__${kh.id}__tgl_khotam`)) }}</td>
                  <td v-for="f in praFields" :key="f.id" class="border border-black px-1 py-1.5 text-center align-middle">{{ getRaporData(`pra__${lvl.id}__${kh.id}__${f.id}`) || '' }}</td>
                  <td class="border border-black px-1 py-1.5 text-center font-bold align-middle">{{ fmtSum(sumKhotam(lvl.id, kh.id)) }}</td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr class="bg-slate-100">
                <td colspan="3" class="border border-black px-1 py-1 font-bold text-left">Jumlah Khotam</td>
                <td :colspan="praFields.length + 2" class="border border-black px-1 py-1 text-center font-bold">{{ countKhotamFilled }} Khotam</td>
              </tr>
              <tr class="bg-amber-50">
                <td :colspan="praFields.length + 4" class="border border-black px-1 py-1 font-bold text-left">Total Jumlah</td>
                <td class="border border-black px-1 py-1 text-center font-bold">{{ fmtSum(totalSumPraPtpt) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div v-else-if="schema.perKelas" class="mt-3">
          <div v-if="!diniyahJenjang" class="text-[11px] italic text-slate-500 border border-dashed border-slate-300 rounded p-3 text-center">
            Jenjang "{{ selectedSantri.kelas_sekolah || '-' }}" belum dikonfigurasi schema-nya.
          </div>
          <table v-else class="w-full border-collapse text-[11px]">
            <thead class="bg-blue-100">
              <tr>
                <th class="border border-black px-2 py-1.5 w-[40px]">NO</th>
                <th class="border border-black px-2 py-1.5 text-left">MATA PELAJARAN</th>
                <th class="border border-black px-2 py-1.5 w-[50px]">KKM</th>
                <th class="border border-black px-2 py-1.5">NILAI RATA-RATA SUMATIF</th>
                <th class="border border-black px-2 py-1.5">NILAI SUMATIF AKHIR SEMESTER</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, i) in (diniyahJenjang.mapel || [])" :key="m.id || i">
                <td class="border border-black px-2 py-1.5 text-center font-bold">{{ i + 1 }}</td>
                <td class="border border-black px-2 py-1.5">{{ m.nama }}</td>
                <td class="border border-black px-2 py-1.5 text-center">{{ m.kkm || 80 }}</td>
                <td class="border border-black px-2 py-1.5 text-center">{{ getRaporData(`dn__${selectedSantri.kelas_sekolah}__${m.id || slugMapel(m.nama)}__sumatif`) || '-' }}</td>
                <td class="border border-black px-2 py-1.5 text-center">{{ getRaporData(`dn__${selectedSantri.kelas_sekolah}__${m.id || slugMapel(m.nama)}__akhir`) || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- v.20.51.0526: Flat table layout (PTPT kelasJuz) — filter by santri.kelas, responsive overflow -->
        <div v-else-if="schema.tableLayout === 'kelasJuz' && (schema.rows || []).length" class="overflow-x-auto">
          <div class="text-[11px] font-bold text-slate-600 mb-1 px-1">
            <i class="fas fa-info-circle text-blue-500 mr-1"></i>
            <span class="text-emerald-700">KUMULATIF</span> — {{ filteredFlatRows.length }} baris (Kelas 1 s/d {{ selectedSantri?.kelas || '—' }})
          </div>
          <table class="border-collapse text-[10px] md:text-[11px] w-full min-w-[600px] table-fixed">
            <thead class="bg-slate-100">
              <tr>
                <th rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">Kelas</th>
                <th rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">Juz</th>
                <template v-for="(grp, gi) in flatGroupHeaders" :key="gi">
                  <th v-if="grp.group" :colspan="grp.span" class="border border-slate-500 px-1.5 py-1">{{ grp.group }}</th>
                  <th v-else rowspan="2" class="border border-slate-500 px-1.5 py-1 align-middle">{{ grp.label }}</th>
                </template>
              </tr>
              <tr>
                <th v-for="f in flatGroupedFields" :key="f.id" class="border border-slate-500 px-1.5 py-1">{{ f.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredFlatRows" :key="idx">
                <td
                  v-if="filteredFlatFirstRow(idx)"
                  :rowspan="filteredFlatRowspan(idx)"
                  class="border border-slate-500 px-1.5 py-1 text-center font-black bg-slate-50 align-middle"
                >{{ row.kelas }}</td>
                <td class="border border-slate-500 px-1.5 py-1 text-center font-bold">{{ row.juz }}</td>
                <td v-for="f in (schema.fields || [])" :key="f.id" class="border border-slate-500 px-1.5 py-1 text-center">{{ renderFlatValue(row, f) }}</td>
              </tr>
              <tr v-if="filteredFlatRows.length === 0">
                <td :colspan="2 + (schema.fields || []).length" class="border border-slate-300 px-2 py-3 text-center text-slate-400 italic text-[11px]">
                  Tidak ada baris untuk kelas santri ini. Cek field <code>kelas</code> di data santri.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="(schema.sections || []).length > 0">
          <div v-for="sec in (schema.sections || [])" :key="sec.id" class="mt-3">
            <div class="text-center font-bold bg-slate-100 border border-slate-500 px-2 py-1 text-[11px] uppercase">{{ sec.title }}</div>
            <table v-if="sec.rows && sec.rows.length > 0" class="w-full border-collapse text-[10px]">
              <thead class="bg-slate-100">
                <tr v-if="sectionHasGroups(sec)">
                  <th rowspan="2" class="border border-slate-500 px-1 py-1 w-[50px] align-middle">{{ sectionFirstColLabel(sec) }}</th>
                  <template v-for="(grp, gi) in sectionGroupHeaders(sec)" :key="gi">
                    <th v-if="grp.group" :colspan="grp.span" class="border border-slate-500 px-1 py-1">{{ grp.group }}</th>
                    <th v-else rowspan="2" class="border border-slate-500 px-1 py-1 align-middle">{{ grp.label }}</th>
                  </template>
                </tr>
                <tr v-if="sectionHasGroups(sec)">
                  <th v-for="f in sectionGroupedFields(sec)" :key="f.id" class="border border-slate-500 px-1 py-1">{{ f.label }}</th>
                </tr>
                <tr v-else>
                  <th class="border border-slate-500 px-1 py-1 w-[50px]">{{ sectionFirstColLabel(sec) }}</th>
                  <th v-for="f in sec.fields" :key="f.id" class="border border-slate-500 px-1 py-1">{{ f.label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in sec.rows" :key="row">
                  <td class="border border-slate-500 px-1 py-1 text-center font-bold">{{ row }}</td>
                  <td v-for="f in sec.fields" :key="f.id" class="border border-slate-500 px-1 py-1 text-center">{{ renderFieldValue(sec.id, row, f) }}</td>
                </tr>
              </tbody>
            </table>
            <table v-else class="w-full border-collapse text-[10px]">
              <thead class="bg-slate-100">
                <tr>
                  <th v-for="f in sec.fields" :key="f.id" class="border border-slate-500 px-1 py-1">{{ f.label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="f in sec.fields" :key="f.id" class="border border-slate-500 px-1 py-1 text-center">{{ renderFieldValue(sec.id, null, f) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="text-[11px] italic text-slate-500 my-3 border border-dashed border-slate-300 rounded p-3 text-center">
          Schema rapor untuk lembaga "{{ selectedSantri.lembaga }}" belum dikonfigurasi. Setup di Pengaturan Web &gt; Schema Rapor.
        </div>

        <table class="w-full border-collapse text-[11px] mt-3">
          <tr>
            <td class="border border-slate-500 px-1.5 py-1 bg-slate-100 font-bold text-center" style="width:60%;">Rata-rata Nilai</td>
            <td class="border border-slate-500 px-1.5 py-1 text-center font-bold">{{ Number(rataRataVal).toFixed(2) }}</td>
          </tr>
        </table>

        <table class="w-full text-[10px] mt-2">
          <tr>
            <td class="align-top w-1/2 pr-3">
              <p class="font-bold mb-1">ABSENSI :</p>
              <p class="my-0.5">1. Sakit : {{ absensiVal.sakit || 0 }}</p>
              <p class="my-0.5">2. Izin : {{ absensiVal.izin || 0 }}</p>
              <p class="my-0.5">3. Alpa : {{ absensiVal.alpa || 0 }}</p>
            </td>
            <td class="align-top w-1/2">
              <p class="font-bold mb-1">NILAI KEPRIBADIAN</p>
              <p class="my-0.5">Kelakuan : {{ kepribadianVal.kelakuan || 'Baik' }}</p>
              <p class="my-0.5">Kerajinan : {{ kepribadianVal.kerajinan || 'Baik' }}</p>
              <p class="my-0.5">Kebersihan : {{ kepribadianVal.kebersihan || 'Baik' }}</p>
            </td>
          </tr>
        </table>

        <div class="border border-slate-500 p-1.5 mt-2 text-[10px] min-h-[18mm]">
          <p class="font-bold mb-1">Catatan untuk santri / orang tua :</p>
          <p class="m-0 whitespace-pre-line">{{ catatanVal }}</p>
        </div>

        <div class="mt-8 text-[10px]">
          <table class="w-full text-center">
            <tr>
              <td class="w-1/3"></td>
              <td class="w-1/3"></td>
              <td class="w-1/3">Sidoarjo, {{ tanggalCetak }}</td>
            </tr>
            <tr>
              <td>Wali Santri</td>
              <td>Guru Kelas</td>
              <td>{{ kepalaJabatanLabel }}</td>
            </tr>
            <tr style="height: 60px; vertical-align: bottom;">
              <td></td>
              <td>
                <img v-if="ttdGuruImg" :src="ttdGuruImg" alt="TTD Guru" style="display:inline-block;max-width:120px;max-height:60px;object-fit:contain;" />
              </td>
              <td>
                <img v-if="ttdKepalaImg" :src="ttdKepalaImg" alt="TTD Kepala" style="display:inline-block;max-width:120px;max-height:60px;object-fit:contain;" />
              </td>
            </tr>
            <tr>
              <td><span class="underline font-bold">{{ selectedSantri?.wali || '..............................' }}</span></td>
              <td><span class="underline font-bold">{{ guruDisplay || '..........' }}</span></td>
              <td><span class="underline font-bold">{{ kepalaDisplay || '..............................' }}</span></td>
            </tr>
            <!-- v.20.75.0526: EKGQ di bawah nama guru/kepala (kyai req — match legacy) -->
            <tr class="text-[9px] text-slate-600">
              <td></td>
              <td>{{ guruEkgqDisplay ? ('EKGQ: ' + guruEkgqDisplay) : '' }}</td>
              <td>{{ kepalaEkgqDisplay ? ('EKGQ: ' + kepalaEkgqDisplay) : '' }}</td>
            </tr>
          </table>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSantri } from '@/composables/useSantri'
// v.21.10.0526: pakai getRapors helper untuk routing 2 rapor santri TPQ Sore
import { useLembaga } from '@/composables/useLembaga'
import { useGuru } from '@/composables/useGuru'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'
import { subscribeColl } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import UiActionCard from '@/components/ui/UiActionCard.vue'
// v.20.75.0526: cetak pakai window.print() native + @media print CSS (drop pdfmake)
const toast = useToast()

const route = useRoute()

const raporSemesterRaw = ref([])
let _unsubRapor = null
onMounted(() => {
  _unsubRapor = subscribeColl('rapor_semester', (docs) => { raporSemesterRaw.value = docs || [] })
})
onUnmounted(() => { if (_unsubRapor) try { _unsubRapor() } catch (e) {} })

// v.21.10.0526: getRapors untuk badge "2 rapor" santri Mukim/multi-lembaga
const { santriRaw, getRapors } = useSantri()
const { lembagaRaw } = useLembaga()
const { guruRaw } = useGuru()
const settings = useSettingsStore()
const auth = useAuthStore()
const isGuruOnly = computed(() => auth.sesiAktif?.role === 'guru' && auth.sesiAktif?.role_sistem !== 'super_admin' && auth.sesiAktif?.role_sistem !== 'admin' && auth.sesiAktif?.role_sistem !== 'admin_keuangan')
const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')

// v.20.29.0526: 4 steps — picker | lembaga | santri | detail
const step = ref('picker')
const kategori = ref('')
const subLembaga = ref('')

// v.21.25.0526: + TPQ Pagi (issue #47 — santri TPQ Pagi tidak terbaca sebelumnya)
const SUB_QIRAATI = [
  { id: 'TPQ Pagi', label: 'TPQ Pagi', subtitle: "Taman Pendidikan Al-Qur'an", icon: 'fa-mosque', gradient: 'from-emerald-500 to-emerald-700' },
  { id: 'TPQ Sore', label: 'TPQ Sore', subtitle: "Taman Pendidikan Al-Qur'an", icon: 'fa-mosque', gradient: 'from-teal-500 to-teal-700' },
  { id: 'Pra PTPT', label: 'Pra PTPT', subtitle: 'Pra Tahfizh', icon: 'fa-book-quran', gradient: 'from-blue-500 to-blue-700' },
  { id: 'PTPT', label: 'PTPT', subtitle: 'Pasca TPQ Program Tahfizh', icon: 'fa-book-quran', gradient: 'from-purple-500 to-purple-700' },
  { id: 'PPPH', label: 'PPPH', subtitle: 'Pasca PTPT Program Hadits', icon: 'fa-book-bookmark', gradient: 'from-amber-500 to-amber-700' }
]

const now = new Date()
const tahunAjaran = ref(`${now.getFullYear()}-${now.getFullYear() + 1}`)
const semester = ref(now.getMonth() < 6 ? 'Genap' : 'Ganjil')
const tahunOpts = computed(() => {
  const y = now.getFullYear()
  return [`${y - 1}-${y}`, `${y}-${y + 1}`, `${y + 1}-${y + 2}`]
})

const filterKelas = ref('')
const santriSearch = ref('')
const selectedId = ref(isSantriOnly.value ? String(auth.sesiAktif?.id || '') : '')

// v.20.29.0526: santri filtered by sub-lembaga (case-insensitive match)
const santriListSubLembaga = computed(() => {
  const sub = String(subLembaga.value || '').toLowerCase().trim()
  if (!sub) return []
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  if (kategori.value === 'qiraati') {
    // v.21.25.0526: TPQ shift-aware match (lembaga='TPQ' + shift='Pagi'|'Sore' post-migration)
    if (sub === 'tpq pagi' || sub === 'tpq sore') {
      const wantShift = sub === 'tpq pagi' ? 'pagi' : 'sore'
      list = list.filter((s) => {
        const l = String(s.lembaga || '').toLowerCase().trim()
        const sh = String(s.shift || '').toLowerCase().trim()
        return (l === 'tpq' && sh === wantShift) || l === sub
      })
    } else if (sub === 'pra ptpt') {
      list = list.filter((s) => {
        const l = String(s.lembaga || '').toLowerCase().trim()
        return l === 'pra ptpt' || l === 'pra-ptpt' || l === 'pra_ptpt'
      })
    } else if (sub === 'ppph') {
      list = list.filter((s) => {
        const l = String(s.lembaga || '').toLowerCase().trim()
        return l === 'ppph' || l === 'p3h'
      })
    } else {
      list = list.filter((s) => String(s.lembaga || '').toLowerCase().trim() === sub)
    }
  } else {
    // diniyah: match lembaga_sekolah (sub) atau lembaga (kalau lembaga_sekolah kosong)
    list = list.filter((s) => {
      const ls = String(s.lembaga_sekolah || '').toLowerCase().trim()
      const l = String(s.lembaga || '').toLowerCase().trim()
      return ls === sub || (!ls && l === sub)
    })
  }
  // v.20.62.0526: kalau login sebagai guru (non-admin), filter santri yg dia ajar saja
  if (isGuruOnly.value) {
    const meId = String(auth.sesiAktif?.id || '').toLowerCase()
    const meName = String(auth.sesiAktif?.nama || '').toLowerCase().trim()
    list = list.filter((s) => {
      const guruField = [s.guru, s.guru_pagi, s.guru_sore].flat().filter(Boolean).map((g) => String(g).toLowerCase().trim())
      const guruIds = [s.guru_id, s.guru_pagi_id, s.guru_sore_id].filter(Boolean).map((g) => String(g).toLowerCase())
      return guruField.includes(meName) || guruIds.includes(meId)
    })
  }
  if (filterKelas.value) list = list.filter((s) => String(s.kelas || '') === filterKelas.value)
  if (santriSearch.value.trim()) {
    const q = santriSearch.value.trim().toLowerCase()
    list = list.filter((s) => String(s.nama || '').toLowerCase().includes(q))
  }
  return list.sort((a, b) =>
    String(a.kelas || '').localeCompare(String(b.kelas || '')) ||
    String(a.nama || '').localeCompare(String(b.nama || ''))
  )
})

const kelasOpts = computed(() => {
  const sub = String(subLembaga.value || '').toLowerCase().trim()
  const set = new Set()
  santriRaw.value.forEach((s) => {
    const l = String(s.lembaga || '').toLowerCase().trim()
    const ls = String(s.lembaga_sekolah || '').toLowerCase().trim()
    if (kategori.value === 'qiraati' ? l === sub : (ls === sub || (!ls && l === sub))) {
      if (s.kelas) set.add(String(s.kelas))
    }
  })
  return [...set].sort()
})

const selectedSantri = computed(() => santriRaw.value.find((s) => String(s.id) === String(selectedId.value)) || null)

// v.21.10.0526: otherRapors — rapor lain yg available untuk santri yg sedang dipilih (selain yg sedang dibuka)
const otherRapors = computed(() => {
  if (!selectedSantri.value) return []
  const all = getRapors(selectedSantri.value) || []
  const currentLembaga = String(subLembaga.value || '').toLowerCase().trim()
  return all.filter((r) => String(r.lembaga || '').toLowerCase().trim() !== currentLembaga)
})

// Switch ke rapor lain (mis: dari Qiraati TPQ Sore → Diniyah SDI)
function switchRapor(r) {
  kategori.value = r.jenis
  subLembaga.value = r.lembaga
  // Stay di step detail dengan santri sama
  step.value = 'detail'
}

const kop = computed(() => {
  const set = settings.settings || {}
  let lembagaData = {}
  if (selectedSantri.value) {
    const lname = String(selectedSantri.value.lembaga || '').toLowerCase().trim()
    lembagaData = (lembagaRaw.value || []).find((l) => String(l.lembaga || '').toLowerCase().trim() === lname) || {}
  }
  return {
    line1: lembagaData.kop_line1 || set.kopLine1 || '',
    line2: lembagaData.kop_line2 || set.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM',
    line3: lembagaData.kop_line3 || set.kopLine3 || '',
    line4: lembagaData.kop_line4 || set.kopLine4 || '',
    pengasuh: set.namaPengasuh || ''
  }
})

const tanggalCetak = computed(() =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
)

const kopLogoKiri = computed(() => {
  const s = settings.settings || {}
  if (kategori.value === 'diniyah') return s.logoKop || s.logoUrl || '/logo.png'
  return s.logoQiraati || '/logo.png'
})
const kopLogoKanan = computed(() => {
  const s = selectedSantri.value
  if (!s) return ''
  const lname = String(kategori.value === 'diniyah' ? (s.lembaga_sekolah || '') : (s.lembaga || '')).toLowerCase().trim()
  const lembagaData = (lembagaRaw.value || []).find((l) => String(l.lembaga || '').toLowerCase().trim() === lname) || {}
  return lembagaData.kop_logo || settings.settings?.logoUrl || ''
})

function titleCase(str) {
  return String(str || '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

const bgRaporUrl = computed(() => {
  const s = settings.settings || {}
  if (kategori.value === 'diniyah') return s.bgRaporDiniyah || ''
  return s.bgRaporTPQ || ''
})

const ttdGuruImg = computed(() => {
  const guruNama = guruDisplay.value
  if (!guruNama || guruNama === '-') return ''
  const g = (guruRaw.value || []).find((x) => String(x.nama || '').toLowerCase() === String(guruNama).toLowerCase())
  return g?.tanda_tangan || g?.ttd_url || g?.ttd || ''
})
const ttdKepalaImg = computed(() => {
  const list = guruRaw.value || []
  const kepala = list.find((g) => {
    const rs = String(g.role_sistem || '').toLowerCase()
    const jb = String(g.jabatan || '').toLowerCase()
    return rs === 'super_admin' || rs === 'admin' || jb.includes('kepala') || jb.includes('pengasuh')
  })
  return kepala?.tanda_tangan || kepala?.ttd_url || kepala?.ttd || ''
})

const DEFAULT_PRA_PTPT_FIELDS = [
  { id: 'fashohah', label: 'Fashohah' },
  { id: 'tartil', label: 'Tartil' },
  { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
  { id: 'ghorib', label: 'Ghorib' },
  { id: 'tajwid', label: 'Tajwid' },
  { id: 'doa_harian', label: 'Doa Harian' },
  { id: 'adab', label: 'Adab' }
]

// v.20.29.0526: Factory default schemas per lembaga — kalau settings.raporSchemas belum diset
function factoryDefaultSchema(lname) {
  const k = String(lname || '').toLowerCase().trim()
  if (k === 'pra ptpt' || k === 'p3h') {
    // v.20.34.0526: Pra PTPT 5-level spec kyai: Lvl 1-3 (½/1/1½ Juz) khotam I-III ×2, Lvl 4 (2 Juz) I-III ×3, Lvl 5 (3 Juz) I-XI ×3
    const KH3_2 = [
      { id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 },
      { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 2 },
      { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 2 }
    ]
    const KH3_3 = [
      { id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 3 },
      { id: 'kh_II', labelKhotam: 'Khotam II', multiplier: 3 },
      { id: 'kh_III', labelKhotam: 'Khotam III', multiplier: 3 }
    ]
    const KH11_3 = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI'].map((rm) => ({ id: `kh_${rm}`, labelKhotam: `Khotam ${rm}`, multiplier: 3 }))
    return {
      perLevel: true,
      fieldsNilai: DEFAULT_PRA_PTPT_FIELDS,
      levels: [
        { id: 'lvl_1', label: 'Level 1', levelBaca: '½ Juz', targetKhotam: '½ Juz', khotamList: KH3_2 },
        { id: 'lvl_2', label: 'Level 2', levelBaca: '1 Juz', targetKhotam: '1 Juz', khotamList: KH3_2 },
        { id: 'lvl_3', label: 'Level 3', levelBaca: '1½ Juz', targetKhotam: '1½ Juz', khotamList: KH3_2 },
        { id: 'lvl_4', label: 'Level 4', levelBaca: '2 Juz', targetKhotam: '2 Juz', khotamList: KH3_3 },
        { id: 'lvl_5', label: 'Level 5', levelBaca: '3 Juz', targetKhotam: '3 Juz', khotamList: KH11_3 }
      ]
    }
  }
  if (k === 'ptpt' || k === 'ppph') {
    // v.20.50.0526: PTPT spec kyai v2 — Istimror+Kelancaran (Hafalan), Fashohah+Tajwid (Bacaan), 7 juz per kelas
    const PTPT_FIELDS = [
      { id: 'istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'kelancaran', label: 'Kelancaran', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'tajwid', label: 'Tajwid', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'adab', label: 'Adab', type: 'number' },
      { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
    ]
    // v.20.51.0526: 5 juz × 6 kelas = 30 juz total
    const rows = []
    for (let kls = 1; kls <= 6; kls++) {
      const start = (kls - 1) * 5 + 1
      for (let j = start; j <= start + 4; j++) {
        rows.push({ kelas: 'Kelas ' + kls, juz: 'Juz ' + j })
      }
    }
    return { tableLayout: 'kelasJuz', fields: PTPT_FIELDS, rows }
  }
  if (k === 'tpq' || k === 'tpq sore' || k === 'tpq pagi') {
    // v.20.43.0526: TPQ schema EXACT match legacy DEFAULT_SCHEMA_TPQ (kyai screenshot contoh rapor TPQ)
    return {
      sections: [
        {
          id: 'jilid', title: 'Jilid',
          rows: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'],
          fields: [
            { id: 'tgl_khotam', label: 'Tanggal Khotam Jilid', type: 'date' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            { id: 'surat_pendek', label: 'Surat-Surat Pendek', type: 'text', group: 'Materi Tambahan' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
          ]
        },
        {
          id: 'imtas', title: 'Kelas Persiapan IMTAS', rows: [],
          fields: [
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            { id: 'surat_pendek', label: 'Surat-Surat Pendek', type: 'text', group: 'Materi Tambahan' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        },
        {
          id: 'khotaman', title: 'Kelas Persiapan Khotaman', rows: [],
          fields: [
            { id: 'tgl_imtas', label: 'Tanggal IMTAS', type: 'date' },
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text', group: 'Materi Tambahan' },
            { id: 'surat_pendek', label: 'Surat-Surat Pendek', type: 'text', group: 'Materi Tambahan' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        }
      ]
    }
  }
  // Diniyah default
  return {
    perKelas: true,
    jenjang: [
      { kelas: 'I', mapel: [
        { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
        { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
        { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
      ] },
      { kelas: 'II', mapel: [
        { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
        { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
        { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 },
        { id: 'tarikh', nama: 'TARIKH', kkm: 80 }
      ] }
    ]
  }
}

const schema = computed(() => {
  if (!selectedSantri.value) return {}
  const lname = selectedSantri.value.lembaga || ''
  const allSchemas = settings.settings?.raporSchemas || {}
  // v.20.37.0526: case-insensitive lookup di settings.raporSchemas (kyai sudah set PTPT template)
  const lnameLow = String(lname).toLowerCase().trim()
  // TPQ Pagi/Sore share 'TPQ' key
  let fromSettings = null
  const keys = Object.keys(allSchemas)
  if (lnameLow === 'tpq pagi' || lnameLow === 'tpq sore') {
    const k = keys.find((kk) => String(kk).toLowerCase().trim() === 'tpq')
    if (k) fromSettings = allSchemas[k]
  }
  if (!fromSettings) {
    const k = keys.find((kk) => String(kk).toLowerCase().trim() === lnameLow)
    if (k) fromSettings = allSchemas[k]
  }
  // v.20.55.0526: Auto-migrate PTPT/PPPH legacy schema → pakai factory baru kalau Firestore masih simpan format lama
  if (fromSettings && Object.keys(fromSettings).length > 0) {
    const isPtptLike = lnameLow === 'ptpt' || lnameLow === 'ppph' || lnameLow === 'p3h'
    const looksLegacyJuzMapel = fromSettings.perKelas
      && Array.isArray(fromSettings.jenjang)
      && fromSettings.jenjang.some((j) => Array.isArray(j.mapel) && j.mapel.some((m) => /juz/i.test(String(m.id || m.nama || ''))))
    if (isPtptLike && looksLegacyJuzMapel) {
      // Skip stale Firestore data; pakai factory tableLayout='kelasJuz' baru
      return factoryDefaultSchema(lname)
    }
    return fromSettings
  }
  return factoryDefaultSchema(kategori.value === 'diniyah' ? 'diniyah' : lname)
})
const schemaSections = computed(() => Array.isArray(schema.value.sections) ? schema.value.sections : [])
const praFields = computed(() => Array.isArray(schema.value.fieldsNilai) && schema.value.fieldsNilai.length ? schema.value.fieldsNilai : DEFAULT_PRA_PTPT_FIELDS)
const diniyahJenjang = computed(() => {
  if (!schema.value.perKelas || !selectedSantri.value) return null
  const kelas = selectedSantri.value.kelas_sekolah || ''
  return (schema.value.jenjang || []).find((j) => j.kelas === kelas) || (schema.value.jenjang || [])[0] || null
})

// v.20.45.0526: Grouped header helpers untuk PTPT spec (Kualitas Hafalan/Bacaan)
function sectionHasGroups(sec) {
  return Array.isArray(sec?.fields) && sec.fields.some((f) => f && f.group)
}
function sectionGroupHeaders(sec) {
  // Returns array of { group: 'Kualitas Hafalan', span: 2 } or { label: 'Adab' } in order
  const out = []
  const fields = sec?.fields || []
  let i = 0
  while (i < fields.length) {
    const f = fields[i]
    if (f.group) {
      let span = 1
      let j = i + 1
      while (j < fields.length && fields[j].group === f.group) { span++; j++ }
      out.push({ group: f.group, span })
      i = j
    } else {
      out.push({ label: f.label })
      i++
    }
  }
  return out
}
// v.20.65.0526: Label kolom pertama per section (kyai: bukan 'Item' — pakai sec.id)
function sectionFirstColLabel(sec) {
  const sid = String(sec?.id || '').toLowerCase()
  if (sid === 'jilid') return 'Jilid'
  if (sid === 'imtas') return 'Periode'
  if (sid === 'khotaman') return 'Periode'
  if (sid.startsWith('kelas_')) return 'Kelas'
  return sec?.title || 'Item'
}

function sectionGroupedFields(sec) {
  // Only fields that belong to a group (the lower header row only contains these)
  return (sec?.fields || []).filter((f) => f && f.group)
}

const raporDoc = computed(() => {
  if (!selectedSantri.value) return null
  const periodKey = `${tahunAjaran.value}_${semester.value}`.replace(/[^a-zA-Z0-9_]/g, '_')
  const lname = kategori.value === 'diniyah' ? 'Diniyah' : (selectedSantri.value.lembaga || '')
  const raporId = `rapor_${selectedSantri.value.id}_${lname}_${periodKey}`
  return raporSemesterRaw.value.find((r) => r.id === raporId) || null
})
const absensiVal = computed(() => raporDoc.value?.absensi || { sakit: 0, izin: 0, alpa: 0 })
const kepribadianVal = computed(() => raporDoc.value?.kepribadian || { kelakuan: 'Baik', kerajinan: 'Baik', kebersihan: 'Baik' })
const catatanVal = computed(() => raporDoc.value?.catatan || '')
const rataRataVal = computed(() => {
  const stored = raporDoc.value?.rata_rata
  if (stored && Number(stored) > 0) return stored
  if (schema.value.perKelas && diniyahJenjang.value) {
    const data = raporDoc.value?.data_nilai || {}
    const kelas = selectedSantri.value?.kelas_sekolah || ''
    let sum = 0, cnt = 0
    ;(diniyahJenjang.value.mapel || []).forEach((m) => {
      const mid = m.id || slugMapel(m.nama)
      const v = Number(data[`dn__${kelas}__${mid}__akhir`])
      if (!isNaN(v) && v > 0) { sum += v; cnt++ }
    })
    return cnt > 0 ? sum / cnt : 0
  }
  if (schema.value.perLevel) return totalAvgPraPtpt.value || 0
  return 0
})

// v.20.30.0526: Integrasi kartu_kenaikan (tgl naik jilid/khotam) — match legacy
function getKartuKenaikanTgl(kelasId, itemId) {
  const s = selectedSantri.value
  if (!s?.kartu_kenaikan) return ''
  const lembaga = s.lembaga || ''
  const kkAll = s.kartu_kenaikan || {}
  let lembagaData = kkAll[lembaga]
  if (!lembagaData) {
    const lkey = Object.keys(kkAll).find((k) => String(k).toLowerCase().trim() === String(lembaga).toLowerCase().trim())
    lembagaData = lkey ? kkAll[lkey] : null
  }
  if (!lembagaData || typeof lembagaData !== 'object') return ''
  const kelasData = lembagaData[kelasId] || lembagaData[String(kelasId).toLowerCase()] || {}
  if (typeof kelasData !== 'object') return ''
  if (kelasData[itemId]) return kelasData[itemId]
  if (kelasData.ceremonial) return kelasData.ceremonial
  const entries = Array.isArray(kelasData.entries) ? kelasData.entries : []
  const match = entries.find((e) => e?.itemId === itemId && e?.tanggal)
  if (match) return match.tanggal
  const anyEntry = entries.find((e) => e?.tanggal)
  return anyEntry?.tanggal || ''
}

function getRaporData(key) {
  // v.20.30.0526: pra__lvl__kh__tgl_khotam → cek kartu_kenaikan dulu
  if (key && key.endsWith('__tgl_khotam')) {
    const parts = key.split('__')
    if (parts.length === 4) {
      const tgl = getKartuKenaikanTgl(parts[1], parts[2])
      if (tgl) return tgl
    }
  }
  return raporDoc.value?.data_nilai?.[key]
}
function fmtDateShort(v) {
  if (!v) return ''
  try {
    return new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return String(v) }
}
function fmtAvg(num) {
  if (num === null || num === undefined || isNaN(num)) return '-'
  return Number(num).toFixed(2).replace('.', ',')
}
function slugMapel(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}
const DEFAULT_PREDIKAT_RULES = [
  { min: 85, max: 100, label: 'A' },
  { min: 70, max: 84, label: 'B' },
  { min: 55, max: 69, label: 'C' },
  { min: 0, max: 54, label: 'D' }
]
function hitungPredikat(nilai) {
  const rules = (settings.settings?.predikatRules && settings.settings.predikatRules.length > 0)
    ? settings.settings.predikatRules
    : DEFAULT_PREDIKAT_RULES
  const n = Number(nilai)
  if (isNaN(n)) return '-'
  const r = rules.find((rr) => n >= Number(rr.min) && n <= Number(rr.max))
  return r ? r.label : '-'
}
function avgKhotam(levelId, khotamId) {
  const data = raporDoc.value?.data_nilai || {}
  let sum = 0, cnt = 0
  praFields.value.forEach((f) => {
    const v = Number(data[`pra__${levelId}__${khotamId}__${f.id}`])
    if (!isNaN(v) && v > 0) { sum += v; cnt++ }
  })
  return cnt > 0 ? sum / cnt : null
}

// v.20.35.0526: Jumlah (sum) per khotam — match kyai screenshot rapor (kolom Jumlah, bukan Rata-rata)
function sumKhotam(levelId, khotamId) {
  const data = raporDoc.value?.data_nilai || {}
  let sum = 0, has = false
  praFields.value.forEach((f) => {
    const v = Number(data[`pra__${levelId}__${khotamId}__${f.id}`])
    if (!isNaN(v) && v > 0) { sum += v; has = true }
  })
  return has ? sum : null
}
function fmtSum(num) {
  if (num === null || num === undefined || isNaN(num)) return '-'
  return String(Math.round(Number(num)))
}
const totalAvgPraPtpt = computed(() => {
  const allAvg = []
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      const a = avgKhotam(lvl.id, kh.id)
      if (a !== null) allAvg.push(a)
    })
  })
  if (allAvg.length === 0) return null
  return allAvg.reduce((a, b) => a + b, 0) / allAvg.length
})
// v.20.35.0526: total semua jumlah khotam (sum of all sums)
const totalSumPraPtpt = computed(() => {
  let total = 0, has = false
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      const s = sumKhotam(lvl.id, kh.id)
      if (s !== null) { total += s; has = true }
    })
  })
  return has ? total : null
})
const countKhotamFilled = computed(() => {
  let cnt = 0
  ;(schema.value.levels || []).forEach((lvl) => {
    ;(lvl.khotamList || []).forEach((kh) => {
      if (avgKhotam(lvl.id, kh.id) !== null) cnt++
    })
  })
  return cnt
})
function renderFieldValue(secId, row, field) {
  const data = raporDoc.value?.data_nilai || {}
  const k = row ? `${secId}__${row}__${field.id}` : `${secId}__${field.id}`
  let v = data[k]
  if (field.type === 'auto_predikat') {
    if (field.source === 'avg') {
      const numFields = (schemaSections.value.find((s) => s.id === secId)?.fields || []).filter((x) => x.type === 'number')
      let sum = 0, cnt = 0
      numFields.forEach((nf) => {
        const kn = row ? `${secId}__${row}__${nf.id}` : `${secId}__${nf.id}`
        const vv = Number(data[kn] || 0)
        if (!isNaN(vv) && vv > 0) { sum += vv; cnt++ }
      })
      return cnt > 0 ? hitungPredikat(sum / cnt) : '-'
    }
    if (field.source) {
      const ks = row ? `${secId}__${row}__${field.source}` : `${secId}__${field.source}`
      const vs = Number(data[ks] || 0)
      return vs > 0 ? hitungPredikat(vs) : '-'
    }
    return '-'
  }
  if (field.type === 'date') {
    // v.20.30.0526: section type=date juga read dari kartu_kenaikan (row=kelasId/jilid, field.id=itemId)
    if (!v && row) {
      const ckt = getKartuKenaikanTgl(row, field.id)
      if (ckt) v = ckt
    }
    if (v) {
      try { return new Date(v).toLocaleDateString('id-ID') } catch { return v }
    }
  }
  return v === undefined || v === null || v === '' ? '' : String(v)
}

// v.20.49.0526: Flat table layout (PTPT: Kelas rowspan + Juz + nilai)
function flatRowKey(row) {
  return `flat__${slugMapel(row.kelas)}__${slugMapel(row.juz)}`
}
function renderFlatValue(row, field) {
  if (!row || !field) return '-'
  const key = `${flatRowKey(row)}__${field.id}`
  const data = raporDoc.value?.data_nilai || {}
  let v = data[key]
  if (field.type === 'auto_predikat') {
    if (field.source === 'avg') {
      const numFields = (schema.value.fields || []).filter((x) => x.type === 'number')
      let sum = 0, cnt = 0
      numFields.forEach((nf) => {
        const vv = Number(data[`${flatRowKey(row)}__${nf.id}`] || 0)
        if (!isNaN(vv) && vv > 0) { sum += vv; cnt++ }
      })
      return cnt > 0 ? hitungPredikat(sum / cnt) : '-'
    }
    if (field.source) {
      const vs = Number(data[`${flatRowKey(row)}__${field.source}`] || 0)
      return vs > 0 ? hitungPredikat(vs) : '-'
    }
    return '-'
  }
  return v === undefined || v === null || v === '' ? '' : String(v)
}
const flatKelasGroupMap = computed(() => {
  // Map idx -> { isFirst, rowspan }
  if (schema.value.tableLayout !== 'kelasJuz') return {}
  const rows = schema.value.rows || []
  const map = {}
  let i = 0
  while (i < rows.length) {
    let j = i
    while (j < rows.length && rows[j].kelas === rows[i].kelas) j++
    map[i] = { isFirst: true, rowspan: j - i }
    for (let k = i + 1; k < j; k++) map[k] = { isFirst: false, rowspan: 0 }
    i = j
  }
  return map
})
function flatKelasFirstRow(idx) { return flatKelasGroupMap.value[idx]?.isFirst === true }
function flatKelasRowspan(idx) { return flatKelasGroupMap.value[idx]?.rowspan || 1 }
const flatGroupHeaders = computed(() => {
  // Same as sectionGroupHeaders but for flat schema.fields
  const fields = schema.value.fields || []
  const out = []
  let i = 0
  while (i < fields.length) {
    const f = fields[i]
    if (f.group) {
      let span = 1, j = i + 1
      while (j < fields.length && fields[j].group === f.group) { span++; j++ }
      out.push({ group: f.group, span })
      i = j
    } else {
      out.push({ label: f.label })
      i++
    }
  }
  return out
})
const flatGroupedFields = computed(() => (schema.value.fields || []).filter((f) => f && f.group))

// v.21.25.0526 KUMULATIF: tampilkan Kelas 1..N (semua kelas yang sudah dilewati ter-akumulasi)
// Kelas 1 santri → tabel kelas 1 saja. Kelas 2 → kelas 1+2. Kelas 3 → 1+2+3, dst.
// Sumber kelas santri: santri.kelas (primary) + fallback santri.kelas_sekolah.
function _extractKelasNum(str) {
  const m = String(str || '').match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}
const filteredFlatRows = computed(() => {
  if (schema.value.tableLayout !== 'kelasJuz') return []
  const allRows = schema.value.rows || []
  const s = selectedSantri.value
  if (!s) return allRows
  const santriKls = _extractKelasNum(s.kelas) || _extractKelasNum(s.kelas_sekolah)
  if (!santriKls) return allRows
  // KUMULATIF: include semua kelas 1..santriKls (bukan hanya === santriKls)
  return allRows.filter((r) => {
    const rk = _extractKelasNum(r.kelas)
    return rk > 0 && rk <= santriKls
  })
})
const filteredFlatGroupMap = computed(() => {
  const rows = filteredFlatRows.value || []
  const map = {}
  let i = 0
  while (i < rows.length) {
    let j = i
    while (j < rows.length && rows[j].kelas === rows[i].kelas) j++
    map[i] = { isFirst: true, rowspan: j - i }
    for (let k = i + 1; k < j; k++) map[k] = { isFirst: false, rowspan: 0 }
    i = j
  }
  return map
})
function filteredFlatFirstRow(idx) { return filteredFlatGroupMap.value[idx]?.isFirst === true }
function filteredFlatRowspan(idx) { return filteredFlatGroupMap.value[idx]?.rowspan || 1 }

// v.20.61.0526: Kepala lembaga auto-fill + jabatan label per-lembaga (kyai spec)
const kepalaDisplay = computed(() => {
  const s = selectedSantri.value
  if (!s) return settings.settings?.namaPengasuh || ''
  const lname = String(kategori.value === 'diniyah' ? (s.lembaga_sekolah || '') : (s.lembaga || '')).toLowerCase().trim()
  const lembagaData = (lembagaRaw.value || []).find((l) => String(l.lembaga || '').toLowerCase().trim() === lname) || {}
  return lembagaData.kepala_lembaga || lembagaData.kepala_sekolah || lembagaData.kepala || settings.settings?.namaPengasuh || ''
})
const kepalaJabatanLabel = computed(() => {
  // Tidak ada jabatan "Pengasuh" — auto detect sesuai lembaga (kyai)
  const s = selectedSantri.value
  if (!s) return 'Kepala'
  const lname = String(kategori.value === 'diniyah' ? (s.lembaga_sekolah || '') : (s.lembaga || '')).toLowerCase().trim()
  if (lname === 'tpq pagi' || lname === 'tpq sore' || lname === 'tpq' || lname === 'pra ptpt') return 'Kepala TPQ'
  if (lname === 'ptpt') return 'PJ PTPT'
  if (lname === 'ppph' || lname === 'p3h') return 'PJ PPPH'
  // Diniyah / formal
  return 'Kepala Sekolah'
})

const guruDisplay = computed(() => {
  const s = selectedSantri.value
  if (!s) return '-'
  const g = Array.isArray(s.guru) ? s.guru.join(', ') : s.guru
  return g || '-'
})

// v.20.75.0526: EKGQ display untuk TTD rapor (kyai req — di bawah nama guru/kepala)
function _guruRecordByNama(nama) {
  if (!nama) return null
  const target = String(nama).toLowerCase().trim()
  return (guruRaw.value || []).find((g) => {
    const gn = String(g.nama || '').toLowerCase().trim()
    return gn === target
  }) || null
}
const guruEkgqDisplay = computed(() => {
  const s = selectedSantri.value
  if (!s) return ''
  const guruNames = Array.isArray(s.guru) ? s.guru : (s.guru ? [s.guru] : [])
  for (const nama of guruNames) {
    const g = _guruRecordByNama(nama)
    const val = g?.nrg || g?.ekgq || g?.no_ekgq || g?.nip || ''
    if (val) return val
  }
  return ''
})
const kepalaEkgqDisplay = computed(() => {
  const kn = kepalaDisplay.value
  if (!kn) return ''
  const g = _guruRecordByNama(kn)
  return g?.nrg || g?.ekgq || g?.no_ekgq || g?.nip || ''
})

function pilihKategori(k) {
  kategori.value = k
  step.value = 'lembaga'
  filterKelas.value = ''
  santriSearch.value = ''
  selectedId.value = ''
}

const SUB_DINIYAH = computed(() => {
  // v.21.25.0526: SDI/PKBM only — TK exclude (tidak ada mapel diniyah). Kyai spec issue #48.
  const DINIYAH_LEMBAGA = ['sdi', 'pkbm']
  const arr = (lembagaRaw.value || []).filter((l) => {
    const nm = String(l.lembaga || l.nama || '').toLowerCase().trim()
    return DINIYAH_LEMBAGA.includes(nm)
  })
  // Fallback kalau master/lembaga belum punya entry SDI/PKBM
  if (arr.length === 0) {
    DINIYAH_LEMBAGA.forEach((nm) => arr.push({ lembaga: nm.toUpperCase(), id: nm.toUpperCase() }))
  }
  const palette = [
    'from-blue-500 to-blue-700',
    'from-indigo-500 to-indigo-700',
    'from-violet-500 to-violet-700',
    'from-purple-500 to-purple-700',
    'from-pink-500 to-fuchsia-700',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700'
  ]
  return arr.map((l, i) => ({
    id: l.lembaga || l.nama,
    label: l.lembaga || l.nama,
    subtitle: l.jenjang || l.deskripsi || 'Sekolah Formal',
    icon: 'fa-school',
    gradient: palette[i % palette.length]
  }))
})

function pilihSubLembaga(name) {
  subLembaga.value = name
  step.value = 'santri'
  selectedId.value = ''
  santriSearch.value = ''
  filterKelas.value = ''
}

function pilihSantri(santri) {
  selectedId.value = String(santri.id)
  step.value = 'detail'
}

function kembaliKeSantri() {
  step.value = 'santri'
  selectedId.value = ''
}

async function cetak() {
  if (!selectedSantri.value) return
  // v.20.75.0526: Drop pdfmake — pakai window.print() native + @media print CSS di App.vue
  // Print area = #rapor-print-area, sidebar/header/tombol di-hide via @media print
  try {
    // Tunggu sebentar supaya watermark/logo selesai render
    await new Promise((r) => setTimeout(r, 50))
    window.print()
    toast?.success?.('Dialog cetak dibuka — pilih "Save as PDF" untuk simpan PDF')
  } catch (e) {
    toast?.error?.('Gagal cetak: ' + (e.message || e))
  }
}


onMounted(() => {
  const qk = String(route.query.kategori || '').toLowerCase()
  if ((qk === 'qiraati' || qk === 'diniyah') && isSantriOnly.value) {
    kategori.value = qk
    const myLembaga = String(auth.sesiAktif?.lembaga || '').trim()
    if (qk === 'qiraati') {
      const match = SUB_QIRAATI.find((s) => s.id.toLowerCase() === myLembaga.toLowerCase())
      if (match) {
        subLembaga.value = match.id
        step.value = 'detail'
      } else {
        step.value = 'lembaga'
      }
    } else {
      subLembaga.value = 'Diniyah'
      step.value = 'detail'
    }
  }
  if (isGuruOnly.value && step.value === 'picker') {
    const guruLemb = String(auth.sesiAktif?.lembaga || '').trim()
    const guruSub = SUB_QIRAATI.find((s) => s.id.toLowerCase() === guruLemb.toLowerCase())
    if (guruSub) {
      kategori.value = 'qiraati'
      subLembaga.value = guruSub.id
      step.value = 'santri'
    } else if (guruLemb) {
      kategori.value = 'diniyah'
      subLembaga.value = guruLemb
      step.value = 'santri'
    }
  }
})
</script>
