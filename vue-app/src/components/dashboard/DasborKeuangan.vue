<template>
  <div>
    <!-- 4 kartu ringkasan -->
    <div class="rb-fin-row">
      <router-link to="/tagihan" class="rb-fin-card" style="display: block; text-decoration: none">
        <div class="rb-fin-top">
          <span class="rb-fin-l">Tagihan Aktif</span>
          <span style="color: #f43f5e"><RibbonIcon name="file" :size="18" /></span>
        </div>
        <div class="rb-fin-v">{{ stats?.tagihanCount || 0 }}</div>
        <div class="rb-fin-sub">tagihan</div>
      </router-link>
      <router-link to="/tabungan" class="rb-fin-card" style="display: block; text-decoration: none">
        <div class="rb-fin-top">
          <span class="rb-fin-l">Tabungan Santri</span>
          <span style="color: var(--accent)"><RibbonIcon name="save" :size="18" /></span>
        </div>
        <div class="rb-fin-v">{{ (tabunganSantri || []).length }}</div>
        <div class="rb-fin-sub">rekening</div>
      </router-link>
      <router-link to="/bisyaroh" class="rb-fin-card" style="display: block; text-decoration: none">
        <div class="rb-fin-top">
          <span class="rb-fin-l">Slip Bisyaroh</span>
          <span style="color: #3b82f6"><RibbonIcon name="doc" :size="18" /></span>
        </div>
        <div class="rb-fin-v">{{ (gaji || []).length }}</div>
        <div class="rb-fin-sub">slip</div>
      </router-link>
      <router-link to="/buku-induk" class="rb-fin-card" style="display: block; text-decoration: none">
        <div class="rb-fin-top">
          <span class="rb-fin-l">Buku Induk</span>
          <span style="color: #f59e0b"><RibbonIcon name="book" :size="18" /></span>
        </div>
        <div class="rb-fin-v">{{ bukuIndukValid.length }}</div>
        <div class="rb-fin-sub">entri</div>
      </router-link>
    </div>

    <!-- 2 grafik -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px">
      <div class="rb-card">
        <div class="rb-card-h"><h3>Pemasukan vs Pengeluaran (12 Bulan)</h3></div>
        <div class="rb-chart-legend" style="margin-bottom: 6px">
          <span><i style="background: var(--accent)"></i>Pemasukan</span>
          <span><i style="background: #f43f5e"></i>Pengeluaran</span>
        </div>
        <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none" style="display: block">
          <g v-for="(line, i) in barGrid" :key="'g' + i">
            <line :x1="40" :y1="line.y" :x2="595" :y2="line.y" style="stroke: var(--rb-divider)" stroke-dasharray="3,3" />
            <text :x="35" :y="line.y + 4" text-anchor="end" font-size="9" style="fill: var(--rb-text-dim)">{{ line.label }}</text>
          </g>
          <g v-for="(b, i) in bar12" :key="'b' + i">
            <rect :x="b.x" :y="b.yMasuk" :width="b.w / 2 - 1" :height="b.hMasuk" rx="2" style="fill: var(--accent)" />
            <rect :x="b.x + b.w / 2 + 1" :y="b.yKeluar" :width="b.w / 2 - 1" :height="b.hKeluar" rx="2" style="fill: #f43f5e" />
            <text :x="b.x + b.w / 2" y="215" text-anchor="middle" font-size="9" style="fill: var(--rb-text-dim)">{{ b.label }}</text>
          </g>
        </svg>
      </div>

      <div class="rb-card">
        <div class="rb-card-h"><h3>Saldo Berjalan Bulanan</h3></div>
        <p style="font-size: 11px; color: var(--rb-text-dim); margin-bottom: 6px">Saldo: {{ fmtRp(saldoData.last) }}</p>
        <svg width="100%" height="220" viewBox="0 0 600 220" preserveAspectRatio="none" style="display: block">
          <g v-for="(line, i) in saldoGrid" :key="'sg' + i">
            <line :x1="50" :y1="line.y" :x2="595" :y2="line.y" style="stroke: var(--rb-divider)" stroke-dasharray="3,3" />
            <text :x="45" :y="line.y + 4" text-anchor="end" font-size="9" style="fill: var(--rb-text-dim)">{{ line.label }}</text>
          </g>
          <polyline :points="saldoData.fillPoints" fill="#3b82f6" fill-opacity="0.1" stroke="none" />
          <polyline :points="saldoData.pathPoints" fill="none" stroke="#3b82f6" stroke-width="2" />
          <g v-for="(p, i) in saldoData.points" :key="'sp' + i">
            <circle :cx="p.x" :cy="p.y" r="3" fill="#3b82f6" />
            <text :x="p.x" y="215" text-anchor="middle" font-size="9" style="fill: var(--rb-text-dim)">{{ p.label }}</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Breakdown kategori (donut) — tab Keuangan -->
    <div v-if="showKategori" class="rb-card" style="margin-top: 16px">
      <div class="rb-card-h"><h3>Breakdown Kategori Pengeluaran (Bulan Ini)</h3></div>
      <div v-if="kategoriBulanIni.length === 0" style="text-align: center; padding: 20px; font-size: 12px; color: var(--rb-text-dim); font-style: italic">
        Belum ada pengeluaran bulan ini.
      </div>
      <div v-else style="display: grid; grid-template-columns: 220px 1fr; gap: 18px; align-items: center">
        <svg viewBox="0 0 220 220" width="220" height="220" style="display: block; margin: 0 auto">
          <path v-for="(slice, i) in donutSlices" :key="'d' + i" :d="slice.path" :fill="slice.color" />
          <circle cx="110" cy="110" r="50" style="fill: var(--rb-card)" />
          <text x="110" y="105" text-anchor="middle" font-size="10" style="fill: var(--rb-text-dim)">Total</text>
          <text x="110" y="122" text-anchor="middle" font-size="13" font-weight="bold" style="fill: var(--rb-text)">{{ fmtRp(totalKategori) }}</text>
        </svg>
        <div style="display: flex; flex-direction: column; gap: 6px">
          <div v-for="(k, i) in kategoriBulanIni" :key="k.nama" style="display: flex; align-items: center; gap: 8px">
            <span :style="{ background: PALETTE[i % PALETTE.length] }" style="width: 12px; height: 12px; border-radius: 3px; flex: none"></span>
            <span style="flex: 1; font-size: 12px; font-weight: 600">{{ k.nama }}</span>
            <span style="font-size: 12px; font-weight: 800">{{ fmtRp(k.total) }}</span>
            <span style="font-size: 10px; color: var(--rb-text-dim); width: 38px; text-align: right">{{ k.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaksi Terakhir — tab Keuangan -->
    <div v-if="showTransaksi" class="rb-card" style="margin-top: 16px">
      <div class="rb-card-h"><h3>Transaksi Terakhir</h3></div>
      <div v-if="transaksiTerakhir.length === 0" style="text-align: center; padding: 20px; font-size: 12px; color: var(--rb-text-dim); font-style: italic">
        Belum ada transaksi.
      </div>
      <table v-else class="rb-table">
        <thead>
          <tr><th>Tanggal</th><th>Keterangan</th><th>Jenis</th><th style="text-align: right">Nominal</th></tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in transaksiTerakhir" :key="i">
            <td style="white-space: nowrap">{{ t.tgl }}</td>
            <td>{{ t.ket }}</td>
            <td><span class="rb-pill" :class="t.jenis === 'Masuk' ? 'masuk' : 'keluar'">{{ t.jenis }}</span></td>
            <td style="text-align: right; white-space: nowrap; font-weight: 700">{{ t.nominal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import { useKeuanganDashboard } from '@/composables/useKeuanganDashboard'

defineProps({
  showTransaksi: { type: Boolean, default: false },
  showKategori: { type: Boolean, default: false }
})

const {
  stats,
  tabunganSantri,
  gaji,
  bukuIndukValid,
  bar12,
  barGrid,
  saldoData,
  saldoGrid,
  kategoriBulanIni,
  totalKategori,
  donutSlices,
  transaksiTerakhir,
  PALETTE,
  fmtRp
} = useKeuanganDashboard()
</script>
