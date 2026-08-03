<script setup>
// v.1.2.x: ModalPOS redesign gaya Braja — layar 1 santri = MATRIKS tagihan berwarna.
//   - Bulanan: baris = jenis (frekuensi bulanan), kolom = 12 bulan T.A. berjalan (Jul–Jun),
//     tiap sel DISINTESIS dari tarif jenis lalu diwarnai: belum/sebagian/lunas/lebih.
//   - Nonbulanan: jenis tahunan (Daftar Ulang, Seragam, dll) sbg daftar.
//   - Tunggakan Tahun Lalu: baris tagihan belum-lunas periode < T.A. berjalan (nyata, bukan sintesis).
//   - Item lain: jenis manual (ad-hoc) → chip tambah, nominal bebas.
//   Klik sel/baris (merah/pink) → masuk keranjang; klik lagi → batal. Lunas = read-only.
//   Warna sel = gabungan tagihan nyata + catatan pembayaran POS (periode_kode) di Buku Induk.
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'
// v.1.2.6: filter jenis per status santri · v.1.2.x: + filter jenis kelamin (Putra/Putri)
import { matchStatusOnly, matchJenisKelamin, matchShiftNgaji } from '@/utils/statusSantri'
import { terbayarDari } from '@/utils/tagihan'
import { todayJakarta } from '@/utils/format'

const settings = useSettingsStore()

const props = defineProps({
  open: { type: Boolean, default: false },
  santri: { type: Object, default: () => null },
  operator: { type: String, default: '' },
  // v.1.2.x: SEMUA tagihan santri (segala status) — utk matriks + tunggakan lama
  allTagihan: { type: Array, default: () => [] },
  // v.1.2.x: pembayaran POS santri (Buku Induk) — utk warnai sel bayar-muka tanpa baris tagihan
  posPayments: { type: Array, default: () => [] },
  // v.94.0626: transaksi tersimpan -> tampilkan layar sukses + tombol cetak DI DALAM modal
  savedTrx: { type: Object, default: () => null },
  saving: { type: Boolean, default: false },
  isDesktop: { type: Boolean, default: false }
})

const emit = defineEmits([
  'close',
  'simpan',
  'cetak-pdf',
  'cetak-dot',
  'cetak-langsung',
  'pengaturan-printer'
])

const BLN_FULL = [
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
]
const BLN_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des'
]

// ---- Tahun Ajaran berjalan (Juli = awal T.A.), 12 bulan Jul→Jun ----
function computeTA() {
  const d = new Date()
  const y = d.getFullYear()
  const sy = d.getMonth() >= 6 ? y : y - 1
  const months = []
  for (let i = 0; i < 12; i++) {
    const mm = ((6 + i) % 12) + 1 // i0=7(Jul)..i5=12(Des), i6=1(Jan)..i11=6(Jun)
    const yy = i < 6 ? sy : sy + 1
    months.push({
      kode: `${yy}-${String(mm).padStart(2, '0')}`,
      label: BLN_SHORT[mm - 1],
      full: `${BLN_FULL[mm - 1]} ${yy}`
    })
  }
  return { sy, label: `${sy}/${sy + 1}`, startKode: `${sy}-07`, months }
}
const ta = ref(computeTA())

const DEFAULT_PRESET = [
  { label: 'Syahriyah', nominal_default: 0, frekuensi: 'bulanan' },
  { label: 'Infaq', nominal_default: 0, frekuensi: 'manual' },
  { label: 'SPP', nominal_default: 0, frekuensi: 'bulanan' },
  { label: 'Daftar Ulang', nominal_default: 0, frekuensi: 'tahunan' },
  { label: 'Sumbangan Wajib', nominal_default: 0, frekuensi: 'tahunan' },
  { label: 'Lainnya', nominal_default: 0, frekuensi: 'manual' }
]
const presetList = computed(() => {
  const fromSetting = settings.settings?.keuTagihanJenis
  const santriLemb = String(props.santri?.lembaga || '').trim()
  const santriLembSekolah = String(props.santri?.lembaga_sekolah || '').trim()
  if (Array.isArray(fromSetting) && fromSetting.length > 0) {
    return fromSetting
      .filter((j) => {
        const lbl = String(j.label || j.nama || j.id || '')
          .toLowerCase()
          .trim()
        if (!lbl || lbl === 'tabungan') return false
        if (!matchStatusOnly(props.santri, j.status_only)) return false
        if (!matchJenisKelamin(props.santri, j.jk_only)) return false // v.1.2.x: Putra/Putri
        // Kyai 4 Agu: shift ngaji (pagi/sore) — kosong = semua. Santri yang shift_ngaji-nya
        //   belum diisi dianggap ikut KEDUANYA, jadi selnya tetap muncul (tak ada yang hilang
        //   dari matriks POS sebelum data dikoreksi guru kelas).
        if (!matchShiftNgaji(props.santri, j.shift_only)) return false
        const wl = Array.isArray(j.lembaga_only) ? j.lembaga_only.filter(Boolean) : []
        if (wl.length === 0) return true
        return wl.includes(santriLemb) || wl.includes(santriLembSekolah)
      })
      .map((j) => ({
        label: j.label || j.nama || j.id || '-',
        frekuensi: j.frekuensi || (j.auto_generate ? 'bulanan' : 'manual'),
        pos: j.pos || '',
        nominal_default: Number(j.nominal_default || j.nominal || 0) || 0,
        nominal_per_lembaga:
          j.nominal_per_lembaga && typeof j.nominal_per_lembaga === 'object'
            ? j.nominal_per_lembaga
            : {},
        nominal_per_kelas:
          j.nominal_per_kelas && typeof j.nominal_per_kelas === 'object' ? j.nominal_per_kelas : {}
      }))
  }
  return DEFAULT_PRESET
})
// Scope jenis ikut filter presetList (lembaga_only + status_only + jk_only, kosong = semua).
const jenisBulanan = computed(() => presetList.value.filter((j) => j.frekuensi === 'bulanan'))
const jenisTahunan = computed(() => presetList.value.filter((j) => j.frekuensi === 'tahunan'))
const jenisManual = computed(() =>
  presetList.value.filter((j) => !j.frekuensi || j.frekuensi === 'manual')
)
// v.1.2.x: bulan pertama pencatatan tagihan di AMMU (setelan). Sebelum ini = "belum aktif".
const mulaiKode = computed(() => {
  const m = String(settings.settings?.keuMulaiTagih || '').match(/^(\d{4})-(\d{2})$/)
  return m ? `${m[1]}-${m[2]}` : ta.value.startKode
})

function fmtRp(n) {
  if (!n && n !== 0) return 'Rp 0'
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n))
}

// ---- helper pencocokan ----
function jenisKeyStr(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
}
function tagJenis(t) {
  return jenisKeyStr(t?.kategori || t?.jenis_label || t?.jenis_id)
}
// periode teks "Juni 2026" / "2026-06" / jatuh_tempo → "2026-06"
function periodeKodeOf(t) {
  if (!t) return ''
  let m = String(t.periode_kode || '').match(/^(\d{4})-(\d{1,2})$/)
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}`
  const pr = String(t.periode || '')
  m = pr.match(/^(\d{4})[-_](\d{1,2})$/)
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}`
  m = pr.match(/([A-Za-z]+)\s+(\d{4})/)
  if (m) {
    const idx = BLN_FULL.findIndex((b) => b.toLowerCase() === m[1].toLowerCase())
    if (idx >= 0) return `${m[2]}-${String(idx + 1).padStart(2, '0')}`
  }
  m = String(t.jatuh_tempo || '').match(/^(\d{4})-(\d{2})/)
  if (m) return `${m[1]}-${m[2]}`
  return ''
}

// tarif 3-lapis: per_kelas → per_lembaga → default
function lookupNominal(label) {
  const match = presetList.value.find((p) => p.label === label)
  if (!match) return 0
  const lembagaKey = props.santri?.lembaga || ''
  const lembagaSekolahKey = props.santri?.lembaga_sekolah || ''
  const kelasKey = String(props.santri?.kelas || '')
  const kelasSekolahKey = String(props.santri?.kelas_sekolah || '')
  const perK = match.nominal_per_kelas || {}
  let lookup = 0
  for (const [lemb, kelasKey1, kelasKey2] of [
    [lembagaKey, kelasKey, kelasSekolahKey],
    [lembagaSekolahKey, kelasSekolahKey, kelasKey]
  ]) {
    if (!lemb) continue
    const inner = perK[lemb] || {}
    const v = Number(inner[kelasKey1] || inner[kelasKey2] || 0)
    if (v > 0) {
      lookup = v
      break
    }
  }
  if (lookup > 0) return lookup
  const perL = match.nominal_per_lembaga || {}
  const override = Number(perL[lembagaKey] || perL[lembagaSekolahKey] || 0)
  return override > 0 ? override : Number(match.nominal_default || 0)
}

function cellStatus(tariff, paid) {
  if (paid <= 0) return 'belum'
  if (paid < tariff - 0.5) return 'part'
  if (paid <= tariff + 0.5) return 'lunas'
  return 'lebih'
}
function posOf(label) {
  const m = presetList.value.find((p) => p.label === label)
  return m?.pos || ''
}

// ---- indeks tagihan & pembayaran ----
const tagByCell = computed(() => {
  const m = new Map()
  for (const t of props.allTagihan || []) m.set(tagJenis(t) + '|' + periodeKodeOf(t), t)
  return m
})
const paidByCell = computed(() => {
  const m = new Map()
  for (const p of props.posPayments || []) {
    const kode = String(p.periode_kode || '')
    if (!kode) continue
    const k = jenisKeyStr(p.kategori || p.jenis) + '|' + kode
    m.set(k, (m.get(k) || 0) + Number(p.nominal || 0))
  }
  return m
})
const jenisSet = computed(
  () =>
    new Set(
      [...jenisBulanan.value, ...jenisTahunan.value, ...jenisManual.value].map((j) =>
        jenisKeyStr(j.label)
      )
    )
)

// ---- Matriks Bulanan ----
const matrix = computed(() => {
  const rows = []
  for (const j of jenisBulanan.value) {
    const jk = jenisKeyStr(j.label)
    const baseTariff = lookupNominal(j.label)
    const cells = ta.value.months.map((mo) => {
      const cellKey = jk + '|' + mo.kode
      const tg = tagByCell.value.get(cellKey)
      let tariff, paid, tagId
      if (tg) {
        tariff = Number(tg.nominal || 0)
        paid = terbayarDari(tg)
        tagId = tg.id
      } else {
        tariff = baseTariff
        paid = Number(paidByCell.value.get(cellKey) || 0)
        tagId = null
      }
      if (tariff <= 0 && !tg) return { key: 'mx_' + jk + '_' + mo.kode, na: true }
      // v.1.2.x: bulan sebelum "mulai tagih" & belum ada tagihan/bayar → netral (bukan tunggakan)
      const pre = !tg && paid <= 0 && mo.kode < mulaiKode.value
      return {
        key: 'mx_' + jk + '_' + mo.kode,
        na: false,
        pre,
        jenis: j.label,
        ket: mo.full,
        kode: mo.kode,
        tariff,
        paid,
        sisa: Math.max(0, tariff - paid),
        status: pre ? 'pre' : cellStatus(tariff, paid),
        tagId,
        pos: tg?.pos || posOf(j.label)
      }
    })
    rows.push({ jenis: j.label, cells })
  }
  return rows
})

// ---- Nonbulanan (tahunan) + orphan tagihan T.A. berjalan ----
const nonbulananRows = computed(() => {
  const rows = []
  const taKodes = new Set(ta.value.months.map((m) => m.kode))
  for (const j of jenisTahunan.value) {
    const jk = jenisKeyStr(j.label)
    let tg = null
    for (const t of props.allTagihan || []) {
      if (tagJenis(t) !== jk) continue
      const pk = periodeKodeOf(t)
      if (taKodes.has(pk) || String(t.periode || '').includes(ta.value.label)) {
        tg = t
        break
      }
    }
    let tariff, paid, tagId, ket, kode
    if (tg) {
      tariff = Number(tg.nominal || 0)
      paid = terbayarDari(tg)
      tagId = tg.id
      ket = String(tg.periode || 'TA ' + ta.value.label)
      kode = periodeKodeOf(tg) || 'TA' + ta.value.sy
    } else {
      kode = 'TA' + ta.value.sy
      tariff = lookupNominal(j.label)
      paid = Number(paidByCell.value.get(jk + '|' + kode) || 0)
      tagId = null
      ket = 'TA ' + ta.value.label
    }
    if (tariff <= 0 && !tg) continue // tanpa tarif → lewat Item lain saja
    rows.push({
      key: 'nb_' + jk,
      jenis: j.label,
      ket,
      kode,
      tariff,
      paid,
      sisa: Math.max(0, tariff - paid),
      status: cellStatus(tariff, paid),
      tagId,
      pos: tg?.pos || posOf(j.label)
    })
  }
  // orphan: tagihan belum/partial T.A. berjalan yg jenisnya tak terdaftar (jangan sampai tersembunyi)
  const startK = ta.value.startKode
  for (const t of props.allTagihan || []) {
    const st = String(t.status || 'belum').toLowerCase()
    if (st !== 'belum' && st !== 'partial') continue
    const pk = periodeKodeOf(t)
    if (pk && pk < startK) continue // itu tunggakan lama
    if (jenisSet.value.has(tagJenis(t))) continue
    const tariff = Number(t.nominal || 0)
    const paid = terbayarDari(t)
    rows.push({
      key: 'orp_' + t.id,
      jenis: t.kategori || t.jenis_label || 'Tagihan',
      ket: t.periode || pk || '',
      kode: pk || '',
      tariff,
      paid,
      sisa: Math.max(0, tariff - paid),
      status: cellStatus(tariff, paid),
      tagId: t.id,
      pos: t.pos || ''
    })
  }
  return rows
})

// ---- Tunggakan Tahun Lalu (periode < T.A. berjalan, belum lunas) ----
const tunggakanLama = computed(() => {
  const startK = ta.value.startKode
  const out = []
  for (const t of props.allTagihan || []) {
    const st = String(t.status || 'belum').toLowerCase()
    if (st !== 'belum' && st !== 'partial') continue
    const pk = periodeKodeOf(t)
    // v.1.2.x: sebelum "mulai tagih" AMMU = bukan tunggakan (belum tercatat di sini)
    if (!pk || pk >= startK || pk < mulaiKode.value) continue
    const tariff = Number(t.nominal || 0)
    const paid = terbayarDari(t)
    out.push({
      key: 'tl_' + t.id,
      jenis: t.kategori || t.jenis_label || 'Tagihan',
      ket: t.periode || pk,
      kode: pk,
      tariff,
      paid,
      sisa: Math.max(0, tariff - paid),
      status: cellStatus(tariff, paid),
      tagId: t.id,
      pos: t.pos || ''
    })
  }
  out.sort((a, b) => a.kode.localeCompare(b.kode))
  return out
})

// ---- Keranjang ----
const cart = ref([])
const cartKeys = computed(() => new Set(cart.value.map((c) => c.key)))
function inCart(key) {
  return cartKeys.value.has(key)
}
function toggleCell(d) {
  if (!d || d.na || d.pre || d.status === 'pre' || d.status === 'lunas' || d.status === 'lebih')
    return
  const i = cart.value.findIndex((c) => c.key === d.key)
  if (i >= 0) {
    cart.value.splice(i, 1)
    return
  }
  cart.value.push({
    key: d.key,
    jenis: d.jenis,
    keterangan: d.ket || '',
    nominal: Number(d.sisa || 0),
    tagihan_id: d.tagId || null,
    nominal_penuh: Number(d.tariff || 0),
    dibayar_lama: Number(d.paid || 0),
    pos: d.pos || '',
    periode_kode: d.kode || '',
    manual: false
  })
}
function addManual(j) {
  cart.value.push({
    key: 'man_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    jenis: j.label,
    keterangan: '',
    nominal: lookupNominal(j.label) || 0,
    tagihan_id: null,
    nominal_penuh: 0,
    dibayar_lama: 0,
    pos: j.pos || posOf(j.label),
    periode_kode: '',
    manual: true
  })
}
function removeCart(key) {
  const i = cart.value.findIndex((c) => c.key === key)
  if (i >= 0) cart.value.splice(i, 1)
}

// ---- metode / uang diterima / kembalian ----
const METODE_LIST = ['Tunai', 'Transfer']
const metode = ref('Tunai')
const isTunai = computed(() => metode.value === 'Tunai')
const bayar = ref(0)
const total = computed(() => cart.value.reduce((s, c) => s + Number(c.nominal || 0), 0))
const kembali = computed(() => (isTunai.value ? Math.max(0, bayar.value - total.value) : 0))

watch(total, (t) => {
  if (!isTunai.value) {
    bayar.value = t
    return
  }
  if (bayar.value < t) bayar.value = t
})
watch(metode, (m) => {
  if (m !== 'Tunai') bayar.value = total.value
})
function quickCash(v) {
  if (v === -1) bayar.value = total.value
  else bayar.value = Math.max(total.value, Number(bayar.value || 0)) + v
}

function rebuild() {
  ta.value = computeTA()
  cart.value = []
  metode.value = 'Tunai'
  bayar.value = 0
}
watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      cart.value = []
      bayar.value = 0
      return
    }
    rebuild()
  }
)

function close() {
  emit('close')
}
function simpan() {
  if (cart.value.length === 0) {
    alert('Keranjang kosong — klik tagihan yang mau dibayar dulu')
    return
  }
  if (cart.value.some((c) => !c.nominal || c.nominal <= 0)) {
    alert('Nominal tiap item harus > 0')
    return
  }
  if (isTunai.value && bayar.value < total.value) {
    alert('Uang diterima kurang dari total')
    return
  }
  emit('simpan', {
    santri_id: props.santri?.id,
    santri_nama: props.santri?.nama,
    santri_nis: props.santri?.nis || '',
    items: cart.value.map((c) => ({
      jenis: c.jenis,
      nominal: Number(c.nominal),
      keterangan: c.keterangan || '',
      tagihan_id: c.tagihan_id || null,
      nominal_penuh: Number(c.nominal_penuh || 0),
      dibayar_lama: Number(c.dibayar_lama || 0),
      pos: c.pos || '',
      periode_kode: c.periode_kode || ''
    })),
    total_tagihan: total.value,
    total_bayar: isTunai.value ? bayar.value : total.value,
    kembalian: kembali.value,
    metode: metode.value,
    operator: props.operator,
    // audit: tanggal KALENDER WIB (bukan UTC) — cegah mundur 1 hari utk transaksi dini hari
    tanggal: todayJakarta()
  })
}
function onBackdrop(e) {
  if (e.target === e.currentTarget) close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="ammu-pos-backdrop" @click="onBackdrop">
        <div class="modal modal-wide">
          <div class="mhdr">
            <h2 class="mttl">
              <i :class="savedTrx ? 'fas fa-check-circle' : 'fas fa-cash-register'"></i
              >{{ savedTrx ? 'Pembayaran Berhasil' : 'POS Pembayaran' }}
            </h2>
            <button type="button" class="mclose" aria-label="Tutup" @click="close">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div v-if="!savedTrx" class="mbody">
            <div v-if="santri" class="santri-info">
              <div class="ava">{{ santri.nama?.[0] || '?' }}</div>
              <div>
                <p class="snm">{{ santri.nama }}</p>
                <p class="sub">
                  No. Induk: {{ santri.nis || '—' }}{{ santri.lembaga ? ' · ' + santri.lembaga : ''
                  }}{{ santri.kelas ? ' · ' + santri.kelas : '' }}
                </p>
              </div>
            </div>

            <!-- legenda warna -->
            <div class="legend">
              <span class="lg belum">Belum</span>
              <span class="lg part">Sebagian</span>
              <span class="lg lunas">Lunas</span>
              <span class="lg lebih">Lebih</span>
              <span class="lg-hint">Klik sel merah/pink → masuk keranjang</span>
            </div>

            <div class="pos-grid">
              <div class="pos-left">
                <!-- Tunggakan Tahun Lalu -->
                <div v-if="tunggakanLama.length" class="sect">
                  <p class="sect-ttl warn">
                    <i class="fas fa-triangle-exclamation"></i>Tunggakan Tahun Lalu
                  </p>
                  <div class="nb">
                    <div
                      v-for="r in tunggakanLama"
                      :key="r.key"
                      class="nbrow"
                      :class="{ pick: inCart(r.key) }"
                      @click="toggleCell(r)"
                    >
                      <div class="nbmain">
                        <div class="nbj">
                          {{ r.jenis }}
                          <span class="pill" :class="r.status">{{
                            r.status === 'part' ? 'Sebagian' : 'Belum'
                          }}</span>
                        </div>
                        <div class="nbk">
                          {{ r.ket }}{{ r.paid ? ' · sudah ' + fmtRp(r.paid) : '' }}
                        </div>
                      </div>
                      <div class="nbnom">{{ fmtRp(r.sisa) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Matriks Bulanan -->
                <div v-if="matrix.length" class="sect">
                  <p class="sect-ttl">
                    <i class="fas fa-table-cells"></i>Bulanan — T.A. {{ ta.label }}
                  </p>
                  <div class="scrollx">
                    <table class="mx">
                      <thead>
                        <tr>
                          <th class="rowh">Jenis</th>
                          <th v-for="mo in ta.months" :key="mo.kode">{{ mo.label }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="row in matrix" :key="row.jenis">
                          <td class="jns">{{ row.jenis }}</td>
                          <td v-for="c in row.cells" :key="c.key" class="mxcell">
                            <div v-if="c.na" class="cell na">–</div>
                            <div
                              v-else-if="c.pre"
                              class="cell pre"
                              :title="c.ket + ' · belum aktif (sebelum mulai tagih)'"
                            >
                              {{ fmtRp(c.tariff) }}
                              <small>blm aktif</small>
                            </div>
                            <div
                              v-else
                              class="cell"
                              :class="[c.status, { pick: inCart(c.key) }]"
                              :title="
                                c.ket +
                                ' · ' +
                                (c.status === 'part' ? 'sisa ' + fmtRp(c.sisa) : c.status)
                              "
                              @click="toggleCell(c)"
                            >
                              {{ fmtRp(c.tariff) }}
                              <small>{{
                                c.status === 'lunas'
                                  ? 'lunas'
                                  : c.status === 'lebih'
                                    ? 'lebih'
                                    : c.status === 'part'
                                      ? 'sisa ' + fmtRp(c.sisa)
                                      : 'belum'
                              }}</small>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Nonbulanan -->
                <div v-if="nonbulananRows.length" class="sect">
                  <p class="sect-ttl"><i class="fas fa-diamond"></i>Nonbulanan</p>
                  <div class="nb">
                    <div
                      v-for="r in nonbulananRows"
                      :key="r.key"
                      class="nbrow"
                      :class="{
                        lunas: r.status === 'lunas' || r.status === 'lebih',
                        pick: inCart(r.key)
                      }"
                      @click="toggleCell(r)"
                    >
                      <div class="nbmain">
                        <div class="nbj">
                          {{ r.jenis }}
                          <span class="pill" :class="r.status">{{
                            r.status === 'lunas'
                              ? 'Lunas'
                              : r.status === 'lebih'
                                ? 'Lebih'
                                : r.status === 'part'
                                  ? 'Sebagian'
                                  : 'Belum'
                          }}</span>
                        </div>
                        <div class="nbk">
                          {{ r.ket }}{{ r.paid ? ' · sudah ' + fmtRp(r.paid) : '' }}
                        </div>
                      </div>
                      <div class="nbnom">
                        {{
                          r.status === 'lunas' || r.status === 'lebih'
                            ? fmtRp(r.tariff)
                            : fmtRp(r.sisa)
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Item lain (manual/ad-hoc) -->
                <div v-if="jenisManual.length" class="sect">
                  <p class="sect-ttl"><i class="fas fa-plus-circle"></i>Item lain</p>
                  <div class="chips">
                    <button
                      v-for="j in jenisManual"
                      :key="j.label"
                      type="button"
                      class="chip"
                      @click="addManual(j)"
                    >
                      <i class="fas fa-plus"></i>{{ j.label }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Keranjang -->
              <div class="pos-right">
                <div class="cart-panel">
                  <div class="cart-hd">
                    <span><i class="fas fa-basket-shopping"></i> Rincian Transaksi</span>
                    <span class="cart-count">{{ cart.length }} item</span>
                  </div>
                  <div class="cart-body">
                    <p v-if="cart.length === 0" class="cart-empty">
                      Belum ada item.<br />Klik tagihan di sebelah kiri.
                    </p>
                    <div v-for="c in cart" :key="c.key" class="ci">
                      <div class="ci-main">
                        <div class="ci-j">{{ c.jenis }}</div>
                        <input
                          v-if="c.manual"
                          v-model="c.keterangan"
                          class="ci-ket-inp"
                          placeholder="keterangan (opsional)"
                        />
                        <div v-else class="ci-k">{{ c.keterangan || '—' }}</div>
                      </div>
                      <input v-model.number="c.nominal" type="number" class="ci-nom" />
                      <button
                        type="button"
                        class="ci-rm"
                        aria-label="Hapus"
                        @click="removeCart(c.key)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div class="totals">
                    <div class="row mtd">
                      <span>Metode</span>
                      <div class="mtd-btns">
                        <button
                          v-for="m in METODE_LIST"
                          :key="m"
                          type="button"
                          class="mtd-btn"
                          :class="{ active: metode === m }"
                          @click="metode = m"
                        >
                          {{ m }}
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <span>Total</span><span class="big">{{ fmtRp(total) }}</span>
                    </div>
                    <template v-if="isTunai">
                      <div class="row">
                        <span>Uang diterima</span>
                        <input
                          v-model.number="bayar"
                          type="number"
                          :min="total"
                          class="inp-bayar"
                        />
                      </div>
                      <div class="quick">
                        <button type="button" class="qbtn" @click="quickCash(-1)">Pas</button>
                        <button type="button" class="qbtn" @click="quickCash(50000)">+50rb</button>
                        <button type="button" class="qbtn" @click="quickCash(100000)">
                          +100rb
                        </button>
                        <button type="button" class="qbtn" @click="quickCash(200000)">
                          +200rb
                        </button>
                      </div>
                      <div class="row hr">
                        <span class="bold">Kembalian</span
                        ><span class="big green">{{ fmtRp(kembali) }}</span>
                      </div>
                    </template>
                    <div v-else class="row hr nontunai">
                      <span class="bold">{{ metode }}</span>
                      <span class="big">Lunas — tanpa kembalian</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- v.94.0626: layar SUKSES + tombol cetak struk -->
          <div v-else class="mbody">
            <div class="ok-wrap">
              <div class="ok-badge"><i class="fas fa-check"></i></div>
              <p class="ok-ttl">Transaksi tersimpan</p>
              <p class="ok-sub">{{ savedTrx.santri_nama }} · {{ fmtRp(savedTrx.total) }}</p>
              <p v-if="savedTrx.no_struk" class="ok-meta">No. Transaksi: {{ savedTrx.no_struk }}</p>
              <p v-if="savedTrx.penyetor" class="ok-meta">Penyetor: {{ savedTrx.penyetor }}</p>

              <p class="ok-hint">Cetak struk pembayaran:</p>
              <div class="ok-print">
                <button type="button" class="pbtn pdf" @click="emit('cetak-pdf')">
                  <i class="fas fa-file-pdf"></i>Struk PDF
                </button>
                <button type="button" class="pbtn dot" @click="emit('cetak-dot')">
                  <i class="fas fa-print"></i>Struk Dot-matrix
                </button>
                <button
                  v-if="isDesktop"
                  type="button"
                  class="pbtn live"
                  @click="emit('cetak-langsung')"
                >
                  <i class="fas fa-bolt"></i>Cetak Langsung
                </button>
              </div>
              <button
                v-if="isDesktop"
                type="button"
                class="ok-setting"
                @click="emit('pengaturan-printer')"
              >
                <i class="fas fa-sliders-h"></i> Pengaturan Printer
              </button>
            </div>
          </div>

          <div v-if="!savedTrx" class="mfoot">
            <button type="button" class="btn-cancel" @click="close">Batal</button>
            <button
              type="button"
              class="btn-save"
              :disabled="saving || cart.length === 0"
              @click="simpan"
            >
              <i :class="saving ? 'fas fa-spinner fa-spin' : 'fas fa-money-bill-wave'"></i
              >{{ saving ? 'Menyimpan…' : 'Bayar & Simpan' }}
            </button>
          </div>
          <div v-else class="mfoot">
            <button type="button" class="btn-save full" @click="close">
              <i class="fas fa-check-double"></i>Selesai
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ammu-pos-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}
.modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  max-width: 42rem;
  width: 100%;
  min-width: 0;
  color: #0f172a;
  max-height: 92vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-wide {
  max-width: 64rem;
}
:global(.dark) .modal,
.dark-mode .modal {
  background: #18181b;
  color: #fafafa;
}
.mhdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 2;
}
:global(.dark) .mhdr,
.dark-mode .mhdr {
  border-color: #27272a;
}
.mttl {
  font-size: 1.125rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}
.mttl i {
  color: #0f766e;
}
.mclose {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #94a3b8;
}
.mclose:hover {
  background: #f1f5f9;
}
.mbody {
  padding: 1rem;
}
.santri-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #f0fdfa;
  border: 1px solid #99f6e4;
  margin-bottom: 0.75rem;
}
:global(.dark) .santri-info,
.dark-mode .santri-info {
  background: rgba(15, 118, 110, 0.18);
  border-color: rgba(15, 118, 110, 0.4);
}
.ava {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #0f766e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  flex-shrink: 0;
}
.snm {
  font-weight: 900;
  margin: 0;
}
.sub {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}
:global(.dark) .sub,
.dark-mode .sub {
  color: #a1a1aa;
}

/* legenda */
.legend {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}
.lg {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid;
}
.lg.belum {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fecaca;
}
.lg.part {
  background: #fce7f3;
  color: #be185d;
  border-color: #fbcfe8;
}
.lg.lunas {
  background: #dcfce7;
  color: #15803d;
  border-color: #bbf7d0;
}
.lg.lebih {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
}
.lg-hint {
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
  margin-left: auto;
}

/* layout 2 kolom */
.pos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 820px) {
  .pos-grid {
    grid-template-columns: 1fr 300px;
    align-items: start;
  }
}
.pos-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.sect {
  margin: 0;
}
.sect-ttl {
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.sect-ttl i {
  color: #0f766e;
}
.sect-ttl.warn {
  color: #b91c1c;
}
.sect-ttl.warn i {
  color: #dc2626;
}
:global(.dark) .sect-ttl,
.dark-mode .sect-ttl {
  color: #cbd5e1;
}

/* matriks */
.scrollx {
  overflow-x: auto;
  border-radius: 0.6rem;
}
table.mx {
  border-collapse: separate;
  border-spacing: 4px;
  min-width: 640px;
}
table.mx th {
  font-size: 0.6rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  padding: 2px 4px;
  text-align: center;
  white-space: nowrap;
}
table.mx th.rowh {
  text-align: left;
  min-width: 92px;
}
td.jns {
  font-size: 0.75rem;
  font-weight: 800;
  white-space: nowrap;
  padding-right: 6px;
}
.mxcell {
  padding: 0;
}
.cell {
  border-radius: 0.5rem;
  border: 1.5px solid;
  padding: 5px 4px;
  text-align: center;
  font-size: 0.68rem;
  font-weight: 800;
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.06s,
    box-shadow 0.12s;
  line-height: 1.1;
  min-width: 54px;
}
.cell:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.14);
}
.cell small {
  display: block;
  font-size: 0.52rem;
  font-weight: 700;
  opacity: 0.7;
  text-transform: uppercase;
}
.cell.belum {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fecaca;
}
.cell.part {
  background: #fce7f3;
  color: #be185d;
  border-color: #fbcfe8;
}
.cell.lunas {
  background: #dcfce7;
  color: #15803d;
  border-color: #bbf7d0;
  cursor: default;
}
.cell.lunas:hover {
  transform: none;
  box-shadow: none;
}
.cell.lebih {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
  cursor: default;
}
.cell.lebih:hover {
  transform: none;
  box-shadow: none;
}
.cell.na {
  background: #f8fafc;
  color: #cbd5e1;
  border-color: #eef2f6;
  cursor: default;
  min-width: 54px;
}
.cell.na:hover {
  transform: none;
  box-shadow: none;
}
.cell.pre {
  background: #f8fafc;
  color: #94a3b8;
  border-color: #e2e8f0;
  border-style: dashed;
  cursor: default;
}
.cell.pre:hover {
  transform: none;
  box-shadow: none;
}
:global(.dark) .cell.pre,
.dark-mode .cell.pre {
  background: #27272a;
  color: #71717a;
  border-color: #3f3f46;
}
.cell.pick {
  outline: 3px solid #0f766e;
  outline-offset: 1px;
}
:global(.dark) .cell.belum,
.dark-mode .cell.belum {
  background: rgba(185, 28, 28, 0.28);
  color: #fca5a5;
  border-color: rgba(185, 28, 28, 0.5);
}
:global(.dark) .cell.part,
.dark-mode .cell.part {
  background: rgba(190, 24, 93, 0.28);
  color: #f9a8d4;
  border-color: rgba(190, 24, 93, 0.5);
}
:global(.dark) .cell.lunas,
.dark-mode .cell.lunas {
  background: rgba(21, 128, 61, 0.26);
  color: #86efac;
  border-color: rgba(21, 128, 61, 0.5);
}
:global(.dark) .cell.lebih,
.dark-mode .cell.lebih {
  background: rgba(29, 78, 216, 0.28);
  color: #93c5fd;
  border-color: rgba(29, 78, 216, 0.5);
}
:global(.dark) .cell.na,
.dark-mode .cell.na {
  background: #27272a;
  color: #52525b;
  border-color: #3f3f46;
}

/* nonbulanan / tunggakan list */
.nb {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.nbrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.6rem;
  padding: 0.5rem 0.7rem;
  cursor: pointer;
  transition: background 0.1s;
}
.nbrow:hover {
  background: #f0fdfa;
}
.nbrow.lunas {
  cursor: default;
}
.nbrow.lunas:hover {
  background: transparent;
}
.nbrow.pick {
  outline: 3px solid #0f766e;
  outline-offset: 1px;
}
:global(.dark) .nbrow,
.dark-mode .nbrow {
  border-color: #3f3f46;
}
:global(.dark) .nbrow:hover,
.dark-mode .nbrow:hover {
  background: rgba(15, 118, 110, 0.15);
}
.nbmain {
  flex: 1;
  min-width: 0;
}
.nbj {
  font-weight: 800;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.nbk {
  font-size: 0.68rem;
  color: #94a3b8;
}
.nbnom {
  font-weight: 900;
  font-size: 0.82rem;
  text-align: right;
  white-space: nowrap;
}
.pill {
  font-size: 0.55rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  border: 1px solid;
}
.pill.belum {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fecaca;
}
.pill.part {
  background: #fce7f3;
  color: #be185d;
  border-color: #fbcfe8;
}
.pill.lunas {
  background: #dcfce7;
  color: #15803d;
  border-color: #bbf7d0;
}
.pill.lebih {
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

/* chips item lain */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.7rem;
  border-radius: 9999px;
  background: #ccfbf1;
  color: #0f766e;
  font-weight: 800;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
}
.chip:hover {
  background: #99f6e4;
}
:global(.dark) .chip,
.dark-mode .chip {
  background: rgba(15, 118, 110, 0.3);
  color: #5eead4;
}

/* keranjang */
.cart-panel {
  border: 1px solid #e2e8f0;
  border-radius: 0.8rem;
  overflow: hidden;
  position: sticky;
  top: 4.2rem;
}
:global(.dark) .cart-panel,
.dark-mode .cart-panel {
  border-color: #3f3f46;
}
.cart-hd {
  background: #0f766e;
  color: white;
  padding: 0.6rem 0.8rem;
  font-weight: 900;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-count {
  font-size: 0.68rem;
  opacity: 0.9;
}
.cart-body {
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 240px;
  overflow-y: auto;
}
.cart-empty {
  text-align: center;
  color: #94a3b8;
  font-size: 0.75rem;
  padding: 1rem 0.5rem;
  margin: 0;
}
.ci {
  display: grid;
  grid-template-columns: 1fr 5.5rem auto;
  gap: 0.4rem;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
}
:global(.dark) .ci,
.dark-mode .ci {
  border-color: #3f3f46;
}
.ci-main {
  min-width: 0;
}
.ci-j {
  font-weight: 800;
  font-size: 0.76rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ci-k {
  font-size: 0.64rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ci-ket-inp {
  font-size: 0.64rem;
  padding: 0.15rem 0.35rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.35rem;
  background: white;
  color: #0f172a;
  width: 100%;
  margin-top: 0.15rem;
}
:global(.dark) .ci-ket-inp,
.dark-mode .ci-ket-inp {
  background: #27272a;
  border-color: #3f3f46;
  color: #fafafa;
}
.ci-nom {
  width: 5.5rem;
  text-align: right;
  padding: 0.3rem 0.4rem;
  border-radius: 0.4rem;
  border: 1px solid #cbd5e1;
  font-weight: 800;
  font-size: 0.76rem;
  background: white;
  color: #0f172a;
}
:global(.dark) .ci-nom,
.dark-mode .ci-nom {
  background: #27272a;
  border-color: #3f3f46;
  color: #fafafa;
}
.ci-rm {
  border: none;
  background: transparent;
  color: #e11d48;
  cursor: pointer;
  padding: 0.2rem 0.35rem;
}
.ci-rm:hover {
  color: #be123c;
}

.totals {
  padding: 0.8rem;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid #e2e8f0;
}
:global(.dark) .totals,
.dark-mode .totals {
  background: #27272a;
  border-color: #3f3f46;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
}
.row.hr {
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}
:global(.dark) .row.hr,
.dark-mode .row.hr {
  border-color: #3f3f46;
}
.bold {
  font-weight: 700;
}
.big {
  font-weight: 900;
  font-size: 1.05rem;
}
.big.green {
  color: #10b981;
  font-size: 1.2rem;
}
.inp-bayar {
  width: 8rem;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  text-align: right;
  font-weight: 700;
  background: white;
  color: #0f172a;
}
:global(.dark) .inp-bayar,
.dark-mode .inp-bayar {
  background: #18181b;
  border-color: #3f3f46;
  color: #fafafa;
}
.row.mtd {
  align-items: center;
}
.mtd-btns {
  display: inline-flex;
  gap: 0.35rem;
}
.mtd-btn {
  padding: 0.3rem 0.65rem;
  border-radius: 0.5rem;
  background: #e2e8f0;
  color: #334155;
  font-weight: 700;
  font-size: 0.72rem;
  border: 1px solid transparent;
  cursor: pointer;
}
.mtd-btn:hover {
  background: #99f6e4;
  color: #0f766e;
}
.mtd-btn.active {
  background: #0f766e;
  color: white;
  border-color: #0f766e;
}
:global(.dark) .mtd-btn,
.dark-mode .mtd-btn {
  background: #3f3f46;
  color: #e4e4e7;
}
:global(.dark) .mtd-btn.active,
.dark-mode .mtd-btn.active {
  background: #0f766e;
  color: white;
}
.row.nontunai .big {
  font-size: 0.82rem;
  color: #0f766e;
}
.quick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.35rem;
}
.qbtn {
  padding: 0.4rem 0.3rem;
  border-radius: 0.5rem;
  background: #e2e8f0;
  color: #334155;
  font-weight: 700;
  font-size: 0.7rem;
  border: none;
  cursor: pointer;
}
.qbtn:hover {
  background: #99f6e4;
  color: #0f766e;
}
:global(.dark) .qbtn,
.dark-mode .qbtn {
  background: #3f3f46;
  color: #e4e4e7;
}
.mfoot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: sticky;
  bottom: 0;
}
:global(.dark) .mfoot,
.dark-mode .mfoot {
  background: #27272a;
  border-color: #3f3f46;
}
.btn-cancel {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: #e2e8f0;
  color: #334155;
  font-weight: 700;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #cbd5e1;
}
.btn-save {
  padding: 0.5rem 1.1rem;
  border-radius: 0.75rem;
  background: #0f766e;
  color: white;
  font-weight: 800;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-save:hover {
  background: #115e59;
}
.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-save.full {
  width: 100%;
  justify-content: center;
}
/* layar sukses */
.ok-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0.25rem 0.25rem;
}
.ok-badge {
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background: #d1fae5;
  color: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
}
:global(.dark) .ok-badge,
.dark-mode .ok-badge {
  background: rgba(5, 150, 105, 0.2);
  color: #34d399;
}
.ok-ttl {
  font-size: 1.05rem;
  font-weight: 900;
  margin: 0;
  color: #065f46;
}
:global(.dark) .ok-ttl,
.dark-mode .ok-ttl {
  color: #6ee7b7;
}
.ok-sub {
  font-size: 0.85rem;
  font-weight: 700;
  margin: 0.15rem 0 0;
  color: #0f172a;
}
:global(.dark) .ok-sub,
.dark-mode .ok-sub {
  color: #fafafa;
}
.ok-meta {
  font-size: 0.72rem;
  color: #64748b;
  margin: 0.1rem 0 0;
}
:global(.dark) .ok-meta,
.dark-mode .ok-meta {
  color: #a1a1aa;
}
.ok-hint {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  margin: 1rem 0 0.5rem;
}
:global(.dark) .ok-hint,
.dark-mode .ok-hint {
  color: #cbd5e1;
}
.ok-print {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
}
.pbtn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.82rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
}
.pbtn.pdf {
  background: #ffe4e6;
  color: #be123c;
}
.pbtn.pdf:hover {
  background: #fecdd3;
}
:global(.dark) .pbtn.pdf,
.dark-mode .pbtn.pdf {
  background: rgba(190, 18, 60, 0.25);
  color: #fda4af;
}
.pbtn.dot {
  background: white;
  color: #334155;
  border: 1px solid #cbd5e1;
}
.pbtn.dot:hover {
  background: #f1f5f9;
}
:global(.dark) .pbtn.dot,
.dark-mode .pbtn.dot {
  background: #27272a;
  color: #e4e4e7;
  border-color: #3f3f46;
}
.pbtn.live {
  background: #0f766e;
  color: white;
}
.pbtn.live:hover {
  background: #115e59;
}
.ok-setting {
  margin-top: 0.85rem;
  background: transparent;
  border: none;
  color: #0f766e;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}
.ok-setting:hover {
  color: #115e59;
}
:global(.dark) .ok-setting,
.dark-mode .ok-setting {
  color: #5eead4;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
