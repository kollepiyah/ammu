// Postingan Channel untuk tamu: satu kali tarik (30 terbaru) + salinan di HP. Dipakai
// strip Beranda publik dan tab Channel supaya keduanya berbagi satu salinan.
import { computed } from 'vue'
import { queryColl } from '@/services/db'
import { pilihBerkas, urlBerkas } from '@/utils/urlBerkas'
import { useDataTamu } from '@/composables/useDataTamu'

function waktu(p) {
  return new Date(p.tanggal || p.createdAt || p.created_at || 0).getTime() || 0
}

export function daftarGambar(p) {
  if (Array.isArray(p?.gambar_urls) && p.gambar_urls.length)
    return p.gambar_urls.map(urlBerkas).filter(Boolean)
  const satu = pilihBerkas(p?.gambar_url, p?.gambar, p?.foto)
  return satu ? [satu] : []
}

export function usePostTamu() {
  const { data, loading, galat, segarkan } = useDataTamu(
    'beranda_post',
    () => queryColl('beranda_post', [], [['created_at', 'desc']], 30),
    { umurMs: 30 * 60 * 1000 }
  )
  const posts = computed(() => [...(data.value || [])].sort((a, b) => waktu(b) - waktu(a)))
  return { posts, loading, galat, segarkan }
}
