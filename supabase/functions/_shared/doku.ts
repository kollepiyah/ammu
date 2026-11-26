// doku.ts — v.1.5.5 (Kyai 26 Nov 2026): gerbang pembayaran KEDUA di samping Midtrans, dipakai
// selama akun Midtrans yayasan menunggu pembaruan Kemenkumham. Kanal, biaya layanan, dan keranjang
// tetap memakai _shared/midtrans.ts (satu sumber); di sini hanya yang khas DOKU.
//
// Jalur: DOKU Checkout (halaman bayar DOKU) — skema VA/QRIS "Direct API non-SNAP" tak lengkap di
// dokumentasi publik, Checkout terdokumentasi penuh (developers.doku.com, dibaca 26 Nov 2026).
// Murni tanpa API Deno (crypto.subtle tersedia di Deno & Node) supaya bisa diuji vitest.
import type { Kanal, ItemBayar } from './midtrans.ts'

export function urlDoku(env: unknown) {
  const produksi = String(env || '').toLowerCase() === 'production'
  return {
    sandbox: !produksi,
    api: produksi ? 'https://api.doku.com' : 'https://api-sandbox.doku.com'
  }
}

/** Kanal Ammu → payment_method_types DOKU Checkout. */
export const METODE_DOKU: Record<string, string> = {
  bri: 'VIRTUAL_ACCOUNT_BRI',
  bni: 'VIRTUAL_ACCOUNT_BNI',
  bca: 'VIRTUAL_ACCOUNT_BCA',
  bsi: 'VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI',
  mandiri: 'VIRTUAL_ACCOUNT_BANK_MANDIRI',
  qris: 'QRIS'
}

/** invoice_number DOKU: ≤ 64 karakter (≤ 30 bila kartu kredit aktif) — dibuat ≤ 30, tanpa simbol selain '-'. */
export function buatInvoiceDoku(santriId: unknown, nowMs: number, acak: string): string {
  const s = String(santriId || '')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 10)
  const r = String(acak || '')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 6)
  return `dk-${s}-${nowMs.toString(36)}${r}`.slice(0, 30)
}

/** Request-Timestamp DOKU: ISO8601 UTC tanpa milidetik, mis. 2026-11-26T01:02:03Z. */
export function stempelWaktu(ms: number): string {
  return new Date(ms).toISOString().replace(/\.\d{3}Z$/, 'Z')
}

function base64(buf: ArrayBuffer): string {
  let s = ''
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b)
  return btoa(s)
}

/** Digest = base64(SHA-256(badan JSON persis seperti dikirim)). */
export async function digestDoku(badan: string): Promise<string> {
  return base64(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(badan)))
}

/** Teks yang ditandatangani — baris dipisah "\n", tanpa baris Digest untuk GET. */
export function teksTandaTangan(p: {
  clientId: string
  requestId: string
  timestamp: string
  target: string
  digest?: string
}): string {
  const baris = [
    `Client-Id:${p.clientId}`,
    `Request-Id:${p.requestId}`,
    `Request-Timestamp:${p.timestamp}`,
    `Request-Target:${p.target}`
  ]
  if (p.digest) baris.push(`Digest:${p.digest}`)
  return baris.join('\n')
}

/** Nilai header Signature: "HMACSHA256=" + base64(HMAC-SHA256(teks, Secret Key)). */
export async function tandaTanganDoku(teks: string, secretKey: string): Promise<string> {
  const kunci = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', kunci, new TextEncoder().encode(teks))
  return 'HMACSHA256=' + base64(sig)
}

/** Header lengkap untuk memanggil API DOKU (POST memakai Digest, GET tidak). */
export async function headerDoku(p: {
  clientId: string
  secretKey: string
  requestId: string
  nowMs: number
  target: string
  badan?: string
}): Promise<Record<string, string>> {
  const timestamp = stempelWaktu(p.nowMs)
  const digest = p.badan !== undefined ? await digestDoku(p.badan) : undefined
  const teks = teksTandaTangan({
    clientId: p.clientId,
    requestId: p.requestId,
    timestamp,
    target: p.target,
    digest
  })
  const h: Record<string, string> = {
    'Client-Id': p.clientId,
    'Request-Id': p.requestId,
    'Request-Timestamp': timestamp,
    Signature: await tandaTanganDoku(teks, p.secretKey)
  }
  if (p.badan !== undefined) h['Content-Type'] = 'application/json'
  return h
}

/** Bandingkan tanda tangan notifikasi DOKU dengan hitungan sendiri. */
export async function notifikasiSah(p: {
  headers: { clientId: string; requestId: string; timestamp: string; signature: string }
  target: string
  badanMentah: string
  clientId: string
  secretKey: string
}): Promise<boolean> {
  const h = p.headers
  if (!h.signature || !p.secretKey || h.clientId !== p.clientId) return false
  const teks = teksTandaTangan({
    clientId: h.clientId,
    requestId: h.requestId,
    timestamp: h.timestamp,
    target: p.target,
    digest: await digestDoku(p.badanMentah)
  })
  return (await tandaTanganDoku(teks, p.secretKey)) === h.signature
}

/**
 * Badan POST /checkout/v1/payment. Jumlah = total yang dibayar wali (bersih + biaya layanan);
 * hanya satu metode supaya halaman DOKU langsung menampilkan nomor VA / QR pilihan wali.
 */
export function bangunCheckout(p: {
  invoice: string
  kanal: Kanal
  items: ItemBayar[]
  biaya: number
  santriNama: string
  notifUrl: string
}) {
  const total = p.items.reduce((s, it) => s + Math.round(it.nominal), 0) + Math.round(p.biaya)
  return {
    order: {
      amount: total,
      invoice_number: p.invoice,
      currency: 'IDR',
      auto_redirect: false
    },
    payment: {
      // VA sehari, QR sejam — kode menggantung lama mengundang bayar dobel (sama dgn Midtrans).
      payment_due_date: p.kanal.jenis === 'qris' ? 60 : 1440,
      payment_method_types: [METODE_DOKU[p.kanal.id]].filter(Boolean)
    },
    customer: { name: String(p.santriNama || 'Santri').slice(0, 255) },
    additional_info: { override_notification_url: p.notifUrl }
  }
}

/** "yyyyMMddHHmmss" (WIB, format DOKU) → ISO; '' bila tak terbaca. */
export function isoDariWaktuDoku(v: unknown): string {
  const m = String(v || '').match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
  return m ? new Date(`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}+07:00`).toISOString() : ''
}

/** Jawaban Checkout → tautan halaman bayar. */
// deno-lint-ignore no-explicit-any
export function bacaHasilCheckout(j: any, httpOk: boolean) {
  const url = String(j?.response?.payment?.url || '')
  const ok = httpOk && /^https:\/\//.test(url)
  return {
    ok,
    url,
    galat: ok
      ? ''
      : [
          ...(Array.isArray(j?.error_messages) ? j.error_messages : []),
          ...(Array.isArray(j?.message) ? j.message : [])
        ]
          .filter(Boolean)
          .join('; ') || 'DOKU menolak permintaan.',
    expiryAt: isoDariWaktuDoku(j?.response?.payment?.expired_date),
    tokenId: String(j?.response?.payment?.token_id || '')
  }
}

/** transaction.status DOKU → tindakan Ammu (nama sama dengan putusanStatus Midtrans). */
export function putusanStatusDoku(
  status: unknown
): 'lunas' | 'menunggu' | 'kadaluarsa' | 'batal' | 'abaikan' {
  const s = String(status || '').toUpperCase()
  if (s === 'SUCCESS') return 'lunas'
  if (s === 'PENDING') return 'menunggu'
  if (s === 'EXPIRED') return 'kadaluarsa'
  if (s === 'FAILED') return 'batal'
  return 'abaikan'
}
