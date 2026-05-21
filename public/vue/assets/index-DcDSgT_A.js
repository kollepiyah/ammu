const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginView-CZG7a8sF.js","assets/logo-CxXS7KxG.js","assets/useToast-BzaTl2F7.js","assets/DashboardView-BS7oiQbv.js","assets/useGuru-Dcl3iFjC.js","assets/useLembaga-CNiVMZY4.js","assets/format-CpwY2Om2.js","assets/hijri-BQdwk8_X.js","assets/useMenus-DGpjUy1J.js","assets/DashboardView-B1l9MSnG.css","assets/PengaturanView-Bdbef6VE.js","assets/useConfirm-BCEQcO4f.js","assets/storage-6Acy9wiv.js","assets/createLucideIcon-BgfrK9h3.js","assets/ProfilView-BuOhDrfp.js","assets/SantriView-DcWiV53a.js","assets/useSantri-Ps1U2W3w.js","assets/useExcel-B39bq33N.js","assets/pdfBuilder-Bpi09cMJ.js","assets/pdf-CfElz_X6.js","assets/GuruView-p6k94XL-.js","assets/FieldSchemaView-EAcB42-e.js","assets/KeuanganDashboardView-B0iT7rVY.js","assets/useKeuangan-DSVytYri.js","assets/TagihanView-BotanczJ.js","assets/TabunganView-49yEQUb1.js","assets/BisyarohView-y8goAHAU.js","assets/KritikSaranView-DHLVpq_8.js","assets/AbsensiGuruView-DZDkrMRb.js","assets/SantriFormView-MYMQuFA4.js","assets/GuruFormView-Dwkt5YVm.js","assets/LembagaFormView-B8G6nMwf.js","assets/LembagaDetailView-DIGGHLIp.js","assets/AbsensiSantriView-DD4liVim.js","assets/PostsView-C-wsrFfS.js","assets/BukuIndukView-u_ytVblB.js","assets/LaporanKeuanganView-CwBXNQaz.js","assets/PpdbAdminView-M-_Zt0Yv.js","assets/PpdbDetailView-CbIAoil2.js","assets/PosSantriView-BtelVJxw.js","assets/NaikKelasView-Dh_il72t.js","assets/KalenderKegiatanView-EJ9TajVo.js","assets/StatistikView-B_sRKu26.js","assets/RaporView-0k0OM19-.js","assets/PengaturanKeuanganView-DBxqto6y.js","assets/MasterDataView-DgQHxRVJ.js","assets/KelasView-yHDjZqJr.js","assets/KegiatanPesantrenView-BA5RWSgK.js","assets/HutangPiutangView-BenYKEdZ.js","assets/PembayaranView-B6kdZtN_.js","assets/CapaianPrestasiView-D2ABHmHW.js","assets/PersonalView-BkPS-aEJ.js","assets/AppLayout-B8-c4WgE.js","assets/AppLayout-Cy55l9NA.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Sb="modulepreload",Pb=function(n){return"/"+n},zm={},ge=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(l=>{if(l=Pb(l),l in zm)return;zm[l]=!0;const h=l.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Sb,h||(m.as="script"),m.crossOrigin="",m.href=l,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((g,b)=>{m.addEventListener("load",g),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Yd(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Ue={},Os=[],Gn=()=>{},tI=()=>!1,el=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),tl=n=>n.startsWith("onUpdate:"),yt=Object.assign,Xd=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Cb=Object.prototype.hasOwnProperty,Ne=(n,e)=>Cb.call(n,e),le=Array.isArray,xs=n=>rc(n)==="[object Map]",lo=n=>rc(n)==="[object Set]",$m=n=>rc(n)==="[object Date]",_e=n=>typeof n=="function",ze=n=>typeof n=="string",dn=n=>typeof n=="symbol",Ve=n=>n!==null&&typeof n=="object",nI=n=>(Ve(n)||_e(n))&&_e(n.then)&&_e(n.catch),rI=Object.prototype.toString,rc=n=>rI.call(n),Db=n=>rc(n).slice(8,-1),iI=n=>rc(n)==="[object Object]",nl=n=>ze(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,da=Yd(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),rl=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},kb=/-\w/g,Jt=rl(n=>n.replace(kb,e=>e.slice(1).toUpperCase())),Nb=/\B([A-Z])/g,mi=rl(n=>n.replace(Nb,"-$1").toLowerCase()),il=rl(n=>n.charAt(0).toUpperCase()+n.slice(1)),yh=rl(n=>n?`on${il(n)}`:""),Mn=(n,e)=>!Object.is(n,e),su=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},sI=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},sl=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Vb=n=>{const e=ze(n)?Number(n):NaN;return isNaN(e)?n:e};let Hm;const ol=()=>Hm||(Hm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Zd(n){if(le(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],i=ze(r)?Mb(r):Zd(r);if(i)for(const s in i)e[s]=i[s]}return e}else if(ze(n)||Ve(n))return n}const Ob=/;(?![^(]*\))/g,xb=/:([^]+)/,Lb=/\/\*[^]*?\*\//g;function Mb(n){const e={};return n.replace(Lb,"").split(Ob).forEach(t=>{if(t){const r=t.split(xb);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function ef(n){let e="";if(ze(n))e=n;else if(le(n))for(let t=0;t<n.length;t++){const r=ef(n[t]);r&&(e+=r+" ")}else if(Ve(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Fb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ub=Yd(Fb);function oI(n){return!!n||n===""}function Bb(n,e){if(n.length!==e.length)return!1;let t=!0;for(let r=0;t&&r<n.length;r++)t=ti(n[r],e[r]);return t}function ti(n,e){if(n===e)return!0;let t=$m(n),r=$m(e);if(t||r)return t&&r?n.getTime()===e.getTime():!1;if(t=dn(n),r=dn(e),t||r)return n===e;if(t=le(n),r=le(e),t||r)return t&&r?Bb(n,e):!1;if(t=Ve(n),r=Ve(e),t||r){if(!t||!r)return!1;const i=Object.keys(n).length,s=Object.keys(e).length;if(i!==s)return!1;for(const o in n){const a=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!ti(n[o],e[o]))return!1}}return String(n)===String(e)}function tf(n,e){return n.findIndex(t=>ti(t,e))}const aI=n=>!!(n&&n.__v_isRef===!0),qb=n=>ze(n)?n:n==null?"":le(n)||Ve(n)&&(n.toString===rI||!_e(n.toString))?aI(n)?qb(n.value):JSON.stringify(n,cI,2):String(n),cI=(n,e)=>aI(e)?cI(n,e.value):xs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,i],s)=>(t[Ih(r,s)+" =>"]=i,t),{})}:lo(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ih(t))}:dn(e)?Ih(e):Ve(e)&&!le(e)&&!iI(e)?String(e):e,Ih=(n,e="")=>{var t;return dn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _t;class uI{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&_t&&(_t.active?(this.parent=_t,this.index=(_t.scopes||(_t.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=_t;try{return _t=this,e()}finally{_t=t}}}on(){++this._on===1&&(this.prevScope=_t,_t=this)}off(){if(this._on>0&&--this._on===0){if(_t===this)_t=this.prevScope;else{let e=_t;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function lI(n){return new uI(n)}function hI(){return _t}function jb(n,e=!1){_t&&_t.cleanups.push(n)}let Be;const vh=new WeakSet;class dI{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_t&&(_t.active?_t.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,vh.has(this)&&(vh.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||pI(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Wm(this),mI(this);const e=Be,t=bn;Be=this,bn=!0;try{return this.fn()}finally{gI(this),Be=e,bn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)sf(e);this.deps=this.depsTail=void 0,Wm(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?vh.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){td(this)&&this.run()}get dirty(){return td(this)}}let fI=0,fa,pa;function pI(n,e=!1){if(n.flags|=8,e){n.next=pa,pa=n;return}n.next=fa,fa=n}function nf(){fI++}function rf(){if(--fI>0)return;if(pa){let e=pa;for(pa=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;fa;){let e=fa;for(fa=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function mI(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function gI(n){let e,t=n.depsTail,r=t;for(;r;){const i=r.prevDep;r.version===-1?(r===t&&(t=i),sf(r),Gb(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}n.deps=e,n.depsTail=t}function td(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(_I(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function _I(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Ca)||(n.globalVersion=Ca,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!td(n))))return;n.flags|=2;const e=n.dep,t=Be,r=bn;Be=n,bn=!0;try{mI(n);const i=n.fn(n._value);(e.version===0||Mn(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{Be=t,bn=r,gI(n),n.flags&=-3}}function sf(n,e=!1){const{dep:t,prevSub:r,nextSub:i}=n;if(r&&(r.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)sf(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Gb(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let bn=!0;const yI=[];function gr(){yI.push(bn),bn=!1}function _r(){const n=yI.pop();bn=n===void 0?!0:n}function Wm(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Be;Be=void 0;try{e()}finally{Be=t}}}let Ca=0;class Kb{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class of{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Be||!bn||Be===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Be)t=this.activeLink=new Kb(Be,this),Be.deps?(t.prevDep=Be.depsTail,Be.depsTail.nextDep=t,Be.depsTail=t):Be.deps=Be.depsTail=t,II(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Be.depsTail,t.nextDep=void 0,Be.depsTail.nextDep=t,Be.depsTail=t,Be.deps===t&&(Be.deps=r)}return t}trigger(e){this.version++,Ca++,this.notify(e)}notify(e){nf();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{rf()}}}function II(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)II(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Eu=new WeakMap,zi=Symbol(""),nd=Symbol(""),Da=Symbol("");function Mt(n,e,t){if(bn&&Be){let r=Eu.get(n);r||Eu.set(n,r=new Map);let i=r.get(t);i||(r.set(t,i=new of),i.map=r,i.key=t),i.track()}}function ir(n,e,t,r,i,s){const o=Eu.get(n);if(!o){Ca++;return}const a=c=>{c&&c.trigger()};if(nf(),e==="clear")o.forEach(a);else{const c=le(n),l=c&&nl(t);if(c&&t==="length"){const h=Number(r);o.forEach((f,m)=>{(m==="length"||m===Da||!dn(m)&&m>=h)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),l&&a(o.get(Da)),e){case"add":c?l&&a(o.get("length")):(a(o.get(zi)),xs(n)&&a(o.get(nd)));break;case"delete":c||(a(o.get(zi)),xs(n)&&a(o.get(nd)));break;case"set":xs(n)&&a(o.get(zi));break}}rf()}function zb(n,e){const t=Eu.get(n);return t&&t.get(e)}function vs(n){const e=Pe(n);return e===n?e:(Mt(e,"iterate",Da),hn(n)?e:e.map(Pn))}function al(n){return Mt(n=Pe(n),"iterate",Da),n}function xn(n,e){return yr(n)?Ks(pr(n)?Pn(e):e):Pn(e)}const $b={__proto__:null,[Symbol.iterator](){return Eh(this,Symbol.iterator,n=>xn(this,n))},concat(...n){return vs(this).concat(...n.map(e=>le(e)?vs(e):e))},entries(){return Eh(this,"entries",n=>(n[1]=xn(this,n[1]),n))},every(n,e){return Xn(this,"every",n,e,void 0,arguments)},filter(n,e){return Xn(this,"filter",n,e,t=>t.map(r=>xn(this,r)),arguments)},find(n,e){return Xn(this,"find",n,e,t=>xn(this,t),arguments)},findIndex(n,e){return Xn(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return Xn(this,"findLast",n,e,t=>xn(this,t),arguments)},findLastIndex(n,e){return Xn(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return Xn(this,"forEach",n,e,void 0,arguments)},includes(...n){return Th(this,"includes",n)},indexOf(...n){return Th(this,"indexOf",n)},join(n){return vs(this).join(n)},lastIndexOf(...n){return Th(this,"lastIndexOf",n)},map(n,e){return Xn(this,"map",n,e,void 0,arguments)},pop(){return Go(this,"pop")},push(...n){return Go(this,"push",n)},reduce(n,...e){return Qm(this,"reduce",n,e)},reduceRight(n,...e){return Qm(this,"reduceRight",n,e)},shift(){return Go(this,"shift")},some(n,e){return Xn(this,"some",n,e,void 0,arguments)},splice(...n){return Go(this,"splice",n)},toReversed(){return vs(this).toReversed()},toSorted(n){return vs(this).toSorted(n)},toSpliced(...n){return vs(this).toSpliced(...n)},unshift(...n){return Go(this,"unshift",n)},values(){return Eh(this,"values",n=>xn(this,n))}};function Eh(n,e,t){const r=al(n),i=r[e]();return r!==n&&!hn(n)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.done||(s.value=t(s.value)),s}),i}const Hb=Array.prototype;function Xn(n,e,t,r,i,s){const o=al(n),a=o!==n&&!hn(n),c=o[e];if(c!==Hb[e]){const f=c.apply(n,s);return a?Pn(f):f}let l=t;o!==n&&(a?l=function(f,m){return t.call(this,xn(n,f),m,n)}:t.length>2&&(l=function(f,m){return t.call(this,f,m,n)}));const h=c.call(o,l,r);return a&&i?i(h):h}function Qm(n,e,t,r){const i=al(n),s=i!==n&&!hn(n);let o=t,a=!1;i!==n&&(s?(a=r.length===0,o=function(l,h,f){return a&&(a=!1,l=xn(n,l)),t.call(this,l,xn(n,h),f,n)}):t.length>3&&(o=function(l,h,f){return t.call(this,l,h,f,n)}));const c=i[e](o,...r);return a?xn(n,c):c}function Th(n,e,t){const r=Pe(n);Mt(r,"iterate",Da);const i=r[e](...t);return(i===-1||i===!1)&&cl(t[0])?(t[0]=Pe(t[0]),r[e](...t)):i}function Go(n,e,t=[]){gr(),nf();const r=Pe(n)[e].apply(n,t);return rf(),_r(),r}const Wb=Yd("__proto__,__v_isRef,__isVue"),vI=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(dn));function Qb(n){dn(n)||(n=String(n));const e=Pe(this);return Mt(e,"has",n),e.hasOwnProperty(n)}class EI{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return s;if(t==="__v_raw")return r===(i?s?sR:bI:s?AI:wI).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=le(e);if(!i){let c;if(o&&(c=$b[t]))return c;if(t==="hasOwnProperty")return Qb}const a=Reflect.get(e,t,it(e)?e:r);if((dn(t)?vI.has(t):Wb(t))||(i||Mt(e,"get",t),s))return a;if(it(a)){const c=o&&nl(t)?a:a.value;return i&&Ve(c)?id(c):c}return Ve(a)?i?id(a):ic(a):a}}class TI extends EI{constructor(e=!1){super(!1,e)}set(e,t,r,i){let s=e[t];const o=le(e)&&nl(t);if(!this._isShallow){const l=yr(s);if(!hn(r)&&!yr(r)&&(s=Pe(s),r=Pe(r)),!o&&it(s)&&!it(r))return l||(s.value=r),!0}const a=o?Number(t)<e.length:Ne(e,t),c=Reflect.set(e,t,r,it(e)?e:i);return e===Pe(i)&&(a?Mn(r,s)&&ir(e,"set",t,r):ir(e,"add",t,r)),c}deleteProperty(e,t){const r=Ne(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&r&&ir(e,"delete",t,void 0),i}has(e,t){const r=Reflect.has(e,t);return(!dn(t)||!vI.has(t))&&Mt(e,"has",t),r}ownKeys(e){return Mt(e,"iterate",le(e)?"length":zi),Reflect.ownKeys(e)}}class Jb extends EI{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Yb=new TI,Xb=new Jb,Zb=new TI(!0);const rd=n=>n,Gc=n=>Reflect.getPrototypeOf(n);function eR(n,e,t){return function(...r){const i=this.__v_raw,s=Pe(i),o=xs(s),a=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,l=i[n](...r),h=t?rd:e?Ks:Pn;return!e&&Mt(s,"iterate",c?nd:zi),yt(Object.create(l),{next(){const{value:f,done:m}=l.next();return m?{value:f,done:m}:{value:a?[h(f[0]),h(f[1])]:h(f),done:m}}})}}function Kc(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function tR(n,e){const t={get(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);n||(Mn(i,a)&&Mt(o,"get",i),Mt(o,"get",a));const{has:c}=Gc(o),l=e?rd:n?Ks:Pn;if(c.call(o,i))return l(s.get(i));if(c.call(o,a))return l(s.get(a));s!==o&&s.get(i)},get size(){const i=this.__v_raw;return!n&&Mt(Pe(i),"iterate",zi),i.size},has(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);return n||(Mn(i,a)&&Mt(o,"has",i),Mt(o,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const o=this,a=o.__v_raw,c=Pe(a),l=e?rd:n?Ks:Pn;return!n&&Mt(c,"iterate",zi),a.forEach((h,f)=>i.call(s,l(h),l(f),o))}};return yt(t,n?{add:Kc("add"),set:Kc("set"),delete:Kc("delete"),clear:Kc("clear")}:{add(i){const s=Pe(this),o=Gc(s),a=Pe(i),c=!e&&!hn(i)&&!yr(i)?a:i;return o.has.call(s,c)||Mn(i,c)&&o.has.call(s,i)||Mn(a,c)&&o.has.call(s,a)||(s.add(c),ir(s,"add",c,c)),this},set(i,s){!e&&!hn(s)&&!yr(s)&&(s=Pe(s));const o=Pe(this),{has:a,get:c}=Gc(o);let l=a.call(o,i);l||(i=Pe(i),l=a.call(o,i));const h=c.call(o,i);return o.set(i,s),l?Mn(s,h)&&ir(o,"set",i,s):ir(o,"add",i,s),this},delete(i){const s=Pe(this),{has:o,get:a}=Gc(s);let c=o.call(s,i);c||(i=Pe(i),c=o.call(s,i)),a&&a.call(s,i);const l=s.delete(i);return c&&ir(s,"delete",i,void 0),l},clear(){const i=Pe(this),s=i.size!==0,o=i.clear();return s&&ir(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=eR(i,n,e)}),t}function af(n,e){const t=tR(n,e);return(r,i,s)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?r:Reflect.get(Ne(t,i)&&i in r?t:r,i,s)}const nR={get:af(!1,!1)},rR={get:af(!1,!0)},iR={get:af(!0,!1)};const wI=new WeakMap,AI=new WeakMap,bI=new WeakMap,sR=new WeakMap;function oR(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function aR(n){return n.__v_skip||!Object.isExtensible(n)?0:oR(Db(n))}function ic(n){return yr(n)?n:cf(n,!1,Yb,nR,wI)}function RI(n){return cf(n,!1,Zb,rR,AI)}function id(n){return cf(n,!0,Xb,iR,bI)}function cf(n,e,t,r,i){if(!Ve(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=aR(n);if(s===0)return n;const o=i.get(n);if(o)return o;const a=new Proxy(n,s===2?r:t);return i.set(n,a),a}function pr(n){return yr(n)?pr(n.__v_raw):!!(n&&n.__v_isReactive)}function yr(n){return!!(n&&n.__v_isReadonly)}function hn(n){return!!(n&&n.__v_isShallow)}function cl(n){return n?!!n.__v_raw:!1}function Pe(n){const e=n&&n.__v_raw;return e?Pe(e):n}function uf(n){return!Ne(n,"__v_skip")&&Object.isExtensible(n)&&sI(n,"__v_skip",!0),n}const Pn=n=>Ve(n)?ic(n):n,Ks=n=>Ve(n)?id(n):n;function it(n){return n?n.__v_isRef===!0:!1}function cn(n){return SI(n,!1)}function cR(n){return SI(n,!0)}function SI(n,e){return it(n)?n:new uR(n,e)}class uR{constructor(e,t){this.dep=new of,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Pe(e),this._value=t?e:Pn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||hn(e)||yr(e);e=r?e:Pe(e),Mn(e,t)&&(this._rawValue=e,this._value=r?e:Pn(e),this.dep.trigger())}}function $i(n){return it(n)?n.value:n}const lR={get:(n,e,t)=>e==="__v_raw"?n:$i(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const i=n[e];return it(i)&&!it(t)?(i.value=t,!0):Reflect.set(n,e,t,r)}};function PI(n){return pr(n)?n:new Proxy(n,lR)}function hR(n){const e=le(n)?new Array(n.length):{};for(const t in n)e[t]=fR(n,t);return e}class dR{constructor(e,t,r){this._object=e,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0,this._key=dn(t)?t:String(t),this._raw=Pe(e);let i=!0,s=e;if(!le(e)||dn(this._key)||!nl(this._key))do i=!cl(s)||hn(s);while(i&&(s=s.__v_raw));this._shallow=i}get value(){let e=this._object[this._key];return this._shallow&&(e=$i(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&it(this._raw[this._key])){const t=this._object[this._key];if(it(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return zb(this._raw,this._key)}}function fR(n,e,t){return new dR(n,e,t)}class pR{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new of(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ca-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Be!==this)return pI(this,!0),!0}get value(){const e=this.dep.track();return _I(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function mR(n,e,t=!1){let r,i;return _e(n)?r=n:(r=n.get,i=n.set),new pR(r,i,t)}const zc={},Tu=new WeakMap;let Vi;function gR(n,e=!1,t=Vi){if(t){let r=Tu.get(t);r||Tu.set(t,r=[]),r.push(n)}}function _R(n,e,t=Ue){const{immediate:r,deep:i,once:s,scheduler:o,augmentJob:a,call:c}=t,l=M=>i?M:hn(M)||i===!1||i===0?sr(M,1):sr(M);let h,f,m,g,b=!1,R=!1;if(it(n)?(f=()=>n.value,b=hn(n)):pr(n)?(f=()=>l(n),b=!0):le(n)?(R=!0,b=n.some(M=>pr(M)||hn(M)),f=()=>n.map(M=>{if(it(M))return M.value;if(pr(M))return l(M);if(_e(M))return c?c(M,2):M()})):_e(n)?e?f=c?()=>c(n,2):n:f=()=>{if(m){gr();try{m()}finally{_r()}}const M=Vi;Vi=h;try{return c?c(n,3,[g]):n(g)}finally{Vi=M}}:f=Gn,e&&i){const M=f,H=i===!0?1/0:i;f=()=>sr(M(),H)}const C=hI(),V=()=>{h.stop(),C&&C.active&&Xd(C.effects,h)};if(s&&e){const M=e;e=(...H)=>{M(...H),V()}}let D=R?new Array(n.length).fill(zc):zc;const x=M=>{if(!(!(h.flags&1)||!h.dirty&&!M))if(e){const H=h.run();if(i||b||(R?H.some((j,E)=>Mn(j,D[E])):Mn(H,D))){m&&m();const j=Vi;Vi=h;try{const E=[H,D===zc?void 0:R&&D[0]===zc?[]:D,g];D=H,c?c(e,3,E):e(...E)}finally{Vi=j}}}else h.run()};return a&&a(x),h=new dI(f),h.scheduler=o?()=>o(x,!1):x,g=M=>gR(M,!1,h),m=h.onStop=()=>{const M=Tu.get(h);if(M){if(c)c(M,4);else for(const H of M)H();Tu.delete(h)}},e?r?x(!0):D=h.run():o?o(x.bind(null,!0),!0):h.run(),V.pause=h.pause.bind(h),V.resume=h.resume.bind(h),V.stop=V,V}function sr(n,e=1/0,t){if(e<=0||!Ve(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,it(n))sr(n.value,e,t);else if(le(n))for(let r=0;r<n.length;r++)sr(n[r],e,t);else if(lo(n)||xs(n))n.forEach(r=>{sr(r,e,t)});else if(iI(n)){for(const r in n)sr(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&sr(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function sc(n,e,t,r){try{return r?n(...r):n()}catch(i){ul(i,e,t)}}function Cn(n,e,t,r){if(_e(n)){const i=sc(n,e,t,r);return i&&nI(i)&&i.catch(s=>{ul(s,e,t)}),i}if(le(n)){const i=[];for(let s=0;s<n.length;s++)i.push(Cn(n[s],e,t,r));return i}}function ul(n,e,t,r=!0){const i=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ue;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const h=a.ec;if(h){for(let f=0;f<h.length;f++)if(h[f](n,c,l)===!1)return}a=a.parent}if(s){gr(),sc(s,null,10,[n,c,l]),_r();return}}yR(n,t,i,r,o)}function yR(n,e,t,r=!0,i=!1){if(i)throw n;console.error(n)}const Qt=[];let Nn=-1;const Ls=[];let Gr=null,Ps=0;const CI=Promise.resolve();let wu=null;function ll(n){const e=wu||CI;return n?e.then(this?n.bind(this):n):e}function IR(n){let e=Nn+1,t=Qt.length;for(;e<t;){const r=e+t>>>1,i=Qt[r],s=ka(i);s<n||s===n&&i.flags&2?e=r+1:t=r}return e}function lf(n){if(!(n.flags&1)){const e=ka(n),t=Qt[Qt.length-1];!t||!(n.flags&2)&&e>=ka(t)?Qt.push(n):Qt.splice(IR(e),0,n),n.flags|=1,DI()}}function DI(){wu||(wu=CI.then(NI))}function vR(n){le(n)?Ls.push(...n):Gr&&n.id===-1?Gr.splice(Ps+1,0,n):n.flags&1||(Ls.push(n),n.flags|=1),DI()}function Jm(n,e,t=Nn+1){for(;t<Qt.length;t++){const r=Qt[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;Qt.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function kI(n){if(Ls.length){const e=[...new Set(Ls)].sort((t,r)=>ka(t)-ka(r));if(Ls.length=0,Gr){Gr.push(...e);return}for(Gr=e,Ps=0;Ps<Gr.length;Ps++){const t=Gr[Ps];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Gr=null,Ps=0}}const ka=n=>n.id==null?n.flags&2?-1:1/0:n.id;function NI(n){try{for(Nn=0;Nn<Qt.length;Nn++){const e=Qt[Nn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),sc(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Nn<Qt.length;Nn++){const e=Qt[Nn];e&&(e.flags&=-2)}Nn=-1,Qt.length=0,kI(),wu=null,(Qt.length||Ls.length)&&NI()}}let kt=null,VI=null;function Au(n){const e=kt;return kt=n,VI=n&&n.type.__scopeId||null,e}function sd(n,e=kt,t){if(!e||n._n)return n;const r=(...i)=>{r._d&&Su(-1);const s=Au(e);let o;try{o=n(...i)}finally{Au(s),r._d&&Su(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function _U(n,e){if(kt===null)return n;const t=ml(kt),r=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[s,o,a,c=Ue]=e[i];s&&(_e(s)&&(s={mounted:s,updated:s}),s.deep&&sr(o),r.push({dir:s,instance:t,value:o,oldValue:void 0,arg:a,modifiers:c}))}return n}function Pi(n,e,t,r){const i=n.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(gr(),Cn(c,t,8,[n.el,a,n,e]),_r())}}function ou(n,e){if(Ut){let t=Ut.provides;const r=Ut.parent&&Ut.parent.provides;r===t&&(t=Ut.provides=Object.create(r)),t[n]=e}}function vn(n,e,t=!1){const r=gf();if(r||Hi){let i=Hi?Hi._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&_e(e)?e.call(r&&r.proxy):e}}function ER(){return!!(gf()||Hi)}const TR=Symbol.for("v-scx"),wR=()=>vn(TR);function yU(n,e){return hf(n,null,e)}function Ms(n,e,t){return hf(n,e,t)}function hf(n,e,t=Ue){const{immediate:r,deep:i,flush:s,once:o}=t,a=yt({},t),c=e&&r||!e&&s!=="post";let l;if(Ma){if(s==="sync"){const g=wR();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=Gn,g.resume=Gn,g.pause=Gn,g}}const h=Ut;a.call=(g,b,R)=>Cn(g,h,b,R);let f=!1;s==="post"?a.scheduler=g=>{Ht(g,h&&h.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(g,b)=>{b?g():lf(g)}),a.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,h&&(g.id=h.uid,g.i=h))};const m=_R(n,e,a);return Ma&&(l?l.push(m):c&&m()),m}function AR(n,e,t){const r=this.proxy,i=ze(n)?n.includes(".")?OI(r,n):()=>r[n]:n.bind(r,r);let s;_e(e)?s=e:(s=e.handler,t=e);const o=oc(this),a=hf(i,s.bind(r),t);return o(),a}function OI(n,e){const t=e.split(".");return()=>{let r=n;for(let i=0;i<t.length&&r;i++)r=r[t[i]];return r}}const qr=new WeakMap,xI=Symbol("_vte"),LI=n=>n.__isTeleport,Li=n=>n&&(n.disabled||n.disabled===""),bR=n=>n&&(n.defer||n.defer===""),Ym=n=>typeof SVGElement<"u"&&n instanceof SVGElement,Xm=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,od=(n,e)=>{const t=n&&n.to;return ze(t)?e?e(t):null:t},RR={name:"Teleport",__isTeleport:!0,process(n,e,t,r,i,s,o,a,c,l){const{mc:h,pc:f,pbc:m,o:{insert:g,querySelector:b,createText:R,createComment:C,parentNode:V}}=l,D=Li(e.props);let{dynamicChildren:x}=e;const M=(E,_,y)=>{E.shapeFlag&16&&h(E.children,_,y,i,s,o,a,c)},H=(E=e)=>{const _=Li(E.props),y=E.target=od(E.props,b),v=ad(y,E,R,g);y&&(o!=="svg"&&Ym(y)?o="svg":o!=="mathml"&&Xm(y)&&(o="mathml"),i&&i.isCE&&(i.ce._teleportTargets||(i.ce._teleportTargets=new Set)).add(y),_||(M(E,y,v),ta(E,!1)))},j=E=>{const _=()=>{if(qr.get(E)===_){if(qr.delete(E),Li(E.props)){const y=V(E.el)||t;M(E,y,E.anchor),ta(E,!0)}H(E)}};qr.set(E,_),Ht(_,s)};if(n==null){const E=e.el=R(""),_=e.anchor=R("");if(g(E,t,r),g(_,t,r),bR(e.props)||s&&s.pendingBranch){j(e);return}D&&(M(e,t,_),ta(e,!0)),H()}else{e.el=n.el;const E=e.anchor=n.anchor,_=qr.get(n);if(_){_.flags|=8,qr.delete(n),j(e);return}e.targetStart=n.targetStart;const y=e.target=n.target,v=e.targetAnchor=n.targetAnchor,P=Li(n.props),A=P?t:y,T=P?E:v;if(o==="svg"||Ym(y)?o="svg":(o==="mathml"||Xm(y))&&(o="mathml"),x?(m(n.dynamicChildren,x,A,i,s,o,a),pf(n,e,!0)):c||f(n,e,A,T,i,s,o,a,!1),D)P?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):$c(e,t,E,l,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const Se=e.target=od(e.props,b);Se&&$c(e,Se,null,l,0)}else P&&$c(e,y,v,l,1);ta(e,D)}},remove(n,e,t,{um:r,o:{remove:i}},s){const{shapeFlag:o,children:a,anchor:c,targetStart:l,targetAnchor:h,target:f,props:m}=n;let g=s||!Li(m);const b=qr.get(n);if(b&&(b.flags|=8,qr.delete(n),g=!1),f&&(i(l),i(h)),s&&i(c),o&16)for(let R=0;R<a.length;R++){const C=a[R];r(C,e,t,g,!!C.dynamicChildren)}},move:$c,hydrate:SR};function $c(n,e,t,{o:{insert:r},m:i},s=2){s===0&&r(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:c,children:l,props:h}=n,f=s===2;if(f&&r(o,e,t),!qr.has(n)&&(!f||Li(h))&&c&16)for(let m=0;m<l.length;m++)i(l[m],e,t,2);f&&r(a,e,t)}function SR(n,e,t,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:l,createText:h}},f){function m(C,V){let D=V;for(;D;){if(D&&D.nodeType===8){if(D.data==="teleport start anchor")e.targetStart=D;else if(D.data==="teleport anchor"){e.targetAnchor=D,C._lpa=e.targetAnchor&&o(e.targetAnchor);break}}D=o(D)}}function g(C,V){V.anchor=f(o(C),V,a(C),t,r,i,s)}const b=e.target=od(e.props,c),R=Li(e.props);if(b){const C=b._lpa||b.firstChild;e.shapeFlag&16&&(R?(g(n,e),m(b,C),e.targetAnchor||ad(b,e,h,l,a(n)===b?n:null)):(e.anchor=o(n),m(b,C),e.targetAnchor||ad(b,e,h,l),f(C&&o(C),e,b,t,r,i,s))),ta(e,R)}else R&&e.shapeFlag&16&&(g(n,e),e.targetStart=n,e.targetAnchor=o(n));return e.anchor&&o(e.anchor)}const IU=RR;function ta(n,e){const t=n.ctx;if(t&&t.ut){let r,i;for(e?(r=n.el,i=n.anchor):(r=n.targetStart,i=n.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute("data-v-owner",t.uid),r=r.nextSibling;t.ut()}}function ad(n,e,t,r,i=null){const s=e.targetStart=t(""),o=e.targetAnchor=t("");return s[xI]=o,n&&(r(s,n,i),r(o,n,i)),o}const Vn=Symbol("_leaveCb"),Ko=Symbol("_enterCb");function PR(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return zI(()=>{n.isMounted=!0}),$I(()=>{n.isUnmounting=!0}),n}const yn=[Function,Array],MI={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:yn,onEnter:yn,onAfterEnter:yn,onEnterCancelled:yn,onBeforeLeave:yn,onLeave:yn,onAfterLeave:yn,onLeaveCancelled:yn,onBeforeAppear:yn,onAppear:yn,onAfterAppear:yn,onAppearCancelled:yn},FI=n=>{const e=n.subTree;return e.component?FI(e.component):e},CR={name:"BaseTransition",props:MI,setup(n,{slots:e}){const t=gf(),r=PR();return()=>{const i=e.default&&qI(e.default(),!0),s=i&&i.length?UI(i):t.subTree?IS():void 0;if(!s)return;const o=Pe(n),{mode:a}=o;if(r.isLeaving)return wh(s);const c=Zm(s);if(!c)return wh(s);let l=cd(c,o,r,t,f=>l=f);c.type!==Ft&&Na(c,l);let h=t.subTree&&Zm(t.subTree);if(h&&h.type!==Ft&&!Mi(h,c)&&FI(t).type!==Ft){let f=cd(h,o,r,t);if(Na(h,f),a==="out-in"&&c.type!==Ft)return r.isLeaving=!0,f.afterLeave=()=>{r.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,h=void 0},wh(s);a==="in-out"&&c.type!==Ft?f.delayLeave=(m,g,b)=>{const R=BI(r,h);R[String(h.key)]=h,m[Vn]=()=>{g(),m[Vn]=void 0,delete l.delayedLeave,h=void 0},l.delayedLeave=()=>{b(),delete l.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return s}}};function UI(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Ft){e=t;break}}return e}const DR=CR;function BI(n,e){const{leavingVNodes:t}=n;let r=t.get(e.type);return r||(r=Object.create(null),t.set(e.type,r)),r}function cd(n,e,t,r,i){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:h,onEnterCancelled:f,onBeforeLeave:m,onLeave:g,onAfterLeave:b,onLeaveCancelled:R,onBeforeAppear:C,onAppear:V,onAfterAppear:D,onAppearCancelled:x}=e,M=String(n.key),H=BI(t,n),j=(y,v)=>{y&&Cn(y,r,9,v)},E=(y,v)=>{const P=v[1];j(y,v),le(y)?y.every(A=>A.length<=1)&&P():y.length<=1&&P()},_={mode:o,persisted:a,beforeEnter(y){let v=c;if(!t.isMounted)if(s)v=C||c;else return;y[Vn]&&y[Vn](!0);const P=H[M];P&&Mi(n,P)&&P.el[Vn]&&P.el[Vn](),j(v,[y])},enter(y){if(H[M]===n)return;let v=l,P=h,A=f;if(!t.isMounted)if(s)v=V||l,P=D||h,A=x||f;else return;let T=!1;y[Ko]=ut=>{T||(T=!0,ut?j(A,[y]):j(P,[y]),_.delayedLeave&&_.delayedLeave(),y[Ko]=void 0)};const Se=y[Ko].bind(null,!1);v?E(v,[y,Se]):Se()},leave(y,v){const P=String(n.key);if(y[Ko]&&y[Ko](!0),t.isUnmounting)return v();j(m,[y]);let A=!1;y[Vn]=Se=>{A||(A=!0,v(),Se?j(R,[y]):j(b,[y]),y[Vn]=void 0,H[P]===n&&delete H[P])};const T=y[Vn].bind(null,!1);H[P]=n,g?E(g,[y,T]):T()},clone(y){const v=cd(y,e,t,r,i);return i&&i(v),v}};return _}function wh(n){if(hl(n))return n=ni(n),n.children=null,n}function Zm(n){if(!hl(n))return LI(n.type)&&n.children?UI(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&_e(t.default))return t.default()}}function Na(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Na(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function qI(n,e=!1,t){let r=[],i=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===an?(o.patchFlag&128&&i++,r=r.concat(qI(o.children,e,a))):(e||o.type!==Ft)&&r.push(a!=null?ni(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function jI(n,e){return _e(n)?yt({name:n.name},e,{setup:n}):n}function GI(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function eg(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const bu=new WeakMap;function ma(n,e,t,r,i=!1){if(le(n)){n.forEach((R,C)=>ma(R,e&&(le(e)?e[C]:e),t,r,i));return}if(Fs(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ma(n,e,t,r.component.subTree);return}const s=r.shapeFlag&4?ml(r.component):r.el,o=i?null:s,{i:a,r:c}=n,l=e&&e.r,h=a.refs===Ue?a.refs={}:a.refs,f=a.setupState,m=Pe(f),g=f===Ue?tI:R=>eg(h,R)?!1:Ne(m,R),b=(R,C)=>!(C&&eg(h,C));if(l!=null&&l!==c){if(tg(e),ze(l))h[l]=null,g(l)&&(f[l]=null);else if(it(l)){const R=e;b(l,R.k)&&(l.value=null),R.k&&(h[R.k]=null)}}if(_e(c))sc(c,a,12,[o,h]);else{const R=ze(c),C=it(c);if(R||C){const V=()=>{if(n.f){const D=R?g(c)?f[c]:h[c]:b()||!n.k?c.value:h[n.k];if(i)le(D)&&Xd(D,s);else if(le(D))D.includes(s)||D.push(s);else if(R)h[c]=[s],g(c)&&(f[c]=h[c]);else{const x=[s];b(c,n.k)&&(c.value=x),n.k&&(h[n.k]=x)}}else R?(h[c]=o,g(c)&&(f[c]=o)):C&&(b(c,n.k)&&(c.value=o),n.k&&(h[n.k]=o))};if(o){const D=()=>{V(),bu.delete(n)};D.id=-1,bu.set(n,D),Ht(D,t)}else tg(n),V()}}}function tg(n){const e=bu.get(n);e&&(e.flags|=8,bu.delete(n))}ol().requestIdleCallback;ol().cancelIdleCallback;const Fs=n=>!!n.type.__asyncLoader,hl=n=>n.type.__isKeepAlive;function kR(n,e){KI(n,"a",e)}function NR(n,e){KI(n,"da",e)}function KI(n,e,t=Ut){const r=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(dl(e,r,t),t){let i=t.parent;for(;i&&i.parent;)hl(i.parent.vnode)&&VR(r,e,t,i),i=i.parent}}function VR(n,e,t,r){const i=dl(e,n,r,!0);HI(()=>{Xd(r[e],i)},t)}function dl(n,e,t=Ut,r=!1){if(t){const i=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{gr();const a=oc(t),c=Cn(e,t,n,o);return a(),_r(),c});return r?i.unshift(s):i.push(s),s}}const Ar=n=>(e,t=Ut)=>{(!Ma||n==="sp")&&dl(n,(...r)=>e(...r),t)},OR=Ar("bm"),zI=Ar("m"),xR=Ar("bu"),LR=Ar("u"),$I=Ar("bum"),HI=Ar("um"),MR=Ar("sp"),FR=Ar("rtg"),UR=Ar("rtc");function BR(n,e=Ut){dl("ec",n,e)}const WI="components";function qR(n,e){return JI(WI,n,!0,e)||n}const QI=Symbol.for("v-ndc");function jR(n){return ze(n)?JI(WI,n,!1)||n:n||QI}function JI(n,e,t=!0,r=!1){const i=kt||Ut;if(i){const s=i.type;{const a=PS(s,!1);if(a&&(a===e||a===Jt(e)||a===il(Jt(e))))return s}const o=ng(i[n]||s[n],e)||ng(i.appContext[n],e);return!o&&r?s:o}}function ng(n,e){return n&&(n[e]||n[Jt(e)]||n[il(Jt(e))])}function vU(n,e,t,r){let i;const s=t,o=le(n);if(o||ze(n)){const a=o&&pr(n);let c=!1,l=!1;a&&(c=!hn(n),l=yr(n),n=al(n)),i=new Array(n.length);for(let h=0,f=n.length;h<f;h++)i[h]=e(c?l?Ks(Pn(n[h])):Pn(n[h]):n[h],h,void 0,s)}else if(typeof n=="number"){i=new Array(n);for(let a=0;a<n;a++)i[a]=e(a+1,a,void 0,s)}else if(Ve(n))if(n[Symbol.iterator])i=Array.from(n,(a,c)=>e(a,c,void 0,s));else{const a=Object.keys(n);i=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const h=a[c];i[c]=e(n[h],h,c,s)}}else i=[];return i}function EU(n,e,t={},r,i){if(kt.ce||kt.parent&&Fs(kt.parent)&&kt.parent.ce){const l=Object.keys(t).length>0;return e!=="default"&&(t.name=e),Va(),xa(an,null,[Bt("slot",t,r&&r())],l?-2:64)}let s=n[e];s&&s._c&&(s._d=!1),Va();const o=s&&YI(s(t)),a=t.key||o&&o.key,c=xa(an,{key:(a&&!dn(a)?a:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&n._===1?64:-2);return c.scopeId&&(c.slotScopeIds=[c.scopeId+"-s"]),s&&s._c&&(s._d=!0),c}function YI(n){return n.some(e=>La(e)?!(e.type===Ft||e.type===an&&!YI(e.children)):!0)?n:null}const ud=n=>n?_v(n)?ml(n):ud(n.parent):null,ga=yt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>ud(n.parent),$root:n=>ud(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ZI(n),$forceUpdate:n=>n.f||(n.f=()=>{lf(n.update)}),$nextTick:n=>n.n||(n.n=ll.bind(n.proxy)),$watch:n=>AR.bind(n)}),Ah=(n,e)=>n!==Ue&&!n.__isScriptSetup&&Ne(n,e),GR={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:c}=n;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return i[e];case 4:return t[e];case 3:return s[e]}else{if(Ah(r,e))return o[e]=1,r[e];if(i!==Ue&&Ne(i,e))return o[e]=2,i[e];if(Ne(s,e))return o[e]=3,s[e];if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];ld&&(o[e]=0)}}const l=ga[e];let h,f;if(l)return e==="$attrs"&&Mt(n.attrs,"get",""),l(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];if(f=c.config.globalProperties,Ne(f,e))return f[e]},set({_:n},e,t){const{data:r,setupState:i,ctx:s}=n;return Ah(i,e)?(i[e]=t,!0):r!==Ue&&Ne(r,e)?(r[e]=t,!0):Ne(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:i,props:s,type:o}},a){let c;return!!(t[a]||n!==Ue&&a[0]!=="$"&&Ne(n,a)||Ah(e,a)||Ne(s,a)||Ne(r,a)||Ne(ga,a)||Ne(i.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ne(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function rg(n){return le(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let ld=!0;function KR(n){const e=ZI(n),t=n.proxy,r=n.ctx;ld=!1,e.beforeCreate&&ig(e.beforeCreate,n,"bc");const{data:i,computed:s,methods:o,watch:a,provide:c,inject:l,created:h,beforeMount:f,mounted:m,beforeUpdate:g,updated:b,activated:R,deactivated:C,beforeDestroy:V,beforeUnmount:D,destroyed:x,unmounted:M,render:H,renderTracked:j,renderTriggered:E,errorCaptured:_,serverPrefetch:y,expose:v,inheritAttrs:P,components:A,directives:T,filters:Se}=e;if(l&&zR(l,r,null),o)for(const pe in o){const Te=o[pe];_e(Te)&&(r[pe]=Te.bind(t))}if(i){const pe=i.call(t,t);Ve(pe)&&(n.data=ic(pe))}if(ld=!0,s)for(const pe in s){const Te=s[pe],rn=_e(Te)?Te.bind(t,t):_e(Te.get)?Te.get.bind(t,t):Gn,wn=!_e(Te)&&_e(Te.set)?Te.set.bind(t):Gn,mn=Ct({get:rn,set:wn});Object.defineProperty(r,pe,{enumerable:!0,configurable:!0,get:()=>mn.value,set:Xe=>mn.value=Xe})}if(a)for(const pe in a)XI(a[pe],r,t,pe);if(c){const pe=_e(c)?c.call(t):c;Reflect.ownKeys(pe).forEach(Te=>{ou(Te,pe[Te])})}h&&ig(h,n,"c");function Oe(pe,Te){le(Te)?Te.forEach(rn=>pe(rn.bind(t))):Te&&pe(Te.bind(t))}if(Oe(OR,f),Oe(zI,m),Oe(xR,g),Oe(LR,b),Oe(kR,R),Oe(NR,C),Oe(BR,_),Oe(UR,j),Oe(FR,E),Oe($I,D),Oe(HI,M),Oe(MR,y),le(v))if(v.length){const pe=n.exposed||(n.exposed={});v.forEach(Te=>{Object.defineProperty(pe,Te,{get:()=>t[Te],set:rn=>t[Te]=rn,enumerable:!0})})}else n.exposed||(n.exposed={});H&&n.render===Gn&&(n.render=H),P!=null&&(n.inheritAttrs=P),A&&(n.components=A),T&&(n.directives=T),y&&GI(n)}function zR(n,e,t=Gn){le(n)&&(n=hd(n));for(const r in n){const i=n[r];let s;Ve(i)?"default"in i?s=vn(i.from||r,i.default,!0):s=vn(i.from||r):s=vn(i),it(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[r]=s}}function ig(n,e,t){Cn(le(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function XI(n,e,t,r){let i=r.includes(".")?OI(t,r):()=>t[r];if(ze(n)){const s=e[n];_e(s)&&Ms(i,s)}else if(_e(n))Ms(i,n.bind(t));else if(Ve(n))if(le(n))n.forEach(s=>XI(s,e,t,r));else{const s=_e(n.handler)?n.handler.bind(t):e[n.handler];_e(s)&&Ms(i,s,n)}}function ZI(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!t&&!r?c=e:(c={},i.length&&i.forEach(l=>Ru(c,l,o,!0)),Ru(c,e,o)),Ve(e)&&s.set(e,c),c}function Ru(n,e,t,r=!1){const{mixins:i,extends:s}=e;s&&Ru(n,s,t,!0),i&&i.forEach(o=>Ru(n,o,t,!0));for(const o in e)if(!(r&&o==="expose")){const a=$R[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const $R={data:sg,props:og,emits:og,methods:na,computed:na,beforeCreate:$t,created:$t,beforeMount:$t,mounted:$t,beforeUpdate:$t,updated:$t,beforeDestroy:$t,beforeUnmount:$t,destroyed:$t,unmounted:$t,activated:$t,deactivated:$t,errorCaptured:$t,serverPrefetch:$t,components:na,directives:na,watch:WR,provide:sg,inject:HR};function sg(n,e){return e?n?function(){return yt(_e(n)?n.call(this,this):n,_e(e)?e.call(this,this):e)}:e:n}function HR(n,e){return na(hd(n),hd(e))}function hd(n){if(le(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function $t(n,e){return n?[...new Set([].concat(n,e))]:e}function na(n,e){return n?yt(Object.create(null),n,e):e}function og(n,e){return n?le(n)&&le(e)?[...new Set([...n,...e])]:yt(Object.create(null),rg(n),rg(e??{})):e}function WR(n,e){if(!n)return e;if(!e)return n;const t=yt(Object.create(null),n);for(const r in e)t[r]=$t(n[r],e[r]);return t}function ev(){return{app:null,config:{isNativeTag:tI,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let QR=0;function JR(n,e){return function(r,i=null){_e(r)||(r=yt({},r)),i!=null&&!Ve(i)&&(i=null);const s=ev(),o=new WeakSet,a=[];let c=!1;const l=s.app={_uid:QR++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:DS,get config(){return s.config},set config(h){},use(h,...f){return o.has(h)||(h&&_e(h.install)?(o.add(h),h.install(l,...f)):_e(h)&&(o.add(h),h(l,...f))),l},mixin(h){return s.mixins.includes(h)||s.mixins.push(h),l},component(h,f){return f?(s.components[h]=f,l):s.components[h]},directive(h,f){return f?(s.directives[h]=f,l):s.directives[h]},mount(h,f,m){if(!c){const g=l._ceVNode||Bt(r,i);return g.appContext=s,m===!0?m="svg":m===!1&&(m=void 0),n(g,h,m),c=!0,l._container=h,h.__vue_app__=l,ml(g.component)}},onUnmount(h){a.push(h)},unmount(){c&&(Cn(a,l._instance,16),n(null,l._container),delete l._container.__vue_app__)},provide(h,f){return s.provides[h]=f,l},runWithContext(h){const f=Hi;Hi=l;try{return h()}finally{Hi=f}}};return l}}let Hi=null;const YR=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Jt(e)}Modifiers`]||n[`${mi(e)}Modifiers`];function XR(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||Ue;let i=t;const s=e.startsWith("update:"),o=s&&YR(r,e.slice(7));o&&(o.trim&&(i=t.map(h=>ze(h)?h.trim():h)),o.number&&(i=t.map(sl)));let a,c=r[a=yh(e)]||r[a=yh(Jt(e))];!c&&s&&(c=r[a=yh(mi(e))]),c&&Cn(c,n,6,i);const l=r[a+"Once"];if(l){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Cn(l,n,6,i)}}const ZR=new WeakMap;function tv(n,e,t=!1){const r=t?ZR:e.emitsCache,i=r.get(n);if(i!==void 0)return i;const s=n.emits;let o={},a=!1;if(!_e(n)){const c=l=>{const h=tv(l,e,!0);h&&(a=!0,yt(o,h))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!s&&!a?(Ve(n)&&r.set(n,null),null):(le(s)?s.forEach(c=>o[c]=null):yt(o,s),Ve(n)&&r.set(n,o),o)}function fl(n,e){return!n||!el(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ne(n,e[0].toLowerCase()+e.slice(1))||Ne(n,mi(e))||Ne(n,e))}function ag(n){const{type:e,vnode:t,proxy:r,withProxy:i,propsOptions:[s],slots:o,attrs:a,emit:c,render:l,renderCache:h,props:f,data:m,setupState:g,ctx:b,inheritAttrs:R}=n,C=Au(n);let V,D;try{if(t.shapeFlag&4){const M=i||r,H=M;V=Ln(l.call(H,M,h,f,g,m,b)),D=a}else{const M=e;V=Ln(M.length>1?M(f,{attrs:a,slots:o,emit:c}):M(f,null)),D=e.props?a:eS(a)}}catch(M){_a.length=0,ul(M,n,1),V=Bt(Ft)}let x=V;if(D&&R!==!1){const M=Object.keys(D),{shapeFlag:H}=x;M.length&&H&7&&(s&&M.some(tl)&&(D=tS(D,s)),x=ni(x,D,!1,!0))}return t.dirs&&(x=ni(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(t.dirs):t.dirs),t.transition&&Na(x,t.transition),V=x,Au(C),V}const eS=n=>{let e;for(const t in n)(t==="class"||t==="style"||el(t))&&((e||(e={}))[t]=n[t]);return e},tS=(n,e)=>{const t={};for(const r in n)(!tl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function nS(n,e,t){const{props:r,children:i,component:s}=n,{props:o,children:a,patchFlag:c}=e,l=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?cg(r,o,l):!!o;if(c&8){const h=e.dynamicProps;for(let f=0;f<h.length;f++){const m=h[f];if(nv(o,r,m)&&!fl(l,m))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?cg(r,o,l):!0:!!o;return!1}function cg(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(nv(e,n,s)&&!fl(t,s))return!0}return!1}function nv(n,e,t){const r=n[t],i=e[t];return t==="style"&&Ve(r)&&Ve(i)?!ti(r,i):r!==i}function rS({vnode:n,parent:e,suspense:t},r){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=r,n=i),i===n)(n=e.vnode).el=r,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=r)}const rv={},iv=()=>Object.create(rv),sv=n=>Object.getPrototypeOf(n)===rv;function iS(n,e,t,r=!1){const i={},s=iv();n.propsDefaults=Object.create(null),ov(n,e,i,s);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=r?i:RI(i):n.type.props?n.props=i:n.props=s,n.attrs=s}function sS(n,e,t,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=n,a=Pe(i),[c]=n.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const h=n.vnode.dynamicProps;for(let f=0;f<h.length;f++){let m=h[f];if(fl(n.emitsOptions,m))continue;const g=e[m];if(c)if(Ne(s,m))g!==s[m]&&(s[m]=g,l=!0);else{const b=Jt(m);i[b]=dd(c,a,b,g,n,!1)}else g!==s[m]&&(s[m]=g,l=!0)}}}else{ov(n,e,i,s)&&(l=!0);let h;for(const f in a)(!e||!Ne(e,f)&&((h=mi(f))===f||!Ne(e,h)))&&(c?t&&(t[f]!==void 0||t[h]!==void 0)&&(i[f]=dd(c,a,f,void 0,n,!0)):delete i[f]);if(s!==a)for(const f in s)(!e||!Ne(e,f))&&(delete s[f],l=!0)}l&&ir(n.attrs,"set","")}function ov(n,e,t,r){const[i,s]=n.propsOptions;let o=!1,a;if(e)for(let c in e){if(da(c))continue;const l=e[c];let h;i&&Ne(i,h=Jt(c))?!s||!s.includes(h)?t[h]=l:(a||(a={}))[h]=l:fl(n.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(s){const c=Pe(t),l=a||Ue;for(let h=0;h<s.length;h++){const f=s[h];t[f]=dd(i,c,f,l[f],n,!Ne(l,f))}}return o}function dd(n,e,t,r,i,s){const o=n[t];if(o!=null){const a=Ne(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&_e(c)){const{propsDefaults:l}=i;if(t in l)r=l[t];else{const h=oc(i);r=l[t]=c.call(null,e),h()}}else r=c;i.ce&&i.ce._setProp(t,r)}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===mi(t))&&(r=!0))}return r}const oS=new WeakMap;function av(n,e,t=!1){const r=t?oS:e.propsCache,i=r.get(n);if(i)return i;const s=n.props,o={},a=[];let c=!1;if(!_e(n)){const h=f=>{c=!0;const[m,g]=av(f,e,!0);yt(o,m),g&&a.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(h),n.extends&&h(n.extends),n.mixins&&n.mixins.forEach(h)}if(!s&&!c)return Ve(n)&&r.set(n,Os),Os;if(le(s))for(let h=0;h<s.length;h++){const f=Jt(s[h]);ug(f)&&(o[f]=Ue)}else if(s)for(const h in s){const f=Jt(h);if(ug(f)){const m=s[h],g=o[f]=le(m)||_e(m)?{type:m}:yt({},m),b=g.type;let R=!1,C=!0;if(le(b))for(let V=0;V<b.length;++V){const D=b[V],x=_e(D)&&D.name;if(x==="Boolean"){R=!0;break}else x==="String"&&(C=!1)}else R=_e(b)&&b.name==="Boolean";g[0]=R,g[1]=C,(R||Ne(g,"default"))&&a.push(f)}}const l=[o,a];return Ve(n)&&r.set(n,l),l}function ug(n){return n[0]!=="$"&&!da(n)}const df=n=>n==="_"||n==="_ctx"||n==="$stable",ff=n=>le(n)?n.map(Ln):[Ln(n)],aS=(n,e,t)=>{if(e._n)return e;const r=sd((...i)=>ff(e(...i)),t);return r._c=!1,r},cv=(n,e,t)=>{const r=n._ctx;for(const i in n){if(df(i))continue;const s=n[i];if(_e(s))e[i]=aS(i,s,r);else if(s!=null){const o=ff(s);e[i]=()=>o}}},uv=(n,e)=>{const t=ff(e);n.slots.default=()=>t},lv=(n,e,t)=>{for(const r in e)(t||!df(r))&&(n[r]=e[r])},cS=(n,e,t)=>{const r=n.slots=iv();if(n.vnode.shapeFlag&32){const i=e._;i?(lv(r,e,t),t&&sI(r,"_",i,!0)):cv(e,r)}else e&&uv(n,e)},uS=(n,e,t)=>{const{vnode:r,slots:i}=n;let s=!0,o=Ue;if(r.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:lv(i,e,t):(s=!e.$stable,cv(e,i)),o=e}else e&&(uv(n,e),o={default:1});if(s)for(const a in i)!df(a)&&o[a]==null&&delete i[a]},Ht=pS;function lS(n){return hS(n)}function hS(n,e){const t=ol();t.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:c,setText:l,setElementText:h,parentNode:f,nextSibling:m,setScopeId:g=Gn,insertStaticContent:b}=n,R=(w,S,k,U=null,G=null,q=null,ee=void 0,X=null,Q=!!S.dynamicChildren)=>{if(w===S)return;w&&!Mi(w,S)&&(U=B(w),Xe(w,G,q,!0),w=null),S.patchFlag===-2&&(Q=!1,S.dynamicChildren=null);const{type:$,ref:he,shapeFlag:ne}=S;switch($){case pl:C(w,S,k,U);break;case Ft:V(w,S,k,U);break;case au:w==null&&D(S,k,U,ee);break;case an:A(w,S,k,U,G,q,ee,X,Q);break;default:ne&1?H(w,S,k,U,G,q,ee,X,Q):ne&6?T(w,S,k,U,G,q,ee,X,Q):(ne&64||ne&128)&&$.process(w,S,k,U,G,q,ee,X,Q,ce)}he!=null&&G?ma(he,w&&w.ref,q,S||w,!S):he==null&&w&&w.ref!=null&&ma(w.ref,null,q,w,!0)},C=(w,S,k,U)=>{if(w==null)r(S.el=a(S.children),k,U);else{const G=S.el=w.el;S.children!==w.children&&l(G,S.children)}},V=(w,S,k,U)=>{w==null?r(S.el=c(S.children||""),k,U):S.el=w.el},D=(w,S,k,U)=>{[w.el,w.anchor]=b(w.children,S,k,U,w.el,w.anchor)},x=({el:w,anchor:S},k,U)=>{let G;for(;w&&w!==S;)G=m(w),r(w,k,U),w=G;r(S,k,U)},M=({el:w,anchor:S})=>{let k;for(;w&&w!==S;)k=m(w),i(w),w=k;i(S)},H=(w,S,k,U,G,q,ee,X,Q)=>{if(S.type==="svg"?ee="svg":S.type==="math"&&(ee="mathml"),w==null)j(S,k,U,G,q,ee,X,Q);else{const $=w.el&&w.el._isVueCE?w.el:null;try{$&&$._beginPatch(),y(w,S,G,q,ee,X,Q)}finally{$&&$._endPatch()}}},j=(w,S,k,U,G,q,ee,X)=>{let Q,$;const{props:he,shapeFlag:ne,transition:ue,dirs:de}=w;if(Q=w.el=o(w.type,q,he&&he.is,he),ne&8?h(Q,w.children):ne&16&&_(w.children,Q,null,U,G,bh(w,q),ee,X),de&&Pi(w,null,U,"created"),E(Q,w,w.scopeId,ee,U),he){for(const ye in he)ye!=="value"&&!da(ye)&&s(Q,ye,null,he[ye],q,U);"value"in he&&s(Q,"value",null,he.value,q),($=he.onVnodeBeforeMount)&&kn($,U,w)}de&&Pi(w,null,U,"beforeMount");const fe=dS(G,ue);fe&&ue.beforeEnter(Q),r(Q,S,k),(($=he&&he.onVnodeMounted)||fe||de)&&Ht(()=>{try{$&&kn($,U,w),fe&&ue.enter(Q),de&&Pi(w,null,U,"mounted")}finally{}},G)},E=(w,S,k,U,G)=>{if(k&&g(w,k),U)for(let q=0;q<U.length;q++)g(w,U[q]);if(G){let q=G.subTree;if(S===q||fv(q.type)&&(q.ssContent===S||q.ssFallback===S)){const ee=G.vnode;E(w,ee,ee.scopeId,ee.slotScopeIds,G.parent)}}},_=(w,S,k,U,G,q,ee,X,Q=0)=>{for(let $=Q;$<w.length;$++){const he=w[$]=X?rr(w[$]):Ln(w[$]);R(null,he,S,k,U,G,q,ee,X)}},y=(w,S,k,U,G,q,ee)=>{const X=S.el=w.el;let{patchFlag:Q,dynamicChildren:$,dirs:he}=S;Q|=w.patchFlag&16;const ne=w.props||Ue,ue=S.props||Ue;let de;if(k&&Ci(k,!1),(de=ue.onVnodeBeforeUpdate)&&kn(de,k,S,w),he&&Pi(S,w,k,"beforeUpdate"),k&&Ci(k,!0),(ne.innerHTML&&ue.innerHTML==null||ne.textContent&&ue.textContent==null)&&h(X,""),$?v(w.dynamicChildren,$,X,k,U,bh(S,G),q):ee||Te(w,S,X,null,k,U,bh(S,G),q,!1),Q>0){if(Q&16)P(X,ne,ue,k,G);else if(Q&2&&ne.class!==ue.class&&s(X,"class",null,ue.class,G),Q&4&&s(X,"style",ne.style,ue.style,G),Q&8){const fe=S.dynamicProps;for(let ye=0;ye<fe.length;ye++){const De=fe[ye],et=ne[De],ft=ue[De];(ft!==et||De==="value")&&s(X,De,et,ft,G,k)}}Q&1&&w.children!==S.children&&h(X,S.children)}else!ee&&$==null&&P(X,ne,ue,k,G);((de=ue.onVnodeUpdated)||he)&&Ht(()=>{de&&kn(de,k,S,w),he&&Pi(S,w,k,"updated")},U)},v=(w,S,k,U,G,q,ee)=>{for(let X=0;X<S.length;X++){const Q=w[X],$=S[X],he=Q.el&&(Q.type===an||!Mi(Q,$)||Q.shapeFlag&198)?f(Q.el):k;R(Q,$,he,null,U,G,q,ee,!0)}},P=(w,S,k,U,G)=>{if(S!==k){if(S!==Ue)for(const q in S)!da(q)&&!(q in k)&&s(w,q,S[q],null,G,U);for(const q in k){if(da(q))continue;const ee=k[q],X=S[q];ee!==X&&q!=="value"&&s(w,q,X,ee,G,U)}"value"in k&&s(w,"value",S.value,k.value,G)}},A=(w,S,k,U,G,q,ee,X,Q)=>{const $=S.el=w?w.el:a(""),he=S.anchor=w?w.anchor:a("");let{patchFlag:ne,dynamicChildren:ue,slotScopeIds:de}=S;de&&(X=X?X.concat(de):de),w==null?(r($,k,U),r(he,k,U),_(S.children||[],k,he,G,q,ee,X,Q)):ne>0&&ne&64&&ue&&w.dynamicChildren&&w.dynamicChildren.length===ue.length?(v(w.dynamicChildren,ue,k,G,q,ee,X),(S.key!=null||G&&S===G.subTree)&&pf(w,S,!0)):Te(w,S,k,he,G,q,ee,X,Q)},T=(w,S,k,U,G,q,ee,X,Q)=>{S.slotScopeIds=X,w==null?S.shapeFlag&512?G.ctx.activate(S,k,U,ee,Q):Se(S,k,U,G,q,ee,Q):ut(w,S,Q)},Se=(w,S,k,U,G,q,ee)=>{const X=w.component=wS(w,U,G);if(hl(w)&&(X.ctx.renderer=ce),AS(X,!1,ee),X.asyncDep){if(G&&G.registerDep(X,Oe,ee),!w.el){const Q=X.subTree=Bt(Ft);V(null,Q,S,k),w.placeholder=Q.el}}else Oe(X,w,S,k,G,q,ee)},ut=(w,S,k)=>{const U=S.component=w.component;if(nS(w,S,k))if(U.asyncDep&&!U.asyncResolved){pe(U,S,k);return}else U.next=S,U.update();else S.el=w.el,U.vnode=S},Oe=(w,S,k,U,G,q,ee)=>{const X=()=>{if(w.isMounted){let{next:ne,bu:ue,u:de,parent:fe,vnode:ye}=w;{const Nt=hv(w);if(Nt){ne&&(ne.el=ye.el,pe(w,ne,ee)),Nt.asyncDep.then(()=>{Ht(()=>{w.isUnmounted||$()},G)});return}}let De=ne,et;Ci(w,!1),ne?(ne.el=ye.el,pe(w,ne,ee)):ne=ye,ue&&su(ue),(et=ne.props&&ne.props.onVnodeBeforeUpdate)&&kn(et,fe,ne,ye),Ci(w,!0);const ft=ag(w),gn=w.subTree;w.subTree=ft,R(gn,ft,f(gn.el),B(gn),w,G,q),ne.el=ft.el,De===null&&rS(w,ft.el),de&&Ht(de,G),(et=ne.props&&ne.props.onVnodeUpdated)&&Ht(()=>kn(et,fe,ne,ye),G)}else{let ne;const{el:ue,props:de}=S,{bm:fe,m:ye,parent:De,root:et,type:ft}=w,gn=Fs(S);Ci(w,!1),fe&&su(fe),!gn&&(ne=de&&de.onVnodeBeforeMount)&&kn(ne,De,S),Ci(w,!0);{et.ce&&et.ce._hasShadowRoot()&&et.ce._injectChildStyle(ft,w.parent?w.parent.type:void 0);const Nt=w.subTree=ag(w);R(null,Nt,k,U,w,G,q),S.el=Nt.el}if(ye&&Ht(ye,G),!gn&&(ne=de&&de.onVnodeMounted)){const Nt=S;Ht(()=>kn(ne,De,Nt),G)}(S.shapeFlag&256||De&&Fs(De.vnode)&&De.vnode.shapeFlag&256)&&w.a&&Ht(w.a,G),w.isMounted=!0,S=k=U=null}};w.scope.on();const Q=w.effect=new dI(X);w.scope.off();const $=w.update=Q.run.bind(Q),he=w.job=Q.runIfDirty.bind(Q);he.i=w,he.id=w.uid,Q.scheduler=()=>lf(he),Ci(w,!0),$()},pe=(w,S,k)=>{S.component=w;const U=w.vnode.props;w.vnode=S,w.next=null,sS(w,S.props,U,k),uS(w,S.children,k),gr(),Jm(w),_r()},Te=(w,S,k,U,G,q,ee,X,Q=!1)=>{const $=w&&w.children,he=w?w.shapeFlag:0,ne=S.children,{patchFlag:ue,shapeFlag:de}=S;if(ue>0){if(ue&128){wn($,ne,k,U,G,q,ee,X,Q);return}else if(ue&256){rn($,ne,k,U,G,q,ee,X,Q);return}}de&8?(he&16&&Xt($,G,q),ne!==$&&h(k,ne)):he&16?de&16?wn($,ne,k,U,G,q,ee,X,Q):Xt($,G,q,!0):(he&8&&h(k,""),de&16&&_(ne,k,U,G,q,ee,X,Q))},rn=(w,S,k,U,G,q,ee,X,Q)=>{w=w||Os,S=S||Os;const $=w.length,he=S.length,ne=Math.min($,he);let ue;for(ue=0;ue<ne;ue++){const de=S[ue]=Q?rr(S[ue]):Ln(S[ue]);R(w[ue],de,k,null,G,q,ee,X,Q)}$>he?Xt(w,G,q,!0,!1,ne):_(S,k,U,G,q,ee,X,Q,ne)},wn=(w,S,k,U,G,q,ee,X,Q)=>{let $=0;const he=S.length;let ne=w.length-1,ue=he-1;for(;$<=ne&&$<=ue;){const de=w[$],fe=S[$]=Q?rr(S[$]):Ln(S[$]);if(Mi(de,fe))R(de,fe,k,null,G,q,ee,X,Q);else break;$++}for(;$<=ne&&$<=ue;){const de=w[ne],fe=S[ue]=Q?rr(S[ue]):Ln(S[ue]);if(Mi(de,fe))R(de,fe,k,null,G,q,ee,X,Q);else break;ne--,ue--}if($>ne){if($<=ue){const de=ue+1,fe=de<he?S[de].el:U;for(;$<=ue;)R(null,S[$]=Q?rr(S[$]):Ln(S[$]),k,fe,G,q,ee,X,Q),$++}}else if($>ue)for(;$<=ne;)Xe(w[$],G,q,!0),$++;else{const de=$,fe=$,ye=new Map;for($=fe;$<=ue;$++){const Rt=S[$]=Q?rr(S[$]):Ln(S[$]);Rt.key!=null&&ye.set(Rt.key,$)}let De,et=0;const ft=ue-fe+1;let gn=!1,Nt=0;const Nr=new Array(ft);for($=0;$<ft;$++)Nr[$]=0;for($=de;$<=ne;$++){const Rt=w[$];if(et>=ft){Xe(Rt,G,q,!0);continue}let _n;if(Rt.key!=null)_n=ye.get(Rt.key);else for(De=fe;De<=ue;De++)if(Nr[De-fe]===0&&Mi(Rt,S[De])){_n=De;break}_n===void 0?Xe(Rt,G,q,!0):(Nr[_n-fe]=$+1,_n>=Nt?Nt=_n:gn=!0,R(Rt,S[_n],k,null,G,q,ee,X,Q),et++)}const Do=gn?fS(Nr):Os;for(De=Do.length-1,$=ft-1;$>=0;$--){const Rt=fe+$,_n=S[Rt],Sc=S[Rt+1],ms=Rt+1<he?Sc.el||dv(Sc):U;Nr[$]===0?R(null,_n,k,ms,G,q,ee,X,Q):gn&&(De<0||$!==Do[De]?mn(_n,k,ms,2):De--)}}},mn=(w,S,k,U,G=null)=>{const{el:q,type:ee,transition:X,children:Q,shapeFlag:$}=w;if($&6){mn(w.component.subTree,S,k,U);return}if($&128){w.suspense.move(S,k,U);return}if($&64){ee.move(w,S,k,ce);return}if(ee===an){r(q,S,k);for(let ne=0;ne<Q.length;ne++)mn(Q[ne],S,k,U);r(w.anchor,S,k);return}if(ee===au){x(w,S,k);return}if(U!==2&&$&1&&X)if(U===0)X.beforeEnter(q),r(q,S,k),Ht(()=>X.enter(q),G);else{const{leave:ne,delayLeave:ue,afterLeave:de}=X,fe=()=>{w.ctx.isUnmounted?i(q):r(q,S,k)},ye=()=>{q._isLeaving&&q[Vn](!0),ne(q,()=>{fe(),de&&de()})};ue?ue(q,fe,ye):ye()}else r(q,S,k)},Xe=(w,S,k,U=!1,G=!1)=>{const{type:q,props:ee,ref:X,children:Q,dynamicChildren:$,shapeFlag:he,patchFlag:ne,dirs:ue,cacheIndex:de,memo:fe}=w;if(ne===-2&&(G=!1),X!=null&&(gr(),ma(X,null,k,w,!0),_r()),de!=null&&(S.renderCache[de]=void 0),he&256){S.ctx.deactivate(w);return}const ye=he&1&&ue,De=!Fs(w);let et;if(De&&(et=ee&&ee.onVnodeBeforeUnmount)&&kn(et,S,w),he&6)sn(w.component,k,U);else{if(he&128){w.suspense.unmount(k,U);return}ye&&Pi(w,null,S,"beforeUnmount"),he&64?w.type.remove(w,S,k,ce,U):$&&!$.hasOnce&&(q!==an||ne>0&&ne&64)?Xt($,S,k,!1,!0):(q===an&&ne&384||!G&&he&16)&&Xt(Q,S,k),U&&Ze(w)}const ft=fe!=null&&de==null;(De&&(et=ee&&ee.onVnodeUnmounted)||ye||ft)&&Ht(()=>{et&&kn(et,S,w),ye&&Pi(w,null,S,"unmounted"),ft&&(w.el=null)},k)},Ze=w=>{const{type:S,el:k,anchor:U,transition:G}=w;if(S===an){kr(k,U);return}if(S===au){M(w);return}const q=()=>{i(k),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(w.shapeFlag&1&&G&&!G.persisted){const{leave:ee,delayLeave:X}=G,Q=()=>ee(k,q);X?X(w.el,q,Q):Q()}else q()},kr=(w,S)=>{let k;for(;w!==S;)k=m(w),i(w),w=k;i(S)},sn=(w,S,k)=>{const{bum:U,scope:G,job:q,subTree:ee,um:X,m:Q,a:$}=w;lg(Q),lg($),U&&su(U),G.stop(),q&&(q.flags|=8,Xe(ee,w,S,k)),X&&Ht(X,S),Ht(()=>{w.isUnmounted=!0},S)},Xt=(w,S,k,U=!1,G=!1,q=0)=>{for(let ee=q;ee<w.length;ee++)Xe(w[ee],S,k,U,G)},B=w=>{if(w.shapeFlag&6)return B(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const S=m(w.anchor||w.el),k=S&&S[xI];return k?m(k):S};let ie=!1;const te=(w,S,k)=>{let U;w==null?S._vnode&&(Xe(S._vnode,null,null,!0),U=S._vnode.component):R(S._vnode||null,w,S,null,null,null,k),S._vnode=w,ie||(ie=!0,Jm(U),kI(),ie=!1)},ce={p:R,um:Xe,m:mn,r:Ze,mt:Se,mc:_,pc:Te,pbc:v,n:B,o:n};return{render:te,hydrate:void 0,createApp:JR(te)}}function bh({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ci({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function dS(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function pf(n,e,t=!1){const r=n.children,i=e.children;if(le(r)&&le(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=rr(i[s]),a.el=o.el),!t&&a.patchFlag!==-2&&pf(o,a)),a.type===pl&&(a.patchFlag===-1&&(a=i[s]=rr(a)),a.el=o.el),a.type===Ft&&!a.el&&(a.el=o.el)}}function fS(n){const e=n.slice(),t=[0];let r,i,s,o,a;const c=n.length;for(r=0;r<c;r++){const l=n[r];if(l!==0){if(i=t[t.length-1],n[i]<l){e[r]=i,t.push(r);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<l?s=a+1:o=a;l<n[t[s]]&&(s>0&&(e[r]=t[s-1]),t[s]=r)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function hv(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:hv(e)}function lg(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function dv(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?dv(e.subTree):null}const fv=n=>n.__isSuspense;function pS(n,e){e&&e.pendingBranch?le(n)?e.effects.push(...n):e.effects.push(n):vR(n)}const an=Symbol.for("v-fgt"),pl=Symbol.for("v-txt"),Ft=Symbol.for("v-cmt"),au=Symbol.for("v-stc"),_a=[];let un=null;function Va(n=!1){_a.push(un=n?null:[])}function mS(){_a.pop(),un=_a[_a.length-1]||null}let Oa=1;function Su(n,e=!1){Oa+=n,n<0&&un&&e&&(un.hasOnce=!0)}function pv(n){return n.dynamicChildren=Oa>0?un||Os:null,mS(),Oa>0&&un&&un.push(n),n}function TU(n,e,t,r,i,s){return pv(gv(n,e,t,r,i,s,!0))}function xa(n,e,t,r,i){return pv(Bt(n,e,t,r,i,!0))}function La(n){return n?n.__v_isVNode===!0:!1}function Mi(n,e){return n.type===e.type&&n.key===e.key}const mv=({key:n})=>n??null,cu=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?ze(n)||it(n)||_e(n)?{i:kt,r:n,k:e,f:!!t}:n:null);function gv(n,e=null,t=null,r=0,i=null,s=n===an?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&mv(e),ref:e&&cu(e),scopeId:VI,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:kt};return a?(mf(c,t),s&128&&n.normalize(c)):t&&(c.shapeFlag|=ze(t)?8:16),Oa>0&&!o&&un&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&un.push(c),c}const Bt=gS;function gS(n,e=null,t=null,r=0,i=null,s=!1){if((!n||n===QI)&&(n=Ft),La(n)){const a=ni(n,e,!0);return t&&mf(a,t),Oa>0&&!s&&un&&(a.shapeFlag&6?un[un.indexOf(n)]=a:un.push(a)),a.patchFlag=-2,a}if(CS(n)&&(n=n.__vccOpts),e){e=_S(e);let{class:a,style:c}=e;a&&!ze(a)&&(e.class=ef(a)),Ve(c)&&(cl(c)&&!le(c)&&(c=yt({},c)),e.style=Zd(c))}const o=ze(n)?1:fv(n)?128:LI(n)?64:Ve(n)?4:_e(n)?2:0;return gv(n,e,t,r,i,o,s,!0)}function _S(n){return n?cl(n)||sv(n)?yt({},n):n:null}function ni(n,e,t=!1,r=!1){const{props:i,ref:s,patchFlag:o,children:a,transition:c}=n,l=e?vS(i||{},e):i,h={__v_isVNode:!0,__v_skip:!0,type:n.type,props:l,key:l&&mv(l),ref:e&&e.ref?t&&s?le(s)?s.concat(cu(e)):[s,cu(e)]:cu(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==an?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ni(n.ssContent),ssFallback:n.ssFallback&&ni(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&Na(h,c.clone(h)),h}function yS(n=" ",e=0){return Bt(pl,null,n,e)}function wU(n,e){const t=Bt(au,null,n);return t.staticCount=e,t}function IS(n="",e=!1){return e?(Va(),xa(Ft,null,n)):Bt(Ft,null,n)}function Ln(n){return n==null||typeof n=="boolean"?Bt(Ft):le(n)?Bt(an,null,n.slice()):La(n)?rr(n):Bt(pl,null,String(n))}function rr(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ni(n)}function mf(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(le(e))t=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),mf(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!sv(e)?e._ctx=kt:i===3&&kt&&(kt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else _e(e)?(e={default:e,_ctx:kt},t=32):(e=String(e),r&64?(t=16,e=[yS(e)]):t=8);n.children=e,n.shapeFlag|=t}function vS(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=ef([e.class,r.class]));else if(i==="style")e.style=Zd([e.style,r.style]);else if(el(i)){const s=e[i],o=r[i];o&&s!==o&&!(le(s)&&s.includes(o))?e[i]=s?[].concat(s,o):o:o==null&&s==null&&!tl(i)&&(e[i]=o)}else i!==""&&(e[i]=r[i])}return e}function kn(n,e,t,r=null){Cn(n,e,7,[t,r])}const ES=ev();let TS=0;function wS(n,e,t){const r=n.type,i=(e?e.appContext:n.appContext)||ES,s={uid:TS++,vnode:n,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new uI(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:av(r,i),emitsOptions:tv(r,i),emit:null,emitted:null,propsDefaults:Ue,inheritAttrs:r.inheritAttrs,ctx:Ue,data:Ue,props:Ue,attrs:Ue,slots:Ue,refs:Ue,setupState:Ue,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=XR.bind(null,s),n.ce&&n.ce(s),s}let Ut=null;const gf=()=>Ut||kt;let Pu,fd;{const n=ol(),e=(t,r)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};Pu=e("__VUE_INSTANCE_SETTERS__",t=>Ut=t),fd=e("__VUE_SSR_SETTERS__",t=>Ma=t)}const oc=n=>{const e=Ut;return Pu(n),n.scope.on(),()=>{n.scope.off(),Pu(e)}},hg=()=>{Ut&&Ut.scope.off(),Pu(null)};function _v(n){return n.vnode.shapeFlag&4}let Ma=!1;function AS(n,e=!1,t=!1){e&&fd(e);const{props:r,children:i}=n.vnode,s=_v(n);iS(n,r,s,e),cS(n,i,t||e);const o=s?bS(n,e):void 0;return e&&fd(!1),o}function bS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,GR);const{setup:r}=t;if(r){gr();const i=n.setupContext=r.length>1?SS(n):null,s=oc(n),o=sc(r,n,0,[n.props,i]),a=nI(o);if(_r(),s(),(a||n.sp)&&!Fs(n)&&GI(n),a){if(o.then(hg,hg),e)return o.then(c=>{dg(n,c)}).catch(c=>{ul(c,n,0)});n.asyncDep=o}else dg(n,o)}else yv(n)}function dg(n,e,t){_e(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Ve(e)&&(n.setupState=PI(e)),yv(n)}function yv(n,e,t){const r=n.type;n.render||(n.render=r.render||Gn);{const i=oc(n);gr();try{KR(n)}finally{_r(),i()}}}const RS={get(n,e){return Mt(n,"get",""),n[e]}};function SS(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,RS),slots:n.slots,emit:n.emit,expose:e}}function ml(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(PI(uf(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ga)return ga[t](n)},has(e,t){return t in e||t in ga}})):n.proxy}function PS(n,e=!0){return _e(n)?n.displayName||n.name:n.name||e&&n.__name}function CS(n){return _e(n)&&"__vccOpts"in n}const Ct=(n,e)=>mR(n,e,Ma);function _f(n,e,t){try{Su(-1);const r=arguments.length;return r===2?Ve(e)&&!le(e)?La(e)?Bt(n,null,[e]):Bt(n,e):Bt(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&La(t)&&(t=[t]),Bt(n,e,t))}finally{Su(1)}}const DS="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let pd;const fg=typeof window<"u"&&window.trustedTypes;if(fg)try{pd=fg.createPolicy("vue",{createHTML:n=>n})}catch{}const Iv=pd?n=>pd.createHTML(n):n=>n,kS="http://www.w3.org/2000/svg",NS="http://www.w3.org/1998/Math/MathML",tr=typeof document<"u"?document:null,pg=tr&&tr.createElement("template"),VS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const i=e==="svg"?tr.createElementNS(kS,n):e==="mathml"?tr.createElementNS(NS,n):t?tr.createElement(n,{is:t}):tr.createElement(n);return n==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:n=>tr.createTextNode(n),createComment:n=>tr.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>tr.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,i,s){const o=t?t.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===s||!(i=i.nextSibling)););else{pg.innerHTML=Iv(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const a=pg.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Lr="transition",zo="animation",Fa=Symbol("_vtc"),vv={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},OS=yt({},MI,vv),xS=n=>(n.displayName="Transition",n.props=OS,n),LS=xS((n,{slots:e})=>_f(DR,MS(n),e)),Di=(n,e=[])=>{le(n)?n.forEach(t=>t(...e)):n&&n(...e)},mg=n=>n?le(n)?n.some(e=>e.length>1):n.length>1:!1;function MS(n){const e={};for(const A in n)A in vv||(e[A]=n[A]);if(n.css===!1)return e;const{name:t="v",type:r,duration:i,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:c=s,appearActiveClass:l=o,appearToClass:h=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:m=`${t}-leave-active`,leaveToClass:g=`${t}-leave-to`}=n,b=FS(i),R=b&&b[0],C=b&&b[1],{onBeforeEnter:V,onEnter:D,onEnterCancelled:x,onLeave:M,onLeaveCancelled:H,onBeforeAppear:j=V,onAppear:E=D,onAppearCancelled:_=x}=e,y=(A,T,Se,ut)=>{A._enterCancelled=ut,ki(A,T?h:a),ki(A,T?l:o),Se&&Se()},v=(A,T)=>{A._isLeaving=!1,ki(A,f),ki(A,g),ki(A,m),T&&T()},P=A=>(T,Se)=>{const ut=A?E:D,Oe=()=>y(T,A,Se);Di(ut,[T,Oe]),gg(()=>{ki(T,A?c:s),Zn(T,A?h:a),mg(ut)||_g(T,r,R,Oe)})};return yt(e,{onBeforeEnter(A){Di(V,[A]),Zn(A,s),Zn(A,o)},onBeforeAppear(A){Di(j,[A]),Zn(A,c),Zn(A,l)},onEnter:P(!1),onAppear:P(!0),onLeave(A,T){A._isLeaving=!0;const Se=()=>v(A,T);Zn(A,f),A._enterCancelled?(Zn(A,m),vg(A)):(vg(A),Zn(A,m)),gg(()=>{A._isLeaving&&(ki(A,f),Zn(A,g),mg(M)||_g(A,r,C,Se))}),Di(M,[A,Se])},onEnterCancelled(A){y(A,!1,void 0,!0),Di(x,[A])},onAppearCancelled(A){y(A,!0,void 0,!0),Di(_,[A])},onLeaveCancelled(A){v(A),Di(H,[A])}})}function FS(n){if(n==null)return null;if(Ve(n))return[Rh(n.enter),Rh(n.leave)];{const e=Rh(n);return[e,e]}}function Rh(n){return Vb(n)}function Zn(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Fa]||(n[Fa]=new Set)).add(e)}function ki(n,e){e.split(/\s+/).forEach(r=>r&&n.classList.remove(r));const t=n[Fa];t&&(t.delete(e),t.size||(n[Fa]=void 0))}function gg(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let US=0;function _g(n,e,t,r){const i=n._endId=++US,s=()=>{i===n._endId&&r()};if(t!=null)return setTimeout(s,t);const{type:o,timeout:a,propCount:c}=BS(n,e);if(!o)return r();const l=o+"end";let h=0;const f=()=>{n.removeEventListener(l,m),s()},m=g=>{g.target===n&&++h>=c&&f()};setTimeout(()=>{h<c&&f()},a+1),n.addEventListener(l,m)}function BS(n,e){const t=window.getComputedStyle(n),r=b=>(t[b]||"").split(", "),i=r(`${Lr}Delay`),s=r(`${Lr}Duration`),o=yg(i,s),a=r(`${zo}Delay`),c=r(`${zo}Duration`),l=yg(a,c);let h=null,f=0,m=0;e===Lr?o>0&&(h=Lr,f=o,m=s.length):e===zo?l>0&&(h=zo,f=l,m=c.length):(f=Math.max(o,l),h=f>0?o>l?Lr:zo:null,m=h?h===Lr?s.length:c.length:0);const g=h===Lr&&/\b(?:transform|all)(?:,|$)/.test(r(`${Lr}Property`).toString());return{type:h,timeout:f,propCount:m,hasTransform:g}}function yg(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,r)=>Ig(t)+Ig(n[r])))}function Ig(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function vg(n){return(n?n.ownerDocument:document).body.offsetHeight}function qS(n,e,t){const r=n[Fa];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Cu=Symbol("_vod"),Ev=Symbol("_vsh"),AU={name:"show",beforeMount(n,{value:e},{transition:t}){n[Cu]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):$o(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:r}){!e!=!t&&(r?e?(r.beforeEnter(n),$o(n,!0),r.enter(n)):r.leave(n,()=>{$o(n,!1)}):$o(n,e))},beforeUnmount(n,{value:e}){$o(n,e)}};function $o(n,e){n.style.display=e?n[Cu]:"none",n[Ev]=!e}const jS=Symbol(""),GS=/(?:^|;)\s*display\s*:/;function KS(n,e,t){const r=n.style,i=ze(t);let s=!1;if(t&&!i){if(e)if(ze(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&ra(r,a,"")}else for(const o in e)t[o]==null&&ra(r,o,"");for(const o in t){o==="display"&&(s=!0);const a=t[o];a!=null?$S(n,o,!ze(e)&&e?e[o]:void 0,a)||ra(r,o,a):ra(r,o,"")}}else if(i){if(e!==t){const o=r[jS];o&&(t+=";"+o),r.cssText=t,s=GS.test(t)}}else e&&n.removeAttribute("style");Cu in n&&(n[Cu]=s?r.display:"",n[Ev]&&(r.display="none"))}const Eg=/\s*!important$/;function ra(n,e,t){if(le(t))t.forEach(r=>ra(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=zS(n,e);Eg.test(t)?n.setProperty(mi(r),t.replace(Eg,""),"important"):n[r]=t}}const Tg=["Webkit","Moz","ms"],Sh={};function zS(n,e){const t=Sh[e];if(t)return t;let r=Jt(e);if(r!=="filter"&&r in n)return Sh[e]=r;r=il(r);for(let i=0;i<Tg.length;i++){const s=Tg[i]+r;if(s in n)return Sh[e]=s}return e}function $S(n,e,t,r){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&ze(r)&&t===r}const wg="http://www.w3.org/1999/xlink";function Ag(n,e,t,r,i,s=Ub(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(wg,e.slice(6,e.length)):n.setAttributeNS(wg,e,t):t==null||s&&!oI(t)?n.removeAttribute(e):n.setAttribute(e,s?"":dn(t)?String(t):t)}function bg(n,e,t,r,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Iv(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(a!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=oI(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function or(n,e,t,r){n.addEventListener(e,t,r)}function HS(n,e,t,r){n.removeEventListener(e,t,r)}const Rg=Symbol("_vei");function WS(n,e,t,r,i=null){const s=n[Rg]||(n[Rg]={}),o=s[e];if(r&&o)o.value=r;else{const[a,c]=QS(e);if(r){const l=s[e]=XS(r,i);or(n,a,l,c)}else o&&(HS(n,a,o,c),s[e]=void 0)}}const Sg=/(?:Once|Passive|Capture)$/;function QS(n){let e;if(Sg.test(n)){e={};let r;for(;r=n.match(Sg);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):mi(n.slice(2)),e]}let Ph=0;const JS=Promise.resolve(),YS=()=>Ph||(JS.then(()=>Ph=0),Ph=Date.now());function XS(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;Cn(ZS(r,t.value),e,5,[r])};return t.value=n,t.attached=YS(),t}function ZS(n,e){if(le(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Pg=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,eP=(n,e,t,r,i,s)=>{const o=i==="svg";e==="class"?qS(n,r,o):e==="style"?KS(n,t,r):el(e)?tl(e)||WS(n,e,t,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):tP(n,e,r,o))?(bg(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Ag(n,e,r,o,s,e!=="value")):n._isVueCE&&(nP(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!ze(r)))?bg(n,Jt(e),r,s,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),Ag(n,e,r,o))};function tP(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Pg(e)&&_e(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Pg(e)&&ze(t)?!1:e in n}function nP(n,e){const t=n._def.props;if(!t)return!1;const r=Jt(e);return Array.isArray(t)?t.some(i=>Jt(i)===r):Object.keys(t).some(i=>Jt(i)===r)}const ri=n=>{const e=n.props["onUpdate:modelValue"]||!1;return le(e)?t=>su(e,t):e};function rP(n){n.target.composing=!0}function Cg(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const En=Symbol("_assign");function Dg(n,e,t){return e&&(n=n.trim()),t&&(n=sl(n)),n}const kg={created(n,{modifiers:{lazy:e,trim:t,number:r}},i){n[En]=ri(i);const s=r||i.props&&i.props.type==="number";or(n,e?"change":"input",o=>{o.target.composing||n[En](Dg(n.value,t,s))}),(t||s)&&or(n,"change",()=>{n.value=Dg(n.value,t,s)}),e||(or(n,"compositionstart",rP),or(n,"compositionend",Cg),or(n,"change",Cg))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:r,trim:i,number:s}},o){if(n[En]=ri(o),n.composing)return;const a=(s||n.type==="number")&&!/^0\d/.test(n.value)?sl(n.value):n.value,c=e??"";if(a===c)return;const l=n.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===n&&n.type!=="range"&&(r&&e===t||i&&n.value.trim()===c)||(n.value=c)}},iP={deep:!0,created(n,e,t){n[En]=ri(t),or(n,"change",()=>{const r=n._modelValue,i=zs(n),s=n.checked,o=n[En];if(le(r)){const a=tf(r,i),c=a!==-1;if(s&&!c)o(r.concat(i));else if(!s&&c){const l=[...r];l.splice(a,1),o(l)}}else if(lo(r)){const a=new Set(r);s?a.add(i):a.delete(i),o(a)}else o(Tv(n,s))})},mounted:Ng,beforeUpdate(n,e,t){n[En]=ri(t),Ng(n,e,t)}};function Ng(n,{value:e,oldValue:t},r){n._modelValue=e;let i;if(le(e))i=tf(e,r.props.value)>-1;else if(lo(e))i=e.has(r.props.value);else{if(e===t)return;i=ti(e,Tv(n,!0))}n.checked!==i&&(n.checked=i)}const sP={created(n,{value:e},t){n.checked=ti(e,t.props.value),n[En]=ri(t),or(n,"change",()=>{n[En](zs(n))})},beforeUpdate(n,{value:e,oldValue:t},r){n[En]=ri(r),e!==t&&(n.checked=ti(e,r.props.value))}},oP={deep:!0,created(n,{value:e,modifiers:{number:t}},r){const i=lo(e);or(n,"change",()=>{const s=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?sl(zs(o)):zs(o));n[En](n.multiple?i?new Set(s):s:s[0]),n._assigning=!0,ll(()=>{n._assigning=!1})}),n[En]=ri(r)},mounted(n,{value:e}){Vg(n,e)},beforeUpdate(n,e,t){n[En]=ri(t)},updated(n,{value:e}){n._assigning||Vg(n,e)}};function Vg(n,e){const t=n.multiple,r=le(e);if(!(t&&!r&&!lo(e))){for(let i=0,s=n.options.length;i<s;i++){const o=n.options[i],a=zs(o);if(t)if(r){const c=typeof a;c==="string"||c==="number"?o.selected=e.some(l=>String(l)===String(a)):o.selected=tf(e,a)>-1}else o.selected=e.has(a);else if(ti(zs(o),e)){n.selectedIndex!==i&&(n.selectedIndex=i);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function zs(n){return"_value"in n?n._value:n.value}function Tv(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const bU={created(n,e,t){Hc(n,e,t,null,"created")},mounted(n,e,t){Hc(n,e,t,null,"mounted")},beforeUpdate(n,e,t,r){Hc(n,e,t,r,"beforeUpdate")},updated(n,e,t,r){Hc(n,e,t,r,"updated")}};function aP(n,e){switch(n){case"SELECT":return oP;case"TEXTAREA":return kg;default:switch(e){case"checkbox":return iP;case"radio":return sP;default:return kg}}}function Hc(n,e,t,r,i){const o=aP(n.tagName,t.props&&t.props.type)[i];o&&o(n,e,t,r)}const cP=["ctrl","shift","alt","meta"],uP={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>cP.some(t=>n[`${t}Key`]&&!e.includes(t))},RU=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),r=e.join(".");return t[r]||(t[r]=((i,...s)=>{for(let o=0;o<e.length;o++){const a=uP[e[o]];if(a&&a(i,e))return}return n(i,...s)}))},lP={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},SU=(n,e)=>{const t=n._withKeys||(n._withKeys={}),r=e.join(".");return t[r]||(t[r]=(i=>{if(!("key"in i))return;const s=mi(i.key);if(e.some(o=>o===s||lP[o]===s))return n(i)}))},hP=yt({patchProp:eP},VS);let Og;function dP(){return Og||(Og=lS(hP))}const fP=((...n)=>{const e=dP().createApp(...n),{mount:t}=e;return e.mount=r=>{const i=mP(r);if(!i)return;const s=e._component;!_e(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,pP(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e});function pP(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function mP(n){return ze(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let wv;const gl=n=>wv=n,Av=Symbol();function md(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var ya;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(ya||(ya={}));function gP(){const n=lI(!0),e=n.run(()=>cn({}));let t=[],r=[];const i=uf({install(s){gl(i),i._a=s,s.provide(Av,i),s.config.globalProperties.$pinia=i,r.forEach(o=>t.push(o)),r=[]},use(s){return this._a?t.push(s):r.push(s),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return i}const bv=()=>{};function xg(n,e,t,r=bv){n.push(e);const i=()=>{const s=n.indexOf(e);s>-1&&(n.splice(s,1),r())};return!t&&hI()&&jb(i),i}function Es(n,...e){n.slice().forEach(t=>{t(...e)})}const _P=n=>n(),Lg=Symbol(),Ch=Symbol();function gd(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,r)=>n.set(r,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const r=e[t],i=n[t];md(i)&&md(r)&&n.hasOwnProperty(t)&&!it(r)&&!pr(r)?n[t]=gd(i,r):n[t]=r}return n}const yP=Symbol();function IP(n){return!md(n)||!n.hasOwnProperty(yP)}const{assign:jr}=Object;function vP(n){return!!(it(n)&&n.effect)}function EP(n,e,t,r){const{state:i,actions:s,getters:o}=e,a=t.state.value[n];let c;function l(){a||(t.state.value[n]=i?i():{});const h=hR(t.state.value[n]);return jr(h,s,Object.keys(o||{}).reduce((f,m)=>(f[m]=uf(Ct(()=>{gl(t);const g=t._s.get(n);return o[m].call(g,g)})),f),{}))}return c=Rv(n,l,e,t,r,!0),c}function Rv(n,e,t={},r,i,s){let o;const a=jr({actions:{}},t),c={deep:!0};let l,h,f=[],m=[],g;const b=r.state.value[n];!s&&!b&&(r.state.value[n]={});let R;function C(_){let y;l=h=!1,typeof _=="function"?(_(r.state.value[n]),y={type:ya.patchFunction,storeId:n,events:g}):(gd(r.state.value[n],_),y={type:ya.patchObject,payload:_,storeId:n,events:g});const v=R=Symbol();ll().then(()=>{R===v&&(l=!0)}),h=!0,Es(f,y,r.state.value[n])}const V=s?function(){const{state:y}=t,v=y?y():{};this.$patch(P=>{jr(P,v)})}:bv;function D(){o.stop(),f=[],m=[],r._s.delete(n)}const x=(_,y="")=>{if(Lg in _)return _[Ch]=y,_;const v=function(){gl(r);const P=Array.from(arguments),A=[],T=[];function Se(pe){A.push(pe)}function ut(pe){T.push(pe)}Es(m,{args:P,name:v[Ch],store:H,after:Se,onError:ut});let Oe;try{Oe=_.apply(this&&this.$id===n?this:H,P)}catch(pe){throw Es(T,pe),pe}return Oe instanceof Promise?Oe.then(pe=>(Es(A,pe),pe)).catch(pe=>(Es(T,pe),Promise.reject(pe))):(Es(A,Oe),Oe)};return v[Lg]=!0,v[Ch]=y,v},M={_p:r,$id:n,$onAction:xg.bind(null,m),$patch:C,$reset:V,$subscribe(_,y={}){const v=xg(f,_,y.detached,()=>P()),P=o.run(()=>Ms(()=>r.state.value[n],A=>{(y.flush==="sync"?h:l)&&_({storeId:n,type:ya.direct,events:g},A)},jr({},c,y)));return v},$dispose:D},H=ic(M);r._s.set(n,H);const E=(r._a&&r._a.runWithContext||_P)(()=>r._e.run(()=>(o=lI()).run(()=>e({action:x}))));for(const _ in E){const y=E[_];if(it(y)&&!vP(y)||pr(y))s||(b&&IP(y)&&(it(y)?y.value=b[_]:gd(y,b[_])),r.state.value[n][_]=y);else if(typeof y=="function"){const v=x(y,_);E[_]=v,a.actions[_]=y}}return jr(H,E),jr(Pe(H),E),Object.defineProperty(H,"$state",{get:()=>r.state.value[n],set:_=>{C(y=>{jr(y,_)})}}),r._p.forEach(_=>{jr(H,o.run(()=>_({store:H,app:r._a,pinia:r,options:a})))}),b&&s&&t.hydrate&&t.hydrate(H.$state,b),l=!0,h=!0,H}/*! #__NO_SIDE_EFFECTS__ */function yf(n,e,t){let r,i;const s=typeof e=="function";typeof n=="string"?(r=n,i=s?t:e):(i=n,r=n.id);function o(a,c){const l=ER();return a=a||(l?vn(Av,null):null),a&&gl(a),a=wv,a._s.has(r)||(s?Rv(r,e,i,a):EP(r,i,a)),a._s.get(r)}return o.$id=r,o}var Mg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},TP=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Pv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,h=s>>2,f=(s&3)<<4|a>>4;let m=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(m=64)),r.push(t[h],t[f],t[m],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Sv(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):TP(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const f=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||f==null)throw new wP;const m=s<<2|a>>4;if(r.push(m),l!==64){const g=a<<4&240|l>>2;if(r.push(g),f!==64){const b=l<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class wP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const AP=function(n){const e=Sv(n);return Pv.encodeByteArray(e,!0)},Du=function(n){return AP(n).replace(/\./g,"")},Cv=function(n){try{return Pv.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function bP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const RP=()=>bP().__FIREBASE_DEFAULTS__,SP=()=>{if(typeof process>"u"||typeof Mg>"u")return;const n=Mg.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},PP=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cv(n[1]);return e&&JSON.parse(e)},_l=()=>{try{return RP()||SP()||PP()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dv=n=>{var e,t;return(t=(e=_l())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},kv=n=>{const e=Dv(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Nv=()=>{var n;return(n=_l())===null||n===void 0?void 0:n.config},Vv=n=>{var e;return(e=_l())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CP{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Ov(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Du(JSON.stringify(t)),Du(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function DP(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(It())}function kP(){var n;const e=(n=_l())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function NP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function VP(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function OP(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xP(){const n=It();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function xv(){return!kP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Lv(){try{return typeof indexedDB=="object"}catch{return!1}}function LP(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MP="FirebaseError";class Qn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=MP,Object.setPrototypeOf(this,Qn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ac.prototype.create)}}class ac{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?FP(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Qn(i,a,r)}}function FP(n,e){return n.replace(UP,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const UP=/\{\$([^}]+)}/g;function BP(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ii(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Fg(s)&&Fg(o)){if(!ii(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Fg(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ia(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function sa(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function qP(n,e){const t=new jP(n,e);return t.subscribe.bind(t)}class jP{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");GP(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Dh),i.error===void 0&&(i.error=Dh),i.complete===void 0&&(i.complete=Dh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function GP(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Dh(){}/**
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
 */function oe(n){return n&&n._delegate?n._delegate:n}class si{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Oi="[DEFAULT]";/**
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
 */class KP{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new CP;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($P(e))try{this.getOrInitializeService({instanceIdentifier:Oi})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Oi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Oi){return this.instances.has(e)}getOptions(e=Oi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zP(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Oi){return this.component?this.component.multipleInstances?e:Oi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zP(n){return n===Oi?void 0:n}function $P(n){return n.instantiationMode==="EAGER"}/**
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
 */class HP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new KP(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const WP={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},QP=we.INFO,JP={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},YP=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=JP[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class If{constructor(e){this.name=e,this._logLevel=QP,this._logHandler=YP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?WP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const XP=(n,e)=>e.some(t=>n instanceof t);let Ug,Bg;function ZP(){return Ug||(Ug=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function e0(){return Bg||(Bg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mv=new WeakMap,_d=new WeakMap,Fv=new WeakMap,kh=new WeakMap,vf=new WeakMap;function t0(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Xr(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Mv.set(t,n)}).catch(()=>{}),vf.set(e,n),e}function n0(n){if(_d.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});_d.set(n,e)}let yd={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _d.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Fv.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xr(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function r0(n){yd=n(yd)}function i0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Nh(this),e,...t);return Fv.set(r,e.sort?e.sort():[e]),Xr(r)}:e0().includes(n)?function(...e){return n.apply(Nh(this),e),Xr(Mv.get(this))}:function(...e){return Xr(n.apply(Nh(this),e))}}function s0(n){return typeof n=="function"?i0(n):(n instanceof IDBTransaction&&n0(n),XP(n,ZP())?new Proxy(n,yd):n)}function Xr(n){if(n instanceof IDBRequest)return t0(n);if(kh.has(n))return kh.get(n);const e=s0(n);return e!==n&&(kh.set(n,e),vf.set(e,n)),e}const Nh=n=>vf.get(n);function o0(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=Xr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Xr(o.result),c.oldVersion,c.newVersion,Xr(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const a0=["get","getKey","getAll","getAllKeys","count"],c0=["put","add","delete","clear"],Vh=new Map;function qg(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Vh.get(e))return Vh.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=c0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||a0.includes(t)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return Vh.set(e,s),s}r0(n=>({...n,get:(e,t,r)=>qg(e,t)||n.get(e,t,r),has:(e,t)=>!!qg(e,t)||n.has(e,t)}));/**
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
 */class u0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(l0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function l0(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Id="@firebase/app",jg="0.10.13";/**
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
 */const Ir=new If("@firebase/app"),h0="@firebase/app-compat",d0="@firebase/analytics-compat",f0="@firebase/analytics",p0="@firebase/app-check-compat",m0="@firebase/app-check",g0="@firebase/auth",_0="@firebase/auth-compat",y0="@firebase/database",I0="@firebase/data-connect",v0="@firebase/database-compat",E0="@firebase/functions",T0="@firebase/functions-compat",w0="@firebase/installations",A0="@firebase/installations-compat",b0="@firebase/messaging",R0="@firebase/messaging-compat",S0="@firebase/performance",P0="@firebase/performance-compat",C0="@firebase/remote-config",D0="@firebase/remote-config-compat",k0="@firebase/storage",N0="@firebase/storage-compat",V0="@firebase/firestore",O0="@firebase/vertexai-preview",x0="@firebase/firestore-compat",L0="firebase",M0="10.14.1";/**
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
 */const ku="[DEFAULT]",F0={[Id]:"fire-core",[h0]:"fire-core-compat",[f0]:"fire-analytics",[d0]:"fire-analytics-compat",[m0]:"fire-app-check",[p0]:"fire-app-check-compat",[g0]:"fire-auth",[_0]:"fire-auth-compat",[y0]:"fire-rtdb",[I0]:"fire-data-connect",[v0]:"fire-rtdb-compat",[E0]:"fire-fn",[T0]:"fire-fn-compat",[w0]:"fire-iid",[A0]:"fire-iid-compat",[b0]:"fire-fcm",[R0]:"fire-fcm-compat",[S0]:"fire-perf",[P0]:"fire-perf-compat",[C0]:"fire-rc",[D0]:"fire-rc-compat",[k0]:"fire-gcs",[N0]:"fire-gcs-compat",[V0]:"fire-fst",[x0]:"fire-fst-compat",[O0]:"fire-vertex","fire-js":"fire-js",[L0]:"fire-js-all"};/**
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
 */const Nu=new Map,U0=new Map,vd=new Map;function Gg(n,e){try{n.container.addComponent(e)}catch(t){Ir.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xi(n){const e=n.name;if(vd.has(e))return Ir.debug(`There were multiple attempts to register component ${e}.`),!1;vd.set(e,n);for(const t of Nu.values())Gg(t,n);for(const t of U0.values())Gg(t,n);return!0}function fo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function B0(n,e,t=ku){fo(n,e).clearInstance(t)}function ht(n){return n.settings!==void 0}/**
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
 */const q0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zr=new ac("app","Firebase",q0);/**
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
 */class j0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new si("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Zr.create("app-deleted",{appName:this._name})}}/**
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
 */const ls=M0;function Ef(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ku,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Zr.create("bad-app-name",{appName:String(i)});if(t||(t=Nv()),!t)throw Zr.create("no-options");const s=Nu.get(i);if(s){if(ii(t,s.options)&&ii(r,s.config))return s;throw Zr.create("duplicate-app",{appName:i})}const o=new HP(i);for(const c of vd.values())o.addComponent(c);const a=new j0(t,r,o);return Nu.set(i,a),a}function yl(n=ku){const e=Nu.get(n);if(!e&&n===ku&&Nv())return Ef();if(!e)throw Zr.create("no-app",{appName:n});return e}function Kn(n,e,t){var r;let i=(r=F0[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ir.warn(a.join(" "));return}Xi(new si(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const G0="firebase-heartbeat-database",K0=1,Ua="firebase-heartbeat-store";let Oh=null;function Uv(){return Oh||(Oh=o0(G0,K0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ua)}catch(t){console.warn(t)}}}}).catch(n=>{throw Zr.create("idb-open",{originalErrorMessage:n.message})})),Oh}async function z0(n){try{const t=(await Uv()).transaction(Ua),r=await t.objectStore(Ua).get(Bv(n));return await t.done,r}catch(e){if(e instanceof Qn)Ir.warn(e.message);else{const t=Zr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ir.warn(t.message)}}}async function Kg(n,e){try{const r=(await Uv()).transaction(Ua,"readwrite");await r.objectStore(Ua).put(e,Bv(n)),await r.done}catch(t){if(t instanceof Qn)Ir.warn(t.message);else{const r=Zr.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ir.warn(r.message)}}}function Bv(n){return`${n.name}!${n.options.appId}`}/**
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
 */const $0=1024,H0=720*60*60*1e3;class W0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new J0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=zg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=H0}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Ir.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=zg(),{heartbeatsToSend:r,unsentEntries:i}=Q0(this._heartbeatsCache.heartbeats),s=Du(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Ir.warn(t),""}}}function zg(){return new Date().toISOString().substring(0,10)}function Q0(n,e=$0){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),$g(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),$g(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class J0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Lv()?LP().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await z0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Kg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Kg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function $g(n){return Du(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Y0(n){Xi(new si("platform-logger",e=>new u0(e),"PRIVATE")),Xi(new si("heartbeat",e=>new W0(e),"PRIVATE")),Kn(Id,jg,n),Kn(Id,jg,"esm2017"),Kn("fire-js","")}Y0("");var Hg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wi,qv;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(v,P,A){for(var T=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)T[Se-2]=arguments[Se];return _.prototype[P].apply(v,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,y){y||(y=0);var v=Array(16);if(typeof _=="string")for(var P=0;16>P;++P)v[P]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(P=0;16>P;++P)v[P]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],P=E.g[2];var A=E.g[3],T=_+(A^y&(P^A))+v[0]+3614090360&4294967295;_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[1]+3905402710&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[2]+606105819&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[3]+3250441966&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[4]+4118548399&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[5]+1200080426&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[6]+2821735955&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[7]+4249261313&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[8]+1770035416&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[9]+2336552879&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[10]+4294925233&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[11]+2304563134&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[12]+1804603682&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[13]+4254626195&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[14]+2792965006&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[15]+1236535329&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(P^A&(y^P))+v[1]+4129170786&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[6]+3225465664&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[11]+643717713&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[0]+3921069994&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[5]+3593408605&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[10]+38016083&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[15]+3634488961&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[4]+3889429448&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[9]+568446438&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[14]+3275163606&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[3]+4107603335&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[8]+1163531501&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[13]+2850285829&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[2]+4243563512&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[7]+1735328473&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[12]+2368359562&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(y^P^A)+v[5]+4294588738&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[8]+2272392833&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[11]+1839030562&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[14]+4259657740&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[1]+2763975236&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[4]+1272893353&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[7]+4139469664&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[10]+3200236656&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[13]+681279174&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[0]+3936430074&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[3]+3572445317&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[6]+76029189&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[9]+3654602809&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[12]+3873151461&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[15]+530742520&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[2]+3299628645&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(P^(y|~A))+v[0]+4096336452&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[7]+1126891415&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[14]+2878612391&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[5]+4237533241&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[12]+1700485571&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[3]+2399980690&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[10]+4293915773&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[1]+2240044497&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[8]+1873313359&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[15]+4264355552&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[6]+2734768916&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[13]+1309151649&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[4]+4149444226&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[11]+3174756917&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[2]+718787259&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(P+(T<<21&4294967295|T>>>11))&4294967295,E.g[2]=E.g[2]+P&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,v=this.B,P=this.h,A=0;A<_;){if(P==0)for(;A<=y;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<_;)if(v[P++]=E.charCodeAt(A++),P==this.blockSize){i(this,v),P=0;break}}else for(;A<_;)if(v[P++]=E[A++],P==this.blockSize){i(this,v),P=0;break}}this.h=P,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var v=0;32>v;v+=8)E[y++]=this.g[_]>>>v&255;return E};function s(E,_){var y=a;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function o(E,_){this.h=_;for(var y=[],v=!0,P=E.length-1;0<=P;P--){var A=E[P]|0;v&&A==_||(y[P]=A,v=!1)}this.g=y}var a={};function c(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return f;if(0>E)return C(l(-E));for(var _=[],y=1,v=0;E>=y;v++)_[v]=E/y|0,y*=4294967296;return new o(_,0)}function h(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return C(h(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=l(Math.pow(_,8)),v=f,P=0;P<E.length;P+=8){var A=Math.min(8,E.length-P),T=parseInt(E.substring(P,P+A),_);8>A?(A=l(Math.pow(_,A)),v=v.j(A).add(l(T))):(v=v.j(y),v=v.add(l(T)))}return v}var f=c(0),m=c(1),g=c(16777216);n=o.prototype,n.m=function(){if(R(this))return-C(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var v=this.i(y);E+=(0<=v?v:4294967296+v)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(R(this))return"-"+C(this).toString(E);for(var _=l(Math.pow(E,6)),y=this,v="";;){var P=M(y,_).g;y=V(y,P.j(_));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=P,b(y))return A+v;for(;6>A.length;)A="0"+A;v=A+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function R(E){return E.h==-1}n.l=function(E){return E=V(this,E),R(E)?-1:b(E)?0:1};function C(E){for(var _=E.g.length,y=[],v=0;v<_;v++)y[v]=~E.g[v];return new o(y,~E.h).add(m)}n.abs=function(){return R(this)?C(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0,P=0;P<=_;P++){var A=v+(this.i(P)&65535)+(E.i(P)&65535),T=(A>>>16)+(this.i(P)>>>16)+(E.i(P)>>>16);v=T>>>16,A&=65535,T&=65535,y[P]=T<<16|A}return new o(y,y[y.length-1]&-2147483648?-1:0)};function V(E,_){return E.add(C(_))}n.j=function(E){if(b(this)||b(E))return f;if(R(this))return R(E)?C(this).j(C(E)):C(C(this).j(E));if(R(E))return C(this.j(C(E)));if(0>this.l(g)&&0>E.l(g))return l(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],v=0;v<2*_;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var P=0;P<E.g.length;P++){var A=this.i(v)>>>16,T=this.i(v)&65535,Se=E.i(P)>>>16,ut=E.i(P)&65535;y[2*v+2*P]+=T*ut,D(y,2*v+2*P),y[2*v+2*P+1]+=A*ut,D(y,2*v+2*P+1),y[2*v+2*P+1]+=T*Se,D(y,2*v+2*P+1),y[2*v+2*P+2]+=A*Se,D(y,2*v+2*P+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new o(y,0)};function D(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function x(E,_){this.g=E,this.h=_}function M(E,_){if(b(_))throw Error("division by zero");if(b(E))return new x(f,f);if(R(E))return _=M(C(E),_),new x(C(_.g),C(_.h));if(R(_))return _=M(E,C(_)),new x(C(_.g),_.h);if(30<E.g.length){if(R(E)||R(_))throw Error("slowDivide_ only works with positive integers.");for(var y=m,v=_;0>=v.l(E);)y=H(y),v=H(v);var P=j(y,1),A=j(v,1);for(v=j(v,2),y=j(y,2);!b(v);){var T=A.add(v);0>=T.l(E)&&(P=P.add(y),A=T),v=j(v,1),y=j(y,1)}return _=V(E,P.j(_)),new x(P,_)}for(P=f;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),A=l(y),T=A.j(_);R(T)||0<T.l(E);)y-=v,A=l(y),T=A.j(_);b(A)&&(A=m),P=P.add(A),E=V(E,T)}return new x(P,E)}n.A=function(E){return M(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)&E.i(v);return new o(y,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)|E.i(v);return new o(y,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)^E.i(v);return new o(y,this.h^E.h)};function H(E){for(var _=E.g.length+1,y=[],v=0;v<_;v++)y[v]=E.i(v)<<1|E.i(v-1)>>>31;return new o(y,E.h)}function j(E,_){var y=_>>5;_%=32;for(var v=E.g.length-y,P=[],A=0;A<v;A++)P[A]=0<_?E.i(A+y)>>>_|E.i(A+y+1)<<32-_:E.i(A+y);return new o(P,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,qv=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=h,Wi=o}).apply(typeof Hg<"u"?Hg:typeof self<"u"?self:typeof window<"u"?window:{});var Wc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jv,oa,Gv,uu,Ed,Kv,zv,$v;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,d,p){return u==Array.prototype||u==Object.prototype||(u[d]=p.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Wc=="object"&&Wc];for(var d=0;d<u.length;++d){var p=u[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function i(u,d){if(d)e:{var p=r;u=u.split(".");for(var I=0;I<u.length-1;I++){var O=u[I];if(!(O in p))break e;p=p[O]}u=u[u.length-1],I=p[u],d=d(I),d!=I&&d!=null&&e(p,u,{configurable:!0,writable:!0,value:d})}}function s(u,d){u instanceof String&&(u+="");var p=0,I=!1,O={next:function(){if(!I&&p<u.length){var F=p++;return{value:d(F,u[F]),done:!1}}return I=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}i("Array.prototype.values",function(u){return u||function(){return s(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(u){var d=typeof u;return d=d!="object"?d:u?Array.isArray(u)?"array":d:"null",d=="array"||d=="object"&&typeof u.length=="number"}function l(u){var d=typeof u;return d=="object"&&u!=null||d=="function"}function h(u,d,p){return u.call.apply(u.bind,arguments)}function f(u,d,p){if(!u)throw Error();if(2<arguments.length){var I=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,I),u.apply(d,O)}}return function(){return u.apply(d,arguments)}}function m(u,d,p){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:f,m.apply(null,arguments)}function g(u,d){var p=Array.prototype.slice.call(arguments,1);return function(){var I=p.slice();return I.push.apply(I,arguments),u.apply(this,I)}}function b(u,d){function p(){}p.prototype=d.prototype,u.aa=d.prototype,u.prototype=new p,u.prototype.constructor=u,u.Qb=function(I,O,F){for(var Y=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)Y[Fe-2]=arguments[Fe];return d.prototype[O].apply(I,Y)}}function R(u){const d=u.length;if(0<d){const p=Array(d);for(let I=0;I<d;I++)p[I]=u[I];return p}return[]}function C(u,d){for(let p=1;p<arguments.length;p++){const I=arguments[p];if(c(I)){const O=u.length||0,F=I.length||0;u.length=O+F;for(let Y=0;Y<F;Y++)u[O+Y]=I[Y]}else u.push(I)}}class V{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function D(u){return/^[\s\xa0]*$/.test(u)}function x(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function M(u){return M[" "](u),u}M[" "]=function(){};var H=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function j(u,d,p){for(const I in u)d.call(p,u[I],I,u)}function E(u,d){for(const p in u)d.call(void 0,u[p],p,u)}function _(u){const d={};for(const p in u)d[p]=u[p];return d}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(u,d){let p,I;for(let O=1;O<arguments.length;O++){I=arguments[O];for(p in I)u[p]=I[p];for(let F=0;F<y.length;F++)p=y[F],Object.prototype.hasOwnProperty.call(I,p)&&(u[p]=I[p])}}function P(u){var d=1;u=u.split(":");const p=[];for(;0<d&&u.length;)p.push(u.shift()),d--;return u.length&&p.push(u.join(":")),p}function A(u){a.setTimeout(()=>{throw u},0)}function T(){var u=rn;let d=null;return u.g&&(d=u.g,u.g=u.g.next,u.g||(u.h=null),d.next=null),d}class Se{constructor(){this.h=this.g=null}add(d,p){const I=ut.get();I.set(d,p),this.h?this.h.next=I:this.g=I,this.h=I}}var ut=new V(()=>new Oe,u=>u.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,Te=!1,rn=new Se,wn=()=>{const u=a.Promise.resolve(void 0);pe=()=>{u.then(mn)}};var mn=()=>{for(var u;u=T();){try{u.h.call(u.g)}catch(p){A(p)}var d=ut;d.j(u),100>d.h&&(d.h++,u.next=d.g,d.g=u)}Te=!1};function Xe(){this.s=this.s,this.C=this.C}Xe.prototype.s=!1,Xe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Xe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ze(u,d){this.type=u,this.g=this.target=d,this.defaultPrevented=!1}Ze.prototype.h=function(){this.defaultPrevented=!0};var kr=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,d=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const p=()=>{};a.addEventListener("test",p,d),a.removeEventListener("test",p,d)}catch{}return u})();function sn(u,d){if(Ze.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var p=this.type=u.type,I=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=d,d=u.relatedTarget){if(H){e:{try{M(d.nodeName);var O=!0;break e}catch{}O=!1}O||(d=null)}}else p=="mouseover"?d=u.fromElement:p=="mouseout"&&(d=u.toElement);this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Xt[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&sn.aa.h.call(this)}}b(sn,Ze);var Xt={2:"touch",3:"pen",4:"mouse"};sn.prototype.h=function(){sn.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var B="closure_listenable_"+(1e6*Math.random()|0),ie=0;function te(u,d,p,I,O){this.listener=u,this.proxy=null,this.src=d,this.type=p,this.capture=!!I,this.ha=O,this.key=++ie,this.da=this.fa=!1}function ce(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function ve(u){this.src=u,this.g={},this.h=0}ve.prototype.add=function(u,d,p,I,O){var F=u.toString();u=this.g[F],u||(u=this.g[F]=[],this.h++);var Y=S(u,d,I,O);return-1<Y?(d=u[Y],p||(d.fa=!1)):(d=new te(d,this.src,F,!!I,O),d.fa=p,u.push(d)),d};function w(u,d){var p=d.type;if(p in u.g){var I=u.g[p],O=Array.prototype.indexOf.call(I,d,void 0),F;(F=0<=O)&&Array.prototype.splice.call(I,O,1),F&&(ce(d),u.g[p].length==0&&(delete u.g[p],u.h--))}}function S(u,d,p,I){for(var O=0;O<u.length;++O){var F=u[O];if(!F.da&&F.listener==d&&F.capture==!!p&&F.ha==I)return O}return-1}var k="closure_lm_"+(1e6*Math.random()|0),U={};function G(u,d,p,I,O){if(Array.isArray(d)){for(var F=0;F<d.length;F++)G(u,d[F],p,I,O);return null}return p=de(p),u&&u[B]?u.K(d,p,l(I)?!!I.capture:!1,O):q(u,d,p,!1,I,O)}function q(u,d,p,I,O,F){if(!d)throw Error("Invalid event type");var Y=l(O)?!!O.capture:!!O,Fe=ne(u);if(Fe||(u[k]=Fe=new ve(u)),p=Fe.add(d,p,I,Y,F),p.proxy)return p;if(I=ee(),p.proxy=I,I.src=u,I.listener=p,u.addEventListener)kr||(O=Y),O===void 0&&(O=!1),u.addEventListener(d.toString(),I,O);else if(u.attachEvent)u.attachEvent($(d.toString()),I);else if(u.addListener&&u.removeListener)u.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return p}function ee(){function u(p){return d.call(u.src,u.listener,p)}const d=he;return u}function X(u,d,p,I,O){if(Array.isArray(d))for(var F=0;F<d.length;F++)X(u,d[F],p,I,O);else I=l(I)?!!I.capture:!!I,p=de(p),u&&u[B]?(u=u.i,d=String(d).toString(),d in u.g&&(F=u.g[d],p=S(F,p,I,O),-1<p&&(ce(F[p]),Array.prototype.splice.call(F,p,1),F.length==0&&(delete u.g[d],u.h--)))):u&&(u=ne(u))&&(d=u.g[d.toString()],u=-1,d&&(u=S(d,p,I,O)),(p=-1<u?d[u]:null)&&Q(p))}function Q(u){if(typeof u!="number"&&u&&!u.da){var d=u.src;if(d&&d[B])w(d.i,u);else{var p=u.type,I=u.proxy;d.removeEventListener?d.removeEventListener(p,I,u.capture):d.detachEvent?d.detachEvent($(p),I):d.addListener&&d.removeListener&&d.removeListener(I),(p=ne(d))?(w(p,u),p.h==0&&(p.src=null,d[k]=null)):ce(u)}}}function $(u){return u in U?U[u]:U[u]="on"+u}function he(u,d){if(u.da)u=!0;else{d=new sn(d,this);var p=u.listener,I=u.ha||u.src;u.fa&&Q(u),u=p.call(I,d)}return u}function ne(u){return u=u[k],u instanceof ve?u:null}var ue="__closure_events_fn_"+(1e9*Math.random()>>>0);function de(u){return typeof u=="function"?u:(u[ue]||(u[ue]=function(d){return u.handleEvent(d)}),u[ue])}function fe(){Xe.call(this),this.i=new ve(this),this.M=this,this.F=null}b(fe,Xe),fe.prototype[B]=!0,fe.prototype.removeEventListener=function(u,d,p,I){X(this,u,d,p,I)};function ye(u,d){var p,I=u.F;if(I)for(p=[];I;I=I.F)p.push(I);if(u=u.M,I=d.type||d,typeof d=="string")d=new Ze(d,u);else if(d instanceof Ze)d.target=d.target||u;else{var O=d;d=new Ze(I,u),v(d,O)}if(O=!0,p)for(var F=p.length-1;0<=F;F--){var Y=d.g=p[F];O=De(Y,I,!0,d)&&O}if(Y=d.g=u,O=De(Y,I,!0,d)&&O,O=De(Y,I,!1,d)&&O,p)for(F=0;F<p.length;F++)Y=d.g=p[F],O=De(Y,I,!1,d)&&O}fe.prototype.N=function(){if(fe.aa.N.call(this),this.i){var u=this.i,d;for(d in u.g){for(var p=u.g[d],I=0;I<p.length;I++)ce(p[I]);delete u.g[d],u.h--}}this.F=null},fe.prototype.K=function(u,d,p,I){return this.i.add(String(u),d,!1,p,I)},fe.prototype.L=function(u,d,p,I){return this.i.add(String(u),d,!0,p,I)};function De(u,d,p,I){if(d=u.i.g[String(d)],!d)return!0;d=d.concat();for(var O=!0,F=0;F<d.length;++F){var Y=d[F];if(Y&&!Y.da&&Y.capture==p){var Fe=Y.listener,St=Y.ha||Y.src;Y.fa&&w(u.i,Y),O=Fe.call(St,I)!==!1&&O}}return O&&!I.defaultPrevented}function et(u,d,p){if(typeof u=="function")p&&(u=m(u,p));else if(u&&typeof u.handleEvent=="function")u=m(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:a.setTimeout(u,d||0)}function ft(u){u.g=et(()=>{u.g=null,u.i&&(u.i=!1,ft(u))},u.l);const d=u.h;u.h=null,u.m.apply(null,d)}class gn extends Xe{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ft(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Nt(u){Xe.call(this),this.h=u,this.g={}}b(Nt,Xe);var Nr=[];function Do(u){j(u.g,function(d,p){this.g.hasOwnProperty(p)&&Q(d)},u),u.g={}}Nt.prototype.N=function(){Nt.aa.N.call(this),Do(this)},Nt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rt=a.JSON.stringify,_n=a.JSON.parse,Sc=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function ms(){}ms.prototype.h=null;function em(u){return u.h||(u.h=u.i())}function tm(){}var ko={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ih(){Ze.call(this,"d")}b(ih,Ze);function sh(){Ze.call(this,"c")}b(sh,Ze);var Ai={},nm=null;function Pc(){return nm=nm||new fe}Ai.La="serverreachability";function rm(u){Ze.call(this,Ai.La,u)}b(rm,Ze);function No(u){const d=Pc();ye(d,new rm(d))}Ai.STAT_EVENT="statevent";function im(u,d){Ze.call(this,Ai.STAT_EVENT,u),this.stat=d}b(im,Ze);function Kt(u){const d=Pc();ye(d,new im(d,u))}Ai.Ma="timingevent";function sm(u,d){Ze.call(this,Ai.Ma,u),this.size=d}b(sm,Ze);function Vo(u,d){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},d)}function Oo(){this.g=!0}Oo.prototype.xa=function(){this.g=!1};function ib(u,d,p,I,O,F){u.info(function(){if(u.g)if(F)for(var Y="",Fe=F.split("&"),St=0;St<Fe.length;St++){var Ce=Fe[St].split("=");if(1<Ce.length){var Vt=Ce[0];Ce=Ce[1];var Ot=Vt.split("_");Y=2<=Ot.length&&Ot[1]=="type"?Y+(Vt+"="+Ce+"&"):Y+(Vt+"=redacted&")}}else Y=null;else Y=F;return"XMLHTTP REQ ("+I+") [attempt "+O+"]: "+d+`
`+p+`
`+Y})}function sb(u,d,p,I,O,F,Y){u.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+O+"]: "+d+`
`+p+`
`+F+" "+Y})}function gs(u,d,p,I){u.info(function(){return"XMLHTTP TEXT ("+d+"): "+ab(u,p)+(I?" "+I:"")})}function ob(u,d){u.info(function(){return"TIMEOUT: "+d})}Oo.prototype.info=function(){};function ab(u,d){if(!u.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(u=0;u<p.length;u++)if(Array.isArray(p[u])){var I=p[u];if(!(2>I.length)){var O=I[1];if(Array.isArray(O)&&!(1>O.length)){var F=O[0];if(F!="noop"&&F!="stop"&&F!="close")for(var Y=1;Y<O.length;Y++)O[Y]=""}}}}return Rt(p)}catch{return d}}var Cc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},om={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},oh;function Dc(){}b(Dc,ms),Dc.prototype.g=function(){return new XMLHttpRequest},Dc.prototype.i=function(){return{}},oh=new Dc;function Vr(u,d,p,I){this.j=u,this.i=d,this.l=p,this.R=I||1,this.U=new Nt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new am}function am(){this.i=null,this.g="",this.h=!1}var cm={},ah={};function ch(u,d,p){u.L=1,u.v=Oc(Jn(d)),u.m=p,u.P=!0,um(u,null)}function um(u,d){u.F=Date.now(),kc(u),u.A=Jn(u.v);var p=u.A,I=u.R;Array.isArray(I)||(I=[String(I)]),wm(p.i,"t",I),u.C=0,p=u.j.J,u.h=new am,u.g=qm(u.j,p?d:null,!u.m),0<u.O&&(u.M=new gn(m(u.Y,u,u.g),u.O)),d=u.U,p=u.g,I=u.ca;var O="readystatechange";Array.isArray(O)||(O&&(Nr[0]=O.toString()),O=Nr);for(var F=0;F<O.length;F++){var Y=G(p,O[F],I||d.handleEvent,!1,d.h||d);if(!Y)break;d.g[Y.key]=Y}d=u.H?_(u.H):{},u.m?(u.u||(u.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,d)):(u.u="GET",u.g.ea(u.A,u.u,null,d)),No(),ib(u.i,u.u,u.A,u.l,u.R,u.m)}Vr.prototype.ca=function(u){u=u.target;const d=this.M;d&&Yn(u)==3?d.j():this.Y(u)},Vr.prototype.Y=function(u){try{if(u==this.g)e:{const Ot=Yn(this.g);var d=this.g.Ba();const Is=this.g.Z();if(!(3>Ot)&&(Ot!=3||this.g&&(this.h.h||this.g.oa()||Dm(this.g)))){this.J||Ot!=4||d==7||(d==8||0>=Is?No(3):No(2)),uh(this);var p=this.g.Z();this.X=p;t:if(lm(this)){var I=Dm(this.g);u="";var O=I.length,F=Yn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){bi(this),xo(this);var Y="";break t}this.h.i=new a.TextDecoder}for(d=0;d<O;d++)this.h.h=!0,u+=this.h.i.decode(I[d],{stream:!(F&&d==O-1)});I.length=0,this.h.g+=u,this.C=0,Y=this.h.g}else Y=this.g.oa();if(this.o=p==200,sb(this.i,this.u,this.A,this.l,this.R,Ot,p),this.o){if(this.T&&!this.K){t:{if(this.g){var Fe,St=this.g;if((Fe=St.g?St.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!D(Fe)){var Ce=Fe;break t}}Ce=null}if(p=Ce)gs(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,lh(this,p);else{this.o=!1,this.s=3,Kt(12),bi(this),xo(this);break e}}if(this.P){p=!0;let An;for(;!this.J&&this.C<Y.length;)if(An=cb(this,Y),An==ah){Ot==4&&(this.s=4,Kt(14),p=!1),gs(this.i,this.l,null,"[Incomplete Response]");break}else if(An==cm){this.s=4,Kt(15),gs(this.i,this.l,Y,"[Invalid Chunk]"),p=!1;break}else gs(this.i,this.l,An,null),lh(this,An);if(lm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ot!=4||Y.length!=0||this.h.h||(this.s=1,Kt(16),p=!1),this.o=this.o&&p,!p)gs(this.i,this.l,Y,"[Invalid Chunked Response]"),bi(this),xo(this);else if(0<Y.length&&!this.W){this.W=!0;var Vt=this.j;Vt.g==this&&Vt.ba&&!Vt.M&&(Vt.j.info("Great, no buffering proxy detected. Bytes received: "+Y.length),gh(Vt),Vt.M=!0,Kt(11))}}else gs(this.i,this.l,Y,null),lh(this,Y);Ot==4&&bi(this),this.o&&!this.J&&(Ot==4?Mm(this.j,this):(this.o=!1,kc(this)))}else bb(this.g),p==400&&0<Y.indexOf("Unknown SID")?(this.s=3,Kt(12)):(this.s=0,Kt(13)),bi(this),xo(this)}}}catch{}finally{}};function lm(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function cb(u,d){var p=u.C,I=d.indexOf(`
`,p);return I==-1?ah:(p=Number(d.substring(p,I)),isNaN(p)?cm:(I+=1,I+p>d.length?ah:(d=d.slice(I,I+p),u.C=I+p,d)))}Vr.prototype.cancel=function(){this.J=!0,bi(this)};function kc(u){u.S=Date.now()+u.I,hm(u,u.I)}function hm(u,d){if(u.B!=null)throw Error("WatchDog timer not null");u.B=Vo(m(u.ba,u),d)}function uh(u){u.B&&(a.clearTimeout(u.B),u.B=null)}Vr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(ob(this.i,this.A),this.L!=2&&(No(),Kt(17)),bi(this),this.s=2,xo(this)):hm(this,this.S-u)};function xo(u){u.j.G==0||u.J||Mm(u.j,u)}function bi(u){uh(u);var d=u.M;d&&typeof d.ma=="function"&&d.ma(),u.M=null,Do(u.U),u.g&&(d=u.g,u.g=null,d.abort(),d.ma())}function lh(u,d){try{var p=u.j;if(p.G!=0&&(p.g==u||hh(p.h,u))){if(!u.K&&hh(p.h,u)&&p.G==3){try{var I=p.Da.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var O=I;if(O[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<u.F)Bc(p),Fc(p);else break e;mh(p),Kt(18)}}else p.za=O[1],0<p.za-p.T&&37500>O[2]&&p.F&&p.v==0&&!p.C&&(p.C=Vo(m(p.Za,p),6e3));if(1>=pm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Si(p,11)}else if((u.K||p.g==u)&&Bc(p),!D(d))for(O=p.Da.g.parse(d),d=0;d<O.length;d++){let Ce=O[d];if(p.T=Ce[0],Ce=Ce[1],p.G==2)if(Ce[0]=="c"){p.K=Ce[1],p.ia=Ce[2];const Vt=Ce[3];Vt!=null&&(p.la=Vt,p.j.info("VER="+p.la));const Ot=Ce[4];Ot!=null&&(p.Aa=Ot,p.j.info("SVER="+p.Aa));const Is=Ce[5];Is!=null&&typeof Is=="number"&&0<Is&&(I=1.5*Is,p.L=I,p.j.info("backChannelRequestTimeoutMs_="+I)),I=p;const An=u.g;if(An){const jc=An.g?An.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(jc){var F=I.h;F.g||jc.indexOf("spdy")==-1&&jc.indexOf("quic")==-1&&jc.indexOf("h2")==-1||(F.j=F.l,F.g=new Set,F.h&&(dh(F,F.h),F.h=null))}if(I.D){const _h=An.g?An.g.getResponseHeader("X-HTTP-Session-Id"):null;_h&&(I.ya=_h,je(I.I,I.D,_h))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-u.F,p.j.info("Handshake RTT: "+p.R+"ms")),I=p;var Y=u;if(I.qa=Bm(I,I.J?I.ia:null,I.W),Y.K){mm(I.h,Y);var Fe=Y,St=I.L;St&&(Fe.I=St),Fe.B&&(uh(Fe),kc(Fe)),I.g=Y}else xm(I);0<p.i.length&&Uc(p)}else Ce[0]!="stop"&&Ce[0]!="close"||Si(p,7);else p.G==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?Si(p,7):ph(p):Ce[0]!="noop"&&p.l&&p.l.ta(Ce),p.v=0)}}No(4)}catch{}}var ub=class{constructor(u,d){this.g=u,this.map=d}};function dm(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function fm(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function pm(u){return u.h?1:u.g?u.g.size:0}function hh(u,d){return u.h?u.h==d:u.g?u.g.has(d):!1}function dh(u,d){u.g?u.g.add(d):u.h=d}function mm(u,d){u.h&&u.h==d?u.h=null:u.g&&u.g.has(d)&&u.g.delete(d)}dm.prototype.cancel=function(){if(this.i=gm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function gm(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let d=u.i;for(const p of u.g.values())d=d.concat(p.D);return d}return R(u.i)}function lb(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(c(u)){for(var d=[],p=u.length,I=0;I<p;I++)d.push(u[I]);return d}d=[],p=0;for(I in u)d[p++]=u[I];return d}function hb(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(c(u)||typeof u=="string"){var d=[];u=u.length;for(var p=0;p<u;p++)d.push(p);return d}d=[],p=0;for(const I in u)d[p++]=I;return d}}}function _m(u,d){if(u.forEach&&typeof u.forEach=="function")u.forEach(d,void 0);else if(c(u)||typeof u=="string")Array.prototype.forEach.call(u,d,void 0);else for(var p=hb(u),I=lb(u),O=I.length,F=0;F<O;F++)d.call(void 0,I[F],p&&p[F],u)}var ym=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function db(u,d){if(u){u=u.split("&");for(var p=0;p<u.length;p++){var I=u[p].indexOf("="),O=null;if(0<=I){var F=u[p].substring(0,I);O=u[p].substring(I+1)}else F=u[p];d(F,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Ri(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Ri){this.h=u.h,Nc(this,u.j),this.o=u.o,this.g=u.g,Vc(this,u.s),this.l=u.l;var d=u.i,p=new Fo;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),Im(this,p),this.m=u.m}else u&&(d=String(u).match(ym))?(this.h=!1,Nc(this,d[1]||"",!0),this.o=Lo(d[2]||""),this.g=Lo(d[3]||"",!0),Vc(this,d[4]),this.l=Lo(d[5]||"",!0),Im(this,d[6]||"",!0),this.m=Lo(d[7]||"")):(this.h=!1,this.i=new Fo(null,this.h))}Ri.prototype.toString=function(){var u=[],d=this.j;d&&u.push(Mo(d,vm,!0),":");var p=this.g;return(p||d=="file")&&(u.push("//"),(d=this.o)&&u.push(Mo(d,vm,!0),"@"),u.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&u.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&u.push("/"),u.push(Mo(p,p.charAt(0)=="/"?mb:pb,!0))),(p=this.i.toString())&&u.push("?",p),(p=this.m)&&u.push("#",Mo(p,_b)),u.join("")};function Jn(u){return new Ri(u)}function Nc(u,d,p){u.j=p?Lo(d,!0):d,u.j&&(u.j=u.j.replace(/:$/,""))}function Vc(u,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);u.s=d}else u.s=null}function Im(u,d,p){d instanceof Fo?(u.i=d,yb(u.i,u.h)):(p||(d=Mo(d,gb)),u.i=new Fo(d,u.h))}function je(u,d,p){u.i.set(d,p)}function Oc(u){return je(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Lo(u,d){return u?d?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Mo(u,d,p){return typeof u=="string"?(u=encodeURI(u).replace(d,fb),p&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function fb(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var vm=/[#\/\?@]/g,pb=/[#\?:]/g,mb=/[#\?]/g,gb=/[#\?@]/g,_b=/#/g;function Fo(u,d){this.h=this.g=null,this.i=u||null,this.j=!!d}function Or(u){u.g||(u.g=new Map,u.h=0,u.i&&db(u.i,function(d,p){u.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}n=Fo.prototype,n.add=function(u,d){Or(this),this.i=null,u=_s(this,u);var p=this.g.get(u);return p||this.g.set(u,p=[]),p.push(d),this.h+=1,this};function Em(u,d){Or(u),d=_s(u,d),u.g.has(d)&&(u.i=null,u.h-=u.g.get(d).length,u.g.delete(d))}function Tm(u,d){return Or(u),d=_s(u,d),u.g.has(d)}n.forEach=function(u,d){Or(this),this.g.forEach(function(p,I){p.forEach(function(O){u.call(d,O,I,this)},this)},this)},n.na=function(){Or(this);const u=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let I=0;I<d.length;I++){const O=u[I];for(let F=0;F<O.length;F++)p.push(d[I])}return p},n.V=function(u){Or(this);let d=[];if(typeof u=="string")Tm(this,u)&&(d=d.concat(this.g.get(_s(this,u))));else{u=Array.from(this.g.values());for(let p=0;p<u.length;p++)d=d.concat(u[p])}return d},n.set=function(u,d){return Or(this),this.i=null,u=_s(this,u),Tm(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[d]),this.h+=1,this},n.get=function(u,d){return u?(u=this.V(u),0<u.length?String(u[0]):d):d};function wm(u,d,p){Em(u,d),0<p.length&&(u.i=null,u.g.set(_s(u,d),R(p)),u.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var I=d[p];const F=encodeURIComponent(String(I)),Y=this.V(I);for(I=0;I<Y.length;I++){var O=F;Y[I]!==""&&(O+="="+encodeURIComponent(String(Y[I]))),u.push(O)}}return this.i=u.join("&")};function _s(u,d){return d=String(d),u.j&&(d=d.toLowerCase()),d}function yb(u,d){d&&!u.j&&(Or(u),u.i=null,u.g.forEach(function(p,I){var O=I.toLowerCase();I!=O&&(Em(this,I),wm(this,O,p))},u)),u.j=d}function Ib(u,d){const p=new Oo;if(a.Image){const I=new Image;I.onload=g(xr,p,"TestLoadImage: loaded",!0,d,I),I.onerror=g(xr,p,"TestLoadImage: error",!1,d,I),I.onabort=g(xr,p,"TestLoadImage: abort",!1,d,I),I.ontimeout=g(xr,p,"TestLoadImage: timeout",!1,d,I),a.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=u}else d(!1)}function vb(u,d){const p=new Oo,I=new AbortController,O=setTimeout(()=>{I.abort(),xr(p,"TestPingServer: timeout",!1,d)},1e4);fetch(u,{signal:I.signal}).then(F=>{clearTimeout(O),F.ok?xr(p,"TestPingServer: ok",!0,d):xr(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),xr(p,"TestPingServer: error",!1,d)})}function xr(u,d,p,I,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),I(p)}catch{}}function Eb(){this.g=new Sc}function Tb(u,d,p){const I=p||"";try{_m(u,function(O,F){let Y=O;l(O)&&(Y=Rt(O)),d.push(I+F+"="+encodeURIComponent(Y))})}catch(O){throw d.push(I+"type="+encodeURIComponent("_badmap")),O}}function xc(u){this.l=u.Ub||null,this.j=u.eb||!1}b(xc,ms),xc.prototype.g=function(){return new Lc(this.l,this.j)},xc.prototype.i=(function(u){return function(){return u}})({});function Lc(u,d){fe.call(this),this.D=u,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Lc,fe),n=Lc.prototype,n.open=function(u,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=d,this.readyState=1,Bo(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(d.body=u),(this.D||a).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Uo(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Bo(this)),this.g&&(this.readyState=3,Bo(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Am(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function Am(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var d=u.value?u.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!u.done}))&&(this.response=this.responseText+=d)}u.done?Uo(this):Bo(this),this.readyState==3&&Am(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Uo(this))},n.Qa=function(u){this.g&&(this.response=u,Uo(this))},n.ga=function(){this.g&&Uo(this)};function Uo(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Bo(u)}n.setRequestHeader=function(u,d){this.u.append(u,d)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,u.push(p[0]+": "+p[1]),p=d.next();return u.join(`\r
`)};function Bo(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Lc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function bm(u){let d="";return j(u,function(p,I){d+=I,d+=":",d+=p,d+=`\r
`}),d}function fh(u,d,p){e:{for(I in p){var I=!1;break e}I=!0}I||(p=bm(p),typeof u=="string"?p!=null&&encodeURIComponent(String(p)):je(u,d,p))}function nt(u){fe.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(nt,fe);var wb=/^https?$/i,Ab=["POST","PUT"];n=nt.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,d,p,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);d=d?d.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():oh.g(),this.v=this.o?em(this.o):em(oh),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(d,String(u),!0),this.B=!1}catch(F){Rm(this,F);return}if(u=p||"",p=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var O in I)p.set(O,I[O]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const F of I.keys())p.set(F,I.get(F));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(p.keys()).find(F=>F.toLowerCase()=="content-type"),O=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(Ab,d,void 0))||I||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[F,Y]of p)this.g.setRequestHeader(F,Y);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Cm(this),this.u=!0,this.g.send(u),this.u=!1}catch(F){Rm(this,F)}};function Rm(u,d){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=d,u.m=5,Sm(u),Mc(u)}function Sm(u){u.A||(u.A=!0,ye(u,"complete"),ye(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,ye(this,"complete"),ye(this,"abort"),Mc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mc(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Pm(this):this.bb())},n.bb=function(){Pm(this)};function Pm(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Yn(u)!=4||u.Z()!=2)){if(u.u&&Yn(u)==4)et(u.Ea,0,u);else if(ye(u,"readystatechange"),Yn(u)==4){u.h=!1;try{const Y=u.Z();e:switch(Y){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var I;if(I=Y===0){var O=String(u.D).match(ym)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),I=!wb.test(O?O.toLowerCase():"")}p=I}if(p)ye(u,"complete"),ye(u,"success");else{u.m=6;try{var F=2<Yn(u)?u.g.statusText:""}catch{F=""}u.l=F+" ["+u.Z()+"]",Sm(u)}}finally{Mc(u)}}}}function Mc(u,d){if(u.g){Cm(u);const p=u.g,I=u.v[0]?()=>{}:null;u.g=null,u.v=null,d||ye(u,"ready");try{p.onreadystatechange=I}catch{}}}function Cm(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function Yn(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<Yn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var d=this.g.responseText;return u&&d.indexOf(u)==0&&(d=d.substring(u.length)),_n(d)}};function Dm(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function bb(u){const d={};u=(u.g&&2<=Yn(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<u.length;I++){if(D(u[I]))continue;var p=P(u[I]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const F=d[O]||[];d[O]=F,F.push(p)}E(d,function(I){return I.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qo(u,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[u]||d}function km(u){this.Aa=0,this.i=[],this.j=new Oo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qo("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qo("baseRetryDelayMs",5e3,u),this.cb=qo("retryDelaySeedMs",1e4,u),this.Wa=qo("forwardChannelMaxRetries",2,u),this.wa=qo("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new dm(u&&u.concurrentRequestLimit),this.Da=new Eb,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=km.prototype,n.la=8,n.G=1,n.connect=function(u,d,p,I){Kt(0),this.W=u,this.H=d||{},p&&I!==void 0&&(this.H.OSID=p,this.H.OAID=I),this.F=this.X,this.I=Bm(this,null,this.W),Uc(this)};function ph(u){if(Nm(u),u.G==3){var d=u.U++,p=Jn(u.I);if(je(p,"SID",u.K),je(p,"RID",d),je(p,"TYPE","terminate"),jo(u,p),d=new Vr(u,u.j,d),d.L=2,d.v=Oc(Jn(p)),p=!1,a.navigator&&a.navigator.sendBeacon)try{p=a.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&a.Image&&(new Image().src=d.v,p=!0),p||(d.g=qm(d.j,null),d.g.ea(d.v)),d.F=Date.now(),kc(d)}Um(u)}function Fc(u){u.g&&(gh(u),u.g.cancel(),u.g=null)}function Nm(u){Fc(u),u.u&&(a.clearTimeout(u.u),u.u=null),Bc(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function Uc(u){if(!fm(u.h)&&!u.s){u.s=!0;var d=u.Ga;pe||wn(),Te||(pe(),Te=!0),rn.add(d,u),u.B=0}}function Rb(u,d){return pm(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=d.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=Vo(m(u.Ga,u,d),Fm(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const O=new Vr(this,this.j,u);let F=this.o;if(this.S&&(F?(F=_(F),v(F,this.S)):F=this.S),this.m!==null||this.O||(O.H=F,F=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var I=this.i[p];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=Om(this,O,d),p=Jn(this.I),je(p,"RID",u),je(p,"CVER",22),this.D&&je(p,"X-HTTP-Session-Id",this.D),jo(this,p),F&&(this.O?d="headers="+encodeURIComponent(String(bm(F)))+"&"+d:this.m&&fh(p,this.m,F)),dh(this.h,O),this.Ua&&je(p,"TYPE","init"),this.P?(je(p,"$req",d),je(p,"SID","null"),O.T=!0,ch(O,p,null)):ch(O,p,d),this.G=2}}else this.G==3&&(u?Vm(this,u):this.i.length==0||fm(this.h)||Vm(this))};function Vm(u,d){var p;d?p=d.l:p=u.U++;const I=Jn(u.I);je(I,"SID",u.K),je(I,"RID",p),je(I,"AID",u.T),jo(u,I),u.m&&u.o&&fh(I,u.m,u.o),p=new Vr(u,u.j,p,u.B+1),u.m===null&&(p.H=u.o),d&&(u.i=d.D.concat(u.i)),d=Om(u,p,1e3),p.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),dh(u.h,p),ch(p,I,d)}function jo(u,d){u.H&&j(u.H,function(p,I){je(d,I,p)}),u.l&&_m({},function(p,I){je(d,I,p)})}function Om(u,d,p){p=Math.min(u.i.length,p);var I=u.l?m(u.l.Na,u.l,u):null;e:{var O=u.i;let F=-1;for(;;){const Y=["count="+p];F==-1?0<p?(F=O[0].g,Y.push("ofs="+F)):F=0:Y.push("ofs="+F);let Fe=!0;for(let St=0;St<p;St++){let Ce=O[St].g;const Vt=O[St].map;if(Ce-=F,0>Ce)F=Math.max(0,O[St].g-100),Fe=!1;else try{Tb(Vt,Y,"req"+Ce+"_")}catch{I&&I(Vt)}}if(Fe){I=Y.join("&");break e}}}return u=u.i.splice(0,p),d.D=u,I}function xm(u){if(!u.g&&!u.u){u.Y=1;var d=u.Fa;pe||wn(),Te||(pe(),Te=!0),rn.add(d,u),u.v=0}}function mh(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=Vo(m(u.Fa,u),Fm(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,Lm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=Vo(m(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Kt(10),Fc(this),Lm(this))};function gh(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function Lm(u){u.g=new Vr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var d=Jn(u.qa);je(d,"RID","rpc"),je(d,"SID",u.K),je(d,"AID",u.T),je(d,"CI",u.F?"0":"1"),!u.F&&u.ja&&je(d,"TO",u.ja),je(d,"TYPE","xmlhttp"),jo(u,d),u.m&&u.o&&fh(d,u.m,u.o),u.L&&(u.g.I=u.L);var p=u.g;u=u.ia,p.L=1,p.v=Oc(Jn(d)),p.m=null,p.P=!0,um(p,u)}n.Za=function(){this.C!=null&&(this.C=null,Fc(this),mh(this),Kt(19))};function Bc(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Mm(u,d){var p=null;if(u.g==d){Bc(u),gh(u),u.g=null;var I=2}else if(hh(u.h,d))p=d.D,mm(u.h,d),I=1;else return;if(u.G!=0){if(d.o)if(I==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var O=u.B;I=Pc(),ye(I,new sm(I,p)),Uc(u)}else xm(u);else if(O=d.s,O==3||O==0&&0<d.X||!(I==1&&Rb(u,d)||I==2&&mh(u)))switch(p&&0<p.length&&(d=u.h,d.i=d.i.concat(p)),O){case 1:Si(u,5);break;case 4:Si(u,10);break;case 3:Si(u,6);break;default:Si(u,2)}}}function Fm(u,d){let p=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(p*=2),p*d}function Si(u,d){if(u.j.info("Error code "+d),d==2){var p=m(u.fb,u),I=u.Xa;const O=!I;I=new Ri(I||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Nc(I,"https"),Oc(I),O?Ib(I.toString(),p):vb(I.toString(),p)}else Kt(2);u.G=0,u.l&&u.l.sa(d),Um(u),Nm(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),Kt(2)):(this.j.info("Failed to ping google.com"),Kt(1))};function Um(u){if(u.G=0,u.ka=[],u.l){const d=gm(u.h);(d.length!=0||u.i.length!=0)&&(C(u.ka,d),C(u.ka,u.i),u.h.i.length=0,R(u.i),u.i.length=0),u.l.ra()}}function Bm(u,d,p){var I=p instanceof Ri?Jn(p):new Ri(p);if(I.g!="")d&&(I.g=d+"."+I.g),Vc(I,I.s);else{var O=a.location;I=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;var F=new Ri(null);I&&Nc(F,I),d&&(F.g=d),O&&Vc(F,O),p&&(F.l=p),I=F}return p=u.D,d=u.ya,p&&d&&je(I,p,d),je(I,"VER",u.la),jo(u,I),I}function qm(u,d,p){if(d&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=u.Ca&&!u.pa?new nt(new xc({eb:p})):new nt(u.pa),d.Ha(u.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function jm(){}n=jm.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function qc(){}qc.prototype.g=function(u,d){return new on(u,d)};function on(u,d){fe.call(this),this.g=new km(d),this.l=u,this.h=d&&d.messageUrlParams||null,u=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(u?u["X-WebChannel-Content-Type"]=d.messageContentType:u={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(u?u["X-WebChannel-Client-Profile"]=d.va:u={"X-WebChannel-Client-Profile":d.va}),this.g.S=u,(u=d&&d.Sb)&&!D(u)&&(this.g.m=u),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!D(d)&&(this.g.D=d,u=this.h,u!==null&&d in u&&(u=this.h,d in u&&delete u[d])),this.j=new ys(this)}b(on,fe),on.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},on.prototype.close=function(){ph(this.g)},on.prototype.o=function(u){var d=this.g;if(typeof u=="string"){var p={};p.__data__=u,u=p}else this.u&&(p={},p.__data__=Rt(u),u=p);d.i.push(new ub(d.Ya++,u)),d.G==3&&Uc(d)},on.prototype.N=function(){this.g.l=null,delete this.j,ph(this.g),delete this.g,on.aa.N.call(this)};function Gm(u){ih.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var d=u.__sm__;if(d){e:{for(const p in d){u=p;break e}u=void 0}(this.i=u)&&(u=this.i,d=d!==null&&u in d?d[u]:void 0),this.data=d}else this.data=u}b(Gm,ih);function Km(){sh.call(this),this.status=1}b(Km,sh);function ys(u){this.g=u}b(ys,jm),ys.prototype.ua=function(){ye(this.g,"a")},ys.prototype.ta=function(u){ye(this.g,new Gm(u))},ys.prototype.sa=function(u){ye(this.g,new Km)},ys.prototype.ra=function(){ye(this.g,"b")},qc.prototype.createWebChannel=qc.prototype.g,on.prototype.send=on.prototype.o,on.prototype.open=on.prototype.m,on.prototype.close=on.prototype.close,$v=function(){return new qc},zv=function(){return Pc()},Kv=Ai,Ed={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Cc.NO_ERROR=0,Cc.TIMEOUT=8,Cc.HTTP_ERROR=6,uu=Cc,om.COMPLETE="complete",Gv=om,tm.EventType=ko,ko.OPEN="a",ko.CLOSE="b",ko.ERROR="c",ko.MESSAGE="d",fe.prototype.listen=fe.prototype.K,oa=tm,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,jv=nt}).apply(typeof Wc<"u"?Wc:typeof self<"u"?self:typeof window<"u"?window:{});const Wg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Tt.UNAUTHENTICATED=new Tt(null),Tt.GOOGLE_CREDENTIALS=new Tt("google-credentials-uid"),Tt.FIRST_PARTY=new Tt("first-party-uid"),Tt.MOCK_USER=new Tt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let po="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=new If("@firebase/firestore");function Cs(){return oi.logLevel}function X0(n){oi.setLogLevel(n)}function z(n,...e){if(oi.logLevel<=we.DEBUG){const t=e.map(Tf);oi.debug(`Firestore (${po}): ${n}`,...t)}}function lt(n,...e){if(oi.logLevel<=we.ERROR){const t=e.map(Tf);oi.error(`Firestore (${po}): ${n}`,...t)}}function fn(n,...e){if(oi.logLevel<=we.WARN){const t=e.map(Tf);oi.warn(`Firestore (${po}): ${n}`,...t)}}function Tf(n){if(typeof n=="string")return n;try{/**
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
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(n="Unexpected state"){const e=`FIRESTORE (${po}) INTERNAL ASSERTION FAILED: `+n;throw lt(e),new Error(e)}function se(n,e){n||re()}function Z0(n,e){n||re()}function J(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends Qn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Wv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Tt.UNAUTHENTICATED)))}shutdown(){}}class eC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class tC{constructor(e){this.t=e,this.currentUser=Tt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){se(this.o===void 0);let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new wt,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},a=c=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new wt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string"),new Hv(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string"),new Tt(e)}}class nC{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Tt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class rC{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new nC(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(Tt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Qv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class iC{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){se(this.o===void 0);const r=s=>{s.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(se(typeof t.token=="string"),this.R=t.token,new Qv(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class sC{getToken(){return Promise.resolve(new Qv(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function oC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=oC(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function me(n,e){return n<e?-1:n>e?1:0}function $s(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}function Jv(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new K(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Je.fromMillis(Date.now())}static fromDate(e){return Je.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Je(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?me(this.nanoseconds,e.nanoseconds):me(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ae(e)}static min(){return new ae(new Je(0,0))}static max(){return new ae(new Je(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,t,r){t===void 0?t=0:t>e.length&&re(),r===void 0?r=e.length-t:r>e.length-t&&re(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ba.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ba?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ae extends Ba{construct(e,t,r){return new Ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new Ae(t)}static emptyPath(){return new Ae([])}}const aC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends Ba{construct(e,t,r){return new Ke(e,t,r)}static isValidIdentifier(e){return aC.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ke(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new K(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new K(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new K(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(Ae.fromString(e))}static fromName(e){return new Z(Ae.fromString(e).popFirst(5))}static empty(){return new Z(Ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new Ae(e.slice()))}}/**
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
 */class Hs{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Td(n){return n.fields.find((e=>e.kind===2))}function xi(n){return n.fields.filter((e=>e.kind!==2))}function cC(n,e){let t=me(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=uC(n.fields[r],e.fields[r]),t!==0)return t;return me(n.fields.length,e.fields.length)}Hs.UNKNOWN_ID=-1;class Qi{constructor(e,t){this.fieldPath=e,this.kind=t}}function uC(n,e){const t=Ke.comparator(n.fieldPath,e.fieldPath);return t!==0?t:me(n.kind,e.kind)}class Ws{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Ws(0,pn.min())}}function Yv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=ae.fromTimestamp(r===1e9?new Je(t+1,0):new Je(t,r));return new pn(i,Z.empty(),e)}function Xv(n){return new pn(n.readTime,n.key,-1)}class pn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new pn(ae.min(),Z.empty(),-1)}static max(){return new pn(ae.max(),Z.empty(),-1)}}function Af(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:me(n.largestBatchId,e.largestBatchId))}/**
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
 */const Zv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class eE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gi(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==Zv)throw n;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&re(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):N.reject(t)}static resolve(e){return new N(((t,r)=>{t(e)}))}static reject(e){return new N(((t,r)=>{r(e)}))}static waitFor(e){return new N(((t,r)=>{let i=0,s=0,o=!1;e.forEach((a=>{++i,a.next((()=>{++s,o&&s===i&&t()}),(c=>r(c)))})),o=!0,s===i&&t()}))}static or(e){let t=N.resolve(!1);for(const r of e)t=t.next((i=>i?N.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new N(((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let c=0;c<s;c++){const l=c;t(e[l]).next((h=>{o[l]=h,++a,a===s&&r(o)}),(h=>i(h)))}}))}static doWhile(e,t){return new N(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new wt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Ia(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=bf(r.target.error);this.V.reject(new Ia(e,i))}}static open(e,t,r,i){try{return new Il(t,e.transaction(i,r))}catch(s){throw new Ia(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(z("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new hC(t)}}class zn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,zn.S(It())===12.2&&lt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return z("SimpleDb","Removing database:",e),Fi(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Lv())return!1;if(zn.v())return!0;const e=It(),t=zn.S(e),r=0<t&&t<10,i=tE(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(z("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Ia(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new K(L.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new K(L.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ia(e,o))},i.onupgradeneeded=s=>{z("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next((()=>{z("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=Il.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next((l=>(a.g(),l))).catch((l=>(a.abort(l),N.reject(l)))).toPromise();return c.catch((()=>{})),await a.m,c}catch(a){const c=a,l=c.name!=="FirebaseError"&&o<3;if(z("SimpleDb","Transaction failed with error:",c.message,"Retrying:",l),this.close(),!l)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function tE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class lC{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Fi(this.B.delete())}}class Ia extends K{constructor(e,t){super(L.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function _i(n){return n.name==="IndexedDbTransactionError"}class hC{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(z("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(z("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Fi(r)}add(e){return z("SimpleDb","ADD",this.store.name,e,e),Fi(this.store.add(e))}get(e){return Fi(this.store.get(e)).next((t=>(t===void 0&&(t=null),z("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return z("SimpleDb","DELETE",this.store.name,e),Fi(this.store.delete(e))}count(){return z("SimpleDb","COUNT",this.store.name),Fi(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new N(((o,a)=>{s.onerror=c=>{a(c.target.error)},s.onsuccess=c=>{o(c.target.result)}}))}{const s=this.cursor(r),o=[];return this.W(s,((a,c)=>{o.push(c)})).next((()=>o))}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new N(((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}}))}j(e,t){z("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,((s,o,a)=>a.delete()))}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new N(((r,i)=>{t.onerror=s=>{const o=bf(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((a=>{a?o.continue():r()})):r()}}))}W(e,t){const r=[];return new N(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new lC(a),l=t(a.primaryKey,a.value,c);if(l instanceof N){const h=l.catch((f=>(c.done(),N.reject(f))));r.push(h)}c.isDone?i():c.K===null?a.continue():a.continue(c.K)}})).next((()=>N.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Fi(n){return new N(((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=bf(r.target.error);t(i)}}))}let Qg=!1;function bf(n){const e=zn.S(It());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new K("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Qg||(Qg=!0,setTimeout((()=>{throw r}),0)),r}}return n}class dC{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){z("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{z("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){_i(t)?z("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await gi(t)}await this.X(6e4)}))}}class fC{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const r=new Set;let i=t,s=!0;return N.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return z("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next((a=>{i-=a,r.add(o)}));s=!1})))).next((()=>t-i))}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.re(i,s))).next((a=>(z("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a)))).next((()=>o.size))}))))}re(e,t){let r=e;return t.changes.forEach(((i,s)=>{const o=Xv(s);Af(o,r)>0&&(r=o)})),new pn(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Zt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Zt.oe=-1;function cc(n){return n==null}function qa(n){return n===0&&1/n==-1/0}function nE(n){return typeof n=="number"&&Number.isInteger(n)&&!qa(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Jg(e)),e=pC(n.get(t),e);return Jg(e)}function pC(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Jg(n){return n+""}function Un(n){const e=n.length;if(se(e>=2),e===2)return se(n.charAt(0)===""&&n.charAt(1)===""),Ae.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&re(),n.charAt(o+1)){case"":const a=n.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:re()}s=o+2}return new Ae(r)}/**
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
 */const Yg=["userId","batchId"];/**
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
 */function lu(n,e){return[n,qt(e)]}function rE(n,e,t){return[n,qt(e),t]}const mC={},gC=["prefixPath","collectionGroup","readTime","documentId"],_C=["prefixPath","collectionGroup","documentId"],yC=["collectionGroup","readTime","prefixPath","documentId"],IC=["canonicalId","targetId"],vC=["targetId","path"],EC=["path","targetId"],TC=["collectionId","parent"],wC=["indexId","uid"],AC=["uid","sequenceNumber"],bC=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],RC=["indexId","uid","orderedDocumentKey"],SC=["userId","collectionPath","documentId"],PC=["userId","collectionPath","largestBatchId"],CC=["userId","collectionGroup","largestBatchId"],iE=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],DC=[...iE,"documentOverlays"],sE=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],oE=sE,Rf=[...oE,"indexConfiguration","indexState","indexEntries"],kC=Rf,NC=[...Rf,"globals"];/**
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
 */class wd extends eE{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function vt(n,e){const t=J(n);return zn.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function yi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function aE(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function cE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t){this.comparator=e,this.root=t||Pt.EMPTY}insert(e,t){return new qe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Pt.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Pt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Qc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Qc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Qc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Qc(this.root,e,this.comparator,!0)}}class Qc{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Pt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Pt.RED,this.left=i??Pt.EMPTY,this.right=s??Pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Pt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Pt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw re();const e=this.left.check();if(e!==this.right.check())throw re();return e+(this.isRed()?0:1)}}Pt.EMPTY=null,Pt.RED=!0,Pt.BLACK=!1;Pt.EMPTY=new class{constructor(){this.size=0}get key(){throw re()}get value(){throw re()}get color(){throw re()}get left(){throw re()}get right(){throw re()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Pt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Zg(this.data.getIterator())}getIteratorFrom(e){return new Zg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Le(this.comparator);return t.data=e,t}}class Zg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ts(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class en{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new en([])}unionWith(e){let t=new Le(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new en(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $s(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class uE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function VC(){return typeof atob<"u"}/**
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
 */class tt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new uE("Invalid base64 string: "+s):s}})(e);return new tt(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new tt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return me(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tt.EMPTY_BYTE_STRING=new tt("");const OC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vr(n){if(se(!!n),typeof n=="string"){let e=0;const t=OC.exec(n);if(se(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(n.seconds),nanos:We(n.nanos)}}function We(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Er(n){return typeof n=="string"?tt.fromBase64String(n):tt.fromUint8Array(n)}/**
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
 */function vl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function El(n){const e=n.mapValue.fields.__previous_value__;return vl(e)?El(e):e}function ja(n){const e=vr(n.mapValue.fields.__local_write_time__.timestampValue);return new Je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xC{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class ai{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ai("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ai&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Jr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},hu={nullValue:"NULL_VALUE"};function ci(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?vl(n)?4:lE(n)?9007199254740991:Tl(n)?10:11:re()}function Hn(n,e){if(n===e)return!0;const t=ci(n);if(t!==ci(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ja(n).isEqual(ja(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=vr(i.timestampValue),a=vr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return Er(i.bytesValue).isEqual(Er(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return We(i.geoPointValue.latitude)===We(s.geoPointValue.latitude)&&We(i.geoPointValue.longitude)===We(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return We(i.integerValue)===We(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=We(i.doubleValue),a=We(s.doubleValue);return o===a?qa(o)===qa(a):isNaN(o)&&isNaN(a)}return!1})(n,e);case 9:return $s(n.arrayValue.values||[],e.arrayValue.values||[],Hn);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(Xg(o)!==Xg(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Hn(o[c],a[c])))return!1;return!0})(n,e);default:return re()}}function Ga(n,e){return(n.values||[]).find((t=>Hn(t,e)))!==void 0}function ui(n,e){if(n===e)return 0;const t=ci(n),r=ci(e);if(t!==r)return me(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return me(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const a=We(s.integerValue||s.doubleValue),c=We(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(n,e);case 3:return e_(n.timestampValue,e.timestampValue);case 4:return e_(ja(n),ja(e));case 5:return me(n.stringValue,e.stringValue);case 6:return(function(s,o){const a=Er(s),c=Er(o);return a.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const h=me(a[l],c[l]);if(h!==0)return h}return me(a.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const a=me(We(s.latitude),We(o.latitude));return a!==0?a:me(We(s.longitude),We(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return t_(n.arrayValue,e.arrayValue);case 10:return(function(s,o){var a,c,l,h;const f=s.fields||{},m=o.fields||{},g=(a=f.value)===null||a===void 0?void 0:a.arrayValue,b=(c=m.value)===null||c===void 0?void 0:c.arrayValue,R=me(((l=g==null?void 0:g.values)===null||l===void 0?void 0:l.length)||0,((h=b==null?void 0:b.values)===null||h===void 0?void 0:h.length)||0);return R!==0?R:t_(g,b)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===Jr.mapValue&&o===Jr.mapValue)return 0;if(s===Jr.mapValue)return 1;if(o===Jr.mapValue)return-1;const a=s.fields||{},c=Object.keys(a),l=o.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){const m=me(c[f],h[f]);if(m!==0)return m;const g=ui(a[c[f]],l[h[f]]);if(g!==0)return g}return me(c.length,h.length)})(n.mapValue,e.mapValue);default:throw re()}}function e_(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return me(n,e);const t=vr(n),r=vr(e),i=me(t.seconds,r.seconds);return i!==0?i:me(t.nanos,r.nanos)}function t_(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=ui(t[i],r[i]);if(s)return s}return me(t.length,r.length)}function Qs(n){return Ad(n)}function Ad(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=vr(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Er(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Z.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Ad(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Ad(t.fields[o])}`;return i+"}"})(n.mapValue):re()}function du(n){switch(ci(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=El(n);return e?16+du(e):16;case 5:return 2*n.stringValue.length;case 6:return Er(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+du(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return yi(r.fields,((s,o)=>{i+=s.length+du(o)})),i})(n.mapValue);default:throw re()}}function Zi(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function bd(n){return!!n&&"integerValue"in n}function Ka(n){return!!n&&"arrayValue"in n}function n_(n){return!!n&&"nullValue"in n}function r_(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function fu(n){return!!n&&"mapValue"in n}function Tl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function va(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return yi(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=va(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=va(n.arrayValue.values[t]);return e}return Object.assign({},n)}function lE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const hE={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function LC(n){return"nullValue"in n?hu:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Zi(ai.empty(),Z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Tl(n)?hE:{mapValue:{}}:re()}function MC(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Zi(ai.empty(),Z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?hE:"mapValue"in n?Tl(n)?{mapValue:{}}:Jr:re()}function i_(n,e){const t=ui(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function s_(n,e){const t=ui(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!fu(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=va(t)}setAll(e){let t=Ke.emptyPath(),r={},i=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=va(o):i.push(a.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());fu(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Hn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];fu(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){yi(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new Dt(va(this.value))}}function dE(n){const e=[];return yi(n.fields,((t,r)=>{const i=new Ke([t]);if(fu(r)){const s=dE(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new en(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ge(e,0,ae.min(),ae.min(),ae.min(),Dt.empty(),0)}static newFoundDocument(e,t,r,i){return new Ge(e,1,t,ae.min(),r,i,0)}static newNoDocument(e,t){return new Ge(e,2,t,ae.min(),ae.min(),Dt.empty(),0)}static newUnknownDocument(e,t){return new Ge(e,3,t,ae.min(),ae.min(),Dt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ae.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ae.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class li{constructor(e,t){this.position=e,this.inclusive=t}}function o_(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),t.key):r=ui(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function a_(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Hn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class za{constructor(e,t="asc"){this.field=e,this.dir=t}}function FC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class fE{}class be extends fE{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new UC(e,t,r):t==="array-contains"?new jC(e,r):t==="in"?new IE(e,r):t==="not-in"?new GC(e,r):t==="array-contains-any"?new KC(e,r):new be(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new BC(e,r):new qC(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(ui(t,this.value)):t!==null&&ci(this.value)===ci(t)&&this.matchesComparison(ui(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xe extends fE{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new xe(e,t)}matches(e){return Js(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Js(n){return n.op==="and"}function Rd(n){return n.op==="or"}function Sf(n){return pE(n)&&Js(n)}function pE(n){for(const e of n.filters)if(e instanceof xe)return!1;return!0}function Sd(n){if(n instanceof be)return n.field.canonicalString()+n.op.toString()+Qs(n.value);if(Sf(n))return n.filters.map((e=>Sd(e))).join(",");{const e=n.filters.map((t=>Sd(t))).join(",");return`${n.op}(${e})`}}function mE(n,e){return n instanceof be?(function(r,i){return i instanceof be&&r.op===i.op&&r.field.isEqual(i.field)&&Hn(r.value,i.value)})(n,e):n instanceof xe?(function(r,i){return i instanceof xe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,o,a)=>s&&mE(o,i.filters[a])),!0):!1})(n,e):void re()}function gE(n,e){const t=n.filters.concat(e);return xe.create(t,n.op)}function _E(n){return n instanceof be?(function(t){return`${t.field.canonicalString()} ${t.op} ${Qs(t.value)}`})(n):n instanceof xe?(function(t){return t.op.toString()+" {"+t.getFilters().map(_E).join(" ,")+"}"})(n):"Filter"}class UC extends be{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){const t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class BC extends be{constructor(e,t){super(e,"in",t),this.keys=yE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class qC extends be{constructor(e,t){super(e,"not-in",t),this.keys=yE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function yE(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>Z.fromName(r.referenceValue)))}class jC extends be{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ka(t)&&Ga(t.arrayValue,this.value)}}class IE extends be{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ga(this.value.arrayValue,t)}}class GC extends be{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ga(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ga(this.value.arrayValue,t)}}class KC extends be{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ka(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ga(this.value.arrayValue,r)))}}/**
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
 */class zC{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function Pd(n,e=null,t=[],r=[],i=null,s=null,o=null){return new zC(n,e,t,r,i,s,o)}function es(n){const e=J(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Sd(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),cc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Qs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Qs(r))).join(",")),e.ue=t}return e.ue}function uc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!FC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!mE(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!a_(n.startAt,e.startAt)&&a_(n.endAt,e.endAt)}function Vu(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ou(n,e){return n.filters.filter((t=>t instanceof be&&t.field.isEqual(e)))}function c_(n,e,t){let r=hu,i=!0;for(const s of Ou(n,e)){let o=hu,a=!0;switch(s.op){case"<":case"<=":o=LC(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=hu}i_({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];i_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function u_(n,e,t){let r=Jr,i=!0;for(const s of Ou(n,e)){let o=Jr,a=!0;switch(s.op){case">=":case">":o=MC(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Jr}s_({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];s_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function vE(n,e,t,r,i,s,o,a){return new br(n,e,t,r,i,s,o,a)}function mo(n){return new br(n)}function l_(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Pf(n){return n.collectionGroup!==null}function Us(n){const e=J(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Le(Ke.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(a=a.add(l.field))}))})),a})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new za(s,r))})),t.has(Ke.keyField().canonicalString())||e.ce.push(new za(Ke.keyField(),r))}return e.ce}function jt(n){const e=J(n);return e.le||(e.le=TE(e,Us(n))),e.le}function EE(n){const e=J(n);return e.he||(e.he=TE(e,n.explicitOrderBy)),e.he}function TE(n,e){if(n.limitType==="F")return Pd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new za(i.field,s)}));const t=n.endAt?new li(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new li(n.startAt.position,n.startAt.inclusive):null;return Pd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Cd(n,e){const t=n.filters.concat([e]);return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function xu(n,e,t){return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function lc(n,e){return uc(jt(n),jt(e))&&n.limitType===e.limitType}function wE(n){return`${es(jt(n))}|lt:${n.limitType}`}function Ds(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>_E(i))).join(", ")}]`),cc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Qs(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Qs(i))).join(",")),`Target(${r})`})(jt(n))}; limitType=${n.limitType})`}function hc(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of Us(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(o,a,c){const l=o_(o,a,c);return o.inclusive?l<=0:l<0})(r.startAt,Us(r),i)||r.endAt&&!(function(o,a,c){const l=o_(o,a,c);return o.inclusive?l>=0:l>0})(r.endAt,Us(r),i))})(n,e)}function AE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function bE(n){return(e,t)=>{let r=!1;for(const i of Us(n)){const s=$C(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function $C(n,e,t){const r=n.field.isKeyField()?Z.comparator(e.key,t.key):(function(s,o,a){const c=o.data.field(s),l=a.data.field(s);return c!==null&&l!==null?ui(c,l):re()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return re()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){yi(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return cE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HC=new qe(Z.comparator);function tn(){return HC}const RE=new qe(Z.comparator);function aa(...n){let e=RE;for(const t of n)e=e.insert(t.key,t);return e}function SE(n){let e=RE;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Bn(){return Ea()}function PE(){return Ea()}function Ea(){return new Rr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const WC=new qe(Z.comparator),QC=new Le(Z.comparator);function Ie(...n){let e=QC;for(const t of n)e=e.add(t);return e}const JC=new Le(me);function Cf(){return JC}/**
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
 */function Df(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qa(e)?"-0":e}}function CE(n){return{integerValue:""+n}}function DE(n,e){return nE(e)?CE(e):Df(n,e)}/**
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
 */class wl{constructor(){this._=void 0}}function YC(n,e,t){return n instanceof Ys?(function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&vl(s)&&(s=El(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}})(t,e):n instanceof ts?NE(n,e):n instanceof ns?VE(n,e):(function(i,s){const o=kE(i,s),a=h_(o)+h_(i.Pe);return bd(o)&&bd(i.Pe)?CE(a):Df(i.serializer,a)})(n,e)}function XC(n,e,t){return n instanceof ts?NE(n,e):n instanceof ns?VE(n,e):t}function kE(n,e){return n instanceof Xs?(function(r){return bd(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class Ys extends wl{}class ts extends wl{constructor(e){super(),this.elements=e}}function NE(n,e){const t=OE(e);for(const r of n.elements)t.some((i=>Hn(i,r)))||t.push(r);return{arrayValue:{values:t}}}class ns extends wl{constructor(e){super(),this.elements=e}}function VE(n,e){let t=OE(e);for(const r of n.elements)t=t.filter((i=>!Hn(i,r)));return{arrayValue:{values:t}}}class Xs extends wl{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function h_(n){return We(n.integerValue||n.doubleValue)}function OE(n){return Ka(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t){this.field=e,this.transform=t}}function ZC(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof ts&&i instanceof ts||r instanceof ns&&i instanceof ns?$s(r.elements,i.elements,Hn):r instanceof Xs&&i instanceof Xs?Hn(r.Pe,i.Pe):r instanceof Ys&&i instanceof Ys})(n.transform,e.transform)}class eD{constructor(e,t){this.version=e,this.transformResults=t}}class Qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Qe}static exists(e){return new Qe(void 0,e)}static updateTime(e){return new Qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function pu(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Al{}function xE(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _o(n.key,Qe.none()):new go(n.key,n.data,Qe.none());{const t=n.data,r=Dt.empty();let i=new Le(Ke.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Sr(n.key,r,new en(i.toArray()),Qe.none())}}function tD(n,e,t){n instanceof go?(function(i,s,o){const a=i.value.clone(),c=f_(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof Sr?(function(i,s,o){if(!pu(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=f_(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(LE(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Ta(n,e,t,r){return n instanceof go?(function(s,o,a,c){if(!pu(s.precondition,o))return a;const l=s.value.clone(),h=p_(s.fieldTransforms,c,o);return l.setAll(h),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Sr?(function(s,o,a,c){if(!pu(s.precondition,o))return a;const l=p_(s.fieldTransforms,c,o),h=o.data;return h.setAll(LE(s)),h.setAll(l),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(s,o,a){return pu(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function nD(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=kE(r.transform,i||null);s!=null&&(t===null&&(t=Dt.empty()),t.set(r.field,s))}return t||null}function d_(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&$s(r,i,((s,o)=>ZC(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class go extends Al{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Sr extends Al{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function LE(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function f_(n,e,t){const r=new Map;se(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,XC(o,a,t[i]))}return r}function p_(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,YC(s,o,e))}return r}class _o extends Al{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class kf extends Al{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&tD(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ta(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ta(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=PE();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const c=xE(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(ae.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&$s(this.mutations,e.mutations,((t,r)=>d_(t,r)))&&$s(this.baseMutations,e.baseMutations,((t,r)=>d_(t,r)))}}class Vf{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){se(e.mutations.length===r.length);let i=(function(){return WC})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Vf(e,t,r,i)}}/**
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
 */class Of{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class ME{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,Re;function FE(n){switch(n){default:return re();case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0}}function UE(n){if(n===void 0)return lt("GRPC error has no .code"),L.UNKNOWN;switch(n){case pt.OK:return L.OK;case pt.CANCELLED:return L.CANCELLED;case pt.UNKNOWN:return L.UNKNOWN;case pt.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case pt.INTERNAL:return L.INTERNAL;case pt.UNAVAILABLE:return L.UNAVAILABLE;case pt.UNAUTHENTICATED:return L.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case pt.NOT_FOUND:return L.NOT_FOUND;case pt.ALREADY_EXISTS:return L.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return L.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case pt.ABORTED:return L.ABORTED;case pt.OUT_OF_RANGE:return L.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return L.UNIMPLEMENTED;case pt.DATA_LOSS:return L.DATA_LOSS;default:return re()}}(Re=pt||(pt={}))[Re.OK=0]="OK",Re[Re.CANCELLED=1]="CANCELLED",Re[Re.UNKNOWN=2]="UNKNOWN",Re[Re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Re[Re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Re[Re.NOT_FOUND=5]="NOT_FOUND",Re[Re.ALREADY_EXISTS=6]="ALREADY_EXISTS",Re[Re.PERMISSION_DENIED=7]="PERMISSION_DENIED",Re[Re.UNAUTHENTICATED=16]="UNAUTHENTICATED",Re[Re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Re[Re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Re[Re.ABORTED=10]="ABORTED",Re[Re.OUT_OF_RANGE=11]="OUT_OF_RANGE",Re[Re.UNIMPLEMENTED=12]="UNIMPLEMENTED",Re[Re.INTERNAL=13]="INTERNAL",Re[Re.UNAVAILABLE=14]="UNAVAILABLE",Re[Re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Lu=null;/**
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
 */function BE(){return new TextEncoder}/**
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
 */const iD=new Wi([4294967295,4294967295],0);function m_(n){const e=BE().encode(n),t=new qv;return t.update(e),new Uint8Array(t.digest())}function g_(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Wi([t,r],0),new Wi([i,s],0)]}class xf{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ca(`Invalid padding: ${t}`);if(r<0)throw new ca(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ca(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ca(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Wi.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Wi.fromNumber(r)));return i.compare(iD)===1&&(i=new Wi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=m_(e),[r,i]=g_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new xf(s,i,t);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.Ie===0)return;const t=m_(e),[r,i]=g_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ca extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,pc.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new fc(ae.min(),i,new qe(me),tn(),Ie())}}class pc{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new pc(r,t,Ie(),Ie(),Ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class qE{constructor(e,t){this.targetId=e,this.me=t}}class jE{constructor(e,t,r=tt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class __{constructor(){this.fe=0,this.ge=I_(),this.pe=tt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ie(),t=Ie(),r=Ie();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:re()}})),new pc(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=I_()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,se(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class sD{constructor(e){this.Le=e,this.Be=new Map,this.ke=tn(),this.qe=y_(),this.Qe=new qe(me)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:re()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((r,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Vu(s))if(r===0){const o=new Z(s.path);this.Ue(t,o,Ge.newNoDocument(o,ae.min()))}else se(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),c=a?this.Xe(a,e,o):1;if(c!==0){this.je(t);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,l)}Lu==null||Lu.et((function(h,f,m,g,b){var R,C,V,D,x,M;const H={localCacheCount:h,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},j=f.unchangedNames;return j&&(H.bloomFilter={applied:b===0,hashCount:(R=j==null?void 0:j.hashCount)!==null&&R!==void 0?R:0,bitmapLength:(D=(V=(C=j==null?void 0:j.bits)===null||C===void 0?void 0:C.bitmap)===null||V===void 0?void 0:V.length)!==null&&D!==void 0?D:0,padding:(M=(x=j==null?void 0:j.bits)===null||x===void 0?void 0:x.padding)!==null&&M!==void 0?M:0,mightContain:E=>{var _;return(_=g==null?void 0:g.mightContain(E))!==null&&_!==void 0&&_}}),H})(o,e.me,this.Le.tt(),a,c))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=Er(r).toUint8Array()}catch(c){if(c instanceof uE)return fn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new xf(o,i,s)}catch(c){return fn(c instanceof ca?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Vu(a.target)){const c=new Z(a.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Ge.newNoDocument(c,e))}s.be&&(t.set(o,s.ve()),s.Ce())}}));let r=Ie();this.qe.forEach(((s,o)=>{let a=!0;o.forEachWhile((c=>{const l=this.Je(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(s))})),this.ke.forEach(((s,o)=>o.setReadTime(e)));const i=new fc(e,t,this.Qe,this.ke,r);return this.ke=tn(),this.qe=y_(),this.Qe=new qe(me),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new __,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Le(me),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||z("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new __),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function y_(){return new qe(Z.comparator)}function I_(){return new qe(Z.comparator)}const oD={asc:"ASCENDING",desc:"DESCENDING"},aD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cD={and:"AND",or:"OR"};class uD{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Dd(n,e){return n.useProto3Json||cc(e)?e:{value:e}}function Zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function GE(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function lD(n,e){return Zs(n,e.toTimestamp())}function dt(n){return se(!!n),ae.fromTimestamp((function(t){const r=vr(t);return new Je(r.seconds,r.nanos)})(n))}function Lf(n,e){return kd(n,e).canonicalString()}function kd(n,e){const t=(function(i){return new Ae(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function KE(n){const e=Ae.fromString(n);return se(eT(e)),e}function $a(n,e){return Lf(n.databaseId,e.path)}function $n(n,e){const t=KE(e);if(t.get(1)!==n.databaseId.projectId)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(HE(t))}function zE(n,e){return Lf(n.databaseId,e)}function $E(n){const e=KE(n);return e.length===4?Ae.emptyPath():HE(e)}function Nd(n){return new Ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function HE(n){return se(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function v_(n,e,t){return{name:$a(n,e),fields:t.value.mapValue.fields}}function WE(n,e,t){const r=$n(n,e.name),i=dt(e.updateTime),s=e.createTime?dt(e.createTime):ae.min(),o=new Dt({mapValue:{fields:e.fields}}),a=Ge.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function hD(n,e){return"found"in e?(function(r,i){se(!!i.found),i.found.name,i.found.updateTime;const s=$n(r,i.found.name),o=dt(i.found.updateTime),a=i.found.createTime?dt(i.found.createTime):ae.min(),c=new Dt({mapValue:{fields:i.found.fields}});return Ge.newFoundDocument(s,o,a,c)})(n,e):"missing"in e?(function(r,i){se(!!i.missing),se(!!i.readTime);const s=$n(r,i.missing),o=dt(i.readTime);return Ge.newNoDocument(s,o)})(n,e):re()}function dD(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:re()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(l,h){return l.useProto3Json?(se(h===void 0||typeof h=="string"),tt.fromBase64String(h||"")):(se(h===void 0||h instanceof Buffer||h instanceof Uint8Array),tt.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(l){const h=l.code===void 0?L.UNKNOWN:UE(l.code);return new K(h,l.message||"")})(o);t=new jE(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=$n(n,r.document.name),s=dt(r.document.updateTime),o=r.document.createTime?dt(r.document.createTime):ae.min(),a=new Dt({mapValue:{fields:r.document.fields}}),c=Ge.newFoundDocument(i,s,o,a),l=r.targetIds||[],h=r.removedTargetIds||[];t=new mu(l,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=$n(n,r.document),s=r.readTime?dt(r.readTime):ae.min(),o=Ge.newNoDocument(i,s),a=r.removedTargetIds||[];t=new mu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=$n(n,r.document),s=r.removedTargetIds||[];t=new mu([],s,i,null)}else{if(!("filter"in e))return re();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new rD(i,s),a=r.targetId;t=new qE(a,o)}}return t}function Ha(n,e){let t;if(e instanceof go)t={update:v_(n,e.key,e.value)};else if(e instanceof _o)t={delete:$a(n,e.key)};else if(e instanceof Sr)t={update:v_(n,e.key,e.data),updateMask:yD(e.fieldMask)};else{if(!(e instanceof kf))return re();t={verify:$a(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,o){const a=o.transform;if(a instanceof Ys)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof ts)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof ns)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Xs)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw re()})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:lD(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:re()})(n,e.precondition)),t}function Vd(n,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?Qe.updateTime(dt(s.updateTime)):s.exists!==void 0?Qe.exists(s.exists):Qe.none()})(e.currentDocument):Qe.none(),r=e.updateTransforms?e.updateTransforms.map((i=>(function(o,a){let c=null;if("setToServerValue"in a)se(a.setToServerValue==="REQUEST_TIME"),c=new Ys;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];c=new ts(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];c=new ns(h)}else"increment"in a?c=new Xs(o,a.increment):re();const l=Ke.fromServerFormat(a.fieldPath);return new dc(l,c)})(n,i))):[];if(e.update){e.update.name;const i=$n(n,e.update.name),s=new Dt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const l=c.fieldPaths||[];return new en(l.map((h=>Ke.fromServerFormat(h))))})(e.updateMask);return new Sr(i,s,o,t,r)}return new go(i,s,t,r)}if(e.delete){const i=$n(n,e.delete);return new _o(i,t)}if(e.verify){const i=$n(n,e.verify);return new kf(i,t)}return re()}function fD(n,e){return n&&n.length>0?(se(e!==void 0),n.map((t=>(function(i,s){let o=i.updateTime?dt(i.updateTime):dt(s);return o.isEqual(ae.min())&&(o=dt(s)),new eD(o,i.transformResults||[])})(t,e)))):[]}function QE(n,e){return{documents:[zE(n,e.path)]}}function bl(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=zE(n,i);const s=(function(l){if(l.length!==0)return ZE(xe.create(l,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(l){if(l.length!==0)return l.map((h=>(function(m){return{field:zr(m.field),direction:mD(m.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=Dd(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{_t:t,parent:i}}function JE(n,e,t,r){const{_t:i,parent:s}=bl(n,e),o={},a=[];let c=0;return t.forEach((l=>{const h=r?l.alias:"aggregate_"+c++;o[h]=l.alias,l.aggregateType==="count"?a.push({alias:h,count:{}}):l.aggregateType==="avg"?a.push({alias:h,avg:{field:zr(l.fieldPath)}}):l.aggregateType==="sum"&&a.push({alias:h,sum:{field:zr(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function YE(n){let e=$E(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){se(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(f){const m=XE(f);return m instanceof xe&&Sf(m)?m.getFilters():[m]})(t.where));let o=[];t.orderBy&&(o=(function(f){return f.map((m=>(function(b){return new za(ks(b.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(b.direction))})(m)))})(t.orderBy));let a=null;t.limit&&(a=(function(f){let m;return m=typeof f=="object"?f.value:f,cc(m)?null:m})(t.limit));let c=null;t.startAt&&(c=(function(f){const m=!!f.before,g=f.values||[];return new li(g,m)})(t.startAt));let l=null;return t.endAt&&(l=(function(f){const m=!f.before,g=f.values||[];return new li(g,m)})(t.endAt)),vE(e,i,o,s,a,"F",c,l)}function pD(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function XE(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ks(t.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ks(t.unaryFilter.field);return be.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ks(t.unaryFilter.field);return be.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ks(t.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});default:return re()}})(n):n.fieldFilter!==void 0?(function(t){return be.create(ks(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return re()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return xe.create(t.compositeFilter.filters.map((r=>XE(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return re()}})(t.compositeFilter.op))})(n):re()}function mD(n){return oD[n]}function gD(n){return aD[n]}function _D(n){return cD[n]}function zr(n){return{fieldPath:n.canonicalString()}}function ks(n){return Ke.fromServerFormat(n.fieldPath)}function ZE(n){return n instanceof be?(function(t){if(t.op==="=="){if(r_(t.value))return{unaryFilter:{field:zr(t.field),op:"IS_NAN"}};if(n_(t.value))return{unaryFilter:{field:zr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(r_(t.value))return{unaryFilter:{field:zr(t.field),op:"IS_NOT_NAN"}};if(n_(t.value))return{unaryFilter:{field:zr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:zr(t.field),op:gD(t.op),value:t.value}}})(n):n instanceof xe?(function(t){const r=t.getFilters().map((i=>ZE(i)));return r.length===1?r[0]:{compositeFilter:{op:_D(t.op),filters:r}}})(n):re()}function yD(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function eT(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,t,r,i,s=ae.min(),o=ae.min(),a=tt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new lr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new lr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.ct=e}}function ID(n,e){let t;if(e.document)t=WE(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=Z.fromSegments(e.noDocument.path),i=is(e.noDocument.readTime);t=Ge.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return re();{const r=Z.fromSegments(e.unknownDocument.path),i=is(e.unknownDocument.version);t=Ge.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime((function(i){const s=new Je(i[0],i[1]);return ae.fromTimestamp(s)})(e.readTime)),t}function E_(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Mu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(s,o){return{name:$a(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Zs(s,o.version.toTimestamp()),createTime:Zs(s,o.createTime.toTimestamp())}})(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:rs(e.version)};else{if(!e.isUnknownDocument())return re();r.unknownDocument={path:t.path.toArray(),version:rs(e.version)}}return r}function Mu(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function rs(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function is(n){const e=new Je(n.seconds,n.nanoseconds);return ae.fromTimestamp(e)}function Ui(n,e){const t=(e.baseMutations||[]).map((s=>Vd(n.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((s=>Vd(n.ct,s))),i=Je.fromMillis(e.localWriteTimeMs);return new Nf(e.batchId,i,t,r)}function ua(n){const e=is(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?is(n.lastLimboFreeSnapshotVersion):ae.min();let r;return r=(function(s){return s.documents!==void 0})(n.query)?(function(s){return se(s.documents.length===1),jt(mo($E(s.documents[0])))})(n.query):(function(s){return jt(YE(s))})(n.query),new lr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,tt.fromBase64String(n.resumeToken))}function nT(n,e){const t=rs(e.snapshotVersion),r=rs(e.lastLimboFreeSnapshotVersion);let i;i=Vu(e.target)?QE(n.ct,e.target):bl(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:es(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Mf(n){const e=YE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?xu(e,e.limit,"L"):e}function xh(n,e){return new Of(e.largestBatchId,Vd(n.ct,e.overlayMutation))}function T_(n,e){const t=e.path.lastSegment();return[n,qt(e.path.popLast()),t]}function w_(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:rs(r.readTime),documentKey:qt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class vD{getBundleMetadata(e,t){return A_(e).get(t).next((r=>{if(r)return(function(s){return{id:s.bundleId,createTime:is(s.createTime),version:s.version}})(r)}))}saveBundleMetadata(e,t){return A_(e).put((function(i){return{bundleId:i.id,createTime:rs(dt(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return b_(e).get(t).next((r=>{if(r)return(function(s){return{name:s.name,query:Mf(s.bundledQuery),readTime:is(s.readTime)}})(r)}))}saveNamedQuery(e,t){return b_(e).put((function(i){return{name:i.name,readTime:rs(dt(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function A_(n){return vt(n,"bundles")}function b_(n){return vt(n,"namedQueries")}/**
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
 */class Rl{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new Rl(e,r)}getOverlay(e,t){return Ho(e).get(T_(this.userId,t)).next((r=>r?xh(this.serializer,r):null))}getOverlays(e,t){const r=Bn();return N.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){const i=[];return r.forEach(((s,o)=>{const a=new Of(t,o);i.push(this.ht(e,a))})),N.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach((o=>i.add(qt(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ho(e).j("collectionPathOverlayIndex",a))})),N.waitFor(s)}getOverlaysForCollection(e,t,r){const i=Bn(),s=qt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ho(e).U("collectionPathOverlayIndex",o).next((a=>{for(const c of a){const l=xh(this.serializer,c);i.set(l.getKey(),l)}return i}))}getOverlaysForCollectionGroup(e,t,r,i){const s=Bn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ho(e).J({index:"collectionGroupOverlayIndex",range:a},((c,l,h)=>{const f=xh(this.serializer,l);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):h.done()})).next((()=>s))}ht(e,t){return Ho(e).put((function(i,s,o){const[a,c,l]=T_(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ha(i.ct,o.mutation)}})(this.serializer,this.userId,t))}}function Ho(n){return vt(n,"documentOverlays")}/**
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
 */class ED{Pt(e){return vt(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?tt.fromUint8Array(r):tt.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class Bi{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(We(e.integerValue));else if("doubleValue"in e){const r=We(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),qa(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=vr(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Er(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?lE(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Tl(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):re()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(We(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),Z.fromName(e).path.forEach((r=>{this.dt(t,60),this.Dt(r,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}Bi.vt=new Bi;function TD(n){if(n===0)return 8;let e=0;return n>>4==0&&(e+=4,n<<=4),n>>6==0&&(e+=2,n<<=2),n>>7==0&&(e+=1),e}function R_(n){const e=64-(function(r){let i=0;for(let s=0;s<8;++s){const o=TD(255&r[s]);if(i+=o,o!==8)break}return i})(n);return Math.ceil(e/8)}class wD{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=R_(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=R_(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class AD{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class bD{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Wo{constructor(){this.jt=new wD,this.Ht=new AD(this.jt),this.Jt=new bD(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class qi{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new qi(this.indexId,this.documentKey,this.arrayValue,r)}}function Mr(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=S_(n.arrayValue,e.arrayValue),t!==0?t:(t=S_(n.directionalValue,e.directionalValue),t!==0?t:Z.comparator(n.documentKey,e.documentKey)))}function S_(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class P_{constructor(e){this.Xt=new Le(((t,r)=>Ke.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(se(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Td(e);if(t!==void 0&&!this.sn(t))return!1;const r=xi(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const c=r[s];if(!this.on(a,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Le(Ke.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Qi(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Qi(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Qi(r.field,r.dir==="asc"?0:1)));return new Hs(Hs.UNKNOWN_ID,this.collectionId,t,Ws.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function rT(n){var e,t;if(se(n instanceof be||n instanceof xe),n instanceof be){if(n instanceof IE){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>be.create(n.field,"==",s))))||[];return xe.create(i,"or")}return n}const r=n.filters.map((i=>rT(i)));return xe.create(r,n.op)}function RD(n){if(n.getFilters().length===0)return[];const e=Ld(rT(n));return se(iT(e)),Od(e)||xd(e)?[e]:e.getFilters()}function Od(n){return n instanceof be}function xd(n){return n instanceof xe&&Sf(n)}function iT(n){return Od(n)||xd(n)||(function(t){if(t instanceof xe&&Rd(t)){for(const r of t.getFilters())if(!Od(r)&&!xd(r))return!1;return!0}return!1})(n)}function Ld(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;if(n.filters.length===1)return Ld(n.filters[0]);const e=n.filters.map((r=>Ld(r)));let t=xe.create(e,n.op);return t=Fu(t),iT(t)?t:(se(t instanceof xe),se(Js(t)),se(t.filters.length>1),t.filters.reduce(((r,i)=>Ff(r,i))))}function Ff(n,e){let t;return se(n instanceof be||n instanceof xe),se(e instanceof be||e instanceof xe),t=n instanceof be?e instanceof be?(function(i,s){return xe.create([i,s],"and")})(n,e):C_(n,e):e instanceof be?C_(e,n):(function(i,s){if(se(i.filters.length>0&&s.filters.length>0),Js(i)&&Js(s))return gE(i,s.getFilters());const o=Rd(i)?i:s,a=Rd(i)?s:i,c=o.filters.map((l=>Ff(l,a)));return xe.create(c,"or")})(n,e),Fu(t)}function C_(n,e){if(Js(e))return gE(e,n.getFilters());{const t=e.filters.map((r=>Ff(n,r)));return xe.create(t,"or")}}function Fu(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;const e=n.getFilters();if(e.length===1)return Fu(e[0]);if(pE(n))return n;const t=e.map((i=>Fu(i))),r=[];return t.forEach((i=>{i instanceof be?r.push(i):i instanceof xe&&(i.op===n.op?r.push(...i.filters):r.push(i))})),r.length===1?r[0]:xe.create(r,n.op)}/**
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
 */class SD{constructor(){this.un=new Uf}addToCollectionParentIndex(e,t){return this.un.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(pn.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(pn.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class Uf{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Le(Ae.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Le(Ae.comparator)).toArray()}}/**
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
 */const Jc=new Uint8Array(0);class PD{constructor(e,t){this.databaseId=t,this.cn=new Uf,this.ln=new Rr((r=>es(r)),((r,i)=>uc(r,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:r,parent:qt(i)};return D_(e).put(s)}return N.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[Jv(t),""],!1,!0);return D_(e).U(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;r.push(Un(o.parent))}return r}))}addFieldIndex(e,t){const r=Qo(e),i=(function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=As(e);return s.next((a=>{o.put(w_(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const r=Qo(e),i=As(e),s=ws(e);return r.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Qo(e),r=ws(e),i=As(e);return t.j().next((()=>r.j())).next((()=>i.j()))}createTargetIndexes(e,t){return N.forEach(this.hn(t),(r=>this.getIndexType(e,r).next((i=>{if(i===0||i===1){const s=new P_(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const r=ws(e);let i=!0;const s=new Map;return N.forEach(this.hn(t),(o=>this.Pn(e,o).next((a=>{i&&(i=!!a),s.set(o,a)})))).next((()=>{if(i){let o=Ie();const a=[];return N.forEach(s,((c,l)=>{z("IndexedDbIndexManager",`Using index ${(function(x){return`id=${x.indexId}|cg=${x.collectionGroup}|f=${x.fields.map((M=>`${M.fieldPath}:${M.kind}`)).join(",")}`})(c)} to execute ${es(t)}`);const h=(function(x,M){const H=Td(M);if(H===void 0)return null;for(const j of Ou(x,H.fieldPath))switch(j.op){case"array-contains-any":return j.value.arrayValue.values||[];case"array-contains":return[j.value]}return null})(l,c),f=(function(x,M){const H=new Map;for(const j of xi(M))for(const E of Ou(x,j.fieldPath))switch(E.op){case"==":case"in":H.set(j.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return H.set(j.fieldPath.canonicalString(),E.value),Array.from(H.values())}return null})(l,c),m=(function(x,M){const H=[];let j=!0;for(const E of xi(M)){const _=E.kind===0?c_(x,E.fieldPath,x.startAt):u_(x,E.fieldPath,x.startAt);H.push(_.value),j&&(j=_.inclusive)}return new li(H,j)})(l,c),g=(function(x,M){const H=[];let j=!0;for(const E of xi(M)){const _=E.kind===0?u_(x,E.fieldPath,x.endAt):c_(x,E.fieldPath,x.endAt);H.push(_.value),j&&(j=_.inclusive)}return new li(H,j)})(l,c),b=this.In(c,l,m),R=this.In(c,l,g),C=this.Tn(c,l,f),V=this.En(c.indexId,h,b,m.inclusive,R,g.inclusive,C);return N.forEach(V,(D=>r.G(D,t.limit).next((x=>{x.forEach((M=>{const H=Z.fromSegments(M.documentKey);o.has(H)||(o=o.add(H),a.push(H))}))}))))})).next((()=>a))}return N.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=RD(xe.create(e.filters,"and")).map((r=>Pd(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const c=(t!=null?t.length:1)*Math.max(r.length,s.length),l=c/(t!=null?t.length:1),h=[];for(let f=0;f<c;++f){const m=t?this.dn(t[f/l]):Jc,g=this.An(e,m,r[f%l],i),b=this.Rn(e,m,s[f%l],o),R=a.map((C=>this.An(e,m,C,!0)));h.push(...this.createRange(g,b,R))}return h}An(e,t,r,i){const s=new qi(e,Z.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new qi(e,Z.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new P_(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o}))}getIndexType(e,t){let r=2;const i=this.hn(t);return N.forEach(i,(s=>this.Pn(e,s).next((o=>{o?r!==0&&o.fields.length<(function(c){let l=new Le(Ke.comparator),h=!1;for(const f of c.filters)for(const m of f.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?h=!0:l=l.add(m.field));for(const f of c.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(h?1:0)})(s)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&r===2?1:r))}Vn(e,t){const r=new Wo;for(const i of xi(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);Bi.vt.It(s,o)}return r.zt()}dn(e){const t=new Wo;return Bi.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new Wo;return Bi.vt.It(Zi(this.databaseId,t),r.Yt((function(s){const o=xi(s);return o.length===0?0:o[o.length-1].kind})(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new Wo);let s=0;for(const o of xi(e)){const a=r[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&Ka(a))i=this.gn(i,o,a);else{const l=c.Yt(o.kind);Bi.vt.It(a,l)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new Wo;c.seed(a.zt()),Bi.vt.It(o,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find((r=>r instanceof be&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Qo(e),i=As(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next((s=>{const o=[];return N.forEach(s,(a=>i.get([a.indexId,this.uid]).next((c=>{o.push((function(h,f){const m=f?new Ws(f.sequenceNumber,new pn(is(f.readTime),new Z(Un(f.documentKey)),f.largestBatchId)):Ws.empty(),g=h.fields.map((([b,R])=>new Qi(Ke.fromServerFormat(b),R)));return new Hs(h.indexId,h.collectionGroup,g,m)})(a,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:me(r.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const i=Qo(e),s=As(e);return this.yn(e).next((o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((a=>N.forEach(a,(c=>s.put(w_(c.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return N.forEach(t,((i,s)=>{const o=r.get(i.collectionGroup);return(o?N.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((a=>(r.set(i.collectionGroup,a),N.forEach(a,(c=>this.wn(e,i,c).next((l=>{const h=this.Sn(s,c);return l.isEqual(h)?N.resolve():this.bn(e,s,c,l,h)})))))))}))}Dn(e,t,r,i){return ws(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return ws(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=ws(e);let s=new Le(Mr);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},((o,a)=>{s=s.add(new qi(r.indexId,t,a.arrayValue,a.directionalValue))})).next((()=>s))}Sn(e,t){let r=new Le(Mr);const i=this.Vn(t,e);if(i==null)return r;const s=Td(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Ka(o))for(const a of o.arrayValue.values||[])r=r.add(new qi(t.indexId,e.key,this.dn(a),i))}else r=r.add(new qi(t.indexId,e.key,Jc,i));return r}bn(e,t,r,i,s){z("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return(function(c,l,h,f,m){const g=c.getIterator(),b=l.getIterator();let R=Ts(g),C=Ts(b);for(;R||C;){let V=!1,D=!1;if(R&&C){const x=h(R,C);x<0?D=!0:x>0&&(V=!0)}else R!=null?D=!0:V=!0;V?(f(C),C=Ts(b)):D?(m(R),R=Ts(g)):(R=Ts(g),C=Ts(b))}})(i,s,Mr,(a=>{o.push(this.Dn(e,t,r,a))}),(a=>{o.push(this.vn(e,t,r,a))})),N.waitFor(o)}yn(e){let t=1;return As(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,a)=>Mr(o,a))).filter(((o,a,c)=>!a||Mr(o,c[a-1])!==0));const i=[];i.push(e);for(const o of r){const a=Mr(o,e),c=Mr(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Jc,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Jc,[]];s.push(IDBKeyRange.bound(a,c))}return s}Cn(e,t){return Mr(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(k_)}getMinOffset(e,t){return N.mapArray(this.hn(t),(r=>this.Pn(e,r).next((i=>i||re())))).next(k_)}}function D_(n){return vt(n,"collectionParents")}function ws(n){return vt(n,"indexEntries")}function Qo(n){return vt(n,"indexConfiguration")}function As(n){return vt(n,"indexState")}function k_(n){se(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Af(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new pn(e.readTime,e.documentKey,t)}/**
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
 */const N_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Lt{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Lt(e,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function sT(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const c=r.J({range:o},((h,f,m)=>(a++,m.delete())));s.push(c.next((()=>{se(a===1)})));const l=[];for(const h of t.mutations){const f=rE(e,h.key.path,t.batchId);s.push(i.delete(f)),l.push(h.key)}return N.waitFor(s).next((()=>l))}function Uu(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw re();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Lt.DEFAULT_COLLECTION_PERCENTILE=10,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Lt.DEFAULT=new Lt(41943040,Lt.DEFAULT_COLLECTION_PERCENTILE,Lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Lt.DISABLED=new Lt(-1,0,0);class Sl{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){se(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Sl(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Fr(e).J({index:"userMutationsIndex",range:r},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,i){const s=Ns(e),o=Fr(e);return o.add({}).next((a=>{se(typeof a=="number");const c=new Nf(a,t,r,i),l=(function(g,b,R){const C=R.baseMutations.map((D=>Ha(g.ct,D))),V=R.mutations.map((D=>Ha(g.ct,D)));return{userId:b,batchId:R.batchId,localWriteTimeMs:R.localWriteTime.toMillis(),baseMutations:C,mutations:V}})(this.serializer,this.userId,c),h=[];let f=new Le(((m,g)=>me(m.canonicalString(),g.canonicalString())));for(const m of i){const g=rE(this.userId,m.key.path,a);f=f.add(m.key.path.popLast()),h.push(o.put(l)),h.push(s.put(g,mC))}return f.forEach((m=>{h.push(this.indexManager.addToCollectionParentIndex(e,m))})),e.addOnCommittedListener((()=>{this.Fn[a]=c.keys()})),N.waitFor(h).next((()=>c))}))}lookupMutationBatch(e,t){return Fr(e).get(t).next((r=>r?(se(r.userId===this.userId),Ui(this.serializer,r)):null))}Mn(e,t){return this.Fn[t]?N.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Fr(e).J({index:"userMutationsIndex",range:i},((o,a,c)=>{a.userId===this.userId&&(se(a.batchId>=r),s=Ui(this.serializer,a)),c.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return Fr(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,o)=>{r=s.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Fr(e).U("userMutationsIndex",t).next((r=>r.map((i=>Ui(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=lu(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Ns(e).J({range:i},((o,a,c)=>{const[l,h,f]=o,m=Un(h);if(l===this.userId&&t.path.isEqual(m))return Fr(e).get(f).next((g=>{if(!g)throw re();se(g.userId===this.userId),s.push(Ui(this.serializer,g))}));c.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);const i=[];return t.forEach((s=>{const o=lu(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=Ns(e).J({range:a},((l,h,f)=>{const[m,g,b]=l,R=Un(g);m===this.userId&&s.path.isEqual(R)?r=r.add(b):f.done()}));i.push(c)})),N.waitFor(i).next((()=>this.xn(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=lu(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Le(me);return Ns(e).J({range:o},((c,l,h)=>{const[f,m,g]=c,b=Un(m);f===this.userId&&r.isPrefixOf(b)?b.length===i&&(a=a.add(g)):h.done()})).next((()=>this.xn(e,a)))}xn(e,t){const r=[],i=[];return t.forEach((s=>{i.push(Fr(e).get(s).next((o=>{if(o===null)throw re();se(o.userId===this.userId),r.push(Ui(this.serializer,o))})))})),N.waitFor(i).next((()=>r))}removeMutationBatch(e,t){return sT(e._e,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),N.forEach(r,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return N.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return Ns(e).J({range:r},((s,o,a)=>{if(s[0]===this.userId){const c=Un(s[1]);i.push(c)}else a.done()})).next((()=>{se(i.length===0)}))}))}containsKey(e,t){return oT(e,this.userId,t)}Nn(e){return aT(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function oT(n,e,t){const r=lu(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Ns(n).J({range:s,H:!0},((a,c,l)=>{const[h,f,m]=a;h===e&&f===i&&(o=!0),l.done()})).next((()=>o))}function Fr(n){return vt(n,"mutations")}function Ns(n){return vt(n,"documentMutations")}function aT(n){return vt(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ss(0)}static kn(){return new ss(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CD{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const r=new ss(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>ae.fromTimestamp(new Je(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>bs(e).delete(t.targetId))).next((()=>this.qn(e))).next((r=>(se(r.targetCount>0),r.targetCount-=1,this.Qn(e,r))))}removeTargets(e,t,r){let i=0;const s=[];return bs(e).J(((o,a)=>{const c=ua(a);c.sequenceNumber<=t&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))})).next((()=>N.waitFor(s))).next((()=>i))}forEachTarget(e,t){return bs(e).J(((r,i)=>{const s=ua(i);t(s)}))}qn(e){return V_(e).get("targetGlobalKey").next((t=>(se(t!==null),t)))}Qn(e,t){return V_(e).put("targetGlobalKey",t)}Kn(e,t){return bs(e).put(nT(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const r=es(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return bs(e).J({range:i,index:"queryTargetsIndex"},((o,a,c)=>{const l=ua(a);uc(t,l.target)&&(s=l,c.done())})).next((()=>s))}addMatchingKeys(e,t,r){const i=[],s=$r(e);return t.forEach((o=>{const a=qt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))})),N.waitFor(i)}removeMatchingKeys(e,t,r){const i=$r(e);return N.forEach(t,(s=>{const o=qt(s.path);return N.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])}))}removeMatchingKeysForTargetId(e,t){const r=$r(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=$r(e);let s=Ie();return i.J({range:r,H:!0},((o,a,c)=>{const l=Un(o[1]),h=new Z(l);s=s.add(h)})).next((()=>s))}containsKey(e,t){const r=qt(t.path),i=IDBKeyRange.bound([r],[Jv(r)],!1,!0);let s=0;return $r(e).J({index:"documentTargetsIndex",H:!0,range:i},(([o,a],c,l)=>{o!==0&&(s++,l.done())})).next((()=>s>0))}ot(e,t){return bs(e).get(t).next((r=>r?ua(r):null))}}function bs(n){return vt(n,"targets")}function V_(n){return vt(n,"targetGlobal")}function $r(n){return vt(n,"targetDocuments")}/**
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
 */function O_([n,e],[t,r]){const i=me(n,t);return i===0?me(e,r):i}class DD{constructor(e){this.Un=e,this.buffer=new Le(O_),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();O_(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class cT{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){z("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){_i(t)?z("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await gi(t)}await this.Hn(3e5)}))}}class kD{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Zt.oe);const r=new DD(t);return this.Jn.forEachTarget(e,(i=>r.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>r.zn(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(N_)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),N_):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,c,l;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i)))).next((f=>(r=f,a=Date.now(),this.removeTargets(e,r,t)))).next((f=>(s=f,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(l=Date.now(),Cs()<=we.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${f} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f}))))}}function uT(n,e){return new kD(n,e)}/**
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
 */class ND{constructor(e,t){this.db=e,this.garbageCollector=uT(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((r,i)=>t(i)))}addReference(e,t,r){return Yc(e,r)}removeReference(e,t,r){return Yc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Yc(e,t)}nr(e,t){return(function(i,s){let o=!1;return aT(i).Y((a=>oT(i,a,s).next((c=>(c&&(o=!0),N.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((o,a)=>{if(a<=t){const c=this.nr(e,o).next((l=>{if(!l)return s++,r.getEntry(e,o).next((()=>(r.removeEntry(o,ae.min()),$r(e).delete((function(f){return[0,qt(f.path)]})(o)))))}));i.push(c)}})).next((()=>N.waitFor(i))).next((()=>r.apply(e))).next((()=>s))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Yc(e,t)}tr(e,t){const r=$r(e);let i,s=Zt.oe;return r.J({index:"documentTargetsIndex"},(([o,a],{path:c,sequenceNumber:l})=>{o===0?(s!==Zt.oe&&t(new Z(Un(i)),s),s=l,i=c):s=Zt.oe})).next((()=>{s!==Zt.oe&&t(new Z(Un(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Yc(n,e){return $r(n).put((function(r,i){return{targetId:0,path:qt(r.path),sequenceNumber:i}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(){this.changes=new Rr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VD{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Ni(e).put(r)}removeEntry(e,t,r){return Ni(e).delete((function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],Mu(o),a[a.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.rr(e,r))))}getEntry(e,t){let r=Ge.newInvalidDocument(t);return Ni(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Jo(t))},((i,s)=>{r=this.ir(t,s)})).next((()=>r))}sr(e,t){let r={size:0,document:Ge.newInvalidDocument(t)};return Ni(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Jo(t))},((i,s)=>{r={document:this.ir(t,s),size:Uu(s)}})).next((()=>r))}getEntries(e,t){let r=tn();return this._r(e,t,((i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)})).next((()=>r))}ar(e,t){let r=tn(),i=new qe(Z.comparator);return this._r(e,t,((s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,Uu(o))})).next((()=>({documents:r,ur:i})))}_r(e,t,r){if(t.isEmpty())return N.resolve();let i=new Le(M_);t.forEach((c=>i=i.add(c)));const s=IDBKeyRange.bound(Jo(i.first()),Jo(i.last())),o=i.getIterator();let a=o.getNext();return Ni(e).J({index:"documentKeyIndex",range:s},((c,l,h)=>{const f=Z.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;a&&M_(a,f)<0;)r(a,null),a=o.getNext();a&&a.isEqual(f)&&(r(a,l),a=o.hasNext()?o.getNext():null),a?h.$(Jo(a)):h.done()})).next((()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),Mu(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ni(e).U(IDBKeyRange.bound(a,c,!0)).next((l=>{s==null||s.incrementDocumentReadCount(l.length);let h=tn();for(const f of l){const m=this.ir(Z.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);m.isFoundDocument()&&(hc(t,m)||i.has(m.key))&&(h=h.insert(m.key,m))}return h}))}getAllFromCollectionGroup(e,t,r,i){let s=tn();const o=L_(t,r),a=L_(t,pn.max());return Ni(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},((c,l,h)=>{const f=this.ir(Z.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);s=s.insert(f.key,f),s.size===i&&h.done()})).next((()=>s))}newChangeBuffer(e){return new OD(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return x_(e).get("remoteDocumentGlobalKey").next((t=>(se(!!t),t)))}rr(e,t){return x_(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=ID(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ae.min())))return r}return Ge.newInvalidDocument(e)}}function hT(n){return new VD(n)}class OD extends lT{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Rr((r=>r.toString()),((r,i)=>r.isEqual(i)))}applyChanges(e){const t=[];let r=0,i=new Le(((s,o)=>me(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=E_(this.cr.serializer,o);i=i.add(s.path.popLast());const l=Uu(c);r+=l-a.size,t.push(this.cr.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=E_(this.cr.serializer,o.convertToNoDocument(ae.min()));t.push(this.cr.addEntry(e,s,c))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,r)),N.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:r,ur:i})=>(i.forEach(((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})})),r)))}}function x_(n){return vt(n,"remoteDocumentGlobal")}function Ni(n){return vt(n,"remoteDocumentsV14")}function Jo(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function L_(n,e){const t=e.documentKey.path.toArray();return[n,Mu(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function M_(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=me(t[s],r[s]),i)return i;return i=me(t.length,r.length),i||(i=me(t[t.length-2],r[r.length-2]),i||me(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class xD{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&Ta(r.mutation,i,en.empty(),Je.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const i=Bn();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let o=aa();return s.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=Bn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,r,i){let s=tn();const o=Ea(),a=(function(){return Ea()})();return t.forEach(((c,l)=>{const h=r.get(l.key);i.has(l.key)&&(h===void 0||h.mutation instanceof Sr)?s=s.insert(l.key,l):h!==void 0?(o.set(l.key,h.mutation.getFieldMask()),Ta(h.mutation,l,h.mutation.getFieldMask(),Je.now())):o.set(l.key,en.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((l,h)=>o.set(l,h))),t.forEach(((l,h)=>{var f;return a.set(l,new xD(h,(f=o.get(l))!==null&&f!==void 0?f:null))})),a)))}recalculateAndSaveOverlays(e,t){const r=Ea();let i=new qe(((o,a)=>o-a)),s=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const l=t.get(c);if(l===null)return;let h=r.get(c)||en.empty();h=a.applyToLocalView(l,h),r.set(c,h);const f=(i.get(a.batchId)||Ie()).add(c);i=i.insert(a.batchId,f)}))})).next((()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,h=c.value,f=PE();h.forEach((m=>{if(!s.has(m)){const g=xE(t.get(m),r.get(m));g!==null&&f.set(m,g),s=s.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return N.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return(function(o){return Z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Pf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve(Bn());let a=-1,c=s;return o.next((l=>N.forEach(l,((h,f)=>(a<f.largestBatchId&&(a=f.largestBatchId),s.get(h)?N.resolve():this.remoteDocumentCache.getEntry(e,h).next((m=>{c=c.insert(h,m)}))))).next((()=>this.populateOverlays(e,l,s))).next((()=>this.computeViews(e,c,l,Ie()))).next((h=>({batchId:a,changes:SE(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next((r=>{let i=aa();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=aa();return this.indexManager.getCollectionParents(e,s).next((a=>N.forEach(a,(c=>{const l=(function(f,m){return new br(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next((h=>{h.forEach(((f,m)=>{o=o.insert(f,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((o=>{s.forEach(((c,l)=>{const h=l.getKey();o.get(h)===null&&(o=o.insert(h,Ge.newInvalidDocument(h)))}));let a=aa();return o.forEach(((c,l)=>{const h=s.get(c);h!==void 0&&Ta(h.mutation,l,en.empty(),Je.now()),hc(t,l)&&(a=a.insert(c,l))})),a}))}}/**
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
 */class LD{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return N.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:dt(i.createTime)}})(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:Mf(i.bundledQuery),readTime:dt(i.readTime)}})(t)),N.resolve()}}/**
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
 */class MD{constructor(){this.overlays=new qe(Z.comparator),this.Ir=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Bn();return N.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.ht(e,t,s)})),N.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const i=Bn(),s=t.length+1,o=new Z(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new qe(((l,h)=>l-h));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let h=s.get(l.largestBatchId);h===null&&(h=Bn(),s=s.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}const a=Bn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,h)=>a.set(l,h))),!(a.size()>=i)););return N.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Of(t,r));let s=this.Ir.get(t);s===void 0&&(s=Ie(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
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
 */class FD{constructor(){this.sessionToken=tt.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(){this.Tr=new Le(Et.Er),this.dr=new Le(Et.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new Et(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new Et(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new Z(new Ae([])),r=new Et(t,e),i=new Et(t,e+1),s=[];return this.dr.forEachInRange([r,i],(o=>{this.Vr(o),s.push(o.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new Z(new Ae([])),r=new Et(t,e),i=new Et(t,e+1);let s=Ie();return this.dr.forEachInRange([r,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new Et(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Et{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return Z.comparator(e.key,t.key)||me(e.wr,t.wr)}static Ar(e,t){return me(e.wr,t.wr)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UD{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Le(Et.Er)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Nf(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new Et(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Et(t,0),i=new Et(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],(o=>{const a=this.Dr(o.wr);s.push(a)})),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);return t.forEach((i=>{const s=new Et(i,0),o=new Et(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],(a=>{r=r.add(a.wr)}))})),N.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;Z.isDocumentKey(s)||(s=s.child(""));const o=new Et(new Z(s),0);let a=new Le(me);return this.br.forEachWhile((c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.wr)),!0)}),o),N.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach((r=>{const i=this.Dr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){se(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return N.forEach(t.mutations,(i=>{const s=new Et(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new Et(t,0),i=this.br.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BD{constructor(e){this.Mr=e,this.docs=(function(){return new qe(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():Ge.newInvalidDocument(t))}getEntries(e,t){let r=tn();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ge.newInvalidDocument(i))})),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=tn();const o=t.path,a=new Z(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:h}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Af(Xv(h),r)<=0||(i.has(h.key)||hc(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){re()}Or(e,t){return N.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new qD(this)}getSize(e){return N.resolve(this.size)}}class qD extends lT{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)})),N.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{constructor(e){this.persistence=e,this.Nr=new Rr((t=>es(t)),uc),this.lastRemoteSnapshotVersion=ae.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Bf,this.targetCount=0,this.kr=ss.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,i)=>t(i))),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),N.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new ss(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Kn(t),N.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach(((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)})),N.waitFor(s).next((()=>i))}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Zt(0),this.Kr=!1,this.Kr=!0,this.$r=new FD,this.referenceDelegate=e(this),this.Ur=new jD(this),this.indexManager=new SD,this.remoteDocumentCache=(function(i){return new BD(i)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new tT(t),this.Gr=new LD(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new MD,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new UD(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){z("MemoryPersistence","Starting transaction:",e);const i=new GD(this.Qr.next());return this.referenceDelegate.zr(),r(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return N.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class GD extends eE{constructor(e){super(),this.currentSequenceNumber=e}}class Pl{constructor(e){this.persistence=e,this.Jr=new Bf,this.Yr=null}static Zr(e){return new Pl(e)}get Xr(){if(this.Yr)return this.Yr;throw re()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),N.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.Xr,(r=>{const i=Z.fromPath(r);return this.ei(e,i).next((s=>{s||t.removeEntry(i,ae.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return N.or([()=>N.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class Bu{constructor(e,t){this.persistence=e,this.ti=new Rr((r=>qt(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=uT(this,t)}static Zr(e,t){return new Bu(e,t)}zr(){}jr(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}Zn(e,t){return N.forEach(this.ti,((r,i)=>this.nr(e,r,i).next((s=>s?N.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,(o=>this.nr(e,o,t).next((a=>{a||(r++,s.removeEntry(o,ae.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=du(e.data.value)),t}nr(e,t,r){return N.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return N.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class KD{constructor(e){this.serializer=e}O(e,t,r,i){const s=new Il("createOrUpgrade",t);r<1&&i>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Yg,{unique:!0}),c.createObjectStore("documentMutations")})(e),F_(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let o=N.resolve();return r<3&&i>=3&&(r!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),F_(e)),o=o.next((()=>(function(c){const l=c.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ae.min().toTimestamp(),targetCount:0};return l.put("targetGlobalKey",h)})(s)))),r<4&&i>=4&&(r!==0&&(o=o.next((()=>(function(c,l){return l.store("mutations").U().next((h=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Yg,{unique:!0});const f=l.store("mutations"),m=h.map((g=>f.put(g)));return N.waitFor(m)}))})(e,s)))),o=o.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),r<5&&i>=5&&(o=o.next((()=>this.ni(s)))),r<6&&i>=6&&(o=o.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),r<7&&i>=7&&(o=o.next((()=>this.ii(s)))),r<8&&i>=8&&(o=o.next((()=>this.si(e,s)))),r<9&&i>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&i>=10&&(o=o.next((()=>this.oi(s)))),r<11&&i>=11&&(o=o.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),r<12&&i>=12&&(o=o.next((()=>{(function(c){const l=c.createObjectStore("documentOverlays",{keyPath:SC});l.createIndex("collectionPathOverlayIndex",PC,{unique:!1}),l.createIndex("collectionGroupOverlayIndex",CC,{unique:!1})})(e)}))),r<13&&i>=13&&(o=o.next((()=>(function(c){const l=c.createObjectStore("remoteDocumentsV14",{keyPath:gC});l.createIndex("documentKeyIndex",_C),l.createIndex("collectionGroupIndex",yC)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),r<14&&i>=14&&(o=o.next((()=>this.ai(e,s)))),r<15&&i>=15&&(o=o.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:wC}).createIndex("sequenceNumberIndex",AC,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:bC}).createIndex("documentKeyIndex",RC,{unique:!1})})(e)))),r<16&&i>=16&&(o=o.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),r<17&&i>=17&&(o=o.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),o}ri(e){let t=0;return e.store("remoteDocuments").J(((r,i)=>{t+=Uu(i)})).next((()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)}))}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next((i=>N.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next((a=>N.forEach(a,(c=>{se(c.userId===s.userId);const l=Ui(this.serializer,c);return sT(e,s.userId,l).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return r.J(((o,a)=>{const c=new Ae(o),l=(function(f){return[0,qt(f)]})(c);s.push(t.get(l).next((h=>h?N.resolve():(f=>t.put({targetId:0,path:qt(f),sequenceNumber:i.highestListenSequenceNumber}))(c))))})).next((()=>N.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:TC});const r=t.store("collectionParents"),i=new Uf,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:qt(c)})}};return t.store("remoteDocuments").J({H:!0},((o,a)=>{const c=new Ae(o);return s(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([o,a,c],l)=>{const h=Un(a);return s(h.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((r,i)=>{const s=ua(i),o=nT(this.serializer,s);return t.put(o)}))}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J(((s,o)=>{const a=t.store("remoteDocumentsV14"),c=(function(f){return f.document?new Z(Ae.fromString(f.document.name).popFirst(5)):f.noDocument?Z.fromSegments(f.noDocument.path):f.unknownDocument?Z.fromSegments(f.unknownDocument.path):re()})(o).path.toArray(),l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(l))})).next((()=>N.waitFor(i)))}ai(e,t){const r=t.store("mutations"),i=hT(this.serializer),s=new qf(Pl.Zr,this.serializer.ct);return r.U().next((o=>{const a=new Map;return o.forEach((c=>{var l;let h=(l=a.get(c.userId))!==null&&l!==void 0?l:Ie();Ui(this.serializer,c).keys().forEach((f=>h=h.add(f))),a.set(c.userId,h)})),N.forEach(a,((c,l)=>{const h=new Tt(l),f=Rl.lt(this.serializer,h),m=s.getIndexManager(h),g=Sl.lt(h,this.serializer,m,s.referenceDelegate);return new dT(i,g,f,m).recalculateAndSaveOverlaysForDocumentKeys(new wd(t,Zt.oe),c).next()}))}))}}function F_(n){n.createObjectStore("targetDocuments",{keyPath:vC}).createIndex("documentTargetsIndex",EC,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",IC,{unique:!0}),n.createObjectStore("targetGlobal")}const Lh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class jf{constructor(e,t,r,i,s,o,a,c,l,h,f=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=l,this.li=h,this.hi=f,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=m=>Promise.resolve(),!jf.D())throw new K(L.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new ND(this,i),this.Ai=t+"main",this.serializer=new tT(c),this.Ri=new zn(this.Ai,this.hi,new KD(this.serializer)),this.$r=new ED,this.Ur=new CD(this.referenceDelegate,this.serializer),this.remoteDocumentCache=hT(this.serializer),this.Gr=new vD,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&lt("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new K(L.FAILED_PRECONDITION,Lh);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new Zt(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Xc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(_i(e))return z("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return z("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Yo(e).get("owner").next((t=>N.resolve(this.vi(t))))}Ci(e){return Xc(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=vt(t,"clientMetadata");return r.U().next((i=>{const s=this.xi(i,18e5),o=i.filter((a=>s.indexOf(a)===-1));return N.forEach(o,(a=>r.delete(a.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?N.resolve(!0):Yo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new K(L.FAILED_PRECONDITION,Lh);return!1}}return!(!this.networkEnabled||!this.inForeground)||Xc(e).U().next((r=>this.xi(r,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&z("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new wd(e,Zt.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>Xc(e).U().next((t=>this.xi(t,18e5).map((r=>r.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Sl.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new PD(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Rl.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){z("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(c){return c===17?NC:c===16?kC:c===15?Rf:c===14?oE:c===13?sE:c===12?DC:c===11?iE:void re()})(this.hi);let o;return this.Ri.runTransaction(e,i,s,(a=>(o=new wd(a,this.Qr?this.Qr.next():Zt.oe),t==="readwrite-primary"?this.wi(o).next((c=>!!c||this.Si(o))).next((c=>{if(!c)throw lt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new K(L.FAILED_PRECONDITION,Zv);return r(o)})).next((c=>this.Di(o).next((()=>c)))):this.Ki(o).next((()=>r(o)))))).then((a=>(o.raiseOnCommittedEvent(),a)))}Ki(e){return Yo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new K(L.FAILED_PRECONDITION,Lh)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Yo(e).put("owner",t)}static D(){return zn.D()}bi(e){const t=Yo(e);return t.get("owner").next((r=>this.vi(r)?(z("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):N.resolve()))}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(lt(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;xv()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return z("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return lt("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){lt("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Yo(n){return vt(n,"owner")}function Xc(n){return vt(n,"clientMetadata")}function Gf(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=Ie(),i=Ie();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Kf(e,t.fromCache,r,i)}}/**
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
 */class zD{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class fT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return xv()?8:tE(It())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.Zi(e,t,i,r).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new zD;return this.Xi(e,t,o).next((a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)}))})).next((()=>s.result))}es(e,t,r,i){return r.documentReadCount<this.ji?(Cs()<=we.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",Ds(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),N.resolve()):(Cs()<=we.DEBUG&&z("QueryEngine","Query:",Ds(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Cs()<=we.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",Ds(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,jt(t))):N.resolve())}Yi(e,t){if(l_(t))return N.resolve(null);let r=jt(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=xu(t,null,"F"),r=jt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const o=Ie(...s);return this.Ji.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const l=this.ts(t,a);return this.ns(t,l,o,c.readTime)?this.Yi(e,xu(t,null,"F")):this.rs(e,l,t,c)}))))})))))}Zi(e,t,r,i){return l_(t)||i.isEqual(ae.min())?N.resolve(null):this.Ji.getDocuments(e,r).next((s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?N.resolve(null):(Cs()<=we.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ds(t)),this.rs(e,o,t,Yv(i,-1)).next((a=>a)))}))}ts(e,t){let r=new Le(bE(e));return t.forEach(((i,s)=>{hc(e,s)&&(r=r.add(s))})),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return Cs()<=we.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",Ds(t)),this.Ji.getDocumentsMatchingQuery(e,t,pn.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
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
 */class $D{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new qe(me),this._s=new Rr((s=>es(s)),uc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function pT(n,e,t,r){return new $D(n,e,t,r)}async function mT(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const o=[],a=[];let c=Ie();for(const l of i){o.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}for(const l of s){a.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(r,c).next((l=>({hs:l,removedBatchIds:o,addedBatchIds:a})))}))}))}function HD(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(a,c,l,h){const f=l.batch,m=f.keys();let g=N.resolve();return m.forEach((b=>{g=g.next((()=>h.getEntry(c,b))).next((R=>{const C=l.docVersions.get(b);se(C!==null),R.version.compareTo(C)<0&&(f.applyToRemoteDocument(R,l),R.isValidDocument()&&(R.setReadTime(l.commitVersion),h.addEntry(R)))}))})),g.next((()=>a.mutationQueue.removeMutationBatch(c,f)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let c=Ie();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function gT(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function WD(n,e){const t=J(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach(((h,f)=>{const m=i.get(f);if(!m)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,f).next((()=>t.Ur.addMatchingKeys(s,h.addedDocuments,f))));let g=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?g=g.withResumeToken(tt.EMPTY_BYTE_STRING,ae.min()).withLastLimboFreeSnapshotVersion(ae.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),i=i.insert(f,g),(function(R,C,V){return R.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=3e8?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0})(m,g,h)&&a.push(t.Ur.updateTargetData(s,g))}));let c=tn(),l=Ie();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),a.push(_T(s,o,e.documentUpdates).next((h=>{c=h.Ps,l=h.Is}))),!r.isEqual(ae.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next((f=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r)));a.push(h)}return N.waitFor(a).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,l))).next((()=>c))})).then((s=>(t.os=i,s)))}function _T(n,e,t){let r=Ie(),i=Ie();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let o=tn();return t.forEach(((a,c)=>{const l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(ae.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):z("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)})),{Ps:o,Is:i}}))}function QD(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function eo(n,e){const t=J(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.Ur.getTargetData(r,e).next((s=>s?(i=s,N.resolve(i)):t.Ur.allocateTargetId(r).next((o=>(i=new lr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r}))}async function to(n,e,t){const r=J(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(o=>r.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!_i(o))throw o;z("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function qu(n,e,t){const r=J(n);let i=ae.min(),s=Ie();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,l,h){const f=J(c),m=f._s.get(h);return m!==void 0?N.resolve(f.os.get(m)):f.Ur.getTargetData(l,h)})(r,o,jt(e)).next((a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next((c=>{s=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:ae.min(),t?s:Ie()))).next((a=>(vT(r,AE(e),a),{documents:a,Ts:s})))))}function yT(n,e){const t=J(n),r=J(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",(s=>r.ot(s,e).next((o=>o?o.target:null))))}function IT(n,e){const t=J(n),r=t.us.get(e)||ae.min();return t.persistence.runTransaction("Get new document changes","readonly",(i=>t.cs.getAllFromCollectionGroup(i,e,Yv(r,-1),Number.MAX_SAFE_INTEGER))).then((i=>(vT(t,e,i),i)))}function vT(n,e,t){let r=n.us.get(e)||ae.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.us.set(e,r)}async function JD(n,e,t,r){const i=J(n);let s=Ie(),o=tn();for(const l of t){const h=e.Es(l.metadata.name);l.document&&(s=s.add(h));const f=e.ds(l);f.setReadTime(e.As(l.metadata.readTime)),o=o.insert(h,f)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),c=await eo(i,(function(h){return jt(mo(Ae.fromString(`__bundle__/docs/${h}`)))})(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",(l=>_T(l,a,o).next((h=>(a.apply(l),h))).next((h=>i.Ur.removeMatchingKeysForTargetId(l,c.targetId).next((()=>i.Ur.addMatchingKeys(l,s,c.targetId))).next((()=>i.localDocuments.getLocalViewOfDocuments(l,h.Ps,h.Is))).next((()=>h.Ps))))))}async function YD(n,e,t=Ie()){const r=await eo(n,jt(Mf(e.bundledQuery))),i=J(n);return i.persistence.runTransaction("Save named query","readwrite",(s=>{const o=dt(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(tt.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next((()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId))).next((()=>i.Ur.addMatchingKeys(s,t,r.targetId))).next((()=>i.Gr.saveNamedQuery(s,e)))}))}function U_(n,e){return`firestore_clients_${n}_${e}`}function B_(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Mh(n,e){return`firestore_targets_${n}_${e}`}class ju{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new K(i.error.code,i.error.message))),o?new ju(e,t,i.state,s):(lt("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class wa{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new K(r.error.code,r.error.message))),s?new wa(e,r.state,i):(lt("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Gu{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Cf();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=nE(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Gu(e,s):(lt("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class zf{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new zf(t.clientId,t.onlineState):(lt("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Md{constructor(){this.activeTargetIds=Cf()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Fh{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new qe(me),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=U_(this.persistenceKey,this.ps),this.vs=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Md),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this.Os=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(U_(this.persistenceKey,r));if(i){const s=Gu.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach(((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Mh(this.persistenceKey,e));if(i){const s=wa.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Mh(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach((i=>{this.Qs(i)})),this.currentUser=e,r.forEach((i=>{this.addPendingMutation(i)}))}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return z("SharedClientState","READ",e,t),t}setItem(e,t){z("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){z("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(z("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void lt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=(function(s){let o=Zt.oe;if(s!=null)try{const a=JSON.parse(s);se(typeof a=="number"),o=a}catch(a){lt("SharedClientState","Failed to read sequence number from WebStorage",a)}return o})(t.newValue);r!==Zt.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map((i=>this.syncEngine.eo(i))))}}}else this.bs.push(t)}))}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new ju(this.currentUser,e,t,r),s=B_(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=B_(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=Mh(this.persistenceKey,e),s=new wa(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return Gu.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return ju.Rs(new Tt(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return wa.Rs(i,t)}Ls(e){return zf.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);z("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach((c=>{i.has(c)||o.push(c)})),i.forEach((c=>{s.has(c)||a.push(c)})),this.syncEngine.io(o,a).then((()=>{this.Ss=r}))}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=Cf();return e.forEach(((r,i)=>{t=t.unionWith(i.activeTargetIds)})),t}}class ET{constructor(){this.so=new Md,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Md,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class XD{_o(e){}shutdown(){}}/**
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
 */class q_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){z("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){z("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Zc=null;function Uh(){return Zc===null?Zc=(function(){return 268435456+Math.round(2147483648*Math.random())})():Zc++,"0x"+Zc.toString(16)}/**
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
 */const ZD={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection";class tk extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=Uh(),c=this.xo(t,r.toUriEncodedString());z("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);const l={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(l,s,o),this.No(t,c,l,i).then((h=>(z("RestConnection",`Received RPC '${t}' ${a}: `,h),h)),(h=>{throw fn("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",c,"request:",i),h}))}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+po})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((s,o)=>t[o]=s)),i&&i.headers.forEach(((s,o)=>t[o]=s))}xo(t,r){const i=ZD[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=Uh();return new Promise(((o,a)=>{const c=new jv;c.setWithCredentials(!0),c.listenOnce(Gv.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case uu.NO_ERROR:const h=c.getResponseJson();z(xt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case uu.TIMEOUT:z(xt,`RPC '${e}' ${s} timed out`),a(new K(L.DEADLINE_EXCEEDED,"Request time out"));break;case uu.HTTP_ERROR:const f=c.getStatus();if(z(xt,`RPC '${e}' ${s} failed with status:`,f,"response text:",c.getResponseText()),f>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const g=m==null?void 0:m.error;if(g&&g.status&&g.message){const b=(function(C){const V=C.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(V)>=0?V:L.UNKNOWN})(g.status);a(new K(b,g.message))}else a(new K(L.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new K(L.UNAVAILABLE,"Connection failed."));break;default:re()}}finally{z(xt,`RPC '${e}' ${s} completed.`)}}));const l=JSON.stringify(i);z(xt,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",l,r,15)}))}Bo(e,t,r){const i=Uh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=$v(),a=zv(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=s.join("");z(xt,`Creating RPC '${e}' stream ${i}: ${h}`,c);const f=o.createWebChannel(h,c);let m=!1,g=!1;const b=new ek({Io:C=>{g?z(xt,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(m||(z(xt,`Opening RPC '${e}' stream ${i} transport.`),f.open(),m=!0),z(xt,`RPC '${e}' stream ${i} sending:`,C),f.send(C))},To:()=>f.close()}),R=(C,V,D)=>{C.listen(V,(x=>{try{D(x)}catch(M){setTimeout((()=>{throw M}),0)}}))};return R(f,oa.EventType.OPEN,(()=>{g||(z(xt,`RPC '${e}' stream ${i} transport opened.`),b.yo())})),R(f,oa.EventType.CLOSE,(()=>{g||(g=!0,z(xt,`RPC '${e}' stream ${i} transport closed`),b.So())})),R(f,oa.EventType.ERROR,(C=>{g||(g=!0,fn(xt,`RPC '${e}' stream ${i} transport errored:`,C),b.So(new K(L.UNAVAILABLE,"The operation could not be completed")))})),R(f,oa.EventType.MESSAGE,(C=>{var V;if(!g){const D=C.data[0];se(!!D);const x=D,M=x.error||((V=x[0])===null||V===void 0?void 0:V.error);if(M){z(xt,`RPC '${e}' stream ${i} received error:`,M);const H=M.status;let j=(function(y){const v=pt[y];if(v!==void 0)return UE(v)})(H),E=M.message;j===void 0&&(j=L.INTERNAL,E="Unknown error status: "+H+" with message "+M.message),g=!0,b.So(new K(j,E)),f.close()}else z(xt,`RPC '${e}' stream ${i} received:`,D),b.bo(D)}})),R(a,Kv.STAT_EVENT,(C=>{C.stat===Ed.PROXY?z(xt,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===Ed.NOPROXY&&z(xt,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{b.wo()}),0),b}}/**
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
 */function TT(){return typeof window<"u"?window:null}function gu(){return typeof document<"u"?document:null}/**
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
 */function mc(n){return new uD(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&z("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,t,r,i,s,o,a,c){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new $f(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(lt(t.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.Yo===t&&this.P_(r,i)}),(r=>{e((()=>{const i=new K(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)}))}))}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{r((()=>this.I_(i)))})),this.stream.onMessage((i=>{r((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return z("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(z("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class nk extends wT{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=dD(this.serializer,e),r=(function(s){if(!("targetChange"in s))return ae.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?ae.min():o.readTime?dt(o.readTime):ae.min()})(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Nd(this.serializer),t.addTarget=(function(s,o){let a;const c=o.target;if(a=Vu(c)?{documents:QE(s,c)}:{query:bl(s,c)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=GE(s,o.resumeToken);const l=Dd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(ae.min())>0){a.readTime=Zs(s,o.snapshotVersion.toTimestamp());const l=Dd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}return a})(this.serializer,e);const r=pD(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Nd(this.serializer),t.removeTarget=e,this.a_(t)}}class rk extends wT{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return se(!!e.streamToken),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){se(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=fD(e.writeResults,e.commitTime),r=dt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Nd(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Ha(this.serializer,r)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Mo(e,kd(t,r),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(L.UNKNOWN,s.toString())}))}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Lo(e,kd(t,r),i,o,a,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new K(L.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class sk{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(lt(t),this.D_=!1):z("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((o=>{r.enqueueAndForget((async()=>{Ii(this)&&(z("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const l=J(c);l.L_.add(4),await yo(l),l.q_.set("Unknown"),l.L_.delete(4),await gc(l)})(this))}))})),this.q_=new sk(r,i)}}async function gc(n){if(Ii(n))for(const e of n.B_)await e(!0)}async function yo(n){for(const e of n.B_)await e(!1)}function Cl(n,e){const t=J(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Qf(t)?Wf(t):vo(t).r_()&&Hf(t,e))}function no(n,e){const t=J(n),r=vo(t);t.N_.delete(e),r.r_()&&AT(t,e),t.N_.size===0&&(r.r_()?r.o_():Ii(t)&&t.q_.set("Unknown"))}function Hf(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ae.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vo(n).A_(e)}function AT(n,e){n.Q_.xe(e),vo(n).R_(e)}function Wf(n){n.Q_=new sD({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),vo(n).start(),n.q_.v_()}function Qf(n){return Ii(n)&&!vo(n).n_()&&n.N_.size>0}function Ii(n){return J(n).L_.size===0}function bT(n){n.Q_=void 0}async function ak(n){n.q_.set("Online")}async function ck(n){n.N_.forEach(((e,t)=>{Hf(n,e)}))}async function uk(n,e){bT(n),Qf(n)?(n.q_.M_(e),Wf(n)):n.q_.set("Unknown")}async function lk(n,e,t){if(n.q_.set("Online"),e instanceof jE&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))})(n,e)}catch(r){z("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ku(n,r)}else if(e instanceof mu?n.Q_.Ke(e):e instanceof qE?n.Q_.He(e):n.Q_.We(e),!t.isEqual(ae.min()))try{const r=await gT(n.localStore);t.compareTo(r)>=0&&await(function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach(((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.N_.get(l);h&&s.N_.set(l,h.withResumeToken(c.resumeToken,o))}})),a.targetMismatches.forEach(((c,l)=>{const h=s.N_.get(c);if(!h)return;s.N_.set(c,h.withResumeToken(tt.EMPTY_BYTE_STRING,h.snapshotVersion)),AT(s,c);const f=new lr(h.target,c,l,h.sequenceNumber);Hf(s,f)})),s.remoteSyncer.applyRemoteEvent(a)})(n,t)}catch(r){z("RemoteStore","Failed to raise snapshot:",r),await Ku(n,r)}}async function Ku(n,e,t){if(!_i(e))throw e;n.L_.add(1),await yo(n),n.q_.set("Offline"),t||(t=()=>gT(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{z("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await gc(n)}))}function RT(n,e){return e().catch((t=>Ku(n,t,e)))}async function Io(n){const e=J(n),t=hi(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;hk(e);)try{const i=await QD(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,dk(e,i)}catch(i){await Ku(e,i)}ST(e)&&PT(e)}function hk(n){return Ii(n)&&n.O_.length<10}function dk(n,e){n.O_.push(e);const t=hi(n);t.r_()&&t.V_&&t.m_(e.mutations)}function ST(n){return Ii(n)&&!hi(n).n_()&&n.O_.length>0}function PT(n){hi(n).start()}async function fk(n){hi(n).p_()}async function pk(n){const e=hi(n);for(const t of n.O_)e.m_(t.mutations)}async function mk(n,e,t){const r=n.O_.shift(),i=Vf.from(r,e,t);await RT(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await Io(n)}async function gk(n,e){e&&hi(n).V_&&await(async function(r,i){if((function(o){return FE(o)&&o!==L.ABORTED})(i.code)){const s=r.O_.shift();hi(r).s_(),await RT(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Io(r)}})(n,e),ST(n)&&PT(n)}async function j_(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),z("RemoteStore","RemoteStore received new credentials");const r=Ii(t);t.L_.add(3),await yo(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await gc(t)}async function Fd(n,e){const t=J(n);e?(t.L_.delete(2),await gc(t)):e||(t.L_.add(2),await yo(t),t.q_.set("Unknown"))}function vo(n){return n.K_||(n.K_=(function(t,r,i){const s=J(t);return s.w_(),new nk(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:ak.bind(null,n),Ro:ck.bind(null,n),mo:uk.bind(null,n),d_:lk.bind(null,n)}),n.B_.push((async e=>{e?(n.K_.s_(),Qf(n)?Wf(n):n.q_.set("Unknown")):(await n.K_.stop(),bT(n))}))),n.K_}function hi(n){return n.U_||(n.U_=(function(t,r,i){const s=J(t);return s.w_(),new rk(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:fk.bind(null,n),mo:gk.bind(null,n),f_:pk.bind(null,n),g_:mk.bind(null,n)}),n.B_.push((async e=>{e?(n.U_.s_(),await Io(n)):(await n.U_.stop(),n.O_.length>0&&(z("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))}))),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new Jf(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Eo(n,e){if(lt("AsyncQueue",`${e}: ${n}`),_i(n))return new K(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(t,r)=>Z.comparator(t.key,r.key),this.keyedMap=aa(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new Bs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Bs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Bs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(){this.W_=new qe(Z.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):re():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,r)=>{e.push(r)})),e}}class ro{constructor(e,t,r,i,s,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new ro(e,t,Bs.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&lc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _k{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class yk{constructor(){this.queries=K_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=J(t),s=i.queries;i.queries=K_(),s.forEach(((o,a)=>{for(const c of a.j_)c.onError(r)}))})(this,new K(L.ABORTED,"Firestore shutting down"))}}function K_(){return new Rr((n=>wE(n)),lc)}async function Yf(n,e){const t=J(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new _k,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=Eo(o,`Initialization of query '${Ds(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Zf(t)}async function Xf(n,e){const t=J(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Ik(n,e){const t=J(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&Zf(t)}function vk(n,e,t){const r=J(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function Zf(n){n.Y_.forEach((e=>{e.next()}))}var Ud,z_;(z_=Ud||(Ud={})).ea="default",z_.Cache="cache";class ep{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ro(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=ro.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ud.Cache}}/**
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
 */class Ek{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
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
 */class $_{constructor(e){this.serializer=e}Es(e){return $n(this.serializer,e)}ds(e){return e.metadata.exists?WE(this.serializer,e.document,!1):Ge.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return dt(e)}}class Tk{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=CT(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=Ae.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new $_(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||Ie()).add(s);t.set(o,a)}}return t}async complete(){const e=await JD(this.localStore,new $_(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await YD(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function CT(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.key=e}}class kT{constructor(e){this.key=e}}class NT{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ie(),this.mutatedKeys=Ie(),this.Aa=bE(e),this.Ra=new Bs(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new G_,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((h,f)=>{const m=i.get(h),g=hc(this.query,f)?f:null,b=!!m&&this.mutatedKeys.has(m.key),R=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let C=!1;m&&g?m.data.isEqual(g.data)?b!==R&&(r.track({type:3,doc:g}),C=!0):this.ga(m,g)||(r.track({type:2,doc:g}),C=!0,(c&&this.Aa(g,c)>0||l&&this.Aa(g,l)<0)&&(a=!0)):!m&&g?(r.track({type:0,doc:g}),C=!0):m&&!g&&(r.track({type:1,doc:m}),C=!0,(c||l)&&(a=!0)),C&&(g?(o=o.add(g),s=R?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((h,f)=>(function(g,b){const R=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re()}};return R(g)-R(b)})(h.type,f.type)||this.Aa(h.doc,f.doc))),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,l=c!==this.Ea;return this.Ea=c,o.length!==0||l?{snapshot:new ro(this.query,e.Ra,s,o,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new G_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ie(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const t=[];return e.forEach((r=>{this.da.has(r)||t.push(new kT(r))})),this.da.forEach((r=>{e.has(r)||t.push(new DT(r))})),t}ba(e){this.Ta=e.Ts,this.da=Ie();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return ro.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class wk{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Ak{constructor(e){this.key=e,this.va=!1}}class bk{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Rr((a=>wE(a)),lc),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(Z.comparator),this.Na=new Map,this.La=new Bf,this.Ba={},this.ka=new Map,this.qa=ss.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Rk(n,e,t=!0){const r=Dl(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await VT(r,e,t,!0),i}async function Sk(n,e){const t=Dl(n);await VT(t,e,!0,!1)}async function VT(n,e,t,r){const i=await eo(n.localStore,jt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await tp(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Cl(n.remoteStore,i),a}async function tp(n,e,t,r,i){n.Ka=(f,m,g)=>(async function(R,C,V,D){let x=C.view.ma(V);x.ns&&(x=await qu(R.localStore,C.query,!1).then((({documents:E})=>C.view.ma(E,x))));const M=D&&D.targetChanges.get(C.targetId),H=D&&D.targetMismatches.get(C.targetId)!=null,j=C.view.applyChanges(x,R.isPrimaryClient,M,H);return Bd(R,C.targetId,j.wa),j.snapshot})(n,f,m,g);const s=await qu(n.localStore,e,!0),o=new NT(e,s.Ts),a=o.ma(s.documents),c=pc.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(a,n.isPrimaryClient,c);Bd(n,t,l.wa);const h=new wk(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),l.snapshot}async function Pk(n,e,t){const r=J(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter((o=>!lc(o,e)))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await to(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&no(r.remoteStore,i.targetId),io(r,i.targetId)})).catch(gi)):(io(r,i.targetId),await to(r.localStore,i.targetId,!0))}async function Ck(n,e){const t=J(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),no(t.remoteStore,r.targetId))}async function Dk(n,e,t){const r=sp(n);try{const i=await(function(o,a){const c=J(o),l=Je.now(),h=a.reduce(((g,b)=>g.add(b.key)),Ie());let f,m;return c.persistence.runTransaction("Locally write mutations","readwrite",(g=>{let b=tn(),R=Ie();return c.cs.getEntries(g,h).next((C=>{b=C,b.forEach(((V,D)=>{D.isValidDocument()||(R=R.add(V))}))})).next((()=>c.localDocuments.getOverlayedDocuments(g,b))).next((C=>{f=C;const V=[];for(const D of a){const x=nD(D,f.get(D.key).overlayedDocument);x!=null&&V.push(new Sr(D.key,x,dE(x.value.mapValue),Qe.exists(!0)))}return c.mutationQueue.addMutationBatch(g,l,V,a)})).next((C=>{m=C;const V=C.applyToLocalDocumentSet(f,R);return c.documentOverlayCache.saveOverlays(g,C.batchId,V)}))})).then((()=>({batchId:m.batchId,changes:SE(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(o,a,c){let l=o.Ba[o.currentUser.toKey()];l||(l=new qe(me)),l=l.insert(a,c),o.Ba[o.currentUser.toKey()]=l})(r,i.batchId,t),await Pr(r,i.changes),await Io(r.remoteStore)}catch(i){const s=Eo(i,"Failed to persist write");t.reject(s)}}async function OT(n,e){const t=J(n);try{const r=await WD(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Na.get(s);o&&(se(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?se(o.va):i.removedDocuments.size>0&&(se(o.va),o.va=!1))})),await Pr(t,r,e)}catch(r){await gi(r)}}function H_(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach(((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)})),(function(o,a){const c=J(o);c.onlineState=a;let l=!1;c.queries.forEach(((h,f)=>{for(const m of f.j_)m.Z_(a)&&(l=!0)})),l&&Zf(c)})(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function kk(n,e,t){const r=J(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new qe(Z.comparator);o=o.insert(s,Ge.newNoDocument(s,ae.min()));const a=Ie().add(s),c=new fc(ae.min(),new Map,new qe(me),o,a);await OT(r,c),r.Oa=r.Oa.remove(s),r.Na.delete(e),ip(r)}else await to(r.localStore,e,!1).then((()=>io(r,e,t))).catch(gi)}async function Nk(n,e){const t=J(n),r=e.batch.batchId;try{const i=await HD(t.localStore,e);rp(t,r,null),np(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Pr(t,i)}catch(i){await gi(i)}}async function Vk(n,e,t){const r=J(n);try{const i=await(function(o,a){const c=J(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let h;return c.mutationQueue.lookupMutationBatch(l,a).next((f=>(se(f!==null),h=f.keys(),c.mutationQueue.removeMutationBatch(l,f)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h))).next((()=>c.localDocuments.getDocuments(l,h)))}))})(r.localStore,e);rp(r,e,t),np(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Pr(r,i)}catch(i){await gi(i)}}async function Ok(n,e){const t=J(n);Ii(t.remoteStore)||z("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const a=J(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>a.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=Eo(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function np(n,e){(n.ka.get(e)||[]).forEach((t=>{t.resolve()})),n.ka.delete(e)}function rp(n,e,t){const r=J(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function io(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach((r=>{n.La.containsKey(r)||xT(n,r)}))}function xT(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(no(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),ip(n))}function Bd(n,e,t){for(const r of t)r instanceof DT?(n.La.addReference(r.key,e),xk(n,r)):r instanceof kT?(z("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||xT(n,r.key)):re()}function xk(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(z("SyncEngine","New document in limbo: "+t),n.xa.add(r),ip(n))}function ip(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new Z(Ae.fromString(e)),r=n.qa.next();n.Na.set(r,new Ak(t)),n.Oa=n.Oa.insert(t,r),Cl(n.remoteStore,new lr(jt(mo(t.path)),r,"TargetPurposeLimboResolution",Zt.oe))}}async function Pr(n,e,t){const r=J(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach(((a,c)=>{o.push(r.Ka(c,e,t).then((l=>{var h;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(h=t==null?void 0:t.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){i.push(l);const f=Kf.Wi(c.targetId,l);s.push(f)}})))})),await Promise.all(o),r.Ca.d_(i),await(async function(c,l){const h=J(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>N.forEach(l,(m=>N.forEach(m.$i,(g=>h.persistence.referenceDelegate.addReference(f,m.targetId,g))).next((()=>N.forEach(m.Ui,(g=>h.persistence.referenceDelegate.removeReference(f,m.targetId,g)))))))))}catch(f){if(!_i(f))throw f;z("LocalStore","Failed to update sequence numbers: "+f)}for(const f of l){const m=f.targetId;if(!f.fromCache){const g=h.os.get(m),b=g.snapshotVersion,R=g.withLastLimboFreeSnapshotVersion(b);h.os=h.os.insert(m,R)}}})(r.localStore,s))}async function Lk(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){z("SyncEngine","User change. New user:",e.toKey());const r=await mT(t.localStore,e);t.currentUser=e,(function(s,o){s.ka.forEach((a=>{a.forEach((c=>{c.reject(new K(L.CANCELLED,o))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Pr(t,r.hs)}}function Mk(n,e){const t=J(n),r=t.Na.get(e);if(r&&r.va)return Ie().add(r.key);{let i=Ie();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function Fk(n,e){const t=J(n),r=await qu(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&Bd(t,e.targetId,i.wa),i}async function Uk(n,e){const t=J(n);return IT(t.localStore,e).then((r=>Pr(t,r)))}async function Bk(n,e,t,r){const i=J(n),s=await(function(a,c){const l=J(a),h=J(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(f=>h.Mn(f,c).next((m=>m?l.localDocuments.getDocuments(f,m):N.resolve(null)))))})(i.localStore,e);s!==null?(t==="pending"?await Io(i.remoteStore):t==="acknowledged"||t==="rejected"?(rp(i,e,r||null),np(i,e),(function(a,c){J(J(a).mutationQueue).On(c)})(i.localStore,e)):re(),await Pr(i,s)):z("SyncEngine","Cannot apply mutation batch with id: "+e)}async function qk(n,e){const t=J(n);if(Dl(t),sp(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await W_(t,r.toArray());t.Qa=!0,await Fd(t.remoteStore,!0);for(const s of i)Cl(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach(((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then((()=>(io(t,o),to(t.localStore,o,!0)))),no(t.remoteStore,o)})),await i,await W_(t,r),(function(o){const a=J(o);a.Na.forEach(((c,l)=>{no(a.remoteStore,l)})),a.La.pr(),a.Na=new Map,a.Oa=new qe(Z.comparator)})(t),t.Qa=!1,await Fd(t.remoteStore,!1)}}async function W_(n,e,t){const r=J(n),i=[],s=[];for(const o of e){let a;const c=r.Ma.get(o);if(c&&c.length!==0){a=await eo(r.localStore,jt(c[0]));for(const l of c){const h=r.Fa.get(l),f=await Fk(r,h);f.snapshot&&s.push(f.snapshot)}}else{const l=await yT(r.localStore,o);a=await eo(r.localStore,l),await tp(r,LT(l),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function LT(n){return vE(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function jk(n){return(function(t){return J(J(t).persistence).Qi()})(J(n).localStore)}async function Gk(n,e,t,r){const i=J(n);if(i.Qa)return void z("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await IT(i.localStore,AE(s[0])),a=fc.createSynthesizedRemoteEventForCurrentChange(e,t==="current",tt.EMPTY_BYTE_STRING);await Pr(i,o,a);break}case"rejected":await to(i.localStore,e,!0),io(i,e,r);break;default:re()}}async function Kk(n,e,t){const r=Dl(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){z("SyncEngine","Adding an already active target "+i);continue}const s=await yT(r.localStore,i),o=await eo(r.localStore,s);await tp(r,LT(s),o.targetId,!1,o.resumeToken),Cl(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await to(r.localStore,i,!1).then((()=>{no(r.remoteStore,i),io(r,i)})).catch(gi)}}function Dl(n){const e=J(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=OT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Mk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kk.bind(null,e),e.Ca.d_=Ik.bind(null,e.eventManager),e.Ca.$a=vk.bind(null,e.eventManager),e}function sp(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Nk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Vk.bind(null,e),e}function zk(n,e,t){const r=J(n);(async function(s,o,a){try{const c=await o.getMetadata();if(await(function(g,b){const R=J(g),C=dt(b.createTime);return R.persistence.runTransaction("hasNewerBundle","readonly",(V=>R.Gr.getBundleMetadata(V,b.id))).then((V=>!!V&&V.createTime.compareTo(C)>=0))})(s.localStore,c))return await o.close(),a._completeWith((function(g){return{taskState:"Success",documentsLoaded:g.totalDocuments,bytesLoaded:g.totalBytes,totalDocuments:g.totalDocuments,totalBytes:g.totalBytes}})(c)),Promise.resolve(new Set);a._updateProgress(CT(c));const l=new Tk(c,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const m=await l.la(h);m&&a._updateProgress(m),h=await o.Ua()}const f=await l.complete();return await Pr(s,f.Ia,void 0),await(function(g,b){const R=J(g);return R.persistence.runTransaction("Save bundle","readwrite",(C=>R.Gr.saveBundleMetadata(C,b)))})(s.localStore,c),a._completeWith(f.progress),Promise.resolve(f.Pa)}catch(c){return fn("SyncEngine",`Loading bundle failed with ${c}`),a._failWith(c),Promise.resolve(new Set)}})(r,e,t).then((i=>{r.sharedClientState.notifyBundleLoaded(i)}))}class di{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return pT(this.persistence,new fT,e.initialUser,this.serializer)}Ga(e){return new qf(Pl.Zr,this.serializer)}Wa(e){return new ET}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}di.provider={build:()=>new di};class $k extends di{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){se(this.persistence.referenceDelegate instanceof Bu);const r=this.persistence.referenceDelegate.garbageCollector;return new cT(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?Lt.withCacheSize(this.cacheSizeBytes):Lt.DEFAULT;return new qf((r=>Bu.Zr(r,t)),this.serializer)}}class op extends di{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await sp(this.Ja.syncEngine),await Io(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return pT(this.persistence,new fT,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new cT(r,e.asyncQueue,t)}Ha(e,t){const r=new fC(t,this.persistence);return new dC(e.asyncQueue,r)}Ga(e){const t=Gf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Lt.withCacheSize(this.cacheSizeBytes):Lt.DEFAULT;return new jf(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,TT(),gu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new ET}}class MT extends op{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Fh&&(this.sharedClientState.syncEngine={no:Bk.bind(null,t),ro:Gk.bind(null,t),io:Kk.bind(null,t),Qi:jk.bind(null,t),eo:Uk.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi((async r=>{await qk(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Wa(e){const t=TT();if(!Fh.D(t))throw new K(L.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Gf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Fh(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class fi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>H_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Lk.bind(null,this.syncEngine),await Fd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new yk})()}createDatastore(e){const t=mc(e.databaseInfo.databaseId),r=(function(s){return new tk(s)})(e.databaseInfo);return(function(s,o,a,c){return new ik(s,o,a,c)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,o,a){return new ok(r,i,s,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>H_(this.syncEngine,t,0)),(function(){return q_.D()?new q_:new XD})())}createSyncEngine(e,t){return(function(i,s,o,a,c,l,h){const f=new bk(i,s,o,a,c,l);return h&&(f.Qa=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=J(i);z("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await yo(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}fi.provider={build:()=>new fi};function Q_(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class kl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):lt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */class Hk{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new wt,this.buffer=new Uint8Array,this.eu=(function(){return new TextDecoder("utf-8")})(),this.tu().then((r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new Ek(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex((e=>e===123))}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new K(L.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=J(i),a={documents:s.map((f=>$a(o.serializer,f)))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Ae.emptyPath(),a,s.length),l=new Map;c.forEach((f=>{const m=hD(o.serializer,f);l.set(m.key.toString(),m)}));const h=[];return s.forEach((f=>{const m=l.get(f.toString());se(!!m),h.push(m)})),h})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new _o(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const i=Z.fromPath(r);this.mutations.push(new kf(i,this.precondition(i)))})),await(async function(r,i){const s=J(r),o={writes:i.map((a=>Ha(s.serializer,a)))};await s.Mo("Commit",s.serializer.databaseId,Ae.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw re();t=ae.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new K(L.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ae.min())?Qe.exists(!1):Qe.updateTime(t):Qe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ae.min()))throw new K(L.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Qe.updateTime(t)}return Qe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class Qk{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new $f(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const e=new Wk(this.datastore),t=this.cu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((i=>{this.lu(i)}))))})).catch((r=>{this.lu(r)}))}))}cu(e){try{const t=this.updateFunction(e);return!cc(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!FE(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jk{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Tt.UNAUTHENTICATED,this.clientId=wf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async o=>{z("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(z("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Eo(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Bh(n,e){n.asyncQueue.verifyOperationInProgress(),z("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await mT(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function J_(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ap(n);z("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>j_(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>j_(e.remoteStore,i))),n._onlineComponents=e}async function ap(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){z("FirestoreClient","Using user provided OfflineComponentProvider");try{await Bh(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;fn("Error using user provided cache. Falling back to memory cache: "+t),await Bh(n,new di)}}else z("FirestoreClient","Using default OfflineComponentProvider"),await Bh(n,new di);return n._offlineComponents}async function Nl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(z("FirestoreClient","Using user provided OnlineComponentProvider"),await J_(n,n._uninitializedComponentsProvider._online)):(z("FirestoreClient","Using default OnlineComponentProvider"),await J_(n,new fi))),n._onlineComponents}function FT(n){return ap(n).then((e=>e.persistence))}function To(n){return ap(n).then((e=>e.localStore))}function UT(n){return Nl(n).then((e=>e.remoteStore))}function cp(n){return Nl(n).then((e=>e.syncEngine))}function BT(n){return Nl(n).then((e=>e.datastore))}async function so(n){const e=await Nl(n),t=e.eventManager;return t.onListen=Rk.bind(null,e.syncEngine),t.onUnlisten=Pk.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Sk.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Ck.bind(null,e.syncEngine),t}function Yk(n){return n.asyncQueue.enqueue((async()=>{const e=await FT(n),t=await UT(n);return e.setNetworkEnabled(!0),(function(i){const s=J(i);return s.L_.delete(0),gc(s)})(t)}))}function Xk(n){return n.asyncQueue.enqueue((async()=>{const e=await FT(n),t=await UT(n);return e.setNetworkEnabled(!1),(async function(i){const s=J(i);s.L_.add(0),await yo(s),s.q_.set("Offline")})(t)}))}function Zk(n,e){const t=new wt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await(function(l,h){const f=J(l);return f.persistence.runTransaction("read document","readonly",(m=>f.localDocuments.getDocument(m,h)))})(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new K(L.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const c=Eo(a,`Failed to get document '${s} from cache`);o.reject(c)}})(await To(n),e,t))),t.promise}function qT(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new kl({next:m=>{h.Za(),o.enqueueAndForget((()=>Xf(s,f)));const g=m.docs.has(a);!g&&m.fromCache?l.reject(new K(L.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&m.fromCache&&c&&c.source==="server"?l.reject(new K(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new ep(mo(a.path),h,{includeMetadataChanges:!0,_a:!0});return Yf(s,f)})(await so(n),n.asyncQueue,e,t,r))),r.promise}function eN(n,e){const t=new wt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await qu(i,s,!0),c=new NT(s,a.Ts),l=c.ma(a.documents),h=c.applyChanges(l,!1);o.resolve(h.snapshot)}catch(a){const c=Eo(a,`Failed to execute query '${s} against cache`);o.reject(c)}})(await To(n),e,t))),t.promise}function jT(n,e,t={}){const r=new wt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new kl({next:m=>{h.Za(),o.enqueueAndForget((()=>Xf(s,f))),m.fromCache&&c.source==="server"?l.reject(new K(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new ep(a,h,{includeMetadataChanges:!0,_a:!0});return Yf(s,f)})(await so(n),n.asyncQueue,e,t,r))),r.promise}function tN(n,e,t){const r=new wt;return n.asyncQueue.enqueueAndForget((async()=>{try{const i=await BT(n);r.resolve((async function(o,a,c){var l;const h=J(o),{request:f,ut:m,parent:g}=JE(h.serializer,EE(a),c);h.connection.Fo||delete f.parent;const b=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,g,f,1)).filter((C=>!!C.result));se(b.length===1);const R=(l=b[0].result)===null||l===void 0?void 0:l.aggregateFields;return Object.keys(R).reduce(((C,V)=>(C[m[V]]=R[V],C)),{})})(i,e,t))}catch(i){r.reject(i)}})),r.promise}function nN(n,e){const t=new kl(e);return n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.add(s),s.next()})(await so(n),t))),()=>{t.Za(),n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.delete(s)})(await so(n),t)))}}function rN(n,e,t,r){const i=(function(o,a){let c;return c=typeof o=="string"?BE().encode(o):o,(function(h,f){return new Hk(h,f)})((function(h,f){if(h instanceof Uint8Array)return Q_(h,f);if(h instanceof ArrayBuffer)return Q_(new Uint8Array(h),f);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),a)})(t,mc(e));n.asyncQueue.enqueueAndForget((async()=>{zk(await cp(n),i,r)}))}function iN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){const s=J(r);return s.persistence.runTransaction("Get named query","readonly",(o=>s.Gr.getNamedQuery(o,i)))})(await To(n),e)))}function sN(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,i){const s=J(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",(c=>o.getFieldIndexes(c).next((l=>(function(f,m,g,b,R){f=[...f],m=[...m],f.sort(g),m.sort(g);const C=f.length,V=m.length;let D=0,x=0;for(;D<V&&x<C;){const M=g(f[x],m[D]);M<0?R(f[x++]):M>0?b(m[D++]):(D++,x++)}for(;D<V;)b(m[D++]);for(;x<C;)R(f[x++])})(l,i,cC,(h=>{a.push(o.addFieldIndex(c,h))}),(h=>{a.push(o.deleteFieldIndex(c,h))})))).next((()=>N.waitFor(a)))))})(await To(n),e)))}function oN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){J(r).ss.zi=i})(await To(n),e)))}function aN(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=J(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(s=>i.deleteAllFieldIndexes(s)))})(await To(n))))}/**
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
 */function GT(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Y_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(n,e,t){if(!t)throw new K(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function KT(n,e,t,r){if(e===!0&&r===!0)throw new K(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function X_(n){if(!Z.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Z_(n){if(Z.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Vl(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":re()}function Ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Vl(n);throw new K(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function zT(n,e){if(e<=0)throw new K(L.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */class ey{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}KT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=GT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _c{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ey({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ey(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Wv;switch(r.type){case"firstParty":return new rC(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Y_.get(t);r&&(z("ComponentProvider","Removing Datastore"),Y_.delete(t),r.terminate())})(this),Promise.resolve()}}function $T(n,e,t,r={}){var i;const s=(n=Ee(n,_c))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&fn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=Tt.MOCK_USER;else{a=Ov(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new K(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Tt(l)}n._authCredentials=new eC(new Hv(a,c))}}/**
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
 */class bt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new bt(this.firestore,e,this._query)}}class st{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new st(this.firestore,e,this._key)}}class Rn extends bt{constructor(e,t,r){super(e,t,mo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new st(this.firestore,null,new Z(e))}withConverter(e){return new Rn(this.firestore,e,this._path)}}function os(n,e,...t){if(n=oe(n),up("collection","path",e),n instanceof _c){const r=Ae.fromString(e,...t);return Z_(r),new Rn(n,null,r)}{if(!(n instanceof st||n instanceof Rn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return Z_(r),new Rn(n.firestore,null,r)}}function cN(n,e){if(n=Ee(n,_c),up("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new K(L.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new bt(n,null,(function(r){return new br(Ae.emptyPath(),r)})(e))}function Sn(n,e,...t){if(n=oe(n),arguments.length===1&&(e=wf.newId()),up("doc","path",e),n instanceof _c){const r=Ae.fromString(e,...t);return X_(r),new st(n,null,new Z(r))}{if(!(n instanceof st||n instanceof Rn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return X_(r),new st(n.firestore,n instanceof Rn?n.converter:null,new Z(r))}}function uN(n,e){return n=oe(n),e=oe(e),(n instanceof st||n instanceof Rn)&&(e instanceof st||e instanceof Rn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function lp(n,e){return n=oe(n),e=oe(e),n instanceof bt&&e instanceof bt&&n.firestore===e.firestore&&lc(n._query,e._query)&&n.converter===e.converter}/**
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
 */class ty{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $f(this,"async_queue_retry"),this.Vu=()=>{const r=gu();r&&z("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=gu();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=gu();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new wt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!_i(e))throw e;z("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const i=(function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a})(r);throw lt("INTERNAL UNHANDLED ERROR: ",i),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Jf.createAndSchedule(this,e,t,r,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&re()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function qd(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}class HT{constructor(){this._progressObserver={},this._taskCompletionResolver=new wt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const lN=-1;class Me extends _c{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ty,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ty(e),this._firestoreClient=void 0,await e}}}function hN(n,e,t){t||(t="(default)");const r=fo(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(ii(s,e))return i;throw new K(L.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new K(L.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function WT(n,e){const t=typeof n=="object"?n:yl(),r=typeof n=="string"?n:e||"(default)",i=fo(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=kv("firestore");s&&$T(i,...s)}return i}function Ye(n){if(n._terminated)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||QT(n),n._firestoreClient}function QT(n){var e,t,r;const i=n._freezeSettings(),s=(function(a,c,l,h){return new xC(a,c,l,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,GT(h.experimentalLongPollingOptions),h.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Jk(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&(function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}})(n._componentsProvider))}function dN(n,e){fn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return JT(n,fi.provider,{build:r=>new op(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function fN(n){fn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();JT(n,fi.provider,{build:t=>new MT(t,e.cacheSizeBytes)})}function JT(n,e,t){if((n=Ee(n,Me))._firestoreClient||n._terminated)throw new K(L.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new K(L.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},QT(n)}function pN(n){if(n._initialized&&!n._terminated)throw new K(L.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new wt;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!zn.D())return Promise.resolve();const i=r+"main";await zn.delete(i)})(Gf(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function mN(n){return(function(t){const r=new wt;return t.asyncQueue.enqueueAndForget((async()=>Ok(await cp(t),r))),r.promise})(Ye(n=Ee(n,Me)))}function gN(n){return Yk(Ye(n=Ee(n,Me)))}function _N(n){return Xk(Ye(n=Ee(n,Me)))}function yN(n){return B0(n.app,"firestore",n._databaseId.database),n._delete()}function IN(n,e){const t=Ye(n=Ee(n,Me)),r=new HT;return rN(t,n._databaseId,e,r),r}function vN(n,e){return iN(Ye(n=Ee(n,Me)),e).then((t=>t?new bt(n,null,t.query):null))}/**
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
 */class oo{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class YT{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class pi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new pi(tt.fromBase64String(e))}catch(t){throw new K(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new pi(tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class vi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function EN(){return new vi("__name__")}/**
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
 */class Ei{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return me(this._lat,e._lat)||me(this._long,e._long)}}/**
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
 */class yc{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TN=/^__.*__$/;class wN{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Sr(e,this.data,this.fieldMask,t,this.fieldTransforms):new go(e,this.data,t,this.fieldTransforms)}}class XT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Sr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ZT(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re()}}class xl{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new xl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return zu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(ZT(this.Cu)&&TN.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class AN{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||mc(e)}Qu(e,t,r,i=!1){return new xl({Cu:e,methodName:t,qu:r,path:Ke.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function hs(n){const e=n._freezeSettings(),t=mc(n._databaseId);return new AN(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ll(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);_p("Data must be an object, but it was:",o,r);const a=nw(r,o);let c,l;if(s.merge)c=new en(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const f of s.mergeFields){const m=Wa(e,f,t);if(!o.contains(m))throw new K(L.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);iw(h,m)||h.push(m)}c=new en(h),l=o.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,l=o.fieldTransforms;return new wN(new Dt(a),c,l)}class Ic extends Ei{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ic}}function ew(n,e,t){return new xl({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class hp extends Ei{_toFieldTransform(e){return new dc(e.path,new Ys)}isEqual(e){return e instanceof hp}}class dp extends Ei{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=ew(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new ts(r);return new dc(e.path,i)}isEqual(e){return e instanceof dp&&ii(this.Ku,e.Ku)}}class fp extends Ei{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=ew(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new ns(r);return new dc(e.path,i)}isEqual(e){return e instanceof fp&&ii(this.Ku,e.Ku)}}class pp extends Ei{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Xs(e.serializer,DE(e.serializer,this.$u));return new dc(e.path,t)}isEqual(e){return e instanceof pp&&this.$u===e.$u}}function mp(n,e,t,r){const i=n.Qu(1,e,t);_p("Data must be an object, but it was:",i,r);const s=[],o=Dt.empty();yi(r,((c,l)=>{const h=Ml(e,c,t);l=oe(l);const f=i.Nu(h);if(l instanceof Ic)s.push(h);else{const m=ds(l,f);m!=null&&(s.push(h),o.set(h,m))}}));const a=new en(s);return new XT(o,a,i.fieldTransforms)}function gp(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[Wa(e,r,t)],c=[i];if(s.length%2!=0)throw new K(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)a.push(Wa(e,s[m])),c.push(s[m+1]);const l=[],h=Dt.empty();for(let m=a.length-1;m>=0;--m)if(!iw(l,a[m])){const g=a[m];let b=c[m];b=oe(b);const R=o.Nu(g);if(b instanceof Ic)l.push(g);else{const C=ds(b,R);C!=null&&(l.push(g),h.set(g,C))}}const f=new en(l);return new XT(h,f,o.fieldTransforms)}function tw(n,e,t,r=!1){return ds(t,n.Qu(r?4:3,e))}function ds(n,e){if(rw(n=oe(n)))return _p("Unsupported field value:",e,n),nw(n,e);if(n instanceof Ei)return(function(r,i){if(!ZT(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(r,i){const s=[];let o=0;for(const a of r){let c=ds(a,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=oe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return DE(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Je.fromDate(r);return{timestampValue:Zs(i.serializer,s)}}if(r instanceof Je){const s=new Je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zs(i.serializer,s)}}if(r instanceof Ol)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof pi)return{bytesValue:GE(i.serializer,r._byteString)};if(r instanceof st){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Lf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof yc)return(function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((c=>{if(typeof c!="number")throw a.Bu("VectorValues must only contain numeric values.");return Df(a.serializer,c)}))}}}}}})(r,i);throw i.Bu(`Unsupported field value: ${Vl(r)}`)})(n,e)}function nw(n,e){const t={};return cE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):yi(n,((r,i)=>{const s=ds(i,e.Mu(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function rw(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Je||n instanceof Ol||n instanceof pi||n instanceof st||n instanceof Ei||n instanceof yc)}function _p(n,e,t){if(!rw(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const r=Vl(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Wa(n,e,t){if((e=oe(e))instanceof vi)return e._internalPath;if(typeof e=="string")return Ml(n,e);throw zu("Field path arguments must be of type string or ",n,!1,void 0,t)}const bN=new RegExp("[~\\*/\\[\\]]");function Ml(n,e,t){if(e.search(bN)>=0)throw zu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vi(...e.split("."))._internalPath}catch{throw zu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function zu(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new K(L.INVALID_ARGUMENT,a+n+c)}function iw(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class Qa{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new RN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Fl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class RN extends Qa{data(){return super.data()}}function Fl(n,e){return typeof e=="string"?Ml(n,e):e instanceof vi?e._internalPath:e._delegate._internalPath}/**
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
 */function sw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class yp{}class wo extends yp{}function On(n,e,...t){let r=[];e instanceof yp&&r.push(e),r=r.concat(t),(function(s){const o=s.filter((c=>c instanceof fs)).length,a=s.filter((c=>c instanceof Ao)).length;if(o>1||o>0&&a>0)throw new K(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Ao extends wo{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ao(e,t,r)}_apply(e){const t=this._parse(e);return aw(e._query,t),new bt(e.firestore,e.converter,Cd(e._query,t))}_parse(e){const t=hs(e.firestore);return(function(s,o,a,c,l,h,f){let m;if(l.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new K(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){ry(f,h);const g=[];for(const b of f)g.push(ny(c,s,b));m={arrayValue:{values:g}}}else m=ny(c,s,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||ry(f,h),m=tw(a,o,f,h==="in"||h==="not-in");return be.create(l,h,m)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Hr(n,e,t){const r=e,i=Fl("where",n);return Ao._create(i,r,t)}class fs extends yp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fs(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const a=s.getFlattenedFilters();for(const c of a)aw(o,c),o=Cd(o,c)})(e._query,t),new bt(e.firestore,e.converter,Cd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function SN(...n){return n.forEach((e=>cw("or",e))),fs._create("or",n)}function PN(...n){return n.forEach((e=>cw("and",e))),fs._create("and",n)}class Ul extends wo{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ul(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new za(s,o)})(e._query,this._field,this._direction);return new bt(e.firestore,e.converter,(function(i,s){const o=i.explicitOrderBy.concat([s]);return new br(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,t))}}function Ip(n,e="asc"){const t=e,r=Fl("orderBy",n);return Ul._create(r,t)}class vc extends wo{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new vc(e,t,r)}_apply(e){return new bt(e.firestore,e.converter,xu(e._query,this._limit,this._limitType))}}function ji(n){return zT("limit",n),vc._create("limit",n,"F")}function CN(n){return zT("limitToLast",n),vc._create("limitToLast",n,"L")}class Ec extends wo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=ow(e,this.type,this._docOrFields,this._inclusive);return new bt(e.firestore,e.converter,(function(i,s){return new br(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)})(e._query,t))}}function DN(...n){return Ec._create("startAt",n,!0)}function kN(...n){return Ec._create("startAfter",n,!1)}class Tc extends wo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=ow(e,this.type,this._docOrFields,this._inclusive);return new bt(e.firestore,e.converter,(function(i,s){return new br(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)})(e._query,t))}}function NN(...n){return Tc._create("endBefore",n,!1)}function VN(...n){return Tc._create("endAt",n,!0)}function ow(n,e,t,r){if(t[0]=oe(t[0]),t[0]instanceof Qa)return(function(s,o,a,c,l){if(!c)throw new K(L.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const f of Us(s))if(f.field.isKeyField())h.push(Zi(o,c.key));else{const m=c.data.field(f.field);if(vl(m))throw new K(L.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const g=f.field.canonicalString();throw new K(L.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${g}' (used as the orderBy) does not exist.`)}h.push(m)}return new li(h,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=hs(n.firestore);return(function(o,a,c,l,h,f){const m=o.explicitOrderBy;if(h.length>m.length)throw new K(L.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const g=[];for(let b=0;b<h.length;b++){const R=h[b];if(m[b].field.isKeyField()){if(typeof R!="string")throw new K(L.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof R}`);if(!Pf(o)&&R.indexOf("/")!==-1)throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${R}' contains a slash.`);const C=o.path.child(Ae.fromString(R));if(!Z.isDocumentKey(C))throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const V=new Z(C);g.push(Zi(a,V))}else{const C=tw(c,l,R);g.push(C)}}return new li(g,f)})(n._query,n.firestore._databaseId,i,e,t,r)}}function ny(n,e,t){if(typeof(t=oe(t))=="string"){if(t==="")throw new K(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Pf(e)&&t.indexOf("/")!==-1)throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ae.fromString(t));if(!Z.isDocumentKey(r))throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zi(n,new Z(r))}if(t instanceof st)return Zi(n,t._key);throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Vl(t)}.`)}function ry(n,e){if(!Array.isArray(n)||n.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function aw(n,e){const t=(function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function cw(n,e){if(!(e instanceof Ao||e instanceof fs))throw new K(L.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class vp{convertValue(e,t="none"){switch(ci(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Er(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw re()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return yi(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map((o=>We(o.doubleValue)));return new yc(s)}convertGeoPoint(e){return new Ol(We(e.latitude),We(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=El(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ja(e));default:return null}}convertTimestamp(e){const t=vr(e);return new Je(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ae.fromString(e);se(eT(r));const i=new ai(r.get(1),r.get(3)),s=new Z(r.popFirst(5));return i.isEqual(t)||lt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Bl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class ON extends vp{constructor(e){super(),this.firestore=e}convertBytes(e){return new pi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}/**
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
 */function xN(n){return new oo("sum",Wa("sum",n))}function LN(n){return new oo("avg",Wa("average",n))}function uw(){return new oo("count")}function MN(n,e){var t,r;return n instanceof oo&&e instanceof oo&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function FN(n,e){return lp(n.query,e.query)&&ii(n.data(),e.data())}/**
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
 */class Yr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class as extends Qa{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Aa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Fl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Aa extends as{data(e={}){return super.data(e)}}class cs{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Yr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Aa(this._firestore,this._userDataWriter,r.key,r,new Yr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((a=>{const c=new Aa(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Yr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((a=>s||a.type!==3)).map((a=>{const c=new Aa(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Yr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,h=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:UN(a.type),doc:c,oldIndex:l,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function UN(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re()}}function BN(n,e){return n instanceof as&&e instanceof as?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof cs&&e instanceof cs&&n._firestore===e._firestore&&lp(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */function Ja(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return qT(Ye(e),n._key).then((t=>wp(e,n,t)))}class Ti extends vp{constructor(e){super(),this.firestore=e}convertBytes(e){return new pi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}function qN(n){n=Ee(n,st);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ti(e);return Zk(t,n._key).then((i=>new as(e,r,n._key,i,new Yr(i!==null&&i.hasLocalMutations,!0),n.converter)))}function jN(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return qT(Ye(e),n._key,{source:"server"}).then((t=>wp(e,n,t)))}function nr(n){n=Ee(n,bt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ti(e);return sw(n._query),jT(t,n._query).then((i=>new cs(e,r,n,i)))}function GN(n){n=Ee(n,bt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ti(e);return eN(t,n._query).then((i=>new cs(e,r,n,i)))}function KN(n){n=Ee(n,bt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ti(e);return jT(t,n._query,{source:"server"}).then((i=>new cs(e,r,n,i)))}function lw(n,e,t){n=Ee(n,st);const r=Ee(n.firestore,Me),i=Bl(n.converter,e,t);return bo(r,[Ll(hs(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Qe.none())])}function Ep(n,e,t,...r){n=Ee(n,st);const i=Ee(n.firestore,Me),s=hs(i);let o;return o=typeof(e=oe(e))=="string"||e instanceof vi?gp(s,"updateDoc",n._key,e,t,r):mp(s,"updateDoc",n._key,e),bo(i,[o.toMutation(n._key,Qe.exists(!0))])}function hw(n){return bo(Ee(n.firestore,Me),[new _o(n._key,Qe.none())])}function dw(n,e){const t=Ee(n.firestore,Me),r=Sn(n),i=Bl(n.converter,e);return bo(t,[Ll(hs(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Qe.exists(!1))]).then((()=>r))}function Tp(n,...e){var t,r,i;n=oe(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||qd(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(qd(e[o])){const f=e[o];e[o]=(t=f.next)===null||t===void 0?void 0:t.bind(f),e[o+1]=(r=f.error)===null||r===void 0?void 0:r.bind(f),e[o+2]=(i=f.complete)===null||i===void 0?void 0:i.bind(f)}let c,l,h;if(n instanceof st)l=Ee(n.firestore,Me),h=mo(n._key.path),c={next:f=>{e[o]&&e[o](wp(l,n,f))},error:e[o+1],complete:e[o+2]};else{const f=Ee(n,bt);l=Ee(f.firestore,Me),h=f._query;const m=new Ti(l);c={next:g=>{e[o]&&e[o](new cs(l,m,f,g))},error:e[o+1],complete:e[o+2]},sw(n._query)}return(function(m,g,b,R){const C=new kl(R),V=new ep(g,C,b);return m.asyncQueue.enqueueAndForget((async()=>Yf(await so(m),V))),()=>{C.Za(),m.asyncQueue.enqueueAndForget((async()=>Xf(await so(m),V)))}})(Ye(l),h,a,c)}function zN(n,e){return nN(Ye(n=Ee(n,Me)),qd(e)?e:{next:e})}function bo(n,e){return(function(r,i){const s=new wt;return r.asyncQueue.enqueueAndForget((async()=>Dk(await cp(r),i,s))),s.promise})(Ye(n),e)}function wp(n,e,t){const r=t.docs.get(e._key),i=new Ti(n);return new as(n,i,e._key,r,new Yr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function $N(n){return fw(n,{count:uw()})}function fw(n,e){const t=Ee(n.firestore,Me),r=Ye(t),i=aE(e,((s,o)=>new ME(o,s.aggregateType,s._internalFieldPath)));return tN(r,n._query,i).then((s=>(function(a,c,l){const h=new Ti(a);return new YT(c,h,l)})(t,n,s)))}class HN{constructor(e){this.kind="memory",this._onlineComponentProvider=fi.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=di.provider}toJSON(){return{kind:this.kind}}}class WN{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=pw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class QN{constructor(){this.kind="memoryEager",this._offlineComponentProvider=di.provider}toJSON(){return{kind:this.kind}}}class JN{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new $k(e)}}toJSON(){return{kind:this.kind}}}function YN(){return new QN}function XN(n){return new JN(n==null?void 0:n.cacheSizeBytes)}function ZN(n){return new HN(n)}function eV(n){return new WN(n)}class tV{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=fi.provider,this._offlineComponentProvider={build:t=>new op(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class nV{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=fi.provider,this._offlineComponentProvider={build:t=>new MT(t,e==null?void 0:e.cacheSizeBytes)}}}function pw(n){return new tV(n==null?void 0:n.forceOwnership)}function rV(){return new nV}/**
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
 */const iV={maxAttempts:5};/**
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
 */class mw{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=hs(e)}set(e,t,r){this._verifyNotCommitted();const i=Wr(e,this._firestore),s=Bl(i.converter,t,r),o=Ll(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Qe.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Wr(e,this._firestore);let o;return o=typeof(t=oe(t))=="string"||t instanceof vi?gp(this._dataReader,"WriteBatch.update",s._key,t,r,i):mp(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Qe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Wr(e,this._firestore);return this._mutations=this._mutations.concat(new _o(t._key,Qe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new K(L.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Wr(n,e){if((n=oe(n)).firestore!==e)throw new K(L.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class gw extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=hs(t)}get(t){const r=Wr(t,this._firestore),i=new ON(this._firestore);return this._transaction.lookup([r._key]).then((s=>{if(!s||s.length!==1)return re();const o=s[0];if(o.isFoundDocument())return new Qa(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new Qa(this._firestore,i,r._key,null,r.converter);throw re()}))}set(t,r,i){const s=Wr(t,this._firestore),o=Bl(s.converter,r,i),a=Ll(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=Wr(t,this._firestore);let a;return a=typeof(r=oe(r))=="string"||r instanceof vi?gp(this._dataReader,"Transaction.update",o._key,r,i,s):mp(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=Wr(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Wr(e,this._firestore),r=new Ti(this._firestore);return super.get(e).then((i=>new as(this._firestore,r,t._key,i._document,new Yr(!1,!1),t.converter)))}}function sV(n,e,t){n=Ee(n,Me);const r=Object.assign(Object.assign({},iV),t);return(function(s){if(s.maxAttempts<1)throw new K(L.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(s,o,a){const c=new wt;return s.asyncQueue.enqueueAndForget((async()=>{const l=await BT(s);new Qk(s.asyncQueue,l,a,o,c).au()})),c.promise})(Ye(n),(i=>e(new gw(n,i))),r)}/**
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
 */function oV(){return new Ic("deleteField")}function aV(){return new hp("serverTimestamp")}function cV(...n){return new dp("arrayUnion",n)}function uV(...n){return new fp("arrayRemove",n)}function lV(n){return new pp("increment",n)}function hV(n){return new yc(n)}/**
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
 */function dV(n){return Ye(n=Ee(n,Me)),new mw(n,(e=>bo(n,e)))}/**
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
 */function fV(n,e){const t=Ye(n=Ee(n,Me));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return fn("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(s){const o=typeof s=="string"?(function(l){try{return JSON.parse(l)}catch(h){throw new K(L.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}})(s):s,a=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const l=iy(c,"collectionGroup"),h=[];if(Array.isArray(c.fields))for(const f of c.fields){const m=Ml("setIndexConfiguration",iy(f,"fieldPath"));f.arrayConfig==="CONTAINS"?h.push(new Qi(m,2)):f.order==="ASCENDING"?h.push(new Qi(m,0)):f.order==="DESCENDING"&&h.push(new Qi(m,1))}a.push(new Hs(Hs.UNKNOWN_ID,l,h,Ws.empty()))}return a})(e);return sN(t,r)}function iy(n,e){if(typeof n[e]!="string")throw new K(L.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class _w{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function pV(n){var e;n=Ee(n,Me);const t=sy.get(n);if(t)return t;if(((e=Ye(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new _w(n);return sy.set(n,r),r}function mV(n){yw(n,!0)}function gV(n){yw(n,!1)}function _V(n){aN(Ye(n._firestore)).then((e=>z("deleting all persistent cache indexes succeeded"))).catch((e=>fn("deleting all persistent cache indexes failed",e)))}function yw(n,e){oN(Ye(n._firestore),e).then((t=>z(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((t=>fn(`setting persistent cache index auto creation isEnabled=${e} failed`,t)))}const sy=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yV(n){var e;const t=(e=Ye(Ee(n.firestore,Me))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:bl(t,jt(n._query))._t}function IV(n,e){var t;const r=aE(e,((s,o)=>new ME(o,s.aggregateType,s._internalFieldPath))),i=(t=Ye(Ee(n.firestore,Me))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:JE(i,EE(n._query),r,!0).request}/**
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
 */class vV{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Ap.instance.onExistenceFilterMismatch(e)}}class Ap{constructor(){this.Uu=new Map}static get instance(){return eu||(eu=new Ap,(function(t){if(Lu)throw new Error("a TestingHooksSpi instance is already set");Lu=t})(eu)),eu}et(e){this.Uu.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let eu=null;(function(e,t=!0){(function(i){po=i})(ls),Xi(new si("firestore",((r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Me(new tC(r.getProvider("auth-internal")),new iC(r.getProvider("app-check-internal")),(function(l,h){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new K(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ai(l.options.projectId,h)})(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a}),"PUBLIC").setMultipleInstances(!0)),Kn(Wg,"4.7.3",e),Kn(Wg,"4.7.3","esm2017")})();const EV=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:vp,AggregateField:oo,AggregateQuerySnapshot:YT,Bytes:pi,CACHE_SIZE_UNLIMITED:lN,CollectionReference:Rn,DocumentReference:st,DocumentSnapshot:as,FieldPath:vi,FieldValue:Ei,Firestore:Me,FirestoreError:K,GeoPoint:Ol,LoadBundleTask:HT,PersistentCacheIndexManager:_w,Query:bt,QueryCompositeFilterConstraint:fs,QueryConstraint:wo,QueryDocumentSnapshot:Aa,QueryEndAtConstraint:Tc,QueryFieldFilterConstraint:Ao,QueryLimitConstraint:vc,QueryOrderByConstraint:Ul,QuerySnapshot:cs,QueryStartAtConstraint:Ec,SnapshotMetadata:Yr,Timestamp:Je,Transaction:gw,VectorValue:yc,WriteBatch:mw,_AutoId:wf,_ByteString:tt,_DatabaseId:ai,_DocumentKey:Z,_EmptyAppCheckTokenProvider:sC,_EmptyAuthCredentialsProvider:Wv,_FieldPath:Ke,_TestingHooks:vV,_cast:Ee,_debugAssert:Z0,_internalAggregationQueryToProtoRunAggregationQueryRequest:IV,_internalQueryToProtoQueryTarget:yV,_isBase64Available:VC,_logWarn:fn,_validateIsNotUsedTogether:KT,addDoc:dw,aggregateFieldEqual:MN,aggregateQuerySnapshotEqual:FN,and:PN,arrayRemove:uV,arrayUnion:cV,average:LN,clearIndexedDbPersistence:pN,collection:os,collectionGroup:cN,connectFirestoreEmulator:$T,count:uw,deleteAllPersistentCacheIndexes:_V,deleteDoc:hw,deleteField:oV,disableNetwork:_N,disablePersistentCacheIndexAutoCreation:gV,doc:Sn,documentId:EN,enableIndexedDbPersistence:dN,enableMultiTabIndexedDbPersistence:fN,enableNetwork:gN,enablePersistentCacheIndexAutoCreation:mV,endAt:VN,endBefore:NN,ensureFirestoreConfigured:Ye,executeWrite:bo,getAggregateFromServer:fw,getCountFromServer:$N,getDoc:Ja,getDocFromCache:qN,getDocFromServer:jN,getDocs:nr,getDocsFromCache:GN,getDocsFromServer:KN,getFirestore:WT,getPersistentCacheIndexManager:pV,increment:lV,initializeFirestore:hN,limit:ji,limitToLast:CN,loadBundle:IN,memoryEagerGarbageCollector:YN,memoryLocalCache:ZN,memoryLruGarbageCollector:XN,namedQuery:vN,onSnapshot:Tp,onSnapshotsInSync:zN,or:SN,orderBy:Ip,persistentLocalCache:eV,persistentMultipleTabManager:rV,persistentSingleTabManager:pw,query:On,queryEqual:lp,refEqual:uN,runTransaction:sV,serverTimestamp:aV,setDoc:lw,setIndexConfiguration:fV,setLogLevel:X0,snapshotEqual:BN,startAfter:kN,startAt:DN,sum:xN,terminate:yN,updateDoc:Ep,vector:hV,waitForPendingWrites:mN,where:Hr,writeBatch:dV},Symbol.toStringTag,{value:"Module"}));var TV="firebase",wV="10.14.1";/**
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
 */Kn(TV,wV,"app");function bp(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}/**
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
 */const AV={PHONE:"phone",TOTP:"totp"},bV={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},RV={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},SV={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},PV={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function CV(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function Iw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const DV=CV,vw=Iw,Ew=new ac("auth","Firebase",Iw()),kV={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"};/**
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
 */const $u=new If("@firebase/auth");function NV(n,...e){$u.logLevel<=we.WARN&&$u.warn(`Auth (${ls}): ${n}`,...e)}function _u(n,...e){$u.logLevel<=we.ERROR&&$u.error(`Auth (${ls}): ${n}`,...e)}/**
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
 */function nn(n,...e){throw Sp(n,...e)}function Yt(n,...e){return Sp(n,...e)}function Rp(n,e,t){const r=Object.assign(Object.assign({},vw()),{[e]:t});return new ac("auth","Firebase",r).create(e,{appName:n.name})}function At(n){return Rp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ro(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&nn(n,"argument-error"),Rp(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Sp(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ew.create(n,...e)}function W(n,e,...t){if(!n)throw Sp(e,...t)}function qn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw _u(e),new Error(e)}function Tr(n,e){n||qn(e)}/**
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
 */function Ya(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Pp(){return oy()==="http:"||oy()==="https:"}function oy(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function VV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Pp()||VP()||"connection"in navigator)?navigator.onLine:!0}function OV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class wc{constructor(e,t){this.shortDelay=e,this.longDelay=t,Tr(t>e,"Short delay should be less than long delay!"),this.isMobile=DP()||OP()}get(){return VV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Cp(n,e){Tr(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Tw{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;qn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;qn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;qn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const xV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const LV=new wc(3e4,6e4);function $e(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function He(n,e,t,r,i={}){return ww(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=ho(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l=Object.assign({method:e,headers:c},s);return NP()||(l.referrerPolicy="no-referrer"),Tw.fetch()(Aw(n,n.config.apiHost,t,a),l)})}async function ww(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},xV),e);try{const i=new FV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw la(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw la(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw la(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw la(n,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Rp(n,h,l);nn(n,h)}}catch(i){if(i instanceof Qn)throw i;nn(n,"network-request-failed",{message:String(i)})}}async function Cr(n,e,t,r,i={}){const s=await He(n,e,t,r,i);return"mfaPendingCredential"in s&&nn(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Aw(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Cp(n.config,i):`${n.config.apiScheme}://${i}`}function MV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class FV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Yt(this.auth,"network-request-failed")),LV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function la(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Yt(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */function ay(n){return n!==void 0&&n.getResponse!==void 0}function cy(n){return n!==void 0&&n.enterprise!==void 0}class bw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return MV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
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
 */async function UV(n){return(await He(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Rw(n,e){return He(n,"GET","/v2/recaptchaConfig",$e(n,e))}/**
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
 */async function BV(n,e){return He(n,"POST","/v1/accounts:delete",e)}async function qV(n,e){return He(n,"POST","/v1/accounts:update",e)}async function Sw(n,e){return He(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function ba(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
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
 */function jV(n,e=!1){return oe(n).getIdToken(e)}async function Pw(n,e=!1){const t=oe(n),r=await t.getIdToken(e),i=ql(r);W(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ba(qh(i.auth_time)),issuedAtTime:ba(qh(i.iat)),expirationTime:ba(qh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function qh(n){return Number(n)*1e3}function ql(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return _u("JWT malformed, contained fewer than 3 sections"),null;try{const i=Cv(t);return i?JSON.parse(i):(_u("Failed to decode base64 JWT payload"),null)}catch(i){return _u("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function uy(n){const e=ql(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function wr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Qn&&GV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function GV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class KV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class jd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ba(this.lastLoginAt),this.creationTime=ba(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Xa(n){var e;const t=n.auth,r=await n.getIdToken(),i=await wr(n,Sw(t,{idToken:r}));W(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Dw(s.providerUserInfo):[],a=zV(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new jd(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Cw(n){const e=oe(n);await Xa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function zV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Dw(n){return n.map(e=>{var{providerId:t}=e,r=bp(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function $V(n,e){const t=await ww(n,{},async()=>{const r=ho({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Aw(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Tw.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function HV(n,e){return He(n,"POST","/v2/accounts:revokeToken",$e(n,e))}/**
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
 */class qs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):uy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=uy(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await $V(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new qs;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(W(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(W(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qs,this.toJSON())}_performRefresh(){return qn("not implemented")}}/**
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
 */function Ur(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class hr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=bp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new KV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await wr(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Pw(this,e)}reload(){return Cw(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new hr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Xa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ht(this.auth.app))return Promise.reject(At(this.auth));const e=await this.getIdToken();return await wr(this,BV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,h;const f=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,g=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,R=(a=t.tenantId)!==null&&a!==void 0?a:void 0,C=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,V=(l=t.createdAt)!==null&&l!==void 0?l:void 0,D=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:x,emailVerified:M,isAnonymous:H,providerData:j,stsTokenManager:E}=t;W(x&&E,e,"internal-error");const _=qs.fromJSON(this.name,E);W(typeof x=="string",e,"internal-error"),Ur(f,e.name),Ur(m,e.name),W(typeof M=="boolean",e,"internal-error"),W(typeof H=="boolean",e,"internal-error"),Ur(g,e.name),Ur(b,e.name),Ur(R,e.name),Ur(C,e.name),Ur(V,e.name),Ur(D,e.name);const y=new hr({uid:x,auth:e,email:m,emailVerified:M,displayName:f,isAnonymous:H,photoURL:b,phoneNumber:g,tenantId:R,stsTokenManager:_,createdAt:V,lastLoginAt:D});return j&&Array.isArray(j)&&(y.providerData=j.map(v=>Object.assign({},v))),C&&(y._redirectEventId=C),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new qs;i.updateFromServerResponse(t);const s=new hr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Xa(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];W(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Dw(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new qs;a.updateFromIdToken(r);const c=new hr({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
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
 */const ly=new Map;function dr(n){Tr(n instanceof Function,"Expected a class definition");let e=ly.get(n);return e?(Tr(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ly.set(n,e),e)}/**
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
 */class kw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}kw.type="NONE";const Gd=kw;/**
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
 */function yu(n,e,t){return`firebase:${n}:${e}:${t}`}class js{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=yu(this.userKey,i.apiKey,s),this.fullPersistenceKey=yu("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?hr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new js(dr(Gd),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||dr(Gd);const o=yu(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){const f=hr._fromJSON(e,h);l!==s&&(a=f),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new js(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new js(s,e,r))}}/**
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
 */function hy(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mw(e))return"Blackberry";if(Fw(e))return"Webos";if(Vw(e))return"Safari";if((e.includes("chrome/")||Ow(e))&&!e.includes("edge/"))return"Chrome";if(Lw(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Nw(n=It()){return/firefox\//i.test(n)}function Vw(n=It()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ow(n=It()){return/crios\//i.test(n)}function xw(n=It()){return/iemobile/i.test(n)}function Lw(n=It()){return/android/i.test(n)}function Mw(n=It()){return/blackberry/i.test(n)}function Fw(n=It()){return/webos/i.test(n)}function Dp(n=It()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function WV(n=It()){var e;return Dp(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function QV(){return xP()&&document.documentMode===10}function Uw(n=It()){return Dp(n)||Lw(n)||Fw(n)||Mw(n)||/windows phone/i.test(n)||xw(n)}/**
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
 */function Bw(n,e=[]){let t;switch(n){case"Browser":t=hy(It());break;case"Worker":t=`${hy(It())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ls}/${r}`}/**
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
 */class JV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function YV(n,e={}){return He(n,"GET","/v2/passwordPolicy",$e(n,e))}/**
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
 */const XV=6;class ZV{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:XV,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class eO{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dy(this),this.idTokenSubscription=new dy(this),this.beforeStateQueue=new JV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ew,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await js.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Sw(this,{idToken:e}),r=await hr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ht(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=OV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ht(this.app))return Promise.reject(At(this));const t=e?oe(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ht(this.app)?Promise.reject(At(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ht(this.app)?Promise.reject(At(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await YV(this),t=new ZV(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ac("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await HV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dr(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await js.create(this,[dr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&NV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function at(n){return oe(n)}class dy{constructor(e){this.auth=e,this.observer=null,this.addObserver=qP(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ac={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tO(n){Ac=n}function kp(n){return Ac.loadJS(n)}function nO(){return Ac.recaptchaV2Script}function rO(){return Ac.recaptchaEnterpriseScript}function iO(){return Ac.gapiScript}function qw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const sO="recaptcha-enterprise",oO="NO_RECAPTCHA";class jw{constructor(e){this.type=sO,this.auth=at(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Rw(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new bw(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;cy(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(oO)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&cy(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=rO();c.length!==0&&(c+=a),kp(c).then(()=>{i(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function fy(n,e,t,r=!1){const i=new jw(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Za(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await fy(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await fy(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}async function aO(n){const e=at(n),t=await Rw(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new bw(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new jw(e).verify()}/**
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
 */function Gw(n,e){const t=fo(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(ii(s,e??{}))return i;nn(i,"already-initialized")}return t.initialize({options:e})}function cO(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(dr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Kw(n,e,t){const r=at(n);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=zw(e),{host:o,port:a}=uO(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||lO()}function zw(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function uO(n){const e=zw(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:py(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:py(o)}}}function py(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function lO(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class So{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return qn("not implemented")}_getIdTokenResponse(e){return qn("not implemented")}_linkToIdToken(e,t){return qn("not implemented")}_getReauthenticationResolver(e){return qn("not implemented")}}/**
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
 */async function $w(n,e){return He(n,"POST","/v1/accounts:resetPassword",$e(n,e))}async function hO(n,e){return He(n,"POST","/v1/accounts:update",e)}async function dO(n,e){return He(n,"POST","/v1/accounts:signUp",e)}async function fO(n,e){return He(n,"POST","/v1/accounts:update",$e(n,e))}/**
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
 */async function pO(n,e){return Cr(n,"POST","/v1/accounts:signInWithPassword",$e(n,e))}async function jl(n,e){return He(n,"POST","/v1/accounts:sendOobCode",$e(n,e))}async function mO(n,e){return jl(n,e)}async function gO(n,e){return jl(n,e)}async function _O(n,e){return jl(n,e)}async function yO(n,e){return jl(n,e)}/**
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
 */async function IO(n,e){return Cr(n,"POST","/v1/accounts:signInWithEmailLink",$e(n,e))}async function vO(n,e){return Cr(n,"POST","/v1/accounts:signInWithEmailLink",$e(n,e))}/**
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
 */class ao extends So{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new ao(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ao(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,t,"signInWithPassword",pO);case"emailLink":return IO(e,{email:this._email,oobCode:this._password});default:nn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,r,"signUpPassword",dO);case"emailLink":return vO(e,{idToken:t,email:this._email,oobCode:this._password});default:nn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function mr(n,e){return Cr(n,"POST","/v1/accounts:signInWithIdp",$e(n,e))}/**
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
 */const EO="http://localhost";class Wn extends So{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=bp(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Wn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return mr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,mr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mr(e,t)}buildRequest(){const e={requestUri:EO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ho(t)}return e}}/**
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
 */async function TO(n,e){return He(n,"POST","/v1/accounts:sendVerificationCode",$e(n,e))}async function wO(n,e){return Cr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,e))}async function AO(n,e){const t=await Cr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,e));if(t.temporaryProof)throw la(n,"account-exists-with-different-credential",t);return t}const bO={USER_NOT_FOUND:"user-not-found"};async function RO(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Cr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,t),bO)}/**
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
 */class ei extends So{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ei({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ei({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return wO(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return AO(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return RO(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new ei({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
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
 */function SO(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function PO(n){const e=ia(sa(n)).link,t=e?ia(sa(e)).deep_link_id:null,r=ia(sa(n)).deep_link_id;return(r?ia(sa(r)).link:null)||r||t||e||n}class Po{constructor(e){var t,r,i,s,o,a;const c=ia(sa(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(r=c.oobCode)!==null&&r!==void 0?r:null,f=SO((i=c.mode)!==null&&i!==void 0?i:null);W(l&&h&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=h,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=PO(e);try{return new Po(t)}catch{return null}}}function CO(n){return Po.parseLink(n)}/**
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
 */class wi{constructor(){this.providerId=wi.PROVIDER_ID}static credential(e,t){return ao._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Po.parseLink(t);return W(r,"argument-error"),ao._fromEmailAndCode(e,r.code,r.tenantId)}}wi.PROVIDER_ID="password";wi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";wi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Dr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Co extends Dr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Ra extends Co{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return W("providerId"in t&&"signInMethod"in t,"argument-error"),Wn._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return W(e.idToken||e.accessToken,"argument-error"),Wn._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Ra.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Ra.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:a}=e;if(!r&&!i&&!t&&!s||!a)return null;try{return new Ra(a)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
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
 */class ar extends Co{constructor(){super("facebook.com")}static credential(e){return Wn._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ar.credential(e.oauthAccessToken)}catch{return null}}}ar.FACEBOOK_SIGN_IN_METHOD="facebook.com";ar.PROVIDER_ID="facebook.com";/**
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
 */class Fn extends Co{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Wn._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Fn.credentialFromTaggedObject(e)}static credentialFromError(e){return Fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Fn.credential(t,r)}catch{return null}}}Fn.GOOGLE_SIGN_IN_METHOD="google.com";Fn.PROVIDER_ID="google.com";/**
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
 */class cr extends Co{constructor(){super("github.com")}static credential(e){return Wn._fromParams({providerId:cr.PROVIDER_ID,signInMethod:cr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cr.credentialFromTaggedObject(e)}static credentialFromError(e){return cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cr.credential(e.oauthAccessToken)}catch{return null}}}cr.GITHUB_SIGN_IN_METHOD="github.com";cr.PROVIDER_ID="github.com";/**
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
 */const DO="http://localhost";class ec extends So{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return mr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,mr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mr(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new ec(r,s)}static _create(e,t){return new ec(e,t)}buildRequest(){return{requestUri:DO,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const kO="saml.";class Hu extends Dr{constructor(e){W(e.startsWith(kO),"argument-error"),super(e)}static credentialFromResult(e){return Hu.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Hu.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=ec.fromJSON(e);return W(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return ec._create(r,t)}catch{return null}}}/**
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
 */class ur extends Co{constructor(){super("twitter.com")}static credential(e,t){return Wn._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return ur.credential(t,r)}catch{return null}}}ur.TWITTER_SIGN_IN_METHOD="twitter.com";ur.PROVIDER_ID="twitter.com";/**
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
 */async function Hw(n,e){return Cr(n,"POST","/v1/accounts:signUp",$e(n,e))}/**
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
 */class Tn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await hr._fromIdTokenResponse(e,r,i),o=my(r);return new Tn({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=my(r);return new Tn({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function my(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function NO(n){var e;if(ht(n.app))return Promise.reject(At(n));const t=at(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Tn({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Hw(t,{returnSecureToken:!0}),i=await Tn._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
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
 */class Wu extends Qn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Wu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Wu(e,t,r,i)}}function Ww(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Wu._fromErrorAndOperation(n,s,e,r):s})}/**
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
 */function Qw(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function VO(n,e){const t=oe(n);await Gl(!0,t,e);const{providerUserInfo:r}=await qV(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=Qw(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Np(n,e,t=!1){const r=await wr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Tn._forOperation(n,"link",r)}async function Gl(n,e,t){await Xa(e);const r=Qw(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";W(r.has(t)===n,e.auth,i)}/**
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
 */async function Jw(n,e,t=!1){const{auth:r}=n;if(ht(r.app))return Promise.reject(At(r));const i="reauthenticate";try{const s=await wr(n,Ww(r,i,e,n),t);W(s.idToken,r,"internal-error");const o=ql(s.idToken);W(o,r,"internal-error");const{sub:a}=o;return W(n.uid===a,r,"user-mismatch"),Tn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&nn(r,"user-mismatch"),s}}/**
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
 */async function Yw(n,e,t=!1){if(ht(n.app))return Promise.reject(At(n));const r="signIn",i=await Ww(n,r,e),s=await Tn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Kl(n,e){return Yw(at(n),e)}async function Xw(n,e){const t=oe(n);return await Gl(!1,t,e.providerId),Np(t,e)}async function Zw(n,e){return Jw(oe(n),e)}/**
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
 */async function OO(n,e){return Cr(n,"POST","/v1/accounts:signInWithCustomToken",$e(n,e))}/**
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
 */async function xO(n,e){if(ht(n.app))return Promise.reject(At(n));const t=at(n),r=await OO(t,{token:e,returnSecureToken:!0}),i=await Tn._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
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
 */class bc{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Vp._fromServerResponse(e,t):"totpInfo"in t?Op._fromServerResponse(e,t):nn(e,"internal-error")}}class Vp extends bc{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Vp(t)}}class Op extends bc{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Op(t)}}/**
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
 */function zl(n,e,t){var r;W(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),W(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(W(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(W(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function xp(n){const e=at(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function LO(n,e,t){const r=at(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&zl(r,i,t),await Za(r,i,"getOobCode",gO)}async function MO(n,e,t){await $w(oe(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&xp(n),r})}async function FO(n,e){await fO(oe(n),{oobCode:e})}async function eA(n,e){const t=oe(n),r=await $w(t,{oobCode:e}),i=r.requestType;switch(W(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":W(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":W(r.mfaInfo,t,"internal-error");default:W(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=bc._fromServerResponse(at(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function UO(n,e){const{data:t}=await eA(oe(n),e);return t.email}async function tA(n,e,t){if(ht(n.app))return Promise.reject(At(n));const r=at(n),o=await Za(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Hw).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&xp(n),c}),a=await Tn._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function ha(n,e,t){return ht(n.app)?Promise.reject(At(n)):Kl(oe(n),wi.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&xp(n),r})}/**
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
 */async function BO(n,e,t){const r=at(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,a){W(a.handleCodeInApp,r,"argument-error"),a&&zl(r,o,a)}s(i,t),await Za(r,i,"getOobCode",_O)}function qO(n,e){const t=Po.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function jO(n,e,t){if(ht(n.app))return Promise.reject(At(n));const r=oe(n),i=wi.credentialWithLink(e,t||Ya());return W(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Kl(r,i)}/**
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
 */async function GO(n,e){return He(n,"POST","/v1/accounts:createAuthUri",$e(n,e))}/**
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
 */async function KO(n,e){const t=Pp()?Ya():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await GO(oe(n),r);return i||[]}async function zO(n,e){const t=oe(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&zl(t.auth,i,e);const{email:s}=await mO(t.auth,i);s!==n.email&&await n.reload()}async function $O(n,e,t){const r=oe(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&zl(r.auth,s,t);const{email:o}=await yO(r.auth,s);o!==n.email&&await n.reload()}/**
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
 */async function HO(n,e){return He(n,"POST","/v1/accounts:update",e)}/**
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
 */async function WO(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=oe(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await wr(r,HO(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function QO(n,e){const t=oe(n);return ht(t.auth.app)?Promise.reject(At(t.auth)):nA(t,e,null)}function JO(n,e){return nA(oe(n),null,e)}async function nA(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await wr(n,hO(r,s));await n._updateTokensIfNecessary(o,!0)}/**
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
 */function YO(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const o=(t=(e=ql(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Gs(s,a)}}if(!r)return null;switch(r){case"facebook.com":return new XO(s,i);case"github.com":return new ZO(s,i);case"google.com":return new ex(s,i);case"twitter.com":return new tx(s,i,n.screenName||null);case"custom":case"anonymous":return new Gs(s,null);default:return new Gs(s,r,i)}}class Gs{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class rA extends Gs{constructor(e,t,r,i){super(e,t,r),this.username=i}}class XO extends Gs{constructor(e,t){super(e,"facebook.com",t)}}class ZO extends rA{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class ex extends Gs{constructor(e,t){super(e,"google.com",t)}}class tx extends rA{constructor(e,t,r){super(e,"twitter.com",t,r)}}function nx(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:YO(t)}/**
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
 */function Qu(n,e){return oe(n).setPersistence(e)}function rx(n){return aO(n)}async function ix(n,e){return at(n).validatePassword(e)}function iA(n,e,t,r){return oe(n).onIdTokenChanged(e,t,r)}function sA(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function oA(n,e,t,r){return oe(n).onAuthStateChanged(e,t,r)}function sx(n){oe(n).useDeviceLanguage()}function ox(n,e){return oe(n).updateCurrentUser(e)}function Lp(n){return oe(n).signOut()}function ax(n,e){return at(n).revokeAccessToken(e)}async function cx(n){return oe(n).delete()}/**
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
 */class Gi{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new Gi("enroll",e,t)}static _fromMfaPendingCredential(e){return new Gi("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,r;if(e!=null&&e.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return Gi._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return Gi._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class Mp{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=at(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(a=>bc._fromServerResponse(r,a));W(i.mfaPendingCredential,r,"internal-error");const o=Gi._fromMfaPendingCredential(i.mfaPendingCredential);return new Mp(o,s,async a=>{const c=await a._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const l=Object.assign(Object.assign({},i),{idToken:c.idToken,refreshToken:c.refreshToken});switch(t.operationType){case"signIn":const h=await Tn._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(h.user),h;case"reauthenticate":return W(t.user,r,"internal-error"),Tn._forOperation(t.user,t.operationType,l);default:nn(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function ux(n,e){var t;const r=oe(n),i=e;return W(e.customData.operationType,r,"argument-error"),W((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,r,"argument-error"),Mp._fromError(r,i)}/**
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
 */function lx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",$e(n,e))}function hx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",$e(n,e))}function dx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",$e(n,e))}function fx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",$e(n,e))}function px(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:withdraw",$e(n,e))}class Fp{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>bc._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Fp(e)}async getSession(){return Gi._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await wr(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await wr(this.user,px(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const jh=new WeakMap;function mx(n){const e=oe(n);return jh.has(e)||jh.set(e,Fp._fromUser(e)),jh.get(e)}const Ju="__sak";/**
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
 */class aA{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ju,"1"),this.storage.removeItem(Ju),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const gx=1e3,_x=10;class cA extends aA{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);QV()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,_x):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},gx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}cA.type="LOCAL";const $l=cA;/**
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
 */class uA extends aA{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}uA.type="SESSION";const Hl=uA;/**
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
 */function yx(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Wl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Wl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(t.origin,s)),c=await yx(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Wl.receivers=[];/**
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
 */function Ql(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Ix{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Ql("",20);i.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const m=f;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(m.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function mt(){return window}function vx(n){mt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(){return typeof mt().WorkerGlobalScope<"u"&&typeof mt().importScripts=="function"}async function Ex(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Tx(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function wx(){return Up()?self:null}/**
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
 */const lA="firebaseLocalStorageDb",Ax=1,Yu="firebaseLocalStorage",hA="fbase_key";class Rc{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Jl(n,e){return n.transaction([Yu],e?"readwrite":"readonly").objectStore(Yu)}function bx(){const n=indexedDB.deleteDatabase(lA);return new Rc(n).toPromise()}function Kd(){const n=indexedDB.open(lA,Ax);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Yu,{keyPath:hA})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Yu)?e(r):(r.close(),await bx(),e(await Kd()))})})}async function gy(n,e,t){const r=Jl(n,!0).put({[hA]:e,value:t});return new Rc(r).toPromise()}async function Rx(n,e){const t=Jl(n,!1).get(e),r=await new Rc(t).toPromise();return r===void 0?null:r.value}function _y(n,e){const t=Jl(n,!0).delete(e);return new Rc(t).toPromise()}const Sx=800,Px=3;class dA{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Kd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Px)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Up()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Wl._getInstance(wx()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ex(),!this.activeServiceWorker)return;this.sender=new Ix(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Tx()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Kd();return await gy(e,Ju,"1"),await _y(e,Ju),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>gy(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Rx(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_y(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Jl(i,!1).getAll();return new Rc(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dA.type="LOCAL";const Bp=dA;/**
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
 */function Cx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:start",$e(n,e))}function Dx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",$e(n,e))}function kx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",$e(n,e))}/**
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
 */const Nx=500,Vx=6e4,tu=1e12;class Ox{constructor(e){this.auth=e,this.counter=tu,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new xx(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||tu;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||tu;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||tu;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class xx{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;W(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Lx(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},Vx)},Nx))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Lx(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
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
 */const Gh=qw("rcb"),Mx=new wc(3e4,6e4);class Fx{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=mt().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return W(Ux(t),e,"argument-error"),this.shouldResolveImmediately(t)&&ay(mt().grecaptcha)?Promise.resolve(mt().grecaptcha):new Promise((r,i)=>{const s=mt().setTimeout(()=>{i(Yt(e,"network-request-failed"))},Mx.get());mt()[Gh]=()=>{mt().clearTimeout(s),delete mt()[Gh];const a=mt().grecaptcha;if(!a||!ay(a)){i(Yt(e,"internal-error"));return}const c=a.render;a.render=(l,h)=>{const f=c(l,h);return this.counter++,f},this.hostLanguage=t,r(a)};const o=`${nO()}?${ho({onload:Gh,render:"explicit",hl:t})}`;kp(o).catch(()=>{clearTimeout(s),i(Yt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=mt().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Ux(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Bx{async load(e){return new Ox(e)}clearedOneInstance(){}}/**
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
 */const fA="recaptcha",qx={theme:"light",type:"image"};class jx{constructor(e,t,r=Object.assign({},qx)){this.parameters=r,this.type=fA,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=at(e),this.isInvisible=this.parameters.size==="invisible",W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;W(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Bx:new Fx,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){W(!this.parameters.sitekey,this.auth,"argument-error"),W(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=mt()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){W(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){W(Pp()&&!Up(),this.auth,"internal-error"),await Gx(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await UV(this.auth);W(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return W(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Gx(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class qp{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=ei._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Kx(n,e,t){if(ht(n.app))return Promise.reject(At(n));const r=at(n),i=await Yl(r,e,oe(t));return new qp(i,s=>Kl(r,s))}async function zx(n,e,t){const r=oe(n);await Gl(!1,r,"phone");const i=await Yl(r.auth,e,oe(t));return new qp(i,s=>Xw(r,s))}async function $x(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(At(r.auth));const i=await Yl(r.auth,e,oe(t));return new qp(i,s=>Zw(r,s))}async function Yl(n,e,t){var r;const i=await t.verify();try{W(typeof i=="string",n,"argument-error"),W(t.type===fA,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return W(o.type==="enroll",n,"internal-error"),(await lx(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{W(o.type==="signin",n,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return W(a,n,"missing-multi-factor-info"),(await Cx(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await TO(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function Hx(n,e){const t=oe(n);if(ht(t.auth.app))return Promise.reject(At(t.auth));await Np(t,e)}/**
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
 */class Ji{constructor(e){this.providerId=Ji.PROVIDER_ID,this.auth=at(e)}verifyPhoneNumber(e,t){return Yl(this.auth,e,oe(t))}static credential(e,t){return ei._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Ji.credentialFromTaggedObject(t)}static credentialFromError(e){return Ji.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?ei._fromTokenResponse(t,r):null}}Ji.PROVIDER_ID="phone";Ji.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function ps(n,e){return e?dr(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class jp extends So{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return mr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return mr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Wx(n){return Yw(n.auth,new jp(n),n.bypassAuthState)}function Qx(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Jw(t,new jp(n),n.bypassAuthState)}async function Jx(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Np(t,new jp(n),n.bypassAuthState)}/**
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
 */class pA{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wx;case"linkViaPopup":case"linkViaRedirect":return Jx;case"reauthViaPopup":case"reauthViaRedirect":return Qx;default:nn(this.auth,"internal-error")}}resolve(e){Tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Yx=new wc(2e3,1e4);async function mA(n,e,t){if(ht(n.app))return Promise.reject(Yt(n,"operation-not-supported-in-this-environment"));const r=at(n);Ro(n,e,Dr);const i=ps(r,t);return new fr(r,"signInViaPopup",e,i).executeNotNull()}async function Xx(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(Yt(r.auth,"operation-not-supported-in-this-environment"));Ro(r.auth,e,Dr);const i=ps(r.auth,t);return new fr(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function Zx(n,e,t){const r=oe(n);Ro(r.auth,e,Dr);const i=ps(r.auth,t);return new fr(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class fr extends pA{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,fr.currentPopupAction&&fr.currentPopupAction.cancel(),fr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Tr(this.filter.length===1,"Popup operations only handle one event");const e=Ql();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Yx.get())};e()}}fr.currentPopupAction=null;/**
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
 */const eL="pendingRedirect",Iu=new Map;class tL extends pA{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Iu.get(this.auth._key());if(!e){try{const r=await nL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Iu.set(this.auth._key(),e)}return this.bypassAuthState||Iu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nL(n,e){const t=_A(e),r=gA(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function Gp(n,e){return gA(n)._set(_A(e),"true")}function rL(n,e){Iu.set(n._key(),e)}function gA(n){return dr(n._redirectPersistence)}function _A(n){return yu(eL,n.config.apiKey,n.name)}/**
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
 */function iL(n,e,t){return sL(n,e,t)}async function sL(n,e,t){if(ht(n.app))return Promise.reject(At(n));const r=at(n);Ro(n,e,Dr),await r._initializationPromise;const i=ps(r,t);return await Gp(i,r),i._openRedirect(r,e,"signInViaRedirect")}function oL(n,e,t){return aL(n,e,t)}async function aL(n,e,t){const r=oe(n);if(Ro(r.auth,e,Dr),ht(r.auth.app))return Promise.reject(At(r.auth));await r.auth._initializationPromise;const i=ps(r.auth,t);await Gp(i,r.auth);const s=await IA(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function cL(n,e,t){return uL(n,e,t)}async function uL(n,e,t){const r=oe(n);Ro(r.auth,e,Dr),await r.auth._initializationPromise;const i=ps(r.auth,t);await Gl(!1,r,e.providerId),await Gp(i,r.auth);const s=await IA(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function lL(n,e){return await at(n)._initializationPromise,yA(n,e,!1)}async function yA(n,e,t=!1){if(ht(n.app))return Promise.reject(At(n));const r=at(n),i=ps(r,e),o=await new tL(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function IA(n){const e=Ql(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const hL=600*1e3;class dL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fL(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!vA(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Yt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hL&&this.cachedEventUids.clear(),this.cachedEventUids.has(yy(e))}saveEventToCache(e){this.cachedEventUids.add(yy(e)),this.lastProcessedEventTime=Date.now()}}function yy(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function vA({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function fL(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vA(n);default:return!1}}/**
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
 */async function pL(n,e={}){return He(n,"GET","/v1/projects",e)}/**
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
 */const mL=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gL=/^https?/;async function _L(n){if(n.config.emulator)return;const{authorizedDomains:e}=await pL(n);for(const t of e)try{if(yL(t))return}catch{}nn(n,"unauthorized-domain")}function yL(n){const e=Ya(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!gL.test(t))return!1;if(mL.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IL=new wc(3e4,6e4);function Iy(){const n=mt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function vL(n){return new Promise((e,t)=>{var r,i,s;function o(){Iy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Iy(),t(Yt(n,"network-request-failed"))},timeout:IL.get()})}if(!((i=(r=mt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=mt().gapi)===null||s===void 0)&&s.load)o();else{const a=qw("iframefcb");return mt()[a]=()=>{gapi.load?o():t(Yt(n,"network-request-failed"))},kp(`${iO()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw vu=null,e})}let vu=null;function EL(n){return vu=vu||vL(n),vu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TL=new wc(5e3,15e3),wL="__/auth/iframe",AL="emulator/auth/iframe",bL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},RL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SL(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Cp(e,AL):`https://${n.config.authDomain}/${wL}`,r={apiKey:e.apiKey,appName:n.name,v:ls},i=RL.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ho(r).slice(1)}`}async function PL(n){const e=await EL(n),t=mt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:SL(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bL,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Yt(n,"network-request-failed"),a=mt().setTimeout(()=>{s(o)},TL.get());function c(){mt().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DL=500,kL=600,NL="_blank",VL="http://localhost";class vy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function OL(n,e,t,r=DL,i=kL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},CL),{width:r.toString(),height:i.toString(),top:s,left:o}),l=It().toLowerCase();t&&(a=Ow(l)?NL:t),Nw(l)&&(e=e||VL,c.scrollbars="yes");const h=Object.entries(c).reduce((m,[g,b])=>`${m}${g}=${b},`,"");if(WV(l)&&a!=="_self")return xL(e||"",a),new vy(null);const f=window.open(e||"",a,h);W(f,n,"popup-blocked");try{f.focus()}catch{}return new vy(f)}function xL(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const LL="__/auth/handler",ML="emulator/auth/handler",FL=encodeURIComponent("fac");async function Ey(n,e,t,r,i,s){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ls,eventId:i};if(e instanceof Dr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",BP(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof Co){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${FL}=${encodeURIComponent(c)}`:"";return`${UL(n)}?${ho(a).slice(1)}${l}`}function UL({config:n}){return n.emulator?Cp(n,ML):`https://${n.authDomain}/${LL}`}/**
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
 */const Kh="webStorageSupport";class BL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Hl,this._completeRedirectFn=yA,this._overrideRedirectResult=rL}async _openPopup(e,t,r,i){var s;Tr((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Ey(e,t,r,Ya(),i);return OL(e,o,Ql())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Ey(e,t,r,Ya(),i);return vx(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Tr(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await PL(e),r=new dL(e);return t.register("authEvent",i=>(W(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Kh,{type:Kh},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Kh];o!==void 0&&t(!!o),nn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=_L(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Uw()||Vw()||Dp()}}const EA=BL;class TA{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return qn("unexpected MultiFactorSessionType")}}}class Kp extends TA{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Kp(e)}_finalizeEnroll(e,t,r){return hx(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Dx(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class wA{constructor(){}static assertion(e){return Kp._fromCredential(e)}}wA.FACTOR_ID="phone";class AA{static assertionForEnrollment(e,t){return tc._fromSecret(e,t)}static assertionForSignIn(e,t){return tc._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const r=e;W(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await dx(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Xl._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}}AA.FACTOR_ID="totp";class tc extends TA{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new tc(t,void 0,e)}static _fromEnrollmentId(e,t){return new tc(t,e)}async _finalizeEnroll(e,t,r){return W(typeof this.secret<"u",e,"argument-error"),fx(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){W(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return kx(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class Xl{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Xl(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(nu(e)||nu(t))&&(i=!0),i&&(nu(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),nu(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function nu(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var Ty="@firebase/auth",wy="1.7.9";/**
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
 */class qL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function jL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function GL(n){Xi(new si("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bw(n)},l=new eO(r,i,s,c);return cO(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xi(new si("auth-internal",e=>{const t=at(e.getProvider("auth").getImmediate());return(r=>new qL(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Kn(Ty,wy,jL(n)),Kn(Ty,wy,"esm2017")}/**
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
 */const KL=300,zL=Vv("authIdTokenMaxAge")||KL;let Ay=null;const $L=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>zL)return;const i=t==null?void 0:t.token;Ay!==i&&(Ay=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Xu(n=yl()){const e=fo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Gw(n,{popupRedirectResolver:EA,persistence:[Bp,$l,Hl]}),r=Vv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=$L(s.toString());sA(t,o,()=>o(t.currentUser)),iA(t,a=>o(a))}}const i=Dv("auth");return i&&Kw(t,`http://${i}`),t}function HL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}tO({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Yt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",HL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});GL("Browser");const WL=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:PV,ActionCodeURL:Po,AuthCredential:So,AuthErrorCodes:kV,EmailAuthCredential:ao,EmailAuthProvider:wi,FacebookAuthProvider:ar,FactorId:AV,GithubAuthProvider:cr,GoogleAuthProvider:Fn,OAuthCredential:Wn,OAuthProvider:Ra,OperationType:SV,PhoneAuthCredential:ei,PhoneAuthProvider:Ji,PhoneMultiFactorGenerator:wA,ProviderId:bV,RecaptchaVerifier:jx,SAMLAuthProvider:Hu,SignInMethod:RV,TotpMultiFactorGenerator:AA,TotpSecret:Xl,TwitterAuthProvider:ur,applyActionCode:FO,beforeAuthStateChanged:sA,browserLocalPersistence:$l,browserPopupRedirectResolver:EA,browserSessionPersistence:Hl,checkActionCode:eA,confirmPasswordReset:MO,connectAuthEmulator:Kw,createUserWithEmailAndPassword:tA,debugErrorMap:DV,deleteUser:cx,fetchSignInMethodsForEmail:KO,getAdditionalUserInfo:nx,getAuth:Xu,getIdToken:jV,getIdTokenResult:Pw,getMultiFactorResolver:ux,getRedirectResult:lL,inMemoryPersistence:Gd,indexedDBLocalPersistence:Bp,initializeAuth:Gw,initializeRecaptchaConfig:rx,isSignInWithEmailLink:qO,linkWithCredential:Xw,linkWithPhoneNumber:zx,linkWithPopup:Zx,linkWithRedirect:cL,multiFactor:mx,onAuthStateChanged:oA,onIdTokenChanged:iA,parseActionCodeURL:CO,prodErrorMap:vw,reauthenticateWithCredential:Zw,reauthenticateWithPhoneNumber:$x,reauthenticateWithPopup:Xx,reauthenticateWithRedirect:oL,reload:Cw,revokeAccessToken:ax,sendEmailVerification:zO,sendPasswordResetEmail:LO,sendSignInLinkToEmail:BO,setPersistence:Qu,signInAnonymously:NO,signInWithCredential:Kl,signInWithCustomToken:xO,signInWithEmailAndPassword:ha,signInWithEmailLink:jO,signInWithPhoneNumber:Kx,signInWithPopup:mA,signInWithRedirect:iL,signOut:Lp,unlink:VO,updateCurrentUser:ox,updateEmail:QO,updatePassword:JO,updatePhoneNumber:Hx,updateProfile:WO,useDeviceLanguage:sx,validatePassword:ix,verifyBeforeUpdateEmail:$O,verifyPasswordResetCode:UO},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA="firebasestorage.googleapis.com",RA="storageBucket",QL=120*1e3,JL=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends Qn{constructor(e,t,r=0){super(zh(e),`Firebase Storage: ${t} (${zh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ct.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return zh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ot;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ot||(ot={}));function zh(n){return"storage/"+n}function zp(){const n="An unknown error occurred, please check the error payload for server response.";return new ct(ot.UNKNOWN,n)}function YL(n){return new ct(ot.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function XL(n){return new ct(ot.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function ZL(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ct(ot.UNAUTHENTICATED,n)}function eM(){return new ct(ot.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function tM(n){return new ct(ot.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function nM(){return new ct(ot.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function rM(){return new ct(ot.CANCELED,"User canceled the upload/download.")}function iM(n){return new ct(ot.INVALID_URL,"Invalid URL '"+n+"'.")}function sM(n){return new ct(ot.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function oM(){return new ct(ot.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+RA+"' property when initializing the app?")}function aM(){return new ct(ot.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function cM(){return new ct(ot.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function uM(n){return new ct(ot.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function zd(n){return new ct(ot.INVALID_ARGUMENT,n)}function SA(){return new ct(ot.APP_DELETED,"The Firebase app was deleted.")}function lM(n){return new ct(ot.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Sa(n,e){return new ct(ot.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Xo(n){throw new ct(ot.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ln.makeFromUrl(e,t)}catch{return new ln(e,"")}if(r.path==="")return r;throw sM(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function l(M){M.path_=decodeURIComponent(M.path)}const h="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",g=new RegExp(`^https?://${f}/${h}/b/${i}/o${m}`,"i"),b={bucket:1,path:3},R=t===bA?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",V=new RegExp(`^https?://${R}/${i}/${C}`,"i"),x=[{regex:a,indices:c,postModify:s},{regex:g,indices:b,postModify:l},{regex:V,indices:{bucket:1,path:2},postModify:l}];for(let M=0;M<x.length;M++){const H=x[M],j=H.regex.exec(e);if(j){const E=j[H.indices.bucket];let _=j[H.indices.path];_||(_=""),r=new ln(E,_),H.postModify(r);break}}if(r==null)throw iM(e);return r}}class hM{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dM(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function c(){return a===2}let l=!1;function h(...C){l||(l=!0,e.apply(null,C))}function f(C){i=setTimeout(()=>{i=null,n(g,c())},C)}function m(){s&&clearTimeout(s)}function g(C,...V){if(l){m();return}if(C){m(),h.call(null,C,...V);return}if(c()||o){m(),h.call(null,C,...V);return}r<64&&(r*=2);let x;a===1?(a=2,x=0):x=(r+Math.random())*1e3,f(x)}let b=!1;function R(C){b||(b=!0,m(),!l&&(i!==null?(C||(a=2),clearTimeout(i),f(0)):C||(a=1)))}return f(0),s=setTimeout(()=>{o=!0,R(!0)},t),R}function fM(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pM(n){return n!==void 0}function mM(n){return typeof n=="object"&&!Array.isArray(n)}function $p(n){return typeof n=="string"||n instanceof String}function by(n){return Hp()&&n instanceof Blob}function Hp(){return typeof Blob<"u"}function Ry(n,e,t,r){if(r<e)throw zd(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw zd(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function PA(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Yi;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Yi||(Yi={}));/**
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
 */function gM(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _M{constructor(e,t,r,i,s,o,a,c,l,h,f,m=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=h,this.connectionFactory_=f,this.retry=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((g,b)=>{this.resolve_=g,this.reject_=b,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new ru(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===Yi.NO_ERROR,c=s.getStatus();if(!a||gM(c,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Yi.ABORT;r(!1,new ru(!1,null,h));return}const l=this.successCodes_.indexOf(c)!==-1;r(!0,new ru(l,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());pM(c)?s(c):s()}catch(c){o(c)}else if(a!==null){const c=zp();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(i.canceled){const c=this.appDelete_?SA():rM();o(c)}else{const c=nM();o(c)}};this.canceled_?t(!1,new ru(!1,null,!0)):this.backoffId_=dM(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&fM(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ru{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function yM(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function IM(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function vM(n,e){e&&(n["X-Firebase-GMPID"]=e)}function EM(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function TM(n,e,t,r,i,s,o=!0){const a=PA(n.urlParams),c=n.url+a,l=Object.assign({},n.headers);return vM(l,e),yM(l,t),IM(l,s),EM(l,r),new _M(c,n.method,l,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wM(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function AM(...n){const e=wM();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Hp())return new Blob(n);throw new ct(ot.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function bM(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function RM(n){if(typeof atob>"u")throw uM("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class $h{constructor(e,t){this.data=e,this.contentType=t||null}}function SM(n,e){switch(n){case jn.RAW:return new $h(CA(e));case jn.BASE64:case jn.BASE64URL:return new $h(DA(n,e));case jn.DATA_URL:return new $h(CM(e),DM(e))}throw zp()}function CA(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function PM(n){let e;try{e=decodeURIComponent(n)}catch{throw Sa(jn.DATA_URL,"Malformed data URL.")}return CA(e)}function DA(n,e){switch(n){case jn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Sa(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case jn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Sa(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=RM(e)}catch(i){throw i.message.includes("polyfill")?i:Sa(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class kA{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Sa(jn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=kM(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function CM(n){const e=new kA(n);return e.base64?DA(jn.BASE64,e.rest):PM(e.rest)}function DM(n){return new kA(n).contentType}function kM(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,t){let r=0,i="";by(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(by(this.data_)){const r=this.data_,i=bM(r,e,t);return i===null?null:new Qr(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Qr(r,!0)}}static getBlob(...e){if(Hp()){const t=e.map(r=>r instanceof Qr?r.data_:r);return new Qr(AM.apply(null,t))}else{const t=e.map(o=>$p(o)?SM(jn.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new Qr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NA(n){let e;try{e=JSON.parse(n)}catch{return null}return mM(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NM(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function VM(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function VA(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OM(n,e){return e}class zt{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||OM}}let iu=null;function xM(n){return!$p(n)||n.length<2?n:VA(n)}function OA(){if(iu)return iu;const n=[];n.push(new zt("bucket")),n.push(new zt("generation")),n.push(new zt("metageneration")),n.push(new zt("name","fullPath",!0));function e(s,o){return xM(o)}const t=new zt("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new zt("size");return i.xform=r,n.push(i),n.push(new zt("timeCreated")),n.push(new zt("updated")),n.push(new zt("md5Hash",null,!0)),n.push(new zt("cacheControl",null,!0)),n.push(new zt("contentDisposition",null,!0)),n.push(new zt("contentEncoding",null,!0)),n.push(new zt("contentLanguage",null,!0)),n.push(new zt("contentType",null,!0)),n.push(new zt("metadata","customMetadata",!0)),iu=n,iu}function LM(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new ln(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function MM(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return LM(r,n),r}function xA(n,e,t){const r=NA(e);return r===null?null:MM(n,r,t)}function FM(n,e,t,r){const i=NA(e);if(i===null||!$p(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(l=>{const h=n.bucket,f=n.fullPath,m="/b/"+o(h)+"/o/"+o(f),g=Zl(m,t,r),b=PA({alt:"media",token:l});return g+b})[0]}function UM(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class Wp{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LA(n){if(!n)throw zp()}function BM(n,e){function t(r,i){const s=xA(n,i,e);return LA(s!==null),s}return t}function qM(n,e){function t(r,i){const s=xA(n,i,e);return LA(s!==null),FM(s,i,n.host,n._protocol)}return t}function MA(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=eM():i=ZL():t.getStatus()===402?i=XL(n.bucket):t.getStatus()===403?i=tM(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function FA(n){const e=MA(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=YL(n.path)),s.serverResponse=i.serverResponse,s}return t}function jM(n,e,t){const r=e.fullServerUrl(),i=Zl(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,a=new Wp(i,s,qM(n,t),o);return a.errorHandler=FA(e),a}function GM(n,e){const t=e.fullServerUrl(),r=Zl(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(c,l){}const a=new Wp(r,i,o,s);return a.successCodes=[200,204],a.errorHandler=FA(e),a}function KM(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function zM(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=KM(null,e)),r}function $M(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let x="";for(let M=0;M<2;M++)x=x+Math.random().toString().slice(2);return x}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const l=zM(e,r,i),h=UM(l,t),f="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+l.contentType+`\r
\r
`,m=`\r
--`+c+"--",g=Qr.getBlob(f,r,m);if(g===null)throw aM();const b={name:l.fullPath},R=Zl(s,n.host,n._protocol),C="POST",V=n.maxUploadRetryTime,D=new Wp(R,C,BM(n,t),V);return D.urlParams=b,D.headers=o,D.body=g.uploadData(),D.errorHandler=MA(e),D}class HM{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Yi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Yi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Yi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw Xo("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Xo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Xo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Xo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Xo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class WM extends HM{initXhr(){this.xhr_.responseType="text"}}function Qp(){return new WM}/**
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
 */class us{constructor(e,t){this._service=e,t instanceof ln?this._location=t:this._location=ln.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new us(e,t)}get root(){const e=new ln(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return VA(this._location.path)}get storage(){return this._service}get parent(){const e=NM(this._location.path);if(e===null)return null;const t=new ln(this._location.bucket,e);return new us(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw lM(e)}}function QM(n,e,t){n._throwIfRoot("uploadBytes");const r=$M(n.storage,n._location,OA(),new Qr(e,!0),t);return n.storage.makeRequestWithTokens(r,Qp).then(i=>({metadata:i,ref:n}))}function JM(n){n._throwIfRoot("getDownloadURL");const e=jM(n.storage,n._location,OA());return n.storage.makeRequestWithTokens(e,Qp).then(t=>{if(t===null)throw cM();return t})}function YM(n){n._throwIfRoot("deleteObject");const e=GM(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Qp)}function XM(n,e){const t=VM(n._location.path,e),r=new ln(n._location.bucket,t);return new us(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZM(n){return/^[A-Za-z]+:\/\//.test(n)}function eF(n,e){return new us(n,e)}function UA(n,e){if(n instanceof Jp){const t=n;if(t._bucket==null)throw oM();const r=new us(t,t._bucket);return e!=null?UA(r,e):r}else return e!==void 0?XM(n,e):n}function tF(n,e){if(e&&ZM(e)){if(n instanceof Jp)return eF(n,e);throw zd("To use ref(service, url), the first argument must be a Storage instance.")}else return UA(n,e)}function Sy(n,e){const t=e==null?void 0:e[RA];return t==null?null:ln.makeFromBucketSpec(t,n)}function nF(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Ov(i,n.app.options.projectId))}class Jp{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=bA,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=QL,this._maxUploadRetryTime=JL,this._requests=new Set,i!=null?this._bucket=ln.makeFromBucketSpec(i,this._host):this._bucket=Sy(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ln.makeFromBucketSpec(this._url,e):this._bucket=Sy(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ry("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ry("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new us(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new hM(SA());{const o=TM(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const Py="@firebase/storage",Cy="0.13.2";/**
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
 */const BA="storage";function NU(n,e,t){return n=oe(n),QM(n,e,t)}function VU(n){return n=oe(n),JM(n)}function OU(n){return n=oe(n),YM(n)}function xU(n,e){return n=oe(n),tF(n,e)}function rF(n=yl(),e){n=oe(n);const r=fo(n,BA).getImmediate({identifier:e}),i=kv("storage");return i&&iF(r,...i),r}function iF(n,e,t,r={}){nF(n,e,t,r)}function sF(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Jp(t,r,i,e,ls)}function oF(){Xi(new si(BA,sF,"PUBLIC").setMultipleInstances(!0)),Kn(Py,Cy,""),Kn(Py,Cy,"esm2017")}oF();const qA={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},eh=Ef(qA),Gt=WT(eh),In=Xu(eh),aF=rF(eh);let Rs=null;function jA(){if(Rs)return Rs;try{const n=Ef(qA,"_auth_provisioning");return Rs=Xu(n),Rs}catch{try{const e=yl("_auth_provisioning");return Rs=Xu(e),Rs}catch(e){return console.warn("[firebase] Secondary auth init fail:",e.message),null}}}const cF=Object.freeze(Object.defineProperty({__proto__:null,auth:In,db:Gt,firebaseApp:eh,getSecondaryAuth:jA,storage:aF},Symbol.toStringTag,{value:"Module"}));async function Dy(n,e){const t=await Ja(Sn(Gt,n,e));return t.exists()?{id:t.id,...t.data()}:null}async function Ss(n,e=[],t=[],r=0){const i=[];for(const[a,c,l]of e)i.push(Hr(a,c,l));for(const[a,c]of t)i.push(Ip(a,c));r>0&&i.push(ji(r));const s=On(os(Gt,n),...i);return(await nr(s)).docs.map(a=>({id:a.id,...a.data()}))}async function uF(n,e,t){await lw(Sn(Gt,n,e),t)}async function LU(n,e,t){await Ep(Sn(Gt,n,e),t)}async function MU(n,e){return(await dw(os(Gt,n),e)).id}async function FU(n,e){await hw(Sn(Gt,n,e))}function UU(n,e,t=[],r=[]){const i=[];for(const[o,a,c]of t)i.push(Hr(o,a,c));for(const[o,a]of r)i.push(Ip(o,a));const s=i.length?On(os(Gt,n),...i):os(Gt,n);return Tp(s,o=>{const a=o.docs.map(c=>({id:c.id,...c.data()}));e(a)},o=>{console.error(`[subscribeColl] ${n} error:`,o)})}function ky(n,e,t){return Tp(Sn(Gt,n,e),r=>{t(r.exists()?{id:r.id,...r.data()}:null)},r=>{console.error(`[subscribeDoc] ${n}/${e} error:`,r)})}const Hh="web",Ny="general",Wh={txtAppName:"Ammu Online",txtHeaderBar:"Ammu Online",appTitle:"Ammu Online — Pondok Pesantren Mambaul Ulum",kopLine1:"PONDOK PESANTREN MAMBAUL ULUM",kopLine2:"PORTAL PRESTASI QIRAATI",kopLine3:"",kopLine4:"",logoUrl:"",logoKop:"",logoQiraati:"",alamat:"",noTelp:"",fiturBeranda:!0,fiturKalender:!0,fiturKritikSaran:!0,fiturNotifikasi:!0,namaChannel:"Al Manshur Channel",mahad_tagihan_template:[],mahad_sub_kategori:[],tarif_fullday_default:0},GA=yf("settings",()=>{const n=cn({...Wh}),e=cn(!1),t=cn(null);let r=null;const i=Ct(()=>[n.value.kopLine1,n.value.kopLine2,n.value.kopLine3,n.value.kopLine4].filter(Boolean));let s=null;async function o(m=0){if(!e.value){e.value=!0,t.value=null;try{const[g,b]=await Promise.all([Dy("settings",Ny).catch(()=>null),Dy("settings",Hh).catch(()=>null)]);n.value={...Wh,...b||{},...g||{}}}catch(g){const b=(g==null?void 0:g.code)==="unavailable"||/offline/i.test((g==null?void 0:g.message)||"");if(b&&m<2){e.value=!1,setTimeout(()=>o(m+1),1500);return}t.value=g.message||String(g),b||console.error("[settings/load]",g)}finally{e.value=!1}}}function a(){r||(r=ky("settings",Hh,m=>{m&&(n.value={...n.value,...m,...c||{}})})),s||(s=ky("settings",Ny,m=>{m&&(c=m,n.value={...n.value,...m})}))}let c=null;function l(){r&&(r(),r=null),s&&(s(),s=null)}async function h(m){e.value=!0,t.value=null;try{const g={...n.value,...m};await uF("settings",Hh,g),n.value=g}catch(g){throw t.value=g.message||String(g),g}finally{e.value=!1}}function f(){n.value={...Wh}}return{settings:n,isLoading:e,error:t,kopLines:i,load:o,subscribe:a,unsubscribeNow:l,save:h,reset:f}}),lF={__name:"App",setup(n){const e=GA();return Ms(()=>e.settings,t=>{if(!t)return;const r=document.documentElement;t.themeColor&&r.style.setProperty("--theme-color",t.themeColor),t.appTitle&&(document.title=t.appTitle)},{deep:!0,immediate:!0}),(t,r)=>{const i=qR("router-view");return Va(),xa(i,null,{default:sd(({Component:s})=>[Bt(LS,{name:"fade",mode:"out-in"},{default:sd(()=>[(Va(),xa(jR(s)))]),_:2},1024)]),_:1})}}};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Vs=typeof document<"u";function KA(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function hF(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&KA(n.default)}const ke=Object.assign;function Qh(n,e){const t={};for(const r in e){const i=e[r];t[r]=Dn(i)?i.map(n):n(i)}return t}const Pa=()=>{},Dn=Array.isArray;function Vy(n,e){const t={};for(const r in n)t[r]=r in e?e[r]:n[r];return t}const zA=/#/g,dF=/&/g,fF=/\//g,pF=/=/g,mF=/\?/g,$A=/\+/g,gF=/%5B/g,_F=/%5D/g,HA=/%5E/g,yF=/%60/g,WA=/%7B/g,IF=/%7C/g,QA=/%7D/g,vF=/%20/g;function Yp(n){return n==null?"":encodeURI(""+n).replace(IF,"|").replace(gF,"[").replace(_F,"]")}function EF(n){return Yp(n).replace(WA,"{").replace(QA,"}").replace(HA,"^")}function $d(n){return Yp(n).replace($A,"%2B").replace(vF,"+").replace(zA,"%23").replace(dF,"%26").replace(yF,"`").replace(WA,"{").replace(QA,"}").replace(HA,"^")}function TF(n){return $d(n).replace(pF,"%3D")}function wF(n){return Yp(n).replace(zA,"%23").replace(mF,"%3F")}function AF(n){return wF(n).replace(fF,"%2F")}function nc(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const bF=/\/$/,RF=n=>n.replace(bF,"");function Jh(n,e,t="/"){let r,i={},s="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=e.slice(0,c),s=e.slice(c,a>0?a:e.length),i=n(s.slice(1))),a>=0&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=DF(r??e,t),{fullPath:r+s+o,path:r,query:i,hash:nc(o)}}function SF(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Oy(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function PF(n,e,t){const r=e.matched.length-1,i=t.matched.length-1;return r>-1&&r===i&&co(e.matched[r],t.matched[i])&&JA(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function co(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function JA(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!CF(n[t],e[t]))return!1;return!0}function CF(n,e){return Dn(n)?xy(n,e):Dn(e)?xy(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function xy(n,e){return Dn(e)?n.length===e.length&&n.every((t,r)=>t===e[r]):n.length===1&&n[0]===e}function DF(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),r=n.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=t.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const Br={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Hd=(function(n){return n.pop="pop",n.push="push",n})({}),Yh=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function kF(n){if(!n)if(Vs){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),RF(n)}const NF=/^[^#]+#/;function VF(n,e){return n.replace(NF,"#")+e}function OF(n,e){const t=document.documentElement.getBoundingClientRect(),r=n.getBoundingClientRect();return{behavior:e.behavior,left:r.left-t.left-(e.left||0),top:r.top-t.top-(e.top||0)}}const th=()=>({left:window.scrollX,top:window.scrollY});function xF(n){let e;if("el"in n){const t=n.el,r=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=OF(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ly(n,e){return(history.state?history.state.position-e:-1)+n}const Wd=new Map;function LF(n,e){Wd.set(n,e)}function MF(n){const e=Wd.get(n);return Wd.delete(n),e}function FF(n){return typeof n=="string"||n&&typeof n=="object"}function YA(n){return typeof n=="string"||typeof n=="symbol"}let rt=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const XA=Symbol("");rt.MATCHER_NOT_FOUND+"",rt.NAVIGATION_GUARD_REDIRECT+"",rt.NAVIGATION_ABORTED+"",rt.NAVIGATION_CANCELLED+"",rt.NAVIGATION_DUPLICATED+"";function uo(n,e){return ke(new Error,{type:n,[XA]:!0},e)}function er(n,e){return n instanceof Error&&XA in n&&(e==null||!!(n.type&e))}const UF=["params","query","hash"];function BF(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of UF)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function qF(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<t.length;++r){const i=t[r].replace($A," "),s=i.indexOf("="),o=nc(s<0?i:i.slice(0,s)),a=s<0?null:nc(i.slice(s+1));if(o in e){let c=e[o];Dn(c)||(c=e[o]=[c]),c.push(a)}else e[o]=a}return e}function My(n){let e="";for(let t in n){const r=n[t];if(t=TF(t),r==null){r!==void 0&&(e+=(e.length?"&":"")+t);continue}(Dn(r)?r.map(i=>i&&$d(i)):[r&&$d(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function jF(n){const e={};for(const t in n){const r=n[t];r!==void 0&&(e[t]=Dn(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const GF=Symbol(""),Fy=Symbol(""),nh=Symbol(""),Xp=Symbol(""),Qd=Symbol("");function Zo(){let n=[];function e(r){return n.push(r),()=>{const i=n.indexOf(r);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Kr(n,e,t,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,c)=>{const l=m=>{m===!1?c(uo(rt.NAVIGATION_ABORTED,{from:t,to:e})):m instanceof Error?c(m):FF(m)?c(uo(rt.NAVIGATION_GUARD_REDIRECT,{from:e,to:m})):(o&&r.enterCallbacks[i]===o&&typeof m=="function"&&o.push(m),a())},h=s(()=>n.call(r&&r.instances[i],e,t,l));let f=Promise.resolve(h);n.length<3&&(f=f.then(l)),f.catch(m=>c(m))})}function Xh(n,e,t,r,i=s=>s()){const s=[];for(const o of n)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(KA(c)){const l=(c.__vccOpts||c)[e];l&&s.push(Kr(l,t,r,o,a,i))}else{let l=c();s.push(()=>l.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=hF(h)?h.default:h;o.mods[a]=h,o.components[a]=f;const m=(f.__vccOpts||f)[e];return m&&Kr(m,t,r,o,a,i)()}))}}return s}function KF(n,e){const t=[],r=[],i=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(l=>co(l,a))?r.push(a):t.push(a));const c=n.matched[o];c&&(e.matched.find(l=>co(l,c))||i.push(c))}return[t,r,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let zF=()=>location.protocol+"//"+location.host;function ZA(n,e){const{pathname:t,search:r,hash:i}=e,s=n.indexOf("#");if(s>-1){let o=i.includes(n.slice(s))?n.slice(s).length:1,a=i.slice(o);return a[0]!=="/"&&(a="/"+a),Oy(a,"")}return Oy(t,n)+r+i}function $F(n,e,t,r){let i=[],s=[],o=null;const a=({state:m})=>{const g=ZA(n,location),b=t.value,R=e.value;let C=0;if(m){if(t.value=g,e.value=m,o&&o===b){o=null;return}C=R?m.position-R.position:0}else r(g);i.forEach(V=>{V(t.value,b,{delta:C,type:Hd.pop,direction:C?C>0?Yh.forward:Yh.back:Yh.unknown})})};function c(){o=t.value}function l(m){i.push(m);const g=()=>{const b=i.indexOf(m);b>-1&&i.splice(b,1)};return s.push(g),g}function h(){if(document.visibilityState==="hidden"){const{history:m}=window;if(!m.state)return;m.replaceState(ke({},m.state,{scroll:th()}),"")}}function f(){for(const m of s)m();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",h),document.removeEventListener("visibilitychange",h)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",h),document.addEventListener("visibilitychange",h),{pauseListeners:c,listen:l,destroy:f}}function Uy(n,e,t,r=!1,i=!1){return{back:n,current:e,forward:t,replaced:r,position:window.history.length,scroll:i?th():null}}function HF(n){const{history:e,location:t}=window,r={value:ZA(n,t)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(c,l,h){const f=n.indexOf("#"),m=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+c:zF()+n+c;try{e[h?"replaceState":"pushState"](l,"",m),i.value=l}catch(g){console.error(g),t[h?"replace":"assign"](m)}}function o(c,l){s(c,ke({},e.state,Uy(i.value.back,c,i.value.forward,!0),l,{position:i.value.position}),!0),r.value=c}function a(c,l){const h=ke({},i.value,e.state,{forward:c,scroll:th()});s(h.current,h,!0),s(c,ke({},Uy(r.value,c,null),{position:h.position+1},l),!1),r.value=c}return{location:r,state:i,push:a,replace:o}}function WF(n){n=kF(n);const e=HF(n),t=$F(n,e.state,e.location,e.replace);function r(s,o=!0){o||t.pauseListeners(),history.go(s)}const i=ke({location:"",base:n,go:r,createHref:VF.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function QF(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),WF(n)}let Ki=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var gt=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(gt||{});const JF={type:Ki.Static,value:""},YF=/[a-zA-Z0-9_]/;function XF(n){if(!n)return[[]];if(n==="/")return[[JF]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${l}": ${g}`)}let t=gt.Static,r=t;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,c,l="",h="";function f(){l&&(t===gt.Static?s.push({type:Ki.Static,value:l}):t===gt.Param||t===gt.ParamRegExp||t===gt.ParamRegExpEnd?(s.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:Ki.Param,value:l,regexp:h,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function m(){l+=c}for(;a<n.length;){if(c=n[a++],c==="\\"&&t!==gt.ParamRegExp){r=t,t=gt.EscapeNext;continue}switch(t){case gt.Static:c==="/"?(l&&f(),o()):c===":"?(f(),t=gt.Param):m();break;case gt.EscapeNext:m(),t=r;break;case gt.Param:c==="("?t=gt.ParamRegExp:YF.test(c)?m():(f(),t=gt.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case gt.ParamRegExp:c===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+c:t=gt.ParamRegExpEnd:h+=c;break;case gt.ParamRegExpEnd:f(),t=gt.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,h="";break;default:e("Unknown state");break}}return t===gt.ParamRegExp&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),i}const By="[^/]+?",ZF={sensitive:!1,strict:!1,start:!0,end:!0};var Wt=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Wt||{});const e1=/[.+*?^${}()[\]/\\]/g;function t1(n,e){const t=ke({},ZF,e),r=[];let i=t.start?"^":"";const s=[];for(const l of n){const h=l.length?[]:[Wt.Root];t.strict&&!l.length&&(i+="/");for(let f=0;f<l.length;f++){const m=l[f];let g=Wt.Segment+(t.sensitive?Wt.BonusCaseSensitive:0);if(m.type===Ki.Static)f||(i+="/"),i+=m.value.replace(e1,"\\$&"),g+=Wt.Static;else if(m.type===Ki.Param){const{value:b,repeatable:R,optional:C,regexp:V}=m;s.push({name:b,repeatable:R,optional:C});const D=V||By;if(D!==By){g+=Wt.BonusCustomRegExp;try{`${D}`}catch(M){throw new Error(`Invalid custom RegExp for param "${b}" (${D}): `+M.message)}}let x=R?`((?:${D})(?:/(?:${D}))*)`:`(${D})`;f||(x=C&&l.length<2?`(?:/${x})`:"/"+x),C&&(x+="?"),i+=x,g+=Wt.Dynamic,C&&(g+=Wt.BonusOptional),R&&(g+=Wt.BonusRepeatable),D===".*"&&(g+=Wt.BonusWildcard)}h.push(g)}r.push(h)}if(t.strict&&t.end){const l=r.length-1;r[l][r[l].length-1]+=Wt.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function a(l){const h=l.match(o),f={};if(!h)return null;for(let m=1;m<h.length;m++){const g=h[m]||"",b=s[m-1];f[b.name]=g&&b.repeatable?g.split("/"):g}return f}function c(l){let h="",f=!1;for(const m of n){(!f||!h.endsWith("/"))&&(h+="/"),f=!1;for(const g of m)if(g.type===Ki.Static)h+=g.value;else if(g.type===Ki.Param){const{value:b,repeatable:R,optional:C}=g,V=b in l?l[b]:"";if(Dn(V)&&!R)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const D=Dn(V)?V.join("/"):V;if(!D)if(C)m.length<2&&(h.endsWith("/")?h=h.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);h+=D}}return h||"/"}return{re:o,score:r,keys:s,parse:a,stringify:c}}function n1(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=e[t]-n[t];if(r)return r;t++}return n.length<e.length?n.length===1&&n[0]===Wt.Static+Wt.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Wt.Static+Wt.Segment?1:-1:0}function eb(n,e){let t=0;const r=n.score,i=e.score;for(;t<r.length&&t<i.length;){const s=n1(r[t],i[t]);if(s)return s;t++}if(Math.abs(i.length-r.length)===1){if(qy(r))return 1;if(qy(i))return-1}return i.length-r.length}function qy(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const r1={strict:!1,end:!0,sensitive:!1};function i1(n,e,t){const r=t1(XF(n.path),t),i=ke(r,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function s1(n,e){const t=[],r=new Map;e=Vy(r1,e);function i(f){return r.get(f)}function s(f,m,g){const b=!g,R=Gy(f);R.aliasOf=g&&g.record;const C=Vy(e,f),V=[R];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const H of M)V.push(Gy(ke({},R,{components:g?g.record.components:R.components,path:H,aliasOf:g?g.record:R})))}let D,x;for(const M of V){const{path:H}=M;if(m&&H[0]!=="/"){const j=m.record.path,E=j[j.length-1]==="/"?"":"/";M.path=m.record.path+(H&&E+H)}if(D=i1(M,m,C),g?g.alias.push(D):(x=x||D,x!==D&&x.alias.push(D),b&&f.name&&!Ky(D)&&o(f.name)),tb(D)&&c(D),R.children){const j=R.children;for(let E=0;E<j.length;E++)s(j[E],D,g&&g.children[E])}g=g||D}return x?()=>{o(x)}:Pa}function o(f){if(YA(f)){const m=r.get(f);m&&(r.delete(f),t.splice(t.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=t.indexOf(f);m>-1&&(t.splice(m,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function c(f){const m=c1(f,t);t.splice(m,0,f),f.record.name&&!Ky(f)&&r.set(f.record.name,f)}function l(f,m){let g,b={},R,C;if("name"in f&&f.name){if(g=r.get(f.name),!g)throw uo(rt.MATCHER_NOT_FOUND,{location:f});C=g.record.name,b=ke(jy(m.params,g.keys.filter(x=>!x.optional).concat(g.parent?g.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),f.params&&jy(f.params,g.keys.map(x=>x.name))),R=g.stringify(b)}else if(f.path!=null)R=f.path,g=t.find(x=>x.re.test(R)),g&&(b=g.parse(R),C=g.record.name);else{if(g=m.name?r.get(m.name):t.find(x=>x.re.test(m.path)),!g)throw uo(rt.MATCHER_NOT_FOUND,{location:f,currentLocation:m});C=g.record.name,b=ke({},m.params,f.params),R=g.stringify(b)}const V=[];let D=g;for(;D;)V.unshift(D.record),D=D.parent;return{name:C,path:R,params:b,matched:V,meta:a1(V)}}n.forEach(f=>s(f));function h(){t.length=0,r.clear()}return{addRoute:s,resolve:l,removeRoute:o,clearRoutes:h,getRoutes:a,getRecordMatcher:i}}function jy(n,e){const t={};for(const r of e)r in n&&(t[r]=n[r]);return t}function Gy(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:o1(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function o1(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const r in n.components)e[r]=typeof t=="object"?t[r]:t;return e}function Ky(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function a1(n){return n.reduce((e,t)=>ke(e,t.meta),{})}function c1(n,e){let t=0,r=e.length;for(;t!==r;){const s=t+r>>1;eb(n,e[s])<0?r=s:t=s+1}const i=u1(n);return i&&(r=e.lastIndexOf(i,r-1)),r}function u1(n){let e=n;for(;e=e.parent;)if(tb(e)&&eb(n,e)===0)return e}function tb({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function zy(n){const e=vn(nh),t=vn(Xp),r=Ct(()=>{const c=$i(n.to);return e.resolve(c)}),i=Ct(()=>{const{matched:c}=r.value,{length:l}=c,h=c[l-1],f=t.matched;if(!h||!f.length)return-1;const m=f.findIndex(co.bind(null,h));if(m>-1)return m;const g=$y(c[l-2]);return l>1&&$y(h)===g&&f[f.length-1].path!==g?f.findIndex(co.bind(null,c[l-2])):m}),s=Ct(()=>i.value>-1&&p1(t.params,r.value.params)),o=Ct(()=>i.value>-1&&i.value===t.matched.length-1&&JA(t.params,r.value.params));function a(c={}){if(f1(c)){const l=e[$i(n.replace)?"replace":"push"]($i(n.to)).catch(Pa);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:r,href:Ct(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function l1(n){return n.length===1?n[0]:n}const h1=jI({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:zy,setup(n,{slots:e}){const t=ic(zy(n)),{options:r}=vn(nh),i=Ct(()=>({[Hy(n.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[Hy(n.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&l1(e.default(t));return n.custom?s:_f("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},s)}}}),d1=h1;function f1(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function p1(n,e){for(const t in e){const r=e[t],i=n[t];if(typeof r=="string"){if(r!==i)return!1}else if(!Dn(i)||i.length!==r.length||r.some((s,o)=>s.valueOf()!==i[o].valueOf()))return!1}return!0}function $y(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Hy=(n,e,t)=>n??e??t,m1=jI({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const r=vn(Qd),i=Ct(()=>n.route||r.value),s=vn(Fy,0),o=Ct(()=>{let l=$i(s);const{matched:h}=i.value;let f;for(;(f=h[l])&&!f.components;)l++;return l}),a=Ct(()=>i.value.matched[o.value]);ou(Fy,Ct(()=>o.value+1)),ou(GF,a),ou(Qd,i);const c=cn();return Ms(()=>[c.value,a.value,n.name],([l,h,f],[m,g,b])=>{h&&(h.instances[f]=l,g&&g!==h&&l&&l===m&&(h.leaveGuards.size||(h.leaveGuards=g.leaveGuards),h.updateGuards.size||(h.updateGuards=g.updateGuards))),l&&h&&(!g||!co(h,g)||!m)&&(h.enterCallbacks[f]||[]).forEach(R=>R(l))},{flush:"post"}),()=>{const l=i.value,h=n.name,f=a.value,m=f&&f.components[h];if(!m)return Wy(t.default,{Component:m,route:l});const g=f.props[h],b=g?g===!0?l.params:typeof g=="function"?g(l):g:null,C=_f(m,ke({},b,e,{onVnodeUnmounted:V=>{V.component.isUnmounted&&(f.instances[h]=null)},ref:c}));return Wy(t.default,{Component:C,route:l})||C}}});function Wy(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const g1=m1;function _1(n){const e=s1(n.routes,n),t=n.parseQuery||qF,r=n.stringifyQuery||My,i=n.history,s=Zo(),o=Zo(),a=Zo(),c=cR(Br);let l=Br;Vs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Qh.bind(null,B=>""+B),f=Qh.bind(null,AF),m=Qh.bind(null,nc);function g(B,ie){let te,ce;return YA(B)?(te=e.getRecordMatcher(B),ce=ie):ce=B,e.addRoute(ce,te)}function b(B){const ie=e.getRecordMatcher(B);ie&&e.removeRoute(ie)}function R(){return e.getRoutes().map(B=>B.record)}function C(B){return!!e.getRecordMatcher(B)}function V(B,ie){if(ie=ke({},ie||c.value),typeof B=="string"){const k=Jh(t,B,ie.path),U=e.resolve({path:k.path},ie),G=i.createHref(k.fullPath);return ke(k,U,{params:m(U.params),hash:nc(k.hash),redirectedFrom:void 0,href:G})}let te;if(B.path!=null)te=ke({},B,{path:Jh(t,B.path,ie.path).path});else{const k=ke({},B.params);for(const U in k)k[U]==null&&delete k[U];te=ke({},B,{params:f(k)}),ie.params=f(ie.params)}const ce=e.resolve(te,ie),ve=B.hash||"";ce.params=h(m(ce.params));const w=SF(r,ke({},B,{hash:EF(ve),path:ce.path})),S=i.createHref(w);return ke({fullPath:w,hash:ve,query:r===My?jF(B.query):B.query||{}},ce,{redirectedFrom:void 0,href:S})}function D(B){return typeof B=="string"?Jh(t,B,c.value.path):ke({},B)}function x(B,ie){if(l!==B)return uo(rt.NAVIGATION_CANCELLED,{from:ie,to:B})}function M(B){return E(B)}function H(B){return M(ke(D(B),{replace:!0}))}function j(B,ie){const te=B.matched[B.matched.length-1];if(te&&te.redirect){const{redirect:ce}=te;let ve=typeof ce=="function"?ce(B,ie):ce;return typeof ve=="string"&&(ve=ve.includes("?")||ve.includes("#")?ve=D(ve):{path:ve},ve.params={}),ke({query:B.query,hash:B.hash,params:ve.path!=null?{}:B.params},ve)}}function E(B,ie){const te=l=V(B),ce=c.value,ve=B.state,w=B.force,S=B.replace===!0,k=j(te,ce);if(k)return E(ke(D(k),{state:typeof k=="object"?ke({},ve,k.state):ve,force:w,replace:S}),ie||te);const U=te;U.redirectedFrom=ie;let G;return!w&&PF(r,ce,te)&&(G=uo(rt.NAVIGATION_DUPLICATED,{to:U,from:ce}),mn(ce,ce,!0,!1)),(G?Promise.resolve(G):v(U,ce)).catch(q=>er(q)?er(q,rt.NAVIGATION_GUARD_REDIRECT)?q:wn(q):Te(q,U,ce)).then(q=>{if(q){if(er(q,rt.NAVIGATION_GUARD_REDIRECT))return E(ke({replace:S},D(q.to),{state:typeof q.to=="object"?ke({},ve,q.to.state):ve,force:w}),ie||U)}else q=A(U,ce,!0,S,ve);return P(U,ce,q),q})}function _(B,ie){const te=x(B,ie);return te?Promise.reject(te):Promise.resolve()}function y(B){const ie=kr.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(B):B()}function v(B,ie){let te;const[ce,ve,w]=KF(B,ie);te=Xh(ce.reverse(),"beforeRouteLeave",B,ie);for(const k of ce)k.leaveGuards.forEach(U=>{te.push(Kr(U,B,ie))});const S=_.bind(null,B,ie);return te.push(S),Xt(te).then(()=>{te=[];for(const k of s.list())te.push(Kr(k,B,ie));return te.push(S),Xt(te)}).then(()=>{te=Xh(ve,"beforeRouteUpdate",B,ie);for(const k of ve)k.updateGuards.forEach(U=>{te.push(Kr(U,B,ie))});return te.push(S),Xt(te)}).then(()=>{te=[];for(const k of w)if(k.beforeEnter)if(Dn(k.beforeEnter))for(const U of k.beforeEnter)te.push(Kr(U,B,ie));else te.push(Kr(k.beforeEnter,B,ie));return te.push(S),Xt(te)}).then(()=>(B.matched.forEach(k=>k.enterCallbacks={}),te=Xh(w,"beforeRouteEnter",B,ie,y),te.push(S),Xt(te))).then(()=>{te=[];for(const k of o.list())te.push(Kr(k,B,ie));return te.push(S),Xt(te)}).catch(k=>er(k,rt.NAVIGATION_CANCELLED)?k:Promise.reject(k))}function P(B,ie,te){a.list().forEach(ce=>y(()=>ce(B,ie,te)))}function A(B,ie,te,ce,ve){const w=x(B,ie);if(w)return w;const S=ie===Br,k=Vs?history.state:{};te&&(ce||S?i.replace(B.fullPath,ke({scroll:S&&k&&k.scroll},ve)):i.push(B.fullPath,ve)),c.value=B,mn(B,ie,te,S),wn()}let T;function Se(){T||(T=i.listen((B,ie,te)=>{if(!sn.listening)return;const ce=V(B),ve=j(ce,sn.currentRoute.value);if(ve){E(ke(ve,{replace:!0,force:!0}),ce).catch(Pa);return}l=ce;const w=c.value;Vs&&LF(Ly(w.fullPath,te.delta),th()),v(ce,w).catch(S=>er(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_CANCELLED)?S:er(S,rt.NAVIGATION_GUARD_REDIRECT)?(E(ke(D(S.to),{force:!0}),ce).then(k=>{er(k,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&!te.delta&&te.type===Hd.pop&&i.go(-1,!1)}).catch(Pa),Promise.reject()):(te.delta&&i.go(-te.delta,!1),Te(S,ce,w))).then(S=>{S=S||A(ce,w,!1),S&&(te.delta&&!er(S,rt.NAVIGATION_CANCELLED)?i.go(-te.delta,!1):te.type===Hd.pop&&er(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),P(ce,w,S)}).catch(Pa)}))}let ut=Zo(),Oe=Zo(),pe;function Te(B,ie,te){wn(B);const ce=Oe.list();return ce.length?ce.forEach(ve=>ve(B,ie,te)):console.error(B),Promise.reject(B)}function rn(){return pe&&c.value!==Br?Promise.resolve():new Promise((B,ie)=>{ut.add([B,ie])})}function wn(B){return pe||(pe=!B,Se(),ut.list().forEach(([ie,te])=>B?te(B):ie()),ut.reset()),B}function mn(B,ie,te,ce){const{scrollBehavior:ve}=n;if(!Vs||!ve)return Promise.resolve();const w=!te&&MF(Ly(B.fullPath,0))||(ce||!te)&&history.state&&history.state.scroll||null;return ll().then(()=>ve(B,ie,w)).then(S=>S&&xF(S)).catch(S=>Te(S,B,ie))}const Xe=B=>i.go(B);let Ze;const kr=new Set,sn={currentRoute:c,listening:!0,addRoute:g,removeRoute:b,clearRoutes:e.clearRoutes,hasRoute:C,getRoutes:R,resolve:V,options:n,push:M,replace:H,go:Xe,back:()=>Xe(-1),forward:()=>Xe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:Oe.add,isReady:rn,install(B){B.component("RouterLink",d1),B.component("RouterView",g1),B.config.globalProperties.$router=sn,Object.defineProperty(B.config.globalProperties,"$route",{enumerable:!0,get:()=>$i(c)}),Vs&&!Ze&&c.value===Br&&(Ze=!0,M(i.location).catch(ce=>{}));const ie={};for(const ce in Br)Object.defineProperty(ie,ce,{get:()=>c.value[ce],enumerable:!0});B.provide(nh,sn),B.provide(Xp,RI(ie)),B.provide(Qd,c);const te=B.unmount;kr.add(B),B.unmount=function(){kr.delete(B),kr.size<1&&(l=Br,T&&T(),T=null,c.value=Br,Ze=!1,pe=!1),te()}}};function Xt(B){return B.reduce((ie,te)=>ie.then(()=>y(te)),Promise.resolve())}return sn}function BU(){return vn(nh)}function qU(n){return vn(Xp)}const y1=new Fn;function ea(n){return"mu_auth_"+String(n||"")}function I1(n){const e=String(n||"").toLowerCase().replace(/[^a-z0-9._-]/g,"");return e?e+"@portal-mu.local":null}async function v1(n){const e=String(n||"").trim(),t=e.toLowerCase(),r=e.replace(/\D/g,"");try{const h=await Ja(Sn(Gt,"settings","web")),f=(h.exists()?h.data().adminUsername:"adminmu")||"adminmu";if(t==="adminmu"||t===f.toLowerCase())return{source:"admin",data:{id:"admin",username:f},authKey:f.toLowerCase()}}catch{if(t==="adminmu")return{source:"admin",data:{id:"admin",username:"adminmu"},authKey:"adminmu"}}const i=os(Gt,"guru");let s=null,o=await nr(On(i,Hr("username","==",e),ji(1)));if(o.empty||(s=o.docs[0]),!s&&r.length>=8&&(o=await nr(On(i,Hr("wa","==",r),ji(1))),o.empty||(s=o.docs[0])),!s&&/[a-z]/i.test(e)&&(s=(await nr(On(i))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),s){const h={id:s.id,...s.data()},f=String(h.wa||"").replace(/\D/g,""),m=f.length>=8?f:h.username||String(h.id);return{source:"guru",data:h,authKey:m}}const a=os(Gt,"santri");let c=null,l=await nr(On(a,Hr("username","==",e),ji(1)));if(l.empty||(c=l.docs[0]),!c&&r.length>=8&&(l=await nr(On(a,Hr("wa","==",r),ji(1))),l.empty||(c=l.docs[0])),c||(l=await nr(On(a,Hr("nis","==",e),ji(1))),l.empty||(c=l.docs[0])),!c&&/[a-z]/i.test(e)&&(c=(await nr(On(a))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),c){const h={id:c.id,...c.data()},f=String(h.wa||"").replace(/\D/g,""),m=f.length>=8?f:h.username||h.nis||String(h.id);return{source:"santri",data:h,authKey:m}}return null}async function E1(n,e,t=!0){if(await Qu(In,t?$l:Hl),n.source==="admin"){const a=await Ja(Sn(Gt,"settings","admin")).catch(()=>null),c=await Ja(Sn(Gt,"settings","web")).catch(()=>null),l=(a==null?void 0:a.exists())&&(a.data().password||a.data().adminPassword)||(c==null?void 0:c.exists())&&c.data().adminPassword||"1234";if(e!==l){const h=new Error("Sandi admin salah");throw h.code="auth/wrong-password",h}return{authMethod:"admin-builtin",user:null}}const r=I1(n.authKey);if(!r)throw new Error("Username/WA tidak valid untuk Auth");let i=null;try{return i=await ha(In,r,ea(e)),{authMethod:"firebase-padded",user:i.user}}catch(a){const c=a.code||"";if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(c))throw a;try{i=await ha(In,r,e);try{const{updatePassword:h}=await ge(async()=>{const{updatePassword:f}=await Promise.resolve().then(()=>WL);return{updatePassword:f}},void 0);await h(i.user,ea(e))}catch(h){console.warn("[auth] Password upgrade fail:",h.message)}return{authMethod:"firebase-raw-upgraded",user:i.user}}catch(h){if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(h.code))throw h}}const s=n.data.password||"1234";if(e!==s){const a=new Error("Kata sandi salah");throw a.code="auth/wrong-password",a}const o=jA();if(!o)throw new Error("Secondary Firebase Auth init fail");try{const a=await tA(o,r,ea(e));try{await Ep(Sn(Gt,n.source,String(n.data.id)),{firebase_uid:a.user.uid,email_auth:r,password_migrated:!0})}catch(l){console.warn("[auth] Firestore migration tag fail:",l.message)}try{await Lp(o)}catch{}return{authMethod:"firebase-migrated",user:(await ha(In,r,ea(e))).user}}catch(a){if(a.code==="auth/email-already-in-use")return{authMethod:"firebase-already-exists",user:(await ha(In,r,ea(e))).user};throw a}}async function jU(){return mA(In,y1)}async function Zh(){return Lp(In)}const Qy="@portal-mu.local",Jd="portalMu_sesiAdminBuiltIn";function ed(n){try{n&&n.auth_method==="admin-builtin"?localStorage.setItem(Jd,JSON.stringify(n)):localStorage.removeItem(Jd)}catch{}}function T1(){try{const n=localStorage.getItem(Jd);if(!n)return null;const e=JSON.parse(n);return e&&e.auth_method==="admin-builtin"&&e.role==="admin"?e:null}catch{return null}}const nb=yf("auth",()=>{const n=cn(null),e=cn(null),t=cn(!1),r=cn(null);let i=null;const s=new Promise(V=>{i=V}),o=Ct(()=>n.value!==null),a=Ct(()=>{var V;return((V=n.value)==null?void 0:V.role)==="admin"}),c=Ct(()=>{var V;return((V=n.value)==null?void 0:V.role)==="guru"}),l=Ct(()=>{var V;return((V=n.value)==null?void 0:V.role)==="santri"});function h(V){var x;if(!n.value)return!1;const D=n.value;return D.id==="admin"||D.role_sistem==="super_admin"||D.role_sistem==="admin_keuangan"&&V==="akses_keuangan"||D.role_sistem==="admin"&&V!=="akses_keuangan"?!0:((x=D.akses)==null?void 0:x[V])===!0}async function f(V,D,x=!0){var M,H,j,E;t.value=!0,r.value=null;try{const _=await v1(V);if(!_){const v=new Error("Username tidak ditemukan. Pastikan ketik dengan benar — Guru/Pegawai bisa pakai username atau no WA, Santri pakai NIS atau no WA wali.");throw v.code="auth/not-found",v}if(_.source==="guru"&&_.data.status==="Tidak Aktif")throw new Error("Akun guru berstatus tidak aktif. Hubungi administrator.");if(_.source==="santri"&&_.data.aktif===!1)throw new Error("Akun santri tidak aktif. Hubungi administrator.");const y=await E1(_,D,x);if(_.source==="admin"){n.value={id:"admin",role:"admin",role_sistem:"super_admin",nama:"Administrator",guru:"Admin Utama",jk:"L",jabatan:"Administrator",lembaga:"Semua Data",akses:{kelola_guru:!0,akses_keuangan:!0,kelola_santri:!0,kelola_lembaga:!0,kelola_kelas:!0},auth_method:"admin-builtin"},ed(n.value);return}if(_.source!=="admin"&&ed(null),_.source==="guru"){const v=_.data,P=v.role_sistem||"user",A=["admin","admin_keuangan","super_admin"].includes(P);n.value={id:v.id,role:A?"admin":"guru",role_sistem:P,nama:v.nama,guru:v.nama,lembaga:A?"Semua Data":v.lembaga||"",jk:v.jk||"",jabatan:v.jabatan||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",akses:v.akses||{},auth_method:y.authMethod,firebase_uid:(M=y.user)==null?void 0:M.uid,firebase_email:(H=y.user)==null?void 0:H.email},e.value=y.user;return}if(_.source==="santri"){const v=_.data;n.value={id:v.id,role:"santri",role_sistem:"santri",nama:v.nama,nis:v.nis||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",lembaga:v.lembaga||"",kelas:v.kelas||"",wali:v.wali||"",auth_method:y.authMethod,firebase_uid:(j=y.user)==null?void 0:j.uid,firebase_email:(E=y.user)==null?void 0:E.email},e.value=y.user;return}}catch(_){const y=_.code||"";let v=_.message||String(_);y==="auth/wrong-password"||y==="auth/invalid-credential"?v="Kata sandi salah":y==="auth/too-many-requests"?v="Terlalu banyak percobaan. Coba lagi dalam beberapa menit.":y==="auth/network-request-failed"&&(v="Koneksi bermasalah. Periksa internet Anda."),r.value=v;const P=new Error(v);throw P.code=y,P}finally{t.value=!1}}async function m(V){if(!V)return;const D=V.uid,x=(V.email||"").toLowerCase();let M=await Ss("guru",[["linked_uid","==",D]],[],1),H=[];if(M.length===0&&(H=await Ss("santri",[["linked_uid","==",D]],[],1)),M.length===0&&H.length===0&&x&&(M=await Ss("guru",[["linked_email","==",x]],[],1),M.length===0&&(H=await Ss("santri",[["linked_email","==",x]],[],1))),M.length===0&&H.length===0&&x.endsWith(Qy)){const j=x.replace(Qy,"");j&&j!=="admin"&&(M=await Ss("guru",[["wa","==",j]],[],1),M.length===0&&(H=await Ss("santri",[["wa","==",j]],[],1)))}if(M.length>0){const j=M[0];if(j.status==="Tidak Aktif")throw await Zh(),new Error("Akun guru berstatus tidak aktif");const E=j.role_sistem||"user",_=["admin","admin_keuangan","super_admin"].includes(E);n.value={id:j.id,role:_?"admin":"guru",role_sistem:E,nama:j.nama,guru:j.nama,lembaga:_?"Semua Data":j.lembaga||"",jk:j.jk||"",jabatan:j.jabatan||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",akses:j.akses||{},auth_method:"firebase",firebase_uid:D,firebase_email:V.email};return}if(H.length>0){const j=H[0];if(j.aktif===!1)throw await Zh(),new Error("Akun santri tidak aktif");n.value={id:j.id,role:"santri",role_sistem:"santri",nama:j.nama,nis:j.nis||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",lembaga:j.lembaga||"",kelas:j.kelas||"",wali:j.wali||"",auth_method:"firebase",firebase_uid:D,firebase_email:V.email};return}throw console.warn("[auth.loadSesiFromUser] Firebase user authenticated tapi tidak match guru/santri:",x),n.value=null,new Error("Akun terautentikasi tapi belum terdaftar sebagai guru/santri di sistem.")}async function g(){await Zh(),n.value=null,e.value=null,ed(null)}function b(V){n.value=V}function R(){if(n.value||In.currentUser)return;const V=T1();V&&(n.value=V)}function C(){R(),Qu(In,Bp).catch(()=>Qu(In,$l)).catch(D=>{console.warn("[auth.initAuth] setPersistence fail:",D==null?void 0:D.message)});let V=!1;oA(In,async D=>{if(D){e.value=D;try{await m(D)}catch(x){console.warn("[auth.initAuth] loadSesiFromUser fail:",x.message)}}!V&&i&&(V=!0,i())}),setTimeout(()=>{!V&&i&&(V=!0,i())},3e3)}return{sesiAktif:n,fbUser:e,isLoading:t,error:r,authReady:s,isLoggedIn:o,isAdmin:a,isGuru:c,isSantri:l,hasAccess:h,cekHakAkses:h,login:f,logout:g,setSesi:b,setSesiAktif:b,restoreAdminSesiFromStorage:R,initAuth:C,loadSesiFromUser:m}}),w1=()=>ge(()=>import("./LoginView-CZG7a8sF.js"),__vite__mapDeps([0,1,2])),A1=()=>ge(()=>import("./DashboardView-BS7oiQbv.js"),__vite__mapDeps([3,1,4,5,6,7,8,9])),b1=()=>ge(()=>import("./PengaturanView-Bdbef6VE.js"),__vite__mapDeps([10,2,11,5,12,13])),R1=()=>ge(()=>import("./ProfilView-BuOhDrfp.js"),__vite__mapDeps([14,1,6,2,11])),S1=()=>ge(()=>import("./SantriView-DcWiV53a.js"),__vite__mapDeps([15,16,5,6,17,18,19,2,11])),P1=()=>ge(()=>import("./GuruView-p6k94XL-.js"),__vite__mapDeps([20,17,2,18,19,4,5,11,6])),C1=()=>ge(()=>import("./KelasView-yHDjZqJr.js"),[]),D1=()=>ge(()=>import("./FieldSchemaView-EAcB42-e.js"),__vite__mapDeps([21,11,2])),k1=()=>ge(()=>import("./MasterFormBridgeView-DipyZIqA.js"),[]),N1=()=>ge(()=>import("./KeuanganDashboardView-B0iT7rVY.js"),__vite__mapDeps([22,23,6])),V1=()=>ge(()=>import("./TagihanView-BotanczJ.js"),__vite__mapDeps([24,2,11,6])),O1=()=>ge(()=>import("./TabunganView-49yEQUb1.js"),__vite__mapDeps([25,2,6])),x1=()=>ge(()=>import("./BisyarohView-y8goAHAU.js"),__vite__mapDeps([26,2,11,6])),L1=()=>ge(()=>import("./KritikSaranView-DHLVpq_8.js"),__vite__mapDeps([27,2,6])),M1=()=>ge(()=>import("./AbsensiGuruView-DZDkrMRb.js"),__vite__mapDeps([28,17,2,19])),Jy=()=>ge(()=>import("./SantriFormView-MYMQuFA4.js"),__vite__mapDeps([29,2,6])),Yy=()=>ge(()=>import("./GuruFormView-Dwkt5YVm.js"),__vite__mapDeps([30,2,6])),Xy=()=>ge(()=>import("./LembagaFormView-B8G6nMwf.js"),__vite__mapDeps([31,2])),F1=()=>ge(()=>import("./LembagaDetailView-DIGGHLIp.js"),__vite__mapDeps([32,5,2,11,12])),U1=()=>ge(()=>import("./AbsensiSantriView-DD4liVim.js"),__vite__mapDeps([33,2,11,6])),B1=()=>ge(()=>import("./PostsView-C-wsrFfS.js"),__vite__mapDeps([34,1,2,11])),q1=()=>ge(()=>import("./BukuIndukView-u_ytVblB.js"),__vite__mapDeps([35,17,18,19,2,6])),j1=()=>ge(()=>import("./LaporanKeuanganView-CwBXNQaz.js"),__vite__mapDeps([36,6])),G1=()=>ge(()=>import("./PpdbFormView-CGA9X5yO.js"),[]),K1=()=>ge(()=>import("./PpdbAdminView-M-_Zt0Yv.js"),__vite__mapDeps([37,2])),z1=()=>ge(()=>import("./PpdbDetailView-CbIAoil2.js"),__vite__mapDeps([38,2,11])),$1=()=>ge(()=>import("./PosSantriView-BtelVJxw.js"),__vite__mapDeps([39,2,6])),H1=()=>ge(()=>import("./NaikKelasView-Dh_il72t.js"),__vite__mapDeps([40,2])),W1=()=>ge(()=>import("./KalenderKegiatanView-EJ9TajVo.js"),__vite__mapDeps([41,2,11,7])),Q1=()=>ge(()=>import("./StatistikView-B_sRKu26.js"),__vite__mapDeps([42,1,16,5,4])),J1=()=>ge(()=>import("./InputBulananView-C-NUZx6n.js"),[]),Y1=()=>ge(()=>import("./RekapPrestasiView-BhLHH56I.js"),[]),X1=()=>ge(()=>import("./RekapDiniyahView-COEhXoBS.js"),[]),Z1=()=>ge(()=>import("./RaporView-0k0OM19-.js"),__vite__mapDeps([43,2])),eU=()=>ge(()=>import("./PengaturanKeuanganView-DBxqto6y.js"),__vite__mapDeps([44,2])),tU=()=>ge(()=>import("./MasterDataView-DgQHxRVJ.js"),__vite__mapDeps([45,2,5,46,11,20,17,18,19,4,6,15,16])),nU=()=>ge(()=>import("./KegiatanPesantrenView-BA5RWSgK.js"),__vite__mapDeps([47,16,5,2,17])),rU=()=>ge(()=>import("./HutangPiutangView-BenYKEdZ.js"),__vite__mapDeps([48,17,2,6])),iU=()=>ge(()=>import("./PembayaranView-B6kdZtN_.js"),__vite__mapDeps([49,6])),sU=()=>ge(()=>import("./CapaianPrestasiView-D2ABHmHW.js"),__vite__mapDeps([50,1,16,5])),oU=()=>ge(()=>import("./PersonalView-BkPS-aEJ.js"),__vite__mapDeps([51,1,16,5,4,23,6])),aU=()=>ge(()=>import("./AppLayout-B8-c4WgE.js"),__vite__mapDeps([52,8,2,7,11,6,13,53])),cU=[{path:"/",redirect:"/dashboard"},{path:"/login",name:"login",component:w1,meta:{public:!0}},{path:"/psb-form",name:"psb-form",component:G1,meta:{public:!0}},{path:"/",component:aU,children:[{path:"dashboard",name:"dashboard",component:A1},{path:"profil",name:"profil",component:R1},{path:"santri",name:"santri",component:S1},{path:"santri/new",name:"santri-new",component:Jy,meta:{admin:!0}},{path:"santri/:id/edit",name:"santri-edit",component:Jy,meta:{admin:!0}},{path:"guru",name:"guru",component:P1,meta:{admin:!0}},{path:"guru/new",name:"guru-new",component:Yy,meta:{admin:!0}},{path:"guru/:id/edit",name:"guru-edit",component:Yy,meta:{admin:!0}},{path:"lembaga",name:"lembaga",redirect:{path:"/master-data",query:{tab:"lembaga"}}},{path:"lembaga/new",name:"lembaga-new",component:Xy,meta:{admin:!0}},{path:"lembaga/:id/edit",name:"lembaga-edit",component:Xy,meta:{admin:!0}},{path:"lembaga/:id",name:"lembaga-detail",component:F1,meta:{admin:!0}},{path:"kelas",name:"kelas",component:C1,meta:{admin:!0}},{path:"master-form/:entity",name:"master-form",component:k1,meta:{admin:!0}},{path:"field-schema",name:"field-schema",component:D1,meta:{admin:!0}},{path:"keuangan",name:"keuangan",component:N1,meta:{admin:!0}},{path:"tagihan",name:"tagihan",component:V1},{path:"pembayaran",name:"pembayaran",component:iU},{path:"pos-santri",name:"pos-santri",component:$1,meta:{admin:!0}},{path:"tabungan",name:"tabungan",component:O1},{path:"bisyaroh",name:"bisyaroh",component:x1},{path:"rapor",name:"rapor",component:Z1},{path:"naik-kelas",name:"naik-kelas",component:H1,alias:"/kenaikan"},{path:"absensi-guru",name:"absensi-guru",component:M1,meta:{admin:!0}},{path:"absensi-santri",name:"absensi-santri",component:U1},{path:"posts",name:"posts",component:B1,alias:"/mading"},{path:"buku-induk",name:"buku-induk",component:q1,meta:{admin:!0}},{path:"hutang-piutang",name:"hutang-piutang",component:rU,meta:{admin:!0}},{path:"laporan-keuangan",name:"laporan-keuangan",component:j1,meta:{admin:!0}},{path:"psb",name:"psb",component:K1,meta:{admin:!0}},{path:"psb/:id",name:"psb-detail",component:z1,meta:{admin:!0}},{path:"kritik-saran",name:"kritik-saran",component:L1},{path:"pengaturan-web",name:"pengaturan-web",component:b1,meta:{admin:!0}},{path:"keu-pengaturan",name:"keu-pengaturan",component:eU,meta:{admin:!0},alias:"/pengaturan-keuangan"},{path:"kegiatan-pesantren",name:"kegiatan-pesantren",component:nU,meta:{admin:!0}},{path:"kalender",name:"kalender",component:W1,alias:"/kalender-kegiatan"},{path:"statistik",name:"statistik",component:Q1},{path:"input-bulanan",name:"input-bulanan",component:J1},{path:"rekap-prestasi",name:"rekap-prestasi",component:Y1},{path:"rekap-diniyah",name:"rekap-diniyah",component:X1},{path:"master-data",name:"master-data",component:tU,meta:{admin:!0,roleSistem:"super_admin"}},{path:"capaian-prestasi",name:"capaian-prestasi",component:sU},{path:"personal",name:"personal",component:oU,meta:{admin:!0}}]},{path:"/:pathMatch(.*)*",redirect:"/dashboard"}],Zu=_1({history:QF(),routes:cU}),uU=["/login","/psb-form"];Zu.beforeEach(async(n,e,t)=>{var i,s,o,a;const r=nb();if((i=n.meta)!=null&&i.public||uU.includes(n.path))return t();if(r.authReady)try{await r.authReady}catch{}if(!r.isLoggedIn)return t({name:"login",query:{redirect:n.fullPath}});if((s=n.meta)!=null&&s.admin&&!r.isAdmin)return t({name:"dashboard"});if((o=n.meta)!=null&&o.roleSistem&&((a=r.sesiAktif)==null?void 0:a.role_sistem)!==n.meta.roleSistem)return t({name:"dashboard"});t()});let Zy=!1;Zu.afterEach(()=>{Zy||(Zy=!0,setTimeout(()=>{Zu.getRoutes().forEach(e=>{var r;const t=(r=e.components)==null?void 0:r.default;if(typeof t=="function")try{t()}catch{}})},800))});let lU=0;const hU=yf("ui",()=>{function n(){return typeof window<"u"&&window.innerWidth>=768}const e=cn(n());function t(){e.value=!0}function r(){e.value=!1}function i(){e.value=!e.value}const s=cn(!1);function o(R){s.value=!!R,typeof document<"u"&&(document.documentElement.classList.toggle("dark",s.value),document.body.classList.toggle("dark-mode",s.value));try{localStorage.setItem("portalMu_darkMode",s.value?"1":"0")}catch{}}function a(){o(!s.value)}function c(){try{if(!localStorage.getItem("portalMu_themeMigrated_v48")){localStorage.setItem("portalMu_darkMode","0"),localStorage.setItem("portalMu_themeMigrated_v48","1"),o(!1);return}const C=localStorage.getItem("portalMu_darkMode");if(C!=null){o(C==="1");return}}catch{}o(!1)}const l=cn([]);function h(R,C,V=3e3){const D=++lU;return l.value.push({id:D,type:R,msg:C,ttl:V}),setTimeout(()=>{const x=l.value.findIndex(M=>M.id===D);x>=0&&l.value.splice(x,1)},V),D}const f={info:(R,C)=>h("info",R,C),success:(R,C)=>h("success",R,C),error:(R,C)=>h("error",R,C??5e3),warning:(R,C)=>h("warning",R,C??4e3)},m=cn({open:!1,title:"",message:"",confirmText:"Hapus",cancelText:"Batal",danger:!0,_resolve:null});function g({title:R="Konfirmasi",message:C="",confirmText:V="Hapus",cancelText:D="Batal",danger:x=!0}={}){return new Promise(M=>{m.value={open:!0,title:R,message:C,confirmText:V,cancelText:D,danger:x,_resolve:M}})}function b(R){const C=m.value._resolve;m.value.open=!1,m.value._resolve=null,C&&C(!!R)}return{sidebarOpen:e,openSidebar:t,closeSidebar:r,toggleSidebar:i,isDark:s,setDark:o,toggleDark:a,initDarkFromStorage:c,toasts:l,toast:f,confirmState:m,confirm:g,confirmResolve:b}}),Zp=fP(lF),rh=gP();Zp.use(rh);Zp.use(Zu);const dU=hU(rh);dU.initDarkFromStorage();const fU=nb(rh);fU.initAuth();const eI=GA(rh);eI.load().then(()=>eI.subscribe()).catch(()=>{});function rb(){const n=document.getElementById("splash-screen");n&&!n.classList.contains("fade-out")?(n.classList.add("fade-out"),setTimeout(()=>{document.body.classList.add("app-running")},600)):document.body.classList.contains("app-running")||document.body.classList.add("app-running")}try{Zp.mount("#app")}catch(n){console.error("[main.js] Vue app.mount FAIL:",n)}const pU=1200,mU=performance.now();requestAnimationFrame(()=>{const n=performance.now()-mU,e=Math.max(0,pU-n);setTimeout(rb,e)});setTimeout(()=>{document.body.classList.contains("app-running")||(console.warn("[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck"),rb())},5e3);async function gU(){var n;try{const e=Date.now();for(;!window.Sentry&&Date.now()-e<3e3;)await new Promise(a=>setTimeout(a,100));if(!window.Sentry)return;const{db:t}=await ge(async()=>{const{db:a}=await Promise.resolve().then(()=>cF);return{db:a}},void 0),{doc:r,getDoc:i}=await ge(async()=>{const{doc:a,getDoc:c}=await Promise.resolve().then(()=>EV);return{doc:a,getDoc:c}},void 0),s=await i(r(t,"settings","general")),o=s.exists()&&((n=s.data())==null?void 0:n.sentryDsn)||"";if(!o)return;window.Sentry.init({dsn:o,tracesSampleRate:.1,release:"portal-mu@20.70.0526",environment:window.location.hostname.includes("localhost")?"dev":"prod"}),console.log("[main.js] Sentry initialized")}catch(e){console.warn("[main.js] Sentry init skipped:",e.message)}}gU();export{Pe as $,ll as A,ef as B,Zd as C,$I as D,zI as E,an as F,Tp as G,HI as H,Va as I,ic as J,cn as K,xU as L,vU as M,EU as N,qR as O,jR as P,aV as Q,d1 as R,lw as S,IU as T,uF as U,cR as V,aF as W,UU as X,ky as Y,qb as Z,ge as _,LS as a,$i as a0,Ep as a1,LU as a2,NU as a3,nb as a4,qU as a5,BU as a6,GA as a7,hU as a8,iP as a9,bU as aa,sP as ab,oP as ac,kg as ad,AU as ae,DS as af,Ms as ag,yU as ah,sd as ai,_U as aj,SU as ak,RU as al,dV as am,MU as b,os as c,Ct as d,gv as e,xa as f,IS as g,TU as h,wU as i,yS as j,Bt as k,Gt as l,jI as m,hw as n,OU as o,FU as p,Sn as q,cF as r,Ja as s,VU as t,Dy as u,_f as v,EV as w,cl as x,it as y,jU as z};
