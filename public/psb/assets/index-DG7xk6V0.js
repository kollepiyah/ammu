;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === 'childList')
        for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && r(a)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(s) {
    const i = {}
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    )
  }
  function r(s) {
    if (s.ep) return
    s.ep = !0
    const i = n(s)
    fetch(s.href, i)
  }
})()
/**
 * @vue/shared v3.5.34
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function ma(e) {
  const t = Object.create(null)
  for (const n of e.split(',')) t[n] = 1
  return (n) => n in t
}
const It = {},
  ur = [],
  Le = () => {},
  Fc = () => !1,
  Ni = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Oi = (e) => e.startsWith('onUpdate:'),
  re = Object.assign,
  ga = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  tp = Object.prototype.hasOwnProperty,
  vt = (e, t) => tp.call(e, t),
  nt = Array.isArray,
  cr = (e) => xs(e) === '[object Map]',
  Rr = (e) => xs(e) === '[object Set]',
  su = (e) => xs(e) === '[object Date]',
  at = (e) => typeof e == 'function',
  kt = (e) => typeof e == 'string',
  je = (e) => typeof e == 'symbol',
  wt = (e) => e !== null && typeof e == 'object',
  Uc = (e) => (wt(e) || at(e)) && at(e.then) && at(e.catch),
  Bc = Object.prototype.toString,
  xs = (e) => Bc.call(e),
  ep = (e) => xs(e).slice(8, -1),
  jc = (e) => xs(e) === '[object Object]',
  _a = (e) => kt(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  ns = ma(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Mi = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  np = /-\w/g,
  Re = Mi((e) => e.replace(np, (t) => t.slice(1).toUpperCase())),
  rp = /\B([A-Z])/g,
  Qn = Mi((e) => e.replace(rp, '-$1').toLowerCase()),
  $c = Mi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  vo = Mi((e) => (e ? `on${$c(e)}` : '')),
  Me = (e, t) => !Object.is(e, t),
  ai = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  qc = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n })
  },
  Li = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let iu
const Fi = () =>
  iu ||
  (iu =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function ya(e) {
  if (nt(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = kt(r) ? ap(r) : ya(r)
      if (s) for (const i in s) t[i] = s[i]
    }
    return t
  } else if (kt(e) || wt(e)) return e
}
const sp = /;(?![^(]*\))/g,
  ip = /:([^]+)/,
  op = /\/\*[^]*?\*\//g
function ap(e) {
  const t = {}
  return (
    e
      .replace(op, '')
      .split(sp)
      .forEach((n) => {
        if (n) {
          const r = n.split(ip)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function Ui(e) {
  let t = ''
  if (kt(e)) t = e
  else if (nt(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ui(e[n])
      r && (t += r + ' ')
    }
  else if (wt(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const lp = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  up = ma(lp)
function Kc(e) {
  return !!e || e === ''
}
function cp(e, t) {
  if (e.length !== t.length) return !1
  let n = !0
  for (let r = 0; n && r < e.length; r++) n = An(e[r], t[r])
  return n
}
function An(e, t) {
  if (e === t) return !0
  let n = su(e),
    r = su(t)
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1
  if (((n = je(e)), (r = je(t)), n || r)) return e === t
  if (((n = nt(e)), (r = nt(t)), n || r)) return n && r ? cp(e, t) : !1
  if (((n = wt(e)), (r = wt(t)), n || r)) {
    if (!n || !r) return !1
    const s = Object.keys(e).length,
      i = Object.keys(t).length
    if (s !== i) return !1
    for (const a in e) {
      const l = e.hasOwnProperty(a),
        c = t.hasOwnProperty(a)
      if ((l && !c) || (!l && c) || !An(e[a], t[a])) return !1
    }
  }
  return String(e) === String(t)
}
function va(e, t) {
  return e.findIndex((n) => An(n, t))
}
const Hc = (e) => !!(e && e.__v_isRef === !0),
  ke = (e) =>
    kt(e)
      ? e
      : e == null
        ? ''
        : nt(e) || (wt(e) && (e.toString === Bc || !at(e.toString)))
          ? Hc(e)
            ? ke(e.value)
            : JSON.stringify(e, zc, 2)
          : String(e),
  zc = (e, t) =>
    Hc(t)
      ? zc(e, t.value)
      : cr(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], i) => ((n[Eo(r, i) + ' =>'] = s), n),
              {}
            )
          }
        : Rr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Eo(n)) }
          : je(t)
            ? Eo(t)
            : wt(t) && !nt(t) && !jc(t)
              ? String(t)
              : t,
  Eo = (e, t = '') => {
    var n
    return je(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.5.34
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Kt
class hp {
  constructor(t = !1) {
    ;((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this._warnOnRun = !0),
      (this.__v_skip = !0),
      !t &&
        Kt &&
        (Kt.active
          ? ((this.parent = Kt), (this.index = (Kt.scopes || (Kt.scopes = [])).push(this) - 1))
          : ((this._active = !1), (this._warnOnRun = !1))))
  }
  get active() {
    return this._active
  }
  pause() {
    if (this._active) {
      this._isPaused = !0
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1
      let t, n
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume()
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
    }
  }
  run(t) {
    if (this._active) {
      const n = Kt
      try {
        return ((Kt = this), t())
      } finally {
        Kt = n
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = Kt), (Kt = this))
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Kt === this) Kt = this.prevScope
      else {
        let t = Kt
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope
            break
          }
          t = t.prevScope
        }
      }
      this.prevScope = void 0
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
        this.scopes.length = 0
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop()
        s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index))
      }
      this.parent = void 0
    }
  }
}
function fp() {
  return Kt
}
let At
const To = new WeakSet()
class Wc {
  constructor(t) {
    ;((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Kt && (Kt.active ? Kt.effects.push(this) : (this.flags &= -2)))
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), To.has(this) && (To.delete(this), this.trigger()))
  }
  notify() {
    ;(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Qc(this)
  }
  run() {
    if (!(this.flags & 1)) return this.fn()
    ;((this.flags |= 2), ou(this), Yc(this))
    const t = At,
      n = xe
    ;((At = this), (xe = !0))
    try {
      return this.fn()
    } finally {
      ;(Xc(this), (At = t), (xe = n), (this.flags &= -3))
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) wa(t)
      ;((this.deps = this.depsTail = void 0),
        ou(this),
        this.onStop && this.onStop(),
        (this.flags &= -2))
    }
  }
  trigger() {
    this.flags & 64 ? To.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
  }
  runIfDirty() {
    Fo(this) && this.run()
  }
  get dirty() {
    return Fo(this)
  }
}
let Gc = 0,
  rs,
  ss
function Qc(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ;((e.next = ss), (ss = e))
    return
  }
  ;((e.next = rs), (rs = e))
}
function Ea() {
  Gc++
}
function Ta() {
  if (--Gc > 0) return
  if (ss) {
    let t = ss
    for (ss = void 0; t; ) {
      const n = t.next
      ;((t.next = void 0), (t.flags &= -9), (t = n))
    }
  }
  let e
  for (; rs; ) {
    let t = rs
    for (rs = void 0; t; ) {
      const n = t.next
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger()
        } catch (r) {
          e || (e = r)
        }
      t = n
    }
  }
  if (e) throw e
}
function Yc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t))
}
function Xc(e) {
  let t,
    n = e.depsTail,
    r = n
  for (; r; ) {
    const s = r.prevDep
    ;(r.version === -1 ? (r === n && (n = s), wa(r), dp(r)) : (t = r),
      (r.dep.activeLink = r.prevActiveLink),
      (r.prevActiveLink = void 0),
      (r = s))
  }
  ;((e.deps = t), (e.depsTail = n))
}
function Fo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Jc(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0
  return !!e._dirty
}
function Jc(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === ds) ||
    ((e.globalVersion = ds), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Fo(e)))
  )
    return
  e.flags |= 2
  const t = e.dep,
    n = At,
    r = xe
  ;((At = e), (xe = !0))
  try {
    Yc(e)
    const s = e.fn(e._value)
    ;(t.version === 0 || Me(s, e._value)) && ((e.flags |= 128), (e._value = s), t.version++)
  } catch (s) {
    throw (t.version++, s)
  } finally {
    ;((At = n), (xe = r), Xc(e), (e.flags &= -3))
  }
}
function wa(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e
  if (
    (r && ((r.nextSub = s), (e.prevSub = void 0)),
    s && ((s.prevSub = r), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = r), !r && n.computed))
  ) {
    n.computed.flags &= -5
    for (let i = n.computed.deps; i; i = i.nextDep) wa(i, !0)
  }
  !t && !--n.sc && n.map && n.map.delete(n.key)
}
function dp(e) {
  const { prevDep: t, nextDep: n } = e
  ;(t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)))
}
let xe = !0
const Zc = []
function sn() {
  ;(Zc.push(xe), (xe = !1))
}
function on() {
  const e = Zc.pop()
  xe = e === void 0 ? !0 : e
}
function ou(e) {
  const { cleanup: t } = e
  if (((e.cleanup = void 0), t)) {
    const n = At
    At = void 0
    try {
      t()
    } finally {
      At = n
    }
  }
}
let ds = 0
class pp {
  constructor(t, n) {
    ;((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0))
  }
}
class ba {
  constructor(t) {
    ;((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0))
  }
  track(t) {
    if (!At || !xe || At === this.computed) return
    let n = this.activeLink
    if (n === void 0 || n.sub !== At)
      ((n = this.activeLink = new pp(At, this)),
        At.deps
          ? ((n.prevDep = At.depsTail), (At.depsTail.nextDep = n), (At.depsTail = n))
          : (At.deps = At.depsTail = n),
        th(n))
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const r = n.nextDep
      ;((r.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = r),
        (n.prevDep = At.depsTail),
        (n.nextDep = void 0),
        (At.depsTail.nextDep = n),
        (At.depsTail = n),
        At.deps === n && (At.deps = r))
    }
    return n
  }
  trigger(t) {
    ;(this.version++, ds++, this.notify(t))
  }
  notify(t) {
    Ea()
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
    } finally {
      Ta()
    }
  }
}
function th(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed
    if (t && !e.dep.subs) {
      t.flags |= 20
      for (let r = t.deps; r; r = r.nextDep) th(r)
    }
    const n = e.dep.subs
    ;(n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e))
  }
}
const Uo = new WeakMap(),
  qn = Symbol(''),
  Bo = Symbol(''),
  ps = Symbol('')
function te(e, t, n) {
  if (xe && At) {
    let r = Uo.get(e)
    r || Uo.set(e, (r = new Map()))
    let s = r.get(n)
    ;(s || (r.set(n, (s = new ba())), (s.map = r), (s.key = n)), s.track())
  }
}
function tn(e, t, n, r, s, i) {
  const a = Uo.get(e)
  if (!a) {
    ds++
    return
  }
  const l = (c) => {
    c && c.trigger()
  }
  if ((Ea(), t === 'clear')) a.forEach(l)
  else {
    const c = nt(e),
      f = c && _a(n)
    if (c && n === 'length') {
      const d = Number(r)
      a.forEach((m, w) => {
        ;(w === 'length' || w === ps || (!je(w) && w >= d)) && l(m)
      })
    } else
      switch (((n !== void 0 || a.has(void 0)) && l(a.get(n)), f && l(a.get(ps)), t)) {
        case 'add':
          c ? f && l(a.get('length')) : (l(a.get(qn)), cr(e) && l(a.get(Bo)))
          break
        case 'delete':
          c || (l(a.get(qn)), cr(e) && l(a.get(Bo)))
          break
        case 'set':
          cr(e) && l(a.get(qn))
          break
      }
  }
  Ta()
}
function sr(e) {
  const t = yt(e)
  return t === e ? t : (te(t, 'iterate', ps), ve(e) ? t : t.map(Pe))
}
function Bi(e) {
  return (te((e = yt(e)), 'iterate', ps), e)
}
function Ne(e, t) {
  return an(e) ? pr(Kn(e) ? Pe(t) : t) : Pe(t)
}
const mp = {
  __proto__: null,
  [Symbol.iterator]() {
    return wo(this, Symbol.iterator, (e) => Ne(this, e))
  },
  concat(...e) {
    return sr(this).concat(...e.map((t) => (nt(t) ? sr(t) : t)))
  },
  entries() {
    return wo(this, 'entries', (e) => ((e[1] = Ne(this, e[1])), e))
  },
  every(e, t) {
    return Xe(this, 'every', e, t, void 0, arguments)
  },
  filter(e, t) {
    return Xe(this, 'filter', e, t, (n) => n.map((r) => Ne(this, r)), arguments)
  },
  find(e, t) {
    return Xe(this, 'find', e, t, (n) => Ne(this, n), arguments)
  },
  findIndex(e, t) {
    return Xe(this, 'findIndex', e, t, void 0, arguments)
  },
  findLast(e, t) {
    return Xe(this, 'findLast', e, t, (n) => Ne(this, n), arguments)
  },
  findLastIndex(e, t) {
    return Xe(this, 'findLastIndex', e, t, void 0, arguments)
  },
  forEach(e, t) {
    return Xe(this, 'forEach', e, t, void 0, arguments)
  },
  includes(...e) {
    return bo(this, 'includes', e)
  },
  indexOf(...e) {
    return bo(this, 'indexOf', e)
  },
  join(e) {
    return sr(this).join(e)
  },
  lastIndexOf(...e) {
    return bo(this, 'lastIndexOf', e)
  },
  map(e, t) {
    return Xe(this, 'map', e, t, void 0, arguments)
  },
  pop() {
    return zr(this, 'pop')
  },
  push(...e) {
    return zr(this, 'push', e)
  },
  reduce(e, ...t) {
    return au(this, 'reduce', e, t)
  },
  reduceRight(e, ...t) {
    return au(this, 'reduceRight', e, t)
  },
  shift() {
    return zr(this, 'shift')
  },
  some(e, t) {
    return Xe(this, 'some', e, t, void 0, arguments)
  },
  splice(...e) {
    return zr(this, 'splice', e)
  },
  toReversed() {
    return sr(this).toReversed()
  },
  toSorted(e) {
    return sr(this).toSorted(e)
  },
  toSpliced(...e) {
    return sr(this).toSpliced(...e)
  },
  unshift(...e) {
    return zr(this, 'unshift', e)
  },
  values() {
    return wo(this, 'values', (e) => Ne(this, e))
  }
}
function wo(e, t, n) {
  const r = Bi(e),
    s = r[t]()
  return (
    r !== e &&
      !ve(e) &&
      ((s._next = s.next),
      (s.next = () => {
        const i = s._next()
        return (i.done || (i.value = n(i.value)), i)
      })),
    s
  )
}
const gp = Array.prototype
function Xe(e, t, n, r, s, i) {
  const a = Bi(e),
    l = a !== e && !ve(e),
    c = a[t]
  if (c !== gp[t]) {
    const m = c.apply(e, i)
    return l ? Pe(m) : m
  }
  let f = n
  a !== e &&
    (l
      ? (f = function (m, w) {
          return n.call(this, Ne(e, m), w, e)
        })
      : n.length > 2 &&
        (f = function (m, w) {
          return n.call(this, m, w, e)
        }))
  const d = c.call(a, f, r)
  return l && s ? s(d) : d
}
function au(e, t, n, r) {
  const s = Bi(e),
    i = s !== e && !ve(e)
  let a = n,
    l = !1
  s !== e &&
    (i
      ? ((l = r.length === 0),
        (a = function (f, d, m) {
          return (l && ((l = !1), (f = Ne(e, f))), n.call(this, f, Ne(e, d), m, e))
        }))
      : n.length > 3 &&
        (a = function (f, d, m) {
          return n.call(this, f, d, m, e)
        }))
  const c = s[t](a, ...r)
  return l ? Ne(e, c) : c
}
function bo(e, t, n) {
  const r = yt(e)
  te(r, 'iterate', ps)
  const s = r[t](...n)
  return (s === -1 || s === !1) && xa(n[0]) ? ((n[0] = yt(n[0])), r[t](...n)) : s
}
function zr(e, t, n = []) {
  ;(sn(), Ea())
  const r = yt(e)[t].apply(e, n)
  return (Ta(), on(), r)
}
const _p = ma('__proto__,__v_isRef,__isVue'),
  eh = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(je)
  )
function yp(e) {
  je(e) || (e = String(e))
  const t = yt(this)
  return (te(t, 'has', e), t.hasOwnProperty(e))
}
class nh {
  constructor(t = !1, n = !1) {
    ;((this._isReadonly = t), (this._isShallow = n))
  }
  get(t, n, r) {
    if (n === '__v_skip') return t.__v_skip
    const s = this._isReadonly,
      i = this._isShallow
    if (n === '__v_isReactive') return !s
    if (n === '__v_isReadonly') return s
    if (n === '__v_isShallow') return i
    if (n === '__v_raw')
      return r === (s ? (i ? Pp : oh) : i ? ih : sh).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const a = nt(t)
    if (!s) {
      let c
      if (a && (c = mp[n])) return c
      if (n === 'hasOwnProperty') return yp
    }
    const l = Reflect.get(t, n, ne(t) ? t : r)
    if ((je(n) ? eh.has(n) : _p(n)) || (s || te(t, 'get', n), i)) return l
    if (ne(l)) {
      const c = a && _a(n) ? l : l.value
      return s && wt(c) ? $o(c) : c
    }
    return wt(l) ? (s ? $o(l) : Aa(l)) : l
  }
}
class rh extends nh {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, s) {
    let i = t[n]
    const a = nt(t) && _a(n)
    if (!this._isShallow) {
      const f = an(i)
      if ((!ve(r) && !an(r) && ((i = yt(i)), (r = yt(r))), !a && ne(i) && !ne(r)))
        return (f || (i.value = r), !0)
    }
    const l = a ? Number(n) < t.length : vt(t, n),
      c = Reflect.set(t, n, r, ne(t) ? t : s)
    return (t === yt(s) && (l ? Me(r, i) && tn(t, 'set', n, r) : tn(t, 'add', n, r)), c)
  }
  deleteProperty(t, n) {
    const r = vt(t, n)
    t[n]
    const s = Reflect.deleteProperty(t, n)
    return (s && r && tn(t, 'delete', n, void 0), s)
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return ((!je(n) || !eh.has(n)) && te(t, 'has', n), r)
  }
  ownKeys(t) {
    return (te(t, 'iterate', nt(t) ? 'length' : qn), Reflect.ownKeys(t))
  }
}
class vp extends nh {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const Ep = new rh(),
  Tp = new vp(),
  wp = new rh(!0)
const jo = (e) => e,
  Zs = (e) => Reflect.getPrototypeOf(e)
function bp(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = yt(s),
      a = cr(i),
      l = e === 'entries' || (e === Symbol.iterator && a),
      c = e === 'keys' && a,
      f = s[e](...r),
      d = n ? jo : t ? pr : Pe
    return (
      !t && te(i, 'iterate', c ? Bo : qn),
      re(Object.create(f), {
        next() {
          const { value: m, done: w } = f.next()
          return w ? { value: m, done: w } : { value: l ? [d(m[0]), d(m[1])] : d(m), done: w }
        }
      })
    )
  }
}
function ti(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function Ip(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw,
        a = yt(i),
        l = yt(s)
      e || (Me(s, l) && te(a, 'get', s), te(a, 'get', l))
      const { has: c } = Zs(a),
        f = t ? jo : e ? pr : Pe
      if (c.call(a, s)) return f(i.get(s))
      if (c.call(a, l)) return f(i.get(l))
      i !== a && i.get(s)
    },
    get size() {
      const s = this.__v_raw
      return (!e && te(yt(s), 'iterate', qn), s.size)
    },
    has(s) {
      const i = this.__v_raw,
        a = yt(i),
        l = yt(s)
      return (
        e || (Me(s, l) && te(a, 'has', s), te(a, 'has', l)),
        s === l ? i.has(s) : i.has(s) || i.has(l)
      )
    },
    forEach(s, i) {
      const a = this,
        l = a.__v_raw,
        c = yt(l),
        f = t ? jo : e ? pr : Pe
      return (!e && te(c, 'iterate', qn), l.forEach((d, m) => s.call(i, f(d), f(m), a)))
    }
  }
  return (
    re(
      n,
      e
        ? { add: ti('add'), set: ti('set'), delete: ti('delete'), clear: ti('clear') }
        : {
            add(s) {
              const i = yt(this),
                a = Zs(i),
                l = yt(s),
                c = !t && !ve(s) && !an(s) ? l : s
              return (
                a.has.call(i, c) ||
                  (Me(s, c) && a.has.call(i, s)) ||
                  (Me(l, c) && a.has.call(i, l)) ||
                  (i.add(c), tn(i, 'add', c, c)),
                this
              )
            },
            set(s, i) {
              !t && !ve(i) && !an(i) && (i = yt(i))
              const a = yt(this),
                { has: l, get: c } = Zs(a)
              let f = l.call(a, s)
              f || ((s = yt(s)), (f = l.call(a, s)))
              const d = c.call(a, s)
              return (a.set(s, i), f ? Me(i, d) && tn(a, 'set', s, i) : tn(a, 'add', s, i), this)
            },
            delete(s) {
              const i = yt(this),
                { has: a, get: l } = Zs(i)
              let c = a.call(i, s)
              ;(c || ((s = yt(s)), (c = a.call(i, s))), l && l.call(i, s))
              const f = i.delete(s)
              return (c && tn(i, 'delete', s, void 0), f)
            },
            clear() {
              const s = yt(this),
                i = s.size !== 0,
                a = s.clear()
              return (i && tn(s, 'clear', void 0, void 0), a)
            }
          }
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      n[s] = bp(s, e, t)
    }),
    n
  )
}
function Ia(e, t) {
  const n = Ip(e, t)
  return (r, s, i) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
        ? e
        : s === '__v_raw'
          ? r
          : Reflect.get(vt(n, s) && s in r ? n : r, s, i)
}
const Ap = { get: Ia(!1, !1) },
  Rp = { get: Ia(!1, !0) },
  xp = { get: Ia(!0, !1) }
const sh = new WeakMap(),
  ih = new WeakMap(),
  oh = new WeakMap(),
  Pp = new WeakMap()
function Sp(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Cp(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Sp(ep(e))
}
function Aa(e) {
  return an(e) ? e : Ra(e, !1, Ep, Ap, sh)
}
function Vp(e) {
  return Ra(e, !1, wp, Rp, ih)
}
function $o(e) {
  return Ra(e, !0, Tp, xp, oh)
}
function Ra(e, t, n, r, s) {
  if (!wt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = Cp(e)
  if (i === 0) return e
  const a = s.get(e)
  if (a) return a
  const l = new Proxy(e, i === 2 ? r : n)
  return (s.set(e, l), l)
}
function Kn(e) {
  return an(e) ? Kn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function an(e) {
  return !!(e && e.__v_isReadonly)
}
function ve(e) {
  return !!(e && e.__v_isShallow)
}
function xa(e) {
  return e ? !!e.__v_raw : !1
}
function yt(e) {
  const t = e && e.__v_raw
  return t ? yt(t) : e
}
function kp(e) {
  return (!vt(e, '__v_skip') && Object.isExtensible(e) && qc(e, '__v_skip', !0), e)
}
const Pe = (e) => (wt(e) ? Aa(e) : e),
  pr = (e) => (wt(e) ? $o(e) : e)
function ne(e) {
  return e ? e.__v_isRef === !0 : !1
}
function _n(e) {
  return Dp(e, !1)
}
function Dp(e, t) {
  return ne(e) ? e : new Np(e, t)
}
class Np {
  constructor(t, n) {
    ;((this.dep = new ba()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : yt(t)),
      (this._value = n ? t : Pe(t)),
      (this.__v_isShallow = n))
  }
  get value() {
    return (this.dep.track(), this._value)
  }
  set value(t) {
    const n = this._rawValue,
      r = this.__v_isShallow || ve(t) || an(t)
    ;((t = r ? t : yt(t)),
      Me(t, n) && ((this._rawValue = t), (this._value = r ? t : Pe(t)), this.dep.trigger()))
  }
}
function Op(e) {
  return ne(e) ? e.value : e
}
const Mp = {
  get: (e, t, n) => (t === '__v_raw' ? e : Op(Reflect.get(e, t, n))),
  set: (e, t, n, r) => {
    const s = e[t]
    return ne(s) && !ne(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function ah(e) {
  return Kn(e) ? e : new Proxy(e, Mp)
}
class Lp {
  constructor(t, n, r) {
    ;((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new ba(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = ds - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = r))
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && At !== this)) return (Qc(this, !0), !0)
  }
  get value() {
    const t = this.dep.track()
    return (Jc(this), t && (t.version = this.dep.version), this._value)
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
function Fp(e, t, n = !1) {
  let r, s
  return (at(e) ? (r = e) : ((r = e.get), (s = e.set)), new Lp(r, s, n))
}
const ei = {},
  mi = new WeakMap()
let Bn
function Up(e, t = !1, n = Bn) {
  if (n) {
    let r = mi.get(n)
    ;(r || mi.set(n, (r = [])), r.push(e))
  }
}
function Bp(e, t, n = It) {
  const { immediate: r, deep: s, once: i, scheduler: a, augmentJob: l, call: c } = n,
    f = (K) => (s ? K : ve(K) || s === !1 || s === 0 ? en(K, 1) : en(K))
  let d,
    m,
    w,
    P,
    L = !1,
    D = !1
  if (
    (ne(e)
      ? ((m = () => e.value), (L = ve(e)))
      : Kn(e)
        ? ((m = () => f(e)), (L = !0))
        : nt(e)
          ? ((D = !0),
            (L = e.some((K) => Kn(K) || ve(K))),
            (m = () =>
              e.map((K) => {
                if (ne(K)) return K.value
                if (Kn(K)) return f(K)
                if (at(K)) return c ? c(K, 2) : K()
              })))
          : at(e)
            ? t
              ? (m = c ? () => c(e, 2) : e)
              : (m = () => {
                  if (w) {
                    sn()
                    try {
                      w()
                    } finally {
                      on()
                    }
                  }
                  const K = Bn
                  Bn = d
                  try {
                    return c ? c(e, 3, [P]) : e(P)
                  } finally {
                    Bn = K
                  }
                })
            : (m = Le),
    t && s)
  ) {
    const K = m,
      ut = s === !0 ? 1 / 0 : s
    m = () => en(K(), ut)
  }
  const O = fp(),
    G = () => {
      ;(d.stop(), O && O.active && ga(O.effects, d))
    }
  if (i && t) {
    const K = t
    t = (...ut) => {
      ;(K(...ut), G())
    }
  }
  let g = D ? new Array(e.length).fill(ei) : ei
  const S = (K) => {
    if (!(!(d.flags & 1) || (!d.dirty && !K)))
      if (t) {
        const ut = d.run()
        if (s || L || (D ? ut.some((_t, I) => Me(_t, g[I])) : Me(ut, g))) {
          w && w()
          const _t = Bn
          Bn = d
          try {
            const I = [ut, g === ei ? void 0 : D && g[0] === ei ? [] : g, P]
            ;((g = ut), c ? c(t, 3, I) : t(...I))
          } finally {
            Bn = _t
          }
        }
      } else d.run()
  }
  return (
    l && l(S),
    (d = new Wc(m)),
    (d.scheduler = a ? () => a(S, !1) : S),
    (P = (K) => Up(K, !1, d)),
    (w = d.onStop =
      () => {
        const K = mi.get(d)
        if (K) {
          if (c) c(K, 4)
          else for (const ut of K) ut()
          mi.delete(d)
        }
      }),
    t ? (r ? S(!0) : (g = d.run())) : a ? a(S.bind(null, !0), !0) : d.run(),
    (G.pause = d.pause.bind(d)),
    (G.resume = d.resume.bind(d)),
    (G.stop = G),
    G
  )
}
function en(e, t = 1 / 0, n) {
  if (t <= 0 || !wt(e) || e.__v_skip || ((n = n || new Map()), (n.get(e) || 0) >= t)) return e
  if ((n.set(e, t), t--, ne(e))) en(e.value, t, n)
  else if (nt(e)) for (let r = 0; r < e.length; r++) en(e[r], t, n)
  else if (Rr(e) || cr(e))
    e.forEach((r) => {
      en(r, t, n)
    })
  else if (jc(e)) {
    for (const r in e) en(e[r], t, n)
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && en(e[r], t, n)
  }
  return e
}
/**
 * @vue/runtime-core v3.5.34
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Ps(e, t, n, r) {
  try {
    return r ? e(...r) : e()
  } catch (s) {
    ji(s, t, n)
  }
}
function $e(e, t, n, r) {
  if (at(e)) {
    const s = Ps(e, t, n, r)
    return (
      s &&
        Uc(s) &&
        s.catch((i) => {
          ji(i, t, n)
        }),
      s
    )
  }
  if (nt(e)) {
    const s = []
    for (let i = 0; i < e.length; i++) s.push($e(e[i], t, n, r))
    return s
  }
}
function ji(e, t, n, r = !0) {
  const s = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: a } = (t && t.appContext.config) || It
  if (t) {
    let l = t.parent
    const c = t.proxy,
      f = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; l; ) {
      const d = l.ec
      if (d) {
        for (let m = 0; m < d.length; m++) if (d[m](e, c, f) === !1) return
      }
      l = l.parent
    }
    if (i) {
      ;(sn(), Ps(i, null, 10, [e, c, f]), on())
      return
    }
  }
  jp(e, n, s, r, a)
}
function jp(e, t, n, r = !0, s = !1) {
  if (s) throw e
  console.error(e)
}
const ae = []
let De = -1
const hr = []
let yn = null,
  ir = 0
const lh = Promise.resolve()
let gi = null
function uh(e) {
  const t = gi || lh
  return e ? t.then(this ? e.bind(this) : e) : t
}
function $p(e) {
  let t = De + 1,
    n = ae.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = ae[r],
      i = ms(s)
    i < e || (i === e && s.flags & 2) ? (t = r + 1) : (n = r)
  }
  return t
}
function Pa(e) {
  if (!(e.flags & 1)) {
    const t = ms(e),
      n = ae[ae.length - 1]
    ;(!n || (!(e.flags & 2) && t >= ms(n)) ? ae.push(e) : ae.splice($p(t), 0, e),
      (e.flags |= 1),
      ch())
  }
}
function ch() {
  gi || (gi = lh.then(fh))
}
function qp(e) {
  ;(nt(e)
    ? hr.push(...e)
    : yn && e.id === -1
      ? yn.splice(ir + 1, 0, e)
      : e.flags & 1 || (hr.push(e), (e.flags |= 1)),
    ch())
}
function lu(e, t, n = De + 1) {
  for (; n < ae.length; n++) {
    const r = ae[n]
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue
      ;(ae.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2))
    }
  }
}
function hh(e) {
  if (hr.length) {
    const t = [...new Set(hr)].sort((n, r) => ms(n) - ms(r))
    if (((hr.length = 0), yn)) {
      yn.push(...t)
      return
    }
    for (yn = t, ir = 0; ir < yn.length; ir++) {
      const n = yn[ir]
      ;(n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2))
    }
    ;((yn = null), (ir = 0))
  }
}
const ms = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id)
function fh(e) {
  try {
    for (De = 0; De < ae.length; De++) {
      const t = ae[De]
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2), Ps(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
    }
  } finally {
    for (; De < ae.length; De++) {
      const t = ae[De]
      t && (t.flags &= -2)
    }
    ;((De = -1), (ae.length = 0), hh(), (gi = null), (ae.length || hr.length) && fh())
  }
}
let ye = null,
  dh = null
function _i(e) {
  const t = ye
  return ((ye = e), (dh = (e && e.type.__scopeId) || null), t)
}
function Kp(e, t = ye, n) {
  if (!t || e._n) return e
  const r = (...s) => {
    r._d && vu(-1)
    const i = _i(t)
    let a
    try {
      a = e(...s)
    } finally {
      ;(_i(i), r._d && vu(1))
    }
    return a
  }
  return ((r._n = !0), (r._c = !0), (r._d = !0), r)
}
function pt(e, t) {
  if (ye === null) return e
  const n = Hi(ye),
    r = e.dirs || (e.dirs = [])
  for (let s = 0; s < t.length; s++) {
    let [i, a, l, c = It] = t[s]
    i &&
      (at(i) && (i = { mounted: i, updated: i }),
      i.deep && en(a),
      r.push({ dir: i, instance: n, value: a, oldValue: void 0, arg: l, modifiers: c }))
  }
  return e
}
function Fn(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs
  for (let a = 0; a < s.length; a++) {
    const l = s[a]
    i && (l.oldValue = i[a].value)
    let c = l.dir[r]
    c && (sn(), $e(c, n, 8, [e.el, l, e, t]), on())
  }
}
function Hp(e, t) {
  if (le) {
    let n = le.provides
    const r = le.parent && le.parent.provides
    ;(r === n && (n = le.provides = Object.create(r)), (n[e] = t))
  }
}
function li(e, t, n = !1) {
  const r = Hm()
  if (r || fr) {
    let s = fr
      ? fr._context.provides
      : r
        ? r.parent == null || r.ce
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0
    if (s && e in s) return s[e]
    if (arguments.length > 1) return n && at(t) ? t.call(r && r.proxy) : t
  }
}
const zp = Symbol.for('v-scx'),
  Wp = () => li(zp)
function Io(e, t, n) {
  return ph(e, t, n)
}
function ph(e, t, n = It) {
  const { immediate: r, deep: s, flush: i, once: a } = n,
    l = re({}, n),
    c = (t && r) || (!t && i !== 'post')
  let f
  if (_s) {
    if (i === 'sync') {
      const P = Wp()
      f = P.__watcherHandles || (P.__watcherHandles = [])
    } else if (!c) {
      const P = () => {}
      return ((P.stop = Le), (P.resume = Le), (P.pause = Le), P)
    }
  }
  const d = le
  l.call = (P, L, D) => $e(P, d, L, D)
  let m = !1
  ;(i === 'post'
    ? (l.scheduler = (P) => {
        ue(P, d && d.suspense)
      })
    : i !== 'sync' &&
      ((m = !0),
      (l.scheduler = (P, L) => {
        L ? P() : Pa(P)
      })),
    (l.augmentJob = (P) => {
      ;(t && (P.flags |= 4), m && ((P.flags |= 2), d && ((P.id = d.uid), (P.i = d))))
    }))
  const w = Bp(e, t, l)
  return (_s && (f ? f.push(w) : c && w()), w)
}
function Gp(e, t, n) {
  const r = this.proxy,
    s = kt(e) ? (e.includes('.') ? mh(r, e) : () => r[e]) : e.bind(r, r)
  let i
  at(t) ? (i = t) : ((i = t.handler), (n = t))
  const a = Ss(this),
    l = ph(s, i.bind(r), n)
  return (a(), l)
}
function mh(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let s = 0; s < n.length && r; s++) r = r[n[s]]
    return r
  }
}
const Qp = Symbol('_vte'),
  Yp = (e) => e.__isTeleport,
  Xp = Symbol('_leaveCb')
function Sa(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Sa(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
function gh(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0]
}
function uu(e, t) {
  let n
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable)
}
const yi = new WeakMap()
function is(e, t, n, r, s = !1) {
  if (nt(e)) {
    e.forEach((D, O) => is(D, t && (nt(t) ? t[O] : t), n, r, s))
    return
  }
  if (os(r) && !s) {
    r.shapeFlag & 512 &&
      r.type.__asyncResolved &&
      r.component.subTree.component &&
      is(e, t, n, r.component.subTree)
    return
  }
  const i = r.shapeFlag & 4 ? Hi(r.component) : r.el,
    a = s ? null : i,
    { i: l, r: c } = e,
    f = t && t.r,
    d = l.refs === It ? (l.refs = {}) : l.refs,
    m = l.setupState,
    w = yt(m),
    P = m === It ? Fc : (D) => (uu(d, D) ? !1 : vt(w, D)),
    L = (D, O) => !(O && uu(d, O))
  if (f != null && f !== c) {
    if ((cu(t), kt(f))) ((d[f] = null), P(f) && (m[f] = null))
    else if (ne(f)) {
      const D = t
      ;(L(f, D.k) && (f.value = null), D.k && (d[D.k] = null))
    }
  }
  if (at(c)) Ps(c, l, 12, [a, d])
  else {
    const D = kt(c),
      O = ne(c)
    if (D || O) {
      const G = () => {
        if (e.f) {
          const g = D ? (P(c) ? m[c] : d[c]) : L() || !e.k ? c.value : d[e.k]
          if (s) nt(g) && ga(g, i)
          else if (nt(g)) g.includes(i) || g.push(i)
          else if (D) ((d[c] = [i]), P(c) && (m[c] = d[c]))
          else {
            const S = [i]
            ;(L(c, e.k) && (c.value = S), e.k && (d[e.k] = S))
          }
        } else
          D
            ? ((d[c] = a), P(c) && (m[c] = a))
            : O && (L(c, e.k) && (c.value = a), e.k && (d[e.k] = a))
      }
      if (a) {
        const g = () => {
          ;(G(), yi.delete(e))
        }
        ;((g.id = -1), yi.set(e, g), ue(g, n))
      } else (cu(e), G())
    }
  }
}
function cu(e) {
  const t = yi.get(e)
  t && ((t.flags |= 8), yi.delete(e))
}
Fi().requestIdleCallback
Fi().cancelIdleCallback
const os = (e) => !!e.type.__asyncLoader,
  _h = (e) => e.type.__isKeepAlive
function Jp(e, t) {
  yh(e, 'a', t)
}
function Zp(e, t) {
  yh(e, 'da', t)
}
function yh(e, t, n = le) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n
      for (; s; ) {
        if (s.isDeactivated) return
        s = s.parent
      }
      return e()
    })
  if (($i(t, r, n), n)) {
    let s = n.parent
    for (; s && s.parent; ) (_h(s.parent.vnode) && tm(r, t, n, s), (s = s.parent))
  }
}
function tm(e, t, n, r) {
  const s = $i(t, e, r, !0)
  Eh(() => {
    ga(r[t], s)
  }, n)
}
function $i(e, t, n = le, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...a) => {
          sn()
          const l = Ss(n),
            c = $e(t, n, e, a)
          return (l(), on(), c)
        })
    return (r ? s.unshift(i) : s.push(i), i)
  }
}
const hn =
    (e) =>
    (t, n = le) => {
      ;(!_s || e === 'sp') && $i(e, (...r) => t(...r), n)
    },
  em = hn('bm'),
  vh = hn('m'),
  nm = hn('bu'),
  rm = hn('u'),
  sm = hn('bum'),
  Eh = hn('um'),
  im = hn('sp'),
  om = hn('rtg'),
  am = hn('rtc')
function lm(e, t = le) {
  $i('ec', e, t)
}
const um = Symbol.for('v-ndc')
function Wr(e, t, n, r) {
  let s
  const i = n,
    a = nt(e)
  if (a || kt(e)) {
    const l = a && Kn(e)
    let c = !1,
      f = !1
    ;(l && ((c = !ve(e)), (f = an(e)), (e = Bi(e))), (s = new Array(e.length)))
    for (let d = 0, m = e.length; d < m; d++)
      s[d] = t(c ? (f ? pr(Pe(e[d])) : Pe(e[d])) : e[d], d, void 0, i)
  } else if (typeof e == 'number') {
    s = new Array(e)
    for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, i)
  } else if (wt(e))
    if (e[Symbol.iterator]) s = Array.from(e, (l, c) => t(l, c, void 0, i))
    else {
      const l = Object.keys(e)
      s = new Array(l.length)
      for (let c = 0, f = l.length; c < f; c++) {
        const d = l[c]
        s[c] = t(e[d], d, c, i)
      }
    }
  else s = []
  return s
}
const qo = (e) => (e ? ($h(e) ? Hi(e) : qo(e.parent)) : null),
  as = re(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => qo(e.parent),
    $root: (e) => qo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => wh(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Pa(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = uh.bind(e.proxy)),
    $watch: (e) => Gp.bind(e)
  }),
  Ao = (e, t) => e !== It && !e.__isScriptSetup && vt(e, t),
  cm = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const { ctx: n, setupState: r, data: s, props: i, accessCache: a, type: l, appContext: c } = e
      if (t[0] !== '$') {
        const w = a[t]
        if (w !== void 0)
          switch (w) {
            case 1:
              return r[t]
            case 2:
              return s[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (Ao(r, t)) return ((a[t] = 1), r[t])
          if (s !== It && vt(s, t)) return ((a[t] = 2), s[t])
          if (vt(i, t)) return ((a[t] = 3), i[t])
          if (n !== It && vt(n, t)) return ((a[t] = 4), n[t])
          Ko && (a[t] = 0)
        }
      }
      const f = as[t]
      let d, m
      if (f) return (t === '$attrs' && te(e.attrs, 'get', ''), f(e))
      if ((d = l.__cssModules) && (d = d[t])) return d
      if (n !== It && vt(n, t)) return ((a[t] = 4), n[t])
      if (((m = c.config.globalProperties), vt(m, t))) return m[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e
      return Ao(s, t)
        ? ((s[t] = n), !0)
        : r !== It && vt(r, t)
          ? ((r[t] = n), !0)
          : vt(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, props: i, type: a } },
      l
    ) {
      let c
      return !!(
        n[l] ||
        (e !== It && l[0] !== '$' && vt(e, l)) ||
        Ao(t, l) ||
        vt(i, l) ||
        vt(r, l) ||
        vt(as, l) ||
        vt(s.config.globalProperties, l) ||
        ((c = a.__cssModules) && c[l])
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : vt(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
function hu(e) {
  return nt(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let Ko = !0
function hm(e) {
  const t = wh(e),
    n = e.proxy,
    r = e.ctx
  ;((Ko = !1), t.beforeCreate && fu(t.beforeCreate, e, 'bc'))
  const {
    data: s,
    computed: i,
    methods: a,
    watch: l,
    provide: c,
    inject: f,
    created: d,
    beforeMount: m,
    mounted: w,
    beforeUpdate: P,
    updated: L,
    activated: D,
    deactivated: O,
    beforeDestroy: G,
    beforeUnmount: g,
    destroyed: S,
    unmounted: K,
    render: ut,
    renderTracked: _t,
    renderTriggered: I,
    errorCaptured: _,
    serverPrefetch: E,
    expose: T,
    inheritAttrs: A,
    components: x,
    directives: v,
    filters: he
  } = t
  if ((f && fm(f, r, null), a))
    for (const Et in a) {
      const ft = a[Et]
      at(ft) && (r[Et] = ft.bind(n))
    }
  if (s) {
    const Et = s.call(n, n)
    wt(Et) && (e.data = Aa(Et))
  }
  if (((Ko = !0), i))
    for (const Et in i) {
      const ft = i[Et],
        we = at(ft) ? ft.bind(n, n) : at(ft.get) ? ft.get.bind(n, n) : Le,
        Vn = !at(ft) && at(ft.set) ? ft.set.bind(n) : Le,
        We = Kh({ get: we, set: Vn })
      Object.defineProperty(r, Et, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (Mt) => (We.value = Mt)
      })
    }
  if (l) for (const Et in l) Th(l[Et], r, n, Et)
  if (c) {
    const Et = at(c) ? c.call(n) : c
    Reflect.ownKeys(Et).forEach((ft) => {
      Hp(ft, Et[ft])
    })
  }
  d && fu(d, e, 'c')
  function jt(Et, ft) {
    nt(ft) ? ft.forEach((we) => Et(we.bind(n))) : ft && Et(ft.bind(n))
  }
  if (
    (jt(em, m),
    jt(vh, w),
    jt(nm, P),
    jt(rm, L),
    jt(Jp, D),
    jt(Zp, O),
    jt(lm, _),
    jt(am, _t),
    jt(om, I),
    jt(sm, g),
    jt(Eh, K),
    jt(im, E),
    nt(T))
  )
    if (T.length) {
      const Et = e.exposed || (e.exposed = {})
      T.forEach((ft) => {
        Object.defineProperty(Et, ft, {
          get: () => n[ft],
          set: (we) => (n[ft] = we),
          enumerable: !0
        })
      })
    } else e.exposed || (e.exposed = {})
  ;(ut && e.render === Le && (e.render = ut),
    A != null && (e.inheritAttrs = A),
    x && (e.components = x),
    v && (e.directives = v),
    E && gh(e))
}
function fm(e, t, n = Le) {
  nt(e) && (e = Ho(e))
  for (const r in e) {
    const s = e[r]
    let i
    ;(wt(s)
      ? 'default' in s
        ? (i = li(s.from || r, s.default, !0))
        : (i = li(s.from || r))
      : (i = li(s)),
      ne(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (a) => (i.value = a)
          })
        : (t[r] = i))
  }
}
function fu(e, t, n) {
  $e(nt(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Th(e, t, n, r) {
  let s = r.includes('.') ? mh(n, r) : () => n[r]
  if (kt(e)) {
    const i = t[e]
    at(i) && Io(s, i)
  } else if (at(e)) Io(s, e.bind(n))
  else if (wt(e))
    if (nt(e)) e.forEach((i) => Th(i, t, n, r))
    else {
      const i = at(e.handler) ? e.handler.bind(n) : t[e.handler]
      at(i) && Io(s, i, e)
    }
}
function wh(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: a }
    } = e.appContext,
    l = i.get(t)
  let c
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
        ? (c = t)
        : ((c = {}), s.length && s.forEach((f) => vi(c, f, a, !0)), vi(c, t, a)),
    wt(t) && i.set(t, c),
    c
  )
}
function vi(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t
  ;(i && vi(e, i, n, !0), s && s.forEach((a) => vi(e, a, n, !0)))
  for (const a in t)
    if (!(r && a === 'expose')) {
      const l = dm[a] || (n && n[a])
      e[a] = l ? l(e[a], t[a]) : t[a]
    }
  return e
}
const dm = {
  data: du,
  props: pu,
  emits: pu,
  methods: Xr,
  computed: Xr,
  beforeCreate: ie,
  created: ie,
  beforeMount: ie,
  mounted: ie,
  beforeUpdate: ie,
  updated: ie,
  beforeDestroy: ie,
  beforeUnmount: ie,
  destroyed: ie,
  unmounted: ie,
  activated: ie,
  deactivated: ie,
  errorCaptured: ie,
  serverPrefetch: ie,
  components: Xr,
  directives: Xr,
  watch: mm,
  provide: du,
  inject: pm
}
function du(e, t) {
  return t
    ? e
      ? function () {
          return re(at(e) ? e.call(this, this) : e, at(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function pm(e, t) {
  return Xr(Ho(e), Ho(t))
}
function Ho(e) {
  if (nt(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Xr(e, t) {
  return e ? re(Object.create(null), e, t) : t
}
function pu(e, t) {
  return e
    ? nt(e) && nt(t)
      ? [...new Set([...e, ...t])]
      : re(Object.create(null), hu(e), hu(t ?? {}))
    : t
}
function mm(e, t) {
  if (!e) return t
  if (!t) return e
  const n = re(Object.create(null), e)
  for (const r in t) n[r] = ie(e[r], t[r])
  return n
}
function bh() {
  return {
    app: null,
    config: {
      isNativeTag: Fc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let gm = 0
function _m(e, t) {
  return function (r, s = null) {
    ;(at(r) || (r = re({}, r)), s != null && !wt(s) && (s = null))
    const i = bh(),
      a = new WeakSet(),
      l = []
    let c = !1
    const f = (i.app = {
      _uid: gm++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Xm,
      get config() {
        return i.config
      },
      set config(d) {},
      use(d, ...m) {
        return (
          a.has(d) ||
            (d && at(d.install) ? (a.add(d), d.install(f, ...m)) : at(d) && (a.add(d), d(f, ...m))),
          f
        )
      },
      mixin(d) {
        return (i.mixins.includes(d) || i.mixins.push(d), f)
      },
      component(d, m) {
        return m ? ((i.components[d] = m), f) : i.components[d]
      },
      directive(d, m) {
        return m ? ((i.directives[d] = m), f) : i.directives[d]
      },
      mount(d, m, w) {
        if (!c) {
          const P = f._ceVNode || Fe(r, s)
          return (
            (P.appContext = i),
            w === !0 ? (w = 'svg') : w === !1 && (w = void 0),
            e(P, d, w),
            (c = !0),
            (f._container = d),
            (d.__vue_app__ = f),
            Hi(P.component)
          )
        }
      },
      onUnmount(d) {
        l.push(d)
      },
      unmount() {
        c && ($e(l, f._instance, 16), e(null, f._container), delete f._container.__vue_app__)
      },
      provide(d, m) {
        return ((i.provides[d] = m), f)
      },
      runWithContext(d) {
        const m = fr
        fr = f
        try {
          return d()
        } finally {
          fr = m
        }
      }
    })
    return f
  }
}
let fr = null
const ym = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Re(t)}Modifiers`] || e[`${Qn(t)}Modifiers`]
function vm(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || It
  let s = n
  const i = t.startsWith('update:'),
    a = i && ym(r, t.slice(7))
  a && (a.trim && (s = n.map((d) => (kt(d) ? d.trim() : d))), a.number && (s = n.map(Li)))
  let l,
    c = r[(l = vo(t))] || r[(l = vo(Re(t)))]
  ;(!c && i && (c = r[(l = vo(Qn(t)))]), c && $e(c, e, 6, s))
  const f = r[l + 'Once']
  if (f) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;((e.emitted[l] = !0), $e(f, e, 6, s))
  }
}
const Em = new WeakMap()
function Ih(e, t, n = !1) {
  const r = n ? Em : t.emitsCache,
    s = r.get(e)
  if (s !== void 0) return s
  const i = e.emits
  let a = {},
    l = !1
  if (!at(e)) {
    const c = (f) => {
      const d = Ih(f, t, !0)
      d && ((l = !0), re(a, d))
    }
    ;(!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c))
  }
  return !i && !l
    ? (wt(e) && r.set(e, null), null)
    : (nt(i) ? i.forEach((c) => (a[c] = null)) : re(a, i), wt(e) && r.set(e, a), a)
}
function qi(e, t) {
  return !e || !Ni(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      vt(e, t[0].toLowerCase() + t.slice(1)) || vt(e, Qn(t)) || vt(e, t))
}
function mu(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [i],
      slots: a,
      attrs: l,
      emit: c,
      render: f,
      renderCache: d,
      props: m,
      data: w,
      setupState: P,
      ctx: L,
      inheritAttrs: D
    } = e,
    O = _i(e)
  let G, g
  try {
    if (n.shapeFlag & 4) {
      const K = s || r,
        ut = K
      ;((G = Oe(f.call(ut, K, d, m, P, w, L))), (g = l))
    } else {
      const K = t
      ;((G = Oe(K.length > 1 ? K(m, { attrs: l, slots: a, emit: c }) : K(m, null))),
        (g = t.props ? l : Tm(l)))
    }
  } catch (K) {
    ;((ls.length = 0), ji(K, e, 1), (G = Fe(Rn)))
  }
  let S = G
  if (g && D !== !1) {
    const K = Object.keys(g),
      { shapeFlag: ut } = S
    K.length && ut & 7 && (i && K.some(Oi) && (g = wm(g, i)), (S = mr(S, g, !1, !0)))
  }
  return (
    n.dirs && ((S = mr(S, null, !1, !0)), (S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs)),
    n.transition && Sa(S, n.transition),
    (G = S),
    _i(O),
    G
  )
}
const Tm = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || Ni(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  wm = (e, t) => {
    const n = {}
    for (const r in e) (!Oi(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function bm(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: a, children: l, patchFlag: c } = t,
    f = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && c >= 0) {
    if (c & 1024) return !0
    if (c & 16) return r ? gu(r, a, f) : !!a
    if (c & 8) {
      const d = t.dynamicProps
      for (let m = 0; m < d.length; m++) {
        const w = d[m]
        if (Ah(a, r, w) && !qi(f, w)) return !0
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : r === a ? !1 : r ? (a ? gu(r, a, f) : !0) : !!a
  return !1
}
function gu(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let s = 0; s < r.length; s++) {
    const i = r[s]
    if (Ah(t, e, i) && !qi(n, i)) return !0
  }
  return !1
}
function Ah(e, t, n) {
  const r = e[n],
    s = t[n]
  return n === 'style' && wt(r) && wt(s) ? !An(r, s) : r !== s
}
function Im({ vnode: e, parent: t, suspense: n }, r) {
  for (; t; ) {
    const s = t.subTree
    if (
      (s.suspense && s.suspense.activeBranch === e && ((s.suspense.vnode.el = s.el = r), (e = s)),
      s === e)
    )
      (((e = t.vnode).el = r), (t = t.parent))
    else break
  }
  n && n.activeBranch === e && (n.vnode.el = r)
}
const Rh = {},
  xh = () => Object.create(Rh),
  Ph = (e) => Object.getPrototypeOf(e) === Rh
function Am(e, t, n, r = !1) {
  const s = {},
    i = xh()
  ;((e.propsDefaults = Object.create(null)), Sh(e, t, s, i))
  for (const a in e.propsOptions[0]) a in s || (s[a] = void 0)
  ;(n ? (e.props = r ? s : Vp(s)) : e.type.props ? (e.props = s) : (e.props = i), (e.attrs = i))
}
function Rm(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: a }
    } = e,
    l = yt(s),
    [c] = e.propsOptions
  let f = !1
  if ((r || a > 0) && !(a & 16)) {
    if (a & 8) {
      const d = e.vnode.dynamicProps
      for (let m = 0; m < d.length; m++) {
        let w = d[m]
        if (qi(e.emitsOptions, w)) continue
        const P = t[w]
        if (c)
          if (vt(i, w)) P !== i[w] && ((i[w] = P), (f = !0))
          else {
            const L = Re(w)
            s[L] = zo(c, l, L, P, e, !1)
          }
        else P !== i[w] && ((i[w] = P), (f = !0))
      }
    }
  } else {
    Sh(e, t, s, i) && (f = !0)
    let d
    for (const m in l)
      (!t || (!vt(t, m) && ((d = Qn(m)) === m || !vt(t, d)))) &&
        (c
          ? n && (n[m] !== void 0 || n[d] !== void 0) && (s[m] = zo(c, l, m, void 0, e, !0))
          : delete s[m])
    if (i !== l) for (const m in i) (!t || !vt(t, m)) && (delete i[m], (f = !0))
  }
  f && tn(e.attrs, 'set', '')
}
function Sh(e, t, n, r) {
  const [s, i] = e.propsOptions
  let a = !1,
    l
  if (t)
    for (let c in t) {
      if (ns(c)) continue
      const f = t[c]
      let d
      s && vt(s, (d = Re(c)))
        ? !i || !i.includes(d)
          ? (n[d] = f)
          : ((l || (l = {}))[d] = f)
        : qi(e.emitsOptions, c) || ((!(c in r) || f !== r[c]) && ((r[c] = f), (a = !0)))
    }
  if (i) {
    const c = yt(n),
      f = l || It
    for (let d = 0; d < i.length; d++) {
      const m = i[d]
      n[m] = zo(s, c, m, f[m], e, !vt(f, m))
    }
  }
  return a
}
function zo(e, t, n, r, s, i) {
  const a = e[n]
  if (a != null) {
    const l = vt(a, 'default')
    if (l && r === void 0) {
      const c = a.default
      if (a.type !== Function && !a.skipFactory && at(c)) {
        const { propsDefaults: f } = s
        if (n in f) r = f[n]
        else {
          const d = Ss(s)
          ;((r = f[n] = c.call(null, t)), d())
        }
      } else r = c
      s.ce && s.ce._setProp(n, r)
    }
    a[0] && (i && !l ? (r = !1) : a[1] && (r === '' || r === Qn(n)) && (r = !0))
  }
  return r
}
const xm = new WeakMap()
function Ch(e, t, n = !1) {
  const r = n ? xm : t.propsCache,
    s = r.get(e)
  if (s) return s
  const i = e.props,
    a = {},
    l = []
  let c = !1
  if (!at(e)) {
    const d = (m) => {
      c = !0
      const [w, P] = Ch(m, t, !0)
      ;(re(a, w), P && l.push(...P))
    }
    ;(!n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d))
  }
  if (!i && !c) return (wt(e) && r.set(e, ur), ur)
  if (nt(i))
    for (let d = 0; d < i.length; d++) {
      const m = Re(i[d])
      _u(m) && (a[m] = It)
    }
  else if (i)
    for (const d in i) {
      const m = Re(d)
      if (_u(m)) {
        const w = i[d],
          P = (a[m] = nt(w) || at(w) ? { type: w } : re({}, w)),
          L = P.type
        let D = !1,
          O = !0
        if (nt(L))
          for (let G = 0; G < L.length; ++G) {
            const g = L[G],
              S = at(g) && g.name
            if (S === 'Boolean') {
              D = !0
              break
            } else S === 'String' && (O = !1)
          }
        else D = at(L) && L.name === 'Boolean'
        ;((P[0] = D), (P[1] = O), (D || vt(P, 'default')) && l.push(m))
      }
    }
  const f = [a, l]
  return (wt(e) && r.set(e, f), f)
}
function _u(e) {
  return e[0] !== '$' && !ns(e)
}
const Ca = (e) => e === '_' || e === '_ctx' || e === '$stable',
  Va = (e) => (nt(e) ? e.map(Oe) : [Oe(e)]),
  Pm = (e, t, n) => {
    if (t._n) return t
    const r = Kp((...s) => Va(t(...s)), n)
    return ((r._c = !1), r)
  },
  Vh = (e, t, n) => {
    const r = e._ctx
    for (const s in e) {
      if (Ca(s)) continue
      const i = e[s]
      if (at(i)) t[s] = Pm(s, i, r)
      else if (i != null) {
        const a = Va(i)
        t[s] = () => a
      }
    }
  },
  kh = (e, t) => {
    const n = Va(t)
    e.slots.default = () => n
  },
  Dh = (e, t, n) => {
    for (const r in t) (n || !Ca(r)) && (e[r] = t[r])
  },
  Sm = (e, t, n) => {
    const r = (e.slots = xh())
    if (e.vnode.shapeFlag & 32) {
      const s = t._
      s ? (Dh(r, t, n), n && qc(r, '_', s, !0)) : Vh(t, r)
    } else t && kh(e, t)
  },
  Cm = (e, t, n) => {
    const { vnode: r, slots: s } = e
    let i = !0,
      a = It
    if (r.shapeFlag & 32) {
      const l = t._
      ;(l ? (n && l === 1 ? (i = !1) : Dh(s, t, n)) : ((i = !t.$stable), Vh(t, s)), (a = t))
    } else t && (kh(e, t), (a = { default: 1 }))
    if (i) for (const l in s) !Ca(l) && a[l] == null && delete s[l]
  },
  ue = Om
function Vm(e) {
  return km(e)
}
function km(e, t) {
  const n = Fi()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: a,
      createText: l,
      createComment: c,
      setText: f,
      setElementText: d,
      parentNode: m,
      nextSibling: w,
      setScopeId: P = Le,
      insertStaticContent: L
    } = e,
    D = (y, b, k, U = null, N = null, F = null, z = void 0, H = null, $ = !!b.dynamicChildren) => {
      if (y === b) return
      ;(y && !Gr(y, b) && ((U = Ge(y)), Mt(y, N, F, !0), (y = null)),
        b.patchFlag === -2 && (($ = !1), (b.dynamicChildren = null)))
      const { type: M, ref: J, shapeFlag: W } = b
      switch (M) {
        case Ki:
          O(y, b, k, U)
          break
        case Rn:
          G(y, b, k, U)
          break
        case ui:
          y == null && g(b, k, U, z)
          break
        case ce:
          x(y, b, k, U, N, F, z, H, $)
          break
        default:
          W & 1
            ? ut(y, b, k, U, N, F, z, H, $)
            : W & 6
              ? v(y, b, k, U, N, F, z, H, $)
              : (W & 64 || W & 128) && M.process(y, b, k, U, N, F, z, H, $, Se)
      }
      J != null && N
        ? is(J, y && y.ref, F, b || y, !b)
        : J == null && y && y.ref != null && is(y.ref, null, F, y, !0)
    },
    O = (y, b, k, U) => {
      if (y == null) r((b.el = l(b.children)), k, U)
      else {
        const N = (b.el = y.el)
        b.children !== y.children && f(N, b.children)
      }
    },
    G = (y, b, k, U) => {
      y == null ? r((b.el = c(b.children || '')), k, U) : (b.el = y.el)
    },
    g = (y, b, k, U) => {
      ;[y.el, y.anchor] = L(y.children, b, k, U, y.el, y.anchor)
    },
    S = ({ el: y, anchor: b }, k, U) => {
      let N
      for (; y && y !== b; ) ((N = w(y)), r(y, k, U), (y = N))
      r(b, k, U)
    },
    K = ({ el: y, anchor: b }) => {
      let k
      for (; y && y !== b; ) ((k = w(y)), s(y), (y = k))
      s(b)
    },
    ut = (y, b, k, U, N, F, z, H, $) => {
      if ((b.type === 'svg' ? (z = 'svg') : b.type === 'math' && (z = 'mathml'), y == null))
        _t(b, k, U, N, F, z, H, $)
      else {
        const M = y.el && y.el._isVueCE ? y.el : null
        try {
          ;(M && M._beginPatch(), E(y, b, N, F, z, H, $))
        } finally {
          M && M._endPatch()
        }
      }
    },
    _t = (y, b, k, U, N, F, z, H) => {
      let $, M
      const { props: J, shapeFlag: W, transition: Y, dirs: tt } = y
      if (
        (($ = y.el = a(y.type, F, J && J.is, J)),
        W & 8 ? d($, y.children) : W & 16 && _(y.children, $, null, U, N, Ro(y, F), z, H),
        tt && Fn(y, null, U, 'created'),
        I($, y, y.scopeId, z, U),
        J)
      ) {
        for (const ot in J) ot !== 'value' && !ns(ot) && i($, ot, null, J[ot], F, U)
        ;('value' in J && i($, 'value', null, J.value, F),
          (M = J.onVnodeBeforeMount) && Ve(M, U, y))
      }
      tt && Fn(y, null, U, 'beforeMount')
      const et = Dm(N, Y)
      ;(et && Y.beforeEnter($),
        r($, b, k),
        ((M = J && J.onVnodeMounted) || et || tt) &&
          ue(() => {
            try {
              ;(M && Ve(M, U, y), et && Y.enter($), tt && Fn(y, null, U, 'mounted'))
            } finally {
            }
          }, N))
    },
    I = (y, b, k, U, N) => {
      if ((k && P(y, k), U)) for (let F = 0; F < U.length; F++) P(y, U[F])
      if (N) {
        let F = N.subTree
        if (b === F || (Lh(F.type) && (F.ssContent === b || F.ssFallback === b))) {
          const z = N.vnode
          I(y, z, z.scopeId, z.slotScopeIds, N.parent)
        }
      }
    },
    _ = (y, b, k, U, N, F, z, H, $ = 0) => {
      for (let M = $; M < y.length; M++) {
        const J = (y[M] = H ? Ze(y[M]) : Oe(y[M]))
        D(null, J, b, k, U, N, F, z, H)
      }
    },
    E = (y, b, k, U, N, F, z) => {
      const H = (b.el = y.el)
      let { patchFlag: $, dynamicChildren: M, dirs: J } = b
      $ |= y.patchFlag & 16
      const W = y.props || It,
        Y = b.props || It
      let tt
      if (
        (k && Un(k, !1),
        (tt = Y.onVnodeBeforeUpdate) && Ve(tt, k, b, y),
        J && Fn(b, y, k, 'beforeUpdate'),
        k && Un(k, !0),
        ((W.innerHTML && Y.innerHTML == null) || (W.textContent && Y.textContent == null)) &&
          d(H, ''),
        M
          ? T(y.dynamicChildren, M, H, k, U, Ro(b, N), F)
          : z || ft(y, b, H, null, k, U, Ro(b, N), F, !1),
        $ > 0)
      ) {
        if ($ & 16) A(H, W, Y, k, N)
        else if (
          ($ & 2 && W.class !== Y.class && i(H, 'class', null, Y.class, N),
          $ & 4 && i(H, 'style', W.style, Y.style, N),
          $ & 8)
        ) {
          const et = b.dynamicProps
          for (let ot = 0; ot < et.length; ot++) {
            const gt = et[ot],
              St = W[gt],
              Nt = Y[gt]
            ;(Nt !== St || gt === 'value') && i(H, gt, St, Nt, N, k)
          }
        }
        $ & 1 && y.children !== b.children && d(H, b.children)
      } else !z && M == null && A(H, W, Y, k, N)
      ;((tt = Y.onVnodeUpdated) || J) &&
        ue(() => {
          ;(tt && Ve(tt, k, b, y), J && Fn(b, y, k, 'updated'))
        }, U)
    },
    T = (y, b, k, U, N, F, z) => {
      for (let H = 0; H < b.length; H++) {
        const $ = y[H],
          M = b[H],
          J = $.el && ($.type === ce || !Gr($, M) || $.shapeFlag & 198) ? m($.el) : k
        D($, M, J, null, U, N, F, z, !0)
      }
    },
    A = (y, b, k, U, N) => {
      if (b !== k) {
        if (b !== It) for (const F in b) !ns(F) && !(F in k) && i(y, F, b[F], null, N, U)
        for (const F in k) {
          if (ns(F)) continue
          const z = k[F],
            H = b[F]
          z !== H && F !== 'value' && i(y, F, H, z, N, U)
        }
        'value' in k && i(y, 'value', b.value, k.value, N)
      }
    },
    x = (y, b, k, U, N, F, z, H, $) => {
      const M = (b.el = y ? y.el : l('')),
        J = (b.anchor = y ? y.anchor : l(''))
      let { patchFlag: W, dynamicChildren: Y, slotScopeIds: tt } = b
      ;(tt && (H = H ? H.concat(tt) : tt),
        y == null
          ? (r(M, k, U), r(J, k, U), _(b.children || [], k, J, N, F, z, H, $))
          : W > 0 && W & 64 && Y && y.dynamicChildren && y.dynamicChildren.length === Y.length
            ? (T(y.dynamicChildren, Y, k, N, F, z, H),
              (b.key != null || (N && b === N.subTree)) && Nh(y, b, !0))
            : ft(y, b, k, J, N, F, z, H, $))
    },
    v = (y, b, k, U, N, F, z, H, $) => {
      ;((b.slotScopeIds = H),
        y == null
          ? b.shapeFlag & 512
            ? N.ctx.activate(b, k, U, z, $)
            : he(b, k, U, N, F, z, $)
          : fn(y, b, $))
    },
    he = (y, b, k, U, N, F, z) => {
      const H = (y.component = Km(y, U, N))
      if ((_h(y) && (H.ctx.renderer = Se), zm(H, !1, z), H.asyncDep)) {
        if ((N && N.registerDep(H, jt, z), !y.el)) {
          const $ = (H.subTree = Fe(Rn))
          ;(G(null, $, b, k), (y.placeholder = $.el))
        }
      } else jt(H, y, b, k, N, F, z)
    },
    fn = (y, b, k) => {
      const U = (b.component = y.component)
      if (bm(y, b, k))
        if (U.asyncDep && !U.asyncResolved) {
          Et(U, b, k)
          return
        } else ((U.next = b), U.update())
      else ((b.el = y.el), (U.vnode = b))
    },
    jt = (y, b, k, U, N, F, z) => {
      const H = () => {
        if (y.isMounted) {
          let { next: W, bu: Y, u: tt, parent: et, vnode: ot } = y
          {
            const Qt = Oh(y)
            if (Qt) {
              ;(W && ((W.el = ot.el), Et(y, W, z)),
                Qt.asyncDep.then(() => {
                  ue(() => {
                    y.isUnmounted || M()
                  }, N)
                }))
              return
            }
          }
          let gt = W,
            St
          ;(Un(y, !1),
            W ? ((W.el = ot.el), Et(y, W, z)) : (W = ot),
            Y && ai(Y),
            (St = W.props && W.props.onVnodeBeforeUpdate) && Ve(St, et, W, ot),
            Un(y, !0))
          const Nt = mu(y),
            pe = y.subTree
          ;((y.subTree = Nt),
            D(pe, Nt, m(pe.el), Ge(pe), y, N, F),
            (W.el = Nt.el),
            gt === null && Im(y, Nt.el),
            tt && ue(tt, N),
            (St = W.props && W.props.onVnodeUpdated) && ue(() => Ve(St, et, W, ot), N))
        } else {
          let W
          const { el: Y, props: tt } = b,
            { bm: et, m: ot, parent: gt, root: St, type: Nt } = y,
            pe = os(b)
          ;(Un(y, !1),
            et && ai(et),
            !pe && (W = tt && tt.onVnodeBeforeMount) && Ve(W, gt, b),
            Un(y, !0))
          {
            St.ce &&
              St.ce._hasShadowRoot() &&
              St.ce._injectChildStyle(Nt, y.parent ? y.parent.type : void 0)
            const Qt = (y.subTree = mu(y))
            ;(D(null, Qt, k, U, y, N, F), (b.el = Qt.el))
          }
          if ((ot && ue(ot, N), !pe && (W = tt && tt.onVnodeMounted))) {
            const Qt = b
            ue(() => Ve(W, gt, Qt), N)
          }
          ;((b.shapeFlag & 256 || (gt && os(gt.vnode) && gt.vnode.shapeFlag & 256)) &&
            y.a &&
            ue(y.a, N),
            (y.isMounted = !0),
            (b = k = U = null))
        }
      }
      y.scope.on()
      const $ = (y.effect = new Wc(H))
      y.scope.off()
      const M = (y.update = $.run.bind($)),
        J = (y.job = $.runIfDirty.bind($))
      ;((J.i = y), (J.id = y.uid), ($.scheduler = () => Pa(J)), Un(y, !0), M())
    },
    Et = (y, b, k) => {
      b.component = y
      const U = y.vnode.props
      ;((y.vnode = b),
        (y.next = null),
        Rm(y, b.props, U, k),
        Cm(y, b.children, k),
        sn(),
        lu(y),
        on())
    },
    ft = (y, b, k, U, N, F, z, H, $ = !1) => {
      const M = y && y.children,
        J = y ? y.shapeFlag : 0,
        W = b.children,
        { patchFlag: Y, shapeFlag: tt } = b
      if (Y > 0) {
        if (Y & 128) {
          Vn(M, W, k, U, N, F, z, H, $)
          return
        } else if (Y & 256) {
          we(M, W, k, U, N, F, z, H, $)
          return
        }
      }
      tt & 8
        ? (J & 16 && Dn(M, N, F), W !== M && d(k, W))
        : J & 16
          ? tt & 16
            ? Vn(M, W, k, U, N, F, z, H, $)
            : Dn(M, N, F, !0)
          : (J & 8 && d(k, ''), tt & 16 && _(W, k, U, N, F, z, H, $))
    },
    we = (y, b, k, U, N, F, z, H, $) => {
      ;((y = y || ur), (b = b || ur))
      const M = y.length,
        J = b.length,
        W = Math.min(M, J)
      let Y
      for (Y = 0; Y < W; Y++) {
        const tt = (b[Y] = $ ? Ze(b[Y]) : Oe(b[Y]))
        D(y[Y], tt, k, null, N, F, z, H, $)
      }
      M > J ? Dn(y, N, F, !0, !1, W) : _(b, k, U, N, F, z, H, $, W)
    },
    Vn = (y, b, k, U, N, F, z, H, $) => {
      let M = 0
      const J = b.length
      let W = y.length - 1,
        Y = J - 1
      for (; M <= W && M <= Y; ) {
        const tt = y[M],
          et = (b[M] = $ ? Ze(b[M]) : Oe(b[M]))
        if (Gr(tt, et)) D(tt, et, k, null, N, F, z, H, $)
        else break
        M++
      }
      for (; M <= W && M <= Y; ) {
        const tt = y[W],
          et = (b[Y] = $ ? Ze(b[Y]) : Oe(b[Y]))
        if (Gr(tt, et)) D(tt, et, k, null, N, F, z, H, $)
        else break
        ;(W--, Y--)
      }
      if (M > W) {
        if (M <= Y) {
          const tt = Y + 1,
            et = tt < J ? b[tt].el : U
          for (; M <= Y; ) (D(null, (b[M] = $ ? Ze(b[M]) : Oe(b[M])), k, et, N, F, z, H, $), M++)
        }
      } else if (M > Y) for (; M <= W; ) (Mt(y[M], N, F, !0), M++)
      else {
        const tt = M,
          et = M,
          ot = new Map()
        for (M = et; M <= Y; M++) {
          const $t = (b[M] = $ ? Ze(b[M]) : Oe(b[M]))
          $t.key != null && ot.set($t.key, M)
        }
        let gt,
          St = 0
        const Nt = Y - et + 1
        let pe = !1,
          Qt = 0
        const dn = new Array(Nt)
        for (M = 0; M < Nt; M++) dn[M] = 0
        for (M = tt; M <= W; M++) {
          const $t = y[M]
          if (St >= Nt) {
            Mt($t, N, F, !0)
            continue
          }
          let me
          if ($t.key != null) me = ot.get($t.key)
          else
            for (gt = et; gt <= Y; gt++)
              if (dn[gt - et] === 0 && Gr($t, b[gt])) {
                me = gt
                break
              }
          me === void 0
            ? Mt($t, N, F, !0)
            : ((dn[me - et] = M + 1),
              me >= Qt ? (Qt = me) : (pe = !0),
              D($t, b[me], k, null, N, F, z, H, $),
              St++)
        }
        const Dr = pe ? Nm(dn) : ur
        for (gt = Dr.length - 1, M = Nt - 1; M >= 0; M--) {
          const $t = et + M,
            me = b[$t],
            Ls = b[$t + 1],
            Zn = $t + 1 < J ? Ls.el || Mh(Ls) : U
          dn[M] === 0
            ? D(null, me, k, Zn, N, F, z, H, $)
            : pe && (gt < 0 || M !== Dr[gt] ? We(me, k, Zn, 2) : gt--)
        }
      }
    },
    We = (y, b, k, U, N = null) => {
      const { el: F, type: z, transition: H, children: $, shapeFlag: M } = y
      if (M & 6) {
        We(y.component.subTree, b, k, U)
        return
      }
      if (M & 128) {
        y.suspense.move(b, k, U)
        return
      }
      if (M & 64) {
        z.move(y, b, k, Se)
        return
      }
      if (z === ce) {
        r(F, b, k)
        for (let W = 0; W < $.length; W++) We($[W], b, k, U)
        r(y.anchor, b, k)
        return
      }
      if (z === ui) {
        S(y, b, k)
        return
      }
      if (U !== 2 && M & 1 && H)
        if (U === 0) (H.beforeEnter(F), r(F, b, k), ue(() => H.enter(F), N))
        else {
          const { leave: W, delayLeave: Y, afterLeave: tt } = H,
            et = () => {
              y.ctx.isUnmounted ? s(F) : r(F, b, k)
            },
            ot = () => {
              ;(F._isLeaving && F[Xp](!0),
                W(F, () => {
                  ;(et(), tt && tt())
                }))
            }
          Y ? Y(F, et, ot) : ot()
        }
      else r(F, b, k)
    },
    Mt = (y, b, k, U = !1, N = !1) => {
      const {
        type: F,
        props: z,
        ref: H,
        children: $,
        dynamicChildren: M,
        shapeFlag: J,
        patchFlag: W,
        dirs: Y,
        cacheIndex: tt,
        memo: et
      } = y
      if (
        (W === -2 && (N = !1),
        H != null && (sn(), is(H, null, k, y, !0), on()),
        tt != null && (b.renderCache[tt] = void 0),
        J & 256)
      ) {
        b.ctx.deactivate(y)
        return
      }
      const ot = J & 1 && Y,
        gt = !os(y)
      let St
      if ((gt && (St = z && z.onVnodeBeforeUnmount) && Ve(St, b, y), J & 6)) kn(y.component, k, U)
      else {
        if (J & 128) {
          y.suspense.unmount(k, U)
          return
        }
        ;(ot && Fn(y, null, b, 'beforeUnmount'),
          J & 64
            ? y.type.remove(y, b, k, Se, U)
            : M && !M.hasOnce && (F !== ce || (W > 0 && W & 64))
              ? Dn(M, b, k, !1, !0)
              : ((F === ce && W & 384) || (!N && J & 16)) && Dn($, b, k),
          U && Lt(y))
      }
      const Nt = et != null && tt == null
      ;((gt && (St = z && z.onVnodeUnmounted)) || ot || Nt) &&
        ue(() => {
          ;(St && Ve(St, b, y), ot && Fn(y, null, b, 'unmounted'), Nt && (y.el = null))
        }, k)
    },
    Lt = (y) => {
      const { type: b, el: k, anchor: U, transition: N } = y
      if (b === ce) {
        ro(k, U)
        return
      }
      if (b === ui) {
        K(y)
        return
      }
      const F = () => {
        ;(s(k), N && !N.persisted && N.afterLeave && N.afterLeave())
      }
      if (y.shapeFlag & 1 && N && !N.persisted) {
        const { leave: z, delayLeave: H } = N,
          $ = () => z(k, F)
        H ? H(y.el, F, $) : $()
      } else F()
    },
    ro = (y, b) => {
      let k
      for (; y !== b; ) ((k = w(y)), s(y), (y = k))
      s(b)
    },
    kn = (y, b, k) => {
      const { bum: U, scope: N, job: F, subTree: z, um: H, m: $, a: M } = y
      ;(yu($),
        yu(M),
        U && ai(U),
        N.stop(),
        F && ((F.flags |= 8), Mt(z, y, b, k)),
        H && ue(H, b),
        ue(() => {
          y.isUnmounted = !0
        }, b))
    },
    Dn = (y, b, k, U = !1, N = !1, F = 0) => {
      for (let z = F; z < y.length; z++) Mt(y[z], b, k, U, N)
    },
    Ge = (y) => {
      if (y.shapeFlag & 6) return Ge(y.component.subTree)
      if (y.shapeFlag & 128) return y.suspense.next()
      const b = w(y.anchor || y.el),
        k = b && b[Qp]
      return k ? w(k) : b
    }
  let Vr = !1
  const Ms = (y, b, k) => {
      let U
      ;(y == null
        ? b._vnode && (Mt(b._vnode, null, null, !0), (U = b._vnode.component))
        : D(b._vnode || null, y, b, null, null, null, k),
        (b._vnode = y),
        Vr || ((Vr = !0), lu(U), hh(), (Vr = !1)))
    },
    Se = { p: D, um: Mt, m: We, r: Lt, mt: he, mc: _, pc: ft, pbc: T, n: Ge, o: e }
  return { render: Ms, hydrate: void 0, createApp: _m(Ms) }
}
function Ro({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function Un({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5))
}
function Dm(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Nh(e, t, n = !1) {
  const r = e.children,
    s = t.children
  if (nt(r) && nt(s))
    for (let i = 0; i < r.length; i++) {
      const a = r[i]
      let l = s[i]
      ;(l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = s[i] = Ze(s[i])), (l.el = a.el)),
        !n && l.patchFlag !== -2 && Nh(a, l)),
        l.type === Ki && (l.patchFlag === -1 && (l = s[i] = Ze(l)), (l.el = a.el)),
        l.type === Rn && !l.el && (l.el = a.el))
    }
}
function Nm(e) {
  const t = e.slice(),
    n = [0]
  let r, s, i, a, l
  const c = e.length
  for (r = 0; r < c; r++) {
    const f = e[r]
    if (f !== 0) {
      if (((s = n[n.length - 1]), e[s] < f)) {
        ;((t[r] = s), n.push(r))
        continue
      }
      for (i = 0, a = n.length - 1; i < a; )
        ((l = (i + a) >> 1), e[n[l]] < f ? (i = l + 1) : (a = l))
      f < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r))
    }
  }
  for (i = n.length, a = n[i - 1]; i-- > 0; ) ((n[i] = a), (a = t[a]))
  return n
}
function Oh(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Oh(t)
}
function yu(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
function Mh(e) {
  if (e.placeholder) return e.placeholder
  const t = e.component
  return t ? Mh(t.subTree) : null
}
const Lh = (e) => e.__isSuspense
function Om(e, t) {
  t && t.pendingBranch ? (nt(e) ? t.effects.push(...e) : t.effects.push(e)) : qp(e)
}
const ce = Symbol.for('v-fgt'),
  Ki = Symbol.for('v-txt'),
  Rn = Symbol.for('v-cmt'),
  ui = Symbol.for('v-stc'),
  ls = []
let de = null
function ge(e = !1) {
  ls.push((de = e ? null : []))
}
function Mm() {
  ;(ls.pop(), (de = ls[ls.length - 1] || null))
}
let gs = 1
function vu(e, t = !1) {
  ;((gs += e), e < 0 && de && t && (de.hasOnce = !0))
}
function Fh(e) {
  return ((e.dynamicChildren = gs > 0 ? de || ur : null), Mm(), gs > 0 && de && de.push(e), e)
}
function Ce(e, t, n, r, s, i) {
  return Fh(C(e, t, n, r, s, i, !0))
}
function Uh(e, t, n, r, s) {
  return Fh(Fe(e, t, n, r, s, !0))
}
function Bh(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Gr(e, t) {
  return e.type === t.type && e.key === t.key
}
const jh = ({ key: e }) => e ?? null,
  ci = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (kt(e) || ne(e) || at(e) ? { i: ye, r: e, k: t, f: !!n } : e) : null
  )
function C(e, t = null, n = null, r = 0, s = null, i = e === ce ? 0 : 1, a = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jh(t),
    ref: t && ci(t),
    scopeId: dh,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ye
  }
  return (
    l ? (ka(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= kt(n) ? 8 : 16),
    gs > 0 && !a && de && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && de.push(c),
    c
  )
}
const Fe = Lm
function Lm(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === um) && (e = Rn), Bh(e))) {
    const l = mr(e, t, !0)
    return (
      n && ka(l, n),
      gs > 0 && !i && de && (l.shapeFlag & 6 ? (de[de.indexOf(e)] = l) : de.push(l)),
      (l.patchFlag = -2),
      l
    )
  }
  if ((Ym(e) && (e = e.__vccOpts), t)) {
    t = Fm(t)
    let { class: l, style: c } = t
    ;(l && !kt(l) && (t.class = Ui(l)),
      wt(c) && (xa(c) && !nt(c) && (c = re({}, c)), (t.style = ya(c))))
  }
  const a = kt(e) ? 1 : Lh(e) ? 128 : Yp(e) ? 64 : wt(e) ? 4 : at(e) ? 2 : 0
  return C(e, t, n, r, s, a, i, !0)
}
function Fm(e) {
  return e ? (xa(e) || Ph(e) ? re({}, e) : e) : null
}
function mr(e, t, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: a, children: l, transition: c } = e,
    f = t ? jm(s || {}, t) : s,
    d = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && jh(f),
      ref: t && t.ref ? (n && i ? (nt(i) ? i.concat(ci(t)) : [i, ci(t)]) : ci(t)) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== ce ? (a === -1 ? 16 : a | 16) : a,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && mr(e.ssContent),
      ssFallback: e.ssFallback && mr(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    }
  return (c && r && Sa(d, c.clone(d)), d)
}
function oe(e = ' ', t = 0) {
  return Fe(Ki, null, e, t)
}
function Um(e, t) {
  const n = Fe(ui, null, e)
  return ((n.staticCount = t), n)
}
function Bm(e = '', t = !1) {
  return t ? (ge(), Uh(Rn, null, e)) : Fe(Rn, null, e)
}
function Oe(e) {
  return e == null || typeof e == 'boolean'
    ? Fe(Rn)
    : nt(e)
      ? Fe(ce, null, e.slice())
      : Bh(e)
        ? Ze(e)
        : Fe(Ki, null, String(e))
}
function Ze(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mr(e)
}
function ka(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (nt(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default
      s && (s._c && (s._d = !1), ka(e, s()), s._c && (s._d = !0))
      return
    } else {
      n = 32
      const s = t._
      !s && !Ph(t)
        ? (t._ctx = ye)
        : s === 3 && ye && (ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    at(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [oe(t)])) : (n = 8))
  ;((e.children = t), (e.shapeFlag |= n))
}
function jm(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const s in r)
      if (s === 'class') t.class !== r.class && (t.class = Ui([t.class, r.class]))
      else if (s === 'style') t.style = ya([t.style, r.style])
      else if (Ni(s)) {
        const i = t[s],
          a = r[s]
        a && i !== a && !(nt(i) && i.includes(a))
          ? (t[s] = i ? [].concat(i, a) : a)
          : a == null && i == null && !Oi(s) && (t[s] = a)
      } else s !== '' && (t[s] = r[s])
  }
  return t
}
function Ve(e, t, n, r = null) {
  $e(e, t, 7, [n, r])
}
const $m = bh()
let qm = 0
function Km(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || $m,
    i = {
      uid: qm++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new hp(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ch(r, s),
      emitsOptions: Ih(r, s),
      emit: null,
      emitted: null,
      propsDefaults: It,
      inheritAttrs: r.inheritAttrs,
      ctx: It,
      data: It,
      props: It,
      attrs: It,
      slots: It,
      refs: It,
      setupState: It,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = vm.bind(null, i)),
    e.ce && e.ce(i),
    i
  )
}
let le = null
const Hm = () => le || ye
let Ei, Wo
{
  const e = Fi(),
    t = (n, r) => {
      let s
      return (
        (s = e[n]) || (s = e[n] = []),
        s.push(r),
        (i) => {
          s.length > 1 ? s.forEach((a) => a(i)) : s[0](i)
        }
      )
    }
  ;((Ei = t('__VUE_INSTANCE_SETTERS__', (n) => (le = n))),
    (Wo = t('__VUE_SSR_SETTERS__', (n) => (_s = n))))
}
const Ss = (e) => {
    const t = le
    return (
      Ei(e),
      e.scope.on(),
      () => {
        ;(e.scope.off(), Ei(t))
      }
    )
  },
  Eu = () => {
    ;(le && le.scope.off(), Ei(null))
  }
function $h(e) {
  return e.vnode.shapeFlag & 4
}
let _s = !1
function zm(e, t = !1, n = !1) {
  t && Wo(t)
  const { props: r, children: s } = e.vnode,
    i = $h(e)
  ;(Am(e, r, i, t), Sm(e, s, n || t))
  const a = i ? Wm(e, t) : void 0
  return (t && Wo(!1), a)
}
function Wm(e, t) {
  const n = e.type
  ;((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, cm)))
  const { setup: r } = n
  if (r) {
    sn()
    const s = (e.setupContext = r.length > 1 ? Qm(e) : null),
      i = Ss(e),
      a = Ps(r, e, 0, [e.props, s]),
      l = Uc(a)
    if ((on(), i(), (l || e.sp) && !os(e) && gh(e), l)) {
      if ((a.then(Eu, Eu), t))
        return a
          .then((c) => {
            Tu(e, c)
          })
          .catch((c) => {
            ji(c, e, 0)
          })
      e.asyncDep = a
    } else Tu(e, a)
  } else qh(e)
}
function Tu(e, t, n) {
  ;(at(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : wt(t) && (e.setupState = ah(t)),
    qh(e))
}
function qh(e, t, n) {
  const r = e.type
  e.render || (e.render = r.render || Le)
  {
    const s = Ss(e)
    sn()
    try {
      hm(e)
    } finally {
      ;(on(), s())
    }
  }
}
const Gm = {
  get(e, t) {
    return (te(e, 'get', ''), e[t])
  }
}
function Qm(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return { attrs: new Proxy(e.attrs, Gm), slots: e.slots, emit: e.emit, expose: t }
}
function Hi(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(ah(kp(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in as) return as[n](e)
          },
          has(t, n) {
            return n in t || n in as
          }
        }))
    : e.proxy
}
function Ym(e) {
  return at(e) && '__vccOpts' in e
}
const Kh = (e, t) => Fp(e, t, _s),
  Xm = '3.5.34'
/**
 * @vue/runtime-dom v3.5.34
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Go
const wu = typeof window < 'u' && window.trustedTypes
if (wu)
  try {
    Go = wu.createPolicy('vue', { createHTML: (e) => e })
  } catch {}
const Hh = Go ? (e) => Go.createHTML(e) : (e) => e,
  Jm = 'http://www.w3.org/2000/svg',
  Zm = 'http://www.w3.org/1998/Math/MathML',
  Je = typeof document < 'u' ? document : null,
  bu = Je && Je.createElement('template'),
  tg = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const s =
        t === 'svg'
          ? Je.createElementNS(Jm, e)
          : t === 'mathml'
            ? Je.createElementNS(Zm, e)
            : n
              ? Je.createElement(e, { is: n })
              : Je.createElement(e)
      return (
        e === 'select' && r && r.multiple != null && s.setAttribute('multiple', r.multiple),
        s
      )
    },
    createText: (e) => Je.createTextNode(e),
    createComment: (e) => Je.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Je.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, s, i) {
      const a = n ? n.previousSibling : t.lastChild
      if (s && (s === i || s.nextSibling))
        for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); );
      else {
        bu.innerHTML = Hh(
          r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e
        )
        const l = bu.content
        if (r === 'svg' || r === 'mathml') {
          const c = l.firstChild
          for (; c.firstChild; ) l.appendChild(c.firstChild)
          l.removeChild(c)
        }
        t.insertBefore(l, n)
      }
      return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  eg = Symbol('_vtc')
function ng(e, t, n) {
  const r = e[eg]
  ;(r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t))
}
const Iu = Symbol('_vod'),
  rg = Symbol('_vsh'),
  sg = Symbol(''),
  ig = /(?:^|;)\s*display\s*:/
function og(e, t, n) {
  const r = e.style,
    s = kt(n)
  let i = !1
  if (n && !s) {
    if (t)
      if (kt(t))
        for (const a of t.split(';')) {
          const l = a.slice(0, a.indexOf(':')).trim()
          n[l] == null && Jr(r, l, '')
        }
      else for (const a in t) n[a] == null && Jr(r, a, '')
    for (const a in n) {
      a === 'display' && (i = !0)
      const l = n[a]
      l != null ? lg(e, a, !kt(t) && t ? t[a] : void 0, l) || Jr(r, a, l) : Jr(r, a, '')
    }
  } else if (s) {
    if (t !== n) {
      const a = r[sg]
      ;(a && (n += ';' + a), (r.cssText = n), (i = ig.test(n)))
    }
  } else t && e.removeAttribute('style')
  Iu in e && ((e[Iu] = i ? r.display : ''), e[rg] && (r.display = 'none'))
}
const Au = /\s*!important$/
function Jr(e, t, n) {
  if (nt(n)) n.forEach((r) => Jr(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = ag(e, t)
    Au.test(n) ? e.setProperty(Qn(r), n.replace(Au, ''), 'important') : (e[r] = n)
  }
}
const Ru = ['Webkit', 'Moz', 'ms'],
  xo = {}
function ag(e, t) {
  const n = xo[t]
  if (n) return n
  let r = Re(t)
  if (r !== 'filter' && r in e) return (xo[t] = r)
  r = $c(r)
  for (let s = 0; s < Ru.length; s++) {
    const i = Ru[s] + r
    if (i in e) return (xo[t] = i)
  }
  return t
}
function lg(e, t, n, r) {
  return e.tagName === 'TEXTAREA' && (t === 'width' || t === 'height') && kt(r) && n === r
}
const xu = 'http://www.w3.org/1999/xlink'
function Pu(e, t, n, r, s, i = up(t)) {
  r && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(xu, t.slice(6, t.length))
      : e.setAttributeNS(xu, t, n)
    : n == null || (i && !Kc(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : je(n) ? String(n) : n)
}
function Su(e, t, n, r, s) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? Hh(n) : n)
    return
  }
  const i = e.tagName
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n)
    ;((l !== c || !('_value' in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n))
    return
  }
  let a = !1
  if (n === '' || n == null) {
    const l = typeof e[t]
    l === 'boolean'
      ? (n = Kc(n))
      : n == null && l === 'string'
        ? ((n = ''), (a = !0))
        : l === 'number' && ((n = 0), (a = !0))
  }
  try {
    e[t] = n
  } catch {}
  a && e.removeAttribute(s || t)
}
function nn(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function ug(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const Cu = Symbol('_vei')
function cg(e, t, n, r, s = null) {
  const i = e[Cu] || (e[Cu] = {}),
    a = i[t]
  if (r && a) a.value = r
  else {
    const [l, c] = hg(t)
    if (r) {
      const f = (i[t] = pg(r, s))
      nn(e, l, f, c)
    } else a && (ug(e, l, a, c), (i[t] = void 0))
  }
}
const Vu = /(?:Once|Passive|Capture)$/
function hg(e) {
  let t
  if (Vu.test(e)) {
    t = {}
    let r
    for (; (r = e.match(Vu)); )
      ((e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0))
  }
  return [e[2] === ':' ? e.slice(3) : Qn(e.slice(2)), t]
}
let Po = 0
const fg = Promise.resolve(),
  dg = () => Po || (fg.then(() => (Po = 0)), (Po = Date.now()))
function pg(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    $e(mg(r, n.value), t, 5, [r])
  }
  return ((n.value = e), (n.attached = dg()), n)
}
function mg(e, t) {
  if (nt(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        ;(n.call(e), (e._stopped = !0))
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    )
  } else return t
}
const ku = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  gg = (e, t, n, r, s, i) => {
    const a = s === 'svg'
    t === 'class'
      ? ng(e, r, a)
      : t === 'style'
        ? og(e, n, r)
        : Ni(t)
          ? Oi(t) || cg(e, t, n, r, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : _g(e, t, r, a)
              )
            ? (Su(e, t, r),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Pu(e, t, r, a, i, t !== 'value'))
            : e._isVueCE && (yg(e, t) || (e._def.__asyncLoader && (/[A-Z]/.test(t) || !kt(r))))
              ? Su(e, Re(t), r, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = r)
                  : t === 'false-value' && (e._falseValue = r),
                Pu(e, t, r, a))
  }
function _g(e, t, n, r) {
  if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && ku(t) && at(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'autocorrect' ||
    (t === 'sandbox' && e.tagName === 'IFRAME') ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const s = e.tagName
    if (s === 'IMG' || s === 'VIDEO' || s === 'CANVAS' || s === 'SOURCE') return !1
  }
  return ku(t) && kt(n) ? !1 : t in e
}
function yg(e, t) {
  const n = e._def.props
  if (!n) return !1
  const r = Re(t)
  return Array.isArray(n) ? n.some((s) => Re(s) === r) : Object.keys(n).some((s) => Re(s) === r)
}
const xn = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1
  return nt(t) ? (n) => ai(t, n) : t
}
function vg(e) {
  e.target.composing = !0
}
function Du(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const Ee = Symbol('_assign')
function Nu(e, t, n) {
  return (t && (e = e.trim()), n && (e = Li(e)), e)
}
const xt = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e[Ee] = xn(s)
      const i = r || (s.props && s.props.type === 'number')
      ;(nn(e, t ? 'change' : 'input', (a) => {
        a.target.composing || e[Ee](Nu(e.value, n, i))
      }),
        (n || i) &&
          nn(e, 'change', () => {
            e.value = Nu(e.value, n, i)
          }),
        t || (nn(e, 'compositionstart', vg), nn(e, 'compositionend', Du), nn(e, 'change', Du)))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ''
    },
    beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, a) {
      if (((e[Ee] = xn(a)), e.composing)) return
      const l = (i || e.type === 'number') && !/^0\d/.test(e.value) ? Li(e.value) : e.value,
        c = t ?? ''
      if (l === c) return
      const f = e.getRootNode()
      ;((f instanceof Document || f instanceof ShadowRoot) &&
        f.activeElement === e &&
        e.type !== 'range' &&
        ((r && t === n) || (s && e.value.trim() === c))) ||
        (e.value = c)
    }
  },
  Eg = {
    deep: !0,
    created(e, t, n) {
      ;((e[Ee] = xn(n)),
        nn(e, 'change', () => {
          const r = e._modelValue,
            s = gr(e),
            i = e.checked,
            a = e[Ee]
          if (nt(r)) {
            const l = va(r, s),
              c = l !== -1
            if (i && !c) a(r.concat(s))
            else if (!i && c) {
              const f = [...r]
              ;(f.splice(l, 1), a(f))
            }
          } else if (Rr(r)) {
            const l = new Set(r)
            ;(i ? l.add(s) : l.delete(s), a(l))
          } else a(zh(e, i))
        }))
    },
    mounted: Ou,
    beforeUpdate(e, t, n) {
      ;((e[Ee] = xn(n)), Ou(e, t, n))
    }
  }
function Ou(e, { value: t, oldValue: n }, r) {
  e._modelValue = t
  let s
  if (nt(t)) s = va(t, r.props.value) > -1
  else if (Rr(t)) s = t.has(r.props.value)
  else {
    if (t === n) return
    s = An(t, zh(e, !0))
  }
  e.checked !== s && (e.checked = s)
}
const Mu = {
    created(e, { value: t }, n) {
      ;((e.checked = An(t, n.props.value)),
        (e[Ee] = xn(n)),
        nn(e, 'change', () => {
          e[Ee](gr(e))
        }))
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      ;((e[Ee] = xn(r)), t !== n && (e.checked = An(t, r.props.value)))
    }
  },
  Qr = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const s = Rr(t)
      ;(nn(e, 'change', () => {
        const i = Array.prototype.filter
          .call(e.options, (a) => a.selected)
          .map((a) => (n ? Li(gr(a)) : gr(a)))
        ;(e[Ee](e.multiple ? (s ? new Set(i) : i) : i[0]),
          (e._assigning = !0),
          uh(() => {
            e._assigning = !1
          }))
      }),
        (e[Ee] = xn(r)))
    },
    mounted(e, { value: t }) {
      Lu(e, t)
    },
    beforeUpdate(e, t, n) {
      e[Ee] = xn(n)
    },
    updated(e, { value: t }) {
      e._assigning || Lu(e, t)
    }
  }
function Lu(e, t) {
  const n = e.multiple,
    r = nt(t)
  if (!(n && !r && !Rr(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const a = e.options[s],
        l = gr(a)
      if (n)
        if (r) {
          const c = typeof l
          c === 'string' || c === 'number'
            ? (a.selected = t.some((f) => String(f) === String(l)))
            : (a.selected = va(t, l) > -1)
        } else a.selected = t.has(l)
      else if (An(gr(a), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s)
        return
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
  }
}
function gr(e) {
  return '_value' in e ? e._value : e.value
}
function zh(e, t) {
  const n = t ? '_trueValue' : '_falseValue'
  return n in e ? e[n] : t
}
const Tg = ['ctrl', 'shift', 'alt', 'meta'],
  wg = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => Tg.some((n) => e[`${n}Key`] && !t.includes(n))
  },
  bg = (e, t) => {
    if (!e) return e
    const n = e._withMods || (e._withMods = {}),
      r = t.join('.')
    return (
      n[r] ||
      (n[r] = (s, ...i) => {
        for (let a = 0; a < t.length; a++) {
          const l = wg[t[a]]
          if (l && l(s, t)) return
        }
        return e(s, ...i)
      })
    )
  },
  Ig = re({ patchProp: gg }, tg)
let Fu
function Ag() {
  return Fu || (Fu = Vm(Ig))
}
const Rg = (...e) => {
  const t = Ag().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const s = Pg(r)
      if (!s) return
      const i = t._component
      ;(!at(i) && !i.render && !i.template && (i.template = s.innerHTML),
        s.nodeType === 1 && (s.textContent = ''))
      const a = n(s, !1, xg(s))
      return (
        s instanceof Element && (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
        a
      )
    }),
    t
  )
}
function xg(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function Pg(e) {
  return kt(e) ? document.querySelector(e) : e
}
const Sg = '/logo.png'
var Uu = {}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wh = function (e) {
    const t = []
    let n = 0
    for (let r = 0; r < e.length; r++) {
      let s = e.charCodeAt(r)
      s < 128
        ? (t[n++] = s)
        : s < 2048
          ? ((t[n++] = (s >> 6) | 192), (t[n++] = (s & 63) | 128))
          : (s & 64512) === 55296 && r + 1 < e.length && (e.charCodeAt(r + 1) & 64512) === 56320
            ? ((s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
              (t[n++] = (s >> 18) | 240),
              (t[n++] = ((s >> 12) & 63) | 128),
              (t[n++] = ((s >> 6) & 63) | 128),
              (t[n++] = (s & 63) | 128))
            : ((t[n++] = (s >> 12) | 224),
              (t[n++] = ((s >> 6) & 63) | 128),
              (t[n++] = (s & 63) | 128))
    }
    return t
  },
  Cg = function (e) {
    const t = []
    let n = 0,
      r = 0
    for (; n < e.length; ) {
      const s = e[n++]
      if (s < 128) t[r++] = String.fromCharCode(s)
      else if (s > 191 && s < 224) {
        const i = e[n++]
        t[r++] = String.fromCharCode(((s & 31) << 6) | (i & 63))
      } else if (s > 239 && s < 365) {
        const i = e[n++],
          a = e[n++],
          l = e[n++],
          c = (((s & 7) << 18) | ((i & 63) << 12) | ((a & 63) << 6) | (l & 63)) - 65536
        ;((t[r++] = String.fromCharCode(55296 + (c >> 10))),
          (t[r++] = String.fromCharCode(56320 + (c & 1023))))
      } else {
        const i = e[n++],
          a = e[n++]
        t[r++] = String.fromCharCode(((s & 15) << 12) | ((i & 63) << 6) | (a & 63))
      }
    }
    return t.join('')
  },
  Gh = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + '+/='
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + '-_.'
    },
    HAS_NATIVE_SUPPORT: typeof atob == 'function',
    encodeByteArray(e, t) {
      if (!Array.isArray(e)) throw Error('encodeByteArray takes an array as a parameter')
      this.init_()
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = []
      for (let s = 0; s < e.length; s += 3) {
        const i = e[s],
          a = s + 1 < e.length,
          l = a ? e[s + 1] : 0,
          c = s + 2 < e.length,
          f = c ? e[s + 2] : 0,
          d = i >> 2,
          m = ((i & 3) << 4) | (l >> 4)
        let w = ((l & 15) << 2) | (f >> 6),
          P = f & 63
        ;(c || ((P = 64), a || (w = 64)), r.push(n[d], n[m], n[w], n[P]))
      }
      return r.join('')
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Wh(e), t)
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : Cg(this.decodeStringToByteArray(e, t))
    },
    decodeStringToByteArray(e, t) {
      this.init_()
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = []
      for (let s = 0; s < e.length; ) {
        const i = n[e.charAt(s++)],
          l = s < e.length ? n[e.charAt(s)] : 0
        ++s
        const f = s < e.length ? n[e.charAt(s)] : 64
        ++s
        const m = s < e.length ? n[e.charAt(s)] : 64
        if ((++s, i == null || l == null || f == null || m == null)) throw new Vg()
        const w = (i << 2) | (l >> 4)
        if ((r.push(w), f !== 64)) {
          const P = ((l << 4) & 240) | (f >> 2)
          if ((r.push(P), m !== 64)) {
            const L = ((f << 6) & 192) | m
            r.push(L)
          }
        }
      }
      return r
    },
    init_() {
      if (!this.byteToCharMap_) {
        ;((this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {}))
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          ((this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e)))
      }
    }
  }
class Vg extends Error {
  constructor() {
    ;(super(...arguments), (this.name = 'DecodeBase64StringError'))
  }
}
const kg = function (e) {
    const t = Wh(e)
    return Gh.encodeByteArray(t, !0)
  },
  Ti = function (e) {
    return kg(e).replace(/\./g, '')
  },
  Dg = function (e) {
    try {
      return Gh.decodeString(e, !0)
    } catch (t) {
      console.error('base64Decode failed: ', t)
    }
    return null
  }
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ng() {
  if (typeof self < 'u') return self
  if (typeof window < 'u') return window
  if (typeof global < 'u') return global
  throw new Error('Unable to locate global object.')
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Og = () => Ng().__FIREBASE_DEFAULTS__,
  Mg = () => {
    if (typeof process > 'u' || typeof Uu > 'u') return
    const e = Uu.__FIREBASE_DEFAULTS__
    if (e) return JSON.parse(e)
  },
  Lg = () => {
    if (typeof document > 'u') return
    let e
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch {
      return
    }
    const t = e && Dg(e[1])
    return t && JSON.parse(t)
  },
  Da = () => {
    try {
      return Og() || Mg() || Lg()
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
      return
    }
  },
  Fg = (e) => {
    var t, n
    return (n = (t = Da()) === null || t === void 0 ? void 0 : t.emulatorHosts) === null ||
      n === void 0
      ? void 0
      : n[e]
  },
  Qh = (e) => {
    const t = Fg(e)
    if (!t) return
    const n = t.lastIndexOf(':')
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`)
    const r = parseInt(t.substring(n + 1), 10)
    return t[0] === '[' ? [t.substring(1, n - 1), r] : [t.substring(0, n), r]
  },
  Yh = () => {
    var e
    return (e = Da()) === null || e === void 0 ? void 0 : e.config
  }
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ug {
  constructor() {
    ;((this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, n) => {
        ;((this.resolve = t), (this.reject = n))
      })))
  }
  wrapCallback(t) {
    return (n, r) => {
      ;(n ? this.reject(n) : this.resolve(r),
        typeof t == 'function' && (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r)))
    }
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xh(e, t) {
  if (e.uid)
    throw new Error(
      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
    )
  const n = { alg: 'none', type: 'JWT' },
    r = t || 'demo-project',
    s = e.iat || 0,
    i = e.sub || e.user_id
  if (!i) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!")
  const a = Object.assign(
    {
      iss: `https://securetoken.google.com/${r}`,
      aud: r,
      iat: s,
      exp: s + 3600,
      auth_time: s,
      sub: i,
      user_id: i,
      firebase: { sign_in_provider: 'custom', identities: {} }
    },
    e
  )
  return [Ti(JSON.stringify(n)), Ti(JSON.stringify(a)), ''].join('.')
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Bg() {
  return typeof navigator < 'u' && typeof navigator.userAgent == 'string' ? navigator.userAgent : ''
}
function jg() {
  var e
  const t = (e = Da()) === null || e === void 0 ? void 0 : e.forceEnvironment
  if (t === 'node') return !0
  if (t === 'browser') return !1
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch {
    return !1
  }
}
function $g() {
  return (
    !jg() &&
    !!navigator.userAgent &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  )
}
function qg() {
  try {
    return typeof indexedDB == 'object'
  } catch {
    return !1
  }
}
function Kg() {
  return new Promise((e, t) => {
    try {
      let n = !0
      const r = 'validate-browser-context-for-indexeddb-analytics-module',
        s = self.indexedDB.open(r)
      ;((s.onsuccess = () => {
        ;(s.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0))
      }),
        (s.onupgradeneeded = () => {
          n = !1
        }),
        (s.onerror = () => {
          var i
          t(((i = s.error) === null || i === void 0 ? void 0 : i.message) || '')
        }))
    } catch (n) {
      t(n)
    }
  })
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Hg = 'FirebaseError'
class Yn extends Error {
  constructor(t, n, r) {
    ;(super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = Hg),
      Object.setPrototypeOf(this, Yn.prototype),
      Error.captureStackTrace && Error.captureStackTrace(this, Jh.prototype.create))
  }
}
class Jh {
  constructor(t, n, r) {
    ;((this.service = t), (this.serviceName = n), (this.errors = r))
  }
  create(t, ...n) {
    const r = n[0] || {},
      s = `${this.service}/${t}`,
      i = this.errors[t],
      a = i ? zg(i, r) : 'Error',
      l = `${this.serviceName}: ${a} (${s}).`
    return new Yn(s, l, r)
  }
}
function zg(e, t) {
  return e.replace(Wg, (n, r) => {
    const s = t[r]
    return s != null ? String(s) : `<${r}?>`
  })
}
const Wg = /\{\$([^}]+)}/g
function Qo(e, t) {
  if (e === t) return !0
  const n = Object.keys(e),
    r = Object.keys(t)
  for (const s of n) {
    if (!r.includes(s)) return !1
    const i = e[s],
      a = t[s]
    if (Bu(i) && Bu(a)) {
      if (!Qo(i, a)) return !1
    } else if (i !== a) return !1
  }
  for (const s of r) if (!n.includes(s)) return !1
  return !0
}
function Bu(e) {
  return e !== null && typeof e == 'object'
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function _r(e) {
  return e && e._delegate ? e._delegate : e
}
class yr {
  constructor(t, n, r) {
    ;((this.name = t),
      (this.instanceFactory = n),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = 'LAZY'),
      (this.onInstanceCreated = null))
  }
  setInstantiationMode(t) {
    return ((this.instantiationMode = t), this)
  }
  setMultipleInstances(t) {
    return ((this.multipleInstances = t), this)
  }
  setServiceProps(t) {
    return ((this.serviceProps = t), this)
  }
  setInstanceCreatedCallback(t) {
    return ((this.onInstanceCreated = t), this)
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const jn = '[DEFAULT]'
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gg {
  constructor(t, n) {
    ;((this.name = t),
      (this.container = n),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map()))
  }
  get(t) {
    const n = this.normalizeInstanceIdentifier(t)
    if (!this.instancesDeferred.has(n)) {
      const r = new Ug()
      if ((this.instancesDeferred.set(n, r), this.isInitialized(n) || this.shouldAutoInitialize()))
        try {
          const s = this.getOrInitializeService({ instanceIdentifier: n })
          s && r.resolve(s)
        } catch {}
    }
    return this.instancesDeferred.get(n).promise
  }
  getImmediate(t) {
    var n
    const r = this.normalizeInstanceIdentifier(t == null ? void 0 : t.identifier),
      s = (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: r })
      } catch (i) {
        if (s) return null
        throw i
      }
    else {
      if (s) return null
      throw Error(`Service ${this.name} is not available`)
    }
  }
  getComponent() {
    return this.component
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`)
    if (this.component) throw Error(`Component for ${this.name} has already been provided`)
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (Yg(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: jn })
        } catch {}
      for (const [n, r] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(n)
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: s })
          r.resolve(i)
        } catch {}
      }
    }
  }
  clearInstance(t = jn) {
    ;(this.instancesDeferred.delete(t), this.instancesOptions.delete(t), this.instances.delete(t))
  }
  async delete() {
    const t = Array.from(this.instances.values())
    await Promise.all([
      ...t.filter((n) => 'INTERNAL' in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => '_delete' in n).map((n) => n._delete())
    ])
  }
  isComponentSet() {
    return this.component != null
  }
  isInitialized(t = jn) {
    return this.instances.has(t)
  }
  getOptions(t = jn) {
    return this.instancesOptions.get(t) || {}
  }
  initialize(t = {}) {
    const { options: n = {} } = t,
      r = this.normalizeInstanceIdentifier(t.instanceIdentifier)
    if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`)
    if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`)
    const s = this.getOrInitializeService({ instanceIdentifier: r, options: n })
    for (const [i, a] of this.instancesDeferred.entries()) {
      const l = this.normalizeInstanceIdentifier(i)
      r === l && a.resolve(s)
    }
    return s
  }
  onInit(t, n) {
    var r
    const s = this.normalizeInstanceIdentifier(n),
      i = (r = this.onInitCallbacks.get(s)) !== null && r !== void 0 ? r : new Set()
    ;(i.add(t), this.onInitCallbacks.set(s, i))
    const a = this.instances.get(s)
    return (
      a && t(a, s),
      () => {
        i.delete(t)
      }
    )
  }
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n)
    if (r)
      for (const s of r)
        try {
          s(t, n)
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t)
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: Qg(t),
        options: n
      })),
      this.instances.set(t, r),
      this.instancesOptions.set(t, n),
      this.invokeOnInitCallbacks(r, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, r)
      } catch {}
    return r || null
  }
  normalizeInstanceIdentifier(t = jn) {
    return this.component ? (this.component.multipleInstances ? t : jn) : t
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== 'EXPLICIT'
  }
}
function Qg(e) {
  return e === jn ? void 0 : e
}
function Yg(e) {
  return e.instantiationMode === 'EAGER'
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xg {
  constructor(t) {
    ;((this.name = t), (this.providers = new Map()))
  }
  addComponent(t) {
    const n = this.getProvider(t.name)
    if (n.isComponentSet())
      throw new Error(`Component ${t.name} has already been registered with ${this.name}`)
    n.setComponent(t)
  }
  addOrOverwriteComponent(t) {
    ;(this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t))
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t)
    const n = new Gg(t, this)
    return (this.providers.set(t, n), n)
  }
  getProviders() {
    return Array.from(this.providers.values())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ht
;(function (e) {
  ;((e[(e.DEBUG = 0)] = 'DEBUG'),
    (e[(e.VERBOSE = 1)] = 'VERBOSE'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.WARN = 3)] = 'WARN'),
    (e[(e.ERROR = 4)] = 'ERROR'),
    (e[(e.SILENT = 5)] = 'SILENT'))
})(ht || (ht = {}))
const Jg = {
    debug: ht.DEBUG,
    verbose: ht.VERBOSE,
    info: ht.INFO,
    warn: ht.WARN,
    error: ht.ERROR,
    silent: ht.SILENT
  },
  Zg = ht.INFO,
  t_ = {
    [ht.DEBUG]: 'log',
    [ht.VERBOSE]: 'log',
    [ht.INFO]: 'info',
    [ht.WARN]: 'warn',
    [ht.ERROR]: 'error'
  },
  e_ = (e, t, ...n) => {
    if (t < e.logLevel) return
    const r = new Date().toISOString(),
      s = t_[t]
    if (s) console[s](`[${r}]  ${e.name}:`, ...n)
    else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)
  }
class Zh {
  constructor(t) {
    ;((this.name = t),
      (this._logLevel = Zg),
      (this._logHandler = e_),
      (this._userLogHandler = null))
  }
  get logLevel() {
    return this._logLevel
  }
  set logLevel(t) {
    if (!(t in ht)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``)
    this._logLevel = t
  }
  setLogLevel(t) {
    this._logLevel = typeof t == 'string' ? Jg[t] : t
  }
  get logHandler() {
    return this._logHandler
  }
  set logHandler(t) {
    if (typeof t != 'function')
      throw new TypeError('Value assigned to `logHandler` must be a function')
    this._logHandler = t
  }
  get userLogHandler() {
    return this._userLogHandler
  }
  set userLogHandler(t) {
    this._userLogHandler = t
  }
  debug(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ht.DEBUG, ...t),
      this._logHandler(this, ht.DEBUG, ...t))
  }
  log(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ht.VERBOSE, ...t),
      this._logHandler(this, ht.VERBOSE, ...t))
  }
  info(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ht.INFO, ...t),
      this._logHandler(this, ht.INFO, ...t))
  }
  warn(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ht.WARN, ...t),
      this._logHandler(this, ht.WARN, ...t))
  }
  error(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ht.ERROR, ...t),
      this._logHandler(this, ht.ERROR, ...t))
  }
}
const n_ = (e, t) => t.some((n) => e instanceof n)
let ju, $u
function r_() {
  return ju || (ju = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function s_() {
  return (
    $u ||
    ($u = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ])
  )
}
const tf = new WeakMap(),
  Yo = new WeakMap(),
  ef = new WeakMap(),
  So = new WeakMap(),
  Na = new WeakMap()
function i_(e) {
  const t = new Promise((n, r) => {
    const s = () => {
        ;(e.removeEventListener('success', i), e.removeEventListener('error', a))
      },
      i = () => {
        ;(n(En(e.result)), s())
      },
      a = () => {
        ;(r(e.error), s())
      }
    ;(e.addEventListener('success', i), e.addEventListener('error', a))
  })
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && tf.set(n, e)
      })
      .catch(() => {}),
    Na.set(t, e),
    t
  )
}
function o_(e) {
  if (Yo.has(e)) return
  const t = new Promise((n, r) => {
    const s = () => {
        ;(e.removeEventListener('complete', i),
          e.removeEventListener('error', a),
          e.removeEventListener('abort', a))
      },
      i = () => {
        ;(n(), s())
      },
      a = () => {
        ;(r(e.error || new DOMException('AbortError', 'AbortError')), s())
      }
    ;(e.addEventListener('complete', i),
      e.addEventListener('error', a),
      e.addEventListener('abort', a))
  })
  Yo.set(e, t)
}
let Xo = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === 'done') return Yo.get(e)
      if (t === 'objectStoreNames') return e.objectStoreNames || ef.get(e)
      if (t === 'store')
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
    }
    return En(e[t])
  },
  set(e, t, n) {
    return ((e[t] = n), !0)
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === 'done' || t === 'store') ? !0 : t in e
  }
}
function a_(e) {
  Xo = e(Xo)
}
function l_(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(Co(this), t, ...n)
        return (ef.set(r, t.sort ? t.sort() : [t]), En(r))
      }
    : s_().includes(e)
      ? function (...t) {
          return (e.apply(Co(this), t), En(tf.get(this)))
        }
      : function (...t) {
          return En(e.apply(Co(this), t))
        }
}
function u_(e) {
  return typeof e == 'function'
    ? l_(e)
    : (e instanceof IDBTransaction && o_(e), n_(e, r_()) ? new Proxy(e, Xo) : e)
}
function En(e) {
  if (e instanceof IDBRequest) return i_(e)
  if (So.has(e)) return So.get(e)
  const t = u_(e)
  return (t !== e && (So.set(e, t), Na.set(t, e)), t)
}
const Co = (e) => Na.get(e)
function c_(e, t, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
  const a = indexedDB.open(e, t),
    l = En(a)
  return (
    r &&
      a.addEventListener('upgradeneeded', (c) => {
        r(En(a.result), c.oldVersion, c.newVersion, En(a.transaction), c)
      }),
    n && a.addEventListener('blocked', (c) => n(c.oldVersion, c.newVersion, c)),
    l
      .then((c) => {
        ;(i && c.addEventListener('close', () => i()),
          s && c.addEventListener('versionchange', (f) => s(f.oldVersion, f.newVersion, f)))
      })
      .catch(() => {}),
    l
  )
}
const h_ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  f_ = ['put', 'add', 'delete', 'clear'],
  Vo = new Map()
function qu(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return
  if (Vo.get(t)) return Vo.get(t)
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    s = f_.includes(n)
  if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || h_.includes(n))) return
  const i = async function (a, ...l) {
    const c = this.transaction(a, s ? 'readwrite' : 'readonly')
    let f = c.store
    return (r && (f = f.index(l.shift())), (await Promise.all([f[n](...l), s && c.done]))[0])
  }
  return (Vo.set(t, i), i)
}
a_((e) => ({
  ...e,
  get: (t, n, r) => qu(t, n) || e.get(t, n, r),
  has: (t, n) => !!qu(t, n) || e.has(t, n)
}))
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class d_ {
  constructor(t) {
    this.container = t
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (p_(n)) {
          const r = n.getImmediate()
          return `${r.library}/${r.version}`
        } else return null
      })
      .filter((n) => n)
      .join(' ')
  }
}
function p_(e) {
  const t = e.getComponent()
  return (t == null ? void 0 : t.type) === 'VERSION'
}
const Jo = '@firebase/app',
  Ku = '0.10.13'
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ln = new Zh('@firebase/app'),
  m_ = '@firebase/app-compat',
  g_ = '@firebase/analytics-compat',
  __ = '@firebase/analytics',
  y_ = '@firebase/app-check-compat',
  v_ = '@firebase/app-check',
  E_ = '@firebase/auth',
  T_ = '@firebase/auth-compat',
  w_ = '@firebase/database',
  b_ = '@firebase/data-connect',
  I_ = '@firebase/database-compat',
  A_ = '@firebase/functions',
  R_ = '@firebase/functions-compat',
  x_ = '@firebase/installations',
  P_ = '@firebase/installations-compat',
  S_ = '@firebase/messaging',
  C_ = '@firebase/messaging-compat',
  V_ = '@firebase/performance',
  k_ = '@firebase/performance-compat',
  D_ = '@firebase/remote-config',
  N_ = '@firebase/remote-config-compat',
  O_ = '@firebase/storage',
  M_ = '@firebase/storage-compat',
  L_ = '@firebase/firestore',
  F_ = '@firebase/vertexai-preview',
  U_ = '@firebase/firestore-compat',
  B_ = 'firebase',
  j_ = '10.14.1'
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Zo = '[DEFAULT]',
  $_ = {
    [Jo]: 'fire-core',
    [m_]: 'fire-core-compat',
    [__]: 'fire-analytics',
    [g_]: 'fire-analytics-compat',
    [v_]: 'fire-app-check',
    [y_]: 'fire-app-check-compat',
    [E_]: 'fire-auth',
    [T_]: 'fire-auth-compat',
    [w_]: 'fire-rtdb',
    [b_]: 'fire-data-connect',
    [I_]: 'fire-rtdb-compat',
    [A_]: 'fire-fn',
    [R_]: 'fire-fn-compat',
    [x_]: 'fire-iid',
    [P_]: 'fire-iid-compat',
    [S_]: 'fire-fcm',
    [C_]: 'fire-fcm-compat',
    [V_]: 'fire-perf',
    [k_]: 'fire-perf-compat',
    [D_]: 'fire-rc',
    [N_]: 'fire-rc-compat',
    [O_]: 'fire-gcs',
    [M_]: 'fire-gcs-compat',
    [L_]: 'fire-fst',
    [U_]: 'fire-fst-compat',
    [F_]: 'fire-vertex',
    'fire-js': 'fire-js',
    [B_]: 'fire-js-all'
  }
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wi = new Map(),
  q_ = new Map(),
  ta = new Map()
function Hu(e, t) {
  try {
    e.container.addComponent(t)
  } catch (n) {
    ln.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n)
  }
}
function ys(e) {
  const t = e.name
  if (ta.has(t)) return (ln.debug(`There were multiple attempts to register component ${t}.`), !1)
  ta.set(t, e)
  for (const n of wi.values()) Hu(n, e)
  for (const n of q_.values()) Hu(n, e)
  return !0
}
function nf(e, t) {
  const n = e.container.getProvider('heartbeat').getImmediate({ optional: !0 })
  return (n && n.triggerHeartbeat(), e.container.getProvider(t))
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const K_ = {
    'no-app': "No Firebase App '{$appName}' has been created - call initializeApp() first",
    'bad-app-name': "Illegal App name: '{$appName}'",
    'duplicate-app':
      "Firebase App named '{$appName}' already exists with different options or config",
    'app-deleted': "Firebase App named '{$appName}' already deleted",
    'server-app-deleted': 'Firebase Server App has been deleted',
    'no-options': 'Need to provide options, when not being deployed to hosting via source.',
    'invalid-app-argument':
      'firebase.{$appName}() takes either no argument or a Firebase App instance.',
    'invalid-log-argument': 'First argument to `onLog` must be null or a function.',
    'idb-open': 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-get': 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-set': 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
    'idb-delete':
      'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
    'finalization-registry-not-supported':
      'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
    'invalid-server-app-environment': 'FirebaseServerApp is not for use in browser environments.'
  },
  Tn = new Jh('app', 'Firebase', K_)
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class H_ {
  constructor(t, n, r) {
    ;((this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new yr('app', () => this, 'PUBLIC')))
  }
  get automaticDataCollectionEnabled() {
    return (this.checkDestroyed(), this._automaticDataCollectionEnabled)
  }
  set automaticDataCollectionEnabled(t) {
    ;(this.checkDestroyed(), (this._automaticDataCollectionEnabled = t))
  }
  get name() {
    return (this.checkDestroyed(), this._name)
  }
  get options() {
    return (this.checkDestroyed(), this._options)
  }
  get config() {
    return (this.checkDestroyed(), this._config)
  }
  get container() {
    return this._container
  }
  get isDeleted() {
    return this._isDeleted
  }
  set isDeleted(t) {
    this._isDeleted = t
  }
  checkDestroyed() {
    if (this.isDeleted) throw Tn.create('app-deleted', { appName: this._name })
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const rf = j_
function sf(e, t = {}) {
  let n = e
  typeof t != 'object' && (t = { name: t })
  const r = Object.assign({ name: Zo, automaticDataCollectionEnabled: !1 }, t),
    s = r.name
  if (typeof s != 'string' || !s) throw Tn.create('bad-app-name', { appName: String(s) })
  if ((n || (n = Yh()), !n)) throw Tn.create('no-options')
  const i = wi.get(s)
  if (i) {
    if (Qo(n, i.options) && Qo(r, i.config)) return i
    throw Tn.create('duplicate-app', { appName: s })
  }
  const a = new Xg(s)
  for (const c of ta.values()) a.addComponent(c)
  const l = new H_(n, r, a)
  return (wi.set(s, l), l)
}
function of(e = Zo) {
  const t = wi.get(e)
  if (!t && e === Zo && Yh()) return sf()
  if (!t) throw Tn.create('no-app', { appName: e })
  return t
}
function wn(e, t, n) {
  var r
  let s = (r = $_[e]) !== null && r !== void 0 ? r : e
  n && (s += `-${n}`)
  const i = s.match(/\s|\//),
    a = t.match(/\s|\//)
  if (i || a) {
    const l = [`Unable to register library "${s}" with version "${t}":`]
    ;(i && l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
      i && a && l.push('and'),
      a && l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
      ln.warn(l.join(' ')))
    return
  }
  ys(new yr(`${s}-version`, () => ({ library: s, version: t }), 'VERSION'))
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const z_ = 'firebase-heartbeat-database',
  W_ = 1,
  vs = 'firebase-heartbeat-store'
let ko = null
function af() {
  return (
    ko ||
      (ko = c_(z_, W_, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              try {
                e.createObjectStore(vs)
              } catch (n) {
                console.warn(n)
              }
          }
        }
      }).catch((e) => {
        throw Tn.create('idb-open', { originalErrorMessage: e.message })
      })),
    ko
  )
}
async function G_(e) {
  try {
    const n = (await af()).transaction(vs),
      r = await n.objectStore(vs).get(lf(e))
    return (await n.done, r)
  } catch (t) {
    if (t instanceof Yn) ln.warn(t.message)
    else {
      const n = Tn.create('idb-get', { originalErrorMessage: t == null ? void 0 : t.message })
      ln.warn(n.message)
    }
  }
}
async function zu(e, t) {
  try {
    const r = (await af()).transaction(vs, 'readwrite')
    ;(await r.objectStore(vs).put(t, lf(e)), await r.done)
  } catch (n) {
    if (n instanceof Yn) ln.warn(n.message)
    else {
      const r = Tn.create('idb-set', { originalErrorMessage: n == null ? void 0 : n.message })
      ln.warn(r.message)
    }
  }
}
function lf(e) {
  return `${e.name}!${e.options.appId}`
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Q_ = 1024,
  Y_ = 720 * 60 * 60 * 1e3
class X_ {
  constructor(t) {
    ;((this.container = t), (this._heartbeatsCache = null))
    const n = this.container.getProvider('app').getImmediate()
    ;((this._storage = new Z_(n)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r))))
  }
  async triggerHeartbeat() {
    var t, n
    try {
      const s = this.container
          .getProvider('platform-logger')
          .getImmediate()
          .getPlatformInfoString(),
        i = Wu()
      return (((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) ==
        null &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        ((n = this._heartbeatsCache) === null || n === void 0 ? void 0 : n.heartbeats) == null)) ||
        this._heartbeatsCache.lastSentHeartbeatDate === i ||
        this._heartbeatsCache.heartbeats.some((a) => a.date === i)
        ? void 0
        : (this._heartbeatsCache.heartbeats.push({ date: i, agent: s }),
          (this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((a) => {
            const l = new Date(a.date).valueOf()
            return Date.now() - l <= Y_
          })),
          this._storage.overwrite(this._heartbeatsCache))
    } catch (r) {
      ln.warn(r)
    }
  }
  async getHeartbeatsHeader() {
    var t
    try {
      if (
        (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
        ((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null ||
          this._heartbeatsCache.heartbeats.length === 0)
      )
        return ''
      const n = Wu(),
        { heartbeatsToSend: r, unsentEntries: s } = J_(this._heartbeatsCache.heartbeats),
        i = Ti(JSON.stringify({ version: 2, heartbeats: r }))
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = n),
        s.length > 0
          ? ((this._heartbeatsCache.heartbeats = s),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        i
      )
    } catch (n) {
      return (ln.warn(n), '')
    }
  }
}
function Wu() {
  return new Date().toISOString().substring(0, 10)
}
function J_(e, t = Q_) {
  const n = []
  let r = e.slice()
  for (const s of e) {
    const i = n.find((a) => a.agent === s.agent)
    if (i) {
      if ((i.dates.push(s.date), Gu(n) > t)) {
        i.dates.pop()
        break
      }
    } else if ((n.push({ agent: s.agent, dates: [s.date] }), Gu(n) > t)) {
      n.pop()
      break
    }
    r = r.slice(1)
  }
  return { heartbeatsToSend: n, unsentEntries: r }
}
class Z_ {
  constructor(t) {
    ;((this.app = t), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()))
  }
  async runIndexedDBEnvironmentCheck() {
    return qg()
      ? Kg()
          .then(() => !0)
          .catch(() => !1)
      : !1
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await G_(this.app)
      return n != null && n.heartbeats ? n : { heartbeats: [] }
    } else return { heartbeats: [] }
  }
  async overwrite(t) {
    var n
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read()
      return zu(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0 ? n : s.lastSentHeartbeatDate,
        heartbeats: t.heartbeats
      })
    } else return
  }
  async add(t) {
    var n
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read()
      return zu(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0 ? n : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...t.heartbeats]
      })
    } else return
  }
}
function Gu(e) {
  return Ti(JSON.stringify({ version: 2, heartbeats: e })).length
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ty(e) {
  ;(ys(new yr('platform-logger', (t) => new d_(t), 'PRIVATE')),
    ys(new yr('heartbeat', (t) => new X_(t), 'PRIVATE')),
    wn(Jo, Ku, e),
    wn(Jo, Ku, 'esm2017'),
    wn('fire-js', ''))
}
ty('')
var ey = 'firebase',
  ny = '10.14.1'
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ wn(ey, ny, 'app')
var Qu =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/ var Hn, uf
;(function () {
  var e
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ function t(I, _) {
    function E() {}
    ;((E.prototype = _.prototype),
      (I.D = _.prototype),
      (I.prototype = new E()),
      (I.prototype.constructor = I),
      (I.C = function (T, A, x) {
        for (var v = Array(arguments.length - 2), he = 2; he < arguments.length; he++)
          v[he - 2] = arguments[he]
        return _.prototype[A].apply(T, v)
      }))
  }
  function n() {
    this.blockSize = -1
  }
  function r() {
    ;((this.blockSize = -1),
      (this.blockSize = 64),
      (this.g = Array(4)),
      (this.B = Array(this.blockSize)),
      (this.o = this.h = 0),
      this.s())
  }
  ;(t(r, n),
    (r.prototype.s = function () {
      ;((this.g[0] = 1732584193),
        (this.g[1] = 4023233417),
        (this.g[2] = 2562383102),
        (this.g[3] = 271733878),
        (this.o = this.h = 0))
    }))
  function s(I, _, E) {
    E || (E = 0)
    var T = Array(16)
    if (typeof _ == 'string')
      for (var A = 0; 16 > A; ++A)
        T[A] =
          _.charCodeAt(E++) |
          (_.charCodeAt(E++) << 8) |
          (_.charCodeAt(E++) << 16) |
          (_.charCodeAt(E++) << 24)
    else for (A = 0; 16 > A; ++A) T[A] = _[E++] | (_[E++] << 8) | (_[E++] << 16) | (_[E++] << 24)
    ;((_ = I.g[0]), (E = I.g[1]), (A = I.g[2]))
    var x = I.g[3],
      v = (_ + (x ^ (E & (A ^ x))) + T[0] + 3614090360) & 4294967295
    ;((_ = E + (((v << 7) & 4294967295) | (v >>> 25))),
      (v = (x + (A ^ (_ & (E ^ A))) + T[1] + 3905402710) & 4294967295),
      (x = _ + (((v << 12) & 4294967295) | (v >>> 20))),
      (v = (A + (E ^ (x & (_ ^ E))) + T[2] + 606105819) & 4294967295),
      (A = x + (((v << 17) & 4294967295) | (v >>> 15))),
      (v = (E + (_ ^ (A & (x ^ _))) + T[3] + 3250441966) & 4294967295),
      (E = A + (((v << 22) & 4294967295) | (v >>> 10))),
      (v = (_ + (x ^ (E & (A ^ x))) + T[4] + 4118548399) & 4294967295),
      (_ = E + (((v << 7) & 4294967295) | (v >>> 25))),
      (v = (x + (A ^ (_ & (E ^ A))) + T[5] + 1200080426) & 4294967295),
      (x = _ + (((v << 12) & 4294967295) | (v >>> 20))),
      (v = (A + (E ^ (x & (_ ^ E))) + T[6] + 2821735955) & 4294967295),
      (A = x + (((v << 17) & 4294967295) | (v >>> 15))),
      (v = (E + (_ ^ (A & (x ^ _))) + T[7] + 4249261313) & 4294967295),
      (E = A + (((v << 22) & 4294967295) | (v >>> 10))),
      (v = (_ + (x ^ (E & (A ^ x))) + T[8] + 1770035416) & 4294967295),
      (_ = E + (((v << 7) & 4294967295) | (v >>> 25))),
      (v = (x + (A ^ (_ & (E ^ A))) + T[9] + 2336552879) & 4294967295),
      (x = _ + (((v << 12) & 4294967295) | (v >>> 20))),
      (v = (A + (E ^ (x & (_ ^ E))) + T[10] + 4294925233) & 4294967295),
      (A = x + (((v << 17) & 4294967295) | (v >>> 15))),
      (v = (E + (_ ^ (A & (x ^ _))) + T[11] + 2304563134) & 4294967295),
      (E = A + (((v << 22) & 4294967295) | (v >>> 10))),
      (v = (_ + (x ^ (E & (A ^ x))) + T[12] + 1804603682) & 4294967295),
      (_ = E + (((v << 7) & 4294967295) | (v >>> 25))),
      (v = (x + (A ^ (_ & (E ^ A))) + T[13] + 4254626195) & 4294967295),
      (x = _ + (((v << 12) & 4294967295) | (v >>> 20))),
      (v = (A + (E ^ (x & (_ ^ E))) + T[14] + 2792965006) & 4294967295),
      (A = x + (((v << 17) & 4294967295) | (v >>> 15))),
      (v = (E + (_ ^ (A & (x ^ _))) + T[15] + 1236535329) & 4294967295),
      (E = A + (((v << 22) & 4294967295) | (v >>> 10))),
      (v = (_ + (A ^ (x & (E ^ A))) + T[1] + 4129170786) & 4294967295),
      (_ = E + (((v << 5) & 4294967295) | (v >>> 27))),
      (v = (x + (E ^ (A & (_ ^ E))) + T[6] + 3225465664) & 4294967295),
      (x = _ + (((v << 9) & 4294967295) | (v >>> 23))),
      (v = (A + (_ ^ (E & (x ^ _))) + T[11] + 643717713) & 4294967295),
      (A = x + (((v << 14) & 4294967295) | (v >>> 18))),
      (v = (E + (x ^ (_ & (A ^ x))) + T[0] + 3921069994) & 4294967295),
      (E = A + (((v << 20) & 4294967295) | (v >>> 12))),
      (v = (_ + (A ^ (x & (E ^ A))) + T[5] + 3593408605) & 4294967295),
      (_ = E + (((v << 5) & 4294967295) | (v >>> 27))),
      (v = (x + (E ^ (A & (_ ^ E))) + T[10] + 38016083) & 4294967295),
      (x = _ + (((v << 9) & 4294967295) | (v >>> 23))),
      (v = (A + (_ ^ (E & (x ^ _))) + T[15] + 3634488961) & 4294967295),
      (A = x + (((v << 14) & 4294967295) | (v >>> 18))),
      (v = (E + (x ^ (_ & (A ^ x))) + T[4] + 3889429448) & 4294967295),
      (E = A + (((v << 20) & 4294967295) | (v >>> 12))),
      (v = (_ + (A ^ (x & (E ^ A))) + T[9] + 568446438) & 4294967295),
      (_ = E + (((v << 5) & 4294967295) | (v >>> 27))),
      (v = (x + (E ^ (A & (_ ^ E))) + T[14] + 3275163606) & 4294967295),
      (x = _ + (((v << 9) & 4294967295) | (v >>> 23))),
      (v = (A + (_ ^ (E & (x ^ _))) + T[3] + 4107603335) & 4294967295),
      (A = x + (((v << 14) & 4294967295) | (v >>> 18))),
      (v = (E + (x ^ (_ & (A ^ x))) + T[8] + 1163531501) & 4294967295),
      (E = A + (((v << 20) & 4294967295) | (v >>> 12))),
      (v = (_ + (A ^ (x & (E ^ A))) + T[13] + 2850285829) & 4294967295),
      (_ = E + (((v << 5) & 4294967295) | (v >>> 27))),
      (v = (x + (E ^ (A & (_ ^ E))) + T[2] + 4243563512) & 4294967295),
      (x = _ + (((v << 9) & 4294967295) | (v >>> 23))),
      (v = (A + (_ ^ (E & (x ^ _))) + T[7] + 1735328473) & 4294967295),
      (A = x + (((v << 14) & 4294967295) | (v >>> 18))),
      (v = (E + (x ^ (_ & (A ^ x))) + T[12] + 2368359562) & 4294967295),
      (E = A + (((v << 20) & 4294967295) | (v >>> 12))),
      (v = (_ + (E ^ A ^ x) + T[5] + 4294588738) & 4294967295),
      (_ = E + (((v << 4) & 4294967295) | (v >>> 28))),
      (v = (x + (_ ^ E ^ A) + T[8] + 2272392833) & 4294967295),
      (x = _ + (((v << 11) & 4294967295) | (v >>> 21))),
      (v = (A + (x ^ _ ^ E) + T[11] + 1839030562) & 4294967295),
      (A = x + (((v << 16) & 4294967295) | (v >>> 16))),
      (v = (E + (A ^ x ^ _) + T[14] + 4259657740) & 4294967295),
      (E = A + (((v << 23) & 4294967295) | (v >>> 9))),
      (v = (_ + (E ^ A ^ x) + T[1] + 2763975236) & 4294967295),
      (_ = E + (((v << 4) & 4294967295) | (v >>> 28))),
      (v = (x + (_ ^ E ^ A) + T[4] + 1272893353) & 4294967295),
      (x = _ + (((v << 11) & 4294967295) | (v >>> 21))),
      (v = (A + (x ^ _ ^ E) + T[7] + 4139469664) & 4294967295),
      (A = x + (((v << 16) & 4294967295) | (v >>> 16))),
      (v = (E + (A ^ x ^ _) + T[10] + 3200236656) & 4294967295),
      (E = A + (((v << 23) & 4294967295) | (v >>> 9))),
      (v = (_ + (E ^ A ^ x) + T[13] + 681279174) & 4294967295),
      (_ = E + (((v << 4) & 4294967295) | (v >>> 28))),
      (v = (x + (_ ^ E ^ A) + T[0] + 3936430074) & 4294967295),
      (x = _ + (((v << 11) & 4294967295) | (v >>> 21))),
      (v = (A + (x ^ _ ^ E) + T[3] + 3572445317) & 4294967295),
      (A = x + (((v << 16) & 4294967295) | (v >>> 16))),
      (v = (E + (A ^ x ^ _) + T[6] + 76029189) & 4294967295),
      (E = A + (((v << 23) & 4294967295) | (v >>> 9))),
      (v = (_ + (E ^ A ^ x) + T[9] + 3654602809) & 4294967295),
      (_ = E + (((v << 4) & 4294967295) | (v >>> 28))),
      (v = (x + (_ ^ E ^ A) + T[12] + 3873151461) & 4294967295),
      (x = _ + (((v << 11) & 4294967295) | (v >>> 21))),
      (v = (A + (x ^ _ ^ E) + T[15] + 530742520) & 4294967295),
      (A = x + (((v << 16) & 4294967295) | (v >>> 16))),
      (v = (E + (A ^ x ^ _) + T[2] + 3299628645) & 4294967295),
      (E = A + (((v << 23) & 4294967295) | (v >>> 9))),
      (v = (_ + (A ^ (E | ~x)) + T[0] + 4096336452) & 4294967295),
      (_ = E + (((v << 6) & 4294967295) | (v >>> 26))),
      (v = (x + (E ^ (_ | ~A)) + T[7] + 1126891415) & 4294967295),
      (x = _ + (((v << 10) & 4294967295) | (v >>> 22))),
      (v = (A + (_ ^ (x | ~E)) + T[14] + 2878612391) & 4294967295),
      (A = x + (((v << 15) & 4294967295) | (v >>> 17))),
      (v = (E + (x ^ (A | ~_)) + T[5] + 4237533241) & 4294967295),
      (E = A + (((v << 21) & 4294967295) | (v >>> 11))),
      (v = (_ + (A ^ (E | ~x)) + T[12] + 1700485571) & 4294967295),
      (_ = E + (((v << 6) & 4294967295) | (v >>> 26))),
      (v = (x + (E ^ (_ | ~A)) + T[3] + 2399980690) & 4294967295),
      (x = _ + (((v << 10) & 4294967295) | (v >>> 22))),
      (v = (A + (_ ^ (x | ~E)) + T[10] + 4293915773) & 4294967295),
      (A = x + (((v << 15) & 4294967295) | (v >>> 17))),
      (v = (E + (x ^ (A | ~_)) + T[1] + 2240044497) & 4294967295),
      (E = A + (((v << 21) & 4294967295) | (v >>> 11))),
      (v = (_ + (A ^ (E | ~x)) + T[8] + 1873313359) & 4294967295),
      (_ = E + (((v << 6) & 4294967295) | (v >>> 26))),
      (v = (x + (E ^ (_ | ~A)) + T[15] + 4264355552) & 4294967295),
      (x = _ + (((v << 10) & 4294967295) | (v >>> 22))),
      (v = (A + (_ ^ (x | ~E)) + T[6] + 2734768916) & 4294967295),
      (A = x + (((v << 15) & 4294967295) | (v >>> 17))),
      (v = (E + (x ^ (A | ~_)) + T[13] + 1309151649) & 4294967295),
      (E = A + (((v << 21) & 4294967295) | (v >>> 11))),
      (v = (_ + (A ^ (E | ~x)) + T[4] + 4149444226) & 4294967295),
      (_ = E + (((v << 6) & 4294967295) | (v >>> 26))),
      (v = (x + (E ^ (_ | ~A)) + T[11] + 3174756917) & 4294967295),
      (x = _ + (((v << 10) & 4294967295) | (v >>> 22))),
      (v = (A + (_ ^ (x | ~E)) + T[2] + 718787259) & 4294967295),
      (A = x + (((v << 15) & 4294967295) | (v >>> 17))),
      (v = (E + (x ^ (A | ~_)) + T[9] + 3951481745) & 4294967295),
      (I.g[0] = (I.g[0] + _) & 4294967295),
      (I.g[1] = (I.g[1] + (A + (((v << 21) & 4294967295) | (v >>> 11)))) & 4294967295),
      (I.g[2] = (I.g[2] + A) & 4294967295),
      (I.g[3] = (I.g[3] + x) & 4294967295))
  }
  ;((r.prototype.u = function (I, _) {
    _ === void 0 && (_ = I.length)
    for (var E = _ - this.blockSize, T = this.B, A = this.h, x = 0; x < _; ) {
      if (A == 0) for (; x <= E; ) (s(this, I, x), (x += this.blockSize))
      if (typeof I == 'string') {
        for (; x < _; )
          if (((T[A++] = I.charCodeAt(x++)), A == this.blockSize)) {
            ;(s(this, T), (A = 0))
            break
          }
      } else
        for (; x < _; )
          if (((T[A++] = I[x++]), A == this.blockSize)) {
            ;(s(this, T), (A = 0))
            break
          }
    }
    ;((this.h = A), (this.o += _))
  }),
    (r.prototype.v = function () {
      var I = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h)
      I[0] = 128
      for (var _ = 1; _ < I.length - 8; ++_) I[_] = 0
      var E = 8 * this.o
      for (_ = I.length - 8; _ < I.length; ++_) ((I[_] = E & 255), (E /= 256))
      for (this.u(I), I = Array(16), _ = E = 0; 4 > _; ++_)
        for (var T = 0; 32 > T; T += 8) I[E++] = (this.g[_] >>> T) & 255
      return I
    }))
  function i(I, _) {
    var E = l
    return Object.prototype.hasOwnProperty.call(E, I) ? E[I] : (E[I] = _(I))
  }
  function a(I, _) {
    this.h = _
    for (var E = [], T = !0, A = I.length - 1; 0 <= A; A--) {
      var x = I[A] | 0
      ;(T && x == _) || ((E[A] = x), (T = !1))
    }
    this.g = E
  }
  var l = {}
  function c(I) {
    return -128 <= I && 128 > I
      ? i(I, function (_) {
          return new a([_ | 0], 0 > _ ? -1 : 0)
        })
      : new a([I | 0], 0 > I ? -1 : 0)
  }
  function f(I) {
    if (isNaN(I) || !isFinite(I)) return m
    if (0 > I) return O(f(-I))
    for (var _ = [], E = 1, T = 0; I >= E; T++) ((_[T] = (I / E) | 0), (E *= 4294967296))
    return new a(_, 0)
  }
  function d(I, _) {
    if (I.length == 0) throw Error('number format error: empty string')
    if (((_ = _ || 10), 2 > _ || 36 < _)) throw Error('radix out of range: ' + _)
    if (I.charAt(0) == '-') return O(d(I.substring(1), _))
    if (0 <= I.indexOf('-')) throw Error('number format error: interior "-" character')
    for (var E = f(Math.pow(_, 8)), T = m, A = 0; A < I.length; A += 8) {
      var x = Math.min(8, I.length - A),
        v = parseInt(I.substring(A, A + x), _)
      8 > x ? ((x = f(Math.pow(_, x))), (T = T.j(x).add(f(v)))) : ((T = T.j(E)), (T = T.add(f(v))))
    }
    return T
  }
  var m = c(0),
    w = c(1),
    P = c(16777216)
  ;((e = a.prototype),
    (e.m = function () {
      if (D(this)) return -O(this).m()
      for (var I = 0, _ = 1, E = 0; E < this.g.length; E++) {
        var T = this.i(E)
        ;((I += (0 <= T ? T : 4294967296 + T) * _), (_ *= 4294967296))
      }
      return I
    }),
    (e.toString = function (I) {
      if (((I = I || 10), 2 > I || 36 < I)) throw Error('radix out of range: ' + I)
      if (L(this)) return '0'
      if (D(this)) return '-' + O(this).toString(I)
      for (var _ = f(Math.pow(I, 6)), E = this, T = ''; ; ) {
        var A = K(E, _).g
        E = G(E, A.j(_))
        var x = ((0 < E.g.length ? E.g[0] : E.h) >>> 0).toString(I)
        if (((E = A), L(E))) return x + T
        for (; 6 > x.length; ) x = '0' + x
        T = x + T
      }
    }),
    (e.i = function (I) {
      return 0 > I ? 0 : I < this.g.length ? this.g[I] : this.h
    }))
  function L(I) {
    if (I.h != 0) return !1
    for (var _ = 0; _ < I.g.length; _++) if (I.g[_] != 0) return !1
    return !0
  }
  function D(I) {
    return I.h == -1
  }
  e.l = function (I) {
    return ((I = G(this, I)), D(I) ? -1 : L(I) ? 0 : 1)
  }
  function O(I) {
    for (var _ = I.g.length, E = [], T = 0; T < _; T++) E[T] = ~I.g[T]
    return new a(E, ~I.h).add(w)
  }
  ;((e.abs = function () {
    return D(this) ? O(this) : this
  }),
    (e.add = function (I) {
      for (var _ = Math.max(this.g.length, I.g.length), E = [], T = 0, A = 0; A <= _; A++) {
        var x = T + (this.i(A) & 65535) + (I.i(A) & 65535),
          v = (x >>> 16) + (this.i(A) >>> 16) + (I.i(A) >>> 16)
        ;((T = v >>> 16), (x &= 65535), (v &= 65535), (E[A] = (v << 16) | x))
      }
      return new a(E, E[E.length - 1] & -2147483648 ? -1 : 0)
    }))
  function G(I, _) {
    return I.add(O(_))
  }
  e.j = function (I) {
    if (L(this) || L(I)) return m
    if (D(this)) return D(I) ? O(this).j(O(I)) : O(O(this).j(I))
    if (D(I)) return O(this.j(O(I)))
    if (0 > this.l(P) && 0 > I.l(P)) return f(this.m() * I.m())
    for (var _ = this.g.length + I.g.length, E = [], T = 0; T < 2 * _; T++) E[T] = 0
    for (T = 0; T < this.g.length; T++)
      for (var A = 0; A < I.g.length; A++) {
        var x = this.i(T) >>> 16,
          v = this.i(T) & 65535,
          he = I.i(A) >>> 16,
          fn = I.i(A) & 65535
        ;((E[2 * T + 2 * A] += v * fn),
          g(E, 2 * T + 2 * A),
          (E[2 * T + 2 * A + 1] += x * fn),
          g(E, 2 * T + 2 * A + 1),
          (E[2 * T + 2 * A + 1] += v * he),
          g(E, 2 * T + 2 * A + 1),
          (E[2 * T + 2 * A + 2] += x * he),
          g(E, 2 * T + 2 * A + 2))
      }
    for (T = 0; T < _; T++) E[T] = (E[2 * T + 1] << 16) | E[2 * T]
    for (T = _; T < 2 * _; T++) E[T] = 0
    return new a(E, 0)
  }
  function g(I, _) {
    for (; (I[_] & 65535) != I[_]; ) ((I[_ + 1] += I[_] >>> 16), (I[_] &= 65535), _++)
  }
  function S(I, _) {
    ;((this.g = I), (this.h = _))
  }
  function K(I, _) {
    if (L(_)) throw Error('division by zero')
    if (L(I)) return new S(m, m)
    if (D(I)) return ((_ = K(O(I), _)), new S(O(_.g), O(_.h)))
    if (D(_)) return ((_ = K(I, O(_))), new S(O(_.g), _.h))
    if (30 < I.g.length) {
      if (D(I) || D(_)) throw Error('slowDivide_ only works with positive integers.')
      for (var E = w, T = _; 0 >= T.l(I); ) ((E = ut(E)), (T = ut(T)))
      var A = _t(E, 1),
        x = _t(T, 1)
      for (T = _t(T, 2), E = _t(E, 2); !L(T); ) {
        var v = x.add(T)
        ;(0 >= v.l(I) && ((A = A.add(E)), (x = v)), (T = _t(T, 1)), (E = _t(E, 1)))
      }
      return ((_ = G(I, A.j(_))), new S(A, _))
    }
    for (A = m; 0 <= I.l(_); ) {
      for (
        E = Math.max(1, Math.floor(I.m() / _.m())),
          T = Math.ceil(Math.log(E) / Math.LN2),
          T = 48 >= T ? 1 : Math.pow(2, T - 48),
          x = f(E),
          v = x.j(_);
        D(v) || 0 < v.l(I);
      )
        ((E -= T), (x = f(E)), (v = x.j(_)))
      ;(L(x) && (x = w), (A = A.add(x)), (I = G(I, v)))
    }
    return new S(A, I)
  }
  ;((e.A = function (I) {
    return K(this, I).h
  }),
    (e.and = function (I) {
      for (var _ = Math.max(this.g.length, I.g.length), E = [], T = 0; T < _; T++)
        E[T] = this.i(T) & I.i(T)
      return new a(E, this.h & I.h)
    }),
    (e.or = function (I) {
      for (var _ = Math.max(this.g.length, I.g.length), E = [], T = 0; T < _; T++)
        E[T] = this.i(T) | I.i(T)
      return new a(E, this.h | I.h)
    }),
    (e.xor = function (I) {
      for (var _ = Math.max(this.g.length, I.g.length), E = [], T = 0; T < _; T++)
        E[T] = this.i(T) ^ I.i(T)
      return new a(E, this.h ^ I.h)
    }))
  function ut(I) {
    for (var _ = I.g.length + 1, E = [], T = 0; T < _; T++)
      E[T] = (I.i(T) << 1) | (I.i(T - 1) >>> 31)
    return new a(E, I.h)
  }
  function _t(I, _) {
    var E = _ >> 5
    _ %= 32
    for (var T = I.g.length - E, A = [], x = 0; x < T; x++)
      A[x] = 0 < _ ? (I.i(x + E) >>> _) | (I.i(x + E + 1) << (32 - _)) : I.i(x + E)
    return new a(A, I.h)
  }
  ;((r.prototype.digest = r.prototype.v),
    (r.prototype.reset = r.prototype.s),
    (r.prototype.update = r.prototype.u),
    (uf = r),
    (a.prototype.add = a.prototype.add),
    (a.prototype.multiply = a.prototype.j),
    (a.prototype.modulo = a.prototype.A),
    (a.prototype.compare = a.prototype.l),
    (a.prototype.toNumber = a.prototype.m),
    (a.prototype.toString = a.prototype.toString),
    (a.prototype.getBits = a.prototype.i),
    (a.fromNumber = f),
    (a.fromString = d),
    (Hn = a))
}).apply(typeof Qu < 'u' ? Qu : typeof self < 'u' ? self : typeof window < 'u' ? window : {})
var ni =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/ var cf, Zr, hf, hi, ea, ff, df, pf
;(function () {
  var e,
    t =
      typeof Object.defineProperties == 'function'
        ? Object.defineProperty
        : function (o, u, h) {
            return (o == Array.prototype || o == Object.prototype || (o[u] = h.value), o)
          }
  function n(o) {
    o = [
      typeof globalThis == 'object' && globalThis,
      o,
      typeof window == 'object' && window,
      typeof self == 'object' && self,
      typeof ni == 'object' && ni
    ]
    for (var u = 0; u < o.length; ++u) {
      var h = o[u]
      if (h && h.Math == Math) return h
    }
    throw Error('Cannot find global object')
  }
  var r = n(this)
  function s(o, u) {
    if (u)
      t: {
        var h = r
        o = o.split('.')
        for (var p = 0; p < o.length - 1; p++) {
          var R = o[p]
          if (!(R in h)) break t
          h = h[R]
        }
        ;((o = o[o.length - 1]),
          (p = h[o]),
          (u = u(p)),
          u != p && u != null && t(h, o, { configurable: !0, writable: !0, value: u }))
      }
  }
  function i(o, u) {
    o instanceof String && (o += '')
    var h = 0,
      p = !1,
      R = {
        next: function () {
          if (!p && h < o.length) {
            var V = h++
            return { value: u(V, o[V]), done: !1 }
          }
          return ((p = !0), { done: !0, value: void 0 })
        }
      }
    return (
      (R[Symbol.iterator] = function () {
        return R
      }),
      R
    )
  }
  s('Array.prototype.values', function (o) {
    return (
      o ||
      function () {
        return i(this, function (u, h) {
          return h
        })
      }
    )
  })
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ var a = a || {},
    l = this || self
  function c(o) {
    var u = typeof o
    return (
      (u = u != 'object' ? u : o ? (Array.isArray(o) ? 'array' : u) : 'null'),
      u == 'array' || (u == 'object' && typeof o.length == 'number')
    )
  }
  function f(o) {
    var u = typeof o
    return (u == 'object' && o != null) || u == 'function'
  }
  function d(o, u, h) {
    return o.call.apply(o.bind, arguments)
  }
  function m(o, u, h) {
    if (!o) throw Error()
    if (2 < arguments.length) {
      var p = Array.prototype.slice.call(arguments, 2)
      return function () {
        var R = Array.prototype.slice.call(arguments)
        return (Array.prototype.unshift.apply(R, p), o.apply(u, R))
      }
    }
    return function () {
      return o.apply(u, arguments)
    }
  }
  function w(o, u, h) {
    return (
      (w =
        Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1
          ? d
          : m),
      w.apply(null, arguments)
    )
  }
  function P(o, u) {
    var h = Array.prototype.slice.call(arguments, 1)
    return function () {
      var p = h.slice()
      return (p.push.apply(p, arguments), o.apply(this, p))
    }
  }
  function L(o, u) {
    function h() {}
    ;((h.prototype = u.prototype),
      (o.aa = u.prototype),
      (o.prototype = new h()),
      (o.prototype.constructor = o),
      (o.Qb = function (p, R, V) {
        for (var q = Array(arguments.length - 2), bt = 2; bt < arguments.length; bt++)
          q[bt - 2] = arguments[bt]
        return u.prototype[R].apply(p, q)
      }))
  }
  function D(o) {
    const u = o.length
    if (0 < u) {
      const h = Array(u)
      for (let p = 0; p < u; p++) h[p] = o[p]
      return h
    }
    return []
  }
  function O(o, u) {
    for (let h = 1; h < arguments.length; h++) {
      const p = arguments[h]
      if (c(p)) {
        const R = o.length || 0,
          V = p.length || 0
        o.length = R + V
        for (let q = 0; q < V; q++) o[R + q] = p[q]
      } else o.push(p)
    }
  }
  class G {
    constructor(u, h) {
      ;((this.i = u), (this.j = h), (this.h = 0), (this.g = null))
    }
    get() {
      let u
      return (
        0 < this.h ? (this.h--, (u = this.g), (this.g = u.next), (u.next = null)) : (u = this.i()),
        u
      )
    }
  }
  function g(o) {
    return /^[\s\xa0]*$/.test(o)
  }
  function S() {
    var o = l.navigator
    return o && (o = o.userAgent) ? o : ''
  }
  function K(o) {
    return (K[' '](o), o)
  }
  K[' '] = function () {}
  var ut =
    S().indexOf('Gecko') != -1 &&
    !(S().toLowerCase().indexOf('webkit') != -1 && S().indexOf('Edge') == -1) &&
    !(S().indexOf('Trident') != -1 || S().indexOf('MSIE') != -1) &&
    S().indexOf('Edge') == -1
  function _t(o, u, h) {
    for (const p in o) u.call(h, o[p], p, o)
  }
  function I(o, u) {
    for (const h in o) u.call(void 0, o[h], h, o)
  }
  function _(o) {
    const u = {}
    for (const h in o) u[h] = o[h]
    return u
  }
  const E =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    )
  function T(o, u) {
    let h, p
    for (let R = 1; R < arguments.length; R++) {
      p = arguments[R]
      for (h in p) o[h] = p[h]
      for (let V = 0; V < E.length; V++)
        ((h = E[V]), Object.prototype.hasOwnProperty.call(p, h) && (o[h] = p[h]))
    }
  }
  function A(o) {
    var u = 1
    o = o.split(':')
    const h = []
    for (; 0 < u && o.length; ) (h.push(o.shift()), u--)
    return (o.length && h.push(o.join(':')), h)
  }
  function x(o) {
    l.setTimeout(() => {
      throw o
    }, 0)
  }
  function v() {
    var o = we
    let u = null
    return (o.g && ((u = o.g), (o.g = o.g.next), o.g || (o.h = null), (u.next = null)), u)
  }
  class he {
    constructor() {
      this.h = this.g = null
    }
    add(u, h) {
      const p = fn.get()
      ;(p.set(u, h), this.h ? (this.h.next = p) : (this.g = p), (this.h = p))
    }
  }
  var fn = new G(
    () => new jt(),
    (o) => o.reset()
  )
  class jt {
    constructor() {
      this.next = this.g = this.h = null
    }
    set(u, h) {
      ;((this.h = u), (this.g = h), (this.next = null))
    }
    reset() {
      this.next = this.g = this.h = null
    }
  }
  let Et,
    ft = !1,
    we = new he(),
    Vn = () => {
      const o = l.Promise.resolve(void 0)
      Et = () => {
        o.then(We)
      }
    }
  var We = () => {
    for (var o; (o = v()); ) {
      try {
        o.h.call(o.g)
      } catch (h) {
        x(h)
      }
      var u = fn
      ;(u.j(o), 100 > u.h && (u.h++, (o.next = u.g), (u.g = o)))
    }
    ft = !1
  }
  function Mt() {
    ;((this.s = this.s), (this.C = this.C))
  }
  ;((Mt.prototype.s = !1),
    (Mt.prototype.ma = function () {
      this.s || ((this.s = !0), this.N())
    }),
    (Mt.prototype.N = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()()
    }))
  function Lt(o, u) {
    ;((this.type = o), (this.g = this.target = u), (this.defaultPrevented = !1))
  }
  Lt.prototype.h = function () {
    this.defaultPrevented = !0
  }
  var ro = (function () {
    if (!l.addEventListener || !Object.defineProperty) return !1
    var o = !1,
      u = Object.defineProperty({}, 'passive', {
        get: function () {
          o = !0
        }
      })
    try {
      const h = () => {}
      ;(l.addEventListener('test', h, u), l.removeEventListener('test', h, u))
    } catch {}
    return o
  })()
  function kn(o, u) {
    if (
      (Lt.call(this, o ? o.type : ''),
      (this.relatedTarget = this.g = this.target = null),
      (this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0),
      (this.key = ''),
      (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
      (this.state = null),
      (this.pointerId = 0),
      (this.pointerType = ''),
      (this.i = null),
      o)
    ) {
      var h = (this.type = o.type),
        p = o.changedTouches && o.changedTouches.length ? o.changedTouches[0] : null
      if (((this.target = o.target || o.srcElement), (this.g = u), (u = o.relatedTarget))) {
        if (ut) {
          t: {
            try {
              K(u.nodeName)
              var R = !0
              break t
            } catch {}
            R = !1
          }
          R || (u = null)
        }
      } else h == 'mouseover' ? (u = o.fromElement) : h == 'mouseout' && (u = o.toElement)
      ;((this.relatedTarget = u),
        p
          ? ((this.clientX = p.clientX !== void 0 ? p.clientX : p.pageX),
            (this.clientY = p.clientY !== void 0 ? p.clientY : p.pageY),
            (this.screenX = p.screenX || 0),
            (this.screenY = p.screenY || 0))
          : ((this.clientX = o.clientX !== void 0 ? o.clientX : o.pageX),
            (this.clientY = o.clientY !== void 0 ? o.clientY : o.pageY),
            (this.screenX = o.screenX || 0),
            (this.screenY = o.screenY || 0)),
        (this.button = o.button),
        (this.key = o.key || ''),
        (this.ctrlKey = o.ctrlKey),
        (this.altKey = o.altKey),
        (this.shiftKey = o.shiftKey),
        (this.metaKey = o.metaKey),
        (this.pointerId = o.pointerId || 0),
        (this.pointerType =
          typeof o.pointerType == 'string' ? o.pointerType : Dn[o.pointerType] || ''),
        (this.state = o.state),
        (this.i = o),
        o.defaultPrevented && kn.aa.h.call(this))
    }
  }
  L(kn, Lt)
  var Dn = { 2: 'touch', 3: 'pen', 4: 'mouse' }
  kn.prototype.h = function () {
    kn.aa.h.call(this)
    var o = this.i
    o.preventDefault ? o.preventDefault() : (o.returnValue = !1)
  }
  var Ge = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
    Vr = 0
  function Ms(o, u, h, p, R) {
    ;((this.listener = o),
      (this.proxy = null),
      (this.src = u),
      (this.type = h),
      (this.capture = !!p),
      (this.ha = R),
      (this.key = ++Vr),
      (this.da = this.fa = !1))
  }
  function Se(o) {
    ;((o.da = !0), (o.listener = null), (o.proxy = null), (o.src = null), (o.ha = null))
  }
  function kr(o) {
    ;((this.src = o), (this.g = {}), (this.h = 0))
  }
  kr.prototype.add = function (o, u, h, p, R) {
    var V = o.toString()
    ;((o = this.g[V]), o || ((o = this.g[V] = []), this.h++))
    var q = b(o, u, p, R)
    return (
      -1 < q
        ? ((u = o[q]), h || (u.fa = !1))
        : ((u = new Ms(u, this.src, V, !!p, R)), (u.fa = h), o.push(u)),
      u
    )
  }
  function y(o, u) {
    var h = u.type
    if (h in o.g) {
      var p = o.g[h],
        R = Array.prototype.indexOf.call(p, u, void 0),
        V
      ;((V = 0 <= R) && Array.prototype.splice.call(p, R, 1),
        V && (Se(u), o.g[h].length == 0 && (delete o.g[h], o.h--)))
    }
  }
  function b(o, u, h, p) {
    for (var R = 0; R < o.length; ++R) {
      var V = o[R]
      if (!V.da && V.listener == u && V.capture == !!h && V.ha == p) return R
    }
    return -1
  }
  var k = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    U = {}
  function N(o, u, h, p, R) {
    if (Array.isArray(u)) {
      for (var V = 0; V < u.length; V++) N(o, u[V], h, p, R)
      return null
    }
    return ((h = tt(h)), o && o[Ge] ? o.K(u, h, f(p) ? !!p.capture : !1, R) : F(o, u, h, !1, p, R))
  }
  function F(o, u, h, p, R, V) {
    if (!u) throw Error('Invalid event type')
    var q = f(R) ? !!R.capture : !!R,
      bt = W(o)
    if ((bt || (o[k] = bt = new kr(o)), (h = bt.add(u, h, p, q, V)), h.proxy)) return h
    if (((p = z()), (h.proxy = p), (p.src = o), (p.listener = h), o.addEventListener))
      (ro || (R = q), R === void 0 && (R = !1), o.addEventListener(u.toString(), p, R))
    else if (o.attachEvent) o.attachEvent(M(u.toString()), p)
    else if (o.addListener && o.removeListener) o.addListener(p)
    else throw Error('addEventListener and attachEvent are unavailable.')
    return h
  }
  function z() {
    function o(h) {
      return u.call(o.src, o.listener, h)
    }
    const u = J
    return o
  }
  function H(o, u, h, p, R) {
    if (Array.isArray(u)) for (var V = 0; V < u.length; V++) H(o, u[V], h, p, R)
    else
      ((p = f(p) ? !!p.capture : !!p),
        (h = tt(h)),
        o && o[Ge]
          ? ((o = o.i),
            (u = String(u).toString()),
            u in o.g &&
              ((V = o.g[u]),
              (h = b(V, h, p, R)),
              -1 < h &&
                (Se(V[h]),
                Array.prototype.splice.call(V, h, 1),
                V.length == 0 && (delete o.g[u], o.h--))))
          : o &&
            (o = W(o)) &&
            ((u = o.g[u.toString()]),
            (o = -1),
            u && (o = b(u, h, p, R)),
            (h = -1 < o ? u[o] : null) && $(h)))
  }
  function $(o) {
    if (typeof o != 'number' && o && !o.da) {
      var u = o.src
      if (u && u[Ge]) y(u.i, o)
      else {
        var h = o.type,
          p = o.proxy
        ;(u.removeEventListener
          ? u.removeEventListener(h, p, o.capture)
          : u.detachEvent
            ? u.detachEvent(M(h), p)
            : u.addListener && u.removeListener && u.removeListener(p),
          (h = W(u)) ? (y(h, o), h.h == 0 && ((h.src = null), (u[k] = null))) : Se(o))
      }
    }
  }
  function M(o) {
    return o in U ? U[o] : (U[o] = 'on' + o)
  }
  function J(o, u) {
    if (o.da) o = !0
    else {
      u = new kn(u, this)
      var h = o.listener,
        p = o.ha || o.src
      ;(o.fa && $(o), (o = h.call(p, u)))
    }
    return o
  }
  function W(o) {
    return ((o = o[k]), o instanceof kr ? o : null)
  }
  var Y = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0)
  function tt(o) {
    return typeof o == 'function'
      ? o
      : (o[Y] ||
          (o[Y] = function (u) {
            return o.handleEvent(u)
          }),
        o[Y])
  }
  function et() {
    ;(Mt.call(this), (this.i = new kr(this)), (this.M = this), (this.F = null))
  }
  ;(L(et, Mt),
    (et.prototype[Ge] = !0),
    (et.prototype.removeEventListener = function (o, u, h, p) {
      H(this, o, u, h, p)
    }))
  function ot(o, u) {
    var h,
      p = o.F
    if (p) for (h = []; p; p = p.F) h.push(p)
    if (((o = o.M), (p = u.type || u), typeof u == 'string')) u = new Lt(u, o)
    else if (u instanceof Lt) u.target = u.target || o
    else {
      var R = u
      ;((u = new Lt(p, o)), T(u, R))
    }
    if (((R = !0), h))
      for (var V = h.length - 1; 0 <= V; V--) {
        var q = (u.g = h[V])
        R = gt(q, p, !0, u) && R
      }
    if (((q = u.g = o), (R = gt(q, p, !0, u) && R), (R = gt(q, p, !1, u) && R), h))
      for (V = 0; V < h.length; V++) ((q = u.g = h[V]), (R = gt(q, p, !1, u) && R))
  }
  ;((et.prototype.N = function () {
    if ((et.aa.N.call(this), this.i)) {
      var o = this.i,
        u
      for (u in o.g) {
        for (var h = o.g[u], p = 0; p < h.length; p++) Se(h[p])
        ;(delete o.g[u], o.h--)
      }
    }
    this.F = null
  }),
    (et.prototype.K = function (o, u, h, p) {
      return this.i.add(String(o), u, !1, h, p)
    }),
    (et.prototype.L = function (o, u, h, p) {
      return this.i.add(String(o), u, !0, h, p)
    }))
  function gt(o, u, h, p) {
    if (((u = o.i.g[String(u)]), !u)) return !0
    u = u.concat()
    for (var R = !0, V = 0; V < u.length; ++V) {
      var q = u[V]
      if (q && !q.da && q.capture == h) {
        var bt = q.listener,
          qt = q.ha || q.src
        ;(q.fa && y(o.i, q), (R = bt.call(qt, p) !== !1 && R))
      }
    }
    return R && !p.defaultPrevented
  }
  function St(o, u, h) {
    if (typeof o == 'function') h && (o = w(o, h))
    else if (o && typeof o.handleEvent == 'function') o = w(o.handleEvent, o)
    else throw Error('Invalid listener argument')
    return 2147483647 < Number(u) ? -1 : l.setTimeout(o, u || 0)
  }
  function Nt(o) {
    o.g = St(() => {
      ;((o.g = null), o.i && ((o.i = !1), Nt(o)))
    }, o.l)
    const u = o.h
    ;((o.h = null), o.m.apply(null, u))
  }
  class pe extends Mt {
    constructor(u, h) {
      ;(super(), (this.m = u), (this.l = h), (this.h = null), (this.i = !1), (this.g = null))
    }
    j(u) {
      ;((this.h = arguments), this.g ? (this.i = !0) : Nt(this))
    }
    N() {
      ;(super.N(),
        this.g && (l.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null)))
    }
  }
  function Qt(o) {
    ;(Mt.call(this), (this.h = o), (this.g = {}))
  }
  L(Qt, Mt)
  var dn = []
  function Dr(o) {
    ;(_t(
      o.g,
      function (u, h) {
        this.g.hasOwnProperty(h) && $(u)
      },
      o
    ),
      (o.g = {}))
  }
  ;((Qt.prototype.N = function () {
    ;(Qt.aa.N.call(this), Dr(this))
  }),
    (Qt.prototype.handleEvent = function () {
      throw Error('EventHandler.handleEvent not implemented')
    }))
  var $t = l.JSON.stringify,
    me = l.JSON.parse,
    Ls = class {
      stringify(o) {
        return l.JSON.stringify(o, void 0)
      }
      parse(o) {
        return l.JSON.parse(o, void 0)
      }
    }
  function Zn() {}
  Zn.prototype.h = null
  function dl(o) {
    return o.h || (o.h = o.i())
  }
  function pl() {}
  var Nr = { OPEN: 'a', kb: 'b', Ja: 'c', wb: 'd' }
  function so() {
    Lt.call(this, 'd')
  }
  L(so, Lt)
  function io() {
    Lt.call(this, 'c')
  }
  L(io, Lt)
  var Nn = {},
    ml = null
  function Fs() {
    return (ml = ml || new et())
  }
  Nn.La = 'serverreachability'
  function gl(o) {
    Lt.call(this, Nn.La, o)
  }
  L(gl, Lt)
  function Or(o) {
    const u = Fs()
    ot(u, new gl(u))
  }
  Nn.STAT_EVENT = 'statevent'
  function _l(o, u) {
    ;(Lt.call(this, Nn.STAT_EVENT, o), (this.stat = u))
  }
  L(_l, Lt)
  function se(o) {
    const u = Fs()
    ot(u, new _l(u, o))
  }
  Nn.Ma = 'timingevent'
  function yl(o, u) {
    ;(Lt.call(this, Nn.Ma, o), (this.size = u))
  }
  L(yl, Lt)
  function Mr(o, u) {
    if (typeof o != 'function') throw Error('Fn must not be null and must be a function')
    return l.setTimeout(function () {
      o()
    }, u)
  }
  function Lr() {
    this.g = !0
  }
  Lr.prototype.xa = function () {
    this.g = !1
  }
  function Vd(o, u, h, p, R, V) {
    o.info(function () {
      if (o.g)
        if (V)
          for (var q = '', bt = V.split('&'), qt = 0; qt < bt.length; qt++) {
            var dt = bt[qt].split('=')
            if (1 < dt.length) {
              var Yt = dt[0]
              dt = dt[1]
              var Xt = Yt.split('_')
              q =
                2 <= Xt.length && Xt[1] == 'type'
                  ? q + (Yt + '=' + dt + '&')
                  : q + (Yt + '=redacted&')
            }
          }
        else q = null
      else q = V
      return (
        'XMLHTTP REQ (' +
        p +
        ') [attempt ' +
        R +
        ']: ' +
        u +
        `
` +
        h +
        `
` +
        q
      )
    })
  }
  function kd(o, u, h, p, R, V, q) {
    o.info(function () {
      return (
        'XMLHTTP RESP (' +
        p +
        ') [ attempt ' +
        R +
        ']: ' +
        u +
        `
` +
        h +
        `
` +
        V +
        ' ' +
        q
      )
    })
  }
  function tr(o, u, h, p) {
    o.info(function () {
      return 'XMLHTTP TEXT (' + u + '): ' + Nd(o, h) + (p ? ' ' + p : '')
    })
  }
  function Dd(o, u) {
    o.info(function () {
      return 'TIMEOUT: ' + u
    })
  }
  Lr.prototype.info = function () {}
  function Nd(o, u) {
    if (!o.g) return u
    if (!u) return null
    try {
      var h = JSON.parse(u)
      if (h) {
        for (o = 0; o < h.length; o++)
          if (Array.isArray(h[o])) {
            var p = h[o]
            if (!(2 > p.length)) {
              var R = p[1]
              if (Array.isArray(R) && !(1 > R.length)) {
                var V = R[0]
                if (V != 'noop' && V != 'stop' && V != 'close')
                  for (var q = 1; q < R.length; q++) R[q] = ''
              }
            }
          }
      }
      return $t(h)
    } catch {
      return u
    }
  }
  var Us = { NO_ERROR: 0, gb: 1, tb: 2, sb: 3, nb: 4, rb: 5, ub: 6, Ia: 7, TIMEOUT: 8, xb: 9 },
    vl = {
      lb: 'complete',
      Hb: 'success',
      Ja: 'error',
      Ia: 'abort',
      zb: 'ready',
      Ab: 'readystatechange',
      TIMEOUT: 'timeout',
      vb: 'incrementaldata',
      yb: 'progress',
      ob: 'downloadprogress',
      Pb: 'uploadprogress'
    },
    oo
  function Bs() {}
  ;(L(Bs, Zn),
    (Bs.prototype.g = function () {
      return new XMLHttpRequest()
    }),
    (Bs.prototype.i = function () {
      return {}
    }),
    (oo = new Bs()))
  function pn(o, u, h, p) {
    ;((this.j = o),
      (this.i = u),
      (this.l = h),
      (this.R = p || 1),
      (this.U = new Qt(this)),
      (this.I = 45e3),
      (this.H = null),
      (this.o = !1),
      (this.m = this.A = this.v = this.L = this.F = this.S = this.B = null),
      (this.D = []),
      (this.g = null),
      (this.C = 0),
      (this.s = this.u = null),
      (this.X = -1),
      (this.J = !1),
      (this.O = 0),
      (this.M = null),
      (this.W = this.K = this.T = this.P = !1),
      (this.h = new El()))
  }
  function El() {
    ;((this.i = null), (this.g = ''), (this.h = !1))
  }
  var Tl = {},
    ao = {}
  function lo(o, u, h) {
    ;((o.L = 1), (o.v = Ks(Qe(u))), (o.m = h), (o.P = !0), wl(o, null))
  }
  function wl(o, u) {
    ;((o.F = Date.now()), js(o), (o.A = Qe(o.v)))
    var h = o.A,
      p = o.R
    ;(Array.isArray(p) || (p = [String(p)]),
      Ml(h.i, 't', p),
      (o.C = 0),
      (h = o.j.J),
      (o.h = new El()),
      (o.g = tu(o.j, h ? u : null, !o.m)),
      0 < o.O && (o.M = new pe(w(o.Y, o, o.g), o.O)),
      (u = o.U),
      (h = o.g),
      (p = o.ca))
    var R = 'readystatechange'
    Array.isArray(R) || (R && (dn[0] = R.toString()), (R = dn))
    for (var V = 0; V < R.length; V++) {
      var q = N(h, R[V], p || u.handleEvent, !1, u.h || u)
      if (!q) break
      u.g[q.key] = q
    }
    ;((u = o.H ? _(o.H) : {}),
      o.m
        ? (o.u || (o.u = 'POST'),
          (u['Content-Type'] = 'application/x-www-form-urlencoded'),
          o.g.ea(o.A, o.u, o.m, u))
        : ((o.u = 'GET'), o.g.ea(o.A, o.u, null, u)),
      Or(),
      Vd(o.i, o.u, o.A, o.l, o.R, o.m))
  }
  ;((pn.prototype.ca = function (o) {
    o = o.target
    const u = this.M
    u && Ye(o) == 3 ? u.j() : this.Y(o)
  }),
    (pn.prototype.Y = function (o) {
      try {
        if (o == this.g)
          t: {
            const Xt = Ye(this.g)
            var u = this.g.Ba()
            const rr = this.g.Z()
            if (!(3 > Xt) && (Xt != 3 || (this.g && (this.h.h || this.g.oa() || ql(this.g))))) {
              ;(this.J || Xt != 4 || u == 7 || (u == 8 || 0 >= rr ? Or(3) : Or(2)), uo(this))
              var h = this.g.Z()
              this.X = h
              e: if (bl(this)) {
                var p = ql(this.g)
                o = ''
                var R = p.length,
                  V = Ye(this.g) == 4
                if (!this.h.i) {
                  if (typeof TextDecoder > 'u') {
                    ;(On(this), Fr(this))
                    var q = ''
                    break e
                  }
                  this.h.i = new l.TextDecoder()
                }
                for (u = 0; u < R; u++)
                  ((this.h.h = !0), (o += this.h.i.decode(p[u], { stream: !(V && u == R - 1) })))
                ;((p.length = 0), (this.h.g += o), (this.C = 0), (q = this.h.g))
              } else q = this.g.oa()
              if (
                ((this.o = h == 200), kd(this.i, this.u, this.A, this.l, this.R, Xt, h), this.o)
              ) {
                if (this.T && !this.K) {
                  e: {
                    if (this.g) {
                      var bt,
                        qt = this.g
                      if (
                        (bt = qt.g ? qt.g.getResponseHeader('X-HTTP-Initial-Response') : null) &&
                        !g(bt)
                      ) {
                        var dt = bt
                        break e
                      }
                    }
                    dt = null
                  }
                  if ((h = dt))
                    (tr(
                      this.i,
                      this.l,
                      h,
                      'Initial handshake response via X-HTTP-Initial-Response'
                    ),
                      (this.K = !0),
                      co(this, h))
                  else {
                    ;((this.o = !1), (this.s = 3), se(12), On(this), Fr(this))
                    break t
                  }
                }
                if (this.P) {
                  h = !0
                  let be
                  for (; !this.J && this.C < q.length; )
                    if (((be = Od(this, q)), be == ao)) {
                      ;(Xt == 4 && ((this.s = 4), se(14), (h = !1)),
                        tr(this.i, this.l, null, '[Incomplete Response]'))
                      break
                    } else if (be == Tl) {
                      ;((this.s = 4), se(15), tr(this.i, this.l, q, '[Invalid Chunk]'), (h = !1))
                      break
                    } else (tr(this.i, this.l, be, null), co(this, be))
                  if (
                    (bl(this) && this.C != 0 && ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                    Xt != 4 || q.length != 0 || this.h.h || ((this.s = 1), se(16), (h = !1)),
                    (this.o = this.o && h),
                    !h)
                  )
                    (tr(this.i, this.l, q, '[Invalid Chunked Response]'), On(this), Fr(this))
                  else if (0 < q.length && !this.W) {
                    this.W = !0
                    var Yt = this.j
                    Yt.g == this &&
                      Yt.ba &&
                      !Yt.M &&
                      (Yt.j.info('Great, no buffering proxy detected. Bytes received: ' + q.length),
                      _o(Yt),
                      (Yt.M = !0),
                      se(11))
                  }
                } else (tr(this.i, this.l, q, null), co(this, q))
                ;(Xt == 4 && On(this),
                  this.o && !this.J && (Xt == 4 ? Yl(this.j, this) : ((this.o = !1), js(this))))
              } else
                (Jd(this.g),
                  h == 400 && 0 < q.indexOf('Unknown SID')
                    ? ((this.s = 3), se(12))
                    : ((this.s = 0), se(13)),
                  On(this),
                  Fr(this))
            }
          }
      } catch {
      } finally {
      }
    }))
  function bl(o) {
    return o.g ? o.u == 'GET' && o.L != 2 && o.j.Ca : !1
  }
  function Od(o, u) {
    var h = o.C,
      p = u.indexOf(
        `
`,
        h
      )
    return p == -1
      ? ao
      : ((h = Number(u.substring(h, p))),
        isNaN(h)
          ? Tl
          : ((p += 1), p + h > u.length ? ao : ((u = u.slice(p, p + h)), (o.C = p + h), u)))
  }
  pn.prototype.cancel = function () {
    ;((this.J = !0), On(this))
  }
  function js(o) {
    ;((o.S = Date.now() + o.I), Il(o, o.I))
  }
  function Il(o, u) {
    if (o.B != null) throw Error('WatchDog timer not null')
    o.B = Mr(w(o.ba, o), u)
  }
  function uo(o) {
    o.B && (l.clearTimeout(o.B), (o.B = null))
  }
  pn.prototype.ba = function () {
    this.B = null
    const o = Date.now()
    0 <= o - this.S
      ? (Dd(this.i, this.A), this.L != 2 && (Or(), se(17)), On(this), (this.s = 2), Fr(this))
      : Il(this, this.S - o)
  }
  function Fr(o) {
    o.j.G == 0 || o.J || Yl(o.j, o)
  }
  function On(o) {
    uo(o)
    var u = o.M
    ;(u && typeof u.ma == 'function' && u.ma(),
      (o.M = null),
      Dr(o.U),
      o.g && ((u = o.g), (o.g = null), u.abort(), u.ma()))
  }
  function co(o, u) {
    try {
      var h = o.j
      if (h.G != 0 && (h.g == o || ho(h.h, o))) {
        if (!o.K && ho(h.h, o) && h.G == 3) {
          try {
            var p = h.Da.g.parse(u)
          } catch {
            p = null
          }
          if (Array.isArray(p) && p.length == 3) {
            var R = p
            if (R[0] == 0) {
              t: if (!h.u) {
                if (h.g)
                  if (h.g.F + 3e3 < o.F) (Ys(h), Gs(h))
                  else break t
                ;(go(h), se(18))
              }
            } else
              ((h.za = R[1]),
                0 < h.za - h.T &&
                  37500 > R[2] &&
                  h.F &&
                  h.v == 0 &&
                  !h.C &&
                  (h.C = Mr(w(h.Za, h), 6e3)))
            if (1 >= xl(h.h) && h.ca) {
              try {
                h.ca()
              } catch {}
              h.ca = void 0
            }
          } else Ln(h, 11)
        } else if (((o.K || h.g == o) && Ys(h), !g(u)))
          for (R = h.Da.g.parse(u), u = 0; u < R.length; u++) {
            let dt = R[u]
            if (((h.T = dt[0]), (dt = dt[1]), h.G == 2))
              if (dt[0] == 'c') {
                ;((h.K = dt[1]), (h.ia = dt[2]))
                const Yt = dt[3]
                Yt != null && ((h.la = Yt), h.j.info('VER=' + h.la))
                const Xt = dt[4]
                Xt != null && ((h.Aa = Xt), h.j.info('SVER=' + h.Aa))
                const rr = dt[5]
                ;(rr != null &&
                  typeof rr == 'number' &&
                  0 < rr &&
                  ((p = 1.5 * rr), (h.L = p), h.j.info('backChannelRequestTimeoutMs_=' + p)),
                  (p = h))
                const be = o.g
                if (be) {
                  const Js = be.g ? be.g.getResponseHeader('X-Client-Wire-Protocol') : null
                  if (Js) {
                    var V = p.h
                    V.g ||
                      (Js.indexOf('spdy') == -1 &&
                        Js.indexOf('quic') == -1 &&
                        Js.indexOf('h2') == -1) ||
                      ((V.j = V.l), (V.g = new Set()), V.h && (fo(V, V.h), (V.h = null)))
                  }
                  if (p.D) {
                    const yo = be.g ? be.g.getResponseHeader('X-HTTP-Session-Id') : null
                    yo && ((p.ya = yo), Rt(p.I, p.D, yo))
                  }
                }
                ;((h.G = 3),
                  h.l && h.l.ua(),
                  h.ba && ((h.R = Date.now() - o.F), h.j.info('Handshake RTT: ' + h.R + 'ms')),
                  (p = h))
                var q = o
                if (((p.qa = Zl(p, p.J ? p.ia : null, p.W)), q.K)) {
                  Pl(p.h, q)
                  var bt = q,
                    qt = p.L
                  ;(qt && (bt.I = qt), bt.B && (uo(bt), js(bt)), (p.g = q))
                } else Gl(p)
                0 < h.i.length && Qs(h)
              } else (dt[0] != 'stop' && dt[0] != 'close') || Ln(h, 7)
            else
              h.G == 3 &&
                (dt[0] == 'stop' || dt[0] == 'close'
                  ? dt[0] == 'stop'
                    ? Ln(h, 7)
                    : mo(h)
                  : dt[0] != 'noop' && h.l && h.l.ta(dt),
                (h.v = 0))
          }
      }
      Or(4)
    } catch {}
  }
  var Md = class {
    constructor(o, u) {
      ;((this.g = o), (this.map = u))
    }
  }
  function Al(o) {
    ;((this.l = o || 10),
      l.PerformanceNavigationTiming
        ? ((o = l.performance.getEntriesByType('navigation')),
          (o = 0 < o.length && (o[0].nextHopProtocol == 'hq' || o[0].nextHopProtocol == 'h2')))
        : (o = !!(
            l.chrome &&
            l.chrome.loadTimes &&
            l.chrome.loadTimes() &&
            l.chrome.loadTimes().wasFetchedViaSpdy
          )),
      (this.j = o ? this.l : 1),
      (this.g = null),
      1 < this.j && (this.g = new Set()),
      (this.h = null),
      (this.i = []))
  }
  function Rl(o) {
    return o.h ? !0 : o.g ? o.g.size >= o.j : !1
  }
  function xl(o) {
    return o.h ? 1 : o.g ? o.g.size : 0
  }
  function ho(o, u) {
    return o.h ? o.h == u : o.g ? o.g.has(u) : !1
  }
  function fo(o, u) {
    o.g ? o.g.add(u) : (o.h = u)
  }
  function Pl(o, u) {
    o.h && o.h == u ? (o.h = null) : o.g && o.g.has(u) && o.g.delete(u)
  }
  Al.prototype.cancel = function () {
    if (((this.i = Sl(this)), this.h)) (this.h.cancel(), (this.h = null))
    else if (this.g && this.g.size !== 0) {
      for (const o of this.g.values()) o.cancel()
      this.g.clear()
    }
  }
  function Sl(o) {
    if (o.h != null) return o.i.concat(o.h.D)
    if (o.g != null && o.g.size !== 0) {
      let u = o.i
      for (const h of o.g.values()) u = u.concat(h.D)
      return u
    }
    return D(o.i)
  }
  function Ld(o) {
    if (o.V && typeof o.V == 'function') return o.V()
    if ((typeof Map < 'u' && o instanceof Map) || (typeof Set < 'u' && o instanceof Set))
      return Array.from(o.values())
    if (typeof o == 'string') return o.split('')
    if (c(o)) {
      for (var u = [], h = o.length, p = 0; p < h; p++) u.push(o[p])
      return u
    }
    ;((u = []), (h = 0))
    for (p in o) u[h++] = o[p]
    return u
  }
  function Fd(o) {
    if (o.na && typeof o.na == 'function') return o.na()
    if (!o.V || typeof o.V != 'function') {
      if (typeof Map < 'u' && o instanceof Map) return Array.from(o.keys())
      if (!(typeof Set < 'u' && o instanceof Set)) {
        if (c(o) || typeof o == 'string') {
          var u = []
          o = o.length
          for (var h = 0; h < o; h++) u.push(h)
          return u
        }
        ;((u = []), (h = 0))
        for (const p in o) u[h++] = p
        return u
      }
    }
  }
  function Cl(o, u) {
    if (o.forEach && typeof o.forEach == 'function') o.forEach(u, void 0)
    else if (c(o) || typeof o == 'string') Array.prototype.forEach.call(o, u, void 0)
    else
      for (var h = Fd(o), p = Ld(o), R = p.length, V = 0; V < R; V++)
        u.call(void 0, p[V], h && h[V], o)
  }
  var Vl = RegExp(
    '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
  )
  function Ud(o, u) {
    if (o) {
      o = o.split('&')
      for (var h = 0; h < o.length; h++) {
        var p = o[h].indexOf('='),
          R = null
        if (0 <= p) {
          var V = o[h].substring(0, p)
          R = o[h].substring(p + 1)
        } else V = o[h]
        u(V, R ? decodeURIComponent(R.replace(/\+/g, ' ')) : '')
      }
    }
  }
  function Mn(o) {
    if (
      ((this.g = this.o = this.j = ''),
      (this.s = null),
      (this.m = this.l = ''),
      (this.h = !1),
      o instanceof Mn)
    ) {
      ;((this.h = o.h),
        $s(this, o.j),
        (this.o = o.o),
        (this.g = o.g),
        qs(this, o.s),
        (this.l = o.l))
      var u = o.i,
        h = new jr()
      ;((h.i = u.i), u.g && ((h.g = new Map(u.g)), (h.h = u.h)), kl(this, h), (this.m = o.m))
    } else
      o && (u = String(o).match(Vl))
        ? ((this.h = !1),
          $s(this, u[1] || '', !0),
          (this.o = Ur(u[2] || '')),
          (this.g = Ur(u[3] || '', !0)),
          qs(this, u[4]),
          (this.l = Ur(u[5] || '', !0)),
          kl(this, u[6] || '', !0),
          (this.m = Ur(u[7] || '')))
        : ((this.h = !1), (this.i = new jr(null, this.h)))
  }
  Mn.prototype.toString = function () {
    var o = [],
      u = this.j
    u && o.push(Br(u, Dl, !0), ':')
    var h = this.g
    return (
      (h || u == 'file') &&
        (o.push('//'),
        (u = this.o) && o.push(Br(u, Dl, !0), '@'),
        o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (h = this.s),
        h != null && o.push(':', String(h))),
      (h = this.l) &&
        (this.g && h.charAt(0) != '/' && o.push('/'),
        o.push(Br(h, h.charAt(0) == '/' ? $d : jd, !0))),
      (h = this.i.toString()) && o.push('?', h),
      (h = this.m) && o.push('#', Br(h, Kd)),
      o.join('')
    )
  }
  function Qe(o) {
    return new Mn(o)
  }
  function $s(o, u, h) {
    ;((o.j = h ? Ur(u, !0) : u), o.j && (o.j = o.j.replace(/:$/, '')))
  }
  function qs(o, u) {
    if (u) {
      if (((u = Number(u)), isNaN(u) || 0 > u)) throw Error('Bad port number ' + u)
      o.s = u
    } else o.s = null
  }
  function kl(o, u, h) {
    u instanceof jr ? ((o.i = u), Hd(o.i, o.h)) : (h || (u = Br(u, qd)), (o.i = new jr(u, o.h)))
  }
  function Rt(o, u, h) {
    o.i.set(u, h)
  }
  function Ks(o) {
    return (
      Rt(
        o,
        'zx',
        Math.floor(2147483648 * Math.random()).toString(36) +
          Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)
      ),
      o
    )
  }
  function Ur(o, u) {
    return o ? (u ? decodeURI(o.replace(/%25/g, '%2525')) : decodeURIComponent(o)) : ''
  }
  function Br(o, u, h) {
    return typeof o == 'string'
      ? ((o = encodeURI(o).replace(u, Bd)), h && (o = o.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), o)
      : null
  }
  function Bd(o) {
    return ((o = o.charCodeAt(0)), '%' + ((o >> 4) & 15).toString(16) + (o & 15).toString(16))
  }
  var Dl = /[#\/\?@]/g,
    jd = /[#\?:]/g,
    $d = /[#\?]/g,
    qd = /[#\?@]/g,
    Kd = /#/g
  function jr(o, u) {
    ;((this.h = this.g = null), (this.i = o || null), (this.j = !!u))
  }
  function mn(o) {
    o.g ||
      ((o.g = new Map()),
      (o.h = 0),
      o.i &&
        Ud(o.i, function (u, h) {
          o.add(decodeURIComponent(u.replace(/\+/g, ' ')), h)
        }))
  }
  ;((e = jr.prototype),
    (e.add = function (o, u) {
      ;(mn(this), (this.i = null), (o = er(this, o)))
      var h = this.g.get(o)
      return (h || this.g.set(o, (h = [])), h.push(u), (this.h += 1), this)
    }))
  function Nl(o, u) {
    ;(mn(o),
      (u = er(o, u)),
      o.g.has(u) && ((o.i = null), (o.h -= o.g.get(u).length), o.g.delete(u)))
  }
  function Ol(o, u) {
    return (mn(o), (u = er(o, u)), o.g.has(u))
  }
  ;((e.forEach = function (o, u) {
    ;(mn(this),
      this.g.forEach(function (h, p) {
        h.forEach(function (R) {
          o.call(u, R, p, this)
        }, this)
      }, this))
  }),
    (e.na = function () {
      mn(this)
      const o = Array.from(this.g.values()),
        u = Array.from(this.g.keys()),
        h = []
      for (let p = 0; p < u.length; p++) {
        const R = o[p]
        for (let V = 0; V < R.length; V++) h.push(u[p])
      }
      return h
    }),
    (e.V = function (o) {
      mn(this)
      let u = []
      if (typeof o == 'string') Ol(this, o) && (u = u.concat(this.g.get(er(this, o))))
      else {
        o = Array.from(this.g.values())
        for (let h = 0; h < o.length; h++) u = u.concat(o[h])
      }
      return u
    }),
    (e.set = function (o, u) {
      return (
        mn(this),
        (this.i = null),
        (o = er(this, o)),
        Ol(this, o) && (this.h -= this.g.get(o).length),
        this.g.set(o, [u]),
        (this.h += 1),
        this
      )
    }),
    (e.get = function (o, u) {
      return o ? ((o = this.V(o)), 0 < o.length ? String(o[0]) : u) : u
    }))
  function Ml(o, u, h) {
    ;(Nl(o, u), 0 < h.length && ((o.i = null), o.g.set(er(o, u), D(h)), (o.h += h.length)))
  }
  e.toString = function () {
    if (this.i) return this.i
    if (!this.g) return ''
    const o = [],
      u = Array.from(this.g.keys())
    for (var h = 0; h < u.length; h++) {
      var p = u[h]
      const V = encodeURIComponent(String(p)),
        q = this.V(p)
      for (p = 0; p < q.length; p++) {
        var R = V
        ;(q[p] !== '' && (R += '=' + encodeURIComponent(String(q[p]))), o.push(R))
      }
    }
    return (this.i = o.join('&'))
  }
  function er(o, u) {
    return ((u = String(u)), o.j && (u = u.toLowerCase()), u)
  }
  function Hd(o, u) {
    ;(u &&
      !o.j &&
      (mn(o),
      (o.i = null),
      o.g.forEach(function (h, p) {
        var R = p.toLowerCase()
        p != R && (Nl(this, p), Ml(this, R, h))
      }, o)),
      (o.j = u))
  }
  function zd(o, u) {
    const h = new Lr()
    if (l.Image) {
      const p = new Image()
      ;((p.onload = P(gn, h, 'TestLoadImage: loaded', !0, u, p)),
        (p.onerror = P(gn, h, 'TestLoadImage: error', !1, u, p)),
        (p.onabort = P(gn, h, 'TestLoadImage: abort', !1, u, p)),
        (p.ontimeout = P(gn, h, 'TestLoadImage: timeout', !1, u, p)),
        l.setTimeout(function () {
          p.ontimeout && p.ontimeout()
        }, 1e4),
        (p.src = o))
    } else u(!1)
  }
  function Wd(o, u) {
    const h = new Lr(),
      p = new AbortController(),
      R = setTimeout(() => {
        ;(p.abort(), gn(h, 'TestPingServer: timeout', !1, u))
      }, 1e4)
    fetch(o, { signal: p.signal })
      .then((V) => {
        ;(clearTimeout(R),
          V.ok ? gn(h, 'TestPingServer: ok', !0, u) : gn(h, 'TestPingServer: server error', !1, u))
      })
      .catch(() => {
        ;(clearTimeout(R), gn(h, 'TestPingServer: error', !1, u))
      })
  }
  function gn(o, u, h, p, R) {
    try {
      ;(R && ((R.onload = null), (R.onerror = null), (R.onabort = null), (R.ontimeout = null)),
        p(h))
    } catch {}
  }
  function Gd() {
    this.g = new Ls()
  }
  function Qd(o, u, h) {
    const p = h || ''
    try {
      Cl(o, function (R, V) {
        let q = R
        ;(f(R) && (q = $t(R)), u.push(p + V + '=' + encodeURIComponent(q)))
      })
    } catch (R) {
      throw (u.push(p + 'type=' + encodeURIComponent('_badmap')), R)
    }
  }
  function Hs(o) {
    ;((this.l = o.Ub || null), (this.j = o.eb || !1))
  }
  ;(L(Hs, Zn),
    (Hs.prototype.g = function () {
      return new zs(this.l, this.j)
    }),
    (Hs.prototype.i = (function (o) {
      return function () {
        return o
      }
    })({})))
  function zs(o, u) {
    ;(et.call(this),
      (this.D = o),
      (this.o = u),
      (this.m = void 0),
      (this.status = this.readyState = 0),
      (this.responseType = this.responseText = this.response = this.statusText = ''),
      (this.onreadystatechange = null),
      (this.u = new Headers()),
      (this.h = null),
      (this.B = 'GET'),
      (this.A = ''),
      (this.g = !1),
      (this.v = this.j = this.l = null))
  }
  ;(L(zs, et),
    (e = zs.prototype),
    (e.open = function (o, u) {
      if (this.readyState != 0) throw (this.abort(), Error('Error reopening a connection'))
      ;((this.B = o), (this.A = u), (this.readyState = 1), qr(this))
    }),
    (e.send = function (o) {
      if (this.readyState != 1) throw (this.abort(), Error('need to call open() first. '))
      this.g = !0
      const u = { headers: this.u, method: this.B, credentials: this.m, cache: void 0 }
      ;(o && (u.body = o),
        (this.D || l).fetch(new Request(this.A, u)).then(this.Sa.bind(this), this.ga.bind(this)))
    }),
    (e.abort = function () {
      ;((this.response = this.responseText = ''),
        (this.u = new Headers()),
        (this.status = 0),
        this.j && this.j.cancel('Request was aborted.').catch(() => {}),
        1 <= this.readyState && this.g && this.readyState != 4 && ((this.g = !1), $r(this)),
        (this.readyState = 0))
    }),
    (e.Sa = function (o) {
      if (
        this.g &&
        ((this.l = o),
        this.h ||
          ((this.status = this.l.status),
          (this.statusText = this.l.statusText),
          (this.h = o.headers),
          (this.readyState = 2),
          qr(this)),
        this.g && ((this.readyState = 3), qr(this), this.g))
      )
        if (this.responseType === 'arraybuffer')
          o.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this))
        else if (typeof l.ReadableStream < 'u' && 'body' in o) {
          if (((this.j = o.body.getReader()), this.o)) {
            if (this.responseType)
              throw Error('responseType must be empty for "streamBinaryChunks" mode responses.')
            this.response = []
          } else ((this.response = this.responseText = ''), (this.v = new TextDecoder()))
          Ll(this)
        } else o.text().then(this.Ra.bind(this), this.ga.bind(this))
    }))
  function Ll(o) {
    o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))
  }
  ;((e.Pa = function (o) {
    if (this.g) {
      if (this.o && o.value) this.response.push(o.value)
      else if (!this.o) {
        var u = o.value ? o.value : new Uint8Array(0)
        ;(u = this.v.decode(u, { stream: !o.done })) && (this.response = this.responseText += u)
      }
      ;(o.done ? $r(this) : qr(this), this.readyState == 3 && Ll(this))
    }
  }),
    (e.Ra = function (o) {
      this.g && ((this.response = this.responseText = o), $r(this))
    }),
    (e.Qa = function (o) {
      this.g && ((this.response = o), $r(this))
    }),
    (e.ga = function () {
      this.g && $r(this)
    }))
  function $r(o) {
    ;((o.readyState = 4), (o.l = null), (o.j = null), (o.v = null), qr(o))
  }
  ;((e.setRequestHeader = function (o, u) {
    this.u.append(o, u)
  }),
    (e.getResponseHeader = function (o) {
      return (this.h && this.h.get(o.toLowerCase())) || ''
    }),
    (e.getAllResponseHeaders = function () {
      if (!this.h) return ''
      const o = [],
        u = this.h.entries()
      for (var h = u.next(); !h.done; ) ((h = h.value), o.push(h[0] + ': ' + h[1]), (h = u.next()))
      return o.join(`\r
`)
    }))
  function qr(o) {
    o.onreadystatechange && o.onreadystatechange.call(o)
  }
  Object.defineProperty(zs.prototype, 'withCredentials', {
    get: function () {
      return this.m === 'include'
    },
    set: function (o) {
      this.m = o ? 'include' : 'same-origin'
    }
  })
  function Fl(o) {
    let u = ''
    return (
      _t(o, function (h, p) {
        ;((u += p),
          (u += ':'),
          (u += h),
          (u += `\r
`))
      }),
      u
    )
  }
  function po(o, u, h) {
    t: {
      for (p in h) {
        var p = !1
        break t
      }
      p = !0
    }
    p ||
      ((h = Fl(h)), typeof o == 'string' ? h != null && encodeURIComponent(String(h)) : Rt(o, u, h))
  }
  function Vt(o) {
    ;(et.call(this),
      (this.headers = new Map()),
      (this.o = o || null),
      (this.h = !1),
      (this.v = this.g = null),
      (this.D = ''),
      (this.m = 0),
      (this.l = ''),
      (this.j = this.B = this.u = this.A = !1),
      (this.I = null),
      (this.H = ''),
      (this.J = !1))
  }
  L(Vt, et)
  var Yd = /^https?$/i,
    Xd = ['POST', 'PUT']
  ;((e = Vt.prototype),
    (e.Ha = function (o) {
      this.J = o
    }),
    (e.ea = function (o, u, h, p) {
      if (this.g)
        throw Error(
          '[goog.net.XhrIo] Object is active with another request=' + this.D + '; newUri=' + o
        )
      ;((u = u ? u.toUpperCase() : 'GET'),
        (this.D = o),
        (this.l = ''),
        (this.m = 0),
        (this.A = !1),
        (this.h = !0),
        (this.g = this.o ? this.o.g() : oo.g()),
        (this.v = this.o ? dl(this.o) : dl(oo)),
        (this.g.onreadystatechange = w(this.Ea, this)))
      try {
        ;((this.B = !0), this.g.open(u, String(o), !0), (this.B = !1))
      } catch (V) {
        Ul(this, V)
        return
      }
      if (((o = h || ''), (h = new Map(this.headers)), p))
        if (Object.getPrototypeOf(p) === Object.prototype) for (var R in p) h.set(R, p[R])
        else if (typeof p.keys == 'function' && typeof p.get == 'function')
          for (const V of p.keys()) h.set(V, p.get(V))
        else throw Error('Unknown input type for opt_headers: ' + String(p))
      ;((p = Array.from(h.keys()).find((V) => V.toLowerCase() == 'content-type')),
        (R = l.FormData && o instanceof l.FormData),
        !(0 <= Array.prototype.indexOf.call(Xd, u, void 0)) ||
          p ||
          R ||
          h.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'))
      for (const [V, q] of h) this.g.setRequestHeader(V, q)
      ;(this.H && (this.g.responseType = this.H),
        'withCredentials' in this.g &&
          this.g.withCredentials !== this.J &&
          (this.g.withCredentials = this.J))
      try {
        ;($l(this), (this.u = !0), this.g.send(o), (this.u = !1))
      } catch (V) {
        Ul(this, V)
      }
    }))
  function Ul(o, u) {
    ;((o.h = !1), o.g && ((o.j = !0), o.g.abort(), (o.j = !1)), (o.l = u), (o.m = 5), Bl(o), Ws(o))
  }
  function Bl(o) {
    o.A || ((o.A = !0), ot(o, 'complete'), ot(o, 'error'))
  }
  ;((e.abort = function (o) {
    this.g &&
      this.h &&
      ((this.h = !1),
      (this.j = !0),
      this.g.abort(),
      (this.j = !1),
      (this.m = o || 7),
      ot(this, 'complete'),
      ot(this, 'abort'),
      Ws(this))
  }),
    (e.N = function () {
      ;(this.g &&
        (this.h && ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)), Ws(this, !0)),
        Vt.aa.N.call(this))
    }),
    (e.Ea = function () {
      this.s || (this.B || this.u || this.j ? jl(this) : this.bb())
    }),
    (e.bb = function () {
      jl(this)
    }))
  function jl(o) {
    if (o.h && typeof a < 'u' && (!o.v[1] || Ye(o) != 4 || o.Z() != 2)) {
      if (o.u && Ye(o) == 4) St(o.Ea, 0, o)
      else if ((ot(o, 'readystatechange'), Ye(o) == 4)) {
        o.h = !1
        try {
          const q = o.Z()
          t: switch (q) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var u = !0
              break t
            default:
              u = !1
          }
          var h
          if (!(h = u)) {
            var p
            if ((p = q === 0)) {
              var R = String(o.D).match(Vl)[1] || null
              ;(!R && l.self && l.self.location && (R = l.self.location.protocol.slice(0, -1)),
                (p = !Yd.test(R ? R.toLowerCase() : '')))
            }
            h = p
          }
          if (h) (ot(o, 'complete'), ot(o, 'success'))
          else {
            o.m = 6
            try {
              var V = 2 < Ye(o) ? o.g.statusText : ''
            } catch {
              V = ''
            }
            ;((o.l = V + ' [' + o.Z() + ']'), Bl(o))
          }
        } finally {
          Ws(o)
        }
      }
    }
  }
  function Ws(o, u) {
    if (o.g) {
      $l(o)
      const h = o.g,
        p = o.v[0] ? () => {} : null
      ;((o.g = null), (o.v = null), u || ot(o, 'ready'))
      try {
        h.onreadystatechange = p
      } catch {}
    }
  }
  function $l(o) {
    o.I && (l.clearTimeout(o.I), (o.I = null))
  }
  e.isActive = function () {
    return !!this.g
  }
  function Ye(o) {
    return o.g ? o.g.readyState : 0
  }
  ;((e.Z = function () {
    try {
      return 2 < Ye(this) ? this.g.status : -1
    } catch {
      return -1
    }
  }),
    (e.oa = function () {
      try {
        return this.g ? this.g.responseText : ''
      } catch {
        return ''
      }
    }),
    (e.Oa = function (o) {
      if (this.g) {
        var u = this.g.responseText
        return (o && u.indexOf(o) == 0 && (u = u.substring(o.length)), me(u))
      }
    }))
  function ql(o) {
    try {
      if (!o.g) return null
      if ('response' in o.g) return o.g.response
      switch (o.H) {
        case '':
        case 'text':
          return o.g.responseText
        case 'arraybuffer':
          if ('mozResponseArrayBuffer' in o.g) return o.g.mozResponseArrayBuffer
      }
      return null
    } catch {
      return null
    }
  }
  function Jd(o) {
    const u = {}
    o = ((o.g && 2 <= Ye(o) && o.g.getAllResponseHeaders()) || '').split(`\r
`)
    for (let p = 0; p < o.length; p++) {
      if (g(o[p])) continue
      var h = A(o[p])
      const R = h[0]
      if (((h = h[1]), typeof h != 'string')) continue
      h = h.trim()
      const V = u[R] || []
      ;((u[R] = V), V.push(h))
    }
    I(u, function (p) {
      return p.join(', ')
    })
  }
  ;((e.Ba = function () {
    return this.m
  }),
    (e.Ka = function () {
      return typeof this.l == 'string' ? this.l : String(this.l)
    }))
  function Kr(o, u, h) {
    return (h && h.internalChannelParams && h.internalChannelParams[o]) || u
  }
  function Kl(o) {
    ;((this.Aa = 0),
      (this.i = []),
      (this.j = new Lr()),
      (this.ia =
        this.qa =
        this.I =
        this.W =
        this.g =
        this.ya =
        this.D =
        this.H =
        this.m =
        this.S =
        this.o =
          null),
      (this.Ya = this.U = 0),
      (this.Va = Kr('failFast', !1, o)),
      (this.F = this.C = this.u = this.s = this.l = null),
      (this.X = !0),
      (this.za = this.T = -1),
      (this.Y = this.v = this.B = 0),
      (this.Ta = Kr('baseRetryDelayMs', 5e3, o)),
      (this.cb = Kr('retryDelaySeedMs', 1e4, o)),
      (this.Wa = Kr('forwardChannelMaxRetries', 2, o)),
      (this.wa = Kr('forwardChannelRequestTimeoutMs', 2e4, o)),
      (this.pa = (o && o.xmlHttpFactory) || void 0),
      (this.Xa = (o && o.Tb) || void 0),
      (this.Ca = (o && o.useFetchStreams) || !1),
      (this.L = void 0),
      (this.J = (o && o.supportsCrossDomainXhr) || !1),
      (this.K = ''),
      (this.h = new Al(o && o.concurrentRequestLimit)),
      (this.Da = new Gd()),
      (this.P = (o && o.fastHandshake) || !1),
      (this.O = (o && o.encodeInitMessageHeaders) || !1),
      this.P && this.O && (this.O = !1),
      (this.Ua = (o && o.Rb) || !1),
      o && o.xa && this.j.xa(),
      o && o.forceLongPolling && (this.X = !1),
      (this.ba = (!this.P && this.X && o && o.detectBufferingProxy) || !1),
      (this.ja = void 0),
      o && o.longPollingTimeout && 0 < o.longPollingTimeout && (this.ja = o.longPollingTimeout),
      (this.ca = void 0),
      (this.R = 0),
      (this.M = !1),
      (this.ka = this.A = null))
  }
  ;((e = Kl.prototype),
    (e.la = 8),
    (e.G = 1),
    (e.connect = function (o, u, h, p) {
      ;(se(0),
        (this.W = o),
        (this.H = u || {}),
        h && p !== void 0 && ((this.H.OSID = h), (this.H.OAID = p)),
        (this.F = this.X),
        (this.I = Zl(this, null, this.W)),
        Qs(this))
    }))
  function mo(o) {
    if ((Hl(o), o.G == 3)) {
      var u = o.U++,
        h = Qe(o.I)
      if (
        (Rt(h, 'SID', o.K),
        Rt(h, 'RID', u),
        Rt(h, 'TYPE', 'terminate'),
        Hr(o, h),
        (u = new pn(o, o.j, u)),
        (u.L = 2),
        (u.v = Ks(Qe(h))),
        (h = !1),
        l.navigator && l.navigator.sendBeacon)
      )
        try {
          h = l.navigator.sendBeacon(u.v.toString(), '')
        } catch {}
      ;(!h && l.Image && ((new Image().src = u.v), (h = !0)),
        h || ((u.g = tu(u.j, null)), u.g.ea(u.v)),
        (u.F = Date.now()),
        js(u))
    }
    Jl(o)
  }
  function Gs(o) {
    o.g && (_o(o), o.g.cancel(), (o.g = null))
  }
  function Hl(o) {
    ;(Gs(o),
      o.u && (l.clearTimeout(o.u), (o.u = null)),
      Ys(o),
      o.h.cancel(),
      o.s && (typeof o.s == 'number' && l.clearTimeout(o.s), (o.s = null)))
  }
  function Qs(o) {
    if (!Rl(o.h) && !o.s) {
      o.s = !0
      var u = o.Ga
      ;(Et || Vn(), ft || (Et(), (ft = !0)), we.add(u, o), (o.B = 0))
    }
  }
  function Zd(o, u) {
    return xl(o.h) >= o.h.j - (o.s ? 1 : 0)
      ? !1
      : o.s
        ? ((o.i = u.D.concat(o.i)), !0)
        : o.G == 1 || o.G == 2 || o.B >= (o.Va ? 0 : o.Wa)
          ? !1
          : ((o.s = Mr(w(o.Ga, o, u), Xl(o, o.B))), o.B++, !0)
  }
  e.Ga = function (o) {
    if (this.s)
      if (((this.s = null), this.G == 1)) {
        if (!o) {
          ;((this.U = Math.floor(1e5 * Math.random())), (o = this.U++))
          const R = new pn(this, this.j, o)
          let V = this.o
          if (
            (this.S && (V ? ((V = _(V)), T(V, this.S)) : (V = this.S)),
            this.m !== null || this.O || ((R.H = V), (V = null)),
            this.P)
          )
            t: {
              for (var u = 0, h = 0; h < this.i.length; h++) {
                e: {
                  var p = this.i[h]
                  if ('__data__' in p.map && ((p = p.map.__data__), typeof p == 'string')) {
                    p = p.length
                    break e
                  }
                  p = void 0
                }
                if (p === void 0) break
                if (((u += p), 4096 < u)) {
                  u = h
                  break t
                }
                if (u === 4096 || h === this.i.length - 1) {
                  u = h + 1
                  break t
                }
              }
              u = 1e3
            }
          else u = 1e3
          ;((u = Wl(this, R, u)),
            (h = Qe(this.I)),
            Rt(h, 'RID', o),
            Rt(h, 'CVER', 22),
            this.D && Rt(h, 'X-HTTP-Session-Id', this.D),
            Hr(this, h),
            V &&
              (this.O
                ? (u = 'headers=' + encodeURIComponent(String(Fl(V))) + '&' + u)
                : this.m && po(h, this.m, V)),
            fo(this.h, R),
            this.Ua && Rt(h, 'TYPE', 'init'),
            this.P
              ? (Rt(h, '$req', u), Rt(h, 'SID', 'null'), (R.T = !0), lo(R, h, null))
              : lo(R, h, u),
            (this.G = 2))
        }
      } else this.G == 3 && (o ? zl(this, o) : this.i.length == 0 || Rl(this.h) || zl(this))
  }
  function zl(o, u) {
    var h
    u ? (h = u.l) : (h = o.U++)
    const p = Qe(o.I)
    ;(Rt(p, 'SID', o.K),
      Rt(p, 'RID', h),
      Rt(p, 'AID', o.T),
      Hr(o, p),
      o.m && o.o && po(p, o.m, o.o),
      (h = new pn(o, o.j, h, o.B + 1)),
      o.m === null && (h.H = o.o),
      u && (o.i = u.D.concat(o.i)),
      (u = Wl(o, h, 1e3)),
      (h.I = Math.round(0.5 * o.wa) + Math.round(0.5 * o.wa * Math.random())),
      fo(o.h, h),
      lo(h, p, u))
  }
  function Hr(o, u) {
    ;(o.H &&
      _t(o.H, function (h, p) {
        Rt(u, p, h)
      }),
      o.l &&
        Cl({}, function (h, p) {
          Rt(u, p, h)
        }))
  }
  function Wl(o, u, h) {
    h = Math.min(o.i.length, h)
    var p = o.l ? w(o.l.Na, o.l, o) : null
    t: {
      var R = o.i
      let V = -1
      for (;;) {
        const q = ['count=' + h]
        V == -1 ? (0 < h ? ((V = R[0].g), q.push('ofs=' + V)) : (V = 0)) : q.push('ofs=' + V)
        let bt = !0
        for (let qt = 0; qt < h; qt++) {
          let dt = R[qt].g
          const Yt = R[qt].map
          if (((dt -= V), 0 > dt)) ((V = Math.max(0, R[qt].g - 100)), (bt = !1))
          else
            try {
              Qd(Yt, q, 'req' + dt + '_')
            } catch {
              p && p(Yt)
            }
        }
        if (bt) {
          p = q.join('&')
          break t
        }
      }
    }
    return ((o = o.i.splice(0, h)), (u.D = o), p)
  }
  function Gl(o) {
    if (!o.g && !o.u) {
      o.Y = 1
      var u = o.Fa
      ;(Et || Vn(), ft || (Et(), (ft = !0)), we.add(u, o), (o.v = 0))
    }
  }
  function go(o) {
    return o.g || o.u || 3 <= o.v ? !1 : (o.Y++, (o.u = Mr(w(o.Fa, o), Xl(o, o.v))), o.v++, !0)
  }
  ;((e.Fa = function () {
    if (((this.u = null), Ql(this), this.ba && !(this.M || this.g == null || 0 >= this.R))) {
      var o = 2 * this.R
      ;(this.j.info('BP detection timer enabled: ' + o), (this.A = Mr(w(this.ab, this), o)))
    }
  }),
    (e.ab = function () {
      this.A &&
        ((this.A = null),
        this.j.info('BP detection timeout reached.'),
        this.j.info('Buffering proxy detected and switch to long-polling!'),
        (this.F = !1),
        (this.M = !0),
        se(10),
        Gs(this),
        Ql(this))
    }))
  function _o(o) {
    o.A != null && (l.clearTimeout(o.A), (o.A = null))
  }
  function Ql(o) {
    ;((o.g = new pn(o, o.j, 'rpc', o.Y)), o.m === null && (o.g.H = o.o), (o.g.O = 0))
    var u = Qe(o.qa)
    ;(Rt(u, 'RID', 'rpc'),
      Rt(u, 'SID', o.K),
      Rt(u, 'AID', o.T),
      Rt(u, 'CI', o.F ? '0' : '1'),
      !o.F && o.ja && Rt(u, 'TO', o.ja),
      Rt(u, 'TYPE', 'xmlhttp'),
      Hr(o, u),
      o.m && o.o && po(u, o.m, o.o),
      o.L && (o.g.I = o.L))
    var h = o.g
    ;((o = o.ia), (h.L = 1), (h.v = Ks(Qe(u))), (h.m = null), (h.P = !0), wl(h, o))
  }
  e.Za = function () {
    this.C != null && ((this.C = null), Gs(this), go(this), se(19))
  }
  function Ys(o) {
    o.C != null && (l.clearTimeout(o.C), (o.C = null))
  }
  function Yl(o, u) {
    var h = null
    if (o.g == u) {
      ;(Ys(o), _o(o), (o.g = null))
      var p = 2
    } else if (ho(o.h, u)) ((h = u.D), Pl(o.h, u), (p = 1))
    else return
    if (o.G != 0) {
      if (u.o)
        if (p == 1) {
          ;((h = u.m ? u.m.length : 0), (u = Date.now() - u.F))
          var R = o.B
          ;((p = Fs()), ot(p, new yl(p, h)), Qs(o))
        } else Gl(o)
      else if (
        ((R = u.s), R == 3 || (R == 0 && 0 < u.X) || !((p == 1 && Zd(o, u)) || (p == 2 && go(o))))
      )
        switch ((h && 0 < h.length && ((u = o.h), (u.i = u.i.concat(h))), R)) {
          case 1:
            Ln(o, 5)
            break
          case 4:
            Ln(o, 10)
            break
          case 3:
            Ln(o, 6)
            break
          default:
            Ln(o, 2)
        }
    }
  }
  function Xl(o, u) {
    let h = o.Ta + Math.floor(Math.random() * o.cb)
    return (o.isActive() || (h *= 2), h * u)
  }
  function Ln(o, u) {
    if ((o.j.info('Error code ' + u), u == 2)) {
      var h = w(o.fb, o),
        p = o.Xa
      const R = !p
      ;((p = new Mn(p || '//www.google.com/images/cleardot.gif')),
        (l.location && l.location.protocol == 'http') || $s(p, 'https'),
        Ks(p),
        R ? zd(p.toString(), h) : Wd(p.toString(), h))
    } else se(2)
    ;((o.G = 0), o.l && o.l.sa(u), Jl(o), Hl(o))
  }
  e.fb = function (o) {
    o
      ? (this.j.info('Successfully pinged google.com'), se(2))
      : (this.j.info('Failed to ping google.com'), se(1))
  }
  function Jl(o) {
    if (((o.G = 0), (o.ka = []), o.l)) {
      const u = Sl(o.h)
      ;((u.length != 0 || o.i.length != 0) &&
        (O(o.ka, u), O(o.ka, o.i), (o.h.i.length = 0), D(o.i), (o.i.length = 0)),
        o.l.ra())
    }
  }
  function Zl(o, u, h) {
    var p = h instanceof Mn ? Qe(h) : new Mn(h)
    if (p.g != '') (u && (p.g = u + '.' + p.g), qs(p, p.s))
    else {
      var R = l.location
      ;((p = R.protocol), (u = u ? u + '.' + R.hostname : R.hostname), (R = +R.port))
      var V = new Mn(null)
      ;(p && $s(V, p), u && (V.g = u), R && qs(V, R), h && (V.l = h), (p = V))
    }
    return ((h = o.D), (u = o.ya), h && u && Rt(p, h, u), Rt(p, 'VER', o.la), Hr(o, p), p)
  }
  function tu(o, u, h) {
    if (u && !o.J) throw Error("Can't create secondary domain capable XhrIo object.")
    return ((u = o.Ca && !o.pa ? new Vt(new Hs({ eb: h })) : new Vt(o.pa)), u.Ha(o.J), u)
  }
  e.isActive = function () {
    return !!this.l && this.l.isActive(this)
  }
  function eu() {}
  ;((e = eu.prototype),
    (e.ua = function () {}),
    (e.ta = function () {}),
    (e.sa = function () {}),
    (e.ra = function () {}),
    (e.isActive = function () {
      return !0
    }),
    (e.Na = function () {}))
  function Xs() {}
  Xs.prototype.g = function (o, u) {
    return new fe(o, u)
  }
  function fe(o, u) {
    ;(et.call(this),
      (this.g = new Kl(u)),
      (this.l = o),
      (this.h = (u && u.messageUrlParams) || null),
      (o = (u && u.messageHeaders) || null),
      u &&
        u.clientProtocolHeaderRequired &&
        (o ? (o['X-Client-Protocol'] = 'webchannel') : (o = { 'X-Client-Protocol': 'webchannel' })),
      (this.g.o = o),
      (o = (u && u.initMessageHeaders) || null),
      u &&
        u.messageContentType &&
        (o
          ? (o['X-WebChannel-Content-Type'] = u.messageContentType)
          : (o = { 'X-WebChannel-Content-Type': u.messageContentType })),
      u &&
        u.va &&
        (o
          ? (o['X-WebChannel-Client-Profile'] = u.va)
          : (o = { 'X-WebChannel-Client-Profile': u.va })),
      (this.g.S = o),
      (o = u && u.Sb) && !g(o) && (this.g.m = o),
      (this.v = (u && u.supportsCrossDomainXhr) || !1),
      (this.u = (u && u.sendRawJson) || !1),
      (u = u && u.httpSessionIdParam) &&
        !g(u) &&
        ((this.g.D = u),
        (o = this.h),
        o !== null && u in o && ((o = this.h), u in o && delete o[u])),
      (this.j = new nr(this)))
  }
  ;(L(fe, et),
    (fe.prototype.m = function () {
      ;((this.g.l = this.j), this.v && (this.g.J = !0), this.g.connect(this.l, this.h || void 0))
    }),
    (fe.prototype.close = function () {
      mo(this.g)
    }),
    (fe.prototype.o = function (o) {
      var u = this.g
      if (typeof o == 'string') {
        var h = {}
        ;((h.__data__ = o), (o = h))
      } else this.u && ((h = {}), (h.__data__ = $t(o)), (o = h))
      ;(u.i.push(new Md(u.Ya++, o)), u.G == 3 && Qs(u))
    }),
    (fe.prototype.N = function () {
      ;((this.g.l = null), delete this.j, mo(this.g), delete this.g, fe.aa.N.call(this))
    }))
  function nu(o) {
    ;(so.call(this),
      o.__headers__ &&
        ((this.headers = o.__headers__),
        (this.statusCode = o.__status__),
        delete o.__headers__,
        delete o.__status__))
    var u = o.__sm__
    if (u) {
      t: {
        for (const h in u) {
          o = h
          break t
        }
        o = void 0
      }
      ;((this.i = o) && ((o = this.i), (u = u !== null && o in u ? u[o] : void 0)), (this.data = u))
    } else this.data = o
  }
  L(nu, so)
  function ru() {
    ;(io.call(this), (this.status = 1))
  }
  L(ru, io)
  function nr(o) {
    this.g = o
  }
  ;(L(nr, eu),
    (nr.prototype.ua = function () {
      ot(this.g, 'a')
    }),
    (nr.prototype.ta = function (o) {
      ot(this.g, new nu(o))
    }),
    (nr.prototype.sa = function (o) {
      ot(this.g, new ru())
    }),
    (nr.prototype.ra = function () {
      ot(this.g, 'b')
    }),
    (Xs.prototype.createWebChannel = Xs.prototype.g),
    (fe.prototype.send = fe.prototype.o),
    (fe.prototype.open = fe.prototype.m),
    (fe.prototype.close = fe.prototype.close),
    (pf = function () {
      return new Xs()
    }),
    (df = function () {
      return Fs()
    }),
    (ff = Nn),
    (ea = {
      mb: 0,
      pb: 1,
      qb: 2,
      Jb: 3,
      Ob: 4,
      Lb: 5,
      Mb: 6,
      Kb: 7,
      Ib: 8,
      Nb: 9,
      PROXY: 10,
      NOPROXY: 11,
      Gb: 12,
      Cb: 13,
      Db: 14,
      Bb: 15,
      Eb: 16,
      Fb: 17,
      ib: 18,
      hb: 19,
      jb: 20
    }),
    (Us.NO_ERROR = 0),
    (Us.TIMEOUT = 8),
    (Us.HTTP_ERROR = 6),
    (hi = Us),
    (vl.COMPLETE = 'complete'),
    (hf = vl),
    (pl.EventType = Nr),
    (Nr.OPEN = 'a'),
    (Nr.CLOSE = 'b'),
    (Nr.ERROR = 'c'),
    (Nr.MESSAGE = 'd'),
    (et.prototype.listen = et.prototype.K),
    (Zr = pl),
    (Vt.prototype.listenOnce = Vt.prototype.L),
    (Vt.prototype.getLastError = Vt.prototype.Ka),
    (Vt.prototype.getLastErrorCode = Vt.prototype.Ba),
    (Vt.prototype.getStatus = Vt.prototype.Z),
    (Vt.prototype.getResponseJson = Vt.prototype.Oa),
    (Vt.prototype.getResponseText = Vt.prototype.oa),
    (Vt.prototype.send = Vt.prototype.ea),
    (Vt.prototype.setWithCredentials = Vt.prototype.Ha),
    (cf = Vt))
}).apply(typeof ni < 'u' ? ni : typeof self < 'u' ? self : typeof window < 'u' ? window : {})
const Yu = '@firebase/firestore'
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zt {
  constructor(t) {
    this.uid = t
  }
  isAuthenticated() {
    return this.uid != null
  }
  toKey() {
    return this.isAuthenticated() ? 'uid:' + this.uid : 'anonymous-user'
  }
  isEqual(t) {
    return t.uid === this.uid
  }
}
;((Zt.UNAUTHENTICATED = new Zt(null)),
  (Zt.GOOGLE_CREDENTIALS = new Zt('google-credentials-uid')),
  (Zt.FIRST_PARTY = new Zt('first-party-uid')),
  (Zt.MOCK_USER = new Zt('mock-user')))
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let xr = '10.14.0'
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zn = new Zh('@firebase/firestore')
function Yr() {
  return zn.logLevel
}
function Q(e, ...t) {
  if (zn.logLevel <= ht.DEBUG) {
    const n = t.map(Oa)
    zn.debug(`Firestore (${xr}): ${e}`, ...n)
  }
}
function un(e, ...t) {
  if (zn.logLevel <= ht.ERROR) {
    const n = t.map(Oa)
    zn.error(`Firestore (${xr}): ${e}`, ...n)
  }
}
function vr(e, ...t) {
  if (zn.logLevel <= ht.WARN) {
    const n = t.map(Oa)
    zn.warn(`Firestore (${xr}): ${e}`, ...n)
  }
}
function Oa(e) {
  if (typeof e == 'string') return e
  try {
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ return (function (n) {
      return JSON.stringify(n)
    })(e)
  } catch {
    return e
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function rt(e = 'Unexpected state') {
  const t = `FIRESTORE (${xr}) INTERNAL ASSERTION FAILED: ` + e
  throw (un(t), new Error(t))
}
function Tt(e, t) {
  e || rt()
}
function it(e, t) {
  return e
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const j = {
  OK: 'ok',
  CANCELLED: 'cancelled',
  UNKNOWN: 'unknown',
  INVALID_ARGUMENT: 'invalid-argument',
  DEADLINE_EXCEEDED: 'deadline-exceeded',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  PERMISSION_DENIED: 'permission-denied',
  UNAUTHENTICATED: 'unauthenticated',
  RESOURCE_EXHAUSTED: 'resource-exhausted',
  FAILED_PRECONDITION: 'failed-precondition',
  ABORTED: 'aborted',
  OUT_OF_RANGE: 'out-of-range',
  UNIMPLEMENTED: 'unimplemented',
  INTERNAL: 'internal',
  UNAVAILABLE: 'unavailable',
  DATA_LOSS: 'data-loss'
}
class X extends Yn {
  constructor(t, n) {
    ;(super(t, n),
      (this.code = t),
      (this.message = n),
      (this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bn {
  constructor() {
    this.promise = new Promise((t, n) => {
      ;((this.resolve = t), (this.reject = n))
    })
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mf {
  constructor(t, n) {
    ;((this.user = n),
      (this.type = 'OAuth'),
      (this.headers = new Map()),
      this.headers.set('Authorization', `Bearer ${t}`))
  }
}
class ry {
  getToken() {
    return Promise.resolve(null)
  }
  invalidateToken() {}
  start(t, n) {
    t.enqueueRetryable(() => n(Zt.UNAUTHENTICATED))
  }
  shutdown() {}
}
class sy {
  constructor(t) {
    ;((this.token = t), (this.changeListener = null))
  }
  getToken() {
    return Promise.resolve(this.token)
  }
  invalidateToken() {}
  start(t, n) {
    ;((this.changeListener = n), t.enqueueRetryable(() => n(this.token.user)))
  }
  shutdown() {
    this.changeListener = null
  }
}
class iy {
  constructor(t) {
    ;((this.t = t),
      (this.currentUser = Zt.UNAUTHENTICATED),
      (this.i = 0),
      (this.forceRefresh = !1),
      (this.auth = null))
  }
  start(t, n) {
    Tt(this.o === void 0)
    let r = this.i
    const s = (c) => (this.i !== r ? ((r = this.i), n(c)) : Promise.resolve())
    let i = new bn()
    this.o = () => {
      ;(this.i++,
        (this.currentUser = this.u()),
        i.resolve(),
        (i = new bn()),
        t.enqueueRetryable(() => s(this.currentUser)))
    }
    const a = () => {
        const c = i
        t.enqueueRetryable(async () => {
          ;(await c.promise, await s(this.currentUser))
        })
      },
      l = (c) => {
        ;(Q('FirebaseAuthCredentialsProvider', 'Auth detected'),
          (this.auth = c),
          this.o && (this.auth.addAuthTokenListener(this.o), a()))
      }
    ;(this.t.onInit((c) => l(c)),
      setTimeout(() => {
        if (!this.auth) {
          const c = this.t.getImmediate({ optional: !0 })
          c
            ? l(c)
            : (Q('FirebaseAuthCredentialsProvider', 'Auth not yet detected'),
              i.resolve(),
              (i = new bn()))
        }
      }, 0),
      a())
  }
  getToken() {
    const t = this.i,
      n = this.forceRefresh
    return (
      (this.forceRefresh = !1),
      this.auth
        ? this.auth
            .getToken(n)
            .then((r) =>
              this.i !== t
                ? (Q('FirebaseAuthCredentialsProvider', 'getToken aborted due to token change.'),
                  this.getToken())
                : r
                  ? (Tt(typeof r.accessToken == 'string'), new mf(r.accessToken, this.currentUser))
                  : null
            )
        : Promise.resolve(null)
    )
  }
  invalidateToken() {
    this.forceRefresh = !0
  }
  shutdown() {
    ;(this.auth && this.o && this.auth.removeAuthTokenListener(this.o), (this.o = void 0))
  }
  u() {
    const t = this.auth && this.auth.getUid()
    return (Tt(t === null || typeof t == 'string'), new Zt(t))
  }
}
class oy {
  constructor(t, n, r) {
    ;((this.l = t),
      (this.h = n),
      (this.P = r),
      (this.type = 'FirstParty'),
      (this.user = Zt.FIRST_PARTY),
      (this.I = new Map()))
  }
  T() {
    return this.P ? this.P() : null
  }
  get headers() {
    this.I.set('X-Goog-AuthUser', this.l)
    const t = this.T()
    return (
      t && this.I.set('Authorization', t),
      this.h && this.I.set('X-Goog-Iam-Authorization-Token', this.h),
      this.I
    )
  }
}
class ay {
  constructor(t, n, r) {
    ;((this.l = t), (this.h = n), (this.P = r))
  }
  getToken() {
    return Promise.resolve(new oy(this.l, this.h, this.P))
  }
  start(t, n) {
    t.enqueueRetryable(() => n(Zt.FIRST_PARTY))
  }
  shutdown() {}
  invalidateToken() {}
}
class ly {
  constructor(t) {
    ;((this.value = t),
      (this.type = 'AppCheck'),
      (this.headers = new Map()),
      t && t.length > 0 && this.headers.set('x-firebase-appcheck', this.value))
  }
}
class uy {
  constructor(t) {
    ;((this.A = t), (this.forceRefresh = !1), (this.appCheck = null), (this.R = null))
  }
  start(t, n) {
    Tt(this.o === void 0)
    const r = (i) => {
      i.error != null &&
        Q(
          'FirebaseAppCheckTokenProvider',
          `Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`
        )
      const a = i.token !== this.R
      return (
        (this.R = i.token),
        Q('FirebaseAppCheckTokenProvider', `Received ${a ? 'new' : 'existing'} token.`),
        a ? n(i.token) : Promise.resolve()
      )
    }
    this.o = (i) => {
      t.enqueueRetryable(() => r(i))
    }
    const s = (i) => {
      ;(Q('FirebaseAppCheckTokenProvider', 'AppCheck detected'),
        (this.appCheck = i),
        this.o && this.appCheck.addTokenListener(this.o))
    }
    ;(this.A.onInit((i) => s(i)),
      setTimeout(() => {
        if (!this.appCheck) {
          const i = this.A.getImmediate({ optional: !0 })
          i ? s(i) : Q('FirebaseAppCheckTokenProvider', 'AppCheck not yet detected')
        }
      }, 0))
  }
  getToken() {
    const t = this.forceRefresh
    return (
      (this.forceRefresh = !1),
      this.appCheck
        ? this.appCheck
            .getToken(t)
            .then((n) =>
              n ? (Tt(typeof n.token == 'string'), (this.R = n.token), new ly(n.token)) : null
            )
        : Promise.resolve(null)
    )
  }
  invalidateToken() {
    this.forceRefresh = !0
  }
  shutdown() {
    ;(this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), (this.o = void 0))
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function cy(e) {
  const t = typeof self < 'u' && (self.crypto || self.msCrypto),
    n = new Uint8Array(e)
  if (t && typeof t.getRandomValues == 'function') t.getRandomValues(n)
  else for (let r = 0; r < e; r++) n[r] = Math.floor(256 * Math.random())
  return n
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gf {
  static newId() {
    const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      n = Math.floor(256 / t.length) * t.length
    let r = ''
    for (; r.length < 20; ) {
      const s = cy(40)
      for (let i = 0; i < s.length; ++i)
        r.length < 20 && s[i] < n && (r += t.charAt(s[i] % t.length))
    }
    return r
  }
}
function mt(e, t) {
  return e < t ? -1 : e > t ? 1 : 0
}
function Er(e, t, n) {
  return e.length === t.length && e.every((r, s) => n(r, t[s]))
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ut {
  constructor(t, n) {
    if (((this.seconds = t), (this.nanoseconds = n), n < 0))
      throw new X(j.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n)
    if (n >= 1e9) throw new X(j.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n)
    if (t < -62135596800) throw new X(j.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t)
    if (t >= 253402300800) throw new X(j.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t)
  }
  static now() {
    return Ut.fromMillis(Date.now())
  }
  static fromDate(t) {
    return Ut.fromMillis(t.getTime())
  }
  static fromMillis(t) {
    const n = Math.floor(t / 1e3),
      r = Math.floor(1e6 * (t - 1e3 * n))
    return new Ut(n, r)
  }
  toDate() {
    return new Date(this.toMillis())
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6
  }
  _compareTo(t) {
    return this.seconds === t.seconds
      ? mt(this.nanoseconds, t.nanoseconds)
      : mt(this.seconds, t.seconds)
  }
  isEqual(t) {
    return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds
  }
  toString() {
    return 'Timestamp(seconds=' + this.seconds + ', nanoseconds=' + this.nanoseconds + ')'
  }
  toJSON() {
    return { seconds: this.seconds, nanoseconds: this.nanoseconds }
  }
  valueOf() {
    const t = this.seconds - -62135596800
    return String(t).padStart(12, '0') + '.' + String(this.nanoseconds).padStart(9, '0')
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class st {
  constructor(t) {
    this.timestamp = t
  }
  static fromTimestamp(t) {
    return new st(t)
  }
  static min() {
    return new st(new Ut(0, 0))
  }
  static max() {
    return new st(new Ut(253402300799, 999999999))
  }
  compareTo(t) {
    return this.timestamp._compareTo(t.timestamp)
  }
  isEqual(t) {
    return this.timestamp.isEqual(t.timestamp)
  }
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
  }
  toString() {
    return 'SnapshotVersion(' + this.timestamp.toString() + ')'
  }
  toTimestamp() {
    return this.timestamp
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Es {
  constructor(t, n, r) {
    ;(n === void 0 ? (n = 0) : n > t.length && rt(),
      r === void 0 ? (r = t.length - n) : r > t.length - n && rt(),
      (this.segments = t),
      (this.offset = n),
      (this.len = r))
  }
  get length() {
    return this.len
  }
  isEqual(t) {
    return Es.comparator(this, t) === 0
  }
  child(t) {
    const n = this.segments.slice(this.offset, this.limit())
    return (
      t instanceof Es
        ? t.forEach((r) => {
            n.push(r)
          })
        : n.push(t),
      this.construct(n)
    )
  }
  limit() {
    return this.offset + this.length
  }
  popFirst(t) {
    return (
      (t = t === void 0 ? 1 : t),
      this.construct(this.segments, this.offset + t, this.length - t)
    )
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1)
  }
  firstSegment() {
    return this.segments[this.offset]
  }
  lastSegment() {
    return this.get(this.length - 1)
  }
  get(t) {
    return this.segments[this.offset + t]
  }
  isEmpty() {
    return this.length === 0
  }
  isPrefixOf(t) {
    if (t.length < this.length) return !1
    for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1
    return !0
  }
  isImmediateParentOf(t) {
    if (this.length + 1 !== t.length) return !1
    for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1
    return !0
  }
  forEach(t) {
    for (let n = this.offset, r = this.limit(); n < r; n++) t(this.segments[n])
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit())
  }
  static comparator(t, n) {
    const r = Math.min(t.length, n.length)
    for (let s = 0; s < r; s++) {
      const i = t.get(s),
        a = n.get(s)
      if (i < a) return -1
      if (i > a) return 1
    }
    return t.length < n.length ? -1 : t.length > n.length ? 1 : 0
  }
}
class Pt extends Es {
  construct(t, n, r) {
    return new Pt(t, n, r)
  }
  canonicalString() {
    return this.toArray().join('/')
  }
  toString() {
    return this.canonicalString()
  }
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join('/')
  }
  static fromString(...t) {
    const n = []
    for (const r of t) {
      if (r.indexOf('//') >= 0)
        throw new X(
          j.INVALID_ARGUMENT,
          `Invalid segment (${r}). Paths must not contain // in them.`
        )
      n.push(...r.split('/').filter((s) => s.length > 0))
    }
    return new Pt(n)
  }
  static emptyPath() {
    return new Pt([])
  }
}
const hy = /^[_a-zA-Z][_a-zA-Z0-9]*$/
class zt extends Es {
  construct(t, n, r) {
    return new zt(t, n, r)
  }
  static isValidIdentifier(t) {
    return hy.test(t)
  }
  canonicalString() {
    return this.toArray()
      .map(
        (t) => (
          (t = t.replace(/\\/g, '\\\\').replace(/`/g, '\\`')),
          zt.isValidIdentifier(t) || (t = '`' + t + '`'),
          t
        )
      )
      .join('.')
  }
  toString() {
    return this.canonicalString()
  }
  isKeyField() {
    return this.length === 1 && this.get(0) === '__name__'
  }
  static keyField() {
    return new zt(['__name__'])
  }
  static fromServerFormat(t) {
    const n = []
    let r = '',
      s = 0
    const i = () => {
      if (r.length === 0)
        throw new X(
          j.INVALID_ARGUMENT,
          `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
        )
      ;(n.push(r), (r = ''))
    }
    let a = !1
    for (; s < t.length; ) {
      const l = t[s]
      if (l === '\\') {
        if (s + 1 === t.length)
          throw new X(j.INVALID_ARGUMENT, 'Path has trailing escape character: ' + t)
        const c = t[s + 1]
        if (c !== '\\' && c !== '.' && c !== '`')
          throw new X(j.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + t)
        ;((r += c), (s += 2))
      } else l === '`' ? ((a = !a), s++) : l !== '.' || a ? ((r += l), s++) : (i(), s++)
    }
    if ((i(), a)) throw new X(j.INVALID_ARGUMENT, 'Unterminated ` in path: ' + t)
    return new zt(n)
  }
  static emptyPath() {
    return new zt([])
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Z {
  constructor(t) {
    this.path = t
  }
  static fromPath(t) {
    return new Z(Pt.fromString(t))
  }
  static fromName(t) {
    return new Z(Pt.fromString(t).popFirst(5))
  }
  static empty() {
    return new Z(Pt.emptyPath())
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment()
  }
  hasCollectionId(t) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === t
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2)
  }
  getCollectionPath() {
    return this.path.popLast()
  }
  isEqual(t) {
    return t !== null && Pt.comparator(this.path, t.path) === 0
  }
  toString() {
    return this.path.toString()
  }
  static comparator(t, n) {
    return Pt.comparator(t.path, n.path)
  }
  static isDocumentKey(t) {
    return t.length % 2 == 0
  }
  static fromSegments(t) {
    return new Z(new Pt(t.slice()))
  }
}
function fy(e, t) {
  const n = e.toTimestamp().seconds,
    r = e.toTimestamp().nanoseconds + 1,
    s = st.fromTimestamp(r === 1e9 ? new Ut(n + 1, 0) : new Ut(n, r))
  return new Pn(s, Z.empty(), t)
}
function dy(e) {
  return new Pn(e.readTime, e.key, -1)
}
class Pn {
  constructor(t, n, r) {
    ;((this.readTime = t), (this.documentKey = n), (this.largestBatchId = r))
  }
  static min() {
    return new Pn(st.min(), Z.empty(), -1)
  }
  static max() {
    return new Pn(st.max(), Z.empty(), -1)
  }
}
function py(e, t) {
  let n = e.readTime.compareTo(t.readTime)
  return n !== 0
    ? n
    : ((n = Z.comparator(e.documentKey, t.documentKey)),
      n !== 0 ? n : mt(e.largestBatchId, t.largestBatchId))
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const my =
  'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.'
class gy {
  constructor() {
    this.onCommittedListeners = []
  }
  addOnCommittedListener(t) {
    this.onCommittedListeners.push(t)
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((t) => t())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Cs(e) {
  if (e.code !== j.FAILED_PRECONDITION || e.message !== my) throw e
  Q('LocalStore', 'Unexpectedly lost primary lease')
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class B {
  constructor(t) {
    ;((this.nextCallback = null),
      (this.catchCallback = null),
      (this.result = void 0),
      (this.error = void 0),
      (this.isDone = !1),
      (this.callbackAttached = !1),
      t(
        (n) => {
          ;((this.isDone = !0), (this.result = n), this.nextCallback && this.nextCallback(n))
        },
        (n) => {
          ;((this.isDone = !0), (this.error = n), this.catchCallback && this.catchCallback(n))
        }
      ))
  }
  catch(t) {
    return this.next(void 0, t)
  }
  next(t, n) {
    return (
      this.callbackAttached && rt(),
      (this.callbackAttached = !0),
      this.isDone
        ? this.error
          ? this.wrapFailure(n, this.error)
          : this.wrapSuccess(t, this.result)
        : new B((r, s) => {
            ;((this.nextCallback = (i) => {
              this.wrapSuccess(t, i).next(r, s)
            }),
              (this.catchCallback = (i) => {
                this.wrapFailure(n, i).next(r, s)
              }))
          })
    )
  }
  toPromise() {
    return new Promise((t, n) => {
      this.next(t, n)
    })
  }
  wrapUserFunction(t) {
    try {
      const n = t()
      return n instanceof B ? n : B.resolve(n)
    } catch (n) {
      return B.reject(n)
    }
  }
  wrapSuccess(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : B.resolve(n)
  }
  wrapFailure(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : B.reject(n)
  }
  static resolve(t) {
    return new B((n, r) => {
      n(t)
    })
  }
  static reject(t) {
    return new B((n, r) => {
      r(t)
    })
  }
  static waitFor(t) {
    return new B((n, r) => {
      let s = 0,
        i = 0,
        a = !1
      ;(t.forEach((l) => {
        ;(++s,
          l.next(
            () => {
              ;(++i, a && i === s && n())
            },
            (c) => r(c)
          ))
      }),
        (a = !0),
        i === s && n())
    })
  }
  static or(t) {
    let n = B.resolve(!1)
    for (const r of t) n = n.next((s) => (s ? B.resolve(s) : r()))
    return n
  }
  static forEach(t, n) {
    const r = []
    return (
      t.forEach((s, i) => {
        r.push(n.call(this, s, i))
      }),
      this.waitFor(r)
    )
  }
  static mapArray(t, n) {
    return new B((r, s) => {
      const i = t.length,
        a = new Array(i)
      let l = 0
      for (let c = 0; c < i; c++) {
        const f = c
        n(t[f]).next(
          (d) => {
            ;((a[f] = d), ++l, l === i && r(a))
          },
          (d) => s(d)
        )
      }
    })
  }
  static doWhile(t, n) {
    return new B((r, s) => {
      const i = () => {
        t() === !0
          ? n().next(() => {
              i()
            }, s)
          : r()
      }
      i()
    })
  }
}
function _y(e) {
  const t = e.match(/Android ([\d.]+)/i),
    n = t ? t[1].split('.').slice(0, 2).join('.') : '-1'
  return Number(n)
}
function Vs(e) {
  return e.name === 'IndexedDbTransactionError'
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ma {
  constructor(t, n) {
    ;((this.previousValue = t),
      n &&
        ((n.sequenceNumberHandler = (r) => this.ie(r)),
        (this.se = (r) => n.writeSequenceNumber(r))))
  }
  ie(t) {
    return ((this.previousValue = Math.max(t, this.previousValue)), this.previousValue)
  }
  next() {
    const t = ++this.previousValue
    return (this.se && this.se(t), t)
  }
}
Ma.oe = -1
function zi(e) {
  return e == null
}
function bi(e) {
  return e === 0 && 1 / e == -1 / 0
}
function yy(e) {
  return (
    typeof e == 'number' &&
    Number.isInteger(e) &&
    !bi(e) &&
    e <= Number.MAX_SAFE_INTEGER &&
    e >= Number.MIN_SAFE_INTEGER
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xu(e) {
  let t = 0
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++
  return t
}
function Pr(e, t) {
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
}
function _f(e) {
  for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1
  return !0
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ct {
  constructor(t, n) {
    ;((this.comparator = t), (this.root = n || Ht.EMPTY))
  }
  insert(t, n) {
    return new Ct(
      this.comparator,
      this.root.insert(t, n, this.comparator).copy(null, null, Ht.BLACK, null, null)
    )
  }
  remove(t) {
    return new Ct(
      this.comparator,
      this.root.remove(t, this.comparator).copy(null, null, Ht.BLACK, null, null)
    )
  }
  get(t) {
    let n = this.root
    for (; !n.isEmpty(); ) {
      const r = this.comparator(t, n.key)
      if (r === 0) return n.value
      r < 0 ? (n = n.left) : r > 0 && (n = n.right)
    }
    return null
  }
  indexOf(t) {
    let n = 0,
      r = this.root
    for (; !r.isEmpty(); ) {
      const s = this.comparator(t, r.key)
      if (s === 0) return n + r.left.size
      s < 0 ? (r = r.left) : ((n += r.left.size + 1), (r = r.right))
    }
    return -1
  }
  isEmpty() {
    return this.root.isEmpty()
  }
  get size() {
    return this.root.size
  }
  minKey() {
    return this.root.minKey()
  }
  maxKey() {
    return this.root.maxKey()
  }
  inorderTraversal(t) {
    return this.root.inorderTraversal(t)
  }
  forEach(t) {
    this.inorderTraversal((n, r) => (t(n, r), !1))
  }
  toString() {
    const t = []
    return (this.inorderTraversal((n, r) => (t.push(`${n}:${r}`), !1)), `{${t.join(', ')}}`)
  }
  reverseTraversal(t) {
    return this.root.reverseTraversal(t)
  }
  getIterator() {
    return new ri(this.root, null, this.comparator, !1)
  }
  getIteratorFrom(t) {
    return new ri(this.root, t, this.comparator, !1)
  }
  getReverseIterator() {
    return new ri(this.root, null, this.comparator, !0)
  }
  getReverseIteratorFrom(t) {
    return new ri(this.root, t, this.comparator, !0)
  }
}
class ri {
  constructor(t, n, r, s) {
    ;((this.isReverse = s), (this.nodeStack = []))
    let i = 1
    for (; !t.isEmpty(); )
      if (((i = n ? r(t.key, n) : 1), n && s && (i *= -1), i < 0))
        t = this.isReverse ? t.left : t.right
      else {
        if (i === 0) {
          this.nodeStack.push(t)
          break
        }
        ;(this.nodeStack.push(t), (t = this.isReverse ? t.right : t.left))
      }
  }
  getNext() {
    let t = this.nodeStack.pop()
    const n = { key: t.key, value: t.value }
    if (this.isReverse) for (t = t.left; !t.isEmpty(); ) (this.nodeStack.push(t), (t = t.right))
    else for (t = t.right; !t.isEmpty(); ) (this.nodeStack.push(t), (t = t.left))
    return n
  }
  hasNext() {
    return this.nodeStack.length > 0
  }
  peek() {
    if (this.nodeStack.length === 0) return null
    const t = this.nodeStack[this.nodeStack.length - 1]
    return { key: t.key, value: t.value }
  }
}
class Ht {
  constructor(t, n, r, s, i) {
    ;((this.key = t),
      (this.value = n),
      (this.color = r ?? Ht.RED),
      (this.left = s ?? Ht.EMPTY),
      (this.right = i ?? Ht.EMPTY),
      (this.size = this.left.size + 1 + this.right.size))
  }
  copy(t, n, r, s, i) {
    return new Ht(t ?? this.key, n ?? this.value, r ?? this.color, s ?? this.left, i ?? this.right)
  }
  isEmpty() {
    return !1
  }
  inorderTraversal(t) {
    return (
      this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
    )
  }
  reverseTraversal(t) {
    return (
      this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
    )
  }
  min() {
    return this.left.isEmpty() ? this : this.left.min()
  }
  minKey() {
    return this.min().key
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey()
  }
  insert(t, n, r) {
    let s = this
    const i = r(t, s.key)
    return (
      (s =
        i < 0
          ? s.copy(null, null, null, s.left.insert(t, n, r), null)
          : i === 0
            ? s.copy(null, n, null, null, null)
            : s.copy(null, null, null, null, s.right.insert(t, n, r))),
      s.fixUp()
    )
  }
  removeMin() {
    if (this.left.isEmpty()) return Ht.EMPTY
    let t = this
    return (
      t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()),
      (t = t.copy(null, null, null, t.left.removeMin(), null)),
      t.fixUp()
    )
  }
  remove(t, n) {
    let r,
      s = this
    if (n(t, s.key) < 0)
      (s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()),
        (s = s.copy(null, null, null, s.left.remove(t, n), null)))
    else {
      if (
        (s.left.isRed() && (s = s.rotateRight()),
        s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()),
        n(t, s.key) === 0)
      ) {
        if (s.right.isEmpty()) return Ht.EMPTY
        ;((r = s.right.min()), (s = s.copy(r.key, r.value, null, null, s.right.removeMin())))
      }
      s = s.copy(null, null, null, null, s.right.remove(t, n))
    }
    return s.fixUp()
  }
  isRed() {
    return this.color
  }
  fixUp() {
    let t = this
    return (
      t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()),
      t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()),
      t.left.isRed() && t.right.isRed() && (t = t.colorFlip()),
      t
    )
  }
  moveRedLeft() {
    let t = this.colorFlip()
    return (
      t.right.left.isRed() &&
        ((t = t.copy(null, null, null, null, t.right.rotateRight())),
        (t = t.rotateLeft()),
        (t = t.colorFlip())),
      t
    )
  }
  moveRedRight() {
    let t = this.colorFlip()
    return (t.left.left.isRed() && ((t = t.rotateRight()), (t = t.colorFlip())), t)
  }
  rotateLeft() {
    const t = this.copy(null, null, Ht.RED, null, this.right.left)
    return this.right.copy(null, null, this.color, t, null)
  }
  rotateRight() {
    const t = this.copy(null, null, Ht.RED, this.left.right, null)
    return this.left.copy(null, null, this.color, null, t)
  }
  colorFlip() {
    const t = this.left.copy(null, null, !this.left.color, null, null),
      n = this.right.copy(null, null, !this.right.color, null, null)
    return this.copy(null, null, !this.color, t, n)
  }
  checkMaxDepth() {
    const t = this.check()
    return Math.pow(2, t) <= this.size + 1
  }
  check() {
    if ((this.isRed() && this.left.isRed()) || this.right.isRed()) throw rt()
    const t = this.left.check()
    if (t !== this.right.check()) throw rt()
    return t + (this.isRed() ? 0 : 1)
  }
}
;((Ht.EMPTY = null), (Ht.RED = !0), (Ht.BLACK = !1))
Ht.EMPTY = new (class {
  constructor() {
    this.size = 0
  }
  get key() {
    throw rt()
  }
  get value() {
    throw rt()
  }
  get color() {
    throw rt()
  }
  get left() {
    throw rt()
  }
  get right() {
    throw rt()
  }
  copy(t, n, r, s, i) {
    return this
  }
  insert(t, n, r) {
    return new Ht(t, n)
  }
  remove(t, n) {
    return this
  }
  isEmpty() {
    return !0
  }
  inorderTraversal(t) {
    return !1
  }
  reverseTraversal(t) {
    return !1
  }
  minKey() {
    return null
  }
  maxKey() {
    return null
  }
  isRed() {
    return !1
  }
  checkMaxDepth() {
    return !0
  }
  check() {
    return 0
  }
})()
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wt {
  constructor(t) {
    ;((this.comparator = t), (this.data = new Ct(this.comparator)))
  }
  has(t) {
    return this.data.get(t) !== null
  }
  first() {
    return this.data.minKey()
  }
  last() {
    return this.data.maxKey()
  }
  get size() {
    return this.data.size
  }
  indexOf(t) {
    return this.data.indexOf(t)
  }
  forEach(t) {
    this.data.inorderTraversal((n, r) => (t(n), !1))
  }
  forEachInRange(t, n) {
    const r = this.data.getIteratorFrom(t[0])
    for (; r.hasNext(); ) {
      const s = r.getNext()
      if (this.comparator(s.key, t[1]) >= 0) return
      n(s.key)
    }
  }
  forEachWhile(t, n) {
    let r
    for (r = n !== void 0 ? this.data.getIteratorFrom(n) : this.data.getIterator(); r.hasNext(); )
      if (!t(r.getNext().key)) return
  }
  firstAfterOrEqual(t) {
    const n = this.data.getIteratorFrom(t)
    return n.hasNext() ? n.getNext().key : null
  }
  getIterator() {
    return new Ju(this.data.getIterator())
  }
  getIteratorFrom(t) {
    return new Ju(this.data.getIteratorFrom(t))
  }
  add(t) {
    return this.copy(this.data.remove(t).insert(t, !0))
  }
  delete(t) {
    return this.has(t) ? this.copy(this.data.remove(t)) : this
  }
  isEmpty() {
    return this.data.isEmpty()
  }
  unionWith(t) {
    let n = this
    return (
      n.size < t.size && ((n = t), (t = this)),
      t.forEach((r) => {
        n = n.add(r)
      }),
      n
    )
  }
  isEqual(t) {
    if (!(t instanceof Wt) || this.size !== t.size) return !1
    const n = this.data.getIterator(),
      r = t.data.getIterator()
    for (; n.hasNext(); ) {
      const s = n.getNext().key,
        i = r.getNext().key
      if (this.comparator(s, i) !== 0) return !1
    }
    return !0
  }
  toArray() {
    const t = []
    return (
      this.forEach((n) => {
        t.push(n)
      }),
      t
    )
  }
  toString() {
    const t = []
    return (this.forEach((n) => t.push(n)), 'SortedSet(' + t.toString() + ')')
  }
  copy(t) {
    const n = new Wt(this.comparator)
    return ((n.data = t), n)
  }
}
class Ju {
  constructor(t) {
    this.iter = t
  }
  getNext() {
    return this.iter.getNext().key
  }
  hasNext() {
    return this.iter.hasNext()
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ie {
  constructor(t) {
    ;((this.fields = t), t.sort(zt.comparator))
  }
  static empty() {
    return new Ie([])
  }
  unionWith(t) {
    let n = new Wt(zt.comparator)
    for (const r of this.fields) n = n.add(r)
    for (const r of t) n = n.add(r)
    return new Ie(n.toArray())
  }
  covers(t) {
    for (const n of this.fields) if (n.isPrefixOf(t)) return !0
    return !1
  }
  isEqual(t) {
    return Er(this.fields, t.fields, (n, r) => n.isEqual(r))
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yf extends Error {
  constructor() {
    ;(super(...arguments), (this.name = 'Base64DecodeError'))
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gt {
  constructor(t) {
    this.binaryString = t
  }
  static fromBase64String(t) {
    const n = (function (s) {
      try {
        return atob(s)
      } catch (i) {
        throw typeof DOMException < 'u' && i instanceof DOMException
          ? new yf('Invalid base64 string: ' + i)
          : i
      }
    })(t)
    return new Gt(n)
  }
  static fromUint8Array(t) {
    const n = (function (s) {
      let i = ''
      for (let a = 0; a < s.length; ++a) i += String.fromCharCode(s[a])
      return i
    })(t)
    return new Gt(n)
  }
  [Symbol.iterator]() {
    let t = 0
    return {
      next: () =>
        t < this.binaryString.length
          ? { value: this.binaryString.charCodeAt(t++), done: !1 }
          : { value: void 0, done: !0 }
    }
  }
  toBase64() {
    return (function (n) {
      return btoa(n)
    })(this.binaryString)
  }
  toUint8Array() {
    return (function (n) {
      const r = new Uint8Array(n.length)
      for (let s = 0; s < n.length; s++) r[s] = n.charCodeAt(s)
      return r
    })(this.binaryString)
  }
  approximateByteSize() {
    return 2 * this.binaryString.length
  }
  compareTo(t) {
    return mt(this.binaryString, t.binaryString)
  }
  isEqual(t) {
    return this.binaryString === t.binaryString
  }
}
Gt.EMPTY_BYTE_STRING = new Gt('')
const vy = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/)
function Sn(e) {
  if ((Tt(!!e), typeof e == 'string')) {
    let t = 0
    const n = vy.exec(e)
    if ((Tt(!!n), n[1])) {
      let s = n[1]
      ;((s = (s + '000000000').substr(0, 9)), (t = Number(s)))
    }
    const r = new Date(e)
    return { seconds: Math.floor(r.getTime() / 1e3), nanos: t }
  }
  return { seconds: Dt(e.seconds), nanos: Dt(e.nanos) }
}
function Dt(e) {
  return typeof e == 'number' ? e : typeof e == 'string' ? Number(e) : 0
}
function Wn(e) {
  return typeof e == 'string' ? Gt.fromBase64String(e) : Gt.fromUint8Array(e)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function La(e) {
  var t, n
  return (
    ((n = (
      ((t = e == null ? void 0 : e.mapValue) === null || t === void 0 ? void 0 : t.fields) || {}
    ).__type__) === null || n === void 0
      ? void 0
      : n.stringValue) === 'server_timestamp'
  )
}
function Fa(e) {
  const t = e.mapValue.fields.__previous_value__
  return La(t) ? Fa(t) : t
}
function Ts(e) {
  const t = Sn(e.mapValue.fields.__local_write_time__.timestampValue)
  return new Ut(t.seconds, t.nanos)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ey {
  constructor(t, n, r, s, i, a, l, c, f) {
    ;((this.databaseId = t),
      (this.appId = n),
      (this.persistenceKey = r),
      (this.host = s),
      (this.ssl = i),
      (this.forceLongPolling = a),
      (this.autoDetectLongPolling = l),
      (this.longPollingOptions = c),
      (this.useFetchStreams = f))
  }
}
class ws {
  constructor(t, n) {
    ;((this.projectId = t), (this.database = n || '(default)'))
  }
  static empty() {
    return new ws('', '')
  }
  get isDefaultDatabase() {
    return this.database === '(default)'
  }
  isEqual(t) {
    return t instanceof ws && t.projectId === this.projectId && t.database === this.database
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const si = { mapValue: {} }
function Gn(e) {
  return 'nullValue' in e
    ? 0
    : 'booleanValue' in e
      ? 1
      : 'integerValue' in e || 'doubleValue' in e
        ? 2
        : 'timestampValue' in e
          ? 3
          : 'stringValue' in e
            ? 5
            : 'bytesValue' in e
              ? 6
              : 'referenceValue' in e
                ? 7
                : 'geoPointValue' in e
                  ? 8
                  : 'arrayValue' in e
                    ? 9
                    : 'mapValue' in e
                      ? La(e)
                        ? 4
                        : wy(e)
                          ? 9007199254740991
                          : Ty(e)
                            ? 10
                            : 11
                      : rt()
}
function qe(e, t) {
  if (e === t) return !0
  const n = Gn(e)
  if (n !== Gn(t)) return !1
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0
    case 1:
      return e.booleanValue === t.booleanValue
    case 4:
      return Ts(e).isEqual(Ts(t))
    case 3:
      return (function (s, i) {
        if (
          typeof s.timestampValue == 'string' &&
          typeof i.timestampValue == 'string' &&
          s.timestampValue.length === i.timestampValue.length
        )
          return s.timestampValue === i.timestampValue
        const a = Sn(s.timestampValue),
          l = Sn(i.timestampValue)
        return a.seconds === l.seconds && a.nanos === l.nanos
      })(e, t)
    case 5:
      return e.stringValue === t.stringValue
    case 6:
      return (function (s, i) {
        return Wn(s.bytesValue).isEqual(Wn(i.bytesValue))
      })(e, t)
    case 7:
      return e.referenceValue === t.referenceValue
    case 8:
      return (function (s, i) {
        return (
          Dt(s.geoPointValue.latitude) === Dt(i.geoPointValue.latitude) &&
          Dt(s.geoPointValue.longitude) === Dt(i.geoPointValue.longitude)
        )
      })(e, t)
    case 2:
      return (function (s, i) {
        if ('integerValue' in s && 'integerValue' in i)
          return Dt(s.integerValue) === Dt(i.integerValue)
        if ('doubleValue' in s && 'doubleValue' in i) {
          const a = Dt(s.doubleValue),
            l = Dt(i.doubleValue)
          return a === l ? bi(a) === bi(l) : isNaN(a) && isNaN(l)
        }
        return !1
      })(e, t)
    case 9:
      return Er(e.arrayValue.values || [], t.arrayValue.values || [], qe)
    case 10:
    case 11:
      return (function (s, i) {
        const a = s.mapValue.fields || {},
          l = i.mapValue.fields || {}
        if (Xu(a) !== Xu(l)) return !1
        for (const c in a)
          if (a.hasOwnProperty(c) && (l[c] === void 0 || !qe(a[c], l[c]))) return !1
        return !0
      })(e, t)
    default:
      return rt()
  }
}
function bs(e, t) {
  return (e.values || []).find((n) => qe(n, t)) !== void 0
}
function Tr(e, t) {
  if (e === t) return 0
  const n = Gn(e),
    r = Gn(t)
  if (n !== r) return mt(n, r)
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0
    case 1:
      return mt(e.booleanValue, t.booleanValue)
    case 2:
      return (function (i, a) {
        const l = Dt(i.integerValue || i.doubleValue),
          c = Dt(a.integerValue || a.doubleValue)
        return l < c ? -1 : l > c ? 1 : l === c ? 0 : isNaN(l) ? (isNaN(c) ? 0 : -1) : 1
      })(e, t)
    case 3:
      return Zu(e.timestampValue, t.timestampValue)
    case 4:
      return Zu(Ts(e), Ts(t))
    case 5:
      return mt(e.stringValue, t.stringValue)
    case 6:
      return (function (i, a) {
        const l = Wn(i),
          c = Wn(a)
        return l.compareTo(c)
      })(e.bytesValue, t.bytesValue)
    case 7:
      return (function (i, a) {
        const l = i.split('/'),
          c = a.split('/')
        for (let f = 0; f < l.length && f < c.length; f++) {
          const d = mt(l[f], c[f])
          if (d !== 0) return d
        }
        return mt(l.length, c.length)
      })(e.referenceValue, t.referenceValue)
    case 8:
      return (function (i, a) {
        const l = mt(Dt(i.latitude), Dt(a.latitude))
        return l !== 0 ? l : mt(Dt(i.longitude), Dt(a.longitude))
      })(e.geoPointValue, t.geoPointValue)
    case 9:
      return tc(e.arrayValue, t.arrayValue)
    case 10:
      return (function (i, a) {
        var l, c, f, d
        const m = i.fields || {},
          w = a.fields || {},
          P = (l = m.value) === null || l === void 0 ? void 0 : l.arrayValue,
          L = (c = w.value) === null || c === void 0 ? void 0 : c.arrayValue,
          D = mt(
            ((f = P == null ? void 0 : P.values) === null || f === void 0 ? void 0 : f.length) || 0,
            ((d = L == null ? void 0 : L.values) === null || d === void 0 ? void 0 : d.length) || 0
          )
        return D !== 0 ? D : tc(P, L)
      })(e.mapValue, t.mapValue)
    case 11:
      return (function (i, a) {
        if (i === si.mapValue && a === si.mapValue) return 0
        if (i === si.mapValue) return 1
        if (a === si.mapValue) return -1
        const l = i.fields || {},
          c = Object.keys(l),
          f = a.fields || {},
          d = Object.keys(f)
        ;(c.sort(), d.sort())
        for (let m = 0; m < c.length && m < d.length; ++m) {
          const w = mt(c[m], d[m])
          if (w !== 0) return w
          const P = Tr(l[c[m]], f[d[m]])
          if (P !== 0) return P
        }
        return mt(c.length, d.length)
      })(e.mapValue, t.mapValue)
    default:
      throw rt()
  }
}
function Zu(e, t) {
  if (typeof e == 'string' && typeof t == 'string' && e.length === t.length) return mt(e, t)
  const n = Sn(e),
    r = Sn(t),
    s = mt(n.seconds, r.seconds)
  return s !== 0 ? s : mt(n.nanos, r.nanos)
}
function tc(e, t) {
  const n = e.values || [],
    r = t.values || []
  for (let s = 0; s < n.length && s < r.length; ++s) {
    const i = Tr(n[s], r[s])
    if (i) return i
  }
  return mt(n.length, r.length)
}
function wr(e) {
  return na(e)
}
function na(e) {
  return 'nullValue' in e
    ? 'null'
    : 'booleanValue' in e
      ? '' + e.booleanValue
      : 'integerValue' in e
        ? '' + e.integerValue
        : 'doubleValue' in e
          ? '' + e.doubleValue
          : 'timestampValue' in e
            ? (function (n) {
                const r = Sn(n)
                return `time(${r.seconds},${r.nanos})`
              })(e.timestampValue)
            : 'stringValue' in e
              ? e.stringValue
              : 'bytesValue' in e
                ? (function (n) {
                    return Wn(n).toBase64()
                  })(e.bytesValue)
                : 'referenceValue' in e
                  ? (function (n) {
                      return Z.fromName(n).toString()
                    })(e.referenceValue)
                  : 'geoPointValue' in e
                    ? (function (n) {
                        return `geo(${n.latitude},${n.longitude})`
                      })(e.geoPointValue)
                    : 'arrayValue' in e
                      ? (function (n) {
                          let r = '[',
                            s = !0
                          for (const i of n.values || []) (s ? (s = !1) : (r += ','), (r += na(i)))
                          return r + ']'
                        })(e.arrayValue)
                      : 'mapValue' in e
                        ? (function (n) {
                            const r = Object.keys(n.fields || {}).sort()
                            let s = '{',
                              i = !0
                            for (const a of r)
                              (i ? (i = !1) : (s += ','), (s += `${a}:${na(n.fields[a])}`))
                            return s + '}'
                          })(e.mapValue)
                        : rt()
}
function ra(e) {
  return !!e && 'integerValue' in e
}
function Ua(e) {
  return !!e && 'arrayValue' in e
}
function ec(e) {
  return !!e && 'nullValue' in e
}
function nc(e) {
  return !!e && 'doubleValue' in e && isNaN(Number(e.doubleValue))
}
function fi(e) {
  return !!e && 'mapValue' in e
}
function Ty(e) {
  var t, n
  return (
    ((n = (
      ((t = e == null ? void 0 : e.mapValue) === null || t === void 0 ? void 0 : t.fields) || {}
    ).__type__) === null || n === void 0
      ? void 0
      : n.stringValue) === '__vector__'
  )
}
function us(e) {
  if (e.geoPointValue) return { geoPointValue: Object.assign({}, e.geoPointValue) }
  if (e.timestampValue && typeof e.timestampValue == 'object')
    return { timestampValue: Object.assign({}, e.timestampValue) }
  if (e.mapValue) {
    const t = { mapValue: { fields: {} } }
    return (Pr(e.mapValue.fields, (n, r) => (t.mapValue.fields[n] = us(r))), t)
  }
  if (e.arrayValue) {
    const t = { arrayValue: { values: [] } }
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = us(e.arrayValue.values[n])
    return t
  }
  return Object.assign({}, e)
}
function wy(e) {
  return (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === '__max__'
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _e {
  constructor(t) {
    this.value = t
  }
  static empty() {
    return new _e({ mapValue: {} })
  }
  field(t) {
    if (t.isEmpty()) return this.value
    {
      let n = this.value
      for (let r = 0; r < t.length - 1; ++r)
        if (((n = (n.mapValue.fields || {})[t.get(r)]), !fi(n))) return null
      return ((n = (n.mapValue.fields || {})[t.lastSegment()]), n || null)
    }
  }
  set(t, n) {
    this.getFieldsMap(t.popLast())[t.lastSegment()] = us(n)
  }
  setAll(t) {
    let n = zt.emptyPath(),
      r = {},
      s = []
    t.forEach((a, l) => {
      if (!n.isImmediateParentOf(l)) {
        const c = this.getFieldsMap(n)
        ;(this.applyChanges(c, r, s), (r = {}), (s = []), (n = l.popLast()))
      }
      a ? (r[l.lastSegment()] = us(a)) : s.push(l.lastSegment())
    })
    const i = this.getFieldsMap(n)
    this.applyChanges(i, r, s)
  }
  delete(t) {
    const n = this.field(t.popLast())
    fi(n) && n.mapValue.fields && delete n.mapValue.fields[t.lastSegment()]
  }
  isEqual(t) {
    return qe(this.value, t.value)
  }
  getFieldsMap(t) {
    let n = this.value
    n.mapValue.fields || (n.mapValue = { fields: {} })
    for (let r = 0; r < t.length; ++r) {
      let s = n.mapValue.fields[t.get(r)]
      ;((fi(s) && s.mapValue.fields) ||
        ((s = { mapValue: { fields: {} } }), (n.mapValue.fields[t.get(r)] = s)),
        (n = s))
    }
    return n.mapValue.fields
  }
  applyChanges(t, n, r) {
    Pr(n, (s, i) => (t[s] = i))
    for (const s of r) delete t[s]
  }
  clone() {
    return new _e(us(this.value))
  }
}
function vf(e) {
  const t = []
  return (
    Pr(e.fields, (n, r) => {
      const s = new zt([n])
      if (fi(r)) {
        const i = vf(r.mapValue).fields
        if (i.length === 0) t.push(s)
        else for (const a of i) t.push(s.child(a))
      } else t.push(s)
    }),
    new Ie(t)
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ee {
  constructor(t, n, r, s, i, a, l) {
    ;((this.key = t),
      (this.documentType = n),
      (this.version = r),
      (this.readTime = s),
      (this.createTime = i),
      (this.data = a),
      (this.documentState = l))
  }
  static newInvalidDocument(t) {
    return new ee(t, 0, st.min(), st.min(), st.min(), _e.empty(), 0)
  }
  static newFoundDocument(t, n, r, s) {
    return new ee(t, 1, n, st.min(), r, s, 0)
  }
  static newNoDocument(t, n) {
    return new ee(t, 2, n, st.min(), st.min(), _e.empty(), 0)
  }
  static newUnknownDocument(t, n) {
    return new ee(t, 3, n, st.min(), st.min(), _e.empty(), 2)
  }
  convertToFoundDocument(t, n) {
    return (
      !this.createTime.isEqual(st.min()) ||
        (this.documentType !== 2 && this.documentType !== 0) ||
        (this.createTime = t),
      (this.version = t),
      (this.documentType = 1),
      (this.data = n),
      (this.documentState = 0),
      this
    )
  }
  convertToNoDocument(t) {
    return (
      (this.version = t),
      (this.documentType = 2),
      (this.data = _e.empty()),
      (this.documentState = 0),
      this
    )
  }
  convertToUnknownDocument(t) {
    return (
      (this.version = t),
      (this.documentType = 3),
      (this.data = _e.empty()),
      (this.documentState = 2),
      this
    )
  }
  setHasCommittedMutations() {
    return ((this.documentState = 2), this)
  }
  setHasLocalMutations() {
    return ((this.documentState = 1), (this.version = st.min()), this)
  }
  setReadTime(t) {
    return ((this.readTime = t), this)
  }
  get hasLocalMutations() {
    return this.documentState === 1
  }
  get hasCommittedMutations() {
    return this.documentState === 2
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations
  }
  isValidDocument() {
    return this.documentType !== 0
  }
  isFoundDocument() {
    return this.documentType === 1
  }
  isNoDocument() {
    return this.documentType === 2
  }
  isUnknownDocument() {
    return this.documentType === 3
  }
  isEqual(t) {
    return (
      t instanceof ee &&
      this.key.isEqual(t.key) &&
      this.version.isEqual(t.version) &&
      this.documentType === t.documentType &&
      this.documentState === t.documentState &&
      this.data.isEqual(t.data)
    )
  }
  mutableCopy() {
    return new ee(
      this.key,
      this.documentType,
      this.version,
      this.readTime,
      this.createTime,
      this.data.clone(),
      this.documentState
    )
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ii {
  constructor(t, n) {
    ;((this.position = t), (this.inclusive = n))
  }
}
function rc(e, t, n) {
  let r = 0
  for (let s = 0; s < e.position.length; s++) {
    const i = t[s],
      a = e.position[s]
    if (
      (i.field.isKeyField()
        ? (r = Z.comparator(Z.fromName(a.referenceValue), n.key))
        : (r = Tr(a, n.data.field(i.field))),
      i.dir === 'desc' && (r *= -1),
      r !== 0)
    )
      break
  }
  return r
}
function sc(e, t) {
  if (e === null) return t === null
  if (t === null || e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return !1
  for (let n = 0; n < e.position.length; n++) if (!qe(e.position[n], t.position[n])) return !1
  return !0
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ai {
  constructor(t, n = 'asc') {
    ;((this.field = t), (this.dir = n))
  }
}
function by(e, t) {
  return e.dir === t.dir && e.field.isEqual(t.field)
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ef {}
class Ft extends Ef {
  constructor(t, n, r) {
    ;(super(), (this.field = t), (this.op = n), (this.value = r))
  }
  static create(t, n, r) {
    return t.isKeyField()
      ? n === 'in' || n === 'not-in'
        ? this.createKeyFieldInFilter(t, n, r)
        : new Ay(t, n, r)
      : n === 'array-contains'
        ? new Py(t, r)
        : n === 'in'
          ? new Sy(t, r)
          : n === 'not-in'
            ? new Cy(t, r)
            : n === 'array-contains-any'
              ? new Vy(t, r)
              : new Ft(t, n, r)
  }
  static createKeyFieldInFilter(t, n, r) {
    return n === 'in' ? new Ry(t, r) : new xy(t, r)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return this.op === '!='
      ? n !== null && this.matchesComparison(Tr(n, this.value))
      : n !== null && Gn(this.value) === Gn(n) && this.matchesComparison(Tr(n, this.value))
  }
  matchesComparison(t) {
    switch (this.op) {
      case '<':
        return t < 0
      case '<=':
        return t <= 0
      case '==':
        return t === 0
      case '!=':
        return t !== 0
      case '>':
        return t > 0
      case '>=':
        return t >= 0
      default:
        return rt()
    }
  }
  isInequality() {
    return ['<', '<=', '>', '>=', '!=', 'not-in'].indexOf(this.op) >= 0
  }
  getFlattenedFilters() {
    return [this]
  }
  getFilters() {
    return [this]
  }
}
class Ke extends Ef {
  constructor(t, n) {
    ;(super(), (this.filters = t), (this.op = n), (this.ae = null))
  }
  static create(t, n) {
    return new Ke(t, n)
  }
  matches(t) {
    return Tf(this)
      ? this.filters.find((n) => !n.matches(t)) === void 0
      : this.filters.find((n) => n.matches(t)) !== void 0
  }
  getFlattenedFilters() {
    return (
      this.ae !== null ||
        (this.ae = this.filters.reduce((t, n) => t.concat(n.getFlattenedFilters()), [])),
      this.ae
    )
  }
  getFilters() {
    return Object.assign([], this.filters)
  }
}
function Tf(e) {
  return e.op === 'and'
}
function wf(e) {
  return Iy(e) && Tf(e)
}
function Iy(e) {
  for (const t of e.filters) if (t instanceof Ke) return !1
  return !0
}
function sa(e) {
  if (e instanceof Ft) return e.field.canonicalString() + e.op.toString() + wr(e.value)
  if (wf(e)) return e.filters.map((t) => sa(t)).join(',')
  {
    const t = e.filters.map((n) => sa(n)).join(',')
    return `${e.op}(${t})`
  }
}
function bf(e, t) {
  return e instanceof Ft
    ? (function (r, s) {
        return s instanceof Ft && r.op === s.op && r.field.isEqual(s.field) && qe(r.value, s.value)
      })(e, t)
    : e instanceof Ke
      ? (function (r, s) {
          return s instanceof Ke && r.op === s.op && r.filters.length === s.filters.length
            ? r.filters.reduce((i, a, l) => i && bf(a, s.filters[l]), !0)
            : !1
        })(e, t)
      : void rt()
}
function If(e) {
  return e instanceof Ft
    ? (function (n) {
        return `${n.field.canonicalString()} ${n.op} ${wr(n.value)}`
      })(e)
    : e instanceof Ke
      ? (function (n) {
          return n.op.toString() + ' {' + n.getFilters().map(If).join(' ,') + '}'
        })(e)
      : 'Filter'
}
class Ay extends Ft {
  constructor(t, n, r) {
    ;(super(t, n, r), (this.key = Z.fromName(r.referenceValue)))
  }
  matches(t) {
    const n = Z.comparator(t.key, this.key)
    return this.matchesComparison(n)
  }
}
class Ry extends Ft {
  constructor(t, n) {
    ;(super(t, 'in', n), (this.keys = Af('in', n)))
  }
  matches(t) {
    return this.keys.some((n) => n.isEqual(t.key))
  }
}
class xy extends Ft {
  constructor(t, n) {
    ;(super(t, 'not-in', n), (this.keys = Af('not-in', n)))
  }
  matches(t) {
    return !this.keys.some((n) => n.isEqual(t.key))
  }
}
function Af(e, t) {
  var n
  return (((n = t.arrayValue) === null || n === void 0 ? void 0 : n.values) || []).map((r) =>
    Z.fromName(r.referenceValue)
  )
}
class Py extends Ft {
  constructor(t, n) {
    super(t, 'array-contains', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return Ua(n) && bs(n.arrayValue, this.value)
  }
}
class Sy extends Ft {
  constructor(t, n) {
    super(t, 'in', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return n !== null && bs(this.value.arrayValue, n)
  }
}
class Cy extends Ft {
  constructor(t, n) {
    super(t, 'not-in', n)
  }
  matches(t) {
    if (bs(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1
    const n = t.data.field(this.field)
    return n !== null && !bs(this.value.arrayValue, n)
  }
}
class Vy extends Ft {
  constructor(t, n) {
    super(t, 'array-contains-any', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return (
      !(!Ua(n) || !n.arrayValue.values) &&
      n.arrayValue.values.some((r) => bs(this.value.arrayValue, r))
    )
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ky {
  constructor(t, n = null, r = [], s = [], i = null, a = null, l = null) {
    ;((this.path = t),
      (this.collectionGroup = n),
      (this.orderBy = r),
      (this.filters = s),
      (this.limit = i),
      (this.startAt = a),
      (this.endAt = l),
      (this.ue = null))
  }
}
function ic(e, t = null, n = [], r = [], s = null, i = null, a = null) {
  return new ky(e, t, n, r, s, i, a)
}
function Ba(e) {
  const t = it(e)
  if (t.ue === null) {
    let n = t.path.canonicalString()
    ;(t.collectionGroup !== null && (n += '|cg:' + t.collectionGroup),
      (n += '|f:'),
      (n += t.filters.map((r) => sa(r)).join(',')),
      (n += '|ob:'),
      (n += t.orderBy
        .map((r) =>
          (function (i) {
            return i.field.canonicalString() + i.dir
          })(r)
        )
        .join(',')),
      zi(t.limit) || ((n += '|l:'), (n += t.limit)),
      t.startAt &&
        ((n += '|lb:'),
        (n += t.startAt.inclusive ? 'b:' : 'a:'),
        (n += t.startAt.position.map((r) => wr(r)).join(','))),
      t.endAt &&
        ((n += '|ub:'),
        (n += t.endAt.inclusive ? 'a:' : 'b:'),
        (n += t.endAt.position.map((r) => wr(r)).join(','))),
      (t.ue = n))
  }
  return t.ue
}
function ja(e, t) {
  if (e.limit !== t.limit || e.orderBy.length !== t.orderBy.length) return !1
  for (let n = 0; n < e.orderBy.length; n++) if (!by(e.orderBy[n], t.orderBy[n])) return !1
  if (e.filters.length !== t.filters.length) return !1
  for (let n = 0; n < e.filters.length; n++) if (!bf(e.filters[n], t.filters[n])) return !1
  return (
    e.collectionGroup === t.collectionGroup &&
    !!e.path.isEqual(t.path) &&
    !!sc(e.startAt, t.startAt) &&
    sc(e.endAt, t.endAt)
  )
}
function ia(e) {
  return Z.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wi {
  constructor(t, n = null, r = [], s = [], i = null, a = 'F', l = null, c = null) {
    ;((this.path = t),
      (this.collectionGroup = n),
      (this.explicitOrderBy = r),
      (this.filters = s),
      (this.limit = i),
      (this.limitType = a),
      (this.startAt = l),
      (this.endAt = c),
      (this.ce = null),
      (this.le = null),
      (this.he = null),
      this.startAt,
      this.endAt)
  }
}
function Dy(e, t, n, r, s, i, a, l) {
  return new Wi(e, t, n, r, s, i, a, l)
}
function $a(e) {
  return new Wi(e)
}
function oc(e) {
  return (
    e.filters.length === 0 &&
    e.limit === null &&
    e.startAt == null &&
    e.endAt == null &&
    (e.explicitOrderBy.length === 0 ||
      (e.explicitOrderBy.length === 1 && e.explicitOrderBy[0].field.isKeyField()))
  )
}
function Ny(e) {
  return e.collectionGroup !== null
}
function cs(e) {
  const t = it(e)
  if (t.ce === null) {
    t.ce = []
    const n = new Set()
    for (const i of t.explicitOrderBy) (t.ce.push(i), n.add(i.field.canonicalString()))
    const r =
      t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : 'asc'
    ;((function (a) {
      let l = new Wt(zt.comparator)
      return (
        a.filters.forEach((c) => {
          c.getFlattenedFilters().forEach((f) => {
            f.isInequality() && (l = l.add(f.field))
          })
        }),
        l
      )
    })(t).forEach((i) => {
      n.has(i.canonicalString()) || i.isKeyField() || t.ce.push(new Ai(i, r))
    }),
      n.has(zt.keyField().canonicalString()) || t.ce.push(new Ai(zt.keyField(), r)))
  }
  return t.ce
}
function Ue(e) {
  const t = it(e)
  return (t.le || (t.le = Oy(t, cs(e))), t.le)
}
function Oy(e, t) {
  if (e.limitType === 'F')
    return ic(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt)
  {
    t = t.map((s) => {
      const i = s.dir === 'desc' ? 'asc' : 'desc'
      return new Ai(s.field, i)
    })
    const n = e.endAt ? new Ii(e.endAt.position, e.endAt.inclusive) : null,
      r = e.startAt ? new Ii(e.startAt.position, e.startAt.inclusive) : null
    return ic(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
  }
}
function oa(e, t, n) {
  return new Wi(
    e.path,
    e.collectionGroup,
    e.explicitOrderBy.slice(),
    e.filters.slice(),
    t,
    n,
    e.startAt,
    e.endAt
  )
}
function Gi(e, t) {
  return ja(Ue(e), Ue(t)) && e.limitType === t.limitType
}
function Rf(e) {
  return `${Ba(Ue(e))}|lt:${e.limitType}`
}
function or(e) {
  return `Query(target=${(function (n) {
    let r = n.path.canonicalString()
    return (
      n.collectionGroup !== null && (r += ' collectionGroup=' + n.collectionGroup),
      n.filters.length > 0 && (r += `, filters: [${n.filters.map((s) => If(s)).join(', ')}]`),
      zi(n.limit) || (r += ', limit: ' + n.limit),
      n.orderBy.length > 0 &&
        (r += `, orderBy: [${n.orderBy
          .map((s) =>
            (function (a) {
              return `${a.field.canonicalString()} (${a.dir})`
            })(s)
          )
          .join(', ')}]`),
      n.startAt &&
        ((r += ', startAt: '),
        (r += n.startAt.inclusive ? 'b:' : 'a:'),
        (r += n.startAt.position.map((s) => wr(s)).join(','))),
      n.endAt &&
        ((r += ', endAt: '),
        (r += n.endAt.inclusive ? 'a:' : 'b:'),
        (r += n.endAt.position.map((s) => wr(s)).join(','))),
      `Target(${r})`
    )
  })(Ue(e))}; limitType=${e.limitType})`
}
function Qi(e, t) {
  return (
    t.isFoundDocument() &&
    (function (r, s) {
      const i = s.key.path
      return r.collectionGroup !== null
        ? s.key.hasCollectionId(r.collectionGroup) && r.path.isPrefixOf(i)
        : Z.isDocumentKey(r.path)
          ? r.path.isEqual(i)
          : r.path.isImmediateParentOf(i)
    })(e, t) &&
    (function (r, s) {
      for (const i of cs(r)) if (!i.field.isKeyField() && s.data.field(i.field) === null) return !1
      return !0
    })(e, t) &&
    (function (r, s) {
      for (const i of r.filters) if (!i.matches(s)) return !1
      return !0
    })(e, t) &&
    (function (r, s) {
      return !(
        (r.startAt &&
          !(function (a, l, c) {
            const f = rc(a, l, c)
            return a.inclusive ? f <= 0 : f < 0
          })(r.startAt, cs(r), s)) ||
        (r.endAt &&
          !(function (a, l, c) {
            const f = rc(a, l, c)
            return a.inclusive ? f >= 0 : f > 0
          })(r.endAt, cs(r), s))
      )
    })(e, t)
  )
}
function My(e) {
  return (
    e.collectionGroup ||
    (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
  )
}
function xf(e) {
  return (t, n) => {
    let r = !1
    for (const s of cs(e)) {
      const i = Ly(s, t, n)
      if (i !== 0) return i
      r = r || s.field.isKeyField()
    }
    return 0
  }
}
function Ly(e, t, n) {
  const r = e.field.isKeyField()
    ? Z.comparator(t.key, n.key)
    : (function (i, a, l) {
        const c = a.data.field(i),
          f = l.data.field(i)
        return c !== null && f !== null ? Tr(c, f) : rt()
      })(e.field, t, n)
  switch (e.dir) {
    case 'asc':
      return r
    case 'desc':
      return -1 * r
    default:
      return rt()
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Sr {
  constructor(t, n) {
    ;((this.mapKeyFn = t), (this.equalsFn = n), (this.inner = {}), (this.innerSize = 0))
  }
  get(t) {
    const n = this.mapKeyFn(t),
      r = this.inner[n]
    if (r !== void 0) {
      for (const [s, i] of r) if (this.equalsFn(s, t)) return i
    }
  }
  has(t) {
    return this.get(t) !== void 0
  }
  set(t, n) {
    const r = this.mapKeyFn(t),
      s = this.inner[r]
    if (s === void 0) return ((this.inner[r] = [[t, n]]), void this.innerSize++)
    for (let i = 0; i < s.length; i++) if (this.equalsFn(s[i][0], t)) return void (s[i] = [t, n])
    ;(s.push([t, n]), this.innerSize++)
  }
  delete(t) {
    const n = this.mapKeyFn(t),
      r = this.inner[n]
    if (r === void 0) return !1
    for (let s = 0; s < r.length; s++)
      if (this.equalsFn(r[s][0], t))
        return (r.length === 1 ? delete this.inner[n] : r.splice(s, 1), this.innerSize--, !0)
    return !1
  }
  forEach(t) {
    Pr(this.inner, (n, r) => {
      for (const [s, i] of r) t(s, i)
    })
  }
  isEmpty() {
    return _f(this.inner)
  }
  size() {
    return this.innerSize
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Fy = new Ct(Z.comparator)
function cn() {
  return Fy
}
const Pf = new Ct(Z.comparator)
function ts(...e) {
  let t = Pf
  for (const n of e) t = t.insert(n.key, n)
  return t
}
function Sf(e) {
  let t = Pf
  return (e.forEach((n, r) => (t = t.insert(n, r.overlayedDocument))), t)
}
function $n() {
  return hs()
}
function Cf() {
  return hs()
}
function hs() {
  return new Sr(
    (e) => e.toString(),
    (e, t) => e.isEqual(t)
  )
}
const Uy = new Ct(Z.comparator),
  By = new Wt(Z.comparator)
function lt(...e) {
  let t = By
  for (const n of e) t = t.add(n)
  return t
}
const jy = new Wt(mt)
function $y() {
  return jy
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function qa(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t)) return { doubleValue: 'NaN' }
    if (t === 1 / 0) return { doubleValue: 'Infinity' }
    if (t === -1 / 0) return { doubleValue: '-Infinity' }
  }
  return { doubleValue: bi(t) ? '-0' : t }
}
function Vf(e) {
  return { integerValue: '' + e }
}
function qy(e, t) {
  return yy(t) ? Vf(t) : qa(e, t)
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Yi {
  constructor() {
    this._ = void 0
  }
}
function Ky(e, t, n) {
  return e instanceof Is
    ? (function (s, i) {
        const a = {
          fields: {
            __type__: { stringValue: 'server_timestamp' },
            __local_write_time__: { timestampValue: { seconds: s.seconds, nanos: s.nanoseconds } }
          }
        }
        return (i && La(i) && (i = Fa(i)), i && (a.fields.__previous_value__ = i), { mapValue: a })
      })(n, t)
    : e instanceof As
      ? Df(e, t)
      : e instanceof Rs
        ? Nf(e, t)
        : (function (s, i) {
            const a = kf(s, i),
              l = ac(a) + ac(s.Pe)
            return ra(a) && ra(s.Pe) ? Vf(l) : qa(s.serializer, l)
          })(e, t)
}
function Hy(e, t, n) {
  return e instanceof As ? Df(e, t) : e instanceof Rs ? Nf(e, t) : n
}
function kf(e, t) {
  return e instanceof Ri
    ? (function (r) {
        return (
          ra(r) ||
          (function (i) {
            return !!i && 'doubleValue' in i
          })(r)
        )
      })(t)
      ? t
      : { integerValue: 0 }
    : null
}
class Is extends Yi {}
class As extends Yi {
  constructor(t) {
    ;(super(), (this.elements = t))
  }
}
function Df(e, t) {
  const n = Of(t)
  for (const r of e.elements) n.some((s) => qe(s, r)) || n.push(r)
  return { arrayValue: { values: n } }
}
class Rs extends Yi {
  constructor(t) {
    ;(super(), (this.elements = t))
  }
}
function Nf(e, t) {
  let n = Of(t)
  for (const r of e.elements) n = n.filter((s) => !qe(s, r))
  return { arrayValue: { values: n } }
}
class Ri extends Yi {
  constructor(t, n) {
    ;(super(), (this.serializer = t), (this.Pe = n))
  }
}
function ac(e) {
  return Dt(e.integerValue || e.doubleValue)
}
function Of(e) {
  return Ua(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class zy {
  constructor(t, n) {
    ;((this.field = t), (this.transform = n))
  }
}
function Wy(e, t) {
  return (
    e.field.isEqual(t.field) &&
    (function (r, s) {
      return (r instanceof As && s instanceof As) || (r instanceof Rs && s instanceof Rs)
        ? Er(r.elements, s.elements, qe)
        : r instanceof Ri && s instanceof Ri
          ? qe(r.Pe, s.Pe)
          : r instanceof Is && s instanceof Is
    })(e.transform, t.transform)
  )
}
class Gy {
  constructor(t, n) {
    ;((this.version = t), (this.transformResults = n))
  }
}
class rn {
  constructor(t, n) {
    ;((this.updateTime = t), (this.exists = n))
  }
  static none() {
    return new rn()
  }
  static exists(t) {
    return new rn(void 0, t)
  }
  static updateTime(t) {
    return new rn(t)
  }
  get isNone() {
    return this.updateTime === void 0 && this.exists === void 0
  }
  isEqual(t) {
    return (
      this.exists === t.exists &&
      (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime)
    )
  }
}
function di(e, t) {
  return e.updateTime !== void 0
    ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
    : e.exists === void 0 || e.exists === t.isFoundDocument()
}
class Xi {}
function Mf(e, t) {
  if (!e.hasLocalMutations || (t && t.fields.length === 0)) return null
  if (t === null)
    return e.isNoDocument() ? new Ff(e.key, rn.none()) : new ks(e.key, e.data, rn.none())
  {
    const n = e.data,
      r = _e.empty()
    let s = new Wt(zt.comparator)
    for (let i of t.fields)
      if (!s.has(i)) {
        let a = n.field(i)
        ;(a === null && i.length > 1 && ((i = i.popLast()), (a = n.field(i))),
          a === null ? r.delete(i) : r.set(i, a),
          (s = s.add(i)))
      }
    return new Xn(e.key, r, new Ie(s.toArray()), rn.none())
  }
}
function Qy(e, t, n) {
  e instanceof ks
    ? (function (s, i, a) {
        const l = s.value.clone(),
          c = uc(s.fieldTransforms, i, a.transformResults)
        ;(l.setAll(c), i.convertToFoundDocument(a.version, l).setHasCommittedMutations())
      })(e, t, n)
    : e instanceof Xn
      ? (function (s, i, a) {
          if (!di(s.precondition, i)) return void i.convertToUnknownDocument(a.version)
          const l = uc(s.fieldTransforms, i, a.transformResults),
            c = i.data
          ;(c.setAll(Lf(s)),
            c.setAll(l),
            i.convertToFoundDocument(a.version, c).setHasCommittedMutations())
        })(e, t, n)
      : (function (s, i, a) {
          i.convertToNoDocument(a.version).setHasCommittedMutations()
        })(0, t, n)
}
function fs(e, t, n, r) {
  return e instanceof ks
    ? (function (i, a, l, c) {
        if (!di(i.precondition, a)) return l
        const f = i.value.clone(),
          d = cc(i.fieldTransforms, c, a)
        return (f.setAll(d), a.convertToFoundDocument(a.version, f).setHasLocalMutations(), null)
      })(e, t, n, r)
    : e instanceof Xn
      ? (function (i, a, l, c) {
          if (!di(i.precondition, a)) return l
          const f = cc(i.fieldTransforms, c, a),
            d = a.data
          return (
            d.setAll(Lf(i)),
            d.setAll(f),
            a.convertToFoundDocument(a.version, d).setHasLocalMutations(),
            l === null
              ? null
              : l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m) => m.field))
          )
        })(e, t, n, r)
      : (function (i, a, l) {
          return di(i.precondition, a)
            ? (a.convertToNoDocument(a.version).setHasLocalMutations(), null)
            : l
        })(e, t, n)
}
function Yy(e, t) {
  let n = null
  for (const r of e.fieldTransforms) {
    const s = t.data.field(r.field),
      i = kf(r.transform, s || null)
    i != null && (n === null && (n = _e.empty()), n.set(r.field, i))
  }
  return n || null
}
function lc(e, t) {
  return (
    e.type === t.type &&
    !!e.key.isEqual(t.key) &&
    !!e.precondition.isEqual(t.precondition) &&
    !!(function (r, s) {
      return (r === void 0 && s === void 0) || (!(!r || !s) && Er(r, s, (i, a) => Wy(i, a)))
    })(e.fieldTransforms, t.fieldTransforms) &&
    (e.type === 0
      ? e.value.isEqual(t.value)
      : e.type !== 1 || (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
  )
}
class ks extends Xi {
  constructor(t, n, r, s = []) {
    ;(super(),
      (this.key = t),
      (this.value = n),
      (this.precondition = r),
      (this.fieldTransforms = s),
      (this.type = 0))
  }
  getFieldMask() {
    return null
  }
}
class Xn extends Xi {
  constructor(t, n, r, s, i = []) {
    ;(super(),
      (this.key = t),
      (this.data = n),
      (this.fieldMask = r),
      (this.precondition = s),
      (this.fieldTransforms = i),
      (this.type = 1))
  }
  getFieldMask() {
    return this.fieldMask
  }
}
function Lf(e) {
  const t = new Map()
  return (
    e.fieldMask.fields.forEach((n) => {
      if (!n.isEmpty()) {
        const r = e.data.field(n)
        t.set(n, r)
      }
    }),
    t
  )
}
function uc(e, t, n) {
  const r = new Map()
  Tt(e.length === n.length)
  for (let s = 0; s < n.length; s++) {
    const i = e[s],
      a = i.transform,
      l = t.data.field(i.field)
    r.set(i.field, Hy(a, l, n[s]))
  }
  return r
}
function cc(e, t, n) {
  const r = new Map()
  for (const s of e) {
    const i = s.transform,
      a = n.data.field(s.field)
    r.set(s.field, Ky(i, a, t))
  }
  return r
}
class Ff extends Xi {
  constructor(t, n) {
    ;(super(),
      (this.key = t),
      (this.precondition = n),
      (this.type = 2),
      (this.fieldTransforms = []))
  }
  getFieldMask() {
    return null
  }
}
class Xy extends Xi {
  constructor(t, n) {
    ;(super(),
      (this.key = t),
      (this.precondition = n),
      (this.type = 3),
      (this.fieldTransforms = []))
  }
  getFieldMask() {
    return null
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jy {
  constructor(t, n, r, s) {
    ;((this.batchId = t), (this.localWriteTime = n), (this.baseMutations = r), (this.mutations = s))
  }
  applyToRemoteDocument(t, n) {
    const r = n.mutationResults
    for (let s = 0; s < this.mutations.length; s++) {
      const i = this.mutations[s]
      i.key.isEqual(t.key) && Qy(i, t, r[s])
    }
  }
  applyToLocalView(t, n) {
    for (const r of this.baseMutations)
      r.key.isEqual(t.key) && (n = fs(r, t, n, this.localWriteTime))
    for (const r of this.mutations) r.key.isEqual(t.key) && (n = fs(r, t, n, this.localWriteTime))
    return n
  }
  applyToLocalDocumentSet(t, n) {
    const r = Cf()
    return (
      this.mutations.forEach((s) => {
        const i = t.get(s.key),
          a = i.overlayedDocument
        let l = this.applyToLocalView(a, i.mutatedFields)
        l = n.has(s.key) ? null : l
        const c = Mf(a, l)
        ;(c !== null && r.set(s.key, c), a.isValidDocument() || a.convertToNoDocument(st.min()))
      }),
      r
    )
  }
  keys() {
    return this.mutations.reduce((t, n) => t.add(n.key), lt())
  }
  isEqual(t) {
    return (
      this.batchId === t.batchId &&
      Er(this.mutations, t.mutations, (n, r) => lc(n, r)) &&
      Er(this.baseMutations, t.baseMutations, (n, r) => lc(n, r))
    )
  }
}
class Ka {
  constructor(t, n, r, s) {
    ;((this.batch = t),
      (this.commitVersion = n),
      (this.mutationResults = r),
      (this.docVersions = s))
  }
  static from(t, n, r) {
    Tt(t.mutations.length === r.length)
    let s = (function () {
      return Uy
    })()
    const i = t.mutations
    for (let a = 0; a < i.length; a++) s = s.insert(i[a].key, r[a].version)
    return new Ka(t, n, r, s)
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Zy {
  constructor(t, n) {
    ;((this.largestBatchId = t), (this.mutation = n))
  }
  getKey() {
    return this.mutation.key
  }
  isEqual(t) {
    return t !== null && this.mutation === t.mutation
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tv {
  constructor(t, n) {
    ;((this.count = t), (this.unchangedNames = n))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Ot, ct
function ev(e) {
  switch (e) {
    default:
      return rt()
    case j.CANCELLED:
    case j.UNKNOWN:
    case j.DEADLINE_EXCEEDED:
    case j.RESOURCE_EXHAUSTED:
    case j.INTERNAL:
    case j.UNAVAILABLE:
    case j.UNAUTHENTICATED:
      return !1
    case j.INVALID_ARGUMENT:
    case j.NOT_FOUND:
    case j.ALREADY_EXISTS:
    case j.PERMISSION_DENIED:
    case j.FAILED_PRECONDITION:
    case j.ABORTED:
    case j.OUT_OF_RANGE:
    case j.UNIMPLEMENTED:
    case j.DATA_LOSS:
      return !0
  }
}
function Uf(e) {
  if (e === void 0) return (un('GRPC error has no .code'), j.UNKNOWN)
  switch (e) {
    case Ot.OK:
      return j.OK
    case Ot.CANCELLED:
      return j.CANCELLED
    case Ot.UNKNOWN:
      return j.UNKNOWN
    case Ot.DEADLINE_EXCEEDED:
      return j.DEADLINE_EXCEEDED
    case Ot.RESOURCE_EXHAUSTED:
      return j.RESOURCE_EXHAUSTED
    case Ot.INTERNAL:
      return j.INTERNAL
    case Ot.UNAVAILABLE:
      return j.UNAVAILABLE
    case Ot.UNAUTHENTICATED:
      return j.UNAUTHENTICATED
    case Ot.INVALID_ARGUMENT:
      return j.INVALID_ARGUMENT
    case Ot.NOT_FOUND:
      return j.NOT_FOUND
    case Ot.ALREADY_EXISTS:
      return j.ALREADY_EXISTS
    case Ot.PERMISSION_DENIED:
      return j.PERMISSION_DENIED
    case Ot.FAILED_PRECONDITION:
      return j.FAILED_PRECONDITION
    case Ot.ABORTED:
      return j.ABORTED
    case Ot.OUT_OF_RANGE:
      return j.OUT_OF_RANGE
    case Ot.UNIMPLEMENTED:
      return j.UNIMPLEMENTED
    case Ot.DATA_LOSS:
      return j.DATA_LOSS
    default:
      return rt()
  }
}
;(((ct = Ot || (Ot = {}))[(ct.OK = 0)] = 'OK'),
  (ct[(ct.CANCELLED = 1)] = 'CANCELLED'),
  (ct[(ct.UNKNOWN = 2)] = 'UNKNOWN'),
  (ct[(ct.INVALID_ARGUMENT = 3)] = 'INVALID_ARGUMENT'),
  (ct[(ct.DEADLINE_EXCEEDED = 4)] = 'DEADLINE_EXCEEDED'),
  (ct[(ct.NOT_FOUND = 5)] = 'NOT_FOUND'),
  (ct[(ct.ALREADY_EXISTS = 6)] = 'ALREADY_EXISTS'),
  (ct[(ct.PERMISSION_DENIED = 7)] = 'PERMISSION_DENIED'),
  (ct[(ct.UNAUTHENTICATED = 16)] = 'UNAUTHENTICATED'),
  (ct[(ct.RESOURCE_EXHAUSTED = 8)] = 'RESOURCE_EXHAUSTED'),
  (ct[(ct.FAILED_PRECONDITION = 9)] = 'FAILED_PRECONDITION'),
  (ct[(ct.ABORTED = 10)] = 'ABORTED'),
  (ct[(ct.OUT_OF_RANGE = 11)] = 'OUT_OF_RANGE'),
  (ct[(ct.UNIMPLEMENTED = 12)] = 'UNIMPLEMENTED'),
  (ct[(ct.INTERNAL = 13)] = 'INTERNAL'),
  (ct[(ct.UNAVAILABLE = 14)] = 'UNAVAILABLE'),
  (ct[(ct.DATA_LOSS = 15)] = 'DATA_LOSS'))
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function nv() {
  return new TextEncoder()
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const rv = new Hn([4294967295, 4294967295], 0)
function hc(e) {
  const t = nv().encode(e),
    n = new uf()
  return (n.update(t), new Uint8Array(n.digest()))
}
function fc(e) {
  const t = new DataView(e.buffer),
    n = t.getUint32(0, !0),
    r = t.getUint32(4, !0),
    s = t.getUint32(8, !0),
    i = t.getUint32(12, !0)
  return [new Hn([n, r], 0), new Hn([s, i], 0)]
}
class Ha {
  constructor(t, n, r) {
    if (((this.bitmap = t), (this.padding = n), (this.hashCount = r), n < 0 || n >= 8))
      throw new es(`Invalid padding: ${n}`)
    if (r < 0) throw new es(`Invalid hash count: ${r}`)
    if (t.length > 0 && this.hashCount === 0) throw new es(`Invalid hash count: ${r}`)
    if (t.length === 0 && n !== 0) throw new es(`Invalid padding when bitmap length is 0: ${n}`)
    ;((this.Ie = 8 * t.length - n), (this.Te = Hn.fromNumber(this.Ie)))
  }
  Ee(t, n, r) {
    let s = t.add(n.multiply(Hn.fromNumber(r)))
    return (
      s.compare(rv) === 1 && (s = new Hn([s.getBits(0), s.getBits(1)], 0)),
      s.modulo(this.Te).toNumber()
    )
  }
  de(t) {
    return (this.bitmap[Math.floor(t / 8)] & (1 << (t % 8))) != 0
  }
  mightContain(t) {
    if (this.Ie === 0) return !1
    const n = hc(t),
      [r, s] = fc(n)
    for (let i = 0; i < this.hashCount; i++) {
      const a = this.Ee(r, s, i)
      if (!this.de(a)) return !1
    }
    return !0
  }
  static create(t, n, r) {
    const s = t % 8 == 0 ? 0 : 8 - (t % 8),
      i = new Uint8Array(Math.ceil(t / 8)),
      a = new Ha(i, s, n)
    return (r.forEach((l) => a.insert(l)), a)
  }
  insert(t) {
    if (this.Ie === 0) return
    const n = hc(t),
      [r, s] = fc(n)
    for (let i = 0; i < this.hashCount; i++) {
      const a = this.Ee(r, s, i)
      this.Ae(a)
    }
  }
  Ae(t) {
    const n = Math.floor(t / 8),
      r = t % 8
    this.bitmap[n] |= 1 << r
  }
}
class es extends Error {
  constructor() {
    ;(super(...arguments), (this.name = 'BloomFilterError'))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ji {
  constructor(t, n, r, s, i) {
    ;((this.snapshotVersion = t),
      (this.targetChanges = n),
      (this.targetMismatches = r),
      (this.documentUpdates = s),
      (this.resolvedLimboDocuments = i))
  }
  static createSynthesizedRemoteEventForCurrentChange(t, n, r) {
    const s = new Map()
    return (
      s.set(t, Ds.createSynthesizedTargetChangeForCurrentChange(t, n, r)),
      new Ji(st.min(), s, new Ct(mt), cn(), lt())
    )
  }
}
class Ds {
  constructor(t, n, r, s, i) {
    ;((this.resumeToken = t),
      (this.current = n),
      (this.addedDocuments = r),
      (this.modifiedDocuments = s),
      (this.removedDocuments = i))
  }
  static createSynthesizedTargetChangeForCurrentChange(t, n, r) {
    return new Ds(r, n, lt(), lt(), lt())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pi {
  constructor(t, n, r, s) {
    ;((this.Re = t), (this.removedTargetIds = n), (this.key = r), (this.Ve = s))
  }
}
class Bf {
  constructor(t, n) {
    ;((this.targetId = t), (this.me = n))
  }
}
class jf {
  constructor(t, n, r = Gt.EMPTY_BYTE_STRING, s = null) {
    ;((this.state = t), (this.targetIds = n), (this.resumeToken = r), (this.cause = s))
  }
}
class dc {
  constructor() {
    ;((this.fe = 0),
      (this.ge = mc()),
      (this.pe = Gt.EMPTY_BYTE_STRING),
      (this.ye = !1),
      (this.we = !0))
  }
  get current() {
    return this.ye
  }
  get resumeToken() {
    return this.pe
  }
  get Se() {
    return this.fe !== 0
  }
  get be() {
    return this.we
  }
  De(t) {
    t.approximateByteSize() > 0 && ((this.we = !0), (this.pe = t))
  }
  ve() {
    let t = lt(),
      n = lt(),
      r = lt()
    return (
      this.ge.forEach((s, i) => {
        switch (i) {
          case 0:
            t = t.add(s)
            break
          case 2:
            n = n.add(s)
            break
          case 1:
            r = r.add(s)
            break
          default:
            rt()
        }
      }),
      new Ds(this.pe, this.ye, t, n, r)
    )
  }
  Ce() {
    ;((this.we = !1), (this.ge = mc()))
  }
  Fe(t, n) {
    ;((this.we = !0), (this.ge = this.ge.insert(t, n)))
  }
  Me(t) {
    ;((this.we = !0), (this.ge = this.ge.remove(t)))
  }
  xe() {
    this.fe += 1
  }
  Oe() {
    ;((this.fe -= 1), Tt(this.fe >= 0))
  }
  Ne() {
    ;((this.we = !0), (this.ye = !0))
  }
}
class sv {
  constructor(t) {
    ;((this.Le = t),
      (this.Be = new Map()),
      (this.ke = cn()),
      (this.qe = pc()),
      (this.Qe = new Ct(mt)))
  }
  Ke(t) {
    for (const n of t.Re)
      t.Ve && t.Ve.isFoundDocument() ? this.$e(n, t.Ve) : this.Ue(n, t.key, t.Ve)
    for (const n of t.removedTargetIds) this.Ue(n, t.key, t.Ve)
  }
  We(t) {
    this.forEachTarget(t, (n) => {
      const r = this.Ge(n)
      switch (t.state) {
        case 0:
          this.ze(n) && r.De(t.resumeToken)
          break
        case 1:
          ;(r.Oe(), r.Se || r.Ce(), r.De(t.resumeToken))
          break
        case 2:
          ;(r.Oe(), r.Se || this.removeTarget(n))
          break
        case 3:
          this.ze(n) && (r.Ne(), r.De(t.resumeToken))
          break
        case 4:
          this.ze(n) && (this.je(n), r.De(t.resumeToken))
          break
        default:
          rt()
      }
    })
  }
  forEachTarget(t, n) {
    t.targetIds.length > 0
      ? t.targetIds.forEach(n)
      : this.Be.forEach((r, s) => {
          this.ze(s) && n(s)
        })
  }
  He(t) {
    const n = t.targetId,
      r = t.me.count,
      s = this.Je(n)
    if (s) {
      const i = s.target
      if (ia(i))
        if (r === 0) {
          const a = new Z(i.path)
          this.Ue(n, a, ee.newNoDocument(a, st.min()))
        } else Tt(r === 1)
      else {
        const a = this.Ye(n)
        if (a !== r) {
          const l = this.Ze(t),
            c = l ? this.Xe(l, t, a) : 1
          if (c !== 0) {
            this.je(n)
            const f =
              c === 2
                ? 'TargetPurposeExistenceFilterMismatchBloom'
                : 'TargetPurposeExistenceFilterMismatch'
            this.Qe = this.Qe.insert(n, f)
          }
        }
      }
    }
  }
  Ze(t) {
    const n = t.me.unchangedNames
    if (!n || !n.bits) return null
    const {
      bits: { bitmap: r = '', padding: s = 0 },
      hashCount: i = 0
    } = n
    let a, l
    try {
      a = Wn(r).toUint8Array()
    } catch (c) {
      if (c instanceof yf)
        return (
          vr(
            'Decoding the base64 bloom filter in existence filter failed (' +
              c.message +
              '); ignoring the bloom filter and falling back to full re-query.'
          ),
          null
        )
      throw c
    }
    try {
      l = new Ha(a, s, i)
    } catch (c) {
      return (
        vr(c instanceof es ? 'BloomFilter error: ' : 'Applying bloom filter failed: ', c),
        null
      )
    }
    return l.Ie === 0 ? null : l
  }
  Xe(t, n, r) {
    return n.me.count === r - this.nt(t, n.targetId) ? 0 : 2
  }
  nt(t, n) {
    const r = this.Le.getRemoteKeysForTarget(n)
    let s = 0
    return (
      r.forEach((i) => {
        const a = this.Le.tt(),
          l = `projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`
        t.mightContain(l) || (this.Ue(n, i, null), s++)
      }),
      s
    )
  }
  rt(t) {
    const n = new Map()
    this.Be.forEach((i, a) => {
      const l = this.Je(a)
      if (l) {
        if (i.current && ia(l.target)) {
          const c = new Z(l.target.path)
          this.ke.get(c) !== null || this.it(a, c) || this.Ue(a, c, ee.newNoDocument(c, t))
        }
        i.be && (n.set(a, i.ve()), i.Ce())
      }
    })
    let r = lt()
    ;(this.qe.forEach((i, a) => {
      let l = !0
      ;(a.forEachWhile((c) => {
        const f = this.Je(c)
        return !f || f.purpose === 'TargetPurposeLimboResolution' || ((l = !1), !1)
      }),
        l && (r = r.add(i)))
    }),
      this.ke.forEach((i, a) => a.setReadTime(t)))
    const s = new Ji(t, n, this.Qe, this.ke, r)
    return ((this.ke = cn()), (this.qe = pc()), (this.Qe = new Ct(mt)), s)
  }
  $e(t, n) {
    if (!this.ze(t)) return
    const r = this.it(t, n.key) ? 2 : 0
    ;(this.Ge(t).Fe(n.key, r),
      (this.ke = this.ke.insert(n.key, n)),
      (this.qe = this.qe.insert(n.key, this.st(n.key).add(t))))
  }
  Ue(t, n, r) {
    if (!this.ze(t)) return
    const s = this.Ge(t)
    ;(this.it(t, n) ? s.Fe(n, 1) : s.Me(n),
      (this.qe = this.qe.insert(n, this.st(n).delete(t))),
      r && (this.ke = this.ke.insert(n, r)))
  }
  removeTarget(t) {
    this.Be.delete(t)
  }
  Ye(t) {
    const n = this.Ge(t).ve()
    return this.Le.getRemoteKeysForTarget(t).size + n.addedDocuments.size - n.removedDocuments.size
  }
  xe(t) {
    this.Ge(t).xe()
  }
  Ge(t) {
    let n = this.Be.get(t)
    return (n || ((n = new dc()), this.Be.set(t, n)), n)
  }
  st(t) {
    let n = this.qe.get(t)
    return (n || ((n = new Wt(mt)), (this.qe = this.qe.insert(t, n))), n)
  }
  ze(t) {
    const n = this.Je(t) !== null
    return (n || Q('WatchChangeAggregator', 'Detected inactive target', t), n)
  }
  Je(t) {
    const n = this.Be.get(t)
    return n && n.Se ? null : this.Le.ot(t)
  }
  je(t) {
    ;(this.Be.set(t, new dc()),
      this.Le.getRemoteKeysForTarget(t).forEach((n) => {
        this.Ue(t, n, null)
      }))
  }
  it(t, n) {
    return this.Le.getRemoteKeysForTarget(t).has(n)
  }
}
function pc() {
  return new Ct(Z.comparator)
}
function mc() {
  return new Ct(Z.comparator)
}
const iv = { asc: 'ASCENDING', desc: 'DESCENDING' },
  ov = {
    '<': 'LESS_THAN',
    '<=': 'LESS_THAN_OR_EQUAL',
    '>': 'GREATER_THAN',
    '>=': 'GREATER_THAN_OR_EQUAL',
    '==': 'EQUAL',
    '!=': 'NOT_EQUAL',
    'array-contains': 'ARRAY_CONTAINS',
    in: 'IN',
    'not-in': 'NOT_IN',
    'array-contains-any': 'ARRAY_CONTAINS_ANY'
  },
  av = { and: 'AND', or: 'OR' }
class lv {
  constructor(t, n) {
    ;((this.databaseId = t), (this.useProto3Json = n))
  }
}
function aa(e, t) {
  return e.useProto3Json || zi(t) ? t : { value: t }
}
function xi(e, t) {
  return e.useProto3Json
    ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, '').replace('Z', '')}.${('000000000' + t.nanoseconds).slice(-9)}Z`
    : { seconds: '' + t.seconds, nanos: t.nanoseconds }
}
function $f(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array()
}
function uv(e, t) {
  return xi(e, t.toTimestamp())
}
function Be(e) {
  return (
    Tt(!!e),
    st.fromTimestamp(
      (function (n) {
        const r = Sn(n)
        return new Ut(r.seconds, r.nanos)
      })(e)
    )
  )
}
function za(e, t) {
  return la(e, t).canonicalString()
}
function la(e, t) {
  const n = (function (s) {
    return new Pt(['projects', s.projectId, 'databases', s.database])
  })(e).child('documents')
  return t === void 0 ? n : n.child(t)
}
function qf(e) {
  const t = Pt.fromString(e)
  return (Tt(Gf(t)), t)
}
function ua(e, t) {
  return za(e.databaseId, t.path)
}
function Do(e, t) {
  const n = qf(t)
  if (n.get(1) !== e.databaseId.projectId)
    throw new X(
      j.INVALID_ARGUMENT,
      'Tried to deserialize key from different project: ' +
        n.get(1) +
        ' vs ' +
        e.databaseId.projectId
    )
  if (n.get(3) !== e.databaseId.database)
    throw new X(
      j.INVALID_ARGUMENT,
      'Tried to deserialize key from different database: ' +
        n.get(3) +
        ' vs ' +
        e.databaseId.database
    )
  return new Z(Hf(n))
}
function Kf(e, t) {
  return za(e.databaseId, t)
}
function cv(e) {
  const t = qf(e)
  return t.length === 4 ? Pt.emptyPath() : Hf(t)
}
function ca(e) {
  return new Pt([
    'projects',
    e.databaseId.projectId,
    'databases',
    e.databaseId.database
  ]).canonicalString()
}
function Hf(e) {
  return (Tt(e.length > 4 && e.get(4) === 'documents'), e.popFirst(5))
}
function gc(e, t, n) {
  return { name: ua(e, t), fields: n.value.mapValue.fields }
}
function hv(e, t) {
  let n
  if ('targetChange' in t) {
    t.targetChange
    const r = (function (f) {
        return f === 'NO_CHANGE'
          ? 0
          : f === 'ADD'
            ? 1
            : f === 'REMOVE'
              ? 2
              : f === 'CURRENT'
                ? 3
                : f === 'RESET'
                  ? 4
                  : rt()
      })(t.targetChange.targetChangeType || 'NO_CHANGE'),
      s = t.targetChange.targetIds || [],
      i = (function (f, d) {
        return f.useProto3Json
          ? (Tt(d === void 0 || typeof d == 'string'), Gt.fromBase64String(d || ''))
          : (Tt(d === void 0 || d instanceof Buffer || d instanceof Uint8Array),
            Gt.fromUint8Array(d || new Uint8Array()))
      })(e, t.targetChange.resumeToken),
      a = t.targetChange.cause,
      l =
        a &&
        (function (f) {
          const d = f.code === void 0 ? j.UNKNOWN : Uf(f.code)
          return new X(d, f.message || '')
        })(a)
    n = new jf(r, s, i, l || null)
  } else if ('documentChange' in t) {
    t.documentChange
    const r = t.documentChange
    ;(r.document, r.document.name, r.document.updateTime)
    const s = Do(e, r.document.name),
      i = Be(r.document.updateTime),
      a = r.document.createTime ? Be(r.document.createTime) : st.min(),
      l = new _e({ mapValue: { fields: r.document.fields } }),
      c = ee.newFoundDocument(s, i, a, l),
      f = r.targetIds || [],
      d = r.removedTargetIds || []
    n = new pi(f, d, c.key, c)
  } else if ('documentDelete' in t) {
    t.documentDelete
    const r = t.documentDelete
    r.document
    const s = Do(e, r.document),
      i = r.readTime ? Be(r.readTime) : st.min(),
      a = ee.newNoDocument(s, i),
      l = r.removedTargetIds || []
    n = new pi([], l, a.key, a)
  } else if ('documentRemove' in t) {
    t.documentRemove
    const r = t.documentRemove
    r.document
    const s = Do(e, r.document),
      i = r.removedTargetIds || []
    n = new pi([], i, s, null)
  } else {
    if (!('filter' in t)) return rt()
    {
      t.filter
      const r = t.filter
      r.targetId
      const { count: s = 0, unchangedNames: i } = r,
        a = new tv(s, i),
        l = r.targetId
      n = new Bf(l, a)
    }
  }
  return n
}
function fv(e, t) {
  let n
  if (t instanceof ks) n = { update: gc(e, t.key, t.value) }
  else if (t instanceof Ff) n = { delete: ua(e, t.key) }
  else if (t instanceof Xn) n = { update: gc(e, t.key, t.data), updateMask: Tv(t.fieldMask) }
  else {
    if (!(t instanceof Xy)) return rt()
    n = { verify: ua(e, t.key) }
  }
  return (
    t.fieldTransforms.length > 0 &&
      (n.updateTransforms = t.fieldTransforms.map((r) =>
        (function (i, a) {
          const l = a.transform
          if (l instanceof Is)
            return { fieldPath: a.field.canonicalString(), setToServerValue: 'REQUEST_TIME' }
          if (l instanceof As)
            return {
              fieldPath: a.field.canonicalString(),
              appendMissingElements: { values: l.elements }
            }
          if (l instanceof Rs)
            return {
              fieldPath: a.field.canonicalString(),
              removeAllFromArray: { values: l.elements }
            }
          if (l instanceof Ri) return { fieldPath: a.field.canonicalString(), increment: l.Pe }
          throw rt()
        })(0, r)
      )),
    t.precondition.isNone ||
      (n.currentDocument = (function (s, i) {
        return i.updateTime !== void 0
          ? { updateTime: uv(s, i.updateTime) }
          : i.exists !== void 0
            ? { exists: i.exists }
            : rt()
      })(e, t.precondition)),
    n
  )
}
function dv(e, t) {
  return e && e.length > 0
    ? (Tt(t !== void 0),
      e.map((n) =>
        (function (s, i) {
          let a = s.updateTime ? Be(s.updateTime) : Be(i)
          return (a.isEqual(st.min()) && (a = Be(i)), new Gy(a, s.transformResults || []))
        })(n, t)
      ))
    : []
}
function pv(e, t) {
  return { documents: [Kf(e, t.path)] }
}
function mv(e, t) {
  const n = { structuredQuery: {} },
    r = t.path
  let s
  ;(t.collectionGroup !== null
    ? ((s = r),
      (n.structuredQuery.from = [{ collectionId: t.collectionGroup, allDescendants: !0 }]))
    : ((s = r.popLast()), (n.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
    (n.parent = Kf(e, s)))
  const i = (function (f) {
    if (f.length !== 0) return Wf(Ke.create(f, 'and'))
  })(t.filters)
  i && (n.structuredQuery.where = i)
  const a = (function (f) {
    if (f.length !== 0)
      return f.map((d) =>
        (function (w) {
          return { field: ar(w.field), direction: yv(w.dir) }
        })(d)
      )
  })(t.orderBy)
  a && (n.structuredQuery.orderBy = a)
  const l = aa(e, t.limit)
  return (
    l !== null && (n.structuredQuery.limit = l),
    t.startAt &&
      (n.structuredQuery.startAt = (function (f) {
        return { before: f.inclusive, values: f.position }
      })(t.startAt)),
    t.endAt &&
      (n.structuredQuery.endAt = (function (f) {
        return { before: !f.inclusive, values: f.position }
      })(t.endAt)),
    { _t: n, parent: s }
  )
}
function gv(e) {
  let t = cv(e.parent)
  const n = e.structuredQuery,
    r = n.from ? n.from.length : 0
  let s = null
  if (r > 0) {
    Tt(r === 1)
    const d = n.from[0]
    d.allDescendants ? (s = d.collectionId) : (t = t.child(d.collectionId))
  }
  let i = []
  n.where &&
    (i = (function (m) {
      const w = zf(m)
      return w instanceof Ke && wf(w) ? w.getFilters() : [w]
    })(n.where))
  let a = []
  n.orderBy &&
    (a = (function (m) {
      return m.map((w) =>
        (function (L) {
          return new Ai(
            lr(L.field),
            (function (O) {
              switch (O) {
                case 'ASCENDING':
                  return 'asc'
                case 'DESCENDING':
                  return 'desc'
                default:
                  return
              }
            })(L.direction)
          )
        })(w)
      )
    })(n.orderBy))
  let l = null
  n.limit &&
    (l = (function (m) {
      let w
      return ((w = typeof m == 'object' ? m.value : m), zi(w) ? null : w)
    })(n.limit))
  let c = null
  n.startAt &&
    (c = (function (m) {
      const w = !!m.before,
        P = m.values || []
      return new Ii(P, w)
    })(n.startAt))
  let f = null
  return (
    n.endAt &&
      (f = (function (m) {
        const w = !m.before,
          P = m.values || []
        return new Ii(P, w)
      })(n.endAt)),
    Dy(t, s, a, i, l, 'F', c, f)
  )
}
function _v(e, t) {
  const n = (function (s) {
    switch (s) {
      case 'TargetPurposeListen':
        return null
      case 'TargetPurposeExistenceFilterMismatch':
        return 'existence-filter-mismatch'
      case 'TargetPurposeExistenceFilterMismatchBloom':
        return 'existence-filter-mismatch-bloom'
      case 'TargetPurposeLimboResolution':
        return 'limbo-document'
      default:
        return rt()
    }
  })(t.purpose)
  return n == null ? null : { 'goog-listen-tags': n }
}
function zf(e) {
  return e.unaryFilter !== void 0
    ? (function (n) {
        switch (n.unaryFilter.op) {
          case 'IS_NAN':
            const r = lr(n.unaryFilter.field)
            return Ft.create(r, '==', { doubleValue: NaN })
          case 'IS_NULL':
            const s = lr(n.unaryFilter.field)
            return Ft.create(s, '==', { nullValue: 'NULL_VALUE' })
          case 'IS_NOT_NAN':
            const i = lr(n.unaryFilter.field)
            return Ft.create(i, '!=', { doubleValue: NaN })
          case 'IS_NOT_NULL':
            const a = lr(n.unaryFilter.field)
            return Ft.create(a, '!=', { nullValue: 'NULL_VALUE' })
          default:
            return rt()
        }
      })(e)
    : e.fieldFilter !== void 0
      ? (function (n) {
          return Ft.create(
            lr(n.fieldFilter.field),
            (function (s) {
              switch (s) {
                case 'EQUAL':
                  return '=='
                case 'NOT_EQUAL':
                  return '!='
                case 'GREATER_THAN':
                  return '>'
                case 'GREATER_THAN_OR_EQUAL':
                  return '>='
                case 'LESS_THAN':
                  return '<'
                case 'LESS_THAN_OR_EQUAL':
                  return '<='
                case 'ARRAY_CONTAINS':
                  return 'array-contains'
                case 'IN':
                  return 'in'
                case 'NOT_IN':
                  return 'not-in'
                case 'ARRAY_CONTAINS_ANY':
                  return 'array-contains-any'
                default:
                  return rt()
              }
            })(n.fieldFilter.op),
            n.fieldFilter.value
          )
        })(e)
      : e.compositeFilter !== void 0
        ? (function (n) {
            return Ke.create(
              n.compositeFilter.filters.map((r) => zf(r)),
              (function (s) {
                switch (s) {
                  case 'AND':
                    return 'and'
                  case 'OR':
                    return 'or'
                  default:
                    return rt()
                }
              })(n.compositeFilter.op)
            )
          })(e)
        : rt()
}
function yv(e) {
  return iv[e]
}
function vv(e) {
  return ov[e]
}
function Ev(e) {
  return av[e]
}
function ar(e) {
  return { fieldPath: e.canonicalString() }
}
function lr(e) {
  return zt.fromServerFormat(e.fieldPath)
}
function Wf(e) {
  return e instanceof Ft
    ? (function (n) {
        if (n.op === '==') {
          if (nc(n.value)) return { unaryFilter: { field: ar(n.field), op: 'IS_NAN' } }
          if (ec(n.value)) return { unaryFilter: { field: ar(n.field), op: 'IS_NULL' } }
        } else if (n.op === '!=') {
          if (nc(n.value)) return { unaryFilter: { field: ar(n.field), op: 'IS_NOT_NAN' } }
          if (ec(n.value)) return { unaryFilter: { field: ar(n.field), op: 'IS_NOT_NULL' } }
        }
        return { fieldFilter: { field: ar(n.field), op: vv(n.op), value: n.value } }
      })(e)
    : e instanceof Ke
      ? (function (n) {
          const r = n.getFilters().map((s) => Wf(s))
          return r.length === 1 ? r[0] : { compositeFilter: { op: Ev(n.op), filters: r } }
        })(e)
      : rt()
}
function Tv(e) {
  const t = []
  return (e.fields.forEach((n) => t.push(n.canonicalString())), { fieldPaths: t })
}
function Gf(e) {
  return e.length >= 4 && e.get(0) === 'projects' && e.get(2) === 'databases'
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vn {
  constructor(t, n, r, s, i = st.min(), a = st.min(), l = Gt.EMPTY_BYTE_STRING, c = null) {
    ;((this.target = t),
      (this.targetId = n),
      (this.purpose = r),
      (this.sequenceNumber = s),
      (this.snapshotVersion = i),
      (this.lastLimboFreeSnapshotVersion = a),
      (this.resumeToken = l),
      (this.expectedCount = c))
  }
  withSequenceNumber(t) {
    return new vn(
      this.target,
      this.targetId,
      this.purpose,
      t,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      this.expectedCount
    )
  }
  withResumeToken(t, n) {
    return new vn(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      n,
      this.lastLimboFreeSnapshotVersion,
      t,
      null
    )
  }
  withExpectedCount(t) {
    return new vn(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      this.lastLimboFreeSnapshotVersion,
      this.resumeToken,
      t
    )
  }
  withLastLimboFreeSnapshotVersion(t) {
    return new vn(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      this.snapshotVersion,
      t,
      this.resumeToken,
      this.expectedCount
    )
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wv {
  constructor(t) {
    this.ct = t
  }
}
function bv(e) {
  const t = gv({ parent: e.parent, structuredQuery: e.structuredQuery })
  return e.limitType === 'LAST' ? oa(t, t.limit, 'L') : t
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Iv {
  constructor() {
    this.un = new Av()
  }
  addToCollectionParentIndex(t, n) {
    return (this.un.add(n), B.resolve())
  }
  getCollectionParents(t, n) {
    return B.resolve(this.un.getEntries(n))
  }
  addFieldIndex(t, n) {
    return B.resolve()
  }
  deleteFieldIndex(t, n) {
    return B.resolve()
  }
  deleteAllFieldIndexes(t) {
    return B.resolve()
  }
  createTargetIndexes(t, n) {
    return B.resolve()
  }
  getDocumentsMatchingTarget(t, n) {
    return B.resolve(null)
  }
  getIndexType(t, n) {
    return B.resolve(0)
  }
  getFieldIndexes(t, n) {
    return B.resolve([])
  }
  getNextCollectionGroupToUpdate(t) {
    return B.resolve(null)
  }
  getMinOffset(t, n) {
    return B.resolve(Pn.min())
  }
  getMinOffsetFromCollectionGroup(t, n) {
    return B.resolve(Pn.min())
  }
  updateCollectionGroup(t, n, r) {
    return B.resolve()
  }
  updateIndexEntries(t, n) {
    return B.resolve()
  }
}
class Av {
  constructor() {
    this.index = {}
  }
  add(t) {
    const n = t.lastSegment(),
      r = t.popLast(),
      s = this.index[n] || new Wt(Pt.comparator),
      i = !s.has(r)
    return ((this.index[n] = s.add(r)), i)
  }
  has(t) {
    const n = t.lastSegment(),
      r = t.popLast(),
      s = this.index[n]
    return s && s.has(r)
  }
  getEntries(t) {
    return (this.index[t] || new Wt(Pt.comparator)).toArray()
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class br {
  constructor(t) {
    this.Ln = t
  }
  next() {
    return ((this.Ln += 2), this.Ln)
  }
  static Bn() {
    return new br(0)
  }
  static kn() {
    return new br(-1)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rv {
  constructor() {
    ;((this.changes = new Sr(
      (t) => t.toString(),
      (t, n) => t.isEqual(n)
    )),
      (this.changesApplied = !1))
  }
  addEntry(t) {
    ;(this.assertNotApplied(), this.changes.set(t.key, t))
  }
  removeEntry(t, n) {
    ;(this.assertNotApplied(), this.changes.set(t, ee.newInvalidDocument(t).setReadTime(n)))
  }
  getEntry(t, n) {
    this.assertNotApplied()
    const r = this.changes.get(n)
    return r !== void 0 ? B.resolve(r) : this.getFromCache(t, n)
  }
  getEntries(t, n) {
    return this.getAllFromCache(t, n)
  }
  apply(t) {
    return (this.assertNotApplied(), (this.changesApplied = !0), this.applyChanges(t))
  }
  assertNotApplied() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class xv {
  constructor(t, n) {
    ;((this.overlayedDocument = t), (this.mutatedFields = n))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Pv {
  constructor(t, n, r, s) {
    ;((this.remoteDocumentCache = t),
      (this.mutationQueue = n),
      (this.documentOverlayCache = r),
      (this.indexManager = s))
  }
  getDocument(t, n) {
    let r = null
    return this.documentOverlayCache
      .getOverlay(t, n)
      .next((s) => ((r = s), this.remoteDocumentCache.getEntry(t, n)))
      .next((s) => (r !== null && fs(r.mutation, s, Ie.empty(), Ut.now()), s))
  }
  getDocuments(t, n) {
    return this.remoteDocumentCache
      .getEntries(t, n)
      .next((r) => this.getLocalViewOfDocuments(t, r, lt()).next(() => r))
  }
  getLocalViewOfDocuments(t, n, r = lt()) {
    const s = $n()
    return this.populateOverlays(t, s, n).next(() =>
      this.computeViews(t, n, s, r).next((i) => {
        let a = ts()
        return (
          i.forEach((l, c) => {
            a = a.insert(l, c.overlayedDocument)
          }),
          a
        )
      })
    )
  }
  getOverlayedDocuments(t, n) {
    const r = $n()
    return this.populateOverlays(t, r, n).next(() => this.computeViews(t, n, r, lt()))
  }
  populateOverlays(t, n, r) {
    const s = []
    return (
      r.forEach((i) => {
        n.has(i) || s.push(i)
      }),
      this.documentOverlayCache.getOverlays(t, s).next((i) => {
        i.forEach((a, l) => {
          n.set(a, l)
        })
      })
    )
  }
  computeViews(t, n, r, s) {
    let i = cn()
    const a = hs(),
      l = (function () {
        return hs()
      })()
    return (
      n.forEach((c, f) => {
        const d = r.get(f.key)
        s.has(f.key) && (d === void 0 || d.mutation instanceof Xn)
          ? (i = i.insert(f.key, f))
          : d !== void 0
            ? (a.set(f.key, d.mutation.getFieldMask()),
              fs(d.mutation, f, d.mutation.getFieldMask(), Ut.now()))
            : a.set(f.key, Ie.empty())
      }),
      this.recalculateAndSaveOverlays(t, i).next(
        (c) => (
          c.forEach((f, d) => a.set(f, d)),
          n.forEach((f, d) => {
            var m
            return l.set(f, new xv(d, (m = a.get(f)) !== null && m !== void 0 ? m : null))
          }),
          l
        )
      )
    )
  }
  recalculateAndSaveOverlays(t, n) {
    const r = hs()
    let s = new Ct((a, l) => a - l),
      i = lt()
    return this.mutationQueue
      .getAllMutationBatchesAffectingDocumentKeys(t, n)
      .next((a) => {
        for (const l of a)
          l.keys().forEach((c) => {
            const f = n.get(c)
            if (f === null) return
            let d = r.get(c) || Ie.empty()
            ;((d = l.applyToLocalView(f, d)), r.set(c, d))
            const m = (s.get(l.batchId) || lt()).add(c)
            s = s.insert(l.batchId, m)
          })
      })
      .next(() => {
        const a = [],
          l = s.getReverseIterator()
        for (; l.hasNext(); ) {
          const c = l.getNext(),
            f = c.key,
            d = c.value,
            m = Cf()
          ;(d.forEach((w) => {
            if (!i.has(w)) {
              const P = Mf(n.get(w), r.get(w))
              ;(P !== null && m.set(w, P), (i = i.add(w)))
            }
          }),
            a.push(this.documentOverlayCache.saveOverlays(t, f, m)))
        }
        return B.waitFor(a)
      })
      .next(() => r)
  }
  recalculateAndSaveOverlaysForDocumentKeys(t, n) {
    return this.remoteDocumentCache
      .getEntries(t, n)
      .next((r) => this.recalculateAndSaveOverlays(t, r))
  }
  getDocumentsMatchingQuery(t, n, r, s) {
    return (function (a) {
      return Z.isDocumentKey(a.path) && a.collectionGroup === null && a.filters.length === 0
    })(n)
      ? this.getDocumentsMatchingDocumentQuery(t, n.path)
      : Ny(n)
        ? this.getDocumentsMatchingCollectionGroupQuery(t, n, r, s)
        : this.getDocumentsMatchingCollectionQuery(t, n, r, s)
  }
  getNextDocuments(t, n, r, s) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(t, n, r, s).next((i) => {
      const a =
        s - i.size > 0
          ? this.documentOverlayCache.getOverlaysForCollectionGroup(
              t,
              n,
              r.largestBatchId,
              s - i.size
            )
          : B.resolve($n())
      let l = -1,
        c = i
      return a.next((f) =>
        B.forEach(
          f,
          (d, m) => (
            l < m.largestBatchId && (l = m.largestBatchId),
            i.get(d)
              ? B.resolve()
              : this.remoteDocumentCache.getEntry(t, d).next((w) => {
                  c = c.insert(d, w)
                })
          )
        )
          .next(() => this.populateOverlays(t, f, i))
          .next(() => this.computeViews(t, c, f, lt()))
          .next((d) => ({ batchId: l, changes: Sf(d) }))
      )
    })
  }
  getDocumentsMatchingDocumentQuery(t, n) {
    return this.getDocument(t, new Z(n)).next((r) => {
      let s = ts()
      return (r.isFoundDocument() && (s = s.insert(r.key, r)), s)
    })
  }
  getDocumentsMatchingCollectionGroupQuery(t, n, r, s) {
    const i = n.collectionGroup
    let a = ts()
    return this.indexManager.getCollectionParents(t, i).next((l) =>
      B.forEach(l, (c) => {
        const f = (function (m, w) {
          return new Wi(
            w,
            null,
            m.explicitOrderBy.slice(),
            m.filters.slice(),
            m.limit,
            m.limitType,
            m.startAt,
            m.endAt
          )
        })(n, c.child(i))
        return this.getDocumentsMatchingCollectionQuery(t, f, r, s).next((d) => {
          d.forEach((m, w) => {
            a = a.insert(m, w)
          })
        })
      }).next(() => a)
    )
  }
  getDocumentsMatchingCollectionQuery(t, n, r, s) {
    let i
    return this.documentOverlayCache
      .getOverlaysForCollection(t, n.path, r.largestBatchId)
      .next((a) => ((i = a), this.remoteDocumentCache.getDocumentsMatchingQuery(t, n, r, i, s)))
      .next((a) => {
        i.forEach((c, f) => {
          const d = f.getKey()
          a.get(d) === null && (a = a.insert(d, ee.newInvalidDocument(d)))
        })
        let l = ts()
        return (
          a.forEach((c, f) => {
            const d = i.get(c)
            ;(d !== void 0 && fs(d.mutation, f, Ie.empty(), Ut.now()),
              Qi(n, f) && (l = l.insert(c, f)))
          }),
          l
        )
      })
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Sv {
  constructor(t) {
    ;((this.serializer = t), (this.hr = new Map()), (this.Pr = new Map()))
  }
  getBundleMetadata(t, n) {
    return B.resolve(this.hr.get(n))
  }
  saveBundleMetadata(t, n) {
    return (
      this.hr.set(
        n.id,
        (function (s) {
          return { id: s.id, version: s.version, createTime: Be(s.createTime) }
        })(n)
      ),
      B.resolve()
    )
  }
  getNamedQuery(t, n) {
    return B.resolve(this.Pr.get(n))
  }
  saveNamedQuery(t, n) {
    return (
      this.Pr.set(
        n.name,
        (function (s) {
          return { name: s.name, query: bv(s.bundledQuery), readTime: Be(s.readTime) }
        })(n)
      ),
      B.resolve()
    )
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Cv {
  constructor() {
    ;((this.overlays = new Ct(Z.comparator)), (this.Ir = new Map()))
  }
  getOverlay(t, n) {
    return B.resolve(this.overlays.get(n))
  }
  getOverlays(t, n) {
    const r = $n()
    return B.forEach(n, (s) =>
      this.getOverlay(t, s).next((i) => {
        i !== null && r.set(s, i)
      })
    ).next(() => r)
  }
  saveOverlays(t, n, r) {
    return (
      r.forEach((s, i) => {
        this.ht(t, n, i)
      }),
      B.resolve()
    )
  }
  removeOverlaysForBatchId(t, n, r) {
    const s = this.Ir.get(r)
    return (
      s !== void 0 &&
        (s.forEach((i) => (this.overlays = this.overlays.remove(i))), this.Ir.delete(r)),
      B.resolve()
    )
  }
  getOverlaysForCollection(t, n, r) {
    const s = $n(),
      i = n.length + 1,
      a = new Z(n.child('')),
      l = this.overlays.getIteratorFrom(a)
    for (; l.hasNext(); ) {
      const c = l.getNext().value,
        f = c.getKey()
      if (!n.isPrefixOf(f.path)) break
      f.path.length === i && c.largestBatchId > r && s.set(c.getKey(), c)
    }
    return B.resolve(s)
  }
  getOverlaysForCollectionGroup(t, n, r, s) {
    let i = new Ct((f, d) => f - d)
    const a = this.overlays.getIterator()
    for (; a.hasNext(); ) {
      const f = a.getNext().value
      if (f.getKey().getCollectionGroup() === n && f.largestBatchId > r) {
        let d = i.get(f.largestBatchId)
        ;(d === null && ((d = $n()), (i = i.insert(f.largestBatchId, d))), d.set(f.getKey(), f))
      }
    }
    const l = $n(),
      c = i.getIterator()
    for (; c.hasNext() && (c.getNext().value.forEach((f, d) => l.set(f, d)), !(l.size() >= s)); );
    return B.resolve(l)
  }
  ht(t, n, r) {
    const s = this.overlays.get(r.key)
    if (s !== null) {
      const a = this.Ir.get(s.largestBatchId).delete(r.key)
      this.Ir.set(s.largestBatchId, a)
    }
    this.overlays = this.overlays.insert(r.key, new Zy(n, r))
    let i = this.Ir.get(n)
    ;(i === void 0 && ((i = lt()), this.Ir.set(n, i)), this.Ir.set(n, i.add(r.key)))
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vv {
  constructor() {
    this.sessionToken = Gt.EMPTY_BYTE_STRING
  }
  getSessionToken(t) {
    return B.resolve(this.sessionToken)
  }
  setSessionToken(t, n) {
    return ((this.sessionToken = n), B.resolve())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Wa {
  constructor() {
    ;((this.Tr = new Wt(Bt.Er)), (this.dr = new Wt(Bt.Ar)))
  }
  isEmpty() {
    return this.Tr.isEmpty()
  }
  addReference(t, n) {
    const r = new Bt(t, n)
    ;((this.Tr = this.Tr.add(r)), (this.dr = this.dr.add(r)))
  }
  Rr(t, n) {
    t.forEach((r) => this.addReference(r, n))
  }
  removeReference(t, n) {
    this.Vr(new Bt(t, n))
  }
  mr(t, n) {
    t.forEach((r) => this.removeReference(r, n))
  }
  gr(t) {
    const n = new Z(new Pt([])),
      r = new Bt(n, t),
      s = new Bt(n, t + 1),
      i = []
    return (
      this.dr.forEachInRange([r, s], (a) => {
        ;(this.Vr(a), i.push(a.key))
      }),
      i
    )
  }
  pr() {
    this.Tr.forEach((t) => this.Vr(t))
  }
  Vr(t) {
    ;((this.Tr = this.Tr.delete(t)), (this.dr = this.dr.delete(t)))
  }
  yr(t) {
    const n = new Z(new Pt([])),
      r = new Bt(n, t),
      s = new Bt(n, t + 1)
    let i = lt()
    return (
      this.dr.forEachInRange([r, s], (a) => {
        i = i.add(a.key)
      }),
      i
    )
  }
  containsKey(t) {
    const n = new Bt(t, 0),
      r = this.Tr.firstAfterOrEqual(n)
    return r !== null && t.isEqual(r.key)
  }
}
class Bt {
  constructor(t, n) {
    ;((this.key = t), (this.wr = n))
  }
  static Er(t, n) {
    return Z.comparator(t.key, n.key) || mt(t.wr, n.wr)
  }
  static Ar(t, n) {
    return mt(t.wr, n.wr) || Z.comparator(t.key, n.key)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class kv {
  constructor(t, n) {
    ;((this.indexManager = t),
      (this.referenceDelegate = n),
      (this.mutationQueue = []),
      (this.Sr = 1),
      (this.br = new Wt(Bt.Er)))
  }
  checkEmpty(t) {
    return B.resolve(this.mutationQueue.length === 0)
  }
  addMutationBatch(t, n, r, s) {
    const i = this.Sr
    ;(this.Sr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1])
    const a = new Jy(i, n, r, s)
    this.mutationQueue.push(a)
    for (const l of s)
      ((this.br = this.br.add(new Bt(l.key, i))),
        this.indexManager.addToCollectionParentIndex(t, l.key.path.popLast()))
    return B.resolve(a)
  }
  lookupMutationBatch(t, n) {
    return B.resolve(this.Dr(n))
  }
  getNextMutationBatchAfterBatchId(t, n) {
    const r = n + 1,
      s = this.vr(r),
      i = s < 0 ? 0 : s
    return B.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
  }
  getHighestUnacknowledgedBatchId() {
    return B.resolve(this.mutationQueue.length === 0 ? -1 : this.Sr - 1)
  }
  getAllMutationBatches(t) {
    return B.resolve(this.mutationQueue.slice())
  }
  getAllMutationBatchesAffectingDocumentKey(t, n) {
    const r = new Bt(n, 0),
      s = new Bt(n, Number.POSITIVE_INFINITY),
      i = []
    return (
      this.br.forEachInRange([r, s], (a) => {
        const l = this.Dr(a.wr)
        i.push(l)
      }),
      B.resolve(i)
    )
  }
  getAllMutationBatchesAffectingDocumentKeys(t, n) {
    let r = new Wt(mt)
    return (
      n.forEach((s) => {
        const i = new Bt(s, 0),
          a = new Bt(s, Number.POSITIVE_INFINITY)
        this.br.forEachInRange([i, a], (l) => {
          r = r.add(l.wr)
        })
      }),
      B.resolve(this.Cr(r))
    )
  }
  getAllMutationBatchesAffectingQuery(t, n) {
    const r = n.path,
      s = r.length + 1
    let i = r
    Z.isDocumentKey(i) || (i = i.child(''))
    const a = new Bt(new Z(i), 0)
    let l = new Wt(mt)
    return (
      this.br.forEachWhile((c) => {
        const f = c.key.path
        return !!r.isPrefixOf(f) && (f.length === s && (l = l.add(c.wr)), !0)
      }, a),
      B.resolve(this.Cr(l))
    )
  }
  Cr(t) {
    const n = []
    return (
      t.forEach((r) => {
        const s = this.Dr(r)
        s !== null && n.push(s)
      }),
      n
    )
  }
  removeMutationBatch(t, n) {
    ;(Tt(this.Fr(n.batchId, 'removed') === 0), this.mutationQueue.shift())
    let r = this.br
    return B.forEach(n.mutations, (s) => {
      const i = new Bt(s.key, n.batchId)
      return ((r = r.delete(i)), this.referenceDelegate.markPotentiallyOrphaned(t, s.key))
    }).next(() => {
      this.br = r
    })
  }
  On(t) {}
  containsKey(t, n) {
    const r = new Bt(n, 0),
      s = this.br.firstAfterOrEqual(r)
    return B.resolve(n.isEqual(s && s.key))
  }
  performConsistencyCheck(t) {
    return (this.mutationQueue.length, B.resolve())
  }
  Fr(t, n) {
    return this.vr(t)
  }
  vr(t) {
    return this.mutationQueue.length === 0 ? 0 : t - this.mutationQueue[0].batchId
  }
  Dr(t) {
    const n = this.vr(t)
    return n < 0 || n >= this.mutationQueue.length ? null : this.mutationQueue[n]
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Dv {
  constructor(t) {
    ;((this.Mr = t),
      (this.docs = (function () {
        return new Ct(Z.comparator)
      })()),
      (this.size = 0))
  }
  setIndexManager(t) {
    this.indexManager = t
  }
  addEntry(t, n) {
    const r = n.key,
      s = this.docs.get(r),
      i = s ? s.size : 0,
      a = this.Mr(n)
    return (
      (this.docs = this.docs.insert(r, { document: n.mutableCopy(), size: a })),
      (this.size += a - i),
      this.indexManager.addToCollectionParentIndex(t, r.path.popLast())
    )
  }
  removeEntry(t) {
    const n = this.docs.get(t)
    n && ((this.docs = this.docs.remove(t)), (this.size -= n.size))
  }
  getEntry(t, n) {
    const r = this.docs.get(n)
    return B.resolve(r ? r.document.mutableCopy() : ee.newInvalidDocument(n))
  }
  getEntries(t, n) {
    let r = cn()
    return (
      n.forEach((s) => {
        const i = this.docs.get(s)
        r = r.insert(s, i ? i.document.mutableCopy() : ee.newInvalidDocument(s))
      }),
      B.resolve(r)
    )
  }
  getDocumentsMatchingQuery(t, n, r, s) {
    let i = cn()
    const a = n.path,
      l = new Z(a.child('')),
      c = this.docs.getIteratorFrom(l)
    for (; c.hasNext(); ) {
      const {
        key: f,
        value: { document: d }
      } = c.getNext()
      if (!a.isPrefixOf(f.path)) break
      f.path.length > a.length + 1 ||
        py(dy(d), r) <= 0 ||
        ((s.has(d.key) || Qi(n, d)) && (i = i.insert(d.key, d.mutableCopy())))
    }
    return B.resolve(i)
  }
  getAllFromCollectionGroup(t, n, r, s) {
    rt()
  }
  Or(t, n) {
    return B.forEach(this.docs, (r) => n(r))
  }
  newChangeBuffer(t) {
    return new Nv(this)
  }
  getSize(t) {
    return B.resolve(this.size)
  }
}
class Nv extends Rv {
  constructor(t) {
    ;(super(), (this.cr = t))
  }
  applyChanges(t) {
    const n = []
    return (
      this.changes.forEach((r, s) => {
        s.isValidDocument() ? n.push(this.cr.addEntry(t, s)) : this.cr.removeEntry(r)
      }),
      B.waitFor(n)
    )
  }
  getFromCache(t, n) {
    return this.cr.getEntry(t, n)
  }
  getAllFromCache(t, n) {
    return this.cr.getEntries(t, n)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ov {
  constructor(t) {
    ;((this.persistence = t),
      (this.Nr = new Sr((n) => Ba(n), ja)),
      (this.lastRemoteSnapshotVersion = st.min()),
      (this.highestTargetId = 0),
      (this.Lr = 0),
      (this.Br = new Wa()),
      (this.targetCount = 0),
      (this.kr = br.Bn()))
  }
  forEachTarget(t, n) {
    return (this.Nr.forEach((r, s) => n(s)), B.resolve())
  }
  getLastRemoteSnapshotVersion(t) {
    return B.resolve(this.lastRemoteSnapshotVersion)
  }
  getHighestSequenceNumber(t) {
    return B.resolve(this.Lr)
  }
  allocateTargetId(t) {
    return ((this.highestTargetId = this.kr.next()), B.resolve(this.highestTargetId))
  }
  setTargetsMetadata(t, n, r) {
    return (r && (this.lastRemoteSnapshotVersion = r), n > this.Lr && (this.Lr = n), B.resolve())
  }
  Kn(t) {
    this.Nr.set(t.target, t)
    const n = t.targetId
    ;(n > this.highestTargetId && ((this.kr = new br(n)), (this.highestTargetId = n)),
      t.sequenceNumber > this.Lr && (this.Lr = t.sequenceNumber))
  }
  addTargetData(t, n) {
    return (this.Kn(n), (this.targetCount += 1), B.resolve())
  }
  updateTargetData(t, n) {
    return (this.Kn(n), B.resolve())
  }
  removeTargetData(t, n) {
    return (this.Nr.delete(n.target), this.Br.gr(n.targetId), (this.targetCount -= 1), B.resolve())
  }
  removeTargets(t, n, r) {
    let s = 0
    const i = []
    return (
      this.Nr.forEach((a, l) => {
        l.sequenceNumber <= n &&
          r.get(l.targetId) === null &&
          (this.Nr.delete(a), i.push(this.removeMatchingKeysForTargetId(t, l.targetId)), s++)
      }),
      B.waitFor(i).next(() => s)
    )
  }
  getTargetCount(t) {
    return B.resolve(this.targetCount)
  }
  getTargetData(t, n) {
    const r = this.Nr.get(n) || null
    return B.resolve(r)
  }
  addMatchingKeys(t, n, r) {
    return (this.Br.Rr(n, r), B.resolve())
  }
  removeMatchingKeys(t, n, r) {
    this.Br.mr(n, r)
    const s = this.persistence.referenceDelegate,
      i = []
    return (
      s &&
        n.forEach((a) => {
          i.push(s.markPotentiallyOrphaned(t, a))
        }),
      B.waitFor(i)
    )
  }
  removeMatchingKeysForTargetId(t, n) {
    return (this.Br.gr(n), B.resolve())
  }
  getMatchingKeysForTargetId(t, n) {
    const r = this.Br.yr(n)
    return B.resolve(r)
  }
  containsKey(t, n) {
    return B.resolve(this.Br.containsKey(n))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mv {
  constructor(t, n) {
    ;((this.qr = {}),
      (this.overlays = {}),
      (this.Qr = new Ma(0)),
      (this.Kr = !1),
      (this.Kr = !0),
      (this.$r = new Vv()),
      (this.referenceDelegate = t(this)),
      (this.Ur = new Ov(this)),
      (this.indexManager = new Iv()),
      (this.remoteDocumentCache = (function (s) {
        return new Dv(s)
      })((r) => this.referenceDelegate.Wr(r))),
      (this.serializer = new wv(n)),
      (this.Gr = new Sv(this.serializer)))
  }
  start() {
    return Promise.resolve()
  }
  shutdown() {
    return ((this.Kr = !1), Promise.resolve())
  }
  get started() {
    return this.Kr
  }
  setDatabaseDeletedListener() {}
  setNetworkEnabled() {}
  getIndexManager(t) {
    return this.indexManager
  }
  getDocumentOverlayCache(t) {
    let n = this.overlays[t.toKey()]
    return (n || ((n = new Cv()), (this.overlays[t.toKey()] = n)), n)
  }
  getMutationQueue(t, n) {
    let r = this.qr[t.toKey()]
    return (r || ((r = new kv(n, this.referenceDelegate)), (this.qr[t.toKey()] = r)), r)
  }
  getGlobalsCache() {
    return this.$r
  }
  getTargetCache() {
    return this.Ur
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache
  }
  getBundleCache() {
    return this.Gr
  }
  runTransaction(t, n, r) {
    Q('MemoryPersistence', 'Starting transaction:', t)
    const s = new Lv(this.Qr.next())
    return (
      this.referenceDelegate.zr(),
      r(s)
        .next((i) => this.referenceDelegate.jr(s).next(() => i))
        .toPromise()
        .then((i) => (s.raiseOnCommittedEvent(), i))
    )
  }
  Hr(t, n) {
    return B.or(Object.values(this.qr).map((r) => () => r.containsKey(t, n)))
  }
}
class Lv extends gy {
  constructor(t) {
    ;(super(), (this.currentSequenceNumber = t))
  }
}
class Ga {
  constructor(t) {
    ;((this.persistence = t), (this.Jr = new Wa()), (this.Yr = null))
  }
  static Zr(t) {
    return new Ga(t)
  }
  get Xr() {
    if (this.Yr) return this.Yr
    throw rt()
  }
  addReference(t, n, r) {
    return (this.Jr.addReference(r, n), this.Xr.delete(r.toString()), B.resolve())
  }
  removeReference(t, n, r) {
    return (this.Jr.removeReference(r, n), this.Xr.add(r.toString()), B.resolve())
  }
  markPotentiallyOrphaned(t, n) {
    return (this.Xr.add(n.toString()), B.resolve())
  }
  removeTarget(t, n) {
    this.Jr.gr(n.targetId).forEach((s) => this.Xr.add(s.toString()))
    const r = this.persistence.getTargetCache()
    return r
      .getMatchingKeysForTargetId(t, n.targetId)
      .next((s) => {
        s.forEach((i) => this.Xr.add(i.toString()))
      })
      .next(() => r.removeTargetData(t, n))
  }
  zr() {
    this.Yr = new Set()
  }
  jr(t) {
    const n = this.persistence.getRemoteDocumentCache().newChangeBuffer()
    return B.forEach(this.Xr, (r) => {
      const s = Z.fromPath(r)
      return this.ei(t, s).next((i) => {
        i || n.removeEntry(s, st.min())
      })
    }).next(() => ((this.Yr = null), n.apply(t)))
  }
  updateLimboDocument(t, n) {
    return this.ei(t, n).next((r) => {
      r ? this.Xr.delete(n.toString()) : this.Xr.add(n.toString())
    })
  }
  Wr(t) {
    return 0
  }
  ei(t, n) {
    return B.or([
      () => B.resolve(this.Jr.containsKey(n)),
      () => this.persistence.getTargetCache().containsKey(t, n),
      () => this.persistence.Hr(t, n)
    ])
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qa {
  constructor(t, n, r, s) {
    ;((this.targetId = t), (this.fromCache = n), (this.$i = r), (this.Ui = s))
  }
  static Wi(t, n) {
    let r = lt(),
      s = lt()
    for (const i of n.docChanges)
      switch (i.type) {
        case 0:
          r = r.add(i.doc.key)
          break
        case 1:
          s = s.add(i.doc.key)
      }
    return new Qa(t, n.fromCache, r, s)
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fv {
  constructor() {
    this._documentReadCount = 0
  }
  get documentReadCount() {
    return this._documentReadCount
  }
  incrementDocumentReadCount(t) {
    this._documentReadCount += t
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uv {
  constructor() {
    ;((this.Gi = !1),
      (this.zi = !1),
      (this.ji = 100),
      (this.Hi = (function () {
        return $g() ? 8 : _y(Bg()) > 0 ? 6 : 4
      })()))
  }
  initialize(t, n) {
    ;((this.Ji = t), (this.indexManager = n), (this.Gi = !0))
  }
  getDocumentsMatchingQuery(t, n, r, s) {
    const i = { result: null }
    return this.Yi(t, n)
      .next((a) => {
        i.result = a
      })
      .next(() => {
        if (!i.result)
          return this.Zi(t, n, s, r).next((a) => {
            i.result = a
          })
      })
      .next(() => {
        if (i.result) return
        const a = new Fv()
        return this.Xi(t, n, a).next((l) => {
          if (((i.result = l), this.zi)) return this.es(t, n, a, l.size)
        })
      })
      .next(() => i.result)
  }
  es(t, n, r, s) {
    return r.documentReadCount < this.ji
      ? (Yr() <= ht.DEBUG &&
          Q(
            'QueryEngine',
            'SDK will not create cache indexes for query:',
            or(n),
            'since it only creates cache indexes for collection contains',
            'more than or equal to',
            this.ji,
            'documents'
          ),
        B.resolve())
      : (Yr() <= ht.DEBUG &&
          Q(
            'QueryEngine',
            'Query:',
            or(n),
            'scans',
            r.documentReadCount,
            'local documents and returns',
            s,
            'documents as results.'
          ),
        r.documentReadCount > this.Hi * s
          ? (Yr() <= ht.DEBUG &&
              Q(
                'QueryEngine',
                'The SDK decides to create cache indexes for query:',
                or(n),
                'as using cache indexes may help improve performance.'
              ),
            this.indexManager.createTargetIndexes(t, Ue(n)))
          : B.resolve())
  }
  Yi(t, n) {
    if (oc(n)) return B.resolve(null)
    let r = Ue(n)
    return this.indexManager.getIndexType(t, r).next((s) =>
      s === 0
        ? null
        : (n.limit !== null && s === 1 && ((n = oa(n, null, 'F')), (r = Ue(n))),
          this.indexManager.getDocumentsMatchingTarget(t, r).next((i) => {
            const a = lt(...i)
            return this.Ji.getDocuments(t, a).next((l) =>
              this.indexManager.getMinOffset(t, r).next((c) => {
                const f = this.ts(n, l)
                return this.ns(n, f, a, c.readTime)
                  ? this.Yi(t, oa(n, null, 'F'))
                  : this.rs(t, f, n, c)
              })
            )
          }))
    )
  }
  Zi(t, n, r, s) {
    return oc(n) || s.isEqual(st.min())
      ? B.resolve(null)
      : this.Ji.getDocuments(t, r).next((i) => {
          const a = this.ts(n, i)
          return this.ns(n, a, r, s)
            ? B.resolve(null)
            : (Yr() <= ht.DEBUG &&
                Q(
                  'QueryEngine',
                  'Re-using previous result from %s to execute query: %s',
                  s.toString(),
                  or(n)
                ),
              this.rs(t, a, n, fy(s, -1)).next((l) => l))
        })
  }
  ts(t, n) {
    let r = new Wt(xf(t))
    return (
      n.forEach((s, i) => {
        Qi(t, i) && (r = r.add(i))
      }),
      r
    )
  }
  ns(t, n, r, s) {
    if (t.limit === null) return !1
    if (r.size !== n.size) return !0
    const i = t.limitType === 'F' ? n.last() : n.first()
    return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0)
  }
  Xi(t, n, r) {
    return (
      Yr() <= ht.DEBUG && Q('QueryEngine', 'Using full collection scan to execute query:', or(n)),
      this.Ji.getDocumentsMatchingQuery(t, n, Pn.min(), r)
    )
  }
  rs(t, n, r, s) {
    return this.Ji.getDocumentsMatchingQuery(t, r, s).next(
      (i) => (
        n.forEach((a) => {
          i = i.insert(a.key, a)
        }),
        i
      )
    )
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bv {
  constructor(t, n, r, s) {
    ;((this.persistence = t),
      (this.ss = n),
      (this.serializer = s),
      (this.os = new Ct(mt)),
      (this._s = new Sr((i) => Ba(i), ja)),
      (this.us = new Map()),
      (this.cs = t.getRemoteDocumentCache()),
      (this.Ur = t.getTargetCache()),
      (this.Gr = t.getBundleCache()),
      this.ls(r))
  }
  ls(t) {
    ;((this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t)),
      (this.indexManager = this.persistence.getIndexManager(t)),
      (this.mutationQueue = this.persistence.getMutationQueue(t, this.indexManager)),
      (this.localDocuments = new Pv(
        this.cs,
        this.mutationQueue,
        this.documentOverlayCache,
        this.indexManager
      )),
      this.cs.setIndexManager(this.indexManager),
      this.ss.initialize(this.localDocuments, this.indexManager))
  }
  collectGarbage(t) {
    return this.persistence.runTransaction('Collect garbage', 'readwrite-primary', (n) =>
      t.collect(n, this.os)
    )
  }
}
function jv(e, t, n, r) {
  return new Bv(e, t, n, r)
}
async function Qf(e, t) {
  const n = it(e)
  return await n.persistence.runTransaction('Handle user change', 'readonly', (r) => {
    let s
    return n.mutationQueue
      .getAllMutationBatches(r)
      .next((i) => ((s = i), n.ls(t), n.mutationQueue.getAllMutationBatches(r)))
      .next((i) => {
        const a = [],
          l = []
        let c = lt()
        for (const f of s) {
          a.push(f.batchId)
          for (const d of f.mutations) c = c.add(d.key)
        }
        for (const f of i) {
          l.push(f.batchId)
          for (const d of f.mutations) c = c.add(d.key)
        }
        return n.localDocuments
          .getDocuments(r, c)
          .next((f) => ({ hs: f, removedBatchIds: a, addedBatchIds: l }))
      })
  })
}
function $v(e, t) {
  const n = it(e)
  return n.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', (r) => {
    const s = t.batch.keys(),
      i = n.cs.newChangeBuffer({ trackRemovals: !0 })
    return (function (l, c, f, d) {
      const m = f.batch,
        w = m.keys()
      let P = B.resolve()
      return (
        w.forEach((L) => {
          P = P.next(() => d.getEntry(c, L)).next((D) => {
            const O = f.docVersions.get(L)
            ;(Tt(O !== null),
              D.version.compareTo(O) < 0 &&
                (m.applyToRemoteDocument(D, f),
                D.isValidDocument() && (D.setReadTime(f.commitVersion), d.addEntry(D))))
          })
        }),
        P.next(() => l.mutationQueue.removeMutationBatch(c, m))
      )
    })(n, r, t, i)
      .next(() => i.apply(r))
      .next(() => n.mutationQueue.performConsistencyCheck(r))
      .next(() => n.documentOverlayCache.removeOverlaysForBatchId(r, s, t.batch.batchId))
      .next(() =>
        n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
          r,
          (function (l) {
            let c = lt()
            for (let f = 0; f < l.mutationResults.length; ++f)
              l.mutationResults[f].transformResults.length > 0 &&
                (c = c.add(l.batch.mutations[f].key))
            return c
          })(t)
        )
      )
      .next(() => n.localDocuments.getDocuments(r, s))
  })
}
function Yf(e) {
  const t = it(e)
  return t.persistence.runTransaction('Get last remote snapshot version', 'readonly', (n) =>
    t.Ur.getLastRemoteSnapshotVersion(n)
  )
}
function qv(e, t) {
  const n = it(e),
    r = t.snapshotVersion
  let s = n.os
  return n.persistence
    .runTransaction('Apply remote event', 'readwrite-primary', (i) => {
      const a = n.cs.newChangeBuffer({ trackRemovals: !0 })
      s = n.os
      const l = []
      t.targetChanges.forEach((d, m) => {
        const w = s.get(m)
        if (!w) return
        l.push(
          n.Ur.removeMatchingKeys(i, d.removedDocuments, m).next(() =>
            n.Ur.addMatchingKeys(i, d.addedDocuments, m)
          )
        )
        let P = w.withSequenceNumber(i.currentSequenceNumber)
        ;(t.targetMismatches.get(m) !== null
          ? (P = P.withResumeToken(Gt.EMPTY_BYTE_STRING, st.min()).withLastLimboFreeSnapshotVersion(
              st.min()
            ))
          : d.resumeToken.approximateByteSize() > 0 && (P = P.withResumeToken(d.resumeToken, r)),
          (s = s.insert(m, P)),
          (function (D, O, G) {
            return D.resumeToken.approximateByteSize() === 0 ||
              O.snapshotVersion.toMicroseconds() - D.snapshotVersion.toMicroseconds() >= 3e8
              ? !0
              : G.addedDocuments.size + G.modifiedDocuments.size + G.removedDocuments.size > 0
          })(w, P, d) && l.push(n.Ur.updateTargetData(i, P)))
      })
      let c = cn(),
        f = lt()
      if (
        (t.documentUpdates.forEach((d) => {
          t.resolvedLimboDocuments.has(d) &&
            l.push(n.persistence.referenceDelegate.updateLimboDocument(i, d))
        }),
        l.push(
          Kv(i, a, t.documentUpdates).next((d) => {
            ;((c = d.Ps), (f = d.Is))
          })
        ),
        !r.isEqual(st.min()))
      ) {
        const d = n.Ur.getLastRemoteSnapshotVersion(i).next((m) =>
          n.Ur.setTargetsMetadata(i, i.currentSequenceNumber, r)
        )
        l.push(d)
      }
      return B.waitFor(l)
        .next(() => a.apply(i))
        .next(() => n.localDocuments.getLocalViewOfDocuments(i, c, f))
        .next(() => c)
    })
    .then((i) => ((n.os = s), i))
}
function Kv(e, t, n) {
  let r = lt(),
    s = lt()
  return (
    n.forEach((i) => (r = r.add(i))),
    t.getEntries(e, r).next((i) => {
      let a = cn()
      return (
        n.forEach((l, c) => {
          const f = i.get(l)
          ;(c.isFoundDocument() !== f.isFoundDocument() && (s = s.add(l)),
            c.isNoDocument() && c.version.isEqual(st.min())
              ? (t.removeEntry(l, c.readTime), (a = a.insert(l, c)))
              : !f.isValidDocument() ||
                  c.version.compareTo(f.version) > 0 ||
                  (c.version.compareTo(f.version) === 0 && f.hasPendingWrites)
                ? (t.addEntry(c), (a = a.insert(l, c)))
                : Q(
                    'LocalStore',
                    'Ignoring outdated watch update for ',
                    l,
                    '. Current version:',
                    f.version,
                    ' Watch version:',
                    c.version
                  ))
        }),
        { Ps: a, Is: s }
      )
    })
  )
}
function Hv(e, t) {
  const n = it(e)
  return n.persistence.runTransaction(
    'Get next mutation batch',
    'readonly',
    (r) => (t === void 0 && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(r, t))
  )
}
function zv(e, t) {
  const n = it(e)
  return n.persistence
    .runTransaction('Allocate target', 'readwrite', (r) => {
      let s
      return n.Ur.getTargetData(r, t).next((i) =>
        i
          ? ((s = i), B.resolve(s))
          : n.Ur.allocateTargetId(r).next(
              (a) => (
                (s = new vn(t, a, 'TargetPurposeListen', r.currentSequenceNumber)),
                n.Ur.addTargetData(r, s).next(() => s)
              )
            )
      )
    })
    .then((r) => {
      const s = n.os.get(r.targetId)
      return (
        (s === null || r.snapshotVersion.compareTo(s.snapshotVersion) > 0) &&
          ((n.os = n.os.insert(r.targetId, r)), n._s.set(t, r.targetId)),
        r
      )
    })
}
async function ha(e, t, n) {
  const r = it(e),
    s = r.os.get(t),
    i = n ? 'readwrite' : 'readwrite-primary'
  try {
    n ||
      (await r.persistence.runTransaction('Release target', i, (a) =>
        r.persistence.referenceDelegate.removeTarget(a, s)
      ))
  } catch (a) {
    if (!Vs(a)) throw a
    Q('LocalStore', `Failed to update sequence numbers for target ${t}: ${a}`)
  }
  ;((r.os = r.os.remove(t)), r._s.delete(s.target))
}
function _c(e, t, n) {
  const r = it(e)
  let s = st.min(),
    i = lt()
  return r.persistence.runTransaction('Execute query', 'readwrite', (a) =>
    (function (c, f, d) {
      const m = it(c),
        w = m._s.get(d)
      return w !== void 0 ? B.resolve(m.os.get(w)) : m.Ur.getTargetData(f, d)
    })(r, a, Ue(t))
      .next((l) => {
        if (l)
          return (
            (s = l.lastLimboFreeSnapshotVersion),
            r.Ur.getMatchingKeysForTargetId(a, l.targetId).next((c) => {
              i = c
            })
          )
      })
      .next(() => r.ss.getDocumentsMatchingQuery(a, t, n ? s : st.min(), n ? i : lt()))
      .next((l) => (Wv(r, My(t), l), { documents: l, Ts: i }))
  )
}
function Wv(e, t, n) {
  let r = e.us.get(t) || st.min()
  ;(n.forEach((s, i) => {
    i.readTime.compareTo(r) > 0 && (r = i.readTime)
  }),
    e.us.set(t, r))
}
class yc {
  constructor() {
    this.activeTargetIds = $y()
  }
  fs(t) {
    this.activeTargetIds = this.activeTargetIds.add(t)
  }
  gs(t) {
    this.activeTargetIds = this.activeTargetIds.delete(t)
  }
  Vs() {
    const t = { activeTargetIds: this.activeTargetIds.toArray(), updateTimeMs: Date.now() }
    return JSON.stringify(t)
  }
}
class Gv {
  constructor() {
    ;((this.so = new yc()),
      (this.oo = {}),
      (this.onlineStateHandler = null),
      (this.sequenceNumberHandler = null))
  }
  addPendingMutation(t) {}
  updateMutationState(t, n, r) {}
  addLocalQueryTarget(t, n = !0) {
    return (n && this.so.fs(t), this.oo[t] || 'not-current')
  }
  updateQueryState(t, n, r) {
    this.oo[t] = n
  }
  removeLocalQueryTarget(t) {
    this.so.gs(t)
  }
  isLocalQueryTarget(t) {
    return this.so.activeTargetIds.has(t)
  }
  clearQueryState(t) {
    delete this.oo[t]
  }
  getAllActiveQueryTargets() {
    return this.so.activeTargetIds
  }
  isActiveQueryTarget(t) {
    return this.so.activeTargetIds.has(t)
  }
  start() {
    return ((this.so = new yc()), Promise.resolve())
  }
  handleUserChange(t, n, r) {}
  setOnlineState(t) {}
  shutdown() {}
  writeSequenceNumber(t) {}
  notifyBundleLoaded(t) {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Qv {
  _o(t) {}
  shutdown() {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vc {
  constructor() {
    ;((this.ao = () => this.uo()), (this.co = () => this.lo()), (this.ho = []), this.Po())
  }
  _o(t) {
    this.ho.push(t)
  }
  shutdown() {
    ;(window.removeEventListener('online', this.ao), window.removeEventListener('offline', this.co))
  }
  Po() {
    ;(window.addEventListener('online', this.ao), window.addEventListener('offline', this.co))
  }
  uo() {
    Q('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE')
    for (const t of this.ho) t(0)
  }
  lo() {
    Q('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE')
    for (const t of this.ho) t(1)
  }
  static D() {
    return (
      typeof window < 'u' &&
      window.addEventListener !== void 0 &&
      window.removeEventListener !== void 0
    )
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let ii = null
function No() {
  return (
    ii === null
      ? (ii = (function () {
          return 268435456 + Math.round(2147483648 * Math.random())
        })())
      : ii++,
    '0x' + ii.toString(16)
  )
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Yv = {
  BatchGetDocuments: 'batchGet',
  Commit: 'commit',
  RunQuery: 'runQuery',
  RunAggregationQuery: 'runAggregationQuery'
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xv {
  constructor(t) {
    ;((this.Io = t.Io), (this.To = t.To))
  }
  Eo(t) {
    this.Ao = t
  }
  Ro(t) {
    this.Vo = t
  }
  mo(t) {
    this.fo = t
  }
  onMessage(t) {
    this.po = t
  }
  close() {
    this.To()
  }
  send(t) {
    this.Io(t)
  }
  yo() {
    this.Ao()
  }
  wo() {
    this.Vo()
  }
  So(t) {
    this.fo(t)
  }
  bo(t) {
    this.po(t)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Jt = 'WebChannelConnection'
class Jv extends class {
  constructor(n) {
    ;((this.databaseInfo = n), (this.databaseId = n.databaseId))
    const r = n.ssl ? 'https' : 'http',
      s = encodeURIComponent(this.databaseId.projectId),
      i = encodeURIComponent(this.databaseId.database)
    ;((this.Do = r + '://' + n.host),
      (this.vo = `projects/${s}/databases/${i}`),
      (this.Co =
        this.databaseId.database === '(default)'
          ? `project_id=${s}`
          : `project_id=${s}&database_id=${i}`))
  }
  get Fo() {
    return !1
  }
  Mo(n, r, s, i, a) {
    const l = No(),
      c = this.xo(n, r.toUriEncodedString())
    Q('RestConnection', `Sending RPC '${n}' ${l}:`, c, s)
    const f = { 'google-cloud-resource-prefix': this.vo, 'x-goog-request-params': this.Co }
    return (
      this.Oo(f, i, a),
      this.No(n, c, f, s).then(
        (d) => (Q('RestConnection', `Received RPC '${n}' ${l}: `, d), d),
        (d) => {
          throw (
            vr(
              'RestConnection',
              `RPC '${n}' ${l} failed with error: `,
              d,
              'url: ',
              c,
              'request:',
              s
            ),
            d
          )
        }
      )
    )
  }
  Lo(n, r, s, i, a, l) {
    return this.Mo(n, r, s, i, a)
  }
  Oo(n, r, s) {
    ;((n['X-Goog-Api-Client'] = (function () {
      return 'gl-js/ fire/' + xr
    })()),
      (n['Content-Type'] = 'text/plain'),
      this.databaseInfo.appId && (n['X-Firebase-GMPID'] = this.databaseInfo.appId),
      r && r.headers.forEach((i, a) => (n[a] = i)),
      s && s.headers.forEach((i, a) => (n[a] = i)))
  }
  xo(n, r) {
    const s = Yv[n]
    return `${this.Do}/v1/${r}:${s}`
  }
  terminate() {}
} {
  constructor(t) {
    ;(super(t),
      (this.forceLongPolling = t.forceLongPolling),
      (this.autoDetectLongPolling = t.autoDetectLongPolling),
      (this.useFetchStreams = t.useFetchStreams),
      (this.longPollingOptions = t.longPollingOptions))
  }
  No(t, n, r, s) {
    const i = No()
    return new Promise((a, l) => {
      const c = new cf()
      ;(c.setWithCredentials(!0),
        c.listenOnce(hf.COMPLETE, () => {
          try {
            switch (c.getLastErrorCode()) {
              case hi.NO_ERROR:
                const d = c.getResponseJson()
                ;(Q(Jt, `XHR for RPC '${t}' ${i} received:`, JSON.stringify(d)), a(d))
                break
              case hi.TIMEOUT:
                ;(Q(Jt, `RPC '${t}' ${i} timed out`),
                  l(new X(j.DEADLINE_EXCEEDED, 'Request time out')))
                break
              case hi.HTTP_ERROR:
                const m = c.getStatus()
                if (
                  (Q(
                    Jt,
                    `RPC '${t}' ${i} failed with status:`,
                    m,
                    'response text:',
                    c.getResponseText()
                  ),
                  m > 0)
                ) {
                  let w = c.getResponseJson()
                  Array.isArray(w) && (w = w[0])
                  const P = w == null ? void 0 : w.error
                  if (P && P.status && P.message) {
                    const L = (function (O) {
                      const G = O.toLowerCase().replace(/_/g, '-')
                      return Object.values(j).indexOf(G) >= 0 ? G : j.UNKNOWN
                    })(P.status)
                    l(new X(L, P.message))
                  } else l(new X(j.UNKNOWN, 'Server responded with status ' + c.getStatus()))
                } else l(new X(j.UNAVAILABLE, 'Connection failed.'))
                break
              default:
                rt()
            }
          } finally {
            Q(Jt, `RPC '${t}' ${i} completed.`)
          }
        }))
      const f = JSON.stringify(s)
      ;(Q(Jt, `RPC '${t}' ${i} sending request:`, s), c.send(n, 'POST', f, r, 15))
    })
  }
  Bo(t, n, r) {
    const s = No(),
      i = [this.Do, '/', 'google.firestore.v1.Firestore', '/', t, '/channel'],
      a = pf(),
      l = df(),
      c = {
        httpSessionIdParam: 'gsessionid',
        initMessageHeaders: {},
        messageUrlParams: {
          database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
        },
        sendRawJson: !0,
        supportsCrossDomainXhr: !0,
        internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
        forceLongPolling: this.forceLongPolling,
        detectBufferingProxy: this.autoDetectLongPolling
      },
      f = this.longPollingOptions.timeoutSeconds
    ;(f !== void 0 && (c.longPollingTimeout = Math.round(1e3 * f)),
      this.useFetchStreams && (c.useFetchStreams = !0),
      this.Oo(c.initMessageHeaders, n, r),
      (c.encodeInitMessageHeaders = !0))
    const d = i.join('')
    Q(Jt, `Creating RPC '${t}' stream ${s}: ${d}`, c)
    const m = a.createWebChannel(d, c)
    let w = !1,
      P = !1
    const L = new Xv({
        Io: (O) => {
          P
            ? Q(Jt, `Not sending because RPC '${t}' stream ${s} is closed:`, O)
            : (w || (Q(Jt, `Opening RPC '${t}' stream ${s} transport.`), m.open(), (w = !0)),
              Q(Jt, `RPC '${t}' stream ${s} sending:`, O),
              m.send(O))
        },
        To: () => m.close()
      }),
      D = (O, G, g) => {
        O.listen(G, (S) => {
          try {
            g(S)
          } catch (K) {
            setTimeout(() => {
              throw K
            }, 0)
          }
        })
      }
    return (
      D(m, Zr.EventType.OPEN, () => {
        P || (Q(Jt, `RPC '${t}' stream ${s} transport opened.`), L.yo())
      }),
      D(m, Zr.EventType.CLOSE, () => {
        P || ((P = !0), Q(Jt, `RPC '${t}' stream ${s} transport closed`), L.So())
      }),
      D(m, Zr.EventType.ERROR, (O) => {
        P ||
          ((P = !0),
          vr(Jt, `RPC '${t}' stream ${s} transport errored:`, O),
          L.So(new X(j.UNAVAILABLE, 'The operation could not be completed')))
      }),
      D(m, Zr.EventType.MESSAGE, (O) => {
        var G
        if (!P) {
          const g = O.data[0]
          Tt(!!g)
          const S = g,
            K = S.error || ((G = S[0]) === null || G === void 0 ? void 0 : G.error)
          if (K) {
            Q(Jt, `RPC '${t}' stream ${s} received error:`, K)
            const ut = K.status
            let _t = (function (E) {
                const T = Ot[E]
                if (T !== void 0) return Uf(T)
              })(ut),
              I = K.message
            ;(_t === void 0 &&
              ((_t = j.INTERNAL),
              (I = 'Unknown error status: ' + ut + ' with message ' + K.message)),
              (P = !0),
              L.So(new X(_t, I)),
              m.close())
          } else (Q(Jt, `RPC '${t}' stream ${s} received:`, g), L.bo(g))
        }
      }),
      D(l, ff.STAT_EVENT, (O) => {
        O.stat === ea.PROXY
          ? Q(Jt, `RPC '${t}' stream ${s} detected buffering proxy`)
          : O.stat === ea.NOPROXY && Q(Jt, `RPC '${t}' stream ${s} detected no buffering proxy`)
      }),
      setTimeout(() => {
        L.wo()
      }, 0),
      L
    )
  }
}
function Oo() {
  return typeof document < 'u' ? document : null
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zi(e) {
  return new lv(e, !0)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xf {
  constructor(t, n, r = 1e3, s = 1.5, i = 6e4) {
    ;((this.ui = t),
      (this.timerId = n),
      (this.ko = r),
      (this.qo = s),
      (this.Qo = i),
      (this.Ko = 0),
      (this.$o = null),
      (this.Uo = Date.now()),
      this.reset())
  }
  reset() {
    this.Ko = 0
  }
  Wo() {
    this.Ko = this.Qo
  }
  Go(t) {
    this.cancel()
    const n = Math.floor(this.Ko + this.zo()),
      r = Math.max(0, Date.now() - this.Uo),
      s = Math.max(0, n - r)
    ;(s > 0 &&
      Q(
        'ExponentialBackoff',
        `Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`
      ),
      (this.$o = this.ui.enqueueAfterDelay(this.timerId, s, () => ((this.Uo = Date.now()), t()))),
      (this.Ko *= this.qo),
      this.Ko < this.ko && (this.Ko = this.ko),
      this.Ko > this.Qo && (this.Ko = this.Qo))
  }
  jo() {
    this.$o !== null && (this.$o.skipDelay(), (this.$o = null))
  }
  cancel() {
    this.$o !== null && (this.$o.cancel(), (this.$o = null))
  }
  zo() {
    return (Math.random() - 0.5) * this.Ko
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jf {
  constructor(t, n, r, s, i, a, l, c) {
    ;((this.ui = t),
      (this.Ho = r),
      (this.Jo = s),
      (this.connection = i),
      (this.authCredentialsProvider = a),
      (this.appCheckCredentialsProvider = l),
      (this.listener = c),
      (this.state = 0),
      (this.Yo = 0),
      (this.Zo = null),
      (this.Xo = null),
      (this.stream = null),
      (this.e_ = 0),
      (this.t_ = new Xf(t, n)))
  }
  n_() {
    return this.state === 1 || this.state === 5 || this.r_()
  }
  r_() {
    return this.state === 2 || this.state === 3
  }
  start() {
    ;((this.e_ = 0), this.state !== 4 ? this.auth() : this.i_())
  }
  async stop() {
    this.n_() && (await this.close(0))
  }
  s_() {
    ;((this.state = 0), this.t_.reset())
  }
  o_() {
    this.r_() &&
      this.Zo === null &&
      (this.Zo = this.ui.enqueueAfterDelay(this.Ho, 6e4, () => this.__()))
  }
  a_(t) {
    ;(this.u_(), this.stream.send(t))
  }
  async __() {
    if (this.r_()) return this.close(0)
  }
  u_() {
    this.Zo && (this.Zo.cancel(), (this.Zo = null))
  }
  c_() {
    this.Xo && (this.Xo.cancel(), (this.Xo = null))
  }
  async close(t, n) {
    ;(this.u_(),
      this.c_(),
      this.t_.cancel(),
      this.Yo++,
      t !== 4
        ? this.t_.reset()
        : n && n.code === j.RESOURCE_EXHAUSTED
          ? (un(n.toString()),
            un('Using maximum backoff delay to prevent overloading the backend.'),
            this.t_.Wo())
          : n &&
            n.code === j.UNAUTHENTICATED &&
            this.state !== 3 &&
            (this.authCredentialsProvider.invalidateToken(),
            this.appCheckCredentialsProvider.invalidateToken()),
      this.stream !== null && (this.l_(), this.stream.close(), (this.stream = null)),
      (this.state = t),
      await this.listener.mo(n))
  }
  l_() {}
  auth() {
    this.state = 1
    const t = this.h_(this.Yo),
      n = this.Yo
    Promise.all([
      this.authCredentialsProvider.getToken(),
      this.appCheckCredentialsProvider.getToken()
    ]).then(
      ([r, s]) => {
        this.Yo === n && this.P_(r, s)
      },
      (r) => {
        t(() => {
          const s = new X(j.UNKNOWN, 'Fetching auth token failed: ' + r.message)
          return this.I_(s)
        })
      }
    )
  }
  P_(t, n) {
    const r = this.h_(this.Yo)
    ;((this.stream = this.T_(t, n)),
      this.stream.Eo(() => {
        r(() => this.listener.Eo())
      }),
      this.stream.Ro(() => {
        r(
          () => (
            (this.state = 2),
            (this.Xo = this.ui.enqueueAfterDelay(
              this.Jo,
              1e4,
              () => (this.r_() && (this.state = 3), Promise.resolve())
            )),
            this.listener.Ro()
          )
        )
      }),
      this.stream.mo((s) => {
        r(() => this.I_(s))
      }),
      this.stream.onMessage((s) => {
        r(() => (++this.e_ == 1 ? this.E_(s) : this.onNext(s)))
      }))
  }
  i_() {
    ;((this.state = 5),
      this.t_.Go(async () => {
        ;((this.state = 0), this.start())
      }))
  }
  I_(t) {
    return (Q('PersistentStream', `close with error: ${t}`), (this.stream = null), this.close(4, t))
  }
  h_(t) {
    return (n) => {
      this.ui.enqueueAndForget(() =>
        this.Yo === t
          ? n()
          : (Q('PersistentStream', 'stream callback skipped by getCloseGuardedDispatcher.'),
            Promise.resolve())
      )
    }
  }
}
class Zv extends Jf {
  constructor(t, n, r, s, i, a) {
    ;(super(
      t,
      'listen_stream_connection_backoff',
      'listen_stream_idle',
      'health_check_timeout',
      n,
      r,
      s,
      a
    ),
      (this.serializer = i))
  }
  T_(t, n) {
    return this.connection.Bo('Listen', t, n)
  }
  E_(t) {
    return this.onNext(t)
  }
  onNext(t) {
    this.t_.reset()
    const n = hv(this.serializer, t),
      r = (function (i) {
        if (!('targetChange' in i)) return st.min()
        const a = i.targetChange
        return a.targetIds && a.targetIds.length ? st.min() : a.readTime ? Be(a.readTime) : st.min()
      })(t)
    return this.listener.d_(n, r)
  }
  A_(t) {
    const n = {}
    ;((n.database = ca(this.serializer)),
      (n.addTarget = (function (i, a) {
        let l
        const c = a.target
        if (
          ((l = ia(c) ? { documents: pv(i, c) } : { query: mv(i, c)._t }),
          (l.targetId = a.targetId),
          a.resumeToken.approximateByteSize() > 0)
        ) {
          l.resumeToken = $f(i, a.resumeToken)
          const f = aa(i, a.expectedCount)
          f !== null && (l.expectedCount = f)
        } else if (a.snapshotVersion.compareTo(st.min()) > 0) {
          l.readTime = xi(i, a.snapshotVersion.toTimestamp())
          const f = aa(i, a.expectedCount)
          f !== null && (l.expectedCount = f)
        }
        return l
      })(this.serializer, t)))
    const r = _v(this.serializer, t)
    ;(r && (n.labels = r), this.a_(n))
  }
  R_(t) {
    const n = {}
    ;((n.database = ca(this.serializer)), (n.removeTarget = t), this.a_(n))
  }
}
class tE extends Jf {
  constructor(t, n, r, s, i, a) {
    ;(super(
      t,
      'write_stream_connection_backoff',
      'write_stream_idle',
      'health_check_timeout',
      n,
      r,
      s,
      a
    ),
      (this.serializer = i))
  }
  get V_() {
    return this.e_ > 0
  }
  start() {
    ;((this.lastStreamToken = void 0), super.start())
  }
  l_() {
    this.V_ && this.m_([])
  }
  T_(t, n) {
    return this.connection.Bo('Write', t, n)
  }
  E_(t) {
    return (
      Tt(!!t.streamToken),
      (this.lastStreamToken = t.streamToken),
      Tt(!t.writeResults || t.writeResults.length === 0),
      this.listener.f_()
    )
  }
  onNext(t) {
    ;(Tt(!!t.streamToken), (this.lastStreamToken = t.streamToken), this.t_.reset())
    const n = dv(t.writeResults, t.commitTime),
      r = Be(t.commitTime)
    return this.listener.g_(r, n)
  }
  p_() {
    const t = {}
    ;((t.database = ca(this.serializer)), this.a_(t))
  }
  m_(t) {
    const n = { streamToken: this.lastStreamToken, writes: t.map((r) => fv(this.serializer, r)) }
    this.a_(n)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eE extends class {} {
  constructor(t, n, r, s) {
    ;(super(),
      (this.authCredentials = t),
      (this.appCheckCredentials = n),
      (this.connection = r),
      (this.serializer = s),
      (this.y_ = !1))
  }
  w_() {
    if (this.y_) throw new X(j.FAILED_PRECONDITION, 'The client has already been terminated.')
  }
  Mo(t, n, r, s) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([i, a]) => this.connection.Mo(t, la(n, r), s, i, a))
        .catch((i) => {
          throw i.name === 'FirebaseError'
            ? (i.code === j.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              i)
            : new X(j.UNKNOWN, i.toString())
        })
    )
  }
  Lo(t, n, r, s, i) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([a, l]) => this.connection.Lo(t, la(n, r), s, a, l, i))
        .catch((a) => {
          throw a.name === 'FirebaseError'
            ? (a.code === j.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              a)
            : new X(j.UNKNOWN, a.toString())
        })
    )
  }
  terminate() {
    ;((this.y_ = !0), this.connection.terminate())
  }
}
class nE {
  constructor(t, n) {
    ;((this.asyncQueue = t),
      (this.onlineStateHandler = n),
      (this.state = 'Unknown'),
      (this.S_ = 0),
      (this.b_ = null),
      (this.D_ = !0))
  }
  v_() {
    this.S_ === 0 &&
      (this.C_('Unknown'),
      (this.b_ = this.asyncQueue.enqueueAfterDelay(
        'online_state_timeout',
        1e4,
        () => (
          (this.b_ = null),
          this.F_("Backend didn't respond within 10 seconds."),
          this.C_('Offline'),
          Promise.resolve()
        )
      )))
  }
  M_(t) {
    this.state === 'Online'
      ? this.C_('Unknown')
      : (this.S_++,
        this.S_ >= 1 &&
          (this.x_(),
          this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),
          this.C_('Offline')))
  }
  set(t) {
    ;(this.x_(), (this.S_ = 0), t === 'Online' && (this.D_ = !1), this.C_(t))
  }
  C_(t) {
    t !== this.state && ((this.state = t), this.onlineStateHandler(t))
  }
  F_(t) {
    const n = `Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`
    this.D_ ? (un(n), (this.D_ = !1)) : Q('OnlineStateTracker', n)
  }
  x_() {
    this.b_ !== null && (this.b_.cancel(), (this.b_ = null))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class rE {
  constructor(t, n, r, s, i) {
    ;((this.localStore = t),
      (this.datastore = n),
      (this.asyncQueue = r),
      (this.remoteSyncer = {}),
      (this.O_ = []),
      (this.N_ = new Map()),
      (this.L_ = new Set()),
      (this.B_ = []),
      (this.k_ = i),
      this.k_._o((a) => {
        r.enqueueAndForget(async () => {
          Jn(this) &&
            (Q('RemoteStore', 'Restarting streams for network reachability change.'),
            await (async function (c) {
              const f = it(c)
              ;(f.L_.add(4), await Ns(f), f.q_.set('Unknown'), f.L_.delete(4), await to(f))
            })(this))
        })
      }),
      (this.q_ = new nE(r, s)))
  }
}
async function to(e) {
  if (Jn(e)) for (const t of e.B_) await t(!0)
}
async function Ns(e) {
  for (const t of e.B_) await t(!1)
}
function Zf(e, t) {
  const n = it(e)
  n.N_.has(t.targetId) || (n.N_.set(t.targetId, t), Za(n) ? Ja(n) : Cr(n).r_() && Xa(n, t))
}
function Ya(e, t) {
  const n = it(e),
    r = Cr(n)
  ;(n.N_.delete(t),
    r.r_() && td(n, t),
    n.N_.size === 0 && (r.r_() ? r.o_() : Jn(n) && n.q_.set('Unknown')))
}
function Xa(e, t) {
  if (
    (e.Q_.xe(t.targetId),
    t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(st.min()) > 0)
  ) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size
    t = t.withExpectedCount(n)
  }
  Cr(e).A_(t)
}
function td(e, t) {
  ;(e.Q_.xe(t), Cr(e).R_(t))
}
function Ja(e) {
  ;((e.Q_ = new sv({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    ot: (t) => e.N_.get(t) || null,
    tt: () => e.datastore.serializer.databaseId
  })),
    Cr(e).start(),
    e.q_.v_())
}
function Za(e) {
  return Jn(e) && !Cr(e).n_() && e.N_.size > 0
}
function Jn(e) {
  return it(e).L_.size === 0
}
function ed(e) {
  e.Q_ = void 0
}
async function sE(e) {
  e.q_.set('Online')
}
async function iE(e) {
  e.N_.forEach((t, n) => {
    Xa(e, t)
  })
}
async function oE(e, t) {
  ;(ed(e), Za(e) ? (e.q_.M_(t), Ja(e)) : e.q_.set('Unknown'))
}
async function aE(e, t, n) {
  if ((e.q_.set('Online'), t instanceof jf && t.state === 2 && t.cause))
    try {
      await (async function (s, i) {
        const a = i.cause
        for (const l of i.targetIds)
          s.N_.has(l) &&
            (await s.remoteSyncer.rejectListen(l, a), s.N_.delete(l), s.Q_.removeTarget(l))
      })(e, t)
    } catch (r) {
      ;(Q('RemoteStore', 'Failed to remove targets %s: %s ', t.targetIds.join(','), r),
        await Pi(e, r))
    }
  else if (
    (t instanceof pi ? e.Q_.Ke(t) : t instanceof Bf ? e.Q_.He(t) : e.Q_.We(t), !n.isEqual(st.min()))
  )
    try {
      const r = await Yf(e.localStore)
      n.compareTo(r) >= 0 &&
        (await (function (i, a) {
          const l = i.Q_.rt(a)
          return (
            l.targetChanges.forEach((c, f) => {
              if (c.resumeToken.approximateByteSize() > 0) {
                const d = i.N_.get(f)
                d && i.N_.set(f, d.withResumeToken(c.resumeToken, a))
              }
            }),
            l.targetMismatches.forEach((c, f) => {
              const d = i.N_.get(c)
              if (!d) return
              ;(i.N_.set(c, d.withResumeToken(Gt.EMPTY_BYTE_STRING, d.snapshotVersion)), td(i, c))
              const m = new vn(d.target, c, f, d.sequenceNumber)
              Xa(i, m)
            }),
            i.remoteSyncer.applyRemoteEvent(l)
          )
        })(e, n))
    } catch (r) {
      ;(Q('RemoteStore', 'Failed to raise snapshot:', r), await Pi(e, r))
    }
}
async function Pi(e, t, n) {
  if (!Vs(t)) throw t
  ;(e.L_.add(1),
    await Ns(e),
    e.q_.set('Offline'),
    n || (n = () => Yf(e.localStore)),
    e.asyncQueue.enqueueRetryable(async () => {
      ;(Q('RemoteStore', 'Retrying IndexedDB access'), await n(), e.L_.delete(1), await to(e))
    }))
}
function nd(e, t) {
  return t().catch((n) => Pi(e, n, t))
}
async function eo(e) {
  const t = it(e),
    n = Cn(t)
  let r = t.O_.length > 0 ? t.O_[t.O_.length - 1].batchId : -1
  for (; lE(t); )
    try {
      const s = await Hv(t.localStore, r)
      if (s === null) {
        t.O_.length === 0 && n.o_()
        break
      }
      ;((r = s.batchId), uE(t, s))
    } catch (s) {
      await Pi(t, s)
    }
  rd(t) && sd(t)
}
function lE(e) {
  return Jn(e) && e.O_.length < 10
}
function uE(e, t) {
  e.O_.push(t)
  const n = Cn(e)
  n.r_() && n.V_ && n.m_(t.mutations)
}
function rd(e) {
  return Jn(e) && !Cn(e).n_() && e.O_.length > 0
}
function sd(e) {
  Cn(e).start()
}
async function cE(e) {
  Cn(e).p_()
}
async function hE(e) {
  const t = Cn(e)
  for (const n of e.O_) t.m_(n.mutations)
}
async function fE(e, t, n) {
  const r = e.O_.shift(),
    s = Ka.from(r, t, n)
  ;(await nd(e, () => e.remoteSyncer.applySuccessfulWrite(s)), await eo(e))
}
async function dE(e, t) {
  ;(t &&
    Cn(e).V_ &&
    (await (async function (r, s) {
      if (
        (function (a) {
          return ev(a) && a !== j.ABORTED
        })(s.code)
      ) {
        const i = r.O_.shift()
        ;(Cn(r).s_(),
          await nd(r, () => r.remoteSyncer.rejectFailedWrite(i.batchId, s)),
          await eo(r))
      }
    })(e, t)),
    rd(e) && sd(e))
}
async function Ec(e, t) {
  const n = it(e)
  ;(n.asyncQueue.verifyOperationInProgress(),
    Q('RemoteStore', 'RemoteStore received new credentials'))
  const r = Jn(n)
  ;(n.L_.add(3),
    await Ns(n),
    r && n.q_.set('Unknown'),
    await n.remoteSyncer.handleCredentialChange(t),
    n.L_.delete(3),
    await to(n))
}
async function pE(e, t) {
  const n = it(e)
  t ? (n.L_.delete(2), await to(n)) : t || (n.L_.add(2), await Ns(n), n.q_.set('Unknown'))
}
function Cr(e) {
  return (
    e.K_ ||
      ((e.K_ = (function (n, r, s) {
        const i = it(n)
        return (
          i.w_(),
          new Zv(r, i.connection, i.authCredentials, i.appCheckCredentials, i.serializer, s)
        )
      })(e.datastore, e.asyncQueue, {
        Eo: sE.bind(null, e),
        Ro: iE.bind(null, e),
        mo: oE.bind(null, e),
        d_: aE.bind(null, e)
      })),
      e.B_.push(async (t) => {
        t ? (e.K_.s_(), Za(e) ? Ja(e) : e.q_.set('Unknown')) : (await e.K_.stop(), ed(e))
      })),
    e.K_
  )
}
function Cn(e) {
  return (
    e.U_ ||
      ((e.U_ = (function (n, r, s) {
        const i = it(n)
        return (
          i.w_(),
          new tE(r, i.connection, i.authCredentials, i.appCheckCredentials, i.serializer, s)
        )
      })(e.datastore, e.asyncQueue, {
        Eo: () => Promise.resolve(),
        Ro: cE.bind(null, e),
        mo: dE.bind(null, e),
        f_: hE.bind(null, e),
        g_: fE.bind(null, e)
      })),
      e.B_.push(async (t) => {
        t
          ? (e.U_.s_(), await eo(e))
          : (await e.U_.stop(),
            e.O_.length > 0 &&
              (Q('RemoteStore', `Stopping write stream with ${e.O_.length} pending writes`),
              (e.O_ = [])))
      })),
    e.U_
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class tl {
  constructor(t, n, r, s, i) {
    ;((this.asyncQueue = t),
      (this.timerId = n),
      (this.targetTimeMs = r),
      (this.op = s),
      (this.removalCallback = i),
      (this.deferred = new bn()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch((a) => {}))
  }
  get promise() {
    return this.deferred.promise
  }
  static createAndSchedule(t, n, r, s, i) {
    const a = Date.now() + r,
      l = new tl(t, n, a, s, i)
    return (l.start(r), l)
  }
  start(t) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t)
  }
  skipDelay() {
    return this.handleDelayElapsed()
  }
  cancel(t) {
    this.timerHandle !== null &&
      (this.clearTimeout(),
      this.deferred.reject(new X(j.CANCELLED, 'Operation cancelled' + (t ? ': ' + t : ''))))
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() =>
      this.timerHandle !== null
        ? (this.clearTimeout(), this.op().then((t) => this.deferred.resolve(t)))
        : Promise.resolve()
    )
  }
  clearTimeout() {
    this.timerHandle !== null &&
      (this.removalCallback(this), clearTimeout(this.timerHandle), (this.timerHandle = null))
  }
}
function el(e, t) {
  if ((un('AsyncQueue', `${t}: ${e}`), Vs(e))) return new X(j.UNAVAILABLE, `${t}: ${e}`)
  throw e
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dr {
  constructor(t) {
    ;((this.comparator = t
      ? (n, r) => t(n, r) || Z.comparator(n.key, r.key)
      : (n, r) => Z.comparator(n.key, r.key)),
      (this.keyedMap = ts()),
      (this.sortedSet = new Ct(this.comparator)))
  }
  static emptySet(t) {
    return new dr(t.comparator)
  }
  has(t) {
    return this.keyedMap.get(t) != null
  }
  get(t) {
    return this.keyedMap.get(t)
  }
  first() {
    return this.sortedSet.minKey()
  }
  last() {
    return this.sortedSet.maxKey()
  }
  isEmpty() {
    return this.sortedSet.isEmpty()
  }
  indexOf(t) {
    const n = this.keyedMap.get(t)
    return n ? this.sortedSet.indexOf(n) : -1
  }
  get size() {
    return this.sortedSet.size
  }
  forEach(t) {
    this.sortedSet.inorderTraversal((n, r) => (t(n), !1))
  }
  add(t) {
    const n = this.delete(t.key)
    return n.copy(n.keyedMap.insert(t.key, t), n.sortedSet.insert(t, null))
  }
  delete(t) {
    const n = this.get(t)
    return n ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(n)) : this
  }
  isEqual(t) {
    if (!(t instanceof dr) || this.size !== t.size) return !1
    const n = this.sortedSet.getIterator(),
      r = t.sortedSet.getIterator()
    for (; n.hasNext(); ) {
      const s = n.getNext().key,
        i = r.getNext().key
      if (!s.isEqual(i)) return !1
    }
    return !0
  }
  toString() {
    const t = []
    return (
      this.forEach((n) => {
        t.push(n.toString())
      }),
      t.length === 0
        ? 'DocumentSet ()'
        : `DocumentSet (
  ` +
          t.join(`  
`) +
          `
)`
    )
  }
  copy(t, n) {
    const r = new dr()
    return ((r.comparator = this.comparator), (r.keyedMap = t), (r.sortedSet = n), r)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Tc {
  constructor() {
    this.W_ = new Ct(Z.comparator)
  }
  track(t) {
    const n = t.doc.key,
      r = this.W_.get(n)
    r
      ? t.type !== 0 && r.type === 3
        ? (this.W_ = this.W_.insert(n, t))
        : t.type === 3 && r.type !== 1
          ? (this.W_ = this.W_.insert(n, { type: r.type, doc: t.doc }))
          : t.type === 2 && r.type === 2
            ? (this.W_ = this.W_.insert(n, { type: 2, doc: t.doc }))
            : t.type === 2 && r.type === 0
              ? (this.W_ = this.W_.insert(n, { type: 0, doc: t.doc }))
              : t.type === 1 && r.type === 0
                ? (this.W_ = this.W_.remove(n))
                : t.type === 1 && r.type === 2
                  ? (this.W_ = this.W_.insert(n, { type: 1, doc: r.doc }))
                  : t.type === 0 && r.type === 1
                    ? (this.W_ = this.W_.insert(n, { type: 2, doc: t.doc }))
                    : rt()
      : (this.W_ = this.W_.insert(n, t))
  }
  G_() {
    const t = []
    return (
      this.W_.inorderTraversal((n, r) => {
        t.push(r)
      }),
      t
    )
  }
}
class Ir {
  constructor(t, n, r, s, i, a, l, c, f) {
    ;((this.query = t),
      (this.docs = n),
      (this.oldDocs = r),
      (this.docChanges = s),
      (this.mutatedKeys = i),
      (this.fromCache = a),
      (this.syncStateChanged = l),
      (this.excludesMetadataChanges = c),
      (this.hasCachedResults = f))
  }
  static fromInitialDocuments(t, n, r, s, i) {
    const a = []
    return (
      n.forEach((l) => {
        a.push({ type: 0, doc: l })
      }),
      new Ir(t, n, dr.emptySet(n), a, r, s, !0, !1, i)
    )
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty()
  }
  isEqual(t) {
    if (
      !(
        this.fromCache === t.fromCache &&
        this.hasCachedResults === t.hasCachedResults &&
        this.syncStateChanged === t.syncStateChanged &&
        this.mutatedKeys.isEqual(t.mutatedKeys) &&
        Gi(this.query, t.query) &&
        this.docs.isEqual(t.docs) &&
        this.oldDocs.isEqual(t.oldDocs)
      )
    )
      return !1
    const n = this.docChanges,
      r = t.docChanges
    if (n.length !== r.length) return !1
    for (let s = 0; s < n.length; s++)
      if (n[s].type !== r[s].type || !n[s].doc.isEqual(r[s].doc)) return !1
    return !0
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mE {
  constructor() {
    ;((this.z_ = void 0), (this.j_ = []))
  }
  H_() {
    return this.j_.some((t) => t.J_())
  }
}
class gE {
  constructor() {
    ;((this.queries = wc()), (this.onlineState = 'Unknown'), (this.Y_ = new Set()))
  }
  terminate() {
    ;(function (n, r) {
      const s = it(n),
        i = s.queries
      ;((s.queries = wc()),
        i.forEach((a, l) => {
          for (const c of l.j_) c.onError(r)
        }))
    })(this, new X(j.ABORTED, 'Firestore shutting down'))
  }
}
function wc() {
  return new Sr((e) => Rf(e), Gi)
}
async function _E(e, t) {
  const n = it(e)
  let r = 3
  const s = t.query
  let i = n.queries.get(s)
  i ? !i.H_() && t.J_() && (r = 2) : ((i = new mE()), (r = t.J_() ? 0 : 1))
  try {
    switch (r) {
      case 0:
        i.z_ = await n.onListen(s, !0)
        break
      case 1:
        i.z_ = await n.onListen(s, !1)
        break
      case 2:
        await n.onFirstRemoteStoreListen(s)
    }
  } catch (a) {
    const l = el(a, `Initialization of query '${or(t.query)}' failed`)
    return void t.onError(l)
  }
  ;(n.queries.set(s, i), i.j_.push(t), t.Z_(n.onlineState), i.z_ && t.X_(i.z_) && nl(n))
}
async function yE(e, t) {
  const n = it(e),
    r = t.query
  let s = 3
  const i = n.queries.get(r)
  if (i) {
    const a = i.j_.indexOf(t)
    a >= 0 &&
      (i.j_.splice(a, 1), i.j_.length === 0 ? (s = t.J_() ? 0 : 1) : !i.H_() && t.J_() && (s = 2))
  }
  switch (s) {
    case 0:
      return (n.queries.delete(r), n.onUnlisten(r, !0))
    case 1:
      return (n.queries.delete(r), n.onUnlisten(r, !1))
    case 2:
      return n.onLastRemoteStoreUnlisten(r)
    default:
      return
  }
}
function vE(e, t) {
  const n = it(e)
  let r = !1
  for (const s of t) {
    const i = s.query,
      a = n.queries.get(i)
    if (a) {
      for (const l of a.j_) l.X_(s) && (r = !0)
      a.z_ = s
    }
  }
  r && nl(n)
}
function EE(e, t, n) {
  const r = it(e),
    s = r.queries.get(t)
  if (s) for (const i of s.j_) i.onError(n)
  r.queries.delete(t)
}
function nl(e) {
  e.Y_.forEach((t) => {
    t.next()
  })
}
var fa, bc
;(((bc = fa || (fa = {})).ea = 'default'), (bc.Cache = 'cache'))
class TE {
  constructor(t, n, r) {
    ;((this.query = t),
      (this.ta = n),
      (this.na = !1),
      (this.ra = null),
      (this.onlineState = 'Unknown'),
      (this.options = r || {}))
  }
  X_(t) {
    if (!this.options.includeMetadataChanges) {
      const r = []
      for (const s of t.docChanges) s.type !== 3 && r.push(s)
      t = new Ir(
        t.query,
        t.docs,
        t.oldDocs,
        r,
        t.mutatedKeys,
        t.fromCache,
        t.syncStateChanged,
        !0,
        t.hasCachedResults
      )
    }
    let n = !1
    return (
      this.na
        ? this.ia(t) && (this.ta.next(t), (n = !0))
        : this.sa(t, this.onlineState) && (this.oa(t), (n = !0)),
      (this.ra = t),
      n
    )
  }
  onError(t) {
    this.ta.error(t)
  }
  Z_(t) {
    this.onlineState = t
    let n = !1
    return (this.ra && !this.na && this.sa(this.ra, t) && (this.oa(this.ra), (n = !0)), n)
  }
  sa(t, n) {
    if (!t.fromCache || !this.J_()) return !0
    const r = n !== 'Offline'
    return (!this.options._a || !r) && (!t.docs.isEmpty() || t.hasCachedResults || n === 'Offline')
  }
  ia(t) {
    if (t.docChanges.length > 0) return !0
    const n = this.ra && this.ra.hasPendingWrites !== t.hasPendingWrites
    return !(!t.syncStateChanged && !n) && this.options.includeMetadataChanges === !0
  }
  oa(t) {
    ;((t = Ir.fromInitialDocuments(
      t.query,
      t.docs,
      t.mutatedKeys,
      t.fromCache,
      t.hasCachedResults
    )),
      (this.na = !0),
      this.ta.next(t))
  }
  J_() {
    return this.options.source !== fa.Cache
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class id {
  constructor(t) {
    this.key = t
  }
}
class od {
  constructor(t) {
    this.key = t
  }
}
class wE {
  constructor(t, n) {
    ;((this.query = t),
      (this.Ta = n),
      (this.Ea = null),
      (this.hasCachedResults = !1),
      (this.current = !1),
      (this.da = lt()),
      (this.mutatedKeys = lt()),
      (this.Aa = xf(t)),
      (this.Ra = new dr(this.Aa)))
  }
  get Va() {
    return this.Ta
  }
  ma(t, n) {
    const r = n ? n.fa : new Tc(),
      s = n ? n.Ra : this.Ra
    let i = n ? n.mutatedKeys : this.mutatedKeys,
      a = s,
      l = !1
    const c = this.query.limitType === 'F' && s.size === this.query.limit ? s.last() : null,
      f = this.query.limitType === 'L' && s.size === this.query.limit ? s.first() : null
    if (
      (t.inorderTraversal((d, m) => {
        const w = s.get(d),
          P = Qi(this.query, m) ? m : null,
          L = !!w && this.mutatedKeys.has(w.key),
          D =
            !!P && (P.hasLocalMutations || (this.mutatedKeys.has(P.key) && P.hasCommittedMutations))
        let O = !1
        ;(w && P
          ? w.data.isEqual(P.data)
            ? L !== D && (r.track({ type: 3, doc: P }), (O = !0))
            : this.ga(w, P) ||
              (r.track({ type: 2, doc: P }),
              (O = !0),
              ((c && this.Aa(P, c) > 0) || (f && this.Aa(P, f) < 0)) && (l = !0))
          : !w && P
            ? (r.track({ type: 0, doc: P }), (O = !0))
            : w && !P && (r.track({ type: 1, doc: w }), (O = !0), (c || f) && (l = !0)),
          O &&
            (P
              ? ((a = a.add(P)), (i = D ? i.add(d) : i.delete(d)))
              : ((a = a.delete(d)), (i = i.delete(d)))))
      }),
      this.query.limit !== null)
    )
      for (; a.size > this.query.limit; ) {
        const d = this.query.limitType === 'F' ? a.last() : a.first()
        ;((a = a.delete(d.key)), (i = i.delete(d.key)), r.track({ type: 1, doc: d }))
      }
    return { Ra: a, fa: r, ns: l, mutatedKeys: i }
  }
  ga(t, n) {
    return t.hasLocalMutations && n.hasCommittedMutations && !n.hasLocalMutations
  }
  applyChanges(t, n, r, s) {
    const i = this.Ra
    ;((this.Ra = t.Ra), (this.mutatedKeys = t.mutatedKeys))
    const a = t.fa.G_()
    ;(a.sort(
      (d, m) =>
        (function (P, L) {
          const D = (O) => {
            switch (O) {
              case 0:
                return 1
              case 2:
              case 3:
                return 2
              case 1:
                return 0
              default:
                return rt()
            }
          }
          return D(P) - D(L)
        })(d.type, m.type) || this.Aa(d.doc, m.doc)
    ),
      this.pa(r),
      (s = s != null && s))
    const l = n && !s ? this.ya() : [],
      c = this.da.size === 0 && this.current && !s ? 1 : 0,
      f = c !== this.Ea
    return (
      (this.Ea = c),
      a.length !== 0 || f
        ? {
            snapshot: new Ir(
              this.query,
              t.Ra,
              i,
              a,
              t.mutatedKeys,
              c === 0,
              f,
              !1,
              !!r && r.resumeToken.approximateByteSize() > 0
            ),
            wa: l
          }
        : { wa: l }
    )
  }
  Z_(t) {
    return this.current && t === 'Offline'
      ? ((this.current = !1),
        this.applyChanges({ Ra: this.Ra, fa: new Tc(), mutatedKeys: this.mutatedKeys, ns: !1 }, !1))
      : { wa: [] }
  }
  Sa(t) {
    return !this.Ta.has(t) && !!this.Ra.has(t) && !this.Ra.get(t).hasLocalMutations
  }
  pa(t) {
    t &&
      (t.addedDocuments.forEach((n) => (this.Ta = this.Ta.add(n))),
      t.modifiedDocuments.forEach((n) => {}),
      t.removedDocuments.forEach((n) => (this.Ta = this.Ta.delete(n))),
      (this.current = t.current))
  }
  ya() {
    if (!this.current) return []
    const t = this.da
    ;((this.da = lt()),
      this.Ra.forEach((r) => {
        this.Sa(r.key) && (this.da = this.da.add(r.key))
      }))
    const n = []
    return (
      t.forEach((r) => {
        this.da.has(r) || n.push(new od(r))
      }),
      this.da.forEach((r) => {
        t.has(r) || n.push(new id(r))
      }),
      n
    )
  }
  ba(t) {
    ;((this.Ta = t.Ts), (this.da = lt()))
    const n = this.ma(t.documents)
    return this.applyChanges(n, !0)
  }
  Da() {
    return Ir.fromInitialDocuments(
      this.query,
      this.Ra,
      this.mutatedKeys,
      this.Ea === 0,
      this.hasCachedResults
    )
  }
}
class bE {
  constructor(t, n, r) {
    ;((this.query = t), (this.targetId = n), (this.view = r))
  }
}
class IE {
  constructor(t) {
    ;((this.key = t), (this.va = !1))
  }
}
class AE {
  constructor(t, n, r, s, i, a) {
    ;((this.localStore = t),
      (this.remoteStore = n),
      (this.eventManager = r),
      (this.sharedClientState = s),
      (this.currentUser = i),
      (this.maxConcurrentLimboResolutions = a),
      (this.Ca = {}),
      (this.Fa = new Sr((l) => Rf(l), Gi)),
      (this.Ma = new Map()),
      (this.xa = new Set()),
      (this.Oa = new Ct(Z.comparator)),
      (this.Na = new Map()),
      (this.La = new Wa()),
      (this.Ba = {}),
      (this.ka = new Map()),
      (this.qa = br.kn()),
      (this.onlineState = 'Unknown'),
      (this.Qa = void 0))
  }
  get isPrimaryClient() {
    return this.Qa === !0
  }
}
async function RE(e, t, n = !0) {
  const r = fd(e)
  let s
  const i = r.Fa.get(t)
  return (
    i
      ? (r.sharedClientState.addLocalQueryTarget(i.targetId), (s = i.view.Da()))
      : (s = await ad(r, t, n, !0)),
    s
  )
}
async function xE(e, t) {
  const n = fd(e)
  await ad(n, t, !0, !1)
}
async function ad(e, t, n, r) {
  const s = await zv(e.localStore, Ue(t)),
    i = s.targetId,
    a = e.sharedClientState.addLocalQueryTarget(i, n)
  let l
  return (
    r && (l = await PE(e, t, i, a === 'current', s.resumeToken)),
    e.isPrimaryClient && n && Zf(e.remoteStore, s),
    l
  )
}
async function PE(e, t, n, r, s) {
  e.Ka = (m, w, P) =>
    (async function (D, O, G, g) {
      let S = O.view.ma(G)
      S.ns && (S = await _c(D.localStore, O.query, !1).then(({ documents: I }) => O.view.ma(I, S)))
      const K = g && g.targetChanges.get(O.targetId),
        ut = g && g.targetMismatches.get(O.targetId) != null,
        _t = O.view.applyChanges(S, D.isPrimaryClient, K, ut)
      return (Ac(D, O.targetId, _t.wa), _t.snapshot)
    })(e, m, w, P)
  const i = await _c(e.localStore, t, !0),
    a = new wE(t, i.Ts),
    l = a.ma(i.documents),
    c = Ds.createSynthesizedTargetChangeForCurrentChange(n, r && e.onlineState !== 'Offline', s),
    f = a.applyChanges(l, e.isPrimaryClient, c)
  Ac(e, n, f.wa)
  const d = new bE(t, n, a)
  return (e.Fa.set(t, d), e.Ma.has(n) ? e.Ma.get(n).push(t) : e.Ma.set(n, [t]), f.snapshot)
}
async function SE(e, t, n) {
  const r = it(e),
    s = r.Fa.get(t),
    i = r.Ma.get(s.targetId)
  if (i.length > 1)
    return (
      r.Ma.set(
        s.targetId,
        i.filter((a) => !Gi(a, t))
      ),
      void r.Fa.delete(t)
    )
  r.isPrimaryClient
    ? (r.sharedClientState.removeLocalQueryTarget(s.targetId),
      r.sharedClientState.isActiveQueryTarget(s.targetId) ||
        (await ha(r.localStore, s.targetId, !1)
          .then(() => {
            ;(r.sharedClientState.clearQueryState(s.targetId),
              n && Ya(r.remoteStore, s.targetId),
              da(r, s.targetId))
          })
          .catch(Cs)))
    : (da(r, s.targetId), await ha(r.localStore, s.targetId, !0))
}
async function CE(e, t) {
  const n = it(e),
    r = n.Fa.get(t),
    s = n.Ma.get(r.targetId)
  n.isPrimaryClient &&
    s.length === 1 &&
    (n.sharedClientState.removeLocalQueryTarget(r.targetId), Ya(n.remoteStore, r.targetId))
}
async function VE(e, t, n) {
  const r = FE(e)
  try {
    const s = await (function (a, l) {
      const c = it(a),
        f = Ut.now(),
        d = l.reduce((P, L) => P.add(L.key), lt())
      let m, w
      return c.persistence
        .runTransaction('Locally write mutations', 'readwrite', (P) => {
          let L = cn(),
            D = lt()
          return c.cs
            .getEntries(P, d)
            .next((O) => {
              ;((L = O),
                L.forEach((G, g) => {
                  g.isValidDocument() || (D = D.add(G))
                }))
            })
            .next(() => c.localDocuments.getOverlayedDocuments(P, L))
            .next((O) => {
              m = O
              const G = []
              for (const g of l) {
                const S = Yy(g, m.get(g.key).overlayedDocument)
                S != null && G.push(new Xn(g.key, S, vf(S.value.mapValue), rn.exists(!0)))
              }
              return c.mutationQueue.addMutationBatch(P, f, G, l)
            })
            .next((O) => {
              w = O
              const G = O.applyToLocalDocumentSet(m, D)
              return c.documentOverlayCache.saveOverlays(P, O.batchId, G)
            })
        })
        .then(() => ({ batchId: w.batchId, changes: Sf(m) }))
    })(r.localStore, t)
    ;(r.sharedClientState.addPendingMutation(s.batchId),
      (function (a, l, c) {
        let f = a.Ba[a.currentUser.toKey()]
        ;(f || (f = new Ct(mt)), (f = f.insert(l, c)), (a.Ba[a.currentUser.toKey()] = f))
      })(r, s.batchId, n),
      await Os(r, s.changes),
      await eo(r.remoteStore))
  } catch (s) {
    const i = el(s, 'Failed to persist write')
    n.reject(i)
  }
}
async function ld(e, t) {
  const n = it(e)
  try {
    const r = await qv(n.localStore, t)
    ;(t.targetChanges.forEach((s, i) => {
      const a = n.Na.get(i)
      a &&
        (Tt(s.addedDocuments.size + s.modifiedDocuments.size + s.removedDocuments.size <= 1),
        s.addedDocuments.size > 0
          ? (a.va = !0)
          : s.modifiedDocuments.size > 0
            ? Tt(a.va)
            : s.removedDocuments.size > 0 && (Tt(a.va), (a.va = !1)))
    }),
      await Os(n, r, t))
  } catch (r) {
    await Cs(r)
  }
}
function Ic(e, t, n) {
  const r = it(e)
  if ((r.isPrimaryClient && n === 0) || (!r.isPrimaryClient && n === 1)) {
    const s = []
    ;(r.Fa.forEach((i, a) => {
      const l = a.view.Z_(t)
      l.snapshot && s.push(l.snapshot)
    }),
      (function (a, l) {
        const c = it(a)
        c.onlineState = l
        let f = !1
        ;(c.queries.forEach((d, m) => {
          for (const w of m.j_) w.Z_(l) && (f = !0)
        }),
          f && nl(c))
      })(r.eventManager, t),
      s.length && r.Ca.d_(s),
      (r.onlineState = t),
      r.isPrimaryClient && r.sharedClientState.setOnlineState(t))
  }
}
async function kE(e, t, n) {
  const r = it(e)
  r.sharedClientState.updateQueryState(t, 'rejected', n)
  const s = r.Na.get(t),
    i = s && s.key
  if (i) {
    let a = new Ct(Z.comparator)
    a = a.insert(i, ee.newNoDocument(i, st.min()))
    const l = lt().add(i),
      c = new Ji(st.min(), new Map(), new Ct(mt), a, l)
    ;(await ld(r, c), (r.Oa = r.Oa.remove(i)), r.Na.delete(t), rl(r))
  } else
    await ha(r.localStore, t, !1)
      .then(() => da(r, t, n))
      .catch(Cs)
}
async function DE(e, t) {
  const n = it(e),
    r = t.batch.batchId
  try {
    const s = await $v(n.localStore, t)
    ;(cd(n, r, null),
      ud(n, r),
      n.sharedClientState.updateMutationState(r, 'acknowledged'),
      await Os(n, s))
  } catch (s) {
    await Cs(s)
  }
}
async function NE(e, t, n) {
  const r = it(e)
  try {
    const s = await (function (a, l) {
      const c = it(a)
      return c.persistence.runTransaction('Reject batch', 'readwrite-primary', (f) => {
        let d
        return c.mutationQueue
          .lookupMutationBatch(f, l)
          .next((m) => (Tt(m !== null), (d = m.keys()), c.mutationQueue.removeMutationBatch(f, m)))
          .next(() => c.mutationQueue.performConsistencyCheck(f))
          .next(() => c.documentOverlayCache.removeOverlaysForBatchId(f, d, l))
          .next(() => c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f, d))
          .next(() => c.localDocuments.getDocuments(f, d))
      })
    })(r.localStore, t)
    ;(cd(r, t, n),
      ud(r, t),
      r.sharedClientState.updateMutationState(t, 'rejected', n),
      await Os(r, s))
  } catch (s) {
    await Cs(s)
  }
}
function ud(e, t) {
  ;((e.ka.get(t) || []).forEach((n) => {
    n.resolve()
  }),
    e.ka.delete(t))
}
function cd(e, t, n) {
  const r = it(e)
  let s = r.Ba[r.currentUser.toKey()]
  if (s) {
    const i = s.get(t)
    ;(i && (n ? i.reject(n) : i.resolve(), (s = s.remove(t))), (r.Ba[r.currentUser.toKey()] = s))
  }
}
function da(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t)
  for (const r of e.Ma.get(t)) (e.Fa.delete(r), n && e.Ca.$a(r, n))
  ;(e.Ma.delete(t),
    e.isPrimaryClient &&
      e.La.gr(t).forEach((r) => {
        e.La.containsKey(r) || hd(e, r)
      }))
}
function hd(e, t) {
  e.xa.delete(t.path.canonicalString())
  const n = e.Oa.get(t)
  n !== null && (Ya(e.remoteStore, n), (e.Oa = e.Oa.remove(t)), e.Na.delete(n), rl(e))
}
function Ac(e, t, n) {
  for (const r of n)
    r instanceof id
      ? (e.La.addReference(r.key, t), OE(e, r))
      : r instanceof od
        ? (Q('SyncEngine', 'Document no longer in limbo: ' + r.key),
          e.La.removeReference(r.key, t),
          e.La.containsKey(r.key) || hd(e, r.key))
        : rt()
}
function OE(e, t) {
  const n = t.key,
    r = n.path.canonicalString()
  e.Oa.get(n) || e.xa.has(r) || (Q('SyncEngine', 'New document in limbo: ' + n), e.xa.add(r), rl(e))
}
function rl(e) {
  for (; e.xa.size > 0 && e.Oa.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.xa.values().next().value
    e.xa.delete(t)
    const n = new Z(Pt.fromString(t)),
      r = e.qa.next()
    ;(e.Na.set(r, new IE(n)),
      (e.Oa = e.Oa.insert(n, r)),
      Zf(e.remoteStore, new vn(Ue($a(n.path)), r, 'TargetPurposeLimboResolution', Ma.oe)))
  }
}
async function Os(e, t, n) {
  const r = it(e),
    s = [],
    i = [],
    a = []
  r.Fa.isEmpty() ||
    (r.Fa.forEach((l, c) => {
      a.push(
        r.Ka(c, t, n).then((f) => {
          var d
          if ((f || n) && r.isPrimaryClient) {
            const m = f
              ? !f.fromCache
              : (d = n == null ? void 0 : n.targetChanges.get(c.targetId)) === null || d === void 0
                ? void 0
                : d.current
            r.sharedClientState.updateQueryState(c.targetId, m ? 'current' : 'not-current')
          }
          if (f) {
            s.push(f)
            const m = Qa.Wi(c.targetId, f)
            i.push(m)
          }
        })
      )
    }),
    await Promise.all(a),
    r.Ca.d_(s),
    await (async function (c, f) {
      const d = it(c)
      try {
        await d.persistence.runTransaction('notifyLocalViewChanges', 'readwrite', (m) =>
          B.forEach(f, (w) =>
            B.forEach(w.$i, (P) =>
              d.persistence.referenceDelegate.addReference(m, w.targetId, P)
            ).next(() =>
              B.forEach(w.Ui, (P) =>
                d.persistence.referenceDelegate.removeReference(m, w.targetId, P)
              )
            )
          )
        )
      } catch (m) {
        if (!Vs(m)) throw m
        Q('LocalStore', 'Failed to update sequence numbers: ' + m)
      }
      for (const m of f) {
        const w = m.targetId
        if (!m.fromCache) {
          const P = d.os.get(w),
            L = P.snapshotVersion,
            D = P.withLastLimboFreeSnapshotVersion(L)
          d.os = d.os.insert(w, D)
        }
      }
    })(r.localStore, i))
}
async function ME(e, t) {
  const n = it(e)
  if (!n.currentUser.isEqual(t)) {
    Q('SyncEngine', 'User change. New user:', t.toKey())
    const r = await Qf(n.localStore, t)
    ;((n.currentUser = t),
      (function (i, a) {
        ;(i.ka.forEach((l) => {
          l.forEach((c) => {
            c.reject(new X(j.CANCELLED, a))
          })
        }),
          i.ka.clear())
      })(n, "'waitForPendingWrites' promise is rejected due to a user change."),
      n.sharedClientState.handleUserChange(t, r.removedBatchIds, r.addedBatchIds),
      await Os(n, r.hs))
  }
}
function LE(e, t) {
  const n = it(e),
    r = n.Na.get(t)
  if (r && r.va) return lt().add(r.key)
  {
    let s = lt()
    const i = n.Ma.get(t)
    if (!i) return s
    for (const a of i) {
      const l = n.Fa.get(a)
      s = s.unionWith(l.view.Va)
    }
    return s
  }
}
function fd(e) {
  const t = it(e)
  return (
    (t.remoteStore.remoteSyncer.applyRemoteEvent = ld.bind(null, t)),
    (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = LE.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectListen = kE.bind(null, t)),
    (t.Ca.d_ = vE.bind(null, t.eventManager)),
    (t.Ca.$a = EE.bind(null, t.eventManager)),
    t
  )
}
function FE(e) {
  const t = it(e)
  return (
    (t.remoteStore.remoteSyncer.applySuccessfulWrite = DE.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectFailedWrite = NE.bind(null, t)),
    t
  )
}
class Si {
  constructor() {
    ;((this.kind = 'memory'), (this.synchronizeTabs = !1))
  }
  async initialize(t) {
    ;((this.serializer = Zi(t.databaseInfo.databaseId)),
      (this.sharedClientState = this.Wa(t)),
      (this.persistence = this.Ga(t)),
      await this.persistence.start(),
      (this.localStore = this.za(t)),
      (this.gcScheduler = this.ja(t, this.localStore)),
      (this.indexBackfillerScheduler = this.Ha(t, this.localStore)))
  }
  ja(t, n) {
    return null
  }
  Ha(t, n) {
    return null
  }
  za(t) {
    return jv(this.persistence, new Uv(), t.initialUser, this.serializer)
  }
  Ga(t) {
    return new Mv(Ga.Zr, this.serializer)
  }
  Wa(t) {
    return new Gv()
  }
  async terminate() {
    var t, n
    ;((t = this.gcScheduler) === null || t === void 0 || t.stop(),
      (n = this.indexBackfillerScheduler) === null || n === void 0 || n.stop(),
      this.sharedClientState.shutdown(),
      await this.persistence.shutdown())
  }
}
Si.provider = { build: () => new Si() }
class pa {
  async initialize(t, n) {
    this.localStore ||
      ((this.localStore = t.localStore),
      (this.sharedClientState = t.sharedClientState),
      (this.datastore = this.createDatastore(n)),
      (this.remoteStore = this.createRemoteStore(n)),
      (this.eventManager = this.createEventManager(n)),
      (this.syncEngine = this.createSyncEngine(n, !t.synchronizeTabs)),
      (this.sharedClientState.onlineStateHandler = (r) => Ic(this.syncEngine, r, 1)),
      (this.remoteStore.remoteSyncer.handleCredentialChange = ME.bind(null, this.syncEngine)),
      await pE(this.remoteStore, this.syncEngine.isPrimaryClient))
  }
  createEventManager(t) {
    return (function () {
      return new gE()
    })()
  }
  createDatastore(t) {
    const n = Zi(t.databaseInfo.databaseId),
      r = (function (i) {
        return new Jv(i)
      })(t.databaseInfo)
    return (function (i, a, l, c) {
      return new eE(i, a, l, c)
    })(t.authCredentials, t.appCheckCredentials, r, n)
  }
  createRemoteStore(t) {
    return (function (r, s, i, a, l) {
      return new rE(r, s, i, a, l)
    })(
      this.localStore,
      this.datastore,
      t.asyncQueue,
      (n) => Ic(this.syncEngine, n, 0),
      (function () {
        return vc.D() ? new vc() : new Qv()
      })()
    )
  }
  createSyncEngine(t, n) {
    return (function (s, i, a, l, c, f, d) {
      const m = new AE(s, i, a, l, c, f)
      return (d && (m.Qa = !0), m)
    })(
      this.localStore,
      this.remoteStore,
      this.eventManager,
      this.sharedClientState,
      t.initialUser,
      t.maxConcurrentLimboResolutions,
      n
    )
  }
  async terminate() {
    var t, n
    ;(await (async function (s) {
      const i = it(s)
      ;(Q('RemoteStore', 'RemoteStore shutting down.'),
        i.L_.add(5),
        await Ns(i),
        i.k_.shutdown(),
        i.q_.set('Unknown'))
    })(this.remoteStore),
      (t = this.datastore) === null || t === void 0 || t.terminate(),
      (n = this.eventManager) === null || n === void 0 || n.terminate())
  }
}
pa.provider = { build: () => new pa() }
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class UE {
  constructor(t) {
    ;((this.observer = t), (this.muted = !1))
  }
  next(t) {
    this.muted || (this.observer.next && this.Ya(this.observer.next, t))
  }
  error(t) {
    this.muted ||
      (this.observer.error
        ? this.Ya(this.observer.error, t)
        : un('Uncaught Error in snapshot listener:', t.toString()))
  }
  Za() {
    this.muted = !0
  }
  Ya(t, n) {
    setTimeout(() => {
      this.muted || t(n)
    }, 0)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class BE {
  constructor(t, n, r, s, i) {
    ;((this.authCredentials = t),
      (this.appCheckCredentials = n),
      (this.asyncQueue = r),
      (this.databaseInfo = s),
      (this.user = Zt.UNAUTHENTICATED),
      (this.clientId = gf.newId()),
      (this.authCredentialListener = () => Promise.resolve()),
      (this.appCheckCredentialListener = () => Promise.resolve()),
      (this._uninitializedComponentsProvider = i),
      this.authCredentials.start(r, async (a) => {
        ;(Q('FirestoreClient', 'Received user=', a.uid),
          await this.authCredentialListener(a),
          (this.user = a))
      }),
      this.appCheckCredentials.start(
        r,
        (a) => (
          Q('FirestoreClient', 'Received new app check token=', a),
          this.appCheckCredentialListener(a, this.user)
        )
      ))
  }
  get configuration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100
    }
  }
  setCredentialChangeListener(t) {
    this.authCredentialListener = t
  }
  setAppCheckTokenChangeListener(t) {
    this.appCheckCredentialListener = t
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode()
    const t = new bn()
    return (
      this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
        try {
          ;(this._onlineComponents && (await this._onlineComponents.terminate()),
            this._offlineComponents && (await this._offlineComponents.terminate()),
            this.authCredentials.shutdown(),
            this.appCheckCredentials.shutdown(),
            t.resolve())
        } catch (n) {
          const r = el(n, 'Failed to shutdown persistence')
          t.reject(r)
        }
      }),
      t.promise
    )
  }
}
async function Mo(e, t) {
  ;(e.asyncQueue.verifyOperationInProgress(),
    Q('FirestoreClient', 'Initializing OfflineComponentProvider'))
  const n = e.configuration
  await t.initialize(n)
  let r = n.initialUser
  ;(e.setCredentialChangeListener(async (s) => {
    r.isEqual(s) || (await Qf(t.localStore, s), (r = s))
  }),
    t.persistence.setDatabaseDeletedListener(() => e.terminate()),
    (e._offlineComponents = t))
}
async function Rc(e, t) {
  e.asyncQueue.verifyOperationInProgress()
  const n = await jE(e)
  ;(Q('FirestoreClient', 'Initializing OnlineComponentProvider'),
    await t.initialize(n, e.configuration),
    e.setCredentialChangeListener((r) => Ec(t.remoteStore, r)),
    e.setAppCheckTokenChangeListener((r, s) => Ec(t.remoteStore, s)),
    (e._onlineComponents = t))
}
async function jE(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      Q('FirestoreClient', 'Using user provided OfflineComponentProvider')
      try {
        await Mo(e, e._uninitializedComponentsProvider._offline)
      } catch (t) {
        const n = t
        if (
          !(function (s) {
            return s.name === 'FirebaseError'
              ? s.code === j.FAILED_PRECONDITION || s.code === j.UNIMPLEMENTED
              : !(typeof DOMException < 'u' && s instanceof DOMException) ||
                  s.code === 22 ||
                  s.code === 20 ||
                  s.code === 11
          })(n)
        )
          throw n
        ;(vr('Error using user provided cache. Falling back to memory cache: ' + n),
          await Mo(e, new Si()))
      }
    } else (Q('FirestoreClient', 'Using default OfflineComponentProvider'), await Mo(e, new Si()))
  return e._offlineComponents
}
async function dd(e) {
  return (
    e._onlineComponents ||
      (e._uninitializedComponentsProvider
        ? (Q('FirestoreClient', 'Using user provided OnlineComponentProvider'),
          await Rc(e, e._uninitializedComponentsProvider._online))
        : (Q('FirestoreClient', 'Using default OnlineComponentProvider'), await Rc(e, new pa()))),
    e._onlineComponents
  )
}
function $E(e) {
  return dd(e).then((t) => t.syncEngine)
}
async function qE(e) {
  const t = await dd(e),
    n = t.eventManager
  return (
    (n.onListen = RE.bind(null, t.syncEngine)),
    (n.onUnlisten = SE.bind(null, t.syncEngine)),
    (n.onFirstRemoteStoreListen = xE.bind(null, t.syncEngine)),
    (n.onLastRemoteStoreUnlisten = CE.bind(null, t.syncEngine)),
    n
  )
}
function KE(e, t, n = {}) {
  const r = new bn()
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function (i, a, l, c, f) {
        const d = new UE({
            next: (w) => {
              ;(d.Za(), a.enqueueAndForget(() => yE(i, m)))
              const P = w.docs.has(l)
              !P && w.fromCache
                ? f.reject(
                    new X(j.UNAVAILABLE, 'Failed to get document because the client is offline.')
                  )
                : P && w.fromCache && c && c.source === 'server'
                  ? f.reject(
                      new X(
                        j.UNAVAILABLE,
                        'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                      )
                    )
                  : f.resolve(w)
            },
            error: (w) => f.reject(w)
          }),
          m = new TE($a(l.path), d, { includeMetadataChanges: !0, _a: !0 })
        return _E(i, m)
      })(await qE(e), e.asyncQueue, t, n, r)
    ),
    r.promise
  )
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function pd(e) {
  const t = {}
  return (e.timeoutSeconds !== void 0 && (t.timeoutSeconds = e.timeoutSeconds), t)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xc = new Map()
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function md(e, t, n) {
  if (!n) throw new X(j.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`)
}
function HE(e, t, n, r) {
  if (t === !0 && r === !0)
    throw new X(j.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`)
}
function Pc(e) {
  if (!Z.isDocumentKey(e))
    throw new X(
      j.INVALID_ARGUMENT,
      `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
    )
}
function Sc(e) {
  if (Z.isDocumentKey(e))
    throw new X(
      j.INVALID_ARGUMENT,
      `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
    )
}
function sl(e) {
  if (e === void 0) return 'undefined'
  if (e === null) return 'null'
  if (typeof e == 'string')
    return (e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e))
  if (typeof e == 'number' || typeof e == 'boolean') return '' + e
  if (typeof e == 'object') {
    if (e instanceof Array) return 'an array'
    {
      const t = (function (r) {
        return r.constructor ? r.constructor.name : null
      })(e)
      return t ? `a custom ${t} object` : 'an object'
    }
  }
  return typeof e == 'function' ? 'a function' : rt()
}
function Ci(e, t) {
  if (('_delegate' in e && (e = e._delegate), !(e instanceof t))) {
    if (t.name === e.constructor.name)
      throw new X(
        j.INVALID_ARGUMENT,
        'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
      )
    {
      const n = sl(e)
      throw new X(j.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`)
    }
  }
  return e
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Cc {
  constructor(t) {
    var n, r
    if (t.host === void 0) {
      if (t.ssl !== void 0)
        throw new X(j.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set")
      ;((this.host = 'firestore.googleapis.com'), (this.ssl = !0))
    } else ((this.host = t.host), (this.ssl = (n = t.ssl) === null || n === void 0 || n))
    if (
      ((this.credentials = t.credentials),
      (this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties),
      (this.localCache = t.localCache),
      t.cacheSizeBytes === void 0)
    )
      this.cacheSizeBytes = 41943040
    else {
      if (t.cacheSizeBytes !== -1 && t.cacheSizeBytes < 1048576)
        throw new X(j.INVALID_ARGUMENT, 'cacheSizeBytes must be at least 1048576')
      this.cacheSizeBytes = t.cacheSizeBytes
    }
    ;(HE(
      'experimentalForceLongPolling',
      t.experimentalForceLongPolling,
      'experimentalAutoDetectLongPolling',
      t.experimentalAutoDetectLongPolling
    ),
      (this.experimentalForceLongPolling = !!t.experimentalForceLongPolling),
      this.experimentalForceLongPolling
        ? (this.experimentalAutoDetectLongPolling = !1)
        : t.experimentalAutoDetectLongPolling === void 0
          ? (this.experimentalAutoDetectLongPolling = !0)
          : (this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling),
      (this.experimentalLongPollingOptions = pd(
        (r = t.experimentalLongPollingOptions) !== null && r !== void 0 ? r : {}
      )),
      (function (i) {
        if (i.timeoutSeconds !== void 0) {
          if (isNaN(i.timeoutSeconds))
            throw new X(
              j.INVALID_ARGUMENT,
              `invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`
            )
          if (i.timeoutSeconds < 5)
            throw new X(
              j.INVALID_ARGUMENT,
              `invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`
            )
          if (i.timeoutSeconds > 30)
            throw new X(
              j.INVALID_ARGUMENT,
              `invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`
            )
        }
      })(this.experimentalLongPollingOptions),
      (this.useFetchStreams = !!t.useFetchStreams))
  }
  isEqual(t) {
    return (
      this.host === t.host &&
      this.ssl === t.ssl &&
      this.credentials === t.credentials &&
      this.cacheSizeBytes === t.cacheSizeBytes &&
      this.experimentalForceLongPolling === t.experimentalForceLongPolling &&
      this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling &&
      (function (r, s) {
        return r.timeoutSeconds === s.timeoutSeconds
      })(this.experimentalLongPollingOptions, t.experimentalLongPollingOptions) &&
      this.ignoreUndefinedProperties === t.ignoreUndefinedProperties &&
      this.useFetchStreams === t.useFetchStreams
    )
  }
}
class no {
  constructor(t, n, r, s) {
    ;((this._authCredentials = t),
      (this._appCheckCredentials = n),
      (this._databaseId = r),
      (this._app = s),
      (this.type = 'firestore-lite'),
      (this._persistenceKey = '(lite)'),
      (this._settings = new Cc({})),
      (this._settingsFrozen = !1),
      (this._terminateTask = 'notTerminated'))
  }
  get app() {
    if (!this._app)
      throw new X(
        j.FAILED_PRECONDITION,
        "Firestore was not initialized using the Firebase SDK. 'app' is not available"
      )
    return this._app
  }
  get _initialized() {
    return this._settingsFrozen
  }
  get _terminated() {
    return this._terminateTask !== 'notTerminated'
  }
  _setSettings(t) {
    if (this._settingsFrozen)
      throw new X(
        j.FAILED_PRECONDITION,
        'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
      )
    ;((this._settings = new Cc(t)),
      t.credentials !== void 0 &&
        (this._authCredentials = (function (r) {
          if (!r) return new ry()
          switch (r.type) {
            case 'firstParty':
              return new ay(r.sessionIndex || '0', r.iamToken || null, r.authTokenFactory || null)
            case 'provider':
              return r.client
            default:
              throw new X(
                j.INVALID_ARGUMENT,
                'makeAuthCredentialsProvider failed due to invalid credential type'
              )
          }
        })(t.credentials)))
  }
  _getSettings() {
    return this._settings
  }
  _freezeSettings() {
    return ((this._settingsFrozen = !0), this._settings)
  }
  _delete() {
    return (
      this._terminateTask === 'notTerminated' && (this._terminateTask = this._terminate()),
      this._terminateTask
    )
  }
  async _restart() {
    this._terminateTask === 'notTerminated'
      ? await this._terminate()
      : (this._terminateTask = 'notTerminated')
  }
  toJSON() {
    return { app: this._app, databaseId: this._databaseId, settings: this._settings }
  }
  _terminate() {
    return (
      (function (n) {
        const r = xc.get(n)
        r && (Q('ComponentProvider', 'Removing Datastore'), xc.delete(n), r.terminate())
      })(this),
      Promise.resolve()
    )
  }
}
function zE(e, t, n, r = {}) {
  var s
  const i = (e = Ci(e, no))._getSettings(),
    a = `${t}:${n}`
  if (
    (i.host !== 'firestore.googleapis.com' &&
      i.host !== a &&
      vr(
        'Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.'
      ),
    e._setSettings(Object.assign(Object.assign({}, i), { host: a, ssl: !1 })),
    r.mockUserToken)
  ) {
    let l, c
    if (typeof r.mockUserToken == 'string') ((l = r.mockUserToken), (c = Zt.MOCK_USER))
    else {
      l = Xh(r.mockUserToken, (s = e._app) === null || s === void 0 ? void 0 : s.options.projectId)
      const f = r.mockUserToken.sub || r.mockUserToken.user_id
      if (!f)
        throw new X(j.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!")
      c = new Zt(f)
    }
    e._authCredentials = new sy(new mf(l, c))
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class il {
  constructor(t, n, r) {
    ;((this.converter = n), (this._query = r), (this.type = 'query'), (this.firestore = t))
  }
  withConverter(t) {
    return new il(this.firestore, t, this._query)
  }
}
class Te {
  constructor(t, n, r) {
    ;((this.converter = n), (this._key = r), (this.type = 'document'), (this.firestore = t))
  }
  get _path() {
    return this._key.path
  }
  get id() {
    return this._key.path.lastSegment()
  }
  get path() {
    return this._key.path.canonicalString()
  }
  get parent() {
    return new In(this.firestore, this.converter, this._key.path.popLast())
  }
  withConverter(t) {
    return new Te(this.firestore, t, this._key)
  }
}
class In extends il {
  constructor(t, n, r) {
    ;(super(t, n, $a(r)), (this._path = r), (this.type = 'collection'))
  }
  get id() {
    return this._query.path.lastSegment()
  }
  get path() {
    return this._query.path.canonicalString()
  }
  get parent() {
    const t = this._path.popLast()
    return t.isEmpty() ? null : new Te(this.firestore, null, new Z(t))
  }
  withConverter(t) {
    return new In(this.firestore, t, this._path)
  }
}
function WE(e, t, ...n) {
  if (((e = _r(e)), md('collection', 'path', t), e instanceof no)) {
    const r = Pt.fromString(t, ...n)
    return (Sc(r), new In(e, null, r))
  }
  {
    if (!(e instanceof Te || e instanceof In))
      throw new X(
        j.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      )
    const r = e._path.child(Pt.fromString(t, ...n))
    return (Sc(r), new In(e.firestore, null, r))
  }
}
function gd(e, t, ...n) {
  if (
    ((e = _r(e)), arguments.length === 1 && (t = gf.newId()), md('doc', 'path', t), e instanceof no)
  ) {
    const r = Pt.fromString(t, ...n)
    return (Pc(r), new Te(e, null, new Z(r)))
  }
  {
    if (!(e instanceof Te || e instanceof In))
      throw new X(
        j.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      )
    const r = e._path.child(Pt.fromString(t, ...n))
    return (Pc(r), new Te(e.firestore, e instanceof In ? e.converter : null, new Z(r)))
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vc {
  constructor(t = Promise.resolve()) {
    ;((this.Pu = []),
      (this.Iu = !1),
      (this.Tu = []),
      (this.Eu = null),
      (this.du = !1),
      (this.Au = !1),
      (this.Ru = []),
      (this.t_ = new Xf(this, 'async_queue_retry')),
      (this.Vu = () => {
        const r = Oo()
        ;(r && Q('AsyncQueue', 'Visibility state changed to ' + r.visibilityState), this.t_.jo())
      }),
      (this.mu = t))
    const n = Oo()
    n && typeof n.addEventListener == 'function' && n.addEventListener('visibilitychange', this.Vu)
  }
  get isShuttingDown() {
    return this.Iu
  }
  enqueueAndForget(t) {
    this.enqueue(t)
  }
  enqueueAndForgetEvenWhileRestricted(t) {
    ;(this.fu(), this.gu(t))
  }
  enterRestrictedMode(t) {
    if (!this.Iu) {
      ;((this.Iu = !0), (this.Au = t || !1))
      const n = Oo()
      n &&
        typeof n.removeEventListener == 'function' &&
        n.removeEventListener('visibilitychange', this.Vu)
    }
  }
  enqueue(t) {
    if ((this.fu(), this.Iu)) return new Promise(() => {})
    const n = new bn()
    return this.gu(() =>
      this.Iu && this.Au ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise)
    ).then(() => n.promise)
  }
  enqueueRetryable(t) {
    this.enqueueAndForget(() => (this.Pu.push(t), this.pu()))
  }
  async pu() {
    if (this.Pu.length !== 0) {
      try {
        ;(await this.Pu[0](), this.Pu.shift(), this.t_.reset())
      } catch (t) {
        if (!Vs(t)) throw t
        Q('AsyncQueue', 'Operation failed with retryable error: ' + t)
      }
      this.Pu.length > 0 && this.t_.Go(() => this.pu())
    }
  }
  gu(t) {
    const n = this.mu.then(
      () => (
        (this.du = !0),
        t()
          .catch((r) => {
            ;((this.Eu = r), (this.du = !1))
            const s = (function (a) {
              let l = a.message || ''
              return (
                a.stack &&
                  (l = a.stack.includes(a.message)
                    ? a.stack
                    : a.message +
                      `
` +
                      a.stack),
                l
              )
            })(r)
            throw (un('INTERNAL UNHANDLED ERROR: ', s), r)
          })
          .then((r) => ((this.du = !1), r))
      )
    )
    return ((this.mu = n), n)
  }
  enqueueAfterDelay(t, n, r) {
    ;(this.fu(), this.Ru.indexOf(t) > -1 && (n = 0))
    const s = tl.createAndSchedule(this, t, n, r, (i) => this.yu(i))
    return (this.Tu.push(s), s)
  }
  fu() {
    this.Eu && rt()
  }
  verifyOperationInProgress() {}
  async wu() {
    let t
    do ((t = this.mu), await t)
    while (t !== this.mu)
  }
  Su(t) {
    for (const n of this.Tu) if (n.timerId === t) return !0
    return !1
  }
  bu(t) {
    return this.wu().then(() => {
      this.Tu.sort((n, r) => n.targetTimeMs - r.targetTimeMs)
      for (const n of this.Tu) if ((n.skipDelay(), t !== 'all' && n.timerId === t)) break
      return this.wu()
    })
  }
  Du(t) {
    this.Ru.push(t)
  }
  yu(t) {
    const n = this.Tu.indexOf(t)
    this.Tu.splice(n, 1)
  }
}
class ol extends no {
  constructor(t, n, r, s) {
    ;(super(t, n, r, s),
      (this.type = 'firestore'),
      (this._queue = new Vc()),
      (this._persistenceKey = (s == null ? void 0 : s.name) || '[DEFAULT]'))
  }
  async _terminate() {
    if (this._firestoreClient) {
      const t = this._firestoreClient.terminate()
      ;((this._queue = new Vc(t)), (this._firestoreClient = void 0), await t)
    }
  }
}
function GE(e, t) {
  const n = typeof e == 'object' ? e : of(),
    r = typeof e == 'string' ? e : '(default)',
    s = nf(n, 'firestore').getImmediate({ identifier: r })
  if (!s._initialized) {
    const i = Qh('firestore')
    i && zE(s, ...i)
  }
  return s
}
function _d(e) {
  if (e._terminated) throw new X(j.FAILED_PRECONDITION, 'The client has already been terminated.')
  return (e._firestoreClient || QE(e), e._firestoreClient)
}
function QE(e) {
  var t, n, r
  const s = e._freezeSettings(),
    i = (function (l, c, f, d) {
      return new Ey(
        l,
        c,
        f,
        d.host,
        d.ssl,
        d.experimentalForceLongPolling,
        d.experimentalAutoDetectLongPolling,
        pd(d.experimentalLongPollingOptions),
        d.useFetchStreams
      )
    })(
      e._databaseId,
      ((t = e._app) === null || t === void 0 ? void 0 : t.options.appId) || '',
      e._persistenceKey,
      s
    )
  ;(e._componentsProvider ||
    (!((n = s.localCache) === null || n === void 0) &&
      n._offlineComponentProvider &&
      !((r = s.localCache) === null || r === void 0) &&
      r._onlineComponentProvider &&
      (e._componentsProvider = {
        _offline: s.localCache._offlineComponentProvider,
        _online: s.localCache._onlineComponentProvider
      })),
    (e._firestoreClient = new BE(
      e._authCredentials,
      e._appCheckCredentials,
      e._queue,
      i,
      e._componentsProvider &&
        (function (l) {
          const c = l == null ? void 0 : l._online.build()
          return { _offline: l == null ? void 0 : l._offline.build(c), _online: c }
        })(e._componentsProvider)
    )))
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ar {
  constructor(t) {
    this._byteString = t
  }
  static fromBase64String(t) {
    try {
      return new Ar(Gt.fromBase64String(t))
    } catch (n) {
      throw new X(j.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + n)
    }
  }
  static fromUint8Array(t) {
    return new Ar(Gt.fromUint8Array(t))
  }
  toBase64() {
    return this._byteString.toBase64()
  }
  toUint8Array() {
    return this._byteString.toUint8Array()
  }
  toString() {
    return 'Bytes(base64: ' + this.toBase64() + ')'
  }
  isEqual(t) {
    return this._byteString.isEqual(t._byteString)
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class al {
  constructor(...t) {
    for (let n = 0; n < t.length; ++n)
      if (t[n].length === 0)
        throw new X(
          j.INVALID_ARGUMENT,
          'Invalid field name at argument $(i + 1). Field names must not be empty.'
        )
    this._internalPath = new zt(t)
  }
  isEqual(t) {
    return this._internalPath.isEqual(t._internalPath)
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ll {
  constructor(t) {
    this._methodName = t
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ul {
  constructor(t, n) {
    if (!isFinite(t) || t < -90 || t > 90)
      throw new X(j.INVALID_ARGUMENT, 'Latitude must be a number between -90 and 90, but was: ' + t)
    if (!isFinite(n) || n < -180 || n > 180)
      throw new X(
        j.INVALID_ARGUMENT,
        'Longitude must be a number between -180 and 180, but was: ' + n
      )
    ;((this._lat = t), (this._long = n))
  }
  get latitude() {
    return this._lat
  }
  get longitude() {
    return this._long
  }
  isEqual(t) {
    return this._lat === t._lat && this._long === t._long
  }
  toJSON() {
    return { latitude: this._lat, longitude: this._long }
  }
  _compareTo(t) {
    return mt(this._lat, t._lat) || mt(this._long, t._long)
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class cl {
  constructor(t) {
    this._values = (t || []).map((n) => n)
  }
  toArray() {
    return this._values.map((t) => t)
  }
  isEqual(t) {
    return (function (r, s) {
      if (r.length !== s.length) return !1
      for (let i = 0; i < r.length; ++i) if (r[i] !== s[i]) return !1
      return !0
    })(this._values, t._values)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const YE = /^__.*__$/
class XE {
  constructor(t, n, r) {
    ;((this.data = t), (this.fieldMask = n), (this.fieldTransforms = r))
  }
  toMutation(t, n) {
    return this.fieldMask !== null
      ? new Xn(t, this.data, this.fieldMask, n, this.fieldTransforms)
      : new ks(t, this.data, n, this.fieldTransforms)
  }
}
function yd(e) {
  switch (e) {
    case 0:
    case 2:
    case 1:
      return !0
    case 3:
    case 4:
      return !1
    default:
      throw rt()
  }
}
class hl {
  constructor(t, n, r, s, i, a) {
    ;((this.settings = t),
      (this.databaseId = n),
      (this.serializer = r),
      (this.ignoreUndefinedProperties = s),
      i === void 0 && this.vu(),
      (this.fieldTransforms = i || []),
      (this.fieldMask = a || []))
  }
  get path() {
    return this.settings.path
  }
  get Cu() {
    return this.settings.Cu
  }
  Fu(t) {
    return new hl(
      Object.assign(Object.assign({}, this.settings), t),
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties,
      this.fieldTransforms,
      this.fieldMask
    )
  }
  Mu(t) {
    var n
    const r = (n = this.path) === null || n === void 0 ? void 0 : n.child(t),
      s = this.Fu({ path: r, xu: !1 })
    return (s.Ou(t), s)
  }
  Nu(t) {
    var n
    const r = (n = this.path) === null || n === void 0 ? void 0 : n.child(t),
      s = this.Fu({ path: r, xu: !1 })
    return (s.vu(), s)
  }
  Lu(t) {
    return this.Fu({ path: void 0, xu: !0 })
  }
  Bu(t) {
    return Vi(t, this.settings.methodName, this.settings.ku || !1, this.path, this.settings.qu)
  }
  contains(t) {
    return (
      this.fieldMask.find((n) => t.isPrefixOf(n)) !== void 0 ||
      this.fieldTransforms.find((n) => t.isPrefixOf(n.field)) !== void 0
    )
  }
  vu() {
    if (this.path) for (let t = 0; t < this.path.length; t++) this.Ou(this.path.get(t))
  }
  Ou(t) {
    if (t.length === 0) throw this.Bu('Document fields must not be empty')
    if (yd(this.Cu) && YE.test(t)) throw this.Bu('Document fields cannot begin and end with "__"')
  }
}
class JE {
  constructor(t, n, r) {
    ;((this.databaseId = t), (this.ignoreUndefinedProperties = n), (this.serializer = r || Zi(t)))
  }
  Qu(t, n, r, s = !1) {
    return new hl(
      { Cu: t, methodName: n, qu: r, path: zt.emptyPath(), xu: !1, ku: s },
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties
    )
  }
}
function ZE(e) {
  const t = e._freezeSettings(),
    n = Zi(e._databaseId)
  return new JE(e._databaseId, !!t.ignoreUndefinedProperties, n)
}
function tT(e, t, n, r, s, i = {}) {
  const a = e.Qu(i.merge || i.mergeFields ? 2 : 0, t, n, s)
  wd('Data must be an object, but it was:', a, r)
  const l = Ed(r, a)
  let c, f
  if (i.merge) ((c = new Ie(a.fieldMask)), (f = a.fieldTransforms))
  else if (i.mergeFields) {
    const d = []
    for (const m of i.mergeFields) {
      const w = eT(t, m, n)
      if (!a.contains(w))
        throw new X(
          j.INVALID_ARGUMENT,
          `Field '${w}' is specified in your field mask but missing from your input data.`
        )
      rT(d, w) || d.push(w)
    }
    ;((c = new Ie(d)), (f = a.fieldTransforms.filter((m) => c.covers(m.field))))
  } else ((c = null), (f = a.fieldTransforms))
  return new XE(new _e(l), c, f)
}
class fl extends ll {
  _toFieldTransform(t) {
    return new zy(t.path, new Is())
  }
  isEqual(t) {
    return t instanceof fl
  }
}
function vd(e, t) {
  if (Td((e = _r(e)))) return (wd('Unsupported field value:', t, e), Ed(e, t))
  if (e instanceof ll)
    return (
      (function (r, s) {
        if (!yd(s.Cu)) throw s.Bu(`${r._methodName}() can only be used with update() and set()`)
        if (!s.path) throw s.Bu(`${r._methodName}() is not currently supported inside arrays`)
        const i = r._toFieldTransform(s)
        i && s.fieldTransforms.push(i)
      })(e, t),
      null
    )
  if (e === void 0 && t.ignoreUndefinedProperties) return null
  if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
    if (t.settings.xu && t.Cu !== 4) throw t.Bu('Nested arrays are not supported')
    return (function (r, s) {
      const i = []
      let a = 0
      for (const l of r) {
        let c = vd(l, s.Lu(a))
        ;(c == null && (c = { nullValue: 'NULL_VALUE' }), i.push(c), a++)
      }
      return { arrayValue: { values: i } }
    })(e, t)
  }
  return (function (r, s) {
    if ((r = _r(r)) === null) return { nullValue: 'NULL_VALUE' }
    if (typeof r == 'number') return qy(s.serializer, r)
    if (typeof r == 'boolean') return { booleanValue: r }
    if (typeof r == 'string') return { stringValue: r }
    if (r instanceof Date) {
      const i = Ut.fromDate(r)
      return { timestampValue: xi(s.serializer, i) }
    }
    if (r instanceof Ut) {
      const i = new Ut(r.seconds, 1e3 * Math.floor(r.nanoseconds / 1e3))
      return { timestampValue: xi(s.serializer, i) }
    }
    if (r instanceof ul) return { geoPointValue: { latitude: r.latitude, longitude: r.longitude } }
    if (r instanceof Ar) return { bytesValue: $f(s.serializer, r._byteString) }
    if (r instanceof Te) {
      const i = s.databaseId,
        a = r.firestore._databaseId
      if (!a.isEqual(i))
        throw s.Bu(
          `Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`
        )
      return { referenceValue: za(r.firestore._databaseId || s.databaseId, r._key.path) }
    }
    if (r instanceof cl)
      return (function (a, l) {
        return {
          mapValue: {
            fields: {
              __type__: { stringValue: '__vector__' },
              value: {
                arrayValue: {
                  values: a.toArray().map((c) => {
                    if (typeof c != 'number')
                      throw l.Bu('VectorValues must only contain numeric values.')
                    return qa(l.serializer, c)
                  })
                }
              }
            }
          }
        }
      })(r, s)
    throw s.Bu(`Unsupported field value: ${sl(r)}`)
  })(e, t)
}
function Ed(e, t) {
  const n = {}
  return (
    _f(e)
      ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
      : Pr(e, (r, s) => {
          const i = vd(s, t.Mu(r))
          i != null && (n[r] = i)
        }),
    { mapValue: { fields: n } }
  )
}
function Td(e) {
  return !(
    typeof e != 'object' ||
    e === null ||
    e instanceof Array ||
    e instanceof Date ||
    e instanceof Ut ||
    e instanceof ul ||
    e instanceof Ar ||
    e instanceof Te ||
    e instanceof ll ||
    e instanceof cl
  )
}
function wd(e, t, n) {
  if (
    !Td(n) ||
    !(function (s) {
      return (
        typeof s == 'object' &&
        s !== null &&
        (Object.getPrototypeOf(s) === Object.prototype || Object.getPrototypeOf(s) === null)
      )
    })(n)
  ) {
    const r = sl(n)
    throw r === 'an object' ? t.Bu(e + ' a custom object') : t.Bu(e + ' ' + r)
  }
}
function eT(e, t, n) {
  if ((t = _r(t)) instanceof al) return t._internalPath
  if (typeof t == 'string') return bd(e, t)
  throw Vi('Field path arguments must be of type string or ', e, !1, void 0, n)
}
const nT = new RegExp('[~\\*/\\[\\]]')
function bd(e, t, n) {
  if (t.search(nT) >= 0)
    throw Vi(
      `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
      e,
      !1,
      void 0,
      n
    )
  try {
    return new al(...t.split('.'))._internalPath
  } catch {
    throw Vi(
      `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      e,
      !1,
      void 0,
      n
    )
  }
}
function Vi(e, t, n, r, s) {
  const i = r && !r.isEmpty(),
    a = s !== void 0
  let l = `Function ${t}() called with invalid data`
  ;(n && (l += ' (via `toFirestore()`)'), (l += '. '))
  let c = ''
  return (
    (i || a) &&
      ((c += ' (found'), i && (c += ` in field ${r}`), a && (c += ` in document ${s}`), (c += ')')),
    new X(j.INVALID_ARGUMENT, l + e + c)
  )
}
function rT(e, t) {
  return e.some((n) => n.isEqual(t))
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Id {
  constructor(t, n, r, s, i) {
    ;((this._firestore = t),
      (this._userDataWriter = n),
      (this._key = r),
      (this._document = s),
      (this._converter = i))
  }
  get id() {
    return this._key.path.lastSegment()
  }
  get ref() {
    return new Te(this._firestore, this._converter, this._key)
  }
  exists() {
    return this._document !== null
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const t = new sT(this._firestore, this._userDataWriter, this._key, this._document, null)
        return this._converter.fromFirestore(t)
      }
      return this._userDataWriter.convertValue(this._document.data.value)
    }
  }
  get(t) {
    if (this._document) {
      const n = this._document.data.field(Ad('DocumentSnapshot.get', t))
      if (n !== null) return this._userDataWriter.convertValue(n)
    }
  }
}
class sT extends Id {
  data() {
    return super.data()
  }
}
function Ad(e, t) {
  return typeof t == 'string'
    ? bd(e, t)
    : t instanceof al
      ? t._internalPath
      : t._delegate._internalPath
}
class iT {
  convertValue(t, n = 'none') {
    switch (Gn(t)) {
      case 0:
        return null
      case 1:
        return t.booleanValue
      case 2:
        return Dt(t.integerValue || t.doubleValue)
      case 3:
        return this.convertTimestamp(t.timestampValue)
      case 4:
        return this.convertServerTimestamp(t, n)
      case 5:
        return t.stringValue
      case 6:
        return this.convertBytes(Wn(t.bytesValue))
      case 7:
        return this.convertReference(t.referenceValue)
      case 8:
        return this.convertGeoPoint(t.geoPointValue)
      case 9:
        return this.convertArray(t.arrayValue, n)
      case 11:
        return this.convertObject(t.mapValue, n)
      case 10:
        return this.convertVectorValue(t.mapValue)
      default:
        throw rt()
    }
  }
  convertObject(t, n) {
    return this.convertObjectMap(t.fields, n)
  }
  convertObjectMap(t, n = 'none') {
    const r = {}
    return (
      Pr(t, (s, i) => {
        r[s] = this.convertValue(i, n)
      }),
      r
    )
  }
  convertVectorValue(t) {
    var n, r, s
    const i =
      (s =
        (r = (n = t.fields) === null || n === void 0 ? void 0 : n.value.arrayValue) === null ||
        r === void 0
          ? void 0
          : r.values) === null || s === void 0
        ? void 0
        : s.map((a) => Dt(a.doubleValue))
    return new cl(i)
  }
  convertGeoPoint(t) {
    return new ul(Dt(t.latitude), Dt(t.longitude))
  }
  convertArray(t, n) {
    return (t.values || []).map((r) => this.convertValue(r, n))
  }
  convertServerTimestamp(t, n) {
    switch (n) {
      case 'previous':
        const r = Fa(t)
        return r == null ? null : this.convertValue(r, n)
      case 'estimate':
        return this.convertTimestamp(Ts(t))
      default:
        return null
    }
  }
  convertTimestamp(t) {
    const n = Sn(t)
    return new Ut(n.seconds, n.nanos)
  }
  convertDocumentKey(t, n) {
    const r = Pt.fromString(t)
    Tt(Gf(r))
    const s = new ws(r.get(1), r.get(3)),
      i = new Z(r.popFirst(5))
    return (
      s.isEqual(n) ||
        un(
          `Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`
        ),
      i
    )
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function oT(e, t, n) {
  let r
  return ((r = e ? e.toFirestore(t) : t), r)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class aT {
  constructor(t, n) {
    ;((this.hasPendingWrites = t), (this.fromCache = n))
  }
  isEqual(t) {
    return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache
  }
}
class Rd extends Id {
  constructor(t, n, r, s, i, a) {
    ;(super(t, n, r, s, a), (this._firestore = t), (this._firestoreImpl = t), (this.metadata = i))
  }
  exists() {
    return super.exists()
  }
  data(t = {}) {
    if (this._document) {
      if (this._converter) {
        const n = new lT(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          null
        )
        return this._converter.fromFirestore(n, t)
      }
      return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps)
    }
  }
  get(t, n = {}) {
    if (this._document) {
      const r = this._document.data.field(Ad('DocumentSnapshot.get', t))
      if (r !== null) return this._userDataWriter.convertValue(r, n.serverTimestamps)
    }
  }
}
class lT extends Rd {
  data(t = {}) {
    return super.data(t)
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function uT(e) {
  e = Ci(e, Te)
  const t = Ci(e.firestore, ol)
  return KE(_d(t), e._key).then((n) => dT(t, e, n))
}
class cT extends iT {
  constructor(t) {
    ;(super(), (this.firestore = t))
  }
  convertBytes(t) {
    return new Ar(t)
  }
  convertReference(t) {
    const n = this.convertDocumentKey(t, this.firestore._databaseId)
    return new Te(this.firestore, null, n)
  }
}
function hT(e, t) {
  const n = Ci(e.firestore, ol),
    r = gd(e),
    s = oT(e.converter, t)
  return fT(n, [
    tT(ZE(e.firestore), 'addDoc', r._key, s, e.converter !== null, {}).toMutation(
      r._key,
      rn.exists(!1)
    )
  ]).then(() => r)
}
function fT(e, t) {
  return (function (r, s) {
    const i = new bn()
    return (r.asyncQueue.enqueueAndForget(async () => VE(await $E(r), s, i)), i.promise)
  })(_d(e), t)
}
function dT(e, t, n) {
  const r = n.docs.get(t._key),
    s = new cT(e)
  return new Rd(e, s, t._key, r, new aT(n.hasPendingWrites, n.fromCache), t.converter)
}
function pT() {
  return new fl('serverTimestamp')
}
;(function (t, n = !0) {
  ;((function (s) {
    xr = s
  })(rf),
    ys(
      new yr(
        'firestore',
        (r, { instanceIdentifier: s, options: i }) => {
          const a = r.getProvider('app').getImmediate(),
            l = new ol(
              new iy(r.getProvider('auth-internal')),
              new uy(r.getProvider('app-check-internal')),
              (function (f, d) {
                if (!Object.prototype.hasOwnProperty.apply(f.options, ['projectId']))
                  throw new X(
                    j.INVALID_ARGUMENT,
                    '"projectId" not provided in firebase.initializeApp.'
                  )
                return new ws(f.options.projectId, d)
              })(a, s),
              a
            )
          return ((i = Object.assign({ useFetchStreams: n }, i)), l._setSettings(i), l)
        },
        'PUBLIC'
      ).setMultipleInstances(!0)
    ),
    wn(Yu, '4.7.3', t),
    wn(Yu, '4.7.3', 'esm2017'))
})()
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xd = 'firebasestorage.googleapis.com',
  mT = 'storageBucket',
  gT = 120 * 1e3,
  _T = 600 * 1e3
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ze extends Yn {
  constructor(t, n, r = 0) {
    ;(super(Lo(t), `Firebase Storage: ${n} (${Lo(t)})`),
      (this.status_ = r),
      (this.customData = { serverResponse: null }),
      (this._baseMessage = this.message),
      Object.setPrototypeOf(this, ze.prototype))
  }
  get status() {
    return this.status_
  }
  set status(t) {
    this.status_ = t
  }
  _codeEquals(t) {
    return Lo(t) === this.code
  }
  get serverResponse() {
    return this.customData.serverResponse
  }
  set serverResponse(t) {
    ;((this.customData.serverResponse = t),
      this.customData.serverResponse
        ? (this.message = `${this._baseMessage}
${this.customData.serverResponse}`)
        : (this.message = this._baseMessage))
  }
}
var He
;(function (e) {
  ;((e.UNKNOWN = 'unknown'),
    (e.OBJECT_NOT_FOUND = 'object-not-found'),
    (e.BUCKET_NOT_FOUND = 'bucket-not-found'),
    (e.PROJECT_NOT_FOUND = 'project-not-found'),
    (e.QUOTA_EXCEEDED = 'quota-exceeded'),
    (e.UNAUTHENTICATED = 'unauthenticated'),
    (e.UNAUTHORIZED = 'unauthorized'),
    (e.UNAUTHORIZED_APP = 'unauthorized-app'),
    (e.RETRY_LIMIT_EXCEEDED = 'retry-limit-exceeded'),
    (e.INVALID_CHECKSUM = 'invalid-checksum'),
    (e.CANCELED = 'canceled'),
    (e.INVALID_EVENT_NAME = 'invalid-event-name'),
    (e.INVALID_URL = 'invalid-url'),
    (e.INVALID_DEFAULT_BUCKET = 'invalid-default-bucket'),
    (e.NO_DEFAULT_BUCKET = 'no-default-bucket'),
    (e.CANNOT_SLICE_BLOB = 'cannot-slice-blob'),
    (e.SERVER_FILE_WRONG_SIZE = 'server-file-wrong-size'),
    (e.NO_DOWNLOAD_URL = 'no-download-url'),
    (e.INVALID_ARGUMENT = 'invalid-argument'),
    (e.INVALID_ARGUMENT_COUNT = 'invalid-argument-count'),
    (e.APP_DELETED = 'app-deleted'),
    (e.INVALID_ROOT_OPERATION = 'invalid-root-operation'),
    (e.INVALID_FORMAT = 'invalid-format'),
    (e.INTERNAL_ERROR = 'internal-error'),
    (e.UNSUPPORTED_ENVIRONMENT = 'unsupported-environment'))
})(He || (He = {}))
function Lo(e) {
  return 'storage/' + e
}
function yT() {
  const e = 'An unknown error occurred, please check the error payload for server response.'
  return new ze(He.UNKNOWN, e)
}
function vT() {
  return new ze(He.RETRY_LIMIT_EXCEEDED, 'Max retry time for operation exceeded, please try again.')
}
function ET() {
  return new ze(He.CANCELED, 'User canceled the upload/download.')
}
function TT(e) {
  return new ze(He.INVALID_URL, "Invalid URL '" + e + "'.")
}
function wT(e) {
  return new ze(He.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + e + "'.")
}
function kc(e) {
  return new ze(He.INVALID_ARGUMENT, e)
}
function Pd() {
  return new ze(He.APP_DELETED, 'The Firebase app was deleted.')
}
function bT(e) {
  return new ze(
    He.INVALID_ROOT_OPERATION,
    "The operation '" +
      e +
      "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ae {
  constructor(t, n) {
    ;((this.bucket = t), (this.path_ = n))
  }
  get path() {
    return this.path_
  }
  get isRoot() {
    return this.path.length === 0
  }
  fullServerUrl() {
    const t = encodeURIComponent
    return '/b/' + t(this.bucket) + '/o/' + t(this.path)
  }
  bucketOnlyServerUrl() {
    return '/b/' + encodeURIComponent(this.bucket) + '/o'
  }
  static makeFromBucketSpec(t, n) {
    let r
    try {
      r = Ae.makeFromUrl(t, n)
    } catch {
      return new Ae(t, '')
    }
    if (r.path === '') return r
    throw wT(t)
  }
  static makeFromUrl(t, n) {
    let r = null
    const s = '([A-Za-z0-9.\\-_]+)'
    function i(K) {
      K.path.charAt(K.path.length - 1) === '/' && (K.path_ = K.path_.slice(0, -1))
    }
    const a = '(/(.*))?$',
      l = new RegExp('^gs://' + s + a, 'i'),
      c = { bucket: 1, path: 3 }
    function f(K) {
      K.path_ = decodeURIComponent(K.path)
    }
    const d = 'v[A-Za-z0-9_]+',
      m = n.replace(/[.]/g, '\\.'),
      w = '(/([^?#]*).*)?$',
      P = new RegExp(`^https?://${m}/${d}/b/${s}/o${w}`, 'i'),
      L = { bucket: 1, path: 3 },
      D = n === xd ? '(?:storage.googleapis.com|storage.cloud.google.com)' : n,
      O = '([^?#]*)',
      G = new RegExp(`^https?://${D}/${s}/${O}`, 'i'),
      S = [
        { regex: l, indices: c, postModify: i },
        { regex: P, indices: L, postModify: f },
        { regex: G, indices: { bucket: 1, path: 2 }, postModify: f }
      ]
    for (let K = 0; K < S.length; K++) {
      const ut = S[K],
        _t = ut.regex.exec(t)
      if (_t) {
        const I = _t[ut.indices.bucket]
        let _ = _t[ut.indices.path]
        ;(_ || (_ = ''), (r = new Ae(I, _)), ut.postModify(r))
        break
      }
    }
    if (r == null) throw TT(t)
    return r
  }
}
class IT {
  constructor(t) {
    this.promise_ = Promise.reject(t)
  }
  getPromise() {
    return this.promise_
  }
  cancel(t = !1) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function AT(e, t, n) {
  let r = 1,
    s = null,
    i = null,
    a = !1,
    l = 0
  function c() {
    return l === 2
  }
  let f = !1
  function d(...O) {
    f || ((f = !0), t.apply(null, O))
  }
  function m(O) {
    s = setTimeout(() => {
      ;((s = null), e(P, c()))
    }, O)
  }
  function w() {
    i && clearTimeout(i)
  }
  function P(O, ...G) {
    if (f) {
      w()
      return
    }
    if (O) {
      ;(w(), d.call(null, O, ...G))
      return
    }
    if (c() || a) {
      ;(w(), d.call(null, O, ...G))
      return
    }
    r < 64 && (r *= 2)
    let S
    ;(l === 1 ? ((l = 2), (S = 0)) : (S = (r + Math.random()) * 1e3), m(S))
  }
  let L = !1
  function D(O) {
    L || ((L = !0), w(), !f && (s !== null ? (O || (l = 2), clearTimeout(s), m(0)) : O || (l = 1)))
  }
  return (
    m(0),
    (i = setTimeout(() => {
      ;((a = !0), D(!0))
    }, n)),
    D
  )
}
function RT(e) {
  e(!1)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xT(e) {
  return e !== void 0
}
function Dc(e, t, n, r) {
  if (r < t) throw kc(`Invalid value for '${e}'. Expected ${t} or greater.`)
  if (r > n) throw kc(`Invalid value for '${e}'. Expected ${n} or less.`)
}
function PT(e) {
  const t = encodeURIComponent
  let n = '?'
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const s = t(r) + '=' + t(e[r])
      n = n + s + '&'
    }
  return ((n = n.slice(0, -1)), n)
}
var ki
;(function (e) {
  ;((e[(e.NO_ERROR = 0)] = 'NO_ERROR'),
    (e[(e.NETWORK_ERROR = 1)] = 'NETWORK_ERROR'),
    (e[(e.ABORT = 2)] = 'ABORT'))
})(ki || (ki = {}))
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ST(e, t) {
  const n = e >= 500 && e < 600,
    s = [408, 429].indexOf(e) !== -1,
    i = t.indexOf(e) !== -1
  return n || s || i
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class CT {
  constructor(t, n, r, s, i, a, l, c, f, d, m, w = !0) {
    ;((this.url_ = t),
      (this.method_ = n),
      (this.headers_ = r),
      (this.body_ = s),
      (this.successCodes_ = i),
      (this.additionalRetryCodes_ = a),
      (this.callback_ = l),
      (this.errorCallback_ = c),
      (this.timeout_ = f),
      (this.progressCallback_ = d),
      (this.connectionFactory_ = m),
      (this.retry = w),
      (this.pendingConnection_ = null),
      (this.backoffId_ = null),
      (this.canceled_ = !1),
      (this.appDelete_ = !1),
      (this.promise_ = new Promise((P, L) => {
        ;((this.resolve_ = P), (this.reject_ = L), this.start_())
      })))
  }
  start_() {
    const t = (r, s) => {
        if (s) {
          r(!1, new oi(!1, null, !0))
          return
        }
        const i = this.connectionFactory_()
        this.pendingConnection_ = i
        const a = (l) => {
          const c = l.loaded,
            f = l.lengthComputable ? l.total : -1
          this.progressCallback_ !== null && this.progressCallback_(c, f)
        }
        ;(this.progressCallback_ !== null && i.addUploadProgressListener(a),
          i.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
            ;(this.progressCallback_ !== null && i.removeUploadProgressListener(a),
              (this.pendingConnection_ = null))
            const l = i.getErrorCode() === ki.NO_ERROR,
              c = i.getStatus()
            if (!l || (ST(c, this.additionalRetryCodes_) && this.retry)) {
              const d = i.getErrorCode() === ki.ABORT
              r(!1, new oi(!1, null, d))
              return
            }
            const f = this.successCodes_.indexOf(c) !== -1
            r(!0, new oi(f, i))
          }))
      },
      n = (r, s) => {
        const i = this.resolve_,
          a = this.reject_,
          l = s.connection
        if (s.wasSuccessCode)
          try {
            const c = this.callback_(l, l.getResponse())
            xT(c) ? i(c) : i()
          } catch (c) {
            a(c)
          }
        else if (l !== null) {
          const c = yT()
          ;((c.serverResponse = l.getErrorText()),
            this.errorCallback_ ? a(this.errorCallback_(l, c)) : a(c))
        } else if (s.canceled) {
          const c = this.appDelete_ ? Pd() : ET()
          a(c)
        } else {
          const c = vT()
          a(c)
        }
      }
    this.canceled_ ? n(!1, new oi(!1, null, !0)) : (this.backoffId_ = AT(t, n, this.timeout_))
  }
  getPromise() {
    return this.promise_
  }
  cancel(t) {
    ;((this.canceled_ = !0),
      (this.appDelete_ = t || !1),
      this.backoffId_ !== null && RT(this.backoffId_),
      this.pendingConnection_ !== null && this.pendingConnection_.abort())
  }
}
class oi {
  constructor(t, n, r) {
    ;((this.wasSuccessCode = t), (this.connection = n), (this.canceled = !!r))
  }
}
function VT(e, t) {
  t !== null && t.length > 0 && (e.Authorization = 'Firebase ' + t)
}
function kT(e, t) {
  e['X-Firebase-Storage-Version'] = 'webjs/' + (t ?? 'AppManager')
}
function DT(e, t) {
  t && (e['X-Firebase-GMPID'] = t)
}
function NT(e, t) {
  t !== null && (e['X-Firebase-AppCheck'] = t)
}
function OT(e, t, n, r, s, i, a = !0) {
  const l = PT(e.urlParams),
    c = e.url + l,
    f = Object.assign({}, e.headers)
  return (
    DT(f, t),
    VT(f, n),
    kT(f, i),
    NT(f, r),
    new CT(
      c,
      e.method,
      f,
      e.body,
      e.successCodes,
      e.additionalRetryCodes,
      e.handler,
      e.errorHandler,
      e.timeout,
      e.progressCallback,
      s,
      a
    )
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function MT(e) {
  if (e.length === 0) return null
  const t = e.lastIndexOf('/')
  return t === -1 ? '' : e.slice(0, t)
}
function LT(e) {
  const t = e.lastIndexOf('/', e.length - 2)
  return t === -1 ? e : e.slice(t + 1)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Di {
  constructor(t, n) {
    ;((this._service = t),
      n instanceof Ae ? (this._location = n) : (this._location = Ae.makeFromUrl(n, t.host)))
  }
  toString() {
    return 'gs://' + this._location.bucket + '/' + this._location.path
  }
  _newRef(t, n) {
    return new Di(t, n)
  }
  get root() {
    const t = new Ae(this._location.bucket, '')
    return this._newRef(this._service, t)
  }
  get bucket() {
    return this._location.bucket
  }
  get fullPath() {
    return this._location.path
  }
  get name() {
    return LT(this._location.path)
  }
  get storage() {
    return this._service
  }
  get parent() {
    const t = MT(this._location.path)
    if (t === null) return null
    const n = new Ae(this._location.bucket, t)
    return new Di(this._service, n)
  }
  _throwIfRoot(t) {
    if (this._location.path === '') throw bT(t)
  }
}
function Nc(e, t) {
  const n = t == null ? void 0 : t[mT]
  return n == null ? null : Ae.makeFromBucketSpec(n, e)
}
function FT(e, t, n, r = {}) {
  ;((e.host = `${t}:${n}`), (e._protocol = 'http'))
  const { mockUserToken: s } = r
  s && (e._overrideAuthToken = typeof s == 'string' ? s : Xh(s, e.app.options.projectId))
}
class UT {
  constructor(t, n, r, s, i) {
    ;((this.app = t),
      (this._authProvider = n),
      (this._appCheckProvider = r),
      (this._url = s),
      (this._firebaseVersion = i),
      (this._bucket = null),
      (this._host = xd),
      (this._protocol = 'https'),
      (this._appId = null),
      (this._deleted = !1),
      (this._maxOperationRetryTime = gT),
      (this._maxUploadRetryTime = _T),
      (this._requests = new Set()),
      s != null
        ? (this._bucket = Ae.makeFromBucketSpec(s, this._host))
        : (this._bucket = Nc(this._host, this.app.options)))
  }
  get host() {
    return this._host
  }
  set host(t) {
    ;((this._host = t),
      this._url != null
        ? (this._bucket = Ae.makeFromBucketSpec(this._url, t))
        : (this._bucket = Nc(t, this.app.options)))
  }
  get maxUploadRetryTime() {
    return this._maxUploadRetryTime
  }
  set maxUploadRetryTime(t) {
    ;(Dc('time', 0, Number.POSITIVE_INFINITY, t), (this._maxUploadRetryTime = t))
  }
  get maxOperationRetryTime() {
    return this._maxOperationRetryTime
  }
  set maxOperationRetryTime(t) {
    ;(Dc('time', 0, Number.POSITIVE_INFINITY, t), (this._maxOperationRetryTime = t))
  }
  async _getAuthToken() {
    if (this._overrideAuthToken) return this._overrideAuthToken
    const t = this._authProvider.getImmediate({ optional: !0 })
    if (t) {
      const n = await t.getToken()
      if (n !== null) return n.accessToken
    }
    return null
  }
  async _getAppCheckToken() {
    const t = this._appCheckProvider.getImmediate({ optional: !0 })
    return t ? (await t.getToken()).token : null
  }
  _delete() {
    return (
      this._deleted ||
        ((this._deleted = !0), this._requests.forEach((t) => t.cancel()), this._requests.clear()),
      Promise.resolve()
    )
  }
  _makeStorageReference(t) {
    return new Di(this, t)
  }
  _makeRequest(t, n, r, s, i = !0) {
    if (this._deleted) return new IT(Pd())
    {
      const a = OT(t, this._appId, r, s, n, this._firebaseVersion, i)
      return (
        this._requests.add(a),
        a.getPromise().then(
          () => this._requests.delete(a),
          () => this._requests.delete(a)
        ),
        a
      )
    }
  }
  async makeRequestWithTokens(t, n) {
    const [r, s] = await Promise.all([this._getAuthToken(), this._getAppCheckToken()])
    return this._makeRequest(t, n, r, s).getPromise()
  }
}
const Oc = '@firebase/storage',
  Mc = '0.13.2'
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Sd = 'storage'
function BT(e = of(), t) {
  e = _r(e)
  const r = nf(e, Sd).getImmediate({ identifier: t }),
    s = Qh('storage')
  return (s && jT(r, ...s), r)
}
function jT(e, t, n, r = {}) {
  FT(e, t, n, r)
}
function $T(e, { instanceIdentifier: t }) {
  const n = e.getProvider('app').getImmediate(),
    r = e.getProvider('auth-internal'),
    s = e.getProvider('app-check-internal')
  return new UT(n, r, s, t, rf)
}
function qT() {
  ;(ys(new yr(Sd, $T, 'PUBLIC').setMultipleInstances(!0)), wn(Oc, Mc, ''), wn(Oc, Mc, 'esm2017'))
}
qT()
const KT = {
    apiKey: 'AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE',
    authDomain: 'portal-mambaul-ulum.firebaseapp.com',
    projectId: 'portal-mambaul-ulum',
    storageBucket: 'portal-mambaul-ulum.firebasestorage.app',
    messagingSenderId: '289365012301',
    appId: '1:289365012301:web:c5b2655559043783221104',
    measurementId: 'G-59LNXJ9MVH'
  },
  Cd = sf(KT),
  Lc = GE(Cd)
BT(Cd)
const HT = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, s] of t) n[r] = s
    return n
  },
  zT = { class: 'p-4 md:p-6 min-h-screen' },
  WT = { class: 'max-w-4xl mx-auto space-y-4' },
  GT = { class: 'bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md' },
  QT = { class: 'flex flex-wrap items-center justify-between gap-2 mt-3 text-xs' },
  YT = { class: 'font-bold text-slate-700' },
  XT = { class: 'text-teal-700' },
  JT = {
    key: 0,
    class: 'bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center'
  },
  ZT = { class: 'text-3xl font-black text-teal-600 my-3 tracking-wider' },
  tw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-teal-300' },
  ew = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  nw = ['value'],
  rw = ['value'],
  sw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-200' },
  iw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  ow = { class: 'md:col-span-2' },
  aw = { class: 'flex gap-4 mt-2' },
  lw = { class: 'flex items-center gap-1.5 text-sm font-bold text-slate-700' },
  uw = { class: 'flex items-center gap-1.5 text-sm font-bold text-slate-700' },
  cw = { class: 'md:col-span-2' },
  hw = {
    class: 'md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-50'
  },
  fw = { class: 'md:col-span-2' },
  dw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-emerald-200' },
  pw = { class: 'space-y-6' },
  mw = { class: 'p-4 bg-emerald-50 rounded-2xl border border-emerald-100' },
  gw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  _w = { class: 'md:col-span-2' },
  yw = ['value'],
  vw = { class: 'md:col-span-2' },
  Ew = { class: 'p-4 bg-pink-50 rounded-2xl border border-pink-100' },
  Tw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  ww = { class: 'md:col-span-2' },
  bw = ['value'],
  Iw = { class: 'md:col-span-2' },
  Aw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  Rw = ['value'],
  xw = { class: 'md:col-span-2' },
  Pw = {
    class: 'bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center'
  },
  Sw = { class: 'flex items-start gap-3 mb-6 cursor-pointer' },
  Cw = ['disabled'],
  Vw = {
    key: 0,
    class:
      'mt-4 text-xs font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100'
  },
  kw = {
    __name: 'PsbFormView',
    setup(e) {
      const t = [
          {
            value: 'mahad',
            label: "Ma'had (Mukim)",
            icon: 'fa-bed',
            desc: 'Tinggal di asrama 24 jam'
          },
          {
            value: 'pp',
            label: 'Pulang Pergi',
            icon: 'fa-home',
            desc: 'Tidak mukim, tidak fullday'
          },
          { value: 'fullday', label: 'Fullday', icon: 'fa-clock', desc: 'Termasuk makan siang' }
        ],
        n = [
          '< Rp 1.000.000',
          'Rp 1.000.000 - Rp 2.500.000',
          'Rp 2.500.000 - Rp 5.000.000',
          '> Rp 5.000.000'
        ],
        r = [
          'SD/MI',
          'SMP/MTs',
          'SMA/MA',
          'Diploma (D1-D4)',
          'Sarjana (S1)',
          'Pascasarjana (S2/S3)',
          'Pondok Pesantren'
        ],
        s = _n(w()),
        i = _n(!1),
        a = _n(!1),
        l = _n(''),
        c = _n(''),
        f = _n(!1),
        d = _n([]),
        m = _n('')
      function w() {
        return {
          tipe_santri: 'pp',
          lembaga_qiraati: '',
          nama: '',
          nama_panggilan: '',
          jk: 'L',
          nik: '',
          no_kk: '',
          tempat_lahir: '',
          tgl_lahir: '',
          asal_sekolah: '',
          alamat_dusun: '',
          alamat_desa: '',
          alamat_kecamatan: '',
          alamat_kabupaten: '',
          alamat_provinsi: 'Jawa Timur',
          ayah_nama: '',
          ayah_nik: '',
          ayah_pekerjaan: '',
          ayah_pendidikan: '',
          ayah_ttl: '',
          ayah_hp: '',
          ibu_nama: '',
          ibu_nik: '',
          ibu_pekerjaan: '',
          ibu_pendidikan: '',
          ibu_ttl: '',
          ibu_hp: '',
          wa_wali: '',
          penghasilan_ortu: '',
          yang_mendaftarkan: ''
        }
      }
      const P = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH'],
        L = Kh(() => {
          const G = d.value
            .filter((g) => P.some((S) => S.toLowerCase() === String(g.lembaga || '').toLowerCase()))
            .map((g) => g.lembaga)
          return G.length > 0 ? G : P
        })
      async function D() {
        if (((l.value = ''), !f.value)) {
          l.value = 'Mohon setujui syarat & ketentuan'
          return
        }
        const G = String(s.value.nama || '').trim()
        if (!G) {
          ;((l.value = 'Nama santri wajib diisi'), window.scrollTo({ top: 0, behavior: 'smooth' }))
          return
        }
        if (G.length > 200) {
          l.value = 'Nama santri maks 200 karakter'
          return
        }
        if (!s.value.lembaga_qiraati) {
          l.value = 'Lembaga Qiraati wajib dipilih'
          return
        }
        if (!s.value.tipe_santri) {
          l.value = 'Tipe santri wajib dipilih'
          return
        }
        a.value = !0
        try {
          const g = 'PSB-' + Date.now(),
            S = {
              no_pendaftaran: g,
              ...s.value,
              nama: G,
              lembaga_tujuan: s.value.lembaga_qiraati,
              is_mukim: s.value.tipe_santri === 'mahad',
              is_fullday: s.value.tipe_santri === 'fullday',
              tahunAjaran: m.value,
              status: 'pending',
              created_at: pT()
            }
          ;(await hT(WE(Lc, 'psb_pendaftaran'), S),
            (c.value = g),
            (i.value = !0),
            window.scrollTo({ top: 0, behavior: 'smooth' }))
        } catch (g) {
          console.error('[onSubmit]', g)
          const S = String((g == null ? void 0 : g.message) || '')
          ;(S.includes('permission-denied')
            ? (l.value = 'Akses Firestore ditolak. Hubungi admin pondok.')
            : S.includes('unavailable') || S.includes('network')
              ? (l.value = 'Koneksi internet bermasalah. Coba lagi.')
              : (l.value = 'Gagal kirim pendaftaran: ' + (S || 'unknown error')),
            window.scrollTo({ top: 0, behavior: 'smooth' }))
        } finally {
          a.value = !1
        }
      }
      function O() {
        ;((s.value = w()), (i.value = !1), (c.value = ''), (l.value = ''), (f.value = !1))
      }
      return (
        vh(async () => {
          var S
          const G = new Date().getFullYear(),
            g = new Date().getMonth() + 1
          m.value = g >= 7 ? `${G}/${G + 1}` : `${G - 1}/${G}`
          try {
            const K = await uT(gd(Lc, 'master', 'lembaga'))
            d.value = Array.isArray((S = K.data()) == null ? void 0 : S.list) ? K.data().list : []
          } catch {}
        }),
        (G, g) => (
          ge(),
          Ce('div', zT, [
            C('div', WT, [
              C('div', GT, [
                g[34] ||
                  (g[34] = Um(
                    '<div class="flex items-center gap-4 border-b-2 border-double border-slate-700 pb-3 mb-3" data-v-9acfef51><img src="' +
                      Sg +
                      '" alt="Logo MU" class="w-20 h-20 flex-shrink-0" data-v-9acfef51><div class="flex-1 text-center" data-v-9acfef51><p class="text-[10px] font-bold uppercase tracking-wider text-slate-700" data-v-9acfef51>YAYASAN MAMBAUL ULUM</p><h1 class="text-base md:text-xl font-black text-slate-900 uppercase tracking-wide" data-v-9acfef51>TAMAN PENDIDIKAN AL QUR&#39;AN MAMBAUL ULUM</h1><p class="text-[10px] text-slate-600 mt-0.5" data-v-9acfef51>Jl. Kolonel Sugiono 112 Panjunan Kepuh Kiriman Waru Sidoarjo</p><p class="text-[10px] text-slate-600" data-v-9acfef51>Telp: (031) 8537xxx · Email: info@ammu.id</p></div><div class="w-20 flex-shrink-0" data-v-9acfef51></div></div><h2 class="text-center text-base md:text-lg font-black uppercase text-slate-800 underline decoration-2 underline-offset-4" data-v-9acfef51>FORMULIR PENDAFTARAN SANTRI BARU</h2>',
                    2
                  )),
                C('div', QT, [
                  C('p', YT, [
                    g[32] || (g[32] = oe('Tahun Ajaran: ', -1)),
                    C('span', XT, ke(m.value), 1)
                  ]),
                  g[33] ||
                    (g[33] = C(
                      'p',
                      { class: 'font-bold text-slate-700' },
                      [
                        oe('No. Pendaftaran: '),
                        C(
                          'span',
                          { class: 'font-mono text-slate-400 italic' },
                          '(otomatis setelah submit)'
                        )
                      ],
                      -1
                    ))
                ]),
                g[35] ||
                  (g[35] = C(
                    'p',
                    { class: 'text-[10px] text-rose-500 italic mt-2 text-center' },
                    '* Isi sesuai akte kelahiran / kartu keluarga',
                    -1
                  ))
              ]),
              i.value
                ? (ge(),
                  Ce('div', JT, [
                    g[37] ||
                      (g[37] = C(
                        'i',
                        { class: 'fas fa-check-circle text-emerald-500 text-6xl mb-3' },
                        null,
                        -1
                      )),
                    g[38] ||
                      (g[38] = C(
                        'h2',
                        { class: 'text-lg font-black text-emerald-700' },
                        'Pendaftaran Berhasil!',
                        -1
                      )),
                    g[39] ||
                      (g[39] = C(
                        'p',
                        { class: 'text-sm text-slate-600 mt-2' },
                        'No. Pendaftaran Anda:',
                        -1
                      )),
                    C('p', ZT, ke(c.value), 1),
                    g[40] ||
                      (g[40] = C(
                        'p',
                        { class: 'text-xs text-slate-500' },
                        'Simpan nomor di atas. Admin akan menghubungi via WhatsApp.',
                        -1
                      )),
                    C(
                      'button',
                      {
                        onClick: O,
                        class:
                          'mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition'
                      },
                      [
                        ...(g[36] ||
                          (g[36] = [
                            C('i', { class: 'fas fa-plus mr-1' }, null, -1),
                            oe('Daftarkan Lagi ', -1)
                          ]))
                      ]
                    )
                  ]))
                : (ge(),
                  Ce(
                    'form',
                    { key: 1, onSubmit: bg(D, ['prevent']), class: 'space-y-6' },
                    [
                      C('div', tw, [
                        g[44] ||
                          (g[44] = C(
                            'h3',
                            {
                              class:
                                'text-xs font-black text-teal-800 uppercase tracking-widest mb-4 flex items-center gap-2'
                            },
                            [
                              C(
                                'span',
                                {
                                  class:
                                    'w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]'
                                },
                                '1'
                              ),
                              oe(' Pilihan Lembaga & Tipe ')
                            ],
                            -1
                          )),
                        C('div', ew, [
                          C('div', null, [
                            g[42] ||
                              (g[42] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Lembaga Qiraati *',
                                -1
                              )),
                            pt(
                              C(
                                'select',
                                {
                                  'onUpdate:modelValue':
                                    g[0] || (g[0] = (S) => (s.value.lembaga_qiraati = S)),
                                  required: '',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                                },
                                [
                                  g[41] ||
                                    (g[41] = C('option', { value: '' }, '-- Pilih Qiraati --', -1)),
                                  (ge(!0),
                                  Ce(
                                    ce,
                                    null,
                                    Wr(
                                      L.value,
                                      (S) => (
                                        ge(),
                                        Ce('option', { key: S, value: S }, ke(S), 9, nw)
                                      )
                                    ),
                                    128
                                  ))
                                ],
                                512
                              ),
                              [[Qr, s.value.lembaga_qiraati]]
                            )
                          ]),
                          C('div', null, [
                            g[43] ||
                              (g[43] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tipe Santri *',
                                -1
                              )),
                            pt(
                              C(
                                'select',
                                {
                                  'onUpdate:modelValue':
                                    g[1] || (g[1] = (S) => (s.value.tipe_santri = S)),
                                  required: '',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                                },
                                [
                                  (ge(),
                                  Ce(
                                    ce,
                                    null,
                                    Wr(t, (S) =>
                                      C(
                                        'option',
                                        { key: S.value, value: S.value },
                                        ke(S.label),
                                        9,
                                        rw
                                      )
                                    ),
                                    64
                                  ))
                                ],
                                512
                              ),
                              [[Qr, s.value.tipe_santri]]
                            )
                          ])
                        ])
                      ]),
                      C('div', sw, [
                        g[60] ||
                          (g[60] = C(
                            'h3',
                            {
                              class:
                                'text-sm font-black text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-blue-100 pb-2'
                            },
                            [
                              C(
                                'span',
                                {
                                  class:
                                    'w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black'
                                },
                                'I'
                              ),
                              oe(' Identitas Santri ')
                            ],
                            -1
                          )),
                        C('div', iw, [
                          C('div', ow, [
                            g[45] ||
                              (g[45] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Nama Lengkap *',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue': g[2] || (g[2] = (S) => (s.value.nama = S)),
                                  type: 'text',
                                  required: '',
                                  placeholder: 'Sesuai akte lahir',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.nama]]
                            )
                          ]),
                          C('div', null, [
                            g[46] ||
                              (g[46] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Nama Panggilan',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    g[3] || (g[3] = (S) => (s.value.nama_panggilan = S)),
                                  type: 'text',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.nama_panggilan]]
                            )
                          ]),
                          C('div', null, [
                            g[49] ||
                              (g[49] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Jenis Kelamin *',
                                -1
                              )),
                            C('div', aw, [
                              C('label', lw, [
                                pt(
                                  C(
                                    'input',
                                    {
                                      type: 'radio',
                                      'onUpdate:modelValue':
                                        g[4] || (g[4] = (S) => (s.value.jk = S)),
                                      value: 'L',
                                      required: '',
                                      class: 'w-4 h-4'
                                    },
                                    null,
                                    512
                                  ),
                                  [[Mu, s.value.jk]]
                                ),
                                g[47] || (g[47] = oe(' Laki-laki', -1))
                              ]),
                              C('label', uw, [
                                pt(
                                  C(
                                    'input',
                                    {
                                      type: 'radio',
                                      'onUpdate:modelValue':
                                        g[5] || (g[5] = (S) => (s.value.jk = S)),
                                      value: 'P',
                                      class: 'w-4 h-4'
                                    },
                                    null,
                                    512
                                  ),
                                  [[Mu, s.value.jk]]
                                ),
                                g[48] || (g[48] = oe(' Perempuan', -1))
                              ])
                            ])
                          ]),
                          C('div', null, [
                            g[50] ||
                              (g[50] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'NIK Santri (16 Digit)',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue': g[6] || (g[6] = (S) => (s.value.nik = S)),
                                  type: 'text',
                                  maxlength: '16',
                                  placeholder: '3515...',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.nik]]
                            )
                          ]),
                          C('div', null, [
                            g[51] ||
                              (g[51] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'No. Kartu Keluarga (KK)',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    g[7] || (g[7] = (S) => (s.value.no_kk = S)),
                                  type: 'text',
                                  maxlength: '16',
                                  placeholder: '3515...',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.no_kk]]
                            )
                          ]),
                          C('div', null, [
                            g[52] ||
                              (g[52] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tempat Lahir *',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    g[8] || (g[8] = (S) => (s.value.tempat_lahir = S)),
                                  type: 'text',
                                  required: '',
                                  placeholder: 'Kabupaten / Kota',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.tempat_lahir]]
                            )
                          ]),
                          C('div', null, [
                            g[53] ||
                              (g[53] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tanggal Lahir *',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    g[9] || (g[9] = (S) => (s.value.tgl_lahir = S)),
                                  type: 'date',
                                  required: '',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.tgl_lahir]]
                            )
                          ]),
                          C('div', cw, [
                            g[54] ||
                              (g[54] = C(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Asal Sekolah Sebelumnya',
                                -1
                              )),
                            pt(
                              C(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    g[10] || (g[10] = (S) => (s.value.asal_sekolah = S)),
                                  type: 'text',
                                  placeholder: 'Contoh: TK Aisyiyah Bustanul Athfal',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white shadow-sm'
                                },
                                null,
                                512
                              ),
                              [[xt, s.value.asal_sekolah]]
                            )
                          ]),
                          C('div', hw, [
                            C('div', fw, [
                              g[55] ||
                                (g[55] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Alamat (Jl. / Dusun) *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[11] || (g[11] = (S) => (s.value.alamat_dusun = S)),
                                    type: 'text',
                                    required: '',
                                    placeholder: 'Contoh: Jl. Merpati No. 10 / Dusun Panjunan',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.alamat_dusun]]
                              )
                            ]),
                            C('div', null, [
                              g[56] ||
                                (g[56] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Desa / Kelurahan *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[12] || (g[12] = (S) => (s.value.alamat_desa = S)),
                                    type: 'text',
                                    required: '',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.alamat_desa]]
                              )
                            ]),
                            C('div', null, [
                              g[57] ||
                                (g[57] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Kecamatan *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[13] || (g[13] = (S) => (s.value.alamat_kecamatan = S)),
                                    type: 'text',
                                    required: '',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.alamat_kecamatan]]
                              )
                            ]),
                            C('div', null, [
                              g[58] ||
                                (g[58] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Kabupaten / Kota *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[14] || (g[14] = (S) => (s.value.alamat_kabupaten = S)),
                                    type: 'text',
                                    required: '',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.alamat_kabupaten]]
                              )
                            ]),
                            C('div', null, [
                              g[59] ||
                                (g[59] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Provinsi *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[15] || (g[15] = (S) => (s.value.alamat_provinsi = S)),
                                    type: 'text',
                                    required: '',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.alamat_provinsi]]
                              )
                            ])
                          ])
                        ])
                      ]),
                      C('div', dw, [
                        g[81] ||
                          (g[81] = C(
                            'h3',
                            {
                              class:
                                'text-sm font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-emerald-100 pb-2'
                            },
                            [
                              C(
                                'span',
                                {
                                  class:
                                    'w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black'
                                },
                                'II'
                              ),
                              oe(' Identitas Orang Tua / Wali ')
                            ],
                            -1
                          )),
                        C('div', pw, [
                          C('div', mw, [
                            g[68] ||
                              (g[68] = C(
                                'h4',
                                {
                                  class:
                                    'text-[10px] font-black text-emerald-700 uppercase mb-3 flex items-center gap-2'
                                },
                                [
                                  C('i', { class: 'fas fa-user-tie' }),
                                  oe(' Data Ayah Kandung/Tiri/Angkat ')
                                ],
                                -1
                              )),
                            C('div', gw, [
                              C('div', _w, [
                                g[61] ||
                                  (g[61] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Nama Ayah *',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[16] || (g[16] = (S) => (s.value.ayah_nama = S)),
                                      type: 'text',
                                      required: '',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ayah_nama]]
                                )
                              ]),
                              C('div', null, [
                                g[62] ||
                                  (g[62] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'NIK Ayah',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[17] || (g[17] = (S) => (s.value.ayah_nik = S)),
                                      type: 'text',
                                      maxlength: '16',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ayah_nik]]
                                )
                              ]),
                              C('div', null, [
                                g[63] ||
                                  (g[63] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Pekerjaan Ayah',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[18] || (g[18] = (S) => (s.value.ayah_pekerjaan = S)),
                                      type: 'text',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ayah_pekerjaan]]
                                )
                              ]),
                              C('div', null, [
                                g[65] ||
                                  (g[65] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Pendidikan Terakhir',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'select',
                                    {
                                      'onUpdate:modelValue':
                                        g[19] || (g[19] = (S) => (s.value.ayah_pendidikan = S)),
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    [
                                      g[64] ||
                                        (g[64] = C('option', { value: '' }, '-- Pilih --', -1)),
                                      (ge(),
                                      Ce(
                                        ce,
                                        null,
                                        Wr(r, (S) =>
                                          C('option', { key: S, value: S }, ke(S), 9, yw)
                                        ),
                                        64
                                      ))
                                    ],
                                    512
                                  ),
                                  [[Qr, s.value.ayah_pendidikan]]
                                )
                              ]),
                              C('div', null, [
                                g[66] ||
                                  (g[66] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Tempat, Tgl Lahir Ayah',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[20] || (g[20] = (S) => (s.value.ayah_ttl = S)),
                                      type: 'text',
                                      placeholder: 'Contoh: Sidoarjo, 12-05-1980',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ayah_ttl]]
                                )
                              ]),
                              C('div', vw, [
                                g[67] ||
                                  (g[67] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'No. HP Ayah',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[21] || (g[21] = (S) => (s.value.ayah_hp = S)),
                                      type: 'tel',
                                      placeholder: '08xxxxxxxxxx',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ayah_hp]]
                                )
                              ])
                            ])
                          ]),
                          C('div', Ew, [
                            g[76] ||
                              (g[76] = C(
                                'h4',
                                {
                                  class:
                                    'text-[10px] font-black text-pink-700 uppercase mb-3 flex items-center gap-2'
                                },
                                [
                                  C('i', { class: 'fas fa-user-friends' }),
                                  oe(' Data Ibu Kandung/Tiri/Angkat ')
                                ],
                                -1
                              )),
                            C('div', Tw, [
                              C('div', ww, [
                                g[69] ||
                                  (g[69] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Nama Ibu *',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[22] || (g[22] = (S) => (s.value.ibu_nama = S)),
                                      type: 'text',
                                      required: '',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ibu_nama]]
                                )
                              ]),
                              C('div', null, [
                                g[70] ||
                                  (g[70] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'NIK Ibu',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[23] || (g[23] = (S) => (s.value.ibu_nik = S)),
                                      type: 'text',
                                      maxlength: '16',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ibu_nik]]
                                )
                              ]),
                              C('div', null, [
                                g[71] ||
                                  (g[71] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Pekerjaan Ibu',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[24] || (g[24] = (S) => (s.value.ibu_pekerjaan = S)),
                                      type: 'text',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ibu_pekerjaan]]
                                )
                              ]),
                              C('div', null, [
                                g[73] ||
                                  (g[73] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Pendidikan Terakhir',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'select',
                                    {
                                      'onUpdate:modelValue':
                                        g[25] || (g[25] = (S) => (s.value.ibu_pendidikan = S)),
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    [
                                      g[72] ||
                                        (g[72] = C('option', { value: '' }, '-- Pilih --', -1)),
                                      (ge(),
                                      Ce(
                                        ce,
                                        null,
                                        Wr(r, (S) =>
                                          C('option', { key: S, value: S }, ke(S), 9, bw)
                                        ),
                                        64
                                      ))
                                    ],
                                    512
                                  ),
                                  [[Qr, s.value.ibu_pendidikan]]
                                )
                              ]),
                              C('div', null, [
                                g[74] ||
                                  (g[74] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Tempat, Tgl Lahir Ibu',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[26] || (g[26] = (S) => (s.value.ibu_ttl = S)),
                                      type: 'text',
                                      placeholder: 'Contoh: Sidoarjo, 12-05-1985',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ibu_ttl]]
                                )
                              ]),
                              C('div', Iw, [
                                g[75] ||
                                  (g[75] = C(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'No. HP Ibu',
                                    -1
                                  )),
                                pt(
                                  C(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        g[27] || (g[27] = (S) => (s.value.ibu_hp = S)),
                                      type: 'tel',
                                      placeholder: '08xxxxxxxxxx',
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    null,
                                    512
                                  ),
                                  [[xt, s.value.ibu_hp]]
                                )
                              ])
                            ])
                          ]),
                          C('div', Aw, [
                            C('div', null, [
                              g[77] ||
                                (g[77] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'No. Telpon / HP (WhatsApp) *',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[28] || (g[28] = (S) => (s.value.wa_wali = S)),
                                    type: 'tel',
                                    required: '',
                                    placeholder: '08xxxxxxxxxx',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.wa_wali]]
                              )
                            ]),
                            C('div', null, [
                              g[79] ||
                                (g[79] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Penghasilan Ortu (Total)',
                                  -1
                                )),
                              pt(
                                C(
                                  'select',
                                  {
                                    'onUpdate:modelValue':
                                      g[29] || (g[29] = (S) => (s.value.penghasilan_ortu = S)),
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  [
                                    g[78] ||
                                      (g[78] = C('option', { value: '' }, '-- Pilih Range --', -1)),
                                    (ge(),
                                    Ce(
                                      ce,
                                      null,
                                      Wr(n, (S) => C('option', { key: S, value: S }, ke(S), 9, Rw)),
                                      64
                                    ))
                                  ],
                                  512
                                ),
                                [[Qr, s.value.penghasilan_ortu]]
                              )
                            ]),
                            C('div', xw, [
                              g[80] ||
                                (g[80] = C(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Yang Mendaftarkan (Nama Wali)',
                                  -1
                                )),
                              pt(
                                C(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      g[30] || (g[30] = (S) => (s.value.yang_mendaftarkan = S)),
                                    type: 'text',
                                    placeholder: 'Isi jika bukan Ortu kandung',
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  null,
                                  512
                                ),
                                [[xt, s.value.yang_mendaftarkan]]
                              )
                            ])
                          ])
                        ])
                      ]),
                      C('div', Pw, [
                        C('label', Sw, [
                          pt(
                            C(
                              'input',
                              {
                                'onUpdate:modelValue': g[31] || (g[31] = (S) => (f.value = S)),
                                type: 'checkbox',
                                required: '',
                                class: 'mt-1 w-5 h-5 rounded-lg text-teal-600 focus:ring-teal-500'
                              },
                              null,
                              512
                            ),
                            [[Eg, f.value]]
                          ),
                          g[82] ||
                            (g[82] = C(
                              'span',
                              { class: 'text-xs text-slate-600 leading-relaxed font-medium' },
                              [
                                oe(' Saya menyatakan bahwa data yang diisi adalah '),
                                C('b', null, 'benar dan akurat'),
                                oe(
                                  ' sesuai dokumen asli. Saya menyetujui syarat & ketentuan pendaftaran di TPQ Mambaul Ulum. '
                                )
                              ],
                              -1
                            ))
                        ]),
                        C(
                          'button',
                          {
                            type: 'submit',
                            disabled: a.value || !f.value,
                            class:
                              'w-full md:w-auto md:px-16 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-3'
                          },
                          [
                            C(
                              'i',
                              {
                                class: Ui([
                                  'fas',
                                  a.value ? 'fa-spinner fa-spin' : 'fa-paper-plane'
                                ])
                              },
                              null,
                              2
                            ),
                            oe(' ' + ke(a.value ? 'MEMPROSES...' : 'DAFTAR SEKARANG'), 1)
                          ],
                          8,
                          Cw
                        ),
                        l.value
                          ? (ge(),
                            Ce('p', Vw, [
                              g[83] ||
                                (g[83] = C(
                                  'i',
                                  { class: 'fas fa-exclamation-triangle mr-1' },
                                  null,
                                  -1
                                )),
                              oe(' ' + ke(l.value), 1)
                            ]))
                          : Bm('', !0)
                      ])
                    ],
                    32
                  )),
              g[84] ||
                (g[84] = C(
                  'footer',
                  { class: 'text-center py-6' },
                  [
                    C(
                      'p',
                      { class: 'text-[10px] text-slate-400 font-bold uppercase tracking-widest' },
                      '© 2026 PP Mambaul Ulum • Ammu Online PSB'
                    )
                  ],
                  -1
                ))
            ])
          ])
        )
      )
    }
  },
  Dw = HT(kw, [['__scopeId', 'data-v-9acfef51']]),
  Nw = {
    __name: 'App',
    setup(e) {
      return (t, n) => (ge(), Uh(Dw))
    }
  }
Rg(Nw).mount('#app')
