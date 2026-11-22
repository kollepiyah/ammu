// linkPreview.js — Layanan preview link & mirror gambar untuk Al Manshur Channel.
// Memanggil Supabase Edge Function `get-link-preview` (YouTube, Instagram Graph API,
// TikTok oEmbed, Open Graph web). Ada fallback lokal khusus YouTube agar tetap
// responsif walau edge function lambat/belum di-deploy.
import { supabase } from './supabase'

export function detectPlatform(rawUrl) {
  const s = String(rawUrl || '').trim()
  if (!s) return ''
  try {
    const h = new URL(s).hostname.toLowerCase()
    if (/(?:^|\.)(?:youtube\.com|youtu\.be|youtube-nocookie\.com)$/.test(h)) return 'youtube'
    if (/(?:^|\.)(?:instagram\.com|instagr\.am)$/.test(h)) return 'instagram'
    if (/(?:^|\.)tiktok\.com$/.test(h)) return 'tiktok'
    return 'web'
  } catch {
    return ''
  }
}

export function extractYouTubeId(rawUrl) {
  try {
    const u = new URL(rawUrl)
    if (u.hostname.toLowerCase().includes('youtu.be')) {
      return u.pathname.replace(/^\/+/, '').split('/')[0] || ''
    }
    const v = u.searchParams.get('v')
    if (v) return v
    const m = u.pathname.match(/\/(?:shorts|embed|live|v)\/([a-zA-Z0-9_-]{6,})/)
    return m ? m[1] : ''
  } catch {
    return ''
  }
}

/** Ambil metadata + daftar gambar thumbnail dari URL (YouTube / IG / TikTok / Web). */
export async function fetchLinkPreview(rawUrl) {
  const url = String(rawUrl || '').trim()
  if (!url) throw new Error('Link belum diisi.')

  let parsed
  try {
    parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Link harus diawali http:// atau https://')
    }
  } catch (e) {
    throw new Error(e?.message || 'Format link tidak valid.')
  }

  const platform = detectPlatform(url)

  // Panggil Edge Function get-link-preview
  if (supabase) {
    try {
      const { data, error } = await supabase.functions.invoke('get-link-preview', {
        body: { url }
      })
      if (!error && data && !data.error) {
        const imgs = Array.isArray(data.images)
          ? data.images.filter(Boolean)
          : data.image
            ? [data.image]
            : []
        return {
          url: data.url || url,
          platform: data.platform || platform || 'web',
          title: data.title || '',
          description: data.description || '',
          image: imgs[0] || '',
          images: imgs,
          siteName: data.siteName || parsed.hostname,
          needsMirror: Boolean(data.needsMirror),
          needsManualImage: Boolean(data.needsManualImage) || imgs.length === 0,
          note: data.note || ''
        }
      }
    } catch {
      /* fallback di bawah */
    }
  }

  // Fallback lokal khusus YouTube (gratis & deterministik dari video ID)
  if (platform === 'youtube') {
    const vid = extractYouTubeId(url)
    const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : ''
    return {
      url,
      platform: 'youtube',
      title: '',
      description: '',
      image: thumb,
      images: thumb ? [thumb] : [],
      siteName: 'YouTube',
      needsMirror: false,
      needsManualImage: !thumb,
      note: thumb ? 'Thumbnail YouTube diambil otomatis.' : ''
    }
  }

  return {
    url,
    platform: platform || 'web',
    title: '',
    description: '',
    image: '',
    images: [],
    siteName: parsed.hostname,
    needsMirror: false,
    needsManualImage: true,
    note: 'Preview otomatis belum tersedia untuk link ini. Anda tetap bisa mengisi caption dan upload thumbnail manual.'
  }
}

/**
 * Salin gambar eksternal (CDN Instagram/TikTok yang cepat expired) ke Supabase Storage
 * melalui Edge Function `get-link-preview` agar permanen.
 */
export async function mirrorExternalImages(postId, urls) {
  const list = Array.isArray(urls) ? urls.filter(Boolean) : []
  if (list.length === 0 || !supabase) return list
  try {
    const { data, error } = await supabase.functions.invoke('get-link-preview', {
      body: { action: 'mirror_images', postId, urls: list }
    })
    if (!error && Array.isArray(data?.urls) && data.urls.length > 0) {
      return data.urls
    }
  } catch {
    /* fallback pakai URL asli */
  }
  return list
}

/** Tes token Instagram Graph API lewat Edge Function `get-link-preview`. */
export async function testInstagramConnection({ igUserId = '', igAccessToken = '' } = {}) {
  if (!supabase) throw new Error('Supabase belum siap.')
  const { data, error } = await supabase.functions.invoke('get-link-preview', {
    body: { action: 'test_ig', igUserId, igAccessToken }
  })
  if (error) throw new Error(error.message || 'Gagal menghubungi fungsi preview.')
  return data
}
