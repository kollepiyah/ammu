import {
  ab as be,
  Q as v,
  an as pe,
  h as b,
  e as r,
  j as m,
  a4 as c,
  ar as g,
  aj as V,
  F as _,
  U as S,
  ak as T,
  g as O,
  f as ce,
  k as ke,
  aq as xe,
  a as me,
  T as ge,
  d as h,
  au as fe,
  l as Y,
  q as ve,
  P as he,
  ac as we,
  L as i,
  E as W,
  at as _e
} from './index-CPbTnm_Q.js'
import { u as ye } from './useSantri-BrAe1mw4.js'
import { u as Se } from './useLembaga-8ypq4SFU.js'
import { u as Ce } from './useGuru-BEk_ofri.js'
import { u as Pe } from './useToast-BjwjYk11.js'
const Te = { class: 'p-4 md:p-6 max-w-7xl mx-auto space-y-4' },
  Ae = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  $e = { class: 'flex items-center justify-between gap-3 flex-wrap mb-3' },
  je = { class: 'flex items-center gap-2' },
  Le = { class: 'text-[10px] text-slate-500 dark:text-slate-400 hidden md:inline' },
  Ue = ['disabled'],
  Ve = { class: 'grid grid-cols-2 md:grid-cols-4 gap-2' },
  Ie = ['value'],
  Be = ['value'],
  ze = ['value'],
  Ne = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  Me = { class: 'overflow-x-auto' },
  Oe = { class: 'w-full text-xs' },
  Qe = { class: 'bg-slate-100 dark:bg-slate-700 sticky top-0' },
  Fe = {
    key: 0,
    class:
      'p-2 text-center font-black text-rose-700 dark:text-rose-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-rose-50/50 dark:bg-rose-900/20 w-20'
  },
  Ke = { key: 0 },
  De = ['colspan'],
  Ee = { class: 'bg-slate-200 dark:bg-slate-700/50' },
  Ge = ['colspan'],
  Re = {
    class:
      'p-2 font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 whitespace-nowrap leading-tight'
  },
  Je = {
    key: 0,
    class:
      'block text-[9px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-1 rounded mt-0.5 w-fit'
  },
  He = { class: 'p-2 text-center font-bold border-b border-slate-100 dark:border-slate-700' },
  qe = {
    class: 'p-1 border-b border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-700/20'
  },
  Ye = ['onUpdate:modelValue', 'onChange'],
  We = ['value'],
  Ze = {
    class: 'p-1 border-b border-slate-100 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-700/20'
  },
  Xe = ['onUpdate:modelValue', 'onChange'],
  et = ['value'],
  tt = {
    key: 0,
    class: 'p-1 border-b border-slate-100 dark:border-slate-700 bg-rose-50/30 dark:bg-rose-900/10'
  },
  at = { key: 0, class: 'flex items-center gap-1' },
  rt = ['onUpdate:modelValue', 'onInput'],
  st = { key: 1, class: 'text-[10px] text-slate-400' },
  lt = { class: 'p-1 border-b border-slate-100 dark:border-slate-700' },
  ot = ['onUpdate:modelValue', 'onInput'],
  nt = { class: 'p-1 border-b border-slate-100 dark:border-slate-700' },
  dt = ['onUpdate:modelValue', 'onInput'],
  it = {
    class: 'p-1 border-b border-slate-100 dark:border-slate-700 bg-blue-50/30 dark:bg-blue-900/10'
  },
  ut = ['value'],
  bt = ['onUpdate:modelValue', 'onInput'],
  pt = {
    class:
      'p-1 border-b border-slate-100 dark:border-slate-700 bg-amber-50/30 dark:bg-amber-900/10 text-center'
  },
  ct = ['onClick', 'title'],
  kt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border-t-8 border-amber-500'
  },
  xt = {
    class:
      'flex justify-between items-center border-b border-slate-100 dark:border-slate-700 px-5 py-4'
  },
  mt = { class: 'p-5 space-y-3' },
  gt = {
    class:
      'bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-200 dark:border-amber-700'
  },
  ft = { class: 'text-slate-800 dark:text-white text-base font-black' },
  vt = { class: 'text-[11px] text-slate-500 mt-0.5' },
  ht = {
    class:
      'px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-2 rounded-b-2xl'
  },
  Tt = {
    __name: 'InputBulananView',
    setup(wt) {
      const { santriRaw: Q } = ye(),
        { lembagaRaw: R } = Se(),
        { guruRaw: Z } = Ce(),
        F = Pe(),
        C = be(),
        K = we(),
        X = h(() => {
          var t, e, a, o
          return (
            ((t = C.sesiAktif) == null ? void 0 : t.role) === 'guru' &&
            ((e = C.sesiAktif) == null ? void 0 : e.role_sistem) !== 'super_admin' &&
            ((a = C.sesiAktif) == null ? void 0 : a.role_sistem) !== 'admin' &&
            ((o = C.sesiAktif) == null ? void 0 : o.role_sistem) !== 'admin_keuangan'
          )
        }),
        J = [
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
        ],
        D = new Date(),
        A = v(D.getMonth()),
        $ = v(D.getFullYear()),
        j = v(''),
        I = v(''),
        ee = h(() => {
          const t = D.getFullYear()
          return [t - 1, t, t + 1]
        }),
        te = h(() => (R.value || []).map((t) => t.lembaga).filter(Boolean)),
        ae = h(() => {
          const t = new Set()
          return (
            Q.value.forEach((e) => {
              e.kelas_sekolah && t.add(e.kelas_sekolah)
            }),
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach((e) =>
              t.add(e)
            ),
            [...t].sort((e, a) => Number(e) - Number(a))
          )
        })
      function re(t) {
        const e = (R.value || []).find((a) => a.lembaga === t)
        return e && Array.isArray(e.kelas_list) ? e.kelas_list : []
      }
      function w(t) {
        const e = String(t || '').match(/\d+/)
        return e ? parseInt(e[0]) : 0
      }
      const L = h(() => {
          var a, o, s
          let t = Q.value.filter((n) => n.aktif !== !1)
          const e = ['TPQ', 'TPQ PAGI', 'TPQ SORE', 'PRA PTPT', 'PTPT', 'PPPH', 'P3H']
          if (
            (String(
              ((a = K == null ? void 0 : K.query) == null ? void 0 : a.kategori) || ''
            ).toLowerCase() === 'qiraati' &&
              (t = t.filter((n) =>
                e.includes(
                  String(n.lembaga || '')
                    .toUpperCase()
                    .trim()
                )
              )),
            X.value)
          ) {
            const n = String(((o = C.sesiAktif) == null ? void 0 : o.id) || '').toLowerCase(),
              d = String(((s = C.sesiAktif) == null ? void 0 : s.nama) || '')
                .toLowerCase()
                .trim()
            t = t.filter((l) => {
              const p = [l.guru, l.guru_pagi, l.guru_sore]
                  .flat()
                  .filter(Boolean)
                  .map((k) => String(k).toLowerCase().trim()),
                x = [l.guru_id, l.guru_pagi_id, l.guru_sore_id]
                  .filter(Boolean)
                  .map((k) => String(k).toLowerCase())
              return p.includes(d) || x.includes(n)
            })
          }
          if (j.value) {
            const n = String(j.value).toUpperCase().trim()
            if (n === 'TPQ PAGI' || n === 'TPQ SORE') {
              const d = n === 'TPQ PAGI' ? 'pagi' : 'sore'
              t = t.filter((l) => {
                const p = String(l.lembaga || '')
                    .toUpperCase()
                    .trim(),
                  x = String(l.shift || '')
                    .toLowerCase()
                    .trim()
                return (p === 'TPQ' && x === d) || p === n
              })
            } else t = t.filter((d) => d.lembaga === j.value)
          }
          if (I.value.trim()) {
            const n = I.value.trim().toLowerCase()
            t = t.filter((d) =>
              String(d.nama || '')
                .toLowerCase()
                .includes(n)
            )
          }
          return t.sort((n, d) => {
            const l = String(n.lembaga || '').localeCompare(String(d.lembaga || ''))
            if (l !== 0) return l
            const p = String(n.kelas || '').localeCompare(String(d.kelas || ''))
            if (p !== 0) return p
            const x = String(n.guru || '').localeCompare(String(d.guru || ''))
            return x !== 0 ? x : String(n.nama || '').localeCompare(String(d.nama || ''))
          })
        }),
        se = h(() => {
          const t = []
          let e = null
          for (const a of L.value) {
            const o = (() => {
                const n = Array.isArray(a.guru) ? a.guru : a.guru ? [a.guru] : []
                if (n.length === 0) return 'Tanpa Guru'
                const d = (Z.value || []).find((l) => l.nama === n[0])
                return d ? d.nama : n[0]
              })(),
              s = `${a.lembaga || '-'} · ${a.kelas || '-'} · Guru: ${o}`
            ;(s !== e && (t.push({ label: s, items: [] }), (e = s)), t[t.length - 1].items.push(a))
          }
          return t
        }),
        B = h(() => L.value.some((t) => U(t) === 'ptpt')),
        H = h(() => `${$.value}_${String(A.value + 1).padStart(2, '0')}`)
      function U(t) {
        return String((t == null ? void 0 : t.lembaga) || '')
          .toLowerCase()
          .trim()
      }
      function le(t) {
        const e = U(t)
        return e === 'ptpt' || e === 'pra ptpt'
      }
      function oe(t) {
        const e = String(t || '').toLowerCase()
        let a = 0
        if (e.includes('½') || e.includes('1/2'))
          /[12]/.test(e) ? (a = parseFloat((e.match(/\d+/) || ['0'])[0]) + 0.5) : (a = 0.5)
        else {
          const o = e.match(/(\d+(?:\.\d+)?)/)
          a = o ? parseFloat(o[1]) : 0
        }
        return a <= 1.5 ? 2 : 3
      }
      function q(t) {
        if (!(t != null && t.kartu_kenaikan) || typeof t.kartu_kenaikan != 'object') return 0
        const e = Object.keys(t.kartu_kenaikan).find(
          (n) => String(n).toLowerCase().trim() === 'pra ptpt'
        )
        if (!e) return 0
        const a = t.kartu_kenaikan[e]
        if (!a || typeof a != 'object') return 0
        const o = `${$.value}-${String(A.value + 1).padStart(2, '0')}-`
        let s = 0
        for (const [n, d] of Object.entries(a)) {
          if (!d || typeof d != 'object') continue
          const l = oe(d.levelBaca || n)
          for (const [p, x] of Object.entries(d))
            p === 'entries' ||
              p === 'ceremonial' ||
              p === 'levelBaca' ||
              (typeof x == 'string' && x.startsWith(o) && (s += l))
        }
        return s
      }
      const u = he({}),
        f = v(new Set()),
        z = v(!1),
        E = h(() => f.value.size)
      pe(
        [L, H],
        ([t, e]) => {
          for (const a of t) {
            const o =
                (a.catatan_bulanan &&
                  typeof a.catatan_bulanan == 'object' &&
                  a.catatan_bulanan[e]) ||
                '',
              s = u[a.id]
            ;(!s || s._periodKey !== e) &&
              (u[a.id] = {
                _periodKey: e,
                prestasi_awal: a.prestasi_awal || '',
                prestasi_akhir: a.prestasi_akhir || '',
                prestasi_total: a.prestasi_total || '',
                kelas: a.kelas || '',
                kelas_sekolah: a.kelas_sekolah || '',
                juz: w(a.juz) || '',
                catatan: o
              })
          }
        },
        { immediate: !0, deep: !1 }
      )
      function y(t) {
        ;(f.value.add(t), (f.value = new Set(f.value)))
      }
      function G(t, e) {
        if (!e) return '-'
        const a = U(t)
        if (a === 'ptpt') {
          const o = w(e.prestasi_akhir),
            s = w(e.prestasi_awal),
            n = o - s
          return n > 0 ? `${n} Hal` : '-'
        }
        if (a === 'pra ptpt') {
          const o = q(t)
          return o > 0 ? `${o} Khotam` : '-'
        }
        return e.prestasi_total || '-'
      }
      function ne(t, e) {
        const a = 'text-blue-800 dark:text-blue-300 bg-transparent',
          o = U(t)
        if (o === 'ptpt') {
          const s = w(G(t, e))
          if (s >= 100)
            return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
          if (s >= 70)
            return 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 border border-blue-300'
          if (s >= 40)
            return 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300'
          if (s > 0)
            return 'bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200 border border-rose-300'
        }
        if (o === 'pra ptpt') {
          const s = w(G(t, e))
          if (s >= 6)
            return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
          if (s >= 3)
            return 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 border border-blue-300'
          if (s > 0)
            return 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300'
        }
        return a
      }
      const P = v(!1),
        N = v(null),
        M = v('')
      function de(t) {
        var e
        ;((N.value = t),
          (M.value = ((e = u[t.id]) == null ? void 0 : e.catatan) || ''),
          (P.value = !0))
      }
      function ie() {
        const t = N.value
        t &&
          u[t.id] &&
          ((u[t.id].catatan = M.value),
          y(t.id),
          F.success('Catatan disimpan (klik Simpan utama untuk apply ke server)'),
          (P.value = !1))
      }
      async function ue() {
        if (f.value.size !== 0) {
          z.value = !0
          try {
            const t = fe(Y)
            for (const e of f.value) {
              const a = Q.value.find((k) => String(k.id) === String(e))
              if (!a) continue
              const o = u[e],
                s = U(a),
                n = s === 'ptpt',
                d = s === 'pra ptpt'
              let l = ''
              if (n) {
                const k = w(o.prestasi_akhir) - w(o.prestasi_awal)
                l = k > 0 ? `${k} Hal` : ''
              } else if (d) {
                const k = q(a)
                l = k > 0 ? `${k} Khotam` : ''
              } else l = o.prestasi_total || ''
              const p = {
                prestasi_awal: o.prestasi_awal || '',
                prestasi_akhir: o.prestasi_akhir || '',
                prestasi_total: l,
                kelas: o.kelas || '',
                kelas_sekolah: o.kelas_sekolah || ''
              }
              if (n) {
                const k = w(o.juz)
                p.juz = k > 0 ? `JUZ ${k}` : ''
              }
              const x =
                a.catatan_bulanan && typeof a.catatan_bulanan == 'object'
                  ? { ...a.catatan_bulanan }
                  : {}
              ;((x[H.value] = o.catatan || ''),
                (p.catatan_bulanan = x),
                t.update(ve(Y, 'santri', String(e)), p))
            }
            ;(await t.commit(),
              F.success(`Tersimpan ${f.value.size} santri`),
              f.value.clear(),
              (f.value = new Set()))
          } catch (t) {
            F.error('Error: ' + (t.message || t))
          } finally {
            z.value = !1
          }
        }
      }
      return (t, e) => (
        i(),
        b('div', Te, [
          r('div', Ae, [
            r('div', $e, [
              e[9] ||
                (e[9] = r(
                  'h2',
                  { class: 'text-base md:text-lg font-black text-slate-800 dark:text-white' },
                  [
                    r('i', { class: 'fas fa-pen-fancy text-teal-600 mr-2' }),
                    m('Input Prestasi Bulanan ')
                  ],
                  -1
                )),
              r('div', je, [
                r('span', Le, c(L.value.length) + ' santri ', 1),
                r(
                  'button',
                  {
                    onClick: ue,
                    disabled: z.value || E.value === 0,
                    class:
                      'text-xs font-bold px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition cursor-pointer disabled:opacity-50'
                  },
                  [
                    e[8] || (e[8] = r('i', { class: 'fas fa-save mr-1' }, null, -1)),
                    m(c(z.value ? 'Menyimpan...' : `Simpan${E.value ? ` (${E.value})` : ''}`), 1)
                  ],
                  8,
                  Ue
                )
              ])
            ]),
            r('div', Ve, [
              g(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[0] || (e[0] = (a) => (j.value = a)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    e[10] || (e[10] = r('option', { value: '' }, 'Semua Lembaga', -1)),
                    (i(!0),
                    b(
                      _,
                      null,
                      S(te.value, (a) => (i(), b('option', { key: a, value: a }, c(a), 9, Ie))),
                      128
                    ))
                  ],
                  512
                ),
                [[V, j.value]]
              ),
              g(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[1] || (e[1] = (a) => (A.value = a)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    (i(),
                    b(
                      _,
                      null,
                      S(J, (a, o) => r('option', { key: o, value: o }, c(a), 9, Be)),
                      64
                    ))
                  ],
                  512
                ),
                [[V, A.value, void 0, { number: !0 }]]
              ),
              g(
                r(
                  'select',
                  {
                    'onUpdate:modelValue': e[2] || (e[2] = (a) => ($.value = a)),
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  [
                    (i(!0),
                    b(
                      _,
                      null,
                      S(ee.value, (a) => (i(), b('option', { key: a, value: a }, c(a), 9, ze))),
                      128
                    ))
                  ],
                  512
                ),
                [[V, $.value, void 0, { number: !0 }]]
              ),
              g(
                r(
                  'input',
                  {
                    'onUpdate:modelValue': e[3] || (e[3] = (a) => (I.value = a)),
                    type: 'search',
                    placeholder: 'Cari santri...',
                    class:
                      'text-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                  },
                  null,
                  512
                ),
                [[T, I.value]]
              )
            ]),
            e[11] ||
              (e[11] = r(
                'p',
                { class: 'text-[10px] text-slate-400 italic mt-2' },
                [
                  r('i', { class: 'fas fa-info-circle mr-1' }),
                  m(' Total: '),
                  r('b', null, 'TPQ Pagi/Sore + PPPH'),
                  m(' manual, '),
                  r('b', null, 'Pra PTPT'),
                  m(' auto dari khotam (Lvl ≤1½ Juz: 2x, Lvl 2-3 Juz: 3x), '),
                  r('b', null, 'PTPT'),
                  m(' auto = Akhir - Awal Hal. ')
                ],
                -1
              ))
          ]),
          r('div', Ne, [
            r('div', Me, [
              r('table', Oe, [
                r('thead', Qe, [
                  r('tr', null, [
                    e[12] ||
                      (e[12] = r(
                        'th',
                        {
                          class:
                            'p-2 text-left font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600'
                        },
                        'Nama',
                        -1
                      )),
                    e[13] ||
                      (e[13] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-10'
                        },
                        'L/P',
                        -1
                      )),
                    e[14] ||
                      (e[14] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-24'
                        },
                        'Kls Sekolah',
                        -1
                      )),
                    e[15] ||
                      (e[15] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-24'
                        },
                        'Qiraati',
                        -1
                      )),
                    B.value ? (i(), b('th', Fe, 'Juz')) : O('', !0),
                    e[16] ||
                      (e[16] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-teal-50/50 dark:bg-teal-900/20 w-24'
                        },
                        'Awal Bln',
                        -1
                      )),
                    e[17] ||
                      (e[17] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-teal-50/50 dark:bg-teal-900/20 w-24'
                        },
                        'Akhir Bln',
                        -1
                      )),
                    e[18] ||
                      (e[18] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-blue-700 dark:text-blue-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-blue-50/50 dark:bg-blue-900/20 w-24'
                        },
                        'Total',
                        -1
                      )),
                    e[19] ||
                      (e[19] = r(
                        'th',
                        {
                          class:
                            'p-2 text-center font-black text-amber-700 dark:text-amber-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-amber-50/50 dark:bg-amber-900/20 w-24'
                        },
                        'Catatan',
                        -1
                      ))
                  ])
                ]),
                r('tbody', null, [
                  L.value.length === 0
                    ? (i(),
                      b('tr', Ke, [
                        r(
                          'td',
                          {
                            colspan: B.value ? 9 : 8,
                            class: 'text-center text-slate-400 italic py-8'
                          },
                          [
                            ...(e[20] ||
                              (e[20] = [
                                r(
                                  'i',
                                  {
                                    class:
                                      'fas fa-inbox text-2xl block mb-2 text-slate-300 dark:text-slate-600'
                                  },
                                  null,
                                  -1
                                ),
                                m(' Tidak ada santri yang cocok dengan filter. ', -1)
                              ]))
                          ],
                          8,
                          De
                        )
                      ]))
                    : (i(!0),
                      b(
                        _,
                        { key: 1 },
                        S(
                          se.value,
                          (a, o) => (
                            i(),
                            b(
                              _,
                              { key: o },
                              [
                                r('tr', Ee, [
                                  r(
                                    'td',
                                    {
                                      colspan: B.value ? 9 : 8,
                                      class:
                                        'p-2 font-black text-slate-700 dark:text-slate-200 uppercase text-[11px] tracking-widest'
                                    },
                                    [
                                      e[21] ||
                                        (e[21] = r(
                                          'i',
                                          { class: 'fas fa-layer-group mr-2 text-teal-600' },
                                          null,
                                          -1
                                        )),
                                      m(c(a.label), 1)
                                    ],
                                    8,
                                    Ge
                                  )
                                ]),
                                (i(!0),
                                b(
                                  _,
                                  null,
                                  S(a.items, (s) => {
                                    var n, d
                                    return (
                                      i(),
                                      b(
                                        'tr',
                                        {
                                          key: s.id,
                                          class:
                                            'hover:bg-slate-50 dark:hover:bg-slate-700/30 transition'
                                        },
                                        [
                                          r('td', Re, [
                                            m(c(s.nama) + ' ', 1),
                                            s.usia ? (i(), b('span', Je, c(s.usia), 1)) : O('', !0)
                                          ]),
                                          r('td', He, c(s.jk), 1),
                                          r('td', qe, [
                                            g(
                                              r(
                                                'select',
                                                {
                                                  'onUpdate:modelValue': (l) =>
                                                    (u[s.id].kelas_sekolah = l),
                                                  onChange: (l) => y(s.id),
                                                  class:
                                                    'w-full text-center text-[10px] font-bold p-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer'
                                                },
                                                [
                                                  e[22] ||
                                                    (e[22] = r('option', { value: '' }, '-', -1)),
                                                  (i(!0),
                                                  b(
                                                    _,
                                                    null,
                                                    S(
                                                      ae.value,
                                                      (l) => (
                                                        i(),
                                                        b(
                                                          'option',
                                                          { key: l, value: l },
                                                          c(l),
                                                          9,
                                                          We
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  ))
                                                ],
                                                40,
                                                Ye
                                              ),
                                              [[V, u[s.id].kelas_sekolah]]
                                            )
                                          ]),
                                          r('td', Ze, [
                                            g(
                                              r(
                                                'select',
                                                {
                                                  'onUpdate:modelValue': (l) => (u[s.id].kelas = l),
                                                  onChange: (l) => y(s.id),
                                                  class:
                                                    'w-full text-center text-[10px] font-bold p-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer'
                                                },
                                                [
                                                  e[23] ||
                                                    (e[23] = r('option', { value: '' }, '-', -1)),
                                                  (i(!0),
                                                  b(
                                                    _,
                                                    null,
                                                    S(
                                                      re(s.lembaga),
                                                      (l) => (
                                                        i(),
                                                        b(
                                                          'option',
                                                          { key: l, value: l },
                                                          c(l),
                                                          9,
                                                          et
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  ))
                                                ],
                                                40,
                                                Xe
                                              ),
                                              [[V, u[s.id].kelas]]
                                            )
                                          ]),
                                          B.value
                                            ? (i(),
                                              b('td', tt, [
                                                String(s.lembaga || '')
                                                  .toLowerCase()
                                                  .trim() === 'ptpt'
                                                  ? (i(),
                                                    b('div', at, [
                                                      g(
                                                        r(
                                                          'input',
                                                          {
                                                            'onUpdate:modelValue': (l) =>
                                                              (u[s.id].juz = l),
                                                            onInput: (l) => y(s.id),
                                                            type: 'number',
                                                            min: '1',
                                                            max: '30',
                                                            inputmode: 'numeric',
                                                            placeholder: '-',
                                                            class:
                                                              'flex-1 min-w-0 text-center font-black text-[11px] p-1 rounded border border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-200'
                                                          },
                                                          null,
                                                          40,
                                                          rt
                                                        ),
                                                        [[T, u[s.id].juz]]
                                                      )
                                                    ]))
                                                  : (i(), b('span', st, '-'))
                                              ]))
                                            : O('', !0),
                                          r('td', lt, [
                                            g(
                                              r(
                                                'input',
                                                {
                                                  'onUpdate:modelValue': (l) =>
                                                    (u[s.id].prestasi_awal = l),
                                                  onInput: (l) => y(s.id),
                                                  type: 'text',
                                                  class:
                                                    'w-full text-center font-black text-[11px] p-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white',
                                                  placeholder: '-'
                                                },
                                                null,
                                                40,
                                                ot
                                              ),
                                              [[T, u[s.id].prestasi_awal]]
                                            )
                                          ]),
                                          r('td', nt, [
                                            g(
                                              r(
                                                'input',
                                                {
                                                  'onUpdate:modelValue': (l) =>
                                                    (u[s.id].prestasi_akhir = l),
                                                  onInput: (l) => y(s.id),
                                                  type: 'text',
                                                  class:
                                                    'w-full text-center font-black text-[11px] p-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white',
                                                  placeholder: '-'
                                                },
                                                null,
                                                40,
                                                dt
                                              ),
                                              [[T, u[s.id].prestasi_akhir]]
                                            )
                                          ]),
                                          r('td', it, [
                                            le(s)
                                              ? (i(),
                                                b(
                                                  'input',
                                                  {
                                                    key: 0,
                                                    value: G(s, u[s.id]),
                                                    class: W([
                                                      'w-full text-center font-black text-[11px] p-1.5 rounded cursor-not-allowed',
                                                      ne(s, u[s.id])
                                                    ]),
                                                    readonly: '',
                                                    title: 'Auto-compute'
                                                  },
                                                  null,
                                                  10,
                                                  ut
                                                ))
                                              : g(
                                                  (i(),
                                                  b(
                                                    'input',
                                                    {
                                                      key: 1,
                                                      'onUpdate:modelValue': (l) =>
                                                        (u[s.id].prestasi_total = l),
                                                      onInput: (l) => y(s.id),
                                                      type: 'text',
                                                      placeholder: 'manual',
                                                      class:
                                                        'w-full text-center font-black text-[11px] p-1.5 rounded border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200',
                                                      title: 'Manual input'
                                                    },
                                                    null,
                                                    40,
                                                    bt
                                                  )),
                                                  [[T, u[s.id].prestasi_total]]
                                                )
                                          ]),
                                          r('td', pt, [
                                            r(
                                              'button',
                                              {
                                                onClick: (l) => de(s),
                                                class: W([
                                                  'inline-flex items-center justify-center w-8 h-7 rounded transition cursor-pointer',
                                                  (n = u[s.id]) != null && n.catatan
                                                    ? 'bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100'
                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-amber-100 hover:text-amber-700'
                                                ]),
                                                title:
                                                  (d = u[s.id]) != null && d.catatan
                                                    ? 'Catatan: ' +
                                                      u[s.id].catatan.slice(0, 50) +
                                                      '...'
                                                    : 'Belum ada catatan — klik untuk tulis'
                                              },
                                              [
                                                ...(e[24] ||
                                                  (e[24] = [
                                                    r(
                                                      'i',
                                                      { class: 'fas fa-eye text-[11px]' },
                                                      null,
                                                      -1
                                                    )
                                                  ]))
                                              ],
                                              10,
                                              ct
                                            )
                                          ])
                                        ]
                                      )
                                    )
                                  }),
                                  128
                                ))
                              ],
                              64
                            )
                          )
                        ),
                        128
                      ))
                ])
              ])
            ])
          ]),
          (i(),
          ce(ge, { to: 'body' }, [
            ke(
              me,
              { name: 'fade' },
              {
                default: xe(() => {
                  var a, o
                  return [
                    P.value
                      ? (i(),
                        b(
                          'div',
                          {
                            key: 0,
                            class:
                              'fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3',
                            onClick: e[7] || (e[7] = _e((s) => (P.value = !1), ['self']))
                          },
                          [
                            r('div', kt, [
                              r('header', xt, [
                                e[25] ||
                                  (e[25] = r(
                                    'h3',
                                    {
                                      class: 'text-base font-black text-slate-800 dark:text-white'
                                    },
                                    [
                                      r('i', { class: 'fas fa-comment-dots mr-2 text-amber-600' }),
                                      m('Catatan Bulanan ')
                                    ],
                                    -1
                                  )),
                                r(
                                  'button',
                                  {
                                    onClick: e[4] || (e[4] = (s) => (P.value = !1)),
                                    class:
                                      'text-slate-400 hover:text-red-500 text-2xl font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center cursor-pointer'
                                  },
                                  '×'
                                )
                              ]),
                              r('div', mt, [
                                r('div', gt, [
                                  e[26] ||
                                    (e[26] = r(
                                      'p',
                                      {
                                        class:
                                          'text-[10px] text-amber-700 dark:text-amber-300 font-black uppercase tracking-widest mb-1'
                                      },
                                      'Santri',
                                      -1
                                    )),
                                  r(
                                    'strong',
                                    ft,
                                    c(((a = N.value) == null ? void 0 : a.nama) || '-'),
                                    1
                                  ),
                                  r(
                                    'p',
                                    vt,
                                    c(((o = N.value) == null ? void 0 : o.lembaga) || '-') +
                                      ' · ' +
                                      c(J[A.value]) +
                                      ' ' +
                                      c($.value),
                                    1
                                  )
                                ]),
                                g(
                                  r(
                                    'textarea',
                                    {
                                      'onUpdate:modelValue': e[5] || (e[5] = (s) => (M.value = s)),
                                      rows: '6',
                                      placeholder:
                                        'Tulis catatan bulan ini untuk santri (mis: progress, perilaku, hal yg perlu diperhatikan, rekomendasi)...',
                                      class:
                                        'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white resize-none'
                                    },
                                    null,
                                    512
                                  ),
                                  [[T, M.value]]
                                ),
                                e[27] ||
                                  (e[27] = r(
                                    'p',
                                    { class: 'text-[10px] text-slate-400 italic' },
                                    [
                                      r('i', { class: 'fas fa-info-circle mr-1' }),
                                      m(
                                        'Catatan tampil di Capaian Prestasi santri. Akun santri bisa lihat langsung.'
                                      )
                                    ],
                                    -1
                                  ))
                              ]),
                              r('footer', ht, [
                                r(
                                  'button',
                                  {
                                    onClick: e[6] || (e[6] = (s) => (P.value = !1)),
                                    class:
                                      'px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                                  },
                                  'Batal'
                                ),
                                r(
                                  'button',
                                  {
                                    onClick: ie,
                                    class:
                                      'px-5 py-2 text-sm font-black rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md cursor-pointer'
                                  },
                                  [
                                    ...(e[28] ||
                                      (e[28] = [
                                        r('i', { class: 'fas fa-save mr-1' }, null, -1),
                                        m('Simpan Catatan ', -1)
                                      ]))
                                  ]
                                )
                              ])
                            ])
                          ]
                        ))
                      : O('', !0)
                  ]
                }),
                _: 1
              }
            )
          ]))
        ])
      )
    }
  }
export { Tt as default }
