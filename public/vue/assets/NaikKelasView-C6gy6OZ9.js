import {
  ab as dt,
  ae as ut,
  I as bt,
  t as pt,
  c as mt,
  l as $,
  h as n,
  i as Ke,
  e as t,
  a4 as d,
  j as c,
  g as v,
  E as S,
  F as y,
  U as w,
  a7 as Ie,
  ar as h,
  ak as J,
  aj as E,
  f as Se,
  k as Te,
  aq as Ae,
  a as Le,
  T as Ce,
  d as V,
  Q as x,
  P as ct,
  Z as ue,
  q,
  L as i,
  ag as xt,
  at as je,
  a8 as Ne
} from './index-DlQzz-jb.js'
import { u as kt } from './useToast-DlBPYiJY.js'
import { u as gt } from './useGuru-D5SD6T31.js'
import { u as ft } from './useExcel-CfMuM0d2.js'
import { u as vt } from './useLembaga--Gos7VCc.js'
import { _ as ht } from './_plugin-vue_export-helper-DlAUqK2U.js'
function W(K, f) {
  const k = []
  for (let g = K; g <= f; g++) k.push({ id: 'juz_' + g, label: 'Juz ' + g })
  return k
}
const yt = {
    itemHeader: 'Juz',
    kelasList: [
      { id: 'kelas_1', label: 'Kelas 1', items: W(1, 5), ceremonial: !0 },
      { id: 'kelas_2', label: 'Kelas 2', items: W(6, 10), ceremonial: !0 },
      { id: 'kelas_3', label: 'Kelas 3', items: W(11, 15), ceremonial: !0 },
      { id: 'kelas_4', label: 'Kelas 4', items: W(16, 20), ceremonial: !0 },
      { id: 'kelas_5', label: 'Kelas 5', items: W(21, 25), ceremonial: !0 },
      { id: 'kelas_6', label: 'Kelas 6', items: W(26, 30), ceremonial: !0 }
    ]
  },
  wt = {
    itemHeader: 'Jilid',
    kelasList: [
      {
        id: 'jilid_1',
        label: 'Jilid 1',
        items: [
          { id: '1A', label: '1A' },
          { id: '1B', label: '1B' },
          { id: '1C', label: '1C' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_2',
        label: 'Jilid 2',
        items: [
          { id: '2A', label: '2A' },
          { id: '2B', label: '2B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_3',
        label: 'Jilid 3',
        items: [
          { id: '3A', label: '3A' },
          { id: '3B', label: '3B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_4',
        label: 'Jilid 4',
        items: [
          { id: '4A', label: '4A' },
          { id: '4B', label: '4B' }
        ],
        ceremonial: !1
      },
      {
        id: 'jilid_5',
        label: 'Jilid 5',
        items: [
          { id: '5A', label: '5A' },
          { id: '5B', label: '5B' }
        ],
        ceremonial: !1
      },
      { id: 'kpi', label: 'KPI', items: [{ id: 'kpi_1', label: 'IMTAS' }], ceremonial: !1 },
      { id: 'pk', label: 'PK', items: [{ id: 'pk_1', label: 'Khotaman' }], ceremonial: !0 }
    ]
  },
  _t = {
    itemHeader: 'Khotam',
    kelasList: [
      {
        id: 'lvl_1',
        label: 'Level 1 (½ Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_2',
        label: 'Level 2 (1 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_3',
        label: 'Level 3 (1½ Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_4',
        label: 'Level 4 (2 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' }
        ],
        ceremonial: !1
      },
      {
        id: 'lvl_5',
        label: 'Level 5 (3 Juz)',
        items: [
          { id: 'kh_I', label: 'I' },
          { id: 'kh_II', label: 'II' },
          { id: 'kh_III', label: 'III' },
          { id: 'kh_IV', label: 'IV' },
          { id: 'kh_V', label: 'V' }
        ],
        ceremonial: !1
      }
    ]
  },
  Pt = {
    itemHeader: 'Kitab',
    kelasList: [
      {
        id: 'lvl_1',
        label: "Level 1 (Arba'in Nawawi)",
        items: [{ id: 'arb_done', label: 'Khatam' }],
        ceremonial: !0
      },
      {
        id: 'lvl_2',
        label: 'Level 2 (Riyadhus Sholihin)',
        items: [{ id: 'riy_done', label: 'Khatam' }],
        ceremonial: !0
      },
      {
        id: 'lvl_3',
        label: 'Level 3 (Shahih Bukhari)',
        items: [{ id: 'buk_done', label: 'Khatam' }],
        ceremonial: !0
      },
      {
        id: 'lvl_4',
        label: 'Level 4 (Shahih Muslim)',
        items: [{ id: 'mus_done', label: 'Khatam' }],
        ceremonial: !0
      }
    ]
  }
function xe(K, f) {
  const k = (f == null ? void 0 : f.kartuKenaikanSchema) || {}
  return k[K]
    ? JSON.parse(JSON.stringify(k[K]))
    : K === 'PTPT'
      ? JSON.parse(JSON.stringify(yt))
      : K === 'TPQ' || K === 'TPQ Pagi' || K === 'TPQ Sore'
        ? JSON.parse(JSON.stringify(wt))
        : K === 'Pra PTPT'
          ? JSON.parse(JSON.stringify(_t))
          : K === 'PPPH' || K === 'P3H'
            ? JSON.parse(JSON.stringify(Pt))
            : { itemHeader: 'Item', kelasList: [] }
}
function Kt(K, f) {
  var g
  const k = ((g = f == null ? void 0 : f.kartuKenaikanKop) == null ? void 0 : g[K]) || {}
  return {
    judul: k.judul || 'KONTROL KENAIKAN ' + (K === 'TPQ' ? 'JILID' : 'KELAS'),
    subjudul: k.subjudul || (f == null ? void 0 : f.kopLine1) || 'PONDOK PESANTREN MAMBAUL ULUM',
    alamat: k.alamat || (f == null ? void 0 : f.alamat) || ''
  }
}
const Oe = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH'],
  It = { class: 'p-3 md:p-5 max-w-5xl mx-auto space-y-4' },
  St = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Tt = { key: 0, class: 'text-center py-10' },
  At = { key: 1 },
  Lt = { class: 'text-left flex-1 min-w-0' },
  Ct = { class: 'text-base font-black truncate' },
  jt = { class: 'text-[11px] opacity-90 mt-0.5' },
  Nt = { key: 2, class: 'text-center py-10' },
  Ot = {
    key: 1,
    class:
      'bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center'
  },
  Ut = {
    key: 2,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2'
  },
  Jt = { class: 'flex gap-1.5 overflow-x-auto custom-scrollbar' },
  Vt = {
    key: 3,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  zt = { class: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3' },
  Ht = ['onClick'],
  Dt = {
    key: 4,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Et = { class: 'relative mb-3' },
  Qt = { key: 0, class: 'text-center py-10' },
  Rt = { key: 1, class: 'text-center text-slate-400 py-6 text-sm' },
  Bt = { key: 2, class: 'space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar' },
  Mt = { class: 'flex-1 min-w-0' },
  $t = { class: 'text-sm font-bold text-slate-800 dark:text-white truncate' },
  Ft = { class: 'text-[11px] text-slate-500 dark:text-slate-400 truncate' },
  Gt = { class: 'flex items-center gap-1.5 flex-shrink-0' },
  Xt = ['onClick'],
  Zt = ['onClick'],
  qt = {
    key: 5,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  Wt = { class: 'flex flex-wrap items-center gap-2 mb-3' },
  Yt = ['disabled'],
  ea = { key: 0, class: 'text-center text-slate-400 italic text-xs py-8' },
  ta = { key: 1, class: 'space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar' },
  aa = { class: 'flex items-center justify-between gap-2 p-3' },
  la = { class: 'flex-1 min-w-0' },
  sa = { class: 'text-sm font-bold text-slate-800 dark:text-white truncate' },
  ra = { class: 'text-[11px] text-slate-500 dark:text-slate-400 truncate' },
  ia = { class: 'ml-1 text-emerald-600 font-bold' },
  oa = ['onClick', 'title'],
  na = ['onClick'],
  da = {
    key: 0,
    class: 'px-3 pb-3 space-y-1.5 border-t border-slate-100 dark:border-slate-700 pt-2'
  },
  ua = { class: 'font-medium normal-case text-slate-500 ml-1' },
  ba = { class: 'text-[11px] text-slate-700 whitespace-pre-line' },
  pa = { key: 1, class: 'text-center text-slate-400 italic text-xs py-8' },
  ma = {
    key: 6,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4'
  },
  ca = { class: 'grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3' },
  xa = ['onClick'],
  ka = { class: 'text-sm md:text-base' },
  ga = {
    key: 0,
    class: 'border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden'
  },
  fa = {
    class:
      'bg-slate-100 dark:bg-slate-700 px-4 py-2 text-xs md:text-sm font-black text-slate-700 dark:text-slate-200'
  },
  va = { class: 'p-4 bg-white dark:bg-slate-800 space-y-3' },
  ha = {
    class:
      'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 md:p-4'
  },
  ya = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  wa = { class: 'md:col-span-2' },
  _a = { class: 'flex justify-end mt-3' },
  Pa = ['disabled'],
  Ka = {
    class:
      'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-3 md:p-4 space-y-3'
  },
  Ia = { class: 'flex items-center justify-between flex-wrap gap-2' },
  Sa = { class: 'text-sm font-black text-purple-800 dark:text-purple-300' },
  Ta = { class: 'flex gap-1' },
  Aa = ['disabled'],
  La = { class: 'space-y-2' },
  Ca = { key: 0, class: 'text-center text-xs text-slate-400 italic py-3' },
  ja = { class: 'grid grid-cols-[1fr_auto_auto] gap-2 items-center' },
  Na = ['onUpdate:modelValue'],
  Oa = {
    class: 'text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1'
  },
  Ua = ['onUpdate:modelValue'],
  Ja = ['onClick'],
  Va = { class: 'space-y-1 pl-3 border-l-2 border-purple-200 dark:border-purple-700' },
  za = { class: 'text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase' },
  Ha = { class: 'flex flex-wrap gap-1' },
  Da = ['onUpdate:modelValue'],
  Ea = ['onClick'],
  Qa = ['onClick'],
  Ra = { key: 1, class: 'text-center text-slate-400 italic text-xs py-6' },
  Ba = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full my-4 max-h-[90vh] flex flex-col'
  },
  Ma = {
    class: 'px-4 md:px-6 pt-5 pb-3 border-b-2 border-slate-700 dark:border-slate-600 text-center'
  },
  $a = { class: 'text-sm md:text-base font-black uppercase text-slate-800 dark:text-white' },
  Fa = { class: 'text-base md:text-lg font-black uppercase text-slate-800 dark:text-white mt-0.5' },
  Ga = { key: 0, class: 'text-[10px] text-slate-600 dark:text-slate-400 mt-1' },
  Xa = { class: 'flex-1 overflow-y-auto p-4 md:p-6' },
  Za = {
    class:
      'bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 mb-3 border border-slate-200 dark:border-slate-700 text-xs'
  },
  qa = { class: 'grid grid-cols-1 md:grid-cols-2 gap-1.5' },
  Wa = { class: 'space-y-3' },
  Ya = {
    class:
      'bg-slate-200 dark:bg-slate-700 text-center font-black text-xs py-1.5 border-b border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white'
  },
  el = {
    class:
      'bg-slate-50 dark:bg-slate-900/50 text-center text-[10px] font-bold border-b border-slate-300 dark:border-slate-600 py-1 text-slate-700 dark:text-slate-300'
  },
  tl = { class: 'w-full text-[10px]' },
  al = { class: 'bg-white dark:bg-slate-800' },
  ll = { class: 'bg-white dark:bg-slate-800' },
  sl = ['value', 'onInput'],
  rl = {
    key: 0,
    class:
      'bg-amber-50 dark:bg-amber-900/20 border-t border-slate-300 dark:border-slate-600 px-2 py-1.5 flex items-center gap-2 text-[10px]'
  },
  il = ['value', 'onInput'],
  ol = {
    class:
      'bg-slate-50 dark:bg-slate-900/30 border-t border-slate-300 dark:border-slate-600 px-2 py-2 space-y-2'
  },
  nl = { class: 'flex items-center justify-between gap-2' },
  dl = ['onClick'],
  ul = {
    key: 0,
    class:
      'bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded p-2 space-y-1.5'
  },
  bl = { class: 'grid grid-cols-3 gap-1.5' },
  pl = ['onUpdate:modelValue'],
  ml = ['onUpdate:modelValue'],
  cl = ['value'],
  xl = { key: 0, value: 'ceremonial' },
  kl = ['onUpdate:modelValue'],
  gl = ['onUpdate:modelValue'],
  fl = { class: 'flex justify-end gap-1' },
  vl = ['onClick'],
  hl = ['onClick'],
  yl = { key: 1, class: 'space-y-1' },
  wl = { class: 'flex-1 min-w-0' },
  _l = { class: 'text-slate-700 dark:text-slate-200 mt-0.5 whitespace-pre-line' },
  Pl = ['onClick'],
  Kl = { key: 2, class: 'text-[9px] text-slate-400 italic text-center py-1' },
  Il = { key: 0, class: 'text-center text-slate-400 py-6 text-sm italic' },
  Sl = {
    class:
      'px-4 md:px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-2 rounded-b-2xl'
  },
  Tl = ['disabled'],
  Al = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full my-4 border-t-8 border-teal-600 flex flex-col max-h-[90vh]'
  },
  Ll = {
    class:
      'flex justify-between items-center border-b border-slate-100 dark:border-slate-700 px-5 py-4'
  },
  Cl = { class: 'overflow-y-auto p-5 space-y-4' },
  jl = {
    class:
      'bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800'
  },
  Nl = { class: 'text-slate-800 dark:text-white text-lg font-black leading-tight' },
  Ol = { class: 'text-[11px] text-slate-500 dark:text-slate-400 mt-1' },
  Ul = ['value'],
  Jl = { class: 'grid grid-cols-2 gap-3' },
  Vl = ['value'],
  zl = ['value'],
  Hl = ['value'],
  Dl = { key: 0 },
  El = ['value'],
  Ql = { key: 1 },
  Rl = ['value'],
  Bl = {
    class:
      'flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 rounded-b-2xl'
  },
  Ml = ['disabled'],
  $l = { key: 0, class: 'fas fa-spinner fa-spin' },
  Fl = { key: 1, class: 'fas fa-check' },
  Gl = {
    __name: 'NaikKelasView',
    setup(K) {
      const f = dt(),
        k = ut(),
        g = kt(),
        { guruRaw: Ue } = gt(),
        { exportStyled: Je } = ft(),
        { lembagaRaw: ke } = vt(),
        H = V(() => {
          const l = f.sesiAktif,
            e = (l == null ? void 0 : l.role_sistem) || ''
          return (l == null ? void 0 : l.role) === 'admin' || ['admin', 'super_admin'].includes(e)
        }),
        Q = V(() => {
          const l = f.sesiAktif
          return (
            (l == null ? void 0 : l.role) === 'guru' &&
            (l == null ? void 0 : l.role_sistem) !== 'super_admin' &&
            (l == null ? void 0 : l.id) !== 'admin'
          )
        }),
        ge = V(() => {
          var l
          return ((l = f.sesiAktif) == null ? void 0 : l.role) === 'santri'
        }),
        I = x([]),
        le = x(!0),
        F = x(''),
        R = x(''),
        j = x('form'),
        fe = {
          'TPQ Pagi': {
            active: 'bg-emerald-600 text-white border border-emerald-700 ring-2 ring-emerald-200',
            inactive:
              'bg-white dark:bg-slate-900 text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
          },
          'TPQ Sore': {
            active: 'bg-teal-600 text-white border border-teal-700 ring-2 ring-teal-200',
            inactive:
              'bg-white dark:bg-slate-900 text-teal-700 border border-teal-300 hover:bg-teal-50'
          },
          'Pra PTPT': {
            active: 'bg-blue-600 text-white border border-blue-700 ring-2 ring-blue-200',
            inactive:
              'bg-white dark:bg-slate-900 text-blue-700 border border-blue-300 hover:bg-blue-50'
          },
          PTPT: {
            active: 'bg-purple-600 text-white border border-purple-700 ring-2 ring-purple-200',
            inactive:
              'bg-white dark:bg-slate-900 text-purple-700 border border-purple-300 hover:bg-purple-50'
          },
          PPPH: {
            active: 'bg-amber-600 text-white border border-amber-700 ring-2 ring-amber-200',
            inactive:
              'bg-white dark:bg-slate-900 text-amber-700 border border-amber-300 hover:bg-amber-50'
          }
        }
      function ve(l, e) {
        const a = fe[l] || fe.PTPT
        return e ? a.active : a.inactive
      }
      const D = V(() => {
          const l = f.sesiAktif
          if (!l || l.role !== 'santri') return null
          const e = String(l.id || '')
          return I.value.find((a) => String(a.id) === e) || null
        }),
        he = V(() => {
          if (Q.value) {
            let a = I.value.filter((r) => r.aktif !== !1)
            const s = f.sesiAktif,
              o = (s == null ? void 0 : s.guru) || (s == null ? void 0 : s.nama)
            if (
              ((a = a.filter((r) => r.guru === o || r.guru_pagi === o || r.guru_sore === o)),
              F.value)
            ) {
              const r = F.value.toLowerCase()
              a = a.filter((m) =>
                String(m.nama || '')
                  .toLowerCase()
                  .includes(r)
              )
            }
            return a.sort((r, m) => (r.nama || '').localeCompare(m.nama || ''))
          }
          if (!R.value) return []
          let l
          const e = String(R.value).toUpperCase().trim()
          if (e === 'TPQ PAGI' || e === 'TPQ SORE') {
            const a = e === 'TPQ PAGI' ? 'pagi' : 'sore'
            l = I.value.filter((s) => {
              if (s.aktif === !1) return !1
              const o = String(s.lembaga || '')
                  .toUpperCase()
                  .trim(),
                r = String(s.shift || '')
                  .toLowerCase()
                  .trim()
              return (o === 'TPQ' && r === a) || o === e || (o === 'TPQ' && !r && a === 'pagi')
            })
          } else
            e === 'TPQ'
              ? (l = I.value.filter((a) => {
                  const s = String(a.lembaga || '')
                    .toUpperCase()
                    .trim()
                  return (s === 'TPQ PAGI' || s === 'TPQ SORE' || s === 'TPQ') && a.aktif !== !1
                }))
              : e === 'PRA PTPT'
                ? (l = I.value.filter((a) => {
                    const s = String(a.lembaga || '')
                      .toUpperCase()
                      .trim()
                    return (
                      (s === 'PRA PTPT' || s === 'PRA-PTPT' || s === 'PRA_PTPT') && a.aktif !== !1
                    )
                  }))
                : e === 'PPPH'
                  ? (l = I.value.filter((a) => {
                      const s = String(a.lembaga || '')
                        .toUpperCase()
                        .trim()
                      return (s === 'PPPH' || s === 'P3H') && a.aktif !== !1
                    }))
                  : (l = I.value.filter(
                      (a) =>
                        String(a.lembaga || '')
                          .toUpperCase()
                          .trim() === e && a.aktif !== !1
                    ))
          if (Q.value) {
            const a = f.sesiAktif,
              s = (a == null ? void 0 : a.guru) || (a == null ? void 0 : a.nama)
            l = l.filter((o) => o.guru === s || o.guru_pagi === s || o.guru_sore === s)
          }
          if (F.value) {
            const a = F.value.toLowerCase()
            l = l.filter((s) =>
              String(s.nama || '')
                .toLowerCase()
                .includes(a)
            )
          }
          return l.sort((a, s) => (a.nama || '').localeCompare(s.nama || ''))
        }),
        P = x(''),
        se = x(''),
        Y = V(() => {
          if (!P.value) return []
          let l
          if (
            (P.value === 'TPQ'
              ? (l = I.value.filter(
                  (e) =>
                    (e.lembaga === 'TPQ Pagi' || e.lembaga === 'TPQ Sore' || e.lembaga === 'TPQ') &&
                    e.aktif !== !1
                ))
              : P.value === 'PPPH'
                ? (l = I.value.filter(
                    (e) => (e.lembaga === 'PPPH' || e.lembaga === 'P3H') && e.aktif !== !1
                  ))
                : (l = I.value.filter((e) => e.lembaga === P.value && e.aktif !== !1)),
            se.value)
          ) {
            const e = se.value.toLowerCase()
            l = l.filter((a) =>
              String(a.nama || '')
                .toLowerCase()
                .includes(e)
            )
          }
          return l.sort((e, a) => (e.nama || '').localeCompare(a.nama || ''))
        })
      function Ve(l, e) {
        var o
        const a = (o = l.kartu_kenaikan) == null ? void 0 : o[e]
        if (!a) return 0
        let s = 0
        for (const r of Object.values(a))
          if (!(!r || typeof r != 'object')) for (const m of Object.values(r)) m && s++
        return s
      }
      function ye(l, e) {
        var o
        const a = (o = l.kartu_kenaikan) == null ? void 0 : o[e]
        if (!a) return 0
        let s = 0
        for (const r of Object.values(a))
          !r ||
            typeof r != 'object' ||
            (Array.isArray(r.entries) && (s += r.entries.filter((m) => m && m.text).length),
            typeof r.catatan == 'string' && r.catatan.trim() && s++,
            typeof r.rekomendasi == 'string' && r.rekomendasi.trim() && s++)
        return s
      }
      function ze(l, e, a = 3) {
        var r
        const s = (r = l.kartu_kenaikan) == null ? void 0 : r[e]
        if (!s) return []
        const o = []
        for (const [m, u] of Object.entries(s))
          if (!(!u || typeof u != 'object')) {
            if (Array.isArray(u.entries))
              for (const p of u.entries)
                !p ||
                  !p.text ||
                  o.push({
                    kelasId: m,
                    tanggal: p.tanggal || '',
                    tipe: p.tipe || 'catatan',
                    text: p.text
                  })
            ;(typeof u.catatan == 'string' &&
              u.catatan.trim() &&
              o.push({ kelasId: m, tanggal: '', tipe: 'catatan', text: u.catatan.trim() }),
              typeof u.rekomendasi == 'string' &&
                u.rekomendasi.trim() &&
                o.push({
                  kelasId: m,
                  tanggal: '',
                  tipe: 'rekomendasi',
                  text: u.rekomendasi.trim()
                }))
          }
        return (o.sort((m, u) => (u.tanggal || '').localeCompare(m.tanggal || '')), o.slice(0, a))
      }
      const B = x(new Set())
      function He(l) {
        ;(B.value.has(l) ? B.value.delete(l) : B.value.add(l), (B.value = new Set(B.value)))
      }
      const re = x(!1)
      async function De() {
        if (!(!P.value || !Y.value.length)) {
          re.value = !0
          try {
            const l = [],
              e = P.value,
              a =
                e === 'TPQ' ? ['TPQ Pagi', 'TPQ Sore', 'TPQ'] : e === 'PPPH' ? ['PPPH', 'P3H'] : [e]
            for (const s of Y.value) {
              const o = s.kartu_kenaikan || {}
              let r = !1
              for (const m of a) {
                const u = o[m]
                if (!(!u || typeof u != 'object')) {
                  for (const [p, U] of Object.entries(u))
                    if (!(!U || typeof U != 'object'))
                      for (const [de, C] of Object.entries(U)) {
                        if (!C) continue
                        const z = typeof C == 'object' ? C : { tanggal: String(C) }
                        ;(l.push({
                          Nama: s.nama || '',
                          Lembaga: m,
                          Kelas: p,
                          Khotam: de,
                          Tanggal: z.tanggal || z.tgl || '',
                          Guru: z.guru || z.guru_penilai || '',
                          Juz: z.juz || '',
                          Catatan: z.catatan || z.rekomendasi || ''
                        }),
                          (r = !0))
                      }
                }
              }
              r ||
                l.push({
                  Nama: s.nama || '',
                  Lembaga: e,
                  Kelas: s.kelas || '',
                  Khotam: '-',
                  Tanggal: '-',
                  Guru: '-',
                  Juz: '-',
                  Catatan: 'Belum ada riwayat'
                })
            }
            ;(l.sort(
              (s, o) =>
                String(s.Nama).localeCompare(String(o.Nama)) ||
                String(s.Tanggal).localeCompare(String(o.Tanggal))
            ),
              await Je({
                filename: `Riwayat_Kenaikan_${e.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`,
                sheetName: `Riwayat ${e}`,
                title: `RIWAYAT KENAIKAN — ${e}`,
                subtitle: `Per ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`,
                columns: [
                  { header: 'Nama Santri', key: 'Nama', width: 28 },
                  { header: 'Lembaga', key: 'Lembaga', width: 14 },
                  { header: 'Kelas/Level', key: 'Kelas', width: 14 },
                  { header: 'Khotam', key: 'Khotam', width: 10 },
                  { header: 'Tanggal', key: 'Tanggal', width: 14 },
                  { header: 'Guru Penilai', key: 'Guru', width: 22 },
                  { header: 'Juz', key: 'Juz', width: 8 },
                  { header: 'Catatan', key: 'Catatan', width: 36 }
                ],
                rows: l
              }),
              g.success(`${l.length} baris Riwayat ${e} ter-eksport`))
          } catch (l) {
            g.error('Gagal eksport: ' + (l.message || l))
          } finally {
            re.value = !1
          }
        }
      }
      const T = x(''),
        L = ct({ judul: '', subjudul: '', alamat: '' }),
        ee = x(!1),
        A = x({ itemHeader: 'Item', kelasList: [] }),
        ie = x(!1)
      function Ee(l) {
        if (!l) {
          A.value = { itemHeader: 'Item', kelasList: [] }
          return
        }
        A.value = JSON.parse(JSON.stringify(xe(l, k.settings)))
      }
      function Qe() {
        Array.isArray(A.value.kelasList) || (A.value.kelasList = [])
        const l = A.value.kelasList.length + 1
        A.value.kelasList.push({
          id: 'kls_' + Date.now(),
          label: 'Kelas ' + l,
          items: [{ id: 'it_' + Date.now(), label: '1' }],
          ceremonial: !1
        })
      }
      function Re() {
        var e
        if (!T.value) return
        const l = { ...(((e = k.settings) == null ? void 0 : e.kartuKenaikanSchema) || {}) }
        ;(delete l[T.value],
          (A.value = JSON.parse(
            JSON.stringify(xe(T.value, { ...k.settings, kartuKenaikanSchema: l }))
          )),
          g.info('Schema di-reset ke default. Klik Simpan untuk apply.'))
      }
      async function Be() {
        var l
        if (T.value) {
          ie.value = !0
          try {
            const e = { ...(((l = k.settings) == null ? void 0 : l.kartuKenaikanSchema) || {}) }
            ;((e[T.value] = JSON.parse(JSON.stringify(A.value))),
              await ue(q($, 'settings', 'general'), { kartuKenaikanSchema: e }, { merge: !0 }),
              await ue(q($, 'settings', 'web'), { kartuKenaikanSchema: e }, { merge: !0 }),
              (k.settings.kartuKenaikanSchema = e),
              g.success('Schema kartu kenaikan tersimpan'))
          } catch (e) {
            g.error('Gagal: ' + (e.message || e))
          } finally {
            ie.value = !1
          }
        }
      }
      function Me(l) {
        var s, o
        ;(Ee(l), (T.value = l))
        const a =
          (((s = k.settings) == null ? void 0 : s.kopKartuKenaikan) ||
            ((o = k.settings) == null ? void 0 : o.kartuKenaikanKop) ||
            {})[l] || {}
        ;((L.judul = a.judul || ''), (L.subjudul = a.subjudul || ''), (L.alamat = a.alamat || ''))
      }
      async function $e() {
        var l, e
        if (!T.value) {
          g.warning('Pilih lembaga dulu')
          return
        }
        ee.value = !0
        try {
          const a = { ...(((l = k.settings) == null ? void 0 : l.kopKartuKenaikan) || {}) },
            s = { ...(((e = k.settings) == null ? void 0 : e.kartuKenaikanKop) || {}) },
            o = { judul: L.judul.trim(), subjudul: L.subjudul.trim(), alamat: L.alamat.trim() }
          ;((a[T.value] = o),
            (s[T.value] = o),
            await ue(
              q($, 'settings', 'general'),
              { kopKartuKenaikan: a, kartuKenaikanKop: s },
              { merge: !0 }
            ),
            await ue(
              q($, 'settings', 'web'),
              { kopKartuKenaikan: a, kartuKenaikanKop: s },
              { merge: !0 }
            ),
            (k.settings.kopKartuKenaikan = a),
            (k.settings.kartuKenaikanKop = s),
            g.success(`KOP ${T.value} tersimpan`))
        } catch (a) {
          g.error('Gagal simpan: ' + (a.message || a))
        } finally {
          ee.value = !1
        }
      }
      const be = x(!1),
        N = x(null),
        oe = x(''),
        M = x({ itemHeader: 'Item', kelasList: [] }),
        _ = x({}),
        te = x(!1),
        ne = V(() => Kt(oe.value, k.settings))
      function pe(l) {
        N.value = l
        const e = R.value || l.lembaga
        ;((oe.value = e),
          (M.value = xe(e, k.settings)),
          (_.value =
            l.kartu_kenaikan && l.kartu_kenaikan[e]
              ? JSON.parse(JSON.stringify(l.kartu_kenaikan[e]))
              : {}),
          (be.value = !0))
      }
      function me() {
        ;((be.value = !1), (N.value = null), (_.value = {}))
      }
      async function Fe() {
        if (N.value) {
          te.value = !0
          try {
            const l = N.value.id,
              e = { ...(N.value.kartu_kenaikan || {}), [oe.value]: _.value }
            ;(await Ne(q($, 'santri', String(l)), { kartu_kenaikan: e }),
              (N.value.kartu_kenaikan = e))
            const a = I.value.findIndex((s) => s.id === l)
            ;(a >= 0 && (I.value[a].kartu_kenaikan = e),
              g.success(`Tersimpan untuk ${N.value.nama}`),
              me())
          } catch (l) {
            g.error('Gagal simpan: ' + (l.message || l))
          } finally {
            te.value = !1
          }
        }
      }
      function Ge(l, e) {
        var a
        return ((a = _.value[l]) == null ? void 0 : a[e]) || ''
      }
      function Xe(l, e, a) {
        ;(_.value[l] || (_.value[l] = {}), a ? (_.value[l][e] = a) : delete _.value[l][e])
      }
      function Ze(l) {
        var e
        return ((e = _.value[l]) == null ? void 0 : e.ceremonial) || ''
      }
      function qe(l, e) {
        ;(_.value[l] || (_.value[l] = {}),
          e ? (_.value[l].ceremonial = e) : delete _.value[l].ceremonial)
      }
      function We() {
        window.print()
      }
      const G = x({}),
        O = x({})
      function ce(l) {
        const e = _.value[l],
          a = e == null ? void 0 : e.entries
        if (!Array.isArray(a)) {
          const s = [],
            o = e == null ? void 0 : e.catatan,
            r = e == null ? void 0 : e.rekomendasi
          return (
            typeof o == 'string' &&
              o.trim() &&
              s.push({ tanggal: '', itemId: '', tipe: 'catatan', text: o }),
            typeof r == 'string' &&
              r.trim() &&
              s.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: r }),
            s
          )
        }
        return a.slice().sort((s, o) => (o.tanggal || '').localeCompare(s.tanggal || ''))
      }
      function we(l) {
        var s, o
        if (G.value[l]) {
          G.value[l] = !1
          return
        }
        G.value = { ...G.value, [l]: !0 }
        const e = M.value.kelasList.find((r) => r.id === l),
          a =
            ((o = (s = e == null ? void 0 : e.items) == null ? void 0 : s[0]) == null
              ? void 0
              : o.id) || 'ceremonial'
        O.value = {
          ...O.value,
          [l]: {
            tanggal: new Date().toISOString().slice(0, 10),
            itemId: a,
            tipe: 'catatan',
            text: ''
          }
        }
      }
      function Ye(l) {
        const e = O.value[l]
        if (!e || !e.text.trim()) {
          g.warning('Tulis text catatan/rekomendasi dulu')
          return
        }
        _.value[l] || (_.value[l] = {})
        const a = _.value[l]
        if (!Array.isArray(a.entries)) {
          const s = []
          ;(typeof a.catatan == 'string' &&
            a.catatan.trim() &&
            s.push({ tanggal: '', itemId: '', tipe: 'catatan', text: a.catatan }),
            typeof a.rekomendasi == 'string' &&
              a.rekomendasi.trim() &&
              s.push({ tanggal: '', itemId: '', tipe: 'rekomendasi', text: a.rekomendasi }),
            (a.entries = s),
            delete a.catatan,
            delete a.rekomendasi)
        }
        ;(a.entries.push({
          tanggal: e.tanggal,
          itemId: e.itemId,
          tipe: e.tipe,
          text: e.text.trim()
        }),
          (e.text = ''),
          (G.value[l] = !1),
          g.success('Entry ditambahkan (jangan lupa Simpan Kartu)'))
      }
      function et(l, e) {
        if (!confirm('Hapus entry ini?')) return
        const a = _.value[l],
          s = a == null ? void 0 : a.entries
        if (!Array.isArray(s)) return
        const o = ce(l)[e],
          r = s.findIndex(
            (m) =>
              m.tanggal === o.tanggal &&
              m.itemId === o.itemId &&
              m.tipe === o.tipe &&
              m.text === o.text
          )
        r >= 0 && s.splice(r, 1)
      }
      function tt(l, e) {
        var s
        if (e === 'ceremonial') return 'Ceremonial'
        if (!e) return '—'
        const a = (s = l.items) == null ? void 0 : s.find((o) => o.id === e)
        return a ? a.label : e
      }
      function at(l) {
        if (!l) return '-'
        try {
          return new Date(l).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
          })
        } catch {
          return l
        }
      }
      const X = x(!1),
        Z = x(null),
        b = x({
          kelas_sekolah: '',
          lembaga: '',
          kelas: '',
          guru: '',
          juz: '',
          khotam_ke: '',
          catatan: '',
          tanggal: ''
        }),
        ae = x(!1),
        lt = [
          'TPQ Pagi',
          'TK A',
          'TK B',
          'I',
          'II',
          'III',
          'IV',
          'V',
          'VI',
          'VII',
          'VIII',
          'IX',
          'X',
          'XI',
          'XII',
          'Lulus Sekolah'
        ],
        _e = V(() => {
          const l = (ke.value || []).map((e) => e.lembaga).filter(Boolean)
          return l.length === 0
            ? ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'SDI', 'PKBM']
            : l
        }),
        Pe = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'],
        st = V(() => {
          const l = String(b.value.kelas || '').toLowerCase()
          let e = 0
          if (l.includes('½') || l.includes('1/2')) {
            const a = l.match(/(\d+)\s*[½]|(\d+)\s*1\/2/)
            a ? (e = parseFloat(a[1] || a[2]) + 0.5) : (e = 0.5)
          } else {
            const a = l.match(/(\d+)\s*juz/) || l.match(/level\s*(\d+)/) || l.match(/(\d+)/)
            e = a ? parseFloat(a[1]) : 0
          }
          return e >= 3 ? Pe : Pe.slice(0, 3)
        }),
        rt = V(() => {
          const l = String(b.value.lembaga || '')
            .toLowerCase()
            .trim()
          if (!l) return []
          const e = (ke.value || []).find(
            (a) =>
              String(a.lembaga || '')
                .toLowerCase()
                .trim() === l
          )
          if (e) {
            if (Array.isArray(e.kelas_list) && e.kelas_list.length > 0) return e.kelas_list
            if (Array.isArray(e.kelas) && e.kelas.length > 0) return e.kelas
          }
          return l === 'pra ptpt'
            ? ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
            : l === 'ptpt'
              ? ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
              : l === 'ppph' || l === 'p3h'
                ? ['Tahap 1', 'Tahap 2', 'Tahap 3']
                : l === 'tpq' || l === 'tpq pagi' || l === 'tpq sore'
                  ? ['Pra-TK', 'A', 'B', 'C', 'D', 'E', 'F', 'Tahsin', 'Tahfidz']
                  : []
        }),
        it = V(() => {
          const l = b.value.lembaga
          return l
            ? (Ue.value || [])
                .filter((e) => e.lembaga === l || e.lembaga_sekolah === l)
                .map((e) => e.nama)
                .filter(Boolean)
            : []
        })
      function ot(l) {
        Z.value = l
        const e = _e.value,
          a = String(l.lembaga || '')
            .toLowerCase()
            .trim(),
          s = e.find((o) => String(o).toLowerCase().trim() === a)
        ;((b.value = {
          tanggal: new Date().toISOString().slice(0, 10),
          kelas_sekolah: l.kelas_sekolah || '',
          lembaga: s || l.lembaga || '',
          kelas: l.kelas || '',
          guru: Array.isArray(l.guru) ? l.guru[0] || '' : l.guru || '',
          juz: l.juz ? String(l.juz).replace(/\D/g, '') : '',
          khotam_ke: '',
          catatan: ''
        }),
          (X.value = !0))
      }
      async function nt() {
        const l = Z.value
        if (l) {
          ae.value = !0
          try {
            const e = {
              kelas_sekolah: b.value.kelas_sekolah || '',
              lembaga: b.value.lembaga || '',
              kelas: b.value.kelas || '',
              guru: b.value.guru || ''
            }
            b.value.lembaga === 'PTPT' && b.value.juz && (e.juz = `JUZ ${b.value.juz}`)
            const a = new Date().toISOString().slice(0, 10),
              s = { ...(l.kartu_kenaikan || {}) },
              o = b.value.lembaga,
              r = b.value.kelas
            if (o && r) {
              ;(s[o] || (s[o] = {}), s[o][r] || (s[o][r] = {}))
              const C = s[o][r]
              Array.isArray(C.entries) || (C.entries = [])
              const z = b.value.khotam_ke || (b.value.juz ? `JUZ_${b.value.juz}` : 'kenaikan')
              ;((C.ceremonial = a),
                (C[z] = a),
                b.value.catatan &&
                  b.value.catatan.trim() &&
                  C.entries.push({
                    tanggal: a,
                    itemId: z,
                    tipe: 'catatan',
                    text: b.value.catatan.trim()
                  }),
                (e.kartu_kenaikan = s))
            }
            const m = Array.isArray(l.riwayat) ? [...l.riwayat] : [],
              u = m.length > 0 ? m[m.length - 1] : null,
              p = (u == null ? void 0 : u.kelas_to) || l.kelas || '',
              U = b.value.kelas || ''
            ;((p !== U || b.value.juz) &&
              (m.push({
                tgl_naik: a,
                lembaga: b.value.lembaga || l.lembaga || '',
                kelas_from: p,
                kelas_to: U,
                juz: b.value.juz ? `JUZ ${b.value.juz}` : null,
                catatan: b.value.catatan || '',
                guru: b.value.guru || ''
              }),
              (e.riwayat = m)),
              await Ne(q($, 'santri', String(l.id)), e),
              Object.assign(l, e))
            const de = I.value.findIndex((C) => String(C.id) === String(l.id))
            ;(de >= 0 && Object.assign(I.value[de], e),
              g.success(`Kenaikan ${l.nama} tersimpan`),
              (X.value = !1))
          } catch (e) {
            g.error('Gagal: ' + (e.message || e))
          } finally {
            ae.value = !1
          }
        }
      }
      return (
        bt(async () => {
          if (!H.value && !Q.value && !ge.value) {
            le.value = !1
            return
          }
          try {
            const l = await pt(mt($, 'santri'))
            I.value = l.docs.map((e) => ({ id: e.id, ...e.data() }))
          } catch (l) {
            g.error('Gagal load santri: ' + l.message)
          } finally {
            le.value = !1
          }
        }),
        (l, e) => (
          i(),
          n('div', It, [
            e[83] ||
              (e[83] = Ke(
                '<div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm" data-v-d780ff60><div class="flex items-center justify-between gap-2" data-v-d780ff60><div data-v-d780ff60><h2 class="text-lg md:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2" data-v-d780ff60><i class="fas fa-graduation-cap text-amber-600" data-v-d780ff60></i>Naik Kelas / Kenaikan Jilid </h2><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" data-v-d780ff60> Kontrol Kartu Kenaikan per santri — pilih lembaga lalu santri untuk mulai </p></div></div></div>',
                1
              )),
            ge.value
              ? (i(),
                n('div', St, [
                  le.value
                    ? (i(),
                      n('div', Tt, [
                        ...(e[21] ||
                          (e[21] = [
                            t(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-2xl text-teal-500' },
                              null,
                              -1
                            ),
                            t(
                              'p',
                              { class: 'text-xs text-slate-500 mt-2' },
                              'Memuat kartu kenaikan...',
                              -1
                            )
                          ]))
                      ]))
                    : D.value
                      ? (i(),
                        n('div', At, [
                          e[23] ||
                            (e[23] = t(
                              'p',
                              { class: 'text-xs text-slate-500 mb-3' },
                              'Kartu Kenaikan untuk:',
                              -1
                            )),
                          t(
                            'button',
                            {
                              onClick: e[0] || (e[0] = (a) => pe(D.value)),
                              class:
                                'w-full bg-gradient-to-br from-emerald-500 to-teal-700 hover:from-emerald-600 hover:to-teal-800 text-white rounded-xl p-4 flex items-center justify-between gap-3 cursor-pointer shadow-md hover:shadow-lg transition'
                            },
                            [
                              t('div', Lt, [
                                t('p', Ct, d(D.value.nama), 1),
                                t(
                                  'p',
                                  jt,
                                  d(D.value.lembaga) +
                                    d(D.value.kelas ? ' · Kelas ' + D.value.kelas : '') +
                                    d(
                                      D.value.juz && D.value.juz !== '-'
                                        ? ' · Juz ' + D.value.juz
                                        : ''
                                    ),
                                  1
                                )
                              ]),
                              e[22] ||
                                (e[22] = t(
                                  'span',
                                  {
                                    class:
                                      'text-xs font-black bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0'
                                  },
                                  [t('i', { class: 'fas fa-id-card' }), c('LIHAT KARTU ')],
                                  -1
                                ))
                            ]
                          )
                        ]))
                      : (i(),
                        n('div', Nt, [
                          ...(e[24] ||
                            (e[24] = [
                              t(
                                'i',
                                {
                                  class: 'fas fa-exclamation-triangle text-rose-400 text-2xl mb-2'
                                },
                                null,
                                -1
                              ),
                              t(
                                'p',
                                { class: 'text-sm font-bold text-rose-700' },
                                'Data santri tidak ditemukan',
                                -1
                              )
                            ]))
                        ]))
                ]))
              : !H.value && !Q.value
                ? (i(),
                  n('div', Ot, [
                    ...(e[25] ||
                      (e[25] = [
                        t('i', { class: 'fas fa-lock text-3xl text-rose-600 mb-2' }, null, -1),
                        t(
                          'p',
                          { class: 'text-sm font-bold text-rose-700 dark:text-rose-300' },
                          'Akses Ditolak',
                          -1
                        )
                      ]))
                  ]))
                : v('', !0),
            H.value || Q.value
              ? (i(),
                n('div', Ut, [
                  t('div', Jt, [
                    t(
                      'button',
                      {
                        onClick: e[1] || (e[1] = (a) => (j.value = 'form')),
                        class: S([
                          'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
                          j.value === 'form'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-700'
                        ])
                      },
                      [
                        ...(e[26] ||
                          (e[26] = [
                            t('i', { class: 'fas fa-edit text-sm' }, null, -1),
                            c('Form Kenaikan ', -1)
                          ]))
                      ],
                      2
                    ),
                    H.value || Q.value
                      ? (i(),
                        n(
                          'button',
                          {
                            key: 0,
                            onClick: e[2] || (e[2] = (a) => (j.value = 'riwayat')),
                            class: S([
                              'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
                              j.value === 'riwayat'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-purple-50 hover:text-purple-700'
                            ])
                          },
                          [
                            ...(e[27] ||
                              (e[27] = [
                                t('i', { class: 'fas fa-id-card text-sm' }, null, -1),
                                c('Riwayat Kenaikan ', -1)
                              ]))
                          ],
                          2
                        ))
                      : v('', !0),
                    H.value
                      ? (i(),
                        n(
                          'button',
                          {
                            key: 1,
                            onClick: e[3] || (e[3] = (a) => (j.value = 'pengaturan')),
                            class: S([
                              'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
                              j.value === 'pengaturan'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 hover:text-emerald-700'
                            ])
                          },
                          [
                            ...(e[28] ||
                              (e[28] = [
                                t('i', { class: 'fas fa-cog text-sm' }, null, -1),
                                c('Pengaturan ', -1)
                              ]))
                          ],
                          2
                        ))
                      : v('', !0)
                  ])
                ]))
              : v('', !0),
            H.value && j.value === 'form'
              ? (i(),
                n('div', Vt, [
                  e[29] ||
                    (e[29] = t(
                      'p',
                      {
                        class:
                          'text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2'
                      },
                      ' Filter Lembaga ',
                      -1
                    )),
                  t('div', zt, [
                    (i(!0),
                    n(
                      y,
                      null,
                      w(
                        Ie(Oe),
                        (a) => (
                          i(),
                          n(
                            'button',
                            {
                              key: a,
                              onClick: (s) => (R.value = a),
                              class: S([
                                'px-3 py-2.5 text-sm font-black rounded-xl transition cursor-pointer shadow-sm',
                                R.value === a ? ve(a, !0) : ve(a, !1)
                              ])
                            },
                            d(a),
                            11,
                            Ht
                          )
                        )
                      ),
                      128
                    ))
                  ])
                ]))
              : v('', !0),
            (H.value && j.value === 'form' && R.value) || (Q.value && j.value === 'form')
              ? (i(),
                n('div', Dt, [
                  t('div', Et, [
                    e[30] ||
                      (e[30] = t(
                        'i',
                        {
                          class:
                            'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm'
                        },
                        null,
                        -1
                      )),
                    h(
                      t(
                        'input',
                        {
                          'onUpdate:modelValue': e[4] || (e[4] = (a) => (F.value = a)),
                          type: 'search',
                          placeholder: 'Cari nama santri...',
                          class:
                            'w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none'
                        },
                        null,
                        512
                      ),
                      [[J, F.value]]
                    )
                  ]),
                  le.value
                    ? (i(),
                      n('div', Qt, [
                        ...(e[31] ||
                          (e[31] = [
                            t(
                              'i',
                              { class: 'fas fa-spinner fa-spin text-2xl text-amber-600 mb-2' },
                              null,
                              -1
                            ),
                            t('p', { class: 'text-sm text-slate-500' }, 'Memuat data santri...', -1)
                          ]))
                      ]))
                    : he.value.length === 0
                      ? (i(),
                        n(
                          'p',
                          Rt,
                          ' Tidak ada santri yang cocok di lembaga ' + d(R.value) + '. ',
                          1
                        ))
                      : (i(),
                        n('div', Bt, [
                          (i(!0),
                          n(
                            y,
                            null,
                            w(
                              he.value,
                              (a) => (
                                i(),
                                n(
                                  'div',
                                  {
                                    key: a.id,
                                    class:
                                      'flex items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition'
                                  },
                                  [
                                    t('div', Mt, [
                                      t('p', $t, d(a.nama), 1),
                                      t(
                                        'p',
                                        Ft,
                                        d(a.lembaga) +
                                          d(a.kelas ? ' · ' + a.kelas : '') +
                                          d(a.juz && a.juz !== '-' ? ' · Juz ' + a.juz : ''),
                                        1
                                      )
                                    ]),
                                    t('div', Gt, [
                                      t(
                                        'button',
                                        {
                                          onClick: (s) => ot(a),
                                          class:
                                            'bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1.5 uppercase tracking-wider shadow-sm hover:shadow-md transition',
                                          title: 'Proses Naik (form sederhana)'
                                        },
                                        [
                                          ...(e[32] ||
                                            (e[32] = [
                                              t('i', { class: 'fas fa-arrow-up' }, null, -1),
                                              c('PROSES NAIK ', -1)
                                            ]))
                                        ],
                                        8,
                                        Xt
                                      ),
                                      t(
                                        'button',
                                        {
                                          onClick: (s) => pe(a),
                                          class:
                                            'bg-blue-600 hover:bg-blue-700 text-white font-black px-2.5 py-2 rounded-lg text-xs cursor-pointer flex items-center gap-1 shadow-sm hover:shadow-md transition',
                                          title: 'Lihat Kartu Kenaikan (matrix lengkap)'
                                        },
                                        [
                                          ...(e[33] ||
                                            (e[33] = [
                                              t('i', { class: 'fas fa-id-card' }, null, -1)
                                            ]))
                                        ],
                                        8,
                                        Zt
                                      )
                                    ])
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ]))
                ]))
              : v('', !0),
            (H.value || Q.value) && j.value === 'riwayat'
              ? (i(),
                n('div', qt, [
                  t('div', Wt, [
                    e[36] ||
                      (e[36] = t(
                        'label',
                        { class: 'text-xs font-bold text-slate-600 dark:text-slate-300' },
                        ' Lembaga Qiraati: ',
                        -1
                      )),
                    h(
                      t(
                        'select',
                        {
                          'onUpdate:modelValue': e[5] || (e[5] = (a) => (P.value = a)),
                          class:
                            'text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                        },
                        [
                          ...(e[34] ||
                            (e[34] = [
                              Ke(
                                '<option value="" data-v-d780ff60>— Pilih Lembaga —</option><option value="TPQ Pagi" data-v-d780ff60>TPQ Pagi</option><option value="TPQ Sore" data-v-d780ff60>TPQ Sore</option><option value="Pra PTPT" data-v-d780ff60>Pra PTPT</option><option value="PTPT" data-v-d780ff60>PTPT</option><option value="PPPH" data-v-d780ff60>PPPH</option>',
                                6
                              )
                            ]))
                        ],
                        512
                      ),
                      [[E, P.value]]
                    ),
                    h(
                      t(
                        'input',
                        {
                          'onUpdate:modelValue': e[6] || (e[6] = (a) => (se.value = a)),
                          type: 'text',
                          placeholder: 'Cari nama santri...',
                          class:
                            'flex-1 min-w-[180px] text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                        },
                        null,
                        512
                      ),
                      [[J, se.value]]
                    ),
                    P.value && Y.value.length > 0
                      ? (i(),
                        n(
                          'button',
                          {
                            key: 0,
                            onClick: De,
                            disabled: re.value,
                            class:
                              'text-xs font-black px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 flex items-center gap-1.5'
                          },
                          [
                            e[35] || (e[35] = t('i', { class: 'fas fa-file-excel' }, null, -1)),
                            c(' ' + d(re.value ? 'Mengeksport…' : 'Excel'), 1)
                          ],
                          8,
                          Yt
                        ))
                      : v('', !0)
                  ]),
                  P.value
                    ? (i(),
                      n(
                        y,
                        { key: 0 },
                        [
                          Y.value.length === 0
                            ? (i(),
                              n('p', ea, ' Tidak ada santri di lembaga ' + d(P.value) + '. ', 1))
                            : (i(),
                              n('div', ta, [
                                (i(!0),
                                n(
                                  y,
                                  null,
                                  w(
                                    Y.value,
                                    (a) => (
                                      i(),
                                      n(
                                        'div',
                                        {
                                          key: a.id,
                                          class:
                                            'rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition'
                                        },
                                        [
                                          t('div', aa, [
                                            t('div', la, [
                                              t('p', sa, d(a.nama), 1),
                                              t('p', ra, [
                                                c(
                                                  d(a.lembaga) +
                                                    d(a.kelas ? ' · ' + a.kelas : '') +
                                                    ' ',
                                                  1
                                                ),
                                                t(
                                                  'span',
                                                  ia,
                                                  ' · ' + d(Ve(a, P.value)) + ' tanggal terisi ',
                                                  1
                                                ),
                                                ye(a, P.value) > 0
                                                  ? (i(),
                                                    n(
                                                      'button',
                                                      {
                                                        key: 0,
                                                        onClick: (s) => He(a.id),
                                                        class:
                                                          'ml-2 inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer transition',
                                                        title: B.value.has(a.id)
                                                          ? 'Sembunyikan catatan'
                                                          : 'Lihat catatan'
                                                      },
                                                      [
                                                        t(
                                                          'i',
                                                          {
                                                            class: S([
                                                              'fas',
                                                              B.value.has(a.id)
                                                                ? 'fa-chevron-up'
                                                                : 'fa-comment-dots'
                                                            ])
                                                          },
                                                          null,
                                                          2
                                                        ),
                                                        c(' ' + d(ye(a, P.value)) + ' catatan ', 1)
                                                      ],
                                                      8,
                                                      oa
                                                    ))
                                                  : v('', !0)
                                              ])
                                            ]),
                                            t(
                                              'button',
                                              {
                                                onClick: () => {
                                                  ;((R.value = P.value), pe(a))
                                                },
                                                class:
                                                  'bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1 flex-shrink-0'
                                              },
                                              [
                                                ...(e[37] ||
                                                  (e[37] = [
                                                    t('i', { class: 'fas fa-eye' }, null, -1),
                                                    c('Lihat ', -1)
                                                  ]))
                                              ],
                                              8,
                                              na
                                            )
                                          ]),
                                          B.value.has(a.id)
                                            ? (i(),
                                              n('div', da, [
                                                (i(!0),
                                                n(
                                                  y,
                                                  null,
                                                  w(
                                                    ze(a, P.value, 5),
                                                    (s, o) => (
                                                      i(),
                                                      n(
                                                        'div',
                                                        {
                                                          key: o,
                                                          class: S([
                                                            'border-l-4 px-2.5 py-1.5 rounded-r-md',
                                                            s.tipe === 'rekomendasi'
                                                              ? 'bg-emerald-50 border-emerald-500'
                                                              : 'bg-blue-50 border-blue-500'
                                                          ])
                                                        },
                                                        [
                                                          t(
                                                            'p',
                                                            {
                                                              class: S([
                                                                'text-[9px] font-black uppercase tracking-wider mb-0.5',
                                                                s.tipe === 'rekomendasi'
                                                                  ? 'text-emerald-700'
                                                                  : 'text-blue-700'
                                                              ])
                                                            },
                                                            [
                                                              t(
                                                                'i',
                                                                {
                                                                  class: S([
                                                                    'fas mr-1',
                                                                    s.tipe === 'rekomendasi'
                                                                      ? 'fa-lightbulb'
                                                                      : 'fa-comment-dots'
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                              ),
                                                              c(
                                                                ' ' +
                                                                  d(
                                                                    s.tipe === 'rekomendasi'
                                                                      ? 'Rekomendasi'
                                                                      : 'Catatan'
                                                                  ) +
                                                                  ' ',
                                                                1
                                                              ),
                                                              t(
                                                                'span',
                                                                ua,
                                                                ' · ' +
                                                                  d(s.tanggal || '—') +
                                                                  d(
                                                                    s.kelasId
                                                                      ? ' · ' + s.kelasId
                                                                      : ''
                                                                  ),
                                                                1
                                                              )
                                                            ],
                                                            2
                                                          ),
                                                          t('p', ba, d(s.text), 1)
                                                        ],
                                                        2
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ]))
                                            : v('', !0)
                                        ]
                                      )
                                    )
                                  ),
                                  128
                                ))
                              ]))
                        ],
                        64
                      ))
                    : (i(),
                      n('p', pa, [
                        ...(e[38] ||
                          (e[38] = [
                            t(
                              'i',
                              {
                                class:
                                  'fas fa-id-card text-3xl text-slate-300 dark:text-slate-600 block mb-2'
                              },
                              null,
                              -1
                            ),
                            c(' Pilih lembaga untuk melihat riwayat kenaikan santri. ', -1)
                          ]))
                      ]))
                ]))
              : v('', !0),
            H.value && j.value === 'pengaturan'
              ? (i(),
                n('div', ma, [
                  e[56] ||
                    (e[56] = t(
                      'p',
                      {
                        class:
                          'text-xs text-slate-500 dark:text-slate-400 italic flex items-start gap-1.5'
                      },
                      [
                        t('i', { class: 'fas fa-info-circle mt-0.5' }),
                        c(
                          ' Klik card lembaga di bawah untuk atur KOP Kartu Kenaikan khusus lembaga tersebut. '
                        )
                      ],
                      -1
                    )),
                  t('div', ca, [
                    (i(!0),
                    n(
                      y,
                      null,
                      w(
                        Ie(Oe),
                        (a) => (
                          i(),
                          n(
                            'button',
                            {
                              key: a,
                              onClick: (s) => Me(a),
                              class: S([
                                'bg-white dark:bg-slate-900 border-2 rounded-xl p-3 md:p-4 text-center font-black transition cursor-pointer shadow-sm',
                                T.value === a
                                  ? 'border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-200'
                                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 hover:bg-blue-50/50'
                              ])
                            },
                            [t('p', ka, d(a), 1)],
                            10,
                            xa
                          )
                        )
                      ),
                      128
                    ))
                  ]),
                  T.value
                    ? (i(),
                      n('div', ga, [
                        t('div', fa, [
                          e[39] || (e[39] = t('i', { class: 'fas fa-folder-open mr-1' }, null, -1)),
                          c('Pengaturan Kartu — ' + d(T.value), 1)
                        ]),
                        t('div', va, [
                          t('div', ha, [
                            e[43] ||
                              (e[43] = t(
                                'h4',
                                {
                                  class: 'text-sm font-black text-blue-800 dark:text-blue-300 mb-1'
                                },
                                [
                                  t('i', { class: 'fas fa-flag mr-1' }),
                                  c('KOP Kartu Kenaikan (Per Lembaga) ')
                                ],
                                -1
                              )),
                            e[44] ||
                              (e[44] = t(
                                'p',
                                { class: 'text-[11px] text-slate-600 dark:text-slate-400 mb-3' },
                                ' Atur judul, subjudul, alamat khusus untuk lembaga ini. Mis: PTPT pakai "PASCA TPQ PROGRAM TAHFIZH", TPQ pakai "TAMAN PENDIDIKAN AL-QURAN". ',
                                -1
                              )),
                            t('div', ya, [
                              t('div', null, [
                                e[40] ||
                                  (e[40] = t(
                                    'label',
                                    {
                                      class:
                                        'text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1'
                                    },
                                    'Judul Utama',
                                    -1
                                  )),
                                h(
                                  t(
                                    'input',
                                    {
                                      'onUpdate:modelValue': e[7] || (e[7] = (a) => (L.judul = a)),
                                      type: 'text',
                                      placeholder: 'KONTROL KENAIKAN KELAS',
                                      class:
                                        'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[J, L.judul]]
                                )
                              ]),
                              t('div', null, [
                                e[41] ||
                                  (e[41] = t(
                                    'label',
                                    {
                                      class:
                                        'text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1'
                                    },
                                    'Subjudul',
                                    -1
                                  )),
                                h(
                                  t(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        e[8] || (e[8] = (a) => (L.subjudul = a)),
                                      type: 'text',
                                      placeholder: 'PTPT MAMBAUL ULUM',
                                      class:
                                        'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[J, L.subjudul]]
                                )
                              ]),
                              t('div', wa, [
                                e[42] ||
                                  (e[42] = t(
                                    'label',
                                    {
                                      class:
                                        'text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1'
                                    },
                                    'Alamat',
                                    -1
                                  )),
                                h(
                                  t(
                                    'input',
                                    {
                                      'onUpdate:modelValue': e[9] || (e[9] = (a) => (L.alamat = a)),
                                      type: 'text',
                                      placeholder:
                                        'Jl. Kolonel Sugiono No. 112 Panjunan - Waru - Sidoarjo',
                                      class:
                                        'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[J, L.alamat]]
                                )
                              ])
                            ]),
                            t('div', _a, [
                              t(
                                'button',
                                {
                                  onClick: $e,
                                  disabled: ee.value,
                                  class:
                                    'bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer disabled:opacity-50'
                                },
                                [
                                  t(
                                    'i',
                                    {
                                      class: S([
                                        'fas',
                                        ee.value ? 'fa-spinner fa-spin' : 'fa-save',
                                        'mr-1'
                                      ])
                                    },
                                    null,
                                    2
                                  ),
                                  c(' ' + d(ee.value ? 'Menyimpan...' : 'Simpan KOP'), 1)
                                ],
                                8,
                                Pa
                              )
                            ])
                          ]),
                          t('div', Ka, [
                            t('div', Ia, [
                              t('h4', Sa, [
                                e[45] ||
                                  (e[45] = t('i', { class: 'fas fa-list-alt mr-1' }, null, -1)),
                                c('Schema Kartu Kenaikan — ' + d(T.value), 1)
                              ]),
                              t('div', Ta, [
                                t(
                                  'button',
                                  {
                                    onClick: Re,
                                    class:
                                      'text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  },
                                  [
                                    ...(e[46] ||
                                      (e[46] = [
                                        t('i', { class: 'fas fa-undo mr-0.5' }, null, -1),
                                        c('Reset Default ', -1)
                                      ]))
                                  ]
                                ),
                                t(
                                  'button',
                                  {
                                    onClick: Be,
                                    disabled: ie.value,
                                    class:
                                      'text-[10px] font-black px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50'
                                  },
                                  [
                                    t(
                                      'i',
                                      {
                                        class: S([
                                          'fas',
                                          ie.value ? 'fa-spinner fa-spin' : 'fa-save',
                                          'mr-1'
                                        ])
                                      },
                                      null,
                                      2
                                    ),
                                    e[47] || (e[47] = c(' Simpan Schema ', -1))
                                  ],
                                  8,
                                  Aa
                                )
                              ])
                            ]),
                            t('div', null, [
                              e[48] ||
                                (e[48] = t(
                                  'label',
                                  {
                                    class:
                                      'text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider block mb-1'
                                  },
                                  ' Header Item (mis: Juz / Jilid / Khotam / Tahap) ',
                                  -1
                                )),
                              h(
                                t(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      e[10] || (e[10] = (a) => (A.value.itemHeader = a)),
                                    placeholder: 'Item',
                                    class:
                                      'w-full px-2 py-1.5 text-sm border border-purple-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                  },
                                  null,
                                  512
                                ),
                                [[J, A.value.itemHeader]]
                              )
                            ]),
                            t('div', La, [
                              t('div', { class: 'flex items-center justify-between' }, [
                                e[50] ||
                                  (e[50] = t(
                                    'p',
                                    {
                                      class:
                                        'text-[11px] font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider'
                                    },
                                    ' Daftar Kelas/Level/Jilid: ',
                                    -1
                                  )),
                                t(
                                  'button',
                                  {
                                    onClick: Qe,
                                    class:
                                      'text-[10px] bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-2 py-0.5 rounded'
                                  },
                                  [
                                    ...(e[49] ||
                                      (e[49] = [
                                        t('i', { class: 'fas fa-plus mr-0.5' }, null, -1),
                                        c('Tambah Kelas ', -1)
                                      ]))
                                  ]
                                )
                              ]),
                              (A.value.kelasList || []).length === 0
                                ? (i(),
                                  n(
                                    'div',
                                    Ca,
                                    ' Belum ada kelas. Klik "Tambah Kelas" untuk mulai. '
                                  ))
                                : v('', !0),
                              (i(!0),
                              n(
                                y,
                                null,
                                w(
                                  A.value.kelasList || [],
                                  (a, s) => (
                                    i(),
                                    n(
                                      'div',
                                      {
                                        key: a.id,
                                        class:
                                          'bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-700 rounded-lg p-2 space-y-2'
                                      },
                                      [
                                        t('div', ja, [
                                          h(
                                            t(
                                              'input',
                                              {
                                                'onUpdate:modelValue': (o) => (a.label = o),
                                                placeholder: 'Label (Kelas 1)',
                                                class:
                                                  'text-xs font-bold px-2 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                              },
                                              null,
                                              8,
                                              Na
                                            ),
                                            [[J, a.label]]
                                          ),
                                          t('label', Oa, [
                                            h(
                                              t(
                                                'input',
                                                {
                                                  'onUpdate:modelValue': (o) => (a.ceremonial = o),
                                                  type: 'checkbox',
                                                  class: 'w-3 h-3 accent-purple-600'
                                                },
                                                null,
                                                8,
                                                Ua
                                              ),
                                              [[xt, a.ceremonial]]
                                            ),
                                            e[51] || (e[51] = c(' Ceremonial ', -1))
                                          ]),
                                          t(
                                            'button',
                                            {
                                              onClick: (o) => A.value.kelasList.splice(s, 1),
                                              class:
                                                'text-rose-500 hover:bg-rose-50 text-xs px-1.5 rounded',
                                              title: 'Hapus kelas'
                                            },
                                            [
                                              ...(e[52] ||
                                                (e[52] = [
                                                  t('i', { class: 'fas fa-trash' }, null, -1)
                                                ]))
                                            ],
                                            8,
                                            Ja
                                          )
                                        ]),
                                        t('div', Va, [
                                          t(
                                            'p',
                                            za,
                                            ' Items (' + d(A.value.itemHeader || 'Item') + '): ',
                                            1
                                          ),
                                          t('div', Ha, [
                                            (i(!0),
                                            n(
                                              y,
                                              null,
                                              w(
                                                a.items || [],
                                                (o, r) => (
                                                  i(),
                                                  n(
                                                    'span',
                                                    {
                                                      key: r,
                                                      class:
                                                        'bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1'
                                                    },
                                                    [
                                                      h(
                                                        t(
                                                          'input',
                                                          {
                                                            'onUpdate:modelValue': (m) =>
                                                              (o.label = m),
                                                            class:
                                                              'bg-transparent border-0 outline-none text-[11px] w-14'
                                                          },
                                                          null,
                                                          8,
                                                          Da
                                                        ),
                                                        [[J, o.label]]
                                                      ),
                                                      t(
                                                        'button',
                                                        {
                                                          onClick: (m) => a.items.splice(r, 1),
                                                          class: 'text-rose-400 text-[10px]'
                                                        },
                                                        [
                                                          ...(e[53] ||
                                                            (e[53] = [
                                                              t(
                                                                'i',
                                                                { class: 'fas fa-times' },
                                                                null,
                                                                -1
                                                              )
                                                            ]))
                                                        ],
                                                        8,
                                                        Ea
                                                      )
                                                    ]
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                            t(
                                              'button',
                                              {
                                                onClick: (o) =>
                                                  (a.items = a.items || []) &&
                                                  a.items.push({
                                                    id: 'it_' + Date.now(),
                                                    label: ''
                                                  }),
                                                class:
                                                  'bg-purple-200 hover:bg-purple-300 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded'
                                              },
                                              ' + Item ',
                                              8,
                                              Qa
                                            )
                                          ])
                                        ])
                                      ]
                                    )
                                  )
                                ),
                                128
                              ))
                            ]),
                            e[54] ||
                              (e[54] = t(
                                'p',
                                { class: 'text-[10px] text-slate-500 dark:text-slate-400 italic' },
                                [
                                  t('i', { class: 'fas fa-info-circle mr-1' }),
                                  c(
                                    ' Schema ini dipakai di modal Kartu Kenaikan (matrix kelas × items × tanggal khotam/naik). '
                                  )
                                ],
                                -1
                              ))
                          ])
                        ])
                      ]))
                    : (i(),
                      n('p', Ra, [
                        ...(e[55] ||
                          (e[55] = [
                            t(
                              'i',
                              {
                                class:
                                  'fas fa-hand-pointer text-2xl text-slate-300 dark:text-slate-600 block mb-2'
                              },
                              null,
                              -1
                            ),
                            c(' Pilih lembaga di atas untuk mulai atur KOP. ', -1)
                          ]))
                      ]))
                ]))
              : v('', !0),
            (i(),
            Se(Ce, { to: 'body' }, [
              Te(
                Le,
                { name: 'fade' },
                {
                  default: Ae(() => {
                    var a, s, o, r
                    return [
                      be.value
                        ? (i(),
                          n(
                            'div',
                            {
                              key: 0,
                              class:
                                'fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto',
                              onClick: je(me, ['self'])
                            },
                            [
                              t('div', Ba, [
                                t('div', Ma, [
                                  t('p', $a, d(ne.value.judul), 1),
                                  t('p', Fa, d(ne.value.subjudul), 1),
                                  ne.value.alamat
                                    ? (i(), n('p', Ga, d(ne.value.alamat), 1))
                                    : v('', !0)
                                ]),
                                t('div', Xa, [
                                  t('div', Za, [
                                    t('div', qa, [
                                      t('div', null, [
                                        e[57] ||
                                          (e[57] = t(
                                            'span',
                                            { class: 'font-bold text-slate-500 inline-block w-32' },
                                            'No. Induk',
                                            -1
                                          )),
                                        c(
                                          ' : ' +
                                            d(((a = N.value) == null ? void 0 : a.nis) || '-'),
                                          1
                                        )
                                      ]),
                                      t('div', null, [
                                        e[58] ||
                                          (e[58] = t(
                                            'span',
                                            { class: 'font-bold text-slate-500 inline-block w-32' },
                                            'Tanggal Masuk',
                                            -1
                                          )),
                                        c(
                                          ' : ' +
                                            d(
                                              ((s = N.value) == null ? void 0 : s.tgl_masuk) || '-'
                                            ),
                                          1
                                        )
                                      ]),
                                      t('div', null, [
                                        e[59] ||
                                          (e[59] = t(
                                            'span',
                                            { class: 'font-bold text-slate-500 inline-block w-32' },
                                            'Nama',
                                            -1
                                          )),
                                        c(
                                          ' : ' +
                                            d(((o = N.value) == null ? void 0 : o.nama) || '-'),
                                          1
                                        )
                                      ]),
                                      t('div', null, [
                                        e[60] ||
                                          (e[60] = t(
                                            'span',
                                            { class: 'font-bold text-slate-500 inline-block w-32' },
                                            'Alamat',
                                            -1
                                          )),
                                        c(
                                          ' : ' +
                                            d(((r = N.value) == null ? void 0 : r.alamat) || '-'),
                                          1
                                        )
                                      ])
                                    ])
                                  ]),
                                  t('div', Wa, [
                                    (i(!0),
                                    n(
                                      y,
                                      null,
                                      w(
                                        Math.ceil(M.value.kelasList.length / 2),
                                        (m) => (
                                          i(),
                                          n(
                                            'div',
                                            {
                                              key: m,
                                              class: 'grid grid-cols-1 md:grid-cols-2 gap-3'
                                            },
                                            [
                                              (i(!0),
                                              n(
                                                y,
                                                null,
                                                w(
                                                  M.value.kelasList.slice(
                                                    (m - 1) * 2,
                                                    (m - 1) * 2 + 2
                                                  ),
                                                  (u) => (
                                                    i(),
                                                    n(
                                                      'div',
                                                      {
                                                        key: u.id,
                                                        class:
                                                          'border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden'
                                                      },
                                                      [
                                                        t('div', Ya, d(u.label), 1),
                                                        t(
                                                          'div',
                                                          el,
                                                          d(M.value.itemHeader || 'Item'),
                                                          1
                                                        ),
                                                        t('table', tl, [
                                                          t('thead', null, [
                                                            t('tr', al, [
                                                              (i(!0),
                                                              n(
                                                                y,
                                                                null,
                                                                w(
                                                                  u.items,
                                                                  (p) => (
                                                                    i(),
                                                                    n(
                                                                      'th',
                                                                      {
                                                                        key: p.id,
                                                                        class:
                                                                          'border border-slate-300 dark:border-slate-600 px-1 py-1 font-bold text-center text-slate-700 dark:text-slate-200'
                                                                      },
                                                                      d(p.label),
                                                                      1
                                                                    )
                                                                  )
                                                                ),
                                                                128
                                                              ))
                                                            ])
                                                          ]),
                                                          t('tbody', null, [
                                                            t('tr', ll, [
                                                              (i(!0),
                                                              n(
                                                                y,
                                                                null,
                                                                w(
                                                                  u.items,
                                                                  (p) => (
                                                                    i(),
                                                                    n(
                                                                      'td',
                                                                      {
                                                                        key: p.id,
                                                                        class:
                                                                          'border border-slate-300 dark:border-slate-600 px-1 py-1'
                                                                      },
                                                                      [
                                                                        t(
                                                                          'input',
                                                                          {
                                                                            type: 'date',
                                                                            value: Ge(u.id, p.id),
                                                                            onInput: (U) =>
                                                                              Xe(
                                                                                u.id,
                                                                                p.id,
                                                                                U.target.value
                                                                              ),
                                                                            class:
                                                                              'w-full text-[9px] py-0.5 px-1 border-0 outline-none bg-transparent text-slate-800 dark:text-white'
                                                                          },
                                                                          null,
                                                                          40,
                                                                          sl
                                                                        )
                                                                      ]
                                                                    )
                                                                  )
                                                                ),
                                                                128
                                                              ))
                                                            ])
                                                          ])
                                                        ]),
                                                        u.ceremonial
                                                          ? (i(),
                                                            n('div', rl, [
                                                              e[61] ||
                                                                (e[61] = t(
                                                                  'span',
                                                                  {
                                                                    class:
                                                                      'font-bold text-amber-800 dark:text-amber-300'
                                                                  },
                                                                  'Ceremonial:',
                                                                  -1
                                                                )),
                                                              t(
                                                                'input',
                                                                {
                                                                  type: 'date',
                                                                  value: Ze(u.id),
                                                                  onInput: (p) =>
                                                                    qe(u.id, p.target.value),
                                                                  class:
                                                                    'flex-1 py-0.5 px-1 text-[10px] border border-amber-200 dark:border-amber-700 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                                                },
                                                                null,
                                                                40,
                                                                il
                                                              )
                                                            ]))
                                                          : v('', !0),
                                                        t('div', ol, [
                                                          t('div', nl, [
                                                            e[63] ||
                                                              (e[63] = t(
                                                                'p',
                                                                {
                                                                  class:
                                                                    'text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide'
                                                                },
                                                                [
                                                                  t('i', {
                                                                    class:
                                                                      'fas fa-comment-dots mr-1 text-blue-600'
                                                                  }),
                                                                  c('Catatan & Rekomendasi ')
                                                                ],
                                                                -1
                                                              )),
                                                            t(
                                                              'button',
                                                              {
                                                                type: 'button',
                                                                onClick: () => we(u.id),
                                                                class:
                                                                  'text-[9px] font-bold px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                                              },
                                                              [
                                                                ...(e[62] ||
                                                                  (e[62] = [
                                                                    t(
                                                                      'i',
                                                                      {
                                                                        class: 'fas fa-plus mr-0.5'
                                                                      },
                                                                      null,
                                                                      -1
                                                                    ),
                                                                    c('Tambah ', -1)
                                                                  ]))
                                                              ],
                                                              8,
                                                              dl
                                                            )
                                                          ]),
                                                          G.value[u.id]
                                                            ? (i(),
                                                              n('div', ul, [
                                                                t('div', bl, [
                                                                  h(
                                                                    t(
                                                                      'input',
                                                                      {
                                                                        'onUpdate:modelValue': (
                                                                          p
                                                                        ) =>
                                                                          (O.value[u.id].tanggal =
                                                                            p),
                                                                        type: 'date',
                                                                        class:
                                                                          'text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                                                      },
                                                                      null,
                                                                      8,
                                                                      pl
                                                                    ),
                                                                    [[J, O.value[u.id].tanggal]]
                                                                  ),
                                                                  h(
                                                                    t(
                                                                      'select',
                                                                      {
                                                                        'onUpdate:modelValue': (
                                                                          p
                                                                        ) =>
                                                                          (O.value[u.id].itemId =
                                                                            p),
                                                                        class:
                                                                          'text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                                                      },
                                                                      [
                                                                        (i(!0),
                                                                        n(
                                                                          y,
                                                                          null,
                                                                          w(
                                                                            u.items,
                                                                            (p) => (
                                                                              i(),
                                                                              n(
                                                                                'option',
                                                                                {
                                                                                  key: p.id,
                                                                                  value: p.id
                                                                                },
                                                                                d(
                                                                                  M.value.itemHeader
                                                                                ) +
                                                                                  ' ' +
                                                                                  d(p.label),
                                                                                9,
                                                                                cl
                                                                              )
                                                                            )
                                                                          ),
                                                                          128
                                                                        )),
                                                                        u.ceremonial
                                                                          ? (i(),
                                                                            n(
                                                                              'option',
                                                                              xl,
                                                                              'Ceremonial'
                                                                            ))
                                                                          : v('', !0)
                                                                      ],
                                                                      8,
                                                                      ml
                                                                    ),
                                                                    [[E, O.value[u.id].itemId]]
                                                                  ),
                                                                  h(
                                                                    t(
                                                                      'select',
                                                                      {
                                                                        'onUpdate:modelValue': (
                                                                          p
                                                                        ) =>
                                                                          (O.value[u.id].tipe = p),
                                                                        class:
                                                                          'text-[10px] px-1.5 py-1 border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                                                      },
                                                                      [
                                                                        ...(e[64] ||
                                                                          (e[64] = [
                                                                            t(
                                                                              'option',
                                                                              { value: 'catatan' },
                                                                              'Catatan',
                                                                              -1
                                                                            ),
                                                                            t(
                                                                              'option',
                                                                              {
                                                                                value: 'rekomendasi'
                                                                              },
                                                                              'Rekomendasi',
                                                                              -1
                                                                            )
                                                                          ]))
                                                                      ],
                                                                      8,
                                                                      kl
                                                                    ),
                                                                    [[E, O.value[u.id].tipe]]
                                                                  )
                                                                ]),
                                                                h(
                                                                  t(
                                                                    'textarea',
                                                                    {
                                                                      'onUpdate:modelValue': (p) =>
                                                                        (O.value[u.id].text = p),
                                                                      rows: '2',
                                                                      placeholder:
                                                                        'Tulis catatan/rekomendasi...',
                                                                      class:
                                                                        'w-full px-2 py-1 text-[10px] border border-slate-300 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none'
                                                                    },
                                                                    null,
                                                                    8,
                                                                    gl
                                                                  ),
                                                                  [[J, O.value[u.id].text]]
                                                                ),
                                                                t('div', fl, [
                                                                  t(
                                                                    'button',
                                                                    {
                                                                      type: 'button',
                                                                      onClick: () => we(u.id),
                                                                      class:
                                                                        'text-[9px] font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                                                                    },
                                                                    ' Batal ',
                                                                    8,
                                                                    vl
                                                                  ),
                                                                  t(
                                                                    'button',
                                                                    {
                                                                      type: 'button',
                                                                      onClick: () => Ye(u.id),
                                                                      class:
                                                                        'text-[9px] font-bold px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white'
                                                                    },
                                                                    [
                                                                      ...(e[65] ||
                                                                        (e[65] = [
                                                                          t(
                                                                            'i',
                                                                            {
                                                                              class:
                                                                                'fas fa-check mr-0.5'
                                                                            },
                                                                            null,
                                                                            -1
                                                                          ),
                                                                          c('Simpan Entry ', -1)
                                                                        ]))
                                                                    ],
                                                                    8,
                                                                    hl
                                                                  )
                                                                ])
                                                              ]))
                                                            : v('', !0),
                                                          ce(u.id).length > 0
                                                            ? (i(),
                                                              n('div', yl, [
                                                                (i(!0),
                                                                n(
                                                                  y,
                                                                  null,
                                                                  w(
                                                                    ce(u.id),
                                                                    (p, U) => (
                                                                      i(),
                                                                      n(
                                                                        'div',
                                                                        {
                                                                          key: U,
                                                                          class: S([
                                                                            'border-l-4 px-2 py-1.5 rounded-r text-[10px] flex items-start gap-2',
                                                                            p.tipe === 'rekomendasi'
                                                                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
                                                                              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                                                                          ])
                                                                        },
                                                                        [
                                                                          t('div', wl, [
                                                                            t(
                                                                              'p',
                                                                              {
                                                                                class: S([
                                                                                  'font-bold',
                                                                                  p.tipe ===
                                                                                  'rekomendasi'
                                                                                    ? 'text-emerald-700'
                                                                                    : 'text-blue-700'
                                                                                ])
                                                                              },
                                                                              [
                                                                                t(
                                                                                  'i',
                                                                                  {
                                                                                    class: S([
                                                                                      'fas mr-0.5',
                                                                                      p.tipe ===
                                                                                      'rekomendasi'
                                                                                        ? 'fa-lightbulb'
                                                                                        : 'fa-comment-dots'
                                                                                    ])
                                                                                  },
                                                                                  null,
                                                                                  2
                                                                                ),
                                                                                c(
                                                                                  ' ' +
                                                                                    d(
                                                                                      p.tipe ===
                                                                                        'rekomendasi'
                                                                                        ? 'Rekomendasi'
                                                                                        : 'Catatan'
                                                                                    ) +
                                                                                    ' — ' +
                                                                                    d(
                                                                                      at(p.tanggal)
                                                                                    ) +
                                                                                    ' · ' +
                                                                                    d(
                                                                                      tt(
                                                                                        u,
                                                                                        p.itemId
                                                                                      )
                                                                                    ),
                                                                                  1
                                                                                )
                                                                              ],
                                                                              2
                                                                            ),
                                                                            t('p', _l, d(p.text), 1)
                                                                          ]),
                                                                          t(
                                                                            'button',
                                                                            {
                                                                              type: 'button',
                                                                              onClick: () =>
                                                                                et(u.id, U),
                                                                              class:
                                                                                'text-rose-500 hover:text-rose-700 text-[10px] flex-shrink-0',
                                                                              title: 'Hapus entry'
                                                                            },
                                                                            [
                                                                              ...(e[66] ||
                                                                                (e[66] = [
                                                                                  t(
                                                                                    'i',
                                                                                    {
                                                                                      class:
                                                                                        'fas fa-times'
                                                                                    },
                                                                                    null,
                                                                                    -1
                                                                                  )
                                                                                ]))
                                                                            ],
                                                                            8,
                                                                            Pl
                                                                          )
                                                                        ],
                                                                        2
                                                                      )
                                                                    )
                                                                  ),
                                                                  128
                                                                ))
                                                              ]))
                                                            : (i(),
                                                              n(
                                                                'p',
                                                                Kl,
                                                                ' Belum ada catatan/rekomendasi untuk kelas ini. '
                                                              ))
                                                        ])
                                                      ]
                                                    )
                                                  )
                                                ),
                                                128
                                              ))
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                    M.value.kelasList.length === 0
                                      ? (i(),
                                        n(
                                          'p',
                                          Il,
                                          ' Schema untuk lembaga ' +
                                            d(oe.value) +
                                            ' belum dikonfigurasi. ',
                                          1
                                        ))
                                      : v('', !0)
                                  ])
                                ]),
                                t('div', Sl, [
                                  t(
                                    'button',
                                    {
                                      onClick: me,
                                      class:
                                        'px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer'
                                    },
                                    ' Batal '
                                  ),
                                  t(
                                    'button',
                                    {
                                      onClick: We,
                                      class:
                                        'px-4 py-2 text-sm font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center gap-1.5 no-print'
                                    },
                                    [
                                      ...(e[67] ||
                                        (e[67] = [
                                          t('i', { class: 'fas fa-print' }, null, -1),
                                          c('Cetak ', -1)
                                        ]))
                                    ]
                                  ),
                                  t(
                                    'button',
                                    {
                                      onClick: Fe,
                                      disabled: te.value,
                                      class:
                                        'px-4 py-2 text-sm font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5 no-print'
                                    },
                                    [
                                      t(
                                        'i',
                                        {
                                          class: S([
                                            'fas',
                                            te.value ? 'fa-spinner fa-spin' : 'fa-save'
                                          ])
                                        },
                                        null,
                                        2
                                      ),
                                      c(' ' + d(te.value ? 'Menyimpan...' : 'Simpan Kartu'), 1)
                                    ],
                                    8,
                                    Tl
                                  )
                                ])
                              ])
                            ]
                          ))
                        : v('', !0)
                    ]
                  }),
                  _: 1
                }
              )
            ])),
            (i(),
            Se(Ce, { to: 'body' }, [
              Te(
                Le,
                { name: 'fade' },
                {
                  default: Ae(() => {
                    var a, s, o
                    return [
                      X.value
                        ? (i(),
                          n(
                            'div',
                            {
                              key: 0,
                              class:
                                'fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto',
                              onClick: e[20] || (e[20] = je((r) => (X.value = !1), ['self']))
                            },
                            [
                              t('div', Al, [
                                t('header', Ll, [
                                  e[68] ||
                                    (e[68] = t(
                                      'h3',
                                      {
                                        class:
                                          'text-lg md:text-xl font-black text-slate-800 dark:text-white'
                                      },
                                      [
                                        t('i', { class: 'fas fa-arrow-up mr-2 text-blue-600' }),
                                        c('Form Kenaikan ')
                                      ],
                                      -1
                                    )),
                                  t(
                                    'button',
                                    {
                                      onClick: e[11] || (e[11] = (r) => (X.value = !1)),
                                      class:
                                        'text-slate-400 hover:text-red-500 text-2xl font-bold w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center cursor-pointer'
                                    },
                                    ' × '
                                  )
                                ]),
                                t('div', Cl, [
                                  t('div', jl, [
                                    e[69] ||
                                      (e[69] = t(
                                        'p',
                                        {
                                          class:
                                            'text-[10px] text-blue-600 dark:text-blue-300 font-black uppercase tracking-widest mb-1'
                                        },
                                        ' Identitas Santri ',
                                        -1
                                      )),
                                    t(
                                      'strong',
                                      Nl,
                                      d(((a = Z.value) == null ? void 0 : a.nama) || '-'),
                                      1
                                    ),
                                    t(
                                      'p',
                                      Ol,
                                      ' Saat ini: ' +
                                        d(((s = Z.value) == null ? void 0 : s.lembaga) || '-') +
                                        d(
                                          (o = Z.value) != null && o.kelas
                                            ? ' · ' + Z.value.kelas
                                            : ''
                                        ),
                                      1
                                    )
                                  ]),
                                  t('div', null, [
                                    e[71] ||
                                      (e[71] = t(
                                        'label',
                                        {
                                          class:
                                            'block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide'
                                        },
                                        ' Kelas Sekolah (Perbarui Jika Naik) ',
                                        -1
                                      )),
                                    h(
                                      t(
                                        'select',
                                        {
                                          'onUpdate:modelValue':
                                            e[12] || (e[12] = (r) => (b.value.kelas_sekolah = r)),
                                          class:
                                            'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer'
                                        },
                                        [
                                          e[70] ||
                                            (e[70] = t(
                                              'option',
                                              { value: '' },
                                              '-- Pilih / Kosong --',
                                              -1
                                            )),
                                          (i(),
                                          n(
                                            y,
                                            null,
                                            w(lt, (r) =>
                                              t('option', { key: r, value: r }, d(r), 9, Ul)
                                            ),
                                            64
                                          ))
                                        ],
                                        512
                                      ),
                                      [[E, b.value.kelas_sekolah]]
                                    )
                                  ]),
                                  t('div', Jl, [
                                    t('div', null, [
                                      e[73] ||
                                        (e[73] = t(
                                          'label',
                                          {
                                            class:
                                              'block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide'
                                          },
                                          ' Lembaga Baru ',
                                          -1
                                        )),
                                      h(
                                        t(
                                          'select',
                                          {
                                            'onUpdate:modelValue':
                                              e[13] || (e[13] = (r) => (b.value.lembaga = r)),
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer'
                                          },
                                          [
                                            e[72] ||
                                              (e[72] = t(
                                                'option',
                                                { value: '' },
                                                '-- Pilih Lembaga --',
                                                -1
                                              )),
                                            (i(!0),
                                            n(
                                              y,
                                              null,
                                              w(
                                                _e.value,
                                                (r) => (
                                                  i(),
                                                  n('option', { key: r, value: r }, d(r), 9, Vl)
                                                )
                                              ),
                                              128
                                            ))
                                          ],
                                          512
                                        ),
                                        [[E, b.value.lembaga]]
                                      )
                                    ]),
                                    t('div', null, [
                                      e[75] ||
                                        (e[75] = t(
                                          'label',
                                          {
                                            class:
                                              'block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide'
                                          },
                                          ' Kelas/Jilid Baru ',
                                          -1
                                        )),
                                      h(
                                        t(
                                          'select',
                                          {
                                            'onUpdate:modelValue':
                                              e[14] || (e[14] = (r) => (b.value.kelas = r)),
                                            class:
                                              'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white cursor-pointer'
                                          },
                                          [
                                            e[74] ||
                                              (e[74] = t(
                                                'option',
                                                { value: '' },
                                                '-- Pilih --',
                                                -1
                                              )),
                                            (i(!0),
                                            n(
                                              y,
                                              null,
                                              w(
                                                rt.value,
                                                (r) => (
                                                  i(),
                                                  n('option', { key: r, value: r }, d(r), 9, zl)
                                                )
                                              ),
                                              128
                                            ))
                                          ],
                                          512
                                        ),
                                        [[E, b.value.kelas]]
                                      )
                                    ])
                                  ]),
                                  t('div', null, [
                                    e[77] ||
                                      (e[77] = t(
                                        'label',
                                        {
                                          class:
                                            'block text-xs font-black text-blue-800 dark:text-blue-300 mb-1 uppercase tracking-wide'
                                        },
                                        ' Guru Kelas Baru (Perbarui Jika Pindah Kelas) ',
                                        -1
                                      )),
                                    h(
                                      t(
                                        'select',
                                        {
                                          'onUpdate:modelValue':
                                            e[15] || (e[15] = (r) => (b.value.guru = r)),
                                          class:
                                            'w-full px-3 py-2 text-sm border border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 cursor-pointer'
                                        },
                                        [
                                          e[76] ||
                                            (e[76] = t(
                                              'option',
                                              { value: '' },
                                              '-- Pilih Guru --',
                                              -1
                                            )),
                                          (i(!0),
                                          n(
                                            y,
                                            null,
                                            w(
                                              it.value,
                                              (r) => (
                                                i(),
                                                n('option', { key: r, value: r }, d(r), 9, Hl)
                                              )
                                            ),
                                            128
                                          ))
                                        ],
                                        512
                                      ),
                                      [[E, b.value.guru]]
                                    )
                                  ]),
                                  String(b.value.lembaga || '')
                                    .toLowerCase()
                                    .trim() === 'ptpt'
                                    ? (i(),
                                      n('div', Dl, [
                                        e[79] ||
                                          (e[79] = t(
                                            'label',
                                            {
                                              class:
                                                'block text-xs font-black text-rose-600 mb-1 uppercase tracking-wide'
                                            },
                                            ' Naik Juz Berapa? (PTPT) ',
                                            -1
                                          )),
                                        h(
                                          t(
                                            'select',
                                            {
                                              'onUpdate:modelValue':
                                                e[16] || (e[16] = (r) => (b.value.juz = r)),
                                              class:
                                                'w-full px-3 py-2 text-sm border border-rose-300 dark:border-rose-700 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100 cursor-pointer'
                                            },
                                            [
                                              e[78] ||
                                                (e[78] = t(
                                                  'option',
                                                  { value: '' },
                                                  '-- Pilih Juz --',
                                                  -1
                                                )),
                                              (i(),
                                              n(
                                                y,
                                                null,
                                                w(30, (r) =>
                                                  t(
                                                    'option',
                                                    { key: r, value: r },
                                                    'JUZ ' + d(r),
                                                    9,
                                                    El
                                                  )
                                                ),
                                                64
                                              ))
                                            ],
                                            512
                                          ),
                                          [[E, b.value.juz]]
                                        )
                                      ]))
                                    : v('', !0),
                                  String(b.value.lembaga || '')
                                    .toLowerCase()
                                    .trim() === 'pra ptpt'
                                    ? (i(),
                                      n('div', Ql, [
                                        e[81] ||
                                          (e[81] = t(
                                            'label',
                                            {
                                              class:
                                                'block text-xs font-black text-purple-600 mb-1 uppercase tracking-wide'
                                            },
                                            ' Khotam Ke? (Pra PTPT) ',
                                            -1
                                          )),
                                        h(
                                          t(
                                            'select',
                                            {
                                              'onUpdate:modelValue':
                                                e[17] || (e[17] = (r) => (b.value.khotam_ke = r)),
                                              class:
                                                'w-full px-3 py-2 text-sm border border-purple-300 dark:border-purple-700 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100 cursor-pointer'
                                            },
                                            [
                                              e[80] ||
                                                (e[80] = t(
                                                  'option',
                                                  { value: '' },
                                                  '-- Pilih Khotam --',
                                                  -1
                                                )),
                                              (i(!0),
                                              n(
                                                y,
                                                null,
                                                w(
                                                  st.value,
                                                  (r) => (
                                                    i(),
                                                    n(
                                                      'option',
                                                      { key: r, value: r },
                                                      'Khotam ' + d(r),
                                                      9,
                                                      Rl
                                                    )
                                                  )
                                                ),
                                                128
                                              ))
                                            ],
                                            512
                                          ),
                                          [[E, b.value.khotam_ke]]
                                        )
                                      ]))
                                    : v('', !0),
                                  t('div', null, [
                                    e[82] ||
                                      (e[82] = t(
                                        'label',
                                        {
                                          class:
                                            'block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 uppercase tracking-wide'
                                        },
                                        [
                                          t('i', {
                                            class: 'fas fa-comment-dots mr-1 text-blue-500'
                                          }),
                                          c('Catatan / Rekomendasi (Opsional) ')
                                        ],
                                        -1
                                      )),
                                    h(
                                      t(
                                        'textarea',
                                        {
                                          'onUpdate:modelValue':
                                            e[18] || (e[18] = (r) => (b.value.catatan = r)),
                                          rows: '3',
                                          placeholder:
                                            'Tulis catatan atau rekomendasi guru saat kenaikan ini...',
                                          class:
                                            'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none'
                                        },
                                        null,
                                        512
                                      ),
                                      [[J, b.value.catatan]]
                                    )
                                  ])
                                ]),
                                t('footer', Bl, [
                                  t(
                                    'button',
                                    {
                                      type: 'button',
                                      onClick: e[19] || (e[19] = (r) => (X.value = !1)),
                                      class:
                                        'text-xs font-bold px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 cursor-pointer'
                                    },
                                    ' Batal '
                                  ),
                                  t(
                                    'button',
                                    {
                                      type: 'button',
                                      onClick: nt,
                                      disabled: ae.value,
                                      class:
                                        'text-xs font-black px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5'
                                    },
                                    [
                                      ae.value ? (i(), n('i', $l)) : (i(), n('i', Fl)),
                                      c(' ' + d(ae.value ? 'Menyimpan…' : 'Simpan Kenaikan'), 1)
                                    ],
                                    8,
                                    Ml
                                  )
                                ])
                              ])
                            ]
                          ))
                        : v('', !0)
                    ]
                  }),
                  _: 1
                }
              )
            ]))
          ])
        )
      )
    }
  },
  ts = ht(Gl, [['__scopeId', 'data-v-d780ff60']])
export { ts as default }
