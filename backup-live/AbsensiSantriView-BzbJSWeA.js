import {
  ab as oe,
  Q as g,
  I as de,
  a2 as Z,
  K as ue,
  d as S,
  ae as ce,
  h as u,
  a7 as d,
  e as t,
  F as L,
  j as w,
  a4 as o,
  ar as F,
  aj as P,
  z as V,
  U as N,
  i as fe,
  E as G,
  g as Y,
  Z as pe,
  q as Q,
  l as q,
  L as c,
  N as be,
  c as xe,
  ap as me,
  t as ge,
  n as ke
} from './index-CPbTnm_Q.js'
import { u as he } from './useExcel-D_0sjauS.js'
import { b as ve } from './pdfBuilder-C97mFJ0V.js'
import { u as _e } from './useConfirm-DjSfx6QZ.js'
import { u as ye } from './useToast-BjwjYk11.js'
import './pdf-CfElz_X6.js'
const W = [
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
function we() {
  const O = oe(),
    h = g([]),
    p = g([]),
    U = g(!0),
    B = [],
    b = g(new Date().getFullYear()),
    x = g(new Date().getMonth() + 1),
    v = g(''),
    _ = g(''),
    A = g(''),
    C = S(() => {
      const n = O.sesiAktif
      return n
        ? n.role === 'admin' ||
            n.id === 'admin' ||
            ['super_admin', 'admin', 'admin_keuangan'].includes(n.role_sistem) ||
            n.role === 'guru'
        : !1
    }),
    H = S(() => p.value.filter((n) => n.is_mukim === !1 || n.is_fullday === !0)),
    $ = S(() => {
      const n = `${b.value}-${String(x.value).padStart(2, '0')}`
      let r = h.value.filter((l) => String(l.tanggal || '').substring(0, 7) === n)
      return (
        A.value &&
          (r = r.filter((l) => String(l.status || '').toLowerCase() === A.value.toLowerCase())),
        (r = r.filter((l) => {
          const f = p.value.find((R) => String(R.id) === String(l.santri_id || l.santriId))
          return !(
            !f ||
            (f.is_mukim === !0 && f.is_fullday !== !0) ||
            (v.value && f.lembaga_sekolah !== v.value && f.lembaga !== v.value) ||
            (_.value && f.kelas_sekolah !== _.value && f.kelas !== _.value)
          )
        })),
        r.sort((l, f) => (f.tanggal || '').localeCompare(l.tanggal || ''))
      )
    }),
    M = S(() => {
      const n = { hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 }
      for (const r of $.value) {
        const l = String(r.status || '').toLowerCase()
        ;(l === 'hadir' || l === 'h'
          ? n.hadir++
          : l === 'alfa' || l === 'a'
            ? n.alfa++
            : l === 'sakit' || l === 's'
              ? n.sakit++
              : (l === 'izin' || l === 'i') && n.izin++,
          n.total++)
      }
      return n
    }),
    K = S(() => {
      const n = {}
      for (const r of $.value) {
        const l = String(r.santri_id || r.santriId || '')
        n[l] || (n[l] = { santri_id: l, hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 })
        const f = String(r.status || '').toLowerCase()
        ;(f === 'hadir' || f === 'h'
          ? n[l].hadir++
          : f === 'alfa' || f === 'a'
            ? n[l].alfa++
            : f === 'sakit' || f === 's'
              ? n[l].sakit++
              : (f === 'izin' || f === 'i') && n[l].izin++,
          n[l].total++)
      }
      return Object.values(n).sort((r, l) => l.hadir - r.hadir)
    })
  function y(n) {
    const r = p.value.find((l) => String(l.id) === String(n))
    return r ? r.nama : '(unknown)'
  }
  function j(n) {
    return p.value.find((r) => String(r.id) === String(n))
  }
  function D(n) {
    return W[n - 1] || '-'
  }
  return (
    de(() => {
      B.push(
        Z('absensi_santri_sekolah', (n) => {
          ;((h.value = n), (U.value = !1))
        }),
        Z('santri', (n) => {
          p.value = n
        })
      )
    }),
    ue(() => {
      for (const n of B)
        if (n)
          try {
            n()
          } catch {}
    }),
    {
      absensi: h,
      filteredAbsensi: $,
      rekapPerSantri: K,
      santriRaw: p,
      santriNonMukim: H,
      loading: U,
      selectedYear: b,
      selectedMonth: x,
      filterLembaga: v,
      filterKelas: _,
      filterStatus: A,
      stats: M,
      isFullAccess: C,
      getNamaSantri: y,
      getSantriInfo: j,
      getBulanLabel: D,
      BULAN: W
    }
  )
}
const Se = { class: 'p-3 md:p-5 max-w-6xl mx-auto space-y-4' },
  Ae = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center'
  },
  $e = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  ze = { class: 'flex flex-col md:flex-row md:items-center md:justify-between gap-3' },
  Le = { class: 'text-xs text-slate-500 mt-0.5' },
  Ce = { class: 'flex flex-wrap gap-2' },
  Ne = {
    class:
      'px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 text-xs'
  },
  Ue = { class: 'text-emerald-700 dark:text-emerald-300 font-bold' },
  Me = {
    class: 'px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-200 text-xs'
  },
  De = { class: 'text-rose-700 dark:text-rose-300 font-bold' },
  Ee = {
    class:
      'px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 text-xs'
  },
  Ie = { class: 'text-amber-700 dark:text-amber-300 font-bold' },
  Fe = {
    class:
      'px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 text-xs'
  },
  Pe = { class: 'text-purple-700 dark:text-purple-300 font-bold' },
  Ve = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Be = { class: 'grid grid-cols-2 md:grid-cols-5 gap-2' },
  He = ['value'],
  Ke = ['value'],
  je = ['value'],
  Re = ['value'],
  Te = {
    class: 'bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 shadow-sm flex gap-1'
  },
  Ge = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-wrap gap-2'
  },
  Ye = ['disabled'],
  qe = ['disabled'],
  Oe = ['disabled'],
  Je = { key: 0, class: 'bg-white dark:bg-slate-800 rounded-2xl p-10 text-center' },
  Ze = { key: 1, class: 'space-y-2' },
  Qe = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  We = { class: 'flex items-center gap-3' },
  Xe = { class: 'flex-1 min-w-0' },
  et = { class: 'text-sm font-black text-slate-800 truncate' },
  tt = { class: 'flex gap-1.5 mt-1 text-[10px]' },
  at = { class: 'bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold' },
  st = { class: 'bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold' },
  nt = { class: 'bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold' },
  lt = { class: 'bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold' },
  rt = { class: 'text-right flex-shrink-0' },
  it = { class: 'text-2xl font-black text-cyan-700' },
  ot = ['onClick'],
  dt = { key: 2, class: 'space-y-1.5' },
  ut = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center'
  },
  ct = { class: 'flex items-center gap-3' },
  ft = { class: 'flex-1 min-w-0' },
  pt = { class: 'text-sm font-bold text-slate-800 truncate' },
  bt = { class: 'text-[11px] text-slate-500' },
  xt = { class: 'capitalize' },
  mt = { key: 0, class: 'ml-1' },
  gt = { class: 'text-center text-[10px] text-slate-400 pt-2' },
  St = {
    __name: 'AbsensiSantriView',
    setup(O) {
      const {
          filteredAbsensi: h,
          rekapPerSantri: p,
          santriRaw: U,
          loading: B,
          selectedYear: b,
          selectedMonth: x,
          filterLembaga: v,
          filterKelas: _,
          filterStatus: A,
          stats: C,
          isFullAccess: H,
          getNamaSantri: $,
          getSantriInfo: M,
          getBulanLabel: K,
          BULAN: y
        } = we(),
        { exportStyled: j } = he(),
        D = ce(),
        n = g(!1),
        r = g(!1)
      async function l() {
        if (!n.value) {
          if (!h.value.length) {
            z.error('Tidak ada absensi di filter saat ini')
            return
          }
          n.value = !0
          try {
            const s = x.value,
              e = b.value,
              a = s >= 7 ? 'Ganjil' : 'Genap',
              i = s >= 7 ? `${e}-${e + 1}` : `${e - 1}-${e}`,
              I = `${i}_${a}`.replace(/[^a-zA-Z0-9_]/g, '_')
            let m = 0
            for (const k of p.value) {
              const T = M(k.santri_id)
              if (!T) continue
              const J = T.lembaga || '',
                re = `rapor_${k.santri_id}_${J}_${I}`,
                ie = {
                  santri_id: k.santri_id,
                  santri_nama: T.nama || '',
                  lembaga: J,
                  tahunAjaran: i,
                  semester: a,
                  absensi: {
                    sakit: k.sakit,
                    izin: k.izin,
                    alpa: k.alfa,
                    hadir: k.hadir,
                    total: k.total,
                    _generatedFrom: 'absensi_santri_sekolah',
                    _generatedAt: new Date().toISOString(),
                    _periodGenerated: `${y[s - 1]} ${e}`
                  }
                }
              ;(await pe(Q(q, 'rapor_semester', re), ie, { merge: !0 }), m++)
            }
            z.success(`Absensi ${m} santri ter-generate ke rapor (${a} ${i})`)
          } catch (s) {
            z.error('Gagal generate: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            n.value = !1
          }
        }
      }
      async function f() {
        if (!r.value) {
          r.value = !0
          try {
            const s = p.value.map((e, a) => {
              const i = M(e.santri_id) || {}
              return {
                no: a + 1,
                nama: i.nama || '(unknown)',
                lembaga: i.lembaga || i.lembaga_sekolah || '',
                kelas: i.kelas || i.kelas_sekolah || '',
                hadir: e.hadir,
                alfa: e.alfa,
                sakit: e.sakit,
                izin: e.izin,
                total: e.total
              }
            })
            await j(s, {
              filename: `absensi-santri-${y[x.value - 1]}-${b.value}.xlsx`,
              sheetName: 'Absensi',
              title: `REKAP ABSENSI ${y[x.value - 1].toUpperCase()} ${b.value}`,
              columns: [
                { key: 'no', header: 'No', width: 6 },
                { key: 'nama', header: 'Nama Santri', width: 28 },
                { key: 'lembaga', header: 'Lembaga', width: 18 },
                { key: 'kelas', header: 'Kelas', width: 10 },
                { key: 'hadir', header: 'Hadir', width: 8 },
                { key: 'alfa', header: 'Alfa', width: 8 },
                { key: 'sakit', header: 'Sakit', width: 8 },
                { key: 'izin', header: 'Izin', width: 8 },
                { key: 'total', header: 'Total', width: 8 }
              ]
            })
          } catch (s) {
            z.error('Gagal export Excel: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            r.value = !1
          }
        }
      }
      async function R() {
        if (!r.value) {
          r.value = !0
          try {
            const s = (D == null ? void 0 : D.settings) || {},
              e = {
                logoUrl: s.kop_logo || '',
                line1: s.kopLine1 || 'YAYASAN MAMBAUL ULUM',
                line2: s.kopLine2 || '',
                line3: s.kopLine3 || ''
              },
              a = p.value.map((i, I) => {
                const m = M(i.santri_id) || {}
                return {
                  no: I + 1,
                  nama: m.nama || '(unknown)',
                  lembaga: m.lembaga || m.lembaga_sekolah || '',
                  kelas: m.kelas || m.kelas_sekolah || '',
                  hadir: i.hadir,
                  alfa: i.alfa,
                  sakit: i.sakit,
                  izin: i.izin,
                  total: i.total
                }
              })
            await ve({
              kind: 'umum',
              orientation: 'l',
              format: 'a4',
              kop: e,
              title: `REKAP ABSENSI ${y[x.value - 1].toUpperCase()} ${b.value}`,
              columns: [
                { key: 'no', header: 'No', width: 10 },
                { key: 'nama', header: 'Nama', width: 60 },
                { key: 'lembaga', header: 'Lembaga', width: 32 },
                { key: 'kelas', header: 'Kelas', width: 18 },
                { key: 'hadir', header: 'H', width: 15 },
                { key: 'alfa', header: 'A', width: 15 },
                { key: 'sakit', header: 'S', width: 15 },
                { key: 'izin', header: 'I', width: 15 },
                { key: 'total', header: 'Total', width: 18 }
              ],
              rows: a,
              filename: `absensi-santri-${y[x.value - 1]}-${b.value}.pdf`
            })
          } catch (s) {
            z.error('Gagal export PDF: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            r.value = !1
          }
        }
      }
      const E = g('rekap'),
        X = S(() => {
          const s = new Date().getFullYear()
          return [s - 1, s, s + 1]
        }),
        ee = S(() => {
          const s = new Set()
          for (const e of U.value)
            (e != null && e.lembaga_sekolah && s.add(e.lembaga_sekolah),
              e != null && e.lembaga && s.add(e.lembaga))
          return [...s].sort()
        }),
        te = S(() => {
          const s = new Set()
          for (const e of U.value)
            (e != null && e.kelas && s.add(e.kelas),
              e != null && e.kelas_sekolah && s.add(e.kelas_sekolah))
          return [...s].sort()
        })
      function ae(s) {
        const e = String(s || '').toLowerCase()
        return e === 'hadir' || e === 'h'
          ? 'H'
          : e === 'alfa' || e === 'a'
            ? 'A'
            : e === 'sakit' || e === 's'
              ? 'S'
              : e === 'izin' || e === 'i'
                ? 'I'
                : '?'
      }
      function se(s) {
        const e = String(s || '').toLowerCase()
        return e === 'hadir' || e === 'h'
          ? 'bg-emerald-500'
          : e === 'alfa' || e === 'a'
            ? 'bg-rose-500'
            : e === 'sakit' || e === 's'
              ? 'bg-amber-500'
              : e === 'izin' || e === 'i'
                ? 'bg-purple-500'
                : 'bg-slate-400'
      }
      const ne = _e(),
        z = ye()
      async function le(s) {
        if (!s) return
        const e = $(s)
        if (
          await ne({
            title: 'Hapus semua absensi santri ini?',
            message: `Akan hapus SEMUA record absensi untuk "${e}". Tidak bisa di-undo.`,
            confirmText: 'Hapus',
            danger: !0
          })
        )
          try {
            const i = be(xe(q, 'absensi_santri'), me('santri_id', '==', String(s))),
              I = await ge(i)
            let m = 0
            for (const k of I.docs) (await ke(Q(q, 'absensi_santri', k.id)), m++)
            z.success(`${m} record absensi dihapus untuk ${e}`)
          } catch (i) {
            z.error('Gagal hapus: ' + (i.message || i))
          }
      }
      return (s, e) => (
        c(),
        u('div', Se, [
          d(H)
            ? (c(),
              u(
                L,
                { key: 1 },
                [
                  t('div', $e, [
                    t('div', ze, [
                      t('div', null, [
                        e[8] ||
                          (e[8] = t(
                            'h1',
                            {
                              class: 'text-xl md:text-2xl font-black text-slate-800 dark:text-white'
                            },
                            [
                              t('i', { class: 'fas fa-clipboard-check text-cyan-500 mr-2' }),
                              w('Rekap Absensi Santri ')
                            ],
                            -1
                          )),
                        t('p', Le, o(d(K)(d(x))) + ' ' + o(d(b)), 1)
                      ]),
                      t('div', Ce, [
                        t('div', Ne, [
                          t('span', Ue, o(d(C).hadir), 1),
                          e[9] || (e[9] = t('span', { class: 'text-slate-500 ml-1' }, 'hadir', -1))
                        ]),
                        t('div', Me, [
                          t('span', De, o(d(C).alfa), 1),
                          e[10] || (e[10] = t('span', { class: 'text-slate-500 ml-1' }, 'alfa', -1))
                        ]),
                        t('div', Ee, [
                          t('span', Ie, o(d(C).sakit), 1),
                          e[11] ||
                            (e[11] = t('span', { class: 'text-slate-500 ml-1' }, 'sakit', -1))
                        ]),
                        t('div', Fe, [
                          t('span', Pe, o(d(C).izin), 1),
                          e[12] || (e[12] = t('span', { class: 'text-slate-500 ml-1' }, 'izin', -1))
                        ])
                      ])
                    ])
                  ]),
                  t('div', Ve, [
                    t('div', Be, [
                      F(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[0] || (e[0] = (a) => (V(b) ? (b.value = a) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none'
                          },
                          [
                            (c(!0),
                            u(
                              L,
                              null,
                              N(
                                X.value,
                                (a) => (c(), u('option', { key: a, value: a }, o(a), 9, He))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[P, d(b), void 0, { number: !0 }]]
                      ),
                      F(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[1] || (e[1] = (a) => (V(x) ? (x.value = a) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none'
                          },
                          [
                            (c(!0),
                            u(
                              L,
                              null,
                              N(
                                d(y),
                                (a, i) => (c(), u('option', { key: a, value: i + 1 }, o(a), 9, Ke))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[P, d(x), void 0, { number: !0 }]]
                      ),
                      F(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[2] || (e[2] = (a) => (V(v) ? (v.value = a) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none'
                          },
                          [
                            e[13] || (e[13] = t('option', { value: '' }, 'Semua lembaga', -1)),
                            (c(!0),
                            u(
                              L,
                              null,
                              N(
                                ee.value,
                                (a) => (c(), u('option', { key: a, value: a }, o(a), 9, je))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[P, d(v)]]
                      ),
                      F(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[3] || (e[3] = (a) => (V(_) ? (_.value = a) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none'
                          },
                          [
                            e[14] || (e[14] = t('option', { value: '' }, 'Semua kelas', -1)),
                            (c(!0),
                            u(
                              L,
                              null,
                              N(
                                te.value,
                                (a) => (c(), u('option', { key: a, value: a }, o(a), 9, Re))
                              ),
                              128
                            ))
                          ],
                          512
                        ),
                        [[P, d(_)]]
                      ),
                      F(
                        t(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[4] || (e[4] = (a) => (V(A) ? (A.value = a) : null)),
                            class:
                              'px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-cyan-500 outline-none'
                          },
                          [
                            ...(e[15] ||
                              (e[15] = [
                                fe(
                                  '<option value="">Semua status</option><option value="hadir">Hadir</option><option value="alfa">Alfa</option><option value="sakit">Sakit</option><option value="izin">Izin</option>',
                                  5
                                )
                              ]))
                          ],
                          512
                        ),
                        [[P, d(A)]]
                      )
                    ])
                  ]),
                  t('div', Te, [
                    t(
                      'button',
                      {
                        onClick: e[5] || (e[5] = (a) => (E.value = 'rekap')),
                        class: G([
                          'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
                          E.value === 'rekap'
                            ? 'bg-cyan-600 text-white shadow'
                            : 'text-slate-600 hover:bg-cyan-50'
                        ])
                      },
                      'Rekap per Santri',
                      2
                    ),
                    t(
                      'button',
                      {
                        onClick: e[6] || (e[6] = (a) => (E.value = 'detail')),
                        class: G([
                          'flex-1 px-3 py-2 text-sm rounded-xl font-bold transition',
                          E.value === 'detail'
                            ? 'bg-cyan-600 text-white shadow'
                            : 'text-slate-600 hover:bg-cyan-50'
                        ])
                      },
                      'Detail per Hari',
                      2
                    )
                  ]),
                  t('div', Ge, [
                    t(
                      'button',
                      {
                        onClick: l,
                        disabled: n.value,
                        class:
                          'px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 inline-flex items-center gap-1'
                      },
                      [
                        e[16] || (e[16] = t('i', { class: 'fas fa-file-export' }, null, -1)),
                        w(' ' + o(n.value ? 'Memproses...' : 'Generate ke Rapor'), 1)
                      ],
                      8,
                      Ye
                    ),
                    t(
                      'button',
                      {
                        onClick: f,
                        disabled: r.value,
                        class:
                          'px-3 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 inline-flex items-center gap-1'
                      },
                      [
                        ...(e[17] ||
                          (e[17] = [
                            t('i', { class: 'fas fa-file-excel' }, null, -1),
                            w('Export Excel ', -1)
                          ]))
                      ],
                      8,
                      qe
                    ),
                    t(
                      'button',
                      {
                        onClick: R,
                        disabled: r.value,
                        class:
                          'px-3 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 inline-flex items-center gap-1'
                      },
                      [
                        ...(e[18] ||
                          (e[18] = [
                            t('i', { class: 'fas fa-file-pdf' }, null, -1),
                            w('Export PDF ', -1)
                          ]))
                      ],
                      8,
                      Oe
                    ),
                    e[19] ||
                      (e[19] = t(
                        'span',
                        { class: 'text-[10px] text-slate-400 italic ml-auto self-center' },
                        [
                          t('i', { class: 'fas fa-info-circle mr-1' }),
                          w('Filter santri: non-mukim (PP/Fullday) only ')
                        ],
                        -1
                      ))
                  ]),
                  d(B)
                    ? (c(),
                      u('div', Je, [
                        ...(e[20] ||
                          (e[20] = [
                            t(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3' },
                              null,
                              -1
                            ),
                            t(
                              'p',
                              { class: 'text-sm text-slate-500 font-bold' },
                              'Memuat absensi...',
                              -1
                            )
                          ]))
                      ]))
                    : E.value === 'rekap'
                      ? (c(),
                        u('div', Ze, [
                          d(p).length === 0
                            ? (c(),
                              u('div', Qe, [
                                ...(e[21] ||
                                  (e[21] = [
                                    t(
                                      'i',
                                      {
                                        class: 'fas fa-calendar-times text-slate-300 text-4xl mb-3'
                                      },
                                      null,
                                      -1
                                    ),
                                    t(
                                      'p',
                                      {
                                        class:
                                          'text-sm font-bold text-slate-700 dark:text-slate-300'
                                      },
                                      'Tidak ada absensi',
                                      -1
                                    )
                                  ]))
                              ]))
                            : Y('', !0),
                          (c(!0),
                          u(
                            L,
                            null,
                            N(
                              d(p),
                              (a) => (
                                c(),
                                u(
                                  'div',
                                  {
                                    key: a.santri_id,
                                    class:
                                      'bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 shadow-sm'
                                  },
                                  [
                                    t('div', We, [
                                      e[24] ||
                                        (e[24] = t(
                                          'div',
                                          {
                                            class:
                                              'flex-shrink-0 w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center'
                                          },
                                          [t('i', { class: 'fas fa-user-graduate' })],
                                          -1
                                        )),
                                      t('div', Xe, [
                                        t('h3', et, o(d($)(a.santri_id)), 1),
                                        t('div', tt, [
                                          t('span', at, 'H: ' + o(a.hadir), 1),
                                          t('span', st, 'A: ' + o(a.alfa), 1),
                                          t('span', nt, 'S: ' + o(a.sakit), 1),
                                          t('span', lt, 'I: ' + o(a.izin), 1)
                                        ])
                                      ]),
                                      t('div', rt, [
                                        t('p', it, o(a.hadir), 1),
                                        t(
                                          'button',
                                          {
                                            onClick: (i) => le(a.santri_id),
                                            class:
                                              'text-[10px] text-rose-600 hover:text-rose-800 font-bold mt-1',
                                            title: 'Hapus semua absensi santri ini'
                                          },
                                          [
                                            ...(e[22] ||
                                              (e[22] = [
                                                t('i', { class: 'fas fa-trash mr-1' }, null, -1),
                                                w('Hapus ', -1)
                                              ]))
                                          ],
                                          8,
                                          ot
                                        ),
                                        e[23] ||
                                          (e[23] = t(
                                            'p',
                                            {
                                              class:
                                                'text-[10px] text-slate-500 uppercase font-bold'
                                            },
                                            'hari hadir',
                                            -1
                                          ))
                                      ])
                                    ])
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ]))
                      : (c(),
                        u('div', dt, [
                          d(h).length === 0
                            ? (c(),
                              u('div', ut, [
                                ...(e[25] ||
                                  (e[25] = [
                                    t(
                                      'i',
                                      {
                                        class: 'fas fa-calendar-times text-slate-300 text-4xl mb-3'
                                      },
                                      null,
                                      -1
                                    ),
                                    t(
                                      'p',
                                      { class: 'text-sm font-bold text-slate-700' },
                                      'Tidak ada absensi',
                                      -1
                                    )
                                  ]))
                              ]))
                            : Y('', !0),
                          (c(!0),
                          u(
                            L,
                            null,
                            N(
                              d(h),
                              (a) => (
                                c(),
                                u(
                                  'div',
                                  {
                                    key: a.id,
                                    class:
                                      'bg-white dark:bg-slate-800 rounded-xl p-2.5 border border-slate-200 shadow-sm'
                                  },
                                  [
                                    t('div', ct, [
                                      t(
                                        'div',
                                        {
                                          class: G([
                                            'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs',
                                            se(a.status)
                                          ])
                                        },
                                        o(ae(a.status)),
                                        3
                                      ),
                                      t('div', ft, [
                                        t('p', pt, o(d($)(a.santri_id || a.santriId)), 1),
                                        t('p', bt, [
                                          w(o(a.tanggal) + ' · ', 1),
                                          t('span', xt, o(a.status), 1),
                                          a.keterangan
                                            ? (c(), u('span', mt, '· ' + o(a.keterangan), 1))
                                            : Y('', !0)
                                        ])
                                      ])
                                    ])
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ])),
                  t('p', gt, [
                    e[26] || (e[26] = t('i', { class: 'fas fa-circle-info mr-1' }, null, -1)),
                    w(o(d(h).length) + ' absensi · Vue 3 · Phase 5.17 ', 1)
                  ])
                ],
                64
              ))
            : (c(),
              u('div', Ae, [
                ...(e[7] ||
                  (e[7] = [
                    t('i', { class: 'fas fa-lock text-rose-300 text-4xl mb-3' }, null, -1),
                    t(
                      'p',
                      { class: 'text-sm font-bold text-slate-700 dark:text-slate-300' },
                      'Akses terbatas',
                      -1
                    )
                  ]))
              ]))
        ])
      )
    }
  }
export { St as default }
