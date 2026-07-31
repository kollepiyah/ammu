// v.21.111.0527 — Notif Center: aggregat aktifitas baru sesuai role user.
// v.87.0526 — Tambah sumber: Tagihan baru, Pembayaran transfer terverifikasi,
//             Hari libur (admin, KECUALI libur_nasional), Kenaikan kelas.
//
// Sumber notif (per role):
//   - Catatan Supervisi (guru/pegawai → target user atau Kepala/PJ lembaga)
//   - Kritik & Saran baru (admin)
//   - Postingan baru / beranda_post (semua)
//   - Pembayaran POS + transfer terverifikasi (santri target_id)
//   - Slip Bisyaroh baru (guru target_id)
//   - Tagihan baru (santri/wali target_id)            [v.87]
//   - Kenaikan kelas (santri/wali target_id)           [v.87]
//   - Hari libur admin, kecuali libur_nasional (semua) [v.87]
//
// State 'last_seen' disimpan per-user di /user_notif_state/{userId}
//   { last_seen_per_jenis: { supervisi, kritik, post, pembayaran, bisyaroh, tagihan, libur, kenaikan } }
//
// Notif baru = item.createdAt > last_seen_per_jenis[jenis]

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, mergeOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { isKepalaLembaga, isSuperAdmin } from '@/utils/roleScope'
import { lembagaScopeMatches } from '@/composables/useLembaga' // v.100: scope kepala utk notif tes kenaikan
import { kegiatanKenaLembaga } from '@/composables/useKegiatan' // v.1.2.4: scope lembaga agenda

export function useNotifications() {
  const auth = useAuthStore()

  // Raw data per koleksi
  const supervisiRaw = ref([])
  const kritikRaw = ref([])
  const postRaw = ref([])
  const bukuIndukRaw = ref([])
  const slipRaw = ref([])
  // v.87.0526: sumber notif baru
  const tagihanRaw = ref([])
  const liburRaw = ref([]) // dari koleksi `kegiatan` (filter tipe === 'libur')
  const kenaikanRaw = ref([]) // dari koleksi `riwayat_kenaikan` (event ditulis saat PROSES NAIK)
  const prestasiRaw = ref([]) // dari koleksi `notif_prestasi` (event ditulis saat input nilai prestasi)
  const tesRaw = ref([]) // v.100: dari koleksi `tes_kenaikan` (ajuan + hasil tes)
  const glondRaw = ref([]) // v.1.1.9: dari koleksi `tes_glondongan` (tugas menyimak)
  const notifState = ref({})

  // unsub list
  const unsubs = []

  const userId = computed(() => String(auth.sesiAktif?.id || ''))
  const role = computed(() => auth.sesiAktif?.role || 'guest')
  const isAdminRole = computed(() => role.value === 'admin')

  function tsMs(ts) {
    if (!ts) return 0
    if (ts.seconds != null) return ts.seconds * 1000
    if (ts.toDate)
      try {
        return ts.toDate().getTime()
      } catch {
        return 0
      }
    if (typeof ts === 'number') return ts
    const d = new Date(ts)
    if (!isNaN(d.getTime())) return d.getTime()
    return 0
  }

  // v.1.2.6: Notif agenda & libur berbasis TANGGAL kegiatan, BUKAN waktu impor/pembuatan.
  //   Dulu ts = createdAt → impor kalender 1 semester langsung membanjiri notif semuanya.
  //   Kini hanya muncul saat H-3 s/d hari terakhir kegiatan. ts = H-3 (00:00) supaya
  //   markAllRead (lastSeen = now) tetap bisa menandainya terbaca.
  const _MS_HARI = 86400000
  function _tglMs(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ''))
    if (!m) return NaN
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime()
  }
  // { show, ts, label } — window notif kegiatan (H-3 s/d hari-H); label = hitung mundur.
  function _windowKegiatan(k) {
    const mulai = _tglMs(k.tgl_mulai)
    if (isNaN(mulai)) return { show: false, ts: 0, label: '' }
    const akhir = _tglMs(k.tgl_akhir) || mulai
    const t = new Date()
    const todayMid = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime()
    const h3 = mulai - 3 * _MS_HARI
    const show = todayMid >= h3 && todayMid <= akhir
    const hariLagi = Math.round((mulai - todayMid) / _MS_HARI)
    const label =
      hariLagi > 1
        ? `H-${hariLagi}`
        : hariLagi === 1
          ? 'Besok'
          : hariLagi === 0
            ? 'Hari ini'
            : 'Berlangsung'
    return { show, ts: h3, label }
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
      color: 'teal',
      // v.71.0526: thumbnail image untuk notif post (1 image pertama kalau ada)
      thumbnail:
        Array.isArray(p.gambar_urls) && p.gambar_urls.length > 0
          ? p.gambar_urls[0]
          : p.thumbnail || p.image_url || ''
    }))
  }

  function getPembayaran() {
    if (role.value !== 'santri') return []
    const me = userId.value
    return (
      bukuIndukRaw.value
        // v.87.0526: sertakan transfer yang sudah diverifikasi admin (selain tunai POS)
        .filter(
          (r) =>
            (r.sumber === 'pos_santri' || r.sumber === 'transfer_verified') &&
            String(r.santri_id) === me
        )
        .map((r) => ({
          id: r.id || r._id,
          jenis: 'pembayaran',
          judul:
            r.sumber === 'transfer_verified' ? 'Transfer terverifikasi' : 'Pembayaran berhasil',
          body: `${r.kategori || 'Pembayaran'} · Rp ${new Intl.NumberFormat('id-ID').format(Number(r.nominal || 0))}`,
          ts: tsMs(r.createdAt || r.created_at),
          link: '/pembayaran',
          icon: 'fa-receipt',
          color: 'emerald'
        }))
    )
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

  // v.87.0526: Tagihan baru → wali/santri (tagihan miliknya sendiri)
  function getTagihan() {
    if (role.value !== 'santri') return []
    const me = userId.value
    return (
      tagihanRaw.value
        // v.100: jangan tampilkan sbg "Tagihan baru" jika tagihan LAHIR sudah lunas (bayar-di-muka POS).
        .filter(
          (t) => String(t.santri_id) === me && String(t.status || '').toLowerCase() !== 'lunas'
        )
        .map((t) => ({
          id: t.id || t._id,
          jenis: 'tagihan',
          judul: 'Tagihan baru',
          body: `${t.kategori || 'Tagihan'} · Rp ${new Intl.NumberFormat('id-ID').format(Number(t.nominal || 0))}`,
          ts: tsMs(t.createdAt || t.created_at),
          link: '/tagihan',
          icon: 'fa-file-invoice-dollar',
          color: 'rose'
        }))
    )
  }

  // v.87.0526: Hari libur dari admin — KECUALI libur_nasional → semua role (sesuai audience kegiatan)
  // v.1.2.6: muncul hanya H-3 s/d hari-H (lihat _windowKegiatan), bukan saat dibuat/diimpor.
  function getLibur() {
    return liburRaw.value
      .filter((k) => k.tipe === 'libur') // exclude 'kegiatan' & 'libur_nasional'
      .filter((k) => {
        const aud = k.audience || 'semua'
        if (aud === 'semua') return true
        if (aud === 'guru') return role.value === 'guru' || role.value === 'admin'
        if (aud === 'santri') return role.value === 'santri' || role.value === 'admin'
        return role.value === 'admin'
      })
      .map((k) => {
        const w = _windowKegiatan(k)
        return {
          id: k.id || k._id,
          jenis: 'libur',
          judul: `Libur: ${k.judul || 'Hari Libur'}${w.label ? ' · ' + w.label : ''}`,
          body: k.deskripsi || (k.tgl_mulai ? `Mulai ${k.tgl_mulai}` : ''),
          ts: w.ts,
          _show: w.show,
          link: '/kalender',
          icon: 'fa-umbrella-beach',
          color: 'blue'
        }
      })
      .filter((n) => n._show && n.ts > 0)
  }

  // v.1.2.4: Agenda kegiatan (tipe 'kegiatan') → notif sesuai audience + scope lembaga.
  //   Dulu getLibur HANYA memproses tipe 'libur' → agenda tak pernah muncul di notif.
  function getKegiatan() {
    const sesi = auth.sesiAktif
    return (
      liburRaw.value
        .filter((k) => (k.tipe || 'kegiatan') === 'kegiatan')
        .filter((k) => {
          const aud = k.audience || 'semua'
          if (aud === 'guru') return role.value === 'guru' || role.value === 'admin'
          if (aud === 'santri') return role.value === 'santri' || role.value === 'admin'
          return true // semua
        })
        .filter((k) => kegiatanKenaLembaga(k, sesi))
        // v.1.2.6: muncul hanya H-3 s/d hari-H (lihat _windowKegiatan), bukan saat diimpor/dibuat.
        .map((k) => {
          const w = _windowKegiatan(k)
          return {
            id: 'keg_' + (k.id || k._id),
            jenis: 'kegiatan',
            judul: `Agenda: ${k.judul || 'Kegiatan'}${w.label ? ' · ' + w.label : ''}`,
            body: k.deskripsi || (k.tgl_mulai ? `Mulai ${k.tgl_mulai}` : ''),
            ts: w.ts,
            _show: w.show,
            link: '/kalender',
            icon: 'fa-calendar-day',
            color: 'cyan'
          }
        })
        .filter((n) => n._show && n.ts > 0)
    )
  }

  // v.87.0526: Kenaikan kelas → wali/santri (anaknya). Sumber: koleksi `riwayat_kenaikan` (event).
  function getKenaikan() {
    if (role.value !== 'santri') return []
    const me = userId.value
    return kenaikanRaw.value
      .filter((r) => String(r.santri_id) === me)
      .map((r) => ({
        id: r.id || r._id,
        jenis: 'kenaikan',
        judul: 'Kenaikan kelas',
        body: `${r.ke_lembaga || ''} ${r.ke_kelas || ''}`.trim() || 'Selamat, telah naik!',
        ts: tsMs(r.createdAt || r.created_at),
        link: '/capaian-prestasi',
        icon: 'fa-level-up-alt',
        color: 'teal'
      }))
  }

  // v.87.0526: Rekap prestasi baru/diperbarui → wali/santri (anaknya). Sumber: koleksi `notif_prestasi`.
  function getPrestasi() {
    if (role.value !== 'santri') return []
    const me = userId.value
    return prestasiRaw.value
      .filter((p) => String(p.santri_id) === me)
      .map((p) => ({
        id: p.id || p._id,
        jenis: 'prestasi',
        judul: 'Prestasi diperbarui',
        body: p.total ? `Nilai: ${p.total}` : 'Rekap prestasi bulan ini sudah dinilai',
        ts: tsMs(p.createdAt || p.created_at),
        link: '/capaian-prestasi',
        icon: 'fa-trophy',
        color: 'amber'
      }))
  }

  // v.100: Tes Kenaikan Qiraati — per role. Sumber: koleksi `tes_kenaikan`.
  //   Guru pengaju → hasil ajuannya. Kepala/PJ (+admin) → ajuan baru dalam scope. Wali → anaknya LULUS.
  function getTesKenaikan() {
    const sesi = auth.sesiAktif || {}
    const me = userId.value
    const out = []
    if (role.value === 'guru' || role.value === 'admin') {
      // sbg PENGAJU: ajuan saya yang sudah ada hasil
      for (const a of tesRaw.value) {
        // v.1.2.5: ajuan yang DIBATALKAN pengaju sendiri jangan jadi notifikasi
        //   (tanpa ini ia jatuh ke cabang "Belum Lulus" — menyesatkan).
        if (String(a.guru_id || '') !== me || a.status === 'diajukan' || a.status === 'dibatalkan')
          continue
        const lulus = a.status === 'lulus'
        out.push({
          id: 'tesres_' + (a.id || a._id),
          jenis: 'tes',
          judul: lulus
            ? 'Tes: Lulus'
            : a.status === 'ditolak'
              ? 'Tes: Ditolak'
              : 'Tes: Belum Lulus',
          body: `${a.nama_cache || ''}${a.target ? ' → ' + a.target : ''}`.trim(),
          ts: tsMs(a.tgl_hasil || a._ts),
          link: '/tes-kenaikan',
          icon: 'fa-clipboard-check',
          color: lulus ? 'teal' : 'amber'
        })
      }
      // sbg PENGUJI — v.1.1.9: HANYA super_admin (semua lembaga) + Kepala/PJ (lembaganya saja).
      //   Dulu semua role 'admin' kebagian → notif tes membanjiri admin biasa/keuangan.
      if (isSuperAdmin(sesi) || isKepalaLembaga(sesi)) {
        for (const a of tesRaw.value) {
          if (a.status !== 'diajukan') continue
          if (!isSuperAdmin(sesi) && !lembagaScopeMatches(sesi.lembaga, a.lembaga)) continue
          out.push({
            id: 'tesreq_' + (a.id || a._id),
            jenis: 'tes',
            judul: 'Ajuan Tes Baru',
            body: `${a.nama_cache || ''}${a.guru_nama ? ' · ' + a.guru_nama : ''}`.trim(),
            ts: tsMs(a.tgl_daftar || a._ts),
            link: '/tes-kenaikan',
            icon: 'fa-clipboard-check',
            color: 'amber'
          })
        }
      }
    } else if (role.value === 'santri') {
      // WALI/SANTRI: anaknya LULUS (kabar siap naik)
      for (const a of tesRaw.value) {
        if (String(a.santri_id) !== me || a.status !== 'lulus') continue
        out.push({
          id: 'teslulus_' + (a.id || a._id),
          jenis: 'tes',
          judul: 'Lulus Tes Kenaikan',
          body: `Siap naik ke ${a.target || 'tingkat berikutnya'}`,
          ts: tsMs(a.tgl_hasil || a._ts),
          link: '/capaian-prestasi',
          icon: 'fa-clipboard-check',
          color: 'teal'
        })
      }
    }
    return out
  }

  // v.1.1.9: Tes Glondongan PTPT. Sumber: koleksi `tes_glondongan`.
  //   Guru penyimak → blok yang DITUGASKAN ke dia. super_admin + Kepala/PJ PTPT → blok
  //   'menunggu' yang perlu ditugaskan. Selain itu TIDAK dapat notif.
  function getGlondongan() {
    const sesi = auth.sesiAktif || {}
    const me = userId.value
    const out = []
    if (role.value !== 'guru' && role.value !== 'admin') return out
    const juzTxt = (r) =>
      r.juz_dari === r.juz_sampai ? `juz ${r.juz_dari}` : `juz ${r.juz_dari}–${r.juz_sampai}`
    // 1) Tugas menyimak untuk SAYA
    for (const r of glondRaw.value) {
      if (r.status !== 'ditugaskan') continue
      const mine =
        String(r.penguji_id || '') === me ||
        (!r.penguji_id && String(r.penguji_nama || '').trim() === String(sesi.nama || '').trim())
      if (!mine) continue
      out.push({
        id: 'glondtug_' + (r.id || r._id),
        jenis: 'glondongan',
        judul:
          r.tipe === 'berjalan' ? 'Tugas Menyimak (juz berjalan)' : 'Tugas Menyimak Glondongan',
        body: `${r.nama_cache || ''} — ${juzTxt(r)}`.trim(),
        ts: tsMs(r.tgl_tugas || r._ts),
        link: '/glondongan',
        icon: 'fa-headphones',
        color: 'violet'
      })
    }
    // 2) Blok menunggu penugasan → super_admin + Kepala/PJ (scope PTPT)
    if (
      isSuperAdmin(sesi) ||
      (isKepalaLembaga(sesi) && lembagaScopeMatches(sesi.lembaga, 'PTPT'))
    ) {
      for (const r of glondRaw.value) {
        if (r.status !== 'menunggu' || r.tipe !== 'glondongan') continue
        out.push({
          id: 'glondwait_' + (r.id || r._id),
          jenis: 'glondongan',
          judul: 'Glondongan Perlu Penguji',
          body: `${r.nama_cache || ''} — ${juzTxt(r)}`.trim(),
          ts: tsMs(r.tgl_daftar || r._ts),
          link: '/glondongan',
          icon: 'fa-user-plus',
          color: 'amber'
        })
      }
    }
    return out
  }

  // v.73.0526: cleared_at = timestamp setelah user klik "Bersihkan semua".
  // Notif dengan ts <= cleared_at di-hide dari list (per-user state).
  const clearedAt = computed(() => Number(notifState.value?.cleared_at || 0))

  // === Aggregated list ===
  const items = computed(() => {
    const all = [
      ...getSupervisi(),
      ...getKritik(),
      ...getPost(),
      ...getPembayaran(),
      ...getBisyaroh(),
      ...getTagihan(),
      ...getLibur(),
      ...getKegiatan(),
      ...getKenaikan(),
      ...getPrestasi(),
      ...getTesKenaikan(),
      ...getGlondongan()
    ]
    const clearTs = clearedAt.value
    return all
      .filter((x) => x.id && x.ts > 0 && x.ts > clearTs)
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

  // v.87.0526: semua jenis (termasuk tagihan/libur/kenaikan)
  function allSeenNow(now) {
    return {
      supervisi: now,
      kritik: now,
      post: now,
      pembayaran: now,
      bisyaroh: now,
      tagihan: now,
      libur: now,
      kegiatan: now,
      kenaikan: now,
      prestasi: now,
      tes: now
    }
  }

  async function markAllRead() {
    if (!userId.value) return
    const now = Date.now()
    const next = allSeenNow(now)
    try {
      await mergeOne('user_notif_state', userId.value, {
        last_seen_per_jenis: next,
        updated_at: new Date().toISOString()
      })
      notifState.value = { ...notifState.value, last_seen_per_jenis: next }
    } catch (e) {
      console.warn('[useNotifications] markAllRead gagal:', e?.message || e)
    }
  }

  // v.73.0526: Bersihkan semua notif — set cleared_at = now, semua notif lama di-hide.
  async function clearAll() {
    if (!userId.value) return
    const now = Date.now()
    try {
      await mergeOne('user_notif_state', userId.value, {
        cleared_at: now,
        last_seen_per_jenis: allSeenNow(now),
        updated_at: new Date().toISOString()
      })
      notifState.value = { ...notifState.value, cleared_at: now }
    } catch (e) {
      console.warn('[useNotifications] clearAll gagal:', e?.message || e)
    }
  }

  onMounted(() => {
    if (!auth.sesiAktif) return
    unsubs.push(
      subscribeColl('supervisi_catatan', (docs) => {
        supervisiRaw.value = docs || []
      })
    )
    unsubs.push(
      subscribeColl('kritik_saran', (docs) => {
        kritikRaw.value = docs || []
      })
    )
    unsubs.push(
      subscribeColl('beranda_post', (docs) => {
        postRaw.value = docs || []
      })
    )
    if (role.value === 'santri' || role.value === 'admin') {
      unsubs.push(
        subscribeColl('keuangan_buku_induk', (docs) => {
          bukuIndukRaw.value = docs || []
        })
      )
      // v.87.0526: tagihan baru + event kenaikan (untuk wali/santri; admin lihat semua)
      unsubs.push(
        subscribeColl('keuangan_tagihan', (docs) => {
          tagihanRaw.value = docs || []
        })
      )
      unsubs.push(
        subscribeColl('riwayat_kenaikan', (docs) => {
          kenaikanRaw.value = docs || []
        })
      )
      unsubs.push(
        subscribeColl('notif_prestasi', (docs) => {
          prestasiRaw.value = docs || []
        })
      )
    }
    if (role.value === 'guru' || role.value === 'admin') {
      unsubs.push(
        subscribeColl('keuangan_gaji', (docs) => {
          slipRaw.value = docs || []
        })
      )
    }
    // v.87.0526: hari libur (kegiatan) — semua role
    unsubs.push(
      subscribeColl('kegiatan', (docs) => {
        liburRaw.value = docs || []
      })
    )
    // v.100: tes kenaikan — semua role (filter per-role di getTesKenaikan)
    unsubs.push(
      subscribeColl('tes_kenaikan', (docs) => {
        tesRaw.value = docs || []
      })
    )
    // v.1.1.9: tugas menyimak glondongan — HANYA guru/admin (santri/wali tak berkepentingan)
    if (role.value === 'guru' || role.value === 'admin') {
      unsubs.push(
        subscribeColl('tes_glondongan', (docs) => {
          glondRaw.value = docs || []
        })
      )
    }
    if (userId.value) {
      unsubs.push(
        subscribeDoc('user_notif_state', userId.value, (d) => {
          notifState.value = d || {}
        })
      )
    }
  })

  onUnmounted(() => {
    for (const u of unsubs) {
      if (u)
        try {
          u()
        } catch {
          /* ignore */
        }
    }
  })

  return {
    items,
    itemsUnread,
    unreadCount,
    markAllRead,
    clearAll
  }
}
