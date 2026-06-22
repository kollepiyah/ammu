// get-link-preview — pengganti Cloud Function `getLinkPreview`.
// Ambil metadata Open Graph dari sebuah URL (untuk kartu pratinjau link di posts).
// Sosial media (IG/TikTok/FB/X) lewat Iframely (scraping diblok). Cache 7 hari di
// tabel link_preview_cache (id = hash url, data jsonb, created_at utk TTL).
//
// GET ?url=<URL>  -> { url, title, description, image, siteName }
// DEPLOY: supabase functions deploy get-link-preview --no-verify-jwt
//   (publik/anon: dipanggil dari layar tanpa wajib sesi; tetap divalidasi URL.)
// Secret opsional: supabase secrets set IFRAMELY_KEY=...
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handlePreflight, json } from '../_shared/cors.ts'

const TTL_MS = 7 * 24 * 60 * 60 * 1000
const SOCIAL =
  /(?:instagram\.com|tiktok\.com|facebook\.com|twitter\.com|x\.com|threads\.net|pinterest\.com)/i

function metaContent(html: string, patterns: RegExp[]): string {
  for (const re of patterns) {
    const m = html.match(re)
    if (m && m[1]) return m[1].trim()
  }
  return ''
}
// Bangun regex meta property/name -> content (urutan atribut bebas).
function meta(prop: string): RegExp[] {
  const esc = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return [
    new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${esc}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name|itemprop)=["']${esc}["']`, 'i')
  ]
}

Deno.serve(async (req) => {
  const pre = handlePreflight(req)
  if (pre) return pre

  const targetUrl = new URL(req.url).searchParams.get('url') || ''
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

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(SUPABASE_URL, SERVICE_KEY)

  const cacheKey = btoa(targetUrl).replace(/[^a-zA-Z0-9]/g, '').substring(0, 100)

  // Cache HIT (TTL 7 hari)
  try {
    const { data: row } = await db.from('link_preview_cache').select('data, created_at').eq('id', cacheKey).maybeSingle()
    if (row?.data) {
      const cachedAt = new Date(row.created_at).getTime()
      if (Date.now() - cachedAt < TTL_MS) return json(row.data)
    }
  } catch (_e) { /* cache miss -> lanjut fetch */ }

  let result: Record<string, string> = { url: targetUrl }

  // Sosial media -> Iframely (bila key di-set), else fallback generik.
  if (SOCIAL.test(parsed.hostname)) {
    const KEY = Deno.env.get('IFRAMELY_KEY') || ''
    if (KEY) {
      try {
        const r = await fetch(
          `https://iframe.ly/api/oembed?url=${encodeURIComponent(targetUrl)}&api_key=${KEY}&iframe=0`
        )
        if (r.ok) {
          const j = await r.json()
          result = {
            url: targetUrl,
            title: String(j.title || '').trim(),
            description: String(j.description || '').trim(),
            image: j.thumbnail_url || '',
            siteName: j.provider_name || parsed.hostname
          }
          await cacheWrite(db, cacheKey, result)
          return json(result)
        }
      } catch (_e) { /* fallback OG scraping di bawah */ }
    } else {
      result = {
        url: targetUrl,
        title: parsed.hostname,
        description: 'Konten di ' + parsed.hostname,
        image: '',
        siteName: parsed.hostname
      }
      return json(result)
    }
  }

  // Fetch HTML + parse OG/meta.
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
    const html = (await r.text()).slice(0, 1024 * 1024) // maks 1 MB

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
    ]).substring(0, 280)
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
    result.siteName =
      metaContent(html, [...meta('og:site_name'), ...meta('application-name')]) || parsed.hostname
  } catch (e) {
    return json({ error: 'Fetch timeout or error: ' + String((e as Error)?.message || e) }, 504)
  }

  await cacheWrite(db, cacheKey, result)
  return json(result)
})

async function cacheWrite(db: ReturnType<typeof createClient>, id: string, data: Record<string, string>) {
  try {
    await db.from('link_preview_cache').upsert({ id, data })
  } catch (_e) { /* best-effort */ }
}
