// v.21.111.0527 — Notif Center: aggregat aktifitas baru sesuai role user.
//
// Sumber notif (per role):
//   - Catatan Supervisi (guru/pegawai → target user atau Kepala/PJ lembaga)
//   - Kritik & Saran baru (admin)
//   - Postingan baru / beranda_post (semua)
//   - Pembayaran POS berhasil (santri target_id)
//   - Slip Bisyaroh baru (guru target_id)
//
// State 'last_seen' disimpan per-user di /user_notif_state/{userId}
//   { last_seen_per_jenis: { supervisi, kritik, post, pembayaran, bisyaroh } }
//
// Notif baru = item.createdAt > last_seen_per_jenis[jenis]

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { isKepalaLembaga } from '@/utils/roleScope'

export function useNotifications() {
  const auth = useAuthStore()

  // Raw data per koleksi
  const supervisiRaw = ref([])
  const kritikRaw = ref([])
  const postRaw = ref([])
  const bukuIndukRaw = ref([])
  const slipRaw = ref([])
  const notifState = ref({})

  // unsub list
  const unsubs = []

  const userId = computed(() => String(auth.sesiAktif?.id || ''))
  const role = computed(() => auth.sesiAktif?.role || 'guest')
  const isAdminRole = computed(() => role.value === 'admin')

  function tsMs(ts) {
    if (!ts) return 0
    if (ts.seconds != null) return ts.seconds * 1000
    if (ts.toDate) try { return ts.toDate().getTime() } catch { return 0 }
    if (typeof ts === 'number') return ts
    const d = new Date(ts)
    if (!isNaN(d.getTime())) return d.getTime()
    return 0
  }

  // === Build list per kategori ===
  function getSupervisi() {
    if (!userId.value) return []
    const me = userId.value
    const sesi = auth.sesiAktif
    const myLemb = String(sesi?.lembaga || '').toLowerCase()
    const myLembSek = String(sesi?.lembaga_sekolah || '').toLowerCase()
    const isKepala = isKepalaLembaga(sesi)
    return supervisiRaw.value
      .filter((c) => {
        if (c.target_type === 'guru' && String(c.target_id) === me) return true
        if (c.target_type === 'lembaga' && isKepala) {
          const tn = String(c.target_nama || '').toLowerCase()
          return tn === myLemb || tn === myLembSek
        }
        return false
      })
      .map((c) => ({
        id: c.id || c._id,
        jenis: 'supervisi',
        judul: c.judul || 'Catatan Supervisi',
        body: c.catatan || '',
        ts: tsMs(c.createdAt),
        link: '/personal',
        icon: 'fa-clipboard-check',
        color: 'cyan'
      }))
  }

  function getKritik() {
    if (!isAdminRole.value) return []
    return kritikRaw.value.map((k) => ({
      id: k.id || k._id,
      jenis: 'kritik',
      judul: 'Kritik / Saran baru',
      body: String(k.isi || k.pesan || k.kritik || '').slice(0, 80),
      ts: tsMs(k.createdAt || k.created_at),
      link: '/kritik-saran',
      icon: 'fa-comment-dots',
      color: 'amber'
    }))
  }

  function getPost() {
    return postRaw.value.map((p) => ({
      id: p.id || p._id,
      jenis: 'post',
      judul: p.judul || 'Postingan baru',
      body: String(p.caption || p.isi || '').slice(0, 80),
      ts: tsMs(p.createdAt || p.created_at),
      link: '/posts',
      icon: 'fa-bullhorn',
      color: 'teal'
    }))
  }

  function getPembayaran() {
    if (role.value !== 'santri') return []
    const me = userId.value
    return bukuIndukRaw.value
      .filter((r) => r.sumber === 'pos_santri' && String(r.santri_id) === me)
      .map((r) => ({
        id: r.id || r._id,
        jenis: 'pembayaran',
        judul: 'Pembayaran berhasil',
        body: `${r.kategori || 'Pembayaran'} · Rp ${new Intl.NumberFormat('id-ID').format(Number(r.nominal || 0))}`,
        ts: tsMs(r.createdAt || r.created_at),
        link: '/pembayaran',
        icon: 'fa-receipt',
        color: 'emerald'
      }))
  }

  function getBisyaroh() {
    if (role.value !== 'guru') return []
    const me = userId.value
    return slipRaw.value
      .filter((s) => String(s.guru_id) === me)
      .map((s) => ({
        id: s.id || s._id,
        jenis: 'bisyaroh',
        judul: `Slip Bisyaroh ${s.periode || ''}`,
        body: `Take home Rp ${new Intl.NumberFormat('id-ID').format(Number(s.take_home || 0))}`,
        ts: tsMs(s.updatedAt || s.updated_at || s.createdAt || s.created_at),
        link: '/bisyaroh',
        icon: 'fa-hand-holding-usd',
        color: 'emerald'
      }))
  }

  // === Aggregated list ===
  const items = computed(() => {
    const all = [
      ...getSupervisi(),
      ...getKritik(),
      ...getPost(),
      ...getPembayaran(),
      ...getBisyaroh()
    ]
    return all
      .filter((x) => x.id && x.ts > 0)
      .sort((a, b) => b.ts - a.ts)
      .slice(0, 30)
  })

  const lastSeenPerJenis = computed(() => {
    return notifState.value?.last_seen_per_jenis || {}
  })

  // Notif unread = ts > last_seen[jenis]
  const itemsUnread = computed(() => {
    return items.value.filter((it) => {
      const seen = Number(lastSeenPerJenis.value[it.jenis] || 0)
      return it.ts > seen
    })
  })

  const unreadCount = computed(() => itemsUnread.value.length)

  async function markAllRead() {
    if (!userId.value) return
    const now = Date.now()
    const next = {
      supervisi: now, kritik: now, post: now, pembayaran: now, bisyaroh: now
    }
    try {
      await setDoc(
        doc(db, 'user_notif_state', userId.value),
        { last_seen_per_jenis: next, updated_at: new Date() },
        { merge: true }
      )
      notifState.value = { ...notifState.value, last_seen_per_jenis: next }
    } catch (e) {
      console.warn('[useNotifications] markAllRead gagal:', e?.message || e)
    }
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsubs.push(subscribeColl('supervisi_catatan', (docs) => { supervisiRaw.value = docs || [] }))
    unsubs.push(subscribeColl('kritik_saran', (docs) => { kritikRaw.value = docs || [] }))
    unsubs.push(subscribeColl('beranda_post', (docs) => { postRaw.value = docs || [] }))
    if (role.value === 'santri' || role.value === 'admin') {
      unsubs.push(subscribeColl('keuangan_buku_induk', (docs) => { bukuIndukRaw.value = docs || [] }))
    }
    if (role.value === 'guru' || role.value === 'admin') {
      unsubs.push(subscribeColl('keuangan_gaji', (docs) => { slipRaw.value = docs || [] }))
    }
    if (userId.value) {
      unsubs.push(subscribeDoc('user_notif_state', userId.value, (d) => { notifState.value = d || {} }))
    }
  })

  onUnmounted(() => {
    for (const u of unsubs) { if (u) try { u() } catch { /* ignore */ } }
  })

  return {
    items,
    itemsUnread,
    unreadCount,
    markAllRead
  }
}
