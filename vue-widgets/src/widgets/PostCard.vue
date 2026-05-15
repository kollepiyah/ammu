<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  judul: { type: String, default: '' },
  isi: { type: String, default: '' },
  tanggal: { type: String, default: '' },
  author: { type: String, default: 'Admin' },
  gambar_urls: { type: Array, default: () => [] },
  postId: { type: String, default: '' }
})

defineEmits(['edit', 'delete'])

const idx = ref(0)
const next = () => {
  idx.value = (idx.value + 1) % props.gambar_urls.length
}
const prev = () => {
  idx.value = (idx.value - 1 + props.gambar_urls.length) % props.gambar_urls.length
}

const formatted = computed(() => {
  if (!props.tanggal) return ''
  const d = new Date(props.tanggal)
  if (isNaN(d)) return props.tanggal
  const m = [
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
  ][d.getMonth()]
  return `${String(d.getDate()).padStart(2, '0')} ${m} ${d.getFullYear()} pukul ${String(d.getHours()).padStart(2, '0')}.${String(d.getMinutes()).padStart(2, '0')}`
})
</script>

<template>
  <article class="ammu-post">
    <header class="post-hdr">
      <div class="hdr-l">
        <div class="ava"><img :src="'/logo.png'" alt="Logo" class="ava-img" /></div>
        <div>
          <p class="nama">Pondok Pesantren Mambaul Ulum</p>
          <p class="meta">
            {{ formatted }}<span v-if="author && author !== 'Admin'"> · {{ author }}</span>
          </p>
        </div>
      </div>
      <div v-if="postId" class="hdr-r">
        <button type="button" class="btn-edit" aria-label="Edit" @click="$emit('edit', postId)">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="btn-del" aria-label="Hapus" @click="$emit('delete', postId)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </header>
    <h2 class="judul">{{ judul }}</h2>
    <div v-if="gambar_urls && gambar_urls.length > 0" class="gal">
      <img :src="gambar_urls[idx]" :alt="judul" class="gal-img" />
      <div v-if="gambar_urls.length > 1" class="cnt">{{ idx + 1 }}/{{ gambar_urls.length }}</div>
      <button v-if="gambar_urls.length > 1" type="button" class="nav nav-l" @click="prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="gambar_urls.length > 1" type="button" class="nav nav-r" @click="next">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div v-if="gambar_urls.length > 1" class="dots">
        <span v-for="(_, i) in gambar_urls" :key="i" :class="['dot', { active: idx === i }]"></span>
      </div>
    </div>
    <div class="isi">
      <p>{{ isi }}</p>
    </div>
  </article>
</template>

<style scoped>
.ammu-post {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  color: #0f172a;
}
:global(.dark) .ammu-post,
.dark-mode .ammu-post {
  background: #18181b;
  border-color: #27272a;
  color: #fafafa;
}
.post-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.75rem;
}
.hdr-l {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ava {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: #f0fdfa;
  border: 1px solid #99f6e4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f766e;
}
:global(.dark) .ava,
.dark-mode .ava {
  background: rgba(15, 118, 110, 0.2);
  border-color: rgba(15, 118, 110, 0.4);
}
.ava-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}
.nama {
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0;
  color: #0f172a;
}
:global(.dark) .nama,
.dark-mode .nama {
  color: #fafafa;
}
.meta {
  font-size: 11px;
  color: #64748b;
  margin: 0;
}
:global(.dark) .meta,
.dark-mode .meta {
  color: #a1a1aa;
}
.hdr-r {
  display: flex;
  gap: 0.25rem;
}
.btn-edit,
.btn-del {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 150ms;
}
.btn-edit {
  color: #2563eb;
}
.btn-edit:hover {
  background: #eff6ff;
}
.btn-del {
  color: #e11d48;
}
.btn-del:hover {
  background: #fff1f2;
}
:global(.dark) .btn-edit:hover,
.dark-mode .btn-edit:hover {
  background: rgba(37, 99, 235, 0.2);
}
:global(.dark) .btn-del:hover,
.dark-mode .btn-del:hover {
  background: rgba(225, 29, 72, 0.2);
}
.judul {
  padding: 0 1rem 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 0;
  color: #0f172a;
}
@media (min-width: 768px) {
  .judul {
    font-size: 1.15rem;
  }
}
.gal {
  position: relative;
  background: #f1f5f9;
  aspect-ratio: 16/10;
  overflow: hidden;
}
:global(.dark) .gal,
.dark-mode .gal {
  background: #09090b;
}
.gal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cnt {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
}
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 150ms;
}
.nav:hover {
  background: rgba(0, 0, 0, 0.6);
}
.nav-l {
  left: 0.5rem;
}
.nav-r {
  right: 0.5rem;
}
.dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.375rem;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 150ms;
}
.dot.active {
  background: white;
  width: 16px;
}
.isi {
  padding: 1rem;
}
.isi p {
  font-size: 0.875rem;
  color: #334155;
  white-space: pre-line;
  line-height: 1.6;
  margin: 0;
}
:global(.dark) .isi p,
.dark-mode .isi p {
  color: #d4d4d8;
}
</style>
