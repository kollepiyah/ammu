// midtrans.ts — v.1.4.9 gel. 2: logika murni pembayaran online wali lewat Midtrans Snap.
//
// Bagian ATAS (kanal + biaya layanan) adalah CERMIN vue-app/src/utils/biayaMidtrans.js — layar
// memakai yang .js untuk pratinjau, fungsi server memakai yang .ts untuk angka yang ditagihkan.
// Dijaga tests/unit/midtransMirrorEdge.test.js; ubah keduanya bersamaan.
// Bagian BAWAH (payload Snap, tanda tangan notifikasi, status) hanya dipakai server.
// Murni tanpa API Deno supaya bisa diuji vitest.

export type Kanal = { id: string; jenis: 'va' | 'qris'; snap: string; label: string; core: boolean }

export const KANAL_MIDTRANS: Kanal[] = [
  // `core` = ditampilkan di layar Ammu sendiri lewat Core API (Kyai, 4 Nov 2026: "seperti
  //   Shopee"). BSI tak terdokumentasi di Core API → tetap lewat Snap (jendela Midtrans).
  { id: 'bri', jenis: 'va', snap: 'bri_va', label: 'BRI', core: true },
  { id: 'bni', jenis: 'va', snap: 'bni_va', label: 'BNI', core: true },
  { id: 'bca', jenis: 'va', snap: 'bca_va', label: 'BCA', core: true },
  { id: 'bsi', jenis: 'va', snap: 'bsi_va', label: 'BSI', core: false },
  { id: 'mandiri', jenis: 'va', snap: 'echannel', label: 'Mandiri', core: true },
  { id: 'qris', jenis: 'qris', snap: 'other_qris', label: 'QRIS', core: true }
]

export const BIAYA_VA_BAWAAN = 4500
export const BIAYA_QRIS_PERSEN_BAWAAN = 0.78
export const MIN_BAYAR: Record<string, number> = { va: 10000, qris: 1000 }
export const MAKS_QRIS = 10000000

// deno-lint-ignore no-explicit-any
type Setelan = Record<string, any> | null | undefined

export function midtransAktif(settings: Setelan): boolean {
  return !!settings && settings.midtrans_aktif === true
}

export function cariKanal(id: unknown): Kanal | null {
  return KANAL_MIDTRANS.find((k) => k.id === String(id || '')) || null
}

export function kanalAktif(settings: Setelan): Kanal[] {
  const pilih = Array.isArray(settings?.midtrans_kanal)
    ? settings!.midtrans_kanal.map((x: unknown) => String(x))
    : []
  return KANAL_MIDTRANS.filter((k) => !pilih.length || pilih.includes(k.id))
}

function angka(v: unknown, bawaan: number): number {
  if (v === '' || v === null || v === undefined) return bawaan
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? n : bawaan
}

export function hitungBiayaLayanan(net: unknown, kanalId: unknown, settings: Setelan): number {
  const k = cariKanal(kanalId)
  const n = Math.max(0, Math.round(Number(net) || 0))
  if (!k || n <= 0) return 0
  if (k.jenis === 'va') return Math.round(angka(settings?.midtrans_biaya_va, BIAYA_VA_BAWAAN))
  const p = Math.min(angka(settings?.midtrans_biaya_qris_persen, BIAYA_QRIS_PERSEN_BAWAAN), 50)
  if (p <= 0) return 0
  const total = Math.ceil(n / (1 - p / 100))
  return Math.ceil((total - n) / 100) * 100
}

export function rincianBayar(net: unknown, kanalId: unknown, settings: Setelan) {
  const k = cariKanal(kanalId)
  const n = Math.max(0, Math.round(Number(net) || 0))
  const biaya = hitungBiayaLayanan(n, kanalId, settings)
  const total = n + biaya
  let galat = ''
  if (!k) galat = 'Pilih cara bayar.'
  else if (n < MIN_BAYAR[k.jenis])
    galat = `Minimal pembayaran Rp${MIN_BAYAR[k.jenis].toLocaleString('id-ID')}.`
  else if (k.jenis === 'qris' && total > MAKS_QRIS)
    galat = 'QRIS maksimal Rp10.000.000 per transaksi — pakai Virtual Account.'
  return { net: n, biaya, total, galat }
}

// ─────────────────────────── khusus server ───────────────────────────

export type ItemBayar =
  | { tipe: 'tagihan'; tagihan_id: string; kategori?: string; periode?: string; nominal: number }
  | { tipe: 'uang_saku'; nominal: number }

// Kunci Server sandbox berawalan "SB-"; production tidak. Lingkungan diturunkan dari kuncinya
// supaya tak mungkin kunci sandbox menembak API production (atau sebaliknya).
export function urlMidtrans(serverKey: string) {
  const sandbox = /^SB-/i.test(String(serverKey || ''))
  return {
    sandbox,
    snap: sandbox
      ? 'https://app.sandbox.midtrans.com/snap/v1/transactions'
      : 'https://app.midtrans.com/snap/v1/transactions',
    api: sandbox ? 'https://api.sandbox.midtrans.com' : 'https://api.midtrans.com'
  }
}

/** Order id Midtrans: huruf/angka/'-', ≤ 50 karakter, unik per pembuatan. */
export function buatOrderId(santriId: unknown, nowMs: number, acak: string): string {
  const s = String(santriId || '')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 20)
  const r = String(acak || '')
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 6)
  return `mt-${s}-${nowMs.toString(36)}${r}`.slice(0, 50)
}

/**
 * Badan permintaan Snap. Jumlah item_details WAJIB sama dengan gross_amount (aturan Midtrans):
 * item keranjang + satu baris "Biaya layanan".
 */
export function bangunSnap(p: {
  orderId: string
  kanal: Kanal
  items: ItemBayar[]
  biaya: number
  santriNama: string
}) {
  const item_details = p.items.map((it) =>
    it.tipe === 'tagihan'
      ? {
          id: String(it.tagihan_id).slice(0, 50),
          price: Math.round(it.nominal),
          quantity: 1,
          name: [it.kategori || 'Tagihan', it.periode || ''].join(' ').trim().slice(0, 50)
        }
      : { id: 'uang_saku', price: Math.round(it.nominal), quantity: 1, name: 'Top-up Uang Saku' }
  )
  if (p.biaya > 0)
    item_details.push({
      id: 'biaya_layanan',
      price: Math.round(p.biaya),
      quantity: 1,
      name: `Biaya layanan ${p.kanal.jenis === 'qris' ? 'QRIS' : 'VA ' + p.kanal.label}`
    })
  const gross = item_details.reduce((s, x) => s + x.price * x.quantity, 0)
  return {
    transaction_details: { order_id: p.orderId, gross_amount: gross },
    item_details,
    customer_details: { first_name: String(p.santriNama || 'Santri').slice(0, 255) },
    enabled_payments: [p.kanal.snap],
    // VA berlaku sehari; QR cukup sejam — kode yang menggantung lama mengundang bayar dobel.
    expiry: p.kanal.jenis === 'qris' ? { unit: 'minutes', duration: 60 } : { unit: 'hours', duration: 24 }
  }
}

async function sha512Hex(teks: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(teks))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** signature_key notifikasi = SHA512(order_id + status_code + gross_amount + ServerKey). */
export async function tandaTanganSah(
  // deno-lint-ignore no-explicit-any
  n: any,
  serverKey: string
): Promise<boolean> {
  if (!n || !serverKey || !n.signature_key) return false
  const harap = await sha512Hex(
    String(n.order_id ?? '') + String(n.status_code ?? '') + String(n.gross_amount ?? '') + serverKey
  )
  return harap === String(n.signature_key).toLowerCase()
}

/** Status Midtrans → tindakan Ammu. */
export function putusanStatus(
  transaksi: unknown,
  fraud?: unknown
): 'lunas' | 'menunggu' | 'kadaluarsa' | 'batal' | 'abaikan' {
  const s = String(transaksi || '').toLowerCase()
  if (s === 'settlement') return 'lunas'
  if (s === 'capture') return !fraud || String(fraud).toLowerCase() === 'accept' ? 'lunas' : 'menunggu'
  if (s === 'pending') return 'menunggu'
  if (s === 'expire') return 'kadaluarsa'
  if (s === 'cancel' || s === 'deny' || s === 'failure') return 'batal'
  return 'abaikan'
}

/** Nomor yang diketik wali di m-banking, dari respons status/notifikasi Midtrans. */
// deno-lint-ignore no-explicit-any
export function nomorBayar(st: any): { nomor: string; kodePerusahaan: string } {
  const va = Array.isArray(st?.va_numbers) && st.va_numbers[0]?.va_number
  if (va) return { nomor: String(va), kodePerusahaan: '' }
  if (st?.permata_va_number) return { nomor: String(st.permata_va_number), kodePerusahaan: '' }
  if (st?.bill_key) return { nomor: String(st.bill_key), kodePerusahaan: String(st.biller_code || '') }
  return { nomor: '', kodePerusahaan: '' }
}

/** Uang yang dicatat untuk santri = yang dibayar wali dikurangi biaya layanan (ditanggung wali). */
export function nominalBersih(gross: unknown, biayaLayanan: unknown): number {
  const g = Math.round(Number(gross) || 0)
  const b = Math.max(0, Math.round(Number(biayaLayanan) || 0))
  return Math.max(0, g - b)
}

// ─────────────── Core API (v.1.4.9 gel. 2: tampil di layar Ammu) ───────────────

/** Masa berlaku kode bayar: VA sehari, QR sejam (kode menggantung lama mengundang bayar dobel). */
export function masaBerlaku(kanal: Kanal): { expiry_duration: number; unit: 'hour' | 'minute' } {
  return kanal.jenis === 'qris'
    ? { expiry_duration: 60, unit: 'minute' }
    : { expiry_duration: 24, unit: 'hour' }
}

/**
 * Badan POST /v2/charge (Core API). item_details sama dengan Snap — jumlahnya WAJIB = gross.
 * Hanya untuk kanal `core`; BSI tetap Snap.
 */
export function bangunCharge(p: {
  orderId: string
  kanal: Kanal
  items: ItemBayar[]
  biaya: number
  santriNama: string
}) {
  const snap = bangunSnap(p)
  // deno-lint-ignore no-explicit-any
  const dasar: any = {
    transaction_details: snap.transaction_details,
    item_details: snap.item_details,
    customer_details: snap.customer_details,
    custom_expiry: masaBerlaku(p.kanal)
  }
  if (p.kanal.jenis === 'qris') return { ...dasar, payment_type: 'qris', qris: { acquirer: 'gopay' } }
  if (p.kanal.id === 'mandiri')
    // bill_info1 dipotong 10 karakter, bill_info2 30 (aturan Midtrans).
    return {
      ...dasar,
      payment_type: 'echannel',
      echannel: { bill_info1: 'Pembayaran', bill_info2: 'Ammu Online' }
    }
  return { ...dasar, payment_type: 'bank_transfer', bank_transfer: { bank: p.kanal.id } }
}

/** "YYYY-MM-DD HH:mm:ss" (WIB, format Midtrans) → ISO; '' bila tak terbaca. */
export function isoDariWaktuMidtrans(v: unknown): string {
  const m = String(v || '').match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/)
  return m ? new Date(`${m[1]}T${m[2]}+07:00`).toISOString() : ''
}

/**
 * Hasil charge Core API → yang perlu ditampilkan Ammu. Midtrans menjawab HTTP 200/201 dengan
 * `status_code` di badan; hanya '201' (pending) yang berarti kode bayar terbit.
 */
// deno-lint-ignore no-explicit-any
export function bacaHasilCharge(j: any, kanal: Kanal, nowMs: number) {
  const ok = String(j?.status_code || '') === '201'
  const nb = nomorBayar(j)
  const aksiQr = Array.isArray(j?.actions)
    ? j.actions.find((a: { name?: string }) => a?.name === 'generate-qr-code')
    : null
  const dur = masaBerlaku(kanal)
  const cadangan = new Date(
    nowMs + dur.expiry_duration * (dur.unit === 'hour' ? 3600_000 : 60_000)
  ).toISOString()
  return {
    ok,
    galat: ok
      ? ''
      : [j?.status_message, ...(Array.isArray(j?.validation_messages) ? j.validation_messages : [])]
          .filter(Boolean)
          .join('; ') || 'Midtrans menolak permintaan.',
    nomor: nb.nomor,
    kodePerusahaan: nb.kodePerusahaan,
    qrUrl: String(aksiQr?.url || ''),
    qrString: String(j?.qr_string || ''),
    transactionId: String(j?.transaction_id || ''),
    expiryAt: isoDariWaktuMidtrans(j?.expiry_time) || cadangan
  }
}
