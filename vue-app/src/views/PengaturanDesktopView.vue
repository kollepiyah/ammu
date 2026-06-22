<template>
  <div class="rb-page">
    <div class="rb-section-title">
      <span class="ic"><RibbonIcon name="gear" :size="22" /></span>
      <span class="st">Pengaturan (Desktop)</span>
      <span class="note">Kelola data master, field/ACF, keuangan & sistem — full CRUD</span>
    </div>

    <div class="rb-help-grid">
      <button v-for="c in cards" :key="c.title" class="rb-help-card" type="button" @click="router.push(c.to)">
        <div class="hi"><RibbonIcon :name="c.icon" :size="20" /></div>
        <h4>{{ c.title }}</h4>
        <p>{{ c.desc }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
// Pengaturan khusus Electron (hub) — beda dari web: satu pintu ke semua tool full-CRUD/ACF
// yang sudah ada (Master Data, Field/ACF, Keuangan, Sistem, dll). Akses ikut peran.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import RibbonIcon from '@/components/ribbon/RibbonIcon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const isSuper = computed(() => auth.sesiAktif?.role_sistem === 'super_admin')

const allCards = [
  { icon: 'layers', title: 'Master Data', desc: 'CRUD lembaga, guru/pegawai, santri, tahun pelajaran, audit log.', to: '/master-data', need: 'super' },
  { icon: 'grid', title: 'Kelola Field & ACF', desc: 'Atur custom field (ACF) & urutan field formulir santri/guru.', to: '/field-schema', need: 'super' },
  { icon: 'book', title: 'Mapel Lembaga Formal', desc: 'Atur mata pelajaran per kelas untuk lembaga formal.', to: '/mapel-lembaga', need: 'admin' },
  { icon: 'wallet', title: 'Pengaturan Keuangan', desc: 'Jatuh tempo, jenis tagihan, bisyaroh shift & pokok.', to: '/keu-pengaturan', need: 'keuangan' },
  { icon: 'gear', title: 'Pengaturan Sistem', desc: 'Identitas, KOP surat, logo, tema, kalibrasi hijri, password admin.', to: '/pengaturan-web', need: 'admin' },
  { icon: 'calendar', title: 'Kegiatan Pesantren', desc: 'Kelola agenda & kegiatan pondok.', to: '/kegiatan-pesantren', need: 'admin' },
  { icon: 'clipboard', title: 'PSB', desc: 'Penerimaan santri baru & konversi ke santri.', to: '/psb', need: 'admin' }
]

const cards = computed(() =>
  allCards.filter((c) => {
    if (c.need === 'super') return isSuper.value
    if (c.need === 'keuangan') return auth.cekHakAkses('akses_keuangan')
    return auth.isAdmin
  })
)
</script>
