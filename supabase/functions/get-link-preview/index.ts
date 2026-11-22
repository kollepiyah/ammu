// get-link-preview — Ambil preview link untuk Al Manshur Channel (beranda_post).
// Mendukung:
//   - YouTube (video, Shorts, youtu.be) via oEmbed resmi + thumbnail HD (gratis)
//   - Instagram (Post, Reels, Carousel multi-foto) via Instagram Graph API
//     (kredensial dibaca dari public.settings key='instagram' atau env IG_ACCESS_TOKEN)
//   - TikTok via TikTok oEmbed resmi (gratis)
//   - Web umum via Open Graph scraping (+ cache 7 hari di link_preview_cache)
//   - POST { action: 'test_ig', igUserId?, igAccessToken? } -> tes koneksi token IG
//   - POST { action: 'mirror_images', postId, urls } -> salin gambar CDN IG/TikTok ke
//     Supabase Storage bucket `photo` (beranda_post/...) supaya permanen & anti-expired.
//
// DEPLOY: supabase functions deploy get-link-preview --no-verify-jwt
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

const TTL_MS = 7 * 24 * 60 * 60 * 1000
const SOCIAL_OTHER = /(?:facebook\.com|twitter\.com|x\.com|threads\.net|pinterest\.com)/i
const YT_HOST = /(?:^|\.)(?:youtube\.com|youtu\.be|youtube-nocookie\.com)$/i
const IG_HOST = /(?:^|\.)(?:instagram\.com|instagr\.am)$/i
const TT_HOST = /(?:^|\.)tiktok\.com$/i

// SSRF guard (A3 audit 29 Jul): blokir host internal/privat/link-local.
function isBlockedHost(rawHost: string): boolean {
  const h = String(rawHost || '').toLowerCase().replace(/\.$/, '').replace(/^\[|\]$/g, '')
  if (!h) return true
  if (
    h === 'localhost' ||
    h.endsWith('.localhost') ||
    h.endsWith('.local') ||
    h.endsWith('.internal') ||
    h === 'metadata.google.internal'
  )
    return true
  if (h === '::1' || h.startsWith('fe80:') || h.startsWith('fc') || h.startsWith('fd')) return true
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (m) {
    const a = Number(m[1]),
      b = Number(m[2])
    if (
      a === 0 ||
      a === 127 ||
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254) ||
      a >= 224
    )
      return true
  }
  return false
}

function metaContent(html: string, patterns: RegExp[]): string {
  for (const re of patterns) {
    const m = html.match(re)
    if (m && m[1]) return m[1].trim()
  }
  return ''
}

function meta(prop: string): RegExp[] {
  const esc = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return [
    new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${esc}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name|itemprop)=["']${esc}["']`, 'i')
  ]
}

function extractYouTubeId(u: URL): string {
  const host = u.hostname.toLowerCase()
  if (host.includes('youtu.be')) {
    return u.pathname.replace(/^\/+/, '').split('/')[0] || ''
  }
  const v = u.searchParams.get('v')
  if (v) return v
  const m = u.pathname.match(/\/(?:shorts|embed|live|v)\/([a-zA-Z0-9_-]{6,})/)
  return m ? m[1] : ''
}

function extractIgShortcode(u: URL): string {
  // Format: /p/CODE/, /reel/CODE/, /reels/CODE/, /tv/CODE/ atau /<user>/p/CODE/
  const m = u.pathname.match(/\/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/i)
  return m ? m[1] : ''
}

async function getIgConfig(db: ReturnType<typeof createClient>): Promise<{ igUserId: string; igAccessToken: string }> {
  try {
    const { data } = await db.from('settings').select('value').eq('key', 'instagram').maybeSingle()
    const val = (data?.value || {}) as Record<string, string>
    const token = String(val.igAccessToken || Deno.env.get('IG_ACCESS_TOKEN') || '').trim()
    const userId = String(val.igUserId || Deno.env.get('IG_USER_ID') || '').trim()
    return { igUserId: userId, igAccessToken: token }
  } catch {
    return {
      igUserId: String(Deno.env.get('IG_USER_ID') || '').trim(),
      igAccessToken: String(Deno.env.get('IG_ACCESS_TOKEN') || '').trim()
    }
  }
}

async function fetchIgGraph(path: string, token: string): Promise<{ ok: boolean; data: any; via: string; error?: string }> {
  const sep = path.includes('?') ? '&' : '?'
  const hosts = [
    { name: 'graph.instagram.com', base: 'https://graph.instagram.com/v21.0' },
    { name: 'graph.facebook.com', base: 'https://graph.facebook.com/v21.0' }
  ]
  let lastErr = 'Gagal menghubungi Instagram Graph API'
  for (const h of hosts) {
    try {
      const r = await fetch(`${h.base}/${path}${sep}access_token=${encodeURIComponent(token)}`)
      const j = await r.json().catch(() => ({}))
      if (r.ok && !j.error) {
        return { ok: true, data: j, via: h.name }
      }
      lastErr = j?.error?.message || `HTTP ${r.status}`
    } catch (e) {
      lastErr = String((e as Error)?.message || e)
    }
  }
  return { ok: false, data: null, via: '', error: lastErr }
}

async function handleYouTube(targetUrl: string, parsed: URL) {
  const vid = extractYouTubeId(parsed)
  const fallbackThumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : ''
  let title = ''
  let author = ''
  let thumb = fallbackThumb
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`
    const r = await fetch(oembedUrl)
    if (r.ok) {
      const j = await r.json()
      title = String(j.title || '').trim()
      author = String(j.author_name || '').trim()
      if (j.thumbnail_url) thumb = String(j.thumbnail_url)
    }
  } catch {
    /* pakai fallbackThumb */
  }
  return {
    url: targetUrl,
    platform: 'youtube',
    title: title || 'Video YouTube',
    description: author ? `Video oleh ${author}` : '',
    image: thumb,
    images: thumb ? [thumb] : [],
    siteName: 'YouTube',
    needsMirror: false,
    needsManualImage: !thumb
  }
}

async function handleTikTok(targetUrl: string) {
  try {
    const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(targetUrl)}`)
    if (r.ok) {
      const j = await r.json()
      const thumb = String(j.thumbnail_url || '').trim()
      return {
        url: targetUrl,
        platform: 'tiktok',
        title: String(j.author_name ? `${j.author_name} di TikTok` : 'Video TikTok'),
        description: String(j.title || '').trim().slice(0, 600),
        image: thumb,
        images: thumb ? [thumb] : [],
        siteName: 'TikTok',
        needsMirror: Boolean(thumb),
        needsManualImage: !thumb
      }
    }
  } catch {
    /* fallback */
  }
  return {
    url: targetUrl,
    platform: 'tiktok',
    title: 'Konten TikTok',
    description: '',
    image: '',
    images: [],
    siteName: 'TikTok',
    needsMirror: false,
    needsManualImage: true,
    note: 'Thumbnail TikTok tidak bisa diambil otomatis. Anda tetap bisa upload thumbnail manual.'
  }
}

async function handleInstagram(db: ReturnType<typeof createClient>, targetUrl: string, parsed: URL) {
  const shortcode = extractIgShortcode(parsed)
  const { igUserId, igAccessToken } = await getIgConfig(db)

  if (igAccessToken) {
    const targetNode = igUserId || 'me'
    const fields =
      'id,caption,media_type,media_url,thumbnail_url,permalink,children{media_type,media_url,thumbnail_url}'
    const res = await fetchIgGraph(`${targetNode}/media?fields=${encodeURIComponent(fields)}&limit=50`, igAccessToken)

    if (res.ok && Array.isArray(res.data?.data)) {
      const list = res.data.data as any[]
      const matched = shortcode
        ? list.find((item) => {
            const p = String(item.permalink || '')
            return p.includes(`/${shortcode}/`) || p.endsWith(`/${shortcode}`)
          })
        : null

      if (matched) {
        const imgs: string[] = []
        if (matched.media_type === 'CAROUSEL_ALBUM' && Array.isArray(matched.children?.data)) {
          for (const child of matched.children.data) {
            const u = child.media_type === 'VIDEO' ? child.thumbnail_url || child.media_url : child.media_url
            if (u) imgs.push(String(u))
          }
        } else if (matched.media_type === 'VIDEO' || matched.media_type === 'REELS') {
          const u = matched.thumbnail_url || matched.media_url
          if (u) imgs.push(String(u))
        } else if (matched.media_url) {
          imgs.push(String(matched.media_url))
        }

        const caption = String(matched.caption || '').trim()
        const firstLine = caption.split(/\r?\n/)[0]?.trim() || ''
        const title = firstLine.length > 90 ? firstLine.slice(0, 90) + '…' : firstLine

        return {
          url: String(matched.permalink || targetUrl),
          platform: 'instagram',
          title,
          description: caption,
          image: imgs[0] || '',
          images: imgs,
          siteName: 'Instagram',
          needsMirror: imgs.length > 0,
          needsManualImage: imgs.length === 0,
          note:
            imgs.length > 1
              ? `Berhasil mengambil ${imgs.length} foto carousel dari Instagram Graph API.`
              : 'Berhasil mengambil postingan dari Instagram Graph API.'
        }
      }

      return {
        url: targetUrl,
        platform: 'instagram',
        title: '',
        description: '',
        image: '',
        images: [],
        siteName: 'Instagram',
        needsMirror: false,
        needsManualImage: true,
        note: 'Postingan tidak ditemukan di 50 kiriman terbaru akun IG yang terhubung (atau berasal dari akun lain). Silakan upload thumbnail manual.'
      }
    }

    return {
      url: targetUrl,
      platform: 'instagram',
      title: '',
      description: '',
      image: '',
      images: [],
      siteName: 'Instagram',
      needsMirror: false,
      needsManualImage: true,
      note: `Instagram Graph API gagal (${res.error || 'cek token'}). Anda tetap bisa upload thumbnail manual.`
    }
  }

  // Fallback Iframely bila tersedia di secrets
  const KEY = Deno.env.get('IFRAMELY_KEY') || ''
  if (KEY) {
    try {
      const r = await fetch(
        `https://iframe.ly/api/oembed?url=${encodeURIComponent(targetUrl)}&api_key=${KEY}&iframe=0`
      )
      if (r.ok) {
        const j = await r.json()
        const img = String(j.thumbnail_url || '').trim()
        return {
          url: targetUrl,
          platform: 'instagram',
          title: String(j.title || '').trim(),
          description: String(j.description || '').trim(),
          image: img,
          images: img ? [img] : [],
          siteName: 'Instagram',
          needsMirror: Boolean(img),
          needsManualImage: !img
        }
      }
    } catch {
      /* lanjut fallback */
    }
  }

  return {
    url: targetUrl,
    platform: 'instagram',
    title: '',
    description: '',
    image: '',
    images: [],
    siteName: 'Instagram',
    needsMirror: false,
    needsManualImage: true,
    note: 'Token Instagram Graph API belum diisi di Pengaturan > Pengaturan Postingan. Anda tetap bisa isi caption & upload thumbnail manual.'
  }
}

async function handleMirrorImages(db: ReturnType<typeof createClient>, postId: string, urls: string[]) {
  const safePostId = String(postId || `post_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '')
  const out: string[] = []
  const list = Array.isArray(urls) ? urls.slice(0, 10) : []

  for (let i = 0; i < list.length; i++) {
    const raw = String(list[i] || '').trim()
    if (!raw) continue
    try {
      const parsed = new URL(raw)
      if (!['http:', 'https:'].includes(parsed.protocol) || isBlockedHost(parsed.hostname)) {
        out.push(raw)
        continue
      }
      const ctrl = new AbortController()
      const to = setTimeout(() => ctrl.abort(), 15000)
      const r = await fetch(raw, { redirect: 'follow', signal: ctrl.signal })
      clearTimeout(to)
      if (!r.ok) {
        out.push(raw)
        continue
      }
      const ct = (r.headers.get('content-type') || 'image/jpeg').split(';')[0].trim().toLowerCase()
      if (!ct.startsWith('image/')) {
        out.push(raw)
        continue
      }
      const buf = new Uint8Array(await r.arrayBuffer())
      if (buf.byteLength === 0 || buf.byteLength > 6 * 1024 * 1024) {
        out.push(raw)
        continue
      }
      const ext = ct === 'image/png' ? 'png' : ct === 'image/webp' ? 'webp' : 'jpg'
      const path = `beranda_post/${safePostId}/ext_${Date.now()}_${i}.${ext}`
      const { error } = await db.storage.from('photo').upload(path, buf, {
        contentType: ct,
        upsert: true
      })
      if (error) {
        out.push(raw)
        continue
      }
      const { data: pub } = db.storage.from('photo').getPublicUrl(path)
      out.push(pub?.publicUrl || raw)
    } catch {
      out.push(raw)
    }
  }
  return out
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(SUPABASE_URL, SERVICE_KEY)

  let body: Record<string, any> = {}
  if (req.method === 'POST') {
    try {
      body = await req.json()
    } catch {
      body = {}
    }
  }

  // Mode 1: Tes koneksi Instagram Graph API (dari PengaturanView)
  if (body.action === 'test_ig') {
    const saved = await getIgConfig(db)
    const token = String(body.igAccessToken || saved.igAccessToken || '').trim()
    const userId = String(body.igUserId || saved.igUserId || '').trim()
    if (!token) return json({ ok: false, error: 'Access Token belum diisi.' }, 400)
    const node = userId || 'me'
    const res = await fetchIgGraph(`${node}?fields=id,username,name,media_count`, token)
    if (!res.ok) return json({ ok: false, error: res.error || 'Token tidak valid' }, 200)
    return json({
      ok: true,
      id: res.data?.id || userId,
      username: res.data?.username || '',
      name: res.data?.name || '',
      media_count: res.data?.media_count ?? null,
      via: res.via
    })
  }

  // Mode 2: Mirror gambar eksternal (CDN Instagram/TikTok) ke Supabase Storage `photo`
  if (body.action === 'mirror_images') {
    const urls = await handleMirrorImages(db, String(body.postId || ''), body.urls || [])
    return json({ urls })
  }

  // Mode 3: Ambil preview URL (GET ?url=... atau POST { url })
  const targetUrl = String(body.url || new URL(req.url).searchParams.get('url') || '').trim()
  if (!targetUrl) return json({ error: 'Missing ?url= parameter' }, 400)

  let parsed: URL
  try {
    parsed = new URL(targetUrl)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return json({ error: 'Only http/https URLs allowed' }, 400)
    }
  } catch {
    return json({ error: 'Invalid URL' }, 400)
  }
  if (isBlockedHost(parsed.hostname)) {
    return json({ error: 'Host not allowed' }, 400)
  }

  // YouTube — langsung via oEmbed + thumbnail HD (tidak perlu cache DB lama)
  if (YT_HOST.test(parsed.hostname)) {
    const yt = await handleYouTube(targetUrl, parsed)
    return json(yt)
  }

  // Instagram — langsung via Instagram Graph API (jangan pakai cache 7 hari karena URL CDN IG expired)
  if (IG_HOST.test(parsed.hostname)) {
    const ig = await handleInstagram(db, targetUrl, parsed)
    return json(ig)
  }

  // TikTok — via TikTok oEmbed gratis
  if (TT_HOST.test(parsed.hostname)) {
    const tt = await handleTikTok(targetUrl)
    return json(tt)
  }

  const cacheKey = btoa(targetUrl).replace(/[^a-zA-Z0-9]/g, '').substring(0, 100)

  // Cache HIT (TTL 7 hari) untuk situs web biasa
  try {
    const { data: row } = await db
      .from('link_preview_cache')
      .select('data, created_at')
      .eq('id', cacheKey)
      .maybeSingle()
    if (row?.data) {
      const cachedAt = new Date(row.created_at).getTime()
      if (Date.now() - cachedAt < TTL_MS) return json(row.data)
    }
  } catch {
    /* cache miss -> lanjut fetch */
  }

  let result: Record<string, any> = {
    url: targetUrl,
    platform: 'web',
    title: '',
    description: '',
    image: '',
    images: [],
    siteName: parsed.hostname,
    needsMirror: false,
    needsManualImage: false
  }

  // Sosial media lain (FB/X/Threads) -> Iframely (bila key di-set)
  if (SOCIAL_OTHER.test(parsed.hostname)) {
    const KEY = Deno.env.get('IFRAMELY_KEY') || ''
    if (KEY) {
      try {
        const r = await fetch(
          `https://iframe.ly/api/oembed?url=${encodeURIComponent(targetUrl)}&api_key=${KEY}&iframe=0`
        )
        if (r.ok) {
          const j = await r.json()
          const img = String(j.thumbnail_url || '').trim()
          result = {
            url: targetUrl,
            platform: 'web',
            title: String(j.title || '').trim(),
            description: String(j.description || '').trim(),
            image: img,
            images: img ? [img] : [],
            siteName: j.provider_name || parsed.hostname,
            needsMirror: Boolean(img),
            needsManualImage: !img
          }
          await cacheWrite(db, cacheKey, result)
          return json(result)
        }
      } catch {
        /* fallback OG scraping di bawah */
      }
    } else {
      result.title = parsed.hostname
      result.description = 'Konten di ' + parsed.hostname
      result.needsManualImage = true
      return json(result)
    }
  }

  // Fetch HTML + parse OG/meta
  try {
    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 12000)
    const r = await fetch(targetUrl, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MambaulUlumBot/1.0; +https://almanshur.id)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'id,en;q=0.5'
      }
    })
    clearTimeout(to)
    if (!r.ok) return json({ error: `Target returned ${r.status}` }, 502)
    const ct = r.headers.get('content-type') || ''
    if (!ct.includes('text/html')) return json({ error: 'Target is not HTML' }, 415)
    const html = (await r.text()).slice(0, 1024 * 1024)

    const titleTag = (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim()
    result.title =
      metaContent(html, [...meta('og:title'), ...meta('twitter:title'), ...meta('name')]) ||
      titleTag ||
      parsed.hostname
    if (result.title.length > 200) result.title = result.title.substring(0, 200) + '...'
    result.description = metaContent(html, [
      ...meta('og:description'),
      ...meta('twitter:description'),
      ...meta('description')
    ]).substring(0, 400)
    const imgRaw = metaContent(html, [
      ...meta('og:image'),
      ...meta('og:image:url'),
      ...meta('twitter:image'),
      ...meta('twitter:image:src'),
      ...meta('image')
    ])
    try {
      result.image = imgRaw ? new URL(imgRaw, targetUrl).href : ''
    } catch {
      result.image = imgRaw
    }
    result.images = result.image ? [result.image] : []
    result.needsManualImage = !result.image
    result.siteName =
      metaContent(html, [...meta('og:site_name'), ...meta('application-name')]) || parsed.hostname
  } catch (e) {
    return json({ error: 'Fetch timeout or error: ' + String((e as Error)?.message || e) }, 504)
  }

  await cacheWrite(db, cacheKey, result)
  return json(result)
})

async function cacheWrite(db: ReturnType<typeof createClient>, id: string, data: Record<string, any>) {
  try {
    await db.from('link_preview_cache').upsert({ id, data })
  } catch {
    /* best-effort */
  }
}
