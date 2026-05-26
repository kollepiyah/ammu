import {
  L as r,
  h as i,
  V as ee,
  g as V,
  a4 as v,
  j as m,
  e as a,
  E as ae,
  ae as $e,
  I as Fe,
  an as Re,
  ao as He,
  Q as C,
  k as u,
  aq as k,
  F as K,
  U as T,
  ar as o,
  al as U,
  ac as Qe,
  ad as ze,
  a7 as j,
  f as re,
  ak as x,
  at as Oe,
  ag as N,
  ai as ce,
  aj as Y,
  as as ve,
  d as ie
} from './index-DlQzz-jb.js'
import { u as Je } from './useToast-DlBPYiJY.js'
import { u as Ee } from './useConfirm-DiDVgre1.js'
import { u as qe } from './useLembaga--Gos7VCc.js'
import { uploadBase64 as Ge } from './storage-CIeP5A2b.js'
import { c as te } from './createLucideIcon-B5kfwNOK.js'
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const We = te('ArrowLeftIcon', [
  ['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
  ['path', { d: 'M19 12H5', key: 'x3x0zl' }]
])
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ne = te('ImageIcon', [
  ['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2', ry: '2', key: '1m3agn' }],
  ['circle', { cx: '9', cy: '9', r: '2', key: 'af1f0g' }],
  ['path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21', key: '1xmnt7' }]
])
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xe = te('PlusIcon', [
  ['path', { d: 'M5 12h14', key: '1ays0h' }],
  ['path', { d: 'M12 5v14', key: 's699le' }]
])
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z = te('Trash2Icon', [
    ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
    ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
    ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
    ['line', { x1: '10', x2: '10', y1: '11', y2: '17', key: '1uufr5' }],
    ['line', { x1: '14', x2: '14', y1: '11', y2: '17', key: 'xtxkd' }]
  ]),
  Ye = {
    class:
      'rounded-xl bg-[#F0FFFF] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-4'
  },
  Ze = { key: 0, class: 'mb-3' },
  ea = { key: 0, class: 'text-base font-bold text-slate-900 dark:text-slate-100' },
  aa = { key: 1, class: 'text-sm text-slate-600 dark:text-slate-400' },
  ta = { key: 1, class: 'mt-4 pt-3 border-t border-slate-200 dark:border-slate-700' },
  A = {
    __name: 'UiCard',
    props: { title: { type: String, default: '' }, subtitle: { type: String, default: '' } },
    setup(f) {
      return (I, _) => (
        r(),
        i('div', Ye, [
          f.title || f.subtitle || I.$slots.header
            ? (r(),
              i('div', Ze, [
                ee(I.$slots, 'header', {}, () => [
                  f.title ? (r(), i('h2', ea, v(f.title), 1)) : V('', !0),
                  f.subtitle ? (r(), i('p', aa, v(f.subtitle), 1)) : V('', !0)
                ])
              ]))
            : V('', !0),
          ee(I.$slots, 'default'),
          I.$slots.footer ? (r(), i('div', ta, [ee(I.$slots, 'footer')])) : V('', !0)
        ])
      )
    }
  },
  la = { class: 'block' },
  sa = { key: 0, class: 'block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300' },
  oa = { key: 0, class: 'text-rose-500' },
  ra = ['value', 'type', 'placeholder', 'disabled'],
  ia = { key: 1, class: 'mt-1 text-xs text-rose-600' },
  na = { key: 2, class: 'mt-1 text-xs text-slate-500' },
  c = {
    __name: 'UiInput',
    props: {
      modelValue: { type: [String, Number], default: '' },
      type: { type: String, default: 'text' },
      label: { type: String, default: '' },
      placeholder: { type: String, default: '' },
      hint: { type: String, default: '' },
      error: { type: String, default: '' },
      required: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 }
    },
    emits: ['update:modelValue'],
    setup(f) {
      return (I, _) => (
        r(),
        i('label', la, [
          f.label
            ? (r(),
              i('span', sa, [m(v(f.label), 1), f.required ? (r(), i('span', oa, '*')) : V('', !0)]))
            : V('', !0),
          a(
            'input',
            {
              value: f.modelValue,
              type: f.type,
              placeholder: f.placeholder,
              disabled: f.disabled,
              class: ae([
                'w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500',
                f.error ? 'border-rose-500' : 'border-slate-300 dark:border-slate-600'
              ]),
              onInput: _[0] || (_[0] = (B) => I.$emit('update:modelValue', B.target.value))
            },
            null,
            42,
            ra
          ),
          f.error
            ? (r(), i('p', ia, v(f.error), 1))
            : f.hint
              ? (r(), i('p', na, v(f.hint), 1))
              : V('', !0)
        ])
      )
    }
  },
  da = ['type', 'disabled'],
  ua = {
    key: 0,
    class:
      'inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin'
  },
  O = {
    __name: 'UiButton',
    props: {
      variant: { type: String, default: 'primary' },
      size: { type: String, default: 'md' },
      loading: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      type: { type: String, default: 'button' }
    },
    setup(f) {
      const I = {
          primary: 'bg-teal-600 hover:bg-teal-700 text-white',
          secondary:
            'bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200',
          danger: 'bg-rose-600 hover:bg-rose-700 text-white',
          ghost:
            'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
        },
        _ = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' }
      return (B, P) => (
        r(),
        i(
          'button',
          {
            type: f.type,
            disabled: f.disabled || f.loading,
            class: ae([
              'rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2',
              [I[f.variant], _[f.size]]
            ])
          },
          [f.loading ? (r(), i('span', ua)) : V('', !0), ee(B.$slots, 'default')],
          10,
          da
        )
      )
    }
  },
  pa = { class: 'p-4 max-w-5xl mx-auto pb-32' },
  ma = { class: 'mb-4 flex items-center justify-between gap-3' },
  ba = { class: 'flex items-center gap-2' },
  xa = { class: 'text-xs text-slate-500' },
  ga = {
    key: 0,
    class: 'ml-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold'
  },
  fa = { class: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4' },
  ca = ['onClick'],
  va = { class: 'text-[11px] md:text-xs font-black leading-tight drop-shadow-sm' },
  ka = { class: 'grid md:grid-cols-2 gap-3' },
  ha = { class: 'grid gap-3' },
  ya = { class: 'mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-center' },
  wa = { class: 'text-xs uppercase tracking-widest font-black text-slate-700' },
  Sa = { class: 'text-lg font-black text-slate-800' },
  Va = { key: 0, class: 'text-xs text-slate-600' },
  Pa = { key: 1, class: 'text-xs text-slate-600' },
  Ka = { class: 'grid md:grid-cols-2 gap-4' },
  Ta = { class: 'border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50' },
  Ua = { class: 'flex items-center gap-3 mb-2' },
  Aa = ['src'],
  La = ['disabled'],
  Ia = { class: 'border-2 border-dashed border-amber-300 p-4 rounded-2xl bg-amber-50' },
  Ca = { class: 'flex items-center gap-3 mb-2' },
  Ma = ['src'],
  Da = ['disabled'],
  ja = { class: 'border-2 border-dashed border-emerald-300 p-4 rounded-2xl bg-emerald-50' },
  Ba = { class: 'flex items-center gap-3 mb-2' },
  Na = ['src'],
  _a = ['disabled'],
  $a = { class: 'border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-slate-50' },
  Fa = { class: 'flex items-center gap-3 mb-2' },
  Ra = {
    class: 'w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden'
  },
  Ha = ['src'],
  Qa = ['disabled'],
  za = { class: 'border-2 border-dashed border-teal-300 p-4 rounded-2xl bg-teal-50' },
  Oa = { class: 'flex items-center gap-3 mb-2' },
  Ja = {
    class: 'w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden'
  },
  Ea = ['src'],
  qa = ['disabled'],
  Ga = { class: 'border-2 border-dashed border-purple-300 p-4 rounded-2xl bg-purple-50' },
  Wa = { class: 'flex items-center gap-3 mb-2' },
  Xa = {
    class: 'w-16 h-16 rounded bg-white border flex items-center justify-center overflow-hidden'
  },
  Ya = ['src'],
  Za = ['disabled'],
  et = { class: 'flex items-center gap-4' },
  at = {
    class: 'bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg text-center min-w-[80px]'
  },
  tt = { class: 'text-xl font-black text-teal-800' },
  lt = { class: 'mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg' },
  st = { class: 'text-lg font-black text-emerald-800' },
  ot = { class: 'mb-3 flex justify-between items-center' },
  rt = { class: 'text-xs text-slate-500' },
  it = {
    key: 0,
    class:
      'text-center text-xs text-slate-400 italic py-6 border-2 border-dashed border-slate-200 rounded-lg'
  },
  nt = { key: 1, class: 'space-y-2' },
  dt = { class: 'grid md:grid-cols-6 gap-2' },
  ut = ['onUpdate:modelValue'],
  pt = ['onUpdate:modelValue'],
  mt = ['onUpdate:modelValue'],
  bt = { class: 'flex items-end' },
  xt = ['onClick'],
  gt = { class: 'grid md:grid-cols-2 gap-3' },
  ft = ['value'],
  ct = { class: 'grid md:grid-cols-3 gap-2' },
  vt = { class: 'flex items-end' },
  kt = { class: 'grid md:grid-cols-3 gap-4' },
  ht = { class: 'flex items-center gap-2' },
  yt = { class: 'flex items-center gap-2' },
  wt = { class: 'flex items-center gap-2' },
  St = {
    key: 0,
    class:
      'text-xs text-slate-400 italic text-center py-6 border-2 border-dashed border-slate-200 rounded'
  },
  Vt = { key: 1, class: 'space-y-3' },
  Pt = {
    class: 'cursor-pointer p-3 font-black text-sm text-slate-700 flex justify-between items-center'
  },
  Kt = { class: 'p-3 border-t border-slate-200 grid gap-2' },
  Tt = { class: 'flex items-center gap-3' },
  Ut = ['src'],
  At = ['onChange'],
  Lt = ['value', 'onInput'],
  It = {
    key: 0,
    class:
      'text-xs text-slate-400 italic text-center py-6 border-2 border-dashed border-slate-200 rounded'
  },
  Ct = { key: 1, class: 'space-y-3' },
  Mt = {
    class:
      'cursor-pointer p-3 font-black text-sm text-emerald-800 flex justify-between items-center'
  },
  Dt = { class: 'p-3 border-t border-emerald-200 grid gap-2' },
  jt = ['value', 'onChange'],
  Bt = { class: 'grid md:grid-cols-2 gap-2' },
  Nt = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  _t = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  $t = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  Ft = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  Rt = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  Ht = { class: 'flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-50 rounded' },
  Qt = { class: 'p-3 bg-purple-50 border border-purple-200 rounded-lg mt-3' },
  zt = { class: 'flex gap-3 flex-wrap' },
  Ot = { class: 'flex items-center gap-2 cursor-pointer text-sm' },
  Jt = { class: 'flex items-center gap-2 cursor-pointer text-sm' },
  Et = { class: 'grid md:grid-cols-3 gap-4' },
  qt = { class: 'p-3 bg-amber-50 border border-amber-200 rounded-xl' },
  Gt = { class: 'grid grid-cols-3 gap-2' },
  Wt = { class: 'p-3 bg-indigo-50 border border-indigo-200 rounded-xl' },
  Xt = { class: 'grid grid-cols-3 gap-2' },
  Yt = { class: 'p-3 bg-teal-50 border border-teal-200 rounded-xl' },
  Zt = { class: 'grid grid-cols-3 gap-2' },
  el = { class: 'grid md:grid-cols-2 gap-3' },
  al = { class: 'md:col-span-2' },
  tl = {
    class:
      'md:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer border border-slate-200'
  },
  ll = { class: 'space-y-2 mb-3' },
  sl = ['onUpdate:modelValue'],
  ol = ['onClick'],
  rl = { key: 0, class: 'text-xs text-slate-400 italic text-center py-2' },
  il = { class: 'flex gap-2' },
  nl = { class: 'mt-5 border-t border-violet-200 pt-4' },
  dl = { class: 'space-y-3' },
  ul = { class: 'flex items-center justify-between mb-2' },
  pl = { class: 'text-xs font-black text-violet-800 uppercase' },
  ml = ['onClick'],
  bl = { class: 'flex flex-wrap gap-1.5' },
  xl = ['onUpdate:modelValue'],
  gl = ['onClick'],
  fl = ['onClick'],
  cl = { class: 'flex gap-2 mt-3' },
  vl = { class: 'space-y-3' },
  kl = {
    class:
      'flex items-start gap-3 p-3 bg-fuchsia-50 border border-fuchsia-200 rounded-lg cursor-pointer'
  },
  hl = {
    class:
      'flex items-start gap-3 p-3 bg-fuchsia-50 border border-fuchsia-200 rounded-lg cursor-pointer'
  },
  yl = { class: 'grid grid-cols-2 gap-3' },
  wl = { class: 'space-y-3' },
  Sl = ['value'],
  Vl = { key: 0, class: 'bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3' },
  Pl = { class: 'text-xs font-black text-purple-900 uppercase' },
  Kl = ['value'],
  Tl = { key: 0, class: 'space-y-2' },
  Ul = { class: 'flex flex-wrap gap-2' },
  Al = ['onClick'],
  Ll = { class: 'flex gap-2' },
  Il = { class: 'space-y-2' },
  Cl = { class: 'grid grid-cols-3 gap-2 mb-2' },
  Ml = ['onUpdate:modelValue'],
  Dl = ['onUpdate:modelValue'],
  jl = ['onClick'],
  Bl = { class: 'space-y-1' },
  Nl = ['onUpdate:modelValue'],
  _l = ['onUpdate:modelValue'],
  $l = ['onClick'],
  Fl = ['onClick'],
  Rl = { key: 1, class: 'space-y-2' },
  Hl = { class: 'flex items-center justify-between mb-1' },
  Ql = ['onUpdate:modelValue'],
  zl = ['onClick'],
  Ol = { class: 'grid grid-cols-1 md:grid-cols-3 gap-1 mt-1' },
  Jl = ['onUpdate:modelValue'],
  El = ['onUpdate:modelValue'],
  ql = ['onClick'],
  Gl = ['onClick'],
  Wl = { key: 2, class: 'space-y-2' },
  Xl = { class: 'flex items-center justify-between gap-2' },
  Yl = ['onUpdate:modelValue'],
  Zl = ['onClick'],
  es = { class: 'space-y-1' },
  as = { class: 'flex flex-wrap gap-1' },
  ts = ['onUpdate:modelValue'],
  ls = ['onClick'],
  ss = ['onClick'],
  os = { class: 'space-y-1' },
  rs = ['onUpdate:modelValue'],
  is = ['onUpdate:modelValue'],
  ns = ['onClick'],
  ds = ['onClick'],
  us = {
    class:
      'fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 flex gap-2 z-20'
  },
  cs = {
    __name: 'PengaturanView',
    setup(f) {
      const I = ze(),
        _ = Qe(),
        B = $e(),
        P = Je(),
        le = Ee(),
        { lembagaRaw: se } = qe()
      function J() {
        return {
          txtAppName: '',
          txtAppDesc: '',
          txtSidebarTitle: '',
          txtHeaderBar: 'Ammu Online',
          txtPeriode: '',
          txtWelcome: 'Ahlan',
          alamat: '',
          noTelp: '',
          namaChannel: 'Al Manshur Channel',
          kopLine1: '',
          kopLine2: '',
          kopLine3: '',
          kopLine4: '',
          logoUrl: '',
          logoKop: '',
          logoQiraati: '',
          bgImage: '',
          bgRaporTPQ: '',
          bgRaporDiniyah: '',
          namaPengasuh: '',
          rekapSchemaDiniyah: ['Aqidah Akhlak', 'Fiqh', 'Tarikh', 'Bahasa Arab'],
          rekapSchemaDiniyahPerKelas: {},
          postinganHanyaAdmin: !1,
          postinganAutoApprove: !0,
          postinganMaxImages: 5,
          postinganMaxSizeKb: 500,
          raporSchemas: {},
          predikatRules: [
            { min: 85, max: 100, label: 'A' },
            { min: 70, max: 84, label: 'B' },
            { min: 55, max: 69, label: 'C' },
            { min: 0, max: 54, label: 'D' }
          ],
          themeColor: '#0f766e',
          themeTextColor: '#1e293b',
          sidebarBgColor: '#0f172a',
          kalibrasiHijri: 0,
          masterKegiatan: [],
          adminUsername: 'adminmu',
          adminPassword: '1234',
          fiturBeranda: !0,
          fiturKalender: !0,
          fiturKritikSaran: !0,
          fiturNotifikasi: !0,
          autoNotifPostingan: !0,
          softDelete: !1,
          capacitorMode: 'remote',
          submenuFormal: {},
          submenuQiraati: {},
          shiftPagiMulai: '06:00',
          shiftPagiSelesai: '12:00',
          shiftPagiTerlambat: '06:15',
          shiftSoreMulai: '14:00',
          shiftSoreSelesai: '17:00',
          shiftSoreTerlambat: '14:15',
          shiftSekolahMulai: '07:00',
          shiftSekolahSelesai: '13:00',
          shiftSekolahTerlambat: '07:15',
          printerNama: '',
          printerKertas: 'A4',
          printerOrientasi: 'portrait',
          printerMarginMM: 10,
          printerAutoPrint: !1
        }
      }
      const l = C(J()),
        M = C(!1),
        $ = C(''),
        E = C(''),
        q = C(!1),
        w = C('identitas'),
        ke = [
          {
            id: 'identitas',
            label: 'Identitas',
            icon: 'fa-id-card',
            gradient: 'from-teal-500 to-teal-700'
          },
          {
            id: 'kop',
            label: 'KOP Surat',
            icon: 'fa-file-alt',
            gradient: 'from-blue-500 to-blue-700'
          },
          {
            id: 'logo',
            label: 'Logo & BG',
            icon: 'fa-image',
            gradient: 'from-cyan-500 to-cyan-700'
          },
          {
            id: 'hijri',
            label: 'Kalibrasi Hijri',
            icon: 'fa-moon',
            gradient: 'from-indigo-500 to-indigo-700'
          },
          {
            id: 'kegiatan',
            label: 'Master Kegiatan',
            icon: 'fa-tasks',
            gradient: 'from-emerald-500 to-emerald-700'
          },
          {
            id: 'admin',
            label: 'Admin Password',
            icon: 'fa-lock',
            gradient: 'from-rose-500 to-rose-700'
          },
          {
            id: 'theme',
            label: 'Tema Warna',
            icon: 'fa-palette',
            gradient: 'from-pink-500 to-fuchsia-700'
          },
          {
            id: 'formal',
            label: 'Submenu Formal',
            icon: 'fa-school',
            gradient: 'from-amber-500 to-amber-700'
          },
          {
            id: 'qiraati',
            label: 'Submenu Qiraati',
            icon: 'fa-star',
            gradient: 'from-orange-500 to-orange-700'
          },
          {
            id: 'fitur',
            label: 'Fitur & Mode',
            icon: 'fa-toggle-on',
            gradient: 'from-purple-500 to-purple-700'
          },
          {
            id: 'shift',
            label: 'Jam Shift',
            icon: 'fa-clock',
            gradient: 'from-yellow-500 to-yellow-700'
          },
          {
            id: 'printer',
            label: 'Printer',
            icon: 'fa-print',
            gradient: 'from-slate-500 to-slate-700'
          },
          {
            id: 'postingan',
            label: 'Pengaturan Postingan',
            icon: 'fa-bullhorn',
            gradient: 'from-fuchsia-500 to-fuchsia-700'
          }
        ]
      function oe() {
        const s = B.settings || {}
        ;((l.value = {
          ...J(),
          ...Object.fromEntries(Object.keys(J()).map((e) => [e, s[e] ?? J()[e]]))
        }),
          Array.isArray(l.value.masterKegiatan) || (l.value.masterKegiatan = []),
          (!l.value.submenuFormal || typeof l.value.submenuFormal != 'object') &&
            (l.value.submenuFormal = {}),
          (!l.value.submenuQiraati || typeof l.value.submenuQiraati != 'object') &&
            (l.value.submenuQiraati = {}),
          (M.value = !1))
      }
      ;(Fe(async () => {
        ;(await B.load(), B.subscribe(), oe())
        const s = _.query.section
        s && typeof s == 'string' && (w.value = s)
        const e = _.query.lembaga
        e && typeof e == 'string' && (h.value = e)
      }),
        Re(
          () => B.settings,
          () => {
            M.value || oe()
          },
          { deep: !0 }
        ))
      let de = !0
      He(() => {
        if ((JSON.stringify(l.value), de)) {
          de = !1
          return
        }
        M.value = !0
      })
      const he = [
        'Muharram',
        'Shafar',
        'Rabiul Awal',
        'Rabiul Akhir',
        'Jumadil Awal',
        'Jumadil Akhir',
        'Rajab',
        "Sya'ban",
        'Ramadhan',
        'Syawal',
        'Dzulqaidah',
        'Dzulhijjah'
      ]
      function ye(s, e = 0) {
        const t = new Date(s.getTime() + e * 864e5),
          d = Math.floor(t.getTime() / 864e5) + 2440588 - 1948440 + 10632,
          b = Math.floor((d - 1) / 10631),
          p = d - 10631 * b + 354,
          n =
            Math.floor((10985 - p) / 5316) * Math.floor((50 * p) / 17719) +
            Math.floor(p / 5670) * Math.floor((43 * p) / 15238),
          S =
            p -
            Math.floor((30 - n) / 15) * Math.floor((17719 * n) / 50) -
            Math.floor(n / 16) * Math.floor((15238 * n) / 43) +
            29,
          g = Math.floor((24 * S) / 709),
          L = S - Math.floor((709 * g) / 24),
          y = 30 * b + n - 30
        return { day: L, month: g, year: y }
      }
      const we = ie(() => {
        try {
          const s = ye(new Date(), Number(l.value.kalibrasiHijri || 0))
          return `${s.day} ${he[s.month - 1] || '?'} ${s.year} H`
        } catch {
          return '—'
        }
      })
      function Se() {
        l.value.masterKegiatan.push({
          id: 'keg_' + Date.now(),
          nama: '',
          jam_mulai: '06:00',
          jam_terlambat: '06:15',
          range_start: '04:00',
          range_end: '08:00',
          skor: 10,
          hari: [0, 1, 2, 3, 4, 5, 6]
        })
      }
      async function Ve(s) {
        var t
        ;(await le({
          title: 'Hapus kegiatan?',
          message: `Hapus "${((t = l.value.masterKegiatan[s]) == null ? void 0 : t.nama) || 'item'}" dari master?`,
          danger: !0
        })) && l.value.masterKegiatan.splice(s, 1)
      }
      function R(s) {
        return String(
          (s == null ? void 0 : s.lembaga) || (s == null ? void 0 : s.nama) || ''
        ).trim()
      }
      function ue(s) {
        return String((s == null ? void 0 : s.tipe) || (s == null ? void 0 : s.tipe_lembaga) || '')
          .toLowerCase()
          .trim()
      }
      const pe = ['tpq', 'tpq pagi', 'tpq sore', 'pra ptpt', 'ptpt', 'ppph', 'p3h'],
        Pe = [
          'non-lembaga',
          'non_lembaga',
          'non lembaga',
          'yayasan',
          'pondok',
          'kantor',
          'admin',
          'divisi',
          'unit'
        ],
        Ke =
          /^(yayasan|pondok pesantren|pondok|kantor|admin|sarana|sarana\s*&\s*prasarana|prasarana)/i,
        me = ie(() =>
          se.value
            .filter((s) => {
              const e = R(s),
                t = ue(s)
              return Pe.includes(t) || Ke.test(e)
                ? !1
                : !!(
                    [
                      'formal',
                      'sekolah',
                      'diniyah',
                      'sd',
                      'smp',
                      'sma',
                      'mi',
                      'mts',
                      'ma',
                      'pkbm'
                    ].includes(t) ||
                    /formal|MI|MTs|MA|SD|SMP|SMA|PKBM/i.test(e) ||
                    (!t && !pe.includes(e.toLowerCase()))
                  )
            })
            .map((s) => ({ id: s.id || R(s), nama: R(s) }))
        ),
        be = ie(() =>
          se.value
            .filter((s) => {
              const e = R(s).toLowerCase(),
                t = ue(s)
              return t === 'qiraati' || t === 'tahfizh' || pe.includes(e)
            })
            .map((s) => ({ id: s.id || R(s), nama: R(s) }))
        )
      function H(s) {
        return (
          l.value.submenuFormal[s] ||
            (l.value.submenuFormal[s] = {
              kopLine1: '',
              kopLine2: '',
              kopLine3: '',
              kopLine4: '',
              logoSekolah: '',
              tarifSPP: 0
            }),
          l.value.submenuFormal[s]
        )
      }
      function xe(s) {
        return (
          l.value.submenuQiraati[s] ||
            (l.value.submenuQiraati[s] = { targetKelas: '', formatRekap: 'standard' }),
          l.value.submenuQiraati[s]
        )
      }
      const D = C('')
      async function F(s, e, t = 'app_logos') {
        var b
        const d = (b = s.target.files) == null ? void 0 : b[0]
        if (d) {
          if (d.size > 5 * 1024 * 1024) {
            P.error('File terlalu besar (maks 5MB)')
            return
          }
          D.value = e
          try {
            const p = new FileReader()
            ;((p.onload = async () => {
              try {
                const n = await Ge(`${t}/${Date.now()}_${d.name}`, p.result, d.type)
                ;(Te(l.value, e, n), P.success('Upload berhasil'), (M.value = !0))
              } catch (n) {
                P.error('Upload gagal: ' + (n.message || n))
              } finally {
                D.value = ''
              }
            }),
              (p.onerror = () => {
                ;(P.error('Gagal baca file'), (D.value = ''))
              }),
              p.readAsDataURL(d))
          } catch (p) {
            ;(P.error('Error: ' + (p.message || p)), (D.value = ''))
          }
          s.target.value = ''
        }
      }
      function Te(s, e, t) {
        const d = e.split('.')
        let b = s
        for (let p = 0; p < d.length - 1; p++) (b[d[p]] || (b[d[p]] = {}), (b = b[d[p]]))
        b[d[d.length - 1]] = t
      }
      async function Ue() {
        if (!$.value || $.value.length < 4) {
          P.error('Password minimal 4 karakter')
          return
        }
        if ($.value !== E.value) {
          P.error('Konfirmasi password tidak cocok')
          return
        }
        ;(await le({
          title: 'Ganti password admin?',
          message: 'Password admin built-in akan diganti permanen.',
          danger: !0
        })) &&
          ((l.value.adminPassword = $.value),
          ($.value = ''),
          (E.value = ''),
          P.info('Password siap disimpan — klik Simpan untuk apply'),
          (M.value = !0))
      }
      async function Ae() {
        ;(M.value &&
          !(await le({
            title: 'Tinggalkan halaman?',
            message: 'Ada perubahan yang belum disimpan. Yakin keluar?',
            confirmText: 'Keluar',
            danger: !0
          }))) ||
          I.push('/dashboard')
      }
      const h = C(''),
        G = C('')
      function W() {
        const s = h.value
        if (!s) return 'sections'
        const e = l.value.raporSchemas[s]
        return !e || Object.keys(e).length === 0
          ? 'sections'
          : e.perLevel
            ? 'perLevel'
            : e.perKelas
              ? 'perKelas'
              : Array.isArray(e.sections)
                ? 'sections'
                : 'kosong'
      }
      function Le(s) {
        const e = h.value
        e &&
          (l.value.raporSchemas[e] || (l.value.raporSchemas[e] = {}),
          s === 'perLevel'
            ? (l.value.raporSchemas[e] = {
                perLevel: !0,
                fieldsNilai: [
                  { id: 'fashohah', label: 'Fashohah' },
                  { id: 'tartil', label: 'Tartil' },
                  { id: 'adab', label: 'Adab' }
                ],
                levels: [
                  {
                    id: 'lvl_1',
                    label: 'Level 1',
                    levelBaca: '½ Juz',
                    targetKhotam: '½ Juz',
                    khotamList: [
                      { id: 'khotam_I', labelKhotam: 'Khotam I', multiplier: 2 },
                      { id: 'khotam_II', labelKhotam: 'Khotam II', multiplier: 2 },
                      { id: 'khotam_III', labelKhotam: 'Khotam III', multiplier: 2 }
                    ]
                  }
                ]
              })
            : s === 'perKelas'
              ? (l.value.raporSchemas[e] = {
                  perKelas: !0,
                  jenjang: [
                    {
                      kelas: 'I',
                      mapel: [
                        { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
                        { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
                        { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
                      ]
                    }
                  ]
                })
              : s === 'sections'
                ? (l.value.raporSchemas[e] = {
                    sections: [
                      {
                        id: 'jilid',
                        title: 'Jilid',
                        rows: ['1A', '1B', '2A', '2B'],
                        fields: [
                          { id: 'adab', label: 'Adab', type: 'number' },
                          {
                            id: 'predikat',
                            label: 'Predikat',
                            type: 'auto_predikat',
                            source: 'adab'
                          }
                        ]
                      }
                    ]
                  })
                : (l.value.raporSchemas[e] = { sections: [] }))
      }
      function ge() {
        const s = h.value,
          e = G.value.trim()
        if (!s || !e) return
        const t = l.value.raporSchemas[s]
        if (!t || !t.perLevel) return
        Array.isArray(t.fieldsNilai) || (t.fieldsNilai = [])
        const d = e
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '')
        if (t.fieldsNilai.find((b) => b.id === d)) {
          P.warning('Field sudah ada')
          return
        }
        ;(t.fieldsNilai.push({ id: d, label: e }), (G.value = ''))
      }
      function Ie(s) {
        const e = l.value.raporSchemas[h.value]
        e != null && e.fieldsNilai && e.fieldsNilai.splice(s, 1)
      }
      function Ce(s) {
        Array.isArray(s.khotamList) || (s.khotamList = [])
        const e = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
          t = s.khotamList.length,
          d = t < e.length ? `Khotam ${e[t]}` : `Khotam ${t + 1}`,
          b = `kh_${e[t] || t + 1}`,
          p = (s.khotamList.length > 0 && s.khotamList[s.khotamList.length - 1].multiplier) || 2
        s.khotamList.push({ id: b, labelKhotam: d, multiplier: p })
      }
      function Me() {
        const s = h.value,
          e = l.value.raporSchemas[s]
        if (!e || !e.perLevel) return
        Array.isArray(e.levels) || (e.levels = [])
        const t = e.levels.length + 1
        e.levels.push({
          id: `lvl_${t}`,
          label: `Level ${t}`,
          levelBaca: `${t} Juz`,
          targetKhotam: `${t} Juz`,
          khotamList: [
            { id: `khotam_I_${t}`, labelKhotam: 'Khotam I', multiplier: 2 },
            { id: `khotam_II_${t}`, labelKhotam: 'Khotam II', multiplier: 2 },
            { id: `khotam_III_${t}`, labelKhotam: 'Khotam III', multiplier: 2 }
          ]
        })
      }
      function De() {
        const s = h.value,
          e = l.value.raporSchemas[s]
        !e ||
          !e.perKelas ||
          (Array.isArray(e.jenjang) || (e.jenjang = []),
          e.jenjang.push({
            kelas: 'Kelas Baru',
            mapel: [{ id: 'mapel_' + Date.now(), nama: '', kkm: 80 }]
          }))
      }
      const Q = C(''),
        X = C('')
      function fe() {
        const s = Q.value.trim()
        if (s) {
          if (l.value.rekapSchemaDiniyah.includes(s)) {
            ;(P.warning('Mata pelajaran sudah ada'), (Q.value = ''))
            return
          }
          ;(l.value.rekapSchemaDiniyah.push(s), (Q.value = ''))
        }
      }
      function je() {
        const s = X.value.trim()
        if (s) {
          if (
            (l.value.rekapSchemaDiniyahPerKelas || (l.value.rekapSchemaDiniyahPerKelas = {}),
            l.value.rekapSchemaDiniyahPerKelas[s])
          ) {
            P.warning(`Kelas ${s} sudah ada`)
            return
          }
          ;((l.value.rekapSchemaDiniyahPerKelas[s] = [...(l.value.rekapSchemaDiniyah || [])]),
            (X.value = ''),
            (M.value = !0))
        }
      }
      function Be() {
        const s = h.value
        if (!s) return
        const e = String(s || '')
          .toLowerCase()
          .trim()
        let t = {}
        ;(e === 'pra ptpt' || e === 'ptpt' || e === 'ppph' || e === 'p3h'
          ? (t = {
              perLevel: !0,
              fieldsNilai: [
                { id: 'fashohah', label: 'Fashohah' },
                { id: 'tartil', label: 'Tartil' },
                { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
                { id: 'ghorib', label: 'Ghorib' },
                { id: 'tajwid', label: 'Tajwid' },
                { id: 'doa_harian', label: 'Doa Harian' },
                { id: 'adab', label: 'Adab' }
              ],
              levels: [
                z('lvl_1', 'Level 1', '½ Juz', 3, 2),
                z('lvl_2', 'Level 2', '1 Juz', 3, 2),
                z('lvl_3', 'Level 3', '1½ Juz', 3, 2),
                z('lvl_4', 'Level 4', '2 Juz', 3, 3),
                z('lvl_5', 'Level 5', '3 Juz', 11, 3)
              ]
            })
          : e === 'tpq' || e.startsWith('tpq ')
            ? (t = {
                sections: [
                  {
                    id: 'jilid',
                    title: 'Jilid',
                    rows: ['Pra-TK', 'A', 'B', 'C', 'D', 'E', 'F', 'Tahsin', 'Tahfidz'],
                    fields: [
                      { id: 'tgl_naik', label: 'Tgl Naik', type: 'date' },
                      { id: 'fashohah', label: 'Fashohah', type: 'number' },
                      { id: 'tartil', label: 'Tartil', type: 'number' },
                      { id: 'adab', label: 'Adab', type: 'number' },
                      { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
                    ]
                  }
                ]
              })
            : (t = {
                perKelas: !0,
                jenjang: [
                  {
                    kelas: 'I',
                    mapel: [
                      { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
                      { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
                      { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 }
                    ]
                  },
                  {
                    kelas: 'II',
                    mapel: [
                      { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
                      { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
                      { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 },
                      { id: 'tarikh', nama: 'TARIKH', kkm: 80 }
                    ]
                  }
                ]
              }),
          (l.value.raporSchemas[s] = t),
          (M.value = !0),
          P.success(`Schema ${s} di-reset ke template default. Klik Simpan untuk apply.`))
      }
      function z(s, e, t, d, b) {
        const p = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'],
          n = []
        for (let S = 0; S < d; S++)
          n.push({
            id: `kh_${p[S] || S + 1}`,
            labelKhotam: `Khotam ${p[S] || S + 1}`,
            multiplier: b
          })
        return { id: s, label: e, levelBaca: t, targetKhotam: t, khotamList: n }
      }
      function Ne() {
        ;(oe(), P.info('Form di-reset dari state tersimpan'))
      }
      async function _e() {
        if (!q.value) {
          q.value = !0
          try {
            ;(await B.save({ ...l.value }), (M.value = !1), P.success('Pengaturan tersimpan'))
          } catch (s) {
            P.error('Gagal simpan: ' + ((s == null ? void 0 : s.message) || s))
          } finally {
            q.value = !1
          }
        }
      }
      return (s, e) => (
        r(),
        i('div', pa, [
          a('header', ma, [
            a('div', ba, [
              u(
                O,
                { variant: 'ghost', size: 'sm', onClick: Ae },
                { default: k(() => [u(j(We), { class: 'w-4 h-4' })]), _: 1 }
              ),
              a('div', null, [
                e[64] || (e[64] = a('h1', { class: 'text-xl font-bold' }, 'Pengaturan Web', -1)),
                a('p', xa, [
                  e[63] || (e[63] = m(' Setting global aplikasi (match legacy) ', -1)),
                  M.value ? (r(), i('span', ga, 'UNSAVED')) : V('', !0)
                ])
              ])
            ])
          ]),
          a('div', fa, [
            (r(),
            i(
              K,
              null,
              T(ke, (t) =>
                a(
                  'button',
                  {
                    key: t.id,
                    onClick: (d) => (w.value = t.id),
                    class: ae([
                      'group relative overflow-hidden bg-gradient-to-br rounded-xl p-2.5 md:p-3 text-left text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer flex items-center gap-2',
                      t.gradient,
                      w.value === t.id
                        ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-amber-50'
                        : ''
                    ])
                  },
                  [
                    a(
                      'i',
                      {
                        class: ae(['fas', t.icon, 'text-base md:text-lg drop-shadow flex-shrink-0'])
                      },
                      null,
                      2
                    ),
                    a('h3', va, v(t.label), 1)
                  ],
                  10,
                  ca
                )
              ),
              64
            ))
          ]),
          o(
            u(
              A,
              {
                title: 'Identitas Aplikasi',
                subtitle: 'Nama, deskripsi, header bar, periode',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', ka, [
                    u(
                      c,
                      {
                        modelValue: l.value.txtAppName,
                        'onUpdate:modelValue': e[0] || (e[0] = (t) => (l.value.txtAppName = t)),
                        label: 'Nama Aplikasi',
                        required: ''
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.txtAppDesc,
                        'onUpdate:modelValue': e[1] || (e[1] = (t) => (l.value.txtAppDesc = t)),
                        label: 'Deskripsi / Sub-Title'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.txtSidebarTitle,
                        'onUpdate:modelValue':
                          e[2] || (e[2] = (t) => (l.value.txtSidebarTitle = t)),
                        label: 'Nama Sidebar / Lembaga'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.txtHeaderBar,
                        'onUpdate:modelValue': e[3] || (e[3] = (t) => (l.value.txtHeaderBar = t)),
                        label: 'Teks Header Bar',
                        placeholder: 'Ammu Online'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.txtPeriode,
                        'onUpdate:modelValue': e[4] || (e[4] = (t) => (l.value.txtPeriode = t)),
                        label: 'Periode Aktif'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.txtWelcome,
                        'onUpdate:modelValue': e[5] || (e[5] = (t) => (l.value.txtWelcome = t)),
                        label: 'Sapaan Ahlan',
                        placeholder: 'Ahlan'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.alamat,
                        'onUpdate:modelValue': e[6] || (e[6] = (t) => (l.value.alamat = t)),
                        label: 'Alamat Pondok'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.noTelp,
                        'onUpdate:modelValue': e[7] || (e[7] = (t) => (l.value.noTelp = t)),
                        label: 'No. Telepon'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.namaChannel,
                        'onUpdate:modelValue': e[8] || (e[8] = (t) => (l.value.namaChannel = t)),
                        label: 'Nama Channel Pesan'
                      },
                      null,
                      8,
                      ['modelValue']
                    )
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'identitas']]
          ),
          o(
            u(
              A,
              {
                title: 'KOP Surat',
                subtitle: '4 baris header untuk PDF/Excel cetak',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', ha, [
                    u(
                      c,
                      {
                        modelValue: l.value.kopLine1,
                        'onUpdate:modelValue': e[9] || (e[9] = (t) => (l.value.kopLine1 = t)),
                        label: 'Baris 1 (KAPITAL, contoh: PONDOK PESANTREN...)'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.kopLine2,
                        'onUpdate:modelValue': e[10] || (e[10] = (t) => (l.value.kopLine2 = t)),
                        label: 'Baris 2 (BOLD BESAR, contoh: PORTAL PRESTASI QIRAATI)'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.kopLine3,
                        'onUpdate:modelValue': e[11] || (e[11] = (t) => (l.value.kopLine3 = t)),
                        label: 'Baris 3 (alamat / opsional)'
                      },
                      null,
                      8,
                      ['modelValue']
                    ),
                    u(
                      c,
                      {
                        modelValue: l.value.kopLine4,
                        'onUpdate:modelValue': e[12] || (e[12] = (t) => (l.value.kopLine4 = t)),
                        label: 'Baris 4 (telp / opsional)'
                      },
                      null,
                      8,
                      ['modelValue']
                    )
                  ]),
                  a('div', ya, [
                    a('p', wa, v(l.value.kopLine1 || '— Baris 1 —'), 1),
                    a('p', Sa, v(l.value.kopLine2 || '— Baris 2 —'), 1),
                    l.value.kopLine3 ? (r(), i('p', Va, v(l.value.kopLine3), 1)) : V('', !0),
                    l.value.kopLine4 ? (r(), i('p', Pa, v(l.value.kopLine4), 1)) : V('', !0)
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'kop']]
          ),
          o(
            u(
              A,
              {
                title: 'Logo & Background',
                subtitle: '4 jenis logo + background layar',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', Ka, [
                    a('div', Ta, [
                      e[65] ||
                        (e[65] = a(
                          'label',
                          { class: 'block text-xs font-black text-emerald-900 mb-2 uppercase' },
                          'Logo Aplikasi (utama)',
                          -1
                        )),
                      a('div', Ua, [
                        a(
                          'img',
                          {
                            src: l.value.logoUrl || '/logo.png',
                            class: 'w-16 h-16 rounded object-contain bg-white p-1 border'
                          },
                          null,
                          8,
                          Aa
                        ),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'logoUrl',
                            onChange: e[13] || (e[13] = (t) => F(t, 'logoUrl', 'app_logos')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          La
                        )
                      ]),
                      e[66] ||
                        (e[66] = a(
                          'p',
                          { class: 'text-[10px] text-emerald-700 italic' },
                          'Tampil di sidebar + login.',
                          -1
                        ))
                    ]),
                    a('div', Ia, [
                      e[67] ||
                        (e[67] = a(
                          'label',
                          { class: 'block text-xs font-black text-amber-900 mb-2 uppercase' },
                          'Logo KOP Surat',
                          -1
                        )),
                      a('div', Ca, [
                        a(
                          'img',
                          {
                            src: l.value.logoKop || l.value.logoUrl || '/logo.png',
                            class: 'w-16 h-16 rounded object-contain bg-white p-1 border'
                          },
                          null,
                          8,
                          Ma
                        ),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'logoKop',
                            onChange: e[14] || (e[14] = (t) => F(t, 'logoKop', 'app_logos')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          Da
                        )
                      ]),
                      e[68] ||
                        (e[68] = a(
                          'p',
                          { class: 'text-[10px] text-amber-700 italic' },
                          'Untuk header PDF/Excel cetak. Kosong = pakai Logo Aplikasi.',
                          -1
                        ))
                    ]),
                    a('div', ja, [
                      e[69] ||
                        (e[69] = a(
                          'label',
                          { class: 'block text-xs font-black text-emerald-900 mb-2 uppercase' },
                          'Logo Qiraati (bintang 8)',
                          -1
                        )),
                      a('div', Ba, [
                        a(
                          'img',
                          {
                            src: l.value.logoQiraati || '/logo.png',
                            class: 'w-16 h-16 rounded object-contain bg-white p-1 border'
                          },
                          null,
                          8,
                          Na
                        ),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'logoQiraati',
                            onChange: e[15] || (e[15] = (t) => F(t, 'logoQiraati', 'app_logos')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          _a
                        )
                      ]),
                      e[70] ||
                        (e[70] = a(
                          'p',
                          { class: 'text-[10px] text-emerald-700 italic' },
                          'Untuk header rapor + rekap Qiraati.',
                          -1
                        ))
                    ]),
                    a('div', $a, [
                      e[72] ||
                        (e[72] = a(
                          'label',
                          { class: 'block text-xs font-black text-slate-700 mb-2 uppercase' },
                          'Background Layar',
                          -1
                        )),
                      a('div', Fa, [
                        a('div', Ra, [
                          l.value.bgImage
                            ? (r(),
                              i(
                                'img',
                                {
                                  key: 0,
                                  src: l.value.bgImage,
                                  class: 'w-full h-full object-cover'
                                },
                                null,
                                8,
                                Ha
                              ))
                            : (r(), re(j(ne), { key: 1, class: 'w-6 h-6 text-slate-400' }))
                        ]),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'bgImage',
                            onChange: e[16] || (e[16] = (t) => F(t, 'bgImage', 'app_bg')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          Qa
                        )
                      ]),
                      l.value.bgImage
                        ? (r(),
                          i(
                            'button',
                            {
                              key: 0,
                              onClick: e[17] || (e[17] = (t) => (l.value.bgImage = '')),
                              class: 'text-[10px] text-rose-600 font-bold underline'
                            },
                            [
                              u(j(Z), { class: 'w-3 h-3 inline' }),
                              e[71] || (e[71] = m(' Hapus BG ', -1))
                            ]
                          ))
                        : V('', !0)
                    ]),
                    a('div', za, [
                      e[74] ||
                        (e[74] = a(
                          'label',
                          { class: 'block text-xs font-black text-teal-900 mb-2 uppercase' },
                          'BG Rapor TPQ/Qiraati',
                          -1
                        )),
                      a('div', Oa, [
                        a('div', Ja, [
                          l.value.bgRaporTPQ
                            ? (r(),
                              i(
                                'img',
                                {
                                  key: 0,
                                  src: l.value.bgRaporTPQ,
                                  class: 'w-full h-full object-cover'
                                },
                                null,
                                8,
                                Ea
                              ))
                            : (r(), re(j(ne), { key: 1, class: 'w-6 h-6 text-teal-400' }))
                        ]),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'bgRaporTPQ',
                            onChange: e[18] || (e[18] = (t) => F(t, 'bgRaporTPQ', 'app_bg')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          qa
                        )
                      ]),
                      e[75] ||
                        (e[75] = a(
                          'p',
                          { class: 'text-[10px] text-teal-700 italic' },
                          'Watermark 10% di tengah rapor Qiraati cetak.',
                          -1
                        )),
                      l.value.bgRaporTPQ
                        ? (r(),
                          i(
                            'button',
                            {
                              key: 0,
                              onClick: e[19] || (e[19] = (t) => (l.value.bgRaporTPQ = '')),
                              class: 'text-[10px] text-rose-600 font-bold underline mt-1'
                            },
                            [
                              u(j(Z), { class: 'w-3 h-3 inline' }),
                              e[73] || (e[73] = m(' Hapus ', -1))
                            ]
                          ))
                        : V('', !0)
                    ]),
                    a('div', Ga, [
                      e[77] ||
                        (e[77] = a(
                          'label',
                          { class: 'block text-xs font-black text-purple-900 mb-2 uppercase' },
                          'BG Rapor Diniyah',
                          -1
                        )),
                      a('div', Wa, [
                        a('div', Xa, [
                          l.value.bgRaporDiniyah
                            ? (r(),
                              i(
                                'img',
                                {
                                  key: 0,
                                  src: l.value.bgRaporDiniyah,
                                  class: 'w-full h-full object-cover'
                                },
                                null,
                                8,
                                Ya
                              ))
                            : (r(), re(j(ne), { key: 1, class: 'w-6 h-6 text-purple-400' }))
                        ]),
                        a(
                          'input',
                          {
                            type: 'file',
                            accept: 'image/*',
                            disabled: D.value === 'bgRaporDiniyah',
                            onChange: e[20] || (e[20] = (t) => F(t, 'bgRaporDiniyah', 'app_bg')),
                            class: 'text-xs flex-1'
                          },
                          null,
                          40,
                          Za
                        )
                      ]),
                      e[78] ||
                        (e[78] = a(
                          'p',
                          { class: 'text-[10px] text-purple-700 italic' },
                          'Watermark 10% di tengah rapor Diniyah cetak.',
                          -1
                        )),
                      l.value.bgRaporDiniyah
                        ? (r(),
                          i(
                            'button',
                            {
                              key: 0,
                              onClick: e[21] || (e[21] = (t) => (l.value.bgRaporDiniyah = '')),
                              class: 'text-[10px] text-rose-600 font-bold underline mt-1'
                            },
                            [
                              u(j(Z), { class: 'w-3 h-3 inline' }),
                              e[76] || (e[76] = m(' Hapus ', -1))
                            ]
                          ))
                        : V('', !0)
                    ])
                  ]),
                  e[79] ||
                    (e[79] = a(
                      'p',
                      { class: 'text-[10px] text-slate-400 italic mt-3' },
                      [
                        a('i', { class: 'fas fa-info-circle mr-1' }),
                        m(
                          'TTD (tanda tangan) guru/kepala diatur PERSONAL di Pengaturan Profil → setiap guru upload TTD-nya sendiri. '
                        )
                      ],
                      -1
                    ))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'logo']]
          ),
          o(
            u(
              A,
              {
                title: 'Kalibrasi Hijriyah',
                subtitle: 'Offset ±5 hari untuk match hilal lokal',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', et, [
                    o(
                      a(
                        'input',
                        {
                          'onUpdate:modelValue':
                            e[22] || (e[22] = (t) => (l.value.kalibrasiHijri = t)),
                          type: 'range',
                          min: '-5',
                          max: '5',
                          step: '1',
                          class: 'flex-1 accent-teal-600'
                        },
                        null,
                        512
                      ),
                      [[x, l.value.kalibrasiHijri, void 0, { number: !0 }]]
                    ),
                    a('div', at, [
                      e[80] ||
                        (e[80] = a(
                          'p',
                          { class: 'text-[10px] text-teal-700 font-bold uppercase' },
                          'Offset',
                          -1
                        )),
                      a(
                        'p',
                        tt,
                        v(l.value.kalibrasiHijri >= 0 ? '+' : '') + v(l.value.kalibrasiHijri),
                        1
                      )
                    ])
                  ]),
                  a('div', lt, [
                    e[81] ||
                      (e[81] = a(
                        'p',
                        { class: 'text-[10px] font-bold text-emerald-700 uppercase' },
                        'Preview Hari Ini',
                        -1
                      )),
                    a('p', st, v(we.value), 1)
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'hijri']]
          ),
          o(
            u(
              A,
              {
                title: 'Master Kegiatan Pondok',
                subtitle: 'Kegiatan untuk absensi mukim santri (nama + skor + jam)',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', ot, [
                    a('p', rt, v(l.value.masterKegiatan.length) + ' kegiatan terdaftar', 1),
                    u(
                      O,
                      { size: 'sm', variant: 'primary', onClick: Se },
                      {
                        default: k(() => [
                          u(j(Xe), { class: 'w-3.5 h-3.5' }),
                          e[82] || (e[82] = m('Tambah ', -1))
                        ]),
                        _: 1
                      }
                    )
                  ]),
                  l.value.masterKegiatan.length === 0
                    ? (r(),
                      i('div', it, [
                        ...(e[83] ||
                          (e[83] = [
                            m(' Belum ada kegiatan. Klik ', -1),
                            a('b', null, 'Tambah', -1),
                            m(' untuk mulai. ', -1)
                          ]))
                      ]))
                    : (r(),
                      i('div', nt, [
                        (r(!0),
                        i(
                          K,
                          null,
                          T(
                            l.value.masterKegiatan,
                            (t, d) => (
                              r(),
                              i(
                                'div',
                                {
                                  key: t.id,
                                  class: 'bg-slate-50 border border-slate-200 rounded-lg p-3'
                                },
                                [
                                  a('div', dt, [
                                    u(
                                      c,
                                      {
                                        modelValue: t.nama,
                                        'onUpdate:modelValue': (b) => (t.nama = b),
                                        label: 'Nama Kegiatan',
                                        class: 'md:col-span-2'
                                      },
                                      null,
                                      8,
                                      ['modelValue', 'onUpdate:modelValue']
                                    ),
                                    a('div', null, [
                                      e[84] ||
                                        (e[84] = a(
                                          'label',
                                          {
                                            class:
                                              'text-[10px] font-bold text-slate-500 uppercase mb-1 block'
                                          },
                                          'Jam Mulai',
                                          -1
                                        )),
                                      o(
                                        a(
                                          'input',
                                          {
                                            'onUpdate:modelValue': (b) => (t.jam_mulai = b),
                                            type: 'time',
                                            class:
                                              'w-full px-2 py-1.5 text-xs border border-slate-300 rounded'
                                          },
                                          null,
                                          8,
                                          ut
                                        ),
                                        [[x, t.jam_mulai]]
                                      )
                                    ]),
                                    a('div', null, [
                                      e[85] ||
                                        (e[85] = a(
                                          'label',
                                          {
                                            class:
                                              'text-[10px] font-bold text-slate-500 uppercase mb-1 block'
                                          },
                                          'Terlambat',
                                          -1
                                        )),
                                      o(
                                        a(
                                          'input',
                                          {
                                            'onUpdate:modelValue': (b) => (t.jam_terlambat = b),
                                            type: 'time',
                                            class:
                                              'w-full px-2 py-1.5 text-xs border border-slate-300 rounded'
                                          },
                                          null,
                                          8,
                                          pt
                                        ),
                                        [[x, t.jam_terlambat]]
                                      )
                                    ]),
                                    a('div', null, [
                                      e[86] ||
                                        (e[86] = a(
                                          'label',
                                          {
                                            class:
                                              'text-[10px] font-bold text-slate-500 uppercase mb-1 block'
                                          },
                                          'Skor',
                                          -1
                                        )),
                                      o(
                                        a(
                                          'input',
                                          {
                                            'onUpdate:modelValue': (b) => (t.skor = b),
                                            type: 'number',
                                            min: '0',
                                            max: '100',
                                            class:
                                              'w-full px-2 py-1.5 text-xs border border-slate-300 rounded'
                                          },
                                          null,
                                          8,
                                          mt
                                        ),
                                        [[x, t.skor, void 0, { number: !0 }]]
                                      )
                                    ]),
                                    a('div', bt, [
                                      a(
                                        'button',
                                        {
                                          onClick: (b) => Ve(d),
                                          class: 'text-rose-600 hover:text-rose-800 p-1.5'
                                        },
                                        [u(j(Z), { class: 'w-4 h-4' })],
                                        8,
                                        xt
                                      )
                                    ])
                                  ])
                                ]
                              )
                            )
                          ),
                          128
                        ))
                      ]))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'kegiatan']]
          ),
          o(
            u(
              A,
              {
                title: 'Default Admin Built-in',
                subtitle: 'Username & ganti password admin',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', gt, [
                    u(
                      c,
                      {
                        modelValue: l.value.adminUsername,
                        'onUpdate:modelValue':
                          e[23] || (e[23] = (t) => (l.value.adminUsername = t)),
                        label: 'Username Admin Built-in',
                        placeholder: 'adminmu'
                      },
                      null,
                      8,
                      ['modelValue']
                    )
                  ]),
                  a(
                    'form',
                    {
                      onSubmit: Oe(Ue, ['prevent']),
                      class: 'mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg'
                    },
                    [
                      e[88] ||
                        (e[88] = a(
                          'p',
                          { class: 'text-xs font-black text-amber-800 mb-2 uppercase' },
                          'Ganti Password Admin',
                          -1
                        )),
                      a(
                        'input',
                        {
                          type: 'text',
                          name: 'username',
                          autocomplete: 'username',
                          value: l.value.adminUsername,
                          class: 'hidden',
                          readonly: ''
                        },
                        null,
                        8,
                        ft
                      ),
                      a('div', ct, [
                        u(
                          c,
                          {
                            modelValue: $.value,
                            'onUpdate:modelValue': e[24] || (e[24] = (t) => ($.value = t)),
                            type: 'password',
                            label: 'Password Baru',
                            autocomplete: 'new-password'
                          },
                          null,
                          8,
                          ['modelValue']
                        ),
                        u(
                          c,
                          {
                            modelValue: E.value,
                            'onUpdate:modelValue': e[25] || (e[25] = (t) => (E.value = t)),
                            type: 'password',
                            label: 'Konfirmasi',
                            autocomplete: 'new-password'
                          },
                          null,
                          8,
                          ['modelValue']
                        ),
                        a('div', vt, [
                          u(
                            O,
                            { size: 'sm', variant: 'primary', type: 'submit', disabled: !$.value },
                            { default: k(() => [...(e[87] || (e[87] = [m('Apply', -1)]))]), _: 1 },
                            8,
                            ['disabled']
                          )
                        ])
                      ]),
                      e[89] ||
                        (e[89] = a(
                          'p',
                          { class: 'text-[10px] text-amber-700 italic mt-2' },
                          'Password disimpan di settings/general saat klik Simpan.',
                          -1
                        ))
                    ],
                    32
                  )
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'admin']]
          ),
          o(
            u(
              A,
              {
                title: 'Tema Warna',
                subtitle: 'Color picker untuk accent, teks, sidebar',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', kt, [
                    a('div', null, [
                      e[90] ||
                        (e[90] = a(
                          'label',
                          { class: 'text-xs font-bold text-slate-700 mb-2 block' },
                          'Warna Accent',
                          -1
                        )),
                      a('div', ht, [
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[26] || (e[26] = (t) => (l.value.themeColor = t)),
                              type: 'color',
                              class: 'w-12 h-10 border border-slate-300 rounded cursor-pointer'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.themeColor]]
                        ),
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[27] || (e[27] = (t) => (l.value.themeColor = t)),
                              type: 'text',
                              class:
                                'flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.themeColor]]
                        )
                      ])
                    ]),
                    a('div', null, [
                      e[91] ||
                        (e[91] = a(
                          'label',
                          { class: 'text-xs font-bold text-slate-700 mb-2 block' },
                          'Warna Teks',
                          -1
                        )),
                      a('div', yt, [
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[28] || (e[28] = (t) => (l.value.themeTextColor = t)),
                              type: 'color',
                              class: 'w-12 h-10 border border-slate-300 rounded cursor-pointer'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.themeTextColor]]
                        ),
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[29] || (e[29] = (t) => (l.value.themeTextColor = t)),
                              type: 'text',
                              class:
                                'flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.themeTextColor]]
                        )
                      ])
                    ]),
                    a('div', null, [
                      e[92] ||
                        (e[92] = a(
                          'label',
                          { class: 'text-xs font-bold text-slate-700 mb-2 block' },
                          'Sidebar BG (legacy)',
                          -1
                        )),
                      a('div', wt, [
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[30] || (e[30] = (t) => (l.value.sidebarBgColor = t)),
                              type: 'color',
                              class: 'w-12 h-10 border border-slate-300 rounded cursor-pointer'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.sidebarBgColor]]
                        ),
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[31] || (e[31] = (t) => (l.value.sidebarBgColor = t)),
                              type: 'text',
                              class:
                                'flex-1 px-2 py-1.5 text-xs border border-slate-300 rounded font-mono'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.sidebarBgColor]]
                        )
                      ])
                    ])
                  ]),
                  e[93] ||
                    (e[93] = a(
                      'p',
                      { class: 'text-[10px] text-slate-500 italic mt-3' },
                      ' Note: Vue sidebar sekarang pakai cream/mint preset. Color picker disimpan untuk kompat legacy. ',
                      -1
                    ))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'theme']]
          ),
          o(
            u(
              A,
              {
                title: 'Submenu Formal per-Lembaga',
                subtitle: 'KOP sekolah, logo, tarif SPP',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  me.value.length === 0
                    ? (r(),
                      i(
                        'div',
                        St,
                        ' Belum ada lembaga formal terdaftar. Tambah di Master Data → Lembaga. '
                      ))
                    : (r(),
                      i('div', Vt, [
                        (r(!0),
                        i(
                          K,
                          null,
                          T(me.value, (t) => {
                            var d, b
                            return (
                              r(),
                              i(
                                'details',
                                {
                                  key: t.id,
                                  class: 'bg-slate-50 border border-slate-200 rounded-lg'
                                },
                                [
                                  a('summary', Pt, [
                                    a('span', null, [
                                      e[94] ||
                                        (e[94] = a(
                                          'i',
                                          { class: 'fas fa-school mr-2 text-blue-600' },
                                          null,
                                          -1
                                        )),
                                      m(v(t.nama), 1)
                                    ]),
                                    e[95] ||
                                      (e[95] = a(
                                        'i',
                                        { class: 'fas fa-chevron-down text-xs' },
                                        null,
                                        -1
                                      ))
                                  ]),
                                  a('div', Kt, [
                                    u(
                                      c,
                                      {
                                        'model-value': H(t.nama).kopLine1,
                                        'onUpdate:modelValue': (p) =>
                                          (l.value.submenuFormal[t.nama].kopLine1 = p),
                                        label: 'KOP Baris 1 (Yayasan/Kementerian)'
                                      },
                                      null,
                                      8,
                                      ['model-value', 'onUpdate:modelValue']
                                    ),
                                    u(
                                      c,
                                      {
                                        'model-value': H(t.nama).kopLine2,
                                        'onUpdate:modelValue': (p) =>
                                          (l.value.submenuFormal[t.nama].kopLine2 = p),
                                        label: 'KOP Baris 2 (Nama Sekolah)'
                                      },
                                      null,
                                      8,
                                      ['model-value', 'onUpdate:modelValue']
                                    ),
                                    u(
                                      c,
                                      {
                                        'model-value': H(t.nama).kopLine3,
                                        'onUpdate:modelValue': (p) =>
                                          (l.value.submenuFormal[t.nama].kopLine3 = p),
                                        label: 'KOP Baris 3 (Alamat)'
                                      },
                                      null,
                                      8,
                                      ['model-value', 'onUpdate:modelValue']
                                    ),
                                    u(
                                      c,
                                      {
                                        'model-value': H(t.nama).kopLine4,
                                        'onUpdate:modelValue': (p) =>
                                          (l.value.submenuFormal[t.nama].kopLine4 = p),
                                        label: 'KOP Baris 4 (Telp/NSS)'
                                      },
                                      null,
                                      8,
                                      ['model-value', 'onUpdate:modelValue']
                                    ),
                                    a('div', Tt, [
                                      a(
                                        'img',
                                        {
                                          src:
                                            ((d = l.value.submenuFormal[t.nama]) == null
                                              ? void 0
                                              : d.logoSekolah) || '/logo.png',
                                          class:
                                            'w-12 h-12 rounded object-contain bg-white p-1 border'
                                        },
                                        null,
                                        8,
                                        Ut
                                      ),
                                      a(
                                        'input',
                                        {
                                          type: 'file',
                                          accept: 'image/*',
                                          onChange: (p) =>
                                            F(
                                              p,
                                              `submenuFormal.${t.nama}.logoSekolah`,
                                              'lembaga_logos'
                                            ),
                                          class: 'text-xs flex-1'
                                        },
                                        null,
                                        40,
                                        At
                                      )
                                    ]),
                                    a('div', null, [
                                      e[96] ||
                                        (e[96] = a(
                                          'label',
                                          {
                                            class:
                                              'text-[10px] font-bold text-slate-500 uppercase mb-1 block'
                                          },
                                          'Tarif SPP Default (Rp)',
                                          -1
                                        )),
                                      a(
                                        'input',
                                        {
                                          value:
                                            ((b = l.value.submenuFormal[t.nama]) == null
                                              ? void 0
                                              : b.tarifSPP) || 0,
                                          onInput: (p) => {
                                            ;(H(t.nama),
                                              (l.value.submenuFormal[t.nama].tarifSPP = Number(
                                                p.target.value
                                              )))
                                          },
                                          type: 'number',
                                          min: '0',
                                          class:
                                            'w-full px-2 py-1.5 text-xs border border-slate-300 rounded'
                                        },
                                        null,
                                        40,
                                        Lt
                                      )
                                    ])
                                  ])
                                ]
                              )
                            )
                          }),
                          128
                        ))
                      ])),
                  e[97] ||
                    (e[97] = a(
                      'p',
                      { class: 'text-[10px] text-slate-400 italic mt-3' },
                      [
                        a('i', { class: 'fas fa-info-circle mr-1' }),
                        m(
                          'TTD (tanda tangan) guru/kepala diatur PERSONAL di Pengaturan Profil → setiap guru upload TTD-nya sendiri. '
                        )
                      ],
                      -1
                    ))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'formal']]
          ),
          o(
            u(
              A,
              {
                title: 'Submenu Qiraati per-Lembaga',
                subtitle: 'Target kelas + format rekap',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  be.value.length === 0
                    ? (r(), i('div', It, ' Belum ada lembaga Qiraati/PTPT terdaftar. '))
                    : (r(),
                      i('div', Ct, [
                        (r(!0),
                        i(
                          K,
                          null,
                          T(be.value, (t) => {
                            var d
                            return (
                              r(),
                              i(
                                'details',
                                {
                                  key: t.id,
                                  class: 'bg-emerald-50 border border-emerald-200 rounded-lg'
                                },
                                [
                                  a('summary', Mt, [
                                    a('span', null, [
                                      e[98] ||
                                        (e[98] = a(
                                          'i',
                                          { class: 'fas fa-star mr-2 text-emerald-600' },
                                          null,
                                          -1
                                        )),
                                      m(v(t.nama), 1)
                                    ]),
                                    e[99] ||
                                      (e[99] = a(
                                        'i',
                                        { class: 'fas fa-chevron-down text-xs' },
                                        null,
                                        -1
                                      ))
                                  ]),
                                  a('div', Dt, [
                                    u(
                                      c,
                                      {
                                        'model-value': xe(t.nama).targetKelas,
                                        'onUpdate:modelValue': (b) =>
                                          (l.value.submenuQiraati[t.nama].targetKelas = b),
                                        label:
                                          'Target Kelas (contoh: Pra-TK, A, B, C, D, E, Tahsin, Tahfidz)'
                                      },
                                      null,
                                      8,
                                      ['model-value', 'onUpdate:modelValue']
                                    ),
                                    a('div', null, [
                                      e[101] ||
                                        (e[101] = a(
                                          'label',
                                          {
                                            class:
                                              'text-[10px] font-bold text-slate-500 uppercase mb-1 block'
                                          },
                                          'Format Rekap',
                                          -1
                                        )),
                                      a(
                                        'select',
                                        {
                                          value:
                                            ((d = l.value.submenuQiraati[t.nama]) == null
                                              ? void 0
                                              : d.formatRekap) || 'standard',
                                          onChange: (b) => {
                                            ;(xe(t.nama),
                                              (l.value.submenuQiraati[t.nama].formatRekap =
                                                b.target.value))
                                          },
                                          class:
                                            'w-full px-2 py-1.5 text-xs border border-slate-300 rounded'
                                        },
                                        [
                                          ...(e[100] ||
                                            (e[100] = [
                                              a(
                                                'option',
                                                { value: 'standard' },
                                                'Standard (per-kelas)',
                                                -1
                                              ),
                                              a(
                                                'option',
                                                { value: 'khotam' },
                                                'Per-Khotam (Pra PTPT style)',
                                                -1
                                              )
                                            ]))
                                        ],
                                        40,
                                        jt
                                      )
                                    ])
                                  ])
                                ]
                              )
                            )
                          }),
                          128
                        ))
                      ]))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'qiraati']]
          ),
          o(
            u(
              A,
              {
                title: 'Fitur & Mode Aplikasi',
                subtitle: 'Toggle modul + Capacitor mode',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', Bt, [
                    a('label', Nt, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[32] || (e[32] = (t) => (l.value.fiturBeranda = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.fiturBeranda]]
                      ),
                      e[102] || (e[102] = m(' Beranda (Mading + Quick Action) ', -1))
                    ]),
                    a('label', _t, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[33] || (e[33] = (t) => (l.value.fiturKalender = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.fiturKalender]]
                      ),
                      e[103] || (e[103] = m(' Kalender Pendidikan ', -1))
                    ]),
                    a('label', $t, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[34] || (e[34] = (t) => (l.value.fiturKritikSaran = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.fiturKritikSaran]]
                      ),
                      e[104] || (e[104] = m(' Kritik & Saran ', -1))
                    ]),
                    a('label', Ft, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[35] || (e[35] = (t) => (l.value.fiturNotifikasi = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.fiturNotifikasi]]
                      ),
                      e[105] || (e[105] = m(' Notifikasi FCM ', -1))
                    ]),
                    a('label', Rt, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[36] || (e[36] = (t) => (l.value.autoNotifPostingan = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.autoNotifPostingan]]
                      ),
                      e[106] || (e[106] = m(' Auto-Notif setiap Postingan ', -1))
                    ]),
                    a('label', Ht, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[37] || (e[37] = (t) => (l.value.softDelete = t)),
                            type: 'checkbox',
                            class: 'w-4 h-4 accent-rose-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.softDelete]]
                      ),
                      e[107] || (e[107] = m(' Soft Delete (recoverable) ', -1))
                    ])
                  ]),
                  a('div', Qt, [
                    e[110] ||
                      (e[110] = a(
                        'p',
                        { class: 'text-xs font-black text-purple-800 mb-2 uppercase' },
                        'Mode Capacitor / PWA',
                        -1
                      )),
                    a('div', zt, [
                      a('label', Ot, [
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[38] || (e[38] = (t) => (l.value.capacitorMode = t)),
                              type: 'radio',
                              value: 'remote',
                              class: 'w-4 h-4 accent-purple-600'
                            },
                            null,
                            512
                          ),
                          [[ce, l.value.capacitorMode]]
                        ),
                        e[108] ||
                          (e[108] = a(
                            'span',
                            null,
                            [
                              a('b', null, 'Remote (Opsi B)'),
                              m(' — server.url ke Firebase Hosting')
                            ],
                            -1
                          ))
                      ]),
                      a('label', Jt, [
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[39] || (e[39] = (t) => (l.value.capacitorMode = t)),
                              type: 'radio',
                              value: 'local',
                              class: 'w-4 h-4 accent-purple-600'
                            },
                            null,
                            512
                          ),
                          [[ce, l.value.capacitorMode]]
                        ),
                        e[109] || (e[109] = a('span', null, 'Local (bundled)', -1))
                      ])
                    ])
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'fitur']]
          ),
          o(
            u(
              A,
              {
                title: 'Pengaturan Jam Shift',
                subtitle: 'Jam mulai / selesai / batas terlambat — Pagi · Sore · Sekolah',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', Et, [
                    a('div', qt, [
                      e[114] ||
                        (e[114] = a(
                          'p',
                          { class: 'text-xs font-black text-amber-800 uppercase mb-2' },
                          [a('i', { class: 'fas fa-sun mr-1' }), m('SHIFT PAGI')],
                          -1
                        )),
                      a('div', Gt, [
                        a('div', null, [
                          e[111] ||
                            (e[111] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Mulai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[40] || (e[40] = (t) => (l.value.shiftPagiMulai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-amber-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftPagiMulai]]
                          )
                        ]),
                        a('div', null, [
                          e[112] ||
                            (e[112] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Terlambat',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[41] || (e[41] = (t) => (l.value.shiftPagiTerlambat = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftPagiTerlambat]]
                          )
                        ]),
                        a('div', null, [
                          e[113] ||
                            (e[113] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Selesai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[42] || (e[42] = (t) => (l.value.shiftPagiSelesai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-amber-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftPagiSelesai]]
                          )
                        ])
                      ])
                    ]),
                    a('div', Wt, [
                      e[118] ||
                        (e[118] = a(
                          'p',
                          { class: 'text-xs font-black text-indigo-800 uppercase mb-2' },
                          [a('i', { class: 'fas fa-moon mr-1' }), m('SHIFT SORE')],
                          -1
                        )),
                      a('div', Xt, [
                        a('div', null, [
                          e[115] ||
                            (e[115] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Mulai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[43] || (e[43] = (t) => (l.value.shiftSoreMulai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-indigo-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSoreMulai]]
                          )
                        ]),
                        a('div', null, [
                          e[116] ||
                            (e[116] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Terlambat',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[44] || (e[44] = (t) => (l.value.shiftSoreTerlambat = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSoreTerlambat]]
                          )
                        ]),
                        a('div', null, [
                          e[117] ||
                            (e[117] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Selesai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[45] || (e[45] = (t) => (l.value.shiftSoreSelesai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-indigo-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSoreSelesai]]
                          )
                        ])
                      ])
                    ]),
                    a('div', Yt, [
                      e[122] ||
                        (e[122] = a(
                          'p',
                          { class: 'text-xs font-black text-teal-800 uppercase mb-2' },
                          [a('i', { class: 'fas fa-school mr-1' }), m('SHIFT SEKOLAH')],
                          -1
                        )),
                      a('div', Zt, [
                        a('div', null, [
                          e[119] ||
                            (e[119] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Mulai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[46] || (e[46] = (t) => (l.value.shiftSekolahMulai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSekolahMulai]]
                          )
                        ]),
                        a('div', null, [
                          e[120] ||
                            (e[120] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Terlambat',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[47] || (e[47] = (t) => (l.value.shiftSekolahTerlambat = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-rose-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSekolahTerlambat]]
                          )
                        ]),
                        a('div', null, [
                          e[121] ||
                            (e[121] = a(
                              'label',
                              {
                                class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                              },
                              'Selesai',
                              -1
                            )),
                          o(
                            a(
                              'input',
                              {
                                'onUpdate:modelValue':
                                  e[48] || (e[48] = (t) => (l.value.shiftSekolahSelesai = t)),
                                type: 'time',
                                class:
                                  'w-full px-2 py-1.5 text-sm border border-teal-300 rounded bg-white'
                              },
                              null,
                              512
                            ),
                            [[x, l.value.shiftSekolahSelesai]]
                          )
                        ])
                      ])
                    ])
                  ]),
                  e[123] ||
                    (e[123] = a(
                      'p',
                      { class: 'text-[10px] text-slate-500 italic mt-3' },
                      [
                        a('i', { class: 'fas fa-info-circle mr-1' }),
                        m('Jam '),
                        a('b', null, 'Terlambat'),
                        m(
                          ' = batas waktu kehadiran masih dianggap "Hadir"; lewat dari ini → status auto "Terlambat" saat impor fingerprint. '
                        )
                      ],
                      -1
                    ))
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'shift']]
          ),
          o(
            u(
              A,
              {
                title: 'Pengaturan Printer',
                subtitle: 'Default printer + ukuran kertas + orientasi untuk cetak rapor/slip',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', el, [
                    a('div', al, [
                      e[124] ||
                        (e[124] = a(
                          'label',
                          { class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1' },
                          'Nama Printer Default',
                          -1
                        )),
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[49] || (e[49] = (t) => (l.value.printerNama = t)),
                            type: 'text',
                            placeholder: 'Mis: EPSON L3110 / TM-T82II',
                            class:
                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                          },
                          null,
                          512
                        ),
                        [[x, l.value.printerNama]]
                      )
                    ]),
                    a('div', null, [
                      e[126] ||
                        (e[126] = a(
                          'label',
                          { class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1' },
                          'Ukuran Kertas',
                          -1
                        )),
                      o(
                        a(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[50] || (e[50] = (t) => (l.value.printerKertas = t)),
                            class:
                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                          },
                          [
                            ...(e[125] ||
                              (e[125] = [
                                a('option', { value: 'A4' }, 'A4 (210x297mm)', -1),
                                a('option', { value: 'F4' }, 'F4 / Folio (210x330mm)', -1),
                                a('option', { value: 'Legal' }, 'Legal (216x356mm)', -1),
                                a('option', { value: 'Letter' }, 'Letter (216x279mm)', -1),
                                a('option', { value: 'Struk58' }, 'Struk 58mm', -1),
                                a('option', { value: 'Struk80' }, 'Struk 80mm', -1)
                              ]))
                          ],
                          512
                        ),
                        [[Y, l.value.printerKertas]]
                      )
                    ]),
                    a('div', null, [
                      e[128] ||
                        (e[128] = a(
                          'label',
                          { class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1' },
                          'Orientasi',
                          -1
                        )),
                      o(
                        a(
                          'select',
                          {
                            'onUpdate:modelValue':
                              e[51] || (e[51] = (t) => (l.value.printerOrientasi = t)),
                            class:
                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                          },
                          [
                            ...(e[127] ||
                              (e[127] = [
                                a('option', { value: 'portrait' }, 'Portrait (Tegak)', -1),
                                a('option', { value: 'landscape' }, 'Landscape (Lebar)', -1)
                              ]))
                          ],
                          512
                        ),
                        [[Y, l.value.printerOrientasi]]
                      )
                    ]),
                    a('div', null, [
                      e[129] ||
                        (e[129] = a(
                          'label',
                          { class: 'text-[10px] font-bold text-slate-500 uppercase block mb-1' },
                          'Margin (mm)',
                          -1
                        )),
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[52] || (e[52] = (t) => (l.value.printerMarginMM = t)),
                            type: 'number',
                            min: '0',
                            max: '50',
                            class:
                              'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800'
                          },
                          null,
                          512
                        ),
                        [[x, l.value.printerMarginMM, void 0, { number: !0 }]]
                      )
                    ]),
                    a('label', tl, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[53] || (e[53] = (t) => (l.value.printerAutoPrint = t)),
                            type: 'checkbox',
                            class: 'w-5 h-5 accent-teal-600'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.printerAutoPrint]]
                      ),
                      e[130] ||
                        (e[130] = a(
                          'div',
                          null,
                          [
                            a('p', { class: 'text-sm font-bold' }, 'Auto-Print (Tauri Desktop)'),
                            a(
                              'p',
                              { class: 'text-[11px] text-slate-500' },
                              'Langsung kirim ke printer tanpa preview dialog. Hanya aktif di Tauri Desktop.'
                            )
                          ],
                          -1
                        ))
                    ])
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'printer']]
          ),
          o(
            u(
              A,
              {
                title: 'Schema Rekap Diniyah',
                subtitle:
                  'Daftar mata pelajaran Diniyah yang muncul sebagai kolom di Rekap Diniyah',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', ll, [
                    (r(!0),
                    i(
                      K,
                      null,
                      T(
                        l.value.rekapSchemaDiniyah,
                        (t, d) => (
                          r(),
                          i(
                            'div',
                            {
                              key: d,
                              class:
                                'flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-lg p-2'
                            },
                            [
                              o(
                                a(
                                  'input',
                                  {
                                    'onUpdate:modelValue': (b) =>
                                      (l.value.rekapSchemaDiniyah[d] = b),
                                    type: 'text',
                                    class:
                                      'flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none'
                                  },
                                  null,
                                  8,
                                  sl
                                ),
                                [[x, l.value.rekapSchemaDiniyah[d]]]
                              ),
                              a(
                                'button',
                                {
                                  onClick: (b) => l.value.rekapSchemaDiniyah.splice(d, 1),
                                  class:
                                    'text-rose-600 hover:bg-rose-50 px-2 py-1 rounded text-xs cursor-pointer'
                                },
                                [
                                  ...(e[131] ||
                                    (e[131] = [a('i', { class: 'fas fa-trash' }, null, -1)]))
                                ],
                                8,
                                ol
                              )
                            ]
                          )
                        )
                      ),
                      128
                    )),
                    l.value.rekapSchemaDiniyah.length === 0
                      ? (r(), i('p', rl, ' Belum ada mata pelajaran. Tambah di bawah. '))
                      : V('', !0)
                  ]),
                  a('div', il, [
                    o(
                      a(
                        'input',
                        {
                          'onUpdate:modelValue': e[54] || (e[54] = (t) => (Q.value = t)),
                          onKeyup: ve(fe, ['enter']),
                          type: 'text',
                          placeholder: 'Nama mata pelajaran baru...',
                          class:
                            'flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50'
                        },
                        null,
                        544
                      ),
                      [[x, Q.value]]
                    ),
                    a(
                      'button',
                      {
                        onClick: fe,
                        class:
                          'bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap cursor-pointer'
                      },
                      [
                        ...(e[132] ||
                          (e[132] = [
                            a('i', { class: 'fas fa-plus mr-1' }, null, -1),
                            m('Tambah ', -1)
                          ]))
                      ]
                    )
                  ]),
                  e[138] ||
                    (e[138] = a(
                      'div',
                      {
                        class:
                          'mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl text-[11px] text-violet-800'
                      },
                      [
                        a('i', { class: 'fas fa-info-circle mr-1' }),
                        m('Mata pelajaran '),
                        a('b', null, 'default'),
                        m(' (semua kelas). Untuk override per-kelas, edit di bawah. ')
                      ],
                      -1
                    )),
                  a('div', nl, [
                    e[136] ||
                      (e[136] = a(
                        'h4',
                        { class: 'text-xs font-black text-violet-900 uppercase mb-2' },
                        [
                          a('i', { class: 'fas fa-layer-group mr-1' }),
                          m('Override Mapel per Kelas ')
                        ],
                        -1
                      )),
                    e[137] ||
                      (e[137] = a(
                        'p',
                        { class: 'text-[11px] text-slate-500 italic mb-3' },
                        ' Kalau kelas tertentu butuh daftar mapel berbeda dari default. Kalau kelas tidak di-set, pakai default di atas. ',
                        -1
                      )),
                    a('div', dl, [
                      (r(!0),
                      i(
                        K,
                        null,
                        T(
                          l.value.rekapSchemaDiniyahPerKelas,
                          (t, d) => (
                            r(),
                            i(
                              'div',
                              { key: d, class: 'bg-white border border-violet-200 rounded-xl p-3' },
                              [
                                a('div', ul, [
                                  a('p', pl, '📚 Kelas ' + v(d), 1),
                                  a(
                                    'button',
                                    {
                                      onClick: (b) => delete l.value.rekapSchemaDiniyahPerKelas[d],
                                      class:
                                        'text-rose-600 text-xs font-bold hover:bg-rose-50 px-2 py-0.5 rounded'
                                    },
                                    [
                                      ...(e[133] ||
                                        (e[133] = [
                                          a('i', { class: 'fas fa-trash mr-1' }, null, -1),
                                          m('Hapus kelas ', -1)
                                        ]))
                                    ],
                                    8,
                                    ml
                                  )
                                ]),
                                a('div', bl, [
                                  (r(!0),
                                  i(
                                    K,
                                    null,
                                    T(
                                      t,
                                      (b, p) => (
                                        r(),
                                        i(
                                          'span',
                                          {
                                            key: p,
                                            class:
                                              'inline-flex items-center gap-1 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded text-[11px]'
                                          },
                                          [
                                            o(
                                              a(
                                                'input',
                                                {
                                                  'onUpdate:modelValue': (n) =>
                                                    (l.value.rekapSchemaDiniyahPerKelas[d][p] = n),
                                                  class:
                                                    'bg-transparent w-24 outline-none text-[11px]'
                                                },
                                                null,
                                                8,
                                                xl
                                              ),
                                              [[x, l.value.rekapSchemaDiniyahPerKelas[d][p]]]
                                            ),
                                            a(
                                              'button',
                                              {
                                                onClick: (n) =>
                                                  l.value.rekapSchemaDiniyahPerKelas[d].splice(
                                                    p,
                                                    1
                                                  ),
                                                class: 'text-rose-400 text-[10px]'
                                              },
                                              [
                                                ...(e[134] ||
                                                  (e[134] = [
                                                    a('i', { class: 'fas fa-times' }, null, -1)
                                                  ]))
                                              ],
                                              8,
                                              gl
                                            )
                                          ]
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  a(
                                    'button',
                                    {
                                      onClick: (b) =>
                                        l.value.rekapSchemaDiniyahPerKelas[d].push('Mapel Baru'),
                                      class:
                                        'bg-violet-200 hover:bg-violet-300 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded'
                                    },
                                    ' + Mapel ',
                                    8,
                                    fl
                                  )
                                ])
                              ]
                            )
                          )
                        ),
                        128
                      ))
                    ]),
                    a('div', cl, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue': e[55] || (e[55] = (t) => (X.value = t)),
                            type: 'text',
                            placeholder: 'Nama kelas (mis: TK A, I, II, III)',
                            class:
                              'flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50'
                          },
                          null,
                          512
                        ),
                        [[x, X.value]]
                      ),
                      a(
                        'button',
                        {
                          onClick: je,
                          class:
                            'bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer'
                        },
                        [
                          ...(e[135] ||
                            (e[135] = [
                              a('i', { class: 'fas fa-plus mr-1' }, null, -1),
                              m('Tambah Kelas ', -1)
                            ]))
                        ]
                      )
                    ])
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'rekapDiniyah']]
          ),
          o(
            u(
              A,
              {
                title: 'Pengaturan Postingan / Ammu Channel',
                subtitle: 'Hak akses + limit upload',
                class: 'mb-4'
              },
              {
                default: k(() => [
                  a('div', vl, [
                    a('label', kl, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[56] || (e[56] = (t) => (l.value.postinganHanyaAdmin = t)),
                            type: 'checkbox',
                            class: 'w-5 h-5 accent-fuchsia-600 mt-0.5'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.postinganHanyaAdmin]]
                      ),
                      e[139] ||
                        (e[139] = a(
                          'div',
                          null,
                          [
                            a(
                              'p',
                              { class: 'text-sm font-bold text-slate-800' },
                              'Hanya Admin & Super Admin yang bisa buat post'
                            ),
                            a(
                              'p',
                              { class: 'text-[11px] text-slate-500' },
                              'Kalau off: guru juga bisa buat post. Santri tidak pernah bisa post.'
                            )
                          ],
                          -1
                        ))
                    ]),
                    a('label', hl, [
                      o(
                        a(
                          'input',
                          {
                            'onUpdate:modelValue':
                              e[57] || (e[57] = (t) => (l.value.postinganAutoApprove = t)),
                            type: 'checkbox',
                            class: 'w-5 h-5 accent-fuchsia-600 mt-0.5'
                          },
                          null,
                          512
                        ),
                        [[N, l.value.postinganAutoApprove]]
                      ),
                      e[140] ||
                        (e[140] = a(
                          'div',
                          null,
                          [
                            a(
                              'p',
                              { class: 'text-sm font-bold text-slate-800' },
                              'Auto-approve post baru'
                            ),
                            a(
                              'p',
                              { class: 'text-[11px] text-slate-500' },
                              'Kalau off: post baru moderation queue dulu sampai admin approve.'
                            )
                          ],
                          -1
                        ))
                    ]),
                    a('div', yl, [
                      a('div', null, [
                        e[141] ||
                          (e[141] = a(
                            'label',
                            { class: 'text-[10px] font-bold text-slate-500 uppercase mb-1 block' },
                            'Max Gambar per Post',
                            -1
                          )),
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[58] || (e[58] = (t) => (l.value.postinganMaxImages = t)),
                              type: 'number',
                              min: '1',
                              max: '10',
                              class:
                                'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.postinganMaxImages, void 0, { number: !0 }]]
                        )
                      ]),
                      a('div', null, [
                        e[142] ||
                          (e[142] = a(
                            'label',
                            { class: 'text-[10px] font-bold text-slate-500 uppercase mb-1 block' },
                            'Max Size per Gambar (KB)',
                            -1
                          )),
                        o(
                          a(
                            'input',
                            {
                              'onUpdate:modelValue':
                                e[59] || (e[59] = (t) => (l.value.postinganMaxSizeKb = t)),
                              type: 'number',
                              min: '50',
                              max: '5000',
                              step: '50',
                              class:
                                'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50'
                            },
                            null,
                            512
                          ),
                          [[x, l.value.postinganMaxSizeKb, void 0, { number: !0 }]]
                        )
                      ])
                    ])
                  ])
                ]),
                _: 1
              },
              512
            ),
            [[U, w.value === 'postingan']]
          ),
          o(
            u(
              A,
              {
                title: 'Schema Rapor per-Lembaga',
                subtitle: 'Edit field nilai + struktur untuk rapor cetak per lembaga',
                class: 'mb-4'
              },
              {
                default: k(() => {
                  var t, d, b, p
                  return [
                    a('div', wl, [
                      a('div', null, [
                        e[145] ||
                          (e[145] = a(
                            'label',
                            {
                              class:
                                'text-[10px] font-bold text-slate-500 uppercase block mb-1 tracking-wider'
                            },
                            'Pilih Lembaga',
                            -1
                          )),
                        o(
                          a(
                            'select',
                            {
                              'onUpdate:modelValue': e[60] || (e[60] = (n) => (h.value = n)),
                              class:
                                'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50'
                            },
                            [
                              e[143] ||
                                (e[143] = a('option', { value: '' }, '-- Pilih lembaga --', -1)),
                              (r(!0),
                              i(
                                K,
                                null,
                                T(
                                  j(se),
                                  (n) => (
                                    r(),
                                    i(
                                      'option',
                                      { key: n.lembaga, value: n.lembaga },
                                      v(n.lembaga) + ' (' + v(n.tipe || 'Qiraati') + ')',
                                      9,
                                      Sl
                                    )
                                  )
                                ),
                                128
                              )),
                              e[144] ||
                                (e[144] = a(
                                  'option',
                                  { value: 'Diniyah' },
                                  'Diniyah (perKelas mapel)',
                                  -1
                                ))
                            ],
                            512
                          ),
                          [[Y, h.value]]
                        )
                      ]),
                      h.value
                        ? (r(),
                          i('div', Vl, [
                            a('p', Pl, 'Schema untuk: ' + v(h.value), 1),
                            a(
                              'div',
                              {
                                class:
                                  'bg-blue-50 border border-blue-300 rounded-lg p-3 text-[11px] text-blue-900'
                              },
                              [
                                e[147] ||
                                  (e[147] = a(
                                    'p',
                                    {
                                      class:
                                        'font-black uppercase tracking-wider mb-1 text-blue-700'
                                    },
                                    [
                                      a('i', { class: 'fas fa-info-circle mr-1' }),
                                      m('Bagaimana Rapor Tampil? ')
                                    ],
                                    -1
                                  )),
                                e[148] ||
                                  (e[148] = a(
                                    'p',
                                    { class: 'leading-relaxed' },
                                    [
                                      m(
                                        ' Rapor otomatis pakai template bawaan berdasar tipe lembaga — tidak perlu setup manual:'
                                      ),
                                      a('br'),
                                      a('b', null, '• Pra PTPT/PTPT/PPPH'),
                                      m(' → matrix Level × Khotam (½ Juz, 1 Juz, ..., 3 Juz)'),
                                      a('br'),
                                      a('b', null, '• TPQ Sore/Pagi'),
                                      m(
                                        ' → matrix Jilid (Pra-TK/A/B/C/D/E/Tahsin/Tahfidz) + nilai fashohah/tartil/adab'
                                      ),
                                      a('br'),
                                      a('b', null, '• Diniyah (sekolah formal)'),
                                      m(' → mata pelajaran per kelas + KKM'),
                                      a('br'),
                                      a('br'),
                                      a('b', null, 'Customize hanya bila perlu:'),
                                      m(
                                        ' ubah field nilai, tambah level, hapus jilid, dll. Setelah custom, template default tidak dipakai lagi untuk lembaga ini. '
                                      )
                                    ],
                                    -1
                                  )),
                                a(
                                  'button',
                                  {
                                    onClick: Be,
                                    class:
                                      'mt-2 text-[10px] font-black px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                  },
                                  [
                                    ...(e[146] ||
                                      (e[146] = [
                                        a('i', { class: 'fas fa-undo mr-1' }, null, -1),
                                        m('Reset Ke Template Default ', -1)
                                      ]))
                                  ]
                                )
                              ]
                            ),
                            a('div', null, [
                              e[150] ||
                                (e[150] = a(
                                  'label',
                                  {
                                    class:
                                      'text-[10px] font-bold text-slate-500 uppercase block mb-1'
                                  },
                                  'Tipe Schema (Customize)',
                                  -1
                                )),
                              a(
                                'select',
                                {
                                  value: W(),
                                  onChange: e[61] || (e[61] = (n) => Le(n.target.value)),
                                  class:
                                    'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white'
                                },
                                [
                                  ...(e[149] ||
                                    (e[149] = [
                                      a(
                                        'option',
                                        { value: 'sections' },
                                        'TPQ — Matrix Jilid (Pra-TK, A/B/C/D/E, Tahsin, Tahfidz)',
                                        -1
                                      ),
                                      a(
                                        'option',
                                        { value: 'perLevel' },
                                        'Pra PTPT/PTPT/PPPH — Level Baca × Khotam Matrix',
                                        -1
                                      ),
                                      a(
                                        'option',
                                        { value: 'perKelas' },
                                        'Diniyah/Sekolah Formal — Mapel KKM per Kelas',
                                        -1
                                      ),
                                      a(
                                        'option',
                                        { value: 'kosong' },
                                        'Tidak Punya Rapor (mis. TPQ Pagi)',
                                        -1
                                      )
                                    ]))
                                ],
                                40,
                                Kl
                              )
                            ]),
                            W() === 'perLevel'
                              ? (r(),
                                i('div', Tl, [
                                  e[156] ||
                                    (e[156] = a(
                                      'p',
                                      { class: 'text-[11px] font-bold text-purple-800' },
                                      'Field Nilai (kolom angka):',
                                      -1
                                    )),
                                  a('div', Ul, [
                                    (r(!0),
                                    i(
                                      K,
                                      null,
                                      T(
                                        ((t = l.value.raporSchemas[h.value]) == null
                                          ? void 0
                                          : t.fieldsNilai) || [],
                                        (n, S) => (
                                          r(),
                                          i(
                                            'span',
                                            {
                                              key: S,
                                              class:
                                                'bg-white border border-purple-200 px-2 py-1 rounded text-xs flex items-center gap-1'
                                            },
                                            [
                                              m(v(n.label) + ' ', 1),
                                              a(
                                                'button',
                                                {
                                                  onClick: (g) => Ie(S),
                                                  class: 'text-rose-500 hover:text-rose-700'
                                                },
                                                [
                                                  ...(e[151] ||
                                                    (e[151] = [
                                                      a(
                                                        'i',
                                                        { class: 'fas fa-times text-[10px]' },
                                                        null,
                                                        -1
                                                      )
                                                    ]))
                                                ],
                                                8,
                                                Al
                                              )
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    ))
                                  ]),
                                  a('div', Ll, [
                                    o(
                                      a(
                                        'input',
                                        {
                                          'onUpdate:modelValue':
                                            e[62] || (e[62] = (n) => (G.value = n)),
                                          onKeyup: ve(ge, ['enter']),
                                          type: 'text',
                                          placeholder: 'Tambah field nilai (Fashohah, Tartil, ...)',
                                          class:
                                            'flex-1 px-2 py-1 text-xs border border-slate-300 rounded bg-white'
                                        },
                                        null,
                                        544
                                      ),
                                      [[x, G.value]]
                                    ),
                                    a(
                                      'button',
                                      {
                                        onClick: ge,
                                        class:
                                          'bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded cursor-pointer'
                                      },
                                      '+ Tambah'
                                    )
                                  ]),
                                  e[157] ||
                                    (e[157] = a(
                                      'p',
                                      { class: 'text-[11px] font-bold text-purple-800 mt-3' },
                                      'Level x Khotam:',
                                      -1
                                    )),
                                  a('div', Il, [
                                    (r(!0),
                                    i(
                                      K,
                                      null,
                                      T(
                                        ((d = l.value.raporSchemas[h.value]) == null
                                          ? void 0
                                          : d.levels) || [],
                                        (n, S) => (
                                          r(),
                                          i(
                                            'div',
                                            {
                                              key: n.id,
                                              class: 'bg-white p-2 rounded border border-purple-100'
                                            },
                                            [
                                              a('div', Cl, [
                                                o(
                                                  a(
                                                    'input',
                                                    {
                                                      'onUpdate:modelValue': (g) => (n.label = g),
                                                      placeholder: 'Label (Level 1)',
                                                      class:
                                                        'text-xs px-2 py-1 border border-slate-300 rounded'
                                                    },
                                                    null,
                                                    8,
                                                    Ml
                                                  ),
                                                  [[x, n.label]]
                                                ),
                                                o(
                                                  a(
                                                    'input',
                                                    {
                                                      'onUpdate:modelValue': (g) =>
                                                        (n.levelBaca = g),
                                                      placeholder: 'Baca (½ Juz)',
                                                      class:
                                                        'text-xs px-2 py-1 border border-slate-300 rounded'
                                                    },
                                                    null,
                                                    8,
                                                    Dl
                                                  ),
                                                  [[x, n.levelBaca]]
                                                ),
                                                a(
                                                  'button',
                                                  {
                                                    onClick: (g) =>
                                                      l.value.raporSchemas[h.value].levels.splice(
                                                        S,
                                                        1
                                                      ),
                                                    class:
                                                      'text-rose-500 text-xs hover:bg-rose-50 px-2 rounded'
                                                  },
                                                  [
                                                    ...(e[152] ||
                                                      (e[152] = [
                                                        a(
                                                          'i',
                                                          { class: 'fas fa-trash mr-1' },
                                                          null,
                                                          -1
                                                        ),
                                                        m('Hapus Level ', -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  jl
                                                )
                                              ]),
                                              a('div', Bl, [
                                                e[155] ||
                                                  (e[155] = a(
                                                    'p',
                                                    {
                                                      class:
                                                        'text-[10px] font-black text-purple-700 uppercase tracking-wider'
                                                    },
                                                    'Khotam:',
                                                    -1
                                                  )),
                                                (r(!0),
                                                i(
                                                  K,
                                                  null,
                                                  T(
                                                    n.khotamList || [],
                                                    (g, L) => (
                                                      r(),
                                                      i(
                                                        'div',
                                                        {
                                                          key: g.id,
                                                          class:
                                                            'grid grid-cols-[1fr_60px_30px] gap-1 items-center bg-purple-50/60 rounded px-2 py-1'
                                                        },
                                                        [
                                                          o(
                                                            a(
                                                              'input',
                                                              {
                                                                'onUpdate:modelValue': (y) =>
                                                                  (g.labelKhotam = y),
                                                                placeholder: 'Khotam I',
                                                                class:
                                                                  'text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white'
                                                              },
                                                              null,
                                                              8,
                                                              Nl
                                                            ),
                                                            [[x, g.labelKhotam]]
                                                          ),
                                                          o(
                                                            a(
                                                              'input',
                                                              {
                                                                'onUpdate:modelValue': (y) =>
                                                                  (g.multiplier = y),
                                                                type: 'number',
                                                                min: '1',
                                                                max: '10',
                                                                class:
                                                                  'text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white text-center',
                                                                title: 'Multiplier (2x/3x/...)'
                                                              },
                                                              null,
                                                              8,
                                                              _l
                                                            ),
                                                            [
                                                              [
                                                                x,
                                                                g.multiplier,
                                                                void 0,
                                                                { number: !0 }
                                                              ]
                                                            ]
                                                          ),
                                                          a(
                                                            'button',
                                                            {
                                                              onClick: (y) =>
                                                                n.khotamList.splice(L, 1),
                                                              class:
                                                                'text-rose-500 text-[11px] hover:bg-rose-100 rounded',
                                                              title: 'Hapus khotam'
                                                            },
                                                            [
                                                              ...(e[153] ||
                                                                (e[153] = [
                                                                  a(
                                                                    'i',
                                                                    { class: 'fas fa-times' },
                                                                    null,
                                                                    -1
                                                                  )
                                                                ]))
                                                            ],
                                                            8,
                                                            $l
                                                          )
                                                        ]
                                                      )
                                                    )
                                                  ),
                                                  128
                                                )),
                                                a(
                                                  'button',
                                                  {
                                                    onClick: (g) => Ce(n),
                                                    class:
                                                      'text-[10px] bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-2 py-0.5 rounded'
                                                  },
                                                  [
                                                    ...(e[154] ||
                                                      (e[154] = [
                                                        a(
                                                          'i',
                                                          { class: 'fas fa-plus mr-0.5' },
                                                          null,
                                                          -1
                                                        ),
                                                        m('Tambah Khotam ', -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  Fl
                                                )
                                              ])
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                    a(
                                      'button',
                                      {
                                        onClick: Me,
                                        class:
                                          'text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-3 py-1 rounded'
                                      },
                                      '+ Tambah Level'
                                    )
                                  ])
                                ]))
                              : W() === 'perKelas'
                                ? (r(),
                                  i('div', Rl, [
                                    e[160] ||
                                      (e[160] = a(
                                        'p',
                                        { class: 'text-[11px] font-bold text-purple-800' },
                                        'Jenjang Kelas x Mata Pelajaran:',
                                        -1
                                      )),
                                    (r(!0),
                                    i(
                                      K,
                                      null,
                                      T(
                                        ((b = l.value.raporSchemas[h.value]) == null
                                          ? void 0
                                          : b.jenjang) || [],
                                        (n, S) => (
                                          r(),
                                          i(
                                            'div',
                                            {
                                              key: n.kelas,
                                              class: 'bg-white p-2 rounded border border-purple-100'
                                            },
                                            [
                                              a('div', Hl, [
                                                o(
                                                  a(
                                                    'input',
                                                    {
                                                      'onUpdate:modelValue': (g) => (n.kelas = g),
                                                      class:
                                                        'text-xs font-bold px-2 py-1 border border-slate-300 rounded w-32',
                                                      placeholder: 'Kelas (TK A)'
                                                    },
                                                    null,
                                                    8,
                                                    Ql
                                                  ),
                                                  [[x, n.kelas]]
                                                ),
                                                a(
                                                  'button',
                                                  {
                                                    onClick: (g) =>
                                                      l.value.raporSchemas[h.value].jenjang.splice(
                                                        S,
                                                        1
                                                      ),
                                                    class: 'text-rose-500 text-xs'
                                                  },
                                                  [
                                                    ...(e[158] ||
                                                      (e[158] = [
                                                        a('i', { class: 'fas fa-trash' }, null, -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  zl
                                                )
                                              ]),
                                              a('div', Ol, [
                                                (r(!0),
                                                i(
                                                  K,
                                                  null,
                                                  T(
                                                    n.mapel || [],
                                                    (g, L) => (
                                                      r(),
                                                      i(
                                                        'div',
                                                        {
                                                          key: L,
                                                          class:
                                                            'flex items-center gap-1 bg-slate-50 p-1 rounded'
                                                        },
                                                        [
                                                          o(
                                                            a(
                                                              'input',
                                                              {
                                                                'onUpdate:modelValue': (y) =>
                                                                  (g.nama = y),
                                                                class:
                                                                  'flex-1 text-[11px] px-1 py-0.5 border-0 bg-transparent',
                                                                placeholder: 'Mapel'
                                                              },
                                                              null,
                                                              8,
                                                              Jl
                                                            ),
                                                            [[x, g.nama]]
                                                          ),
                                                          o(
                                                            a(
                                                              'input',
                                                              {
                                                                'onUpdate:modelValue': (y) =>
                                                                  (g.kkm = y),
                                                                type: 'number',
                                                                min: '0',
                                                                max: '100',
                                                                class:
                                                                  'w-12 text-[11px] px-1 py-0.5 border border-slate-300 rounded bg-white',
                                                                title: 'KKM'
                                                              },
                                                              null,
                                                              8,
                                                              El
                                                            ),
                                                            [[x, g.kkm, void 0, { number: !0 }]]
                                                          ),
                                                          a(
                                                            'button',
                                                            {
                                                              onClick: (y) => n.mapel.splice(L, 1),
                                                              class: 'text-rose-400 text-[10px]'
                                                            },
                                                            [
                                                              ...(e[159] ||
                                                                (e[159] = [
                                                                  a(
                                                                    'i',
                                                                    { class: 'fas fa-times' },
                                                                    null,
                                                                    -1
                                                                  )
                                                                ]))
                                                            ],
                                                            8,
                                                            ql
                                                          )
                                                        ]
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ]),
                                              a(
                                                'button',
                                                {
                                                  onClick: () => {
                                                    ;((n.mapel = n.mapel || []),
                                                      n.mapel.push({
                                                        id: 'mapel_' + Date.now(),
                                                        nama: '',
                                                        kkm: 80
                                                      }))
                                                  },
                                                  class:
                                                    'text-[10px] text-purple-700 font-bold mt-1'
                                                },
                                                '+ Tambah Mapel',
                                                8,
                                                Gl
                                              )
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                    a(
                                      'button',
                                      {
                                        onClick: De,
                                        class:
                                          'text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-3 py-1 rounded'
                                      },
                                      '+ Tambah Jenjang'
                                    )
                                  ]))
                                : W() === 'sections'
                                  ? (r(),
                                    i('div', Wl, [
                                      e[167] ||
                                        (e[167] = a(
                                          'p',
                                          { class: 'text-[11px] font-bold text-purple-800' },
                                          'Sections (per kelas/jilid):',
                                          -1
                                        )),
                                      (r(!0),
                                      i(
                                        K,
                                        null,
                                        T(
                                          ((p = l.value.raporSchemas[h.value]) == null
                                            ? void 0
                                            : p.sections) || [],
                                          (n, S) => (
                                            r(),
                                            i(
                                              'div',
                                              {
                                                key: n.id,
                                                class:
                                                  'bg-white p-2 rounded border border-purple-100 space-y-2'
                                              },
                                              [
                                                a('div', Xl, [
                                                  o(
                                                    a(
                                                      'input',
                                                      {
                                                        'onUpdate:modelValue': (g) => (n.title = g),
                                                        class:
                                                          'text-xs font-bold px-2 py-1 border border-slate-300 rounded flex-1',
                                                        placeholder: 'Title section (Jilid)'
                                                      },
                                                      null,
                                                      8,
                                                      Yl
                                                    ),
                                                    [[x, n.title]]
                                                  ),
                                                  a(
                                                    'button',
                                                    {
                                                      onClick: (g) =>
                                                        l.value.raporSchemas[
                                                          h.value
                                                        ].sections.splice(S, 1),
                                                      class:
                                                        'text-rose-500 text-xs hover:bg-rose-50 px-2 rounded'
                                                    },
                                                    [
                                                      ...(e[161] ||
                                                        (e[161] = [
                                                          a(
                                                            'i',
                                                            { class: 'fas fa-trash' },
                                                            null,
                                                            -1
                                                          )
                                                        ]))
                                                    ],
                                                    8,
                                                    Zl
                                                  )
                                                ]),
                                                a('div', es, [
                                                  e[163] ||
                                                    (e[163] = a(
                                                      'p',
                                                      {
                                                        class:
                                                          'text-[10px] font-black text-purple-700 uppercase tracking-wider'
                                                      },
                                                      'Rows (Jilid/Kelas):',
                                                      -1
                                                    )),
                                                  a('div', as, [
                                                    (r(!0),
                                                    i(
                                                      K,
                                                      null,
                                                      T(
                                                        n.rows || [],
                                                        (g, L) => (
                                                          r(),
                                                          i(
                                                            'span',
                                                            {
                                                              key: L,
                                                              class:
                                                                'bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1'
                                                            },
                                                            [
                                                              o(
                                                                a(
                                                                  'input',
                                                                  {
                                                                    'onUpdate:modelValue': (y) =>
                                                                      (n.rows[L] = y),
                                                                    class:
                                                                      'bg-transparent border-0 outline-none text-[11px] w-16'
                                                                  },
                                                                  null,
                                                                  8,
                                                                  ts
                                                                ),
                                                                [[x, n.rows[L]]]
                                                              ),
                                                              a(
                                                                'button',
                                                                {
                                                                  onClick: (y) =>
                                                                    n.rows.splice(L, 1),
                                                                  class: 'text-rose-400 text-[10px]'
                                                                },
                                                                [
                                                                  ...(e[162] ||
                                                                    (e[162] = [
                                                                      a(
                                                                        'i',
                                                                        { class: 'fas fa-times' },
                                                                        null,
                                                                        -1
                                                                      )
                                                                    ]))
                                                                ],
                                                                8,
                                                                ls
                                                              )
                                                            ]
                                                          )
                                                        )
                                                      ),
                                                      128
                                                    )),
                                                    a(
                                                      'button',
                                                      {
                                                        onClick: () => {
                                                          ;((n.rows = n.rows || []),
                                                            n.rows.push('Baru'))
                                                        },
                                                        class:
                                                          'bg-purple-200 hover:bg-purple-300 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded'
                                                      },
                                                      '+ Row',
                                                      8,
                                                      ss
                                                    )
                                                  ])
                                                ]),
                                                a('div', os, [
                                                  e[166] ||
                                                    (e[166] = a(
                                                      'p',
                                                      {
                                                        class:
                                                          'text-[10px] font-black text-purple-700 uppercase tracking-wider'
                                                      },
                                                      'Fields (Kolom Nilai):',
                                                      -1
                                                    )),
                                                  (r(!0),
                                                  i(
                                                    K,
                                                    null,
                                                    T(
                                                      n.fields || [],
                                                      (g, L) => (
                                                        r(),
                                                        i(
                                                          'div',
                                                          {
                                                            key: L,
                                                            class:
                                                              'grid grid-cols-[1fr_90px_30px] gap-1 items-center bg-purple-50/60 rounded px-2 py-1'
                                                          },
                                                          [
                                                            o(
                                                              a(
                                                                'input',
                                                                {
                                                                  'onUpdate:modelValue': (y) =>
                                                                    (g.label = y),
                                                                  placeholder: 'Label',
                                                                  class:
                                                                    'text-[11px] px-1.5 py-0.5 border border-slate-300 rounded bg-white'
                                                                },
                                                                null,
                                                                8,
                                                                rs
                                                              ),
                                                              [[x, g.label]]
                                                            ),
                                                            o(
                                                              a(
                                                                'select',
                                                                {
                                                                  'onUpdate:modelValue': (y) =>
                                                                    (g.type = y),
                                                                  class:
                                                                    'text-[11px] px-1 py-0.5 border border-slate-300 rounded bg-white'
                                                                },
                                                                [
                                                                  ...(e[164] ||
                                                                    (e[164] = [
                                                                      a(
                                                                        'option',
                                                                        { value: 'number' },
                                                                        'Angka',
                                                                        -1
                                                                      ),
                                                                      a(
                                                                        'option',
                                                                        { value: 'text' },
                                                                        'Teks',
                                                                        -1
                                                                      ),
                                                                      a(
                                                                        'option',
                                                                        { value: 'date' },
                                                                        'Tanggal',
                                                                        -1
                                                                      ),
                                                                      a(
                                                                        'option',
                                                                        { value: 'auto_predikat' },
                                                                        'Predikat (auto)',
                                                                        -1
                                                                      )
                                                                    ]))
                                                                ],
                                                                8,
                                                                is
                                                              ),
                                                              [[Y, g.type]]
                                                            ),
                                                            a(
                                                              'button',
                                                              {
                                                                onClick: (y) =>
                                                                  n.fields.splice(L, 1),
                                                                class: 'text-rose-500 text-[11px]'
                                                              },
                                                              [
                                                                ...(e[165] ||
                                                                  (e[165] = [
                                                                    a(
                                                                      'i',
                                                                      { class: 'fas fa-times' },
                                                                      null,
                                                                      -1
                                                                    )
                                                                  ]))
                                                              ],
                                                              8,
                                                              ns
                                                            )
                                                          ]
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                  a(
                                                    'button',
                                                    {
                                                      onClick: () => {
                                                        ;((n.fields = n.fields || []),
                                                          n.fields.push({
                                                            id: 'f_' + Date.now(),
                                                            label: 'Baru',
                                                            type: 'number'
                                                          }))
                                                      },
                                                      class:
                                                        'bg-purple-200 hover:bg-purple-300 text-[10px] font-bold px-2 py-0.5 rounded'
                                                    },
                                                    '+ Field',
                                                    8,
                                                    ds
                                                  )
                                                ])
                                              ]
                                            )
                                          )
                                        ),
                                        128
                                      ))
                                    ]))
                                  : V('', !0)
                          ]))
                        : V('', !0),
                      e[168] ||
                        (e[168] = a(
                          'p',
                          { class: 'text-[11px] text-slate-500 italic' },
                          [
                            a('i', { class: 'fas fa-info-circle mr-1' }),
                            m(
                              'Schema ini dipakai di Rapor Semester (perLevel/perKelas/sections) + Predikat auto-compute. Save semua via tombol Simpan di bawah. '
                            )
                          ],
                          -1
                        ))
                    ])
                  ]
                }),
                _: 1
              },
              512
            ),
            [[U, w.value === 'raporSchema']]
          ),
          a('div', us, [
            u(
              O,
              { variant: 'secondary', size: 'sm', onClick: Ne },
              {
                default: k(() => [
                  ...(e[169] ||
                    (e[169] = [a('i', { class: 'fas fa-undo mr-1' }, null, -1), m('Reset ', -1)]))
                ]),
                _: 1
              }
            ),
            u(
              O,
              { variant: 'primary', size: 'sm', loading: q.value, onClick: _e },
              {
                default: k(() => [
                  ...(e[170] ||
                    (e[170] = [
                      a('i', { class: 'fas fa-save mr-1' }, null, -1),
                      m('Simpan Semua ', -1)
                    ]))
                ]),
                _: 1
              },
              8,
              ['loading']
            )
          ])
        ])
      )
    }
  }
export { cs as default }
