<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  judul: { type: String, default: '' },
  isi: { type: String, default: '' },
  tanggal: { type: String, default: '' },
  author: { type: String, default: 'Admin' },
  gambar_urls: { type: Array, default: () => [] },
  postId: { type: String, default: '' },
  linkUrl: { type: String, default: '' },
  linkPlatform: { type: String, default: '' }
})

defineEmits(['edit', 'delete'])

const idx = ref(0)
const next = () => {
  idx.value = (idx.value + 1) % props.gambar_urls.length
}
const prev = () => {
  idx.value = (idx.value - 1 + props.gambar_urls.length) % props.gambar_urls.length
}

// v.72.0526: Touch swipe gesture untuk carousel — Instagram/native feel
let touchStartX = 0
let touchEndX = 0
let didSwipe = false
const SWIPE_THRESHOLD = 40 // px minimum untuk count as swipe
function onTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
  didSwipe = false
}
function onTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX
  const delta = touchEndX - touchStartX
  if (Math.abs(delta) < SWIPE_THRESHOLD) return
  if (props.gambar_urls.length < 2) return
  didSwipe = true
  if (delta < 0) {
    // swipe kiri → next
    next()
  } else {
    // swipe kanan → prev
    prev()
  }
}

const platformMeta = computed(() => {
  const p = (props.linkPlatform || '').toLowerCase()
  if (p === 'youtube') {
    return { label: 'Tonton di YouTube', icon: 'fab fa-youtube', cls: 'badge-yt' }
  }
  if (p === 'instagram') {
    return { label: 'Buka di Instagram', icon: 'fab fa-instagram', cls: 'badge-ig' }
  }
  if (p === 'tiktok') {
    return { label: 'Buka di TikTok', icon: 'fab fa-tiktok', cls: 'badge-tt' }
  }
  return { label: 'Buka Tautan', icon: 'fas fa-external-link-alt', cls: 'badge-web' }
})

function openExternalLink() {
  if (!props.linkUrl || didSwipe) {
    didSwipe = false
    return
  }
  try {
    window.open(props.linkUrl, '_blank', 'noopener,noreferrer')
  } catch {
    /* ignore */
  }
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
    <div
      v-if="gambar_urls && gambar_urls.length > 0"
      :class="['gal', { 'gal-clickable': Boolean(linkUrl), 'gal-yt': linkPlatform === 'youtube' }]"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
      @click="openExternalLink"
    >
      <img :src="gambar_urls[idx]" :alt="judul" class="gal-img" />
      <!-- Ikon Play YouTube di tengah thumbnail -->
      <div v-if="linkUrl && linkPlatform === 'youtube'" class="yt-play" aria-hidden="true">
        <i class="fab fa-youtube"></i>
      </div>
      <!-- Badge platform di pojok kanan bawah -->
      <a
        v-if="linkUrl"
        :href="linkUrl"
        target="_blank"
        rel="noopener noreferrer"
        :class="['link-badge', platformMeta.cls]"
        @click.stop
      >
        <i :class="platformMeta.icon"></i>
        <span>{{ platformMeta.label }}</span>
      </a>
      <div v-if="gambar_urls.length > 1" class="cnt">{{ idx + 1 }}/{{ gambar_urls.length }}</div>
      <button v-if="gambar_urls.length > 1" type="button" class="nav nav-l" @click.stop="prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button v-if="gambar_urls.length > 1" type="button" class="nav nav-r" @click.stop="next">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div v-if="gambar_urls.length > 1" class="dots">
        <span v-for="(_, i) in gambar_urls" :key="i" :class="['dot', { active: idx === i }]"></span>
      </div>
    </div>
    <!-- Jika postingan link belum punya gambar thumbnail -->
    <div v-else-if="linkUrl" class="link-fallback-wrap">
      <a :href="linkUrl" target="_blank" rel="noopener noreferrer" class="link-fallback-btn">
        <i :class="platformMeta.icon"></i>
        <span class="truncate">{{ platformMeta.label }}</span>
        <i class="fas fa-arrow-up-right-from-square text-[11px] opacity-75"></i>
      </a>
    </div>
    <div v-if="isi" class="isi">
      <p>{{ isi }}</p>
    </div>
  </article>
</template>

<style scoped>
.ammu-post {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 6px 18px -4px rgba(15, 23, 42, 0.06);
  color: #0f172a;
  transition: box-shadow 180ms ease;
}
:global(.dark) .ammu-post,
.dark-mode .ammu-post {
  background: #162032;
  border-color: rgba(148, 163, 184, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 8px 24px -6px rgba(0, 0, 0, 0.45);
  color: #f8fafc;
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
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
  color: #0f172a;
}
:global(.dark) .judul,
.dark-mode .judul {
  color: #f8fafc;
}
@media (min-width: 768px) {
  .judul {
    font-size: 1.15rem;
  }
}
.gal {
  position: relative;
  background: #f1f5f9;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}
:global(.dark) .gal,
.dark-mode .gal {
  background: #09090b;
}
.gal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
.gal-clickable {
  cursor: pointer;
}
.gal-yt {
  aspect-ratio: 16 / 9;
  background: #0f172a;
}
.yt-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.14);
  transition: background 150ms;
}
.gal-clickable:hover .yt-play {
  background: rgba(0, 0, 0, 0.28);
}
.yt-play i {
  font-size: 3.5rem;
  color: #ff0000;
  filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.45));
  background: radial-gradient(circle, #ffffff 34%, transparent 36%);
}
.link-badge {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: transform 150ms, background 150ms;
  z-index: 2;
}
.link-badge:hover {
  transform: translateY(-1px);
  background: rgba(15, 23, 42, 0.92);
}
.badge-yt i {
  color: #ff4444;
}
.badge-ig i {
  color: #f472b6;
}
.badge-tt i {
  color: #2dd4bf;
}
.link-fallback-wrap {
  padding: 0 1rem 0.5rem;
}
.link-fallback-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #0f766e;
  background: #ccfbf1;
  text-decoration: none;
  transition: background 150ms;
}
.link-fallback-btn:hover {
  background: #99f6e4;
}
:global(.dark) .link-fallback-btn,
.dark-mode .link-fallback-btn {
  color: #5eead4;
  background: rgba(15, 118, 110, 0.25);
}
</style>
