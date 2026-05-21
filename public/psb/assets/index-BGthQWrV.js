(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ja(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Ot={},Rr=[],nn=()=>{},_h=()=>!1,eo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),no=e=>e.startsWith("onUpdate:"),he=Object.assign,$a=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Hp=Object.prototype.hasOwnProperty,xt=(e,t)=>Hp.call(e,t),lt=Array.isArray,Sr=e=>qs(e)==="[object Map]",jr=e=>qs(e)==="[object Set]",Uu=e=>qs(e)==="[object Date]",pt=e=>typeof e=="function",qt=e=>typeof e=="string",sn=e=>typeof e=="symbol",Dt=e=>e!==null&&typeof e=="object",yh=e=>(Dt(e)||pt(e))&&pt(e.then)&&pt(e.catch),vh=Object.prototype.toString,qs=e=>vh.call(e),zp=e=>qs(e).slice(8,-1),Eh=e=>qs(e)==="[object Object]",qa=e=>qt(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ms=ja(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ro=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Wp=/-\w/g,He=ro(e=>e.replace(Wp,t=>t.slice(1).toUpperCase())),Gp=/\B([A-Z])/g,cr=ro(e=>e.replace(Gp,"-$1").toLowerCase()),Th=ro(e=>e.charAt(0).toUpperCase()+e.slice(1)),jo=ro(e=>e?`on${Th(e)}`:""),tn=(e,t)=>!Object.is(e,t),Ri=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},wh=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},so=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Bu;const io=()=>Bu||(Bu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ka(e){if(lt(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=qt(r)?Jp(r):Ka(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(qt(e)||Dt(e))return e}const Qp=/;(?![^(]*\))/g,Xp=/:([^]+)/,Yp=/\/\*[^]*?\*\//g;function Jp(e){const t={};return e.replace(Yp,"").split(Qp).forEach(n=>{if(n){const r=n.split(Xp);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function Ps(e){let t="";if(qt(e))t=e;else if(lt(e))for(let n=0;n<e.length;n++){const r=Ps(e[n]);r&&(t+=r+" ")}else if(Dt(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Zp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",tm=ja(Zp);function bh(e){return!!e||e===""}function em(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Un(e[r],t[r]);return n}function Un(e,t){if(e===t)return!0;let n=Uu(e),r=Uu(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=sn(e),r=sn(t),n||r)return e===t;if(n=lt(e),r=lt(t),n||r)return n&&r?em(e,t):!1;if(n=Dt(e),r=Dt(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const a in e){const l=e.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!Un(e[a],t[a]))return!1}}return String(e)===String(t)}function Ha(e,t){return e.findIndex(n=>Un(n,t))}const Ih=e=>!!(e&&e.__v_isRef===!0),oe=e=>qt(e)?e:e==null?"":lt(e)||Dt(e)&&(e.toString===vh||!pt(e.toString))?Ih(e)?oe(e.value):JSON.stringify(e,Ah,2):String(e),Ah=(e,t)=>Ih(t)?Ah(e,t.value):Sr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[$o(r,i)+" =>"]=s,n),{})}:jr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>$o(n))}:sn(t)?$o(t):Dt(t)&&!lt(t)&&!Eh(t)?String(t):t,$o=(e,t="")=>{var n;return sn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ae;class nm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ae&&(ae.active?(this.parent=ae,this.index=(ae.scopes||(ae.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=ae;try{return ae=this,t()}finally{ae=n}}}on(){++this._on===1&&(this.prevScope=ae,ae=this)}off(){if(this._on>0&&--this._on===0){if(ae===this)ae=this.prevScope;else{let t=ae;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function rm(){return ae}let Lt;const qo=new WeakSet;class Rh{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ae&&(ae.active?ae.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,qo.has(this)&&(qo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ph(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ju(this),Ch(this);const t=Lt,n=ze;Lt=this,ze=!0;try{return this.fn()}finally{Vh(this),Lt=t,ze=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ga(t);this.deps=this.depsTail=void 0,ju(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?qo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){la(this)&&this.run()}get dirty(){return la(this)}}let Sh=0,gs,_s;function Ph(e,t=!1){if(e.flags|=8,t){e.next=_s,_s=e;return}e.next=gs,gs=e}function za(){Sh++}function Wa(){if(--Sh>0)return;if(_s){let t=_s;for(_s=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;gs;){let t=gs;for(gs=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Ch(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Vh(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Ga(r),sm(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function la(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(kh(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function kh(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Cs)||(e.globalVersion=Cs,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!la(e))))return;e.flags|=2;const t=e.dep,n=Lt,r=ze;Lt=e,ze=!0;try{Ch(e);const s=e.fn(e._value);(t.version===0||tn(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{Lt=n,ze=r,Vh(e),e.flags&=-3}}function Ga(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ga(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function sm(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let ze=!0;const xh=[];function En(){xh.push(ze),ze=!1}function Tn(){const e=xh.pop();ze=e===void 0?!0:e}function ju(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Lt;Lt=void 0;try{t()}finally{Lt=n}}}let Cs=0;class im{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Qa{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Lt||!ze||Lt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Lt)n=this.activeLink=new im(Lt,this),Lt.deps?(n.prevDep=Lt.depsTail,Lt.depsTail.nextDep=n,Lt.depsTail=n):Lt.deps=Lt.depsTail=n,Dh(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Lt.depsTail,n.nextDep=void 0,Lt.depsTail.nextDep=n,Lt.depsTail=n,Lt.deps===n&&(Lt.deps=r)}return n}trigger(t){this.version++,Cs++,this.notify(t)}notify(t){za();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Wa()}}}function Dh(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Dh(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const ua=new WeakMap,er=Symbol(""),ca=Symbol(""),Vs=Symbol("");function Ee(e,t,n){if(ze&&Lt){let r=ua.get(e);r||ua.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new Qa),s.map=r,s.key=n),s.track()}}function gn(e,t,n,r,s,i){const a=ua.get(e);if(!a){Cs++;return}const l=c=>{c&&c.trigger()};if(za(),t==="clear")a.forEach(l);else{const c=lt(e),d=c&&qa(n);if(c&&n==="length"){const h=Number(r);a.forEach((m,E)=>{(E==="length"||E===Vs||!sn(E)&&E>=h)&&l(m)})}else switch((n!==void 0||a.has(void 0))&&l(a.get(n)),d&&l(a.get(Vs)),t){case"add":c?d&&l(a.get("length")):(l(a.get(er)),Sr(e)&&l(a.get(ca)));break;case"delete":c||(l(a.get(er)),Sr(e)&&l(a.get(ca)));break;case"set":Sr(e)&&l(a.get(er));break}}Wa()}function vr(e){const t=kt(e);return t===e?t:(Ee(t,"iterate",Vs),je(e)?t:t.map(We))}function oo(e){return Ee(e=kt(e),"iterate",Vs),e}function Je(e,t){return wn(e)?kr(nr(e)?We(t):t):We(t)}const om={__proto__:null,[Symbol.iterator](){return Ko(this,Symbol.iterator,e=>Je(this,e))},concat(...e){return vr(this).concat(...e.map(t=>lt(t)?vr(t):t))},entries(){return Ko(this,"entries",e=>(e[1]=Je(this,e[1]),e))},every(e,t){return dn(this,"every",e,t,void 0,arguments)},filter(e,t){return dn(this,"filter",e,t,n=>n.map(r=>Je(this,r)),arguments)},find(e,t){return dn(this,"find",e,t,n=>Je(this,n),arguments)},findIndex(e,t){return dn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return dn(this,"findLast",e,t,n=>Je(this,n),arguments)},findLastIndex(e,t){return dn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return dn(this,"forEach",e,t,void 0,arguments)},includes(...e){return Ho(this,"includes",e)},indexOf(...e){return Ho(this,"indexOf",e)},join(e){return vr(this).join(e)},lastIndexOf(...e){return Ho(this,"lastIndexOf",e)},map(e,t){return dn(this,"map",e,t,void 0,arguments)},pop(){return ss(this,"pop")},push(...e){return ss(this,"push",e)},reduce(e,...t){return $u(this,"reduce",e,t)},reduceRight(e,...t){return $u(this,"reduceRight",e,t)},shift(){return ss(this,"shift")},some(e,t){return dn(this,"some",e,t,void 0,arguments)},splice(...e){return ss(this,"splice",e)},toReversed(){return vr(this).toReversed()},toSorted(e){return vr(this).toSorted(e)},toSpliced(...e){return vr(this).toSpliced(...e)},unshift(...e){return ss(this,"unshift",e)},values(){return Ko(this,"values",e=>Je(this,e))}};function Ko(e,t,n){const r=oo(e),s=r[t]();return r!==e&&!je(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const am=Array.prototype;function dn(e,t,n,r,s,i){const a=oo(e),l=a!==e&&!je(e),c=a[t];if(c!==am[t]){const m=c.apply(e,i);return l?We(m):m}let d=n;a!==e&&(l?d=function(m,E){return n.call(this,Je(e,m),E,e)}:n.length>2&&(d=function(m,E){return n.call(this,m,E,e)}));const h=c.call(a,d,r);return l&&s?s(h):h}function $u(e,t,n,r){const s=oo(e),i=s!==e&&!je(e);let a=n,l=!1;s!==e&&(i?(l=r.length===0,a=function(d,h,m){return l&&(l=!1,d=Je(e,d)),n.call(this,d,Je(e,h),m,e)}):n.length>3&&(a=function(d,h,m){return n.call(this,d,h,m,e)}));const c=s[t](a,...r);return l?Je(e,c):c}function Ho(e,t,n){const r=kt(e);Ee(r,"iterate",Vs);const s=r[t](...n);return(s===-1||s===!1)&&Za(n[0])?(n[0]=kt(n[0]),r[t](...n)):s}function ss(e,t,n=[]){En(),za();const r=kt(e)[t].apply(e,n);return Wa(),Tn(),r}const lm=ja("__proto__,__v_isRef,__isVue"),Nh=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(sn));function um(e){sn(e)||(e=String(e));const t=kt(this);return Ee(t,"has",e),t.hasOwnProperty(e)}class Oh{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?vm:Uh:i?Fh:Lh).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const a=lt(t);if(!s){let c;if(a&&(c=om[n]))return c;if(n==="hasOwnProperty")return um}const l=Reflect.get(t,n,Te(t)?t:r);if((sn(n)?Nh.has(n):lm(n))||(s||Ee(t,"get",n),i))return l;if(Te(l)){const c=a&&qa(n)?l:l.value;return s&&Dt(c)?fa(c):c}return Dt(l)?s?fa(l):Ya(l):l}}class Mh extends Oh{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const a=lt(t)&&qa(n);if(!this._isShallow){const d=wn(i);if(!je(r)&&!wn(r)&&(i=kt(i),r=kt(r)),!a&&Te(i)&&!Te(r))return d||(i.value=r),!0}const l=a?Number(n)<t.length:xt(t,n),c=Reflect.set(t,n,r,Te(t)?t:s);return t===kt(s)&&(l?tn(r,i)&&gn(t,"set",n,r):gn(t,"add",n,r)),c}deleteProperty(t,n){const r=xt(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&gn(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!sn(n)||!Nh.has(n))&&Ee(t,"has",n),r}ownKeys(t){return Ee(t,"iterate",lt(t)?"length":er),Reflect.ownKeys(t)}}class cm extends Oh{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const hm=new Mh,fm=new cm,dm=new Mh(!0);const ha=e=>e,mi=e=>Reflect.getPrototypeOf(e);function pm(e,t,n){return function(...r){const s=this.__v_raw,i=kt(s),a=Sr(i),l=e==="entries"||e===Symbol.iterator&&a,c=e==="keys"&&a,d=s[e](...r),h=n?ha:t?kr:We;return!t&&Ee(i,"iterate",c?ca:er),he(Object.create(d),{next(){const{value:m,done:E}=d.next();return E?{value:m,done:E}:{value:l?[h(m[0]),h(m[1])]:h(m),done:E}}})}}function gi(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function mm(e,t){const n={get(s){const i=this.__v_raw,a=kt(i),l=kt(s);e||(tn(s,l)&&Ee(a,"get",s),Ee(a,"get",l));const{has:c}=mi(a),d=t?ha:e?kr:We;if(c.call(a,s))return d(i.get(s));if(c.call(a,l))return d(i.get(l));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!e&&Ee(kt(s),"iterate",er),s.size},has(s){const i=this.__v_raw,a=kt(i),l=kt(s);return e||(tn(s,l)&&Ee(a,"has",s),Ee(a,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const a=this,l=a.__v_raw,c=kt(l),d=t?ha:e?kr:We;return!e&&Ee(c,"iterate",er),l.forEach((h,m)=>s.call(i,d(h),d(m),a))}};return he(n,e?{add:gi("add"),set:gi("set"),delete:gi("delete"),clear:gi("clear")}:{add(s){const i=kt(this),a=mi(i),l=kt(s),c=!t&&!je(s)&&!wn(s)?l:s;return a.has.call(i,c)||tn(s,c)&&a.has.call(i,s)||tn(l,c)&&a.has.call(i,l)||(i.add(c),gn(i,"add",c,c)),this},set(s,i){!t&&!je(i)&&!wn(i)&&(i=kt(i));const a=kt(this),{has:l,get:c}=mi(a);let d=l.call(a,s);d||(s=kt(s),d=l.call(a,s));const h=c.call(a,s);return a.set(s,i),d?tn(i,h)&&gn(a,"set",s,i):gn(a,"add",s,i),this},delete(s){const i=kt(this),{has:a,get:l}=mi(i);let c=a.call(i,s);c||(s=kt(s),c=a.call(i,s)),l&&l.call(i,s);const d=i.delete(s);return c&&gn(i,"delete",s,void 0),d},clear(){const s=kt(this),i=s.size!==0,a=s.clear();return i&&gn(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=pm(s,e,t)}),n}function Xa(e,t){const n=mm(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(xt(n,s)&&s in r?n:r,s,i)}const gm={get:Xa(!1,!1)},_m={get:Xa(!1,!0)},ym={get:Xa(!0,!1)};const Lh=new WeakMap,Fh=new WeakMap,Uh=new WeakMap,vm=new WeakMap;function Em(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Tm(e){return e.__v_skip||!Object.isExtensible(e)?0:Em(zp(e))}function Ya(e){return wn(e)?e:Ja(e,!1,hm,gm,Lh)}function wm(e){return Ja(e,!1,dm,_m,Fh)}function fa(e){return Ja(e,!0,fm,ym,Uh)}function Ja(e,t,n,r,s){if(!Dt(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=Tm(e);if(i===0)return e;const a=s.get(e);if(a)return a;const l=new Proxy(e,i===2?r:n);return s.set(e,l),l}function nr(e){return wn(e)?nr(e.__v_raw):!!(e&&e.__v_isReactive)}function wn(e){return!!(e&&e.__v_isReadonly)}function je(e){return!!(e&&e.__v_isShallow)}function Za(e){return e?!!e.__v_raw:!1}function kt(e){const t=e&&e.__v_raw;return t?kt(t):e}function bm(e){return!xt(e,"__v_skip")&&Object.isExtensible(e)&&wh(e,"__v_skip",!0),e}const We=e=>Dt(e)?Ya(e):e,kr=e=>Dt(e)?fa(e):e;function Te(e){return e?e.__v_isRef===!0:!1}function Qe(e){return Im(e,!1)}function Im(e,t){return Te(e)?e:new Am(e,t)}class Am{constructor(t,n){this.dep=new Qa,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:kt(t),this._value=n?t:We(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||je(t)||wn(t);t=r?t:kt(t),tn(t,n)&&(this._rawValue=t,this._value=r?t:We(t),this.dep.trigger())}}function ft(e){return Te(e)?e.value:e}const Rm={get:(e,t,n)=>t==="__v_raw"?e:ft(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return Te(s)&&!Te(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function Bh(e){return nr(e)?e:new Proxy(e,Rm)}class Sm{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Qa(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Cs-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Lt!==this)return Ph(this,!0),!0}get value(){const t=this.dep.track();return kh(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Pm(e,t,n=!1){let r,s;return pt(e)?r=e:(r=e.get,s=e.set),new Sm(r,s,n)}const _i={},Di=new WeakMap;let Jn;function Cm(e,t=!1,n=Jn){if(n){let r=Di.get(n);r||Di.set(n,r=[]),r.push(e)}}function Vm(e,t,n=Ot){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:l,call:c}=n,d=K=>s?K:je(K)||s===!1||s===0?_n(K,1):_n(K);let h,m,E,S,D=!1,O=!1;if(Te(e)?(m=()=>e.value,D=je(e)):nr(e)?(m=()=>d(e),D=!0):lt(e)?(O=!0,D=e.some(K=>nr(K)||je(K)),m=()=>e.map(K=>{if(Te(K))return K.value;if(nr(K))return d(K);if(pt(K))return c?c(K,2):K()})):pt(e)?t?m=c?()=>c(e,2):e:m=()=>{if(E){En();try{E()}finally{Tn()}}const K=Jn;Jn=h;try{return c?c(e,3,[S]):e(S)}finally{Jn=K}}:m=nn,t&&s){const K=m,_t=s===!0?1/0:s;m=()=>_n(K(),_t)}const N=rm(),Y=()=>{h.stop(),N&&N.active&&$a(N.effects,h)};if(i&&t){const K=t;t=(..._t)=>{K(..._t),Y()}}let Q=O?new Array(e.length).fill(_i):_i;const X=K=>{if(!(!(h.flags&1)||!h.dirty&&!K))if(t){const _t=h.run();if(s||D||(O?_t.some((At,I)=>tn(At,Q[I])):tn(_t,Q))){E&&E();const At=Jn;Jn=h;try{const I=[_t,Q===_i?void 0:O&&Q[0]===_i?[]:Q,S];Q=_t,c?c(t,3,I):t(...I)}finally{Jn=At}}}else h.run()};return l&&l(X),h=new Rh(m),h.scheduler=a?()=>a(X,!1):X,S=K=>Cm(K,!1,h),E=h.onStop=()=>{const K=Di.get(h);if(K){if(c)c(K,4);else for(const _t of K)_t();Di.delete(h)}},t?r?X(!0):Q=h.run():a?a(X.bind(null,!0),!0):h.run(),Y.pause=h.pause.bind(h),Y.resume=h.resume.bind(h),Y.stop=Y,Y}function _n(e,t=1/0,n){if(t<=0||!Dt(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Te(e))_n(e.value,t,n);else if(lt(e))for(let r=0;r<e.length;r++)_n(e[r],t,n);else if(jr(e)||Sr(e))e.forEach(r=>{_n(r,t,n)});else if(Eh(e)){for(const r in e)_n(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&_n(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ks(e,t,n,r){try{return r?e(...r):e()}catch(s){ao(s,t,n)}}function on(e,t,n,r){if(pt(e)){const s=Ks(e,t,n,r);return s&&yh(s)&&s.catch(i=>{ao(i,t,n)}),s}if(lt(e)){const s=[];for(let i=0;i<e.length;i++)s.push(on(e[i],t,n,r));return s}}function ao(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||Ot;if(t){let l=t.parent;const c=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const h=l.ec;if(h){for(let m=0;m<h.length;m++)if(h[m](e,c,d)===!1)return}l=l.parent}if(i){En(),Ks(i,null,10,[e,c,d]),Tn();return}}km(e,n,s,r,a)}function km(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Ae=[];let Ye=-1;const Pr=[];let xn=null,wr=0;const jh=Promise.resolve();let Ni=null;function $h(e){const t=Ni||jh;return e?t.then(this?e.bind(this):e):t}function xm(e){let t=Ye+1,n=Ae.length;for(;t<n;){const r=t+n>>>1,s=Ae[r],i=ks(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function tl(e){if(!(e.flags&1)){const t=ks(e),n=Ae[Ae.length-1];!n||!(e.flags&2)&&t>=ks(n)?Ae.push(e):Ae.splice(xm(t),0,e),e.flags|=1,qh()}}function qh(){Ni||(Ni=jh.then(Hh))}function Dm(e){lt(e)?Pr.push(...e):xn&&e.id===-1?xn.splice(wr+1,0,e):e.flags&1||(Pr.push(e),e.flags|=1),qh()}function qu(e,t,n=Ye+1){for(;n<Ae.length;n++){const r=Ae[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Ae.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Kh(e){if(Pr.length){const t=[...new Set(Pr)].sort((n,r)=>ks(n)-ks(r));if(Pr.length=0,xn){xn.push(...t);return}for(xn=t,wr=0;wr<xn.length;wr++){const n=xn[wr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}xn=null,wr=0}}const ks=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Hh(e){try{for(Ye=0;Ye<Ae.length;Ye++){const t=Ae[Ye];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Ks(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ye<Ae.length;Ye++){const t=Ae[Ye];t&&(t.flags&=-2)}Ye=-1,Ae.length=0,Kh(),Ni=null,(Ae.length||Pr.length)&&Hh()}}let Be=null,zh=null;function Oi(e){const t=Be;return Be=e,zh=e&&e.type.__scopeId||null,t}function dt(e,t=Be,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&Fi(-1);const i=Oi(t);let a;try{a=e(...s)}finally{Oi(i),r._d&&Fi(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function yt(e,t){if(Be===null)return e;const n=ho(Be),r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,a,l,c=Ot]=t[s];i&&(pt(i)&&(i={mounted:i,updated:i}),i.deep&&_n(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:l,modifiers:c}))}return e}function Xn(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){const l=s[a];i&&(l.oldValue=i[a].value);let c=l.dir[r];c&&(En(),on(c,n,8,[e.el,l,e,t]),Tn())}}function Nm(e,t){if(Se){let n=Se.provides;const r=Se.parent&&Se.parent.provides;r===n&&(n=Se.provides=Object.create(r)),n[e]=t}}function Si(e,t,n=!1){const r=xg();if(r||Cr){let s=Cr?Cr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&pt(t)?t.call(r&&r.proxy):t}}const Om=Symbol.for("v-scx"),Mm=()=>Si(Om);function zo(e,t,n){return Wh(e,t,n)}function Wh(e,t,n=Ot){const{immediate:r,deep:s,flush:i,once:a}=n,l=he({},n),c=t&&r||!t&&i!=="post";let d;if(Ds){if(i==="sync"){const S=Mm();d=S.__watcherHandles||(S.__watcherHandles=[])}else if(!c){const S=()=>{};return S.stop=nn,S.resume=nn,S.pause=nn,S}}const h=Se;l.call=(S,D,O)=>on(S,h,D,O);let m=!1;i==="post"?l.scheduler=S=>{Ce(S,h&&h.suspense)}:i!=="sync"&&(m=!0,l.scheduler=(S,D)=>{D?S():tl(S)}),l.augmentJob=S=>{t&&(S.flags|=4),m&&(S.flags|=2,h&&(S.id=h.uid,S.i=h))};const E=Vm(e,t,l);return Ds&&(d?d.push(E):c&&E()),E}function Lm(e,t,n){const r=this.proxy,s=qt(e)?e.includes(".")?Gh(r,e):()=>r[e]:e.bind(r,r);let i;pt(t)?i=t:(i=t.handler,n=t);const a=Hs(this),l=Wh(s,i.bind(r),n);return a(),l}function Gh(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Fm=Symbol("_vte"),Um=e=>e.__isTeleport,Bm=Symbol("_leaveCb");function el(e,t){e.shapeFlag&6&&e.component?(e.transition=t,el(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ku(e,t){return pt(e)?he({name:e.name},t,{setup:e}):e}function Qh(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Hu(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Mi=new WeakMap;function ys(e,t,n,r,s=!1){if(lt(e)){e.forEach((O,N)=>ys(O,t&&(lt(t)?t[N]:t),n,r,s));return}if(vs(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ys(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?ho(r.component):r.el,a=s?null:i,{i:l,r:c}=e,d=t&&t.r,h=l.refs===Ot?l.refs={}:l.refs,m=l.setupState,E=kt(m),S=m===Ot?_h:O=>Hu(h,O)?!1:xt(E,O),D=(O,N)=>!(N&&Hu(h,N));if(d!=null&&d!==c){if(zu(t),qt(d))h[d]=null,S(d)&&(m[d]=null);else if(Te(d)){const O=t;D(d,O.k)&&(d.value=null),O.k&&(h[O.k]=null)}}if(pt(c))Ks(c,l,12,[a,h]);else{const O=qt(c),N=Te(c);if(O||N){const Y=()=>{if(e.f){const Q=O?S(c)?m[c]:h[c]:D()||!e.k?c.value:h[e.k];if(s)lt(Q)&&$a(Q,i);else if(lt(Q))Q.includes(i)||Q.push(i);else if(O)h[c]=[i],S(c)&&(m[c]=h[c]);else{const X=[i];D(c,e.k)&&(c.value=X),e.k&&(h[e.k]=X)}}else O?(h[c]=a,S(c)&&(m[c]=a)):N&&(D(c,e.k)&&(c.value=a),e.k&&(h[e.k]=a))};if(a){const Q=()=>{Y(),Mi.delete(e)};Q.id=-1,Mi.set(e,Q),Ce(Q,n)}else zu(e),Y()}}}function zu(e){const t=Mi.get(e);t&&(t.flags|=8,Mi.delete(e))}io().requestIdleCallback;io().cancelIdleCallback;const vs=e=>!!e.type.__asyncLoader,Xh=e=>e.type.__isKeepAlive;function jm(e,t){Yh(e,"a",t)}function $m(e,t){Yh(e,"da",t)}function Yh(e,t,n=Se){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(lo(t,r,n),n){let s=n.parent;for(;s&&s.parent;)Xh(s.parent.vnode)&&qm(r,t,n,s),s=s.parent}}function qm(e,t,n,r){const s=lo(t,e,r,!0);Zh(()=>{$a(r[t],s)},n)}function lo(e,t,n=Se,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...a)=>{En();const l=Hs(n),c=on(t,n,e,a);return l(),Tn(),c});return r?s.unshift(i):s.push(i),i}}const Rn=e=>(t,n=Se)=>{(!Ds||e==="sp")&&lo(e,(...r)=>t(...r),n)},Km=Rn("bm"),Jh=Rn("m"),Hm=Rn("bu"),zm=Rn("u"),Wm=Rn("bum"),Zh=Rn("um"),Gm=Rn("sp"),Qm=Rn("rtg"),Xm=Rn("rtc");function Ym(e,t=Se){lo("ec",e,t)}const Jm=Symbol.for("v-ndc");function yi(e,t,n,r){let s;const i=n,a=lt(e);if(a||qt(e)){const l=a&&nr(e);let c=!1,d=!1;l&&(c=!je(e),d=wn(e),e=oo(e)),s=new Array(e.length);for(let h=0,m=e.length;h<m;h++)s[h]=t(c?d?kr(We(e[h])):We(e[h]):e[h],h,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let l=0;l<e;l++)s[l]=t(l+1,l,void 0,i)}else if(Dt(e))if(e[Symbol.iterator])s=Array.from(e,(l,c)=>t(l,c,void 0,i));else{const l=Object.keys(e);s=new Array(l.length);for(let c=0,d=l.length;c<d;c++){const h=l[c];s[c]=t(e[h],h,c,i)}}else s=[];return s}const da=e=>e?Ef(e)?ho(e):da(e.parent):null,Es=he(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>da(e.parent),$root:e=>da(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>ef(e),$forceUpdate:e=>e.f||(e.f=()=>{tl(e.update)}),$nextTick:e=>e.n||(e.n=$h.bind(e.proxy)),$watch:e=>Lm.bind(e)}),Wo=(e,t)=>e!==Ot&&!e.__isScriptSetup&&xt(e,t),Zm={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:l,appContext:c}=e;if(t[0]!=="$"){const E=a[t];if(E!==void 0)switch(E){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(Wo(r,t))return a[t]=1,r[t];if(s!==Ot&&xt(s,t))return a[t]=2,s[t];if(xt(i,t))return a[t]=3,i[t];if(n!==Ot&&xt(n,t))return a[t]=4,n[t];pa&&(a[t]=0)}}const d=Es[t];let h,m;if(d)return t==="$attrs"&&Ee(e.attrs,"get",""),d(e);if((h=l.__cssModules)&&(h=h[t]))return h;if(n!==Ot&&xt(n,t))return a[t]=4,n[t];if(m=c.config.globalProperties,xt(m,t))return m[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return Wo(s,t)?(s[t]=n,!0):r!==Ot&&xt(r,t)?(r[t]=n,!0):xt(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:a}},l){let c;return!!(n[l]||e!==Ot&&l[0]!=="$"&&xt(e,l)||Wo(t,l)||xt(i,l)||xt(r,l)||xt(Es,l)||xt(s.config.globalProperties,l)||(c=a.__cssModules)&&c[l])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:xt(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Wu(e){return lt(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let pa=!0;function tg(e){const t=ef(e),n=e.proxy,r=e.ctx;pa=!1,t.beforeCreate&&Gu(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:a,watch:l,provide:c,inject:d,created:h,beforeMount:m,mounted:E,beforeUpdate:S,updated:D,activated:O,deactivated:N,beforeDestroy:Y,beforeUnmount:Q,destroyed:X,unmounted:K,render:_t,renderTracked:At,renderTriggered:I,errorCaptured:g,serverPrefetch:v,expose:w,inheritAttrs:A,components:C,directives:y,filters:re}=t;if(d&&eg(d,r,null),a)for(const Pt in a){const Et=a[Pt];pt(Et)&&(r[Pt]=Et.bind(n))}if(s){const Pt=s.call(n,n);Dt(Pt)&&(e.data=Ya(Pt))}if(pa=!0,i)for(const Pt in i){const Et=i[Pt],L=pt(Et)?Et.bind(n,n):pt(Et.get)?Et.get.bind(n,n):nn,T=!pt(Et)&&pt(Et.set)?Et.set.bind(n):nn,R=cs({get:L,set:T});Object.defineProperty(r,Pt,{enumerable:!0,configurable:!0,get:()=>R.value,set:st=>R.value=st})}if(l)for(const Pt in l)tf(l[Pt],r,n,Pt);if(c){const Pt=pt(c)?c.call(n):c;Reflect.ownKeys(Pt).forEach(Et=>{Nm(Et,Pt[Et])})}h&&Gu(h,e,"c");function Xt(Pt,Et){lt(Et)?Et.forEach(L=>Pt(L.bind(n))):Et&&Pt(Et.bind(n))}if(Xt(Km,m),Xt(Jh,E),Xt(Hm,S),Xt(zm,D),Xt(jm,O),Xt($m,N),Xt(Ym,g),Xt(Xm,At),Xt(Qm,I),Xt(Wm,Q),Xt(Zh,K),Xt(Gm,v),lt(w))if(w.length){const Pt=e.exposed||(e.exposed={});w.forEach(Et=>{Object.defineProperty(Pt,Et,{get:()=>n[Et],set:L=>n[Et]=L,enumerable:!0})})}else e.exposed||(e.exposed={});_t&&e.render===nn&&(e.render=_t),A!=null&&(e.inheritAttrs=A),C&&(e.components=C),y&&(e.directives=y),v&&Qh(e)}function eg(e,t,n=nn){lt(e)&&(e=ma(e));for(const r in e){const s=e[r];let i;Dt(s)?"default"in s?i=Si(s.from||r,s.default,!0):i=Si(s.from||r):i=Si(s),Te(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):t[r]=i}}function Gu(e,t,n){on(lt(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function tf(e,t,n,r){let s=r.includes(".")?Gh(n,r):()=>n[r];if(qt(e)){const i=t[e];pt(i)&&zo(s,i)}else if(pt(e))zo(s,e.bind(n));else if(Dt(e))if(lt(e))e.forEach(i=>tf(i,t,n,r));else{const i=pt(e.handler)?e.handler.bind(n):t[e.handler];pt(i)&&zo(s,i,e)}}function ef(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=e.appContext,l=i.get(t);let c;return l?c=l:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(d=>Li(c,d,a,!0)),Li(c,t,a)),Dt(t)&&i.set(t,c),c}function Li(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&Li(e,i,n,!0),s&&s.forEach(a=>Li(e,a,n,!0));for(const a in t)if(!(r&&a==="expose")){const l=ng[a]||n&&n[a];e[a]=l?l(e[a],t[a]):t[a]}return e}const ng={data:Qu,props:Xu,emits:Xu,methods:us,computed:us,beforeCreate:Ie,created:Ie,beforeMount:Ie,mounted:Ie,beforeUpdate:Ie,updated:Ie,beforeDestroy:Ie,beforeUnmount:Ie,destroyed:Ie,unmounted:Ie,activated:Ie,deactivated:Ie,errorCaptured:Ie,serverPrefetch:Ie,components:us,directives:us,watch:sg,provide:Qu,inject:rg};function Qu(e,t){return t?e?function(){return he(pt(e)?e.call(this,this):e,pt(t)?t.call(this,this):t)}:t:e}function rg(e,t){return us(ma(e),ma(t))}function ma(e){if(lt(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Ie(e,t){return e?[...new Set([].concat(e,t))]:t}function us(e,t){return e?he(Object.create(null),e,t):t}function Xu(e,t){return e?lt(e)&&lt(t)?[...new Set([...e,...t])]:he(Object.create(null),Wu(e),Wu(t??{})):t}function sg(e,t){if(!e)return t;if(!t)return e;const n=he(Object.create(null),e);for(const r in t)n[r]=Ie(e[r],t[r]);return n}function nf(){return{app:null,config:{isNativeTag:_h,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ig=0;function og(e,t){return function(r,s=null){pt(r)||(r=he({},r)),s!=null&&!Dt(s)&&(s=null);const i=nf(),a=new WeakSet,l=[];let c=!1;const d=i.app={_uid:ig++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Fg,get config(){return i.config},set config(h){},use(h,...m){return a.has(h)||(h&&pt(h.install)?(a.add(h),h.install(d,...m)):pt(h)&&(a.add(h),h(d,...m))),d},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),d},component(h,m){return m?(i.components[h]=m,d):i.components[h]},directive(h,m){return m?(i.directives[h]=m,d):i.directives[h]},mount(h,m,E){if(!c){const S=d._ceVNode||rt(r,s);return S.appContext=i,E===!0?E="svg":E===!1&&(E=void 0),e(S,h,E),c=!0,d._container=h,h.__vue_app__=d,ho(S.component)}},onUnmount(h){l.push(h)},unmount(){c&&(on(l,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(h,m){return i.provides[h]=m,d},runWithContext(h){const m=Cr;Cr=d;try{return h()}finally{Cr=m}}};return d}}let Cr=null;const ag=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${He(t)}Modifiers`]||e[`${cr(t)}Modifiers`];function lg(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||Ot;let s=n;const i=t.startsWith("update:"),a=i&&ag(r,t.slice(7));a&&(a.trim&&(s=n.map(h=>qt(h)?h.trim():h)),a.number&&(s=n.map(so)));let l,c=r[l=jo(t)]||r[l=jo(He(t))];!c&&i&&(c=r[l=jo(cr(t))]),c&&on(c,e,6,s);const d=r[l+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,on(d,e,6,s)}}const ug=new WeakMap;function rf(e,t,n=!1){const r=n?ug:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let a={},l=!1;if(!pt(e)){const c=d=>{const h=rf(d,t,!0);h&&(l=!0,he(a,h))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!l?(Dt(e)&&r.set(e,null),null):(lt(i)?i.forEach(c=>a[c]=null):he(a,i),Dt(e)&&r.set(e,a),a)}function uo(e,t){return!e||!eo(t)?!1:(t=t.slice(2).replace(/Once$/,""),xt(e,t[0].toLowerCase()+t.slice(1))||xt(e,cr(t))||xt(e,t))}function Yu(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:l,emit:c,render:d,renderCache:h,props:m,data:E,setupState:S,ctx:D,inheritAttrs:O}=e,N=Oi(e);let Y,Q;try{if(n.shapeFlag&4){const K=s||r,_t=K;Y=Ze(d.call(_t,K,h,m,S,E,D)),Q=l}else{const K=t;Y=Ze(K.length>1?K(m,{attrs:l,slots:a,emit:c}):K(m,null)),Q=t.props?l:cg(l)}}catch(K){Ts.length=0,ao(K,e,1),Y=rt(Bn)}let X=Y;if(Q&&O!==!1){const K=Object.keys(Q),{shapeFlag:_t}=X;K.length&&_t&7&&(i&&K.some(no)&&(Q=hg(Q,i)),X=xr(X,Q,!1,!0))}return n.dirs&&(X=xr(X,null,!1,!0),X.dirs=X.dirs?X.dirs.concat(n.dirs):n.dirs),n.transition&&el(X,n.transition),Y=X,Oi(N),Y}const cg=e=>{let t;for(const n in e)(n==="class"||n==="style"||eo(n))&&((t||(t={}))[n]=e[n]);return t},hg=(e,t)=>{const n={};for(const r in e)(!no(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function fg(e,t,n){const{props:r,children:s,component:i}=e,{props:a,children:l,patchFlag:c}=t,d=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Ju(r,a,d):!!a;if(c&8){const h=t.dynamicProps;for(let m=0;m<h.length;m++){const E=h[m];if(sf(a,r,E)&&!uo(d,E))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===a?!1:r?a?Ju(r,a,d):!0:!!a;return!1}function Ju(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(sf(t,e,i)&&!uo(n,i))return!0}return!1}function sf(e,t,n){const r=e[n],s=t[n];return n==="style"&&Dt(r)&&Dt(s)?!Un(r,s):r!==s}function dg({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const of={},af=()=>Object.create(of),lf=e=>Object.getPrototypeOf(e)===of;function pg(e,t,n,r=!1){const s={},i=af();e.propsDefaults=Object.create(null),uf(e,t,s,i);for(const a in e.propsOptions[0])a in s||(s[a]=void 0);n?e.props=r?s:wm(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function mg(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=e,l=kt(s),[c]=e.propsOptions;let d=!1;if((r||a>0)&&!(a&16)){if(a&8){const h=e.vnode.dynamicProps;for(let m=0;m<h.length;m++){let E=h[m];if(uo(e.emitsOptions,E))continue;const S=t[E];if(c)if(xt(i,E))S!==i[E]&&(i[E]=S,d=!0);else{const D=He(E);s[D]=ga(c,l,D,S,e,!1)}else S!==i[E]&&(i[E]=S,d=!0)}}}else{uf(e,t,s,i)&&(d=!0);let h;for(const m in l)(!t||!xt(t,m)&&((h=cr(m))===m||!xt(t,h)))&&(c?n&&(n[m]!==void 0||n[h]!==void 0)&&(s[m]=ga(c,l,m,void 0,e,!0)):delete s[m]);if(i!==l)for(const m in i)(!t||!xt(t,m))&&(delete i[m],d=!0)}d&&gn(e.attrs,"set","")}function uf(e,t,n,r){const[s,i]=e.propsOptions;let a=!1,l;if(t)for(let c in t){if(ms(c))continue;const d=t[c];let h;s&&xt(s,h=He(c))?!i||!i.includes(h)?n[h]=d:(l||(l={}))[h]=d:uo(e.emitsOptions,c)||(!(c in r)||d!==r[c])&&(r[c]=d,a=!0)}if(i){const c=kt(n),d=l||Ot;for(let h=0;h<i.length;h++){const m=i[h];n[m]=ga(s,c,m,d[m],e,!xt(d,m))}}return a}function ga(e,t,n,r,s,i){const a=e[n];if(a!=null){const l=xt(a,"default");if(l&&r===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&pt(c)){const{propsDefaults:d}=s;if(n in d)r=d[n];else{const h=Hs(s);r=d[n]=c.call(null,t),h()}}else r=c;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!l?r=!1:a[1]&&(r===""||r===cr(n))&&(r=!0))}return r}const gg=new WeakMap;function cf(e,t,n=!1){const r=n?gg:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,a={},l=[];let c=!1;if(!pt(e)){const h=m=>{c=!0;const[E,S]=cf(m,t,!0);he(a,E),S&&l.push(...S)};!n&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}if(!i&&!c)return Dt(e)&&r.set(e,Rr),Rr;if(lt(i))for(let h=0;h<i.length;h++){const m=He(i[h]);Zu(m)&&(a[m]=Ot)}else if(i)for(const h in i){const m=He(h);if(Zu(m)){const E=i[h],S=a[m]=lt(E)||pt(E)?{type:E}:he({},E),D=S.type;let O=!1,N=!0;if(lt(D))for(let Y=0;Y<D.length;++Y){const Q=D[Y],X=pt(Q)&&Q.name;if(X==="Boolean"){O=!0;break}else X==="String"&&(N=!1)}else O=pt(D)&&D.name==="Boolean";S[0]=O,S[1]=N,(O||xt(S,"default"))&&l.push(m)}}const d=[a,l];return Dt(e)&&r.set(e,d),d}function Zu(e){return e[0]!=="$"&&!ms(e)}const nl=e=>e==="_"||e==="_ctx"||e==="$stable",rl=e=>lt(e)?e.map(Ze):[Ze(e)],_g=(e,t,n)=>{if(t._n)return t;const r=dt((...s)=>rl(t(...s)),n);return r._c=!1,r},hf=(e,t,n)=>{const r=e._ctx;for(const s in e){if(nl(s))continue;const i=e[s];if(pt(i))t[s]=_g(s,i,r);else if(i!=null){const a=rl(i);t[s]=()=>a}}},ff=(e,t)=>{const n=rl(t);e.slots.default=()=>n},df=(e,t,n)=>{for(const r in t)(n||!nl(r))&&(e[r]=t[r])},yg=(e,t,n)=>{const r=e.slots=af();if(e.vnode.shapeFlag&32){const s=t._;s?(df(r,t,n),n&&wh(r,"_",s,!0)):hf(t,r)}else t&&ff(e,t)},vg=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,a=Ot;if(r.shapeFlag&32){const l=t._;l?n&&l===1?i=!1:df(s,t,n):(i=!t.$stable,hf(t,s)),a=t}else t&&(ff(e,t),a={default:1});if(i)for(const l in s)!nl(l)&&a[l]==null&&delete s[l]},Ce=Ig;function Eg(e){return Tg(e)}function Tg(e,t){const n=io();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:l,createComment:c,setText:d,setElementText:h,parentNode:m,nextSibling:E,setScopeId:S=nn,insertStaticContent:D}=e,O=(_,b,k,j=null,M=null,B=null,W=void 0,z=null,q=!!b.dynamicChildren)=>{if(_===b)return;_&&!is(_,b)&&(j=te(_),st(_,M,B,!0),_=null),b.patchFlag===-2&&(q=!1,b.dynamicChildren=null);const{type:U,ref:nt,shapeFlag:G}=b;switch(U){case co:N(_,b,k,j);break;case Bn:Y(_,b,k,j);break;case Qo:_==null&&Q(b,k,j,W);break;case Re:C(_,b,k,j,M,B,W,z,q);break;default:G&1?_t(_,b,k,j,M,B,W,z,q):G&6?y(_,b,k,j,M,B,W,z,q):(G&64||G&128)&&U.process(_,b,k,j,M,B,W,z,q,qe)}nt!=null&&M?ys(nt,_&&_.ref,B,b||_,!b):nt==null&&_&&_.ref!=null&&ys(_.ref,null,B,_,!0)},N=(_,b,k,j)=>{if(_==null)r(b.el=l(b.children),k,j);else{const M=b.el=_.el;b.children!==_.children&&d(M,b.children)}},Y=(_,b,k,j)=>{_==null?r(b.el=c(b.children||""),k,j):b.el=_.el},Q=(_,b,k,j)=>{[_.el,_.anchor]=D(_.children,b,k,j,_.el,_.anchor)},X=({el:_,anchor:b},k,j)=>{let M;for(;_&&_!==b;)M=E(_),r(_,k,j),_=M;r(b,k,j)},K=({el:_,anchor:b})=>{let k;for(;_&&_!==b;)k=E(_),s(_),_=k;s(b)},_t=(_,b,k,j,M,B,W,z,q)=>{if(b.type==="svg"?W="svg":b.type==="math"&&(W="mathml"),_==null)At(b,k,j,M,B,W,z,q);else{const U=_.el&&_.el._isVueCE?_.el:null;try{U&&U._beginPatch(),v(_,b,M,B,W,z,q)}finally{U&&U._endPatch()}}},At=(_,b,k,j,M,B,W,z)=>{let q,U;const{props:nt,shapeFlag:G,transition:tt,dirs:it}=_;if(q=_.el=a(_.type,B,nt&&nt.is,nt),G&8?h(q,_.children):G&16&&g(_.children,q,null,j,M,Go(_,B),W,z),it&&Xn(_,null,j,"created"),I(q,_,_.scopeId,W,j),nt){for(const ht in nt)ht!=="value"&&!ms(ht)&&i(q,ht,null,nt[ht],B,j);"value"in nt&&i(q,"value",null,nt.value,B),(U=nt.onVnodeBeforeMount)&&Xe(U,j,_)}it&&Xn(_,null,j,"beforeMount");const ot=wg(M,tt);ot&&tt.beforeEnter(q),r(q,b,k),((U=nt&&nt.onVnodeMounted)||ot||it)&&Ce(()=>{try{U&&Xe(U,j,_),ot&&tt.enter(q),it&&Xn(_,null,j,"mounted")}finally{}},M)},I=(_,b,k,j,M)=>{if(k&&S(_,k),j)for(let B=0;B<j.length;B++)S(_,j[B]);if(M){let B=M.subTree;if(b===B||_f(B.type)&&(B.ssContent===b||B.ssFallback===b)){const W=M.vnode;I(_,W,W.scopeId,W.slotScopeIds,M.parent)}}},g=(_,b,k,j,M,B,W,z,q=0)=>{for(let U=q;U<_.length;U++){const nt=_[U]=z?mn(_[U]):Ze(_[U]);O(null,nt,b,k,j,M,B,W,z)}},v=(_,b,k,j,M,B,W)=>{const z=b.el=_.el;let{patchFlag:q,dynamicChildren:U,dirs:nt}=b;q|=_.patchFlag&16;const G=_.props||Ot,tt=b.props||Ot;let it;if(k&&Yn(k,!1),(it=tt.onVnodeBeforeUpdate)&&Xe(it,k,b,_),nt&&Xn(b,_,k,"beforeUpdate"),k&&Yn(k,!0),(G.innerHTML&&tt.innerHTML==null||G.textContent&&tt.textContent==null)&&h(z,""),U?w(_.dynamicChildren,U,z,k,j,Go(b,M),B):W||Et(_,b,z,null,k,j,Go(b,M),B,!1),q>0){if(q&16)A(z,G,tt,k,M);else if(q&2&&G.class!==tt.class&&i(z,"class",null,tt.class,M),q&4&&i(z,"style",G.style,tt.style,M),q&8){const ot=b.dynamicProps;for(let ht=0;ht<ot.length;ht++){const Vt=ot[ht],Bt=G[Vt],Wt=tt[Vt];(Wt!==Bt||Vt==="value")&&i(z,Vt,Bt,Wt,M,k)}}q&1&&_.children!==b.children&&h(z,b.children)}else!W&&U==null&&A(z,G,tt,k,M);((it=tt.onVnodeUpdated)||nt)&&Ce(()=>{it&&Xe(it,k,b,_),nt&&Xn(b,_,k,"updated")},j)},w=(_,b,k,j,M,B,W)=>{for(let z=0;z<b.length;z++){const q=_[z],U=b[z],nt=q.el&&(q.type===Re||!is(q,U)||q.shapeFlag&198)?m(q.el):k;O(q,U,nt,null,j,M,B,W,!0)}},A=(_,b,k,j,M)=>{if(b!==k){if(b!==Ot)for(const B in b)!ms(B)&&!(B in k)&&i(_,B,b[B],null,M,j);for(const B in k){if(ms(B))continue;const W=k[B],z=b[B];W!==z&&B!=="value"&&i(_,B,z,W,M,j)}"value"in k&&i(_,"value",b.value,k.value,M)}},C=(_,b,k,j,M,B,W,z,q)=>{const U=b.el=_?_.el:l(""),nt=b.anchor=_?_.anchor:l("");let{patchFlag:G,dynamicChildren:tt,slotScopeIds:it}=b;it&&(z=z?z.concat(it):it),_==null?(r(U,k,j),r(nt,k,j),g(b.children||[],k,nt,M,B,W,z,q)):G>0&&G&64&&tt&&_.dynamicChildren&&_.dynamicChildren.length===tt.length?(w(_.dynamicChildren,tt,k,M,B,W,z),(b.key!=null||M&&b===M.subTree)&&pf(_,b,!0)):Et(_,b,k,nt,M,B,W,z,q)},y=(_,b,k,j,M,B,W,z,q)=>{b.slotScopeIds=z,_==null?b.shapeFlag&512?M.ctx.activate(b,k,j,W,q):re(b,k,j,M,B,W,q):Ge(_,b,q)},re=(_,b,k,j,M,B,W)=>{const z=_.component=kg(_,j,M);if(Xh(_)&&(z.ctx.renderer=qe),Dg(z,!1,W),z.asyncDep){if(M&&M.registerDep(z,Xt,W),!_.el){const q=z.subTree=rt(Bn);Y(null,q,b,k),_.placeholder=q.el}}else Xt(z,_,b,k,M,B,W)},Ge=(_,b,k)=>{const j=b.component=_.component;if(fg(_,b,k))if(j.asyncDep&&!j.asyncResolved){Pt(j,b,k);return}else j.next=b,j.update();else b.el=_.el,j.vnode=b},Xt=(_,b,k,j,M,B,W)=>{const z=()=>{if(_.isMounted){let{next:G,bu:tt,u:it,parent:ot,vnode:ht}=_;{const pe=mf(_);if(pe){G&&(G.el=ht.el,Pt(_,G,W)),pe.asyncDep.then(()=>{Ce(()=>{_.isUnmounted||U()},M)});return}}let Vt=G,Bt;Yn(_,!1),G?(G.el=ht.el,Pt(_,G,W)):G=ht,tt&&Ri(tt),(Bt=G.props&&G.props.onVnodeBeforeUpdate)&&Xe(Bt,ot,G,ht),Yn(_,!0);const Wt=Yu(_),Fe=_.subTree;_.subTree=Wt,O(Fe,Wt,m(Fe.el),te(Fe),_,M,B),G.el=Wt.el,Vt===null&&dg(_,Wt.el),it&&Ce(it,M),(Bt=G.props&&G.props.onVnodeUpdated)&&Ce(()=>Xe(Bt,ot,G,ht),M)}else{let G;const{el:tt,props:it}=b,{bm:ot,m:ht,parent:Vt,root:Bt,type:Wt}=_,Fe=vs(b);Yn(_,!1),ot&&Ri(ot),!Fe&&(G=it&&it.onVnodeBeforeMount)&&Xe(G,Vt,b),Yn(_,!0);{Bt.ce&&Bt.ce._hasShadowRoot()&&Bt.ce._injectChildStyle(Wt,_.parent?_.parent.type:void 0);const pe=_.subTree=Yu(_);O(null,pe,k,j,_,M,B),b.el=pe.el}if(ht&&Ce(ht,M),!Fe&&(G=it&&it.onVnodeMounted)){const pe=b;Ce(()=>Xe(G,Vt,pe),M)}(b.shapeFlag&256||Vt&&vs(Vt.vnode)&&Vt.vnode.shapeFlag&256)&&_.a&&Ce(_.a,M),_.isMounted=!0,b=k=j=null}};_.scope.on();const q=_.effect=new Rh(z);_.scope.off();const U=_.update=q.run.bind(q),nt=_.job=q.runIfDirty.bind(q);nt.i=_,nt.id=_.uid,q.scheduler=()=>tl(nt),Yn(_,!0),U()},Pt=(_,b,k)=>{b.component=_;const j=_.vnode.props;_.vnode=b,_.next=null,mg(_,b.props,j,k),vg(_,b.children,k),En(),qu(_),Tn()},Et=(_,b,k,j,M,B,W,z,q=!1)=>{const U=_&&_.children,nt=_?_.shapeFlag:0,G=b.children,{patchFlag:tt,shapeFlag:it}=b;if(tt>0){if(tt&128){T(U,G,k,j,M,B,W,z,q);return}else if(tt&256){L(U,G,k,j,M,B,W,z,q);return}}it&8?(nt&16&&de(U,M,B),G!==U&&h(k,G)):nt&16?it&16?T(U,G,k,j,M,B,W,z,q):de(U,M,B,!0):(nt&8&&h(k,""),it&16&&g(G,k,j,M,B,W,z,q))},L=(_,b,k,j,M,B,W,z,q)=>{_=_||Rr,b=b||Rr;const U=_.length,nt=b.length,G=Math.min(U,nt);let tt;for(tt=0;tt<G;tt++){const it=b[tt]=q?mn(b[tt]):Ze(b[tt]);O(_[tt],it,k,null,M,B,W,z,q)}U>nt?de(_,M,B,!0,!1,G):g(b,k,j,M,B,W,z,q,G)},T=(_,b,k,j,M,B,W,z,q)=>{let U=0;const nt=b.length;let G=_.length-1,tt=nt-1;for(;U<=G&&U<=tt;){const it=_[U],ot=b[U]=q?mn(b[U]):Ze(b[U]);if(is(it,ot))O(it,ot,k,null,M,B,W,z,q);else break;U++}for(;U<=G&&U<=tt;){const it=_[G],ot=b[tt]=q?mn(b[tt]):Ze(b[tt]);if(is(it,ot))O(it,ot,k,null,M,B,W,z,q);else break;G--,tt--}if(U>G){if(U<=tt){const it=tt+1,ot=it<nt?b[it].el:j;for(;U<=tt;)O(null,b[U]=q?mn(b[U]):Ze(b[U]),k,ot,M,B,W,z,q),U++}}else if(U>tt)for(;U<=G;)st(_[U],M,B,!0),U++;else{const it=U,ot=U,ht=new Map;for(U=ot;U<=tt;U++){const se=b[U]=q?mn(b[U]):Ze(b[U]);se.key!=null&&ht.set(se.key,U)}let Vt,Bt=0;const Wt=tt-ot+1;let Fe=!1,pe=0;const Pn=new Array(Wt);for(U=0;U<Wt;U++)Pn[U]=0;for(U=it;U<=G;U++){const se=_[U];if(Bt>=Wt){st(se,M,B,!0);continue}let Ue;if(se.key!=null)Ue=ht.get(se.key);else for(Vt=ot;Vt<=tt;Vt++)if(Pn[Vt-ot]===0&&is(se,b[Vt])){Ue=Vt;break}Ue===void 0?st(se,M,B,!0):(Pn[Ue-ot]=U+1,Ue>=pe?pe=Ue:Fe=!0,O(se,b[Ue],k,null,M,B,W,z,q),Bt++)}const Hr=Fe?bg(Pn):Rr;for(Vt=Hr.length-1,U=Wt-1;U>=0;U--){const se=ot+U,Ue=b[se],Zs=b[se+1],pr=se+1<nt?Zs.el||gf(Zs):j;Pn[U]===0?O(null,Ue,k,pr,M,B,W,z,q):Fe&&(Vt<0||U!==Hr[Vt]?R(Ue,k,pr,2):Vt--)}}},R=(_,b,k,j,M=null)=>{const{el:B,type:W,transition:z,children:q,shapeFlag:U}=_;if(U&6){R(_.component.subTree,b,k,j);return}if(U&128){_.suspense.move(b,k,j);return}if(U&64){W.move(_,b,k,qe);return}if(W===Re){r(B,b,k);for(let G=0;G<q.length;G++)R(q[G],b,k,j);r(_.anchor,b,k);return}if(W===Qo){X(_,b,k);return}if(j!==2&&U&1&&z)if(j===0)z.beforeEnter(B),r(B,b,k),Ce(()=>z.enter(B),M);else{const{leave:G,delayLeave:tt,afterLeave:it}=z,ot=()=>{_.ctx.isUnmounted?s(B):r(B,b,k)},ht=()=>{B._isLeaving&&B[Bm](!0),G(B,()=>{ot(),it&&it()})};tt?tt(B,ot,ht):ht()}else r(B,b,k)},st=(_,b,k,j=!1,M=!1)=>{const{type:B,props:W,ref:z,children:q,dynamicChildren:U,shapeFlag:nt,patchFlag:G,dirs:tt,cacheIndex:it,memo:ot}=_;if(G===-2&&(M=!1),z!=null&&(En(),ys(z,null,k,_,!0),Tn()),it!=null&&(b.renderCache[it]=void 0),nt&256){b.ctx.deactivate(_);return}const ht=nt&1&&tt,Vt=!vs(_);let Bt;if(Vt&&(Bt=W&&W.onVnodeBeforeUnmount)&&Xe(Bt,b,_),nt&6)Zt(_.component,k,j);else{if(nt&128){_.suspense.unmount(k,j);return}ht&&Xn(_,null,b,"beforeUnmount"),nt&64?_.type.remove(_,b,k,qe,j):U&&!U.hasOnce&&(B!==Re||G>0&&G&64)?de(U,b,k,!1,!0):(B===Re&&G&384||!M&&nt&16)&&de(q,b,k),j&&Ct(_)}const Wt=ot!=null&&it==null;(Vt&&(Bt=W&&W.onVnodeUnmounted)||ht||Wt)&&Ce(()=>{Bt&&Xe(Bt,b,_),ht&&Xn(_,null,b,"unmounted"),Wt&&(_.el=null)},k)},Ct=_=>{const{type:b,el:k,anchor:j,transition:M}=_;if(b===Re){mt(k,j);return}if(b===Qo){K(_);return}const B=()=>{s(k),M&&!M.persisted&&M.afterLeave&&M.afterLeave()};if(_.shapeFlag&1&&M&&!M.persisted){const{leave:W,delayLeave:z}=M,q=()=>W(k,B);z?z(_.el,B,q):q()}else B()},mt=(_,b)=>{let k;for(;_!==b;)k=E(_),s(_),_=k;s(b)},Zt=(_,b,k)=>{const{bum:j,scope:M,job:B,subTree:W,um:z,m:q,a:U}=_;tc(q),tc(U),j&&Ri(j),M.stop(),B&&(B.flags|=8,st(W,_,b,k)),z&&Ce(z,b),Ce(()=>{_.isUnmounted=!0},b)},de=(_,b,k,j=!1,M=!1,B=0)=>{for(let W=B;W<_.length;W++)st(_[W],b,k,j,M)},te=_=>{if(_.shapeFlag&6)return te(_.component.subTree);if(_.shapeFlag&128)return _.suspense.next();const b=E(_.anchor||_.el),k=b&&b[Fm];return k?E(k):b};let un=!1;const cn=(_,b,k)=>{let j;_==null?b._vnode&&(st(b._vnode,null,null,!0),j=b._vnode.component):O(b._vnode||null,_,b,null,null,null,k),b._vnode=_,un||(un=!0,qu(j),Kh(),un=!1)},qe={p:O,um:st,m:R,r:Ct,mt:re,mc:g,pc:Et,pbc:w,n:te,o:e};return{render:cn,hydrate:void 0,createApp:og(cn)}}function Go({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Yn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function wg(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function pf(e,t,n=!1){const r=e.children,s=t.children;if(lt(r)&&lt(s))for(let i=0;i<r.length;i++){const a=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=mn(s[i]),l.el=a.el),!n&&l.patchFlag!==-2&&pf(a,l)),l.type===co&&(l.patchFlag===-1&&(l=s[i]=mn(l)),l.el=a.el),l.type===Bn&&!l.el&&(l.el=a.el)}}function bg(e){const t=e.slice(),n=[0];let r,s,i,a,l;const c=e.length;for(r=0;r<c;r++){const d=e[r];if(d!==0){if(s=n[n.length-1],e[s]<d){t[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)l=i+a>>1,e[n[l]]<d?i=l+1:a=l;d<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=t[a];return n}function mf(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:mf(t)}function tc(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function gf(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?gf(t.subTree):null}const _f=e=>e.__isSuspense;function Ig(e,t){t&&t.pendingBranch?lt(e)?t.effects.push(...e):t.effects.push(e):Dm(e)}const Re=Symbol.for("v-fgt"),co=Symbol.for("v-txt"),Bn=Symbol.for("v-cmt"),Qo=Symbol.for("v-stc"),Ts=[];let xe=null;function gt(e=!1){Ts.push(xe=e?null:[])}function Ag(){Ts.pop(),xe=Ts[Ts.length-1]||null}let xs=1;function Fi(e,t=!1){xs+=e,e<0&&xe&&t&&(xe.hasOnce=!0)}function yf(e){return e.dynamicChildren=xs>0?xe||Rr:null,Ag(),xs>0&&xe&&xe.push(e),e}function Tt(e,t,n,r,s,i){return yf(x(e,t,n,r,s,i,!0))}function Ui(e,t,n,r,s){return yf(rt(e,t,n,r,s,!0))}function Bi(e){return e?e.__v_isVNode===!0:!1}function is(e,t){return e.type===t.type&&e.key===t.key}const vf=({key:e})=>e??null,Pi=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?qt(e)||Te(e)||pt(e)?{i:Be,r:e,k:t,f:!!n}:e:null);function x(e,t=null,n=null,r=0,s=null,i=e===Re?0:1,a=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&vf(t),ref:t&&Pi(t),scopeId:zh,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Be};return l?(sl(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=qt(n)?8:16),xs>0&&!a&&xe&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&xe.push(c),c}const rt=Rg;function Rg(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===Jm)&&(e=Bn),Bi(e)){const l=xr(e,t,!0);return n&&sl(l,n),xs>0&&!i&&xe&&(l.shapeFlag&6?xe[xe.indexOf(e)]=l:xe.push(l)),l.patchFlag=-2,l}if(Lg(e)&&(e=e.__vccOpts),t){t=Sg(t);let{class:l,style:c}=t;l&&!qt(l)&&(t.class=Ps(l)),Dt(c)&&(Za(c)&&!lt(c)&&(c=he({},c)),t.style=Ka(c))}const a=qt(e)?1:_f(e)?128:Um(e)?64:Dt(e)?4:pt(e)?2:0;return x(e,t,n,r,s,a,i,!0)}function Sg(e){return e?Za(e)||lf(e)?he({},e):e:null}function xr(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:l,transition:c}=e,d=t?Pg(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&vf(d),ref:t&&t.ref?n&&i?lt(i)?i.concat(Pi(t)):[i,Pi(t)]:Pi(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Re?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&xr(e.ssContent),ssFallback:e.ssFallback&&xr(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&el(h,c.clone(h)),h}function Gt(e=" ",t=0){return rt(co,null,e,t)}function _e(e="",t=!1){return t?(gt(),Ui(Bn,null,e)):rt(Bn,null,e)}function Ze(e){return e==null||typeof e=="boolean"?rt(Bn):lt(e)?rt(Re,null,e.slice()):Bi(e)?mn(e):rt(co,null,String(e))}function mn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:xr(e)}function sl(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(lt(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),sl(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!lf(t)?t._ctx=Be:s===3&&Be&&(Be.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else pt(t)?(t={default:t,_ctx:Be},n=32):(t=String(t),r&64?(n=16,t=[Gt(t)]):n=8);e.children=t,e.shapeFlag|=n}function Pg(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=Ps([t.class,r.class]));else if(s==="style")t.style=Ka([t.style,r.style]);else if(eo(s)){const i=t[s],a=r[s];a&&i!==a&&!(lt(i)&&i.includes(a))?t[s]=i?[].concat(i,a):a:a==null&&i==null&&!no(s)&&(t[s]=a)}else s!==""&&(t[s]=r[s])}return t}function Xe(e,t,n,r=null){on(e,t,7,[n,r])}const Cg=nf();let Vg=0;function kg(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||Cg,i={uid:Vg++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new nm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:cf(r,s),emitsOptions:rf(r,s),emit:null,emitted:null,propsDefaults:Ot,inheritAttrs:r.inheritAttrs,ctx:Ot,data:Ot,props:Ot,attrs:Ot,slots:Ot,refs:Ot,setupState:Ot,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=lg.bind(null,i),e.ce&&e.ce(i),i}let Se=null;const xg=()=>Se||Be;let ji,_a;{const e=io(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};ji=t("__VUE_INSTANCE_SETTERS__",n=>Se=n),_a=t("__VUE_SSR_SETTERS__",n=>Ds=n)}const Hs=e=>{const t=Se;return ji(e),e.scope.on(),()=>{e.scope.off(),ji(t)}},ec=()=>{Se&&Se.scope.off(),ji(null)};function Ef(e){return e.vnode.shapeFlag&4}let Ds=!1;function Dg(e,t=!1,n=!1){t&&_a(t);const{props:r,children:s}=e.vnode,i=Ef(e);pg(e,r,i,t),yg(e,s,n||t);const a=i?Ng(e,t):void 0;return t&&_a(!1),a}function Ng(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Zm);const{setup:r}=n;if(r){En();const s=e.setupContext=r.length>1?Mg(e):null,i=Hs(e),a=Ks(r,e,0,[e.props,s]),l=yh(a);if(Tn(),i(),(l||e.sp)&&!vs(e)&&Qh(e),l){if(a.then(ec,ec),t)return a.then(c=>{nc(e,c)}).catch(c=>{ao(c,e,0)});e.asyncDep=a}else nc(e,a)}else Tf(e)}function nc(e,t,n){pt(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Dt(t)&&(e.setupState=Bh(t)),Tf(e)}function Tf(e,t,n){const r=e.type;e.render||(e.render=r.render||nn);{const s=Hs(e);En();try{tg(e)}finally{Tn(),s()}}}const Og={get(e,t){return Ee(e,"get",""),e[t]}};function Mg(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Og),slots:e.slots,emit:e.emit,expose:t}}function ho(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Bh(bm(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Es)return Es[n](e)},has(t,n){return n in t||n in Es}})):e.proxy}function Lg(e){return pt(e)&&"__vccOpts"in e}const cs=(e,t)=>Pm(e,t,Ds);function Er(e,t,n){try{Fi(-1);const r=arguments.length;return r===2?Dt(t)&&!lt(t)?Bi(t)?rt(e,null,[t]):rt(e,t):rt(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Bi(n)&&(n=[n]),rt(e,t,n))}finally{Fi(1)}}const Fg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ya;const rc=typeof window<"u"&&window.trustedTypes;if(rc)try{ya=rc.createPolicy("vue",{createHTML:e=>e})}catch{}const wf=ya?e=>ya.createHTML(e):e=>e,Ug="http://www.w3.org/2000/svg",Bg="http://www.w3.org/1998/Math/MathML",pn=typeof document<"u"?document:null,sc=pn&&pn.createElement("template"),jg={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?pn.createElementNS(Ug,e):t==="mathml"?pn.createElementNS(Bg,e):n?pn.createElement(e,{is:n}):pn.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>pn.createTextNode(e),createComment:e=>pn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>pn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const a=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{sc.innerHTML=wf(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const l=sc.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}t.insertBefore(l,n)}return[a?a.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$g=Symbol("_vtc");function qg(e,t,n){const r=e[$g];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const ic=Symbol("_vod"),Kg=Symbol("_vsh"),Hg=Symbol(""),zg=/(?:^|;)\s*display\s*:/;function Wg(e,t,n){const r=e.style,s=qt(n);let i=!1;if(n&&!s){if(t)if(qt(t))for(const a of t.split(";")){const l=a.slice(0,a.indexOf(":")).trim();n[l]==null&&hs(r,l,"")}else for(const a in t)n[a]==null&&hs(r,a,"");for(const a in n){a==="display"&&(i=!0);const l=n[a];l!=null?Qg(e,a,!qt(t)&&t?t[a]:void 0,l)||hs(r,a,l):hs(r,a,"")}}else if(s){if(t!==n){const a=r[Hg];a&&(n+=";"+a),r.cssText=n,i=zg.test(n)}}else t&&e.removeAttribute("style");ic in e&&(e[ic]=i?r.display:"",e[Kg]&&(r.display="none"))}const oc=/\s*!important$/;function hs(e,t,n){if(lt(n))n.forEach(r=>hs(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Gg(e,t);oc.test(n)?e.setProperty(cr(r),n.replace(oc,""),"important"):e[r]=n}}const ac=["Webkit","Moz","ms"],Xo={};function Gg(e,t){const n=Xo[t];if(n)return n;let r=He(t);if(r!=="filter"&&r in e)return Xo[t]=r;r=Th(r);for(let s=0;s<ac.length;s++){const i=ac[s]+r;if(i in e)return Xo[t]=i}return t}function Qg(e,t,n,r){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&qt(r)&&n===r}const lc="http://www.w3.org/1999/xlink";function uc(e,t,n,r,s,i=tm(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(lc,t.slice(6,t.length)):e.setAttributeNS(lc,t,n):n==null||i&&!bh(n)?e.removeAttribute(t):e.setAttribute(t,i?"":sn(n)?String(n):n)}function cc(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?wf(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let a=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=bh(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{e[t]=n}catch{}a&&e.removeAttribute(s||t)}function yn(e,t,n,r){e.addEventListener(t,n,r)}function Xg(e,t,n,r){e.removeEventListener(t,n,r)}const hc=Symbol("_vei");function Yg(e,t,n,r,s=null){const i=e[hc]||(e[hc]={}),a=i[t];if(r&&a)a.value=r;else{const[l,c]=Jg(t);if(r){const d=i[t]=e_(r,s);yn(e,l,d,c)}else a&&(Xg(e,l,a,c),i[t]=void 0)}}const fc=/(?:Once|Passive|Capture)$/;function Jg(e){let t;if(fc.test(e)){t={};let r;for(;r=e.match(fc);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):cr(e.slice(2)),t]}let Yo=0;const Zg=Promise.resolve(),t_=()=>Yo||(Zg.then(()=>Yo=0),Yo=Date.now());function e_(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;on(n_(r,n.value),t,5,[r])};return n.value=e,n.attached=t_(),n}function n_(e,t){if(lt(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const dc=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,r_=(e,t,n,r,s,i)=>{const a=s==="svg";t==="class"?qg(e,r,a):t==="style"?Wg(e,n,r):eo(t)?no(t)||Yg(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):s_(e,t,r,a))?(cc(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&uc(e,t,r,a,i,t!=="value")):e._isVueCE&&(i_(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!qt(r)))?cc(e,He(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),uc(e,t,r,a))};function s_(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&dc(t)&&pt(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return dc(t)&&qt(n)?!1:t in e}function i_(e,t){const n=e._def.props;if(!n)return!1;const r=He(t);return Array.isArray(n)?n.some(s=>He(s)===r):Object.keys(n).some(s=>He(s)===r)}const jn=e=>{const t=e.props["onUpdate:modelValue"]||!1;return lt(t)?n=>Ri(t,n):t};function o_(e){e.target.composing=!0}function pc(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const $e=Symbol("_assign");function mc(e,t,n){return t&&(e=e.trim()),n&&(e=so(e)),e}const Mt={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[$e]=jn(s);const i=r||s.props&&s.props.type==="number";yn(e,t?"change":"input",a=>{a.target.composing||e[$e](mc(e.value,n,i))}),(n||i)&&yn(e,"change",()=>{e.value=mc(e.value,n,i)}),t||(yn(e,"compositionstart",o_),yn(e,"compositionend",pc),yn(e,"change",pc))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},a){if(e[$e]=jn(a),e.composing)return;const l=(i||e.type==="number")&&!/^0\d/.test(e.value)?so(e.value):e.value,c=t??"";if(l===c)return;const d=e.getRootNode();(d instanceof Document||d instanceof ShadowRoot)&&d.activeElement===e&&e.type!=="range"&&(r&&t===n||s&&e.value.trim()===c)||(e.value=c)}},a_={deep:!0,created(e,t,n){e[$e]=jn(n),yn(e,"change",()=>{const r=e._modelValue,s=Dr(e),i=e.checked,a=e[$e];if(lt(r)){const l=Ha(r,s),c=l!==-1;if(i&&!c)a(r.concat(s));else if(!i&&c){const d=[...r];d.splice(l,1),a(d)}}else if(jr(r)){const l=new Set(r);i?l.add(s):l.delete(s),a(l)}else a(bf(e,i))})},mounted:gc,beforeUpdate(e,t,n){e[$e]=jn(n),gc(e,t,n)}};function gc(e,{value:t,oldValue:n},r){e._modelValue=t;let s;if(lt(t))s=Ha(t,r.props.value)>-1;else if(jr(t))s=t.has(r.props.value);else{if(t===n)return;s=Un(t,bf(e,!0))}e.checked!==s&&(e.checked=s)}const Tr={created(e,{value:t},n){e.checked=Un(t,n.props.value),e[$e]=jn(n),yn(e,"change",()=>{e[$e](Dr(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[$e]=jn(r),t!==n&&(e.checked=Un(t,r.props.value))}},Jo={deep:!0,created(e,{value:t,modifiers:{number:n}},r){const s=jr(t);yn(e,"change",()=>{const i=Array.prototype.filter.call(e.options,a=>a.selected).map(a=>n?so(Dr(a)):Dr(a));e[$e](e.multiple?s?new Set(i):i:i[0]),e._assigning=!0,$h(()=>{e._assigning=!1})}),e[$e]=jn(r)},mounted(e,{value:t}){_c(e,t)},beforeUpdate(e,t,n){e[$e]=jn(n)},updated(e,{value:t}){e._assigning||_c(e,t)}};function _c(e,t){const n=e.multiple,r=lt(t);if(!(n&&!r&&!jr(t))){for(let s=0,i=e.options.length;s<i;s++){const a=e.options[s],l=Dr(a);if(n)if(r){const c=typeof l;c==="string"||c==="number"?a.selected=t.some(d=>String(d)===String(l)):a.selected=Ha(t,l)>-1}else a.selected=t.has(l);else if(Un(Dr(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Dr(e){return"_value"in e?e._value:e.value}function bf(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const l_=["ctrl","shift","alt","meta"],u_={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>l_.some(n=>e[`${n}Key`]&&!t.includes(n))},c_=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let a=0;a<t.length;a++){const l=u_[t[a]];if(l&&l(s,t))return}return e(s,...i)}))},h_=he({patchProp:r_},jg);let yc;function f_(){return yc||(yc=Eg(h_))}const d_=((...e)=>{const t=f_().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=m_(r);if(!s)return;const i=t._component;!pt(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,p_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},t});function p_(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function m_(e){return qt(e)?document.querySelector(e):e}const g_="/logo.png";var vc={};/**
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
 */const If=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=s&63|128):(s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=s&63|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=s&63|128)}return t},__=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=e[n++],a=e[n++],l=e[n++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],a=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},Af={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const i=e[s],a=s+1<e.length,l=a?e[s+1]:0,c=s+2<e.length,d=c?e[s+2]:0,h=i>>2,m=(i&3)<<4|l>>4;let E=(l&15)<<2|d>>6,S=d&63;c||(S=64,a||(E=64)),r.push(n[h],n[m],n[E],n[S])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(If(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):__(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const i=n[e.charAt(s++)],l=s<e.length?n[e.charAt(s)]:0;++s;const d=s<e.length?n[e.charAt(s)]:64;++s;const m=s<e.length?n[e.charAt(s)]:64;if(++s,i==null||l==null||d==null||m==null)throw new y_;const E=i<<2|l>>4;if(r.push(E),d!==64){const S=l<<4&240|d>>2;if(r.push(S),m!==64){const D=d<<6&192|m;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class y_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const v_=function(e){const t=If(e);return Af.encodeByteArray(t,!0)},$i=function(e){return v_(e).replace(/\./g,"")},E_=function(e){try{return Af.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */const w_=()=>T_().__FIREBASE_DEFAULTS__,b_=()=>{if(typeof process>"u"||typeof vc>"u")return;const e=vc.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},I_=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&E_(e[1]);return t&&JSON.parse(t)},il=()=>{try{return w_()||b_()||I_()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},A_=e=>{var t,n;return(n=(t=il())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},Rf=e=>{const t=A_(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},Sf=()=>{var e;return(e=il())===null||e===void 0?void 0:e.config};/**
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
 */function Pf(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[$i(JSON.stringify(n)),$i(JSON.stringify(a)),""].join(".")}/**
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
 */function S_(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function P_(){var e;const t=(e=il())===null||e===void 0?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function C_(){return!P_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function V_(){try{return typeof indexedDB=="object"}catch{return!1}}function k_(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;t(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){t(n)}})}/**
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
 */const x_="FirebaseError";class hr extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=x_,Object.setPrototypeOf(this,hr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cf.prototype.create)}}class Cf{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?D_(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new hr(s,l,r)}}function D_(e,t){return e.replace(N_,(n,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const N_=/\{\$([^}]+)}/g;function va(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const i=e[s],a=t[s];if(Ec(i)&&Ec(a)){if(!va(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ec(e){return e!==null&&typeof e=="object"}/**
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
 */function Le(e){return e&&e._delegate?e._delegate:e}class Nr{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Zn="[DEFAULT]";/**
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
 */class O_{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new R_;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(L_(t))try{this.getOrInitializeService({instanceIdentifier:Zn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=Zn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Zn){return this.instances.has(t)}getOptions(t=Zn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(t,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(t),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&t(a,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:M_(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Zn){return this.component?this.component.multipleInstances?t:Zn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function M_(e){return e===Zn?void 0:e}function L_(e){return e.instantiationMode==="EAGER"}/**
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
 */var bt;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(bt||(bt={}));const U_={debug:bt.DEBUG,verbose:bt.VERBOSE,info:bt.INFO,warn:bt.WARN,error:bt.ERROR,silent:bt.SILENT},B_=bt.INFO,j_={[bt.DEBUG]:"log",[bt.VERBOSE]:"log",[bt.INFO]:"info",[bt.WARN]:"warn",[bt.ERROR]:"error"},$_=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),s=j_[t];if(s)console[s](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Vf{constructor(t){this.name=t,this._logLevel=B_,this._logHandler=$_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in bt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?U_[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,bt.DEBUG,...t),this._logHandler(this,bt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,bt.VERBOSE,...t),this._logHandler(this,bt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,bt.INFO,...t),this._logHandler(this,bt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,bt.WARN,...t),this._logHandler(this,bt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,bt.ERROR,...t),this._logHandler(this,bt.ERROR,...t)}}const q_=(e,t)=>t.some(n=>e instanceof n);let Tc,wc;function K_(){return Tc||(Tc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function H_(){return wc||(wc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kf=new WeakMap,Ea=new WeakMap,xf=new WeakMap,Zo=new WeakMap,ol=new WeakMap;function z_(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{n(On(e.result)),s()},a=()=>{r(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",a)});return t.then(n=>{n instanceof IDBCursor&&kf.set(n,e)}).catch(()=>{}),ol.set(t,e),t}function W_(e){if(Ea.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});Ea.set(e,t)}let Ta={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Ea.get(e);if(t==="objectStoreNames")return e.objectStoreNames||xf.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return On(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function G_(e){Ta=e(Ta)}function Q_(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(ta(this),t,...n);return xf.set(r,t.sort?t.sort():[t]),On(r)}:H_().includes(e)?function(...t){return e.apply(ta(this),t),On(kf.get(this))}:function(...t){return On(e.apply(ta(this),t))}}function X_(e){return typeof e=="function"?Q_(e):(e instanceof IDBTransaction&&W_(e),q_(e,K_())?new Proxy(e,Ta):e)}function On(e){if(e instanceof IDBRequest)return z_(e);if(Zo.has(e))return Zo.get(e);const t=X_(e);return t!==e&&(Zo.set(e,t),ol.set(t,e)),t}const ta=e=>ol.get(e);function Y_(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(e,t),l=On(a);return r&&a.addEventListener("upgradeneeded",c=>{r(On(a.result),c.oldVersion,c.newVersion,On(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const J_=["get","getKey","getAll","getAllKeys","count"],Z_=["put","add","delete","clear"],ea=new Map;function bc(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ea.get(t))return ea.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=Z_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||J_.includes(n)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&c.done]))[0]};return ea.set(t,i),i}G_(e=>({...e,get:(t,n,r)=>bc(t,n)||e.get(t,n,r),has:(t,n)=>!!bc(t,n)||e.has(t,n)}));/**
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
 */class ty{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ey(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ey(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const wa="@firebase/app",Ic="0.10.13";/**
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
 */const bn=new Vf("@firebase/app"),ny="@firebase/app-compat",ry="@firebase/analytics-compat",sy="@firebase/analytics",iy="@firebase/app-check-compat",oy="@firebase/app-check",ay="@firebase/auth",ly="@firebase/auth-compat",uy="@firebase/database",cy="@firebase/data-connect",hy="@firebase/database-compat",fy="@firebase/functions",dy="@firebase/functions-compat",py="@firebase/installations",my="@firebase/installations-compat",gy="@firebase/messaging",_y="@firebase/messaging-compat",yy="@firebase/performance",vy="@firebase/performance-compat",Ey="@firebase/remote-config",Ty="@firebase/remote-config-compat",wy="@firebase/storage",by="@firebase/storage-compat",Iy="@firebase/firestore",Ay="@firebase/vertexai-preview",Ry="@firebase/firestore-compat",Sy="firebase",Py="10.14.1";/**
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
 */const ba="[DEFAULT]",Cy={[wa]:"fire-core",[ny]:"fire-core-compat",[sy]:"fire-analytics",[ry]:"fire-analytics-compat",[oy]:"fire-app-check",[iy]:"fire-app-check-compat",[ay]:"fire-auth",[ly]:"fire-auth-compat",[uy]:"fire-rtdb",[cy]:"fire-data-connect",[hy]:"fire-rtdb-compat",[fy]:"fire-fn",[dy]:"fire-fn-compat",[py]:"fire-iid",[my]:"fire-iid-compat",[gy]:"fire-fcm",[_y]:"fire-fcm-compat",[yy]:"fire-perf",[vy]:"fire-perf-compat",[Ey]:"fire-rc",[Ty]:"fire-rc-compat",[wy]:"fire-gcs",[by]:"fire-gcs-compat",[Iy]:"fire-fst",[Ry]:"fire-fst-compat",[Ay]:"fire-vertex","fire-js":"fire-js",[Sy]:"fire-js-all"};/**
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
 */const qi=new Map,Vy=new Map,Ia=new Map;function Ac(e,t){try{e.container.addComponent(t)}catch(n){bn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Ns(e){const t=e.name;if(Ia.has(t))return bn.debug(`There were multiple attempts to register component ${t}.`),!1;Ia.set(t,e);for(const n of qi.values())Ac(n,e);for(const n of Vy.values())Ac(n,e);return!0}function Df(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
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
 */const ky={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Mn=new Cf("app","Firebase",ky);/**
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
 */class xy{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Mn.create("app-deleted",{appName:this._name})}}/**
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
 */const Nf=Py;function Of(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:ba,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw Mn.create("bad-app-name",{appName:String(s)});if(n||(n=Sf()),!n)throw Mn.create("no-options");const i=qi.get(s);if(i){if(va(n,i.options)&&va(r,i.config))return i;throw Mn.create("duplicate-app",{appName:s})}const a=new F_(s);for(const c of Ia.values())a.addComponent(c);const l=new xy(n,r,a);return qi.set(s,l),l}function Mf(e=ba){const t=qi.get(e);if(!t&&e===ba&&Sf())return Of();if(!t)throw Mn.create("no-app",{appName:e});return t}function Ln(e,t,n){var r;let s=(r=Cy[e])!==null&&r!==void 0?r:e;n&&(s+=`-${n}`);const i=s.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${t}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),bn.warn(l.join(" "));return}Ns(new Nr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Dy="firebase-heartbeat-database",Ny=1,Os="firebase-heartbeat-store";let na=null;function Lf(){return na||(na=Y_(Dy,Ny,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Os)}catch(n){console.warn(n)}}}}).catch(e=>{throw Mn.create("idb-open",{originalErrorMessage:e.message})})),na}async function Oy(e){try{const n=(await Lf()).transaction(Os),r=await n.objectStore(Os).get(Ff(e));return await n.done,r}catch(t){if(t instanceof hr)bn.warn(t.message);else{const n=Mn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});bn.warn(n.message)}}}async function Rc(e,t){try{const r=(await Lf()).transaction(Os,"readwrite");await r.objectStore(Os).put(t,Ff(e)),await r.done}catch(n){if(n instanceof hr)bn.warn(n.message);else{const r=Mn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});bn.warn(r.message)}}}function Ff(e){return`${e.name}!${e.options.appId}`}/**
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
 */const My=1024,Ly=720*60*60*1e3;class Fy{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new By(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Sc();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Ly}),this._storage.overwrite(this._heartbeatsCache))}catch(r){bn.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Sc(),{heartbeatsToSend:r,unsentEntries:s}=Uy(this._heartbeatsCache.heartbeats),i=$i(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return bn.warn(n),""}}}function Sc(){return new Date().toISOString().substring(0,10)}function Uy(e,t=My){const n=[];let r=e.slice();for(const s of e){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Pc(n)>t){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Pc(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class By{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return V_()?k_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Oy(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Rc(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Rc(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Pc(e){return $i(JSON.stringify({version:2,heartbeats:e})).length}/**
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
 */function jy(e){Ns(new Nr("platform-logger",t=>new ty(t),"PRIVATE")),Ns(new Nr("heartbeat",t=>new Fy(t),"PRIVATE")),Ln(wa,Ic,e),Ln(wa,Ic,"esm2017"),Ln("fire-js","")}jy("");var $y="firebase",qy="10.14.1";/**
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
 */Ln($y,qy,"app");var Cc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rr,Uf;(function(){var e;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,g){function v(){}v.prototype=g.prototype,I.D=g.prototype,I.prototype=new v,I.prototype.constructor=I,I.C=function(w,A,C){for(var y=Array(arguments.length-2),re=2;re<arguments.length;re++)y[re-2]=arguments[re];return g.prototype[A].apply(w,y)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,v){v||(v=0);var w=Array(16);if(typeof g=="string")for(var A=0;16>A;++A)w[A]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(A=0;16>A;++A)w[A]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=I.g[0],v=I.g[1],A=I.g[2];var C=I.g[3],y=g+(C^v&(A^C))+w[0]+3614090360&4294967295;g=v+(y<<7&4294967295|y>>>25),y=C+(A^g&(v^A))+w[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=A+(v^C&(g^v))+w[2]+606105819&4294967295,A=C+(y<<17&4294967295|y>>>15),y=v+(g^A&(C^g))+w[3]+3250441966&4294967295,v=A+(y<<22&4294967295|y>>>10),y=g+(C^v&(A^C))+w[4]+4118548399&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(A^g&(v^A))+w[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=A+(v^C&(g^v))+w[6]+2821735955&4294967295,A=C+(y<<17&4294967295|y>>>15),y=v+(g^A&(C^g))+w[7]+4249261313&4294967295,v=A+(y<<22&4294967295|y>>>10),y=g+(C^v&(A^C))+w[8]+1770035416&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(A^g&(v^A))+w[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=A+(v^C&(g^v))+w[10]+4294925233&4294967295,A=C+(y<<17&4294967295|y>>>15),y=v+(g^A&(C^g))+w[11]+2304563134&4294967295,v=A+(y<<22&4294967295|y>>>10),y=g+(C^v&(A^C))+w[12]+1804603682&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(A^g&(v^A))+w[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=A+(v^C&(g^v))+w[14]+2792965006&4294967295,A=C+(y<<17&4294967295|y>>>15),y=v+(g^A&(C^g))+w[15]+1236535329&4294967295,v=A+(y<<22&4294967295|y>>>10),y=g+(A^C&(v^A))+w[1]+4129170786&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^A&(g^v))+w[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=A+(g^v&(C^g))+w[11]+643717713&4294967295,A=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(A^C))+w[0]+3921069994&4294967295,v=A+(y<<20&4294967295|y>>>12),y=g+(A^C&(v^A))+w[5]+3593408605&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^A&(g^v))+w[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=A+(g^v&(C^g))+w[15]+3634488961&4294967295,A=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(A^C))+w[4]+3889429448&4294967295,v=A+(y<<20&4294967295|y>>>12),y=g+(A^C&(v^A))+w[9]+568446438&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^A&(g^v))+w[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=A+(g^v&(C^g))+w[3]+4107603335&4294967295,A=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(A^C))+w[8]+1163531501&4294967295,v=A+(y<<20&4294967295|y>>>12),y=g+(A^C&(v^A))+w[13]+2850285829&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^A&(g^v))+w[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=A+(g^v&(C^g))+w[7]+1735328473&4294967295,A=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(A^C))+w[12]+2368359562&4294967295,v=A+(y<<20&4294967295|y>>>12),y=g+(v^A^C)+w[5]+4294588738&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^A)+w[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=A+(C^g^v)+w[11]+1839030562&4294967295,A=C+(y<<16&4294967295|y>>>16),y=v+(A^C^g)+w[14]+4259657740&4294967295,v=A+(y<<23&4294967295|y>>>9),y=g+(v^A^C)+w[1]+2763975236&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^A)+w[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=A+(C^g^v)+w[7]+4139469664&4294967295,A=C+(y<<16&4294967295|y>>>16),y=v+(A^C^g)+w[10]+3200236656&4294967295,v=A+(y<<23&4294967295|y>>>9),y=g+(v^A^C)+w[13]+681279174&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^A)+w[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=A+(C^g^v)+w[3]+3572445317&4294967295,A=C+(y<<16&4294967295|y>>>16),y=v+(A^C^g)+w[6]+76029189&4294967295,v=A+(y<<23&4294967295|y>>>9),y=g+(v^A^C)+w[9]+3654602809&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^A)+w[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=A+(C^g^v)+w[15]+530742520&4294967295,A=C+(y<<16&4294967295|y>>>16),y=v+(A^C^g)+w[2]+3299628645&4294967295,v=A+(y<<23&4294967295|y>>>9),y=g+(A^(v|~C))+w[0]+4096336452&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~A))+w[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=A+(g^(C|~v))+w[14]+2878612391&4294967295,A=C+(y<<15&4294967295|y>>>17),y=v+(C^(A|~g))+w[5]+4237533241&4294967295,v=A+(y<<21&4294967295|y>>>11),y=g+(A^(v|~C))+w[12]+1700485571&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~A))+w[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=A+(g^(C|~v))+w[10]+4293915773&4294967295,A=C+(y<<15&4294967295|y>>>17),y=v+(C^(A|~g))+w[1]+2240044497&4294967295,v=A+(y<<21&4294967295|y>>>11),y=g+(A^(v|~C))+w[8]+1873313359&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~A))+w[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=A+(g^(C|~v))+w[6]+2734768916&4294967295,A=C+(y<<15&4294967295|y>>>17),y=v+(C^(A|~g))+w[13]+1309151649&4294967295,v=A+(y<<21&4294967295|y>>>11),y=g+(A^(v|~C))+w[4]+4149444226&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~A))+w[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=A+(g^(C|~v))+w[2]+718787259&4294967295,A=C+(y<<15&4294967295|y>>>17),y=v+(C^(A|~g))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(A+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+A&4294967295,I.g[3]=I.g[3]+C&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var v=g-this.blockSize,w=this.B,A=this.h,C=0;C<g;){if(A==0)for(;C<=v;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<g;)if(w[A++]=I.charCodeAt(C++),A==this.blockSize){s(this,w),A=0;break}}else for(;C<g;)if(w[A++]=I[C++],A==this.blockSize){s(this,w),A=0;break}}this.h=A,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var v=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=v&255,v/=256;for(this.u(I),I=Array(16),g=v=0;4>g;++g)for(var w=0;32>w;w+=8)I[v++]=this.g[g]>>>w&255;return I};function i(I,g){var v=l;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=g(I)}function a(I,g){this.h=g;for(var v=[],w=!0,A=I.length-1;0<=A;A--){var C=I[A]|0;w&&C==g||(v[A]=C,w=!1)}this.g=v}var l={};function c(I){return-128<=I&&128>I?i(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return N(d(-I));for(var g=[],v=1,w=0;I>=v;w++)g[w]=I/v|0,v*=4294967296;return new a(g,0)}function h(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return N(h(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=d(Math.pow(g,8)),w=m,A=0;A<I.length;A+=8){var C=Math.min(8,I.length-A),y=parseInt(I.substring(A,A+C),g);8>C?(C=d(Math.pow(g,C)),w=w.j(C).add(d(y))):(w=w.j(v),w=w.add(d(y)))}return w}var m=c(0),E=c(1),S=c(16777216);e=a.prototype,e.m=function(){if(O(this))return-N(this).m();for(var I=0,g=1,v=0;v<this.g.length;v++){var w=this.i(v);I+=(0<=w?w:4294967296+w)*g,g*=4294967296}return I},e.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(O(this))return"-"+N(this).toString(I);for(var g=d(Math.pow(I,6)),v=this,w="";;){var A=K(v,g).g;v=Y(v,A.j(g));var C=((0<v.g.length?v.g[0]:v.h)>>>0).toString(I);if(v=A,D(v))return C+w;for(;6>C.length;)C="0"+C;w=C+w}},e.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function O(I){return I.h==-1}e.l=function(I){return I=Y(this,I),O(I)?-1:D(I)?0:1};function N(I){for(var g=I.g.length,v=[],w=0;w<g;w++)v[w]=~I.g[w];return new a(v,~I.h).add(E)}e.abs=function(){return O(this)?N(this):this},e.add=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],w=0,A=0;A<=g;A++){var C=w+(this.i(A)&65535)+(I.i(A)&65535),y=(C>>>16)+(this.i(A)>>>16)+(I.i(A)>>>16);w=y>>>16,C&=65535,y&=65535,v[A]=y<<16|C}return new a(v,v[v.length-1]&-2147483648?-1:0)};function Y(I,g){return I.add(N(g))}e.j=function(I){if(D(this)||D(I))return m;if(O(this))return O(I)?N(this).j(N(I)):N(N(this).j(I));if(O(I))return N(this.j(N(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,v=[],w=0;w<2*g;w++)v[w]=0;for(w=0;w<this.g.length;w++)for(var A=0;A<I.g.length;A++){var C=this.i(w)>>>16,y=this.i(w)&65535,re=I.i(A)>>>16,Ge=I.i(A)&65535;v[2*w+2*A]+=y*Ge,Q(v,2*w+2*A),v[2*w+2*A+1]+=C*Ge,Q(v,2*w+2*A+1),v[2*w+2*A+1]+=y*re,Q(v,2*w+2*A+1),v[2*w+2*A+2]+=C*re,Q(v,2*w+2*A+2)}for(w=0;w<g;w++)v[w]=v[2*w+1]<<16|v[2*w];for(w=g;w<2*g;w++)v[w]=0;return new a(v,0)};function Q(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function X(I,g){this.g=I,this.h=g}function K(I,g){if(D(g))throw Error("division by zero");if(D(I))return new X(m,m);if(O(I))return g=K(N(I),g),new X(N(g.g),N(g.h));if(O(g))return g=K(I,N(g)),new X(N(g.g),g.h);if(30<I.g.length){if(O(I)||O(g))throw Error("slowDivide_ only works with positive integers.");for(var v=E,w=g;0>=w.l(I);)v=_t(v),w=_t(w);var A=At(v,1),C=At(w,1);for(w=At(w,2),v=At(v,2);!D(w);){var y=C.add(w);0>=y.l(I)&&(A=A.add(v),C=y),w=At(w,1),v=At(v,1)}return g=Y(I,A.j(g)),new X(A,g)}for(A=m;0<=I.l(g);){for(v=Math.max(1,Math.floor(I.m()/g.m())),w=Math.ceil(Math.log(v)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),C=d(v),y=C.j(g);O(y)||0<y.l(I);)v-=w,C=d(v),y=C.j(g);D(C)&&(C=E),A=A.add(C),I=Y(I,y)}return new X(A,I)}e.A=function(I){return K(this,I).h},e.and=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)&I.i(w);return new a(v,this.h&I.h)},e.or=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)|I.i(w);return new a(v,this.h|I.h)},e.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)^I.i(w);return new a(v,this.h^I.h)};function _t(I){for(var g=I.g.length+1,v=[],w=0;w<g;w++)v[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(v,I.h)}function At(I,g){var v=g>>5;g%=32;for(var w=I.g.length-v,A=[],C=0;C<w;C++)A[C]=0<g?I.i(C+v)>>>g|I.i(C+v+1)<<32-g:I.i(C+v);return new a(A,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Uf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=h,rr=a}).apply(typeof Cc<"u"?Cc:typeof self<"u"?self:typeof window<"u"?window:{});var vi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bf,fs,jf,Ci,Aa,$f,qf,Kf;(function(){var e,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof vi=="object"&&vi];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(o,u){if(u)t:{var f=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var P=o[p];if(!(P in f))break t;f=f[P]}o=o[o.length-1],p=f[o],u=u(p),u!=p&&u!=null&&t(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,p=!1,P={next:function(){if(!p&&f<o.length){var V=f++;return{value:u(V,o[V]),done:!1}}return p=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function h(o,u,f){return o.call.apply(o.bind,arguments)}function m(o,u,f){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,p),o.apply(u,P)}}return function(){return o.apply(u,arguments)}}function E(o,u,f){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:m,E.apply(null,arguments)}function S(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var p=f.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function D(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(p,P,V){for(var H=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)H[Nt-2]=arguments[Nt];return u.prototype[P].apply(p,H)}}function O(o){const u=o.length;if(0<u){const f=Array(u);for(let p=0;p<u;p++)f[p]=o[p];return f}return[]}function N(o,u){for(let f=1;f<arguments.length;f++){const p=arguments[f];if(c(p)){const P=o.length||0,V=p.length||0;o.length=P+V;for(let H=0;H<V;H++)o[P+H]=p[H]}else o.push(p)}}class Y{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function Q(o){return/^[\s\xa0]*$/.test(o)}function X(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function K(o){return K[" "](o),o}K[" "]=function(){};var _t=X().indexOf("Gecko")!=-1&&!(X().toLowerCase().indexOf("webkit")!=-1&&X().indexOf("Edge")==-1)&&!(X().indexOf("Trident")!=-1||X().indexOf("MSIE")!=-1)&&X().indexOf("Edge")==-1;function At(o,u,f){for(const p in o)u.call(f,o[p],p,o)}function I(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function g(o){const u={};for(const f in o)u[f]=o[f];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,u){let f,p;for(let P=1;P<arguments.length;P++){p=arguments[P];for(f in p)o[f]=p[f];for(let V=0;V<v.length;V++)f=v[V],Object.prototype.hasOwnProperty.call(p,f)&&(o[f]=p[f])}}function A(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function C(o){l.setTimeout(()=>{throw o},0)}function y(){var o=L;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class re{constructor(){this.h=this.g=null}add(u,f){const p=Ge.get();p.set(u,f),this.h?this.h.next=p:this.g=p,this.h=p}}var Ge=new Y(()=>new Xt,o=>o.reset());class Xt{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Pt,Et=!1,L=new re,T=()=>{const o=l.Promise.resolve(void 0);Pt=()=>{o.then(R)}};var R=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(f){C(f)}var u=Ge;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}Et=!1};function st(){this.s=this.s,this.C=this.C}st.prototype.s=!1,st.prototype.ma=function(){this.s||(this.s=!0,this.N())},st.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ct(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}Ct.prototype.h=function(){this.defaultPrevented=!0};var mt=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return o})();function Zt(o,u){if(Ct.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(_t){t:{try{K(u.nodeName);var P=!0;break t}catch{}P=!1}P||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:de[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Zt.aa.h.call(this)}}D(Zt,Ct);var de={2:"touch",3:"pen",4:"mouse"};Zt.prototype.h=function(){Zt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var te="closure_listenable_"+(1e6*Math.random()|0),un=0;function cn(o,u,f,p,P){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!p,this.ha=P,this.key=++un,this.da=this.fa=!1}function qe(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Sn(o){this.src=o,this.g={},this.h=0}Sn.prototype.add=function(o,u,f,p,P){var V=o.toString();o=this.g[V],o||(o=this.g[V]=[],this.h++);var H=b(o,u,p,P);return-1<H?(u=o[H],f||(u.fa=!1)):(u=new cn(u,this.src,V,!!p,P),u.fa=f,o.push(u)),u};function _(o,u){var f=u.type;if(f in o.g){var p=o.g[f],P=Array.prototype.indexOf.call(p,u,void 0),V;(V=0<=P)&&Array.prototype.splice.call(p,P,1),V&&(qe(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function b(o,u,f,p){for(var P=0;P<o.length;++P){var V=o[P];if(!V.da&&V.listener==u&&V.capture==!!f&&V.ha==p)return P}return-1}var k="closure_lm_"+(1e6*Math.random()|0),j={};function M(o,u,f,p,P){if(Array.isArray(u)){for(var V=0;V<u.length;V++)M(o,u[V],f,p,P);return null}return f=it(f),o&&o[te]?o.K(u,f,d(p)?!!p.capture:!1,P):B(o,u,f,!1,p,P)}function B(o,u,f,p,P,V){if(!u)throw Error("Invalid event type");var H=d(P)?!!P.capture:!!P,Nt=G(o);if(Nt||(o[k]=Nt=new Sn(o)),f=Nt.add(u,f,p,H,V),f.proxy)return f;if(p=W(),f.proxy=p,p.src=o,p.listener=f,o.addEventListener)mt||(P=H),P===void 0&&(P=!1),o.addEventListener(u.toString(),p,P);else if(o.attachEvent)o.attachEvent(U(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return f}function W(){function o(f){return u.call(o.src,o.listener,f)}const u=nt;return o}function z(o,u,f,p,P){if(Array.isArray(u))for(var V=0;V<u.length;V++)z(o,u[V],f,p,P);else p=d(p)?!!p.capture:!!p,f=it(f),o&&o[te]?(o=o.i,u=String(u).toString(),u in o.g&&(V=o.g[u],f=b(V,f,p,P),-1<f&&(qe(V[f]),Array.prototype.splice.call(V,f,1),V.length==0&&(delete o.g[u],o.h--)))):o&&(o=G(o))&&(u=o.g[u.toString()],o=-1,u&&(o=b(u,f,p,P)),(f=-1<o?u[o]:null)&&q(f))}function q(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[te])_(u.i,o);else{var f=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(f,p,o.capture):u.detachEvent?u.detachEvent(U(f),p):u.addListener&&u.removeListener&&u.removeListener(p),(f=G(u))?(_(f,o),f.h==0&&(f.src=null,u[k]=null)):qe(o)}}}function U(o){return o in j?j[o]:j[o]="on"+o}function nt(o,u){if(o.da)o=!0;else{u=new Zt(u,this);var f=o.listener,p=o.ha||o.src;o.fa&&q(o),o=f.call(p,u)}return o}function G(o){return o=o[k],o instanceof Sn?o:null}var tt="__closure_events_fn_"+(1e9*Math.random()>>>0);function it(o){return typeof o=="function"?o:(o[tt]||(o[tt]=function(u){return o.handleEvent(u)}),o[tt])}function ot(){st.call(this),this.i=new Sn(this),this.M=this,this.F=null}D(ot,st),ot.prototype[te]=!0,ot.prototype.removeEventListener=function(o,u,f,p){z(this,o,u,f,p)};function ht(o,u){var f,p=o.F;if(p)for(f=[];p;p=p.F)f.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new Ct(u,o);else if(u instanceof Ct)u.target=u.target||o;else{var P=u;u=new Ct(p,o),w(u,P)}if(P=!0,f)for(var V=f.length-1;0<=V;V--){var H=u.g=f[V];P=Vt(H,p,!0,u)&&P}if(H=u.g=o,P=Vt(H,p,!0,u)&&P,P=Vt(H,p,!1,u)&&P,f)for(V=0;V<f.length;V++)H=u.g=f[V],P=Vt(H,p,!1,u)&&P}ot.prototype.N=function(){if(ot.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],p=0;p<f.length;p++)qe(f[p]);delete o.g[u],o.h--}}this.F=null},ot.prototype.K=function(o,u,f,p){return this.i.add(String(o),u,!1,f,p)},ot.prototype.L=function(o,u,f,p){return this.i.add(String(o),u,!0,f,p)};function Vt(o,u,f,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var P=!0,V=0;V<u.length;++V){var H=u[V];if(H&&!H.da&&H.capture==f){var Nt=H.listener,ie=H.ha||H.src;H.fa&&_(o.i,H),P=Nt.call(ie,p)!==!1&&P}}return P&&!p.defaultPrevented}function Bt(o,u,f){if(typeof o=="function")f&&(o=E(o,f));else if(o&&typeof o.handleEvent=="function")o=E(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function Wt(o){o.g=Bt(()=>{o.g=null,o.i&&(o.i=!1,Wt(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Fe extends st{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Wt(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pe(o){st.call(this),this.h=o,this.g={}}D(pe,st);var Pn=[];function Hr(o){At(o.g,function(u,f){this.g.hasOwnProperty(f)&&q(u)},o),o.g={}}pe.prototype.N=function(){pe.aa.N.call(this),Hr(this)},pe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var se=l.JSON.stringify,Ue=l.JSON.parse,Zs=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function pr(){}pr.prototype.h=null;function Gl(o){return o.h||(o.h=o.i())}function Ql(){}var zr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function So(){Ct.call(this,"d")}D(So,Ct);function Po(){Ct.call(this,"c")}D(Po,Ct);var zn={},Xl=null;function ti(){return Xl=Xl||new ot}zn.La="serverreachability";function Yl(o){Ct.call(this,zn.La,o)}D(Yl,Ct);function Wr(o){const u=ti();ht(u,new Yl(u))}zn.STAT_EVENT="statevent";function Jl(o,u){Ct.call(this,zn.STAT_EVENT,o),this.stat=u}D(Jl,Ct);function we(o){const u=ti();ht(u,new Jl(u,o))}zn.Ma="timingevent";function Zl(o,u){Ct.call(this,zn.Ma,o),this.size=u}D(Zl,Ct);function Gr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function Qr(){this.g=!0}Qr.prototype.xa=function(){this.g=!1};function wp(o,u,f,p,P,V){o.info(function(){if(o.g)if(V)for(var H="",Nt=V.split("&"),ie=0;ie<Nt.length;ie++){var Rt=Nt[ie].split("=");if(1<Rt.length){var me=Rt[0];Rt=Rt[1];var ge=me.split("_");H=2<=ge.length&&ge[1]=="type"?H+(me+"="+Rt+"&"):H+(me+"=redacted&")}}else H=null;else H=V;return"XMLHTTP REQ ("+p+") [attempt "+P+"]: "+u+`
`+f+`
`+H})}function bp(o,u,f,p,P,V,H){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+P+"]: "+u+`
`+f+`
`+V+" "+H})}function mr(o,u,f,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Ap(o,f)+(p?" "+p:"")})}function Ip(o,u){o.info(function(){return"TIMEOUT: "+u})}Qr.prototype.info=function(){};function Ap(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var p=f[o];if(!(2>p.length)){var P=p[1];if(Array.isArray(P)&&!(1>P.length)){var V=P[0];if(V!="noop"&&V!="stop"&&V!="close")for(var H=1;H<P.length;H++)P[H]=""}}}}return se(f)}catch{return u}}var ei={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},tu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Co;function ni(){}D(ni,pr),ni.prototype.g=function(){return new XMLHttpRequest},ni.prototype.i=function(){return{}},Co=new ni;function Cn(o,u,f,p){this.j=o,this.i=u,this.l=f,this.R=p||1,this.U=new pe(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new eu}function eu(){this.i=null,this.g="",this.h=!1}var nu={},Vo={};function ko(o,u,f){o.L=1,o.v=oi(hn(u)),o.m=f,o.P=!0,ru(o,null)}function ru(o,u){o.F=Date.now(),ri(o),o.A=hn(o.v);var f=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),_u(f.i,"t",p),o.C=0,f=o.j.J,o.h=new eu,o.g=Ou(o.j,f?u:null,!o.m),0<o.O&&(o.M=new Fe(E(o.Y,o,o.g),o.O)),u=o.U,f=o.g,p=o.ca;var P="readystatechange";Array.isArray(P)||(P&&(Pn[0]=P.toString()),P=Pn);for(var V=0;V<P.length;V++){var H=M(f,P[V],p||u.handleEvent,!1,u.h||u);if(!H)break;u.g[H.key]=H}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Wr(),wp(o.i,o.u,o.A,o.l,o.R,o.m)}Cn.prototype.ca=function(o){o=o.target;const u=this.M;u&&fn(o)==3?u.j():this.Y(o)},Cn.prototype.Y=function(o){try{if(o==this.g)t:{const ge=fn(this.g);var u=this.g.Ba();const yr=this.g.Z();if(!(3>ge)&&(ge!=3||this.g&&(this.h.h||this.g.oa()||Iu(this.g)))){this.J||ge!=4||u==7||(u==8||0>=yr?Wr(3):Wr(2)),xo(this);var f=this.g.Z();this.X=f;e:if(su(this)){var p=Iu(this.g);o="";var P=p.length,V=fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wn(this),Xr(this);var H="";break e}this.h.i=new l.TextDecoder}for(u=0;u<P;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(V&&u==P-1)});p.length=0,this.h.g+=o,this.C=0,H=this.h.g}else H=this.g.oa();if(this.o=f==200,bp(this.i,this.u,this.A,this.l,this.R,ge,f),this.o){if(this.T&&!this.K){e:{if(this.g){var Nt,ie=this.g;if((Nt=ie.g?ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(Nt)){var Rt=Nt;break e}}Rt=null}if(f=Rt)mr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Do(this,f);else{this.o=!1,this.s=3,we(12),Wn(this),Xr(this);break t}}if(this.P){f=!0;let Ke;for(;!this.J&&this.C<H.length;)if(Ke=Rp(this,H),Ke==Vo){ge==4&&(this.s=4,we(14),f=!1),mr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==nu){this.s=4,we(15),mr(this.i,this.l,H,"[Invalid Chunk]"),f=!1;break}else mr(this.i,this.l,Ke,null),Do(this,Ke);if(su(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ge!=4||H.length!=0||this.h.h||(this.s=1,we(16),f=!1),this.o=this.o&&f,!f)mr(this.i,this.l,H,"[Invalid Chunked Response]"),Wn(this),Xr(this);else if(0<H.length&&!this.W){this.W=!0;var me=this.j;me.g==this&&me.ba&&!me.M&&(me.j.info("Great, no buffering proxy detected. Bytes received: "+H.length),Uo(me),me.M=!0,we(11))}}else mr(this.i,this.l,H,null),Do(this,H);ge==4&&Wn(this),this.o&&!this.J&&(ge==4?ku(this.j,this):(this.o=!1,ri(this)))}else qp(this.g),f==400&&0<H.indexOf("Unknown SID")?(this.s=3,we(12)):(this.s=0,we(13)),Wn(this),Xr(this)}}}catch{}finally{}};function su(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Rp(o,u){var f=o.C,p=u.indexOf(`
`,f);return p==-1?Vo:(f=Number(u.substring(f,p)),isNaN(f)?nu:(p+=1,p+f>u.length?Vo:(u=u.slice(p,p+f),o.C=p+f,u)))}Cn.prototype.cancel=function(){this.J=!0,Wn(this)};function ri(o){o.S=Date.now()+o.I,iu(o,o.I)}function iu(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Gr(E(o.ba,o),u)}function xo(o){o.B&&(l.clearTimeout(o.B),o.B=null)}Cn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Ip(this.i,this.A),this.L!=2&&(Wr(),we(17)),Wn(this),this.s=2,Xr(this)):iu(this,this.S-o)};function Xr(o){o.j.G==0||o.J||ku(o.j,o)}function Wn(o){xo(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Hr(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Do(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||No(f.h,o))){if(!o.K&&No(f.h,o)&&f.G==3){try{var p=f.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var P=p;if(P[0]==0){t:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)fi(f),ci(f);else break t;Fo(f),we(18)}}else f.za=P[1],0<f.za-f.T&&37500>P[2]&&f.F&&f.v==0&&!f.C&&(f.C=Gr(E(f.Za,f),6e3));if(1>=lu(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else Qn(f,11)}else if((o.K||f.g==o)&&fi(f),!Q(u))for(P=f.Da.g.parse(u),u=0;u<P.length;u++){let Rt=P[u];if(f.T=Rt[0],Rt=Rt[1],f.G==2)if(Rt[0]=="c"){f.K=Rt[1],f.ia=Rt[2];const me=Rt[3];me!=null&&(f.la=me,f.j.info("VER="+f.la));const ge=Rt[4];ge!=null&&(f.Aa=ge,f.j.info("SVER="+f.Aa));const yr=Rt[5];yr!=null&&typeof yr=="number"&&0<yr&&(p=1.5*yr,f.L=p,f.j.info("backChannelRequestTimeoutMs_="+p)),p=f;const Ke=o.g;if(Ke){const pi=Ke.g?Ke.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(pi){var V=p.h;V.g||pi.indexOf("spdy")==-1&&pi.indexOf("quic")==-1&&pi.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(Oo(V,V.h),V.h=null))}if(p.D){const Bo=Ke.g?Ke.g.getResponseHeader("X-HTTP-Session-Id"):null;Bo&&(p.ya=Bo,Ut(p.I,p.D,Bo))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),p=f;var H=o;if(p.qa=Nu(p,p.J?p.ia:null,p.W),H.K){uu(p.h,H);var Nt=H,ie=p.L;ie&&(Nt.I=ie),Nt.B&&(xo(Nt),ri(Nt)),p.g=H}else Cu(p);0<f.i.length&&hi(f)}else Rt[0]!="stop"&&Rt[0]!="close"||Qn(f,7);else f.G==3&&(Rt[0]=="stop"||Rt[0]=="close"?Rt[0]=="stop"?Qn(f,7):Lo(f):Rt[0]!="noop"&&f.l&&f.l.ta(Rt),f.v=0)}}Wr(4)}catch{}}var Sp=class{constructor(o,u){this.g=o,this.map=u}};function ou(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function au(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function lu(o){return o.h?1:o.g?o.g.size:0}function No(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Oo(o,u){o.g?o.g.add(u):o.h=u}function uu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}ou.prototype.cancel=function(){if(this.i=cu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function cu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return O(o.i)}function Pp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],f=o.length,p=0;p<f;p++)u.push(o[p]);return u}u=[],f=0;for(p in o)u[f++]=o[p];return u}function Cp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const p in o)u[f++]=p;return u}}}function hu(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=Cp(o),p=Pp(o),P=p.length,V=0;V<P;V++)u.call(void 0,p[V],f&&f[V],o)}var fu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vp(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var p=o[f].indexOf("="),P=null;if(0<=p){var V=o[f].substring(0,p);P=o[f].substring(p+1)}else V=o[f];u(V,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Gn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Gn){this.h=o.h,si(this,o.j),this.o=o.o,this.g=o.g,ii(this,o.s),this.l=o.l;var u=o.i,f=new Zr;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),du(this,f),this.m=o.m}else o&&(u=String(o).match(fu))?(this.h=!1,si(this,u[1]||"",!0),this.o=Yr(u[2]||""),this.g=Yr(u[3]||"",!0),ii(this,u[4]),this.l=Yr(u[5]||"",!0),du(this,u[6]||"",!0),this.m=Yr(u[7]||"")):(this.h=!1,this.i=new Zr(null,this.h))}Gn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Jr(u,pu,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Jr(u,pu,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(Jr(f,f.charAt(0)=="/"?Dp:xp,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",Jr(f,Op)),o.join("")};function hn(o){return new Gn(o)}function si(o,u,f){o.j=f?Yr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ii(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function du(o,u,f){u instanceof Zr?(o.i=u,Mp(o.i,o.h)):(f||(u=Jr(u,Np)),o.i=new Zr(u,o.h))}function Ut(o,u,f){o.i.set(u,f)}function oi(o){return Ut(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Yr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Jr(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,kp),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function kp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var pu=/[#\/\?@]/g,xp=/[#\?:]/g,Dp=/[#\?]/g,Np=/[#\?@]/g,Op=/#/g;function Zr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Vn(o){o.g||(o.g=new Map,o.h=0,o.i&&Vp(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}e=Zr.prototype,e.add=function(o,u){Vn(this),this.i=null,o=gr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function mu(o,u){Vn(o),u=gr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function gu(o,u){return Vn(o),u=gr(o,u),o.g.has(u)}e.forEach=function(o,u){Vn(this),this.g.forEach(function(f,p){f.forEach(function(P){o.call(u,P,p,this)},this)},this)},e.na=function(){Vn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let p=0;p<u.length;p++){const P=o[p];for(let V=0;V<P.length;V++)f.push(u[p])}return f},e.V=function(o){Vn(this);let u=[];if(typeof o=="string")gu(this,o)&&(u=u.concat(this.g.get(gr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},e.set=function(o,u){return Vn(this),this.i=null,o=gr(this,o),gu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},e.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function _u(o,u,f){mu(o,u),0<f.length&&(o.i=null,o.g.set(gr(o,u),O(f)),o.h+=f.length)}e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var p=u[f];const V=encodeURIComponent(String(p)),H=this.V(p);for(p=0;p<H.length;p++){var P=V;H[p]!==""&&(P+="="+encodeURIComponent(String(H[p]))),o.push(P)}}return this.i=o.join("&")};function gr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Mp(o,u){u&&!o.j&&(Vn(o),o.i=null,o.g.forEach(function(f,p){var P=p.toLowerCase();p!=P&&(mu(this,p),_u(this,P,f))},o)),o.j=u}function Lp(o,u){const f=new Qr;if(l.Image){const p=new Image;p.onload=S(kn,f,"TestLoadImage: loaded",!0,u,p),p.onerror=S(kn,f,"TestLoadImage: error",!1,u,p),p.onabort=S(kn,f,"TestLoadImage: abort",!1,u,p),p.ontimeout=S(kn,f,"TestLoadImage: timeout",!1,u,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function Fp(o,u){const f=new Qr,p=new AbortController,P=setTimeout(()=>{p.abort(),kn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(V=>{clearTimeout(P),V.ok?kn(f,"TestPingServer: ok",!0,u):kn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(P),kn(f,"TestPingServer: error",!1,u)})}function kn(o,u,f,p,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),p(f)}catch{}}function Up(){this.g=new Zs}function Bp(o,u,f){const p=f||"";try{hu(o,function(P,V){let H=P;d(P)&&(H=se(P)),u.push(p+V+"="+encodeURIComponent(H))})}catch(P){throw u.push(p+"type="+encodeURIComponent("_badmap")),P}}function ai(o){this.l=o.Ub||null,this.j=o.eb||!1}D(ai,pr),ai.prototype.g=function(){return new li(this.l,this.j)},ai.prototype.i=(function(o){return function(){return o}})({});function li(o,u){ot.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(li,ot),e=li.prototype,e.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,es(this)},e.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ts(this)),this.readyState=0},e.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,es(this)),this.g&&(this.readyState=3,es(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function yu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}e.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?ts(this):es(this),this.readyState==3&&yu(this)}},e.Ra=function(o){this.g&&(this.response=this.responseText=o,ts(this))},e.Qa=function(o){this.g&&(this.response=o,ts(this))},e.ga=function(){this.g&&ts(this)};function ts(o){o.readyState=4,o.l=null,o.j=null,o.v=null,es(o)}e.setRequestHeader=function(o,u){this.u.append(o,u)},e.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function es(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(li.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function vu(o){let u="";return At(o,function(f,p){u+=p,u+=":",u+=f,u+=`\r
`}),u}function Mo(o,u,f){t:{for(p in f){var p=!1;break t}p=!0}p||(f=vu(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):Ut(o,u,f))}function $t(o){ot.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D($t,ot);var jp=/^https?$/i,$p=["POST","PUT"];e=$t.prototype,e.Ha=function(o){this.J=o},e.ea=function(o,u,f,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Co.g(),this.v=this.o?Gl(this.o):Gl(Co),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(V){Eu(this,V);return}if(o=f||"",f=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var P in p)f.set(P,p[P]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const V of p.keys())f.set(V,p.get(V));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(f.keys()).find(V=>V.toLowerCase()=="content-type"),P=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call($p,u,void 0))||p||P||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,H]of f)this.g.setRequestHeader(V,H);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{bu(this),this.u=!0,this.g.send(o),this.u=!1}catch(V){Eu(this,V)}};function Eu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Tu(o),ui(o)}function Tu(o){o.A||(o.A=!0,ht(o,"complete"),ht(o,"error"))}e.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ht(this,"complete"),ht(this,"abort"),ui(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ui(this,!0)),$t.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?wu(this):this.bb())},e.bb=function(){wu(this)};function wu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||fn(o)!=4||o.Z()!=2)){if(o.u&&fn(o)==4)Bt(o.Ea,0,o);else if(ht(o,"readystatechange"),fn(o)==4){o.h=!1;try{const H=o.Z();t:switch(H){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var f;if(!(f=u)){var p;if(p=H===0){var P=String(o.D).match(fu)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),p=!jp.test(P?P.toLowerCase():"")}f=p}if(f)ht(o,"complete"),ht(o,"success");else{o.m=6;try{var V=2<fn(o)?o.g.statusText:""}catch{V=""}o.l=V+" ["+o.Z()+"]",Tu(o)}}finally{ui(o)}}}}function ui(o,u){if(o.g){bu(o);const f=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ht(o,"ready");try{f.onreadystatechange=p}catch{}}}function bu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}e.isActive=function(){return!!this.g};function fn(o){return o.g?o.g.readyState:0}e.Z=function(){try{return 2<fn(this)?this.g.status:-1}catch{return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},e.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Ue(u)}};function Iu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qp(o){const u={};o=(o.g&&2<=fn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(Q(o[p]))continue;var f=A(o[p]);const P=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const V=u[P]||[];u[P]=V,V.push(f)}I(u,function(p){return p.join(", ")})}e.Ba=function(){return this.m},e.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ns(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Au(o){this.Aa=0,this.i=[],this.j=new Qr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ns("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ns("baseRetryDelayMs",5e3,o),this.cb=ns("retryDelaySeedMs",1e4,o),this.Wa=ns("forwardChannelMaxRetries",2,o),this.wa=ns("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ou(o&&o.concurrentRequestLimit),this.Da=new Up,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}e=Au.prototype,e.la=8,e.G=1,e.connect=function(o,u,f,p){we(0),this.W=o,this.H=u||{},f&&p!==void 0&&(this.H.OSID=f,this.H.OAID=p),this.F=this.X,this.I=Nu(this,null,this.W),hi(this)};function Lo(o){if(Ru(o),o.G==3){var u=o.U++,f=hn(o.I);if(Ut(f,"SID",o.K),Ut(f,"RID",u),Ut(f,"TYPE","terminate"),rs(o,f),u=new Cn(o,o.j,u),u.L=2,u.v=oi(hn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=Ou(u.j,null),u.g.ea(u.v)),u.F=Date.now(),ri(u)}Du(o)}function ci(o){o.g&&(Uo(o),o.g.cancel(),o.g=null)}function Ru(o){ci(o),o.u&&(l.clearTimeout(o.u),o.u=null),fi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function hi(o){if(!au(o.h)&&!o.s){o.s=!0;var u=o.Ga;Pt||T(),Et||(Pt(),Et=!0),L.add(u,o),o.B=0}}function Kp(o,u){return lu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Gr(E(o.Ga,o,u),xu(o,o.B)),o.B++,!0)}e.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const P=new Cn(this,this.j,o);let V=this.o;if(this.S&&(V?(V=g(V),w(V,this.S)):V=this.S),this.m!==null||this.O||(P.H=V,V=null),this.P)t:{for(var u=0,f=0;f<this.i.length;f++){e:{var p=this.i[f];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break e}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=f;break t}if(u===4096||f===this.i.length-1){u=f+1;break t}}u=1e3}else u=1e3;u=Pu(this,P,u),f=hn(this.I),Ut(f,"RID",o),Ut(f,"CVER",22),this.D&&Ut(f,"X-HTTP-Session-Id",this.D),rs(this,f),V&&(this.O?u="headers="+encodeURIComponent(String(vu(V)))+"&"+u:this.m&&Mo(f,this.m,V)),Oo(this.h,P),this.Ua&&Ut(f,"TYPE","init"),this.P?(Ut(f,"$req",u),Ut(f,"SID","null"),P.T=!0,ko(P,f,null)):ko(P,f,u),this.G=2}}else this.G==3&&(o?Su(this,o):this.i.length==0||au(this.h)||Su(this))};function Su(o,u){var f;u?f=u.l:f=o.U++;const p=hn(o.I);Ut(p,"SID",o.K),Ut(p,"RID",f),Ut(p,"AID",o.T),rs(o,p),o.m&&o.o&&Mo(p,o.m,o.o),f=new Cn(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Pu(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Oo(o.h,f),ko(f,p,u)}function rs(o,u){o.H&&At(o.H,function(f,p){Ut(u,p,f)}),o.l&&hu({},function(f,p){Ut(u,p,f)})}function Pu(o,u,f){f=Math.min(o.i.length,f);var p=o.l?E(o.l.Na,o.l,o):null;t:{var P=o.i;let V=-1;for(;;){const H=["count="+f];V==-1?0<f?(V=P[0].g,H.push("ofs="+V)):V=0:H.push("ofs="+V);let Nt=!0;for(let ie=0;ie<f;ie++){let Rt=P[ie].g;const me=P[ie].map;if(Rt-=V,0>Rt)V=Math.max(0,P[ie].g-100),Nt=!1;else try{Bp(me,H,"req"+Rt+"_")}catch{p&&p(me)}}if(Nt){p=H.join("&");break t}}}return o=o.i.splice(0,f),u.D=o,p}function Cu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Pt||T(),Et||(Pt(),Et=!0),L.add(u,o),o.v=0}}function Fo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Gr(E(o.Fa,o),xu(o,o.v)),o.v++,!0)}e.Fa=function(){if(this.u=null,Vu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Gr(E(this.ab,this),o)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,we(10),ci(this),Vu(this))};function Uo(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Vu(o){o.g=new Cn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=hn(o.qa);Ut(u,"RID","rpc"),Ut(u,"SID",o.K),Ut(u,"AID",o.T),Ut(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Ut(u,"TO",o.ja),Ut(u,"TYPE","xmlhttp"),rs(o,u),o.m&&o.o&&Mo(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=oi(hn(u)),f.m=null,f.P=!0,ru(f,o)}e.Za=function(){this.C!=null&&(this.C=null,ci(this),Fo(this),we(19))};function fi(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function ku(o,u){var f=null;if(o.g==u){fi(o),Uo(o),o.g=null;var p=2}else if(No(o.h,u))f=u.D,uu(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var P=o.B;p=ti(),ht(p,new Zl(p,f)),hi(o)}else Cu(o);else if(P=u.s,P==3||P==0&&0<u.X||!(p==1&&Kp(o,u)||p==2&&Fo(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),P){case 1:Qn(o,5);break;case 4:Qn(o,10);break;case 3:Qn(o,6);break;default:Qn(o,2)}}}function xu(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function Qn(o,u){if(o.j.info("Error code "+u),u==2){var f=E(o.fb,o),p=o.Xa;const P=!p;p=new Gn(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||si(p,"https"),oi(p),P?Lp(p.toString(),f):Fp(p.toString(),f)}else we(2);o.G=0,o.l&&o.l.sa(u),Du(o),Ru(o)}e.fb=function(o){o?(this.j.info("Successfully pinged google.com"),we(2)):(this.j.info("Failed to ping google.com"),we(1))};function Du(o){if(o.G=0,o.ka=[],o.l){const u=cu(o.h);(u.length!=0||o.i.length!=0)&&(N(o.ka,u),N(o.ka,o.i),o.h.i.length=0,O(o.i),o.i.length=0),o.l.ra()}}function Nu(o,u,f){var p=f instanceof Gn?hn(f):new Gn(f);if(p.g!="")u&&(p.g=u+"."+p.g),ii(p,p.s);else{var P=l.location;p=P.protocol,u=u?u+"."+P.hostname:P.hostname,P=+P.port;var V=new Gn(null);p&&si(V,p),u&&(V.g=u),P&&ii(V,P),f&&(V.l=f),p=V}return f=o.D,u=o.ya,f&&u&&Ut(p,f,u),Ut(p,"VER",o.la),rs(o,p),p}function Ou(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new $t(new ai({eb:f})):new $t(o.pa),u.Ha(o.J),u}e.isActive=function(){return!!this.l&&this.l.isActive(this)};function Mu(){}e=Mu.prototype,e.ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){};function di(){}di.prototype.g=function(o,u){return new ke(o,u)};function ke(o,u){ot.call(this),this.g=new Au(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!Q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!Q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new _r(this)}D(ke,ot),ke.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ke.prototype.close=function(){Lo(this.g)},ke.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=se(o),o=f);u.i.push(new Sp(u.Ya++,o)),u.G==3&&hi(u)},ke.prototype.N=function(){this.g.l=null,delete this.j,Lo(this.g),delete this.g,ke.aa.N.call(this)};function Lu(o){So.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(const f in u){o=f;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}D(Lu,So);function Fu(){Po.call(this),this.status=1}D(Fu,Po);function _r(o){this.g=o}D(_r,Mu),_r.prototype.ua=function(){ht(this.g,"a")},_r.prototype.ta=function(o){ht(this.g,new Lu(o))},_r.prototype.sa=function(o){ht(this.g,new Fu)},_r.prototype.ra=function(){ht(this.g,"b")},di.prototype.createWebChannel=di.prototype.g,ke.prototype.send=ke.prototype.o,ke.prototype.open=ke.prototype.m,ke.prototype.close=ke.prototype.close,Kf=function(){return new di},qf=function(){return ti()},$f=zn,Aa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ei.NO_ERROR=0,ei.TIMEOUT=8,ei.HTTP_ERROR=6,Ci=ei,tu.COMPLETE="complete",jf=tu,Ql.EventType=zr,zr.OPEN="a",zr.CLOSE="b",zr.ERROR="c",zr.MESSAGE="d",ot.prototype.listen=ot.prototype.K,fs=Ql,$t.prototype.listenOnce=$t.prototype.L,$t.prototype.getLastError=$t.prototype.Ka,$t.prototype.getLastErrorCode=$t.prototype.Ba,$t.prototype.getStatus=$t.prototype.Z,$t.prototype.getResponseJson=$t.prototype.Oa,$t.prototype.getResponseText=$t.prototype.oa,$t.prototype.send=$t.prototype.ea,$t.prototype.setWithCredentials=$t.prototype.Ha,Bf=$t}).apply(typeof vi<"u"?vi:typeof self<"u"?self:typeof window<"u"?window:{});const Vc="@firebase/firestore";/**
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
 */class ve{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
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
 */let $r="10.14.0";/**
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
 */const ir=new Vf("@firebase/firestore");function os(){return ir.logLevel}function J(e,...t){if(ir.logLevel<=bt.DEBUG){const n=t.map(al);ir.debug(`Firestore (${$r}): ${e}`,...n)}}function In(e,...t){if(ir.logLevel<=bt.ERROR){const n=t.map(al);ir.error(`Firestore (${$r}): ${e}`,...n)}}function Or(e,...t){if(ir.logLevel<=bt.WARN){const n=t.map(al);ir.warn(`Firestore (${$r}): ${e}`,...n)}}function al(e){if(typeof e=="string")return e;try{/**
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
 */function at(e="Unexpected state"){const t=`FIRESTORE (${$r}) INTERNAL ASSERTION FAILED: `+e;throw In(t),new Error(t)}function It(e,t){e||at()}function ct(e,t){return e}/**
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
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends hr{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class vn{constructor(){this.promise=new Promise(((t,n)=>{this.resolve=t,this.reject=n}))}}/**
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
 */class Hf{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ky{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable((()=>n(ve.UNAUTHENTICATED)))}shutdown(){}}class Hy{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,n){this.changeListener=n,t.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class zy{constructor(t){this.t=t,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){It(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new vn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new vn,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{J("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(J("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new vn)}}),0),a()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==t?(J("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(It(typeof r.accessToken=="string"),new Hf(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return It(t===null||typeof t=="string"),new ve(t)}}class Wy{constructor(t,n,r){this.l=t,this.h=n,this.P=r,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Gy{constructor(t,n,r){this.l=t,this.h=n,this.P=r}getToken(){return Promise.resolve(new Wy(this.l,this.h,this.P))}start(t,n){t.enqueueRetryable((()=>n(ve.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Qy{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Xy{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,n){It(this.o===void 0);const r=i=>{i.error!=null&&J("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,J("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{J("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):J("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((n=>n?(It(typeof n.token=="string"),this.R=n.token,new Qy(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */class zf{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=Yy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=t.charAt(s[i]%t.length))}return r}}function St(e,t){return e<t?-1:e>t?1:0}function Mr(e,t,n){return e.length===t.length&&e.every(((r,s)=>n(r,t[s])))}/**
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
 */class Jt{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new Z(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Z(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new Z(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Z(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Jt.fromMillis(Date.now())}static fromDate(t){return Jt.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*n));return new Jt(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?St(this.nanoseconds,t.nanoseconds):St(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ut{constructor(t){this.timestamp=t}static fromTimestamp(t){return new ut(t)}static min(){return new ut(new Jt(0,0))}static max(){return new ut(new Jt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ms{constructor(t,n,r){n===void 0?n=0:n>t.length&&at(),r===void 0?r=t.length-n:r>t.length-n&&at(),this.segments=t,this.offset=n,this.len=r}get length(){return this.len}isEqual(t){return Ms.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof Ms?t.forEach((r=>{n.push(r)})):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,r=this.limit();n<r;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const r=Math.min(t.length,n.length);for(let s=0;s<r;s++){const i=t.get(s),a=n.get(s);if(i<a)return-1;if(i>a)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class Ft extends Ms{construct(t,n,r){return new Ft(t,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const n=[];for(const r of t){if(r.indexOf("//")>=0)throw new Z(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Ft(n)}static emptyPath(){return new Ft([])}}const Jy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ue extends Ms{construct(t,n,r){return new ue(t,n,r)}static isValidIdentifier(t){return Jy.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ue.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ue(["__name__"])}static fromServerFormat(t){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Z(F.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new Z(F.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new Z(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new Z(F.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ue(n)}static emptyPath(){return new ue([])}}/**
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
 */class et{constructor(t){this.path=t}static fromPath(t){return new et(Ft.fromString(t))}static fromName(t){return new et(Ft.fromString(t).popFirst(5))}static empty(){return new et(Ft.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Ft.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return Ft.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new et(new Ft(t.slice()))}}function Zy(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=ut.fromTimestamp(r===1e9?new Jt(n+1,0):new Jt(n,r));return new $n(s,et.empty(),t)}function tv(e){return new $n(e.readTime,e.key,-1)}class $n{constructor(t,n,r){this.readTime=t,this.documentKey=n,this.largestBatchId=r}static min(){return new $n(ut.min(),et.empty(),-1)}static max(){return new $n(ut.max(),et.empty(),-1)}}function ev(e,t){let n=e.readTime.compareTo(t.readTime);return n!==0?n:(n=et.comparator(e.documentKey,t.documentKey),n!==0?n:St(e.largestBatchId,t.largestBatchId))}/**
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
 */async function zs(e){if(e.code!==F.FAILED_PRECONDITION||e.message!==nv)throw e;J("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class ${constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&at(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new $(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((t,n)=>{this.next(t,n)}))}wrapUserFunction(t){try{const n=t();return n instanceof $?n:$.resolve(n)}catch(n){return $.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction((()=>t(n))):$.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction((()=>t(n))):$.reject(n)}static resolve(t){return new $(((n,r)=>{n(t)}))}static reject(t){return new $(((n,r)=>{r(t)}))}static waitFor(t){return new $(((n,r)=>{let s=0,i=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&n()}),(c=>r(c)))})),a=!0,i===s&&n()}))}static or(t){let n=$.resolve(!1);for(const r of t)n=n.next((s=>s?$.resolve(s):r()));return n}static forEach(t,n){const r=[];return t.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(t,n){return new $(((r,s)=>{const i=t.length,a=new Array(i);let l=0;for(let c=0;c<i;c++){const d=c;n(t[d]).next((h=>{a[d]=h,++l,l===i&&r(a)}),(h=>s(h)))}}))}static doWhile(t,n){return new $(((r,s)=>{const i=()=>{t()===!0?n().next((()=>{i()}),s):r()};i()}))}}function sv(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ws(e){return e.name==="IndexedDbTransactionError"}/**
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
 */class ll{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}ll.oe=-1;function Gs(e){return e==null}function Ki(e){return e===0&&1/e==-1/0}function iv(e){return typeof e=="number"&&Number.isInteger(e)&&!Ki(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
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
 */function kc(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function fr(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Wf(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
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
 */class jt{constructor(t,n){this.comparator=t,this.root=n||le.EMPTY}insert(t,n){return new jt(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,le.BLACK,null,null))}remove(t){return new jt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,le.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(t){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((n,r)=>(t(n,r),!1)))}toString(){const t=[];return this.inorderTraversal(((n,r)=>(t.push(`${n}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ei(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ei(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ei(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ei(this.root,t,this.comparator,!0)}}class Ei{constructor(t,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?r(t.key,n):1,n&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class le{constructor(t,n,r,s,i){this.key=t,this.value=n,this.color=r??le.RED,this.left=s??le.EMPTY,this.right=i??le.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,s,i){return new le(t??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(t,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return le.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,s=this;if(n(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(t,s.key)===0){if(s.right.isEmpty())return le.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,le.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw at();const t=this.left.check();if(t!==this.right.check())throw at();return t+(this.isRed()?0:1)}}le.EMPTY=null,le.RED=!0,le.BLACK=!1;le.EMPTY=new class{constructor(){this.size=0}get key(){throw at()}get value(){throw at()}get color(){throw at()}get left(){throw at()}get right(){throw at()}copy(t,n,r,s,i){return this}insert(t,n,r){return new le(t,n)}remove(t,n){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ce{constructor(t){this.comparator=t,this.data=new jt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((n,r)=>(t(n),!1)))}forEachInRange(t,n){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;n(s.key)}}forEachWhile(t,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new xc(this.data.getIterator())}getIteratorFrom(t){return new xc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach((r=>{n=n.add(r)})),n}isEqual(t){if(!(t instanceof ce)||this.size!==t.size)return!1;const n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((n=>{t.push(n)})),t}toString(){const t=[];return this.forEach((n=>t.push(n))),"SortedSet("+t.toString()+")"}copy(t){const n=new ce(this.comparator);return n.data=t,n}}class xc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class De{constructor(t){this.fields=t,t.sort(ue.comparator)}static empty(){return new De([])}unionWith(t){let n=new ce(ue.comparator);for(const r of this.fields)n=n.add(r);for(const r of t)n=n.add(r);return new De(n.toArray())}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return Mr(this.fields,t.fields,((n,r)=>n.isEqual(r)))}}/**
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
 */class fe{constructor(t){this.binaryString=t}static fromBase64String(t){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Gf("Invalid base64 string: "+i):i}})(t);return new fe(n)}static fromUint8Array(t){const n=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new fe(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return St(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}fe.EMPTY_BYTE_STRING=new fe("");const ov=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function qn(e){if(It(!!e),typeof e=="string"){let t=0;const n=ov.exec(e);if(It(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:zt(e.seconds),nanos:zt(e.nanos)}}function zt(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function or(e){return typeof e=="string"?fe.fromBase64String(e):fe.fromUint8Array(e)}/**
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
 */function ul(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function cl(e){const t=e.mapValue.fields.__previous_value__;return ul(t)?cl(t):t}function Ls(e){const t=qn(e.mapValue.fields.__local_write_time__.timestampValue);return new Jt(t.seconds,t.nanos)}/**
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
 */class av{constructor(t,n,r,s,i,a,l,c,d){this.databaseId=t,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=d}}class Fs{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new Fs("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Fs&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const Ti={mapValue:{}};function ar(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ul(e)?4:uv(e)?9007199254740991:lv(e)?10:11:at()}function an(e,t){if(e===t)return!0;const n=ar(e);if(n!==ar(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ls(e).isEqual(Ls(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=qn(s.timestampValue),l=qn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(e,t);case 5:return e.stringValue===t.stringValue;case 6:return(function(s,i){return or(s.bytesValue).isEqual(or(i.bytesValue))})(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return(function(s,i){return zt(s.geoPointValue.latitude)===zt(i.geoPointValue.latitude)&&zt(s.geoPointValue.longitude)===zt(i.geoPointValue.longitude)})(e,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return zt(s.integerValue)===zt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=zt(s.doubleValue),l=zt(i.doubleValue);return a===l?Ki(a)===Ki(l):isNaN(a)&&isNaN(l)}return!1})(e,t);case 9:return Mr(e.arrayValue.values||[],t.arrayValue.values||[],an);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(kc(a)!==kc(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!an(a[c],l[c])))return!1;return!0})(e,t);default:return at()}}function Us(e,t){return(e.values||[]).find((n=>an(n,t)))!==void 0}function Lr(e,t){if(e===t)return 0;const n=ar(e),r=ar(t);if(n!==r)return St(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return St(e.booleanValue,t.booleanValue);case 2:return(function(i,a){const l=zt(i.integerValue||i.doubleValue),c=zt(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(e,t);case 3:return Dc(e.timestampValue,t.timestampValue);case 4:return Dc(Ls(e),Ls(t));case 5:return St(e.stringValue,t.stringValue);case 6:return(function(i,a){const l=or(i),c=or(a);return l.compareTo(c)})(e.bytesValue,t.bytesValue);case 7:return(function(i,a){const l=i.split("/"),c=a.split("/");for(let d=0;d<l.length&&d<c.length;d++){const h=St(l[d],c[d]);if(h!==0)return h}return St(l.length,c.length)})(e.referenceValue,t.referenceValue);case 8:return(function(i,a){const l=St(zt(i.latitude),zt(a.latitude));return l!==0?l:St(zt(i.longitude),zt(a.longitude))})(e.geoPointValue,t.geoPointValue);case 9:return Nc(e.arrayValue,t.arrayValue);case 10:return(function(i,a){var l,c,d,h;const m=i.fields||{},E=a.fields||{},S=(l=m.value)===null||l===void 0?void 0:l.arrayValue,D=(c=E.value)===null||c===void 0?void 0:c.arrayValue,O=St(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((h=D==null?void 0:D.values)===null||h===void 0?void 0:h.length)||0);return O!==0?O:Nc(S,D)})(e.mapValue,t.mapValue);case 11:return(function(i,a){if(i===Ti.mapValue&&a===Ti.mapValue)return 0;if(i===Ti.mapValue)return 1;if(a===Ti.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),d=a.fields||{},h=Object.keys(d);c.sort(),h.sort();for(let m=0;m<c.length&&m<h.length;++m){const E=St(c[m],h[m]);if(E!==0)return E;const S=Lr(l[c[m]],d[h[m]]);if(S!==0)return S}return St(c.length,h.length)})(e.mapValue,t.mapValue);default:throw at()}}function Dc(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return St(e,t);const n=qn(e),r=qn(t),s=St(n.seconds,r.seconds);return s!==0?s:St(n.nanos,r.nanos)}function Nc(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Lr(n[s],r[s]);if(i)return i}return St(n.length,r.length)}function Fr(e){return Ra(e)}function Ra(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?(function(n){const r=qn(n);return`time(${r.seconds},${r.nanos})`})(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?(function(n){return or(n).toBase64()})(e.bytesValue):"referenceValue"in e?(function(n){return et.fromName(n).toString()})(e.referenceValue):"geoPointValue"in e?(function(n){return`geo(${n.latitude},${n.longitude})`})(e.geoPointValue):"arrayValue"in e?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Ra(i);return r+"]"})(e.arrayValue):"mapValue"in e?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Ra(n.fields[a])}`;return s+"}"})(e.mapValue):at()}function Sa(e){return!!e&&"integerValue"in e}function hl(e){return!!e&&"arrayValue"in e}function Oc(e){return!!e&&"nullValue"in e}function Mc(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Vi(e){return!!e&&"mapValue"in e}function lv(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ws(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return fr(e.mapValue.fields,((n,r)=>t.mapValue.fields[n]=ws(r))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=ws(e.arrayValue.values[n]);return t}return Object.assign({},e)}function uv(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Pe{constructor(t){this.value=t}static empty(){return new Pe({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let r=0;r<t.length-1;++r)if(n=(n.mapValue.fields||{})[t.get(r)],!Vi(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=ws(n)}setAll(t){let n=ue.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}a?r[l.lastSegment()]=ws(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(t){const n=this.field(t.popLast());Vi(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return an(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=n.mapValue.fields[t.get(r)];Vi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[t.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(t,n,r){fr(n,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new Pe(ws(this.value))}}function Qf(e){const t=[];return fr(e.fields,((n,r)=>{const s=new ue([n]);if(Vi(r)){const i=Qf(r.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new De(t)}/**
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
 */class ne{constructor(t,n,r,s,i,a,l){this.key=t,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(t){return new ne(t,0,ut.min(),ut.min(),ut.min(),Pe.empty(),0)}static newFoundDocument(t,n,r,s){return new ne(t,1,n,ut.min(),r,s,0)}static newNoDocument(t,n){return new ne(t,2,n,ut.min(),ut.min(),Pe.empty(),0)}static newUnknownDocument(t,n){return new ne(t,3,n,ut.min(),ut.min(),Pe.empty(),2)}convertToFoundDocument(t,n){return!this.createTime.isEqual(ut.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ut.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ne&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ne(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Hi{constructor(t,n){this.position=t,this.inclusive=n}}function Lc(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],a=e.position[s];if(i.field.isKeyField()?r=et.comparator(et.fromName(a.referenceValue),n.key):r=Lr(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fc(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!an(e.position[n],t.position[n]))return!1;return!0}/**
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
 */class zi{constructor(t,n="asc"){this.field=t,this.dir=n}}function cv(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}/**
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
 */class Xf{}class Yt extends Xf{constructor(t,n,r){super(),this.field=t,this.op=n,this.value=r}static create(t,n,r){return t.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(t,n,r):new fv(t,n,r):n==="array-contains"?new mv(t,r):n==="in"?new gv(t,r):n==="not-in"?new _v(t,r):n==="array-contains-any"?new yv(t,r):new Yt(t,n,r)}static createKeyFieldInFilter(t,n,r){return n==="in"?new dv(t,r):new pv(t,r)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Lr(n,this.value)):n!==null&&ar(this.value)===ar(n)&&this.matchesComparison(Lr(n,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return at()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ln extends Xf{constructor(t,n){super(),this.filters=t,this.op=n,this.ae=null}static create(t,n){return new ln(t,n)}matches(t){return Yf(this)?this.filters.find((n=>!n.matches(t)))===void 0:this.filters.find((n=>n.matches(t)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((t,n)=>t.concat(n.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Yf(e){return e.op==="and"}function Jf(e){return hv(e)&&Yf(e)}function hv(e){for(const t of e.filters)if(t instanceof ln)return!1;return!0}function Pa(e){if(e instanceof Yt)return e.field.canonicalString()+e.op.toString()+Fr(e.value);if(Jf(e))return e.filters.map((t=>Pa(t))).join(",");{const t=e.filters.map((n=>Pa(n))).join(",");return`${e.op}(${t})`}}function Zf(e,t){return e instanceof Yt?(function(r,s){return s instanceof Yt&&r.op===s.op&&r.field.isEqual(s.field)&&an(r.value,s.value)})(e,t):e instanceof ln?(function(r,s){return s instanceof ln&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&Zf(a,s.filters[l])),!0):!1})(e,t):void at()}function td(e){return e instanceof Yt?(function(n){return`${n.field.canonicalString()} ${n.op} ${Fr(n.value)}`})(e):e instanceof ln?(function(n){return n.op.toString()+" {"+n.getFilters().map(td).join(" ,")+"}"})(e):"Filter"}class fv extends Yt{constructor(t,n,r){super(t,n,r),this.key=et.fromName(r.referenceValue)}matches(t){const n=et.comparator(t.key,this.key);return this.matchesComparison(n)}}class dv extends Yt{constructor(t,n){super(t,"in",n),this.keys=ed("in",n)}matches(t){return this.keys.some((n=>n.isEqual(t.key)))}}class pv extends Yt{constructor(t,n){super(t,"not-in",n),this.keys=ed("not-in",n)}matches(t){return!this.keys.some((n=>n.isEqual(t.key)))}}function ed(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map((r=>et.fromName(r.referenceValue)))}class mv extends Yt{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return hl(n)&&Us(n.arrayValue,this.value)}}class gv extends Yt{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&Us(this.value.arrayValue,n)}}class _v extends Yt{constructor(t,n){super(t,"not-in",n)}matches(t){if(Us(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!Us(this.value.arrayValue,n)}}class yv extends Yt{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!hl(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Us(this.value.arrayValue,r)))}}/**
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
 */class vv{constructor(t,n=null,r=[],s=[],i=null,a=null,l=null){this.path=t,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function Uc(e,t=null,n=[],r=[],s=null,i=null,a=null){return new vv(e,t,n,r,s,i,a)}function fl(e){const t=ct(e);if(t.ue===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map((r=>Pa(r))).join(","),n+="|ob:",n+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Gs(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((r=>Fr(r))).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((r=>Fr(r))).join(",")),t.ue=n}return t.ue}function dl(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!cv(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Zf(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Fc(e.startAt,t.startAt)&&Fc(e.endAt,t.endAt)}function Ca(e){return et.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}/**
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
 */class fo{constructor(t,n=null,r=[],s=[],i=null,a="F",l=null,c=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ev(e,t,n,r,s,i,a,l){return new fo(e,t,n,r,s,i,a,l)}function pl(e){return new fo(e)}function Bc(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function Tv(e){return e.collectionGroup!==null}function bs(e){const t=ct(e);if(t.ce===null){t.ce=[];const n=new Set;for(const i of t.explicitOrderBy)t.ce.push(i),n.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ce(ue.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(t).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||t.ce.push(new zi(i,r))})),n.has(ue.keyField().canonicalString())||t.ce.push(new zi(ue.keyField(),r))}return t.ce}function rn(e){const t=ct(e);return t.le||(t.le=wv(t,bs(e))),t.le}function wv(e,t){if(e.limitType==="F")return Uc(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new zi(s.field,i)}));const n=e.endAt?new Hi(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Hi(e.startAt.position,e.startAt.inclusive):null;return Uc(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Va(e,t,n){return new fo(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function po(e,t){return dl(rn(e),rn(t))&&e.limitType===t.limitType}function nd(e){return`${fl(rn(e))}|lt:${e.limitType}`}function br(e){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>td(s))).join(", ")}]`),Gs(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Fr(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Fr(s))).join(",")),`Target(${r})`})(rn(e))}; limitType=${e.limitType})`}function mo(e,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):et.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(e,t)&&(function(r,s){for(const i of bs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(e,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(e,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,c){const d=Lc(a,l,c);return a.inclusive?d<=0:d<0})(r.startAt,bs(r),s)||r.endAt&&!(function(a,l,c){const d=Lc(a,l,c);return a.inclusive?d>=0:d>0})(r.endAt,bs(r),s))})(e,t)}function bv(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function rd(e){return(t,n)=>{let r=!1;for(const s of bs(e)){const i=Iv(s,t,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Iv(e,t,n){const r=e.field.isKeyField()?et.comparator(t.key,n.key):(function(i,a,l){const c=a.data.field(i),d=l.data.field(i);return c!==null&&d!==null?Lr(c,d):at()})(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return at()}}/**
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
 */class qr{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={},this.innerSize=0}get(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,n]);s.push([t,n]),this.innerSize++}delete(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){fr(this.inner,((n,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return Wf(this.inner)}size(){return this.innerSize}}/**
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
 */const Av=new jt(et.comparator);function An(){return Av}const sd=new jt(et.comparator);function ds(...e){let t=sd;for(const n of e)t=t.insert(n.key,n);return t}function id(e){let t=sd;return e.forEach(((n,r)=>t=t.insert(n,r.overlayedDocument))),t}function tr(){return Is()}function od(){return Is()}function Is(){return new qr((e=>e.toString()),((e,t)=>e.isEqual(t)))}const Rv=new jt(et.comparator),Sv=new ce(et.comparator);function vt(...e){let t=Sv;for(const n of e)t=t.add(n);return t}const Pv=new ce(St);function Cv(){return Pv}/**
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
 */function ml(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ki(t)?"-0":t}}function ad(e){return{integerValue:""+e}}function Vv(e,t){return iv(t)?ad(t):ml(e,t)}/**
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
 */class go{constructor(){this._=void 0}}function kv(e,t,n){return e instanceof Wi?(function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ul(i)&&(i=cl(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}})(n,t):e instanceof Bs?ud(e,t):e instanceof js?cd(e,t):(function(s,i){const a=ld(s,i),l=jc(a)+jc(s.Pe);return Sa(a)&&Sa(s.Pe)?ad(l):ml(s.serializer,l)})(e,t)}function xv(e,t,n){return e instanceof Bs?ud(e,t):e instanceof js?cd(e,t):n}function ld(e,t){return e instanceof Gi?(function(r){return Sa(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class Wi extends go{}class Bs extends go{constructor(t){super(),this.elements=t}}function ud(e,t){const n=hd(t);for(const r of e.elements)n.some((s=>an(s,r)))||n.push(r);return{arrayValue:{values:n}}}class js extends go{constructor(t){super(),this.elements=t}}function cd(e,t){let n=hd(t);for(const r of e.elements)n=n.filter((s=>!an(s,r)));return{arrayValue:{values:n}}}class Gi extends go{constructor(t,n){super(),this.serializer=t,this.Pe=n}}function jc(e){return zt(e.integerValue||e.doubleValue)}function hd(e){return hl(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function Dv(e,t){return e.field.isEqual(t.field)&&(function(r,s){return r instanceof Bs&&s instanceof Bs||r instanceof js&&s instanceof js?Mr(r.elements,s.elements,an):r instanceof Gi&&s instanceof Gi?an(r.Pe,s.Pe):r instanceof Wi&&s instanceof Wi})(e.transform,t.transform)}class Nv{constructor(t,n){this.version=t,this.transformResults=n}}class Ve{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new Ve}static exists(t){return new Ve(void 0,t)}static updateTime(t){return new Ve(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ki(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class _o{}function fd(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new gl(e.key,Ve.none()):new Qs(e.key,e.data,Ve.none());{const n=e.data,r=Pe.empty();let s=new ce(ue.comparator);for(let i of t.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Hn(e.key,r,new De(s.toArray()),Ve.none())}}function Ov(e,t,n){e instanceof Qs?(function(s,i,a){const l=s.value.clone(),c=qc(s.fieldTransforms,i,a.transformResults);l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(e,t,n):e instanceof Hn?(function(s,i,a){if(!ki(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=qc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(dd(s)),c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(e,t,n):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,n)}function As(e,t,n,r){return e instanceof Qs?(function(i,a,l,c){if(!ki(i.precondition,a))return l;const d=i.value.clone(),h=Kc(i.fieldTransforms,c,a);return d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(e,t,n,r):e instanceof Hn?(function(i,a,l,c){if(!ki(i.precondition,a))return l;const d=Kc(i.fieldTransforms,c,a),h=a.data;return h.setAll(dd(i)),h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(e,t,n,r):(function(i,a,l){return ki(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(e,t,n)}function Mv(e,t){let n=null;for(const r of e.fieldTransforms){const s=t.data.field(r.field),i=ld(r.transform,s||null);i!=null&&(n===null&&(n=Pe.empty()),n.set(r.field,i))}return n||null}function $c(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Mr(r,s,((i,a)=>Dv(i,a)))})(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Qs extends _o{constructor(t,n,r,s=[]){super(),this.key=t,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Hn extends _o{constructor(t,n,r,s,i=[]){super(),this.key=t,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function dd(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function qc(e,t,n){const r=new Map;It(e.length===n.length);for(let s=0;s<n.length;s++){const i=e[s],a=i.transform,l=t.data.field(i.field);r.set(i.field,xv(a,l,n[s]))}return r}function Kc(e,t,n){const r=new Map;for(const s of e){const i=s.transform,a=n.data.field(s.field);r.set(s.field,kv(i,a,t))}return r}class gl extends _o{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pd extends _o{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Lv{constructor(t,n,r,s){this.batchId=t,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Ov(i,t,r[s])}}applyToLocalView(t,n){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(n=As(r,t,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(n=As(r,t,n,this.localWriteTime));return n}applyToLocalDocumentSet(t,n){const r=od();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=n.has(s.key)?null:l;const c=fd(a,l);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(ut.min())})),r}keys(){return this.mutations.reduce(((t,n)=>t.add(n.key)),vt())}isEqual(t){return this.batchId===t.batchId&&Mr(this.mutations,t.mutations,((n,r)=>$c(n,r)))&&Mr(this.baseMutations,t.baseMutations,((n,r)=>$c(n,r)))}}class _l{constructor(t,n,r,s){this.batch=t,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(t,n,r){It(t.mutations.length===r.length);let s=(function(){return Rv})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new _l(t,n,r,s)}}/**
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
 */var Qt,wt;function md(e){switch(e){default:return at();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function gd(e){if(e===void 0)return In("GRPC error has no .code"),F.UNKNOWN;switch(e){case Qt.OK:return F.OK;case Qt.CANCELLED:return F.CANCELLED;case Qt.UNKNOWN:return F.UNKNOWN;case Qt.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Qt.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Qt.INTERNAL:return F.INTERNAL;case Qt.UNAVAILABLE:return F.UNAVAILABLE;case Qt.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Qt.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Qt.NOT_FOUND:return F.NOT_FOUND;case Qt.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Qt.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Qt.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Qt.ABORTED:return F.ABORTED;case Qt.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Qt.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Qt.DATA_LOSS:return F.DATA_LOSS;default:return at()}}(wt=Qt||(Qt={}))[wt.OK=0]="OK",wt[wt.CANCELLED=1]="CANCELLED",wt[wt.UNKNOWN=2]="UNKNOWN",wt[wt.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",wt[wt.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",wt[wt.NOT_FOUND=5]="NOT_FOUND",wt[wt.ALREADY_EXISTS=6]="ALREADY_EXISTS",wt[wt.PERMISSION_DENIED=7]="PERMISSION_DENIED",wt[wt.UNAUTHENTICATED=16]="UNAUTHENTICATED",wt[wt.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",wt[wt.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",wt[wt.ABORTED=10]="ABORTED",wt[wt.OUT_OF_RANGE=11]="OUT_OF_RANGE",wt[wt.UNIMPLEMENTED=12]="UNIMPLEMENTED",wt[wt.INTERNAL=13]="INTERNAL",wt[wt.UNAVAILABLE=14]="UNAVAILABLE",wt[wt.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const jv=new rr([4294967295,4294967295],0);function Hc(e){const t=Bv().encode(e),n=new Uf;return n.update(t),new Uint8Array(n.digest())}function zc(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new rr([n,r],0),new rr([s,i],0)]}class yl{constructor(t,n,r){if(this.bitmap=t,this.padding=n,this.hashCount=r,n<0||n>=8)throw new ps(`Invalid padding: ${n}`);if(r<0)throw new ps(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new ps(`Invalid hash count: ${r}`);if(t.length===0&&n!==0)throw new ps(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*t.length-n,this.Te=rr.fromNumber(this.Ie)}Ee(t,n,r){let s=t.add(n.multiply(rr.fromNumber(r)));return s.compare(jv)===1&&(s=new rr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const n=Hc(t),[r,s]=zc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(t,n,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new yl(i,s,n);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.Ie===0)return;const n=Hc(t),[r,s]=zc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(t){const n=Math.floor(t/8),r=t%8;this.bitmap[n]|=1<<r}}class ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class yo{constructor(t,n,r,s,i){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,r){const s=new Map;return s.set(t,Xs.createSynthesizedTargetChangeForCurrentChange(t,n,r)),new yo(ut.min(),s,new jt(St),An(),vt())}}class Xs{constructor(t,n,r,s,i){this.resumeToken=t,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,r){return new Xs(r,n,vt(),vt(),vt())}}/**
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
 */class xi{constructor(t,n,r,s){this.Re=t,this.removedTargetIds=n,this.key=r,this.Ve=s}}class _d{constructor(t,n){this.targetId=t,this.me=n}}class yd{constructor(t,n,r=fe.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Wc{constructor(){this.fe=0,this.ge=Qc(),this.pe=fe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=vt(),n=vt(),r=vt();return this.ge.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:at()}})),new Xs(this.pe,this.ye,t,n,r)}Ce(){this.we=!1,this.ge=Qc()}Fe(t,n){this.we=!0,this.ge=this.ge.insert(t,n)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,It(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class $v{constructor(t){this.Le=t,this.Be=new Map,this.ke=An(),this.qe=Gc(),this.Qe=new jt(St)}Ke(t){for(const n of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(n,t.Ve):this.Ue(n,t.key,t.Ve);for(const n of t.removedTargetIds)this.Ue(n,t.key,t.Ve)}We(t){this.forEachTarget(t,(n=>{const r=this.Ge(n);switch(t.state){case 0:this.ze(n)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(t.resumeToken));break;default:at()}}))}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.Be.forEach(((r,s)=>{this.ze(s)&&n(s)}))}He(t){const n=t.targetId,r=t.me.count,s=this.Je(n);if(s){const i=s.target;if(Ca(i))if(r===0){const a=new et(i.path);this.Ue(n,a,ne.newNoDocument(a,ut.min()))}else It(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(t),c=l?this.Xe(l,t,a):1;if(c!==0){this.je(n);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(t){const n=t.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,l;try{a=or(r).toUint8Array()}catch(c){if(c instanceof Gf)return Or("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new yl(a,s,i)}catch(c){return Or(c instanceof ps?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(t,n,r){return n.me.count===r-this.nt(t,n.targetId)?0:2}nt(t,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(l)||(this.Ue(n,i,null),s++)})),s}rt(t){const n=new Map;this.Be.forEach(((i,a)=>{const l=this.Je(a);if(l){if(i.current&&Ca(l.target)){const c=new et(l.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,ne.newNoDocument(c,t))}i.be&&(n.set(a,i.ve()),i.Ce())}}));let r=vt();this.qe.forEach(((i,a)=>{let l=!0;a.forEachWhile((c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.ke.forEach(((i,a)=>a.setReadTime(t)));const s=new yo(t,n,this.Qe,this.ke,r);return this.ke=An(),this.qe=Gc(),this.Qe=new jt(St),s}$e(t,n){if(!this.ze(t))return;const r=this.it(t,n.key)?2:0;this.Ge(t).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(t))}Ue(t,n,r){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(t)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const n=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let n=this.Be.get(t);return n||(n=new Wc,this.Be.set(t,n)),n}st(t){let n=this.qe.get(t);return n||(n=new ce(St),this.qe=this.qe.insert(t,n)),n}ze(t){const n=this.Je(t)!==null;return n||J("WatchChangeAggregator","Detected inactive target",t),n}Je(t){const n=this.Be.get(t);return n&&n.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Wc),this.Le.getRemoteKeysForTarget(t).forEach((n=>{this.Ue(t,n,null)}))}it(t,n){return this.Le.getRemoteKeysForTarget(t).has(n)}}function Gc(){return new jt(et.comparator)}function Qc(){return new jt(et.comparator)}const qv={asc:"ASCENDING",desc:"DESCENDING"},Kv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Hv={and:"AND",or:"OR"};class zv{constructor(t,n){this.databaseId=t,this.useProto3Json=n}}function ka(e,t){return e.useProto3Json||Gs(t)?t:{value:t}}function Qi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function vd(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Wv(e,t){return Qi(e,t.toTimestamp())}function Oe(e){return It(!!e),ut.fromTimestamp((function(n){const r=qn(n);return new Jt(r.seconds,r.nanos)})(e))}function vl(e,t){return xa(e,t).canonicalString()}function xa(e,t){const n=(function(s){return new Ft(["projects",s.projectId,"databases",s.database])})(e).child("documents");return t===void 0?n:n.child(t)}function Ed(e){const t=Ft.fromString(e);return It(Rd(t)),t}function Xi(e,t){return vl(e.databaseId,t.path)}function Rs(e,t){const n=Ed(t);if(n.get(1)!==e.databaseId.projectId)throw new Z(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Z(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new et(wd(n))}function Td(e,t){return vl(e.databaseId,t)}function Gv(e){const t=Ed(e);return t.length===4?Ft.emptyPath():wd(t)}function Da(e){return new Ft(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function wd(e){return It(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function Xc(e,t,n){return{name:Xi(e,t),fields:n.value.mapValue.fields}}function Qv(e,t){return"found"in t?(function(r,s){It(!!s.found),s.found.name,s.found.updateTime;const i=Rs(r,s.found.name),a=Oe(s.found.updateTime),l=s.found.createTime?Oe(s.found.createTime):ut.min(),c=new Pe({mapValue:{fields:s.found.fields}});return ne.newFoundDocument(i,a,l,c)})(e,t):"missing"in t?(function(r,s){It(!!s.missing),It(!!s.readTime);const i=Rs(r,s.missing),a=Oe(s.readTime);return ne.newNoDocument(i,a)})(e,t):at()}function Xv(e,t){let n;if("targetChange"in t){t.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:at()})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(d,h){return d.useProto3Json?(It(h===void 0||typeof h=="string"),fe.fromBase64String(h||"")):(It(h===void 0||h instanceof Buffer||h instanceof Uint8Array),fe.fromUint8Array(h||new Uint8Array))})(e,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(d){const h=d.code===void 0?F.UNKNOWN:gd(d.code);return new Z(h,d.message||"")})(a);n=new yd(r,s,i,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Rs(e,r.document.name),i=Oe(r.document.updateTime),a=r.document.createTime?Oe(r.document.createTime):ut.min(),l=new Pe({mapValue:{fields:r.document.fields}}),c=ne.newFoundDocument(s,i,a,l),d=r.targetIds||[],h=r.removedTargetIds||[];n=new xi(d,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Rs(e,r.document),i=r.readTime?Oe(r.readTime):ut.min(),a=ne.newNoDocument(s,i),l=r.removedTargetIds||[];n=new xi([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Rs(e,r.document),i=r.removedTargetIds||[];n=new xi([],i,s,null)}else{if(!("filter"in t))return at();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Uv(s,i),l=r.targetId;n=new _d(l,a)}}return n}function bd(e,t){let n;if(t instanceof Qs)n={update:Xc(e,t.key,t.value)};else if(t instanceof gl)n={delete:Xi(e,t.key)};else if(t instanceof Hn)n={update:Xc(e,t.key,t.data),updateMask:iE(t.fieldMask)};else{if(!(t instanceof pd))return at();n={verify:Xi(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof Wi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Bs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof js)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Gi)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw at()})(0,r)))),t.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Wv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:at()})(e,t.precondition)),n}function Yv(e,t){return e&&e.length>0?(It(t!==void 0),e.map((n=>(function(s,i){let a=s.updateTime?Oe(s.updateTime):Oe(i);return a.isEqual(ut.min())&&(a=Oe(i)),new Nv(a,s.transformResults||[])})(n,t)))):[]}function Jv(e,t){return{documents:[Td(e,t.path)]}}function Zv(e,t){const n={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Td(e,s);const i=(function(d){if(d.length!==0)return Ad(ln.create(d,"and"))})(t.filters);i&&(n.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((h=>(function(E){return{field:Ir(E.field),direction:nE(E.dir)}})(h)))})(t.orderBy);a&&(n.structuredQuery.orderBy=a);const l=ka(e,t.limit);return l!==null&&(n.structuredQuery.limit=l),t.startAt&&(n.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(n.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{_t:n,parent:s}}function tE(e){let t=Gv(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){It(r===1);const h=n.from[0];h.allDescendants?s=h.collectionId:t=t.child(h.collectionId)}let i=[];n.where&&(i=(function(m){const E=Id(m);return E instanceof ln&&Jf(E)?E.getFilters():[E]})(n.where));let a=[];n.orderBy&&(a=(function(m){return m.map((E=>(function(D){return new zi(Ar(D.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(E)))})(n.orderBy));let l=null;n.limit&&(l=(function(m){let E;return E=typeof m=="object"?m.value:m,Gs(E)?null:E})(n.limit));let c=null;n.startAt&&(c=(function(m){const E=!!m.before,S=m.values||[];return new Hi(S,E)})(n.startAt));let d=null;return n.endAt&&(d=(function(m){const E=!m.before,S=m.values||[];return new Hi(S,E)})(n.endAt)),Ev(t,s,a,i,l,"F",c,d)}function eE(e,t){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return at()}})(t.purpose);return n==null?null:{"goog-listen-tags":n}}function Id(e){return e.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Ar(n.unaryFilter.field);return Yt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ar(n.unaryFilter.field);return Yt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ar(n.unaryFilter.field);return Yt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ar(n.unaryFilter.field);return Yt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return at()}})(e):e.fieldFilter!==void 0?(function(n){return Yt.create(Ar(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return at()}})(n.fieldFilter.op),n.fieldFilter.value)})(e):e.compositeFilter!==void 0?(function(n){return ln.create(n.compositeFilter.filters.map((r=>Id(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return at()}})(n.compositeFilter.op))})(e):at()}function nE(e){return qv[e]}function rE(e){return Kv[e]}function sE(e){return Hv[e]}function Ir(e){return{fieldPath:e.canonicalString()}}function Ar(e){return ue.fromServerFormat(e.fieldPath)}function Ad(e){return e instanceof Yt?(function(n){if(n.op==="=="){if(Mc(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NAN"}};if(Oc(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Mc(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NOT_NAN"}};if(Oc(n.value))return{unaryFilter:{field:Ir(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ir(n.field),op:rE(n.op),value:n.value}}})(e):e instanceof ln?(function(n){const r=n.getFilters().map((s=>Ad(s)));return r.length===1?r[0]:{compositeFilter:{op:sE(n.op),filters:r}}})(e):at()}function iE(e){const t=[];return e.fields.forEach((n=>t.push(n.canonicalString()))),{fieldPaths:t}}function Rd(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
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
 */class Nn{constructor(t,n,r,s,i=ut.min(),a=ut.min(),l=fe.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(t){return new Nn(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class oE{constructor(t){this.ct=t}}function aE(e){const t=tE({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?Va(t,t.limit,"L"):t}/**
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
 */class lE{constructor(){this.un=new uE}addToCollectionParentIndex(t,n){return this.un.add(n),$.resolve()}getCollectionParents(t,n){return $.resolve(this.un.getEntries(n))}addFieldIndex(t,n){return $.resolve()}deleteFieldIndex(t,n){return $.resolve()}deleteAllFieldIndexes(t){return $.resolve()}createTargetIndexes(t,n){return $.resolve()}getDocumentsMatchingTarget(t,n){return $.resolve(null)}getIndexType(t,n){return $.resolve(0)}getFieldIndexes(t,n){return $.resolve([])}getNextCollectionGroupToUpdate(t){return $.resolve(null)}getMinOffset(t,n){return $.resolve($n.min())}getMinOffsetFromCollectionGroup(t,n){return $.resolve($n.min())}updateCollectionGroup(t,n,r){return $.resolve()}updateIndexEntries(t,n){return $.resolve()}}class uE{constructor(){this.index={}}add(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n]||new ce(Ft.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ce(Ft.comparator)).toArray()}}/**
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
 */class Ur{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ur(0)}static kn(){return new Ur(-1)}}/**
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
 */class cE{constructor(){this.changes=new qr((t=>t.toString()),((t,n)=>t.isEqual(n))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,ne.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?$.resolve(r):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class fE{constructor(t,n,r,s){this.remoteDocumentCache=t,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,n){let r=null;return this.documentOverlayCache.getOverlay(t,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,n)))).next((s=>(r!==null&&As(r.mutation,s,De.empty(),Jt.now()),s)))}getDocuments(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.getLocalViewOfDocuments(t,r,vt()).next((()=>r))))}getLocalViewOfDocuments(t,n,r=vt()){const s=tr();return this.populateOverlays(t,s,n).next((()=>this.computeViews(t,n,s,r).next((i=>{let a=ds();return i.forEach(((l,c)=>{a=a.insert(l,c.overlayedDocument)})),a}))))}getOverlayedDocuments(t,n){const r=tr();return this.populateOverlays(t,r,n).next((()=>this.computeViews(t,n,r,vt())))}populateOverlays(t,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,l)=>{n.set(a,l)}))}))}computeViews(t,n,r,s){let i=An();const a=Is(),l=(function(){return Is()})();return n.forEach(((c,d)=>{const h=r.get(d.key);s.has(d.key)&&(h===void 0||h.mutation instanceof Hn)?i=i.insert(d.key,d):h!==void 0?(a.set(d.key,h.mutation.getFieldMask()),As(h.mutation,d,h.mutation.getFieldMask(),Jt.now())):a.set(d.key,De.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((d,h)=>a.set(d,h))),n.forEach(((d,h)=>{var m;return l.set(d,new hE(h,(m=a.get(d))!==null&&m!==void 0?m:null))})),l)))}recalculateAndSaveOverlays(t,n){const r=Is();let s=new jt(((a,l)=>a-l)),i=vt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,n).next((a=>{for(const l of a)l.keys().forEach((c=>{const d=n.get(c);if(d===null)return;let h=r.get(c)||De.empty();h=l.applyToLocalView(d,h),r.set(c,h);const m=(s.get(l.batchId)||vt()).add(c);s=s.insert(l.batchId,m)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),d=c.key,h=c.value,m=od();h.forEach((E=>{if(!i.has(E)){const S=fd(n.get(E),r.get(E));S!==null&&m.set(E,S),i=i.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,m))}return $.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,n,r,s){return(function(a){return et.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(t,n.path):Tv(n)?this.getDocumentsMatchingCollectionGroupQuery(t,n,r,s):this.getDocumentsMatchingCollectionQuery(t,n,r,s)}getNextDocuments(t,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,n,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,n,r.largestBatchId,s-i.size):$.resolve(tr());let l=-1,c=i;return a.next((d=>$.forEach(d,((h,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(h)?$.resolve():this.remoteDocumentCache.getEntry(t,h).next((E=>{c=c.insert(h,E)}))))).next((()=>this.populateOverlays(t,d,i))).next((()=>this.computeViews(t,c,d,vt()))).next((h=>({batchId:l,changes:id(h)})))))}))}getDocumentsMatchingDocumentQuery(t,n){return this.getDocument(t,new et(n)).next((r=>{let s=ds();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,n,r,s){const i=n.collectionGroup;let a=ds();return this.indexManager.getCollectionParents(t,i).next((l=>$.forEach(l,(c=>{const d=(function(m,E){return new fo(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next((h=>{h.forEach(((m,E)=>{a=a.insert(m,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,n.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,n,r,i,s)))).next((a=>{i.forEach(((c,d)=>{const h=d.getKey();a.get(h)===null&&(a=a.insert(h,ne.newInvalidDocument(h)))}));let l=ds();return a.forEach(((c,d)=>{const h=i.get(c);h!==void 0&&As(h.mutation,d,De.empty(),Jt.now()),mo(n,d)&&(l=l.insert(c,d))})),l}))}}/**
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
 */class dE{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,n){return $.resolve(this.hr.get(n))}saveBundleMetadata(t,n){return this.hr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:Oe(s.createTime)}})(n)),$.resolve()}getNamedQuery(t,n){return $.resolve(this.Pr.get(n))}saveNamedQuery(t,n){return this.Pr.set(n.name,(function(s){return{name:s.name,query:aE(s.bundledQuery),readTime:Oe(s.readTime)}})(n)),$.resolve()}}/**
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
 */class pE{constructor(){this.overlays=new jt(et.comparator),this.Ir=new Map}getOverlay(t,n){return $.resolve(this.overlays.get(n))}getOverlays(t,n){const r=tr();return $.forEach(n,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,n,r){return r.forEach(((s,i)=>{this.ht(t,n,i)})),$.resolve()}removeOverlaysForBatchId(t,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ir.delete(r)),$.resolve()}getOverlaysForCollection(t,n,r){const s=tr(),i=n.length+1,a=new et(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,d=c.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return $.resolve(s)}getOverlaysForCollectionGroup(t,n,r,s){let i=new jt(((d,h)=>d-h));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let h=i.get(d.largestBatchId);h===null&&(h=tr(),i=i.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const l=tr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((d,h)=>l.set(d,h))),!(l.size()>=s)););return $.resolve(l)}ht(t,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Fv(n,r));let i=this.Ir.get(n);i===void 0&&(i=vt(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class mE{constructor(){this.sessionToken=fe.EMPTY_BYTE_STRING}getSessionToken(t){return $.resolve(this.sessionToken)}setSessionToken(t,n){return this.sessionToken=n,$.resolve()}}/**
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
 */class El{constructor(){this.Tr=new ce(ee.Er),this.dr=new ce(ee.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,n){const r=new ee(t,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,n){t.forEach((r=>this.addReference(r,n)))}removeReference(t,n){this.Vr(new ee(t,n))}mr(t,n){t.forEach((r=>this.removeReference(r,n)))}gr(t){const n=new et(new Ft([])),r=new ee(n,t),s=new ee(n,t+1),i=[];return this.dr.forEachInRange([r,s],(a=>{this.Vr(a),i.push(a.key)})),i}pr(){this.Tr.forEach((t=>this.Vr(t)))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const n=new et(new Ft([])),r=new ee(n,t),s=new ee(n,t+1);let i=vt();return this.dr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const n=new ee(t,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&t.isEqual(r.key)}}class ee{constructor(t,n){this.key=t,this.wr=n}static Er(t,n){return et.comparator(t.key,n.key)||St(t.wr,n.wr)}static Ar(t,n){return St(t.wr,n.wr)||et.comparator(t.key,n.key)}}/**
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
 */class gE{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ce(ee.Er)}checkEmpty(t){return $.resolve(this.mutationQueue.length===0)}addMutationBatch(t,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Lv(i,n,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new ee(l.key,i)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return $.resolve(a)}lookupMutationBatch(t,n){return $.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(t,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return $.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return $.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return $.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const r=new ee(n,0),s=new ee(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],(a=>{const l=this.Dr(a.wr);i.push(l)})),$.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let r=new ce(St);return n.forEach((s=>{const i=new ee(s,0),a=new ee(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],(l=>{r=r.add(l.wr)}))})),$.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,n){const r=n.path,s=r.length+1;let i=r;et.isDocumentKey(i)||(i=i.child(""));const a=new ee(new et(i),0);let l=new ce(St);return this.br.forEachWhile((c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(c.wr)),!0)}),a),$.resolve(this.Cr(l))}Cr(t){const n=[];return t.forEach((r=>{const s=this.Dr(r);s!==null&&n.push(s)})),n}removeMutationBatch(t,n){It(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return $.forEach(n.mutations,(s=>{const i=new ee(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.br=r}))}On(t){}containsKey(t,n){const r=new ee(n,0),s=this.br.firstAfterOrEqual(r);return $.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,$.resolve()}Fr(t,n){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const n=this.vr(t);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class _E{constructor(t){this.Mr=t,this.docs=(function(){return new jt(et.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const r=this.docs.get(n);return $.resolve(r?r.document.mutableCopy():ne.newInvalidDocument(n))}getEntries(t,n){let r=An();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ne.newInvalidDocument(s))})),$.resolve(r)}getDocumentsMatchingQuery(t,n,r,s){let i=An();const a=n.path,l=new et(a.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:d,value:{document:h}}=c.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ev(tv(h),r)<=0||(s.has(h.key)||mo(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return $.resolve(i)}getAllFromCollectionGroup(t,n,r,s){at()}Or(t,n){return $.forEach(this.docs,(r=>n(r)))}newChangeBuffer(t){return new yE(this)}getSize(t){return $.resolve(this.size)}}class yE extends cE{constructor(t){super(),this.cr=t}applyChanges(t){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(t,s)):this.cr.removeEntry(r)})),$.waitFor(n)}getFromCache(t,n){return this.cr.getEntry(t,n)}getAllFromCache(t,n){return this.cr.getEntries(t,n)}}/**
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
 */class vE{constructor(t){this.persistence=t,this.Nr=new qr((n=>fl(n)),dl),this.lastRemoteSnapshotVersion=ut.min(),this.highestTargetId=0,this.Lr=0,this.Br=new El,this.targetCount=0,this.kr=Ur.Bn()}forEachTarget(t,n){return this.Nr.forEach(((r,s)=>n(s))),$.resolve()}getLastRemoteSnapshotVersion(t){return $.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return $.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),$.resolve(this.highestTargetId)}setTargetsMetadata(t,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),$.resolve()}Kn(t){this.Nr.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.kr=new Ur(n),this.highestTargetId=n),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,n){return this.Kn(n),this.targetCount+=1,$.resolve()}updateTargetData(t,n){return this.Kn(n),$.resolve()}removeTargetData(t,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,$.resolve()}removeTargets(t,n,r){let s=0;const i=[];return this.Nr.forEach(((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),$.waitFor(i).next((()=>s))}getTargetCount(t){return $.resolve(this.targetCount)}getTargetData(t,n){const r=this.Nr.get(n)||null;return $.resolve(r)}addMatchingKeys(t,n,r){return this.Br.Rr(n,r),$.resolve()}removeMatchingKeys(t,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),$.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.Br.gr(n),$.resolve()}getMatchingKeysForTargetId(t,n){const r=this.Br.yr(n);return $.resolve(r)}containsKey(t,n){return $.resolve(this.Br.containsKey(n))}}/**
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
 */class EE{constructor(t,n){this.qr={},this.overlays={},this.Qr=new ll(0),this.Kr=!1,this.Kr=!0,this.$r=new mE,this.referenceDelegate=t(this),this.Ur=new vE(this),this.indexManager=new lE,this.remoteDocumentCache=(function(s){return new _E(s)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new oE(n),this.Gr=new dE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new pE,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let r=this.qr[t.toKey()];return r||(r=new gE(n,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,n,r){J("MemoryPersistence","Starting transaction:",t);const s=new TE(this.Qr.next());return this.referenceDelegate.zr(),r(s).next((i=>this.referenceDelegate.jr(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Hr(t,n){return $.or(Object.values(this.qr).map((r=>()=>r.containsKey(t,n))))}}class TE extends rv{constructor(t){super(),this.currentSequenceNumber=t}}class Tl{constructor(t){this.persistence=t,this.Jr=new El,this.Yr=null}static Zr(t){return new Tl(t)}get Xr(){if(this.Yr)return this.Yr;throw at()}addReference(t,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),$.resolve()}removeReference(t,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),$.resolve()}markPotentiallyOrphaned(t,n){return this.Xr.add(n.toString()),$.resolve()}removeTarget(t,n){this.Jr.gr(n.targetId).forEach((s=>this.Xr.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,n.targetId).next((s=>{s.forEach((i=>this.Xr.add(i.toString())))})).next((()=>r.removeTargetData(t,n)))}zr(){this.Yr=new Set}jr(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return $.forEach(this.Xr,(r=>{const s=et.fromPath(r);return this.ei(t,s).next((i=>{i||n.removeEntry(s,ut.min())}))})).next((()=>(this.Yr=null,n.apply(t))))}updateLimboDocument(t,n){return this.ei(t,n).next((r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())}))}Wr(t){return 0}ei(t,n){return $.or([()=>$.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Hr(t,n)])}}/**
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
 */class wl{constructor(t,n,r,s){this.targetId=t,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(t,n){let r=vt(),s=vt();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new wl(t,n.fromCache,r,s)}}/**
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
 */class bE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return C_()?8:sv(S_())>0?6:4})()}initialize(t,n){this.Ji=t,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(t,n,r,s){const i={result:null};return this.Yi(t,n).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Zi(t,n,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new wE;return this.Xi(t,n,a).next((l=>{if(i.result=l,this.zi)return this.es(t,n,a,l.size)}))})).next((()=>i.result))}es(t,n,r,s){return r.documentReadCount<this.ji?(os()<=bt.DEBUG&&J("QueryEngine","SDK will not create cache indexes for query:",br(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),$.resolve()):(os()<=bt.DEBUG&&J("QueryEngine","Query:",br(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(os()<=bt.DEBUG&&J("QueryEngine","The SDK decides to create cache indexes for query:",br(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,rn(n))):$.resolve())}Yi(t,n){if(Bc(n))return $.resolve(null);let r=rn(n);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Va(n,null,"F"),r=rn(n)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const a=vt(...i);return this.Ji.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((c=>{const d=this.ts(n,l);return this.ns(n,d,a,c.readTime)?this.Yi(t,Va(n,null,"F")):this.rs(t,d,n,c)}))))})))))}Zi(t,n,r,s){return Bc(n)||s.isEqual(ut.min())?$.resolve(null):this.Ji.getDocuments(t,r).next((i=>{const a=this.ts(n,i);return this.ns(n,a,r,s)?$.resolve(null):(os()<=bt.DEBUG&&J("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),br(n)),this.rs(t,a,n,Zy(s,-1)).next((l=>l)))}))}ts(t,n){let r=new ce(rd(t));return n.forEach(((s,i)=>{mo(t,i)&&(r=r.add(i))})),r}ns(t,n,r,s){if(t.limit===null)return!1;if(r.size!==n.size)return!0;const i=t.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(t,n,r){return os()<=bt.DEBUG&&J("QueryEngine","Using full collection scan to execute query:",br(n)),this.Ji.getDocumentsMatchingQuery(t,n,$n.min(),r)}rs(t,n,r,s){return this.Ji.getDocumentsMatchingQuery(t,r,s).next((i=>(n.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */class IE{constructor(t,n,r,s){this.persistence=t,this.ss=n,this.serializer=s,this.os=new jt(St),this._s=new qr((i=>fl(i)),dl),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new fE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>t.collect(n,this.os)))}}function AE(e,t,n,r){return new IE(e,t,n,r)}async function Sd(e,t){const n=ct(e);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.ls(t),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let c=vt();for(const d of s){a.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}for(const d of i){l.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(r,c).next((d=>({hs:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function RE(e,t){const n=ct(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return(function(l,c,d,h){const m=d.batch,E=m.keys();let S=$.resolve();return E.forEach((D=>{S=S.next((()=>h.getEntry(c,D))).next((O=>{const N=d.docVersions.get(D);It(N!==null),O.version.compareTo(N)<0&&(m.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),h.addEntry(O)))}))})),S.next((()=>l.mutationQueue.removeMutationBatch(c,m)))})(n,r,t,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=vt();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(c=c.add(l.batch.mutations[d].key));return c})(t)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function Pd(e){const t=ct(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>t.Ur.getLastRemoteSnapshotVersion(n)))}function SE(e,t){const n=ct(e),r=t.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];t.targetChanges.forEach(((h,m)=>{const E=s.get(m);if(!E)return;l.push(n.Ur.removeMatchingKeys(i,h.removedDocuments,m).next((()=>n.Ur.addMatchingKeys(i,h.addedDocuments,m))));let S=E.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?S=S.withResumeToken(fe.EMPTY_BYTE_STRING,ut.min()).withLastLimboFreeSnapshotVersion(ut.min()):h.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(h.resumeToken,r)),s=s.insert(m,S),(function(O,N,Y){return O.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:Y.addedDocuments.size+Y.modifiedDocuments.size+Y.removedDocuments.size>0})(E,S,h)&&l.push(n.Ur.updateTargetData(i,S))}));let c=An(),d=vt();if(t.documentUpdates.forEach((h=>{t.resolvedLimboDocuments.has(h)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))})),l.push(PE(i,a,t.documentUpdates).next((h=>{c=h.Ps,d=h.Is}))),!r.isEqual(ut.min())){const h=n.Ur.getLastRemoteSnapshotVersion(i).next((m=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(h)}return $.waitFor(l).next((()=>a.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,c,d))).next((()=>c))})).then((i=>(n.os=s,i)))}function PE(e,t,n){let r=vt(),s=vt();return n.forEach((i=>r=r.add(i))),t.getEntries(e,r).next((i=>{let a=An();return n.forEach(((l,c)=>{const d=i.get(l);c.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(ut.min())?(t.removeEntry(l,c.readTime),a=a.insert(l,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(c),a=a.insert(l,c)):J("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",c.version)})),{Ps:a,Is:s}}))}function CE(e,t){const n=ct(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function VE(e,t){const n=ct(e);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Ur.getTargetData(r,t).next((i=>i?(s=i,$.resolve(s)):n.Ur.allocateTargetId(r).next((a=>(s=new Nn(t,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(t,r.targetId)),r}))}async function Na(e,t,n){const r=ct(e),s=r.os.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Ws(a))throw a;J("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}r.os=r.os.remove(t),r._s.delete(s.target)}function Yc(e,t,n){const r=ct(e);let s=ut.min(),i=vt();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,d,h){const m=ct(c),E=m._s.get(h);return E!==void 0?$.resolve(m.os.get(E)):m.Ur.getTargetData(d,h)})(r,a,rn(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next((c=>{i=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(a,t,n?s:ut.min(),n?i:vt()))).next((l=>(kE(r,bv(t),l),{documents:l,Ts:i})))))}function kE(e,t,n){let r=e.us.get(t)||ut.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),e.us.set(t,r)}class Jc{constructor(){this.activeTargetIds=Cv()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class xE{constructor(){this.so=new Jc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,r){}addLocalQueryTarget(t,n=!0){return n&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,n,r){this.oo[t]=n}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Jc,Promise.resolve()}handleUserChange(t,n,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class Zc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){J("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){J("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let wi=null;function ra(){return wi===null?wi=(function(){return 268435456+Math.round(2147483648*Math.random())})():wi++,"0x"+wi.toString(16)}/**
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
 */const ye="WebChannelConnection";class ME extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,a){const l=ra(),c=this.xo(n,r.toUriEncodedString());J("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(n,c,d,s).then((h=>(J("RestConnection",`Received RPC '${n}' ${l}: `,h),h)),(h=>{throw Or("RestConnection",`RPC '${n}' ${l} failed with error: `,h,"url: ",c,"request:",s),h}))}Lo(n,r,s,i,a,l){return this.Mo(n,r,s,i,a)}Oo(n,r,s){n["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+$r})(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((i,a)=>n[a]=i)),s&&s.headers.forEach(((i,a)=>n[a]=i))}xo(n,r){const s=NE[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,n,r,s){const i=ra();return new Promise(((a,l)=>{const c=new Bf;c.setWithCredentials(!0),c.listenOnce(jf.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Ci.NO_ERROR:const h=c.getResponseJson();J(ye,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(h)),a(h);break;case Ci.TIMEOUT:J(ye,`RPC '${t}' ${i} timed out`),l(new Z(F.DEADLINE_EXCEEDED,"Request time out"));break;case Ci.HTTP_ERROR:const m=c.getStatus();if(J(ye,`RPC '${t}' ${i} failed with status:`,m,"response text:",c.getResponseText()),m>0){let E=c.getResponseJson();Array.isArray(E)&&(E=E[0]);const S=E==null?void 0:E.error;if(S&&S.status&&S.message){const D=(function(N){const Y=N.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(Y)>=0?Y:F.UNKNOWN})(S.status);l(new Z(D,S.message))}else l(new Z(F.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new Z(F.UNAVAILABLE,"Connection failed."));break;default:at()}}finally{J(ye,`RPC '${t}' ${i} completed.`)}}));const d=JSON.stringify(s);J(ye,`RPC '${t}' ${i} sending request:`,s),c.send(n,"POST",d,r,15)}))}Bo(t,n,r){const s=ra(),i=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Kf(),l=qf(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const h=i.join("");J(ye,`Creating RPC '${t}' stream ${s}: ${h}`,c);const m=a.createWebChannel(h,c);let E=!1,S=!1;const D=new OE({Io:N=>{S?J(ye,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(E||(J(ye,`Opening RPC '${t}' stream ${s} transport.`),m.open(),E=!0),J(ye,`RPC '${t}' stream ${s} sending:`,N),m.send(N))},To:()=>m.close()}),O=(N,Y,Q)=>{N.listen(Y,(X=>{try{Q(X)}catch(K){setTimeout((()=>{throw K}),0)}}))};return O(m,fs.EventType.OPEN,(()=>{S||(J(ye,`RPC '${t}' stream ${s} transport opened.`),D.yo())})),O(m,fs.EventType.CLOSE,(()=>{S||(S=!0,J(ye,`RPC '${t}' stream ${s} transport closed`),D.So())})),O(m,fs.EventType.ERROR,(N=>{S||(S=!0,Or(ye,`RPC '${t}' stream ${s} transport errored:`,N),D.So(new Z(F.UNAVAILABLE,"The operation could not be completed")))})),O(m,fs.EventType.MESSAGE,(N=>{var Y;if(!S){const Q=N.data[0];It(!!Q);const X=Q,K=X.error||((Y=X[0])===null||Y===void 0?void 0:Y.error);if(K){J(ye,`RPC '${t}' stream ${s} received error:`,K);const _t=K.status;let At=(function(v){const w=Qt[v];if(w!==void 0)return gd(w)})(_t),I=K.message;At===void 0&&(At=F.INTERNAL,I="Unknown error status: "+_t+" with message "+K.message),S=!0,D.So(new Z(At,I)),m.close()}else J(ye,`RPC '${t}' stream ${s} received:`,Q),D.bo(Q)}})),O(l,$f.STAT_EVENT,(N=>{N.stat===Aa.PROXY?J(ye,`RPC '${t}' stream ${s} detected buffering proxy`):N.stat===Aa.NOPROXY&&J(ye,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{D.wo()}),0),D}}function sa(){return typeof document<"u"?document:null}/**
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
 */function vo(e){return new zv(e,!0)}/**
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
 */class bl{constructor(t,n,r=1e3,s=1.5,i=6e4){this.ui=t,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&J("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),t()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Cd{constructor(t,n,r,s,i,a,l,c){this.ui=t,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new bl(t,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(In(n.toString()),In("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(n)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Yo===n&&this.P_(r,s)}),(r=>{t((()=>{const s=new Z(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)}))}))}P_(t,n){const r=this.h_(this.Yo);this.stream=this.T_(t,n),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((s=>{r((()=>this.I_(s)))})),this.stream.onMessage((s=>{r((()=>++this.e_==1?this.E_(s):this.onNext(s)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(t){return J("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return n=>{this.ui.enqueueAndForget((()=>this.Yo===t?n():(J("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class LE extends Cd{constructor(t,n,r,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}T_(t,n){return this.connection.Bo("Listen",t,n)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const n=Xv(this.serializer,t),r=(function(i){if(!("targetChange"in i))return ut.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?ut.min():a.readTime?Oe(a.readTime):ut.min()})(t);return this.listener.d_(n,r)}A_(t){const n={};n.database=Da(this.serializer),n.addTarget=(function(i,a){let l;const c=a.target;if(l=Ca(c)?{documents:Jv(i,c)}:{query:Zv(i,c)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=vd(i,a.resumeToken);const d=ka(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(ut.min())>0){l.readTime=Qi(i,a.snapshotVersion.toTimestamp());const d=ka(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,t);const r=eE(this.serializer,t);r&&(n.labels=r),this.a_(n)}R_(t){const n={};n.database=Da(this.serializer),n.removeTarget=t,this.a_(n)}}class FE extends Cd{constructor(t,n,r,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,n){return this.connection.Bo("Write",t,n)}E_(t){return It(!!t.streamToken),this.lastStreamToken=t.streamToken,It(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){It(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const n=Yv(t.writeResults,t.commitTime),r=Oe(t.commitTime);return this.listener.g_(r,n)}p_(){const t={};t.database=Da(this.serializer),this.a_(t)}m_(t){const n={streamToken:this.lastStreamToken,writes:t.map((r=>bd(this.serializer,r)))};this.a_(n)}}/**
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
 */class UE extends class{}{constructor(t,n,r,s){super(),this.authCredentials=t,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new Z(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Mo(t,xa(n,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Z(F.UNKNOWN,i.toString())}))}Lo(t,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Lo(t,xa(n,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new Z(F.UNKNOWN,a.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class BE{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(In(n),this.D_=!1):J("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class jE{constructor(t,n,r,s,i){this.localStore=t,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o((a=>{r.enqueueAndForget((async()=>{dr(this)&&(J("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const d=ct(c);d.L_.add(4),await Ys(d),d.q_.set("Unknown"),d.L_.delete(4),await Eo(d)})(this))}))})),this.q_=new BE(r,s)}}async function Eo(e){if(dr(e))for(const t of e.B_)await t(!0)}async function Ys(e){for(const t of e.B_)await t(!1)}function Vd(e,t){const n=ct(e);n.N_.has(t.targetId)||(n.N_.set(t.targetId,t),Sl(n)?Rl(n):Kr(n).r_()&&Al(n,t))}function Il(e,t){const n=ct(e),r=Kr(n);n.N_.delete(t),r.r_()&&kd(n,t),n.N_.size===0&&(r.r_()?r.o_():dr(n)&&n.q_.set("Unknown"))}function Al(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(ut.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Kr(e).A_(t)}function kd(e,t){e.Q_.xe(t),Kr(e).R_(t)}function Rl(e){e.Q_=new $v({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),Kr(e).start(),e.q_.v_()}function Sl(e){return dr(e)&&!Kr(e).n_()&&e.N_.size>0}function dr(e){return ct(e).L_.size===0}function xd(e){e.Q_=void 0}async function $E(e){e.q_.set("Online")}async function qE(e){e.N_.forEach(((t,n)=>{Al(e,t)}))}async function KE(e,t){xd(e),Sl(e)?(e.q_.M_(t),Rl(e)):e.q_.set("Unknown")}async function HE(e,t,n){if(e.q_.set("Online"),t instanceof yd&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))})(e,t)}catch(r){J("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Yi(e,r)}else if(t instanceof xi?e.Q_.Ke(t):t instanceof _d?e.Q_.He(t):e.Q_.We(t),!n.isEqual(ut.min()))try{const r=await Pd(e.localStore);n.compareTo(r)>=0&&await(function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach(((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.N_.get(d);h&&i.N_.set(d,h.withResumeToken(c.resumeToken,a))}})),l.targetMismatches.forEach(((c,d)=>{const h=i.N_.get(c);if(!h)return;i.N_.set(c,h.withResumeToken(fe.EMPTY_BYTE_STRING,h.snapshotVersion)),kd(i,c);const m=new Nn(h.target,c,d,h.sequenceNumber);Al(i,m)})),i.remoteSyncer.applyRemoteEvent(l)})(e,n)}catch(r){J("RemoteStore","Failed to raise snapshot:",r),await Yi(e,r)}}async function Yi(e,t,n){if(!Ws(t))throw t;e.L_.add(1),await Ys(e),e.q_.set("Offline"),n||(n=()=>Pd(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{J("RemoteStore","Retrying IndexedDB access"),await n(),e.L_.delete(1),await Eo(e)}))}function Dd(e,t){return t().catch((n=>Yi(e,n,t)))}async function To(e){const t=ct(e),n=Kn(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;zE(t);)try{const s=await CE(t.localStore,r);if(s===null){t.O_.length===0&&n.o_();break}r=s.batchId,WE(t,s)}catch(s){await Yi(t,s)}Nd(t)&&Od(t)}function zE(e){return dr(e)&&e.O_.length<10}function WE(e,t){e.O_.push(t);const n=Kn(e);n.r_()&&n.V_&&n.m_(t.mutations)}function Nd(e){return dr(e)&&!Kn(e).n_()&&e.O_.length>0}function Od(e){Kn(e).start()}async function GE(e){Kn(e).p_()}async function QE(e){const t=Kn(e);for(const n of e.O_)t.m_(n.mutations)}async function XE(e,t,n){const r=e.O_.shift(),s=_l.from(r,t,n);await Dd(e,(()=>e.remoteSyncer.applySuccessfulWrite(s))),await To(e)}async function YE(e,t){t&&Kn(e).V_&&await(async function(r,s){if((function(a){return md(a)&&a!==F.ABORTED})(s.code)){const i=r.O_.shift();Kn(r).s_(),await Dd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await To(r)}})(e,t),Nd(e)&&Od(e)}async function th(e,t){const n=ct(e);n.asyncQueue.verifyOperationInProgress(),J("RemoteStore","RemoteStore received new credentials");const r=dr(n);n.L_.add(3),await Ys(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.L_.delete(3),await Eo(n)}async function JE(e,t){const n=ct(e);t?(n.L_.delete(2),await Eo(n)):t||(n.L_.add(2),await Ys(n),n.q_.set("Unknown"))}function Kr(e){return e.K_||(e.K_=(function(n,r,s){const i=ct(n);return i.w_(),new LE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:$E.bind(null,e),Ro:qE.bind(null,e),mo:KE.bind(null,e),d_:HE.bind(null,e)}),e.B_.push((async t=>{t?(e.K_.s_(),Sl(e)?Rl(e):e.q_.set("Unknown")):(await e.K_.stop(),xd(e))}))),e.K_}function Kn(e){return e.U_||(e.U_=(function(n,r,s){const i=ct(n);return i.w_(),new FE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:()=>Promise.resolve(),Ro:GE.bind(null,e),mo:YE.bind(null,e),f_:QE.bind(null,e),g_:XE.bind(null,e)}),e.B_.push((async t=>{t?(e.U_.s_(),await To(e)):(await e.U_.stop(),e.O_.length>0&&(J("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))}))),e.U_}/**
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
 */class Pl{constructor(t,n,r,s,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new vn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,n,r,s,i){const a=Date.now()+r,l=new Pl(t,n,a,s,i);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(F.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Cl(e,t){if(In("AsyncQueue",`${t}: ${e}`),Ws(e))return new Z(F.UNAVAILABLE,`${t}: ${e}`);throw e}/**
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
 */class Vr{constructor(t){this.comparator=t?(n,r)=>t(n,r)||et.comparator(n.key,r.key):(n,r)=>et.comparator(n.key,r.key),this.keyedMap=ds(),this.sortedSet=new jt(this.comparator)}static emptySet(t){return new Vr(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((n,r)=>(t(n),!1)))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof Vr)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((n=>{t.push(n.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const r=new Vr;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=n,r}}/**
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
 */class eh{constructor(){this.W_=new jt(et.comparator)}track(t){const n=t.doc.key,r=this.W_.get(n);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(n,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(n):t.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):at():this.W_=this.W_.insert(n,t)}G_(){const t=[];return this.W_.inorderTraversal(((n,r)=>{t.push(r)})),t}}class Br{constructor(t,n,r,s,i,a,l,c,d){this.query=t,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(t,n,r,s,i){const a=[];return n.forEach((l=>{a.push({type:0,doc:l})})),new Br(t,n,Vr.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&po(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,r=t.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class ZE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((t=>t.J_()))}}class tT{constructor(){this.queries=nh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=ct(n),i=s.queries;s.queries=nh(),i.forEach(((a,l)=>{for(const c of l.j_)c.onError(r)}))})(this,new Z(F.ABORTED,"Firestore shutting down"))}}function nh(){return new qr((e=>nd(e)),po)}async function eT(e,t){const n=ct(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.H_()&&t.J_()&&(r=2):(i=new ZE,r=t.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const l=Cl(a,`Initialization of query '${br(t.query)}' failed`);return void t.onError(l)}n.queries.set(s,i),i.j_.push(t),t.Z_(n.onlineState),i.z_&&t.X_(i.z_)&&Vl(n)}async function nT(e,t){const n=ct(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const a=i.j_.indexOf(t);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=t.J_()?0:1:!i.H_()&&t.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function rT(e,t){const n=ct(e);let r=!1;for(const s of t){const i=s.query,a=n.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&Vl(n)}function sT(e,t,n){const r=ct(e),s=r.queries.get(t);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(t)}function Vl(e){e.Y_.forEach((t=>{t.next()}))}var Oa,rh;(rh=Oa||(Oa={})).ea="default",rh.Cache="cache";class iT{constructor(t,n,r){this.query=t,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Br(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let n=!1;return this.na?this.ia(t)&&(this.ta.next(t),n=!0):this.sa(t,this.onlineState)&&(this.oa(t),n=!0),this.ra=t,n}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),n=!0),n}sa(t,n){if(!t.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||n==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(t){t=Br.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==Oa.Cache}}/**
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
 */class Md{constructor(t){this.key=t}}class Ld{constructor(t){this.key=t}}class oT{constructor(t,n){this.query=t,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=vt(),this.mutatedKeys=vt(),this.Aa=rd(t),this.Ra=new Vr(this.Aa)}get Va(){return this.Ta}ma(t,n){const r=n?n.fa:new eh,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((h,m)=>{const E=s.get(h),S=mo(this.query,m)?m:null,D=!!E&&this.mutatedKeys.has(E.key),O=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let N=!1;E&&S?E.data.isEqual(S.data)?D!==O&&(r.track({type:3,doc:S}),N=!0):this.ga(E,S)||(r.track({type:2,doc:S}),N=!0,(c&&this.Aa(S,c)>0||d&&this.Aa(S,d)<0)&&(l=!0)):!E&&S?(r.track({type:0,doc:S}),N=!0):E&&!S&&(r.track({type:1,doc:E}),N=!0,(c||d)&&(l=!0)),N&&(S?(a=a.add(S),i=O?i.add(h):i.delete(h)):(a=a.delete(h),i=i.delete(h)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const h=this.query.limitType==="F"?a.last():a.first();a=a.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,r,s){const i=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort(((h,m)=>(function(S,D){const O=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return at()}};return O(S)-O(D)})(h.type,m.type)||this.Aa(h.doc,m.doc))),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,d=c!==this.Ea;return this.Ea=c,a.length!==0||d?{snapshot:new Br(this.query,t.Ra,i,a,t.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new eh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach((n=>this.Ta=this.Ta.add(n))),t.modifiedDocuments.forEach((n=>{})),t.removedDocuments.forEach((n=>this.Ta=this.Ta.delete(n))),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=vt(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const n=[];return t.forEach((r=>{this.da.has(r)||n.push(new Ld(r))})),this.da.forEach((r=>{t.has(r)||n.push(new Md(r))})),n}ba(t){this.Ta=t.Ts,this.da=vt();const n=this.ma(t.documents);return this.applyChanges(n,!0)}Da(){return Br.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class aT{constructor(t,n,r){this.query=t,this.targetId=n,this.view=r}}class lT{constructor(t){this.key=t,this.va=!1}}class uT{constructor(t,n,r,s,i,a){this.localStore=t,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new qr((l=>nd(l)),po),this.Ma=new Map,this.xa=new Set,this.Oa=new jt(et.comparator),this.Na=new Map,this.La=new El,this.Ba={},this.ka=new Map,this.qa=Ur.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function cT(e,t,n=!0){const r=qd(e);let s;const i=r.Fa.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Fd(r,t,n,!0),s}async function hT(e,t){const n=qd(e);await Fd(n,t,!0,!1)}async function Fd(e,t,n,r){const s=await VE(e.localStore,rn(t)),i=s.targetId,a=e.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await fT(e,t,i,a==="current",s.resumeToken)),e.isPrimaryClient&&n&&Vd(e.remoteStore,s),l}async function fT(e,t,n,r,s){e.Ka=(m,E,S)=>(async function(O,N,Y,Q){let X=N.view.ma(Y);X.ns&&(X=await Yc(O.localStore,N.query,!1).then((({documents:I})=>N.view.ma(I,X))));const K=Q&&Q.targetChanges.get(N.targetId),_t=Q&&Q.targetMismatches.get(N.targetId)!=null,At=N.view.applyChanges(X,O.isPrimaryClient,K,_t);return ih(O,N.targetId,At.wa),At.snapshot})(e,m,E,S);const i=await Yc(e.localStore,t,!0),a=new oT(t,i.Ts),l=a.ma(i.documents),c=Xs.createSynthesizedTargetChangeForCurrentChange(n,r&&e.onlineState!=="Offline",s),d=a.applyChanges(l,e.isPrimaryClient,c);ih(e,n,d.wa);const h=new aT(t,n,a);return e.Fa.set(t,h),e.Ma.has(n)?e.Ma.get(n).push(t):e.Ma.set(n,[t]),d.snapshot}async function dT(e,t,n){const r=ct(e),s=r.Fa.get(t),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter((a=>!po(a,t)))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Na(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Il(r.remoteStore,s.targetId),Ma(r,s.targetId)})).catch(zs)):(Ma(r,s.targetId),await Na(r.localStore,s.targetId,!0))}async function pT(e,t){const n=ct(e),r=n.Fa.get(t),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Il(n.remoteStore,r.targetId))}async function mT(e,t,n){const r=wT(e);try{const s=await(function(a,l){const c=ct(a),d=Jt.now(),h=l.reduce(((S,D)=>S.add(D.key)),vt());let m,E;return c.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let D=An(),O=vt();return c.cs.getEntries(S,h).next((N=>{D=N,D.forEach(((Y,Q)=>{Q.isValidDocument()||(O=O.add(Y))}))})).next((()=>c.localDocuments.getOverlayedDocuments(S,D))).next((N=>{m=N;const Y=[];for(const Q of l){const X=Mv(Q,m.get(Q.key).overlayedDocument);X!=null&&Y.push(new Hn(Q.key,X,Qf(X.value.mapValue),Ve.exists(!0)))}return c.mutationQueue.addMutationBatch(S,d,Y,l)})).next((N=>{E=N;const Y=N.applyToLocalDocumentSet(m,O);return c.documentOverlayCache.saveOverlays(S,N.batchId,Y)}))})).then((()=>({batchId:E.batchId,changes:id(m)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,c){let d=a.Ba[a.currentUser.toKey()];d||(d=new jt(St)),d=d.insert(l,c),a.Ba[a.currentUser.toKey()]=d})(r,s.batchId,n),await Js(r,s.changes),await To(r.remoteStore)}catch(s){const i=Cl(s,"Failed to persist write");n.reject(i)}}async function Ud(e,t){const n=ct(e);try{const r=await SE(n.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=n.Na.get(i);a&&(It(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?It(a.va):s.removedDocuments.size>0&&(It(a.va),a.va=!1))})),await Js(n,r,t)}catch(r){await zs(r)}}function sh(e,t,n){const r=ct(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach(((i,a)=>{const l=a.view.Z_(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const c=ct(a);c.onlineState=l;let d=!1;c.queries.forEach(((h,m)=>{for(const E of m.j_)E.Z_(l)&&(d=!0)})),d&&Vl(c)})(r.eventManager,t),s.length&&r.Ca.d_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function gT(e,t,n){const r=ct(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Na.get(t),i=s&&s.key;if(i){let a=new jt(et.comparator);a=a.insert(i,ne.newNoDocument(i,ut.min()));const l=vt().add(i),c=new yo(ut.min(),new Map,new jt(St),a,l);await Ud(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(t),kl(r)}else await Na(r.localStore,t,!1).then((()=>Ma(r,t,n))).catch(zs)}async function _T(e,t){const n=ct(e),r=t.batch.batchId;try{const s=await RE(n.localStore,t);jd(n,r,null),Bd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Js(n,s)}catch(s){await zs(s)}}async function yT(e,t,n){const r=ct(e);try{const s=await(function(a,l){const c=ct(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let h;return c.mutationQueue.lookupMutationBatch(d,l).next((m=>(It(m!==null),h=m.keys(),c.mutationQueue.removeMutationBatch(d,m)))).next((()=>c.mutationQueue.performConsistencyCheck(d))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(d,h,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h))).next((()=>c.localDocuments.getDocuments(d,h)))}))})(r.localStore,t);jd(r,t,n),Bd(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Js(r,s)}catch(s){await zs(s)}}function Bd(e,t){(e.ka.get(t)||[]).forEach((n=>{n.resolve()})),e.ka.delete(t)}function jd(e,t,n){const r=ct(e);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(n?i.reject(n):i.resolve(),s=s.remove(t)),r.Ba[r.currentUser.toKey()]=s}}function Ma(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Ma.get(t))e.Fa.delete(r),n&&e.Ca.$a(r,n);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach((r=>{e.La.containsKey(r)||$d(e,r)}))}function $d(e,t){e.xa.delete(t.path.canonicalString());const n=e.Oa.get(t);n!==null&&(Il(e.remoteStore,n),e.Oa=e.Oa.remove(t),e.Na.delete(n),kl(e))}function ih(e,t,n){for(const r of n)r instanceof Md?(e.La.addReference(r.key,t),vT(e,r)):r instanceof Ld?(J("SyncEngine","Document no longer in limbo: "+r.key),e.La.removeReference(r.key,t),e.La.containsKey(r.key)||$d(e,r.key)):at()}function vT(e,t){const n=t.key,r=n.path.canonicalString();e.Oa.get(n)||e.xa.has(r)||(J("SyncEngine","New document in limbo: "+n),e.xa.add(r),kl(e))}function kl(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){const t=e.xa.values().next().value;e.xa.delete(t);const n=new et(Ft.fromString(t)),r=e.qa.next();e.Na.set(r,new lT(n)),e.Oa=e.Oa.insert(n,r),Vd(e.remoteStore,new Nn(rn(pl(n.path)),r,"TargetPurposeLimboResolution",ll.oe))}}async function Js(e,t,n){const r=ct(e),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach(((l,c)=>{a.push(r.Ka(c,t,n).then((d=>{var h;if((d||n)&&r.isPrimaryClient){const m=d?!d.fromCache:(h=n==null?void 0:n.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(d){s.push(d);const m=wl.Wi(c.targetId,d);i.push(m)}})))})),await Promise.all(a),r.Ca.d_(s),await(async function(c,d){const h=ct(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>$.forEach(d,(E=>$.forEach(E.$i,(S=>h.persistence.referenceDelegate.addReference(m,E.targetId,S))).next((()=>$.forEach(E.Ui,(S=>h.persistence.referenceDelegate.removeReference(m,E.targetId,S)))))))))}catch(m){if(!Ws(m))throw m;J("LocalStore","Failed to update sequence numbers: "+m)}for(const m of d){const E=m.targetId;if(!m.fromCache){const S=h.os.get(E),D=S.snapshotVersion,O=S.withLastLimboFreeSnapshotVersion(D);h.os=h.os.insert(E,O)}}})(r.localStore,i))}async function ET(e,t){const n=ct(e);if(!n.currentUser.isEqual(t)){J("SyncEngine","User change. New user:",t.toKey());const r=await Sd(n.localStore,t);n.currentUser=t,(function(i,a){i.ka.forEach((l=>{l.forEach((c=>{c.reject(new Z(F.CANCELLED,a))}))})),i.ka.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Js(n,r.hs)}}function TT(e,t){const n=ct(e),r=n.Na.get(t);if(r&&r.va)return vt().add(r.key);{let s=vt();const i=n.Ma.get(t);if(!i)return s;for(const a of i){const l=n.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function qd(e){const t=ct(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ud.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=TT.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=gT.bind(null,t),t.Ca.d_=rT.bind(null,t.eventManager),t.Ca.$a=sT.bind(null,t.eventManager),t}function wT(e){const t=ct(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=_T.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=yT.bind(null,t),t}class Ji{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=vo(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,n){return null}Ha(t,n){return null}za(t){return AE(this.persistence,new bE,t.initialUser,this.serializer)}Ga(t){return new EE(Tl.Zr,this.serializer)}Wa(t){return new xE}async terminate(){var t,n;(t=this.gcScheduler)===null||t===void 0||t.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ji.provider={build:()=>new Ji};class La{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ET.bind(null,this.syncEngine),await JE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new tT})()}createDatastore(t){const n=vo(t.databaseInfo.databaseId),r=(function(i){return new ME(i)})(t.databaseInfo);return(function(i,a,l,c){return new UE(i,a,l,c)})(t.authCredentials,t.appCheckCredentials,r,n)}createRemoteStore(t){return(function(r,s,i,a,l){return new jE(r,s,i,a,l)})(this.localStore,this.datastore,t.asyncQueue,(n=>sh(this.syncEngine,n,0)),(function(){return Zc.D()?new Zc:new DE})())}createSyncEngine(t,n){return(function(s,i,a,l,c,d,h){const m=new uT(s,i,a,l,c,d);return h&&(m.Qa=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}async terminate(){var t,n;await(async function(s){const i=ct(s);J("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Ys(i),i.k_.shutdown(),i.q_.set("Unknown")})(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}La.provider={build:()=>new La};/**
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
 */class bT{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):In("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,n){setTimeout((()=>{this.muted||t(n)}),0)}}/**
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
 */class IT{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new Z(F.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await(async function(s,i){const a=ct(s),l={documents:i.map((m=>Xi(a.serializer,m)))},c=await a.Lo("BatchGetDocuments",a.serializer.databaseId,Ft.emptyPath(),l,i.length),d=new Map;c.forEach((m=>{const E=Qv(a.serializer,m);d.set(E.key.toString(),E)}));const h=[];return i.forEach((m=>{const E=d.get(m.toString());It(!!E),h.push(E)})),h})(this.datastore,t);return n.forEach((r=>this.recordVersion(r))),n}set(t,n){this.write(n.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,n){try{this.write(n.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new gl(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((n=>{t.delete(n.key.toString())})),t.forEach(((n,r)=>{const s=et.fromPath(r);this.mutations.push(new pd(s,this.precondition(s)))})),await(async function(r,s){const i=ct(r),a={writes:s.map((l=>bd(i.serializer,l)))};await i.Mo("Commit",i.serializer.databaseId,Ft.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let n;if(t.isFoundDocument())n=t.version;else{if(!t.isNoDocument())throw at();n=ut.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!n.isEqual(r))throw new Z(F.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),n)}precondition(t){const n=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&n?n.isEqual(ut.min())?Ve.exists(!1):Ve.updateTime(n):Ve.none()}preconditionForUpdate(t){const n=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&n){if(n.isEqual(ut.min()))throw new Z(F.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ve.updateTime(n)}return Ve.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class AT{constructor(t,n,r,s,i){this.asyncQueue=t,this.datastore=n,this.options=r,this.updateFunction=s,this.deferred=i,this._u=r.maxAttempts,this.t_=new bl(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const t=new IT(this.datastore),n=this.cu(t);n&&n.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.lu(s)}))))})).catch((r=>{this.lu(r)}))}))}cu(t){try{const n=this.updateFunction(t);return!Gs(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(t){this._u>0&&this.hu(t)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(t)}hu(t){if(t.name==="FirebaseError"){const n=t.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!md(n)}return!1}}/**
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
 */class RT{constructor(t,n,r,s,i){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ve.UNAUTHENTICATED,this.clientId=zf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{J("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(J("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new vn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const r=Cl(n,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function ia(e,t){e.asyncQueue.verifyOperationInProgress(),J("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Sd(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function oh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await ST(e);J("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener((r=>th(t.remoteStore,r))),e.setAppCheckTokenChangeListener(((r,s)=>th(t.remoteStore,s))),e._onlineComponents=t}async function ST(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){J("FirestoreClient","Using user provided OfflineComponentProvider");try{await ia(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!(function(s){return s.name==="FirebaseError"?s.code===F.FAILED_PRECONDITION||s.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;Or("Error using user provided cache. Falling back to memory cache: "+n),await ia(e,new Ji)}}else J("FirestoreClient","Using default OfflineComponentProvider"),await ia(e,new Ji);return e._offlineComponents}async function xl(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(J("FirestoreClient","Using user provided OnlineComponentProvider"),await oh(e,e._uninitializedComponentsProvider._online)):(J("FirestoreClient","Using default OnlineComponentProvider"),await oh(e,new La))),e._onlineComponents}function PT(e){return xl(e).then((t=>t.syncEngine))}function CT(e){return xl(e).then((t=>t.datastore))}async function VT(e){const t=await xl(e),n=t.eventManager;return n.onListen=cT.bind(null,t.syncEngine),n.onUnlisten=dT.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=hT.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=pT.bind(null,t.syncEngine),n}function kT(e,t,n={}){const r=new vn;return e.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,c,d){const h=new bT({next:E=>{h.Za(),a.enqueueAndForget((()=>nT(i,m)));const S=E.docs.has(l);!S&&E.fromCache?d.reject(new Z(F.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&E.fromCache&&c&&c.source==="server"?d.reject(new Z(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),m=new iT(pl(l.path),h,{includeMetadataChanges:!0,_a:!0});return eT(i,m)})(await VT(e),e.asyncQueue,t,n,r))),r.promise}/**
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
 */function Hd(e,t,n){if(!n)throw new Z(F.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function xT(e,t,n,r){if(t===!0&&r===!0)throw new Z(F.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function lh(e){if(!et.isDocumentKey(e))throw new Z(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function uh(e){if(et.isDocumentKey(e))throw new Z(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Dl(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":at()}function $s(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Z(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Dl(e);throw new Z(F.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
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
 */class ch{constructor(t){var n,r;if(t.host===void 0){if(t.ssl!==void 0)throw new Z(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new Z(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}xT("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Kd((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Z(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Z(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Z(F.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class wo{constructor(t,n,r,s){this._authCredentials=t,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ch({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new Z(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ch(t),t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Ky;switch(r.type){case"firstParty":return new Gy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Z(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=ah.get(n);r&&(J("ComponentProvider","Removing Datastore"),ah.delete(n),r.terminate())})(this),Promise.resolve()}}function DT(e,t,n,r={}){var s;const i=(e=$s(e,wo))._getSettings(),a=`${t}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Or("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=ve.MOCK_USER;else{l=Pf(r.mockUserToken,(s=e._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new Z(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ve(d)}e._authCredentials=new Hy(new Hf(l,c))}}/**
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
 */class Nl{constructor(t,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Nl(this.firestore,t,this._query)}}class Me{constructor(t,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Fn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Me(this.firestore,t,this._key)}}class Fn extends Nl{constructor(t,n,r){super(t,n,pl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Me(this.firestore,null,new et(t))}withConverter(t){return new Fn(this.firestore,t,this._path)}}function NT(e,t,...n){if(e=Le(e),Hd("collection","path",t),e instanceof wo){const r=Ft.fromString(t,...n);return uh(r),new Fn(e,null,r)}{if(!(e instanceof Me||e instanceof Fn))throw new Z(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ft.fromString(t,...n));return uh(r),new Fn(e.firestore,null,r)}}function Fa(e,t,...n){if(e=Le(e),arguments.length===1&&(t=zf.newId()),Hd("doc","path",t),e instanceof wo){const r=Ft.fromString(t,...n);return lh(r),new Me(e,null,new et(r))}{if(!(e instanceof Me||e instanceof Fn))throw new Z(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ft.fromString(t,...n));return lh(r),new Me(e.firestore,e instanceof Fn?e.converter:null,new et(r))}}/**
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
 */class hh{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new bl(this,"async_queue_retry"),this.Vu=()=>{const r=sa();r&&J("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const n=sa();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const n=sa();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise((()=>{}));const n=new vn;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(t().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Pu.push(t),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!Ws(t))throw t;J("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(t){const n=this.mu.then((()=>(this.du=!0,t().catch((r=>{this.Eu=r,this.du=!1;const s=(function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l})(r);throw In("INTERNAL UNHANDLED ERROR: ",s),r})).then((r=>(this.du=!1,r))))));return this.mu=n,n}enqueueAfterDelay(t,n,r){this.fu(),this.Ru.indexOf(t)>-1&&(n=0);const s=Pl.createAndSchedule(this,t,n,r,(i=>this.yu(i)));return this.Tu.push(s),s}fu(){this.Eu&&at()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const n of this.Tu)if(n.timerId===t)return!0;return!1}bu(t){return this.wu().then((()=>{this.Tu.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.Tu)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.wu()}))}Du(t){this.Ru.push(t)}yu(t){const n=this.Tu.indexOf(t);this.Tu.splice(n,1)}}class bo extends wo{constructor(t,n,r,s){super(t,n,r,s),this.type="firestore",this._queue=new hh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new hh(t),this._firestoreClient=void 0,await t}}}function OT(e,t){const n=typeof e=="object"?e:Mf(),r=typeof e=="string"?e:"(default)",s=Df(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Rf("firestore");i&&DT(s,...i)}return s}function Ol(e){if(e._terminated)throw new Z(F.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||MT(e),e._firestoreClient}function MT(e){var t,n,r;const s=e._freezeSettings(),i=(function(l,c,d,h){return new av(l,c,d,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Kd(h.experimentalLongPollingOptions),h.useFetchStreams)})(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,s);e._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new RT(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&(function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}})(e._componentsProvider))}/**
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
 */class lr{constructor(t){this._byteString=t}static fromBase64String(t){try{return new lr(fe.fromBase64String(t))}catch(n){throw new Z(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new lr(fe.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class Io{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new Z(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ue(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Ml{constructor(t){this._methodName=t}}/**
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
 */class Ll{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new Z(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new Z(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return St(this._lat,t._lat)||St(this._long,t._long)}}/**
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
 */class Fl{constructor(t){this._values=(t||[]).map((n=>n))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}}/**
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
 */const LT=/^__.*__$/;class FT{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return this.fieldMask!==null?new Hn(t,this.data,this.fieldMask,n,this.fieldTransforms):new Qs(t,this.data,n,this.fieldTransforms)}}class zd{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return new Hn(t,this.data,this.fieldMask,n,this.fieldTransforms)}}function Wd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw at()}}class Ul{constructor(t,n,r,s,i,a){this.settings=t,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Ul(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.Ou(t),s}Nu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Zi(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find((n=>t.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>t.isPrefixOf(n.field)))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Wd(this.Cu)&&LT.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class UT{constructor(t,n,r){this.databaseId=t,this.ignoreUndefinedProperties=n,this.serializer=r||vo(t)}Qu(t,n,r,s=!1){return new Ul({Cu:t,methodName:n,qu:r,path:ue.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Gd(e){const t=e._freezeSettings(),n=vo(e._databaseId);return new UT(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Qd(e,t,n,r,s,i={}){const a=e.Qu(i.merge||i.mergeFields?2:0,t,n,s);Bl("Data must be an object, but it was:",a,r);const l=Xd(r,a);let c,d;if(i.merge)c=new De(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const h=[];for(const m of i.mergeFields){const E=Ua(t,m,n);if(!a.contains(E))throw new Z(F.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);Jd(h,E)||h.push(E)}c=new De(h),d=a.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,d=a.fieldTransforms;return new FT(new Pe(l),c,d)}class Ao extends Ml{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Ao}}function BT(e,t,n,r){const s=e.Qu(1,t,n);Bl("Data must be an object, but it was:",s,r);const i=[],a=Pe.empty();fr(r,((c,d)=>{const h=jl(t,c,n);d=Le(d);const m=s.Nu(h);if(d instanceof Ao)i.push(h);else{const E=Ro(d,m);E!=null&&(i.push(h),a.set(h,E))}}));const l=new De(i);return new zd(a,l,s.fieldTransforms)}function jT(e,t,n,r,s,i){const a=e.Qu(1,t,n),l=[Ua(t,r,n)],c=[s];if(i.length%2!=0)throw new Z(F.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)l.push(Ua(t,i[E])),c.push(i[E+1]);const d=[],h=Pe.empty();for(let E=l.length-1;E>=0;--E)if(!Jd(d,l[E])){const S=l[E];let D=c[E];D=Le(D);const O=a.Nu(S);if(D instanceof Ao)d.push(S);else{const N=Ro(D,O);N!=null&&(d.push(S),h.set(S,N))}}const m=new De(d);return new zd(h,m,a.fieldTransforms)}function Ro(e,t){if(Yd(e=Le(e)))return Bl("Unsupported field value:",t,e),Xd(e,t);if(e instanceof Ml)return(function(r,s){if(!Wd(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let c=Ro(l,s.Lu(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(e,t)}return(function(r,s){if((r=Le(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Vv(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Jt.fromDate(r);return{timestampValue:Qi(s.serializer,i)}}if(r instanceof Jt){const i=new Jt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Qi(s.serializer,i)}}if(r instanceof Ll)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof lr)return{bytesValue:vd(s.serializer,r._byteString)};if(r instanceof Me){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:vl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Fl)return(function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map((c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return ml(l.serializer,c)}))}}}}}})(r,s);throw s.Bu(`Unsupported field value: ${Dl(r)}`)})(e,t)}function Xd(e,t){const n={};return Wf(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fr(e,((r,s)=>{const i=Ro(s,t.Mu(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function Yd(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof Jt||e instanceof Ll||e instanceof lr||e instanceof Me||e instanceof Ml||e instanceof Fl)}function Bl(e,t,n){if(!Yd(n)||!(function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)})(n)){const r=Dl(n);throw r==="an object"?t.Bu(e+" a custom object"):t.Bu(e+" "+r)}}function Ua(e,t,n){if((t=Le(t))instanceof Io)return t._internalPath;if(typeof t=="string")return jl(e,t);throw Zi("Field path arguments must be of type string or ",e,!1,void 0,n)}const $T=new RegExp("[~\\*/\\[\\]]");function jl(e,t,n){if(t.search($T)>=0)throw Zi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Io(...t.split("."))._internalPath}catch{throw Zi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Zi(e,t,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new Z(F.INVALID_ARGUMENT,l+e+c)}function Jd(e,t){return e.some((n=>n.isEqual(t)))}/**
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
 */class to{constructor(t,n,r,s,i){this._firestore=t,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new qT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(Zd("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class qT extends to{data(){return super.data()}}function Zd(e,t){return typeof t=="string"?jl(e,t):t instanceof Io?t._internalPath:t._delegate._internalPath}class tp{convertValue(t,n="none"){switch(ar(t)){case 0:return null;case 1:return t.booleanValue;case 2:return zt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes(or(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 11:return this.convertObject(t.mapValue,n);case 10:return this.convertVectorValue(t.mapValue);default:throw at()}}convertObject(t,n){return this.convertObjectMap(t.fields,n)}convertObjectMap(t,n="none"){const r={};return fr(t,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(t){var n,r,s;const i=(s=(r=(n=t.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((a=>zt(a.doubleValue)));return new Fl(i)}convertGeoPoint(t){return new Ll(zt(t.latitude),zt(t.longitude))}convertArray(t,n){return(t.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(t,n){switch(n){case"previous":const r=cl(t);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ls(t));default:return null}}convertTimestamp(t){const n=qn(t);return new Jt(n.seconds,n.nanos)}convertDocumentKey(t,n){const r=Ft.fromString(t);It(Rd(r));const s=new Fs(r.get(1),r.get(3)),i=new et(r.popFirst(5));return s.isEqual(n)||In(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function ep(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class KT extends tp{constructor(t){super(),this.firestore=t}convertBytes(t){return new lr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new Me(this.firestore,null,n)}}/**
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
 */class np{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class $l extends to{constructor(t,n,r,s,i,a){super(t,n,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new HT(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const r=this._document.data.field(Zd("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class HT extends $l{data(t={}){return super.data(t)}}/**
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
 */function zT(e){e=$s(e,Me);const t=$s(e.firestore,bo);return kT(Ol(t),e._key).then((n=>QT(t,e,n)))}class rp extends tp{constructor(t){super(),this.firestore=t}convertBytes(t){return new lr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new Me(this.firestore,null,n)}}function WT(e,t){const n=$s(e.firestore,bo),r=Fa(e),s=ep(e.converter,t);return GT(n,[Qd(Gd(e.firestore),"addDoc",r._key,s,e.converter!==null,{}).toMutation(r._key,Ve.exists(!1))]).then((()=>r))}function GT(e,t){return(function(r,s){const i=new vn;return r.asyncQueue.enqueueAndForget((async()=>mT(await PT(r),s,i))),i.promise})(Ol(e),t)}function QT(e,t,n){const r=n.docs.get(t._key),s=new rp(e);return new $l(e,s,t._key,r,new np(n.hasPendingWrites,n.fromCache),t.converter)}/**
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
 */const XT={maxAttempts:5};function as(e,t){if((e=Le(e)).firestore!==t)throw new Z(F.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
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
 */class YT extends class{constructor(n,r){this._firestore=n,this._transaction=r,this._dataReader=Gd(n)}get(n){const r=as(n,this._firestore),s=new KT(this._firestore);return this._transaction.lookup([r._key]).then((i=>{if(!i||i.length!==1)return at();const a=i[0];if(a.isFoundDocument())return new to(this._firestore,s,a.key,a,r.converter);if(a.isNoDocument())return new to(this._firestore,s,r._key,null,r.converter);throw at()}))}set(n,r,s){const i=as(n,this._firestore),a=ep(i.converter,r,s),l=Qd(this._dataReader,"Transaction.set",i._key,a,i.converter!==null,s);return this._transaction.set(i._key,l),this}update(n,r,s,...i){const a=as(n,this._firestore);let l;return l=typeof(r=Le(r))=="string"||r instanceof Io?jT(this._dataReader,"Transaction.update",a._key,r,s,i):BT(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,l),this}delete(n){const r=as(n,this._firestore);return this._transaction.delete(r._key),this}}{constructor(t,n){super(t,n),this._firestore=t}get(t){const n=as(t,this._firestore),r=new rp(this._firestore);return super.get(t).then((s=>new $l(this._firestore,r,n._key,s._document,new np(!1,!1),n.converter)))}}function JT(e,t,n){e=$s(e,bo);const r=Object.assign(Object.assign({},XT),n);return(function(i){if(i.maxAttempts<1)throw new Z(F.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,a,l){const c=new vn;return i.asyncQueue.enqueueAndForget((async()=>{const d=await CT(i);new AT(i.asyncQueue,d,l,a,c).au()})),c.promise})(Ol(e),(s=>t(new YT(e,s))),r)}(function(t,n=!0){(function(s){$r=s})(Nf),Ns(new Nr("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new bo(new zy(r.getProvider("auth-internal")),new Xy(r.getProvider("app-check-internal")),(function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new Z(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fs(d.options.projectId,h)})(a,s),a);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),Ln(Vc,"4.7.3",t),Ln(Vc,"4.7.3","esm2017")})();/**
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
 */class Ht extends hr{constructor(t,n,r=0){super(oa(t),`Firebase Storage: ${n} (${oa(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ht.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return oa(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Kt;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Kt||(Kt={}));function oa(e){return"storage/"+e}function ql(){const e="An unknown error occurred, please check the error payload for server response.";return new Ht(Kt.UNKNOWN,e)}function ew(e){return new Ht(Kt.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function nw(e){return new Ht(Kt.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function rw(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ht(Kt.UNAUTHENTICATED,e)}function sw(){return new Ht(Kt.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function iw(e){return new Ht(Kt.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function ow(){return new Ht(Kt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function aw(){return new Ht(Kt.CANCELED,"User canceled the upload/download.")}function lw(e){return new Ht(Kt.INVALID_URL,"Invalid URL '"+e+"'.")}function uw(e){return new Ht(Kt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function cw(){return new Ht(Kt.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ip+"' property when initializing the app?")}function hw(){return new Ht(Kt.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function fw(){return new Ht(Kt.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function dw(e){return new Ht(Kt.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ba(e){return new Ht(Kt.INVALID_ARGUMENT,e)}function op(){return new Ht(Kt.APP_DELETED,"The Firebase app was deleted.")}function pw(e){return new Ht(Kt.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ss(e,t){return new Ht(Kt.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function ls(e){throw new Ht(Kt.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class Ne{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=Ne.makeFromUrl(t,n)}catch{return new Ne(t,"")}if(r.path==="")return r;throw uw(t)}static makeFromUrl(t,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(K){K.path.charAt(K.path.length-1)==="/"&&(K.path_=K.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+s+a,"i"),c={bucket:1,path:3};function d(K){K.path_=decodeURIComponent(K.path)}const h="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),E="(/([^?#]*).*)?$",S=new RegExp(`^https?://${m}/${h}/b/${s}/o${E}`,"i"),D={bucket:1,path:3},O=n===sp?"(?:storage.googleapis.com|storage.cloud.google.com)":n,N="([^?#]*)",Y=new RegExp(`^https?://${O}/${s}/${N}`,"i"),X=[{regex:l,indices:c,postModify:i},{regex:S,indices:D,postModify:d},{regex:Y,indices:{bucket:1,path:2},postModify:d}];for(let K=0;K<X.length;K++){const _t=X[K],At=_t.regex.exec(t);if(At){const I=At[_t.indices.bucket];let g=At[_t.indices.path];g||(g=""),r=new Ne(I,g),_t.postModify(r);break}}if(r==null)throw lw(t);return r}}class mw{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function gw(e,t,n){let r=1,s=null,i=null,a=!1,l=0;function c(){return l===2}let d=!1;function h(...N){d||(d=!0,t.apply(null,N))}function m(N){s=setTimeout(()=>{s=null,e(S,c())},N)}function E(){i&&clearTimeout(i)}function S(N,...Y){if(d){E();return}if(N){E(),h.call(null,N,...Y);return}if(c()||a){E(),h.call(null,N,...Y);return}r<64&&(r*=2);let X;l===1?(l=2,X=0):X=(r+Math.random())*1e3,m(X)}let D=!1;function O(N){D||(D=!0,E(),!d&&(s!==null?(N||(l=2),clearTimeout(s),m(0)):N||(l=1)))}return m(0),i=setTimeout(()=>{a=!0,O(!0)},n),O}function _w(e){e(!1)}/**
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
 */function yw(e){return e!==void 0}function vw(e){return typeof e=="object"&&!Array.isArray(e)}function Kl(e){return typeof e=="string"||e instanceof String}function fh(e){return Hl()&&e instanceof Blob}function Hl(){return typeof Blob<"u"}function dh(e,t,n,r){if(r<t)throw Ba(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Ba(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function zl(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function ap(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const s=t(r)+"="+t(e[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var sr;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(sr||(sr={}));/**
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
 */class Tw{constructor(t,n,r,s,i,a,l,c,d,h,m,E=!0){this.url_=t,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=c,this.timeout_=d,this.progressCallback_=h,this.connectionFactory_=m,this.retry=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((S,D)=>{this.resolve_=S,this.reject_=D,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new bi(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=l=>{const c=l.loaded,d=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const l=i.getErrorCode()===sr.NO_ERROR,c=i.getStatus();if(!l||Ew(c,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===sr.ABORT;r(!1,new bi(!1,null,h));return}const d=this.successCodes_.indexOf(c)!==-1;r(!0,new bi(d,i))})},n=(r,s)=>{const i=this.resolve_,a=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());yw(c)?i(c):i()}catch(c){a(c)}else if(l!==null){const c=ql();c.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,c)):a(c)}else if(s.canceled){const c=this.appDelete_?op():aw();a(c)}else{const c=ow();a(c)}};this.canceled_?n(!1,new bi(!1,null,!0)):this.backoffId_=gw(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&_w(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class bi{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function ww(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function bw(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Iw(e,t){t&&(e["X-Firebase-GMPID"]=t)}function Aw(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Rw(e,t,n,r,s,i,a=!0){const l=ap(e.urlParams),c=e.url+l,d=Object.assign({},e.headers);return Iw(d,t),ww(d,n),bw(d,i),Aw(d,r),new Tw(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,a)}/**
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
 */function Sw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Pw(...e){const t=Sw();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(Hl())return new Blob(e);throw new Ht(Kt.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Cw(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */const en={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class aa{constructor(t,n){this.data=t,this.contentType=n||null}}function kw(e,t){switch(e){case en.RAW:return new aa(lp(t));case en.BASE64:case en.BASE64URL:return new aa(up(e,t));case en.DATA_URL:return new aa(Dw(t),Nw(t))}throw ql()}function lp(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const i=r,a=e.charCodeAt(++n);r=65536|(i&1023)<<10|a&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function xw(e){let t;try{t=decodeURIComponent(e)}catch{throw Ss(en.DATA_URL,"Malformed data URL.")}return lp(t)}function up(e,t){switch(e){case en.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw Ss(e,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case en.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw Ss(e,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Vw(t)}catch(s){throw s.message.includes("polyfill")?s:Ss(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class cp{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw Ss(en.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Ow(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Dw(e){const t=new cp(e);return t.base64?up(en.BASE64,t.rest):xw(t.rest)}function Nw(e){return new cp(e).contentType}function Ow(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
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
 */class Dn{constructor(t,n){let r=0,s="";fh(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,n){if(fh(this.data_)){const r=this.data_,s=Cw(r,t,n);return s===null?null:new Dn(s)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new Dn(r,!0)}}static getBlob(...t){if(Hl()){const n=t.map(r=>r instanceof Dn?r.data_:r);return new Dn(Pw.apply(null,n))}else{const n=t.map(a=>Kl(a)?kw(en.RAW,a).data:a.data_);let r=0;n.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(a=>{for(let l=0;l<a.length;l++)s[i++]=a[l]}),new Dn(s,!0)}}uploadData(){return this.data_}}/**
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
 */function Fw(e,t){return t}class be{constructor(t,n,r,s){this.server=t,this.local=n||t,this.writable=!!r,this.xform=s||Fw}}let Ii=null;function Uw(e){return!Kl(e)||e.length<2?e:fp(e)}function dp(){if(Ii)return Ii;const e=[];e.push(new be("bucket")),e.push(new be("generation")),e.push(new be("metageneration")),e.push(new be("name","fullPath",!0));function t(i,a){return Uw(a)}const n=new be("name");n.xform=t,e.push(n);function r(i,a){return a!==void 0?Number(a):a}const s=new be("size");return s.xform=r,e.push(s),e.push(new be("timeCreated")),e.push(new be("updated")),e.push(new be("md5Hash",null,!0)),e.push(new be("cacheControl",null,!0)),e.push(new be("contentDisposition",null,!0)),e.push(new be("contentEncoding",null,!0)),e.push(new be("contentLanguage",null,!0)),e.push(new be("contentType",null,!0)),e.push(new be("metadata","customMetadata",!0)),Ii=e,Ii}function Bw(e,t){function n(){const r=e.bucket,s=e.fullPath,i=new Ne(r,s);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function jw(e,t,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const a=n[i];r[a.local]=a.xform(r,t[a.server])}return Bw(r,e),r}function pp(e,t,n){const r=hp(t);return r===null?null:jw(e,r,n)}function $w(e,t,n,r){const s=hp(t);if(s===null||!Kl(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const h=e.bucket,m=e.fullPath,E="/b/"+a(h)+"/o/"+a(m),S=zl(E,n,r),D=ap({alt:"media",token:d});return S+D})[0]}function qw(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(n[i.server]=e[i.local])}return JSON.stringify(n)}class mp{constructor(t,n,r,s){this.url=t,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function gp(e){if(!e)throw ql()}function Kw(e,t){function n(r,s){const i=pp(e,s,t);return gp(i!==null),i}return n}function Hw(e,t){function n(r,s){const i=pp(e,s,t);return gp(i!==null),$w(i,s,e.host,e._protocol)}return n}function _p(e){function t(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=sw():s=rw():n.getStatus()===402?s=nw(e.bucket):n.getStatus()===403?s=iw(e.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return t}function zw(e){const t=_p(e);function n(r,s){let i=t(r,s);return r.getStatus()===404&&(i=ew(e.path)),i.serverResponse=s.serverResponse,i}return n}function Ww(e,t,n){const r=t.fullServerUrl(),s=zl(r,e.host,e._protocol),i="GET",a=e.maxOperationRetryTime,l=new mp(s,i,Hw(e,n),a);return l.errorHandler=zw(t),l}function Gw(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Qw(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=Gw(null,t)),r}function Xw(e,t,n,r,s){const i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function l(){let X="";for(let K=0;K<2;K++)X=X+Math.random().toString().slice(2);return X}const c=l();a["Content-Type"]="multipart/related; boundary="+c;const d=Qw(t,r,s),h=qw(d,n),m="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+d.contentType+`\r
\r
`,E=`\r
--`+c+"--",S=Dn.getBlob(m,r,E);if(S===null)throw hw();const D={name:d.fullPath},O=zl(i,e.host,e._protocol),N="POST",Y=e.maxUploadRetryTime,Q=new mp(O,N,Kw(e,n),Y);return Q.urlParams=D,Q.headers=a,Q.body=S.uploadData(),Q.errorHandler=_p(t),Q}class Yw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=sr.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=sr.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=sr.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,s){if(this.sent_)throw ls("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ls("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ls("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ls("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ls("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Jw extends Yw{initXhr(){this.xhr_.responseType="text"}}function yp(){return new Jw}/**
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
 */class ur{constructor(t,n){this._service=t,n instanceof Ne?this._location=n:this._location=Ne.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new ur(t,n)}get root(){const t=new Ne(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return fp(this._location.path)}get storage(){return this._service}get parent(){const t=Mw(this._location.path);if(t===null)return null;const n=new Ne(this._location.bucket,t);return new ur(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw pw(t)}}function Zw(e,t,n){e._throwIfRoot("uploadBytes");const r=Xw(e.storage,e._location,dp(),new Dn(t,!0),n);return e.storage.makeRequestWithTokens(r,yp).then(s=>({metadata:s,ref:e}))}function tb(e){e._throwIfRoot("getDownloadURL");const t=Ww(e.storage,e._location,dp());return e.storage.makeRequestWithTokens(t,yp).then(n=>{if(n===null)throw fw();return n})}function eb(e,t){const n=Lw(e._location.path,t),r=new Ne(e._location.bucket,n);return new ur(e.storage,r)}/**
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
 */function nb(e){return/^[A-Za-z]+:\/\//.test(e)}function rb(e,t){return new ur(e,t)}function vp(e,t){if(e instanceof Wl){const n=e;if(n._bucket==null)throw cw();const r=new ur(n,n._bucket);return t!=null?vp(r,t):r}else return t!==void 0?eb(e,t):e}function sb(e,t){if(t&&nb(t)){if(e instanceof Wl)return rb(e,t);throw Ba("To use ref(service, url), the first argument must be a Storage instance.")}else return vp(e,t)}function ph(e,t){const n=t==null?void 0:t[ip];return n==null?null:Ne.makeFromBucketSpec(n,e)}function ib(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken=typeof s=="string"?s:Pf(s,e.app.options.projectId))}class Wl{constructor(t,n,r,s,i){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=sp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=ZT,this._maxUploadRetryTime=tw,this._requests=new Set,s!=null?this._bucket=Ne.makeFromBucketSpec(s,this._host):this._bucket=ph(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Ne.makeFromBucketSpec(this._url,t):this._bucket=ph(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){dh("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){dh("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new ur(this,t)}_makeRequest(t,n,r,s,i=!0){if(this._deleted)return new mw(op());{const a=Rw(t,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,s).getPromise()}}const mh="@firebase/storage",gh="0.13.2";/**
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
 */const Ep="storage";function ob(e,t,n){return e=Le(e),Zw(e,t,n)}function ab(e){return e=Le(e),tb(e)}function lb(e,t){return e=Le(e),sb(e,t)}function ub(e=Mf(),t){e=Le(e);const r=Df(e,Ep).getImmediate({identifier:t}),s=Rf("storage");return s&&cb(r,...s),r}function cb(e,t,n,r={}){ib(e,t,n,r)}function hb(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new Wl(n,r,s,t,Nf)}function fb(){Ns(new Nr(Ep,hb,"PUBLIC").setMultipleInstances(!0)),Ln(mh,gh,""),Ln(mh,gh,"esm2017")}fb();const db={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},Tp=Of(db),Ai=OT(Tp),pb=ub(Tp),mb={class:"p-4 md:p-6 min-h-screen"},gb={class:"max-w-3xl mx-auto space-y-4"},_b={class:"bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md text-center"},yb={class:"text-sm text-slate-600 mt-3"},vb={key:0,class:"bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center"},Eb={class:"text-3xl font-black text-teal-600 my-3 tracking-wider"},Tb={key:0,label:"Qiraati (Pondok)"},wb=["value"],bb={key:1,label:"Sekolah Formal"},Ib=["value"],Ab={class:"space-y-2 p-3 bg-amber-50 rounded-lg border border-amber-200"},Rb={class:"flex items-center gap-2 text-sm font-bold cursor-pointer"},Sb={class:"flex items-center gap-2 text-sm font-bold cursor-pointer"},Pb={key:0,class:"ml-6 mt-2 space-y-1.5"},Cb={class:"flex items-center gap-2 text-sm cursor-pointer"},Vb={class:"flex items-center gap-2 text-sm cursor-pointer"},kb={key:1,class:"ml-6 mt-2"},xb={key:0,class:"flex flex-wrap gap-2 mt-2"},Db=["href"],Nb=["href"],Ob={key:1,class:"mt-2 border border-slate-300 rounded-lg overflow-hidden bg-slate-100"},Mb=["src"],Lb=["src"],Fb={key:2,class:"mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-slate-700 whitespace-pre-line"},Ub={key:3,class:"mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-700 whitespace-pre-line max-h-40 overflow-y-auto"},Bb=["type","required","placeholder","value","onInput"],jb=["required","placeholder","value","onInput"],$b=["required","value","onChange"],qb=["value"],Kb={key:3,class:"flex items-center gap-2 text-sm pt-1.5"},Hb=["checked","onChange"],zb=["accept","onChange"],Wb=["placeholder","value","onInput"],Gb={key:6,class:"text-[10px] text-slate-500 mt-0.5"},Qb={class:"flex gap-3 items-center pt-1.5"},Xb={class:"flex items-center gap-1 text-sm"},Yb={class:"flex items-center gap-1 text-sm"},Jb={key:0,class:"text-[11px] text-emerald-600 mt-1"},Zb={key:0,class:"text-[11px] text-emerald-600 mt-1"},tI={class:"bg-white rounded-2xl p-4 shadow-sm"},eI={class:"flex items-start gap-2 cursor-pointer"},nI={class:"text-xs text-slate-700"},rI={class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},sI=["disabled"],iI={key:0,class:"fas fa-spinner fa-spin mr-2"},oI={key:1,class:"fas fa-paper-plane mr-2"},aI={key:0,class:"text-xs text-rose-600 mt-2 text-center"},lI={__name:"PsbFormView",setup(e){const t=Ku({props:["title","icon"],setup(L,{slots:T}){return()=>{var R;return Er("div",{class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},[Er("h3",{class:"text-xs font-black text-teal-700 uppercase tracking-wide mb-3"},[Er("i",{class:(L.icon||"")+" mr-1"})," "+L.title]),Er("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3"},(R=T.default)==null?void 0:R.call(T))])}}}),n=Ku({props:["label","full"],setup(L,{slots:T}){return()=>{var R;return Er("div",{class:L.full?"md:col-span-2":""},[Er("label",{class:"block text-xs font-bold text-slate-500 mb-1 uppercase"},L.label),(R=T.default)==null?void 0:R.call(T)])}}}),r=Qe(!1),s=Qe(!1),i=Qe(""),a=Qe(""),l=Qe([]),c=cs(()=>{const L=new Date,T=L.getFullYear();return L.getMonth()+1>=7?`${T}/${T+1}`:`${T-1}/${T}`}),d=()=>({nama:"",nama_panggilan:"",jk:"",nik:"",no_kk:"",tempat_lahir:"",tgl_lahir:"",alamat_jalan:"",alamat_desa:"",alamat_kecamatan:"",alamat_kabupaten:"",alamat_provinsi:"",lembaga_tujuan:"",is_mukim:null,is_fullday:null,catatan_riwayat_pribadi:"",ayah:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},ibu:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},yang_mendaftarkan:"",wa_wali:"",acf:{}}),h=Qe(d()),m=Qe({akta:null,kk:null}),E=Qe(!1),S=Qe({}),D=Qe(null);function O(L){D.value=D.value===L?null:L}const N=cs(()=>lembagaSelected.value?Array.isArray(lembagaSelected.value.psb_fields)?lembagaSelected.value.psb_fields:[]:[]);async function Y(L,T){var st;const R=(st=T.target.files)==null?void 0:st[0];if(R){if(R.size>5*1024*1024){i.value=`File ${L} terlalu besar (max 5MB)`,T.target.value="";return}S.value[L]=await A(R),i.value=""}}const Q=["TPQ Pagi","TPQ Sore","Pra PTPT","PTPT","PPPH","P3H"],X=["TK","TK A","TK B","SDI","PKBM"],K=["Yayasan","Sarana Prasarana","Ma'had","Mahad"];function _t(L){const T=String(L||"").trim();return Q.some(R=>R.toLowerCase()===T.toLowerCase())||/qiraati|tpq|^pra ptpt$|^p3h$|^ptpt$|^ppph$/i.test(T)}function At(L){const T=String(L||"").trim();return X.some(R=>R.toLowerCase()===T.toLowerCase())||/^(tk|sdi|pkbm)/i.test(T)}function I(L){const T=String(L||"").trim().toLowerCase();return K.some(R=>R.toLowerCase()===T)}const g=cs(()=>l.value.filter(L=>_t(L.nama)&&!I(L.nama)).map(L=>L.nama)),v=cs(()=>l.value.filter(L=>At(L.nama)&&!I(L.nama)&&!_t(L.nama)).map(L=>L.nama));function w(L){return(L/1024).toFixed(0)}async function A(L,T=1600,R=.8){return!L||!L.type.startsWith("image/")?L:new Promise(st=>{const Ct=new FileReader;Ct.onload=mt=>{const Zt=new Image;Zt.onload=()=>{const de=Math.min(1,T/Zt.width),te=Math.round(Zt.width*de),un=Math.round(Zt.height*de),cn=document.createElement("canvas");cn.width=te,cn.height=un,cn.getContext("2d").drawImage(Zt,0,0,te,un),cn.toBlob(Sn=>{if(!Sn)return st(L);const _=new File([Sn],L.name.replace(/\.(png|webp|gif)$/i,".jpg"),{type:"image/jpeg"});st(_)},"image/jpeg",R)},Zt.onerror=()=>st(L),Zt.src=mt.target.result},Ct.onerror=()=>st(L),Ct.readAsDataURL(L)})}async function C(L){var R;const T=(R=L.target.files)==null?void 0:R[0];if(T){if(T.size>5*1024*1024){i.value="Akta terlalu besar (max 5MB)",L.target.value="";return}m.value.akta=await A(T),i.value=""}}async function y(L){var R;const T=(R=L.target.files)==null?void 0:R[0];if(T){if(T.size>5*1024*1024){i.value="KK terlalu besar (max 5MB)",L.target.value="";return}m.value.kk=await A(T),i.value=""}}async function re(L,T){if(!L)return"";const R=lb(pb,T);return await ob(R,L),await ab(R)}async function Ge(L){const T=Fa(Ai,"settings","psb_counter");return await JT(Ai,async R=>{const st=await R.get(T),Ct=st.exists()?st.data()||{}:{},mt=L.replace("/","_"),de=Number(Ct[mt]||0)+1;Ct[mt]=de,st.exists()?R.update(T,Ct):R.set(T,Ct);const te=String(de).padStart(3,"0");return`PSB-${L.replace("/","-")}-${te}`})}async function Xt(){if(i.value="",!h.value.nama||!h.value.jk||!h.value.tempat_lahir||!h.value.tgl_lahir){i.value="Lengkapi identitas santri";return}if(!h.value.lembaga_tujuan){i.value="Pilih lembaga tujuan";return}if(!h.value.yang_mendaftarkan||!h.value.wa_wali){i.value="Lengkapi data yang mendaftarkan";return}if(!E.value){i.value="Harap setujui syarat & ketentuan terlebih dahulu";return}for(const L of N.value)if(L.required&&(h.value.acf[L.id]===void 0||h.value.acf[L.id]===""||h.value.acf[L.id]===null)){i.value=`Field "${L.label}" wajib diisi`;return}s.value=!0;try{const L=c.value,T=await Ge(L),R=`psb/${L.replace("/","-")}/${T}`,st=m.value.akta?await re(m.value.akta,`${R}/akta_${m.value.akta.name}`):"",Ct=m.value.kk?await re(m.value.kk,`${R}/kk_${m.value.kk.name}`):"",mt={};for(const[de,te]of Object.entries(S.value))if(te)try{mt[de]=await re(te,`${R}/acf_${de}_${te.name}`)}catch{}const Zt={no_pendaftaran:T,tahun_ajaran:L,tanggal_daftar:new Date().toISOString(),tgl_daftar:new Date().toISOString().slice(0,10),lembaga_tujuan:h.value.lembaga_tujuan,nama:h.value.nama,nama_panggilan:h.value.nama_panggilan,jk:h.value.jk,nik:h.value.nik,no_kk:h.value.no_kk,tempat_lahir:h.value.tempat_lahir,tgl_lahir:h.value.tgl_lahir,alamat_jalan:h.value.alamat_jalan,alamat_desa:h.value.alamat_desa,alamat_kecamatan:h.value.alamat_kecamatan,alamat_kabupaten:h.value.alamat_kabupaten,alamat_provinsi:h.value.alamat_provinsi,ayah:{...h.value.ayah},ibu:{...h.value.ibu},yang_mendaftarkan:h.value.yang_mendaftarkan,nama_wali:h.value.yang_mendaftarkan,wa_wali:h.value.wa_wali,dokumen:{akta_url:st,kk_url:Ct},acf:{...h.value.acf,...mt},setujui_syarat:!0,status:"pending",audit:{created_at:new Date().toISOString(),source:"public_psb_site"}};await WT(NT(Ai,"psb_pendaftaran"),Zt),a.value=T,r.value=!0}catch(L){i.value="Gagal submit: "+(L.message||L)}finally{s.value=!1}}function Pt(){h.value=d(),m.value={akta:null,kk:null},E.value=!1,S.value={},r.value=!1,a.value="",i.value="",window.scrollTo({top:0,behavior:"smooth"})}async function Et(){var L;try{const T=await zT(Fa(Ai,"master","lembaga"));if(T.exists()){const R=((L=T.data())==null?void 0:L.list)||[],st=["yayasan","pondok","kantor","admin","non-lembaga","non_lembaga","non lembaga","divisi","unit"],Ct=/^(yayasan|pondok pesantren|pondok|kantor|admin|sarana|sarana\s*&\s*prasarana|sarana prasarana|prasarana)\b/i;l.value=R.map(mt=>typeof mt=="string"?{nama:mt,tipe:""}:{nama:(mt==null?void 0:mt.lembaga)||(mt==null?void 0:mt.nama)||"",tipe:String((mt==null?void 0:mt.tipe)||(mt==null?void 0:mt.tipe_lembaga)||"").toLowerCase().trim(),info_pembayaran_url:(mt==null?void 0:mt.info_pembayaran_url)||"",syarat_ketentuan_url:(mt==null?void 0:mt.syarat_ketentuan_url)||"",info_pembayaran_teks:(mt==null?void 0:mt.info_pembayaran_teks)||"",syarat_ketentuan_teks:(mt==null?void 0:mt.syarat_ketentuan_teks)||""})}}catch(T){console.warn("[PsbFormView] loadLembaga fail:",T)}}return Jh(Et),(L,T)=>(gt(),Tt("div",mb,[x("div",gb,[x("div",_b,[T[39]||(T[39]=x("img",{src:g_,alt:"Logo MU",class:"w-20 h-20 mx-auto mb-3"},null,-1)),T[40]||(T[40]=x("h1",{class:"text-xl md:text-2xl font-black text-slate-800"},"PSB Pondok Pesantren Mambaul Ulum",-1)),T[41]||(T[41]=x("p",{class:"text-xs text-teal-700 font-bold uppercase tracking-widest mt-1"},"Generasi Qurani Pewaris Negeri",-1)),x("p",yb,[T[38]||(T[38]=Gt("Formulir Penerimaan Santri Baru — Tahun Ajaran ",-1)),x("b",null,oe(c.value),1)])]),r.value?(gt(),Tt("div",vb,[T[43]||(T[43]=x("i",{class:"fas fa-check-circle text-emerald-500 text-6xl mb-3"},null,-1)),T[44]||(T[44]=x("h2",{class:"text-lg font-black text-emerald-700"},"Pendaftaran Berhasil!",-1)),T[45]||(T[45]=x("p",{class:"text-sm text-slate-600 mt-2"},"No. Pendaftaran Anda:",-1)),x("p",Eb,oe(a.value),1),T[46]||(T[46]=x("p",{class:"text-xs text-slate-500"},"Simpan nomor di atas. Admin akan menghubungi via WhatsApp.",-1)),x("button",{onClick:Pt,class:"mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"},[...T[42]||(T[42]=[x("i",{class:"fas fa-plus mr-1"},null,-1),Gt("Daftarkan Lagi ",-1)])])])):(gt(),Tt("form",{key:1,onSubmit:c_(Xt,["prevent"]),class:"space-y-4"},[rt(ft(t),{title:"Lembaga Tujuan",icon:"fas fa-school"},{default:dt(()=>[rt(ft(n),{label:"Lembaga Tujuan *",full:""},{default:dt(()=>[yt(x("select",{"onUpdate:modelValue":T[0]||(T[0]=R=>h.value.lembaga_tujuan=R),required:"",class:"input"},[T[47]||(T[47]=x("option",{value:""},"-- Pilih Lembaga --",-1)),g.value.length?(gt(),Tt("optgroup",Tb,[(gt(!0),Tt(Re,null,yi(g.value,R=>(gt(),Tt("option",{key:R,value:R},oe(R),9,wb))),128))])):_e("",!0),v.value.length?(gt(),Tt("optgroup",bb,[(gt(!0),Tt(Re,null,yi(v.value,R=>(gt(),Tt("option",{key:R,value:R},oe(R),9,Ib))),128))])):_e("",!0)],512),[[Jo,h.value.lembaga_tujuan]])]),_:1}),rt(ft(n),{label:"Status Santri *",full:""},{default:dt(()=>[x("div",Ab,[x("label",Rb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[1]||(T[1]=R=>h.value.is_mukim=R),value:!0,name:"mukim"},null,512),[[Tr,h.value.is_mukim]]),T[48]||(T[48]=x("span",null,"Mukim (Ma had / Asrama)",-1))]),x("label",Sb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[2]||(T[2]=R=>h.value.is_mukim=R),value:!1,name:"mukim"},null,512),[[Tr,h.value.is_mukim]]),T[49]||(T[49]=x("span",null,"Non-Mukim",-1))]),h.value.is_mukim===!1?(gt(),Tt("div",Pb,[T[52]||(T[52]=x("p",{class:"text-[10px] font-bold uppercase text-slate-700"},"Tipe Non-Mukim:",-1)),x("label",Cb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[3]||(T[3]=R=>h.value.is_fullday=R),value:!0,name:"fullday"},null,512),[[Tr,h.value.is_fullday]]),T[50]||(T[50]=x("span",null,"Fullday (termasuk makan siang)",-1))]),x("label",Vb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[4]||(T[4]=R=>h.value.is_fullday=R),value:!1,name:"fullday"},null,512),[[Tr,h.value.is_fullday]]),T[51]||(T[51]=x("span",null,"Tidak Fullday",-1))])])):_e("",!0),h.value.is_mukim===!0?(gt(),Tt("div",kb,[T[53]||(T[53]=x("label",{class:"block text-[10px] font-bold uppercase text-slate-700 mb-1"},"Catatan Riwayat Pribadi",-1)),yt(x("textarea",{"onUpdate:modelValue":T[5]||(T[5]=R=>h.value.catatan_riwayat_pribadi=R),rows:"2",class:"input text-xs",placeholder:"Riwayat penyakit, alergi, kondisi khusus"},null,512),[[Mt,h.value.catatan_riwayat_pribadi]])])):_e("",!0)])]),_:1}),rt(ft(n),{label:"Info Pembayaran",full:""},{default:dt(()=>[L.lembagaSelected&&(L.lembagaSelected.info_pembayaran_url||L.lembagaSelected.syarat_ketentuan_url)?(gt(),Tt("div",xb,[L.lembagaSelected.info_pembayaran_url?(gt(),Tt(Re,{key:0},[x("button",{type:"button",onClick:T[6]||(T[6]=R=>O("info")),class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"},[T[54]||(T[54]=x("i",{class:"fas fa-file-invoice-dollar"},null,-1)),T[55]||(T[55]=Gt(" Info Pembayaran ",-1)),x("i",{class:Ps(["fas",D.value==="info"?"fa-chevron-up":"fa-chevron-down","text-[10px]"])},null,2)]),x("a",{href:L.lembagaSelected.info_pembayaran_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-lg bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50",title:"Buka di tab baru"},[...T[56]||(T[56]=[x("i",{class:"fas fa-external-link-alt"},null,-1)])],8,Db)],64)):_e("",!0),L.lembagaSelected.syarat_ketentuan_url?(gt(),Tt(Re,{key:1},[x("button",{type:"button",onClick:T[7]||(T[7]=R=>O("syarat")),class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300"},[T[57]||(T[57]=x("i",{class:"fas fa-file-contract"},null,-1)),T[58]||(T[58]=Gt(" Syarat & Ketentuan ",-1)),x("i",{class:Ps(["fas",D.value==="syarat"?"fa-chevron-up":"fa-chevron-down","text-[10px]"])},null,2)]),x("a",{href:L.lembagaSelected.syarat_ketentuan_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-lg bg-white text-blue-700 border border-blue-300 hover:bg-blue-50",title:"Buka di tab baru"},[...T[59]||(T[59]=[x("i",{class:"fas fa-external-link-alt"},null,-1)])],8,Nb)],64)):_e("",!0)])):_e("",!0),D.value&&L.lembagaSelected?(gt(),Tt("div",Ob,[D.value==="info"&&L.lembagaSelected.info_pembayaran_url?(gt(),Tt("iframe",{key:0,src:L.lembagaSelected.info_pembayaran_url+"#view=FitH",class:"w-full h-[480px] border-0",title:"Info Pembayaran PDF"},null,8,Mb)):D.value==="syarat"&&L.lembagaSelected.syarat_ketentuan_url?(gt(),Tt("iframe",{key:1,src:L.lembagaSelected.syarat_ketentuan_url+"#view=FitH",class:"w-full h-[480px] border-0",title:"Syarat & Ketentuan PDF"},null,8,Lb)):_e("",!0),T[60]||(T[60]=x("div",{class:"text-[10px] text-center text-slate-500 py-1 bg-slate-50 border-t border-slate-200"},[x("i",{class:"fas fa-info-circle mr-1"}),Gt("Jika PDF tidak tampil, klik tombol "),x("i",{class:"fas fa-external-link-alt"}),Gt(" untuk buka di tab baru. ")],-1))])):_e("",!0),L.lembagaSelected&&L.lembagaSelected.info_pembayaran_teks?(gt(),Tt("div",Fb,[T[61]||(T[61]=x("p",{class:"font-bold text-emerald-800 mb-1"},[x("i",{class:"fas fa-info-circle mr-1"}),Gt("Info Pembayaran:")],-1)),Gt(" "+oe(L.lembagaSelected.info_pembayaran_teks),1)])):_e("",!0),L.lembagaSelected&&L.lembagaSelected.syarat_ketentuan_teks?(gt(),Tt("div",Ub,[T[62]||(T[62]=x("p",{class:"font-bold text-blue-800 mb-1"},[x("i",{class:"fas fa-file-contract mr-1"}),Gt("Syarat & Ketentuan:")],-1)),Gt(" "+oe(L.lembagaSelected.syarat_ketentuan_teks),1)])):_e("",!0)]),_:1})]),_:1}),L.lembagaSelected&&N.value.length?(gt(),Ui(ft(t),{key:0,title:"Data Tambahan",icon:"fas fa-list-check"},{default:dt(()=>[(gt(!0),Tt(Re,null,yi(N.value,R=>(gt(),Ui(ft(n),{key:R.id,label:R.label+(R.required?" *":""),full:R.full},{default:dt(()=>[R.type==="text"||R.type==="number"||R.type==="tel"||R.type==="email"||R.type==="date"?(gt(),Tt("input",{key:0,type:R.type,required:!!R.required,placeholder:R.placeholder||"",value:h.value.acf[R.id]||"",onInput:st=>h.value.acf[R.id]=st.target.value,class:"input"},null,40,Bb)):R.type==="textarea"?(gt(),Tt("textarea",{key:1,required:!!R.required,placeholder:R.placeholder||"",value:h.value.acf[R.id]||"",onInput:st=>h.value.acf[R.id]=st.target.value,rows:"3",class:"input resize-none"},null,40,jb)):R.type==="dropdown"||R.type==="select"?(gt(),Tt("select",{key:2,required:!!R.required,value:h.value.acf[R.id]||"",onChange:st=>h.value.acf[R.id]=st.target.value,class:"input"},[T[63]||(T[63]=x("option",{value:""},"-- Pilih --",-1)),(gt(!0),Tt(Re,null,yi(R.options||[],st=>(gt(),Tt("option",{key:st,value:st},oe(st),9,qb))),128))],40,$b)):R.type==="checkbox"?(gt(),Tt("label",Kb,[x("input",{type:"checkbox",checked:!!h.value.acf[R.id],onChange:st=>h.value.acf[R.id]=st.target.checked},null,40,Hb),x("span",null,oe(R.placeholder||R.label),1)])):R.type==="file"?(gt(),Tt("input",{key:4,type:"file",accept:R.accept||"image/*,application/pdf",onChange:st=>Y(R.id,st),class:"input"},null,40,zb)):(gt(),Tt("input",{key:5,type:"text",placeholder:R.placeholder||"",value:h.value.acf[R.id]||"",onInput:st=>h.value.acf[R.id]=st.target.value,class:"input"},null,40,Wb)),R.help?(gt(),Tt("p",Gb,oe(R.help),1)):_e("",!0)]),_:2},1032,["label","full"]))),128))]),_:1})):_e("",!0),rt(ft(t),{title:"I. Identitas Santri",icon:"fas fa-user-graduate"},{default:dt(()=>[rt(ft(n),{label:"Nama Lengkap *",full:""},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[8]||(T[8]=R=>h.value.nama=R),type:"text",required:"",placeholder:"Sesuai akta lahir",class:"input"},null,512),[[Mt,h.value.nama]])]),_:1}),rt(ft(n),{label:"Nama Panggilan"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[9]||(T[9]=R=>h.value.nama_panggilan=R),type:"text",class:"input"},null,512),[[Mt,h.value.nama_panggilan]])]),_:1}),rt(ft(n),{label:"Jenis Kelamin *"},{default:dt(()=>[x("div",Qb,[x("label",Xb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[10]||(T[10]=R=>h.value.jk=R),value:"L",required:""},null,512),[[Tr,h.value.jk]]),T[64]||(T[64]=Gt(" Laki-laki",-1))]),x("label",Yb,[yt(x("input",{type:"radio","onUpdate:modelValue":T[11]||(T[11]=R=>h.value.jk=R),value:"P"},null,512),[[Tr,h.value.jk]]),T[65]||(T[65]=Gt(" Perempuan",-1))])])]),_:1}),rt(ft(n),{label:"NIK (16 digit)"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[12]||(T[12]=R=>h.value.nik=R),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[Mt,h.value.nik]])]),_:1}),rt(ft(n),{label:"No. KK (16 digit)"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[13]||(T[13]=R=>h.value.no_kk=R),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[Mt,h.value.no_kk]])]),_:1}),rt(ft(n),{label:"Tempat Lahir *"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[14]||(T[14]=R=>h.value.tempat_lahir=R),type:"text",required:"",class:"input"},null,512),[[Mt,h.value.tempat_lahir]])]),_:1}),rt(ft(n),{label:"Tanggal Lahir *"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[15]||(T[15]=R=>h.value.tgl_lahir=R),type:"date",required:"",class:"input"},null,512),[[Mt,h.value.tgl_lahir]])]),_:1}),rt(ft(n),{label:"Jalan / Dusun",full:""},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[16]||(T[16]=R=>h.value.alamat_jalan=R),type:"text",class:"input",placeholder:"Jalan / Dusun / RT-RW"},null,512),[[Mt,h.value.alamat_jalan]])]),_:1}),rt(ft(n),{label:"Desa / Kelurahan"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[17]||(T[17]=R=>h.value.alamat_desa=R),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_desa]])]),_:1}),rt(ft(n),{label:"Kecamatan"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[18]||(T[18]=R=>h.value.alamat_kecamatan=R),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_kecamatan]])]),_:1}),rt(ft(n),{label:"Kabupaten / Kota"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[19]||(T[19]=R=>h.value.alamat_kabupaten=R),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_kabupaten]])]),_:1}),rt(ft(n),{label:"Provinsi"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[20]||(T[20]=R=>h.value.alamat_provinsi=R),type:"text",class:"input"},null,512),[[Mt,h.value.alamat_provinsi]])]),_:1})]),_:1}),rt(ft(t),{title:"II. Identitas Ayah",icon:"fas fa-male"},{default:dt(()=>[rt(ft(n),{label:"Nama Ayah"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[21]||(T[21]=R=>h.value.ayah.nama=R),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.nama]])]),_:1}),rt(ft(n),{label:"NIK"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[22]||(T[22]=R=>h.value.ayah.nik=R),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[Mt,h.value.ayah.nik]])]),_:1}),rt(ft(n),{label:"Tempat Lahir"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[23]||(T[23]=R=>h.value.ayah.tempat_lahir=R),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.tempat_lahir]])]),_:1}),rt(ft(n),{label:"Tanggal Lahir"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[24]||(T[24]=R=>h.value.ayah.tgl_lahir=R),type:"date",class:"input"},null,512),[[Mt,h.value.ayah.tgl_lahir]])]),_:1}),rt(ft(n),{label:"Pendidikan"},{default:dt(()=>[yt(x("select",{"onUpdate:modelValue":T[25]||(T[25]=R=>h.value.ayah.pendidikan=R),class:"input"},[...T[66]||(T[66]=[x("option",{value:""},"-- Pilih --",-1),x("option",null,"Tidak Sekolah",-1),x("option",null,"SD/Sederajat",-1),x("option",null,"SMP/Sederajat",-1),x("option",null,"SMA/Sederajat",-1),x("option",null,"D1/D2/D3",-1),x("option",null,"S1",-1),x("option",null,"S2",-1),x("option",null,"S3",-1)])],512),[[Jo,h.value.ayah.pendidikan]])]),_:1}),rt(ft(n),{label:"Pekerjaan"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[26]||(T[26]=R=>h.value.ayah.pekerjaan=R),type:"text",class:"input"},null,512),[[Mt,h.value.ayah.pekerjaan]])]),_:1}),rt(ft(n),{label:"Telp / HP"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[27]||(T[27]=R=>h.value.ayah.telp=R),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.ayah.telp]])]),_:1})]),_:1}),rt(ft(t),{title:"III. Identitas Ibu",icon:"fas fa-female"},{default:dt(()=>[rt(ft(n),{label:"Nama Ibu"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[28]||(T[28]=R=>h.value.ibu.nama=R),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.nama]])]),_:1}),rt(ft(n),{label:"NIK"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[29]||(T[29]=R=>h.value.ibu.nik=R),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[Mt,h.value.ibu.nik]])]),_:1}),rt(ft(n),{label:"Tempat Lahir"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[30]||(T[30]=R=>h.value.ibu.tempat_lahir=R),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.tempat_lahir]])]),_:1}),rt(ft(n),{label:"Tanggal Lahir"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[31]||(T[31]=R=>h.value.ibu.tgl_lahir=R),type:"date",class:"input"},null,512),[[Mt,h.value.ibu.tgl_lahir]])]),_:1}),rt(ft(n),{label:"Pendidikan"},{default:dt(()=>[yt(x("select",{"onUpdate:modelValue":T[32]||(T[32]=R=>h.value.ibu.pendidikan=R),class:"input"},[...T[67]||(T[67]=[x("option",{value:""},"-- Pilih --",-1),x("option",null,"Tidak Sekolah",-1),x("option",null,"SD/Sederajat",-1),x("option",null,"SMP/Sederajat",-1),x("option",null,"SMA/Sederajat",-1),x("option",null,"D1/D2/D3",-1),x("option",null,"S1",-1),x("option",null,"S2",-1),x("option",null,"S3",-1)])],512),[[Jo,h.value.ibu.pendidikan]])]),_:1}),rt(ft(n),{label:"Pekerjaan"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[33]||(T[33]=R=>h.value.ibu.pekerjaan=R),type:"text",class:"input"},null,512),[[Mt,h.value.ibu.pekerjaan]])]),_:1}),rt(ft(n),{label:"Telp / HP"},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[34]||(T[34]=R=>h.value.ibu.telp=R),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.ibu.telp]])]),_:1})]),_:1}),rt(ft(t),{title:"Upload Dokumen",icon:"fas fa-file-image"},{default:dt(()=>[rt(ft(n),{label:"Akta Kelahiran (image/PDF, max 5MB)",full:""},{default:dt(()=>[x("input",{type:"file",accept:"image/*,application/pdf",onChange:C,class:"input"},null,32),m.value.akta?(gt(),Tt("p",Jb,[T[68]||(T[68]=x("i",{class:"fas fa-check mr-1"},null,-1)),Gt(oe(m.value.akta.name)+" ("+oe(w(m.value.akta.size))+" KB)",1)])):_e("",!0)]),_:1}),rt(ft(n),{label:"Kartu Keluarga (image/PDF, max 5MB)",full:""},{default:dt(()=>[x("input",{type:"file",accept:"image/*,application/pdf",onChange:y,class:"input"},null,32),m.value.kk?(gt(),Tt("p",Zb,[T[69]||(T[69]=x("i",{class:"fas fa-check mr-1"},null,-1)),Gt(oe(m.value.kk.name)+" ("+oe(w(m.value.kk.size))+" KB)",1)])):_e("",!0)]),_:1})]),_:1}),rt(ft(t),{title:"Yang Mendaftarkan",icon:"fas fa-pen-to-square"},{default:dt(()=>[rt(ft(n),{label:"Nama Yang Mendaftarkan *",full:""},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[35]||(T[35]=R=>h.value.yang_mendaftarkan=R),type:"text",required:"",class:"input",placeholder:"Misal: Ayah / Ibu / Wali"},null,512),[[Mt,h.value.yang_mendaftarkan]])]),_:1}),rt(ft(n),{label:"WhatsApp *",full:""},{default:dt(()=>[yt(x("input",{"onUpdate:modelValue":T[36]||(T[36]=R=>h.value.wa_wali=R),type:"tel",required:"",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[Mt,h.value.wa_wali]])]),_:1})]),_:1}),x("div",tI,[x("label",eI,[yt(x("input",{type:"checkbox","onUpdate:modelValue":T[37]||(T[37]=R=>E.value=R),required:"",class:"mt-1"},null,512),[[a_,E.value]]),x("span",nI,[T[70]||(T[70]=Gt(" Saya menyetujui ",-1)),T[71]||(T[71]=x("b",null,"Syarat & Ketentuan",-1)),T[72]||(T[72]=Gt(" serta ",-1)),T[73]||(T[73]=x("b",null,"Info Pembayaran",-1)),Gt(" yang berlaku di lembaga "+oe(h.value.lembaga_tujuan||"tujuan")+", dan menyatakan data yang diisi adalah benar. ",1)])])]),x("div",rI,[x("button",{type:"submit",disabled:s.value||!E.value,class:"w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-black text-base rounded-xl transition shadow-md"},[s.value?(gt(),Tt("i",iI)):(gt(),Tt("i",oI)),Gt(" "+oe(s.value?"Memproses…":"DAFTARKAN"),1)],8,sI),i.value?(gt(),Tt("p",aI,[T[74]||(T[74]=x("i",{class:"fas fa-exclamation-triangle mr-1"},null,-1)),Gt(oe(i.value),1)])):_e("",!0)])],32)),T[75]||(T[75]=x("p",{class:"text-center text-[10px] text-slate-400 pt-2"}," © 2026 Pondok Pesantren Mambaul Ulum · Public PSB Site v1.0 ",-1))])]))}},uI={__name:"App",setup(e){return(t,n)=>(gt(),Ui(lI))}};d_(uI).mount("#app");
