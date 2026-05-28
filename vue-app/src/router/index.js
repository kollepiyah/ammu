// Vue Router — hash mode (deploy Firebase Hosting tanpa rewrite)
// Routes mirror legacy showPage() IDs
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy-load views supaya initial bundle kecil
const LoginView = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const PengaturanView = () => import('@/views/PengaturanView.vue')
const ProfilView = () => import('@/views/ProfilView.vue')
const SantriView = () => import('@/views/SantriView.vue')
const GuruView = () => import('@/views/GuruView.vue')
const LembagaView = () => import('@/views/LembagaView.vue')
const KelasView = () => import('@/views/KelasView.vue')
const FieldSchemaView = () => import('@/views/FieldSchemaView.vue')
const MasterFormBridgeView = () => import('@/views/MasterFormBridgeView.vue')
// Batch 3 Phase 5.12-5.18
const KeuanganDashboardView = () => import('@/views/KeuanganDashboardView.vue')
const TagihanView = () => import('@/views/TagihanView.vue')
const TabunganView = () => import('@/views/TabunganView.vue')
const BisyarohView = () => import('@/views/BisyarohView.vue')
// v.21.109.0527: RaporBridgeView dihapus (orphan)
const KritikSaranView = () => import('@/views/KritikSaranView.vue')
const AbsensiGuruView = () => import('@/views/AbsensiGuruView.vue')
const SantriFormView = () => import('@/views/SantriFormView.vue')
const GuruFormView = () => import('@/views/GuruFormView.vue')
const LembagaFormView = () => import('@/views/LembagaFormView.vue')
const LembagaDetailView = () => import('@/views/LembagaDetailView.vue')
const AbsensiSantriView = () => import('@/views/AbsensiSantriView.vue')
const PostsView = () => import('@/views/PostsView.vue')
const BukuIndukView = () => import('@/views/BukuIndukView.vue')
const LaporanKeuanganView = () => import('@/views/LaporanKeuanganView.vue')
const PsbFormView = () => import('@/views/PpdbFormView.vue')
const PsbAdminView = () => import('@/views/PpdbAdminView.vue')
// v.20.59.0526: PSB Detail view (ACF + dokumen + convert)
const PsbDetailView = () => import('@/views/PpdbDetailView.vue')
// v.55.0526: POS Santri full integration
const PosSantriView = () => import('@/views/PosSantriView.vue')
// v.21.88.0527: Riwayat transaksi POS
const RiwayatPosView = () => import('@/views/RiwayatPosView.vue')
// v.21.101.0527: Ekspor riwayat keuangan per santri 1 tahun
const RiwayatSantriView = () => import('@/views/RiwayatSantriView.vue')
// v.64.0526: Naik Kelas full Vue (replace bridge view v.63)
const NaikKelasView = () => import('@/views/NaikKelasView.vue')
// v.66.0526: Kalender Kegiatan + Dashboard Statistik full Vue (Batch B)
const KalenderKegiatanView = () => import('@/views/KalenderKegiatanView.vue')
const StatistikView = () => import('@/views/StatistikView.vue')
// v.67.0526: Batch C — Input Bulanan + Rekap Prestasi + Rekap Diniyah
const InputBulananView = () => import('@/views/InputBulananView.vue')
const RekapPrestasiView = () => import('@/views/RekapPrestasiView.vue')
const RekapDiniyahView = () => import('@/views/RekapDiniyahView.vue')
// v.68.0526: Batch D — Rapor Semester full Vue (replace bridge view)
const RaporView = () => import('@/views/RaporView.vue')
// v.70.0526: Pengaturan Keuangan full Vue port
const PengaturanKeuanganView = () => import('@/views/PengaturanKeuanganView.vue')
// v.71.0526: Master Data unified tabs view
const MasterDataView = () => import('@/views/MasterDataView.vue')
// v.72.1.0526: Kegiatan Pesantren full Vue
const KegiatanPesantrenView = () => import('@/views/KegiatanPesantrenView.vue')
// v.72.15.0526: Hutang Piutang full Vue (kyai req — fitur baru)
const HutangPiutangView = () => import('@/views/HutangPiutangView.vue')
// v.20.12.0526: Pembayaran (santri/wali) — placeholder fitur 2-jalur (kyai will finalize)
const PembayaranView = () => import('@/views/PembayaranView.vue')
// v.20.13.0526: Capaian Prestasi (santri) — merged single page: rekap + statistik + kartu kenaikan + rapor
const CapaianPrestasiView = () => import('@/views/CapaianPrestasiView.vue')
// v.20.18.0526: Personal page admin/super_admin/admin_keuangan — statistik kehadiran + slip bisyaroh
const PersonalView = () => import('@/views/PersonalView.vue')
// v.21.110.0527: Data Supervisi (Direktur/Supervisor)
const SupervisiView = () => import('@/views/SupervisiView.vue')
const AppLayout = () => import('@/components/layout/AppLayout.vue')

const routes = [
  { path: '/', redirect: '/dashboard' },
  // Route tanpa layout (full-screen)
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  // PSB Public form — no auth, no layout (standalone)
  { path: '/psb-form', name: 'psb-form', component: PsbFormView, meta: { public: true } },
  // Routes dengan layout shell (header + sidebar)
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'profil', name: 'profil', component: ProfilView },
      { path: 'santri', name: 'santri', component: SantriView },
      // Phase 5.13: Full CRUD form Vue
      { path: 'santri/new', name: 'santri-new', component: SantriFormView, meta: { admin: true } },
      { path: 'santri/:id/edit', name: 'santri-edit', component: SantriFormView, meta: { admin: true } },
      // Phase 5.6-5.8: Master Data
      { path: 'guru', name: 'guru', component: GuruView, meta: { admin: true } },
      { path: 'guru/new', name: 'guru-new', component: GuruFormView, meta: { admin: true } },
      { path: 'guru/:id/edit', name: 'guru-edit', component: GuruFormView, meta: { admin: true } },
      // v.21.27.0526: /lembaga redirect ke /master-data?tab=lembaga (konsolidasi single source)
      { path: 'lembaga', name: 'lembaga', redirect: { path: '/master-data', query: { tab: 'lembaga' } } },
      { path: 'lembaga/new', name: 'lembaga-new', component: LembagaFormView, meta: { admin: true } },
      { path: 'lembaga/:id/edit', name: 'lembaga-edit', component: LembagaFormView, meta: { admin: true } },
      { path: 'lembaga/:id', name: 'lembaga-detail', component: LembagaDetailView, meta: { admin: true } },
      { path: 'kelas', name: 'kelas', component: KelasView, meta: { admin: true } },
      // Phase 5.9: Edit/Tambah bridge ke legacy (full form di legacy index.html)
      { path: 'master-form/:entity', name: 'master-form', component: MasterFormBridgeView, meta: { admin: true } },
      // Phase 5.10 + 5.11: Field Order + ACF Custom Field schema editor
      { path: 'field-schema', name: 'field-schema', component: FieldSchemaView, meta: { admin: true } },
      // Batch 3 Phase 5.12-5.18: Keuangan + Rapor + Kritik
      { path: 'keuangan', name: 'keuangan', component: KeuanganDashboardView, meta: { admin: true } },
      // v.20.6.0526: Tagihan accessible santri (lihat tunggakan + riwayat pembayaran)
      { path: 'tagihan', name: 'tagihan', component: TagihanView },
      // v.20.12.0526: Pembayaran santri/wali — placeholder fitur 2-jalur
      { path: 'pembayaran', name: 'pembayaran', component: PembayaranView },
      // v.55.0526: POS Santri page — wire ModalPOS untuk transaksi cepat
      { path: 'pos-santri', name: 'pos-santri', component: PosSantriView, meta: { admin: true } },
      { path: 'pos-riwayat', name: 'pos-riwayat', component: RiwayatPosView, meta: { admin: true } },
      // v.21.101.0527: Ekspor riwayat per santri (Tagihan + Pembayaran + Tabungan)
      { path: 'riwayat-santri', name: 'riwayat-santri', component: RiwayatSantriView, meta: { admin: true } },
      // v.20.6.0526: Tabungan — santri boleh lihat tabungannya sendiri
      { path: 'tabungan', name: 'tabungan', component: TabunganView },
      // v.20.6.0526: Bisyaroh — guru BOLEH lihat slip bisyarohnya sendiri
      { path: 'bisyaroh', name: 'bisyaroh', component: BisyarohView },
      // v.68.0526: Rapor full Vue (window.print → Save as PDF)
      { path: 'rapor', name: 'rapor', component: RaporView },
      // v.20.6.0526: Naik Kelas — guru juga boleh akses (proses kenaikan santri kelasnya)
      { path: 'naik-kelas', name: 'naik-kelas', component: NaikKelasView, alias: '/kenaikan' },
      { path: 'absensi-guru', name: 'absensi-guru', component: AbsensiGuruView, meta: { admin: true } },
      { path: 'absensi-santri', name: 'absensi-santri', component: AbsensiSantriView },
      { path: 'posts', name: 'posts', component: PostsView, alias: '/mading' },
      // Phase 5.14: Buku Induk + Phase 5.20: PSB admin
      { path: 'buku-induk', name: 'buku-induk', component: BukuIndukView, meta: { admin: true } },
      // v.72.15.0526: Hutang Piutang
      { path: 'hutang-piutang', name: 'hutang-piutang', component: HutangPiutangView, meta: { admin: true } },
      { path: 'laporan-keuangan', name: 'laporan-keuangan', component: LaporanKeuanganView, meta: { admin: true } },
      { path: 'psb', name: 'psb', component: PsbAdminView, meta: { admin: true } },
      { path: 'psb/:id', name: 'psb-detail', component: PsbDetailView, meta: { admin: true } },
      { path: 'kritik-saran', name: 'kritik-saran', component: KritikSaranView },
      { path: 'pengaturan-web', name: 'pengaturan-web', component: PengaturanView, meta: { admin: true } },
      // v.70.0526: Pengaturan Keuangan full Vue
      { path: 'keu-pengaturan', name: 'keu-pengaturan', component: PengaturanKeuanganView, meta: { admin: true }, alias: '/pengaturan-keuangan' },
      // v.72.1.0526: Kegiatan Pesantren full Vue
      { path: 'kegiatan-pesantren', name: 'kegiatan-pesantren', component: KegiatanPesantrenView, meta: { admin: true } },
      // v.66.0526: Batch B — Kalender Kegiatan + Statistik full Vue
      { path: 'kalender', name: 'kalender', component: KalenderKegiatanView, alias: '/kalender-kegiatan' },
      { path: 'statistik', name: 'statistik', component: StatistikView },
      // v.20.6.0526: Input Bulanan + Rekap Prestasi/Diniyah — guru boleh akses (input nilai santri kelasnya)
      { path: 'input-bulanan', name: 'input-bulanan', component: InputBulananView },
      { path: 'rekap-prestasi', name: 'rekap-prestasi', component: RekapPrestasiView },
      { path: 'rekap-diniyah', name: 'rekap-diniyah', component: RekapDiniyahView },
      // v.21.19.0526: Master Data HANYA super_admin (kyai req)
      { path: 'master-data', name: 'master-data', component: MasterDataView, meta: { admin: true, roleSistem: 'super_admin' } },
      // v.20.13.0526: Capaian Prestasi (santri only — merged Dashboard + Pendidikan menu)
      { path: 'capaian-prestasi', name: 'capaian-prestasi', component: CapaianPrestasiView },
      // v.20.18.0526: Personal page admin (statistik kehadiran + slip bisyaroh personal)
      { path: 'personal', name: 'personal', component: PersonalView },
      // v.21.110.0527: Data Supervisi — gating Direktur/Supervisor di view-level
      { path: 'supervisi', name: 'supervisi', component: SupervisiView }
    ]
  },
  // catch-all
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Guard: protect non-public routes
// v.20.4.0526: WAIT authReady supaya refresh tidak redirect ke /login sebelum Firebase Auth restored
const PUBLIC_PATHS = ['/login', '/psb-form']
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  // Public route — langsung pass
  if (to.meta?.public || PUBLIC_PATHS.includes(to.path)) return next()
  // Wait Firebase Auth + admin restore selesai (max 3s safety timeout di store)
  if (auth.authReady) {
    try { await auth.authReady } catch (e) { /* ignore */ }
  }
  if (!auth.isLoggedIn) return next({ name: 'login', query: { redirect: to.fullPath } })
  if (to.meta?.admin && !auth.isAdmin) return next({ name: 'dashboard' })
  // v.21.19.0526: roleSistem gate — kalau route butuh super_admin tapi user bukan, redirect
  if (to.meta?.roleSistem && auth.sesiAktif?.role_sistem !== to.meta.roleSistem) {
    return next({ name: 'dashboard' })
  }
  next()
})

// v.20.20.0526: PRELOAD all lazy route chunks in background AFTER initial route loaded
// → solve jeda navigation (kyai req). Setiap route lazy, click pertama harus fetch chunk → lambat.
// Solution: trigger import semua component dynamic 2 detik setelah app load,
// chunks akan cached di browser, click berikutnya instant.
let _preloadDone = false
router.afterEach(() => {
  if (_preloadDone) return
  _preloadDone = true
  setTimeout(() => {
    const allRoutes = router.getRoutes()
    allRoutes.forEach((r) => {
      const comp = r.components?.default
      if (typeof comp === 'function') {
        // Lazy import — trigger prefetch
        try { comp() } catch (e) { /* ignore */ }
      }
    })
  }, 800)
})

export default router
