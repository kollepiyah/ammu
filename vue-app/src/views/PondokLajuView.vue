<template>
  <div class="p-3 md:p-6 max-w-6xl mx-auto space-y-3">
    <!-- v.1.5.0 (Kyai 15–16 Nov 2026): menu Pondok Laju — jadwal piket Laju 1/2, capaian bacaan
         Tadarus Pagi → Laju 1 → Laju 2, bisyaroh piket per sesi, Admin Pondok Laju. -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
    >
      <div>
        <h1 class="text-base md:text-lg font-black text-[var(--text-primary)]">
          <i class="fas fa-book-quran text-teal-600 mr-1"></i>Pondok Laju
        </h1>
        <p class="text-[11px] text-[var(--text-secondary)]">
          Urutan sesi: <b>Tadarus Pagi</b> (guru kelas) → <b>Laju 1</b> → <b>Laju 2</b> (guru
          piket). Bacaannya bersambung; yang dicatat posisi akhir tiap sesi.
          {{ kelasList.length }} kelas · {{ jumlahSantri }} santri.
        </p>
      </div>
      <div class="flex flex-wrap gap-1 bg-[var(--bg-muted)] p-1 rounded-xl w-fit max-w-full">
        <button
          v-for="t in tabs"
          :key="t.id"
          :class="[
            'px-3 py-1.5 text-[11px] font-bold rounded-lg transition cursor-pointer',
            tab === t.id
              ? 'bg-[var(--bg-card)] shadow-sm text-teal-700'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          ]"
          @click="tab = t.id"
        >
          <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
        </button>
      </div>
    </div>

    <div
      v-if="!kelasList.length"
      class="bg-[var(--bg-card)] rounded-2xl p-8 border border-dashed border-[var(--border-default)] text-center text-sm text-[var(--text-secondary)]"
    >
      <i class="fas fa-inbox text-2xl block mb-2 text-[var(--text-tertiary)]"></i>
      Belum ada santri Pondok Laju. Centang "Pondok Laju" di form santri terlebih dahulu.
    </div>

    <!-- ============ JURNAL: satu kartu per sesi yang memang terjadwal ============ -->
    <template v-else-if="tab === 'capaian'">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm flex flex-wrap items-center gap-2"
      >
        <input
          v-model="cTanggal"
          type="date"
          aria-label="Tanggal jurnal"
          class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <p class="text-[11px] text-[var(--text-secondary)] grow min-w-[8rem]">
          {{ kartuJurnal.length }} kartu, mengikuti jadwal piket tanggal ini
          <!-- Kyai 24 Nov 2026 bertanya kenapa akunnya memuat kartu guru lain: memang begitu untuk
               admin/penyusun (menambal jurnal terlupa); akun guru hanya melihat kartunya sendiri. -->
          <span v-if="bisaSemuaKelas" class="block">
            Anda admin/penyusun: semua kartu piket tanggal ini tampil. Akun guru hanya melihat
            kartunya sendiri.
          </span>
        </p>
        <!-- Admin/PJ: menambal kelas lain. Guru biasa tak melihat pemilih apa pun. -->
        <template v-if="bisaSemuaKelas">
          <select
            v-model="tSesi"
            aria-label="Sesi kartu tambahan"
            class="px-2 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          >
            <option v-for="s in SESI_LAJU" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>
          <select
            v-model="tKelas"
            aria-label="Kelas kartu tambahan"
            class="px-2 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] max-w-[12rem]"
          >
            <option value="">— kelas lain —</option>
            <option v-for="k in kelasList" :key="k.key" :value="k.key">
              {{ k.guru || '— tanpa guru —' }} ({{ k.santri.length }})
            </option>
          </select>
          <button
            class="h-9 px-3 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--border-subtle)] text-xs font-bold cursor-pointer"
            @click="tambahKartu"
          >
            <i class="fas fa-plus mr-1"></i>Tambah kartu
          </button>
        </template>
      </div>

      <div
        v-if="!kartuJurnal.length"
        class="bg-[var(--bg-card)] rounded-2xl p-6 text-center text-sm text-[var(--text-secondary)] border border-[var(--border-subtle)]"
      >
        <i class="fas fa-calendar-xmark text-2xl block mb-2 text-[var(--text-tertiary)]"></i>
        Tidak ada jadwal piket pada tanggal ini.
        <span v-if="bisaSemuaKelas" class="block mt-1 text-[11px]">
          Pilih sesi &amp; kelas di atas lalu "Tambah kartu" untuk mengisikan jurnal kelas mana pun.
        </span>
        <span v-else class="block mt-1 text-[11px]">
          Kartu muncul sendiri pada tanggal Anda piket. Tadarus Pagi muncul kalau Anda guru kelas
          Pondok Laju.
        </span>
      </div>

      <JurnalKartu
        v-for="k in kartuJurnal"
        :key="k.key"
        :tanggal="cTanggal"
        :sesi="k.sesi"
        :kelas="k.kelas"
        :piket-nama="k.piketNama"
        :pencatat="pencatat"
      />
    </template>
    <!-- ===================== JADWAL ===================== -->
    <!-- Kyai 24 Nov 2026: tabel sebulan (tanggal × kelas × sesi) terlalu rumit. Kini SATU tanggal
         sekali tampil, satu baris per kelas; pita tanggal di atas menunjukkan mana yang sudah
         terisi. Rencana bergilir (kotak kuning) & templat Excel dihapus atas permintaan Kyai. -->
    <template v-else-if="tab === 'jadwal'">
      <!-- Kyai 24 Nov 2026: penyusunan & jadwal guru lain hanya untuk pengelola; guru biasa
           cukup kartu "Jadwal Saya" di bawah. -->
      <div
        v-if="bisaSusun"
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-3"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <input
            v-model="bulanModel"
            type="month"
            aria-label="Bulan jadwal"
            class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
          <p class="text-[11px] text-[var(--text-secondary)]">
            Tadarus Pagi = guru kelas masing-masing (tanpa jadwal).
          </p>
        </div>

        <!-- pita tanggal: titik hijau = semua terisi, kuning = sebagian, abu = kosong -->
        <div class="flex gap-1 overflow-x-auto pb-1">
          <button
            v-for="t in tanggalJadwal"
            :key="t"
            :title="fmtTgl(t)"
            :class="[
              'shrink-0 w-9 h-11 rounded-lg border flex flex-col items-center justify-center cursor-pointer',
              t === jTanggal
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-primary)]'
            ]"
            @click="jTanggal = t"
          >
            <span class="text-[9px] font-bold opacity-75">{{ fmtTgl(t).slice(0, 3) }}</span>
            <span class="text-[12px] font-black leading-none">{{ Number(t.slice(8)) }}</span>
            <span
              :class="[
                'w-1.5 h-1.5 rounded-full mt-0.5',
                warnaIsiTanggal(t),
                draftTanggal(t) ? 'ring-2 ring-amber-400' : ''
              ]"
            ></span>
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            class="w-9 h-9 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--border-subtle)] cursor-pointer"
            aria-label="Tanggal sebelumnya"
            @click="geserTanggal(-1)"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <p class="text-sm font-black text-[var(--text-primary)] min-w-[11rem] text-center">
            {{ fmtTglPanjang(jTanggal) }}
          </p>
          <button
            class="w-9 h-9 rounded-xl bg-[var(--bg-muted)] hover:bg-[var(--border-subtle)] cursor-pointer"
            aria-label="Tanggal berikutnya"
            @click="geserTanggal(1)"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
          <button
            v-if="bisaSusun && tanggalSebelum"
            class="ml-auto h-9 px-3 rounded-xl border border-[var(--border-default)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            @click="salinSebelum"
          >
            <i class="fas fa-copy mr-1"></i>Salin dari {{ fmtTgl(tanggalSebelum) }}
          </button>
        </div>

        <div v-if="jMemuat" class="text-center text-sm text-[var(--text-secondary)] py-6">
          <i class="fas fa-spinner fa-spin mr-1"></i>Memuat jadwal…
        </div>
        <ul v-else-if="jTanggal" class="divide-y divide-[var(--border-subtle)]">
          <li
            v-for="k in kelasList"
            :key="k.key"
            class="py-2 grid grid-cols-1 md:grid-cols-[minmax(10rem,1fr)_2fr] gap-2 items-center"
          >
            <p class="text-xs font-black text-[var(--text-primary)] truncate">
              Kelas {{ k.guru || '— tanpa guru —' }}
              <span class="font-normal text-[var(--text-secondary)]"
                >· {{ k.santri.length }} santri</span
              >
            </p>
            <div class="grid grid-cols-2 gap-2">
              <label v-for="s in SESI_PIKET" :key="s" class="block min-w-0">
                <span class="block text-[10px] font-black text-teal-700 mb-0.5">{{
                  labelSesi(s)
                }}</span>
                <select
                  v-if="bisaSusun"
                  :value="nilaiSel(jTanggal, s, k.key)"
                  :aria-label="`Piket ${labelSesi(s)} kelas ${k.guru} ${jTanggal}`"
                  :class="[
                    'w-full rounded-lg border p-1.5 text-xs bg-[var(--bg-card)] text-[var(--text-primary)]',
                    draftAda(jTanggal, s, k.key)
                      ? 'border-amber-400 ring-1 ring-amber-300'
                      : 'border-[var(--border-default)]'
                  ]"
                  @change="ubahSel(jTanggal, s, k.key, $event.target.value)"
                >
                  <option value="">— kosong —</option>
                  <optgroup :label="pilihanGuru.lain.length ? 'Guru piket' : 'Guru'">
                    <option v-for="g in pilihanGuru.piket" :key="g.id" :value="String(g.id)">
                      {{ g.nama }}
                    </option>
                  </optgroup>
                  <optgroup v-if="pilihanGuru.lain.length" label="Guru lain">
                    <option v-for="g in pilihanGuru.lain" :key="g.id" :value="String(g.id)">
                      {{ g.nama }}
                    </option>
                  </optgroup>
                </select>
                <span
                  v-else
                  :class="[
                    'block truncate text-xs',
                    nilaiSel(jTanggal, s, k.key) === myId
                      ? 'text-teal-700 font-black'
                      : 'text-[var(--text-primary)]'
                  ]"
                  >{{ namaGuru(nilaiSel(jTanggal, s, k.key)) || '—' }}</span
                >
              </label>
            </div>
          </li>
        </ul>

        <p v-if="bentrok.length" class="text-[11px] font-bold text-rose-600 dark:text-rose-400">
          <i class="fas fa-triangle-exclamation mr-1"></i>{{ bentrok.length }} bentrok: guru
          memegang lebih dari satu kelas di sesi yang sama —
          {{
            bentrok
              .slice(0, 3)
              .map((b) => `${namaGuru(b.guru_id)} (${fmtTgl(b.tanggal)} ${labelSesi(b.sesi)})`)
              .join(', ')
          }}{{ bentrok.length > 3 ? '…' : '' }}
        </p>

        <div v-if="bisaSusun" class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-[11px] text-[var(--text-secondary)]">
            {{ jumlahDraft }} perubahan belum disimpan
            <button
              v-if="adaDraft"
              class="ml-1 underline font-bold cursor-pointer"
              @click="batalDraft"
            >
              batalkan
            </button>
          </p>
          <button
            :disabled="!adaDraft || jMenyimpan"
            class="h-10 px-4 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black cursor-pointer"
            @click="simpanJadwal"
          >
            <i :class="['fas', jMenyimpan ? 'fa-spinner fa-spin' : 'fa-save']"></i>
            {{ jMenyimpan ? `Menyimpan ${jProgres}…` : 'SIMPAN JADWAL' }}
          </button>
        </div>
      </div>

      <!-- Kabar WA lewat wa.me (Kyai 24 Nov 2026) — pengganti pengiriman otomatis Fonnte. -->
      <div
        v-if="bisaSusun"
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <button
          class="w-full flex items-center justify-between text-xs font-black text-[var(--text-primary)] uppercase cursor-pointer"
          @click="kabarBuka = !kabarBuka"
        >
          <span
            ><i class="fab fa-whatsapp text-emerald-600 mr-1"></i>Kabari guru lewat WA ({{
              kabarWa.length
            }}
            guru)</span
          >
          <i :class="['fas', kabarBuka ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <template v-if="kabarBuka">
          <p class="text-[11px] text-[var(--text-secondary)]">
            Berisi piket yang sudah tersimpan mulai hari ini sampai akhir bulan. Tombol membuka
            WhatsApp dengan pesan siap kirim.
          </p>
          <p v-if="!kabarWa.length" class="text-[11px] text-[var(--text-secondary)]">
            Belum ada piket tersimpan yang akan datang di bulan ini.
          </p>
          <ul class="divide-y divide-[var(--border-subtle)]">
            <li v-for="g in kabarWa" :key="g.id" class="py-1.5 flex items-center gap-2">
              <span class="grow min-w-0 truncate text-xs font-bold text-[var(--text-primary)]"
                >{{ g.nama }}
                <span class="font-normal text-[var(--text-secondary)]"
                  >· {{ g.jumlah }} piket</span
                ></span
              >
              <a
                v-if="g.url"
                :href="g.url"
                target="_blank"
                rel="noopener"
                class="h-8 px-3 inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black"
              >
                <i class="fab fa-whatsapp"></i>Kirim
              </a>
              <span v-else class="text-[11px] text-rose-600">tanpa nomor WA</span>
            </li>
          </ul>
        </template>
      </div>

      <!-- Daftar tetap Guru Piket Laju (Kyai 24 Nov 2026). Disimpan di master/lembaga yang hanya
           boleh ditulis admin (RLS), jadi penyuntingnya admin; penyusun lain cukup memakainya. -->
      <div
        v-if="bisaSusun"
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <button
          class="w-full flex items-center justify-between text-xs font-black text-[var(--text-primary)] uppercase cursor-pointer"
          @click="piketBuka = !piketBuka"
        >
          <span
            ><i class="fas fa-users text-teal-600 mr-1"></i>Daftar guru piket ({{
              daftarPiket.length ? `${daftarPiket.length} guru` : 'belum disetel'
            }})</span
          >
          <i :class="['fas', piketBuka ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </button>
        <template v-if="piketBuka">
          <p class="text-[11px] text-[var(--text-secondary)]">
            Guru yang dicentang tampil paling atas di pilihan jadwal; pengajar lain tetap bisa
            dipilih di bagian "Guru lain".
            <template v-if="!adminPenuh"> Yang mengubah daftar ini admin.</template>
          </p>
          <template v-if="adminPenuh">
            <input
              v-model="piketCari"
              type="text"
              placeholder="Cari guru…"
              class="w-full md:w-64 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
            />
            <div class="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
              <button
                v-for="g in guruPiketTampil"
                :key="g.id"
                :class="[
                  'px-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer',
                  piketDraft.includes(String(g.id))
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-secondary)]'
                ]"
                @click="togglePiket(g.id)"
              >
                {{ g.nama }}
              </button>
            </div>
            <button
              :disabled="piketMenyimpan"
              class="h-10 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black cursor-pointer"
              @click="simpanDaftarPiket"
            >
              Simpan daftar ({{ piketDraft.length }} guru)
            </button>
          </template>
          <p v-else class="text-[11px] text-[var(--text-primary)]">
            {{ daftarPiket.map(namaGuru).join(', ') || '—' }}
          </p>
        </template>
      </div>

      <div
        v-if="jadwalSaya.length || !bisaSusun"
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-xs font-black text-[var(--text-primary)] uppercase">
            <i class="fas fa-user-clock text-teal-600 mr-1"></i>Jadwal Saya
          </p>
          <input
            v-if="!bisaSusun"
            v-model="bulanModel"
            type="month"
            aria-label="Bulan jadwal"
            class="px-3 py-1.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
        </div>
        <p v-if="jMemuat" class="text-xs text-[var(--text-secondary)]">
          <i class="fas fa-spinner fa-spin mr-1"></i>Memuat jadwal…
        </p>
        <p v-else-if="!jadwalSaya.length" class="text-xs text-[var(--text-secondary)]">
          Tidak ada jadwal piket Anda di bulan ini.
        </p>
        <ul class="space-y-1">
          <li
            v-for="r in jadwalSaya"
            :key="r.id"
            :class="[
              'text-xs text-[var(--text-secondary)] flex justify-between gap-2',
              r.tanggal < hariIniJ ? 'opacity-50' : ''
            ]"
          >
            <span
              ><b class="text-[var(--text-primary)]">{{ fmtTgl(r.tanggal) }}</b> ·
              {{ labelSesi(r.sesi) }}</span
            >
            <span class="truncate">Kelas {{ r.kelas_guru || r.kelas_key }}</span>
          </li>
        </ul>
      </div>
    </template>

    <!-- ============ RIWAYAT & REKAP SEBULAN ============ -->
    <template v-else-if="tab === 'riwayat'">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-1 md:grid-cols-4 gap-2"
      >
        <select
          v-model="rKelas"
          aria-label="Kelas riwayat"
          class="md:col-span-2 px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        >
          <option value="">&mdash; Semua kelas &mdash;</option>
          <option v-for="k in kelasList" :key="k.key" :value="k.key">
            {{ k.guru || 'tanpa guru' }} &middot; Juz {{ k.juz || '-' }} ({{ k.santri.length }})
          </option>
        </select>
        <input
          v-model="rBulan"
          type="month"
          aria-label="Bulan riwayat"
          class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <button
          :disabled="rCetak || rMemuat"
          class="h-10 px-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black cursor-pointer"
          @click="eksporRekapPdf"
        >
          <i :class="['fas', rCetak ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
          {{ rCetak ? 'Menyiapkan...' : 'EKSPOR PDF' }}
        </button>
      </div>

      <div v-if="rMemuat" class="text-center text-sm text-[var(--text-secondary)] py-6">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat rekap...
      </div>

      <template v-else>
        <!-- Ringkasan sebulan: yang dicari sekali lihat. -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-2 md:grid-cols-5 gap-2 text-center"
        >
          <div
            v-for="r in ringkasanRekap"
            :key="r.label"
            class="rounded-xl bg-[var(--bg-muted)] p-2"
          >
            <p class="text-lg font-black text-[var(--text-primary)]">{{ r.nilai }}</p>
            <p class="text-[10px] font-bold uppercase text-[var(--text-secondary)]">
              {{ r.label }}
            </p>
          </div>
        </div>

        <!-- Rekap per kelas -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm overflow-x-auto"
        >
          <p class="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            <i class="fas fa-layer-group mr-1"></i>Rekap per kelas &middot; {{ rBulan }}
          </p>
          <table class="w-full text-xs">
            <thead>
              <tr class="text-[var(--text-secondary)] text-left">
                <th class="py-1 pr-2">Kelas (guru)</th>
                <th class="py-1 pr-2 text-center">Santri</th>
                <th class="py-1 pr-2 text-center">Sesi</th>
                <th class="py-1 pr-2 text-center">Hari</th>
                <th class="py-1 pr-2">Posisi awal</th>
                <th class="py-1 pr-2">Posisi akhir</th>
                <th class="py-1 text-center">Maju</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="k in rekapBulan.kelas"
                :key="k.key"
                class="border-t border-[var(--border-subtle)]"
                :class="!k.nSesi ? 'opacity-60' : ''"
              >
                <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">
                  {{ k.guru || k.key || '-' }}
                  <span class="font-normal text-[var(--text-secondary)]"
                    >&middot; Juz {{ k.juz || '-' }}</span
                  >
                </td>
                <td class="py-1.5 pr-2 text-center">{{ k.nSantriKelas }}</td>
                <td class="py-1.5 pr-2 text-center font-black">{{ k.nSesi }}</td>
                <td class="py-1.5 pr-2 text-center">{{ k.nHari }}</td>
                <td class="py-1.5 pr-2 text-[var(--text-secondary)]">{{ k.awal || '-' }}</td>
                <td class="py-1.5 pr-2 text-[var(--text-secondary)]">{{ k.akhir || '-' }}</td>
                <td class="py-1.5 text-center">
                  <span
                    v-if="k.majuHalaman"
                    :class="k.majuHalaman > 0 ? 'text-emerald-600' : 'text-amber-600'"
                  >
                    {{ k.majuHalaman > 0 ? '+' : '' }}{{ k.majuHalaman }} hal
                  </span>
                  <span v-else class="text-[var(--text-tertiary)]">-</span>
                </td>
              </tr>
              <tr v-if="!rekapBulan.kelas.length">
                <td colspan="7" class="py-6 text-center text-[var(--text-tertiary)] italic">
                  Belum ada kelas Pondok Laju.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Rincian per sesi, bisa dibuka untuk melihat santrinya -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm"
        >
          <p class="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)] mb-2">
            <i class="fas fa-list-check mr-1"></i>Rincian per sesi
          </p>
          <p
            v-if="!rekapBulan.sesi.length"
            class="text-xs text-[var(--text-tertiary)] italic text-center py-6"
          >
            Belum ada jurnal tercatat di bulan ini.
          </p>
          <ol v-else class="space-y-1">
            <li v-for="g in rekapBulan.sesi" :key="g.key">
              <button
                class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-teal-50 dark:hover:bg-teal-900/20 text-left text-xs cursor-pointer"
                :aria-expanded="rBuka === g.key"
                @click="rBuka = rBuka === g.key ? '' : g.key"
              >
                <span class="w-24 font-bold text-[var(--text-primary)] flex-shrink-0">{{
                  fmtTgl(g.tanggal)
                }}</span>
                <span class="w-20 text-teal-700 font-bold flex-shrink-0">{{ g.sesiLabel }}</span>
                <span class="w-32 truncate flex-shrink-0 text-[var(--text-secondary)]">{{
                  namaKelasPeta[g.kelasKey] || g.kelasKey
                }}</span>
                <span class="flex-1 min-w-0 truncate text-[var(--text-secondary)]">{{
                  g.posisi
                }}</span>
                <span class="flex-shrink-0 font-black text-[var(--text-primary)]">{{
                  g.nSantri
                }}</span>
              </button>
              <ul v-if="rBuka === g.key" class="mt-1 pl-8 space-y-0.5">
                <li
                  v-for="x in barisSesi(g)"
                  :key="x.id"
                  class="text-[11px] text-[var(--text-secondary)] flex justify-between gap-2"
                >
                  <span class="truncate"
                    ><b class="text-[var(--text-primary)]">{{ x.santri_nama || x.santri_id }}</b>
                    &middot; {{ teksPosisi(x)
                    }}<template v-if="x.catatan"> &middot; {{ x.catatan }}</template></span
                  >
                  <span class="flex-shrink-0">{{ x.guru_nama || '' }}</span>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </template>
    </template>

    <!-- ===================== BISYAROH ===================== -->
    <template v-else-if="tab === 'bisyaroh'">
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <div class="flex flex-wrap items-center gap-2">
          <input
            v-model="bPeriode"
            type="month"
            aria-label="Periode bisyaroh"
            class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
          />
          <span class="text-[11px] text-[var(--text-secondary)]"
            >Jendela
            {{ bRentang ? `${fmtTgl(bRentang.start)} – ${fmtTgl(bRentang.end)}` : '-' }} (sama
            dengan slip bisyaroh)</span
          >
        </div>
        <p
          v-if="!jenisLaju.length"
          class="text-[11px] font-bold text-amber-700 dark:text-amber-300"
        >
          <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada Jenis Bisyaroh dengan cara
          hitung "× sesi Pondok Laju" (tarif per sesi). Atur di Pengaturan Keuangan → Jenis
          Bisyaroh.
        </p>
        <p v-else class="text-[10px] text-[var(--text-secondary)]">
          Dibayar = sesi terjadwal yang gurunya hadir (scan) di shift sesinya —
          <template v-if="petaSesiAktif.laju1 || petaSesiAktif.laju2"
            >Laju 1: {{ labelShift(petaSesiAktif.laju1) || '—' }}, Laju 2:
            {{ labelShift(petaSesiAktif.laju2) || '—' }}</template
          ><template v-else
            ><b class="text-amber-700 dark:text-amber-300"
              >shift sesi belum dipilih di tab Pengaturan</b
            >
            (sementara dipakai kolom Shift jenis bisyaroh:
            {{ jenisLaju[0].scope.shift.map(labelShift).join(' / ') || '—' }})</template
          >. Otomatis masuk slip bisyaroh lewat jenis "{{ jenisLaju[0].label }}".
        </p>
        <div v-if="bMemuat" class="text-center text-sm text-[var(--text-secondary)] py-6">
          <i class="fas fa-spinner fa-spin mr-1"></i>Memuat jadwal & absensi…
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-xs">
            <thead class="bg-[var(--bg-muted)]">
              <tr class="text-[10px] uppercase text-[var(--text-secondary)]">
                <th class="p-2 text-left">Guru</th>
                <th class="p-2 text-center">Terjadwal</th>
                <th class="p-2 text-center">Dibayar</th>
                <th class="p-2 text-right">Tarif</th>
                <th class="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="r in rekapBisyaroh"
                :key="r.guru_id"
                class="border-t border-[var(--border-subtle)]"
              >
                <td class="p-2 font-bold text-[var(--text-primary)]">
                  {{ r.nama }}
                  <span
                    v-if="r.tanpaLaju1"
                    class="block text-[9px] font-bold text-amber-700 dark:text-amber-300"
                    title="Guru shift sekolah SD–PKBM: jam Laju 1 sudah terbayar sebagai jam pelajaran"
                    >Laju 1 tak dibayar (shift SD–PKBM)</span
                  >
                </td>
                <td class="p-2 text-center">{{ r.terjadwal }}</td>
                <td class="p-2 text-center font-black text-emerald-600">{{ r.dibayar }}</td>
                <td class="p-2 text-right">{{ fmtRp(r.tarif) }}</td>
                <td class="p-2 text-right font-black">{{ fmtRp(r.total) }}</td>
              </tr>
              <tr v-if="!rekapBisyaroh.length">
                <td colspan="5" class="p-4 text-center text-[var(--text-tertiary)] italic">
                  Belum ada jadwal piket di periode ini.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- ===================== PENGATURAN ===================== -->
    <template v-else-if="tab === 'pengaturan'">
      <!-- v.1.5.0 (Kyai 16 Nov 2026): shift absen tiap sesi — aktif otomatis per tanggal -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <p class="text-xs font-black text-[var(--text-primary)] uppercase">
          <i class="fas fa-fingerprint text-teal-600 mr-1"></i>Shift absen tiap sesi
        </p>
        <p class="text-[11px] text-[var(--text-secondary)]">
          Buat dulu shiftnya (dengan jam) di Pengaturan → Master Shift, lalu pilih di sini. Shift
          Laju 1/Laju 2 aktif otomatis untuk guru pada tanggal ia dijadwalkan; scan di jam itu
          tercatat dan muncul di rekap absen guru; bisyaroh piket dibayar per sesi yang dihadiri.
          Tadarus Pagi tetap ikut absen shift pagi guru kelas — tak ada yang berubah.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <label v-for="s in SESI_LAJU.filter((x) => x.piket)" :key="s.key" class="block">
            <span class="block text-[10px] font-black uppercase text-teal-700 mb-0.5">{{
              s.label
            }}</span>
            <select
              v-model="shiftSesiDraft[s.key]"
              :aria-label="`Shift ${s.label}`"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]"
            >
              <option value="">— belum dipilih —</option>
              <option v-for="sh in shiftGuruOptions" :key="sh.id" :value="sh.id">
                {{ sh.label }}
              </option>
            </select>
          </label>
        </div>
        <!-- v.1.5.0 (Kyai 16 Nov 2026): Laju 2 cukup satu scan — absen shift sore ikut Laju 2 -->
        <p
          class="text-[11px] rounded-lg border px-2.5 py-1.5"
          :class="
            laju2IkutSore.length
              ? 'border-emerald-300 text-emerald-800 dark:text-emerald-300'
              : 'border-amber-300 text-amber-800 dark:text-amber-300'
          "
        >
          <i class="fas fa-link mr-1"></i>
          <template v-if="laju2IkutSore.length"
            >Laju 2 otomatis hadir bila guru yang dijadwalkan hadir di shift
            <b>{{ laju2IkutSore.map(labelShift).join(', ') }}</b> — tak perlu scan dua
            kali.</template
          ><template v-else
            >Supaya absen shift sore otomatis ikut Laju 2 (cukup satu scan): buka Pengaturan →
            Master Shift → shift Laju 2 → isi "Hadir otomatis ikut shift" dengan shift-shift
            sore.</template
          >
        </p>
        <p v-if="shiftSesiGanda" class="text-[11px] font-bold text-rose-600">
          <i class="fas fa-triangle-exclamation mr-1"></i>Satu shift dipakai dua sesi — pilih shift
          yang berbeda untuk tiap sesi.
        </p>
        <!-- Kyai 17 Nov 2026: mencegah shift lembaga yang sudah ada dipakai sebagai shift Laju. -->
        <div
          v-if="shiftSesiSalahPilih.length"
          class="text-[11px] rounded-lg border border-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-2 text-amber-900 dark:text-amber-200 space-y-1"
        >
          <p v-for="w in shiftSesiSalahPilih" :key="w.sesi" class="font-bold">
            <i class="fas fa-triangle-exclamation mr-1"></i>
            <b>{{ w.sesi }}</b> memakai shift <b>{{ w.label }}</b> yang khusus lembaga
            {{ w.lembaga }} — itu shift mengajar, bukan shift Pondok Laju. Satu scan akan dihitung
            dua-duanya dan rekap absen tak bisa membedakan hadir mengajar atau hadir piket.
            <template v-if="w.parah">
              Lebih jauh: aturan "guru ber-shift SD–PKBM tidak dibayar Laju 1" membaca shift yang
              sama, jadi shift ini sekaligus menandai Laju 1-nya tak usah dibayar.
            </template>
          </p>
          <p>
            Buat shift tersendiri bernama Laju 1 / Laju 2 di Pengaturan → Master Shift (dengan
            jamnya), lalu pilih yang itu di sini.
          </p>
        </div>
        <button
          :disabled="shiftSesiMenyimpan || shiftSesiGanda"
          class="h-10 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black cursor-pointer"
          @click="simpanShiftSesi"
        >
          Simpan shift sesi
        </button>
      </div>

      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm space-y-2"
      >
        <p class="text-xs font-black text-[var(--text-primary)] uppercase">
          <i class="fas fa-user-shield text-teal-600 mr-1"></i>Admin Pondok Laju
        </p>
        <p class="text-[11px] text-[var(--text-secondary)]">
          Guru yang ditunjuk boleh menyusun jadwal piket Laju (seperti koordinator glondongan). PJ
          PTPT dan admin selalu boleh.
        </p>
        <input
          v-model="peranCari"
          type="text"
          placeholder="Cari guru…"
          class="w-full md:w-64 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
        />
        <div class="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
          <button
            v-for="g in guruPeranTampil"
            :key="g.id"
            :class="[
              'px-2 py-1 rounded-lg text-[11px] font-bold border cursor-pointer',
              peranDraft.includes(String(g.id))
                ? 'bg-teal-600 border-teal-600 text-white'
                : 'bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-secondary)]'
            ]"
            @click="togglePeran(g.id)"
          >
            {{ g.nama }}
          </button>
        </div>
        <button
          :disabled="peranMenyimpan"
          class="h-10 px-4 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white text-xs font-black cursor-pointer"
          @click="simpanPeran"
        >
          Simpan ({{ peranDraft.length }} guru)
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
// PondokLajuView — menu Pondok Laju (Kyai 15–16 Nov 2026). Aturan murni di utils/pondokLajuSesi;
//   data ditarik per tanggal/bulan yang dibuka (tabel baru sengaja bukan realtime — hemat egress).
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { queryColl, mergeOne, deleteOne, subscribeDoc, getOne } from '@/services/db'
import { todayJakarta, fmtRp, waLink } from '@/utils/format'
import { guruAktifSaja } from '@/utils/guruScope'
import { isPengajar } from '@/utils/jenisGuru'
import { isSuperAdmin } from '@/utils/roleScope'
import { shiftLabelOf, shiftList } from '@/utils/shiftMaster'
import { petaShiftSesiLaju } from '@/utils/shiftLaju'
import { shiftsForGuru } from '@/utils/shiftDerive'
import { jenisBisyarohList } from '@/utils/bisyarohScope'
import { rentangPeriodeBisyaroh, penyaringPeriodeBisyaroh } from '@/utils/periodeBisyaroh'
import { rekapJurnalBulan } from '@/utils/jurnalRekap'
import JurnalKartu from '@/components/pondoklaju/JurnalKartu.vue'
import { piketPerGuru, susunPesanJadwal } from '@/utils/waJadwalLaju'
import {
  SESI_LAJU,
  SESI_PIKET,
  labelSesi,
  kelasPondokLaju,
  kartuJurnalHari,
  teksPosisi,
  idJadwal,
  tanggalBulan,
  bentrokJadwal,
  adminPondokLaju,
  bolehSusunJadwal,
  sesiLajuTerbayar,
  sesiTakDibayarGuru,
  guruPiketLaju,
  kelompokPilihanGuru,
  tanggalAwalJadwal,
  fmtTanggalPendek
} from '@/utils/pondokLajuSesi'

const auth = useAuthStore()
const settingsStore = useSettingsStore()
const toast = useToast()
const { santriRaw } = useSantri()
const { guruRaw } = useGuru()

const sesi = computed(() => auth.sesiAktif || {})
const myId = computed(() => String(sesi.value.id ?? ''))
const myNama = computed(() => String(sesi.value.guru || sesi.value.nama || '').trim())
const _norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

const lembagaList = ref([])
let unsubL = null
onMounted(() => {
  unsubL = subscribeDoc('master', 'lembaga', (d) => {
    lembagaList.value = Array.isArray(d?.list) ? d.list : []
  })
})
onUnmounted(() => unsubL && unsubL())

const adminPenuh = computed(
  () => isSuperAdmin(sesi.value) || ['admin'].includes(sesi.value.role_sistem)
)
const bisaSusun = computed(() => bolehSusunJadwal(sesi.value, lembagaList.value))
const bisaKeuangan = computed(() => adminPenuh.value || sesi.value.role_sistem === 'admin_keuangan')

const tabs = computed(() => {
  const out = [
    // Kyai 17 Nov 2026: "bukan capaian tapi jurnal". Id 'capaian' sengaja TETAP — ia dipakai
    //   di tautan & penyimpanan tab terakhir; yang berubah cuma kata yang dibaca mata.
    { id: 'capaian', label: 'Jurnal', icon: 'fa-pen-to-square' },
    { id: 'jadwal', label: 'Jadwal', icon: 'fa-calendar-days' }
  ]
  // Kyai 24 Nov 2026: guru biasa cukup jurnal & jadwalnya sendiri — riwayat untuk pengelola.
  if (bisaSusun.value) out.push({ id: 'riwayat', label: 'Riwayat', icon: 'fa-clock-rotate-left' })
  if (bisaKeuangan.value) out.push({ id: 'bisyaroh', label: 'Bisyaroh', icon: 'fa-coins' })
  if (isSuperAdmin(sesi.value))
    out.push({ id: 'pengaturan', label: 'Pengaturan', icon: 'fa-sliders' })
  return out
})
const tab = ref('capaian')

const kelasList = computed(() => kelasPondokLaju(santriRaw.value))
const jumlahSantri = computed(() => kelasList.value.reduce((n, k) => n + k.santri.length, 0))
// Kyai 17 Nov 2026: pegawai non-pengajar JANGAN masuk daftar piket Pondok Laju — yang
//   menyimak bacaan santri itu pengajar (guru kelas, guru PTPT, dst), bukan staf.
const guruOptions = computed(() =>
  guruAktifSaja(guruRaw.value || [])
    .filter(isPengajar)
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)
const petaGuru = computed(() => new Map((guruRaw.value || []).map((g) => [String(g.id), g])))
function namaGuru(id) {
  return id ? petaGuru.value.get(String(id))?.nama || String(id) : ''
}
const fmtTgl = fmtTanggalPendek
function labelShift(id) {
  return shiftLabelOf(settingsStore.settings || {}, id)
}

// ─────────────────── JURNAL — kartu mengikuti jadwal ───────────────────
// Kyai 17 Nov 2026: "kalau seumpama tidak perlu memilih dropdown gimana, jadi langsung isian
//   kartu sendiri (Tadarrus Pagi, Laju 1, Laju 2), kartunya muncul sesuai daftar jadwal."
//   Dua pemilih (sesi + kelas) dihapus; yang dipajang jadwalnya sendiri, satu kartu per sesi ×
//   kelas, isian & simpan ada di components/pondoklaju/JurnalKartu.vue. Jadi guru yang piket dua
//   sesi sehari mengisi keduanya di satu layar, dan sesi yang bukan miliknya tak pernah tampil —
//   itulah pesan "Anda tidak terjadwal piket" yang dulu terasa seperti kerusakan.
const cTanggal = ref(todayJakarta())
const cJadwalHari = ref([]) // jadwal piket tanggal terpilih
const kartuManual = ref([]) // {sesi, kelasKey} — tambahan admin/PJ untuk menambal kelas lain
const tSesi = ref('laju1')
const tKelas = ref('')

// Yang MENCATAT, bukan yang piket: admin yang menambal jurnal tetap tercatat sebagai pencatat.
const pencatat = computed(() => ({ id: myId.value, nama: myNama.value }))
// Perilaku lama `kelasBolehCatat` dipertahankan: admin penuh & penyusun jadwal (PJ / Admin
// Pondok Laju) boleh mengisikan kelas mana pun — sekarang lewat "Tambah kartu", bukan dropdown
// yang selalu terpampang. RLS pondok_laju_capaian memang cukup auth_can_akademik.
const bisaSemuaKelas = computed(() => adminPenuh.value || bisaSusun.value)

async function muatJadwalHari() {
  try {
    cJadwalHari.value = await queryColl('pondok_laju_jadwal', [['tanggal', '==', cTanggal.value]])
  } catch (e) {
    cJadwalHari.value = []
  }
}
watch(
  cTanggal,
  () => {
    kartuManual.value = [] // kartu tambahan milik tanggal yang membuatnya
    muatJadwalHari()
  },
  { immediate: true }
)

// Aturan "siapa melihat kartu apa" ada di utils/pondokLajuSesi.kartuJurnalHari (pure + diuji);
// di sini cuma nama guru piketnya yang disegarkan dari data guru hidup, sebab nama tersimpan di
// baris jadwal bisa sudah berubah (guru berganti gelar — lihat kepemilikan santri via nama).
const kartuJurnal = computed(() =>
  kartuJurnalHari({
    jadwal: cJadwalHari.value,
    kelasList: kelasList.value,
    guruId: myId.value,
    guruNama: myNama.value,
    semuaKelas: bisaSemuaKelas.value,
    manual: kartuManual.value
  }).map((k) => ({
    ...k,
    piketNama: k.piketGuruId ? namaGuru(k.piketGuruId) || k.piketNama : ''
  }))
)

function tambahKartu() {
  if (!tKelas.value) {
    toast.warning('Pilih kelas lain dulu.')
    return
  }
  kartuManual.value.push({ sesi: tSesi.value, kelasKey: tKelas.value })
  tKelas.value = ''
}

// ─────────────────────────── JADWAL ───────────────────────────
const jBulan = ref(todayJakarta().slice(0, 7))
const jRows = ref([])
const jMemuat = ref(false)
const jMenyimpan = ref(false)
const jProgres = ref('')
const draft = reactive({}) // { 'tanggal|sesi|kelas': guruId | '' }
const _kunci = (t, s, k) => `${t}|${s}|${k}`

async function muatJadwal() {
  jMemuat.value = true
  try {
    // Guru biasa hanya menarik barisnya sendiri (Kyai 24 Nov 2026: tak perlu melihat jadwal
    //   orang lain) — sekaligus hemat egress.
    const saring = [['periode', '==', jBulan.value]]
    if (!bisaSusun.value) saring.push(['guru_id', '==', myId.value])
    jRows.value = await queryColl('pondok_laju_jadwal', saring)
  } catch (e) {
    jRows.value = []
    toast.error('Gagal memuat jadwal: ' + (e?.message || e))
  } finally {
    jMemuat.value = false
  }
}
watch(jBulan, () => {
  batalDraft()
  muatJadwal()
})

// Ganti bulan membuang perubahan yang belum disimpan — jadi ditahan dulu, bukan diam-diam hilang.
const bulanModel = computed({
  get: () => jBulan.value,
  set: (v) => {
    if (!v || v === jBulan.value) return
    if (adaDraft.value) {
      toast.warning('Simpan atau batalkan dulu perubahan bulan ini.')
      return
    }
    jBulan.value = v
  }
})
watch(tab, (t) => {
  if (t === 'jadwal' && !jRows.value.length) muatJadwal()
})
// Peran Admin Pondok Laju terbaca belakangan (master/lembaga) — saringan tarikan ikut berubah.
watch(bisaSusun, () => {
  if (tab.value === 'jadwal') muatJadwal()
})

const petaJadwal = computed(
  () => new Map(jRows.value.map((r) => [_kunci(r.tanggal, r.sesi, r.kelas_key), r]))
)
const tanggalJadwal = computed(() => tanggalBulan(jBulan.value))
function nilaiSel(t, s, k) {
  const key = _kunci(t, s, k)
  if (key in draft) return draft[key]
  return String(petaJadwal.value.get(key)?.guru_id || '')
}
function draftAda(t, s, k) {
  return _kunci(t, s, k) in draft
}
function ubahSel(t, s, k, val) {
  const asli = String(petaJadwal.value.get(_kunci(t, s, k))?.guru_id || '')
  if (String(val) === asli) delete draft[_kunci(t, s, k)]
  else draft[_kunci(t, s, k)] = String(val)
}
const jumlahDraft = computed(() => Object.keys(draft).length)
const adaDraft = computed(() => jumlahDraft.value > 0)
function batalDraft() {
  for (const k of Object.keys(draft)) delete draft[k]
}
const gabunganJadwal = computed(() => {
  const out = []
  for (const t of tanggalJadwal.value)
    for (const s of SESI_PIKET)
      for (const k of kelasList.value) {
        const g = nilaiSel(t, s, k.key)
        if (g) out.push({ tanggal: t, sesi: s, kelas_key: k.key, guru_id: g })
      }
  return out
})
const bentrok = computed(() => bentrokJadwal(gabunganJadwal.value))

// ── Satu tanggal sekali tampil (Kyai 24 Nov 2026) ──
const jTanggal = ref('')
watch(
  tanggalJadwal,
  (daftar) => {
    if (!daftar.includes(jTanggal.value)) jTanggal.value = tanggalAwalJadwal(daftar, todayJakarta())
  },
  { immediate: true }
)
const tanggalSebelum = computed(() => {
  const i = tanggalJadwal.value.indexOf(jTanggal.value)
  return i > 0 ? tanggalJadwal.value[i - 1] : ''
})
function geserTanggal(n) {
  const d = tanggalJadwal.value
  const i = d.indexOf(jTanggal.value) + n
  if (i >= 0 && i < d.length) {
    jTanggal.value = d[i]
    return
  }
  // Lewat ujung bulan → pindah bulan; tanggalnya dipilih watch(tanggalJadwal) di atas.
  const [y, m] = jBulan.value.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1 + n, 1))
  const bulanBaru = t.toISOString().slice(0, 7)
  if (adaDraft.value) {
    toast.warning('Simpan atau batalkan dulu perubahan bulan ini.')
    return
  }
  jBulan.value = bulanBaru
  const daftar = tanggalBulan(bulanBaru)
  jTanggal.value = n < 0 ? daftar[daftar.length - 1] || '' : daftar[0] || ''
}
function salinSebelum() {
  const asal = tanggalSebelum.value
  if (!asal) return
  for (const k of kelasList.value)
    for (const s of SESI_PIKET) ubahSel(jTanggal.value, s, k.key, nilaiSel(asal, s, k.key))
  toast.info(`Jadwal ${fmtTgl(asal)} disalin — periksa lalu SIMPAN JADWAL.`)
}
function isiTanggal(t) {
  let n = 0
  for (const k of kelasList.value) for (const s of SESI_PIKET) if (nilaiSel(t, s, k.key)) n++
  return n
}
function warnaIsiTanggal(t) {
  const n = isiTanggal(t)
  if (!n) return 'bg-slate-300 dark:bg-slate-600'
  return n >= kelasList.value.length * SESI_PIKET.length ? 'bg-emerald-500' : 'bg-amber-400'
}
function draftTanggal(t) {
  return Object.keys(draft).some((k) => k.startsWith(t + '|'))
}
const _HARI = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
function fmtTglPanjang(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''))
  if (!m) return '-'
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
  const bulan = d.toLocaleDateString('id-ID', { month: 'long', timeZone: 'UTC' })
  return `${_HARI[d.getUTCDay()]}, ${+m[3]} ${bulan} ${m[1]}`
}

// ── Daftar tetap guru piket ──
const daftarPiket = computed(() => guruPiketLaju(lembagaList.value))
const pilihanGuru = computed(() => kelompokPilihanGuru(guruOptions.value, daftarPiket.value))
const piketBuka = ref(false)
const piketDraft = ref([])
const piketCari = ref('')
const piketMenyimpan = ref(false)
watch(daftarPiket, (d) => (piketDraft.value = [...d]), { immediate: true })
const guruPiketTampil = computed(() => {
  const q = _norm(piketCari.value)
  return guruOptions.value.filter((g) => !q || _norm(g.nama).includes(q))
})
function togglePiket(id) {
  const k = String(id)
  piketDraft.value = piketDraft.value.includes(k)
    ? piketDraft.value.filter((x) => x !== k)
    : [...piketDraft.value, k]
}
async function simpanDaftarPiket() {
  if (piketMenyimpan.value) return
  piketMenyimpan.value = true
  try {
    await simpanItemPtpt({ guru_piket_laju: [...new Set(piketDraft.value.map(String))] })
    toast.success('Daftar guru piket tersimpan.')
  } catch (e) {
    toast.error('Gagal menyimpan daftar piket: ' + (e?.message || e))
  } finally {
    piketMenyimpan.value = false
  }
}
const jadwalSaya = computed(() =>
  jRows.value
    .filter((r) => String(r.guru_id) === myId.value)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal) || a.sesi.localeCompare(b.sesi))
)
const hariIniJ = todayJakarta()

// Kabar WA lewat wa.me (Kyai 24 Nov 2026): nomor Fonnte keblokir, jadi pengiriman otomatis
//   dicabut. Penyusun menekan tombol per guru; pesannya dari jadwal yang SUDAH tersimpan.
const kabarWa = computed(() => {
  const pondok = String(settingsStore.settings?.kopLine2 || 'Pondok Pesantren Mambaul Ulum')
  return [...piketPerGuru(jRows.value, { hariIni: todayJakarta() }).entries()]
    .map(([id, baris]) => {
      const g = petaGuru.value.get(String(id))
      const nama = g?.nama || namaGuru(id)
      return {
        id,
        nama,
        jumlah: baris.length,
        url: waLink(g?.wa, susunPesanJadwal({ nama, baris, pondok }))
      }
    })
    .sort((a, b) => a.nama.localeCompare(b.nama, 'id'))
})
const kabarBuka = ref(false)

async function simpanJadwal() {
  if (!adaDraft.value || jMenyimpan.value) return
  jMenyimpan.value = true
  const entri = Object.entries(draft)
  let i = 0
  try {
    for (const [key, guruId] of entri) {
      const [tanggal, sesiK, kelasKey] = key.split('|')
      const ada = petaJadwal.value.get(key)
      const id = ada?.id || idJadwal(tanggal, sesiK, kelasKey)
      jProgres.value = `${++i}/${entri.length}`
      if (!guruId) {
        if (ada) await deleteOne('pondok_laju_jadwal', id)
      } else {
        const kelas = kelasList.value.find((k) => k.key === kelasKey)
        await mergeOne('pondok_laju_jadwal', id, {
          id,
          tanggal,
          sesi: sesiK,
          guru_id: guruId,
          periode: tanggal.slice(0, 7),
          kelas_key: kelasKey,
          kelas_guru: kelas?.guru || '',
          guru_nama: namaGuru(guruId),
          dibuat_oleh: myNama.value,
          tgl_buat: new Date().toISOString()
        })
      }
      delete draft[key]
    }
    toast.success(`Jadwal tersimpan (${entri.length} perubahan). Kabari guru lewat tombol WA.`)
  } catch (e) {
    toast.error(`Gagal menyimpan jadwal (${i - 1} tersimpan): ` + (e?.message || e))
  } finally {
    jMenyimpan.value = false
    jProgres.value = ''
    await muatJadwal()
    await muatJadwalHari()
  }
}

// --- RIWAYAT & REKAP SEBULAN ---
// Kyai 17 Nov 2026: "saya ingin jurnal itu ada rekapannya selama satu bulan, bisa ekspor pdf."
//   Angkanya disusun utils/jurnalRekap (pure + diuji) lalu dipakai BERSAMA layar & PDF, jadi
//   kertas tak mungkin berselisih dengan layar. Kelas boleh dikosongkan = seluruh kelas.
const rKelas = ref('')
const rBulan = ref(todayJakarta().slice(0, 7))
const rRows = ref([])
const rMemuat = ref(false)
const rBuka = ref('')
const rCetak = ref(false)
const rKelasObj = computed(() => kelasList.value.find((k) => k.key === rKelas.value) || null)

async function muatRiwayat() {
  rRows.value = []
  rBuka.value = ''
  const k = rKelasObj.value
  rMemuat.value = true
  try {
    // Satu kelas -> saring di server lewat santri_id. Seluruh kelas -> cukup `periode`: baris
    // sebulan tak banyak, sedangkan daftar id seluruh santri Pondok Laju justru kueri berat.
    rRows.value = k
      ? await queryColl('pondok_laju_capaian', [
          ['santri_id', 'in', k.santri.map((s) => String(s.id))],
          ['periode', '==', rBulan.value]
        ])
      : await queryColl('pondok_laju_capaian', [['periode', '==', rBulan.value]])
  } catch (e) {
    toast.error('Gagal memuat riwayat: ' + (e?.message || e))
  } finally {
    rMemuat.value = false
  }
}
watch([rKelas, rBulan], muatRiwayat, { immediate: true })

const rekapBulan = computed(() =>
  rekapJurnalBulan(rRows.value, {
    bulan: rBulan.value,
    // Kelas terpilih saja; tanpa pilihan, seluruh kelas - termasuk yang NOL catatan, sebab
    // kelas yang tak pernah mengisi itulah yang paling perlu terlihat.
    kelasList: rKelasObj.value ? [rKelasObj.value] : kelasList.value
  })
)
const ringkasanRekap = computed(() => {
  const t = rekapBulan.value.total || {}
  return [
    { label: 'sesi tercatat', nilai: t.nSesi || 0 },
    { label: 'hari', nilai: t.nHari || 0 },
    { label: 'kelas berjalan', nilai: t.nKelasAktif || 0 },
    { label: 'kelas kosong', nilai: t.nKelasKosong || 0 },
    { label: 'santri', nilai: t.nSantri || 0 }
  ]
})
const namaKelasPeta = computed(() => {
  const o = {}
  for (const k of kelasList.value) o[k.key] = k.guru || k.key
  return o
})
/** Baris mentah satu sesi - hanya dibaca saat barisnya dibuka. */
function barisSesi(g) {
  return rRows.value
    .filter(
      (r) =>
        r.tanggal === g.tanggal &&
        r.sesi === g.sesi &&
        String(r.kelas_key || '') === String(g.kelasKey || '')
    )
    .sort((a, b) => String(a.santri_nama || '').localeCompare(String(b.santri_nama || ''), 'id'))
}

async function eksporRekapPdf() {
  if (rCetak.value) return
  if (!rekapBulan.value.total.nSesi) {
    toast.warning('Belum ada jurnal tercatat di bulan ini.')
    return
  }
  rCetak.value = true
  try {
    // Dimuat saat dipakai: jsPDF berat, dan tab ini lebih sering dibaca daripada dicetak.
    const { cetakRekapJurnalPdf } = await import('@/utils/jurnalPdf')
    await cetakRekapJurnalPdf(rekapBulan.value, {
      settings: settingsStore.settings || {},
      lembagaList: lembagaList.value,
      pencetak: myNama.value
    })
    toast.success('PDF rekap jurnal diunduh.')
  } catch (e) {
    toast.error('Gagal membuat PDF: ' + (e?.message || e))
  } finally {
    rCetak.value = false
  }
}

// ─────────────────────────── BISYAROH ───────────────────────────
const bPeriode = ref(todayJakarta().slice(0, 7))
const bJadwal = ref([])
const bAbsensi = ref([])
const bMemuat = ref(false)
const bRentang = computed(() => rentangPeriodeBisyaroh(bPeriode.value))
const jenisLaju = computed(() =>
  jenisBisyarohList(settingsStore.settings || {}).filter(
    (j) => j.aktif !== false && j.hitungan === 'per_sesi_laju'
  )
)
async function muatBisyaroh() {
  const r = bRentang.value
  if (!r) return
  bMemuat.value = true
  try {
    const [jd, ab] = await Promise.all([
      queryColl('pondok_laju_jadwal', [
        ['tanggal', '>=', r.start],
        ['tanggal', '<=', r.end]
      ]),
      queryColl('absensi_shift_guru', [
        ['tanggal', '>=', r.start],
        ['tanggal', '<=', r.end]
      ])
    ])
    bJadwal.value = jd
    bAbsensi.value = ab
  } catch (e) {
    toast.error('Gagal memuat data bisyaroh: ' + (e?.message || e))
  } finally {
    bMemuat.value = false
  }
}
watch([tab, bPeriode], ([t]) => {
  if (t === 'bisyaroh') muatBisyaroh()
})
const rekapBisyaroh = computed(() => {
  const dalam = penyaringPeriodeBisyaroh(bPeriode.value)
  const ids = [...new Set(bJadwal.value.map((r) => String(r.guru_id)).filter(Boolean))]
  return ids
    .map((gid) => {
      let dibayar = 0
      let terjadwal = 0
      let total = 0
      let tarif = 0
      if (!jenisLaju.value.length) {
        terjadwal = sesiLajuTerbayar({
          jadwal: bJadwal.value,
          guruId: gid,
          dalamPeriode: dalam
        }).terjadwal
      }
      // Kyai 16 Nov: guru shift sekolah SD–PKBM tak dibayar Laju 1 (aturan yang sama dgn slip).
      const s = settingsStore.settings || {}
      const g = petaGuru.value.get(gid)
      const takDibayar = g ? sesiTakDibayarGuru(shiftsForGuru(g, s), shiftList(s)) : []
      for (const j of jenisLaju.value) {
        const r = sesiLajuTerbayar({
          jadwal: bJadwal.value,
          absensi: bAbsensi.value,
          guruId: gid,
          dalamPeriode: dalam,
          shiftIds: j.scope.shift,
          sesiTakDibayar: takDibayar,
          shiftSesi: petaShiftSesiLaju(s)
        })
        terjadwal = r.terjadwal
        dibayar = Math.max(dibayar, r.dibayar)
        tarif += j.nominal
        total += r.dibayar * j.nominal
      }
      return {
        guru_id: gid,
        nama: namaGuru(gid),
        terjadwal,
        dibayar,
        tarif,
        total,
        tanpaLaju1: takDibayar.includes('laju1')
      }
    })
    .sort((a, b) => a.nama.localeCompare(b.nama, 'id'))
})

// ─────────────────────── SHIFT TIAP SESI ───────────────────────
// Disimpan di settings.pondokLajuShift (umum) — dibaca app, sinkron Desktop, & fungsi HiView.
const shiftSesiDraft = reactive({ laju1: '', laju2: '' })
const shiftSesiMenyimpan = ref(false)
const petaSesiAktif = computed(() => petaShiftSesiLaju(settingsStore.settings || {}))
watch(
  () => settingsStore.settings?.pondokLajuShift,
  () => {
    Object.assign(shiftSesiDraft, petaShiftSesiLaju(settingsStore.settings || {}))
  },
  { immediate: true, deep: true }
)
const shiftGuruOptions = computed(() =>
  shiftList(settingsStore.settings || {}).filter((sh) => sh.untuk !== 'pegawai')
)

/**
 * Shift sesi yang kemungkinan besar SALAH PILIH (Kyai bertanya 17 Nov 2026).
 *
 * Shift Laju 1/Laju 2 mestinya shift SENDIRI dengan jamnya sendiri. Memakai shift lembaga
 * yang sudah ada (mis. "SDI - PKBM" atau "Pra PTPT - PTPT - PPPH Sore") membuat absen Pondok
 * Laju dan absen sekolah/ngaji saling tertukar: satu scan dihitung dua-duanya, dan rekap
 * absen tak bisa lagi membedakan guru itu hadir mengajar atau hadir piket.
 *
 * Untuk Laju 1 tabrakannya lebih parah: aturan "guru ber-shift SD–PKBM tidak dibayar Laju 1"
 * membaca shift yang SAMA, jadi shift yang menandai kehadiran Laju 1 sekaligus menjadi
 * penanda bahwa Laju 1-nya tak usah dibayar. Memilih sendiri sebab ia tak dibayar.
 */
const shiftSesiSalahPilih = computed(() => {
  const daftar = shiftList(settingsStore.settings || {})
  const out = []
  for (const s of SESI_LAJU.filter((x) => x.piket)) {
    const id = String(shiftSesiDraft[s.key] || '')
    if (!id) continue
    const sh = daftar.find((x) => String(x.id) === id)
    if (!sh) continue
    const lem = (Array.isArray(sh.lembaga) ? sh.lembaga : []).map((x) => String(x || '').trim())
    if (!lem.length) continue
    const sdPkbm = lem.some((l) => ['SDI', 'PKBM'].includes(l.toUpperCase()))
    out.push({
      sesi: s.label,
      label: sh.label || id,
      lembaga: lem.join(', '),
      parah: s.key === 'laju1' && sdPkbm
    })
  }
  return out
})
// Shift sumber "hadir ikut" milik shift Laju 2 (Master Shift) — ditampilkan sebagai konfirmasi.
const laju2IkutSore = computed(() => {
  const id = shiftSesiDraft.laju2
  const sh = shiftList(settingsStore.settings || {}).find((x) => x.id === id)
  return id && sh ? sh.hadir_ikut || [] : []
})
const shiftSesiGanda = computed(() => {
  const isi = Object.values(shiftSesiDraft).filter(Boolean)
  return new Set(isi).size !== isi.length
})
async function simpanShiftSesi() {
  if (shiftSesiMenyimpan.value || shiftSesiGanda.value) return
  shiftSesiMenyimpan.value = true
  try {
    await settingsStore.save({
      pondokLajuShift: { laju1: shiftSesiDraft.laju1, laju2: shiftSesiDraft.laju2 }
    })
    toast.success('Shift tiap sesi Pondok Laju tersimpan.')
  } catch (e) {
    toast.error('Gagal menyimpan: ' + (e?.message || e))
  } finally {
    shiftSesiMenyimpan.value = false
  }
}

// ─────────────────────────── PERAN ───────────────────────────
const peranDraft = ref([])
const peranCari = ref('')
const peranMenyimpan = ref(false)
watch(
  lembagaList,
  (L) => {
    peranDraft.value = adminPondokLaju(L)
  },
  { immediate: true }
)
const guruPeranTampil = computed(() => {
  const q = _norm(peranCari.value)
  return guruOptions.value.filter((g) => !q || _norm(g.nama).includes(q))
})
function togglePeran(id) {
  const k = String(id)
  peranDraft.value = peranDraft.value.includes(k)
    ? peranDraft.value.filter((x) => x !== k)
    : [...peranDraft.value, k]
}
// Pola savePeran glondongan: baca master/lembaga terbaru, ubah item PTPT saja. Dipakai
// bersama peran Admin Pondok Laju & daftar guru piket.
async function simpanItemPtpt(patch) {
  const m = await getOne('master', 'lembaga')
  const list = Array.isArray(m?.list) ? m.list.slice() : []
  const idx = list.findIndex((l) => (l.lembaga || l.nama) === 'PTPT')
  if (idx >= 0) list[idx] = { ...list[idx], ...patch }
  else list.push({ lembaga: 'PTPT', ...patch })
  await mergeOne('master', 'lembaga', { list })
}
async function simpanPeran() {
  if (peranMenyimpan.value) return
  peranMenyimpan.value = true
  try {
    await simpanItemPtpt({ admin_pondok_laju: [...new Set(peranDraft.value.map(String))] })
    toast.success('Admin Pondok Laju tersimpan.')
  } catch (e) {
    toast.error('Gagal menyimpan peran: ' + (e?.message || e))
  } finally {
    peranMenyimpan.value = false
  }
}
</script>
