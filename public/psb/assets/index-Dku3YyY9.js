(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ua(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const kt={},Ir=[],Ye=()=>{},_h=()=>!1,Zi=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),to=e=>e.startsWith("onUpdate:"),ae=Object.assign,Ba=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Hp=Object.prototype.hasOwnProperty,Pt=(e,t)=>Hp.call(e,t),ot=Array.isArray,Ar=e=>Bs(e)==="[object Map]",Fr=e=>Bs(e)==="[object Set]",Fu=e=>Bs(e)==="[object Date]",ht=e=>typeof e=="function",jt=e=>typeof e=="string",Ze=e=>typeof e=="symbol",Vt=e=>e!==null&&typeof e=="object",yh=e=>(Vt(e)||ht(e))&&ht(e.then)&&ht(e.catch),vh=Object.prototype.toString,Bs=e=>vh.call(e),zp=e=>Bs(e).slice(8,-1),Eh=e=>Bs(e)==="[object Object]",ja=e=>jt(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ds=Ua(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),eo=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Wp=/-\w/g,je=eo(e=>e.replace(Wp,t=>t.slice(1).toUpperCase())),Gp=/\B([A-Z])/g,or=eo(e=>e.replace(Gp,"-$1").toLowerCase()),Th=eo(e=>e.charAt(0).toUpperCase()+e.slice(1)),Uo=eo(e=>e?`on${Th(e)}`:""),Qe=(e,t)=>!Object.is(e,t),Ai=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},wh=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},no=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Uu;const ro=()=>Uu||(Uu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function $a(e){if(ot(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=jt(r)?Jp(r):$a(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(jt(e)||Vt(e))return e}const Qp=/;(?![^(]*\))/g,Xp=/:([^]+)/,Yp=/\/\*[^]*?\*\//g;function Jp(e){const t={};return e.replace(Yp,"").split(Qp).forEach(n=>{if(n){const r=n.split(Xp);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function qa(e){let t="";if(jt(e))t=e;else if(ot(e))for(let n=0;n<e.length;n++){const r=qa(e[n]);r&&(t+=r+" ")}else if(Vt(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Zp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",tm=Ua(Zp);function Ih(e){return!!e||e===""}function em(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Nn(e[r],t[r]);return n}function Nn(e,t){if(e===t)return!0;let n=Fu(e),r=Fu(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=Ze(e),r=Ze(t),n||r)return e===t;if(n=ot(e),r=ot(t),n||r)return n&&r?em(e,t):!1;if(n=Vt(e),r=Vt(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const a in e){const l=e.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!Nn(e[a],t[a]))return!1}}return String(e)===String(t)}function Ka(e,t){return e.findIndex(n=>Nn(n,t))}const Ah=e=>!!(e&&e.__v_isRef===!0),ne=e=>jt(e)?e:e==null?"":ot(e)||Vt(e)&&(e.toString===vh||!ht(e.toString))?Ah(e)?ne(e.value):JSON.stringify(e,bh,2):String(e),bh=(e,t)=>Ah(t)?bh(e,t.value):Ar(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[Bo(r,i)+" =>"]=s,n),{})}:Fr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Bo(n))}:Ze(t)?Bo(t):Vt(t)&&!ot(t)&&!Eh(t)?String(t):t,Bo=(e,t="")=>{var n;return Ze(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let re;class nm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&re&&(re.active?(this.parent=re,this.index=(re.scopes||(re.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=re;try{return re=this,t()}finally{re=n}}}on(){++this._on===1&&(this.prevScope=re,re=this)}off(){if(this._on>0&&--this._on===0){if(re===this)re=this.prevScope;else{let t=re;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function rm(){return re}let Dt;const jo=new WeakSet;class Rh{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,re&&(re.active?re.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,jo.has(this)&&(jo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ph(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Bu(this),Ch(this);const t=Dt,n=$e;Dt=this,$e=!0;try{return this.fn()}finally{Vh(this),Dt=t,$e=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Wa(t);this.deps=this.depsTail=void 0,Bu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?jo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){oa(this)&&this.run()}get dirty(){return oa(this)}}let Sh=0,ps,ms;function Ph(e,t=!1){if(e.flags|=8,t){e.next=ms,ms=e;return}e.next=ps,ps=e}function Ha(){Sh++}function za(){if(--Sh>0)return;if(ms){let t=ms;for(ms=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;ps;){let t=ps;for(ps=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Ch(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Vh(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Wa(r),sm(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function oa(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(xh(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function xh(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Rs)||(e.globalVersion=Rs,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!oa(e))))return;e.flags|=2;const t=e.dep,n=Dt,r=$e;Dt=e,$e=!0;try{Ch(e);const s=e.fn(e._value);(t.version===0||Qe(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{Dt=n,$e=r,Vh(e),e.flags&=-3}}function Wa(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Wa(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function sm(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let $e=!0;const kh=[];function gn(){kh.push($e),$e=!1}function _n(){const e=kh.pop();$e=e===void 0?!0:e}function Bu(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Dt;Dt=void 0;try{t()}finally{Dt=n}}}let Rs=0;class im{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ga{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Dt||!$e||Dt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Dt)n=this.activeLink=new im(Dt,this),Dt.deps?(n.prevDep=Dt.depsTail,Dt.depsTail.nextDep=n,Dt.depsTail=n):Dt.deps=Dt.depsTail=n,Dh(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Dt.depsTail,n.nextDep=void 0,Dt.depsTail.nextDep=n,Dt.depsTail=n,Dt.deps===n&&(Dt.deps=r)}return n}trigger(t){this.version++,Rs++,this.notify(t)}notify(t){Ha();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{za()}}}function Dh(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Dh(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const aa=new WeakMap,Yn=Symbol(""),la=Symbol(""),Ss=Symbol("");function me(e,t,n){if($e&&Dt){let r=aa.get(e);r||aa.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new Ga),s.map=r,s.key=n),s.track()}}function fn(e,t,n,r,s,i){const a=aa.get(e);if(!a){Rs++;return}const l=c=>{c&&c.trigger()};if(Ha(),t==="clear")a.forEach(l);else{const c=ot(e),d=c&&ja(n);if(c&&n==="length"){const h=Number(r);a.forEach((g,T)=>{(T==="length"||T===Ss||!Ze(T)&&T>=h)&&l(g)})}else switch((n!==void 0||a.has(void 0))&&l(a.get(n)),d&&l(a.get(Ss)),t){case"add":c?d&&l(a.get("length")):(l(a.get(Yn)),Ar(e)&&l(a.get(la)));break;case"delete":c||(l(a.get(Yn)),Ar(e)&&l(a.get(la)));break;case"set":Ar(e)&&l(a.get(Yn));break}}za()}function gr(e){const t=St(e);return t===e?t:(me(t,"iterate",Ss),Fe(e)?t:t.map(qe))}function so(e){return me(e=St(e),"iterate",Ss),e}function We(e,t){return yn(e)?Pr(Jn(e)?qe(t):t):qe(t)}const om={__proto__:null,[Symbol.iterator](){return $o(this,Symbol.iterator,e=>We(this,e))},concat(...e){return gr(this).concat(...e.map(t=>ot(t)?gr(t):t))},entries(){return $o(this,"entries",e=>(e[1]=We(this,e[1]),e))},every(e,t){return ln(this,"every",e,t,void 0,arguments)},filter(e,t){return ln(this,"filter",e,t,n=>n.map(r=>We(this,r)),arguments)},find(e,t){return ln(this,"find",e,t,n=>We(this,n),arguments)},findIndex(e,t){return ln(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ln(this,"findLast",e,t,n=>We(this,n),arguments)},findLastIndex(e,t){return ln(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ln(this,"forEach",e,t,void 0,arguments)},includes(...e){return qo(this,"includes",e)},indexOf(...e){return qo(this,"indexOf",e)},join(e){return gr(this).join(e)},lastIndexOf(...e){return qo(this,"lastIndexOf",e)},map(e,t){return ln(this,"map",e,t,void 0,arguments)},pop(){return rs(this,"pop")},push(...e){return rs(this,"push",e)},reduce(e,...t){return ju(this,"reduce",e,t)},reduceRight(e,...t){return ju(this,"reduceRight",e,t)},shift(){return rs(this,"shift")},some(e,t){return ln(this,"some",e,t,void 0,arguments)},splice(...e){return rs(this,"splice",e)},toReversed(){return gr(this).toReversed()},toSorted(e){return gr(this).toSorted(e)},toSpliced(...e){return gr(this).toSpliced(...e)},unshift(...e){return rs(this,"unshift",e)},values(){return $o(this,"values",e=>We(this,e))}};function $o(e,t,n){const r=so(e),s=r[t]();return r!==e&&!Fe(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const am=Array.prototype;function ln(e,t,n,r,s,i){const a=so(e),l=a!==e&&!Fe(e),c=a[t];if(c!==am[t]){const g=c.apply(e,i);return l?qe(g):g}let d=n;a!==e&&(l?d=function(g,T){return n.call(this,We(e,g),T,e)}:n.length>2&&(d=function(g,T){return n.call(this,g,T,e)}));const h=c.call(a,d,r);return l&&s?s(h):h}function ju(e,t,n,r){const s=so(e),i=s!==e&&!Fe(e);let a=n,l=!1;s!==e&&(i?(l=r.length===0,a=function(d,h,g){return l&&(l=!1,d=We(e,d)),n.call(this,d,We(e,h),g,e)}):n.length>3&&(a=function(d,h,g){return n.call(this,d,h,g,e)}));const c=s[t](a,...r);return l?We(e,c):c}function qo(e,t,n){const r=St(e);me(r,"iterate",Ss);const s=r[t](...n);return(s===-1||s===!1)&&Ja(n[0])?(n[0]=St(n[0]),r[t](...n)):s}function rs(e,t,n=[]){gn(),Ha();const r=St(e)[t].apply(e,n);return za(),_n(),r}const lm=Ua("__proto__,__v_isRef,__isVue"),Nh=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ze));function um(e){Ze(e)||(e=String(e));const t=St(this);return me(t,"has",e),t.hasOwnProperty(e)}class Oh{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?vm:Uh:i?Fh:Lh).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const a=ot(t);if(!s){let c;if(a&&(c=om[n]))return c;if(n==="hasOwnProperty")return um}const l=Reflect.get(t,n,ge(t)?t:r);if((Ze(n)?Nh.has(n):lm(n))||(s||me(t,"get",n),i))return l;if(ge(l)){const c=a&&ja(n)?l:l.value;return s&&Vt(c)?ca(c):c}return Vt(l)?s?ca(l):Xa(l):l}}class Mh extends Oh{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const a=ot(t)&&ja(n);if(!this._isShallow){const d=yn(i);if(!Fe(r)&&!yn(r)&&(i=St(i),r=St(r)),!a&&ge(i)&&!ge(r))return d||(i.value=r),!0}const l=a?Number(n)<t.length:Pt(t,n),c=Reflect.set(t,n,r,ge(t)?t:s);return t===St(s)&&(l?Qe(r,i)&&fn(t,"set",n,r):fn(t,"add",n,r)),c}deleteProperty(t,n){const r=Pt(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&fn(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!Ze(n)||!Nh.has(n))&&me(t,"has",n),r}ownKeys(t){return me(t,"iterate",ot(t)?"length":Yn),Reflect.ownKeys(t)}}class cm extends Oh{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const hm=new Mh,fm=new cm,dm=new Mh(!0);const ua=e=>e,di=e=>Reflect.getPrototypeOf(e);function pm(e,t,n){return function(...r){const s=this.__v_raw,i=St(s),a=Ar(i),l=e==="entries"||e===Symbol.iterator&&a,c=e==="keys"&&a,d=s[e](...r),h=n?ua:t?Pr:qe;return!t&&me(i,"iterate",c?la:Yn),ae(Object.create(d),{next(){const{value:g,done:T}=d.next();return T?{value:g,done:T}:{value:l?[h(g[0]),h(g[1])]:h(g),done:T}}})}}function pi(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function mm(e,t){const n={get(s){const i=this.__v_raw,a=St(i),l=St(s);e||(Qe(s,l)&&me(a,"get",s),me(a,"get",l));const{has:c}=di(a),d=t?ua:e?Pr:qe;if(c.call(a,s))return d(i.get(s));if(c.call(a,l))return d(i.get(l));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!e&&me(St(s),"iterate",Yn),s.size},has(s){const i=this.__v_raw,a=St(i),l=St(s);return e||(Qe(s,l)&&me(a,"has",s),me(a,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const a=this,l=a.__v_raw,c=St(l),d=t?ua:e?Pr:qe;return!e&&me(c,"iterate",Yn),l.forEach((h,g)=>s.call(i,d(h),d(g),a))}};return ae(n,e?{add:pi("add"),set:pi("set"),delete:pi("delete"),clear:pi("clear")}:{add(s){const i=St(this),a=di(i),l=St(s),c=!t&&!Fe(s)&&!yn(s)?l:s;return a.has.call(i,c)||Qe(s,c)&&a.has.call(i,s)||Qe(l,c)&&a.has.call(i,l)||(i.add(c),fn(i,"add",c,c)),this},set(s,i){!t&&!Fe(i)&&!yn(i)&&(i=St(i));const a=St(this),{has:l,get:c}=di(a);let d=l.call(a,s);d||(s=St(s),d=l.call(a,s));const h=c.call(a,s);return a.set(s,i),d?Qe(i,h)&&fn(a,"set",s,i):fn(a,"add",s,i),this},delete(s){const i=St(this),{has:a,get:l}=di(i);let c=a.call(i,s);c||(s=St(s),c=a.call(i,s)),l&&l.call(i,s);const d=i.delete(s);return c&&fn(i,"delete",s,void 0),d},clear(){const s=St(this),i=s.size!==0,a=s.clear();return i&&fn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=pm(s,e,t)}),n}function Qa(e,t){const n=mm(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(Pt(n,s)&&s in r?n:r,s,i)}const gm={get:Qa(!1,!1)},_m={get:Qa(!1,!0)},ym={get:Qa(!0,!1)};const Lh=new WeakMap,Fh=new WeakMap,Uh=new WeakMap,vm=new WeakMap;function Em(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Tm(e){return e.__v_skip||!Object.isExtensible(e)?0:Em(zp(e))}function Xa(e){return yn(e)?e:Ya(e,!1,hm,gm,Lh)}function wm(e){return Ya(e,!1,dm,_m,Fh)}function ca(e){return Ya(e,!0,fm,ym,Uh)}function Ya(e,t,n,r,s){if(!Vt(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=Tm(e);if(i===0)return e;const a=s.get(e);if(a)return a;const l=new Proxy(e,i===2?r:n);return s.set(e,l),l}function Jn(e){return yn(e)?Jn(e.__v_raw):!!(e&&e.__v_isReactive)}function yn(e){return!!(e&&e.__v_isReadonly)}function Fe(e){return!!(e&&e.__v_isShallow)}function Ja(e){return e?!!e.__v_raw:!1}function St(e){const t=e&&e.__v_raw;return t?St(t):e}function Im(e){return!Pt(e,"__v_skip")&&Object.isExtensible(e)&&wh(e,"__v_skip",!0),e}const qe=e=>Vt(e)?Xa(e):e,Pr=e=>Vt(e)?ca(e):e;function ge(e){return e?e.__v_isRef===!0:!1}function un(e){return Am(e,!1)}function Am(e,t){return ge(e)?e:new bm(e,t)}class bm{constructor(t,n){this.dep=new Ga,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:St(t),this._value=n?t:qe(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||Fe(t)||yn(t);t=r?t:St(t),Qe(t,n)&&(this._rawValue=t,this._value=r?t:qe(t),this.dep.trigger())}}function dt(e){return ge(e)?e.value:e}const Rm={get:(e,t,n)=>t==="__v_raw"?e:dt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return ge(s)&&!ge(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function Bh(e){return Jn(e)?e:new Proxy(e,Rm)}class Sm{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ga(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Rs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Dt!==this)return Ph(this,!0),!0}get value(){const t=this.dep.track();return xh(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Pm(e,t,n=!1){let r,s;return ht(e)?r=e:(r=e.get,s=e.set),new Sm(r,s,n)}const mi={},xi=new WeakMap;let Gn;function Cm(e,t=!1,n=Gn){if(n){let r=xi.get(n);r||xi.set(n,r=[]),r.push(e)}}function Vm(e,t,n=kt){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:l,call:c}=n,d=$=>s?$:Fe($)||s===!1||s===0?dn($,1):dn($);let h,g,T,R,x=!1,D=!1;if(ge(e)?(g=()=>e.value,x=Fe(e)):Jn(e)?(g=()=>d(e),x=!0):ot(e)?(D=!0,x=e.some($=>Jn($)||Fe($)),g=()=>e.map($=>{if(ge($))return $.value;if(Jn($))return d($);if(ht($))return c?c($,2):$()})):ht(e)?t?g=c?()=>c(e,2):e:g=()=>{if(T){gn();try{T()}finally{_n()}}const $=Gn;Gn=h;try{return c?c(e,3,[R]):e(R)}finally{Gn=$}}:g=Ye,t&&s){const $=g,mt=s===!0?1/0:s;g=()=>dn($(),mt)}const k=rm(),X=()=>{h.stop(),k&&k.active&&Ba(k.effects,h)};if(i&&t){const $=t;t=(...mt)=>{$(...mt),X()}}let W=D?new Array(e.length).fill(mi):mi;const Q=$=>{if(!(!(h.flags&1)||!h.dirty&&!$))if(t){const mt=h.run();if(s||x||(D?mt.some((_t,b)=>Qe(_t,W[b])):Qe(mt,W))){T&&T();const _t=Gn;Gn=h;try{const b=[mt,W===mi?void 0:D&&W[0]===mi?[]:W,R];W=mt,c?c(t,3,b):t(...b)}finally{Gn=_t}}}else h.run()};return l&&l(Q),h=new Rh(g),h.scheduler=a?()=>a(Q,!1):Q,R=$=>Cm($,!1,h),T=h.onStop=()=>{const $=xi.get(h);if($){if(c)c($,4);else for(const mt of $)mt();xi.delete(h)}},t?r?Q(!0):W=h.run():a?a(Q.bind(null,!0),!0):h.run(),X.pause=h.pause.bind(h),X.resume=h.resume.bind(h),X.stop=X,X}function dn(e,t=1/0,n){if(t<=0||!Vt(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,ge(e))dn(e.value,t,n);else if(ot(e))for(let r=0;r<e.length;r++)dn(e[r],t,n);else if(Fr(e)||Ar(e))e.forEach(r=>{dn(r,t,n)});else if(Eh(e)){for(const r in e)dn(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&dn(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function js(e,t,n,r){try{return r?e(...r):e()}catch(s){io(s,t,n)}}function tn(e,t,n,r){if(ht(e)){const s=js(e,t,n,r);return s&&yh(s)&&s.catch(i=>{io(i,t,n)}),s}if(ot(e)){const s=[];for(let i=0;i<e.length;i++)s.push(tn(e[i],t,n,r));return s}}function io(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||kt;if(t){let l=t.parent;const c=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const h=l.ec;if(h){for(let g=0;g<h.length;g++)if(h[g](e,c,d)===!1)return}l=l.parent}if(i){gn(),js(i,null,10,[e,c,d]),_n();return}}xm(e,n,s,r,a)}function xm(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Ee=[];let ze=-1;const br=[];let Sn=null,yr=0;const jh=Promise.resolve();let ki=null;function $h(e){const t=ki||jh;return e?t.then(this?e.bind(this):e):t}function km(e){let t=ze+1,n=Ee.length;for(;t<n;){const r=t+n>>>1,s=Ee[r],i=Ps(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function Za(e){if(!(e.flags&1)){const t=Ps(e),n=Ee[Ee.length-1];!n||!(e.flags&2)&&t>=Ps(n)?Ee.push(e):Ee.splice(km(t),0,e),e.flags|=1,qh()}}function qh(){ki||(ki=jh.then(Hh))}function Dm(e){ot(e)?br.push(...e):Sn&&e.id===-1?Sn.splice(yr+1,0,e):e.flags&1||(br.push(e),e.flags|=1),qh()}function $u(e,t,n=ze+1){for(;n<Ee.length;n++){const r=Ee[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Ee.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Kh(e){if(br.length){const t=[...new Set(br)].sort((n,r)=>Ps(n)-Ps(r));if(br.length=0,Sn){Sn.push(...t);return}for(Sn=t,yr=0;yr<Sn.length;yr++){const n=Sn[yr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Sn=null,yr=0}}const Ps=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Hh(e){try{for(ze=0;ze<Ee.length;ze++){const t=Ee[ze];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),js(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;ze<Ee.length;ze++){const t=Ee[ze];t&&(t.flags&=-2)}ze=-1,Ee.length=0,Kh(),ki=null,(Ee.length||br.length)&&Hh()}}let Le=null,zh=null;function Di(e){const t=Le;return Le=e,zh=e&&e.type.__scopeId||null,t}function pt(e,t=Le,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&Mi(-1);const i=Di(t);let a;try{a=e(...s)}finally{Di(i),r._d&&Mi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function bt(e,t){if(Le===null)return e;const n=uo(Le),r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,a,l,c=kt]=t[s];i&&(ht(i)&&(i={mounted:i,updated:i}),i.deep&&dn(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:l,modifiers:c}))}return e}function zn(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){const l=s[a];i&&(l.oldValue=i[a].value);let c=l.dir[r];c&&(gn(),tn(c,n,8,[e.el,l,e,t]),_n())}}function Nm(e,t){if(Te){let n=Te.provides;const r=Te.parent&&Te.parent.provides;r===n&&(n=Te.provides=Object.create(r)),n[e]=t}}function bi(e,t,n=!1){const r=kg();if(r||Rr){let s=Rr?Rr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&ht(t)?t.call(r&&r.proxy):t}}const Om=Symbol.for("v-scx"),Mm=()=>bi(Om);function Ko(e,t,n){return Wh(e,t,n)}function Wh(e,t,n=kt){const{immediate:r,deep:s,flush:i,once:a}=n,l=ae({},n),c=t&&r||!t&&i!=="post";let d;if(Vs){if(i==="sync"){const R=Mm();d=R.__watcherHandles||(R.__watcherHandles=[])}else if(!c){const R=()=>{};return R.stop=Ye,R.resume=Ye,R.pause=Ye,R}}const h=Te;l.call=(R,x,D)=>tn(R,h,x,D);let g=!1;i==="post"?l.scheduler=R=>{Ie(R,h&&h.suspense)}:i!=="sync"&&(g=!0,l.scheduler=(R,x)=>{x?R():Za(R)}),l.augmentJob=R=>{t&&(R.flags|=4),g&&(R.flags|=2,h&&(R.id=h.uid,R.i=h))};const T=Vm(e,t,l);return Vs&&(d?d.push(T):c&&T()),T}function Lm(e,t,n){const r=this.proxy,s=jt(e)?e.includes(".")?Gh(r,e):()=>r[e]:e.bind(r,r);let i;ht(t)?i=t:(i=t.handler,n=t);const a=$s(this),l=Wh(s,i.bind(r),n);return a(),l}function Gh(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Fm=Symbol("_vte"),Um=e=>e.__isTeleport,Bm=Symbol("_leaveCb");function tl(e,t){e.shapeFlag&6&&e.component?(e.transition=t,tl(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function qu(e,t){return ht(e)?ae({name:e.name},t,{setup:e}):e}function Qh(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Ku(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Ni=new WeakMap;function gs(e,t,n,r,s=!1){if(ot(e)){e.forEach((D,k)=>gs(D,t&&(ot(t)?t[k]:t),n,r,s));return}if(_s(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&gs(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?uo(r.component):r.el,a=s?null:i,{i:l,r:c}=e,d=t&&t.r,h=l.refs===kt?l.refs={}:l.refs,g=l.setupState,T=St(g),R=g===kt?_h:D=>Ku(h,D)?!1:Pt(T,D),x=(D,k)=>!(k&&Ku(h,k));if(d!=null&&d!==c){if(Hu(t),jt(d))h[d]=null,R(d)&&(g[d]=null);else if(ge(d)){const D=t;x(d,D.k)&&(d.value=null),D.k&&(h[D.k]=null)}}if(ht(c))js(c,l,12,[a,h]);else{const D=jt(c),k=ge(c);if(D||k){const X=()=>{if(e.f){const W=D?R(c)?g[c]:h[c]:x()||!e.k?c.value:h[e.k];if(s)ot(W)&&Ba(W,i);else if(ot(W))W.includes(i)||W.push(i);else if(D)h[c]=[i],R(c)&&(g[c]=h[c]);else{const Q=[i];x(c,e.k)&&(c.value=Q),e.k&&(h[e.k]=Q)}}else D?(h[c]=a,R(c)&&(g[c]=a)):k&&(x(c,e.k)&&(c.value=a),e.k&&(h[e.k]=a))};if(a){const W=()=>{X(),Ni.delete(e)};W.id=-1,Ni.set(e,W),Ie(W,n)}else Hu(e),X()}}}function Hu(e){const t=Ni.get(e);t&&(t.flags|=8,Ni.delete(e))}ro().requestIdleCallback;ro().cancelIdleCallback;const _s=e=>!!e.type.__asyncLoader,Xh=e=>e.type.__isKeepAlive;function jm(e,t){Yh(e,"a",t)}function $m(e,t){Yh(e,"da",t)}function Yh(e,t,n=Te){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(oo(t,r,n),n){let s=n.parent;for(;s&&s.parent;)Xh(s.parent.vnode)&&qm(r,t,n,s),s=s.parent}}function qm(e,t,n,r){const s=oo(t,e,r,!0);Zh(()=>{Ba(r[t],s)},n)}function oo(e,t,n=Te,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...a)=>{gn();const l=$s(n),c=tn(t,n,e,a);return l(),_n(),c});return r?s.unshift(i):s.push(i),i}}const wn=e=>(t,n=Te)=>{(!Vs||e==="sp")&&oo(e,(...r)=>t(...r),n)},Km=wn("bm"),Jh=wn("m"),Hm=wn("bu"),zm=wn("u"),Wm=wn("bum"),Zh=wn("um"),Gm=wn("sp"),Qm=wn("rtg"),Xm=wn("rtc");function Ym(e,t=Te){oo("ec",e,t)}const Jm=Symbol.for("v-ndc");function gi(e,t,n,r){let s;const i=n,a=ot(e);if(a||jt(e)){const l=a&&Jn(e);let c=!1,d=!1;l&&(c=!Fe(e),d=yn(e),e=so(e)),s=new Array(e.length);for(let h=0,g=e.length;h<g;h++)s[h]=t(c?d?Pr(qe(e[h])):qe(e[h]):e[h],h,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let l=0;l<e;l++)s[l]=t(l+1,l,void 0,i)}else if(Vt(e))if(e[Symbol.iterator])s=Array.from(e,(l,c)=>t(l,c,void 0,i));else{const l=Object.keys(e);s=new Array(l.length);for(let c=0,d=l.length;c<d;c++){const h=l[c];s[c]=t(e[h],h,c,i)}}else s=[];return s}const ha=e=>e?Ef(e)?uo(e):ha(e.parent):null,ys=ae(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ha(e.parent),$root:e=>ha(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>ef(e),$forceUpdate:e=>e.f||(e.f=()=>{Za(e.update)}),$nextTick:e=>e.n||(e.n=$h.bind(e.proxy)),$watch:e=>Lm.bind(e)}),Ho=(e,t)=>e!==kt&&!e.__isScriptSetup&&Pt(e,t),Zm={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:l,appContext:c}=e;if(t[0]!=="$"){const T=a[t];if(T!==void 0)switch(T){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(Ho(r,t))return a[t]=1,r[t];if(s!==kt&&Pt(s,t))return a[t]=2,s[t];if(Pt(i,t))return a[t]=3,i[t];if(n!==kt&&Pt(n,t))return a[t]=4,n[t];fa&&(a[t]=0)}}const d=ys[t];let h,g;if(d)return t==="$attrs"&&me(e.attrs,"get",""),d(e);if((h=l.__cssModules)&&(h=h[t]))return h;if(n!==kt&&Pt(n,t))return a[t]=4,n[t];if(g=c.config.globalProperties,Pt(g,t))return g[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return Ho(s,t)?(s[t]=n,!0):r!==kt&&Pt(r,t)?(r[t]=n,!0):Pt(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:a}},l){let c;return!!(n[l]||e!==kt&&l[0]!=="$"&&Pt(e,l)||Ho(t,l)||Pt(i,l)||Pt(r,l)||Pt(ys,l)||Pt(s.config.globalProperties,l)||(c=a.__cssModules)&&c[l])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Pt(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function zu(e){return ot(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let fa=!0;function tg(e){const t=ef(e),n=e.proxy,r=e.ctx;fa=!1,t.beforeCreate&&Wu(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:a,watch:l,provide:c,inject:d,created:h,beforeMount:g,mounted:T,beforeUpdate:R,updated:x,activated:D,deactivated:k,beforeDestroy:X,beforeUnmount:W,destroyed:Q,unmounted:$,render:mt,renderTracked:_t,renderTriggered:b,errorCaptured:_,serverPrefetch:E,expose:I,inheritAttrs:w,components:v,directives:p,filters:P}=t;if(d&&eg(d,r,null),a)for(const G in a){const ut=a[G];ht(ut)&&(r[G]=ut.bind(n))}if(s){const G=s.call(n,n);Vt(G)&&(e.data=Xa(G))}if(fa=!0,i)for(const G in i){const ut=i[G],Ht=ht(ut)?ut.bind(n,n):ht(ut.get)?ut.get.bind(n,n):Ye,ue=!ht(ut)&&ht(ut.set)?ut.set.bind(n):Ye,be=vr({get:Ht,set:ue});Object.defineProperty(r,G,{enumerable:!0,configurable:!0,get:()=>be.value,set:Lt=>be.value=Lt})}if(l)for(const G in l)tf(l[G],r,n,G);if(c){const G=ht(c)?c.call(n):c;Reflect.ownKeys(G).forEach(ut=>{Nm(ut,G[ut])})}h&&Wu(h,e,"c");function Rt(G,ut){ot(ut)?ut.forEach(Ht=>G(Ht.bind(n))):ut&&G(ut.bind(n))}if(Rt(Km,g),Rt(Jh,T),Rt(Hm,R),Rt(zm,x),Rt(jm,D),Rt($m,k),Rt(Ym,_),Rt(Xm,_t),Rt(Qm,b),Rt(Wm,W),Rt(Zh,$),Rt(Gm,E),ot(I))if(I.length){const G=e.exposed||(e.exposed={});I.forEach(ut=>{Object.defineProperty(G,ut,{get:()=>n[ut],set:Ht=>n[ut]=Ht,enumerable:!0})})}else e.exposed||(e.exposed={});mt&&e.render===Ye&&(e.render=mt),w!=null&&(e.inheritAttrs=w),v&&(e.components=v),p&&(e.directives=p),E&&Qh(e)}function eg(e,t,n=Ye){ot(e)&&(e=da(e));for(const r in e){const s=e[r];let i;Vt(s)?"default"in s?i=bi(s.from||r,s.default,!0):i=bi(s.from||r):i=bi(s),ge(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):t[r]=i}}function Wu(e,t,n){tn(ot(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function tf(e,t,n,r){let s=r.includes(".")?Gh(n,r):()=>n[r];if(jt(e)){const i=t[e];ht(i)&&Ko(s,i)}else if(ht(e))Ko(s,e.bind(n));else if(Vt(e))if(ot(e))e.forEach(i=>tf(i,t,n,r));else{const i=ht(e.handler)?e.handler.bind(n):t[e.handler];ht(i)&&Ko(s,i,e)}}function ef(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=e.appContext,l=i.get(t);let c;return l?c=l:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(d=>Oi(c,d,a,!0)),Oi(c,t,a)),Vt(t)&&i.set(t,c),c}function Oi(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&Oi(e,i,n,!0),s&&s.forEach(a=>Oi(e,a,n,!0));for(const a in t)if(!(r&&a==="expose")){const l=ng[a]||n&&n[a];e[a]=l?l(e[a],t[a]):t[a]}return e}const ng={data:Gu,props:Qu,emits:Qu,methods:ls,computed:ls,beforeCreate:ve,created:ve,beforeMount:ve,mounted:ve,beforeUpdate:ve,updated:ve,beforeDestroy:ve,beforeUnmount:ve,destroyed:ve,unmounted:ve,activated:ve,deactivated:ve,errorCaptured:ve,serverPrefetch:ve,components:ls,directives:ls,watch:sg,provide:Gu,inject:rg};function Gu(e,t){return t?e?function(){return ae(ht(e)?e.call(this,this):e,ht(t)?t.call(this,this):t)}:t:e}function rg(e,t){return ls(da(e),da(t))}function da(e){if(ot(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ve(e,t){return e?[...new Set([].concat(e,t))]:t}function ls(e,t){return e?ae(Object.create(null),e,t):t}function Qu(e,t){return e?ot(e)&&ot(t)?[...new Set([...e,...t])]:ae(Object.create(null),zu(e),zu(t??{})):t}function sg(e,t){if(!e)return t;if(!t)return e;const n=ae(Object.create(null),e);for(const r in t)n[r]=ve(e[r],t[r]);return n}function nf(){return{app:null,config:{isNativeTag:_h,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ig=0;function og(e,t){return function(r,s=null){ht(r)||(r=ae({},r)),s!=null&&!Vt(s)&&(s=null);const i=nf(),a=new WeakSet,l=[];let c=!1;const d=i.app={_uid:ig++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Fg,get config(){return i.config},set config(h){},use(h,...g){return a.has(h)||(h&&ht(h.install)?(a.add(h),h.install(d,...g)):ht(h)&&(a.add(h),h(d,...g))),d},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),d},component(h,g){return g?(i.components[h]=g,d):i.components[h]},directive(h,g){return g?(i.directives[h]=g,d):i.directives[h]},mount(h,g,T){if(!c){const R=d._ceVNode||nt(r,s);return R.appContext=i,T===!0?T="svg":T===!1&&(T=void 0),e(R,h,T),c=!0,d._container=h,h.__vue_app__=d,uo(R.component)}},onUnmount(h){l.push(h)},unmount(){c&&(tn(l,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(h,g){return i.provides[h]=g,d},runWithContext(h){const g=Rr;Rr=d;try{return h()}finally{Rr=g}}};return d}}let Rr=null;const ag=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${je(t)}Modifiers`]||e[`${or(t)}Modifiers`];function lg(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||kt;let s=n;const i=t.startsWith("update:"),a=i&&ag(r,t.slice(7));a&&(a.trim&&(s=n.map(h=>jt(h)?h.trim():h)),a.number&&(s=n.map(no)));let l,c=r[l=Uo(t)]||r[l=Uo(je(t))];!c&&i&&(c=r[l=Uo(or(t))]),c&&tn(c,e,6,s);const d=r[l+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,tn(d,e,6,s)}}const ug=new WeakMap;function rf(e,t,n=!1){const r=n?ug:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let a={},l=!1;if(!ht(e)){const c=d=>{const h=rf(d,t,!0);h&&(l=!0,ae(a,h))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!l?(Vt(e)&&r.set(e,null),null):(ot(i)?i.forEach(c=>a[c]=null):ae(a,i),Vt(e)&&r.set(e,a),a)}function ao(e,t){return!e||!Zi(t)?!1:(t=t.slice(2).replace(/Once$/,""),Pt(e,t[0].toLowerCase()+t.slice(1))||Pt(e,or(t))||Pt(e,t))}function Xu(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:l,emit:c,render:d,renderCache:h,props:g,data:T,setupState:R,ctx:x,inheritAttrs:D}=e,k=Di(e);let X,W;try{if(n.shapeFlag&4){const $=s||r,mt=$;X=Ge(d.call(mt,$,h,g,R,T,x)),W=l}else{const $=t;X=Ge($.length>1?$(g,{attrs:l,slots:a,emit:c}):$(g,null)),W=t.props?l:cg(l)}}catch($){vs.length=0,io($,e,1),X=nt(On)}let Q=X;if(W&&D!==!1){const $=Object.keys(W),{shapeFlag:mt}=Q;$.length&&mt&7&&(i&&$.some(to)&&(W=hg(W,i)),Q=Cr(Q,W,!1,!0))}return n.dirs&&(Q=Cr(Q,null,!1,!0),Q.dirs=Q.dirs?Q.dirs.concat(n.dirs):n.dirs),n.transition&&tl(Q,n.transition),X=Q,Di(k),X}const cg=e=>{let t;for(const n in e)(n==="class"||n==="style"||Zi(n))&&((t||(t={}))[n]=e[n]);return t},hg=(e,t)=>{const n={};for(const r in e)(!to(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function fg(e,t,n){const{props:r,children:s,component:i}=e,{props:a,children:l,patchFlag:c}=t,d=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Yu(r,a,d):!!a;if(c&8){const h=t.dynamicProps;for(let g=0;g<h.length;g++){const T=h[g];if(sf(a,r,T)&&!ao(d,T))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===a?!1:r?a?Yu(r,a,d):!0:!!a;return!1}function Yu(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(sf(t,e,i)&&!ao(n,i))return!0}return!1}function sf(e,t,n){const r=e[n],s=t[n];return n==="style"&&Vt(r)&&Vt(s)?!Nn(r,s):r!==s}function dg({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const of={},af=()=>Object.create(of),lf=e=>Object.getPrototypeOf(e)===of;function pg(e,t,n,r=!1){const s={},i=af();e.propsDefaults=Object.create(null),uf(e,t,s,i);for(const a in e.propsOptions[0])a in s||(s[a]=void 0);n?e.props=r?s:wm(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function mg(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=e,l=St(s),[c]=e.propsOptions;let d=!1;if((r||a>0)&&!(a&16)){if(a&8){const h=e.vnode.dynamicProps;for(let g=0;g<h.length;g++){let T=h[g];if(ao(e.emitsOptions,T))continue;const R=t[T];if(c)if(Pt(i,T))R!==i[T]&&(i[T]=R,d=!0);else{const x=je(T);s[x]=pa(c,l,x,R,e,!1)}else R!==i[T]&&(i[T]=R,d=!0)}}}else{uf(e,t,s,i)&&(d=!0);let h;for(const g in l)(!t||!Pt(t,g)&&((h=or(g))===g||!Pt(t,h)))&&(c?n&&(n[g]!==void 0||n[h]!==void 0)&&(s[g]=pa(c,l,g,void 0,e,!0)):delete s[g]);if(i!==l)for(const g in i)(!t||!Pt(t,g))&&(delete i[g],d=!0)}d&&fn(e.attrs,"set","")}function uf(e,t,n,r){const[s,i]=e.propsOptions;let a=!1,l;if(t)for(let c in t){if(ds(c))continue;const d=t[c];let h;s&&Pt(s,h=je(c))?!i||!i.includes(h)?n[h]=d:(l||(l={}))[h]=d:ao(e.emitsOptions,c)||(!(c in r)||d!==r[c])&&(r[c]=d,a=!0)}if(i){const c=St(n),d=l||kt;for(let h=0;h<i.length;h++){const g=i[h];n[g]=pa(s,c,g,d[g],e,!Pt(d,g))}}return a}function pa(e,t,n,r,s,i){const a=e[n];if(a!=null){const l=Pt(a,"default");if(l&&r===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&ht(c)){const{propsDefaults:d}=s;if(n in d)r=d[n];else{const h=$s(s);r=d[n]=c.call(null,t),h()}}else r=c;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!l?r=!1:a[1]&&(r===""||r===or(n))&&(r=!0))}return r}const gg=new WeakMap;function cf(e,t,n=!1){const r=n?gg:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,a={},l=[];let c=!1;if(!ht(e)){const h=g=>{c=!0;const[T,R]=cf(g,t,!0);ae(a,T),R&&l.push(...R)};!n&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}if(!i&&!c)return Vt(e)&&r.set(e,Ir),Ir;if(ot(i))for(let h=0;h<i.length;h++){const g=je(i[h]);Ju(g)&&(a[g]=kt)}else if(i)for(const h in i){const g=je(h);if(Ju(g)){const T=i[h],R=a[g]=ot(T)||ht(T)?{type:T}:ae({},T),x=R.type;let D=!1,k=!0;if(ot(x))for(let X=0;X<x.length;++X){const W=x[X],Q=ht(W)&&W.name;if(Q==="Boolean"){D=!0;break}else Q==="String"&&(k=!1)}else D=ht(x)&&x.name==="Boolean";R[0]=D,R[1]=k,(D||Pt(R,"default"))&&l.push(g)}}const d=[a,l];return Vt(e)&&r.set(e,d),d}function Ju(e){return e[0]!=="$"&&!ds(e)}const el=e=>e==="_"||e==="_ctx"||e==="$stable",nl=e=>ot(e)?e.map(Ge):[Ge(e)],_g=(e,t,n)=>{if(t._n)return t;const r=pt((...s)=>nl(t(...s)),n);return r._c=!1,r},hf=(e,t,n)=>{const r=e._ctx;for(const s in e){if(el(s))continue;const i=e[s];if(ht(i))t[s]=_g(s,i,r);else if(i!=null){const a=nl(i);t[s]=()=>a}}},ff=(e,t)=>{const n=nl(t);e.slots.default=()=>n},df=(e,t,n)=>{for(const r in t)(n||!el(r))&&(e[r]=t[r])},yg=(e,t,n)=>{const r=e.slots=af();if(e.vnode.shapeFlag&32){const s=t._;s?(df(r,t,n),n&&wh(r,"_",s,!0)):hf(t,r)}else t&&ff(e,t)},vg=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,a=kt;if(r.shapeFlag&32){const l=t._;l?n&&l===1?i=!1:df(s,t,n):(i=!t.$stable,hf(t,s)),a=t}else t&&(ff(e,t),a={default:1});if(i)for(const l in s)!el(l)&&a[l]==null&&delete s[l]},Ie=Ag;function Eg(e){return Tg(e)}function Tg(e,t){const n=ro();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:l,createComment:c,setText:d,setElementText:h,parentNode:g,nextSibling:T,setScopeId:R=Ye,insertStaticContent:x}=e,D=(y,A,V,F=null,N=null,L=null,H=void 0,K=null,j=!!A.dynamicChildren)=>{if(y===A)return;y&&!ss(y,A)&&(F=sn(y),Lt(y,N,L,!0),y=null),A.patchFlag===-2&&(j=!1,A.dynamicChildren=null);const{type:M,ref:et,shapeFlag:z}=A;switch(M){case lo:k(y,A,V,F);break;case On:X(y,A,V,F);break;case Wo:y==null&&W(A,V,F,H);break;case Se:v(y,A,V,F,N,L,H,K,j);break;default:z&1?mt(y,A,V,F,N,L,H,K,j):z&6?p(y,A,V,F,N,L,H,K,j):(z&64||z&128)&&M.process(y,A,V,F,N,L,H,K,j,Ke)}et!=null&&N?gs(et,y&&y.ref,L,A||y,!A):et==null&&y&&y.ref!=null&&gs(y.ref,null,L,y,!0)},k=(y,A,V,F)=>{if(y==null)r(A.el=l(A.children),V,F);else{const N=A.el=y.el;A.children!==y.children&&d(N,A.children)}},X=(y,A,V,F)=>{y==null?r(A.el=c(A.children||""),V,F):A.el=y.el},W=(y,A,V,F)=>{[y.el,y.anchor]=x(y.children,A,V,F,y.el,y.anchor)},Q=({el:y,anchor:A},V,F)=>{let N;for(;y&&y!==A;)N=T(y),r(y,V,F),y=N;r(A,V,F)},$=({el:y,anchor:A})=>{let V;for(;y&&y!==A;)V=T(y),s(y),y=V;s(A)},mt=(y,A,V,F,N,L,H,K,j)=>{if(A.type==="svg"?H="svg":A.type==="math"&&(H="mathml"),y==null)_t(A,V,F,N,L,H,K,j);else{const M=y.el&&y.el._isVueCE?y.el:null;try{M&&M._beginPatch(),E(y,A,N,L,H,K,j)}finally{M&&M._endPatch()}}},_t=(y,A,V,F,N,L,H,K)=>{let j,M;const{props:et,shapeFlag:z,transition:Z,dirs:rt}=y;if(j=y.el=a(y.type,L,et&&et.is,et),z&8?h(j,y.children):z&16&&_(y.children,j,null,F,N,zo(y,L),H,K),rt&&zn(y,null,F,"created"),b(j,y,y.scopeId,H,F),et){for(const ct in et)ct!=="value"&&!ds(ct)&&i(j,ct,null,et[ct],L,F);"value"in et&&i(j,"value",null,et.value,L),(M=et.onVnodeBeforeMount)&&He(M,F,y)}rt&&zn(y,null,F,"beforeMount");const st=wg(N,Z);st&&Z.beforeEnter(j),r(j,A,V),((M=et&&et.onVnodeMounted)||st||rt)&&Ie(()=>{try{M&&He(M,F,y),st&&Z.enter(j),rt&&zn(y,null,F,"mounted")}finally{}},N)},b=(y,A,V,F,N)=>{if(V&&R(y,V),F)for(let L=0;L<F.length;L++)R(y,F[L]);if(N){let L=N.subTree;if(A===L||_f(L.type)&&(L.ssContent===A||L.ssFallback===A)){const H=N.vnode;b(y,H,H.scopeId,H.slotScopeIds,N.parent)}}},_=(y,A,V,F,N,L,H,K,j=0)=>{for(let M=j;M<y.length;M++){const et=y[M]=K?hn(y[M]):Ge(y[M]);D(null,et,A,V,F,N,L,H,K)}},E=(y,A,V,F,N,L,H)=>{const K=A.el=y.el;let{patchFlag:j,dynamicChildren:M,dirs:et}=A;j|=y.patchFlag&16;const z=y.props||kt,Z=A.props||kt;let rt;if(V&&Wn(V,!1),(rt=Z.onVnodeBeforeUpdate)&&He(rt,V,A,y),et&&zn(A,y,V,"beforeUpdate"),V&&Wn(V,!0),(z.innerHTML&&Z.innerHTML==null||z.textContent&&Z.textContent==null)&&h(K,""),M?I(y.dynamicChildren,M,K,V,F,zo(A,N),L):H||ut(y,A,K,null,V,F,zo(A,N),L,!1),j>0){if(j&16)w(K,z,Z,V,N);else if(j&2&&z.class!==Z.class&&i(K,"class",null,Z.class,N),j&4&&i(K,"style",z.style,Z.style,N),j&8){const st=A.dynamicProps;for(let ct=0;ct<st.length;ct++){const At=st[ct],Ft=z[At],Wt=Z[At];(Wt!==Ft||At==="value")&&i(K,At,Ft,Wt,N,V)}}j&1&&y.children!==A.children&&h(K,A.children)}else!H&&M==null&&w(K,z,Z,V,N);((rt=Z.onVnodeUpdated)||et)&&Ie(()=>{rt&&He(rt,V,A,y),et&&zn(A,y,V,"updated")},F)},I=(y,A,V,F,N,L,H)=>{for(let K=0;K<A.length;K++){const j=y[K],M=A[K],et=j.el&&(j.type===Se||!ss(j,M)||j.shapeFlag&198)?g(j.el):V;D(j,M,et,null,F,N,L,H,!0)}},w=(y,A,V,F,N)=>{if(A!==V){if(A!==kt)for(const L in A)!ds(L)&&!(L in V)&&i(y,L,A[L],null,N,F);for(const L in V){if(ds(L))continue;const H=V[L],K=A[L];H!==K&&L!=="value"&&i(y,L,K,H,N,F)}"value"in V&&i(y,"value",A.value,V.value,N)}},v=(y,A,V,F,N,L,H,K,j)=>{const M=A.el=y?y.el:l(""),et=A.anchor=y?y.anchor:l("");let{patchFlag:z,dynamicChildren:Z,slotScopeIds:rt}=A;rt&&(K=K?K.concat(rt):rt),y==null?(r(M,V,F),r(et,V,F),_(A.children||[],V,et,N,L,H,K,j)):z>0&&z&64&&Z&&y.dynamicChildren&&y.dynamicChildren.length===Z.length?(I(y.dynamicChildren,Z,V,N,L,H,K),(A.key!=null||N&&A===N.subTree)&&pf(y,A,!0)):ut(y,A,V,et,N,L,H,K,j)},p=(y,A,V,F,N,L,H,K,j)=>{A.slotScopeIds=K,y==null?A.shapeFlag&512?N.ctx.activate(A,V,F,H,j):P(A,V,F,N,L,H,j):ft(y,A,j)},P=(y,A,V,F,N,L,H)=>{const K=y.component=xg(y,F,N);if(Xh(y)&&(K.ctx.renderer=Ke),Dg(K,!1,H),K.asyncDep){if(N&&N.registerDep(K,Rt,H),!y.el){const j=K.subTree=nt(On);X(null,j,A,V),y.placeholder=j.el}}else Rt(K,y,A,V,N,L,H)},ft=(y,A,V)=>{const F=A.component=y.component;if(fg(y,A,V))if(F.asyncDep&&!F.asyncResolved){G(F,A,V);return}else F.next=A,F.update();else A.el=y.el,F.vnode=A},Rt=(y,A,V,F,N,L,H)=>{const K=()=>{if(y.isMounted){let{next:z,bu:Z,u:rt,parent:st,vnode:ct}=y;{const ce=mf(y);if(ce){z&&(z.el=ct.el,G(y,z,H)),ce.asyncDep.then(()=>{Ie(()=>{y.isUnmounted||M()},N)});return}}let At=z,Ft;Wn(y,!1),z?(z.el=ct.el,G(y,z,H)):z=ct,Z&&Ai(Z),(Ft=z.props&&z.props.onVnodeBeforeUpdate)&&He(Ft,st,z,ct),Wn(y,!0);const Wt=Xu(y),Ne=y.subTree;y.subTree=Wt,D(Ne,Wt,g(Ne.el),sn(Ne),y,N,L),z.el=Wt.el,At===null&&dg(y,Wt.el),rt&&Ie(rt,N),(Ft=z.props&&z.props.onVnodeUpdated)&&Ie(()=>He(Ft,st,z,ct),N)}else{let z;const{el:Z,props:rt}=A,{bm:st,m:ct,parent:At,root:Ft,type:Wt}=y,Ne=_s(A);Wn(y,!1),st&&Ai(st),!Ne&&(z=rt&&rt.onVnodeBeforeMount)&&He(z,At,A),Wn(y,!0);{Ft.ce&&Ft.ce._hasShadowRoot()&&Ft.ce._injectChildStyle(Wt,y.parent?y.parent.type:void 0);const ce=y.subTree=Xu(y);D(null,ce,V,F,y,N,L),A.el=ce.el}if(ct&&Ie(ct,N),!Ne&&(z=rt&&rt.onVnodeMounted)){const ce=A;Ie(()=>He(z,At,ce),N)}(A.shapeFlag&256||At&&_s(At.vnode)&&At.vnode.shapeFlag&256)&&y.a&&Ie(y.a,N),y.isMounted=!0,A=V=F=null}};y.scope.on();const j=y.effect=new Rh(K);y.scope.off();const M=y.update=j.run.bind(j),et=y.job=j.runIfDirty.bind(j);et.i=y,et.id=y.uid,j.scheduler=()=>Za(et),Wn(y,!0),M()},G=(y,A,V)=>{A.component=y;const F=y.vnode.props;y.vnode=A,y.next=null,mg(y,A.props,F,V),vg(y,A.children,V),gn(),$u(y),_n()},ut=(y,A,V,F,N,L,H,K,j=!1)=>{const M=y&&y.children,et=y?y.shapeFlag:0,z=A.children,{patchFlag:Z,shapeFlag:rt}=A;if(Z>0){if(Z&128){ue(M,z,V,F,N,L,H,K,j);return}else if(Z&256){Ht(M,z,V,F,N,L,H,K,j);return}}rt&8?(et&16&&jn(M,N,L),z!==M&&h(V,z)):et&16?rt&16?ue(M,z,V,F,N,L,H,K,j):jn(M,N,L,!0):(et&8&&h(V,""),rt&16&&_(z,V,F,N,L,H,K,j))},Ht=(y,A,V,F,N,L,H,K,j)=>{y=y||Ir,A=A||Ir;const M=y.length,et=A.length,z=Math.min(M,et);let Z;for(Z=0;Z<z;Z++){const rt=A[Z]=j?hn(A[Z]):Ge(A[Z]);D(y[Z],rt,V,null,N,L,H,K,j)}M>et?jn(y,N,L,!0,!1,z):_(A,V,F,N,L,H,K,j,z)},ue=(y,A,V,F,N,L,H,K,j)=>{let M=0;const et=A.length;let z=y.length-1,Z=et-1;for(;M<=z&&M<=Z;){const rt=y[M],st=A[M]=j?hn(A[M]):Ge(A[M]);if(ss(rt,st))D(rt,st,V,null,N,L,H,K,j);else break;M++}for(;M<=z&&M<=Z;){const rt=y[z],st=A[Z]=j?hn(A[Z]):Ge(A[Z]);if(ss(rt,st))D(rt,st,V,null,N,L,H,K,j);else break;z--,Z--}if(M>z){if(M<=Z){const rt=Z+1,st=rt<et?A[rt].el:F;for(;M<=Z;)D(null,A[M]=j?hn(A[M]):Ge(A[M]),V,st,N,L,H,K,j),M++}}else if(M>Z)for(;M<=z;)Lt(y[M],N,L,!0),M++;else{const rt=M,st=M,ct=new Map;for(M=st;M<=Z;M++){const te=A[M]=j?hn(A[M]):Ge(A[M]);te.key!=null&&ct.set(te.key,M)}let At,Ft=0;const Wt=Z-st+1;let Ne=!1,ce=0;const In=new Array(Wt);for(M=0;M<Wt;M++)In[M]=0;for(M=rt;M<=z;M++){const te=y[M];if(Ft>=Wt){Lt(te,N,L,!0);continue}let Oe;if(te.key!=null)Oe=ct.get(te.key);else for(At=st;At<=Z;At++)if(In[At-st]===0&&ss(te,A[At])){Oe=At;break}Oe===void 0?Lt(te,N,L,!0):(In[Oe-st]=M+1,Oe>=ce?ce=Oe:Ne=!0,D(te,A[Oe],V,null,N,L,H,K,j),Ft++)}const Kr=Ne?Ig(In):Ir;for(At=Kr.length-1,M=Wt-1;M>=0;M--){const te=st+M,Oe=A[te],Ys=A[te+1],hr=te+1<et?Ys.el||gf(Ys):F;In[M]===0?D(null,Oe,V,hr,N,L,H,K,j):Ne&&(At<0||M!==Kr[At]?be(Oe,V,hr,2):At--)}}},be=(y,A,V,F,N=null)=>{const{el:L,type:H,transition:K,children:j,shapeFlag:M}=y;if(M&6){be(y.component.subTree,A,V,F);return}if(M&128){y.suspense.move(A,V,F);return}if(M&64){H.move(y,A,V,Ke);return}if(H===Se){r(L,A,V);for(let z=0;z<j.length;z++)be(j[z],A,V,F);r(y.anchor,A,V);return}if(H===Wo){Q(y,A,V);return}if(F!==2&&M&1&&K)if(F===0)K.beforeEnter(L),r(L,A,V),Ie(()=>K.enter(L),N);else{const{leave:z,delayLeave:Z,afterLeave:rt}=K,st=()=>{y.ctx.isUnmounted?s(L):r(L,A,V)},ct=()=>{L._isLeaving&&L[Bm](!0),z(L,()=>{st(),rt&&rt()})};Z?Z(L,st,ct):ct()}else r(L,A,V)},Lt=(y,A,V,F=!1,N=!1)=>{const{type:L,props:H,ref:K,children:j,dynamicChildren:M,shapeFlag:et,patchFlag:z,dirs:Z,cacheIndex:rt,memo:st}=y;if(z===-2&&(N=!1),K!=null&&(gn(),gs(K,null,V,y,!0),_n()),rt!=null&&(A.renderCache[rt]=void 0),et&256){A.ctx.deactivate(y);return}const ct=et&1&&Z,At=!_s(y);let Ft;if(At&&(Ft=H&&H.onVnodeBeforeUnmount)&&He(Ft,A,y),et&6)rn(y.component,V,F);else{if(et&128){y.suspense.unmount(V,F);return}ct&&zn(y,null,A,"beforeUnmount"),et&64?y.type.remove(y,A,V,Ke,F):M&&!M.hasOnce&&(L!==Se||z>0&&z&64)?jn(M,A,V,!1,!0):(L===Se&&z&384||!N&&et&16)&&jn(j,A,V),F&&zt(y)}const Wt=st!=null&&rt==null;(At&&(Ft=H&&H.onVnodeUnmounted)||ct||Wt)&&Ie(()=>{Ft&&He(Ft,A,y),ct&&zn(y,null,A,"unmounted"),Wt&&(y.el=null)},V)},zt=y=>{const{type:A,el:V,anchor:F,transition:N}=y;if(A===Se){cr(V,F);return}if(A===Wo){$(y);return}const L=()=>{s(V),N&&!N.persisted&&N.afterLeave&&N.afterLeave()};if(y.shapeFlag&1&&N&&!N.persisted){const{leave:H,delayLeave:K}=N,j=()=>H(V,L);K?K(y.el,L,j):j()}else L()},cr=(y,A)=>{let V;for(;y!==A;)V=T(y),s(y),y=V;s(A)},rn=(y,A,V)=>{const{bum:F,scope:N,job:L,subTree:H,um:K,m:j,a:M}=y;Zu(j),Zu(M),F&&Ai(F),N.stop(),L&&(L.flags|=8,Lt(H,y,A,V)),K&&Ie(K,A),Ie(()=>{y.isUnmounted=!0},A)},jn=(y,A,V,F=!1,N=!1,L=0)=>{for(let H=L;H<y.length;H++)Lt(y[H],A,V,F,N)},sn=y=>{if(y.shapeFlag&6)return sn(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const A=T(y.anchor||y.el),V=A&&A[Fm];return V?T(V):A};let $r=!1;const Xs=(y,A,V)=>{let F;y==null?A._vnode&&(Lt(A._vnode,null,null,!0),F=A._vnode.component):D(A._vnode||null,y,A,null,null,null,V),A._vnode=y,$r||($r=!0,$u(F),Kh(),$r=!1)},Ke={p:D,um:Lt,m:be,r:zt,mt:P,mc:_,pc:ut,pbc:I,n:sn,o:e};return{render:Xs,hydrate:void 0,createApp:og(Xs)}}function zo({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Wn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function wg(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function pf(e,t,n=!1){const r=e.children,s=t.children;if(ot(r)&&ot(s))for(let i=0;i<r.length;i++){const a=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=hn(s[i]),l.el=a.el),!n&&l.patchFlag!==-2&&pf(a,l)),l.type===lo&&(l.patchFlag===-1&&(l=s[i]=hn(l)),l.el=a.el),l.type===On&&!l.el&&(l.el=a.el)}}function Ig(e){const t=e.slice(),n=[0];let r,s,i,a,l;const c=e.length;for(r=0;r<c;r++){const d=e[r];if(d!==0){if(s=n[n.length-1],e[s]<d){t[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)l=i+a>>1,e[n[l]]<d?i=l+1:a=l;d<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=t[a];return n}function mf(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:mf(t)}function Zu(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function gf(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?gf(t.subTree):null}const _f=e=>e.__isSuspense;function Ag(e,t){t&&t.pendingBranch?ot(e)?t.effects.push(...e):t.effects.push(e):Dm(e)}const Se=Symbol.for("v-fgt"),lo=Symbol.for("v-txt"),On=Symbol.for("v-cmt"),Wo=Symbol.for("v-stc"),vs=[];let Pe=null;function vt(e=!1){vs.push(Pe=e?null:[])}function bg(){vs.pop(),Pe=vs[vs.length-1]||null}let Cs=1;function Mi(e,t=!1){Cs+=e,e<0&&Pe&&t&&(Pe.hasOnce=!0)}function yf(e){return e.dynamicChildren=Cs>0?Pe||Ir:null,bg(),Cs>0&&Pe&&Pe.push(e),e}function Ct(e,t,n,r,s,i){return yf(B(e,t,n,r,s,i,!0))}function Li(e,t,n,r,s){return yf(nt(e,t,n,r,s,!0))}function Fi(e){return e?e.__v_isVNode===!0:!1}function ss(e,t){return e.type===t.type&&e.key===t.key}const vf=({key:e})=>e??null,Ri=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?jt(e)||ge(e)||ht(e)?{i:Le,r:e,k:t,f:!!n}:e:null);function B(e,t=null,n=null,r=0,s=null,i=e===Se?0:1,a=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&vf(t),ref:t&&Ri(t),scopeId:zh,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Le};return l?(rl(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=jt(n)?8:16),Cs>0&&!a&&Pe&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Pe.push(c),c}const nt=Rg;function Rg(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===Jm)&&(e=On),Fi(e)){const l=Cr(e,t,!0);return n&&rl(l,n),Cs>0&&!i&&Pe&&(l.shapeFlag&6?Pe[Pe.indexOf(e)]=l:Pe.push(l)),l.patchFlag=-2,l}if(Lg(e)&&(e=e.__vccOpts),t){t=Sg(t);let{class:l,style:c}=t;l&&!jt(l)&&(t.class=qa(l)),Vt(c)&&(Ja(c)&&!ot(c)&&(c=ae({},c)),t.style=$a(c))}const a=jt(e)?1:_f(e)?128:Um(e)?64:Vt(e)?4:ht(e)?2:0;return B(e,t,n,r,s,a,i,!0)}function Sg(e){return e?Ja(e)||lf(e)?ae({},e):e:null}function Cr(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:l,transition:c}=e,d=t?Pg(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&vf(d),ref:t&&t.ref?n&&i?ot(i)?i.concat(Ri(t)):[i,Ri(t)]:Ri(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Se?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Cr(e.ssContent),ssFallback:e.ssFallback&&Cr(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&tl(h,c.clone(h)),h}function Yt(e=" ",t=0){return nt(lo,null,e,t)}function Me(e="",t=!1){return t?(vt(),Li(On,null,e)):nt(On,null,e)}function Ge(e){return e==null||typeof e=="boolean"?nt(On):ot(e)?nt(Se,null,e.slice()):Fi(e)?hn(e):nt(lo,null,String(e))}function hn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Cr(e)}function rl(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(ot(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),rl(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!lf(t)?t._ctx=Le:s===3&&Le&&(Le.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else ht(t)?(t={default:t,_ctx:Le},n=32):(t=String(t),r&64?(n=16,t=[Yt(t)]):n=8);e.children=t,e.shapeFlag|=n}function Pg(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=qa([t.class,r.class]));else if(s==="style")t.style=$a([t.style,r.style]);else if(Zi(s)){const i=t[s],a=r[s];a&&i!==a&&!(ot(i)&&i.includes(a))?t[s]=i?[].concat(i,a):a:a==null&&i==null&&!to(s)&&(t[s]=a)}else s!==""&&(t[s]=r[s])}return t}function He(e,t,n,r=null){tn(e,t,7,[n,r])}const Cg=nf();let Vg=0;function xg(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||Cg,i={uid:Vg++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new nm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cf(r,s),emitsOptions:rf(r,s),emit:null,emitted:null,propsDefaults:kt,inheritAttrs:r.inheritAttrs,ctx:kt,data:kt,props:kt,attrs:kt,slots:kt,refs:kt,setupState:kt,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=lg.bind(null,i),e.ce&&e.ce(i),i}let Te=null;const kg=()=>Te||Le;let Ui,ma;{const e=ro(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Ui=t("__VUE_INSTANCE_SETTERS__",n=>Te=n),ma=t("__VUE_SSR_SETTERS__",n=>Vs=n)}const $s=e=>{const t=Te;return Ui(e),e.scope.on(),()=>{e.scope.off(),Ui(t)}},tc=()=>{Te&&Te.scope.off(),Ui(null)};function Ef(e){return e.vnode.shapeFlag&4}let Vs=!1;function Dg(e,t=!1,n=!1){t&&ma(t);const{props:r,children:s}=e.vnode,i=Ef(e);pg(e,r,i,t),yg(e,s,n||t);const a=i?Ng(e,t):void 0;return t&&ma(!1),a}function Ng(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Zm);const{setup:r}=n;if(r){gn();const s=e.setupContext=r.length>1?Mg(e):null,i=$s(e),a=js(r,e,0,[e.props,s]),l=yh(a);if(_n(),i(),(l||e.sp)&&!_s(e)&&Qh(e),l){if(a.then(tc,tc),t)return a.then(c=>{ec(e,c)}).catch(c=>{io(c,e,0)});e.asyncDep=a}else ec(e,a)}else Tf(e)}function ec(e,t,n){ht(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Vt(t)&&(e.setupState=Bh(t)),Tf(e)}function Tf(e,t,n){const r=e.type;e.render||(e.render=r.render||Ye);{const s=$s(e);gn();try{tg(e)}finally{_n(),s()}}}const Og={get(e,t){return me(e,"get",""),e[t]}};function Mg(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Og),slots:e.slots,emit:e.emit,expose:t}}function uo(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Bh(Im(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ys)return ys[n](e)},has(t,n){return n in t||n in ys}})):e.proxy}function Lg(e){return ht(e)&&"__vccOpts"in e}const vr=(e,t)=>Pm(e,t,Vs);function _r(e,t,n){try{Mi(-1);const r=arguments.length;return r===2?Vt(t)&&!ot(t)?Fi(t)?nt(e,null,[t]):nt(e,t):nt(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Fi(n)&&(n=[n]),nt(e,t,n))}finally{Mi(1)}}const Fg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ga;const nc=typeof window<"u"&&window.trustedTypes;if(nc)try{ga=nc.createPolicy("vue",{createHTML:e=>e})}catch{}const wf=ga?e=>ga.createHTML(e):e=>e,Ug="http://www.w3.org/2000/svg",Bg="http://www.w3.org/1998/Math/MathML",cn=typeof document<"u"?document:null,rc=cn&&cn.createElement("template"),jg={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?cn.createElementNS(Ug,e):t==="mathml"?cn.createElementNS(Bg,e):n?cn.createElement(e,{is:n}):cn.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>cn.createTextNode(e),createComment:e=>cn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>cn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const a=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{rc.innerHTML=wf(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const l=rc.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}t.insertBefore(l,n)}return[a?a.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$g=Symbol("_vtc");function qg(e,t,n){const r=e[$g];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const sc=Symbol("_vod"),Kg=Symbol("_vsh"),Hg=Symbol(""),zg=/(?:^|;)\s*display\s*:/;function Wg(e,t,n){const r=e.style,s=jt(n);let i=!1;if(n&&!s){if(t)if(jt(t))for(const a of t.split(";")){const l=a.slice(0,a.indexOf(":")).trim();n[l]==null&&us(r,l,"")}else for(const a in t)n[a]==null&&us(r,a,"");for(const a in n){a==="display"&&(i=!0);const l=n[a];l!=null?Qg(e,a,!jt(t)&&t?t[a]:void 0,l)||us(r,a,l):us(r,a,"")}}else if(s){if(t!==n){const a=r[Hg];a&&(n+=";"+a),r.cssText=n,i=zg.test(n)}}else t&&e.removeAttribute("style");sc in e&&(e[sc]=i?r.display:"",e[Kg]&&(r.display="none"))}const ic=/\s*!important$/;function us(e,t,n){if(ot(n))n.forEach(r=>us(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Gg(e,t);ic.test(n)?e.setProperty(or(r),n.replace(ic,""),"important"):e[r]=n}}const oc=["Webkit","Moz","ms"],Go={};function Gg(e,t){const n=Go[t];if(n)return n;let r=je(t);if(r!=="filter"&&r in e)return Go[t]=r;r=Th(r);for(let s=0;s<oc.length;s++){const i=oc[s]+r;if(i in e)return Go[t]=i}return t}function Qg(e,t,n,r){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&jt(r)&&n===r}const ac="http://www.w3.org/1999/xlink";function lc(e,t,n,r,s,i=tm(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(ac,t.slice(6,t.length)):e.setAttributeNS(ac,t,n):n==null||i&&!Ih(n)?e.removeAttribute(t):e.setAttribute(t,i?"":Ze(n)?String(n):n)}function uc(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?wf(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let a=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=Ih(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{e[t]=n}catch{}a&&e.removeAttribute(s||t)}function pn(e,t,n,r){e.addEventListener(t,n,r)}function Xg(e,t,n,r){e.removeEventListener(t,n,r)}const cc=Symbol("_vei");function Yg(e,t,n,r,s=null){const i=e[cc]||(e[cc]={}),a=i[t];if(r&&a)a.value=r;else{const[l,c]=Jg(t);if(r){const d=i[t]=e_(r,s);pn(e,l,d,c)}else a&&(Xg(e,l,a,c),i[t]=void 0)}}const hc=/(?:Once|Passive|Capture)$/;function Jg(e){let t;if(hc.test(e)){t={};let r;for(;r=e.match(hc);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):or(e.slice(2)),t]}let Qo=0;const Zg=Promise.resolve(),t_=()=>Qo||(Zg.then(()=>Qo=0),Qo=Date.now());function e_(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;tn(n_(r,n.value),t,5,[r])};return n.value=e,n.attached=t_(),n}function n_(e,t){if(ot(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const fc=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,r_=(e,t,n,r,s,i)=>{const a=s==="svg";t==="class"?qg(e,r,a):t==="style"?Wg(e,n,r):Zi(t)?to(t)||Yg(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):s_(e,t,r,a))?(uc(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&lc(e,t,r,a,i,t!=="value")):e._isVueCE&&(i_(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!jt(r)))?uc(e,je(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),lc(e,t,r,a))};function s_(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&fc(t)&&ht(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return fc(t)&&jt(n)?!1:t in e}function i_(e,t){const n=e._def.props;if(!n)return!1;const r=je(t);return Array.isArray(n)?n.some(s=>je(s)===r):Object.keys(n).some(s=>je(s)===r)}const Mn=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ot(t)?n=>Ai(t,n):t};function o_(e){e.target.composing=!0}function dc(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Ue=Symbol("_assign");function pc(e,t,n){return t&&(e=e.trim()),n&&(e=no(e)),e}const Mt={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[Ue]=Mn(s);const i=r||s.props&&s.props.type==="number";pn(e,t?"change":"input",a=>{a.target.composing||e[Ue](pc(e.value,n,i))}),(n||i)&&pn(e,"change",()=>{e.value=pc(e.value,n,i)}),t||(pn(e,"compositionstart",o_),pn(e,"compositionend",dc),pn(e,"change",dc))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},a){if(e[Ue]=Mn(a),e.composing)return;const l=(i||e.type==="number")&&!/^0\d/.test(e.value)?no(e.value):e.value,c=t??"";if(l===c)return;const d=e.getRootNode();(d instanceof Document||d instanceof ShadowRoot)&&d.activeElement===e&&e.type!=="range"&&(r&&t===n||s&&e.value.trim()===c)||(e.value=c)}},a_={deep:!0,created(e,t,n){e[Ue]=Mn(n),pn(e,"change",()=>{const r=e._modelValue,s=Vr(e),i=e.checked,a=e[Ue];if(ot(r)){const l=Ka(r,s),c=l!==-1;if(i&&!c)a(r.concat(s));else if(!i&&c){const d=[...r];d.splice(l,1),a(d)}}else if(Fr(r)){const l=new Set(r);i?l.add(s):l.delete(s),a(l)}else a(If(e,i))})},mounted:mc,beforeUpdate(e,t,n){e[Ue]=Mn(n),mc(e,t,n)}};function mc(e,{value:t,oldValue:n},r){e._modelValue=t;let s;if(ot(t))s=Ka(t,r.props.value)>-1;else if(Fr(t))s=t.has(r.props.value);else{if(t===n)return;s=Nn(t,If(e,!0))}e.checked!==s&&(e.checked=s)}const gc={created(e,{value:t},n){e.checked=Nn(t,n.props.value),e[Ue]=Mn(n),pn(e,"change",()=>{e[Ue](Vr(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[Ue]=Mn(r),t!==n&&(e.checked=Nn(t,r.props.value))}},Xo={deep:!0,created(e,{value:t,modifiers:{number:n}},r){const s=Fr(t);pn(e,"change",()=>{const i=Array.prototype.filter.call(e.options,a=>a.selected).map(a=>n?no(Vr(a)):Vr(a));e[Ue](e.multiple?s?new Set(i):i:i[0]),e._assigning=!0,$h(()=>{e._assigning=!1})}),e[Ue]=Mn(r)},mounted(e,{value:t}){_c(e,t)},beforeUpdate(e,t,n){e[Ue]=Mn(n)},updated(e,{value:t}){e._assigning||_c(e,t)}};function _c(e,t){const n=e.multiple,r=ot(t);if(!(n&&!r&&!Fr(t))){for(let s=0,i=e.options.length;s<i;s++){const a=e.options[s],l=Vr(a);if(n)if(r){const c=typeof l;c==="string"||c==="number"?a.selected=t.some(d=>String(d)===String(l)):a.selected=Ka(t,l)>-1}else a.selected=t.has(l);else if(Nn(Vr(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Vr(e){return"_value"in e?e._value:e.value}function If(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const l_=["ctrl","shift","alt","meta"],u_={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>l_.some(n=>e[`${n}Key`]&&!t.includes(n))},c_=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let a=0;a<t.length;a++){const l=u_[t[a]];if(l&&l(s,t))return}return e(s,...i)}))},h_=ae({patchProp:r_},jg);let yc;function f_(){return yc||(yc=Eg(h_))}const d_=((...e)=>{const t=f_().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=m_(r);if(!s)return;const i=t._component;!ht(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,p_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},t});function p_(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function m_(e){return jt(e)?document.querySelector(e):e}const g_="/logo.png";var vc={};/**
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
 */const Af=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=s&63|128):(s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=s&63|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=s&63|128)}return t},__=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=e[n++],a=e[n++],l=e[n++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],a=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},bf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const i=e[s],a=s+1<e.length,l=a?e[s+1]:0,c=s+2<e.length,d=c?e[s+2]:0,h=i>>2,g=(i&3)<<4|l>>4;let T=(l&15)<<2|d>>6,R=d&63;c||(R=64,a||(T=64)),r.push(n[h],n[g],n[T],n[R])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Af(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):__(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const i=n[e.charAt(s++)],l=s<e.length?n[e.charAt(s)]:0;++s;const d=s<e.length?n[e.charAt(s)]:64;++s;const g=s<e.length?n[e.charAt(s)]:64;if(++s,i==null||l==null||d==null||g==null)throw new y_;const T=i<<2|l>>4;if(r.push(T),d!==64){const R=l<<4&240|d>>2;if(r.push(R),g!==64){const x=d<<6&192|g;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class y_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const v_=function(e){const t=Af(e);return bf.encodeByteArray(t,!0)},Bi=function(e){return v_(e).replace(/\./g,"")},E_=function(e){try{return bf.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function T_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const w_=()=>T_().__FIREBASE_DEFAULTS__,I_=()=>{if(typeof process>"u"||typeof vc>"u")return;const e=vc.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},A_=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&E_(e[1]);return t&&JSON.parse(t)},sl=()=>{try{return w_()||I_()||A_()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},b_=e=>{var t,n;return(n=(t=sl())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},Rf=e=>{const t=b_(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},Sf=()=>{var e;return(e=sl())===null||e===void 0?void 0:e.config};/**
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
 */class R_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
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
 */function Pf(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[Bi(JSON.stringify(n)),Bi(JSON.stringify(a)),""].join(".")}/**
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
 */function S_(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function P_(){var e;const t=(e=sl())===null||e===void 0?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function C_(){return!P_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function V_(){try{return typeof indexedDB=="object"}catch{return!1}}function x_(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;t(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){t(n)}})}/**
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
 */const k_="FirebaseError";class ar extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=k_,Object.setPrototypeOf(this,ar.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cf.prototype.create)}}class Cf{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?D_(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ar(s,l,r)}}function D_(e,t){return e.replace(N_,(n,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const N_=/\{\$([^}]+)}/g;function _a(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const i=e[s],a=t[s];if(Ec(i)&&Ec(a)){if(!_a(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ec(e){return e!==null&&typeof e=="object"}/**
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
 */function De(e){return e&&e._delegate?e._delegate:e}class xr{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Qn="[DEFAULT]";/**
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
 */class O_{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new R_;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(L_(t))try{this.getOrInitializeService({instanceIdentifier:Qn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=Qn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Qn){return this.instances.has(t)}getOptions(t=Qn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(t,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(t),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&t(a,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:M_(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Qn){return this.component?this.component.multipleInstances?t:Qn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function M_(e){return e===Qn?void 0:e}function L_(e){return e.instantiationMode==="EAGER"}/**
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
 */class F_{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new O_(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Et;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(Et||(Et={}));const U_={debug:Et.DEBUG,verbose:Et.VERBOSE,info:Et.INFO,warn:Et.WARN,error:Et.ERROR,silent:Et.SILENT},B_=Et.INFO,j_={[Et.DEBUG]:"log",[Et.VERBOSE]:"log",[Et.INFO]:"info",[Et.WARN]:"warn",[Et.ERROR]:"error"},$_=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),s=j_[t];if(s)console[s](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Vf{constructor(t){this.name=t,this._logLevel=B_,this._logHandler=$_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Et))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?U_[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Et.DEBUG,...t),this._logHandler(this,Et.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Et.VERBOSE,...t),this._logHandler(this,Et.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Et.INFO,...t),this._logHandler(this,Et.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Et.WARN,...t),this._logHandler(this,Et.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Et.ERROR,...t),this._logHandler(this,Et.ERROR,...t)}}const q_=(e,t)=>t.some(n=>e instanceof n);let Tc,wc;function K_(){return Tc||(Tc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function H_(){return wc||(wc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xf=new WeakMap,ya=new WeakMap,kf=new WeakMap,Yo=new WeakMap,il=new WeakMap;function z_(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{n(Vn(e.result)),s()},a=()=>{r(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",a)});return t.then(n=>{n instanceof IDBCursor&&xf.set(n,e)}).catch(()=>{}),il.set(t,e),t}function W_(e){if(ya.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});ya.set(e,t)}let va={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ya.get(e);if(t==="objectStoreNames")return e.objectStoreNames||kf.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Vn(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function G_(e){va=e(va)}function Q_(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Jo(this),t,...n);return kf.set(r,t.sort?t.sort():[t]),Vn(r)}:H_().includes(e)?function(...t){return e.apply(Jo(this),t),Vn(xf.get(this))}:function(...t){return Vn(e.apply(Jo(this),t))}}function X_(e){return typeof e=="function"?Q_(e):(e instanceof IDBTransaction&&W_(e),q_(e,K_())?new Proxy(e,va):e)}function Vn(e){if(e instanceof IDBRequest)return z_(e);if(Yo.has(e))return Yo.get(e);const t=X_(e);return t!==e&&(Yo.set(e,t),il.set(t,e)),t}const Jo=e=>il.get(e);function Y_(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(e,t),l=Vn(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Vn(a.result),c.oldVersion,c.newVersion,Vn(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const J_=["get","getKey","getAll","getAllKeys","count"],Z_=["put","add","delete","clear"],Zo=new Map;function Ic(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Zo.get(t))return Zo.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=Z_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||J_.includes(n)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&c.done]))[0]};return Zo.set(t,i),i}G_(e=>({...e,get:(t,n,r)=>Ic(t,n)||e.get(t,n,r),has:(t,n)=>!!Ic(t,n)||e.has(t,n)}));/**
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
 */class ty{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ey(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ey(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ea="@firebase/app",Ac="0.10.13";/**
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
 */const vn=new Vf("@firebase/app"),ny="@firebase/app-compat",ry="@firebase/analytics-compat",sy="@firebase/analytics",iy="@firebase/app-check-compat",oy="@firebase/app-check",ay="@firebase/auth",ly="@firebase/auth-compat",uy="@firebase/database",cy="@firebase/data-connect",hy="@firebase/database-compat",fy="@firebase/functions",dy="@firebase/functions-compat",py="@firebase/installations",my="@firebase/installations-compat",gy="@firebase/messaging",_y="@firebase/messaging-compat",yy="@firebase/performance",vy="@firebase/performance-compat",Ey="@firebase/remote-config",Ty="@firebase/remote-config-compat",wy="@firebase/storage",Iy="@firebase/storage-compat",Ay="@firebase/firestore",by="@firebase/vertexai-preview",Ry="@firebase/firestore-compat",Sy="firebase",Py="10.14.1";/**
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
 */const Ta="[DEFAULT]",Cy={[Ea]:"fire-core",[ny]:"fire-core-compat",[sy]:"fire-analytics",[ry]:"fire-analytics-compat",[oy]:"fire-app-check",[iy]:"fire-app-check-compat",[ay]:"fire-auth",[ly]:"fire-auth-compat",[uy]:"fire-rtdb",[cy]:"fire-data-connect",[hy]:"fire-rtdb-compat",[fy]:"fire-fn",[dy]:"fire-fn-compat",[py]:"fire-iid",[my]:"fire-iid-compat",[gy]:"fire-fcm",[_y]:"fire-fcm-compat",[yy]:"fire-perf",[vy]:"fire-perf-compat",[Ey]:"fire-rc",[Ty]:"fire-rc-compat",[wy]:"fire-gcs",[Iy]:"fire-gcs-compat",[Ay]:"fire-fst",[Ry]:"fire-fst-compat",[by]:"fire-vertex","fire-js":"fire-js",[Sy]:"fire-js-all"};/**
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
 */const ji=new Map,Vy=new Map,wa=new Map;function bc(e,t){try{e.container.addComponent(t)}catch(n){vn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function xs(e){const t=e.name;if(wa.has(t))return vn.debug(`There were multiple attempts to register component ${t}.`),!1;wa.set(t,e);for(const n of ji.values())bc(n,e);for(const n of Vy.values())bc(n,e);return!0}function Df(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
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
 */const xy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xn=new Cf("app","Firebase",xy);/**
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
 */class ky{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new xr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw xn.create("app-deleted",{appName:this._name})}}/**
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
 */const Nf=Py;function Of(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Ta,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw xn.create("bad-app-name",{appName:String(s)});if(n||(n=Sf()),!n)throw xn.create("no-options");const i=ji.get(s);if(i){if(_a(n,i.options)&&_a(r,i.config))return i;throw xn.create("duplicate-app",{appName:s})}const a=new F_(s);for(const c of wa.values())a.addComponent(c);const l=new ky(n,r,a);return ji.set(s,l),l}function Mf(e=Ta){const t=ji.get(e);if(!t&&e===Ta&&Sf())return Of();if(!t)throw xn.create("no-app",{appName:e});return t}function kn(e,t,n){var r;let s=(r=Cy[e])!==null&&r!==void 0?r:e;n&&(s+=`-${n}`);const i=s.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${t}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),vn.warn(l.join(" "));return}xs(new xr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Dy="firebase-heartbeat-database",Ny=1,ks="firebase-heartbeat-store";let ta=null;function Lf(){return ta||(ta=Y_(Dy,Ny,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(ks)}catch(n){console.warn(n)}}}}).catch(e=>{throw xn.create("idb-open",{originalErrorMessage:e.message})})),ta}async function Oy(e){try{const n=(await Lf()).transaction(ks),r=await n.objectStore(ks).get(Ff(e));return await n.done,r}catch(t){if(t instanceof ar)vn.warn(t.message);else{const n=xn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});vn.warn(n.message)}}}async function Rc(e,t){try{const r=(await Lf()).transaction(ks,"readwrite");await r.objectStore(ks).put(t,Ff(e)),await r.done}catch(n){if(n instanceof ar)vn.warn(n.message);else{const r=xn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});vn.warn(r.message)}}}function Ff(e){return`${e.name}!${e.options.appId}`}/**
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
 */const My=1024,Ly=720*60*60*1e3;class Fy{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new By(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Sc();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Ly}),this._storage.overwrite(this._heartbeatsCache))}catch(r){vn.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Sc(),{heartbeatsToSend:r,unsentEntries:s}=Uy(this._heartbeatsCache.heartbeats),i=Bi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return vn.warn(n),""}}}function Sc(){return new Date().toISOString().substring(0,10)}function Uy(e,t=My){const n=[];let r=e.slice();for(const s of e){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Pc(n)>t){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Pc(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class By{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return V_()?x_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Oy(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Rc(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Rc(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Pc(e){return Bi(JSON.stringify({version:2,heartbeats:e})).length}/**
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
 */function jy(e){xs(new xr("platform-logger",t=>new ty(t),"PRIVATE")),xs(new xr("heartbeat",t=>new Fy(t),"PRIVATE")),kn(Ea,Ac,e),kn(Ea,Ac,"esm2017"),kn("fire-js","")}jy("");var $y="firebase",qy="10.14.1";/**
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
 */kn($y,qy,"app");var Cc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zn,Uf;(function(){var e;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(b,_){function E(){}E.prototype=_.prototype,b.D=_.prototype,b.prototype=new E,b.prototype.constructor=b,b.C=function(I,w,v){for(var p=Array(arguments.length-2),P=2;P<arguments.length;P++)p[P-2]=arguments[P];return _.prototype[w].apply(I,p)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,_,E){E||(E=0);var I=Array(16);if(typeof _=="string")for(var w=0;16>w;++w)I[w]=_.charCodeAt(E++)|_.charCodeAt(E++)<<8|_.charCodeAt(E++)<<16|_.charCodeAt(E++)<<24;else for(w=0;16>w;++w)I[w]=_[E++]|_[E++]<<8|_[E++]<<16|_[E++]<<24;_=b.g[0],E=b.g[1],w=b.g[2];var v=b.g[3],p=_+(v^E&(w^v))+I[0]+3614090360&4294967295;_=E+(p<<7&4294967295|p>>>25),p=v+(w^_&(E^w))+I[1]+3905402710&4294967295,v=_+(p<<12&4294967295|p>>>20),p=w+(E^v&(_^E))+I[2]+606105819&4294967295,w=v+(p<<17&4294967295|p>>>15),p=E+(_^w&(v^_))+I[3]+3250441966&4294967295,E=w+(p<<22&4294967295|p>>>10),p=_+(v^E&(w^v))+I[4]+4118548399&4294967295,_=E+(p<<7&4294967295|p>>>25),p=v+(w^_&(E^w))+I[5]+1200080426&4294967295,v=_+(p<<12&4294967295|p>>>20),p=w+(E^v&(_^E))+I[6]+2821735955&4294967295,w=v+(p<<17&4294967295|p>>>15),p=E+(_^w&(v^_))+I[7]+4249261313&4294967295,E=w+(p<<22&4294967295|p>>>10),p=_+(v^E&(w^v))+I[8]+1770035416&4294967295,_=E+(p<<7&4294967295|p>>>25),p=v+(w^_&(E^w))+I[9]+2336552879&4294967295,v=_+(p<<12&4294967295|p>>>20),p=w+(E^v&(_^E))+I[10]+4294925233&4294967295,w=v+(p<<17&4294967295|p>>>15),p=E+(_^w&(v^_))+I[11]+2304563134&4294967295,E=w+(p<<22&4294967295|p>>>10),p=_+(v^E&(w^v))+I[12]+1804603682&4294967295,_=E+(p<<7&4294967295|p>>>25),p=v+(w^_&(E^w))+I[13]+4254626195&4294967295,v=_+(p<<12&4294967295|p>>>20),p=w+(E^v&(_^E))+I[14]+2792965006&4294967295,w=v+(p<<17&4294967295|p>>>15),p=E+(_^w&(v^_))+I[15]+1236535329&4294967295,E=w+(p<<22&4294967295|p>>>10),p=_+(w^v&(E^w))+I[1]+4129170786&4294967295,_=E+(p<<5&4294967295|p>>>27),p=v+(E^w&(_^E))+I[6]+3225465664&4294967295,v=_+(p<<9&4294967295|p>>>23),p=w+(_^E&(v^_))+I[11]+643717713&4294967295,w=v+(p<<14&4294967295|p>>>18),p=E+(v^_&(w^v))+I[0]+3921069994&4294967295,E=w+(p<<20&4294967295|p>>>12),p=_+(w^v&(E^w))+I[5]+3593408605&4294967295,_=E+(p<<5&4294967295|p>>>27),p=v+(E^w&(_^E))+I[10]+38016083&4294967295,v=_+(p<<9&4294967295|p>>>23),p=w+(_^E&(v^_))+I[15]+3634488961&4294967295,w=v+(p<<14&4294967295|p>>>18),p=E+(v^_&(w^v))+I[4]+3889429448&4294967295,E=w+(p<<20&4294967295|p>>>12),p=_+(w^v&(E^w))+I[9]+568446438&4294967295,_=E+(p<<5&4294967295|p>>>27),p=v+(E^w&(_^E))+I[14]+3275163606&4294967295,v=_+(p<<9&4294967295|p>>>23),p=w+(_^E&(v^_))+I[3]+4107603335&4294967295,w=v+(p<<14&4294967295|p>>>18),p=E+(v^_&(w^v))+I[8]+1163531501&4294967295,E=w+(p<<20&4294967295|p>>>12),p=_+(w^v&(E^w))+I[13]+2850285829&4294967295,_=E+(p<<5&4294967295|p>>>27),p=v+(E^w&(_^E))+I[2]+4243563512&4294967295,v=_+(p<<9&4294967295|p>>>23),p=w+(_^E&(v^_))+I[7]+1735328473&4294967295,w=v+(p<<14&4294967295|p>>>18),p=E+(v^_&(w^v))+I[12]+2368359562&4294967295,E=w+(p<<20&4294967295|p>>>12),p=_+(E^w^v)+I[5]+4294588738&4294967295,_=E+(p<<4&4294967295|p>>>28),p=v+(_^E^w)+I[8]+2272392833&4294967295,v=_+(p<<11&4294967295|p>>>21),p=w+(v^_^E)+I[11]+1839030562&4294967295,w=v+(p<<16&4294967295|p>>>16),p=E+(w^v^_)+I[14]+4259657740&4294967295,E=w+(p<<23&4294967295|p>>>9),p=_+(E^w^v)+I[1]+2763975236&4294967295,_=E+(p<<4&4294967295|p>>>28),p=v+(_^E^w)+I[4]+1272893353&4294967295,v=_+(p<<11&4294967295|p>>>21),p=w+(v^_^E)+I[7]+4139469664&4294967295,w=v+(p<<16&4294967295|p>>>16),p=E+(w^v^_)+I[10]+3200236656&4294967295,E=w+(p<<23&4294967295|p>>>9),p=_+(E^w^v)+I[13]+681279174&4294967295,_=E+(p<<4&4294967295|p>>>28),p=v+(_^E^w)+I[0]+3936430074&4294967295,v=_+(p<<11&4294967295|p>>>21),p=w+(v^_^E)+I[3]+3572445317&4294967295,w=v+(p<<16&4294967295|p>>>16),p=E+(w^v^_)+I[6]+76029189&4294967295,E=w+(p<<23&4294967295|p>>>9),p=_+(E^w^v)+I[9]+3654602809&4294967295,_=E+(p<<4&4294967295|p>>>28),p=v+(_^E^w)+I[12]+3873151461&4294967295,v=_+(p<<11&4294967295|p>>>21),p=w+(v^_^E)+I[15]+530742520&4294967295,w=v+(p<<16&4294967295|p>>>16),p=E+(w^v^_)+I[2]+3299628645&4294967295,E=w+(p<<23&4294967295|p>>>9),p=_+(w^(E|~v))+I[0]+4096336452&4294967295,_=E+(p<<6&4294967295|p>>>26),p=v+(E^(_|~w))+I[7]+1126891415&4294967295,v=_+(p<<10&4294967295|p>>>22),p=w+(_^(v|~E))+I[14]+2878612391&4294967295,w=v+(p<<15&4294967295|p>>>17),p=E+(v^(w|~_))+I[5]+4237533241&4294967295,E=w+(p<<21&4294967295|p>>>11),p=_+(w^(E|~v))+I[12]+1700485571&4294967295,_=E+(p<<6&4294967295|p>>>26),p=v+(E^(_|~w))+I[3]+2399980690&4294967295,v=_+(p<<10&4294967295|p>>>22),p=w+(_^(v|~E))+I[10]+4293915773&4294967295,w=v+(p<<15&4294967295|p>>>17),p=E+(v^(w|~_))+I[1]+2240044497&4294967295,E=w+(p<<21&4294967295|p>>>11),p=_+(w^(E|~v))+I[8]+1873313359&4294967295,_=E+(p<<6&4294967295|p>>>26),p=v+(E^(_|~w))+I[15]+4264355552&4294967295,v=_+(p<<10&4294967295|p>>>22),p=w+(_^(v|~E))+I[6]+2734768916&4294967295,w=v+(p<<15&4294967295|p>>>17),p=E+(v^(w|~_))+I[13]+1309151649&4294967295,E=w+(p<<21&4294967295|p>>>11),p=_+(w^(E|~v))+I[4]+4149444226&4294967295,_=E+(p<<6&4294967295|p>>>26),p=v+(E^(_|~w))+I[11]+3174756917&4294967295,v=_+(p<<10&4294967295|p>>>22),p=w+(_^(v|~E))+I[2]+718787259&4294967295,w=v+(p<<15&4294967295|p>>>17),p=E+(v^(w|~_))+I[9]+3951481745&4294967295,b.g[0]=b.g[0]+_&4294967295,b.g[1]=b.g[1]+(w+(p<<21&4294967295|p>>>11))&4294967295,b.g[2]=b.g[2]+w&4294967295,b.g[3]=b.g[3]+v&4294967295}r.prototype.u=function(b,_){_===void 0&&(_=b.length);for(var E=_-this.blockSize,I=this.B,w=this.h,v=0;v<_;){if(w==0)for(;v<=E;)s(this,b,v),v+=this.blockSize;if(typeof b=="string"){for(;v<_;)if(I[w++]=b.charCodeAt(v++),w==this.blockSize){s(this,I),w=0;break}}else for(;v<_;)if(I[w++]=b[v++],w==this.blockSize){s(this,I),w=0;break}}this.h=w,this.o+=_},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var _=1;_<b.length-8;++_)b[_]=0;var E=8*this.o;for(_=b.length-8;_<b.length;++_)b[_]=E&255,E/=256;for(this.u(b),b=Array(16),_=E=0;4>_;++_)for(var I=0;32>I;I+=8)b[E++]=this.g[_]>>>I&255;return b};function i(b,_){var E=l;return Object.prototype.hasOwnProperty.call(E,b)?E[b]:E[b]=_(b)}function a(b,_){this.h=_;for(var E=[],I=!0,w=b.length-1;0<=w;w--){var v=b[w]|0;I&&v==_||(E[w]=v,I=!1)}this.g=E}var l={};function c(b){return-128<=b&&128>b?i(b,function(_){return new a([_|0],0>_?-1:0)}):new a([b|0],0>b?-1:0)}function d(b){if(isNaN(b)||!isFinite(b))return g;if(0>b)return k(d(-b));for(var _=[],E=1,I=0;b>=E;I++)_[I]=b/E|0,E*=4294967296;return new a(_,0)}function h(b,_){if(b.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(b.charAt(0)=="-")return k(h(b.substring(1),_));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=d(Math.pow(_,8)),I=g,w=0;w<b.length;w+=8){var v=Math.min(8,b.length-w),p=parseInt(b.substring(w,w+v),_);8>v?(v=d(Math.pow(_,v)),I=I.j(v).add(d(p))):(I=I.j(E),I=I.add(d(p)))}return I}var g=c(0),T=c(1),R=c(16777216);e=a.prototype,e.m=function(){if(D(this))return-k(this).m();for(var b=0,_=1,E=0;E<this.g.length;E++){var I=this.i(E);b+=(0<=I?I:4294967296+I)*_,_*=4294967296}return b},e.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(x(this))return"0";if(D(this))return"-"+k(this).toString(b);for(var _=d(Math.pow(b,6)),E=this,I="";;){var w=$(E,_).g;E=X(E,w.j(_));var v=((0<E.g.length?E.g[0]:E.h)>>>0).toString(b);if(E=w,x(E))return v+I;for(;6>v.length;)v="0"+v;I=v+I}},e.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function x(b){if(b.h!=0)return!1;for(var _=0;_<b.g.length;_++)if(b.g[_]!=0)return!1;return!0}function D(b){return b.h==-1}e.l=function(b){return b=X(this,b),D(b)?-1:x(b)?0:1};function k(b){for(var _=b.g.length,E=[],I=0;I<_;I++)E[I]=~b.g[I];return new a(E,~b.h).add(T)}e.abs=function(){return D(this)?k(this):this},e.add=function(b){for(var _=Math.max(this.g.length,b.g.length),E=[],I=0,w=0;w<=_;w++){var v=I+(this.i(w)&65535)+(b.i(w)&65535),p=(v>>>16)+(this.i(w)>>>16)+(b.i(w)>>>16);I=p>>>16,v&=65535,p&=65535,E[w]=p<<16|v}return new a(E,E[E.length-1]&-2147483648?-1:0)};function X(b,_){return b.add(k(_))}e.j=function(b){if(x(this)||x(b))return g;if(D(this))return D(b)?k(this).j(k(b)):k(k(this).j(b));if(D(b))return k(this.j(k(b)));if(0>this.l(R)&&0>b.l(R))return d(this.m()*b.m());for(var _=this.g.length+b.g.length,E=[],I=0;I<2*_;I++)E[I]=0;for(I=0;I<this.g.length;I++)for(var w=0;w<b.g.length;w++){var v=this.i(I)>>>16,p=this.i(I)&65535,P=b.i(w)>>>16,ft=b.i(w)&65535;E[2*I+2*w]+=p*ft,W(E,2*I+2*w),E[2*I+2*w+1]+=v*ft,W(E,2*I+2*w+1),E[2*I+2*w+1]+=p*P,W(E,2*I+2*w+1),E[2*I+2*w+2]+=v*P,W(E,2*I+2*w+2)}for(I=0;I<_;I++)E[I]=E[2*I+1]<<16|E[2*I];for(I=_;I<2*_;I++)E[I]=0;return new a(E,0)};function W(b,_){for(;(b[_]&65535)!=b[_];)b[_+1]+=b[_]>>>16,b[_]&=65535,_++}function Q(b,_){this.g=b,this.h=_}function $(b,_){if(x(_))throw Error("division by zero");if(x(b))return new Q(g,g);if(D(b))return _=$(k(b),_),new Q(k(_.g),k(_.h));if(D(_))return _=$(b,k(_)),new Q(k(_.g),_.h);if(30<b.g.length){if(D(b)||D(_))throw Error("slowDivide_ only works with positive integers.");for(var E=T,I=_;0>=I.l(b);)E=mt(E),I=mt(I);var w=_t(E,1),v=_t(I,1);for(I=_t(I,2),E=_t(E,2);!x(I);){var p=v.add(I);0>=p.l(b)&&(w=w.add(E),v=p),I=_t(I,1),E=_t(E,1)}return _=X(b,w.j(_)),new Q(w,_)}for(w=g;0<=b.l(_);){for(E=Math.max(1,Math.floor(b.m()/_.m())),I=Math.ceil(Math.log(E)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),v=d(E),p=v.j(_);D(p)||0<p.l(b);)E-=I,v=d(E),p=v.j(_);x(v)&&(v=T),w=w.add(v),b=X(b,p)}return new Q(w,b)}e.A=function(b){return $(this,b).h},e.and=function(b){for(var _=Math.max(this.g.length,b.g.length),E=[],I=0;I<_;I++)E[I]=this.i(I)&b.i(I);return new a(E,this.h&b.h)},e.or=function(b){for(var _=Math.max(this.g.length,b.g.length),E=[],I=0;I<_;I++)E[I]=this.i(I)|b.i(I);return new a(E,this.h|b.h)},e.xor=function(b){for(var _=Math.max(this.g.length,b.g.length),E=[],I=0;I<_;I++)E[I]=this.i(I)^b.i(I);return new a(E,this.h^b.h)};function mt(b){for(var _=b.g.length+1,E=[],I=0;I<_;I++)E[I]=b.i(I)<<1|b.i(I-1)>>>31;return new a(E,b.h)}function _t(b,_){var E=_>>5;_%=32;for(var I=b.g.length-E,w=[],v=0;v<I;v++)w[v]=0<_?b.i(v+E)>>>_|b.i(v+E+1)<<32-_:b.i(v+E);return new a(w,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Uf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=h,Zn=a}).apply(typeof Cc<"u"?Cc:typeof self<"u"?self:typeof window<"u"?window:{});var _i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bf,cs,jf,Si,Ia,$f,qf,Kf;(function(){var e,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof _i=="object"&&_i];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(o,u){if(u)t:{var f=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var S=o[m];if(!(S in f))break t;f=f[S]}o=o[o.length-1],m=f[o],u=u(m),u!=m&&u!=null&&t(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,m=!1,S={next:function(){if(!m&&f<o.length){var C=f++;return{value:u(C,o[C]),done:!1}}return m=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function h(o,u,f){return o.call.apply(o.bind,arguments)}function g(o,u,f){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,m),o.apply(u,S)}}return function(){return o.apply(u,arguments)}}function T(o,u,f){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:g,T.apply(null,arguments)}function R(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function x(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(m,S,C){for(var q=Array(arguments.length-2),xt=2;xt<arguments.length;xt++)q[xt-2]=arguments[xt];return u.prototype[S].apply(m,q)}}function D(o){const u=o.length;if(0<u){const f=Array(u);for(let m=0;m<u;m++)f[m]=o[m];return f}return[]}function k(o,u){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(c(m)){const S=o.length||0,C=m.length||0;o.length=S+C;for(let q=0;q<C;q++)o[S+q]=m[q]}else o.push(m)}}class X{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function W(o){return/^[\s\xa0]*$/.test(o)}function Q(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function $(o){return $[" "](o),o}$[" "]=function(){};var mt=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function _t(o,u,f){for(const m in o)u.call(f,o[m],m,o)}function b(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function _(o){const u={};for(const f in o)u[f]=o[f];return u}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let f,m;for(let S=1;S<arguments.length;S++){m=arguments[S];for(f in m)o[f]=m[f];for(let C=0;C<E.length;C++)f=E[C],Object.prototype.hasOwnProperty.call(m,f)&&(o[f]=m[f])}}function w(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function v(o){l.setTimeout(()=>{throw o},0)}function p(){var o=Ht;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class P{constructor(){this.h=this.g=null}add(u,f){const m=ft.get();m.set(u,f),this.h?this.h.next=m:this.g=m,this.h=m}}var ft=new X(()=>new Rt,o=>o.reset());class Rt{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let G,ut=!1,Ht=new P,ue=()=>{const o=l.Promise.resolve(void 0);G=()=>{o.then(be)}};var be=()=>{for(var o;o=p();){try{o.h.call(o.g)}catch(f){v(f)}var u=ft;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ut=!1};function Lt(){this.s=this.s,this.C=this.C}Lt.prototype.s=!1,Lt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Lt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function zt(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}zt.prototype.h=function(){this.defaultPrevented=!0};var cr=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return o})();function rn(o,u){if(zt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(mt){t:{try{$(u.nodeName);var S=!0;break t}catch{}S=!1}S||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:jn[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&rn.aa.h.call(this)}}x(rn,zt);var jn={2:"touch",3:"pen",4:"mouse"};rn.prototype.h=function(){rn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var sn="closure_listenable_"+(1e6*Math.random()|0),$r=0;function Xs(o,u,f,m,S){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!m,this.ha=S,this.key=++$r,this.da=this.fa=!1}function Ke(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function qr(o){this.src=o,this.g={},this.h=0}qr.prototype.add=function(o,u,f,m,S){var C=o.toString();o=this.g[C],o||(o=this.g[C]=[],this.h++);var q=A(o,u,m,S);return-1<q?(u=o[q],f||(u.fa=!1)):(u=new Xs(u,this.src,C,!!m,S),u.fa=f,o.push(u)),u};function y(o,u){var f=u.type;if(f in o.g){var m=o.g[f],S=Array.prototype.indexOf.call(m,u,void 0),C;(C=0<=S)&&Array.prototype.splice.call(m,S,1),C&&(Ke(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function A(o,u,f,m){for(var S=0;S<o.length;++S){var C=o[S];if(!C.da&&C.listener==u&&C.capture==!!f&&C.ha==m)return S}return-1}var V="closure_lm_"+(1e6*Math.random()|0),F={};function N(o,u,f,m,S){if(Array.isArray(u)){for(var C=0;C<u.length;C++)N(o,u[C],f,m,S);return null}return f=rt(f),o&&o[sn]?o.K(u,f,d(m)?!!m.capture:!1,S):L(o,u,f,!1,m,S)}function L(o,u,f,m,S,C){if(!u)throw Error("Invalid event type");var q=d(S)?!!S.capture:!!S,xt=z(o);if(xt||(o[V]=xt=new qr(o)),f=xt.add(u,f,m,q,C),f.proxy)return f;if(m=H(),f.proxy=m,m.src=o,m.listener=f,o.addEventListener)cr||(S=q),S===void 0&&(S=!1),o.addEventListener(u.toString(),m,S);else if(o.attachEvent)o.attachEvent(M(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function H(){function o(f){return u.call(o.src,o.listener,f)}const u=et;return o}function K(o,u,f,m,S){if(Array.isArray(u))for(var C=0;C<u.length;C++)K(o,u[C],f,m,S);else m=d(m)?!!m.capture:!!m,f=rt(f),o&&o[sn]?(o=o.i,u=String(u).toString(),u in o.g&&(C=o.g[u],f=A(C,f,m,S),-1<f&&(Ke(C[f]),Array.prototype.splice.call(C,f,1),C.length==0&&(delete o.g[u],o.h--)))):o&&(o=z(o))&&(u=o.g[u.toString()],o=-1,u&&(o=A(u,f,m,S)),(f=-1<o?u[o]:null)&&j(f))}function j(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[sn])y(u.i,o);else{var f=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(f,m,o.capture):u.detachEvent?u.detachEvent(M(f),m):u.addListener&&u.removeListener&&u.removeListener(m),(f=z(u))?(y(f,o),f.h==0&&(f.src=null,u[V]=null)):Ke(o)}}}function M(o){return o in F?F[o]:F[o]="on"+o}function et(o,u){if(o.da)o=!0;else{u=new rn(u,this);var f=o.listener,m=o.ha||o.src;o.fa&&j(o),o=f.call(m,u)}return o}function z(o){return o=o[V],o instanceof qr?o:null}var Z="__closure_events_fn_"+(1e9*Math.random()>>>0);function rt(o){return typeof o=="function"?o:(o[Z]||(o[Z]=function(u){return o.handleEvent(u)}),o[Z])}function st(){Lt.call(this),this.i=new qr(this),this.M=this,this.F=null}x(st,Lt),st.prototype[sn]=!0,st.prototype.removeEventListener=function(o,u,f,m){K(this,o,u,f,m)};function ct(o,u){var f,m=o.F;if(m)for(f=[];m;m=m.F)f.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new zt(u,o);else if(u instanceof zt)u.target=u.target||o;else{var S=u;u=new zt(m,o),I(u,S)}if(S=!0,f)for(var C=f.length-1;0<=C;C--){var q=u.g=f[C];S=At(q,m,!0,u)&&S}if(q=u.g=o,S=At(q,m,!0,u)&&S,S=At(q,m,!1,u)&&S,f)for(C=0;C<f.length;C++)q=u.g=f[C],S=At(q,m,!1,u)&&S}st.prototype.N=function(){if(st.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],m=0;m<f.length;m++)Ke(f[m]);delete o.g[u],o.h--}}this.F=null},st.prototype.K=function(o,u,f,m){return this.i.add(String(o),u,!1,f,m)},st.prototype.L=function(o,u,f,m){return this.i.add(String(o),u,!0,f,m)};function At(o,u,f,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,C=0;C<u.length;++C){var q=u[C];if(q&&!q.da&&q.capture==f){var xt=q.listener,ee=q.ha||q.src;q.fa&&y(o.i,q),S=xt.call(ee,m)!==!1&&S}}return S&&!m.defaultPrevented}function Ft(o,u,f){if(typeof o=="function")f&&(o=T(o,f));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function Wt(o){o.g=Ft(()=>{o.g=null,o.i&&(o.i=!1,Wt(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Ne extends Lt{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Wt(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ce(o){Lt.call(this),this.h=o,this.g={}}x(ce,Lt);var In=[];function Kr(o){_t(o.g,function(u,f){this.g.hasOwnProperty(f)&&j(u)},o),o.g={}}ce.prototype.N=function(){ce.aa.N.call(this),Kr(this)},ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var te=l.JSON.stringify,Oe=l.JSON.parse,Ys=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function hr(){}hr.prototype.h=null;function Wl(o){return o.h||(o.h=o.i())}function Gl(){}var Hr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function bo(){zt.call(this,"d")}x(bo,zt);function Ro(){zt.call(this,"c")}x(Ro,zt);var $n={},Ql=null;function Js(){return Ql=Ql||new st}$n.La="serverreachability";function Xl(o){zt.call(this,$n.La,o)}x(Xl,zt);function zr(o){const u=Js();ct(u,new Xl(u))}$n.STAT_EVENT="statevent";function Yl(o,u){zt.call(this,$n.STAT_EVENT,o),this.stat=u}x(Yl,zt);function _e(o){const u=Js();ct(u,new Yl(u,o))}$n.Ma="timingevent";function Jl(o,u){zt.call(this,$n.Ma,o),this.size=u}x(Jl,zt);function Wr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function Gr(){this.g=!0}Gr.prototype.xa=function(){this.g=!1};function wp(o,u,f,m,S,C){o.info(function(){if(o.g)if(C)for(var q="",xt=C.split("&"),ee=0;ee<xt.length;ee++){var wt=xt[ee].split("=");if(1<wt.length){var he=wt[0];wt=wt[1];var fe=he.split("_");q=2<=fe.length&&fe[1]=="type"?q+(he+"="+wt+"&"):q+(he+"=redacted&")}}else q=null;else q=C;return"XMLHTTP REQ ("+m+") [attempt "+S+"]: "+u+`
`+f+`
`+q})}function Ip(o,u,f,m,S,C,q){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+S+"]: "+u+`
`+f+`
`+C+" "+q})}function fr(o,u,f,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+bp(o,f)+(m?" "+m:"")})}function Ap(o,u){o.info(function(){return"TIMEOUT: "+u})}Gr.prototype.info=function(){};function bp(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var m=f[o];if(!(2>m.length)){var S=m[1];if(Array.isArray(S)&&!(1>S.length)){var C=S[0];if(C!="noop"&&C!="stop"&&C!="close")for(var q=1;q<S.length;q++)S[q]=""}}}}return te(f)}catch{return u}}var Zs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Zl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},So;function ti(){}x(ti,hr),ti.prototype.g=function(){return new XMLHttpRequest},ti.prototype.i=function(){return{}},So=new ti;function An(o,u,f,m){this.j=o,this.i=u,this.l=f,this.R=m||1,this.U=new ce(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new tu}function tu(){this.i=null,this.g="",this.h=!1}var eu={},Po={};function Co(o,u,f){o.L=1,o.v=si(on(u)),o.m=f,o.P=!0,nu(o,null)}function nu(o,u){o.F=Date.now(),ei(o),o.A=on(o.v);var f=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),gu(f.i,"t",m),o.C=0,f=o.j.J,o.h=new tu,o.g=Nu(o.j,f?u:null,!o.m),0<o.O&&(o.M=new Ne(T(o.Y,o,o.g),o.O)),u=o.U,f=o.g,m=o.ca;var S="readystatechange";Array.isArray(S)||(S&&(In[0]=S.toString()),S=In);for(var C=0;C<S.length;C++){var q=N(f,S[C],m||u.handleEvent,!1,u.h||u);if(!q)break;u.g[q.key]=q}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),zr(),wp(o.i,o.u,o.A,o.l,o.R,o.m)}An.prototype.ca=function(o){o=o.target;const u=this.M;u&&an(o)==3?u.j():this.Y(o)},An.prototype.Y=function(o){try{if(o==this.g)t:{const fe=an(this.g);var u=this.g.Ba();const mr=this.g.Z();if(!(3>fe)&&(fe!=3||this.g&&(this.h.h||this.g.oa()||Iu(this.g)))){this.J||fe!=4||u==7||(u==8||0>=mr?zr(3):zr(2)),Vo(this);var f=this.g.Z();this.X=f;e:if(ru(this)){var m=Iu(this.g);o="";var S=m.length,C=an(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){qn(this),Qr(this);var q="";break e}this.h.i=new l.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(C&&u==S-1)});m.length=0,this.h.g+=o,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=f==200,Ip(this.i,this.u,this.A,this.l,this.R,fe,f),this.o){if(this.T&&!this.K){e:{if(this.g){var xt,ee=this.g;if((xt=ee.g?ee.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W(xt)){var wt=xt;break e}}wt=null}if(f=wt)fr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,xo(this,f);else{this.o=!1,this.s=3,_e(12),qn(this),Qr(this);break t}}if(this.P){f=!0;let Be;for(;!this.J&&this.C<q.length;)if(Be=Rp(this,q),Be==Po){fe==4&&(this.s=4,_e(14),f=!1),fr(this.i,this.l,null,"[Incomplete Response]");break}else if(Be==eu){this.s=4,_e(15),fr(this.i,this.l,q,"[Invalid Chunk]"),f=!1;break}else fr(this.i,this.l,Be,null),xo(this,Be);if(ru(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),fe!=4||q.length!=0||this.h.h||(this.s=1,_e(16),f=!1),this.o=this.o&&f,!f)fr(this.i,this.l,q,"[Invalid Chunked Response]"),qn(this),Qr(this);else if(0<q.length&&!this.W){this.W=!0;var he=this.j;he.g==this&&he.ba&&!he.M&&(he.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),Lo(he),he.M=!0,_e(11))}}else fr(this.i,this.l,q,null),xo(this,q);fe==4&&qn(this),this.o&&!this.J&&(fe==4?Vu(this.j,this):(this.o=!1,ei(this)))}else qp(this.g),f==400&&0<q.indexOf("Unknown SID")?(this.s=3,_e(12)):(this.s=0,_e(13)),qn(this),Qr(this)}}}catch{}finally{}};function ru(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Rp(o,u){var f=o.C,m=u.indexOf(`
`,f);return m==-1?Po:(f=Number(u.substring(f,m)),isNaN(f)?eu:(m+=1,m+f>u.length?Po:(u=u.slice(m,m+f),o.C=m+f,u)))}An.prototype.cancel=function(){this.J=!0,qn(this)};function ei(o){o.S=Date.now()+o.I,su(o,o.I)}function su(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Wr(T(o.ba,o),u)}function Vo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}An.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Ap(this.i,this.A),this.L!=2&&(zr(),_e(17)),qn(this),this.s=2,Qr(this)):su(this,this.S-o)};function Qr(o){o.j.G==0||o.J||Vu(o.j,o)}function qn(o){Vo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Kr(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function xo(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||ko(f.h,o))){if(!o.K&&ko(f.h,o)&&f.G==3){try{var m=f.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var S=m;if(S[0]==0){t:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)ci(f),li(f);else break t;Mo(f),_e(18)}}else f.za=S[1],0<f.za-f.T&&37500>S[2]&&f.F&&f.v==0&&!f.C&&(f.C=Wr(T(f.Za,f),6e3));if(1>=au(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Hn(f,11)}else if((o.K||f.g==o)&&ci(f),!W(u))for(S=f.Da.g.parse(u),u=0;u<S.length;u++){let wt=S[u];if(f.T=wt[0],wt=wt[1],f.G==2)if(wt[0]=="c"){f.K=wt[1],f.ia=wt[2];const he=wt[3];he!=null&&(f.la=he,f.j.info("VER="+f.la));const fe=wt[4];fe!=null&&(f.Aa=fe,f.j.info("SVER="+f.Aa));const mr=wt[5];mr!=null&&typeof mr=="number"&&0<mr&&(m=1.5*mr,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const Be=o.g;if(Be){const fi=Be.g?Be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fi){var C=m.h;C.g||fi.indexOf("spdy")==-1&&fi.indexOf("quic")==-1&&fi.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(Do(C,C.h),C.h=null))}if(m.D){const Fo=Be.g?Be.g.getResponseHeader("X-HTTP-Session-Id"):null;Fo&&(m.ya=Fo,Ot(m.I,m.D,Fo))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var q=o;if(m.qa=Du(m,m.J?m.ia:null,m.W),q.K){lu(m.h,q);var xt=q,ee=m.L;ee&&(xt.I=ee),xt.B&&(Vo(xt),ei(xt)),m.g=q}else Pu(m);0<f.i.length&&ui(f)}else wt[0]!="stop"&&wt[0]!="close"||Hn(f,7);else f.G==3&&(wt[0]=="stop"||wt[0]=="close"?wt[0]=="stop"?Hn(f,7):Oo(f):wt[0]!="noop"&&f.l&&f.l.ta(wt),f.v=0)}}zr(4)}catch{}}var Sp=class{constructor(o,u){this.g=o,this.map=u}};function iu(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ou(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function au(o){return o.h?1:o.g?o.g.size:0}function ko(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Do(o,u){o.g?o.g.add(u):o.h=u}function lu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}iu.prototype.cancel=function(){if(this.i=uu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function uu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return D(o.i)}function Pp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],f=o.length,m=0;m<f;m++)u.push(o[m]);return u}u=[],f=0;for(m in o)u[f++]=o[m];return u}function Cp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const m in o)u[f++]=m;return u}}}function cu(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=Cp(o),m=Pp(o),S=m.length,C=0;C<S;C++)u.call(void 0,m[C],f&&f[C],o)}var hu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vp(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var m=o[f].indexOf("="),S=null;if(0<=m){var C=o[f].substring(0,m);S=o[f].substring(m+1)}else C=o[f];u(C,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Kn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Kn){this.h=o.h,ni(this,o.j),this.o=o.o,this.g=o.g,ri(this,o.s),this.l=o.l;var u=o.i,f=new Jr;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),fu(this,f),this.m=o.m}else o&&(u=String(o).match(hu))?(this.h=!1,ni(this,u[1]||"",!0),this.o=Xr(u[2]||""),this.g=Xr(u[3]||"",!0),ri(this,u[4]),this.l=Xr(u[5]||"",!0),fu(this,u[6]||"",!0),this.m=Xr(u[7]||"")):(this.h=!1,this.i=new Jr(null,this.h))}Kn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Yr(u,du,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Yr(u,du,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(Yr(f,f.charAt(0)=="/"?Dp:kp,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",Yr(f,Op)),o.join("")};function on(o){return new Kn(o)}function ni(o,u,f){o.j=f?Xr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ri(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function fu(o,u,f){u instanceof Jr?(o.i=u,Mp(o.i,o.h)):(f||(u=Yr(u,Np)),o.i=new Jr(u,o.h))}function Ot(o,u,f){o.i.set(u,f)}function si(o){return Ot(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Xr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Yr(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,xp),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function xp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var du=/[#\/\?@]/g,kp=/[#\?:]/g,Dp=/[#\?]/g,Np=/[#\?@]/g,Op=/#/g;function Jr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function bn(o){o.g||(o.g=new Map,o.h=0,o.i&&Vp(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}e=Jr.prototype,e.add=function(o,u){bn(this),this.i=null,o=dr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function pu(o,u){bn(o),u=dr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function mu(o,u){return bn(o),u=dr(o,u),o.g.has(u)}e.forEach=function(o,u){bn(this),this.g.forEach(function(f,m){f.forEach(function(S){o.call(u,S,m,this)},this)},this)},e.na=function(){bn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let m=0;m<u.length;m++){const S=o[m];for(let C=0;C<S.length;C++)f.push(u[m])}return f},e.V=function(o){bn(this);let u=[];if(typeof o=="string")mu(this,o)&&(u=u.concat(this.g.get(dr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},e.set=function(o,u){return bn(this),this.i=null,o=dr(this,o),mu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},e.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function gu(o,u,f){pu(o,u),0<f.length&&(o.i=null,o.g.set(dr(o,u),D(f)),o.h+=f.length)}e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var m=u[f];const C=encodeURIComponent(String(m)),q=this.V(m);for(m=0;m<q.length;m++){var S=C;q[m]!==""&&(S+="="+encodeURIComponent(String(q[m]))),o.push(S)}}return this.i=o.join("&")};function dr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Mp(o,u){u&&!o.j&&(bn(o),o.i=null,o.g.forEach(function(f,m){var S=m.toLowerCase();m!=S&&(pu(this,m),gu(this,S,f))},o)),o.j=u}function Lp(o,u){const f=new Gr;if(l.Image){const m=new Image;m.onload=R(Rn,f,"TestLoadImage: loaded",!0,u,m),m.onerror=R(Rn,f,"TestLoadImage: error",!1,u,m),m.onabort=R(Rn,f,"TestLoadImage: abort",!1,u,m),m.ontimeout=R(Rn,f,"TestLoadImage: timeout",!1,u,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Fp(o,u){const f=new Gr,m=new AbortController,S=setTimeout(()=>{m.abort(),Rn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(C=>{clearTimeout(S),C.ok?Rn(f,"TestPingServer: ok",!0,u):Rn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),Rn(f,"TestPingServer: error",!1,u)})}function Rn(o,u,f,m,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),m(f)}catch{}}function Up(){this.g=new Ys}function Bp(o,u,f){const m=f||"";try{cu(o,function(S,C){let q=S;d(S)&&(q=te(S)),u.push(m+C+"="+encodeURIComponent(q))})}catch(S){throw u.push(m+"type="+encodeURIComponent("_badmap")),S}}function ii(o){this.l=o.Ub||null,this.j=o.eb||!1}x(ii,hr),ii.prototype.g=function(){return new oi(this.l,this.j)},ii.prototype.i=(function(o){return function(){return o}})({});function oi(o,u){st.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(oi,st),e=oi.prototype,e.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,ts(this)},e.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Zr(this)),this.readyState=0},e.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ts(this)),this.g&&(this.readyState=3,ts(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;_u(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function _u(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}e.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Zr(this):ts(this),this.readyState==3&&_u(this)}},e.Ra=function(o){this.g&&(this.response=this.responseText=o,Zr(this))},e.Qa=function(o){this.g&&(this.response=o,Zr(this))},e.ga=function(){this.g&&Zr(this)};function Zr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,ts(o)}e.setRequestHeader=function(o,u){this.u.append(o,u)},e.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function ts(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(oi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function yu(o){let u="";return _t(o,function(f,m){u+=m,u+=":",u+=f,u+=`\r
`}),u}function No(o,u,f){t:{for(m in f){var m=!1;break t}m=!0}m||(f=yu(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):Ot(o,u,f))}function Bt(o){st.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(Bt,st);var jp=/^https?$/i,$p=["POST","PUT"];e=Bt.prototype,e.Ha=function(o){this.J=o},e.ea=function(o,u,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():So.g(),this.v=this.o?Wl(this.o):Wl(So),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(C){vu(this,C);return}if(o=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var S in m)f.set(S,m[S]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const C of m.keys())f.set(C,m.get(C));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(C=>C.toLowerCase()=="content-type"),S=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call($p,u,void 0))||m||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,q]of f)this.g.setRequestHeader(C,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wu(this),this.u=!0,this.g.send(o),this.u=!1}catch(C){vu(this,C)}};function vu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Eu(o),ai(o)}function Eu(o){o.A||(o.A=!0,ct(o,"complete"),ct(o,"error"))}e.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ct(this,"complete"),ct(this,"abort"),ai(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ai(this,!0)),Bt.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?Tu(this):this.bb())},e.bb=function(){Tu(this)};function Tu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||an(o)!=4||o.Z()!=2)){if(o.u&&an(o)==4)Ft(o.Ea,0,o);else if(ct(o,"readystatechange"),an(o)==4){o.h=!1;try{const q=o.Z();t:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var f;if(!(f=u)){var m;if(m=q===0){var S=String(o.D).match(hu)[1]||null;!S&&l.self&&l.self.location&&(S=l.self.location.protocol.slice(0,-1)),m=!jp.test(S?S.toLowerCase():"")}f=m}if(f)ct(o,"complete"),ct(o,"success");else{o.m=6;try{var C=2<an(o)?o.g.statusText:""}catch{C=""}o.l=C+" ["+o.Z()+"]",Eu(o)}}finally{ai(o)}}}}function ai(o,u){if(o.g){wu(o);const f=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ct(o,"ready");try{f.onreadystatechange=m}catch{}}}function wu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}e.isActive=function(){return!!this.g};function an(o){return o.g?o.g.readyState:0}e.Z=function(){try{return 2<an(this)?this.g.status:-1}catch{return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},e.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Oe(u)}};function Iu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qp(o){const u={};o=(o.g&&2<=an(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(W(o[m]))continue;var f=w(o[m]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const C=u[S]||[];u[S]=C,C.push(f)}b(u,function(m){return m.join(", ")})}e.Ba=function(){return this.m},e.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function es(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Au(o){this.Aa=0,this.i=[],this.j=new Gr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=es("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=es("baseRetryDelayMs",5e3,o),this.cb=es("retryDelaySeedMs",1e4,o),this.Wa=es("forwardChannelMaxRetries",2,o),this.wa=es("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new iu(o&&o.concurrentRequestLimit),this.Da=new Up,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}e=Au.prototype,e.la=8,e.G=1,e.connect=function(o,u,f,m){_e(0),this.W=o,this.H=u||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Du(this,null,this.W),ui(this)};function Oo(o){if(bu(o),o.G==3){var u=o.U++,f=on(o.I);if(Ot(f,"SID",o.K),Ot(f,"RID",u),Ot(f,"TYPE","terminate"),ns(o,f),u=new An(o,o.j,u),u.L=2,u.v=si(on(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=Nu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),ei(u)}ku(o)}function li(o){o.g&&(Lo(o),o.g.cancel(),o.g=null)}function bu(o){li(o),o.u&&(l.clearTimeout(o.u),o.u=null),ci(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ui(o){if(!ou(o.h)&&!o.s){o.s=!0;var u=o.Ga;G||ue(),ut||(G(),ut=!0),Ht.add(u,o),o.B=0}}function Kp(o,u){return au(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Wr(T(o.Ga,o,u),xu(o,o.B)),o.B++,!0)}e.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const S=new An(this,this.j,o);let C=this.o;if(this.S&&(C?(C=_(C),I(C,this.S)):C=this.S),this.m!==null||this.O||(S.H=C,C=null),this.P)t:{for(var u=0,f=0;f<this.i.length;f++){e:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=f;break t}if(u===4096||f===this.i.length-1){u=f+1;break t}}u=1e3}else u=1e3;u=Su(this,S,u),f=on(this.I),Ot(f,"RID",o),Ot(f,"CVER",22),this.D&&Ot(f,"X-HTTP-Session-Id",this.D),ns(this,f),C&&(this.O?u="headers="+encodeURIComponent(String(yu(C)))+"&"+u:this.m&&No(f,this.m,C)),Do(this.h,S),this.Ua&&Ot(f,"TYPE","init"),this.P?(Ot(f,"$req",u),Ot(f,"SID","null"),S.T=!0,Co(S,f,null)):Co(S,f,u),this.G=2}}else this.G==3&&(o?Ru(this,o):this.i.length==0||ou(this.h)||Ru(this))};function Ru(o,u){var f;u?f=u.l:f=o.U++;const m=on(o.I);Ot(m,"SID",o.K),Ot(m,"RID",f),Ot(m,"AID",o.T),ns(o,m),o.m&&o.o&&No(m,o.m,o.o),f=new An(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Su(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Do(o.h,f),Co(f,m,u)}function ns(o,u){o.H&&_t(o.H,function(f,m){Ot(u,m,f)}),o.l&&cu({},function(f,m){Ot(u,m,f)})}function Su(o,u,f){f=Math.min(o.i.length,f);var m=o.l?T(o.l.Na,o.l,o):null;t:{var S=o.i;let C=-1;for(;;){const q=["count="+f];C==-1?0<f?(C=S[0].g,q.push("ofs="+C)):C=0:q.push("ofs="+C);let xt=!0;for(let ee=0;ee<f;ee++){let wt=S[ee].g;const he=S[ee].map;if(wt-=C,0>wt)C=Math.max(0,S[ee].g-100),xt=!1;else try{Bp(he,q,"req"+wt+"_")}catch{m&&m(he)}}if(xt){m=q.join("&");break t}}}return o=o.i.splice(0,f),u.D=o,m}function Pu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;G||ue(),ut||(G(),ut=!0),Ht.add(u,o),o.v=0}}function Mo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Wr(T(o.Fa,o),xu(o,o.v)),o.v++,!0)}e.Fa=function(){if(this.u=null,Cu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Wr(T(this.ab,this),o)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,_e(10),li(this),Cu(this))};function Lo(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Cu(o){o.g=new An(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=on(o.qa);Ot(u,"RID","rpc"),Ot(u,"SID",o.K),Ot(u,"AID",o.T),Ot(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ot(u,"TO",o.ja),Ot(u,"TYPE","xmlhttp"),ns(o,u),o.m&&o.o&&No(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=si(on(u)),f.m=null,f.P=!0,nu(f,o)}e.Za=function(){this.C!=null&&(this.C=null,li(this),Mo(this),_e(19))};function ci(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Vu(o,u){var f=null;if(o.g==u){ci(o),Lo(o),o.g=null;var m=2}else if(ko(o.h,u))f=u.D,lu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var S=o.B;m=Js(),ct(m,new Jl(m,f)),ui(o)}else Pu(o);else if(S=u.s,S==3||S==0&&0<u.X||!(m==1&&Kp(o,u)||m==2&&Mo(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),S){case 1:Hn(o,5);break;case 4:Hn(o,10);break;case 3:Hn(o,6);break;default:Hn(o,2)}}}function xu(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function Hn(o,u){if(o.j.info("Error code "+u),u==2){var f=T(o.fb,o),m=o.Xa;const S=!m;m=new Kn(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ni(m,"https"),si(m),S?Lp(m.toString(),f):Fp(m.toString(),f)}else _e(2);o.G=0,o.l&&o.l.sa(u),ku(o),bu(o)}e.fb=function(o){o?(this.j.info("Successfully pinged google.com"),_e(2)):(this.j.info("Failed to ping google.com"),_e(1))};function ku(o){if(o.G=0,o.ka=[],o.l){const u=uu(o.h);(u.length!=0||o.i.length!=0)&&(k(o.ka,u),k(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function Du(o,u,f){var m=f instanceof Kn?on(f):new Kn(f);if(m.g!="")u&&(m.g=u+"."+m.g),ri(m,m.s);else{var S=l.location;m=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var C=new Kn(null);m&&ni(C,m),u&&(C.g=u),S&&ri(C,S),f&&(C.l=f),m=C}return f=o.D,u=o.ya,f&&u&&Ot(m,f,u),Ot(m,"VER",o.la),ns(o,m),m}function Nu(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Bt(new ii({eb:f})):new Bt(o.pa),u.Ha(o.J),u}e.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ou(){}e=Ou.prototype,e.ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){};function hi(){}hi.prototype.g=function(o,u){return new Re(o,u)};function Re(o,u){st.call(this),this.g=new Au(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!W(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!W(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new pr(this)}x(Re,st),Re.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Re.prototype.close=function(){Oo(this.g)},Re.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=te(o),o=f);u.i.push(new Sp(u.Ya++,o)),u.G==3&&ui(u)},Re.prototype.N=function(){this.g.l=null,delete this.j,Oo(this.g),delete this.g,Re.aa.N.call(this)};function Mu(o){bo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(const f in u){o=f;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}x(Mu,bo);function Lu(){Ro.call(this),this.status=1}x(Lu,Ro);function pr(o){this.g=o}x(pr,Ou),pr.prototype.ua=function(){ct(this.g,"a")},pr.prototype.ta=function(o){ct(this.g,new Mu(o))},pr.prototype.sa=function(o){ct(this.g,new Lu)},pr.prototype.ra=function(){ct(this.g,"b")},hi.prototype.createWebChannel=hi.prototype.g,Re.prototype.send=Re.prototype.o,Re.prototype.open=Re.prototype.m,Re.prototype.close=Re.prototype.close,Kf=function(){return new hi},qf=function(){return Js()},$f=$n,Ia={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Zs.NO_ERROR=0,Zs.TIMEOUT=8,Zs.HTTP_ERROR=6,Si=Zs,Zl.COMPLETE="complete",jf=Zl,Gl.EventType=Hr,Hr.OPEN="a",Hr.CLOSE="b",Hr.ERROR="c",Hr.MESSAGE="d",st.prototype.listen=st.prototype.K,cs=Gl,Bt.prototype.listenOnce=Bt.prototype.L,Bt.prototype.getLastError=Bt.prototype.Ka,Bt.prototype.getLastErrorCode=Bt.prototype.Ba,Bt.prototype.getStatus=Bt.prototype.Z,Bt.prototype.getResponseJson=Bt.prototype.Oa,Bt.prototype.getResponseText=Bt.prototype.oa,Bt.prototype.send=Bt.prototype.ea,Bt.prototype.setWithCredentials=Bt.prototype.Ha,Bf=Bt}).apply(typeof _i<"u"?_i:typeof self<"u"?self:typeof window<"u"?window:{});const Vc="@firebase/firestore";/**
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
 */class pe{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}pe.UNAUTHENTICATED=new pe(null),pe.GOOGLE_CREDENTIALS=new pe("google-credentials-uid"),pe.FIRST_PARTY=new pe("first-party-uid"),pe.MOCK_USER=new pe("mock-user");/**
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
 */let Ur="10.14.0";/**
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
 */const er=new Vf("@firebase/firestore");function is(){return er.logLevel}function Y(e,...t){if(er.logLevel<=Et.DEBUG){const n=t.map(ol);er.debug(`Firestore (${Ur}): ${e}`,...n)}}function En(e,...t){if(er.logLevel<=Et.ERROR){const n=t.map(ol);er.error(`Firestore (${Ur}): ${e}`,...n)}}function kr(e,...t){if(er.logLevel<=Et.WARN){const n=t.map(ol);er.warn(`Firestore (${Ur}): ${e}`,...n)}}function ol(e){if(typeof e=="string")return e;try{/**
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
*/return(function(n){return JSON.stringify(n)})(e)}catch{return e}}/**
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
 */function it(e="Unexpected state"){const t=`FIRESTORE (${Ur}) INTERNAL ASSERTION FAILED: `+e;throw En(t),new Error(t)}function Tt(e,t){e||it()}function lt(e,t){return e}/**
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
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class J extends ar{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class mn{constructor(){this.promise=new Promise(((t,n)=>{this.resolve=t,this.reject=n}))}}/**
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
 */class Hf{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ky{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable((()=>n(pe.UNAUTHENTICATED)))}shutdown(){}}class Hy{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,n){this.changeListener=n,t.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class zy{constructor(t){this.t=t,this.currentUser=pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){Tt(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new mn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new mn,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{Y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(Y("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new mn)}}),0),a()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==t?(Y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Tt(typeof r.accessToken=="string"),new Hf(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Tt(t===null||typeof t=="string"),new pe(t)}}class Wy{constructor(t,n,r){this.l=t,this.h=n,this.P=r,this.type="FirstParty",this.user=pe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Gy{constructor(t,n,r){this.l=t,this.h=n,this.P=r}getToken(){return Promise.resolve(new Wy(this.l,this.h,this.P))}start(t,n){t.enqueueRetryable((()=>n(pe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Qy{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xy{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,n){Tt(this.o===void 0);const r=i=>{i.error!=null&&Y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,Y("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{Y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):Y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((n=>n?(Tt(typeof n.token=="string"),this.R=n.token,new Qy(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Yy(e){const t=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class zf{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=Yy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=t.charAt(s[i]%t.length))}return r}}function It(e,t){return e<t?-1:e>t?1:0}function Dr(e,t,n){return e.length===t.length&&e.every(((r,s)=>n(r,t[s])))}/**
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
 */class Xt{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new J(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new J(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new J(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new J(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Xt.fromMillis(Date.now())}static fromDate(t){return Xt.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*n));return new Xt(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?It(this.nanoseconds,t.nanoseconds):It(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class at{constructor(t){this.timestamp=t}static fromTimestamp(t){return new at(t)}static min(){return new at(new Xt(0,0))}static max(){return new at(new Xt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ds{constructor(t,n,r){n===void 0?n=0:n>t.length&&it(),r===void 0?r=t.length-n:r>t.length-n&&it(),this.segments=t,this.offset=n,this.len=r}get length(){return this.len}isEqual(t){return Ds.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof Ds?t.forEach((r=>{n.push(r)})):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,r=this.limit();n<r;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const r=Math.min(t.length,n.length);for(let s=0;s<r;s++){const i=t.get(s),a=n.get(s);if(i<a)return-1;if(i>a)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class Nt extends Ds{construct(t,n,r){return new Nt(t,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const n=[];for(const r of t){if(r.indexOf("//")>=0)throw new J(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Nt(n)}static emptyPath(){return new Nt([])}}const Jy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ie extends Ds{construct(t,n,r){return new ie(t,n,r)}static isValidIdentifier(t){return Jy.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ie.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ie(["__name__"])}static fromServerFormat(t){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new J(O.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new J(O.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new J(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new J(O.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ie(n)}static emptyPath(){return new ie([])}}/**
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
 */class tt{constructor(t){this.path=t}static fromPath(t){return new tt(Nt.fromString(t))}static fromName(t){return new tt(Nt.fromString(t).popFirst(5))}static empty(){return new tt(Nt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Nt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return Nt.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new tt(new Nt(t.slice()))}}function Zy(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=at.fromTimestamp(r===1e9?new Xt(n+1,0):new Xt(n,r));return new Ln(s,tt.empty(),t)}function tv(e){return new Ln(e.readTime,e.key,-1)}class Ln{constructor(t,n,r){this.readTime=t,this.documentKey=n,this.largestBatchId=r}static min(){return new Ln(at.min(),tt.empty(),-1)}static max(){return new Ln(at.max(),tt.empty(),-1)}}function ev(e,t){let n=e.readTime.compareTo(t.readTime);return n!==0?n:(n=tt.comparator(e.documentKey,t.documentKey),n!==0?n:It(e.largestBatchId,t.largestBatchId))}/**
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
 */const nv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
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
 */async function qs(e){if(e.code!==O.FAILED_PRECONDITION||e.message!==nv)throw e;Y("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class U{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&it(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new U(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((t,n)=>{this.next(t,n)}))}wrapUserFunction(t){try{const n=t();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction((()=>t(n))):U.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction((()=>t(n))):U.reject(n)}static resolve(t){return new U(((n,r)=>{n(t)}))}static reject(t){return new U(((n,r)=>{r(t)}))}static waitFor(t){return new U(((n,r)=>{let s=0,i=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&n()}),(c=>r(c)))})),a=!0,i===s&&n()}))}static or(t){let n=U.resolve(!1);for(const r of t)n=n.next((s=>s?U.resolve(s):r()));return n}static forEach(t,n){const r=[];return t.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(t,n){return new U(((r,s)=>{const i=t.length,a=new Array(i);let l=0;for(let c=0;c<i;c++){const d=c;n(t[d]).next((h=>{a[d]=h,++l,l===i&&r(a)}),(h=>s(h)))}}))}static doWhile(t,n){return new U(((r,s)=>{const i=()=>{t()===!0?n().next((()=>{i()}),s):r()};i()}))}}function sv(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ks(e){return e.name==="IndexedDbTransactionError"}/**
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
 */class al{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}al.oe=-1;function Hs(e){return e==null}function $i(e){return e===0&&1/e==-1/0}function iv(e){return typeof e=="number"&&Number.isInteger(e)&&!$i(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
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
 */function xc(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function lr(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Wf(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
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
 */class Ut{constructor(t,n){this.comparator=t,this.root=n||se.EMPTY}insert(t,n){return new Ut(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,se.BLACK,null,null))}remove(t){return new Ut(this.comparator,this.root.remove(t,this.comparator).copy(null,null,se.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(t){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((n,r)=>(t(n,r),!1)))}toString(){const t=[];return this.inorderTraversal(((n,r)=>(t.push(`${n}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new yi(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new yi(this.root,t,this.comparator,!1)}getReverseIterator(){return new yi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new yi(this.root,t,this.comparator,!0)}}class yi{constructor(t,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?r(t.key,n):1,n&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class se{constructor(t,n,r,s,i){this.key=t,this.value=n,this.color=r??se.RED,this.left=s??se.EMPTY,this.right=i??se.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,s,i){return new se(t??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(t,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return se.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,s=this;if(n(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(t,s.key)===0){if(s.right.isEmpty())return se.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw it();const t=this.left.check();if(t!==this.right.check())throw it();return t+(this.isRed()?0:1)}}se.EMPTY=null,se.RED=!0,se.BLACK=!1;se.EMPTY=new class{constructor(){this.size=0}get key(){throw it()}get value(){throw it()}get color(){throw it()}get left(){throw it()}get right(){throw it()}copy(t,n,r,s,i){return this}insert(t,n,r){return new se(t,n)}remove(t,n){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class oe{constructor(t){this.comparator=t,this.data=new Ut(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((n,r)=>(t(n),!1)))}forEachInRange(t,n){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;n(s.key)}}forEachWhile(t,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new kc(this.data.getIterator())}getIteratorFrom(t){return new kc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach((r=>{n=n.add(r)})),n}isEqual(t){if(!(t instanceof oe)||this.size!==t.size)return!1;const n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((n=>{t.push(n)})),t}toString(){const t=[];return this.forEach((n=>t.push(n))),"SortedSet("+t.toString()+")"}copy(t){const n=new oe(this.comparator);return n.data=t,n}}class kc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ce{constructor(t){this.fields=t,t.sort(ie.comparator)}static empty(){return new Ce([])}unionWith(t){let n=new oe(ie.comparator);for(const r of this.fields)n=n.add(r);for(const r of t)n=n.add(r);return new Ce(n.toArray())}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return Dr(this.fields,t.fields,((n,r)=>n.isEqual(r)))}}/**
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
 */class Gf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class le{constructor(t){this.binaryString=t}static fromBase64String(t){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Gf("Invalid base64 string: "+i):i}})(t);return new le(n)}static fromUint8Array(t){const n=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new le(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return It(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}le.EMPTY_BYTE_STRING=new le("");const ov=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Fn(e){if(Tt(!!e),typeof e=="string"){let t=0;const n=ov.exec(e);if(Tt(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Kt(e.seconds),nanos:Kt(e.nanos)}}function Kt(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function nr(e){return typeof e=="string"?le.fromBase64String(e):le.fromUint8Array(e)}/**
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
 */function ll(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function ul(e){const t=e.mapValue.fields.__previous_value__;return ll(t)?ul(t):t}function Ns(e){const t=Fn(e.mapValue.fields.__local_write_time__.timestampValue);return new Xt(t.seconds,t.nanos)}/**
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
 */class av{constructor(t,n,r,s,i,a,l,c,d){this.databaseId=t,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=d}}class Os{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new Os("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Os&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const vi={mapValue:{}};function rr(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ll(e)?4:uv(e)?9007199254740991:lv(e)?10:11:it()}function en(e,t){if(e===t)return!0;const n=rr(e);if(n!==rr(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ns(e).isEqual(Ns(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Fn(s.timestampValue),l=Fn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(e,t);case 5:return e.stringValue===t.stringValue;case 6:return(function(s,i){return nr(s.bytesValue).isEqual(nr(i.bytesValue))})(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return(function(s,i){return Kt(s.geoPointValue.latitude)===Kt(i.geoPointValue.latitude)&&Kt(s.geoPointValue.longitude)===Kt(i.geoPointValue.longitude)})(e,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Kt(s.integerValue)===Kt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Kt(s.doubleValue),l=Kt(i.doubleValue);return a===l?$i(a)===$i(l):isNaN(a)&&isNaN(l)}return!1})(e,t);case 9:return Dr(e.arrayValue.values||[],t.arrayValue.values||[],en);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(xc(a)!==xc(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!en(a[c],l[c])))return!1;return!0})(e,t);default:return it()}}function Ms(e,t){return(e.values||[]).find((n=>en(n,t)))!==void 0}function Nr(e,t){if(e===t)return 0;const n=rr(e),r=rr(t);if(n!==r)return It(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return It(e.booleanValue,t.booleanValue);case 2:return(function(i,a){const l=Kt(i.integerValue||i.doubleValue),c=Kt(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(e,t);case 3:return Dc(e.timestampValue,t.timestampValue);case 4:return Dc(Ns(e),Ns(t));case 5:return It(e.stringValue,t.stringValue);case 6:return(function(i,a){const l=nr(i),c=nr(a);return l.compareTo(c)})(e.bytesValue,t.bytesValue);case 7:return(function(i,a){const l=i.split("/"),c=a.split("/");for(let d=0;d<l.length&&d<c.length;d++){const h=It(l[d],c[d]);if(h!==0)return h}return It(l.length,c.length)})(e.referenceValue,t.referenceValue);case 8:return(function(i,a){const l=It(Kt(i.latitude),Kt(a.latitude));return l!==0?l:It(Kt(i.longitude),Kt(a.longitude))})(e.geoPointValue,t.geoPointValue);case 9:return Nc(e.arrayValue,t.arrayValue);case 10:return(function(i,a){var l,c,d,h;const g=i.fields||{},T=a.fields||{},R=(l=g.value)===null||l===void 0?void 0:l.arrayValue,x=(c=T.value)===null||c===void 0?void 0:c.arrayValue,D=It(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((h=x==null?void 0:x.values)===null||h===void 0?void 0:h.length)||0);return D!==0?D:Nc(R,x)})(e.mapValue,t.mapValue);case 11:return(function(i,a){if(i===vi.mapValue&&a===vi.mapValue)return 0;if(i===vi.mapValue)return 1;if(a===vi.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),d=a.fields||{},h=Object.keys(d);c.sort(),h.sort();for(let g=0;g<c.length&&g<h.length;++g){const T=It(c[g],h[g]);if(T!==0)return T;const R=Nr(l[c[g]],d[h[g]]);if(R!==0)return R}return It(c.length,h.length)})(e.mapValue,t.mapValue);default:throw it()}}function Dc(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return It(e,t);const n=Fn(e),r=Fn(t),s=It(n.seconds,r.seconds);return s!==0?s:It(n.nanos,r.nanos)}function Nc(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Nr(n[s],r[s]);if(i)return i}return It(n.length,r.length)}function Or(e){return Aa(e)}function Aa(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?(function(n){const r=Fn(n);return`time(${r.seconds},${r.nanos})`})(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?(function(n){return nr(n).toBase64()})(e.bytesValue):"referenceValue"in e?(function(n){return tt.fromName(n).toString()})(e.referenceValue):"geoPointValue"in e?(function(n){return`geo(${n.latitude},${n.longitude})`})(e.geoPointValue):"arrayValue"in e?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Aa(i);return r+"]"})(e.arrayValue):"mapValue"in e?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Aa(n.fields[a])}`;return s+"}"})(e.mapValue):it()}function ba(e){return!!e&&"integerValue"in e}function cl(e){return!!e&&"arrayValue"in e}function Oc(e){return!!e&&"nullValue"in e}function Mc(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Pi(e){return!!e&&"mapValue"in e}function lv(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Es(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return lr(e.mapValue.fields,((n,r)=>t.mapValue.fields[n]=Es(r))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Es(e.arrayValue.values[n]);return t}return Object.assign({},e)}function uv(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class we{constructor(t){this.value=t}static empty(){return new we({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let r=0;r<t.length-1;++r)if(n=(n.mapValue.fields||{})[t.get(r)],!Pi(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=Es(n)}setAll(t){let n=ie.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}a?r[l.lastSegment()]=Es(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(t){const n=this.field(t.popLast());Pi(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return en(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=n.mapValue.fields[t.get(r)];Pi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[t.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(t,n,r){lr(n,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new we(Es(this.value))}}function Qf(e){const t=[];return lr(e.fields,((n,r)=>{const s=new ie([n]);if(Pi(r)){const i=Qf(r.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Ce(t)}/**
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
 */class Zt{constructor(t,n,r,s,i,a,l){this.key=t,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(t){return new Zt(t,0,at.min(),at.min(),at.min(),we.empty(),0)}static newFoundDocument(t,n,r,s){return new Zt(t,1,n,at.min(),r,s,0)}static newNoDocument(t,n){return new Zt(t,2,n,at.min(),at.min(),we.empty(),0)}static newUnknownDocument(t,n){return new Zt(t,3,n,at.min(),at.min(),we.empty(),2)}convertToFoundDocument(t,n){return!this.createTime.isEqual(at.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=we.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=we.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=at.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Zt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Zt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class qi{constructor(t,n){this.position=t,this.inclusive=n}}function Lc(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],a=e.position[s];if(i.field.isKeyField()?r=tt.comparator(tt.fromName(a.referenceValue),n.key):r=Nr(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fc(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!en(e.position[n],t.position[n]))return!1;return!0}/**
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
 */class Ki{constructor(t,n="asc"){this.field=t,this.dir=n}}function cv(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}/**
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
 */class Xf{}class Qt extends Xf{constructor(t,n,r){super(),this.field=t,this.op=n,this.value=r}static create(t,n,r){return t.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(t,n,r):new fv(t,n,r):n==="array-contains"?new mv(t,r):n==="in"?new gv(t,r):n==="not-in"?new _v(t,r):n==="array-contains-any"?new yv(t,r):new Qt(t,n,r)}static createKeyFieldInFilter(t,n,r){return n==="in"?new dv(t,r):new pv(t,r)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Nr(n,this.value)):n!==null&&rr(this.value)===rr(n)&&this.matchesComparison(Nr(n,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return it()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class nn extends Xf{constructor(t,n){super(),this.filters=t,this.op=n,this.ae=null}static create(t,n){return new nn(t,n)}matches(t){return Yf(this)?this.filters.find((n=>!n.matches(t)))===void 0:this.filters.find((n=>n.matches(t)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((t,n)=>t.concat(n.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Yf(e){return e.op==="and"}function Jf(e){return hv(e)&&Yf(e)}function hv(e){for(const t of e.filters)if(t instanceof nn)return!1;return!0}function Ra(e){if(e instanceof Qt)return e.field.canonicalString()+e.op.toString()+Or(e.value);if(Jf(e))return e.filters.map((t=>Ra(t))).join(",");{const t=e.filters.map((n=>Ra(n))).join(",");return`${e.op}(${t})`}}function Zf(e,t){return e instanceof Qt?(function(r,s){return s instanceof Qt&&r.op===s.op&&r.field.isEqual(s.field)&&en(r.value,s.value)})(e,t):e instanceof nn?(function(r,s){return s instanceof nn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&Zf(a,s.filters[l])),!0):!1})(e,t):void it()}function td(e){return e instanceof Qt?(function(n){return`${n.field.canonicalString()} ${n.op} ${Or(n.value)}`})(e):e instanceof nn?(function(n){return n.op.toString()+" {"+n.getFilters().map(td).join(" ,")+"}"})(e):"Filter"}class fv extends Qt{constructor(t,n,r){super(t,n,r),this.key=tt.fromName(r.referenceValue)}matches(t){const n=tt.comparator(t.key,this.key);return this.matchesComparison(n)}}class dv extends Qt{constructor(t,n){super(t,"in",n),this.keys=ed("in",n)}matches(t){return this.keys.some((n=>n.isEqual(t.key)))}}class pv extends Qt{constructor(t,n){super(t,"not-in",n),this.keys=ed("not-in",n)}matches(t){return!this.keys.some((n=>n.isEqual(t.key)))}}function ed(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map((r=>tt.fromName(r.referenceValue)))}class mv extends Qt{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return cl(n)&&Ms(n.arrayValue,this.value)}}class gv extends Qt{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&Ms(this.value.arrayValue,n)}}class _v extends Qt{constructor(t,n){super(t,"not-in",n)}matches(t){if(Ms(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!Ms(this.value.arrayValue,n)}}class yv extends Qt{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!cl(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Ms(this.value.arrayValue,r)))}}/**
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
 */class vv{constructor(t,n=null,r=[],s=[],i=null,a=null,l=null){this.path=t,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function Uc(e,t=null,n=[],r=[],s=null,i=null,a=null){return new vv(e,t,n,r,s,i,a)}function hl(e){const t=lt(e);if(t.ue===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map((r=>Ra(r))).join(","),n+="|ob:",n+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Hs(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((r=>Or(r))).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((r=>Or(r))).join(",")),t.ue=n}return t.ue}function fl(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!cv(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Zf(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Fc(e.startAt,t.startAt)&&Fc(e.endAt,t.endAt)}function Sa(e){return tt.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}/**
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
 */class co{constructor(t,n=null,r=[],s=[],i=null,a="F",l=null,c=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ev(e,t,n,r,s,i,a,l){return new co(e,t,n,r,s,i,a,l)}function dl(e){return new co(e)}function Bc(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function Tv(e){return e.collectionGroup!==null}function Ts(e){const t=lt(e);if(t.ce===null){t.ce=[];const n=new Set;for(const i of t.explicitOrderBy)t.ce.push(i),n.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new oe(ie.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(t).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||t.ce.push(new Ki(i,r))})),n.has(ie.keyField().canonicalString())||t.ce.push(new Ki(ie.keyField(),r))}return t.ce}function Je(e){const t=lt(e);return t.le||(t.le=wv(t,Ts(e))),t.le}function wv(e,t){if(e.limitType==="F")return Uc(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Ki(s.field,i)}));const n=e.endAt?new qi(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new qi(e.startAt.position,e.startAt.inclusive):null;return Uc(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Pa(e,t,n){return new co(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function ho(e,t){return fl(Je(e),Je(t))&&e.limitType===t.limitType}function nd(e){return`${hl(Je(e))}|lt:${e.limitType}`}function Er(e){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>td(s))).join(", ")}]`),Hs(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Or(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Or(s))).join(",")),`Target(${r})`})(Je(e))}; limitType=${e.limitType})`}function fo(e,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):tt.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(e,t)&&(function(r,s){for(const i of Ts(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(e,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(e,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,c){const d=Lc(a,l,c);return a.inclusive?d<=0:d<0})(r.startAt,Ts(r),s)||r.endAt&&!(function(a,l,c){const d=Lc(a,l,c);return a.inclusive?d>=0:d>0})(r.endAt,Ts(r),s))})(e,t)}function Iv(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function rd(e){return(t,n)=>{let r=!1;for(const s of Ts(e)){const i=Av(s,t,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Av(e,t,n){const r=e.field.isKeyField()?tt.comparator(t.key,n.key):(function(i,a,l){const c=a.data.field(i),d=l.data.field(i);return c!==null&&d!==null?Nr(c,d):it()})(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return it()}}/**
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
 */class Br{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={},this.innerSize=0}get(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,n]);s.push([t,n]),this.innerSize++}delete(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){lr(this.inner,((n,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return Wf(this.inner)}size(){return this.innerSize}}/**
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
 */const bv=new Ut(tt.comparator);function Tn(){return bv}const sd=new Ut(tt.comparator);function hs(...e){let t=sd;for(const n of e)t=t.insert(n.key,n);return t}function id(e){let t=sd;return e.forEach(((n,r)=>t=t.insert(n,r.overlayedDocument))),t}function Xn(){return ws()}function od(){return ws()}function ws(){return new Br((e=>e.toString()),((e,t)=>e.isEqual(t)))}const Rv=new Ut(tt.comparator),Sv=new oe(tt.comparator);function gt(...e){let t=Sv;for(const n of e)t=t.add(n);return t}const Pv=new oe(It);function Cv(){return Pv}/**
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
 */function pl(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:$i(t)?"-0":t}}function ad(e){return{integerValue:""+e}}function Vv(e,t){return iv(t)?ad(t):pl(e,t)}/**
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
 */class po{constructor(){this._=void 0}}function xv(e,t,n){return e instanceof Hi?(function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ll(i)&&(i=ul(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}})(n,t):e instanceof Ls?ud(e,t):e instanceof Fs?cd(e,t):(function(s,i){const a=ld(s,i),l=jc(a)+jc(s.Pe);return ba(a)&&ba(s.Pe)?ad(l):pl(s.serializer,l)})(e,t)}function kv(e,t,n){return e instanceof Ls?ud(e,t):e instanceof Fs?cd(e,t):n}function ld(e,t){return e instanceof zi?(function(r){return ba(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Hi extends po{}class Ls extends po{constructor(t){super(),this.elements=t}}function ud(e,t){const n=hd(t);for(const r of e.elements)n.some((s=>en(s,r)))||n.push(r);return{arrayValue:{values:n}}}class Fs extends po{constructor(t){super(),this.elements=t}}function cd(e,t){let n=hd(t);for(const r of e.elements)n=n.filter((s=>!en(s,r)));return{arrayValue:{values:n}}}class zi extends po{constructor(t,n){super(),this.serializer=t,this.Pe=n}}function jc(e){return Kt(e.integerValue||e.doubleValue)}function hd(e){return cl(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function Dv(e,t){return e.field.isEqual(t.field)&&(function(r,s){return r instanceof Ls&&s instanceof Ls||r instanceof Fs&&s instanceof Fs?Dr(r.elements,s.elements,en):r instanceof zi&&s instanceof zi?en(r.Pe,s.Pe):r instanceof Hi&&s instanceof Hi})(e.transform,t.transform)}class Nv{constructor(t,n){this.version=t,this.transformResults=n}}class Ae{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new Ae}static exists(t){return new Ae(void 0,t)}static updateTime(t){return new Ae(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ci(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class mo{}function fd(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new ml(e.key,Ae.none()):new zs(e.key,e.data,Ae.none());{const n=e.data,r=we.empty();let s=new oe(ie.comparator);for(let i of t.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Bn(e.key,r,new Ce(s.toArray()),Ae.none())}}function Ov(e,t,n){e instanceof zs?(function(s,i,a){const l=s.value.clone(),c=qc(s.fieldTransforms,i,a.transformResults);l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(e,t,n):e instanceof Bn?(function(s,i,a){if(!Ci(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=qc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(dd(s)),c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(e,t,n):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,n)}function Is(e,t,n,r){return e instanceof zs?(function(i,a,l,c){if(!Ci(i.precondition,a))return l;const d=i.value.clone(),h=Kc(i.fieldTransforms,c,a);return d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(e,t,n,r):e instanceof Bn?(function(i,a,l,c){if(!Ci(i.precondition,a))return l;const d=Kc(i.fieldTransforms,c,a),h=a.data;return h.setAll(dd(i)),h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((g=>g.field)))})(e,t,n,r):(function(i,a,l){return Ci(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(e,t,n)}function Mv(e,t){let n=null;for(const r of e.fieldTransforms){const s=t.data.field(r.field),i=ld(r.transform,s||null);i!=null&&(n===null&&(n=we.empty()),n.set(r.field,i))}return n||null}function $c(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Dr(r,s,((i,a)=>Dv(i,a)))})(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class zs extends mo{constructor(t,n,r,s=[]){super(),this.key=t,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Bn extends mo{constructor(t,n,r,s,i=[]){super(),this.key=t,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function dd(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function qc(e,t,n){const r=new Map;Tt(e.length===n.length);for(let s=0;s<n.length;s++){const i=e[s],a=i.transform,l=t.data.field(i.field);r.set(i.field,kv(a,l,n[s]))}return r}function Kc(e,t,n){const r=new Map;for(const s of e){const i=s.transform,a=n.data.field(s.field);r.set(s.field,xv(i,a,t))}return r}class ml extends mo{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pd extends mo{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Lv{constructor(t,n,r,s){this.batchId=t,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Ov(i,t,r[s])}}applyToLocalView(t,n){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(n=Is(r,t,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(n=Is(r,t,n,this.localWriteTime));return n}applyToLocalDocumentSet(t,n){const r=od();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=n.has(s.key)?null:l;const c=fd(a,l);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(at.min())})),r}keys(){return this.mutations.reduce(((t,n)=>t.add(n.key)),gt())}isEqual(t){return this.batchId===t.batchId&&Dr(this.mutations,t.mutations,((n,r)=>$c(n,r)))&&Dr(this.baseMutations,t.baseMutations,((n,r)=>$c(n,r)))}}class gl{constructor(t,n,r,s){this.batch=t,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(t,n,r){Tt(t.mutations.length===r.length);let s=(function(){return Rv})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new gl(t,n,r,s)}}/**
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
 */class Fv{constructor(t,n){this.largestBatchId=t,this.mutation=n}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class Uv{constructor(t,n){this.count=t,this.unchangedNames=n}}/**
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
 */var Gt,yt;function md(e){switch(e){default:return it();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0}}function gd(e){if(e===void 0)return En("GRPC error has no .code"),O.UNKNOWN;switch(e){case Gt.OK:return O.OK;case Gt.CANCELLED:return O.CANCELLED;case Gt.UNKNOWN:return O.UNKNOWN;case Gt.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case Gt.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case Gt.INTERNAL:return O.INTERNAL;case Gt.UNAVAILABLE:return O.UNAVAILABLE;case Gt.UNAUTHENTICATED:return O.UNAUTHENTICATED;case Gt.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case Gt.NOT_FOUND:return O.NOT_FOUND;case Gt.ALREADY_EXISTS:return O.ALREADY_EXISTS;case Gt.PERMISSION_DENIED:return O.PERMISSION_DENIED;case Gt.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case Gt.ABORTED:return O.ABORTED;case Gt.OUT_OF_RANGE:return O.OUT_OF_RANGE;case Gt.UNIMPLEMENTED:return O.UNIMPLEMENTED;case Gt.DATA_LOSS:return O.DATA_LOSS;default:return it()}}(yt=Gt||(Gt={}))[yt.OK=0]="OK",yt[yt.CANCELLED=1]="CANCELLED",yt[yt.UNKNOWN=2]="UNKNOWN",yt[yt.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",yt[yt.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",yt[yt.NOT_FOUND=5]="NOT_FOUND",yt[yt.ALREADY_EXISTS=6]="ALREADY_EXISTS",yt[yt.PERMISSION_DENIED=7]="PERMISSION_DENIED",yt[yt.UNAUTHENTICATED=16]="UNAUTHENTICATED",yt[yt.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",yt[yt.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",yt[yt.ABORTED=10]="ABORTED",yt[yt.OUT_OF_RANGE=11]="OUT_OF_RANGE",yt[yt.UNIMPLEMENTED=12]="UNIMPLEMENTED",yt[yt.INTERNAL=13]="INTERNAL",yt[yt.UNAVAILABLE=14]="UNAVAILABLE",yt[yt.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Bv(){return new TextEncoder}/**
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
 */const jv=new Zn([4294967295,4294967295],0);function Hc(e){const t=Bv().encode(e),n=new Uf;return n.update(t),new Uint8Array(n.digest())}function zc(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Zn([n,r],0),new Zn([s,i],0)]}class _l{constructor(t,n,r){if(this.bitmap=t,this.padding=n,this.hashCount=r,n<0||n>=8)throw new fs(`Invalid padding: ${n}`);if(r<0)throw new fs(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new fs(`Invalid hash count: ${r}`);if(t.length===0&&n!==0)throw new fs(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*t.length-n,this.Te=Zn.fromNumber(this.Ie)}Ee(t,n,r){let s=t.add(n.multiply(Zn.fromNumber(r)));return s.compare(jv)===1&&(s=new Zn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const n=Hc(t),[r,s]=zc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(t,n,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new _l(i,s,n);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.Ie===0)return;const n=Hc(t),[r,s]=zc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(t){const n=Math.floor(t/8),r=t%8;this.bitmap[n]|=1<<r}}class fs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class go{constructor(t,n,r,s,i){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,r){const s=new Map;return s.set(t,Ws.createSynthesizedTargetChangeForCurrentChange(t,n,r)),new go(at.min(),s,new Ut(It),Tn(),gt())}}class Ws{constructor(t,n,r,s,i){this.resumeToken=t,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,r){return new Ws(r,n,gt(),gt(),gt())}}/**
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
 */class Vi{constructor(t,n,r,s){this.Re=t,this.removedTargetIds=n,this.key=r,this.Ve=s}}class _d{constructor(t,n){this.targetId=t,this.me=n}}class yd{constructor(t,n,r=le.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Wc{constructor(){this.fe=0,this.ge=Qc(),this.pe=le.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=gt(),n=gt(),r=gt();return this.ge.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:it()}})),new Ws(this.pe,this.ye,t,n,r)}Ce(){this.we=!1,this.ge=Qc()}Fe(t,n){this.we=!0,this.ge=this.ge.insert(t,n)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,Tt(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class $v{constructor(t){this.Le=t,this.Be=new Map,this.ke=Tn(),this.qe=Gc(),this.Qe=new Ut(It)}Ke(t){for(const n of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(n,t.Ve):this.Ue(n,t.key,t.Ve);for(const n of t.removedTargetIds)this.Ue(n,t.key,t.Ve)}We(t){this.forEachTarget(t,(n=>{const r=this.Ge(n);switch(t.state){case 0:this.ze(n)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(t.resumeToken));break;default:it()}}))}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.Be.forEach(((r,s)=>{this.ze(s)&&n(s)}))}He(t){const n=t.targetId,r=t.me.count,s=this.Je(n);if(s){const i=s.target;if(Sa(i))if(r===0){const a=new tt(i.path);this.Ue(n,a,Zt.newNoDocument(a,at.min()))}else Tt(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(t),c=l?this.Xe(l,t,a):1;if(c!==0){this.je(n);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(t){const n=t.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,l;try{a=nr(r).toUint8Array()}catch(c){if(c instanceof Gf)return kr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new _l(a,s,i)}catch(c){return kr(c instanceof fs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(t,n,r){return n.me.count===r-this.nt(t,n.targetId)?0:2}nt(t,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(l)||(this.Ue(n,i,null),s++)})),s}rt(t){const n=new Map;this.Be.forEach(((i,a)=>{const l=this.Je(a);if(l){if(i.current&&Sa(l.target)){const c=new tt(l.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,Zt.newNoDocument(c,t))}i.be&&(n.set(a,i.ve()),i.Ce())}}));let r=gt();this.qe.forEach(((i,a)=>{let l=!0;a.forEachWhile((c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.ke.forEach(((i,a)=>a.setReadTime(t)));const s=new go(t,n,this.Qe,this.ke,r);return this.ke=Tn(),this.qe=Gc(),this.Qe=new Ut(It),s}$e(t,n){if(!this.ze(t))return;const r=this.it(t,n.key)?2:0;this.Ge(t).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(t))}Ue(t,n,r){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(t)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const n=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let n=this.Be.get(t);return n||(n=new Wc,this.Be.set(t,n)),n}st(t){let n=this.qe.get(t);return n||(n=new oe(It),this.qe=this.qe.insert(t,n)),n}ze(t){const n=this.Je(t)!==null;return n||Y("WatchChangeAggregator","Detected inactive target",t),n}Je(t){const n=this.Be.get(t);return n&&n.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Wc),this.Le.getRemoteKeysForTarget(t).forEach((n=>{this.Ue(t,n,null)}))}it(t,n){return this.Le.getRemoteKeysForTarget(t).has(n)}}function Gc(){return new Ut(tt.comparator)}function Qc(){return new Ut(tt.comparator)}const qv={asc:"ASCENDING",desc:"DESCENDING"},Kv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Hv={and:"AND",or:"OR"};class zv{constructor(t,n){this.databaseId=t,this.useProto3Json=n}}function Ca(e,t){return e.useProto3Json||Hs(t)?t:{value:t}}function Wi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function vd(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Wv(e,t){return Wi(e,t.toTimestamp())}function xe(e){return Tt(!!e),at.fromTimestamp((function(n){const r=Fn(n);return new Xt(r.seconds,r.nanos)})(e))}function yl(e,t){return Va(e,t).canonicalString()}function Va(e,t){const n=(function(s){return new Nt(["projects",s.projectId,"databases",s.database])})(e).child("documents");return t===void 0?n:n.child(t)}function Ed(e){const t=Nt.fromString(e);return Tt(Rd(t)),t}function Gi(e,t){return yl(e.databaseId,t.path)}function As(e,t){const n=Ed(t);if(n.get(1)!==e.databaseId.projectId)throw new J(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new J(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new tt(wd(n))}function Td(e,t){return yl(e.databaseId,t)}function Gv(e){const t=Ed(e);return t.length===4?Nt.emptyPath():wd(t)}function xa(e){return new Nt(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function wd(e){return Tt(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function Xc(e,t,n){return{name:Gi(e,t),fields:n.value.mapValue.fields}}function Qv(e,t){return"found"in t?(function(r,s){Tt(!!s.found),s.found.name,s.found.updateTime;const i=As(r,s.found.name),a=xe(s.found.updateTime),l=s.found.createTime?xe(s.found.createTime):at.min(),c=new we({mapValue:{fields:s.found.fields}});return Zt.newFoundDocument(i,a,l,c)})(e,t):"missing"in t?(function(r,s){Tt(!!s.missing),Tt(!!s.readTime);const i=As(r,s.missing),a=xe(s.readTime);return Zt.newNoDocument(i,a)})(e,t):it()}function Xv(e,t){let n;if("targetChange"in t){t.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:it()})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(d,h){return d.useProto3Json?(Tt(h===void 0||typeof h=="string"),le.fromBase64String(h||"")):(Tt(h===void 0||h instanceof Buffer||h instanceof Uint8Array),le.fromUint8Array(h||new Uint8Array))})(e,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(d){const h=d.code===void 0?O.UNKNOWN:gd(d.code);return new J(h,d.message||"")})(a);n=new yd(r,s,i,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=As(e,r.document.name),i=xe(r.document.updateTime),a=r.document.createTime?xe(r.document.createTime):at.min(),l=new we({mapValue:{fields:r.document.fields}}),c=Zt.newFoundDocument(s,i,a,l),d=r.targetIds||[],h=r.removedTargetIds||[];n=new Vi(d,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=As(e,r.document),i=r.readTime?xe(r.readTime):at.min(),a=Zt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Vi([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=As(e,r.document),i=r.removedTargetIds||[];n=new Vi([],i,s,null)}else{if(!("filter"in t))return it();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Uv(s,i),l=r.targetId;n=new _d(l,a)}}return n}function Id(e,t){let n;if(t instanceof zs)n={update:Xc(e,t.key,t.value)};else if(t instanceof ml)n={delete:Gi(e,t.key)};else if(t instanceof Bn)n={update:Xc(e,t.key,t.data),updateMask:iE(t.fieldMask)};else{if(!(t instanceof pd))return it();n={verify:Gi(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof Hi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ls)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Fs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof zi)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw it()})(0,r)))),t.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Wv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:it()})(e,t.precondition)),n}function Yv(e,t){return e&&e.length>0?(Tt(t!==void 0),e.map((n=>(function(s,i){let a=s.updateTime?xe(s.updateTime):xe(i);return a.isEqual(at.min())&&(a=xe(i)),new Nv(a,s.transformResults||[])})(n,t)))):[]}function Jv(e,t){return{documents:[Td(e,t.path)]}}function Zv(e,t){const n={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Td(e,s);const i=(function(d){if(d.length!==0)return bd(nn.create(d,"and"))})(t.filters);i&&(n.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((h=>(function(T){return{field:Tr(T.field),direction:nE(T.dir)}})(h)))})(t.orderBy);a&&(n.structuredQuery.orderBy=a);const l=Ca(e,t.limit);return l!==null&&(n.structuredQuery.limit=l),t.startAt&&(n.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(n.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{_t:n,parent:s}}function tE(e){let t=Gv(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Tt(r===1);const h=n.from[0];h.allDescendants?s=h.collectionId:t=t.child(h.collectionId)}let i=[];n.where&&(i=(function(g){const T=Ad(g);return T instanceof nn&&Jf(T)?T.getFilters():[T]})(n.where));let a=[];n.orderBy&&(a=(function(g){return g.map((T=>(function(x){return new Ki(wr(x.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(x.direction))})(T)))})(n.orderBy));let l=null;n.limit&&(l=(function(g){let T;return T=typeof g=="object"?g.value:g,Hs(T)?null:T})(n.limit));let c=null;n.startAt&&(c=(function(g){const T=!!g.before,R=g.values||[];return new qi(R,T)})(n.startAt));let d=null;return n.endAt&&(d=(function(g){const T=!g.before,R=g.values||[];return new qi(R,T)})(n.endAt)),Ev(t,s,a,i,l,"F",c,d)}function eE(e,t){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return it()}})(t.purpose);return n==null?null:{"goog-listen-tags":n}}function Ad(e){return e.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=wr(n.unaryFilter.field);return Qt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=wr(n.unaryFilter.field);return Qt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=wr(n.unaryFilter.field);return Qt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=wr(n.unaryFilter.field);return Qt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return it()}})(e):e.fieldFilter!==void 0?(function(n){return Qt.create(wr(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return it()}})(n.fieldFilter.op),n.fieldFilter.value)})(e):e.compositeFilter!==void 0?(function(n){return nn.create(n.compositeFilter.filters.map((r=>Ad(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return it()}})(n.compositeFilter.op))})(e):it()}function nE(e){return qv[e]}function rE(e){return Kv[e]}function sE(e){return Hv[e]}function Tr(e){return{fieldPath:e.canonicalString()}}function wr(e){return ie.fromServerFormat(e.fieldPath)}function bd(e){return e instanceof Qt?(function(n){if(n.op==="=="){if(Mc(n.value))return{unaryFilter:{field:Tr(n.field),op:"IS_NAN"}};if(Oc(n.value))return{unaryFilter:{field:Tr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Mc(n.value))return{unaryFilter:{field:Tr(n.field),op:"IS_NOT_NAN"}};if(Oc(n.value))return{unaryFilter:{field:Tr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tr(n.field),op:rE(n.op),value:n.value}}})(e):e instanceof nn?(function(n){const r=n.getFilters().map((s=>bd(s)));return r.length===1?r[0]:{compositeFilter:{op:sE(n.op),filters:r}}})(e):it()}function iE(e){const t=[];return e.fields.forEach((n=>t.push(n.canonicalString()))),{fieldPaths:t}}function Rd(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
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
 */class Cn{constructor(t,n,r,s,i=at.min(),a=at.min(),l=le.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(t){return new Cn(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class oE{constructor(t){this.ct=t}}function aE(e){const t=tE({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?Pa(t,t.limit,"L"):t}/**
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
 */class lE{constructor(){this.un=new uE}addToCollectionParentIndex(t,n){return this.un.add(n),U.resolve()}getCollectionParents(t,n){return U.resolve(this.un.getEntries(n))}addFieldIndex(t,n){return U.resolve()}deleteFieldIndex(t,n){return U.resolve()}deleteAllFieldIndexes(t){return U.resolve()}createTargetIndexes(t,n){return U.resolve()}getDocumentsMatchingTarget(t,n){return U.resolve(null)}getIndexType(t,n){return U.resolve(0)}getFieldIndexes(t,n){return U.resolve([])}getNextCollectionGroupToUpdate(t){return U.resolve(null)}getMinOffset(t,n){return U.resolve(Ln.min())}getMinOffsetFromCollectionGroup(t,n){return U.resolve(Ln.min())}updateCollectionGroup(t,n,r){return U.resolve()}updateIndexEntries(t,n){return U.resolve()}}class uE{constructor(){this.index={}}add(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n]||new oe(Nt.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(t){return(this.index[t]||new oe(Nt.comparator)).toArray()}}/**
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
 */class Mr{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Mr(0)}static kn(){return new Mr(-1)}}/**
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
 */class cE{constructor(){this.changes=new Br((t=>t.toString()),((t,n)=>t.isEqual(n))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,Zt.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class hE{constructor(t,n){this.overlayedDocument=t,this.mutatedFields=n}}/**
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
 */class fE{constructor(t,n,r,s){this.remoteDocumentCache=t,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,n){let r=null;return this.documentOverlayCache.getOverlay(t,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,n)))).next((s=>(r!==null&&Is(r.mutation,s,Ce.empty(),Xt.now()),s)))}getDocuments(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.getLocalViewOfDocuments(t,r,gt()).next((()=>r))))}getLocalViewOfDocuments(t,n,r=gt()){const s=Xn();return this.populateOverlays(t,s,n).next((()=>this.computeViews(t,n,s,r).next((i=>{let a=hs();return i.forEach(((l,c)=>{a=a.insert(l,c.overlayedDocument)})),a}))))}getOverlayedDocuments(t,n){const r=Xn();return this.populateOverlays(t,r,n).next((()=>this.computeViews(t,n,r,gt())))}populateOverlays(t,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,l)=>{n.set(a,l)}))}))}computeViews(t,n,r,s){let i=Tn();const a=ws(),l=(function(){return ws()})();return n.forEach(((c,d)=>{const h=r.get(d.key);s.has(d.key)&&(h===void 0||h.mutation instanceof Bn)?i=i.insert(d.key,d):h!==void 0?(a.set(d.key,h.mutation.getFieldMask()),Is(h.mutation,d,h.mutation.getFieldMask(),Xt.now())):a.set(d.key,Ce.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((d,h)=>a.set(d,h))),n.forEach(((d,h)=>{var g;return l.set(d,new hE(h,(g=a.get(d))!==null&&g!==void 0?g:null))})),l)))}recalculateAndSaveOverlays(t,n){const r=ws();let s=new Ut(((a,l)=>a-l)),i=gt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,n).next((a=>{for(const l of a)l.keys().forEach((c=>{const d=n.get(c);if(d===null)return;let h=r.get(c)||Ce.empty();h=l.applyToLocalView(d,h),r.set(c,h);const g=(s.get(l.batchId)||gt()).add(c);s=s.insert(l.batchId,g)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),d=c.key,h=c.value,g=od();h.forEach((T=>{if(!i.has(T)){const R=fd(n.get(T),r.get(T));R!==null&&g.set(T,R),i=i.add(T)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,g))}return U.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,n,r,s){return(function(a){return tt.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(t,n.path):Tv(n)?this.getDocumentsMatchingCollectionGroupQuery(t,n,r,s):this.getDocumentsMatchingCollectionQuery(t,n,r,s)}getNextDocuments(t,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,n,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,n,r.largestBatchId,s-i.size):U.resolve(Xn());let l=-1,c=i;return a.next((d=>U.forEach(d,((h,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),i.get(h)?U.resolve():this.remoteDocumentCache.getEntry(t,h).next((T=>{c=c.insert(h,T)}))))).next((()=>this.populateOverlays(t,d,i))).next((()=>this.computeViews(t,c,d,gt()))).next((h=>({batchId:l,changes:id(h)})))))}))}getDocumentsMatchingDocumentQuery(t,n){return this.getDocument(t,new tt(n)).next((r=>{let s=hs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,n,r,s){const i=n.collectionGroup;let a=hs();return this.indexManager.getCollectionParents(t,i).next((l=>U.forEach(l,(c=>{const d=(function(g,T){return new co(T,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)})(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next((h=>{h.forEach(((g,T)=>{a=a.insert(g,T)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,n.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,n,r,i,s)))).next((a=>{i.forEach(((c,d)=>{const h=d.getKey();a.get(h)===null&&(a=a.insert(h,Zt.newInvalidDocument(h)))}));let l=hs();return a.forEach(((c,d)=>{const h=i.get(c);h!==void 0&&Is(h.mutation,d,Ce.empty(),Xt.now()),fo(n,d)&&(l=l.insert(c,d))})),l}))}}/**
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
 */class dE{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,n){return U.resolve(this.hr.get(n))}saveBundleMetadata(t,n){return this.hr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:xe(s.createTime)}})(n)),U.resolve()}getNamedQuery(t,n){return U.resolve(this.Pr.get(n))}saveNamedQuery(t,n){return this.Pr.set(n.name,(function(s){return{name:s.name,query:aE(s.bundledQuery),readTime:xe(s.readTime)}})(n)),U.resolve()}}/**
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
 */class pE{constructor(){this.overlays=new Ut(tt.comparator),this.Ir=new Map}getOverlay(t,n){return U.resolve(this.overlays.get(n))}getOverlays(t,n){const r=Xn();return U.forEach(n,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,n,r){return r.forEach(((s,i)=>{this.ht(t,n,i)})),U.resolve()}removeOverlaysForBatchId(t,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ir.delete(r)),U.resolve()}getOverlaysForCollection(t,n,r){const s=Xn(),i=n.length+1,a=new tt(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,d=c.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return U.resolve(s)}getOverlaysForCollectionGroup(t,n,r,s){let i=new Ut(((d,h)=>d-h));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let h=i.get(d.largestBatchId);h===null&&(h=Xn(),i=i.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const l=Xn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((d,h)=>l.set(d,h))),!(l.size()>=s)););return U.resolve(l)}ht(t,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Fv(n,r));let i=this.Ir.get(n);i===void 0&&(i=gt(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class mE{constructor(){this.sessionToken=le.EMPTY_BYTE_STRING}getSessionToken(t){return U.resolve(this.sessionToken)}setSessionToken(t,n){return this.sessionToken=n,U.resolve()}}/**
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
 */class vl{constructor(){this.Tr=new oe(Jt.Er),this.dr=new oe(Jt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,n){const r=new Jt(t,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,n){t.forEach((r=>this.addReference(r,n)))}removeReference(t,n){this.Vr(new Jt(t,n))}mr(t,n){t.forEach((r=>this.removeReference(r,n)))}gr(t){const n=new tt(new Nt([])),r=new Jt(n,t),s=new Jt(n,t+1),i=[];return this.dr.forEachInRange([r,s],(a=>{this.Vr(a),i.push(a.key)})),i}pr(){this.Tr.forEach((t=>this.Vr(t)))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const n=new tt(new Nt([])),r=new Jt(n,t),s=new Jt(n,t+1);let i=gt();return this.dr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const n=new Jt(t,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&t.isEqual(r.key)}}class Jt{constructor(t,n){this.key=t,this.wr=n}static Er(t,n){return tt.comparator(t.key,n.key)||It(t.wr,n.wr)}static Ar(t,n){return It(t.wr,n.wr)||tt.comparator(t.key,n.key)}}/**
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
 */class gE{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new oe(Jt.Er)}checkEmpty(t){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(t,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Lv(i,n,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new Jt(l.key,i)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return U.resolve(a)}lookupMutationBatch(t,n){return U.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(t,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const r=new Jt(n,0),s=new Jt(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],(a=>{const l=this.Dr(a.wr);i.push(l)})),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let r=new oe(It);return n.forEach((s=>{const i=new Jt(s,0),a=new Jt(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],(l=>{r=r.add(l.wr)}))})),U.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,n){const r=n.path,s=r.length+1;let i=r;tt.isDocumentKey(i)||(i=i.child(""));const a=new Jt(new tt(i),0);let l=new oe(It);return this.br.forEachWhile((c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(c.wr)),!0)}),a),U.resolve(this.Cr(l))}Cr(t){const n=[];return t.forEach((r=>{const s=this.Dr(r);s!==null&&n.push(s)})),n}removeMutationBatch(t,n){Tt(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return U.forEach(n.mutations,(s=>{const i=new Jt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.br=r}))}On(t){}containsKey(t,n){const r=new Jt(n,0),s=this.br.firstAfterOrEqual(r);return U.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,U.resolve()}Fr(t,n){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const n=this.vr(t);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class _E{constructor(t){this.Mr=t,this.docs=(function(){return new Ut(tt.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():Zt.newInvalidDocument(n))}getEntries(t,n){let r=Tn();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Zt.newInvalidDocument(s))})),U.resolve(r)}getDocumentsMatchingQuery(t,n,r,s){let i=Tn();const a=n.path,l=new tt(a.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:d,value:{document:h}}=c.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ev(tv(h),r)<=0||(s.has(h.key)||fo(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(t,n,r,s){it()}Or(t,n){return U.forEach(this.docs,(r=>n(r)))}newChangeBuffer(t){return new yE(this)}getSize(t){return U.resolve(this.size)}}class yE extends cE{constructor(t){super(),this.cr=t}applyChanges(t){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(t,s)):this.cr.removeEntry(r)})),U.waitFor(n)}getFromCache(t,n){return this.cr.getEntry(t,n)}getAllFromCache(t,n){return this.cr.getEntries(t,n)}}/**
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
 */class vE{constructor(t){this.persistence=t,this.Nr=new Br((n=>hl(n)),fl),this.lastRemoteSnapshotVersion=at.min(),this.highestTargetId=0,this.Lr=0,this.Br=new vl,this.targetCount=0,this.kr=Mr.Bn()}forEachTarget(t,n){return this.Nr.forEach(((r,s)=>n(s))),U.resolve()}getLastRemoteSnapshotVersion(t){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return U.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(t,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),U.resolve()}Kn(t){this.Nr.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.kr=new Mr(n),this.highestTargetId=n),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,n){return this.Kn(n),this.targetCount+=1,U.resolve()}updateTargetData(t,n){return this.Kn(n),U.resolve()}removeTargetData(t,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(t,n,r){let s=0;const i=[];return this.Nr.forEach(((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),U.waitFor(i).next((()=>s))}getTargetCount(t){return U.resolve(this.targetCount)}getTargetData(t,n){const r=this.Nr.get(n)||null;return U.resolve(r)}addMatchingKeys(t,n,r){return this.Br.Rr(n,r),U.resolve()}removeMatchingKeys(t,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),U.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.Br.gr(n),U.resolve()}getMatchingKeysForTargetId(t,n){const r=this.Br.yr(n);return U.resolve(r)}containsKey(t,n){return U.resolve(this.Br.containsKey(n))}}/**
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
 */class EE{constructor(t,n){this.qr={},this.overlays={},this.Qr=new al(0),this.Kr=!1,this.Kr=!0,this.$r=new mE,this.referenceDelegate=t(this),this.Ur=new vE(this),this.indexManager=new lE,this.remoteDocumentCache=(function(s){return new _E(s)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new oE(n),this.Gr=new dE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new pE,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let r=this.qr[t.toKey()];return r||(r=new gE(n,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,n,r){Y("MemoryPersistence","Starting transaction:",t);const s=new TE(this.Qr.next());return this.referenceDelegate.zr(),r(s).next((i=>this.referenceDelegate.jr(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Hr(t,n){return U.or(Object.values(this.qr).map((r=>()=>r.containsKey(t,n))))}}class TE extends rv{constructor(t){super(),this.currentSequenceNumber=t}}class El{constructor(t){this.persistence=t,this.Jr=new vl,this.Yr=null}static Zr(t){return new El(t)}get Xr(){if(this.Yr)return this.Yr;throw it()}addReference(t,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),U.resolve()}removeReference(t,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),U.resolve()}markPotentiallyOrphaned(t,n){return this.Xr.add(n.toString()),U.resolve()}removeTarget(t,n){this.Jr.gr(n.targetId).forEach((s=>this.Xr.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,n.targetId).next((s=>{s.forEach((i=>this.Xr.add(i.toString())))})).next((()=>r.removeTargetData(t,n)))}zr(){this.Yr=new Set}jr(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.Xr,(r=>{const s=tt.fromPath(r);return this.ei(t,s).next((i=>{i||n.removeEntry(s,at.min())}))})).next((()=>(this.Yr=null,n.apply(t))))}updateLimboDocument(t,n){return this.ei(t,n).next((r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())}))}Wr(t){return 0}ei(t,n){return U.or([()=>U.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Hr(t,n)])}}/**
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
 */class Tl{constructor(t,n,r,s){this.targetId=t,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(t,n){let r=gt(),s=gt();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Tl(t,n.fromCache,r,s)}}/**
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
 */class wE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class IE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return C_()?8:sv(S_())>0?6:4})()}initialize(t,n){this.Ji=t,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(t,n,r,s){const i={result:null};return this.Yi(t,n).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Zi(t,n,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new wE;return this.Xi(t,n,a).next((l=>{if(i.result=l,this.zi)return this.es(t,n,a,l.size)}))})).next((()=>i.result))}es(t,n,r,s){return r.documentReadCount<this.ji?(is()<=Et.DEBUG&&Y("QueryEngine","SDK will not create cache indexes for query:",Er(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),U.resolve()):(is()<=Et.DEBUG&&Y("QueryEngine","Query:",Er(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(is()<=Et.DEBUG&&Y("QueryEngine","The SDK decides to create cache indexes for query:",Er(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Je(n))):U.resolve())}Yi(t,n){if(Bc(n))return U.resolve(null);let r=Je(n);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Pa(n,null,"F"),r=Je(n)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const a=gt(...i);return this.Ji.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((c=>{const d=this.ts(n,l);return this.ns(n,d,a,c.readTime)?this.Yi(t,Pa(n,null,"F")):this.rs(t,d,n,c)}))))})))))}Zi(t,n,r,s){return Bc(n)||s.isEqual(at.min())?U.resolve(null):this.Ji.getDocuments(t,r).next((i=>{const a=this.ts(n,i);return this.ns(n,a,r,s)?U.resolve(null):(is()<=Et.DEBUG&&Y("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Er(n)),this.rs(t,a,n,Zy(s,-1)).next((l=>l)))}))}ts(t,n){let r=new oe(rd(t));return n.forEach(((s,i)=>{fo(t,i)&&(r=r.add(i))})),r}ns(t,n,r,s){if(t.limit===null)return!1;if(r.size!==n.size)return!0;const i=t.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(t,n,r){return is()<=Et.DEBUG&&Y("QueryEngine","Using full collection scan to execute query:",Er(n)),this.Ji.getDocumentsMatchingQuery(t,n,Ln.min(),r)}rs(t,n,r,s){return this.Ji.getDocumentsMatchingQuery(t,r,s).next((i=>(n.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */class AE{constructor(t,n,r,s){this.persistence=t,this.ss=n,this.serializer=s,this.os=new Ut(It),this._s=new Br((i=>hl(i)),fl),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new fE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>t.collect(n,this.os)))}}function bE(e,t,n,r){return new AE(e,t,n,r)}async function Sd(e,t){const n=lt(e);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.ls(t),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let c=gt();for(const d of s){a.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}for(const d of i){l.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(r,c).next((d=>({hs:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function RE(e,t){const n=lt(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return(function(l,c,d,h){const g=d.batch,T=g.keys();let R=U.resolve();return T.forEach((x=>{R=R.next((()=>h.getEntry(c,x))).next((D=>{const k=d.docVersions.get(x);Tt(k!==null),D.version.compareTo(k)<0&&(g.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),h.addEntry(D)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(c,g)))})(n,r,t,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=gt();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(c=c.add(l.batch.mutations[d].key));return c})(t)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function Pd(e){const t=lt(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>t.Ur.getLastRemoteSnapshotVersion(n)))}function SE(e,t){const n=lt(e),r=t.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];t.targetChanges.forEach(((h,g)=>{const T=s.get(g);if(!T)return;l.push(n.Ur.removeMatchingKeys(i,h.removedDocuments,g).next((()=>n.Ur.addMatchingKeys(i,h.addedDocuments,g))));let R=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?R=R.withResumeToken(le.EMPTY_BYTE_STRING,at.min()).withLastLimboFreeSnapshotVersion(at.min()):h.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(h.resumeToken,r)),s=s.insert(g,R),(function(D,k,X){return D.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:X.addedDocuments.size+X.modifiedDocuments.size+X.removedDocuments.size>0})(T,R,h)&&l.push(n.Ur.updateTargetData(i,R))}));let c=Tn(),d=gt();if(t.documentUpdates.forEach((h=>{t.resolvedLimboDocuments.has(h)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))})),l.push(PE(i,a,t.documentUpdates).next((h=>{c=h.Ps,d=h.Is}))),!r.isEqual(at.min())){const h=n.Ur.getLastRemoteSnapshotVersion(i).next((g=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(h)}return U.waitFor(l).next((()=>a.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,c,d))).next((()=>c))})).then((i=>(n.os=s,i)))}function PE(e,t,n){let r=gt(),s=gt();return n.forEach((i=>r=r.add(i))),t.getEntries(e,r).next((i=>{let a=Tn();return n.forEach(((l,c)=>{const d=i.get(l);c.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(at.min())?(t.removeEntry(l,c.readTime),a=a.insert(l,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(c),a=a.insert(l,c)):Y("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",c.version)})),{Ps:a,Is:s}}))}function CE(e,t){const n=lt(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function VE(e,t){const n=lt(e);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Ur.getTargetData(r,t).next((i=>i?(s=i,U.resolve(s)):n.Ur.allocateTargetId(r).next((a=>(s=new Cn(t,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(t,r.targetId)),r}))}async function ka(e,t,n){const r=lt(e),s=r.os.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Ks(a))throw a;Y("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}r.os=r.os.remove(t),r._s.delete(s.target)}function Yc(e,t,n){const r=lt(e);let s=at.min(),i=gt();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,d,h){const g=lt(c),T=g._s.get(h);return T!==void 0?U.resolve(g.os.get(T)):g.Ur.getTargetData(d,h)})(r,a,Je(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next((c=>{i=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(a,t,n?s:at.min(),n?i:gt()))).next((l=>(xE(r,Iv(t),l),{documents:l,Ts:i})))))}function xE(e,t,n){let r=e.us.get(t)||at.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),e.us.set(t,r)}class Jc{constructor(){this.activeTargetIds=Cv()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class kE{constructor(){this.so=new Jc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,r){}addLocalQueryTarget(t,n=!0){return n&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,n,r){this.oo[t]=n}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Jc,Promise.resolve()}handleUserChange(t,n,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class DE{_o(t){}shutdown(){}}/**
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
 */class Zc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){Y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){Y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ei=null;function ea(){return Ei===null?Ei=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ei++,"0x"+Ei.toString(16)}/**
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
 */const NE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class OE{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
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
 */const de="WebChannelConnection";class ME extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,a){const l=ea(),c=this.xo(n,r.toUriEncodedString());Y("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(n,c,d,s).then((h=>(Y("RestConnection",`Received RPC '${n}' ${l}: `,h),h)),(h=>{throw kr("RestConnection",`RPC '${n}' ${l} failed with error: `,h,"url: ",c,"request:",s),h}))}Lo(n,r,s,i,a,l){return this.Mo(n,r,s,i,a)}Oo(n,r,s){n["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ur})(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((i,a)=>n[a]=i)),s&&s.headers.forEach(((i,a)=>n[a]=i))}xo(n,r){const s=NE[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,n,r,s){const i=ea();return new Promise(((a,l)=>{const c=new Bf;c.setWithCredentials(!0),c.listenOnce(jf.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Si.NO_ERROR:const h=c.getResponseJson();Y(de,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(h)),a(h);break;case Si.TIMEOUT:Y(de,`RPC '${t}' ${i} timed out`),l(new J(O.DEADLINE_EXCEEDED,"Request time out"));break;case Si.HTTP_ERROR:const g=c.getStatus();if(Y(de,`RPC '${t}' ${i} failed with status:`,g,"response text:",c.getResponseText()),g>0){let T=c.getResponseJson();Array.isArray(T)&&(T=T[0]);const R=T==null?void 0:T.error;if(R&&R.status&&R.message){const x=(function(k){const X=k.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(X)>=0?X:O.UNKNOWN})(R.status);l(new J(x,R.message))}else l(new J(O.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new J(O.UNAVAILABLE,"Connection failed."));break;default:it()}}finally{Y(de,`RPC '${t}' ${i} completed.`)}}));const d=JSON.stringify(s);Y(de,`RPC '${t}' ${i} sending request:`,s),c.send(n,"POST",d,r,15)}))}Bo(t,n,r){const s=ea(),i=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Kf(),l=qf(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const h=i.join("");Y(de,`Creating RPC '${t}' stream ${s}: ${h}`,c);const g=a.createWebChannel(h,c);let T=!1,R=!1;const x=new OE({Io:k=>{R?Y(de,`Not sending because RPC '${t}' stream ${s} is closed:`,k):(T||(Y(de,`Opening RPC '${t}' stream ${s} transport.`),g.open(),T=!0),Y(de,`RPC '${t}' stream ${s} sending:`,k),g.send(k))},To:()=>g.close()}),D=(k,X,W)=>{k.listen(X,(Q=>{try{W(Q)}catch($){setTimeout((()=>{throw $}),0)}}))};return D(g,cs.EventType.OPEN,(()=>{R||(Y(de,`RPC '${t}' stream ${s} transport opened.`),x.yo())})),D(g,cs.EventType.CLOSE,(()=>{R||(R=!0,Y(de,`RPC '${t}' stream ${s} transport closed`),x.So())})),D(g,cs.EventType.ERROR,(k=>{R||(R=!0,kr(de,`RPC '${t}' stream ${s} transport errored:`,k),x.So(new J(O.UNAVAILABLE,"The operation could not be completed")))})),D(g,cs.EventType.MESSAGE,(k=>{var X;if(!R){const W=k.data[0];Tt(!!W);const Q=W,$=Q.error||((X=Q[0])===null||X===void 0?void 0:X.error);if($){Y(de,`RPC '${t}' stream ${s} received error:`,$);const mt=$.status;let _t=(function(E){const I=Gt[E];if(I!==void 0)return gd(I)})(mt),b=$.message;_t===void 0&&(_t=O.INTERNAL,b="Unknown error status: "+mt+" with message "+$.message),R=!0,x.So(new J(_t,b)),g.close()}else Y(de,`RPC '${t}' stream ${s} received:`,W),x.bo(W)}})),D(l,$f.STAT_EVENT,(k=>{k.stat===Ia.PROXY?Y(de,`RPC '${t}' stream ${s} detected buffering proxy`):k.stat===Ia.NOPROXY&&Y(de,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{x.wo()}),0),x}}function na(){return typeof document<"u"?document:null}/**
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
 */function _o(e){return new zv(e,!0)}/**
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
 */class wl{constructor(t,n,r=1e3,s=1.5,i=6e4){this.ui=t,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&Y("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),t()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Cd{constructor(t,n,r,s,i,a,l,c){this.ui=t,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new wl(t,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(En(n.toString()),En("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(n)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Yo===n&&this.P_(r,s)}),(r=>{t((()=>{const s=new J(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)}))}))}P_(t,n){const r=this.h_(this.Yo);this.stream=this.T_(t,n),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((s=>{r((()=>this.I_(s)))})),this.stream.onMessage((s=>{r((()=>++this.e_==1?this.E_(s):this.onNext(s)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(t){return Y("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return n=>{this.ui.enqueueAndForget((()=>this.Yo===t?n():(Y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class LE extends Cd{constructor(t,n,r,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}T_(t,n){return this.connection.Bo("Listen",t,n)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const n=Xv(this.serializer,t),r=(function(i){if(!("targetChange"in i))return at.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?at.min():a.readTime?xe(a.readTime):at.min()})(t);return this.listener.d_(n,r)}A_(t){const n={};n.database=xa(this.serializer),n.addTarget=(function(i,a){let l;const c=a.target;if(l=Sa(c)?{documents:Jv(i,c)}:{query:Zv(i,c)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=vd(i,a.resumeToken);const d=Ca(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(at.min())>0){l.readTime=Wi(i,a.snapshotVersion.toTimestamp());const d=Ca(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,t);const r=eE(this.serializer,t);r&&(n.labels=r),this.a_(n)}R_(t){const n={};n.database=xa(this.serializer),n.removeTarget=t,this.a_(n)}}class FE extends Cd{constructor(t,n,r,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,n){return this.connection.Bo("Write",t,n)}E_(t){return Tt(!!t.streamToken),this.lastStreamToken=t.streamToken,Tt(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){Tt(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const n=Yv(t.writeResults,t.commitTime),r=xe(t.commitTime);return this.listener.g_(r,n)}p_(){const t={};t.database=xa(this.serializer),this.a_(t)}m_(t){const n={streamToken:this.lastStreamToken,writes:t.map((r=>Id(this.serializer,r)))};this.a_(n)}}/**
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
 */class UE extends class{}{constructor(t,n,r,s){super(),this.authCredentials=t,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new J(O.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Mo(t,Va(n,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new J(O.UNKNOWN,i.toString())}))}Lo(t,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Lo(t,Va(n,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new J(O.UNKNOWN,a.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class BE{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(En(n),this.D_=!1):Y("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class jE{constructor(t,n,r,s,i){this.localStore=t,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o((a=>{r.enqueueAndForget((async()=>{ur(this)&&(Y("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const d=lt(c);d.L_.add(4),await Gs(d),d.q_.set("Unknown"),d.L_.delete(4),await yo(d)})(this))}))})),this.q_=new BE(r,s)}}async function yo(e){if(ur(e))for(const t of e.B_)await t(!0)}async function Gs(e){for(const t of e.B_)await t(!1)}function Vd(e,t){const n=lt(e);n.N_.has(t.targetId)||(n.N_.set(t.targetId,t),Rl(n)?bl(n):jr(n).r_()&&Al(n,t))}function Il(e,t){const n=lt(e),r=jr(n);n.N_.delete(t),r.r_()&&xd(n,t),n.N_.size===0&&(r.r_()?r.o_():ur(n)&&n.q_.set("Unknown"))}function Al(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(at.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}jr(e).A_(t)}function xd(e,t){e.Q_.xe(t),jr(e).R_(t)}function bl(e){e.Q_=new $v({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),jr(e).start(),e.q_.v_()}function Rl(e){return ur(e)&&!jr(e).n_()&&e.N_.size>0}function ur(e){return lt(e).L_.size===0}function kd(e){e.Q_=void 0}async function $E(e){e.q_.set("Online")}async function qE(e){e.N_.forEach(((t,n)=>{Al(e,t)}))}async function KE(e,t){kd(e),Rl(e)?(e.q_.M_(t),bl(e)):e.q_.set("Unknown")}async function HE(e,t,n){if(e.q_.set("Online"),t instanceof yd&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))})(e,t)}catch(r){Y("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Qi(e,r)}else if(t instanceof Vi?e.Q_.Ke(t):t instanceof _d?e.Q_.He(t):e.Q_.We(t),!n.isEqual(at.min()))try{const r=await Pd(e.localStore);n.compareTo(r)>=0&&await(function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach(((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.N_.get(d);h&&i.N_.set(d,h.withResumeToken(c.resumeToken,a))}})),l.targetMismatches.forEach(((c,d)=>{const h=i.N_.get(c);if(!h)return;i.N_.set(c,h.withResumeToken(le.EMPTY_BYTE_STRING,h.snapshotVersion)),xd(i,c);const g=new Cn(h.target,c,d,h.sequenceNumber);Al(i,g)})),i.remoteSyncer.applyRemoteEvent(l)})(e,n)}catch(r){Y("RemoteStore","Failed to raise snapshot:",r),await Qi(e,r)}}async function Qi(e,t,n){if(!Ks(t))throw t;e.L_.add(1),await Gs(e),e.q_.set("Offline"),n||(n=()=>Pd(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{Y("RemoteStore","Retrying IndexedDB access"),await n(),e.L_.delete(1),await yo(e)}))}function Dd(e,t){return t().catch((n=>Qi(e,n,t)))}async function vo(e){const t=lt(e),n=Un(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;zE(t);)try{const s=await CE(t.localStore,r);if(s===null){t.O_.length===0&&n.o_();break}r=s.batchId,WE(t,s)}catch(s){await Qi(t,s)}Nd(t)&&Od(t)}function zE(e){return ur(e)&&e.O_.length<10}function WE(e,t){e.O_.push(t);const n=Un(e);n.r_()&&n.V_&&n.m_(t.mutations)}function Nd(e){return ur(e)&&!Un(e).n_()&&e.O_.length>0}function Od(e){Un(e).start()}async function GE(e){Un(e).p_()}async function QE(e){const t=Un(e);for(const n of e.O_)t.m_(n.mutations)}async function XE(e,t,n){const r=e.O_.shift(),s=gl.from(r,t,n);await Dd(e,(()=>e.remoteSyncer.applySuccessfulWrite(s))),await vo(e)}async function YE(e,t){t&&Un(e).V_&&await(async function(r,s){if((function(a){return md(a)&&a!==O.ABORTED})(s.code)){const i=r.O_.shift();Un(r).s_(),await Dd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await vo(r)}})(e,t),Nd(e)&&Od(e)}async function th(e,t){const n=lt(e);n.asyncQueue.verifyOperationInProgress(),Y("RemoteStore","RemoteStore received new credentials");const r=ur(n);n.L_.add(3),await Gs(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.L_.delete(3),await yo(n)}async function JE(e,t){const n=lt(e);t?(n.L_.delete(2),await yo(n)):t||(n.L_.add(2),await Gs(n),n.q_.set("Unknown"))}function jr(e){return e.K_||(e.K_=(function(n,r,s){const i=lt(n);return i.w_(),new LE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:$E.bind(null,e),Ro:qE.bind(null,e),mo:KE.bind(null,e),d_:HE.bind(null,e)}),e.B_.push((async t=>{t?(e.K_.s_(),Rl(e)?bl(e):e.q_.set("Unknown")):(await e.K_.stop(),kd(e))}))),e.K_}function Un(e){return e.U_||(e.U_=(function(n,r,s){const i=lt(n);return i.w_(),new FE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:()=>Promise.resolve(),Ro:GE.bind(null,e),mo:YE.bind(null,e),f_:QE.bind(null,e),g_:XE.bind(null,e)}),e.B_.push((async t=>{t?(e.U_.s_(),await vo(e)):(await e.U_.stop(),e.O_.length>0&&(Y("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))}))),e.U_}/**
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
 */class Sl{constructor(t,n,r,s,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new mn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,n,r,s,i){const a=Date.now()+r,l=new Sl(t,n,a,s,i);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new J(O.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pl(e,t){if(En("AsyncQueue",`${t}: ${e}`),Ks(e))return new J(O.UNAVAILABLE,`${t}: ${e}`);throw e}/**
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
 */class Sr{constructor(t){this.comparator=t?(n,r)=>t(n,r)||tt.comparator(n.key,r.key):(n,r)=>tt.comparator(n.key,r.key),this.keyedMap=hs(),this.sortedSet=new Ut(this.comparator)}static emptySet(t){return new Sr(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((n,r)=>(t(n),!1)))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof Sr)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((n=>{t.push(n.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const r=new Sr;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=n,r}}/**
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
 */class eh{constructor(){this.W_=new Ut(tt.comparator)}track(t){const n=t.doc.key,r=this.W_.get(n);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(n,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(n):t.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):it():this.W_=this.W_.insert(n,t)}G_(){const t=[];return this.W_.inorderTraversal(((n,r)=>{t.push(r)})),t}}class Lr{constructor(t,n,r,s,i,a,l,c,d){this.query=t,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(t,n,r,s,i){const a=[];return n.forEach((l=>{a.push({type:0,doc:l})})),new Lr(t,n,Sr.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ho(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,r=t.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class ZE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((t=>t.J_()))}}class tT{constructor(){this.queries=nh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=lt(n),i=s.queries;s.queries=nh(),i.forEach(((a,l)=>{for(const c of l.j_)c.onError(r)}))})(this,new J(O.ABORTED,"Firestore shutting down"))}}function nh(){return new Br((e=>nd(e)),ho)}async function eT(e,t){const n=lt(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.H_()&&t.J_()&&(r=2):(i=new ZE,r=t.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const l=Pl(a,`Initialization of query '${Er(t.query)}' failed`);return void t.onError(l)}n.queries.set(s,i),i.j_.push(t),t.Z_(n.onlineState),i.z_&&t.X_(i.z_)&&Cl(n)}async function nT(e,t){const n=lt(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const a=i.j_.indexOf(t);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=t.J_()?0:1:!i.H_()&&t.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function rT(e,t){const n=lt(e);let r=!1;for(const s of t){const i=s.query,a=n.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&Cl(n)}function sT(e,t,n){const r=lt(e),s=r.queries.get(t);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(t)}function Cl(e){e.Y_.forEach((t=>{t.next()}))}var Da,rh;(rh=Da||(Da={})).ea="default",rh.Cache="cache";class iT{constructor(t,n,r){this.query=t,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Lr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let n=!1;return this.na?this.ia(t)&&(this.ta.next(t),n=!0):this.sa(t,this.onlineState)&&(this.oa(t),n=!0),this.ra=t,n}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),n=!0),n}sa(t,n){if(!t.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||n==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(t){t=Lr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==Da.Cache}}/**
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
 */class Md{constructor(t){this.key=t}}class Ld{constructor(t){this.key=t}}class oT{constructor(t,n){this.query=t,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=gt(),this.mutatedKeys=gt(),this.Aa=rd(t),this.Ra=new Sr(this.Aa)}get Va(){return this.Ta}ma(t,n){const r=n?n.fa:new eh,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((h,g)=>{const T=s.get(h),R=fo(this.query,g)?g:null,x=!!T&&this.mutatedKeys.has(T.key),D=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let k=!1;T&&R?T.data.isEqual(R.data)?x!==D&&(r.track({type:3,doc:R}),k=!0):this.ga(T,R)||(r.track({type:2,doc:R}),k=!0,(c&&this.Aa(R,c)>0||d&&this.Aa(R,d)<0)&&(l=!0)):!T&&R?(r.track({type:0,doc:R}),k=!0):T&&!R&&(r.track({type:1,doc:T}),k=!0,(c||d)&&(l=!0)),k&&(R?(a=a.add(R),i=D?i.add(h):i.delete(h)):(a=a.delete(h),i=i.delete(h)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const h=this.query.limitType==="F"?a.last():a.first();a=a.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,r,s){const i=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort(((h,g)=>(function(R,x){const D=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return it()}};return D(R)-D(x)})(h.type,g.type)||this.Aa(h.doc,g.doc))),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,d=c!==this.Ea;return this.Ea=c,a.length!==0||d?{snapshot:new Lr(this.query,t.Ra,i,a,t.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new eh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach((n=>this.Ta=this.Ta.add(n))),t.modifiedDocuments.forEach((n=>{})),t.removedDocuments.forEach((n=>this.Ta=this.Ta.delete(n))),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=gt(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const n=[];return t.forEach((r=>{this.da.has(r)||n.push(new Ld(r))})),this.da.forEach((r=>{t.has(r)||n.push(new Md(r))})),n}ba(t){this.Ta=t.Ts,this.da=gt();const n=this.ma(t.documents);return this.applyChanges(n,!0)}Da(){return Lr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class aT{constructor(t,n,r){this.query=t,this.targetId=n,this.view=r}}class lT{constructor(t){this.key=t,this.va=!1}}class uT{constructor(t,n,r,s,i,a){this.localStore=t,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Br((l=>nd(l)),ho),this.Ma=new Map,this.xa=new Set,this.Oa=new Ut(tt.comparator),this.Na=new Map,this.La=new vl,this.Ba={},this.ka=new Map,this.qa=Mr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function cT(e,t,n=!0){const r=qd(e);let s;const i=r.Fa.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Fd(r,t,n,!0),s}async function hT(e,t){const n=qd(e);await Fd(n,t,!0,!1)}async function Fd(e,t,n,r){const s=await VE(e.localStore,Je(t)),i=s.targetId,a=e.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await fT(e,t,i,a==="current",s.resumeToken)),e.isPrimaryClient&&n&&Vd(e.remoteStore,s),l}async function fT(e,t,n,r,s){e.Ka=(g,T,R)=>(async function(D,k,X,W){let Q=k.view.ma(X);Q.ns&&(Q=await Yc(D.localStore,k.query,!1).then((({documents:b})=>k.view.ma(b,Q))));const $=W&&W.targetChanges.get(k.targetId),mt=W&&W.targetMismatches.get(k.targetId)!=null,_t=k.view.applyChanges(Q,D.isPrimaryClient,$,mt);return ih(D,k.targetId,_t.wa),_t.snapshot})(e,g,T,R);const i=await Yc(e.localStore,t,!0),a=new oT(t,i.Ts),l=a.ma(i.documents),c=Ws.createSynthesizedTargetChangeForCurrentChange(n,r&&e.onlineState!=="Offline",s),d=a.applyChanges(l,e.isPrimaryClient,c);ih(e,n,d.wa);const h=new aT(t,n,a);return e.Fa.set(t,h),e.Ma.has(n)?e.Ma.get(n).push(t):e.Ma.set(n,[t]),d.snapshot}async function dT(e,t,n){const r=lt(e),s=r.Fa.get(t),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter((a=>!ho(a,t)))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ka(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Il(r.remoteStore,s.targetId),Na(r,s.targetId)})).catch(qs)):(Na(r,s.targetId),await ka(r.localStore,s.targetId,!0))}async function pT(e,t){const n=lt(e),r=n.Fa.get(t),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Il(n.remoteStore,r.targetId))}async function mT(e,t,n){const r=wT(e);try{const s=await(function(a,l){const c=lt(a),d=Xt.now(),h=l.reduce(((R,x)=>R.add(x.key)),gt());let g,T;return c.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let x=Tn(),D=gt();return c.cs.getEntries(R,h).next((k=>{x=k,x.forEach(((X,W)=>{W.isValidDocument()||(D=D.add(X))}))})).next((()=>c.localDocuments.getOverlayedDocuments(R,x))).next((k=>{g=k;const X=[];for(const W of l){const Q=Mv(W,g.get(W.key).overlayedDocument);Q!=null&&X.push(new Bn(W.key,Q,Qf(Q.value.mapValue),Ae.exists(!0)))}return c.mutationQueue.addMutationBatch(R,d,X,l)})).next((k=>{T=k;const X=k.applyToLocalDocumentSet(g,D);return c.documentOverlayCache.saveOverlays(R,k.batchId,X)}))})).then((()=>({batchId:T.batchId,changes:id(g)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,c){let d=a.Ba[a.currentUser.toKey()];d||(d=new Ut(It)),d=d.insert(l,c),a.Ba[a.currentUser.toKey()]=d})(r,s.batchId,n),await Qs(r,s.changes),await vo(r.remoteStore)}catch(s){const i=Pl(s,"Failed to persist write");n.reject(i)}}async function Ud(e,t){const n=lt(e);try{const r=await SE(n.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=n.Na.get(i);a&&(Tt(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?Tt(a.va):s.removedDocuments.size>0&&(Tt(a.va),a.va=!1))})),await Qs(n,r,t)}catch(r){await qs(r)}}function sh(e,t,n){const r=lt(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach(((i,a)=>{const l=a.view.Z_(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const c=lt(a);c.onlineState=l;let d=!1;c.queries.forEach(((h,g)=>{for(const T of g.j_)T.Z_(l)&&(d=!0)})),d&&Cl(c)})(r.eventManager,t),s.length&&r.Ca.d_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function gT(e,t,n){const r=lt(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Na.get(t),i=s&&s.key;if(i){let a=new Ut(tt.comparator);a=a.insert(i,Zt.newNoDocument(i,at.min()));const l=gt().add(i),c=new go(at.min(),new Map,new Ut(It),a,l);await Ud(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(t),Vl(r)}else await ka(r.localStore,t,!1).then((()=>Na(r,t,n))).catch(qs)}async function _T(e,t){const n=lt(e),r=t.batch.batchId;try{const s=await RE(n.localStore,t);jd(n,r,null),Bd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Qs(n,s)}catch(s){await qs(s)}}async function yT(e,t,n){const r=lt(e);try{const s=await(function(a,l){const c=lt(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let h;return c.mutationQueue.lookupMutationBatch(d,l).next((g=>(Tt(g!==null),h=g.keys(),c.mutationQueue.removeMutationBatch(d,g)))).next((()=>c.mutationQueue.performConsistencyCheck(d))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(d,h,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h))).next((()=>c.localDocuments.getDocuments(d,h)))}))})(r.localStore,t);jd(r,t,n),Bd(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Qs(r,s)}catch(s){await qs(s)}}function Bd(e,t){(e.ka.get(t)||[]).forEach((n=>{n.resolve()})),e.ka.delete(t)}function jd(e,t,n){const r=lt(e);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(n?i.reject(n):i.resolve(),s=s.remove(t)),r.Ba[r.currentUser.toKey()]=s}}function Na(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Ma.get(t))e.Fa.delete(r),n&&e.Ca.$a(r,n);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach((r=>{e.La.containsKey(r)||$d(e,r)}))}function $d(e,t){e.xa.delete(t.path.canonicalString());const n=e.Oa.get(t);n!==null&&(Il(e.remoteStore,n),e.Oa=e.Oa.remove(t),e.Na.delete(n),Vl(e))}function ih(e,t,n){for(const r of n)r instanceof Md?(e.La.addReference(r.key,t),vT(e,r)):r instanceof Ld?(Y("SyncEngine","Document no longer in limbo: "+r.key),e.La.removeReference(r.key,t),e.La.containsKey(r.key)||$d(e,r.key)):it()}function vT(e,t){const n=t.key,r=n.path.canonicalString();e.Oa.get(n)||e.xa.has(r)||(Y("SyncEngine","New document in limbo: "+n),e.xa.add(r),Vl(e))}function Vl(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){const t=e.xa.values().next().value;e.xa.delete(t);const n=new tt(Nt.fromString(t)),r=e.qa.next();e.Na.set(r,new lT(n)),e.Oa=e.Oa.insert(n,r),Vd(e.remoteStore,new Cn(Je(dl(n.path)),r,"TargetPurposeLimboResolution",al.oe))}}async function Qs(e,t,n){const r=lt(e),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach(((l,c)=>{a.push(r.Ka(c,t,n).then((d=>{var h;if((d||n)&&r.isPrimaryClient){const g=d?!d.fromCache:(h=n==null?void 0:n.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(d){s.push(d);const g=Tl.Wi(c.targetId,d);i.push(g)}})))})),await Promise.all(a),r.Ca.d_(s),await(async function(c,d){const h=lt(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(g=>U.forEach(d,(T=>U.forEach(T.$i,(R=>h.persistence.referenceDelegate.addReference(g,T.targetId,R))).next((()=>U.forEach(T.Ui,(R=>h.persistence.referenceDelegate.removeReference(g,T.targetId,R)))))))))}catch(g){if(!Ks(g))throw g;Y("LocalStore","Failed to update sequence numbers: "+g)}for(const g of d){const T=g.targetId;if(!g.fromCache){const R=h.os.get(T),x=R.snapshotVersion,D=R.withLastLimboFreeSnapshotVersion(x);h.os=h.os.insert(T,D)}}})(r.localStore,i))}async function ET(e,t){const n=lt(e);if(!n.currentUser.isEqual(t)){Y("SyncEngine","User change. New user:",t.toKey());const r=await Sd(n.localStore,t);n.currentUser=t,(function(i,a){i.ka.forEach((l=>{l.forEach((c=>{c.reject(new J(O.CANCELLED,a))}))})),i.ka.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Qs(n,r.hs)}}function TT(e,t){const n=lt(e),r=n.Na.get(t);if(r&&r.va)return gt().add(r.key);{let s=gt();const i=n.Ma.get(t);if(!i)return s;for(const a of i){const l=n.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function qd(e){const t=lt(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ud.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=TT.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=gT.bind(null,t),t.Ca.d_=rT.bind(null,t.eventManager),t.Ca.$a=sT.bind(null,t.eventManager),t}function wT(e){const t=lt(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=_T.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=yT.bind(null,t),t}class Xi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=_o(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,n){return null}Ha(t,n){return null}za(t){return bE(this.persistence,new IE,t.initialUser,this.serializer)}Ga(t){return new EE(El.Zr,this.serializer)}Wa(t){return new kE}async terminate(){var t,n;(t=this.gcScheduler)===null||t===void 0||t.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Xi.provider={build:()=>new Xi};class Oa{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ET.bind(null,this.syncEngine),await JE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new tT})()}createDatastore(t){const n=_o(t.databaseInfo.databaseId),r=(function(i){return new ME(i)})(t.databaseInfo);return(function(i,a,l,c){return new UE(i,a,l,c)})(t.authCredentials,t.appCheckCredentials,r,n)}createRemoteStore(t){return(function(r,s,i,a,l){return new jE(r,s,i,a,l)})(this.localStore,this.datastore,t.asyncQueue,(n=>sh(this.syncEngine,n,0)),(function(){return Zc.D()?new Zc:new DE})())}createSyncEngine(t,n){return(function(s,i,a,l,c,d,h){const g=new uT(s,i,a,l,c,d);return h&&(g.Qa=!0),g})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}async terminate(){var t,n;await(async function(s){const i=lt(s);Y("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Gs(i),i.k_.shutdown(),i.q_.set("Unknown")})(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Oa.provider={build:()=>new Oa};/**
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
 */class IT{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):En("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,n){setTimeout((()=>{this.muted||t(n)}),0)}}/**
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
 */class AT{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new J(O.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await(async function(s,i){const a=lt(s),l={documents:i.map((g=>Gi(a.serializer,g)))},c=await a.Lo("BatchGetDocuments",a.serializer.databaseId,Nt.emptyPath(),l,i.length),d=new Map;c.forEach((g=>{const T=Qv(a.serializer,g);d.set(T.key.toString(),T)}));const h=[];return i.forEach((g=>{const T=d.get(g.toString());Tt(!!T),h.push(T)})),h})(this.datastore,t);return n.forEach((r=>this.recordVersion(r))),n}set(t,n){this.write(n.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,n){try{this.write(n.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new ml(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((n=>{t.delete(n.key.toString())})),t.forEach(((n,r)=>{const s=tt.fromPath(r);this.mutations.push(new pd(s,this.precondition(s)))})),await(async function(r,s){const i=lt(r),a={writes:s.map((l=>Id(i.serializer,l)))};await i.Mo("Commit",i.serializer.databaseId,Nt.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let n;if(t.isFoundDocument())n=t.version;else{if(!t.isNoDocument())throw it();n=at.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!n.isEqual(r))throw new J(O.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),n)}precondition(t){const n=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&n?n.isEqual(at.min())?Ae.exists(!1):Ae.updateTime(n):Ae.none()}preconditionForUpdate(t){const n=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&n){if(n.isEqual(at.min()))throw new J(O.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ae.updateTime(n)}return Ae.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class bT{constructor(t,n,r,s,i){this.asyncQueue=t,this.datastore=n,this.options=r,this.updateFunction=s,this.deferred=i,this._u=r.maxAttempts,this.t_=new wl(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const t=new AT(this.datastore),n=this.cu(t);n&&n.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.lu(s)}))))})).catch((r=>{this.lu(r)}))}))}cu(t){try{const n=this.updateFunction(t);return!Hs(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(t){this._u>0&&this.hu(t)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(t)}hu(t){if(t.name==="FirebaseError"){const n=t.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!md(n)}return!1}}/**
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
 */class RT{constructor(t,n,r,s,i){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=pe.UNAUTHENTICATED,this.clientId=zf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{Y("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(Y("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new mn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const r=Pl(n,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function ra(e,t){e.asyncQueue.verifyOperationInProgress(),Y("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Sd(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function oh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await ST(e);Y("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener((r=>th(t.remoteStore,r))),e.setAppCheckTokenChangeListener(((r,s)=>th(t.remoteStore,s))),e._onlineComponents=t}async function ST(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Y("FirestoreClient","Using user provided OfflineComponentProvider");try{await ra(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!(function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;kr("Error using user provided cache. Falling back to memory cache: "+n),await ra(e,new Xi)}}else Y("FirestoreClient","Using default OfflineComponentProvider"),await ra(e,new Xi);return e._offlineComponents}async function xl(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(Y("FirestoreClient","Using user provided OnlineComponentProvider"),await oh(e,e._uninitializedComponentsProvider._online)):(Y("FirestoreClient","Using default OnlineComponentProvider"),await oh(e,new Oa))),e._onlineComponents}function PT(e){return xl(e).then((t=>t.syncEngine))}function CT(e){return xl(e).then((t=>t.datastore))}async function VT(e){const t=await xl(e),n=t.eventManager;return n.onListen=cT.bind(null,t.syncEngine),n.onUnlisten=dT.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=hT.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=pT.bind(null,t.syncEngine),n}function xT(e,t,n={}){const r=new mn;return e.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,c,d){const h=new IT({next:T=>{h.Za(),a.enqueueAndForget((()=>nT(i,g)));const R=T.docs.has(l);!R&&T.fromCache?d.reject(new J(O.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&T.fromCache&&c&&c.source==="server"?d.reject(new J(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new iT(dl(l.path),h,{includeMetadataChanges:!0,_a:!0});return eT(i,g)})(await VT(e),e.asyncQueue,t,n,r))),r.promise}/**
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
 */function Kd(e){const t={};return e.timeoutSeconds!==void 0&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
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
 */const ah=new Map;/**
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
 */function Hd(e,t,n){if(!n)throw new J(O.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function kT(e,t,n,r){if(t===!0&&r===!0)throw new J(O.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function lh(e){if(!tt.isDocumentKey(e))throw new J(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function uh(e){if(tt.isDocumentKey(e))throw new J(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function kl(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":it()}function Us(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new J(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=kl(e);throw new J(O.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
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
 */class ch{constructor(t){var n,r;if(t.host===void 0){if(t.ssl!==void 0)throw new J(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new J(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}kT("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Kd((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new J(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Eo{constructor(t,n,r,s){this._authCredentials=t,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ch({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new J(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new J(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ch(t),t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ky;switch(r.type){case"firstParty":return new Gy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new J(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=ah.get(n);r&&(Y("ComponentProvider","Removing Datastore"),ah.delete(n),r.terminate())})(this),Promise.resolve()}}function DT(e,t,n,r={}){var s;const i=(e=Us(e,Eo))._getSettings(),a=`${t}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&kr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=pe.MOCK_USER;else{l=Pf(r.mockUserToken,(s=e._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new J(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new pe(d)}e._authCredentials=new Hy(new Hf(l,c))}}/**
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
 */class Dl{constructor(t,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Dl(this.firestore,t,this._query)}}class ke{constructor(t,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Dn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ke(this.firestore,t,this._key)}}class Dn extends Dl{constructor(t,n,r){super(t,n,dl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ke(this.firestore,null,new tt(t))}withConverter(t){return new Dn(this.firestore,t,this._path)}}function NT(e,t,...n){if(e=De(e),Hd("collection","path",t),e instanceof Eo){const r=Nt.fromString(t,...n);return uh(r),new Dn(e,null,r)}{if(!(e instanceof ke||e instanceof Dn))throw new J(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Nt.fromString(t,...n));return uh(r),new Dn(e.firestore,null,r)}}function Ma(e,t,...n){if(e=De(e),arguments.length===1&&(t=zf.newId()),Hd("doc","path",t),e instanceof Eo){const r=Nt.fromString(t,...n);return lh(r),new ke(e,null,new tt(r))}{if(!(e instanceof ke||e instanceof Dn))throw new J(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Nt.fromString(t,...n));return lh(r),new ke(e.firestore,e instanceof Dn?e.converter:null,new tt(r))}}/**
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
 */class hh{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new wl(this,"async_queue_retry"),this.Vu=()=>{const r=na();r&&Y("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const n=na();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const n=na();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise((()=>{}));const n=new mn;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(t().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Pu.push(t),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!Ks(t))throw t;Y("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(t){const n=this.mu.then((()=>(this.du=!0,t().catch((r=>{this.Eu=r,this.du=!1;const s=(function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l})(r);throw En("INTERNAL UNHANDLED ERROR: ",s),r})).then((r=>(this.du=!1,r))))));return this.mu=n,n}enqueueAfterDelay(t,n,r){this.fu(),this.Ru.indexOf(t)>-1&&(n=0);const s=Sl.createAndSchedule(this,t,n,r,(i=>this.yu(i)));return this.Tu.push(s),s}fu(){this.Eu&&it()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const n of this.Tu)if(n.timerId===t)return!0;return!1}bu(t){return this.wu().then((()=>{this.Tu.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.Tu)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.wu()}))}Du(t){this.Ru.push(t)}yu(t){const n=this.Tu.indexOf(t);this.Tu.splice(n,1)}}class To extends Eo{constructor(t,n,r,s){super(t,n,r,s),this.type="firestore",this._queue=new hh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new hh(t),this._firestoreClient=void 0,await t}}}function OT(e,t){const n=typeof e=="object"?e:Mf(),r=typeof e=="string"?e:"(default)",s=Df(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Rf("firestore");i&&DT(s,...i)}return s}function Nl(e){if(e._terminated)throw new J(O.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||MT(e),e._firestoreClient}function MT(e){var t,n,r;const s=e._freezeSettings(),i=(function(l,c,d,h){return new av(l,c,d,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Kd(h.experimentalLongPollingOptions),h.useFetchStreams)})(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,s);e._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new RT(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&(function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}})(e._componentsProvider))}/**
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
 */class sr{constructor(t){this._byteString=t}static fromBase64String(t){try{return new sr(le.fromBase64String(t))}catch(n){throw new J(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new sr(le.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class wo{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new J(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ie(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Ol{constructor(t){this._methodName=t}}/**
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
 */class Ml{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new J(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new J(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return It(this._lat,t._lat)||It(this._long,t._long)}}/**
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
 */class Ll{constructor(t){this._values=(t||[]).map((n=>n))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}}/**
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
 */const LT=/^__.*__$/;class FT{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return this.fieldMask!==null?new Bn(t,this.data,this.fieldMask,n,this.fieldTransforms):new zs(t,this.data,n,this.fieldTransforms)}}class zd{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return new Bn(t,this.data,this.fieldMask,n,this.fieldTransforms)}}function Wd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw it()}}class Fl{constructor(t,n,r,s,i,a){this.settings=t,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Fl(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.Ou(t),s}Nu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Yi(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find((n=>t.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>t.isPrefixOf(n.field)))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Wd(this.Cu)&&LT.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class UT{constructor(t,n,r){this.databaseId=t,this.ignoreUndefinedProperties=n,this.serializer=r||_o(t)}Qu(t,n,r,s=!1){return new Fl({Cu:t,methodName:n,qu:r,path:ie.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gd(e){const t=e._freezeSettings(),n=_o(e._databaseId);return new UT(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Qd(e,t,n,r,s,i={}){const a=e.Qu(i.merge||i.mergeFields?2:0,t,n,s);Ul("Data must be an object, but it was:",a,r);const l=Xd(r,a);let c,d;if(i.merge)c=new Ce(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const h=[];for(const g of i.mergeFields){const T=La(t,g,n);if(!a.contains(T))throw new J(O.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Jd(h,T)||h.push(T)}c=new Ce(h),d=a.fieldTransforms.filter((g=>c.covers(g.field)))}else c=null,d=a.fieldTransforms;return new FT(new we(l),c,d)}class Io extends Ol{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Io}}function BT(e,t,n,r){const s=e.Qu(1,t,n);Ul("Data must be an object, but it was:",s,r);const i=[],a=we.empty();lr(r,((c,d)=>{const h=Bl(t,c,n);d=De(d);const g=s.Nu(h);if(d instanceof Io)i.push(h);else{const T=Ao(d,g);T!=null&&(i.push(h),a.set(h,T))}}));const l=new Ce(i);return new zd(a,l,s.fieldTransforms)}function jT(e,t,n,r,s,i){const a=e.Qu(1,t,n),l=[La(t,r,n)],c=[s];if(i.length%2!=0)throw new J(O.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)l.push(La(t,i[T])),c.push(i[T+1]);const d=[],h=we.empty();for(let T=l.length-1;T>=0;--T)if(!Jd(d,l[T])){const R=l[T];let x=c[T];x=De(x);const D=a.Nu(R);if(x instanceof Io)d.push(R);else{const k=Ao(x,D);k!=null&&(d.push(R),h.set(R,k))}}const g=new Ce(d);return new zd(h,g,a.fieldTransforms)}function Ao(e,t){if(Yd(e=De(e)))return Ul("Unsupported field value:",t,e),Xd(e,t);if(e instanceof Ol)return(function(r,s){if(!Wd(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let c=Ao(l,s.Lu(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(e,t)}return(function(r,s){if((r=De(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Vv(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Xt.fromDate(r);return{timestampValue:Wi(s.serializer,i)}}if(r instanceof Xt){const i=new Xt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Wi(s.serializer,i)}}if(r instanceof Ml)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof sr)return{bytesValue:vd(s.serializer,r._byteString)};if(r instanceof ke){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:yl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ll)return(function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map((c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return pl(l.serializer,c)}))}}}}}})(r,s);throw s.Bu(`Unsupported field value: ${kl(r)}`)})(e,t)}function Xd(e,t){const n={};return Wf(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):lr(e,((r,s)=>{const i=Ao(s,t.Mu(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function Yd(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof Xt||e instanceof Ml||e instanceof sr||e instanceof ke||e instanceof Ol||e instanceof Ll)}function Ul(e,t,n){if(!Yd(n)||!(function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)})(n)){const r=kl(n);throw r==="an object"?t.Bu(e+" a custom object"):t.Bu(e+" "+r)}}function La(e,t,n){if((t=De(t))instanceof wo)return t._internalPath;if(typeof t=="string")return Bl(e,t);throw Yi("Field path arguments must be of type string or ",e,!1,void 0,n)}const $T=new RegExp("[~\\*/\\[\\]]");function Bl(e,t,n){if(t.search($T)>=0)throw Yi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new wo(...t.split("."))._internalPath}catch{throw Yi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Yi(e,t,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new J(O.INVALID_ARGUMENT,l+e+c)}function Jd(e,t){return e.some((n=>n.isEqual(t)))}/**
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
 */class Ji{constructor(t,n,r,s,i){this._firestore=t,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new qT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(Zd("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class qT extends Ji{data(){return super.data()}}function Zd(e,t){return typeof t=="string"?Bl(e,t):t instanceof wo?t._internalPath:t._delegate._internalPath}class tp{convertValue(t,n="none"){switch(rr(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Kt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes(nr(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 11:return this.convertObject(t.mapValue,n);case 10:return this.convertVectorValue(t.mapValue);default:throw it()}}convertObject(t,n){return this.convertObjectMap(t.fields,n)}convertObjectMap(t,n="none"){const r={};return lr(t,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(t){var n,r,s;const i=(s=(r=(n=t.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((a=>Kt(a.doubleValue)));return new Ll(i)}convertGeoPoint(t){return new Ml(Kt(t.latitude),Kt(t.longitude))}convertArray(t,n){return(t.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(t,n){switch(n){case"previous":const r=ul(t);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ns(t));default:return null}}convertTimestamp(t){const n=Fn(t);return new Xt(n.seconds,n.nanos)}convertDocumentKey(t,n){const r=Nt.fromString(t);Tt(Rd(r));const s=new Os(r.get(1),r.get(3)),i=new tt(r.popFirst(5));return s.isEqual(n)||En(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function ep(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class KT extends tp{constructor(t){super(),this.firestore=t}convertBytes(t){return new sr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new ke(this.firestore,null,n)}}/**
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
 */class np{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class jl extends Ji{constructor(t,n,r,s,i,a){super(t,n,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new HT(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const r=this._document.data.field(Zd("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class HT extends jl{data(t={}){return super.data(t)}}/**
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
 */function zT(e){e=Us(e,ke);const t=Us(e.firestore,To);return xT(Nl(t),e._key).then((n=>QT(t,e,n)))}class rp extends tp{constructor(t){super(),this.firestore=t}convertBytes(t){return new sr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new ke(this.firestore,null,n)}}function WT(e,t){const n=Us(e.firestore,To),r=Ma(e),s=ep(e.converter,t);return GT(n,[Qd(Gd(e.firestore),"addDoc",r._key,s,e.converter!==null,{}).toMutation(r._key,Ae.exists(!1))]).then((()=>r))}function GT(e,t){return(function(r,s){const i=new mn;return r.asyncQueue.enqueueAndForget((async()=>mT(await PT(r),s,i))),i.promise})(Nl(e),t)}function QT(e,t,n){const r=n.docs.get(t._key),s=new rp(e);return new jl(e,s,t._key,r,new np(n.hasPendingWrites,n.fromCache),t.converter)}/**
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
 */const XT={maxAttempts:5};function os(e,t){if((e=De(e)).firestore!==t)throw new J(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
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
 */class YT extends class{constructor(n,r){this._firestore=n,this._transaction=r,this._dataReader=Gd(n)}get(n){const r=os(n,this._firestore),s=new KT(this._firestore);return this._transaction.lookup([r._key]).then((i=>{if(!i||i.length!==1)return it();const a=i[0];if(a.isFoundDocument())return new Ji(this._firestore,s,a.key,a,r.converter);if(a.isNoDocument())return new Ji(this._firestore,s,r._key,null,r.converter);throw it()}))}set(n,r,s){const i=os(n,this._firestore),a=ep(i.converter,r,s),l=Qd(this._dataReader,"Transaction.set",i._key,a,i.converter!==null,s);return this._transaction.set(i._key,l),this}update(n,r,s,...i){const a=os(n,this._firestore);let l;return l=typeof(r=De(r))=="string"||r instanceof wo?jT(this._dataReader,"Transaction.update",a._key,r,s,i):BT(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,l),this}delete(n){const r=os(n,this._firestore);return this._transaction.delete(r._key),this}}{constructor(t,n){super(t,n),this._firestore=t}get(t){const n=os(t,this._firestore),r=new rp(this._firestore);return super.get(t).then((s=>new jl(this._firestore,r,n._key,s._document,new np(!1,!1),n.converter)))}}function JT(e,t,n){e=Us(e,To);const r=Object.assign(Object.assign({},XT),n);return(function(i){if(i.maxAttempts<1)throw new J(O.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,a,l){const c=new mn;return i.asyncQueue.enqueueAndForget((async()=>{const d=await CT(i);new bT(i.asyncQueue,d,l,a,c).au()})),c.promise})(Nl(e),(s=>t(new YT(e,s))),r)}(function(t,n=!0){(function(s){Ur=s})(Nf),xs(new xr("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new To(new zy(r.getProvider("auth-internal")),new Xy(r.getProvider("app-check-internal")),(function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new J(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Os(d.options.projectId,h)})(a,s),a);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),kn(Vc,"4.7.3",t),kn(Vc,"4.7.3","esm2017")})();/**
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
 */const sp="firebasestorage.googleapis.com",ip="storageBucket",ZT=120*1e3,tw=600*1e3;/**
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
 */class qt extends ar{constructor(t,n,r=0){super(sa(t),`Firebase Storage: ${n} (${sa(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,qt.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return sa(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var $t;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})($t||($t={}));function sa(e){return"storage/"+e}function $l(){const e="An unknown error occurred, please check the error payload for server response.";return new qt($t.UNKNOWN,e)}function ew(e){return new qt($t.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function nw(e){return new qt($t.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function rw(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new qt($t.UNAUTHENTICATED,e)}function sw(){return new qt($t.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function iw(e){return new qt($t.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function ow(){return new qt($t.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function aw(){return new qt($t.CANCELED,"User canceled the upload/download.")}function lw(e){return new qt($t.INVALID_URL,"Invalid URL '"+e+"'.")}function uw(e){return new qt($t.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function cw(){return new qt($t.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ip+"' property when initializing the app?")}function hw(){return new qt($t.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function fw(){return new qt($t.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function dw(e){return new qt($t.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Fa(e){return new qt($t.INVALID_ARGUMENT,e)}function op(){return new qt($t.APP_DELETED,"The Firebase app was deleted.")}function pw(e){return new qt($t.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function bs(e,t){return new qt($t.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function as(e){throw new qt($t.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class Ve{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=Ve.makeFromUrl(t,n)}catch{return new Ve(t,"")}if(r.path==="")return r;throw uw(t)}static makeFromUrl(t,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i($){$.path.charAt($.path.length-1)==="/"&&($.path_=$.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+s+a,"i"),c={bucket:1,path:3};function d($){$.path_=decodeURIComponent($.path)}const h="v[A-Za-z0-9_]+",g=n.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",R=new RegExp(`^https?://${g}/${h}/b/${s}/o${T}`,"i"),x={bucket:1,path:3},D=n===sp?"(?:storage.googleapis.com|storage.cloud.google.com)":n,k="([^?#]*)",X=new RegExp(`^https?://${D}/${s}/${k}`,"i"),Q=[{regex:l,indices:c,postModify:i},{regex:R,indices:x,postModify:d},{regex:X,indices:{bucket:1,path:2},postModify:d}];for(let $=0;$<Q.length;$++){const mt=Q[$],_t=mt.regex.exec(t);if(_t){const b=_t[mt.indices.bucket];let _=_t[mt.indices.path];_||(_=""),r=new Ve(b,_),mt.postModify(r);break}}if(r==null)throw lw(t);return r}}class mw{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function gw(e,t,n){let r=1,s=null,i=null,a=!1,l=0;function c(){return l===2}let d=!1;function h(...k){d||(d=!0,t.apply(null,k))}function g(k){s=setTimeout(()=>{s=null,e(R,c())},k)}function T(){i&&clearTimeout(i)}function R(k,...X){if(d){T();return}if(k){T(),h.call(null,k,...X);return}if(c()||a){T(),h.call(null,k,...X);return}r<64&&(r*=2);let Q;l===1?(l=2,Q=0):Q=(r+Math.random())*1e3,g(Q)}let x=!1;function D(k){x||(x=!0,T(),!d&&(s!==null?(k||(l=2),clearTimeout(s),g(0)):k||(l=1)))}return g(0),i=setTimeout(()=>{a=!0,D(!0)},n),D}function _w(e){e(!1)}/**
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
 */function yw(e){return e!==void 0}function vw(e){return typeof e=="object"&&!Array.isArray(e)}function ql(e){return typeof e=="string"||e instanceof String}function fh(e){return Kl()&&e instanceof Blob}function Kl(){return typeof Blob<"u"}function dh(e,t,n,r){if(r<t)throw Fa(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Fa(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function Hl(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function ap(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const s=t(r)+"="+t(e[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var tr;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(tr||(tr={}));/**
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
 */function Ew(e,t){const n=e>=500&&e<600,s=[408,429].indexOf(e)!==-1,i=t.indexOf(e)!==-1;return n||s||i}/**
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
 */class Tw{constructor(t,n,r,s,i,a,l,c,d,h,g,T=!0){this.url_=t,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=c,this.timeout_=d,this.progressCallback_=h,this.connectionFactory_=g,this.retry=T,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,x)=>{this.resolve_=R,this.reject_=x,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new Ti(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=l=>{const c=l.loaded,d=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const l=i.getErrorCode()===tr.NO_ERROR,c=i.getStatus();if(!l||Ew(c,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===tr.ABORT;r(!1,new Ti(!1,null,h));return}const d=this.successCodes_.indexOf(c)!==-1;r(!0,new Ti(d,i))})},n=(r,s)=>{const i=this.resolve_,a=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());yw(c)?i(c):i()}catch(c){a(c)}else if(l!==null){const c=$l();c.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,c)):a(c)}else if(s.canceled){const c=this.appDelete_?op():aw();a(c)}else{const c=ow();a(c)}};this.canceled_?n(!1,new Ti(!1,null,!0)):this.backoffId_=gw(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&_w(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ti{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function ww(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function Iw(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Aw(e,t){t&&(e["X-Firebase-GMPID"]=t)}function bw(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Rw(e,t,n,r,s,i,a=!0){const l=ap(e.urlParams),c=e.url+l,d=Object.assign({},e.headers);return Aw(d,t),ww(d,n),Iw(d,i),bw(d,r),new Tw(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,a)}/**
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
 */function Sw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Pw(...e){const t=Sw();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(Kl())return new Blob(e);throw new qt($t.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Cw(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */function Vw(e){if(typeof atob>"u")throw dw("base-64");return atob(e)}/**
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
 */const Xe={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ia{constructor(t,n){this.data=t,this.contentType=n||null}}function xw(e,t){switch(e){case Xe.RAW:return new ia(lp(t));case Xe.BASE64:case Xe.BASE64URL:return new ia(up(e,t));case Xe.DATA_URL:return new ia(Dw(t),Nw(t))}throw $l()}function lp(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const i=r,a=e.charCodeAt(++n);r=65536|(i&1023)<<10|a&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function kw(e){let t;try{t=decodeURIComponent(e)}catch{throw bs(Xe.DATA_URL,"Malformed data URL.")}return lp(t)}function up(e,t){switch(e){case Xe.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw bs(e,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Xe.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw bs(e,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Vw(t)}catch(s){throw s.message.includes("polyfill")?s:bs(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class cp{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw bs(Xe.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Ow(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Dw(e){const t=new cp(e);return t.base64?up(Xe.BASE64,t.rest):kw(t.rest)}function Nw(e){return new cp(e).contentType}function Ow(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
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
 */class Pn{constructor(t,n){let r=0,s="";fh(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,n){if(fh(this.data_)){const r=this.data_,s=Cw(r,t,n);return s===null?null:new Pn(s)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new Pn(r,!0)}}static getBlob(...t){if(Kl()){const n=t.map(r=>r instanceof Pn?r.data_:r);return new Pn(Pw.apply(null,n))}else{const n=t.map(a=>ql(a)?xw(Xe.RAW,a).data:a.data_);let r=0;n.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(a=>{for(let l=0;l<a.length;l++)s[i++]=a[l]}),new Pn(s,!0)}}uploadData(){return this.data_}}/**
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
 */function hp(e){let t;try{t=JSON.parse(e)}catch{return null}return vw(t)?t:null}/**
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
 */function Mw(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Lw(e,t){const n=t.split("/").filter(r=>r.length>0).join("/");return e.length===0?n:e+"/"+n}function fp(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
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
 */function Fw(e,t){return t}class ye{constructor(t,n,r,s){this.server=t,this.local=n||t,this.writable=!!r,this.xform=s||Fw}}let wi=null;function Uw(e){return!ql(e)||e.length<2?e:fp(e)}function dp(){if(wi)return wi;const e=[];e.push(new ye("bucket")),e.push(new ye("generation")),e.push(new ye("metageneration")),e.push(new ye("name","fullPath",!0));function t(i,a){return Uw(a)}const n=new ye("name");n.xform=t,e.push(n);function r(i,a){return a!==void 0?Number(a):a}const s=new ye("size");return s.xform=r,e.push(s),e.push(new ye("timeCreated")),e.push(new ye("updated")),e.push(new ye("md5Hash",null,!0)),e.push(new ye("cacheControl",null,!0)),e.push(new ye("contentDisposition",null,!0)),e.push(new ye("contentEncoding",null,!0)),e.push(new ye("contentLanguage",null,!0)),e.push(new ye("contentType",null,!0)),e.push(new ye("metadata","customMetadata",!0)),wi=e,wi}function Bw(e,t){function n(){const r=e.bucket,s=e.fullPath,i=new Ve(r,s);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function jw(e,t,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const a=n[i];r[a.local]=a.xform(r,t[a.server])}return Bw(r,e),r}function pp(e,t,n){const r=hp(t);return r===null?null:jw(e,r,n)}function $w(e,t,n,r){const s=hp(t);if(s===null||!ql(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const h=e.bucket,g=e.fullPath,T="/b/"+a(h)+"/o/"+a(g),R=Hl(T,n,r),x=ap({alt:"media",token:d});return R+x})[0]}function qw(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(n[i.server]=e[i.local])}return JSON.stringify(n)}class mp{constructor(t,n,r,s){this.url=t,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function gp(e){if(!e)throw $l()}function Kw(e,t){function n(r,s){const i=pp(e,s,t);return gp(i!==null),i}return n}function Hw(e,t){function n(r,s){const i=pp(e,s,t);return gp(i!==null),$w(i,s,e.host,e._protocol)}return n}function _p(e){function t(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=sw():s=rw():n.getStatus()===402?s=nw(e.bucket):n.getStatus()===403?s=iw(e.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return t}function zw(e){const t=_p(e);function n(r,s){let i=t(r,s);return r.getStatus()===404&&(i=ew(e.path)),i.serverResponse=s.serverResponse,i}return n}function Ww(e,t,n){const r=t.fullServerUrl(),s=Hl(r,e.host,e._protocol),i="GET",a=e.maxOperationRetryTime,l=new mp(s,i,Hw(e,n),a);return l.errorHandler=zw(t),l}function Gw(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Qw(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=Gw(null,t)),r}function Xw(e,t,n,r,s){const i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function l(){let Q="";for(let $=0;$<2;$++)Q=Q+Math.random().toString().slice(2);return Q}const c=l();a["Content-Type"]="multipart/related; boundary="+c;const d=Qw(t,r,s),h=qw(d,n),g="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+d.contentType+`\r
\r
`,T=`\r
--`+c+"--",R=Pn.getBlob(g,r,T);if(R===null)throw hw();const x={name:d.fullPath},D=Hl(i,e.host,e._protocol),k="POST",X=e.maxUploadRetryTime,W=new mp(D,k,Kw(e,n),X);return W.urlParams=x,W.headers=a,W.body=R.uploadData(),W.errorHandler=_p(t),W}class Yw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=tr.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=tr.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=tr.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,s){if(this.sent_)throw as("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw as("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw as("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw as("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw as("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Jw extends Yw{initXhr(){this.xhr_.responseType="text"}}function yp(){return new Jw}/**
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
 */class ir{constructor(t,n){this._service=t,n instanceof Ve?this._location=n:this._location=Ve.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new ir(t,n)}get root(){const t=new Ve(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return fp(this._location.path)}get storage(){return this._service}get parent(){const t=Mw(this._location.path);if(t===null)return null;const n=new Ve(this._location.bucket,t);return new ir(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw pw(t)}}function Zw(e,t,n){e._throwIfRoot("uploadBytes");const r=Xw(e.storage,e._location,dp(),new Pn(t,!0),n);return e.storage.makeRequestWithTokens(r,yp).then(s=>({metadata:s,ref:e}))}function tI(e){e._throwIfRoot("getDownloadURL");const t=Ww(e.storage,e._location,dp());return e.storage.makeRequestWithTokens(t,yp).then(n=>{if(n===null)throw fw();return n})}function eI(e,t){const n=Lw(e._location.path,t),r=new Ve(e._location.bucket,n);return new ir(e.storage,r)}/**
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
 */function nI(e){return/^[A-Za-z]+:\/\//.test(e)}function rI(e,t){return new ir(e,t)}function vp(e,t){if(e instanceof zl){const n=e;if(n._bucket==null)throw cw();const r=new ir(n,n._bucket);return t!=null?vp(r,t):r}else return t!==void 0?eI(e,t):e}function sI(e,t){if(t&&nI(t)){if(e instanceof zl)return rI(e,t);throw Fa("To use ref(service, url), the first argument must be a Storage instance.")}else return vp(e,t)}function ph(e,t){const n=t==null?void 0:t[ip];return n==null?null:Ve.makeFromBucketSpec(n,e)}function iI(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken=typeof s=="string"?s:Pf(s,e.app.options.projectId))}class zl{constructor(t,n,r,s,i){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=sp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=ZT,this._maxUploadRetryTime=tw,this._requests=new Set,s!=null?this._bucket=Ve.makeFromBucketSpec(s,this._host):this._bucket=ph(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Ve.makeFromBucketSpec(this._url,t):this._bucket=ph(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){dh("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){dh("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new ir(this,t)}_makeRequest(t,n,r,s,i=!0){if(this._deleted)return new mw(op());{const a=Rw(t,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,s).getPromise()}}const mh="@firebase/storage",gh="0.13.2";/**
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
 */const Ep="storage";function oI(e,t,n){return e=De(e),Zw(e,t,n)}function aI(e){return e=De(e),tI(e)}function lI(e,t){return e=De(e),sI(e,t)}function uI(e=Mf(),t){e=De(e);const r=Df(e,Ep).getImmediate({identifier:t}),s=Rf("storage");return s&&cI(r,...s),r}function cI(e,t,n,r={}){iI(e,t,n,r)}function hI(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new zl(n,r,s,t,Nf)}function fI(){xs(new xr(Ep,hI,"PUBLIC").setMultipleInstances(!0)),kn(mh,gh,""),kn(mh,gh,"esm2017")}fI();const dI={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},Tp=Of(dI),Ii=OT(Tp),pI=uI(Tp),mI=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},gI={class:"p-4 md:p-6 min-h-screen"},_I={class:"max-w-3xl mx-auto space-y-4"},yI={class:"bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md text-center"},vI={class:"text-sm text-slate-600 mt-3"},EI={key:0,class:"bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center"},TI={class:"text-3xl font-black text-teal-600 my-3 tracking-wider"},wI={key:0,label:"Qiraati"},II=["value"],AI={key:1,label:"Non-Qiraati"},bI=["value"],RI={key:0,class:"flex flex-wrap gap-2 mt-2"},SI=["href"],PI=["href"],CI={key:1,class:"mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-slate-700 whitespace-pre-line"},VI={key:2,class:"mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-700 whitespace-pre-line max-h-40 overflow-y-auto"},xI=["type","required","placeholder","value","onInput"],kI=["required","placeholder","value","onInput"],DI=["required","value","onChange"],NI=["value"],OI={key:3,class:"flex items-center gap-2 text-sm pt-1.5"},MI=["checked","onChange"],LI=["accept","onChange"],FI=["placeholder","value","onInput"],UI={key:6,class:"text-[10px] text-slate-500 mt-0.5"},BI={class:"flex gap-3 items-center pt-1.5"},jI={class:"flex items-center gap-1 text-sm"},$I={class:"flex items-center gap-1 text-sm"},qI={key:0,class:"text-[11px] text-emerald-600 mt-1"},KI={key:0,class:"text-[11px] text-emerald-600 mt-1"},HI={class:"bg-white rounded-2xl p-4 shadow-sm"},zI={class:"flex items-start gap-2 cursor-pointer"},WI={class:"text-xs text-slate-700"},GI={class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},QI=["disabled"],XI={key:0,class:"fas fa-spinner fa-spin mr-2"},YI={key:1,class:"fas fa-paper-plane mr-2"},JI={key:0,class:"text-xs text-rose-600 mt-2 text-center"},ZI={__name:"PsbFormView",setup(e){const t=qu({props:["title","icon"],setup(v,{slots:p}){return()=>{var P;return _r("div",{class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},[_r("h3",{class:"text-xs font-black text-teal-700 uppercase tracking-wide mb-3"},[_r("i",{class:(v.icon||"")+" mr-1"})," "+v.title]),_r("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3"},(P=p.default)==null?void 0:P.call(p))])}}}),n=qu({props:["label","full"],setup(v,{slots:p}){return()=>{var P;return _r("div",{class:v.full?"md:col-span-2":""},[_r("label",{class:"block text-xs font-bold text-slate-500 mb-1 uppercase"},v.label),(P=p.default)==null?void 0:P.call(p)])}}}),r=un(!1),s=un(!1),i=un(""),a=un(""),l=un([]),c=vr(()=>{const v=new Date,p=v.getFullYear();return v.getMonth()+1>=7?`${p}/${p+1}`:`${p-1}/${p}`}),d=()=>({nama:"",nama_panggilan:"",jk:"",nik:"",no_kk:"",tempat_lahir:"",tgl_lahir:"",alamat_jalan:"",alamat_desa:"",alamat_kecamatan:"",alamat_kabupaten:"",alamat_provinsi:"",lembaga_tujuan:"",ayah:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},ibu:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},yang_mendaftarkan:"",wa_wali:"",acf:{}}),h=un(d()),g=un({akta:null,kk:null}),T=un(!1),R=un({}),x=vr(()=>w.value?Array.isArray(w.value.psb_fields)?w.value.psb_fields:[]:[]);async function D(v,p){var ft;const P=(ft=p.target.files)==null?void 0:ft[0];if(P){if(P.size>5*1024*1024){i.value=`File ${v} terlalu besar (max 5MB)`,p.target.value="";return}R.value[v]=await Q(P),i.value=""}}const k=vr(()=>l.value.filter(v=>/qiraati|tpq|pra ptpt|p3h|ptpt/i.test(v.nama)).map(v=>v.nama)),X=vr(()=>l.value.filter(v=>!/qiraati|tpq|pra ptpt|p3h|ptpt/i.test(v.nama)).map(v=>v.nama));function W(v){return(v/1024).toFixed(0)}async function Q(v,p=1600,P=.8){return!v||!v.type.startsWith("image/")?v:new Promise(ft=>{const Rt=new FileReader;Rt.onload=G=>{const ut=new Image;ut.onload=()=>{const Ht=Math.min(1,p/ut.width),ue=Math.round(ut.width*Ht),be=Math.round(ut.height*Ht),Lt=document.createElement("canvas");Lt.width=ue,Lt.height=be,Lt.getContext("2d").drawImage(ut,0,0,ue,be),Lt.toBlob(cr=>{if(!cr)return ft(v);const rn=new File([cr],v.name.replace(/\.(png|webp|gif)$/i,".jpg"),{type:"image/jpeg"});ft(rn)},"image/jpeg",P)},ut.onerror=()=>ft(v),ut.src=G.target.result},Rt.onerror=()=>ft(v),Rt.readAsDataURL(v)})}async function $(v){var P;const p=(P=v.target.files)==null?void 0:P[0];if(p){if(p.size>5*1024*1024){i.value="Akta terlalu besar (max 5MB)",v.target.value="";return}g.value.akta=await Q(p),i.value=""}}async function mt(v){var P;const p=(P=v.target.files)==null?void 0:P[0];if(p){if(p.size>5*1024*1024){i.value="KK terlalu besar (max 5MB)",v.target.value="";return}g.value.kk=await Q(p),i.value=""}}async function _t(v,p){if(!v)return"";const P=lI(pI,p);return await oI(P,v),await aI(P)}async function b(v){const p=Ma(Ii,"settings","psb_counter");return await JT(Ii,async P=>{const ft=await P.get(p),Rt=ft.exists()?ft.data()||{}:{},G=v.replace("/","_"),Ht=Number(Rt[G]||0)+1;Rt[G]=Ht,ft.exists()?P.update(p,Rt):P.set(p,Rt);const ue=String(Ht).padStart(3,"0");return`PSB-${v.replace("/","-")}-${ue}`})}async function _(){if(i.value="",!h.value.nama||!h.value.jk||!h.value.tempat_lahir||!h.value.tgl_lahir){i.value="Lengkapi identitas santri";return}if(!h.value.lembaga_tujuan){i.value="Pilih lembaga tujuan";return}if(!h.value.yang_mendaftarkan||!h.value.wa_wali){i.value="Lengkapi data yang mendaftarkan";return}if(!T.value){i.value="Harap setujui syarat & ketentuan terlebih dahulu";return}for(const v of x.value)if(v.required&&(h.value.acf[v.id]===void 0||h.value.acf[v.id]===""||h.value.acf[v.id]===null)){i.value=`Field "${v.label}" wajib diisi`;return}s.value=!0;try{const v=c.value,p=await b(v),P=`psb/${v.replace("/","-")}/${p}`,ft=g.value.akta?await _t(g.value.akta,`${P}/akta_${g.value.akta.name}`):"",Rt=g.value.kk?await _t(g.value.kk,`${P}/kk_${g.value.kk.name}`):"",G={};for(const[Ht,ue]of Object.entries(R.value))if(ue)try{G[Ht]=await _t(ue,`${P}/acf_${Ht}_${ue.name}`)}catch{}const ut={no_pendaftaran:p,tahun_ajaran:v,tanggal_daftar:new Date().toISOString(),tgl_daftar:new Date().toISOString().slice(0,10),lembaga_tujuan:h.value.lembaga_tujuan,nama:h.value.nama,nama_panggilan:h.value.nama_panggilan,jk:h.value.jk,nik:h.value.nik,no_kk:h.value.no_kk,tempat_lahir:h.value.tempat_lahir,tgl_lahir:h.value.tgl_lahir,alamat_jalan:h.value.alamat_jalan,alamat_desa:h.value.alamat_desa,alamat_kecamatan:h.value.alamat_kecamatan,alamat_kabupaten:h.value.alamat_kabupaten,alamat_provinsi:h.value.alamat_provinsi,ayah:{...h.value.ayah},ibu:{...h.value.ibu},yang_mendaftarkan:h.value.yang_mendaftarkan,nama_wali:h.value.yang_mendaftarkan,wa_wali:h.value.wa_wali,dokumen:{akta_url:ft,kk_url:Rt},acf:{...h.value.acf,...G},setujui_syarat:!0,status:"pending",audit:{created_at:new Date().toISOString(),source:"public_psb_site"}};await WT(NT(Ii,"psb_pendaftaran"),ut),a.value=p,r.value=!0}catch(v){i.value="Gagal submit: "+(v.message||v)}finally{s.value=!1}}function E(){h.value=d(),g.value={akta:null,kk:null},T.value=!1,R.value={},r.value=!1,a.value="",i.value="",window.scrollTo({top:0,behavior:"smooth"})}async function I(){var v;try{const p=await zT(Ma(Ii,"master","lembaga"));if(p.exists()){const P=((v=p.data())==null?void 0:v.list)||[],ft=["yayasan","pondok","kantor","admin","non-lembaga","non_lembaga","non lembaga","divisi","unit"],Rt=/^(yayasan|pondok pesantren|pondok|kantor|admin|sarana|sarana\s*&\s*prasarana|sarana prasarana|prasarana)\b/i;l.value=P.map(G=>typeof G=="string"?{nama:G,tipe:""}:{nama:(G==null?void 0:G.lembaga)||(G==null?void 0:G.nama)||"",tipe:String((G==null?void 0:G.tipe)||(G==null?void 0:G.tipe_lembaga)||"").toLowerCase().trim(),info_pembayaran_url:(G==null?void 0:G.info_pembayaran_url)||"",syarat_ketentuan_url:(G==null?void 0:G.syarat_ketentuan_url)||"",info_pembayaran_teks:(G==null?void 0:G.info_pembayaran_teks)||"",syarat_ketentuan_teks:(G==null?void 0:G.syarat_ketentuan_teks)||"",psb_fields:Array.isArray(G==null?void 0:G.psb_fields)?G.psb_fields:[]}).filter(G=>!(!G.nama||ft.includes(G.tipe)||Rt.test(G.nama.trim())))}}catch{l.value=["TPQ Pagi","TPQ Sore","Pra PTPT","PTPT","PPPH","PAUD","TK","SD","MI","SMP","MTs","SMA","MA","Madrasah Diniyah"].map(P=>({nama:P,tipe:""}))}}const w=vr(()=>{var v;return(v=h.value)!=null&&v.lembaga_tujuan&&l.value.find(p=>p.nama===h.value.lembaga_tujuan)||null});return Jh(I),(v,p)=>(vt(),Ct("div",gI,[B("div",_I,[B("div",yI,[p[32]||(p[32]=B("img",{src:g_,alt:"Logo MU",class:"w-20 h-20 mx-auto mb-3"},null,-1)),p[33]||(p[33]=B("h1",{class:"text-xl md:text-2xl font-black text-slate-800"},"PSB Pondok Pesantren Mambaul Ulum",-1)),p[34]||(p[34]=B("p",{class:"text-xs text-teal-700 font-bold uppercase tracking-widest mt-1"},"Generasi Qurani Pewaris Negeri",-1)),B("p",vI,[p[31]||(p[31]=Yt("Formulir Penerimaan Santri Baru — Tahun Ajaran ",-1)),B("b",null,ne(c.value),1)])]),r.value?(vt(),Ct("div",EI,[p[36]||(p[36]=B("i",{class:"fas fa-check-circle text-emerald-500 text-6xl mb-3"},null,-1)),p[37]||(p[37]=B("h2",{class:"text-lg font-black text-emerald-700"},"Pendaftaran Berhasil!",-1)),p[38]||(p[38]=B("p",{class:"text-sm text-slate-600 mt-2"},"No. Pendaftaran Anda:",-1)),B("p",TI,ne(a.value),1),p[39]||(p[39]=B("p",{class:"text-xs text-slate-500"},"Simpan nomor di atas. Admin akan menghubungi via WhatsApp.",-1)),B("button",{onClick:E,class:"mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"},[...p[35]||(p[35]=[B("i",{class:"fas fa-plus mr-1"},null,-1),Yt("Daftarkan Lagi ",-1)])])])):(vt(),Ct("form",{key:1,onSubmit:c_(_,["prevent"]),class:"space-y-4"},[nt(dt(t),{title:"Lembaga Tujuan",icon:"fas fa-school"},{default:pt(()=>[nt(dt(n),{label:"Lembaga Tujuan *",full:""},{default:pt(()=>[bt(B("select",{"onUpdate:modelValue":p[0]||(p[0]=P=>h.value.lembaga_tujuan=P),required:"",class:"input"},[p[40]||(p[40]=B("option",{value:""},"-- Pilih Lembaga --",-1)),k.value.length?(vt(),Ct("optgroup",wI,[(vt(!0),Ct(Se,null,gi(k.value,P=>(vt(),Ct("option",{key:P,value:P},ne(P),9,II))),128))])):Me("",!0),X.value.length?(vt(),Ct("optgroup",AI,[(vt(!0),Ct(Se,null,gi(X.value,P=>(vt(),Ct("option",{key:P,value:P},ne(P),9,bI))),128))])):Me("",!0)],512),[[Xo,h.value.lembaga_tujuan]]),w.value&&(w.value.info_pembayaran_url||w.value.syarat_ketentuan_url)?(vt(),Ct("div",RI,[w.value.info_pembayaran_url?(vt(),Ct("a",{key:0,href:w.value.info_pembayaran_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"},[...p[41]||(p[41]=[B("i",{class:"fas fa-file-invoice-dollar"},null,-1),Yt(" Info Pembayaran (PDF) ",-1)])],8,SI)):Me("",!0),w.value.syarat_ketentuan_url?(vt(),Ct("a",{key:1,href:w.value.syarat_ketentuan_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300"},[...p[42]||(p[42]=[B("i",{class:"fas fa-file-contract"},null,-1),Yt(" Syarat & Ketentuan (PDF) ",-1)])],8,PI)):Me("",!0)])):Me("",!0),w.value&&w.value.info_pembayaran_teks?(vt(),Ct("div",CI,[p[43]||(p[43]=B("p",{class:"font-bold text-emerald-800 mb-1"},[B("i",{class:"fas fa-info-circle mr-1"}),Yt("Info Pembayaran:")],-1)),Yt(" "+ne(w.value.info_pembayaran_teks),1)])):Me("",!0),w.value&&w.value.syarat_ketentuan_teks?(vt(),Ct("div",VI,[p[44]||(p[44]=B("p",{class:"font-bold text-blue-800 mb-1"},[B("i",{class:"fas fa-file-contract mr-1"}),Yt("Syarat & Ketentuan:")],-1)),Yt(" "+ne(w.value.syarat_ketentuan_teks),1)])):Me("",!0)]),_:1})]),_:1}),w.value&&x.value.length?(vt(),Li(dt(t),{key:0,title:"Data Tambahan",icon:"fas fa-list-check"},{default:pt(()=>[(vt(!0),Ct(Se,null,gi(x.value,P=>(vt(),Li(dt(n),{key:P.id,label:P.label+(P.required?" *":""),full:P.full},{default:pt(()=>[P.type==="text"||P.type==="number"||P.type==="tel"||P.type==="email"||P.type==="date"?(vt(),Ct("input",{key:0,type:P.type,required:!!P.required,placeholder:P.placeholder||"",value:h.value.acf[P.id]||"",onInput:ft=>h.value.acf[P.id]=ft.target.value,class:"input"},null,40,xI)):P.type==="textarea"?(vt(),Ct("textarea",{key:1,required:!!P.required,placeholder:P.placeholder||"",value:h.value.acf[P.id]||"",onInput:ft=>h.value.acf[P.id]=ft.target.value,rows:"3",class:"input resize-none"},null,40,kI)):P.type==="dropdown"||P.type==="select"?(vt(),Ct("select",{key:2,required:!!P.required,value:h.value.acf[P.id]||"",onChange:ft=>h.value.acf[P.id]=ft.target.value,class:"input"},[p[45]||(p[45]=B("option",{value:""},"-- Pilih --",-1)),(vt(!0),Ct(Se,null,gi(P.options||[],ft=>(vt(),Ct("option",{key:ft,value:ft},ne(ft),9,NI))),128))],40,DI)):P.type==="checkbox"?(vt(),Ct("label",OI,[B("input",{type:"checkbox",checked:!!h.value.acf[P.id],onChange:ft=>h.value.acf[P.id]=ft.target.checked},null,40,MI),B("span",null,ne(P.placeholder||P.label),1)])):P.type==="file"?(vt(),Ct("input",{key:4,type:"file",accept:P.accept||"image/*,application/pdf",onChange:ft=>D(P.id,ft),class:"input"},null,40,LI)):(vt(),Ct("input",{key:5,type:"text",placeholder:P.placeholder||"",value:h.value.acf[P.id]||"",onInput:ft=>h.value.acf[P.id]=ft.target.value,class:"input"},null,40,FI)),P.help?(vt(),Ct("p",UI,ne(P.help),1)):Me("",!0)]),_:2},1032,["label","full"]))),128))]),_:1})):Me("",!0),nt(dt(t),{title:"I. Identitas Santri",icon:"fas fa-user-graduate"},{default:pt(()=>[nt(dt(n),{label:"Nama Lengkap *",full:""},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[1]||(p[1]=P=>h.value.nama=P),type:"text",required:"",placeholder:"Sesuai akta lahir",class:"input"},null,512),[[Mt,h.value.nama]])]),_:1}),nt(dt(n),{label:"Nama Panggilan"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[2]||(p[2]=P=>h.value.nama_panggilan=P),type:"text",class:"input"},null,512),[[Mt,h.value.nama_panggilan]])]),_:1}),nt(dt(n),{label:"Jenis Kelamin *"},{default:pt(()=>[B("div",BI,[B("label",jI,[bt(B("input",{type:"radio","onUpdate:modelValue":p[3]||(p[3]=P=>h.value.jk=P),value:"L",required:""},null,512),[[gc,h.value.jk]]),p[46]||(p[46]=Yt(" Laki-laki",-1))]),B("label",$I,[bt(B("input",{type:"radio","onUpdate:modelValue":p[4]||(p[4]=P=>h.value.jk=P),value:"P"},null,512),[[gc,h.value.jk]]),p[47]||(p[47]=Yt(" Perempuan",-1))])])]),_:1}),nt(dt(n),{label:"NIK (16 digit)"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[5]||(p[5]=P=>h.value.nik=P),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[Mt,h.value.nik]])]),_:1}),nt(dt(n),{label:"No. KK (16 digit)"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[6]||(p[6]=P=>h.value.no_kk=P),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[Mt,h.value.no_kk]])]),_:1}),nt(dt(n),{label:"Tempat Lahir *"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[7]||(p[7]=P=>h.value.tempat_lahir=P),type:"text",required:"",class:"input"},null,512),[[Mt,h.value.tempat_lahir]])]),_:1}),nt(dt(n),{label:"Tanggal Lahir *"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[8]||(p[8]=P=>h.value.tgl_lahir=P),type:"date",required:"",class:"input"},null,512),[[Mt,h.value.tgl_lahir]])]),_:1}),nt(dt(n),{label:"Jalan / Dusun",full:""},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[9]||(p[9]=P=>h.value.alamat_jalan=P),type:"text",class:"input",placeholder:"Jalan / Dusun / RT-RW"},null,512),[[Mt,h.value.alamat_jalan]])]),_:1}),nt(dt(n),{label:"Desa / Kelurahan"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[10]||(p[10]=P=>h.value.alamat_desa=P),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_desa]])]),_:1}),nt(dt(n),{label:"Kecamatan"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[11]||(p[11]=P=>h.value.alamat_kecamatan=P),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_kecamatan]])]),_:1}),nt(dt(n),{label:"Kabupaten / Kota"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[12]||(p[12]=P=>h.value.alamat_kabupaten=P),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_kabupaten]])]),_:1}),nt(dt(n),{label:"Provinsi"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[13]||(p[13]=P=>h.value.alamat_provinsi=P),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_provinsi]])]),_:1})]),_:1}),nt(dt(t),{title:"II. Identitas Ayah",icon:"fas fa-male"},{default:pt(()=>[nt(dt(n),{label:"Nama Ayah"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[14]||(p[14]=P=>h.value.ayah.nama=P),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.nama]])]),_:1}),nt(dt(n),{label:"NIK"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[15]||(p[15]=P=>h.value.ayah.nik=P),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[Mt,h.value.ayah.nik]])]),_:1}),nt(dt(n),{label:"Tempat Lahir"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[16]||(p[16]=P=>h.value.ayah.tempat_lahir=P),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.tempat_lahir]])]),_:1}),nt(dt(n),{label:"Tanggal Lahir"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[17]||(p[17]=P=>h.value.ayah.tgl_lahir=P),type:"date",class:"input"},null,512),[[Mt,h.value.ayah.tgl_lahir]])]),_:1}),nt(dt(n),{label:"Pendidikan"},{default:pt(()=>[bt(B("select",{"onUpdate:modelValue":p[18]||(p[18]=P=>h.value.ayah.pendidikan=P),class:"input"},[...p[48]||(p[48]=[B("option",{value:""},"-- Pilih --",-1),B("option",null,"Tidak Sekolah",-1),B("option",null,"SD/Sederajat",-1),B("option",null,"SMP/Sederajat",-1),B("option",null,"SMA/Sederajat",-1),B("option",null,"D1/D2/D3",-1),B("option",null,"S1",-1),B("option",null,"S2",-1),B("option",null,"S3",-1)])],512),[[Xo,h.value.ayah.pendidikan]])]),_:1}),nt(dt(n),{label:"Pekerjaan"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[19]||(p[19]=P=>h.value.ayah.pekerjaan=P),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.pekerjaan]])]),_:1}),nt(dt(n),{label:"Telp / HP"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[20]||(p[20]=P=>h.value.ayah.telp=P),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.ayah.telp]])]),_:1})]),_:1}),nt(dt(t),{title:"III. Identitas Ibu",icon:"fas fa-female"},{default:pt(()=>[nt(dt(n),{label:"Nama Ibu"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[21]||(p[21]=P=>h.value.ibu.nama=P),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.nama]])]),_:1}),nt(dt(n),{label:"NIK"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[22]||(p[22]=P=>h.value.ibu.nik=P),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[Mt,h.value.ibu.nik]])]),_:1}),nt(dt(n),{label:"Tempat Lahir"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[23]||(p[23]=P=>h.value.ibu.tempat_lahir=P),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.tempat_lahir]])]),_:1}),nt(dt(n),{label:"Tanggal Lahir"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[24]||(p[24]=P=>h.value.ibu.tgl_lahir=P),type:"date",class:"input"},null,512),[[Mt,h.value.ibu.tgl_lahir]])]),_:1}),nt(dt(n),{label:"Pendidikan"},{default:pt(()=>[bt(B("select",{"onUpdate:modelValue":p[25]||(p[25]=P=>h.value.ibu.pendidikan=P),class:"input"},[...p[49]||(p[49]=[B("option",{value:""},"-- Pilih --",-1),B("option",null,"Tidak Sekolah",-1),B("option",null,"SD/Sederajat",-1),B("option",null,"SMP/Sederajat",-1),B("option",null,"SMA/Sederajat",-1),B("option",null,"D1/D2/D3",-1),B("option",null,"S1",-1),B("option",null,"S2",-1),B("option",null,"S3",-1)])],512),[[Xo,h.value.ibu.pendidikan]])]),_:1}),nt(dt(n),{label:"Pekerjaan"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[26]||(p[26]=P=>h.value.ibu.pekerjaan=P),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.pekerjaan]])]),_:1}),nt(dt(n),{label:"Telp / HP"},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[27]||(p[27]=P=>h.value.ibu.telp=P),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.ibu.telp]])]),_:1})]),_:1}),nt(dt(t),{title:"Upload Dokumen",icon:"fas fa-file-image"},{default:pt(()=>[nt(dt(n),{label:"Akta Kelahiran (image/PDF, max 5MB)",full:""},{default:pt(()=>[B("input",{type:"file",accept:"image/*,application/pdf",onChange:$,class:"input"},null,32),g.value.akta?(vt(),Ct("p",qI,[p[50]||(p[50]=B("i",{class:"fas fa-check mr-1"},null,-1)),Yt(ne(g.value.akta.name)+" ("+ne(W(g.value.akta.size))+" KB)",1)])):Me("",!0)]),_:1}),nt(dt(n),{label:"Kartu Keluarga (image/PDF, max 5MB)",full:""},{default:pt(()=>[B("input",{type:"file",accept:"image/*,application/pdf",onChange:mt,class:"input"},null,32),g.value.kk?(vt(),Ct("p",KI,[p[51]||(p[51]=B("i",{class:"fas fa-check mr-1"},null,-1)),Yt(ne(g.value.kk.name)+" ("+ne(W(g.value.kk.size))+" KB)",1)])):Me("",!0)]),_:1})]),_:1}),nt(dt(t),{title:"Yang Mendaftarkan",icon:"fas fa-pen-to-square"},{default:pt(()=>[nt(dt(n),{label:"Nama Yang Mendaftarkan *",full:""},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[28]||(p[28]=P=>h.value.yang_mendaftarkan=P),type:"text",required:"",class:"input",placeholder:"Misal: Ayah / Ibu / Wali"},null,512),[[Mt,h.value.yang_mendaftarkan]])]),_:1}),nt(dt(n),{label:"WhatsApp *",full:""},{default:pt(()=>[bt(B("input",{"onUpdate:modelValue":p[29]||(p[29]=P=>h.value.wa_wali=P),type:"tel",required:"",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.wa_wali]])]),_:1})]),_:1}),B("div",HI,[B("label",zI,[bt(B("input",{type:"checkbox","onUpdate:modelValue":p[30]||(p[30]=P=>T.value=P),required:"",class:"mt-1"},null,512),[[a_,T.value]]),B("span",WI,[p[52]||(p[52]=Yt(" Saya menyetujui ",-1)),p[53]||(p[53]=B("b",null,"Syarat & Ketentuan",-1)),p[54]||(p[54]=Yt(" serta ",-1)),p[55]||(p[55]=B("b",null,"Info Pembayaran",-1)),Yt(" yang berlaku di lembaga "+ne(h.value.lembaga_tujuan||"tujuan")+", dan menyatakan data yang diisi adalah benar. ",1)])])]),B("div",GI,[B("button",{type:"submit",disabled:s.value||!T.value,class:"w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-black text-base rounded-xl transition shadow-md"},[s.value?(vt(),Ct("i",XI)):(vt(),Ct("i",YI)),Yt(" "+ne(s.value?"Memproses…":"DAFTARKAN"),1)],8,QI),i.value?(vt(),Ct("p",JI,[p[56]||(p[56]=B("i",{class:"fas fa-exclamation-triangle mr-1"},null,-1)),Yt(ne(i.value),1)])):Me("",!0)])],32)),p[57]||(p[57]=B("p",{class:"text-center text-[10px] text-slate-400 pt-2"}," © 2026 Pondok Pesantren Mambaul Ulum · Public PSB Site v1.0 ",-1))])]))}},tA=mI(ZI,[["__scopeId","data-v-959a8c4f"]]),eA={__name:"App",setup(e){return(t,n)=>(vt(),Li(tA))}};d_(eA).mount("#app");
