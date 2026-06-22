s = open('/tmp/head_bi.vue', encoding='utf-8').read().replace('\r\n', '\n')

def rep(old, new, tag):
    c = s.count(old)
    if c != 1:
        raise AssertionError(f'{tag} count={c}')
    return s.replace(old, new)

# E1: import deleteDoc + isSuperAdmin
s = rep(
    "import { doc, setDoc, serverTimestamp } from 'firebase/firestore'\nimport { db } from '@/services/firebase'\nimport { fmtRp, formatTanggal as formatTgl } from '@/utils/format'\nimport { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'",
    "import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'\nimport { db } from '@/services/firebase'\nimport { fmtRp, formatTanggal as formatTgl } from '@/utils/format'\nimport { buildListPdf, buildKopFromSettings } from '@/utils/pdfBuilder'\nimport { isSuperAdmin } from '@/utils/roleScope'",
    'E1'
)

# E2: isAdmin + hapusBuku
s = rep(
    "const toast = useToast()\nconst auth = useAuthStore()\nconst settingsStore = useSettingsStore()\nconst { exportStyled } = useExcel()",
    """const toast = useToast()
const auth = useAuthStore()
const settingsStore = useSettingsStore()
const { exportStyled } = useExcel()
// v.21.98.0527: super_admin only — bisa hapus record buku induk
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

async function hapusBuku(b) {
  if (!isAdmin.value) return
  const label = b.keterangan || b.kategori || b.id
  if (!confirm(`Hapus PERMANEN record buku induk:\\n${label}\\nNominal: ${fmtRp(b.nominal || 0)}\\n\\nTidak bisa di-undo.`)) return
  try {
    await deleteDoc(doc(db, 'keuangan_buku_induk', String(b.id)))
    toast.success('Record dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}""",
    'E2'
)

# E3: filteredBuku tabungan filter (Z3)
s = rep(
    "const filteredBuku = computed(() => {\n  let list = [...bukuRaw.value]\n  // Filter by year/month\n  if (selectedMonth.value > 0) {",
    """const filteredBuku = computed(() => {
  // v.21.96.0527: Defensive — exclude residu tabungan dari buku induk (sebelum fix POS X1
  // sempat ada transaksi tabungan tertulis ke keuangan_buku_induk).
  let list = bukuRaw.value.filter((b) => {
    const kat = String(b.kategori || '').toLowerCase()
    const sumber = String(b.sumber || '').toLowerCase()
    if (kat === 'tabungan' || sumber === 'tabungan' || sumber.includes('tabungan')) return false
    return true
  })
  // Filter by year/month
  if (selectedMonth.value > 0) {""",
    'E3'
)

# E4: tombol hapus per row
s = rep(
    """            <div class="md:text-right">
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
          </div>
        </div>
      </div>""",
    """            <div class="md:text-right flex items-center md:justify-end gap-2">
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
              <button
                v-if="isAdmin"
                type="button"
                @click="hapusBuku(b)"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Hapus record (super admin)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>""",
    'E4'
)

open('/tmp/bi_final.vue', 'w', encoding='utf-8').write(s)
print('OK lines', s.count('\n') + 1)
