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
 * @vue/shared v3.5.35
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Na(e) {
  const t = Object.create(null)
  for (const n of e.split(',')) t[n] = 1
  return (n) => n in t
}
const At = {},
  gr = [],
  je = () => {},
  Eh = () => !1,
  zi = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Wi = (e) => e.startsWith('onUpdate:'),
  ae = Object.assign,
  Oa = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  jp = Object.prototype.hasOwnProperty,
  vt = (e, t) => jp.call(e, t),
  nt = Array.isArray,
  _r = (e) => Os(e) === '[object Map]',
  kr = (e) => Os(e) === '[object Set]',
  Nu = (e) => Os(e) === '[object Date]',
  at = (e) => typeof e == 'function',
  Nt = (e) => typeof e == 'string',
  He = (e) => typeof e == 'symbol',
  bt = (e) => e !== null && typeof e == 'object',
  Th = (e) => (bt(e) || at(e)) && at(e.then) && at(e.catch),
  bh = Object.prototype.toString,
  Os = (e) => bh.call(e),
  $p = (e) => Os(e).slice(8, -1),
  wh = (e) => Os(e) === '[object Object]',
  Ma = (e) => Nt(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  as = Na(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Gi = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  qp = /-\w/g,
  ke = Gi((e) => e.replace(qp, (t) => t.slice(1).toUpperCase())),
  Kp = /\B([A-Z])/g,
  tr = Gi((e) => e.replace(Kp, '-$1').toLowerCase()),
  Ah = Gi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Vo = Gi((e) => (e ? `on${Ah(e)}` : '')),
  Be = (e, t) => !Object.is(e, t),
  yi = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  Ih = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n })
  },
  Qi = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Ou
const Yi = () =>
  Ou ||
  (Ou =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function La(e) {
  if (nt(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = Nt(r) ? Gp(r) : La(r)
      if (s) for (const i in s) t[i] = s[i]
    }
    return t
  } else if (Nt(e) || bt(e)) return e
}
const Hp = /;(?![^(]*\))/g,
  zp = /:([^]+)/,
  Wp = /\/\*[^]*?\*\//g
function Gp(e) {
  const t = {}
  return (
    e
      .replace(Wp, '')
      .split(Hp)
      .forEach((n) => {
        if (n) {
          const r = n.split(zp)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function ys(e) {
  let t = ''
  if (Nt(e)) t = e
  else if (nt(e))
    for (let n = 0; n < e.length; n++) {
      const r = ys(e[n])
      r && (t += r + ' ')
    }
  else if (bt(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const Qp = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Yp = Na(Qp)
function Rh(e) {
  return !!e || e === ''
}
function Xp(e, t) {
  if (e.length !== t.length) return !1
  let n = !0
  for (let r = 0; n && r < e.length; r++) n = xn(e[r], t[r])
  return n
}
function xn(e, t) {
  if (e === t) return !0
  let n = Nu(e),
    r = Nu(t)
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1
  if (((n = He(e)), (r = He(t)), n || r)) return e === t
  if (((n = nt(e)), (r = nt(t)), n || r)) return n && r ? Xp(e, t) : !1
  if (((n = bt(e)), (r = bt(t)), n || r)) {
    if (!n || !r) return !1
    const s = Object.keys(e).length,
      i = Object.keys(t).length
    if (s !== i) return !1
    for (const a in e) {
      const l = e.hasOwnProperty(a),
        u = t.hasOwnProperty(a)
      if ((l && !u) || (!l && u) || !xn(e[a], t[a])) return !1
    }
  }
  return String(e) === String(t)
}
function Fa(e, t) {
  return e.findIndex((n) => xn(n, t))
}
const xh = (e) => !!(e && e.__v_isRef === !0),
  fe = (e) =>
    Nt(e)
      ? e
      : e == null
        ? ''
        : nt(e) || (bt(e) && (e.toString === bh || !at(e.toString)))
          ? xh(e)
            ? fe(e.value)
            : JSON.stringify(e, Ph, 2)
          : String(e),
  Ph = (e, t) =>
    xh(t)
      ? Ph(e, t.value)
      : _r(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], i) => ((n[Do(r, i) + ' =>'] = s), n),
              {}
            )
          }
        : kr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Do(n)) }
          : He(t)
            ? Do(t)
            : bt(t) && !nt(t) && !wh(t)
              ? String(t)
              : t,
  Do = (e, t = '') => {
    var n
    return He(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
/**
 * @vue/reactivity v3.5.35
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Gt
class Jp {
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
        Gt &&
        (Gt.active
          ? ((this.parent = Gt), (this.index = (Gt.scopes || (Gt.scopes = [])).push(this) - 1))
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
      const n = Gt
      try {
        return ((Gt = this), t())
      } finally {
        Gt = n
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = Gt), (Gt = this))
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Gt === this) Gt = this.prevScope
      else {
        let t = Gt
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
function Zp() {
  return Gt
}
let It
const No = new WeakSet()
class Sh {
  constructor(t) {
    ;((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Gt && (Gt.active ? Gt.effects.push(this) : (this.flags &= -2)))
  }
  pause() {
    this.flags |= 64
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), No.has(this) && (No.delete(this), this.trigger()))
  }
  notify() {
    ;(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || kh(this)
  }
  run() {
    if (!(this.flags & 1)) return this.fn()
    ;((this.flags |= 2), Mu(this), Vh(this))
    const t = It,
      n = Ve
    ;((It = this), (Ve = !0))
    try {
      return this.fn()
    } finally {
      ;(Dh(this), (It = t), (Ve = n), (this.flags &= -3))
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) ja(t)
      ;((this.deps = this.depsTail = void 0),
        Mu(this),
        this.onStop && this.onStop(),
        (this.flags &= -2))
    }
  }
  trigger() {
    this.flags & 64 ? No.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
  }
  runIfDirty() {
    ta(this) && this.run()
  }
  get dirty() {
    return ta(this)
  }
}
let Ch = 0,
  ls,
  us
function kh(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ;((e.next = us), (us = e))
    return
  }
  ;((e.next = ls), (ls = e))
}
function Ua() {
  Ch++
}
function Ba() {
  if (--Ch > 0) return
  if (us) {
    let t = us
    for (us = void 0; t; ) {
      const n = t.next
      ;((t.next = void 0), (t.flags &= -9), (t = n))
    }
  }
  let e
  for (; ls; ) {
    let t = ls
    for (ls = void 0; t; ) {
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
function Vh(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t))
}
function Dh(e) {
  let t,
    n = e.depsTail,
    r = n
  for (; r; ) {
    const s = r.prevDep
    ;(r.version === -1 ? (r === n && (n = s), ja(r), tm(r)) : (t = r),
      (r.dep.activeLink = r.prevActiveLink),
      (r.prevActiveLink = void 0),
      (r = s))
  }
  ;((e.deps = t), (e.depsTail = n))
}
function ta(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Nh(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0
  return !!e._dirty
}
function Nh(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === vs) ||
    ((e.globalVersion = vs), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !ta(e)))
  )
    return
  e.flags |= 2
  const t = e.dep,
    n = It,
    r = Ve
  ;((It = e), (Ve = !0))
  try {
    Vh(e)
    const s = e.fn(e._value)
    ;(t.version === 0 || Be(s, e._value)) && ((e.flags |= 128), (e._value = s), t.version++)
  } catch (s) {
    throw (t.version++, s)
  } finally {
    ;((It = n), (Ve = r), Dh(e), (e.flags &= -3))
  }
}
function ja(e, t = !1) {
  const { dep: n, prevSub: r, nextSub: s } = e
  if (
    (r && ((r.nextSub = s), (e.prevSub = void 0)),
    s && ((s.prevSub = r), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = r), !r && n.computed))
  ) {
    n.computed.flags &= -5
    for (let i = n.computed.deps; i; i = i.nextDep) ja(i, !0)
  }
  !t && !--n.sc && n.map && n.map.delete(n.key)
}
function tm(e) {
  const { prevDep: t, nextDep: n } = e
  ;(t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)))
}
let Ve = !0
const Oh = []
function un() {
  ;(Oh.push(Ve), (Ve = !1))
}
function cn() {
  const e = Oh.pop()
  Ve = e === void 0 ? !0 : e
}
function Mu(e) {
  const { cleanup: t } = e
  if (((e.cleanup = void 0), t)) {
    const n = It
    It = void 0
    try {
      t()
    } finally {
      It = n
    }
  }
}
let vs = 0
class em {
  constructor(t, n) {
    ;((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0))
  }
}
class $a {
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
    if (!It || !Ve || It === this.computed) return
    let n = this.activeLink
    if (n === void 0 || n.sub !== It)
      ((n = this.activeLink = new em(It, this)),
        It.deps
          ? ((n.prevDep = It.depsTail), (It.depsTail.nextDep = n), (It.depsTail = n))
          : (It.deps = It.depsTail = n),
        Mh(n))
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const r = n.nextDep
      ;((r.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = r),
        (n.prevDep = It.depsTail),
        (n.nextDep = void 0),
        (It.depsTail.nextDep = n),
        (It.depsTail = n),
        It.deps === n && (It.deps = r))
    }
    return n
  }
  trigger(t) {
    ;(this.version++, vs++, this.notify(t))
  }
  notify(t) {
    Ua()
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
    } finally {
      Ba()
    }
  }
}
function Mh(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed
    if (t && !e.dep.subs) {
      t.flags |= 20
      for (let r = t.deps; r; r = r.nextDep) Mh(r)
    }
    const n = e.dep.subs
    ;(n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e))
  }
}
const ea = new WeakMap(),
  zn = Symbol(''),
  na = Symbol(''),
  Es = Symbol('')
function se(e, t, n) {
  if (Ve && It) {
    let r = ea.get(e)
    r || ea.set(e, (r = new Map()))
    let s = r.get(n)
    ;(s || (r.set(n, (s = new $a())), (s.map = r), (s.key = n)), s.track())
  }
}
function rn(e, t, n, r, s, i) {
  const a = ea.get(e)
  if (!a) {
    vs++
    return
  }
  const l = (u) => {
    u && u.trigger()
  }
  if ((Ua(), t === 'clear')) a.forEach(l)
  else {
    const u = nt(e),
      f = u && Ma(n)
    if (u && n === 'length') {
      const p = Number(r)
      a.forEach((_, w) => {
        ;(w === 'length' || w === Es || (!He(w) && w >= p)) && l(_)
      })
    } else
      switch (((n !== void 0 || a.has(void 0)) && l(a.get(n)), f && l(a.get(Es)), t)) {
        case 'add':
          u ? f && l(a.get('length')) : (l(a.get(zn)), _r(e) && l(a.get(na)))
          break
        case 'delete':
          u || (l(a.get(zn)), _r(e) && l(a.get(na)))
          break
        case 'set':
          _r(e) && l(a.get(zn))
          break
      }
  }
  Ba()
}
function ur(e) {
  const t = yt(e)
  return t === e ? t : (se(t, 'iterate', Es), Ae(e) ? t : t.map(De))
}
function Xi(e) {
  return (se((e = yt(e)), 'iterate', Es), e)
}
function Fe(e, t) {
  return hn(e) ? Tr(Wn(e) ? De(t) : t) : De(t)
}
const nm = {
  __proto__: null,
  [Symbol.iterator]() {
    return Oo(this, Symbol.iterator, (e) => Fe(this, e))
  },
  concat(...e) {
    return ur(this).concat(...e.map((t) => (nt(t) ? ur(t) : t)))
  },
  entries() {
    return Oo(this, 'entries', (e) => ((e[1] = Fe(this, e[1])), e))
  },
  every(e, t) {
    return tn(this, 'every', e, t, void 0, arguments)
  },
  filter(e, t) {
    return tn(this, 'filter', e, t, (n) => n.map((r) => Fe(this, r)), arguments)
  },
  find(e, t) {
    return tn(this, 'find', e, t, (n) => Fe(this, n), arguments)
  },
  findIndex(e, t) {
    return tn(this, 'findIndex', e, t, void 0, arguments)
  },
  findLast(e, t) {
    return tn(this, 'findLast', e, t, (n) => Fe(this, n), arguments)
  },
  findLastIndex(e, t) {
    return tn(this, 'findLastIndex', e, t, void 0, arguments)
  },
  forEach(e, t) {
    return tn(this, 'forEach', e, t, void 0, arguments)
  },
  includes(...e) {
    return Mo(this, 'includes', e)
  },
  indexOf(...e) {
    return Mo(this, 'indexOf', e)
  },
  join(e) {
    return ur(this).join(e)
  },
  lastIndexOf(...e) {
    return Mo(this, 'lastIndexOf', e)
  },
  map(e, t) {
    return tn(this, 'map', e, t, void 0, arguments)
  },
  pop() {
    return Xr(this, 'pop')
  },
  push(...e) {
    return Xr(this, 'push', e)
  },
  reduce(e, ...t) {
    return Lu(this, 'reduce', e, t)
  },
  reduceRight(e, ...t) {
    return Lu(this, 'reduceRight', e, t)
  },
  shift() {
    return Xr(this, 'shift')
  },
  some(e, t) {
    return tn(this, 'some', e, t, void 0, arguments)
  },
  splice(...e) {
    return Xr(this, 'splice', e)
  },
  toReversed() {
    return ur(this).toReversed()
  },
  toSorted(e) {
    return ur(this).toSorted(e)
  },
  toSpliced(...e) {
    return ur(this).toSpliced(...e)
  },
  unshift(...e) {
    return Xr(this, 'unshift', e)
  },
  values() {
    return Oo(this, 'values', (e) => Fe(this, e))
  }
}
function Oo(e, t, n) {
  const r = Xi(e),
    s = r[t]()
  return (
    r !== e &&
      !Ae(e) &&
      ((s._next = s.next),
      (s.next = () => {
        const i = s._next()
        return (i.done || (i.value = n(i.value)), i)
      })),
    s
  )
}
const rm = Array.prototype
function tn(e, t, n, r, s, i) {
  const a = Xi(e),
    l = a !== e && !Ae(e),
    u = a[t]
  if (u !== rm[t]) {
    const _ = u.apply(e, i)
    return l ? De(_) : _
  }
  let f = n
  a !== e &&
    (l
      ? (f = function (_, w) {
          return n.call(this, Fe(e, _), w, e)
        })
      : n.length > 2 &&
        (f = function (_, w) {
          return n.call(this, _, w, e)
        }))
  const p = u.call(a, f, r)
  return l && s ? s(p) : p
}
function Lu(e, t, n, r) {
  const s = Xi(e),
    i = s !== e && !Ae(e)
  let a = n,
    l = !1
  s !== e &&
    (i
      ? ((l = r.length === 0),
        (a = function (f, p, _) {
          return (l && ((l = !1), (f = Fe(e, f))), n.call(this, f, Fe(e, p), _, e))
        }))
      : n.length > 3 &&
        (a = function (f, p, _) {
          return n.call(this, f, p, _, e)
        }))
  const u = s[t](a, ...r)
  return l ? Fe(e, u) : u
}
function Mo(e, t, n) {
  const r = yt(e)
  se(r, 'iterate', Es)
  const s = r[t](...n)
  return (s === -1 || s === !1) && za(n[0]) ? ((n[0] = yt(n[0])), r[t](...n)) : s
}
function Xr(e, t, n = []) {
  ;(un(), Ua())
  const r = yt(e)[t].apply(e, n)
  return (Ba(), cn(), r)
}
const sm = Na('__proto__,__v_isRef,__isVue'),
  Lh = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(He)
  )
function im(e) {
  He(e) || (e = String(e))
  const t = yt(this)
  return (se(t, 'has', e), t.hasOwnProperty(e))
}
class Fh {
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
      return r === (s ? (i ? mm : $h) : i ? jh : Bh).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const a = nt(t)
    if (!s) {
      let u
      if (a && (u = nm[n])) return u
      if (n === 'hasOwnProperty') return im
    }
    const l = Reflect.get(t, n, oe(t) ? t : r)
    if ((He(n) ? Lh.has(n) : sm(n)) || (s || se(t, 'get', n), i)) return l
    if (oe(l)) {
      const u = a && Ma(n) ? l : l.value
      return s && bt(u) ? sa(u) : u
    }
    return bt(l) ? (s ? sa(l) : Ka(l)) : l
  }
}
class Uh extends Fh {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, s) {
    let i = t[n]
    const a = nt(t) && Ma(n)
    if (!this._isShallow) {
      const f = hn(i)
      if ((!Ae(r) && !hn(r) && ((i = yt(i)), (r = yt(r))), !a && oe(i) && !oe(r)))
        return (f || (i.value = r), !0)
    }
    const l = a ? Number(n) < t.length : vt(t, n),
      u = Reflect.set(t, n, r, oe(t) ? t : s)
    return (t === yt(s) && (l ? Be(r, i) && rn(t, 'set', n, r) : rn(t, 'add', n, r)), u)
  }
  deleteProperty(t, n) {
    const r = vt(t, n)
    t[n]
    const s = Reflect.deleteProperty(t, n)
    return (s && r && rn(t, 'delete', n, void 0), s)
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return ((!He(n) || !Lh.has(n)) && se(t, 'has', n), r)
  }
  ownKeys(t) {
    return (se(t, 'iterate', nt(t) ? 'length' : zn), Reflect.ownKeys(t))
  }
}
class om extends Fh {
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
const am = new Uh(),
  lm = new om(),
  um = new Uh(!0)
const ra = (e) => e,
  ai = (e) => Reflect.getPrototypeOf(e)
function cm(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = yt(s),
      a = _r(i),
      l = e === 'entries' || (e === Symbol.iterator && a),
      u = e === 'keys' && a,
      f = s[e](...r),
      p = n ? ra : t ? Tr : De
    return (
      !t && se(i, 'iterate', u ? na : zn),
      ae(Object.create(f), {
        next() {
          const { value: _, done: w } = f.next()
          return w ? { value: _, done: w } : { value: l ? [p(_[0]), p(_[1])] : p(_), done: w }
        }
      })
    )
  }
}
function li(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function hm(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw,
        a = yt(i),
        l = yt(s)
      e || (Be(s, l) && se(a, 'get', s), se(a, 'get', l))
      const { has: u } = ai(a),
        f = t ? ra : e ? Tr : De
      if (u.call(a, s)) return f(i.get(s))
      if (u.call(a, l)) return f(i.get(l))
      i !== a && i.get(s)
    },
    get size() {
      const s = this.__v_raw
      return (!e && se(yt(s), 'iterate', zn), s.size)
    },
    has(s) {
      const i = this.__v_raw,
        a = yt(i),
        l = yt(s)
      return (
        e || (Be(s, l) && se(a, 'has', s), se(a, 'has', l)),
        s === l ? i.has(s) : i.has(s) || i.has(l)
      )
    },
    forEach(s, i) {
      const a = this,
        l = a.__v_raw,
        u = yt(l),
        f = t ? ra : e ? Tr : De
      return (!e && se(u, 'iterate', zn), l.forEach((p, _) => s.call(i, f(p), f(_), a)))
    }
  }
  return (
    ae(
      n,
      e
        ? { add: li('add'), set: li('set'), delete: li('delete'), clear: li('clear') }
        : {
            add(s) {
              const i = yt(this),
                a = ai(i),
                l = yt(s),
                u = !t && !Ae(s) && !hn(s) ? l : s
              return (
                a.has.call(i, u) ||
                  (Be(s, u) && a.has.call(i, s)) ||
                  (Be(l, u) && a.has.call(i, l)) ||
                  (i.add(u), rn(i, 'add', u, u)),
                this
              )
            },
            set(s, i) {
              !t && !Ae(i) && !hn(i) && (i = yt(i))
              const a = yt(this),
                { has: l, get: u } = ai(a)
              let f = l.call(a, s)
              f || ((s = yt(s)), (f = l.call(a, s)))
              const p = u.call(a, s)
              return (a.set(s, i), f ? Be(i, p) && rn(a, 'set', s, i) : rn(a, 'add', s, i), this)
            },
            delete(s) {
              const i = yt(this),
                { has: a, get: l } = ai(i)
              let u = a.call(i, s)
              ;(u || ((s = yt(s)), (u = a.call(i, s))), l && l.call(i, s))
              const f = i.delete(s)
              return (u && rn(i, 'delete', s, void 0), f)
            },
            clear() {
              const s = yt(this),
                i = s.size !== 0,
                a = s.clear()
              return (i && rn(s, 'clear', void 0, void 0), a)
            }
          }
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      n[s] = cm(s, e, t)
    }),
    n
  )
}
function qa(e, t) {
  const n = hm(e, t)
  return (r, s, i) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
        ? e
        : s === '__v_raw'
          ? r
          : Reflect.get(vt(n, s) && s in r ? n : r, s, i)
}
const fm = { get: qa(!1, !1) },
  dm = { get: qa(!1, !0) },
  pm = { get: qa(!0, !1) }
const Bh = new WeakMap(),
  jh = new WeakMap(),
  $h = new WeakMap(),
  mm = new WeakMap()
function gm(e) {
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
function Ka(e) {
  return hn(e) ? e : Ha(e, !1, am, fm, Bh)
}
function _m(e) {
  return Ha(e, !1, um, dm, jh)
}
function sa(e) {
  return Ha(e, !0, lm, pm, $h)
}
function Ha(e, t, n, r, s) {
  if (!bt(e) || (e.__v_raw && !(t && e.__v_isReactive)) || e.__v_skip || !Object.isExtensible(e))
    return e
  const i = s.get(e)
  if (i) return i
  const a = gm($p(e))
  if (a === 0) return e
  const l = new Proxy(e, a === 2 ? r : n)
  return (s.set(e, l), l)
}
function Wn(e) {
  return hn(e) ? Wn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function hn(e) {
  return !!(e && e.__v_isReadonly)
}
function Ae(e) {
  return !!(e && e.__v_isShallow)
}
function za(e) {
  return e ? !!e.__v_raw : !1
}
function yt(e) {
  const t = e && e.__v_raw
  return t ? yt(t) : e
}
function ym(e) {
  return (!vt(e, '__v_skip') && Object.isExtensible(e) && Ih(e, '__v_skip', !0), e)
}
const De = (e) => (bt(e) ? Ka(e) : e),
  Tr = (e) => (bt(e) ? sa(e) : e)
function oe(e) {
  return e ? e.__v_isRef === !0 : !1
}
function Te(e) {
  return vm(e, !1)
}
function vm(e, t) {
  return oe(e) ? e : new Em(e, t)
}
class Em {
  constructor(t, n) {
    ;((this.dep = new $a()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : yt(t)),
      (this._value = n ? t : De(t)),
      (this.__v_isShallow = n))
  }
  get value() {
    return (this.dep.track(), this._value)
  }
  set value(t) {
    const n = this._rawValue,
      r = this.__v_isShallow || Ae(t) || hn(t)
    ;((t = r ? t : yt(t)),
      Be(t, n) && ((this._rawValue = t), (this._value = r ? t : De(t)), this.dep.trigger()))
  }
}
function Tm(e) {
  return oe(e) ? e.value : e
}
const bm = {
  get: (e, t, n) => (t === '__v_raw' ? e : Tm(Reflect.get(e, t, n))),
  set: (e, t, n, r) => {
    const s = e[t]
    return oe(s) && !oe(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function qh(e) {
  return Wn(e) ? e : new Proxy(e, bm)
}
class wm {
  constructor(t, n, r) {
    ;((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new $a(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = vs - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = r))
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && It !== this)) return (kh(this, !0), !0)
  }
  get value() {
    const t = this.dep.track()
    return (Nh(this), t && (t.version = this.dep.version), this._value)
  }
  set value(t) {
    this.setter && this.setter(t)
  }
}
function Am(e, t, n = !1) {
  let r, s
  return (at(e) ? (r = e) : ((r = e.get), (s = e.set)), new wm(r, s, n))
}
const ui = {},
  xi = new WeakMap()
let qn
function Im(e, t = !1, n = qn) {
  if (n) {
    let r = xi.get(n)
    ;(r || xi.set(n, (r = [])), r.push(e))
  }
}
function Rm(e, t, n = At) {
  const { immediate: r, deep: s, once: i, scheduler: a, augmentJob: l, call: u } = n,
    f = (q) => (s ? q : Ae(q) || s === !1 || s === 0 ? sn(q, 1) : sn(q))
  let p,
    _,
    w,
    P,
    O = !1,
    k = !1
  if (
    (oe(e)
      ? ((_ = () => e.value), (O = Ae(e)))
      : Wn(e)
        ? ((_ = () => f(e)), (O = !0))
        : nt(e)
          ? ((k = !0),
            (O = e.some((q) => Wn(q) || Ae(q))),
            (_ = () =>
              e.map((q) => {
                if (oe(q)) return q.value
                if (Wn(q)) return f(q)
                if (at(q)) return u ? u(q, 2) : q()
              })))
          : at(e)
            ? t
              ? (_ = u ? () => u(e, 2) : e)
              : (_ = () => {
                  if (w) {
                    un()
                    try {
                      w()
                    } finally {
                      cn()
                    }
                  }
                  const q = qn
                  qn = p
                  try {
                    return u ? u(e, 3, [P]) : e(P)
                  } finally {
                    qn = q
                  }
                })
            : (_ = je),
    t && s)
  ) {
    const q = _,
      lt = s === !0 ? 1 / 0 : s
    _ = () => sn(q(), lt)
  }
  const D = Zp(),
    Q = () => {
      ;(p.stop(), D && D.active && Oa(D.effects, p))
    }
  if (i && t) {
    const q = t
    t = (...lt) => {
      ;(q(...lt), Q())
    }
  }
  let W = k ? new Array(e.length).fill(ui) : ui
  const H = (q) => {
    if (!(!(p.flags & 1) || (!p.dirty && !q)))
      if (t) {
        const lt = p.run()
        if (s || O || (k ? lt.some((dt, A) => Be(dt, W[A])) : Be(lt, W))) {
          w && w()
          const dt = qn
          qn = p
          try {
            const A = [lt, W === ui ? void 0 : k && W[0] === ui ? [] : W, P]
            ;((W = lt), u ? u(t, 3, A) : t(...A))
          } finally {
            qn = dt
          }
        }
      } else p.run()
  }
  return (
    l && l(H),
    (p = new Sh(_)),
    (p.scheduler = a ? () => a(H, !1) : H),
    (P = (q) => Im(q, !1, p)),
    (w = p.onStop =
      () => {
        const q = xi.get(p)
        if (q) {
          if (u) u(q, 4)
          else for (const lt of q) lt()
          xi.delete(p)
        }
      }),
    t ? (r ? H(!0) : (W = p.run())) : a ? a(H.bind(null, !0), !0) : p.run(),
    (Q.pause = p.pause.bind(p)),
    (Q.resume = p.resume.bind(p)),
    (Q.stop = Q),
    Q
  )
}
function sn(e, t = 1 / 0, n) {
  if (t <= 0 || !bt(e) || e.__v_skip || ((n = n || new Map()), (n.get(e) || 0) >= t)) return e
  if ((n.set(e, t), t--, oe(e))) sn(e.value, t, n)
  else if (nt(e)) for (let r = 0; r < e.length; r++) sn(e[r], t, n)
  else if (kr(e) || _r(e))
    e.forEach((r) => {
      sn(r, t, n)
    })
  else if (wh(e)) {
    for (const r in e) sn(e[r], t, n)
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && sn(e[r], t, n)
  }
  return e
}
/**
 * @vue/runtime-core v3.5.35
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Ms(e, t, n, r) {
  try {
    return r ? e(...r) : e()
  } catch (s) {
    Ji(s, t, n)
  }
}
function Ne(e, t, n, r) {
  if (at(e)) {
    const s = Ms(e, t, n, r)
    return (
      s &&
        Th(s) &&
        s.catch((i) => {
          Ji(i, t, n)
        }),
      s
    )
  }
  if (nt(e)) {
    const s = []
    for (let i = 0; i < e.length; i++) s.push(Ne(e[i], t, n, r))
    return s
  }
}
function Ji(e, t, n, r = !0) {
  const s = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: a } = (t && t.appContext.config) || At
  if (t) {
    let l = t.parent
    const u = t.proxy,
      f = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; l; ) {
      const p = l.ec
      if (p) {
        for (let _ = 0; _ < p.length; _++) if (p[_](e, u, f) === !1) return
      }
      l = l.parent
    }
    if (i) {
      ;(un(), Ms(i, null, 10, [e, u, f]), cn())
      return
    }
  }
  xm(e, n, s, r, a)
}
function xm(e, t, n, r = !0, s = !1) {
  if (s) throw e
  console.error(e)
}
const ce = []
let Le = -1
const yr = []
let Tn = null,
  hr = 0
const Kh = Promise.resolve()
let Pi = null
function Hh(e) {
  const t = Pi || Kh
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Pm(e) {
  let t = Le + 1,
    n = ce.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = ce[r],
      i = Ts(s)
    i < e || (i === e && s.flags & 2) ? (t = r + 1) : (n = r)
  }
  return t
}
function Wa(e) {
  if (!(e.flags & 1)) {
    const t = Ts(e),
      n = ce[ce.length - 1]
    ;(!n || (!(e.flags & 2) && t >= Ts(n)) ? ce.push(e) : ce.splice(Pm(t), 0, e),
      (e.flags |= 1),
      zh())
  }
}
function zh() {
  Pi || (Pi = Kh.then(Gh))
}
function Sm(e) {
  ;(nt(e)
    ? yr.push(...e)
    : Tn && e.id === -1
      ? Tn.splice(hr + 1, 0, e)
      : e.flags & 1 || (yr.push(e), (e.flags |= 1)),
    zh())
}
function Fu(e, t, n = Le + 1) {
  for (; n < ce.length; n++) {
    const r = ce[n]
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue
      ;(ce.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2))
    }
  }
}
function Wh(e) {
  if (yr.length) {
    const t = [...new Set(yr)].sort((n, r) => Ts(n) - Ts(r))
    if (((yr.length = 0), Tn)) {
      Tn.push(...t)
      return
    }
    for (Tn = t, hr = 0; hr < Tn.length; hr++) {
      const n = Tn[hr]
      ;(n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2))
    }
    ;((Tn = null), (hr = 0))
  }
}
const Ts = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id)
function Gh(e) {
  try {
    for (Le = 0; Le < ce.length; Le++) {
      const t = ce[Le]
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2), Ms(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
    }
  } finally {
    for (; Le < ce.length; Le++) {
      const t = ce[Le]
      t && (t.flags &= -2)
    }
    ;((Le = -1), (ce.length = 0), Wh(), (Pi = null), (ce.length || yr.length) && Gh())
  }
}
let we = null,
  Qh = null
function Si(e) {
  const t = we
  return ((we = e), (Qh = (e && e.type.__scopeId) || null), t)
}
function Cm(e, t = we, n) {
  if (!t || e._n) return e
  const r = (...s) => {
    r._d && Qu(-1)
    const i = Si(t)
    let a
    try {
      a = e(...s)
    } finally {
      ;(Si(i), r._d && Qu(1))
    }
    return a
  }
  return ((r._n = !0), (r._c = !0), (r._d = !0), r)
}
function gt(e, t) {
  if (we === null) return e
  const n = no(we),
    r = e.dirs || (e.dirs = [])
  for (let s = 0; s < t.length; s++) {
    let [i, a, l, u = At] = t[s]
    i &&
      (at(i) && (i = { mounted: i, updated: i }),
      i.deep && sn(a),
      r.push({ dir: i, instance: n, value: a, oldValue: void 0, arg: l, modifiers: u }))
  }
  return e
}
function jn(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs
  for (let a = 0; a < s.length; a++) {
    const l = s[a]
    i && (l.oldValue = i[a].value)
    let u = l.dir[r]
    u && (un(), Ne(u, n, 8, [e.el, l, e, t]), cn())
  }
}
function km(e, t) {
  if (he) {
    let n = he.provides
    const r = he.parent && he.parent.provides
    ;(r === n && (n = he.provides = Object.create(r)), (n[e] = t))
  }
}
function vi(e, t, n = !1) {
  const r = Sg()
  if (r || vr) {
    let s = vr
      ? vr._context.provides
      : r
        ? r.parent == null || r.ce
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0
    if (s && e in s) return s[e]
    if (arguments.length > 1) return n && at(t) ? t.call(r && r.proxy) : t
  }
}
const Vm = Symbol.for('v-scx'),
  Dm = () => vi(Vm)
function Lo(e, t, n) {
  return Yh(e, t, n)
}
function Yh(e, t, n = At) {
  const { immediate: r, deep: s, flush: i, once: a } = n,
    l = ae({}, n),
    u = (t && r) || (!t && i !== 'post')
  let f
  if (ws) {
    if (i === 'sync') {
      const P = Dm()
      f = P.__watcherHandles || (P.__watcherHandles = [])
    } else if (!u) {
      const P = () => {}
      return ((P.stop = je), (P.resume = je), (P.pause = je), P)
    }
  }
  const p = he
  l.call = (P, O, k) => Ne(P, p, O, k)
  let _ = !1
  ;(i === 'post'
    ? (l.scheduler = (P) => {
        de(P, p && p.suspense)
      })
    : i !== 'sync' &&
      ((_ = !0),
      (l.scheduler = (P, O) => {
        O ? P() : Wa(P)
      })),
    (l.augmentJob = (P) => {
      ;(t && (P.flags |= 4), _ && ((P.flags |= 2), p && ((P.id = p.uid), (P.i = p))))
    }))
  const w = Rm(e, t, l)
  return (ws && (f ? f.push(w) : u && w()), w)
}
function Nm(e, t, n) {
  const r = this.proxy,
    s = Nt(e) ? (e.includes('.') ? Xh(r, e) : () => r[e]) : e.bind(r, r)
  let i
  at(t) ? (i = t) : ((i = t.handler), (n = t))
  const a = Ls(this),
    l = Yh(s, i.bind(r), n)
  return (a(), l)
}
function Xh(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let s = 0; s < n.length && r; s++) r = r[n[s]]
    return r
  }
}
const Om = Symbol('_vte'),
  Mm = (e) => e.__isTeleport,
  Fo = Symbol('_leaveCb')
function Ga(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Ga(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
function Jh(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0]
}
function Uu(e, t) {
  let n
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable)
}
const Ci = new WeakMap()
function cs(e, t, n, r, s = !1) {
  if (nt(e)) {
    e.forEach((k, D) => cs(k, t && (nt(t) ? t[D] : t), n, r, s))
    return
  }
  if (hs(r) && !s) {
    r.shapeFlag & 512 &&
      r.type.__asyncResolved &&
      r.component.subTree.component &&
      cs(e, t, n, r.component.subTree)
    return
  }
  const i = r.shapeFlag & 4 ? no(r.component) : r.el,
    a = s ? null : i,
    { i: l, r: u } = e,
    f = t && t.r,
    p = l.refs === At ? (l.refs = {}) : l.refs,
    _ = l.setupState,
    w = yt(_),
    P = _ === At ? Eh : (k) => (Uu(p, k) ? !1 : vt(w, k)),
    O = (k, D) => !(D && Uu(p, D))
  if (f != null && f !== u) {
    if ((Bu(t), Nt(f))) ((p[f] = null), P(f) && (_[f] = null))
    else if (oe(f)) {
      const k = t
      ;(O(f, k.k) && (f.value = null), k.k && (p[k.k] = null))
    }
  }
  if (at(u)) Ms(u, l, 12, [a, p])
  else {
    const k = Nt(u),
      D = oe(u)
    if (k || D) {
      const Q = () => {
        if (e.f) {
          const W = k ? (P(u) ? _[u] : p[u]) : O() || !e.k ? u.value : p[e.k]
          if (s) nt(W) && Oa(W, i)
          else if (nt(W)) W.includes(i) || W.push(i)
          else if (k) ((p[u] = [i]), P(u) && (_[u] = p[u]))
          else {
            const H = [i]
            ;(O(u, e.k) && (u.value = H), e.k && (p[e.k] = H))
          }
        } else
          k
            ? ((p[u] = a), P(u) && (_[u] = a))
            : D && (O(u, e.k) && (u.value = a), e.k && (p[e.k] = a))
      }
      if (a) {
        const W = () => {
          ;(Q(), Ci.delete(e))
        }
        ;((W.id = -1), Ci.set(e, W), de(W, n))
      } else (Bu(e), Q())
    }
  }
}
function Bu(e) {
  const t = Ci.get(e)
  t && ((t.flags |= 8), Ci.delete(e))
}
Yi().requestIdleCallback
Yi().cancelIdleCallback
const hs = (e) => !!e.type.__asyncLoader,
  Zh = (e) => e.type.__isKeepAlive
function Lm(e, t) {
  tf(e, 'a', t)
}
function Fm(e, t) {
  tf(e, 'da', t)
}
function tf(e, t, n = he) {
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
  if ((Zi(t, r, n), n)) {
    let s = n.parent
    for (; s && s.parent; ) (Zh(s.parent.vnode) && Um(r, t, n, s), (s = s.parent))
  }
}
function Um(e, t, n, r) {
  const s = Zi(t, e, r, !0)
  nf(() => {
    Oa(r[t], s)
  }, n)
}
function Zi(e, t, n = he, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...a) => {
          un()
          const l = Ls(n),
            u = Ne(t, n, e, a)
          return (l(), cn(), u)
        })
    return (r ? s.unshift(i) : s.push(i), i)
  }
}
const mn =
    (e) =>
    (t, n = he) => {
      ;(!ws || e === 'sp') && Zi(e, (...r) => t(...r), n)
    },
  Bm = mn('bm'),
  ef = mn('m'),
  jm = mn('bu'),
  $m = mn('u'),
  qm = mn('bum'),
  nf = mn('um'),
  Km = mn('sp'),
  Hm = mn('rtg'),
  zm = mn('rtc')
function Wm(e, t = he) {
  Zi('ec', e, t)
}
const Gm = Symbol.for('v-ndc')
function Jr(e, t, n, r) {
  let s
  const i = n,
    a = nt(e)
  if (a || Nt(e)) {
    const l = a && Wn(e)
    let u = !1,
      f = !1
    ;(l && ((u = !Ae(e)), (f = hn(e)), (e = Xi(e))), (s = new Array(e.length)))
    for (let p = 0, _ = e.length; p < _; p++)
      s[p] = t(u ? (f ? Tr(De(e[p])) : De(e[p])) : e[p], p, void 0, i)
  } else if (typeof e == 'number') {
    s = new Array(e)
    for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, i)
  } else if (bt(e))
    if (e[Symbol.iterator]) s = Array.from(e, (l, u) => t(l, u, void 0, i))
    else {
      const l = Object.keys(e)
      s = new Array(l.length)
      for (let u = 0, f = l.length; u < f; u++) {
        const p = l[u]
        s[u] = t(e[p], p, u, i)
      }
    }
  else s = []
  return s
}
const ia = (e) => (e ? (If(e) ? no(e) : ia(e.parent)) : null),
  fs = ae(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ia(e.parent),
    $root: (e) => ia(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => sf(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Wa(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = Hh.bind(e.proxy)),
    $watch: (e) => Nm.bind(e)
  }),
  Uo = (e, t) => e !== At && !e.__isScriptSetup && vt(e, t),
  Qm = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const { ctx: n, setupState: r, data: s, props: i, accessCache: a, type: l, appContext: u } = e
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
          if (Uo(r, t)) return ((a[t] = 1), r[t])
          if (s !== At && vt(s, t)) return ((a[t] = 2), s[t])
          if (vt(i, t)) return ((a[t] = 3), i[t])
          if (n !== At && vt(n, t)) return ((a[t] = 4), n[t])
          oa && (a[t] = 0)
        }
      }
      const f = fs[t]
      let p, _
      if (f) return (t === '$attrs' && se(e.attrs, 'get', ''), f(e))
      if ((p = l.__cssModules) && (p = p[t])) return p
      if (n !== At && vt(n, t)) return ((a[t] = 4), n[t])
      if (((_ = u.config.globalProperties), vt(_, t))) return _[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e
      return Uo(s, t)
        ? ((s[t] = n), !0)
        : r !== At && vt(r, t)
          ? ((r[t] = n), !0)
          : vt(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, props: i, type: a } },
      l
    ) {
      let u
      return !!(
        n[l] ||
        (e !== At && l[0] !== '$' && vt(e, l)) ||
        Uo(t, l) ||
        vt(i, l) ||
        vt(r, l) ||
        vt(fs, l) ||
        vt(s.config.globalProperties, l) ||
        ((u = a.__cssModules) && u[l])
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : vt(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
function ju(e) {
  return nt(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let oa = !0
function Ym(e) {
  const t = sf(e),
    n = e.proxy,
    r = e.ctx
  ;((oa = !1), t.beforeCreate && $u(t.beforeCreate, e, 'bc'))
  const {
    data: s,
    computed: i,
    methods: a,
    watch: l,
    provide: u,
    inject: f,
    created: p,
    beforeMount: _,
    mounted: w,
    beforeUpdate: P,
    updated: O,
    activated: k,
    deactivated: D,
    beforeDestroy: Q,
    beforeUnmount: W,
    destroyed: H,
    unmounted: q,
    render: lt,
    renderTracked: dt,
    renderTriggered: A,
    errorCaptured: y,
    serverPrefetch: v,
    expose: d,
    inheritAttrs: g,
    components: R,
    directives: T,
    filters: ge
  } = t
  if ((f && Xm(f, r, null), a))
    for (const Et in a) {
      const pt = a[Et]
      at(pt) && (r[Et] = pt.bind(n))
    }
  if (s) {
    const Et = s.call(n, n)
    bt(Et) && (e.data = Ka(Et))
  }
  if (((oa = !0), i))
    for (const Et in i) {
      const pt = i[Et],
        xe = at(pt) ? pt.bind(n, n) : at(pt.get) ? pt.get.bind(n, n) : je,
        Nn = !at(pt) && at(pt.set) ? pt.set.bind(n) : je,
        Ye = ca({ get: xe, set: Nn })
      Object.defineProperty(r, Et, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: (Ut) => (Ye.value = Ut)
      })
    }
  if (l) for (const Et in l) rf(l[Et], r, n, Et)
  if (u) {
    const Et = at(u) ? u.call(n) : u
    Reflect.ownKeys(Et).forEach((pt) => {
      km(pt, Et[pt])
    })
  }
  p && $u(p, e, 'c')
  function Ht(Et, pt) {
    nt(pt) ? pt.forEach((xe) => Et(xe.bind(n))) : pt && Et(pt.bind(n))
  }
  if (
    (Ht(Bm, _),
    Ht(ef, w),
    Ht(jm, P),
    Ht($m, O),
    Ht(Lm, k),
    Ht(Fm, D),
    Ht(Wm, y),
    Ht(zm, dt),
    Ht(Hm, A),
    Ht(qm, W),
    Ht(nf, q),
    Ht(Km, v),
    nt(d))
  )
    if (d.length) {
      const Et = e.exposed || (e.exposed = {})
      d.forEach((pt) => {
        Object.defineProperty(Et, pt, {
          get: () => n[pt],
          set: (xe) => (n[pt] = xe),
          enumerable: !0
        })
      })
    } else e.exposed || (e.exposed = {})
  ;(lt && e.render === je && (e.render = lt),
    g != null && (e.inheritAttrs = g),
    R && (e.components = R),
    T && (e.directives = T),
    v && Jh(e))
}
function Xm(e, t, n = je) {
  nt(e) && (e = aa(e))
  for (const r in e) {
    const s = e[r]
    let i
    ;(bt(s)
      ? 'default' in s
        ? (i = vi(s.from || r, s.default, !0))
        : (i = vi(s.from || r))
      : (i = vi(s)),
      oe(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (a) => (i.value = a)
          })
        : (t[r] = i))
  }
}
function $u(e, t, n) {
  Ne(nt(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function rf(e, t, n, r) {
  let s = r.includes('.') ? Xh(n, r) : () => n[r]
  if (Nt(e)) {
    const i = t[e]
    at(i) && Lo(s, i)
  } else if (at(e)) Lo(s, e.bind(n))
  else if (bt(e))
    if (nt(e)) e.forEach((i) => rf(i, t, n, r))
    else {
      const i = at(e.handler) ? e.handler.bind(n) : t[e.handler]
      at(i) && Lo(s, i, e)
    }
}
function sf(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: a }
    } = e.appContext,
    l = i.get(t)
  let u
  return (
    l
      ? (u = l)
      : !s.length && !n && !r
        ? (u = t)
        : ((u = {}), s.length && s.forEach((f) => ki(u, f, a, !0)), ki(u, t, a)),
    bt(t) && i.set(t, u),
    u
  )
}
function ki(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t
  ;(i && ki(e, i, n, !0), s && s.forEach((a) => ki(e, a, n, !0)))
  for (const a in t)
    if (!(r && a === 'expose')) {
      const l = Jm[a] || (n && n[a])
      e[a] = l ? l(e[a], t[a]) : t[a]
    }
  return e
}
const Jm = {
  data: qu,
  props: Ku,
  emits: Ku,
  methods: ns,
  computed: ns,
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  components: ns,
  directives: ns,
  watch: tg,
  provide: qu,
  inject: Zm
}
function qu(e, t) {
  return t
    ? e
      ? function () {
          return ae(at(e) ? e.call(this, this) : e, at(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function Zm(e, t) {
  return ns(aa(e), aa(t))
}
function aa(e) {
  if (nt(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function ns(e, t) {
  return e ? ae(Object.create(null), e, t) : t
}
function Ku(e, t) {
  return e
    ? nt(e) && nt(t)
      ? [...new Set([...e, ...t])]
      : ae(Object.create(null), ju(e), ju(t ?? {}))
    : t
}
function tg(e, t) {
  if (!e) return t
  if (!t) return e
  const n = ae(Object.create(null), e)
  for (const r in t) n[r] = ue(e[r], t[r])
  return n
}
function of() {
  return {
    app: null,
    config: {
      isNativeTag: Eh,
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
let eg = 0
function ng(e, t) {
  return function (r, s = null) {
    ;(at(r) || (r = ae({}, r)), s != null && !bt(s) && (s = null))
    const i = of(),
      a = new WeakSet(),
      l = []
    let u = !1
    const f = (i.app = {
      _uid: eg++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Og,
      get config() {
        return i.config
      },
      set config(p) {},
      use(p, ..._) {
        return (
          a.has(p) ||
            (p && at(p.install) ? (a.add(p), p.install(f, ..._)) : at(p) && (a.add(p), p(f, ..._))),
          f
        )
      },
      mixin(p) {
        return (i.mixins.includes(p) || i.mixins.push(p), f)
      },
      component(p, _) {
        return _ ? ((i.components[p] = _), f) : i.components[p]
      },
      directive(p, _) {
        return _ ? ((i.directives[p] = _), f) : i.directives[p]
      },
      mount(p, _, w) {
        if (!u) {
          const P = f._ceVNode || $e(r, s)
          return (
            (P.appContext = i),
            w === !0 ? (w = 'svg') : w === !1 && (w = void 0),
            e(P, p, w),
            (u = !0),
            (f._container = p),
            (p.__vue_app__ = f),
            no(P.component)
          )
        }
      },
      onUnmount(p) {
        l.push(p)
      },
      unmount() {
        u && (Ne(l, f._instance, 16), e(null, f._container), delete f._container.__vue_app__)
      },
      provide(p, _) {
        return ((i.provides[p] = _), f)
      },
      runWithContext(p) {
        const _ = vr
        vr = f
        try {
          return p()
        } finally {
          vr = _
        }
      }
    })
    return f
  }
}
let vr = null
const rg = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${ke(t)}Modifiers`] || e[`${tr(t)}Modifiers`]
function sg(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || At
  let s = n
  const i = t.startsWith('update:'),
    a = i && rg(r, t.slice(7))
  a && (a.trim && (s = n.map((p) => (Nt(p) ? p.trim() : p))), a.number && (s = n.map(Qi)))
  let l,
    u = r[(l = Vo(t))] || r[(l = Vo(ke(t)))]
  ;(!u && i && (u = r[(l = Vo(tr(t)))]), u && Ne(u, e, 6, s))
  const f = r[l + 'Once']
  if (f) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;((e.emitted[l] = !0), Ne(f, e, 6, s))
  }
}
const ig = new WeakMap()
function af(e, t, n = !1) {
  const r = n ? ig : t.emitsCache,
    s = r.get(e)
  if (s !== void 0) return s
  const i = e.emits
  let a = {},
    l = !1
  if (!at(e)) {
    const u = (f) => {
      const p = af(f, t, !0)
      p && ((l = !0), ae(a, p))
    }
    ;(!n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u))
  }
  return !i && !l
    ? (bt(e) && r.set(e, null), null)
    : (nt(i) ? i.forEach((u) => (a[u] = null)) : ae(a, i), bt(e) && r.set(e, a), a)
}
function to(e, t) {
  return !e || !zi(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      vt(e, t[0].toLowerCase() + t.slice(1)) || vt(e, tr(t)) || vt(e, t))
}
function Hu(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [i],
      slots: a,
      attrs: l,
      emit: u,
      render: f,
      renderCache: p,
      props: _,
      data: w,
      setupState: P,
      ctx: O,
      inheritAttrs: k
    } = e,
    D = Si(e)
  let Q, W
  try {
    if (n.shapeFlag & 4) {
      const q = s || r,
        lt = q
      ;((Q = Ue(f.call(lt, q, p, _, P, w, O))), (W = l))
    } else {
      const q = t
      ;((Q = Ue(q.length > 1 ? q(_, { attrs: l, slots: a, emit: u }) : q(_, null))),
        (W = t.props ? l : og(l)))
    }
  } catch (q) {
    ;((ds.length = 0), Ji(q, e, 1), (Q = $e(Pn)))
  }
  let H = Q
  if (W && k !== !1) {
    const q = Object.keys(W),
      { shapeFlag: lt } = H
    q.length && lt & 7 && (i && q.some(Wi) && (W = ag(W, i)), (H = br(H, W, !1, !0)))
  }
  return (
    n.dirs && ((H = br(H, null, !1, !0)), (H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs)),
    n.transition && Ga(H, n.transition),
    (Q = H),
    Si(D),
    Q
  )
}
const og = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || zi(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  ag = (e, t) => {
    const n = {}
    for (const r in e) (!Wi(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function lg(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: a, children: l, patchFlag: u } = t,
    f = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && u >= 0) {
    if (u & 1024) return !0
    if (u & 16) return r ? zu(r, a, f) : !!a
    if (u & 8) {
      const p = t.dynamicProps
      for (let _ = 0; _ < p.length; _++) {
        const w = p[_]
        if (lf(a, r, w) && !to(f, w)) return !0
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : r === a ? !1 : r ? (a ? zu(r, a, f) : !0) : !!a
  return !1
}
function zu(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let s = 0; s < r.length; s++) {
    const i = r[s]
    if (lf(t, e, i) && !to(n, i)) return !0
  }
  return !1
}
function lf(e, t, n) {
  const r = e[n],
    s = t[n]
  return n === 'style' && bt(r) && bt(s) ? !xn(r, s) : r !== s
}
function ug({ vnode: e, parent: t, suspense: n }, r) {
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
const uf = {},
  cf = () => Object.create(uf),
  hf = (e) => Object.getPrototypeOf(e) === uf
function cg(e, t, n, r = !1) {
  const s = {},
    i = cf()
  ;((e.propsDefaults = Object.create(null)), ff(e, t, s, i))
  for (const a in e.propsOptions[0]) a in s || (s[a] = void 0)
  ;(n ? (e.props = r ? s : _m(s)) : e.type.props ? (e.props = s) : (e.props = i), (e.attrs = i))
}
function hg(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: a }
    } = e,
    l = yt(s),
    [u] = e.propsOptions
  let f = !1
  if ((r || a > 0) && !(a & 16)) {
    if (a & 8) {
      const p = e.vnode.dynamicProps
      for (let _ = 0; _ < p.length; _++) {
        let w = p[_]
        if (to(e.emitsOptions, w)) continue
        const P = t[w]
        if (u)
          if (vt(i, w)) P !== i[w] && ((i[w] = P), (f = !0))
          else {
            const O = ke(w)
            s[O] = la(u, l, O, P, e, !1)
          }
        else P !== i[w] && ((i[w] = P), (f = !0))
      }
    }
  } else {
    ff(e, t, s, i) && (f = !0)
    let p
    for (const _ in l)
      (!t || (!vt(t, _) && ((p = tr(_)) === _ || !vt(t, p)))) &&
        (u
          ? n && (n[_] !== void 0 || n[p] !== void 0) && (s[_] = la(u, l, _, void 0, e, !0))
          : delete s[_])
    if (i !== l) for (const _ in i) (!t || !vt(t, _)) && (delete i[_], (f = !0))
  }
  f && rn(e.attrs, 'set', '')
}
function ff(e, t, n, r) {
  const [s, i] = e.propsOptions
  let a = !1,
    l
  if (t)
    for (let u in t) {
      if (as(u)) continue
      const f = t[u]
      let p
      s && vt(s, (p = ke(u)))
        ? !i || !i.includes(p)
          ? (n[p] = f)
          : ((l || (l = {}))[p] = f)
        : to(e.emitsOptions, u) || ((!(u in r) || f !== r[u]) && ((r[u] = f), (a = !0)))
    }
  if (i) {
    const u = yt(n),
      f = l || At
    for (let p = 0; p < i.length; p++) {
      const _ = i[p]
      n[_] = la(s, u, _, f[_], e, !vt(f, _))
    }
  }
  return a
}
function la(e, t, n, r, s, i) {
  const a = e[n]
  if (a != null) {
    const l = vt(a, 'default')
    if (l && r === void 0) {
      const u = a.default
      if (a.type !== Function && !a.skipFactory && at(u)) {
        const { propsDefaults: f } = s
        if (n in f) r = f[n]
        else {
          const p = Ls(s)
          ;((r = f[n] = u.call(null, t)), p())
        }
      } else r = u
      s.ce && s.ce._setProp(n, r)
    }
    a[0] && (i && !l ? (r = !1) : a[1] && (r === '' || r === tr(n)) && (r = !0))
  }
  return r
}
const fg = new WeakMap()
function df(e, t, n = !1) {
  const r = n ? fg : t.propsCache,
    s = r.get(e)
  if (s) return s
  const i = e.props,
    a = {},
    l = []
  let u = !1
  if (!at(e)) {
    const p = (_) => {
      u = !0
      const [w, P] = df(_, t, !0)
      ;(ae(a, w), P && l.push(...P))
    }
    ;(!n && t.mixins.length && t.mixins.forEach(p),
      e.extends && p(e.extends),
      e.mixins && e.mixins.forEach(p))
  }
  if (!i && !u) return (bt(e) && r.set(e, gr), gr)
  if (nt(i))
    for (let p = 0; p < i.length; p++) {
      const _ = ke(i[p])
      Wu(_) && (a[_] = At)
    }
  else if (i)
    for (const p in i) {
      const _ = ke(p)
      if (Wu(_)) {
        const w = i[p],
          P = (a[_] = nt(w) || at(w) ? { type: w } : ae({}, w)),
          O = P.type
        let k = !1,
          D = !0
        if (nt(O))
          for (let Q = 0; Q < O.length; ++Q) {
            const W = O[Q],
              H = at(W) && W.name
            if (H === 'Boolean') {
              k = !0
              break
            } else H === 'String' && (D = !1)
          }
        else k = at(O) && O.name === 'Boolean'
        ;((P[0] = k), (P[1] = D), (k || vt(P, 'default')) && l.push(_))
      }
    }
  const f = [a, l]
  return (bt(e) && r.set(e, f), f)
}
function Wu(e) {
  return e[0] !== '$' && !as(e)
}
const Qa = (e) => e === '_' || e === '_ctx' || e === '$stable',
  Ya = (e) => (nt(e) ? e.map(Ue) : [Ue(e)]),
  dg = (e, t, n) => {
    if (t._n) return t
    const r = Cm((...s) => Ya(t(...s)), n)
    return ((r._c = !1), r)
  },
  pf = (e, t, n) => {
    const r = e._ctx
    for (const s in e) {
      if (Qa(s)) continue
      const i = e[s]
      if (at(i)) t[s] = dg(s, i, r)
      else if (i != null) {
        const a = Ya(i)
        t[s] = () => a
      }
    }
  },
  mf = (e, t) => {
    const n = Ya(t)
    e.slots.default = () => n
  },
  gf = (e, t, n) => {
    for (const r in t) (n || !Qa(r)) && (e[r] = t[r])
  },
  pg = (e, t, n) => {
    const r = (e.slots = cf())
    if (e.vnode.shapeFlag & 32) {
      const s = t._
      s ? (gf(r, t, n), n && Ih(r, '_', s, !0)) : pf(t, r)
    } else t && mf(e, t)
  },
  mg = (e, t, n) => {
    const { vnode: r, slots: s } = e
    let i = !0,
      a = At
    if (r.shapeFlag & 32) {
      const l = t._
      ;(l ? (n && l === 1 ? (i = !1) : gf(s, t, n)) : ((i = !t.$stable), pf(t, s)), (a = t))
    } else t && (mf(e, t), (a = { default: 1 }))
    if (i) for (const l in s) !Qa(l) && a[l] == null && delete s[l]
  },
  de = Eg
function gg(e) {
  return _g(e)
}
function _g(e, t) {
  const n = Yi()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: a,
      createText: l,
      createComment: u,
      setText: f,
      setElementText: p,
      parentNode: _,
      nextSibling: w,
      setScopeId: P = je,
      insertStaticContent: O
    } = e,
    k = (E, b, C, L = null, N = null, V = null, K = void 0, j = null, B = !!b.dynamicChildren) => {
      if (E === b) return
      ;(E && !Zr(E, b) && ((L = Xe(E)), Ut(E, N, V, !0), (E = null)),
        b.patchFlag === -2 && ((B = !1), (b.dynamicChildren = null)))
      const { type: M, ref: J, shapeFlag: z } = b
      switch (M) {
        case eo:
          D(E, b, C, L)
          break
        case Pn:
          Q(E, b, C, L)
          break
        case Ei:
          E == null && W(b, C, L, K)
          break
        case pe:
          R(E, b, C, L, N, V, K, j, B)
          break
        default:
          z & 1
            ? lt(E, b, C, L, N, V, K, j, B)
            : z & 6
              ? T(E, b, C, L, N, V, K, j, B)
              : (z & 64 || z & 128) && M.process(E, b, C, L, N, V, K, j, B, Oe)
      }
      J != null && N
        ? cs(J, E && E.ref, V, b || E, !b)
        : J == null && E && E.ref != null && cs(E.ref, null, V, E, !0)
    },
    D = (E, b, C, L) => {
      if (E == null) r((b.el = l(b.children)), C, L)
      else {
        const N = (b.el = E.el)
        b.children !== E.children && f(N, b.children)
      }
    },
    Q = (E, b, C, L) => {
      E == null ? r((b.el = u(b.children || '')), C, L) : (b.el = E.el)
    },
    W = (E, b, C, L) => {
      ;[E.el, E.anchor] = O(E.children, b, C, L, E.el, E.anchor)
    },
    H = ({ el: E, anchor: b }, C, L) => {
      let N
      for (; E && E !== b; ) ((N = w(E)), r(E, C, L), (E = N))
      r(b, C, L)
    },
    q = ({ el: E, anchor: b }) => {
      let C
      for (; E && E !== b; ) ((C = w(E)), s(E), (E = C))
      s(b)
    },
    lt = (E, b, C, L, N, V, K, j, B) => {
      if ((b.type === 'svg' ? (K = 'svg') : b.type === 'math' && (K = 'mathml'), E == null))
        dt(b, C, L, N, V, K, j, B)
      else {
        const M = E.el && E.el._isVueCE ? E.el : null
        try {
          ;(M && M._beginPatch(), v(E, b, N, V, K, j, B))
        } finally {
          M && M._endPatch()
        }
      }
    },
    dt = (E, b, C, L, N, V, K, j) => {
      let B, M
      const { props: J, shapeFlag: z, transition: Y, dirs: et } = E
      if (
        ((B = E.el = a(E.type, V, J && J.is, J)),
        z & 8 ? p(B, E.children) : z & 16 && y(E.children, B, null, L, N, Bo(E, V), K, j),
        et && jn(E, null, L, 'created'),
        A(B, E, E.scopeId, K, L),
        J)
      ) {
        for (const ot in J) ot !== 'value' && !as(ot) && i(B, ot, null, J[ot], V, L)
        ;('value' in J && i(B, 'value', null, J.value, V),
          (M = J.onVnodeBeforeMount) && Me(M, L, E))
      }
      et && jn(E, null, L, 'beforeMount')
      const tt = yg(N, Y)
      ;(tt && Y.beforeEnter(B),
        r(B, b, C),
        ((M = J && J.onVnodeMounted) || tt || et) &&
          de(() => {
            try {
              ;(M && Me(M, L, E), tt && Y.enter(B), et && jn(E, null, L, 'mounted'))
            } finally {
            }
          }, N))
    },
    A = (E, b, C, L, N) => {
      if ((C && P(E, C), L)) for (let V = 0; V < L.length; V++) P(E, L[V])
      if (N) {
        let V = N.subTree
        if (b === V || (Ef(V.type) && (V.ssContent === b || V.ssFallback === b))) {
          const K = N.vnode
          A(E, K, K.scopeId, K.slotScopeIds, N.parent)
        }
      }
    },
    y = (E, b, C, L, N, V, K, j, B = 0) => {
      for (let M = B; M < E.length; M++) {
        const J = (E[M] = j ? nn(E[M]) : Ue(E[M]))
        k(null, J, b, C, L, N, V, K, j)
      }
    },
    v = (E, b, C, L, N, V, K) => {
      const j = (b.el = E.el)
      let { patchFlag: B, dynamicChildren: M, dirs: J } = b
      B |= E.patchFlag & 16
      const z = E.props || At,
        Y = b.props || At
      let et
      if (
        (C && $n(C, !1),
        (et = Y.onVnodeBeforeUpdate) && Me(et, C, b, E),
        J && jn(b, E, C, 'beforeUpdate'),
        C && $n(C, !0),
        ((z.innerHTML && Y.innerHTML == null) || (z.textContent && Y.textContent == null)) &&
          p(j, ''),
        M
          ? d(E.dynamicChildren, M, j, C, L, Bo(b, N), V)
          : K || pt(E, b, j, null, C, L, Bo(b, N), V, !1),
        B > 0)
      ) {
        if (B & 16) g(j, z, Y, C, N)
        else if (
          (B & 2 && z.class !== Y.class && i(j, 'class', null, Y.class, N),
          B & 4 && i(j, 'style', z.style, Y.style, N),
          B & 8)
        ) {
          const tt = b.dynamicProps
          for (let ot = 0; ot < tt.length; ot++) {
            const ht = tt[ot],
              St = z[ht],
              Lt = Y[ht]
            ;(Lt !== St || ht === 'value') && i(j, ht, St, Lt, N, C)
          }
        }
        B & 1 && E.children !== b.children && p(j, b.children)
      } else !K && M == null && g(j, z, Y, C, N)
      ;((et = Y.onVnodeUpdated) || J) &&
        de(() => {
          ;(et && Me(et, C, b, E), J && jn(b, E, C, 'updated'))
        }, L)
    },
    d = (E, b, C, L, N, V, K) => {
      for (let j = 0; j < b.length; j++) {
        const B = E[j],
          M = b[j],
          J = B.el && (B.type === pe || !Zr(B, M) || B.shapeFlag & 198) ? _(B.el) : C
        k(B, M, J, null, L, N, V, K, !0)
      }
    },
    g = (E, b, C, L, N) => {
      if (b !== C) {
        if (b !== At) for (const V in b) !as(V) && !(V in C) && i(E, V, b[V], null, N, L)
        for (const V in C) {
          if (as(V)) continue
          const K = C[V],
            j = b[V]
          K !== j && V !== 'value' && i(E, V, j, K, N, L)
        }
        'value' in C && i(E, 'value', b.value, C.value, N)
      }
    },
    R = (E, b, C, L, N, V, K, j, B) => {
      const M = (b.el = E ? E.el : l('')),
        J = (b.anchor = E ? E.anchor : l(''))
      let { patchFlag: z, dynamicChildren: Y, slotScopeIds: et } = b
      ;(et && (j = j ? j.concat(et) : et),
        E == null
          ? (r(M, C, L), r(J, C, L), y(b.children || [], C, J, N, V, K, j, B))
          : z > 0 && z & 64 && Y && E.dynamicChildren && E.dynamicChildren.length === Y.length
            ? (d(E.dynamicChildren, Y, C, N, V, K, j),
              (b.key != null || (N && b === N.subTree)) && _f(E, b, !0))
            : pt(E, b, C, J, N, V, K, j, B))
    },
    T = (E, b, C, L, N, V, K, j, B) => {
      ;((b.slotScopeIds = j),
        E == null
          ? b.shapeFlag & 512
            ? N.ctx.activate(b, C, L, K, B)
            : ge(b, C, L, N, V, K, B)
          : gn(E, b, B))
    },
    ge = (E, b, C, L, N, V, K) => {
      const j = (E.component = Pg(E, L, N))
      if ((Zh(E) && (j.ctx.renderer = Oe), Cg(j, !1, K), j.asyncDep)) {
        if ((N && N.registerDep(j, Ht, K), !E.el)) {
          const B = (j.subTree = $e(Pn))
          ;(Q(null, B, b, C), (E.placeholder = B.el))
        }
      } else Ht(j, E, b, C, N, V, K)
    },
    gn = (E, b, C) => {
      const L = (b.component = E.component)
      if (lg(E, b, C))
        if (L.asyncDep && !L.asyncResolved) {
          Et(L, b, C)
          return
        } else ((L.next = b), L.update())
      else ((b.el = E.el), (L.vnode = b))
    },
    Ht = (E, b, C, L, N, V, K) => {
      const j = () => {
        if (E.isMounted) {
          let { next: z, bu: Y, u: et, parent: tt, vnode: ot } = E
          {
            const Zt = yf(E)
            if (Zt) {
              ;(z && ((z.el = ot.el), Et(E, z, K)),
                Zt.asyncDep.then(() => {
                  de(() => {
                    E.isUnmounted || M()
                  }, N)
                }))
              return
            }
          }
          let ht = z,
            St
          ;($n(E, !1),
            z ? ((z.el = ot.el), Et(E, z, K)) : (z = ot),
            Y && yi(Y),
            (St = z.props && z.props.onVnodeBeforeUpdate) && Me(St, tt, z, ot),
            $n(E, !0))
          const Lt = Hu(E),
            ve = E.subTree
          ;((E.subTree = Lt),
            k(ve, Lt, _(ve.el), Xe(ve), E, N, V),
            (z.el = Lt.el),
            ht === null && ug(E, Lt.el),
            et && de(et, N),
            (St = z.props && z.props.onVnodeUpdated) && de(() => Me(St, tt, z, ot), N))
        } else {
          let z
          const { el: Y, props: et } = b,
            { bm: tt, m: ot, parent: ht, root: St, type: Lt } = E,
            ve = hs(b)
          ;($n(E, !1),
            tt && yi(tt),
            !ve && (z = et && et.onVnodeBeforeMount) && Me(z, ht, b),
            $n(E, !0))
          {
            St.ce &&
              St.ce._hasShadowRoot() &&
              St.ce._injectChildStyle(Lt, E.parent ? E.parent.type : void 0)
            const Zt = (E.subTree = Hu(E))
            ;(k(null, Zt, C, L, E, N, V), (b.el = Zt.el))
          }
          if ((ot && de(ot, N), !ve && (z = et && et.onVnodeMounted))) {
            const Zt = b
            de(() => Me(z, ht, Zt), N)
          }
          ;((b.shapeFlag & 256 || (ht && hs(ht.vnode) && ht.vnode.shapeFlag & 256)) &&
            E.a &&
            de(E.a, N),
            (E.isMounted = !0),
            (b = C = L = null))
        }
      }
      E.scope.on()
      const B = (E.effect = new Sh(j))
      E.scope.off()
      const M = (E.update = B.run.bind(B)),
        J = (E.job = B.runIfDirty.bind(B))
      ;((J.i = E), (J.id = E.uid), (B.scheduler = () => Wa(J)), $n(E, !0), M())
    },
    Et = (E, b, C) => {
      b.component = E
      const L = E.vnode.props
      ;((E.vnode = b),
        (E.next = null),
        hg(E, b.props, L, C),
        mg(E, b.children, C),
        un(),
        Fu(E),
        cn())
    },
    pt = (E, b, C, L, N, V, K, j, B = !1) => {
      const M = E && E.children,
        J = E ? E.shapeFlag : 0,
        z = b.children,
        { patchFlag: Y, shapeFlag: et } = b
      if (Y > 0) {
        if (Y & 128) {
          Nn(M, z, C, L, N, V, K, j, B)
          return
        } else if (Y & 256) {
          xe(M, z, C, L, N, V, K, j, B)
          return
        }
      }
      et & 8
        ? (J & 16 && Mn(M, N, V), z !== M && p(C, z))
        : J & 16
          ? et & 16
            ? Nn(M, z, C, L, N, V, K, j, B)
            : Mn(M, N, V, !0)
          : (J & 8 && p(C, ''), et & 16 && y(z, C, L, N, V, K, j, B))
    },
    xe = (E, b, C, L, N, V, K, j, B) => {
      ;((E = E || gr), (b = b || gr))
      const M = E.length,
        J = b.length,
        z = Math.min(M, J)
      let Y
      for (Y = 0; Y < z; Y++) {
        const et = (b[Y] = B ? nn(b[Y]) : Ue(b[Y]))
        k(E[Y], et, C, null, N, V, K, j, B)
      }
      M > J ? Mn(E, N, V, !0, !1, z) : y(b, C, L, N, V, K, j, B, z)
    },
    Nn = (E, b, C, L, N, V, K, j, B) => {
      let M = 0
      const J = b.length
      let z = E.length - 1,
        Y = J - 1
      for (; M <= z && M <= Y; ) {
        const et = E[M],
          tt = (b[M] = B ? nn(b[M]) : Ue(b[M]))
        if (Zr(et, tt)) k(et, tt, C, null, N, V, K, j, B)
        else break
        M++
      }
      for (; M <= z && M <= Y; ) {
        const et = E[z],
          tt = (b[Y] = B ? nn(b[Y]) : Ue(b[Y]))
        if (Zr(et, tt)) k(et, tt, C, null, N, V, K, j, B)
        else break
        ;(z--, Y--)
      }
      if (M > z) {
        if (M <= Y) {
          const et = Y + 1,
            tt = et < J ? b[et].el : L
          for (; M <= Y; ) (k(null, (b[M] = B ? nn(b[M]) : Ue(b[M])), C, tt, N, V, K, j, B), M++)
        }
      } else if (M > Y) for (; M <= z; ) (Ut(E[M], N, V, !0), M++)
      else {
        const et = M,
          tt = M,
          ot = new Map()
        for (M = tt; M <= Y; M++) {
          const zt = (b[M] = B ? nn(b[M]) : Ue(b[M]))
          zt.key != null && ot.set(zt.key, M)
        }
        let ht,
          St = 0
        const Lt = Y - tt + 1
        let ve = !1,
          Zt = 0
        const _n = new Array(Lt)
        for (M = 0; M < Lt; M++) _n[M] = 0
        for (M = et; M <= z; M++) {
          const zt = E[M]
          if (St >= Lt) {
            Ut(zt, N, V, !0)
            continue
          }
          let Ee
          if (zt.key != null) Ee = ot.get(zt.key)
          else
            for (ht = tt; ht <= Y; ht++)
              if (_n[ht - tt] === 0 && Zr(zt, b[ht])) {
                Ee = ht
                break
              }
          Ee === void 0
            ? Ut(zt, N, V, !0)
            : ((_n[Ee - tt] = M + 1),
              Ee >= Zt ? (Zt = Ee) : (ve = !0),
              k(zt, b[Ee], C, null, N, V, K, j, B),
              St++)
        }
        const Fr = ve ? vg(_n) : gr
        for (ht = Fr.length - 1, M = Lt - 1; M >= 0; M--) {
          const zt = tt + M,
            Ee = b[zt],
            Hs = b[zt + 1],
            sr = zt + 1 < J ? Hs.el || vf(Hs) : L
          _n[M] === 0
            ? k(null, Ee, C, sr, N, V, K, j, B)
            : ve && (ht < 0 || M !== Fr[ht] ? Ye(Ee, C, sr, 2) : ht--)
        }
      }
    },
    Ye = (E, b, C, L, N = null) => {
      const { el: V, type: K, transition: j, children: B, shapeFlag: M } = E
      if (M & 6) {
        Ye(E.component.subTree, b, C, L)
        return
      }
      if (M & 128) {
        E.suspense.move(b, C, L)
        return
      }
      if (M & 64) {
        K.move(E, b, C, Oe)
        return
      }
      if (K === pe) {
        r(V, b, C)
        for (let z = 0; z < B.length; z++) Ye(B[z], b, C, L)
        r(E.anchor, b, C)
        return
      }
      if (K === Ei) {
        H(E, b, C)
        return
      }
      if (L !== 2 && M & 1 && j)
        if (L === 0)
          j.persisted && !V[Fo]
            ? r(V, b, C)
            : (j.beforeEnter(V), r(V, b, C), de(() => j.enter(V), N))
        else {
          const { leave: z, delayLeave: Y, afterLeave: et } = j,
            tt = () => {
              E.ctx.isUnmounted ? s(V) : r(V, b, C)
            },
            ot = () => {
              const ht = V._isLeaving || !!V[Fo]
              ;(V._isLeaving && V[Fo](!0),
                j.persisted && !ht
                  ? tt()
                  : z(V, () => {
                      ;(tt(), et && et())
                    }))
            }
          Y ? Y(V, tt, ot) : ot()
        }
      else r(V, b, C)
    },
    Ut = (E, b, C, L = !1, N = !1) => {
      const {
        type: V,
        props: K,
        ref: j,
        children: B,
        dynamicChildren: M,
        shapeFlag: J,
        patchFlag: z,
        dirs: Y,
        cacheIndex: et,
        memo: tt
      } = E
      if (
        (z === -2 && (N = !1),
        j != null && (un(), cs(j, null, C, E, !0), cn()),
        et != null && (b.renderCache[et] = void 0),
        J & 256)
      ) {
        b.ctx.deactivate(E)
        return
      }
      const ot = J & 1 && Y,
        ht = !hs(E)
      let St
      if ((ht && (St = K && K.onVnodeBeforeUnmount) && Me(St, b, E), J & 6)) On(E.component, C, L)
      else {
        if (J & 128) {
          E.suspense.unmount(C, L)
          return
        }
        ;(ot && jn(E, null, b, 'beforeUnmount'),
          J & 64
            ? E.type.remove(E, b, C, Oe, L)
            : M && !M.hasOnce && (V !== pe || (z > 0 && z & 64))
              ? Mn(M, b, C, !1, !0)
              : ((V === pe && z & 384) || (!N && J & 16)) && Mn(B, b, C),
          L && Bt(E))
      }
      const Lt = tt != null && et == null
      ;((ht && (St = K && K.onVnodeUnmounted)) || ot || Lt) &&
        de(() => {
          ;(St && Me(St, b, E), ot && jn(E, null, b, 'unmounted'), Lt && (E.el = null))
        }, C)
    },
    Bt = (E) => {
      const { type: b, el: C, anchor: L, transition: N } = E
      if (b === pe) {
        _o(C, L)
        return
      }
      if (b === Ei) {
        q(E)
        return
      }
      const V = () => {
        ;(s(C), N && !N.persisted && N.afterLeave && N.afterLeave())
      }
      if (E.shapeFlag & 1 && N && !N.persisted) {
        const { leave: K, delayLeave: j } = N,
          B = () => K(C, V)
        j ? j(E.el, V, B) : B()
      } else V()
    },
    _o = (E, b) => {
      let C
      for (; E !== b; ) ((C = w(E)), s(E), (E = C))
      s(b)
    },
    On = (E, b, C) => {
      const { bum: L, scope: N, job: V, subTree: K, um: j, m: B, a: M } = E
      ;(Gu(B),
        Gu(M),
        L && yi(L),
        N.stop(),
        V && ((V.flags |= 8), Ut(K, E, b, C)),
        j && de(j, b),
        de(() => {
          E.isUnmounted = !0
        }, b))
    },
    Mn = (E, b, C, L = !1, N = !1, V = 0) => {
      for (let K = V; K < E.length; K++) Ut(E[K], b, C, L, N)
    },
    Xe = (E) => {
      if (E.shapeFlag & 6) return Xe(E.component.subTree)
      if (E.shapeFlag & 128) return E.suspense.next()
      const b = w(E.anchor || E.el),
        C = b && b[Om]
      return C ? w(C) : b
    }
  let Mr = !1
  const Ks = (E, b, C) => {
      let L
      ;(E == null
        ? b._vnode && (Ut(b._vnode, null, null, !0), (L = b._vnode.component))
        : k(b._vnode || null, E, b, null, null, null, C),
        (b._vnode = E),
        Mr || ((Mr = !0), Fu(L), Wh(), (Mr = !1)))
    },
    Oe = { p: k, um: Ut, m: Ye, r: Bt, mt: ge, mc: y, pc: pt, pbc: d, n: Xe, o: e }
  return { render: Ks, hydrate: void 0, createApp: ng(Ks) }
}
function Bo({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function $n({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5))
}
function yg(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function _f(e, t, n = !1) {
  const r = e.children,
    s = t.children
  if (nt(r) && nt(s))
    for (let i = 0; i < r.length; i++) {
      const a = r[i]
      let l = s[i]
      ;(l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = s[i] = nn(s[i])), (l.el = a.el)),
        !n && l.patchFlag !== -2 && _f(a, l)),
        l.type === eo && (l.patchFlag === -1 && (l = s[i] = nn(l)), (l.el = a.el)),
        l.type === Pn && !l.el && (l.el = a.el))
    }
}
function vg(e) {
  const t = e.slice(),
    n = [0]
  let r, s, i, a, l
  const u = e.length
  for (r = 0; r < u; r++) {
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
function yf(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : yf(t)
}
function Gu(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
function vf(e) {
  if (e.placeholder) return e.placeholder
  const t = e.component
  return t ? vf(t.subTree) : null
}
const Ef = (e) => e.__isSuspense
function Eg(e, t) {
  t && t.pendingBranch ? (nt(e) ? t.effects.push(...e) : t.effects.push(e)) : Sm(e)
}
const pe = Symbol.for('v-fgt'),
  eo = Symbol.for('v-txt'),
  Pn = Symbol.for('v-cmt'),
  Ei = Symbol.for('v-stc'),
  ds = []
let ye = null
function Ct(e = !1) {
  ds.push((ye = e ? null : []))
}
function Tg() {
  ;(ds.pop(), (ye = ds[ds.length - 1] || null))
}
let bs = 1
function Qu(e, t = !1) {
  ;((bs += e), e < 0 && ye && t && (ye.hasOnce = !0))
}
function Tf(e) {
  return ((e.dynamicChildren = bs > 0 ? ye || gr : null), Tg(), bs > 0 && ye && ye.push(e), e)
}
function Ot(e, t, n, r, s, i) {
  return Tf(I(e, t, n, r, s, i, !0))
}
function bf(e, t, n, r, s) {
  return Tf($e(e, t, n, r, s, !0))
}
function wf(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Zr(e, t) {
  return e.type === t.type && e.key === t.key
}
const Af = ({ key: e }) => e ?? null,
  Ti = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (Nt(e) || oe(e) || at(e) ? { i: we, r: e, k: t, f: !!n } : e) : null
  )
function I(e, t = null, n = null, r = 0, s = null, i = e === pe ? 0 : 1, a = !1, l = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Af(t),
    ref: t && Ti(t),
    scopeId: Qh,
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
    ctx: we
  }
  return (
    l ? (Xa(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= Nt(n) ? 8 : 16),
    bs > 0 && !a && ye && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ye.push(u),
    u
  )
}
const $e = bg
function bg(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === Gm) && (e = Pn), wf(e))) {
    const l = br(e, t, !0)
    return (
      n && Xa(l, n),
      bs > 0 && !i && ye && (l.shapeFlag & 6 ? (ye[ye.indexOf(e)] = l) : ye.push(l)),
      (l.patchFlag = -2),
      l
    )
  }
  if ((Ng(e) && (e = e.__vccOpts), t)) {
    t = wg(t)
    let { class: l, style: u } = t
    ;(l && !Nt(l) && (t.class = ys(l)),
      bt(u) && (za(u) && !nt(u) && (u = ae({}, u)), (t.style = La(u))))
  }
  const a = Nt(e) ? 1 : Ef(e) ? 128 : Mm(e) ? 64 : bt(e) ? 4 : at(e) ? 2 : 0
  return I(e, t, n, r, s, a, i, !0)
}
function wg(e) {
  return e ? (za(e) || hf(e) ? ae({}, e) : e) : null
}
function br(e, t, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: a, children: l, transition: u } = e,
    f = t ? Ig(s || {}, t) : s,
    p = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && Af(f),
      ref: t && t.ref ? (n && i ? (nt(i) ? i.concat(Ti(t)) : [i, Ti(t)]) : Ti(t)) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== pe ? (a === -1 ? 16 : a | 16) : a,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: u,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && br(e.ssContent),
      ssFallback: e.ssFallback && br(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    }
  return (u && r && Ga(p, u.clone(p)), p)
}
function Dt(e = ' ', t = 0) {
  return $e(eo, null, e, t)
}
function Ag(e, t) {
  const n = $e(Ei, null, e)
  return ((n.staticCount = t), n)
}
function cr(e = '', t = !1) {
  return t ? (Ct(), bf(Pn, null, e)) : $e(Pn, null, e)
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? $e(Pn)
    : nt(e)
      ? $e(pe, null, e.slice())
      : wf(e)
        ? nn(e)
        : $e(eo, null, String(e))
}
function nn(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : br(e)
}
function Xa(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (nt(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default
      s && (s._c && (s._d = !1), Xa(e, s()), s._c && (s._d = !0))
      return
    } else {
      n = 32
      const s = t._
      !s && !hf(t)
        ? (t._ctx = we)
        : s === 3 && we && (we.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    at(t)
      ? ((t = { default: t, _ctx: we }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Dt(t)])) : (n = 8))
  ;((e.children = t), (e.shapeFlag |= n))
}
function Ig(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const s in r)
      if (s === 'class') t.class !== r.class && (t.class = ys([t.class, r.class]))
      else if (s === 'style') t.style = La([t.style, r.style])
      else if (zi(s)) {
        const i = t[s],
          a = r[s]
        a && i !== a && !(nt(i) && i.includes(a))
          ? (t[s] = i ? [].concat(i, a) : a)
          : a == null && i == null && !Wi(s) && (t[s] = a)
      } else s !== '' && (t[s] = r[s])
  }
  return t
}
function Me(e, t, n, r = null) {
  Ne(e, t, 7, [n, r])
}
const Rg = of()
let xg = 0
function Pg(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Rg,
    i = {
      uid: xg++,
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
      scope: new Jp(!0),
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
      propsOptions: df(r, s),
      emitsOptions: af(r, s),
      emit: null,
      emitted: null,
      propsDefaults: At,
      inheritAttrs: r.inheritAttrs,
      ctx: At,
      data: At,
      props: At,
      attrs: At,
      slots: At,
      refs: At,
      setupState: At,
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
    (i.emit = sg.bind(null, i)),
    e.ce && e.ce(i),
    i
  )
}
let he = null
const Sg = () => he || we
let Vi, ua
{
  const e = Yi(),
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
  ;((Vi = t('__VUE_INSTANCE_SETTERS__', (n) => (he = n))),
    (ua = t('__VUE_SSR_SETTERS__', (n) => (ws = n))))
}
const Ls = (e) => {
    const t = he
    return (
      Vi(e),
      e.scope.on(),
      () => {
        ;(e.scope.off(), Vi(t))
      }
    )
  },
  Yu = () => {
    ;(he && he.scope.off(), Vi(null))
  }
function If(e) {
  return e.vnode.shapeFlag & 4
}
let ws = !1
function Cg(e, t = !1, n = !1) {
  t && ua(t)
  const { props: r, children: s } = e.vnode,
    i = If(e)
  ;(cg(e, r, i, t), pg(e, s, n || t))
  const a = i ? kg(e, t) : void 0
  return (t && ua(!1), a)
}
function kg(e, t) {
  const n = e.type
  ;((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Qm)))
  const { setup: r } = n
  if (r) {
    un()
    const s = (e.setupContext = r.length > 1 ? Dg(e) : null),
      i = Ls(e),
      a = Ms(r, e, 0, [e.props, s]),
      l = Th(a)
    if ((cn(), i(), (l || e.sp) && !hs(e) && Jh(e), l)) {
      if ((a.then(Yu, Yu), t))
        return a
          .then((u) => {
            Xu(e, u)
          })
          .catch((u) => {
            Ji(u, e, 0)
          })
      e.asyncDep = a
    } else Xu(e, a)
  } else Rf(e)
}
function Xu(e, t, n) {
  ;(at(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : bt(t) && (e.setupState = qh(t)),
    Rf(e))
}
function Rf(e, t, n) {
  const r = e.type
  e.render || (e.render = r.render || je)
  {
    const s = Ls(e)
    un()
    try {
      Ym(e)
    } finally {
      ;(cn(), s())
    }
  }
}
const Vg = {
  get(e, t) {
    return (se(e, 'get', ''), e[t])
  }
}
function Dg(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return { attrs: new Proxy(e.attrs, Vg), slots: e.slots, emit: e.emit, expose: t }
}
function no(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(qh(ym(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in fs) return fs[n](e)
          },
          has(t, n) {
            return n in t || n in fs
          }
        }))
    : e.proxy
}
function Ng(e) {
  return at(e) && '__vccOpts' in e
}
const ca = (e, t) => Am(e, t, ws),
  Og = '3.5.35'
/**
 * @vue/runtime-dom v3.5.35
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ha
const Ju = typeof window < 'u' && window.trustedTypes
if (Ju)
  try {
    ha = Ju.createPolicy('vue', { createHTML: (e) => e })
  } catch {}
const xf = ha ? (e) => ha.createHTML(e) : (e) => e,
  Mg = 'http://www.w3.org/2000/svg',
  Lg = 'http://www.w3.org/1998/Math/MathML',
  en = typeof document < 'u' ? document : null,
  Zu = en && en.createElement('template'),
  Fg = {
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
          ? en.createElementNS(Mg, e)
          : t === 'mathml'
            ? en.createElementNS(Lg, e)
            : n
              ? en.createElement(e, { is: n })
              : en.createElement(e)
      return (
        e === 'select' && r && r.multiple != null && s.setAttribute('multiple', r.multiple),
        s
      )
    },
    createText: (e) => en.createTextNode(e),
    createComment: (e) => en.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => en.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, s, i) {
      const a = n ? n.previousSibling : t.lastChild
      if (s && (s === i || s.nextSibling))
        for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); );
      else {
        Zu.innerHTML = xf(
          r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e
        )
        const l = Zu.content
        if (r === 'svg' || r === 'mathml') {
          const u = l.firstChild
          for (; u.firstChild; ) l.appendChild(u.firstChild)
          l.removeChild(u)
        }
        t.insertBefore(l, n)
      }
      return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  Ug = Symbol('_vtc')
function Bg(e, t, n) {
  const r = e[Ug]
  ;(r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t))
}
const tc = Symbol('_vod'),
  jg = Symbol('_vsh'),
  $g = Symbol(''),
  qg = /(?:^|;)\s*display\s*:/
function Kg(e, t, n) {
  const r = e.style,
    s = Nt(n)
  let i = !1
  if (n && !s) {
    if (t)
      if (Nt(t))
        for (const a of t.split(';')) {
          const l = a.slice(0, a.indexOf(':')).trim()
          n[l] == null && rs(r, l, '')
        }
      else for (const a in t) n[a] == null && rs(r, a, '')
    for (const a in n) {
      a === 'display' && (i = !0)
      const l = n[a]
      l != null ? zg(e, a, !Nt(t) && t ? t[a] : void 0, l) || rs(r, a, l) : rs(r, a, '')
    }
  } else if (s) {
    if (t !== n) {
      const a = r[$g]
      ;(a && (n += ';' + a), (r.cssText = n), (i = qg.test(n)))
    }
  } else t && e.removeAttribute('style')
  tc in e && ((e[tc] = i ? r.display : ''), e[jg] && (r.display = 'none'))
}
const ec = /\s*!important$/
function rs(e, t, n) {
  if (nt(n)) n.forEach((r) => rs(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = Hg(e, t)
    ec.test(n) ? e.setProperty(tr(r), n.replace(ec, ''), 'important') : (e[r] = n)
  }
}
const nc = ['Webkit', 'Moz', 'ms'],
  jo = {}
function Hg(e, t) {
  const n = jo[t]
  if (n) return n
  let r = ke(t)
  if (r !== 'filter' && r in e) return (jo[t] = r)
  r = Ah(r)
  for (let s = 0; s < nc.length; s++) {
    const i = nc[s] + r
    if (i in e) return (jo[t] = i)
  }
  return t
}
function zg(e, t, n, r) {
  return e.tagName === 'TEXTAREA' && (t === 'width' || t === 'height') && Nt(r) && n === r
}
const rc = 'http://www.w3.org/1999/xlink'
function sc(e, t, n, r, s, i = Yp(t)) {
  r && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(rc, t.slice(6, t.length))
      : e.setAttributeNS(rc, t, n)
    : n == null || (i && !Rh(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : He(n) ? String(n) : n)
}
function ic(e, t, n, r, s) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? xf(n) : n)
    return
  }
  const i = e.tagName
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      u = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n)
    ;((l !== u || !('_value' in e)) && (e.value = u),
      n == null && e.removeAttribute(t),
      (e._value = n))
    return
  }
  let a = !1
  if (n === '' || n == null) {
    const l = typeof e[t]
    l === 'boolean'
      ? (n = Rh(n))
      : n == null && l === 'string'
        ? ((n = ''), (a = !0))
        : l === 'number' && ((n = 0), (a = !0))
  }
  try {
    e[t] = n
  } catch {}
  a && e.removeAttribute(s || t)
}
function on(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function Wg(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const oc = Symbol('_vei')
function Gg(e, t, n, r, s = null) {
  const i = e[oc] || (e[oc] = {}),
    a = i[t]
  if (r && a) a.value = r
  else {
    const [l, u] = Qg(t)
    if (r) {
      const f = (i[t] = Jg(r, s))
      on(e, l, f, u)
    } else a && (Wg(e, l, a, u), (i[t] = void 0))
  }
}
const ac = /(?:Once|Passive|Capture)$/
function Qg(e) {
  let t
  if (ac.test(e)) {
    t = {}
    let r
    for (; (r = e.match(ac)); )
      ((e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0))
  }
  return [e[2] === ':' ? e.slice(3) : tr(e.slice(2)), t]
}
let $o = 0
const Yg = Promise.resolve(),
  Xg = () => $o || (Yg.then(() => ($o = 0)), ($o = Date.now()))
function Jg(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    const s = n.value
    if (nt(s)) {
      const i = r.stopImmediatePropagation
      r.stopImmediatePropagation = () => {
        ;(i.call(r), (r._stopped = !0))
      }
      const a = s.slice(),
        l = [r]
      for (let u = 0; u < a.length && !r._stopped; u++) {
        const f = a[u]
        f && Ne(f, t, 5, l)
      }
    } else Ne(s, t, 5, [r])
  }
  return ((n.value = e), (n.attached = Xg()), n)
}
const lc = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Zg = (e, t, n, r, s, i) => {
    const a = s === 'svg'
    t === 'class'
      ? Bg(e, r, a)
      : t === 'style'
        ? Kg(e, n, r)
        : zi(t)
          ? Wi(t) || Gg(e, t, n, r, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : t_(e, t, r, a)
              )
            ? (ic(e, t, r),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                sc(e, t, r, a, i, t !== 'value'))
            : e._isVueCE && (e_(e, t) || (e._def.__asyncLoader && (/[A-Z]/.test(t) || !Nt(r))))
              ? ic(e, ke(t), r, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = r)
                  : t === 'false-value' && (e._falseValue = r),
                sc(e, t, r, a))
  }
function t_(e, t, n, r) {
  if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && lc(t) && at(n)))
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
  return lc(t) && Nt(n) ? !1 : t in e
}
function e_(e, t) {
  const n = e._def.props
  if (!n) return !1
  const r = ke(t)
  return Array.isArray(n) ? n.some((s) => ke(s) === r) : Object.keys(n).some((s) => ke(s) === r)
}
const Sn = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1
  return nt(t) ? (n) => yi(t, n) : t
}
function n_(e) {
  e.target.composing = !0
}
function uc(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const Ie = Symbol('_assign')
function cc(e, t, n) {
  return (t && (e = e.trim()), n && (e = Qi(e)), e)
}
const xt = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e[Ie] = Sn(s)
      const i = r || (s.props && s.props.type === 'number')
      ;(on(e, t ? 'change' : 'input', (a) => {
        a.target.composing || e[Ie](cc(e.value, n, i))
      }),
        (n || i) &&
          on(e, 'change', () => {
            e.value = cc(e.value, n, i)
          }),
        t || (on(e, 'compositionstart', n_), on(e, 'compositionend', uc), on(e, 'change', uc)))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ''
    },
    beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, a) {
      if (((e[Ie] = Sn(a)), e.composing)) return
      const l = (i || e.type === 'number') && !/^0\d/.test(e.value) ? Qi(e.value) : e.value,
        u = t ?? ''
      if (l === u) return
      const f = e.getRootNode()
      ;((f instanceof Document || f instanceof ShadowRoot) &&
        f.activeElement === e &&
        e.type !== 'range' &&
        ((r && t === n) || (s && e.value.trim() === u))) ||
        (e.value = u)
    }
  },
  r_ = {
    deep: !0,
    created(e, t, n) {
      ;((e[Ie] = Sn(n)),
        on(e, 'change', () => {
          const r = e._modelValue,
            s = wr(e),
            i = e.checked,
            a = e[Ie]
          if (nt(r)) {
            const l = Fa(r, s),
              u = l !== -1
            if (i && !u) a(r.concat(s))
            else if (!i && u) {
              const f = [...r]
              ;(f.splice(l, 1), a(f))
            }
          } else if (kr(r)) {
            const l = new Set(r)
            ;(i ? l.add(s) : l.delete(s), a(l))
          } else a(Pf(e, i))
        }))
    },
    mounted: hc,
    beforeUpdate(e, t, n) {
      ;((e[Ie] = Sn(n)), hc(e, t, n))
    }
  }
function hc(e, { value: t, oldValue: n }, r) {
  e._modelValue = t
  let s
  if (nt(t)) s = Fa(t, r.props.value) > -1
  else if (kr(t)) s = t.has(r.props.value)
  else {
    if (t === n) return
    s = xn(t, Pf(e, !0))
  }
  e.checked !== s && (e.checked = s)
}
const fc = {
    created(e, { value: t }, n) {
      ;((e.checked = xn(t, n.props.value)),
        (e[Ie] = Sn(n)),
        on(e, 'change', () => {
          e[Ie](wr(e))
        }))
    },
    beforeUpdate(e, { value: t, oldValue: n }, r) {
      ;((e[Ie] = Sn(r)), t !== n && (e.checked = xn(t, r.props.value)))
    }
  },
  ts = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, r) {
      const s = kr(t)
      ;(on(e, 'change', () => {
        const i = Array.prototype.filter
          .call(e.options, (a) => a.selected)
          .map((a) => (n ? Qi(wr(a)) : wr(a)))
        ;(e[Ie](e.multiple ? (s ? new Set(i) : i) : i[0]),
          (e._assigning = !0),
          Hh(() => {
            e._assigning = !1
          }))
      }),
        (e[Ie] = Sn(r)))
    },
    mounted(e, { value: t }) {
      dc(e, t)
    },
    beforeUpdate(e, t, n) {
      e[Ie] = Sn(n)
    },
    updated(e, { value: t }) {
      e._assigning || dc(e, t)
    }
  }
function dc(e, t) {
  const n = e.multiple,
    r = nt(t)
  if (!(n && !r && !kr(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const a = e.options[s],
        l = wr(a)
      if (n)
        if (r) {
          const u = typeof l
          u === 'string' || u === 'number'
            ? (a.selected = t.some((f) => String(f) === String(l)))
            : (a.selected = Fa(t, l) > -1)
        } else a.selected = t.has(l)
      else if (xn(wr(a), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s)
        return
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
  }
}
function wr(e) {
  return '_value' in e ? e._value : e.value
}
function Pf(e, t) {
  const n = t ? '_trueValue' : '_falseValue'
  return n in e ? e[n] : t
}
const s_ = ['ctrl', 'shift', 'alt', 'meta'],
  i_ = {
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
    exact: (e, t) => s_.some((n) => e[`${n}Key`] && !t.includes(n))
  },
  pc = (e, t) => {
    if (!e) return e
    const n = e._withMods || (e._withMods = {}),
      r = t.join('.')
    return (
      n[r] ||
      (n[r] = (s, ...i) => {
        for (let a = 0; a < t.length; a++) {
          const l = i_[t[a]]
          if (l && l(s, t)) return
        }
        return e(s, ...i)
      })
    )
  },
  o_ = ae({ patchProp: Zg }, Fg)
let mc
function a_() {
  return mc || (mc = gg(o_))
}
const l_ = (...e) => {
  const t = a_().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const s = c_(r)
      if (!s) return
      const i = t._component
      ;(!at(i) && !i.render && !i.template && (i.template = s.innerHTML),
        s.nodeType === 1 && (s.textContent = ''))
      const a = n(s, !1, u_(s))
      return (
        s instanceof Element && (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
        a
      )
    }),
    t
  )
}
function u_(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function c_(e) {
  return Nt(e) ? document.querySelector(e) : e
}
var gc = {}
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
 */ const Sf = function (e) {
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
  h_ = function (e) {
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
          u = (((s & 7) << 18) | ((i & 63) << 12) | ((a & 63) << 6) | (l & 63)) - 65536
        ;((t[r++] = String.fromCharCode(55296 + (u >> 10))),
          (t[r++] = String.fromCharCode(56320 + (u & 1023))))
      } else {
        const i = e[n++],
          a = e[n++]
        t[r++] = String.fromCharCode(((s & 15) << 12) | ((i & 63) << 6) | (a & 63))
      }
    }
    return t.join('')
  },
  Ja = {
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
          u = s + 2 < e.length,
          f = u ? e[s + 2] : 0,
          p = i >> 2,
          _ = ((i & 3) << 4) | (l >> 4)
        let w = ((l & 15) << 2) | (f >> 6),
          P = f & 63
        ;(u || ((P = 64), a || (w = 64)), r.push(n[p], n[_], n[w], n[P]))
      }
      return r.join('')
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Sf(e), t)
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : h_(this.decodeStringToByteArray(e, t))
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
        const _ = s < e.length ? n[e.charAt(s)] : 64
        if ((++s, i == null || l == null || f == null || _ == null)) throw new f_()
        const w = (i << 2) | (l >> 4)
        if ((r.push(w), f !== 64)) {
          const P = ((l << 4) & 240) | (f >> 2)
          if ((r.push(P), _ !== 64)) {
            const O = ((f << 6) & 192) | _
            r.push(O)
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
class f_ extends Error {
  constructor() {
    ;(super(...arguments), (this.name = 'DecodeBase64StringError'))
  }
}
const d_ = function (e) {
    const t = Sf(e)
    return Ja.encodeByteArray(t, !0)
  },
  Di = function (e) {
    return d_(e).replace(/\./g, '')
  },
  p_ = function (e) {
    try {
      return Ja.decodeString(e, !0)
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
 */ function Cf() {
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
 */ const m_ = () => Cf().__FIREBASE_DEFAULTS__,
  g_ = () => {
    if (typeof process > 'u' || typeof gc > 'u') return
    const e = gc.__FIREBASE_DEFAULTS__
    if (e) return JSON.parse(e)
  },
  __ = () => {
    if (typeof document > 'u') return
    let e
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch {
      return
    }
    const t = e && p_(e[1])
    return t && JSON.parse(t)
  },
  Za = () => {
    try {
      return m_() || g_() || __()
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)
      return
    }
  },
  y_ = (e) => {
    var t, n
    return (n = (t = Za()) === null || t === void 0 ? void 0 : t.emulatorHosts) === null ||
      n === void 0
      ? void 0
      : n[e]
  },
  kf = (e) => {
    const t = y_(e)
    if (!t) return
    const n = t.lastIndexOf(':')
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`)
    const r = parseInt(t.substring(n + 1), 10)
    return t[0] === '[' ? [t.substring(1, n - 1), r] : [t.substring(0, n), r]
  },
  Vf = () => {
    var e
    return (e = Za()) === null || e === void 0 ? void 0 : e.config
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
 */ class As {
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
 */ function Df(e, t) {
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
  return [Di(JSON.stringify(n)), Di(JSON.stringify(a)), ''].join('.')
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
 */ function v_() {
  return typeof navigator < 'u' && typeof navigator.userAgent == 'string' ? navigator.userAgent : ''
}
function E_() {
  var e
  const t = (e = Za()) === null || e === void 0 ? void 0 : e.forceEnvironment
  if (t === 'node') return !0
  if (t === 'browser') return !1
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch {
    return !1
  }
}
function T_() {
  return (
    !E_() &&
    !!navigator.userAgent &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  )
}
function tl() {
  try {
    return typeof indexedDB == 'object'
  } catch {
    return !1
  }
}
function b_() {
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
 */ const w_ = 'FirebaseError'
class er extends Error {
  constructor(t, n, r) {
    ;(super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = w_),
      Object.setPrototypeOf(this, er.prototype),
      Error.captureStackTrace && Error.captureStackTrace(this, el.prototype.create))
  }
}
class el {
  constructor(t, n, r) {
    ;((this.service = t), (this.serviceName = n), (this.errors = r))
  }
  create(t, ...n) {
    const r = n[0] || {},
      s = `${this.service}/${t}`,
      i = this.errors[t],
      a = i ? A_(i, r) : 'Error',
      l = `${this.serviceName}: ${a} (${s}).`
    return new er(s, l, r)
  }
}
function A_(e, t) {
  return e.replace(I_, (n, r) => {
    const s = t[r]
    return s != null ? String(s) : `<${r}?>`
  })
}
const I_ = /\{\$([^}]+)}/g
function fa(e, t) {
  if (e === t) return !0
  const n = Object.keys(e),
    r = Object.keys(t)
  for (const s of n) {
    if (!r.includes(s)) return !1
    const i = e[s],
      a = t[s]
    if (_c(i) && _c(a)) {
      if (!fa(i, a)) return !1
    } else if (i !== a) return !1
  }
  for (const s of r) if (!n.includes(s)) return !1
  return !0
}
function _c(e) {
  return e !== null && typeof e == 'object'
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
 */ const R_ = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (e) => {
    const t = (Math.random() * 16) | 0
    return (e === 'x' ? t : (t & 3) | 8).toString(16)
  })
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
 */ const x_ = 1e3,
  P_ = 2,
  S_ = 14400 * 1e3,
  C_ = 0.5
function k_(e, t = x_, n = P_) {
  const r = t * Math.pow(n, e),
    s = Math.round(C_ * r * (Math.random() - 0.5) * 2)
  return Math.min(S_, r + s)
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
 */ function Qn(e) {
  return e && e._delegate ? e._delegate : e
}
class Cn {
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
 */ const Kn = '[DEFAULT]'
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
 */ class V_ {
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
      const r = new As()
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
      if (N_(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: Kn })
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
  clearInstance(t = Kn) {
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
  isInitialized(t = Kn) {
    return this.instances.has(t)
  }
  getOptions(t = Kn) {
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
        instanceIdentifier: D_(t),
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
  normalizeInstanceIdentifier(t = Kn) {
    return this.component ? (this.component.multipleInstances ? t : Kn) : t
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== 'EXPLICIT'
  }
}
function D_(e) {
  return e === Kn ? void 0 : e
}
function N_(e) {
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
 */ class O_ {
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
    const n = new V_(t, this)
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
 */ var ft
;(function (e) {
  ;((e[(e.DEBUG = 0)] = 'DEBUG'),
    (e[(e.VERBOSE = 1)] = 'VERBOSE'),
    (e[(e.INFO = 2)] = 'INFO'),
    (e[(e.WARN = 3)] = 'WARN'),
    (e[(e.ERROR = 4)] = 'ERROR'),
    (e[(e.SILENT = 5)] = 'SILENT'))
})(ft || (ft = {}))
const M_ = {
    debug: ft.DEBUG,
    verbose: ft.VERBOSE,
    info: ft.INFO,
    warn: ft.WARN,
    error: ft.ERROR,
    silent: ft.SILENT
  },
  L_ = ft.INFO,
  F_ = {
    [ft.DEBUG]: 'log',
    [ft.VERBOSE]: 'log',
    [ft.INFO]: 'info',
    [ft.WARN]: 'warn',
    [ft.ERROR]: 'error'
  },
  U_ = (e, t, ...n) => {
    if (t < e.logLevel) return
    const r = new Date().toISOString(),
      s = F_[t]
    if (s) console[s](`[${r}]  ${e.name}:`, ...n)
    else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)
  }
class nl {
  constructor(t) {
    ;((this.name = t),
      (this._logLevel = L_),
      (this._logHandler = U_),
      (this._userLogHandler = null))
  }
  get logLevel() {
    return this._logLevel
  }
  set logLevel(t) {
    if (!(t in ft)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``)
    this._logLevel = t
  }
  setLogLevel(t) {
    this._logLevel = typeof t == 'string' ? M_[t] : t
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
    ;(this._userLogHandler && this._userLogHandler(this, ft.DEBUG, ...t),
      this._logHandler(this, ft.DEBUG, ...t))
  }
  log(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ft.VERBOSE, ...t),
      this._logHandler(this, ft.VERBOSE, ...t))
  }
  info(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ft.INFO, ...t),
      this._logHandler(this, ft.INFO, ...t))
  }
  warn(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ft.WARN, ...t),
      this._logHandler(this, ft.WARN, ...t))
  }
  error(...t) {
    ;(this._userLogHandler && this._userLogHandler(this, ft.ERROR, ...t),
      this._logHandler(this, ft.ERROR, ...t))
  }
}
const B_ = (e, t) => t.some((n) => e instanceof n)
let yc, vc
function j_() {
  return yc || (yc = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function $_() {
  return (
    vc ||
    (vc = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ])
  )
}
const Nf = new WeakMap(),
  da = new WeakMap(),
  Of = new WeakMap(),
  qo = new WeakMap(),
  rl = new WeakMap()
function q_(e) {
  const t = new Promise((n, r) => {
    const s = () => {
        ;(e.removeEventListener('success', i), e.removeEventListener('error', a))
      },
      i = () => {
        ;(n(wn(e.result)), s())
      },
      a = () => {
        ;(r(e.error), s())
      }
    ;(e.addEventListener('success', i), e.addEventListener('error', a))
  })
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && Nf.set(n, e)
      })
      .catch(() => {}),
    rl.set(t, e),
    t
  )
}
function K_(e) {
  if (da.has(e)) return
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
  da.set(e, t)
}
let pa = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === 'done') return da.get(e)
      if (t === 'objectStoreNames') return e.objectStoreNames || Of.get(e)
      if (t === 'store')
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
    }
    return wn(e[t])
  },
  set(e, t, n) {
    return ((e[t] = n), !0)
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === 'done' || t === 'store') ? !0 : t in e
  }
}
function H_(e) {
  pa = e(pa)
}
function z_(e) {
  return e === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(Ko(this), t, ...n)
        return (Of.set(r, t.sort ? t.sort() : [t]), wn(r))
      }
    : $_().includes(e)
      ? function (...t) {
          return (e.apply(Ko(this), t), wn(Nf.get(this)))
        }
      : function (...t) {
          return wn(e.apply(Ko(this), t))
        }
}
function W_(e) {
  return typeof e == 'function'
    ? z_(e)
    : (e instanceof IDBTransaction && K_(e), B_(e, j_()) ? new Proxy(e, pa) : e)
}
function wn(e) {
  if (e instanceof IDBRequest) return q_(e)
  if (qo.has(e)) return qo.get(e)
  const t = W_(e)
  return (t !== e && (qo.set(e, t), rl.set(t, e)), t)
}
const Ko = (e) => rl.get(e)
function G_(e, t, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
  const a = indexedDB.open(e, t),
    l = wn(a)
  return (
    r &&
      a.addEventListener('upgradeneeded', (u) => {
        r(wn(a.result), u.oldVersion, u.newVersion, wn(a.transaction), u)
      }),
    n && a.addEventListener('blocked', (u) => n(u.oldVersion, u.newVersion, u)),
    l
      .then((u) => {
        ;(i && u.addEventListener('close', () => i()),
          s && u.addEventListener('versionchange', (f) => s(f.oldVersion, f.newVersion, f)))
      })
      .catch(() => {}),
    l
  )
}
const Q_ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Y_ = ['put', 'add', 'delete', 'clear'],
  Ho = new Map()
function Ec(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == 'string')) return
  if (Ho.get(t)) return Ho.get(t)
  const n = t.replace(/FromIndex$/, ''),
    r = t !== n,
    s = Y_.includes(n)
  if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Q_.includes(n))) return
  const i = async function (a, ...l) {
    const u = this.transaction(a, s ? 'readwrite' : 'readonly')
    let f = u.store
    return (r && (f = f.index(l.shift())), (await Promise.all([f[n](...l), s && u.done]))[0])
  }
  return (Ho.set(t, i), i)
}
H_((e) => ({
  ...e,
  get: (t, n, r) => Ec(t, n) || e.get(t, n, r),
  has: (t, n) => !!Ec(t, n) || e.has(t, n)
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
 */ class X_ {
  constructor(t) {
    this.container = t
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (J_(n)) {
          const r = n.getImmediate()
          return `${r.library}/${r.version}`
        } else return null
      })
      .filter((n) => n)
      .join(' ')
  }
}
function J_(e) {
  const t = e.getComponent()
  return (t == null ? void 0 : t.type) === 'VERSION'
}
const ma = '@firebase/app',
  Tc = '0.10.13'
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
 */ const fn = new nl('@firebase/app'),
  Z_ = '@firebase/app-compat',
  ty = '@firebase/analytics-compat',
  ey = '@firebase/analytics',
  ny = '@firebase/app-check-compat',
  ry = '@firebase/app-check',
  sy = '@firebase/auth',
  iy = '@firebase/auth-compat',
  oy = '@firebase/database',
  ay = '@firebase/data-connect',
  ly = '@firebase/database-compat',
  uy = '@firebase/functions',
  cy = '@firebase/functions-compat',
  hy = '@firebase/installations',
  fy = '@firebase/installations-compat',
  dy = '@firebase/messaging',
  py = '@firebase/messaging-compat',
  my = '@firebase/performance',
  gy = '@firebase/performance-compat',
  _y = '@firebase/remote-config',
  yy = '@firebase/remote-config-compat',
  vy = '@firebase/storage',
  Ey = '@firebase/storage-compat',
  Ty = '@firebase/firestore',
  by = '@firebase/vertexai-preview',
  wy = '@firebase/firestore-compat',
  Ay = 'firebase',
  Iy = '10.14.1'
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
 */ const ga = '[DEFAULT]',
  Ry = {
    [ma]: 'fire-core',
    [Z_]: 'fire-core-compat',
    [ey]: 'fire-analytics',
    [ty]: 'fire-analytics-compat',
    [ry]: 'fire-app-check',
    [ny]: 'fire-app-check-compat',
    [sy]: 'fire-auth',
    [iy]: 'fire-auth-compat',
    [oy]: 'fire-rtdb',
    [ay]: 'fire-data-connect',
    [ly]: 'fire-rtdb-compat',
    [uy]: 'fire-fn',
    [cy]: 'fire-fn-compat',
    [hy]: 'fire-iid',
    [fy]: 'fire-iid-compat',
    [dy]: 'fire-fcm',
    [py]: 'fire-fcm-compat',
    [my]: 'fire-perf',
    [gy]: 'fire-perf-compat',
    [_y]: 'fire-rc',
    [yy]: 'fire-rc-compat',
    [vy]: 'fire-gcs',
    [Ey]: 'fire-gcs-compat',
    [Ty]: 'fire-fst',
    [wy]: 'fire-fst-compat',
    [by]: 'fire-vertex',
    'fire-js': 'fire-js',
    [Ay]: 'fire-js-all'
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
 */ const Ni = new Map(),
  xy = new Map(),
  _a = new Map()
function bc(e, t) {
  try {
    e.container.addComponent(t)
  } catch (n) {
    fn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n)
  }
}
function Yn(e) {
  const t = e.name
  if (_a.has(t)) return (fn.debug(`There were multiple attempts to register component ${t}.`), !1)
  _a.set(t, e)
  for (const n of Ni.values()) bc(n, e)
  for (const n of xy.values()) bc(n, e)
  return !0
}
function ro(e, t) {
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
 */ const Py = {
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
  An = new el('app', 'Firebase', Py)
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
 */ class Sy {
  constructor(t, n, r) {
    ;((this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new Cn('app', () => this, 'PUBLIC')))
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
    if (this.isDeleted) throw An.create('app-deleted', { appName: this._name })
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
 */ const Mf = Iy
function Lf(e, t = {}) {
  let n = e
  typeof t != 'object' && (t = { name: t })
  const r = Object.assign({ name: ga, automaticDataCollectionEnabled: !1 }, t),
    s = r.name
  if (typeof s != 'string' || !s) throw An.create('bad-app-name', { appName: String(s) })
  if ((n || (n = Vf()), !n)) throw An.create('no-options')
  const i = Ni.get(s)
  if (i) {
    if (fa(n, i.options) && fa(r, i.config)) return i
    throw An.create('duplicate-app', { appName: s })
  }
  const a = new O_(s)
  for (const u of _a.values()) a.addComponent(u)
  const l = new Sy(n, r, a)
  return (Ni.set(s, l), l)
}
function sl(e = ga) {
  const t = Ni.get(e)
  if (!t && e === ga && Vf()) return Lf()
  if (!t) throw An.create('no-app', { appName: e })
  return t
}
function an(e, t, n) {
  var r
  let s = (r = Ry[e]) !== null && r !== void 0 ? r : e
  n && (s += `-${n}`)
  const i = s.match(/\s|\//),
    a = t.match(/\s|\//)
  if (i || a) {
    const l = [`Unable to register library "${s}" with version "${t}":`]
    ;(i && l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
      i && a && l.push('and'),
      a && l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
      fn.warn(l.join(' ')))
    return
  }
  Yn(new Cn(`${s}-version`, () => ({ library: s, version: t }), 'VERSION'))
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
 */ const Cy = 'firebase-heartbeat-database',
  ky = 1,
  Is = 'firebase-heartbeat-store'
let zo = null
function Ff() {
  return (
    zo ||
      (zo = G_(Cy, ky, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              try {
                e.createObjectStore(Is)
              } catch (n) {
                console.warn(n)
              }
          }
        }
      }).catch((e) => {
        throw An.create('idb-open', { originalErrorMessage: e.message })
      })),
    zo
  )
}
async function Vy(e) {
  try {
    const n = (await Ff()).transaction(Is),
      r = await n.objectStore(Is).get(Uf(e))
    return (await n.done, r)
  } catch (t) {
    if (t instanceof er) fn.warn(t.message)
    else {
      const n = An.create('idb-get', { originalErrorMessage: t == null ? void 0 : t.message })
      fn.warn(n.message)
    }
  }
}
async function wc(e, t) {
  try {
    const r = (await Ff()).transaction(Is, 'readwrite')
    ;(await r.objectStore(Is).put(t, Uf(e)), await r.done)
  } catch (n) {
    if (n instanceof er) fn.warn(n.message)
    else {
      const r = An.create('idb-set', { originalErrorMessage: n == null ? void 0 : n.message })
      fn.warn(r.message)
    }
  }
}
function Uf(e) {
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
 */ const Dy = 1024,
  Ny = 720 * 60 * 60 * 1e3
class Oy {
  constructor(t) {
    ;((this.container = t), (this._heartbeatsCache = null))
    const n = this.container.getProvider('app').getImmediate()
    ;((this._storage = new Ly(n)),
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
        i = Ac()
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
            return Date.now() - l <= Ny
          })),
          this._storage.overwrite(this._heartbeatsCache))
    } catch (r) {
      fn.warn(r)
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
      const n = Ac(),
        { heartbeatsToSend: r, unsentEntries: s } = My(this._heartbeatsCache.heartbeats),
        i = Di(JSON.stringify({ version: 2, heartbeats: r }))
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
      return (fn.warn(n), '')
    }
  }
}
function Ac() {
  return new Date().toISOString().substring(0, 10)
}
function My(e, t = Dy) {
  const n = []
  let r = e.slice()
  for (const s of e) {
    const i = n.find((a) => a.agent === s.agent)
    if (i) {
      if ((i.dates.push(s.date), Ic(n) > t)) {
        i.dates.pop()
        break
      }
    } else if ((n.push({ agent: s.agent, dates: [s.date] }), Ic(n) > t)) {
      n.pop()
      break
    }
    r = r.slice(1)
  }
  return { heartbeatsToSend: n, unsentEntries: r }
}
class Ly {
  constructor(t) {
    ;((this.app = t), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()))
  }
  async runIndexedDBEnvironmentCheck() {
    return tl()
      ? b_()
          .then(() => !0)
          .catch(() => !1)
      : !1
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await Vy(this.app)
      return n != null && n.heartbeats ? n : { heartbeats: [] }
    } else return { heartbeats: [] }
  }
  async overwrite(t) {
    var n
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read()
      return wc(this.app, {
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
      return wc(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0 ? n : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...t.heartbeats]
      })
    } else return
  }
}
function Ic(e) {
  return Di(JSON.stringify({ version: 2, heartbeats: e })).length
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
 */ function Fy(e) {
  ;(Yn(new Cn('platform-logger', (t) => new X_(t), 'PRIVATE')),
    Yn(new Cn('heartbeat', (t) => new Oy(t), 'PRIVATE')),
    an(ma, Tc, e),
    an(ma, Tc, 'esm2017'),
    an('fire-js', ''))
}
Fy('')
var Uy = 'firebase',
  By = '10.14.1'
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
 */ an(Uy, By, 'app')
var Rc =
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
*/ var Gn, Bf
;(function () {
  var e
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ function t(A, y) {
    function v() {}
    ;((v.prototype = y.prototype),
      (A.D = y.prototype),
      (A.prototype = new v()),
      (A.prototype.constructor = A),
      (A.C = function (d, g, R) {
        for (var T = Array(arguments.length - 2), ge = 2; ge < arguments.length; ge++)
          T[ge - 2] = arguments[ge]
        return y.prototype[g].apply(d, T)
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
  function s(A, y, v) {
    v || (v = 0)
    var d = Array(16)
    if (typeof y == 'string')
      for (var g = 0; 16 > g; ++g)
        d[g] =
          y.charCodeAt(v++) |
          (y.charCodeAt(v++) << 8) |
          (y.charCodeAt(v++) << 16) |
          (y.charCodeAt(v++) << 24)
    else for (g = 0; 16 > g; ++g) d[g] = y[v++] | (y[v++] << 8) | (y[v++] << 16) | (y[v++] << 24)
    ;((y = A.g[0]), (v = A.g[1]), (g = A.g[2]))
    var R = A.g[3],
      T = (y + (R ^ (v & (g ^ R))) + d[0] + 3614090360) & 4294967295
    ;((y = v + (((T << 7) & 4294967295) | (T >>> 25))),
      (T = (R + (g ^ (y & (v ^ g))) + d[1] + 3905402710) & 4294967295),
      (R = y + (((T << 12) & 4294967295) | (T >>> 20))),
      (T = (g + (v ^ (R & (y ^ v))) + d[2] + 606105819) & 4294967295),
      (g = R + (((T << 17) & 4294967295) | (T >>> 15))),
      (T = (v + (y ^ (g & (R ^ y))) + d[3] + 3250441966) & 4294967295),
      (v = g + (((T << 22) & 4294967295) | (T >>> 10))),
      (T = (y + (R ^ (v & (g ^ R))) + d[4] + 4118548399) & 4294967295),
      (y = v + (((T << 7) & 4294967295) | (T >>> 25))),
      (T = (R + (g ^ (y & (v ^ g))) + d[5] + 1200080426) & 4294967295),
      (R = y + (((T << 12) & 4294967295) | (T >>> 20))),
      (T = (g + (v ^ (R & (y ^ v))) + d[6] + 2821735955) & 4294967295),
      (g = R + (((T << 17) & 4294967295) | (T >>> 15))),
      (T = (v + (y ^ (g & (R ^ y))) + d[7] + 4249261313) & 4294967295),
      (v = g + (((T << 22) & 4294967295) | (T >>> 10))),
      (T = (y + (R ^ (v & (g ^ R))) + d[8] + 1770035416) & 4294967295),
      (y = v + (((T << 7) & 4294967295) | (T >>> 25))),
      (T = (R + (g ^ (y & (v ^ g))) + d[9] + 2336552879) & 4294967295),
      (R = y + (((T << 12) & 4294967295) | (T >>> 20))),
      (T = (g + (v ^ (R & (y ^ v))) + d[10] + 4294925233) & 4294967295),
      (g = R + (((T << 17) & 4294967295) | (T >>> 15))),
      (T = (v + (y ^ (g & (R ^ y))) + d[11] + 2304563134) & 4294967295),
      (v = g + (((T << 22) & 4294967295) | (T >>> 10))),
      (T = (y + (R ^ (v & (g ^ R))) + d[12] + 1804603682) & 4294967295),
      (y = v + (((T << 7) & 4294967295) | (T >>> 25))),
      (T = (R + (g ^ (y & (v ^ g))) + d[13] + 4254626195) & 4294967295),
      (R = y + (((T << 12) & 4294967295) | (T >>> 20))),
      (T = (g + (v ^ (R & (y ^ v))) + d[14] + 2792965006) & 4294967295),
      (g = R + (((T << 17) & 4294967295) | (T >>> 15))),
      (T = (v + (y ^ (g & (R ^ y))) + d[15] + 1236535329) & 4294967295),
      (v = g + (((T << 22) & 4294967295) | (T >>> 10))),
      (T = (y + (g ^ (R & (v ^ g))) + d[1] + 4129170786) & 4294967295),
      (y = v + (((T << 5) & 4294967295) | (T >>> 27))),
      (T = (R + (v ^ (g & (y ^ v))) + d[6] + 3225465664) & 4294967295),
      (R = y + (((T << 9) & 4294967295) | (T >>> 23))),
      (T = (g + (y ^ (v & (R ^ y))) + d[11] + 643717713) & 4294967295),
      (g = R + (((T << 14) & 4294967295) | (T >>> 18))),
      (T = (v + (R ^ (y & (g ^ R))) + d[0] + 3921069994) & 4294967295),
      (v = g + (((T << 20) & 4294967295) | (T >>> 12))),
      (T = (y + (g ^ (R & (v ^ g))) + d[5] + 3593408605) & 4294967295),
      (y = v + (((T << 5) & 4294967295) | (T >>> 27))),
      (T = (R + (v ^ (g & (y ^ v))) + d[10] + 38016083) & 4294967295),
      (R = y + (((T << 9) & 4294967295) | (T >>> 23))),
      (T = (g + (y ^ (v & (R ^ y))) + d[15] + 3634488961) & 4294967295),
      (g = R + (((T << 14) & 4294967295) | (T >>> 18))),
      (T = (v + (R ^ (y & (g ^ R))) + d[4] + 3889429448) & 4294967295),
      (v = g + (((T << 20) & 4294967295) | (T >>> 12))),
      (T = (y + (g ^ (R & (v ^ g))) + d[9] + 568446438) & 4294967295),
      (y = v + (((T << 5) & 4294967295) | (T >>> 27))),
      (T = (R + (v ^ (g & (y ^ v))) + d[14] + 3275163606) & 4294967295),
      (R = y + (((T << 9) & 4294967295) | (T >>> 23))),
      (T = (g + (y ^ (v & (R ^ y))) + d[3] + 4107603335) & 4294967295),
      (g = R + (((T << 14) & 4294967295) | (T >>> 18))),
      (T = (v + (R ^ (y & (g ^ R))) + d[8] + 1163531501) & 4294967295),
      (v = g + (((T << 20) & 4294967295) | (T >>> 12))),
      (T = (y + (g ^ (R & (v ^ g))) + d[13] + 2850285829) & 4294967295),
      (y = v + (((T << 5) & 4294967295) | (T >>> 27))),
      (T = (R + (v ^ (g & (y ^ v))) + d[2] + 4243563512) & 4294967295),
      (R = y + (((T << 9) & 4294967295) | (T >>> 23))),
      (T = (g + (y ^ (v & (R ^ y))) + d[7] + 1735328473) & 4294967295),
      (g = R + (((T << 14) & 4294967295) | (T >>> 18))),
      (T = (v + (R ^ (y & (g ^ R))) + d[12] + 2368359562) & 4294967295),
      (v = g + (((T << 20) & 4294967295) | (T >>> 12))),
      (T = (y + (v ^ g ^ R) + d[5] + 4294588738) & 4294967295),
      (y = v + (((T << 4) & 4294967295) | (T >>> 28))),
      (T = (R + (y ^ v ^ g) + d[8] + 2272392833) & 4294967295),
      (R = y + (((T << 11) & 4294967295) | (T >>> 21))),
      (T = (g + (R ^ y ^ v) + d[11] + 1839030562) & 4294967295),
      (g = R + (((T << 16) & 4294967295) | (T >>> 16))),
      (T = (v + (g ^ R ^ y) + d[14] + 4259657740) & 4294967295),
      (v = g + (((T << 23) & 4294967295) | (T >>> 9))),
      (T = (y + (v ^ g ^ R) + d[1] + 2763975236) & 4294967295),
      (y = v + (((T << 4) & 4294967295) | (T >>> 28))),
      (T = (R + (y ^ v ^ g) + d[4] + 1272893353) & 4294967295),
      (R = y + (((T << 11) & 4294967295) | (T >>> 21))),
      (T = (g + (R ^ y ^ v) + d[7] + 4139469664) & 4294967295),
      (g = R + (((T << 16) & 4294967295) | (T >>> 16))),
      (T = (v + (g ^ R ^ y) + d[10] + 3200236656) & 4294967295),
      (v = g + (((T << 23) & 4294967295) | (T >>> 9))),
      (T = (y + (v ^ g ^ R) + d[13] + 681279174) & 4294967295),
      (y = v + (((T << 4) & 4294967295) | (T >>> 28))),
      (T = (R + (y ^ v ^ g) + d[0] + 3936430074) & 4294967295),
      (R = y + (((T << 11) & 4294967295) | (T >>> 21))),
      (T = (g + (R ^ y ^ v) + d[3] + 3572445317) & 4294967295),
      (g = R + (((T << 16) & 4294967295) | (T >>> 16))),
      (T = (v + (g ^ R ^ y) + d[6] + 76029189) & 4294967295),
      (v = g + (((T << 23) & 4294967295) | (T >>> 9))),
      (T = (y + (v ^ g ^ R) + d[9] + 3654602809) & 4294967295),
      (y = v + (((T << 4) & 4294967295) | (T >>> 28))),
      (T = (R + (y ^ v ^ g) + d[12] + 3873151461) & 4294967295),
      (R = y + (((T << 11) & 4294967295) | (T >>> 21))),
      (T = (g + (R ^ y ^ v) + d[15] + 530742520) & 4294967295),
      (g = R + (((T << 16) & 4294967295) | (T >>> 16))),
      (T = (v + (g ^ R ^ y) + d[2] + 3299628645) & 4294967295),
      (v = g + (((T << 23) & 4294967295) | (T >>> 9))),
      (T = (y + (g ^ (v | ~R)) + d[0] + 4096336452) & 4294967295),
      (y = v + (((T << 6) & 4294967295) | (T >>> 26))),
      (T = (R + (v ^ (y | ~g)) + d[7] + 1126891415) & 4294967295),
      (R = y + (((T << 10) & 4294967295) | (T >>> 22))),
      (T = (g + (y ^ (R | ~v)) + d[14] + 2878612391) & 4294967295),
      (g = R + (((T << 15) & 4294967295) | (T >>> 17))),
      (T = (v + (R ^ (g | ~y)) + d[5] + 4237533241) & 4294967295),
      (v = g + (((T << 21) & 4294967295) | (T >>> 11))),
      (T = (y + (g ^ (v | ~R)) + d[12] + 1700485571) & 4294967295),
      (y = v + (((T << 6) & 4294967295) | (T >>> 26))),
      (T = (R + (v ^ (y | ~g)) + d[3] + 2399980690) & 4294967295),
      (R = y + (((T << 10) & 4294967295) | (T >>> 22))),
      (T = (g + (y ^ (R | ~v)) + d[10] + 4293915773) & 4294967295),
      (g = R + (((T << 15) & 4294967295) | (T >>> 17))),
      (T = (v + (R ^ (g | ~y)) + d[1] + 2240044497) & 4294967295),
      (v = g + (((T << 21) & 4294967295) | (T >>> 11))),
      (T = (y + (g ^ (v | ~R)) + d[8] + 1873313359) & 4294967295),
      (y = v + (((T << 6) & 4294967295) | (T >>> 26))),
      (T = (R + (v ^ (y | ~g)) + d[15] + 4264355552) & 4294967295),
      (R = y + (((T << 10) & 4294967295) | (T >>> 22))),
      (T = (g + (y ^ (R | ~v)) + d[6] + 2734768916) & 4294967295),
      (g = R + (((T << 15) & 4294967295) | (T >>> 17))),
      (T = (v + (R ^ (g | ~y)) + d[13] + 1309151649) & 4294967295),
      (v = g + (((T << 21) & 4294967295) | (T >>> 11))),
      (T = (y + (g ^ (v | ~R)) + d[4] + 4149444226) & 4294967295),
      (y = v + (((T << 6) & 4294967295) | (T >>> 26))),
      (T = (R + (v ^ (y | ~g)) + d[11] + 3174756917) & 4294967295),
      (R = y + (((T << 10) & 4294967295) | (T >>> 22))),
      (T = (g + (y ^ (R | ~v)) + d[2] + 718787259) & 4294967295),
      (g = R + (((T << 15) & 4294967295) | (T >>> 17))),
      (T = (v + (R ^ (g | ~y)) + d[9] + 3951481745) & 4294967295),
      (A.g[0] = (A.g[0] + y) & 4294967295),
      (A.g[1] = (A.g[1] + (g + (((T << 21) & 4294967295) | (T >>> 11)))) & 4294967295),
      (A.g[2] = (A.g[2] + g) & 4294967295),
      (A.g[3] = (A.g[3] + R) & 4294967295))
  }
  ;((r.prototype.u = function (A, y) {
    y === void 0 && (y = A.length)
    for (var v = y - this.blockSize, d = this.B, g = this.h, R = 0; R < y; ) {
      if (g == 0) for (; R <= v; ) (s(this, A, R), (R += this.blockSize))
      if (typeof A == 'string') {
        for (; R < y; )
          if (((d[g++] = A.charCodeAt(R++)), g == this.blockSize)) {
            ;(s(this, d), (g = 0))
            break
          }
      } else
        for (; R < y; )
          if (((d[g++] = A[R++]), g == this.blockSize)) {
            ;(s(this, d), (g = 0))
            break
          }
    }
    ;((this.h = g), (this.o += y))
  }),
    (r.prototype.v = function () {
      var A = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h)
      A[0] = 128
      for (var y = 1; y < A.length - 8; ++y) A[y] = 0
      var v = 8 * this.o
      for (y = A.length - 8; y < A.length; ++y) ((A[y] = v & 255), (v /= 256))
      for (this.u(A), A = Array(16), y = v = 0; 4 > y; ++y)
        for (var d = 0; 32 > d; d += 8) A[v++] = (this.g[y] >>> d) & 255
      return A
    }))
  function i(A, y) {
    var v = l
    return Object.prototype.hasOwnProperty.call(v, A) ? v[A] : (v[A] = y(A))
  }
  function a(A, y) {
    this.h = y
    for (var v = [], d = !0, g = A.length - 1; 0 <= g; g--) {
      var R = A[g] | 0
      ;(d && R == y) || ((v[g] = R), (d = !1))
    }
    this.g = v
  }
  var l = {}
  function u(A) {
    return -128 <= A && 128 > A
      ? i(A, function (y) {
          return new a([y | 0], 0 > y ? -1 : 0)
        })
      : new a([A | 0], 0 > A ? -1 : 0)
  }
  function f(A) {
    if (isNaN(A) || !isFinite(A)) return _
    if (0 > A) return D(f(-A))
    for (var y = [], v = 1, d = 0; A >= v; d++) ((y[d] = (A / v) | 0), (v *= 4294967296))
    return new a(y, 0)
  }
  function p(A, y) {
    if (A.length == 0) throw Error('number format error: empty string')
    if (((y = y || 10), 2 > y || 36 < y)) throw Error('radix out of range: ' + y)
    if (A.charAt(0) == '-') return D(p(A.substring(1), y))
    if (0 <= A.indexOf('-')) throw Error('number format error: interior "-" character')
    for (var v = f(Math.pow(y, 8)), d = _, g = 0; g < A.length; g += 8) {
      var R = Math.min(8, A.length - g),
        T = parseInt(A.substring(g, g + R), y)
      8 > R ? ((R = f(Math.pow(y, R))), (d = d.j(R).add(f(T)))) : ((d = d.j(v)), (d = d.add(f(T))))
    }
    return d
  }
  var _ = u(0),
    w = u(1),
    P = u(16777216)
  ;((e = a.prototype),
    (e.m = function () {
      if (k(this)) return -D(this).m()
      for (var A = 0, y = 1, v = 0; v < this.g.length; v++) {
        var d = this.i(v)
        ;((A += (0 <= d ? d : 4294967296 + d) * y), (y *= 4294967296))
      }
      return A
    }),
    (e.toString = function (A) {
      if (((A = A || 10), 2 > A || 36 < A)) throw Error('radix out of range: ' + A)
      if (O(this)) return '0'
      if (k(this)) return '-' + D(this).toString(A)
      for (var y = f(Math.pow(A, 6)), v = this, d = ''; ; ) {
        var g = q(v, y).g
        v = Q(v, g.j(y))
        var R = ((0 < v.g.length ? v.g[0] : v.h) >>> 0).toString(A)
        if (((v = g), O(v))) return R + d
        for (; 6 > R.length; ) R = '0' + R
        d = R + d
      }
    }),
    (e.i = function (A) {
      return 0 > A ? 0 : A < this.g.length ? this.g[A] : this.h
    }))
  function O(A) {
    if (A.h != 0) return !1
    for (var y = 0; y < A.g.length; y++) if (A.g[y] != 0) return !1
    return !0
  }
  function k(A) {
    return A.h == -1
  }
  e.l = function (A) {
    return ((A = Q(this, A)), k(A) ? -1 : O(A) ? 0 : 1)
  }
  function D(A) {
    for (var y = A.g.length, v = [], d = 0; d < y; d++) v[d] = ~A.g[d]
    return new a(v, ~A.h).add(w)
  }
  ;((e.abs = function () {
    return k(this) ? D(this) : this
  }),
    (e.add = function (A) {
      for (var y = Math.max(this.g.length, A.g.length), v = [], d = 0, g = 0; g <= y; g++) {
        var R = d + (this.i(g) & 65535) + (A.i(g) & 65535),
          T = (R >>> 16) + (this.i(g) >>> 16) + (A.i(g) >>> 16)
        ;((d = T >>> 16), (R &= 65535), (T &= 65535), (v[g] = (T << 16) | R))
      }
      return new a(v, v[v.length - 1] & -2147483648 ? -1 : 0)
    }))
  function Q(A, y) {
    return A.add(D(y))
  }
  e.j = function (A) {
    if (O(this) || O(A)) return _
    if (k(this)) return k(A) ? D(this).j(D(A)) : D(D(this).j(A))
    if (k(A)) return D(this.j(D(A)))
    if (0 > this.l(P) && 0 > A.l(P)) return f(this.m() * A.m())
    for (var y = this.g.length + A.g.length, v = [], d = 0; d < 2 * y; d++) v[d] = 0
    for (d = 0; d < this.g.length; d++)
      for (var g = 0; g < A.g.length; g++) {
        var R = this.i(d) >>> 16,
          T = this.i(d) & 65535,
          ge = A.i(g) >>> 16,
          gn = A.i(g) & 65535
        ;((v[2 * d + 2 * g] += T * gn),
          W(v, 2 * d + 2 * g),
          (v[2 * d + 2 * g + 1] += R * gn),
          W(v, 2 * d + 2 * g + 1),
          (v[2 * d + 2 * g + 1] += T * ge),
          W(v, 2 * d + 2 * g + 1),
          (v[2 * d + 2 * g + 2] += R * ge),
          W(v, 2 * d + 2 * g + 2))
      }
    for (d = 0; d < y; d++) v[d] = (v[2 * d + 1] << 16) | v[2 * d]
    for (d = y; d < 2 * y; d++) v[d] = 0
    return new a(v, 0)
  }
  function W(A, y) {
    for (; (A[y] & 65535) != A[y]; ) ((A[y + 1] += A[y] >>> 16), (A[y] &= 65535), y++)
  }
  function H(A, y) {
    ;((this.g = A), (this.h = y))
  }
  function q(A, y) {
    if (O(y)) throw Error('division by zero')
    if (O(A)) return new H(_, _)
    if (k(A)) return ((y = q(D(A), y)), new H(D(y.g), D(y.h)))
    if (k(y)) return ((y = q(A, D(y))), new H(D(y.g), y.h))
    if (30 < A.g.length) {
      if (k(A) || k(y)) throw Error('slowDivide_ only works with positive integers.')
      for (var v = w, d = y; 0 >= d.l(A); ) ((v = lt(v)), (d = lt(d)))
      var g = dt(v, 1),
        R = dt(d, 1)
      for (d = dt(d, 2), v = dt(v, 2); !O(d); ) {
        var T = R.add(d)
        ;(0 >= T.l(A) && ((g = g.add(v)), (R = T)), (d = dt(d, 1)), (v = dt(v, 1)))
      }
      return ((y = Q(A, g.j(y))), new H(g, y))
    }
    for (g = _; 0 <= A.l(y); ) {
      for (
        v = Math.max(1, Math.floor(A.m() / y.m())),
          d = Math.ceil(Math.log(v) / Math.LN2),
          d = 48 >= d ? 1 : Math.pow(2, d - 48),
          R = f(v),
          T = R.j(y);
        k(T) || 0 < T.l(A);
      )
        ((v -= d), (R = f(v)), (T = R.j(y)))
      ;(O(R) && (R = w), (g = g.add(R)), (A = Q(A, T)))
    }
    return new H(g, A)
  }
  ;((e.A = function (A) {
    return q(this, A).h
  }),
    (e.and = function (A) {
      for (var y = Math.max(this.g.length, A.g.length), v = [], d = 0; d < y; d++)
        v[d] = this.i(d) & A.i(d)
      return new a(v, this.h & A.h)
    }),
    (e.or = function (A) {
      for (var y = Math.max(this.g.length, A.g.length), v = [], d = 0; d < y; d++)
        v[d] = this.i(d) | A.i(d)
      return new a(v, this.h | A.h)
    }),
    (e.xor = function (A) {
      for (var y = Math.max(this.g.length, A.g.length), v = [], d = 0; d < y; d++)
        v[d] = this.i(d) ^ A.i(d)
      return new a(v, this.h ^ A.h)
    }))
  function lt(A) {
    for (var y = A.g.length + 1, v = [], d = 0; d < y; d++)
      v[d] = (A.i(d) << 1) | (A.i(d - 1) >>> 31)
    return new a(v, A.h)
  }
  function dt(A, y) {
    var v = y >> 5
    y %= 32
    for (var d = A.g.length - v, g = [], R = 0; R < d; R++)
      g[R] = 0 < y ? (A.i(R + v) >>> y) | (A.i(R + v + 1) << (32 - y)) : A.i(R + v)
    return new a(g, A.h)
  }
  ;((r.prototype.digest = r.prototype.v),
    (r.prototype.reset = r.prototype.s),
    (r.prototype.update = r.prototype.u),
    (Bf = r),
    (a.prototype.add = a.prototype.add),
    (a.prototype.multiply = a.prototype.j),
    (a.prototype.modulo = a.prototype.A),
    (a.prototype.compare = a.prototype.l),
    (a.prototype.toNumber = a.prototype.m),
    (a.prototype.toString = a.prototype.toString),
    (a.prototype.getBits = a.prototype.i),
    (a.fromNumber = f),
    (a.fromString = p),
    (Gn = a))
}).apply(typeof Rc < 'u' ? Rc : typeof self < 'u' ? self : typeof window < 'u' ? window : {})
var ci =
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
*/ var jf, ss, $f, bi, ya, qf, Kf, Hf
;(function () {
  var e,
    t =
      typeof Object.defineProperties == 'function'
        ? Object.defineProperty
        : function (o, c, h) {
            return (o == Array.prototype || o == Object.prototype || (o[c] = h.value), o)
          }
  function n(o) {
    o = [
      typeof globalThis == 'object' && globalThis,
      o,
      typeof window == 'object' && window,
      typeof self == 'object' && self,
      typeof ci == 'object' && ci
    ]
    for (var c = 0; c < o.length; ++c) {
      var h = o[c]
      if (h && h.Math == Math) return h
    }
    throw Error('Cannot find global object')
  }
  var r = n(this)
  function s(o, c) {
    if (c)
      t: {
        var h = r
        o = o.split('.')
        for (var m = 0; m < o.length - 1; m++) {
          var x = o[m]
          if (!(x in h)) break t
          h = h[x]
        }
        ;((o = o[o.length - 1]),
          (m = h[o]),
          (c = c(m)),
          c != m && c != null && t(h, o, { configurable: !0, writable: !0, value: c }))
      }
  }
  function i(o, c) {
    o instanceof String && (o += '')
    var h = 0,
      m = !1,
      x = {
        next: function () {
          if (!m && h < o.length) {
            var S = h++
            return { value: c(S, o[S]), done: !1 }
          }
          return ((m = !0), { done: !0, value: void 0 })
        }
      }
    return (
      (x[Symbol.iterator] = function () {
        return x
      }),
      x
    )
  }
  s('Array.prototype.values', function (o) {
    return (
      o ||
      function () {
        return i(this, function (c, h) {
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
  function u(o) {
    var c = typeof o
    return (
      (c = c != 'object' ? c : o ? (Array.isArray(o) ? 'array' : c) : 'null'),
      c == 'array' || (c == 'object' && typeof o.length == 'number')
    )
  }
  function f(o) {
    var c = typeof o
    return (c == 'object' && o != null) || c == 'function'
  }
  function p(o, c, h) {
    return o.call.apply(o.bind, arguments)
  }
  function _(o, c, h) {
    if (!o) throw Error()
    if (2 < arguments.length) {
      var m = Array.prototype.slice.call(arguments, 2)
      return function () {
        var x = Array.prototype.slice.call(arguments)
        return (Array.prototype.unshift.apply(x, m), o.apply(c, x))
      }
    }
    return function () {
      return o.apply(c, arguments)
    }
  }
  function w(o, c, h) {
    return (
      (w =
        Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1
          ? p
          : _),
      w.apply(null, arguments)
    )
  }
  function P(o, c) {
    var h = Array.prototype.slice.call(arguments, 1)
    return function () {
      var m = h.slice()
      return (m.push.apply(m, arguments), o.apply(this, m))
    }
  }
  function O(o, c) {
    function h() {}
    ;((h.prototype = c.prototype),
      (o.aa = c.prototype),
      (o.prototype = new h()),
      (o.prototype.constructor = o),
      (o.Qb = function (m, x, S) {
        for (var $ = Array(arguments.length - 2), wt = 2; wt < arguments.length; wt++)
          $[wt - 2] = arguments[wt]
        return c.prototype[x].apply(m, $)
      }))
  }
  function k(o) {
    const c = o.length
    if (0 < c) {
      const h = Array(c)
      for (let m = 0; m < c; m++) h[m] = o[m]
      return h
    }
    return []
  }
  function D(o, c) {
    for (let h = 1; h < arguments.length; h++) {
      const m = arguments[h]
      if (u(m)) {
        const x = o.length || 0,
          S = m.length || 0
        o.length = x + S
        for (let $ = 0; $ < S; $++) o[x + $] = m[$]
      } else o.push(m)
    }
  }
  class Q {
    constructor(c, h) {
      ;((this.i = c), (this.j = h), (this.h = 0), (this.g = null))
    }
    get() {
      let c
      return (
        0 < this.h ? (this.h--, (c = this.g), (this.g = c.next), (c.next = null)) : (c = this.i()),
        c
      )
    }
  }
  function W(o) {
    return /^[\s\xa0]*$/.test(o)
  }
  function H() {
    var o = l.navigator
    return o && (o = o.userAgent) ? o : ''
  }
  function q(o) {
    return (q[' '](o), o)
  }
  q[' '] = function () {}
  var lt =
    H().indexOf('Gecko') != -1 &&
    !(H().toLowerCase().indexOf('webkit') != -1 && H().indexOf('Edge') == -1) &&
    !(H().indexOf('Trident') != -1 || H().indexOf('MSIE') != -1) &&
    H().indexOf('Edge') == -1
  function dt(o, c, h) {
    for (const m in o) c.call(h, o[m], m, o)
  }
  function A(o, c) {
    for (const h in o) c.call(void 0, o[h], h, o)
  }
  function y(o) {
    const c = {}
    for (const h in o) c[h] = o[h]
    return c
  }
  const v =
    'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
      ' '
    )
  function d(o, c) {
    let h, m
    for (let x = 1; x < arguments.length; x++) {
      m = arguments[x]
      for (h in m) o[h] = m[h]
      for (let S = 0; S < v.length; S++)
        ((h = v[S]), Object.prototype.hasOwnProperty.call(m, h) && (o[h] = m[h]))
    }
  }
  function g(o) {
    var c = 1
    o = o.split(':')
    const h = []
    for (; 0 < c && o.length; ) (h.push(o.shift()), c--)
    return (o.length && h.push(o.join(':')), h)
  }
  function R(o) {
    l.setTimeout(() => {
      throw o
    }, 0)
  }
  function T() {
    var o = xe
    let c = null
    return (o.g && ((c = o.g), (o.g = o.g.next), o.g || (o.h = null), (c.next = null)), c)
  }
  class ge {
    constructor() {
      this.h = this.g = null
    }
    add(c, h) {
      const m = gn.get()
      ;(m.set(c, h), this.h ? (this.h.next = m) : (this.g = m), (this.h = m))
    }
  }
  var gn = new Q(
    () => new Ht(),
    (o) => o.reset()
  )
  class Ht {
    constructor() {
      this.next = this.g = this.h = null
    }
    set(c, h) {
      ;((this.h = c), (this.g = h), (this.next = null))
    }
    reset() {
      this.next = this.g = this.h = null
    }
  }
  let Et,
    pt = !1,
    xe = new ge(),
    Nn = () => {
      const o = l.Promise.resolve(void 0)
      Et = () => {
        o.then(Ye)
      }
    }
  var Ye = () => {
    for (var o; (o = T()); ) {
      try {
        o.h.call(o.g)
      } catch (h) {
        R(h)
      }
      var c = gn
      ;(c.j(o), 100 > c.h && (c.h++, (o.next = c.g), (c.g = o)))
    }
    pt = !1
  }
  function Ut() {
    ;((this.s = this.s), (this.C = this.C))
  }
  ;((Ut.prototype.s = !1),
    (Ut.prototype.ma = function () {
      this.s || ((this.s = !0), this.N())
    }),
    (Ut.prototype.N = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()()
    }))
  function Bt(o, c) {
    ;((this.type = o), (this.g = this.target = c), (this.defaultPrevented = !1))
  }
  Bt.prototype.h = function () {
    this.defaultPrevented = !0
  }
  var _o = (function () {
    if (!l.addEventListener || !Object.defineProperty) return !1
    var o = !1,
      c = Object.defineProperty({}, 'passive', {
        get: function () {
          o = !0
        }
      })
    try {
      const h = () => {}
      ;(l.addEventListener('test', h, c), l.removeEventListener('test', h, c))
    } catch {}
    return o
  })()
  function On(o, c) {
    if (
      (Bt.call(this, o ? o.type : ''),
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
        m = o.changedTouches && o.changedTouches.length ? o.changedTouches[0] : null
      if (((this.target = o.target || o.srcElement), (this.g = c), (c = o.relatedTarget))) {
        if (lt) {
          t: {
            try {
              q(c.nodeName)
              var x = !0
              break t
            } catch {}
            x = !1
          }
          x || (c = null)
        }
      } else h == 'mouseover' ? (c = o.fromElement) : h == 'mouseout' && (c = o.toElement)
      ;((this.relatedTarget = c),
        m
          ? ((this.clientX = m.clientX !== void 0 ? m.clientX : m.pageX),
            (this.clientY = m.clientY !== void 0 ? m.clientY : m.pageY),
            (this.screenX = m.screenX || 0),
            (this.screenY = m.screenY || 0))
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
          typeof o.pointerType == 'string' ? o.pointerType : Mn[o.pointerType] || ''),
        (this.state = o.state),
        (this.i = o),
        o.defaultPrevented && On.aa.h.call(this))
    }
  }
  O(On, Bt)
  var Mn = { 2: 'touch', 3: 'pen', 4: 'mouse' }
  On.prototype.h = function () {
    On.aa.h.call(this)
    var o = this.i
    o.preventDefault ? o.preventDefault() : (o.returnValue = !1)
  }
  var Xe = 'closure_listenable_' + ((1e6 * Math.random()) | 0),
    Mr = 0
  function Ks(o, c, h, m, x) {
    ;((this.listener = o),
      (this.proxy = null),
      (this.src = c),
      (this.type = h),
      (this.capture = !!m),
      (this.ha = x),
      (this.key = ++Mr),
      (this.da = this.fa = !1))
  }
  function Oe(o) {
    ;((o.da = !0), (o.listener = null), (o.proxy = null), (o.src = null), (o.ha = null))
  }
  function Lr(o) {
    ;((this.src = o), (this.g = {}), (this.h = 0))
  }
  Lr.prototype.add = function (o, c, h, m, x) {
    var S = o.toString()
    ;((o = this.g[S]), o || ((o = this.g[S] = []), this.h++))
    var $ = b(o, c, m, x)
    return (
      -1 < $
        ? ((c = o[$]), h || (c.fa = !1))
        : ((c = new Ks(c, this.src, S, !!m, x)), (c.fa = h), o.push(c)),
      c
    )
  }
  function E(o, c) {
    var h = c.type
    if (h in o.g) {
      var m = o.g[h],
        x = Array.prototype.indexOf.call(m, c, void 0),
        S
      ;((S = 0 <= x) && Array.prototype.splice.call(m, x, 1),
        S && (Oe(c), o.g[h].length == 0 && (delete o.g[h], o.h--)))
    }
  }
  function b(o, c, h, m) {
    for (var x = 0; x < o.length; ++x) {
      var S = o[x]
      if (!S.da && S.listener == c && S.capture == !!h && S.ha == m) return x
    }
    return -1
  }
  var C = 'closure_lm_' + ((1e6 * Math.random()) | 0),
    L = {}
  function N(o, c, h, m, x) {
    if (Array.isArray(c)) {
      for (var S = 0; S < c.length; S++) N(o, c[S], h, m, x)
      return null
    }
    return ((h = et(h)), o && o[Xe] ? o.K(c, h, f(m) ? !!m.capture : !1, x) : V(o, c, h, !1, m, x))
  }
  function V(o, c, h, m, x, S) {
    if (!c) throw Error('Invalid event type')
    var $ = f(x) ? !!x.capture : !!x,
      wt = z(o)
    if ((wt || (o[C] = wt = new Lr(o)), (h = wt.add(c, h, m, $, S)), h.proxy)) return h
    if (((m = K()), (h.proxy = m), (m.src = o), (m.listener = h), o.addEventListener))
      (_o || (x = $), x === void 0 && (x = !1), o.addEventListener(c.toString(), m, x))
    else if (o.attachEvent) o.attachEvent(M(c.toString()), m)
    else if (o.addListener && o.removeListener) o.addListener(m)
    else throw Error('addEventListener and attachEvent are unavailable.')
    return h
  }
  function K() {
    function o(h) {
      return c.call(o.src, o.listener, h)
    }
    const c = J
    return o
  }
  function j(o, c, h, m, x) {
    if (Array.isArray(c)) for (var S = 0; S < c.length; S++) j(o, c[S], h, m, x)
    else
      ((m = f(m) ? !!m.capture : !!m),
        (h = et(h)),
        o && o[Xe]
          ? ((o = o.i),
            (c = String(c).toString()),
            c in o.g &&
              ((S = o.g[c]),
              (h = b(S, h, m, x)),
              -1 < h &&
                (Oe(S[h]),
                Array.prototype.splice.call(S, h, 1),
                S.length == 0 && (delete o.g[c], o.h--))))
          : o &&
            (o = z(o)) &&
            ((c = o.g[c.toString()]),
            (o = -1),
            c && (o = b(c, h, m, x)),
            (h = -1 < o ? c[o] : null) && B(h)))
  }
  function B(o) {
    if (typeof o != 'number' && o && !o.da) {
      var c = o.src
      if (c && c[Xe]) E(c.i, o)
      else {
        var h = o.type,
          m = o.proxy
        ;(c.removeEventListener
          ? c.removeEventListener(h, m, o.capture)
          : c.detachEvent
            ? c.detachEvent(M(h), m)
            : c.addListener && c.removeListener && c.removeListener(m),
          (h = z(c)) ? (E(h, o), h.h == 0 && ((h.src = null), (c[C] = null))) : Oe(o))
      }
    }
  }
  function M(o) {
    return o in L ? L[o] : (L[o] = 'on' + o)
  }
  function J(o, c) {
    if (o.da) o = !0
    else {
      c = new On(c, this)
      var h = o.listener,
        m = o.ha || o.src
      ;(o.fa && B(o), (o = h.call(m, c)))
    }
    return o
  }
  function z(o) {
    return ((o = o[C]), o instanceof Lr ? o : null)
  }
  var Y = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0)
  function et(o) {
    return typeof o == 'function'
      ? o
      : (o[Y] ||
          (o[Y] = function (c) {
            return o.handleEvent(c)
          }),
        o[Y])
  }
  function tt() {
    ;(Ut.call(this), (this.i = new Lr(this)), (this.M = this), (this.F = null))
  }
  ;(O(tt, Ut),
    (tt.prototype[Xe] = !0),
    (tt.prototype.removeEventListener = function (o, c, h, m) {
      j(this, o, c, h, m)
    }))
  function ot(o, c) {
    var h,
      m = o.F
    if (m) for (h = []; m; m = m.F) h.push(m)
    if (((o = o.M), (m = c.type || c), typeof c == 'string')) c = new Bt(c, o)
    else if (c instanceof Bt) c.target = c.target || o
    else {
      var x = c
      ;((c = new Bt(m, o)), d(c, x))
    }
    if (((x = !0), h))
      for (var S = h.length - 1; 0 <= S; S--) {
        var $ = (c.g = h[S])
        x = ht($, m, !0, c) && x
      }
    if ((($ = c.g = o), (x = ht($, m, !0, c) && x), (x = ht($, m, !1, c) && x), h))
      for (S = 0; S < h.length; S++) (($ = c.g = h[S]), (x = ht($, m, !1, c) && x))
  }
  ;((tt.prototype.N = function () {
    if ((tt.aa.N.call(this), this.i)) {
      var o = this.i,
        c
      for (c in o.g) {
        for (var h = o.g[c], m = 0; m < h.length; m++) Oe(h[m])
        ;(delete o.g[c], o.h--)
      }
    }
    this.F = null
  }),
    (tt.prototype.K = function (o, c, h, m) {
      return this.i.add(String(o), c, !1, h, m)
    }),
    (tt.prototype.L = function (o, c, h, m) {
      return this.i.add(String(o), c, !0, h, m)
    }))
  function ht(o, c, h, m) {
    if (((c = o.i.g[String(c)]), !c)) return !0
    c = c.concat()
    for (var x = !0, S = 0; S < c.length; ++S) {
      var $ = c[S]
      if ($ && !$.da && $.capture == h) {
        var wt = $.listener,
          Wt = $.ha || $.src
        ;($.fa && E(o.i, $), (x = wt.call(Wt, m) !== !1 && x))
      }
    }
    return x && !m.defaultPrevented
  }
  function St(o, c, h) {
    if (typeof o == 'function') h && (o = w(o, h))
    else if (o && typeof o.handleEvent == 'function') o = w(o.handleEvent, o)
    else throw Error('Invalid listener argument')
    return 2147483647 < Number(c) ? -1 : l.setTimeout(o, c || 0)
  }
  function Lt(o) {
    o.g = St(() => {
      ;((o.g = null), o.i && ((o.i = !1), Lt(o)))
    }, o.l)
    const c = o.h
    ;((o.h = null), o.m.apply(null, c))
  }
  class ve extends Ut {
    constructor(c, h) {
      ;(super(), (this.m = c), (this.l = h), (this.h = null), (this.i = !1), (this.g = null))
    }
    j(c) {
      ;((this.h = arguments), this.g ? (this.i = !0) : Lt(this))
    }
    N() {
      ;(super.N(),
        this.g && (l.clearTimeout(this.g), (this.g = null), (this.i = !1), (this.h = null)))
    }
  }
  function Zt(o) {
    ;(Ut.call(this), (this.h = o), (this.g = {}))
  }
  O(Zt, Ut)
  var _n = []
  function Fr(o) {
    ;(dt(
      o.g,
      function (c, h) {
        this.g.hasOwnProperty(h) && B(c)
      },
      o
    ),
      (o.g = {}))
  }
  ;((Zt.prototype.N = function () {
    ;(Zt.aa.N.call(this), Fr(this))
  }),
    (Zt.prototype.handleEvent = function () {
      throw Error('EventHandler.handleEvent not implemented')
    }))
  var zt = l.JSON.stringify,
    Ee = l.JSON.parse,
    Hs = class {
      stringify(o) {
        return l.JSON.stringify(o, void 0)
      }
      parse(o) {
        return l.JSON.parse(o, void 0)
      }
    }
  function sr() {}
  sr.prototype.h = null
  function ql(o) {
    return o.h || (o.h = o.i())
  }
  function Kl() {}
  var Ur = { OPEN: 'a', kb: 'b', Ja: 'c', wb: 'd' }
  function yo() {
    Bt.call(this, 'd')
  }
  O(yo, Bt)
  function vo() {
    Bt.call(this, 'c')
  }
  O(vo, Bt)
  var Ln = {},
    Hl = null
  function zs() {
    return (Hl = Hl || new tt())
  }
  Ln.La = 'serverreachability'
  function zl(o) {
    Bt.call(this, Ln.La, o)
  }
  O(zl, Bt)
  function Br(o) {
    const c = zs()
    ot(c, new zl(c))
  }
  Ln.STAT_EVENT = 'statevent'
  function Wl(o, c) {
    ;(Bt.call(this, Ln.STAT_EVENT, o), (this.stat = c))
  }
  O(Wl, Bt)
  function le(o) {
    const c = zs()
    ot(c, new Wl(c, o))
  }
  Ln.Ma = 'timingevent'
  function Gl(o, c) {
    ;(Bt.call(this, Ln.Ma, o), (this.size = c))
  }
  O(Gl, Bt)
  function jr(o, c) {
    if (typeof o != 'function') throw Error('Fn must not be null and must be a function')
    return l.setTimeout(function () {
      o()
    }, c)
  }
  function $r() {
    this.g = !0
  }
  $r.prototype.xa = function () {
    this.g = !1
  }
  function yp(o, c, h, m, x, S) {
    o.info(function () {
      if (o.g)
        if (S)
          for (var $ = '', wt = S.split('&'), Wt = 0; Wt < wt.length; Wt++) {
            var mt = wt[Wt].split('=')
            if (1 < mt.length) {
              var te = mt[0]
              mt = mt[1]
              var ee = te.split('_')
              $ =
                2 <= ee.length && ee[1] == 'type'
                  ? $ + (te + '=' + mt + '&')
                  : $ + (te + '=redacted&')
            }
          }
        else $ = null
      else $ = S
      return (
        'XMLHTTP REQ (' +
        m +
        ') [attempt ' +
        x +
        ']: ' +
        c +
        `
` +
        h +
        `
` +
        $
      )
    })
  }
  function vp(o, c, h, m, x, S, $) {
    o.info(function () {
      return (
        'XMLHTTP RESP (' +
        m +
        ') [ attempt ' +
        x +
        ']: ' +
        c +
        `
` +
        h +
        `
` +
        S +
        ' ' +
        $
      )
    })
  }
  function ir(o, c, h, m) {
    o.info(function () {
      return 'XMLHTTP TEXT (' + c + '): ' + Tp(o, h) + (m ? ' ' + m : '')
    })
  }
  function Ep(o, c) {
    o.info(function () {
      return 'TIMEOUT: ' + c
    })
  }
  $r.prototype.info = function () {}
  function Tp(o, c) {
    if (!o.g) return c
    if (!c) return null
    try {
      var h = JSON.parse(c)
      if (h) {
        for (o = 0; o < h.length; o++)
          if (Array.isArray(h[o])) {
            var m = h[o]
            if (!(2 > m.length)) {
              var x = m[1]
              if (Array.isArray(x) && !(1 > x.length)) {
                var S = x[0]
                if (S != 'noop' && S != 'stop' && S != 'close')
                  for (var $ = 1; $ < x.length; $++) x[$] = ''
              }
            }
          }
      }
      return zt(h)
    } catch {
      return c
    }
  }
  var Ws = { NO_ERROR: 0, gb: 1, tb: 2, sb: 3, nb: 4, rb: 5, ub: 6, Ia: 7, TIMEOUT: 8, xb: 9 },
    Ql = {
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
    Eo
  function Gs() {}
  ;(O(Gs, sr),
    (Gs.prototype.g = function () {
      return new XMLHttpRequest()
    }),
    (Gs.prototype.i = function () {
      return {}
    }),
    (Eo = new Gs()))
  function yn(o, c, h, m) {
    ;((this.j = o),
      (this.i = c),
      (this.l = h),
      (this.R = m || 1),
      (this.U = new Zt(this)),
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
      (this.h = new Yl()))
  }
  function Yl() {
    ;((this.i = null), (this.g = ''), (this.h = !1))
  }
  var Xl = {},
    To = {}
  function bo(o, c, h) {
    ;((o.L = 1), (o.v = Js(Je(c))), (o.m = h), (o.P = !0), Jl(o, null))
  }
  function Jl(o, c) {
    ;((o.F = Date.now()), Qs(o), (o.A = Je(o.v)))
    var h = o.A,
      m = o.R
    ;(Array.isArray(m) || (m = [String(m)]),
      fu(h.i, 't', m),
      (o.C = 0),
      (h = o.j.J),
      (o.h = new Yl()),
      (o.g = Cu(o.j, h ? c : null, !o.m)),
      0 < o.O && (o.M = new ve(w(o.Y, o, o.g), o.O)),
      (c = o.U),
      (h = o.g),
      (m = o.ca))
    var x = 'readystatechange'
    Array.isArray(x) || (x && (_n[0] = x.toString()), (x = _n))
    for (var S = 0; S < x.length; S++) {
      var $ = N(h, x[S], m || c.handleEvent, !1, c.h || c)
      if (!$) break
      c.g[$.key] = $
    }
    ;((c = o.H ? y(o.H) : {}),
      o.m
        ? (o.u || (o.u = 'POST'),
          (c['Content-Type'] = 'application/x-www-form-urlencoded'),
          o.g.ea(o.A, o.u, o.m, c))
        : ((o.u = 'GET'), o.g.ea(o.A, o.u, null, c)),
      Br(),
      yp(o.i, o.u, o.A, o.l, o.R, o.m))
  }
  ;((yn.prototype.ca = function (o) {
    o = o.target
    const c = this.M
    c && Ze(o) == 3 ? c.j() : this.Y(o)
  }),
    (yn.prototype.Y = function (o) {
      try {
        if (o == this.g)
          t: {
            const ee = Ze(this.g)
            var c = this.g.Ba()
            const lr = this.g.Z()
            if (!(3 > ee) && (ee != 3 || (this.g && (this.h.h || this.g.oa() || vu(this.g))))) {
              ;(this.J || ee != 4 || c == 7 || (c == 8 || 0 >= lr ? Br(3) : Br(2)), wo(this))
              var h = this.g.Z()
              this.X = h
              e: if (Zl(this)) {
                var m = vu(this.g)
                o = ''
                var x = m.length,
                  S = Ze(this.g) == 4
                if (!this.h.i) {
                  if (typeof TextDecoder > 'u') {
                    ;(Fn(this), qr(this))
                    var $ = ''
                    break e
                  }
                  this.h.i = new l.TextDecoder()
                }
                for (c = 0; c < x; c++)
                  ((this.h.h = !0), (o += this.h.i.decode(m[c], { stream: !(S && c == x - 1) })))
                ;((m.length = 0), (this.h.g += o), (this.C = 0), ($ = this.h.g))
              } else $ = this.g.oa()
              if (
                ((this.o = h == 200), vp(this.i, this.u, this.A, this.l, this.R, ee, h), this.o)
              ) {
                if (this.T && !this.K) {
                  e: {
                    if (this.g) {
                      var wt,
                        Wt = this.g
                      if (
                        (wt = Wt.g ? Wt.g.getResponseHeader('X-HTTP-Initial-Response') : null) &&
                        !W(wt)
                      ) {
                        var mt = wt
                        break e
                      }
                    }
                    mt = null
                  }
                  if ((h = mt))
                    (ir(
                      this.i,
                      this.l,
                      h,
                      'Initial handshake response via X-HTTP-Initial-Response'
                    ),
                      (this.K = !0),
                      Ao(this, h))
                  else {
                    ;((this.o = !1), (this.s = 3), le(12), Fn(this), qr(this))
                    break t
                  }
                }
                if (this.P) {
                  h = !0
                  let Pe
                  for (; !this.J && this.C < $.length; )
                    if (((Pe = bp(this, $)), Pe == To)) {
                      ;(ee == 4 && ((this.s = 4), le(14), (h = !1)),
                        ir(this.i, this.l, null, '[Incomplete Response]'))
                      break
                    } else if (Pe == Xl) {
                      ;((this.s = 4), le(15), ir(this.i, this.l, $, '[Invalid Chunk]'), (h = !1))
                      break
                    } else (ir(this.i, this.l, Pe, null), Ao(this, Pe))
                  if (
                    (Zl(this) && this.C != 0 && ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                    ee != 4 || $.length != 0 || this.h.h || ((this.s = 1), le(16), (h = !1)),
                    (this.o = this.o && h),
                    !h)
                  )
                    (ir(this.i, this.l, $, '[Invalid Chunked Response]'), Fn(this), qr(this))
                  else if (0 < $.length && !this.W) {
                    this.W = !0
                    var te = this.j
                    te.g == this &&
                      te.ba &&
                      !te.M &&
                      (te.j.info('Great, no buffering proxy detected. Bytes received: ' + $.length),
                      Co(te),
                      (te.M = !0),
                      le(11))
                  }
                } else (ir(this.i, this.l, $, null), Ao(this, $))
                ;(ee == 4 && Fn(this),
                  this.o && !this.J && (ee == 4 ? Ru(this.j, this) : ((this.o = !1), Qs(this))))
              } else
                (Up(this.g),
                  h == 400 && 0 < $.indexOf('Unknown SID')
                    ? ((this.s = 3), le(12))
                    : ((this.s = 0), le(13)),
                  Fn(this),
                  qr(this))
            }
          }
      } catch {
      } finally {
      }
    }))
  function Zl(o) {
    return o.g ? o.u == 'GET' && o.L != 2 && o.j.Ca : !1
  }
  function bp(o, c) {
    var h = o.C,
      m = c.indexOf(
        `
`,
        h
      )
    return m == -1
      ? To
      : ((h = Number(c.substring(h, m))),
        isNaN(h)
          ? Xl
          : ((m += 1), m + h > c.length ? To : ((c = c.slice(m, m + h)), (o.C = m + h), c)))
  }
  yn.prototype.cancel = function () {
    ;((this.J = !0), Fn(this))
  }
  function Qs(o) {
    ;((o.S = Date.now() + o.I), tu(o, o.I))
  }
  function tu(o, c) {
    if (o.B != null) throw Error('WatchDog timer not null')
    o.B = jr(w(o.ba, o), c)
  }
  function wo(o) {
    o.B && (l.clearTimeout(o.B), (o.B = null))
  }
  yn.prototype.ba = function () {
    this.B = null
    const o = Date.now()
    0 <= o - this.S
      ? (Ep(this.i, this.A), this.L != 2 && (Br(), le(17)), Fn(this), (this.s = 2), qr(this))
      : tu(this, this.S - o)
  }
  function qr(o) {
    o.j.G == 0 || o.J || Ru(o.j, o)
  }
  function Fn(o) {
    wo(o)
    var c = o.M
    ;(c && typeof c.ma == 'function' && c.ma(),
      (o.M = null),
      Fr(o.U),
      o.g && ((c = o.g), (o.g = null), c.abort(), c.ma()))
  }
  function Ao(o, c) {
    try {
      var h = o.j
      if (h.G != 0 && (h.g == o || Io(h.h, o))) {
        if (!o.K && Io(h.h, o) && h.G == 3) {
          try {
            var m = h.Da.g.parse(c)
          } catch {
            m = null
          }
          if (Array.isArray(m) && m.length == 3) {
            var x = m
            if (x[0] == 0) {
              t: if (!h.u) {
                if (h.g)
                  if (h.g.F + 3e3 < o.F) (si(h), ni(h))
                  else break t
                ;(So(h), le(18))
              }
            } else
              ((h.za = x[1]),
                0 < h.za - h.T &&
                  37500 > x[2] &&
                  h.F &&
                  h.v == 0 &&
                  !h.C &&
                  (h.C = jr(w(h.Za, h), 6e3)))
            if (1 >= ru(h.h) && h.ca) {
              try {
                h.ca()
              } catch {}
              h.ca = void 0
            }
          } else Bn(h, 11)
        } else if (((o.K || h.g == o) && si(h), !W(c)))
          for (x = h.Da.g.parse(c), c = 0; c < x.length; c++) {
            let mt = x[c]
            if (((h.T = mt[0]), (mt = mt[1]), h.G == 2))
              if (mt[0] == 'c') {
                ;((h.K = mt[1]), (h.ia = mt[2]))
                const te = mt[3]
                te != null && ((h.la = te), h.j.info('VER=' + h.la))
                const ee = mt[4]
                ee != null && ((h.Aa = ee), h.j.info('SVER=' + h.Aa))
                const lr = mt[5]
                ;(lr != null &&
                  typeof lr == 'number' &&
                  0 < lr &&
                  ((m = 1.5 * lr), (h.L = m), h.j.info('backChannelRequestTimeoutMs_=' + m)),
                  (m = h))
                const Pe = o.g
                if (Pe) {
                  const oi = Pe.g ? Pe.g.getResponseHeader('X-Client-Wire-Protocol') : null
                  if (oi) {
                    var S = m.h
                    S.g ||
                      (oi.indexOf('spdy') == -1 &&
                        oi.indexOf('quic') == -1 &&
                        oi.indexOf('h2') == -1) ||
                      ((S.j = S.l), (S.g = new Set()), S.h && (Ro(S, S.h), (S.h = null)))
                  }
                  if (m.D) {
                    const ko = Pe.g ? Pe.g.getResponseHeader('X-HTTP-Session-Id') : null
                    ko && ((m.ya = ko), Rt(m.I, m.D, ko))
                  }
                }
                ;((h.G = 3),
                  h.l && h.l.ua(),
                  h.ba && ((h.R = Date.now() - o.F), h.j.info('Handshake RTT: ' + h.R + 'ms')),
                  (m = h))
                var $ = o
                if (((m.qa = Su(m, m.J ? m.ia : null, m.W)), $.K)) {
                  su(m.h, $)
                  var wt = $,
                    Wt = m.L
                  ;(Wt && (wt.I = Wt), wt.B && (wo(wt), Qs(wt)), (m.g = $))
                } else Au(m)
                0 < h.i.length && ri(h)
              } else (mt[0] != 'stop' && mt[0] != 'close') || Bn(h, 7)
            else
              h.G == 3 &&
                (mt[0] == 'stop' || mt[0] == 'close'
                  ? mt[0] == 'stop'
                    ? Bn(h, 7)
                    : Po(h)
                  : mt[0] != 'noop' && h.l && h.l.ta(mt),
                (h.v = 0))
          }
      }
      Br(4)
    } catch {}
  }
  var wp = class {
    constructor(o, c) {
      ;((this.g = o), (this.map = c))
    }
  }
  function eu(o) {
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
  function nu(o) {
    return o.h ? !0 : o.g ? o.g.size >= o.j : !1
  }
  function ru(o) {
    return o.h ? 1 : o.g ? o.g.size : 0
  }
  function Io(o, c) {
    return o.h ? o.h == c : o.g ? o.g.has(c) : !1
  }
  function Ro(o, c) {
    o.g ? o.g.add(c) : (o.h = c)
  }
  function su(o, c) {
    o.h && o.h == c ? (o.h = null) : o.g && o.g.has(c) && o.g.delete(c)
  }
  eu.prototype.cancel = function () {
    if (((this.i = iu(this)), this.h)) (this.h.cancel(), (this.h = null))
    else if (this.g && this.g.size !== 0) {
      for (const o of this.g.values()) o.cancel()
      this.g.clear()
    }
  }
  function iu(o) {
    if (o.h != null) return o.i.concat(o.h.D)
    if (o.g != null && o.g.size !== 0) {
      let c = o.i
      for (const h of o.g.values()) c = c.concat(h.D)
      return c
    }
    return k(o.i)
  }
  function Ap(o) {
    if (o.V && typeof o.V == 'function') return o.V()
    if ((typeof Map < 'u' && o instanceof Map) || (typeof Set < 'u' && o instanceof Set))
      return Array.from(o.values())
    if (typeof o == 'string') return o.split('')
    if (u(o)) {
      for (var c = [], h = o.length, m = 0; m < h; m++) c.push(o[m])
      return c
    }
    ;((c = []), (h = 0))
    for (m in o) c[h++] = o[m]
    return c
  }
  function Ip(o) {
    if (o.na && typeof o.na == 'function') return o.na()
    if (!o.V || typeof o.V != 'function') {
      if (typeof Map < 'u' && o instanceof Map) return Array.from(o.keys())
      if (!(typeof Set < 'u' && o instanceof Set)) {
        if (u(o) || typeof o == 'string') {
          var c = []
          o = o.length
          for (var h = 0; h < o; h++) c.push(h)
          return c
        }
        ;((c = []), (h = 0))
        for (const m in o) c[h++] = m
        return c
      }
    }
  }
  function ou(o, c) {
    if (o.forEach && typeof o.forEach == 'function') o.forEach(c, void 0)
    else if (u(o) || typeof o == 'string') Array.prototype.forEach.call(o, c, void 0)
    else
      for (var h = Ip(o), m = Ap(o), x = m.length, S = 0; S < x; S++)
        c.call(void 0, m[S], h && h[S], o)
  }
  var au = RegExp(
    '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
  )
  function Rp(o, c) {
    if (o) {
      o = o.split('&')
      for (var h = 0; h < o.length; h++) {
        var m = o[h].indexOf('='),
          x = null
        if (0 <= m) {
          var S = o[h].substring(0, m)
          x = o[h].substring(m + 1)
        } else S = o[h]
        c(S, x ? decodeURIComponent(x.replace(/\+/g, ' ')) : '')
      }
    }
  }
  function Un(o) {
    if (
      ((this.g = this.o = this.j = ''),
      (this.s = null),
      (this.m = this.l = ''),
      (this.h = !1),
      o instanceof Un)
    ) {
      ;((this.h = o.h),
        Ys(this, o.j),
        (this.o = o.o),
        (this.g = o.g),
        Xs(this, o.s),
        (this.l = o.l))
      var c = o.i,
        h = new zr()
      ;((h.i = c.i), c.g && ((h.g = new Map(c.g)), (h.h = c.h)), lu(this, h), (this.m = o.m))
    } else
      o && (c = String(o).match(au))
        ? ((this.h = !1),
          Ys(this, c[1] || '', !0),
          (this.o = Kr(c[2] || '')),
          (this.g = Kr(c[3] || '', !0)),
          Xs(this, c[4]),
          (this.l = Kr(c[5] || '', !0)),
          lu(this, c[6] || '', !0),
          (this.m = Kr(c[7] || '')))
        : ((this.h = !1), (this.i = new zr(null, this.h)))
  }
  Un.prototype.toString = function () {
    var o = [],
      c = this.j
    c && o.push(Hr(c, uu, !0), ':')
    var h = this.g
    return (
      (h || c == 'file') &&
        (o.push('//'),
        (c = this.o) && o.push(Hr(c, uu, !0), '@'),
        o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
        (h = this.s),
        h != null && o.push(':', String(h))),
      (h = this.l) &&
        (this.g && h.charAt(0) != '/' && o.push('/'),
        o.push(Hr(h, h.charAt(0) == '/' ? Sp : Pp, !0))),
      (h = this.i.toString()) && o.push('?', h),
      (h = this.m) && o.push('#', Hr(h, kp)),
      o.join('')
    )
  }
  function Je(o) {
    return new Un(o)
  }
  function Ys(o, c, h) {
    ;((o.j = h ? Kr(c, !0) : c), o.j && (o.j = o.j.replace(/:$/, '')))
  }
  function Xs(o, c) {
    if (c) {
      if (((c = Number(c)), isNaN(c) || 0 > c)) throw Error('Bad port number ' + c)
      o.s = c
    } else o.s = null
  }
  function lu(o, c, h) {
    c instanceof zr ? ((o.i = c), Vp(o.i, o.h)) : (h || (c = Hr(c, Cp)), (o.i = new zr(c, o.h)))
  }
  function Rt(o, c, h) {
    o.i.set(c, h)
  }
  function Js(o) {
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
  function Kr(o, c) {
    return o ? (c ? decodeURI(o.replace(/%25/g, '%2525')) : decodeURIComponent(o)) : ''
  }
  function Hr(o, c, h) {
    return typeof o == 'string'
      ? ((o = encodeURI(o).replace(c, xp)), h && (o = o.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), o)
      : null
  }
  function xp(o) {
    return ((o = o.charCodeAt(0)), '%' + ((o >> 4) & 15).toString(16) + (o & 15).toString(16))
  }
  var uu = /[#\/\?@]/g,
    Pp = /[#\?:]/g,
    Sp = /[#\?]/g,
    Cp = /[#\?@]/g,
    kp = /#/g
  function zr(o, c) {
    ;((this.h = this.g = null), (this.i = o || null), (this.j = !!c))
  }
  function vn(o) {
    o.g ||
      ((o.g = new Map()),
      (o.h = 0),
      o.i &&
        Rp(o.i, function (c, h) {
          o.add(decodeURIComponent(c.replace(/\+/g, ' ')), h)
        }))
  }
  ;((e = zr.prototype),
    (e.add = function (o, c) {
      ;(vn(this), (this.i = null), (o = or(this, o)))
      var h = this.g.get(o)
      return (h || this.g.set(o, (h = [])), h.push(c), (this.h += 1), this)
    }))
  function cu(o, c) {
    ;(vn(o),
      (c = or(o, c)),
      o.g.has(c) && ((o.i = null), (o.h -= o.g.get(c).length), o.g.delete(c)))
  }
  function hu(o, c) {
    return (vn(o), (c = or(o, c)), o.g.has(c))
  }
  ;((e.forEach = function (o, c) {
    ;(vn(this),
      this.g.forEach(function (h, m) {
        h.forEach(function (x) {
          o.call(c, x, m, this)
        }, this)
      }, this))
  }),
    (e.na = function () {
      vn(this)
      const o = Array.from(this.g.values()),
        c = Array.from(this.g.keys()),
        h = []
      for (let m = 0; m < c.length; m++) {
        const x = o[m]
        for (let S = 0; S < x.length; S++) h.push(c[m])
      }
      return h
    }),
    (e.V = function (o) {
      vn(this)
      let c = []
      if (typeof o == 'string') hu(this, o) && (c = c.concat(this.g.get(or(this, o))))
      else {
        o = Array.from(this.g.values())
        for (let h = 0; h < o.length; h++) c = c.concat(o[h])
      }
      return c
    }),
    (e.set = function (o, c) {
      return (
        vn(this),
        (this.i = null),
        (o = or(this, o)),
        hu(this, o) && (this.h -= this.g.get(o).length),
        this.g.set(o, [c]),
        (this.h += 1),
        this
      )
    }),
    (e.get = function (o, c) {
      return o ? ((o = this.V(o)), 0 < o.length ? String(o[0]) : c) : c
    }))
  function fu(o, c, h) {
    ;(cu(o, c), 0 < h.length && ((o.i = null), o.g.set(or(o, c), k(h)), (o.h += h.length)))
  }
  e.toString = function () {
    if (this.i) return this.i
    if (!this.g) return ''
    const o = [],
      c = Array.from(this.g.keys())
    for (var h = 0; h < c.length; h++) {
      var m = c[h]
      const S = encodeURIComponent(String(m)),
        $ = this.V(m)
      for (m = 0; m < $.length; m++) {
        var x = S
        ;($[m] !== '' && (x += '=' + encodeURIComponent(String($[m]))), o.push(x))
      }
    }
    return (this.i = o.join('&'))
  }
  function or(o, c) {
    return ((c = String(c)), o.j && (c = c.toLowerCase()), c)
  }
  function Vp(o, c) {
    ;(c &&
      !o.j &&
      (vn(o),
      (o.i = null),
      o.g.forEach(function (h, m) {
        var x = m.toLowerCase()
        m != x && (cu(this, m), fu(this, x, h))
      }, o)),
      (o.j = c))
  }
  function Dp(o, c) {
    const h = new $r()
    if (l.Image) {
      const m = new Image()
      ;((m.onload = P(En, h, 'TestLoadImage: loaded', !0, c, m)),
        (m.onerror = P(En, h, 'TestLoadImage: error', !1, c, m)),
        (m.onabort = P(En, h, 'TestLoadImage: abort', !1, c, m)),
        (m.ontimeout = P(En, h, 'TestLoadImage: timeout', !1, c, m)),
        l.setTimeout(function () {
          m.ontimeout && m.ontimeout()
        }, 1e4),
        (m.src = o))
    } else c(!1)
  }
  function Np(o, c) {
    const h = new $r(),
      m = new AbortController(),
      x = setTimeout(() => {
        ;(m.abort(), En(h, 'TestPingServer: timeout', !1, c))
      }, 1e4)
    fetch(o, { signal: m.signal })
      .then((S) => {
        ;(clearTimeout(x),
          S.ok ? En(h, 'TestPingServer: ok', !0, c) : En(h, 'TestPingServer: server error', !1, c))
      })
      .catch(() => {
        ;(clearTimeout(x), En(h, 'TestPingServer: error', !1, c))
      })
  }
  function En(o, c, h, m, x) {
    try {
      ;(x && ((x.onload = null), (x.onerror = null), (x.onabort = null), (x.ontimeout = null)),
        m(h))
    } catch {}
  }
  function Op() {
    this.g = new Hs()
  }
  function Mp(o, c, h) {
    const m = h || ''
    try {
      ou(o, function (x, S) {
        let $ = x
        ;(f(x) && ($ = zt(x)), c.push(m + S + '=' + encodeURIComponent($)))
      })
    } catch (x) {
      throw (c.push(m + 'type=' + encodeURIComponent('_badmap')), x)
    }
  }
  function Zs(o) {
    ;((this.l = o.Ub || null), (this.j = o.eb || !1))
  }
  ;(O(Zs, sr),
    (Zs.prototype.g = function () {
      return new ti(this.l, this.j)
    }),
    (Zs.prototype.i = (function (o) {
      return function () {
        return o
      }
    })({})))
  function ti(o, c) {
    ;(tt.call(this),
      (this.D = o),
      (this.o = c),
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
  ;(O(ti, tt),
    (e = ti.prototype),
    (e.open = function (o, c) {
      if (this.readyState != 0) throw (this.abort(), Error('Error reopening a connection'))
      ;((this.B = o), (this.A = c), (this.readyState = 1), Gr(this))
    }),
    (e.send = function (o) {
      if (this.readyState != 1) throw (this.abort(), Error('need to call open() first. '))
      this.g = !0
      const c = { headers: this.u, method: this.B, credentials: this.m, cache: void 0 }
      ;(o && (c.body = o),
        (this.D || l).fetch(new Request(this.A, c)).then(this.Sa.bind(this), this.ga.bind(this)))
    }),
    (e.abort = function () {
      ;((this.response = this.responseText = ''),
        (this.u = new Headers()),
        (this.status = 0),
        this.j && this.j.cancel('Request was aborted.').catch(() => {}),
        1 <= this.readyState && this.g && this.readyState != 4 && ((this.g = !1), Wr(this)),
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
          Gr(this)),
        this.g && ((this.readyState = 3), Gr(this), this.g))
      )
        if (this.responseType === 'arraybuffer')
          o.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this))
        else if (typeof l.ReadableStream < 'u' && 'body' in o) {
          if (((this.j = o.body.getReader()), this.o)) {
            if (this.responseType)
              throw Error('responseType must be empty for "streamBinaryChunks" mode responses.')
            this.response = []
          } else ((this.response = this.responseText = ''), (this.v = new TextDecoder()))
          du(this)
        } else o.text().then(this.Ra.bind(this), this.ga.bind(this))
    }))
  function du(o) {
    o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))
  }
  ;((e.Pa = function (o) {
    if (this.g) {
      if (this.o && o.value) this.response.push(o.value)
      else if (!this.o) {
        var c = o.value ? o.value : new Uint8Array(0)
        ;(c = this.v.decode(c, { stream: !o.done })) && (this.response = this.responseText += c)
      }
      ;(o.done ? Wr(this) : Gr(this), this.readyState == 3 && du(this))
    }
  }),
    (e.Ra = function (o) {
      this.g && ((this.response = this.responseText = o), Wr(this))
    }),
    (e.Qa = function (o) {
      this.g && ((this.response = o), Wr(this))
    }),
    (e.ga = function () {
      this.g && Wr(this)
    }))
  function Wr(o) {
    ;((o.readyState = 4), (o.l = null), (o.j = null), (o.v = null), Gr(o))
  }
  ;((e.setRequestHeader = function (o, c) {
    this.u.append(o, c)
  }),
    (e.getResponseHeader = function (o) {
      return (this.h && this.h.get(o.toLowerCase())) || ''
    }),
    (e.getAllResponseHeaders = function () {
      if (!this.h) return ''
      const o = [],
        c = this.h.entries()
      for (var h = c.next(); !h.done; ) ((h = h.value), o.push(h[0] + ': ' + h[1]), (h = c.next()))
      return o.join(`\r
`)
    }))
  function Gr(o) {
    o.onreadystatechange && o.onreadystatechange.call(o)
  }
  Object.defineProperty(ti.prototype, 'withCredentials', {
    get: function () {
      return this.m === 'include'
    },
    set: function (o) {
      this.m = o ? 'include' : 'same-origin'
    }
  })
  function pu(o) {
    let c = ''
    return (
      dt(o, function (h, m) {
        ;((c += m),
          (c += ':'),
          (c += h),
          (c += `\r
`))
      }),
      c
    )
  }
  function xo(o, c, h) {
    t: {
      for (m in h) {
        var m = !1
        break t
      }
      m = !0
    }
    m ||
      ((h = pu(h)), typeof o == 'string' ? h != null && encodeURIComponent(String(h)) : Rt(o, c, h))
  }
  function Vt(o) {
    ;(tt.call(this),
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
  O(Vt, tt)
  var Lp = /^https?$/i,
    Fp = ['POST', 'PUT']
  ;((e = Vt.prototype),
    (e.Ha = function (o) {
      this.J = o
    }),
    (e.ea = function (o, c, h, m) {
      if (this.g)
        throw Error(
          '[goog.net.XhrIo] Object is active with another request=' + this.D + '; newUri=' + o
        )
      ;((c = c ? c.toUpperCase() : 'GET'),
        (this.D = o),
        (this.l = ''),
        (this.m = 0),
        (this.A = !1),
        (this.h = !0),
        (this.g = this.o ? this.o.g() : Eo.g()),
        (this.v = this.o ? ql(this.o) : ql(Eo)),
        (this.g.onreadystatechange = w(this.Ea, this)))
      try {
        ;((this.B = !0), this.g.open(c, String(o), !0), (this.B = !1))
      } catch (S) {
        mu(this, S)
        return
      }
      if (((o = h || ''), (h = new Map(this.headers)), m))
        if (Object.getPrototypeOf(m) === Object.prototype) for (var x in m) h.set(x, m[x])
        else if (typeof m.keys == 'function' && typeof m.get == 'function')
          for (const S of m.keys()) h.set(S, m.get(S))
        else throw Error('Unknown input type for opt_headers: ' + String(m))
      ;((m = Array.from(h.keys()).find((S) => S.toLowerCase() == 'content-type')),
        (x = l.FormData && o instanceof l.FormData),
        !(0 <= Array.prototype.indexOf.call(Fp, c, void 0)) ||
          m ||
          x ||
          h.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'))
      for (const [S, $] of h) this.g.setRequestHeader(S, $)
      ;(this.H && (this.g.responseType = this.H),
        'withCredentials' in this.g &&
          this.g.withCredentials !== this.J &&
          (this.g.withCredentials = this.J))
      try {
        ;(yu(this), (this.u = !0), this.g.send(o), (this.u = !1))
      } catch (S) {
        mu(this, S)
      }
    }))
  function mu(o, c) {
    ;((o.h = !1), o.g && ((o.j = !0), o.g.abort(), (o.j = !1)), (o.l = c), (o.m = 5), gu(o), ei(o))
  }
  function gu(o) {
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
      ei(this))
  }),
    (e.N = function () {
      ;(this.g &&
        (this.h && ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)), ei(this, !0)),
        Vt.aa.N.call(this))
    }),
    (e.Ea = function () {
      this.s || (this.B || this.u || this.j ? _u(this) : this.bb())
    }),
    (e.bb = function () {
      _u(this)
    }))
  function _u(o) {
    if (o.h && typeof a < 'u' && (!o.v[1] || Ze(o) != 4 || o.Z() != 2)) {
      if (o.u && Ze(o) == 4) St(o.Ea, 0, o)
      else if ((ot(o, 'readystatechange'), Ze(o) == 4)) {
        o.h = !1
        try {
          const $ = o.Z()
          t: switch ($) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var c = !0
              break t
            default:
              c = !1
          }
          var h
          if (!(h = c)) {
            var m
            if ((m = $ === 0)) {
              var x = String(o.D).match(au)[1] || null
              ;(!x && l.self && l.self.location && (x = l.self.location.protocol.slice(0, -1)),
                (m = !Lp.test(x ? x.toLowerCase() : '')))
            }
            h = m
          }
          if (h) (ot(o, 'complete'), ot(o, 'success'))
          else {
            o.m = 6
            try {
              var S = 2 < Ze(o) ? o.g.statusText : ''
            } catch {
              S = ''
            }
            ;((o.l = S + ' [' + o.Z() + ']'), gu(o))
          }
        } finally {
          ei(o)
        }
      }
    }
  }
  function ei(o, c) {
    if (o.g) {
      yu(o)
      const h = o.g,
        m = o.v[0] ? () => {} : null
      ;((o.g = null), (o.v = null), c || ot(o, 'ready'))
      try {
        h.onreadystatechange = m
      } catch {}
    }
  }
  function yu(o) {
    o.I && (l.clearTimeout(o.I), (o.I = null))
  }
  e.isActive = function () {
    return !!this.g
  }
  function Ze(o) {
    return o.g ? o.g.readyState : 0
  }
  ;((e.Z = function () {
    try {
      return 2 < Ze(this) ? this.g.status : -1
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
        var c = this.g.responseText
        return (o && c.indexOf(o) == 0 && (c = c.substring(o.length)), Ee(c))
      }
    }))
  function vu(o) {
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
  function Up(o) {
    const c = {}
    o = ((o.g && 2 <= Ze(o) && o.g.getAllResponseHeaders()) || '').split(`\r
`)
    for (let m = 0; m < o.length; m++) {
      if (W(o[m])) continue
      var h = g(o[m])
      const x = h[0]
      if (((h = h[1]), typeof h != 'string')) continue
      h = h.trim()
      const S = c[x] || []
      ;((c[x] = S), S.push(h))
    }
    A(c, function (m) {
      return m.join(', ')
    })
  }
  ;((e.Ba = function () {
    return this.m
  }),
    (e.Ka = function () {
      return typeof this.l == 'string' ? this.l : String(this.l)
    }))
  function Qr(o, c, h) {
    return (h && h.internalChannelParams && h.internalChannelParams[o]) || c
  }
  function Eu(o) {
    ;((this.Aa = 0),
      (this.i = []),
      (this.j = new $r()),
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
      (this.Va = Qr('failFast', !1, o)),
      (this.F = this.C = this.u = this.s = this.l = null),
      (this.X = !0),
      (this.za = this.T = -1),
      (this.Y = this.v = this.B = 0),
      (this.Ta = Qr('baseRetryDelayMs', 5e3, o)),
      (this.cb = Qr('retryDelaySeedMs', 1e4, o)),
      (this.Wa = Qr('forwardChannelMaxRetries', 2, o)),
      (this.wa = Qr('forwardChannelRequestTimeoutMs', 2e4, o)),
      (this.pa = (o && o.xmlHttpFactory) || void 0),
      (this.Xa = (o && o.Tb) || void 0),
      (this.Ca = (o && o.useFetchStreams) || !1),
      (this.L = void 0),
      (this.J = (o && o.supportsCrossDomainXhr) || !1),
      (this.K = ''),
      (this.h = new eu(o && o.concurrentRequestLimit)),
      (this.Da = new Op()),
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
  ;((e = Eu.prototype),
    (e.la = 8),
    (e.G = 1),
    (e.connect = function (o, c, h, m) {
      ;(le(0),
        (this.W = o),
        (this.H = c || {}),
        h && m !== void 0 && ((this.H.OSID = h), (this.H.OAID = m)),
        (this.F = this.X),
        (this.I = Su(this, null, this.W)),
        ri(this))
    }))
  function Po(o) {
    if ((Tu(o), o.G == 3)) {
      var c = o.U++,
        h = Je(o.I)
      if (
        (Rt(h, 'SID', o.K),
        Rt(h, 'RID', c),
        Rt(h, 'TYPE', 'terminate'),
        Yr(o, h),
        (c = new yn(o, o.j, c)),
        (c.L = 2),
        (c.v = Js(Je(h))),
        (h = !1),
        l.navigator && l.navigator.sendBeacon)
      )
        try {
          h = l.navigator.sendBeacon(c.v.toString(), '')
        } catch {}
      ;(!h && l.Image && ((new Image().src = c.v), (h = !0)),
        h || ((c.g = Cu(c.j, null)), c.g.ea(c.v)),
        (c.F = Date.now()),
        Qs(c))
    }
    Pu(o)
  }
  function ni(o) {
    o.g && (Co(o), o.g.cancel(), (o.g = null))
  }
  function Tu(o) {
    ;(ni(o),
      o.u && (l.clearTimeout(o.u), (o.u = null)),
      si(o),
      o.h.cancel(),
      o.s && (typeof o.s == 'number' && l.clearTimeout(o.s), (o.s = null)))
  }
  function ri(o) {
    if (!nu(o.h) && !o.s) {
      o.s = !0
      var c = o.Ga
      ;(Et || Nn(), pt || (Et(), (pt = !0)), xe.add(c, o), (o.B = 0))
    }
  }
  function Bp(o, c) {
    return ru(o.h) >= o.h.j - (o.s ? 1 : 0)
      ? !1
      : o.s
        ? ((o.i = c.D.concat(o.i)), !0)
        : o.G == 1 || o.G == 2 || o.B >= (o.Va ? 0 : o.Wa)
          ? !1
          : ((o.s = jr(w(o.Ga, o, c), xu(o, o.B))), o.B++, !0)
  }
  e.Ga = function (o) {
    if (this.s)
      if (((this.s = null), this.G == 1)) {
        if (!o) {
          ;((this.U = Math.floor(1e5 * Math.random())), (o = this.U++))
          const x = new yn(this, this.j, o)
          let S = this.o
          if (
            (this.S && (S ? ((S = y(S)), d(S, this.S)) : (S = this.S)),
            this.m !== null || this.O || ((x.H = S), (S = null)),
            this.P)
          )
            t: {
              for (var c = 0, h = 0; h < this.i.length; h++) {
                e: {
                  var m = this.i[h]
                  if ('__data__' in m.map && ((m = m.map.__data__), typeof m == 'string')) {
                    m = m.length
                    break e
                  }
                  m = void 0
                }
                if (m === void 0) break
                if (((c += m), 4096 < c)) {
                  c = h
                  break t
                }
                if (c === 4096 || h === this.i.length - 1) {
                  c = h + 1
                  break t
                }
              }
              c = 1e3
            }
          else c = 1e3
          ;((c = wu(this, x, c)),
            (h = Je(this.I)),
            Rt(h, 'RID', o),
            Rt(h, 'CVER', 22),
            this.D && Rt(h, 'X-HTTP-Session-Id', this.D),
            Yr(this, h),
            S &&
              (this.O
                ? (c = 'headers=' + encodeURIComponent(String(pu(S))) + '&' + c)
                : this.m && xo(h, this.m, S)),
            Ro(this.h, x),
            this.Ua && Rt(h, 'TYPE', 'init'),
            this.P
              ? (Rt(h, '$req', c), Rt(h, 'SID', 'null'), (x.T = !0), bo(x, h, null))
              : bo(x, h, c),
            (this.G = 2))
        }
      } else this.G == 3 && (o ? bu(this, o) : this.i.length == 0 || nu(this.h) || bu(this))
  }
  function bu(o, c) {
    var h
    c ? (h = c.l) : (h = o.U++)
    const m = Je(o.I)
    ;(Rt(m, 'SID', o.K),
      Rt(m, 'RID', h),
      Rt(m, 'AID', o.T),
      Yr(o, m),
      o.m && o.o && xo(m, o.m, o.o),
      (h = new yn(o, o.j, h, o.B + 1)),
      o.m === null && (h.H = o.o),
      c && (o.i = c.D.concat(o.i)),
      (c = wu(o, h, 1e3)),
      (h.I = Math.round(0.5 * o.wa) + Math.round(0.5 * o.wa * Math.random())),
      Ro(o.h, h),
      bo(h, m, c))
  }
  function Yr(o, c) {
    ;(o.H &&
      dt(o.H, function (h, m) {
        Rt(c, m, h)
      }),
      o.l &&
        ou({}, function (h, m) {
          Rt(c, m, h)
        }))
  }
  function wu(o, c, h) {
    h = Math.min(o.i.length, h)
    var m = o.l ? w(o.l.Na, o.l, o) : null
    t: {
      var x = o.i
      let S = -1
      for (;;) {
        const $ = ['count=' + h]
        S == -1 ? (0 < h ? ((S = x[0].g), $.push('ofs=' + S)) : (S = 0)) : $.push('ofs=' + S)
        let wt = !0
        for (let Wt = 0; Wt < h; Wt++) {
          let mt = x[Wt].g
          const te = x[Wt].map
          if (((mt -= S), 0 > mt)) ((S = Math.max(0, x[Wt].g - 100)), (wt = !1))
          else
            try {
              Mp(te, $, 'req' + mt + '_')
            } catch {
              m && m(te)
            }
        }
        if (wt) {
          m = $.join('&')
          break t
        }
      }
    }
    return ((o = o.i.splice(0, h)), (c.D = o), m)
  }
  function Au(o) {
    if (!o.g && !o.u) {
      o.Y = 1
      var c = o.Fa
      ;(Et || Nn(), pt || (Et(), (pt = !0)), xe.add(c, o), (o.v = 0))
    }
  }
  function So(o) {
    return o.g || o.u || 3 <= o.v ? !1 : (o.Y++, (o.u = jr(w(o.Fa, o), xu(o, o.v))), o.v++, !0)
  }
  ;((e.Fa = function () {
    if (((this.u = null), Iu(this), this.ba && !(this.M || this.g == null || 0 >= this.R))) {
      var o = 2 * this.R
      ;(this.j.info('BP detection timer enabled: ' + o), (this.A = jr(w(this.ab, this), o)))
    }
  }),
    (e.ab = function () {
      this.A &&
        ((this.A = null),
        this.j.info('BP detection timeout reached.'),
        this.j.info('Buffering proxy detected and switch to long-polling!'),
        (this.F = !1),
        (this.M = !0),
        le(10),
        ni(this),
        Iu(this))
    }))
  function Co(o) {
    o.A != null && (l.clearTimeout(o.A), (o.A = null))
  }
  function Iu(o) {
    ;((o.g = new yn(o, o.j, 'rpc', o.Y)), o.m === null && (o.g.H = o.o), (o.g.O = 0))
    var c = Je(o.qa)
    ;(Rt(c, 'RID', 'rpc'),
      Rt(c, 'SID', o.K),
      Rt(c, 'AID', o.T),
      Rt(c, 'CI', o.F ? '0' : '1'),
      !o.F && o.ja && Rt(c, 'TO', o.ja),
      Rt(c, 'TYPE', 'xmlhttp'),
      Yr(o, c),
      o.m && o.o && xo(c, o.m, o.o),
      o.L && (o.g.I = o.L))
    var h = o.g
    ;((o = o.ia), (h.L = 1), (h.v = Js(Je(c))), (h.m = null), (h.P = !0), Jl(h, o))
  }
  e.Za = function () {
    this.C != null && ((this.C = null), ni(this), So(this), le(19))
  }
  function si(o) {
    o.C != null && (l.clearTimeout(o.C), (o.C = null))
  }
  function Ru(o, c) {
    var h = null
    if (o.g == c) {
      ;(si(o), Co(o), (o.g = null))
      var m = 2
    } else if (Io(o.h, c)) ((h = c.D), su(o.h, c), (m = 1))
    else return
    if (o.G != 0) {
      if (c.o)
        if (m == 1) {
          ;((h = c.m ? c.m.length : 0), (c = Date.now() - c.F))
          var x = o.B
          ;((m = zs()), ot(m, new Gl(m, h)), ri(o))
        } else Au(o)
      else if (
        ((x = c.s), x == 3 || (x == 0 && 0 < c.X) || !((m == 1 && Bp(o, c)) || (m == 2 && So(o))))
      )
        switch ((h && 0 < h.length && ((c = o.h), (c.i = c.i.concat(h))), x)) {
          case 1:
            Bn(o, 5)
            break
          case 4:
            Bn(o, 10)
            break
          case 3:
            Bn(o, 6)
            break
          default:
            Bn(o, 2)
        }
    }
  }
  function xu(o, c) {
    let h = o.Ta + Math.floor(Math.random() * o.cb)
    return (o.isActive() || (h *= 2), h * c)
  }
  function Bn(o, c) {
    if ((o.j.info('Error code ' + c), c == 2)) {
      var h = w(o.fb, o),
        m = o.Xa
      const x = !m
      ;((m = new Un(m || '//www.google.com/images/cleardot.gif')),
        (l.location && l.location.protocol == 'http') || Ys(m, 'https'),
        Js(m),
        x ? Dp(m.toString(), h) : Np(m.toString(), h))
    } else le(2)
    ;((o.G = 0), o.l && o.l.sa(c), Pu(o), Tu(o))
  }
  e.fb = function (o) {
    o
      ? (this.j.info('Successfully pinged google.com'), le(2))
      : (this.j.info('Failed to ping google.com'), le(1))
  }
  function Pu(o) {
    if (((o.G = 0), (o.ka = []), o.l)) {
      const c = iu(o.h)
      ;((c.length != 0 || o.i.length != 0) &&
        (D(o.ka, c), D(o.ka, o.i), (o.h.i.length = 0), k(o.i), (o.i.length = 0)),
        o.l.ra())
    }
  }
  function Su(o, c, h) {
    var m = h instanceof Un ? Je(h) : new Un(h)
    if (m.g != '') (c && (m.g = c + '.' + m.g), Xs(m, m.s))
    else {
      var x = l.location
      ;((m = x.protocol), (c = c ? c + '.' + x.hostname : x.hostname), (x = +x.port))
      var S = new Un(null)
      ;(m && Ys(S, m), c && (S.g = c), x && Xs(S, x), h && (S.l = h), (m = S))
    }
    return ((h = o.D), (c = o.ya), h && c && Rt(m, h, c), Rt(m, 'VER', o.la), Yr(o, m), m)
  }
  function Cu(o, c, h) {
    if (c && !o.J) throw Error("Can't create secondary domain capable XhrIo object.")
    return ((c = o.Ca && !o.pa ? new Vt(new Zs({ eb: h })) : new Vt(o.pa)), c.Ha(o.J), c)
  }
  e.isActive = function () {
    return !!this.l && this.l.isActive(this)
  }
  function ku() {}
  ;((e = ku.prototype),
    (e.ua = function () {}),
    (e.ta = function () {}),
    (e.sa = function () {}),
    (e.ra = function () {}),
    (e.isActive = function () {
      return !0
    }),
    (e.Na = function () {}))
  function ii() {}
  ii.prototype.g = function (o, c) {
    return new _e(o, c)
  }
  function _e(o, c) {
    ;(tt.call(this),
      (this.g = new Eu(c)),
      (this.l = o),
      (this.h = (c && c.messageUrlParams) || null),
      (o = (c && c.messageHeaders) || null),
      c &&
        c.clientProtocolHeaderRequired &&
        (o ? (o['X-Client-Protocol'] = 'webchannel') : (o = { 'X-Client-Protocol': 'webchannel' })),
      (this.g.o = o),
      (o = (c && c.initMessageHeaders) || null),
      c &&
        c.messageContentType &&
        (o
          ? (o['X-WebChannel-Content-Type'] = c.messageContentType)
          : (o = { 'X-WebChannel-Content-Type': c.messageContentType })),
      c &&
        c.va &&
        (o
          ? (o['X-WebChannel-Client-Profile'] = c.va)
          : (o = { 'X-WebChannel-Client-Profile': c.va })),
      (this.g.S = o),
      (o = c && c.Sb) && !W(o) && (this.g.m = o),
      (this.v = (c && c.supportsCrossDomainXhr) || !1),
      (this.u = (c && c.sendRawJson) || !1),
      (c = c && c.httpSessionIdParam) &&
        !W(c) &&
        ((this.g.D = c),
        (o = this.h),
        o !== null && c in o && ((o = this.h), c in o && delete o[c])),
      (this.j = new ar(this)))
  }
  ;(O(_e, tt),
    (_e.prototype.m = function () {
      ;((this.g.l = this.j), this.v && (this.g.J = !0), this.g.connect(this.l, this.h || void 0))
    }),
    (_e.prototype.close = function () {
      Po(this.g)
    }),
    (_e.prototype.o = function (o) {
      var c = this.g
      if (typeof o == 'string') {
        var h = {}
        ;((h.__data__ = o), (o = h))
      } else this.u && ((h = {}), (h.__data__ = zt(o)), (o = h))
      ;(c.i.push(new wp(c.Ya++, o)), c.G == 3 && ri(c))
    }),
    (_e.prototype.N = function () {
      ;((this.g.l = null), delete this.j, Po(this.g), delete this.g, _e.aa.N.call(this))
    }))
  function Vu(o) {
    ;(yo.call(this),
      o.__headers__ &&
        ((this.headers = o.__headers__),
        (this.statusCode = o.__status__),
        delete o.__headers__,
        delete o.__status__))
    var c = o.__sm__
    if (c) {
      t: {
        for (const h in c) {
          o = h
          break t
        }
        o = void 0
      }
      ;((this.i = o) && ((o = this.i), (c = c !== null && o in c ? c[o] : void 0)), (this.data = c))
    } else this.data = o
  }
  O(Vu, yo)
  function Du() {
    ;(vo.call(this), (this.status = 1))
  }
  O(Du, vo)
  function ar(o) {
    this.g = o
  }
  ;(O(ar, ku),
    (ar.prototype.ua = function () {
      ot(this.g, 'a')
    }),
    (ar.prototype.ta = function (o) {
      ot(this.g, new Vu(o))
    }),
    (ar.prototype.sa = function (o) {
      ot(this.g, new Du())
    }),
    (ar.prototype.ra = function () {
      ot(this.g, 'b')
    }),
    (ii.prototype.createWebChannel = ii.prototype.g),
    (_e.prototype.send = _e.prototype.o),
    (_e.prototype.open = _e.prototype.m),
    (_e.prototype.close = _e.prototype.close),
    (Hf = function () {
      return new ii()
    }),
    (Kf = function () {
      return zs()
    }),
    (qf = Ln),
    (ya = {
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
    (Ws.NO_ERROR = 0),
    (Ws.TIMEOUT = 8),
    (Ws.HTTP_ERROR = 6),
    (bi = Ws),
    (Ql.COMPLETE = 'complete'),
    ($f = Ql),
    (Kl.EventType = Ur),
    (Ur.OPEN = 'a'),
    (Ur.CLOSE = 'b'),
    (Ur.ERROR = 'c'),
    (Ur.MESSAGE = 'd'),
    (tt.prototype.listen = tt.prototype.K),
    (ss = Kl),
    (Vt.prototype.listenOnce = Vt.prototype.L),
    (Vt.prototype.getLastError = Vt.prototype.Ka),
    (Vt.prototype.getLastErrorCode = Vt.prototype.Ba),
    (Vt.prototype.getStatus = Vt.prototype.Z),
    (Vt.prototype.getResponseJson = Vt.prototype.Oa),
    (Vt.prototype.getResponseText = Vt.prototype.oa),
    (Vt.prototype.send = Vt.prototype.ea),
    (Vt.prototype.setWithCredentials = Vt.prototype.Ha),
    (jf = Vt))
}).apply(typeof ci < 'u' ? ci : typeof self < 'u' ? self : typeof window < 'u' ? window : {})
const xc = '@firebase/firestore'
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
 */ class re {
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
;((re.UNAUTHENTICATED = new re(null)),
  (re.GOOGLE_CREDENTIALS = new re('google-credentials-uid')),
  (re.FIRST_PARTY = new re('first-party-uid')),
  (re.MOCK_USER = new re('mock-user')))
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
 */ let Vr = '10.14.0'
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
 */ const Xn = new nl('@firebase/firestore')
function es() {
  return Xn.logLevel
}
function G(e, ...t) {
  if (Xn.logLevel <= ft.DEBUG) {
    const n = t.map(il)
    Xn.debug(`Firestore (${Vr}): ${e}`, ...n)
  }
}
function dn(e, ...t) {
  if (Xn.logLevel <= ft.ERROR) {
    const n = t.map(il)
    Xn.error(`Firestore (${Vr}): ${e}`, ...n)
  }
}
function Ar(e, ...t) {
  if (Xn.logLevel <= ft.WARN) {
    const n = t.map(il)
    Xn.warn(`Firestore (${Vr}): ${e}`, ...n)
  }
}
function il(e) {
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
  const t = `FIRESTORE (${Vr}) INTERNAL ASSERTION FAILED: ` + e
  throw (dn(t), new Error(t))
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
 */ const U = {
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
class X extends er {
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
 */ class In {
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
 */ class zf {
  constructor(t, n) {
    ;((this.user = n),
      (this.type = 'OAuth'),
      (this.headers = new Map()),
      this.headers.set('Authorization', `Bearer ${t}`))
  }
}
class jy {
  getToken() {
    return Promise.resolve(null)
  }
  invalidateToken() {}
  start(t, n) {
    t.enqueueRetryable(() => n(re.UNAUTHENTICATED))
  }
  shutdown() {}
}
class $y {
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
class qy {
  constructor(t) {
    ;((this.t = t),
      (this.currentUser = re.UNAUTHENTICATED),
      (this.i = 0),
      (this.forceRefresh = !1),
      (this.auth = null))
  }
  start(t, n) {
    Tt(this.o === void 0)
    let r = this.i
    const s = (u) => (this.i !== r ? ((r = this.i), n(u)) : Promise.resolve())
    let i = new In()
    this.o = () => {
      ;(this.i++,
        (this.currentUser = this.u()),
        i.resolve(),
        (i = new In()),
        t.enqueueRetryable(() => s(this.currentUser)))
    }
    const a = () => {
        const u = i
        t.enqueueRetryable(async () => {
          ;(await u.promise, await s(this.currentUser))
        })
      },
      l = (u) => {
        ;(G('FirebaseAuthCredentialsProvider', 'Auth detected'),
          (this.auth = u),
          this.o && (this.auth.addAuthTokenListener(this.o), a()))
      }
    ;(this.t.onInit((u) => l(u)),
      setTimeout(() => {
        if (!this.auth) {
          const u = this.t.getImmediate({ optional: !0 })
          u
            ? l(u)
            : (G('FirebaseAuthCredentialsProvider', 'Auth not yet detected'),
              i.resolve(),
              (i = new In()))
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
                ? (G('FirebaseAuthCredentialsProvider', 'getToken aborted due to token change.'),
                  this.getToken())
                : r
                  ? (Tt(typeof r.accessToken == 'string'), new zf(r.accessToken, this.currentUser))
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
    return (Tt(t === null || typeof t == 'string'), new re(t))
  }
}
class Ky {
  constructor(t, n, r) {
    ;((this.l = t),
      (this.h = n),
      (this.P = r),
      (this.type = 'FirstParty'),
      (this.user = re.FIRST_PARTY),
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
class Hy {
  constructor(t, n, r) {
    ;((this.l = t), (this.h = n), (this.P = r))
  }
  getToken() {
    return Promise.resolve(new Ky(this.l, this.h, this.P))
  }
  start(t, n) {
    t.enqueueRetryable(() => n(re.FIRST_PARTY))
  }
  shutdown() {}
  invalidateToken() {}
}
class zy {
  constructor(t) {
    ;((this.value = t),
      (this.type = 'AppCheck'),
      (this.headers = new Map()),
      t && t.length > 0 && this.headers.set('x-firebase-appcheck', this.value))
  }
}
class Wy {
  constructor(t) {
    ;((this.A = t), (this.forceRefresh = !1), (this.appCheck = null), (this.R = null))
  }
  start(t, n) {
    Tt(this.o === void 0)
    const r = (i) => {
      i.error != null &&
        G(
          'FirebaseAppCheckTokenProvider',
          `Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`
        )
      const a = i.token !== this.R
      return (
        (this.R = i.token),
        G('FirebaseAppCheckTokenProvider', `Received ${a ? 'new' : 'existing'} token.`),
        a ? n(i.token) : Promise.resolve()
      )
    }
    this.o = (i) => {
      t.enqueueRetryable(() => r(i))
    }
    const s = (i) => {
      ;(G('FirebaseAppCheckTokenProvider', 'AppCheck detected'),
        (this.appCheck = i),
        this.o && this.appCheck.addTokenListener(this.o))
    }
    ;(this.A.onInit((i) => s(i)),
      setTimeout(() => {
        if (!this.appCheck) {
          const i = this.A.getImmediate({ optional: !0 })
          i ? s(i) : G('FirebaseAppCheckTokenProvider', 'AppCheck not yet detected')
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
              n ? (Tt(typeof n.token == 'string'), (this.R = n.token), new zy(n.token)) : null
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
 */ function Gy(e) {
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
 */ class Wf {
  static newId() {
    const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      n = Math.floor(256 / t.length) * t.length
    let r = ''
    for (; r.length < 20; ) {
      const s = Gy(40)
      for (let i = 0; i < s.length; ++i)
        r.length < 20 && s[i] < n && (r += t.charAt(s[i] % t.length))
    }
    return r
  }
}
function _t(e, t) {
  return e < t ? -1 : e > t ? 1 : 0
}
function Ir(e, t, n) {
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
 */ class $t {
  constructor(t, n) {
    if (((this.seconds = t), (this.nanoseconds = n), n < 0))
      throw new X(U.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n)
    if (n >= 1e9) throw new X(U.INVALID_ARGUMENT, 'Timestamp nanoseconds out of range: ' + n)
    if (t < -62135596800) throw new X(U.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t)
    if (t >= 253402300800) throw new X(U.INVALID_ARGUMENT, 'Timestamp seconds out of range: ' + t)
  }
  static now() {
    return $t.fromMillis(Date.now())
  }
  static fromDate(t) {
    return $t.fromMillis(t.getTime())
  }
  static fromMillis(t) {
    const n = Math.floor(t / 1e3),
      r = Math.floor(1e6 * (t - 1e3 * n))
    return new $t(n, r)
  }
  toDate() {
    return new Date(this.toMillis())
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6
  }
  _compareTo(t) {
    return this.seconds === t.seconds
      ? _t(this.nanoseconds, t.nanoseconds)
      : _t(this.seconds, t.seconds)
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
    return new st(new $t(0, 0))
  }
  static max() {
    return new st(new $t(253402300799, 999999999))
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
 */ class Rs {
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
    return Rs.comparator(this, t) === 0
  }
  child(t) {
    const n = this.segments.slice(this.offset, this.limit())
    return (
      t instanceof Rs
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
class Pt extends Rs {
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
          U.INVALID_ARGUMENT,
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
const Qy = /^[_a-zA-Z][_a-zA-Z0-9]*$/
class Yt extends Rs {
  construct(t, n, r) {
    return new Yt(t, n, r)
  }
  static isValidIdentifier(t) {
    return Qy.test(t)
  }
  canonicalString() {
    return this.toArray()
      .map(
        (t) => (
          (t = t.replace(/\\/g, '\\\\').replace(/`/g, '\\`')),
          Yt.isValidIdentifier(t) || (t = '`' + t + '`'),
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
    return new Yt(['__name__'])
  }
  static fromServerFormat(t) {
    const n = []
    let r = '',
      s = 0
    const i = () => {
      if (r.length === 0)
        throw new X(
          U.INVALID_ARGUMENT,
          `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
        )
      ;(n.push(r), (r = ''))
    }
    let a = !1
    for (; s < t.length; ) {
      const l = t[s]
      if (l === '\\') {
        if (s + 1 === t.length)
          throw new X(U.INVALID_ARGUMENT, 'Path has trailing escape character: ' + t)
        const u = t[s + 1]
        if (u !== '\\' && u !== '.' && u !== '`')
          throw new X(U.INVALID_ARGUMENT, 'Path has invalid escape sequence: ' + t)
        ;((r += u), (s += 2))
      } else l === '`' ? ((a = !a), s++) : l !== '.' || a ? ((r += l), s++) : (i(), s++)
    }
    if ((i(), a)) throw new X(U.INVALID_ARGUMENT, 'Unterminated ` in path: ' + t)
    return new Yt(n)
  }
  static emptyPath() {
    return new Yt([])
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
function Yy(e, t) {
  const n = e.toTimestamp().seconds,
    r = e.toTimestamp().nanoseconds + 1,
    s = st.fromTimestamp(r === 1e9 ? new $t(n + 1, 0) : new $t(n, r))
  return new kn(s, Z.empty(), t)
}
function Xy(e) {
  return new kn(e.readTime, e.key, -1)
}
class kn {
  constructor(t, n, r) {
    ;((this.readTime = t), (this.documentKey = n), (this.largestBatchId = r))
  }
  static min() {
    return new kn(st.min(), Z.empty(), -1)
  }
  static max() {
    return new kn(st.max(), Z.empty(), -1)
  }
}
function Jy(e, t) {
  let n = e.readTime.compareTo(t.readTime)
  return n !== 0
    ? n
    : ((n = Z.comparator(e.documentKey, t.documentKey)),
      n !== 0 ? n : _t(e.largestBatchId, t.largestBatchId))
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
 */ const Zy =
  'The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.'
class tv {
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
 */ async function Fs(e) {
  if (e.code !== U.FAILED_PRECONDITION || e.message !== Zy) throw e
  G('LocalStore', 'Unexpectedly lost primary lease')
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
 */ class F {
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
        : new F((r, s) => {
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
      return n instanceof F ? n : F.resolve(n)
    } catch (n) {
      return F.reject(n)
    }
  }
  wrapSuccess(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : F.resolve(n)
  }
  wrapFailure(t, n) {
    return t ? this.wrapUserFunction(() => t(n)) : F.reject(n)
  }
  static resolve(t) {
    return new F((n, r) => {
      n(t)
    })
  }
  static reject(t) {
    return new F((n, r) => {
      r(t)
    })
  }
  static waitFor(t) {
    return new F((n, r) => {
      let s = 0,
        i = 0,
        a = !1
      ;(t.forEach((l) => {
        ;(++s,
          l.next(
            () => {
              ;(++i, a && i === s && n())
            },
            (u) => r(u)
          ))
      }),
        (a = !0),
        i === s && n())
    })
  }
  static or(t) {
    let n = F.resolve(!1)
    for (const r of t) n = n.next((s) => (s ? F.resolve(s) : r()))
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
    return new F((r, s) => {
      const i = t.length,
        a = new Array(i)
      let l = 0
      for (let u = 0; u < i; u++) {
        const f = u
        n(t[f]).next(
          (p) => {
            ;((a[f] = p), ++l, l === i && r(a))
          },
          (p) => s(p)
        )
      }
    })
  }
  static doWhile(t, n) {
    return new F((r, s) => {
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
function ev(e) {
  const t = e.match(/Android ([\d.]+)/i),
    n = t ? t[1].split('.').slice(0, 2).join('.') : '-1'
  return Number(n)
}
function Us(e) {
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
 */ class ol {
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
ol.oe = -1
function so(e) {
  return e == null
}
function Oi(e) {
  return e === 0 && 1 / e == -1 / 0
}
function nv(e) {
  return (
    typeof e == 'number' &&
    Number.isInteger(e) &&
    !Oi(e) &&
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
 */ function Pc(e) {
  let t = 0
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++
  return t
}
function Dr(e, t) {
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
}
function Gf(e) {
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
 */ class kt {
  constructor(t, n) {
    ;((this.comparator = t), (this.root = n || Qt.EMPTY))
  }
  insert(t, n) {
    return new kt(
      this.comparator,
      this.root.insert(t, n, this.comparator).copy(null, null, Qt.BLACK, null, null)
    )
  }
  remove(t) {
    return new kt(
      this.comparator,
      this.root.remove(t, this.comparator).copy(null, null, Qt.BLACK, null, null)
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
    return new hi(this.root, null, this.comparator, !1)
  }
  getIteratorFrom(t) {
    return new hi(this.root, t, this.comparator, !1)
  }
  getReverseIterator() {
    return new hi(this.root, null, this.comparator, !0)
  }
  getReverseIteratorFrom(t) {
    return new hi(this.root, t, this.comparator, !0)
  }
}
class hi {
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
class Qt {
  constructor(t, n, r, s, i) {
    ;((this.key = t),
      (this.value = n),
      (this.color = r ?? Qt.RED),
      (this.left = s ?? Qt.EMPTY),
      (this.right = i ?? Qt.EMPTY),
      (this.size = this.left.size + 1 + this.right.size))
  }
  copy(t, n, r, s, i) {
    return new Qt(t ?? this.key, n ?? this.value, r ?? this.color, s ?? this.left, i ?? this.right)
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
    if (this.left.isEmpty()) return Qt.EMPTY
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
        if (s.right.isEmpty()) return Qt.EMPTY
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
    const t = this.copy(null, null, Qt.RED, null, this.right.left)
    return this.right.copy(null, null, this.color, t, null)
  }
  rotateRight() {
    const t = this.copy(null, null, Qt.RED, this.left.right, null)
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
;((Qt.EMPTY = null), (Qt.RED = !0), (Qt.BLACK = !1))
Qt.EMPTY = new (class {
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
    return new Qt(t, n)
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
 */ class Xt {
  constructor(t) {
    ;((this.comparator = t), (this.data = new kt(this.comparator)))
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
    return new Sc(this.data.getIterator())
  }
  getIteratorFrom(t) {
    return new Sc(this.data.getIteratorFrom(t))
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
    if (!(t instanceof Xt) || this.size !== t.size) return !1
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
    const n = new Xt(this.comparator)
    return ((n.data = t), n)
  }
}
class Sc {
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
 */ class Se {
  constructor(t) {
    ;((this.fields = t), t.sort(Yt.comparator))
  }
  static empty() {
    return new Se([])
  }
  unionWith(t) {
    let n = new Xt(Yt.comparator)
    for (const r of this.fields) n = n.add(r)
    for (const r of t) n = n.add(r)
    return new Se(n.toArray())
  }
  covers(t) {
    for (const n of this.fields) if (n.isPrefixOf(t)) return !0
    return !1
  }
  isEqual(t) {
    return Ir(this.fields, t.fields, (n, r) => n.isEqual(r))
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
 */ class Qf extends Error {
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
 */ class Jt {
  constructor(t) {
    this.binaryString = t
  }
  static fromBase64String(t) {
    const n = (function (s) {
      try {
        return atob(s)
      } catch (i) {
        throw typeof DOMException < 'u' && i instanceof DOMException
          ? new Qf('Invalid base64 string: ' + i)
          : i
      }
    })(t)
    return new Jt(n)
  }
  static fromUint8Array(t) {
    const n = (function (s) {
      let i = ''
      for (let a = 0; a < s.length; ++a) i += String.fromCharCode(s[a])
      return i
    })(t)
    return new Jt(n)
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
    return _t(this.binaryString, t.binaryString)
  }
  isEqual(t) {
    return this.binaryString === t.binaryString
  }
}
Jt.EMPTY_BYTE_STRING = new Jt('')
const rv = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/)
function Vn(e) {
  if ((Tt(!!e), typeof e == 'string')) {
    let t = 0
    const n = rv.exec(e)
    if ((Tt(!!n), n[1])) {
      let s = n[1]
      ;((s = (s + '000000000').substr(0, 9)), (t = Number(s)))
    }
    const r = new Date(e)
    return { seconds: Math.floor(r.getTime() / 1e3), nanos: t }
  }
  return { seconds: Mt(e.seconds), nanos: Mt(e.nanos) }
}
function Mt(e) {
  return typeof e == 'number' ? e : typeof e == 'string' ? Number(e) : 0
}
function Jn(e) {
  return typeof e == 'string' ? Jt.fromBase64String(e) : Jt.fromUint8Array(e)
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
 */ function al(e) {
  var t, n
  return (
    ((n = (
      ((t = e == null ? void 0 : e.mapValue) === null || t === void 0 ? void 0 : t.fields) || {}
    ).__type__) === null || n === void 0
      ? void 0
      : n.stringValue) === 'server_timestamp'
  )
}
function ll(e) {
  const t = e.mapValue.fields.__previous_value__
  return al(t) ? ll(t) : t
}
function xs(e) {
  const t = Vn(e.mapValue.fields.__local_write_time__.timestampValue)
  return new $t(t.seconds, t.nanos)
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
 */ class sv {
  constructor(t, n, r, s, i, a, l, u, f) {
    ;((this.databaseId = t),
      (this.appId = n),
      (this.persistenceKey = r),
      (this.host = s),
      (this.ssl = i),
      (this.forceLongPolling = a),
      (this.autoDetectLongPolling = l),
      (this.longPollingOptions = u),
      (this.useFetchStreams = f))
  }
}
class Ps {
  constructor(t, n) {
    ;((this.projectId = t), (this.database = n || '(default)'))
  }
  static empty() {
    return new Ps('', '')
  }
  get isDefaultDatabase() {
    return this.database === '(default)'
  }
  isEqual(t) {
    return t instanceof Ps && t.projectId === this.projectId && t.database === this.database
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
 */ const fi = { mapValue: {} }
function Zn(e) {
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
                      ? al(e)
                        ? 4
                        : ov(e)
                          ? 9007199254740991
                          : iv(e)
                            ? 10
                            : 11
                      : rt()
}
function ze(e, t) {
  if (e === t) return !0
  const n = Zn(e)
  if (n !== Zn(t)) return !1
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0
    case 1:
      return e.booleanValue === t.booleanValue
    case 4:
      return xs(e).isEqual(xs(t))
    case 3:
      return (function (s, i) {
        if (
          typeof s.timestampValue == 'string' &&
          typeof i.timestampValue == 'string' &&
          s.timestampValue.length === i.timestampValue.length
        )
          return s.timestampValue === i.timestampValue
        const a = Vn(s.timestampValue),
          l = Vn(i.timestampValue)
        return a.seconds === l.seconds && a.nanos === l.nanos
      })(e, t)
    case 5:
      return e.stringValue === t.stringValue
    case 6:
      return (function (s, i) {
        return Jn(s.bytesValue).isEqual(Jn(i.bytesValue))
      })(e, t)
    case 7:
      return e.referenceValue === t.referenceValue
    case 8:
      return (function (s, i) {
        return (
          Mt(s.geoPointValue.latitude) === Mt(i.geoPointValue.latitude) &&
          Mt(s.geoPointValue.longitude) === Mt(i.geoPointValue.longitude)
        )
      })(e, t)
    case 2:
      return (function (s, i) {
        if ('integerValue' in s && 'integerValue' in i)
          return Mt(s.integerValue) === Mt(i.integerValue)
        if ('doubleValue' in s && 'doubleValue' in i) {
          const a = Mt(s.doubleValue),
            l = Mt(i.doubleValue)
          return a === l ? Oi(a) === Oi(l) : isNaN(a) && isNaN(l)
        }
        return !1
      })(e, t)
    case 9:
      return Ir(e.arrayValue.values || [], t.arrayValue.values || [], ze)
    case 10:
    case 11:
      return (function (s, i) {
        const a = s.mapValue.fields || {},
          l = i.mapValue.fields || {}
        if (Pc(a) !== Pc(l)) return !1
        for (const u in a)
          if (a.hasOwnProperty(u) && (l[u] === void 0 || !ze(a[u], l[u]))) return !1
        return !0
      })(e, t)
    default:
      return rt()
  }
}
function Ss(e, t) {
  return (e.values || []).find((n) => ze(n, t)) !== void 0
}
function Rr(e, t) {
  if (e === t) return 0
  const n = Zn(e),
    r = Zn(t)
  if (n !== r) return _t(n, r)
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0
    case 1:
      return _t(e.booleanValue, t.booleanValue)
    case 2:
      return (function (i, a) {
        const l = Mt(i.integerValue || i.doubleValue),
          u = Mt(a.integerValue || a.doubleValue)
        return l < u ? -1 : l > u ? 1 : l === u ? 0 : isNaN(l) ? (isNaN(u) ? 0 : -1) : 1
      })(e, t)
    case 3:
      return Cc(e.timestampValue, t.timestampValue)
    case 4:
      return Cc(xs(e), xs(t))
    case 5:
      return _t(e.stringValue, t.stringValue)
    case 6:
      return (function (i, a) {
        const l = Jn(i),
          u = Jn(a)
        return l.compareTo(u)
      })(e.bytesValue, t.bytesValue)
    case 7:
      return (function (i, a) {
        const l = i.split('/'),
          u = a.split('/')
        for (let f = 0; f < l.length && f < u.length; f++) {
          const p = _t(l[f], u[f])
          if (p !== 0) return p
        }
        return _t(l.length, u.length)
      })(e.referenceValue, t.referenceValue)
    case 8:
      return (function (i, a) {
        const l = _t(Mt(i.latitude), Mt(a.latitude))
        return l !== 0 ? l : _t(Mt(i.longitude), Mt(a.longitude))
      })(e.geoPointValue, t.geoPointValue)
    case 9:
      return kc(e.arrayValue, t.arrayValue)
    case 10:
      return (function (i, a) {
        var l, u, f, p
        const _ = i.fields || {},
          w = a.fields || {},
          P = (l = _.value) === null || l === void 0 ? void 0 : l.arrayValue,
          O = (u = w.value) === null || u === void 0 ? void 0 : u.arrayValue,
          k = _t(
            ((f = P == null ? void 0 : P.values) === null || f === void 0 ? void 0 : f.length) || 0,
            ((p = O == null ? void 0 : O.values) === null || p === void 0 ? void 0 : p.length) || 0
          )
        return k !== 0 ? k : kc(P, O)
      })(e.mapValue, t.mapValue)
    case 11:
      return (function (i, a) {
        if (i === fi.mapValue && a === fi.mapValue) return 0
        if (i === fi.mapValue) return 1
        if (a === fi.mapValue) return -1
        const l = i.fields || {},
          u = Object.keys(l),
          f = a.fields || {},
          p = Object.keys(f)
        ;(u.sort(), p.sort())
        for (let _ = 0; _ < u.length && _ < p.length; ++_) {
          const w = _t(u[_], p[_])
          if (w !== 0) return w
          const P = Rr(l[u[_]], f[p[_]])
          if (P !== 0) return P
        }
        return _t(u.length, p.length)
      })(e.mapValue, t.mapValue)
    default:
      throw rt()
  }
}
function Cc(e, t) {
  if (typeof e == 'string' && typeof t == 'string' && e.length === t.length) return _t(e, t)
  const n = Vn(e),
    r = Vn(t),
    s = _t(n.seconds, r.seconds)
  return s !== 0 ? s : _t(n.nanos, r.nanos)
}
function kc(e, t) {
  const n = e.values || [],
    r = t.values || []
  for (let s = 0; s < n.length && s < r.length; ++s) {
    const i = Rr(n[s], r[s])
    if (i) return i
  }
  return _t(n.length, r.length)
}
function xr(e) {
  return va(e)
}
function va(e) {
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
                const r = Vn(n)
                return `time(${r.seconds},${r.nanos})`
              })(e.timestampValue)
            : 'stringValue' in e
              ? e.stringValue
              : 'bytesValue' in e
                ? (function (n) {
                    return Jn(n).toBase64()
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
                          for (const i of n.values || []) (s ? (s = !1) : (r += ','), (r += va(i)))
                          return r + ']'
                        })(e.arrayValue)
                      : 'mapValue' in e
                        ? (function (n) {
                            const r = Object.keys(n.fields || {}).sort()
                            let s = '{',
                              i = !0
                            for (const a of r)
                              (i ? (i = !1) : (s += ','), (s += `${a}:${va(n.fields[a])}`))
                            return s + '}'
                          })(e.mapValue)
                        : rt()
}
function Ea(e) {
  return !!e && 'integerValue' in e
}
function ul(e) {
  return !!e && 'arrayValue' in e
}
function Vc(e) {
  return !!e && 'nullValue' in e
}
function Dc(e) {
  return !!e && 'doubleValue' in e && isNaN(Number(e.doubleValue))
}
function wi(e) {
  return !!e && 'mapValue' in e
}
function iv(e) {
  var t, n
  return (
    ((n = (
      ((t = e == null ? void 0 : e.mapValue) === null || t === void 0 ? void 0 : t.fields) || {}
    ).__type__) === null || n === void 0
      ? void 0
      : n.stringValue) === '__vector__'
  )
}
function ps(e) {
  if (e.geoPointValue) return { geoPointValue: Object.assign({}, e.geoPointValue) }
  if (e.timestampValue && typeof e.timestampValue == 'object')
    return { timestampValue: Object.assign({}, e.timestampValue) }
  if (e.mapValue) {
    const t = { mapValue: { fields: {} } }
    return (Dr(e.mapValue.fields, (n, r) => (t.mapValue.fields[n] = ps(r))), t)
  }
  if (e.arrayValue) {
    const t = { arrayValue: { values: [] } }
    for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
      t.arrayValue.values[n] = ps(e.arrayValue.values[n])
    return t
  }
  return Object.assign({}, e)
}
function ov(e) {
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
 */ class be {
  constructor(t) {
    this.value = t
  }
  static empty() {
    return new be({ mapValue: {} })
  }
  field(t) {
    if (t.isEmpty()) return this.value
    {
      let n = this.value
      for (let r = 0; r < t.length - 1; ++r)
        if (((n = (n.mapValue.fields || {})[t.get(r)]), !wi(n))) return null
      return ((n = (n.mapValue.fields || {})[t.lastSegment()]), n || null)
    }
  }
  set(t, n) {
    this.getFieldsMap(t.popLast())[t.lastSegment()] = ps(n)
  }
  setAll(t) {
    let n = Yt.emptyPath(),
      r = {},
      s = []
    t.forEach((a, l) => {
      if (!n.isImmediateParentOf(l)) {
        const u = this.getFieldsMap(n)
        ;(this.applyChanges(u, r, s), (r = {}), (s = []), (n = l.popLast()))
      }
      a ? (r[l.lastSegment()] = ps(a)) : s.push(l.lastSegment())
    })
    const i = this.getFieldsMap(n)
    this.applyChanges(i, r, s)
  }
  delete(t) {
    const n = this.field(t.popLast())
    wi(n) && n.mapValue.fields && delete n.mapValue.fields[t.lastSegment()]
  }
  isEqual(t) {
    return ze(this.value, t.value)
  }
  getFieldsMap(t) {
    let n = this.value
    n.mapValue.fields || (n.mapValue = { fields: {} })
    for (let r = 0; r < t.length; ++r) {
      let s = n.mapValue.fields[t.get(r)]
      ;((wi(s) && s.mapValue.fields) ||
        ((s = { mapValue: { fields: {} } }), (n.mapValue.fields[t.get(r)] = s)),
        (n = s))
    }
    return n.mapValue.fields
  }
  applyChanges(t, n, r) {
    Dr(n, (s, i) => (t[s] = i))
    for (const s of r) delete t[s]
  }
  clone() {
    return new be(ps(this.value))
  }
}
function Yf(e) {
  const t = []
  return (
    Dr(e.fields, (n, r) => {
      const s = new Yt([n])
      if (wi(r)) {
        const i = Yf(r.mapValue).fields
        if (i.length === 0) t.push(s)
        else for (const a of i) t.push(s.child(a))
      } else t.push(s)
    }),
    new Se(t)
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
 */ class ie {
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
    return new ie(t, 0, st.min(), st.min(), st.min(), be.empty(), 0)
  }
  static newFoundDocument(t, n, r, s) {
    return new ie(t, 1, n, st.min(), r, s, 0)
  }
  static newNoDocument(t, n) {
    return new ie(t, 2, n, st.min(), st.min(), be.empty(), 0)
  }
  static newUnknownDocument(t, n) {
    return new ie(t, 3, n, st.min(), st.min(), be.empty(), 2)
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
      (this.data = be.empty()),
      (this.documentState = 0),
      this
    )
  }
  convertToUnknownDocument(t) {
    return (
      (this.version = t),
      (this.documentType = 3),
      (this.data = be.empty()),
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
      t instanceof ie &&
      this.key.isEqual(t.key) &&
      this.version.isEqual(t.version) &&
      this.documentType === t.documentType &&
      this.documentState === t.documentState &&
      this.data.isEqual(t.data)
    )
  }
  mutableCopy() {
    return new ie(
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
 */ class Mi {
  constructor(t, n) {
    ;((this.position = t), (this.inclusive = n))
  }
}
function Nc(e, t, n) {
  let r = 0
  for (let s = 0; s < e.position.length; s++) {
    const i = t[s],
      a = e.position[s]
    if (
      (i.field.isKeyField()
        ? (r = Z.comparator(Z.fromName(a.referenceValue), n.key))
        : (r = Rr(a, n.data.field(i.field))),
      i.dir === 'desc' && (r *= -1),
      r !== 0)
    )
      break
  }
  return r
}
function Oc(e, t) {
  if (e === null) return t === null
  if (t === null || e.inclusive !== t.inclusive || e.position.length !== t.position.length)
    return !1
  for (let n = 0; n < e.position.length; n++) if (!ze(e.position[n], t.position[n])) return !1
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
 */ class Li {
  constructor(t, n = 'asc') {
    ;((this.field = t), (this.dir = n))
  }
}
function av(e, t) {
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
 */ class Xf {}
class jt extends Xf {
  constructor(t, n, r) {
    ;(super(), (this.field = t), (this.op = n), (this.value = r))
  }
  static create(t, n, r) {
    return t.isKeyField()
      ? n === 'in' || n === 'not-in'
        ? this.createKeyFieldInFilter(t, n, r)
        : new uv(t, n, r)
      : n === 'array-contains'
        ? new fv(t, r)
        : n === 'in'
          ? new dv(t, r)
          : n === 'not-in'
            ? new pv(t, r)
            : n === 'array-contains-any'
              ? new mv(t, r)
              : new jt(t, n, r)
  }
  static createKeyFieldInFilter(t, n, r) {
    return n === 'in' ? new cv(t, r) : new hv(t, r)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return this.op === '!='
      ? n !== null && this.matchesComparison(Rr(n, this.value))
      : n !== null && Zn(this.value) === Zn(n) && this.matchesComparison(Rr(n, this.value))
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
class We extends Xf {
  constructor(t, n) {
    ;(super(), (this.filters = t), (this.op = n), (this.ae = null))
  }
  static create(t, n) {
    return new We(t, n)
  }
  matches(t) {
    return Jf(this)
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
function Jf(e) {
  return e.op === 'and'
}
function Zf(e) {
  return lv(e) && Jf(e)
}
function lv(e) {
  for (const t of e.filters) if (t instanceof We) return !1
  return !0
}
function Ta(e) {
  if (e instanceof jt) return e.field.canonicalString() + e.op.toString() + xr(e.value)
  if (Zf(e)) return e.filters.map((t) => Ta(t)).join(',')
  {
    const t = e.filters.map((n) => Ta(n)).join(',')
    return `${e.op}(${t})`
  }
}
function td(e, t) {
  return e instanceof jt
    ? (function (r, s) {
        return s instanceof jt && r.op === s.op && r.field.isEqual(s.field) && ze(r.value, s.value)
      })(e, t)
    : e instanceof We
      ? (function (r, s) {
          return s instanceof We && r.op === s.op && r.filters.length === s.filters.length
            ? r.filters.reduce((i, a, l) => i && td(a, s.filters[l]), !0)
            : !1
        })(e, t)
      : void rt()
}
function ed(e) {
  return e instanceof jt
    ? (function (n) {
        return `${n.field.canonicalString()} ${n.op} ${xr(n.value)}`
      })(e)
    : e instanceof We
      ? (function (n) {
          return n.op.toString() + ' {' + n.getFilters().map(ed).join(' ,') + '}'
        })(e)
      : 'Filter'
}
class uv extends jt {
  constructor(t, n, r) {
    ;(super(t, n, r), (this.key = Z.fromName(r.referenceValue)))
  }
  matches(t) {
    const n = Z.comparator(t.key, this.key)
    return this.matchesComparison(n)
  }
}
class cv extends jt {
  constructor(t, n) {
    ;(super(t, 'in', n), (this.keys = nd('in', n)))
  }
  matches(t) {
    return this.keys.some((n) => n.isEqual(t.key))
  }
}
class hv extends jt {
  constructor(t, n) {
    ;(super(t, 'not-in', n), (this.keys = nd('not-in', n)))
  }
  matches(t) {
    return !this.keys.some((n) => n.isEqual(t.key))
  }
}
function nd(e, t) {
  var n
  return (((n = t.arrayValue) === null || n === void 0 ? void 0 : n.values) || []).map((r) =>
    Z.fromName(r.referenceValue)
  )
}
class fv extends jt {
  constructor(t, n) {
    super(t, 'array-contains', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return ul(n) && Ss(n.arrayValue, this.value)
  }
}
class dv extends jt {
  constructor(t, n) {
    super(t, 'in', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return n !== null && Ss(this.value.arrayValue, n)
  }
}
class pv extends jt {
  constructor(t, n) {
    super(t, 'not-in', n)
  }
  matches(t) {
    if (Ss(this.value.arrayValue, { nullValue: 'NULL_VALUE' })) return !1
    const n = t.data.field(this.field)
    return n !== null && !Ss(this.value.arrayValue, n)
  }
}
class mv extends jt {
  constructor(t, n) {
    super(t, 'array-contains-any', n)
  }
  matches(t) {
    const n = t.data.field(this.field)
    return (
      !(!ul(n) || !n.arrayValue.values) &&
      n.arrayValue.values.some((r) => Ss(this.value.arrayValue, r))
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
 */ class gv {
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
function Mc(e, t = null, n = [], r = [], s = null, i = null, a = null) {
  return new gv(e, t, n, r, s, i, a)
}
function cl(e) {
  const t = it(e)
  if (t.ue === null) {
    let n = t.path.canonicalString()
    ;(t.collectionGroup !== null && (n += '|cg:' + t.collectionGroup),
      (n += '|f:'),
      (n += t.filters.map((r) => Ta(r)).join(',')),
      (n += '|ob:'),
      (n += t.orderBy
        .map((r) =>
          (function (i) {
            return i.field.canonicalString() + i.dir
          })(r)
        )
        .join(',')),
      so(t.limit) || ((n += '|l:'), (n += t.limit)),
      t.startAt &&
        ((n += '|lb:'),
        (n += t.startAt.inclusive ? 'b:' : 'a:'),
        (n += t.startAt.position.map((r) => xr(r)).join(','))),
      t.endAt &&
        ((n += '|ub:'),
        (n += t.endAt.inclusive ? 'a:' : 'b:'),
        (n += t.endAt.position.map((r) => xr(r)).join(','))),
      (t.ue = n))
  }
  return t.ue
}
function hl(e, t) {
  if (e.limit !== t.limit || e.orderBy.length !== t.orderBy.length) return !1
  for (let n = 0; n < e.orderBy.length; n++) if (!av(e.orderBy[n], t.orderBy[n])) return !1
  if (e.filters.length !== t.filters.length) return !1
  for (let n = 0; n < e.filters.length; n++) if (!td(e.filters[n], t.filters[n])) return !1
  return (
    e.collectionGroup === t.collectionGroup &&
    !!e.path.isEqual(t.path) &&
    !!Oc(e.startAt, t.startAt) &&
    Oc(e.endAt, t.endAt)
  )
}
function ba(e) {
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
 */ class io {
  constructor(t, n = null, r = [], s = [], i = null, a = 'F', l = null, u = null) {
    ;((this.path = t),
      (this.collectionGroup = n),
      (this.explicitOrderBy = r),
      (this.filters = s),
      (this.limit = i),
      (this.limitType = a),
      (this.startAt = l),
      (this.endAt = u),
      (this.ce = null),
      (this.le = null),
      (this.he = null),
      this.startAt,
      this.endAt)
  }
}
function _v(e, t, n, r, s, i, a, l) {
  return new io(e, t, n, r, s, i, a, l)
}
function fl(e) {
  return new io(e)
}
function Lc(e) {
  return (
    e.filters.length === 0 &&
    e.limit === null &&
    e.startAt == null &&
    e.endAt == null &&
    (e.explicitOrderBy.length === 0 ||
      (e.explicitOrderBy.length === 1 && e.explicitOrderBy[0].field.isKeyField()))
  )
}
function yv(e) {
  return e.collectionGroup !== null
}
function ms(e) {
  const t = it(e)
  if (t.ce === null) {
    t.ce = []
    const n = new Set()
    for (const i of t.explicitOrderBy) (t.ce.push(i), n.add(i.field.canonicalString()))
    const r =
      t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : 'asc'
    ;((function (a) {
      let l = new Xt(Yt.comparator)
      return (
        a.filters.forEach((u) => {
          u.getFlattenedFilters().forEach((f) => {
            f.isInequality() && (l = l.add(f.field))
          })
        }),
        l
      )
    })(t).forEach((i) => {
      n.has(i.canonicalString()) || i.isKeyField() || t.ce.push(new Li(i, r))
    }),
      n.has(Yt.keyField().canonicalString()) || t.ce.push(new Li(Yt.keyField(), r)))
  }
  return t.ce
}
function qe(e) {
  const t = it(e)
  return (t.le || (t.le = vv(t, ms(e))), t.le)
}
function vv(e, t) {
  if (e.limitType === 'F')
    return Mc(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt)
  {
    t = t.map((s) => {
      const i = s.dir === 'desc' ? 'asc' : 'desc'
      return new Li(s.field, i)
    })
    const n = e.endAt ? new Mi(e.endAt.position, e.endAt.inclusive) : null,
      r = e.startAt ? new Mi(e.startAt.position, e.startAt.inclusive) : null
    return Mc(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
  }
}
function wa(e, t, n) {
  return new io(
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
function oo(e, t) {
  return hl(qe(e), qe(t)) && e.limitType === t.limitType
}
function rd(e) {
  return `${cl(qe(e))}|lt:${e.limitType}`
}
function fr(e) {
  return `Query(target=${(function (n) {
    let r = n.path.canonicalString()
    return (
      n.collectionGroup !== null && (r += ' collectionGroup=' + n.collectionGroup),
      n.filters.length > 0 && (r += `, filters: [${n.filters.map((s) => ed(s)).join(', ')}]`),
      so(n.limit) || (r += ', limit: ' + n.limit),
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
        (r += n.startAt.position.map((s) => xr(s)).join(','))),
      n.endAt &&
        ((r += ', endAt: '),
        (r += n.endAt.inclusive ? 'a:' : 'b:'),
        (r += n.endAt.position.map((s) => xr(s)).join(','))),
      `Target(${r})`
    )
  })(qe(e))}; limitType=${e.limitType})`
}
function ao(e, t) {
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
      for (const i of ms(r)) if (!i.field.isKeyField() && s.data.field(i.field) === null) return !1
      return !0
    })(e, t) &&
    (function (r, s) {
      for (const i of r.filters) if (!i.matches(s)) return !1
      return !0
    })(e, t) &&
    (function (r, s) {
      return !(
        (r.startAt &&
          !(function (a, l, u) {
            const f = Nc(a, l, u)
            return a.inclusive ? f <= 0 : f < 0
          })(r.startAt, ms(r), s)) ||
        (r.endAt &&
          !(function (a, l, u) {
            const f = Nc(a, l, u)
            return a.inclusive ? f >= 0 : f > 0
          })(r.endAt, ms(r), s))
      )
    })(e, t)
  )
}
function Ev(e) {
  return (
    e.collectionGroup ||
    (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
  )
}
function sd(e) {
  return (t, n) => {
    let r = !1
    for (const s of ms(e)) {
      const i = Tv(s, t, n)
      if (i !== 0) return i
      r = r || s.field.isKeyField()
    }
    return 0
  }
}
function Tv(e, t, n) {
  const r = e.field.isKeyField()
    ? Z.comparator(t.key, n.key)
    : (function (i, a, l) {
        const u = a.data.field(i),
          f = l.data.field(i)
        return u !== null && f !== null ? Rr(u, f) : rt()
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
 */ class Nr {
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
    Dr(this.inner, (n, r) => {
      for (const [s, i] of r) t(s, i)
    })
  }
  isEmpty() {
    return Gf(this.inner)
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
 */ const bv = new kt(Z.comparator)
function pn() {
  return bv
}
const id = new kt(Z.comparator)
function is(...e) {
  let t = id
  for (const n of e) t = t.insert(n.key, n)
  return t
}
function od(e) {
  let t = id
  return (e.forEach((n, r) => (t = t.insert(n, r.overlayedDocument))), t)
}
function Hn() {
  return gs()
}
function ad() {
  return gs()
}
function gs() {
  return new Nr(
    (e) => e.toString(),
    (e, t) => e.isEqual(t)
  )
}
const wv = new kt(Z.comparator),
  Av = new Xt(Z.comparator)
function ut(...e) {
  let t = Av
  for (const n of e) t = t.add(n)
  return t
}
const Iv = new Xt(_t)
function Rv() {
  return Iv
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
 */ function dl(e, t) {
  if (e.useProto3Json) {
    if (isNaN(t)) return { doubleValue: 'NaN' }
    if (t === 1 / 0) return { doubleValue: 'Infinity' }
    if (t === -1 / 0) return { doubleValue: '-Infinity' }
  }
  return { doubleValue: Oi(t) ? '-0' : t }
}
function ld(e) {
  return { integerValue: '' + e }
}
function xv(e, t) {
  return nv(t) ? ld(t) : dl(e, t)
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
 */ class lo {
  constructor() {
    this._ = void 0
  }
}
function Pv(e, t, n) {
  return e instanceof Cs
    ? (function (s, i) {
        const a = {
          fields: {
            __type__: { stringValue: 'server_timestamp' },
            __local_write_time__: { timestampValue: { seconds: s.seconds, nanos: s.nanoseconds } }
          }
        }
        return (i && al(i) && (i = ll(i)), i && (a.fields.__previous_value__ = i), { mapValue: a })
      })(n, t)
    : e instanceof ks
      ? cd(e, t)
      : e instanceof Vs
        ? hd(e, t)
        : (function (s, i) {
            const a = ud(s, i),
              l = Fc(a) + Fc(s.Pe)
            return Ea(a) && Ea(s.Pe) ? ld(l) : dl(s.serializer, l)
          })(e, t)
}
function Sv(e, t, n) {
  return e instanceof ks ? cd(e, t) : e instanceof Vs ? hd(e, t) : n
}
function ud(e, t) {
  return e instanceof Fi
    ? (function (r) {
        return (
          Ea(r) ||
          (function (i) {
            return !!i && 'doubleValue' in i
          })(r)
        )
      })(t)
      ? t
      : { integerValue: 0 }
    : null
}
class Cs extends lo {}
class ks extends lo {
  constructor(t) {
    ;(super(), (this.elements = t))
  }
}
function cd(e, t) {
  const n = fd(t)
  for (const r of e.elements) n.some((s) => ze(s, r)) || n.push(r)
  return { arrayValue: { values: n } }
}
class Vs extends lo {
  constructor(t) {
    ;(super(), (this.elements = t))
  }
}
function hd(e, t) {
  let n = fd(t)
  for (const r of e.elements) n = n.filter((s) => !ze(s, r))
  return { arrayValue: { values: n } }
}
class Fi extends lo {
  constructor(t, n) {
    ;(super(), (this.serializer = t), (this.Pe = n))
  }
}
function Fc(e) {
  return Mt(e.integerValue || e.doubleValue)
}
function fd(e) {
  return ul(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
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
 */ class Cv {
  constructor(t, n) {
    ;((this.field = t), (this.transform = n))
  }
}
function kv(e, t) {
  return (
    e.field.isEqual(t.field) &&
    (function (r, s) {
      return (r instanceof ks && s instanceof ks) || (r instanceof Vs && s instanceof Vs)
        ? Ir(r.elements, s.elements, ze)
        : r instanceof Fi && s instanceof Fi
          ? ze(r.Pe, s.Pe)
          : r instanceof Cs && s instanceof Cs
    })(e.transform, t.transform)
  )
}
class Vv {
  constructor(t, n) {
    ;((this.version = t), (this.transformResults = n))
  }
}
class ln {
  constructor(t, n) {
    ;((this.updateTime = t), (this.exists = n))
  }
  static none() {
    return new ln()
  }
  static exists(t) {
    return new ln(void 0, t)
  }
  static updateTime(t) {
    return new ln(t)
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
function Ai(e, t) {
  return e.updateTime !== void 0
    ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
    : e.exists === void 0 || e.exists === t.isFoundDocument()
}
class uo {}
function dd(e, t) {
  if (!e.hasLocalMutations || (t && t.fields.length === 0)) return null
  if (t === null)
    return e.isNoDocument() ? new md(e.key, ln.none()) : new Bs(e.key, e.data, ln.none())
  {
    const n = e.data,
      r = be.empty()
    let s = new Xt(Yt.comparator)
    for (let i of t.fields)
      if (!s.has(i)) {
        let a = n.field(i)
        ;(a === null && i.length > 1 && ((i = i.popLast()), (a = n.field(i))),
          a === null ? r.delete(i) : r.set(i, a),
          (s = s.add(i)))
      }
    return new nr(e.key, r, new Se(s.toArray()), ln.none())
  }
}
function Dv(e, t, n) {
  e instanceof Bs
    ? (function (s, i, a) {
        const l = s.value.clone(),
          u = Bc(s.fieldTransforms, i, a.transformResults)
        ;(l.setAll(u), i.convertToFoundDocument(a.version, l).setHasCommittedMutations())
      })(e, t, n)
    : e instanceof nr
      ? (function (s, i, a) {
          if (!Ai(s.precondition, i)) return void i.convertToUnknownDocument(a.version)
          const l = Bc(s.fieldTransforms, i, a.transformResults),
            u = i.data
          ;(u.setAll(pd(s)),
            u.setAll(l),
            i.convertToFoundDocument(a.version, u).setHasCommittedMutations())
        })(e, t, n)
      : (function (s, i, a) {
          i.convertToNoDocument(a.version).setHasCommittedMutations()
        })(0, t, n)
}
function _s(e, t, n, r) {
  return e instanceof Bs
    ? (function (i, a, l, u) {
        if (!Ai(i.precondition, a)) return l
        const f = i.value.clone(),
          p = jc(i.fieldTransforms, u, a)
        return (f.setAll(p), a.convertToFoundDocument(a.version, f).setHasLocalMutations(), null)
      })(e, t, n, r)
    : e instanceof nr
      ? (function (i, a, l, u) {
          if (!Ai(i.precondition, a)) return l
          const f = jc(i.fieldTransforms, u, a),
            p = a.data
          return (
            p.setAll(pd(i)),
            p.setAll(f),
            a.convertToFoundDocument(a.version, p).setHasLocalMutations(),
            l === null
              ? null
              : l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((_) => _.field))
          )
        })(e, t, n, r)
      : (function (i, a, l) {
          return Ai(i.precondition, a)
            ? (a.convertToNoDocument(a.version).setHasLocalMutations(), null)
            : l
        })(e, t, n)
}
function Nv(e, t) {
  let n = null
  for (const r of e.fieldTransforms) {
    const s = t.data.field(r.field),
      i = ud(r.transform, s || null)
    i != null && (n === null && (n = be.empty()), n.set(r.field, i))
  }
  return n || null
}
function Uc(e, t) {
  return (
    e.type === t.type &&
    !!e.key.isEqual(t.key) &&
    !!e.precondition.isEqual(t.precondition) &&
    !!(function (r, s) {
      return (r === void 0 && s === void 0) || (!(!r || !s) && Ir(r, s, (i, a) => kv(i, a)))
    })(e.fieldTransforms, t.fieldTransforms) &&
    (e.type === 0
      ? e.value.isEqual(t.value)
      : e.type !== 1 || (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
  )
}
class Bs extends uo {
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
class nr extends uo {
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
function pd(e) {
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
function Bc(e, t, n) {
  const r = new Map()
  Tt(e.length === n.length)
  for (let s = 0; s < n.length; s++) {
    const i = e[s],
      a = i.transform,
      l = t.data.field(i.field)
    r.set(i.field, Sv(a, l, n[s]))
  }
  return r
}
function jc(e, t, n) {
  const r = new Map()
  for (const s of e) {
    const i = s.transform,
      a = n.data.field(s.field)
    r.set(s.field, Pv(i, a, t))
  }
  return r
}
class md extends uo {
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
class Ov extends uo {
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
 */ class Mv {
  constructor(t, n, r, s) {
    ;((this.batchId = t), (this.localWriteTime = n), (this.baseMutations = r), (this.mutations = s))
  }
  applyToRemoteDocument(t, n) {
    const r = n.mutationResults
    for (let s = 0; s < this.mutations.length; s++) {
      const i = this.mutations[s]
      i.key.isEqual(t.key) && Dv(i, t, r[s])
    }
  }
  applyToLocalView(t, n) {
    for (const r of this.baseMutations)
      r.key.isEqual(t.key) && (n = _s(r, t, n, this.localWriteTime))
    for (const r of this.mutations) r.key.isEqual(t.key) && (n = _s(r, t, n, this.localWriteTime))
    return n
  }
  applyToLocalDocumentSet(t, n) {
    const r = ad()
    return (
      this.mutations.forEach((s) => {
        const i = t.get(s.key),
          a = i.overlayedDocument
        let l = this.applyToLocalView(a, i.mutatedFields)
        l = n.has(s.key) ? null : l
        const u = dd(a, l)
        ;(u !== null && r.set(s.key, u), a.isValidDocument() || a.convertToNoDocument(st.min()))
      }),
      r
    )
  }
  keys() {
    return this.mutations.reduce((t, n) => t.add(n.key), ut())
  }
  isEqual(t) {
    return (
      this.batchId === t.batchId &&
      Ir(this.mutations, t.mutations, (n, r) => Uc(n, r)) &&
      Ir(this.baseMutations, t.baseMutations, (n, r) => Uc(n, r))
    )
  }
}
class pl {
  constructor(t, n, r, s) {
    ;((this.batch = t),
      (this.commitVersion = n),
      (this.mutationResults = r),
      (this.docVersions = s))
  }
  static from(t, n, r) {
    Tt(t.mutations.length === r.length)
    let s = (function () {
      return wv
    })()
    const i = t.mutations
    for (let a = 0; a < i.length; a++) s = s.insert(i[a].key, r[a].version)
    return new pl(t, n, r, s)
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
 */ class Lv {
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
 */ class Fv {
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
 */ var Ft, ct
function Uv(e) {
  switch (e) {
    default:
      return rt()
    case U.CANCELLED:
    case U.UNKNOWN:
    case U.DEADLINE_EXCEEDED:
    case U.RESOURCE_EXHAUSTED:
    case U.INTERNAL:
    case U.UNAVAILABLE:
    case U.UNAUTHENTICATED:
      return !1
    case U.INVALID_ARGUMENT:
    case U.NOT_FOUND:
    case U.ALREADY_EXISTS:
    case U.PERMISSION_DENIED:
    case U.FAILED_PRECONDITION:
    case U.ABORTED:
    case U.OUT_OF_RANGE:
    case U.UNIMPLEMENTED:
    case U.DATA_LOSS:
      return !0
  }
}
function gd(e) {
  if (e === void 0) return (dn('GRPC error has no .code'), U.UNKNOWN)
  switch (e) {
    case Ft.OK:
      return U.OK
    case Ft.CANCELLED:
      return U.CANCELLED
    case Ft.UNKNOWN:
      return U.UNKNOWN
    case Ft.DEADLINE_EXCEEDED:
      return U.DEADLINE_EXCEEDED
    case Ft.RESOURCE_EXHAUSTED:
      return U.RESOURCE_EXHAUSTED
    case Ft.INTERNAL:
      return U.INTERNAL
    case Ft.UNAVAILABLE:
      return U.UNAVAILABLE
    case Ft.UNAUTHENTICATED:
      return U.UNAUTHENTICATED
    case Ft.INVALID_ARGUMENT:
      return U.INVALID_ARGUMENT
    case Ft.NOT_FOUND:
      return U.NOT_FOUND
    case Ft.ALREADY_EXISTS:
      return U.ALREADY_EXISTS
    case Ft.PERMISSION_DENIED:
      return U.PERMISSION_DENIED
    case Ft.FAILED_PRECONDITION:
      return U.FAILED_PRECONDITION
    case Ft.ABORTED:
      return U.ABORTED
    case Ft.OUT_OF_RANGE:
      return U.OUT_OF_RANGE
    case Ft.UNIMPLEMENTED:
      return U.UNIMPLEMENTED
    case Ft.DATA_LOSS:
      return U.DATA_LOSS
    default:
      return rt()
  }
}
;(((ct = Ft || (Ft = {}))[(ct.OK = 0)] = 'OK'),
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
 */ function Bv() {
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
 */ const jv = new Gn([4294967295, 4294967295], 0)
function $c(e) {
  const t = Bv().encode(e),
    n = new Bf()
  return (n.update(t), new Uint8Array(n.digest()))
}
function qc(e) {
  const t = new DataView(e.buffer),
    n = t.getUint32(0, !0),
    r = t.getUint32(4, !0),
    s = t.getUint32(8, !0),
    i = t.getUint32(12, !0)
  return [new Gn([n, r], 0), new Gn([s, i], 0)]
}
class ml {
  constructor(t, n, r) {
    if (((this.bitmap = t), (this.padding = n), (this.hashCount = r), n < 0 || n >= 8))
      throw new os(`Invalid padding: ${n}`)
    if (r < 0) throw new os(`Invalid hash count: ${r}`)
    if (t.length > 0 && this.hashCount === 0) throw new os(`Invalid hash count: ${r}`)
    if (t.length === 0 && n !== 0) throw new os(`Invalid padding when bitmap length is 0: ${n}`)
    ;((this.Ie = 8 * t.length - n), (this.Te = Gn.fromNumber(this.Ie)))
  }
  Ee(t, n, r) {
    let s = t.add(n.multiply(Gn.fromNumber(r)))
    return (
      s.compare(jv) === 1 && (s = new Gn([s.getBits(0), s.getBits(1)], 0)),
      s.modulo(this.Te).toNumber()
    )
  }
  de(t) {
    return (this.bitmap[Math.floor(t / 8)] & (1 << (t % 8))) != 0
  }
  mightContain(t) {
    if (this.Ie === 0) return !1
    const n = $c(t),
      [r, s] = qc(n)
    for (let i = 0; i < this.hashCount; i++) {
      const a = this.Ee(r, s, i)
      if (!this.de(a)) return !1
    }
    return !0
  }
  static create(t, n, r) {
    const s = t % 8 == 0 ? 0 : 8 - (t % 8),
      i = new Uint8Array(Math.ceil(t / 8)),
      a = new ml(i, s, n)
    return (r.forEach((l) => a.insert(l)), a)
  }
  insert(t) {
    if (this.Ie === 0) return
    const n = $c(t),
      [r, s] = qc(n)
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
class os extends Error {
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
 */ class co {
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
      s.set(t, js.createSynthesizedTargetChangeForCurrentChange(t, n, r)),
      new co(st.min(), s, new kt(_t), pn(), ut())
    )
  }
}
class js {
  constructor(t, n, r, s, i) {
    ;((this.resumeToken = t),
      (this.current = n),
      (this.addedDocuments = r),
      (this.modifiedDocuments = s),
      (this.removedDocuments = i))
  }
  static createSynthesizedTargetChangeForCurrentChange(t, n, r) {
    return new js(r, n, ut(), ut(), ut())
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
 */ class Ii {
  constructor(t, n, r, s) {
    ;((this.Re = t), (this.removedTargetIds = n), (this.key = r), (this.Ve = s))
  }
}
class _d {
  constructor(t, n) {
    ;((this.targetId = t), (this.me = n))
  }
}
class yd {
  constructor(t, n, r = Jt.EMPTY_BYTE_STRING, s = null) {
    ;((this.state = t), (this.targetIds = n), (this.resumeToken = r), (this.cause = s))
  }
}
class Kc {
  constructor() {
    ;((this.fe = 0),
      (this.ge = zc()),
      (this.pe = Jt.EMPTY_BYTE_STRING),
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
    let t = ut(),
      n = ut(),
      r = ut()
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
      new js(this.pe, this.ye, t, n, r)
    )
  }
  Ce() {
    ;((this.we = !1), (this.ge = zc()))
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
class $v {
  constructor(t) {
    ;((this.Le = t),
      (this.Be = new Map()),
      (this.ke = pn()),
      (this.qe = Hc()),
      (this.Qe = new kt(_t)))
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
      if (ba(i))
        if (r === 0) {
          const a = new Z(i.path)
          this.Ue(n, a, ie.newNoDocument(a, st.min()))
        } else Tt(r === 1)
      else {
        const a = this.Ye(n)
        if (a !== r) {
          const l = this.Ze(t),
            u = l ? this.Xe(l, t, a) : 1
          if (u !== 0) {
            this.je(n)
            const f =
              u === 2
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
      a = Jn(r).toUint8Array()
    } catch (u) {
      if (u instanceof Qf)
        return (
          Ar(
            'Decoding the base64 bloom filter in existence filter failed (' +
              u.message +
              '); ignoring the bloom filter and falling back to full re-query.'
          ),
          null
        )
      throw u
    }
    try {
      l = new ml(a, s, i)
    } catch (u) {
      return (
        Ar(u instanceof os ? 'BloomFilter error: ' : 'Applying bloom filter failed: ', u),
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
        if (i.current && ba(l.target)) {
          const u = new Z(l.target.path)
          this.ke.get(u) !== null || this.it(a, u) || this.Ue(a, u, ie.newNoDocument(u, t))
        }
        i.be && (n.set(a, i.ve()), i.Ce())
      }
    })
    let r = ut()
    ;(this.qe.forEach((i, a) => {
      let l = !0
      ;(a.forEachWhile((u) => {
        const f = this.Je(u)
        return !f || f.purpose === 'TargetPurposeLimboResolution' || ((l = !1), !1)
      }),
        l && (r = r.add(i)))
    }),
      this.ke.forEach((i, a) => a.setReadTime(t)))
    const s = new co(t, n, this.Qe, this.ke, r)
    return ((this.ke = pn()), (this.qe = Hc()), (this.Qe = new kt(_t)), s)
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
    return (n || ((n = new Kc()), this.Be.set(t, n)), n)
  }
  st(t) {
    let n = this.qe.get(t)
    return (n || ((n = new Xt(_t)), (this.qe = this.qe.insert(t, n))), n)
  }
  ze(t) {
    const n = this.Je(t) !== null
    return (n || G('WatchChangeAggregator', 'Detected inactive target', t), n)
  }
  Je(t) {
    const n = this.Be.get(t)
    return n && n.Se ? null : this.Le.ot(t)
  }
  je(t) {
    ;(this.Be.set(t, new Kc()),
      this.Le.getRemoteKeysForTarget(t).forEach((n) => {
        this.Ue(t, n, null)
      }))
  }
  it(t, n) {
    return this.Le.getRemoteKeysForTarget(t).has(n)
  }
}
function Hc() {
  return new kt(Z.comparator)
}
function zc() {
  return new kt(Z.comparator)
}
const qv = { asc: 'ASCENDING', desc: 'DESCENDING' },
  Kv = {
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
  Hv = { and: 'AND', or: 'OR' }
class zv {
  constructor(t, n) {
    ;((this.databaseId = t), (this.useProto3Json = n))
  }
}
function Aa(e, t) {
  return e.useProto3Json || so(t) ? t : { value: t }
}
function Ui(e, t) {
  return e.useProto3Json
    ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, '').replace('Z', '')}.${('000000000' + t.nanoseconds).slice(-9)}Z`
    : { seconds: '' + t.seconds, nanos: t.nanoseconds }
}
function vd(e, t) {
  return e.useProto3Json ? t.toBase64() : t.toUint8Array()
}
function Wv(e, t) {
  return Ui(e, t.toTimestamp())
}
function Ke(e) {
  return (
    Tt(!!e),
    st.fromTimestamp(
      (function (n) {
        const r = Vn(n)
        return new $t(r.seconds, r.nanos)
      })(e)
    )
  )
}
function gl(e, t) {
  return Ia(e, t).canonicalString()
}
function Ia(e, t) {
  const n = (function (s) {
    return new Pt(['projects', s.projectId, 'databases', s.database])
  })(e).child('documents')
  return t === void 0 ? n : n.child(t)
}
function Ed(e) {
  const t = Pt.fromString(e)
  return (Tt(Id(t)), t)
}
function Ra(e, t) {
  return gl(e.databaseId, t.path)
}
function Wo(e, t) {
  const n = Ed(t)
  if (n.get(1) !== e.databaseId.projectId)
    throw new X(
      U.INVALID_ARGUMENT,
      'Tried to deserialize key from different project: ' +
        n.get(1) +
        ' vs ' +
        e.databaseId.projectId
    )
  if (n.get(3) !== e.databaseId.database)
    throw new X(
      U.INVALID_ARGUMENT,
      'Tried to deserialize key from different database: ' +
        n.get(3) +
        ' vs ' +
        e.databaseId.database
    )
  return new Z(bd(n))
}
function Td(e, t) {
  return gl(e.databaseId, t)
}
function Gv(e) {
  const t = Ed(e)
  return t.length === 4 ? Pt.emptyPath() : bd(t)
}
function xa(e) {
  return new Pt([
    'projects',
    e.databaseId.projectId,
    'databases',
    e.databaseId.database
  ]).canonicalString()
}
function bd(e) {
  return (Tt(e.length > 4 && e.get(4) === 'documents'), e.popFirst(5))
}
function Wc(e, t, n) {
  return { name: Ra(e, t), fields: n.value.mapValue.fields }
}
function Qv(e, t) {
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
      i = (function (f, p) {
        return f.useProto3Json
          ? (Tt(p === void 0 || typeof p == 'string'), Jt.fromBase64String(p || ''))
          : (Tt(p === void 0 || p instanceof Buffer || p instanceof Uint8Array),
            Jt.fromUint8Array(p || new Uint8Array()))
      })(e, t.targetChange.resumeToken),
      a = t.targetChange.cause,
      l =
        a &&
        (function (f) {
          const p = f.code === void 0 ? U.UNKNOWN : gd(f.code)
          return new X(p, f.message || '')
        })(a)
    n = new yd(r, s, i, l || null)
  } else if ('documentChange' in t) {
    t.documentChange
    const r = t.documentChange
    ;(r.document, r.document.name, r.document.updateTime)
    const s = Wo(e, r.document.name),
      i = Ke(r.document.updateTime),
      a = r.document.createTime ? Ke(r.document.createTime) : st.min(),
      l = new be({ mapValue: { fields: r.document.fields } }),
      u = ie.newFoundDocument(s, i, a, l),
      f = r.targetIds || [],
      p = r.removedTargetIds || []
    n = new Ii(f, p, u.key, u)
  } else if ('documentDelete' in t) {
    t.documentDelete
    const r = t.documentDelete
    r.document
    const s = Wo(e, r.document),
      i = r.readTime ? Ke(r.readTime) : st.min(),
      a = ie.newNoDocument(s, i),
      l = r.removedTargetIds || []
    n = new Ii([], l, a.key, a)
  } else if ('documentRemove' in t) {
    t.documentRemove
    const r = t.documentRemove
    r.document
    const s = Wo(e, r.document),
      i = r.removedTargetIds || []
    n = new Ii([], i, s, null)
  } else {
    if (!('filter' in t)) return rt()
    {
      t.filter
      const r = t.filter
      r.targetId
      const { count: s = 0, unchangedNames: i } = r,
        a = new Fv(s, i),
        l = r.targetId
      n = new _d(l, a)
    }
  }
  return n
}
function Yv(e, t) {
  let n
  if (t instanceof Bs) n = { update: Wc(e, t.key, t.value) }
  else if (t instanceof md) n = { delete: Ra(e, t.key) }
  else if (t instanceof nr) n = { update: Wc(e, t.key, t.data), updateMask: iE(t.fieldMask) }
  else {
    if (!(t instanceof Ov)) return rt()
    n = { verify: Ra(e, t.key) }
  }
  return (
    t.fieldTransforms.length > 0 &&
      (n.updateTransforms = t.fieldTransforms.map((r) =>
        (function (i, a) {
          const l = a.transform
          if (l instanceof Cs)
            return { fieldPath: a.field.canonicalString(), setToServerValue: 'REQUEST_TIME' }
          if (l instanceof ks)
            return {
              fieldPath: a.field.canonicalString(),
              appendMissingElements: { values: l.elements }
            }
          if (l instanceof Vs)
            return {
              fieldPath: a.field.canonicalString(),
              removeAllFromArray: { values: l.elements }
            }
          if (l instanceof Fi) return { fieldPath: a.field.canonicalString(), increment: l.Pe }
          throw rt()
        })(0, r)
      )),
    t.precondition.isNone ||
      (n.currentDocument = (function (s, i) {
        return i.updateTime !== void 0
          ? { updateTime: Wv(s, i.updateTime) }
          : i.exists !== void 0
            ? { exists: i.exists }
            : rt()
      })(e, t.precondition)),
    n
  )
}
function Xv(e, t) {
  return e && e.length > 0
    ? (Tt(t !== void 0),
      e.map((n) =>
        (function (s, i) {
          let a = s.updateTime ? Ke(s.updateTime) : Ke(i)
          return (a.isEqual(st.min()) && (a = Ke(i)), new Vv(a, s.transformResults || []))
        })(n, t)
      ))
    : []
}
function Jv(e, t) {
  return { documents: [Td(e, t.path)] }
}
function Zv(e, t) {
  const n = { structuredQuery: {} },
    r = t.path
  let s
  ;(t.collectionGroup !== null
    ? ((s = r),
      (n.structuredQuery.from = [{ collectionId: t.collectionGroup, allDescendants: !0 }]))
    : ((s = r.popLast()), (n.structuredQuery.from = [{ collectionId: r.lastSegment() }])),
    (n.parent = Td(e, s)))
  const i = (function (f) {
    if (f.length !== 0) return Ad(We.create(f, 'and'))
  })(t.filters)
  i && (n.structuredQuery.where = i)
  const a = (function (f) {
    if (f.length !== 0)
      return f.map((p) =>
        (function (w) {
          return { field: dr(w.field), direction: nE(w.dir) }
        })(p)
      )
  })(t.orderBy)
  a && (n.structuredQuery.orderBy = a)
  const l = Aa(e, t.limit)
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
function tE(e) {
  let t = Gv(e.parent)
  const n = e.structuredQuery,
    r = n.from ? n.from.length : 0
  let s = null
  if (r > 0) {
    Tt(r === 1)
    const p = n.from[0]
    p.allDescendants ? (s = p.collectionId) : (t = t.child(p.collectionId))
  }
  let i = []
  n.where &&
    (i = (function (_) {
      const w = wd(_)
      return w instanceof We && Zf(w) ? w.getFilters() : [w]
    })(n.where))
  let a = []
  n.orderBy &&
    (a = (function (_) {
      return _.map((w) =>
        (function (O) {
          return new Li(
            pr(O.field),
            (function (D) {
              switch (D) {
                case 'ASCENDING':
                  return 'asc'
                case 'DESCENDING':
                  return 'desc'
                default:
                  return
              }
            })(O.direction)
          )
        })(w)
      )
    })(n.orderBy))
  let l = null
  n.limit &&
    (l = (function (_) {
      let w
      return ((w = typeof _ == 'object' ? _.value : _), so(w) ? null : w)
    })(n.limit))
  let u = null
  n.startAt &&
    (u = (function (_) {
      const w = !!_.before,
        P = _.values || []
      return new Mi(P, w)
    })(n.startAt))
  let f = null
  return (
    n.endAt &&
      (f = (function (_) {
        const w = !_.before,
          P = _.values || []
        return new Mi(P, w)
      })(n.endAt)),
    _v(t, s, a, i, l, 'F', u, f)
  )
}
function eE(e, t) {
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
function wd(e) {
  return e.unaryFilter !== void 0
    ? (function (n) {
        switch (n.unaryFilter.op) {
          case 'IS_NAN':
            const r = pr(n.unaryFilter.field)
            return jt.create(r, '==', { doubleValue: NaN })
          case 'IS_NULL':
            const s = pr(n.unaryFilter.field)
            return jt.create(s, '==', { nullValue: 'NULL_VALUE' })
          case 'IS_NOT_NAN':
            const i = pr(n.unaryFilter.field)
            return jt.create(i, '!=', { doubleValue: NaN })
          case 'IS_NOT_NULL':
            const a = pr(n.unaryFilter.field)
            return jt.create(a, '!=', { nullValue: 'NULL_VALUE' })
          default:
            return rt()
        }
      })(e)
    : e.fieldFilter !== void 0
      ? (function (n) {
          return jt.create(
            pr(n.fieldFilter.field),
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
            return We.create(
              n.compositeFilter.filters.map((r) => wd(r)),
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
function nE(e) {
  return qv[e]
}
function rE(e) {
  return Kv[e]
}
function sE(e) {
  return Hv[e]
}
function dr(e) {
  return { fieldPath: e.canonicalString() }
}
function pr(e) {
  return Yt.fromServerFormat(e.fieldPath)
}
function Ad(e) {
  return e instanceof jt
    ? (function (n) {
        if (n.op === '==') {
          if (Dc(n.value)) return { unaryFilter: { field: dr(n.field), op: 'IS_NAN' } }
          if (Vc(n.value)) return { unaryFilter: { field: dr(n.field), op: 'IS_NULL' } }
        } else if (n.op === '!=') {
          if (Dc(n.value)) return { unaryFilter: { field: dr(n.field), op: 'IS_NOT_NAN' } }
          if (Vc(n.value)) return { unaryFilter: { field: dr(n.field), op: 'IS_NOT_NULL' } }
        }
        return { fieldFilter: { field: dr(n.field), op: rE(n.op), value: n.value } }
      })(e)
    : e instanceof We
      ? (function (n) {
          const r = n.getFilters().map((s) => Ad(s))
          return r.length === 1 ? r[0] : { compositeFilter: { op: sE(n.op), filters: r } }
        })(e)
      : rt()
}
function iE(e) {
  const t = []
  return (e.fields.forEach((n) => t.push(n.canonicalString())), { fieldPaths: t })
}
function Id(e) {
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
 */ class bn {
  constructor(t, n, r, s, i = st.min(), a = st.min(), l = Jt.EMPTY_BYTE_STRING, u = null) {
    ;((this.target = t),
      (this.targetId = n),
      (this.purpose = r),
      (this.sequenceNumber = s),
      (this.snapshotVersion = i),
      (this.lastLimboFreeSnapshotVersion = a),
      (this.resumeToken = l),
      (this.expectedCount = u))
  }
  withSequenceNumber(t) {
    return new bn(
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
    return new bn(
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
    return new bn(
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
    return new bn(
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
 */ class oE {
  constructor(t) {
    this.ct = t
  }
}
function aE(e) {
  const t = tE({ parent: e.parent, structuredQuery: e.structuredQuery })
  return e.limitType === 'LAST' ? wa(t, t.limit, 'L') : t
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
 */ class lE {
  constructor() {
    this.un = new uE()
  }
  addToCollectionParentIndex(t, n) {
    return (this.un.add(n), F.resolve())
  }
  getCollectionParents(t, n) {
    return F.resolve(this.un.getEntries(n))
  }
  addFieldIndex(t, n) {
    return F.resolve()
  }
  deleteFieldIndex(t, n) {
    return F.resolve()
  }
  deleteAllFieldIndexes(t) {
    return F.resolve()
  }
  createTargetIndexes(t, n) {
    return F.resolve()
  }
  getDocumentsMatchingTarget(t, n) {
    return F.resolve(null)
  }
  getIndexType(t, n) {
    return F.resolve(0)
  }
  getFieldIndexes(t, n) {
    return F.resolve([])
  }
  getNextCollectionGroupToUpdate(t) {
    return F.resolve(null)
  }
  getMinOffset(t, n) {
    return F.resolve(kn.min())
  }
  getMinOffsetFromCollectionGroup(t, n) {
    return F.resolve(kn.min())
  }
  updateCollectionGroup(t, n, r) {
    return F.resolve()
  }
  updateIndexEntries(t, n) {
    return F.resolve()
  }
}
class uE {
  constructor() {
    this.index = {}
  }
  add(t) {
    const n = t.lastSegment(),
      r = t.popLast(),
      s = this.index[n] || new Xt(Pt.comparator),
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
    return (this.index[t] || new Xt(Pt.comparator)).toArray()
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
 */ class Pr {
  constructor(t) {
    this.Ln = t
  }
  next() {
    return ((this.Ln += 2), this.Ln)
  }
  static Bn() {
    return new Pr(0)
  }
  static kn() {
    return new Pr(-1)
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
 */ class cE {
  constructor() {
    ;((this.changes = new Nr(
      (t) => t.toString(),
      (t, n) => t.isEqual(n)
    )),
      (this.changesApplied = !1))
  }
  addEntry(t) {
    ;(this.assertNotApplied(), this.changes.set(t.key, t))
  }
  removeEntry(t, n) {
    ;(this.assertNotApplied(), this.changes.set(t, ie.newInvalidDocument(t).setReadTime(n)))
  }
  getEntry(t, n) {
    this.assertNotApplied()
    const r = this.changes.get(n)
    return r !== void 0 ? F.resolve(r) : this.getFromCache(t, n)
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
 */ class hE {
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
 */ class fE {
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
      .next((s) => (r !== null && _s(r.mutation, s, Se.empty(), $t.now()), s))
  }
  getDocuments(t, n) {
    return this.remoteDocumentCache
      .getEntries(t, n)
      .next((r) => this.getLocalViewOfDocuments(t, r, ut()).next(() => r))
  }
  getLocalViewOfDocuments(t, n, r = ut()) {
    const s = Hn()
    return this.populateOverlays(t, s, n).next(() =>
      this.computeViews(t, n, s, r).next((i) => {
        let a = is()
        return (
          i.forEach((l, u) => {
            a = a.insert(l, u.overlayedDocument)
          }),
          a
        )
      })
    )
  }
  getOverlayedDocuments(t, n) {
    const r = Hn()
    return this.populateOverlays(t, r, n).next(() => this.computeViews(t, n, r, ut()))
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
    let i = pn()
    const a = gs(),
      l = (function () {
        return gs()
      })()
    return (
      n.forEach((u, f) => {
        const p = r.get(f.key)
        s.has(f.key) && (p === void 0 || p.mutation instanceof nr)
          ? (i = i.insert(f.key, f))
          : p !== void 0
            ? (a.set(f.key, p.mutation.getFieldMask()),
              _s(p.mutation, f, p.mutation.getFieldMask(), $t.now()))
            : a.set(f.key, Se.empty())
      }),
      this.recalculateAndSaveOverlays(t, i).next(
        (u) => (
          u.forEach((f, p) => a.set(f, p)),
          n.forEach((f, p) => {
            var _
            return l.set(f, new hE(p, (_ = a.get(f)) !== null && _ !== void 0 ? _ : null))
          }),
          l
        )
      )
    )
  }
  recalculateAndSaveOverlays(t, n) {
    const r = gs()
    let s = new kt((a, l) => a - l),
      i = ut()
    return this.mutationQueue
      .getAllMutationBatchesAffectingDocumentKeys(t, n)
      .next((a) => {
        for (const l of a)
          l.keys().forEach((u) => {
            const f = n.get(u)
            if (f === null) return
            let p = r.get(u) || Se.empty()
            ;((p = l.applyToLocalView(f, p)), r.set(u, p))
            const _ = (s.get(l.batchId) || ut()).add(u)
            s = s.insert(l.batchId, _)
          })
      })
      .next(() => {
        const a = [],
          l = s.getReverseIterator()
        for (; l.hasNext(); ) {
          const u = l.getNext(),
            f = u.key,
            p = u.value,
            _ = ad()
          ;(p.forEach((w) => {
            if (!i.has(w)) {
              const P = dd(n.get(w), r.get(w))
              ;(P !== null && _.set(w, P), (i = i.add(w)))
            }
          }),
            a.push(this.documentOverlayCache.saveOverlays(t, f, _)))
        }
        return F.waitFor(a)
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
      : yv(n)
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
          : F.resolve(Hn())
      let l = -1,
        u = i
      return a.next((f) =>
        F.forEach(
          f,
          (p, _) => (
            l < _.largestBatchId && (l = _.largestBatchId),
            i.get(p)
              ? F.resolve()
              : this.remoteDocumentCache.getEntry(t, p).next((w) => {
                  u = u.insert(p, w)
                })
          )
        )
          .next(() => this.populateOverlays(t, f, i))
          .next(() => this.computeViews(t, u, f, ut()))
          .next((p) => ({ batchId: l, changes: od(p) }))
      )
    })
  }
  getDocumentsMatchingDocumentQuery(t, n) {
    return this.getDocument(t, new Z(n)).next((r) => {
      let s = is()
      return (r.isFoundDocument() && (s = s.insert(r.key, r)), s)
    })
  }
  getDocumentsMatchingCollectionGroupQuery(t, n, r, s) {
    const i = n.collectionGroup
    let a = is()
    return this.indexManager.getCollectionParents(t, i).next((l) =>
      F.forEach(l, (u) => {
        const f = (function (_, w) {
          return new io(
            w,
            null,
            _.explicitOrderBy.slice(),
            _.filters.slice(),
            _.limit,
            _.limitType,
            _.startAt,
            _.endAt
          )
        })(n, u.child(i))
        return this.getDocumentsMatchingCollectionQuery(t, f, r, s).next((p) => {
          p.forEach((_, w) => {
            a = a.insert(_, w)
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
        i.forEach((u, f) => {
          const p = f.getKey()
          a.get(p) === null && (a = a.insert(p, ie.newInvalidDocument(p)))
        })
        let l = is()
        return (
          a.forEach((u, f) => {
            const p = i.get(u)
            ;(p !== void 0 && _s(p.mutation, f, Se.empty(), $t.now()),
              ao(n, f) && (l = l.insert(u, f)))
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
 */ class dE {
  constructor(t) {
    ;((this.serializer = t), (this.hr = new Map()), (this.Pr = new Map()))
  }
  getBundleMetadata(t, n) {
    return F.resolve(this.hr.get(n))
  }
  saveBundleMetadata(t, n) {
    return (
      this.hr.set(
        n.id,
        (function (s) {
          return { id: s.id, version: s.version, createTime: Ke(s.createTime) }
        })(n)
      ),
      F.resolve()
    )
  }
  getNamedQuery(t, n) {
    return F.resolve(this.Pr.get(n))
  }
  saveNamedQuery(t, n) {
    return (
      this.Pr.set(
        n.name,
        (function (s) {
          return { name: s.name, query: aE(s.bundledQuery), readTime: Ke(s.readTime) }
        })(n)
      ),
      F.resolve()
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
 */ class pE {
  constructor() {
    ;((this.overlays = new kt(Z.comparator)), (this.Ir = new Map()))
  }
  getOverlay(t, n) {
    return F.resolve(this.overlays.get(n))
  }
  getOverlays(t, n) {
    const r = Hn()
    return F.forEach(n, (s) =>
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
      F.resolve()
    )
  }
  removeOverlaysForBatchId(t, n, r) {
    const s = this.Ir.get(r)
    return (
      s !== void 0 &&
        (s.forEach((i) => (this.overlays = this.overlays.remove(i))), this.Ir.delete(r)),
      F.resolve()
    )
  }
  getOverlaysForCollection(t, n, r) {
    const s = Hn(),
      i = n.length + 1,
      a = new Z(n.child('')),
      l = this.overlays.getIteratorFrom(a)
    for (; l.hasNext(); ) {
      const u = l.getNext().value,
        f = u.getKey()
      if (!n.isPrefixOf(f.path)) break
      f.path.length === i && u.largestBatchId > r && s.set(u.getKey(), u)
    }
    return F.resolve(s)
  }
  getOverlaysForCollectionGroup(t, n, r, s) {
    let i = new kt((f, p) => f - p)
    const a = this.overlays.getIterator()
    for (; a.hasNext(); ) {
      const f = a.getNext().value
      if (f.getKey().getCollectionGroup() === n && f.largestBatchId > r) {
        let p = i.get(f.largestBatchId)
        ;(p === null && ((p = Hn()), (i = i.insert(f.largestBatchId, p))), p.set(f.getKey(), f))
      }
    }
    const l = Hn(),
      u = i.getIterator()
    for (; u.hasNext() && (u.getNext().value.forEach((f, p) => l.set(f, p)), !(l.size() >= s)); );
    return F.resolve(l)
  }
  ht(t, n, r) {
    const s = this.overlays.get(r.key)
    if (s !== null) {
      const a = this.Ir.get(s.largestBatchId).delete(r.key)
      this.Ir.set(s.largestBatchId, a)
    }
    this.overlays = this.overlays.insert(r.key, new Lv(n, r))
    let i = this.Ir.get(n)
    ;(i === void 0 && ((i = ut()), this.Ir.set(n, i)), this.Ir.set(n, i.add(r.key)))
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
 */ class mE {
  constructor() {
    this.sessionToken = Jt.EMPTY_BYTE_STRING
  }
  getSessionToken(t) {
    return F.resolve(this.sessionToken)
  }
  setSessionToken(t, n) {
    return ((this.sessionToken = n), F.resolve())
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
 */ class _l {
  constructor() {
    ;((this.Tr = new Xt(Kt.Er)), (this.dr = new Xt(Kt.Ar)))
  }
  isEmpty() {
    return this.Tr.isEmpty()
  }
  addReference(t, n) {
    const r = new Kt(t, n)
    ;((this.Tr = this.Tr.add(r)), (this.dr = this.dr.add(r)))
  }
  Rr(t, n) {
    t.forEach((r) => this.addReference(r, n))
  }
  removeReference(t, n) {
    this.Vr(new Kt(t, n))
  }
  mr(t, n) {
    t.forEach((r) => this.removeReference(r, n))
  }
  gr(t) {
    const n = new Z(new Pt([])),
      r = new Kt(n, t),
      s = new Kt(n, t + 1),
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
      r = new Kt(n, t),
      s = new Kt(n, t + 1)
    let i = ut()
    return (
      this.dr.forEachInRange([r, s], (a) => {
        i = i.add(a.key)
      }),
      i
    )
  }
  containsKey(t) {
    const n = new Kt(t, 0),
      r = this.Tr.firstAfterOrEqual(n)
    return r !== null && t.isEqual(r.key)
  }
}
class Kt {
  constructor(t, n) {
    ;((this.key = t), (this.wr = n))
  }
  static Er(t, n) {
    return Z.comparator(t.key, n.key) || _t(t.wr, n.wr)
  }
  static Ar(t, n) {
    return _t(t.wr, n.wr) || Z.comparator(t.key, n.key)
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
 */ class gE {
  constructor(t, n) {
    ;((this.indexManager = t),
      (this.referenceDelegate = n),
      (this.mutationQueue = []),
      (this.Sr = 1),
      (this.br = new Xt(Kt.Er)))
  }
  checkEmpty(t) {
    return F.resolve(this.mutationQueue.length === 0)
  }
  addMutationBatch(t, n, r, s) {
    const i = this.Sr
    ;(this.Sr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1])
    const a = new Mv(i, n, r, s)
    this.mutationQueue.push(a)
    for (const l of s)
      ((this.br = this.br.add(new Kt(l.key, i))),
        this.indexManager.addToCollectionParentIndex(t, l.key.path.popLast()))
    return F.resolve(a)
  }
  lookupMutationBatch(t, n) {
    return F.resolve(this.Dr(n))
  }
  getNextMutationBatchAfterBatchId(t, n) {
    const r = n + 1,
      s = this.vr(r),
      i = s < 0 ? 0 : s
    return F.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
  }
  getHighestUnacknowledgedBatchId() {
    return F.resolve(this.mutationQueue.length === 0 ? -1 : this.Sr - 1)
  }
  getAllMutationBatches(t) {
    return F.resolve(this.mutationQueue.slice())
  }
  getAllMutationBatchesAffectingDocumentKey(t, n) {
    const r = new Kt(n, 0),
      s = new Kt(n, Number.POSITIVE_INFINITY),
      i = []
    return (
      this.br.forEachInRange([r, s], (a) => {
        const l = this.Dr(a.wr)
        i.push(l)
      }),
      F.resolve(i)
    )
  }
  getAllMutationBatchesAffectingDocumentKeys(t, n) {
    let r = new Xt(_t)
    return (
      n.forEach((s) => {
        const i = new Kt(s, 0),
          a = new Kt(s, Number.POSITIVE_INFINITY)
        this.br.forEachInRange([i, a], (l) => {
          r = r.add(l.wr)
        })
      }),
      F.resolve(this.Cr(r))
    )
  }
  getAllMutationBatchesAffectingQuery(t, n) {
    const r = n.path,
      s = r.length + 1
    let i = r
    Z.isDocumentKey(i) || (i = i.child(''))
    const a = new Kt(new Z(i), 0)
    let l = new Xt(_t)
    return (
      this.br.forEachWhile((u) => {
        const f = u.key.path
        return !!r.isPrefixOf(f) && (f.length === s && (l = l.add(u.wr)), !0)
      }, a),
      F.resolve(this.Cr(l))
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
    return F.forEach(n.mutations, (s) => {
      const i = new Kt(s.key, n.batchId)
      return ((r = r.delete(i)), this.referenceDelegate.markPotentiallyOrphaned(t, s.key))
    }).next(() => {
      this.br = r
    })
  }
  On(t) {}
  containsKey(t, n) {
    const r = new Kt(n, 0),
      s = this.br.firstAfterOrEqual(r)
    return F.resolve(n.isEqual(s && s.key))
  }
  performConsistencyCheck(t) {
    return (this.mutationQueue.length, F.resolve())
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
 */ class _E {
  constructor(t) {
    ;((this.Mr = t),
      (this.docs = (function () {
        return new kt(Z.comparator)
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
    return F.resolve(r ? r.document.mutableCopy() : ie.newInvalidDocument(n))
  }
  getEntries(t, n) {
    let r = pn()
    return (
      n.forEach((s) => {
        const i = this.docs.get(s)
        r = r.insert(s, i ? i.document.mutableCopy() : ie.newInvalidDocument(s))
      }),
      F.resolve(r)
    )
  }
  getDocumentsMatchingQuery(t, n, r, s) {
    let i = pn()
    const a = n.path,
      l = new Z(a.child('')),
      u = this.docs.getIteratorFrom(l)
    for (; u.hasNext(); ) {
      const {
        key: f,
        value: { document: p }
      } = u.getNext()
      if (!a.isPrefixOf(f.path)) break
      f.path.length > a.length + 1 ||
        Jy(Xy(p), r) <= 0 ||
        ((s.has(p.key) || ao(n, p)) && (i = i.insert(p.key, p.mutableCopy())))
    }
    return F.resolve(i)
  }
  getAllFromCollectionGroup(t, n, r, s) {
    rt()
  }
  Or(t, n) {
    return F.forEach(this.docs, (r) => n(r))
  }
  newChangeBuffer(t) {
    return new yE(this)
  }
  getSize(t) {
    return F.resolve(this.size)
  }
}
class yE extends cE {
  constructor(t) {
    ;(super(), (this.cr = t))
  }
  applyChanges(t) {
    const n = []
    return (
      this.changes.forEach((r, s) => {
        s.isValidDocument() ? n.push(this.cr.addEntry(t, s)) : this.cr.removeEntry(r)
      }),
      F.waitFor(n)
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
 */ class vE {
  constructor(t) {
    ;((this.persistence = t),
      (this.Nr = new Nr((n) => cl(n), hl)),
      (this.lastRemoteSnapshotVersion = st.min()),
      (this.highestTargetId = 0),
      (this.Lr = 0),
      (this.Br = new _l()),
      (this.targetCount = 0),
      (this.kr = Pr.Bn()))
  }
  forEachTarget(t, n) {
    return (this.Nr.forEach((r, s) => n(s)), F.resolve())
  }
  getLastRemoteSnapshotVersion(t) {
    return F.resolve(this.lastRemoteSnapshotVersion)
  }
  getHighestSequenceNumber(t) {
    return F.resolve(this.Lr)
  }
  allocateTargetId(t) {
    return ((this.highestTargetId = this.kr.next()), F.resolve(this.highestTargetId))
  }
  setTargetsMetadata(t, n, r) {
    return (r && (this.lastRemoteSnapshotVersion = r), n > this.Lr && (this.Lr = n), F.resolve())
  }
  Kn(t) {
    this.Nr.set(t.target, t)
    const n = t.targetId
    ;(n > this.highestTargetId && ((this.kr = new Pr(n)), (this.highestTargetId = n)),
      t.sequenceNumber > this.Lr && (this.Lr = t.sequenceNumber))
  }
  addTargetData(t, n) {
    return (this.Kn(n), (this.targetCount += 1), F.resolve())
  }
  updateTargetData(t, n) {
    return (this.Kn(n), F.resolve())
  }
  removeTargetData(t, n) {
    return (this.Nr.delete(n.target), this.Br.gr(n.targetId), (this.targetCount -= 1), F.resolve())
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
      F.waitFor(i).next(() => s)
    )
  }
  getTargetCount(t) {
    return F.resolve(this.targetCount)
  }
  getTargetData(t, n) {
    const r = this.Nr.get(n) || null
    return F.resolve(r)
  }
  addMatchingKeys(t, n, r) {
    return (this.Br.Rr(n, r), F.resolve())
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
      F.waitFor(i)
    )
  }
  removeMatchingKeysForTargetId(t, n) {
    return (this.Br.gr(n), F.resolve())
  }
  getMatchingKeysForTargetId(t, n) {
    const r = this.Br.yr(n)
    return F.resolve(r)
  }
  containsKey(t, n) {
    return F.resolve(this.Br.containsKey(n))
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
 */ class EE {
  constructor(t, n) {
    ;((this.qr = {}),
      (this.overlays = {}),
      (this.Qr = new ol(0)),
      (this.Kr = !1),
      (this.Kr = !0),
      (this.$r = new mE()),
      (this.referenceDelegate = t(this)),
      (this.Ur = new vE(this)),
      (this.indexManager = new lE()),
      (this.remoteDocumentCache = (function (s) {
        return new _E(s)
      })((r) => this.referenceDelegate.Wr(r))),
      (this.serializer = new oE(n)),
      (this.Gr = new dE(this.serializer)))
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
    return (n || ((n = new pE()), (this.overlays[t.toKey()] = n)), n)
  }
  getMutationQueue(t, n) {
    let r = this.qr[t.toKey()]
    return (r || ((r = new gE(n, this.referenceDelegate)), (this.qr[t.toKey()] = r)), r)
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
    G('MemoryPersistence', 'Starting transaction:', t)
    const s = new TE(this.Qr.next())
    return (
      this.referenceDelegate.zr(),
      r(s)
        .next((i) => this.referenceDelegate.jr(s).next(() => i))
        .toPromise()
        .then((i) => (s.raiseOnCommittedEvent(), i))
    )
  }
  Hr(t, n) {
    return F.or(Object.values(this.qr).map((r) => () => r.containsKey(t, n)))
  }
}
class TE extends tv {
  constructor(t) {
    ;(super(), (this.currentSequenceNumber = t))
  }
}
class yl {
  constructor(t) {
    ;((this.persistence = t), (this.Jr = new _l()), (this.Yr = null))
  }
  static Zr(t) {
    return new yl(t)
  }
  get Xr() {
    if (this.Yr) return this.Yr
    throw rt()
  }
  addReference(t, n, r) {
    return (this.Jr.addReference(r, n), this.Xr.delete(r.toString()), F.resolve())
  }
  removeReference(t, n, r) {
    return (this.Jr.removeReference(r, n), this.Xr.add(r.toString()), F.resolve())
  }
  markPotentiallyOrphaned(t, n) {
    return (this.Xr.add(n.toString()), F.resolve())
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
    return F.forEach(this.Xr, (r) => {
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
    return F.or([
      () => F.resolve(this.Jr.containsKey(n)),
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
 */ class vl {
  constructor(t, n, r, s) {
    ;((this.targetId = t), (this.fromCache = n), (this.$i = r), (this.Ui = s))
  }
  static Wi(t, n) {
    let r = ut(),
      s = ut()
    for (const i of n.docChanges)
      switch (i.type) {
        case 0:
          r = r.add(i.doc.key)
          break
        case 1:
          s = s.add(i.doc.key)
      }
    return new vl(t, n.fromCache, r, s)
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
 */ class bE {
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
 */ class wE {
  constructor() {
    ;((this.Gi = !1),
      (this.zi = !1),
      (this.ji = 100),
      (this.Hi = (function () {
        return T_() ? 8 : ev(v_()) > 0 ? 6 : 4
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
        const a = new bE()
        return this.Xi(t, n, a).next((l) => {
          if (((i.result = l), this.zi)) return this.es(t, n, a, l.size)
        })
      })
      .next(() => i.result)
  }
  es(t, n, r, s) {
    return r.documentReadCount < this.ji
      ? (es() <= ft.DEBUG &&
          G(
            'QueryEngine',
            'SDK will not create cache indexes for query:',
            fr(n),
            'since it only creates cache indexes for collection contains',
            'more than or equal to',
            this.ji,
            'documents'
          ),
        F.resolve())
      : (es() <= ft.DEBUG &&
          G(
            'QueryEngine',
            'Query:',
            fr(n),
            'scans',
            r.documentReadCount,
            'local documents and returns',
            s,
            'documents as results.'
          ),
        r.documentReadCount > this.Hi * s
          ? (es() <= ft.DEBUG &&
              G(
                'QueryEngine',
                'The SDK decides to create cache indexes for query:',
                fr(n),
                'as using cache indexes may help improve performance.'
              ),
            this.indexManager.createTargetIndexes(t, qe(n)))
          : F.resolve())
  }
  Yi(t, n) {
    if (Lc(n)) return F.resolve(null)
    let r = qe(n)
    return this.indexManager.getIndexType(t, r).next((s) =>
      s === 0
        ? null
        : (n.limit !== null && s === 1 && ((n = wa(n, null, 'F')), (r = qe(n))),
          this.indexManager.getDocumentsMatchingTarget(t, r).next((i) => {
            const a = ut(...i)
            return this.Ji.getDocuments(t, a).next((l) =>
              this.indexManager.getMinOffset(t, r).next((u) => {
                const f = this.ts(n, l)
                return this.ns(n, f, a, u.readTime)
                  ? this.Yi(t, wa(n, null, 'F'))
                  : this.rs(t, f, n, u)
              })
            )
          }))
    )
  }
  Zi(t, n, r, s) {
    return Lc(n) || s.isEqual(st.min())
      ? F.resolve(null)
      : this.Ji.getDocuments(t, r).next((i) => {
          const a = this.ts(n, i)
          return this.ns(n, a, r, s)
            ? F.resolve(null)
            : (es() <= ft.DEBUG &&
                G(
                  'QueryEngine',
                  'Re-using previous result from %s to execute query: %s',
                  s.toString(),
                  fr(n)
                ),
              this.rs(t, a, n, Yy(s, -1)).next((l) => l))
        })
  }
  ts(t, n) {
    let r = new Xt(sd(t))
    return (
      n.forEach((s, i) => {
        ao(t, i) && (r = r.add(i))
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
      es() <= ft.DEBUG && G('QueryEngine', 'Using full collection scan to execute query:', fr(n)),
      this.Ji.getDocumentsMatchingQuery(t, n, kn.min(), r)
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
 */ class AE {
  constructor(t, n, r, s) {
    ;((this.persistence = t),
      (this.ss = n),
      (this.serializer = s),
      (this.os = new kt(_t)),
      (this._s = new Nr((i) => cl(i), hl)),
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
      (this.localDocuments = new fE(
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
function IE(e, t, n, r) {
  return new AE(e, t, n, r)
}
async function Rd(e, t) {
  const n = it(e)
  return await n.persistence.runTransaction('Handle user change', 'readonly', (r) => {
    let s
    return n.mutationQueue
      .getAllMutationBatches(r)
      .next((i) => ((s = i), n.ls(t), n.mutationQueue.getAllMutationBatches(r)))
      .next((i) => {
        const a = [],
          l = []
        let u = ut()
        for (const f of s) {
          a.push(f.batchId)
          for (const p of f.mutations) u = u.add(p.key)
        }
        for (const f of i) {
          l.push(f.batchId)
          for (const p of f.mutations) u = u.add(p.key)
        }
        return n.localDocuments
          .getDocuments(r, u)
          .next((f) => ({ hs: f, removedBatchIds: a, addedBatchIds: l }))
      })
  })
}
function RE(e, t) {
  const n = it(e)
  return n.persistence.runTransaction('Acknowledge batch', 'readwrite-primary', (r) => {
    const s = t.batch.keys(),
      i = n.cs.newChangeBuffer({ trackRemovals: !0 })
    return (function (l, u, f, p) {
      const _ = f.batch,
        w = _.keys()
      let P = F.resolve()
      return (
        w.forEach((O) => {
          P = P.next(() => p.getEntry(u, O)).next((k) => {
            const D = f.docVersions.get(O)
            ;(Tt(D !== null),
              k.version.compareTo(D) < 0 &&
                (_.applyToRemoteDocument(k, f),
                k.isValidDocument() && (k.setReadTime(f.commitVersion), p.addEntry(k))))
          })
        }),
        P.next(() => l.mutationQueue.removeMutationBatch(u, _))
      )
    })(n, r, t, i)
      .next(() => i.apply(r))
      .next(() => n.mutationQueue.performConsistencyCheck(r))
      .next(() => n.documentOverlayCache.removeOverlaysForBatchId(r, s, t.batch.batchId))
      .next(() =>
        n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
          r,
          (function (l) {
            let u = ut()
            for (let f = 0; f < l.mutationResults.length; ++f)
              l.mutationResults[f].transformResults.length > 0 &&
                (u = u.add(l.batch.mutations[f].key))
            return u
          })(t)
        )
      )
      .next(() => n.localDocuments.getDocuments(r, s))
  })
}
function xd(e) {
  const t = it(e)
  return t.persistence.runTransaction('Get last remote snapshot version', 'readonly', (n) =>
    t.Ur.getLastRemoteSnapshotVersion(n)
  )
}
function xE(e, t) {
  const n = it(e),
    r = t.snapshotVersion
  let s = n.os
  return n.persistence
    .runTransaction('Apply remote event', 'readwrite-primary', (i) => {
      const a = n.cs.newChangeBuffer({ trackRemovals: !0 })
      s = n.os
      const l = []
      t.targetChanges.forEach((p, _) => {
        const w = s.get(_)
        if (!w) return
        l.push(
          n.Ur.removeMatchingKeys(i, p.removedDocuments, _).next(() =>
            n.Ur.addMatchingKeys(i, p.addedDocuments, _)
          )
        )
        let P = w.withSequenceNumber(i.currentSequenceNumber)
        ;(t.targetMismatches.get(_) !== null
          ? (P = P.withResumeToken(Jt.EMPTY_BYTE_STRING, st.min()).withLastLimboFreeSnapshotVersion(
              st.min()
            ))
          : p.resumeToken.approximateByteSize() > 0 && (P = P.withResumeToken(p.resumeToken, r)),
          (s = s.insert(_, P)),
          (function (k, D, Q) {
            return k.resumeToken.approximateByteSize() === 0 ||
              D.snapshotVersion.toMicroseconds() - k.snapshotVersion.toMicroseconds() >= 3e8
              ? !0
              : Q.addedDocuments.size + Q.modifiedDocuments.size + Q.removedDocuments.size > 0
          })(w, P, p) && l.push(n.Ur.updateTargetData(i, P)))
      })
      let u = pn(),
        f = ut()
      if (
        (t.documentUpdates.forEach((p) => {
          t.resolvedLimboDocuments.has(p) &&
            l.push(n.persistence.referenceDelegate.updateLimboDocument(i, p))
        }),
        l.push(
          PE(i, a, t.documentUpdates).next((p) => {
            ;((u = p.Ps), (f = p.Is))
          })
        ),
        !r.isEqual(st.min()))
      ) {
        const p = n.Ur.getLastRemoteSnapshotVersion(i).next((_) =>
          n.Ur.setTargetsMetadata(i, i.currentSequenceNumber, r)
        )
        l.push(p)
      }
      return F.waitFor(l)
        .next(() => a.apply(i))
        .next(() => n.localDocuments.getLocalViewOfDocuments(i, u, f))
        .next(() => u)
    })
    .then((i) => ((n.os = s), i))
}
function PE(e, t, n) {
  let r = ut(),
    s = ut()
  return (
    n.forEach((i) => (r = r.add(i))),
    t.getEntries(e, r).next((i) => {
      let a = pn()
      return (
        n.forEach((l, u) => {
          const f = i.get(l)
          ;(u.isFoundDocument() !== f.isFoundDocument() && (s = s.add(l)),
            u.isNoDocument() && u.version.isEqual(st.min())
              ? (t.removeEntry(l, u.readTime), (a = a.insert(l, u)))
              : !f.isValidDocument() ||
                  u.version.compareTo(f.version) > 0 ||
                  (u.version.compareTo(f.version) === 0 && f.hasPendingWrites)
                ? (t.addEntry(u), (a = a.insert(l, u)))
                : G(
                    'LocalStore',
                    'Ignoring outdated watch update for ',
                    l,
                    '. Current version:',
                    f.version,
                    ' Watch version:',
                    u.version
                  ))
        }),
        { Ps: a, Is: s }
      )
    })
  )
}
function SE(e, t) {
  const n = it(e)
  return n.persistence.runTransaction(
    'Get next mutation batch',
    'readonly',
    (r) => (t === void 0 && (t = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(r, t))
  )
}
function CE(e, t) {
  const n = it(e)
  return n.persistence
    .runTransaction('Allocate target', 'readwrite', (r) => {
      let s
      return n.Ur.getTargetData(r, t).next((i) =>
        i
          ? ((s = i), F.resolve(s))
          : n.Ur.allocateTargetId(r).next(
              (a) => (
                (s = new bn(t, a, 'TargetPurposeListen', r.currentSequenceNumber)),
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
async function Pa(e, t, n) {
  const r = it(e),
    s = r.os.get(t),
    i = n ? 'readwrite' : 'readwrite-primary'
  try {
    n ||
      (await r.persistence.runTransaction('Release target', i, (a) =>
        r.persistence.referenceDelegate.removeTarget(a, s)
      ))
  } catch (a) {
    if (!Us(a)) throw a
    G('LocalStore', `Failed to update sequence numbers for target ${t}: ${a}`)
  }
  ;((r.os = r.os.remove(t)), r._s.delete(s.target))
}
function Gc(e, t, n) {
  const r = it(e)
  let s = st.min(),
    i = ut()
  return r.persistence.runTransaction('Execute query', 'readwrite', (a) =>
    (function (u, f, p) {
      const _ = it(u),
        w = _._s.get(p)
      return w !== void 0 ? F.resolve(_.os.get(w)) : _.Ur.getTargetData(f, p)
    })(r, a, qe(t))
      .next((l) => {
        if (l)
          return (
            (s = l.lastLimboFreeSnapshotVersion),
            r.Ur.getMatchingKeysForTargetId(a, l.targetId).next((u) => {
              i = u
            })
          )
      })
      .next(() => r.ss.getDocumentsMatchingQuery(a, t, n ? s : st.min(), n ? i : ut()))
      .next((l) => (kE(r, Ev(t), l), { documents: l, Ts: i }))
  )
}
function kE(e, t, n) {
  let r = e.us.get(t) || st.min()
  ;(n.forEach((s, i) => {
    i.readTime.compareTo(r) > 0 && (r = i.readTime)
  }),
    e.us.set(t, r))
}
class Qc {
  constructor() {
    this.activeTargetIds = Rv()
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
class VE {
  constructor() {
    ;((this.so = new Qc()),
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
    return ((this.so = new Qc()), Promise.resolve())
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
 */ class DE {
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
 */ class Yc {
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
    G('ConnectivityMonitor', 'Network connectivity changed: AVAILABLE')
    for (const t of this.ho) t(0)
  }
  lo() {
    G('ConnectivityMonitor', 'Network connectivity changed: UNAVAILABLE')
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
 */ let di = null
function Go() {
  return (
    di === null
      ? (di = (function () {
          return 268435456 + Math.round(2147483648 * Math.random())
        })())
      : di++,
    '0x' + di.toString(16)
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
 */ const NE = {
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
 */ class OE {
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
 */ const ne = 'WebChannelConnection'
class ME extends class {
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
    const l = Go(),
      u = this.xo(n, r.toUriEncodedString())
    G('RestConnection', `Sending RPC '${n}' ${l}:`, u, s)
    const f = { 'google-cloud-resource-prefix': this.vo, 'x-goog-request-params': this.Co }
    return (
      this.Oo(f, i, a),
      this.No(n, u, f, s).then(
        (p) => (G('RestConnection', `Received RPC '${n}' ${l}: `, p), p),
        (p) => {
          throw (
            Ar(
              'RestConnection',
              `RPC '${n}' ${l} failed with error: `,
              p,
              'url: ',
              u,
              'request:',
              s
            ),
            p
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
      return 'gl-js/ fire/' + Vr
    })()),
      (n['Content-Type'] = 'text/plain'),
      this.databaseInfo.appId && (n['X-Firebase-GMPID'] = this.databaseInfo.appId),
      r && r.headers.forEach((i, a) => (n[a] = i)),
      s && s.headers.forEach((i, a) => (n[a] = i)))
  }
  xo(n, r) {
    const s = NE[n]
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
    const i = Go()
    return new Promise((a, l) => {
      const u = new jf()
      ;(u.setWithCredentials(!0),
        u.listenOnce($f.COMPLETE, () => {
          try {
            switch (u.getLastErrorCode()) {
              case bi.NO_ERROR:
                const p = u.getResponseJson()
                ;(G(ne, `XHR for RPC '${t}' ${i} received:`, JSON.stringify(p)), a(p))
                break
              case bi.TIMEOUT:
                ;(G(ne, `RPC '${t}' ${i} timed out`),
                  l(new X(U.DEADLINE_EXCEEDED, 'Request time out')))
                break
              case bi.HTTP_ERROR:
                const _ = u.getStatus()
                if (
                  (G(
                    ne,
                    `RPC '${t}' ${i} failed with status:`,
                    _,
                    'response text:',
                    u.getResponseText()
                  ),
                  _ > 0)
                ) {
                  let w = u.getResponseJson()
                  Array.isArray(w) && (w = w[0])
                  const P = w == null ? void 0 : w.error
                  if (P && P.status && P.message) {
                    const O = (function (D) {
                      const Q = D.toLowerCase().replace(/_/g, '-')
                      return Object.values(U).indexOf(Q) >= 0 ? Q : U.UNKNOWN
                    })(P.status)
                    l(new X(O, P.message))
                  } else l(new X(U.UNKNOWN, 'Server responded with status ' + u.getStatus()))
                } else l(new X(U.UNAVAILABLE, 'Connection failed.'))
                break
              default:
                rt()
            }
          } finally {
            G(ne, `RPC '${t}' ${i} completed.`)
          }
        }))
      const f = JSON.stringify(s)
      ;(G(ne, `RPC '${t}' ${i} sending request:`, s), u.send(n, 'POST', f, r, 15))
    })
  }
  Bo(t, n, r) {
    const s = Go(),
      i = [this.Do, '/', 'google.firestore.v1.Firestore', '/', t, '/channel'],
      a = Hf(),
      l = Kf(),
      u = {
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
    ;(f !== void 0 && (u.longPollingTimeout = Math.round(1e3 * f)),
      this.useFetchStreams && (u.useFetchStreams = !0),
      this.Oo(u.initMessageHeaders, n, r),
      (u.encodeInitMessageHeaders = !0))
    const p = i.join('')
    G(ne, `Creating RPC '${t}' stream ${s}: ${p}`, u)
    const _ = a.createWebChannel(p, u)
    let w = !1,
      P = !1
    const O = new OE({
        Io: (D) => {
          P
            ? G(ne, `Not sending because RPC '${t}' stream ${s} is closed:`, D)
            : (w || (G(ne, `Opening RPC '${t}' stream ${s} transport.`), _.open(), (w = !0)),
              G(ne, `RPC '${t}' stream ${s} sending:`, D),
              _.send(D))
        },
        To: () => _.close()
      }),
      k = (D, Q, W) => {
        D.listen(Q, (H) => {
          try {
            W(H)
          } catch (q) {
            setTimeout(() => {
              throw q
            }, 0)
          }
        })
      }
    return (
      k(_, ss.EventType.OPEN, () => {
        P || (G(ne, `RPC '${t}' stream ${s} transport opened.`), O.yo())
      }),
      k(_, ss.EventType.CLOSE, () => {
        P || ((P = !0), G(ne, `RPC '${t}' stream ${s} transport closed`), O.So())
      }),
      k(_, ss.EventType.ERROR, (D) => {
        P ||
          ((P = !0),
          Ar(ne, `RPC '${t}' stream ${s} transport errored:`, D),
          O.So(new X(U.UNAVAILABLE, 'The operation could not be completed')))
      }),
      k(_, ss.EventType.MESSAGE, (D) => {
        var Q
        if (!P) {
          const W = D.data[0]
          Tt(!!W)
          const H = W,
            q = H.error || ((Q = H[0]) === null || Q === void 0 ? void 0 : Q.error)
          if (q) {
            G(ne, `RPC '${t}' stream ${s} received error:`, q)
            const lt = q.status
            let dt = (function (v) {
                const d = Ft[v]
                if (d !== void 0) return gd(d)
              })(lt),
              A = q.message
            ;(dt === void 0 &&
              ((dt = U.INTERNAL),
              (A = 'Unknown error status: ' + lt + ' with message ' + q.message)),
              (P = !0),
              O.So(new X(dt, A)),
              _.close())
          } else (G(ne, `RPC '${t}' stream ${s} received:`, W), O.bo(W))
        }
      }),
      k(l, qf.STAT_EVENT, (D) => {
        D.stat === ya.PROXY
          ? G(ne, `RPC '${t}' stream ${s} detected buffering proxy`)
          : D.stat === ya.NOPROXY && G(ne, `RPC '${t}' stream ${s} detected no buffering proxy`)
      }),
      setTimeout(() => {
        O.wo()
      }, 0),
      O
    )
  }
}
function Qo() {
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
 */ function ho(e) {
  return new zv(e, !0)
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
 */ class Pd {
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
      G(
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
 */ class Sd {
  constructor(t, n, r, s, i, a, l, u) {
    ;((this.ui = t),
      (this.Ho = r),
      (this.Jo = s),
      (this.connection = i),
      (this.authCredentialsProvider = a),
      (this.appCheckCredentialsProvider = l),
      (this.listener = u),
      (this.state = 0),
      (this.Yo = 0),
      (this.Zo = null),
      (this.Xo = null),
      (this.stream = null),
      (this.e_ = 0),
      (this.t_ = new Pd(t, n)))
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
        : n && n.code === U.RESOURCE_EXHAUSTED
          ? (dn(n.toString()),
            dn('Using maximum backoff delay to prevent overloading the backend.'),
            this.t_.Wo())
          : n &&
            n.code === U.UNAUTHENTICATED &&
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
          const s = new X(U.UNKNOWN, 'Fetching auth token failed: ' + r.message)
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
    return (G('PersistentStream', `close with error: ${t}`), (this.stream = null), this.close(4, t))
  }
  h_(t) {
    return (n) => {
      this.ui.enqueueAndForget(() =>
        this.Yo === t
          ? n()
          : (G('PersistentStream', 'stream callback skipped by getCloseGuardedDispatcher.'),
            Promise.resolve())
      )
    }
  }
}
class LE extends Sd {
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
    const n = Qv(this.serializer, t),
      r = (function (i) {
        if (!('targetChange' in i)) return st.min()
        const a = i.targetChange
        return a.targetIds && a.targetIds.length ? st.min() : a.readTime ? Ke(a.readTime) : st.min()
      })(t)
    return this.listener.d_(n, r)
  }
  A_(t) {
    const n = {}
    ;((n.database = xa(this.serializer)),
      (n.addTarget = (function (i, a) {
        let l
        const u = a.target
        if (
          ((l = ba(u) ? { documents: Jv(i, u) } : { query: Zv(i, u)._t }),
          (l.targetId = a.targetId),
          a.resumeToken.approximateByteSize() > 0)
        ) {
          l.resumeToken = vd(i, a.resumeToken)
          const f = Aa(i, a.expectedCount)
          f !== null && (l.expectedCount = f)
        } else if (a.snapshotVersion.compareTo(st.min()) > 0) {
          l.readTime = Ui(i, a.snapshotVersion.toTimestamp())
          const f = Aa(i, a.expectedCount)
          f !== null && (l.expectedCount = f)
        }
        return l
      })(this.serializer, t)))
    const r = eE(this.serializer, t)
    ;(r && (n.labels = r), this.a_(n))
  }
  R_(t) {
    const n = {}
    ;((n.database = xa(this.serializer)), (n.removeTarget = t), this.a_(n))
  }
}
class FE extends Sd {
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
    const n = Xv(t.writeResults, t.commitTime),
      r = Ke(t.commitTime)
    return this.listener.g_(r, n)
  }
  p_() {
    const t = {}
    ;((t.database = xa(this.serializer)), this.a_(t))
  }
  m_(t) {
    const n = { streamToken: this.lastStreamToken, writes: t.map((r) => Yv(this.serializer, r)) }
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
 */ class UE extends class {} {
  constructor(t, n, r, s) {
    ;(super(),
      (this.authCredentials = t),
      (this.appCheckCredentials = n),
      (this.connection = r),
      (this.serializer = s),
      (this.y_ = !1))
  }
  w_() {
    if (this.y_) throw new X(U.FAILED_PRECONDITION, 'The client has already been terminated.')
  }
  Mo(t, n, r, s) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([i, a]) => this.connection.Mo(t, Ia(n, r), s, i, a))
        .catch((i) => {
          throw i.name === 'FirebaseError'
            ? (i.code === U.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              i)
            : new X(U.UNKNOWN, i.toString())
        })
    )
  }
  Lo(t, n, r, s, i) {
    return (
      this.w_(),
      Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()])
        .then(([a, l]) => this.connection.Lo(t, Ia(n, r), s, a, l, i))
        .catch((a) => {
          throw a.name === 'FirebaseError'
            ? (a.code === U.UNAUTHENTICATED &&
                (this.authCredentials.invalidateToken(),
                this.appCheckCredentials.invalidateToken()),
              a)
            : new X(U.UNKNOWN, a.toString())
        })
    )
  }
  terminate() {
    ;((this.y_ = !0), this.connection.terminate())
  }
}
class BE {
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
    this.D_ ? (dn(n), (this.D_ = !1)) : G('OnlineStateTracker', n)
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
 */ class jE {
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
          rr(this) &&
            (G('RemoteStore', 'Restarting streams for network reachability change.'),
            await (async function (u) {
              const f = it(u)
              ;(f.L_.add(4), await $s(f), f.q_.set('Unknown'), f.L_.delete(4), await fo(f))
            })(this))
        })
      }),
      (this.q_ = new BE(r, s)))
  }
}
async function fo(e) {
  if (rr(e)) for (const t of e.B_) await t(!0)
}
async function $s(e) {
  for (const t of e.B_) await t(!1)
}
function Cd(e, t) {
  const n = it(e)
  n.N_.has(t.targetId) || (n.N_.set(t.targetId, t), wl(n) ? bl(n) : Or(n).r_() && Tl(n, t))
}
function El(e, t) {
  const n = it(e),
    r = Or(n)
  ;(n.N_.delete(t),
    r.r_() && kd(n, t),
    n.N_.size === 0 && (r.r_() ? r.o_() : rr(n) && n.q_.set('Unknown')))
}
function Tl(e, t) {
  if (
    (e.Q_.xe(t.targetId),
    t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(st.min()) > 0)
  ) {
    const n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size
    t = t.withExpectedCount(n)
  }
  Or(e).A_(t)
}
function kd(e, t) {
  ;(e.Q_.xe(t), Or(e).R_(t))
}
function bl(e) {
  ;((e.Q_ = new $v({
    getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
    ot: (t) => e.N_.get(t) || null,
    tt: () => e.datastore.serializer.databaseId
  })),
    Or(e).start(),
    e.q_.v_())
}
function wl(e) {
  return rr(e) && !Or(e).n_() && e.N_.size > 0
}
function rr(e) {
  return it(e).L_.size === 0
}
function Vd(e) {
  e.Q_ = void 0
}
async function $E(e) {
  e.q_.set('Online')
}
async function qE(e) {
  e.N_.forEach((t, n) => {
    Tl(e, t)
  })
}
async function KE(e, t) {
  ;(Vd(e), wl(e) ? (e.q_.M_(t), bl(e)) : e.q_.set('Unknown'))
}
async function HE(e, t, n) {
  if ((e.q_.set('Online'), t instanceof yd && t.state === 2 && t.cause))
    try {
      await (async function (s, i) {
        const a = i.cause
        for (const l of i.targetIds)
          s.N_.has(l) &&
            (await s.remoteSyncer.rejectListen(l, a), s.N_.delete(l), s.Q_.removeTarget(l))
      })(e, t)
    } catch (r) {
      ;(G('RemoteStore', 'Failed to remove targets %s: %s ', t.targetIds.join(','), r),
        await Bi(e, r))
    }
  else if (
    (t instanceof Ii ? e.Q_.Ke(t) : t instanceof _d ? e.Q_.He(t) : e.Q_.We(t), !n.isEqual(st.min()))
  )
    try {
      const r = await xd(e.localStore)
      n.compareTo(r) >= 0 &&
        (await (function (i, a) {
          const l = i.Q_.rt(a)
          return (
            l.targetChanges.forEach((u, f) => {
              if (u.resumeToken.approximateByteSize() > 0) {
                const p = i.N_.get(f)
                p && i.N_.set(f, p.withResumeToken(u.resumeToken, a))
              }
            }),
            l.targetMismatches.forEach((u, f) => {
              const p = i.N_.get(u)
              if (!p) return
              ;(i.N_.set(u, p.withResumeToken(Jt.EMPTY_BYTE_STRING, p.snapshotVersion)), kd(i, u))
              const _ = new bn(p.target, u, f, p.sequenceNumber)
              Tl(i, _)
            }),
            i.remoteSyncer.applyRemoteEvent(l)
          )
        })(e, n))
    } catch (r) {
      ;(G('RemoteStore', 'Failed to raise snapshot:', r), await Bi(e, r))
    }
}
async function Bi(e, t, n) {
  if (!Us(t)) throw t
  ;(e.L_.add(1),
    await $s(e),
    e.q_.set('Offline'),
    n || (n = () => xd(e.localStore)),
    e.asyncQueue.enqueueRetryable(async () => {
      ;(G('RemoteStore', 'Retrying IndexedDB access'), await n(), e.L_.delete(1), await fo(e))
    }))
}
function Dd(e, t) {
  return t().catch((n) => Bi(e, n, t))
}
async function po(e) {
  const t = it(e),
    n = Dn(t)
  let r = t.O_.length > 0 ? t.O_[t.O_.length - 1].batchId : -1
  for (; zE(t); )
    try {
      const s = await SE(t.localStore, r)
      if (s === null) {
        t.O_.length === 0 && n.o_()
        break
      }
      ;((r = s.batchId), WE(t, s))
    } catch (s) {
      await Bi(t, s)
    }
  Nd(t) && Od(t)
}
function zE(e) {
  return rr(e) && e.O_.length < 10
}
function WE(e, t) {
  e.O_.push(t)
  const n = Dn(e)
  n.r_() && n.V_ && n.m_(t.mutations)
}
function Nd(e) {
  return rr(e) && !Dn(e).n_() && e.O_.length > 0
}
function Od(e) {
  Dn(e).start()
}
async function GE(e) {
  Dn(e).p_()
}
async function QE(e) {
  const t = Dn(e)
  for (const n of e.O_) t.m_(n.mutations)
}
async function YE(e, t, n) {
  const r = e.O_.shift(),
    s = pl.from(r, t, n)
  ;(await Dd(e, () => e.remoteSyncer.applySuccessfulWrite(s)), await po(e))
}
async function XE(e, t) {
  ;(t &&
    Dn(e).V_ &&
    (await (async function (r, s) {
      if (
        (function (a) {
          return Uv(a) && a !== U.ABORTED
        })(s.code)
      ) {
        const i = r.O_.shift()
        ;(Dn(r).s_(),
          await Dd(r, () => r.remoteSyncer.rejectFailedWrite(i.batchId, s)),
          await po(r))
      }
    })(e, t)),
    Nd(e) && Od(e))
}
async function Xc(e, t) {
  const n = it(e)
  ;(n.asyncQueue.verifyOperationInProgress(),
    G('RemoteStore', 'RemoteStore received new credentials'))
  const r = rr(n)
  ;(n.L_.add(3),
    await $s(n),
    r && n.q_.set('Unknown'),
    await n.remoteSyncer.handleCredentialChange(t),
    n.L_.delete(3),
    await fo(n))
}
async function JE(e, t) {
  const n = it(e)
  t ? (n.L_.delete(2), await fo(n)) : t || (n.L_.add(2), await $s(n), n.q_.set('Unknown'))
}
function Or(e) {
  return (
    e.K_ ||
      ((e.K_ = (function (n, r, s) {
        const i = it(n)
        return (
          i.w_(),
          new LE(r, i.connection, i.authCredentials, i.appCheckCredentials, i.serializer, s)
        )
      })(e.datastore, e.asyncQueue, {
        Eo: $E.bind(null, e),
        Ro: qE.bind(null, e),
        mo: KE.bind(null, e),
        d_: HE.bind(null, e)
      })),
      e.B_.push(async (t) => {
        t ? (e.K_.s_(), wl(e) ? bl(e) : e.q_.set('Unknown')) : (await e.K_.stop(), Vd(e))
      })),
    e.K_
  )
}
function Dn(e) {
  return (
    e.U_ ||
      ((e.U_ = (function (n, r, s) {
        const i = it(n)
        return (
          i.w_(),
          new FE(r, i.connection, i.authCredentials, i.appCheckCredentials, i.serializer, s)
        )
      })(e.datastore, e.asyncQueue, {
        Eo: () => Promise.resolve(),
        Ro: GE.bind(null, e),
        mo: XE.bind(null, e),
        f_: QE.bind(null, e),
        g_: YE.bind(null, e)
      })),
      e.B_.push(async (t) => {
        t
          ? (e.U_.s_(), await po(e))
          : (await e.U_.stop(),
            e.O_.length > 0 &&
              (G('RemoteStore', `Stopping write stream with ${e.O_.length} pending writes`),
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
 */ class Al {
  constructor(t, n, r, s, i) {
    ;((this.asyncQueue = t),
      (this.timerId = n),
      (this.targetTimeMs = r),
      (this.op = s),
      (this.removalCallback = i),
      (this.deferred = new In()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch((a) => {}))
  }
  get promise() {
    return this.deferred.promise
  }
  static createAndSchedule(t, n, r, s, i) {
    const a = Date.now() + r,
      l = new Al(t, n, a, s, i)
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
      this.deferred.reject(new X(U.CANCELLED, 'Operation cancelled' + (t ? ': ' + t : ''))))
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
function Il(e, t) {
  if ((dn('AsyncQueue', `${t}: ${e}`), Us(e))) return new X(U.UNAVAILABLE, `${t}: ${e}`)
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
 */ class Er {
  constructor(t) {
    ;((this.comparator = t
      ? (n, r) => t(n, r) || Z.comparator(n.key, r.key)
      : (n, r) => Z.comparator(n.key, r.key)),
      (this.keyedMap = is()),
      (this.sortedSet = new kt(this.comparator)))
  }
  static emptySet(t) {
    return new Er(t.comparator)
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
    if (!(t instanceof Er) || this.size !== t.size) return !1
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
    const r = new Er()
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
 */ class Jc {
  constructor() {
    this.W_ = new kt(Z.comparator)
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
class Sr {
  constructor(t, n, r, s, i, a, l, u, f) {
    ;((this.query = t),
      (this.docs = n),
      (this.oldDocs = r),
      (this.docChanges = s),
      (this.mutatedKeys = i),
      (this.fromCache = a),
      (this.syncStateChanged = l),
      (this.excludesMetadataChanges = u),
      (this.hasCachedResults = f))
  }
  static fromInitialDocuments(t, n, r, s, i) {
    const a = []
    return (
      n.forEach((l) => {
        a.push({ type: 0, doc: l })
      }),
      new Sr(t, n, Er.emptySet(n), a, r, s, !0, !1, i)
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
        oo(this.query, t.query) &&
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
 */ class ZE {
  constructor() {
    ;((this.z_ = void 0), (this.j_ = []))
  }
  H_() {
    return this.j_.some((t) => t.J_())
  }
}
class tT {
  constructor() {
    ;((this.queries = Zc()), (this.onlineState = 'Unknown'), (this.Y_ = new Set()))
  }
  terminate() {
    ;(function (n, r) {
      const s = it(n),
        i = s.queries
      ;((s.queries = Zc()),
        i.forEach((a, l) => {
          for (const u of l.j_) u.onError(r)
        }))
    })(this, new X(U.ABORTED, 'Firestore shutting down'))
  }
}
function Zc() {
  return new Nr((e) => rd(e), oo)
}
async function eT(e, t) {
  const n = it(e)
  let r = 3
  const s = t.query
  let i = n.queries.get(s)
  i ? !i.H_() && t.J_() && (r = 2) : ((i = new ZE()), (r = t.J_() ? 0 : 1))
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
    const l = Il(a, `Initialization of query '${fr(t.query)}' failed`)
    return void t.onError(l)
  }
  ;(n.queries.set(s, i), i.j_.push(t), t.Z_(n.onlineState), i.z_ && t.X_(i.z_) && Rl(n))
}
async function nT(e, t) {
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
function rT(e, t) {
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
  r && Rl(n)
}
function sT(e, t, n) {
  const r = it(e),
    s = r.queries.get(t)
  if (s) for (const i of s.j_) i.onError(n)
  r.queries.delete(t)
}
function Rl(e) {
  e.Y_.forEach((t) => {
    t.next()
  })
}
var Sa, th
;(((th = Sa || (Sa = {})).ea = 'default'), (th.Cache = 'cache'))
class iT {
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
      t = new Sr(
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
    ;((t = Sr.fromInitialDocuments(
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
    return this.options.source !== Sa.Cache
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
 */ class Md {
  constructor(t) {
    this.key = t
  }
}
class Ld {
  constructor(t) {
    this.key = t
  }
}
class oT {
  constructor(t, n) {
    ;((this.query = t),
      (this.Ta = n),
      (this.Ea = null),
      (this.hasCachedResults = !1),
      (this.current = !1),
      (this.da = ut()),
      (this.mutatedKeys = ut()),
      (this.Aa = sd(t)),
      (this.Ra = new Er(this.Aa)))
  }
  get Va() {
    return this.Ta
  }
  ma(t, n) {
    const r = n ? n.fa : new Jc(),
      s = n ? n.Ra : this.Ra
    let i = n ? n.mutatedKeys : this.mutatedKeys,
      a = s,
      l = !1
    const u = this.query.limitType === 'F' && s.size === this.query.limit ? s.last() : null,
      f = this.query.limitType === 'L' && s.size === this.query.limit ? s.first() : null
    if (
      (t.inorderTraversal((p, _) => {
        const w = s.get(p),
          P = ao(this.query, _) ? _ : null,
          O = !!w && this.mutatedKeys.has(w.key),
          k =
            !!P && (P.hasLocalMutations || (this.mutatedKeys.has(P.key) && P.hasCommittedMutations))
        let D = !1
        ;(w && P
          ? w.data.isEqual(P.data)
            ? O !== k && (r.track({ type: 3, doc: P }), (D = !0))
            : this.ga(w, P) ||
              (r.track({ type: 2, doc: P }),
              (D = !0),
              ((u && this.Aa(P, u) > 0) || (f && this.Aa(P, f) < 0)) && (l = !0))
          : !w && P
            ? (r.track({ type: 0, doc: P }), (D = !0))
            : w && !P && (r.track({ type: 1, doc: w }), (D = !0), (u || f) && (l = !0)),
          D &&
            (P
              ? ((a = a.add(P)), (i = k ? i.add(p) : i.delete(p)))
              : ((a = a.delete(p)), (i = i.delete(p)))))
      }),
      this.query.limit !== null)
    )
      for (; a.size > this.query.limit; ) {
        const p = this.query.limitType === 'F' ? a.last() : a.first()
        ;((a = a.delete(p.key)), (i = i.delete(p.key)), r.track({ type: 1, doc: p }))
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
      (p, _) =>
        (function (P, O) {
          const k = (D) => {
            switch (D) {
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
          return k(P) - k(O)
        })(p.type, _.type) || this.Aa(p.doc, _.doc)
    ),
      this.pa(r),
      (s = s != null && s))
    const l = n && !s ? this.ya() : [],
      u = this.da.size === 0 && this.current && !s ? 1 : 0,
      f = u !== this.Ea
    return (
      (this.Ea = u),
      a.length !== 0 || f
        ? {
            snapshot: new Sr(
              this.query,
              t.Ra,
              i,
              a,
              t.mutatedKeys,
              u === 0,
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
        this.applyChanges({ Ra: this.Ra, fa: new Jc(), mutatedKeys: this.mutatedKeys, ns: !1 }, !1))
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
    ;((this.da = ut()),
      this.Ra.forEach((r) => {
        this.Sa(r.key) && (this.da = this.da.add(r.key))
      }))
    const n = []
    return (
      t.forEach((r) => {
        this.da.has(r) || n.push(new Ld(r))
      }),
      this.da.forEach((r) => {
        t.has(r) || n.push(new Md(r))
      }),
      n
    )
  }
  ba(t) {
    ;((this.Ta = t.Ts), (this.da = ut()))
    const n = this.ma(t.documents)
    return this.applyChanges(n, !0)
  }
  Da() {
    return Sr.fromInitialDocuments(
      this.query,
      this.Ra,
      this.mutatedKeys,
      this.Ea === 0,
      this.hasCachedResults
    )
  }
}
class aT {
  constructor(t, n, r) {
    ;((this.query = t), (this.targetId = n), (this.view = r))
  }
}
class lT {
  constructor(t) {
    ;((this.key = t), (this.va = !1))
  }
}
class uT {
  constructor(t, n, r, s, i, a) {
    ;((this.localStore = t),
      (this.remoteStore = n),
      (this.eventManager = r),
      (this.sharedClientState = s),
      (this.currentUser = i),
      (this.maxConcurrentLimboResolutions = a),
      (this.Ca = {}),
      (this.Fa = new Nr((l) => rd(l), oo)),
      (this.Ma = new Map()),
      (this.xa = new Set()),
      (this.Oa = new kt(Z.comparator)),
      (this.Na = new Map()),
      (this.La = new _l()),
      (this.Ba = {}),
      (this.ka = new Map()),
      (this.qa = Pr.kn()),
      (this.onlineState = 'Unknown'),
      (this.Qa = void 0))
  }
  get isPrimaryClient() {
    return this.Qa === !0
  }
}
async function cT(e, t, n = !0) {
  const r = qd(e)
  let s
  const i = r.Fa.get(t)
  return (
    i
      ? (r.sharedClientState.addLocalQueryTarget(i.targetId), (s = i.view.Da()))
      : (s = await Fd(r, t, n, !0)),
    s
  )
}
async function hT(e, t) {
  const n = qd(e)
  await Fd(n, t, !0, !1)
}
async function Fd(e, t, n, r) {
  const s = await CE(e.localStore, qe(t)),
    i = s.targetId,
    a = e.sharedClientState.addLocalQueryTarget(i, n)
  let l
  return (
    r && (l = await fT(e, t, i, a === 'current', s.resumeToken)),
    e.isPrimaryClient && n && Cd(e.remoteStore, s),
    l
  )
}
async function fT(e, t, n, r, s) {
  e.Ka = (_, w, P) =>
    (async function (k, D, Q, W) {
      let H = D.view.ma(Q)
      H.ns && (H = await Gc(k.localStore, D.query, !1).then(({ documents: A }) => D.view.ma(A, H)))
      const q = W && W.targetChanges.get(D.targetId),
        lt = W && W.targetMismatches.get(D.targetId) != null,
        dt = D.view.applyChanges(H, k.isPrimaryClient, q, lt)
      return (nh(k, D.targetId, dt.wa), dt.snapshot)
    })(e, _, w, P)
  const i = await Gc(e.localStore, t, !0),
    a = new oT(t, i.Ts),
    l = a.ma(i.documents),
    u = js.createSynthesizedTargetChangeForCurrentChange(n, r && e.onlineState !== 'Offline', s),
    f = a.applyChanges(l, e.isPrimaryClient, u)
  nh(e, n, f.wa)
  const p = new aT(t, n, a)
  return (e.Fa.set(t, p), e.Ma.has(n) ? e.Ma.get(n).push(t) : e.Ma.set(n, [t]), f.snapshot)
}
async function dT(e, t, n) {
  const r = it(e),
    s = r.Fa.get(t),
    i = r.Ma.get(s.targetId)
  if (i.length > 1)
    return (
      r.Ma.set(
        s.targetId,
        i.filter((a) => !oo(a, t))
      ),
      void r.Fa.delete(t)
    )
  r.isPrimaryClient
    ? (r.sharedClientState.removeLocalQueryTarget(s.targetId),
      r.sharedClientState.isActiveQueryTarget(s.targetId) ||
        (await Pa(r.localStore, s.targetId, !1)
          .then(() => {
            ;(r.sharedClientState.clearQueryState(s.targetId),
              n && El(r.remoteStore, s.targetId),
              Ca(r, s.targetId))
          })
          .catch(Fs)))
    : (Ca(r, s.targetId), await Pa(r.localStore, s.targetId, !0))
}
async function pT(e, t) {
  const n = it(e),
    r = n.Fa.get(t),
    s = n.Ma.get(r.targetId)
  n.isPrimaryClient &&
    s.length === 1 &&
    (n.sharedClientState.removeLocalQueryTarget(r.targetId), El(n.remoteStore, r.targetId))
}
async function mT(e, t, n) {
  const r = bT(e)
  try {
    const s = await (function (a, l) {
      const u = it(a),
        f = $t.now(),
        p = l.reduce((P, O) => P.add(O.key), ut())
      let _, w
      return u.persistence
        .runTransaction('Locally write mutations', 'readwrite', (P) => {
          let O = pn(),
            k = ut()
          return u.cs
            .getEntries(P, p)
            .next((D) => {
              ;((O = D),
                O.forEach((Q, W) => {
                  W.isValidDocument() || (k = k.add(Q))
                }))
            })
            .next(() => u.localDocuments.getOverlayedDocuments(P, O))
            .next((D) => {
              _ = D
              const Q = []
              for (const W of l) {
                const H = Nv(W, _.get(W.key).overlayedDocument)
                H != null && Q.push(new nr(W.key, H, Yf(H.value.mapValue), ln.exists(!0)))
              }
              return u.mutationQueue.addMutationBatch(P, f, Q, l)
            })
            .next((D) => {
              w = D
              const Q = D.applyToLocalDocumentSet(_, k)
              return u.documentOverlayCache.saveOverlays(P, D.batchId, Q)
            })
        })
        .then(() => ({ batchId: w.batchId, changes: od(_) }))
    })(r.localStore, t)
    ;(r.sharedClientState.addPendingMutation(s.batchId),
      (function (a, l, u) {
        let f = a.Ba[a.currentUser.toKey()]
        ;(f || (f = new kt(_t)), (f = f.insert(l, u)), (a.Ba[a.currentUser.toKey()] = f))
      })(r, s.batchId, n),
      await qs(r, s.changes),
      await po(r.remoteStore))
  } catch (s) {
    const i = Il(s, 'Failed to persist write')
    n.reject(i)
  }
}
async function Ud(e, t) {
  const n = it(e)
  try {
    const r = await xE(n.localStore, t)
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
      await qs(n, r, t))
  } catch (r) {
    await Fs(r)
  }
}
function eh(e, t, n) {
  const r = it(e)
  if ((r.isPrimaryClient && n === 0) || (!r.isPrimaryClient && n === 1)) {
    const s = []
    ;(r.Fa.forEach((i, a) => {
      const l = a.view.Z_(t)
      l.snapshot && s.push(l.snapshot)
    }),
      (function (a, l) {
        const u = it(a)
        u.onlineState = l
        let f = !1
        ;(u.queries.forEach((p, _) => {
          for (const w of _.j_) w.Z_(l) && (f = !0)
        }),
          f && Rl(u))
      })(r.eventManager, t),
      s.length && r.Ca.d_(s),
      (r.onlineState = t),
      r.isPrimaryClient && r.sharedClientState.setOnlineState(t))
  }
}
async function gT(e, t, n) {
  const r = it(e)
  r.sharedClientState.updateQueryState(t, 'rejected', n)
  const s = r.Na.get(t),
    i = s && s.key
  if (i) {
    let a = new kt(Z.comparator)
    a = a.insert(i, ie.newNoDocument(i, st.min()))
    const l = ut().add(i),
      u = new co(st.min(), new Map(), new kt(_t), a, l)
    ;(await Ud(r, u), (r.Oa = r.Oa.remove(i)), r.Na.delete(t), xl(r))
  } else
    await Pa(r.localStore, t, !1)
      .then(() => Ca(r, t, n))
      .catch(Fs)
}
async function _T(e, t) {
  const n = it(e),
    r = t.batch.batchId
  try {
    const s = await RE(n.localStore, t)
    ;(jd(n, r, null),
      Bd(n, r),
      n.sharedClientState.updateMutationState(r, 'acknowledged'),
      await qs(n, s))
  } catch (s) {
    await Fs(s)
  }
}
async function yT(e, t, n) {
  const r = it(e)
  try {
    const s = await (function (a, l) {
      const u = it(a)
      return u.persistence.runTransaction('Reject batch', 'readwrite-primary', (f) => {
        let p
        return u.mutationQueue
          .lookupMutationBatch(f, l)
          .next((_) => (Tt(_ !== null), (p = _.keys()), u.mutationQueue.removeMutationBatch(f, _)))
          .next(() => u.mutationQueue.performConsistencyCheck(f))
          .next(() => u.documentOverlayCache.removeOverlaysForBatchId(f, p, l))
          .next(() => u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f, p))
          .next(() => u.localDocuments.getDocuments(f, p))
      })
    })(r.localStore, t)
    ;(jd(r, t, n),
      Bd(r, t),
      r.sharedClientState.updateMutationState(t, 'rejected', n),
      await qs(r, s))
  } catch (s) {
    await Fs(s)
  }
}
function Bd(e, t) {
  ;((e.ka.get(t) || []).forEach((n) => {
    n.resolve()
  }),
    e.ka.delete(t))
}
function jd(e, t, n) {
  const r = it(e)
  let s = r.Ba[r.currentUser.toKey()]
  if (s) {
    const i = s.get(t)
    ;(i && (n ? i.reject(n) : i.resolve(), (s = s.remove(t))), (r.Ba[r.currentUser.toKey()] = s))
  }
}
function Ca(e, t, n = null) {
  e.sharedClientState.removeLocalQueryTarget(t)
  for (const r of e.Ma.get(t)) (e.Fa.delete(r), n && e.Ca.$a(r, n))
  ;(e.Ma.delete(t),
    e.isPrimaryClient &&
      e.La.gr(t).forEach((r) => {
        e.La.containsKey(r) || $d(e, r)
      }))
}
function $d(e, t) {
  e.xa.delete(t.path.canonicalString())
  const n = e.Oa.get(t)
  n !== null && (El(e.remoteStore, n), (e.Oa = e.Oa.remove(t)), e.Na.delete(n), xl(e))
}
function nh(e, t, n) {
  for (const r of n)
    r instanceof Md
      ? (e.La.addReference(r.key, t), vT(e, r))
      : r instanceof Ld
        ? (G('SyncEngine', 'Document no longer in limbo: ' + r.key),
          e.La.removeReference(r.key, t),
          e.La.containsKey(r.key) || $d(e, r.key))
        : rt()
}
function vT(e, t) {
  const n = t.key,
    r = n.path.canonicalString()
  e.Oa.get(n) || e.xa.has(r) || (G('SyncEngine', 'New document in limbo: ' + n), e.xa.add(r), xl(e))
}
function xl(e) {
  for (; e.xa.size > 0 && e.Oa.size < e.maxConcurrentLimboResolutions; ) {
    const t = e.xa.values().next().value
    e.xa.delete(t)
    const n = new Z(Pt.fromString(t)),
      r = e.qa.next()
    ;(e.Na.set(r, new lT(n)),
      (e.Oa = e.Oa.insert(n, r)),
      Cd(e.remoteStore, new bn(qe(fl(n.path)), r, 'TargetPurposeLimboResolution', ol.oe)))
  }
}
async function qs(e, t, n) {
  const r = it(e),
    s = [],
    i = [],
    a = []
  r.Fa.isEmpty() ||
    (r.Fa.forEach((l, u) => {
      a.push(
        r.Ka(u, t, n).then((f) => {
          var p
          if ((f || n) && r.isPrimaryClient) {
            const _ = f
              ? !f.fromCache
              : (p = n == null ? void 0 : n.targetChanges.get(u.targetId)) === null || p === void 0
                ? void 0
                : p.current
            r.sharedClientState.updateQueryState(u.targetId, _ ? 'current' : 'not-current')
          }
          if (f) {
            s.push(f)
            const _ = vl.Wi(u.targetId, f)
            i.push(_)
          }
        })
      )
    }),
    await Promise.all(a),
    r.Ca.d_(s),
    await (async function (u, f) {
      const p = it(u)
      try {
        await p.persistence.runTransaction('notifyLocalViewChanges', 'readwrite', (_) =>
          F.forEach(f, (w) =>
            F.forEach(w.$i, (P) =>
              p.persistence.referenceDelegate.addReference(_, w.targetId, P)
            ).next(() =>
              F.forEach(w.Ui, (P) =>
                p.persistence.referenceDelegate.removeReference(_, w.targetId, P)
              )
            )
          )
        )
      } catch (_) {
        if (!Us(_)) throw _
        G('LocalStore', 'Failed to update sequence numbers: ' + _)
      }
      for (const _ of f) {
        const w = _.targetId
        if (!_.fromCache) {
          const P = p.os.get(w),
            O = P.snapshotVersion,
            k = P.withLastLimboFreeSnapshotVersion(O)
          p.os = p.os.insert(w, k)
        }
      }
    })(r.localStore, i))
}
async function ET(e, t) {
  const n = it(e)
  if (!n.currentUser.isEqual(t)) {
    G('SyncEngine', 'User change. New user:', t.toKey())
    const r = await Rd(n.localStore, t)
    ;((n.currentUser = t),
      (function (i, a) {
        ;(i.ka.forEach((l) => {
          l.forEach((u) => {
            u.reject(new X(U.CANCELLED, a))
          })
        }),
          i.ka.clear())
      })(n, "'waitForPendingWrites' promise is rejected due to a user change."),
      n.sharedClientState.handleUserChange(t, r.removedBatchIds, r.addedBatchIds),
      await qs(n, r.hs))
  }
}
function TT(e, t) {
  const n = it(e),
    r = n.Na.get(t)
  if (r && r.va) return ut().add(r.key)
  {
    let s = ut()
    const i = n.Ma.get(t)
    if (!i) return s
    for (const a of i) {
      const l = n.Fa.get(a)
      s = s.unionWith(l.view.Va)
    }
    return s
  }
}
function qd(e) {
  const t = it(e)
  return (
    (t.remoteStore.remoteSyncer.applyRemoteEvent = Ud.bind(null, t)),
    (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = TT.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectListen = gT.bind(null, t)),
    (t.Ca.d_ = rT.bind(null, t.eventManager)),
    (t.Ca.$a = sT.bind(null, t.eventManager)),
    t
  )
}
function bT(e) {
  const t = it(e)
  return (
    (t.remoteStore.remoteSyncer.applySuccessfulWrite = _T.bind(null, t)),
    (t.remoteStore.remoteSyncer.rejectFailedWrite = yT.bind(null, t)),
    t
  )
}
class ji {
  constructor() {
    ;((this.kind = 'memory'), (this.synchronizeTabs = !1))
  }
  async initialize(t) {
    ;((this.serializer = ho(t.databaseInfo.databaseId)),
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
    return IE(this.persistence, new wE(), t.initialUser, this.serializer)
  }
  Ga(t) {
    return new EE(yl.Zr, this.serializer)
  }
  Wa(t) {
    return new VE()
  }
  async terminate() {
    var t, n
    ;((t = this.gcScheduler) === null || t === void 0 || t.stop(),
      (n = this.indexBackfillerScheduler) === null || n === void 0 || n.stop(),
      this.sharedClientState.shutdown(),
      await this.persistence.shutdown())
  }
}
ji.provider = { build: () => new ji() }
class ka {
  async initialize(t, n) {
    this.localStore ||
      ((this.localStore = t.localStore),
      (this.sharedClientState = t.sharedClientState),
      (this.datastore = this.createDatastore(n)),
      (this.remoteStore = this.createRemoteStore(n)),
      (this.eventManager = this.createEventManager(n)),
      (this.syncEngine = this.createSyncEngine(n, !t.synchronizeTabs)),
      (this.sharedClientState.onlineStateHandler = (r) => eh(this.syncEngine, r, 1)),
      (this.remoteStore.remoteSyncer.handleCredentialChange = ET.bind(null, this.syncEngine)),
      await JE(this.remoteStore, this.syncEngine.isPrimaryClient))
  }
  createEventManager(t) {
    return (function () {
      return new tT()
    })()
  }
  createDatastore(t) {
    const n = ho(t.databaseInfo.databaseId),
      r = (function (i) {
        return new ME(i)
      })(t.databaseInfo)
    return (function (i, a, l, u) {
      return new UE(i, a, l, u)
    })(t.authCredentials, t.appCheckCredentials, r, n)
  }
  createRemoteStore(t) {
    return (function (r, s, i, a, l) {
      return new jE(r, s, i, a, l)
    })(
      this.localStore,
      this.datastore,
      t.asyncQueue,
      (n) => eh(this.syncEngine, n, 0),
      (function () {
        return Yc.D() ? new Yc() : new DE()
      })()
    )
  }
  createSyncEngine(t, n) {
    return (function (s, i, a, l, u, f, p) {
      const _ = new uT(s, i, a, l, u, f)
      return (p && (_.Qa = !0), _)
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
      ;(G('RemoteStore', 'RemoteStore shutting down.'),
        i.L_.add(5),
        await $s(i),
        i.k_.shutdown(),
        i.q_.set('Unknown'))
    })(this.remoteStore),
      (t = this.datastore) === null || t === void 0 || t.terminate(),
      (n = this.eventManager) === null || n === void 0 || n.terminate())
  }
}
ka.provider = { build: () => new ka() }
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
 */ class wT {
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
        : dn('Uncaught Error in snapshot listener:', t.toString()))
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
 */ class AT {
  constructor(t, n, r, s, i) {
    ;((this.authCredentials = t),
      (this.appCheckCredentials = n),
      (this.asyncQueue = r),
      (this.databaseInfo = s),
      (this.user = re.UNAUTHENTICATED),
      (this.clientId = Wf.newId()),
      (this.authCredentialListener = () => Promise.resolve()),
      (this.appCheckCredentialListener = () => Promise.resolve()),
      (this._uninitializedComponentsProvider = i),
      this.authCredentials.start(r, async (a) => {
        ;(G('FirestoreClient', 'Received user=', a.uid),
          await this.authCredentialListener(a),
          (this.user = a))
      }),
      this.appCheckCredentials.start(
        r,
        (a) => (
          G('FirestoreClient', 'Received new app check token=', a),
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
    const t = new In()
    return (
      this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
        try {
          ;(this._onlineComponents && (await this._onlineComponents.terminate()),
            this._offlineComponents && (await this._offlineComponents.terminate()),
            this.authCredentials.shutdown(),
            this.appCheckCredentials.shutdown(),
            t.resolve())
        } catch (n) {
          const r = Il(n, 'Failed to shutdown persistence')
          t.reject(r)
        }
      }),
      t.promise
    )
  }
}
async function Yo(e, t) {
  ;(e.asyncQueue.verifyOperationInProgress(),
    G('FirestoreClient', 'Initializing OfflineComponentProvider'))
  const n = e.configuration
  await t.initialize(n)
  let r = n.initialUser
  ;(e.setCredentialChangeListener(async (s) => {
    r.isEqual(s) || (await Rd(t.localStore, s), (r = s))
  }),
    t.persistence.setDatabaseDeletedListener(() => e.terminate()),
    (e._offlineComponents = t))
}
async function rh(e, t) {
  e.asyncQueue.verifyOperationInProgress()
  const n = await IT(e)
  ;(G('FirestoreClient', 'Initializing OnlineComponentProvider'),
    await t.initialize(n, e.configuration),
    e.setCredentialChangeListener((r) => Xc(t.remoteStore, r)),
    e.setAppCheckTokenChangeListener((r, s) => Xc(t.remoteStore, s)),
    (e._onlineComponents = t))
}
async function IT(e) {
  if (!e._offlineComponents)
    if (e._uninitializedComponentsProvider) {
      G('FirestoreClient', 'Using user provided OfflineComponentProvider')
      try {
        await Yo(e, e._uninitializedComponentsProvider._offline)
      } catch (t) {
        const n = t
        if (
          !(function (s) {
            return s.name === 'FirebaseError'
              ? s.code === U.FAILED_PRECONDITION || s.code === U.UNIMPLEMENTED
              : !(typeof DOMException < 'u' && s instanceof DOMException) ||
                  s.code === 22 ||
                  s.code === 20 ||
                  s.code === 11
          })(n)
        )
          throw n
        ;(Ar('Error using user provided cache. Falling back to memory cache: ' + n),
          await Yo(e, new ji()))
      }
    } else (G('FirestoreClient', 'Using default OfflineComponentProvider'), await Yo(e, new ji()))
  return e._offlineComponents
}
async function Kd(e) {
  return (
    e._onlineComponents ||
      (e._uninitializedComponentsProvider
        ? (G('FirestoreClient', 'Using user provided OnlineComponentProvider'),
          await rh(e, e._uninitializedComponentsProvider._online))
        : (G('FirestoreClient', 'Using default OnlineComponentProvider'), await rh(e, new ka()))),
    e._onlineComponents
  )
}
function RT(e) {
  return Kd(e).then((t) => t.syncEngine)
}
async function xT(e) {
  const t = await Kd(e),
    n = t.eventManager
  return (
    (n.onListen = cT.bind(null, t.syncEngine)),
    (n.onUnlisten = dT.bind(null, t.syncEngine)),
    (n.onFirstRemoteStoreListen = hT.bind(null, t.syncEngine)),
    (n.onLastRemoteStoreUnlisten = pT.bind(null, t.syncEngine)),
    n
  )
}
function PT(e, t, n = {}) {
  const r = new In()
  return (
    e.asyncQueue.enqueueAndForget(async () =>
      (function (i, a, l, u, f) {
        const p = new wT({
            next: (w) => {
              ;(p.Za(), a.enqueueAndForget(() => nT(i, _)))
              const P = w.docs.has(l)
              !P && w.fromCache
                ? f.reject(
                    new X(U.UNAVAILABLE, 'Failed to get document because the client is offline.')
                  )
                : P && w.fromCache && u && u.source === 'server'
                  ? f.reject(
                      new X(
                        U.UNAVAILABLE,
                        'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                      )
                    )
                  : f.resolve(w)
            },
            error: (w) => f.reject(w)
          }),
          _ = new iT(fl(l.path), p, { includeMetadataChanges: !0, _a: !0 })
        return eT(i, _)
      })(await xT(e), e.asyncQueue, t, n, r)
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
 */ function Hd(e) {
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
 */ const sh = new Map()
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
 */ function zd(e, t, n) {
  if (!n) throw new X(U.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`)
}
function ST(e, t, n, r) {
  if (t === !0 && r === !0)
    throw new X(U.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`)
}
function ih(e) {
  if (!Z.isDocumentKey(e))
    throw new X(
      U.INVALID_ARGUMENT,
      `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
    )
}
function oh(e) {
  if (Z.isDocumentKey(e))
    throw new X(
      U.INVALID_ARGUMENT,
      `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
    )
}
function Pl(e) {
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
function $i(e, t) {
  if (('_delegate' in e && (e = e._delegate), !(e instanceof t))) {
    if (t.name === e.constructor.name)
      throw new X(
        U.INVALID_ARGUMENT,
        'Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?'
      )
    {
      const n = Pl(e)
      throw new X(U.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`)
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
 */ class ah {
  constructor(t) {
    var n, r
    if (t.host === void 0) {
      if (t.ssl !== void 0)
        throw new X(U.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set")
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
        throw new X(U.INVALID_ARGUMENT, 'cacheSizeBytes must be at least 1048576')
      this.cacheSizeBytes = t.cacheSizeBytes
    }
    ;(ST(
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
      (this.experimentalLongPollingOptions = Hd(
        (r = t.experimentalLongPollingOptions) !== null && r !== void 0 ? r : {}
      )),
      (function (i) {
        if (i.timeoutSeconds !== void 0) {
          if (isNaN(i.timeoutSeconds))
            throw new X(
              U.INVALID_ARGUMENT,
              `invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`
            )
          if (i.timeoutSeconds < 5)
            throw new X(
              U.INVALID_ARGUMENT,
              `invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`
            )
          if (i.timeoutSeconds > 30)
            throw new X(
              U.INVALID_ARGUMENT,
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
class mo {
  constructor(t, n, r, s) {
    ;((this._authCredentials = t),
      (this._appCheckCredentials = n),
      (this._databaseId = r),
      (this._app = s),
      (this.type = 'firestore-lite'),
      (this._persistenceKey = '(lite)'),
      (this._settings = new ah({})),
      (this._settingsFrozen = !1),
      (this._terminateTask = 'notTerminated'))
  }
  get app() {
    if (!this._app)
      throw new X(
        U.FAILED_PRECONDITION,
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
        U.FAILED_PRECONDITION,
        'Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.'
      )
    ;((this._settings = new ah(t)),
      t.credentials !== void 0 &&
        (this._authCredentials = (function (r) {
          if (!r) return new jy()
          switch (r.type) {
            case 'firstParty':
              return new Hy(r.sessionIndex || '0', r.iamToken || null, r.authTokenFactory || null)
            case 'provider':
              return r.client
            default:
              throw new X(
                U.INVALID_ARGUMENT,
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
        const r = sh.get(n)
        r && (G('ComponentProvider', 'Removing Datastore'), sh.delete(n), r.terminate())
      })(this),
      Promise.resolve()
    )
  }
}
function CT(e, t, n, r = {}) {
  var s
  const i = (e = $i(e, mo))._getSettings(),
    a = `${t}:${n}`
  if (
    (i.host !== 'firestore.googleapis.com' &&
      i.host !== a &&
      Ar(
        'Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.'
      ),
    e._setSettings(Object.assign(Object.assign({}, i), { host: a, ssl: !1 })),
    r.mockUserToken)
  ) {
    let l, u
    if (typeof r.mockUserToken == 'string') ((l = r.mockUserToken), (u = re.MOCK_USER))
    else {
      l = Df(r.mockUserToken, (s = e._app) === null || s === void 0 ? void 0 : s.options.projectId)
      const f = r.mockUserToken.sub || r.mockUserToken.user_id
      if (!f)
        throw new X(U.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!")
      u = new re(f)
    }
    e._authCredentials = new $y(new zf(l, u))
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
 */ class Sl {
  constructor(t, n, r) {
    ;((this.converter = n), (this._query = r), (this.type = 'query'), (this.firestore = t))
  }
  withConverter(t) {
    return new Sl(this.firestore, t, this._query)
  }
}
class Re {
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
    return new Rn(this.firestore, this.converter, this._key.path.popLast())
  }
  withConverter(t) {
    return new Re(this.firestore, t, this._key)
  }
}
class Rn extends Sl {
  constructor(t, n, r) {
    ;(super(t, n, fl(r)), (this._path = r), (this.type = 'collection'))
  }
  get id() {
    return this._query.path.lastSegment()
  }
  get path() {
    return this._query.path.canonicalString()
  }
  get parent() {
    const t = this._path.popLast()
    return t.isEmpty() ? null : new Re(this.firestore, null, new Z(t))
  }
  withConverter(t) {
    return new Rn(this.firestore, t, this._path)
  }
}
function kT(e, t, ...n) {
  if (((e = Qn(e)), zd('collection', 'path', t), e instanceof mo)) {
    const r = Pt.fromString(t, ...n)
    return (oh(r), new Rn(e, null, r))
  }
  {
    if (!(e instanceof Re || e instanceof Rn))
      throw new X(
        U.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      )
    const r = e._path.child(Pt.fromString(t, ...n))
    return (oh(r), new Rn(e.firestore, null, r))
  }
}
function Ri(e, t, ...n) {
  if (
    ((e = Qn(e)), arguments.length === 1 && (t = Wf.newId()), zd('doc', 'path', t), e instanceof mo)
  ) {
    const r = Pt.fromString(t, ...n)
    return (ih(r), new Re(e, null, new Z(r)))
  }
  {
    if (!(e instanceof Re || e instanceof Rn))
      throw new X(
        U.INVALID_ARGUMENT,
        'Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore'
      )
    const r = e._path.child(Pt.fromString(t, ...n))
    return (ih(r), new Re(e.firestore, e instanceof Rn ? e.converter : null, new Z(r)))
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
 */ class lh {
  constructor(t = Promise.resolve()) {
    ;((this.Pu = []),
      (this.Iu = !1),
      (this.Tu = []),
      (this.Eu = null),
      (this.du = !1),
      (this.Au = !1),
      (this.Ru = []),
      (this.t_ = new Pd(this, 'async_queue_retry')),
      (this.Vu = () => {
        const r = Qo()
        ;(r && G('AsyncQueue', 'Visibility state changed to ' + r.visibilityState), this.t_.jo())
      }),
      (this.mu = t))
    const n = Qo()
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
      const n = Qo()
      n &&
        typeof n.removeEventListener == 'function' &&
        n.removeEventListener('visibilitychange', this.Vu)
    }
  }
  enqueue(t) {
    if ((this.fu(), this.Iu)) return new Promise(() => {})
    const n = new In()
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
        if (!Us(t)) throw t
        G('AsyncQueue', 'Operation failed with retryable error: ' + t)
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
            throw (dn('INTERNAL UNHANDLED ERROR: ', s), r)
          })
          .then((r) => ((this.du = !1), r))
      )
    )
    return ((this.mu = n), n)
  }
  enqueueAfterDelay(t, n, r) {
    ;(this.fu(), this.Ru.indexOf(t) > -1 && (n = 0))
    const s = Al.createAndSchedule(this, t, n, r, (i) => this.yu(i))
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
class Cl extends mo {
  constructor(t, n, r, s) {
    ;(super(t, n, r, s),
      (this.type = 'firestore'),
      (this._queue = new lh()),
      (this._persistenceKey = (s == null ? void 0 : s.name) || '[DEFAULT]'))
  }
  async _terminate() {
    if (this._firestoreClient) {
      const t = this._firestoreClient.terminate()
      ;((this._queue = new lh(t)), (this._firestoreClient = void 0), await t)
    }
  }
}
function VT(e, t) {
  const n = typeof e == 'object' ? e : sl(),
    r = typeof e == 'string' ? e : '(default)',
    s = ro(n, 'firestore').getImmediate({ identifier: r })
  if (!s._initialized) {
    const i = kf('firestore')
    i && CT(s, ...i)
  }
  return s
}
function Wd(e) {
  if (e._terminated) throw new X(U.FAILED_PRECONDITION, 'The client has already been terminated.')
  return (e._firestoreClient || DT(e), e._firestoreClient)
}
function DT(e) {
  var t, n, r
  const s = e._freezeSettings(),
    i = (function (l, u, f, p) {
      return new sv(
        l,
        u,
        f,
        p.host,
        p.ssl,
        p.experimentalForceLongPolling,
        p.experimentalAutoDetectLongPolling,
        Hd(p.experimentalLongPollingOptions),
        p.useFetchStreams
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
    (e._firestoreClient = new AT(
      e._authCredentials,
      e._appCheckCredentials,
      e._queue,
      i,
      e._componentsProvider &&
        (function (l) {
          const u = l == null ? void 0 : l._online.build()
          return { _offline: l == null ? void 0 : l._offline.build(u), _online: u }
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
 */ class Cr {
  constructor(t) {
    this._byteString = t
  }
  static fromBase64String(t) {
    try {
      return new Cr(Jt.fromBase64String(t))
    } catch (n) {
      throw new X(U.INVALID_ARGUMENT, 'Failed to construct data from Base64 string: ' + n)
    }
  }
  static fromUint8Array(t) {
    return new Cr(Jt.fromUint8Array(t))
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
 */ class kl {
  constructor(...t) {
    for (let n = 0; n < t.length; ++n)
      if (t[n].length === 0)
        throw new X(
          U.INVALID_ARGUMENT,
          'Invalid field name at argument $(i + 1). Field names must not be empty.'
        )
    this._internalPath = new Yt(t)
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
 */ class Vl {
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
 */ class Dl {
  constructor(t, n) {
    if (!isFinite(t) || t < -90 || t > 90)
      throw new X(U.INVALID_ARGUMENT, 'Latitude must be a number between -90 and 90, but was: ' + t)
    if (!isFinite(n) || n < -180 || n > 180)
      throw new X(
        U.INVALID_ARGUMENT,
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
    return _t(this._lat, t._lat) || _t(this._long, t._long)
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
 */ class Nl {
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
 */ const NT = /^__.*__$/
class OT {
  constructor(t, n, r) {
    ;((this.data = t), (this.fieldMask = n), (this.fieldTransforms = r))
  }
  toMutation(t, n) {
    return this.fieldMask !== null
      ? new nr(t, this.data, this.fieldMask, n, this.fieldTransforms)
      : new Bs(t, this.data, n, this.fieldTransforms)
  }
}
function Gd(e) {
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
class Ol {
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
    return new Ol(
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
    return qi(t, this.settings.methodName, this.settings.ku || !1, this.path, this.settings.qu)
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
    if (Gd(this.Cu) && NT.test(t)) throw this.Bu('Document fields cannot begin and end with "__"')
  }
}
class MT {
  constructor(t, n, r) {
    ;((this.databaseId = t), (this.ignoreUndefinedProperties = n), (this.serializer = r || ho(t)))
  }
  Qu(t, n, r, s = !1) {
    return new Ol(
      { Cu: t, methodName: n, qu: r, path: Yt.emptyPath(), xu: !1, ku: s },
      this.databaseId,
      this.serializer,
      this.ignoreUndefinedProperties
    )
  }
}
function LT(e) {
  const t = e._freezeSettings(),
    n = ho(e._databaseId)
  return new MT(e._databaseId, !!t.ignoreUndefinedProperties, n)
}
function FT(e, t, n, r, s, i = {}) {
  const a = e.Qu(i.merge || i.mergeFields ? 2 : 0, t, n, s)
  Jd('Data must be an object, but it was:', a, r)
  const l = Yd(r, a)
  let u, f
  if (i.merge) ((u = new Se(a.fieldMask)), (f = a.fieldTransforms))
  else if (i.mergeFields) {
    const p = []
    for (const _ of i.mergeFields) {
      const w = UT(t, _, n)
      if (!a.contains(w))
        throw new X(
          U.INVALID_ARGUMENT,
          `Field '${w}' is specified in your field mask but missing from your input data.`
        )
      jT(p, w) || p.push(w)
    }
    ;((u = new Se(p)), (f = a.fieldTransforms.filter((_) => u.covers(_.field))))
  } else ((u = null), (f = a.fieldTransforms))
  return new OT(new be(l), u, f)
}
class Ml extends Vl {
  _toFieldTransform(t) {
    return new Cv(t.path, new Cs())
  }
  isEqual(t) {
    return t instanceof Ml
  }
}
function Qd(e, t) {
  if (Xd((e = Qn(e)))) return (Jd('Unsupported field value:', t, e), Yd(e, t))
  if (e instanceof Vl)
    return (
      (function (r, s) {
        if (!Gd(s.Cu)) throw s.Bu(`${r._methodName}() can only be used with update() and set()`)
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
        let u = Qd(l, s.Lu(a))
        ;(u == null && (u = { nullValue: 'NULL_VALUE' }), i.push(u), a++)
      }
      return { arrayValue: { values: i } }
    })(e, t)
  }
  return (function (r, s) {
    if ((r = Qn(r)) === null) return { nullValue: 'NULL_VALUE' }
    if (typeof r == 'number') return xv(s.serializer, r)
    if (typeof r == 'boolean') return { booleanValue: r }
    if (typeof r == 'string') return { stringValue: r }
    if (r instanceof Date) {
      const i = $t.fromDate(r)
      return { timestampValue: Ui(s.serializer, i) }
    }
    if (r instanceof $t) {
      const i = new $t(r.seconds, 1e3 * Math.floor(r.nanoseconds / 1e3))
      return { timestampValue: Ui(s.serializer, i) }
    }
    if (r instanceof Dl) return { geoPointValue: { latitude: r.latitude, longitude: r.longitude } }
    if (r instanceof Cr) return { bytesValue: vd(s.serializer, r._byteString) }
    if (r instanceof Re) {
      const i = s.databaseId,
        a = r.firestore._databaseId
      if (!a.isEqual(i))
        throw s.Bu(
          `Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`
        )
      return { referenceValue: gl(r.firestore._databaseId || s.databaseId, r._key.path) }
    }
    if (r instanceof Nl)
      return (function (a, l) {
        return {
          mapValue: {
            fields: {
              __type__: { stringValue: '__vector__' },
              value: {
                arrayValue: {
                  values: a.toArray().map((u) => {
                    if (typeof u != 'number')
                      throw l.Bu('VectorValues must only contain numeric values.')
                    return dl(l.serializer, u)
                  })
                }
              }
            }
          }
        }
      })(r, s)
    throw s.Bu(`Unsupported field value: ${Pl(r)}`)
  })(e, t)
}
function Yd(e, t) {
  const n = {}
  return (
    Gf(e)
      ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
      : Dr(e, (r, s) => {
          const i = Qd(s, t.Mu(r))
          i != null && (n[r] = i)
        }),
    { mapValue: { fields: n } }
  )
}
function Xd(e) {
  return !(
    typeof e != 'object' ||
    e === null ||
    e instanceof Array ||
    e instanceof Date ||
    e instanceof $t ||
    e instanceof Dl ||
    e instanceof Cr ||
    e instanceof Re ||
    e instanceof Vl ||
    e instanceof Nl
  )
}
function Jd(e, t, n) {
  if (
    !Xd(n) ||
    !(function (s) {
      return (
        typeof s == 'object' &&
        s !== null &&
        (Object.getPrototypeOf(s) === Object.prototype || Object.getPrototypeOf(s) === null)
      )
    })(n)
  ) {
    const r = Pl(n)
    throw r === 'an object' ? t.Bu(e + ' a custom object') : t.Bu(e + ' ' + r)
  }
}
function UT(e, t, n) {
  if ((t = Qn(t)) instanceof kl) return t._internalPath
  if (typeof t == 'string') return Zd(e, t)
  throw qi('Field path arguments must be of type string or ', e, !1, void 0, n)
}
const BT = new RegExp('[~\\*/\\[\\]]')
function Zd(e, t, n) {
  if (t.search(BT) >= 0)
    throw qi(
      `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
      e,
      !1,
      void 0,
      n
    )
  try {
    return new kl(...t.split('.'))._internalPath
  } catch {
    throw qi(
      `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      e,
      !1,
      void 0,
      n
    )
  }
}
function qi(e, t, n, r, s) {
  const i = r && !r.isEmpty(),
    a = s !== void 0
  let l = `Function ${t}() called with invalid data`
  ;(n && (l += ' (via `toFirestore()`)'), (l += '. '))
  let u = ''
  return (
    (i || a) &&
      ((u += ' (found'), i && (u += ` in field ${r}`), a && (u += ` in document ${s}`), (u += ')')),
    new X(U.INVALID_ARGUMENT, l + e + u)
  )
}
function jT(e, t) {
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
 */ class tp {
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
    return new Re(this._firestore, this._converter, this._key)
  }
  exists() {
    return this._document !== null
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const t = new $T(this._firestore, this._userDataWriter, this._key, this._document, null)
        return this._converter.fromFirestore(t)
      }
      return this._userDataWriter.convertValue(this._document.data.value)
    }
  }
  get(t) {
    if (this._document) {
      const n = this._document.data.field(ep('DocumentSnapshot.get', t))
      if (n !== null) return this._userDataWriter.convertValue(n)
    }
  }
}
class $T extends tp {
  data() {
    return super.data()
  }
}
function ep(e, t) {
  return typeof t == 'string'
    ? Zd(e, t)
    : t instanceof kl
      ? t._internalPath
      : t._delegate._internalPath
}
class qT {
  convertValue(t, n = 'none') {
    switch (Zn(t)) {
      case 0:
        return null
      case 1:
        return t.booleanValue
      case 2:
        return Mt(t.integerValue || t.doubleValue)
      case 3:
        return this.convertTimestamp(t.timestampValue)
      case 4:
        return this.convertServerTimestamp(t, n)
      case 5:
        return t.stringValue
      case 6:
        return this.convertBytes(Jn(t.bytesValue))
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
      Dr(t, (s, i) => {
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
        : s.map((a) => Mt(a.doubleValue))
    return new Nl(i)
  }
  convertGeoPoint(t) {
    return new Dl(Mt(t.latitude), Mt(t.longitude))
  }
  convertArray(t, n) {
    return (t.values || []).map((r) => this.convertValue(r, n))
  }
  convertServerTimestamp(t, n) {
    switch (n) {
      case 'previous':
        const r = ll(t)
        return r == null ? null : this.convertValue(r, n)
      case 'estimate':
        return this.convertTimestamp(xs(t))
      default:
        return null
    }
  }
  convertTimestamp(t) {
    const n = Vn(t)
    return new $t(n.seconds, n.nanos)
  }
  convertDocumentKey(t, n) {
    const r = Pt.fromString(t)
    Tt(Id(r))
    const s = new Ps(r.get(1), r.get(3)),
      i = new Z(r.popFirst(5))
    return (
      s.isEqual(n) ||
        dn(
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
 */ function KT(e, t, n) {
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
 */ class HT {
  constructor(t, n) {
    ;((this.hasPendingWrites = t), (this.fromCache = n))
  }
  isEqual(t) {
    return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache
  }
}
class np extends tp {
  constructor(t, n, r, s, i, a) {
    ;(super(t, n, r, s, a), (this._firestore = t), (this._firestoreImpl = t), (this.metadata = i))
  }
  exists() {
    return super.exists()
  }
  data(t = {}) {
    if (this._document) {
      if (this._converter) {
        const n = new zT(
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
      const r = this._document.data.field(ep('DocumentSnapshot.get', t))
      if (r !== null) return this._userDataWriter.convertValue(r, n.serverTimestamps)
    }
  }
}
class zT extends np {
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
 */ function Xo(e) {
  e = $i(e, Re)
  const t = $i(e.firestore, Cl)
  return PT(Wd(t), e._key).then((n) => YT(t, e, n))
}
class WT extends qT {
  constructor(t) {
    ;(super(), (this.firestore = t))
  }
  convertBytes(t) {
    return new Cr(t)
  }
  convertReference(t) {
    const n = this.convertDocumentKey(t, this.firestore._databaseId)
    return new Re(this.firestore, null, n)
  }
}
function GT(e, t) {
  const n = $i(e.firestore, Cl),
    r = Ri(e),
    s = KT(e.converter, t)
  return QT(n, [
    FT(LT(e.firestore), 'addDoc', r._key, s, e.converter !== null, {}).toMutation(
      r._key,
      ln.exists(!1)
    )
  ]).then(() => r)
}
function QT(e, t) {
  return (function (r, s) {
    const i = new In()
    return (r.asyncQueue.enqueueAndForget(async () => mT(await RT(r), s, i)), i.promise)
  })(Wd(e), t)
}
function YT(e, t, n) {
  const r = n.docs.get(t._key),
    s = new WT(e)
  return new np(e, s, t._key, r, new HT(n.hasPendingWrites, n.fromCache), t.converter)
}
function XT() {
  return new Ml('serverTimestamp')
}
;(function (t, n = !0) {
  ;((function (s) {
    Vr = s
  })(Mf),
    Yn(
      new Cn(
        'firestore',
        (r, { instanceIdentifier: s, options: i }) => {
          const a = r.getProvider('app').getImmediate(),
            l = new Cl(
              new qy(r.getProvider('auth-internal')),
              new Wy(r.getProvider('app-check-internal')),
              (function (f, p) {
                if (!Object.prototype.hasOwnProperty.apply(f.options, ['projectId']))
                  throw new X(
                    U.INVALID_ARGUMENT,
                    '"projectId" not provided in firebase.initializeApp.'
                  )
                return new Ps(f.options.projectId, p)
              })(a, s),
              a
            )
          return ((i = Object.assign({ useFetchStreams: n }, i)), l._setSettings(i), l)
        },
        'PUBLIC'
      ).setMultipleInstances(!0)
    ),
    an(xc, '4.7.3', t),
    an(xc, '4.7.3', 'esm2017'))
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
 */ const rp = 'firebasestorage.googleapis.com',
  JT = 'storageBucket',
  ZT = 120 * 1e3,
  tb = 600 * 1e3
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
 */ class Qe extends er {
  constructor(t, n, r = 0) {
    ;(super(Jo(t), `Firebase Storage: ${n} (${Jo(t)})`),
      (this.status_ = r),
      (this.customData = { serverResponse: null }),
      (this._baseMessage = this.message),
      Object.setPrototypeOf(this, Qe.prototype))
  }
  get status() {
    return this.status_
  }
  set status(t) {
    this.status_ = t
  }
  _codeEquals(t) {
    return Jo(t) === this.code
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
var Ge
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
})(Ge || (Ge = {}))
function Jo(e) {
  return 'storage/' + e
}
function eb() {
  const e = 'An unknown error occurred, please check the error payload for server response.'
  return new Qe(Ge.UNKNOWN, e)
}
function nb() {
  return new Qe(Ge.RETRY_LIMIT_EXCEEDED, 'Max retry time for operation exceeded, please try again.')
}
function rb() {
  return new Qe(Ge.CANCELED, 'User canceled the upload/download.')
}
function sb(e) {
  return new Qe(Ge.INVALID_URL, "Invalid URL '" + e + "'.")
}
function ib(e) {
  return new Qe(Ge.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + e + "'.")
}
function uh(e) {
  return new Qe(Ge.INVALID_ARGUMENT, e)
}
function sp() {
  return new Qe(Ge.APP_DELETED, 'The Firebase app was deleted.')
}
function ob(e) {
  return new Qe(
    Ge.INVALID_ROOT_OPERATION,
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
 */ class Ce {
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
      r = Ce.makeFromUrl(t, n)
    } catch {
      return new Ce(t, '')
    }
    if (r.path === '') return r
    throw ib(t)
  }
  static makeFromUrl(t, n) {
    let r = null
    const s = '([A-Za-z0-9.\\-_]+)'
    function i(q) {
      q.path.charAt(q.path.length - 1) === '/' && (q.path_ = q.path_.slice(0, -1))
    }
    const a = '(/(.*))?$',
      l = new RegExp('^gs://' + s + a, 'i'),
      u = { bucket: 1, path: 3 }
    function f(q) {
      q.path_ = decodeURIComponent(q.path)
    }
    const p = 'v[A-Za-z0-9_]+',
      _ = n.replace(/[.]/g, '\\.'),
      w = '(/([^?#]*).*)?$',
      P = new RegExp(`^https?://${_}/${p}/b/${s}/o${w}`, 'i'),
      O = { bucket: 1, path: 3 },
      k = n === rp ? '(?:storage.googleapis.com|storage.cloud.google.com)' : n,
      D = '([^?#]*)',
      Q = new RegExp(`^https?://${k}/${s}/${D}`, 'i'),
      H = [
        { regex: l, indices: u, postModify: i },
        { regex: P, indices: O, postModify: f },
        { regex: Q, indices: { bucket: 1, path: 2 }, postModify: f }
      ]
    for (let q = 0; q < H.length; q++) {
      const lt = H[q],
        dt = lt.regex.exec(t)
      if (dt) {
        const A = dt[lt.indices.bucket]
        let y = dt[lt.indices.path]
        ;(y || (y = ''), (r = new Ce(A, y)), lt.postModify(r))
        break
      }
    }
    if (r == null) throw sb(t)
    return r
  }
}
class ab {
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
 */ function lb(e, t, n) {
  let r = 1,
    s = null,
    i = null,
    a = !1,
    l = 0
  function u() {
    return l === 2
  }
  let f = !1
  function p(...D) {
    f || ((f = !0), t.apply(null, D))
  }
  function _(D) {
    s = setTimeout(() => {
      ;((s = null), e(P, u()))
    }, D)
  }
  function w() {
    i && clearTimeout(i)
  }
  function P(D, ...Q) {
    if (f) {
      w()
      return
    }
    if (D) {
      ;(w(), p.call(null, D, ...Q))
      return
    }
    if (u() || a) {
      ;(w(), p.call(null, D, ...Q))
      return
    }
    r < 64 && (r *= 2)
    let H
    ;(l === 1 ? ((l = 2), (H = 0)) : (H = (r + Math.random()) * 1e3), _(H))
  }
  let O = !1
  function k(D) {
    O || ((O = !0), w(), !f && (s !== null ? (D || (l = 2), clearTimeout(s), _(0)) : D || (l = 1)))
  }
  return (
    _(0),
    (i = setTimeout(() => {
      ;((a = !0), k(!0))
    }, n)),
    k
  )
}
function ub(e) {
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
 */ function cb(e) {
  return e !== void 0
}
function ch(e, t, n, r) {
  if (r < t) throw uh(`Invalid value for '${e}'. Expected ${t} or greater.`)
  if (r > n) throw uh(`Invalid value for '${e}'. Expected ${n} or less.`)
}
function hb(e) {
  const t = encodeURIComponent
  let n = '?'
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const s = t(r) + '=' + t(e[r])
      n = n + s + '&'
    }
  return ((n = n.slice(0, -1)), n)
}
var Ki
;(function (e) {
  ;((e[(e.NO_ERROR = 0)] = 'NO_ERROR'),
    (e[(e.NETWORK_ERROR = 1)] = 'NETWORK_ERROR'),
    (e[(e.ABORT = 2)] = 'ABORT'))
})(Ki || (Ki = {}))
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
 */ function fb(e, t) {
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
 */ class db {
  constructor(t, n, r, s, i, a, l, u, f, p, _, w = !0) {
    ;((this.url_ = t),
      (this.method_ = n),
      (this.headers_ = r),
      (this.body_ = s),
      (this.successCodes_ = i),
      (this.additionalRetryCodes_ = a),
      (this.callback_ = l),
      (this.errorCallback_ = u),
      (this.timeout_ = f),
      (this.progressCallback_ = p),
      (this.connectionFactory_ = _),
      (this.retry = w),
      (this.pendingConnection_ = null),
      (this.backoffId_ = null),
      (this.canceled_ = !1),
      (this.appDelete_ = !1),
      (this.promise_ = new Promise((P, O) => {
        ;((this.resolve_ = P), (this.reject_ = O), this.start_())
      })))
  }
  start_() {
    const t = (r, s) => {
        if (s) {
          r(!1, new pi(!1, null, !0))
          return
        }
        const i = this.connectionFactory_()
        this.pendingConnection_ = i
        const a = (l) => {
          const u = l.loaded,
            f = l.lengthComputable ? l.total : -1
          this.progressCallback_ !== null && this.progressCallback_(u, f)
        }
        ;(this.progressCallback_ !== null && i.addUploadProgressListener(a),
          i.send(this.url_, this.method_, this.body_, this.headers_).then(() => {
            ;(this.progressCallback_ !== null && i.removeUploadProgressListener(a),
              (this.pendingConnection_ = null))
            const l = i.getErrorCode() === Ki.NO_ERROR,
              u = i.getStatus()
            if (!l || (fb(u, this.additionalRetryCodes_) && this.retry)) {
              const p = i.getErrorCode() === Ki.ABORT
              r(!1, new pi(!1, null, p))
              return
            }
            const f = this.successCodes_.indexOf(u) !== -1
            r(!0, new pi(f, i))
          }))
      },
      n = (r, s) => {
        const i = this.resolve_,
          a = this.reject_,
          l = s.connection
        if (s.wasSuccessCode)
          try {
            const u = this.callback_(l, l.getResponse())
            cb(u) ? i(u) : i()
          } catch (u) {
            a(u)
          }
        else if (l !== null) {
          const u = eb()
          ;((u.serverResponse = l.getErrorText()),
            this.errorCallback_ ? a(this.errorCallback_(l, u)) : a(u))
        } else if (s.canceled) {
          const u = this.appDelete_ ? sp() : rb()
          a(u)
        } else {
          const u = nb()
          a(u)
        }
      }
    this.canceled_ ? n(!1, new pi(!1, null, !0)) : (this.backoffId_ = lb(t, n, this.timeout_))
  }
  getPromise() {
    return this.promise_
  }
  cancel(t) {
    ;((this.canceled_ = !0),
      (this.appDelete_ = t || !1),
      this.backoffId_ !== null && ub(this.backoffId_),
      this.pendingConnection_ !== null && this.pendingConnection_.abort())
  }
}
class pi {
  constructor(t, n, r) {
    ;((this.wasSuccessCode = t), (this.connection = n), (this.canceled = !!r))
  }
}
function pb(e, t) {
  t !== null && t.length > 0 && (e.Authorization = 'Firebase ' + t)
}
function mb(e, t) {
  e['X-Firebase-Storage-Version'] = 'webjs/' + (t ?? 'AppManager')
}
function gb(e, t) {
  t && (e['X-Firebase-GMPID'] = t)
}
function _b(e, t) {
  t !== null && (e['X-Firebase-AppCheck'] = t)
}
function yb(e, t, n, r, s, i, a = !0) {
  const l = hb(e.urlParams),
    u = e.url + l,
    f = Object.assign({}, e.headers)
  return (
    gb(f, t),
    pb(f, n),
    mb(f, i),
    _b(f, r),
    new db(
      u,
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
 */ function vb(e) {
  if (e.length === 0) return null
  const t = e.lastIndexOf('/')
  return t === -1 ? '' : e.slice(0, t)
}
function Eb(e) {
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
 */ class Hi {
  constructor(t, n) {
    ;((this._service = t),
      n instanceof Ce ? (this._location = n) : (this._location = Ce.makeFromUrl(n, t.host)))
  }
  toString() {
    return 'gs://' + this._location.bucket + '/' + this._location.path
  }
  _newRef(t, n) {
    return new Hi(t, n)
  }
  get root() {
    const t = new Ce(this._location.bucket, '')
    return this._newRef(this._service, t)
  }
  get bucket() {
    return this._location.bucket
  }
  get fullPath() {
    return this._location.path
  }
  get name() {
    return Eb(this._location.path)
  }
  get storage() {
    return this._service
  }
  get parent() {
    const t = vb(this._location.path)
    if (t === null) return null
    const n = new Ce(this._location.bucket, t)
    return new Hi(this._service, n)
  }
  _throwIfRoot(t) {
    if (this._location.path === '') throw ob(t)
  }
}
function hh(e, t) {
  const n = t == null ? void 0 : t[JT]
  return n == null ? null : Ce.makeFromBucketSpec(n, e)
}
function Tb(e, t, n, r = {}) {
  ;((e.host = `${t}:${n}`), (e._protocol = 'http'))
  const { mockUserToken: s } = r
  s && (e._overrideAuthToken = typeof s == 'string' ? s : Df(s, e.app.options.projectId))
}
class bb {
  constructor(t, n, r, s, i) {
    ;((this.app = t),
      (this._authProvider = n),
      (this._appCheckProvider = r),
      (this._url = s),
      (this._firebaseVersion = i),
      (this._bucket = null),
      (this._host = rp),
      (this._protocol = 'https'),
      (this._appId = null),
      (this._deleted = !1),
      (this._maxOperationRetryTime = ZT),
      (this._maxUploadRetryTime = tb),
      (this._requests = new Set()),
      s != null
        ? (this._bucket = Ce.makeFromBucketSpec(s, this._host))
        : (this._bucket = hh(this._host, this.app.options)))
  }
  get host() {
    return this._host
  }
  set host(t) {
    ;((this._host = t),
      this._url != null
        ? (this._bucket = Ce.makeFromBucketSpec(this._url, t))
        : (this._bucket = hh(t, this.app.options)))
  }
  get maxUploadRetryTime() {
    return this._maxUploadRetryTime
  }
  set maxUploadRetryTime(t) {
    ;(ch('time', 0, Number.POSITIVE_INFINITY, t), (this._maxUploadRetryTime = t))
  }
  get maxOperationRetryTime() {
    return this._maxOperationRetryTime
  }
  set maxOperationRetryTime(t) {
    ;(ch('time', 0, Number.POSITIVE_INFINITY, t), (this._maxOperationRetryTime = t))
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
    return new Hi(this, t)
  }
  _makeRequest(t, n, r, s, i = !0) {
    if (this._deleted) return new ab(sp())
    {
      const a = yb(t, this._appId, r, s, n, this._firebaseVersion, i)
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
const fh = '@firebase/storage',
  dh = '0.13.2'
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
 */ const ip = 'storage'
function wb(e = sl(), t) {
  e = Qn(e)
  const r = ro(e, ip).getImmediate({ identifier: t }),
    s = kf('storage')
  return (s && Ab(r, ...s), r)
}
function Ab(e, t, n, r = {}) {
  Tb(e, t, n, r)
}
function Ib(e, { instanceIdentifier: t }) {
  const n = e.getProvider('app').getImmediate(),
    r = e.getProvider('auth-internal'),
    s = e.getProvider('app-check-internal')
  return new bb(n, r, s, t, Mf)
}
function Rb() {
  ;(Yn(new Cn(ip, Ib, 'PUBLIC').setMultipleInstances(!0)), an(fh, dh, ''), an(fh, dh, 'esm2017'))
}
Rb()
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
 */ const Va = new Map(),
  op = { activated: !1, tokenObservers: [] },
  xb = { initialized: !1, enabled: !1 }
function qt(e) {
  return Va.get(e) || Object.assign({}, op)
}
function Pb(e, t) {
  return (Va.set(e, t), Va.get(e))
}
function go() {
  return xb
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
 */ const ap = 'https://content-firebaseappcheck.googleapis.com/v1',
  Sb = 'exchangeRecaptchaV3Token',
  Cb = 'exchangeDebugToken',
  ph = { RETRIAL_MIN_WAIT: 30 * 1e3, RETRIAL_MAX_WAIT: 960 * 1e3 },
  kb = 1440 * 60 * 1e3
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
 */ class Vb {
  constructor(t, n, r, s, i) {
    if (
      ((this.operation = t),
      (this.retryPolicy = n),
      (this.getWaitDuration = r),
      (this.lowerBound = s),
      (this.upperBound = i),
      (this.pending = null),
      (this.nextErrorWaitInterval = s),
      s > i)
    )
      throw new Error('Proactive refresh lower bound greater than upper bound!')
  }
  start() {
    ;((this.nextErrorWaitInterval = this.lowerBound), this.process(!0).catch(() => {}))
  }
  stop() {
    this.pending && (this.pending.reject('cancelled'), (this.pending = null))
  }
  isRunning() {
    return !!this.pending
  }
  async process(t) {
    this.stop()
    try {
      ;((this.pending = new As()),
        this.pending.promise.catch((n) => {}),
        await Db(this.getNextRun(t)),
        this.pending.resolve(),
        await this.pending.promise,
        (this.pending = new As()),
        this.pending.promise.catch((n) => {}),
        await this.operation(),
        this.pending.resolve(),
        await this.pending.promise,
        this.process(!0).catch(() => {}))
    } catch (n) {
      this.retryPolicy(n) ? this.process(!1).catch(() => {}) : this.stop()
    }
  }
  getNextRun(t) {
    if (t) return ((this.nextErrorWaitInterval = this.lowerBound), this.getWaitDuration())
    {
      const n = this.nextErrorWaitInterval
      return (
        (this.nextErrorWaitInterval *= 2),
        this.nextErrorWaitInterval > this.upperBound &&
          (this.nextErrorWaitInterval = this.upperBound),
        n
      )
    }
  }
}
function Db(e) {
  return new Promise((t) => {
    setTimeout(t, e)
  })
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
 */ const Nb = {
    'already-initialized':
      'You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.',
    'use-before-activation':
      'App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.',
    'fetch-network-error':
      'Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.',
    'fetch-parse-error':
      'Fetch client could not parse response. Original error: {$originalErrorMessage}.',
    'fetch-status-error': 'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',
    'storage-open': 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
    'storage-get':
      'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
    'storage-set': 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
    'recaptcha-error': 'ReCAPTCHA error.',
    throttled: 'Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}'
  },
  me = new el('appCheck', 'AppCheck', Nb)
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
 */ function mh(e = !1) {
  var t
  return e
    ? (t = self.grecaptcha) === null || t === void 0
      ? void 0
      : t.enterprise
    : self.grecaptcha
}
function Ll(e) {
  if (!qt(e).activated) throw me.create('use-before-activation', { appName: e.name })
}
function lp(e) {
  const t = Math.round(e / 1e3),
    n = Math.floor(t / (3600 * 24)),
    r = Math.floor((t - n * 3600 * 24) / 3600),
    s = Math.floor((t - n * 3600 * 24 - r * 3600) / 60),
    i = t - n * 3600 * 24 - r * 3600 - s * 60
  let a = ''
  return (n && (a += mi(n) + 'd:'), r && (a += mi(r) + 'h:'), (a += mi(s) + 'm:' + mi(i) + 's'), a)
}
function mi(e) {
  return e === 0 ? '00' : e >= 10 ? e.toString() : '0' + e
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
 */ async function Fl({ url: e, body: t }, n) {
  const r = { 'Content-Type': 'application/json' },
    s = n.getImmediate({ optional: !0 })
  if (s) {
    const _ = await s.getHeartbeatsHeader()
    _ && (r['X-Firebase-Client'] = _)
  }
  const i = { method: 'POST', body: JSON.stringify(t), headers: r }
  let a
  try {
    a = await fetch(e, i)
  } catch (_) {
    throw me.create('fetch-network-error', { originalErrorMessage: _ == null ? void 0 : _.message })
  }
  if (a.status !== 200) throw me.create('fetch-status-error', { httpStatus: a.status })
  let l
  try {
    l = await a.json()
  } catch (_) {
    throw me.create('fetch-parse-error', { originalErrorMessage: _ == null ? void 0 : _.message })
  }
  const u = l.ttl.match(/^([\d.]+)(s)$/)
  if (!u || !u[2] || isNaN(Number(u[1])))
    throw me.create('fetch-parse-error', {
      originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration format: ${l.ttl}`
    })
  const f = Number(u[1]) * 1e3,
    p = Date.now()
  return { token: l.token, expireTimeMillis: p + f, issuedAtTimeMillis: p }
}
function Ob(e, t) {
  const { projectId: n, appId: r, apiKey: s } = e.options
  return { url: `${ap}/projects/${n}/apps/${r}:${Sb}?key=${s}`, body: { recaptcha_v3_token: t } }
}
function up(e, t) {
  const { projectId: n, appId: r, apiKey: s } = e.options
  return { url: `${ap}/projects/${n}/apps/${r}:${Cb}?key=${s}`, body: { debug_token: t } }
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
 */ const Mb = 'firebase-app-check-database',
  Lb = 1,
  Ds = 'firebase-app-check-store',
  cp = 'debug-token'
let gi = null
function hp() {
  return (
    gi ||
    ((gi = new Promise((e, t) => {
      try {
        const n = indexedDB.open(Mb, Lb)
        ;((n.onsuccess = (r) => {
          e(r.target.result)
        }),
          (n.onerror = (r) => {
            var s
            t(
              me.create('storage-open', {
                originalErrorMessage:
                  (s = r.target.error) === null || s === void 0 ? void 0 : s.message
              })
            )
          }),
          (n.onupgradeneeded = (r) => {
            const s = r.target.result
            switch (r.oldVersion) {
              case 0:
                s.createObjectStore(Ds, { keyPath: 'compositeKey' })
            }
          }))
      } catch (n) {
        t(me.create('storage-open', { originalErrorMessage: n == null ? void 0 : n.message }))
      }
    })),
    gi)
  )
}
function Fb(e) {
  return dp(pp(e))
}
function Ub(e, t) {
  return fp(pp(e), t)
}
function Bb(e) {
  return fp(cp, e)
}
function jb() {
  return dp(cp)
}
async function fp(e, t) {
  const r = (await hp()).transaction(Ds, 'readwrite'),
    i = r.objectStore(Ds).put({ compositeKey: e, value: t })
  return new Promise((a, l) => {
    ;((i.onsuccess = (u) => {
      a()
    }),
      (r.onerror = (u) => {
        var f
        l(
          me.create('storage-set', {
            originalErrorMessage: (f = u.target.error) === null || f === void 0 ? void 0 : f.message
          })
        )
      }))
  })
}
async function dp(e) {
  const n = (await hp()).transaction(Ds, 'readonly'),
    s = n.objectStore(Ds).get(e)
  return new Promise((i, a) => {
    ;((s.onsuccess = (l) => {
      const u = l.target.result
      i(u ? u.value : void 0)
    }),
      (n.onerror = (l) => {
        var u
        a(
          me.create('storage-get', {
            originalErrorMessage: (u = l.target.error) === null || u === void 0 ? void 0 : u.message
          })
        )
      }))
  })
}
function pp(e) {
  return `${e.options.appId}-${e.name}`
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
 */ const Ns = new nl('@firebase/app-check')
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
 */ async function $b(e) {
  if (tl()) {
    let t
    try {
      t = await Fb(e)
    } catch (n) {
      Ns.warn(`Failed to read token from IndexedDB. Error: ${n}`)
    }
    return t
  }
}
function Zo(e, t) {
  return tl()
    ? Ub(e, t).catch((n) => {
        Ns.warn(`Failed to write token to IndexedDB. Error: ${n}`)
      })
    : Promise.resolve()
}
async function qb() {
  let e
  try {
    e = await jb()
  } catch {}
  if (e) return e
  {
    const t = R_()
    return (
      Bb(t).catch((n) => Ns.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),
      t
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
 */ function Ul() {
  return go().enabled
}
async function Bl() {
  const e = go()
  if (e.enabled && e.token) return e.token.promise
  throw Error(`
            Can't get debug token in production mode.
        `)
}
function Kb() {
  const e = Cf(),
    t = go()
  if (
    ((t.initialized = !0),
    typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN != 'string' && e.FIREBASE_APPCHECK_DEBUG_TOKEN !== !0)
  )
    return
  t.enabled = !0
  const n = new As()
  ;((t.token = n),
    typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN == 'string'
      ? n.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN)
      : n.resolve(qb()))
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
 */ const Hb = { error: 'UNKNOWN_ERROR' }
function zb(e) {
  return Ja.encodeString(JSON.stringify(e), !1)
}
async function Da(e, t = !1) {
  const n = e.app
  Ll(n)
  const r = qt(n)
  let s = r.token,
    i
  if ((s && !mr(s) && ((r.token = void 0), (s = void 0)), !s)) {
    const u = await r.cachedTokenPromise
    u && (mr(u) ? (s = u) : await Zo(n, void 0))
  }
  if (!t && s && mr(s)) return { token: s.token }
  let a = !1
  if (Ul()) {
    r.exchangeTokenPromise ||
      ((r.exchangeTokenPromise = Fl(up(n, await Bl()), e.heartbeatServiceProvider).finally(() => {
        r.exchangeTokenPromise = void 0
      })),
      (a = !0))
    const u = await r.exchangeTokenPromise
    return (await Zo(n, u), (r.token = u), { token: u.token })
  }
  try {
    ;(r.exchangeTokenPromise ||
      ((r.exchangeTokenPromise = r.provider.getToken().finally(() => {
        r.exchangeTokenPromise = void 0
      })),
      (a = !0)),
      (s = await qt(n).exchangeTokenPromise))
  } catch (u) {
    ;(u.code === 'appCheck/throttled' ? Ns.warn(u.message) : Ns.error(u), (i = u))
  }
  let l
  return (
    s
      ? i
        ? mr(s)
          ? (l = { token: s.token, internalError: i })
          : (l = _h(i))
        : ((l = { token: s.token }), (r.token = s), await Zo(n, s))
      : (l = _h(i)),
    a && _p(n, l),
    l
  )
}
async function Wb(e) {
  const t = e.app
  Ll(t)
  const { provider: n } = qt(t)
  if (Ul()) {
    const r = await Bl(),
      { token: s } = await Fl(up(t, r), e.heartbeatServiceProvider)
    return { token: s }
  } else {
    const { token: r } = await n.getToken()
    return { token: r }
  }
}
function mp(e, t, n, r) {
  const { app: s } = e,
    i = qt(s),
    a = { next: n, error: r, type: t }
  if (((i.tokenObservers = [...i.tokenObservers, a]), i.token && mr(i.token))) {
    const l = i.token
    Promise.resolve()
      .then(() => {
        ;(n({ token: l.token }), gh(e))
      })
      .catch(() => {})
  }
  i.cachedTokenPromise.then(() => gh(e))
}
function gp(e, t) {
  const n = qt(e),
    r = n.tokenObservers.filter((s) => s.next !== t)
  ;(r.length === 0 && n.tokenRefresher && n.tokenRefresher.isRunning() && n.tokenRefresher.stop(),
    (n.tokenObservers = r))
}
function gh(e) {
  const { app: t } = e,
    n = qt(t)
  let r = n.tokenRefresher
  ;(r || ((r = Gb(e)), (n.tokenRefresher = r)),
    !r.isRunning() && n.isTokenAutoRefreshEnabled && r.start())
}
function Gb(e) {
  const { app: t } = e
  return new Vb(
    async () => {
      const n = qt(t)
      let r
      if ((n.token ? (r = await Da(e, !0)) : (r = await Da(e)), r.error)) throw r.error
      if (r.internalError) throw r.internalError
    },
    () => !0,
    () => {
      const n = qt(t)
      if (n.token) {
        let r =
          n.token.issuedAtTimeMillis +
          (n.token.expireTimeMillis - n.token.issuedAtTimeMillis) * 0.5 +
          3e5
        const s = n.token.expireTimeMillis - 300 * 1e3
        return ((r = Math.min(r, s)), Math.max(0, r - Date.now()))
      } else return 0
    },
    ph.RETRIAL_MIN_WAIT,
    ph.RETRIAL_MAX_WAIT
  )
}
function _p(e, t) {
  const n = qt(e).tokenObservers
  for (const r of n)
    try {
      r.type === 'EXTERNAL' && t.error != null ? r.error(t.error) : r.next(t)
    } catch {}
}
function mr(e) {
  return e.expireTimeMillis - Date.now() > 0
}
function _h(e) {
  return { token: zb(Hb), error: e }
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
 */ class Qb {
  constructor(t, n) {
    ;((this.app = t), (this.heartbeatServiceProvider = n))
  }
  _delete() {
    const { tokenObservers: t } = qt(this.app)
    for (const n of t) gp(this.app, n.next)
    return Promise.resolve()
  }
}
function Yb(e, t) {
  return new Qb(e, t)
}
function Xb(e) {
  return {
    getToken: (t) => Da(e, t),
    getLimitedUseToken: () => Wb(e),
    addTokenListener: (t) => mp(e, 'INTERNAL', t),
    removeTokenListener: (t) => gp(e.app, t)
  }
}
const Jb = '@firebase/app-check',
  Zb = '0.8.8'
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
 */ const tw = 'https://www.google.com/recaptcha/api.js'
function ew(e, t) {
  const n = new As(),
    r = qt(e)
  r.reCAPTCHAState = { initialized: n }
  const s = nw(e),
    i = mh(!1)
  return (
    i
      ? yh(e, t, i, s, n)
      : iw(() => {
          const a = mh(!1)
          if (!a) throw new Error('no recaptcha')
          yh(e, t, a, s, n)
        }),
    n.promise
  )
}
function yh(e, t, n, r, s) {
  n.ready(() => {
    ;(sw(e, t, n, r), s.resolve(n))
  })
}
function nw(e) {
  const t = `fire_app_check_${e.name}`,
    n = document.createElement('div')
  return ((n.id = t), (n.style.display = 'none'), document.body.appendChild(n), t)
}
async function rw(e) {
  Ll(e)
  const n = await qt(e).reCAPTCHAState.initialized.promise
  return new Promise((r, s) => {
    const i = qt(e).reCAPTCHAState
    n.ready(() => {
      r(n.execute(i.widgetId, { action: 'fire_app_check' }))
    })
  })
}
function sw(e, t, n, r) {
  const s = n.render(r, {
      sitekey: t,
      size: 'invisible',
      callback: () => {
        qt(e).reCAPTCHAState.succeeded = !0
      },
      'error-callback': () => {
        qt(e).reCAPTCHAState.succeeded = !1
      }
    }),
    i = qt(e)
  i.reCAPTCHAState = Object.assign(Object.assign({}, i.reCAPTCHAState), { widgetId: s })
}
function iw(e) {
  const t = document.createElement('script')
  ;((t.src = tw), (t.onload = e), document.head.appendChild(t))
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
 */ class jl {
  constructor(t) {
    ;((this._siteKey = t), (this._throttleData = null))
  }
  async getToken() {
    var t, n, r
    aw(this._throttleData)
    const s = await rw(this._app).catch((a) => {
      throw me.create('recaptcha-error')
    })
    if (!(!((t = qt(this._app).reCAPTCHAState) === null || t === void 0) && t.succeeded))
      throw me.create('recaptcha-error')
    let i
    try {
      i = await Fl(Ob(this._app, s), this._heartbeatServiceProvider)
    } catch (a) {
      throw !((n = a.code) === null || n === void 0) && n.includes('fetch-status-error')
        ? ((this._throttleData = ow(
            Number((r = a.customData) === null || r === void 0 ? void 0 : r.httpStatus),
            this._throttleData
          )),
          me.create('throttled', {
            time: lp(this._throttleData.allowRequestsAfter - Date.now()),
            httpStatus: this._throttleData.httpStatus
          }))
        : a
    }
    return ((this._throttleData = null), i)
  }
  initialize(t) {
    ;((this._app = t),
      (this._heartbeatServiceProvider = ro(t, 'heartbeat')),
      ew(t, this._siteKey).catch(() => {}))
  }
  isEqual(t) {
    return t instanceof jl ? this._siteKey === t._siteKey : !1
  }
}
function ow(e, t) {
  if (e === 404 || e === 403)
    return { backoffCount: 1, allowRequestsAfter: Date.now() + kb, httpStatus: e }
  {
    const n = t ? t.backoffCount : 0,
      r = k_(n, 1e3, 2)
    return { backoffCount: n + 1, allowRequestsAfter: Date.now() + r, httpStatus: e }
  }
}
function aw(e) {
  if (e && Date.now() - e.allowRequestsAfter <= 0)
    throw me.create('throttled', {
      time: lp(e.allowRequestsAfter - Date.now()),
      httpStatus: e.httpStatus
    })
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
 */ function lw(e = sl(), t) {
  e = Qn(e)
  const n = ro(e, 'app-check')
  if (
    (go().initialized || Kb(),
    Ul() &&
      Bl().then((s) =>
        console.log(
          `App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`
        )
      ),
    n.isInitialized())
  ) {
    const s = n.getImmediate(),
      i = n.getOptions()
    if (
      i.isTokenAutoRefreshEnabled === t.isTokenAutoRefreshEnabled &&
      i.provider.isEqual(t.provider)
    )
      return s
    throw me.create('already-initialized', { appName: e.name })
  }
  const r = n.initialize({ options: t })
  return (
    uw(e, t.provider, t.isTokenAutoRefreshEnabled),
    qt(e).isTokenAutoRefreshEnabled && mp(r, 'INTERNAL', () => {}),
    r
  )
}
function uw(e, t, n) {
  const r = Pb(e, Object.assign({}, op))
  ;((r.activated = !0),
    (r.provider = t),
    (r.cachedTokenPromise = $b(e).then(
      (s) => (s && mr(s) && ((r.token = s), _p(e, { token: s.token })), s)
    )),
    (r.isTokenAutoRefreshEnabled = n === void 0 ? e.automaticDataCollectionEnabled : n),
    r.provider.initialize(e))
}
const cw = 'app-check',
  vh = 'app-check-internal'
function hw() {
  ;(Yn(
    new Cn(
      cw,
      (e) => {
        const t = e.getProvider('app').getImmediate(),
          n = e.getProvider('heartbeat')
        return Yb(t, n)
      },
      'PUBLIC'
    )
      .setInstantiationMode('EXPLICIT')
      .setInstanceCreatedCallback((e, t, n) => {
        e.getProvider(vh).initialize()
      })
  ),
    Yn(
      new Cn(
        vh,
        (e) => {
          const t = e.getProvider('app-check').getImmediate()
          return Xb(t)
        },
        'PUBLIC'
      ).setInstantiationMode('EXPLICIT')
    ),
    an(Jb, Zb))
}
hw()
const fw = {
    apiKey: 'AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE',
    authDomain: 'portal-mambaul-ulum.firebaseapp.com',
    projectId: 'portal-mambaul-ulum',
    storageBucket: 'portal-mambaul-ulum.firebasestorage.app',
    messagingSenderId: '289365012301',
    appId: '1:289365012301:web:c5b2655559043783221104',
    measurementId: 'G-59LNXJ9MVH'
  },
  $l = Lf(fw)
try {
  const e = '6Ld1GRMtAAAAAB50imwqPEJ7hEMf4LlZaTY8cFAk'
  e &&
    typeof location < 'u' &&
    /^https?:$/.test(location.protocol) &&
    lw($l, { provider: new jl(e), isTokenAutoRefreshEnabled: !0 })
} catch {}
const _i = VT($l)
wb($l)
const dw = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, s] of t) n[r] = s
    return n
  },
  pw = { class: 'p-4 md:p-6 min-h-screen' },
  mw = { class: 'max-w-4xl mx-auto space-y-4' },
  gw = { class: 'bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md' },
  _w = { class: 'flex items-center gap-4 border-b-2 border-double border-slate-700 pb-3 mb-3' },
  yw = ['src'],
  vw = ['src'],
  Ew = { class: 'flex flex-wrap items-center justify-between gap-2 mt-3 text-xs' },
  Tw = { class: 'font-bold text-slate-700' },
  bw = { class: 'text-teal-700' },
  ww = {
    key: 0,
    class: 'bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center'
  },
  Aw = { class: 'text-3xl font-black text-teal-600 my-3 tracking-wider' },
  Iw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-teal-300' },
  Rw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  xw = ['value'],
  Pw = ['value'],
  Sw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-200' },
  Cw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  kw = { class: 'md:col-span-2' },
  Vw = { class: 'flex gap-4 mt-2' },
  Dw = { class: 'flex items-center gap-1.5 text-sm font-bold text-slate-700' },
  Nw = { class: 'flex items-center gap-1.5 text-sm font-bold text-slate-700' },
  Ow = { class: 'md:col-span-2' },
  Mw = {
    class: 'md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-50'
  },
  Lw = { class: 'md:col-span-2' },
  Fw = { class: 'bg-white rounded-2xl p-6 shadow-sm border-2 border-emerald-200' },
  Uw = { class: 'space-y-6' },
  Bw = { class: 'p-4 bg-emerald-50 rounded-2xl border border-emerald-100' },
  jw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  $w = { class: 'md:col-span-2' },
  qw = ['value'],
  Kw = { class: 'md:col-span-2' },
  Hw = { class: 'p-4 bg-pink-50 rounded-2xl border border-pink-100' },
  zw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  Ww = { class: 'md:col-span-2' },
  Gw = ['value'],
  Qw = { class: 'md:col-span-2' },
  Yw = { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
  Xw = ['value'],
  Jw = { class: 'md:col-span-2' },
  Zw = {
    class: 'bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center'
  },
  t0 = ['disabled'],
  e0 = {
    key: 0,
    class:
      'mt-4 text-xs font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100'
  },
  n0 = {
    class:
      'bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl'
  },
  r0 = { class: 'flex items-center justify-between p-5 border-b border-slate-100' },
  s0 = { class: 'flex-1 overflow-y-auto p-5 space-y-4 text-left' },
  i0 = { key: 0, class: 'bg-slate-50 rounded-2xl p-4 border border-slate-100' },
  o0 = ['src'],
  a0 = ['href'],
  l0 = { key: 2, class: 'text-sm text-slate-700 whitespace-pre-wrap leading-relaxed' },
  u0 = { key: 1, class: 'bg-emerald-50 rounded-2xl p-4 border border-emerald-100' },
  c0 = ['src'],
  h0 = ['href'],
  f0 = { key: 2, class: 'text-sm text-slate-700 whitespace-pre-wrap leading-relaxed' },
  d0 = { key: 2, class: 'text-xs text-slate-400 text-center py-2' },
  p0 = { class: 'flex items-start gap-3 cursor-pointer pt-1' },
  m0 = {
    key: 3,
    class: 'text-xs font-black text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100'
  },
  g0 = { class: 'p-5 border-t border-slate-100 flex gap-3' },
  _0 = ['disabled'],
  y0 = {
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
        s = Te(D()),
        i = Te(!1),
        a = Te(!1),
        l = Te(''),
        u = Te(''),
        f = Te(!1),
        p = Te(!1),
        _ = Te({}),
        w = Te([]),
        P = Te(''),
        O = Te(''),
        k = Te('')
      function D() {
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
      const Q = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH'],
        W = ca(() => {
          const v = w.value
            .filter((d) => Q.some((g) => g.toLowerCase() === String(d.lembaga || '').toLowerCase()))
            .map((d) => d.lembaga)
          return v.length > 0 ? v : Q
        }),
        H = ca(() => {
          var v
          return ((v = _.value) == null ? void 0 : v[s.value.lembaga_qiraati]) || {}
        })
      function q(v) {
        const d = String(v || '')
        return /^data:image\//i.test(d) || /\.(png|jpe?g|gif|webp|svg)(\?|#|$)/i.test(d)
      }
      function lt(v) {
        return /^(https?:|data:)/i.test(String(v || ''))
      }
      function dt() {
        l.value = ''
        const v = String(s.value.nama || '').trim()
        if (!v) {
          ;((l.value = 'Nama santri wajib diisi'), window.scrollTo({ top: 0, behavior: 'smooth' }))
          return
        }
        if (v.length > 200) {
          l.value = 'Nama santri maks 200 karakter'
          return
        }
        if (!s.value.lembaga_qiraati) {
          ;((l.value = 'Lembaga Qiraati wajib dipilih'),
            window.scrollTo({ top: 0, behavior: 'smooth' }))
          return
        }
        if (!s.value.tipe_santri) {
          l.value = 'Tipe santri wajib dipilih'
          return
        }
        ;((f.value = !1), (p.value = !0))
      }
      async function A() {
        if (((l.value = ''), !f.value)) {
          l.value = 'Mohon setujui syarat & ketentuan'
          return
        }
        const v = String(s.value.nama || '').trim()
        if (!v) {
          ;((l.value = 'Nama santri wajib diisi'), window.scrollTo({ top: 0, behavior: 'smooth' }))
          return
        }
        if (v.length > 200) {
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
          const d = 'PSB-' + Date.now(),
            g = {
              no_pendaftaran: d,
              ...s.value,
              nama: v,
              lembaga_tujuan: s.value.lembaga_qiraati,
              is_mukim: s.value.tipe_santri === 'mahad',
              is_fullday: s.value.tipe_santri === 'fullday',
              tahunAjaran: k.value,
              status: 'pending',
              created_at: XT()
            }
          ;(await GT(kT(_i, 'psb_pendaftaran'), g),
            (u.value = d),
            (i.value = !0),
            (p.value = !1),
            window.scrollTo({ top: 0, behavior: 'smooth' }))
        } catch (d) {
          console.error('[onSubmit]', d)
          const g = String((d == null ? void 0 : d.message) || '')
          ;(g.includes('permission-denied')
            ? (l.value = 'Akses Firestore ditolak. Hubungi admin pondok.')
            : g.includes('unavailable') || g.includes('network')
              ? (l.value = 'Koneksi internet bermasalah. Coba lagi.')
              : (l.value = 'Gagal kirim pendaftaran: ' + (g || 'unknown error')),
            window.scrollTo({ top: 0, behavior: 'smooth' }))
        } finally {
          a.value = !1
        }
      }
      function y() {
        ;((s.value = D()), (i.value = !1), (u.value = ''), (l.value = ''), (f.value = !1))
      }
      return (
        ef(async () => {
          var g
          const v = new Date().getFullYear(),
            d = new Date().getMonth() + 1
          k.value = d >= 7 ? `${v}/${v + 1}` : `${v - 1}/${v}`
          try {
            const R = await Xo(Ri(_i, 'master', 'lembaga'))
            w.value = Array.isArray((g = R.data()) == null ? void 0 : g.list) ? R.data().list : []
          } catch {}
          try {
            const R = await Xo(Ri(_i, 'settings', 'psb_assets'))
            _.value = R.exists() ? R.data() || {} : {}
          } catch {}
          try {
            const T = (await Xo(Ri(_i, 'settings', 'general'))).data() || {}
            ;((P.value = T.logoQiraati || ''), (O.value = T.logoKop || T.logoUrl || ''))
          } catch {}
        }),
        (v, d) => (
          Ct(),
          Ot('div', pw, [
            I('div', mw, [
              I('div', gw, [
                I('div', _w, [
                  I(
                    'img',
                    {
                      src: P.value || '/logo.png',
                      alt: 'Logo Qiraati',
                      class: 'w-20 h-20 flex-shrink-0 object-contain'
                    },
                    null,
                    8,
                    yw
                  ),
                  d[35] ||
                    (d[35] = Ag(
                      '<div class="flex-1 text-center" data-v-cc654cf8><p class="text-[10px] font-bold uppercase tracking-wider text-slate-700" data-v-cc654cf8> YAYASAN AL MANSHUR </p><h1 class="text-base md:text-xl font-black text-slate-900 uppercase tracking-wide" data-v-cc654cf8> PONDOK PESANTREN MAMBAUL ULUM </h1><p class="text-[10px] text-slate-600 mt-0.5" data-v-cc654cf8> Jalan Kolonel Sugiono, 112. Panjunan Waru Sidoarjo (61256). </p><p class="text-[10px] text-slate-600" data-v-cc654cf8>Telp. (031) 8674713 / 082233902261</p></div>',
                      1
                    )),
                  I(
                    'img',
                    {
                      src: O.value || '/logo.png',
                      alt: 'Logo Pondok',
                      class: 'w-20 h-20 flex-shrink-0 object-contain'
                    },
                    null,
                    8,
                    vw
                  )
                ]),
                d[38] ||
                  (d[38] = I(
                    'h2',
                    {
                      class:
                        'text-center text-base md:text-lg font-black uppercase text-slate-800 underline decoration-2 underline-offset-4'
                    },
                    ' FORMULIR PENDAFTARAN SANTRI BARU ',
                    -1
                  )),
                I('div', Ew, [
                  I('p', Tw, [
                    d[36] || (d[36] = Dt(' Tahun Ajaran: ', -1)),
                    I('span', bw, fe(k.value), 1)
                  ]),
                  d[37] ||
                    (d[37] = I(
                      'p',
                      { class: 'font-bold text-slate-700' },
                      [
                        Dt(' No. Pendaftaran: '),
                        I(
                          'span',
                          { class: 'font-mono text-slate-400 italic' },
                          '(otomatis setelah submit)'
                        )
                      ],
                      -1
                    ))
                ]),
                d[39] ||
                  (d[39] = I(
                    'p',
                    { class: 'text-[10px] text-rose-500 italic mt-2 text-center' },
                    ' * Isi sesuai akte kelahiran / kartu keluarga ',
                    -1
                  ))
              ]),
              i.value
                ? (Ct(),
                  Ot('div', ww, [
                    d[41] ||
                      (d[41] = I(
                        'i',
                        { class: 'fas fa-check-circle text-emerald-500 text-6xl mb-3' },
                        null,
                        -1
                      )),
                    d[42] ||
                      (d[42] = I(
                        'h2',
                        { class: 'text-lg font-black text-emerald-700' },
                        'Pendaftaran Berhasil!',
                        -1
                      )),
                    d[43] ||
                      (d[43] = I(
                        'p',
                        { class: 'text-sm text-slate-600 mt-2' },
                        'No. Pendaftaran Anda:',
                        -1
                      )),
                    I('p', Aw, fe(u.value), 1),
                    d[44] ||
                      (d[44] = I(
                        'p',
                        { class: 'text-xs text-slate-500' },
                        ' Simpan nomor di atas. Admin akan menghubungi via WhatsApp. ',
                        -1
                      )),
                    I(
                      'button',
                      {
                        onClick: y,
                        class:
                          'mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition'
                      },
                      [
                        ...(d[40] ||
                          (d[40] = [
                            I('i', { class: 'fas fa-plus mr-1' }, null, -1),
                            Dt('Daftarkan Lagi ', -1)
                          ]))
                      ]
                    )
                  ]))
                : (Ct(),
                  Ot(
                    'form',
                    { key: 1, onSubmit: pc(dt, ['prevent']), class: 'space-y-6' },
                    [
                      I('div', Iw, [
                        d[48] ||
                          (d[48] = I(
                            'h3',
                            {
                              class:
                                'text-xs font-black text-teal-800 uppercase tracking-widest mb-4 flex items-center gap-2'
                            },
                            [
                              I(
                                'span',
                                {
                                  class:
                                    'w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]'
                                },
                                '1'
                              ),
                              Dt(' Pilihan Lembaga & Tipe ')
                            ],
                            -1
                          )),
                        I('div', Rw, [
                          I('div', null, [
                            d[46] ||
                              (d[46] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Lembaga Qiraati *',
                                -1
                              )),
                            gt(
                              I(
                                'select',
                                {
                                  'onUpdate:modelValue':
                                    d[0] || (d[0] = (g) => (s.value.lembaga_qiraati = g)),
                                  required: '',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                                },
                                [
                                  d[45] ||
                                    (d[45] = I('option', { value: '' }, '-- Pilih Qiraati --', -1)),
                                  (Ct(!0),
                                  Ot(
                                    pe,
                                    null,
                                    Jr(
                                      W.value,
                                      (g) => (
                                        Ct(),
                                        Ot('option', { key: g, value: g }, fe(g), 9, xw)
                                      )
                                    ),
                                    128
                                  ))
                                ],
                                512
                              ),
                              [[ts, s.value.lembaga_qiraati]]
                            )
                          ]),
                          I('div', null, [
                            d[47] ||
                              (d[47] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tipe Santri *',
                                -1
                              )),
                            gt(
                              I(
                                'select',
                                {
                                  'onUpdate:modelValue':
                                    d[1] || (d[1] = (g) => (s.value.tipe_santri = g)),
                                  required: '',
                                  class:
                                    'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none'
                                },
                                [
                                  (Ct(),
                                  Ot(
                                    pe,
                                    null,
                                    Jr(t, (g) =>
                                      I(
                                        'option',
                                        { key: g.value, value: g.value },
                                        fe(g.label),
                                        9,
                                        Pw
                                      )
                                    ),
                                    64
                                  ))
                                ],
                                512
                              ),
                              [[ts, s.value.tipe_santri]]
                            )
                          ])
                        ])
                      ]),
                      I('div', Sw, [
                        d[64] ||
                          (d[64] = I(
                            'h3',
                            {
                              class:
                                'text-sm font-black text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-blue-100 pb-2'
                            },
                            [
                              I(
                                'span',
                                {
                                  class:
                                    'w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black'
                                },
                                'I'
                              ),
                              Dt(' Identitas Santri ')
                            ],
                            -1
                          )),
                        I('div', Cw, [
                          I('div', kw, [
                            d[49] ||
                              (d[49] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Nama Lengkap *',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue': d[2] || (d[2] = (g) => (s.value.nama = g)),
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
                          I('div', null, [
                            d[50] ||
                              (d[50] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Nama Panggilan',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    d[3] || (d[3] = (g) => (s.value.nama_panggilan = g)),
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
                          I('div', null, [
                            d[53] ||
                              (d[53] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Jenis Kelamin *',
                                -1
                              )),
                            I('div', Vw, [
                              I('label', Dw, [
                                gt(
                                  I(
                                    'input',
                                    {
                                      type: 'radio',
                                      'onUpdate:modelValue':
                                        d[4] || (d[4] = (g) => (s.value.jk = g)),
                                      value: 'L',
                                      required: '',
                                      class: 'w-4 h-4'
                                    },
                                    null,
                                    512
                                  ),
                                  [[fc, s.value.jk]]
                                ),
                                d[51] || (d[51] = Dt(' Laki-laki', -1))
                              ]),
                              I('label', Nw, [
                                gt(
                                  I(
                                    'input',
                                    {
                                      type: 'radio',
                                      'onUpdate:modelValue':
                                        d[5] || (d[5] = (g) => (s.value.jk = g)),
                                      value: 'P',
                                      class: 'w-4 h-4'
                                    },
                                    null,
                                    512
                                  ),
                                  [[fc, s.value.jk]]
                                ),
                                d[52] || (d[52] = Dt(' Perempuan', -1))
                              ])
                            ])
                          ]),
                          I('div', null, [
                            d[54] ||
                              (d[54] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'NIK Santri (16 Digit)',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue': d[6] || (d[6] = (g) => (s.value.nik = g)),
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
                          I('div', null, [
                            d[55] ||
                              (d[55] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'No. Kartu Keluarga (KK)',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    d[7] || (d[7] = (g) => (s.value.no_kk = g)),
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
                          I('div', null, [
                            d[56] ||
                              (d[56] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tempat Lahir *',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    d[8] || (d[8] = (g) => (s.value.tempat_lahir = g)),
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
                          I('div', null, [
                            d[57] ||
                              (d[57] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Tanggal Lahir *',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    d[9] || (d[9] = (g) => (s.value.tgl_lahir = g)),
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
                          I('div', Ow, [
                            d[58] ||
                              (d[58] = I(
                                'label',
                                {
                                  class:
                                    'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                },
                                'Asal Sekolah Sebelumnya',
                                -1
                              )),
                            gt(
                              I(
                                'input',
                                {
                                  'onUpdate:modelValue':
                                    d[10] || (d[10] = (g) => (s.value.asal_sekolah = g)),
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
                          I('div', Mw, [
                            I('div', Lw, [
                              d[59] ||
                                (d[59] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Alamat (Jl. / Dusun) *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[11] || (d[11] = (g) => (s.value.alamat_dusun = g)),
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
                            I('div', null, [
                              d[60] ||
                                (d[60] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Desa / Kelurahan *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[12] || (d[12] = (g) => (s.value.alamat_desa = g)),
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
                            I('div', null, [
                              d[61] ||
                                (d[61] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Kecamatan *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[13] || (d[13] = (g) => (s.value.alamat_kecamatan = g)),
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
                            I('div', null, [
                              d[62] ||
                                (d[62] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Kabupaten / Kota *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[14] || (d[14] = (g) => (s.value.alamat_kabupaten = g)),
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
                            I('div', null, [
                              d[63] ||
                                (d[63] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Provinsi *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[15] || (d[15] = (g) => (s.value.alamat_provinsi = g)),
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
                      I('div', Fw, [
                        d[85] ||
                          (d[85] = I(
                            'h3',
                            {
                              class:
                                'text-sm font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-emerald-100 pb-2'
                            },
                            [
                              I(
                                'span',
                                {
                                  class:
                                    'w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black'
                                },
                                'II'
                              ),
                              Dt(' Identitas Orang Tua / Wali ')
                            ],
                            -1
                          )),
                        I('div', Uw, [
                          I('div', Bw, [
                            d[72] ||
                              (d[72] = I(
                                'h4',
                                {
                                  class:
                                    'text-[10px] font-black text-emerald-700 uppercase mb-3 flex items-center gap-2'
                                },
                                [
                                  I('i', { class: 'fas fa-user-tie' }),
                                  Dt(' Data Ayah Kandung/Tiri/Angkat ')
                                ],
                                -1
                              )),
                            I('div', jw, [
                              I('div', $w, [
                                d[65] ||
                                  (d[65] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Nama Ayah *',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[16] || (d[16] = (g) => (s.value.ayah_nama = g)),
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
                              I('div', null, [
                                d[66] ||
                                  (d[66] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'NIK Ayah',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[17] || (d[17] = (g) => (s.value.ayah_nik = g)),
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
                              I('div', null, [
                                d[67] ||
                                  (d[67] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Pekerjaan Ayah',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[18] || (d[18] = (g) => (s.value.ayah_pekerjaan = g)),
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
                              I('div', null, [
                                d[69] ||
                                  (d[69] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Pendidikan Terakhir',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'select',
                                    {
                                      'onUpdate:modelValue':
                                        d[19] || (d[19] = (g) => (s.value.ayah_pendidikan = g)),
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    [
                                      d[68] ||
                                        (d[68] = I('option', { value: '' }, '-- Pilih --', -1)),
                                      (Ct(),
                                      Ot(
                                        pe,
                                        null,
                                        Jr(r, (g) =>
                                          I('option', { key: g, value: g }, fe(g), 9, qw)
                                        ),
                                        64
                                      ))
                                    ],
                                    512
                                  ),
                                  [[ts, s.value.ayah_pendidikan]]
                                )
                              ]),
                              I('div', null, [
                                d[70] ||
                                  (d[70] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'Tempat, Tgl Lahir Ayah',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[20] || (d[20] = (g) => (s.value.ayah_ttl = g)),
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
                              I('div', Kw, [
                                d[71] ||
                                  (d[71] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-emerald-600 uppercase mb-1'
                                    },
                                    'No. HP Ayah',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[21] || (d[21] = (g) => (s.value.ayah_hp = g)),
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
                          I('div', Hw, [
                            d[80] ||
                              (d[80] = I(
                                'h4',
                                {
                                  class:
                                    'text-[10px] font-black text-pink-700 uppercase mb-3 flex items-center gap-2'
                                },
                                [
                                  I('i', { class: 'fas fa-user-friends' }),
                                  Dt(' Data Ibu Kandung/Tiri/Angkat ')
                                ],
                                -1
                              )),
                            I('div', zw, [
                              I('div', Ww, [
                                d[73] ||
                                  (d[73] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Nama Ibu *',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[22] || (d[22] = (g) => (s.value.ibu_nama = g)),
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
                              I('div', null, [
                                d[74] ||
                                  (d[74] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'NIK Ibu',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[23] || (d[23] = (g) => (s.value.ibu_nik = g)),
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
                              I('div', null, [
                                d[75] ||
                                  (d[75] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Pekerjaan Ibu',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[24] || (d[24] = (g) => (s.value.ibu_pekerjaan = g)),
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
                              I('div', null, [
                                d[77] ||
                                  (d[77] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Pendidikan Terakhir',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'select',
                                    {
                                      'onUpdate:modelValue':
                                        d[25] || (d[25] = (g) => (s.value.ibu_pendidikan = g)),
                                      class:
                                        'w-full px-4 py-2.5 text-sm rounded-xl border-none shadow-sm'
                                    },
                                    [
                                      d[76] ||
                                        (d[76] = I('option', { value: '' }, '-- Pilih --', -1)),
                                      (Ct(),
                                      Ot(
                                        pe,
                                        null,
                                        Jr(r, (g) =>
                                          I('option', { key: g, value: g }, fe(g), 9, Gw)
                                        ),
                                        64
                                      ))
                                    ],
                                    512
                                  ),
                                  [[ts, s.value.ibu_pendidikan]]
                                )
                              ]),
                              I('div', null, [
                                d[78] ||
                                  (d[78] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'Tempat, Tgl Lahir Ibu',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[26] || (d[26] = (g) => (s.value.ibu_ttl = g)),
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
                              I('div', Qw, [
                                d[79] ||
                                  (d[79] = I(
                                    'label',
                                    {
                                      class:
                                        'block text-[10px] font-black text-pink-600 uppercase mb-1'
                                    },
                                    'No. HP Ibu',
                                    -1
                                  )),
                                gt(
                                  I(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        d[27] || (d[27] = (g) => (s.value.ibu_hp = g)),
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
                          I('div', Yw, [
                            I('div', null, [
                              d[81] ||
                                (d[81] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'No. Telpon / HP (WhatsApp) *',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[28] || (d[28] = (g) => (s.value.wa_wali = g)),
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
                            I('div', null, [
                              d[83] ||
                                (d[83] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Penghasilan Ortu (Total)',
                                  -1
                                )),
                              gt(
                                I(
                                  'select',
                                  {
                                    'onUpdate:modelValue':
                                      d[29] || (d[29] = (g) => (s.value.penghasilan_ortu = g)),
                                    class:
                                      'w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white'
                                  },
                                  [
                                    d[82] ||
                                      (d[82] = I('option', { value: '' }, '-- Pilih Range --', -1)),
                                    (Ct(),
                                    Ot(
                                      pe,
                                      null,
                                      Jr(n, (g) => I('option', { key: g, value: g }, fe(g), 9, Xw)),
                                      64
                                    ))
                                  ],
                                  512
                                ),
                                [[ts, s.value.penghasilan_ortu]]
                              )
                            ]),
                            I('div', Jw, [
                              d[84] ||
                                (d[84] = I(
                                  'label',
                                  {
                                    class:
                                      'block text-[10px] font-black text-slate-500 uppercase mb-1'
                                  },
                                  'Yang Mendaftarkan (Nama Wali)',
                                  -1
                                )),
                              gt(
                                I(
                                  'input',
                                  {
                                    'onUpdate:modelValue':
                                      d[30] || (d[30] = (g) => (s.value.yang_mendaftarkan = g)),
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
                      I('div', Zw, [
                        I(
                          'button',
                          {
                            type: 'submit',
                            disabled: a.value,
                            class:
                              'w-full md:w-auto md:px-16 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-95 flex items-center justify-center gap-3'
                          },
                          [
                            I(
                              'i',
                              {
                                class: ys([
                                  'fas',
                                  a.value ? 'fa-spinner fa-spin' : 'fa-paper-plane'
                                ])
                              },
                              null,
                              2
                            ),
                            Dt(' ' + fe(a.value ? 'MEMPROSES...' : 'DAFTAR SEKARANG'), 1)
                          ],
                          8,
                          t0
                        ),
                        l.value && !p.value
                          ? (Ct(),
                            Ot('p', e0, [
                              d[86] ||
                                (d[86] = I(
                                  'i',
                                  { class: 'fas fa-exclamation-triangle mr-1' },
                                  null,
                                  -1
                                )),
                              Dt(' ' + fe(l.value), 1)
                            ]))
                          : cr('', !0)
                      ]),
                      p.value
                        ? (Ct(),
                          Ot(
                            'div',
                            {
                              key: 0,
                              class:
                                'fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 sm:p-4',
                              onClick: d[34] || (d[34] = pc((g) => (p.value = !1), ['self']))
                            },
                            [
                              I('div', n0, [
                                I('div', r0, [
                                  d[88] ||
                                    (d[88] = I(
                                      'h3',
                                      { class: 'text-base font-black text-slate-800' },
                                      [
                                        I('i', {
                                          class: 'fas fa-file-signature text-teal-600 mr-1'
                                        }),
                                        Dt('Syarat & Ketentuan ')
                                      ],
                                      -1
                                    )),
                                  I(
                                    'button',
                                    {
                                      type: 'button',
                                      onClick: d[31] || (d[31] = (g) => (p.value = !1)),
                                      class:
                                        'w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500'
                                    },
                                    [
                                      ...(d[87] ||
                                        (d[87] = [I('i', { class: 'fas fa-times' }, null, -1)]))
                                    ]
                                  )
                                ]),
                                I('div', s0, [
                                  H.value.syarat
                                    ? (Ct(),
                                      Ot('div', i0, [
                                        d[90] ||
                                          (d[90] = I(
                                            'p',
                                            {
                                              class:
                                                'text-xs font-black text-slate-700 uppercase tracking-wide mb-2'
                                            },
                                            [
                                              I('i', {
                                                class: 'fas fa-file-contract text-teal-600 mr-1'
                                              }),
                                              Dt('Syarat & Ketentuan ')
                                            ],
                                            -1
                                          )),
                                        q(H.value.syarat)
                                          ? (Ct(),
                                            Ot(
                                              'img',
                                              {
                                                key: 0,
                                                src: H.value.syarat,
                                                alt: 'Syarat & Ketentuan',
                                                class: 'w-full rounded-xl border border-slate-200'
                                              },
                                              null,
                                              8,
                                              o0
                                            ))
                                          : lt(H.value.syarat)
                                            ? (Ct(),
                                              Ot(
                                                'a',
                                                {
                                                  key: 1,
                                                  href: H.value.syarat,
                                                  target: '_blank',
                                                  rel: 'noopener',
                                                  class:
                                                    'inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline'
                                                },
                                                [
                                                  ...(d[89] ||
                                                    (d[89] = [
                                                      I(
                                                        'i',
                                                        { class: 'fas fa-file-pdf' },
                                                        null,
                                                        -1
                                                      ),
                                                      Dt(' Buka / unduh Syarat & Ketentuan ', -1)
                                                    ]))
                                                ],
                                                8,
                                                a0
                                              ))
                                            : (Ct(), Ot('div', l0, fe(H.value.syarat), 1))
                                      ]))
                                    : cr('', !0),
                                  H.value.pembayaran
                                    ? (Ct(),
                                      Ot('div', u0, [
                                        d[92] ||
                                          (d[92] = I(
                                            'p',
                                            {
                                              class:
                                                'text-xs font-black text-slate-700 uppercase tracking-wide mb-2'
                                            },
                                            [
                                              I('i', {
                                                class:
                                                  'fas fa-money-bill-wave text-emerald-600 mr-1'
                                              }),
                                              Dt('Info Pembayaran ')
                                            ],
                                            -1
                                          )),
                                        q(H.value.pembayaran)
                                          ? (Ct(),
                                            Ot(
                                              'img',
                                              {
                                                key: 0,
                                                src: H.value.pembayaran,
                                                alt: 'Info Pembayaran',
                                                class: 'w-full rounded-xl border border-slate-200'
                                              },
                                              null,
                                              8,
                                              c0
                                            ))
                                          : lt(H.value.pembayaran)
                                            ? (Ct(),
                                              Ot(
                                                'a',
                                                {
                                                  key: 1,
                                                  href: H.value.pembayaran,
                                                  target: '_blank',
                                                  rel: 'noopener',
                                                  class:
                                                    'inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline'
                                                },
                                                [
                                                  ...(d[91] ||
                                                    (d[91] = [
                                                      I(
                                                        'i',
                                                        { class: 'fas fa-file-pdf' },
                                                        null,
                                                        -1
                                                      ),
                                                      Dt(' Buka / unduh Info Pembayaran ', -1)
                                                    ]))
                                                ],
                                                8,
                                                h0
                                              ))
                                            : (Ct(), Ot('div', f0, fe(H.value.pembayaran), 1))
                                      ]))
                                    : cr('', !0),
                                  !H.value.syarat && !H.value.pembayaran
                                    ? (Ct(),
                                      Ot(
                                        'p',
                                        d0,
                                        ' (Belum ada dokumen syarat/info pembayaran untuk lembaga ini.) '
                                      ))
                                    : cr('', !0),
                                  I('label', p0, [
                                    gt(
                                      I(
                                        'input',
                                        {
                                          'onUpdate:modelValue':
                                            d[32] || (d[32] = (g) => (f.value = g)),
                                          type: 'checkbox',
                                          class:
                                            'mt-1 w-5 h-5 rounded-lg text-teal-600 focus:ring-teal-500'
                                        },
                                        null,
                                        512
                                      ),
                                      [[r_, f.value]]
                                    ),
                                    d[93] ||
                                      (d[93] = I(
                                        'span',
                                        {
                                          class:
                                            'text-xs text-slate-600 leading-relaxed font-medium'
                                        },
                                        [
                                          Dt(' Saya menyatakan bahwa data yang diisi adalah '),
                                          I('b', null, 'benar dan akurat'),
                                          Dt(
                                            ' sesuai dokumen asli. Saya menyetujui syarat & ketentuan pendaftaran di TPQ Mambaul Ulum. '
                                          )
                                        ],
                                        -1
                                      ))
                                  ]),
                                  l.value
                                    ? (Ct(),
                                      Ot('p', m0, [
                                        d[94] ||
                                          (d[94] = I(
                                            'i',
                                            { class: 'fas fa-exclamation-triangle mr-1' },
                                            null,
                                            -1
                                          )),
                                        Dt(' ' + fe(l.value), 1)
                                      ]))
                                    : cr('', !0)
                                ]),
                                I('div', g0, [
                                  I(
                                    'button',
                                    {
                                      type: 'button',
                                      onClick: d[33] || (d[33] = (g) => (p.value = !1)),
                                      class:
                                        'flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50'
                                    },
                                    ' Batal '
                                  ),
                                  I(
                                    'button',
                                    {
                                      type: 'button',
                                      disabled: a.value || !f.value,
                                      onClick: A,
                                      class:
                                        'flex-[2] py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm flex items-center justify-center gap-2'
                                    },
                                    [
                                      I(
                                        'i',
                                        {
                                          class: ys([
                                            'fas',
                                            a.value ? 'fa-spinner fa-spin' : 'fa-paper-plane'
                                          ])
                                        },
                                        null,
                                        2
                                      ),
                                      Dt(' ' + fe(a.value ? 'MEMPROSES...' : 'Setuju & Kirim'), 1)
                                    ],
                                    8,
                                    _0
                                  )
                                ])
                              ])
                            ]
                          ))
                        : cr('', !0)
                    ],
                    32
                  )),
              d[95] ||
                (d[95] = I(
                  'footer',
                  { class: 'text-center py-6' },
                  [
                    I(
                      'p',
                      { class: 'text-[10px] text-slate-400 font-bold uppercase tracking-widest' },
                      ' © 2026 PP Mambaul Ulum • Ammu Online PSB '
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
  v0 = dw(y0, [['__scopeId', 'data-v-cc654cf8']]),
  E0 = {
    __name: 'App',
    setup(e) {
      return (t, n) => (Ct(), bf(v0))
    }
  }
l_(E0).mount('#app')
