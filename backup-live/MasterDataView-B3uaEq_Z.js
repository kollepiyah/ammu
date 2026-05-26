const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = ['assets/storage-BBNevPRC.js', 'assets/index-CPbTnm_Q.js', 'assets/index-CbTM4Qhb.css'])
) => i.map((i) => d[i])
import {
  Z as w,
  q as y,
  l as h,
  au as ke,
  ae as We,
  I as ne,
  a2 as Ye,
  an as Xe,
  a3 as Ze,
  h as i,
  i as de,
  e as t,
  F as q,
  U as L,
  E as N,
  j as r,
  f as et,
  X as tt,
  ar as J,
  ak as V,
  a4 as n,
  g as T,
  at,
  k as H,
  aq as ee,
  ac as st,
  Q as M,
  P as he,
  d as te,
  W as rt,
  _ as lt,
  ad as ot,
  L as l
} from './index-CPbTnm_Q.js'
import { u as it } from './useToast-BjwjYk11.js'
import nt from './LembagaView-Du7bUNB6.js'
import dt from './KelasView-fzSD6IKO.js'
import { u as ut } from './useConfirm-DjSfx6QZ.js'
import pt from './GuruView-5U6fDRqu.js'
import bt from './SantriView-DZ4zFFpG.js'
import { g as ae, L as ve, u as gt } from './useLembaga-8ypq4SFU.js'
import { u as ct } from './useSantri-BrAe1mw4.js'
import { u as mt } from './useGuru-BEk_ofri.js'
import './useExcel-D_0sjauS.js'
import './pdfBuilder-C97mFJ0V.js'
import './pdf-CfElz_X6.js'
import './format-BMPXVxa_.js'
function _e(o) {
  const p = String(o || '')
    .trim()
    .toLowerCase()
  return p === 'tpq pagi' || p === 'tpq sore'
}
function Pe(o) {
  const p = String(o || '')
    .trim()
    .toLowerCase()
  return p === 'tpq pagi' ? 'Pagi' : p === 'tpq sore' ? 'Sore' : null
}
function ye(o) {
  const p = { totalToMigrate: 0, pagi: 0, sore: 0, examples: [], alreadyMigrated: 0 }
  for (const x of o || []) {
    const u = String(x.lembaga || '').trim()
    if (_e(u)) {
      p.totalToMigrate++
      const c = Pe(u)
      ;(c === 'Pagi' ? p.pagi++ : c === 'Sore' && p.sore++,
        p.examples.length < 5 &&
          p.examples.push({
            id: x.id,
            nama: x.nama,
            before: { lembaga: u, shift: x.shift || null },
            after: { lembaga: 'TPQ', shift: c }
          }))
    } else u === 'TPQ' && x.shift && p.alreadyMigrated++
  }
  return p
}
async function xt(o, p = {}) {
  const { onProgress: x, dryRun: u = !1 } = p,
    c = (o || []).filter((d) => _e(d.lembaga)),
    _ = { ok: 0, fail: 0, errors: [], total: c.length, dryRun: u }
  for (let d = 0; d < c.length; d++) {
    const m = c[d],
      f = Pe(m.lembaga)
    if (u) _.ok++
    else
      try {
        const b = Number(m.id),
          v = {
            id: Number.isFinite(b) ? b : String(m.id),
            nama: String(m.nama || '').trim() || 'Tanpa Nama',
            lembaga: 'TPQ',
            shift: f,
            _migrated_tpq_shift_at: new Date().toISOString()
          }
        ;(await w(y(h, 'santri', String(m.id)), v, { merge: !0 }), _.ok++)
      } catch (b) {
        ;(_.fail++,
          _.errors.push({ id: m.id, nama: m.nama, err: b.message }),
          console.error(
            `[tpqMigrate] FAIL santri.id=${m.id} nama=${m.nama} lembaga=${m.lembaga} →`,
            b.message,
            b
          ))
      }
    ;(typeof x == 'function' && x(d + 1, c.length),
      !u && d > 0 && d % 50 === 0 && (await new Promise((b) => setTimeout(b, 200))))
  }
  return (
    _.errors.length > 0 &&
      (console.error(`[tpqMigrate] Selesai dgn ${_.errors.length} errors:`),
      console.table(_.errors)),
    _
  )
}
function Te(o) {
  if (Array.isArray(o.lembaga_refs) && o.lembaga_refs.length > 0) return o.lembaga_refs
  const p = []
  return (
    o.lembaga &&
      p.push({
        group: ae(o.lembaga) || 'qiraati',
        lembaga: o.lembaga,
        shift: o.shift_qiraati || null,
        kelas: o.kelas || null
      }),
    o.lembaga_sekolah &&
      o.lembaga_sekolah !== o.lembaga &&
      p.push({
        group: ae(o.lembaga_sekolah) || 'sekolah',
        lembaga: o.lembaga_sekolah,
        kelas: o.kelas_sekolah || null
      }),
    o.is_mukim && p.unshift({ group: 'mahad', lembaga: "Ma'had" }),
    p
  )
}
function Me(o) {
  if (Array.isArray(o.lembaga_refs) && o.lembaga_refs.length > 0) return o.lembaga_refs
  const p = []
  if (
    (o.lembaga &&
      p.push({
        group: ae(o.lembaga) || 'qiraati',
        lembaga: o.lembaga,
        shift: o.shift || null,
        jabatan_di_sini: o.jabatan || 'Guru',
        kelas_diajar: Array.isArray(o.kelas_diajar) ? o.kelas_diajar : []
      }),
    o.lembaga_sekolah &&
      o.lembaga_sekolah !== o.lembaga &&
      p.push({
        group: ae(o.lembaga_sekolah) || 'sekolah',
        lembaga: o.lembaga_sekolah,
        jabatan_di_sini: o.jabatan_sekolah || 'Guru',
        kelas_diajar: Array.isArray(o.kelas_diajar_sekolah) ? o.kelas_diajar_sekolah : []
      }),
    Array.isArray(o.jabatan_tambahan) && o.jabatan_tambahan.length > 0)
  ) {
    for (const x of o.jabatan_tambahan)
      if (typeof x == 'string' && x && !p.some((u) => u.jabatan_di_sini === x)) {
        const u = /admin|supervisi|pj/i.test(x)
          ? 'Yayasan'
          : /keamanan|kebersihan/i.test(x)
            ? 'Sarana Prasarana'
            : null
        u && p.push({ group: 'non-lembaga', lembaga: u, jabatan_di_sini: x })
      }
  }
  return p
}
function Se(o) {
  const p = {},
    x = String(o.lembaga || '').trim()
  let u = null
  for (const [c, _] of Object.entries(ve))
    if ((_.variants || []).includes(x)) {
      u = c
      break
    }
  if (u) {
    const c = ve[u]
    ;(o.group || (p.group = c.group),
      o.group_key || (p.group_key = u),
      o.kepala_jabatan || (p.kepala_jabatan = c.kepala_jabatan))
  }
  return p
}
function we({ santriList: o, guruList: p, lembagaList: x }) {
  const u = [],
    c = []
  for (const f of o || [])
    if (Array.isArray(f.lembaga_refs) && f.lembaga_refs.length > 0) c.push(f.id)
    else {
      const b = Te(f)
      b.length > 0 && u.push({ id: f.id, nama: f.nama, refs: b })
    }
  const _ = [],
    d = []
  for (const f of p || [])
    if (Array.isArray(f.lembaga_refs) && f.lembaga_refs.length > 0) d.push(f.id)
    else {
      const b = Me(f)
      b.length > 0 && _.push({ id: f.id, nama: f.nama, refs: b })
    }
  const m = []
  for (const f of x || []) {
    const b = Se(f)
    Object.keys(b).length > 0 && m.push({ lembaga: f.lembaga, meta: b })
  }
  return {
    santri: {
      total: (o || []).length,
      toMigrate: u.length,
      skipped: c.length,
      examples: u.slice(0, 5)
    },
    guru: {
      total: (p || []).length,
      toMigrate: _.length,
      skipped: d.length,
      examples: _.slice(0, 5)
    },
    lembaga: { total: (x || []).length, toMigrate: m.length, examples: m.slice(0, 5) },
    totalDocs: u.length + _.length + (m.length > 0 ? 1 : 0)
  }
}
async function ft({ santriList: o, guruList: p, lembagaList: x, onProgress: u } = {}) {
  const c = {
      santri: { ok: 0, fail: 0 },
      guru: { ok: 0, fail: 0 },
      lembaga: { ok: 0, fail: 0 },
      errors: []
    },
    _ = new Date().toISOString(),
    d = []
  for (const b of o || []) {
    if (Array.isArray(b.lembaga_refs) && b.lembaga_refs.length > 0) continue
    const v = Te(b)
    v.length !== 0 && d.push({ id: b.id, refs: v })
  }
  let m = 0
  for (; m < d.length; ) {
    const b = ke(h),
      v = d.slice(m, m + 400)
    for (const g of v)
      try {
        b.set(
          y(h, 'santri', String(g.id)),
          { lembaga_refs: g.refs, _migrated_v21_10_at: _ },
          { merge: !0 }
        )
      } catch (B) {
        c.errors.push(`santri ${g.id}: ${B.message}`)
      }
    try {
      ;(await b.commit(), (c.santri.ok += v.length))
    } catch (g) {
      ;((c.santri.fail += v.length),
        c.errors.push(`santri batch ${m}-${m + v.length}: ${g.message}`))
    }
    ;((m += v.length), u && u({ phase: 'santri', i: c.santri.ok + c.santri.fail, total: d.length }))
  }
  const f = []
  for (const b of p || []) {
    if (Array.isArray(b.lembaga_refs) && b.lembaga_refs.length > 0) continue
    const v = Me(b)
    v.length !== 0 && f.push({ id: b.id, refs: v })
  }
  for (m = 0; m < f.length; ) {
    const b = ke(h),
      v = f.slice(m, m + 400)
    for (const g of v)
      try {
        b.set(
          y(h, 'guru', String(g.id)),
          { lembaga_refs: g.refs, _migrated_v21_10_at: _ },
          { merge: !0 }
        )
      } catch (B) {
        c.errors.push(`guru ${g.id}: ${B.message}`)
      }
    try {
      ;(await b.commit(), (c.guru.ok += v.length))
    } catch (g) {
      ;((c.guru.fail += v.length), c.errors.push(`guru batch ${m}-${m + v.length}: ${g.message}`))
    }
    ;((m += v.length), u && u({ phase: 'guru', i: c.guru.ok + c.guru.fail, total: f.length }))
  }
  if (x && x.length > 0) {
    try {
      const b = x.map((v) => {
        const g = Se(v)
        return Object.keys(g).length > 0 ? { ...v, ...g } : v
      })
      ;(await w(y(h, 'master', 'lembaga'), { list: b, _migrated_v21_10_at: _ }, { merge: !0 }),
        (c.lembaga.ok = x.length))
    } catch (b) {
      ;((c.lembaga.fail = x.length), c.errors.push(`lembaga master: ${b.message}`))
    }
    u && u({ phase: 'lembaga', i: x.length, total: x.length })
  }
  return c
}
const kt = { class: 'p-4 md:p-6 max-w-6xl mx-auto space-y-4' },
  ht = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-2'
  },
  vt = { class: 'flex flex-wrap gap-1.5' },
  yt = ['onClick'],
  wt = { key: 0, class: 'space-y-3' },
  _t = {
    class:
      'bg-white dark:bg-slate-800 rounded-xl p-2 md:p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap gap-2'
  },
  Pt = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  Tt = {
    key: 1,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4'
  },
  Mt = ['disabled'],
  St = { key: 0, class: 'text-center text-slate-400 italic text-xs py-6' },
  Rt = { key: 1, class: 'space-y-1' },
  At = { class: 'flex-1 text-sm font-bold text-slate-800 dark:text-white' },
  Dt = ['onClick'],
  jt = ['onClick'],
  Ct = {
    key: 2,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  $t = {
    key: 3,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'
  },
  qt = { key: 4, class: 'space-y-4' },
  Lt = {
    class:
      'bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'
  },
  Bt = { class: 'text-[11px] text-slate-600 dark:text-slate-400 mt-2' },
  Gt = {
    class:
      'bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700'
  },
  Qt = { class: 'space-y-2' },
  Kt = ['onUpdate:modelValue'],
  Nt = ['onUpdate:modelValue'],
  Ut = ['onUpdate:modelValue'],
  Et = ['onUpdate:modelValue'],
  Ot = ['onClick'],
  Ft = {
    class:
      'bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700'
  },
  It = { class: 'flex gap-2 flex-wrap' },
  Jt = {
    class:
      'bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-4 border border-fuchsia-200 dark:border-fuchsia-700'
  },
  Vt = {
    class:
      'bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700'
  },
  Ht = { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
  zt = {
    class:
      'bg-white dark:bg-slate-800 rounded-lg p-3 border border-amber-100 dark:border-amber-700/50'
  },
  Wt = ['src'],
  Yt = {
    class:
      'bg-white dark:bg-slate-800 rounded-lg p-3 border border-amber-100 dark:border-amber-700/50'
  },
  Xt = ['src'],
  Zt = ['disabled'],
  ea = { class: 'text-[11px] text-slate-500 italic text-center pt-2' },
  ta = { key: 5, class: 'space-y-4' },
  aa = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  sa = { key: 0, class: 'text-center py-8 text-xs text-slate-400 italic' },
  ra = { key: 1, class: 'space-y-3' },
  la = {
    class: 'flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200 mb-2'
  },
  oa = ['value', 'onInput', 'placeholder'],
  ia = ['disabled'],
  na = { class: 'text-[11px] text-slate-500 italic text-center pt-2' },
  da = {
    key: 6,
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  ua = { class: 'flex gap-2 mb-3' },
  pa = ['disabled'],
  ba = {
    key: 0,
    class: 'text-center text-slate-400 italic text-xs py-8 bg-slate-50 dark:bg-slate-900 rounded-lg'
  },
  ga = { key: 1, class: 'space-y-2' },
  ca = { class: 'text-sm font-bold text-slate-800 dark:text-white' },
  ma = {
    key: 0,
    class:
      'ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase font-black'
  },
  xa = { class: 'flex gap-1' },
  fa = ['onClick'],
  ka = ['onClick'],
  ha = ['onClick'],
  va = { key: 7, class: 'space-y-4' },
  ya = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-purple-300 dark:border-purple-700 shadow-sm'
  },
  wa = { class: 'flex flex-wrap gap-2' },
  _a = ['disabled'],
  Pa = ['disabled'],
  Ta = { key: 0, class: 'mt-3 text-xs font-bold text-purple-700' },
  Ma = { key: 1, class: 'mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs' },
  Sa = { class: 'grid grid-cols-3 gap-2' },
  Ra = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  Aa = { class: 'text-xl font-black text-purple-700' },
  Da = { class: 'text-[9px] text-slate-400' },
  ja = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  Ca = { class: 'text-xl font-black text-blue-700' },
  $a = { class: 'text-[9px] text-slate-400' },
  qa = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  La = { class: 'text-xl font-black text-emerald-700' },
  Ba = { key: 0, class: 'mt-3' },
  Ga = { class: 'text-[10px] font-bold text-slate-600 uppercase' },
  Qa = { class: 'mt-1 space-y-1' },
  Ka = { class: 'font-bold' },
  Na = { class: 'text-emerald-600' },
  Ua = { class: 'text-slate-500' },
  Ea = { key: 1, class: 'mt-2' },
  Oa = { class: 'text-[10px] font-bold text-slate-600 uppercase' },
  Fa = { class: 'mt-1 space-y-1' },
  Ia = { class: 'font-bold' },
  Ja = { class: 'text-emerald-600' },
  Va = { class: 'text-slate-500' },
  Ha = {
    key: 2,
    class:
      'mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-xs'
  },
  za = { class: 'grid grid-cols-3 gap-2 mt-2' },
  Wa = { class: 'bg-white rounded p-2' },
  Ya = { class: 'font-black text-emerald-700' },
  Xa = { class: 'text-rose-600 text-[10px]' },
  Za = { class: 'bg-white rounded p-2' },
  es = { class: 'font-black text-emerald-700' },
  ts = { class: 'text-rose-600 text-[10px]' },
  as = { class: 'bg-white rounded p-2' },
  ss = { class: 'font-black text-emerald-700' },
  rs = { class: 'text-rose-600 text-[10px]' },
  ls = { key: 0, class: 'mt-2 bg-rose-50 border border-rose-200 rounded p-2' },
  os = { class: 'text-[10px] font-bold text-rose-800' },
  is = { class: 'mt-1 space-y-0.5 max-h-32 overflow-y-auto' },
  ns = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border-2 border-amber-300 dark:border-amber-700 shadow-sm'
  },
  ds = { class: 'flex flex-wrap gap-2' },
  us = ['disabled'],
  ps = ['disabled'],
  bs = { key: 0, class: 'mt-3 text-xs font-bold text-amber-700' },
  gs = { key: 1, class: 'mt-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-xs' },
  cs = { class: 'grid grid-cols-2 md:grid-cols-4 gap-2' },
  ms = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  xs = { class: 'text-xl font-black text-rose-700' },
  fs = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  ks = { class: 'text-xl font-black text-blue-700' },
  hs = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  vs = { class: 'text-xl font-black text-purple-700' },
  ys = {
    class: 'bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700'
  },
  ws = { class: 'text-xl font-black text-emerald-700' },
  _s = { key: 0, class: 'mt-3' },
  Ps = { class: 'text-[10px] font-bold text-slate-600 uppercase' },
  Ts = { class: 'mt-1 space-y-1' },
  Ms = { class: 'font-bold' },
  Ss = { class: 'text-rose-600' },
  Rs = { class: 'text-emerald-600' },
  As = {
    key: 2,
    class:
      'mt-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-xs'
  },
  Ds = { class: 'font-black text-emerald-800 dark:text-emerald-200' },
  js = { key: 0, class: 'text-rose-700 mt-1 text-[10px]' },
  Cs = {
    class:
      'bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm'
  },
  $s = {
    key: 0,
    class:
      'text-center text-slate-400 italic text-xs py-10 bg-slate-50 dark:bg-slate-900 rounded-lg'
  },
  qs = { key: 1, class: 'max-h-[60vh] overflow-y-auto' },
  Ls = { class: 'w-full text-xs' },
  Bs = { class: 'p-2 font-mono text-[10px] text-slate-700 dark:text-slate-300' },
  Gs = { class: 'p-2 font-bold text-slate-800 dark:text-white' },
  Qs = { class: 'p-2' },
  Ks = {
    class:
      'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-bold text-[10px]'
  },
  Ns = { class: 'p-2 text-slate-600 dark:text-slate-300 text-[11px] max-w-md truncate' },
  Us = 'Aqidah Akhlak, Fiqh, Tarikh, Bahasa Arab',
  ar = {
    __name: 'MasterDataView',
    setup(o) {
      const p = st(),
        x = ot(),
        u = We(),
        c = M([])
      ne(() => {
        Ye('audit_log', (a) => {
          const e = [...(a || [])]
            .sort((P, s) => {
              var j, fe
              const k = ((j = P.timestamp) == null ? void 0 : j.seconds) || P.timestamp || 0
              return (((fe = s.timestamp) == null ? void 0 : fe.seconds) || s.timestamp || 0) - k
            })
            .slice(0, 50)
          c.value = e
        })
      })
      function _(a) {
        if (!a) return '-'
        try {
          return (a.seconds ? new Date(a.seconds * 1e3) : new Date(a)).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        } catch {
          return String(a).slice(0, 16)
        }
      }
      const d = it(),
        { lembagaRaw: m } = gt(),
        { santriRaw: f } = ct(),
        { guruRaw: b } = mt(),
        v = ut(),
        g = M(null),
        B = M(!1),
        z = M({ phase: '', i: 0, total: 0 }),
        $ = M(null)
      function Re() {
        ;((g.value = we({
          santriList: f.value || [],
          guruList: b.value || [],
          lembagaList: m.value || []
        })),
          ($.value = null))
      }
      async function Ae() {
        if (!g.value || g.value.totalDocs === 0) {
          d.warning('Jalankan Dry-Run dulu, atau tidak ada data untuk migrasi.')
          return
        }
        if (
          await v({
            title: 'Migrasi v.21.10 Schema?',
            message: `${g.value.santri.toMigrate} santri + ${g.value.guru.toMigrate} guru + ${g.value.lembaga.toMigrate} lembaga akan di-update dgn lembaga_refs[] + group/kepala_jabatan. Idempotent (skip kalau sudah punya). Field _migrated_v21_10_at akan ditambahkan.`,
            confirmText: 'Lanjutkan',
            danger: !0
          })
        ) {
          ;((B.value = !0), (z.value = { phase: 'start', i: 0, total: g.value.totalDocs }))
          try {
            const e = await ft({
              santriList: f.value || [],
              guruList: b.value || [],
              lembagaList: m.value || [],
              onProgress: (k) => {
                z.value = k
              }
            })
            $.value = e
            const P = e.santri.ok + e.guru.ok + e.lembaga.ok,
              s = e.santri.fail + e.guru.fail + e.lembaga.fail
            ;(s > 0
              ? d.warning(`Migrasi selesai: ${P} OK, ${s} gagal. Cek errors.`)
              : d.success(`Migrasi v.21.10 sukses: ${P} dokumen ter-update`),
              (g.value = we({
                santriList: f.value || [],
                guruList: b.value || [],
                lembagaList: m.value || []
              })))
          } catch (e) {
            d.error('Gagal migrasi: ' + (e.message || e))
          } finally {
            B.value = !1
          }
        }
      }
      const R = M(null),
        W = M(!1),
        Z = M({ i: 0, total: 0 }),
        G = M(null)
      function De() {
        ;((R.value = ye(f.value || [])), (G.value = null))
      }
      async function je() {
        if (!R.value || R.value.totalToMigrate === 0) {
          d.warning('Jalankan Dry-Run dulu, atau tidak ada data untuk migrasi.')
          return
        }
        if (
          await v({
            title: 'Migrasi TPQ Shift?',
            message: `${R.value.totalToMigrate} santri akan di-update: lembaga "TPQ Pagi"/"TPQ Sore" → "TPQ" + field shift. Tidak bisa di-undo otomatis (data lama disimpan _migrated_tpq_shift_at).`,
            confirmText: 'Lanjutkan',
            danger: !0
          })
        ) {
          ;((W.value = !0), (Z.value = { i: 0, total: R.value.totalToMigrate }))
          try {
            const e = await xt(f.value || [], {
              onProgress: (P, s) => {
                Z.value = { i: P, total: s }
              }
            })
            ;((G.value = e),
              e.fail > 0
                ? d.warning(`Migrasi selesai: ${e.ok} OK, ${e.fail} gagal`)
                : d.success(`Migrasi sukses: ${e.ok} santri ter-update`),
              (R.value = ye(f.value || [])))
          } catch (e) {
            d.error('Gagal migrasi: ' + (e.message || e))
          } finally {
            W.value = !1
          }
        }
      }
      const se = [
          { id: 'lembaga', label: 'Lembaga/Divisi', icon: 'fa-sitemap', color: 'blue' },
          { id: 'tp', label: 'Tahun Pelajaran', icon: 'fa-calendar', color: 'orange' },
          { id: 'guru', label: 'Guru/Pegawai', icon: 'fa-user-tie', color: 'purple' },
          { id: 'santri', label: 'Data Santri', icon: 'fa-user-graduate', color: 'teal' },
          { id: 'audit', label: 'Audit Data', icon: 'fa-stethoscope', color: 'rose' }
        ],
        ue = {
          blue: {
            active: 'bg-blue-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
          },
          cyan: {
            active: 'bg-cyan-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
          },
          purple: {
            active: 'bg-purple-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'
          },
          teal: {
            active: 'bg-teal-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
          },
          emerald: {
            active: 'bg-emerald-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
          },
          amber: {
            active: 'bg-amber-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
          },
          rose: {
            active: 'bg-rose-600 text-white shadow-md',
            inactive: 'text-slate-600 hover:bg-rose-50 hover:text-rose-700'
          }
        }
      function Ce(a) {
        const e = ue[a.color] || ue.teal
        return C.value === a.id ? e.active : e.inactive
      }
      const C = M('lembaga'),
        Q = M('lembaga')
      ;(ne(() => {
        const a = p.query.tab
        a && se.find((P) => P.id === a) && (C.value = a)
        const e = p.query.sub
        ;(e && (Q.value = e), Ee(), Je())
      }),
        Xe(
          () => p.query.tab,
          (a) => {
            a && se.find((e) => e.id === a) && (C.value = a)
          }
        ))
      function $e(a) {
        ;((C.value = a), x.replace({ query: { ...p.query, tab: a } }))
      }
      const U = te(() => {
          var e
          const a = (e = u.settings) == null ? void 0 : e.master_tp
          return Array.isArray(a) ? a : []
        }),
        pe = te(() => {
          var a
          return ((a = u.settings) == null ? void 0 : a.tp_aktif) || ''
        }),
        D = he({ value: '', idx: null }),
        re = M(!1)
      function qe(a) {
        ;((D.value = U.value[a] || ''), (D.idx = a))
      }
      function be() {
        ;((D.value = ''), (D.idx = null))
      }
      async function Le() {
        if (!D.value.trim()) {
          d.warning('Tahun Pelajaran wajib diisi')
          return
        }
        re.value = !0
        try {
          const a = [...U.value]
          if (D.idx !== null) a[D.idx] = D.value.trim()
          else {
            if (a.includes(D.value.trim())) {
              d.warning('TP sudah ada')
              return
            }
            a.push(D.value.trim())
          }
          ;(await w(y(h, 'settings', 'general'), { master_tp: a }, { merge: !0 }),
            await w(y(h, 'settings', 'web'), { master_tp: a }, { merge: !0 }),
            (u.settings.master_tp = a),
            d.success(D.idx !== null ? 'Diperbarui' : 'Tersimpan'),
            be())
        } catch (a) {
          d.error('Gagal: ' + (a.message || a))
        } finally {
          re.value = !1
        }
      }
      async function Be(a) {
        if (window.confirm(`Hapus TP "${U.value[a]}"?`))
          try {
            const e = [...U.value]
            ;(e.splice(a, 1),
              await w(y(h, 'settings', 'general'), { master_tp: e }, { merge: !0 }),
              await w(y(h, 'settings', 'web'), { master_tp: e }, { merge: !0 }),
              (u.settings.master_tp = e),
              d.success('Dihapus'))
          } catch (e) {
            d.error('Gagal: ' + (e.message || e))
          }
      }
      async function Ge(a) {
        try {
          ;(await w(y(h, 'settings', 'general'), { tp_aktif: a }, { merge: !0 }),
            await w(y(h, 'settings', 'web'), { tp_aktif: a }, { merge: !0 }),
            (u.settings.tp_aktif = a),
            d.success(`TP Aktif: ${a}`))
        } catch (e) {
          d.error('Gagal: ' + (e.message || e))
        }
      }
      const ge = [
          'Guru',
          'Pegawai',
          'Kepala TPQ',
          'PJ PTPT',
          'PJ PPPH',
          'Kepala TK',
          'Kepala SDI',
          'Kepala PKBM',
          'PJ Administrasi',
          'Bendahara',
          'Sekretaris',
          'Admin',
          'Admin Yayasan',
          'Pengasuh',
          'Keamanan',
          'Kebersihan'
        ],
        le = M([])
      ne(() => {
        Ze('master', 'jabatan', (a) => {
          const e = a == null ? void 0 : a.list
          Array.isArray(e) && e.length > 0
            ? (le.value = e)
            : ((le.value = [...ge]),
              w(y(h, 'master', 'jabatan'), { list: ge }, { merge: !0 }).catch(() => {}))
        })
      })
      const E = te(() => le.value),
        A = he({ value: '', idx: null }),
        oe = M(!1)
      function Qe(a) {
        ;((A.value = E.value[a] || ''), (A.idx = a))
      }
      function ce() {
        ;((A.value = ''), (A.idx = null))
      }
      async function Ke() {
        if (!A.value.trim()) {
          d.warning('Nama jabatan wajib diisi')
          return
        }
        oe.value = !0
        try {
          const a = [...E.value]
          if (A.idx !== null) a[A.idx] = A.value.trim()
          else {
            if (a.includes(A.value.trim())) {
              d.warning('Jabatan sudah ada')
              return
            }
            a.push(A.value.trim())
          }
          ;(await w(y(h, 'master', 'jabatan'), { list: a }),
            d.success(A.idx !== null ? 'Diperbarui' : 'Tersimpan'),
            ce())
        } catch (a) {
          d.error('Gagal: ' + (a.message || a))
        } finally {
          oe.value = !1
        }
      }
      async function Ne(a) {
        if (confirm(`Hapus jabatan "${E.value[a]}"?`))
          try {
            const e = [...E.value]
            ;(e.splice(a, 1), await w(y(h, 'master', 'jabatan'), { list: e }), d.success('Dihapus'))
          } catch (e) {
            d.error('Gagal: ' + (e.message || e))
          }
      }
      const Ue = [
          { min: 90, max: 100, label: 'A', desc: 'Mumtaz (Istimewa)' },
          { min: 80, max: 89, label: 'B', desc: 'Jayyid Jiddan (Sangat Baik)' },
          { min: 70, max: 79, label: 'C', desc: 'Jayyid (Baik)' },
          { min: 60, max: 69, label: 'D', desc: 'Maqbul (Cukup)' },
          { min: 0, max: 59, label: 'E', desc: 'Rasib (Belum Mencapai)' }
        ],
        K = M([]),
        Y = M(!1),
        O = M(''),
        F = M('')
      function Ee() {
        const a = u.settings || {},
          e = a.raporPredikat
        ;((K.value =
          Array.isArray(e) && e.length > 0
            ? JSON.parse(JSON.stringify(e))
            : JSON.parse(JSON.stringify(Ue))),
          (O.value = a.bgRaporTpq || ''),
          (F.value = a.bgRaporDiniyah || ''))
      }
      function Oe() {
        K.value.push({ min: 0, max: 0, label: '', desc: '' })
      }
      function Fe(a) {
        K.value.splice(a, 1)
      }
      async function me(a, e) {
        var s
        const P = (s = a.target.files) == null ? void 0 : s[0]
        if (P) {
          if (P.size > 4 * 1024 * 1024) {
            d.warning('Max 4 MB')
            return
          }
          try {
            const { uploadBase64: k } = await lt(
                async () => {
                  const { uploadBase64: j } = await import('./storage-BBNevPRC.js')
                  return { uploadBase64: j }
                },
                __vite__mapDeps([0, 1, 2])
              ),
              S = new FileReader()
            ;((S.onload = async () => {
              try {
                const j = await k(
                  `bg_rapor/${e}_${Date.now()}.${P.name.split('.').pop()}`,
                  S.result,
                  P.type
                )
                ;(e === 'tpq'
                  ? ((O.value = j),
                    await w(y(h, 'settings', 'general'), { bgRaporTpq: j }, { merge: !0 }),
                    await w(y(h, 'settings', 'web'), { bgRaporTpq: j }, { merge: !0 }),
                    (u.settings.bgRaporTpq = j))
                  : ((F.value = j),
                    await w(y(h, 'settings', 'general'), { bgRaporDiniyah: j }, { merge: !0 }),
                    await w(y(h, 'settings', 'web'), { bgRaporDiniyah: j }, { merge: !0 }),
                    (u.settings.bgRaporDiniyah = j)),
                  d.success(`BG Rapor ${e.toUpperCase()} terupload`))
              } catch (j) {
                d.error('Upload gagal: ' + j.message)
              }
            }),
              S.readAsDataURL(P))
          } catch (k) {
            d.error('Error: ' + k.message)
          }
        }
      }
      async function xe(a) {
        if (confirm(`Hapus BG Rapor ${a.toUpperCase()}?`))
          try {
            ;(a === 'tpq'
              ? ((O.value = ''),
                await w(y(h, 'settings', 'general'), { bgRaporTpq: '' }, { merge: !0 }),
                await w(y(h, 'settings', 'web'), { bgRaporTpq: '' }, { merge: !0 }),
                (u.settings.bgRaporTpq = ''))
              : ((F.value = ''),
                await w(y(h, 'settings', 'general'), { bgRaporDiniyah: '' }, { merge: !0 }),
                await w(y(h, 'settings', 'web'), { bgRaporDiniyah: '' }, { merge: !0 }),
                (u.settings.bgRaporDiniyah = '')),
              d.success('Dihapus'))
          } catch (e) {
            d.error('Gagal: ' + e.message)
          }
      }
      async function Ie() {
        Y.value = !0
        try {
          ;(await w(y(h, 'settings', 'general'), { raporPredikat: K.value }, { merge: !0 }),
            await w(y(h, 'settings', 'web'), { raporPredikat: K.value }, { merge: !0 }),
            (u.settings.raporPredikat = K.value),
            d.success('Pengaturan rapor tersimpan'))
        } catch (a) {
          d.error('Gagal: ' + a.message)
        } finally {
          Y.value = !1
        }
      }
      const I = M({}),
        X = M(!1),
        ie = te(() => {
          const a = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'TPQ', 'P3H']
          return (m.value || []).map((e) => e.lembaga || e.nama).filter((e) => e && !a.includes(e))
        })
      function Je() {
        var e
        const a = (e = u.settings) == null ? void 0 : e.rekapDiniyahMapel
        I.value = a && typeof a == 'object' ? { ...a } : {}
      }
      function Ve(a) {
        return I.value[a] || ''
      }
      function He(a, e) {
        I.value[a] = e
      }
      async function ze() {
        X.value = !0
        try {
          ;(await w(y(h, 'settings', 'general'), { rekapDiniyahMapel: I.value }, { merge: !0 }),
            await w(y(h, 'settings', 'web'), { rekapDiniyahMapel: I.value }, { merge: !0 }),
            (u.settings.rekapDiniyahMapel = { ...I.value }),
            d.success('Pengaturan rekap prestasi tersimpan'))
        } catch (a) {
          d.error('Gagal: ' + a.message)
        } finally {
          X.value = !1
        }
      }
      return (a, e) => {
        const P = rt('router-link')
        return (
          l(),
          i('div', kt, [
            e[92] ||
              (e[92] = de(
                '<header class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"><div class="flex items-baseline gap-2 flex-wrap"><h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white whitespace-nowrap"><i class="fas fa-database text-purple-600 mr-1"></i>Pusat Master Data </h1><p class="text-[11px] text-slate-500 dark:text-slate-400">— Pilih kategori untuk mengelola data.</p></div></header>',
                1
              )),
            t('div', ht, [
              t('div', vt, [
                (l(),
                i(
                  q,
                  null,
                  L(se, (s) =>
                    t(
                      'button',
                      {
                        key: s.id,
                        onClick: (k) => $e(s.id),
                        class: N([
                          'whitespace-nowrap h-10 px-3 text-xs font-bold transition cursor-pointer rounded-xl inline-flex items-center gap-1.5',
                          Ce(s)
                        ])
                      },
                      [
                        t('i', { class: N(['fas', s.icon, 'text-sm']) }, null, 2),
                        t('span', null, n(s.label), 1)
                      ],
                      10,
                      yt
                    )
                  ),
                  64
                ))
              ])
            ]),
            C.value === 'lembaga'
              ? (l(),
                i('div', wt, [
                  t('div', _t, [
                    t(
                      'button',
                      {
                        onClick: e[0] || (e[0] = (s) => (Q.value = 'lembaga')),
                        class: N([
                          'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
                          Q.value === 'lembaga'
                            ? 'bg-blue-500 text-white border-blue-600'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50'
                        ])
                      },
                      [
                        ...(e[9] ||
                          (e[9] = [
                            t('i', { class: 'fas fa-building mr-1' }, null, -1),
                            r('Daftar Lembaga', -1)
                          ]))
                      ],
                      2
                    ),
                    t(
                      'button',
                      {
                        onClick: e[1] || (e[1] = (s) => (Q.value = 'kelas')),
                        class: N([
                          'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
                          Q.value === 'kelas'
                            ? 'bg-cyan-500 text-white border-cyan-600'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-cyan-50'
                        ])
                      },
                      [
                        ...(e[10] ||
                          (e[10] = [
                            t('i', { class: 'fas fa-door-open mr-1' }, null, -1),
                            r('Kelas', -1)
                          ]))
                      ],
                      2
                    )
                  ]),
                  t('div', Pt, [(l(), et(tt(Q.value === 'kelas' ? dt : nt), { key: Q.value }))])
                ]))
              : C.value === 'jabatan'
                ? (l(),
                  i('div', Tt, [
                    e[13] ||
                      (e[13] = t(
                        'div',
                        null,
                        [
                          t(
                            'h3',
                            {
                              class:
                                'text-sm md:text-base font-black text-slate-800 dark:text-white mb-1'
                            },
                            [
                              t('i', { class: 'fas fa-plus-circle text-teal-600 mr-1' }),
                              r('Kelola Jabatan Guru ')
                            ]
                          ),
                          t(
                            'p',
                            { class: 'text-xs text-slate-500 dark:text-slate-400' },
                            'Master jabatan untuk dropdown di Data Guru/Pegawai.'
                          )
                        ],
                        -1
                      )),
                    t(
                      'form',
                      { onSubmit: at(Ke, ['prevent']), class: 'flex flex-wrap gap-2' },
                      [
                        J(
                          t(
                            'input',
                            {
                              'onUpdate:modelValue': e[2] || (e[2] = (s) => (A.value = s)),
                              type: 'text',
                              placeholder: 'Nama Jabatan Baru (Mis: Wakasek Kurikulum)',
                              class:
                                'flex-1 min-w-[200px] px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                            },
                            null,
                            512
                          ),
                          [[V, A.value]]
                        ),
                        t(
                          'button',
                          {
                            type: 'submit',
                            disabled: oe.value,
                            class:
                              'bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs disabled:opacity-50'
                          },
                          [
                            t(
                              'i',
                              { class: N(['fas', A.idx !== null ? 'fa-save' : 'fa-plus', 'mr-1']) },
                              null,
                              2
                            ),
                            r(' ' + n(A.idx !== null ? 'Update' : 'Tambah'), 1)
                          ],
                          8,
                          Mt
                        ),
                        A.idx !== null
                          ? (l(),
                            i(
                              'button',
                              {
                                key: 0,
                                type: 'button',
                                onClick: ce,
                                class:
                                  'bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs'
                              },
                              'Batal'
                            ))
                          : T('', !0)
                      ],
                      32
                    ),
                    E.value.length === 0
                      ? (l(),
                        i('div', St, [
                          ...(e[11] ||
                            (e[11] = [
                              t(
                                'i',
                                {
                                  class:
                                    'fas fa-inbox text-3xl text-slate-300 dark:text-slate-600 block mb-2'
                                },
                                null,
                                -1
                              ),
                              r(
                                ' Belum ada jabatan terdaftar. Tambah jabatan pertama via form di atas. ',
                                -1
                              )
                            ]))
                        ]))
                      : (l(),
                        i('ul', Rt, [
                          (l(!0),
                          i(
                            q,
                            null,
                            L(
                              E.value,
                              (s, k) => (
                                l(),
                                i(
                                  'li',
                                  {
                                    key: k,
                                    class:
                                      'flex items-center gap-2 bg-slate-50 dark:bg-slate-900/30 border-l-4 border-teal-500 px-3 py-2 rounded-r-lg'
                                  },
                                  [
                                    e[12] ||
                                      (e[12] = t(
                                        'i',
                                        { class: 'fas fa-id-badge text-teal-600' },
                                        null,
                                        -1
                                      )),
                                    t('span', At, n(s), 1),
                                    t(
                                      'button',
                                      {
                                        onClick: (S) => Qe(k),
                                        class: 'text-[10px] text-blue-600 hover:underline font-bold'
                                      },
                                      'edit',
                                      8,
                                      Dt
                                    ),
                                    t(
                                      'button',
                                      {
                                        onClick: (S) => Ne(k),
                                        class: 'text-[10px] text-rose-600 hover:underline font-bold'
                                      },
                                      'hapus',
                                      8,
                                      jt
                                    )
                                  ]
                                )
                              )
                            ),
                            128
                          ))
                        ]))
                  ]))
                : C.value === 'guru'
                  ? (l(), i('div', Ct, [H(pt, { mode: 'master' })]))
                  : C.value === 'santri'
                    ? (l(), i('div', $t, [H(bt, { mode: 'master' })]))
                    : C.value === 'rapor'
                      ? (l(),
                        i('div', qt, [
                          e[40] ||
                            (e[40] = t(
                              'header',
                              {
                                class:
                                  'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
                              },
                              [
                                t(
                                  'h3',
                                  {
                                    class:
                                      'text-base md:text-lg font-black text-slate-800 dark:text-white'
                                  },
                                  [
                                    t('i', {
                                      class: 'fas fa-graduation-cap text-emerald-600 mr-2'
                                    }),
                                    r('Pengaturan Rapor Semester ')
                                  ]
                                ),
                                t(
                                  'p',
                                  { class: 'text-xs text-slate-500 dark:text-slate-400 mt-1' },
                                  'Konfigurasi KOP, predikat, schema field & background per lembaga.'
                                )
                              ],
                              -1
                            )),
                          t('div', Lt, [
                            e[17] ||
                              (e[17] = t(
                                'h5',
                                {
                                  class:
                                    'text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2'
                                },
                                [
                                  t('i', { class: 'fas fa-heading mr-1 text-emerald-600' }),
                                  r('Sistem Kop Rapor (Otomatis) ')
                                ],
                                -1
                              )),
                            e[18] ||
                              (e[18] = t(
                                'ul',
                                {
                                  class:
                                    'text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed list-disc ml-5 space-y-1'
                                },
                                [
                                  t('li', null, [
                                    t('strong', null, 'Rapor Qiraati'),
                                    r(
                                      ' (TPQ/Pra PTPT/PTPT/PPPH): kiri = Logo Qiraati, tengah = Kop Utama Aplikasi, kanan = Logo Sekolah Santri'
                                    )
                                  ]),
                                  t('li', null, [
                                    t('strong', null, 'Rapor Diniyah'),
                                    r(
                                      ': kiri = Logo Aplikasi, tengah = Kop Sekolah Santri, kanan = Logo Sekolah Santri'
                                    )
                                  ])
                                ],
                                -1
                              )),
                            t('p', Bt, [
                              e[15] || (e[15] = r(' Setup logo & KOP dilakukan di ', -1)),
                              H(
                                P,
                                {
                                  to: '/pengaturan-web',
                                  class: 'underline font-bold text-emerald-700'
                                },
                                {
                                  default: ee(() => [
                                    ...(e[14] || (e[14] = [r('Pengaturan Web', -1)]))
                                  ]),
                                  _: 1
                                }
                              ),
                              e[16] || (e[16] = r('. ', -1))
                            ])
                          ]),
                          t('div', Gt, [
                            t(
                              'div',
                              { class: 'flex items-center justify-between mb-3 flex-wrap gap-2' },
                              [
                                e[20] ||
                                  (e[20] = t(
                                    'h5',
                                    {
                                      class:
                                        'text-xs font-black text-slate-700 dark:text-slate-200 uppercase'
                                    },
                                    [
                                      t('i', { class: 'fas fa-star mr-1 text-blue-600' }),
                                      r('Aturan Predikat Nilai ')
                                    ],
                                    -1
                                  )),
                                t(
                                  'button',
                                  {
                                    onClick: Oe,
                                    class:
                                      'text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer'
                                  },
                                  [
                                    ...(e[19] ||
                                      (e[19] = [
                                        t('i', { class: 'fas fa-plus mr-1' }, null, -1),
                                        r('Tambah Aturan ', -1)
                                      ]))
                                  ]
                                )
                              ]
                            ),
                            t('div', Qt, [
                              (l(!0),
                              i(
                                q,
                                null,
                                L(
                                  K.value,
                                  (s, k) => (
                                    l(),
                                    i(
                                      'div',
                                      {
                                        key: k,
                                        class:
                                          'bg-white dark:bg-slate-800 rounded-lg p-2 md:p-3 border border-blue-100 dark:border-blue-700/50 grid grid-cols-12 gap-2 items-center'
                                      },
                                      [
                                        J(
                                          t(
                                            'input',
                                            {
                                              'onUpdate:modelValue': (S) => (s.min = S),
                                              type: 'number',
                                              placeholder: 'Min',
                                              class:
                                                'col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                            },
                                            null,
                                            8,
                                            Kt
                                          ),
                                          [[V, s.min, void 0, { number: !0 }]]
                                        ),
                                        e[22] ||
                                          (e[22] = t(
                                            'span',
                                            {
                                              class: 'col-span-1 text-center text-xs text-slate-500'
                                            },
                                            '-',
                                            -1
                                          )),
                                        J(
                                          t(
                                            'input',
                                            {
                                              'onUpdate:modelValue': (S) => (s.max = S),
                                              type: 'number',
                                              placeholder: 'Max',
                                              class:
                                                'col-span-2 px-2 py-1.5 text-xs text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                            },
                                            null,
                                            8,
                                            Nt
                                          ),
                                          [[V, s.max, void 0, { number: !0 }]]
                                        ),
                                        J(
                                          t(
                                            'input',
                                            {
                                              'onUpdate:modelValue': (S) => (s.label = S),
                                              type: 'text',
                                              placeholder: 'Label',
                                              maxlength: '3',
                                              class:
                                                'col-span-2 px-2 py-1.5 text-xs text-center font-black border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                            },
                                            null,
                                            8,
                                            Ut
                                          ),
                                          [[V, s.label]]
                                        ),
                                        J(
                                          t(
                                            'input',
                                            {
                                              'onUpdate:modelValue': (S) => (s.desc = S),
                                              type: 'text',
                                              placeholder: 'Deskripsi (Mumtaz, Jayyid, dll)',
                                              class:
                                                'col-span-4 px-2 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                            },
                                            null,
                                            8,
                                            Et
                                          ),
                                          [[V, s.desc]]
                                        ),
                                        t(
                                          'button',
                                          {
                                            onClick: (S) => Fe(k),
                                            class:
                                              'col-span-1 text-rose-500 hover:text-rose-700 text-sm cursor-pointer',
                                            title: 'Hapus'
                                          },
                                          [
                                            ...(e[21] ||
                                              (e[21] = [
                                                t('i', { class: 'fas fa-trash' }, null, -1)
                                              ]))
                                          ],
                                          8,
                                          Ot
                                        )
                                      ]
                                    )
                                  )
                                ),
                                128
                              ))
                            ])
                          ]),
                          t('div', Ft, [
                            e[24] ||
                              (e[24] = t(
                                'h5',
                                {
                                  class:
                                    'text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2'
                                },
                                [
                                  t('i', { class: 'fas fa-list-alt mr-1 text-purple-600' }),
                                  r('Struktur Field Rapor (Per Lembaga) ')
                                ],
                                -1
                              )),
                            e[25] ||
                              (e[25] = t(
                                'p',
                                { class: 'text-[11px] text-slate-600 dark:text-slate-400 mb-3' },
                                ' Editor schema per lembaga (TPQ/Pra PTPT/PTPT/PPPH). ',
                                -1
                              )),
                            t('div', It, [
                              (l(),
                              i(
                                q,
                                null,
                                L(['TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH'], (s) =>
                                  H(
                                    P,
                                    {
                                      key: s,
                                      to: { path: '/lembaga' },
                                      class:
                                        'bg-white hover:bg-purple-100 dark:bg-slate-800 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer inline-flex items-center'
                                    },
                                    {
                                      default: ee(() => [
                                        e[23] ||
                                          (e[23] = t('i', { class: 'fas fa-edit mr-1' }, null, -1)),
                                        r('Edit ' + n(s), 1)
                                      ]),
                                      _: 2
                                    },
                                    1024
                                  )
                                ),
                                64
                              ))
                            ]),
                            e[26] ||
                              (e[26] = t(
                                'p',
                                { class: 'text-[10px] text-slate-500 italic mt-2' },
                                [
                                  t('i', { class: 'fas fa-info-circle mr-1' }),
                                  r(
                                    'Buka lembaga di Master Data > Lembaga untuk akses Pengaturan per-lembaga (Kelas, Rapor, Rekap, dll).'
                                  )
                                ],
                                -1
                              ))
                          ]),
                          t('div', Jt, [
                            e[28] ||
                              (e[28] = t(
                                'h5',
                                {
                                  class:
                                    'text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2'
                                },
                                [
                                  t('i', { class: 'fas fa-puzzle-piece mr-1 text-fuchsia-600' }),
                                  r('Field Tambahan (ACF - Tanpa Koding) ')
                                ],
                                -1
                              )),
                            e[29] ||
                              (e[29] = t(
                                'p',
                                { class: 'text-[11px] text-slate-600 dark:text-slate-400 mb-3' },
                                ' Tambah field custom di form Santri/Guru/Lembaga. ',
                                -1
                              )),
                            t(
                              'button',
                              {
                                onClick:
                                  e[3] ||
                                  (e[3] = (s) => {
                                    ;((C.value = 'lembaga'), (Q.value = 'field-schema'))
                                  }),
                                class:
                                  'bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer'
                              },
                              [
                                ...(e[27] ||
                                  (e[27] = [
                                    t('i', { class: 'fas fa-external-link-alt mr-1' }, null, -1),
                                    r('Buka Field Schema Editor ', -1)
                                  ]))
                              ]
                            )
                          ]),
                          t('div', Vt, [
                            e[34] ||
                              (e[34] = t(
                                'h5',
                                {
                                  class:
                                    'text-xs font-black text-slate-700 dark:text-slate-200 uppercase mb-2'
                                },
                                [
                                  t('i', { class: 'fas fa-image mr-1 text-amber-600' }),
                                  r('Background Rapor (Watermark) ')
                                ],
                                -1
                              )),
                            e[35] ||
                              (e[35] = t(
                                'p',
                                { class: 'text-[11px] text-slate-600 dark:text-slate-400 mb-3' },
                                ' PNG transparent direkomendasikan, max 4 MB. Tampil di belakang konten rapor saat cetak (opacity 10%). ',
                                -1
                              )),
                            t('div', Ht, [
                              t('div', zt, [
                                e[31] ||
                                  (e[31] = t(
                                    'label',
                                    {
                                      class:
                                        'text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block'
                                    },
                                    'BG Rapor Qiraati (TPQ / PTPT / PPPH)',
                                    -1
                                  )),
                                t(
                                  'input',
                                  {
                                    type: 'file',
                                    accept: 'image/png,image/jpeg',
                                    onChange: e[4] || (e[4] = (s) => me(s, 'tpq')),
                                    class: 'block w-full text-xs text-slate-600 dark:text-slate-400'
                                  },
                                  null,
                                  32
                                ),
                                O.value
                                  ? (l(),
                                    i(
                                      'img',
                                      {
                                        key: 0,
                                        src: O.value,
                                        class:
                                          'h-20 w-auto rounded object-contain mt-2 border border-slate-200 bg-white'
                                      },
                                      null,
                                      8,
                                      Wt
                                    ))
                                  : T('', !0),
                                O.value
                                  ? (l(),
                                    i(
                                      'button',
                                      {
                                        key: 1,
                                        onClick: e[5] || (e[5] = (s) => xe('tpq')),
                                        class:
                                          'text-[10px] text-rose-600 hover:text-rose-800 mt-1 cursor-pointer font-bold'
                                      },
                                      [
                                        ...(e[30] ||
                                          (e[30] = [
                                            t('i', { class: 'fas fa-trash mr-1' }, null, -1),
                                            r('Hapus ', -1)
                                          ]))
                                      ]
                                    ))
                                  : T('', !0)
                              ]),
                              t('div', Yt, [
                                e[33] ||
                                  (e[33] = t(
                                    'label',
                                    {
                                      class:
                                        'text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block'
                                    },
                                    'BG Rapor Diniyah',
                                    -1
                                  )),
                                t(
                                  'input',
                                  {
                                    type: 'file',
                                    accept: 'image/png,image/jpeg',
                                    onChange: e[6] || (e[6] = (s) => me(s, 'diniyah')),
                                    class: 'block w-full text-xs text-slate-600 dark:text-slate-400'
                                  },
                                  null,
                                  32
                                ),
                                F.value
                                  ? (l(),
                                    i(
                                      'img',
                                      {
                                        key: 0,
                                        src: F.value,
                                        class:
                                          'h-20 w-auto rounded object-contain mt-2 border border-slate-200 bg-white'
                                      },
                                      null,
                                      8,
                                      Xt
                                    ))
                                  : T('', !0),
                                F.value
                                  ? (l(),
                                    i(
                                      'button',
                                      {
                                        key: 1,
                                        onClick: e[7] || (e[7] = (s) => xe('diniyah')),
                                        class:
                                          'text-[10px] text-rose-600 hover:text-rose-800 mt-1 cursor-pointer font-bold'
                                      },
                                      [
                                        ...(e[32] ||
                                          (e[32] = [
                                            t('i', { class: 'fas fa-trash mr-1' }, null, -1),
                                            r('Hapus ', -1)
                                          ]))
                                      ]
                                    ))
                                  : T('', !0)
                              ])
                            ])
                          ]),
                          t(
                            'button',
                            {
                              onClick: Ie,
                              disabled: Y.value,
                              class:
                                'w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2'
                            },
                            [
                              t(
                                'i',
                                { class: N(['fas', Y.value ? 'fa-spinner fa-spin' : 'fa-save']) },
                                null,
                                2
                              ),
                              r(' ' + n(Y.value ? 'Menyimpan...' : 'SIMPAN PENGATURAN RAPOR'), 1)
                            ],
                            8,
                            Zt
                          ),
                          t('p', ea, [
                            e[37] ||
                              (e[37] = t('i', { class: 'fas fa-info-circle mr-1' }, null, -1)),
                            e[38] ||
                              (e[38] = r(
                                'Halaman Rapor Semester untuk input nilai per santri tersedia di ',
                                -1
                              )),
                            H(
                              P,
                              { to: '/rapor', class: 'underline font-bold text-emerald-700' },
                              {
                                default: ee(() => [...(e[36] || (e[36] = [r('menu Rapor', -1)]))]),
                                _: 1
                              }
                            ),
                            e[39] || (e[39] = r('. ', -1))
                          ])
                        ]))
                      : C.value === 'rekap'
                        ? (l(),
                          i('div', ta, [
                            e[50] ||
                              (e[50] = t(
                                'header',
                                {
                                  class:
                                    'bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm'
                                },
                                [
                                  t(
                                    'h3',
                                    {
                                      class:
                                        'text-base md:text-lg font-black text-slate-800 dark:text-white'
                                    },
                                    [
                                      t('i', { class: 'fas fa-book-open text-amber-600 mr-2' }),
                                      r('Pengaturan Rekap Prestasi ')
                                    ]
                                  ),
                                  t(
                                    'p',
                                    { class: 'text-xs text-slate-500 dark:text-slate-400 mt-1' },
                                    'Atur struktur kolom rekap prestasi per lembaga.'
                                  )
                                ],
                                -1
                              )),
                            t('div', aa, [
                              e[44] ||
                                (e[44] = t(
                                  'h4',
                                  {
                                    class:
                                      'text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest mb-2 flex items-center gap-2'
                                  },
                                  [
                                    t('i', { class: 'fas fa-list-ul text-amber-600' }),
                                    r('Mata Pelajaran Rekap Diniyah (Per Lembaga) ')
                                  ],
                                  -1
                                )),
                              e[45] ||
                                (e[45] = t(
                                  'p',
                                  {
                                    class: 'text-xs text-slate-500 dark:text-slate-400 mb-4 italic'
                                  },
                                  ' Daftar kolom mata pelajaran yang tampil di Rekap Prestasi Diniyah untuk tiap lembaga formal. Pisah dengan koma. ',
                                  -1
                                )),
                              ie.value.length === 0
                                ? (l(),
                                  i('div', sa, [
                                    ...(e[41] ||
                                      (e[41] = [
                                        t(
                                          'i',
                                          {
                                            class:
                                              'fas fa-school text-3xl text-slate-300 dark:text-slate-600 block mb-2'
                                          },
                                          null,
                                          -1
                                        ),
                                        r(' Belum ada lembaga formal terdaftar. ', -1)
                                      ]))
                                  ]))
                                : (l(),
                                  i('div', ra, [
                                    (l(!0),
                                    i(
                                      q,
                                      null,
                                      L(
                                        ie.value,
                                        (s) => (
                                          l(),
                                          i(
                                            'div',
                                            {
                                              key: s,
                                              class:
                                                'bg-slate-50 dark:bg-slate-900/30 rounded-xl p-3 md:p-4 border border-slate-200 dark:border-slate-700'
                                            },
                                            [
                                              t('label', la, [
                                                e[42] ||
                                                  (e[42] = t(
                                                    'i',
                                                    { class: 'fas fa-school text-blue-500' },
                                                    null,
                                                    -1
                                                  )),
                                                r(n(s), 1)
                                              ]),
                                              t(
                                                'textarea',
                                                {
                                                  value: Ve(s),
                                                  onInput: (k) => He(s, k.target.value),
                                                  rows: '2',
                                                  placeholder: `Default: ${Us} (kalau kosong)`,
                                                  class:
                                                    'w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white resize-none'
                                                },
                                                null,
                                                40,
                                                oa
                                              ),
                                              e[43] ||
                                                (e[43] = t(
                                                  'p',
                                                  {
                                                    class: 'text-[10px] text-slate-400 italic mt-1'
                                                  },
                                                  [
                                                    t('i', { class: 'fas fa-info-circle mr-1' }),
                                                    r('Contoh: Nahwu, Fiqh, Tafsir, Akhlaq ')
                                                  ],
                                                  -1
                                                ))
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    ))
                                  ]))
                            ]),
                            e[51] ||
                              (e[51] = t(
                                'div',
                                {
                                  class:
                                    'bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'
                                },
                                [
                                  t(
                                    'h4',
                                    {
                                      class:
                                        'text-sm font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-2 flex items-center gap-2'
                                    },
                                    [t('i', { class: 'fas fa-info-circle' }), r('Rekap Qiraati ')]
                                  ),
                                  t(
                                    'p',
                                    {
                                      class:
                                        'text-xs text-slate-700 dark:text-slate-300 leading-relaxed'
                                    },
                                    ' Untuk Rekap Qiraati, struktur kolom (Awal Bulan, Akhir Bulan, Total) sudah ditentukan otomatis sesuai jenis lembaga (TPQ Pagi, TPQ Sore, Pra PTPT, PTPT, PPPH). '
                                  )
                                ],
                                -1
                              )),
                            t(
                              'button',
                              {
                                onClick: ze,
                                disabled: X.value || ie.value.length === 0,
                                class:
                                  'w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2'
                              },
                              [
                                t(
                                  'i',
                                  { class: N(['fas', X.value ? 'fa-spinner fa-spin' : 'fa-save']) },
                                  null,
                                  2
                                ),
                                r(' ' + n(X.value ? 'Menyimpan...' : 'SIMPAN PENGATURAN REKAP'), 1)
                              ],
                              8,
                              ia
                            ),
                            t('p', na, [
                              e[47] ||
                                (e[47] = t('i', { class: 'fas fa-info-circle mr-1' }, null, -1)),
                              e[48] || (e[48] = r('Input nilai per santri tersedia di ', -1)),
                              H(
                                P,
                                {
                                  to: '/rekap-prestasi',
                                  class: 'underline font-bold text-purple-700'
                                },
                                {
                                  default: ee(() => [
                                    ...(e[46] || (e[46] = [r('menu Rekap Prestasi', -1)]))
                                  ]),
                                  _: 1
                                }
                              ),
                              e[49] || (e[49] = r('. ', -1))
                            ])
                          ]))
                        : C.value === 'tp'
                          ? (l(),
                            i('div', da, [
                              e[57] ||
                                (e[57] = t(
                                  'p',
                                  {
                                    class:
                                      'text-sm font-black text-orange-700 dark:text-orange-300 mb-1'
                                  },
                                  [
                                    t('i', { class: 'fas fa-plus-circle text-orange-600 mr-1' }),
                                    r('Kelola Tahun Pelajaran')
                                  ],
                                  -1
                                )),
                              e[58] ||
                                (e[58] = t(
                                  'p',
                                  { class: 'text-xs text-slate-700 dark:text-slate-300 mb-3' },
                                  'Daftar TP untuk dropdown Rapor / Naik Kelas / Statistik. Pilih satu sebagai TP Aktif.',
                                  -1
                                )),
                              t('div', ua, [
                                J(
                                  t(
                                    'input',
                                    {
                                      'onUpdate:modelValue': e[8] || (e[8] = (s) => (D.value = s)),
                                      type: 'text',
                                      placeholder: 'cth: 2025/2026',
                                      class:
                                        'flex-1 px-3 py-2 text-sm rounded-lg border border-orange-300 bg-white dark:bg-slate-900 text-slate-800 dark:text-white'
                                    },
                                    null,
                                    512
                                  ),
                                  [[V, D.value]]
                                ),
                                t(
                                  'button',
                                  {
                                    onClick: Le,
                                    disabled: re.value,
                                    class:
                                      'bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-2 rounded-lg disabled:opacity-50'
                                  },
                                  [
                                    e[52] ||
                                      (e[52] = t('i', { class: 'fas fa-save mr-1' }, null, -1)),
                                    r(n(D.idx !== null ? 'Update' : 'Tambah'), 1)
                                  ],
                                  8,
                                  pa
                                ),
                                D.idx !== null
                                  ? (l(),
                                    i(
                                      'button',
                                      {
                                        key: 0,
                                        onClick: be,
                                        class:
                                          'bg-slate-300 hover:bg-slate-400 text-slate-700 text-sm font-bold px-3 py-2 rounded-lg'
                                      },
                                      'Batal'
                                    ))
                                  : T('', !0)
                              ]),
                              U.value.length === 0
                                ? (l(), i('div', ba, 'Belum ada TP. Tambahkan via form di atas.'))
                                : (l(),
                                  i('ul', ga, [
                                    (l(!0),
                                    i(
                                      q,
                                      null,
                                      L(
                                        U.value,
                                        (s, k) => (
                                          l(),
                                          i(
                                            'li',
                                            {
                                              key: k,
                                              class:
                                                'flex justify-between items-center bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700'
                                            },
                                            [
                                              t('span', ca, [
                                                e[53] ||
                                                  (e[53] = t(
                                                    'i',
                                                    {
                                                      class: 'fas fa-calendar text-orange-500 mr-2'
                                                    },
                                                    null,
                                                    -1
                                                  )),
                                                r(n(s) + ' ', 1),
                                                s === pe.value
                                                  ? (l(), i('span', ma, 'Aktif'))
                                                  : T('', !0)
                                              ]),
                                              t('div', xa, [
                                                s !== pe.value
                                                  ? (l(),
                                                    i(
                                                      'button',
                                                      {
                                                        key: 0,
                                                        onClick: (S) => Ge(s),
                                                        class:
                                                          'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 px-2 py-1 rounded text-xs font-bold',
                                                        title: 'Set sebagai TP Aktif'
                                                      },
                                                      [
                                                        ...(e[54] ||
                                                          (e[54] = [
                                                            t(
                                                              'i',
                                                              { class: 'fas fa-check' },
                                                              null,
                                                              -1
                                                            )
                                                          ]))
                                                      ],
                                                      8,
                                                      fa
                                                    ))
                                                  : T('', !0),
                                                t(
                                                  'button',
                                                  {
                                                    onClick: (S) => qe(k),
                                                    class:
                                                      'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2 py-1 rounded text-xs'
                                                  },
                                                  [
                                                    ...(e[55] ||
                                                      (e[55] = [
                                                        t('i', { class: 'fas fa-edit' }, null, -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  ka
                                                ),
                                                t(
                                                  'button',
                                                  {
                                                    onClick: (S) => Be(k),
                                                    class:
                                                      'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 px-2 py-1 rounded text-xs'
                                                  },
                                                  [
                                                    ...(e[56] ||
                                                      (e[56] = [
                                                        t('i', { class: 'fas fa-times' }, null, -1)
                                                      ]))
                                                  ],
                                                  8,
                                                  ha
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
                          : C.value === 'audit'
                            ? (l(),
                              i('div', va, [
                                t('div', ya, [
                                  e[75] ||
                                    (e[75] = de(
                                      '<div class="flex items-center justify-between mb-3 flex-wrap gap-2"><div><p class="text-sm font-black text-purple-700 dark:text-purple-300"><i class="fas fa-layer-group mr-1"></i>Migrasi v.21.10 Schema</p><p class="text-xs text-slate-600 dark:text-slate-300 mt-1"> Derive <code class="bg-slate-100 px-1 rounded">lembaga_refs[]</code> untuk santri &amp; guru, + <code class="bg-slate-100 px-1 rounded">group</code> &amp; <code class="bg-slate-100 px-1 rounded">kepala_jabatan</code> per lembaga. Idempotent (skip kalau sudah ada). </p></div><span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded uppercase">v.21.10</span></div>',
                                      1
                                    )),
                                  t('div', wa, [
                                    t(
                                      'button',
                                      {
                                        onClick: Re,
                                        disabled: B.value,
                                        class:
                                          'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg disabled:opacity-50'
                                      },
                                      [
                                        ...(e[59] ||
                                          (e[59] = [
                                            t('i', { class: 'fas fa-search mr-1' }, null, -1),
                                            r('Dry-Run (Scan) ', -1)
                                          ]))
                                      ],
                                      8,
                                      _a
                                    ),
                                    t(
                                      'button',
                                      {
                                        onClick: Ae,
                                        disabled: B.value || !g.value || g.value.totalDocs === 0,
                                        class:
                                          'px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                                      },
                                      [
                                        ...(e[60] ||
                                          (e[60] = [
                                            t('i', { class: 'fas fa-database mr-1' }, null, -1),
                                            r('Execute Migrasi ', -1)
                                          ]))
                                      ],
                                      8,
                                      Pa
                                    )
                                  ]),
                                  B.value
                                    ? (l(),
                                      i('div', Ta, [
                                        e[61] ||
                                          (e[61] = t(
                                            'i',
                                            { class: 'fas fa-spinner fa-spin mr-1' },
                                            null,
                                            -1
                                          )),
                                        r(
                                          n(z.value.phase || 'Migrasi') +
                                            '... ' +
                                            n(z.value.i) +
                                            '/' +
                                            n(z.value.total),
                                          1
                                        )
                                      ]))
                                    : T('', !0),
                                  g.value
                                    ? (l(),
                                      i('div', Ma, [
                                        e[70] ||
                                          (e[70] = t(
                                            'p',
                                            {
                                              class:
                                                'font-black text-slate-800 dark:text-white mb-2'
                                            },
                                            [
                                              t('i', { class: 'fas fa-clipboard-list mr-1' }),
                                              r('Hasil Scan: ')
                                            ],
                                            -1
                                          )),
                                        t('div', Sa, [
                                          t('div', Ra, [
                                            e[62] ||
                                              (e[62] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Santri',
                                                -1
                                              )),
                                            t(
                                              'p',
                                              Aa,
                                              n(g.value.santri.toMigrate) +
                                                '/' +
                                                n(g.value.santri.total),
                                              1
                                            ),
                                            t('p', Da, 'skip: ' + n(g.value.santri.skipped), 1)
                                          ]),
                                          t('div', ja, [
                                            e[63] ||
                                              (e[63] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Guru',
                                                -1
                                              )),
                                            t(
                                              'p',
                                              Ca,
                                              n(g.value.guru.toMigrate) +
                                                '/' +
                                                n(g.value.guru.total),
                                              1
                                            ),
                                            t('p', $a, 'skip: ' + n(g.value.guru.skipped), 1)
                                          ]),
                                          t('div', qa, [
                                            e[64] ||
                                              (e[64] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Lembaga',
                                                -1
                                              )),
                                            t(
                                              'p',
                                              La,
                                              n(g.value.lembaga.toMigrate) +
                                                '/' +
                                                n(g.value.lembaga.total),
                                              1
                                            ),
                                            e[65] ||
                                              (e[65] = t(
                                                'p',
                                                { class: 'text-[9px] text-slate-400' },
                                                'add group/kepala',
                                                -1
                                              ))
                                          ])
                                        ]),
                                        g.value.santri.examples.length > 0
                                          ? (l(),
                                            i('div', Ba, [
                                              t(
                                                'p',
                                                Ga,
                                                'Santri sample (' +
                                                  n(g.value.santri.examples.length) +
                                                  '):',
                                                1
                                              ),
                                              t('ul', Qa, [
                                                (l(!0),
                                                i(
                                                  q,
                                                  null,
                                                  L(
                                                    g.value.santri.examples,
                                                    (s) => (
                                                      l(),
                                                      i(
                                                        'li',
                                                        {
                                                          key: 's-' + s.id,
                                                          class:
                                                            'font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700'
                                                        },
                                                        [
                                                          t('span', Ka, n(s.nama), 1),
                                                          e[66] || (e[66] = r(': ', -1)),
                                                          t(
                                                            'span',
                                                            Na,
                                                            n(s.refs.length) + ' refs',
                                                            1
                                                          ),
                                                          e[67] || (e[67] = r(' → ', -1)),
                                                          t(
                                                            'span',
                                                            Ua,
                                                            n(
                                                              s.refs
                                                                .map((k) => k.lembaga)
                                                                .join(' + ')
                                                            ),
                                                            1
                                                          )
                                                        ]
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ])
                                            ]))
                                          : T('', !0),
                                        g.value.guru.examples.length > 0
                                          ? (l(),
                                            i('div', Ea, [
                                              t(
                                                'p',
                                                Oa,
                                                'Guru sample (' +
                                                  n(g.value.guru.examples.length) +
                                                  '):',
                                                1
                                              ),
                                              t('ul', Fa, [
                                                (l(!0),
                                                i(
                                                  q,
                                                  null,
                                                  L(
                                                    g.value.guru.examples,
                                                    (s) => (
                                                      l(),
                                                      i(
                                                        'li',
                                                        {
                                                          key: 'g-' + s.id,
                                                          class:
                                                            'font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700'
                                                        },
                                                        [
                                                          t('span', Ia, n(s.nama), 1),
                                                          e[68] || (e[68] = r(': ', -1)),
                                                          t(
                                                            'span',
                                                            Ja,
                                                            n(s.refs.length) + ' refs',
                                                            1
                                                          ),
                                                          e[69] || (e[69] = r(' → ', -1)),
                                                          t(
                                                            'span',
                                                            Va,
                                                            n(
                                                              s.refs
                                                                .map(
                                                                  (k) =>
                                                                    k.lembaga +
                                                                    ' (' +
                                                                    (k.jabatan_di_sini || '-') +
                                                                    ')'
                                                                )
                                                                .join(' + ')
                                                            ),
                                                            1
                                                          )
                                                        ]
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ])
                                            ]))
                                          : T('', !0)
                                      ]))
                                    : T('', !0),
                                  $.value
                                    ? (l(),
                                      i('div', Ha, [
                                        e[74] ||
                                          (e[74] = t(
                                            'p',
                                            {
                                              class:
                                                'font-black text-emerald-800 dark:text-emerald-200'
                                            },
                                            [
                                              t('i', { class: 'fas fa-check-circle mr-1' }),
                                              r('Migrasi v.21.10 selesai ')
                                            ],
                                            -1
                                          )),
                                        t('div', za, [
                                          t('div', Wa, [
                                            e[71] ||
                                              (e[71] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Santri',
                                                -1
                                              )),
                                            t('p', Ya, [
                                              r('OK: ' + n($.value.santri.ok) + ' ', 1),
                                              t('span', Xa, 'FAIL: ' + n($.value.santri.fail), 1)
                                            ])
                                          ]),
                                          t('div', Za, [
                                            e[72] ||
                                              (e[72] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Guru',
                                                -1
                                              )),
                                            t('p', es, [
                                              r('OK: ' + n($.value.guru.ok) + ' ', 1),
                                              t('span', ts, 'FAIL: ' + n($.value.guru.fail), 1)
                                            ])
                                          ]),
                                          t('div', as, [
                                            e[73] ||
                                              (e[73] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Lembaga',
                                                -1
                                              )),
                                            t('p', ss, [
                                              r('OK: ' + n($.value.lembaga.ok) + ' ', 1),
                                              t('span', rs, 'FAIL: ' + n($.value.lembaga.fail), 1)
                                            ])
                                          ])
                                        ]),
                                        $.value.errors.length > 0
                                          ? (l(),
                                            i('div', ls, [
                                              t(
                                                'p',
                                                os,
                                                'Errors (' + n($.value.errors.length) + '):',
                                                1
                                              ),
                                              t('ul', is, [
                                                (l(!0),
                                                i(
                                                  q,
                                                  null,
                                                  L(
                                                    $.value.errors.slice(0, 10),
                                                    (s, k) => (
                                                      l(),
                                                      i(
                                                        'li',
                                                        {
                                                          key: k,
                                                          class:
                                                            'text-[9px] font-mono text-rose-700'
                                                        },
                                                        n(s),
                                                        1
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ])
                                            ]))
                                          : T('', !0)
                                      ]))
                                    : T('', !0)
                                ]),
                                t('div', ns, [
                                  e[88] ||
                                    (e[88] = de(
                                      '<div class="flex items-center justify-between mb-3"><div><p class="text-sm font-black text-amber-700 dark:text-amber-300"><i class="fas fa-tools mr-1"></i>Migrasi TPQ Shift</p><p class="text-xs text-slate-600 dark:text-slate-300 mt-1"> Gabung santri <b>TPQ Pagi</b> + <b>TPQ Sore</b> jadi 1 lembaga <b>TPQ</b> dengan field <code class="bg-slate-100 px-1 rounded">shift: &#39;Pagi&#39;/&#39;Sore&#39;</code>. </p></div></div>',
                                      1
                                    )),
                                  t('div', ds, [
                                    t(
                                      'button',
                                      {
                                        onClick: De,
                                        disabled: W.value,
                                        class:
                                          'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg disabled:opacity-50'
                                      },
                                      [
                                        ...(e[76] ||
                                          (e[76] = [
                                            t('i', { class: 'fas fa-search mr-1' }, null, -1),
                                            r('Dry-Run (Scan) ', -1)
                                          ]))
                                      ],
                                      8,
                                      us
                                    ),
                                    t(
                                      'button',
                                      {
                                        onClick: je,
                                        disabled:
                                          W.value || !R.value || R.value.totalToMigrate === 0,
                                        class:
                                          'px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
                                      },
                                      [
                                        ...(e[77] ||
                                          (e[77] = [
                                            t('i', { class: 'fas fa-database mr-1' }, null, -1),
                                            r('Execute Migrasi ', -1)
                                          ]))
                                      ],
                                      8,
                                      ps
                                    )
                                  ]),
                                  W.value
                                    ? (l(),
                                      i('div', bs, [
                                        e[78] ||
                                          (e[78] = t(
                                            'i',
                                            { class: 'fas fa-spinner fa-spin mr-1' },
                                            null,
                                            -1
                                          )),
                                        r(
                                          'Migrasi berjalan... ' +
                                            n(Z.value.i) +
                                            '/' +
                                            n(Z.value.total),
                                          1
                                        )
                                      ]))
                                    : T('', !0),
                                  R.value
                                    ? (l(),
                                      i('div', gs, [
                                        e[86] ||
                                          (e[86] = t(
                                            'p',
                                            {
                                              class:
                                                'font-black text-slate-800 dark:text-white mb-2'
                                            },
                                            [
                                              t('i', { class: 'fas fa-clipboard-list mr-1' }),
                                              r('Hasil Scan: ')
                                            ],
                                            -1
                                          )),
                                        t('div', cs, [
                                          t('div', ms, [
                                            e[79] ||
                                              (e[79] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Akan Dimigrasi',
                                                -1
                                              )),
                                            t('p', xs, n(R.value.totalToMigrate), 1)
                                          ]),
                                          t('div', fs, [
                                            e[80] ||
                                              (e[80] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'TPQ Pagi',
                                                -1
                                              )),
                                            t('p', ks, n(R.value.pagi), 1)
                                          ]),
                                          t('div', hs, [
                                            e[81] ||
                                              (e[81] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'TPQ Sore',
                                                -1
                                              )),
                                            t('p', vs, n(R.value.sore), 1)
                                          ]),
                                          t('div', ys, [
                                            e[82] ||
                                              (e[82] = t(
                                                'p',
                                                {
                                                  class:
                                                    'text-[10px] text-slate-500 uppercase font-bold'
                                                },
                                                'Sudah Migrate',
                                                -1
                                              )),
                                            t('p', ws, n(R.value.alreadyMigrated), 1)
                                          ])
                                        ]),
                                        R.value.examples.length > 0
                                          ? (l(),
                                            i('div', _s, [
                                              t(
                                                'p',
                                                Ps,
                                                'Contoh (' + n(R.value.examples.length) + '):',
                                                1
                                              ),
                                              t('ul', Ts, [
                                                (l(!0),
                                                i(
                                                  q,
                                                  null,
                                                  L(
                                                    R.value.examples,
                                                    (s) => (
                                                      l(),
                                                      i(
                                                        'li',
                                                        {
                                                          key: s.id,
                                                          class:
                                                            'font-mono text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700'
                                                        },
                                                        [
                                                          t('span', Ms, n(s.nama), 1),
                                                          e[83] || (e[83] = r(': ', -1)),
                                                          t('span', Ss, n(s.before.lembaga), 1),
                                                          e[84] || (e[84] = r(' → ', -1)),
                                                          t('span', Rs, n(s.after.lembaga), 1),
                                                          e[85] || (e[85] = r(' + shift=', -1)),
                                                          t('b', null, n(s.after.shift), 1)
                                                        ]
                                                      )
                                                    )
                                                  ),
                                                  128
                                                ))
                                              ])
                                            ]))
                                          : T('', !0)
                                      ]))
                                    : T('', !0),
                                  G.value
                                    ? (l(),
                                      i('div', As, [
                                        t('p', Ds, [
                                          e[87] ||
                                            (e[87] = t(
                                              'i',
                                              { class: 'fas fa-check-circle mr-1' },
                                              null,
                                              -1
                                            )),
                                          r(
                                            'Selesai: ' +
                                              n(G.value.ok) +
                                              ' OK, ' +
                                              n(G.value.fail) +
                                              ' gagal (total ' +
                                              n(G.value.total) +
                                              ') ',
                                            1
                                          )
                                        ]),
                                        G.value.errors && G.value.errors.length > 0
                                          ? (l(),
                                            i(
                                              'p',
                                              js,
                                              ' Errors: ' +
                                                n(G.value.errors.length) +
                                                ' (cek console untuk detail) ',
                                              1
                                            ))
                                          : T('', !0)
                                      ]))
                                    : T('', !0)
                                ]),
                                t('div', Cs, [
                                  e[90] ||
                                    (e[90] = t(
                                      'p',
                                      {
                                        class:
                                          'text-sm font-black text-rose-700 dark:text-rose-300 mb-1'
                                      },
                                      [
                                        t('i', { class: 'fas fa-stethoscope mr-1' }),
                                        r('Audit Log — Aktivitas Sistem')
                                      ],
                                      -1
                                    )),
                                  e[91] ||
                                    (e[91] = t(
                                      'p',
                                      { class: 'text-xs text-slate-700 dark:text-slate-300 mb-3' },
                                      'Catatan perubahan data terbaru (50 terbaru). Read-only.',
                                      -1
                                    )),
                                  c.value.length === 0
                                    ? (l(), i('div', $s, 'Belum ada log audit.'))
                                    : (l(),
                                      i('div', qs, [
                                        t('table', Ls, [
                                          e[89] ||
                                            (e[89] = t(
                                              'thead',
                                              {
                                                class: 'sticky top-0 bg-slate-100 dark:bg-slate-700'
                                              },
                                              [
                                                t('tr', null, [
                                                  t(
                                                    'th',
                                                    {
                                                      class:
                                                        'p-2 text-left font-black uppercase tracking-wider'
                                                    },
                                                    'Waktu'
                                                  ),
                                                  t(
                                                    'th',
                                                    {
                                                      class:
                                                        'p-2 text-left font-black uppercase tracking-wider'
                                                    },
                                                    'User'
                                                  ),
                                                  t(
                                                    'th',
                                                    {
                                                      class:
                                                        'p-2 text-left font-black uppercase tracking-wider'
                                                    },
                                                    'Aksi'
                                                  ),
                                                  t(
                                                    'th',
                                                    {
                                                      class:
                                                        'p-2 text-left font-black uppercase tracking-wider'
                                                    },
                                                    'Detail'
                                                  )
                                                ])
                                              ],
                                              -1
                                            )),
                                          t('tbody', null, [
                                            (l(!0),
                                            i(
                                              q,
                                              null,
                                              L(
                                                c.value,
                                                (s) => (
                                                  l(),
                                                  i(
                                                    'tr',
                                                    {
                                                      key: s.id,
                                                      class:
                                                        'border-b border-slate-100 dark:border-slate-700'
                                                    },
                                                    [
                                                      t('td', Bs, n(_(s.timestamp)), 1),
                                                      t(
                                                        'td',
                                                        Gs,
                                                        n(s.user_nama || s.user || '-'),
                                                        1
                                                      ),
                                                      t('td', Qs, [
                                                        t(
                                                          'span',
                                                          Ks,
                                                          n(s.aksi || s.action || '-'),
                                                          1
                                                        )
                                                      ]),
                                                      t(
                                                        'td',
                                                        Ns,
                                                        n(s.detail || s.keterangan || '-'),
                                                        1
                                                      )
                                                    ]
                                                  )
                                                )
                                              ),
                                              128
                                            ))
                                          ])
                                        ])
                                      ]))
                                ])
                              ]))
                            : T('', !0)
          ])
        )
      }
    }
  }
export { ar as default }
