const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginView-CaGf_8rN.js","assets/logo-CxXS7KxG.js","assets/useToast-BWLcstdH.js","assets/DashboardView-D09a187f.js","assets/useGuru-CByrhYRo.js","assets/useLembaga-ChDaPMfa.js","assets/format-hvvLOU_z.js","assets/hijri-BQdwk8_X.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/useMenus-B5SDCTOM.js","assets/DashboardView-B1l9MSnG.css","assets/PengaturanView-BJc1HvHm.js","assets/useConfirm-tn4nQb_D.js","assets/storage-ZOqwTmnY.js","assets/createLucideIcon-BMBBYgkN.js","assets/ProfilView-B0F-9Dae.js","assets/SantriView-BxZVzyLw.js","assets/useSantri-BY87jmn_.js","assets/useExcel-CfMuM0d2.js","assets/pdfBuilder-BWx_Ehio.js","assets/pdf-CfElz_X6.js","assets/GuruView-B93IgLLi.js","assets/KelasView-oDfp-tlC.js","assets/FieldSchemaView-DH1BRF5o.js","assets/MasterFormBridgeView-BgjIdIIn.js","assets/KeuanganDashboardView-CKR2hj_E.js","assets/useKeuangan-BmOvf7p_.js","assets/TagihanView-BGuijzSW.js","assets/TabunganView-AUrUr_HQ.js","assets/BisyarohView-qM9n91_j.js","assets/KritikSaranView-DBGJMF4Q.js","assets/AbsensiGuruView-CZt2lm4x.js","assets/SantriFormView-D6_xcH2N.js","assets/GuruFormView-DE3llzMg.js","assets/LembagaFormView-Eac0NaNK.js","assets/LembagaDetailView-BNa8bXiO.js","assets/UiActionCard-KQL_aHM2.js","assets/AbsensiSantriView-Dvhfj7eM.js","assets/PostsView-Bqg8f-jR.js","assets/BukuIndukView-k7mupBeo.js","assets/LaporanKeuanganView-DSiFpOZB.js","assets/PpdbAdminView-EBqDAsh0.js","assets/PpdbDetailView-CEynKt03.js","assets/PosSantriView-CkY6BzJd.js","assets/PosSantriView-B13uLp0J.css","assets/NaikKelasView-CKEbevET.js","assets/NaikKelasView-rPjAKX2L.css","assets/KalenderKegiatanView-DPuF-Je4.js","assets/StatistikView-CBEY5KAR.js","assets/InputBulananView-fva1zhXH.js","assets/InputBulananView-DWR66aQJ.css","assets/RekapPrestasiView-BToL0peX.js","assets/RekapDiniyahView-C-GSOgES.js","assets/RaporView-B-JLnAT2.js","assets/RaporView-DbRvZlhC.css","assets/PengaturanKeuanganView-gXoWVob4.js","assets/MasterDataView-B8AGvJSX.js","assets/KegiatanPesantrenView-BHBkBu7J.js","assets/HutangPiutangView-C11MzmzB.js","assets/PembayaranView--Hp71ejf.js","assets/CapaianPrestasiView-yNVPul0w.js","assets/PersonalView-C5KjuMTz.js","assets/AppLayout-0RngOGQ_.js","assets/AppLayout-Cy55l9NA.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Db="modulepreload",kb=function(n){return"/"+n},Qm={},_e=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(l=>{if(l=kb(l),l in Qm)return;Qm[l]=!0;const h=l.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":Db,h||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),h)return new Promise((g,b)=>{p.addEventListener("load",g),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Zd(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Ue={},Os=[],$n=()=>{},oI=()=>!1,il=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),sl=n=>n.startsWith("onUpdate:"),vt=Object.assign,ef=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Nb=Object.prototype.hasOwnProperty,Ne=(n,e)=>Nb.call(n,e),le=Array.isArray,xs=n=>rc(n)==="[object Map]",ho=n=>rc(n)==="[object Set]",Jm=n=>rc(n)==="[object Date]",ge=n=>typeof n=="function",$e=n=>typeof n=="string",pn=n=>typeof n=="symbol",Ve=n=>n!==null&&typeof n=="object",aI=n=>(Ve(n)||ge(n))&&ge(n.then)&&ge(n.catch),cI=Object.prototype.toString,rc=n=>cI.call(n),Vb=n=>rc(n).slice(8,-1),uI=n=>rc(n)==="[object Object]",ol=n=>$e(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,fa=Zd(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),al=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Ob=/-\w/g,Yt=al(n=>n.replace(Ob,e=>e.slice(1).toUpperCase())),xb=/\B([A-Z])/g,_i=al(n=>n.replace(xb,"-$1").toLowerCase()),cl=al(n=>n.charAt(0).toUpperCase()+n.slice(1)),vh=al(n=>n?`on${cl(n)}`:""),Fn=(n,e)=>!Object.is(n,e),uu=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},lI=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},ul=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Lb=n=>{const e=$e(n)?Number(n):NaN;return isNaN(e)?n:e};let Ym;const ll=()=>Ym||(Ym=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function tf(n){if(le(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],i=$e(r)?Bb(r):tf(r);if(i)for(const s in i)e[s]=i[s]}return e}else if($e(n)||Ve(n))return n}const Mb=/;(?![^(]*\))/g,Fb=/:([^]+)/,Ub=/\/\*[^]*?\*\//g;function Bb(n){const e={};return n.replace(Ub,"").split(Mb).forEach(t=>{if(t){const r=t.split(Fb);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function nf(n){let e="";if($e(n))e=n;else if(le(n))for(let t=0;t<n.length;t++){const r=nf(n[t]);r&&(e+=r+" ")}else if(Ve(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const qb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",jb=Zd(qb);function hI(n){return!!n||n===""}function Gb(n,e){if(n.length!==e.length)return!1;let t=!0;for(let r=0;t&&r<n.length;r++)t=ri(n[r],e[r]);return t}function ri(n,e){if(n===e)return!0;let t=Jm(n),r=Jm(e);if(t||r)return t&&r?n.getTime()===e.getTime():!1;if(t=pn(n),r=pn(e),t||r)return n===e;if(t=le(n),r=le(e),t||r)return t&&r?Gb(n,e):!1;if(t=Ve(n),r=Ve(e),t||r){if(!t||!r)return!1;const i=Object.keys(n).length,s=Object.keys(e).length;if(i!==s)return!1;for(const o in n){const a=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!ri(n[o],e[o]))return!1}}return String(n)===String(e)}function rf(n,e){return n.findIndex(t=>ri(t,e))}const dI=n=>!!(n&&n.__v_isRef===!0),Kb=n=>$e(n)?n:n==null?"":le(n)||Ve(n)&&(n.toString===cI||!ge(n.toString))?dI(n)?Kb(n.value):JSON.stringify(n,fI,2):String(n),fI=(n,e)=>dI(e)?fI(n,e.value):xs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,i],s)=>(t[Eh(r,s)+" =>"]=i,t),{})}:ho(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Eh(t))}:pn(e)?Eh(e):Ve(e)&&!le(e)&&!uI(e)?String(e):e,Eh=(n,e="")=>{var t;return pn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let yt;class pI{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&yt&&(yt.active?(this.parent=yt,this.index=(yt.scopes||(yt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=yt;try{return yt=this,e()}finally{yt=t}}}on(){++this._on===1&&(this.prevScope=yt,yt=this)}off(){if(this._on>0&&--this._on===0){if(yt===this)yt=this.prevScope;else{let e=yt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function mI(n){return new pI(n)}function gI(){return yt}function $b(n,e=!1){yt&&yt.cleanups.push(n)}let Be;const Th=new WeakSet;class _I{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,yt&&(yt.active?yt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Th.has(this)&&(Th.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||II(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xm(this),vI(this);const e=Be,t=Pn;Be=this,Pn=!0;try{return this.fn()}finally{EI(this),Be=e,Pn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)af(e);this.deps=this.depsTail=void 0,Xm(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Th.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){rd(this)&&this.run()}get dirty(){return rd(this)}}let yI=0,pa,ma;function II(n,e=!1){if(n.flags|=8,e){n.next=ma,ma=n;return}n.next=pa,pa=n}function sf(){yI++}function of(){if(--yI>0)return;if(ma){let e=ma;for(ma=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;pa;){let e=pa;for(pa=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function vI(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function EI(n){let e,t=n.depsTail,r=t;for(;r;){const i=r.prevDep;r.version===-1?(r===t&&(t=i),af(r),zb(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}n.deps=e,n.depsTail=t}function rd(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(TI(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function TI(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Da)||(n.globalVersion=Da,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!rd(n))))return;n.flags|=2;const e=n.dep,t=Be,r=Pn;Be=n,Pn=!0;try{vI(n);const i=n.fn(n._value);(e.version===0||Fn(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{Be=t,Pn=r,EI(n),n.flags&=-3}}function af(n,e=!1){const{dep:t,prevSub:r,nextSub:i}=n;if(r&&(r.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)af(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function zb(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Pn=!0;const wI=[];function yr(){wI.push(Pn),Pn=!1}function Ir(){const n=wI.pop();Pn=n===void 0?!0:n}function Xm(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Be;Be=void 0;try{e()}finally{Be=t}}}let Da=0;class Hb{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class cf{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Be||!Pn||Be===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Be)t=this.activeLink=new Hb(Be,this),Be.deps?(t.prevDep=Be.depsTail,Be.depsTail.nextDep=t,Be.depsTail=t):Be.deps=Be.depsTail=t,AI(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Be.depsTail,t.nextDep=void 0,Be.depsTail.nextDep=t,Be.depsTail=t,Be.deps===t&&(Be.deps=r)}return t}trigger(e){this.version++,Da++,this.notify(e)}notify(e){sf();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{of()}}}function AI(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)AI(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const bu=new WeakMap,zi=Symbol(""),id=Symbol(""),ka=Symbol("");function Bt(n,e,t){if(Pn&&Be){let r=bu.get(n);r||bu.set(n,r=new Map);let i=r.get(t);i||(r.set(t,i=new cf),i.map=r,i.key=t),i.track()}}function sr(n,e,t,r,i,s){const o=bu.get(n);if(!o){Da++;return}const a=c=>{c&&c.trigger()};if(sf(),e==="clear")o.forEach(a);else{const c=le(n),l=c&&ol(t);if(c&&t==="length"){const h=Number(r);o.forEach((f,p)=>{(p==="length"||p===ka||!pn(p)&&p>=h)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),l&&a(o.get(ka)),e){case"add":c?l&&a(o.get("length")):(a(o.get(zi)),xs(n)&&a(o.get(id)));break;case"delete":c||(a(o.get(zi)),xs(n)&&a(o.get(id)));break;case"set":xs(n)&&a(o.get(zi));break}}of()}function Wb(n,e){const t=bu.get(n);return t&&t.get(e)}function vs(n){const e=Pe(n);return e===n?e:(Bt(e,"iterate",ka),dn(n)?e:e.map(Dn))}function hl(n){return Bt(n=Pe(n),"iterate",ka),n}function Ln(n,e){return vr(n)?Ks(gr(n)?Dn(e):e):Dn(e)}const Qb={__proto__:null,[Symbol.iterator](){return wh(this,Symbol.iterator,n=>Ln(this,n))},concat(...n){return vs(this).concat(...n.map(e=>le(e)?vs(e):e))},entries(){return wh(this,"entries",n=>(n[1]=Ln(this,n[1]),n))},every(n,e){return er(this,"every",n,e,void 0,arguments)},filter(n,e){return er(this,"filter",n,e,t=>t.map(r=>Ln(this,r)),arguments)},find(n,e){return er(this,"find",n,e,t=>Ln(this,t),arguments)},findIndex(n,e){return er(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return er(this,"findLast",n,e,t=>Ln(this,t),arguments)},findLastIndex(n,e){return er(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return er(this,"forEach",n,e,void 0,arguments)},includes(...n){return Ah(this,"includes",n)},indexOf(...n){return Ah(this,"indexOf",n)},join(n){return vs(this).join(n)},lastIndexOf(...n){return Ah(this,"lastIndexOf",n)},map(n,e){return er(this,"map",n,e,void 0,arguments)},pop(){return Ko(this,"pop")},push(...n){return Ko(this,"push",n)},reduce(n,...e){return Zm(this,"reduce",n,e)},reduceRight(n,...e){return Zm(this,"reduceRight",n,e)},shift(){return Ko(this,"shift")},some(n,e){return er(this,"some",n,e,void 0,arguments)},splice(...n){return Ko(this,"splice",n)},toReversed(){return vs(this).toReversed()},toSorted(n){return vs(this).toSorted(n)},toSpliced(...n){return vs(this).toSpliced(...n)},unshift(...n){return Ko(this,"unshift",n)},values(){return wh(this,"values",n=>Ln(this,n))}};function wh(n,e,t){const r=hl(n),i=r[e]();return r!==n&&!dn(n)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.done||(s.value=t(s.value)),s}),i}const Jb=Array.prototype;function er(n,e,t,r,i,s){const o=hl(n),a=o!==n&&!dn(n),c=o[e];if(c!==Jb[e]){const f=c.apply(n,s);return a?Dn(f):f}let l=t;o!==n&&(a?l=function(f,p){return t.call(this,Ln(n,f),p,n)}:t.length>2&&(l=function(f,p){return t.call(this,f,p,n)}));const h=c.call(o,l,r);return a&&i?i(h):h}function Zm(n,e,t,r){const i=hl(n),s=i!==n&&!dn(n);let o=t,a=!1;i!==n&&(s?(a=r.length===0,o=function(l,h,f){return a&&(a=!1,l=Ln(n,l)),t.call(this,l,Ln(n,h),f,n)}):t.length>3&&(o=function(l,h,f){return t.call(this,l,h,f,n)}));const c=i[e](o,...r);return a?Ln(n,c):c}function Ah(n,e,t){const r=Pe(n);Bt(r,"iterate",ka);const i=r[e](...t);return(i===-1||i===!1)&&dl(t[0])?(t[0]=Pe(t[0]),r[e](...t)):i}function Ko(n,e,t=[]){yr(),sf();const r=Pe(n)[e].apply(n,t);return of(),Ir(),r}const Yb=Zd("__proto__,__v_isRef,__isVue"),bI=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(pn));function Xb(n){pn(n)||(n=String(n));const e=Pe(this);return Bt(e,"has",n),e.hasOwnProperty(n)}class RI{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return s;if(t==="__v_raw")return r===(i?s?cR:DI:s?CI:PI).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=le(e);if(!i){let c;if(o&&(c=Qb[t]))return c;if(t==="hasOwnProperty")return Xb}const a=Reflect.get(e,t,it(e)?e:r);if((pn(t)?bI.has(t):Yb(t))||(i||Bt(e,"get",t),s))return a;if(it(a)){const c=o&&ol(t)?a:a.value;return i&&Ve(c)?od(c):c}return Ve(a)?i?od(a):ic(a):a}}class SI extends RI{constructor(e=!1){super(!1,e)}set(e,t,r,i){let s=e[t];const o=le(e)&&ol(t);if(!this._isShallow){const l=vr(s);if(!dn(r)&&!vr(r)&&(s=Pe(s),r=Pe(r)),!o&&it(s)&&!it(r))return l||(s.value=r),!0}const a=o?Number(t)<e.length:Ne(e,t),c=Reflect.set(e,t,r,it(e)?e:i);return e===Pe(i)&&(a?Fn(r,s)&&sr(e,"set",t,r):sr(e,"add",t,r)),c}deleteProperty(e,t){const r=Ne(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&r&&sr(e,"delete",t,void 0),i}has(e,t){const r=Reflect.has(e,t);return(!pn(t)||!bI.has(t))&&Bt(e,"has",t),r}ownKeys(e){return Bt(e,"iterate",le(e)?"length":zi),Reflect.ownKeys(e)}}class Zb extends RI{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const eR=new SI,tR=new Zb,nR=new SI(!0);const sd=n=>n,zc=n=>Reflect.getPrototypeOf(n);function rR(n,e,t){return function(...r){const i=this.__v_raw,s=Pe(i),o=xs(s),a=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,l=i[n](...r),h=t?sd:e?Ks:Dn;return!e&&Bt(s,"iterate",c?id:zi),vt(Object.create(l),{next(){const{value:f,done:p}=l.next();return p?{value:f,done:p}:{value:a?[h(f[0]),h(f[1])]:h(f),done:p}}})}}function Hc(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function iR(n,e){const t={get(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);n||(Fn(i,a)&&Bt(o,"get",i),Bt(o,"get",a));const{has:c}=zc(o),l=e?sd:n?Ks:Dn;if(c.call(o,i))return l(s.get(i));if(c.call(o,a))return l(s.get(a));s!==o&&s.get(i)},get size(){const i=this.__v_raw;return!n&&Bt(Pe(i),"iterate",zi),i.size},has(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);return n||(Fn(i,a)&&Bt(o,"has",i),Bt(o,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const o=this,a=o.__v_raw,c=Pe(a),l=e?sd:n?Ks:Dn;return!n&&Bt(c,"iterate",zi),a.forEach((h,f)=>i.call(s,l(h),l(f),o))}};return vt(t,n?{add:Hc("add"),set:Hc("set"),delete:Hc("delete"),clear:Hc("clear")}:{add(i){const s=Pe(this),o=zc(s),a=Pe(i),c=!e&&!dn(i)&&!vr(i)?a:i;return o.has.call(s,c)||Fn(i,c)&&o.has.call(s,i)||Fn(a,c)&&o.has.call(s,a)||(s.add(c),sr(s,"add",c,c)),this},set(i,s){!e&&!dn(s)&&!vr(s)&&(s=Pe(s));const o=Pe(this),{has:a,get:c}=zc(o);let l=a.call(o,i);l||(i=Pe(i),l=a.call(o,i));const h=c.call(o,i);return o.set(i,s),l?Fn(s,h)&&sr(o,"set",i,s):sr(o,"add",i,s),this},delete(i){const s=Pe(this),{has:o,get:a}=zc(s);let c=o.call(s,i);c||(i=Pe(i),c=o.call(s,i)),a&&a.call(s,i);const l=s.delete(i);return c&&sr(s,"delete",i,void 0),l},clear(){const i=Pe(this),s=i.size!==0,o=i.clear();return s&&sr(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=rR(i,n,e)}),t}function uf(n,e){const t=iR(n,e);return(r,i,s)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?r:Reflect.get(Ne(t,i)&&i in r?t:r,i,s)}const sR={get:uf(!1,!1)},oR={get:uf(!1,!0)},aR={get:uf(!0,!1)};const PI=new WeakMap,CI=new WeakMap,DI=new WeakMap,cR=new WeakMap;function uR(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function lR(n){return n.__v_skip||!Object.isExtensible(n)?0:uR(Vb(n))}function ic(n){return vr(n)?n:lf(n,!1,eR,sR,PI)}function kI(n){return lf(n,!1,nR,oR,CI)}function od(n){return lf(n,!0,tR,aR,DI)}function lf(n,e,t,r,i){if(!Ve(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=lR(n);if(s===0)return n;const o=i.get(n);if(o)return o;const a=new Proxy(n,s===2?r:t);return i.set(n,a),a}function gr(n){return vr(n)?gr(n.__v_raw):!!(n&&n.__v_isReactive)}function vr(n){return!!(n&&n.__v_isReadonly)}function dn(n){return!!(n&&n.__v_isShallow)}function dl(n){return n?!!n.__v_raw:!1}function Pe(n){const e=n&&n.__v_raw;return e?Pe(e):n}function hf(n){return!Ne(n,"__v_skip")&&Object.isExtensible(n)&&lI(n,"__v_skip",!0),n}const Dn=n=>Ve(n)?ic(n):n,Ks=n=>Ve(n)?od(n):n;function it(n){return n?n.__v_isRef===!0:!1}function jt(n){return NI(n,!1)}function hR(n){return NI(n,!0)}function NI(n,e){return it(n)?n:new dR(n,e)}class dR{constructor(e,t){this.dep=new cf,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Pe(e),this._value=t?e:Dn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||dn(e)||vr(e);e=r?e:Pe(e),Fn(e,t)&&(this._rawValue=e,this._value=r?e:Dn(e),this.dep.trigger())}}function Hi(n){return it(n)?n.value:n}const fR={get:(n,e,t)=>e==="__v_raw"?n:Hi(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const i=n[e];return it(i)&&!it(t)?(i.value=t,!0):Reflect.set(n,e,t,r)}};function VI(n){return gr(n)?n:new Proxy(n,fR)}function pR(n){const e=le(n)?new Array(n.length):{};for(const t in n)e[t]=gR(n,t);return e}class mR{constructor(e,t,r){this._object=e,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0,this._key=pn(t)?t:String(t),this._raw=Pe(e);let i=!0,s=e;if(!le(e)||pn(this._key)||!ol(this._key))do i=!dl(s)||dn(s);while(i&&(s=s.__v_raw));this._shallow=i}get value(){let e=this._object[this._key];return this._shallow&&(e=Hi(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&it(this._raw[this._key])){const t=this._object[this._key];if(it(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return Wb(this._raw,this._key)}}function gR(n,e,t){return new mR(n,e,t)}class _R{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new cf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Da-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Be!==this)return II(this,!0),!0}get value(){const e=this.dep.track();return TI(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function yR(n,e,t=!1){let r,i;return ge(n)?r=n:(r=n.get,i=n.set),new _R(r,i,t)}const Wc={},Ru=new WeakMap;let xi;function IR(n,e=!1,t=xi){if(t){let r=Ru.get(t);r||Ru.set(t,r=[]),r.push(n)}}function vR(n,e,t=Ue){const{immediate:r,deep:i,once:s,scheduler:o,augmentJob:a,call:c}=t,l=L=>i?L:dn(L)||i===!1||i===0?or(L,1):or(L);let h,f,p,g,b=!1,T=!1;if(it(n)?(f=()=>n.value,b=dn(n)):gr(n)?(f=()=>l(n),b=!0):le(n)?(T=!0,b=n.some(L=>gr(L)||dn(L)),f=()=>n.map(L=>{if(it(L))return L.value;if(gr(L))return l(L);if(ge(L))return c?c(L,2):L()})):ge(n)?e?f=c?()=>c(n,2):n:f=()=>{if(p){yr();try{p()}finally{Ir()}}const L=xi;xi=h;try{return c?c(n,3,[g]):n(g)}finally{xi=L}}:f=$n,e&&i){const L=f,H=i===!0?1/0:i;f=()=>or(L(),H)}const P=gI(),k=()=>{h.stop(),P&&P.active&&ef(P.effects,h)};if(s&&e){const L=e;e=(...H)=>{L(...H),k()}}let D=T?new Array(n.length).fill(Wc):Wc;const N=L=>{if(!(!(h.flags&1)||!h.dirty&&!L))if(e){const H=h.run();if(i||b||(T?H.some((j,E)=>Fn(j,D[E])):Fn(H,D))){p&&p();const j=xi;xi=h;try{const E=[H,D===Wc?void 0:T&&D[0]===Wc?[]:D,g];D=H,c?c(e,3,E):e(...E)}finally{xi=j}}}else h.run()};return a&&a(N),h=new _I(f),h.scheduler=o?()=>o(N,!1):N,g=L=>IR(L,!1,h),p=h.onStop=()=>{const L=Ru.get(h);if(L){if(c)c(L,4);else for(const H of L)H();Ru.delete(h)}},e?r?N(!0):D=h.run():o?o(N.bind(null,!0),!0):h.run(),k.pause=h.pause.bind(h),k.resume=h.resume.bind(h),k.stop=k,k}function or(n,e=1/0,t){if(e<=0||!Ve(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,it(n))or(n.value,e,t);else if(le(n))for(let r=0;r<n.length;r++)or(n[r],e,t);else if(ho(n)||xs(n))n.forEach(r=>{or(r,e,t)});else if(uI(n)){for(const r in n)or(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&or(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function sc(n,e,t,r){try{return r?n(...r):n()}catch(i){oc(i,e,t)}}function kn(n,e,t,r){if(ge(n)){const i=sc(n,e,t,r);return i&&aI(i)&&i.catch(s=>{oc(s,e,t)}),i}if(le(n)){const i=[];for(let s=0;s<n.length;s++)i.push(kn(n[s],e,t,r));return i}}function oc(n,e,t,r=!0){const i=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ue;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const h=a.ec;if(h){for(let f=0;f<h.length;f++)if(h[f](n,c,l)===!1)return}a=a.parent}if(s){yr(),sc(s,null,10,[n,c,l]),Ir();return}}ER(n,t,i,r,o)}function ER(n,e,t,r=!0,i=!1){if(i)throw n;console.error(n)}const Jt=[];let On=-1;const Ls=[];let zr=null,Ps=0;const OI=Promise.resolve();let Su=null;function fl(n){const e=Su||OI;return n?e.then(this?n.bind(this):n):e}function TR(n){let e=On+1,t=Jt.length;for(;e<t;){const r=e+t>>>1,i=Jt[r],s=Na(i);s<n||s===n&&i.flags&2?e=r+1:t=r}return e}function df(n){if(!(n.flags&1)){const e=Na(n),t=Jt[Jt.length-1];!t||!(n.flags&2)&&e>=Na(t)?Jt.push(n):Jt.splice(TR(e),0,n),n.flags|=1,xI()}}function xI(){Su||(Su=OI.then(MI))}function wR(n){le(n)?Ls.push(...n):zr&&n.id===-1?zr.splice(Ps+1,0,n):n.flags&1||(Ls.push(n),n.flags|=1),xI()}function eg(n,e,t=On+1){for(;t<Jt.length;t++){const r=Jt[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;Jt.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function LI(n){if(Ls.length){const e=[...new Set(Ls)].sort((t,r)=>Na(t)-Na(r));if(Ls.length=0,zr){zr.push(...e);return}for(zr=e,Ps=0;Ps<zr.length;Ps++){const t=zr[Ps];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}zr=null,Ps=0}}const Na=n=>n.id==null?n.flags&2?-1:1/0:n.id;function MI(n){try{for(On=0;On<Jt.length;On++){const e=Jt[On];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),sc(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;On<Jt.length;On++){const e=Jt[On];e&&(e.flags&=-2)}On=-1,Jt.length=0,LI(),Su=null,(Jt.length||Ls.length)&&MI()}}let Ot=null,FI=null;function Pu(n){const e=Ot;return Ot=n,FI=n&&n.type.__scopeId||null,e}function ad(n,e=Ot,t){if(!e||n._n)return n;const r=(...i)=>{r._d&&ku(-1);const s=Pu(e);let o;try{o=n(...i)}finally{Pu(s),r._d&&ku(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function vU(n,e){if(Ot===null)return n;const t=_l(Ot),r=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[s,o,a,c=Ue]=e[i];s&&(ge(s)&&(s={mounted:s,updated:s}),s.deep&&or(o),r.push({dir:s,instance:t,value:o,oldValue:void 0,arg:a,modifiers:c}))}return n}function Di(n,e,t,r){const i=n.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(yr(),kn(c,t,8,[n.el,a,n,e]),Ir())}}function lu(n,e){if(kt){let t=kt.provides;const r=kt.parent&&kt.parent.provides;r===t&&(t=kt.provides=Object.create(r)),t[n]=e}}function Tn(n,e,t=!1){const r=vf();if(r||Wi){let i=Wi?Wi._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&ge(e)?e.call(r&&r.proxy):e}}function AR(){return!!(vf()||Wi)}const bR=Symbol.for("v-scx"),RR=()=>Tn(bR);function EU(n,e){return ff(n,null,e)}function Ms(n,e,t){return ff(n,e,t)}function ff(n,e,t=Ue){const{immediate:r,deep:i,flush:s,once:o}=t,a=vt({},t),c=e&&r||!e&&s!=="post";let l;if($s){if(s==="sync"){const g=RR();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=$n,g.resume=$n,g.pause=$n,g}}const h=kt;a.call=(g,b,T)=>kn(g,h,b,T);let f=!1;s==="post"?a.scheduler=g=>{Wt(g,h&&h.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(g,b)=>{b?g():df(g)}),a.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,h&&(g.id=h.uid,g.i=h))};const p=vR(n,e,a);return $s&&(l?l.push(p):c&&p()),p}function SR(n,e,t){const r=this.proxy,i=$e(n)?n.includes(".")?UI(r,n):()=>r[n]:n.bind(r,r);let s;ge(e)?s=e:(s=e.handler,t=e);const o=cc(this),a=ff(i,s.bind(r),t);return o(),a}function UI(n,e){const t=e.split(".");return()=>{let r=n;for(let i=0;i<t.length&&r;i++)r=r[t[i]];return r}}const Kr=new WeakMap,BI=Symbol("_vte"),qI=n=>n.__isTeleport,Fi=n=>n&&(n.disabled||n.disabled===""),PR=n=>n&&(n.defer||n.defer===""),tg=n=>typeof SVGElement<"u"&&n instanceof SVGElement,ng=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,cd=(n,e)=>{const t=n&&n.to;return $e(t)?e?e(t):null:t},CR={name:"Teleport",__isTeleport:!0,process(n,e,t,r,i,s,o,a,c,l){const{mc:h,pc:f,pbc:p,o:{insert:g,querySelector:b,createText:T,createComment:P,parentNode:k}}=l,D=Fi(e.props);let{dynamicChildren:N}=e;const L=(E,_,y)=>{E.shapeFlag&16&&h(E.children,_,y,i,s,o,a,c)},H=(E=e)=>{const _=Fi(E.props),y=E.target=cd(E.props,b),v=ud(y,E,T,g);y&&(o!=="svg"&&tg(y)?o="svg":o!=="mathml"&&ng(y)&&(o="mathml"),i&&i.isCE&&(i.ce._teleportTargets||(i.ce._teleportTargets=new Set)).add(y),_||(L(E,y,v),na(E,!1)))},j=E=>{const _=()=>{if(Kr.get(E)===_){if(Kr.delete(E),Fi(E.props)){const y=k(E.el)||t;L(E,y,E.anchor),na(E,!0)}H(E)}};Kr.set(E,_),Wt(_,s)};if(n==null){const E=e.el=T(""),_=e.anchor=T("");if(g(E,t,r),g(_,t,r),PR(e.props)||s&&s.pendingBranch){j(e);return}D&&(L(e,t,_),na(e,!0)),H()}else{e.el=n.el;const E=e.anchor=n.anchor,_=Kr.get(n);if(_){_.flags|=8,Kr.delete(n),j(e);return}e.targetStart=n.targetStart;const y=e.target=n.target,v=e.targetAnchor=n.targetAnchor,C=Fi(n.props),R=C?t:y,w=C?E:v;if(o==="svg"||tg(y)?o="svg":(o==="mathml"||ng(y))&&(o="mathml"),N?(p(n.dynamicChildren,N,R,i,s,o,a),yf(n,e,!0)):c||f(n,e,R,w,i,s,o,a,!1),D)C?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):Qc(e,t,E,l,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const Se=e.target=cd(e.props,b);Se&&Qc(e,Se,null,l,0)}else C&&Qc(e,y,v,l,1);na(e,D)}},remove(n,e,t,{um:r,o:{remove:i}},s){const{shapeFlag:o,children:a,anchor:c,targetStart:l,targetAnchor:h,target:f,props:p}=n;let g=s||!Fi(p);const b=Kr.get(n);if(b&&(b.flags|=8,Kr.delete(n),g=!1),f&&(i(l),i(h)),s&&i(c),o&16)for(let T=0;T<a.length;T++){const P=a[T];r(P,e,t,g,!!P.dynamicChildren)}},move:Qc,hydrate:DR};function Qc(n,e,t,{o:{insert:r},m:i},s=2){s===0&&r(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:c,children:l,props:h}=n,f=s===2;if(f&&r(o,e,t),!Kr.has(n)&&(!f||Fi(h))&&c&16)for(let p=0;p<l.length;p++)i(l[p],e,t,2);f&&r(a,e,t)}function DR(n,e,t,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:l,createText:h}},f){function p(P,k){let D=k;for(;D;){if(D&&D.nodeType===8){if(D.data==="teleport start anchor")e.targetStart=D;else if(D.data==="teleport anchor"){e.targetAnchor=D,P._lpa=e.targetAnchor&&o(e.targetAnchor);break}}D=o(D)}}function g(P,k){k.anchor=f(o(P),k,a(P),t,r,i,s)}const b=e.target=cd(e.props,c),T=Fi(e.props);if(b){const P=b._lpa||b.firstChild;e.shapeFlag&16&&(T?(g(n,e),p(b,P),e.targetAnchor||ud(b,e,h,l,a(n)===b?n:null)):(e.anchor=o(n),p(b,P),e.targetAnchor||ud(b,e,h,l),f(P&&o(P),e,b,t,r,i,s))),na(e,T)}else T&&e.shapeFlag&16&&(g(n,e),e.targetStart=n,e.targetAnchor=o(n));return e.anchor&&o(e.anchor)}const TU=CR;function na(n,e){const t=n.ctx;if(t&&t.ut){let r,i;for(e?(r=n.el,i=n.anchor):(r=n.targetStart,i=n.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute("data-v-owner",t.uid),r=r.nextSibling;t.ut()}}function ud(n,e,t,r,i=null){const s=e.targetStart=t(""),o=e.targetAnchor=t("");return s[BI]=o,n&&(r(s,n,i),r(o,n,i)),o}const xn=Symbol("_leaveCb"),$o=Symbol("_enterCb");function kR(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return WI(()=>{n.isMounted=!0}),QI(()=>{n.isUnmounting=!0}),n}const vn=[Function,Array],jI={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:vn,onEnter:vn,onAfterEnter:vn,onEnterCancelled:vn,onBeforeLeave:vn,onLeave:vn,onAfterLeave:vn,onLeaveCancelled:vn,onBeforeAppear:vn,onAppear:vn,onAfterAppear:vn,onAppearCancelled:vn},GI=n=>{const e=n.subTree;return e.component?GI(e.component):e},NR={name:"BaseTransition",props:jI,setup(n,{slots:e}){const t=vf(),r=kR();return()=>{const i=e.default&&zI(e.default(),!0),s=i&&i.length?KI(i):t.subTree?wS():void 0;if(!s)return;const o=Pe(n),{mode:a}=o;if(r.isLeaving)return bh(s);const c=rg(s);if(!c)return bh(s);let l=ld(c,o,r,t,f=>l=f);c.type!==qt&&Va(c,l);let h=t.subTree&&rg(t.subTree);if(h&&h.type!==qt&&!Ui(h,c)&&GI(t).type!==qt){let f=ld(h,o,r,t);if(Va(h,f),a==="out-in"&&c.type!==qt)return r.isLeaving=!0,f.afterLeave=()=>{r.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,h=void 0},bh(s);a==="in-out"&&c.type!==qt?f.delayLeave=(p,g,b)=>{const T=$I(r,h);T[String(h.key)]=h,p[xn]=()=>{g(),p[xn]=void 0,delete l.delayedLeave,h=void 0},l.delayedLeave=()=>{b(),delete l.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return s}}};function KI(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==qt){e=t;break}}return e}const VR=NR;function $I(n,e){const{leavingVNodes:t}=n;let r=t.get(e.type);return r||(r=Object.create(null),t.set(e.type,r)),r}function ld(n,e,t,r,i){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:h,onEnterCancelled:f,onBeforeLeave:p,onLeave:g,onAfterLeave:b,onLeaveCancelled:T,onBeforeAppear:P,onAppear:k,onAfterAppear:D,onAppearCancelled:N}=e,L=String(n.key),H=$I(t,n),j=(y,v)=>{y&&kn(y,r,9,v)},E=(y,v)=>{const C=v[1];j(y,v),le(y)?y.every(R=>R.length<=1)&&C():y.length<=1&&C()},_={mode:o,persisted:a,beforeEnter(y){let v=c;if(!t.isMounted)if(s)v=P||c;else return;y[xn]&&y[xn](!0);const C=H[L];C&&Ui(n,C)&&C.el[xn]&&C.el[xn](),j(v,[y])},enter(y){if(H[L]===n)return;let v=l,C=h,R=f;if(!t.isMounted)if(s)v=k||l,C=D||h,R=N||f;else return;let w=!1;y[$o]=ut=>{w||(w=!0,ut?j(R,[y]):j(C,[y]),_.delayedLeave&&_.delayedLeave(),y[$o]=void 0)};const Se=y[$o].bind(null,!1);v?E(v,[y,Se]):Se()},leave(y,v){const C=String(n.key);if(y[$o]&&y[$o](!0),t.isUnmounting)return v();j(p,[y]);let R=!1;y[xn]=Se=>{R||(R=!0,v(),Se?j(T,[y]):j(b,[y]),y[xn]=void 0,H[C]===n&&delete H[C])};const w=y[xn].bind(null,!1);H[C]=n,g?E(g,[y,w]):w()},clone(y){const v=ld(y,e,t,r,i);return i&&i(v),v}};return _}function bh(n){if(ac(n))return n=ii(n),n.children=null,n}function rg(n){if(!ac(n))return qI(n.type)&&n.children?KI(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&ge(t.default))return t.default()}}function Va(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Va(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function zI(n,e=!1,t){let r=[],i=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===cn?(o.patchFlag&128&&i++,r=r.concat(zI(o.children,e,a))):(e||o.type!==qt)&&r.push(a!=null?ii(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function pf(n,e){return ge(n)?vt({name:n.name},e,{setup:n}):n}function mf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function ig(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Cu=new WeakMap;function ga(n,e,t,r,i=!1){if(le(n)){n.forEach((T,P)=>ga(T,e&&(le(e)?e[P]:e),t,r,i));return}if(Fs(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ga(n,e,t,r.component.subTree);return}const s=r.shapeFlag&4?_l(r.component):r.el,o=i?null:s,{i:a,r:c}=n,l=e&&e.r,h=a.refs===Ue?a.refs={}:a.refs,f=a.setupState,p=Pe(f),g=f===Ue?oI:T=>ig(h,T)?!1:Ne(p,T),b=(T,P)=>!(P&&ig(h,P));if(l!=null&&l!==c){if(sg(e),$e(l))h[l]=null,g(l)&&(f[l]=null);else if(it(l)){const T=e;b(l,T.k)&&(l.value=null),T.k&&(h[T.k]=null)}}if(ge(c))sc(c,a,12,[o,h]);else{const T=$e(c),P=it(c);if(T||P){const k=()=>{if(n.f){const D=T?g(c)?f[c]:h[c]:b()||!n.k?c.value:h[n.k];if(i)le(D)&&ef(D,s);else if(le(D))D.includes(s)||D.push(s);else if(T)h[c]=[s],g(c)&&(f[c]=h[c]);else{const N=[s];b(c,n.k)&&(c.value=N),n.k&&(h[n.k]=N)}}else T?(h[c]=o,g(c)&&(f[c]=o)):P&&(b(c,n.k)&&(c.value=o),n.k&&(h[n.k]=o))};if(o){const D=()=>{k(),Cu.delete(n)};D.id=-1,Cu.set(n,D),Wt(D,t)}else sg(n),k()}}}function sg(n){const e=Cu.get(n);e&&(e.flags|=8,Cu.delete(n))}const og=n=>n.nodeType===8;ll().requestIdleCallback;ll().cancelIdleCallback;function OR(n,e){if(og(n)&&n.data==="["){let t=1,r=n.nextSibling;for(;r;){if(r.nodeType===1){if(e(r)===!1)break}else if(og(r))if(r.data==="]"){if(--t===0)break}else r.data==="["&&t++;r=r.nextSibling}}else e(n)}const Fs=n=>!!n.type.__asyncLoader;function wU(n){ge(n)&&(n={loader:n});const{loader:e,loadingComponent:t,errorComponent:r,delay:i=200,hydrate:s,timeout:o,suspensible:a=!0,onError:c}=n;let l=null,h,f=0;const p=()=>(f++,l=null,g()),g=()=>{let b;return l||(b=l=e().catch(T=>{if(T=T instanceof Error?T:new Error(String(T)),c)return new Promise((P,k)=>{c(T,()=>P(p()),()=>k(T),f+1)});throw T}).then(T=>b!==l&&l?l:(T&&(T.__esModule||T[Symbol.toStringTag]==="Module")&&(T=T.default),h=T,T)))};return pf({name:"AsyncComponentWrapper",__asyncLoader:g,__asyncHydrate(b,T,P){let k=!1;(T.bu||(T.bu=[])).push(()=>k=!0);const D=()=>{k||P()},N=s?()=>{const L=s(D,H=>OR(b,H));L&&(T.bum||(T.bum=[])).push(L)}:D;h?N():g().then(()=>!T.isUnmounted&&N())},get __asyncResolved(){return h},setup(){const b=kt;if(mf(b),h)return()=>Jc(h,b);const T=N=>{l=null,oc(N,b,13,!r)};if(a&&b.suspense||$s)return g().then(N=>()=>Jc(N,b)).catch(N=>(T(N),()=>r?It(r,{error:N}):null));const P=jt(!1),k=jt(),D=jt(!!i);return i&&setTimeout(()=>{D.value=!1},i),o!=null&&setTimeout(()=>{if(!P.value&&!k.value){const N=new Error(`Async component timed out after ${o}ms.`);T(N),k.value=N}},o),g().then(()=>{P.value=!0,b.parent&&ac(b.parent.vnode)&&b.parent.update()}).catch(N=>{T(N),k.value=N}),()=>{if(P.value&&h)return Jc(h,b);if(k.value&&r)return It(r,{error:k.value});if(t&&!D.value)return Jc(t,b)}}})}function Jc(n,e){const{ref:t,props:r,children:i,ce:s}=e.vnode,o=It(n,r,i);return o.ref=t,o.ce=s,delete e.vnode.ce,o}const ac=n=>n.type.__isKeepAlive;function xR(n,e){HI(n,"a",e)}function LR(n,e){HI(n,"da",e)}function HI(n,e,t=kt){const r=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(pl(e,r,t),t){let i=t.parent;for(;i&&i.parent;)ac(i.parent.vnode)&&MR(r,e,t,i),i=i.parent}}function MR(n,e,t,r){const i=pl(e,n,r,!0);JI(()=>{ef(r[e],i)},t)}function pl(n,e,t=kt,r=!1){if(t){const i=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{yr();const a=cc(t),c=kn(e,t,n,o);return a(),Ir(),c});return r?i.unshift(s):i.push(s),s}}const Sr=n=>(e,t=kt)=>{(!$s||n==="sp")&&pl(n,(...r)=>e(...r),t)},FR=Sr("bm"),WI=Sr("m"),UR=Sr("bu"),BR=Sr("u"),QI=Sr("bum"),JI=Sr("um"),qR=Sr("sp"),jR=Sr("rtg"),GR=Sr("rtc");function KR(n,e=kt){pl("ec",n,e)}const YI="components";function $R(n,e){return ZI(YI,n,!0,e)||n}const XI=Symbol.for("v-ndc");function zR(n){return $e(n)?ZI(YI,n,!1)||n:n||XI}function ZI(n,e,t=!0,r=!1){const i=Ot||kt;if(i){const s=i.type;{const a=NS(s,!1);if(a&&(a===e||a===Yt(e)||a===cl(Yt(e))))return s}const o=ag(i[n]||s[n],e)||ag(i.appContext[n],e);return!o&&r?s:o}}function ag(n,e){return n&&(n[e]||n[Yt(e)]||n[cl(Yt(e))])}function AU(n,e,t,r){let i;const s=t,o=le(n);if(o||$e(n)){const a=o&&gr(n);let c=!1,l=!1;a&&(c=!dn(n),l=vr(n),n=hl(n)),i=new Array(n.length);for(let h=0,f=n.length;h<f;h++)i[h]=e(c?l?Ks(Dn(n[h])):Dn(n[h]):n[h],h,void 0,s)}else if(typeof n=="number"){i=new Array(n);for(let a=0;a<n;a++)i[a]=e(a+1,a,void 0,s)}else if(Ve(n))if(n[Symbol.iterator])i=Array.from(n,(a,c)=>e(a,c,void 0,s));else{const a=Object.keys(n);i=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const h=a[c];i[c]=e(n[h],h,c,s)}}else i=[];return i}function bU(n,e,t={},r,i){if(Ot.ce||Ot.parent&&Fs(Ot.parent)&&Ot.parent.ce){const l=Object.keys(t).length>0;return e!=="default"&&(t.name=e),Oa(),La(cn,null,[It("slot",t,r&&r())],l?-2:64)}let s=n[e];s&&s._c&&(s._d=!1),Oa();const o=s&&ev(s(t)),a=t.key||o&&o.key,c=La(cn,{key:(a&&!pn(a)?a:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&n._===1?64:-2);return c.scopeId&&(c.slotScopeIds=[c.scopeId+"-s"]),s&&s._c&&(s._d=!0),c}function ev(n){return n.some(e=>Ma(e)?!(e.type===qt||e.type===cn&&!ev(e.children)):!0)?n:null}const hd=n=>n?vv(n)?_l(n):hd(n.parent):null,_a=vt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>hd(n.parent),$root:n=>hd(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>nv(n),$forceUpdate:n=>n.f||(n.f=()=>{df(n.update)}),$nextTick:n=>n.n||(n.n=fl.bind(n.proxy)),$watch:n=>SR.bind(n)}),Rh=(n,e)=>n!==Ue&&!n.__isScriptSetup&&Ne(n,e),HR={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:c}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return r[e];case 2:return i[e];case 4:return t[e];case 3:return s[e]}else{if(Rh(r,e))return o[e]=1,r[e];if(i!==Ue&&Ne(i,e))return o[e]=2,i[e];if(Ne(s,e))return o[e]=3,s[e];if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];dd&&(o[e]=0)}}const l=_a[e];let h,f;if(l)return e==="$attrs"&&Bt(n.attrs,"get",""),l(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];if(f=c.config.globalProperties,Ne(f,e))return f[e]},set({_:n},e,t){const{data:r,setupState:i,ctx:s}=n;return Rh(i,e)?(i[e]=t,!0):r!==Ue&&Ne(r,e)?(r[e]=t,!0):Ne(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:i,props:s,type:o}},a){let c;return!!(t[a]||n!==Ue&&a[0]!=="$"&&Ne(n,a)||Rh(e,a)||Ne(s,a)||Ne(r,a)||Ne(_a,a)||Ne(i.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ne(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function cg(n){return le(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let dd=!0;function WR(n){const e=nv(n),t=n.proxy,r=n.ctx;dd=!1,e.beforeCreate&&ug(e.beforeCreate,n,"bc");const{data:i,computed:s,methods:o,watch:a,provide:c,inject:l,created:h,beforeMount:f,mounted:p,beforeUpdate:g,updated:b,activated:T,deactivated:P,beforeDestroy:k,beforeUnmount:D,destroyed:N,unmounted:L,render:H,renderTracked:j,renderTriggered:E,errorCaptured:_,serverPrefetch:y,expose:v,inheritAttrs:C,components:R,directives:w,filters:Se}=e;if(l&&QR(l,r,null),o)for(const pe in o){const Te=o[pe];ge(Te)&&(r[pe]=Te.bind(t))}if(i){const pe=i.call(t,t);Ve(pe)&&(n.data=ic(pe))}if(dd=!0,s)for(const pe in s){const Te=s[pe],sn=ge(Te)?Te.bind(t,t):ge(Te.get)?Te.get.bind(t,t):$n,bn=!ge(Te)&&ge(Te.set)?Te.set.bind(t):$n,_n=Nt({get:sn,set:bn});Object.defineProperty(r,pe,{enumerable:!0,configurable:!0,get:()=>_n.value,set:Xe=>_n.value=Xe})}if(a)for(const pe in a)tv(a[pe],r,t,pe);if(c){const pe=ge(c)?c.call(t):c;Reflect.ownKeys(pe).forEach(Te=>{lu(Te,pe[Te])})}h&&ug(h,n,"c");function Oe(pe,Te){le(Te)?Te.forEach(sn=>pe(sn.bind(t))):Te&&pe(Te.bind(t))}if(Oe(FR,f),Oe(WI,p),Oe(UR,g),Oe(BR,b),Oe(xR,T),Oe(LR,P),Oe(KR,_),Oe(GR,j),Oe(jR,E),Oe(QI,D),Oe(JI,L),Oe(qR,y),le(v))if(v.length){const pe=n.exposed||(n.exposed={});v.forEach(Te=>{Object.defineProperty(pe,Te,{get:()=>t[Te],set:sn=>t[Te]=sn,enumerable:!0})})}else n.exposed||(n.exposed={});H&&n.render===$n&&(n.render=H),C!=null&&(n.inheritAttrs=C),R&&(n.components=R),w&&(n.directives=w),y&&mf(n)}function QR(n,e,t=$n){le(n)&&(n=fd(n));for(const r in n){const i=n[r];let s;Ve(i)?"default"in i?s=Tn(i.from||r,i.default,!0):s=Tn(i.from||r):s=Tn(i),it(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[r]=s}}function ug(n,e,t){kn(le(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function tv(n,e,t,r){let i=r.includes(".")?UI(t,r):()=>t[r];if($e(n)){const s=e[n];ge(s)&&Ms(i,s)}else if(ge(n))Ms(i,n.bind(t));else if(Ve(n))if(le(n))n.forEach(s=>tv(s,e,t,r));else{const s=ge(n.handler)?n.handler.bind(t):e[n.handler];ge(s)&&Ms(i,s,n)}}function nv(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!t&&!r?c=e:(c={},i.length&&i.forEach(l=>Du(c,l,o,!0)),Du(c,e,o)),Ve(e)&&s.set(e,c),c}function Du(n,e,t,r=!1){const{mixins:i,extends:s}=e;s&&Du(n,s,t,!0),i&&i.forEach(o=>Du(n,o,t,!0));for(const o in e)if(!(r&&o==="expose")){const a=JR[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const JR={data:lg,props:hg,emits:hg,methods:ra,computed:ra,beforeCreate:Ht,created:Ht,beforeMount:Ht,mounted:Ht,beforeUpdate:Ht,updated:Ht,beforeDestroy:Ht,beforeUnmount:Ht,destroyed:Ht,unmounted:Ht,activated:Ht,deactivated:Ht,errorCaptured:Ht,serverPrefetch:Ht,components:ra,directives:ra,watch:XR,provide:lg,inject:YR};function lg(n,e){return e?n?function(){return vt(ge(n)?n.call(this,this):n,ge(e)?e.call(this,this):e)}:e:n}function YR(n,e){return ra(fd(n),fd(e))}function fd(n){if(le(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Ht(n,e){return n?[...new Set([].concat(n,e))]:e}function ra(n,e){return n?vt(Object.create(null),n,e):e}function hg(n,e){return n?le(n)&&le(e)?[...new Set([...n,...e])]:vt(Object.create(null),cg(n),cg(e??{})):e}function XR(n,e){if(!n)return e;if(!e)return n;const t=vt(Object.create(null),n);for(const r in e)t[r]=Ht(n[r],e[r]);return t}function rv(){return{app:null,config:{isNativeTag:oI,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ZR=0;function eS(n,e){return function(r,i=null){ge(r)||(r=vt({},r)),i!=null&&!Ve(i)&&(i=null);const s=rv(),o=new WeakSet,a=[];let c=!1;const l=s.app={_uid:ZR++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:OS,get config(){return s.config},set config(h){},use(h,...f){return o.has(h)||(h&&ge(h.install)?(o.add(h),h.install(l,...f)):ge(h)&&(o.add(h),h(l,...f))),l},mixin(h){return s.mixins.includes(h)||s.mixins.push(h),l},component(h,f){return f?(s.components[h]=f,l):s.components[h]},directive(h,f){return f?(s.directives[h]=f,l):s.directives[h]},mount(h,f,p){if(!c){const g=l._ceVNode||It(r,i);return g.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),n(g,h,p),c=!0,l._container=h,h.__vue_app__=l,_l(g.component)}},onUnmount(h){a.push(h)},unmount(){c&&(kn(a,l._instance,16),n(null,l._container),delete l._container.__vue_app__)},provide(h,f){return s.provides[h]=f,l},runWithContext(h){const f=Wi;Wi=l;try{return h()}finally{Wi=f}}};return l}}let Wi=null;const tS=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Yt(e)}Modifiers`]||n[`${_i(e)}Modifiers`];function nS(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||Ue;let i=t;const s=e.startsWith("update:"),o=s&&tS(r,e.slice(7));o&&(o.trim&&(i=t.map(h=>$e(h)?h.trim():h)),o.number&&(i=t.map(ul)));let a,c=r[a=vh(e)]||r[a=vh(Yt(e))];!c&&s&&(c=r[a=vh(_i(e))]),c&&kn(c,n,6,i);const l=r[a+"Once"];if(l){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,kn(l,n,6,i)}}const rS=new WeakMap;function iv(n,e,t=!1){const r=t?rS:e.emitsCache,i=r.get(n);if(i!==void 0)return i;const s=n.emits;let o={},a=!1;if(!ge(n)){const c=l=>{const h=iv(l,e,!0);h&&(a=!0,vt(o,h))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!s&&!a?(Ve(n)&&r.set(n,null),null):(le(s)?s.forEach(c=>o[c]=null):vt(o,s),Ve(n)&&r.set(n,o),o)}function ml(n,e){return!n||!il(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ne(n,e[0].toLowerCase()+e.slice(1))||Ne(n,_i(e))||Ne(n,e))}function dg(n){const{type:e,vnode:t,proxy:r,withProxy:i,propsOptions:[s],slots:o,attrs:a,emit:c,render:l,renderCache:h,props:f,data:p,setupState:g,ctx:b,inheritAttrs:T}=n,P=Pu(n);let k,D;try{if(t.shapeFlag&4){const L=i||r,H=L;k=Mn(l.call(H,L,h,f,g,p,b)),D=a}else{const L=e;k=Mn(L.length>1?L(f,{attrs:a,slots:o,emit:c}):L(f,null)),D=e.props?a:iS(a)}}catch(L){ya.length=0,oc(L,n,1),k=It(qt)}let N=k;if(D&&T!==!1){const L=Object.keys(D),{shapeFlag:H}=N;L.length&&H&7&&(s&&L.some(sl)&&(D=sS(D,s)),N=ii(N,D,!1,!0))}return t.dirs&&(N=ii(N,null,!1,!0),N.dirs=N.dirs?N.dirs.concat(t.dirs):t.dirs),t.transition&&Va(N,t.transition),k=N,Pu(P),k}const iS=n=>{let e;for(const t in n)(t==="class"||t==="style"||il(t))&&((e||(e={}))[t]=n[t]);return e},sS=(n,e)=>{const t={};for(const r in n)(!sl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function oS(n,e,t){const{props:r,children:i,component:s}=n,{props:o,children:a,patchFlag:c}=e,l=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?fg(r,o,l):!!o;if(c&8){const h=e.dynamicProps;for(let f=0;f<h.length;f++){const p=h[f];if(sv(o,r,p)&&!ml(l,p))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?fg(r,o,l):!0:!!o;return!1}function fg(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(sv(e,n,s)&&!ml(t,s))return!0}return!1}function sv(n,e,t){const r=n[t],i=e[t];return t==="style"&&Ve(r)&&Ve(i)?!ri(r,i):r!==i}function aS({vnode:n,parent:e,suspense:t},r){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=r,n=i),i===n)(n=e.vnode).el=r,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=r)}const ov={},av=()=>Object.create(ov),cv=n=>Object.getPrototypeOf(n)===ov;function cS(n,e,t,r=!1){const i={},s=av();n.propsDefaults=Object.create(null),uv(n,e,i,s);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=r?i:kI(i):n.type.props?n.props=i:n.props=s,n.attrs=s}function uS(n,e,t,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=n,a=Pe(i),[c]=n.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const h=n.vnode.dynamicProps;for(let f=0;f<h.length;f++){let p=h[f];if(ml(n.emitsOptions,p))continue;const g=e[p];if(c)if(Ne(s,p))g!==s[p]&&(s[p]=g,l=!0);else{const b=Yt(p);i[b]=pd(c,a,b,g,n,!1)}else g!==s[p]&&(s[p]=g,l=!0)}}}else{uv(n,e,i,s)&&(l=!0);let h;for(const f in a)(!e||!Ne(e,f)&&((h=_i(f))===f||!Ne(e,h)))&&(c?t&&(t[f]!==void 0||t[h]!==void 0)&&(i[f]=pd(c,a,f,void 0,n,!0)):delete i[f]);if(s!==a)for(const f in s)(!e||!Ne(e,f))&&(delete s[f],l=!0)}l&&sr(n.attrs,"set","")}function uv(n,e,t,r){const[i,s]=n.propsOptions;let o=!1,a;if(e)for(let c in e){if(fa(c))continue;const l=e[c];let h;i&&Ne(i,h=Yt(c))?!s||!s.includes(h)?t[h]=l:(a||(a={}))[h]=l:ml(n.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(s){const c=Pe(t),l=a||Ue;for(let h=0;h<s.length;h++){const f=s[h];t[f]=pd(i,c,f,l[f],n,!Ne(l,f))}}return o}function pd(n,e,t,r,i,s){const o=n[t];if(o!=null){const a=Ne(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ge(c)){const{propsDefaults:l}=i;if(t in l)r=l[t];else{const h=cc(i);r=l[t]=c.call(null,e),h()}}else r=c;i.ce&&i.ce._setProp(t,r)}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===_i(t))&&(r=!0))}return r}const lS=new WeakMap;function lv(n,e,t=!1){const r=t?lS:e.propsCache,i=r.get(n);if(i)return i;const s=n.props,o={},a=[];let c=!1;if(!ge(n)){const h=f=>{c=!0;const[p,g]=lv(f,e,!0);vt(o,p),g&&a.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(h),n.extends&&h(n.extends),n.mixins&&n.mixins.forEach(h)}if(!s&&!c)return Ve(n)&&r.set(n,Os),Os;if(le(s))for(let h=0;h<s.length;h++){const f=Yt(s[h]);pg(f)&&(o[f]=Ue)}else if(s)for(const h in s){const f=Yt(h);if(pg(f)){const p=s[h],g=o[f]=le(p)||ge(p)?{type:p}:vt({},p),b=g.type;let T=!1,P=!0;if(le(b))for(let k=0;k<b.length;++k){const D=b[k],N=ge(D)&&D.name;if(N==="Boolean"){T=!0;break}else N==="String"&&(P=!1)}else T=ge(b)&&b.name==="Boolean";g[0]=T,g[1]=P,(T||Ne(g,"default"))&&a.push(f)}}const l=[o,a];return Ve(n)&&r.set(n,l),l}function pg(n){return n[0]!=="$"&&!fa(n)}const gf=n=>n==="_"||n==="_ctx"||n==="$stable",_f=n=>le(n)?n.map(Mn):[Mn(n)],hS=(n,e,t)=>{if(e._n)return e;const r=ad((...i)=>_f(e(...i)),t);return r._c=!1,r},hv=(n,e,t)=>{const r=n._ctx;for(const i in n){if(gf(i))continue;const s=n[i];if(ge(s))e[i]=hS(i,s,r);else if(s!=null){const o=_f(s);e[i]=()=>o}}},dv=(n,e)=>{const t=_f(e);n.slots.default=()=>t},fv=(n,e,t)=>{for(const r in e)(t||!gf(r))&&(n[r]=e[r])},dS=(n,e,t)=>{const r=n.slots=av();if(n.vnode.shapeFlag&32){const i=e._;i?(fv(r,e,t),t&&lI(r,"_",i,!0)):hv(e,r)}else e&&dv(n,e)},fS=(n,e,t)=>{const{vnode:r,slots:i}=n;let s=!0,o=Ue;if(r.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:fv(i,e,t):(s=!e.$stable,hv(e,i)),o=e}else e&&(dv(n,e),o={default:1});if(s)for(const a in i)!gf(a)&&o[a]==null&&delete i[a]},Wt=yS;function pS(n){return mS(n)}function mS(n,e){const t=ll();t.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:c,setText:l,setElementText:h,parentNode:f,nextSibling:p,setScopeId:g=$n,insertStaticContent:b}=n,T=(A,S,V,U=null,G=null,q=null,ee=void 0,X=null,Q=!!S.dynamicChildren)=>{if(A===S)return;A&&!Ui(A,S)&&(U=B(A),Xe(A,G,q,!0),A=null),S.patchFlag===-2&&(Q=!1,S.dynamicChildren=null);const{type:z,ref:he,shapeFlag:ne}=S;switch(z){case gl:P(A,S,V,U);break;case qt:k(A,S,V,U);break;case hu:A==null&&D(S,V,U,ee);break;case cn:R(A,S,V,U,G,q,ee,X,Q);break;default:ne&1?H(A,S,V,U,G,q,ee,X,Q):ne&6?w(A,S,V,U,G,q,ee,X,Q):(ne&64||ne&128)&&z.process(A,S,V,U,G,q,ee,X,Q,ce)}he!=null&&G?ga(he,A&&A.ref,q,S||A,!S):he==null&&A&&A.ref!=null&&ga(A.ref,null,q,A,!0)},P=(A,S,V,U)=>{if(A==null)r(S.el=a(S.children),V,U);else{const G=S.el=A.el;S.children!==A.children&&l(G,S.children)}},k=(A,S,V,U)=>{A==null?r(S.el=c(S.children||""),V,U):S.el=A.el},D=(A,S,V,U)=>{[A.el,A.anchor]=b(A.children,S,V,U,A.el,A.anchor)},N=({el:A,anchor:S},V,U)=>{let G;for(;A&&A!==S;)G=p(A),r(A,V,U),A=G;r(S,V,U)},L=({el:A,anchor:S})=>{let V;for(;A&&A!==S;)V=p(A),i(A),A=V;i(S)},H=(A,S,V,U,G,q,ee,X,Q)=>{if(S.type==="svg"?ee="svg":S.type==="math"&&(ee="mathml"),A==null)j(S,V,U,G,q,ee,X,Q);else{const z=A.el&&A.el._isVueCE?A.el:null;try{z&&z._beginPatch(),y(A,S,G,q,ee,X,Q)}finally{z&&z._endPatch()}}},j=(A,S,V,U,G,q,ee,X)=>{let Q,z;const{props:he,shapeFlag:ne,transition:ue,dirs:de}=A;if(Q=A.el=o(A.type,q,he&&he.is,he),ne&8?h(Q,A.children):ne&16&&_(A.children,Q,null,U,G,Sh(A,q),ee,X),de&&Di(A,null,U,"created"),E(Q,A,A.scopeId,ee,U),he){for(const ye in he)ye!=="value"&&!fa(ye)&&s(Q,ye,null,he[ye],q,U);"value"in he&&s(Q,"value",null,he.value,q),(z=he.onVnodeBeforeMount)&&Vn(z,U,A)}de&&Di(A,null,U,"beforeMount");const fe=gS(G,ue);fe&&ue.beforeEnter(Q),r(Q,S,V),((z=he&&he.onVnodeMounted)||fe||de)&&Wt(()=>{try{z&&Vn(z,U,A),fe&&ue.enter(Q),de&&Di(A,null,U,"mounted")}finally{}},G)},E=(A,S,V,U,G)=>{if(V&&g(A,V),U)for(let q=0;q<U.length;q++)g(A,U[q]);if(G){let q=G.subTree;if(S===q||gv(q.type)&&(q.ssContent===S||q.ssFallback===S)){const ee=G.vnode;E(A,ee,ee.scopeId,ee.slotScopeIds,G.parent)}}},_=(A,S,V,U,G,q,ee,X,Q=0)=>{for(let z=Q;z<A.length;z++){const he=A[z]=X?ir(A[z]):Mn(A[z]);T(null,he,S,V,U,G,q,ee,X)}},y=(A,S,V,U,G,q,ee)=>{const X=S.el=A.el;let{patchFlag:Q,dynamicChildren:z,dirs:he}=S;Q|=A.patchFlag&16;const ne=A.props||Ue,ue=S.props||Ue;let de;if(V&&ki(V,!1),(de=ue.onVnodeBeforeUpdate)&&Vn(de,V,S,A),he&&Di(S,A,V,"beforeUpdate"),V&&ki(V,!0),(ne.innerHTML&&ue.innerHTML==null||ne.textContent&&ue.textContent==null)&&h(X,""),z?v(A.dynamicChildren,z,X,V,U,Sh(S,G),q):ee||Te(A,S,X,null,V,U,Sh(S,G),q,!1),Q>0){if(Q&16)C(X,ne,ue,V,G);else if(Q&2&&ne.class!==ue.class&&s(X,"class",null,ue.class,G),Q&4&&s(X,"style",ne.style,ue.style,G),Q&8){const fe=S.dynamicProps;for(let ye=0;ye<fe.length;ye++){const De=fe[ye],et=ne[De],ft=ue[De];(ft!==et||De==="value")&&s(X,De,et,ft,G,V)}}Q&1&&A.children!==S.children&&h(X,S.children)}else!ee&&z==null&&C(X,ne,ue,V,G);((de=ue.onVnodeUpdated)||he)&&Wt(()=>{de&&Vn(de,V,S,A),he&&Di(S,A,V,"updated")},U)},v=(A,S,V,U,G,q,ee)=>{for(let X=0;X<S.length;X++){const Q=A[X],z=S[X],he=Q.el&&(Q.type===cn||!Ui(Q,z)||Q.shapeFlag&198)?f(Q.el):V;T(Q,z,he,null,U,G,q,ee,!0)}},C=(A,S,V,U,G)=>{if(S!==V){if(S!==Ue)for(const q in S)!fa(q)&&!(q in V)&&s(A,q,S[q],null,G,U);for(const q in V){if(fa(q))continue;const ee=V[q],X=S[q];ee!==X&&q!=="value"&&s(A,q,X,ee,G,U)}"value"in V&&s(A,"value",S.value,V.value,G)}},R=(A,S,V,U,G,q,ee,X,Q)=>{const z=S.el=A?A.el:a(""),he=S.anchor=A?A.anchor:a("");let{patchFlag:ne,dynamicChildren:ue,slotScopeIds:de}=S;de&&(X=X?X.concat(de):de),A==null?(r(z,V,U),r(he,V,U),_(S.children||[],V,he,G,q,ee,X,Q)):ne>0&&ne&64&&ue&&A.dynamicChildren&&A.dynamicChildren.length===ue.length?(v(A.dynamicChildren,ue,V,G,q,ee,X),(S.key!=null||G&&S===G.subTree)&&yf(A,S,!0)):Te(A,S,V,he,G,q,ee,X,Q)},w=(A,S,V,U,G,q,ee,X,Q)=>{S.slotScopeIds=X,A==null?S.shapeFlag&512?G.ctx.activate(S,V,U,ee,Q):Se(S,V,U,G,q,ee,Q):ut(A,S,Q)},Se=(A,S,V,U,G,q,ee)=>{const X=A.component=SS(A,U,G);if(ac(A)&&(X.ctx.renderer=ce),PS(X,!1,ee),X.asyncDep){if(G&&G.registerDep(X,Oe,ee),!A.el){const Q=X.subTree=It(qt);k(null,Q,S,V),A.placeholder=Q.el}}else Oe(X,A,S,V,G,q,ee)},ut=(A,S,V)=>{const U=S.component=A.component;if(oS(A,S,V))if(U.asyncDep&&!U.asyncResolved){pe(U,S,V);return}else U.next=S,U.update();else S.el=A.el,U.vnode=S},Oe=(A,S,V,U,G,q,ee)=>{const X=()=>{if(A.isMounted){let{next:ne,bu:ue,u:de,parent:fe,vnode:ye}=A;{const xt=pv(A);if(xt){ne&&(ne.el=ye.el,pe(A,ne,ee)),xt.asyncDep.then(()=>{Wt(()=>{A.isUnmounted||z()},G)});return}}let De=ne,et;ki(A,!1),ne?(ne.el=ye.el,pe(A,ne,ee)):ne=ye,ue&&uu(ue),(et=ne.props&&ne.props.onVnodeBeforeUpdate)&&Vn(et,fe,ne,ye),ki(A,!0);const ft=dg(A),yn=A.subTree;A.subTree=ft,T(yn,ft,f(yn.el),B(yn),A,G,q),ne.el=ft.el,De===null&&aS(A,ft.el),de&&Wt(de,G),(et=ne.props&&ne.props.onVnodeUpdated)&&Wt(()=>Vn(et,fe,ne,ye),G)}else{let ne;const{el:ue,props:de}=S,{bm:fe,m:ye,parent:De,root:et,type:ft}=A,yn=Fs(S);ki(A,!1),fe&&uu(fe),!yn&&(ne=de&&de.onVnodeBeforeMount)&&Vn(ne,De,S),ki(A,!0);{et.ce&&et.ce._hasShadowRoot()&&et.ce._injectChildStyle(ft,A.parent?A.parent.type:void 0);const xt=A.subTree=dg(A);T(null,xt,V,U,A,G,q),S.el=xt.el}if(ye&&Wt(ye,G),!yn&&(ne=de&&de.onVnodeMounted)){const xt=S;Wt(()=>Vn(ne,De,xt),G)}(S.shapeFlag&256||De&&Fs(De.vnode)&&De.vnode.shapeFlag&256)&&A.a&&Wt(A.a,G),A.isMounted=!0,S=V=U=null}};A.scope.on();const Q=A.effect=new _I(X);A.scope.off();const z=A.update=Q.run.bind(Q),he=A.job=Q.runIfDirty.bind(Q);he.i=A,he.id=A.uid,Q.scheduler=()=>df(he),ki(A,!0),z()},pe=(A,S,V)=>{S.component=A;const U=A.vnode.props;A.vnode=S,A.next=null,uS(A,S.props,U,V),fS(A,S.children,V),yr(),eg(A),Ir()},Te=(A,S,V,U,G,q,ee,X,Q=!1)=>{const z=A&&A.children,he=A?A.shapeFlag:0,ne=S.children,{patchFlag:ue,shapeFlag:de}=S;if(ue>0){if(ue&128){bn(z,ne,V,U,G,q,ee,X,Q);return}else if(ue&256){sn(z,ne,V,U,G,q,ee,X,Q);return}}de&8?(he&16&&Zt(z,G,q),ne!==z&&h(V,ne)):he&16?de&16?bn(z,ne,V,U,G,q,ee,X,Q):Zt(z,G,q,!0):(he&8&&h(V,""),de&16&&_(ne,V,U,G,q,ee,X,Q))},sn=(A,S,V,U,G,q,ee,X,Q)=>{A=A||Os,S=S||Os;const z=A.length,he=S.length,ne=Math.min(z,he);let ue;for(ue=0;ue<ne;ue++){const de=S[ue]=Q?ir(S[ue]):Mn(S[ue]);T(A[ue],de,V,null,G,q,ee,X,Q)}z>he?Zt(A,G,q,!0,!1,ne):_(S,V,U,G,q,ee,X,Q,ne)},bn=(A,S,V,U,G,q,ee,X,Q)=>{let z=0;const he=S.length;let ne=A.length-1,ue=he-1;for(;z<=ne&&z<=ue;){const de=A[z],fe=S[z]=Q?ir(S[z]):Mn(S[z]);if(Ui(de,fe))T(de,fe,V,null,G,q,ee,X,Q);else break;z++}for(;z<=ne&&z<=ue;){const de=A[ne],fe=S[ue]=Q?ir(S[ue]):Mn(S[ue]);if(Ui(de,fe))T(de,fe,V,null,G,q,ee,X,Q);else break;ne--,ue--}if(z>ne){if(z<=ue){const de=ue+1,fe=de<he?S[de].el:U;for(;z<=ue;)T(null,S[z]=Q?ir(S[z]):Mn(S[z]),V,fe,G,q,ee,X,Q),z++}}else if(z>ue)for(;z<=ne;)Xe(A[z],G,q,!0),z++;else{const de=z,fe=z,ye=new Map;for(z=fe;z<=ue;z++){const Pt=S[z]=Q?ir(S[z]):Mn(S[z]);Pt.key!=null&&ye.set(Pt.key,z)}let De,et=0;const ft=ue-fe+1;let yn=!1,xt=0;const xr=new Array(ft);for(z=0;z<ft;z++)xr[z]=0;for(z=de;z<=ne;z++){const Pt=A[z];if(et>=ft){Xe(Pt,G,q,!0);continue}let In;if(Pt.key!=null)In=ye.get(Pt.key);else for(De=fe;De<=ue;De++)if(xr[De-fe]===0&&Ui(Pt,S[De])){In=De;break}In===void 0?Xe(Pt,G,q,!0):(xr[In-fe]=z+1,In>=xt?xt=In:yn=!0,T(Pt,S[In],V,null,G,q,ee,X,Q),et++)}const ko=yn?_S(xr):Os;for(De=ko.length-1,z=ft-1;z>=0;z--){const Pt=fe+z,In=S[Pt],Dc=S[Pt+1],ms=Pt+1<he?Dc.el||mv(Dc):U;xr[z]===0?T(null,In,V,ms,G,q,ee,X,Q):yn&&(De<0||z!==ko[De]?_n(In,V,ms,2):De--)}}},_n=(A,S,V,U,G=null)=>{const{el:q,type:ee,transition:X,children:Q,shapeFlag:z}=A;if(z&6){_n(A.component.subTree,S,V,U);return}if(z&128){A.suspense.move(S,V,U);return}if(z&64){ee.move(A,S,V,ce);return}if(ee===cn){r(q,S,V);for(let ne=0;ne<Q.length;ne++)_n(Q[ne],S,V,U);r(A.anchor,S,V);return}if(ee===hu){N(A,S,V);return}if(U!==2&&z&1&&X)if(U===0)X.beforeEnter(q),r(q,S,V),Wt(()=>X.enter(q),G);else{const{leave:ne,delayLeave:ue,afterLeave:de}=X,fe=()=>{A.ctx.isUnmounted?i(q):r(q,S,V)},ye=()=>{q._isLeaving&&q[xn](!0),ne(q,()=>{fe(),de&&de()})};ue?ue(q,fe,ye):ye()}else r(q,S,V)},Xe=(A,S,V,U=!1,G=!1)=>{const{type:q,props:ee,ref:X,children:Q,dynamicChildren:z,shapeFlag:he,patchFlag:ne,dirs:ue,cacheIndex:de,memo:fe}=A;if(ne===-2&&(G=!1),X!=null&&(yr(),ga(X,null,V,A,!0),Ir()),de!=null&&(S.renderCache[de]=void 0),he&256){S.ctx.deactivate(A);return}const ye=he&1&&ue,De=!Fs(A);let et;if(De&&(et=ee&&ee.onVnodeBeforeUnmount)&&Vn(et,S,A),he&6)on(A.component,V,U);else{if(he&128){A.suspense.unmount(V,U);return}ye&&Di(A,null,S,"beforeUnmount"),he&64?A.type.remove(A,S,V,ce,U):z&&!z.hasOnce&&(q!==cn||ne>0&&ne&64)?Zt(z,S,V,!1,!0):(q===cn&&ne&384||!G&&he&16)&&Zt(Q,S,V),U&&Ze(A)}const ft=fe!=null&&de==null;(De&&(et=ee&&ee.onVnodeUnmounted)||ye||ft)&&Wt(()=>{et&&Vn(et,S,A),ye&&Di(A,null,S,"unmounted"),ft&&(A.el=null)},V)},Ze=A=>{const{type:S,el:V,anchor:U,transition:G}=A;if(S===cn){Or(V,U);return}if(S===hu){L(A);return}const q=()=>{i(V),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(A.shapeFlag&1&&G&&!G.persisted){const{leave:ee,delayLeave:X}=G,Q=()=>ee(V,q);X?X(A.el,q,Q):Q()}else q()},Or=(A,S)=>{let V;for(;A!==S;)V=p(A),i(A),A=V;i(S)},on=(A,S,V)=>{const{bum:U,scope:G,job:q,subTree:ee,um:X,m:Q,a:z}=A;mg(Q),mg(z),U&&uu(U),G.stop(),q&&(q.flags|=8,Xe(ee,A,S,V)),X&&Wt(X,S),Wt(()=>{A.isUnmounted=!0},S)},Zt=(A,S,V,U=!1,G=!1,q=0)=>{for(let ee=q;ee<A.length;ee++)Xe(A[ee],S,V,U,G)},B=A=>{if(A.shapeFlag&6)return B(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const S=p(A.anchor||A.el),V=S&&S[BI];return V?p(V):S};let ie=!1;const te=(A,S,V)=>{let U;A==null?S._vnode&&(Xe(S._vnode,null,null,!0),U=S._vnode.component):T(S._vnode||null,A,S,null,null,null,V),S._vnode=A,ie||(ie=!0,eg(U),LI(),ie=!1)},ce={p:T,um:Xe,m:_n,r:Ze,mt:Se,mc:_,pc:Te,pbc:v,n:B,o:n};return{render:te,hydrate:void 0,createApp:eS(te)}}function Sh({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ki({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function gS(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function yf(n,e,t=!1){const r=n.children,i=e.children;if(le(r)&&le(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=ir(i[s]),a.el=o.el),!t&&a.patchFlag!==-2&&yf(o,a)),a.type===gl&&(a.patchFlag===-1&&(a=i[s]=ir(a)),a.el=o.el),a.type===qt&&!a.el&&(a.el=o.el)}}function _S(n){const e=n.slice(),t=[0];let r,i,s,o,a;const c=n.length;for(r=0;r<c;r++){const l=n[r];if(l!==0){if(i=t[t.length-1],n[i]<l){e[r]=i,t.push(r);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<l?s=a+1:o=a;l<n[t[s]]&&(s>0&&(e[r]=t[s-1]),t[s]=r)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function pv(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:pv(e)}function mg(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function mv(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?mv(e.subTree):null}const gv=n=>n.__isSuspense;function yS(n,e){e&&e.pendingBranch?le(n)?e.effects.push(...n):e.effects.push(n):wR(n)}const cn=Symbol.for("v-fgt"),gl=Symbol.for("v-txt"),qt=Symbol.for("v-cmt"),hu=Symbol.for("v-stc"),ya=[];let ln=null;function Oa(n=!1){ya.push(ln=n?null:[])}function IS(){ya.pop(),ln=ya[ya.length-1]||null}let xa=1;function ku(n,e=!1){xa+=n,n<0&&ln&&e&&(ln.hasOnce=!0)}function _v(n){return n.dynamicChildren=xa>0?ln||Os:null,IS(),xa>0&&ln&&ln.push(n),n}function RU(n,e,t,r,i,s){return _v(Iv(n,e,t,r,i,s,!0))}function La(n,e,t,r,i){return _v(It(n,e,t,r,i,!0))}function Ma(n){return n?n.__v_isVNode===!0:!1}function Ui(n,e){return n.type===e.type&&n.key===e.key}const yv=({key:n})=>n??null,du=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?$e(n)||it(n)||ge(n)?{i:Ot,r:n,k:e,f:!!t}:n:null);function Iv(n,e=null,t=null,r=0,i=null,s=n===cn?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&yv(e),ref:e&&du(e),scopeId:FI,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Ot};return a?(If(c,t),s&128&&n.normalize(c)):t&&(c.shapeFlag|=$e(t)?8:16),xa>0&&!o&&ln&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&ln.push(c),c}const It=vS;function vS(n,e=null,t=null,r=0,i=null,s=!1){if((!n||n===XI)&&(n=qt),Ma(n)){const a=ii(n,e,!0);return t&&If(a,t),xa>0&&!s&&ln&&(a.shapeFlag&6?ln[ln.indexOf(n)]=a:ln.push(a)),a.patchFlag=-2,a}if(VS(n)&&(n=n.__vccOpts),e){e=ES(e);let{class:a,style:c}=e;a&&!$e(a)&&(e.class=nf(a)),Ve(c)&&(dl(c)&&!le(c)&&(c=vt({},c)),e.style=tf(c))}const o=$e(n)?1:gv(n)?128:qI(n)?64:Ve(n)?4:ge(n)?2:0;return Iv(n,e,t,r,i,o,s,!0)}function ES(n){return n?dl(n)||cv(n)?vt({},n):n:null}function ii(n,e,t=!1,r=!1){const{props:i,ref:s,patchFlag:o,children:a,transition:c}=n,l=e?AS(i||{},e):i,h={__v_isVNode:!0,__v_skip:!0,type:n.type,props:l,key:l&&yv(l),ref:e&&e.ref?t&&s?le(s)?s.concat(du(e)):[s,du(e)]:du(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==cn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ii(n.ssContent),ssFallback:n.ssFallback&&ii(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&Va(h,c.clone(h)),h}function TS(n=" ",e=0){return It(gl,null,n,e)}function SU(n,e){const t=It(hu,null,n);return t.staticCount=e,t}function wS(n="",e=!1){return e?(Oa(),La(qt,null,n)):It(qt,null,n)}function Mn(n){return n==null||typeof n=="boolean"?It(qt):le(n)?It(cn,null,n.slice()):Ma(n)?ir(n):It(gl,null,String(n))}function ir(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ii(n)}function If(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(le(e))t=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),If(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!cv(e)?e._ctx=Ot:i===3&&Ot&&(Ot.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else ge(e)?(e={default:e,_ctx:Ot},t=32):(e=String(e),r&64?(t=16,e=[TS(e)]):t=8);n.children=e,n.shapeFlag|=t}function AS(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=nf([e.class,r.class]));else if(i==="style")e.style=tf([e.style,r.style]);else if(il(i)){const s=e[i],o=r[i];o&&s!==o&&!(le(s)&&s.includes(o))?e[i]=s?[].concat(s,o):o:o==null&&s==null&&!sl(i)&&(e[i]=o)}else i!==""&&(e[i]=r[i])}return e}function Vn(n,e,t,r=null){kn(n,e,7,[t,r])}const bS=rv();let RS=0;function SS(n,e,t){const r=n.type,i=(e?e.appContext:n.appContext)||bS,s={uid:RS++,vnode:n,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new pI(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:lv(r,i),emitsOptions:iv(r,i),emit:null,emitted:null,propsDefaults:Ue,inheritAttrs:r.inheritAttrs,ctx:Ue,data:Ue,props:Ue,attrs:Ue,slots:Ue,refs:Ue,setupState:Ue,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=nS.bind(null,s),n.ce&&n.ce(s),s}let kt=null;const vf=()=>kt||Ot;let Nu,md;{const n=ll(),e=(t,r)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};Nu=e("__VUE_INSTANCE_SETTERS__",t=>kt=t),md=e("__VUE_SSR_SETTERS__",t=>$s=t)}const cc=n=>{const e=kt;return Nu(n),n.scope.on(),()=>{n.scope.off(),Nu(e)}},gg=()=>{kt&&kt.scope.off(),Nu(null)};function vv(n){return n.vnode.shapeFlag&4}let $s=!1;function PS(n,e=!1,t=!1){e&&md(e);const{props:r,children:i}=n.vnode,s=vv(n);cS(n,r,s,e),dS(n,i,t||e);const o=s?CS(n,e):void 0;return e&&md(!1),o}function CS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,HR);const{setup:r}=t;if(r){yr();const i=n.setupContext=r.length>1?kS(n):null,s=cc(n),o=sc(r,n,0,[n.props,i]),a=aI(o);if(Ir(),s(),(a||n.sp)&&!Fs(n)&&mf(n),a){if(o.then(gg,gg),e)return o.then(c=>{_g(n,c)}).catch(c=>{oc(c,n,0)});n.asyncDep=o}else _g(n,o)}else Ev(n)}function _g(n,e,t){ge(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Ve(e)&&(n.setupState=VI(e)),Ev(n)}function Ev(n,e,t){const r=n.type;n.render||(n.render=r.render||$n);{const i=cc(n);yr();try{WR(n)}finally{Ir(),i()}}}const DS={get(n,e){return Bt(n,"get",""),n[e]}};function kS(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,DS),slots:n.slots,emit:n.emit,expose:e}}function _l(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(VI(hf(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in _a)return _a[t](n)},has(e,t){return t in e||t in _a}})):n.proxy}function NS(n,e=!0){return ge(n)?n.displayName||n.name:n.name||e&&n.__name}function VS(n){return ge(n)&&"__vccOpts"in n}const Nt=(n,e)=>yR(n,e,$s);function Ef(n,e,t){try{ku(-1);const r=arguments.length;return r===2?Ve(e)&&!le(e)?Ma(e)?It(n,null,[e]):It(n,e):It(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&Ma(t)&&(t=[t]),It(n,e,t))}finally{ku(1)}}const OS="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let gd;const yg=typeof window<"u"&&window.trustedTypes;if(yg)try{gd=yg.createPolicy("vue",{createHTML:n=>n})}catch{}const Tv=gd?n=>gd.createHTML(n):n=>n,xS="http://www.w3.org/2000/svg",LS="http://www.w3.org/1998/Math/MathML",rr=typeof document<"u"?document:null,Ig=rr&&rr.createElement("template"),MS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const i=e==="svg"?rr.createElementNS(xS,n):e==="mathml"?rr.createElementNS(LS,n):t?rr.createElement(n,{is:t}):rr.createElement(n);return n==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:n=>rr.createTextNode(n),createComment:n=>rr.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>rr.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,i,s){const o=t?t.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===s||!(i=i.nextSibling)););else{Ig.innerHTML=Tv(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const a=Ig.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ur="transition",zo="animation",Fa=Symbol("_vtc"),wv={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},FS=vt({},jI,wv),US=n=>(n.displayName="Transition",n.props=FS,n),BS=US((n,{slots:e})=>Ef(VR,qS(n),e)),Ni=(n,e=[])=>{le(n)?n.forEach(t=>t(...e)):n&&n(...e)},vg=n=>n?le(n)?n.some(e=>e.length>1):n.length>1:!1;function qS(n){const e={};for(const R in n)R in wv||(e[R]=n[R]);if(n.css===!1)return e;const{name:t="v",type:r,duration:i,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:c=s,appearActiveClass:l=o,appearToClass:h=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:p=`${t}-leave-active`,leaveToClass:g=`${t}-leave-to`}=n,b=jS(i),T=b&&b[0],P=b&&b[1],{onBeforeEnter:k,onEnter:D,onEnterCancelled:N,onLeave:L,onLeaveCancelled:H,onBeforeAppear:j=k,onAppear:E=D,onAppearCancelled:_=N}=e,y=(R,w,Se,ut)=>{R._enterCancelled=ut,Vi(R,w?h:a),Vi(R,w?l:o),Se&&Se()},v=(R,w)=>{R._isLeaving=!1,Vi(R,f),Vi(R,g),Vi(R,p),w&&w()},C=R=>(w,Se)=>{const ut=R?E:D,Oe=()=>y(w,R,Se);Ni(ut,[w,Oe]),Eg(()=>{Vi(w,R?c:s),tr(w,R?h:a),vg(ut)||Tg(w,r,T,Oe)})};return vt(e,{onBeforeEnter(R){Ni(k,[R]),tr(R,s),tr(R,o)},onBeforeAppear(R){Ni(j,[R]),tr(R,c),tr(R,l)},onEnter:C(!1),onAppear:C(!0),onLeave(R,w){R._isLeaving=!0;const Se=()=>v(R,w);tr(R,f),R._enterCancelled?(tr(R,p),bg(R)):(bg(R),tr(R,p)),Eg(()=>{R._isLeaving&&(Vi(R,f),tr(R,g),vg(L)||Tg(R,r,P,Se))}),Ni(L,[R,Se])},onEnterCancelled(R){y(R,!1,void 0,!0),Ni(N,[R])},onAppearCancelled(R){y(R,!0,void 0,!0),Ni(_,[R])},onLeaveCancelled(R){v(R),Ni(H,[R])}})}function jS(n){if(n==null)return null;if(Ve(n))return[Ph(n.enter),Ph(n.leave)];{const e=Ph(n);return[e,e]}}function Ph(n){return Lb(n)}function tr(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Fa]||(n[Fa]=new Set)).add(e)}function Vi(n,e){e.split(/\s+/).forEach(r=>r&&n.classList.remove(r));const t=n[Fa];t&&(t.delete(e),t.size||(n[Fa]=void 0))}function Eg(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let GS=0;function Tg(n,e,t,r){const i=n._endId=++GS,s=()=>{i===n._endId&&r()};if(t!=null)return setTimeout(s,t);const{type:o,timeout:a,propCount:c}=KS(n,e);if(!o)return r();const l=o+"end";let h=0;const f=()=>{n.removeEventListener(l,p),s()},p=g=>{g.target===n&&++h>=c&&f()};setTimeout(()=>{h<c&&f()},a+1),n.addEventListener(l,p)}function KS(n,e){const t=window.getComputedStyle(n),r=b=>(t[b]||"").split(", "),i=r(`${Ur}Delay`),s=r(`${Ur}Duration`),o=wg(i,s),a=r(`${zo}Delay`),c=r(`${zo}Duration`),l=wg(a,c);let h=null,f=0,p=0;e===Ur?o>0&&(h=Ur,f=o,p=s.length):e===zo?l>0&&(h=zo,f=l,p=c.length):(f=Math.max(o,l),h=f>0?o>l?Ur:zo:null,p=h?h===Ur?s.length:c.length:0);const g=h===Ur&&/\b(?:transform|all)(?:,|$)/.test(r(`${Ur}Property`).toString());return{type:h,timeout:f,propCount:p,hasTransform:g}}function wg(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,r)=>Ag(t)+Ag(n[r])))}function Ag(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function bg(n){return(n?n.ownerDocument:document).body.offsetHeight}function $S(n,e,t){const r=n[Fa];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Vu=Symbol("_vod"),Av=Symbol("_vsh"),PU={name:"show",beforeMount(n,{value:e},{transition:t}){n[Vu]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):Ho(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:r}){!e!=!t&&(r?e?(r.beforeEnter(n),Ho(n,!0),r.enter(n)):r.leave(n,()=>{Ho(n,!1)}):Ho(n,e))},beforeUnmount(n,{value:e}){Ho(n,e)}};function Ho(n,e){n.style.display=e?n[Vu]:"none",n[Av]=!e}const zS=Symbol(""),HS=/(?:^|;)\s*display\s*:/;function WS(n,e,t){const r=n.style,i=$e(t);let s=!1;if(t&&!i){if(e)if($e(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&ia(r,a,"")}else for(const o in e)t[o]==null&&ia(r,o,"");for(const o in t){o==="display"&&(s=!0);const a=t[o];a!=null?JS(n,o,!$e(e)&&e?e[o]:void 0,a)||ia(r,o,a):ia(r,o,"")}}else if(i){if(e!==t){const o=r[zS];o&&(t+=";"+o),r.cssText=t,s=HS.test(t)}}else e&&n.removeAttribute("style");Vu in n&&(n[Vu]=s?r.display:"",n[Av]&&(r.display="none"))}const Rg=/\s*!important$/;function ia(n,e,t){if(le(t))t.forEach(r=>ia(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=QS(n,e);Rg.test(t)?n.setProperty(_i(r),t.replace(Rg,""),"important"):n[r]=t}}const Sg=["Webkit","Moz","ms"],Ch={};function QS(n,e){const t=Ch[e];if(t)return t;let r=Yt(e);if(r!=="filter"&&r in n)return Ch[e]=r;r=cl(r);for(let i=0;i<Sg.length;i++){const s=Sg[i]+r;if(s in n)return Ch[e]=s}return e}function JS(n,e,t,r){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&$e(r)&&t===r}const Pg="http://www.w3.org/1999/xlink";function Cg(n,e,t,r,i,s=jb(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Pg,e.slice(6,e.length)):n.setAttributeNS(Pg,e,t):t==null||s&&!hI(t)?n.removeAttribute(e):n.setAttribute(e,s?"":pn(t)?String(t):t)}function Dg(n,e,t,r,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Tv(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(a!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=hI(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function ar(n,e,t,r){n.addEventListener(e,t,r)}function YS(n,e,t,r){n.removeEventListener(e,t,r)}const kg=Symbol("_vei");function XS(n,e,t,r,i=null){const s=n[kg]||(n[kg]={}),o=s[e];if(r&&o)o.value=r;else{const[a,c]=ZS(e);if(r){const l=s[e]=nP(r,i);ar(n,a,l,c)}else o&&(YS(n,a,o,c),s[e]=void 0)}}const Ng=/(?:Once|Passive|Capture)$/;function ZS(n){let e;if(Ng.test(n)){e={};let r;for(;r=n.match(Ng);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):_i(n.slice(2)),e]}let Dh=0;const eP=Promise.resolve(),tP=()=>Dh||(eP.then(()=>Dh=0),Dh=Date.now());function nP(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;kn(rP(r,t.value),e,5,[r])};return t.value=n,t.attached=tP(),t}function rP(n,e){if(le(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Vg=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,iP=(n,e,t,r,i,s)=>{const o=i==="svg";e==="class"?$S(n,r,o):e==="style"?WS(n,t,r):il(e)?sl(e)||XS(n,e,t,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):sP(n,e,r,o))?(Dg(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Cg(n,e,r,o,s,e!=="value")):n._isVueCE&&(oP(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!$e(r)))?Dg(n,Yt(e),r,s,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),Cg(n,e,r,o))};function sP(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Vg(e)&&ge(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Vg(e)&&$e(t)?!1:e in n}function oP(n,e){const t=n._def.props;if(!t)return!1;const r=Yt(e);return Array.isArray(t)?t.some(i=>Yt(i)===r):Object.keys(t).some(i=>Yt(i)===r)}const si=n=>{const e=n.props["onUpdate:modelValue"]||!1;return le(e)?t=>uu(e,t):e};function aP(n){n.target.composing=!0}function Og(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const wn=Symbol("_assign");function xg(n,e,t){return e&&(n=n.trim()),t&&(n=ul(n)),n}const Lg={created(n,{modifiers:{lazy:e,trim:t,number:r}},i){n[wn]=si(i);const s=r||i.props&&i.props.type==="number";ar(n,e?"change":"input",o=>{o.target.composing||n[wn](xg(n.value,t,s))}),(t||s)&&ar(n,"change",()=>{n.value=xg(n.value,t,s)}),e||(ar(n,"compositionstart",aP),ar(n,"compositionend",Og),ar(n,"change",Og))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:r,trim:i,number:s}},o){if(n[wn]=si(o),n.composing)return;const a=(s||n.type==="number")&&!/^0\d/.test(n.value)?ul(n.value):n.value,c=e??"";if(a===c)return;const l=n.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===n&&n.type!=="range"&&(r&&e===t||i&&n.value.trim()===c)||(n.value=c)}},cP={deep:!0,created(n,e,t){n[wn]=si(t),ar(n,"change",()=>{const r=n._modelValue,i=zs(n),s=n.checked,o=n[wn];if(le(r)){const a=rf(r,i),c=a!==-1;if(s&&!c)o(r.concat(i));else if(!s&&c){const l=[...r];l.splice(a,1),o(l)}}else if(ho(r)){const a=new Set(r);s?a.add(i):a.delete(i),o(a)}else o(bv(n,s))})},mounted:Mg,beforeUpdate(n,e,t){n[wn]=si(t),Mg(n,e,t)}};function Mg(n,{value:e,oldValue:t},r){n._modelValue=e;let i;if(le(e))i=rf(e,r.props.value)>-1;else if(ho(e))i=e.has(r.props.value);else{if(e===t)return;i=ri(e,bv(n,!0))}n.checked!==i&&(n.checked=i)}const uP={created(n,{value:e},t){n.checked=ri(e,t.props.value),n[wn]=si(t),ar(n,"change",()=>{n[wn](zs(n))})},beforeUpdate(n,{value:e,oldValue:t},r){n[wn]=si(r),e!==t&&(n.checked=ri(e,r.props.value))}},lP={deep:!0,created(n,{value:e,modifiers:{number:t}},r){const i=ho(e);ar(n,"change",()=>{const s=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?ul(zs(o)):zs(o));n[wn](n.multiple?i?new Set(s):s:s[0]),n._assigning=!0,fl(()=>{n._assigning=!1})}),n[wn]=si(r)},mounted(n,{value:e}){Fg(n,e)},beforeUpdate(n,e,t){n[wn]=si(t)},updated(n,{value:e}){n._assigning||Fg(n,e)}};function Fg(n,e){const t=n.multiple,r=le(e);if(!(t&&!r&&!ho(e))){for(let i=0,s=n.options.length;i<s;i++){const o=n.options[i],a=zs(o);if(t)if(r){const c=typeof a;c==="string"||c==="number"?o.selected=e.some(l=>String(l)===String(a)):o.selected=rf(e,a)>-1}else o.selected=e.has(a);else if(ri(zs(o),e)){n.selectedIndex!==i&&(n.selectedIndex=i);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function zs(n){return"_value"in n?n._value:n.value}function bv(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const CU={created(n,e,t){Yc(n,e,t,null,"created")},mounted(n,e,t){Yc(n,e,t,null,"mounted")},beforeUpdate(n,e,t,r){Yc(n,e,t,r,"beforeUpdate")},updated(n,e,t,r){Yc(n,e,t,r,"updated")}};function hP(n,e){switch(n){case"SELECT":return lP;case"TEXTAREA":return Lg;default:switch(e){case"checkbox":return cP;case"radio":return uP;default:return Lg}}}function Yc(n,e,t,r,i){const o=hP(n.tagName,t.props&&t.props.type)[i];o&&o(n,e,t,r)}const dP=["ctrl","shift","alt","meta"],fP={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>dP.some(t=>n[`${t}Key`]&&!e.includes(t))},DU=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),r=e.join(".");return t[r]||(t[r]=((i,...s)=>{for(let o=0;o<e.length;o++){const a=fP[e[o]];if(a&&a(i,e))return}return n(i,...s)}))},pP={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},kU=(n,e)=>{const t=n._withKeys||(n._withKeys={}),r=e.join(".");return t[r]||(t[r]=(i=>{if(!("key"in i))return;const s=_i(i.key);if(e.some(o=>o===s||pP[o]===s))return n(i)}))},mP=vt({patchProp:iP},MS);let Ug;function gP(){return Ug||(Ug=pS(mP))}const _P=((...n)=>{const e=gP().createApp(...n),{mount:t}=e;return e.mount=r=>{const i=IP(r);if(!i)return;const s=e._component;!ge(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,yP(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e});function yP(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function IP(n){return $e(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Rv;const yl=n=>Rv=n,Sv=Symbol();function _d(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var Ia;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(Ia||(Ia={}));function vP(){const n=mI(!0),e=n.run(()=>jt({}));let t=[],r=[];const i=hf({install(s){yl(i),i._a=s,s.provide(Sv,i),s.config.globalProperties.$pinia=i,r.forEach(o=>t.push(o)),r=[]},use(s){return this._a?t.push(s):r.push(s),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return i}const Pv=()=>{};function Bg(n,e,t,r=Pv){n.push(e);const i=()=>{const s=n.indexOf(e);s>-1&&(n.splice(s,1),r())};return!t&&gI()&&$b(i),i}function Es(n,...e){n.slice().forEach(t=>{t(...e)})}const EP=n=>n(),qg=Symbol(),kh=Symbol();function yd(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,r)=>n.set(r,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const r=e[t],i=n[t];_d(i)&&_d(r)&&n.hasOwnProperty(t)&&!it(r)&&!gr(r)?n[t]=yd(i,r):n[t]=r}return n}const TP=Symbol();function wP(n){return!_d(n)||!n.hasOwnProperty(TP)}const{assign:$r}=Object;function AP(n){return!!(it(n)&&n.effect)}function bP(n,e,t,r){const{state:i,actions:s,getters:o}=e,a=t.state.value[n];let c;function l(){a||(t.state.value[n]=i?i():{});const h=pR(t.state.value[n]);return $r(h,s,Object.keys(o||{}).reduce((f,p)=>(f[p]=hf(Nt(()=>{yl(t);const g=t._s.get(n);return o[p].call(g,g)})),f),{}))}return c=Cv(n,l,e,t,r,!0),c}function Cv(n,e,t={},r,i,s){let o;const a=$r({actions:{}},t),c={deep:!0};let l,h,f=[],p=[],g;const b=r.state.value[n];!s&&!b&&(r.state.value[n]={});let T;function P(_){let y;l=h=!1,typeof _=="function"?(_(r.state.value[n]),y={type:Ia.patchFunction,storeId:n,events:g}):(yd(r.state.value[n],_),y={type:Ia.patchObject,payload:_,storeId:n,events:g});const v=T=Symbol();fl().then(()=>{T===v&&(l=!0)}),h=!0,Es(f,y,r.state.value[n])}const k=s?function(){const{state:y}=t,v=y?y():{};this.$patch(C=>{$r(C,v)})}:Pv;function D(){o.stop(),f=[],p=[],r._s.delete(n)}const N=(_,y="")=>{if(qg in _)return _[kh]=y,_;const v=function(){yl(r);const C=Array.from(arguments),R=[],w=[];function Se(pe){R.push(pe)}function ut(pe){w.push(pe)}Es(p,{args:C,name:v[kh],store:H,after:Se,onError:ut});let Oe;try{Oe=_.apply(this&&this.$id===n?this:H,C)}catch(pe){throw Es(w,pe),pe}return Oe instanceof Promise?Oe.then(pe=>(Es(R,pe),pe)).catch(pe=>(Es(w,pe),Promise.reject(pe))):(Es(R,Oe),Oe)};return v[qg]=!0,v[kh]=y,v},L={_p:r,$id:n,$onAction:Bg.bind(null,p),$patch:P,$reset:k,$subscribe(_,y={}){const v=Bg(f,_,y.detached,()=>C()),C=o.run(()=>Ms(()=>r.state.value[n],R=>{(y.flush==="sync"?h:l)&&_({storeId:n,type:Ia.direct,events:g},R)},$r({},c,y)));return v},$dispose:D},H=ic(L);r._s.set(n,H);const E=(r._a&&r._a.runWithContext||EP)(()=>r._e.run(()=>(o=mI()).run(()=>e({action:N}))));for(const _ in E){const y=E[_];if(it(y)&&!AP(y)||gr(y))s||(b&&wP(y)&&(it(y)?y.value=b[_]:yd(y,b[_])),r.state.value[n][_]=y);else if(typeof y=="function"){const v=N(y,_);E[_]=v,a.actions[_]=y}}return $r(H,E),$r(Pe(H),E),Object.defineProperty(H,"$state",{get:()=>r.state.value[n],set:_=>{P(y=>{$r(y,_)})}}),r._p.forEach(_=>{$r(H,o.run(()=>_({store:H,app:r._a,pinia:r,options:a})))}),b&&s&&t.hydrate&&t.hydrate(H.$state,b),l=!0,h=!0,H}/*! #__NO_SIDE_EFFECTS__ */function Tf(n,e,t){let r,i;const s=typeof e=="function";typeof n=="string"?(r=n,i=s?t:e):(i=n,r=n.id);function o(a,c){const l=AR();return a=a||(l?Tn(Sv,null):null),a&&yl(a),a=Rv,a._s.has(r)||(s?Cv(r,e,i,a):bP(r,i,a)),a._s.get(r)}return o.$id=r,o}var jg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},RP=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},kv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,h=s>>2,f=(s&3)<<4|a>>4;let p=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(p=64)),r.push(t[h],t[f],t[p],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dv(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):RP(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const f=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||f==null)throw new SP;const p=s<<2|a>>4;if(r.push(p),l!==64){const g=a<<4&240|l>>2;if(r.push(g),f!==64){const b=l<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class SP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const PP=function(n){const e=Dv(n);return kv.encodeByteArray(e,!0)},Ou=function(n){return PP(n).replace(/\./g,"")},Nv=function(n){try{return kv.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function CP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const DP=()=>CP().__FIREBASE_DEFAULTS__,kP=()=>{if(typeof process>"u"||typeof jg>"u")return;const n=jg.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},NP=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Nv(n[1]);return e&&JSON.parse(e)},Il=()=>{try{return DP()||kP()||NP()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vv=n=>{var e,t;return(t=(e=Il())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ov=n=>{const e=Vv(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},xv=()=>{var n;return(n=Il())===null||n===void 0?void 0:n.config},Lv=n=>{var e;return(e=Il())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VP{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Mv(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ou(JSON.stringify(t)),Ou(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function OP(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Et())}function xP(){var n;const e=(n=Il())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function MP(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function FP(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function UP(){const n=Et();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Fv(){return!xP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Uv(){try{return typeof indexedDB=="object"}catch{return!1}}function BP(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qP="FirebaseError";class Yn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qP,Object.setPrototypeOf(this,Yn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,uc.prototype.create)}}class uc{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?jP(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Yn(i,a,r)}}function jP(n,e){return n.replace(GP,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const GP=/\{\$([^}]+)}/g;function KP(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function oi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Gg(s)&&Gg(o)){if(!oi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Gg(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fo(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function sa(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function oa(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function $P(n,e){const t=new zP(n,e);return t.subscribe.bind(t)}class zP{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");HP(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Nh),i.error===void 0&&(i.error=Nh),i.complete===void 0&&(i.complete=Nh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function HP(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Nh(){}/**
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
 */function oe(n){return n&&n._delegate?n._delegate:n}class ai{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Li="[DEFAULT]";/**
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
 */class WP{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new VP;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(JP(e))try{this.getOrInitializeService({instanceIdentifier:Li})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Li){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Li){return this.instances.has(e)}getOptions(e=Li){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:QP(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Li){return this.component?this.component.multipleInstances?e:Li:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function QP(n){return n===Li?void 0:n}function JP(n){return n.instantiationMode==="EAGER"}/**
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
 */class YP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new WP(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const XP={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},ZP=we.INFO,e0={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},t0=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=e0[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wf{constructor(e){this.name=e,this._logLevel=ZP,this._logHandler=t0,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?XP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const n0=(n,e)=>e.some(t=>n instanceof t);let Kg,$g;function r0(){return Kg||(Kg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function i0(){return $g||($g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bv=new WeakMap,Id=new WeakMap,qv=new WeakMap,Vh=new WeakMap,Af=new WeakMap;function s0(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ei(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Bv.set(t,n)}).catch(()=>{}),Af.set(e,n),e}function o0(n){if(Id.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Id.set(n,e)}let vd={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Id.get(n);if(e==="objectStoreNames")return n.objectStoreNames||qv.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ei(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function a0(n){vd=n(vd)}function c0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Oh(this),e,...t);return qv.set(r,e.sort?e.sort():[e]),ei(r)}:i0().includes(n)?function(...e){return n.apply(Oh(this),e),ei(Bv.get(this))}:function(...e){return ei(n.apply(Oh(this),e))}}function u0(n){return typeof n=="function"?c0(n):(n instanceof IDBTransaction&&o0(n),n0(n,r0())?new Proxy(n,vd):n)}function ei(n){if(n instanceof IDBRequest)return s0(n);if(Vh.has(n))return Vh.get(n);const e=u0(n);return e!==n&&(Vh.set(n,e),Af.set(e,n)),e}const Oh=n=>Af.get(n);function l0(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=ei(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ei(o.result),c.oldVersion,c.newVersion,ei(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const h0=["get","getKey","getAll","getAllKeys","count"],d0=["put","add","delete","clear"],xh=new Map;function zg(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xh.get(e))return xh.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=d0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||h0.includes(t)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return xh.set(e,s),s}a0(n=>({...n,get:(e,t,r)=>zg(e,t)||n.get(e,t,r),has:(e,t)=>!!zg(e,t)||n.has(e,t)}));/**
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
 */class f0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(p0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function p0(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ed="@firebase/app",Hg="0.10.13";/**
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
 */const Er=new wf("@firebase/app"),m0="@firebase/app-compat",g0="@firebase/analytics-compat",_0="@firebase/analytics",y0="@firebase/app-check-compat",I0="@firebase/app-check",v0="@firebase/auth",E0="@firebase/auth-compat",T0="@firebase/database",w0="@firebase/data-connect",A0="@firebase/database-compat",b0="@firebase/functions",R0="@firebase/functions-compat",S0="@firebase/installations",P0="@firebase/installations-compat",C0="@firebase/messaging",D0="@firebase/messaging-compat",k0="@firebase/performance",N0="@firebase/performance-compat",V0="@firebase/remote-config",O0="@firebase/remote-config-compat",x0="@firebase/storage",L0="@firebase/storage-compat",M0="@firebase/firestore",F0="@firebase/vertexai-preview",U0="@firebase/firestore-compat",B0="firebase",q0="10.14.1";/**
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
 */const xu="[DEFAULT]",j0={[Ed]:"fire-core",[m0]:"fire-core-compat",[_0]:"fire-analytics",[g0]:"fire-analytics-compat",[I0]:"fire-app-check",[y0]:"fire-app-check-compat",[v0]:"fire-auth",[E0]:"fire-auth-compat",[T0]:"fire-rtdb",[w0]:"fire-data-connect",[A0]:"fire-rtdb-compat",[b0]:"fire-fn",[R0]:"fire-fn-compat",[S0]:"fire-iid",[P0]:"fire-iid-compat",[C0]:"fire-fcm",[D0]:"fire-fcm-compat",[k0]:"fire-perf",[N0]:"fire-perf-compat",[V0]:"fire-rc",[O0]:"fire-rc-compat",[x0]:"fire-gcs",[L0]:"fire-gcs-compat",[M0]:"fire-fst",[U0]:"fire-fst-compat",[F0]:"fire-vertex","fire-js":"fire-js",[B0]:"fire-js-all"};/**
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
 */const Lu=new Map,G0=new Map,Td=new Map;function Wg(n,e){try{n.container.addComponent(e)}catch(t){Er.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Zi(n){const e=n.name;if(Td.has(e))return Er.debug(`There were multiple attempts to register component ${e}.`),!1;Td.set(e,n);for(const t of Lu.values())Wg(t,n);for(const t of G0.values())Wg(t,n);return!0}function po(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function K0(n,e,t=xu){po(n,e).clearInstance(t)}function ht(n){return n.settings!==void 0}/**
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
 */const $0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ti=new uc("app","Firebase",$0);/**
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
 */class z0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ai("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ti.create("app-deleted",{appName:this._name})}}/**
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
 */const ls=q0;function bf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:xu,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ti.create("bad-app-name",{appName:String(i)});if(t||(t=xv()),!t)throw ti.create("no-options");const s=Lu.get(i);if(s){if(oi(t,s.options)&&oi(r,s.config))return s;throw ti.create("duplicate-app",{appName:i})}const o=new YP(i);for(const c of Td.values())o.addComponent(c);const a=new z0(t,r,o);return Lu.set(i,a),a}function vl(n=xu){const e=Lu.get(n);if(!e&&n===xu&&xv())return bf();if(!e)throw ti.create("no-app",{appName:n});return e}function zn(n,e,t){var r;let i=(r=j0[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Er.warn(a.join(" "));return}Zi(new ai(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const H0="firebase-heartbeat-database",W0=1,Ua="firebase-heartbeat-store";let Lh=null;function jv(){return Lh||(Lh=l0(H0,W0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ua)}catch(t){console.warn(t)}}}}).catch(n=>{throw ti.create("idb-open",{originalErrorMessage:n.message})})),Lh}async function Q0(n){try{const t=(await jv()).transaction(Ua),r=await t.objectStore(Ua).get(Gv(n));return await t.done,r}catch(e){if(e instanceof Yn)Er.warn(e.message);else{const t=ti.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Er.warn(t.message)}}}async function Qg(n,e){try{const r=(await jv()).transaction(Ua,"readwrite");await r.objectStore(Ua).put(e,Gv(n)),await r.done}catch(t){if(t instanceof Yn)Er.warn(t.message);else{const r=ti.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Er.warn(r.message)}}}function Gv(n){return`${n.name}!${n.options.appId}`}/**
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
 */const J0=1024,Y0=720*60*60*1e3;class X0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new eC(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Jg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Y0}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Er.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Jg(),{heartbeatsToSend:r,unsentEntries:i}=Z0(this._heartbeatsCache.heartbeats),s=Ou(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Er.warn(t),""}}}function Jg(){return new Date().toISOString().substring(0,10)}function Z0(n,e=J0){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Yg(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Yg(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class eC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Uv()?BP().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Q0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Qg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Qg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Yg(n){return Ou(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function tC(n){Zi(new ai("platform-logger",e=>new f0(e),"PRIVATE")),Zi(new ai("heartbeat",e=>new X0(e),"PRIVATE")),zn(Ed,Hg,n),zn(Ed,Hg,"esm2017"),zn("fire-js","")}tC("");var Xg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qi,Kv;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(v,C,R){for(var w=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)w[Se-2]=arguments[Se];return _.prototype[C].apply(v,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,y){y||(y=0);var v=Array(16);if(typeof _=="string")for(var C=0;16>C;++C)v[C]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(C=0;16>C;++C)v[C]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],C=E.g[2];var R=E.g[3],w=_+(R^y&(C^R))+v[0]+3614090360&4294967295;_=y+(w<<7&4294967295|w>>>25),w=R+(C^_&(y^C))+v[1]+3905402710&4294967295,R=_+(w<<12&4294967295|w>>>20),w=C+(y^R&(_^y))+v[2]+606105819&4294967295,C=R+(w<<17&4294967295|w>>>15),w=y+(_^C&(R^_))+v[3]+3250441966&4294967295,y=C+(w<<22&4294967295|w>>>10),w=_+(R^y&(C^R))+v[4]+4118548399&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(C^_&(y^C))+v[5]+1200080426&4294967295,R=_+(w<<12&4294967295|w>>>20),w=C+(y^R&(_^y))+v[6]+2821735955&4294967295,C=R+(w<<17&4294967295|w>>>15),w=y+(_^C&(R^_))+v[7]+4249261313&4294967295,y=C+(w<<22&4294967295|w>>>10),w=_+(R^y&(C^R))+v[8]+1770035416&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(C^_&(y^C))+v[9]+2336552879&4294967295,R=_+(w<<12&4294967295|w>>>20),w=C+(y^R&(_^y))+v[10]+4294925233&4294967295,C=R+(w<<17&4294967295|w>>>15),w=y+(_^C&(R^_))+v[11]+2304563134&4294967295,y=C+(w<<22&4294967295|w>>>10),w=_+(R^y&(C^R))+v[12]+1804603682&4294967295,_=y+(w<<7&4294967295|w>>>25),w=R+(C^_&(y^C))+v[13]+4254626195&4294967295,R=_+(w<<12&4294967295|w>>>20),w=C+(y^R&(_^y))+v[14]+2792965006&4294967295,C=R+(w<<17&4294967295|w>>>15),w=y+(_^C&(R^_))+v[15]+1236535329&4294967295,y=C+(w<<22&4294967295|w>>>10),w=_+(C^R&(y^C))+v[1]+4129170786&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^C&(_^y))+v[6]+3225465664&4294967295,R=_+(w<<9&4294967295|w>>>23),w=C+(_^y&(R^_))+v[11]+643717713&4294967295,C=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(C^R))+v[0]+3921069994&4294967295,y=C+(w<<20&4294967295|w>>>12),w=_+(C^R&(y^C))+v[5]+3593408605&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^C&(_^y))+v[10]+38016083&4294967295,R=_+(w<<9&4294967295|w>>>23),w=C+(_^y&(R^_))+v[15]+3634488961&4294967295,C=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(C^R))+v[4]+3889429448&4294967295,y=C+(w<<20&4294967295|w>>>12),w=_+(C^R&(y^C))+v[9]+568446438&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^C&(_^y))+v[14]+3275163606&4294967295,R=_+(w<<9&4294967295|w>>>23),w=C+(_^y&(R^_))+v[3]+4107603335&4294967295,C=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(C^R))+v[8]+1163531501&4294967295,y=C+(w<<20&4294967295|w>>>12),w=_+(C^R&(y^C))+v[13]+2850285829&4294967295,_=y+(w<<5&4294967295|w>>>27),w=R+(y^C&(_^y))+v[2]+4243563512&4294967295,R=_+(w<<9&4294967295|w>>>23),w=C+(_^y&(R^_))+v[7]+1735328473&4294967295,C=R+(w<<14&4294967295|w>>>18),w=y+(R^_&(C^R))+v[12]+2368359562&4294967295,y=C+(w<<20&4294967295|w>>>12),w=_+(y^C^R)+v[5]+4294588738&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^C)+v[8]+2272392833&4294967295,R=_+(w<<11&4294967295|w>>>21),w=C+(R^_^y)+v[11]+1839030562&4294967295,C=R+(w<<16&4294967295|w>>>16),w=y+(C^R^_)+v[14]+4259657740&4294967295,y=C+(w<<23&4294967295|w>>>9),w=_+(y^C^R)+v[1]+2763975236&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^C)+v[4]+1272893353&4294967295,R=_+(w<<11&4294967295|w>>>21),w=C+(R^_^y)+v[7]+4139469664&4294967295,C=R+(w<<16&4294967295|w>>>16),w=y+(C^R^_)+v[10]+3200236656&4294967295,y=C+(w<<23&4294967295|w>>>9),w=_+(y^C^R)+v[13]+681279174&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^C)+v[0]+3936430074&4294967295,R=_+(w<<11&4294967295|w>>>21),w=C+(R^_^y)+v[3]+3572445317&4294967295,C=R+(w<<16&4294967295|w>>>16),w=y+(C^R^_)+v[6]+76029189&4294967295,y=C+(w<<23&4294967295|w>>>9),w=_+(y^C^R)+v[9]+3654602809&4294967295,_=y+(w<<4&4294967295|w>>>28),w=R+(_^y^C)+v[12]+3873151461&4294967295,R=_+(w<<11&4294967295|w>>>21),w=C+(R^_^y)+v[15]+530742520&4294967295,C=R+(w<<16&4294967295|w>>>16),w=y+(C^R^_)+v[2]+3299628645&4294967295,y=C+(w<<23&4294967295|w>>>9),w=_+(C^(y|~R))+v[0]+4096336452&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~C))+v[7]+1126891415&4294967295,R=_+(w<<10&4294967295|w>>>22),w=C+(_^(R|~y))+v[14]+2878612391&4294967295,C=R+(w<<15&4294967295|w>>>17),w=y+(R^(C|~_))+v[5]+4237533241&4294967295,y=C+(w<<21&4294967295|w>>>11),w=_+(C^(y|~R))+v[12]+1700485571&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~C))+v[3]+2399980690&4294967295,R=_+(w<<10&4294967295|w>>>22),w=C+(_^(R|~y))+v[10]+4293915773&4294967295,C=R+(w<<15&4294967295|w>>>17),w=y+(R^(C|~_))+v[1]+2240044497&4294967295,y=C+(w<<21&4294967295|w>>>11),w=_+(C^(y|~R))+v[8]+1873313359&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~C))+v[15]+4264355552&4294967295,R=_+(w<<10&4294967295|w>>>22),w=C+(_^(R|~y))+v[6]+2734768916&4294967295,C=R+(w<<15&4294967295|w>>>17),w=y+(R^(C|~_))+v[13]+1309151649&4294967295,y=C+(w<<21&4294967295|w>>>11),w=_+(C^(y|~R))+v[4]+4149444226&4294967295,_=y+(w<<6&4294967295|w>>>26),w=R+(y^(_|~C))+v[11]+3174756917&4294967295,R=_+(w<<10&4294967295|w>>>22),w=C+(_^(R|~y))+v[2]+718787259&4294967295,C=R+(w<<15&4294967295|w>>>17),w=y+(R^(C|~_))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(C+(w<<21&4294967295|w>>>11))&4294967295,E.g[2]=E.g[2]+C&4294967295,E.g[3]=E.g[3]+R&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,v=this.B,C=this.h,R=0;R<_;){if(C==0)for(;R<=y;)i(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<_;)if(v[C++]=E.charCodeAt(R++),C==this.blockSize){i(this,v),C=0;break}}else for(;R<_;)if(v[C++]=E[R++],C==this.blockSize){i(this,v),C=0;break}}this.h=C,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var v=0;32>v;v+=8)E[y++]=this.g[_]>>>v&255;return E};function s(E,_){var y=a;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function o(E,_){this.h=_;for(var y=[],v=!0,C=E.length-1;0<=C;C--){var R=E[C]|0;v&&R==_||(y[C]=R,v=!1)}this.g=y}var a={};function c(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return f;if(0>E)return P(l(-E));for(var _=[],y=1,v=0;E>=y;v++)_[v]=E/y|0,y*=4294967296;return new o(_,0)}function h(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return P(h(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=l(Math.pow(_,8)),v=f,C=0;C<E.length;C+=8){var R=Math.min(8,E.length-C),w=parseInt(E.substring(C,C+R),_);8>R?(R=l(Math.pow(_,R)),v=v.j(R).add(l(w))):(v=v.j(y),v=v.add(l(w)))}return v}var f=c(0),p=c(1),g=c(16777216);n=o.prototype,n.m=function(){if(T(this))return-P(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var v=this.i(y);E+=(0<=v?v:4294967296+v)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(T(this))return"-"+P(this).toString(E);for(var _=l(Math.pow(E,6)),y=this,v="";;){var C=L(y,_).g;y=k(y,C.j(_));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=C,b(y))return R+v;for(;6>R.length;)R="0"+R;v=R+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function T(E){return E.h==-1}n.l=function(E){return E=k(this,E),T(E)?-1:b(E)?0:1};function P(E){for(var _=E.g.length,y=[],v=0;v<_;v++)y[v]=~E.g[v];return new o(y,~E.h).add(p)}n.abs=function(){return T(this)?P(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0,C=0;C<=_;C++){var R=v+(this.i(C)&65535)+(E.i(C)&65535),w=(R>>>16)+(this.i(C)>>>16)+(E.i(C)>>>16);v=w>>>16,R&=65535,w&=65535,y[C]=w<<16|R}return new o(y,y[y.length-1]&-2147483648?-1:0)};function k(E,_){return E.add(P(_))}n.j=function(E){if(b(this)||b(E))return f;if(T(this))return T(E)?P(this).j(P(E)):P(P(this).j(E));if(T(E))return P(this.j(P(E)));if(0>this.l(g)&&0>E.l(g))return l(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],v=0;v<2*_;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var C=0;C<E.g.length;C++){var R=this.i(v)>>>16,w=this.i(v)&65535,Se=E.i(C)>>>16,ut=E.i(C)&65535;y[2*v+2*C]+=w*ut,D(y,2*v+2*C),y[2*v+2*C+1]+=R*ut,D(y,2*v+2*C+1),y[2*v+2*C+1]+=w*Se,D(y,2*v+2*C+1),y[2*v+2*C+2]+=R*Se,D(y,2*v+2*C+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new o(y,0)};function D(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function N(E,_){this.g=E,this.h=_}function L(E,_){if(b(_))throw Error("division by zero");if(b(E))return new N(f,f);if(T(E))return _=L(P(E),_),new N(P(_.g),P(_.h));if(T(_))return _=L(E,P(_)),new N(P(_.g),_.h);if(30<E.g.length){if(T(E)||T(_))throw Error("slowDivide_ only works with positive integers.");for(var y=p,v=_;0>=v.l(E);)y=H(y),v=H(v);var C=j(y,1),R=j(v,1);for(v=j(v,2),y=j(y,2);!b(v);){var w=R.add(v);0>=w.l(E)&&(C=C.add(y),R=w),v=j(v,1),y=j(y,1)}return _=k(E,C.j(_)),new N(C,_)}for(C=f;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),R=l(y),w=R.j(_);T(w)||0<w.l(E);)y-=v,R=l(y),w=R.j(_);b(R)&&(R=p),C=C.add(R),E=k(E,w)}return new N(C,E)}n.A=function(E){return L(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)&E.i(v);return new o(y,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)|E.i(v);return new o(y,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)^E.i(v);return new o(y,this.h^E.h)};function H(E){for(var _=E.g.length+1,y=[],v=0;v<_;v++)y[v]=E.i(v)<<1|E.i(v-1)>>>31;return new o(y,E.h)}function j(E,_){var y=_>>5;_%=32;for(var v=E.g.length-y,C=[],R=0;R<v;R++)C[R]=0<_?E.i(R+y)>>>_|E.i(R+y+1)<<32-_:E.i(R+y);return new o(C,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Kv=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=h,Qi=o}).apply(typeof Xg<"u"?Xg:typeof self<"u"?self:typeof window<"u"?window:{});var Xc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var $v,aa,zv,fu,wd,Hv,Wv,Qv;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,d,m){return u==Array.prototype||u==Object.prototype||(u[d]=m.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Xc=="object"&&Xc];for(var d=0;d<u.length;++d){var m=u[d];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function i(u,d){if(d)e:{var m=r;u=u.split(".");for(var I=0;I<u.length-1;I++){var x=u[I];if(!(x in m))break e;m=m[x]}u=u[u.length-1],I=m[u],d=d(I),d!=I&&d!=null&&e(m,u,{configurable:!0,writable:!0,value:d})}}function s(u,d){u instanceof String&&(u+="");var m=0,I=!1,x={next:function(){if(!I&&m<u.length){var F=m++;return{value:d(F,u[F]),done:!1}}return I=!0,{done:!0,value:void 0}}};return x[Symbol.iterator]=function(){return x},x}i("Array.prototype.values",function(u){return u||function(){return s(this,function(d,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(u){var d=typeof u;return d=d!="object"?d:u?Array.isArray(u)?"array":d:"null",d=="array"||d=="object"&&typeof u.length=="number"}function l(u){var d=typeof u;return d=="object"&&u!=null||d=="function"}function h(u,d,m){return u.call.apply(u.bind,arguments)}function f(u,d,m){if(!u)throw Error();if(2<arguments.length){var I=Array.prototype.slice.call(arguments,2);return function(){var x=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(x,I),u.apply(d,x)}}return function(){return u.apply(d,arguments)}}function p(u,d,m){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:f,p.apply(null,arguments)}function g(u,d){var m=Array.prototype.slice.call(arguments,1);return function(){var I=m.slice();return I.push.apply(I,arguments),u.apply(this,I)}}function b(u,d){function m(){}m.prototype=d.prototype,u.aa=d.prototype,u.prototype=new m,u.prototype.constructor=u,u.Qb=function(I,x,F){for(var Y=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)Y[Fe-2]=arguments[Fe];return d.prototype[x].apply(I,Y)}}function T(u){const d=u.length;if(0<d){const m=Array(d);for(let I=0;I<d;I++)m[I]=u[I];return m}return[]}function P(u,d){for(let m=1;m<arguments.length;m++){const I=arguments[m];if(c(I)){const x=u.length||0,F=I.length||0;u.length=x+F;for(let Y=0;Y<F;Y++)u[x+Y]=I[Y]}else u.push(I)}}class k{constructor(d,m){this.i=d,this.j=m,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function D(u){return/^[\s\xa0]*$/.test(u)}function N(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function L(u){return L[" "](u),u}L[" "]=function(){};var H=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function j(u,d,m){for(const I in u)d.call(m,u[I],I,u)}function E(u,d){for(const m in u)d.call(void 0,u[m],m,u)}function _(u){const d={};for(const m in u)d[m]=u[m];return d}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(u,d){let m,I;for(let x=1;x<arguments.length;x++){I=arguments[x];for(m in I)u[m]=I[m];for(let F=0;F<y.length;F++)m=y[F],Object.prototype.hasOwnProperty.call(I,m)&&(u[m]=I[m])}}function C(u){var d=1;u=u.split(":");const m=[];for(;0<d&&u.length;)m.push(u.shift()),d--;return u.length&&m.push(u.join(":")),m}function R(u){a.setTimeout(()=>{throw u},0)}function w(){var u=sn;let d=null;return u.g&&(d=u.g,u.g=u.g.next,u.g||(u.h=null),d.next=null),d}class Se{constructor(){this.h=this.g=null}add(d,m){const I=ut.get();I.set(d,m),this.h?this.h.next=I:this.g=I,this.h=I}}var ut=new k(()=>new Oe,u=>u.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(d,m){this.h=d,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,Te=!1,sn=new Se,bn=()=>{const u=a.Promise.resolve(void 0);pe=()=>{u.then(_n)}};var _n=()=>{for(var u;u=w();){try{u.h.call(u.g)}catch(m){R(m)}var d=ut;d.j(u),100>d.h&&(d.h++,u.next=d.g,d.g=u)}Te=!1};function Xe(){this.s=this.s,this.C=this.C}Xe.prototype.s=!1,Xe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Xe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ze(u,d){this.type=u,this.g=this.target=d,this.defaultPrevented=!1}Ze.prototype.h=function(){this.defaultPrevented=!0};var Or=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,d=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const m=()=>{};a.addEventListener("test",m,d),a.removeEventListener("test",m,d)}catch{}return u})();function on(u,d){if(Ze.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var m=this.type=u.type,I=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=d,d=u.relatedTarget){if(H){e:{try{L(d.nodeName);var x=!0;break e}catch{}x=!1}x||(d=null)}}else m=="mouseover"?d=u.fromElement:m=="mouseout"&&(d=u.toElement);this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Zt[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&on.aa.h.call(this)}}b(on,Ze);var Zt={2:"touch",3:"pen",4:"mouse"};on.prototype.h=function(){on.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var B="closure_listenable_"+(1e6*Math.random()|0),ie=0;function te(u,d,m,I,x){this.listener=u,this.proxy=null,this.src=d,this.type=m,this.capture=!!I,this.ha=x,this.key=++ie,this.da=this.fa=!1}function ce(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function ve(u){this.src=u,this.g={},this.h=0}ve.prototype.add=function(u,d,m,I,x){var F=u.toString();u=this.g[F],u||(u=this.g[F]=[],this.h++);var Y=S(u,d,I,x);return-1<Y?(d=u[Y],m||(d.fa=!1)):(d=new te(d,this.src,F,!!I,x),d.fa=m,u.push(d)),d};function A(u,d){var m=d.type;if(m in u.g){var I=u.g[m],x=Array.prototype.indexOf.call(I,d,void 0),F;(F=0<=x)&&Array.prototype.splice.call(I,x,1),F&&(ce(d),u.g[m].length==0&&(delete u.g[m],u.h--))}}function S(u,d,m,I){for(var x=0;x<u.length;++x){var F=u[x];if(!F.da&&F.listener==d&&F.capture==!!m&&F.ha==I)return x}return-1}var V="closure_lm_"+(1e6*Math.random()|0),U={};function G(u,d,m,I,x){if(Array.isArray(d)){for(var F=0;F<d.length;F++)G(u,d[F],m,I,x);return null}return m=de(m),u&&u[B]?u.K(d,m,l(I)?!!I.capture:!1,x):q(u,d,m,!1,I,x)}function q(u,d,m,I,x,F){if(!d)throw Error("Invalid event type");var Y=l(x)?!!x.capture:!!x,Fe=ne(u);if(Fe||(u[V]=Fe=new ve(u)),m=Fe.add(d,m,I,Y,F),m.proxy)return m;if(I=ee(),m.proxy=I,I.src=u,I.listener=m,u.addEventListener)Or||(x=Y),x===void 0&&(x=!1),u.addEventListener(d.toString(),I,x);else if(u.attachEvent)u.attachEvent(z(d.toString()),I);else if(u.addListener&&u.removeListener)u.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return m}function ee(){function u(m){return d.call(u.src,u.listener,m)}const d=he;return u}function X(u,d,m,I,x){if(Array.isArray(d))for(var F=0;F<d.length;F++)X(u,d[F],m,I,x);else I=l(I)?!!I.capture:!!I,m=de(m),u&&u[B]?(u=u.i,d=String(d).toString(),d in u.g&&(F=u.g[d],m=S(F,m,I,x),-1<m&&(ce(F[m]),Array.prototype.splice.call(F,m,1),F.length==0&&(delete u.g[d],u.h--)))):u&&(u=ne(u))&&(d=u.g[d.toString()],u=-1,d&&(u=S(d,m,I,x)),(m=-1<u?d[u]:null)&&Q(m))}function Q(u){if(typeof u!="number"&&u&&!u.da){var d=u.src;if(d&&d[B])A(d.i,u);else{var m=u.type,I=u.proxy;d.removeEventListener?d.removeEventListener(m,I,u.capture):d.detachEvent?d.detachEvent(z(m),I):d.addListener&&d.removeListener&&d.removeListener(I),(m=ne(d))?(A(m,u),m.h==0&&(m.src=null,d[V]=null)):ce(u)}}}function z(u){return u in U?U[u]:U[u]="on"+u}function he(u,d){if(u.da)u=!0;else{d=new on(d,this);var m=u.listener,I=u.ha||u.src;u.fa&&Q(u),u=m.call(I,d)}return u}function ne(u){return u=u[V],u instanceof ve?u:null}var ue="__closure_events_fn_"+(1e9*Math.random()>>>0);function de(u){return typeof u=="function"?u:(u[ue]||(u[ue]=function(d){return u.handleEvent(d)}),u[ue])}function fe(){Xe.call(this),this.i=new ve(this),this.M=this,this.F=null}b(fe,Xe),fe.prototype[B]=!0,fe.prototype.removeEventListener=function(u,d,m,I){X(this,u,d,m,I)};function ye(u,d){var m,I=u.F;if(I)for(m=[];I;I=I.F)m.push(I);if(u=u.M,I=d.type||d,typeof d=="string")d=new Ze(d,u);else if(d instanceof Ze)d.target=d.target||u;else{var x=d;d=new Ze(I,u),v(d,x)}if(x=!0,m)for(var F=m.length-1;0<=F;F--){var Y=d.g=m[F];x=De(Y,I,!0,d)&&x}if(Y=d.g=u,x=De(Y,I,!0,d)&&x,x=De(Y,I,!1,d)&&x,m)for(F=0;F<m.length;F++)Y=d.g=m[F],x=De(Y,I,!1,d)&&x}fe.prototype.N=function(){if(fe.aa.N.call(this),this.i){var u=this.i,d;for(d in u.g){for(var m=u.g[d],I=0;I<m.length;I++)ce(m[I]);delete u.g[d],u.h--}}this.F=null},fe.prototype.K=function(u,d,m,I){return this.i.add(String(u),d,!1,m,I)},fe.prototype.L=function(u,d,m,I){return this.i.add(String(u),d,!0,m,I)};function De(u,d,m,I){if(d=u.i.g[String(d)],!d)return!0;d=d.concat();for(var x=!0,F=0;F<d.length;++F){var Y=d[F];if(Y&&!Y.da&&Y.capture==m){var Fe=Y.listener,Ct=Y.ha||Y.src;Y.fa&&A(u.i,Y),x=Fe.call(Ct,I)!==!1&&x}}return x&&!I.defaultPrevented}function et(u,d,m){if(typeof u=="function")m&&(u=p(u,m));else if(u&&typeof u.handleEvent=="function")u=p(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:a.setTimeout(u,d||0)}function ft(u){u.g=et(()=>{u.g=null,u.i&&(u.i=!1,ft(u))},u.l);const d=u.h;u.h=null,u.m.apply(null,d)}class yn extends Xe{constructor(d,m){super(),this.m=d,this.l=m,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ft(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xt(u){Xe.call(this),this.h=u,this.g={}}b(xt,Xe);var xr=[];function ko(u){j(u.g,function(d,m){this.g.hasOwnProperty(m)&&Q(d)},u),u.g={}}xt.prototype.N=function(){xt.aa.N.call(this),ko(this)},xt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Pt=a.JSON.stringify,In=a.JSON.parse,Dc=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function ms(){}ms.prototype.h=null;function im(u){return u.h||(u.h=u.i())}function sm(){}var No={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function oh(){Ze.call(this,"d")}b(oh,Ze);function ah(){Ze.call(this,"c")}b(ah,Ze);var Ri={},om=null;function kc(){return om=om||new fe}Ri.La="serverreachability";function am(u){Ze.call(this,Ri.La,u)}b(am,Ze);function Vo(u){const d=kc();ye(d,new am(d))}Ri.STAT_EVENT="statevent";function cm(u,d){Ze.call(this,Ri.STAT_EVENT,u),this.stat=d}b(cm,Ze);function $t(u){const d=kc();ye(d,new cm(d,u))}Ri.Ma="timingevent";function um(u,d){Ze.call(this,Ri.Ma,u),this.size=d}b(um,Ze);function Oo(u,d){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},d)}function xo(){this.g=!0}xo.prototype.xa=function(){this.g=!1};function ab(u,d,m,I,x,F){u.info(function(){if(u.g)if(F)for(var Y="",Fe=F.split("&"),Ct=0;Ct<Fe.length;Ct++){var Ce=Fe[Ct].split("=");if(1<Ce.length){var Lt=Ce[0];Ce=Ce[1];var Mt=Lt.split("_");Y=2<=Mt.length&&Mt[1]=="type"?Y+(Lt+"="+Ce+"&"):Y+(Lt+"=redacted&")}}else Y=null;else Y=F;return"XMLHTTP REQ ("+I+") [attempt "+x+"]: "+d+`
`+m+`
`+Y})}function cb(u,d,m,I,x,F,Y){u.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+x+"]: "+d+`
`+m+`
`+F+" "+Y})}function gs(u,d,m,I){u.info(function(){return"XMLHTTP TEXT ("+d+"): "+lb(u,m)+(I?" "+I:"")})}function ub(u,d){u.info(function(){return"TIMEOUT: "+d})}xo.prototype.info=function(){};function lb(u,d){if(!u.g)return d;if(!d)return null;try{var m=JSON.parse(d);if(m){for(u=0;u<m.length;u++)if(Array.isArray(m[u])){var I=m[u];if(!(2>I.length)){var x=I[1];if(Array.isArray(x)&&!(1>x.length)){var F=x[0];if(F!="noop"&&F!="stop"&&F!="close")for(var Y=1;Y<x.length;Y++)x[Y]=""}}}}return Pt(m)}catch{return d}}var Nc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},lm={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ch;function Vc(){}b(Vc,ms),Vc.prototype.g=function(){return new XMLHttpRequest},Vc.prototype.i=function(){return{}},ch=new Vc;function Lr(u,d,m,I){this.j=u,this.i=d,this.l=m,this.R=I||1,this.U=new xt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new hm}function hm(){this.i=null,this.g="",this.h=!1}var dm={},uh={};function lh(u,d,m){u.L=1,u.v=Mc(Xn(d)),u.m=m,u.P=!0,fm(u,null)}function fm(u,d){u.F=Date.now(),Oc(u),u.A=Xn(u.v);var m=u.A,I=u.R;Array.isArray(I)||(I=[String(I)]),Sm(m.i,"t",I),u.C=0,m=u.j.J,u.h=new hm,u.g=$m(u.j,m?d:null,!u.m),0<u.O&&(u.M=new yn(p(u.Y,u,u.g),u.O)),d=u.U,m=u.g,I=u.ca;var x="readystatechange";Array.isArray(x)||(x&&(xr[0]=x.toString()),x=xr);for(var F=0;F<x.length;F++){var Y=G(m,x[F],I||d.handleEvent,!1,d.h||d);if(!Y)break;d.g[Y.key]=Y}d=u.H?_(u.H):{},u.m?(u.u||(u.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,d)):(u.u="GET",u.g.ea(u.A,u.u,null,d)),Vo(),ab(u.i,u.u,u.A,u.l,u.R,u.m)}Lr.prototype.ca=function(u){u=u.target;const d=this.M;d&&Zn(u)==3?d.j():this.Y(u)},Lr.prototype.Y=function(u){try{if(u==this.g)e:{const Mt=Zn(this.g);var d=this.g.Ba();const Is=this.g.Z();if(!(3>Mt)&&(Mt!=3||this.g&&(this.h.h||this.g.oa()||Om(this.g)))){this.J||Mt!=4||d==7||(d==8||0>=Is?Vo(3):Vo(2)),hh(this);var m=this.g.Z();this.X=m;t:if(pm(this)){var I=Om(this.g);u="";var x=I.length,F=Zn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Si(this),Lo(this);var Y="";break t}this.h.i=new a.TextDecoder}for(d=0;d<x;d++)this.h.h=!0,u+=this.h.i.decode(I[d],{stream:!(F&&d==x-1)});I.length=0,this.h.g+=u,this.C=0,Y=this.h.g}else Y=this.g.oa();if(this.o=m==200,cb(this.i,this.u,this.A,this.l,this.R,Mt,m),this.o){if(this.T&&!this.K){t:{if(this.g){var Fe,Ct=this.g;if((Fe=Ct.g?Ct.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!D(Fe)){var Ce=Fe;break t}}Ce=null}if(m=Ce)gs(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,dh(this,m);else{this.o=!1,this.s=3,$t(12),Si(this),Lo(this);break e}}if(this.P){m=!0;let Rn;for(;!this.J&&this.C<Y.length;)if(Rn=hb(this,Y),Rn==uh){Mt==4&&(this.s=4,$t(14),m=!1),gs(this.i,this.l,null,"[Incomplete Response]");break}else if(Rn==dm){this.s=4,$t(15),gs(this.i,this.l,Y,"[Invalid Chunk]"),m=!1;break}else gs(this.i,this.l,Rn,null),dh(this,Rn);if(pm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Mt!=4||Y.length!=0||this.h.h||(this.s=1,$t(16),m=!1),this.o=this.o&&m,!m)gs(this.i,this.l,Y,"[Invalid Chunked Response]"),Si(this),Lo(this);else if(0<Y.length&&!this.W){this.W=!0;var Lt=this.j;Lt.g==this&&Lt.ba&&!Lt.M&&(Lt.j.info("Great, no buffering proxy detected. Bytes received: "+Y.length),yh(Lt),Lt.M=!0,$t(11))}}else gs(this.i,this.l,Y,null),dh(this,Y);Mt==4&&Si(this),this.o&&!this.J&&(Mt==4?qm(this.j,this):(this.o=!1,Oc(this)))}else Pb(this.g),m==400&&0<Y.indexOf("Unknown SID")?(this.s=3,$t(12)):(this.s=0,$t(13)),Si(this),Lo(this)}}}catch{}finally{}};function pm(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function hb(u,d){var m=u.C,I=d.indexOf(`
`,m);return I==-1?uh:(m=Number(d.substring(m,I)),isNaN(m)?dm:(I+=1,I+m>d.length?uh:(d=d.slice(I,I+m),u.C=I+m,d)))}Lr.prototype.cancel=function(){this.J=!0,Si(this)};function Oc(u){u.S=Date.now()+u.I,mm(u,u.I)}function mm(u,d){if(u.B!=null)throw Error("WatchDog timer not null");u.B=Oo(p(u.ba,u),d)}function hh(u){u.B&&(a.clearTimeout(u.B),u.B=null)}Lr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(ub(this.i,this.A),this.L!=2&&(Vo(),$t(17)),Si(this),this.s=2,Lo(this)):mm(this,this.S-u)};function Lo(u){u.j.G==0||u.J||qm(u.j,u)}function Si(u){hh(u);var d=u.M;d&&typeof d.ma=="function"&&d.ma(),u.M=null,ko(u.U),u.g&&(d=u.g,u.g=null,d.abort(),d.ma())}function dh(u,d){try{var m=u.j;if(m.G!=0&&(m.g==u||fh(m.h,u))){if(!u.K&&fh(m.h,u)&&m.G==3){try{var I=m.Da.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var x=I;if(x[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<u.F)Gc(m),qc(m);else break e;_h(m),$t(18)}}else m.za=x[1],0<m.za-m.T&&37500>x[2]&&m.F&&m.v==0&&!m.C&&(m.C=Oo(p(m.Za,m),6e3));if(1>=ym(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Ci(m,11)}else if((u.K||m.g==u)&&Gc(m),!D(d))for(x=m.Da.g.parse(d),d=0;d<x.length;d++){let Ce=x[d];if(m.T=Ce[0],Ce=Ce[1],m.G==2)if(Ce[0]=="c"){m.K=Ce[1],m.ia=Ce[2];const Lt=Ce[3];Lt!=null&&(m.la=Lt,m.j.info("VER="+m.la));const Mt=Ce[4];Mt!=null&&(m.Aa=Mt,m.j.info("SVER="+m.Aa));const Is=Ce[5];Is!=null&&typeof Is=="number"&&0<Is&&(I=1.5*Is,m.L=I,m.j.info("backChannelRequestTimeoutMs_="+I)),I=m;const Rn=u.g;if(Rn){const $c=Rn.g?Rn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($c){var F=I.h;F.g||$c.indexOf("spdy")==-1&&$c.indexOf("quic")==-1&&$c.indexOf("h2")==-1||(F.j=F.l,F.g=new Set,F.h&&(ph(F,F.h),F.h=null))}if(I.D){const Ih=Rn.g?Rn.g.getResponseHeader("X-HTTP-Session-Id"):null;Ih&&(I.ya=Ih,je(I.I,I.D,Ih))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-u.F,m.j.info("Handshake RTT: "+m.R+"ms")),I=m;var Y=u;if(I.qa=Km(I,I.J?I.ia:null,I.W),Y.K){Im(I.h,Y);var Fe=Y,Ct=I.L;Ct&&(Fe.I=Ct),Fe.B&&(hh(Fe),Oc(Fe)),I.g=Y}else Um(I);0<m.i.length&&jc(m)}else Ce[0]!="stop"&&Ce[0]!="close"||Ci(m,7);else m.G==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?Ci(m,7):gh(m):Ce[0]!="noop"&&m.l&&m.l.ta(Ce),m.v=0)}}Vo(4)}catch{}}var db=class{constructor(u,d){this.g=u,this.map=d}};function gm(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function _m(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function ym(u){return u.h?1:u.g?u.g.size:0}function fh(u,d){return u.h?u.h==d:u.g?u.g.has(d):!1}function ph(u,d){u.g?u.g.add(d):u.h=d}function Im(u,d){u.h&&u.h==d?u.h=null:u.g&&u.g.has(d)&&u.g.delete(d)}gm.prototype.cancel=function(){if(this.i=vm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function vm(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let d=u.i;for(const m of u.g.values())d=d.concat(m.D);return d}return T(u.i)}function fb(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(c(u)){for(var d=[],m=u.length,I=0;I<m;I++)d.push(u[I]);return d}d=[],m=0;for(I in u)d[m++]=u[I];return d}function pb(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(c(u)||typeof u=="string"){var d=[];u=u.length;for(var m=0;m<u;m++)d.push(m);return d}d=[],m=0;for(const I in u)d[m++]=I;return d}}}function Em(u,d){if(u.forEach&&typeof u.forEach=="function")u.forEach(d,void 0);else if(c(u)||typeof u=="string")Array.prototype.forEach.call(u,d,void 0);else for(var m=pb(u),I=fb(u),x=I.length,F=0;F<x;F++)d.call(void 0,I[F],m&&m[F],u)}var Tm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function mb(u,d){if(u){u=u.split("&");for(var m=0;m<u.length;m++){var I=u[m].indexOf("="),x=null;if(0<=I){var F=u[m].substring(0,I);x=u[m].substring(I+1)}else F=u[m];d(F,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function Pi(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Pi){this.h=u.h,xc(this,u.j),this.o=u.o,this.g=u.g,Lc(this,u.s),this.l=u.l;var d=u.i,m=new Uo;m.i=d.i,d.g&&(m.g=new Map(d.g),m.h=d.h),wm(this,m),this.m=u.m}else u&&(d=String(u).match(Tm))?(this.h=!1,xc(this,d[1]||"",!0),this.o=Mo(d[2]||""),this.g=Mo(d[3]||"",!0),Lc(this,d[4]),this.l=Mo(d[5]||"",!0),wm(this,d[6]||"",!0),this.m=Mo(d[7]||"")):(this.h=!1,this.i=new Uo(null,this.h))}Pi.prototype.toString=function(){var u=[],d=this.j;d&&u.push(Fo(d,Am,!0),":");var m=this.g;return(m||d=="file")&&(u.push("//"),(d=this.o)&&u.push(Fo(d,Am,!0),"@"),u.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&u.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&u.push("/"),u.push(Fo(m,m.charAt(0)=="/"?yb:_b,!0))),(m=this.i.toString())&&u.push("?",m),(m=this.m)&&u.push("#",Fo(m,vb)),u.join("")};function Xn(u){return new Pi(u)}function xc(u,d,m){u.j=m?Mo(d,!0):d,u.j&&(u.j=u.j.replace(/:$/,""))}function Lc(u,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);u.s=d}else u.s=null}function wm(u,d,m){d instanceof Uo?(u.i=d,Eb(u.i,u.h)):(m||(d=Fo(d,Ib)),u.i=new Uo(d,u.h))}function je(u,d,m){u.i.set(d,m)}function Mc(u){return je(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Mo(u,d){return u?d?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Fo(u,d,m){return typeof u=="string"?(u=encodeURI(u).replace(d,gb),m&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function gb(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Am=/[#\/\?@]/g,_b=/[#\?:]/g,yb=/[#\?]/g,Ib=/[#\?@]/g,vb=/#/g;function Uo(u,d){this.h=this.g=null,this.i=u||null,this.j=!!d}function Mr(u){u.g||(u.g=new Map,u.h=0,u.i&&mb(u.i,function(d,m){u.add(decodeURIComponent(d.replace(/\+/g," ")),m)}))}n=Uo.prototype,n.add=function(u,d){Mr(this),this.i=null,u=_s(this,u);var m=this.g.get(u);return m||this.g.set(u,m=[]),m.push(d),this.h+=1,this};function bm(u,d){Mr(u),d=_s(u,d),u.g.has(d)&&(u.i=null,u.h-=u.g.get(d).length,u.g.delete(d))}function Rm(u,d){return Mr(u),d=_s(u,d),u.g.has(d)}n.forEach=function(u,d){Mr(this),this.g.forEach(function(m,I){m.forEach(function(x){u.call(d,x,I,this)},this)},this)},n.na=function(){Mr(this);const u=Array.from(this.g.values()),d=Array.from(this.g.keys()),m=[];for(let I=0;I<d.length;I++){const x=u[I];for(let F=0;F<x.length;F++)m.push(d[I])}return m},n.V=function(u){Mr(this);let d=[];if(typeof u=="string")Rm(this,u)&&(d=d.concat(this.g.get(_s(this,u))));else{u=Array.from(this.g.values());for(let m=0;m<u.length;m++)d=d.concat(u[m])}return d},n.set=function(u,d){return Mr(this),this.i=null,u=_s(this,u),Rm(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[d]),this.h+=1,this},n.get=function(u,d){return u?(u=this.V(u),0<u.length?String(u[0]):d):d};function Sm(u,d,m){bm(u,d),0<m.length&&(u.i=null,u.g.set(_s(u,d),T(m)),u.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],d=Array.from(this.g.keys());for(var m=0;m<d.length;m++){var I=d[m];const F=encodeURIComponent(String(I)),Y=this.V(I);for(I=0;I<Y.length;I++){var x=F;Y[I]!==""&&(x+="="+encodeURIComponent(String(Y[I]))),u.push(x)}}return this.i=u.join("&")};function _s(u,d){return d=String(d),u.j&&(d=d.toLowerCase()),d}function Eb(u,d){d&&!u.j&&(Mr(u),u.i=null,u.g.forEach(function(m,I){var x=I.toLowerCase();I!=x&&(bm(this,I),Sm(this,x,m))},u)),u.j=d}function Tb(u,d){const m=new xo;if(a.Image){const I=new Image;I.onload=g(Fr,m,"TestLoadImage: loaded",!0,d,I),I.onerror=g(Fr,m,"TestLoadImage: error",!1,d,I),I.onabort=g(Fr,m,"TestLoadImage: abort",!1,d,I),I.ontimeout=g(Fr,m,"TestLoadImage: timeout",!1,d,I),a.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=u}else d(!1)}function wb(u,d){const m=new xo,I=new AbortController,x=setTimeout(()=>{I.abort(),Fr(m,"TestPingServer: timeout",!1,d)},1e4);fetch(u,{signal:I.signal}).then(F=>{clearTimeout(x),F.ok?Fr(m,"TestPingServer: ok",!0,d):Fr(m,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(x),Fr(m,"TestPingServer: error",!1,d)})}function Fr(u,d,m,I,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),I(m)}catch{}}function Ab(){this.g=new Dc}function bb(u,d,m){const I=m||"";try{Em(u,function(x,F){let Y=x;l(x)&&(Y=Pt(x)),d.push(I+F+"="+encodeURIComponent(Y))})}catch(x){throw d.push(I+"type="+encodeURIComponent("_badmap")),x}}function Fc(u){this.l=u.Ub||null,this.j=u.eb||!1}b(Fc,ms),Fc.prototype.g=function(){return new Uc(this.l,this.j)},Fc.prototype.i=(function(u){return function(){return u}})({});function Uc(u,d){fe.call(this),this.D=u,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Uc,fe),n=Uc.prototype,n.open=function(u,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=d,this.readyState=1,qo(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(d.body=u),(this.D||a).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Bo(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,qo(this)),this.g&&(this.readyState=3,qo(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Pm(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function Pm(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var d=u.value?u.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!u.done}))&&(this.response=this.responseText+=d)}u.done?Bo(this):qo(this),this.readyState==3&&Pm(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Bo(this))},n.Qa=function(u){this.g&&(this.response=u,Bo(this))},n.ga=function(){this.g&&Bo(this)};function Bo(u){u.readyState=4,u.l=null,u.j=null,u.v=null,qo(u)}n.setRequestHeader=function(u,d){this.u.append(u,d)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],d=this.h.entries();for(var m=d.next();!m.done;)m=m.value,u.push(m[0]+": "+m[1]),m=d.next();return u.join(`\r
`)};function qo(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Uc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Cm(u){let d="";return j(u,function(m,I){d+=I,d+=":",d+=m,d+=`\r
`}),d}function mh(u,d,m){e:{for(I in m){var I=!1;break e}I=!0}I||(m=Cm(m),typeof u=="string"?m!=null&&encodeURIComponent(String(m)):je(u,d,m))}function nt(u){fe.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(nt,fe);var Rb=/^https?$/i,Sb=["POST","PUT"];n=nt.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,d,m,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);d=d?d.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ch.g(),this.v=this.o?im(this.o):im(ch),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(d,String(u),!0),this.B=!1}catch(F){Dm(this,F);return}if(u=m||"",m=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var x in I)m.set(x,I[x]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const F of I.keys())m.set(F,I.get(F));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(m.keys()).find(F=>F.toLowerCase()=="content-type"),x=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(Sb,d,void 0))||I||x||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[F,Y]of m)this.g.setRequestHeader(F,Y);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Vm(this),this.u=!0,this.g.send(u),this.u=!1}catch(F){Dm(this,F)}};function Dm(u,d){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=d,u.m=5,km(u),Bc(u)}function km(u){u.A||(u.A=!0,ye(u,"complete"),ye(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,ye(this,"complete"),ye(this,"abort"),Bc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Bc(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Nm(this):this.bb())},n.bb=function(){Nm(this)};function Nm(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Zn(u)!=4||u.Z()!=2)){if(u.u&&Zn(u)==4)et(u.Ea,0,u);else if(ye(u,"readystatechange"),Zn(u)==4){u.h=!1;try{const Y=u.Z();e:switch(Y){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var m;if(!(m=d)){var I;if(I=Y===0){var x=String(u.D).match(Tm)[1]||null;!x&&a.self&&a.self.location&&(x=a.self.location.protocol.slice(0,-1)),I=!Rb.test(x?x.toLowerCase():"")}m=I}if(m)ye(u,"complete"),ye(u,"success");else{u.m=6;try{var F=2<Zn(u)?u.g.statusText:""}catch{F=""}u.l=F+" ["+u.Z()+"]",km(u)}}finally{Bc(u)}}}}function Bc(u,d){if(u.g){Vm(u);const m=u.g,I=u.v[0]?()=>{}:null;u.g=null,u.v=null,d||ye(u,"ready");try{m.onreadystatechange=I}catch{}}}function Vm(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function Zn(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<Zn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var d=this.g.responseText;return u&&d.indexOf(u)==0&&(d=d.substring(u.length)),In(d)}};function Om(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Pb(u){const d={};u=(u.g&&2<=Zn(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<u.length;I++){if(D(u[I]))continue;var m=C(u[I]);const x=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const F=d[x]||[];d[x]=F,F.push(m)}E(d,function(I){return I.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function jo(u,d,m){return m&&m.internalChannelParams&&m.internalChannelParams[u]||d}function xm(u){this.Aa=0,this.i=[],this.j=new xo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=jo("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=jo("baseRetryDelayMs",5e3,u),this.cb=jo("retryDelaySeedMs",1e4,u),this.Wa=jo("forwardChannelMaxRetries",2,u),this.wa=jo("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new gm(u&&u.concurrentRequestLimit),this.Da=new Ab,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=xm.prototype,n.la=8,n.G=1,n.connect=function(u,d,m,I){$t(0),this.W=u,this.H=d||{},m&&I!==void 0&&(this.H.OSID=m,this.H.OAID=I),this.F=this.X,this.I=Km(this,null,this.W),jc(this)};function gh(u){if(Lm(u),u.G==3){var d=u.U++,m=Xn(u.I);if(je(m,"SID",u.K),je(m,"RID",d),je(m,"TYPE","terminate"),Go(u,m),d=new Lr(u,u.j,d),d.L=2,d.v=Mc(Xn(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(d.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=d.v,m=!0),m||(d.g=$m(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Oc(d)}Gm(u)}function qc(u){u.g&&(yh(u),u.g.cancel(),u.g=null)}function Lm(u){qc(u),u.u&&(a.clearTimeout(u.u),u.u=null),Gc(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function jc(u){if(!_m(u.h)&&!u.s){u.s=!0;var d=u.Ga;pe||bn(),Te||(pe(),Te=!0),sn.add(d,u),u.B=0}}function Cb(u,d){return ym(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=d.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=Oo(p(u.Ga,u,d),jm(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const x=new Lr(this,this.j,u);let F=this.o;if(this.S&&(F?(F=_(F),v(F,this.S)):F=this.S),this.m!==null||this.O||(x.H=F,F=null),this.P)e:{for(var d=0,m=0;m<this.i.length;m++){t:{var I=this.i[m];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,4096<d){d=m;break e}if(d===4096||m===this.i.length-1){d=m+1;break e}}d=1e3}else d=1e3;d=Fm(this,x,d),m=Xn(this.I),je(m,"RID",u),je(m,"CVER",22),this.D&&je(m,"X-HTTP-Session-Id",this.D),Go(this,m),F&&(this.O?d="headers="+encodeURIComponent(String(Cm(F)))+"&"+d:this.m&&mh(m,this.m,F)),ph(this.h,x),this.Ua&&je(m,"TYPE","init"),this.P?(je(m,"$req",d),je(m,"SID","null"),x.T=!0,lh(x,m,null)):lh(x,m,d),this.G=2}}else this.G==3&&(u?Mm(this,u):this.i.length==0||_m(this.h)||Mm(this))};function Mm(u,d){var m;d?m=d.l:m=u.U++;const I=Xn(u.I);je(I,"SID",u.K),je(I,"RID",m),je(I,"AID",u.T),Go(u,I),u.m&&u.o&&mh(I,u.m,u.o),m=new Lr(u,u.j,m,u.B+1),u.m===null&&(m.H=u.o),d&&(u.i=d.D.concat(u.i)),d=Fm(u,m,1e3),m.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),ph(u.h,m),lh(m,I,d)}function Go(u,d){u.H&&j(u.H,function(m,I){je(d,I,m)}),u.l&&Em({},function(m,I){je(d,I,m)})}function Fm(u,d,m){m=Math.min(u.i.length,m);var I=u.l?p(u.l.Na,u.l,u):null;e:{var x=u.i;let F=-1;for(;;){const Y=["count="+m];F==-1?0<m?(F=x[0].g,Y.push("ofs="+F)):F=0:Y.push("ofs="+F);let Fe=!0;for(let Ct=0;Ct<m;Ct++){let Ce=x[Ct].g;const Lt=x[Ct].map;if(Ce-=F,0>Ce)F=Math.max(0,x[Ct].g-100),Fe=!1;else try{bb(Lt,Y,"req"+Ce+"_")}catch{I&&I(Lt)}}if(Fe){I=Y.join("&");break e}}}return u=u.i.splice(0,m),d.D=u,I}function Um(u){if(!u.g&&!u.u){u.Y=1;var d=u.Fa;pe||bn(),Te||(pe(),Te=!0),sn.add(d,u),u.v=0}}function _h(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=Oo(p(u.Fa,u),jm(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,Bm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=Oo(p(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,$t(10),qc(this),Bm(this))};function yh(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function Bm(u){u.g=new Lr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var d=Xn(u.qa);je(d,"RID","rpc"),je(d,"SID",u.K),je(d,"AID",u.T),je(d,"CI",u.F?"0":"1"),!u.F&&u.ja&&je(d,"TO",u.ja),je(d,"TYPE","xmlhttp"),Go(u,d),u.m&&u.o&&mh(d,u.m,u.o),u.L&&(u.g.I=u.L);var m=u.g;u=u.ia,m.L=1,m.v=Mc(Xn(d)),m.m=null,m.P=!0,fm(m,u)}n.Za=function(){this.C!=null&&(this.C=null,qc(this),_h(this),$t(19))};function Gc(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function qm(u,d){var m=null;if(u.g==d){Gc(u),yh(u),u.g=null;var I=2}else if(fh(u.h,d))m=d.D,Im(u.h,d),I=1;else return;if(u.G!=0){if(d.o)if(I==1){m=d.m?d.m.length:0,d=Date.now()-d.F;var x=u.B;I=kc(),ye(I,new um(I,m)),jc(u)}else Um(u);else if(x=d.s,x==3||x==0&&0<d.X||!(I==1&&Cb(u,d)||I==2&&_h(u)))switch(m&&0<m.length&&(d=u.h,d.i=d.i.concat(m)),x){case 1:Ci(u,5);break;case 4:Ci(u,10);break;case 3:Ci(u,6);break;default:Ci(u,2)}}}function jm(u,d){let m=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(m*=2),m*d}function Ci(u,d){if(u.j.info("Error code "+d),d==2){var m=p(u.fb,u),I=u.Xa;const x=!I;I=new Pi(I||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||xc(I,"https"),Mc(I),x?Tb(I.toString(),m):wb(I.toString(),m)}else $t(2);u.G=0,u.l&&u.l.sa(d),Gm(u),Lm(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),$t(2)):(this.j.info("Failed to ping google.com"),$t(1))};function Gm(u){if(u.G=0,u.ka=[],u.l){const d=vm(u.h);(d.length!=0||u.i.length!=0)&&(P(u.ka,d),P(u.ka,u.i),u.h.i.length=0,T(u.i),u.i.length=0),u.l.ra()}}function Km(u,d,m){var I=m instanceof Pi?Xn(m):new Pi(m);if(I.g!="")d&&(I.g=d+"."+I.g),Lc(I,I.s);else{var x=a.location;I=x.protocol,d=d?d+"."+x.hostname:x.hostname,x=+x.port;var F=new Pi(null);I&&xc(F,I),d&&(F.g=d),x&&Lc(F,x),m&&(F.l=m),I=F}return m=u.D,d=u.ya,m&&d&&je(I,m,d),je(I,"VER",u.la),Go(u,I),I}function $m(u,d,m){if(d&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=u.Ca&&!u.pa?new nt(new Fc({eb:m})):new nt(u.pa),d.Ha(u.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function zm(){}n=zm.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Kc(){}Kc.prototype.g=function(u,d){return new an(u,d)};function an(u,d){fe.call(this),this.g=new xm(d),this.l=u,this.h=d&&d.messageUrlParams||null,u=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(u?u["X-WebChannel-Content-Type"]=d.messageContentType:u={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(u?u["X-WebChannel-Client-Profile"]=d.va:u={"X-WebChannel-Client-Profile":d.va}),this.g.S=u,(u=d&&d.Sb)&&!D(u)&&(this.g.m=u),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!D(d)&&(this.g.D=d,u=this.h,u!==null&&d in u&&(u=this.h,d in u&&delete u[d])),this.j=new ys(this)}b(an,fe),an.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){gh(this.g)},an.prototype.o=function(u){var d=this.g;if(typeof u=="string"){var m={};m.__data__=u,u=m}else this.u&&(m={},m.__data__=Pt(u),u=m);d.i.push(new db(d.Ya++,u)),d.G==3&&jc(d)},an.prototype.N=function(){this.g.l=null,delete this.j,gh(this.g),delete this.g,an.aa.N.call(this)};function Hm(u){oh.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var d=u.__sm__;if(d){e:{for(const m in d){u=m;break e}u=void 0}(this.i=u)&&(u=this.i,d=d!==null&&u in d?d[u]:void 0),this.data=d}else this.data=u}b(Hm,oh);function Wm(){ah.call(this),this.status=1}b(Wm,ah);function ys(u){this.g=u}b(ys,zm),ys.prototype.ua=function(){ye(this.g,"a")},ys.prototype.ta=function(u){ye(this.g,new Hm(u))},ys.prototype.sa=function(u){ye(this.g,new Wm)},ys.prototype.ra=function(){ye(this.g,"b")},Kc.prototype.createWebChannel=Kc.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,Qv=function(){return new Kc},Wv=function(){return kc()},Hv=Ri,wd={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Nc.NO_ERROR=0,Nc.TIMEOUT=8,Nc.HTTP_ERROR=6,fu=Nc,lm.COMPLETE="complete",zv=lm,sm.EventType=No,No.OPEN="a",No.CLOSE="b",No.ERROR="c",No.MESSAGE="d",fe.prototype.listen=fe.prototype.K,aa=sm,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,$v=nt}).apply(typeof Xc<"u"?Xc:typeof self<"u"?self:typeof window<"u"?window:{});const Zg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mo="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=new wf("@firebase/firestore");function Cs(){return ci.logLevel}function nC(n){ci.setLogLevel(n)}function $(n,...e){if(ci.logLevel<=we.DEBUG){const t=e.map(Rf);ci.debug(`Firestore (${mo}): ${n}`,...t)}}function lt(n,...e){if(ci.logLevel<=we.ERROR){const t=e.map(Rf);ci.error(`Firestore (${mo}): ${n}`,...t)}}function mn(n,...e){if(ci.logLevel<=we.WARN){const t=e.map(Rf);ci.warn(`Firestore (${mo}): ${n}`,...t)}}function Rf(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function re(n="Unexpected state"){const e=`FIRESTORE (${mo}) INTERNAL ASSERTION FAILED: `+n;throw lt(e),new Error(e)}function se(n,e){n||re()}function rC(n,e){n||re()}function J(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends Yn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Yv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(At.UNAUTHENTICATED)))}shutdown(){}}class iC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class sC{constructor(e){this.t=e,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){se(this.o===void 0);let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new bt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new bt,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},a=c=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new bt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string"),new Jv(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string"),new At(e)}}class oC{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class aC{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new oC(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(At.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Xv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cC{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){se(this.o===void 0);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(se(typeof t.token=="string"),this.R=t.token,new Xv(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class uC{getToken(){return Promise.resolve(new Xv(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=lC(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function me(n,e){return n<e?-1:n>e?1:0}function Hs(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}function Zv(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new K(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Je.fromMillis(Date.now())}static fromDate(e){return Je.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Je(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?me(this.nanoseconds,e.nanoseconds):me(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ba{constructor(e,t,r){t===void 0?t=0:t>e.length&&re(),r===void 0?r=e.length-t:r>e.length-t&&re(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ba.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ba?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ae extends Ba{construct(e,t,r){return new Ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new Ae(t)}static emptyPath(){return new Ae([])}}const hC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends Ba{construct(e,t,r){return new Ke(e,t,r)}static isValidIdentifier(e){return hC.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ke(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new K(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new K(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new K(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ws{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Ad(n){return n.fields.find((e=>e.kind===2))}function Mi(n){return n.fields.filter((e=>e.kind!==2))}function dC(n,e){let t=me(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=fC(n.fields[r],e.fields[r]),t!==0)return t;return me(n.fields.length,e.fields.length)}Ws.UNKNOWN_ID=-1;class Ji{constructor(e,t){this.fieldPath=e,this.kind=t}}function fC(n,e){const t=Ke.comparator(n.fieldPath,e.fieldPath);return t!==0?t:me(n.kind,e.kind)}class Qs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Qs(0,gn.min())}}function eE(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=ae.fromTimestamp(r===1e9?new Je(t+1,0):new Je(t,r));return new gn(i,Z.empty(),e)}function tE(n){return new gn(n.readTime,n.key,-1)}class gn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new gn(ae.min(),Z.empty(),-1)}static max(){return new gn(ae.max(),Z.empty(),-1)}}function Pf(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:me(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==nE)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&re(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new O(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof O?t:O.resolve(t)}catch(t){return O.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):O.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):O.reject(t)}static resolve(e){return new O(((t,r)=>{t(e)}))}static reject(e){return new O(((t,r)=>{r(e)}))}static waitFor(e){return new O(((t,r)=>{let i=0,s=0,o=!1;e.forEach((a=>{++i,a.next((()=>{++s,o&&s===i&&t()}),(c=>r(c)))})),o=!0,s===i&&t()}))}static or(e){let t=O.resolve(!1);for(const r of e)t=t.next((i=>i?O.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new O(((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let c=0;c<s;c++){const l=c;t(e[l]).next((h=>{o[l]=h,++a,a===s&&r(o)}),(h=>i(h)))}}))}static doWhile(e,t){return new O(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new bt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new va(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=Cf(r.target.error);this.V.reject(new va(e,i))}}static open(e,t,r,i){try{return new El(t,e.transaction(i,r))}catch(s){throw new va(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||($("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new mC(t)}}class Hn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Hn.S(Et())===12.2&&lt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return $("SimpleDb","Removing database:",e),Bi(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Uv())return!1;if(Hn.v())return!0;const e=Et(),t=Hn.S(e),r=0<t&&t<10,i=iE(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||($("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new va(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new K(M.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new K(M.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new va(e,o))},i.onupgradeneeded=s=>{$("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next((()=>{$("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=El.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next((l=>(a.g(),l))).catch((l=>(a.abort(l),O.reject(l)))).toPromise();return c.catch((()=>{})),await a.m,c}catch(a){const c=a,l=c.name!=="FirebaseError"&&o<3;if($("SimpleDb","Transaction failed with error:",c.message,"Retrying:",l),this.close(),!l)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function iE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class pC{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Bi(this.B.delete())}}class va extends K{constructor(e,t){super(M.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Ii(n){return n.name==="IndexedDbTransactionError"}class mC{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?($("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):($("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Bi(r)}add(e){return $("SimpleDb","ADD",this.store.name,e,e),Bi(this.store.add(e))}get(e){return Bi(this.store.get(e)).next((t=>(t===void 0&&(t=null),$("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return $("SimpleDb","DELETE",this.store.name,e),Bi(this.store.delete(e))}count(){return $("SimpleDb","COUNT",this.store.name),Bi(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new O(((o,a)=>{s.onerror=c=>{a(c.target.error)},s.onsuccess=c=>{o(c.target.result)}}))}{const s=this.cursor(r),o=[];return this.W(s,((a,c)=>{o.push(c)})).next((()=>o))}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new O(((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}}))}j(e,t){$("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,((s,o,a)=>a.delete()))}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new O(((r,i)=>{t.onerror=s=>{const o=Cf(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((a=>{a?o.continue():r()})):r()}}))}W(e,t){const r=[];return new O(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new pC(a),l=t(a.primaryKey,a.value,c);if(l instanceof O){const h=l.catch((f=>(c.done(),O.reject(f))));r.push(h)}c.isDone?i():c.K===null?a.continue():a.continue(c.K)}})).next((()=>O.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Bi(n){return new O(((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Cf(r.target.error);t(i)}}))}let e_=!1;function Cf(n){const e=Hn.S(Et());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new K("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return e_||(e_=!0,setTimeout((()=>{throw r}),0)),r}}return n}class gC{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){$("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{$("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Ii(t)?$("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await yi(t)}await this.X(6e4)}))}}class _C{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const r=new Set;let i=t,s=!0;return O.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return $("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next((a=>{i-=a,r.add(o)}));s=!1})))).next((()=>t-i))}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.re(i,s))).next((a=>($("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a)))).next((()=>o.size))}))))}re(e,t){let r=e;return t.changes.forEach(((i,s)=>{const o=tE(s);Pf(o,r)>0&&(r=o)})),new gn(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class en{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}en.oe=-1;function lc(n){return n==null}function qa(n){return n===0&&1/n==-1/0}function sE(n){return typeof n=="number"&&Number.isInteger(n)&&!qa(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=t_(e)),e=yC(n.get(t),e);return t_(e)}function yC(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function t_(n){return n+""}function qn(n){const e=n.length;if(se(e>=2),e===2)return se(n.charAt(0)===""&&n.charAt(1)===""),Ae.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&re(),n.charAt(o+1)){case"":const a=n.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:re()}s=o+2}return new Ae(r)}/**
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
 */const n_=["userId","batchId"];/**
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
 */function pu(n,e){return[n,Gt(e)]}function oE(n,e,t){return[n,Gt(e),t]}const IC={},vC=["prefixPath","collectionGroup","readTime","documentId"],EC=["prefixPath","collectionGroup","documentId"],TC=["collectionGroup","readTime","prefixPath","documentId"],wC=["canonicalId","targetId"],AC=["targetId","path"],bC=["path","targetId"],RC=["collectionId","parent"],SC=["indexId","uid"],PC=["uid","sequenceNumber"],CC=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],DC=["indexId","uid","orderedDocumentKey"],kC=["userId","collectionPath","documentId"],NC=["userId","collectionPath","largestBatchId"],VC=["userId","collectionGroup","largestBatchId"],aE=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],OC=[...aE,"documentOverlays"],cE=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],uE=cE,Df=[...uE,"indexConfiguration","indexState","indexEntries"],xC=Df,LC=[...Df,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd extends rE{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Tt(n,e){const t=J(n);return Hn.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r_(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function vi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function lE(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function hE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t){this.comparator=e,this.root=t||Dt.EMPTY}insert(e,t){return new qe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Dt.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Dt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zc(this.root,e,this.comparator,!0)}}class Zc{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Dt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Dt.RED,this.left=i??Dt.EMPTY,this.right=s??Dt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Dt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Dt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Dt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw re();const e=this.left.check();if(e!==this.right.check())throw re();return e+(this.isRed()?0:1)}}Dt.EMPTY=null,Dt.RED=!0,Dt.BLACK=!1;Dt.EMPTY=new class{constructor(){this.size=0}get key(){throw re()}get value(){throw re()}get color(){throw re()}get left(){throw re()}get right(){throw re()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Dt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new i_(this.data.getIterator())}getIteratorFrom(e){return new i_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Le(this.comparator);return t.data=e,t}}class i_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ts(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new tn([])}unionWith(e){let t=new Le(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new tn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Hs(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class dE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MC(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new dE("Invalid base64 string: "+s):s}})(e);return new tt(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new tt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return me(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tt.EMPTY_BYTE_STRING=new tt("");const FC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tr(n){if(se(!!n),typeof n=="string"){let e=0;const t=FC.exec(n);if(se(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(n.seconds),nanos:We(n.nanos)}}function We(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function wr(n){return typeof n=="string"?tt.fromBase64String(n):tt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function wl(n){const e=n.mapValue.fields.__previous_value__;return Tl(e)?wl(e):e}function ja(n){const e=Tr(n.mapValue.fields.__local_write_time__.timestampValue);return new Je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class ui{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ui("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ui&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},mu={nullValue:"NULL_VALUE"};function li(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Tl(n)?4:fE(n)?9007199254740991:Al(n)?10:11:re()}function Qn(n,e){if(n===e)return!0;const t=li(n);if(t!==li(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ja(n).isEqual(ja(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Tr(i.timestampValue),a=Tr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return wr(i.bytesValue).isEqual(wr(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return We(i.geoPointValue.latitude)===We(s.geoPointValue.latitude)&&We(i.geoPointValue.longitude)===We(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return We(i.integerValue)===We(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=We(i.doubleValue),a=We(s.doubleValue);return o===a?qa(o)===qa(a):isNaN(o)&&isNaN(a)}return!1})(n,e);case 9:return Hs(n.arrayValue.values||[],e.arrayValue.values||[],Qn);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(r_(o)!==r_(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Qn(o[c],a[c])))return!1;return!0})(n,e);default:return re()}}function Ga(n,e){return(n.values||[]).find((t=>Qn(t,e)))!==void 0}function hi(n,e){if(n===e)return 0;const t=li(n),r=li(e);if(t!==r)return me(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return me(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const a=We(s.integerValue||s.doubleValue),c=We(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(n,e);case 3:return s_(n.timestampValue,e.timestampValue);case 4:return s_(ja(n),ja(e));case 5:return me(n.stringValue,e.stringValue);case 6:return(function(s,o){const a=wr(s),c=wr(o);return a.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const h=me(a[l],c[l]);if(h!==0)return h}return me(a.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const a=me(We(s.latitude),We(o.latitude));return a!==0?a:me(We(s.longitude),We(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return o_(n.arrayValue,e.arrayValue);case 10:return(function(s,o){var a,c,l,h;const f=s.fields||{},p=o.fields||{},g=(a=f.value)===null||a===void 0?void 0:a.arrayValue,b=(c=p.value)===null||c===void 0?void 0:c.arrayValue,T=me(((l=g==null?void 0:g.values)===null||l===void 0?void 0:l.length)||0,((h=b==null?void 0:b.values)===null||h===void 0?void 0:h.length)||0);return T!==0?T:o_(g,b)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===Xr.mapValue&&o===Xr.mapValue)return 0;if(s===Xr.mapValue)return 1;if(o===Xr.mapValue)return-1;const a=s.fields||{},c=Object.keys(a),l=o.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){const p=me(c[f],h[f]);if(p!==0)return p;const g=hi(a[c[f]],l[h[f]]);if(g!==0)return g}return me(c.length,h.length)})(n.mapValue,e.mapValue);default:throw re()}}function s_(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return me(n,e);const t=Tr(n),r=Tr(e),i=me(t.seconds,r.seconds);return i!==0?i:me(t.nanos,r.nanos)}function o_(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=hi(t[i],r[i]);if(s)return s}return me(t.length,r.length)}function Js(n){return Rd(n)}function Rd(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Tr(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return wr(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Z.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Rd(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Rd(t.fields[o])}`;return i+"}"})(n.mapValue):re()}function gu(n){switch(li(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=wl(n);return e?16+gu(e):16;case 5:return 2*n.stringValue.length;case 6:return wr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+gu(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return vi(r.fields,((s,o)=>{i+=s.length+gu(o)})),i})(n.mapValue);default:throw re()}}function es(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Sd(n){return!!n&&"integerValue"in n}function Ka(n){return!!n&&"arrayValue"in n}function a_(n){return!!n&&"nullValue"in n}function c_(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function _u(n){return!!n&&"mapValue"in n}function Al(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Ea(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return vi(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ea(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ea(n.arrayValue.values[t]);return e}return Object.assign({},n)}function fE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const pE={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function BC(n){return"nullValue"in n?mu:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?es(ui.empty(),Z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Al(n)?pE:{mapValue:{}}:re()}function qC(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?es(ui.empty(),Z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?pE:"mapValue"in n?Al(n)?{mapValue:{}}:Xr:re()}function u_(n,e){const t=hi(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function l_(n,e){const t=hi(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e){this.value=e}static empty(){return new Vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!_u(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ea(t)}setAll(e){let t=Ke.emptyPath(),r={},i=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Ea(o):i.push(a.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());_u(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];_u(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){vi(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new Vt(Ea(this.value))}}function mE(n){const e=[];return vi(n.fields,((t,r)=>{const i=new Ke([t]);if(_u(r)){const s=mE(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new tn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ge(e,0,ae.min(),ae.min(),ae.min(),Vt.empty(),0)}static newFoundDocument(e,t,r,i){return new Ge(e,1,t,ae.min(),r,i,0)}static newNoDocument(e,t){return new Ge(e,2,t,ae.min(),ae.min(),Vt.empty(),0)}static newUnknownDocument(e,t){return new Ge(e,3,t,ae.min(),ae.min(),Vt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ae.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Vt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ae.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class di{constructor(e,t){this.position=e,this.inclusive=t}}function h_(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),t.key):r=hi(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function d_(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Qn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class $a{constructor(e,t="asc"){this.field=e,this.dir=t}}function jC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class gE{}class be extends gE{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new GC(e,t,r):t==="array-contains"?new zC(e,r):t==="in"?new TE(e,r):t==="not-in"?new HC(e,r):t==="array-contains-any"?new WC(e,r):new be(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new KC(e,r):new $C(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(hi(t,this.value)):t!==null&&li(this.value)===li(t)&&this.matchesComparison(hi(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xe extends gE{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new xe(e,t)}matches(e){return Ys(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ys(n){return n.op==="and"}function Pd(n){return n.op==="or"}function kf(n){return _E(n)&&Ys(n)}function _E(n){for(const e of n.filters)if(e instanceof xe)return!1;return!0}function Cd(n){if(n instanceof be)return n.field.canonicalString()+n.op.toString()+Js(n.value);if(kf(n))return n.filters.map((e=>Cd(e))).join(",");{const e=n.filters.map((t=>Cd(t))).join(",");return`${n.op}(${e})`}}function yE(n,e){return n instanceof be?(function(r,i){return i instanceof be&&r.op===i.op&&r.field.isEqual(i.field)&&Qn(r.value,i.value)})(n,e):n instanceof xe?(function(r,i){return i instanceof xe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,o,a)=>s&&yE(o,i.filters[a])),!0):!1})(n,e):void re()}function IE(n,e){const t=n.filters.concat(e);return xe.create(t,n.op)}function vE(n){return n instanceof be?(function(t){return`${t.field.canonicalString()} ${t.op} ${Js(t.value)}`})(n):n instanceof xe?(function(t){return t.op.toString()+" {"+t.getFilters().map(vE).join(" ,")+"}"})(n):"Filter"}class GC extends be{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){const t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class KC extends be{constructor(e,t){super(e,"in",t),this.keys=EE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class $C extends be{constructor(e,t){super(e,"not-in",t),this.keys=EE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function EE(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>Z.fromName(r.referenceValue)))}class zC extends be{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ka(t)&&Ga(t.arrayValue,this.value)}}class TE extends be{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ga(this.value.arrayValue,t)}}class HC extends be{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ga(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ga(this.value.arrayValue,t)}}class WC extends be{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ka(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ga(this.value.arrayValue,r)))}}/**
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
 */class QC{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function Dd(n,e=null,t=[],r=[],i=null,s=null,o=null){return new QC(n,e,t,r,i,s,o)}function ts(n){const e=J(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Cd(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),lc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Js(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Js(r))).join(",")),e.ue=t}return e.ue}function hc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!jC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!yE(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!d_(n.startAt,e.startAt)&&d_(n.endAt,e.endAt)}function Mu(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Fu(n,e){return n.filters.filter((t=>t instanceof be&&t.field.isEqual(e)))}function f_(n,e,t){let r=mu,i=!0;for(const s of Fu(n,e)){let o=mu,a=!0;switch(s.op){case"<":case"<=":o=BC(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=mu}u_({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];u_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function p_(n,e,t){let r=Xr,i=!0;for(const s of Fu(n,e)){let o=Xr,a=!0;switch(s.op){case">=":case">":o=qC(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Xr}l_({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];l_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function wE(n,e,t,r,i,s,o,a){return new Pr(n,e,t,r,i,s,o,a)}function go(n){return new Pr(n)}function m_(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Nf(n){return n.collectionGroup!==null}function Us(n){const e=J(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Le(Ke.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(a=a.add(l.field))}))})),a})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new $a(s,r))})),t.has(Ke.keyField().canonicalString())||e.ce.push(new $a(Ke.keyField(),r))}return e.ce}function Kt(n){const e=J(n);return e.le||(e.le=bE(e,Us(n))),e.le}function AE(n){const e=J(n);return e.he||(e.he=bE(e,n.explicitOrderBy)),e.he}function bE(n,e){if(n.limitType==="F")return Dd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new $a(i.field,s)}));const t=n.endAt?new di(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new di(n.startAt.position,n.startAt.inclusive):null;return Dd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function kd(n,e){const t=n.filters.concat([e]);return new Pr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Uu(n,e,t){return new Pr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function dc(n,e){return hc(Kt(n),Kt(e))&&n.limitType===e.limitType}function RE(n){return`${ts(Kt(n))}|lt:${n.limitType}`}function Ds(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>vE(i))).join(", ")}]`),lc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Js(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Js(i))).join(",")),`Target(${r})`})(Kt(n))}; limitType=${n.limitType})`}function fc(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of Us(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(o,a,c){const l=h_(o,a,c);return o.inclusive?l<=0:l<0})(r.startAt,Us(r),i)||r.endAt&&!(function(o,a,c){const l=h_(o,a,c);return o.inclusive?l>=0:l>0})(r.endAt,Us(r),i))})(n,e)}function SE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function PE(n){return(e,t)=>{let r=!1;for(const i of Us(n)){const s=JC(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function JC(n,e,t){const r=n.field.isKeyField()?Z.comparator(e.key,t.key):(function(s,o,a){const c=o.data.field(s),l=a.data.field(s);return c!==null&&l!==null?hi(c,l):re()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return re()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vi(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return hE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YC=new qe(Z.comparator);function nn(){return YC}const CE=new qe(Z.comparator);function ca(...n){let e=CE;for(const t of n)e=e.insert(t.key,t);return e}function DE(n){let e=CE;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function jn(){return Ta()}function kE(){return Ta()}function Ta(){return new Cr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const XC=new qe(Z.comparator),ZC=new Le(Z.comparator);function Ie(...n){let e=ZC;for(const t of n)e=e.add(t);return e}const eD=new Le(me);function Vf(){return eD}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Of(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qa(e)?"-0":e}}function NE(n){return{integerValue:""+n}}function VE(n,e){return sE(e)?NE(e):Of(n,e)}/**
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
 */class bl{constructor(){this._=void 0}}function tD(n,e,t){return n instanceof Xs?(function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Tl(s)&&(s=wl(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}})(t,e):n instanceof ns?xE(n,e):n instanceof rs?LE(n,e):(function(i,s){const o=OE(i,s),a=g_(o)+g_(i.Pe);return Sd(o)&&Sd(i.Pe)?NE(a):Of(i.serializer,a)})(n,e)}function nD(n,e,t){return n instanceof ns?xE(n,e):n instanceof rs?LE(n,e):t}function OE(n,e){return n instanceof Zs?(function(r){return Sd(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class Xs extends bl{}class ns extends bl{constructor(e){super(),this.elements=e}}function xE(n,e){const t=ME(e);for(const r of n.elements)t.some((i=>Qn(i,r)))||t.push(r);return{arrayValue:{values:t}}}class rs extends bl{constructor(e){super(),this.elements=e}}function LE(n,e){let t=ME(e);for(const r of n.elements)t=t.filter((i=>!Qn(i,r)));return{arrayValue:{values:t}}}class Zs extends bl{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function g_(n){return We(n.integerValue||n.doubleValue)}function ME(n){return Ka(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t){this.field=e,this.transform=t}}function rD(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof ns&&i instanceof ns||r instanceof rs&&i instanceof rs?Hs(r.elements,i.elements,Qn):r instanceof Zs&&i instanceof Zs?Qn(r.Pe,i.Pe):r instanceof Xs&&i instanceof Xs})(n.transform,e.transform)}class iD{constructor(e,t){this.version=e,this.transformResults=t}}class Qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Qe}static exists(e){return new Qe(void 0,e)}static updateTime(e){return new Qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function yu(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Rl{}function FE(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new yo(n.key,Qe.none()):new _o(n.key,n.data,Qe.none());{const t=n.data,r=Vt.empty();let i=new Le(Ke.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Dr(n.key,r,new tn(i.toArray()),Qe.none())}}function sD(n,e,t){n instanceof _o?(function(i,s,o){const a=i.value.clone(),c=y_(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof Dr?(function(i,s,o){if(!yu(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=y_(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(UE(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function wa(n,e,t,r){return n instanceof _o?(function(s,o,a,c){if(!yu(s.precondition,o))return a;const l=s.value.clone(),h=I_(s.fieldTransforms,c,o);return l.setAll(h),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Dr?(function(s,o,a,c){if(!yu(s.precondition,o))return a;const l=I_(s.fieldTransforms,c,o),h=o.data;return h.setAll(UE(s)),h.setAll(l),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(s,o,a){return yu(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function oD(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=OE(r.transform,i||null);s!=null&&(t===null&&(t=Vt.empty()),t.set(r.field,s))}return t||null}function __(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Hs(r,i,((s,o)=>rD(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class _o extends Rl{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Dr extends Rl{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function UE(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function y_(n,e,t){const r=new Map;se(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,nD(o,a,t[i]))}return r}function I_(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,tD(s,o,e))}return r}class yo extends Rl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class xf extends Rl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&sD(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=wa(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=wa(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=kE();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const c=FE(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(ae.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&Hs(this.mutations,e.mutations,((t,r)=>__(t,r)))&&Hs(this.baseMutations,e.baseMutations,((t,r)=>__(t,r)))}}class Mf{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){se(e.mutations.length===r.length);let i=(function(){return XC})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Mf(e,t,r,i)}}/**
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
 */class Ff{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class BE{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aD{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,Re;function qE(n){switch(n){default:return re();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function jE(n){if(n===void 0)return lt("GRPC error has no .code"),M.UNKNOWN;switch(n){case pt.OK:return M.OK;case pt.CANCELLED:return M.CANCELLED;case pt.UNKNOWN:return M.UNKNOWN;case pt.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case pt.INTERNAL:return M.INTERNAL;case pt.UNAVAILABLE:return M.UNAVAILABLE;case pt.UNAUTHENTICATED:return M.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case pt.NOT_FOUND:return M.NOT_FOUND;case pt.ALREADY_EXISTS:return M.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return M.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case pt.ABORTED:return M.ABORTED;case pt.OUT_OF_RANGE:return M.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return M.UNIMPLEMENTED;case pt.DATA_LOSS:return M.DATA_LOSS;default:return re()}}(Re=pt||(pt={}))[Re.OK=0]="OK",Re[Re.CANCELLED=1]="CANCELLED",Re[Re.UNKNOWN=2]="UNKNOWN",Re[Re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Re[Re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Re[Re.NOT_FOUND=5]="NOT_FOUND",Re[Re.ALREADY_EXISTS=6]="ALREADY_EXISTS",Re[Re.PERMISSION_DENIED=7]="PERMISSION_DENIED",Re[Re.UNAUTHENTICATED=16]="UNAUTHENTICATED",Re[Re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Re[Re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Re[Re.ABORTED=10]="ABORTED",Re[Re.OUT_OF_RANGE=11]="OUT_OF_RANGE",Re[Re.UNIMPLEMENTED=12]="UNIMPLEMENTED",Re[Re.INTERNAL=13]="INTERNAL",Re[Re.UNAVAILABLE=14]="UNAVAILABLE",Re[Re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Bu=null;/**
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
 */function GE(){return new TextEncoder}/**
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
 */const cD=new Qi([4294967295,4294967295],0);function v_(n){const e=GE().encode(n),t=new Kv;return t.update(e),new Uint8Array(t.digest())}function E_(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Qi([t,r],0),new Qi([i,s],0)]}class Uf{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ua(`Invalid padding: ${t}`);if(r<0)throw new ua(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ua(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ua(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Qi.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Qi.fromNumber(r)));return i.compare(cD)===1&&(i=new Qi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=v_(e),[r,i]=E_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Uf(s,i,t);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.Ie===0)return;const t=v_(e),[r,i]=E_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ua extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,gc.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new mc(ae.min(),i,new qe(me),nn(),Ie())}}class gc{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new gc(r,t,Ie(),Ie(),Ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class KE{constructor(e,t){this.targetId=e,this.me=t}}class $E{constructor(e,t,r=tt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class T_{constructor(){this.fe=0,this.ge=A_(),this.pe=tt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ie(),t=Ie(),r=Ie();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:re()}})),new gc(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=A_()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,se(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class uD{constructor(e){this.Le=e,this.Be=new Map,this.ke=nn(),this.qe=w_(),this.Qe=new qe(me)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:re()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((r,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Mu(s))if(r===0){const o=new Z(s.path);this.Ue(t,o,Ge.newNoDocument(o,ae.min()))}else se(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),c=a?this.Xe(a,e,o):1;if(c!==0){this.je(t);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,l)}Bu==null||Bu.et((function(h,f,p,g,b){var T,P,k,D,N,L;const H={localCacheCount:h,existenceFilterCount:f.count,databaseId:p.database,projectId:p.projectId},j=f.unchangedNames;return j&&(H.bloomFilter={applied:b===0,hashCount:(T=j==null?void 0:j.hashCount)!==null&&T!==void 0?T:0,bitmapLength:(D=(k=(P=j==null?void 0:j.bits)===null||P===void 0?void 0:P.bitmap)===null||k===void 0?void 0:k.length)!==null&&D!==void 0?D:0,padding:(L=(N=j==null?void 0:j.bits)===null||N===void 0?void 0:N.padding)!==null&&L!==void 0?L:0,mightContain:E=>{var _;return(_=g==null?void 0:g.mightContain(E))!==null&&_!==void 0&&_}}),H})(o,e.me,this.Le.tt(),a,c))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=wr(r).toUint8Array()}catch(c){if(c instanceof dE)return mn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Uf(o,i,s)}catch(c){return mn(c instanceof ua?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Mu(a.target)){const c=new Z(a.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Ge.newNoDocument(c,e))}s.be&&(t.set(o,s.ve()),s.Ce())}}));let r=Ie();this.qe.forEach(((s,o)=>{let a=!0;o.forEachWhile((c=>{const l=this.Je(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(s))})),this.ke.forEach(((s,o)=>o.setReadTime(e)));const i=new mc(e,t,this.Qe,this.ke,r);return this.ke=nn(),this.qe=w_(),this.Qe=new qe(me),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new T_,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Le(me),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new T_),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function w_(){return new qe(Z.comparator)}function A_(){return new qe(Z.comparator)}const lD={asc:"ASCENDING",desc:"DESCENDING"},hD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},dD={and:"AND",or:"OR"};class fD{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Nd(n,e){return n.useProto3Json||lc(e)?e:{value:e}}function eo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zE(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function pD(n,e){return eo(n,e.toTimestamp())}function dt(n){return se(!!n),ae.fromTimestamp((function(t){const r=Tr(t);return new Je(r.seconds,r.nanos)})(n))}function Bf(n,e){return Vd(n,e).canonicalString()}function Vd(n,e){const t=(function(i){return new Ae(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function HE(n){const e=Ae.fromString(n);return se(rT(e)),e}function za(n,e){return Bf(n.databaseId,e.path)}function Wn(n,e){const t=HE(e);if(t.get(1)!==n.databaseId.projectId)throw new K(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(JE(t))}function WE(n,e){return Bf(n.databaseId,e)}function QE(n){const e=HE(n);return e.length===4?Ae.emptyPath():JE(e)}function Od(n){return new Ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function JE(n){return se(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function b_(n,e,t){return{name:za(n,e),fields:t.value.mapValue.fields}}function YE(n,e,t){const r=Wn(n,e.name),i=dt(e.updateTime),s=e.createTime?dt(e.createTime):ae.min(),o=new Vt({mapValue:{fields:e.fields}}),a=Ge.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function mD(n,e){return"found"in e?(function(r,i){se(!!i.found),i.found.name,i.found.updateTime;const s=Wn(r,i.found.name),o=dt(i.found.updateTime),a=i.found.createTime?dt(i.found.createTime):ae.min(),c=new Vt({mapValue:{fields:i.found.fields}});return Ge.newFoundDocument(s,o,a,c)})(n,e):"missing"in e?(function(r,i){se(!!i.missing),se(!!i.readTime);const s=Wn(r,i.missing),o=dt(i.readTime);return Ge.newNoDocument(s,o)})(n,e):re()}function gD(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:re()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(l,h){return l.useProto3Json?(se(h===void 0||typeof h=="string"),tt.fromBase64String(h||"")):(se(h===void 0||h instanceof Buffer||h instanceof Uint8Array),tt.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(l){const h=l.code===void 0?M.UNKNOWN:jE(l.code);return new K(h,l.message||"")})(o);t=new $E(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(n,r.document.name),s=dt(r.document.updateTime),o=r.document.createTime?dt(r.document.createTime):ae.min(),a=new Vt({mapValue:{fields:r.document.fields}}),c=Ge.newFoundDocument(i,s,o,a),l=r.targetIds||[],h=r.removedTargetIds||[];t=new Iu(l,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(n,r.document),s=r.readTime?dt(r.readTime):ae.min(),o=Ge.newNoDocument(i,s),a=r.removedTargetIds||[];t=new Iu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(n,r.document),s=r.removedTargetIds||[];t=new Iu([],s,i,null)}else{if(!("filter"in e))return re();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new aD(i,s),a=r.targetId;t=new KE(a,o)}}return t}function Ha(n,e){let t;if(e instanceof _o)t={update:b_(n,e.key,e.value)};else if(e instanceof yo)t={delete:za(n,e.key)};else if(e instanceof Dr)t={update:b_(n,e.key,e.data),updateMask:TD(e.fieldMask)};else{if(!(e instanceof xf))return re();t={verify:za(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,o){const a=o.transform;if(a instanceof Xs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof ns)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof rs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Zs)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw re()})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:pD(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:re()})(n,e.precondition)),t}function xd(n,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?Qe.updateTime(dt(s.updateTime)):s.exists!==void 0?Qe.exists(s.exists):Qe.none()})(e.currentDocument):Qe.none(),r=e.updateTransforms?e.updateTransforms.map((i=>(function(o,a){let c=null;if("setToServerValue"in a)se(a.setToServerValue==="REQUEST_TIME"),c=new Xs;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];c=new ns(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];c=new rs(h)}else"increment"in a?c=new Zs(o,a.increment):re();const l=Ke.fromServerFormat(a.fieldPath);return new pc(l,c)})(n,i))):[];if(e.update){e.update.name;const i=Wn(n,e.update.name),s=new Vt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const l=c.fieldPaths||[];return new tn(l.map((h=>Ke.fromServerFormat(h))))})(e.updateMask);return new Dr(i,s,o,t,r)}return new _o(i,s,t,r)}if(e.delete){const i=Wn(n,e.delete);return new yo(i,t)}if(e.verify){const i=Wn(n,e.verify);return new xf(i,t)}return re()}function _D(n,e){return n&&n.length>0?(se(e!==void 0),n.map((t=>(function(i,s){let o=i.updateTime?dt(i.updateTime):dt(s);return o.isEqual(ae.min())&&(o=dt(s)),new iD(o,i.transformResults||[])})(t,e)))):[]}function XE(n,e){return{documents:[WE(n,e.path)]}}function Sl(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=WE(n,i);const s=(function(l){if(l.length!==0)return nT(xe.create(l,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(l){if(l.length!==0)return l.map((h=>(function(p){return{field:Wr(p.field),direction:ID(p.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=Nd(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{_t:t,parent:i}}function ZE(n,e,t,r){const{_t:i,parent:s}=Sl(n,e),o={},a=[];let c=0;return t.forEach((l=>{const h=r?l.alias:"aggregate_"+c++;o[h]=l.alias,l.aggregateType==="count"?a.push({alias:h,count:{}}):l.aggregateType==="avg"?a.push({alias:h,avg:{field:Wr(l.fieldPath)}}):l.aggregateType==="sum"&&a.push({alias:h,sum:{field:Wr(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function eT(n){let e=QE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){se(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(f){const p=tT(f);return p instanceof xe&&kf(p)?p.getFilters():[p]})(t.where));let o=[];t.orderBy&&(o=(function(f){return f.map((p=>(function(b){return new $a(ks(b.field),(function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(b.direction))})(p)))})(t.orderBy));let a=null;t.limit&&(a=(function(f){let p;return p=typeof f=="object"?f.value:f,lc(p)?null:p})(t.limit));let c=null;t.startAt&&(c=(function(f){const p=!!f.before,g=f.values||[];return new di(g,p)})(t.startAt));let l=null;return t.endAt&&(l=(function(f){const p=!f.before,g=f.values||[];return new di(g,p)})(t.endAt)),wE(e,i,o,s,a,"F",c,l)}function yD(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function tT(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ks(t.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ks(t.unaryFilter.field);return be.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ks(t.unaryFilter.field);return be.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ks(t.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});default:return re()}})(n):n.fieldFilter!==void 0?(function(t){return be.create(ks(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return re()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return xe.create(t.compositeFilter.filters.map((r=>tT(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return re()}})(t.compositeFilter.op))})(n):re()}function ID(n){return lD[n]}function vD(n){return hD[n]}function ED(n){return dD[n]}function Wr(n){return{fieldPath:n.canonicalString()}}function ks(n){return Ke.fromServerFormat(n.fieldPath)}function nT(n){return n instanceof be?(function(t){if(t.op==="=="){if(c_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NAN"}};if(a_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(c_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NOT_NAN"}};if(a_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wr(t.field),op:vD(t.op),value:t.value}}})(n):n instanceof xe?(function(t){const r=t.getFilters().map((i=>nT(i)));return r.length===1?r[0]:{compositeFilter:{op:ED(t.op),filters:r}}})(n):re()}function TD(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function rT(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t,r,i,s=ae.min(),o=ae.min(),a=tt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new dr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e){this.ct=e}}function wD(n,e){let t;if(e.document)t=YE(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=Z.fromSegments(e.noDocument.path),i=ss(e.noDocument.readTime);t=Ge.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return re();{const r=Z.fromSegments(e.unknownDocument.path),i=ss(e.unknownDocument.version);t=Ge.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime((function(i){const s=new Je(i[0],i[1]);return ae.fromTimestamp(s)})(e.readTime)),t}function R_(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:qu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(s,o){return{name:za(s,o.key),fields:o.data.value.mapValue.fields,updateTime:eo(s,o.version.toTimestamp()),createTime:eo(s,o.createTime.toTimestamp())}})(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:is(e.version)};else{if(!e.isUnknownDocument())return re();r.unknownDocument={path:t.path.toArray(),version:is(e.version)}}return r}function qu(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function is(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function ss(n){const e=new Je(n.seconds,n.nanoseconds);return ae.fromTimestamp(e)}function qi(n,e){const t=(e.baseMutations||[]).map((s=>xd(n.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((s=>xd(n.ct,s))),i=Je.fromMillis(e.localWriteTimeMs);return new Lf(e.batchId,i,t,r)}function la(n){const e=ss(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?ss(n.lastLimboFreeSnapshotVersion):ae.min();let r;return r=(function(s){return s.documents!==void 0})(n.query)?(function(s){return se(s.documents.length===1),Kt(go(QE(s.documents[0])))})(n.query):(function(s){return Kt(eT(s))})(n.query),new dr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,tt.fromBase64String(n.resumeToken))}function sT(n,e){const t=is(e.snapshotVersion),r=is(e.lastLimboFreeSnapshotVersion);let i;i=Mu(e.target)?XE(n.ct,e.target):Sl(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ts(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function qf(n){const e=eT({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Uu(e,e.limit,"L"):e}function Mh(n,e){return new Ff(e.largestBatchId,xd(n.ct,e.overlayMutation))}function S_(n,e){const t=e.path.lastSegment();return[n,Gt(e.path.popLast()),t]}function P_(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:is(r.readTime),documentKey:Gt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AD{getBundleMetadata(e,t){return C_(e).get(t).next((r=>{if(r)return(function(s){return{id:s.bundleId,createTime:ss(s.createTime),version:s.version}})(r)}))}saveBundleMetadata(e,t){return C_(e).put((function(i){return{bundleId:i.id,createTime:is(dt(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return D_(e).get(t).next((r=>{if(r)return(function(s){return{name:s.name,query:qf(s.bundledQuery),readTime:ss(s.readTime)}})(r)}))}saveNamedQuery(e,t){return D_(e).put((function(i){return{name:i.name,readTime:is(dt(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function C_(n){return Tt(n,"bundles")}function D_(n){return Tt(n,"namedQueries")}/**
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
 */class Pl{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new Pl(e,r)}getOverlay(e,t){return Wo(e).get(S_(this.userId,t)).next((r=>r?Mh(this.serializer,r):null))}getOverlays(e,t){const r=jn();return O.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){const i=[];return r.forEach(((s,o)=>{const a=new Ff(t,o);i.push(this.ht(e,a))})),O.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach((o=>i.add(Gt(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Wo(e).j("collectionPathOverlayIndex",a))})),O.waitFor(s)}getOverlaysForCollection(e,t,r){const i=jn(),s=Gt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Wo(e).U("collectionPathOverlayIndex",o).next((a=>{for(const c of a){const l=Mh(this.serializer,c);i.set(l.getKey(),l)}return i}))}getOverlaysForCollectionGroup(e,t,r,i){const s=jn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Wo(e).J({index:"collectionGroupOverlayIndex",range:a},((c,l,h)=>{const f=Mh(this.serializer,l);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):h.done()})).next((()=>s))}ht(e,t){return Wo(e).put((function(i,s,o){const[a,c,l]=S_(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ha(i.ct,o.mutation)}})(this.serializer,this.userId,t))}}function Wo(n){return Tt(n,"documentOverlays")}/**
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
 */class bD{Pt(e){return Tt(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?tt.fromUint8Array(r):tt.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class ji{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(We(e.integerValue));else if("doubleValue"in e){const r=We(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),qa(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=Tr(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(wr(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?fE(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Al(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):re()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(We(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),Z.fromName(e).path.forEach((r=>{this.dt(t,60),this.Dt(r,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}ji.vt=new ji;function RD(n){if(n===0)return 8;let e=0;return n>>4==0&&(e+=4,n<<=4),n>>6==0&&(e+=2,n<<=2),n>>7==0&&(e+=1),e}function k_(n){const e=64-(function(r){let i=0;for(let s=0;s<8;++s){const o=RD(255&r[s]);if(i+=o,o!==8)break}return i})(n);return Math.ceil(e/8)}class SD{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=k_(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=k_(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class PD{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class CD{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Qo{constructor(){this.jt=new SD,this.Ht=new PD(this.jt),this.Jt=new CD(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class Gi{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Gi(this.indexId,this.documentKey,this.arrayValue,r)}}function Br(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=N_(n.arrayValue,e.arrayValue),t!==0?t:(t=N_(n.directionalValue,e.directionalValue),t!==0?t:Z.comparator(n.documentKey,e.documentKey)))}function N_(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class V_{constructor(e){this.Xt=new Le(((t,r)=>Ke.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(se(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Ad(e);if(t!==void 0&&!this.sn(t))return!1;const r=Mi(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const c=r[s];if(!this.on(a,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Le(Ke.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Ji(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Ji(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Ji(r.field,r.dir==="asc"?0:1)));return new Ws(Ws.UNKNOWN_ID,this.collectionId,t,Qs.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function oT(n){var e,t;if(se(n instanceof be||n instanceof xe),n instanceof be){if(n instanceof TE){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>be.create(n.field,"==",s))))||[];return xe.create(i,"or")}return n}const r=n.filters.map((i=>oT(i)));return xe.create(r,n.op)}function DD(n){if(n.getFilters().length===0)return[];const e=Fd(oT(n));return se(aT(e)),Ld(e)||Md(e)?[e]:e.getFilters()}function Ld(n){return n instanceof be}function Md(n){return n instanceof xe&&kf(n)}function aT(n){return Ld(n)||Md(n)||(function(t){if(t instanceof xe&&Pd(t)){for(const r of t.getFilters())if(!Ld(r)&&!Md(r))return!1;return!0}return!1})(n)}function Fd(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;if(n.filters.length===1)return Fd(n.filters[0]);const e=n.filters.map((r=>Fd(r)));let t=xe.create(e,n.op);return t=ju(t),aT(t)?t:(se(t instanceof xe),se(Ys(t)),se(t.filters.length>1),t.filters.reduce(((r,i)=>jf(r,i))))}function jf(n,e){let t;return se(n instanceof be||n instanceof xe),se(e instanceof be||e instanceof xe),t=n instanceof be?e instanceof be?(function(i,s){return xe.create([i,s],"and")})(n,e):O_(n,e):e instanceof be?O_(e,n):(function(i,s){if(se(i.filters.length>0&&s.filters.length>0),Ys(i)&&Ys(s))return IE(i,s.getFilters());const o=Pd(i)?i:s,a=Pd(i)?s:i,c=o.filters.map((l=>jf(l,a)));return xe.create(c,"or")})(n,e),ju(t)}function O_(n,e){if(Ys(e))return IE(e,n.getFilters());{const t=e.filters.map((r=>jf(n,r)));return xe.create(t,"or")}}function ju(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;const e=n.getFilters();if(e.length===1)return ju(e[0]);if(_E(n))return n;const t=e.map((i=>ju(i))),r=[];return t.forEach((i=>{i instanceof be?r.push(i):i instanceof xe&&(i.op===n.op?r.push(...i.filters):r.push(i))})),r.length===1?r[0]:xe.create(r,n.op)}/**
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
 */class kD{constructor(){this.un=new Gf}addToCollectionParentIndex(e,t){return this.un.add(t),O.resolve()}getCollectionParents(e,t){return O.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return O.resolve()}deleteFieldIndex(e,t){return O.resolve()}deleteAllFieldIndexes(e){return O.resolve()}createTargetIndexes(e,t){return O.resolve()}getDocumentsMatchingTarget(e,t){return O.resolve(null)}getIndexType(e,t){return O.resolve(0)}getFieldIndexes(e,t){return O.resolve([])}getNextCollectionGroupToUpdate(e){return O.resolve(null)}getMinOffset(e,t){return O.resolve(gn.min())}getMinOffsetFromCollectionGroup(e,t){return O.resolve(gn.min())}updateCollectionGroup(e,t,r){return O.resolve()}updateIndexEntries(e,t){return O.resolve()}}class Gf{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Le(Ae.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Le(Ae.comparator)).toArray()}}/**
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
 */const eu=new Uint8Array(0);class ND{constructor(e,t){this.databaseId=t,this.cn=new Gf,this.ln=new Cr((r=>ts(r)),((r,i)=>hc(r,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:r,parent:Gt(i)};return x_(e).put(s)}return O.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[Zv(t),""],!1,!0);return x_(e).U(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;r.push(qn(o.parent))}return r}))}addFieldIndex(e,t){const r=Jo(e),i=(function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=As(e);return s.next((a=>{o.put(P_(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const r=Jo(e),i=As(e),s=ws(e);return r.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Jo(e),r=ws(e),i=As(e);return t.j().next((()=>r.j())).next((()=>i.j()))}createTargetIndexes(e,t){return O.forEach(this.hn(t),(r=>this.getIndexType(e,r).next((i=>{if(i===0||i===1){const s=new V_(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const r=ws(e);let i=!0;const s=new Map;return O.forEach(this.hn(t),(o=>this.Pn(e,o).next((a=>{i&&(i=!!a),s.set(o,a)})))).next((()=>{if(i){let o=Ie();const a=[];return O.forEach(s,((c,l)=>{$("IndexedDbIndexManager",`Using index ${(function(N){return`id=${N.indexId}|cg=${N.collectionGroup}|f=${N.fields.map((L=>`${L.fieldPath}:${L.kind}`)).join(",")}`})(c)} to execute ${ts(t)}`);const h=(function(N,L){const H=Ad(L);if(H===void 0)return null;for(const j of Fu(N,H.fieldPath))switch(j.op){case"array-contains-any":return j.value.arrayValue.values||[];case"array-contains":return[j.value]}return null})(l,c),f=(function(N,L){const H=new Map;for(const j of Mi(L))for(const E of Fu(N,j.fieldPath))switch(E.op){case"==":case"in":H.set(j.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return H.set(j.fieldPath.canonicalString(),E.value),Array.from(H.values())}return null})(l,c),p=(function(N,L){const H=[];let j=!0;for(const E of Mi(L)){const _=E.kind===0?f_(N,E.fieldPath,N.startAt):p_(N,E.fieldPath,N.startAt);H.push(_.value),j&&(j=_.inclusive)}return new di(H,j)})(l,c),g=(function(N,L){const H=[];let j=!0;for(const E of Mi(L)){const _=E.kind===0?p_(N,E.fieldPath,N.endAt):f_(N,E.fieldPath,N.endAt);H.push(_.value),j&&(j=_.inclusive)}return new di(H,j)})(l,c),b=this.In(c,l,p),T=this.In(c,l,g),P=this.Tn(c,l,f),k=this.En(c.indexId,h,b,p.inclusive,T,g.inclusive,P);return O.forEach(k,(D=>r.G(D,t.limit).next((N=>{N.forEach((L=>{const H=Z.fromSegments(L.documentKey);o.has(H)||(o=o.add(H),a.push(H))}))}))))})).next((()=>a))}return O.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=DD(xe.create(e.filters,"and")).map((r=>Dd(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const c=(t!=null?t.length:1)*Math.max(r.length,s.length),l=c/(t!=null?t.length:1),h=[];for(let f=0;f<c;++f){const p=t?this.dn(t[f/l]):eu,g=this.An(e,p,r[f%l],i),b=this.Rn(e,p,s[f%l],o),T=a.map((P=>this.An(e,p,P,!0)));h.push(...this.createRange(g,b,T))}return h}An(e,t,r,i){const s=new Gi(e,Z.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new Gi(e,Z.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new V_(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o}))}getIndexType(e,t){let r=2;const i=this.hn(t);return O.forEach(i,(s=>this.Pn(e,s).next((o=>{o?r!==0&&o.fields.length<(function(c){let l=new Le(Ke.comparator),h=!1;for(const f of c.filters)for(const p of f.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?h=!0:l=l.add(p.field));for(const f of c.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(h?1:0)})(s)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&r===2?1:r))}Vn(e,t){const r=new Qo;for(const i of Mi(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);ji.vt.It(s,o)}return r.zt()}dn(e){const t=new Qo;return ji.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new Qo;return ji.vt.It(es(this.databaseId,t),r.Yt((function(s){const o=Mi(s);return o.length===0?0:o[o.length-1].kind})(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new Qo);let s=0;for(const o of Mi(e)){const a=r[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&Ka(a))i=this.gn(i,o,a);else{const l=c.Yt(o.kind);ji.vt.It(a,l)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new Qo;c.seed(a.zt()),ji.vt.It(o,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find((r=>r instanceof be&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Jo(e),i=As(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next((s=>{const o=[];return O.forEach(s,(a=>i.get([a.indexId,this.uid]).next((c=>{o.push((function(h,f){const p=f?new Qs(f.sequenceNumber,new gn(ss(f.readTime),new Z(qn(f.documentKey)),f.largestBatchId)):Qs.empty(),g=h.fields.map((([b,T])=>new Ji(Ke.fromServerFormat(b),T)));return new Ws(h.indexId,h.collectionGroup,g,p)})(a,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:me(r.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const i=Jo(e),s=As(e);return this.yn(e).next((o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((a=>O.forEach(a,(c=>s.put(P_(c.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return O.forEach(t,((i,s)=>{const o=r.get(i.collectionGroup);return(o?O.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((a=>(r.set(i.collectionGroup,a),O.forEach(a,(c=>this.wn(e,i,c).next((l=>{const h=this.Sn(s,c);return l.isEqual(h)?O.resolve():this.bn(e,s,c,l,h)})))))))}))}Dn(e,t,r,i){return ws(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return ws(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=ws(e);let s=new Le(Br);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},((o,a)=>{s=s.add(new Gi(r.indexId,t,a.arrayValue,a.directionalValue))})).next((()=>s))}Sn(e,t){let r=new Le(Br);const i=this.Vn(t,e);if(i==null)return r;const s=Ad(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Ka(o))for(const a of o.arrayValue.values||[])r=r.add(new Gi(t.indexId,e.key,this.dn(a),i))}else r=r.add(new Gi(t.indexId,e.key,eu,i));return r}bn(e,t,r,i,s){$("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return(function(c,l,h,f,p){const g=c.getIterator(),b=l.getIterator();let T=Ts(g),P=Ts(b);for(;T||P;){let k=!1,D=!1;if(T&&P){const N=h(T,P);N<0?D=!0:N>0&&(k=!0)}else T!=null?D=!0:k=!0;k?(f(P),P=Ts(b)):D?(p(T),T=Ts(g)):(T=Ts(g),P=Ts(b))}})(i,s,Br,(a=>{o.push(this.Dn(e,t,r,a))}),(a=>{o.push(this.vn(e,t,r,a))})),O.waitFor(o)}yn(e){let t=1;return As(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,a)=>Br(o,a))).filter(((o,a,c)=>!a||Br(o,c[a-1])!==0));const i=[];i.push(e);for(const o of r){const a=Br(o,e),c=Br(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,eu,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,eu,[]];s.push(IDBKeyRange.bound(a,c))}return s}Cn(e,t){return Br(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(L_)}getMinOffset(e,t){return O.mapArray(this.hn(t),(r=>this.Pn(e,r).next((i=>i||re())))).next(L_)}}function x_(n){return Tt(n,"collectionParents")}function ws(n){return Tt(n,"indexEntries")}function Jo(n){return Tt(n,"indexConfiguration")}function As(n){return Tt(n,"indexState")}function L_(n){se(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Pf(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new gn(e.readTime,e.documentKey,t)}/**
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
 */const M_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Ut{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Ut(e,Ut.DEFAULT_COLLECTION_PERCENTILE,Ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cT(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const c=r.J({range:o},((h,f,p)=>(a++,p.delete())));s.push(c.next((()=>{se(a===1)})));const l=[];for(const h of t.mutations){const f=oE(e,h.key.path,t.batchId);s.push(i.delete(f)),l.push(h.key)}return O.waitFor(s).next((()=>l))}function Gu(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw re();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut.DEFAULT_COLLECTION_PERCENTILE=10,Ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ut.DEFAULT=new Ut(41943040,Ut.DEFAULT_COLLECTION_PERCENTILE,Ut.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ut.DISABLED=new Ut(-1,0,0);class Cl{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){se(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Cl(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return qr(e).J({index:"userMutationsIndex",range:r},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,i){const s=Ns(e),o=qr(e);return o.add({}).next((a=>{se(typeof a=="number");const c=new Lf(a,t,r,i),l=(function(g,b,T){const P=T.baseMutations.map((D=>Ha(g.ct,D))),k=T.mutations.map((D=>Ha(g.ct,D)));return{userId:b,batchId:T.batchId,localWriteTimeMs:T.localWriteTime.toMillis(),baseMutations:P,mutations:k}})(this.serializer,this.userId,c),h=[];let f=new Le(((p,g)=>me(p.canonicalString(),g.canonicalString())));for(const p of i){const g=oE(this.userId,p.key.path,a);f=f.add(p.key.path.popLast()),h.push(o.put(l)),h.push(s.put(g,IC))}return f.forEach((p=>{h.push(this.indexManager.addToCollectionParentIndex(e,p))})),e.addOnCommittedListener((()=>{this.Fn[a]=c.keys()})),O.waitFor(h).next((()=>c))}))}lookupMutationBatch(e,t){return qr(e).get(t).next((r=>r?(se(r.userId===this.userId),qi(this.serializer,r)):null))}Mn(e,t){return this.Fn[t]?O.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return qr(e).J({index:"userMutationsIndex",range:i},((o,a,c)=>{a.userId===this.userId&&(se(a.batchId>=r),s=qi(this.serializer,a)),c.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return qr(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,o)=>{r=s.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return qr(e).U("userMutationsIndex",t).next((r=>r.map((i=>qi(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=pu(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Ns(e).J({range:i},((o,a,c)=>{const[l,h,f]=o,p=qn(h);if(l===this.userId&&t.path.isEqual(p))return qr(e).get(f).next((g=>{if(!g)throw re();se(g.userId===this.userId),s.push(qi(this.serializer,g))}));c.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);const i=[];return t.forEach((s=>{const o=pu(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=Ns(e).J({range:a},((l,h,f)=>{const[p,g,b]=l,T=qn(g);p===this.userId&&s.path.isEqual(T)?r=r.add(b):f.done()}));i.push(c)})),O.waitFor(i).next((()=>this.xn(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=pu(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Le(me);return Ns(e).J({range:o},((c,l,h)=>{const[f,p,g]=c,b=qn(p);f===this.userId&&r.isPrefixOf(b)?b.length===i&&(a=a.add(g)):h.done()})).next((()=>this.xn(e,a)))}xn(e,t){const r=[],i=[];return t.forEach((s=>{i.push(qr(e).get(s).next((o=>{if(o===null)throw re();se(o.userId===this.userId),r.push(qi(this.serializer,o))})))})),O.waitFor(i).next((()=>r))}removeMutationBatch(e,t){return cT(e._e,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),O.forEach(r,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return O.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return Ns(e).J({range:r},((s,o,a)=>{if(s[0]===this.userId){const c=qn(s[1]);i.push(c)}else a.done()})).next((()=>{se(i.length===0)}))}))}containsKey(e,t){return uT(e,this.userId,t)}Nn(e){return lT(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function uT(n,e,t){const r=pu(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Ns(n).J({range:s,H:!0},((a,c,l)=>{const[h,f,p]=a;h===e&&f===i&&(o=!0),l.done()})).next((()=>o))}function qr(n){return Tt(n,"mutations")}function Ns(n){return Tt(n,"documentMutations")}function lT(n){return Tt(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new os(0)}static kn(){return new os(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VD{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const r=new os(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>ae.fromTimestamp(new Je(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>bs(e).delete(t.targetId))).next((()=>this.qn(e))).next((r=>(se(r.targetCount>0),r.targetCount-=1,this.Qn(e,r))))}removeTargets(e,t,r){let i=0;const s=[];return bs(e).J(((o,a)=>{const c=la(a);c.sequenceNumber<=t&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))})).next((()=>O.waitFor(s))).next((()=>i))}forEachTarget(e,t){return bs(e).J(((r,i)=>{const s=la(i);t(s)}))}qn(e){return F_(e).get("targetGlobalKey").next((t=>(se(t!==null),t)))}Qn(e,t){return F_(e).put("targetGlobalKey",t)}Kn(e,t){return bs(e).put(sT(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const r=ts(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return bs(e).J({range:i,index:"queryTargetsIndex"},((o,a,c)=>{const l=la(a);hc(t,l.target)&&(s=l,c.done())})).next((()=>s))}addMatchingKeys(e,t,r){const i=[],s=Qr(e);return t.forEach((o=>{const a=Gt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))})),O.waitFor(i)}removeMatchingKeys(e,t,r){const i=Qr(e);return O.forEach(t,(s=>{const o=Gt(s.path);return O.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])}))}removeMatchingKeysForTargetId(e,t){const r=Qr(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Qr(e);let s=Ie();return i.J({range:r,H:!0},((o,a,c)=>{const l=qn(o[1]),h=new Z(l);s=s.add(h)})).next((()=>s))}containsKey(e,t){const r=Gt(t.path),i=IDBKeyRange.bound([r],[Zv(r)],!1,!0);let s=0;return Qr(e).J({index:"documentTargetsIndex",H:!0,range:i},(([o,a],c,l)=>{o!==0&&(s++,l.done())})).next((()=>s>0))}ot(e,t){return bs(e).get(t).next((r=>r?la(r):null))}}function bs(n){return Tt(n,"targets")}function F_(n){return Tt(n,"targetGlobal")}function Qr(n){return Tt(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_([n,e],[t,r]){const i=me(n,t);return i===0?me(e,r):i}class OD{constructor(e){this.Un=e,this.buffer=new Le(U_),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();U_(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class hT{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){$("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ii(t)?$("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await yi(t)}await this.Hn(3e5)}))}}class xD{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return O.resolve(en.oe);const r=new OD(t);return this.Jn.forEachTarget(e,(i=>r.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>r.zn(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),O.resolve(M_)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),M_):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,c,l;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i)))).next((f=>(r=f,a=Date.now(),this.removeTargets(e,r,t)))).next((f=>(s=f,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(l=Date.now(),Cs()<=we.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${f} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),O.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f}))))}}function dT(n,e){return new xD(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LD{constructor(e,t){this.db=e,this.garbageCollector=dT(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((r,i)=>t(i)))}addReference(e,t,r){return tu(e,r)}removeReference(e,t,r){return tu(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return tu(e,t)}nr(e,t){return(function(i,s){let o=!1;return lT(i).Y((a=>uT(i,a,s).next((c=>(c&&(o=!0),O.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((o,a)=>{if(a<=t){const c=this.nr(e,o).next((l=>{if(!l)return s++,r.getEntry(e,o).next((()=>(r.removeEntry(o,ae.min()),Qr(e).delete((function(f){return[0,Gt(f.path)]})(o)))))}));i.push(c)}})).next((()=>O.waitFor(i))).next((()=>r.apply(e))).next((()=>s))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return tu(e,t)}tr(e,t){const r=Qr(e);let i,s=en.oe;return r.J({index:"documentTargetsIndex"},(([o,a],{path:c,sequenceNumber:l})=>{o===0?(s!==en.oe&&t(new Z(qn(i)),s),s=l,i=c):s=en.oe})).next((()=>{s!==en.oe&&t(new Z(qn(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function tu(n,e){return Qr(n).put((function(r,i){return{targetId:0,path:Gt(r.path),sequenceNumber:i}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(){this.changes=new Cr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?O.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MD{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Oi(e).put(r)}removeEntry(e,t,r){return Oi(e).delete((function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],qu(o),a[a.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.rr(e,r))))}getEntry(e,t){let r=Ge.newInvalidDocument(t);return Oi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Yo(t))},((i,s)=>{r=this.ir(t,s)})).next((()=>r))}sr(e,t){let r={size:0,document:Ge.newInvalidDocument(t)};return Oi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Yo(t))},((i,s)=>{r={document:this.ir(t,s),size:Gu(s)}})).next((()=>r))}getEntries(e,t){let r=nn();return this._r(e,t,((i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)})).next((()=>r))}ar(e,t){let r=nn(),i=new qe(Z.comparator);return this._r(e,t,((s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,Gu(o))})).next((()=>({documents:r,ur:i})))}_r(e,t,r){if(t.isEmpty())return O.resolve();let i=new Le(j_);t.forEach((c=>i=i.add(c)));const s=IDBKeyRange.bound(Yo(i.first()),Yo(i.last())),o=i.getIterator();let a=o.getNext();return Oi(e).J({index:"documentKeyIndex",range:s},((c,l,h)=>{const f=Z.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;a&&j_(a,f)<0;)r(a,null),a=o.getNext();a&&a.isEqual(f)&&(r(a,l),a=o.hasNext()?o.getNext():null),a?h.$(Yo(a)):h.done()})).next((()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),qu(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Oi(e).U(IDBKeyRange.bound(a,c,!0)).next((l=>{s==null||s.incrementDocumentReadCount(l.length);let h=nn();for(const f of l){const p=this.ir(Z.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);p.isFoundDocument()&&(fc(t,p)||i.has(p.key))&&(h=h.insert(p.key,p))}return h}))}getAllFromCollectionGroup(e,t,r,i){let s=nn();const o=q_(t,r),a=q_(t,gn.max());return Oi(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},((c,l,h)=>{const f=this.ir(Z.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);s=s.insert(f.key,f),s.size===i&&h.done()})).next((()=>s))}newChangeBuffer(e){return new FD(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return B_(e).get("remoteDocumentGlobalKey").next((t=>(se(!!t),t)))}rr(e,t){return B_(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=wD(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ae.min())))return r}return Ge.newInvalidDocument(e)}}function pT(n){return new MD(n)}class FD extends fT{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Cr((r=>r.toString()),((r,i)=>r.isEqual(i)))}applyChanges(e){const t=[];let r=0,i=new Le(((s,o)=>me(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=R_(this.cr.serializer,o);i=i.add(s.path.popLast());const l=Gu(c);r+=l-a.size,t.push(this.cr.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=R_(this.cr.serializer,o.convertToNoDocument(ae.min()));t.push(this.cr.addEntry(e,s,c))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,r)),O.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:r,ur:i})=>(i.forEach(((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})})),r)))}}function B_(n){return Tt(n,"remoteDocumentGlobal")}function Oi(n){return Tt(n,"remoteDocumentsV14")}function Yo(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function q_(n,e){const t=e.documentKey.path.toArray();return[n,qu(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function j_(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=me(t[s],r[s]),i)return i;return i=me(t.length,r.length),i||(i=me(t[t.length-2],r[r.length-2]),i||me(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class UD{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&wa(r.mutation,i,tn.empty(),Je.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const i=jn();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let o=ca();return s.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=jn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,r,i){let s=nn();const o=Ta(),a=(function(){return Ta()})();return t.forEach(((c,l)=>{const h=r.get(l.key);i.has(l.key)&&(h===void 0||h.mutation instanceof Dr)?s=s.insert(l.key,l):h!==void 0?(o.set(l.key,h.mutation.getFieldMask()),wa(h.mutation,l,h.mutation.getFieldMask(),Je.now())):o.set(l.key,tn.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((l,h)=>o.set(l,h))),t.forEach(((l,h)=>{var f;return a.set(l,new UD(h,(f=o.get(l))!==null&&f!==void 0?f:null))})),a)))}recalculateAndSaveOverlays(e,t){const r=Ta();let i=new qe(((o,a)=>o-a)),s=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const l=t.get(c);if(l===null)return;let h=r.get(c)||tn.empty();h=a.applyToLocalView(l,h),r.set(c,h);const f=(i.get(a.batchId)||Ie()).add(c);i=i.insert(a.batchId,f)}))})).next((()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,h=c.value,f=kE();h.forEach((p=>{if(!s.has(p)){const g=FE(t.get(p),r.get(p));g!==null&&f.set(p,g),s=s.add(p)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return O.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return(function(o){return Z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):O.resolve(jn());let a=-1,c=s;return o.next((l=>O.forEach(l,((h,f)=>(a<f.largestBatchId&&(a=f.largestBatchId),s.get(h)?O.resolve():this.remoteDocumentCache.getEntry(e,h).next((p=>{c=c.insert(h,p)}))))).next((()=>this.populateOverlays(e,l,s))).next((()=>this.computeViews(e,c,l,Ie()))).next((h=>({batchId:a,changes:DE(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next((r=>{let i=ca();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=ca();return this.indexManager.getCollectionParents(e,s).next((a=>O.forEach(a,(c=>{const l=(function(f,p){return new Pr(p,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next((h=>{h.forEach(((f,p)=>{o=o.insert(f,p)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((o=>{s.forEach(((c,l)=>{const h=l.getKey();o.get(h)===null&&(o=o.insert(h,Ge.newInvalidDocument(h)))}));let a=ca();return o.forEach(((c,l)=>{const h=s.get(c);h!==void 0&&wa(h.mutation,l,tn.empty(),Je.now()),fc(t,l)&&(a=a.insert(c,l))})),a}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BD{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return O.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:dt(i.createTime)}})(t)),O.resolve()}getNamedQuery(e,t){return O.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:qf(i.bundledQuery),readTime:dt(i.readTime)}})(t)),O.resolve()}}/**
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
 */class qD{constructor(){this.overlays=new qe(Z.comparator),this.Ir=new Map}getOverlay(e,t){return O.resolve(this.overlays.get(t))}getOverlays(e,t){const r=jn();return O.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.ht(e,t,s)})),O.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(r)),O.resolve()}getOverlaysForCollection(e,t,r){const i=jn(),s=t.length+1,o=new Z(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return O.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new qe(((l,h)=>l-h));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let h=s.get(l.largestBatchId);h===null&&(h=jn(),s=s.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}const a=jn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,h)=>a.set(l,h))),!(a.size()>=i)););return O.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ff(t,r));let s=this.Ir.get(t);s===void 0&&(s=Ie(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
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
 */class jD{constructor(){this.sessionToken=tt.EMPTY_BYTE_STRING}getSessionToken(e){return O.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,O.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(){this.Tr=new Le(wt.Er),this.dr=new Le(wt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new wt(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new wt(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new Z(new Ae([])),r=new wt(t,e),i=new wt(t,e+1),s=[];return this.dr.forEachInRange([r,i],(o=>{this.Vr(o),s.push(o.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new Z(new Ae([])),r=new wt(t,e),i=new wt(t,e+1);let s=Ie();return this.dr.forEachInRange([r,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new wt(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class wt{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return Z.comparator(e.key,t.key)||me(e.wr,t.wr)}static Ar(e,t){return me(e.wr,t.wr)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GD{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Le(wt.Er)}checkEmpty(e){return O.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Lf(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new wt(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return O.resolve(o)}lookupMutationBatch(e,t){return O.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return O.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return O.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return O.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new wt(t,0),i=new wt(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],(o=>{const a=this.Dr(o.wr);s.push(a)})),O.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);return t.forEach((i=>{const s=new wt(i,0),o=new wt(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],(a=>{r=r.add(a.wr)}))})),O.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;Z.isDocumentKey(s)||(s=s.child(""));const o=new wt(new Z(s),0);let a=new Le(me);return this.br.forEachWhile((c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.wr)),!0)}),o),O.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach((r=>{const i=this.Dr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){se(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return O.forEach(t.mutations,(i=>{const s=new wt(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new wt(t,0),i=this.br.firstAfterOrEqual(r);return O.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,O.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KD{constructor(e){this.Mr=e,this.docs=(function(){return new qe(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return O.resolve(r?r.document.mutableCopy():Ge.newInvalidDocument(t))}getEntries(e,t){let r=nn();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ge.newInvalidDocument(i))})),O.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=nn();const o=t.path,a=new Z(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:h}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Pf(tE(h),r)<=0||(i.has(h.key)||fc(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return O.resolve(s)}getAllFromCollectionGroup(e,t,r,i){re()}Or(e,t){return O.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new $D(this)}getSize(e){return O.resolve(this.size)}}class $D extends fT{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)})),O.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zD{constructor(e){this.persistence=e,this.Nr=new Cr((t=>ts(t)),hc),this.lastRemoteSnapshotVersion=ae.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Kf,this.targetCount=0,this.kr=os.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,i)=>t(i))),O.resolve()}getLastRemoteSnapshotVersion(e){return O.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return O.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),O.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),O.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new os(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,O.resolve()}updateTargetData(e,t){return this.Kn(t),O.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,O.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach(((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)})),O.waitFor(s).next((()=>i))}getTargetCount(e){return O.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return O.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),O.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),O.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),O.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return O.resolve(r)}containsKey(e,t){return O.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this.qr={},this.overlays={},this.Qr=new en(0),this.Kr=!1,this.Kr=!0,this.$r=new jD,this.referenceDelegate=e(this),this.Ur=new zD(this),this.indexManager=new kD,this.remoteDocumentCache=(function(i){return new KD(i)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new iT(t),this.Gr=new BD(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new qD,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new GD(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const i=new HD(this.Qr.next());return this.referenceDelegate.zr(),r(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return O.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class HD extends rE{constructor(e){super(),this.currentSequenceNumber=e}}class Dl{constructor(e){this.persistence=e,this.Jr=new Kf,this.Yr=null}static Zr(e){return new Dl(e)}get Xr(){if(this.Yr)return this.Yr;throw re()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),O.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),O.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),O.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return O.forEach(this.Xr,(r=>{const i=Z.fromPath(r);return this.ei(e,i).next((s=>{s||t.removeEntry(i,ae.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return O.or([()=>O.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class Ku{constructor(e,t){this.persistence=e,this.ti=new Cr((r=>Gt(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=dT(this,t)}static Zr(e,t){return new Ku(e,t)}zr(){}jr(e){return O.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}Zn(e,t){return O.forEach(this.ti,((r,i)=>this.nr(e,r,i).next((s=>s?O.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,(o=>this.nr(e,o,t).next((a=>{a||(r++,s.removeEntry(o,ae.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),O.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),O.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),O.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),O.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=gu(e.data.value)),t}nr(e,t,r){return O.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return O.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WD{constructor(e){this.serializer=e}O(e,t,r,i){const s=new El("createOrUpgrade",t);r<1&&i>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",n_,{unique:!0}),c.createObjectStore("documentMutations")})(e),G_(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let o=O.resolve();return r<3&&i>=3&&(r!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),G_(e)),o=o.next((()=>(function(c){const l=c.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ae.min().toTimestamp(),targetCount:0};return l.put("targetGlobalKey",h)})(s)))),r<4&&i>=4&&(r!==0&&(o=o.next((()=>(function(c,l){return l.store("mutations").U().next((h=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",n_,{unique:!0});const f=l.store("mutations"),p=h.map((g=>f.put(g)));return O.waitFor(p)}))})(e,s)))),o=o.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),r<5&&i>=5&&(o=o.next((()=>this.ni(s)))),r<6&&i>=6&&(o=o.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),r<7&&i>=7&&(o=o.next((()=>this.ii(s)))),r<8&&i>=8&&(o=o.next((()=>this.si(e,s)))),r<9&&i>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&i>=10&&(o=o.next((()=>this.oi(s)))),r<11&&i>=11&&(o=o.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),r<12&&i>=12&&(o=o.next((()=>{(function(c){const l=c.createObjectStore("documentOverlays",{keyPath:kC});l.createIndex("collectionPathOverlayIndex",NC,{unique:!1}),l.createIndex("collectionGroupOverlayIndex",VC,{unique:!1})})(e)}))),r<13&&i>=13&&(o=o.next((()=>(function(c){const l=c.createObjectStore("remoteDocumentsV14",{keyPath:vC});l.createIndex("documentKeyIndex",EC),l.createIndex("collectionGroupIndex",TC)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),r<14&&i>=14&&(o=o.next((()=>this.ai(e,s)))),r<15&&i>=15&&(o=o.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:SC}).createIndex("sequenceNumberIndex",PC,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:CC}).createIndex("documentKeyIndex",DC,{unique:!1})})(e)))),r<16&&i>=16&&(o=o.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),r<17&&i>=17&&(o=o.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),o}ri(e){let t=0;return e.store("remoteDocuments").J(((r,i)=>{t+=Gu(i)})).next((()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)}))}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next((i=>O.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next((a=>O.forEach(a,(c=>{se(c.userId===s.userId);const l=qi(this.serializer,c);return cT(e,s.userId,l).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return r.J(((o,a)=>{const c=new Ae(o),l=(function(f){return[0,Gt(f)]})(c);s.push(t.get(l).next((h=>h?O.resolve():(f=>t.put({targetId:0,path:Gt(f),sequenceNumber:i.highestListenSequenceNumber}))(c))))})).next((()=>O.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:RC});const r=t.store("collectionParents"),i=new Gf,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:Gt(c)})}};return t.store("remoteDocuments").J({H:!0},((o,a)=>{const c=new Ae(o);return s(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([o,a,c],l)=>{const h=qn(a);return s(h.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((r,i)=>{const s=la(i),o=sT(this.serializer,s);return t.put(o)}))}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J(((s,o)=>{const a=t.store("remoteDocumentsV14"),c=(function(f){return f.document?new Z(Ae.fromString(f.document.name).popFirst(5)):f.noDocument?Z.fromSegments(f.noDocument.path):f.unknownDocument?Z.fromSegments(f.unknownDocument.path):re()})(o).path.toArray(),l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(l))})).next((()=>O.waitFor(i)))}ai(e,t){const r=t.store("mutations"),i=pT(this.serializer),s=new $f(Dl.Zr,this.serializer.ct);return r.U().next((o=>{const a=new Map;return o.forEach((c=>{var l;let h=(l=a.get(c.userId))!==null&&l!==void 0?l:Ie();qi(this.serializer,c).keys().forEach((f=>h=h.add(f))),a.set(c.userId,h)})),O.forEach(a,((c,l)=>{const h=new At(l),f=Pl.lt(this.serializer,h),p=s.getIndexManager(h),g=Cl.lt(h,this.serializer,p,s.referenceDelegate);return new mT(i,g,f,p).recalculateAndSaveOverlaysForDocumentKeys(new bd(t,en.oe),c).next()}))}))}}function G_(n){n.createObjectStore("targetDocuments",{keyPath:AC}).createIndex("documentTargetsIndex",bC,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",wC,{unique:!0}),n.createObjectStore("targetGlobal")}const Fh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class zf{constructor(e,t,r,i,s,o,a,c,l,h,f=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=l,this.li=h,this.hi=f,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=p=>Promise.resolve(),!zf.D())throw new K(M.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new LD(this,i),this.Ai=t+"main",this.serializer=new iT(c),this.Ri=new Hn(this.Ai,this.hi,new WD(this.serializer)),this.$r=new bD,this.Ur=new VD(this.referenceDelegate,this.serializer),this.remoteDocumentCache=pT(this.serializer),this.Gr=new AD,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&lt("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new K(M.FAILED_PRECONDITION,Fh);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new en(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>nu(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(Ii(e))return $("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return $("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Xo(e).get("owner").next((t=>O.resolve(this.vi(t))))}Ci(e){return nu(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=Tt(t,"clientMetadata");return r.U().next((i=>{const s=this.xi(i,18e5),o=i.filter((a=>s.indexOf(a)===-1));return O.forEach(o,(a=>r.delete(a.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?O.resolve(!0):Xo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new K(M.FAILED_PRECONDITION,Fh);return!1}}return!(!this.networkEnabled||!this.inForeground)||nu(e).U().next((r=>this.xi(r,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&$("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new bd(e,en.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>nu(e).U().next((t=>this.xi(t,18e5).map((r=>r.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Cl.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ND(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Pl.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){$("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(c){return c===17?LC:c===16?xC:c===15?Df:c===14?uE:c===13?cE:c===12?OC:c===11?aE:void re()})(this.hi);let o;return this.Ri.runTransaction(e,i,s,(a=>(o=new bd(a,this.Qr?this.Qr.next():en.oe),t==="readwrite-primary"?this.wi(o).next((c=>!!c||this.Si(o))).next((c=>{if(!c)throw lt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new K(M.FAILED_PRECONDITION,nE);return r(o)})).next((c=>this.Di(o).next((()=>c)))):this.Ki(o).next((()=>r(o)))))).then((a=>(o.raiseOnCommittedEvent(),a)))}Ki(e){return Xo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new K(M.FAILED_PRECONDITION,Fh)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Xo(e).put("owner",t)}static D(){return Hn.D()}bi(e){const t=Xo(e);return t.get("owner").next((r=>this.vi(r)?($("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):O.resolve()))}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(lt(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Fv()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return $("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return lt("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){lt("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Xo(n){return Tt(n,"owner")}function nu(n){return Tt(n,"clientMetadata")}function Hf(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=Ie(),i=Ie();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Wf(e,t.fromCache,r,i)}}/**
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
 */class QD{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class gT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Fv()?8:iE(Et())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.Zi(e,t,i,r).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new QD;return this.Xi(e,t,o).next((a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)}))})).next((()=>s.result))}es(e,t,r,i){return r.documentReadCount<this.ji?(Cs()<=we.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Ds(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),O.resolve()):(Cs()<=we.DEBUG&&$("QueryEngine","Query:",Ds(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Cs()<=we.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Ds(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Kt(t))):O.resolve())}Yi(e,t){if(m_(t))return O.resolve(null);let r=Kt(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=Uu(t,null,"F"),r=Kt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const o=Ie(...s);return this.Ji.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const l=this.ts(t,a);return this.ns(t,l,o,c.readTime)?this.Yi(e,Uu(t,null,"F")):this.rs(e,l,t,c)}))))})))))}Zi(e,t,r,i){return m_(t)||i.isEqual(ae.min())?O.resolve(null):this.Ji.getDocuments(e,r).next((s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?O.resolve(null):(Cs()<=we.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ds(t)),this.rs(e,o,t,eE(i,-1)).next((a=>a)))}))}ts(e,t){let r=new Le(PE(e));return t.forEach(((i,s)=>{fc(e,s)&&(r=r.add(s))})),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return Cs()<=we.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Ds(t)),this.Ji.getDocumentsMatchingQuery(e,t,gn.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JD{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new qe(me),this._s=new Cr((s=>ts(s)),hc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new mT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function _T(n,e,t,r){return new JD(n,e,t,r)}async function yT(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const o=[],a=[];let c=Ie();for(const l of i){o.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}for(const l of s){a.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(r,c).next((l=>({hs:l,removedBatchIds:o,addedBatchIds:a})))}))}))}function YD(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(a,c,l,h){const f=l.batch,p=f.keys();let g=O.resolve();return p.forEach((b=>{g=g.next((()=>h.getEntry(c,b))).next((T=>{const P=l.docVersions.get(b);se(P!==null),T.version.compareTo(P)<0&&(f.applyToRemoteDocument(T,l),T.isValidDocument()&&(T.setReadTime(l.commitVersion),h.addEntry(T)))}))})),g.next((()=>a.mutationQueue.removeMutationBatch(c,f)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let c=Ie();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function IT(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function XD(n,e){const t=J(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach(((h,f)=>{const p=i.get(f);if(!p)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,f).next((()=>t.Ur.addMatchingKeys(s,h.addedDocuments,f))));let g=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?g=g.withResumeToken(tt.EMPTY_BYTE_STRING,ae.min()).withLastLimboFreeSnapshotVersion(ae.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),i=i.insert(f,g),(function(T,P,k){return T.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=3e8?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0})(p,g,h)&&a.push(t.Ur.updateTargetData(s,g))}));let c=nn(),l=Ie();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),a.push(vT(s,o,e.documentUpdates).next((h=>{c=h.Ps,l=h.Is}))),!r.isEqual(ae.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next((f=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r)));a.push(h)}return O.waitFor(a).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,l))).next((()=>c))})).then((s=>(t.os=i,s)))}function vT(n,e,t){let r=Ie(),i=Ie();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let o=nn();return t.forEach(((a,c)=>{const l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(ae.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):$("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)})),{Ps:o,Is:i}}))}function ZD(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function to(n,e){const t=J(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.Ur.getTargetData(r,e).next((s=>s?(i=s,O.resolve(i)):t.Ur.allocateTargetId(r).next((o=>(i=new dr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r}))}async function no(n,e,t){const r=J(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(o=>r.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!Ii(o))throw o;$("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function $u(n,e,t){const r=J(n);let i=ae.min(),s=Ie();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,l,h){const f=J(c),p=f._s.get(h);return p!==void 0?O.resolve(f.os.get(p)):f.Ur.getTargetData(l,h)})(r,o,Kt(e)).next((a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next((c=>{s=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:ae.min(),t?s:Ie()))).next((a=>(wT(r,SE(e),a),{documents:a,Ts:s})))))}function ET(n,e){const t=J(n),r=J(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",(s=>r.ot(s,e).next((o=>o?o.target:null))))}function TT(n,e){const t=J(n),r=t.us.get(e)||ae.min();return t.persistence.runTransaction("Get new document changes","readonly",(i=>t.cs.getAllFromCollectionGroup(i,e,eE(r,-1),Number.MAX_SAFE_INTEGER))).then((i=>(wT(t,e,i),i)))}function wT(n,e,t){let r=n.us.get(e)||ae.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.us.set(e,r)}async function ek(n,e,t,r){const i=J(n);let s=Ie(),o=nn();for(const l of t){const h=e.Es(l.metadata.name);l.document&&(s=s.add(h));const f=e.ds(l);f.setReadTime(e.As(l.metadata.readTime)),o=o.insert(h,f)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),c=await to(i,(function(h){return Kt(go(Ae.fromString(`__bundle__/docs/${h}`)))})(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",(l=>vT(l,a,o).next((h=>(a.apply(l),h))).next((h=>i.Ur.removeMatchingKeysForTargetId(l,c.targetId).next((()=>i.Ur.addMatchingKeys(l,s,c.targetId))).next((()=>i.localDocuments.getLocalViewOfDocuments(l,h.Ps,h.Is))).next((()=>h.Ps))))))}async function tk(n,e,t=Ie()){const r=await to(n,Kt(qf(e.bundledQuery))),i=J(n);return i.persistence.runTransaction("Save named query","readwrite",(s=>{const o=dt(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(tt.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next((()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId))).next((()=>i.Ur.addMatchingKeys(s,t,r.targetId))).next((()=>i.Gr.saveNamedQuery(s,e)))}))}function K_(n,e){return`firestore_clients_${n}_${e}`}function $_(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Uh(n,e){return`firestore_targets_${n}_${e}`}class zu{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new K(i.error.code,i.error.message))),o?new zu(e,t,i.state,s):(lt("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Aa{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new K(r.error.code,r.error.message))),s?new Aa(e,r.state,i):(lt("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Hu{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Vf();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=sE(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Hu(e,s):(lt("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Qf{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Qf(t.clientId,t.onlineState):(lt("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Ud{constructor(){this.activeTargetIds=Vf()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Bh{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new qe(me),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=K_(this.persistenceKey,this.ps),this.vs=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Ud),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this.Os=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(K_(this.persistenceKey,r));if(i){const s=Hu.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach(((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Uh(this.persistenceKey,e));if(i){const s=Aa.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Uh(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach((i=>{this.Qs(i)})),this.currentUser=e,r.forEach((i=>{this.addPendingMutation(i)}))}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return $("SharedClientState","READ",e,t),t}setItem(e,t){$("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){$("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if($("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void lt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=(function(s){let o=en.oe;if(s!=null)try{const a=JSON.parse(s);se(typeof a=="number"),o=a}catch(a){lt("SharedClientState","Failed to read sequence number from WebStorage",a)}return o})(t.newValue);r!==en.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map((i=>this.syncEngine.eo(i))))}}}else this.bs.push(t)}))}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new zu(this.currentUser,e,t,r),s=$_(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=$_(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=Uh(this.persistenceKey,e),s=new Aa(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return Hu.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return zu.Rs(new At(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return Aa.Rs(i,t)}Ls(e){return Qf.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);$("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach((c=>{i.has(c)||o.push(c)})),i.forEach((c=>{s.has(c)||a.push(c)})),this.syncEngine.io(o,a).then((()=>{this.Ss=r}))}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=Vf();return e.forEach(((r,i)=>{t=t.unionWith(i.activeTargetIds)})),t}}class AT{constructor(){this.so=new Ud,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ud,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class nk{_o(e){}shutdown(){}}/**
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
 */class z_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){$("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){$("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ru=null;function qh(){return ru===null?ru=(function(){return 268435456+Math.round(2147483648*Math.random())})():ru++,"0x"+ru.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft="WebChannelConnection";class sk extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=qh(),c=this.xo(t,r.toUriEncodedString());$("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);const l={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(l,s,o),this.No(t,c,l,i).then((h=>($("RestConnection",`Received RPC '${t}' ${a}: `,h),h)),(h=>{throw mn("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",c,"request:",i),h}))}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+mo})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((s,o)=>t[o]=s)),i&&i.headers.forEach(((s,o)=>t[o]=s))}xo(t,r){const i=rk[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=qh();return new Promise(((o,a)=>{const c=new $v;c.setWithCredentials(!0),c.listenOnce(zv.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case fu.NO_ERROR:const h=c.getResponseJson();$(Ft,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case fu.TIMEOUT:$(Ft,`RPC '${e}' ${s} timed out`),a(new K(M.DEADLINE_EXCEEDED,"Request time out"));break;case fu.HTTP_ERROR:const f=c.getStatus();if($(Ft,`RPC '${e}' ${s} failed with status:`,f,"response text:",c.getResponseText()),f>0){let p=c.getResponseJson();Array.isArray(p)&&(p=p[0]);const g=p==null?void 0:p.error;if(g&&g.status&&g.message){const b=(function(P){const k=P.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(k)>=0?k:M.UNKNOWN})(g.status);a(new K(b,g.message))}else a(new K(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new K(M.UNAVAILABLE,"Connection failed."));break;default:re()}}finally{$(Ft,`RPC '${e}' ${s} completed.`)}}));const l=JSON.stringify(i);$(Ft,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",l,r,15)}))}Bo(e,t,r){const i=qh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Qv(),a=Wv(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=s.join("");$(Ft,`Creating RPC '${e}' stream ${i}: ${h}`,c);const f=o.createWebChannel(h,c);let p=!1,g=!1;const b=new ik({Io:P=>{g?$(Ft,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(p||($(Ft,`Opening RPC '${e}' stream ${i} transport.`),f.open(),p=!0),$(Ft,`RPC '${e}' stream ${i} sending:`,P),f.send(P))},To:()=>f.close()}),T=(P,k,D)=>{P.listen(k,(N=>{try{D(N)}catch(L){setTimeout((()=>{throw L}),0)}}))};return T(f,aa.EventType.OPEN,(()=>{g||($(Ft,`RPC '${e}' stream ${i} transport opened.`),b.yo())})),T(f,aa.EventType.CLOSE,(()=>{g||(g=!0,$(Ft,`RPC '${e}' stream ${i} transport closed`),b.So())})),T(f,aa.EventType.ERROR,(P=>{g||(g=!0,mn(Ft,`RPC '${e}' stream ${i} transport errored:`,P),b.So(new K(M.UNAVAILABLE,"The operation could not be completed")))})),T(f,aa.EventType.MESSAGE,(P=>{var k;if(!g){const D=P.data[0];se(!!D);const N=D,L=N.error||((k=N[0])===null||k===void 0?void 0:k.error);if(L){$(Ft,`RPC '${e}' stream ${i} received error:`,L);const H=L.status;let j=(function(y){const v=pt[y];if(v!==void 0)return jE(v)})(H),E=L.message;j===void 0&&(j=M.INTERNAL,E="Unknown error status: "+H+" with message "+L.message),g=!0,b.So(new K(j,E)),f.close()}else $(Ft,`RPC '${e}' stream ${i} received:`,D),b.bo(D)}})),T(a,Hv.STAT_EVENT,(P=>{P.stat===wd.PROXY?$(Ft,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===wd.NOPROXY&&$(Ft,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{b.wo()}),0),b}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function bT(){return typeof window<"u"?window:null}function vu(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(n){return new fD(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(e,t,r,i,s,o,a,c){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Jf(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(lt(t.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.Yo===t&&this.P_(r,i)}),(r=>{e((()=>{const i=new K(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)}))}))}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{r((()=>this.I_(i)))})),this.stream.onMessage((i=>{r((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return $("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():($("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ok extends RT{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=gD(this.serializer,e),r=(function(s){if(!("targetChange"in s))return ae.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?ae.min():o.readTime?dt(o.readTime):ae.min()})(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Od(this.serializer),t.addTarget=(function(s,o){let a;const c=o.target;if(a=Mu(c)?{documents:XE(s,c)}:{query:Sl(s,c)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=zE(s,o.resumeToken);const l=Nd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(ae.min())>0){a.readTime=eo(s,o.snapshotVersion.toTimestamp());const l=Nd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}return a})(this.serializer,e);const r=yD(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Od(this.serializer),t.removeTarget=e,this.a_(t)}}class ak extends RT{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return se(!!e.streamToken),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){se(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=_D(e.writeResults,e.commitTime),r=dt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Od(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Ha(this.serializer,r)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ck extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new K(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Mo(e,Vd(t,r),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(M.UNKNOWN,s.toString())}))}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Lo(e,Vd(t,r),i,o,a,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new K(M.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class uk{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(lt(t),this.D_=!1):$("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lk{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((o=>{r.enqueueAndForget((async()=>{Ei(this)&&($("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const l=J(c);l.L_.add(4),await Io(l),l.q_.set("Unknown"),l.L_.delete(4),await yc(l)})(this))}))})),this.q_=new uk(r,i)}}async function yc(n){if(Ei(n))for(const e of n.B_)await e(!0)}async function Io(n){for(const e of n.B_)await e(!1)}function kl(n,e){const t=J(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Zf(t)?Xf(t):Eo(t).r_()&&Yf(t,e))}function ro(n,e){const t=J(n),r=Eo(t);t.N_.delete(e),r.r_()&&ST(t,e),t.N_.size===0&&(r.r_()?r.o_():Ei(t)&&t.q_.set("Unknown"))}function Yf(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ae.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Eo(n).A_(e)}function ST(n,e){n.Q_.xe(e),Eo(n).R_(e)}function Xf(n){n.Q_=new uD({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Eo(n).start(),n.q_.v_()}function Zf(n){return Ei(n)&&!Eo(n).n_()&&n.N_.size>0}function Ei(n){return J(n).L_.size===0}function PT(n){n.Q_=void 0}async function hk(n){n.q_.set("Online")}async function dk(n){n.N_.forEach(((e,t)=>{Yf(n,e)}))}async function fk(n,e){PT(n),Zf(n)?(n.q_.M_(e),Xf(n)):n.q_.set("Unknown")}async function pk(n,e,t){if(n.q_.set("Online"),e instanceof $E&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))})(n,e)}catch(r){$("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Wu(n,r)}else if(e instanceof Iu?n.Q_.Ke(e):e instanceof KE?n.Q_.He(e):n.Q_.We(e),!t.isEqual(ae.min()))try{const r=await IT(n.localStore);t.compareTo(r)>=0&&await(function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach(((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.N_.get(l);h&&s.N_.set(l,h.withResumeToken(c.resumeToken,o))}})),a.targetMismatches.forEach(((c,l)=>{const h=s.N_.get(c);if(!h)return;s.N_.set(c,h.withResumeToken(tt.EMPTY_BYTE_STRING,h.snapshotVersion)),ST(s,c);const f=new dr(h.target,c,l,h.sequenceNumber);Yf(s,f)})),s.remoteSyncer.applyRemoteEvent(a)})(n,t)}catch(r){$("RemoteStore","Failed to raise snapshot:",r),await Wu(n,r)}}async function Wu(n,e,t){if(!Ii(e))throw e;n.L_.add(1),await Io(n),n.q_.set("Offline"),t||(t=()=>IT(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{$("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await yc(n)}))}function CT(n,e){return e().catch((t=>Wu(n,t,e)))}async function vo(n){const e=J(n),t=fi(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;mk(e);)try{const i=await ZD(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,gk(e,i)}catch(i){await Wu(e,i)}DT(e)&&kT(e)}function mk(n){return Ei(n)&&n.O_.length<10}function gk(n,e){n.O_.push(e);const t=fi(n);t.r_()&&t.V_&&t.m_(e.mutations)}function DT(n){return Ei(n)&&!fi(n).n_()&&n.O_.length>0}function kT(n){fi(n).start()}async function _k(n){fi(n).p_()}async function yk(n){const e=fi(n);for(const t of n.O_)e.m_(t.mutations)}async function Ik(n,e,t){const r=n.O_.shift(),i=Mf.from(r,e,t);await CT(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await vo(n)}async function vk(n,e){e&&fi(n).V_&&await(async function(r,i){if((function(o){return qE(o)&&o!==M.ABORTED})(i.code)){const s=r.O_.shift();fi(r).s_(),await CT(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await vo(r)}})(n,e),DT(n)&&kT(n)}async function H_(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),$("RemoteStore","RemoteStore received new credentials");const r=Ei(t);t.L_.add(3),await Io(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await yc(t)}async function Bd(n,e){const t=J(n);e?(t.L_.delete(2),await yc(t)):e||(t.L_.add(2),await Io(t),t.q_.set("Unknown"))}function Eo(n){return n.K_||(n.K_=(function(t,r,i){const s=J(t);return s.w_(),new ok(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:hk.bind(null,n),Ro:dk.bind(null,n),mo:fk.bind(null,n),d_:pk.bind(null,n)}),n.B_.push((async e=>{e?(n.K_.s_(),Zf(n)?Xf(n):n.q_.set("Unknown")):(await n.K_.stop(),PT(n))}))),n.K_}function fi(n){return n.U_||(n.U_=(function(t,r,i){const s=J(t);return s.w_(),new ak(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:_k.bind(null,n),mo:vk.bind(null,n),f_:yk.bind(null,n),g_:Ik.bind(null,n)}),n.B_.push((async e=>{e?(n.U_.s_(),await vo(n)):(await n.U_.stop(),n.O_.length>0&&($("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))}))),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new bt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new ep(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function To(n,e){if(lt("AsyncQueue",`${e}: ${n}`),Ii(n))return new K(M.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.comparator=e?(t,r)=>e(t,r)||Z.comparator(t.key,r.key):(t,r)=>Z.comparator(t.key,r.key),this.keyedMap=ca(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new Bs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Bs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
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
 */class W_{constructor(){this.W_=new qe(Z.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):re():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,r)=>{e.push(r)})),e}}class io{constructor(e,t,r,i,s,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new io(e,t,Bs.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&dc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ek{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class Tk{constructor(){this.queries=Q_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=J(t),s=i.queries;i.queries=Q_(),s.forEach(((o,a)=>{for(const c of a.j_)c.onError(r)}))})(this,new K(M.ABORTED,"Firestore shutting down"))}}function Q_(){return new Cr((n=>RE(n)),dc)}async function tp(n,e){const t=J(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new Ek,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=To(o,`Initialization of query '${Ds(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&rp(t)}async function np(n,e){const t=J(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function wk(n,e){const t=J(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&rp(t)}function Ak(n,e,t){const r=J(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function rp(n){n.Y_.forEach((e=>{e.next()}))}var qd,J_;(J_=qd||(qd={})).ea="default",J_.Cache="cache";class ip{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new io(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=io.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==qd.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e){this.serializer=e}Es(e){return Wn(this.serializer,e)}ds(e){return e.metadata.exists?YE(this.serializer,e.document,!1):Ge.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return dt(e)}}class Rk{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=NT(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=Ae.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new Y_(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||Ie()).add(s);t.set(o,a)}}return t}async complete(){const e=await ek(this.localStore,new Y_(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await tk(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function NT(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e){this.key=e}}class OT{constructor(e){this.key=e}}class xT{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ie(),this.mutatedKeys=Ie(),this.Aa=PE(e),this.Ra=new Bs(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new W_,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((h,f)=>{const p=i.get(h),g=fc(this.query,f)?f:null,b=!!p&&this.mutatedKeys.has(p.key),T=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let P=!1;p&&g?p.data.isEqual(g.data)?b!==T&&(r.track({type:3,doc:g}),P=!0):this.ga(p,g)||(r.track({type:2,doc:g}),P=!0,(c&&this.Aa(g,c)>0||l&&this.Aa(g,l)<0)&&(a=!0)):!p&&g?(r.track({type:0,doc:g}),P=!0):p&&!g&&(r.track({type:1,doc:p}),P=!0,(c||l)&&(a=!0)),P&&(g?(o=o.add(g),s=T?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((h,f)=>(function(g,b){const T=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re()}};return T(g)-T(b)})(h.type,f.type)||this.Aa(h.doc,f.doc))),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,l=c!==this.Ea;return this.Ea=c,o.length!==0||l?{snapshot:new io(this.query,e.Ra,s,o,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new W_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ie(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const t=[];return e.forEach((r=>{this.da.has(r)||t.push(new OT(r))})),this.da.forEach((r=>{e.has(r)||t.push(new VT(r))})),t}ba(e){this.Ta=e.Ts,this.da=Ie();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return io.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Sk{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Pk{constructor(e){this.key=e,this.va=!1}}class Ck{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Cr((a=>RE(a)),dc),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(Z.comparator),this.Na=new Map,this.La=new Kf,this.Ba={},this.ka=new Map,this.qa=os.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Dk(n,e,t=!0){const r=Nl(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await LT(r,e,t,!0),i}async function kk(n,e){const t=Nl(n);await LT(t,e,!0,!1)}async function LT(n,e,t,r){const i=await to(n.localStore,Kt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await sp(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&kl(n.remoteStore,i),a}async function sp(n,e,t,r,i){n.Ka=(f,p,g)=>(async function(T,P,k,D){let N=P.view.ma(k);N.ns&&(N=await $u(T.localStore,P.query,!1).then((({documents:E})=>P.view.ma(E,N))));const L=D&&D.targetChanges.get(P.targetId),H=D&&D.targetMismatches.get(P.targetId)!=null,j=P.view.applyChanges(N,T.isPrimaryClient,L,H);return jd(T,P.targetId,j.wa),j.snapshot})(n,f,p,g);const s=await $u(n.localStore,e,!0),o=new xT(e,s.Ts),a=o.ma(s.documents),c=gc.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(a,n.isPrimaryClient,c);jd(n,t,l.wa);const h=new Sk(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),l.snapshot}async function Nk(n,e,t){const r=J(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter((o=>!dc(o,e)))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await no(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ro(r.remoteStore,i.targetId),so(r,i.targetId)})).catch(yi)):(so(r,i.targetId),await no(r.localStore,i.targetId,!0))}async function Vk(n,e){const t=J(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ro(t.remoteStore,r.targetId))}async function Ok(n,e,t){const r=up(n);try{const i=await(function(o,a){const c=J(o),l=Je.now(),h=a.reduce(((g,b)=>g.add(b.key)),Ie());let f,p;return c.persistence.runTransaction("Locally write mutations","readwrite",(g=>{let b=nn(),T=Ie();return c.cs.getEntries(g,h).next((P=>{b=P,b.forEach(((k,D)=>{D.isValidDocument()||(T=T.add(k))}))})).next((()=>c.localDocuments.getOverlayedDocuments(g,b))).next((P=>{f=P;const k=[];for(const D of a){const N=oD(D,f.get(D.key).overlayedDocument);N!=null&&k.push(new Dr(D.key,N,mE(N.value.mapValue),Qe.exists(!0)))}return c.mutationQueue.addMutationBatch(g,l,k,a)})).next((P=>{p=P;const k=P.applyToLocalDocumentSet(f,T);return c.documentOverlayCache.saveOverlays(g,P.batchId,k)}))})).then((()=>({batchId:p.batchId,changes:DE(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(o,a,c){let l=o.Ba[o.currentUser.toKey()];l||(l=new qe(me)),l=l.insert(a,c),o.Ba[o.currentUser.toKey()]=l})(r,i.batchId,t),await kr(r,i.changes),await vo(r.remoteStore)}catch(i){const s=To(i,"Failed to persist write");t.reject(s)}}async function MT(n,e){const t=J(n);try{const r=await XD(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Na.get(s);o&&(se(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?se(o.va):i.removedDocuments.size>0&&(se(o.va),o.va=!1))})),await kr(t,r,e)}catch(r){await yi(r)}}function X_(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach(((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)})),(function(o,a){const c=J(o);c.onlineState=a;let l=!1;c.queries.forEach(((h,f)=>{for(const p of f.j_)p.Z_(a)&&(l=!0)})),l&&rp(c)})(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function xk(n,e,t){const r=J(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new qe(Z.comparator);o=o.insert(s,Ge.newNoDocument(s,ae.min()));const a=Ie().add(s),c=new mc(ae.min(),new Map,new qe(me),o,a);await MT(r,c),r.Oa=r.Oa.remove(s),r.Na.delete(e),cp(r)}else await no(r.localStore,e,!1).then((()=>so(r,e,t))).catch(yi)}async function Lk(n,e){const t=J(n),r=e.batch.batchId;try{const i=await YD(t.localStore,e);ap(t,r,null),op(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await kr(t,i)}catch(i){await yi(i)}}async function Mk(n,e,t){const r=J(n);try{const i=await(function(o,a){const c=J(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let h;return c.mutationQueue.lookupMutationBatch(l,a).next((f=>(se(f!==null),h=f.keys(),c.mutationQueue.removeMutationBatch(l,f)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h))).next((()=>c.localDocuments.getDocuments(l,h)))}))})(r.localStore,e);ap(r,e,t),op(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await kr(r,i)}catch(i){await yi(i)}}async function Fk(n,e){const t=J(n);Ei(t.remoteStore)||$("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const a=J(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>a.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=To(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function op(n,e){(n.ka.get(e)||[]).forEach((t=>{t.resolve()})),n.ka.delete(e)}function ap(n,e,t){const r=J(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function so(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach((r=>{n.La.containsKey(r)||FT(n,r)}))}function FT(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(ro(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),cp(n))}function jd(n,e,t){for(const r of t)r instanceof VT?(n.La.addReference(r.key,e),Uk(n,r)):r instanceof OT?($("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||FT(n,r.key)):re()}function Uk(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||($("SyncEngine","New document in limbo: "+t),n.xa.add(r),cp(n))}function cp(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new Z(Ae.fromString(e)),r=n.qa.next();n.Na.set(r,new Pk(t)),n.Oa=n.Oa.insert(t,r),kl(n.remoteStore,new dr(Kt(go(t.path)),r,"TargetPurposeLimboResolution",en.oe))}}async function kr(n,e,t){const r=J(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach(((a,c)=>{o.push(r.Ka(c,e,t).then((l=>{var h;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(h=t==null?void 0:t.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){i.push(l);const f=Wf.Wi(c.targetId,l);s.push(f)}})))})),await Promise.all(o),r.Ca.d_(i),await(async function(c,l){const h=J(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>O.forEach(l,(p=>O.forEach(p.$i,(g=>h.persistence.referenceDelegate.addReference(f,p.targetId,g))).next((()=>O.forEach(p.Ui,(g=>h.persistence.referenceDelegate.removeReference(f,p.targetId,g)))))))))}catch(f){if(!Ii(f))throw f;$("LocalStore","Failed to update sequence numbers: "+f)}for(const f of l){const p=f.targetId;if(!f.fromCache){const g=h.os.get(p),b=g.snapshotVersion,T=g.withLastLimboFreeSnapshotVersion(b);h.os=h.os.insert(p,T)}}})(r.localStore,s))}async function Bk(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){$("SyncEngine","User change. New user:",e.toKey());const r=await yT(t.localStore,e);t.currentUser=e,(function(s,o){s.ka.forEach((a=>{a.forEach((c=>{c.reject(new K(M.CANCELLED,o))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await kr(t,r.hs)}}function qk(n,e){const t=J(n),r=t.Na.get(e);if(r&&r.va)return Ie().add(r.key);{let i=Ie();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function jk(n,e){const t=J(n),r=await $u(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&jd(t,e.targetId,i.wa),i}async function Gk(n,e){const t=J(n);return TT(t.localStore,e).then((r=>kr(t,r)))}async function Kk(n,e,t,r){const i=J(n),s=await(function(a,c){const l=J(a),h=J(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(f=>h.Mn(f,c).next((p=>p?l.localDocuments.getDocuments(f,p):O.resolve(null)))))})(i.localStore,e);s!==null?(t==="pending"?await vo(i.remoteStore):t==="acknowledged"||t==="rejected"?(ap(i,e,r||null),op(i,e),(function(a,c){J(J(a).mutationQueue).On(c)})(i.localStore,e)):re(),await kr(i,s)):$("SyncEngine","Cannot apply mutation batch with id: "+e)}async function $k(n,e){const t=J(n);if(Nl(t),up(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await Z_(t,r.toArray());t.Qa=!0,await Bd(t.remoteStore,!0);for(const s of i)kl(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach(((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then((()=>(so(t,o),no(t.localStore,o,!0)))),ro(t.remoteStore,o)})),await i,await Z_(t,r),(function(o){const a=J(o);a.Na.forEach(((c,l)=>{ro(a.remoteStore,l)})),a.La.pr(),a.Na=new Map,a.Oa=new qe(Z.comparator)})(t),t.Qa=!1,await Bd(t.remoteStore,!1)}}async function Z_(n,e,t){const r=J(n),i=[],s=[];for(const o of e){let a;const c=r.Ma.get(o);if(c&&c.length!==0){a=await to(r.localStore,Kt(c[0]));for(const l of c){const h=r.Fa.get(l),f=await jk(r,h);f.snapshot&&s.push(f.snapshot)}}else{const l=await ET(r.localStore,o);a=await to(r.localStore,l),await sp(r,UT(l),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function UT(n){return wE(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function zk(n){return(function(t){return J(J(t).persistence).Qi()})(J(n).localStore)}async function Hk(n,e,t,r){const i=J(n);if(i.Qa)return void $("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await TT(i.localStore,SE(s[0])),a=mc.createSynthesizedRemoteEventForCurrentChange(e,t==="current",tt.EMPTY_BYTE_STRING);await kr(i,o,a);break}case"rejected":await no(i.localStore,e,!0),so(i,e,r);break;default:re()}}async function Wk(n,e,t){const r=Nl(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){$("SyncEngine","Adding an already active target "+i);continue}const s=await ET(r.localStore,i),o=await to(r.localStore,s);await sp(r,UT(s),o.targetId,!1,o.resumeToken),kl(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await no(r.localStore,i,!1).then((()=>{ro(r.remoteStore,i),so(r,i)})).catch(yi)}}function Nl(n){const e=J(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=MT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=qk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=xk.bind(null,e),e.Ca.d_=wk.bind(null,e.eventManager),e.Ca.$a=Ak.bind(null,e.eventManager),e}function up(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Lk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Mk.bind(null,e),e}function Qk(n,e,t){const r=J(n);(async function(s,o,a){try{const c=await o.getMetadata();if(await(function(g,b){const T=J(g),P=dt(b.createTime);return T.persistence.runTransaction("hasNewerBundle","readonly",(k=>T.Gr.getBundleMetadata(k,b.id))).then((k=>!!k&&k.createTime.compareTo(P)>=0))})(s.localStore,c))return await o.close(),a._completeWith((function(g){return{taskState:"Success",documentsLoaded:g.totalDocuments,bytesLoaded:g.totalBytes,totalDocuments:g.totalDocuments,totalBytes:g.totalBytes}})(c)),Promise.resolve(new Set);a._updateProgress(NT(c));const l=new Rk(c,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const p=await l.la(h);p&&a._updateProgress(p),h=await o.Ua()}const f=await l.complete();return await kr(s,f.Ia,void 0),await(function(g,b){const T=J(g);return T.persistence.runTransaction("Save bundle","readwrite",(P=>T.Gr.saveBundleMetadata(P,b)))})(s.localStore,c),a._completeWith(f.progress),Promise.resolve(f.Pa)}catch(c){return mn("SyncEngine",`Loading bundle failed with ${c}`),a._failWith(c),Promise.resolve(new Set)}})(r,e,t).then((i=>{r.sharedClientState.notifyBundleLoaded(i)}))}class pi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=_c(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return _T(this.persistence,new gT,e.initialUser,this.serializer)}Ga(e){return new $f(Dl.Zr,this.serializer)}Wa(e){return new AT}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}pi.provider={build:()=>new pi};class Jk extends pi{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){se(this.persistence.referenceDelegate instanceof Ku);const r=this.persistence.referenceDelegate.garbageCollector;return new hT(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?Ut.withCacheSize(this.cacheSizeBytes):Ut.DEFAULT;return new $f((r=>Ku.Zr(r,t)),this.serializer)}}class lp extends pi{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await up(this.Ja.syncEngine),await vo(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return _T(this.persistence,new gT,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new hT(r,e.asyncQueue,t)}Ha(e,t){const r=new _C(t,this.persistence);return new gC(e.asyncQueue,r)}Ga(e){const t=Hf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Ut.withCacheSize(this.cacheSizeBytes):Ut.DEFAULT;return new zf(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,bT(),vu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new AT}}class BT extends lp{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Bh&&(this.sharedClientState.syncEngine={no:Kk.bind(null,t),ro:Hk.bind(null,t),io:Wk.bind(null,t),Qi:zk.bind(null,t),eo:Gk.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi((async r=>{await $k(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Wa(e){const t=bT();if(!Bh.D(t))throw new K(M.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Hf(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Bh(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class mi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>X_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Bk.bind(null,this.syncEngine),await Bd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Tk})()}createDatastore(e){const t=_c(e.databaseInfo.databaseId),r=(function(s){return new sk(s)})(e.databaseInfo);return(function(s,o,a,c){return new ck(s,o,a,c)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,o,a){return new lk(r,i,s,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>X_(this.syncEngine,t,0)),(function(){return z_.D()?new z_:new nk})())}createSyncEngine(e,t){return(function(i,s,o,a,c,l,h){const f=new Ck(i,s,o,a,c,l);return h&&(f.Qa=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=J(i);$("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Io(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}mi.provider={build:()=>new mi};function ey(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Vl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):lt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yk{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new bt,this.buffer=new Uint8Array,this.eu=(function(){return new TextDecoder("utf-8")})(),this.tu().then((r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new bk(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex((e=>e===123))}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xk{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new K(M.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=J(i),a={documents:s.map((f=>za(o.serializer,f)))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Ae.emptyPath(),a,s.length),l=new Map;c.forEach((f=>{const p=mD(o.serializer,f);l.set(p.key.toString(),p)}));const h=[];return s.forEach((f=>{const p=l.get(f.toString());se(!!p),h.push(p)})),h})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new yo(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const i=Z.fromPath(r);this.mutations.push(new xf(i,this.precondition(i)))})),await(async function(r,i){const s=J(r),o={writes:i.map((a=>Ha(s.serializer,a)))};await s.Mo("Commit",s.serializer.databaseId,Ae.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw re();t=ae.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new K(M.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ae.min())?Qe.exists(!1):Qe.updateTime(t):Qe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ae.min()))throw new K(M.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Qe.updateTime(t)}return Qe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class Zk{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new Jf(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const e=new Xk(this.datastore),t=this.cu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((i=>{this.lu(i)}))))})).catch((r=>{this.lu(r)}))}))}cu(e){try{const t=this.updateFunction(e);return!lc(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!qE(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eN{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=At.UNAUTHENTICATED,this.clientId=Sf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async o=>{$("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>($("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new bt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=To(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function jh(n,e){n.asyncQueue.verifyOperationInProgress(),$("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await yT(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function ty(n,e){n.asyncQueue.verifyOperationInProgress();const t=await hp(n);$("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>H_(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>H_(e.remoteStore,i))),n._onlineComponents=e}async function hp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$("FirestoreClient","Using user provided OfflineComponentProvider");try{await jh(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;mn("Error using user provided cache. Falling back to memory cache: "+t),await jh(n,new pi)}}else $("FirestoreClient","Using default OfflineComponentProvider"),await jh(n,new pi);return n._offlineComponents}async function Ol(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($("FirestoreClient","Using user provided OnlineComponentProvider"),await ty(n,n._uninitializedComponentsProvider._online)):($("FirestoreClient","Using default OnlineComponentProvider"),await ty(n,new mi))),n._onlineComponents}function qT(n){return hp(n).then((e=>e.persistence))}function wo(n){return hp(n).then((e=>e.localStore))}function jT(n){return Ol(n).then((e=>e.remoteStore))}function dp(n){return Ol(n).then((e=>e.syncEngine))}function GT(n){return Ol(n).then((e=>e.datastore))}async function oo(n){const e=await Ol(n),t=e.eventManager;return t.onListen=Dk.bind(null,e.syncEngine),t.onUnlisten=Nk.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=kk.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Vk.bind(null,e.syncEngine),t}function tN(n){return n.asyncQueue.enqueue((async()=>{const e=await qT(n),t=await jT(n);return e.setNetworkEnabled(!0),(function(i){const s=J(i);return s.L_.delete(0),yc(s)})(t)}))}function nN(n){return n.asyncQueue.enqueue((async()=>{const e=await qT(n),t=await jT(n);return e.setNetworkEnabled(!1),(async function(i){const s=J(i);s.L_.add(0),await Io(s),s.q_.set("Offline")})(t)}))}function rN(n,e){const t=new bt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await(function(l,h){const f=J(l);return f.persistence.runTransaction("read document","readonly",(p=>f.localDocuments.getDocument(p,h)))})(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new K(M.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const c=To(a,`Failed to get document '${s} from cache`);o.reject(c)}})(await wo(n),e,t))),t.promise}function KT(n,e,t={}){const r=new bt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new Vl({next:p=>{h.Za(),o.enqueueAndForget((()=>np(s,f)));const g=p.docs.has(a);!g&&p.fromCache?l.reject(new K(M.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&p.fromCache&&c&&c.source==="server"?l.reject(new K(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(p)},error:p=>l.reject(p)}),f=new ip(go(a.path),h,{includeMetadataChanges:!0,_a:!0});return tp(s,f)})(await oo(n),n.asyncQueue,e,t,r))),r.promise}function iN(n,e){const t=new bt;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await $u(i,s,!0),c=new xT(s,a.Ts),l=c.ma(a.documents),h=c.applyChanges(l,!1);o.resolve(h.snapshot)}catch(a){const c=To(a,`Failed to execute query '${s} against cache`);o.reject(c)}})(await wo(n),e,t))),t.promise}function $T(n,e,t={}){const r=new bt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new Vl({next:p=>{h.Za(),o.enqueueAndForget((()=>np(s,f))),p.fromCache&&c.source==="server"?l.reject(new K(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(p)},error:p=>l.reject(p)}),f=new ip(a,h,{includeMetadataChanges:!0,_a:!0});return tp(s,f)})(await oo(n),n.asyncQueue,e,t,r))),r.promise}function sN(n,e,t){const r=new bt;return n.asyncQueue.enqueueAndForget((async()=>{try{const i=await GT(n);r.resolve((async function(o,a,c){var l;const h=J(o),{request:f,ut:p,parent:g}=ZE(h.serializer,AE(a),c);h.connection.Fo||delete f.parent;const b=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,g,f,1)).filter((P=>!!P.result));se(b.length===1);const T=(l=b[0].result)===null||l===void 0?void 0:l.aggregateFields;return Object.keys(T).reduce(((P,k)=>(P[p[k]]=T[k],P)),{})})(i,e,t))}catch(i){r.reject(i)}})),r.promise}function oN(n,e){const t=new Vl(e);return n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.add(s),s.next()})(await oo(n),t))),()=>{t.Za(),n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.delete(s)})(await oo(n),t)))}}function aN(n,e,t,r){const i=(function(o,a){let c;return c=typeof o=="string"?GE().encode(o):o,(function(h,f){return new Yk(h,f)})((function(h,f){if(h instanceof Uint8Array)return ey(h,f);if(h instanceof ArrayBuffer)return ey(new Uint8Array(h),f);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),a)})(t,_c(e));n.asyncQueue.enqueueAndForget((async()=>{Qk(await dp(n),i,r)}))}function cN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){const s=J(r);return s.persistence.runTransaction("Get named query","readonly",(o=>s.Gr.getNamedQuery(o,i)))})(await wo(n),e)))}function uN(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,i){const s=J(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",(c=>o.getFieldIndexes(c).next((l=>(function(f,p,g,b,T){f=[...f],p=[...p],f.sort(g),p.sort(g);const P=f.length,k=p.length;let D=0,N=0;for(;D<k&&N<P;){const L=g(f[N],p[D]);L<0?T(f[N++]):L>0?b(p[D++]):(D++,N++)}for(;D<k;)b(p[D++]);for(;N<P;)T(f[N++])})(l,i,dC,(h=>{a.push(o.addFieldIndex(c,h))}),(h=>{a.push(o.deleteFieldIndex(c,h))})))).next((()=>O.waitFor(a)))))})(await wo(n),e)))}function lN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){J(r).ss.zi=i})(await wo(n),e)))}function hN(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=J(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(s=>i.deleteAllFieldIndexes(s)))})(await wo(n))))}/**
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
 */function zT(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fp(n,e,t){if(!t)throw new K(M.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function HT(n,e,t,r){if(e===!0&&r===!0)throw new K(M.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ry(n){if(!Z.isDocumentKey(n))throw new K(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function iy(n){if(Z.isDocumentKey(n))throw new K(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function xl(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":re()}function Ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xl(n);throw new K(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function WT(n,e){if(e<=0)throw new K(M.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}HT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ic{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sy({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sy(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Yv;switch(r.type){case"firstParty":return new aC(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=ny.get(t);r&&($("ComponentProvider","Removing Datastore"),ny.delete(t),r.terminate())})(this),Promise.resolve()}}function QT(n,e,t,r={}){var i;const s=(n=Ee(n,Ic))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&mn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=At.MOCK_USER;else{a=Mv(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new K(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new At(l)}n._authCredentials=new iC(new Jv(a,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new St(this.firestore,e,this._query)}}class st{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new st(this.firestore,e,this._key)}}class Cn extends St{constructor(e,t,r){super(e,t,go(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new st(this.firestore,null,new Z(e))}withConverter(e){return new Cn(this.firestore,e,this._path)}}function Ar(n,e,...t){if(n=oe(n),fp("collection","path",e),n instanceof Ic){const r=Ae.fromString(e,...t);return iy(r),new Cn(n,null,r)}{if(!(n instanceof st||n instanceof Cn))throw new K(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return iy(r),new Cn(n.firestore,null,r)}}function dN(n,e){if(n=Ee(n,Ic),fp("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new K(M.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new St(n,null,(function(r){return new Pr(Ae.emptyPath(),r)})(e))}function fn(n,e,...t){if(n=oe(n),arguments.length===1&&(e=Sf.newId()),fp("doc","path",e),n instanceof Ic){const r=Ae.fromString(e,...t);return ry(r),new st(n,null,new Z(r))}{if(!(n instanceof st||n instanceof Cn))throw new K(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return ry(r),new st(n.firestore,n instanceof Cn?n.converter:null,new Z(r))}}function fN(n,e){return n=oe(n),e=oe(e),(n instanceof st||n instanceof Cn)&&(e instanceof st||e instanceof Cn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function pp(n,e){return n=oe(n),e=oe(e),n instanceof St&&e instanceof St&&n.firestore===e.firestore&&dc(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Jf(this,"async_queue_retry"),this.Vu=()=>{const r=vu();r&&$("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=vu();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=vu();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new bt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ii(e))throw e;$("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const i=(function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a})(r);throw lt("INTERNAL UNHANDLED ERROR: ",i),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=ep.createAndSchedule(this,e,t,r,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&re()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Gd(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}class JT{constructor(){this._progressObserver={},this._taskCompletionResolver=new bt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pN=-1;class Me extends Ic{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new oy,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new oy(e),this._firestoreClient=void 0,await e}}}function mN(n,e,t){t||(t="(default)");const r=po(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(oi(s,e))return i;throw new K(M.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new K(M.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function YT(n,e){const t=typeof n=="object"?n:vl(),r=typeof n=="string"?n:e||"(default)",i=po(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Ov("firestore");s&&QT(i,...s)}return i}function Ye(n){if(n._terminated)throw new K(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||XT(n),n._firestoreClient}function XT(n){var e,t,r;const i=n._freezeSettings(),s=(function(a,c,l,h){return new UC(a,c,l,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,zT(h.experimentalLongPollingOptions),h.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new eN(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&(function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}})(n._componentsProvider))}function gN(n,e){mn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return ZT(n,mi.provider,{build:r=>new lp(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function _N(n){mn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();ZT(n,mi.provider,{build:t=>new BT(t,e.cacheSizeBytes)})}function ZT(n,e,t){if((n=Ee(n,Me))._firestoreClient||n._terminated)throw new K(M.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new K(M.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},XT(n)}function yN(n){if(n._initialized&&!n._terminated)throw new K(M.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new bt;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!Hn.D())return Promise.resolve();const i=r+"main";await Hn.delete(i)})(Hf(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function IN(n){return(function(t){const r=new bt;return t.asyncQueue.enqueueAndForget((async()=>Fk(await dp(t),r))),r.promise})(Ye(n=Ee(n,Me)))}function vN(n){return tN(Ye(n=Ee(n,Me)))}function EN(n){return nN(Ye(n=Ee(n,Me)))}function TN(n){return K0(n.app,"firestore",n._databaseId.database),n._delete()}function wN(n,e){const t=Ye(n=Ee(n,Me)),r=new JT;return aN(t,n._databaseId,e,r),r}function AN(n,e){return cN(Ye(n=Ee(n,Me)),e).then((t=>t?new St(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ao{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ew{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gi(tt.fromBase64String(e))}catch(t){throw new K(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new gi(tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function bN(){return new Ti("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return me(this._lat,e._lat)||me(this._long,e._long)}}/**
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
 */class vc{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RN=/^__.*__$/;class SN{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Dr(e,this.data,this.fieldMask,t,this.fieldTransforms):new _o(e,this.data,t,this.fieldTransforms)}}class tw{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Dr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function nw(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re()}}class Ml{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ml(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Qu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(nw(this.Cu)&&RN.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class PN{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||_c(e)}Qu(e,t,r,i=!1){return new Ml({Cu:e,methodName:t,qu:r,path:Ke.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function hs(n){const e=n._freezeSettings(),t=_c(n._databaseId);return new PN(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Fl(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);Ep("Data must be an object, but it was:",o,r);const a=sw(r,o);let c,l;if(s.merge)c=new tn(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const f of s.mergeFields){const p=Wa(e,f,t);if(!o.contains(p))throw new K(M.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);aw(h,p)||h.push(p)}c=new tn(h),l=o.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,l=o.fieldTransforms;return new SN(new Vt(a),c,l)}class Ec extends wi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ec}}function rw(n,e,t){return new Ml({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class mp extends wi{_toFieldTransform(e){return new pc(e.path,new Xs)}isEqual(e){return e instanceof mp}}class gp extends wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=rw(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new ns(r);return new pc(e.path,i)}isEqual(e){return e instanceof gp&&oi(this.Ku,e.Ku)}}class _p extends wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=rw(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new rs(r);return new pc(e.path,i)}isEqual(e){return e instanceof _p&&oi(this.Ku,e.Ku)}}class yp extends wi{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Zs(e.serializer,VE(e.serializer,this.$u));return new pc(e.path,t)}isEqual(e){return e instanceof yp&&this.$u===e.$u}}function Ip(n,e,t,r){const i=n.Qu(1,e,t);Ep("Data must be an object, but it was:",i,r);const s=[],o=Vt.empty();vi(r,((c,l)=>{const h=Ul(e,c,t);l=oe(l);const f=i.Nu(h);if(l instanceof Ec)s.push(h);else{const p=ds(l,f);p!=null&&(s.push(h),o.set(h,p))}}));const a=new tn(s);return new tw(o,a,i.fieldTransforms)}function vp(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[Wa(e,r,t)],c=[i];if(s.length%2!=0)throw new K(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)a.push(Wa(e,s[p])),c.push(s[p+1]);const l=[],h=Vt.empty();for(let p=a.length-1;p>=0;--p)if(!aw(l,a[p])){const g=a[p];let b=c[p];b=oe(b);const T=o.Nu(g);if(b instanceof Ec)l.push(g);else{const P=ds(b,T);P!=null&&(l.push(g),h.set(g,P))}}const f=new tn(l);return new tw(h,f,o.fieldTransforms)}function iw(n,e,t,r=!1){return ds(t,n.Qu(r?4:3,e))}function ds(n,e){if(ow(n=oe(n)))return Ep("Unsupported field value:",e,n),sw(n,e);if(n instanceof wi)return(function(r,i){if(!nw(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(r,i){const s=[];let o=0;for(const a of r){let c=ds(a,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=oe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return VE(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Je.fromDate(r);return{timestampValue:eo(i.serializer,s)}}if(r instanceof Je){const s=new Je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:eo(i.serializer,s)}}if(r instanceof Ll)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof gi)return{bytesValue:zE(i.serializer,r._byteString)};if(r instanceof st){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Bf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof vc)return(function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((c=>{if(typeof c!="number")throw a.Bu("VectorValues must only contain numeric values.");return Of(a.serializer,c)}))}}}}}})(r,i);throw i.Bu(`Unsupported field value: ${xl(r)}`)})(n,e)}function sw(n,e){const t={};return hE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vi(n,((r,i)=>{const s=ds(i,e.Mu(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function ow(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Je||n instanceof Ll||n instanceof gi||n instanceof st||n instanceof wi||n instanceof vc)}function Ep(n,e,t){if(!ow(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const r=xl(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Wa(n,e,t){if((e=oe(e))instanceof Ti)return e._internalPath;if(typeof e=="string")return Ul(n,e);throw Qu("Field path arguments must be of type string or ",n,!1,void 0,t)}const CN=new RegExp("[~\\*/\\[\\]]");function Ul(n,e,t){if(e.search(CN)>=0)throw Qu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ti(...e.split("."))._internalPath}catch{throw Qu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Qu(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new K(M.INVALID_ARGUMENT,a+n+c)}function aw(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new DN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Bl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class DN extends Qa{data(){return super.data()}}function Bl(n,e){return typeof e=="string"?Ul(n,e):e instanceof Ti?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Tp{}class Ao extends Tp{}function En(n,e,...t){let r=[];e instanceof Tp&&r.push(e),r=r.concat(t),(function(s){const o=s.filter((c=>c instanceof fs)).length,a=s.filter((c=>c instanceof bo)).length;if(o>1||o>0&&a>0)throw new K(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class bo extends Ao{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new bo(e,t,r)}_apply(e){const t=this._parse(e);return lw(e._query,t),new St(e.firestore,e.converter,kd(e._query,t))}_parse(e){const t=hs(e.firestore);return(function(s,o,a,c,l,h,f){let p;if(l.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new K(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){cy(f,h);const g=[];for(const b of f)g.push(ay(c,s,b));p={arrayValue:{values:g}}}else p=ay(c,s,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||cy(f,h),p=iw(a,o,f,h==="in"||h==="not-in");return be.create(l,h,p)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Un(n,e,t){const r=e,i=Bl("where",n);return bo._create(i,r,t)}class fs extends Tp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fs(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const a=s.getFlattenedFilters();for(const c of a)lw(o,c),o=kd(o,c)})(e._query,t),new St(e.firestore,e.converter,kd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function kN(...n){return n.forEach((e=>hw("or",e))),fs._create("or",n)}function NN(...n){return n.forEach((e=>hw("and",e))),fs._create("and",n)}class ql extends Ao{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ql(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new K(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new K(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new $a(s,o)})(e._query,this._field,this._direction);return new St(e.firestore,e.converter,(function(i,s){const o=i.explicitOrderBy.concat([s]);return new Pr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,t))}}function wp(n,e="asc"){const t=e,r=Bl("orderBy",n);return ql._create(r,t)}class Tc extends Ao{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){return new St(e.firestore,e.converter,Uu(e._query,this._limit,this._limitType))}}function cr(n){return WT("limit",n),Tc._create("limit",n,"F")}function VN(n){return WT("limitToLast",n),Tc._create("limitToLast",n,"L")}class wc extends Ao{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new wc(e,t,r)}_apply(e){const t=uw(e,this.type,this._docOrFields,this._inclusive);return new St(e.firestore,e.converter,(function(i,s){return new Pr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)})(e._query,t))}}function ON(...n){return wc._create("startAt",n,!0)}function xN(...n){return wc._create("startAfter",n,!1)}class Ac extends Ao{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ac(e,t,r)}_apply(e){const t=uw(e,this.type,this._docOrFields,this._inclusive);return new St(e.firestore,e.converter,(function(i,s){return new Pr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)})(e._query,t))}}function LN(...n){return Ac._create("endBefore",n,!1)}function MN(...n){return Ac._create("endAt",n,!0)}function uw(n,e,t,r){if(t[0]=oe(t[0]),t[0]instanceof Qa)return(function(s,o,a,c,l){if(!c)throw new K(M.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const f of Us(s))if(f.field.isKeyField())h.push(es(o,c.key));else{const p=c.data.field(f.field);if(Tl(p))throw new K(M.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const g=f.field.canonicalString();throw new K(M.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${g}' (used as the orderBy) does not exist.`)}h.push(p)}return new di(h,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=hs(n.firestore);return(function(o,a,c,l,h,f){const p=o.explicitOrderBy;if(h.length>p.length)throw new K(M.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const g=[];for(let b=0;b<h.length;b++){const T=h[b];if(p[b].field.isKeyField()){if(typeof T!="string")throw new K(M.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof T}`);if(!Nf(o)&&T.indexOf("/")!==-1)throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${T}' contains a slash.`);const P=o.path.child(Ae.fromString(T));if(!Z.isDocumentKey(P))throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const k=new Z(P);g.push(es(a,k))}else{const P=iw(c,l,T);g.push(P)}}return new di(g,f)})(n._query,n.firestore._databaseId,i,e,t,r)}}function ay(n,e,t){if(typeof(t=oe(t))=="string"){if(t==="")throw new K(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nf(e)&&t.indexOf("/")!==-1)throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ae.fromString(t));if(!Z.isDocumentKey(r))throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return es(n,new Z(r))}if(t instanceof st)return es(n,t._key);throw new K(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xl(t)}.`)}function cy(n,e){if(!Array.isArray(n)||n.length===0)throw new K(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function lw(n,e){const t=(function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new K(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function hw(n,e){if(!(e instanceof bo||e instanceof fs))throw new K(M.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Ap{convertValue(e,t="none"){switch(li(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(wr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw re()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return vi(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map((o=>We(o.doubleValue)));return new vc(s)}convertGeoPoint(e){return new Ll(We(e.latitude),We(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=wl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ja(e));default:return null}}convertTimestamp(e){const t=Tr(e);return new Je(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ae.fromString(e);se(rT(r));const i=new ui(r.get(1),r.get(3)),s=new Z(r.popFirst(5));return i.isEqual(t)||lt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class FN extends Ap{constructor(e){super(),this.firestore=e}convertBytes(e){return new gi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}/**
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
 */function UN(n){return new ao("sum",Wa("sum",n))}function BN(n){return new ao("avg",Wa("average",n))}function dw(){return new ao("count")}function qN(n,e){var t,r;return n instanceof ao&&e instanceof ao&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function jN(n,e){return pp(n.query,e.query)&&oi(n.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class as extends Qa{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ba(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Bl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ba extends as{data(e={}){return super.data(e)}}class cs{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Zr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ba(this._firestore,this._userDataWriter,r.key,r,new Zr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((a=>{const c=new ba(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Zr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((a=>s||a.type!==3)).map((a=>{const c=new ba(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Zr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,h=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:GN(a.type),doc:c,oldIndex:l,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function GN(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re()}}function KN(n,e){return n instanceof as&&e instanceof as?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof cs&&e instanceof cs&&n._firestore===e._firestore&&pp(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return KT(Ye(e),n._key).then((t=>Rp(e,n,t)))}class Ai extends Ap{constructor(e){super(),this.firestore=e}convertBytes(e){return new gi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}function $N(n){n=Ee(n,st);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return rN(t,n._key).then((i=>new as(e,r,n._key,i,new Zr(i!==null&&i.hasLocalMutations,!0),n.converter)))}function zN(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return KT(Ye(e),n._key,{source:"server"}).then((t=>Rp(e,n,t)))}function Sn(n){n=Ee(n,St);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return cw(n._query),$T(t,n._query).then((i=>new cs(e,r,n,i)))}function HN(n){n=Ee(n,St);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return iN(t,n._query).then((i=>new cs(e,r,n,i)))}function WN(n){n=Ee(n,St);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return $T(t,n._query,{source:"server"}).then((i=>new cs(e,r,n,i)))}function fw(n,e,t){n=Ee(n,st);const r=Ee(n.firestore,Me),i=jl(n.converter,e,t);return Ro(r,[Fl(hs(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Qe.none())])}function bc(n,e,t,...r){n=Ee(n,st);const i=Ee(n.firestore,Me),s=hs(i);let o;return o=typeof(e=oe(e))=="string"||e instanceof Ti?vp(s,"updateDoc",n._key,e,t,r):Ip(s,"updateDoc",n._key,e),Ro(i,[o.toMutation(n._key,Qe.exists(!0))])}function pw(n){return Ro(Ee(n.firestore,Me),[new yo(n._key,Qe.none())])}function mw(n,e){const t=Ee(n.firestore,Me),r=fn(n),i=jl(n.converter,e);return Ro(t,[Fl(hs(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Qe.exists(!1))]).then((()=>r))}function bp(n,...e){var t,r,i;n=oe(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Gd(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Gd(e[o])){const f=e[o];e[o]=(t=f.next)===null||t===void 0?void 0:t.bind(f),e[o+1]=(r=f.error)===null||r===void 0?void 0:r.bind(f),e[o+2]=(i=f.complete)===null||i===void 0?void 0:i.bind(f)}let c,l,h;if(n instanceof st)l=Ee(n.firestore,Me),h=go(n._key.path),c={next:f=>{e[o]&&e[o](Rp(l,n,f))},error:e[o+1],complete:e[o+2]};else{const f=Ee(n,St);l=Ee(f.firestore,Me),h=f._query;const p=new Ai(l);c={next:g=>{e[o]&&e[o](new cs(l,p,f,g))},error:e[o+1],complete:e[o+2]},cw(n._query)}return(function(p,g,b,T){const P=new Vl(T),k=new ip(g,P,b);return p.asyncQueue.enqueueAndForget((async()=>tp(await oo(p),k))),()=>{P.Za(),p.asyncQueue.enqueueAndForget((async()=>np(await oo(p),k)))}})(Ye(l),h,a,c)}function QN(n,e){return oN(Ye(n=Ee(n,Me)),Gd(e)?e:{next:e})}function Ro(n,e){return(function(r,i){const s=new bt;return r.asyncQueue.enqueueAndForget((async()=>Ok(await dp(r),i,s))),s.promise})(Ye(n),e)}function Rp(n,e,t){const r=t.docs.get(e._key),i=new Ai(n);return new as(n,i,e._key,r,new Zr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function JN(n){return gw(n,{count:dw()})}function gw(n,e){const t=Ee(n.firestore,Me),r=Ye(t),i=lE(e,((s,o)=>new BE(o,s.aggregateType,s._internalFieldPath)));return sN(r,n._query,i).then((s=>(function(a,c,l){const h=new Ai(a);return new ew(c,h,l)})(t,n,s)))}class YN{constructor(e){this.kind="memory",this._onlineComponentProvider=mi.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=pi.provider}toJSON(){return{kind:this.kind}}}class XN{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=_w(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class ZN{constructor(){this.kind="memoryEager",this._offlineComponentProvider=pi.provider}toJSON(){return{kind:this.kind}}}class eV{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Jk(e)}}toJSON(){return{kind:this.kind}}}function tV(){return new ZN}function nV(n){return new eV(n==null?void 0:n.cacheSizeBytes)}function rV(n){return new YN(n)}function iV(n){return new XN(n)}class sV{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mi.provider,this._offlineComponentProvider={build:t=>new lp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class oV{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mi.provider,this._offlineComponentProvider={build:t=>new BT(t,e==null?void 0:e.cacheSizeBytes)}}}function _w(n){return new sV(n==null?void 0:n.forceOwnership)}function aV(){return new oV}/**
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
 */const cV={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=hs(e)}set(e,t,r){this._verifyNotCommitted();const i=Jr(e,this._firestore),s=jl(i.converter,t,r),o=Fl(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Qe.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Jr(e,this._firestore);let o;return o=typeof(t=oe(t))=="string"||t instanceof Ti?vp(this._dataReader,"WriteBatch.update",s._key,t,r,i):Ip(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Qe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Jr(e,this._firestore);return this._mutations=this._mutations.concat(new yo(t._key,Qe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new K(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Jr(n,e){if((n=oe(n)).firestore!==e)throw new K(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Iw extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=hs(t)}get(t){const r=Jr(t,this._firestore),i=new FN(this._firestore);return this._transaction.lookup([r._key]).then((s=>{if(!s||s.length!==1)return re();const o=s[0];if(o.isFoundDocument())return new Qa(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new Qa(this._firestore,i,r._key,null,r.converter);throw re()}))}set(t,r,i){const s=Jr(t,this._firestore),o=jl(s.converter,r,i),a=Fl(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=Jr(t,this._firestore);let a;return a=typeof(r=oe(r))=="string"||r instanceof Ti?vp(this._dataReader,"Transaction.update",o._key,r,i,s):Ip(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=Jr(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Jr(e,this._firestore),r=new Ai(this._firestore);return super.get(e).then((i=>new as(this._firestore,r,t._key,i._document,new Zr(!1,!1),t.converter)))}}function uV(n,e,t){n=Ee(n,Me);const r=Object.assign(Object.assign({},cV),t);return(function(s){if(s.maxAttempts<1)throw new K(M.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(s,o,a){const c=new bt;return s.asyncQueue.enqueueAndForget((async()=>{const l=await GT(s);new Zk(s.asyncQueue,l,a,o,c).au()})),c.promise})(Ye(n),(i=>e(new Iw(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lV(){return new Ec("deleteField")}function hV(){return new mp("serverTimestamp")}function dV(...n){return new gp("arrayUnion",n)}function fV(...n){return new _p("arrayRemove",n)}function pV(n){return new yp("increment",n)}function mV(n){return new vc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gV(n){return Ye(n=Ee(n,Me)),new yw(n,(e=>Ro(n,e)))}/**
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
 */function _V(n,e){const t=Ye(n=Ee(n,Me));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return mn("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(s){const o=typeof s=="string"?(function(l){try{return JSON.parse(l)}catch(h){throw new K(M.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}})(s):s,a=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const l=uy(c,"collectionGroup"),h=[];if(Array.isArray(c.fields))for(const f of c.fields){const p=Ul("setIndexConfiguration",uy(f,"fieldPath"));f.arrayConfig==="CONTAINS"?h.push(new Ji(p,2)):f.order==="ASCENDING"?h.push(new Ji(p,0)):f.order==="DESCENDING"&&h.push(new Ji(p,1))}a.push(new Ws(Ws.UNKNOWN_ID,l,h,Qs.empty()))}return a})(e);return uN(t,r)}function uy(n,e){if(typeof n[e]!="string")throw new K(M.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class vw{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function yV(n){var e;n=Ee(n,Me);const t=ly.get(n);if(t)return t;if(((e=Ye(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new vw(n);return ly.set(n,r),r}function IV(n){Ew(n,!0)}function vV(n){Ew(n,!1)}function EV(n){hN(Ye(n._firestore)).then((e=>$("deleting all persistent cache indexes succeeded"))).catch((e=>mn("deleting all persistent cache indexes failed",e)))}function Ew(n,e){lN(Ye(n._firestore),e).then((t=>$(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((t=>mn(`setting persistent cache index auto creation isEnabled=${e} failed`,t)))}const ly=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TV(n){var e;const t=(e=Ye(Ee(n.firestore,Me))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:Sl(t,Kt(n._query))._t}function wV(n,e){var t;const r=lE(e,((s,o)=>new BE(o,s.aggregateType,s._internalFieldPath))),i=(t=Ye(Ee(n.firestore,Me))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:ZE(i,AE(n._query),r,!0).request}/**
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
 */class AV{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Sp.instance.onExistenceFilterMismatch(e)}}class Sp{constructor(){this.Uu=new Map}static get instance(){return iu||(iu=new Sp,(function(t){if(Bu)throw new Error("a TestingHooksSpi instance is already set");Bu=t})(iu)),iu}et(e){this.Uu.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let iu=null;(function(e,t=!0){(function(i){mo=i})(ls),Zi(new ai("firestore",((r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Me(new sC(r.getProvider("auth-internal")),new cC(r.getProvider("app-check-internal")),(function(l,h){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new K(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ui(l.options.projectId,h)})(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a}),"PUBLIC").setMultipleInstances(!0)),zn(Zg,"4.7.3",e),zn(Zg,"4.7.3","esm2017")})();const bV=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Ap,AggregateField:ao,AggregateQuerySnapshot:ew,Bytes:gi,CACHE_SIZE_UNLIMITED:pN,CollectionReference:Cn,DocumentReference:st,DocumentSnapshot:as,FieldPath:Ti,FieldValue:wi,Firestore:Me,FirestoreError:K,GeoPoint:Ll,LoadBundleTask:JT,PersistentCacheIndexManager:vw,Query:St,QueryCompositeFilterConstraint:fs,QueryConstraint:Ao,QueryDocumentSnapshot:ba,QueryEndAtConstraint:Ac,QueryFieldFilterConstraint:bo,QueryLimitConstraint:Tc,QueryOrderByConstraint:ql,QuerySnapshot:cs,QueryStartAtConstraint:wc,SnapshotMetadata:Zr,Timestamp:Je,Transaction:Iw,VectorValue:vc,WriteBatch:yw,_AutoId:Sf,_ByteString:tt,_DatabaseId:ui,_DocumentKey:Z,_EmptyAppCheckTokenProvider:uC,_EmptyAuthCredentialsProvider:Yv,_FieldPath:Ke,_TestingHooks:AV,_cast:Ee,_debugAssert:rC,_internalAggregationQueryToProtoRunAggregationQueryRequest:wV,_internalQueryToProtoQueryTarget:TV,_isBase64Available:MC,_logWarn:mn,_validateIsNotUsedTogether:HT,addDoc:mw,aggregateFieldEqual:qN,aggregateQuerySnapshotEqual:jN,and:NN,arrayRemove:fV,arrayUnion:dV,average:BN,clearIndexedDbPersistence:yN,collection:Ar,collectionGroup:dN,connectFirestoreEmulator:QT,count:dw,deleteAllPersistentCacheIndexes:EV,deleteDoc:pw,deleteField:lV,disableNetwork:EN,disablePersistentCacheIndexAutoCreation:vV,doc:fn,documentId:bN,enableIndexedDbPersistence:gN,enableMultiTabIndexedDbPersistence:_N,enableNetwork:vN,enablePersistentCacheIndexAutoCreation:IV,endAt:MN,endBefore:LN,ensureFirestoreConfigured:Ye,executeWrite:Ro,getAggregateFromServer:gw,getCountFromServer:JN,getDoc:Ja,getDocFromCache:$N,getDocFromServer:zN,getDocs:Sn,getDocsFromCache:HN,getDocsFromServer:WN,getFirestore:YT,getPersistentCacheIndexManager:yV,increment:pV,initializeFirestore:mN,limit:cr,limitToLast:VN,loadBundle:wN,memoryEagerGarbageCollector:tV,memoryLocalCache:rV,memoryLruGarbageCollector:nV,namedQuery:AN,onSnapshot:bp,onSnapshotsInSync:QN,or:kN,orderBy:wp,persistentLocalCache:iV,persistentMultipleTabManager:aV,persistentSingleTabManager:_w,query:En,queryEqual:pp,refEqual:fN,runTransaction:uV,serverTimestamp:hV,setDoc:fw,setIndexConfiguration:_V,setLogLevel:nC,snapshotEqual:KN,startAfter:xN,startAt:ON,sum:UN,terminate:TN,updateDoc:bc,vector:mV,waitForPendingWrites:IN,where:Un,writeBatch:gV},Symbol.toStringTag,{value:"Module"}));var RV="firebase",SV="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zn(RV,SV,"app");function Pp(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}/**
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
 */const PV={PHONE:"phone",TOTP:"totp"},CV={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},DV={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},kV={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},NV={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VV(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function Tw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const OV=VV,ww=Tw,Aw=new uc("auth","Firebase",Tw()),xV={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju=new wf("@firebase/auth");function LV(n,...e){Ju.logLevel<=we.WARN&&Ju.warn(`Auth (${ls}): ${n}`,...e)}function Eu(n,...e){Ju.logLevel<=we.ERROR&&Ju.error(`Auth (${ls}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(n,...e){throw Dp(n,...e)}function Xt(n,...e){return Dp(n,...e)}function Cp(n,e,t){const r=Object.assign(Object.assign({},ww()),{[e]:t});return new uc("auth","Firebase",r).create(e,{appName:n.name})}function Rt(n){return Cp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function So(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&rn(n,"argument-error"),Cp(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Dp(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Aw.create(n,...e)}function W(n,e,...t){if(!n)throw Dp(e,...t)}function Gn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Eu(e),new Error(e)}function br(n,e){n||Gn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function kp(){return hy()==="http:"||hy()==="https:"}function hy(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(kp()||MP()||"connection"in navigator)?navigator.onLine:!0}function FV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e,t){this.shortDelay=e,this.longDelay=t,br(t>e,"Short delay should be less than long delay!"),this.isMobile=OP()||FP()}get(){return MV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n,e){br(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Gn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Gn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Gn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BV=new Rc(3e4,6e4);function ze(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function He(n,e,t,r,i={}){return Rw(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=fo(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l=Object.assign({method:e,headers:c},s);return LP()||(l.referrerPolicy="no-referrer"),bw.fetch()(Sw(n,n.config.apiHost,t,a),l)})}async function Rw(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},UV),e);try{const i=new jV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw ha(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ha(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ha(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw ha(n,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Cp(n,h,l);rn(n,h)}}catch(i){if(i instanceof Yn)throw i;rn(n,"network-request-failed",{message:String(i)})}}async function Nr(n,e,t,r,i={}){const s=await He(n,e,t,r,i);return"mfaPendingCredential"in s&&rn(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Sw(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Np(n.config,i):`${n.config.apiScheme}://${i}`}function qV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class jV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Xt(this.auth,"network-request-failed")),BV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ha(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Xt(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dy(n){return n!==void 0&&n.getResponse!==void 0}function fy(n){return n!==void 0&&n.enterprise!==void 0}class Pw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return qV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GV(n){return(await He(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Cw(n,e){return He(n,"GET","/v2/recaptchaConfig",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KV(n,e){return He(n,"POST","/v1/accounts:delete",e)}async function $V(n,e){return He(n,"POST","/v1/accounts:update",e)}async function Dw(n,e){return He(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zV(n,e=!1){return oe(n).getIdToken(e)}async function kw(n,e=!1){const t=oe(n),r=await t.getIdToken(e),i=Gl(r);W(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ra(Gh(i.auth_time)),issuedAtTime:Ra(Gh(i.iat)),expirationTime:Ra(Gh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Gh(n){return Number(n)*1e3}function Gl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Eu("JWT malformed, contained fewer than 3 sections"),null;try{const i=Nv(t);return i?JSON.parse(i):(Eu("Failed to decode base64 JWT payload"),null)}catch(i){return Eu("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function py(n){const e=Gl(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Yn&&HV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function HV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ra(this.lastLoginAt),this.creationTime=Ra(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Xa(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Rr(n,Dw(t,{idToken:r}));W(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Vw(s.providerUserInfo):[],a=QV(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Kd(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Nw(n){const e=oe(n);await Xa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function QV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Vw(n){return n.map(e=>{var{providerId:t}=e,r=Pp(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JV(n,e){const t=await Rw(n,{},async()=>{const r=fo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Sw(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",bw.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function YV(n,e){return He(n,"POST","/v2/accounts:revokeToken",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):py(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=py(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await JV(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new qs;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(W(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(W(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qs,this.toJSON())}_performRefresh(){return Gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class fr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Pp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new WV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Kd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Rr(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return kw(this,e)}reload(){return Nw(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new fr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Xa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ht(this.auth.app))return Promise.reject(Rt(this.auth));const e=await this.getIdToken();return await Rr(this,KV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,h;const f=(r=t.displayName)!==null&&r!==void 0?r:void 0,p=(i=t.email)!==null&&i!==void 0?i:void 0,g=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,T=(a=t.tenantId)!==null&&a!==void 0?a:void 0,P=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,k=(l=t.createdAt)!==null&&l!==void 0?l:void 0,D=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:N,emailVerified:L,isAnonymous:H,providerData:j,stsTokenManager:E}=t;W(N&&E,e,"internal-error");const _=qs.fromJSON(this.name,E);W(typeof N=="string",e,"internal-error"),jr(f,e.name),jr(p,e.name),W(typeof L=="boolean",e,"internal-error"),W(typeof H=="boolean",e,"internal-error"),jr(g,e.name),jr(b,e.name),jr(T,e.name),jr(P,e.name),jr(k,e.name),jr(D,e.name);const y=new fr({uid:N,auth:e,email:p,emailVerified:L,displayName:f,isAnonymous:H,photoURL:b,phoneNumber:g,tenantId:T,stsTokenManager:_,createdAt:k,lastLoginAt:D});return j&&Array.isArray(j)&&(y.providerData=j.map(v=>Object.assign({},v))),P&&(y._redirectEventId=P),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new qs;i.updateFromServerResponse(t);const s=new fr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Xa(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];W(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Vw(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new qs;a.updateFromIdToken(r);const c=new fr({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Kd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=new Map;function pr(n){br(n instanceof Function,"Expected a class definition");let e=my.get(n);return e?(br(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,my.set(n,e),e)}/**
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
 */class Ow{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ow.type="NONE";const $d=Ow;/**
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
 */function Tu(n,e,t){return`firebase:${n}:${e}:${t}`}class js{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Tu(this.userKey,i.apiKey,s),this.fullPersistenceKey=Tu("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?fr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new js(pr($d),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||pr($d);const o=Tu(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){const f=fr._fromJSON(e,h);l!==s&&(a=f),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new js(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new js(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gy(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bw(e))return"Blackberry";if(qw(e))return"Webos";if(Lw(e))return"Safari";if((e.includes("chrome/")||Mw(e))&&!e.includes("edge/"))return"Chrome";if(Uw(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function xw(n=Et()){return/firefox\//i.test(n)}function Lw(n=Et()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mw(n=Et()){return/crios\//i.test(n)}function Fw(n=Et()){return/iemobile/i.test(n)}function Uw(n=Et()){return/android/i.test(n)}function Bw(n=Et()){return/blackberry/i.test(n)}function qw(n=Et()){return/webos/i.test(n)}function Vp(n=Et()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function XV(n=Et()){var e;return Vp(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ZV(){return UP()&&document.documentMode===10}function jw(n=Et()){return Vp(n)||Uw(n)||qw(n)||Bw(n)||/windows phone/i.test(n)||Fw(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gw(n,e=[]){let t;switch(n){case"Browser":t=gy(Et());break;case"Worker":t=`${gy(Et())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ls}/${r}`}/**
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
 */class eO{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function tO(n,e={}){return He(n,"GET","/v2/passwordPolicy",ze(n,e))}/**
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
 */const nO=6;class rO{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:nO,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iO{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _y(this),this.idTokenSubscription=new _y(this),this.beforeStateQueue=new eO(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Aw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await js.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Dw(this,{idToken:e}),r=await fr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ht(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ht(this.app))return Promise.reject(Rt(this));const t=e?oe(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ht(this.app)?Promise.reject(Rt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ht(this.app)?Promise.reject(Rt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await tO(this),t=new rO(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new uc("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await YV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pr(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await js.create(this,[pr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&LV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function at(n){return oe(n)}class _y{constructor(e){this.auth=e,this.observer=null,this.addObserver=$P(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sO(n){Sc=n}function Op(n){return Sc.loadJS(n)}function oO(){return Sc.recaptchaV2Script}function aO(){return Sc.recaptchaEnterpriseScript}function cO(){return Sc.gapiScript}function Kw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const uO="recaptcha-enterprise",lO="NO_RECAPTCHA";class $w{constructor(e){this.type=uO,this.auth=at(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Cw(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Pw(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;fy(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(lO)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&fy(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=aO();c.length!==0&&(c+=a),Op(c).then(()=>{i(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function yy(n,e,t,r=!1){const i=new $w(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Za(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await yy(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await yy(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}async function hO(n){const e=at(n),t=await Cw(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Pw(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new $w(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zw(n,e){const t=po(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(oi(s,e??{}))return i;rn(i,"already-initialized")}return t.initialize({options:e})}function dO(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(pr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Hw(n,e,t){const r=at(n);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=Ww(e),{host:o,port:a}=fO(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||pO()}function Ww(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function fO(n){const e=Ww(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Iy(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Iy(o)}}}function Iy(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function pO(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Gn("not implemented")}_getIdTokenResponse(e){return Gn("not implemented")}_linkToIdToken(e,t){return Gn("not implemented")}_getReauthenticationResolver(e){return Gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qw(n,e){return He(n,"POST","/v1/accounts:resetPassword",ze(n,e))}async function mO(n,e){return He(n,"POST","/v1/accounts:update",e)}async function gO(n,e){return He(n,"POST","/v1/accounts:signUp",e)}async function _O(n,e){return He(n,"POST","/v1/accounts:update",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yO(n,e){return Nr(n,"POST","/v1/accounts:signInWithPassword",ze(n,e))}async function Kl(n,e){return He(n,"POST","/v1/accounts:sendOobCode",ze(n,e))}async function IO(n,e){return Kl(n,e)}async function vO(n,e){return Kl(n,e)}async function EO(n,e){return Kl(n,e)}async function TO(n,e){return Kl(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wO(n,e){return Nr(n,"POST","/v1/accounts:signInWithEmailLink",ze(n,e))}async function AO(n,e){return Nr(n,"POST","/v1/accounts:signInWithEmailLink",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends Po{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new co(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new co(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,t,"signInWithPassword",yO);case"emailLink":return wO(e,{email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,r,"signUpPassword",gO);case"emailLink":return AO(e,{idToken:t,email:this._email,oobCode:this._password});default:rn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _r(n,e){return Nr(n,"POST","/v1/accounts:signInWithIdp",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bO="http://localhost";class Jn extends Po{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Jn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):rn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Pp(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Jn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return _r(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_r(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_r(e,t)}buildRequest(){const e={requestUri:bO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fo(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RO(n,e){return He(n,"POST","/v1/accounts:sendVerificationCode",ze(n,e))}async function SO(n,e){return Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,e))}async function PO(n,e){const t=await Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,e));if(t.temporaryProof)throw ha(n,"account-exists-with-different-credential",t);return t}const CO={USER_NOT_FOUND:"user-not-found"};async function DO(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,t),CO)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni extends Po{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ni({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ni({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return SO(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return PO(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return DO(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new ni({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kO(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function NO(n){const e=sa(oa(n)).link,t=e?sa(oa(e)).deep_link_id:null,r=sa(oa(n)).deep_link_id;return(r?sa(oa(r)).link:null)||r||t||e||n}class Co{constructor(e){var t,r,i,s,o,a;const c=sa(oa(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(r=c.oobCode)!==null&&r!==void 0?r:null,f=kO((i=c.mode)!==null&&i!==void 0?i:null);W(l&&h&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=h,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=NO(e);try{return new Co(t)}catch{return null}}}function VO(n){return Co.parseLink(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.providerId=bi.PROVIDER_ID}static credential(e,t){return co._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Co.parseLink(t);return W(r,"argument-error"),co._fromEmailAndCode(e,r.code,r.tenantId)}}bi.PROVIDER_ID="password";bi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";bi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Do extends Vr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Sa extends Do{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return W("providerId"in t&&"signInMethod"in t,"argument-error"),Jn._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return W(e.idToken||e.accessToken,"argument-error"),Jn._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Sa.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Sa.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:a}=e;if(!r&&!i&&!t&&!s||!a)return null;try{return new Sa(a)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends Do{constructor(){super("facebook.com")}static credential(e){return Jn._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ur.credential(e.oauthAccessToken)}catch{return null}}}ur.FACEBOOK_SIGN_IN_METHOD="facebook.com";ur.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Do{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Jn._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Bn.credential(t,r)}catch{return null}}}Bn.GOOGLE_SIGN_IN_METHOD="google.com";Bn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends Do{constructor(){super("github.com")}static credential(e){return Jn._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lr.credential(e.oauthAccessToken)}catch{return null}}}lr.GITHUB_SIGN_IN_METHOD="github.com";lr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OO="http://localhost";class ec extends Po{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return _r(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_r(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_r(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new ec(r,s)}static _create(e,t){return new ec(e,t)}buildRequest(){return{requestUri:OO,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xO="saml.";class Yu extends Vr{constructor(e){W(e.startsWith(xO),"argument-error"),super(e)}static credentialFromResult(e){return Yu.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Yu.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=ec.fromJSON(e);return W(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return ec._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends Do{constructor(){super("twitter.com")}static credential(e,t){return Jn._fromParams({providerId:hr.PROVIDER_ID,signInMethod:hr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return hr.credentialFromTaggedObject(e)}static credentialFromError(e){return hr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return hr.credential(t,r)}catch{return null}}}hr.TWITTER_SIGN_IN_METHOD="twitter.com";hr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jw(n,e){return Nr(n,"POST","/v1/accounts:signUp",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await fr._fromIdTokenResponse(e,r,i),o=vy(r);return new An({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=vy(r);return new An({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function vy(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LO(n){var e;if(ht(n.app))return Promise.reject(Rt(n));const t=at(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new An({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Jw(t,{returnSecureToken:!0}),i=await An._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu extends Yn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Xu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Xu(e,t,r,i)}}function Yw(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Xu._fromErrorAndOperation(n,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xw(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function MO(n,e){const t=oe(n);await $l(!0,t,e);const{providerUserInfo:r}=await $V(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=Xw(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function xp(n,e,t=!1){const r=await Rr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return An._forOperation(n,"link",r)}async function $l(n,e,t){await Xa(e);const r=Xw(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";W(r.has(t)===n,e.auth,i)}/**
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
 */async function Zw(n,e,t=!1){const{auth:r}=n;if(ht(r.app))return Promise.reject(Rt(r));const i="reauthenticate";try{const s=await Rr(n,Yw(r,i,e,n),t);W(s.idToken,r,"internal-error");const o=Gl(s.idToken);W(o,r,"internal-error");const{sub:a}=o;return W(n.uid===a,r,"user-mismatch"),An._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&rn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eA(n,e,t=!1){if(ht(n.app))return Promise.reject(Rt(n));const r="signIn",i=await Yw(n,r,e),s=await An._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function zl(n,e){return eA(at(n),e)}async function tA(n,e){const t=oe(n);return await $l(!1,t,e.providerId),xp(t,e)}async function nA(n,e){return Zw(oe(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FO(n,e){return Nr(n,"POST","/v1/accounts:signInWithCustomToken",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UO(n,e){if(ht(n.app))return Promise.reject(Rt(n));const t=at(n),r=await FO(t,{token:e,returnSecureToken:!0}),i=await An._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Lp._fromServerResponse(e,t):"totpInfo"in t?Mp._fromServerResponse(e,t):rn(e,"internal-error")}}class Lp extends Pc{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Lp(t)}}class Mp extends Pc{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Mp(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n,e,t){var r;W(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),W(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(W(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(W(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fp(n){const e=at(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function BO(n,e,t){const r=at(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Hl(r,i,t),await Za(r,i,"getOobCode",vO)}async function qO(n,e,t){await Qw(oe(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Fp(n),r})}async function jO(n,e){await _O(oe(n),{oobCode:e})}async function rA(n,e){const t=oe(n),r=await Qw(t,{oobCode:e}),i=r.requestType;switch(W(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":W(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":W(r.mfaInfo,t,"internal-error");default:W(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=Pc._fromServerResponse(at(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function GO(n,e){const{data:t}=await rA(oe(n),e);return t.email}async function iA(n,e,t){if(ht(n.app))return Promise.reject(Rt(n));const r=at(n),o=await Za(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Jw).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Fp(n),c}),a=await An._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function da(n,e,t){return ht(n.app)?Promise.reject(Rt(n)):zl(oe(n),bi.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Fp(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KO(n,e,t){const r=at(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,a){W(a.handleCodeInApp,r,"argument-error"),a&&Hl(r,o,a)}s(i,t),await Za(r,i,"getOobCode",EO)}function $O(n,e){const t=Co.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function zO(n,e,t){if(ht(n.app))return Promise.reject(Rt(n));const r=oe(n),i=bi.credentialWithLink(e,t||Ya());return W(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),zl(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HO(n,e){return He(n,"POST","/v1/accounts:createAuthUri",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WO(n,e){const t=kp()?Ya():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await HO(oe(n),r);return i||[]}async function QO(n,e){const t=oe(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Hl(t.auth,i,e);const{email:s}=await IO(t.auth,i);s!==n.email&&await n.reload()}async function JO(n,e,t){const r=oe(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Hl(r.auth,s,t);const{email:o}=await TO(r.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YO(n,e){return He(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XO(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=oe(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Rr(r,YO(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function ZO(n,e){const t=oe(n);return ht(t.auth.app)?Promise.reject(Rt(t.auth)):sA(t,e,null)}function ex(n,e){return sA(oe(n),null,e)}async function sA(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await Rr(n,mO(r,s));await n._updateTokensIfNecessary(o,!0)}/**
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
 */function tx(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const o=(t=(e=Gl(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Gs(s,a)}}if(!r)return null;switch(r){case"facebook.com":return new nx(s,i);case"github.com":return new rx(s,i);case"google.com":return new ix(s,i);case"twitter.com":return new sx(s,i,n.screenName||null);case"custom":case"anonymous":return new Gs(s,null);default:return new Gs(s,r,i)}}class Gs{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class oA extends Gs{constructor(e,t,r,i){super(e,t,r),this.username=i}}class nx extends Gs{constructor(e,t){super(e,"facebook.com",t)}}class rx extends oA{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class ix extends Gs{constructor(e,t){super(e,"google.com",t)}}class sx extends oA{constructor(e,t,r){super(e,"twitter.com",t,r)}}function ox(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:tx(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(n,e){return oe(n).setPersistence(e)}function ax(n){return hO(n)}async function cx(n,e){return at(n).validatePassword(e)}function aA(n,e,t,r){return oe(n).onIdTokenChanged(e,t,r)}function cA(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function uA(n,e,t,r){return oe(n).onAuthStateChanged(e,t,r)}function ux(n){oe(n).useDeviceLanguage()}function lx(n,e){return oe(n).updateCurrentUser(e)}function Up(n){return oe(n).signOut()}function hx(n,e){return at(n).revokeAccessToken(e)}async function dx(n){return oe(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new Ki("enroll",e,t)}static _fromMfaPendingCredential(e){return new Ki("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var t,r;if(e!=null&&e.multiFactorSession){if(!((t=e.multiFactorSession)===null||t===void 0)&&t.pendingCredential)return Ki._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return Ki._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=at(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(a=>Pc._fromServerResponse(r,a));W(i.mfaPendingCredential,r,"internal-error");const o=Ki._fromMfaPendingCredential(i.mfaPendingCredential);return new Bp(o,s,async a=>{const c=await a._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const l=Object.assign(Object.assign({},i),{idToken:c.idToken,refreshToken:c.refreshToken});switch(t.operationType){case"signIn":const h=await An._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(h.user),h;case"reauthenticate":return W(t.user,r,"internal-error"),An._forOperation(t.user,t.operationType,l);default:rn(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function fx(n,e){var t;const r=oe(n),i=e;return W(e.customData.operationType,r,"argument-error"),W((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,r,"argument-error"),Bp._fromError(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function px(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",ze(n,e))}function mx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",ze(n,e))}function gx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",ze(n,e))}function _x(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",ze(n,e))}function yx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:withdraw",ze(n,e))}class qp{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>Pc._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new qp(e)}async getSession(){return Ki._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await Rr(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await Rr(this.user,yx(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const Kh=new WeakMap;function Ix(n){const e=oe(n);return Kh.has(e)||Kh.set(e,qp._fromUser(e)),Kh.get(e)}const el="__sak";/**
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
 */class lA{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(el,"1"),this.storage.removeItem(el),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vx=1e3,Ex=10;class hA extends lA{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=jw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ZV()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ex):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},vx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}hA.type="LOCAL";const Wl=hA;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dA extends lA{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}dA.type="SESSION";const Ql=dA;/**
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
 */function Tx(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Jl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Jl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(t.origin,s)),c=await Tx(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Jl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class wx{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Yl("",20);i.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const p=f;if(p.data.eventId===l)switch(p.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(){return window}function Ax(n){mt().location.href=n}/**
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
 */function jp(){return typeof mt().WorkerGlobalScope<"u"&&typeof mt().importScripts=="function"}async function bx(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Rx(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Sx(){return jp()?self:null}/**
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
 */const fA="firebaseLocalStorageDb",Px=1,tl="firebaseLocalStorage",pA="fbase_key";class Cc{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Xl(n,e){return n.transaction([tl],e?"readwrite":"readonly").objectStore(tl)}function Cx(){const n=indexedDB.deleteDatabase(fA);return new Cc(n).toPromise()}function zd(){const n=indexedDB.open(fA,Px);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(tl,{keyPath:pA})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(tl)?e(r):(r.close(),await Cx(),e(await zd()))})})}async function Ey(n,e,t){const r=Xl(n,!0).put({[pA]:e,value:t});return new Cc(r).toPromise()}async function Dx(n,e){const t=Xl(n,!1).get(e),r=await new Cc(t).toPromise();return r===void 0?null:r.value}function Ty(n,e){const t=Xl(n,!0).delete(e);return new Cc(t).toPromise()}const kx=800,Nx=3;class mA{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await zd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Nx)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return jp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Jl._getInstance(Sx()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await bx(),!this.activeServiceWorker)return;this.sender=new wx(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Rx()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await zd();return await Ey(e,el,"1"),await Ty(e,el),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ey(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Dx(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ty(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Xl(i,!1).getAll();return new Cc(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),kx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}mA.type="LOCAL";const Gp=mA;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:start",ze(n,e))}function Ox(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",ze(n,e))}function xx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lx=500,Mx=6e4,su=1e12;class Fx{constructor(e){this.auth=e,this.counter=su,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Ux(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||su;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||su;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||su;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class Ux{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;W(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Bx(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},Mx)},Lx))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Bx(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h=Kw("rcb"),qx=new Rc(3e4,6e4);class jx{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=mt().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return W(Gx(t),e,"argument-error"),this.shouldResolveImmediately(t)&&dy(mt().grecaptcha)?Promise.resolve(mt().grecaptcha):new Promise((r,i)=>{const s=mt().setTimeout(()=>{i(Xt(e,"network-request-failed"))},qx.get());mt()[$h]=()=>{mt().clearTimeout(s),delete mt()[$h];const a=mt().grecaptcha;if(!a||!dy(a)){i(Xt(e,"internal-error"));return}const c=a.render;a.render=(l,h)=>{const f=c(l,h);return this.counter++,f},this.hostLanguage=t,r(a)};const o=`${oO()}?${fo({onload:$h,render:"explicit",hl:t})}`;Op(o).catch(()=>{clearTimeout(s),i(Xt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=mt().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Gx(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Kx{async load(e){return new Fx(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gA="recaptcha",$x={theme:"light",type:"image"};class zx{constructor(e,t,r=Object.assign({},$x)){this.parameters=r,this.type=gA,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=at(e),this.isInvisible=this.parameters.size==="invisible",W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;W(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Kx:new jx,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){W(!this.parameters.sitekey,this.auth,"argument-error"),W(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=mt()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){W(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){W(kp()&&!jp(),this.auth,"internal-error"),await Hx(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await GV(this.auth);W(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return W(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Hx(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=ni._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Wx(n,e,t){if(ht(n.app))return Promise.reject(Rt(n));const r=at(n),i=await Zl(r,e,oe(t));return new Kp(i,s=>zl(r,s))}async function Qx(n,e,t){const r=oe(n);await $l(!1,r,"phone");const i=await Zl(r.auth,e,oe(t));return new Kp(i,s=>tA(r,s))}async function Jx(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(Rt(r.auth));const i=await Zl(r.auth,e,oe(t));return new Kp(i,s=>nA(r,s))}async function Zl(n,e,t){var r;const i=await t.verify();try{W(typeof i=="string",n,"argument-error"),W(t.type===gA,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return W(o.type==="enroll",n,"internal-error"),(await px(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{W(o.type==="signin",n,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return W(a,n,"missing-multi-factor-info"),(await Vx(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await RO(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function Yx(n,e){const t=oe(n);if(ht(t.auth.app))return Promise.reject(Rt(t.auth));await xp(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e){this.providerId=Yi.PROVIDER_ID,this.auth=at(e)}verifyPhoneNumber(e,t){return Zl(this.auth,e,oe(t))}static credential(e,t){return ni._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Yi.credentialFromTaggedObject(t)}static credentialFromError(e){return Yi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?ni._fromTokenResponse(t,r):null}}Yi.PROVIDER_ID="phone";Yi.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function ps(n,e){return e?pr(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class $p extends Po{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _r(e,this._buildIdpRequest())}_linkToIdToken(e,t){return _r(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return _r(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Xx(n){return eA(n.auth,new $p(n),n.bypassAuthState)}function Zx(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Zw(t,new $p(n),n.bypassAuthState)}async function eL(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),xp(t,new $p(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xx;case"linkViaPopup":case"linkViaRedirect":return eL;case"reauthViaPopup":case"reauthViaRedirect":return Zx;default:rn(this.auth,"internal-error")}}resolve(e){br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tL=new Rc(2e3,1e4);async function zp(n,e,t){if(ht(n.app))return Promise.reject(Xt(n,"operation-not-supported-in-this-environment"));const r=at(n);So(n,e,Vr);const i=ps(r,t);return new mr(r,"signInViaPopup",e,i).executeNotNull()}async function nL(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(Xt(r.auth,"operation-not-supported-in-this-environment"));So(r.auth,e,Vr);const i=ps(r.auth,t);return new mr(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function rL(n,e,t){const r=oe(n);So(r.auth,e,Vr);const i=ps(r.auth,t);return new mr(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class mr extends _A{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,mr.currentPopupAction&&mr.currentPopupAction.cancel(),mr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){br(this.filter.length===1,"Popup operations only handle one event");const e=Yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Xt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Xt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Xt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,tL.get())};e()}}mr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iL="pendingRedirect",wu=new Map;class sL extends _A{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=wu.get(this.auth._key());if(!e){try{const r=await oL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}wu.set(this.auth._key(),e)}return this.bypassAuthState||wu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function oL(n,e){const t=IA(e),r=yA(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function Hp(n,e){return yA(n)._set(IA(e),"true")}function aL(n,e){wu.set(n._key(),e)}function yA(n){return pr(n._redirectPersistence)}function IA(n){return Tu(iL,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cL(n,e,t){return uL(n,e,t)}async function uL(n,e,t){if(ht(n.app))return Promise.reject(Rt(n));const r=at(n);So(n,e,Vr),await r._initializationPromise;const i=ps(r,t);return await Hp(i,r),i._openRedirect(r,e,"signInViaRedirect")}function lL(n,e,t){return hL(n,e,t)}async function hL(n,e,t){const r=oe(n);if(So(r.auth,e,Vr),ht(r.auth.app))return Promise.reject(Rt(r.auth));await r.auth._initializationPromise;const i=ps(r.auth,t);await Hp(i,r.auth);const s=await EA(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function dL(n,e,t){return fL(n,e,t)}async function fL(n,e,t){const r=oe(n);So(r.auth,e,Vr),await r.auth._initializationPromise;const i=ps(r.auth,t);await $l(!1,r,e.providerId),await Hp(i,r.auth);const s=await EA(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function pL(n,e){return await at(n)._initializationPromise,vA(n,e,!1)}async function vA(n,e,t=!1){if(ht(n.app))return Promise.reject(Rt(n));const r=at(n),i=ps(r,e),o=await new sL(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function EA(n){const e=Yl(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mL=600*1e3;class gL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_L(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!TA(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Xt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mL&&this.cachedEventUids.clear(),this.cachedEventUids.has(wy(e))}saveEventToCache(e){this.cachedEventUids.add(wy(e)),this.lastProcessedEventTime=Date.now()}}function wy(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function TA({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function _L(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return TA(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yL(n,e={}){return He(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IL=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,vL=/^https?/;async function EL(n){if(n.config.emulator)return;const{authorizedDomains:e}=await yL(n);for(const t of e)try{if(TL(t))return}catch{}rn(n,"unauthorized-domain")}function TL(n){const e=Ya(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!vL.test(t))return!1;if(IL.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const wL=new Rc(3e4,6e4);function Ay(){const n=mt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function AL(n){return new Promise((e,t)=>{var r,i,s;function o(){Ay(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ay(),t(Xt(n,"network-request-failed"))},timeout:wL.get()})}if(!((i=(r=mt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=mt().gapi)===null||s===void 0)&&s.load)o();else{const a=Kw("iframefcb");return mt()[a]=()=>{gapi.load?o():t(Xt(n,"network-request-failed"))},Op(`${cO()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Au=null,e})}let Au=null;function bL(n){return Au=Au||AL(n),Au}/**
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
 */const RL=new Rc(5e3,15e3),SL="__/auth/iframe",PL="emulator/auth/iframe",CL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},DL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function kL(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Np(e,PL):`https://${n.config.authDomain}/${SL}`,r={apiKey:e.apiKey,appName:n.name,v:ls},i=DL.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${fo(r).slice(1)}`}async function NL(n){const e=await bL(n),t=mt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:kL(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:CL,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Xt(n,"network-request-failed"),a=mt().setTimeout(()=>{s(o)},RL.get());function c(){mt().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const VL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},OL=500,xL=600,LL="_blank",ML="http://localhost";class by{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function FL(n,e,t,r=OL,i=xL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},VL),{width:r.toString(),height:i.toString(),top:s,left:o}),l=Et().toLowerCase();t&&(a=Mw(l)?LL:t),xw(l)&&(e=e||ML,c.scrollbars="yes");const h=Object.entries(c).reduce((p,[g,b])=>`${p}${g}=${b},`,"");if(XV(l)&&a!=="_self")return UL(e||"",a),new by(null);const f=window.open(e||"",a,h);W(f,n,"popup-blocked");try{f.focus()}catch{}return new by(f)}function UL(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const BL="__/auth/handler",qL="emulator/auth/handler",jL=encodeURIComponent("fac");async function Ry(n,e,t,r,i,s){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ls,eventId:i};if(e instanceof Vr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",KP(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof Do){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${jL}=${encodeURIComponent(c)}`:"";return`${GL(n)}?${fo(a).slice(1)}${l}`}function GL({config:n}){return n.emulator?Np(n,qL):`https://${n.authDomain}/${BL}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="webStorageSupport";class KL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ql,this._completeRedirectFn=vA,this._overrideRedirectResult=aL}async _openPopup(e,t,r,i){var s;br((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Ry(e,t,r,Ya(),i);return FL(e,o,Yl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Ry(e,t,r,Ya(),i);return Ax(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(br(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await NL(e),r=new gL(e);return t.register("authEvent",i=>(W(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(zh,{type:zh},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[zh];o!==void 0&&t(!!o),rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=EL(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return jw()||Lw()||Vp()}}const wA=KL;class AA{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Gn("unexpected MultiFactorSessionType")}}}class Wp extends AA{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Wp(e)}_finalizeEnroll(e,t,r){return mx(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Ox(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class bA{constructor(){}static assertion(e){return Wp._fromCredential(e)}}bA.FACTOR_ID="phone";class RA{static assertionForEnrollment(e,t){return tc._fromSecret(e,t)}static assertionForSignIn(e,t){return tc._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const r=e;W(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await gx(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return eh._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}}RA.FACTOR_ID="totp";class tc extends AA{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new tc(t,void 0,e)}static _fromEnrollmentId(e,t){return new tc(t,e)}async _finalizeEnroll(e,t,r){return W(typeof this.secret<"u",e,"argument-error"),_x(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){W(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return xx(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class eh{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new eh(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ou(e)||ou(t))&&(i=!0),i&&(ou(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ou(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function ou(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var Sy="@firebase/auth",Py="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $L{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HL(n){Zi(new ai("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gw(n)},l=new iO(r,i,s,c);return dO(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Zi(new ai("auth-internal",e=>{const t=at(e.getProvider("auth").getImmediate());return(r=>new $L(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),zn(Sy,Py,zL(n)),zn(Sy,Py,"esm2017")}/**
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
 */const WL=300,QL=Lv("authIdTokenMaxAge")||WL;let Cy=null;const JL=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>QL)return;const i=t==null?void 0:t.token;Cy!==i&&(Cy=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nl(n=vl()){const e=po(n,"auth");if(e.isInitialized())return e.getImmediate();const t=zw(n,{popupRedirectResolver:wA,persistence:[Gp,Wl,Ql]}),r=Lv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=JL(s.toString());cA(t,o,()=>o(t.currentUser)),aA(t,a=>o(a))}}const i=Vv("auth");return i&&Hw(t,`http://${i}`),t}function YL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}sO({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Xt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",YL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HL("Browser");const XL=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:NV,ActionCodeURL:Co,AuthCredential:Po,AuthErrorCodes:xV,EmailAuthCredential:co,EmailAuthProvider:bi,FacebookAuthProvider:ur,FactorId:PV,GithubAuthProvider:lr,GoogleAuthProvider:Bn,OAuthCredential:Jn,OAuthProvider:Sa,OperationType:kV,PhoneAuthCredential:ni,PhoneAuthProvider:Yi,PhoneMultiFactorGenerator:bA,ProviderId:CV,RecaptchaVerifier:zx,SAMLAuthProvider:Yu,SignInMethod:DV,TotpMultiFactorGenerator:RA,TotpSecret:eh,TwitterAuthProvider:hr,applyActionCode:jO,beforeAuthStateChanged:cA,browserLocalPersistence:Wl,browserPopupRedirectResolver:wA,browserSessionPersistence:Ql,checkActionCode:rA,confirmPasswordReset:qO,connectAuthEmulator:Hw,createUserWithEmailAndPassword:iA,debugErrorMap:OV,deleteUser:dx,fetchSignInMethodsForEmail:WO,getAdditionalUserInfo:ox,getAuth:nl,getIdToken:zV,getIdTokenResult:kw,getMultiFactorResolver:fx,getRedirectResult:pL,inMemoryPersistence:$d,indexedDBLocalPersistence:Gp,initializeAuth:zw,initializeRecaptchaConfig:ax,isSignInWithEmailLink:$O,linkWithCredential:tA,linkWithPhoneNumber:Qx,linkWithPopup:rL,linkWithRedirect:dL,multiFactor:Ix,onAuthStateChanged:uA,onIdTokenChanged:aA,parseActionCodeURL:VO,prodErrorMap:ww,reauthenticateWithCredential:nA,reauthenticateWithPhoneNumber:Jx,reauthenticateWithPopup:nL,reauthenticateWithRedirect:lL,reload:Nw,revokeAccessToken:hx,sendEmailVerification:QO,sendPasswordResetEmail:BO,sendSignInLinkToEmail:KO,setPersistence:Zu,signInAnonymously:LO,signInWithCredential:zl,signInWithCustomToken:UO,signInWithEmailAndPassword:da,signInWithEmailLink:zO,signInWithPhoneNumber:Wx,signInWithPopup:zp,signInWithRedirect:cL,signOut:Up,unlink:MO,updateCurrentUser:lx,updateEmail:ZO,updatePassword:ex,updatePhoneNumber:Yx,updateProfile:XO,useDeviceLanguage:ux,validatePassword:cx,verifyBeforeUpdateEmail:JO,verifyPasswordResetCode:GO},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SA="firebasestorage.googleapis.com",PA="storageBucket",ZL=120*1e3,eM=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends Yn{constructor(e,t,r=0){super(Hh(e),`Firebase Storage: ${t} (${Hh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ct.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Hh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ot;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ot||(ot={}));function Hh(n){return"storage/"+n}function Qp(){const n="An unknown error occurred, please check the error payload for server response.";return new ct(ot.UNKNOWN,n)}function tM(n){return new ct(ot.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function nM(n){return new ct(ot.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function rM(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ct(ot.UNAUTHENTICATED,n)}function iM(){return new ct(ot.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function sM(n){return new ct(ot.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function oM(){return new ct(ot.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function aM(){return new ct(ot.CANCELED,"User canceled the upload/download.")}function cM(n){return new ct(ot.INVALID_URL,"Invalid URL '"+n+"'.")}function uM(n){return new ct(ot.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function lM(){return new ct(ot.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+PA+"' property when initializing the app?")}function hM(){return new ct(ot.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function dM(){return new ct(ot.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function fM(n){return new ct(ot.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Hd(n){return new ct(ot.INVALID_ARGUMENT,n)}function CA(){return new ct(ot.APP_DELETED,"The Firebase app was deleted.")}function pM(n){return new ct(ot.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Pa(n,e){return new ct(ot.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Zo(n){throw new ct(ot.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=hn.makeFromUrl(e,t)}catch{return new hn(e,"")}if(r.path==="")return r;throw uM(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(L){L.path.charAt(L.path.length-1)==="/"&&(L.path_=L.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function l(L){L.path_=decodeURIComponent(L.path)}const h="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",g=new RegExp(`^https?://${f}/${h}/b/${i}/o${p}`,"i"),b={bucket:1,path:3},T=t===SA?"(?:storage.googleapis.com|storage.cloud.google.com)":t,P="([^?#]*)",k=new RegExp(`^https?://${T}/${i}/${P}`,"i"),N=[{regex:a,indices:c,postModify:s},{regex:g,indices:b,postModify:l},{regex:k,indices:{bucket:1,path:2},postModify:l}];for(let L=0;L<N.length;L++){const H=N[L],j=H.regex.exec(e);if(j){const E=j[H.indices.bucket];let _=j[H.indices.path];_||(_=""),r=new hn(E,_),H.postModify(r);break}}if(r==null)throw cM(e);return r}}class mM{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gM(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function c(){return a===2}let l=!1;function h(...P){l||(l=!0,e.apply(null,P))}function f(P){i=setTimeout(()=>{i=null,n(g,c())},P)}function p(){s&&clearTimeout(s)}function g(P,...k){if(l){p();return}if(P){p(),h.call(null,P,...k);return}if(c()||o){p(),h.call(null,P,...k);return}r<64&&(r*=2);let N;a===1?(a=2,N=0):N=(r+Math.random())*1e3,f(N)}let b=!1;function T(P){b||(b=!0,p(),!l&&(i!==null?(P||(a=2),clearTimeout(i),f(0)):P||(a=1)))}return f(0),s=setTimeout(()=>{o=!0,T(!0)},t),T}function _M(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yM(n){return n!==void 0}function IM(n){return typeof n=="object"&&!Array.isArray(n)}function Jp(n){return typeof n=="string"||n instanceof String}function Dy(n){return Yp()&&n instanceof Blob}function Yp(){return typeof Blob<"u"}function ky(n,e,t,r){if(r<e)throw Hd(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Hd(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function th(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function DA(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Xi;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Xi||(Xi={}));/**
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
 */function vM(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EM{constructor(e,t,r,i,s,o,a,c,l,h,f,p=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=h,this.connectionFactory_=f,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((g,b)=>{this.resolve_=g,this.reject_=b,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new au(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===Xi.NO_ERROR,c=s.getStatus();if(!a||vM(c,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Xi.ABORT;r(!1,new au(!1,null,h));return}const l=this.successCodes_.indexOf(c)!==-1;r(!0,new au(l,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());yM(c)?s(c):s()}catch(c){o(c)}else if(a!==null){const c=Qp();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(i.canceled){const c=this.appDelete_?CA():aM();o(c)}else{const c=oM();o(c)}};this.canceled_?t(!1,new au(!1,null,!0)):this.backoffId_=gM(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&_M(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class au{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function TM(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function wM(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function AM(n,e){e&&(n["X-Firebase-GMPID"]=e)}function bM(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function RM(n,e,t,r,i,s,o=!0){const a=DA(n.urlParams),c=n.url+a,l=Object.assign({},n.headers);return AM(l,e),TM(l,t),wM(l,s),bM(l,r),new EM(c,n.method,l,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SM(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function PM(...n){const e=SM();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Yp())return new Blob(n);throw new ct(ot.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function CM(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function DM(n){if(typeof atob>"u")throw fM("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Wh{constructor(e,t){this.data=e,this.contentType=t||null}}function kM(n,e){switch(n){case Kn.RAW:return new Wh(kA(e));case Kn.BASE64:case Kn.BASE64URL:return new Wh(NA(n,e));case Kn.DATA_URL:return new Wh(VM(e),OM(e))}throw Qp()}function kA(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function NM(n){let e;try{e=decodeURIComponent(n)}catch{throw Pa(Kn.DATA_URL,"Malformed data URL.")}return kA(e)}function NA(n,e){switch(n){case Kn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Pa(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Kn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Pa(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=DM(e)}catch(i){throw i.message.includes("polyfill")?i:Pa(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class VA{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Pa(Kn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=xM(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function VM(n){const e=new VA(n);return e.base64?NA(Kn.BASE64,e.rest):NM(e.rest)}function OM(n){return new VA(n).contentType}function xM(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e,t){let r=0,i="";Dy(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Dy(this.data_)){const r=this.data_,i=CM(r,e,t);return i===null?null:new Yr(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Yr(r,!0)}}static getBlob(...e){if(Yp()){const t=e.map(r=>r instanceof Yr?r.data_:r);return new Yr(PM.apply(null,t))}else{const t=e.map(o=>Jp(o)?kM(Kn.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new Yr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OA(n){let e;try{e=JSON.parse(n)}catch{return null}return IM(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LM(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function MM(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function xA(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FM(n,e){return e}class zt{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||FM}}let cu=null;function UM(n){return!Jp(n)||n.length<2?n:xA(n)}function LA(){if(cu)return cu;const n=[];n.push(new zt("bucket")),n.push(new zt("generation")),n.push(new zt("metageneration")),n.push(new zt("name","fullPath",!0));function e(s,o){return UM(o)}const t=new zt("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new zt("size");return i.xform=r,n.push(i),n.push(new zt("timeCreated")),n.push(new zt("updated")),n.push(new zt("md5Hash",null,!0)),n.push(new zt("cacheControl",null,!0)),n.push(new zt("contentDisposition",null,!0)),n.push(new zt("contentEncoding",null,!0)),n.push(new zt("contentLanguage",null,!0)),n.push(new zt("contentType",null,!0)),n.push(new zt("metadata","customMetadata",!0)),cu=n,cu}function BM(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new hn(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function qM(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return BM(r,n),r}function MA(n,e,t){const r=OA(e);return r===null?null:qM(n,r,t)}function jM(n,e,t,r){const i=OA(e);if(i===null||!Jp(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(l=>{const h=n.bucket,f=n.fullPath,p="/b/"+o(h)+"/o/"+o(f),g=th(p,t,r),b=DA({alt:"media",token:l});return g+b})[0]}function GM(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class Xp{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FA(n){if(!n)throw Qp()}function KM(n,e){function t(r,i){const s=MA(n,i,e);return FA(s!==null),s}return t}function $M(n,e){function t(r,i){const s=MA(n,i,e);return FA(s!==null),jM(s,i,n.host,n._protocol)}return t}function UA(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=iM():i=rM():t.getStatus()===402?i=nM(n.bucket):t.getStatus()===403?i=sM(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function BA(n){const e=UA(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=tM(n.path)),s.serverResponse=i.serverResponse,s}return t}function zM(n,e,t){const r=e.fullServerUrl(),i=th(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,a=new Xp(i,s,$M(n,t),o);return a.errorHandler=BA(e),a}function HM(n,e){const t=e.fullServerUrl(),r=th(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(c,l){}const a=new Xp(r,i,o,s);return a.successCodes=[200,204],a.errorHandler=BA(e),a}function WM(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function QM(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=WM(null,e)),r}function JM(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let N="";for(let L=0;L<2;L++)N=N+Math.random().toString().slice(2);return N}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const l=QM(e,r,i),h=GM(l,t),f="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+l.contentType+`\r
\r
`,p=`\r
--`+c+"--",g=Yr.getBlob(f,r,p);if(g===null)throw hM();const b={name:l.fullPath},T=th(s,n.host,n._protocol),P="POST",k=n.maxUploadRetryTime,D=new Xp(T,P,KM(n,t),k);return D.urlParams=b,D.headers=o,D.body=g.uploadData(),D.errorHandler=UA(e),D}class YM{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Xi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Xi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Xi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw Zo("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Zo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Zo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Zo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Zo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class XM extends YM{initXhr(){this.xhr_.responseType="text"}}function Zp(){return new XM}/**
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
 */class us{constructor(e,t){this._service=e,t instanceof hn?this._location=t:this._location=hn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new us(e,t)}get root(){const e=new hn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return xA(this._location.path)}get storage(){return this._service}get parent(){const e=LM(this._location.path);if(e===null)return null;const t=new hn(this._location.bucket,e);return new us(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw pM(e)}}function ZM(n,e,t){n._throwIfRoot("uploadBytes");const r=JM(n.storage,n._location,LA(),new Yr(e,!0),t);return n.storage.makeRequestWithTokens(r,Zp).then(i=>({metadata:i,ref:n}))}function eF(n){n._throwIfRoot("getDownloadURL");const e=zM(n.storage,n._location,LA());return n.storage.makeRequestWithTokens(e,Zp).then(t=>{if(t===null)throw dM();return t})}function tF(n){n._throwIfRoot("deleteObject");const e=HM(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Zp)}function nF(n,e){const t=MM(n._location.path,e),r=new hn(n._location.bucket,t);return new us(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rF(n){return/^[A-Za-z]+:\/\//.test(n)}function iF(n,e){return new us(n,e)}function qA(n,e){if(n instanceof em){const t=n;if(t._bucket==null)throw lM();const r=new us(t,t._bucket);return e!=null?qA(r,e):r}else return e!==void 0?nF(n,e):n}function sF(n,e){if(e&&rF(e)){if(n instanceof em)return iF(n,e);throw Hd("To use ref(service, url), the first argument must be a Storage instance.")}else return qA(n,e)}function Ny(n,e){const t=e==null?void 0:e[PA];return t==null?null:hn.makeFromBucketSpec(t,n)}function oF(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Mv(i,n.app.options.projectId))}class em{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=SA,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=ZL,this._maxUploadRetryTime=eM,this._requests=new Set,i!=null?this._bucket=hn.makeFromBucketSpec(i,this._host):this._bucket=Ny(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=hn.makeFromBucketSpec(this._url,e):this._bucket=Ny(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ky("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ky("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new us(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new mM(CA());{const o=RM(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const Vy="@firebase/storage",Oy="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA="storage";function LU(n,e,t){return n=oe(n),ZM(n,e,t)}function MU(n){return n=oe(n),eF(n)}function FU(n){return n=oe(n),tF(n)}function UU(n,e){return n=oe(n),sF(n,e)}function aF(n=vl(),e){n=oe(n);const r=po(n,jA).getImmediate({identifier:e}),i=Ov("storage");return i&&cF(r,...i),r}function cF(n,e,t,r={}){oF(n,e,t,r)}function uF(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new em(t,r,i,e,ls)}function lF(){Zi(new ai(jA,uF,"PUBLIC").setMultipleInstances(!0)),zn(Vy,Oy,""),zn(Vy,Oy,"esm2017")}lF();const GA={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},nh=bf(GA),gt=YT(nh),un=nl(nh),hF=aF(nh);let Rs=null;function KA(){if(Rs)return Rs;try{const n=bf(GA,"_auth_provisioning");return Rs=nl(n),Rs}catch{try{const e=vl("_auth_provisioning");return Rs=nl(e),Rs}catch(e){return console.warn("[firebase] Secondary auth init fail:",e.message),null}}}const dF=Object.freeze(Object.defineProperty({__proto__:null,auth:un,db:gt,firebaseApp:nh,getSecondaryAuth:KA,storage:hF},Symbol.toStringTag,{value:"Module"}));async function xy(n,e){const t=await Ja(fn(gt,n,e));return t.exists()?{id:t.id,...t.data()}:null}async function Ss(n,e=[],t=[],r=0){const i=[];for(const[a,c,l]of e)i.push(Un(a,c,l));for(const[a,c]of t)i.push(wp(a,c));r>0&&i.push(cr(r));const s=En(Ar(gt,n),...i);return(await Sn(s)).docs.map(a=>({id:a.id,...a.data()}))}async function fF(n,e,t){await fw(fn(gt,n,e),t)}async function BU(n,e,t){await bc(fn(gt,n,e),t)}async function qU(n,e){return(await mw(Ar(gt,n),e)).id}async function jU(n,e){await pw(fn(gt,n,e))}function GU(n,e,t=[],r=[]){const i=[];for(const[o,a,c]of t)i.push(Un(o,a,c));for(const[o,a]of r)i.push(wp(o,a));const s=i.length?En(Ar(gt,n),...i):Ar(gt,n);return bp(s,o=>{const a=o.docs.map(c=>({id:c.id,...c.data()}));e(a)},o=>{console.error(`[subscribeColl] ${n} error:`,o)})}function Ly(n,e,t){return bp(fn(gt,n,e),r=>{t(r.exists()?{id:r.id,...r.data()}:null)},r=>{console.error(`[subscribeDoc] ${n}/${e} error:`,r)})}const Qh="web",My="general",Jh={txtAppName:"Ammu Online",txtHeaderBar:"Ammu Online",appTitle:"Ammu Online — Pondok Pesantren Mambaul Ulum",kopLine1:"PONDOK PESANTREN MAMBAUL ULUM",kopLine2:"PORTAL PRESTASI QIRAATI",kopLine3:"",kopLine4:"",logoUrl:"",logoKop:"",logoQiraati:"",alamat:"",noTelp:"",fiturBeranda:!0,fiturKalender:!0,fiturKritikSaran:!0,fiturNotifikasi:!0,namaChannel:"Al Manshur Channel",mahad_tagihan_template:[],mahad_sub_kategori:[],tarif_fullday_default:0},$A=Tf("settings",()=>{const n=jt({...Jh}),e=jt(!1),t=jt(null);let r=null;const i=Nt(()=>[n.value.kopLine1,n.value.kopLine2,n.value.kopLine3,n.value.kopLine4].filter(Boolean));let s=null;async function o(p=0){if(!e.value){e.value=!0,t.value=null;try{const[g,b]=await Promise.all([xy("settings",My).catch(()=>null),xy("settings",Qh).catch(()=>null)]);n.value={...Jh,...b||{},...g||{}}}catch(g){const b=(g==null?void 0:g.code)==="unavailable"||/offline/i.test((g==null?void 0:g.message)||"");if(b&&p<2){e.value=!1,setTimeout(()=>o(p+1),1500);return}t.value=g.message||String(g),b||console.error("[settings/load]",g)}finally{e.value=!1}}}function a(){r||(r=Ly("settings",Qh,p=>{p&&(n.value={...n.value,...p,...c||{}})})),s||(s=Ly("settings",My,p=>{p&&(c=p,n.value={...n.value,...p})}))}let c=null;function l(){r&&(r(),r=null),s&&(s(),s=null)}async function h(p){e.value=!0,t.value=null;try{const g={...n.value,...p};await fF("settings",Qh,g),n.value=g}catch(g){throw t.value=g.message||String(g),g}finally{e.value=!1}}function f(){n.value={...Jh}}return{settings:n,isLoading:e,error:t,kopLines:i,load:o,subscribe:a,unsubscribeNow:l,save:h,reset:f}}),pF={__name:"App",setup(n){const e=$A();return Ms(()=>e.settings,t=>{if(!t)return;const r=document.documentElement;t.themeColor&&r.style.setProperty("--theme-color",t.themeColor),t.appTitle&&(document.title=t.appTitle)},{deep:!0,immediate:!0}),(t,r)=>{const i=$R("router-view");return Oa(),La(i,null,{default:ad(({Component:s})=>[It(BS,{name:"fade",mode:"out-in"},{default:ad(()=>[(Oa(),La(zR(s)))]),_:2},1024)]),_:1})}}};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Vs=typeof document<"u";function zA(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function mF(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&zA(n.default)}const ke=Object.assign;function Yh(n,e){const t={};for(const r in e){const i=e[r];t[r]=Nn(i)?i.map(n):n(i)}return t}const Ca=()=>{},Nn=Array.isArray;function Fy(n,e){const t={};for(const r in n)t[r]=r in e?e[r]:n[r];return t}const HA=/#/g,gF=/&/g,_F=/\//g,yF=/=/g,IF=/\?/g,WA=/\+/g,vF=/%5B/g,EF=/%5D/g,QA=/%5E/g,TF=/%60/g,JA=/%7B/g,wF=/%7C/g,YA=/%7D/g,AF=/%20/g;function tm(n){return n==null?"":encodeURI(""+n).replace(wF,"|").replace(vF,"[").replace(EF,"]")}function bF(n){return tm(n).replace(JA,"{").replace(YA,"}").replace(QA,"^")}function Wd(n){return tm(n).replace(WA,"%2B").replace(AF,"+").replace(HA,"%23").replace(gF,"%26").replace(TF,"`").replace(JA,"{").replace(YA,"}").replace(QA,"^")}function RF(n){return Wd(n).replace(yF,"%3D")}function SF(n){return tm(n).replace(HA,"%23").replace(IF,"%3F")}function PF(n){return SF(n).replace(_F,"%2F")}function nc(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const CF=/\/$/,DF=n=>n.replace(CF,"");function Xh(n,e,t="/"){let r,i={},s="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=e.slice(0,c),s=e.slice(c,a>0?a:e.length),i=n(s.slice(1))),a>=0&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=OF(r??e,t),{fullPath:r+s+o,path:r,query:i,hash:nc(o)}}function kF(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Uy(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function NF(n,e,t){const r=e.matched.length-1,i=t.matched.length-1;return r>-1&&r===i&&uo(e.matched[r],t.matched[i])&&XA(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function uo(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function XA(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!VF(n[t],e[t]))return!1;return!0}function VF(n,e){return Nn(n)?By(n,e):Nn(e)?By(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function By(n,e){return Nn(e)?n.length===e.length&&n.every((t,r)=>t===e[r]):n.length===1&&n[0]===e}function OF(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),r=n.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=t.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const Gr={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Qd=(function(n){return n.pop="pop",n.push="push",n})({}),Zh=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function xF(n){if(!n)if(Vs){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),DF(n)}const LF=/^[^#]+#/;function MF(n,e){return n.replace(LF,"#")+e}function FF(n,e){const t=document.documentElement.getBoundingClientRect(),r=n.getBoundingClientRect();return{behavior:e.behavior,left:r.left-t.left-(e.left||0),top:r.top-t.top-(e.top||0)}}const rh=()=>({left:window.scrollX,top:window.scrollY});function UF(n){let e;if("el"in n){const t=n.el,r=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=FF(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function qy(n,e){return(history.state?history.state.position-e:-1)+n}const Jd=new Map;function BF(n,e){Jd.set(n,e)}function qF(n){const e=Jd.get(n);return Jd.delete(n),e}function jF(n){return typeof n=="string"||n&&typeof n=="object"}function ZA(n){return typeof n=="string"||typeof n=="symbol"}let rt=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const eb=Symbol("");rt.MATCHER_NOT_FOUND+"",rt.NAVIGATION_GUARD_REDIRECT+"",rt.NAVIGATION_ABORTED+"",rt.NAVIGATION_CANCELLED+"",rt.NAVIGATION_DUPLICATED+"";function lo(n,e){return ke(new Error,{type:n,[eb]:!0},e)}function nr(n,e){return n instanceof Error&&eb in n&&(e==null||!!(n.type&e))}const GF=["params","query","hash"];function KF(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of GF)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function $F(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<t.length;++r){const i=t[r].replace(WA," "),s=i.indexOf("="),o=nc(s<0?i:i.slice(0,s)),a=s<0?null:nc(i.slice(s+1));if(o in e){let c=e[o];Nn(c)||(c=e[o]=[c]),c.push(a)}else e[o]=a}return e}function jy(n){let e="";for(let t in n){const r=n[t];if(t=RF(t),r==null){r!==void 0&&(e+=(e.length?"&":"")+t);continue}(Nn(r)?r.map(i=>i&&Wd(i)):[r&&Wd(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function zF(n){const e={};for(const t in n){const r=n[t];r!==void 0&&(e[t]=Nn(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const HF=Symbol(""),Gy=Symbol(""),ih=Symbol(""),nm=Symbol(""),Yd=Symbol("");function ea(){let n=[];function e(r){return n.push(r),()=>{const i=n.indexOf(r);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Hr(n,e,t,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,c)=>{const l=p=>{p===!1?c(lo(rt.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?c(p):jF(p)?c(lo(rt.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&r.enterCallbacks[i]===o&&typeof p=="function"&&o.push(p),a())},h=s(()=>n.call(r&&r.instances[i],e,t,l));let f=Promise.resolve(h);n.length<3&&(f=f.then(l)),f.catch(p=>c(p))})}function ed(n,e,t,r,i=s=>s()){const s=[];for(const o of n)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(zA(c)){const l=(c.__vccOpts||c)[e];l&&s.push(Hr(l,t,r,o,a,i))}else{let l=c();s.push(()=>l.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=mF(h)?h.default:h;o.mods[a]=h,o.components[a]=f;const p=(f.__vccOpts||f)[e];return p&&Hr(p,t,r,o,a,i)()}))}}return s}function WF(n,e){const t=[],r=[],i=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(l=>uo(l,a))?r.push(a):t.push(a));const c=n.matched[o];c&&(e.matched.find(l=>uo(l,c))||i.push(c))}return[t,r,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let QF=()=>location.protocol+"//"+location.host;function tb(n,e){const{pathname:t,search:r,hash:i}=e,s=n.indexOf("#");if(s>-1){let o=i.includes(n.slice(s))?n.slice(s).length:1,a=i.slice(o);return a[0]!=="/"&&(a="/"+a),Uy(a,"")}return Uy(t,n)+r+i}function JF(n,e,t,r){let i=[],s=[],o=null;const a=({state:p})=>{const g=tb(n,location),b=t.value,T=e.value;let P=0;if(p){if(t.value=g,e.value=p,o&&o===b){o=null;return}P=T?p.position-T.position:0}else r(g);i.forEach(k=>{k(t.value,b,{delta:P,type:Qd.pop,direction:P?P>0?Zh.forward:Zh.back:Zh.unknown})})};function c(){o=t.value}function l(p){i.push(p);const g=()=>{const b=i.indexOf(p);b>-1&&i.splice(b,1)};return s.push(g),g}function h(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(ke({},p.state,{scroll:rh()}),"")}}function f(){for(const p of s)p();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",h),document.removeEventListener("visibilitychange",h)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",h),document.addEventListener("visibilitychange",h),{pauseListeners:c,listen:l,destroy:f}}function Ky(n,e,t,r=!1,i=!1){return{back:n,current:e,forward:t,replaced:r,position:window.history.length,scroll:i?rh():null}}function YF(n){const{history:e,location:t}=window,r={value:tb(n,t)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(c,l,h){const f=n.indexOf("#"),p=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+c:QF()+n+c;try{e[h?"replaceState":"pushState"](l,"",p),i.value=l}catch(g){console.error(g),t[h?"replace":"assign"](p)}}function o(c,l){s(c,ke({},e.state,Ky(i.value.back,c,i.value.forward,!0),l,{position:i.value.position}),!0),r.value=c}function a(c,l){const h=ke({},i.value,e.state,{forward:c,scroll:rh()});s(h.current,h,!0),s(c,ke({},Ky(r.value,c,null),{position:h.position+1},l),!1),r.value=c}return{location:r,state:i,push:a,replace:o}}function XF(n){n=xF(n);const e=YF(n),t=JF(n,e.state,e.location,e.replace);function r(s,o=!0){o||t.pauseListeners(),history.go(s)}const i=ke({location:"",base:n,go:r,createHref:MF.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function ZF(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),XF(n)}let $i=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var _t=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(_t||{});const e1={type:$i.Static,value:""},t1=/[a-zA-Z0-9_]/;function n1(n){if(!n)return[[]];if(n==="/")return[[e1]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${l}": ${g}`)}let t=_t.Static,r=t;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,c,l="",h="";function f(){l&&(t===_t.Static?s.push({type:$i.Static,value:l}):t===_t.Param||t===_t.ParamRegExp||t===_t.ParamRegExpEnd?(s.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:$i.Param,value:l,regexp:h,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function p(){l+=c}for(;a<n.length;){if(c=n[a++],c==="\\"&&t!==_t.ParamRegExp){r=t,t=_t.EscapeNext;continue}switch(t){case _t.Static:c==="/"?(l&&f(),o()):c===":"?(f(),t=_t.Param):p();break;case _t.EscapeNext:p(),t=r;break;case _t.Param:c==="("?t=_t.ParamRegExp:t1.test(c)?p():(f(),t=_t.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case _t.ParamRegExp:c===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+c:t=_t.ParamRegExpEnd:h+=c;break;case _t.ParamRegExpEnd:f(),t=_t.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,h="";break;default:e("Unknown state");break}}return t===_t.ParamRegExp&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),i}const $y="[^/]+?",r1={sensitive:!1,strict:!1,start:!0,end:!0};var Qt=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Qt||{});const i1=/[.+*?^${}()[\]/\\]/g;function s1(n,e){const t=ke({},r1,e),r=[];let i=t.start?"^":"";const s=[];for(const l of n){const h=l.length?[]:[Qt.Root];t.strict&&!l.length&&(i+="/");for(let f=0;f<l.length;f++){const p=l[f];let g=Qt.Segment+(t.sensitive?Qt.BonusCaseSensitive:0);if(p.type===$i.Static)f||(i+="/"),i+=p.value.replace(i1,"\\$&"),g+=Qt.Static;else if(p.type===$i.Param){const{value:b,repeatable:T,optional:P,regexp:k}=p;s.push({name:b,repeatable:T,optional:P});const D=k||$y;if(D!==$y){g+=Qt.BonusCustomRegExp;try{`${D}`}catch(L){throw new Error(`Invalid custom RegExp for param "${b}" (${D}): `+L.message)}}let N=T?`((?:${D})(?:/(?:${D}))*)`:`(${D})`;f||(N=P&&l.length<2?`(?:/${N})`:"/"+N),P&&(N+="?"),i+=N,g+=Qt.Dynamic,P&&(g+=Qt.BonusOptional),T&&(g+=Qt.BonusRepeatable),D===".*"&&(g+=Qt.BonusWildcard)}h.push(g)}r.push(h)}if(t.strict&&t.end){const l=r.length-1;r[l][r[l].length-1]+=Qt.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function a(l){const h=l.match(o),f={};if(!h)return null;for(let p=1;p<h.length;p++){const g=h[p]||"",b=s[p-1];f[b.name]=g&&b.repeatable?g.split("/"):g}return f}function c(l){let h="",f=!1;for(const p of n){(!f||!h.endsWith("/"))&&(h+="/"),f=!1;for(const g of p)if(g.type===$i.Static)h+=g.value;else if(g.type===$i.Param){const{value:b,repeatable:T,optional:P}=g,k=b in l?l[b]:"";if(Nn(k)&&!T)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const D=Nn(k)?k.join("/"):k;if(!D)if(P)p.length<2&&(h.endsWith("/")?h=h.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);h+=D}}return h||"/"}return{re:o,score:r,keys:s,parse:a,stringify:c}}function o1(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=e[t]-n[t];if(r)return r;t++}return n.length<e.length?n.length===1&&n[0]===Qt.Static+Qt.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Qt.Static+Qt.Segment?1:-1:0}function nb(n,e){let t=0;const r=n.score,i=e.score;for(;t<r.length&&t<i.length;){const s=o1(r[t],i[t]);if(s)return s;t++}if(Math.abs(i.length-r.length)===1){if(zy(r))return 1;if(zy(i))return-1}return i.length-r.length}function zy(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const a1={strict:!1,end:!0,sensitive:!1};function c1(n,e,t){const r=s1(n1(n.path),t),i=ke(r,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function u1(n,e){const t=[],r=new Map;e=Fy(a1,e);function i(f){return r.get(f)}function s(f,p,g){const b=!g,T=Wy(f);T.aliasOf=g&&g.record;const P=Fy(e,f),k=[T];if("alias"in f){const L=typeof f.alias=="string"?[f.alias]:f.alias;for(const H of L)k.push(Wy(ke({},T,{components:g?g.record.components:T.components,path:H,aliasOf:g?g.record:T})))}let D,N;for(const L of k){const{path:H}=L;if(p&&H[0]!=="/"){const j=p.record.path,E=j[j.length-1]==="/"?"":"/";L.path=p.record.path+(H&&E+H)}if(D=c1(L,p,P),g?g.alias.push(D):(N=N||D,N!==D&&N.alias.push(D),b&&f.name&&!Qy(D)&&o(f.name)),rb(D)&&c(D),T.children){const j=T.children;for(let E=0;E<j.length;E++)s(j[E],D,g&&g.children[E])}g=g||D}return N?()=>{o(N)}:Ca}function o(f){if(ZA(f)){const p=r.get(f);p&&(r.delete(f),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(f);p>-1&&(t.splice(p,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function c(f){const p=d1(f,t);t.splice(p,0,f),f.record.name&&!Qy(f)&&r.set(f.record.name,f)}function l(f,p){let g,b={},T,P;if("name"in f&&f.name){if(g=r.get(f.name),!g)throw lo(rt.MATCHER_NOT_FOUND,{location:f});P=g.record.name,b=ke(Hy(p.params,g.keys.filter(N=>!N.optional).concat(g.parent?g.parent.keys.filter(N=>N.optional):[]).map(N=>N.name)),f.params&&Hy(f.params,g.keys.map(N=>N.name))),T=g.stringify(b)}else if(f.path!=null)T=f.path,g=t.find(N=>N.re.test(T)),g&&(b=g.parse(T),P=g.record.name);else{if(g=p.name?r.get(p.name):t.find(N=>N.re.test(p.path)),!g)throw lo(rt.MATCHER_NOT_FOUND,{location:f,currentLocation:p});P=g.record.name,b=ke({},p.params,f.params),T=g.stringify(b)}const k=[];let D=g;for(;D;)k.unshift(D.record),D=D.parent;return{name:P,path:T,params:b,matched:k,meta:h1(k)}}n.forEach(f=>s(f));function h(){t.length=0,r.clear()}return{addRoute:s,resolve:l,removeRoute:o,clearRoutes:h,getRoutes:a,getRecordMatcher:i}}function Hy(n,e){const t={};for(const r of e)r in n&&(t[r]=n[r]);return t}function Wy(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:l1(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function l1(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const r in n.components)e[r]=typeof t=="object"?t[r]:t;return e}function Qy(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function h1(n){return n.reduce((e,t)=>ke(e,t.meta),{})}function d1(n,e){let t=0,r=e.length;for(;t!==r;){const s=t+r>>1;nb(n,e[s])<0?r=s:t=s+1}const i=f1(n);return i&&(r=e.lastIndexOf(i,r-1)),r}function f1(n){let e=n;for(;e=e.parent;)if(rb(e)&&nb(n,e)===0)return e}function rb({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Jy(n){const e=Tn(ih),t=Tn(nm),r=Nt(()=>{const c=Hi(n.to);return e.resolve(c)}),i=Nt(()=>{const{matched:c}=r.value,{length:l}=c,h=c[l-1],f=t.matched;if(!h||!f.length)return-1;const p=f.findIndex(uo.bind(null,h));if(p>-1)return p;const g=Yy(c[l-2]);return l>1&&Yy(h)===g&&f[f.length-1].path!==g?f.findIndex(uo.bind(null,c[l-2])):p}),s=Nt(()=>i.value>-1&&y1(t.params,r.value.params)),o=Nt(()=>i.value>-1&&i.value===t.matched.length-1&&XA(t.params,r.value.params));function a(c={}){if(_1(c)){const l=e[Hi(n.replace)?"replace":"push"](Hi(n.to)).catch(Ca);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:r,href:Nt(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function p1(n){return n.length===1?n[0]:n}const m1=pf({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Jy,setup(n,{slots:e}){const t=ic(Jy(n)),{options:r}=Tn(ih),i=Nt(()=>({[Xy(n.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[Xy(n.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&p1(e.default(t));return n.custom?s:Ef("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},s)}}}),g1=m1;function _1(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function y1(n,e){for(const t in e){const r=e[t],i=n[t];if(typeof r=="string"){if(r!==i)return!1}else if(!Nn(i)||i.length!==r.length||r.some((s,o)=>s.valueOf()!==i[o].valueOf()))return!1}return!0}function Yy(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Xy=(n,e,t)=>n??e??t,I1=pf({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const r=Tn(Yd),i=Nt(()=>n.route||r.value),s=Tn(Gy,0),o=Nt(()=>{let l=Hi(s);const{matched:h}=i.value;let f;for(;(f=h[l])&&!f.components;)l++;return l}),a=Nt(()=>i.value.matched[o.value]);lu(Gy,Nt(()=>o.value+1)),lu(HF,a),lu(Yd,i);const c=jt();return Ms(()=>[c.value,a.value,n.name],([l,h,f],[p,g,b])=>{h&&(h.instances[f]=l,g&&g!==h&&l&&l===p&&(h.leaveGuards.size||(h.leaveGuards=g.leaveGuards),h.updateGuards.size||(h.updateGuards=g.updateGuards))),l&&h&&(!g||!uo(h,g)||!p)&&(h.enterCallbacks[f]||[]).forEach(T=>T(l))},{flush:"post"}),()=>{const l=i.value,h=n.name,f=a.value,p=f&&f.components[h];if(!p)return Zy(t.default,{Component:p,route:l});const g=f.props[h],b=g?g===!0?l.params:typeof g=="function"?g(l):g:null,P=Ef(p,ke({},b,e,{onVnodeUnmounted:k=>{k.component.isUnmounted&&(f.instances[h]=null)},ref:c}));return Zy(t.default,{Component:P,route:l})||P}}});function Zy(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const v1=I1;function E1(n){const e=u1(n.routes,n),t=n.parseQuery||$F,r=n.stringifyQuery||jy,i=n.history,s=ea(),o=ea(),a=ea(),c=hR(Gr);let l=Gr;Vs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Yh.bind(null,B=>""+B),f=Yh.bind(null,PF),p=Yh.bind(null,nc);function g(B,ie){let te,ce;return ZA(B)?(te=e.getRecordMatcher(B),ce=ie):ce=B,e.addRoute(ce,te)}function b(B){const ie=e.getRecordMatcher(B);ie&&e.removeRoute(ie)}function T(){return e.getRoutes().map(B=>B.record)}function P(B){return!!e.getRecordMatcher(B)}function k(B,ie){if(ie=ke({},ie||c.value),typeof B=="string"){const V=Xh(t,B,ie.path),U=e.resolve({path:V.path},ie),G=i.createHref(V.fullPath);return ke(V,U,{params:p(U.params),hash:nc(V.hash),redirectedFrom:void 0,href:G})}let te;if(B.path!=null)te=ke({},B,{path:Xh(t,B.path,ie.path).path});else{const V=ke({},B.params);for(const U in V)V[U]==null&&delete V[U];te=ke({},B,{params:f(V)}),ie.params=f(ie.params)}const ce=e.resolve(te,ie),ve=B.hash||"";ce.params=h(p(ce.params));const A=kF(r,ke({},B,{hash:bF(ve),path:ce.path})),S=i.createHref(A);return ke({fullPath:A,hash:ve,query:r===jy?zF(B.query):B.query||{}},ce,{redirectedFrom:void 0,href:S})}function D(B){return typeof B=="string"?Xh(t,B,c.value.path):ke({},B)}function N(B,ie){if(l!==B)return lo(rt.NAVIGATION_CANCELLED,{from:ie,to:B})}function L(B){return E(B)}function H(B){return L(ke(D(B),{replace:!0}))}function j(B,ie){const te=B.matched[B.matched.length-1];if(te&&te.redirect){const{redirect:ce}=te;let ve=typeof ce=="function"?ce(B,ie):ce;return typeof ve=="string"&&(ve=ve.includes("?")||ve.includes("#")?ve=D(ve):{path:ve},ve.params={}),ke({query:B.query,hash:B.hash,params:ve.path!=null?{}:B.params},ve)}}function E(B,ie){const te=l=k(B),ce=c.value,ve=B.state,A=B.force,S=B.replace===!0,V=j(te,ce);if(V)return E(ke(D(V),{state:typeof V=="object"?ke({},ve,V.state):ve,force:A,replace:S}),ie||te);const U=te;U.redirectedFrom=ie;let G;return!A&&NF(r,ce,te)&&(G=lo(rt.NAVIGATION_DUPLICATED,{to:U,from:ce}),_n(ce,ce,!0,!1)),(G?Promise.resolve(G):v(U,ce)).catch(q=>nr(q)?nr(q,rt.NAVIGATION_GUARD_REDIRECT)?q:bn(q):Te(q,U,ce)).then(q=>{if(q){if(nr(q,rt.NAVIGATION_GUARD_REDIRECT))return E(ke({replace:S},D(q.to),{state:typeof q.to=="object"?ke({},ve,q.to.state):ve,force:A}),ie||U)}else q=R(U,ce,!0,S,ve);return C(U,ce,q),q})}function _(B,ie){const te=N(B,ie);return te?Promise.reject(te):Promise.resolve()}function y(B){const ie=Or.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(B):B()}function v(B,ie){let te;const[ce,ve,A]=WF(B,ie);te=ed(ce.reverse(),"beforeRouteLeave",B,ie);for(const V of ce)V.leaveGuards.forEach(U=>{te.push(Hr(U,B,ie))});const S=_.bind(null,B,ie);return te.push(S),Zt(te).then(()=>{te=[];for(const V of s.list())te.push(Hr(V,B,ie));return te.push(S),Zt(te)}).then(()=>{te=ed(ve,"beforeRouteUpdate",B,ie);for(const V of ve)V.updateGuards.forEach(U=>{te.push(Hr(U,B,ie))});return te.push(S),Zt(te)}).then(()=>{te=[];for(const V of A)if(V.beforeEnter)if(Nn(V.beforeEnter))for(const U of V.beforeEnter)te.push(Hr(U,B,ie));else te.push(Hr(V.beforeEnter,B,ie));return te.push(S),Zt(te)}).then(()=>(B.matched.forEach(V=>V.enterCallbacks={}),te=ed(A,"beforeRouteEnter",B,ie,y),te.push(S),Zt(te))).then(()=>{te=[];for(const V of o.list())te.push(Hr(V,B,ie));return te.push(S),Zt(te)}).catch(V=>nr(V,rt.NAVIGATION_CANCELLED)?V:Promise.reject(V))}function C(B,ie,te){a.list().forEach(ce=>y(()=>ce(B,ie,te)))}function R(B,ie,te,ce,ve){const A=N(B,ie);if(A)return A;const S=ie===Gr,V=Vs?history.state:{};te&&(ce||S?i.replace(B.fullPath,ke({scroll:S&&V&&V.scroll},ve)):i.push(B.fullPath,ve)),c.value=B,_n(B,ie,te,S),bn()}let w;function Se(){w||(w=i.listen((B,ie,te)=>{if(!on.listening)return;const ce=k(B),ve=j(ce,on.currentRoute.value);if(ve){E(ke(ve,{replace:!0,force:!0}),ce).catch(Ca);return}l=ce;const A=c.value;Vs&&BF(qy(A.fullPath,te.delta),rh()),v(ce,A).catch(S=>nr(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_CANCELLED)?S:nr(S,rt.NAVIGATION_GUARD_REDIRECT)?(E(ke(D(S.to),{force:!0}),ce).then(V=>{nr(V,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&!te.delta&&te.type===Qd.pop&&i.go(-1,!1)}).catch(Ca),Promise.reject()):(te.delta&&i.go(-te.delta,!1),Te(S,ce,A))).then(S=>{S=S||R(ce,A,!1),S&&(te.delta&&!nr(S,rt.NAVIGATION_CANCELLED)?i.go(-te.delta,!1):te.type===Qd.pop&&nr(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),C(ce,A,S)}).catch(Ca)}))}let ut=ea(),Oe=ea(),pe;function Te(B,ie,te){bn(B);const ce=Oe.list();return ce.length?ce.forEach(ve=>ve(B,ie,te)):console.error(B),Promise.reject(B)}function sn(){return pe&&c.value!==Gr?Promise.resolve():new Promise((B,ie)=>{ut.add([B,ie])})}function bn(B){return pe||(pe=!B,Se(),ut.list().forEach(([ie,te])=>B?te(B):ie()),ut.reset()),B}function _n(B,ie,te,ce){const{scrollBehavior:ve}=n;if(!Vs||!ve)return Promise.resolve();const A=!te&&qF(qy(B.fullPath,0))||(ce||!te)&&history.state&&history.state.scroll||null;return fl().then(()=>ve(B,ie,A)).then(S=>S&&UF(S)).catch(S=>Te(S,B,ie))}const Xe=B=>i.go(B);let Ze;const Or=new Set,on={currentRoute:c,listening:!0,addRoute:g,removeRoute:b,clearRoutes:e.clearRoutes,hasRoute:P,getRoutes:T,resolve:k,options:n,push:L,replace:H,go:Xe,back:()=>Xe(-1),forward:()=>Xe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:Oe.add,isReady:sn,install(B){B.component("RouterLink",g1),B.component("RouterView",v1),B.config.globalProperties.$router=on,Object.defineProperty(B.config.globalProperties,"$route",{enumerable:!0,get:()=>Hi(c)}),Vs&&!Ze&&c.value===Gr&&(Ze=!0,L(i.location).catch(ce=>{}));const ie={};for(const ce in Gr)Object.defineProperty(ie,ce,{get:()=>c.value[ce],enumerable:!0});B.provide(ih,on),B.provide(nm,kI(ie)),B.provide(Yd,c);const te=B.unmount;Or.add(B),B.unmount=function(){Or.delete(B),Or.size<1&&(l=Gr,w&&w(),w=null,c.value=Gr,Ze=!1,pe=!1),te()}}};function Zt(B){return B.reduce((ie,te)=>ie.then(()=>y(te)),Promise.resolve())}return on}function KU(){return Tn(ih)}function $U(n){return Tn(nm)}const ib=new Bn;function ta(n){return"mu_auth_"+String(n||"")}function T1(n){const e=String(n||"").toLowerCase().replace(/[^a-z0-9._-]/g,"");return e?e+"@portal-mu.local":null}async function w1(n){const e=String(n||"").trim(),t=e.toLowerCase(),r=e.replace(/\D/g,"");try{const h=await Ja(fn(gt,"settings","web")),f=(h.exists()?h.data().adminUsername:"adminmu")||"adminmu";if(t==="adminmu"||t===f.toLowerCase())return{source:"admin",data:{id:"admin",username:f},authKey:f.toLowerCase()}}catch{if(t==="adminmu")return{source:"admin",data:{id:"admin",username:"adminmu"},authKey:"adminmu"}}const i=Ar(gt,"guru");let s=null,o=await Sn(En(i,Un("username","==",e),cr(1)));if(o.empty||(s=o.docs[0]),!s&&r.length>=8&&(o=await Sn(En(i,Un("wa","==",r),cr(1))),o.empty||(s=o.docs[0])),!s&&/[a-z]/i.test(e)&&(s=(await Sn(En(i))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),s){const h={id:s.id,...s.data()},f=String(h.wa||"").replace(/\D/g,""),p=f.length>=8?f:h.username||String(h.id);return{source:"guru",data:h,authKey:p}}const a=Ar(gt,"santri");let c=null,l=await Sn(En(a,Un("username","==",e),cr(1)));if(l.empty||(c=l.docs[0]),!c&&r.length>=8&&(l=await Sn(En(a,Un("wa","==",r),cr(1))),l.empty||(c=l.docs[0])),c||(l=await Sn(En(a,Un("nis","==",e),cr(1))),l.empty||(c=l.docs[0])),!c&&/[a-z]/i.test(e)&&(c=(await Sn(En(a))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),c){const h={id:c.id,...c.data()},f=String(h.wa||"").replace(/\D/g,""),p=f.length>=8?f:h.username||h.nis||String(h.id);return{source:"santri",data:h,authKey:p}}return null}async function A1(n,e,t=!0){if(await Zu(un,t?Wl:Ql),n.source==="admin"){const a=await Ja(fn(gt,"settings","admin")).catch(()=>null),c=await Ja(fn(gt,"settings","web")).catch(()=>null),l=(a==null?void 0:a.exists())&&(a.data().password||a.data().adminPassword)||(c==null?void 0:c.exists())&&c.data().adminPassword||"1234";if(e!==l){const h=new Error("Sandi admin salah");throw h.code="auth/wrong-password",h}return{authMethod:"admin-builtin",user:null}}const r=T1(n.authKey);if(!r)throw new Error("Username/WA tidak valid untuk Auth");let i=null;try{return i=await da(un,r,ta(e)),{authMethod:"firebase-padded",user:i.user}}catch(a){const c=a.code||"";if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(c))throw a;try{i=await da(un,r,e);try{const{updatePassword:h}=await _e(async()=>{const{updatePassword:f}=await Promise.resolve().then(()=>XL);return{updatePassword:f}},void 0);await h(i.user,ta(e))}catch(h){console.warn("[auth] Password upgrade fail:",h.message)}return{authMethod:"firebase-raw-upgraded",user:i.user}}catch(h){if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(h.code))throw h}}const s=n.data.password||"1234";if(e!==s){const a=new Error("Kata sandi salah");throw a.code="auth/wrong-password",a}const o=KA();if(!o)throw new Error("Secondary Firebase Auth init fail");try{const a=await iA(o,r,ta(e));try{await bc(fn(gt,n.source,String(n.data.id)),{firebase_uid:a.user.uid,email_auth:r,password_migrated:!0})}catch(l){console.warn("[auth] Firestore migration tag fail:",l.message)}try{await Up(o)}catch{}return{authMethod:"firebase-migrated",user:(await da(un,r,ta(e))).user}}catch(a){if(a.code==="auth/email-already-in-use")return{authMethod:"firebase-already-exists",user:(await da(un,r,ta(e))).user};throw a}}async function zU(){return zp(un,ib)}async function HU(n,e){if(!["guru","santri"].includes(n))throw new Error("linkGoogleAccount: collection harus guru/santri");const t=await zp(un,ib),r=t==null?void 0:t.user;if(!(r!=null&&r.uid))throw new Error("Gagal dapat UID Google");const i=await Sn(En(Ar(gt,"guru"),Un("linked_uid","==",r.uid),cr(1))),s=await Sn(En(Ar(gt,"santri"),Un("linked_uid","==",r.uid),cr(1))),o=[];if(i.forEach(a=>{(n!=="guru"||String(a.id)!==String(e))&&o.push(`guru/${a.id}`)}),s.forEach(a=>{(n!=="santri"||String(a.id)!==String(e))&&o.push(`santri/${a.id}`)}),o.length>0)throw new Error(`Akun Google ini sudah dipakai oleh: ${o.join(", ")}. Unlink dulu sebelum link ulang.`);return await bc(fn(gt,n,String(e)),{linked_uid:r.uid,linked_email:r.email||"",linked_at:new Date().toISOString()}),{uid:r.uid,email:r.email||""}}async function WU(n,e){if(!["guru","santri"].includes(n))throw new Error("unlinkGoogleAccount: collection harus guru/santri");await bc(fn(gt,n,String(e)),{linked_uid:null,linked_email:null,unlinked_at:new Date().toISOString()})}async function td(){return Up(un)}const eI="@portal-mu.local",Xd="portalMu_sesiAdminBuiltIn";function nd(n){try{n&&n.auth_method==="admin-builtin"?localStorage.setItem(Xd,JSON.stringify(n)):localStorage.removeItem(Xd)}catch{}}function b1(){try{const n=localStorage.getItem(Xd);if(!n)return null;const e=JSON.parse(n);return e&&e.auth_method==="admin-builtin"&&e.role==="admin"?e:null}catch{return null}}const sb=Tf("auth",()=>{const n=jt(null),e=jt(null),t=jt(!1),r=jt(null);let i=null;const s=new Promise(k=>{i=k}),o=Nt(()=>n.value!==null),a=Nt(()=>{var k;return((k=n.value)==null?void 0:k.role)==="admin"}),c=Nt(()=>{var k;return((k=n.value)==null?void 0:k.role)==="guru"}),l=Nt(()=>{var k;return((k=n.value)==null?void 0:k.role)==="santri"});function h(k){var N;if(!n.value)return!1;const D=n.value;return D.id==="admin"||D.role_sistem==="super_admin"||D.role_sistem==="admin_keuangan"&&k==="akses_keuangan"||D.role_sistem==="admin"&&k!=="akses_keuangan"?!0:((N=D.akses)==null?void 0:N[k])===!0}async function f(k,D,N=!0){var L,H,j,E;t.value=!0,r.value=null;try{const _=await w1(k);if(!_){const v=new Error("Username tidak ditemukan. Pastikan ketik dengan benar — Guru/Pegawai bisa pakai username atau no WA, Santri pakai NIS atau no WA wali.");throw v.code="auth/not-found",v}if(_.source==="guru"&&_.data.status==="Tidak Aktif")throw new Error("Akun guru berstatus tidak aktif. Hubungi administrator.");if(_.source==="santri"&&_.data.aktif===!1)throw new Error("Akun santri tidak aktif. Hubungi administrator.");const y=await A1(_,D,N);if(_.source==="admin"){n.value={id:"admin",role:"admin",role_sistem:"super_admin",nama:"Administrator",guru:"Admin Utama",jk:"L",jabatan:"Administrator",lembaga:"Semua Data",akses:{kelola_guru:!0,akses_keuangan:!0,kelola_santri:!0,kelola_lembaga:!0,kelola_kelas:!0},auth_method:"admin-builtin"},nd(n.value);return}if(_.source!=="admin"&&nd(null),_.source==="guru"){const v=_.data,C=v.role_sistem||"user",R=["admin","admin_keuangan","super_admin"].includes(C);n.value={id:v.id,role:R?"admin":"guru",role_sistem:C,nama:v.nama,guru:v.nama,lembaga:R?"Semua Data":v.lembaga||"",jk:v.jk||"",jabatan:v.jabatan||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",akses:v.akses||{},auth_method:y.authMethod,firebase_uid:(L=y.user)==null?void 0:L.uid,firebase_email:(H=y.user)==null?void 0:H.email},e.value=y.user;return}if(_.source==="santri"){const v=_.data;n.value={id:v.id,role:"santri",role_sistem:"santri",nama:v.nama,nis:v.nis||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",lembaga:v.lembaga||"",kelas:v.kelas||"",wali:v.wali||"",auth_method:y.authMethod,firebase_uid:(j=y.user)==null?void 0:j.uid,firebase_email:(E=y.user)==null?void 0:E.email},e.value=y.user;return}}catch(_){const y=_.code||"";let v=_.message||String(_);y==="auth/wrong-password"||y==="auth/invalid-credential"?v="Kata sandi salah":y==="auth/too-many-requests"?v="Terlalu banyak percobaan. Coba lagi dalam beberapa menit.":y==="auth/network-request-failed"&&(v="Koneksi bermasalah. Periksa internet Anda."),r.value=v;const C=new Error(v);throw C.code=y,C}finally{t.value=!1}}async function p(k){if(!k)return;const D=k.uid,N=(k.email||"").toLowerCase();let L=await Ss("guru",[["linked_uid","==",D]],[],1),H=[];if(L.length===0&&(H=await Ss("santri",[["linked_uid","==",D]],[],1)),L.length===0&&H.length===0&&N&&(L=await Ss("guru",[["linked_email","==",N]],[],1),L.length===0&&(H=await Ss("santri",[["linked_email","==",N]],[],1))),L.length===0&&H.length===0&&N.endsWith(eI)){const j=N.replace(eI,"");j&&j!=="admin"&&(L=await Ss("guru",[["wa","==",j]],[],1),L.length===0&&(H=await Ss("santri",[["wa","==",j]],[],1)))}if(L.length>0){const j=L[0];if(j.status==="Tidak Aktif")throw await td(),new Error("Akun guru berstatus tidak aktif");const E=j.role_sistem||"user",_=["admin","admin_keuangan","super_admin"].includes(E);n.value={id:j.id,role:_?"admin":"guru",role_sistem:E,nama:j.nama,guru:j.nama,lembaga:_?"Semua Data":j.lembaga||"",jk:j.jk||"",jabatan:j.jabatan||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",akses:j.akses||{},auth_method:"firebase",firebase_uid:D,firebase_email:k.email};return}if(H.length>0){const j=H[0];if(j.aktif===!1)throw await td(),new Error("Akun santri tidak aktif");n.value={id:j.id,role:"santri",role_sistem:"santri",nama:j.nama,nis:j.nis||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",lembaga:j.lembaga||"",kelas:j.kelas||"",wali:j.wali||"",auth_method:"firebase",firebase_uid:D,firebase_email:k.email};return}throw console.warn("[auth.loadSesiFromUser] Firebase user authenticated tapi tidak match guru/santri:",N),n.value=null,new Error("Akun terautentikasi tapi belum terdaftar sebagai guru/santri di sistem.")}async function g(){await td(),n.value=null,e.value=null,nd(null)}function b(k){n.value=k}function T(){if(n.value||un.currentUser)return;const k=b1();k&&(n.value=k)}function P(){T(),Zu(un,Gp).catch(()=>Zu(un,Wl)).catch(D=>{console.warn("[auth.initAuth] setPersistence fail:",D==null?void 0:D.message)});let k=!1;uA(un,async D=>{if(D){e.value=D;try{await p(D)}catch(N){console.warn("[auth.initAuth] loadSesiFromUser fail:",N.message)}}!k&&i&&(k=!0,i())}),setTimeout(()=>{!k&&i&&(k=!0,i())},3e3)}return{sesiAktif:n,fbUser:e,isLoading:t,error:r,authReady:s,isLoggedIn:o,isAdmin:a,isGuru:c,isSantri:l,hasAccess:h,cekHakAkses:h,login:f,logout:g,setSesi:b,setSesiAktif:b,restoreAdminSesiFromStorage:T,initAuth:P,loadSesiFromUser:p}}),R1=()=>_e(()=>import("./LoginView-CaGf_8rN.js"),__vite__mapDeps([0,1,2])),S1=()=>_e(()=>import("./DashboardView-D09a187f.js"),__vite__mapDeps([3,1,4,5,6,7,8,9,10])),P1=()=>_e(()=>import("./PengaturanView-BJc1HvHm.js"),__vite__mapDeps([11,2,12,5,13,14])),C1=()=>_e(()=>import("./ProfilView-B0F-9Dae.js"),__vite__mapDeps([15,1,13,2,12,6])),D1=()=>_e(()=>import("./SantriView-BxZVzyLw.js"),__vite__mapDeps([16,17,5,6,18,19,20,2,12])),k1=()=>_e(()=>import("./GuruView-B93IgLLi.js"),__vite__mapDeps([21,18,2,19,20,4,5,12,6])),N1=()=>_e(()=>import("./KelasView-oDfp-tlC.js"),__vite__mapDeps([22,5])),V1=()=>_e(()=>import("./FieldSchemaView-DH1BRF5o.js"),__vite__mapDeps([23,8])),O1=()=>_e(()=>import("./MasterFormBridgeView-BgjIdIIn.js"),__vite__mapDeps([24,8])),x1=()=>_e(()=>import("./KeuanganDashboardView-CKR2hj_E.js"),__vite__mapDeps([25,26,6])),L1=()=>_e(()=>import("./TagihanView-BGuijzSW.js"),__vite__mapDeps([27,2,12,6])),M1=()=>_e(()=>import("./TabunganView-AUrUr_HQ.js"),__vite__mapDeps([28,1,2,26,6])),F1=()=>_e(()=>import("./BisyarohView-qM9n91_j.js"),__vite__mapDeps([29,26,4,5,2,6])),U1=()=>_e(()=>import("./KritikSaranView-DBGJMF4Q.js"),__vite__mapDeps([30,2,12])),B1=()=>_e(()=>import("./AbsensiGuruView-CZt2lm4x.js"),__vite__mapDeps([31,18,2,20])),tI=()=>_e(()=>import("./SantriFormView-D6_xcH2N.js"),__vite__mapDeps([32,2,6])),nI=()=>_e(()=>import("./GuruFormView-DE3llzMg.js"),__vite__mapDeps([33,2,6])),rI=()=>_e(()=>import("./LembagaFormView-Eac0NaNK.js"),__vite__mapDeps([34,2])),q1=()=>_e(()=>import("./LembagaDetailView-BNa8bXiO.js"),__vite__mapDeps([35,5,2,12,13,36])),j1=()=>_e(()=>import("./AbsensiSantriView-Dvhfj7eM.js"),__vite__mapDeps([37,18,2,12,19,20])),G1=()=>_e(()=>import("./PostsView-Bqg8f-jR.js"),__vite__mapDeps([38,2,12])),K1=()=>_e(()=>import("./BukuIndukView-k7mupBeo.js"),__vite__mapDeps([39,2,18,6,19,20])),$1=()=>_e(()=>import("./LaporanKeuanganView-DSiFpOZB.js"),__vite__mapDeps([40,6])),z1=()=>_e(()=>import("./PpdbFormView-CsbRNvp6.js"),[]),H1=()=>_e(()=>import("./PpdbAdminView-EBqDAsh0.js"),__vite__mapDeps([41,2])),W1=()=>_e(()=>import("./PpdbDetailView-CEynKt03.js"),__vite__mapDeps([42,2,12])),Q1=()=>_e(()=>import("./PosSantriView-CkY6BzJd.js"),__vite__mapDeps([43,2,8,44])),J1=()=>_e(()=>import("./NaikKelasView-CKEbevET.js"),__vite__mapDeps([45,2,4,5,18,19,20,8,46])),Y1=()=>_e(()=>import("./KalenderKegiatanView-DPuF-Je4.js"),__vite__mapDeps([47,2,12,7])),X1=()=>_e(()=>import("./StatistikView-CBEY5KAR.js"),__vite__mapDeps([48,17,5,4])),Z1=()=>_e(()=>import("./InputBulananView-fva1zhXH.js"),__vite__mapDeps([49,17,5,4,2,8,50])),eU=()=>_e(()=>import("./RekapPrestasiView-BToL0peX.js"),__vite__mapDeps([51,36,2,18,6,19,20])),tU=()=>_e(()=>import("./RekapDiniyahView-C-GSOgES.js"),__vite__mapDeps([52,2,17,5])),nU=()=>_e(()=>import("./RaporView-B-JLnAT2.js"),__vite__mapDeps([53,17,5,4,2,36,8,54])),rU=()=>_e(()=>import("./PengaturanKeuanganView-gXoWVob4.js"),__vite__mapDeps([55,4,5,2])),iU=()=>_e(()=>import("./MasterDataView-B8AGvJSX.js"),__vite__mapDeps([56,2,5,22,21,18,19,20,4,12,6,16,17])),sU=()=>_e(()=>import("./KegiatanPesantrenView-BHBkBu7J.js"),__vite__mapDeps([57,17,5,2,18])),oU=()=>_e(()=>import("./HutangPiutangView-C11MzmzB.js"),__vite__mapDeps([58,2,12,6])),aU=()=>_e(()=>import("./PembayaranView--Hp71ejf.js"),__vite__mapDeps([59,6])),cU=()=>_e(()=>import("./CapaianPrestasiView-yNVPul0w.js"),__vite__mapDeps([60,1,17,5])),uU=()=>_e(()=>import("./PersonalView-C5KjuMTz.js"),__vite__mapDeps([61,6])),lU=()=>_e(()=>import("./AppLayout-0RngOGQ_.js"),__vite__mapDeps([62,9,2,7,12,6,8,14,63])),hU=[{path:"/",redirect:"/dashboard"},{path:"/login",name:"login",component:R1,meta:{public:!0}},{path:"/psb-form",name:"psb-form",component:z1,meta:{public:!0}},{path:"/",component:lU,children:[{path:"dashboard",name:"dashboard",component:S1},{path:"profil",name:"profil",component:C1},{path:"santri",name:"santri",component:D1},{path:"santri/new",name:"santri-new",component:tI,meta:{admin:!0}},{path:"santri/:id/edit",name:"santri-edit",component:tI,meta:{admin:!0}},{path:"guru",name:"guru",component:k1,meta:{admin:!0}},{path:"guru/new",name:"guru-new",component:nI,meta:{admin:!0}},{path:"guru/:id/edit",name:"guru-edit",component:nI,meta:{admin:!0}},{path:"lembaga",name:"lembaga",redirect:{path:"/master-data",query:{tab:"lembaga"}}},{path:"lembaga/new",name:"lembaga-new",component:rI,meta:{admin:!0}},{path:"lembaga/:id/edit",name:"lembaga-edit",component:rI,meta:{admin:!0}},{path:"lembaga/:id",name:"lembaga-detail",component:q1,meta:{admin:!0}},{path:"kelas",name:"kelas",component:N1,meta:{admin:!0}},{path:"master-form/:entity",name:"master-form",component:O1,meta:{admin:!0}},{path:"field-schema",name:"field-schema",component:V1,meta:{admin:!0}},{path:"keuangan",name:"keuangan",component:x1,meta:{admin:!0}},{path:"tagihan",name:"tagihan",component:L1},{path:"pembayaran",name:"pembayaran",component:aU},{path:"pos-santri",name:"pos-santri",component:Q1,meta:{admin:!0}},{path:"tabungan",name:"tabungan",component:M1},{path:"bisyaroh",name:"bisyaroh",component:F1},{path:"rapor",name:"rapor",component:nU},{path:"naik-kelas",name:"naik-kelas",component:J1,alias:"/kenaikan"},{path:"absensi-guru",name:"absensi-guru",component:B1,meta:{admin:!0}},{path:"absensi-santri",name:"absensi-santri",component:j1},{path:"posts",name:"posts",component:G1,alias:"/mading"},{path:"buku-induk",name:"buku-induk",component:K1,meta:{admin:!0}},{path:"hutang-piutang",name:"hutang-piutang",component:oU,meta:{admin:!0}},{path:"laporan-keuangan",name:"laporan-keuangan",component:$1,meta:{admin:!0}},{path:"psb",name:"psb",component:H1,meta:{admin:!0}},{path:"psb/:id",name:"psb-detail",component:W1,meta:{admin:!0}},{path:"kritik-saran",name:"kritik-saran",component:U1},{path:"pengaturan-web",name:"pengaturan-web",component:P1,meta:{admin:!0}},{path:"keu-pengaturan",name:"keu-pengaturan",component:rU,meta:{admin:!0},alias:"/pengaturan-keuangan"},{path:"kegiatan-pesantren",name:"kegiatan-pesantren",component:sU,meta:{admin:!0}},{path:"kalender",name:"kalender",component:Y1,alias:"/kalender-kegiatan"},{path:"statistik",name:"statistik",component:X1},{path:"input-bulanan",name:"input-bulanan",component:Z1},{path:"rekap-prestasi",name:"rekap-prestasi",component:eU},{path:"rekap-diniyah",name:"rekap-diniyah",component:tU},{path:"master-data",name:"master-data",component:iU,meta:{admin:!0,roleSistem:"super_admin"}},{path:"capaian-prestasi",name:"capaian-prestasi",component:cU},{path:"personal",name:"personal",component:uU,meta:{admin:!0}}]},{path:"/:pathMatch(.*)*",redirect:"/dashboard"}],rl=E1({history:ZF(),routes:hU}),dU=["/login","/psb-form"];rl.beforeEach(async(n,e,t)=>{var i,s,o,a;const r=sb();if((i=n.meta)!=null&&i.public||dU.includes(n.path))return t();if(r.authReady)try{await r.authReady}catch{}if(!r.isLoggedIn)return t({name:"login",query:{redirect:n.fullPath}});if((s=n.meta)!=null&&s.admin&&!r.isAdmin)return t({name:"dashboard"});if((o=n.meta)!=null&&o.roleSistem&&((a=r.sesiAktif)==null?void 0:a.role_sistem)!==n.meta.roleSistem)return t({name:"dashboard"});t()});let iI=!1;rl.afterEach(()=>{iI||(iI=!0,setTimeout(()=>{rl.getRoutes().forEach(e=>{var r;const t=(r=e.components)==null?void 0:r.default;if(typeof t=="function")try{t()}catch{}})},800))});let fU=0;const pU=Tf("ui",()=>{function n(){return typeof window<"u"&&window.innerWidth>=768}const e=jt(n());function t(){e.value=!0}function r(){e.value=!1}function i(){e.value=!e.value}const s=jt(!1);function o(T){s.value=!!T,typeof document<"u"&&(document.documentElement.classList.toggle("dark",s.value),document.body.classList.toggle("dark-mode",s.value));try{localStorage.setItem("portalMu_darkMode",s.value?"1":"0")}catch{}}function a(){o(!s.value)}function c(){try{if(!localStorage.getItem("portalMu_themeMigrated_v48")){localStorage.setItem("portalMu_darkMode","0"),localStorage.setItem("portalMu_themeMigrated_v48","1"),o(!1);return}const P=localStorage.getItem("portalMu_darkMode");if(P!=null){o(P==="1");return}}catch{}o(!1)}const l=jt([]);function h(T,P,k=3e3){const D=++fU;return l.value.push({id:D,type:T,msg:P,ttl:k}),setTimeout(()=>{const N=l.value.findIndex(L=>L.id===D);N>=0&&l.value.splice(N,1)},k),D}const f={info:(T,P)=>h("info",T,P),success:(T,P)=>h("success",T,P),error:(T,P)=>h("error",T,P??5e3),warning:(T,P)=>h("warning",T,P??4e3)},p=jt({open:!1,title:"",message:"",confirmText:"Hapus",cancelText:"Batal",danger:!0,_resolve:null});function g({title:T="Konfirmasi",message:P="",confirmText:k="Hapus",cancelText:D="Batal",danger:N=!0}={}){return new Promise(L=>{p.value={open:!0,title:T,message:P,confirmText:k,cancelText:D,danger:N,_resolve:L}})}function b(T){const P=p.value._resolve;p.value.open=!1,p.value._resolve=null,P&&P(!!T)}return{sidebarOpen:e,openSidebar:t,closeSidebar:r,toggleSidebar:i,isDark:s,setDark:o,toggleDark:a,initDarkFromStorage:c,toasts:l,toast:f,confirmState:p,confirm:g,confirmResolve:b}}),rm=_P(pF),sh=vP();rm.use(sh);rm.use(rl);const mU=pU(sh);mU.initDarkFromStorage();const gU=sb(sh);gU.initAuth();const sI=$A(sh);sI.load().then(()=>sI.subscribe()).catch(()=>{});function ob(){const n=document.getElementById("splash-screen");n&&!n.classList.contains("fade-out")?(n.classList.add("fade-out"),setTimeout(()=>{document.body.classList.add("app-running")},600)):document.body.classList.contains("app-running")||document.body.classList.add("app-running")}try{rm.mount("#app")}catch(n){console.error("[main.js] Vue app.mount FAIL:",n)}const _U=1200,yU=performance.now();requestAnimationFrame(()=>{const n=performance.now()-yU,e=Math.max(0,_U-n);setTimeout(ob,e)});setTimeout(()=>{document.body.classList.contains("app-running")||(console.warn("[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck"),ob())},5e3);async function IU(){var n;try{const e=Date.now();for(;!window.Sentry&&Date.now()-e<3e3;)await new Promise(a=>setTimeout(a,100));if(!window.Sentry)return;const{db:t}=await _e(async()=>{const{db:a}=await Promise.resolve().then(()=>dF);return{db:a}},void 0),{doc:r,getDoc:i}=await _e(async()=>{const{doc:a,getDoc:c}=await Promise.resolve().then(()=>bV);return{doc:a,getDoc:c}},void 0),s=await i(r(t,"settings","general")),o=s.exists()&&((n=s.data())==null?void 0:n.sentryDsn)||"";if(!o)return;window.Sentry.init({dsn:o,tracesSampleRate:.1,release:"portal-mu@20.70.0526",environment:window.location.hostname.includes("localhost")?"dev":"prod"}),console.log("[main.js] Sentry initialized")}catch(e){console.warn("[main.js] Sentry init skipped:",e.message)}}IU();export{fw as $,it as A,cr as B,HU as C,zU as D,fl as E,cn as F,nf as G,tf as H,QI as I,WI as J,bp as K,JI as L,Oa as M,wp as N,En as O,Ss as P,ic as Q,g1 as R,jt as S,TU as T,UU as U,AU as V,bU as W,$R as X,zR as Y,hV as Z,_e as _,BS as a,fF as a0,hR as a1,hF as a2,GU as a3,Ly as a4,Kb as a5,Pe as a6,WU as a7,Hi as a8,bc as a9,BU as aa,LU as ab,sb as ac,$U as ad,KU as ae,$A as af,pU as ag,cP as ah,CU as ai,uP as aj,lP as ak,Lg as al,PU as am,OS as an,Ms as ao,EU as ap,Un as aq,ad as ar,vU as as,kU as at,DU as au,gV as av,qU as b,Ar as c,Nt as d,Iv as e,La as f,wS as g,RU as h,SU as i,TS as j,It as k,gt as l,wU as m,pf as n,pw as o,FU as p,jU as q,fn as r,dF as s,Ja as t,Sn as u,MU as v,xy as w,Ef as x,bV as y,dl as z};
