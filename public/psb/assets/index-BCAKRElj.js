(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function La(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const St={},Er=[],Qe=()=>{},ph=()=>!1,Qi=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Xi=e=>e.startsWith("onUpdate:"),re=Object.assign,Fa=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},$p=Object.prototype.hasOwnProperty,At=(e,t)=>$p.call(e,t),it=Array.isArray,Tr=e=>Fs(e)==="[object Map]",Yi=e=>Fs(e)==="[object Set]",Ou=e=>Fs(e)==="[object Date]",lt=e=>typeof e=="function",Lt=e=>typeof e=="string",Ye=e=>typeof e=="symbol",bt=e=>e!==null&&typeof e=="object",mh=e=>(bt(e)||lt(e))&&lt(e.then)&&lt(e.catch),gh=Object.prototype.toString,Fs=e=>gh.call(e),qp=e=>Fs(e).slice(8,-1),_h=e=>Fs(e)==="[object Object]",Ua=e=>Lt(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,cs=La(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ji=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Kp=/-\w/g,Fe=Ji(e=>e.replace(Kp,t=>t.slice(1).toUpperCase())),Hp=/\B([A-Z])/g,ir=Ji(e=>e.replace(Hp,"-$1").toLowerCase()),yh=Ji(e=>e.charAt(0).toUpperCase()+e.slice(1)),Lo=Ji(e=>e?`on${yh(e)}`:""),We=(e,t)=>!Object.is(e,t),Ti=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},vh=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},Zi=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Mu;const to=()=>Mu||(Mu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ba(e){if(it(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=Lt(r)?Qp(r):Ba(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(Lt(e)||bt(e))return e}const zp=/;(?![^(]*\))/g,Wp=/:([^]+)/,Gp=/\/\*[^]*?\*\//g;function Qp(e){const t={};return e.replace(Gp,"").split(zp).forEach(n=>{if(n){const r=n.split(Wp);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function ja(e){let t="";if(Lt(e))t=e;else if(it(e))for(let n=0;n<e.length;n++){const r=ja(e[n]);r&&(t+=r+" ")}else if(bt(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Xp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Yp=La(Xp);function Eh(e){return!!e||e===""}function Jp(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Zn(e[r],t[r]);return n}function Zn(e,t){if(e===t)return!0;let n=Ou(e),r=Ou(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=Ye(e),r=Ye(t),n||r)return e===t;if(n=it(e),r=it(t),n||r)return n&&r?Jp(e,t):!1;if(n=bt(e),r=bt(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const a in e){const l=e.hasOwnProperty(a),c=t.hasOwnProperty(a);if(l&&!c||!l&&c||!Zn(e[a],t[a]))return!1}}return String(e)===String(t)}function Zp(e,t){return e.findIndex(n=>Zn(n,t))}const Th=e=>!!(e&&e.__v_isRef===!0),Oe=e=>Lt(e)?e:e==null?"":it(e)||bt(e)&&(e.toString===gh||!lt(e.toString))?Th(e)?Oe(e.value):JSON.stringify(e,wh,2):String(e),wh=(e,t)=>Th(t)?wh(e,t.value):Tr(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[Fo(r,i)+" =>"]=s,n),{})}:Yi(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Fo(n))}:Ye(t)?Fo(t):bt(t)&&!it(t)&&!_h(t)?String(t):t,Fo=(e,t="")=>{var n;return Ye(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Zt;class tm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Zt&&(Zt.active?(this.parent=Zt,this.index=(Zt.scopes||(Zt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Zt;try{return Zt=this,t()}finally{Zt=n}}}on(){++this._on===1&&(this.prevScope=Zt,Zt=this)}off(){if(this._on>0&&--this._on===0){if(Zt===this)Zt=this.prevScope;else{let t=Zt;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function em(){return Zt}let Pt;const Uo=new WeakSet;class Ih{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Zt&&(Zt.active?Zt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Uo.has(this)&&(Uo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||bh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Lu(this),Rh(this);const t=Pt,n=Ue;Pt=this,Ue=!0;try{return this.fn()}finally{Sh(this),Pt=t,Ue=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ka(t);this.deps=this.depsTail=void 0,Lu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Uo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){sa(this)&&this.run()}get dirty(){return sa(this)}}let Ah=0,hs,fs;function bh(e,t=!1){if(e.flags|=8,t){e.next=fs,fs=e;return}e.next=hs,hs=e}function $a(){Ah++}function qa(){if(--Ah>0)return;if(fs){let t=fs;for(fs=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;hs;){let t=hs;for(hs=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Rh(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Sh(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Ka(r),nm(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function sa(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ph(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Ph(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Is)||(e.globalVersion=Is,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!sa(e))))return;e.flags|=2;const t=e.dep,n=Pt,r=Ue;Pt=e,Ue=!0;try{Rh(e);const s=e.fn(e._value);(t.version===0||We(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{Pt=n,Ue=r,Sh(e),e.flags&=-3}}function Ka(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ka(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function nm(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ue=!0;const Ch=[];function fn(){Ch.push(Ue),Ue=!1}function dn(){const e=Ch.pop();Ue=e===void 0?!0:e}function Lu(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Pt;Pt=void 0;try{t()}finally{Pt=n}}}let Is=0;class rm{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ha{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Pt||!Ue||Pt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Pt)n=this.activeLink=new rm(Pt,this),Pt.deps?(n.prevDep=Pt.depsTail,Pt.depsTail.nextDep=n,Pt.depsTail=n):Pt.deps=Pt.depsTail=n,Vh(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Pt.depsTail,n.nextDep=void 0,Pt.depsTail.nextDep=n,Pt.depsTail=n,Pt.deps===n&&(Pt.deps=r)}return n}trigger(t){this.version++,Is++,this.notify(t)}notify(t){$a();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{qa()}}}function Vh(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Vh(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const ia=new WeakMap,Qn=Symbol(""),oa=Symbol(""),As=Symbol("");function ce(e,t,n){if(Ue&&Pt){let r=ia.get(e);r||ia.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new Ha),s.map=r,s.key=n),s.track()}}function ln(e,t,n,r,s,i){const a=ia.get(e);if(!a){Is++;return}const l=c=>{c&&c.trigger()};if($a(),t==="clear")a.forEach(l);else{const c=it(e),d=c&&Ua(n);if(c&&n==="length"){const h=Number(r);a.forEach((y,T)=>{(T==="length"||T===As||!Ye(T)&&T>=h)&&l(y)})}else switch((n!==void 0||a.has(void 0))&&l(a.get(n)),d&&l(a.get(As)),t){case"add":c?d&&l(a.get("length")):(l(a.get(Qn)),Tr(e)&&l(a.get(oa)));break;case"delete":c||(l(a.get(Qn)),Tr(e)&&l(a.get(oa)));break;case"set":Tr(e)&&l(a.get(Qn));break}}qa()}function pr(e){const t=It(e);return t===e?t:(ce(t,"iterate",As),De(e)?t:t.map(Be))}function eo(e){return ce(e=It(e),"iterate",As),e}function He(e,t){return pn(e)?br(Xn(e)?Be(t):t):Be(t)}const sm={__proto__:null,[Symbol.iterator](){return Bo(this,Symbol.iterator,e=>He(this,e))},concat(...e){return pr(this).concat(...e.map(t=>it(t)?pr(t):t))},entries(){return Bo(this,"entries",e=>(e[1]=He(this,e[1]),e))},every(e,t){return sn(this,"every",e,t,void 0,arguments)},filter(e,t){return sn(this,"filter",e,t,n=>n.map(r=>He(this,r)),arguments)},find(e,t){return sn(this,"find",e,t,n=>He(this,n),arguments)},findIndex(e,t){return sn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return sn(this,"findLast",e,t,n=>He(this,n),arguments)},findLastIndex(e,t){return sn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return sn(this,"forEach",e,t,void 0,arguments)},includes(...e){return jo(this,"includes",e)},indexOf(...e){return jo(this,"indexOf",e)},join(e){return pr(this).join(e)},lastIndexOf(...e){return jo(this,"lastIndexOf",e)},map(e,t){return sn(this,"map",e,t,void 0,arguments)},pop(){return Zr(this,"pop")},push(...e){return Zr(this,"push",e)},reduce(e,...t){return Fu(this,"reduce",e,t)},reduceRight(e,...t){return Fu(this,"reduceRight",e,t)},shift(){return Zr(this,"shift")},some(e,t){return sn(this,"some",e,t,void 0,arguments)},splice(...e){return Zr(this,"splice",e)},toReversed(){return pr(this).toReversed()},toSorted(e){return pr(this).toSorted(e)},toSpliced(...e){return pr(this).toSpliced(...e)},unshift(...e){return Zr(this,"unshift",e)},values(){return Bo(this,"values",e=>He(this,e))}};function Bo(e,t,n){const r=eo(e),s=r[t]();return r!==e&&!De(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const im=Array.prototype;function sn(e,t,n,r,s,i){const a=eo(e),l=a!==e&&!De(e),c=a[t];if(c!==im[t]){const y=c.apply(e,i);return l?Be(y):y}let d=n;a!==e&&(l?d=function(y,T){return n.call(this,He(e,y),T,e)}:n.length>2&&(d=function(y,T){return n.call(this,y,T,e)}));const h=c.call(a,d,r);return l&&s?s(h):h}function Fu(e,t,n,r){const s=eo(e),i=s!==e&&!De(e);let a=n,l=!1;s!==e&&(i?(l=r.length===0,a=function(d,h,y){return l&&(l=!1,d=He(e,d)),n.call(this,d,He(e,h),y,e)}):n.length>3&&(a=function(d,h,y){return n.call(this,d,h,y,e)}));const c=s[t](a,...r);return l?He(e,c):c}function jo(e,t,n){const r=It(e);ce(r,"iterate",As);const s=r[t](...n);return(s===-1||s===!1)&&Qa(n[0])?(n[0]=It(n[0]),r[t](...n)):s}function Zr(e,t,n=[]){fn(),$a();const r=It(e)[t].apply(e,n);return qa(),dn(),r}const om=La("__proto__,__v_isRef,__isVue"),xh=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ye));function am(e){Ye(e)||(e=String(e));const t=It(this);return ce(t,"has",e),t.hasOwnProperty(e)}class Dh{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?_m:Mh:i?Oh:Nh).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const a=it(t);if(!s){let c;if(a&&(c=sm[n]))return c;if(n==="hasOwnProperty")return am}const l=Reflect.get(t,n,he(t)?t:r);if((Ye(n)?xh.has(n):om(n))||(s||ce(t,"get",n),i))return l;if(he(l)){const c=a&&Ua(n)?l:l.value;return s&&bt(c)?la(c):c}return bt(l)?s?la(l):Wa(l):l}}class kh extends Dh{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const a=it(t)&&Ua(n);if(!this._isShallow){const d=pn(i);if(!De(r)&&!pn(r)&&(i=It(i),r=It(r)),!a&&he(i)&&!he(r))return d||(i.value=r),!0}const l=a?Number(n)<t.length:At(t,n),c=Reflect.set(t,n,r,he(t)?t:s);return t===It(s)&&(l?We(r,i)&&ln(t,"set",n,r):ln(t,"add",n,r)),c}deleteProperty(t,n){const r=At(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&ln(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!Ye(n)||!xh.has(n))&&ce(t,"has",n),r}ownKeys(t){return ce(t,"iterate",it(t)?"length":Qn),Reflect.ownKeys(t)}}class lm extends Dh{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const um=new kh,cm=new lm,hm=new kh(!0);const aa=e=>e,hi=e=>Reflect.getPrototypeOf(e);function fm(e,t,n){return function(...r){const s=this.__v_raw,i=It(s),a=Tr(i),l=e==="entries"||e===Symbol.iterator&&a,c=e==="keys"&&a,d=s[e](...r),h=n?aa:t?br:Be;return!t&&ce(i,"iterate",c?oa:Qn),re(Object.create(d),{next(){const{value:y,done:T}=d.next();return T?{value:y,done:T}:{value:l?[h(y[0]),h(y[1])]:h(y),done:T}}})}}function fi(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function dm(e,t){const n={get(s){const i=this.__v_raw,a=It(i),l=It(s);e||(We(s,l)&&ce(a,"get",s),ce(a,"get",l));const{has:c}=hi(a),d=t?aa:e?br:Be;if(c.call(a,s))return d(i.get(s));if(c.call(a,l))return d(i.get(l));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!e&&ce(It(s),"iterate",Qn),s.size},has(s){const i=this.__v_raw,a=It(i),l=It(s);return e||(We(s,l)&&ce(a,"has",s),ce(a,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const a=this,l=a.__v_raw,c=It(l),d=t?aa:e?br:Be;return!e&&ce(c,"iterate",Qn),l.forEach((h,y)=>s.call(i,d(h),d(y),a))}};return re(n,e?{add:fi("add"),set:fi("set"),delete:fi("delete"),clear:fi("clear")}:{add(s){const i=It(this),a=hi(i),l=It(s),c=!t&&!De(s)&&!pn(s)?l:s;return a.has.call(i,c)||We(s,c)&&a.has.call(i,s)||We(l,c)&&a.has.call(i,l)||(i.add(c),ln(i,"add",c,c)),this},set(s,i){!t&&!De(i)&&!pn(i)&&(i=It(i));const a=It(this),{has:l,get:c}=hi(a);let d=l.call(a,s);d||(s=It(s),d=l.call(a,s));const h=c.call(a,s);return a.set(s,i),d?We(i,h)&&ln(a,"set",s,i):ln(a,"add",s,i),this},delete(s){const i=It(this),{has:a,get:l}=hi(i);let c=a.call(i,s);c||(s=It(s),c=a.call(i,s)),l&&l.call(i,s);const d=i.delete(s);return c&&ln(i,"delete",s,void 0),d},clear(){const s=It(this),i=s.size!==0,a=s.clear();return i&&ln(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=fm(s,e,t)}),n}function za(e,t){const n=dm(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(At(n,s)&&s in r?n:r,s,i)}const pm={get:za(!1,!1)},mm={get:za(!1,!0)},gm={get:za(!0,!1)};const Nh=new WeakMap,Oh=new WeakMap,Mh=new WeakMap,_m=new WeakMap;function ym(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function vm(e){return e.__v_skip||!Object.isExtensible(e)?0:ym(qp(e))}function Wa(e){return pn(e)?e:Ga(e,!1,um,pm,Nh)}function Em(e){return Ga(e,!1,hm,mm,Oh)}function la(e){return Ga(e,!0,cm,gm,Mh)}function Ga(e,t,n,r,s){if(!bt(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=vm(e);if(i===0)return e;const a=s.get(e);if(a)return a;const l=new Proxy(e,i===2?r:n);return s.set(e,l),l}function Xn(e){return pn(e)?Xn(e.__v_raw):!!(e&&e.__v_isReactive)}function pn(e){return!!(e&&e.__v_isReadonly)}function De(e){return!!(e&&e.__v_isShallow)}function Qa(e){return e?!!e.__v_raw:!1}function It(e){const t=e&&e.__v_raw;return t?It(t):e}function Tm(e){return!At(e,"__v_skip")&&Object.isExtensible(e)&&vh(e,"__v_skip",!0),e}const Be=e=>bt(e)?Wa(e):e,br=e=>bt(e)?la(e):e;function he(e){return e?e.__v_isRef===!0:!1}function qn(e){return wm(e,!1)}function wm(e,t){return he(e)?e:new Im(e,t)}class Im{constructor(t,n){this.dep=new Ha,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:It(t),this._value=n?t:Be(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||De(t)||pn(t);t=r?t:It(t),We(t,n)&&(this._rawValue=t,this._value=r?t:Be(t),this.dep.trigger())}}function ut(e){return he(e)?e.value:e}const Am={get:(e,t,n)=>t==="__v_raw"?e:ut(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return he(s)&&!he(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function Lh(e){return Xn(e)?e:new Proxy(e,Am)}class bm{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ha(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Is-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Pt!==this)return bh(this,!0),!0}get value(){const t=this.dep.track();return Ph(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Rm(e,t,n=!1){let r,s;return lt(e)?r=e:(r=e.get,s=e.set),new bm(r,s,n)}const di={},Pi=new WeakMap;let zn;function Sm(e,t=!1,n=zn){if(n){let r=Pi.get(n);r||Pi.set(n,r=[]),r.push(e)}}function Pm(e,t,n=St){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:l,call:c}=n,d=B=>s?B:De(B)||s===!1||s===0?un(B,1):un(B);let h,y,T,R,V=!1,x=!1;if(he(e)?(y=()=>e.value,V=De(e)):Xn(e)?(y=()=>d(e),V=!0):it(e)?(x=!0,V=e.some(B=>Xn(B)||De(B)),y=()=>e.map(B=>{if(he(B))return B.value;if(Xn(B))return d(B);if(lt(B))return c?c(B,2):B()})):lt(e)?t?y=c?()=>c(e,2):e:y=()=>{if(T){fn();try{T()}finally{dn()}}const B=zn;zn=h;try{return c?c(e,3,[R]):e(R)}finally{zn=B}}:y=Qe,t&&s){const B=y,ft=s===!0?1/0:s;y=()=>un(B(),ft)}const D=em(),G=()=>{h.stop(),D&&D.active&&Fa(D.effects,h)};if(i&&t){const B=t;t=(...ft)=>{B(...ft),G()}}let z=x?new Array(e.length).fill(di):di;const W=B=>{if(!(!(h.flags&1)||!h.dirty&&!B))if(t){const ft=h.run();if(s||V||(x?ft.some((_t,I)=>We(_t,z[I])):We(ft,z))){T&&T();const _t=zn;zn=h;try{const I=[ft,z===di?void 0:x&&z[0]===di?[]:z,R];z=ft,c?c(t,3,I):t(...I)}finally{zn=_t}}}else h.run()};return l&&l(W),h=new Ih(y),h.scheduler=a?()=>a(W,!1):W,R=B=>Sm(B,!1,h),T=h.onStop=()=>{const B=Pi.get(h);if(B){if(c)c(B,4);else for(const ft of B)ft();Pi.delete(h)}},t?r?W(!0):z=h.run():a?a(W.bind(null,!0),!0):h.run(),G.pause=h.pause.bind(h),G.resume=h.resume.bind(h),G.stop=G,G}function un(e,t=1/0,n){if(t<=0||!bt(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,he(e))un(e.value,t,n);else if(it(e))for(let r=0;r<e.length;r++)un(e[r],t,n);else if(Yi(e)||Tr(e))e.forEach(r=>{un(r,t,n)});else if(_h(e)){for(const r in e)un(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&un(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Us(e,t,n,r){try{return r?e(...r):e()}catch(s){no(s,t,n)}}function Je(e,t,n,r){if(lt(e)){const s=Us(e,t,n,r);return s&&mh(s)&&s.catch(i=>{no(i,t,n)}),s}if(it(e)){const s=[];for(let i=0;i<e.length;i++)s.push(Je(e[i],t,n,r));return s}}function no(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||St;if(t){let l=t.parent;const c=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const h=l.ec;if(h){for(let y=0;y<h.length;y++)if(h[y](e,c,d)===!1)return}l=l.parent}if(i){fn(),Us(i,null,10,[e,c,d]),dn();return}}Cm(e,n,s,r,a)}function Cm(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const me=[];let Ke=-1;const wr=[];let An=null,gr=0;const Fh=Promise.resolve();let Ci=null;function Uh(e){const t=Ci||Fh;return e?t.then(this?e.bind(this):e):t}function Vm(e){let t=Ke+1,n=me.length;for(;t<n;){const r=t+n>>>1,s=me[r],i=bs(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function Xa(e){if(!(e.flags&1)){const t=bs(e),n=me[me.length-1];!n||!(e.flags&2)&&t>=bs(n)?me.push(e):me.splice(Vm(t),0,e),e.flags|=1,Bh()}}function Bh(){Ci||(Ci=Fh.then($h))}function xm(e){it(e)?wr.push(...e):An&&e.id===-1?An.splice(gr+1,0,e):e.flags&1||(wr.push(e),e.flags|=1),Bh()}function Uu(e,t,n=Ke+1){for(;n<me.length;n++){const r=me[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;me.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function jh(e){if(wr.length){const t=[...new Set(wr)].sort((n,r)=>bs(n)-bs(r));if(wr.length=0,An){An.push(...t);return}for(An=t,gr=0;gr<An.length;gr++){const n=An[gr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}An=null,gr=0}}const bs=e=>e.id==null?e.flags&2?-1:1/0:e.id;function $h(e){try{for(Ke=0;Ke<me.length;Ke++){const t=me[Ke];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Us(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ke<me.length;Ke++){const t=me[Ke];t&&(t.flags&=-2)}Ke=-1,me.length=0,jh(),Ci=null,(me.length||wr.length)&&$h()}}let xe=null,qh=null;function Vi(e){const t=xe;return xe=e,qh=e&&e.type.__scopeId||null,t}function ct(e,t=xe,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&ki(-1);const i=Vi(t);let a;try{a=e(...s)}finally{Vi(i),r._d&&ki(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function wt(e,t){if(xe===null)return e;const n=oo(xe),r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,a,l,c=St]=t[s];i&&(lt(i)&&(i={mounted:i,updated:i}),i.deep&&un(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:l,modifiers:c}))}return e}function Kn(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){const l=s[a];i&&(l.oldValue=i[a].value);let c=l.dir[r];c&&(fn(),Je(c,n,8,[e.el,l,e,t]),dn())}}function Dm(e,t){if(ge){let n=ge.provides;const r=ge.parent&&ge.parent.provides;r===n&&(n=ge.provides=Object.create(r)),n[e]=t}}function wi(e,t,n=!1){const r=Vg();if(r||Ir){let s=Ir?Ir._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&lt(t)?t.call(r&&r.proxy):t}}const km=Symbol.for("v-scx"),Nm=()=>wi(km);function $o(e,t,n){return Kh(e,t,n)}function Kh(e,t,n=St){const{immediate:r,deep:s,flush:i,once:a}=n,l=re({},n),c=t&&r||!t&&i!=="post";let d;if(Ss){if(i==="sync"){const R=Nm();d=R.__watcherHandles||(R.__watcherHandles=[])}else if(!c){const R=()=>{};return R.stop=Qe,R.resume=Qe,R.pause=Qe,R}}const h=ge;l.call=(R,V,x)=>Je(R,h,V,x);let y=!1;i==="post"?l.scheduler=R=>{ve(R,h&&h.suspense)}:i!=="sync"&&(y=!0,l.scheduler=(R,V)=>{V?R():Xa(R)}),l.augmentJob=R=>{t&&(R.flags|=4),y&&(R.flags|=2,h&&(R.id=h.uid,R.i=h))};const T=Pm(e,t,l);return Ss&&(d?d.push(T):c&&T()),T}function Om(e,t,n){const r=this.proxy,s=Lt(e)?e.includes(".")?Hh(r,e):()=>r[e]:e.bind(r,r);let i;lt(t)?i=t:(i=t.handler,n=t);const a=Bs(this),l=Kh(s,i.bind(r),n);return a(),l}function Hh(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Mm=Symbol("_vte"),Lm=e=>e.__isTeleport,Fm=Symbol("_leaveCb");function Ya(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Ya(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Bu(e,t){return lt(e)?re({name:e.name},t,{setup:e}):e}function zh(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ju(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const xi=new WeakMap;function ds(e,t,n,r,s=!1){if(it(e)){e.forEach((x,D)=>ds(x,t&&(it(t)?t[D]:t),n,r,s));return}if(ps(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ds(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?oo(r.component):r.el,a=s?null:i,{i:l,r:c}=e,d=t&&t.r,h=l.refs===St?l.refs={}:l.refs,y=l.setupState,T=It(y),R=y===St?ph:x=>ju(h,x)?!1:At(T,x),V=(x,D)=>!(D&&ju(h,D));if(d!=null&&d!==c){if($u(t),Lt(d))h[d]=null,R(d)&&(y[d]=null);else if(he(d)){const x=t;V(d,x.k)&&(d.value=null),x.k&&(h[x.k]=null)}}if(lt(c))Us(c,l,12,[a,h]);else{const x=Lt(c),D=he(c);if(x||D){const G=()=>{if(e.f){const z=x?R(c)?y[c]:h[c]:V()||!e.k?c.value:h[e.k];if(s)it(z)&&Fa(z,i);else if(it(z))z.includes(i)||z.push(i);else if(x)h[c]=[i],R(c)&&(y[c]=h[c]);else{const W=[i];V(c,e.k)&&(c.value=W),e.k&&(h[e.k]=W)}}else x?(h[c]=a,R(c)&&(y[c]=a)):D&&(V(c,e.k)&&(c.value=a),e.k&&(h[e.k]=a))};if(a){const z=()=>{G(),xi.delete(e)};z.id=-1,xi.set(e,z),ve(z,n)}else $u(e),G()}}}function $u(e){const t=xi.get(e);t&&(t.flags|=8,xi.delete(e))}to().requestIdleCallback;to().cancelIdleCallback;const ps=e=>!!e.type.__asyncLoader,Wh=e=>e.type.__isKeepAlive;function Um(e,t){Gh(e,"a",t)}function Bm(e,t){Gh(e,"da",t)}function Gh(e,t,n=ge){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(ro(t,r,n),n){let s=n.parent;for(;s&&s.parent;)Wh(s.parent.vnode)&&jm(r,t,n,s),s=s.parent}}function jm(e,t,n,r){const s=ro(t,e,r,!0);Xh(()=>{Fa(r[t],s)},n)}function ro(e,t,n=ge,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...a)=>{fn();const l=Bs(n),c=Je(t,n,e,a);return l(),dn(),c});return r?s.unshift(i):s.push(i),i}}const yn=e=>(t,n=ge)=>{(!Ss||e==="sp")&&ro(e,(...r)=>t(...r),n)},$m=yn("bm"),Qh=yn("m"),qm=yn("bu"),Km=yn("u"),Hm=yn("bum"),Xh=yn("um"),zm=yn("sp"),Wm=yn("rtg"),Gm=yn("rtc");function Qm(e,t=ge){ro("ec",e,t)}const Xm=Symbol.for("v-ndc");function qu(e,t,n,r){let s;const i=n,a=it(e);if(a||Lt(e)){const l=a&&Xn(e);let c=!1,d=!1;l&&(c=!De(e),d=pn(e),e=eo(e)),s=new Array(e.length);for(let h=0,y=e.length;h<y;h++)s[h]=t(c?d?br(Be(e[h])):Be(e[h]):e[h],h,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let l=0;l<e;l++)s[l]=t(l+1,l,void 0,i)}else if(bt(e))if(e[Symbol.iterator])s=Array.from(e,(l,c)=>t(l,c,void 0,i));else{const l=Object.keys(e);s=new Array(l.length);for(let c=0,d=l.length;c<d;c++){const h=l[c];s[c]=t(e[h],h,c,i)}}else s=[];return s}const ua=e=>e?yf(e)?oo(e):ua(e.parent):null,ms=re(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ua(e.parent),$root:e=>ua(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Jh(e),$forceUpdate:e=>e.f||(e.f=()=>{Xa(e.update)}),$nextTick:e=>e.n||(e.n=Uh.bind(e.proxy)),$watch:e=>Om.bind(e)}),qo=(e,t)=>e!==St&&!e.__isScriptSetup&&At(e,t),Ym={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:l,appContext:c}=e;if(t[0]!=="$"){const T=a[t];if(T!==void 0)switch(T){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(qo(r,t))return a[t]=1,r[t];if(s!==St&&At(s,t))return a[t]=2,s[t];if(At(i,t))return a[t]=3,i[t];if(n!==St&&At(n,t))return a[t]=4,n[t];ca&&(a[t]=0)}}const d=ms[t];let h,y;if(d)return t==="$attrs"&&ce(e.attrs,"get",""),d(e);if((h=l.__cssModules)&&(h=h[t]))return h;if(n!==St&&At(n,t))return a[t]=4,n[t];if(y=c.config.globalProperties,At(y,t))return y[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return qo(s,t)?(s[t]=n,!0):r!==St&&At(r,t)?(r[t]=n,!0):At(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:a}},l){let c;return!!(n[l]||e!==St&&l[0]!=="$"&&At(e,l)||qo(t,l)||At(i,l)||At(r,l)||At(ms,l)||At(s.config.globalProperties,l)||(c=a.__cssModules)&&c[l])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:At(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Ku(e){return it(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ca=!0;function Jm(e){const t=Jh(e),n=e.proxy,r=e.ctx;ca=!1,t.beforeCreate&&Hu(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:a,watch:l,provide:c,inject:d,created:h,beforeMount:y,mounted:T,beforeUpdate:R,updated:V,activated:x,deactivated:D,beforeDestroy:G,beforeUnmount:z,destroyed:W,unmounted:B,render:ft,renderTracked:_t,renderTriggered:I,errorCaptured:g,serverPrefetch:p,expose:_,inheritAttrs:w,components:b,directives:E,filters:Nt}=t;if(d&&Zm(d,r,null),a)for(const yt in a){const ht=a[yt];lt(ht)&&(r[yt]=ht.bind(n))}if(s){const yt=s.call(n,n);bt(yt)&&(e.data=Wa(yt))}if(ca=!0,i)for(const yt in i){const ht=i[yt],Pe=lt(ht)?ht.bind(n,n):lt(ht.get)?ht.get.bind(n,n):Qe,je=!lt(ht)&&lt(ht.set)?ht.set.bind(n):Qe,ke=is({get:Pe,set:je});Object.defineProperty(r,yt,{enumerable:!0,configurable:!0,get:()=>ke.value,set:qt=>ke.value=qt})}if(l)for(const yt in l)Yh(l[yt],r,n,yt);if(c){const yt=lt(c)?c.call(n):c;Reflect.ownKeys(yt).forEach(ht=>{Dm(ht,yt[ht])})}h&&Hu(h,e,"c");function Ot(yt,ht){it(ht)?ht.forEach(Pe=>yt(Pe.bind(n))):ht&&yt(ht.bind(n))}if(Ot($m,y),Ot(Qh,T),Ot(qm,R),Ot(Km,V),Ot(Um,x),Ot(Bm,D),Ot(Qm,g),Ot(Gm,_t),Ot(Wm,I),Ot(Hm,z),Ot(Xh,B),Ot(zm,p),it(_))if(_.length){const yt=e.exposed||(e.exposed={});_.forEach(ht=>{Object.defineProperty(yt,ht,{get:()=>n[ht],set:Pe=>n[ht]=Pe,enumerable:!0})})}else e.exposed||(e.exposed={});ft&&e.render===Qe&&(e.render=ft),w!=null&&(e.inheritAttrs=w),b&&(e.components=b),E&&(e.directives=E),p&&zh(e)}function Zm(e,t,n=Qe){it(e)&&(e=ha(e));for(const r in e){const s=e[r];let i;bt(s)?"default"in s?i=wi(s.from||r,s.default,!0):i=wi(s.from||r):i=wi(s),he(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):t[r]=i}}function Hu(e,t,n){Je(it(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function Yh(e,t,n,r){let s=r.includes(".")?Hh(n,r):()=>n[r];if(Lt(e)){const i=t[e];lt(i)&&$o(s,i)}else if(lt(e))$o(s,e.bind(n));else if(bt(e))if(it(e))e.forEach(i=>Yh(i,t,n,r));else{const i=lt(e.handler)?e.handler.bind(n):t[e.handler];lt(i)&&$o(s,i,e)}}function Jh(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=e.appContext,l=i.get(t);let c;return l?c=l:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(d=>Di(c,d,a,!0)),Di(c,t,a)),bt(t)&&i.set(t,c),c}function Di(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&Di(e,i,n,!0),s&&s.forEach(a=>Di(e,a,n,!0));for(const a in t)if(!(r&&a==="expose")){const l=tg[a]||n&&n[a];e[a]=l?l(e[a],t[a]):t[a]}return e}const tg={data:zu,props:Wu,emits:Wu,methods:ss,computed:ss,beforeCreate:pe,created:pe,beforeMount:pe,mounted:pe,beforeUpdate:pe,updated:pe,beforeDestroy:pe,beforeUnmount:pe,destroyed:pe,unmounted:pe,activated:pe,deactivated:pe,errorCaptured:pe,serverPrefetch:pe,components:ss,directives:ss,watch:ng,provide:zu,inject:eg};function zu(e,t){return t?e?function(){return re(lt(e)?e.call(this,this):e,lt(t)?t.call(this,this):t)}:t:e}function eg(e,t){return ss(ha(e),ha(t))}function ha(e){if(it(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function pe(e,t){return e?[...new Set([].concat(e,t))]:t}function ss(e,t){return e?re(Object.create(null),e,t):t}function Wu(e,t){return e?it(e)&&it(t)?[...new Set([...e,...t])]:re(Object.create(null),Ku(e),Ku(t??{})):t}function ng(e,t){if(!e)return t;if(!t)return e;const n=re(Object.create(null),e);for(const r in t)n[r]=pe(e[r],t[r]);return n}function Zh(){return{app:null,config:{isNativeTag:ph,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let rg=0;function sg(e,t){return function(r,s=null){lt(r)||(r=re({},r)),s!=null&&!bt(s)&&(s=null);const i=Zh(),a=new WeakSet,l=[];let c=!1;const d=i.app={_uid:rg++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Mg,get config(){return i.config},set config(h){},use(h,...y){return a.has(h)||(h&&lt(h.install)?(a.add(h),h.install(d,...y)):lt(h)&&(a.add(h),h(d,...y))),d},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),d},component(h,y){return y?(i.components[h]=y,d):i.components[h]},directive(h,y){return y?(i.directives[h]=y,d):i.directives[h]},mount(h,y,T){if(!c){const R=d._ceVNode||tt(r,s);return R.appContext=i,T===!0?T="svg":T===!1&&(T=void 0),e(R,h,T),c=!0,d._container=h,h.__vue_app__=d,oo(R.component)}},onUnmount(h){l.push(h)},unmount(){c&&(Je(l,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(h,y){return i.provides[h]=y,d},runWithContext(h){const y=Ir;Ir=d;try{return h()}finally{Ir=y}}};return d}}let Ir=null;const ig=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Fe(t)}Modifiers`]||e[`${ir(t)}Modifiers`];function og(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||St;let s=n;const i=t.startsWith("update:"),a=i&&ig(r,t.slice(7));a&&(a.trim&&(s=n.map(h=>Lt(h)?h.trim():h)),a.number&&(s=n.map(Zi)));let l,c=r[l=Lo(t)]||r[l=Lo(Fe(t))];!c&&i&&(c=r[l=Lo(ir(t))]),c&&Je(c,e,6,s);const d=r[l+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,Je(d,e,6,s)}}const ag=new WeakMap;function tf(e,t,n=!1){const r=n?ag:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let a={},l=!1;if(!lt(e)){const c=d=>{const h=tf(d,t,!0);h&&(l=!0,re(a,h))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!l?(bt(e)&&r.set(e,null),null):(it(i)?i.forEach(c=>a[c]=null):re(a,i),bt(e)&&r.set(e,a),a)}function so(e,t){return!e||!Qi(t)?!1:(t=t.slice(2).replace(/Once$/,""),At(e,t[0].toLowerCase()+t.slice(1))||At(e,ir(t))||At(e,t))}function Gu(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:l,emit:c,render:d,renderCache:h,props:y,data:T,setupState:R,ctx:V,inheritAttrs:x}=e,D=Vi(e);let G,z;try{if(n.shapeFlag&4){const B=s||r,ft=B;G=ze(d.call(ft,B,h,y,R,T,V)),z=l}else{const B=t;G=ze(B.length>1?B(y,{attrs:l,slots:a,emit:c}):B(y,null)),z=t.props?l:lg(l)}}catch(B){gs.length=0,no(B,e,1),G=tt(Dn)}let W=G;if(z&&x!==!1){const B=Object.keys(z),{shapeFlag:ft}=W;B.length&&ft&7&&(i&&B.some(Xi)&&(z=ug(z,i)),W=Rr(W,z,!1,!0))}return n.dirs&&(W=Rr(W,null,!1,!0),W.dirs=W.dirs?W.dirs.concat(n.dirs):n.dirs),n.transition&&Ya(W,n.transition),G=W,Vi(D),G}const lg=e=>{let t;for(const n in e)(n==="class"||n==="style"||Qi(n))&&((t||(t={}))[n]=e[n]);return t},ug=(e,t)=>{const n={};for(const r in e)(!Xi(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function cg(e,t,n){const{props:r,children:s,component:i}=e,{props:a,children:l,patchFlag:c}=t,d=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Qu(r,a,d):!!a;if(c&8){const h=t.dynamicProps;for(let y=0;y<h.length;y++){const T=h[y];if(ef(a,r,T)&&!so(d,T))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===a?!1:r?a?Qu(r,a,d):!0:!!a;return!1}function Qu(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(ef(t,e,i)&&!so(n,i))return!0}return!1}function ef(e,t,n){const r=e[n],s=t[n];return n==="style"&&bt(r)&&bt(s)?!Zn(r,s):r!==s}function hg({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const nf={},rf=()=>Object.create(nf),sf=e=>Object.getPrototypeOf(e)===nf;function fg(e,t,n,r=!1){const s={},i=rf();e.propsDefaults=Object.create(null),of(e,t,s,i);for(const a in e.propsOptions[0])a in s||(s[a]=void 0);n?e.props=r?s:Em(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function dg(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=e,l=It(s),[c]=e.propsOptions;let d=!1;if((r||a>0)&&!(a&16)){if(a&8){const h=e.vnode.dynamicProps;for(let y=0;y<h.length;y++){let T=h[y];if(so(e.emitsOptions,T))continue;const R=t[T];if(c)if(At(i,T))R!==i[T]&&(i[T]=R,d=!0);else{const V=Fe(T);s[V]=fa(c,l,V,R,e,!1)}else R!==i[T]&&(i[T]=R,d=!0)}}}else{of(e,t,s,i)&&(d=!0);let h;for(const y in l)(!t||!At(t,y)&&((h=ir(y))===y||!At(t,h)))&&(c?n&&(n[y]!==void 0||n[h]!==void 0)&&(s[y]=fa(c,l,y,void 0,e,!0)):delete s[y]);if(i!==l)for(const y in i)(!t||!At(t,y))&&(delete i[y],d=!0)}d&&ln(e.attrs,"set","")}function of(e,t,n,r){const[s,i]=e.propsOptions;let a=!1,l;if(t)for(let c in t){if(cs(c))continue;const d=t[c];let h;s&&At(s,h=Fe(c))?!i||!i.includes(h)?n[h]=d:(l||(l={}))[h]=d:so(e.emitsOptions,c)||(!(c in r)||d!==r[c])&&(r[c]=d,a=!0)}if(i){const c=It(n),d=l||St;for(let h=0;h<i.length;h++){const y=i[h];n[y]=fa(s,c,y,d[y],e,!At(d,y))}}return a}function fa(e,t,n,r,s,i){const a=e[n];if(a!=null){const l=At(a,"default");if(l&&r===void 0){const c=a.default;if(a.type!==Function&&!a.skipFactory&&lt(c)){const{propsDefaults:d}=s;if(n in d)r=d[n];else{const h=Bs(s);r=d[n]=c.call(null,t),h()}}else r=c;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!l?r=!1:a[1]&&(r===""||r===ir(n))&&(r=!0))}return r}const pg=new WeakMap;function af(e,t,n=!1){const r=n?pg:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,a={},l=[];let c=!1;if(!lt(e)){const h=y=>{c=!0;const[T,R]=af(y,t,!0);re(a,T),R&&l.push(...R)};!n&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}if(!i&&!c)return bt(e)&&r.set(e,Er),Er;if(it(i))for(let h=0;h<i.length;h++){const y=Fe(i[h]);Xu(y)&&(a[y]=St)}else if(i)for(const h in i){const y=Fe(h);if(Xu(y)){const T=i[h],R=a[y]=it(T)||lt(T)?{type:T}:re({},T),V=R.type;let x=!1,D=!0;if(it(V))for(let G=0;G<V.length;++G){const z=V[G],W=lt(z)&&z.name;if(W==="Boolean"){x=!0;break}else W==="String"&&(D=!1)}else x=lt(V)&&V.name==="Boolean";R[0]=x,R[1]=D,(x||At(R,"default"))&&l.push(y)}}const d=[a,l];return bt(e)&&r.set(e,d),d}function Xu(e){return e[0]!=="$"&&!cs(e)}const Ja=e=>e==="_"||e==="_ctx"||e==="$stable",Za=e=>it(e)?e.map(ze):[ze(e)],mg=(e,t,n)=>{if(t._n)return t;const r=ct((...s)=>Za(t(...s)),n);return r._c=!1,r},lf=(e,t,n)=>{const r=e._ctx;for(const s in e){if(Ja(s))continue;const i=e[s];if(lt(i))t[s]=mg(s,i,r);else if(i!=null){const a=Za(i);t[s]=()=>a}}},uf=(e,t)=>{const n=Za(t);e.slots.default=()=>n},cf=(e,t,n)=>{for(const r in t)(n||!Ja(r))&&(e[r]=t[r])},gg=(e,t,n)=>{const r=e.slots=rf();if(e.vnode.shapeFlag&32){const s=t._;s?(cf(r,t,n),n&&vh(r,"_",s,!0)):lf(t,r)}else t&&uf(e,t)},_g=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,a=St;if(r.shapeFlag&32){const l=t._;l?n&&l===1?i=!1:cf(s,t,n):(i=!t.$stable,lf(t,s)),a=t}else t&&(uf(e,t),a={default:1});if(i)for(const l in s)!Ja(l)&&a[l]==null&&delete s[l]},ve=wg;function yg(e){return vg(e)}function vg(e,t){const n=to();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:l,createComment:c,setText:d,setElementText:h,parentNode:y,nextSibling:T,setScopeId:R=Qe,insertStaticContent:V}=e,x=(v,A,C,L=null,k=null,M=null,K=void 0,$=null,U=!!A.dynamicChildren)=>{if(v===A)return;v&&!ts(v,A)&&(L=en(v),qt(v,k,M,!0),v=null),A.patchFlag===-2&&(U=!1,A.dynamicChildren=null);const{type:O,ref:Z,shapeFlag:H}=A;switch(O){case io:D(v,A,C,L);break;case Dn:G(v,A,C,L);break;case Ho:v==null&&z(A,C,L,K);break;case Le:b(v,A,C,L,k,M,K,$,U);break;default:H&1?ft(v,A,C,L,k,M,K,$,U):H&6?E(v,A,C,L,k,M,K,$,U):(H&64||H&128)&&O.process(v,A,C,L,k,M,K,$,U,$e)}Z!=null&&k?ds(Z,v&&v.ref,M,A||v,!A):Z==null&&v&&v.ref!=null&&ds(v.ref,null,M,v,!0)},D=(v,A,C,L)=>{if(v==null)r(A.el=l(A.children),C,L);else{const k=A.el=v.el;A.children!==v.children&&d(k,A.children)}},G=(v,A,C,L)=>{v==null?r(A.el=c(A.children||""),C,L):A.el=v.el},z=(v,A,C,L)=>{[v.el,v.anchor]=V(v.children,A,C,L,v.el,v.anchor)},W=({el:v,anchor:A},C,L)=>{let k;for(;v&&v!==A;)k=T(v),r(v,C,L),v=k;r(A,C,L)},B=({el:v,anchor:A})=>{let C;for(;v&&v!==A;)C=T(v),s(v),v=C;s(A)},ft=(v,A,C,L,k,M,K,$,U)=>{if(A.type==="svg"?K="svg":A.type==="math"&&(K="mathml"),v==null)_t(A,C,L,k,M,K,$,U);else{const O=v.el&&v.el._isVueCE?v.el:null;try{O&&O._beginPatch(),p(v,A,k,M,K,$,U)}finally{O&&O._endPatch()}}},_t=(v,A,C,L,k,M,K,$)=>{let U,O;const{props:Z,shapeFlag:H,transition:Y,dirs:et}=v;if(U=v.el=a(v.type,M,Z&&Z.is,Z),H&8?h(U,v.children):H&16&&g(v.children,U,null,L,k,Ko(v,M),K,$),et&&Kn(v,null,L,"created"),I(U,v,v.scopeId,K,L),Z){for(const at in Z)at!=="value"&&!cs(at)&&i(U,at,null,Z[at],M,L);"value"in Z&&i(U,"value",null,Z.value,M),(O=Z.onVnodeBeforeMount)&&qe(O,L,v)}et&&Kn(v,null,L,"beforeMount");const nt=Eg(k,Y);nt&&Y.beforeEnter(U),r(U,A,C),((O=Z&&Z.onVnodeMounted)||nt||et)&&ve(()=>{try{O&&qe(O,L,v),nt&&Y.enter(U),et&&Kn(v,null,L,"mounted")}finally{}},k)},I=(v,A,C,L,k)=>{if(C&&R(v,C),L)for(let M=0;M<L.length;M++)R(v,L[M]);if(k){let M=k.subTree;if(A===M||pf(M.type)&&(M.ssContent===A||M.ssFallback===A)){const K=k.vnode;I(v,K,K.scopeId,K.slotScopeIds,k.parent)}}},g=(v,A,C,L,k,M,K,$,U=0)=>{for(let O=U;O<v.length;O++){const Z=v[O]=$?an(v[O]):ze(v[O]);x(null,Z,A,C,L,k,M,K,$)}},p=(v,A,C,L,k,M,K)=>{const $=A.el=v.el;let{patchFlag:U,dynamicChildren:O,dirs:Z}=A;U|=v.patchFlag&16;const H=v.props||St,Y=A.props||St;let et;if(C&&Hn(C,!1),(et=Y.onVnodeBeforeUpdate)&&qe(et,C,A,v),Z&&Kn(A,v,C,"beforeUpdate"),C&&Hn(C,!0),(H.innerHTML&&Y.innerHTML==null||H.textContent&&Y.textContent==null)&&h($,""),O?_(v.dynamicChildren,O,$,C,L,Ko(A,k),M):K||ht(v,A,$,null,C,L,Ko(A,k),M,!1),U>0){if(U&16)w($,H,Y,C,k);else if(U&2&&H.class!==Y.class&&i($,"class",null,Y.class,k),U&4&&i($,"style",H.style,Y.style,k),U&8){const nt=A.dynamicProps;for(let at=0;at<nt.length;at++){const Tt=nt[at],Dt=H[Tt],jt=Y[Tt];(jt!==Dt||Tt==="value")&&i($,Tt,Dt,jt,k,C)}}U&1&&v.children!==A.children&&h($,A.children)}else!K&&O==null&&w($,H,Y,C,k);((et=Y.onVnodeUpdated)||Z)&&ve(()=>{et&&qe(et,C,A,v),Z&&Kn(A,v,C,"updated")},L)},_=(v,A,C,L,k,M,K)=>{for(let $=0;$<A.length;$++){const U=v[$],O=A[$],Z=U.el&&(U.type===Le||!ts(U,O)||U.shapeFlag&198)?y(U.el):C;x(U,O,Z,null,L,k,M,K,!0)}},w=(v,A,C,L,k)=>{if(A!==C){if(A!==St)for(const M in A)!cs(M)&&!(M in C)&&i(v,M,A[M],null,k,L);for(const M in C){if(cs(M))continue;const K=C[M],$=A[M];K!==$&&M!=="value"&&i(v,M,$,K,k,L)}"value"in C&&i(v,"value",A.value,C.value,k)}},b=(v,A,C,L,k,M,K,$,U)=>{const O=A.el=v?v.el:l(""),Z=A.anchor=v?v.anchor:l("");let{patchFlag:H,dynamicChildren:Y,slotScopeIds:et}=A;et&&($=$?$.concat(et):et),v==null?(r(O,C,L),r(Z,C,L),g(A.children||[],C,Z,k,M,K,$,U)):H>0&&H&64&&Y&&v.dynamicChildren&&v.dynamicChildren.length===Y.length?(_(v.dynamicChildren,Y,C,k,M,K,$),(A.key!=null||k&&A===k.subTree)&&hf(v,A,!0)):ht(v,A,C,Z,k,M,K,$,U)},E=(v,A,C,L,k,M,K,$,U)=>{A.slotScopeIds=$,v==null?A.shapeFlag&512?k.ctx.activate(A,C,L,K,U):Nt(A,C,L,k,M,K,U):ye(v,A,U)},Nt=(v,A,C,L,k,M,K)=>{const $=v.component=Cg(v,L,k);if(Wh(v)&&($.ctx.renderer=$e),xg($,!1,K),$.asyncDep){if(k&&k.registerDep($,Ot,K),!v.el){const U=$.subTree=tt(Dn);G(null,U,A,C),v.placeholder=U.el}}else Ot($,v,A,C,k,M,K)},ye=(v,A,C)=>{const L=A.component=v.component;if(cg(v,A,C))if(L.asyncDep&&!L.asyncResolved){yt(L,A,C);return}else L.next=A,L.update();else A.el=v.el,L.vnode=A},Ot=(v,A,C,L,k,M,K)=>{const $=()=>{if(v.isMounted){let{next:H,bu:Y,u:et,parent:nt,vnode:at}=v;{const ie=ff(v);if(ie){H&&(H.el=at.el,yt(v,H,K)),ie.asyncDep.then(()=>{ve(()=>{v.isUnmounted||O()},k)});return}}let Tt=H,Dt;Hn(v,!1),H?(H.el=at.el,yt(v,H,K)):H=at,Y&&Ti(Y),(Dt=H.props&&H.props.onVnodeBeforeUpdate)&&qe(Dt,nt,H,at),Hn(v,!0);const jt=Gu(v),Ce=v.subTree;v.subTree=jt,x(Ce,jt,y(Ce.el),en(Ce),v,k,M),H.el=jt.el,Tt===null&&hg(v,jt.el),et&&ve(et,k),(Dt=H.props&&H.props.onVnodeUpdated)&&ve(()=>qe(Dt,nt,H,at),k)}else{let H;const{el:Y,props:et}=A,{bm:nt,m:at,parent:Tt,root:Dt,type:jt}=v,Ce=ps(A);Hn(v,!1),nt&&Ti(nt),!Ce&&(H=et&&et.onVnodeBeforeMount)&&qe(H,Tt,A),Hn(v,!0);{Dt.ce&&Dt.ce._hasShadowRoot()&&Dt.ce._injectChildStyle(jt,v.parent?v.parent.type:void 0);const ie=v.subTree=Gu(v);x(null,ie,C,L,v,k,M),A.el=ie.el}if(at&&ve(at,k),!Ce&&(H=et&&et.onVnodeMounted)){const ie=A;ve(()=>qe(H,Tt,ie),k)}(A.shapeFlag&256||Tt&&ps(Tt.vnode)&&Tt.vnode.shapeFlag&256)&&v.a&&ve(v.a,k),v.isMounted=!0,A=C=L=null}};v.scope.on();const U=v.effect=new Ih($);v.scope.off();const O=v.update=U.run.bind(U),Z=v.job=U.runIfDirty.bind(U);Z.i=v,Z.id=v.uid,U.scheduler=()=>Xa(Z),Hn(v,!0),O()},yt=(v,A,C)=>{A.component=v;const L=v.vnode.props;v.vnode=A,v.next=null,dg(v,A.props,L,C),_g(v,A.children,C),fn(),Uu(v),dn()},ht=(v,A,C,L,k,M,K,$,U=!1)=>{const O=v&&v.children,Z=v?v.shapeFlag:0,H=A.children,{patchFlag:Y,shapeFlag:et}=A;if(Y>0){if(Y&128){je(O,H,C,L,k,M,K,$,U);return}else if(Y&256){Pe(O,H,C,L,k,M,K,$,U);return}}et&8?(Z&16&&Fn(O,k,M),H!==O&&h(C,H)):Z&16?et&16?je(O,H,C,L,k,M,K,$,U):Fn(O,k,M,!0):(Z&8&&h(C,""),et&16&&g(H,C,L,k,M,K,$,U))},Pe=(v,A,C,L,k,M,K,$,U)=>{v=v||Er,A=A||Er;const O=v.length,Z=A.length,H=Math.min(O,Z);let Y;for(Y=0;Y<H;Y++){const et=A[Y]=U?an(A[Y]):ze(A[Y]);x(v[Y],et,C,null,k,M,K,$,U)}O>Z?Fn(v,k,M,!0,!1,H):g(A,C,L,k,M,K,$,U,H)},je=(v,A,C,L,k,M,K,$,U)=>{let O=0;const Z=A.length;let H=v.length-1,Y=Z-1;for(;O<=H&&O<=Y;){const et=v[O],nt=A[O]=U?an(A[O]):ze(A[O]);if(ts(et,nt))x(et,nt,C,null,k,M,K,$,U);else break;O++}for(;O<=H&&O<=Y;){const et=v[H],nt=A[Y]=U?an(A[Y]):ze(A[Y]);if(ts(et,nt))x(et,nt,C,null,k,M,K,$,U);else break;H--,Y--}if(O>H){if(O<=Y){const et=Y+1,nt=et<Z?A[et].el:L;for(;O<=Y;)x(null,A[O]=U?an(A[O]):ze(A[O]),C,nt,k,M,K,$,U),O++}}else if(O>Y)for(;O<=H;)qt(v[O],k,M,!0),O++;else{const et=O,nt=O,at=new Map;for(O=nt;O<=Y;O++){const Xt=A[O]=U?an(A[O]):ze(A[O]);Xt.key!=null&&at.set(Xt.key,O)}let Tt,Dt=0;const jt=Y-nt+1;let Ce=!1,ie=0;const vn=new Array(jt);for(O=0;O<jt;O++)vn[O]=0;for(O=et;O<=H;O++){const Xt=v[O];if(Dt>=jt){qt(Xt,k,M,!0);continue}let Ve;if(Xt.key!=null)Ve=at.get(Xt.key);else for(Tt=nt;Tt<=Y;Tt++)if(vn[Tt-nt]===0&&ts(Xt,A[Tt])){Ve=Tt;break}Ve===void 0?qt(Xt,k,M,!0):(vn[Ve-nt]=O+1,Ve>=ie?ie=Ve:Ce=!0,x(Xt,A[Ve],C,null,k,M,K,$,U),Dt++)}const Br=Ce?Tg(vn):Er;for(Tt=Br.length-1,O=jt-1;O>=0;O--){const Xt=nt+O,Ve=A[Xt],Qs=A[Xt+1],ur=Xt+1<Z?Qs.el||df(Qs):L;vn[O]===0?x(null,Ve,C,ur,k,M,K,$,U):Ce&&(Tt<0||O!==Br[Tt]?ke(Ve,C,ur,2):Tt--)}}},ke=(v,A,C,L,k=null)=>{const{el:M,type:K,transition:$,children:U,shapeFlag:O}=v;if(O&6){ke(v.component.subTree,A,C,L);return}if(O&128){v.suspense.move(A,C,L);return}if(O&64){K.move(v,A,C,$e);return}if(K===Le){r(M,A,C);for(let H=0;H<U.length;H++)ke(U[H],A,C,L);r(v.anchor,A,C);return}if(K===Ho){W(v,A,C);return}if(L!==2&&O&1&&$)if(L===0)$.beforeEnter(M),r(M,A,C),ve(()=>$.enter(M),k);else{const{leave:H,delayLeave:Y,afterLeave:et}=$,nt=()=>{v.ctx.isUnmounted?s(M):r(M,A,C)},at=()=>{M._isLeaving&&M[Fm](!0),H(M,()=>{nt(),et&&et()})};Y?Y(M,nt,at):at()}else r(M,A,C)},qt=(v,A,C,L=!1,k=!1)=>{const{type:M,props:K,ref:$,children:U,dynamicChildren:O,shapeFlag:Z,patchFlag:H,dirs:Y,cacheIndex:et,memo:nt}=v;if(H===-2&&(k=!1),$!=null&&(fn(),ds($,null,C,v,!0),dn()),et!=null&&(A.renderCache[et]=void 0),Z&256){A.ctx.deactivate(v);return}const at=Z&1&&Y,Tt=!ps(v);let Dt;if(Tt&&(Dt=K&&K.onVnodeBeforeUnmount)&&qe(Dt,A,v),Z&6)Ln(v.component,C,L);else{if(Z&128){v.suspense.unmount(C,L);return}at&&Kn(v,null,A,"beforeUnmount"),Z&64?v.type.remove(v,A,C,$e,L):O&&!O.hasOnce&&(M!==Le||H>0&&H&64)?Fn(O,A,C,!1,!0):(M===Le&&H&384||!k&&Z&16)&&Fn(U,A,C),L&&Kt(v)}const jt=nt!=null&&et==null;(Tt&&(Dt=K&&K.onVnodeUnmounted)||at||jt)&&ve(()=>{Dt&&qe(Dt,A,v),at&&Kn(v,null,A,"unmounted"),jt&&(v.el=null)},C)},Kt=v=>{const{type:A,el:C,anchor:L,transition:k}=v;if(A===Le){wo(C,L);return}if(A===Ho){B(v);return}const M=()=>{s(C),k&&!k.persisted&&k.afterLeave&&k.afterLeave()};if(v.shapeFlag&1&&k&&!k.persisted){const{leave:K,delayLeave:$}=k,U=()=>K(C,M);$?$(v.el,M,U):U()}else M()},wo=(v,A)=>{let C;for(;v!==A;)C=T(v),s(v),v=C;s(A)},Ln=(v,A,C)=>{const{bum:L,scope:k,job:M,subTree:K,um:$,m:U,a:O}=v;Yu(U),Yu(O),L&&Ti(L),k.stop(),M&&(M.flags|=8,qt(K,v,A,C)),$&&ve($,A),ve(()=>{v.isUnmounted=!0},A)},Fn=(v,A,C,L=!1,k=!1,M=0)=>{for(let K=M;K<v.length;K++)qt(v[K],A,C,L,k)},en=v=>{if(v.shapeFlag&6)return en(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const A=T(v.anchor||v.el),C=A&&A[Mm];return C?T(C):A};let Fr=!1;const Gs=(v,A,C)=>{let L;v==null?A._vnode&&(qt(A._vnode,null,null,!0),L=A._vnode.component):x(A._vnode||null,v,A,null,null,null,C),A._vnode=v,Fr||(Fr=!0,Uu(L),jh(),Fr=!1)},$e={p:x,um:qt,m:ke,r:Kt,mt:Nt,mc:g,pc:ht,pbc:_,n:en,o:e};return{render:Gs,hydrate:void 0,createApp:sg(Gs)}}function Ko({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Hn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Eg(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function hf(e,t,n=!1){const r=e.children,s=t.children;if(it(r)&&it(s))for(let i=0;i<r.length;i++){const a=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=an(s[i]),l.el=a.el),!n&&l.patchFlag!==-2&&hf(a,l)),l.type===io&&(l.patchFlag===-1&&(l=s[i]=an(l)),l.el=a.el),l.type===Dn&&!l.el&&(l.el=a.el)}}function Tg(e){const t=e.slice(),n=[0];let r,s,i,a,l;const c=e.length;for(r=0;r<c;r++){const d=e[r];if(d!==0){if(s=n[n.length-1],e[s]<d){t[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)l=i+a>>1,e[n[l]]<d?i=l+1:a=l;d<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=t[a];return n}function ff(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ff(t)}function Yu(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function df(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?df(t.subTree):null}const pf=e=>e.__isSuspense;function wg(e,t){t&&t.pendingBranch?it(e)?t.effects.push(...e):t.effects.push(e):xm(e)}const Le=Symbol.for("v-fgt"),io=Symbol.for("v-txt"),Dn=Symbol.for("v-cmt"),Ho=Symbol.for("v-stc"),gs=[];let we=null;function Ht(e=!1){gs.push(we=e?null:[])}function Ig(){gs.pop(),we=gs[gs.length-1]||null}let Rs=1;function ki(e,t=!1){Rs+=e,e<0&&we&&t&&(we.hasOnce=!0)}function mf(e){return e.dynamicChildren=Rs>0?we||Er:null,Ig(),Rs>0&&we&&we.push(e),e}function Jt(e,t,n,r,s,i){return mf(q(e,t,n,r,s,i,!0))}function gf(e,t,n,r,s){return mf(tt(e,t,n,r,s,!0))}function Ni(e){return e?e.__v_isVNode===!0:!1}function ts(e,t){return e.type===t.type&&e.key===t.key}const _f=({key:e})=>e??null,Ii=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Lt(e)||he(e)||lt(e)?{i:xe,r:e,k:t,f:!!n}:e:null);function q(e,t=null,n=null,r=0,s=null,i=e===Le?0:1,a=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&_f(t),ref:t&&Ii(t),scopeId:qh,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:xe};return l?(tl(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=Lt(n)?8:16),Rs>0&&!a&&we&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&we.push(c),c}const tt=Ag;function Ag(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===Xm)&&(e=Dn),Ni(e)){const l=Rr(e,t,!0);return n&&tl(l,n),Rs>0&&!i&&we&&(l.shapeFlag&6?we[we.indexOf(e)]=l:we.push(l)),l.patchFlag=-2,l}if(Og(e)&&(e=e.__vccOpts),t){t=bg(t);let{class:l,style:c}=t;l&&!Lt(l)&&(t.class=ja(l)),bt(c)&&(Qa(c)&&!it(c)&&(c=re({},c)),t.style=Ba(c))}const a=Lt(e)?1:pf(e)?128:Lm(e)?64:bt(e)?4:lt(e)?2:0;return q(e,t,n,r,s,a,i,!0)}function bg(e){return e?Qa(e)||sf(e)?re({},e):e:null}function Rr(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:l,transition:c}=e,d=t?Rg(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&_f(d),ref:t&&t.ref?n&&i?it(i)?i.concat(Ii(t)):[i,Ii(t)]:Ii(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Le?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Rr(e.ssContent),ssFallback:e.ssFallback&&Rr(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&Ya(h,c.clone(h)),h}function Me(e=" ",t=0){return tt(io,null,e,t)}function In(e="",t=!1){return t?(Ht(),gf(Dn,null,e)):tt(Dn,null,e)}function ze(e){return e==null||typeof e=="boolean"?tt(Dn):it(e)?tt(Le,null,e.slice()):Ni(e)?an(e):tt(io,null,String(e))}function an(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Rr(e)}function tl(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(it(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),tl(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!sf(t)?t._ctx=xe:s===3&&xe&&(xe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else lt(t)?(t={default:t,_ctx:xe},n=32):(t=String(t),r&64?(n=16,t=[Me(t)]):n=8);e.children=t,e.shapeFlag|=n}function Rg(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=ja([t.class,r.class]));else if(s==="style")t.style=Ba([t.style,r.style]);else if(Qi(s)){const i=t[s],a=r[s];a&&i!==a&&!(it(i)&&i.includes(a))?t[s]=i?[].concat(i,a):a:a==null&&i==null&&!Xi(s)&&(t[s]=a)}else s!==""&&(t[s]=r[s])}return t}function qe(e,t,n,r=null){Je(e,t,7,[n,r])}const Sg=Zh();let Pg=0;function Cg(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||Sg,i={uid:Pg++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new tm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:af(r,s),emitsOptions:tf(r,s),emit:null,emitted:null,propsDefaults:St,inheritAttrs:r.inheritAttrs,ctx:St,data:St,props:St,attrs:St,slots:St,refs:St,setupState:St,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=og.bind(null,i),e.ce&&e.ce(i),i}let ge=null;const Vg=()=>ge||xe;let Oi,da;{const e=to(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};Oi=t("__VUE_INSTANCE_SETTERS__",n=>ge=n),da=t("__VUE_SSR_SETTERS__",n=>Ss=n)}const Bs=e=>{const t=ge;return Oi(e),e.scope.on(),()=>{e.scope.off(),Oi(t)}},Ju=()=>{ge&&ge.scope.off(),Oi(null)};function yf(e){return e.vnode.shapeFlag&4}let Ss=!1;function xg(e,t=!1,n=!1){t&&da(t);const{props:r,children:s}=e.vnode,i=yf(e);fg(e,r,i,t),gg(e,s,n||t);const a=i?Dg(e,t):void 0;return t&&da(!1),a}function Dg(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ym);const{setup:r}=n;if(r){fn();const s=e.setupContext=r.length>1?Ng(e):null,i=Bs(e),a=Us(r,e,0,[e.props,s]),l=mh(a);if(dn(),i(),(l||e.sp)&&!ps(e)&&zh(e),l){if(a.then(Ju,Ju),t)return a.then(c=>{Zu(e,c)}).catch(c=>{no(c,e,0)});e.asyncDep=a}else Zu(e,a)}else vf(e)}function Zu(e,t,n){lt(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:bt(t)&&(e.setupState=Lh(t)),vf(e)}function vf(e,t,n){const r=e.type;e.render||(e.render=r.render||Qe);{const s=Bs(e);fn();try{Jm(e)}finally{dn(),s()}}}const kg={get(e,t){return ce(e,"get",""),e[t]}};function Ng(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,kg),slots:e.slots,emit:e.emit,expose:t}}function oo(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Lh(Tm(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in ms)return ms[n](e)},has(t,n){return n in t||n in ms}})):e.proxy}function Og(e){return lt(e)&&"__vccOpts"in e}const is=(e,t)=>Rm(e,t,Ss);function mr(e,t,n){try{ki(-1);const r=arguments.length;return r===2?bt(t)&&!it(t)?Ni(t)?tt(e,null,[t]):tt(e,t):tt(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Ni(n)&&(n=[n]),tt(e,t,n))}finally{ki(1)}}const Mg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let pa;const tc=typeof window<"u"&&window.trustedTypes;if(tc)try{pa=tc.createPolicy("vue",{createHTML:e=>e})}catch{}const Ef=pa?e=>pa.createHTML(e):e=>e,Lg="http://www.w3.org/2000/svg",Fg="http://www.w3.org/1998/Math/MathML",on=typeof document<"u"?document:null,ec=on&&on.createElement("template"),Ug={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?on.createElementNS(Lg,e):t==="mathml"?on.createElementNS(Fg,e):n?on.createElement(e,{is:n}):on.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>on.createTextNode(e),createComment:e=>on.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>on.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const a=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{ec.innerHTML=Ef(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const l=ec.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}t.insertBefore(l,n)}return[a?a.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Bg=Symbol("_vtc");function jg(e,t,n){const r=e[Bg];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const nc=Symbol("_vod"),$g=Symbol("_vsh"),qg=Symbol(""),Kg=/(?:^|;)\s*display\s*:/;function Hg(e,t,n){const r=e.style,s=Lt(n);let i=!1;if(n&&!s){if(t)if(Lt(t))for(const a of t.split(";")){const l=a.slice(0,a.indexOf(":")).trim();n[l]==null&&os(r,l,"")}else for(const a in t)n[a]==null&&os(r,a,"");for(const a in n){a==="display"&&(i=!0);const l=n[a];l!=null?Wg(e,a,!Lt(t)&&t?t[a]:void 0,l)||os(r,a,l):os(r,a,"")}}else if(s){if(t!==n){const a=r[qg];a&&(n+=";"+a),r.cssText=n,i=Kg.test(n)}}else t&&e.removeAttribute("style");nc in e&&(e[nc]=i?r.display:"",e[$g]&&(r.display="none"))}const rc=/\s*!important$/;function os(e,t,n){if(it(n))n.forEach(r=>os(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=zg(e,t);rc.test(n)?e.setProperty(ir(r),n.replace(rc,""),"important"):e[r]=n}}const sc=["Webkit","Moz","ms"],zo={};function zg(e,t){const n=zo[t];if(n)return n;let r=Fe(t);if(r!=="filter"&&r in e)return zo[t]=r;r=yh(r);for(let s=0;s<sc.length;s++){const i=sc[s]+r;if(i in e)return zo[t]=i}return t}function Wg(e,t,n,r){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&Lt(r)&&n===r}const ic="http://www.w3.org/1999/xlink";function oc(e,t,n,r,s,i=Yp(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(ic,t.slice(6,t.length)):e.setAttributeNS(ic,t,n):n==null||i&&!Eh(n)?e.removeAttribute(t):e.setAttribute(t,i?"":Ye(n)?String(n):n)}function ac(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Ef(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let a=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=Eh(n):n==null&&l==="string"?(n="",a=!0):l==="number"&&(n=0,a=!0)}try{e[t]=n}catch{}a&&e.removeAttribute(s||t)}function bn(e,t,n,r){e.addEventListener(t,n,r)}function Gg(e,t,n,r){e.removeEventListener(t,n,r)}const lc=Symbol("_vei");function Qg(e,t,n,r,s=null){const i=e[lc]||(e[lc]={}),a=i[t];if(r&&a)a.value=r;else{const[l,c]=Xg(t);if(r){const d=i[t]=Zg(r,s);bn(e,l,d,c)}else a&&(Gg(e,l,a,c),i[t]=void 0)}}const uc=/(?:Once|Passive|Capture)$/;function Xg(e){let t;if(uc.test(e)){t={};let r;for(;r=e.match(uc);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):ir(e.slice(2)),t]}let Wo=0;const Yg=Promise.resolve(),Jg=()=>Wo||(Yg.then(()=>Wo=0),Wo=Date.now());function Zg(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Je(t_(r,n.value),t,5,[r])};return n.value=e,n.attached=Jg(),n}function t_(e,t){if(it(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const cc=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,e_=(e,t,n,r,s,i)=>{const a=s==="svg";t==="class"?jg(e,r,a):t==="style"?Hg(e,n,r):Qi(t)?Xi(t)||Qg(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):n_(e,t,r,a))?(ac(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&oc(e,t,r,a,i,t!=="value")):e._isVueCE&&(r_(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!Lt(r)))?ac(e,Fe(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),oc(e,t,r,a))};function n_(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&cc(t)&&lt(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return cc(t)&&Lt(n)?!1:t in e}function r_(e,t){const n=e._def.props;if(!n)return!1;const r=Fe(t);return Array.isArray(n)?n.some(s=>Fe(s)===r):Object.keys(n).some(s=>Fe(s)===r)}const Sr=e=>{const t=e.props["onUpdate:modelValue"]||!1;return it(t)?n=>Ti(t,n):t};function s_(e){e.target.composing=!0}function hc(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const cn=Symbol("_assign");function fc(e,t,n){return t&&(e=e.trim()),n&&(e=Zi(e)),e}const xt={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[cn]=Sr(s);const i=r||s.props&&s.props.type==="number";bn(e,t?"change":"input",a=>{a.target.composing||e[cn](fc(e.value,n,i))}),(n||i)&&bn(e,"change",()=>{e.value=fc(e.value,n,i)}),t||(bn(e,"compositionstart",s_),bn(e,"compositionend",hc),bn(e,"change",hc))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},a){if(e[cn]=Sr(a),e.composing)return;const l=(i||e.type==="number")&&!/^0\d/.test(e.value)?Zi(e.value):e.value,c=t??"";if(l===c)return;const d=e.getRootNode();(d instanceof Document||d instanceof ShadowRoot)&&d.activeElement===e&&e.type!=="range"&&(r&&t===n||s&&e.value.trim()===c)||(e.value=c)}},dc={created(e,{value:t},n){e.checked=Zn(t,n.props.value),e[cn]=Sr(n),bn(e,"change",()=>{e[cn](Ps(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[cn]=Sr(r),t!==n&&(e.checked=Zn(t,r.props.value))}},Go={deep:!0,created(e,{value:t,modifiers:{number:n}},r){const s=Yi(t);bn(e,"change",()=>{const i=Array.prototype.filter.call(e.options,a=>a.selected).map(a=>n?Zi(Ps(a)):Ps(a));e[cn](e.multiple?s?new Set(i):i:i[0]),e._assigning=!0,Uh(()=>{e._assigning=!1})}),e[cn]=Sr(r)},mounted(e,{value:t}){pc(e,t)},beforeUpdate(e,t,n){e[cn]=Sr(n)},updated(e,{value:t}){e._assigning||pc(e,t)}};function pc(e,t){const n=e.multiple,r=it(t);if(!(n&&!r&&!Yi(t))){for(let s=0,i=e.options.length;s<i;s++){const a=e.options[s],l=Ps(a);if(n)if(r){const c=typeof l;c==="string"||c==="number"?a.selected=t.some(d=>String(d)===String(l)):a.selected=Zp(t,l)>-1}else a.selected=t.has(l);else if(Zn(Ps(a),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Ps(e){return"_value"in e?e._value:e.value}const i_=["ctrl","shift","alt","meta"],o_={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>i_.some(n=>e[`${n}Key`]&&!t.includes(n))},a_=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let a=0;a<t.length;a++){const l=o_[t[a]];if(l&&l(s,t))return}return e(s,...i)}))},l_=re({patchProp:e_},Ug);let mc;function u_(){return mc||(mc=yg(l_))}const c_=((...e)=>{const t=u_().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=f_(r);if(!s)return;const i=t._component;!lt(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,h_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},t});function h_(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function f_(e){return Lt(e)?document.querySelector(e):e}const d_="/logo.png";var gc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=s&63|128):(s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=s&63|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=s&63|128)}return t},p_=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=e[n++],a=e[n++],l=e[n++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++],a=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},wf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const i=e[s],a=s+1<e.length,l=a?e[s+1]:0,c=s+2<e.length,d=c?e[s+2]:0,h=i>>2,y=(i&3)<<4|l>>4;let T=(l&15)<<2|d>>6,R=d&63;c||(R=64,a||(T=64)),r.push(n[h],n[y],n[T],n[R])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Tf(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):p_(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const i=n[e.charAt(s++)],l=s<e.length?n[e.charAt(s)]:0;++s;const d=s<e.length?n[e.charAt(s)]:64;++s;const y=s<e.length?n[e.charAt(s)]:64;if(++s,i==null||l==null||d==null||y==null)throw new m_;const T=i<<2|l>>4;if(r.push(T),d!==64){const R=l<<4&240|d>>2;if(r.push(R),y!==64){const V=d<<6&192|y;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class m_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const g_=function(e){const t=Tf(e);return wf.encodeByteArray(t,!0)},Mi=function(e){return g_(e).replace(/\./g,"")},__=function(e){try{return wf.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function y_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const v_=()=>y_().__FIREBASE_DEFAULTS__,E_=()=>{if(typeof process>"u"||typeof gc>"u")return;const e=gc.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},T_=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&__(e[1]);return t&&JSON.parse(t)},el=()=>{try{return v_()||E_()||T_()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},w_=e=>{var t,n;return(n=(t=el())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},If=e=>{const t=w_(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},Af=()=>{var e;return(e=el())===null||e===void 0?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
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
 */function bf(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[Mi(JSON.stringify(n)),Mi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function b_(){var e;const t=(e=el())===null||e===void 0?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function R_(){return!b_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function S_(){try{return typeof indexedDB=="object"}catch{return!1}}function P_(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;t(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){t(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_="FirebaseError";class or extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=C_,Object.setPrototypeOf(this,or.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rf.prototype.create)}}class Rf{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?V_(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new or(s,l,r)}}function V_(e,t){return e.replace(x_,(n,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const x_=/\{\$([^}]+)}/g;function ma(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const i=e[s],a=t[s];if(_c(i)&&_c(a)){if(!ma(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function _c(e){return e!==null&&typeof e=="object"}/**
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
 */function Se(e){return e&&e._delegate?e._delegate:e}class Pr{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Wn="[DEFAULT]";/**
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
 */class D_{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new I_;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(N_(t))try{this.getOrInitializeService({instanceIdentifier:Wn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=Wn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Wn){return this.instances.has(t)}getOptions(t=Wn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(t,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(t),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&t(a,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:k_(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Wn){return this.component?this.component.multipleInstances?t:Wn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function k_(e){return e===Wn?void 0:e}function N_(e){return e.instantiationMode==="EAGER"}/**
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
 */class O_{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new D_(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var mt;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(mt||(mt={}));const M_={debug:mt.DEBUG,verbose:mt.VERBOSE,info:mt.INFO,warn:mt.WARN,error:mt.ERROR,silent:mt.SILENT},L_=mt.INFO,F_={[mt.DEBUG]:"log",[mt.VERBOSE]:"log",[mt.INFO]:"info",[mt.WARN]:"warn",[mt.ERROR]:"error"},U_=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),s=F_[t];if(s)console[s](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Sf{constructor(t){this.name=t,this._logLevel=L_,this._logHandler=U_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in mt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?M_[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,mt.DEBUG,...t),this._logHandler(this,mt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,mt.VERBOSE,...t),this._logHandler(this,mt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,mt.INFO,...t),this._logHandler(this,mt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,mt.WARN,...t),this._logHandler(this,mt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,mt.ERROR,...t),this._logHandler(this,mt.ERROR,...t)}}const B_=(e,t)=>t.some(n=>e instanceof n);let yc,vc;function j_(){return yc||(yc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $_(){return vc||(vc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pf=new WeakMap,ga=new WeakMap,Cf=new WeakMap,Qo=new WeakMap,nl=new WeakMap;function q_(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{n(Pn(e.result)),s()},a=()=>{r(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",a)});return t.then(n=>{n instanceof IDBCursor&&Pf.set(n,e)}).catch(()=>{}),nl.set(t,e),t}function K_(e){if(ga.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});ga.set(e,t)}let _a={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ga.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Cf.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Pn(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function H_(e){_a=e(_a)}function z_(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Xo(this),t,...n);return Cf.set(r,t.sort?t.sort():[t]),Pn(r)}:$_().includes(e)?function(...t){return e.apply(Xo(this),t),Pn(Pf.get(this))}:function(...t){return Pn(e.apply(Xo(this),t))}}function W_(e){return typeof e=="function"?z_(e):(e instanceof IDBTransaction&&K_(e),B_(e,j_())?new Proxy(e,_a):e)}function Pn(e){if(e instanceof IDBRequest)return q_(e);if(Qo.has(e))return Qo.get(e);const t=W_(e);return t!==e&&(Qo.set(e,t),nl.set(t,e)),t}const Xo=e=>nl.get(e);function G_(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(e,t),l=Pn(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Pn(a.result),c.oldVersion,c.newVersion,Pn(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Q_=["get","getKey","getAll","getAllKeys","count"],X_=["put","add","delete","clear"],Yo=new Map;function Ec(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Yo.get(t))return Yo.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=X_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Q_.includes(n)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&c.done]))[0]};return Yo.set(t,i),i}H_(e=>({...e,get:(t,n,r)=>Ec(t,n)||e.get(t,n,r),has:(t,n)=>!!Ec(t,n)||e.has(t,n)}));/**
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
 */class Y_{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(J_(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function J_(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ya="@firebase/app",Tc="0.10.13";/**
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
 */const mn=new Sf("@firebase/app"),Z_="@firebase/app-compat",ty="@firebase/analytics-compat",ey="@firebase/analytics",ny="@firebase/app-check-compat",ry="@firebase/app-check",sy="@firebase/auth",iy="@firebase/auth-compat",oy="@firebase/database",ay="@firebase/data-connect",ly="@firebase/database-compat",uy="@firebase/functions",cy="@firebase/functions-compat",hy="@firebase/installations",fy="@firebase/installations-compat",dy="@firebase/messaging",py="@firebase/messaging-compat",my="@firebase/performance",gy="@firebase/performance-compat",_y="@firebase/remote-config",yy="@firebase/remote-config-compat",vy="@firebase/storage",Ey="@firebase/storage-compat",Ty="@firebase/firestore",wy="@firebase/vertexai-preview",Iy="@firebase/firestore-compat",Ay="firebase",by="10.14.1";/**
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
 */const va="[DEFAULT]",Ry={[ya]:"fire-core",[Z_]:"fire-core-compat",[ey]:"fire-analytics",[ty]:"fire-analytics-compat",[ry]:"fire-app-check",[ny]:"fire-app-check-compat",[sy]:"fire-auth",[iy]:"fire-auth-compat",[oy]:"fire-rtdb",[ay]:"fire-data-connect",[ly]:"fire-rtdb-compat",[uy]:"fire-fn",[cy]:"fire-fn-compat",[hy]:"fire-iid",[fy]:"fire-iid-compat",[dy]:"fire-fcm",[py]:"fire-fcm-compat",[my]:"fire-perf",[gy]:"fire-perf-compat",[_y]:"fire-rc",[yy]:"fire-rc-compat",[vy]:"fire-gcs",[Ey]:"fire-gcs-compat",[Ty]:"fire-fst",[Iy]:"fire-fst-compat",[wy]:"fire-vertex","fire-js":"fire-js",[Ay]:"fire-js-all"};/**
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
 */const Li=new Map,Sy=new Map,Ea=new Map;function wc(e,t){try{e.container.addComponent(t)}catch(n){mn.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Cs(e){const t=e.name;if(Ea.has(t))return mn.debug(`There were multiple attempts to register component ${t}.`),!1;Ea.set(t,e);for(const n of Li.values())wc(n,e);for(const n of Sy.values())wc(n,e);return!0}function Vf(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
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
 */const Py={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Cn=new Rf("app","Firebase",Py);/**
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
 */class Cy{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Pr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Cn.create("app-deleted",{appName:this._name})}}/**
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
 */const xf=by;function Df(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:va,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw Cn.create("bad-app-name",{appName:String(s)});if(n||(n=Af()),!n)throw Cn.create("no-options");const i=Li.get(s);if(i){if(ma(n,i.options)&&ma(r,i.config))return i;throw Cn.create("duplicate-app",{appName:s})}const a=new O_(s);for(const c of Ea.values())a.addComponent(c);const l=new Cy(n,r,a);return Li.set(s,l),l}function kf(e=va){const t=Li.get(e);if(!t&&e===va&&Af())return Df();if(!t)throw Cn.create("no-app",{appName:e});return t}function Vn(e,t,n){var r;let s=(r=Ry[e])!==null&&r!==void 0?r:e;n&&(s+=`-${n}`);const i=s.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${t}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),mn.warn(l.join(" "));return}Cs(new Pr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
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
 */const Vy="firebase-heartbeat-database",xy=1,Vs="firebase-heartbeat-store";let Jo=null;function Nf(){return Jo||(Jo=G_(Vy,xy,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Vs)}catch(n){console.warn(n)}}}}).catch(e=>{throw Cn.create("idb-open",{originalErrorMessage:e.message})})),Jo}async function Dy(e){try{const n=(await Nf()).transaction(Vs),r=await n.objectStore(Vs).get(Of(e));return await n.done,r}catch(t){if(t instanceof or)mn.warn(t.message);else{const n=Cn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});mn.warn(n.message)}}}async function Ic(e,t){try{const r=(await Nf()).transaction(Vs,"readwrite");await r.objectStore(Vs).put(t,Of(e)),await r.done}catch(n){if(n instanceof or)mn.warn(n.message);else{const r=Cn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});mn.warn(r.message)}}}function Of(e){return`${e.name}!${e.options.appId}`}/**
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
 */const ky=1024,Ny=720*60*60*1e3;class Oy{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ly(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ac();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Ny}),this._storage.overwrite(this._heartbeatsCache))}catch(r){mn.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ac(),{heartbeatsToSend:r,unsentEntries:s}=My(this._heartbeatsCache.heartbeats),i=Mi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return mn.warn(n),""}}}function Ac(){return new Date().toISOString().substring(0,10)}function My(e,t=ky){const n=[];let r=e.slice();for(const s of e){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),bc(n)>t){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),bc(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ly{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return S_()?P_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Dy(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ic(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ic(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function bc(e){return Mi(JSON.stringify({version:2,heartbeats:e})).length}/**
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
 */function Fy(e){Cs(new Pr("platform-logger",t=>new Y_(t),"PRIVATE")),Cs(new Pr("heartbeat",t=>new Oy(t),"PRIVATE")),Vn(ya,Tc,e),Vn(ya,Tc,"esm2017"),Vn("fire-js","")}Fy("");var Uy="firebase",By="10.14.1";/**
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
 */Vn(Uy,By,"app");var Rc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yn,Mf;(function(){var e;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,g){function p(){}p.prototype=g.prototype,I.D=g.prototype,I.prototype=new p,I.prototype.constructor=I,I.C=function(_,w,b){for(var E=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)E[Nt-2]=arguments[Nt];return g.prototype[w].apply(_,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,p){p||(p=0);var _=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)_[w]=g.charCodeAt(p++)|g.charCodeAt(p++)<<8|g.charCodeAt(p++)<<16|g.charCodeAt(p++)<<24;else for(w=0;16>w;++w)_[w]=g[p++]|g[p++]<<8|g[p++]<<16|g[p++]<<24;g=I.g[0],p=I.g[1],w=I.g[2];var b=I.g[3],E=g+(b^p&(w^b))+_[0]+3614090360&4294967295;g=p+(E<<7&4294967295|E>>>25),E=b+(w^g&(p^w))+_[1]+3905402710&4294967295,b=g+(E<<12&4294967295|E>>>20),E=w+(p^b&(g^p))+_[2]+606105819&4294967295,w=b+(E<<17&4294967295|E>>>15),E=p+(g^w&(b^g))+_[3]+3250441966&4294967295,p=w+(E<<22&4294967295|E>>>10),E=g+(b^p&(w^b))+_[4]+4118548399&4294967295,g=p+(E<<7&4294967295|E>>>25),E=b+(w^g&(p^w))+_[5]+1200080426&4294967295,b=g+(E<<12&4294967295|E>>>20),E=w+(p^b&(g^p))+_[6]+2821735955&4294967295,w=b+(E<<17&4294967295|E>>>15),E=p+(g^w&(b^g))+_[7]+4249261313&4294967295,p=w+(E<<22&4294967295|E>>>10),E=g+(b^p&(w^b))+_[8]+1770035416&4294967295,g=p+(E<<7&4294967295|E>>>25),E=b+(w^g&(p^w))+_[9]+2336552879&4294967295,b=g+(E<<12&4294967295|E>>>20),E=w+(p^b&(g^p))+_[10]+4294925233&4294967295,w=b+(E<<17&4294967295|E>>>15),E=p+(g^w&(b^g))+_[11]+2304563134&4294967295,p=w+(E<<22&4294967295|E>>>10),E=g+(b^p&(w^b))+_[12]+1804603682&4294967295,g=p+(E<<7&4294967295|E>>>25),E=b+(w^g&(p^w))+_[13]+4254626195&4294967295,b=g+(E<<12&4294967295|E>>>20),E=w+(p^b&(g^p))+_[14]+2792965006&4294967295,w=b+(E<<17&4294967295|E>>>15),E=p+(g^w&(b^g))+_[15]+1236535329&4294967295,p=w+(E<<22&4294967295|E>>>10),E=g+(w^b&(p^w))+_[1]+4129170786&4294967295,g=p+(E<<5&4294967295|E>>>27),E=b+(p^w&(g^p))+_[6]+3225465664&4294967295,b=g+(E<<9&4294967295|E>>>23),E=w+(g^p&(b^g))+_[11]+643717713&4294967295,w=b+(E<<14&4294967295|E>>>18),E=p+(b^g&(w^b))+_[0]+3921069994&4294967295,p=w+(E<<20&4294967295|E>>>12),E=g+(w^b&(p^w))+_[5]+3593408605&4294967295,g=p+(E<<5&4294967295|E>>>27),E=b+(p^w&(g^p))+_[10]+38016083&4294967295,b=g+(E<<9&4294967295|E>>>23),E=w+(g^p&(b^g))+_[15]+3634488961&4294967295,w=b+(E<<14&4294967295|E>>>18),E=p+(b^g&(w^b))+_[4]+3889429448&4294967295,p=w+(E<<20&4294967295|E>>>12),E=g+(w^b&(p^w))+_[9]+568446438&4294967295,g=p+(E<<5&4294967295|E>>>27),E=b+(p^w&(g^p))+_[14]+3275163606&4294967295,b=g+(E<<9&4294967295|E>>>23),E=w+(g^p&(b^g))+_[3]+4107603335&4294967295,w=b+(E<<14&4294967295|E>>>18),E=p+(b^g&(w^b))+_[8]+1163531501&4294967295,p=w+(E<<20&4294967295|E>>>12),E=g+(w^b&(p^w))+_[13]+2850285829&4294967295,g=p+(E<<5&4294967295|E>>>27),E=b+(p^w&(g^p))+_[2]+4243563512&4294967295,b=g+(E<<9&4294967295|E>>>23),E=w+(g^p&(b^g))+_[7]+1735328473&4294967295,w=b+(E<<14&4294967295|E>>>18),E=p+(b^g&(w^b))+_[12]+2368359562&4294967295,p=w+(E<<20&4294967295|E>>>12),E=g+(p^w^b)+_[5]+4294588738&4294967295,g=p+(E<<4&4294967295|E>>>28),E=b+(g^p^w)+_[8]+2272392833&4294967295,b=g+(E<<11&4294967295|E>>>21),E=w+(b^g^p)+_[11]+1839030562&4294967295,w=b+(E<<16&4294967295|E>>>16),E=p+(w^b^g)+_[14]+4259657740&4294967295,p=w+(E<<23&4294967295|E>>>9),E=g+(p^w^b)+_[1]+2763975236&4294967295,g=p+(E<<4&4294967295|E>>>28),E=b+(g^p^w)+_[4]+1272893353&4294967295,b=g+(E<<11&4294967295|E>>>21),E=w+(b^g^p)+_[7]+4139469664&4294967295,w=b+(E<<16&4294967295|E>>>16),E=p+(w^b^g)+_[10]+3200236656&4294967295,p=w+(E<<23&4294967295|E>>>9),E=g+(p^w^b)+_[13]+681279174&4294967295,g=p+(E<<4&4294967295|E>>>28),E=b+(g^p^w)+_[0]+3936430074&4294967295,b=g+(E<<11&4294967295|E>>>21),E=w+(b^g^p)+_[3]+3572445317&4294967295,w=b+(E<<16&4294967295|E>>>16),E=p+(w^b^g)+_[6]+76029189&4294967295,p=w+(E<<23&4294967295|E>>>9),E=g+(p^w^b)+_[9]+3654602809&4294967295,g=p+(E<<4&4294967295|E>>>28),E=b+(g^p^w)+_[12]+3873151461&4294967295,b=g+(E<<11&4294967295|E>>>21),E=w+(b^g^p)+_[15]+530742520&4294967295,w=b+(E<<16&4294967295|E>>>16),E=p+(w^b^g)+_[2]+3299628645&4294967295,p=w+(E<<23&4294967295|E>>>9),E=g+(w^(p|~b))+_[0]+4096336452&4294967295,g=p+(E<<6&4294967295|E>>>26),E=b+(p^(g|~w))+_[7]+1126891415&4294967295,b=g+(E<<10&4294967295|E>>>22),E=w+(g^(b|~p))+_[14]+2878612391&4294967295,w=b+(E<<15&4294967295|E>>>17),E=p+(b^(w|~g))+_[5]+4237533241&4294967295,p=w+(E<<21&4294967295|E>>>11),E=g+(w^(p|~b))+_[12]+1700485571&4294967295,g=p+(E<<6&4294967295|E>>>26),E=b+(p^(g|~w))+_[3]+2399980690&4294967295,b=g+(E<<10&4294967295|E>>>22),E=w+(g^(b|~p))+_[10]+4293915773&4294967295,w=b+(E<<15&4294967295|E>>>17),E=p+(b^(w|~g))+_[1]+2240044497&4294967295,p=w+(E<<21&4294967295|E>>>11),E=g+(w^(p|~b))+_[8]+1873313359&4294967295,g=p+(E<<6&4294967295|E>>>26),E=b+(p^(g|~w))+_[15]+4264355552&4294967295,b=g+(E<<10&4294967295|E>>>22),E=w+(g^(b|~p))+_[6]+2734768916&4294967295,w=b+(E<<15&4294967295|E>>>17),E=p+(b^(w|~g))+_[13]+1309151649&4294967295,p=w+(E<<21&4294967295|E>>>11),E=g+(w^(p|~b))+_[4]+4149444226&4294967295,g=p+(E<<6&4294967295|E>>>26),E=b+(p^(g|~w))+_[11]+3174756917&4294967295,b=g+(E<<10&4294967295|E>>>22),E=w+(g^(b|~p))+_[2]+718787259&4294967295,w=b+(E<<15&4294967295|E>>>17),E=p+(b^(w|~g))+_[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(E<<21&4294967295|E>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+b&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var p=g-this.blockSize,_=this.B,w=this.h,b=0;b<g;){if(w==0)for(;b<=p;)s(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<g;)if(_[w++]=I.charCodeAt(b++),w==this.blockSize){s(this,_),w=0;break}}else for(;b<g;)if(_[w++]=I[b++],w==this.blockSize){s(this,_),w=0;break}}this.h=w,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var p=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=p&255,p/=256;for(this.u(I),I=Array(16),g=p=0;4>g;++g)for(var _=0;32>_;_+=8)I[p++]=this.g[g]>>>_&255;return I};function i(I,g){var p=l;return Object.prototype.hasOwnProperty.call(p,I)?p[I]:p[I]=g(I)}function a(I,g){this.h=g;for(var p=[],_=!0,w=I.length-1;0<=w;w--){var b=I[w]|0;_&&b==g||(p[w]=b,_=!1)}this.g=p}var l={};function c(I){return-128<=I&&128>I?i(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return y;if(0>I)return D(d(-I));for(var g=[],p=1,_=0;I>=p;_++)g[_]=I/p|0,p*=4294967296;return new a(g,0)}function h(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return D(h(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=d(Math.pow(g,8)),_=y,w=0;w<I.length;w+=8){var b=Math.min(8,I.length-w),E=parseInt(I.substring(w,w+b),g);8>b?(b=d(Math.pow(g,b)),_=_.j(b).add(d(E))):(_=_.j(p),_=_.add(d(E)))}return _}var y=c(0),T=c(1),R=c(16777216);e=a.prototype,e.m=function(){if(x(this))return-D(this).m();for(var I=0,g=1,p=0;p<this.g.length;p++){var _=this.i(p);I+=(0<=_?_:4294967296+_)*g,g*=4294967296}return I},e.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(V(this))return"0";if(x(this))return"-"+D(this).toString(I);for(var g=d(Math.pow(I,6)),p=this,_="";;){var w=B(p,g).g;p=G(p,w.j(g));var b=((0<p.g.length?p.g[0]:p.h)>>>0).toString(I);if(p=w,V(p))return b+_;for(;6>b.length;)b="0"+b;_=b+_}},e.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function V(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function x(I){return I.h==-1}e.l=function(I){return I=G(this,I),x(I)?-1:V(I)?0:1};function D(I){for(var g=I.g.length,p=[],_=0;_<g;_++)p[_]=~I.g[_];return new a(p,~I.h).add(T)}e.abs=function(){return x(this)?D(this):this},e.add=function(I){for(var g=Math.max(this.g.length,I.g.length),p=[],_=0,w=0;w<=g;w++){var b=_+(this.i(w)&65535)+(I.i(w)&65535),E=(b>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);_=E>>>16,b&=65535,E&=65535,p[w]=E<<16|b}return new a(p,p[p.length-1]&-2147483648?-1:0)};function G(I,g){return I.add(D(g))}e.j=function(I){if(V(this)||V(I))return y;if(x(this))return x(I)?D(this).j(D(I)):D(D(this).j(I));if(x(I))return D(this.j(D(I)));if(0>this.l(R)&&0>I.l(R))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,p=[],_=0;_<2*g;_++)p[_]=0;for(_=0;_<this.g.length;_++)for(var w=0;w<I.g.length;w++){var b=this.i(_)>>>16,E=this.i(_)&65535,Nt=I.i(w)>>>16,ye=I.i(w)&65535;p[2*_+2*w]+=E*ye,z(p,2*_+2*w),p[2*_+2*w+1]+=b*ye,z(p,2*_+2*w+1),p[2*_+2*w+1]+=E*Nt,z(p,2*_+2*w+1),p[2*_+2*w+2]+=b*Nt,z(p,2*_+2*w+2)}for(_=0;_<g;_++)p[_]=p[2*_+1]<<16|p[2*_];for(_=g;_<2*g;_++)p[_]=0;return new a(p,0)};function z(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function W(I,g){this.g=I,this.h=g}function B(I,g){if(V(g))throw Error("division by zero");if(V(I))return new W(y,y);if(x(I))return g=B(D(I),g),new W(D(g.g),D(g.h));if(x(g))return g=B(I,D(g)),new W(D(g.g),g.h);if(30<I.g.length){if(x(I)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var p=T,_=g;0>=_.l(I);)p=ft(p),_=ft(_);var w=_t(p,1),b=_t(_,1);for(_=_t(_,2),p=_t(p,2);!V(_);){var E=b.add(_);0>=E.l(I)&&(w=w.add(p),b=E),_=_t(_,1),p=_t(p,1)}return g=G(I,w.j(g)),new W(w,g)}for(w=y;0<=I.l(g);){for(p=Math.max(1,Math.floor(I.m()/g.m())),_=Math.ceil(Math.log(p)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),b=d(p),E=b.j(g);x(E)||0<E.l(I);)p-=_,b=d(p),E=b.j(g);V(b)&&(b=T),w=w.add(b),I=G(I,E)}return new W(w,I)}e.A=function(I){return B(this,I).h},e.and=function(I){for(var g=Math.max(this.g.length,I.g.length),p=[],_=0;_<g;_++)p[_]=this.i(_)&I.i(_);return new a(p,this.h&I.h)},e.or=function(I){for(var g=Math.max(this.g.length,I.g.length),p=[],_=0;_<g;_++)p[_]=this.i(_)|I.i(_);return new a(p,this.h|I.h)},e.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),p=[],_=0;_<g;_++)p[_]=this.i(_)^I.i(_);return new a(p,this.h^I.h)};function ft(I){for(var g=I.g.length+1,p=[],_=0;_<g;_++)p[_]=I.i(_)<<1|I.i(_-1)>>>31;return new a(p,I.h)}function _t(I,g){var p=g>>5;g%=32;for(var _=I.g.length-p,w=[],b=0;b<_;b++)w[b]=0<g?I.i(b+p)>>>g|I.i(b+p+1)<<32-g:I.i(b+p);return new a(w,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Mf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=h,Yn=a}).apply(typeof Rc<"u"?Rc:typeof self<"u"?self:typeof window<"u"?window:{});var pi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Lf,as,Ff,Ai,Ta,Uf,Bf,jf;(function(){var e,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,f){return o==Array.prototype||o==Object.prototype||(o[u]=f.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof pi=="object"&&pi];for(var u=0;u<o.length;++u){var f=o[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(o,u){if(u)t:{var f=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var S=o[m];if(!(S in f))break t;f=f[S]}o=o[o.length-1],m=f[o],u=u(m),u!=m&&u!=null&&t(f,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var f=0,m=!1,S={next:function(){if(!m&&f<o.length){var P=f++;return{value:u(P,o[P]),done:!1}}return m=!0,{done:!0,value:void 0}}};return S[Symbol.iterator]=function(){return S},S}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function h(o,u,f){return o.call.apply(o.bind,arguments)}function y(o,u,f){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var S=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(S,m),o.apply(u,S)}}return function(){return o.apply(u,arguments)}}function T(o,u,f){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:y,T.apply(null,arguments)}function R(o,u){var f=Array.prototype.slice.call(arguments,1);return function(){var m=f.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function V(o,u){function f(){}f.prototype=u.prototype,o.aa=u.prototype,o.prototype=new f,o.prototype.constructor=o,o.Qb=function(m,S,P){for(var j=Array(arguments.length-2),Rt=2;Rt<arguments.length;Rt++)j[Rt-2]=arguments[Rt];return u.prototype[S].apply(m,j)}}function x(o){const u=o.length;if(0<u){const f=Array(u);for(let m=0;m<u;m++)f[m]=o[m];return f}return[]}function D(o,u){for(let f=1;f<arguments.length;f++){const m=arguments[f];if(c(m)){const S=o.length||0,P=m.length||0;o.length=S+P;for(let j=0;j<P;j++)o[S+j]=m[j]}else o.push(m)}}class G{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function z(o){return/^[\s\xa0]*$/.test(o)}function W(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function B(o){return B[" "](o),o}B[" "]=function(){};var ft=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function _t(o,u,f){for(const m in o)u.call(f,o[m],m,o)}function I(o,u){for(const f in o)u.call(void 0,o[f],f,o)}function g(o){const u={};for(const f in o)u[f]=o[f];return u}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(o,u){let f,m;for(let S=1;S<arguments.length;S++){m=arguments[S];for(f in m)o[f]=m[f];for(let P=0;P<p.length;P++)f=p[P],Object.prototype.hasOwnProperty.call(m,f)&&(o[f]=m[f])}}function w(o){var u=1;o=o.split(":");const f=[];for(;0<u&&o.length;)f.push(o.shift()),u--;return o.length&&f.push(o.join(":")),f}function b(o){l.setTimeout(()=>{throw o},0)}function E(){var o=Pe;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Nt{constructor(){this.h=this.g=null}add(u,f){const m=ye.get();m.set(u,f),this.h?this.h.next=m:this.g=m,this.h=m}}var ye=new G(()=>new Ot,o=>o.reset());class Ot{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let yt,ht=!1,Pe=new Nt,je=()=>{const o=l.Promise.resolve(void 0);yt=()=>{o.then(ke)}};var ke=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(f){b(f)}var u=ye;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ht=!1};function qt(){this.s=this.s,this.C=this.C}qt.prototype.s=!1,qt.prototype.ma=function(){this.s||(this.s=!0,this.N())},qt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Kt(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}Kt.prototype.h=function(){this.defaultPrevented=!0};var wo=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return o})();function Ln(o,u){if(Kt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var f=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ft){t:{try{B(u.nodeName);var S=!0;break t}catch{}S=!1}S||(u=null)}}else f=="mouseover"?u=o.fromElement:f=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Fn[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ln.aa.h.call(this)}}V(Ln,Kt);var Fn={2:"touch",3:"pen",4:"mouse"};Ln.prototype.h=function(){Ln.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var en="closure_listenable_"+(1e6*Math.random()|0),Fr=0;function Gs(o,u,f,m,S){this.listener=o,this.proxy=null,this.src=u,this.type=f,this.capture=!!m,this.ha=S,this.key=++Fr,this.da=this.fa=!1}function $e(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ur(o){this.src=o,this.g={},this.h=0}Ur.prototype.add=function(o,u,f,m,S){var P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);var j=A(o,u,m,S);return-1<j?(u=o[j],f||(u.fa=!1)):(u=new Gs(u,this.src,P,!!m,S),u.fa=f,o.push(u)),u};function v(o,u){var f=u.type;if(f in o.g){var m=o.g[f],S=Array.prototype.indexOf.call(m,u,void 0),P;(P=0<=S)&&Array.prototype.splice.call(m,S,1),P&&($e(u),o.g[f].length==0&&(delete o.g[f],o.h--))}}function A(o,u,f,m){for(var S=0;S<o.length;++S){var P=o[S];if(!P.da&&P.listener==u&&P.capture==!!f&&P.ha==m)return S}return-1}var C="closure_lm_"+(1e6*Math.random()|0),L={};function k(o,u,f,m,S){if(Array.isArray(u)){for(var P=0;P<u.length;P++)k(o,u[P],f,m,S);return null}return f=et(f),o&&o[en]?o.K(u,f,d(m)?!!m.capture:!1,S):M(o,u,f,!1,m,S)}function M(o,u,f,m,S,P){if(!u)throw Error("Invalid event type");var j=d(S)?!!S.capture:!!S,Rt=H(o);if(Rt||(o[C]=Rt=new Ur(o)),f=Rt.add(u,f,m,j,P),f.proxy)return f;if(m=K(),f.proxy=m,m.src=o,m.listener=f,o.addEventListener)wo||(S=j),S===void 0&&(S=!1),o.addEventListener(u.toString(),m,S);else if(o.attachEvent)o.attachEvent(O(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return f}function K(){function o(f){return u.call(o.src,o.listener,f)}const u=Z;return o}function $(o,u,f,m,S){if(Array.isArray(u))for(var P=0;P<u.length;P++)$(o,u[P],f,m,S);else m=d(m)?!!m.capture:!!m,f=et(f),o&&o[en]?(o=o.i,u=String(u).toString(),u in o.g&&(P=o.g[u],f=A(P,f,m,S),-1<f&&($e(P[f]),Array.prototype.splice.call(P,f,1),P.length==0&&(delete o.g[u],o.h--)))):o&&(o=H(o))&&(u=o.g[u.toString()],o=-1,u&&(o=A(u,f,m,S)),(f=-1<o?u[o]:null)&&U(f))}function U(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[en])v(u.i,o);else{var f=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(f,m,o.capture):u.detachEvent?u.detachEvent(O(f),m):u.addListener&&u.removeListener&&u.removeListener(m),(f=H(u))?(v(f,o),f.h==0&&(f.src=null,u[C]=null)):$e(o)}}}function O(o){return o in L?L[o]:L[o]="on"+o}function Z(o,u){if(o.da)o=!0;else{u=new Ln(u,this);var f=o.listener,m=o.ha||o.src;o.fa&&U(o),o=f.call(m,u)}return o}function H(o){return o=o[C],o instanceof Ur?o:null}var Y="__closure_events_fn_"+(1e9*Math.random()>>>0);function et(o){return typeof o=="function"?o:(o[Y]||(o[Y]=function(u){return o.handleEvent(u)}),o[Y])}function nt(){qt.call(this),this.i=new Ur(this),this.M=this,this.F=null}V(nt,qt),nt.prototype[en]=!0,nt.prototype.removeEventListener=function(o,u,f,m){$(this,o,u,f,m)};function at(o,u){var f,m=o.F;if(m)for(f=[];m;m=m.F)f.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new Kt(u,o);else if(u instanceof Kt)u.target=u.target||o;else{var S=u;u=new Kt(m,o),_(u,S)}if(S=!0,f)for(var P=f.length-1;0<=P;P--){var j=u.g=f[P];S=Tt(j,m,!0,u)&&S}if(j=u.g=o,S=Tt(j,m,!0,u)&&S,S=Tt(j,m,!1,u)&&S,f)for(P=0;P<f.length;P++)j=u.g=f[P],S=Tt(j,m,!1,u)&&S}nt.prototype.N=function(){if(nt.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var f=o.g[u],m=0;m<f.length;m++)$e(f[m]);delete o.g[u],o.h--}}this.F=null},nt.prototype.K=function(o,u,f,m){return this.i.add(String(o),u,!1,f,m)},nt.prototype.L=function(o,u,f,m){return this.i.add(String(o),u,!0,f,m)};function Tt(o,u,f,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var S=!0,P=0;P<u.length;++P){var j=u[P];if(j&&!j.da&&j.capture==f){var Rt=j.listener,Yt=j.ha||j.src;j.fa&&v(o.i,j),S=Rt.call(Yt,m)!==!1&&S}}return S&&!m.defaultPrevented}function Dt(o,u,f){if(typeof o=="function")f&&(o=T(o,f));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function jt(o){o.g=Dt(()=>{o.g=null,o.i&&(o.i=!1,jt(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Ce extends qt{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:jt(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ie(o){qt.call(this),this.h=o,this.g={}}V(ie,qt);var vn=[];function Br(o){_t(o.g,function(u,f){this.g.hasOwnProperty(f)&&U(u)},o),o.g={}}ie.prototype.N=function(){ie.aa.N.call(this),Br(this)},ie.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xt=l.JSON.stringify,Ve=l.JSON.parse,Qs=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function ur(){}ur.prototype.h=null;function Kl(o){return o.h||(o.h=o.i())}function Hl(){}var jr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Io(){Kt.call(this,"d")}V(Io,Kt);function Ao(){Kt.call(this,"c")}V(Ao,Kt);var Un={},zl=null;function Xs(){return zl=zl||new nt}Un.La="serverreachability";function Wl(o){Kt.call(this,Un.La,o)}V(Wl,Kt);function $r(o){const u=Xs();at(u,new Wl(u))}Un.STAT_EVENT="statevent";function Gl(o,u){Kt.call(this,Un.STAT_EVENT,o),this.stat=u}V(Gl,Kt);function fe(o){const u=Xs();at(u,new Gl(u,o))}Un.Ma="timingevent";function Ql(o,u){Kt.call(this,Un.Ma,o),this.size=u}V(Ql,Kt);function qr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function Kr(){this.g=!0}Kr.prototype.xa=function(){this.g=!1};function vp(o,u,f,m,S,P){o.info(function(){if(o.g)if(P)for(var j="",Rt=P.split("&"),Yt=0;Yt<Rt.length;Yt++){var vt=Rt[Yt].split("=");if(1<vt.length){var oe=vt[0];vt=vt[1];var ae=oe.split("_");j=2<=ae.length&&ae[1]=="type"?j+(oe+"="+vt+"&"):j+(oe+"=redacted&")}}else j=null;else j=P;return"XMLHTTP REQ ("+m+") [attempt "+S+"]: "+u+`
`+f+`
`+j})}function Ep(o,u,f,m,S,P,j){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+S+"]: "+u+`
`+f+`
`+P+" "+j})}function cr(o,u,f,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+wp(o,f)+(m?" "+m:"")})}function Tp(o,u){o.info(function(){return"TIMEOUT: "+u})}Kr.prototype.info=function(){};function wp(o,u){if(!o.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(o=0;o<f.length;o++)if(Array.isArray(f[o])){var m=f[o];if(!(2>m.length)){var S=m[1];if(Array.isArray(S)&&!(1>S.length)){var P=S[0];if(P!="noop"&&P!="stop"&&P!="close")for(var j=1;j<S.length;j++)S[j]=""}}}}return Xt(f)}catch{return u}}var Ys={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Xl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},bo;function Js(){}V(Js,ur),Js.prototype.g=function(){return new XMLHttpRequest},Js.prototype.i=function(){return{}},bo=new Js;function En(o,u,f,m){this.j=o,this.i=u,this.l=f,this.R=m||1,this.U=new ie(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Yl}function Yl(){this.i=null,this.g="",this.h=!1}var Jl={},Ro={};function So(o,u,f){o.L=1,o.v=ni(nn(u)),o.m=f,o.P=!0,Zl(o,null)}function Zl(o,u){o.F=Date.now(),Zs(o),o.A=nn(o.v);var f=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),du(f.i,"t",m),o.C=0,f=o.j.J,o.h=new Yl,o.g=xu(o.j,f?u:null,!o.m),0<o.O&&(o.M=new Ce(T(o.Y,o,o.g),o.O)),u=o.U,f=o.g,m=o.ca;var S="readystatechange";Array.isArray(S)||(S&&(vn[0]=S.toString()),S=vn);for(var P=0;P<S.length;P++){var j=k(f,S[P],m||u.handleEvent,!1,u.h||u);if(!j)break;u.g[j.key]=j}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),$r(),vp(o.i,o.u,o.A,o.l,o.R,o.m)}En.prototype.ca=function(o){o=o.target;const u=this.M;u&&rn(o)==3?u.j():this.Y(o)},En.prototype.Y=function(o){try{if(o==this.g)t:{const ae=rn(this.g);var u=this.g.Ba();const dr=this.g.Z();if(!(3>ae)&&(ae!=3||this.g&&(this.h.h||this.g.oa()||Eu(this.g)))){this.J||ae!=4||u==7||(u==8||0>=dr?$r(3):$r(2)),Po(this);var f=this.g.Z();this.X=f;e:if(tu(this)){var m=Eu(this.g);o="";var S=m.length,P=rn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Bn(this),Hr(this);var j="";break e}this.h.i=new l.TextDecoder}for(u=0;u<S;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(P&&u==S-1)});m.length=0,this.h.g+=o,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=f==200,Ep(this.i,this.u,this.A,this.l,this.R,ae,f),this.o){if(this.T&&!this.K){e:{if(this.g){var Rt,Yt=this.g;if((Rt=Yt.g?Yt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(Rt)){var vt=Rt;break e}}vt=null}if(f=vt)cr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Co(this,f);else{this.o=!1,this.s=3,fe(12),Bn(this),Hr(this);break t}}if(this.P){f=!0;let Ne;for(;!this.J&&this.C<j.length;)if(Ne=Ip(this,j),Ne==Ro){ae==4&&(this.s=4,fe(14),f=!1),cr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ne==Jl){this.s=4,fe(15),cr(this.i,this.l,j,"[Invalid Chunk]"),f=!1;break}else cr(this.i,this.l,Ne,null),Co(this,Ne);if(tu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ae!=4||j.length!=0||this.h.h||(this.s=1,fe(16),f=!1),this.o=this.o&&f,!f)cr(this.i,this.l,j,"[Invalid Chunked Response]"),Bn(this),Hr(this);else if(0<j.length&&!this.W){this.W=!0;var oe=this.j;oe.g==this&&oe.ba&&!oe.M&&(oe.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),Oo(oe),oe.M=!0,fe(11))}}else cr(this.i,this.l,j,null),Co(this,j);ae==4&&Bn(this),this.o&&!this.J&&(ae==4?Su(this.j,this):(this.o=!1,Zs(this)))}else Bp(this.g),f==400&&0<j.indexOf("Unknown SID")?(this.s=3,fe(12)):(this.s=0,fe(13)),Bn(this),Hr(this)}}}catch{}finally{}};function tu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Ip(o,u){var f=o.C,m=u.indexOf(`
`,f);return m==-1?Ro:(f=Number(u.substring(f,m)),isNaN(f)?Jl:(m+=1,m+f>u.length?Ro:(u=u.slice(m,m+f),o.C=m+f,u)))}En.prototype.cancel=function(){this.J=!0,Bn(this)};function Zs(o){o.S=Date.now()+o.I,eu(o,o.I)}function eu(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=qr(T(o.ba,o),u)}function Po(o){o.B&&(l.clearTimeout(o.B),o.B=null)}En.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Tp(this.i,this.A),this.L!=2&&($r(),fe(17)),Bn(this),this.s=2,Hr(this)):eu(this,this.S-o)};function Hr(o){o.j.G==0||o.J||Su(o.j,o)}function Bn(o){Po(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Br(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Co(o,u){try{var f=o.j;if(f.G!=0&&(f.g==o||Vo(f.h,o))){if(!o.K&&Vo(f.h,o)&&f.G==3){try{var m=f.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var S=m;if(S[0]==0){t:if(!f.u){if(f.g)if(f.g.F+3e3<o.F)li(f),oi(f);else break t;No(f),fe(18)}}else f.za=S[1],0<f.za-f.T&&37500>S[2]&&f.F&&f.v==0&&!f.C&&(f.C=qr(T(f.Za,f),6e3));if(1>=su(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else $n(f,11)}else if((o.K||f.g==o)&&li(f),!z(u))for(S=f.Da.g.parse(u),u=0;u<S.length;u++){let vt=S[u];if(f.T=vt[0],vt=vt[1],f.G==2)if(vt[0]=="c"){f.K=vt[1],f.ia=vt[2];const oe=vt[3];oe!=null&&(f.la=oe,f.j.info("VER="+f.la));const ae=vt[4];ae!=null&&(f.Aa=ae,f.j.info("SVER="+f.Aa));const dr=vt[5];dr!=null&&typeof dr=="number"&&0<dr&&(m=1.5*dr,f.L=m,f.j.info("backChannelRequestTimeoutMs_="+m)),m=f;const Ne=o.g;if(Ne){const ci=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ci){var P=m.h;P.g||ci.indexOf("spdy")==-1&&ci.indexOf("quic")==-1&&ci.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(xo(P,P.h),P.h=null))}if(m.D){const Mo=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;Mo&&(m.ya=Mo,Vt(m.I,m.D,Mo))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-o.F,f.j.info("Handshake RTT: "+f.R+"ms")),m=f;var j=o;if(m.qa=Vu(m,m.J?m.ia:null,m.W),j.K){iu(m.h,j);var Rt=j,Yt=m.L;Yt&&(Rt.I=Yt),Rt.B&&(Po(Rt),Zs(Rt)),m.g=j}else bu(m);0<f.i.length&&ai(f)}else vt[0]!="stop"&&vt[0]!="close"||$n(f,7);else f.G==3&&(vt[0]=="stop"||vt[0]=="close"?vt[0]=="stop"?$n(f,7):ko(f):vt[0]!="noop"&&f.l&&f.l.ta(vt),f.v=0)}}$r(4)}catch{}}var Ap=class{constructor(o,u){this.g=o,this.map=u}};function nu(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ru(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function su(o){return o.h?1:o.g?o.g.size:0}function Vo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function xo(o,u){o.g?o.g.add(u):o.h=u}function iu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}nu.prototype.cancel=function(){if(this.i=ou(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ou(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const f of o.g.values())u=u.concat(f.D);return u}return x(o.i)}function bp(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],f=o.length,m=0;m<f;m++)u.push(o[m]);return u}u=[],f=0;for(m in o)u[f++]=o[m];return u}function Rp(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var f=0;f<o;f++)u.push(f);return u}u=[],f=0;for(const m in o)u[f++]=m;return u}}}function au(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var f=Rp(o),m=bp(o),S=m.length,P=0;P<S;P++)u.call(void 0,m[P],f&&f[P],o)}var lu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Sp(o,u){if(o){o=o.split("&");for(var f=0;f<o.length;f++){var m=o[f].indexOf("="),S=null;if(0<=m){var P=o[f].substring(0,m);S=o[f].substring(m+1)}else P=o[f];u(P,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function jn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof jn){this.h=o.h,ti(this,o.j),this.o=o.o,this.g=o.g,ei(this,o.s),this.l=o.l;var u=o.i,f=new Gr;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),uu(this,f),this.m=o.m}else o&&(u=String(o).match(lu))?(this.h=!1,ti(this,u[1]||"",!0),this.o=zr(u[2]||""),this.g=zr(u[3]||"",!0),ei(this,u[4]),this.l=zr(u[5]||"",!0),uu(this,u[6]||"",!0),this.m=zr(u[7]||"")):(this.h=!1,this.i=new Gr(null,this.h))}jn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Wr(u,cu,!0),":");var f=this.g;return(f||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Wr(u,cu,!0),"@"),o.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&o.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(Wr(f,f.charAt(0)=="/"?Vp:Cp,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",Wr(f,Dp)),o.join("")};function nn(o){return new jn(o)}function ti(o,u,f){o.j=f?zr(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function ei(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function uu(o,u,f){u instanceof Gr?(o.i=u,kp(o.i,o.h)):(f||(u=Wr(u,xp)),o.i=new Gr(u,o.h))}function Vt(o,u,f){o.i.set(u,f)}function ni(o){return Vt(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function zr(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Wr(o,u,f){return typeof o=="string"?(o=encodeURI(o).replace(u,Pp),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var cu=/[#\/\?@]/g,Cp=/[#\?:]/g,Vp=/[#\?]/g,xp=/[#\?@]/g,Dp=/#/g;function Gr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Tn(o){o.g||(o.g=new Map,o.h=0,o.i&&Sp(o.i,function(u,f){o.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}e=Gr.prototype,e.add=function(o,u){Tn(this),this.i=null,o=hr(this,o);var f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(u),this.h+=1,this};function hu(o,u){Tn(o),u=hr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function fu(o,u){return Tn(o),u=hr(o,u),o.g.has(u)}e.forEach=function(o,u){Tn(this),this.g.forEach(function(f,m){f.forEach(function(S){o.call(u,S,m,this)},this)},this)},e.na=function(){Tn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let m=0;m<u.length;m++){const S=o[m];for(let P=0;P<S.length;P++)f.push(u[m])}return f},e.V=function(o){Tn(this);let u=[];if(typeof o=="string")fu(this,o)&&(u=u.concat(this.g.get(hr(this,o))));else{o=Array.from(this.g.values());for(let f=0;f<o.length;f++)u=u.concat(o[f])}return u},e.set=function(o,u){return Tn(this),this.i=null,o=hr(this,o),fu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},e.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function du(o,u,f){hu(o,u),0<f.length&&(o.i=null,o.g.set(hr(o,u),x(f)),o.h+=f.length)}e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var m=u[f];const P=encodeURIComponent(String(m)),j=this.V(m);for(m=0;m<j.length;m++){var S=P;j[m]!==""&&(S+="="+encodeURIComponent(String(j[m]))),o.push(S)}}return this.i=o.join("&")};function hr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function kp(o,u){u&&!o.j&&(Tn(o),o.i=null,o.g.forEach(function(f,m){var S=m.toLowerCase();m!=S&&(hu(this,m),du(this,S,f))},o)),o.j=u}function Np(o,u){const f=new Kr;if(l.Image){const m=new Image;m.onload=R(wn,f,"TestLoadImage: loaded",!0,u,m),m.onerror=R(wn,f,"TestLoadImage: error",!1,u,m),m.onabort=R(wn,f,"TestLoadImage: abort",!1,u,m),m.ontimeout=R(wn,f,"TestLoadImage: timeout",!1,u,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Op(o,u){const f=new Kr,m=new AbortController,S=setTimeout(()=>{m.abort(),wn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(P=>{clearTimeout(S),P.ok?wn(f,"TestPingServer: ok",!0,u):wn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(S),wn(f,"TestPingServer: error",!1,u)})}function wn(o,u,f,m,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),m(f)}catch{}}function Mp(){this.g=new Qs}function Lp(o,u,f){const m=f||"";try{au(o,function(S,P){let j=S;d(S)&&(j=Xt(S)),u.push(m+P+"="+encodeURIComponent(j))})}catch(S){throw u.push(m+"type="+encodeURIComponent("_badmap")),S}}function ri(o){this.l=o.Ub||null,this.j=o.eb||!1}V(ri,ur),ri.prototype.g=function(){return new si(this.l,this.j)},ri.prototype.i=(function(o){return function(){return o}})({});function si(o,u){nt.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(si,nt),e=si.prototype,e.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Xr(this)},e.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Qr(this)),this.readyState=0},e.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Xr(this)),this.g&&(this.readyState=3,Xr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;pu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function pu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}e.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Qr(this):Xr(this),this.readyState==3&&pu(this)}},e.Ra=function(o){this.g&&(this.response=this.responseText=o,Qr(this))},e.Qa=function(o){this.g&&(this.response=o,Qr(this))},e.ga=function(){this.g&&Qr(this)};function Qr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Xr(o)}e.setRequestHeader=function(o,u){this.u.append(o,u)},e.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=u.next();return o.join(`\r
`)};function Xr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(si.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function mu(o){let u="";return _t(o,function(f,m){u+=m,u+=":",u+=f,u+=`\r
`}),u}function Do(o,u,f){t:{for(m in f){var m=!1;break t}m=!0}m||(f=mu(f),typeof o=="string"?f!=null&&encodeURIComponent(String(f)):Vt(o,u,f))}function Mt(o){nt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(Mt,nt);var Fp=/^https?$/i,Up=["POST","PUT"];e=Mt.prototype,e.Ha=function(o){this.J=o},e.ea=function(o,u,f,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():bo.g(),this.v=this.o?Kl(this.o):Kl(bo),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(P){gu(this,P);return}if(o=f||"",f=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var S in m)f.set(S,m[S]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())f.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),S=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Up,u,void 0))||m||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,j]of f)this.g.setRequestHeader(P,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{vu(this),this.u=!0,this.g.send(o),this.u=!1}catch(P){gu(this,P)}};function gu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,_u(o),ii(o)}function _u(o){o.A||(o.A=!0,at(o,"complete"),at(o,"error"))}e.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,at(this,"complete"),at(this,"abort"),ii(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ii(this,!0)),Mt.aa.N.call(this)},e.Ea=function(){this.s||(this.B||this.u||this.j?yu(this):this.bb())},e.bb=function(){yu(this)};function yu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||rn(o)!=4||o.Z()!=2)){if(o.u&&rn(o)==4)Dt(o.Ea,0,o);else if(at(o,"readystatechange"),rn(o)==4){o.h=!1;try{const j=o.Z();t:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var f;if(!(f=u)){var m;if(m=j===0){var S=String(o.D).match(lu)[1]||null;!S&&l.self&&l.self.location&&(S=l.self.location.protocol.slice(0,-1)),m=!Fp.test(S?S.toLowerCase():"")}f=m}if(f)at(o,"complete"),at(o,"success");else{o.m=6;try{var P=2<rn(o)?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.Z()+"]",_u(o)}}finally{ii(o)}}}}function ii(o,u){if(o.g){vu(o);const f=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||at(o,"ready");try{f.onreadystatechange=m}catch{}}}function vu(o){o.I&&(l.clearTimeout(o.I),o.I=null)}e.isActive=function(){return!!this.g};function rn(o){return o.g?o.g.readyState:0}e.Z=function(){try{return 2<rn(this)?this.g.status:-1}catch{return-1}},e.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},e.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Ve(u)}};function Eu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Bp(o){const u={};o=(o.g&&2<=rn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(z(o[m]))continue;var f=w(o[m]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=u[S]||[];u[S]=P,P.push(f)}I(u,function(m){return m.join(", ")})}e.Ba=function(){return this.m},e.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Yr(o,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||u}function Tu(o){this.Aa=0,this.i=[],this.j=new Kr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Yr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Yr("baseRetryDelayMs",5e3,o),this.cb=Yr("retryDelaySeedMs",1e4,o),this.Wa=Yr("forwardChannelMaxRetries",2,o),this.wa=Yr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new nu(o&&o.concurrentRequestLimit),this.Da=new Mp,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}e=Tu.prototype,e.la=8,e.G=1,e.connect=function(o,u,f,m){fe(0),this.W=o,this.H=u||{},f&&m!==void 0&&(this.H.OSID=f,this.H.OAID=m),this.F=this.X,this.I=Vu(this,null,this.W),ai(this)};function ko(o){if(wu(o),o.G==3){var u=o.U++,f=nn(o.I);if(Vt(f,"SID",o.K),Vt(f,"RID",u),Vt(f,"TYPE","terminate"),Jr(o,f),u=new En(o,o.j,u),u.L=2,u.v=ni(nn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=xu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Zs(u)}Cu(o)}function oi(o){o.g&&(Oo(o),o.g.cancel(),o.g=null)}function wu(o){oi(o),o.u&&(l.clearTimeout(o.u),o.u=null),li(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ai(o){if(!ru(o.h)&&!o.s){o.s=!0;var u=o.Ga;yt||je(),ht||(yt(),ht=!0),Pe.add(u,o),o.B=0}}function jp(o,u){return su(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=qr(T(o.Ga,o,u),Pu(o,o.B)),o.B++,!0)}e.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const S=new En(this,this.j,o);let P=this.o;if(this.S&&(P?(P=g(P),_(P,this.S)):P=this.S),this.m!==null||this.O||(S.H=P,P=null),this.P)t:{for(var u=0,f=0;f<this.i.length;f++){e:{var m=this.i[f];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=f;break t}if(u===4096||f===this.i.length-1){u=f+1;break t}}u=1e3}else u=1e3;u=Au(this,S,u),f=nn(this.I),Vt(f,"RID",o),Vt(f,"CVER",22),this.D&&Vt(f,"X-HTTP-Session-Id",this.D),Jr(this,f),P&&(this.O?u="headers="+encodeURIComponent(String(mu(P)))+"&"+u:this.m&&Do(f,this.m,P)),xo(this.h,S),this.Ua&&Vt(f,"TYPE","init"),this.P?(Vt(f,"$req",u),Vt(f,"SID","null"),S.T=!0,So(S,f,null)):So(S,f,u),this.G=2}}else this.G==3&&(o?Iu(this,o):this.i.length==0||ru(this.h)||Iu(this))};function Iu(o,u){var f;u?f=u.l:f=o.U++;const m=nn(o.I);Vt(m,"SID",o.K),Vt(m,"RID",f),Vt(m,"AID",o.T),Jr(o,m),o.m&&o.o&&Do(m,o.m,o.o),f=new En(o,o.j,f,o.B+1),o.m===null&&(f.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Au(o,f,1e3),f.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),xo(o.h,f),So(f,m,u)}function Jr(o,u){o.H&&_t(o.H,function(f,m){Vt(u,m,f)}),o.l&&au({},function(f,m){Vt(u,m,f)})}function Au(o,u,f){f=Math.min(o.i.length,f);var m=o.l?T(o.l.Na,o.l,o):null;t:{var S=o.i;let P=-1;for(;;){const j=["count="+f];P==-1?0<f?(P=S[0].g,j.push("ofs="+P)):P=0:j.push("ofs="+P);let Rt=!0;for(let Yt=0;Yt<f;Yt++){let vt=S[Yt].g;const oe=S[Yt].map;if(vt-=P,0>vt)P=Math.max(0,S[Yt].g-100),Rt=!1;else try{Lp(oe,j,"req"+vt+"_")}catch{m&&m(oe)}}if(Rt){m=j.join("&");break t}}}return o=o.i.splice(0,f),u.D=o,m}function bu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;yt||je(),ht||(yt(),ht=!0),Pe.add(u,o),o.v=0}}function No(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=qr(T(o.Fa,o),Pu(o,o.v)),o.v++,!0)}e.Fa=function(){if(this.u=null,Ru(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=qr(T(this.ab,this),o)}},e.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,fe(10),oi(this),Ru(this))};function Oo(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Ru(o){o.g=new En(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=nn(o.qa);Vt(u,"RID","rpc"),Vt(u,"SID",o.K),Vt(u,"AID",o.T),Vt(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Vt(u,"TO",o.ja),Vt(u,"TYPE","xmlhttp"),Jr(o,u),o.m&&o.o&&Do(u,o.m,o.o),o.L&&(o.g.I=o.L);var f=o.g;o=o.ia,f.L=1,f.v=ni(nn(u)),f.m=null,f.P=!0,Zl(f,o)}e.Za=function(){this.C!=null&&(this.C=null,oi(this),No(this),fe(19))};function li(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Su(o,u){var f=null;if(o.g==u){li(o),Oo(o),o.g=null;var m=2}else if(Vo(o.h,u))f=u.D,iu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var S=o.B;m=Xs(),at(m,new Ql(m,f)),ai(o)}else bu(o);else if(S=u.s,S==3||S==0&&0<u.X||!(m==1&&jp(o,u)||m==2&&No(o)))switch(f&&0<f.length&&(u=o.h,u.i=u.i.concat(f)),S){case 1:$n(o,5);break;case 4:$n(o,10);break;case 3:$n(o,6);break;default:$n(o,2)}}}function Pu(o,u){let f=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(f*=2),f*u}function $n(o,u){if(o.j.info("Error code "+u),u==2){var f=T(o.fb,o),m=o.Xa;const S=!m;m=new jn(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ti(m,"https"),ni(m),S?Np(m.toString(),f):Op(m.toString(),f)}else fe(2);o.G=0,o.l&&o.l.sa(u),Cu(o),wu(o)}e.fb=function(o){o?(this.j.info("Successfully pinged google.com"),fe(2)):(this.j.info("Failed to ping google.com"),fe(1))};function Cu(o){if(o.G=0,o.ka=[],o.l){const u=ou(o.h);(u.length!=0||o.i.length!=0)&&(D(o.ka,u),D(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function Vu(o,u,f){var m=f instanceof jn?nn(f):new jn(f);if(m.g!="")u&&(m.g=u+"."+m.g),ei(m,m.s);else{var S=l.location;m=S.protocol,u=u?u+"."+S.hostname:S.hostname,S=+S.port;var P=new jn(null);m&&ti(P,m),u&&(P.g=u),S&&ei(P,S),f&&(P.l=f),m=P}return f=o.D,u=o.ya,f&&u&&Vt(m,f,u),Vt(m,"VER",o.la),Jr(o,m),m}function xu(o,u,f){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Mt(new ri({eb:f})):new Mt(o.pa),u.Ha(o.J),u}e.isActive=function(){return!!this.l&&this.l.isActive(this)};function Du(){}e=Du.prototype,e.ua=function(){},e.ta=function(){},e.sa=function(){},e.ra=function(){},e.isActive=function(){return!0},e.Na=function(){};function ui(){}ui.prototype.g=function(o,u){return new Te(o,u)};function Te(o,u){nt.call(this),this.g=new Tu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!z(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!z(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new fr(this)}V(Te,nt),Te.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Te.prototype.close=function(){ko(this.g)},Te.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.u&&(f={},f.__data__=Xt(o),o=f);u.i.push(new Ap(u.Ya++,o)),u.G==3&&ai(u)},Te.prototype.N=function(){this.g.l=null,delete this.j,ko(this.g),delete this.g,Te.aa.N.call(this)};function ku(o){Io.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(const f in u){o=f;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}V(ku,Io);function Nu(){Ao.call(this),this.status=1}V(Nu,Ao);function fr(o){this.g=o}V(fr,Du),fr.prototype.ua=function(){at(this.g,"a")},fr.prototype.ta=function(o){at(this.g,new ku(o))},fr.prototype.sa=function(o){at(this.g,new Nu)},fr.prototype.ra=function(){at(this.g,"b")},ui.prototype.createWebChannel=ui.prototype.g,Te.prototype.send=Te.prototype.o,Te.prototype.open=Te.prototype.m,Te.prototype.close=Te.prototype.close,jf=function(){return new ui},Bf=function(){return Xs()},Uf=Un,Ta={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ys.NO_ERROR=0,Ys.TIMEOUT=8,Ys.HTTP_ERROR=6,Ai=Ys,Xl.COMPLETE="complete",Ff=Xl,Hl.EventType=jr,jr.OPEN="a",jr.CLOSE="b",jr.ERROR="c",jr.MESSAGE="d",nt.prototype.listen=nt.prototype.K,as=Hl,Mt.prototype.listenOnce=Mt.prototype.L,Mt.prototype.getLastError=Mt.prototype.Ka,Mt.prototype.getLastErrorCode=Mt.prototype.Ba,Mt.prototype.getStatus=Mt.prototype.Z,Mt.prototype.getResponseJson=Mt.prototype.Oa,Mt.prototype.getResponseText=Mt.prototype.oa,Mt.prototype.send=Mt.prototype.ea,Mt.prototype.setWithCredentials=Mt.prototype.Ha,Lf=Mt}).apply(typeof pi<"u"?pi:typeof self<"u"?self:typeof window<"u"?window:{});const Sc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}ue.UNAUTHENTICATED=new ue(null),ue.GOOGLE_CREDENTIALS=new ue("google-credentials-uid"),ue.FIRST_PARTY=new ue("first-party-uid"),ue.MOCK_USER=new ue("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Or="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr=new Sf("@firebase/firestore");function es(){return tr.logLevel}function Q(e,...t){if(tr.logLevel<=mt.DEBUG){const n=t.map(rl);tr.debug(`Firestore (${Or}): ${e}`,...n)}}function gn(e,...t){if(tr.logLevel<=mt.ERROR){const n=t.map(rl);tr.error(`Firestore (${Or}): ${e}`,...n)}}function Cr(e,...t){if(tr.logLevel<=mt.WARN){const n=t.map(rl);tr.warn(`Firestore (${Or}): ${e}`,...n)}}function rl(e){if(typeof e=="string")return e;try{/**
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
 */function rt(e="Unexpected state"){const t=`FIRESTORE (${Or}) INTERNAL ASSERTION FAILED: `+e;throw gn(t),new Error(t)}function gt(e,t){e||rt()}function ot(e,t){return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends or{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(){this.promise=new Promise(((t,n)=>{this.resolve=t,this.reject=n}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class jy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable((()=>n(ue.UNAUTHENTICATED)))}shutdown(){}}class $y{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,n){this.changeListener=n,t.enqueueRetryable((()=>n(this.token.user)))}shutdown(){this.changeListener=null}}class qy{constructor(t){this.t=t,this.currentUser=ue.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){gt(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new hn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new hn,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},l=c=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new hn)}}),0),a()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then((r=>this.i!==t?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(gt(typeof r.accessToken=="string"),new $f(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return gt(t===null||typeof t=="string"),new ue(t)}}class Ky{constructor(t,n,r){this.l=t,this.h=n,this.P=r,this.type="FirstParty",this.user=ue.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Hy{constructor(t,n,r){this.l=t,this.h=n,this.P=r}getToken(){return Promise.resolve(new Ky(this.l,this.h,this.P))}start(t,n){t.enqueueRetryable((()=>n(ue.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class zy{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Wy{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,n){gt(this.o===void 0);const r=i=>{i.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((n=>n?(gt(typeof n.token=="string"),this.R=n.token,new zy(n.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Gy(e){const t=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=Gy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=t.charAt(s[i]%t.length))}return r}}function Et(e,t){return e<t?-1:e>t?1:0}function Vr(e,t,n){return e.length===t.length&&e.every(((r,s)=>n(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new X(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new X(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new X(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Wt.fromMillis(Date.now())}static fromDate(t){return Wt.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*n));return new Wt(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Et(this.nanoseconds,t.nanoseconds):Et(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(t){this.timestamp=t}static fromTimestamp(t){return new st(t)}static min(){return new st(new Wt(0,0))}static max(){return new st(new Wt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(t,n,r){n===void 0?n=0:n>t.length&&rt(),r===void 0?r=t.length-n:r>t.length-n&&rt(),this.segments=t,this.offset=n,this.len=r}get length(){return this.len}isEqual(t){return xs.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof xs?t.forEach((r=>{n.push(r)})):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,r=this.limit();n<r;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const r=Math.min(t.length,n.length);for(let s=0;s<r;s++){const i=t.get(s),a=n.get(s);if(i<a)return-1;if(i>a)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class Ct extends xs{construct(t,n,r){return new Ct(t,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const n=[];for(const r of t){if(r.indexOf("//")>=0)throw new X(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((s=>s.length>0)))}return new Ct(n)}static emptyPath(){return new Ct([])}}const Qy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ee extends xs{construct(t,n,r){return new ee(t,n,r)}static isValidIdentifier(t){return Qy.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ee.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ee(["__name__"])}static fromServerFormat(t){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new X(N.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new X(N.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new X(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=c,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new X(N.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ee(n)}static emptyPath(){return new ee([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t){this.path=t}static fromPath(t){return new J(Ct.fromString(t))}static fromName(t){return new J(Ct.fromString(t).popFirst(5))}static empty(){return new J(Ct.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Ct.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return Ct.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new J(new Ct(t.slice()))}}function Xy(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=st.fromTimestamp(r===1e9?new Wt(n+1,0):new Wt(n,r));return new kn(s,J.empty(),t)}function Yy(e){return new kn(e.readTime,e.key,-1)}class kn{constructor(t,n,r){this.readTime=t,this.documentKey=n,this.largestBatchId=r}static min(){return new kn(st.min(),J.empty(),-1)}static max(){return new kn(st.max(),J.empty(),-1)}}function Jy(e,t){let n=e.readTime.compareTo(t.readTime);return n!==0?n:(n=J.comparator(e.documentKey,t.documentKey),n!==0?n:Et(e.largestBatchId,t.largestBatchId))}/**
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
 */const Zy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class tv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function js(e){if(e.code!==N.FAILED_PRECONDITION||e.message!==Zy)throw e;Q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&rt(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new F(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}}))}toPromise(){return new Promise(((t,n)=>{this.next(t,n)}))}wrapUserFunction(t){try{const n=t();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction((()=>t(n))):F.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction((()=>t(n))):F.reject(n)}static resolve(t){return new F(((n,r)=>{n(t)}))}static reject(t){return new F(((n,r)=>{r(t)}))}static waitFor(t){return new F(((n,r)=>{let s=0,i=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&n()}),(c=>r(c)))})),a=!0,i===s&&n()}))}static or(t){let n=F.resolve(!1);for(const r of t)n=n.next((s=>s?F.resolve(s):r()));return n}static forEach(t,n){const r=[];return t.forEach(((s,i)=>{r.push(n.call(this,s,i))})),this.waitFor(r)}static mapArray(t,n){return new F(((r,s)=>{const i=t.length,a=new Array(i);let l=0;for(let c=0;c<i;c++){const d=c;n(t[d]).next((h=>{a[d]=h,++l,l===i&&r(a)}),(h=>s(h)))}}))}static doWhile(t,n){return new F(((r,s)=>{const i=()=>{t()===!0?n().next((()=>{i()}),s):r()};i()}))}}function ev(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function $s(e){return e.name==="IndexedDbTransactionError"}/**
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
 */class sl{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}sl.oe=-1;function qs(e){return e==null}function Fi(e){return e===0&&1/e==-1/0}function nv(e){return typeof e=="number"&&Number.isInteger(e)&&!Fi(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function ar(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Kf(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,n){this.comparator=t,this.root=n||te.EMPTY}insert(t,n){return new kt(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,te.BLACK,null,null))}remove(t){return new kt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,te.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(t){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((n,r)=>(t(n,r),!1)))}toString(){const t=[];return this.inorderTraversal(((n,r)=>(t.push(`${n}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new mi(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new mi(this.root,t,this.comparator,!1)}getReverseIterator(){return new mi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new mi(this.root,t,this.comparator,!0)}}class mi{constructor(t,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?r(t.key,n):1,n&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class te{constructor(t,n,r,s,i){this.key=t,this.value=n,this.color=r??te.RED,this.left=s??te.EMPTY,this.right=i??te.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,s,i){return new te(t??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(t,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return te.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,s=this;if(n(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(t,s.key)===0){if(s.right.isEmpty())return te.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,te.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw rt();const t=this.left.check();if(t!==this.right.check())throw rt();return t+(this.isRed()?0:1)}}te.EMPTY=null,te.RED=!0,te.BLACK=!1;te.EMPTY=new class{constructor(){this.size=0}get key(){throw rt()}get value(){throw rt()}get color(){throw rt()}get left(){throw rt()}get right(){throw rt()}copy(t,n,r,s,i){return this}insert(t,n,r){return new te(t,n)}remove(t,n){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(t){this.comparator=t,this.data=new kt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((n,r)=>(t(n),!1)))}forEachInRange(t,n){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;n(s.key)}}forEachWhile(t,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new Cc(this.data.getIterator())}getIteratorFrom(t){return new Cc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach((r=>{n=n.add(r)})),n}isEqual(t){if(!(t instanceof ne)||this.size!==t.size)return!1;const n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((n=>{t.push(n)})),t}toString(){const t=[];return this.forEach((n=>t.push(n))),"SortedSet("+t.toString()+")"}copy(t){const n=new ne(this.comparator);return n.data=t,n}}class Cc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ie{constructor(t){this.fields=t,t.sort(ee.comparator)}static empty(){return new Ie([])}unionWith(t){let n=new ne(ee.comparator);for(const r of this.fields)n=n.add(r);for(const r of t)n=n.add(r);return new Ie(n.toArray())}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return Vr(this.fields,t.fields,((n,r)=>n.isEqual(r)))}}/**
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
 */class Hf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class se{constructor(t){this.binaryString=t}static fromBase64String(t){const n=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Hf("Invalid base64 string: "+i):i}})(t);return new se(n)}static fromUint8Array(t){const n=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(t);return new se(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Et(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}se.EMPTY_BYTE_STRING=new se("");const rv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nn(e){if(gt(!!e),typeof e=="string"){let t=0;const n=rv.exec(e);if(gt(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Bt(e.seconds),nanos:Bt(e.nanos)}}function Bt(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function er(e){return typeof e=="string"?se.fromBase64String(e):se.fromUint8Array(e)}/**
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
 */function il(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function ol(e){const t=e.mapValue.fields.__previous_value__;return il(t)?ol(t):t}function Ds(e){const t=Nn(e.mapValue.fields.__local_write_time__.timestampValue);return new Wt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(t,n,r,s,i,a,l,c,d){this.databaseId=t,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=d}}class ks{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new ks("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof ks&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const gi={mapValue:{}};function nr(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?il(e)?4:ov(e)?9007199254740991:iv(e)?10:11:rt()}function Ze(e,t){if(e===t)return!0;const n=nr(e);if(n!==nr(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ds(e).isEqual(Ds(t));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Nn(s.timestampValue),l=Nn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(e,t);case 5:return e.stringValue===t.stringValue;case 6:return(function(s,i){return er(s.bytesValue).isEqual(er(i.bytesValue))})(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return(function(s,i){return Bt(s.geoPointValue.latitude)===Bt(i.geoPointValue.latitude)&&Bt(s.geoPointValue.longitude)===Bt(i.geoPointValue.longitude)})(e,t);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return Bt(s.integerValue)===Bt(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Bt(s.doubleValue),l=Bt(i.doubleValue);return a===l?Fi(a)===Fi(l):isNaN(a)&&isNaN(l)}return!1})(e,t);case 9:return Vr(e.arrayValue.values||[],t.arrayValue.values||[],Ze);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Pc(a)!==Pc(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!Ze(a[c],l[c])))return!1;return!0})(e,t);default:return rt()}}function Ns(e,t){return(e.values||[]).find((n=>Ze(n,t)))!==void 0}function xr(e,t){if(e===t)return 0;const n=nr(e),r=nr(t);if(n!==r)return Et(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Et(e.booleanValue,t.booleanValue);case 2:return(function(i,a){const l=Bt(i.integerValue||i.doubleValue),c=Bt(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(e,t);case 3:return Vc(e.timestampValue,t.timestampValue);case 4:return Vc(Ds(e),Ds(t));case 5:return Et(e.stringValue,t.stringValue);case 6:return(function(i,a){const l=er(i),c=er(a);return l.compareTo(c)})(e.bytesValue,t.bytesValue);case 7:return(function(i,a){const l=i.split("/"),c=a.split("/");for(let d=0;d<l.length&&d<c.length;d++){const h=Et(l[d],c[d]);if(h!==0)return h}return Et(l.length,c.length)})(e.referenceValue,t.referenceValue);case 8:return(function(i,a){const l=Et(Bt(i.latitude),Bt(a.latitude));return l!==0?l:Et(Bt(i.longitude),Bt(a.longitude))})(e.geoPointValue,t.geoPointValue);case 9:return xc(e.arrayValue,t.arrayValue);case 10:return(function(i,a){var l,c,d,h;const y=i.fields||{},T=a.fields||{},R=(l=y.value)===null||l===void 0?void 0:l.arrayValue,V=(c=T.value)===null||c===void 0?void 0:c.arrayValue,x=Et(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((h=V==null?void 0:V.values)===null||h===void 0?void 0:h.length)||0);return x!==0?x:xc(R,V)})(e.mapValue,t.mapValue);case 11:return(function(i,a){if(i===gi.mapValue&&a===gi.mapValue)return 0;if(i===gi.mapValue)return 1;if(a===gi.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),d=a.fields||{},h=Object.keys(d);c.sort(),h.sort();for(let y=0;y<c.length&&y<h.length;++y){const T=Et(c[y],h[y]);if(T!==0)return T;const R=xr(l[c[y]],d[h[y]]);if(R!==0)return R}return Et(c.length,h.length)})(e.mapValue,t.mapValue);default:throw rt()}}function Vc(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return Et(e,t);const n=Nn(e),r=Nn(t),s=Et(n.seconds,r.seconds);return s!==0?s:Et(n.nanos,r.nanos)}function xc(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=xr(n[s],r[s]);if(i)return i}return Et(n.length,r.length)}function Dr(e){return wa(e)}function wa(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?(function(n){const r=Nn(n);return`time(${r.seconds},${r.nanos})`})(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?(function(n){return er(n).toBase64()})(e.bytesValue):"referenceValue"in e?(function(n){return J.fromName(n).toString()})(e.referenceValue):"geoPointValue"in e?(function(n){return`geo(${n.latitude},${n.longitude})`})(e.geoPointValue):"arrayValue"in e?(function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=wa(i);return r+"]"})(e.arrayValue):"mapValue"in e?(function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${wa(n.fields[a])}`;return s+"}"})(e.mapValue):rt()}function Ia(e){return!!e&&"integerValue"in e}function al(e){return!!e&&"arrayValue"in e}function Dc(e){return!!e&&"nullValue"in e}function kc(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function bi(e){return!!e&&"mapValue"in e}function iv(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function _s(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return ar(e.mapValue.fields,((n,r)=>t.mapValue.fields[n]=_s(r))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=_s(e.arrayValue.values[n]);return t}return Object.assign({},e)}function ov(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t){this.value=t}static empty(){return new _e({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let r=0;r<t.length-1;++r)if(n=(n.mapValue.fields||{})[t.get(r)],!bi(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=_s(n)}setAll(t){let n=ee.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}a?r[l.lastSegment()]=_s(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(t){const n=this.field(t.popLast());bi(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return Ze(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=n.mapValue.fields[t.get(r)];bi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[t.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(t,n,r){ar(n,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new _e(_s(this.value))}}function zf(e){const t=[];return ar(e.fields,((n,r)=>{const s=new ee([n]);if(bi(r)){const i=zf(r.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)})),new Ie(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(t,n,r,s,i,a,l){this.key=t,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(t){return new Qt(t,0,st.min(),st.min(),st.min(),_e.empty(),0)}static newFoundDocument(t,n,r,s){return new Qt(t,1,n,st.min(),r,s,0)}static newNoDocument(t,n){return new Qt(t,2,n,st.min(),st.min(),_e.empty(),0)}static newUnknownDocument(t,n){return new Qt(t,3,n,st.min(),st.min(),_e.empty(),2)}convertToFoundDocument(t,n){return!this.createTime.isEqual(st.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=_e.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=_e.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=st.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Qt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Qt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ui{constructor(t,n){this.position=t,this.inclusive=n}}function Nc(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],a=e.position[s];if(i.field.isKeyField()?r=J.comparator(J.fromName(a.referenceValue),n.key):r=xr(a,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Oc(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Ze(e.position[n],t.position[n]))return!1;return!0}/**
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
 */class Bi{constructor(t,n="asc"){this.field=t,this.dir=n}}function av(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}/**
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
 */class Wf{}class zt extends Wf{constructor(t,n,r){super(),this.field=t,this.op=n,this.value=r}static create(t,n,r){return t.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(t,n,r):new uv(t,n,r):n==="array-contains"?new fv(t,r):n==="in"?new dv(t,r):n==="not-in"?new pv(t,r):n==="array-contains-any"?new mv(t,r):new zt(t,n,r)}static createKeyFieldInFilter(t,n,r){return n==="in"?new cv(t,r):new hv(t,r)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(xr(n,this.value)):n!==null&&nr(this.value)===nr(n)&&this.matchesComparison(xr(n,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return rt()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tn extends Wf{constructor(t,n){super(),this.filters=t,this.op=n,this.ae=null}static create(t,n){return new tn(t,n)}matches(t){return Gf(this)?this.filters.find((n=>!n.matches(t)))===void 0:this.filters.find((n=>n.matches(t)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((t,n)=>t.concat(n.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Gf(e){return e.op==="and"}function Qf(e){return lv(e)&&Gf(e)}function lv(e){for(const t of e.filters)if(t instanceof tn)return!1;return!0}function Aa(e){if(e instanceof zt)return e.field.canonicalString()+e.op.toString()+Dr(e.value);if(Qf(e))return e.filters.map((t=>Aa(t))).join(",");{const t=e.filters.map((n=>Aa(n))).join(",");return`${e.op}(${t})`}}function Xf(e,t){return e instanceof zt?(function(r,s){return s instanceof zt&&r.op===s.op&&r.field.isEqual(s.field)&&Ze(r.value,s.value)})(e,t):e instanceof tn?(function(r,s){return s instanceof tn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&Xf(a,s.filters[l])),!0):!1})(e,t):void rt()}function Yf(e){return e instanceof zt?(function(n){return`${n.field.canonicalString()} ${n.op} ${Dr(n.value)}`})(e):e instanceof tn?(function(n){return n.op.toString()+" {"+n.getFilters().map(Yf).join(" ,")+"}"})(e):"Filter"}class uv extends zt{constructor(t,n,r){super(t,n,r),this.key=J.fromName(r.referenceValue)}matches(t){const n=J.comparator(t.key,this.key);return this.matchesComparison(n)}}class cv extends zt{constructor(t,n){super(t,"in",n),this.keys=Jf("in",n)}matches(t){return this.keys.some((n=>n.isEqual(t.key)))}}class hv extends zt{constructor(t,n){super(t,"not-in",n),this.keys=Jf("not-in",n)}matches(t){return!this.keys.some((n=>n.isEqual(t.key)))}}function Jf(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map((r=>J.fromName(r.referenceValue)))}class fv extends zt{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return al(n)&&Ns(n.arrayValue,this.value)}}class dv extends zt{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&Ns(this.value.arrayValue,n)}}class pv extends zt{constructor(t,n){super(t,"not-in",n)}matches(t){if(Ns(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!Ns(this.value.arrayValue,n)}}class mv extends zt{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!al(n)||!n.arrayValue.values)&&n.arrayValue.values.some((r=>Ns(this.value.arrayValue,r)))}}/**
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
 */class gv{constructor(t,n=null,r=[],s=[],i=null,a=null,l=null){this.path=t,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function Mc(e,t=null,n=[],r=[],s=null,i=null,a=null){return new gv(e,t,n,r,s,i,a)}function ll(e){const t=ot(e);if(t.ue===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map((r=>Aa(r))).join(","),n+="|ob:",n+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),qs(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((r=>Dr(r))).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((r=>Dr(r))).join(",")),t.ue=n}return t.ue}function ul(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!av(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Xf(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Oc(e.startAt,t.startAt)&&Oc(e.endAt,t.endAt)}function ba(e){return J.isDocumentKey(e.path)&&e.collectionGroup===null&&e.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(t,n=null,r=[],s=[],i=null,a="F",l=null,c=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _v(e,t,n,r,s,i,a,l){return new ao(e,t,n,r,s,i,a,l)}function cl(e){return new ao(e)}function Lc(e){return e.filters.length===0&&e.limit===null&&e.startAt==null&&e.endAt==null&&(e.explicitOrderBy.length===0||e.explicitOrderBy.length===1&&e.explicitOrderBy[0].field.isKeyField())}function yv(e){return e.collectionGroup!==null}function ys(e){const t=ot(e);if(t.ce===null){t.ce=[];const n=new Set;for(const i of t.explicitOrderBy)t.ce.push(i),n.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ne(ee.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(t).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||t.ce.push(new Bi(i,r))})),n.has(ee.keyField().canonicalString())||t.ce.push(new Bi(ee.keyField(),r))}return t.ce}function Xe(e){const t=ot(e);return t.le||(t.le=vv(t,ys(e))),t.le}function vv(e,t){if(e.limitType==="F")return Mc(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Bi(s.field,i)}));const n=e.endAt?new Ui(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Ui(e.startAt.position,e.startAt.inclusive):null;return Mc(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Ra(e,t,n){return new ao(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function lo(e,t){return ul(Xe(e),Xe(t))&&e.limitType===t.limitType}function Zf(e){return`${ll(Xe(e))}|lt:${e.limitType}`}function _r(e){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((s=>Yf(s))).join(", ")}]`),qs(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((s=>Dr(s))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((s=>Dr(s))).join(",")),`Target(${r})`})(Xe(e))}; limitType=${e.limitType})`}function uo(e,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):J.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(e,t)&&(function(r,s){for(const i of ys(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(e,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(e,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,c){const d=Nc(a,l,c);return a.inclusive?d<=0:d<0})(r.startAt,ys(r),s)||r.endAt&&!(function(a,l,c){const d=Nc(a,l,c);return a.inclusive?d>=0:d>0})(r.endAt,ys(r),s))})(e,t)}function Ev(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function td(e){return(t,n)=>{let r=!1;for(const s of ys(e)){const i=Tv(s,t,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Tv(e,t,n){const r=e.field.isKeyField()?J.comparator(t.key,n.key):(function(i,a,l){const c=a.data.field(i),d=l.data.field(i);return c!==null&&d!==null?xr(c,d):rt()})(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return rt()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={},this.innerSize=0}get(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,n]);s.push([t,n]),this.innerSize++}delete(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ar(this.inner,((n,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return Kf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wv=new kt(J.comparator);function _n(){return wv}const ed=new kt(J.comparator);function ls(...e){let t=ed;for(const n of e)t=t.insert(n.key,n);return t}function nd(e){let t=ed;return e.forEach(((n,r)=>t=t.insert(n,r.overlayedDocument))),t}function Gn(){return vs()}function rd(){return vs()}function vs(){return new Mr((e=>e.toString()),((e,t)=>e.isEqual(t)))}const Iv=new kt(J.comparator),Av=new ne(J.comparator);function dt(...e){let t=Av;for(const n of e)t=t.add(n);return t}const bv=new ne(Et);function Rv(){return bv}/**
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
 */function hl(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fi(t)?"-0":t}}function sd(e){return{integerValue:""+e}}function Sv(e,t){return nv(t)?sd(t):hl(e,t)}/**
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
 */class co{constructor(){this._=void 0}}function Pv(e,t,n){return e instanceof ji?(function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&il(i)&&(i=ol(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}})(n,t):e instanceof Os?od(e,t):e instanceof Ms?ad(e,t):(function(s,i){const a=id(s,i),l=Fc(a)+Fc(s.Pe);return Ia(a)&&Ia(s.Pe)?sd(l):hl(s.serializer,l)})(e,t)}function Cv(e,t,n){return e instanceof Os?od(e,t):e instanceof Ms?ad(e,t):n}function id(e,t){return e instanceof $i?(function(r){return Ia(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(t)?t:{integerValue:0}:null}class ji extends co{}class Os extends co{constructor(t){super(),this.elements=t}}function od(e,t){const n=ld(t);for(const r of e.elements)n.some((s=>Ze(s,r)))||n.push(r);return{arrayValue:{values:n}}}class Ms extends co{constructor(t){super(),this.elements=t}}function ad(e,t){let n=ld(t);for(const r of e.elements)n=n.filter((s=>!Ze(s,r)));return{arrayValue:{values:n}}}class $i extends co{constructor(t,n){super(),this.serializer=t,this.Pe=n}}function Fc(e){return Bt(e.integerValue||e.doubleValue)}function ld(e){return al(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function Vv(e,t){return e.field.isEqual(t.field)&&(function(r,s){return r instanceof Os&&s instanceof Os||r instanceof Ms&&s instanceof Ms?Vr(r.elements,s.elements,Ze):r instanceof $i&&s instanceof $i?Ze(r.Pe,s.Pe):r instanceof ji&&s instanceof ji})(e.transform,t.transform)}class xv{constructor(t,n){this.version=t,this.transformResults=n}}class Ee{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new Ee}static exists(t){return new Ee(void 0,t)}static updateTime(t){return new Ee(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ri(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class ho{}function ud(e,t){if(!e.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return e.isNoDocument()?new fl(e.key,Ee.none()):new Ks(e.key,e.data,Ee.none());{const n=e.data,r=_e.empty();let s=new ne(ee.comparator);for(let i of t.fields)if(!s.has(i)){let a=n.field(i);a===null&&i.length>1&&(i=i.popLast(),a=n.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Mn(e.key,r,new Ie(s.toArray()),Ee.none())}}function Dv(e,t,n){e instanceof Ks?(function(s,i,a){const l=s.value.clone(),c=Bc(s.fieldTransforms,i,a.transformResults);l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(e,t,n):e instanceof Mn?(function(s,i,a){if(!Ri(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Bc(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(cd(s)),c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(e,t,n):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,n)}function Es(e,t,n,r){return e instanceof Ks?(function(i,a,l,c){if(!Ri(i.precondition,a))return l;const d=i.value.clone(),h=jc(i.fieldTransforms,c,a);return d.setAll(h),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(e,t,n,r):e instanceof Mn?(function(i,a,l,c){if(!Ri(i.precondition,a))return l;const d=jc(i.fieldTransforms,c,a),h=a.data;return h.setAll(cd(i)),h.setAll(d),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((y=>y.field)))})(e,t,n,r):(function(i,a,l){return Ri(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(e,t,n)}function kv(e,t){let n=null;for(const r of e.fieldTransforms){const s=t.data.field(r.field),i=id(r.transform,s||null);i!=null&&(n===null&&(n=_e.empty()),n.set(r.field,i))}return n||null}function Uc(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Vr(r,s,((i,a)=>Vv(i,a)))})(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Ks extends ho{constructor(t,n,r,s=[]){super(),this.key=t,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Mn extends ho{constructor(t,n,r,s,i=[]){super(),this.key=t,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function cd(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function Bc(e,t,n){const r=new Map;gt(e.length===n.length);for(let s=0;s<n.length;s++){const i=e[s],a=i.transform,l=t.data.field(i.field);r.set(i.field,Cv(a,l,n[s]))}return r}function jc(e,t,n){const r=new Map;for(const s of e){const i=s.transform,a=n.data.field(s.field);r.set(s.field,Pv(i,a,t))}return r}class fl extends ho{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hd extends ho{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{constructor(t,n,r,s){this.batchId=t,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Dv(i,t,r[s])}}applyToLocalView(t,n){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(n=Es(r,t,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(n=Es(r,t,n,this.localWriteTime));return n}applyToLocalDocumentSet(t,n){const r=rd();return this.mutations.forEach((s=>{const i=t.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=n.has(s.key)?null:l;const c=ud(a,l);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(st.min())})),r}keys(){return this.mutations.reduce(((t,n)=>t.add(n.key)),dt())}isEqual(t){return this.batchId===t.batchId&&Vr(this.mutations,t.mutations,((n,r)=>Uc(n,r)))&&Vr(this.baseMutations,t.baseMutations,((n,r)=>Uc(n,r)))}}class dl{constructor(t,n,r,s){this.batch=t,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(t,n,r){gt(t.mutations.length===r.length);let s=(function(){return Iv})();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new dl(t,n,r,s)}}/**
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
 */class Ov{constructor(t,n){this.largestBatchId=t,this.mutation=n}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Mv{constructor(t,n){this.count=t,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $t,pt;function fd(e){switch(e){default:return rt();case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0}}function dd(e){if(e===void 0)return gn("GRPC error has no .code"),N.UNKNOWN;switch(e){case $t.OK:return N.OK;case $t.CANCELLED:return N.CANCELLED;case $t.UNKNOWN:return N.UNKNOWN;case $t.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case $t.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case $t.INTERNAL:return N.INTERNAL;case $t.UNAVAILABLE:return N.UNAVAILABLE;case $t.UNAUTHENTICATED:return N.UNAUTHENTICATED;case $t.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case $t.NOT_FOUND:return N.NOT_FOUND;case $t.ALREADY_EXISTS:return N.ALREADY_EXISTS;case $t.PERMISSION_DENIED:return N.PERMISSION_DENIED;case $t.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case $t.ABORTED:return N.ABORTED;case $t.OUT_OF_RANGE:return N.OUT_OF_RANGE;case $t.UNIMPLEMENTED:return N.UNIMPLEMENTED;case $t.DATA_LOSS:return N.DATA_LOSS;default:return rt()}}(pt=$t||($t={}))[pt.OK=0]="OK",pt[pt.CANCELLED=1]="CANCELLED",pt[pt.UNKNOWN=2]="UNKNOWN",pt[pt.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pt[pt.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pt[pt.NOT_FOUND=5]="NOT_FOUND",pt[pt.ALREADY_EXISTS=6]="ALREADY_EXISTS",pt[pt.PERMISSION_DENIED=7]="PERMISSION_DENIED",pt[pt.UNAUTHENTICATED=16]="UNAUTHENTICATED",pt[pt.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pt[pt.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pt[pt.ABORTED=10]="ABORTED",pt[pt.OUT_OF_RANGE=11]="OUT_OF_RANGE",pt[pt.UNIMPLEMENTED=12]="UNIMPLEMENTED",pt[pt.INTERNAL=13]="INTERNAL",pt[pt.UNAVAILABLE=14]="UNAVAILABLE",pt[pt.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Lv(){return new TextEncoder}/**
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
 */const Fv=new Yn([4294967295,4294967295],0);function $c(e){const t=Lv().encode(e),n=new Mf;return n.update(t),new Uint8Array(n.digest())}function qc(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new Yn([n,r],0),new Yn([s,i],0)]}class pl{constructor(t,n,r){if(this.bitmap=t,this.padding=n,this.hashCount=r,n<0||n>=8)throw new us(`Invalid padding: ${n}`);if(r<0)throw new us(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new us(`Invalid hash count: ${r}`);if(t.length===0&&n!==0)throw new us(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*t.length-n,this.Te=Yn.fromNumber(this.Ie)}Ee(t,n,r){let s=t.add(n.multiply(Yn.fromNumber(r)));return s.compare(Fv)===1&&(s=new Yn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const n=$c(t),[r,s]=qc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(t,n,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new pl(i,s,n);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.Ie===0)return;const n=$c(t),[r,s]=qc(n);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(t){const n=Math.floor(t/8),r=t%8;this.bitmap[n]|=1<<r}}class us extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(t,n,r,s,i){this.snapshotVersion=t,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,n,r){const s=new Map;return s.set(t,Hs.createSynthesizedTargetChangeForCurrentChange(t,n,r)),new fo(st.min(),s,new kt(Et),_n(),dt())}}class Hs{constructor(t,n,r,s,i){this.resumeToken=t,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,n,r){return new Hs(r,n,dt(),dt(),dt())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(t,n,r,s){this.Re=t,this.removedTargetIds=n,this.key=r,this.Ve=s}}class pd{constructor(t,n){this.targetId=t,this.me=n}}class md{constructor(t,n,r=se.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Kc{constructor(){this.fe=0,this.ge=zc(),this.pe=se.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=dt(),n=dt(),r=dt();return this.ge.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:rt()}})),new Hs(this.pe,this.ye,t,n,r)}Ce(){this.we=!1,this.ge=zc()}Fe(t,n){this.we=!0,this.ge=this.ge.insert(t,n)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,gt(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Uv{constructor(t){this.Le=t,this.Be=new Map,this.ke=_n(),this.qe=Hc(),this.Qe=new kt(Et)}Ke(t){for(const n of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(n,t.Ve):this.Ue(n,t.key,t.Ve);for(const n of t.removedTargetIds)this.Ue(n,t.key,t.Ve)}We(t){this.forEachTarget(t,(n=>{const r=this.Ge(n);switch(t.state){case 0:this.ze(n)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(t.resumeToken));break;default:rt()}}))}forEachTarget(t,n){t.targetIds.length>0?t.targetIds.forEach(n):this.Be.forEach(((r,s)=>{this.ze(s)&&n(s)}))}He(t){const n=t.targetId,r=t.me.count,s=this.Je(n);if(s){const i=s.target;if(ba(i))if(r===0){const a=new J(i.path);this.Ue(n,a,Qt.newNoDocument(a,st.min()))}else gt(r===1);else{const a=this.Ye(n);if(a!==r){const l=this.Ze(t),c=l?this.Xe(l,t,a):1;if(c!==0){this.je(n);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,d)}}}}}Ze(t){const n=t.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let a,l;try{a=er(r).toUint8Array()}catch(c){if(c instanceof Hf)return Cr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new pl(a,s,i)}catch(c){return Cr(c instanceof us?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(t,n,r){return n.me.count===r-this.nt(t,n.targetId)?0:2}nt(t,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach((i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(l)||(this.Ue(n,i,null),s++)})),s}rt(t){const n=new Map;this.Be.forEach(((i,a)=>{const l=this.Je(a);if(l){if(i.current&&ba(l.target)){const c=new J(l.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,Qt.newNoDocument(c,t))}i.be&&(n.set(a,i.ve()),i.Ce())}}));let r=dt();this.qe.forEach(((i,a)=>{let l=!0;a.forEachWhile((c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.ke.forEach(((i,a)=>a.setReadTime(t)));const s=new fo(t,n,this.Qe,this.ke,r);return this.ke=_n(),this.qe=Hc(),this.Qe=new kt(Et),s}$e(t,n){if(!this.ze(t))return;const r=this.it(t,n.key)?2:0;this.Ge(t).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(t))}Ue(t,n,r){if(!this.ze(t))return;const s=this.Ge(t);this.it(t,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(t)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const n=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let n=this.Be.get(t);return n||(n=new Kc,this.Be.set(t,n)),n}st(t){let n=this.qe.get(t);return n||(n=new ne(Et),this.qe=this.qe.insert(t,n)),n}ze(t){const n=this.Je(t)!==null;return n||Q("WatchChangeAggregator","Detected inactive target",t),n}Je(t){const n=this.Be.get(t);return n&&n.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Kc),this.Le.getRemoteKeysForTarget(t).forEach((n=>{this.Ue(t,n,null)}))}it(t,n){return this.Le.getRemoteKeysForTarget(t).has(n)}}function Hc(){return new kt(J.comparator)}function zc(){return new kt(J.comparator)}const Bv={asc:"ASCENDING",desc:"DESCENDING"},jv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},$v={and:"AND",or:"OR"};class qv{constructor(t,n){this.databaseId=t,this.useProto3Json=n}}function Sa(e,t){return e.useProto3Json||qs(t)?t:{value:t}}function qi(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function gd(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Kv(e,t){return qi(e,t.toTimestamp())}function be(e){return gt(!!e),st.fromTimestamp((function(n){const r=Nn(n);return new Wt(r.seconds,r.nanos)})(e))}function ml(e,t){return Pa(e,t).canonicalString()}function Pa(e,t){const n=(function(s){return new Ct(["projects",s.projectId,"databases",s.database])})(e).child("documents");return t===void 0?n:n.child(t)}function _d(e){const t=Ct.fromString(e);return gt(Id(t)),t}function Ki(e,t){return ml(e.databaseId,t.path)}function Ts(e,t){const n=_d(t);if(n.get(1)!==e.databaseId.projectId)throw new X(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new X(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new J(vd(n))}function yd(e,t){return ml(e.databaseId,t)}function Hv(e){const t=_d(e);return t.length===4?Ct.emptyPath():vd(t)}function Ca(e){return new Ct(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function vd(e){return gt(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function Wc(e,t,n){return{name:Ki(e,t),fields:n.value.mapValue.fields}}function zv(e,t){return"found"in t?(function(r,s){gt(!!s.found),s.found.name,s.found.updateTime;const i=Ts(r,s.found.name),a=be(s.found.updateTime),l=s.found.createTime?be(s.found.createTime):st.min(),c=new _e({mapValue:{fields:s.found.fields}});return Qt.newFoundDocument(i,a,l,c)})(e,t):"missing"in t?(function(r,s){gt(!!s.missing),gt(!!s.readTime);const i=Ts(r,s.missing),a=be(s.readTime);return Qt.newNoDocument(i,a)})(e,t):rt()}function Wv(e,t){let n;if("targetChange"in t){t.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:rt()})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(d,h){return d.useProto3Json?(gt(h===void 0||typeof h=="string"),se.fromBase64String(h||"")):(gt(h===void 0||h instanceof Buffer||h instanceof Uint8Array),se.fromUint8Array(h||new Uint8Array))})(e,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(d){const h=d.code===void 0?N.UNKNOWN:dd(d.code);return new X(h,d.message||"")})(a);n=new md(r,s,i,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ts(e,r.document.name),i=be(r.document.updateTime),a=r.document.createTime?be(r.document.createTime):st.min(),l=new _e({mapValue:{fields:r.document.fields}}),c=Qt.newFoundDocument(s,i,a,l),d=r.targetIds||[],h=r.removedTargetIds||[];n=new Si(d,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ts(e,r.document),i=r.readTime?be(r.readTime):st.min(),a=Qt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Si([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ts(e,r.document),i=r.removedTargetIds||[];n=new Si([],i,s,null)}else{if(!("filter"in t))return rt();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Mv(s,i),l=r.targetId;n=new pd(l,a)}}return n}function Ed(e,t){let n;if(t instanceof Ks)n={update:Wc(e,t.key,t.value)};else if(t instanceof fl)n={delete:Ki(e,t.key)};else if(t instanceof Mn)n={update:Wc(e,t.key,t.data),updateMask:nE(t.fieldMask)};else{if(!(t instanceof hd))return rt();n={verify:Ki(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof ji)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Os)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ms)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof $i)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw rt()})(0,r)))),t.precondition.isNone||(n.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Kv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:rt()})(e,t.precondition)),n}function Gv(e,t){return e&&e.length>0?(gt(t!==void 0),e.map((n=>(function(s,i){let a=s.updateTime?be(s.updateTime):be(i);return a.isEqual(st.min())&&(a=be(i)),new xv(a,s.transformResults||[])})(n,t)))):[]}function Qv(e,t){return{documents:[yd(e,t.path)]}}function Xv(e,t){const n={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=yd(e,s);const i=(function(d){if(d.length!==0)return wd(tn.create(d,"and"))})(t.filters);i&&(n.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((h=>(function(T){return{field:yr(T.field),direction:Zv(T.dir)}})(h)))})(t.orderBy);a&&(n.structuredQuery.orderBy=a);const l=Sa(e,t.limit);return l!==null&&(n.structuredQuery.limit=l),t.startAt&&(n.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(t.startAt)),t.endAt&&(n.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(t.endAt)),{_t:n,parent:s}}function Yv(e){let t=Hv(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){gt(r===1);const h=n.from[0];h.allDescendants?s=h.collectionId:t=t.child(h.collectionId)}let i=[];n.where&&(i=(function(y){const T=Td(y);return T instanceof tn&&Qf(T)?T.getFilters():[T]})(n.where));let a=[];n.orderBy&&(a=(function(y){return y.map((T=>(function(V){return new Bi(vr(V.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(T)))})(n.orderBy));let l=null;n.limit&&(l=(function(y){let T;return T=typeof y=="object"?y.value:y,qs(T)?null:T})(n.limit));let c=null;n.startAt&&(c=(function(y){const T=!!y.before,R=y.values||[];return new Ui(R,T)})(n.startAt));let d=null;return n.endAt&&(d=(function(y){const T=!y.before,R=y.values||[];return new Ui(R,T)})(n.endAt)),_v(t,s,a,i,l,"F",c,d)}function Jv(e,t){const n=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return rt()}})(t.purpose);return n==null?null:{"goog-listen-tags":n}}function Td(e){return e.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=vr(n.unaryFilter.field);return zt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=vr(n.unaryFilter.field);return zt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=vr(n.unaryFilter.field);return zt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=vr(n.unaryFilter.field);return zt.create(a,"!=",{nullValue:"NULL_VALUE"});default:return rt()}})(e):e.fieldFilter!==void 0?(function(n){return zt.create(vr(n.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return rt()}})(n.fieldFilter.op),n.fieldFilter.value)})(e):e.compositeFilter!==void 0?(function(n){return tn.create(n.compositeFilter.filters.map((r=>Td(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return rt()}})(n.compositeFilter.op))})(e):rt()}function Zv(e){return Bv[e]}function tE(e){return jv[e]}function eE(e){return $v[e]}function yr(e){return{fieldPath:e.canonicalString()}}function vr(e){return ee.fromServerFormat(e.fieldPath)}function wd(e){return e instanceof zt?(function(n){if(n.op==="=="){if(kc(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NAN"}};if(Dc(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(kc(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NOT_NAN"}};if(Dc(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:yr(n.field),op:tE(n.op),value:n.value}}})(e):e instanceof tn?(function(n){const r=n.getFilters().map((s=>wd(s)));return r.length===1?r[0]:{compositeFilter:{op:eE(n.op),filters:r}}})(e):rt()}function nE(e){const t=[];return e.fields.forEach((n=>t.push(n.canonicalString()))),{fieldPaths:t}}function Id(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(t,n,r,s,i=st.min(),a=st.min(),l=se.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(t){return new Sn(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,n){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(t){this.ct=t}}function sE(e){const t=Yv({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?Ra(t,t.limit,"L"):t}/**
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
 */class iE{constructor(){this.un=new oE}addToCollectionParentIndex(t,n){return this.un.add(n),F.resolve()}getCollectionParents(t,n){return F.resolve(this.un.getEntries(n))}addFieldIndex(t,n){return F.resolve()}deleteFieldIndex(t,n){return F.resolve()}deleteAllFieldIndexes(t){return F.resolve()}createTargetIndexes(t,n){return F.resolve()}getDocumentsMatchingTarget(t,n){return F.resolve(null)}getIndexType(t,n){return F.resolve(0)}getFieldIndexes(t,n){return F.resolve([])}getNextCollectionGroupToUpdate(t){return F.resolve(null)}getMinOffset(t,n){return F.resolve(kn.min())}getMinOffsetFromCollectionGroup(t,n){return F.resolve(kn.min())}updateCollectionGroup(t,n,r){return F.resolve()}updateIndexEntries(t,n){return F.resolve()}}class oE{constructor(){this.index={}}add(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n]||new ne(Ct.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(t){const n=t.lastSegment(),r=t.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ne(Ct.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new kr(0)}static kn(){return new kr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aE{constructor(){this.changes=new Mr((t=>t.toString()),((t,n)=>t.isEqual(n))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,Qt.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class lE{constructor(t,n){this.overlayedDocument=t,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(t,n,r,s){this.remoteDocumentCache=t,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,n){let r=null;return this.documentOverlayCache.getOverlay(t,n).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,n)))).next((s=>(r!==null&&Es(r.mutation,s,Ie.empty(),Wt.now()),s)))}getDocuments(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.getLocalViewOfDocuments(t,r,dt()).next((()=>r))))}getLocalViewOfDocuments(t,n,r=dt()){const s=Gn();return this.populateOverlays(t,s,n).next((()=>this.computeViews(t,n,s,r).next((i=>{let a=ls();return i.forEach(((l,c)=>{a=a.insert(l,c.overlayedDocument)})),a}))))}getOverlayedDocuments(t,n){const r=Gn();return this.populateOverlays(t,r,n).next((()=>this.computeViews(t,n,r,dt())))}populateOverlays(t,n,r){const s=[];return r.forEach((i=>{n.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((a,l)=>{n.set(a,l)}))}))}computeViews(t,n,r,s){let i=_n();const a=vs(),l=(function(){return vs()})();return n.forEach(((c,d)=>{const h=r.get(d.key);s.has(d.key)&&(h===void 0||h.mutation instanceof Mn)?i=i.insert(d.key,d):h!==void 0?(a.set(d.key,h.mutation.getFieldMask()),Es(h.mutation,d,h.mutation.getFieldMask(),Wt.now())):a.set(d.key,Ie.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((d,h)=>a.set(d,h))),n.forEach(((d,h)=>{var y;return l.set(d,new lE(h,(y=a.get(d))!==null&&y!==void 0?y:null))})),l)))}recalculateAndSaveOverlays(t,n){const r=vs();let s=new kt(((a,l)=>a-l)),i=dt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,n).next((a=>{for(const l of a)l.keys().forEach((c=>{const d=n.get(c);if(d===null)return;let h=r.get(c)||Ie.empty();h=l.applyToLocalView(d,h),r.set(c,h);const y=(s.get(l.batchId)||dt()).add(c);s=s.insert(l.batchId,y)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),d=c.key,h=c.value,y=rd();h.forEach((T=>{if(!i.has(T)){const R=ud(n.get(T),r.get(T));R!==null&&y.set(T,R),i=i.add(T)}})),a.push(this.documentOverlayCache.saveOverlays(t,d,y))}return F.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,n){return this.remoteDocumentCache.getEntries(t,n).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,n,r,s){return(function(a){return J.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(n)?this.getDocumentsMatchingDocumentQuery(t,n.path):yv(n)?this.getDocumentsMatchingCollectionGroupQuery(t,n,r,s):this.getDocumentsMatchingCollectionQuery(t,n,r,s)}getNextDocuments(t,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,n,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,n,r.largestBatchId,s-i.size):F.resolve(Gn());let l=-1,c=i;return a.next((d=>F.forEach(d,((h,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),i.get(h)?F.resolve():this.remoteDocumentCache.getEntry(t,h).next((T=>{c=c.insert(h,T)}))))).next((()=>this.populateOverlays(t,d,i))).next((()=>this.computeViews(t,c,d,dt()))).next((h=>({batchId:l,changes:nd(h)})))))}))}getDocumentsMatchingDocumentQuery(t,n){return this.getDocument(t,new J(n)).next((r=>{let s=ls();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,n,r,s){const i=n.collectionGroup;let a=ls();return this.indexManager.getCollectionParents(t,i).next((l=>F.forEach(l,(c=>{const d=(function(y,T){return new ao(T,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next((h=>{h.forEach(((y,T)=>{a=a.insert(y,T)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,n.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,n,r,i,s)))).next((a=>{i.forEach(((c,d)=>{const h=d.getKey();a.get(h)===null&&(a=a.insert(h,Qt.newInvalidDocument(h)))}));let l=ls();return a.forEach(((c,d)=>{const h=i.get(c);h!==void 0&&Es(h.mutation,d,Ie.empty(),Wt.now()),uo(n,d)&&(l=l.insert(c,d))})),l}))}}/**
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
 */class cE{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,n){return F.resolve(this.hr.get(n))}saveBundleMetadata(t,n){return this.hr.set(n.id,(function(s){return{id:s.id,version:s.version,createTime:be(s.createTime)}})(n)),F.resolve()}getNamedQuery(t,n){return F.resolve(this.Pr.get(n))}saveNamedQuery(t,n){return this.Pr.set(n.name,(function(s){return{name:s.name,query:sE(s.bundledQuery),readTime:be(s.readTime)}})(n)),F.resolve()}}/**
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
 */class hE{constructor(){this.overlays=new kt(J.comparator),this.Ir=new Map}getOverlay(t,n){return F.resolve(this.overlays.get(n))}getOverlays(t,n){const r=Gn();return F.forEach(n,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(t,n,r){return r.forEach(((s,i)=>{this.ht(t,n,i)})),F.resolve()}removeOverlaysForBatchId(t,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ir.delete(r)),F.resolve()}getOverlaysForCollection(t,n,r){const s=Gn(),i=n.length+1,a=new J(n.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,d=c.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return F.resolve(s)}getOverlaysForCollectionGroup(t,n,r,s){let i=new kt(((d,h)=>d-h));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let h=i.get(d.largestBatchId);h===null&&(h=Gn(),i=i.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const l=Gn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((d,h)=>l.set(d,h))),!(l.size()>=s)););return F.resolve(l)}ht(t,n,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Ov(n,r));let i=this.Ir.get(n);i===void 0&&(i=dt(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class fE{constructor(){this.sessionToken=se.EMPTY_BYTE_STRING}getSessionToken(t){return F.resolve(this.sessionToken)}setSessionToken(t,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.Tr=new ne(Gt.Er),this.dr=new ne(Gt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,n){const r=new Gt(t,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,n){t.forEach((r=>this.addReference(r,n)))}removeReference(t,n){this.Vr(new Gt(t,n))}mr(t,n){t.forEach((r=>this.removeReference(r,n)))}gr(t){const n=new J(new Ct([])),r=new Gt(n,t),s=new Gt(n,t+1),i=[];return this.dr.forEachInRange([r,s],(a=>{this.Vr(a),i.push(a.key)})),i}pr(){this.Tr.forEach((t=>this.Vr(t)))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const n=new J(new Ct([])),r=new Gt(n,t),s=new Gt(n,t+1);let i=dt();return this.dr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(t){const n=new Gt(t,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&t.isEqual(r.key)}}class Gt{constructor(t,n){this.key=t,this.wr=n}static Er(t,n){return J.comparator(t.key,n.key)||Et(t.wr,n.wr)}static Ar(t,n){return Et(t.wr,n.wr)||J.comparator(t.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ne(Gt.Er)}checkEmpty(t){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(t,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Nv(i,n,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new Gt(l.key,i)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return F.resolve(a)}lookupMutationBatch(t,n){return F.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(t,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return F.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const r=new Gt(n,0),s=new Gt(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],(a=>{const l=this.Dr(a.wr);i.push(l)})),F.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let r=new ne(Et);return n.forEach((s=>{const i=new Gt(s,0),a=new Gt(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],(l=>{r=r.add(l.wr)}))})),F.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,n){const r=n.path,s=r.length+1;let i=r;J.isDocumentKey(i)||(i=i.child(""));const a=new Gt(new J(i),0);let l=new ne(Et);return this.br.forEachWhile((c=>{const d=c.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(c.wr)),!0)}),a),F.resolve(this.Cr(l))}Cr(t){const n=[];return t.forEach((r=>{const s=this.Dr(r);s!==null&&n.push(s)})),n}removeMutationBatch(t,n){gt(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return F.forEach(n.mutations,(s=>{const i=new Gt(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.br=r}))}On(t){}containsKey(t,n){const r=new Gt(n,0),s=this.br.firstAfterOrEqual(r);return F.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,F.resolve()}Fr(t,n){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const n=this.vr(t);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pE{constructor(t){this.Mr=t,this.docs=(function(){return new kt(J.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():Qt.newInvalidDocument(n))}getEntries(t,n){let r=_n();return n.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Qt.newInvalidDocument(s))})),F.resolve(r)}getDocumentsMatchingQuery(t,n,r,s){let i=_n();const a=n.path,l=new J(a.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:d,value:{document:h}}=c.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Jy(Yy(h),r)<=0||(s.has(h.key)||uo(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return F.resolve(i)}getAllFromCollectionGroup(t,n,r,s){rt()}Or(t,n){return F.forEach(this.docs,(r=>n(r)))}newChangeBuffer(t){return new mE(this)}getSize(t){return F.resolve(this.size)}}class mE extends aE{constructor(t){super(),this.cr=t}applyChanges(t){const n=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(t,s)):this.cr.removeEntry(r)})),F.waitFor(n)}getFromCache(t,n){return this.cr.getEntry(t,n)}getAllFromCache(t,n){return this.cr.getEntries(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(t){this.persistence=t,this.Nr=new Mr((n=>ll(n)),ul),this.lastRemoteSnapshotVersion=st.min(),this.highestTargetId=0,this.Lr=0,this.Br=new gl,this.targetCount=0,this.kr=kr.Bn()}forEachTarget(t,n){return this.Nr.forEach(((r,s)=>n(s))),F.resolve()}getLastRemoteSnapshotVersion(t){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return F.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(t,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),F.resolve()}Kn(t){this.Nr.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.kr=new kr(n),this.highestTargetId=n),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,n){return this.Kn(n),this.targetCount+=1,F.resolve()}updateTargetData(t,n){return this.Kn(n),F.resolve()}removeTargetData(t,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(t,n,r){let s=0;const i=[];return this.Nr.forEach(((a,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),F.waitFor(i).next((()=>s))}getTargetCount(t){return F.resolve(this.targetCount)}getTargetData(t,n){const r=this.Nr.get(n)||null;return F.resolve(r)}addMatchingKeys(t,n,r){return this.Br.Rr(n,r),F.resolve()}removeMatchingKeys(t,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach((a=>{i.push(s.markPotentiallyOrphaned(t,a))})),F.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.Br.gr(n),F.resolve()}getMatchingKeysForTargetId(t,n){const r=this.Br.yr(n);return F.resolve(r)}containsKey(t,n){return F.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(t,n){this.qr={},this.overlays={},this.Qr=new sl(0),this.Kr=!1,this.Kr=!0,this.$r=new fE,this.referenceDelegate=t(this),this.Ur=new gE(this),this.indexManager=new iE,this.remoteDocumentCache=(function(s){return new pE(s)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new rE(n),this.Gr=new cE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new hE,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let r=this.qr[t.toKey()];return r||(r=new dE(n,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,n,r){Q("MemoryPersistence","Starting transaction:",t);const s=new yE(this.Qr.next());return this.referenceDelegate.zr(),r(s).next((i=>this.referenceDelegate.jr(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Hr(t,n){return F.or(Object.values(this.qr).map((r=>()=>r.containsKey(t,n))))}}class yE extends tv{constructor(t){super(),this.currentSequenceNumber=t}}class _l{constructor(t){this.persistence=t,this.Jr=new gl,this.Yr=null}static Zr(t){return new _l(t)}get Xr(){if(this.Yr)return this.Yr;throw rt()}addReference(t,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),F.resolve()}removeReference(t,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),F.resolve()}markPotentiallyOrphaned(t,n){return this.Xr.add(n.toString()),F.resolve()}removeTarget(t,n){this.Jr.gr(n.targetId).forEach((s=>this.Xr.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,n.targetId).next((s=>{s.forEach((i=>this.Xr.add(i.toString())))})).next((()=>r.removeTargetData(t,n)))}zr(){this.Yr=new Set}jr(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.Xr,(r=>{const s=J.fromPath(r);return this.ei(t,s).next((i=>{i||n.removeEntry(s,st.min())}))})).next((()=>(this.Yr=null,n.apply(t))))}updateLimboDocument(t,n){return this.ei(t,n).next((r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())}))}Wr(t){return 0}ei(t,n){return F.or([()=>F.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Hr(t,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(t,n,r,s){this.targetId=t,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(t,n){let r=dt(),s=dt();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new yl(t,n.fromCache,r,s)}}/**
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
 */class vE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class EE{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return R_()?8:ev(A_())>0?6:4})()}initialize(t,n){this.Ji=t,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(t,n,r,s){const i={result:null};return this.Yi(t,n).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.Zi(t,n,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new vE;return this.Xi(t,n,a).next((l=>{if(i.result=l,this.zi)return this.es(t,n,a,l.size)}))})).next((()=>i.result))}es(t,n,r,s){return r.documentReadCount<this.ji?(es()<=mt.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",_r(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),F.resolve()):(es()<=mt.DEBUG&&Q("QueryEngine","Query:",_r(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(es()<=mt.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",_r(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Xe(n))):F.resolve())}Yi(t,n){if(Lc(n))return F.resolve(null);let r=Xe(n);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(n.limit!==null&&s===1&&(n=Ra(n,null,"F"),r=Xe(n)),this.indexManager.getDocumentsMatchingTarget(t,r).next((i=>{const a=dt(...i);return this.Ji.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((c=>{const d=this.ts(n,l);return this.ns(n,d,a,c.readTime)?this.Yi(t,Ra(n,null,"F")):this.rs(t,d,n,c)}))))})))))}Zi(t,n,r,s){return Lc(n)||s.isEqual(st.min())?F.resolve(null):this.Ji.getDocuments(t,r).next((i=>{const a=this.ts(n,i);return this.ns(n,a,r,s)?F.resolve(null):(es()<=mt.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),_r(n)),this.rs(t,a,n,Xy(s,-1)).next((l=>l)))}))}ts(t,n){let r=new ne(td(t));return n.forEach(((s,i)=>{uo(t,i)&&(r=r.add(i))})),r}ns(t,n,r,s){if(t.limit===null)return!1;if(r.size!==n.size)return!0;const i=t.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(t,n,r){return es()<=mt.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",_r(n)),this.Ji.getDocumentsMatchingQuery(t,n,kn.min(),r)}rs(t,n,r,s){return this.Ji.getDocumentsMatchingQuery(t,r,s).next((i=>(n.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
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
 */class TE{constructor(t,n,r,s){this.persistence=t,this.ss=n,this.serializer=s,this.os=new kt(Et),this._s=new Mr((i=>ll(i)),ul),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new uE(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(n=>t.collect(n,this.os)))}}function wE(e,t,n,r){return new TE(e,t,n,r)}async function Ad(e,t){const n=ot(e);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,n.ls(t),n.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let c=dt();for(const d of s){a.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}for(const d of i){l.push(d.batchId);for(const h of d.mutations)c=c.add(h.key)}return n.localDocuments.getDocuments(r,c).next((d=>({hs:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function IE(e,t){const n=ot(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return(function(l,c,d,h){const y=d.batch,T=y.keys();let R=F.resolve();return T.forEach((V=>{R=R.next((()=>h.getEntry(c,V))).next((x=>{const D=d.docVersions.get(V);gt(D!==null),x.version.compareTo(D)<0&&(y.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),h.addEntry(x)))}))})),R.next((()=>l.mutationQueue.removeMutationBatch(c,y)))})(n,r,t,i).next((()=>i.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let c=dt();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(c=c.add(l.batch.mutations[d].key));return c})(t)))).next((()=>n.localDocuments.getDocuments(r,s)))}))}function bd(e){const t=ot(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>t.Ur.getLastRemoteSnapshotVersion(n)))}function AE(e,t){const n=ot(e),r=t.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];t.targetChanges.forEach(((h,y)=>{const T=s.get(y);if(!T)return;l.push(n.Ur.removeMatchingKeys(i,h.removedDocuments,y).next((()=>n.Ur.addMatchingKeys(i,h.addedDocuments,y))));let R=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(y)!==null?R=R.withResumeToken(se.EMPTY_BYTE_STRING,st.min()).withLastLimboFreeSnapshotVersion(st.min()):h.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(h.resumeToken,r)),s=s.insert(y,R),(function(x,D,G){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0})(T,R,h)&&l.push(n.Ur.updateTargetData(i,R))}));let c=_n(),d=dt();if(t.documentUpdates.forEach((h=>{t.resolvedLimboDocuments.has(h)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))})),l.push(bE(i,a,t.documentUpdates).next((h=>{c=h.Ps,d=h.Is}))),!r.isEqual(st.min())){const h=n.Ur.getLastRemoteSnapshotVersion(i).next((y=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(h)}return F.waitFor(l).next((()=>a.apply(i))).next((()=>n.localDocuments.getLocalViewOfDocuments(i,c,d))).next((()=>c))})).then((i=>(n.os=s,i)))}function bE(e,t,n){let r=dt(),s=dt();return n.forEach((i=>r=r.add(i))),t.getEntries(e,r).next((i=>{let a=_n();return n.forEach(((l,c)=>{const d=i.get(l);c.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(st.min())?(t.removeEntry(l,c.readTime),a=a.insert(l,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(c),a=a.insert(l,c)):Q("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",c.version)})),{Ps:a,Is:s}}))}function RE(e,t){const n=ot(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function SE(e,t){const n=ot(e);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return n.Ur.getTargetData(r,t).next((i=>i?(s=i,F.resolve(s)):n.Ur.allocateTargetId(r).next((a=>(s=new Sn(t,a,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(t,r.targetId)),r}))}async function Va(e,t,n){const r=ot(e),s=r.os.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!$s(a))throw a;Q("LocalStore",`Failed to update sequence numbers for target ${t}: ${a}`)}r.os=r.os.remove(t),r._s.delete(s.target)}function Gc(e,t,n){const r=ot(e);let s=st.min(),i=dt();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,d,h){const y=ot(c),T=y._s.get(h);return T!==void 0?F.resolve(y.os.get(T)):y.Ur.getTargetData(d,h)})(r,a,Xe(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next((c=>{i=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(a,t,n?s:st.min(),n?i:dt()))).next((l=>(PE(r,Ev(t),l),{documents:l,Ts:i})))))}function PE(e,t,n){let r=e.us.get(t)||st.min();n.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),e.us.set(t,r)}class Qc{constructor(){this.activeTargetIds=Rv()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class CE{constructor(){this.so=new Qc,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,r){}addLocalQueryTarget(t,n=!0){return n&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,n,r){this.oo[t]=n}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Qc,Promise.resolve()}handleUserChange(t,n,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class VE{_o(t){}shutdown(){}}/**
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
 */class Xc{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){Q("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){Q("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let _i=null;function Zo(){return _i===null?_i=(function(){return 268435456+Math.round(2147483648*Math.random())})():_i++,"0x"+_i.toString(16)}/**
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
 */const xE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="WebChannelConnection";class kE extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,a){const l=Zo(),c=this.xo(n,r.toUriEncodedString());Q("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(n,c,d,s).then((h=>(Q("RestConnection",`Received RPC '${n}' ${l}: `,h),h)),(h=>{throw Cr("RestConnection",`RPC '${n}' ${l} failed with error: `,h,"url: ",c,"request:",s),h}))}Lo(n,r,s,i,a,l){return this.Mo(n,r,s,i,a)}Oo(n,r,s){n["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Or})(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((i,a)=>n[a]=i)),s&&s.headers.forEach(((i,a)=>n[a]=i))}xo(n,r){const s=xE[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,n,r,s){const i=Zo();return new Promise(((a,l)=>{const c=new Lf;c.setWithCredentials(!0),c.listenOnce(Ff.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Ai.NO_ERROR:const h=c.getResponseJson();Q(le,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(h)),a(h);break;case Ai.TIMEOUT:Q(le,`RPC '${t}' ${i} timed out`),l(new X(N.DEADLINE_EXCEEDED,"Request time out"));break;case Ai.HTTP_ERROR:const y=c.getStatus();if(Q(le,`RPC '${t}' ${i} failed with status:`,y,"response text:",c.getResponseText()),y>0){let T=c.getResponseJson();Array.isArray(T)&&(T=T[0]);const R=T==null?void 0:T.error;if(R&&R.status&&R.message){const V=(function(D){const G=D.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(G)>=0?G:N.UNKNOWN})(R.status);l(new X(V,R.message))}else l(new X(N.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new X(N.UNAVAILABLE,"Connection failed."));break;default:rt()}}finally{Q(le,`RPC '${t}' ${i} completed.`)}}));const d=JSON.stringify(s);Q(le,`RPC '${t}' ${i} sending request:`,s),c.send(n,"POST",d,r,15)}))}Bo(t,n,r){const s=Zo(),i=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=jf(),l=Bf(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const h=i.join("");Q(le,`Creating RPC '${t}' stream ${s}: ${h}`,c);const y=a.createWebChannel(h,c);let T=!1,R=!1;const V=new DE({Io:D=>{R?Q(le,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(T||(Q(le,`Opening RPC '${t}' stream ${s} transport.`),y.open(),T=!0),Q(le,`RPC '${t}' stream ${s} sending:`,D),y.send(D))},To:()=>y.close()}),x=(D,G,z)=>{D.listen(G,(W=>{try{z(W)}catch(B){setTimeout((()=>{throw B}),0)}}))};return x(y,as.EventType.OPEN,(()=>{R||(Q(le,`RPC '${t}' stream ${s} transport opened.`),V.yo())})),x(y,as.EventType.CLOSE,(()=>{R||(R=!0,Q(le,`RPC '${t}' stream ${s} transport closed`),V.So())})),x(y,as.EventType.ERROR,(D=>{R||(R=!0,Cr(le,`RPC '${t}' stream ${s} transport errored:`,D),V.So(new X(N.UNAVAILABLE,"The operation could not be completed")))})),x(y,as.EventType.MESSAGE,(D=>{var G;if(!R){const z=D.data[0];gt(!!z);const W=z,B=W.error||((G=W[0])===null||G===void 0?void 0:G.error);if(B){Q(le,`RPC '${t}' stream ${s} received error:`,B);const ft=B.status;let _t=(function(p){const _=$t[p];if(_!==void 0)return dd(_)})(ft),I=B.message;_t===void 0&&(_t=N.INTERNAL,I="Unknown error status: "+ft+" with message "+B.message),R=!0,V.So(new X(_t,I)),y.close()}else Q(le,`RPC '${t}' stream ${s} received:`,z),V.bo(z)}})),x(l,Uf.STAT_EVENT,(D=>{D.stat===Ta.PROXY?Q(le,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Ta.NOPROXY&&Q(le,`RPC '${t}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{V.wo()}),0),V}}function ta(){return typeof document<"u"?document:null}/**
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
 */function po(e){return new qv(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(t,n,r=1e3,s=1.5,i=6e4){this.ui=t,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&Q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),t()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(t,n,r,s,i,a,l,c){this.ui=t,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new vl(t,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():n&&n.code===N.RESOURCE_EXHAUSTED?(gn(n.toString()),gn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(n)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.Yo===n&&this.P_(r,s)}),(r=>{t((()=>{const s=new X(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)}))}))}P_(t,n){const r=this.h_(this.Yo);this.stream=this.T_(t,n),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((s=>{r((()=>this.I_(s)))})),this.stream.onMessage((s=>{r((()=>++this.e_==1?this.E_(s):this.onNext(s)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(t){return Q("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return n=>{this.ui.enqueueAndForget((()=>this.Yo===t?n():(Q("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class NE extends Rd{constructor(t,n,r,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}T_(t,n){return this.connection.Bo("Listen",t,n)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const n=Wv(this.serializer,t),r=(function(i){if(!("targetChange"in i))return st.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?st.min():a.readTime?be(a.readTime):st.min()})(t);return this.listener.d_(n,r)}A_(t){const n={};n.database=Ca(this.serializer),n.addTarget=(function(i,a){let l;const c=a.target;if(l=ba(c)?{documents:Qv(i,c)}:{query:Xv(i,c)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=gd(i,a.resumeToken);const d=Sa(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(st.min())>0){l.readTime=qi(i,a.snapshotVersion.toTimestamp());const d=Sa(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,t);const r=Jv(this.serializer,t);r&&(n.labels=r),this.a_(n)}R_(t){const n={};n.database=Ca(this.serializer),n.removeTarget=t,this.a_(n)}}class OE extends Rd{constructor(t,n,r,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,n){return this.connection.Bo("Write",t,n)}E_(t){return gt(!!t.streamToken),this.lastStreamToken=t.streamToken,gt(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){gt(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const n=Gv(t.writeResults,t.commitTime),r=be(t.commitTime);return this.listener.g_(r,n)}p_(){const t={};t.database=Ca(this.serializer),this.a_(t)}m_(t){const n={streamToken:this.lastStreamToken,writes:t.map((r=>Ed(this.serializer,r)))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME extends class{}{constructor(t,n,r,s){super(),this.authCredentials=t,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new X(N.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Mo(t,Pa(n,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new X(N.UNKNOWN,i.toString())}))}Lo(t,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Lo(t,Pa(n,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new X(N.UNKNOWN,a.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class LE{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(gn(n),this.D_=!1):Q("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(t,n,r,s,i){this.localStore=t,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o((a=>{r.enqueueAndForget((async()=>{lr(this)&&(Q("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const d=ot(c);d.L_.add(4),await zs(d),d.q_.set("Unknown"),d.L_.delete(4),await mo(d)})(this))}))})),this.q_=new LE(r,s)}}async function mo(e){if(lr(e))for(const t of e.B_)await t(!0)}async function zs(e){for(const t of e.B_)await t(!1)}function Sd(e,t){const n=ot(e);n.N_.has(t.targetId)||(n.N_.set(t.targetId,t),Il(n)?wl(n):Lr(n).r_()&&Tl(n,t))}function El(e,t){const n=ot(e),r=Lr(n);n.N_.delete(t),r.r_()&&Pd(n,t),n.N_.size===0&&(r.r_()?r.o_():lr(n)&&n.q_.set("Unknown"))}function Tl(e,t){if(e.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(st.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Lr(e).A_(t)}function Pd(e,t){e.Q_.xe(t),Lr(e).R_(t)}function wl(e){e.Q_=new Uv({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>e.N_.get(t)||null,tt:()=>e.datastore.serializer.databaseId}),Lr(e).start(),e.q_.v_()}function Il(e){return lr(e)&&!Lr(e).n_()&&e.N_.size>0}function lr(e){return ot(e).L_.size===0}function Cd(e){e.Q_=void 0}async function UE(e){e.q_.set("Online")}async function BE(e){e.N_.forEach(((t,n)=>{Tl(e,t)}))}async function jE(e,t){Cd(e),Il(e)?(e.q_.M_(t),wl(e)):e.q_.set("Unknown")}async function $E(e,t,n){if(e.q_.set("Online"),t instanceof md&&t.state===2&&t.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))})(e,t)}catch(r){Q("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Hi(e,r)}else if(t instanceof Si?e.Q_.Ke(t):t instanceof pd?e.Q_.He(t):e.Q_.We(t),!n.isEqual(st.min()))try{const r=await bd(e.localStore);n.compareTo(r)>=0&&await(function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach(((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const h=i.N_.get(d);h&&i.N_.set(d,h.withResumeToken(c.resumeToken,a))}})),l.targetMismatches.forEach(((c,d)=>{const h=i.N_.get(c);if(!h)return;i.N_.set(c,h.withResumeToken(se.EMPTY_BYTE_STRING,h.snapshotVersion)),Pd(i,c);const y=new Sn(h.target,c,d,h.sequenceNumber);Tl(i,y)})),i.remoteSyncer.applyRemoteEvent(l)})(e,n)}catch(r){Q("RemoteStore","Failed to raise snapshot:",r),await Hi(e,r)}}async function Hi(e,t,n){if(!$s(t))throw t;e.L_.add(1),await zs(e),e.q_.set("Offline"),n||(n=()=>bd(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{Q("RemoteStore","Retrying IndexedDB access"),await n(),e.L_.delete(1),await mo(e)}))}function Vd(e,t){return t().catch((n=>Hi(e,n,t)))}async function go(e){const t=ot(e),n=On(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;qE(t);)try{const s=await RE(t.localStore,r);if(s===null){t.O_.length===0&&n.o_();break}r=s.batchId,KE(t,s)}catch(s){await Hi(t,s)}xd(t)&&Dd(t)}function qE(e){return lr(e)&&e.O_.length<10}function KE(e,t){e.O_.push(t);const n=On(e);n.r_()&&n.V_&&n.m_(t.mutations)}function xd(e){return lr(e)&&!On(e).n_()&&e.O_.length>0}function Dd(e){On(e).start()}async function HE(e){On(e).p_()}async function zE(e){const t=On(e);for(const n of e.O_)t.m_(n.mutations)}async function WE(e,t,n){const r=e.O_.shift(),s=dl.from(r,t,n);await Vd(e,(()=>e.remoteSyncer.applySuccessfulWrite(s))),await go(e)}async function GE(e,t){t&&On(e).V_&&await(async function(r,s){if((function(a){return fd(a)&&a!==N.ABORTED})(s.code)){const i=r.O_.shift();On(r).s_(),await Vd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await go(r)}})(e,t),xd(e)&&Dd(e)}async function Yc(e,t){const n=ot(e);n.asyncQueue.verifyOperationInProgress(),Q("RemoteStore","RemoteStore received new credentials");const r=lr(n);n.L_.add(3),await zs(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.L_.delete(3),await mo(n)}async function QE(e,t){const n=ot(e);t?(n.L_.delete(2),await mo(n)):t||(n.L_.add(2),await zs(n),n.q_.set("Unknown"))}function Lr(e){return e.K_||(e.K_=(function(n,r,s){const i=ot(n);return i.w_(),new NE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:UE.bind(null,e),Ro:BE.bind(null,e),mo:jE.bind(null,e),d_:$E.bind(null,e)}),e.B_.push((async t=>{t?(e.K_.s_(),Il(e)?wl(e):e.q_.set("Unknown")):(await e.K_.stop(),Cd(e))}))),e.K_}function On(e){return e.U_||(e.U_=(function(n,r,s){const i=ot(n);return i.w_(),new OE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(e.datastore,e.asyncQueue,{Eo:()=>Promise.resolve(),Ro:HE.bind(null,e),mo:GE.bind(null,e),f_:zE.bind(null,e),g_:WE.bind(null,e)}),e.B_.push((async t=>{t?(e.U_.s_(),await go(e)):(await e.U_.stop(),e.O_.length>0&&(Q("RemoteStore",`Stopping write stream with ${e.O_.length} pending writes`),e.O_=[]))}))),e.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(t,n,r,s,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new hn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,n,r,s,i){const a=Date.now()+r,l=new Al(t,n,a,s,i);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(N.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bl(e,t){if(gn("AsyncQueue",`${t}: ${e}`),$s(e))return new X(N.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t){this.comparator=t?(n,r)=>t(n,r)||J.comparator(n.key,r.key):(n,r)=>J.comparator(n.key,r.key),this.keyedMap=ls(),this.sortedSet=new kt(this.comparator)}static emptySet(t){return new Ar(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const n=this.keyedMap.get(t);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((n,r)=>(t(n),!1)))}add(t){const n=this.delete(t.key);return n.copy(n.keyedMap.insert(t.key,t),n.sortedSet.insert(t,null))}delete(t){const n=this.get(t);return n?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(n)):this}isEqual(t){if(!(t instanceof Ar)||this.size!==t.size)return!1;const n=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((n=>{t.push(n.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,n){const r=new Ar;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(){this.W_=new kt(J.comparator)}track(t){const n=t.doc.key,r=this.W_.get(n);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(n,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(n):t.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:t.doc}):rt():this.W_=this.W_.insert(n,t)}G_(){const t=[];return this.W_.inorderTraversal(((n,r)=>{t.push(r)})),t}}class Nr{constructor(t,n,r,s,i,a,l,c,d){this.query=t,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(t,n,r,s,i){const a=[];return n.forEach((l=>{a.push({type:0,doc:l})})),new Nr(t,n,Ar.emptySet(n),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&lo(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const n=this.docChanges,r=t.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((t=>t.J_()))}}class YE{constructor(){this.queries=Zc(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=ot(n),i=s.queries;s.queries=Zc(),i.forEach(((a,l)=>{for(const c of l.j_)c.onError(r)}))})(this,new X(N.ABORTED,"Firestore shutting down"))}}function Zc(){return new Mr((e=>Zf(e)),lo)}async function JE(e,t){const n=ot(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.H_()&&t.J_()&&(r=2):(i=new XE,r=t.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const l=bl(a,`Initialization of query '${_r(t.query)}' failed`);return void t.onError(l)}n.queries.set(s,i),i.j_.push(t),t.Z_(n.onlineState),i.z_&&t.X_(i.z_)&&Rl(n)}async function ZE(e,t){const n=ot(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const a=i.j_.indexOf(t);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=t.J_()?0:1:!i.H_()&&t.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function tT(e,t){const n=ot(e);let r=!1;for(const s of t){const i=s.query,a=n.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&Rl(n)}function eT(e,t,n){const r=ot(e),s=r.queries.get(t);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(t)}function Rl(e){e.Y_.forEach((t=>{t.next()}))}var xa,th;(th=xa||(xa={})).ea="default",th.Cache="cache";class nT{constructor(t,n,r){this.query=t,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Nr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let n=!1;return this.na?this.ia(t)&&(this.ta.next(t),n=!0):this.sa(t,this.onlineState)&&(this.oa(t),n=!0),this.ra=t,n}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),n=!0),n}sa(t,n){if(!t.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||n==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(t){t=Nr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==xa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(t){this.key=t}}class Nd{constructor(t){this.key=t}}class rT{constructor(t,n){this.query=t,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=dt(),this.mutatedKeys=dt(),this.Aa=td(t),this.Ra=new Ar(this.Aa)}get Va(){return this.Ta}ma(t,n){const r=n?n.fa:new Jc,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,a=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((h,y)=>{const T=s.get(h),R=uo(this.query,y)?y:null,V=!!T&&this.mutatedKeys.has(T.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let D=!1;T&&R?T.data.isEqual(R.data)?V!==x&&(r.track({type:3,doc:R}),D=!0):this.ga(T,R)||(r.track({type:2,doc:R}),D=!0,(c&&this.Aa(R,c)>0||d&&this.Aa(R,d)<0)&&(l=!0)):!T&&R?(r.track({type:0,doc:R}),D=!0):T&&!R&&(r.track({type:1,doc:T}),D=!0,(c||d)&&(l=!0)),D&&(R?(a=a.add(R),i=x?i.add(h):i.delete(h)):(a=a.delete(h),i=i.delete(h)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const h=this.query.limitType==="F"?a.last():a.first();a=a.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(t,n){return t.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(t,n,r,s){const i=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const a=t.fa.G_();a.sort(((h,y)=>(function(R,V){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return rt()}};return x(R)-x(V)})(h.type,y.type)||this.Aa(h.doc,y.doc))),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,d=c!==this.Ea;return this.Ea=c,a.length!==0||d?{snapshot:new Nr(this.query,t.Ra,i,a,t.mutatedKeys,c===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Jc,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach((n=>this.Ta=this.Ta.add(n))),t.modifiedDocuments.forEach((n=>{})),t.removedDocuments.forEach((n=>this.Ta=this.Ta.delete(n))),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=dt(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const n=[];return t.forEach((r=>{this.da.has(r)||n.push(new Nd(r))})),this.da.forEach((r=>{t.has(r)||n.push(new kd(r))})),n}ba(t){this.Ta=t.Ts,this.da=dt();const n=this.ma(t.documents);return this.applyChanges(n,!0)}Da(){return Nr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class sT{constructor(t,n,r){this.query=t,this.targetId=n,this.view=r}}class iT{constructor(t){this.key=t,this.va=!1}}class oT{constructor(t,n,r,s,i,a){this.localStore=t,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Mr((l=>Zf(l)),lo),this.Ma=new Map,this.xa=new Set,this.Oa=new kt(J.comparator),this.Na=new Map,this.La=new gl,this.Ba={},this.ka=new Map,this.qa=kr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function aT(e,t,n=!0){const r=Bd(e);let s;const i=r.Fa.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Od(r,t,n,!0),s}async function lT(e,t){const n=Bd(e);await Od(n,t,!0,!1)}async function Od(e,t,n,r){const s=await SE(e.localStore,Xe(t)),i=s.targetId,a=e.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await uT(e,t,i,a==="current",s.resumeToken)),e.isPrimaryClient&&n&&Sd(e.remoteStore,s),l}async function uT(e,t,n,r,s){e.Ka=(y,T,R)=>(async function(x,D,G,z){let W=D.view.ma(G);W.ns&&(W=await Gc(x.localStore,D.query,!1).then((({documents:I})=>D.view.ma(I,W))));const B=z&&z.targetChanges.get(D.targetId),ft=z&&z.targetMismatches.get(D.targetId)!=null,_t=D.view.applyChanges(W,x.isPrimaryClient,B,ft);return nh(x,D.targetId,_t.wa),_t.snapshot})(e,y,T,R);const i=await Gc(e.localStore,t,!0),a=new rT(t,i.Ts),l=a.ma(i.documents),c=Hs.createSynthesizedTargetChangeForCurrentChange(n,r&&e.onlineState!=="Offline",s),d=a.applyChanges(l,e.isPrimaryClient,c);nh(e,n,d.wa);const h=new sT(t,n,a);return e.Fa.set(t,h),e.Ma.has(n)?e.Ma.get(n).push(t):e.Ma.set(n,[t]),d.snapshot}async function cT(e,t,n){const r=ot(e),s=r.Fa.get(t),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter((a=>!lo(a,t)))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Va(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),n&&El(r.remoteStore,s.targetId),Da(r,s.targetId)})).catch(js)):(Da(r,s.targetId),await Va(r.localStore,s.targetId,!0))}async function hT(e,t){const n=ot(e),r=n.Fa.get(t),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),El(n.remoteStore,r.targetId))}async function fT(e,t,n){const r=vT(e);try{const s=await(function(a,l){const c=ot(a),d=Wt.now(),h=l.reduce(((R,V)=>R.add(V.key)),dt());let y,T;return c.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let V=_n(),x=dt();return c.cs.getEntries(R,h).next((D=>{V=D,V.forEach(((G,z)=>{z.isValidDocument()||(x=x.add(G))}))})).next((()=>c.localDocuments.getOverlayedDocuments(R,V))).next((D=>{y=D;const G=[];for(const z of l){const W=kv(z,y.get(z.key).overlayedDocument);W!=null&&G.push(new Mn(z.key,W,zf(W.value.mapValue),Ee.exists(!0)))}return c.mutationQueue.addMutationBatch(R,d,G,l)})).next((D=>{T=D;const G=D.applyToLocalDocumentSet(y,x);return c.documentOverlayCache.saveOverlays(R,D.batchId,G)}))})).then((()=>({batchId:T.batchId,changes:nd(y)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,c){let d=a.Ba[a.currentUser.toKey()];d||(d=new kt(Et)),d=d.insert(l,c),a.Ba[a.currentUser.toKey()]=d})(r,s.batchId,n),await Ws(r,s.changes),await go(r.remoteStore)}catch(s){const i=bl(s,"Failed to persist write");n.reject(i)}}async function Md(e,t){const n=ot(e);try{const r=await AE(n.localStore,t);t.targetChanges.forEach(((s,i)=>{const a=n.Na.get(i);a&&(gt(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?gt(a.va):s.removedDocuments.size>0&&(gt(a.va),a.va=!1))})),await Ws(n,r,t)}catch(r){await js(r)}}function eh(e,t,n){const r=ot(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach(((i,a)=>{const l=a.view.Z_(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const c=ot(a);c.onlineState=l;let d=!1;c.queries.forEach(((h,y)=>{for(const T of y.j_)T.Z_(l)&&(d=!0)})),d&&Rl(c)})(r.eventManager,t),s.length&&r.Ca.d_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function dT(e,t,n){const r=ot(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Na.get(t),i=s&&s.key;if(i){let a=new kt(J.comparator);a=a.insert(i,Qt.newNoDocument(i,st.min()));const l=dt().add(i),c=new fo(st.min(),new Map,new kt(Et),a,l);await Md(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(t),Sl(r)}else await Va(r.localStore,t,!1).then((()=>Da(r,t,n))).catch(js)}async function pT(e,t){const n=ot(e),r=t.batch.batchId;try{const s=await IE(n.localStore,t);Fd(n,r,null),Ld(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ws(n,s)}catch(s){await js(s)}}async function mT(e,t,n){const r=ot(e);try{const s=await(function(a,l){const c=ot(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let h;return c.mutationQueue.lookupMutationBatch(d,l).next((y=>(gt(y!==null),h=y.keys(),c.mutationQueue.removeMutationBatch(d,y)))).next((()=>c.mutationQueue.performConsistencyCheck(d))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(d,h,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h))).next((()=>c.localDocuments.getDocuments(d,h)))}))})(r.localStore,t);Fd(r,t,n),Ld(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Ws(r,s)}catch(s){await js(s)}}function Ld(e,t){(e.ka.get(t)||[]).forEach((n=>{n.resolve()})),e.ka.delete(t)}function Fd(e,t,n){const r=ot(e);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(n?i.reject(n):i.resolve(),s=s.remove(t)),r.Ba[r.currentUser.toKey()]=s}}function Da(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Ma.get(t))e.Fa.delete(r),n&&e.Ca.$a(r,n);e.Ma.delete(t),e.isPrimaryClient&&e.La.gr(t).forEach((r=>{e.La.containsKey(r)||Ud(e,r)}))}function Ud(e,t){e.xa.delete(t.path.canonicalString());const n=e.Oa.get(t);n!==null&&(El(e.remoteStore,n),e.Oa=e.Oa.remove(t),e.Na.delete(n),Sl(e))}function nh(e,t,n){for(const r of n)r instanceof kd?(e.La.addReference(r.key,t),gT(e,r)):r instanceof Nd?(Q("SyncEngine","Document no longer in limbo: "+r.key),e.La.removeReference(r.key,t),e.La.containsKey(r.key)||Ud(e,r.key)):rt()}function gT(e,t){const n=t.key,r=n.path.canonicalString();e.Oa.get(n)||e.xa.has(r)||(Q("SyncEngine","New document in limbo: "+n),e.xa.add(r),Sl(e))}function Sl(e){for(;e.xa.size>0&&e.Oa.size<e.maxConcurrentLimboResolutions;){const t=e.xa.values().next().value;e.xa.delete(t);const n=new J(Ct.fromString(t)),r=e.qa.next();e.Na.set(r,new iT(n)),e.Oa=e.Oa.insert(n,r),Sd(e.remoteStore,new Sn(Xe(cl(n.path)),r,"TargetPurposeLimboResolution",sl.oe))}}async function Ws(e,t,n){const r=ot(e),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach(((l,c)=>{a.push(r.Ka(c,t,n).then((d=>{var h;if((d||n)&&r.isPrimaryClient){const y=d?!d.fromCache:(h=n==null?void 0:n.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,y?"current":"not-current")}if(d){s.push(d);const y=yl.Wi(c.targetId,d);i.push(y)}})))})),await Promise.all(a),r.Ca.d_(s),await(async function(c,d){const h=ot(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>F.forEach(d,(T=>F.forEach(T.$i,(R=>h.persistence.referenceDelegate.addReference(y,T.targetId,R))).next((()=>F.forEach(T.Ui,(R=>h.persistence.referenceDelegate.removeReference(y,T.targetId,R)))))))))}catch(y){if(!$s(y))throw y;Q("LocalStore","Failed to update sequence numbers: "+y)}for(const y of d){const T=y.targetId;if(!y.fromCache){const R=h.os.get(T),V=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(V);h.os=h.os.insert(T,x)}}})(r.localStore,i))}async function _T(e,t){const n=ot(e);if(!n.currentUser.isEqual(t)){Q("SyncEngine","User change. New user:",t.toKey());const r=await Ad(n.localStore,t);n.currentUser=t,(function(i,a){i.ka.forEach((l=>{l.forEach((c=>{c.reject(new X(N.CANCELLED,a))}))})),i.ka.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Ws(n,r.hs)}}function yT(e,t){const n=ot(e),r=n.Na.get(t);if(r&&r.va)return dt().add(r.key);{let s=dt();const i=n.Ma.get(t);if(!i)return s;for(const a of i){const l=n.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function Bd(e){const t=ot(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Md.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=yT.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=dT.bind(null,t),t.Ca.d_=tT.bind(null,t.eventManager),t.Ca.$a=eT.bind(null,t.eventManager),t}function vT(e){const t=ot(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=pT.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=mT.bind(null,t),t}class zi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=po(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,n){return null}Ha(t,n){return null}za(t){return wE(this.persistence,new EE,t.initialUser,this.serializer)}Ga(t){return new _E(_l.Zr,this.serializer)}Wa(t){return new CE}async terminate(){var t,n;(t=this.gcScheduler)===null||t===void 0||t.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}zi.provider={build:()=>new zi};class ka{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>eh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=_T.bind(null,this.syncEngine),await QE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new YE})()}createDatastore(t){const n=po(t.databaseInfo.databaseId),r=(function(i){return new kE(i)})(t.databaseInfo);return(function(i,a,l,c){return new ME(i,a,l,c)})(t.authCredentials,t.appCheckCredentials,r,n)}createRemoteStore(t){return(function(r,s,i,a,l){return new FE(r,s,i,a,l)})(this.localStore,this.datastore,t.asyncQueue,(n=>eh(this.syncEngine,n,0)),(function(){return Xc.D()?new Xc:new VE})())}createSyncEngine(t,n){return(function(s,i,a,l,c,d,h){const y=new oT(s,i,a,l,c,d);return h&&(y.Qa=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}async terminate(){var t,n;await(async function(s){const i=ot(s);Q("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await zs(i),i.k_.shutdown(),i.q_.set("Unknown")})(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}ka.provider={build:()=>new ka};/**
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
 */class ET{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):gn("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,n){setTimeout((()=>{this.muted||t(n)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new X(N.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await(async function(s,i){const a=ot(s),l={documents:i.map((y=>Ki(a.serializer,y)))},c=await a.Lo("BatchGetDocuments",a.serializer.databaseId,Ct.emptyPath(),l,i.length),d=new Map;c.forEach((y=>{const T=zv(a.serializer,y);d.set(T.key.toString(),T)}));const h=[];return i.forEach((y=>{const T=d.get(y.toString());gt(!!T),h.push(T)})),h})(this.datastore,t);return n.forEach((r=>this.recordVersion(r))),n}set(t,n){this.write(n.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,n){try{this.write(n.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new fl(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((n=>{t.delete(n.key.toString())})),t.forEach(((n,r)=>{const s=J.fromPath(r);this.mutations.push(new hd(s,this.precondition(s)))})),await(async function(r,s){const i=ot(r),a={writes:s.map((l=>Ed(i.serializer,l)))};await i.Mo("Commit",i.serializer.databaseId,Ct.emptyPath(),a)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let n;if(t.isFoundDocument())n=t.version;else{if(!t.isNoDocument())throw rt();n=st.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!n.isEqual(r))throw new X(N.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),n)}precondition(t){const n=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&n?n.isEqual(st.min())?Ee.exists(!1):Ee.updateTime(n):Ee.none()}preconditionForUpdate(t){const n=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&n){if(n.isEqual(st.min()))throw new X(N.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ee.updateTime(n)}return Ee.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class wT{constructor(t,n,r,s,i){this.asyncQueue=t,this.datastore=n,this.options=r,this.updateFunction=s,this.deferred=i,this._u=r.maxAttempts,this.t_=new vl(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const t=new TT(this.datastore),n=this.cu(t);n&&n.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.lu(s)}))))})).catch((r=>{this.lu(r)}))}))}cu(t){try{const n=this.updateFunction(t);return!qs(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(t){this._u>0&&this.hu(t)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(t)}hu(t){if(t.name==="FirebaseError"){const n=t.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!fd(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(t,n,r,s,i){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ue.UNAUTHENTICATED,this.clientId=qf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{Q("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(Q("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new hn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const r=bl(n,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function ea(e,t){e.asyncQueue.verifyOperationInProgress(),Q("FirestoreClient","Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Ad(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function rh(e,t){e.asyncQueue.verifyOperationInProgress();const n=await AT(e);Q("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener((r=>Yc(t.remoteStore,r))),e.setAppCheckTokenChangeListener(((r,s)=>Yc(t.remoteStore,s))),e._onlineComponents=t}async function AT(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Q("FirestoreClient","Using user provided OfflineComponentProvider");try{await ea(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!(function(s){return s.name==="FirebaseError"?s.code===N.FAILED_PRECONDITION||s.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(n))throw n;Cr("Error using user provided cache. Falling back to memory cache: "+n),await ea(e,new zi)}}else Q("FirestoreClient","Using default OfflineComponentProvider"),await ea(e,new zi);return e._offlineComponents}async function Pl(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(Q("FirestoreClient","Using user provided OnlineComponentProvider"),await rh(e,e._uninitializedComponentsProvider._online)):(Q("FirestoreClient","Using default OnlineComponentProvider"),await rh(e,new ka))),e._onlineComponents}function bT(e){return Pl(e).then((t=>t.syncEngine))}function RT(e){return Pl(e).then((t=>t.datastore))}async function ST(e){const t=await Pl(e),n=t.eventManager;return n.onListen=aT.bind(null,t.syncEngine),n.onUnlisten=cT.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=lT.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=hT.bind(null,t.syncEngine),n}function PT(e,t,n={}){const r=new hn;return e.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,c,d){const h=new ET({next:T=>{h.Za(),a.enqueueAndForget((()=>ZE(i,y)));const R=T.docs.has(l);!R&&T.fromCache?d.reject(new X(N.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&T.fromCache&&c&&c.source==="server"?d.reject(new X(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),y=new nT(cl(l.path),h,{includeMetadataChanges:!0,_a:!0});return JE(i,y)})(await ST(e),e.asyncQueue,t,n,r))),r.promise}/**
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
 */function jd(e){const t={};return e.timeoutSeconds!==void 0&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
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
 */const sh=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(e,t,n){if(!n)throw new X(N.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function CT(e,t,n,r){if(t===!0&&r===!0)throw new X(N.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ih(e){if(!J.isDocumentKey(e))throw new X(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function oh(e){if(J.isDocumentKey(e))throw new X(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Cl(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":rt()}function Ls(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new X(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Cl(e);throw new X(N.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
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
 */class ah{constructor(t){var n,r;if(t.host===void 0){if(t.ssl!==void 0)throw new X(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new X(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}CT("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=jd((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(N.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class _o{constructor(t,n,r,s){this._authCredentials=t,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ah({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new X(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ah(t),t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new jy;switch(r.type){case"firstParty":return new Hy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(n){const r=sh.get(n);r&&(Q("ComponentProvider","Removing Datastore"),sh.delete(n),r.terminate())})(this),Promise.resolve()}}function VT(e,t,n,r={}){var s;const i=(e=Ls(e,_o))._getSettings(),a=`${t}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Cr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=ue.MOCK_USER;else{l=bf(r.mockUserToken,(s=e._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new X(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ue(d)}e._authCredentials=new $y(new $f(l,c))}}/**
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
 */class Vl{constructor(t,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Vl(this.firestore,t,this._query)}}class Re{constructor(t,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Re(this.firestore,t,this._key)}}class xn extends Vl{constructor(t,n,r){super(t,n,cl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Re(this.firestore,null,new J(t))}withConverter(t){return new xn(this.firestore,t,this._path)}}function xT(e,t,...n){if(e=Se(e),$d("collection","path",t),e instanceof _o){const r=Ct.fromString(t,...n);return oh(r),new xn(e,null,r)}{if(!(e instanceof Re||e instanceof xn))throw new X(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ct.fromString(t,...n));return oh(r),new xn(e.firestore,null,r)}}function Na(e,t,...n){if(e=Se(e),arguments.length===1&&(t=qf.newId()),$d("doc","path",t),e instanceof _o){const r=Ct.fromString(t,...n);return ih(r),new Re(e,null,new J(r))}{if(!(e instanceof Re||e instanceof xn))throw new X(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ct.fromString(t,...n));return ih(r),new Re(e.firestore,e instanceof xn?e.converter:null,new J(r))}}/**
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
 */class lh{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new vl(this,"async_queue_retry"),this.Vu=()=>{const r=ta();r&&Q("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const n=ta();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const n=ta();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise((()=>{}));const n=new hn;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(t().then(n.resolve,n.reject),n.promise))).then((()=>n.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Pu.push(t),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!$s(t))throw t;Q("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(t){const n=this.mu.then((()=>(this.du=!0,t().catch((r=>{this.Eu=r,this.du=!1;const s=(function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l})(r);throw gn("INTERNAL UNHANDLED ERROR: ",s),r})).then((r=>(this.du=!1,r))))));return this.mu=n,n}enqueueAfterDelay(t,n,r){this.fu(),this.Ru.indexOf(t)>-1&&(n=0);const s=Al.createAndSchedule(this,t,n,r,(i=>this.yu(i)));return this.Tu.push(s),s}fu(){this.Eu&&rt()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const n of this.Tu)if(n.timerId===t)return!0;return!1}bu(t){return this.wu().then((()=>{this.Tu.sort(((n,r)=>n.targetTimeMs-r.targetTimeMs));for(const n of this.Tu)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.wu()}))}Du(t){this.Ru.push(t)}yu(t){const n=this.Tu.indexOf(t);this.Tu.splice(n,1)}}class yo extends _o{constructor(t,n,r,s){super(t,n,r,s),this.type="firestore",this._queue=new lh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new lh(t),this._firestoreClient=void 0,await t}}}function DT(e,t){const n=typeof e=="object"?e:kf(),r=typeof e=="string"?e:"(default)",s=Vf(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=If("firestore");i&&VT(s,...i)}return s}function xl(e){if(e._terminated)throw new X(N.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||kT(e),e._firestoreClient}function kT(e){var t,n,r;const s=e._freezeSettings(),i=(function(l,c,d,h){return new sv(l,c,d,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,jd(h.experimentalLongPollingOptions),h.useFetchStreams)})(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,s);e._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new IT(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&(function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}})(e._componentsProvider))}/**
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
 */class rr{constructor(t){this._byteString=t}static fromBase64String(t){try{return new rr(se.fromBase64String(t))}catch(n){throw new X(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new rr(se.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class vo{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new X(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ee(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class Dl{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new X(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new X(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Et(this._lat,t._lat)||Et(this._long,t._long)}}/**
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
 */class Nl{constructor(t){this._values=(t||[]).map((n=>n))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT=/^__.*__$/;class OT{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return this.fieldMask!==null?new Mn(t,this.data,this.fieldMask,n,this.fieldTransforms):new Ks(t,this.data,n,this.fieldTransforms)}}class qd{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return new Mn(t,this.data,this.fieldMask,n,this.fieldTransforms)}}function Kd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw rt()}}class Ol{constructor(t,n,r,s,i,a){this.settings=t,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Ol(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.Ou(t),s}Nu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return Wi(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find((n=>t.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>t.isPrefixOf(n.field)))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Kd(this.Cu)&&NT.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class MT{constructor(t,n,r){this.databaseId=t,this.ignoreUndefinedProperties=n,this.serializer=r||po(t)}Qu(t,n,r,s=!1){return new Ol({Cu:t,methodName:n,qu:r,path:ee.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Hd(e){const t=e._freezeSettings(),n=po(e._databaseId);return new MT(e._databaseId,!!t.ignoreUndefinedProperties,n)}function zd(e,t,n,r,s,i={}){const a=e.Qu(i.merge||i.mergeFields?2:0,t,n,s);Ml("Data must be an object, but it was:",a,r);const l=Wd(r,a);let c,d;if(i.merge)c=new Ie(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const h=[];for(const y of i.mergeFields){const T=Oa(t,y,n);if(!a.contains(T))throw new X(N.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Qd(h,T)||h.push(T)}c=new Ie(h),d=a.fieldTransforms.filter((y=>c.covers(y.field)))}else c=null,d=a.fieldTransforms;return new OT(new _e(l),c,d)}class Eo extends Dl{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Eo}}function LT(e,t,n,r){const s=e.Qu(1,t,n);Ml("Data must be an object, but it was:",s,r);const i=[],a=_e.empty();ar(r,((c,d)=>{const h=Ll(t,c,n);d=Se(d);const y=s.Nu(h);if(d instanceof Eo)i.push(h);else{const T=To(d,y);T!=null&&(i.push(h),a.set(h,T))}}));const l=new Ie(i);return new qd(a,l,s.fieldTransforms)}function FT(e,t,n,r,s,i){const a=e.Qu(1,t,n),l=[Oa(t,r,n)],c=[s];if(i.length%2!=0)throw new X(N.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)l.push(Oa(t,i[T])),c.push(i[T+1]);const d=[],h=_e.empty();for(let T=l.length-1;T>=0;--T)if(!Qd(d,l[T])){const R=l[T];let V=c[T];V=Se(V);const x=a.Nu(R);if(V instanceof Eo)d.push(R);else{const D=To(V,x);D!=null&&(d.push(R),h.set(R,D))}}const y=new Ie(d);return new qd(h,y,a.fieldTransforms)}function To(e,t){if(Gd(e=Se(e)))return Ml("Unsupported field value:",t,e),Wd(e,t);if(e instanceof Dl)return(function(r,s){if(!Kd(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let c=To(l,s.Lu(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}})(e,t)}return(function(r,s){if((r=Se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Sv(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Wt.fromDate(r);return{timestampValue:qi(s.serializer,i)}}if(r instanceof Wt){const i=new Wt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:qi(s.serializer,i)}}if(r instanceof kl)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof rr)return{bytesValue:gd(s.serializer,r._byteString)};if(r instanceof Re){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ml(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Nl)return(function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map((c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return hl(l.serializer,c)}))}}}}}})(r,s);throw s.Bu(`Unsupported field value: ${Cl(r)}`)})(e,t)}function Wd(e,t){const n={};return Kf(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ar(e,((r,s)=>{const i=To(s,t.Mu(r));i!=null&&(n[r]=i)})),{mapValue:{fields:n}}}function Gd(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof Wt||e instanceof kl||e instanceof rr||e instanceof Re||e instanceof Dl||e instanceof Nl)}function Ml(e,t,n){if(!Gd(n)||!(function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)})(n)){const r=Cl(n);throw r==="an object"?t.Bu(e+" a custom object"):t.Bu(e+" "+r)}}function Oa(e,t,n){if((t=Se(t))instanceof vo)return t._internalPath;if(typeof t=="string")return Ll(e,t);throw Wi("Field path arguments must be of type string or ",e,!1,void 0,n)}const UT=new RegExp("[~\\*/\\[\\]]");function Ll(e,t,n){if(t.search(UT)>=0)throw Wi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new vo(...t.split("."))._internalPath}catch{throw Wi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Wi(e,t,n,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new X(N.INVALID_ARGUMENT,l+e+c)}function Qd(e,t){return e.some((n=>n.isEqual(t)))}/**
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
 */class Gi{constructor(t,n,r,s,i){this._firestore=t,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new BT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const n=this._document.data.field(Xd("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n)}}}class BT extends Gi{data(){return super.data()}}function Xd(e,t){return typeof t=="string"?Ll(e,t):t instanceof vo?t._internalPath:t._delegate._internalPath}class Yd{convertValue(t,n="none"){switch(nr(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Bt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,n);case 5:return t.stringValue;case 6:return this.convertBytes(er(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,n);case 11:return this.convertObject(t.mapValue,n);case 10:return this.convertVectorValue(t.mapValue);default:throw rt()}}convertObject(t,n){return this.convertObjectMap(t.fields,n)}convertObjectMap(t,n="none"){const r={};return ar(t,((s,i)=>{r[s]=this.convertValue(i,n)})),r}convertVectorValue(t){var n,r,s;const i=(s=(r=(n=t.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map((a=>Bt(a.doubleValue)));return new Nl(i)}convertGeoPoint(t){return new kl(Bt(t.latitude),Bt(t.longitude))}convertArray(t,n){return(t.values||[]).map((r=>this.convertValue(r,n)))}convertServerTimestamp(t,n){switch(n){case"previous":const r=ol(t);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ds(t));default:return null}}convertTimestamp(t){const n=Nn(t);return new Wt(n.seconds,n.nanos)}convertDocumentKey(t,n){const r=Ct.fromString(t);gt(Id(r));const s=new ks(r.get(1),r.get(3)),i=new J(r.popFirst(5));return s.isEqual(n)||gn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function Jd(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class jT extends Yd{constructor(t){super(),this.firestore=t}convertBytes(t){return new rr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new Re(this.firestore,null,n)}}/**
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
 */class Zd{constructor(t,n){this.hasPendingWrites=t,this.fromCache=n}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Fl extends Gi{constructor(t,n,r,s,i,a){super(t,n,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const n=new $T(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,n={}){if(this._document){const r=this._document.data.field(Xd("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class $T extends Fl{data(t={}){return super.data(t)}}/**
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
 */function qT(e){e=Ls(e,Re);const t=Ls(e.firestore,yo);return PT(xl(t),e._key).then((n=>zT(t,e,n)))}class tp extends Yd{constructor(t){super(),this.firestore=t}convertBytes(t){return new rr(t)}convertReference(t){const n=this.convertDocumentKey(t,this.firestore._databaseId);return new Re(this.firestore,null,n)}}function KT(e,t){const n=Ls(e.firestore,yo),r=Na(e),s=Jd(e.converter,t);return HT(n,[zd(Hd(e.firestore),"addDoc",r._key,s,e.converter!==null,{}).toMutation(r._key,Ee.exists(!1))]).then((()=>r))}function HT(e,t){return(function(r,s){const i=new hn;return r.asyncQueue.enqueueAndForget((async()=>fT(await bT(r),s,i))),i.promise})(xl(e),t)}function zT(e,t,n){const r=n.docs.get(t._key),s=new tp(e);return new Fl(e,s,t._key,r,new Zd(n.hasPendingWrites,n.fromCache),t.converter)}/**
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
 */const WT={maxAttempts:5};function ns(e,t){if((e=Se(e)).firestore!==t)throw new X(N.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}/**
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
 */class GT extends class{constructor(n,r){this._firestore=n,this._transaction=r,this._dataReader=Hd(n)}get(n){const r=ns(n,this._firestore),s=new jT(this._firestore);return this._transaction.lookup([r._key]).then((i=>{if(!i||i.length!==1)return rt();const a=i[0];if(a.isFoundDocument())return new Gi(this._firestore,s,a.key,a,r.converter);if(a.isNoDocument())return new Gi(this._firestore,s,r._key,null,r.converter);throw rt()}))}set(n,r,s){const i=ns(n,this._firestore),a=Jd(i.converter,r,s),l=zd(this._dataReader,"Transaction.set",i._key,a,i.converter!==null,s);return this._transaction.set(i._key,l),this}update(n,r,s,...i){const a=ns(n,this._firestore);let l;return l=typeof(r=Se(r))=="string"||r instanceof vo?FT(this._dataReader,"Transaction.update",a._key,r,s,i):LT(this._dataReader,"Transaction.update",a._key,r),this._transaction.update(a._key,l),this}delete(n){const r=ns(n,this._firestore);return this._transaction.delete(r._key),this}}{constructor(t,n){super(t,n),this._firestore=t}get(t){const n=ns(t,this._firestore),r=new tp(this._firestore);return super.get(t).then((s=>new Fl(this._firestore,r,n._key,s._document,new Zd(!1,!1),n.converter)))}}function QT(e,t,n){e=Ls(e,yo);const r=Object.assign(Object.assign({},WT),n);return(function(i){if(i.maxAttempts<1)throw new X(N.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(i,a,l){const c=new hn;return i.asyncQueue.enqueueAndForget((async()=>{const d=await RT(i);new wT(i.asyncQueue,d,l,a,c).au()})),c.promise})(xl(e),(s=>t(new GT(e,s))),r)}(function(t,n=!0){(function(s){Or=s})(xf),Cs(new Pr("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new yo(new qy(r.getProvider("auth-internal")),new Wy(r.getProvider("app-check-internal")),(function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new X(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ks(d.options.projectId,h)})(a,s),a);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),Vn(Sc,"4.7.3",t),Vn(Sc,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="firebasestorage.googleapis.com",np="storageBucket",XT=120*1e3,YT=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends or{constructor(t,n,r=0){super(na(t),`Firebase Storage: ${n} (${na(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ut.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return na(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ft;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ft||(Ft={}));function na(e){return"storage/"+e}function Ul(){const e="An unknown error occurred, please check the error payload for server response.";return new Ut(Ft.UNKNOWN,e)}function JT(e){return new Ut(Ft.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function ZT(e){return new Ut(Ft.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function tw(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ut(Ft.UNAUTHENTICATED,e)}function ew(){return new Ut(Ft.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function nw(e){return new Ut(Ft.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function rw(){return new Ut(Ft.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function sw(){return new Ut(Ft.CANCELED,"User canceled the upload/download.")}function iw(e){return new Ut(Ft.INVALID_URL,"Invalid URL '"+e+"'.")}function ow(e){return new Ut(Ft.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function aw(){return new Ut(Ft.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+np+"' property when initializing the app?")}function lw(){return new Ut(Ft.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function uw(){return new Ut(Ft.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function cw(e){return new Ut(Ft.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ma(e){return new Ut(Ft.INVALID_ARGUMENT,e)}function rp(){return new Ut(Ft.APP_DELETED,"The Firebase app was deleted.")}function hw(e){return new Ut(Ft.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ws(e,t){return new Ut(Ft.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function rs(e){throw new Ut(Ft.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=Ae.makeFromUrl(t,n)}catch{return new Ae(t,"")}if(r.path==="")return r;throw ow(t)}static makeFromUrl(t,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(B){B.path.charAt(B.path.length-1)==="/"&&(B.path_=B.path_.slice(0,-1))}const a="(/(.*))?$",l=new RegExp("^gs://"+s+a,"i"),c={bucket:1,path:3};function d(B){B.path_=decodeURIComponent(B.path)}const h="v[A-Za-z0-9_]+",y=n.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",R=new RegExp(`^https?://${y}/${h}/b/${s}/o${T}`,"i"),V={bucket:1,path:3},x=n===ep?"(?:storage.googleapis.com|storage.cloud.google.com)":n,D="([^?#]*)",G=new RegExp(`^https?://${x}/${s}/${D}`,"i"),W=[{regex:l,indices:c,postModify:i},{regex:R,indices:V,postModify:d},{regex:G,indices:{bucket:1,path:2},postModify:d}];for(let B=0;B<W.length;B++){const ft=W[B],_t=ft.regex.exec(t);if(_t){const I=_t[ft.indices.bucket];let g=_t[ft.indices.path];g||(g=""),r=new Ae(I,g),ft.postModify(r);break}}if(r==null)throw iw(t);return r}}class fw{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dw(e,t,n){let r=1,s=null,i=null,a=!1,l=0;function c(){return l===2}let d=!1;function h(...D){d||(d=!0,t.apply(null,D))}function y(D){s=setTimeout(()=>{s=null,e(R,c())},D)}function T(){i&&clearTimeout(i)}function R(D,...G){if(d){T();return}if(D){T(),h.call(null,D,...G);return}if(c()||a){T(),h.call(null,D,...G);return}r<64&&(r*=2);let W;l===1?(l=2,W=0):W=(r+Math.random())*1e3,y(W)}let V=!1;function x(D){V||(V=!0,T(),!d&&(s!==null?(D||(l=2),clearTimeout(s),y(0)):D||(l=1)))}return y(0),i=setTimeout(()=>{a=!0,x(!0)},n),x}function pw(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(e){return e!==void 0}function gw(e){return typeof e=="object"&&!Array.isArray(e)}function Bl(e){return typeof e=="string"||e instanceof String}function uh(e){return jl()&&e instanceof Blob}function jl(){return typeof Blob<"u"}function ch(e,t,n,r){if(r<t)throw Ma(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw Ma(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function sp(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const s=t(r)+"="+t(e[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var Jn;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(Jn||(Jn={}));/**
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
 */function _w(e,t){const n=e>=500&&e<600,s=[408,429].indexOf(e)!==-1,i=t.indexOf(e)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(t,n,r,s,i,a,l,c,d,h,y,T=!0){this.url_=t,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=l,this.errorCallback_=c,this.timeout_=d,this.progressCallback_=h,this.connectionFactory_=y,this.retry=T,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,V)=>{this.resolve_=R,this.reject_=V,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new yi(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=l=>{const c=l.loaded,d=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const l=i.getErrorCode()===Jn.NO_ERROR,c=i.getStatus();if(!l||_w(c,this.additionalRetryCodes_)&&this.retry){const h=i.getErrorCode()===Jn.ABORT;r(!1,new yi(!1,null,h));return}const d=this.successCodes_.indexOf(c)!==-1;r(!0,new yi(d,i))})},n=(r,s)=>{const i=this.resolve_,a=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());mw(c)?i(c):i()}catch(c){a(c)}else if(l!==null){const c=Ul();c.serverResponse=l.getErrorText(),this.errorCallback_?a(this.errorCallback_(l,c)):a(c)}else if(s.canceled){const c=this.appDelete_?rp():sw();a(c)}else{const c=rw();a(c)}};this.canceled_?n(!1,new yi(!1,null,!0)):this.backoffId_=dw(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&pw(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class yi{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function vw(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function Ew(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Tw(e,t){t&&(e["X-Firebase-GMPID"]=t)}function ww(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Iw(e,t,n,r,s,i,a=!0){const l=sp(e.urlParams),c=e.url+l,d=Object.assign({},e.headers);return Tw(d,t),vw(d,n),Ew(d,i),ww(d,r),new yw(c,e.method,d,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function bw(...e){const t=Aw();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(jl())return new Blob(e);throw new Ut(Ft.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Rw(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
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
 */function Sw(e){if(typeof atob>"u")throw cw("base-64");return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ra{constructor(t,n){this.data=t,this.contentType=n||null}}function Pw(e,t){switch(e){case Ge.RAW:return new ra(ip(t));case Ge.BASE64:case Ge.BASE64URL:return new ra(op(e,t));case Ge.DATA_URL:return new ra(Vw(t),xw(t))}throw Ul()}function ip(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const i=r,a=e.charCodeAt(++n);r=65536|(i&1023)<<10|a&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function Cw(e){let t;try{t=decodeURIComponent(e)}catch{throw ws(Ge.DATA_URL,"Malformed data URL.")}return ip(t)}function op(e,t){switch(e){case Ge.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw ws(e,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ge.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw ws(e,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Sw(t)}catch(s){throw s.message.includes("polyfill")?s:ws(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class ap{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw ws(Ge.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Dw(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function Vw(e){const t=new ap(e);return t.base64?op(Ge.BASE64,t.rest):Cw(t.rest)}function xw(e){return new ap(e).contentType}function Dw(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(t,n){let r=0,s="";uh(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,n){if(uh(this.data_)){const r=this.data_,s=Rw(r,t,n);return s===null?null:new Rn(s)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new Rn(r,!0)}}static getBlob(...t){if(jl()){const n=t.map(r=>r instanceof Rn?r.data_:r);return new Rn(bw.apply(null,n))}else{const n=t.map(a=>Bl(a)?Pw(Ge.RAW,a).data:a.data_);let r=0;n.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(a=>{for(let l=0;l<a.length;l++)s[i++]=a[l]}),new Rn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(e){let t;try{t=JSON.parse(e)}catch{return null}return gw(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kw(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Nw(e,t){const n=t.split("/").filter(r=>r.length>0).join("/");return e.length===0?n:e+"/"+n}function up(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow(e,t){return t}class de{constructor(t,n,r,s){this.server=t,this.local=n||t,this.writable=!!r,this.xform=s||Ow}}let vi=null;function Mw(e){return!Bl(e)||e.length<2?e:up(e)}function cp(){if(vi)return vi;const e=[];e.push(new de("bucket")),e.push(new de("generation")),e.push(new de("metageneration")),e.push(new de("name","fullPath",!0));function t(i,a){return Mw(a)}const n=new de("name");n.xform=t,e.push(n);function r(i,a){return a!==void 0?Number(a):a}const s=new de("size");return s.xform=r,e.push(s),e.push(new de("timeCreated")),e.push(new de("updated")),e.push(new de("md5Hash",null,!0)),e.push(new de("cacheControl",null,!0)),e.push(new de("contentDisposition",null,!0)),e.push(new de("contentEncoding",null,!0)),e.push(new de("contentLanguage",null,!0)),e.push(new de("contentType",null,!0)),e.push(new de("metadata","customMetadata",!0)),vi=e,vi}function Lw(e,t){function n(){const r=e.bucket,s=e.fullPath,i=new Ae(r,s);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function Fw(e,t,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const a=n[i];r[a.local]=a.xform(r,t[a.server])}return Lw(r,e),r}function hp(e,t,n){const r=lp(t);return r===null?null:Fw(e,r,n)}function Uw(e,t,n,r){const s=lp(t);if(s===null||!Bl(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const h=e.bucket,y=e.fullPath,T="/b/"+a(h)+"/o/"+a(y),R=$l(T,n,r),V=sp({alt:"media",token:d});return R+V})[0]}function Bw(e,t){const n={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(n[i.server]=e[i.local])}return JSON.stringify(n)}class fp{constructor(t,n,r,s){this.url=t,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(e){if(!e)throw Ul()}function jw(e,t){function n(r,s){const i=hp(e,s,t);return dp(i!==null),i}return n}function $w(e,t){function n(r,s){const i=hp(e,s,t);return dp(i!==null),Uw(i,s,e.host,e._protocol)}return n}function pp(e){function t(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=ew():s=tw():n.getStatus()===402?s=ZT(e.bucket):n.getStatus()===403?s=nw(e.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return t}function qw(e){const t=pp(e);function n(r,s){let i=t(r,s);return r.getStatus()===404&&(i=JT(e.path)),i.serverResponse=s.serverResponse,i}return n}function Kw(e,t,n){const r=t.fullServerUrl(),s=$l(r,e.host,e._protocol),i="GET",a=e.maxOperationRetryTime,l=new fp(s,i,$w(e,n),a);return l.errorHandler=qw(t),l}function Hw(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function zw(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=Hw(null,t)),r}function Ww(e,t,n,r,s){const i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function l(){let W="";for(let B=0;B<2;B++)W=W+Math.random().toString().slice(2);return W}const c=l();a["Content-Type"]="multipart/related; boundary="+c;const d=zw(t,r,s),h=Bw(d,n),y="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+d.contentType+`\r
\r
`,T=`\r
--`+c+"--",R=Rn.getBlob(y,r,T);if(R===null)throw lw();const V={name:d.fullPath},x=$l(i,e.host,e._protocol),D="POST",G=e.maxUploadRetryTime,z=new fp(x,D,jw(e,n),G);return z.urlParams=V,z.headers=a,z.body=R.uploadData(),z.errorHandler=pp(t),z}class Gw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Jn.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Jn.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Jn.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,s){if(this.sent_)throw rs("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw rs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw rs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw rs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw rs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Qw extends Gw{initXhr(){this.xhr_.responseType="text"}}function mp(){return new Qw}/**
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
 */class sr{constructor(t,n){this._service=t,n instanceof Ae?this._location=n:this._location=Ae.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new sr(t,n)}get root(){const t=new Ae(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return up(this._location.path)}get storage(){return this._service}get parent(){const t=kw(this._location.path);if(t===null)return null;const n=new Ae(this._location.bucket,t);return new sr(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw hw(t)}}function Xw(e,t,n){e._throwIfRoot("uploadBytes");const r=Ww(e.storage,e._location,cp(),new Rn(t,!0),n);return e.storage.makeRequestWithTokens(r,mp).then(s=>({metadata:s,ref:e}))}function Yw(e){e._throwIfRoot("getDownloadURL");const t=Kw(e.storage,e._location,cp());return e.storage.makeRequestWithTokens(t,mp).then(n=>{if(n===null)throw uw();return n})}function Jw(e,t){const n=Nw(e._location.path,t),r=new Ae(e._location.bucket,n);return new sr(e.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(e){return/^[A-Za-z]+:\/\//.test(e)}function tI(e,t){return new sr(e,t)}function gp(e,t){if(e instanceof ql){const n=e;if(n._bucket==null)throw aw();const r=new sr(n,n._bucket);return t!=null?gp(r,t):r}else return t!==void 0?Jw(e,t):e}function eI(e,t){if(t&&Zw(t)){if(e instanceof ql)return tI(e,t);throw Ma("To use ref(service, url), the first argument must be a Storage instance.")}else return gp(e,t)}function hh(e,t){const n=t==null?void 0:t[np];return n==null?null:Ae.makeFromBucketSpec(n,e)}function nI(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken=typeof s=="string"?s:bf(s,e.app.options.projectId))}class ql{constructor(t,n,r,s,i){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=ep,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=XT,this._maxUploadRetryTime=YT,this._requests=new Set,s!=null?this._bucket=Ae.makeFromBucketSpec(s,this._host):this._bucket=hh(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=Ae.makeFromBucketSpec(this._url,t):this._bucket=hh(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){ch("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){ch("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new sr(this,t)}_makeRequest(t,n,r,s,i=!0){if(this._deleted)return new fw(rp());{const a=Iw(t,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,s).getPromise()}}const fh="@firebase/storage",dh="0.13.2";/**
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
 */const _p="storage";function rI(e,t,n){return e=Se(e),Xw(e,t,n)}function sI(e){return e=Se(e),Yw(e)}function iI(e,t){return e=Se(e),eI(e,t)}function oI(e=kf(),t){e=Se(e);const r=Vf(e,_p).getImmediate({identifier:t}),s=If("storage");return s&&aI(r,...s),r}function aI(e,t,n,r={}){nI(e,t,n,r)}function lI(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new ql(n,r,s,t,xf)}function uI(){Cs(new Pr(_p,lI,"PUBLIC").setMultipleInstances(!0)),Vn(fh,dh,""),Vn(fh,dh,"esm2017")}uI();const cI={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},yp=Df(cI),Ei=DT(yp),hI=oI(yp),fI=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},dI={class:"p-4 md:p-6 min-h-screen"},pI={class:"max-w-3xl mx-auto space-y-4"},mI={class:"bg-white rounded-2xl p-5 border-t-8 border-teal-600 shadow-md text-center"},gI={class:"text-sm text-slate-600 mt-3"},_I={key:0,class:"bg-white rounded-2xl p-8 border-2 border-emerald-300 shadow-md text-center"},yI={class:"text-3xl font-black text-teal-600 my-3 tracking-wider"},vI={key:0,label:"Qiraati"},EI=["value"],TI={key:1,label:"Non-Qiraati"},wI=["value"],II={key:0,class:"flex flex-wrap gap-2 mt-2"},AI=["href"],bI=["href"],RI={class:"flex gap-3 items-center pt-1.5"},SI={class:"flex items-center gap-1 text-sm"},PI={class:"flex items-center gap-1 text-sm"},CI={key:0,class:"text-[11px] text-emerald-600 mt-1"},VI={key:0,class:"text-[11px] text-emerald-600 mt-1"},xI={class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},DI=["disabled"],kI={key:0,class:"fas fa-spinner fa-spin mr-2"},NI={key:1,class:"fas fa-paper-plane mr-2"},OI={key:0,class:"text-xs text-rose-600 mt-2 text-center"},MI={__name:"PsbFormView",setup(e){const t=Bu({props:["title","icon"],setup(g,{slots:p}){return()=>{var _;return mr("div",{class:"bg-white rounded-2xl p-4 md:p-5 shadow-sm"},[mr("h3",{class:"text-xs font-black text-teal-700 uppercase tracking-wide mb-3"},[mr("i",{class:(g.icon||"")+" mr-1"})," "+g.title]),mr("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-3"},(_=p.default)==null?void 0:_.call(p))])}}}),n=Bu({props:["label","full"],setup(g,{slots:p}){return()=>{var _;return mr("div",{class:g.full?"md:col-span-2":""},[mr("label",{class:"block text-xs font-bold text-slate-500 mb-1 uppercase"},g.label),(_=p.default)==null?void 0:_.call(p)])}}}),r=qn(!1),s=qn(!1),i=qn(""),a=qn(""),l=qn([]),c=is(()=>{const g=new Date,p=g.getFullYear();return g.getMonth()+1>=7?`${p}/${p+1}`:`${p-1}/${p}`}),d=()=>({nama:"",nama_panggilan:"",jk:"",nik:"",no_kk:"",tempat_lahir:"",tgl_lahir:"",alamat_jalan:"",alamat_desa:"",alamat_kecamatan:"",alamat_kabupaten:"",alamat_provinsi:"",lembaga_tujuan:"",ayah:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},ibu:{nama:"",nik:"",tempat_lahir:"",tgl_lahir:"",pendidikan:"",pekerjaan:"",telp:""},yang_mendaftarkan:"",wa_wali:""}),h=qn(d()),y=qn({akta:null,kk:null}),T=is(()=>l.value.filter(g=>/qiraati|tpq|pra ptpt|p3h|ptpt/i.test(g.nama)).map(g=>g.nama)),R=is(()=>l.value.filter(g=>!/qiraati|tpq|pra ptpt|p3h|ptpt/i.test(g.nama)).map(g=>g.nama));function V(g){return(g/1024).toFixed(0)}async function x(g,p=1600,_=.8){return!g||!g.type.startsWith("image/")?g:new Promise(w=>{const b=new FileReader;b.onload=E=>{const Nt=new Image;Nt.onload=()=>{const ye=Math.min(1,p/Nt.width),Ot=Math.round(Nt.width*ye),yt=Math.round(Nt.height*ye),ht=document.createElement("canvas");ht.width=Ot,ht.height=yt,ht.getContext("2d").drawImage(Nt,0,0,Ot,yt),ht.toBlob(je=>{if(!je)return w(g);const ke=new File([je],g.name.replace(/\.(png|webp|gif)$/i,".jpg"),{type:"image/jpeg"});w(ke)},"image/jpeg",_)},Nt.onerror=()=>w(g),Nt.src=E.target.result},b.onerror=()=>w(g),b.readAsDataURL(g)})}async function D(g){var _;const p=(_=g.target.files)==null?void 0:_[0];if(p){if(p.size>5*1024*1024){i.value="Akta terlalu besar (max 5MB)",g.target.value="";return}y.value.akta=await x(p),i.value=""}}async function G(g){var _;const p=(_=g.target.files)==null?void 0:_[0];if(p){if(p.size>5*1024*1024){i.value="KK terlalu besar (max 5MB)",g.target.value="";return}y.value.kk=await x(p),i.value=""}}async function z(g,p){if(!g)return"";const _=iI(hI,p);return await rI(_,g),await sI(_)}async function W(g){const p=Na(Ei,"settings","psb_counter");return await QT(Ei,async _=>{const w=await _.get(p),b=w.exists()?w.data()||{}:{},E=g.replace("/","_"),ye=Number(b[E]||0)+1;b[E]=ye,w.exists()?_.update(p,b):_.set(p,b);const Ot=String(ye).padStart(3,"0");return`PSB-${g.replace("/","-")}-${Ot}`})}async function B(){if(i.value="",!h.value.nama||!h.value.jk||!h.value.tempat_lahir||!h.value.tgl_lahir){i.value="Lengkapi identitas santri";return}if(!h.value.lembaga_tujuan){i.value="Pilih lembaga tujuan";return}if(!h.value.yang_mendaftarkan||!h.value.wa_wali){i.value="Lengkapi data yang mendaftarkan";return}s.value=!0;try{const g=c.value,p=await W(g),_=`psb/${g.replace("/","-")}/${p}`,w=y.value.akta?await z(y.value.akta,`${_}/akta_${y.value.akta.name}`):"",b=y.value.kk?await z(y.value.kk,`${_}/kk_${y.value.kk.name}`):"",E={no_pendaftaran:p,tahun_ajaran:g,tanggal_daftar:new Date().toISOString(),tgl_daftar:new Date().toISOString().slice(0,10),lembaga_tujuan:h.value.lembaga_tujuan,nama:h.value.nama,nama_panggilan:h.value.nama_panggilan,jk:h.value.jk,nik:h.value.nik,no_kk:h.value.no_kk,tempat_lahir:h.value.tempat_lahir,tgl_lahir:h.value.tgl_lahir,alamat_jalan:h.value.alamat_jalan,alamat_desa:h.value.alamat_desa,alamat_kecamatan:h.value.alamat_kecamatan,alamat_kabupaten:h.value.alamat_kabupaten,alamat_provinsi:h.value.alamat_provinsi,ayah:{...h.value.ayah},ibu:{...h.value.ibu},yang_mendaftarkan:h.value.yang_mendaftarkan,nama_wali:h.value.yang_mendaftarkan,wa_wali:h.value.wa_wali,dokumen:{akta_url:w,kk_url:b},acf:{},status:"pending",audit:{created_at:new Date().toISOString(),source:"public_psb_site"}};await KT(xT(Ei,"psb_pendaftaran"),E),a.value=p,r.value=!0}catch(g){i.value="Gagal submit: "+(g.message||g)}finally{s.value=!1}}function ft(){h.value=d(),y.value={akta:null,kk:null},r.value=!1,a.value="",i.value="",window.scrollTo({top:0,behavior:"smooth"})}async function _t(){var g;try{const p=await qT(Na(Ei,"master","lembaga"));if(p.exists()){const _=((g=p.data())==null?void 0:g.list)||[];l.value=_.map(w=>typeof w=="string"?{nama:w}:{nama:(w==null?void 0:w.lembaga)||(w==null?void 0:w.nama)||"",info_pembayaran_url:(w==null?void 0:w.info_pembayaran_url)||"",syarat_ketentuan_url:(w==null?void 0:w.syarat_ketentuan_url)||""}).filter(w=>w.nama)}}catch{l.value=["TPQ Pagi","TPQ Sore","Pra PTPT","PTPT","PPPH","PAUD","TK","SD","MI","SMP","MTs","SMA","MA","Madrasah Diniyah"].map(_=>({nama:_}))}}const I=is(()=>{var g;return(g=h.value)!=null&&g.lembaga_tujuan&&l.value.find(p=>p.nama===h.value.lembaga_tujuan)||null});return Qh(_t),(g,p)=>(Ht(),Jt("div",dI,[q("div",pI,[q("div",mI,[p[31]||(p[31]=q("img",{src:d_,alt:"Logo MU",class:"w-20 h-20 mx-auto mb-3"},null,-1)),p[32]||(p[32]=q("h1",{class:"text-xl md:text-2xl font-black text-slate-800"},"PSB Pondok Pesantren Mambaul Ulum",-1)),p[33]||(p[33]=q("p",{class:"text-xs text-teal-700 font-bold uppercase tracking-widest mt-1"},"Generasi Qurani Pewaris Negeri",-1)),q("p",gI,[p[30]||(p[30]=Me("Formulir Penerimaan Santri Baru — Tahun Ajaran ",-1)),q("b",null,Oe(c.value),1)])]),r.value?(Ht(),Jt("div",_I,[p[35]||(p[35]=q("i",{class:"fas fa-check-circle text-emerald-500 text-6xl mb-3"},null,-1)),p[36]||(p[36]=q("h2",{class:"text-lg font-black text-emerald-700"},"Pendaftaran Berhasil!",-1)),p[37]||(p[37]=q("p",{class:"text-sm text-slate-600 mt-2"},"No. Pendaftaran Anda:",-1)),q("p",yI,Oe(a.value),1),p[38]||(p[38]=q("p",{class:"text-xs text-slate-500"},"Simpan nomor di atas. Admin akan menghubungi via WhatsApp.",-1)),q("button",{onClick:ft,class:"mt-5 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"},[...p[34]||(p[34]=[q("i",{class:"fas fa-plus mr-1"},null,-1),Me("Daftarkan Lagi ",-1)])])])):(Ht(),Jt("form",{key:1,onSubmit:a_(B,["prevent"]),class:"space-y-4"},[tt(ut(t),{title:"Lembaga Tujuan",icon:"fas fa-school"},{default:ct(()=>[tt(ut(n),{label:"Lembaga Tujuan *",full:""},{default:ct(()=>[wt(q("select",{"onUpdate:modelValue":p[0]||(p[0]=_=>h.value.lembaga_tujuan=_),required:"",class:"input"},[p[39]||(p[39]=q("option",{value:""},"-- Pilih Lembaga --",-1)),T.value.length?(Ht(),Jt("optgroup",vI,[(Ht(!0),Jt(Le,null,qu(T.value,_=>(Ht(),Jt("option",{key:_,value:_},Oe(_),9,EI))),128))])):In("",!0),R.value.length?(Ht(),Jt("optgroup",TI,[(Ht(!0),Jt(Le,null,qu(R.value,_=>(Ht(),Jt("option",{key:_,value:_},Oe(_),9,wI))),128))])):In("",!0)],512),[[Go,h.value.lembaga_tujuan]]),I.value&&(I.value.info_pembayaran_url||I.value.syarat_ketentuan_url)?(Ht(),Jt("div",II,[I.value.info_pembayaran_url?(Ht(),Jt("a",{key:0,href:I.value.info_pembayaran_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"},[...p[40]||(p[40]=[q("i",{class:"fas fa-file-invoice-dollar"},null,-1),Me(" Info Pembayaran ",-1)])],8,AI)):In("",!0),I.value.syarat_ketentuan_url?(Ht(),Jt("a",{key:1,href:I.value.syarat_ketentuan_url,target:"_blank",rel:"noopener",class:"inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300"},[...p[41]||(p[41]=[q("i",{class:"fas fa-file-contract"},null,-1),Me(" Syarat & Ketentuan ",-1)])],8,bI)):In("",!0)])):In("",!0)]),_:1})]),_:1}),tt(ut(t),{title:"I. Identitas Santri",icon:"fas fa-user-graduate"},{default:ct(()=>[tt(ut(n),{label:"Nama Lengkap *",full:""},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[1]||(p[1]=_=>h.value.nama=_),type:"text",required:"",placeholder:"Sesuai akta lahir",class:"input"},null,512),[[xt,h.value.nama]])]),_:1}),tt(ut(n),{label:"Nama Panggilan"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[2]||(p[2]=_=>h.value.nama_panggilan=_),type:"text",class:"input"},null,512),[[xt,h.value.nama_panggilan]])]),_:1}),tt(ut(n),{label:"Jenis Kelamin *"},{default:ct(()=>[q("div",RI,[q("label",SI,[wt(q("input",{type:"radio","onUpdate:modelValue":p[3]||(p[3]=_=>h.value.jk=_),value:"L",required:""},null,512),[[dc,h.value.jk]]),p[42]||(p[42]=Me(" Laki-laki",-1))]),q("label",PI,[wt(q("input",{type:"radio","onUpdate:modelValue":p[4]||(p[4]=_=>h.value.jk=_),value:"P"},null,512),[[dc,h.value.jk]]),p[43]||(p[43]=Me(" Perempuan",-1))])])]),_:1}),tt(ut(n),{label:"NIK (16 digit)"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[5]||(p[5]=_=>h.value.nik=_),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[xt,h.value.nik]])]),_:1}),tt(ut(n),{label:"No. KK (16 digit)"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[6]||(p[6]=_=>h.value.no_kk=_),type:"text",inputmode:"numeric",maxlength:"16",pattern:"[0-9]{16}",placeholder:"16 digit",class:"input"},null,512),[[xt,h.value.no_kk]])]),_:1}),tt(ut(n),{label:"Tempat Lahir *"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[7]||(p[7]=_=>h.value.tempat_lahir=_),type:"text",required:"",class:"input"},null,512),[[xt,h.value.tempat_lahir]])]),_:1}),tt(ut(n),{label:"Tanggal Lahir *"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[8]||(p[8]=_=>h.value.tgl_lahir=_),type:"date",required:"",class:"input"},null,512),[[xt,h.value.tgl_lahir]])]),_:1}),tt(ut(n),{label:"Jalan / Dusun",full:""},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[9]||(p[9]=_=>h.value.alamat_jalan=_),type:"text",class:"input",placeholder:"Jalan / Dusun / RT-RW"},null,512),[[xt,h.value.alamat_jalan]])]),_:1}),tt(ut(n),{label:"Desa / Kelurahan"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[10]||(p[10]=_=>h.value.alamat_desa=_),type:"text",class:"input"},null,512),[[xt,h.value.alamat_desa]])]),_:1}),tt(ut(n),{label:"Kecamatan"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[11]||(p[11]=_=>h.value.alamat_kecamatan=_),type:"text",class:"input"},null,512),[[xt,h.value.alamat_kecamatan]])]),_:1}),tt(ut(n),{label:"Kabupaten / Kota"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[12]||(p[12]=_=>h.value.alamat_kabupaten=_),type:"text",class:"input"},null,512),[[xt,h.value.alamat_kabupaten]])]),_:1}),tt(ut(n),{label:"Provinsi"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[13]||(p[13]=_=>h.value.alamat_provinsi=_),type:"text",class:"input"},null,512),[[xt,h.value.alamat_provinsi]])]),_:1})]),_:1}),tt(ut(t),{title:"II. Identitas Ayah",icon:"fas fa-male"},{default:ct(()=>[tt(ut(n),{label:"Nama Ayah"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[14]||(p[14]=_=>h.value.ayah.nama=_),type:"text",class:"input"},null,512),[[xt,h.value.ayah.nama]])]),_:1}),tt(ut(n),{label:"NIK"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[15]||(p[15]=_=>h.value.ayah.nik=_),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[xt,h.value.ayah.nik]])]),_:1}),tt(ut(n),{label:"Tempat Lahir"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[16]||(p[16]=_=>h.value.ayah.tempat_lahir=_),type:"text",class:"input"},null,512),[[xt,h.value.ayah.tempat_lahir]])]),_:1}),tt(ut(n),{label:"Tanggal Lahir"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[17]||(p[17]=_=>h.value.ayah.tgl_lahir=_),type:"date",class:"input"},null,512),[[xt,h.value.ayah.tgl_lahir]])]),_:1}),tt(ut(n),{label:"Pendidikan"},{default:ct(()=>[wt(q("select",{"onUpdate:modelValue":p[18]||(p[18]=_=>h.value.ayah.pendidikan=_),class:"input"},[...p[44]||(p[44]=[q("option",{value:""},"-- Pilih --",-1),q("option",null,"Tidak Sekolah",-1),q("option",null,"SD/Sederajat",-1),q("option",null,"SMP/Sederajat",-1),q("option",null,"SMA/Sederajat",-1),q("option",null,"D1/D2/D3",-1),q("option",null,"S1",-1),q("option",null,"S2",-1),q("option",null,"S3",-1)])],512),[[Go,h.value.ayah.pendidikan]])]),_:1}),tt(ut(n),{label:"Pekerjaan"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[19]||(p[19]=_=>h.value.ayah.pekerjaan=_),type:"text",class:"input"},null,512),[[xt,h.value.ayah.pekerjaan]])]),_:1}),tt(ut(n),{label:"Telp / HP"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[20]||(p[20]=_=>h.value.ayah.telp=_),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[xt,h.value.ayah.telp]])]),_:1})]),_:1}),tt(ut(t),{title:"III. Identitas Ibu",icon:"fas fa-female"},{default:ct(()=>[tt(ut(n),{label:"Nama Ibu"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[21]||(p[21]=_=>h.value.ibu.nama=_),type:"text",class:"input"},null,512),[[xt,h.value.ibu.nama]])]),_:1}),tt(ut(n),{label:"NIK"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[22]||(p[22]=_=>h.value.ibu.nik=_),type:"text",inputmode:"numeric",maxlength:"16",class:"input"},null,512),[[xt,h.value.ibu.nik]])]),_:1}),tt(ut(n),{label:"Tempat Lahir"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[23]||(p[23]=_=>h.value.ibu.tempat_lahir=_),type:"text",class:"input"},null,512),[[xt,h.value.ibu.tempat_lahir]])]),_:1}),tt(ut(n),{label:"Tanggal Lahir"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[24]||(p[24]=_=>h.value.ibu.tgl_lahir=_),type:"date",class:"input"},null,512),[[xt,h.value.ibu.tgl_lahir]])]),_:1}),tt(ut(n),{label:"Pendidikan"},{default:ct(()=>[wt(q("select",{"onUpdate:modelValue":p[25]||(p[25]=_=>h.value.ibu.pendidikan=_),class:"input"},[...p[45]||(p[45]=[q("option",{value:""},"-- Pilih --",-1),q("option",null,"Tidak Sekolah",-1),q("option",null,"SD/Sederajat",-1),q("option",null,"SMP/Sederajat",-1),q("option",null,"SMA/Sederajat",-1),q("option",null,"D1/D2/D3",-1),q("option",null,"S1",-1),q("option",null,"S2",-1),q("option",null,"S3",-1)])],512),[[Go,h.value.ibu.pendidikan]])]),_:1}),tt(ut(n),{label:"Pekerjaan"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[26]||(p[26]=_=>h.value.ibu.pekerjaan=_),type:"text",class:"input"},null,512),[[xt,h.value.ibu.pekerjaan]])]),_:1}),tt(ut(n),{label:"Telp / HP"},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[27]||(p[27]=_=>h.value.ibu.telp=_),type:"tel",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[xt,h.value.ibu.telp]])]),_:1})]),_:1}),tt(ut(t),{title:"Upload Dokumen",icon:"fas fa-file-image"},{default:ct(()=>[tt(ut(n),{label:"Akta Kelahiran (image/PDF, max 5MB)",full:""},{default:ct(()=>[q("input",{type:"file",accept:"image/*,application/pdf",onChange:D,class:"input"},null,32),y.value.akta?(Ht(),Jt("p",CI,[p[46]||(p[46]=q("i",{class:"fas fa-check mr-1"},null,-1)),Me(Oe(y.value.akta.name)+" ("+Oe(V(y.value.akta.size))+" KB)",1)])):In("",!0)]),_:1}),tt(ut(n),{label:"Kartu Keluarga (image/PDF, max 5MB)",full:""},{default:ct(()=>[q("input",{type:"file",accept:"image/*,application/pdf",onChange:G,class:"input"},null,32),y.value.kk?(Ht(),Jt("p",VI,[p[47]||(p[47]=q("i",{class:"fas fa-check mr-1"},null,-1)),Me(Oe(y.value.kk.name)+" ("+Oe(V(y.value.kk.size))+" KB)",1)])):In("",!0)]),_:1})]),_:1}),tt(ut(t),{title:"Yang Mendaftarkan",icon:"fas fa-pen-to-square"},{default:ct(()=>[tt(ut(n),{label:"Nama Yang Mendaftarkan *",full:""},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[28]||(p[28]=_=>h.value.yang_mendaftarkan=_),type:"text",required:"",class:"input",placeholder:"Misal: Ayah / Ibu / Wali"},null,512),[[xt,h.value.yang_mendaftarkan]])]),_:1}),tt(ut(n),{label:"WhatsApp *",full:""},{default:ct(()=>[wt(q("input",{"onUpdate:modelValue":p[29]||(p[29]=_=>h.value.wa_wali=_),type:"tel",required:"",inputmode:"numeric",class:"input",placeholder:"081xxxxxxxx"},null,512),[[xt,h.value.wa_wali]])]),_:1})]),_:1}),q("div",xI,[q("button",{type:"submit",disabled:s.value,class:"w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-black text-base rounded-xl transition shadow-md"},[s.value?(Ht(),Jt("i",kI)):(Ht(),Jt("i",NI)),Me(" "+Oe(s.value?"Memproses…":"DAFTARKAN"),1)],8,DI),i.value?(Ht(),Jt("p",OI,[p[48]||(p[48]=q("i",{class:"fas fa-exclamation-triangle mr-1"},null,-1)),Me(Oe(i.value),1)])):In("",!0)])],32)),p[49]||(p[49]=q("p",{class:"text-center text-[10px] text-slate-400 pt-2"}," © 2026 Pondok Pesantren Mambaul Ulum · Public PSB Site v1.0 ",-1))])]))}},LI=fI(MI,[["__scopeId","data-v-4d9b389b"]]),FI={__name:"App",setup(e){return(t,n)=>(Ht(),gf(LI))}};c_(FI).mount("#app");
